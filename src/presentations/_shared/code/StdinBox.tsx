"use client";

import { CornerDownLeft } from "lucide-react";

/**
 * `input()` için önceden doldurulan girdi kutusu.
 *
 * Pyodide'da input() senkron okuma gerektirdiği için doğrudan çalışmaz
 * (Atomics.wait → SharedArrayBuffer → COOP/COEP → tüm CDN'ler kırılır).
 * Bunun yerine öğrenci girdileri önden buraya yazar; worker'daki prelude
 * input()'u gölgeleyip satırları sırayla verir ve terminale echo eder.
 */
export function StdinBox({
  value,
  onChange,
  inputCount,
  flash,
}: {
  value: string;
  onChange: (v: string) => void;
  /** Koddaki `input(` sayısı — kutudaki satır sayısıyla karşılaştırılır. */
  inputCount: number;
  /** EOF sonrası dikkat çekmek için kısa vurgu. */
  flash?: boolean;
}) {
  const lines = value === "" ? 0 : value.replace(/\n+$/, "").split("\n").length;
  const mismatch = inputCount > 0 && lines < inputCount;

  return (
    <div className="pyrun-stdin px-3 py-2.5">
      <div className="flex items-center justify-between mb-1.5">
        <label
          htmlFor="pyrun-stdin"
          className="pyrun-hint flex items-center gap-1.5 select-none"
        >
          <CornerDownLeft className="w-3 h-3" />
          Girdi (stdin) — her satır bir <span className="text-[#4ec9b0]">input()</span>
        </label>
        <span
          className={`pyrun-hint ${mismatch ? "text-[#f0a05a]" : ""}`}
          title={
            mismatch
              ? "Koddaki input() sayısı kadar satır yoksa program girdi bekleyip duracak."
              : undefined
          }
        >
          {lines} satır · kodda {inputCount} input()
        </span>
      </div>
      <textarea
        id="pyrun-stdin"
        className={`pyrun-stdin-ta ${flash ? "pyrun-flash" : ""}`}
        rows={Math.min(Math.max(inputCount || 1, 1), 5)}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        placeholder={"12\n5"}
        aria-label="Program girdisi — her satır bir input() çağrısına karşılık gelir"
      />
    </div>
  );
}
