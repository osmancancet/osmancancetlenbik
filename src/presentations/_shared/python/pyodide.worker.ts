/**
 * Pyodide worker — öğrenci kodunu ana iş parçacığından İZOLE çalıştırır.
 *
 * Neden worker: `while True:` yazan bir öğrenci ana iş parçacığında sekmeyi
 * tamamen kilitler; ne "Durdur" tıklanabilir ne slayt değişir. Worker'da ise
 * ana iş parçacığı akıcı kalır ve terminate() anında çalışır. Durdurmanın
 * başka yolu yok: setInterruptBuffer SharedArrayBuffer ister, o da COOP/COEP
 * ister, o da jsDelivr + Vercel Analytics dahil tüm cross-origin kaynakları
 * kırar. Bu yüzden durdurma = terminate() + respawn.
 *
 * Turbopack bu dosyayı `new Worker(new URL(...))` üzerinden ayrı bir chunk'a
 * çevirir ve {type:"module"} seçeneğini siler → worker CLASSIC doğar →
 * importScripts() kullanılabilir, ki Pyodide'ın CDN yükleme yolu tam olarak budur.
 */

import type { FromWorker, ToWorker } from "./protocol";
import {
  MAX_OUTPUT_BYTES,
  MAX_OUTPUT_LINES,
  OUTPUT_FLUSH_BYTES,
  OUTPUT_FLUSH_MS,
  PROGRAM_FILENAME,
} from "./config";

/* ------------------------------------------------------------------ *
 * tsconfig'te `lib: ["dom","dom.iterable","esnext"]` var, "webworker" YOK.
 * `lib`'e webworker eklemek `dom` ile çakışır ve tüm projeyi bozar; bu yüzden
 * worker'a özgü global'leri burada elle bildiriyoruz.
 * ------------------------------------------------------------------ */
declare function importScripts(...urls: string[]): void;

type PyProxy = { destroy(): void };

type PythonErrorLike = Error & { type?: string };

type PyodideApi = {
  globals: { get(name: string): (...args: unknown[]) => PyProxy };
  setStdout(o: { write?: (b: Uint8Array) => number; isatty?: boolean }): void;
  setStderr(o: { write?: (b: Uint8Array) => number; isatty?: boolean }): void;
  runPython(code: string, opts?: { globals?: PyProxy; filename?: string }): unknown;
  runPythonAsync(
    code: string,
    opts?: { globals?: PyProxy; filename?: string }
  ): Promise<unknown>;
};

const ctx = self as unknown as {
  postMessage(msg: FromWorker): void;
  onmessage: ((e: { data: ToWorker }) => void) | null;
  loadPyodide(opts: { indexURL: string }): Promise<PyodideApi>;
};

function send(msg: FromWorker) {
  ctx.postMessage(msg);
}

/* ================================================================== *
 * ÇIKTI TAMPONU
 * ================================================================== */

let runId: string | null = null;
let seq = 0;
let bytesOut = 0;
let linesOut = 0;
let truncated = false;

/**
 * Türkçe karakterler UTF-8'de 2 bayt; Pyodide bunları iki ayrı write()
 * çağrısına bölebilir. Her çağrıda YENİ decoder yaratmak "ş" yerine bozuk
 * karakter üretir — bu yüzden akış başına TEK decoder tutulur ve
 * {stream:true} ile beslenir.
 */
let decOut = new TextDecoder("utf-8");
let decErr = new TextDecoder("utf-8");

type Pending = { stdout: string; stderr: string };
let pending: Pending = { stdout: "", stderr: "" };
let flushTimer: ReturnType<typeof setTimeout> | null = null;

function flush() {
  if (flushTimer !== null) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }
  if (runId === null) return;
  for (const stream of ["stdout", "stderr"] as const) {
    const text = pending[stream];
    if (!text) continue;
    pending[stream] = "";
    send({ t: "out", id: runId, seq: seq++, stream, text });
  }
}

function scheduleFlush() {
  if (flushTimer !== null) return;
  flushTimer = setTimeout(flush, OUTPUT_FLUSH_MS);
}

/** Pyodide'ın write() sözleşmesi: yazılan bayt sayısını döndürmek zorunda. */
function makeWriter(stream: "stdout" | "stderr") {
  return (buf: Uint8Array): number => {
    const n = buf.length;
    if (truncated) return n; // sınır aşıldı, sessizce yut

    const dec = stream === "stdout" ? decOut : decErr;
    // Not: buf WASM belleğine bakan bir görünüm olabilir ve sonraki çağrıda
    // yeniden kullanılabilir — hemen decode ediyoruz, referansı tutmuyoruz.
    const text = dec.decode(buf, { stream: true });

    bytesOut += n;
    for (let i = 0; i < text.length; i++) {
      if (text.charCodeAt(i) === 10) linesOut++;
    }

    if (bytesOut > MAX_OUTPUT_BYTES || linesOut > MAX_OUTPUT_LINES) {
      truncated = true;
      pending[stream] += text;
      flush();
      if (runId !== null) send({ t: "truncated", id: runId });
      // Python tarafını durdurmak için istisna fırlatamayız (write sözleşmesi
      // bunu desteklemiyor); ana iş parçacığı `truncated` mesajını görünce
      // worker'ı terminate eder.
      return n;
    }

    pending[stream] += text;
    if (pending[stream].length >= OUTPUT_FLUSH_BYTES) flush();
    else scheduleFlush();
    return n;
  };
}

/* ================================================================== *
 * PYTHON PRELUDE — input() gölgeleme
 * ================================================================== */

/**
 * Pyodide'da input() varsayılan olarak çalışmaz: senkron okuma gerekir, o da
 * Atomics.wait → SharedArrayBuffer → COOP/COEP demek. Çözüm: input()'u
 * çalıştırma namespace'i içinde gölgele (builtins KİRLETİLMEZ) ve önceden
 * doldurulmuş "Girdi (stdin)" kutusundan satır satır besle.
 *
 * Tüketilen satır stdout'a echo edilir — böylece terminal çıktısı gerçek bir
 * terminaldeki gibi ("En (cm): 12") görünür ve mevcut statik mockup'larla
 * birebir örtüşür.
 */
function buildPrelude(stdin: string[]): string {
  // JSON.stringify iki kez: içteki JSON metnini Python'un da kabul ettiği bir
  // çift tırnaklı string literaline çevirir. Kaçış dizileri (\n, \", \\, \uXXXX)
  // JSON ve Python arasında uyumlu.
  const literal = JSON.stringify(JSON.stringify(stdin));
  return `
import sys as _mcbu_sys, json as _mcbu_json

_mcbu_stdin = _mcbu_json.loads(${literal})
_mcbu_pos = 0

def input(prompt=""):
    global _mcbu_pos
    _mcbu_sys.stdout.write(str(prompt))
    _mcbu_sys.stdout.flush()
    if _mcbu_pos >= len(_mcbu_stdin):
        raise EOFError("__MCBU_EOF__")
    _mcbu_line = _mcbu_stdin[_mcbu_pos]
    _mcbu_pos += 1
    _mcbu_sys.stdout.write(_mcbu_line + "\\n")
    _mcbu_sys.stdout.flush()
    return _mcbu_line
`;
}

/* ================================================================== *
 * PYODIDE YAŞAM DÖNGÜSÜ
 * ================================================================== */

let py: PyodideApi | null = null;

async function init(indexURL: string) {
  try {
    // importScripts senkron ve classic worker'da garantili. Dinamik ESM import
    // (await import("https://...")) classic worker'da tarayıcı bazlı — kullanmıyoruz.
    importScripts(indexURL + "pyodide.js");
    py = await ctx.loadPyodide({ indexURL });
    // loadPackagesFromImports bilinçli olarak ÇAĞRILMIYOR: öğrenci yanlışlıkla
    // `import numpy` yazınca 20 MB indirmek yerine temiz bir ModuleNotFoundError
    // alsın (errors.tr.ts bunu Türkçe açıklıyor).
    send({ t: "ready" });
  } catch (err) {
    send({ t: "loadError", message: err instanceof Error ? err.message : String(err) });
  }
}

async function run(id: string, code: string, setup: string, stdin: string[]) {
  if (!py) {
    send({
      t: "done",
      id,
      ok: false,
      kind: "internal",
      etype: "NotReady",
      message: "Python çalışma zamanı hazır değil.",
      traceback: "",
    });
    return;
  }

  // Her çalıştırma sıfırdan başlar
  runId = id;
  seq = 0;
  bytesOut = 0;
  linesOut = 0;
  truncated = false;
  pending = { stdout: "", stderr: "" };
  decOut = new TextDecoder("utf-8");
  decErr = new TextDecoder("utf-8");

  py.setStdout({ write: makeWriter("stdout"), isatty: false });
  py.setStderr({ write: makeWriter("stderr"), isatty: false });

  const t0 = Date.now();

  /**
   * Her çalıştırmaya TEMİZ bir namespace: bir slayttaki değişken diğerine
   * sızmasın. builtins'e dokunulmadığı için gerçek bir izolasyon elde ediyoruz.
   * Kalıcı olan tek şey sys.modules (bir kez import edilen modül) — bu zaten
   * CPython'un normal davranışı.
   */
  let ns: PyProxy | null = null;
  try {
    ns = py.globals.get("dict")();

    // Prelude'a açısal parantezli dosya adı veriyoruz ki traceback'te kaynak
    // satırları görünmesin — öğrenci sadece kendi kodunu görsün.
    await py.runPythonAsync(buildPrelude(stdin), { globals: ns, filename: "<mcbu-prelude>" });

    // Slayta özgü hazırlık (sanal dosya oluşturma, ön tanımlar) — gizli.
    if (setup.trim()) {
      await py.runPythonAsync(setup, { globals: ns, filename: "<mcbu-setup>" });
    }

    // Öğrenci kodu düz bir dosya adıyla çalışır → traceback kaynak satırlarını
    // gösterir, bu da hata okumayı öğretmek için birebir.
    await py.runPythonAsync(code, { globals: ns, filename: PROGRAM_FILENAME });

    py.runPython("import sys; sys.stdout.flush(); sys.stderr.flush()");
    flush();
    send({ t: "done", id, ok: true, ms: Date.now() - t0 });
  } catch (err) {
    try {
      py.runPython("import sys; sys.stdout.flush(); sys.stderr.flush()");
    } catch {
      /* flush başarısız olabilir, önemli değil */
    }
    flush();

    const e = err as PythonErrorLike;
    const etype = e?.type ?? e?.name ?? "Error";
    const raw = e?.message ?? String(err);
    const isEof = etype === "EOFError" && raw.includes("__MCBU_EOF__");

    send({
      t: "done",
      id,
      ok: false,
      kind: isEof ? "eof" : e?.type ? "python" : "internal",
      etype,
      message: raw,
      traceback: cleanTraceback(raw),
    });
  } finally {
    // PyProxy sızıntısı olmasın — destroy edilmezse WASM belleği birikir.
    try {
      ns?.destroy();
    } catch {
      /* yoksay */
    }
    runId = null;
  }
}

/**
 * Traceback'ten harness karelerini ayıklar: öğrenci `<mcbu-prelude>` veya
 * Pyodide'ın kendi iç dosyalarını değil, yalnızca kendi program.py satırlarını
 * görmeli.
 */
function cleanTraceback(tb: string): string {
  const lines = tb.split("\n");
  const out: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (
      l.includes("<mcbu-prelude>") ||
      l.includes("<mcbu-setup>") ||
      l.includes("/lib/python3") ||
      l.includes("pyodide.asm")
    ) {
      // Bu kareyi ve ona ait kaynak satırını atla
      if (i + 1 < lines.length && /^\s{4,}\S/.test(lines[i + 1])) i++;
      continue;
    }
    out.push(l);
  }
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

/* ================================================================== *
 * MESAJ DÖNGÜSÜ
 * ================================================================== */

ctx.onmessage = (e: { data: ToWorker }) => {
  const msg = e.data;
  if (msg.t === "init") {
    void init(msg.indexURL);
  } else if (msg.t === "run") {
    void run(msg.id, msg.code, msg.setup, msg.stdin);
  }
};
