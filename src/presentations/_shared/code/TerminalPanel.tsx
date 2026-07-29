"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { TERMINAL_MAX_RENDER_LINES } from "../python/config";

export type OutLine = { stream: "stdout" | "stderr"; text: string };

/**
 * Canlı terminal paneli.
 *
 * Çok uzun çıktıda DOM'u boğmamak için yalnızca son
 * TERMINAL_MAX_RENDER_LINES satır render edilir (worker tarafında ayrıca
 * 200 KB / 5000 satır tavanı var).
 */
export function TerminalPanel({
  chunks,
  note,
  running,
  fallback,
  showFallback,
}: {
  chunks: OutLine[];
  note?: ReactNode;
  running?: boolean;
  /** Mevcut statik mockup — çalıştırıcı yüklenemediğinde gösterilir. */
  fallback?: ReactNode;
  showFallback?: boolean;
}) {
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = boxRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [chunks, note]);

  if (showFallback && fallback) {
    return (
      <div className="prog-terminal px-4 py-3">
        <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gray-500" />
          TERMİNAL · beklenen çıktı
        </div>
        {fallback}
      </div>
    );
  }

  // Bitişik aynı akıştan gelen parçaları birleştir, sonra satırlara böl
  const merged: OutLine[] = [];
  for (const c of chunks) {
    const last = merged[merged.length - 1];
    if (last && last.stream === c.stream) last.text += c.text;
    else merged.push({ ...c });
  }

  const rendered: ReactNode[] = [];
  let lineBudget = TERMINAL_MAX_RENDER_LINES;
  for (let i = merged.length - 1; i >= 0 && lineBudget > 0; i--) {
    const m = merged[i];
    const lines = m.text.split("\n");
    const take = lines.slice(Math.max(0, lines.length - lineBudget));
    lineBudget -= take.length;
    rendered.unshift(
      <span key={i} className={m.stream === "stderr" ? "pyrun-term-err" : undefined}>
        {take.join("\n")}
      </span>
    );
  }

  const empty = merged.length === 0;

  return (
    <div className="pyrun-term px-4 py-3" ref={boxRef} role="status" aria-live="polite">
      <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-2 select-none">
        <span
          className={`w-2 h-2 rounded-full ${
            running ? "bg-yellow-400 animate-pulse" : "bg-green-400"
          }`}
        />
        TERMİNAL
      </div>

      {empty && !note ? (
        <span className="text-gray-600">
          {running ? "Çalışıyor…" : "Kodu çalıştırınca çıktı burada görünecek."}
        </span>
      ) : (
        <>
          {rendered}
          {running && <span className="animate-pulse">▌</span>}
        </>
      )}

      {note}
    </div>
  );
}
