"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  GitBranch,
  Grid3x3,
  Circle,
  Ruler,
  Palette,
  Shapes,
  Spline,
  Boxes,
  Eye,
  AlertTriangle,
  Check,
  X,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Calendar,
  Target,
  Code2,
  Database,
  ListChecks,
  MousePointerClick,
  Sparkles,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import "./styles.css";

/* ============================================================
   PRIMITIVES
   ============================================================ */

function SlideShell({
  children,
  bgPattern = true,
}: {
  children: ReactNode;
  bgPattern?: boolean;
}) {
  return (
    <div className="relative w-full h-full flex items-center justify-center px-12 py-16">
      {bgPattern && (
        <div className="absolute inset-0 vg-grid-bg pointer-events-none" />
      )}
      <div className="relative z-10 w-full max-w-6xl">{children}</div>
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-3 mb-6 text-xs font-mono uppercase tracking-[0.25em] text-[#ef4444]"
    >
      <span className="w-8 h-px bg-[#ef4444]" />
      {children}
    </motion.div>
  );
}

function H1({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] text-white ${className}`}
    >
      {children}
    </motion.h1>
  );
}

function H2({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`text-3xl md:text-5xl font-semibold tracking-tight text-white ${className}`}
    >
      {children}
    </motion.h2>
  );
}

function Sub({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`text-lg md:text-xl text-gray-400 leading-relaxed ${className}`}
    >
      {children}
    </motion.p>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  desc,
  delay = 0,
  accent = "#ef4444",
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  delay?: number;
  accent?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="vg-card vg-card-hover rounded-xl p-6 transition-all"
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
        style={{
          background: `${accent}15`,
          border: `1px solid ${accent}40`,
        }}
      >
        <Icon className="w-6 h-6" style={{ color: accent }} />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function WindowChrome({
  title,
  children,
  badge,
}: {
  title: string;
  children: ReactNode;
  badge?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="vg-window-chrome w-full"
    >
      <div className="vg-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-semibold flex-1 max-w-md mx-auto text-center justify-center"
          style={{ background: "#0d0d0d", color: "#fca5a5" }}
        >
          <span className="w-5 h-5 rounded-sm vg-tool-tile flex items-center justify-center text-[11px]">
            {badge ?? "V"}
          </span>
          <span>{title}</span>
        </div>
      </div>
      <div className="p-4 bg-[#0a0a0a]">{children}</div>
    </motion.div>
  );
}

function SectionDivider({
  num,
  total,
  title,
  subtitle,
  bgGradient,
  shadow,
  icon,
}: {
  num: string;
  total: string;
  title: string;
  subtitle: string;
  bgGradient: string;
  shadow: string;
  icon: ReactNode;
}) {
  return (
    <SlideShell bgPattern={false}>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex w-32 h-32 rounded-3xl items-center justify-center mb-8 vg-pulse"
          style={{
            background: bgGradient,
            boxShadow: shadow,
          }}
        >
          {icon}
        </motion.div>
        <Eyebrow>
          Bölüm {num} / {total}
        </Eyebrow>
        <H1>{title}</H1>
        <Sub className="mt-6 max-w-2xl mx-auto">{subtitle}</Sub>
      </div>
    </SlideShell>
  );
}

/* ============================================================
   TOPIC MOCKUPS — çok değişkenli görselleştirme
   ============================================================ */

type Car = {
  name: string;
  mpg: number; // tüketim verimi (yüksek = iyi)
  hp: number; // beygir
  weight: number; // ağırlık (ton)
  cyl: number; // silindir (kategori)
};

// Küçük, gerçekçi bir araç tablosu (mtcars'tan esinli, yuvarlatılmış)
const CARS: Car[] = [
  { name: "Compact A", mpg: 33, hp: 66, weight: 1.0, cyl: 4 },
  { name: "Compact B", mpg: 30, hp: 78, weight: 1.2, cyl: 4 },
  { name: "Sedan A", mpg: 24, hp: 110, weight: 1.5, cyl: 6 },
  { name: "Sedan B", mpg: 21, hp: 123, weight: 1.7, cyl: 6 },
  { name: "SUV A", mpg: 17, hp: 175, weight: 2.2, cyl: 8 },
  { name: "SUV B", mpg: 15, hp: 205, weight: 2.5, cyl: 8 },
  { name: "Muscle", mpg: 14, hp: 245, weight: 2.3, cyl: 8 },
];

const CYL_COLOR: Record<number, string> = {
  4: "#34d399",
  6: "#fbbf24",
  8: "#ef4444",
};

/* Bubble / kabarcık grafiği — 4 değişken tek görselde:
   x = beygir, y = tüketim, alan = ağırlık, renk = silindir */
function BubbleChart({ width = 460, height = 300 }: { width?: number; height?: number }) {
  const pad = 44;
  const xMin = 50;
  const xMax = 260;
  const yMin = 12;
  const yMax = 36;
  const sx = (v: number) => pad + ((v - xMin) / (xMax - xMin)) * (width - 2 * pad);
  const sy = (v: number) =>
    height - pad - ((v - yMin) / (yMax - yMin)) * (height - 2 * pad);
  // Alan ağırlıkla orantılı → yarıçap = sqrt(ağırlık) ölçeği
  const r = (w: number) => 7 + Math.sqrt(w) * 9;
  return (
    <svg width={width} height={height} className="block">
      {/* eksenler */}
      <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#475569" />
      <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="#475569" />
      <text x={width / 2} y={height - 8} fill="#94a3b8" fontSize={11} textAnchor="middle">
        Beygir gücü (hp) →
      </text>
      <text
        x={14}
        y={height / 2}
        fill="#94a3b8"
        fontSize={11}
        textAnchor="middle"
        transform={`rotate(-90 14 ${height / 2})`}
      >
        Tüketim verimi (mpg) →
      </text>
      {CARS.map((c, i) => (
        <g key={i}>
          <circle
            cx={sx(c.hp)}
            cy={sy(c.mpg)}
            r={r(c.weight)}
            fill={CYL_COLOR[c.cyl]}
            opacity={0.45}
            stroke={CYL_COLOR[c.cyl]}
            strokeWidth={1.5}
          />
          <text
            x={sx(c.hp)}
            y={sy(c.mpg) + 3}
            fill="#0a0a0a"
            fontSize={8}
            fontWeight={700}
            textAnchor="middle"
          >
            {c.cyl}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* Paralel koordinatlar — N eksen, her satır bir çizgi */
function ParallelCoordinates({ width = 480, height = 280 }: { width?: number; height?: number }) {
  const pad = 36;
  const axes: Array<{ key: keyof Car; label: string; min: number; max: number }> = [
    { key: "mpg", label: "mpg", min: 12, max: 36 },
    { key: "hp", label: "hp", min: 50, max: 260 },
    { key: "weight", label: "ağırlık", min: 0.8, max: 2.6 },
    { key: "cyl", label: "silindir", min: 4, max: 8 },
  ];
  const step = (width - 2 * pad) / (axes.length - 1);
  const ax = (i: number) => pad + i * step;
  const ay = (a: (typeof axes)[number], v: number) =>
    height - pad - ((v - a.min) / (a.max - a.min)) * (height - 2 * pad);
  return (
    <svg width={width} height={height} className="block">
      {/* dikey eksenler */}
      {axes.map((a, i) => (
        <g key={a.key}>
          <line x1={ax(i)} y1={pad} x2={ax(i)} y2={height - pad} stroke="#475569" strokeWidth={1} />
          <text x={ax(i)} y={pad - 8} fill="#fca5a5" fontSize={10} textAnchor="middle" fontFamily="monospace">
            {a.label}
          </text>
          <text x={ax(i)} y={height - pad + 14} fill="#64748b" fontSize={8} textAnchor="middle">
            {a.min}
          </text>
          <text x={ax(i)} y={pad + 4} fill="#64748b" fontSize={8} textAnchor="middle">
            {a.max}
          </text>
        </g>
      ))}
      {/* her araç bir polyline */}
      {CARS.map((c, ci) => {
        const pts = axes
          .map((a, i) => `${ax(i)},${ay(a, c[a.key] as number)}`)
          .join(" ");
        return (
          <polyline
            key={ci}
            points={pts}
            fill="none"
            stroke={CYL_COLOR[c.cyl]}
            strokeWidth={1.8}
            opacity={0.8}
          />
        );
      })}
    </svg>
  );
}

/* Scatter plot matrix (SPLOM) — değişken çiftleri ızgarası */
function ScatterMatrix() {
  const vars: Array<{ key: keyof Car; label: string }> = [
    { key: "mpg", label: "mpg" },
    { key: "hp", label: "hp" },
    { key: "weight", label: "ağr." },
  ];
  const cell = 92;
  const inner = cell - 16;
  const ranges: Record<string, [number, number]> = {
    mpg: [12, 36],
    hp: [50, 260],
    weight: [0.8, 2.6],
  };
  return (
    <div
      className="inline-grid gap-1"
      style={{ gridTemplateColumns: `repeat(${vars.length}, ${cell}px)` }}
    >
      {vars.map((row) =>
        vars.map((col) => {
          if (row.key === col.key) {
            return (
              <div
                key={`${row.key}-${col.key}`}
                className="vg-spm-diag flex items-center justify-center font-mono text-xs"
                style={{ width: cell, height: cell }}
              >
                {row.label}
              </div>
            );
          }
          const [xMin, xMax] = ranges[col.key as string];
          const [yMin, yMax] = ranges[row.key as string];
          const sx = (v: number) => 8 + ((v - xMin) / (xMax - xMin)) * inner;
          const sy = (v: number) => 8 + inner - ((v - yMin) / (yMax - yMin)) * inner;
          return (
            <div
              key={`${row.key}-${col.key}`}
              className="vg-spm-cell"
              style={{ width: cell, height: cell }}
            >
              <svg width={cell} height={cell} className="block">
                {CARS.map((c, i) => (
                  <circle
                    key={i}
                    cx={sx(c[col.key] as number)}
                    cy={sy(c[row.key] as number)}
                    r={2.6}
                    fill={CYL_COLOR[c.cyl]}
                    opacity={0.9}
                  />
                ))}
              </svg>
            </div>
          );
        })
      )}
    </div>
  );
}

/* Korelasyon ısı haritası (matris) — değişken çiftleri */
function CorrHeatmap({ width = 260, height = 240 }: { width?: number; height?: number }) {
  const labels = ["mpg", "hp", "ağırlık", "silindir"];
  // Yaklaşık korelasyon matrisi (mtcars'a benzer işaretlerle, -1..1)
  const M = [
    [1.0, -0.78, -0.87, -0.85],
    [-0.78, 1.0, 0.66, 0.83],
    [-0.87, 0.66, 1.0, 0.78],
    [-0.85, 0.83, 0.78, 1.0],
  ];
  const pad = 44;
  const n = labels.length;
  const cw = (width - pad) / n;
  const ch = (height - pad) / n;
  const color = (v: number) => {
    // diverging: kırmızı (+) ↔ mavi (−)
    if (v >= 0) return `rgba(239,68,68,${0.15 + v * 0.85})`;
    return `rgba(59,130,246,${0.15 + -v * 0.85})`;
  };
  return (
    <svg width={width} height={height} className="block">
      {M.map((row, r) =>
        row.map((v, c) => (
          <g key={`${r}-${c}`}>
            <rect
              x={pad + c * cw}
              y={pad + r * ch}
              width={cw - 2}
              height={ch - 2}
              fill={color(v)}
              rx={2}
            />
            <text
              x={pad + c * cw + cw / 2}
              y={pad + r * ch + ch / 2 + 3}
              fill="#0a0a0a"
              fontSize={9}
              fontWeight={700}
              textAnchor="middle"
            >
              {v.toFixed(2)}
            </text>
          </g>
        ))
      )}
      {labels.map((l, i) => (
        <text
          key={`col-${l}`}
          x={pad + i * cw + cw / 2}
          y={pad - 6}
          fill="#94a3b8"
          fontSize={9}
          textAnchor="middle"
          fontFamily="monospace"
        >
          {l}
        </text>
      ))}
      {labels.map((l, i) => (
        <text
          key={`row-${l}`}
          x={pad - 6}
          y={pad + i * ch + ch / 2 + 3}
          fill="#94a3b8"
          fontSize={9}
          textAnchor="end"
          fontFamily="monospace"
        >
          {l}
        </text>
      ))}
    </svg>
  );
}

/* Küçük çoğullar (small multiples) — aynı eksende kategori paneli */
function SmallMultiples() {
  const panels = [
    { title: "4 silindir", color: "#34d399", series: [30, 31, 33, 30, 32] },
    { title: "6 silindir", color: "#fbbf24", series: [22, 24, 21, 23, 22] },
    { title: "8 silindir", color: "#ef4444", series: [16, 15, 14, 17, 15] },
  ];
  const w = 150;
  const h = 100;
  const pad = 14;
  // Tüm panellerde aynı y-ekseni: 0..36 (karşılaştırılabilirlik)
  const yMax = 36;
  return (
    <div className="grid grid-cols-3 gap-3">
      {panels.map((p) => {
        const step = (w - 2 * pad) / (p.series.length - 1);
        const pts = p.series
          .map((v, i) => `${pad + i * step},${h - pad - (v / yMax) * (h - 2 * pad)}`)
          .join(" ");
        return (
          <div key={p.title} className="vg-chart-frame">
            <div className="text-[10px] text-gray-400 mb-1 font-mono">{p.title}</div>
            <svg width={w} height={h} className="block">
              <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="#475569" />
              <line x1={pad} y1={pad} x2={pad} y2={h - pad} stroke="#475569" />
              <polyline points={pts} fill="none" stroke={p.color} strokeWidth={2} />
              {p.series.map((v, i) => (
                <circle
                  key={i}
                  cx={pad + i * step}
                  cy={h - pad - (v / yMax) * (h - 2 * pad)}
                  r={2.5}
                  fill={p.color}
                />
              ))}
            </svg>
          </div>
        );
      })}
    </div>
  );
}

/* Kötü örnek: 3D yığılmış çubuk — çok değişkende okunmaz */
function Bad3DStacked({ width = 240, height = 200 }: { width?: number; height?: number }) {
  const groups = [
    [60, 40, 30],
    [50, 55, 25],
    [70, 35, 45],
    [45, 60, 20],
  ];
  const colors = ["#ef4444", "#fbbf24", "#a78bfa"];
  const pad = 30;
  const gw = (width - 2 * pad) / groups.length - 8;
  const depth = 10;
  const maxTotal = Math.max(...groups.map((g) => g.reduce((a, b) => a + b, 0)));
  return (
    <svg width={width} height={height} className="block mx-auto">
      {groups.map((g, gi) => {
        let yBase = height - pad;
        const x = pad + gi * (gw + 8);
        return (
          <g key={gi}>
            {g.map((v, si) => {
              const segH = ((height - 2 * pad) * v) / maxTotal;
              const y = yBase - segH;
              yBase = y;
              return (
                <g key={si}>
                  {/* yan yüz (sahte 3D derinlik) */}
                  <path
                    d={`M ${x + gw} ${y} l ${depth} ${-depth} l 0 ${segH} l ${-depth} ${depth} Z`}
                    fill={colors[si]}
                    opacity={0.35}
                  />
                  <rect x={x} y={y} width={gw} height={segH} fill={colors[si]} opacity={0.8} />
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

function PythonSeabornBlock() {
  return (
    <div className="vg-code">
      <div><span className="cm"># Çok değişkenli pano — seaborn</span></div>
      <div><span className="kw">import</span> seaborn <span className="kw">as</span> sns</div>
      <div><span className="kw">import</span> matplotlib.pyplot <span className="kw">as</span> plt</div>
      <div className="mt-2">df <span className="op">=</span> sns.<span className="fn">load_dataset</span>(<span className="str">&quot;mpg&quot;</span>)</div>
      <div className="mt-2"><span className="cm"># 1) tüm çiftler — scatter matrix</span></div>
      <div>sns.<span className="fn">pairplot</span>(df, hue<span className="op">=</span><span className="str">&quot;cylinders&quot;</span>)</div>
      <div className="mt-2"><span className="cm"># 2) 4 boyut: x, y, boyut, renk</span></div>
      <div>sns.<span className="fn">scatterplot</span>(</div>
      <div>{"  "}data<span className="op">=</span>df, x<span className="op">=</span><span className="str">&quot;horsepower&quot;</span>, y<span className="op">=</span><span className="str">&quot;mpg&quot;</span>,</div>
      <div>{"  "}size<span className="op">=</span><span className="str">&quot;weight&quot;</span>, hue<span className="op">=</span><span className="str">&quot;cylinders&quot;</span>,</div>
      <div>)</div>
      <div>plt.<span className="fn">show</span>()</div>
    </div>
  );
}

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ───── 1. KAPAK ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2107 · 9. Hafta</Eyebrow>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.04]">
          <span className="vg-shimmer">Çok Değişkenli Görselleştirme</span>
        </h1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          İkiden fazla değişkeni tek bir görselde okunur kılma teknikleri:
          kodlama (encoding) kanalları, kabarcık grafiği, paralel koordinatlar ve scatter matrisi.
        </Sub>
        <div className="mt-12 grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { name: "Encoding", desc: "Konum · renk · boyut · şekil", icon: Layers },
            { name: "Çoklu Eksen", desc: "Paralel koordinatlar", icon: GitBranch },
            { name: "Matris", desc: "Scatter / korelasyon ızgarası", icon: Grid3x3 },
          ].map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="vg-card rounded-xl p-4"
            >
              <div className="w-10 h-10 mx-auto mb-2 rounded-md vg-tool-tile flex items-center justify-center">
                <t.icon className="w-5 h-5" />
              </div>
              <div className="text-white font-semibold text-sm">{t.name}</div>
              <div className="text-[11px] text-gray-400 mt-1">{t.desc}</div>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-xs font-mono text-gray-500">
          Manisa CBÜ MYO · Bilgisayar Programcılığı · 2025-2026 Bahar
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. GEÇEN HAFTADAN KÖPRÜ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 8. haftadan 9. haftaya</Eyebrow>
      <H2>İki değişkeni çizmeyi biliyoruz; ya dört, ya beş?</H2>
      <Sub className="mt-3 max-w-3xl">
        Ara sınava kadar tek ve iki değişkenli grafikleri (bar, çizgi, histogram, scatter) işledik.
        Gerçek veri kümeleri ise onlarca sütun taşır. Bu hafta soru şu: bir scatter&apos;ın iki eksenine
        kaç bilgi daha sığdırabiliriz, sığdırırken neyi bozmadan?
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="vg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fca5a5]">
            <Check className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Elimizde var</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ef4444] flex-shrink-0" />Tek değişken: histogram, kutu grafiği.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ef4444] flex-shrink-0" />İki değişken: scatter, çizgi, gruplu bar.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ef4444] flex-shrink-0" />Renk ve tasarım ilkeleri (Tufte, Gestalt).</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="vg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fcd34d]">
            <Target className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu hafta hedef</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] flex-shrink-0" />3+ değişkeni kodlama kanallarına eşlemek.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] flex-shrink-0" />Paralel koordinatlar ve scatter matrisini okumak.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] flex-shrink-0" />Aşırı yükleme (overplotting) tuzaklarından kaçınmak.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 3. DERSİN AKIŞI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: kodlama → çoklu boyut → matris</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce her veri boyutunu hangi görsel kanala bağlayacağımızı kuruyoruz; sonra tek görselde çok
        eksen taşıyan teknikleri görüyoruz; en sonda değişken çiftlerini bir ızgarada toplu okuyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            range: "01",
            title: "Kodlama Kanalları",
            items: ["Konum · uzunluk · açı", "Renk tonu · doygunluk", "Boyut · şekil"],
            icon: Layers,
            accent: "#ef4444",
          },
          {
            range: "02",
            title: "Çok Boyutlu Teknikler",
            items: ["Kabarcık (bubble) grafiği", "Paralel koordinatlar", "Küçük çoğullar"],
            icon: GitBranch,
            accent: "#fbbf24",
          },
          {
            range: "03",
            title: "Matris Görünümleri",
            items: ["Scatter plot matrisi", "Korelasyon ısı haritası", "Aşırı yükleme çözümleri"],
            icon: Grid3x3,
            accent: "#a78bfa",
          },
        ].map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="vg-card rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${g.accent}18`, border: `1px solid ${g.accent}55` }}
              >
                <g.icon className="w-5 h-5" style={{ color: g.accent }} />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: g.accent }}>
                  Durak {g.range}
                </div>
                <div className="text-lg font-semibold text-white">{g.title}</div>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-400">
              {g.items.map((it) => (
                <li key={it} className="flex items-start gap-2">
                  <ChevronRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: g.accent }} />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 4. BÖLÜM 1 — KODLAMA ───── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Kodlama Kanalları"
      subtitle="Her değişkeni bir görsel kanala eşleriz: konum, uzunluk, açı, renk, boyut, şekil. Hangi kanal hangi veriye uyar?"
      bgGradient="linear-gradient(135deg, #ef4444, #b91c1c)"
      shadow="0 25px 60px -15px rgba(239, 68, 68, 0.6)"
      icon={<Layers className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 5. ENCODING TANIMI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Veri → görsel kanal</Eyebrow>
      <H2>Bir scatter aslında dört kanal taşıyabilir</H2>
      <Sub className="mt-3 max-w-3xl">
        Bir veri sütununu (boyutu) bir görsel özelliğe bağlamaya kodlama (encoding) denir.
        Tek bir scatter&apos;da en az dört değişken kodlanabilir:
      </Sub>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="vg-chart-frame">
          <div className="text-[10px] text-gray-400 mb-1 font-mono">
            x=hp · y=mpg · alan=ağırlık · renk=silindir
          </div>
          <BubbleChart />
        </div>
        <div className="space-y-3">
          {[
            { dot: "#94a3b8", k: "x ekseni (konum)", v: "Beygir gücü — en doğru okunan kanal." },
            { dot: "#94a3b8", k: "y ekseni (konum)", v: "Tüketim verimi (mpg)." },
            { dot: "#f59e0b", k: "Daire alanı (boyut)", v: "Ağırlık — alanla orantılı, yarıçapla değil." },
            { dot: "#ef4444", k: "Renk (kategori)", v: "Silindir sayısı (4 / 6 / 8)." },
          ].map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="vg-card rounded-lg p-3 flex items-start gap-3"
            >
              <span className="vg-dim-dot mt-1" style={{ background: row.dot }} />
              <div>
                <div className="text-sm font-semibold text-white">{row.k}</div>
                <div className="text-[12px] text-gray-400 leading-snug">{row.v}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 6. KANAL SIRALAMASI (Cleveland-McGill) ───── */
  () => (
    <SlideShell>
      <Eyebrow>Algısal doğruluk · Cleveland &amp; McGill</Eyebrow>
      <H2>Her kanal aynı doğrulukta okunmaz</H2>
      <Sub className="mt-3 max-w-3xl">
        İnsanlar nicel değerleri konum/uzunluktan çok doğru, renk yoğunluğundan ise çok yaklaşık okur.
        En önemli değişkeni en doğru kanala koyun.
      </Sub>
      <div className="mt-6 vg-card rounded-xl p-1">
        <table className="vg-table">
          <thead>
            <tr>
              <th style={{ width: "10%" }}>Sıra</th>
              <th style={{ width: "26%" }}>Kanal</th>
              <th style={{ width: "20%" }}>Doğruluk</th>
              <th>Hangi veri için?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-mono text-[#86efac]">1</td>
              <td className="text-white font-semibold">Ortak eksende konum</td>
              <td><span className="vg-pill vg-pill-good">En yüksek</span></td>
              <td>Nicel — kıyaslanması en kritik değişken.</td>
            </tr>
            <tr>
              <td className="font-mono text-[#86efac]">2</td>
              <td className="text-white font-semibold">Uzunluk (bar)</td>
              <td><span className="vg-pill vg-pill-good">Yüksek</span></td>
              <td>Nicel — sıralı kıyas.</td>
            </tr>
            <tr>
              <td className="font-mono text-[#fcd34d]">3</td>
              <td className="text-white font-semibold">Açı · eğim</td>
              <td><span className="vg-pill vg-pill-mid">Orta</span></td>
              <td>Trend, oran (pasta dilimi burada).</td>
            </tr>
            <tr>
              <td className="font-mono text-[#fcd34d]">4</td>
              <td className="text-white font-semibold">Alan (boyut)</td>
              <td><span className="vg-pill vg-pill-mid">Orta-düşük</span></td>
              <td>Yardımcı nicel — kabaca büyüklük.</td>
            </tr>
            <tr>
              <td className="font-mono text-[#fca5a5]">5</td>
              <td className="text-white font-semibold">Renk doygunluğu</td>
              <td><span className="vg-pill vg-pill-bad">Düşük</span></td>
              <td>Yoğunluk; kesin sayı değil.</td>
            </tr>
            <tr>
              <td className="font-mono text-[#fca5a5]">6</td>
              <td className="text-white font-semibold">Renk tonu · şekil</td>
              <td><span className="vg-pill vg-pill-bad">Nicel için zayıf</span></td>
              <td>Kategori ayrımı için iyi, miktar için değil.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[11px] text-gray-500 font-mono">
        Kural: nicel değişken → konum/uzunluk · kategorik değişken → renk tonu/şekil.
      </p>
    </SlideShell>
  ),

  /* ───── 7. KANAL ÖRNEK KARTLARI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Kanal seçimi · pratik</Eyebrow>
      <H2>Doğru veri tipine doğru kanal</H2>
      <Sub className="mt-3 max-w-3xl">
        Aynı kanalı yanlış veri tipine bağlamak en sık hatadır. Üç tipik eşleme:
      </Sub>
      <div className="mt-8 grid grid-cols-3 gap-4">
        <FeatureCard
          icon={Ruler}
          title="Nicel → Konum"
          desc="Gelir, sıcaklık, mpg gibi sayısal değişkeni eksene koyun; en doğru okunan kanal budur."
          delay={0.05}
        />
        <FeatureCard
          icon={Palette}
          title="Kategori → Renk tonu"
          desc="Bölge, sınıf, silindir gibi sırasız grupları farklı renk tonlarıyla ayırın (≤ 7 ton)."
          delay={0.15}
          accent="#f59e0b"
        />
        <FeatureCard
          icon={Shapes}
          title="2. kategori → Şekil"
          desc="Renk doluyken ikinci bir kategoriyi işaret şekliyle (daire/üçgen/kare) kodlayın."
          delay={0.25}
          accent="#a78bfa"
        />
        <FeatureCard
          icon={Circle}
          title="Yardımcı nicel → Boyut"
          desc="Nüfus, ciro gibi ikincil büyüklüğü daire alanıyla verin; alanı değere orantılayın."
          delay={0.35}
        />
        <FeatureCard
          icon={Palette}
          title="Sıralı nicel → Doygunluk"
          desc="Tek yönlü büyüklüğü açıktan koyuya tek renk gradyanıyla gösterin (sequential)."
          delay={0.45}
          accent="#f59e0b"
        />
        <FeatureCard
          icon={Eye}
          title="Sınır: çok kanal"
          desc="Bir görselde 4-5 kanaldan fazlası okunamaz hale gelir. Gerisini ayrı görsele ayırın."
          delay={0.55}
          accent="#a78bfa"
        />
      </div>
    </SlideShell>
  ),

  /* ───── 8. BÖLÜM 2 — ÇOK BOYUTLU ───── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Çok Boyutlu Teknikler"
      subtitle="Bir scatter dört boyutu taşır; ya beş, altı, yedi? Paralel koordinatlar ve küçük çoğullar devreye girer."
      bgGradient="linear-gradient(135deg, #f59e0b, #b45309)"
      shadow="0 25px 60px -15px rgba(245, 158, 11, 0.6)"
      icon={<GitBranch className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 9. KABARCIK GRAFİĞİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Kabarcık grafiği (bubble chart)</Eyebrow>
      <H2 className="mb-2">Scatter + boyut + renk = dört değişken</H2>
      <Sub className="max-w-3xl mb-6">
        En tanıdık çok değişkenli grafik. Hans Rosling&apos;in ünlü &quot;gelir vs. yaşam süresi&quot;
        animasyonu da budur: x, y, daire alanı (nüfus) ve renk (kıta).
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-2 vg-chart-frame">
          <div className="text-[10px] text-gray-400 mb-1 font-mono">
            x=hp · y=mpg · alan=ağırlık · renk=silindir
          </div>
          <BubbleChart />
        </div>
        <div className="vg-card rounded-xl p-5">
          <div className="text-xs font-mono text-[#ef4444] mb-3">DİKKAT EDİLECEKLER</div>
          <ul className="space-y-2.5 text-xs text-gray-300">
            <li className="flex gap-2"><Check className="w-3.5 h-3.5 mt-0.5 text-emerald-400 flex-shrink-0" />Daireyi <span className="text-white">alanla</span> ölçekle, yarıçapla değil — yoksa fark abartılır.</li>
            <li className="flex gap-2"><Check className="w-3.5 h-3.5 mt-0.5 text-emerald-400 flex-shrink-0" />En fazla 4-5 değişken; renk için kategori sayısını düşük tut.</li>
            <li className="flex gap-2"><X className="w-3.5 h-3.5 mt-0.5 text-rose-400 flex-shrink-0" />Çok nokta üst üste binerse (overplotting) saydamlık ekle.</li>
            <li className="flex gap-2"><X className="w-3.5 h-3.5 mt-0.5 text-rose-400 flex-shrink-0" />Boyutu kesin kıyas için kullanma; göz alanı zor okur.</li>
          </ul>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 10. PARALEL KOORDİNATLAR ───── */
  () => (
    <SlideShell>
      <Eyebrow>Paralel koordinatlar</Eyebrow>
      <H2 className="mb-2">Çok eksen, her satır bir çizgi</H2>
      <Sub className="max-w-3xl mb-6">
        Her değişken için dikey bir eksen çizilir; her gözlem (satır), eksenleri kesen bir çizgi olur.
        7-8 sayısal değişkeni aynı anda görmenin pratik yolu; örüntü ve kümeleri ortaya çıkarır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-2 vg-chart-frame">
          <div className="text-[10px] text-gray-400 mb-1 font-mono">
            4 eksen · her çizgi bir araç · renk=silindir
          </div>
          <ParallelCoordinates />
        </div>
        <div className="vg-card rounded-xl p-5">
          <div className="text-xs font-mono text-[#f59e0b] mb-3">NASIL OKUNUR?</div>
          <ul className="space-y-2.5 text-xs text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-3.5 h-3.5 mt-0.5 text-[#f59e0b] flex-shrink-0" />Birbirine <span className="text-white">paralel</span> çizgiler → değişkenler aynı yönde (pozitif ilişki).</li>
            <li className="flex gap-2"><ChevronRight className="w-3.5 h-3.5 mt-0.5 text-[#f59e0b] flex-shrink-0" /><span className="text-white">Çapraz</span> kesişen çizgiler → ters ilişki (mpg yüksekken hp düşük).</li>
            <li className="flex gap-2"><ChevronRight className="w-3.5 h-3.5 mt-0.5 text-[#f59e0b] flex-shrink-0" />Eksen sırasını değiştirmek farklı örüntüleri açar.</li>
            <li className="flex gap-2"><ChevronRight className="w-3.5 h-3.5 mt-0.5 text-[#f59e0b] flex-shrink-0" />Etkileşimli &quot;brushing&quot; ile bir aralık seçilip filtrelenir.</li>
          </ul>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 11. KÜÇÜK ÇOĞULLAR ───── */
  () => (
    <SlideShell>
      <Eyebrow>Küçük çoğullar (small multiples)</Eyebrow>
      <H2 className="mb-2">Bir görseli bölmek yerine çoğalt</H2>
      <Sub className="max-w-3xl mb-6">
        Tufte&apos;nin önerdiği teknik: kategoriyi tek grafiğe sıkıştırmak yerine, aynı eksen ve
        ölçeğe sahip küçük paneller dizisine ayır. Göz, paralel okumayla farkı anında yakalar.
      </Sub>
      <SmallMultiples />
      <div className="mt-6 vg-card rounded-lg p-4 text-sm text-gray-300 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-[#ef4444] mt-0.5 shrink-0" />
        <div>
          <span className="text-white font-semibold">Tek kural:</span> tüm panellerde
          <span className="text-[#ef4444]"> aynı eksen aralığı</span> kullanın. Farklı ölçek, paneller
          arası kıyası bozar ve yanıltır.
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 12. BÖLÜM 3 — MATRİS ───── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Matris Görünümleri"
      subtitle="Değişken çiftlerinin hepsini tek bakışta görmek: scatter plot matrisi ve korelasyon ısı haritası."
      bgGradient="linear-gradient(135deg, #a78bfa, #7c3aed)"
      shadow="0 25px 60px -15px rgba(167, 139, 250, 0.6)"
      icon={<Grid3x3 className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 13. SCATTER MATRİSİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Scatter plot matrisi (SPLOM)</Eyebrow>
      <H2 className="mb-2">Bütün çiftleri tek ızgarada gör</H2>
      <Sub className="max-w-3xl mb-6">
        N değişken için N×N&apos;lik bir ızgara: her hücre iki değişkenin scatter&apos;ı, köşegen değişken
        adı. Keşifsel analizde (EDA) ilk açılan görseldir; tüm ikili ilişkileri aynı anda tarar.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center">
          <ScatterMatrix />
        </div>
        <div className="space-y-3">
          <div className="vg-card rounded-lg p-4 text-sm text-gray-300">
            <span className="text-[#a78bfa] font-semibold">Köşegen:</span> değişkenin adı (bazı araçlarda
            o değişkenin histogramı/yoğunluğu konur).
          </div>
          <div className="vg-card rounded-lg p-4 text-sm text-gray-300">
            <span className="text-[#a78bfa] font-semibold">Köşegen dışı:</span> iki değişkenin scatter&apos;ı;
            renk üçüncü bir kategoriyi (silindir) tüm hücrelere taşır.
          </div>
          <div className="vg-card rounded-lg p-4 text-sm text-gray-300">
            <span className="text-[#a78bfa] font-semibold">Simetri:</span> matris köşegene göre yansımalıdır;
            genelde alt veya üst üçgen yeterlidir.
          </div>
          <p className="text-[11px] text-gray-500 font-mono">
            seaborn.pairplot() · pandas.plotting.scatter_matrix() · Tableau&apos;da satır/sütun rafları.
          </p>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 14. KORELASYON ISI HARİTASI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Korelasyon ısı haritası</Eyebrow>
      <H2 className="mb-2">İlişkinin yönü ve gücü tek renkte</H2>
      <Sub className="max-w-3xl mb-6">
        SPLOM&apos;u sayıya indirgeyen özet: her hücre iki değişkenin korelasyon katsayısı.
        Pozitif ilişki bir renge, negatif diğerine; koyuluk gücü gösterir (diverging palet).
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center vg-chart-frame">
          <CorrHeatmap />
        </div>
        <div className="space-y-3">
          <div className="vg-card rounded-lg p-4 text-sm text-gray-300 flex items-start gap-3">
            <span className="vg-dim-dot mt-1.5" style={{ background: "#ef4444" }} />
            <span><span className="text-white">Kırmızı (pozitif):</span> biri artarken diğeri de artar — örn. hp ve silindir.</span>
          </div>
          <div className="vg-card rounded-lg p-4 text-sm text-gray-300 flex items-start gap-3">
            <span className="vg-dim-dot mt-1.5" style={{ background: "#3b82f6" }} />
            <span><span className="text-white">Mavi (negatif):</span> biri artarken diğeri azalır — örn. ağırlık ve mpg.</span>
          </div>
          <div className="vg-card rounded-lg p-4 text-sm text-gray-300 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-[#fbbf24] mt-0.5 flex-shrink-0" />
            <span>Korelasyon nedensellik değildir. Yüksek katsayı yalnızca birlikte değiştiklerini söyler.</span>
          </div>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 15. KÖTÜ vs İYİ — OVERPLOTTING ───── */
  () => (
    <SlideShell>
      <Eyebrow>Tuzak · aşırı yükleme</Eyebrow>
      <H2>Çok değişken ≠ tek görsele tıkıştır</H2>
      <Sub className="mt-3 max-w-3xl">
        En sık hata: her şeyi tek, süslü bir grafiğe basmak. 3B yığılmış çubuk hem alanları çarpıtır
        hem segmentleri okutmaz. Çözüm: kanalı sadeleştir veya küçük çoğullara böl.
      </Sub>
      <div className="mt-8 grid grid-cols-2 gap-6">
        <div className="vg-card rounded-xl p-4 border-2 border-red-500/30">
          <div className="flex items-center gap-2 mb-3">
            <X className="w-5 h-5 text-rose-400" />
            <span className="text-sm font-semibold text-rose-300">Kaçınılması gereken</span>
          </div>
          <Bad3DStacked />
          <ul className="mt-3 text-[11px] text-gray-400 space-y-1">
            <li>· 3B derinlik segment yüksekliklerini çarpıtır</li>
            <li>· Üstteki segmentler ortak tabandan başlamaz, kıyaslanamaz</li>
            <li>· Çok renk + çok grup = göz kaybolur</li>
          </ul>
        </div>
        <div className="vg-card rounded-xl p-4 border-2 border-emerald-500/30">
          <div className="flex items-center gap-2 mb-3">
            <Check className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-300">Önerilen</span>
          </div>
          <SmallMultiples />
          <ul className="mt-3 text-[11px] text-gray-400 space-y-1">
            <li>· Her kategori kendi panelinde, ortak ölçekte</li>
            <li>· Düz okuma; üst üste binme yok</li>
            <li>· Paneller arası fark tek bakışta görünür</li>
          </ul>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 16. PYTHON / SEABORN ───── */
  () => (
    <SlideShell>
      <Eyebrow>Pratik · Python &amp; seaborn</Eyebrow>
      <H2>İki çağrıda çok değişkenli pano</H2>
      <Sub className="mt-3 max-w-3xl">
        seaborn, çok değişkenli görselleri tek satırda üretir: pairplot tüm çiftleri, scatterplot ise
        size ve hue ile dört boyutu kodlar. Tableau&apos;da aynısı raflara sürükle-bırakla yapılır.
      </Sub>
      <div className="mt-8 grid grid-cols-2 gap-6 items-center">
        <PythonSeabornBlock />
        <div className="vg-chart-frame">
          <div className="text-[10px] text-gray-400 mb-1 font-mono">→ scatterplot çıktısı (4 boyut)</div>
          <BubbleChart width={380} height={260} />
        </div>
      </div>
      <p className="mt-6 text-xs text-gray-500 text-center font-mono">
        hue → renk (kategori) · size → daire alanı (nicel) · x / y → konum kanalları
      </p>
    </SlideShell>
  ),

  /* ───── 17. UYGULAMALI LAB ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
      <H2>Dört adımda çok değişkenli keşif</H2>
      <Sub className="mt-3 max-w-3xl">
        Hazır bir veri kümesiyle (örn. seaborn &quot;mpg&quot; ya da kendi seçtiğiniz 4+ sütunlu CSV)
        çalışın. Sonraki derse her adımın ekran görüntüsüyle gelin.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          {
            icon: Database,
            title: "Veri kümesini seç ve incele",
            desc: "En az 4 sayısal + 1 kategorik sütun olsun; eksik değer ve aralıklara bak.",
            accent: "#ef4444",
          },
          {
            icon: Circle,
            title: "Bir kabarcık grafiği kur",
            desc: "x, y, size ve hue&apos;ye dört farklı sütun ata; daireyi alanla ölçekle.",
            accent: "#fbbf24",
          },
          {
            icon: Grid3x3,
            title: "pairplot ile matrisi çıkar",
            desc: "Tüm çiftleri tara; en güçlü pozitif ve negatif ilişkiyi not et.",
            accent: "#a78bfa",
          },
          {
            icon: Spline,
            title: "Bir çok-değişkenli bulgu yaz",
            desc: "Paralel koordinat veya korelasyon haritasıyla bir örüntüyü 3 cümlede açıkla.",
            accent: "#34d399",
          },
        ].map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="vg-card vg-card-hover rounded-xl p-5 flex items-start gap-4"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${t.accent}18`, border: `1px solid ${t.accent}55` }}
            >
              <t.icon className="w-5 h-5" style={{ color: t.accent }} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-[10px] text-gray-500 font-mono">
                  {i + 1}
                </span>
                <h3 className="text-base font-semibold text-white">{t.title}</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{t.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 vg-card rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <MousePointerClick className="w-4 h-4 text-[#ef4444] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">İpucu:</span> Tableau Public kullanıyorsanız aynı analizi raflara
          sürükle-bırak ile yapın; Renk, Boyut ve Şekil paletini &quot;Marks&quot; kartından kontrol edin.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 18. ÖZET / KARAR REHBERİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Özet · karar rehberi</Eyebrow>
      <H2>Kaç değişken → hangi teknik?</H2>
      <Sub className="mt-3 max-w-3xl">
        Değişken sayısı ve tipi tekniği belirler. Hızlı bir başvuru tablosu:
      </Sub>
      <div className="mt-8 vg-card rounded-xl p-4">
        <table className="vg-table">
          <thead>
            <tr>
              <th style={{ width: "22%" }}>Değişken sayısı</th>
              <th style={{ width: "32%" }}>Önerilen teknik</th>
              <th>Not</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">3 değişken</td>
              <td>Renklendirilmiş scatter · gruplu bar</td>
              <td>2 nicel + 1 kategorik en rahat okunan kombinasyon.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">4 değişken</td>
              <td>Kabarcık grafiği (x, y, boyut, renk)</td>
              <td>Boyutu kesin kıyas için kullanmayın.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">5-8 nicel</td>
              <td>Paralel koordinatlar · SPLOM</td>
              <td>Etkileşim (brushing) okunabilirliği artırır.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Çok kategori</td>
              <td>Küçük çoğullar (small multiples)</td>
              <td>Tüm panellerde aynı eksen aralığı şart.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Sadece ilişki gücü</td>
              <td>Korelasyon ısı haritası</td>
              <td>Diverging palet; nedensellik iddia etmeyin.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </SlideShell>
  ),

  /* ───── 19. SIRADAKİ HAFTA ───── */
  () => (
    <SlideShell>
      <Eyebrow>Sıradaki Hafta · H10</Eyebrow>
      <H1>
        <span className="vg-shimmer-amber">Etkileşim &amp; Pano Tasarımı</span>
      </H1>
      <Sub className="mt-6 max-w-3xl">
        Statik çok değişkenli grafiği canlandırıyoruz: filtreler, vurgulama (highlight), brushing-linking
        ve detaya-inme (drill-down). Tek bir görseli, sorularına cevap veren etkileşimli bir panoya dönüştürmek.
      </Sub>
      <div className="mt-10 grid grid-cols-4 gap-3">
        {[
          { i: MousePointerClick, t: "Filtreler" },
          { i: Eye, t: "Vurgulama" },
          { i: GitBranch, t: "Brushing-Linking" },
          { i: Layers, t: "Drill-down" },
          { i: Boxes, t: "Pano düzeni" },
          { i: Grid3x3, t: "Küçük çoğul panolar" },
          { i: Code2, t: "Tableau Actions" },
          { i: ListChecks, t: "KPI kartları" },
        ].map((tool, i) => (
          <motion.div
            key={tool.t}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="vg-card rounded-lg p-3 flex items-center gap-3"
          >
            <tool.i className="w-5 h-5 text-[#f59e0b]" />
            <span className="text-sm text-gray-200">{tool.t}</span>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 vg-card rounded-lg p-4 flex items-center gap-3">
        <Target className="w-5 h-5 text-[#ef4444]" />
        <span className="text-sm text-gray-300">
          Bu haftanın lab çıktısını yanınızda getirin; gelecek hafta onu etkileşimli hale getireceğiz.
        </span>
      </div>
    </SlideShell>
  ),

  /* ───── 20. KAPANIŞ ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>Hafta 9 · Tamamlandı</Eyebrow>
        <H1>
          <span className="vg-shimmer">Özet</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Çok değişkenli veri, doğru kodlama kanallarına bölünerek okunur kılınır. Önce kanalı seçin,
          sonra tekniği; aşırı yüklemeden kaçının.
        </Sub>
        <div className="mt-10 grid grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
          <div className="vg-card rounded-xl p-5">
            <Layers className="w-5 h-5 text-[#ef4444] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Kanal</div>
            <div className="text-white font-semibold text-sm">Nicel→konum</div>
            <div className="text-sm text-gray-400">kategori→renk/şekil</div>
          </div>
          <div className="vg-card rounded-xl p-5">
            <GitBranch className="w-5 h-5 text-[#f59e0b] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teknik</div>
            <div className="text-white font-semibold text-sm">Bubble · paralel</div>
            <div className="text-sm text-gray-400">SPLOM · küçük çoğul</div>
          </div>
          <div className="vg-card rounded-xl p-5">
            <Eye className="w-5 h-5 text-[#a78bfa] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Kaçın</div>
            <div className="text-white font-semibold text-sm">3B · overplotting</div>
            <div className="text-sm text-gray-400">5+ kanal tek görselde</div>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-center gap-3 text-xs font-mono text-gray-500">
          <GraduationCap className="w-4 h-4" />
          <span>MCBÜ MYO · BVA 2107 · Veri Görselleştirme · 2025-2026 Bahar</span>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-[11px] font-mono text-gray-600">
          <Calendar className="w-3.5 h-3.5" />
          <span>Sonraki: Hafta 10 · Etkileşim &amp; Pano Tasarımı</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>
      </div>
    </SlideShell>
  ),
];

const TOTAL = slides.length;

/* ============================================================
   PRESENTATION ROOT
   ============================================================ */

export default function Presentation() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isFs, setIsFs] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => Math.min(c + 1, TOTAL - 1));
  }, []);
  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => Math.max(c - 1, 0));
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      } else if (e.key.toLowerCase() === "f") {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen?.();
        } else {
          document.exitFullscreen?.();
        }
      } else if (e.key === "Home") {
        setDirection(-1);
        setCurrent(0);
      } else if (e.key === "End") {
        setDirection(1);
        setCurrent(TOTAL - 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  useEffect(() => {
    function onFs() {
      setIsFs(Boolean(document.fullscreenElement));
    }
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const touch = useRef<{ x: number } | null>(null);

  const slideContent = slides[current](true);
  const progress = ((current + 1) / TOTAL) * 100;

  return (
    <div
      className="fixed inset-0 bg-black overflow-hidden text-white"
      onTouchStart={(e) => {
        touch.current = { x: e.touches[0].clientX };
      }}
      onTouchEnd={(e) => {
        if (!touch.current) return;
        const dx = e.changedTouches[0].clientX - touch.current.x;
        if (Math.abs(dx) > 60) (dx > 0 ? prev : next)();
        touch.current = null;
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/5 z-50">
        <motion.div
          className="h-full"
          style={{
            background: "linear-gradient(90deg, #ef4444, #f87171, #ef4444)",
            boxShadow: "0 0 16px rgba(239,68,68,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#ef4444]/70">
          BVA 2107 · 9. Hafta · Çok Değişkenli Görselleştirme
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[#ef4444]/50">
            <span className="text-[#ef4444]">
              {String(current + 1).padStart(2, "0")}
            </span>
            <span className="mx-1">/</span>
            {String(TOTAL).padStart(2, "0")}
          </div>
          <button
            onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen?.();
              } else {
                document.exitFullscreen?.();
              }
            }}
            className="p-1.5 text-gray-500 hover:text-[#ef4444] transition-colors"
            aria-label="Tam ekran"
          >
            {isFs ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0, x: direction * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -direction * 30 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {slideContent}
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prev}
        disabled={current === 0}
        aria-label="Önceki slayt"
        className="absolute left-0 top-12 bottom-16 w-[12%] z-30 cursor-w-resize disabled:cursor-default opacity-0"
      />
      <button
        onClick={next}
        disabled={current === TOTAL - 1}
        aria-label="Sonraki slayt"
        className="absolute right-0 top-12 bottom-16 w-[12%] z-30 cursor-e-resize disabled:cursor-default opacity-0"
      />

      <div className="absolute bottom-0 left-0 right-0 z-40 px-8 py-4 flex items-center justify-between border-t border-white/5 bg-black/60 backdrop-blur">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#ef4444] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Önceki
        </button>
        <div className="flex items-center gap-1 max-w-[60%] overflow-hidden">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              aria-label={`Slayt ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === current
                  ? "w-5 bg-[#ef4444]"
                  : "w-1.5 bg-white/15 hover:bg-white/40"
              }`}
              style={
                i === current
                  ? { boxShadow: "0 0 10px rgba(239,68,68,0.6)" }
                  : undefined
              }
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#ef4444] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        >
          Sonraki
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="absolute bottom-3 right-8 text-[9px] font-mono text-gray-700 z-50 hidden md:flex items-center gap-2">
        <Keyboard className="w-3 h-3" />
        <span>← → · F · Esc</span>
      </div>
    </div>
  );
}
