/**
 * Tekil Pyodide worker yöneticisi (yalnızca tarayıcı).
 *
 * Slaytlardaki TÜM editörler tek bir worker'ı paylaşır: 13 MB'lık çalışma
 * zamanı bir kez inip bir kez başlar. Aynı anda tek çalıştırmaya izin verilir;
 * bir kod koşarken diğer editörlerin "Çalıştır" butonları devre dışı kalır
 * (kuyruğa almak yerine devre dışı bırakmak ders ortamında daha öngörülebilir).
 */

import {
  BOOT_TIMEOUT_MS,
  DEFAULT_TIMEOUT_MS,
  PYODIDE_CDN_BASE,
} from "./config";
import type { FromWorker, RunOutcome, ToWorker } from "./protocol";

export type RuntimeStatus =
  /** Henüz hiçbir şey indirilmedi. */
  | "cold"
  /** Pyodide iniyor / başlıyor. */
  | "loading"
  /** Hazır, çalıştırılabilir. */
  | "ready"
  /** Şu anda bir kod koşuyor. */
  | "running"
  /** Yüklenemedi (ağ engeli vb.) — kalıcı. */
  | "failed";

export type OutputChunk = { stream: "stdout" | "stderr"; text: string };

type RunRequest = {
  code: string;
  /** Öğrenciye gösterilmeyen hazırlık kodu (sanal dosya, ön tanımlar). */
  setup?: string;
  stdin: string[];
  timeoutMs?: number;
  onOutput: (chunk: OutputChunk) => void;
};

const isBrowser = typeof window !== "undefined" && typeof Worker !== "undefined";

class PythonRuntime {
  private worker: Worker | null = null;
  private _status: RuntimeStatus = "cold";
  private listeners = new Set<() => void>();

  /** Yükleme hatası mesajı (status === "failed" iken doludur). */
  loadErrorMessage: string | null = null;

  private bootWaiters: Array<(ok: boolean) => void> = [];
  private bootTimer: ReturnType<typeof setTimeout> | null = null;

  private activeRun: {
    id: string;
    onOutput: (c: OutputChunk) => void;
    resolve: (o: RunOutcome) => void;
    timer: ReturnType<typeof setTimeout> | null;
    /** Worker terminate edilirken sonucun ne sayılacağı. */
    killReason: "timeout" | "stopped" | "truncated" | null;
  } | null = null;

  private runCounter = 0;

  get status(): RuntimeStatus {
    return this._status;
  }

  subscribe(fn: () => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private setStatus(s: RuntimeStatus) {
    if (this._status === s) return;
    this._status = s;
    this.listeners.forEach((f) => f());
  }

  /* ---------------------------------------------------------------- *
   * Worker yaşam döngüsü
   * ---------------------------------------------------------------- */

  private spawn() {
    if (!isBrowser || this.worker) return;

    // Turbopack bu ifadeyi statik olarak analiz edip ayrı bir chunk üretir ve
    // {type:"module"} seçeneğini siler → worker CLASSIC doğar (importScripts
    // kullanılabilir). Bu yüzden burada seçenek nesnesi VERİLMEZ.
    this.worker = new Worker(new URL("./pyodide.worker.ts", import.meta.url));
    this.worker.onmessage = (e: MessageEvent<FromWorker>) => this.onMessage(e.data);
    this.worker.onerror = () => {
      this.failBoot("Python çalıştırıcı başlatılamadı.");
    };

    this.setStatus("loading");
    this.post({ t: "init", indexURL: PYODIDE_CDN_BASE });

    this.bootTimer = setTimeout(() => {
      this.failBoot(
        "Python çalıştırıcı yüklenemedi (ağ engeli olabilir). Kodu düzenleyebilirsin ama çalıştıramazsın."
      );
    }, BOOT_TIMEOUT_MS);
  }

  private post(msg: ToWorker) {
    this.worker?.postMessage(msg);
  }

  private clearBootTimer() {
    if (this.bootTimer !== null) {
      clearTimeout(this.bootTimer);
      this.bootTimer = null;
    }
  }

  private failBoot(message: string) {
    this.clearBootTimer();
    this.loadErrorMessage = message;
    this.setStatus("failed");
    this.bootWaiters.forEach((w) => w(false));
    this.bootWaiters = [];

    // Aktif bir çalıştırma varsa onu da düşür
    const run = this.activeRun;
    if (run) {
      this.activeRun = null;
      if (run.timer) clearTimeout(run.timer);
      run.resolve({ status: "loadError", message });
    }
    this.killWorker();
  }

  private killWorker() {
    if (!this.worker) return;
    this.worker.onmessage = null;
    this.worker.onerror = null;
    this.worker.terminate();
    this.worker = null;
  }

  /**
   * Pyodide'ı önden indirmeye başlar. Editörlü slayt mount olduğunda ve
   * "Çalıştır" butonuna fare yaklaştığında çağrılır. Sayfa açılışında ÇAĞRILMAZ:
   * koda hiç bakmayacak bir ziyaretçiye 13 MB indirtmek doğru değil.
   */
  warmup() {
    if (!isBrowser) return;
    if (this._status === "failed") return;
    // Mobil veri tasarrufu açıksa kullanıcı butona basana kadar indirme.
    const conn = (navigator as { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;
    this.spawn();
  }

  /** Yüklemenin bitmesini bekler. Zaten hazırsa anında döner. */
  private waitForBoot(): Promise<boolean> {
    if (this._status === "ready" || this._status === "running") return Promise.resolve(true);
    if (this._status === "failed") return Promise.resolve(false);
    this.spawn();
    return new Promise((resolve) => this.bootWaiters.push(resolve));
  }

  /* ---------------------------------------------------------------- *
   * Mesaj işleme
   * ---------------------------------------------------------------- */

  private onMessage(msg: FromWorker) {
    switch (msg.t) {
      case "ready": {
        this.clearBootTimer();
        this.setStatus(this.activeRun ? "running" : "ready");
        this.bootWaiters.forEach((w) => w(true));
        this.bootWaiters = [];
        return;
      }
      case "loadError": {
        this.failBoot(
          `Python çalıştırıcı yüklenemedi (ağ engeli olabilir). Kodu düzenleyebilirsin ama çalıştıramazsın.`
        );
        return;
      }
      case "out": {
        const run = this.activeRun;
        if (!run || run.id !== msg.id) return; // bayat çıktı
        run.onOutput({ stream: msg.stream, text: msg.text });
        return;
      }
      case "truncated": {
        const run = this.activeRun;
        if (!run || run.id !== msg.id) return;
        // Python tarafı hâlâ dönüyor olabilir — tek durdurma yolu terminate.
        run.killReason = "truncated";
        this.hardStop();
        return;
      }
      case "done": {
        const run = this.activeRun;
        if (!run || run.id !== msg.id) return;
        this.activeRun = null;
        if (run.timer) clearTimeout(run.timer);
        this.setStatus("ready");
        run.resolve(
          msg.ok
            ? { status: "ok", ms: msg.ms }
            : {
                status: "error",
                kind: msg.kind,
                etype: msg.etype,
                message: msg.message,
                traceback: msg.traceback,
              }
        );
        return;
      }
    }
  }

  /* ---------------------------------------------------------------- *
   * Çalıştırma
   * ---------------------------------------------------------------- */

  async run(req: RunRequest): Promise<RunOutcome> {
    if (!isBrowser) return { status: "loadError", message: "Tarayıcı gerekli." };
    if (this.activeRun) {
      return { status: "loadError", message: "Şu anda başka bir kod çalışıyor." };
    }

    const booted = await this.waitForBoot();
    if (!booted) {
      return {
        status: "loadError",
        message: this.loadErrorMessage ?? "Python çalıştırıcı yüklenemedi.",
      };
    }

    const id = `r${++this.runCounter}`;
    const timeoutMs = req.timeoutMs ?? DEFAULT_TIMEOUT_MS;

    return new Promise<RunOutcome>((resolve) => {
      const timer = setTimeout(() => {
        const run = this.activeRun;
        if (!run || run.id !== id) return;
        run.killReason = "timeout";
        this.hardStop();
      }, timeoutMs);

      this.activeRun = { id, onOutput: req.onOutput, resolve, timer, killReason: null };
      this.setStatus("running");
      this.post({ t: "run", id, code: req.code, setup: req.setup ?? "", stdin: req.stdin });
    });
  }

  /** Kullanıcının "Durdur" butonu. */
  stop() {
    const run = this.activeRun;
    if (!run) return;
    run.killReason = "stopped";
    this.hardStop();
  }

  /**
   * Worker'ı öldürür ve arka planda yenisini doğurur.
   *
   * Sonsuz döngüdeki bir worker'ın olay döngüsü bloke olduğu için postMessage
   * ile durdurmak imkânsız — terminate() tek yol. Respawn maliyeti düşük:
   * WASM ve stdlib HTTP önbelleğinden gelir (~1.5-3 sn) ve kullanıcı beklemeden
   * arka planda başlar.
   */
  private hardStop() {
    const run = this.activeRun;
    this.activeRun = null;
    this.clearBootTimer();
    this.killWorker();

    if (run) {
      if (run.timer) clearTimeout(run.timer);
      const reason = run.killReason;
      run.resolve(
        reason === "timeout"
          ? { status: "timeout" }
          : reason === "truncated"
            ? { status: "error", kind: "internal", etype: "OutputTooLong", message: "", traceback: "" }
            : { status: "stopped" }
      );
    }

    this.setStatus("cold");
    // Bir sonraki çalıştırma beklemesin diye hemen yeniden doğur.
    this.spawn();
  }
}

export const pythonRuntime = new PythonRuntime();
