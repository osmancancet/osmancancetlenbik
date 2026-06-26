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
  Palette,
  Droplet,
  Eye,
  Contrast,
  BarChart3,
  LineChart,
  PieChart,
  ScatterChart,
  Map,
  Grid3x3,
  Network,
  Layers,
  Check,
  X,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Calendar,
  Target,
  Brain,
  Sparkles,
  Hash,
  Code2,
  AlertTriangle,
  ListChecks,
  Thermometer,
  GitBranch,
  Tags,
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
   TOPIC MOCKUPS — Renk Teorisi & Grafik Seçimi
   ============================================================ */

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

/* HSL renk modeli — ton/doygunluk/parlaklık çubukları */
function HSLModel() {
  const hueStops = [
    "#ef4444", "#f59e0b", "#fde047", "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899", "#ef4444",
  ];
  return (
    <div className="vg-card rounded-xl p-5 space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-white">Ton (Hue)</span>
          <span className="text-[10px] font-mono text-gray-500">0° — 360°</span>
        </div>
        <div
          className="h-6 rounded vg-swatch"
          style={{ background: `linear-gradient(90deg, ${hueStops.join(", ")})` }}
        />
        <div className="text-[11px] text-gray-400 mt-1">
          Rengin kendisi: kırmızı, yeşil, mavi... Renk çarkındaki açı.
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-white">Doygunluk (Saturation)</span>
          <span className="text-[10px] font-mono text-gray-500">%0 — %100</span>
        </div>
        <div
          className="h-6 rounded vg-swatch"
          style={{ background: "linear-gradient(90deg, #64748b, #ef4444)" }}
        />
        <div className="text-[11px] text-gray-400 mt-1">
          Rengin canlılığı: griye yakından saf renge.
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-white">Parlaklık (Lightness)</span>
          <span className="text-[10px] font-mono text-gray-500">%0 — %100</span>
        </div>
        <div
          className="h-6 rounded vg-swatch"
          style={{ background: "linear-gradient(90deg, #000000, #ef4444, #ffffff)" }}
        />
        <div className="text-[11px] text-gray-400 mt-1">
          Siyahtan beyaza koyuluk/açıklık. Sıralı paletlerde bunu değiştiririz.
        </div>
      </div>
    </div>
  );
}

/* Renk çarkı + uyum şeması (tamamlayıcı / analog / üçlü) */
function ColorWheel({ scheme }: { scheme: "complementary" | "analogous" | "triadic" }) {
  const cx = 80;
  const cy = 80;
  const r = 62;
  const seg = 24; // 360/24 = 15°
  // Vurgulanacak açılar (derece)
  const highlights: Record<typeof scheme, number[]> = {
    complementary: [0, 180],
    analogous: [0, 30, 330],
    triadic: [0, 120, 240],
  };
  const hi = highlights[scheme];
  return (
    <div className="vg-wheel-frame">
      <svg width={160} height={160} className="block mx-auto">
        {Array.from({ length: seg }).map((_, i) => {
          const a0 = (i / seg) * Math.PI * 2 - Math.PI / 2;
          const a1 = ((i + 1) / seg) * Math.PI * 2 - Math.PI / 2;
          const x0 = cx + r * Math.cos(a0);
          const y0 = cy + r * Math.sin(a0);
          const x1 = cx + r * Math.cos(a1);
          const y1 = cy + r * Math.sin(a1);
          const hue = (i / seg) * 360;
          const isHi = hi.some((h) => Math.abs(((h - hue + 540) % 360) - 180) > 172.5);
          return (
            <path
              key={i}
              d={`M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1} Z`}
              fill={`hsl(${hue}, 75%, 55%)`}
              stroke="#0a0a0a"
              strokeWidth={isHi ? 0 : 0.5}
              opacity={isHi ? 1 : 0.28}
            />
          );
        })}
        {hi.map((h, i) => {
          const a = (h / 360) * Math.PI * 2 - Math.PI / 2;
          return (
            <circle
              key={i}
              cx={cx + (r + 8) * Math.cos(a)}
              cy={cy + (r + 8) * Math.sin(a)}
              r={4}
              fill="#fff"
              stroke="#0a0a0a"
              strokeWidth={1}
            />
          );
        })}
        <circle cx={cx} cy={cy} r={26} fill="#0a0a0a" />
      </svg>
    </div>
  );
}

/* Renk paleti şeridi */
function ColorPaletteStrip({
  label,
  colors,
  desc,
}: {
  label: string;
  colors: string[];
  desc: string;
}) {
  return (
    <div className="vg-card rounded-xl p-4">
      <div className="text-xs font-semibold text-white mb-2">{label}</div>
      <div className="flex h-8 rounded overflow-hidden mb-2 vg-swatch">
        {colors.map((c, i) => (
          <div key={i} className="flex-1" style={{ background: c }} />
        ))}
      </div>
      <div className="text-[11px] text-gray-400 leading-snug">{desc}</div>
    </div>
  );
}

/* Renk körlüğü karşılaştırması — aynı bar, üç görme tipi */
function ColorBlindBar({
  palette,
  title,
}: {
  palette: string[];
  title: string;
}) {
  const values = [42, 58, 35, 70, 50];
  const labels = ["Q1", "Q2", "Q3", "Q4", "Q5"];
  const width = 220;
  const height = 130;
  const pad = 18;
  const max = Math.max(...values);
  const bw = (width - 2 * pad) / values.length - 4;
  return (
    <div className="vg-chart-frame">
      <div className="text-[10px] text-gray-400 mb-1 font-mono">{title}</div>
      <svg width={width} height={height} className="block">
        <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#475569" />
        {values.map((v, i) => {
          const h = ((height - 2 * pad) * v) / max;
          return (
            <g key={i}>
              <rect
                x={pad + i * (bw + 4)}
                y={height - pad - h}
                width={bw}
                height={h}
                fill={palette[i % palette.length]}
                rx={2}
              />
              <text
                x={pad + i * (bw + 4) + bw / 2}
                y={height - pad + 10}
                fill="#94a3b8"
                fontSize={8}
                textAnchor="middle"
              >
                {labels[i]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* Mini grafik primitifleri (grafik seçimi bölümü için) */
function MiniBar({
  values,
  labels,
  color = "#ef4444",
  title,
  width = 200,
  height = 120,
}: {
  values: number[];
  labels?: string[];
  color?: string;
  title: string;
  width?: number;
  height?: number;
}) {
  const pad = 18;
  const max = Math.max(...values);
  const bw = (width - 2 * pad) / values.length - 4;
  return (
    <div className="vg-chart-frame">
      <div className="text-[10px] text-gray-400 mb-1 font-mono">{title}</div>
      <svg width={width} height={height} className="block">
        <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#475569" />
        {values.map((v, i) => {
          const h = ((height - 2 * pad) * v) / max;
          return (
            <g key={i}>
              <rect
                x={pad + i * (bw + 4)}
                y={height - pad - h}
                width={bw}
                height={h}
                fill={color}
                rx={2}
              />
              {labels && (
                <text
                  x={pad + i * (bw + 4) + bw / 2}
                  y={height - pad + 10}
                  fill="#94a3b8"
                  fontSize={8}
                  textAnchor="middle"
                >
                  {labels[i]}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function MiniLine({
  values,
  color = "#ef4444",
  title,
  width = 200,
  height = 120,
}: {
  values: number[];
  color?: string;
  title: string;
  width?: number;
  height?: number;
}) {
  const pad = 16;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const step = (width - 2 * pad) / (values.length - 1);
  const pts = values
    .map((v, i) => {
      const x = pad + i * step;
      const y = height - pad - ((v - min) / (max - min)) * (height - 2 * pad);
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <div className="vg-chart-frame">
      <div className="text-[10px] text-gray-400 mb-1 font-mono">{title}</div>
      <svg width={width} height={height} className="block">
        <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#475569" />
        <polyline points={pts} fill="none" stroke={color} strokeWidth={2} />
        {values.map((v, i) => {
          const x = pad + i * step;
          const y = height - pad - ((v - min) / (max - min)) * (height - 2 * pad);
          return <circle key={i} cx={x} cy={y} r={2.5} fill={color} />;
        })}
      </svg>
    </div>
  );
}

function MiniHistogram({
  title,
  color = "#ef4444",
  width = 200,
  height = 120,
}: {
  title: string;
  color?: string;
  width?: number;
  height?: number;
}) {
  // Yaklaşık normal dağılım — bitişik kutular (histogram, bar'dan farkı: boşluksuz)
  const bins = [4, 9, 16, 22, 24, 19, 12, 6, 3];
  const pad = 16;
  const max = Math.max(...bins);
  const bw = (width - 2 * pad) / bins.length;
  return (
    <div className="vg-chart-frame">
      <div className="text-[10px] text-gray-400 mb-1 font-mono">{title}</div>
      <svg width={width} height={height} className="block">
        <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#475569" />
        {bins.map((v, i) => {
          const h = ((height - 2 * pad) * v) / max;
          return (
            <rect
              key={i}
              x={pad + i * bw}
              y={height - pad - h}
              width={bw - 1}
              height={h}
              fill={color}
              opacity={0.85}
            />
          );
        })}
      </svg>
    </div>
  );
}

function MiniScatter({
  title,
  color = "#ef4444",
  width = 200,
  height = 120,
}: {
  title: string;
  color?: string;
  width?: number;
  height?: number;
}) {
  const pts = [
    { x: 2, y: 3 }, { x: 3, y: 5 }, { x: 4, y: 4 }, { x: 5, y: 7 },
    { x: 6, y: 6 }, { x: 7, y: 9 }, { x: 8, y: 8 }, { x: 9, y: 11 },
    { x: 10, y: 10 }, { x: 11, y: 13 }, { x: 12, y: 12 },
  ];
  const pad = 16;
  const sx = (x: number) => pad + ((x - 1) / 12) * (width - 2 * pad);
  const sy = (y: number) => height - pad - ((y - 1) / 13) * (height - 2 * pad);
  return (
    <div className="vg-chart-frame">
      <div className="text-[10px] text-gray-400 mb-1 font-mono">{title}</div>
      <svg width={width} height={height} className="block">
        <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#475569" />
        <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="#475569" />
        {pts.map((p, i) => (
          <circle key={i} cx={sx(p.x)} cy={sy(p.y)} r={3} fill={color} opacity={0.9} />
        ))}
      </svg>
    </div>
  );
}

function MiniChoropleth({
  title,
  width = 200,
  height = 120,
}: {
  title: string;
  width?: number;
  height?: number;
}) {
  // Basit ızgara — sıralı paletle yoğunluk (choropleth fikri)
  const rows = 4;
  const cols = 6;
  const pad = 10;
  const cw = (width - 2 * pad) / cols;
  const ch = (height - 2 * pad) / rows;
  return (
    <div className="vg-chart-frame">
      <div className="text-[10px] text-gray-400 mb-1 font-mono">{title}</div>
      <svg width={width} height={height} className="block">
        {Array.from({ length: rows }).flatMap((_, r) =>
          Array.from({ length: cols }).map((_, c) => {
            const v = (Math.sin(r * 0.8 + c * 0.6) + 1) / 2;
            return (
              <rect
                key={`${r}-${c}`}
                x={pad + c * cw}
                y={pad + r * ch}
                width={cw - 1.5}
                height={ch - 1.5}
                fill="#ef4444"
                opacity={0.2 + v * 0.75}
                rx={1}
              />
            );
          })
        )}
      </svg>
    </div>
  );
}

/* Veri türü → grafik karar tablosu */
function ChartSelectionTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="vg-card rounded-xl p-4"
    >
      <table className="vg-table">
        <thead>
          <tr>
            <th style={{ width: "26%" }}>Soru / İlişki</th>
            <th style={{ width: "20%" }}>Veri türü</th>
            <th style={{ width: "24%" }}>Önerilen grafik</th>
            <th>Kaçın</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-white font-semibold">Kategorileri karşılaştır</td>
            <td><span className="vg-pill vg-pill-info">Kategorik + sayısal</span></td>
            <td className="font-mono text-[#fca5a5]">Bar (yatay/dikey)</td>
            <td>3B pasta, çok dilimli pie</td>
          </tr>
          <tr>
            <td className="text-white font-semibold">Zamanla değişim</td>
            <td><span className="vg-pill vg-pill-info">Zaman serisi</span></td>
            <td className="font-mono text-[#fca5a5]">Çizgi (line)</td>
            <td>Bar (çok noktada kalabalık)</td>
          </tr>
          <tr>
            <td className="text-white font-semibold">Parça–bütün payı</td>
            <td><span className="vg-pill vg-pill-info">Oran (≤ 5 parça)</span></td>
            <td className="font-mono text-[#fca5a5]">Pie / 100% bar</td>
            <td>Çok dilimli pie, donut yığını</td>
          </tr>
          <tr>
            <td className="text-white font-semibold">İki değişken ilişkisi</td>
            <td><span className="vg-pill vg-pill-info">Sayısal × sayısal</span></td>
            <td className="font-mono text-[#fca5a5]">Dağılım (scatter)</td>
            <td>Çizgi (sıralı değilse)</td>
          </tr>
          <tr>
            <td className="text-white font-semibold">Tek değişken dağılımı</td>
            <td><span className="vg-pill vg-pill-info">Sürekli sayısal</span></td>
            <td className="font-mono text-[#fca5a5]">Histogram / box plot</td>
            <td>Bar (bin&apos;ler boşluklu)</td>
          </tr>
          <tr>
            <td className="text-white font-semibold">Coğrafi yoğunluk</td>
            <td><span className="vg-pill vg-pill-info">Bölge + sayısal</span></td>
            <td className="font-mono text-[#fca5a5]">Choropleth harita</td>
            <td>Bölge başına 3B balon</td>
          </tr>
        </tbody>
      </table>
    </motion.div>
  );
}

/* Vega-Lite / matplotlib renk ölçeği kod bloğu */
function ColorScaleCode() {
  return (
    <div className="vg-code">
      <div><span className="cm"># Sıralı veri → sıralı palet (matplotlib)</span></div>
      <div><span className="kw">import</span> matplotlib.pyplot <span className="kw">as</span> plt</div>
      <div className="mt-2">
        plt.<span className="fn">scatter</span>(x, y, c<span className="op">=</span>gelir,
      </div>
      <div>
        {"  "}cmap<span className="op">=</span><span className="str">&quot;Reds&quot;</span>)
        {"  "}<span className="cm"># tek yönlü büyüklük</span>
      </div>
      <div className="mt-2"><span className="cm"># İki uçlu (kâr/zarar) → diverging</span></div>
      <div>
        plt.<span className="fn">imshow</span>(sapma, cmap<span className="op">=</span><span className="str">&quot;RdBu&quot;</span>,
      </div>
      <div>
        {"  "}vmin<span className="op">=</span><span className="op">-</span><span className="num">1</span>,
        vmax<span className="op">=</span><span className="num">1</span>)
        {"  "}<span className="cm"># 0 = nötr orta</span>
      </div>
      <div className="mt-2"><span className="cm"># Kategorik → nitel palet</span></div>
      <div>
        renkler <span className="op">=</span> plt.<span className="fn">get_cmap</span>(<span className="str">&quot;tab10&quot;</span>)
        <span className="cm"> # 10 ayrık renk</span>
      </div>
    </div>
  );
}

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ───── 1. Kapak ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2107 · 7. Hafta</Eyebrow>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
          <span className="vg-shimmer">Renk &amp; Doğru Grafik</span>
        </h1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Rengi rastgele değil amaca göre seç; grafiği de verinin türüne göre.
          Bu hafta iki kararı da sağlam bir temele oturtuyoruz.
        </Sub>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <FeatureCard
            icon={Palette}
            title="Renk Teorisi"
            desc="HSL modeli, renk çarkı, uyum şemaları; sequential / diverging / categorical paletler."
            delay={0.3}
            accent="#ef4444"
          />
          <FeatureCard
            icon={Eye}
            title="Erişilebilirlik"
            desc="Renk körlüğü, kontrast ve şekil/etiketle yedekleme — herkes okuyabilsin."
            delay={0.45}
            accent="#f59e0b"
          />
          <FeatureCard
            icon={BarChart3}
            title="Grafik Seçimi"
            desc="Veri türünden doğru grafiğe: bar, line, scatter, histogram, pie, choropleth."
            delay={0.6}
            accent="#22c55e"
          />
        </div>
        <div className="mt-10 text-xs font-mono text-gray-500">
          MCBÜ MYO · Bilgisayar Programcılığı · 2025-2026 Bahar
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. Köprü: geçen hafta → bu hafta ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 6. haftadan 7. haftaya</Eyebrow>
      <H2>Veriyi hazırladık; şimdi onu doğru gösterelim</H2>
      <Sub className="mt-3 max-w-3xl">
        Önceki haftalarda veriyi temizleyip grafik türlerine giriş yaptık. Ama
        &quot;hangi grafik&quot; ve &quot;hangi renk&quot; soruları çoğu hatanın kaynağı. Bu hafta her iki kararı
        verinin türüne bağlayan net kurallar koyuyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="vg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fca5a5]">
            <Palette className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Renk kararı</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ef4444] flex-shrink-0" />Renk veriyi mi taşıyor, yoksa süs mü?</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ef4444] flex-shrink-0" />Palet türü veri türüne uyuyor mu?</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ef4444] flex-shrink-0" />Renk körü biri de okuyabiliyor mu?</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="vg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Grafik kararı</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Hangi soruya cevap arıyorum?</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Değişkenler kategorik mi, sayısal mı, zamansal mı?</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Karşılaştırma mı, ilişki mi, dağılım mı?</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 3. Dersin akışı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: renk teorisi → erişilebilirlik → grafik seçimi</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce rengin nasıl çalıştığını ve doğru paleti seçmeyi öğreniyoruz; sonra herkesin
        okuyabilmesini güvenceye alıyoruz; en son veri türünden grafiğe giden kuralı kuruyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Renk Teorisi", items: ["HSL modeli & renk çarkı", "Uyum şemaları", "Palet türleri"], icon: Palette, accent: "#ef4444" },
          { range: "02", title: "Erişilebilirlik", items: ["Renk körlüğü tipleri", "Kontrast oranı", "Renk + şekil/etiket"], icon: Eye, accent: "#f59e0b" },
          { range: "03", title: "Grafik Seçimi", items: ["Veri türü → grafik", "Karar tablosu", "Sık yapılan hatalar"], icon: BarChart3, accent: "#22c55e" },
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

  /* ───── 4. Bölüm 1 — Renk Teorisi ───── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Renk Teorisi"
      subtitle="Renk en güçlü görsel kanaldır; ama yanlış kullanıldığında en hızlı yanıltandır. Önce dilini öğrenelim."
      bgGradient="linear-gradient(135deg, #ef4444, #b91c1c)"
      shadow="0 25px 60px -15px rgba(239, 68, 68, 0.6)"
      icon={<Palette className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 5. HSL modeli ───── */
  () => (
    <SlideShell>
      <Eyebrow>Rengin üç bileşeni · HSL</Eyebrow>
      <H2 className="mb-2">Bir rengi üç sayı tanımlar</H2>
      <Sub className="max-w-3xl mb-6">
        Görselleştirmede rengi RGB&apos;den çok HSL ile düşünmek işe yarar: ton rengin kimliği,
        doygunluk canlılığı, parlaklık koyuluğudur. Sıralı bir palet aslında parlaklığı kademeli
        değiştirmekten ibarettir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <HSLModel />
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="vg-card rounded-xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-[#ef4444] mb-4">Neden HSL?</div>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-2">
              <Droplet className="w-4 h-4 mt-0.5 text-[#ef4444] flex-shrink-0" />
              <span>Aynı tonda farklı parlaklıklar = doğal sıralı palet.</span>
            </li>
            <li className="flex gap-2">
              <Contrast className="w-4 h-4 mt-0.5 text-[#f59e0b] flex-shrink-0" />
              <span>Parlaklık farkı, ton farkından daha güvenilir okunur (renk körü dostu).</span>
            </li>
            <li className="flex gap-2">
              <Thermometer className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />
              <span>Sıcak/soğuk ton ayrımı diverging paletlerin temelidir.</span>
            </li>
          </ul>
          <div className="mt-4 pt-4 border-t border-white/10 text-[11px] text-gray-400 leading-snug">
            İpucu: insan gözü parlaklığa, salt tona göre çok daha duyarlıdır. Önemli sıralamayı
            <span className="text-[#ef4444] font-semibold"> parlaklıkla</span> kodla.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 6. Renk çarkı & uyum şemaları ───── */
  () => (
    <SlideShell>
      <Eyebrow>Renk çarkı · uyum şemaları</Eyebrow>
      <H2 className="mb-2">Renkler birbiriyle nasıl anlaşır?</H2>
      <Sub className="max-w-3xl mb-6">
        Çarktaki açı ilişkileri, birlikte iyi görünen renk gruplarını verir. Görselleştirmede
        en çok vurgu (tamamlayıcı) ve sıralı geçiş (analog) işimize yarar.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { k: "complementary" as const, t: "Tamamlayıcı", d: "Karşıt iki renk (180°). Güçlü vurgu, &apos;şuna bak&apos; demek için." },
          { k: "analogous" as const, t: "Analog", d: "Komşu tonlar. Yumuşak, sıralı geçişler için ideal." },
          { k: "triadic" as const, t: "Üçlü (triadic)", d: "Çarkta eşit aralıklı 3 renk. Az sayıda kategori için dengeli." },
        ].map((s, i) => (
          <motion.div
            key={s.k}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="vg-card rounded-xl p-5 text-center"
          >
            <ColorWheel scheme={s.k} />
            <div className="text-sm font-semibold text-white mt-3">{s.t}</div>
            <div
              className="text-[11px] text-gray-400 mt-1 leading-snug"
              dangerouslySetInnerHTML={{ __html: s.d }}
            />
          </motion.div>
        ))}
      </div>
      <p className="mt-6 text-xs text-gray-500 text-center font-mono">
        Pratik: bir grafikte 1 vurgu rengi + nötr griler çoğu zaman 5 farklı renkten daha iyidir.
      </p>
    </SlideShell>
  ),

  /* ───── 7. Palet türleri ───── */
  () => (
    <SlideShell>
      <Eyebrow>Palet türleri · veriye göre</Eyebrow>
      <H2>Üç palet, üç farklı veri</H2>
      <Sub className="mt-3 max-w-3xl">
        En kritik renk kuralı: palet türü, verinin türüne uymalı. Yanlış eşleşme yanlış mesaj verir.
      </Sub>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 text-[#fca5a5]">
            <GitBranch className="w-4 h-4 rotate-90" />
            <span className="text-xs font-mono uppercase tracking-widest">Sequential</span>
          </div>
          <ColorPaletteStrip
            label="Sıralı (tek yönlü büyüklük)"
            colors={["#fff7ed", "#fed7aa", "#fdba74", "#fb923c", "#f97316", "#ea580c", "#c2410c"]}
            desc="Gelir, sıcaklık, yoğunluk gibi düşük → yüksek süreklilik."
          />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2 text-[#93c5fd]">
            <Contrast className="w-4 h-4" />
            <span className="text-xs font-mono uppercase tracking-widest">Diverging</span>
          </div>
          <ColorPaletteStrip
            label="İki uçlu (nötr orta)"
            colors={["#1e3a8a", "#3b82f6", "#93c5fd", "#f3f4f6", "#fca5a5", "#ef4444", "#7f1d1d"]}
            desc="Kâr/zarar, +/− sapma, hedef altı/üstü. Orta nokta = sıfır."
          />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2 text-[#86efac]">
            <Tags className="w-4 h-4" />
            <span className="text-xs font-mono uppercase tracking-widest">Categorical</span>
          </div>
          <ColorPaletteStrip
            label="Kategorik (sırasız sınıf)"
            colors={["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6"]}
            desc="Ürün grupları, bölgeler. Sıra anlamı yok; ayırt edilebilirlik önemli."
          />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="vg-card rounded-lg p-3 text-xs text-gray-300">
          <span className="text-[#ef4444] font-semibold">Kural 1:</span> Sıralı veriye kategorik palet uygulama.
        </div>
        <div className="vg-card rounded-lg p-3 text-xs text-gray-300">
          <span className="text-[#f59e0b] font-semibold">Kural 2:</span> 7+ kategoride renkle değil etiketle/yüzle ayır.
        </div>
        <div className="vg-card rounded-lg p-3 text-xs text-gray-300">
          <span className="text-[#22c55e] font-semibold">Kural 3:</span> Renge anlam ver (kırmızı = düşüş, yeşil = artış).
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 8. Bölüm 2 — Erişilebilirlik ───── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Erişilebilir Renk"
      subtitle="Bir grafik herkes okuyabiliyorsa işe yarar. Renk körlüğü ve düşük kontrast en sık gözden kaçan iki engeldir."
      bgGradient="linear-gradient(135deg, #f59e0b, #b45309)"
      shadow="0 25px 60px -15px rgba(245, 158, 11, 0.6)"
      icon={<Eye className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 9. Renk körlüğü karşılaştırması ───── */
  () => (
    <SlideShell>
      <Eyebrow>Renk körlüğü · simülasyon</Eyebrow>
      <H2>Kırmızı-yeşil ayrımı herkese görünmez</H2>
      <Sub className="mt-3 max-w-3xl">
        Renk görme eksiklikleri özellikle erkeklerde belirgin oranda görülür; en yaygını
        kırmızı-yeşil ayrımının zorlaşmasıdır. Aynı grafik üç görme tipinde:
      </Sub>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <div className="text-xs text-gray-400 mb-2 text-center font-mono">Normal görüş</div>
          <ColorBlindBar
            palette={["#ef4444", "#22c55e", "#3b82f6", "#f59e0b", "#a855f7"]}
            title="Çeyrek satışları"
          />
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-2 text-center font-mono">Deuteranopi (yeşil)</div>
          <ColorBlindBar
            palette={["#9a8b3a", "#a39b4a", "#3b82f6", "#c9a55a", "#a855f7"]}
            title="Aynı veri"
          />
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-2 text-center font-mono">Protanopi (kırmızı)</div>
          <ColorBlindBar
            palette={["#796b3a", "#9c9544", "#3b82f6", "#b5a14a", "#a855f7"]}
            title="Aynı veri"
          />
        </div>
      </div>
      <div className="mt-6 vg-card rounded-lg p-4 text-sm text-gray-300 flex items-start gap-3">
        <Eye className="w-5 h-5 text-[#f59e0b] mt-0.5 shrink-0" />
        <div>
          <span className="text-white font-semibold">Çözüm:</span> sadece renge güvenme. Şekil, kalıp veya
          doğrudan etiket ekle. Renk körü dostu paletler (örn. viridis, ColorBrewer) ve Coblis gibi
          simülatörlerle test et.
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 10. Kontrast & güvenli kullanım ───── */
  () => (
    <SlideShell>
      <Eyebrow>Kontrast & güvenli kullanım</Eyebrow>
      <H2>Renk yeterli değil; kontrast ve yedek kanal şart</H2>
      <Sub className="mt-3 max-w-3xl">
        Düşük kontrast, projeksiyonda ve baskıda ilk kaybolan şeydir. Önemli bilgiyi her zaman
        ikinci bir kanalla (konum, şekil, etiket) destekle.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={Contrast}
          title="Yeterli kontrast"
          desc="Metin ve arka plan arasında belirgin parlaklık farkı bırak; gri üzerine açık gri okunmaz."
          accent="#ef4444"
          delay={0.1}
        />
        <FeatureCard
          icon={Tags}
          title="Doğrudan etiketle"
          desc="Lejant yerine veriyi doğrudan etiketle; göz renk eşleştirmek için ileri-geri gidip gelmesin."
          accent="#f59e0b"
          delay={0.2}
        />
        <FeatureCard
          icon={Layers}
          title="Çift kodlama"
          desc="Renk + çizgi deseni / işaretçi şekli. Renk kaybolsa bile seri ayırt edilir kalsın."
          accent="#22c55e"
          delay={0.3}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 vg-card rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <AlertTriangle className="w-4 h-4 text-[#f59e0b] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Pratik test:</span> grafiği gri tonlamaya çevir. Seriler hâlâ
          ayırt ediliyorsa erişilebilirlik büyük ölçüde sağlanmış demektir.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 11. Bölüm 3 — Grafik Seçimi ───── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Veri Türüne Uygun Grafik"
      subtitle="Doğru grafik tesadüf değildir; verinin türünden ve sorduğun sorudan çıkar. Önce soru, sonra şekil."
      bgGradient="linear-gradient(135deg, #22c55e, #15803d)"
      shadow="0 25px 60px -15px rgba(34, 197, 94, 0.55)"
      icon={<BarChart3 className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 12. Veri türleri ───── */
  () => (
    <SlideShell>
      <Eyebrow>Önce veriyi sınıflandır</Eyebrow>
      <H2>Grafik seçimi veri türüyle başlar</H2>
      <Sub className="mt-3 max-w-3xl">
        Her sütunun türünü adlandır: doğru grafik çoğu zaman buradan kendiliğinden çıkar.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Tags, t: "Kategorik (nominal)", d: "Sırasız sınıflar: şehir, ürün, marka. Karşılaştırma → bar.", accent: "#ef4444" },
          { icon: ListChecks, t: "Sıralı (ordinal)", d: "Sıralı ama eşit aralıksız: düşük/orta/yüksek, anket likert.", accent: "#f59e0b" },
          { icon: Hash, t: "Sayısal (sürekli)", d: "Ölçülen değer: gelir, sıcaklık, ağırlık. Dağılım → histogram.", accent: "#22c55e" },
          { icon: Calendar, t: "Zamansal", d: "Tarih/saat boyunca değişim. Trend → çizgi grafiği.", accent: "#3b82f6" },
        ].map((d, i) => (
          <motion.div
            key={d.t}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="vg-card rounded-xl p-5 flex items-start gap-4"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${d.accent}18`, border: `1px solid ${d.accent}55` }}
            >
              <d.icon className="w-5 h-5" style={{ color: d.accent }} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white mb-1">{d.t}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{d.d}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 13. Grafik galerisi — veri türüne göre ───── */
  () => (
    <SlideShell>
      <Eyebrow>Doğru veri · doğru şekil</Eyebrow>
      <H2 className="mb-2">Altı temel grafik, altı farklı soru</H2>
      <Sub className="max-w-3xl mb-6">
        Her grafik belirli bir soruya cevap verir. Aşağıda her birinin tipik kullanımı:
      </Sub>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div>
          <MiniBar values={[3, 7, 5, 9, 6]} labels={["A", "B", "C", "D", "E"]} title="Bar" color="#ef4444" />
          <p className="text-[11px] text-gray-400 mt-1 px-1 leading-snug">Kategori karşılaştırma.</p>
        </div>
        <div>
          <MiniLine values={[3, 5, 4, 7, 8, 6, 9, 11]} title="Line" color="#3b82f6" />
          <p className="text-[11px] text-gray-400 mt-1 px-1 leading-snug">Zaman içinde trend.</p>
        </div>
        <div>
          <MiniScatter title="Scatter" color="#22c55e" />
          <p className="text-[11px] text-gray-400 mt-1 px-1 leading-snug">İki sayısal değişken ilişkisi.</p>
        </div>
        <div>
          <MiniHistogram title="Histogram" color="#f59e0b" />
          <p className="text-[11px] text-gray-400 mt-1 px-1 leading-snug">Tek değişkenin dağılımı.</p>
        </div>
        <div>
          <MiniChoropleth title="Choropleth" />
          <p className="text-[11px] text-gray-400 mt-1 px-1 leading-snug">Coğrafi yoğunluk (sıralı palet).</p>
        </div>
        <div>
          <MiniBar values={[58, 42, 30, 22]} labels={["T", "G", "Gı", "D"]} title="100% bar" color="#8b5cf6" />
          <p className="text-[11px] text-gray-400 mt-1 px-1 leading-snug">Parça-bütün payı (pie alternatifi).</p>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 14. Karar tablosu ───── */
  () => (
    <SlideShell>
      <Eyebrow>Karar tablosu · cep rehberi</Eyebrow>
      <H2 className="mb-2">Soru + veri türü → grafik</H2>
      <Sub className="max-w-3xl mb-6">
        Bu tabloyu yanına al: önce sütundaki soruyu/veri türünü bul, sonra önerilen grafiği seç ve
        sağdaki tuzaktan kaçın.
      </Sub>
      <ChartSelectionTable />
    </SlideShell>
  ),

  /* ───── 15. Sık yapılan hatalar ───── */
  () => (
    <SlideShell>
      <Eyebrow>Sık yapılan hatalar</Eyebrow>
      <H2>Üç klasik hata, üç düzeltme</H2>
      <Sub className="mt-3 max-w-3xl">
        Çoğu zayıf grafik aynı birkaç hatadan doğar. Tanıdıkça düzeltmesi kolaylaşır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[
          {
            bad: "Çok dilimli 3B pasta",
            why: "Açı ve perspektif oranları çarpıtır; dilimleri kıyaslamak imkânsızlaşır.",
            fix: "Sıralı yatay bar kullan.",
          },
          {
            bad: "Sıralı veriye rastgele renk",
            why: "Kategorik palet, büyüklük sıralamasını gizler; göz yanlış örüntü görür.",
            fix: "Tek tonda sequential palet.",
          },
          {
            bad: "Kesik y ekseni",
            why: "Sıfırdan başlamayan eksen küçük farkı dramatik gösterir — yanıltıcıdır.",
            fix: "Bar grafikte ekseni 0&apos;dan başlat.",
          },
        ].map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 + i * 0.12 }}
            className="vg-card rounded-xl p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <X className="w-5 h-5 text-rose-400" />
              <span className="text-sm font-semibold text-rose-300">{m.bad}</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-3">{m.why}</p>
            <div className="flex items-start gap-2 border-t border-white/10 pt-3">
              <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span
                className="text-xs text-emerald-200"
                dangerouslySetInnerHTML={{ __html: m.fix }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 16. Kod — renk ölçekleri ───── */
  () => (
    <SlideShell>
      <Eyebrow>Pratikte · renk ölçekleri</Eyebrow>
      <H2 className="mb-2">Doğru cmap, doğru veri</H2>
      <Sub className="max-w-3xl mb-6">
        matplotlib&apos;te (ve çoğu araçta) palet seçimi tek satır. Önemli olan veri türüne uygun
        ölçek adını seçmek: sıralı için <span className="font-mono text-[#fca5a5]">Reds</span>,
        iki uçlu için <span className="font-mono text-[#fca5a5]">RdBu</span>, kategorik için
        <span className="font-mono text-[#fca5a5]"> tab10</span>.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <ColorScaleCode />
        <div className="space-y-3">
          <ColorPaletteStrip
            label="Reds — sequential"
            colors={["#fff5f0", "#fcbba1", "#fc9272", "#fb6a4a", "#de2d26", "#a50f15"]}
            desc="Tek yönlü büyüklük: düşük → yüksek."
          />
          <ColorPaletteStrip
            label="RdBu — diverging"
            colors={["#b2182b", "#ef8a62", "#fddbc7", "#f7f7f7", "#d1e5f0", "#67a9cf", "#2166ac"]}
            desc="İki uç + nötr orta: negatif ↔ pozitif."
          />
          <ColorPaletteStrip
            label="tab10 — categorical"
            colors={["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"]}
            desc="Sırasız sınıflar için ayırt edilebilir renkler."
          />
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 17. Uygulamalı lab ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı alıştırma</Eyebrow>
      <H2>Bir grafiği renk ve tür açısından düzelt</H2>
      <Sub className="mt-3 max-w-3xl">
        Tableau Public veya Excel ile çalış. Bir önceki ödevdeki not verini kullan; her adımı bir
        ekran görüntüsüyle belgele.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: BarChart3, title: "Doğru grafiği seç", desc: "Verinin türüne göre karar tablosundan grafiği seç; neden seçtiğini bir cümleyle yaz.", accent: "#ef4444" },
          { icon: Palette, title: "Uygun paleti uygula", desc: "Sıralı veriye sequential, kategorik veriye nitel palet ver. Renge anlam kat.", accent: "#f59e0b" },
          { icon: Eye, title: "Erişilebilirliği test et", desc: "Grafiği gri tonlamaya çevir ya da Coblis ile simüle et; seriler hâlâ ayrılıyor mu?", accent: "#22c55e" },
          { icon: Tags, title: "Doğrudan etiketle", desc: "Lejant yerine veriyi doğrudan etiketle; başlık verinin ana mesajını söylesin.", accent: "#3b82f6" },
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 vg-card rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <Target className="w-4 h-4 text-[#ef4444] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Teslim:</span> &quot;önce/sonra&quot; iki ekran görüntüsü + 3 cümlelik
          gerekçe (hangi grafik, hangi palet, neden). Sonraki derse getir.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 18. Sıradaki hafta + kapanış ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8"
          style={{ background: "linear-gradient(135deg,#ef4444,#f59e0b)", boxShadow: "0 30px 80px -20px rgba(239,68,68,0.55)" }}
        >
          <Network className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>7. hafta tamamlandı · sıradaki: Etkileşim &amp; Filtreler</Eyebrow>
        <H1>
          <span className="vg-shimmer-amber">Statik Grafikten Panoya</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta tek bir grafiği doğru renk ve türle kurduk. Gelecek hafta birden çok grafiği
          filtreler ve etkileşimle birbirine bağlayıp ilk panomuzu (dashboard) oluşturuyoruz.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto">
          <FeatureCard icon={Grid3x3} title="Filtreler" desc="Veriyi canlı daraltma; tek grafik yerine sorgulanabilir pano." accent="#ef4444" delay={0.1} />
          <FeatureCard icon={Map} title="Etkileşim" desc="Tıkla-vurgu, hover ipuçları, bağlı seçim (highlight)." accent="#f59e0b" delay={0.2} />
          <FeatureCard icon={ScatterChart} title="Pano tasarımı" desc="Grafikleri anlamlı bir düzende yerleştirme." accent="#22c55e" delay={0.3} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="vg-card rounded-xl p-5">
            <Calendar className="w-5 h-5 text-[#ef4444] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Ders saati</div>
            <div className="text-white font-semibold">Cuma</div>
            <div className="text-sm text-gray-400">11:45 — 15:10</div>
          </div>
          <div className="vg-card rounded-xl p-5">
            <Target className="w-5 h-5 text-[#f59e0b] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">Tableau Public</div>
            <div className="text-sm text-gray-400">kurulu ve veriyle gel</div>
          </div>
          <div className="vg-card rounded-xl p-5">
            <Brain className="w-5 h-5 text-[#22c55e] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">Düzeltilmiş grafik</div>
            <div className="text-sm text-gray-400">önce/sonra + gerekçe</div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 text-xs font-mono text-gray-600 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>MCBÜ MYO · BVA 2107 · Veri Görselleştirme · 2025-2026 Bahar</span>
        </motion.div>
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
          BVA 2107 · 7. Hafta · Renk &amp; Grafik Seçimi
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
