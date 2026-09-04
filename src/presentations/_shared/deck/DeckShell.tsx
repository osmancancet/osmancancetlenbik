"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
  Minimize2,
  Printer,
} from "lucide-react";
import type { ReactNode } from "react";
import { useDeck } from "./useDeck";
import "./print.css";

/**
 * Sunum kabuğu: üst şerit, ilerleme çubuğu, slayt geçişi, alt gezinme,
 * kenarlardaki tıklama bölgeleri ve nokta göstergesi.
 *
 * 117 sunum bu iskeleti kendi dosyasına kopyalamış, aralarında yalnızca vurgu
 * rengi değişiyordu. Burada renk tek bir `accent` prop'u; slayt içeriği CSS
 * değişkeni `--deck-accent` üzerinden aynı rengi okuyabiliyor.
 */

export type DeckShellProps = {
  /** Üst şeritte solda duran künye: "BVA 1101 · 1. Hafta · Giriş". */
  label: string;
  /** Vurgu rengi (hex). Slaytlar `var(--deck-accent)` ile erişir. */
  accent: string;
  /** Her slayt bir fonksiyon: aktifken animasyonları tetiklemek için. */
  slides: Array<(active: boolean) => ReactNode>;
  /** Slayt geçişinde yatay kayma miktarı (px). */
  slideOffset?: number;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/** Bu sayının üstünde nokta göstergesi okunaksızlaşıyor. */
const DOT_LIMIT = 24;

export function DeckShell({
  label,
  accent,
  slides,
  slideOffset = 60,
}: DeckShellProps) {
  const search = useSearchParams();
  const printMode = search.get("yazdir") === "1";

  if (printMode) {
    return <PrintDeck label={label} accent={accent} slides={slides} />;
  }
  return (
    <ScreenDeck
      label={label}
      accent={accent}
      slides={slides}
      slideOffset={slideOffset}
    />
  );
}

function ScreenDeck({
  label,
  accent,
  slides,
  slideOffset = 60,
}: DeckShellProps) {
  const deck = useDeck(slides.length);
  const { current, direction, total, isFullscreen } = deck;
  const progress = total > 1 ? (current / (total - 1)) * 100 : 100;

  return (
    <div
      className="deck-root fixed inset-0 overflow-hidden bg-black text-white"
      style={{ ["--deck-accent" as string]: accent }}
      {...deck.touchHandlers}
    >
      {/* İlerleme çubuğu */}
      <div className="absolute top-0 left-0 right-0 h-[3px] z-30 bg-white/5">
        <motion.div
          className="h-full"
          style={{ background: accent }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: EASE }}
        />
      </div>

      {/* Üst şerit */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-4 pointer-events-none">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">
          {label}
        </span>
      </div>

      {/* Slayt */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0, x: direction * slideOffset }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -slideOffset }}
          transition={{ duration: 0.45, ease: EASE }}
          className="absolute inset-0"
        >
          {slides[current]?.(true)}
        </motion.div>
      </AnimatePresence>

      {/* Kenar tıklama bölgeleri — sunumu fareyle ilerletmek için */}
      <button
        onClick={deck.prev}
        aria-label="Önceki slayt"
        disabled={current === 0}
        className="absolute inset-y-0 left-0 w-[10%] z-10 cursor-w-resize disabled:cursor-default focus-visible:bg-white/5"
      />
      <button
        onClick={deck.next}
        aria-label="Sonraki slayt"
        disabled={current === total - 1}
        className="absolute inset-y-0 right-0 w-[10%] z-10 cursor-e-resize disabled:cursor-default focus-visible:bg-white/5"
      />

      {/* Alt gezinme */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-5">
        <button
          onClick={deck.prev}
          disabled={current === 0}
          className="inline-flex items-center gap-1.5 text-sm text-white/45 hover:text-white disabled:opacity-25 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Önceki
        </button>

        {/* Nokta göstergesi yalnızca kısa sunumlarda okunabilir; 70 slaytta
            noktalar taşıyor ve tek tek tıklanamayacak kadar küçülüyor.
            Uzun sunumda yerini tıklanabilir bir şerit alıyor. */}
        {total <= DOT_LIMIT ? (
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => deck.goTo(i)}
                aria-label={`${i + 1}. slayda git`}
                aria-current={i === current ? "true" : undefined}
                className="p-1 group"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all ${
                    i === current
                      ? "w-6"
                      : "w-1.5 bg-white/20 group-hover:bg-white/45"
                  }`}
                  style={i === current ? { background: accent } : undefined}
                />
              </button>
            ))}
          </div>
        ) : (
          <div
            role="slider"
            tabIndex={0}
            aria-label="Slayt seçici"
            aria-valuemin={1}
            aria-valuemax={total}
            aria-valuenow={current + 1}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") deck.next();
              if (e.key === "ArrowLeft") deck.prev();
            }}
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              const ratio = (e.clientX - r.left) / r.width;
              deck.goTo(Math.round(ratio * (total - 1)));
            }}
            className="relative h-6 w-56 md:w-80 flex items-center cursor-pointer group"
          >
            <span className="block w-full h-1 rounded-full bg-white/12 group-hover:bg-white/20 transition-colors" />
            <span
              className="absolute h-1 rounded-full pointer-events-none transition-all"
              style={{
                background: accent,
                width: `${((current + 1) / total) * 100}%`,
              }}
            />
            <span
              className="absolute w-2.5 h-2.5 rounded-full pointer-events-none transition-all -translate-x-1/2"
              style={{
                background: accent,
                insetInlineStart: `${((current + 1) / total) * 100}%`,
              }}
            />
          </div>
        )}

        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-white/35 tabular-nums">
            {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button
            onClick={deck.toggleFullscreen}
            aria-label={isFullscreen ? "Tam ekrandan çık" : "Tam ekran"}
            className="text-white/45 hover:text-white transition-colors"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
          <a
            href="?yazdir=1"
            aria-label="PDF olarak indir"
            title="PDF olarak indir"
            className="text-white/45 hover:text-white transition-colors"
          >
            <Download className="w-4 h-4" />
          </a>
          <button
            onClick={deck.next}
            disabled={current === total - 1}
            className="inline-flex items-center gap-1.5 text-sm text-white/45 hover:text-white disabled:opacity-25 transition-colors"
          >
            Sonraki
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Yazdırma kipi: bütün slaytlar üst üste, her biri bir sayfa.
 *
 * Animasyonlar takılırsa içerik görünmez kalır (hepsi opacity 0 ile
 * başlıyor); bu yüzden yazdırma penceresi ancak slaytlar yerine oturduktan
 * sonra açılıyor.
 */
function PrintDeck({
  label,
  accent,
  slides,
}: Omit<DeckShellProps, "slideOffset">) {
  const [hazir, setHazir] = useState(false);

  useEffect(() => {
    // Slayt giriş animasyonlarının bitmesini bekle.
    const t = setTimeout(() => setHazir(true), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="deck-print min-h-screen"
      style={{ ["--deck-accent" as string]: accent }}
    >
      <div className="deck-print-toolbar sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 px-6 py-4 mb-4 bg-black/85 backdrop-blur border-b border-white/10">
        <div className="text-sm text-white/60">
          <strong className="text-white">{slides.length} slayt</strong> yazdırma
          düzeninde. Kaydetme penceresinde{" "}
          <strong className="text-white">Hedef: PDF olarak kaydet</strong> ve{" "}
          <strong className="text-white">Kenar boşlukları: Yok</strong> seçin.
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => window.print()}
            disabled={!hazir}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold disabled:opacity-40"
            style={{ background: accent, color: "#000" }}
          >
            <Printer className="w-4 h-4" />
            {hazir ? "PDF olarak kaydet" : "Hazırlanıyor…"}
          </button>
          <a
            href="?"
            className="px-4 py-2 rounded-md text-sm border border-white/20 text-white/60 hover:text-white"
          >
            Sunuma dön
          </a>
        </div>
      </div>

      <span className="sr-only">{label}</span>

      {slides.map((render, i) => (
        <div key={i} className="deck-print-slide">
          {render(true)}
        </div>
      ))}
    </div>
  );
}

/* ─── Slayt yapı taşları ────────────────────────────────────────────
   117 sunumda birebir aynı tanımlanmış olan primitifler. */

export function Slide({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="w-full h-full flex items-center justify-center px-8 md:px-16 py-20">
      <div className={`w-full max-w-5xl ${className}`}>{children}</div>
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 mb-5">
      <span
        className="w-8 h-px"
        style={{ background: "var(--deck-accent)" }}
        aria-hidden
      />
      <span
        className="font-mono text-[11px] uppercase tracking-[0.22em]"
        style={{ color: "var(--deck-accent)" }}
      >
        {children}
      </span>
    </div>
  );
}

export function H1({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.08] text-white">
      {children}
    </h2>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-white">
      {children}
    </h2>
  );
}

export function Sub({ children }: { children: ReactNode }) {
  return (
    <p className="mt-5 text-lg md:text-xl leading-relaxed text-white/55 max-w-3xl">
      {children}
    </p>
  );
}

/** Kaynak künyesi — her iddianın nereden geldiğini slaytta göstermek için. */
export function Source({ children }: { children: ReactNode }) {
  return (
    <p className="mt-8 font-mono text-[11px] leading-relaxed text-white/25">
      {children}
    </p>
  );
}
