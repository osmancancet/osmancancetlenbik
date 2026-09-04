"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

/**
 * Sunum diyagramları.
 *
 * Hepsi satır içi SVG — kütüphane yok, çevrimdışı çalışır, projeksiyonda
 * bulanıklaşmaz. Renk `--deck-accent` değişkeninden geliyor, böylece diyagram
 * hangi sunuma konursa onun rengini alıyor.
 *
 * Tasarım kararı: diyagramlar metnin yerine değil, metnin ANLAŞILMASI için
 * var. Bir liste diyagrama çevrilince bilgi artmıyorsa çevrilmemeli.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Karşılaştırma çubuğu ──────────────────────────────────────────
   İki sayıyı yan yana koyup aradaki farkı göz kararı anlaşılır kılar. */

export function CompareBars({
  items,
  unit = "",
}: {
  items: Array<{ label: string; value: number; caption?: string; muted?: boolean }>;
  unit?: string;
}) {
  const max = Math.max(...items.map((i) => i.value), 1);

  return (
    <div className="space-y-5">
      {items.map((it, i) => (
        <div key={it.label}>
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-white/70">{it.label}</span>
            <span
              className="font-mono text-2xl tabular-nums"
              style={{ color: it.muted ? "rgba(255,255,255,0.4)" : "var(--deck-accent)" }}
            >
              {it.value.toLocaleString("tr")}
              {unit && <span className="text-sm ms-1">{unit}</span>}
            </span>
          </div>
          <div className="h-3 rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: it.muted
                  ? "rgba(255,255,255,0.22)"
                  : "var(--deck-accent)",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${(it.value / max) * 100}%` }}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.15, ease: EASE }}
            />
          </div>
          {it.caption && (
            <p className="mt-2 text-sm text-white/45 leading-relaxed">
              {it.caption}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Karar ağacı ───────────────────────────────────────────────────
   "Hangisini seçmeliyim" tipi slaytlarda listeden çok daha hızlı okunuyor. */

export type DecisionNode = {
  question: string;
  branches: Array<{ answer: string; result: string; detail?: string }>;
};

export function DecisionTree({ nodes }: { nodes: DecisionNode[] }) {
  return (
    <div className="space-y-4">
      {nodes.map((n, i) => (
        <motion.div
          key={n.question}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 + i * 0.12, ease: EASE }}
          className="grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.2fr)] items-center gap-4"
        >
          <div className="ai-card px-5 py-4">
            <span className="text-white/80">{n.question}</span>
          </div>

          <svg
            width="40"
            height="24"
            viewBox="0 0 40 24"
            className="hidden md:block shrink-0"
            aria-hidden
          >
            <path
              d="M0 12 H30"
              stroke="var(--deck-accent)"
              strokeWidth="1.5"
              opacity="0.5"
            />
            <path
              d="M30 12 l-6 -4 v8 z"
              fill="var(--deck-accent)"
              opacity="0.7"
            />
          </svg>

          <div className="space-y-2">
            {n.branches.map((b) => (
              <div key={b.answer} className="flex items-start gap-3">
                <span
                  className="font-mono text-[11px] uppercase tracking-wider shrink-0 pt-1 w-14"
                  style={{ color: "var(--deck-accent)" }}
                >
                  {b.answer}
                </span>
                <div>
                  <div className="text-white">{b.result}</div>
                  {b.detail && (
                    <div className="text-sm text-white/45 leading-relaxed mt-0.5">
                      {b.detail}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Akış şeması ───────────────────────────────────────────────────
   Bir sürecin adımlarını ve her adımda yapay zekânın nereye girdiğini
   gösterir. Metinle anlatınca kaybolan "sıra" bilgisi burada görünüyor. */

export function FlowSteps({
  steps,
}: {
  steps: Array<{ label: string; ai?: string; you?: string }>;
}) {
  return (
    <div className="relative">
      {/* Dikey omurga */}
      <div
        aria-hidden
        className="absolute start-[15px] top-3 bottom-3 w-px"
        style={{ background: "color-mix(in srgb, var(--deck-accent) 30%, transparent)" }}
      />
      <div className="space-y-5">
        {steps.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.1, ease: EASE }}
            className="relative flex items-start gap-5"
          >
            <span
              className="relative z-10 grid place-items-center w-8 h-8 shrink-0 rounded-full font-mono text-xs"
              style={{
                background: "var(--deck-accent)",
                color: "#000",
              }}
            >
              {i + 1}
            </span>
            <div className="flex-1 pt-1">
              <div className="text-white font-medium mb-1.5">{s.label}</div>
              <div className="grid sm:grid-cols-2 gap-2">
                {s.ai && (
                  <div className="text-sm text-white/55 leading-relaxed">
                    <span
                      className="font-mono text-[10px] uppercase tracking-wider block mb-0.5"
                      style={{ color: "var(--deck-accent)" }}
                    >
                      Yapay zekâ
                    </span>
                    {s.ai}
                  </div>
                )}
                {s.you && (
                  <div className="text-sm text-white/55 leading-relaxed">
                    <span className="font-mono text-[10px] uppercase tracking-wider block mb-0.5 text-white/35">
                      Siz
                    </span>
                    {s.you}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Dört bölge ────────────────────────────────────────────────────
   İki eksende karar: "ne kadar riskli" × "ne kadar zaman kazandırır". */

export function Quadrant({
  xLabel,
  yLabel,
  cells,
}: {
  xLabel: [string, string];
  yLabel: [string, string];
  cells: Array<{ x: 0 | 1; y: 0 | 1; title: string; items: string[] }>;
}) {
  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-3">
        {[
          [0, 1],
          [1, 1],
          [0, 0],
          [1, 0],
        ].map(([x, y], i) => {
          const cell = cells.find((c) => c.x === x && c.y === y);
          if (!cell) return <div key={i} />;
          // Sağ üst = en değerli bölge; onu vurguluyoruz.
          const highlight = x === 1 && y === 1;
          return (
            <motion.div
              key={cell.title}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: EASE }}
              className="ai-card p-5 min-h-[9.5rem]"
              style={
                highlight
                  ? {
                      borderColor:
                        "color-mix(in srgb, var(--deck-accent) 55%, transparent)",
                      background:
                        "color-mix(in srgb, var(--deck-accent) 7%, transparent)",
                    }
                  : undefined
              }
            >
              <div
                className="font-mono text-[11px] uppercase tracking-[0.16em] mb-2.5"
                style={{
                  color: highlight ? "var(--deck-accent)" : "rgba(255,255,255,0.4)",
                }}
              >
                {cell.title}
              </div>
              <ul className="space-y-1 text-sm text-white/55 leading-relaxed">
                {cell.items.map((it) => (
                  <li key={it}>· {it}</li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-white/30">
        <span>← {xLabel[0]}</span>
        <span>{xLabel[1]} →</span>
      </div>
      <div className="mt-1 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-white/25">
        yukarı: {yLabel[1]} · aşağı: {yLabel[0]}
      </div>
    </div>
  );
}

/* ─── Zaman çizgisi ─────────────────────────────────────────────── */

export function Timeline({
  items,
}: {
  items: Array<{ when: string; title: string; detail: string }>;
}) {
  return (
    <div className="grid md:grid-cols-4 gap-4">
      {items.map((it, i) => (
        <motion.div
          key={it.when}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 + i * 0.12, ease: EASE }}
          className="relative"
        >
          {/* Yatay bağlantı çizgisi — son öğede yok */}
          {i < items.length - 1 && (
            <div
              aria-hidden
              className="hidden md:block absolute top-3 start-1/2 w-full h-px"
              style={{
                background:
                  "color-mix(in srgb, var(--deck-accent) 28%, transparent)",
              }}
            />
          )}
          <span
            className="relative z-10 block w-6 h-6 rounded-full grid place-items-center mb-4"
            style={{ background: "var(--deck-accent)" }}
          >
            <span className="w-2 h-2 rounded-full bg-black" />
          </span>
          <div
            className="font-mono text-[11px] uppercase tracking-[0.16em] mb-1.5"
            style={{ color: "var(--deck-accent)" }}
          >
            {it.when}
          </div>
          <div className="text-white font-medium mb-1">{it.title}</div>
          <div className="text-sm text-white/50 leading-relaxed">{it.detail}</div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Büyük sayı ────────────────────────────────────────────────── */

export function BigStat({
  value,
  label,
  detail,
}: {
  value: string;
  label: string;
  detail?: ReactNode;
}) {
  return (
    <div>
      <div
        className="text-6xl md:text-7xl font-semibold tracking-tight tabular-nums"
        style={{ color: "var(--deck-accent)" }}
      >
        {value}
      </div>
      <div className="mt-2 text-white/70">{label}</div>
      {detail && (
        <div className="mt-2 text-sm text-white/45 leading-relaxed">{detail}</div>
      )}
    </div>
  );
}
