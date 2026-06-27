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
  Grid3x3,
  LayoutGrid,
  Thermometer,
  TreePine,
  Palette,
  Code2,
  Table,
  Calendar,
  Target,
  Check,
  X,
  Eye,
  AlertTriangle,
  Layers,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Sparkles,
  GitBranch,
  Sigma,
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
   TOPIC MOCKUPS — Isı haritaları & ağaç haritaları
   ============================================================ */

/* Matris ısı haritası — saat × gün yoğunluğu. */
function Heatmap({
  width = 460,
  height = 230,
}: {
  width?: number;
  height?: number;
}) {
  const cols = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
  const rows = ["08", "10", "12", "14", "16", "18", "20"];
  // Satır=saat dilimi, sütun=gün. Değer 0..1 arası ziyaret yoğunluğu.
  const data: number[][] = [
    [0.15, 0.18, 0.2, 0.22, 0.3, 0.55, 0.4],
    [0.3, 0.34, 0.36, 0.38, 0.5, 0.78, 0.62],
    [0.55, 0.58, 0.6, 0.62, 0.72, 0.9, 0.7],
    [0.42, 0.45, 0.48, 0.5, 0.6, 0.82, 0.66],
    [0.5, 0.52, 0.55, 0.58, 0.7, 0.88, 0.72],
    [0.6, 0.62, 0.66, 0.7, 0.85, 0.95, 0.8],
    [0.35, 0.38, 0.4, 0.46, 0.6, 0.7, 0.5],
  ];
  const padL = 34;
  const padT = 22;
  const cw = (width - padL - 8) / cols.length;
  const ch = (height - padT - 8) / rows.length;
  // Sequential renk skalası: koyu lacivert → kırmızı → amber.
  const colorOf = (v: number) => {
    const r = Math.round(30 + v * 220);
    const g = Math.round(40 + Math.max(0, v - 0.55) * 320);
    const b = Math.round(70 - v * 55);
    return `rgb(${Math.min(r, 251)},${Math.min(g, 191)},${Math.max(b, 11)})`;
  };
  return (
    <svg width={width} height={height} className="block">
      {cols.map((c, i) => (
        <text
          key={c}
          x={padL + i * cw + cw / 2}
          y={14}
          fill="#94a3b8"
          fontSize={10}
          textAnchor="middle"
        >
          {c}
        </text>
      ))}
      {rows.map((_rLab, r) =>
        data[r].map((v, c) => (
          <g key={`${r}-${c}`}>
            <rect
              x={padL + c * cw}
              y={padT + r * ch}
              width={cw - 2}
              height={ch - 2}
              rx={2}
              fill={colorOf(v)}
            />
            <text
              x={padL + c * cw + cw / 2 - 1}
              y={padT + r * ch + ch / 2 + 1}
              fill={v > 0.6 ? "#0a0a0a" : "#e5e7eb"}
              fontSize={8}
              textAnchor="middle"
              fontWeight={600}
            >
              {Math.round(v * 100)}
            </text>
          </g>
        ))
      )}
      {rows.map((rLab, r) => (
        <text
          key={rLab}
          x={padL - 6}
          y={padT + r * ch + ch / 2 + 3}
          fill="#94a3b8"
          fontSize={9}
          textAnchor="end"
        >
          {rLab}
        </text>
      ))}
    </svg>
  );
}

/* Korelasyon matrisi — diverging palet (negatif mavi ↔ pozitif kırmızı). */
function CorrelationMatrix({ width = 300, height = 300 }: { width?: number; height?: number }) {
  const labels = ["Fiyat", "m²", "Oda", "Yaş", "Kat"];
  // Simetrik korelasyon matrisi (-1..1). Köşegen = 1.
  const m: number[][] = [
    [1.0, 0.82, 0.61, -0.45, 0.12],
    [0.82, 1.0, 0.7, -0.3, 0.08],
    [0.61, 0.7, 1.0, -0.18, -0.05],
    [-0.45, -0.3, -0.18, 1.0, -0.22],
    [0.12, 0.08, -0.05, -0.22, 1.0],
  ];
  const pad = 46;
  const n = labels.length;
  const cell = (width - pad) / n;
  // Diverging: negatif mavi, 0 nötr, pozitif kırmızı.
  const colorOf = (v: number) => {
    if (v >= 0) {
      return `rgb(${120 + Math.round(v * 119)},${70 - Math.round(v * 50)},${70 - Math.round(v * 50)})`;
    }
    const a = Math.abs(v);
    return `rgb(${70 - Math.round(a * 50)},${90 - Math.round(a * 40)},${120 + Math.round(a * 119)})`;
  };
  return (
    <svg width={width} height={height} className="block mx-auto">
      {labels.map((l, c) => (
        <text key={`c-${l}`} x={pad + c * cell + cell / 2} y={pad - 8} fill="#94a3b8" fontSize={10} textAnchor="middle">
          {l}
        </text>
      ))}
      {m.map((row, r) =>
        row.map((v, c) => (
          <g key={`${r}-${c}`}>
            <rect x={pad + c * cell} y={pad + r * cell} width={cell - 2} height={cell - 2} rx={2} fill={colorOf(v)} />
            <text
              x={pad + c * cell + cell / 2 - 1}
              y={pad + r * cell + cell / 2 + 3}
              fill="#f8fafc"
              fontSize={10}
              textAnchor="middle"
              fontWeight={600}
            >
              {v.toFixed(2)}
            </text>
          </g>
        ))
      )}
      {labels.map((l, r) => (
        <text key={`r-${l}`} x={pad - 6} y={pad + r * cell + cell / 2 + 3} fill="#94a3b8" fontSize={10} textAnchor="end">
          {l}
        </text>
      ))}
    </svg>
  );
}

type TreeCell = { x: number; y: number; w: number; h: number; c: string; label: string; val: string };

/* Ağaç haritası — bütçe dağılımı; alan = pay. */
function Treemap({ width = 460, height = 250 }: { width?: number; height?: number }) {
  // Önceden hesaplanmış slice-and-dice yerleşimi (oran cinsinden 0..1).
  const cells: TreeCell[] = [
    { x: 0, y: 0, w: 0.46, h: 0.62, c: "#dc2626", label: "Personel", val: "%42" },
    { x: 0, y: 0.62, w: 0.46, h: 0.38, c: "#ef4444", label: "Operasyon", val: "%18" },
    { x: 0.46, y: 0, w: 0.32, h: 0.55, c: "#f59e0b", label: "Pazarlama", val: "%20" },
    { x: 0.46, y: 0.55, w: 0.32, h: 0.45, c: "#fbbf24", label: "Ar-Ge", val: "%10" },
    { x: 0.78, y: 0, w: 0.22, h: 0.55, c: "#fb923c", label: "Lojistik", val: "%6" },
    { x: 0.78, y: 0.55, w: 0.22, h: 0.45, c: "#fca5a5", label: "Diğer", val: "%4" },
  ];
  const pad = 4;
  const W = width - 2 * pad;
  const H = height - 2 * pad;
  return (
    <svg width={width} height={height} className="block">
      {cells.map((c, i) => {
        const px = pad + c.x * W;
        const py = pad + c.y * H;
        const pw = c.w * W - 3;
        const ph = c.h * H - 3;
        return (
          <g key={i}>
            <rect x={px} y={py} width={pw} height={ph} rx={3} fill={c.c} opacity={0.9} />
            <text x={px + 8} y={py + 18} fill="#0a0a0a" fontSize={12} fontWeight={700}>
              {c.label}
            </text>
            <text x={px + 8} y={py + 34} fill="#1a1a1a" fontSize={11} fontWeight={600}>
              {c.val}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* Yanlış kullanım: kategorik (sırasız) renkle ısı haritası — okunamaz. */
function BadHeatmap({ width = 220, height = 150 }: { width?: number; height?: number }) {
  const palette = ["#ef4444", "#22c55e", "#3b82f6", "#a855f7", "#f59e0b", "#ec4899"];
  const pad = 10;
  const cols = 6;
  const rows = 5;
  const cw = (width - 2 * pad) / cols;
  const ch = (height - 2 * pad) / rows;
  return (
    <svg width={width} height={height} className="block">
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => (
          <rect
            key={`${r}-${c}`}
            x={pad + c * cw}
            y={pad + r * ch}
            width={cw - 2}
            height={ch - 2}
            rx={2}
            fill={palette[(r + c) % palette.length]}
          />
        ))
      )}
    </svg>
  );
}

/* Doğru kullanım: tek-yönlü sequential skala. */
function GoodHeatmap({ width = 220, height = 150 }: { width?: number; height?: number }) {
  const pad = 10;
  const cols = 6;
  const rows = 5;
  const cw = (width - 2 * pad) / cols;
  const ch = (height - 2 * pad) / rows;
  return (
    <svg width={width} height={height} className="block">
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const v = (Math.sin(r * 0.7 + c * 0.5) + 1) / 2;
          const red = Math.round(40 + v * 211);
          const grn = Math.round(45 + Math.max(0, v - 0.55) * 320);
          const blu = Math.round(70 - v * 55);
          return (
            <rect
              key={`${r}-${c}`}
              x={pad + c * cw}
              y={pad + r * ch}
              width={cw - 2}
              height={ch - 2}
              rx={2}
              fill={`rgb(${Math.min(red, 251)},${Math.min(grn, 191)},${Math.max(blu, 11)})`}
            />
          );
        })
      )}
    </svg>
  );
}

/* Renk skalası lejantı çubuğu + uç etiketleri. */
function LegendBar({ low, high, label }: { low: string; high: string; label: string }) {
  return (
    <div>
      <div className="text-[11px] text-gray-400 mb-1 font-mono">{label}</div>
      <div className="vg-legend-bar" />
      <div className="flex justify-between text-[10px] text-gray-500 mt-1">
        <span>{low}</span>
        <span>{high}</span>
      </div>
    </div>
  );
}

/* Python kod hücresi — seaborn heatmap. */
function SeabornCode() {
  return (
    <div className="vg-code">
      <div><span className="cm"># Korelasyon ısı haritası — seaborn</span></div>
      <div><span className="kw">import</span> seaborn <span className="kw">as</span> sns</div>
      <div><span className="kw">import</span> matplotlib.pyplot <span className="kw">as</span> plt</div>
      <div className="mt-2">corr <span className="op">=</span> df.<span className="fn">corr</span>(numeric_only<span className="op">=</span><span className="kw">True</span>)</div>
      <div className="mt-2">sns.<span className="fn">heatmap</span>(</div>
      <div>&nbsp;&nbsp;corr,</div>
      <div>&nbsp;&nbsp;annot<span className="op">=</span><span className="kw">True</span>,&nbsp;&nbsp;<span className="cm"># hücrelere değer yaz</span></div>
      <div>&nbsp;&nbsp;fmt<span className="op">=</span><span className="str">&quot;.2f&quot;</span>,</div>
      <div>&nbsp;&nbsp;cmap<span className="op">=</span><span className="str">&quot;coolwarm&quot;</span>,&nbsp;&nbsp;<span className="cm"># diverging palet</span></div>
      <div>&nbsp;&nbsp;center<span className="op">=</span><span className="num">0</span>,&nbsp;&nbsp;<span className="cm"># 0 nötr renk</span></div>
      <div>&nbsp;&nbsp;linewidths<span className="op">=</span><span className="num">0.5</span>,</div>
      <div>)</div>
      <div>plt.<span className="fn">title</span>(<span className="str">&quot;Değişken korelasyonu&quot;</span>)</div>
      <div>plt.<span className="fn">show</span>()</div>
    </div>
  );
}

/* Plotly treemap kod hücresi. */
function PlotlyTreemapCode() {
  return (
    <div className="vg-code">
      <div><span className="cm"># Hiyerarşik ağaç haritası — plotly.express</span></div>
      <div><span className="kw">import</span> plotly.express <span className="kw">as</span> px</div>
      <div className="mt-2">fig <span className="op">=</span> px.<span className="fn">treemap</span>(</div>
      <div>&nbsp;&nbsp;df,</div>
      <div>&nbsp;&nbsp;path<span className="op">=</span>[<span className="str">&quot;kategori&quot;</span>, <span className="str">&quot;urun&quot;</span>],&nbsp;&nbsp;<span className="cm"># hiyerarşi</span></div>
      <div>&nbsp;&nbsp;values<span className="op">=</span><span className="str">&quot;ciro&quot;</span>,&nbsp;&nbsp;<span className="cm"># alan = değer</span></div>
      <div>&nbsp;&nbsp;color<span className="op">=</span><span className="str">&quot;kar_marji&quot;</span>,&nbsp;<span className="cm"># renk = ikinci ölçüt</span></div>
      <div>&nbsp;&nbsp;color_continuous_scale<span className="op">=</span><span className="str">&quot;RdYlGn&quot;</span>,</div>
      <div>)</div>
      <div>fig.<span className="fn">show</span>()</div>
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
        <Eyebrow>BVA 2107 · 13. Hafta</Eyebrow>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.02]">
          <span className="vg-shimmer">Isı &amp; Ağaç Haritaları</span>
        </h1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Yoğunluğu renkle, payı alanla göster: heatmap ve treemap.
        </Sub>
        <div className="mt-12 grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { name: "Heatmap", desc: "Matris yoğunluğu · renk", icon: Thermometer },
            { name: "Treemap", desc: "Hiyerarşik pay · alan", icon: TreePine },
            { name: "Renk Skalası", desc: "Sequential · diverging", icon: Palette },
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
          MCBÜ MYO · Bilgisayar Programcılığı · BVA 2107 Veri Görselleştirme
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. GEÇEN HAFTADAN KÖPRÜ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 12. haftadan 13. haftaya</Eyebrow>
      <H2>Bir değişkenden iki boyuta geçiyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Şimdiye kadar çoğunlukla tek ölçütü çizdik: bar ile kategori, line ile zaman.
        Bu hafta iki kategorik eksenin <span className="text-[#ef4444] font-semibold">kesişimindeki</span> değeri
        renge çeviren ısı haritasını ve bir bütünü <span className="text-[#ef4444] font-semibold">orantılı alanlara</span>
        bölen ağaç haritasını ekliyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="vg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fca5a5]">
            <Thermometer className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Ne zaman ısı haritası?</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ef4444] flex-shrink-0" />İki kategorik eksen + bir sayısal değer (matris).</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ef4444] flex-shrink-0" />Yoğunluk, sıklık veya korelasyon deseni aranıyor.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ef4444] flex-shrink-0" />Çok hücre var, tek tek sayı okunamaz.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="vg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fcd34d]">
            <TreePine className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Ne zaman ağaç haritası?</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] flex-shrink-0" />Parça-bütün ilişkisi ve çok sayıda kategori.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] flex-shrink-0" />Hiyerarşi var (kategori → alt kategori).</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] flex-shrink-0" />Pasta grafiğin yetmediği 6+ dilim durumu.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 3. BU DERSİN AKIŞI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: ısı haritası → ağaç haritası → araçlar</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce matris yoğunluğunu renge çeviriyoruz; sonra hiyerarşiyi orantılı alanlara bölüyoruz;
        en son bunları Python ve Tableau&apos;da nasıl ürettiğimizi görüp küçük bir lab yapıyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Isı Haritaları", items: ["Matris yapısı", "Renk skalası seçimi", "Korelasyon matrisi"], icon: Thermometer, accent: "#ef4444" },
          { range: "02", title: "Ağaç Haritaları", items: ["Alan = değer ilkesi", "Hiyerarşi (drill-down)", "Pasta yerine ne zaman"], icon: TreePine, accent: "#f59e0b" },
          { range: "03", title: "Üretim & Lab", items: ["seaborn / plotly", "Tableau pano", "Uygulamalı alıştırma"], icon: Code2, accent: "#fbbf24" },
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
                <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: g.accent }}>Durak {g.range}</div>
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

  /* ───── 4. BÖLÜM 1 — ISI HARİTALARI ───── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Isı Haritaları (Heatmap)"
      subtitle="İki eksenin kesişimindeki değeri renge çeviren matris. Tek tablodan göz hemen sıcak ve soğuk bölgeleri yakalar."
      bgGradient="linear-gradient(135deg, #ef4444, #b91c1c)"
      shadow="0 25px 60px -15px rgba(239, 68, 68, 0.6)"
      icon={<Thermometer className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 5. ISI HARİTASI ANATOMİSİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Heatmap · anatomi</Eyebrow>
      <H2 className="mb-2">Matris + renk = desen</H2>
      <Sub className="max-w-3xl mb-6">
        Her hücre bir (satır, sütun) kesişimidir; rengi o kesişimdeki değeri kodlar.
        Aşağıda bir web sitesinin gün × saat trafiği: koyu = sakin, kırmızı/amber = yoğun.
      </Sub>
      <div className="grid grid-cols-3 gap-6 items-start">
        <div className="col-span-2 vg-chart-frame">
          <div className="text-[10px] text-gray-400 mb-1 font-mono">Ziyaret yoğunluğu — gün (sütun) × saat (satır)</div>
          <Heatmap />
        </div>
        <div className="space-y-3">
          <div className="vg-card rounded-xl p-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#ef4444] mb-2">
              <Grid3x3 className="w-4 h-4" /> ÜÇ BİLEŞEN
            </div>
            <ul className="text-[12px] text-gray-300 space-y-1.5">
              <li><span className="text-white font-semibold">Satır ekseni:</span> bir kategorik boyut (saat dilimi).</li>
              <li><span className="text-white font-semibold">Sütun ekseni:</span> ikinci kategorik boyut (gün).</li>
              <li><span className="text-white font-semibold">Renk:</span> kesişimdeki sayısal değer.</li>
            </ul>
          </div>
          <div className="vg-card rounded-lg p-3">
            <LegendBar low="düşük (0)" high="yüksek (100)" label="Renk skalası" />
          </div>
          <div className="text-[11px] text-gray-500 leading-snug">
            Cumartesi öğleden sonra belirgin bir &quot;sıcak bant&quot;: deseni sayı tablosunda fark etmek çok daha zor olurdu.
          </div>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 6. RENK SKALASI SEÇİMİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Heatmap · en kritik karar</Eyebrow>
      <H2>Doğru renk skalası = okunabilir ısı haritası</H2>
      <Sub className="mt-3 max-w-3xl">
        Isı haritasında değeri taşıyan tek şey renktir. Verinin türüne göre skala seçilmezse harita yanıltır.
      </Sub>
      <div className="mt-8 grid grid-cols-3 gap-4">
        {[
          {
            label: "Sequential — sıralı",
            bar: "linear-gradient(90deg,#1e293b,#7f1d1d,#dc2626,#fbbf24)",
            desc: "Tek yönlü büyüklük: trafik, sıcaklık, sayım. Düşük→yüksek tek renk ailesi.",
            tag: "En sık",
            tagCls: "vg-pill-good",
          },
          {
            label: "Diverging — iki uçlu",
            bar: "linear-gradient(90deg,#1e3a8a,#3b82f6,#f3f4f6,#ef4444,#7f1d1d)",
            desc: "Anlamlı bir orta nokta var: korelasyon (−1..+1), hedeften sapma, kâr/zarar.",
            tag: "Sapma için",
            tagCls: "vg-pill-mid",
          },
          {
            label: "Categorical — kategorik",
            bar: "linear-gradient(90deg,#ef4444,#22c55e,#3b82f6,#a855f7,#f59e0b)",
            desc: "Sırasız sınıflar. Isı haritasında sayısal yoğunluk için KULLANMAYIN.",
            tag: "Yanlış seçim",
            tagCls: "vg-pill-bad",
          },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="vg-card rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-white">{s.label}</span>
              <span className={`vg-pill ${s.tagCls}`}>{s.tag}</span>
            </div>
            <div className="h-8 rounded mb-2" style={{ background: s.bar }} />
            <div className="text-[11px] text-gray-400 leading-snug">{s.desc}</div>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 vg-card rounded-lg p-4 text-sm text-gray-300 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-[#ef4444] mt-0.5 shrink-0" />
        <div>
          <span className="text-white font-semibold">Algısal eşitlik (perceptual uniformity):</span> &quot;jet/rainbow&quot;
          gibi skalalar eşit veri farklarını eşit görsel farka çevirmez ve sahte sınırlar üretir.
          <span className="text-[#ef4444] font-semibold"> viridis, magma, cividis</span> gibi skalalar bu sorunu çözer.
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 7. DOĞRU vs YANLIŞ HEATMAP ───── */
  () => (
    <SlideShell>
      <Eyebrow>Heatmap · kıyas</Eyebrow>
      <H2>Aynı veri, iki renk kararı</H2>
      <Sub className="mt-3 max-w-3xl">
        Solda yoğunluk verisine kategorik palet uygulandı; göz hangi hücrenin daha &quot;büyük&quot; olduğunu çıkaramaz.
        Sağda sıralı skala deseni anında okunur kılar.
      </Sub>
      <div className="mt-8 grid grid-cols-2 gap-6">
        <div className="vg-card rounded-xl p-4 border-2 border-red-500/30">
          <div className="flex items-center gap-2 mb-3">
            <X className="w-5 h-5 text-rose-400" />
            <span className="text-sm font-semibold text-rose-300">Kategorik palet — yanlış</span>
          </div>
          <div className="vg-chart-frame">
            <BadHeatmap />
          </div>
          <ul className="mt-3 text-[11px] text-gray-400 space-y-1">
            <li>· Renkler arasında sıralama yok</li>
            <li>· &quot;Yüksek mi düşük mü&quot; okunamaz</li>
            <li>· Göz desen yerine gürültü görür</li>
          </ul>
        </div>
        <div className="vg-card rounded-xl p-4 border-2 border-emerald-500/30">
          <div className="flex items-center gap-2 mb-3">
            <Check className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-300">Sıralı skala — doğru</span>
          </div>
          <div className="vg-chart-frame">
            <GoodHeatmap />
          </div>
          <ul className="mt-3 text-[11px] text-gray-400 space-y-1">
            <li>· Koyu → açık tek yönlü büyüklük</li>
            <li>· Sıcak bölgeler tek bakışta belli</li>
            <li>· Lejant rengi değere bağlar</li>
          </ul>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 8. KORELASYON MATRİSİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Heatmap · klasik kullanım</Eyebrow>
      <H2 className="mb-2">Korelasyon matrisi</H2>
      <Sub className="max-w-3xl mb-6">
        Veri analizinde en yaygın ısı haritası. Her hücre iki değişkenin korelasyon katsayısıdır
        (−1 ile +1). Diverging skala kullanılır çünkü <span className="text-[#ef4444] font-semibold">0 anlamlı bir orta noktadır</span>.
      </Sub>
      <div className="grid grid-cols-2 gap-8 items-center">
        <div className="vg-chart-frame">
          <div className="text-[10px] text-gray-400 mb-1 font-mono">Ev fiyatı veri seti — değişken korelasyonu</div>
          <CorrelationMatrix />
        </div>
        <div className="space-y-3">
          <div className="vg-card rounded-xl p-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#ef4444] mb-2">
              <Sigma className="w-4 h-4" /> NASIL OKUNUR
            </div>
            <ul className="text-[12px] text-gray-300 space-y-2">
              <li><span className="font-mono text-[#fca5a5]">+1&apos;e yakın (kırmızı):</span> güçlü pozitif ilişki — m² ile fiyat (0.82).</li>
              <li><span className="font-mono text-[#93c5fd]">−1&apos;e yakın (mavi):</span> güçlü negatif ilişki — yaş ile fiyat (−0.45).</li>
              <li><span className="font-mono text-gray-300">0&apos;a yakın (nötr):</span> ilişki yok — kat ile oda sayısı.</li>
            </ul>
          </div>
          <div className="vg-card rounded-lg p-3 text-[11px] text-gray-400 leading-snug">
            Matris simetriktir; köşegen daima 1&apos;dir (bir değişken kendisiyle tam korelasyonda).
            Genellikle üst üçgen gizlenir, böylece tekrar göze takılmaz.
          </div>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 9. BÖLÜM 2 — AĞAÇ HARİTALARI ───── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Ağaç Haritaları (Treemap)"
      subtitle="Bir bütünü, alanı değeriyle orantılı dikdörtgenlere böler. Çok kategorili parça-bütün ve hiyerarşi için pasta grafiğin güçlü alternatifi."
      bgGradient="linear-gradient(135deg, #f59e0b, #b45309)"
      shadow="0 25px 60px -15px rgba(245, 158, 11, 0.6)"
      icon={<TreePine className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 10. TREEMAP ANATOMİSİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Treemap · anatomi</Eyebrow>
      <H2 className="mb-2">Alan = değer</H2>
      <Sub className="max-w-3xl mb-6">
        Ağaç haritası ekranı, her kategorinin payıyla orantılı dikdörtgenlere böler.
        Aşağıda bir şirket bütçesi: en büyük dikdörtgen en büyük kalemdir — başka açıklamaya gerek yok.
      </Sub>
      <div className="grid grid-cols-3 gap-6 items-start">
        <div className="col-span-2 vg-chart-frame">
          <div className="text-[10px] text-gray-400 mb-1 font-mono">Yıllık bütçe dağılımı (toplam = %100)</div>
          <Treemap />
        </div>
        <div className="space-y-3">
          <div className="vg-card rounded-xl p-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#f59e0b] mb-2">
              <LayoutGrid className="w-4 h-4" /> İLKELER
            </div>
            <ul className="text-[12px] text-gray-300 space-y-1.5">
              <li><span className="text-white font-semibold">Alan:</span> kategorinin değere oranı.</li>
              <li><span className="text-white font-semibold">Renk:</span> isteğe bağlı ikinci ölçüt (kâr marjı vb.).</li>
              <li><span className="text-white font-semibold">Yerleşim:</span> büyükten küçüğe, genelde sol-üstten.</li>
            </ul>
          </div>
          <div className="vg-card rounded-lg p-3 text-[11px] text-gray-400 leading-snug">
            Tek görselde 6+ kategoriyi karşılaştırmak pasta grafiğine göre çok daha kolaydır; insanlar
            alan oranlarını açı oranlarından daha güvenilir okur.
          </div>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 11. HİYERARŞİ / DRILL-DOWN ───── */
  () => (
    <SlideShell>
      <Eyebrow>Treemap · gücü</Eyebrow>
      <H2 className="mb-2">Hiyerarşiyi tek karede gösterir</H2>
      <Sub className="max-w-3xl mb-6">
        Asıl avantaj iç içe kategorilerdir: kategori → alt kategori → ürün. Dış blok kategori,
        içindeki bölünmeler alt kalemlerdir. Etkileşimli araçlarda bir bloğa tıklayıp
        <span className="text-[#f59e0b] font-semibold"> derinleşilir (drill-down)</span>.
      </Sub>
      <div className="grid grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="vg-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3 text-[#f59e0b]">
            <GitBranch className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Veri hiyerarşisi</span>
          </div>
          <div className="font-mono text-[12px] text-gray-300 space-y-1">
            <div>Elektronik</div>
            <div className="pl-4 text-gray-400">├─ Telefon</div>
            <div className="pl-4 text-gray-400">├─ Dizüstü</div>
            <div className="pl-4 text-gray-400">└─ Aksesuar</div>
            <div className="mt-1">Giyim</div>
            <div className="pl-4 text-gray-400">├─ Erkek</div>
            <div className="pl-4 text-gray-400">└─ Kadın</div>
          </div>
          <div className="text-[11px] text-gray-500 mt-3">
            Bu ağaç, treemap&apos;te iç içe bloklara dönüşür.
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="space-y-3"
        >
          <FeatureCard
            icon={Layers}
            title="İç içe seviyeler"
            desc="Dış dikdörtgen üst kategori; iç bölünmeler alt kalemler. Hiyerarşi görselde korunur."
            accent="#f59e0b"
            delay={0.1}
          />
          <FeatureCard
            icon={Target}
            title="İki ölçüt aynı anda"
            desc="Alan = büyüklük (ciro), renk = ayrı bir metrik (kâr marjı). Tek görselde iki bilgi."
            accent="#fbbf24"
            delay={0.2}
          />
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 12. TREEMAP vs PASTA — KARŞILAŞTIRMA TABLOSU ───── */
  () => (
    <SlideShell>
      <Eyebrow>Treemap · ne zaman, ne yerine?</Eyebrow>
      <H2>Pasta · ağaç haritası · bar — hangisi?</H2>
      <Sub className="mt-3 max-w-3xl">
        Üçü de parça-bütün gösterebilir; seçim kategori sayısına ve hiyerarşinin varlığına bağlıdır.
      </Sub>
      <div className="mt-8 vg-card rounded-xl p-4">
        <table className="vg-table">
          <thead>
            <tr>
              <th>Grafik</th>
              <th>İdeal kategori sayısı</th>
              <th>Hiyerarşi</th>
              <th>Güçlü yanı</th>
              <th>Zayıf yanı</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold text-white">Pasta / Donut</td>
              <td><span className="vg-pill vg-pill-mid">≤ 5 dilim</span></td>
              <td><span className="vg-pill vg-pill-bad">Yok</span></td>
              <td>Az dilimde pay sezgisi güçlü.</td>
              <td>Açıları karşılaştırmak zor; çok dilimde okunmaz.</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Treemap</td>
              <td><span className="vg-pill vg-pill-good">10+ kategori</span></td>
              <td><span className="vg-pill vg-pill-good">Var (iç içe)</span></td>
              <td>Çok kategori + hiyerarşi tek karede; alan oranı okunur.</td>
              <td>Çok küçük dilimler ve birbirine yakın değerler ayırt edilemez.</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Sıralı bar</td>
              <td><span className="vg-pill vg-pill-good">Esnek</span></td>
              <td><span className="vg-pill vg-pill-mid">Sınırlı</span></td>
              <td>Kesin değer kıyası için en doğru; eksen okunur.</td>
              <td>Parça-bütün &quot;tek görsel&quot; hissini vermez.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-xs text-gray-500 text-center font-mono">
        Kural: hiyerarşi + çok kategori → treemap · birkaç dilim → pasta · kesin kıyas → bar.
      </div>
    </SlideShell>
  ),

  /* ───── 13. BÖLÜM 3 — ÜRETİM ───── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Üretim: Python &amp; Tableau"
      subtitle="İlkeleri bildikten sonra her ikisini de birkaç satır kod ya da birkaç sürükle-bırak ile üretebilirsin."
      bgGradient="linear-gradient(135deg, #ef4444, #f59e0b)"
      shadow="0 25px 60px -15px rgba(239, 68, 68, 0.55)"
      icon={<Code2 className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 14. KOD — SEABORN HEATMAP & PLOTLY TREEMAP ───── */
  () => (
    <SlideShell>
      <Eyebrow>Python · seaborn &amp; plotly</Eyebrow>
      <H2>İki harita, birkaç satır kod</H2>
      <Sub className="mt-3 max-w-3xl">
        Solda seaborn ile korelasyon ısı haritası; sağda plotly ile hiyerarşik ağaç haritası.
        Dikkat: ısı haritasında <span className="text-[#ef4444] font-mono">cmap</span>, ağaç haritasında
        <span className="text-[#ef4444] font-mono"> values</span> ve <span className="text-[#ef4444] font-mono">color</span> kritik parametrelerdir.
      </Sub>
      <div className="mt-6 grid grid-cols-2 gap-6 items-start">
        <SeabornCode />
        <PlotlyTreemapCode />
      </div>
      <p className="mt-5 text-xs text-gray-500 text-center font-mono">
        seaborn → statik matris ısı haritası · plotly → etkileşimli, drill-down destekli ağaç haritası
      </p>
    </SlideShell>
  ),

  /* ───── 15. TABLEAU MOCKUP ───── */
  () => (
    <SlideShell>
      <Eyebrow>Tableau · sürükle-bırak</Eyebrow>
      <H2 className="mb-2">Kod yazmadan ısı &amp; ağaç haritası</H2>
      <Sub className="max-w-3xl mb-6">
        Tableau&apos;da işaret türü (Marks) &quot;Square&quot; seçilip iki boyut satıra/sütuna, ölçüt renge
        sürüklenince ısı haritası; mark türü &quot;Treemap&quot; seçilip boyut + ölçüt eklenince ağaç haritası oluşur.
      </Sub>
      <WindowChrome title="Tableau · Satış Analizi Panosu" badge="T">
        <div className="vg-dash p-3 grid grid-cols-12 gap-2" style={{ minHeight: 300 }}>
          <div className="vg-dash-tile col-span-7">
            <div className="text-[10px] text-gray-400 mb-1">Isı haritası — gün × saat trafiği</div>
            <Heatmap width={420} height={200} />
          </div>
          <div className="vg-dash-tile-amber col-span-5">
            <div className="text-[10px] text-gray-400 mb-1">Ağaç haritası — bütçe payı</div>
            <Treemap width={300} height={200} />
          </div>
          <div className="vg-dash-tile col-span-12">
            <div className="text-[10px] text-gray-400 mb-1 flex items-center gap-2">
              <Palette className="w-3.5 h-3.5 text-rose-400" /> Renk skalası lejantı (sürükle-bırak ile otomatik)
            </div>
            <div className="px-2">
              <LegendBar low="düşük yoğunluk" high="yüksek yoğunluk" label="Sequential · trafik" />
            </div>
          </div>
        </div>
      </WindowChrome>
    </SlideShell>
  ),

  /* ───── 16. ORTAK TUZAKLAR ───── */
  () => (
    <SlideShell>
      <Eyebrow>Sık yapılan hatalar</Eyebrow>
      <H2>Bu dört tuzağa düşme</H2>
      <Sub className="mt-3 max-w-3xl">
        İki grafik de güçlü; ama yanlış kurulduğunda yanıltıcı olur. En sık görülen dördü:
      </Sub>
      <div className="mt-8 grid grid-cols-2 gap-4">
        {[
          { icon: Palette, title: "Sıralı veriye kategorik palet", desc: "Yoğunluk verisine sırasız renkler; göz büyüklüğü okuyamaz. Sequential/diverging seç.", accent: "#ef4444" },
          { icon: Eye, title: "Lejantsız renk", desc: "Renk neyi temsil ediyor belirsizse harita anlamsız. Renk skalası lejantı zorunlu.", accent: "#f59e0b" },
          { icon: Grid3x3, title: "Çok küçük ağaç bloğu", desc: "Treemap&apos;te %1 altı diliminler etiket almaz; birbirine yakın değerler ayırt edilemez.", accent: "#fbbf24" },
          { icon: AlertTriangle, title: "Erişilebilirliği unutmak", desc: "Sadece kırmızı-yeşil diverging palet renk körü kullanıcıyı dışlar; körü-dostu skala kullan.", accent: "#fca5a5" },
        ].map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12 + i * 0.1 }}
            className="vg-card vg-card-hover rounded-xl p-5 flex items-start gap-4"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${t.accent}18`, border: `1px solid ${t.accent}55` }}
            >
              <t.icon className="w-5 h-5" style={{ color: t.accent }} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white mb-1">{t.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{t.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 17. UYGULAMALI LAB ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
      <H2>Dört adım: bir ısı, bir ağaç haritası</H2>
      <Sub className="mt-3 max-w-3xl">
        Hazır bir veri seti (örn. bir e-ticaret satış CSV&apos;si) ile çalış. Python veya Tableau serbest.
        Sonraki derse iki grafiği ve kısa yorumunu getir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Table, title: "Veriyi matrise çevir", desc: "Satış CSV&apos;sini gün × saat (veya bölge × kategori) tablosuna pivotla.", accent: "#ef4444" },
          { icon: Thermometer, title: "Isı haritasını çiz", desc: "Sequential bir skala (örn. viridis) ile yoğunluğu göster; lejant ekle.", accent: "#f59e0b" },
          { icon: TreePine, title: "Ağaç haritasını çiz", desc: "Kategori→ürün hiyerarşisiyle ciro payını alanla; kâr marjını renge bağla.", accent: "#fbbf24" },
          { icon: Sigma, title: "Üç cümlede yorumla", desc: "En sıcak hücre nerede? En büyük blok hangisi? Bir karar önerisi yaz.", accent: "#fca5a5" },
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
                <span className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-[10px] text-gray-500 font-mono">{i + 1}</span>
                <h3 className="text-base font-semibold text-white">{t.title}</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{t.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 18. SIRADAKİ HAFTA + KAPANIŞ ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8"
          style={{ background: "linear-gradient(135deg,#ef4444,#b91c1c)", boxShadow: "0 30px 80px -20px rgba(239,68,68,0.6)" }}
        >
          <Sparkles className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>13. hafta tamamlandı · sıradaki: 14. Hafta</Eyebrow>
        <H1>
          <span className="vg-shimmer-amber">Proje Sunumları</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Dönem boyunca öğrendiğin grafik türlerini — ısı ve ağaç haritaları dâhil — kendi veri setinde
          birleştirip bir pano hâlinde sunacaksın. Bu hafta ürettiğin iki grafik o panonun çekirdeği olabilir.
        </Sub>
        <div className="mt-10 grid grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
          <div className="vg-card rounded-xl p-5">
            <Calendar className="w-5 h-5 text-[#ef4444] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">Isı + ağaç haritası</div>
            <div className="text-sm text-gray-400">kısa yorumla birlikte</div>
          </div>
          <div className="vg-card rounded-xl p-5">
            <Target className="w-5 h-5 text-[#f59e0b] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">Pano taslağı</div>
            <div className="text-sm text-gray-400">grafik seçimini gerekçelendir</div>
          </div>
          <div className="vg-card rounded-xl p-5">
            <Eye className="w-5 h-5 text-[#fbbf24] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Kontrol</div>
            <div className="text-white font-semibold">Renk &amp; lejant</div>
            <div className="text-sm text-gray-400">erişilebilirliği test et</div>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-center gap-3 text-xs font-mono text-gray-500">
          <Keyboard className="w-4 h-4" />
          <span>MCBÜ MYO · BVA 2107 · Veri Görselleştirme · 13. Hafta</span>
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
          BVA 2107 · 13. Hafta · Isı &amp; Ağaç Haritaları
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
