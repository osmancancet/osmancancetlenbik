"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { motion } from "framer-motion";
import {
  Play,
  Square,
  RotateCcw,
  Loader2,
  Check,
  X,
  Lightbulb,
  Eye,
  Undo2,
} from "lucide-react";

import { CodeSurface } from "./CodeSurface";
import { TerminalPanel, type OutLine } from "./TerminalPanel";
import { StdinBox } from "./StdinBox";
import { tokenizePython } from "./highlight";
import { renderTokenLines } from "./renderTokens";
import { compareOutput, type CompareMode } from "./normalize";
import { deriveCodeId, useCodeState } from "./useCodeState";
import { pythonRuntime } from "../python/runtime";
import { explainPythonError, RUNTIME_MESSAGES } from "../python/errors.tr";
import "./code-runner.css";

/* ================================================================== */

export type CodeEditorProps = {
  title: string;
  tabs: string[];
  activeTab: string;

  /** Ham Python kaynağı — TERCİH EDİLEN yol. Hem gösterilir hem çalıştırılır. */
  code?: string;

  /**
   * ESKİ yol: elle renklendirilmiş JSX satırları.
   * Yalnızca geriye dönük uyum için duruyor; `code` verilmişse yok sayılır.
   * Tokenizer'ın sorun çıkardığı tek bir snippet migrasyonu bloklamasın diye
   * kaçış kapısı olarak korunuyor.
   */
  lines?: ReactNode[];

  /**
   * Statik terminal mockup'ı. İKİ işi var:
   *  1. Kod hiç çalıştırılmadan önce "beklenen çıktı" olarak durur.
   *  2. Pyodide CDN'den yüklenemezse (kampüs güvenlik duvarı) yedek olarak
   *     gösterilir — slayt her koşulda bugünkü gibi çalışmaya devam eder.
   */
  terminal?: ReactNode;

  /** h05'teki satır vurgusu (`.prog-line-hl`). */
  highlight?: number[];

  /** Önceden doldurulan stdin satırları. */
  stdin?: string;
  /** Kodda input() yoksa bile girdi kutusunu göster. */
  showStdin?: boolean;

  /**
   * Öğrenciye GÖSTERİLMEYEN hazırlık kodu: dosya G/Ç slaytlarında sanal
   * dosyayı oluşturur, parça-kod slaytlarında önceki adımdan gelen
   * değişkenleri tanımlar. Traceback'ten filtrelenir.
   */
  setup?: string;

  /** Salt-okunur göster (çalıştırma butonu çıkmaz). */
  readOnly?: boolean;

  /** sessionStorage anahtarı; verilmezse başlık+koddan türetilir. */
  id?: string;

  /* ---- alıştırma modu ---- */
  mode?: "run" | "exercise";
  /** GERÇEK Pyodide çıktısından alınmalı — elle yazma (Python `60.0` yazar, `60` değil). */
  expectedOutput?: string;
  compare?: CompareMode;
  ignoreCase?: boolean;
  hints?: string[];
  solution?: string;
};

type Phase = "idle" | "running" | "done";

/* ================================================================== */

export function CodeEditor(props: CodeEditorProps) {
  const {
    title,
    tabs,
    activeTab,
    code: initialCode,
    lines: legacyLines,
    terminal,
    highlight,
    stdin: initialStdin = "",
    showStdin,
    setup = "",
    readOnly = false,
    id,
    mode = "run",
    expectedOutput,
    compare = "loose",
    ignoreCase = false,
    hints = [],
    solution,
  } = props;

  const isExercise = mode === "exercise";
  const hasCode = typeof initialCode === "string";

  const codeId = useMemo(
    () => id ?? deriveCodeId(title, initialCode ?? ""),
    [id, title, initialCode]
  );
  const [code, setCode, resetCode, dirty] = useCodeState(codeId, initialCode ?? "");

  const [stdin, setStdin] = useState(initialStdin);
  const [chunks, setChunks] = useState<OutLine[]>([]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [note, setNote] = useState<ReactNode>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [flashStdin, setFlashStdin] = useState(false);
  const [hintsShown, setHintsShown] = useState(0);
  const [solutionShown, setSolutionShown] = useState(false);
  const [preSolutionCode, setPreSolutionCode] = useState<string | null>(null);
  const [result, setResult] = useState<"pass" | "fail" | "error" | null>(null);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const taRef = useRef<HTMLTextAreaElement | null>(null);

  const status = useSyncExternalStore(
    (cb) => pythonRuntime.subscribe(cb),
    () => pythonRuntime.status,
    () => "cold" as const
  );

  const inputCount = useMemo(() => (code.match(/\binput\s*\(/g) || []).length, [code]);
  const needsStdin = showStdin || inputCount > 0;

  /* ---- Pyodide'ı önden ısıt: editörlü slayt açılınca indirmeye başla ---- */
  useEffect(() => {
    if (!hasCode || readOnly) return;
    pythonRuntime.warmup();
  }, [hasCode, readOnly]);

  /* ---- Gezinme bölgesi çakışması: body bayrağı (bkz. code-runner.css §6) ---- */
  const engage = useCallback(() => {
    document.body.dataset.pyrunEngaged = "1";
  }, []);
  const disengage = useCallback(() => {
    // Odak hâlâ kartın içindeyse bırakma
    if (cardRef.current?.contains(document.activeElement)) return;
    delete document.body.dataset.pyrunEngaged;
  }, []);
  useEffect(() => () => { delete document.body.dataset.pyrunEngaged; }, []);

  /* ---- Çalıştır ---- */
  const handleRun = useCallback(async () => {
    if (phase === "running") return;

    setChunks([]);
    setNote(null);
    setResult(null);
    setFlashStdin(false);
    setPhase("running");

    let stdout = "";
    const stdinLines = stdin === "" ? [] : stdin.replace(/\n+$/, "").split("\n");

    const outcome = await pythonRuntime.run({
      code,
      setup,
      stdin: stdinLines,
      onOutput: (c) => {
        if (c.stream === "stdout") stdout += c.text;
        setChunks((prev) => [...prev, c]);
      },
    });

    setPhase("done");

    /* ---- sonucu yorumla ---- */
    if (outcome.status === "loadError") {
      setLoadFailed(true);
      setNote(
        <div className="pyrun-note-err px-3 py-2 mt-3 rounded-r text-[11px]">
          {RUNTIME_MESSAGES.loadError}
        </div>
      );
      return;
    }

    if (outcome.status === "timeout") {
      setResult("error");
      setNote(
        <div className="pyrun-note-err px-3 py-2 mt-3 rounded-r text-[11px]">
          {RUNTIME_MESSAGES.timeout}
        </div>
      );
      return;
    }

    if (outcome.status === "stopped") {
      setNote(
        <div className="pyrun-note-info px-3 py-2 mt-3 rounded-r text-[11px]">
          {RUNTIME_MESSAGES.stopped}
        </div>
      );
      return;
    }

    if (outcome.status === "error") {
      setResult("error");

      if (outcome.kind === "eof") {
        setFlashStdin(true);
        setNote(
          <div className="pyrun-note-err px-3 py-2 mt-3 rounded-r text-[11px]">
            ✗ {RUNTIME_MESSAGES.eof}
          </div>
        );
        return;
      }

      if (outcome.etype === "OutputTooLong") {
        setNote(
          <div className="pyrun-note-err px-3 py-2 mt-3 rounded-r text-[11px]">
            {RUNTIME_MESSAGES.outputTooLong}
          </div>
        );
        return;
      }

      const tr = explainPythonError(outcome.etype, outcome.message);
      setNote(
        <div className="mt-3 space-y-2">
          <div className="pyrun-note-err px-3 py-2 rounded-r text-[11px]">
            <span className="font-semibold">{outcome.etype}</span>
            {tr ? <> — {tr}</> : null}
          </div>
          {outcome.traceback && (
            <details className="text-[10px]">
              <summary className="cursor-pointer text-gray-500 hover:text-gray-300 select-none">
                Ham hata çıktısı (Python&apos;un kendi mesajı)
              </summary>
              <div className="pyrun-trace mt-1.5">{outcome.traceback}</div>
            </details>
          )}
        </div>
      );
      return;
    }

    /* ---- başarılı çalıştı ---- */
    if (isExercise && typeof expectedOutput === "string") {
      const cmp = compareOutput(stdout, expectedOutput, { mode: compare, ignoreCase });
      if (cmp.pass) {
        setResult("pass");
        setNote(
          <div className="pyrun-note-ok px-3 py-2 mt-3 rounded-r text-[11px]">
            ✓ Doğru — beklenen çıktıyı ürettin.
          </div>
        );
      } else {
        setResult("fail");
        setNote(
          <div className="pyrun-note-err px-3 py-2 mt-3 rounded-r text-[11px] space-y-1">
            <div>✗ Bekleneni karşılamadı.</div>
            {cmp.line !== null && (
              <div className="font-mono text-[10px] leading-relaxed">
                <div>
                  Satır {cmp.line}: bekleniyor → {JSON.stringify(cmp.expected ?? "")}
                </div>
                <div className="pl-[4.2em]">senin → {JSON.stringify(cmp.actual ?? "")}</div>
              </div>
            )}
            {hints.length > 0 && hintsShown < hints.length && (
              <div className="opacity-80">İpucu butonunu deneyebilirsin.</div>
            )}
          </div>
        );
      }
    }
  }, [
    code, setup, stdin, phase, isExercise, expectedOutput, compare, ignoreCase, hints.length, hintsShown,
  ]);

  const handleReset = useCallback(() => {
    resetCode();
    setChunks([]);
    setNote(null);
    setResult(null);
    setStdin(initialStdin);
  }, [resetCode, initialStdin]);

  const handleShowSolution = useCallback(() => {
    if (!solution) return;
    if (!solutionShown) {
      const ok = window.confirm(
        "Çözümü göstermek istediğine emin misin?\n\nÖnce ipuçlarını denemek çok daha fazla öğretir."
      );
      if (!ok) return;
      setPreSolutionCode(code);
    }
    setSolutionShown(true);
    setCode(solution);
  }, [solution, solutionShown, code, setCode]);

  /* ---- düğme durumu ---- */
  const running = phase === "running";
  const booting = running && (status === "loading" || status === "cold");
  const runLabel = booting
    ? "Python indiriliyor…"
    : running
      ? "Çalışıyor…"
      : isExercise
        ? "Çalıştır ve kontrol et"
        : "Çalıştır";

  /* ---- salt-okunur / eski `lines` yolu ---- */
  const staticLines = !hasCode && legacyLines;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="prog-window-chrome pyrun-card w-full"
      data-state={result ?? undefined}
      onPointerEnter={engage}
      onPointerLeave={disengage}
      onFocusCapture={engage}
      onBlurCapture={() => setTimeout(disengage, 0)}
      /* Dokunmatikte metin seçme/kaydırma slaytı değiştirmesin — kök
         onTouchStart/onTouchEnd React sentetik olayları bubble ediyor. */
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
    >
      {/* ---- pencere başlığı ---- */}
      <div className="prog-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-semibold flex-1 max-w-md mx-auto text-center justify-center"
          style={{ background: "#0d0d0d", color: "#9cdcfe" }}
        >
          <span className="w-5 h-5 rounded-sm prog-py-tile flex items-center justify-center text-[10px]">
            Py
          </span>
          <span>{title}</span>
        </div>
      </div>

      {/* ---- sekmeler ---- */}
      <div className="prog-editor-tabbar flex">
        {tabs.map((t) => (
          <div
            key={t}
            className={`prog-editor-tab ${t === activeTab ? "prog-editor-tab-active" : ""}`}
          >
            <span
              className="w-3 h-3 rounded-sm"
              style={{
                background: t.endsWith(".py")
                  ? "#3776ab"
                  : t.endsWith(".md")
                    ? "#5fa8e0"
                    : "#ffd43b",
              }}
            />
            {t}
          </div>
        ))}
      </div>

      {/* ---- araç çubuğu ---- */}
      {hasCode && !readOnly && (
        <div className="pyrun-toolbar flex items-center gap-2 px-3 py-2 flex-wrap">
          {running ? (
            <button
              type="button"
              className="pyrun-btn pyrun-btn-stop"
              onClick={() => pythonRuntime.stop()}
            >
              <Square className="w-3 h-3 fill-current" />
              Durdur
            </button>
          ) : (
            <button
              type="button"
              className="pyrun-btn pyrun-btn-run"
              onClick={handleRun}
              onPointerEnter={() => pythonRuntime.warmup()}
              disabled={status === "running"}
              title={status === "running" ? "Başka bir kod çalışıyor" : "Ctrl/Cmd + Enter"}
            >
              <Play className="w-3 h-3 fill-current" />
              {runLabel}
            </button>
          )}

          {running && <Loader2 className="w-3.5 h-3.5 text-gray-400 animate-spin" />}

          <button
            type="button"
            className="pyrun-btn pyrun-btn-ghost"
            onClick={handleReset}
            disabled={!dirty && chunks.length === 0}
            title="Kodu ilk haline döndür"
          >
            <RotateCcw className="w-3 h-3" />
            Sıfırla
          </button>

          {isExercise && hints.length > 0 && (
            <button
              type="button"
              className="pyrun-btn pyrun-btn-ghost"
              onClick={() => setHintsShown((n) => Math.min(n + 1, hints.length))}
              disabled={hintsShown >= hints.length}
            >
              <Lightbulb className="w-3 h-3" />
              İpucu ({Math.min(hintsShown + 1, hints.length)}/{hints.length})
            </button>
          )}

          {isExercise && solution && !solutionShown && (
            <button type="button" className="pyrun-btn pyrun-btn-ghost" onClick={handleShowSolution}>
              <Eye className="w-3 h-3" />
              Çözümü göster
            </button>
          )}

          {solutionShown && preSolutionCode !== null && (
            <button
              type="button"
              className="pyrun-btn pyrun-btn-ghost"
              onClick={() => setCode(preSolutionCode)}
            >
              <Undo2 className="w-3 h-3" />
              Kendi kodumu geri getir
            </button>
          )}

          <div className="flex-1" />

          {result === "pass" && (
            <span className="pyrun-badge pyrun-badge-ok flex items-center gap-1">
              <Check className="w-3 h-3" /> Doğru
            </span>
          )}
          {result === "fail" && (
            <span className="pyrun-badge pyrun-badge-fail flex items-center gap-1">
              <X className="w-3 h-3" /> Tekrar dene
            </span>
          )}
          {solutionShown && (
            <span className="pyrun-badge pyrun-badge-neutral">Çözüm görüntülendi</span>
          )}

          <span className="pyrun-hint hidden md:flex items-center gap-1.5">
            <span className="pyrun-kbd">Tab</span> girinti
            <span className="pyrun-kbd">Ctrl+↵</span> çalıştır
            <span className="pyrun-kbd">Esc</span> odaktan çık
          </span>
        </div>
      )}

      {/* ---- kod ---- */}
      {staticLines ? (
        <LegacyLines lines={legacyLines!} highlight={highlight} />
      ) : (
        <CodeSurface
          value={code}
          onChange={readOnly ? undefined : setCode}
          onRun={readOnly ? undefined : handleRun}
          readOnly={readOnly}
          ariaLabel={`Python kod düzenleyici — ${title}`}
          taRef={taRef}
        />
      )}

      {/* ---- ipuçları ---- */}
      {isExercise && hintsShown > 0 && (
        <div className="px-4 py-2.5 bg-[#171717] border-t border-[#2d2d2d] space-y-1.5">
          {hints.slice(0, hintsShown).map((h, i) => (
            <div key={i} className="pyrun-note-info px-3 py-1.5 rounded-r text-[11px]">
              <span className="opacity-70 mr-1.5">İpucu {i + 1}:</span>
              {h}
            </div>
          ))}
        </div>
      )}

      {/* ---- girdi ---- */}
      {hasCode && !readOnly && needsStdin && (
        <StdinBox
          value={stdin}
          onChange={setStdin}
          inputCount={inputCount}
          flash={flashStdin}
        />
      )}

      {/* ---- terminal ---- */}
      {hasCode && !readOnly ? (
        <TerminalPanel
          chunks={chunks}
          note={note}
          running={running}
          fallback={terminal}
          showFallback={(loadFailed || phase === "idle") && Boolean(terminal)}
        />
      ) : (
        terminal && (
          <div className="prog-terminal px-4 py-3">
            <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              TERMİNAL
            </div>
            {terminal}
          </div>
        )
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * Eski `lines` yolu — yalnızca `code` verilmediğinde kullanılır.
 * ------------------------------------------------------------------ */

function LegacyLines({ lines, highlight }: { lines: ReactNode[]; highlight?: number[] }) {
  return (
    <div className="prog-editor flex">
      <div className="prog-editor-gutter px-3 py-3 select-none">
        {lines.map((_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      <div className="flex-1 px-4 py-3 overflow-x-auto">
        {lines.map((line, i) => (
          <div
            key={i}
            className={`whitespace-pre ${highlight?.includes(i + 1) ? "prog-line-hl" : ""}`}
          >
            {line || " "}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Salt-okunur, çalıştırılamayan ama tokenizer'la renklendirilen gösterim.
 * `code` verilip `readOnly` istendiğinde CodeSurface zaten bunu yapıyor;
 * bu yardımcı yalnızca sunum dışı yerlerde kullanılmak üzere dışa aktarılıyor.
 */
export function StaticCode({ code }: { code: string }) {
  return (
    <pre className="pyrun-pre pyrun-static">{renderTokenLines(tokenizePython(code))}</pre>
  );
}
