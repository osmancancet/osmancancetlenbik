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
  BarChart3,
  LineChart,
  PieChart,
  ScatterChart,
  TrendingUp,
  Palette,
  Sparkles,
  Brain,
  Target,
  Lightbulb,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Quote,
  Check,
  X,
  Wand2,
  Zap,
  Hash,
  Globe,
  GraduationCap,
  Eye,
  Calendar,
  Search,
  Database,
  Briefcase,
  Users,
  Gauge,
  Layers,
  Code2,
  Grid3x3,
  Megaphone,
  Map,
  Activity,
  MapPin,
  Mail,
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

function StatCard({
  icon: Icon,
  value,
  label,
  source,
  delay = 0,
  accent = "#ef4444",
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  source?: string;
  delay?: number;
  accent?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className="vg-card rounded-xl p-5"
    >
      <Icon className="w-6 h-6 mb-3" style={{ color: accent }} />
      <div className="text-3xl md:text-4xl font-bold text-white">{value}</div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
      {source && (
        <div className="text-[9px] text-gray-600 mt-2 font-mono">{source}</div>
      )}
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

function QuoteSlide({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <SlideShell>
      <div className="text-center max-w-4xl mx-auto">
        <Quote className="w-16 h-16 text-[#ef4444]/40 mx-auto mb-8" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-light text-white leading-snug"
        >
          &ldquo;{quote}&rdquo;
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10"
        >
          <div className="text-lg font-semibold text-[#ef4444]">{author}</div>
          <div className="text-sm text-gray-500 mt-1">{role}</div>
        </motion.div>
      </div>
    </SlideShell>
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
   TOPIC MOCKUPS
   ============================================================ */

type Pt = { x: number; y: number };

function MiniScatter({
  data,
  line,
  title,
  width = 200,
  height = 140,
}: {
  data: Pt[];
  line?: { m: number; b: number };
  title: string;
  width?: number;
  height?: number;
}) {
  const pad = 16;
  const xs = data.map((d) => d.x);
  const ys = data.map((d) => d.y);
  const xMin = Math.min(...xs) - 1;
  const xMax = Math.max(...xs) + 1;
  const yMin = Math.min(...ys) - 1;
  const yMax = Math.max(...ys) + 1;
  const sx = (x: number) => pad + ((x - xMin) / (xMax - xMin)) * (width - 2 * pad);
  const sy = (y: number) =>
    height - pad - ((y - yMin) / (yMax - yMin)) * (height - 2 * pad);

  return (
    <div className="vg-chart-frame">
      <div className="text-[10px] text-gray-400 mb-1 font-mono">{title}</div>
      <svg width={width} height={height} className="block">
        <line
          x1={pad}
          y1={height - pad}
          x2={width - pad}
          y2={height - pad}
          stroke="#475569"
          strokeWidth={1}
        />
        <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="#475569" strokeWidth={1} />
        {line && (
          <line
            x1={sx(xMin)}
            y1={sy(line.m * xMin + line.b)}
            x2={sx(xMax)}
            y2={sy(line.m * xMax + line.b)}
            stroke="#ef4444"
            strokeWidth={1.5}
            strokeDasharray="3 3"
            opacity={0.8}
          />
        )}
        {data.map((d, i) => (
          <circle key={i} cx={sx(d.x)} cy={sy(d.y)} r={3} fill="#f87171" opacity={0.9} />
        ))}
      </svg>
    </div>
  );
}

function AnscombeQuartet() {
  // Classic Anscombe's quartet (1973)
  const I: Pt[] = [
    { x: 10, y: 8.04 }, { x: 8, y: 6.95 }, { x: 13, y: 7.58 }, { x: 9, y: 8.81 },
    { x: 11, y: 8.33 }, { x: 14, y: 9.96 }, { x: 6, y: 7.24 }, { x: 4, y: 4.26 },
    { x: 12, y: 10.84 }, { x: 7, y: 4.82 }, { x: 5, y: 5.68 },
  ];
  const II: Pt[] = [
    { x: 10, y: 9.14 }, { x: 8, y: 8.14 }, { x: 13, y: 8.74 }, { x: 9, y: 8.77 },
    { x: 11, y: 9.26 }, { x: 14, y: 8.10 }, { x: 6, y: 6.13 }, { x: 4, y: 3.10 },
    { x: 12, y: 9.13 }, { x: 7, y: 7.26 }, { x: 5, y: 4.74 },
  ];
  const III: Pt[] = [
    { x: 10, y: 7.46 }, { x: 8, y: 6.77 }, { x: 13, y: 12.74 }, { x: 9, y: 7.11 },
    { x: 11, y: 7.81 }, { x: 14, y: 8.84 }, { x: 6, y: 6.08 }, { x: 4, y: 5.39 },
    { x: 12, y: 8.15 }, { x: 7, y: 6.42 }, { x: 5, y: 5.73 },
  ];
  const IV: Pt[] = [
    { x: 8, y: 6.58 }, { x: 8, y: 5.76 }, { x: 8, y: 7.71 }, { x: 8, y: 8.84 },
    { x: 8, y: 8.47 }, { x: 8, y: 7.04 }, { x: 8, y: 5.25 }, { x: 19, y: 12.50 },
    { x: 8, y: 5.56 }, { x: 8, y: 7.91 }, { x: 8, y: 6.89 },
  ];
  const line = { m: 0.5, b: 3 };
  return (
    <div className="grid grid-cols-2 gap-4">
      <MiniScatter data={I} line={line} title="Set I — doğrusal" />
      <MiniScatter data={II} line={line} title="Set II — eğrisel" />
      <MiniScatter data={III} line={line} title="Set III — aykırı değer" />
      <MiniScatter data={IV} line={line} title="Set IV — kaldıraç noktası" />
    </div>
  );
}

function MiniBar({
  values,
  labels,
  color = "#ef4444",
  title,
  width = 220,
  height = 130,
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
        <line
          x1={pad}
          y1={height - pad}
          x2={width - pad}
          y2={height - pad}
          stroke="#475569"
          strokeWidth={1}
        />
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
  width = 220,
  height = 130,
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
        <line
          x1={pad}
          y1={height - pad}
          x2={width - pad}
          y2={height - pad}
          stroke="#475569"
          strokeWidth={1}
        />
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

function MiniPie({
  values,
  colors,
  title,
  width = 220,
  height = 130,
}: {
  values: number[];
  colors: string[];
  title: string;
  width?: number;
  height?: number;
}) {
  const cx = width / 2;
  const cy = height / 2 + 4;
  const r = 48;
  const total = values.reduce((a, b) => a + b, 0);
  let acc = -Math.PI / 2;
  return (
    <div className="vg-chart-frame">
      <div className="text-[10px] text-gray-400 mb-1 font-mono">{title}</div>
      <svg width={width} height={height} className="block">
        {values.map((v, i) => {
          const ang = (v / total) * Math.PI * 2;
          const x1 = cx + r * Math.cos(acc);
          const y1 = cy + r * Math.sin(acc);
          const x2 = cx + r * Math.cos(acc + ang);
          const y2 = cy + r * Math.sin(acc + ang);
          const large = ang > Math.PI ? 1 : 0;
          const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
          acc += ang;
          return <path key={i} d={path} fill={colors[i % colors.length]} stroke="#0a0a0a" strokeWidth={1} />;
        })}
      </svg>
    </div>
  );
}

function MiniScatterSimple({
  title,
  color = "#ef4444",
  width = 220,
  height = 130,
}: {
  title: string;
  color?: string;
  width?: number;
  height?: number;
}) {
  const pts: Pt[] = [
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

function MiniHeatmap({
  title,
  width = 220,
  height = 130,
}: {
  title: string;
  width?: number;
  height?: number;
}) {
  const rows = 5;
  const cols = 8;
  const pad = 12;
  const cw = (width - 2 * pad) / cols;
  const ch = (height - 2 * pad) / rows;
  const data = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => (Math.sin(r * 0.9 + c * 0.7) + 1) / 2)
  );
  return (
    <div className="vg-chart-frame">
      <div className="text-[10px] text-gray-400 mb-1 font-mono">{title}</div>
      <svg width={width} height={height} className="block">
        {data.map((row, r) =>
          row.map((v, c) => {
            const red = Math.round(255 - v * 80);
            const grn = Math.round(80 - v * 60);
            const blu = Math.round(80 - v * 60);
            return (
              <rect
                key={`${r}-${c}`}
                x={pad + c * cw}
                y={pad + r * ch}
                width={cw - 1}
                height={ch - 1}
                fill={`rgb(${red},${grn},${blu})`}
                opacity={0.4 + v * 0.6}
              />
            );
          })
        )}
      </svg>
    </div>
  );
}

function MiniTreemap({
  title,
  width = 220,
  height = 130,
}: {
  title: string;
  width?: number;
  height?: number;
}) {
  // Simple fixed treemap layout
  const cells: Array<{ x: number; y: number; w: number; h: number; c: string; label: string }> = [
    { x: 0, y: 0, w: 0.55, h: 1, c: "#ef4444", label: "A" },
    { x: 0.55, y: 0, w: 0.45, h: 0.5, c: "#f59e0b", label: "B" },
    { x: 0.55, y: 0.5, w: 0.25, h: 0.5, c: "#fbbf24", label: "C" },
    { x: 0.8, y: 0.5, w: 0.2, h: 0.3, c: "#fb923c", label: "D" },
    { x: 0.8, y: 0.8, w: 0.2, h: 0.2, c: "#fca5a5", label: "E" },
  ];
  const pad = 10;
  const W = width - 2 * pad;
  const H = height - 2 * pad - 12;
  return (
    <div className="vg-chart-frame">
      <div className="text-[10px] text-gray-400 mb-1 font-mono">{title}</div>
      <svg width={width} height={height} className="block">
        {cells.map((c, i) => (
          <g key={i}>
            <rect
              x={pad + c.x * W}
              y={pad + 12 + c.y * H}
              width={c.w * W - 2}
              height={c.h * H - 2}
              fill={c.c}
              opacity={0.85}
            />
            <text
              x={pad + c.x * W + 4}
              y={pad + 12 + c.y * H + 12}
              fill="#0a0a0a"
              fontSize={10}
              fontWeight={700}
            >
              {c.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function ChartTypeGallery() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div>
        <MiniBar values={[3, 7, 5, 9, 6]} labels={["A", "B", "C", "D", "E"]} title="Bar — kategori kıyas" />
        <p className="text-[10px] text-gray-500 mt-1 leading-snug px-1">
          Kategorik karşılaştırma için.
        </p>
      </div>
      <div>
        <MiniLine values={[3, 5, 4, 7, 8, 6, 9, 11]} title="Line — zaman serisi" />
        <p className="text-[10px] text-gray-500 mt-1 leading-snug px-1">
          Trend, zaman içinde değişim.
        </p>
      </div>
      <div>
        <MiniPie values={[40, 25, 20, 15]} colors={["#ef4444", "#f59e0b", "#fbbf24", "#fca5a5"]} title="Pie — pay" />
        <p className="text-[10px] text-gray-500 mt-1 leading-snug px-1">
          Sınırlı sayıda parça-bütün.
        </p>
      </div>
      <div>
        <MiniScatterSimple title="Scatter — ilişki" />
        <p className="text-[10px] text-gray-500 mt-1 leading-snug px-1">
          İki değişken arasındaki korelasyon.
        </p>
      </div>
      <div>
        <MiniHeatmap title="Heatmap — yoğunluk" />
        <p className="text-[10px] text-gray-500 mt-1 leading-snug px-1">
          İki boyutlu yoğunluk / matris.
        </p>
      </div>
      <div>
        <MiniTreemap title="Treemap — hiyerarşi" />
        <p className="text-[10px] text-gray-500 mt-1 leading-snug px-1">
          Hiyerarşik orantılı alan.
        </p>
      </div>
    </div>
  );
}

function Bad3DPie({ width = 260, height = 200 }: { width?: number; height?: number }) {
  // Skewed 3D pie ("chartjunk")
  const cx = width / 2;
  const cy = height / 2;
  const rx = 95;
  const ry = 38;
  const depth = 24;
  const slices = [
    { v: 30, c: "#ef4444" },
    { v: 25, c: "#f59e0b" },
    { v: 22, c: "#fbbf24" },
    { v: 13, c: "#a78bfa" },
    { v: 10, c: "#60a5fa" },
  ];
  const total = slices.reduce((a, b) => a + b.v, 0);
  let acc = 0;
  return (
    <svg width={width} height={height} className="block mx-auto">
      {/* depth */}
      <ellipse cx={cx} cy={cy + depth} rx={rx} ry={ry} fill="#7f1d1d" opacity={0.5} />
      <rect x={cx - rx} y={cy} width={rx * 2} height={depth} fill="#7f1d1d" opacity={0.5} />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#1a1a1a" />
      {slices.map((s, i) => {
        const ang = (s.v / total) * Math.PI * 2;
        const x1 = cx + rx * Math.cos(acc);
        const y1 = cy + ry * Math.sin(acc);
        const x2 = cx + rx * Math.cos(acc + ang);
        const y2 = cy + ry * Math.sin(acc + ang);
        const large = ang > Math.PI ? 1 : 0;
        const path = `M ${cx} ${cy} L ${x1} ${y1} A ${rx} ${ry} 0 ${large} 1 ${x2} ${y2} Z`;
        acc += ang;
        return <path key={i} d={path} fill={s.c} stroke="#0a0a0a" strokeWidth={1} />;
      })}
      {/* Decorative stripes + drop shadow text */}
      <text x={cx} y={28} textAnchor="middle" fill="#fbbf24" fontSize={14} fontWeight={900}>
        SATIŞ DAĞILIMI!!!
      </text>
    </svg>
  );
}

function GoodHBar({ width = 260, height = 200 }: { width?: number; height?: number }) {
  const data = [
    { l: "Ürün A", v: 30 },
    { l: "Ürün B", v: 25 },
    { l: "Ürün C", v: 22 },
    { l: "Ürün D", v: 13 },
    { l: "Ürün E", v: 10 },
  ];
  const pad = 50;
  const max = Math.max(...data.map((d) => d.v));
  const bh = (height - 40) / data.length - 4;
  return (
    <svg width={width} height={height} className="block mx-auto">
      <text x={pad} y={18} fill="#e5e7eb" fontSize={11} fontWeight={600}>
        Ürünlere göre satış payı (%)
      </text>
      {data.map((d, i) => {
        const w = ((width - pad - 30) * d.v) / max;
        const y = 30 + i * (bh + 4);
        return (
          <g key={i}>
            <text x={pad - 6} y={y + bh / 2 + 3} fill="#94a3b8" fontSize={10} textAnchor="end">
              {d.l}
            </text>
            <rect x={pad} y={y} width={w} height={bh} fill="#ef4444" rx={2} />
            <text x={pad + w + 4} y={y + bh / 2 + 3} fill="#e5e7eb" fontSize={10}>
              {d.v}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function GestaltExample({ kind }: { kind: "proximity" | "similarity" | "continuity" | "closure" | "common-fate" }) {
  const width = 150;
  const height = 90;
  const dots: Pt[] = [];
  if (kind === "proximity") {
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 6; c++) {
        const gap = c >= 3 ? 14 : 0;
        dots.push({ x: 20 + c * 14 + gap, y: 20 + r * 18 });
      }
    }
  }
  return (
    <div className="vg-chart-frame">
      <svg width={width} height={height} className="block">
        {kind === "proximity" &&
          dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={3.5} fill="#ef4444" />)}
        {kind === "similarity" &&
          Array.from({ length: 4 }).flatMap((_, r) =>
            Array.from({ length: 6 }).map((_, c) => {
              const fill = c % 2 === 0 ? "#ef4444" : "#fbbf24";
              return (
                <circle
                  key={`${r}-${c}`}
                  cx={20 + c * 18}
                  cy={15 + r * 18}
                  r={4}
                  fill={fill}
                />
              );
            })
          )}
        {kind === "continuity" && (
          <>
            <path
              d="M 10 70 C 50 10, 100 10, 140 70"
              stroke="#ef4444"
              strokeWidth={2}
              fill="none"
            />
            <path
              d="M 10 20 L 140 70"
              stroke="#fbbf24"
              strokeWidth={2}
              fill="none"
              opacity={0.7}
            />
          </>
        )}
        {kind === "closure" && (
          <>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
              const a = (i / 8) * Math.PI * 2;
              if (i === 2 || i === 6) return null;
              const x1 = 75 + 30 * Math.cos(a);
              const y1 = 45 + 30 * Math.sin(a);
              const x2 = 75 + 30 * Math.cos(a + 0.4);
              const y2 = 45 + 30 * Math.sin(a + 0.4);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#ef4444"
                  strokeWidth={3}
                  strokeLinecap="round"
                />
              );
            })}
          </>
        )}
        {kind === "common-fate" && (
          <>
            {Array.from({ length: 5 }).map((_, i) => (
              <g key={i}>
                <circle cx={20 + i * 25} cy={30} r={4} fill="#ef4444" />
                <line
                  x1={20 + i * 25}
                  y1={30}
                  x2={20 + i * 25 + 8}
                  y2={50}
                  stroke="#ef4444"
                  strokeWidth={1.5}
                  markerEnd="url(#arr)"
                />
              </g>
            ))}
            {Array.from({ length: 3 }).map((_, i) => (
              <circle key={`s-${i}`} cx={40 + i * 25} cy={70} r={4} fill="#94a3b8" />
            ))}
            <defs>
              <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#ef4444" />
              </marker>
            </defs>
          </>
        )}
      </svg>
    </div>
  );
}

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
      <div className="flex h-8 rounded overflow-hidden mb-2">
        {colors.map((c, i) => (
          <div key={i} className="flex-1" style={{ background: c }} />
        ))}
      </div>
      <div className="text-[11px] text-gray-400 leading-snug">{desc}</div>
    </div>
  );
}

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

function TableauDashboardMock() {
  return (
    <WindowChrome title="Tableau · Q4 Satış Panosu" badge="T">
      <div className="vg-dash p-3 grid grid-cols-12 gap-2" style={{ minHeight: 320 }}>
        {/* KPI row */}
        <div className="vg-dash-tile col-span-3">
          <div className="text-[9px] text-gray-400 uppercase">Toplam Gelir</div>
          <div className="text-2xl font-bold text-white mt-1">₺4.82M</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">▲ %12.4 YoY</div>
        </div>
        <div className="vg-dash-tile col-span-3">
          <div className="text-[9px] text-gray-400 uppercase">Sipariş</div>
          <div className="text-2xl font-bold text-white mt-1">12.345</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">▲ %8.1</div>
        </div>
        <div className="vg-dash-tile-amber col-span-3">
          <div className="text-[9px] text-gray-400 uppercase">İade Oranı</div>
          <div className="text-2xl font-bold text-white mt-1">%3.2</div>
          <div className="text-[10px] text-rose-400 mt-0.5">▼ hedef %2</div>
        </div>
        <div className="vg-dash-tile col-span-3">
          <div className="text-[9px] text-gray-400 uppercase">NPS</div>
          <div className="text-2xl font-bold text-white mt-1">62</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">▲ 5 puan</div>
        </div>

        {/* Charts row */}
        <div className="vg-dash-tile col-span-7">
          <div className="text-[10px] text-gray-400 mb-1">Aylık Gelir (₺ bin)</div>
          <MiniLine
            values={[210, 240, 290, 270, 330, 360, 410, 380, 450, 470, 510, 560]}
            title=""
            width={460}
            height={140}
            color="#ef4444"
          />
        </div>
        <div className="vg-dash-tile col-span-5">
          <div className="text-[10px] text-gray-400 mb-1">Kategori Payı</div>
          <MiniBar
            values={[58, 42, 30, 22]}
            labels={["Tek.", "Giy.", "Gıda", "Diğ."]}
            title=""
            width={260}
            height={140}
            color="#fbbf24"
          />
        </div>

        {/* World region */}
        <div className="vg-dash-tile col-span-12">
          <div className="text-[10px] text-gray-400 mb-1">Bölgesel Dağılım</div>
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-rose-400" />
            <div className="flex gap-1 flex-1">
              {[
                { l: "MAR", v: 0.9 }, { l: "EGE", v: 0.7 }, { l: "İÇA", v: 0.4 },
                { l: "AKD", v: 0.55 }, { l: "KDN", v: 0.3 }, { l: "GDA", v: 0.25 }, { l: "DAN", v: 0.18 },
              ].map((r, i) => (
                <div key={i} className="flex-1 text-center">
                  <div
                    className="h-2 rounded-sm"
                    style={{ background: `rgba(239, 68, 68, ${0.2 + r.v * 0.8})` }}
                  />
                  <div className="text-[9px] text-gray-500 mt-1">{r.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </WindowChrome>
  );
}

function PythonCodeBlock() {
  return (
    <div className="vg-code">
      <div><span className="cm"># İlk bar chart — matplotlib</span></div>
      <div><span className="kw">import</span> matplotlib.pyplot <span className="kw">as</span> plt</div>
      <div className="mt-2">x <span className="op">=</span> [<span className="str">&quot;A&quot;</span>, <span className="str">&quot;B&quot;</span>, <span className="str">&quot;C&quot;</span>, <span className="str">&quot;D&quot;</span>, <span className="str">&quot;E&quot;</span>]</div>
      <div>y <span className="op">=</span> [<span className="num">12</span>, <span className="num">19</span>, <span className="num">8</span>, <span className="num">15</span>, <span className="num">22</span>]</div>
      <div className="mt-2">plt.<span className="fn">bar</span>(x, y, color<span className="op">=</span><span className="str">&quot;#ef4444&quot;</span>)</div>
      <div>plt.<span className="fn">title</span>(<span className="str">&quot;Aylık Satış&quot;</span>)</div>
      <div>plt.<span className="fn">xlabel</span>(<span className="str">&quot;Ürün&quot;</span>)</div>
      <div>plt.<span className="fn">ylabel</span>(<span className="str">&quot;Adet&quot;</span>)</div>
      <div>plt.<span className="fn">show</span>()</div>
    </div>
  );
}

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ─────────────────  1. COVER  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2107 · 1. Hafta</Eyebrow>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.02]">
          <span className="vg-shimmer">Veri Görselleştirme</span>
        </h1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Veri konuşur; grafik onu duyurur.
        </Sub>
        <div className="mt-12 grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { name: "Tableau", desc: "Sürükle-bırak panolar", icon: BarChart3 },
            { name: "Power BI", desc: "Microsoft ekosistemi", icon: Activity },
            { name: "Python", desc: "matplotlib · seaborn", icon: Code2 },
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

  /* ─────────────────  2. DÖNEM MAP  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Dönem Yol Haritası</Eyebrow>
      <H2>15 hafta · veriden hikâyeye</H2>
      <Sub className="mt-3 max-w-3xl">
        Bu dönem ham sayılardan etkileşimli panolara uzanan bir yolculuk.
      </Sub>
      <div className="mt-10 grid grid-cols-3 gap-3">
        {[
          { w: "1", t: "Görselleştirmeye Giriş", on: true },
          { w: "2", t: "Popüler Araçlara Bakış" },
          { w: "3", t: "Tableau Temelleri" },
          { w: "4", t: "Power BI Temelleri" },
          { w: "5", t: "Veri Hazırlama (ETL)" },
          { w: "6", t: "Renk & Tipografi" },
          { w: "7", t: "Grafik Türleri Derin" },
          { w: "8", t: "Ara Sınav" },
          { w: "9", t: "Etkileşim & Filtreler" },
          { w: "10", t: "Dashboard Tasarımı" },
          { w: "11", t: "Coğrafi Görselleştirme" },
          { w: "12", t: "Storytelling" },
          { w: "13", t: "Python Görselleştirme" },
          { w: "14", t: "Proje Sunumları" },
          { w: "15", t: "Final Tekrarı" },
        ].map((w, i) => (
          <motion.div
            key={w.w}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
            className={`rounded-lg p-3 flex items-center gap-3 ${
              w.on ? "border border-[#ef4444] bg-[#ef4444]/10" : "vg-card"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold ${
                w.on ? "bg-[#ef4444] text-white" : "bg-white/5 text-gray-400"
              }`}
            >
              {w.w}
            </div>
            <div className="text-[12px] text-gray-200">{w.t}</div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3. STATS  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Neden bu kadar önemli?</Eyebrow>
      <H2>Beyin görseli, metinden farklı işler</H2>
      <Sub className="mt-3 max-w-3xl">
        Görsel kortikal işleme yıllarca süren araştırmaların gösterdiği gibi olağanüstü hızlıdır.
      </Sub>
      <div className="mt-10 grid grid-cols-4 gap-4">
        <StatCard
          icon={Brain}
          value="13 ms"
          label="Beynin bir görseli işleme süresi"
          source="MIT, Potter et al. 2014"
          delay={0.05}
        />
        <StatCard
          icon={Zap}
          value="60.000×"
          label="Görselin metne göre işlenme hızı"
          source="3M / Visual Teaching Alliance"
          delay={0.15}
          accent="#f59e0b"
        />
        <StatCard
          icon={Eye}
          value="%80"
          label="Çevreden alınan bilginin görsel oranı"
          source="Rosenholtz, 2016"
          delay={0.25}
        />
        <StatCard
          icon={Calendar}
          value="1854"
          label="John Snow · kolera haritası, modern viz başlangıcı"
          source="Broad Street, Londra"
          delay={0.35}
          accent="#f59e0b"
        />
      </div>
      <p className="mt-8 text-sm text-gray-500 max-w-3xl">
        Veri görselleştirme, beynin doğal işleme avantajını kullanır: bir tablonun ezberini
        gerektirmeden örüntüyü <span className="text-[#ef4444] font-semibold">tek bakışta</span> aktarır.
      </p>
    </SlideShell>
  ),

  /* ─────────────────  4. QUOTE — TUKEY  ───────────────── */
  () => (
    <QuoteSlide
      quote="Bir grafiğin en büyük değeri, hiç beklemediğimiz bir şeyi görmemizi sağlamasıdır."
      author="John W. Tukey"
      role="Princeton · Keşifsel Veri Analizi'nin (EDA) babası, 1977"
    />
  ),

  /* ─────────────────  5. SECTION 1 — NEDEN  ───────────────── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Neden Görselleştirme?"
      subtitle="Aynı istatistik, çok farklı hikâyeler anlatabilir. Önce bunu görelim."
      bgGradient="linear-gradient(135deg, #ef4444, #b91c1c)"
      shadow="0 25px 60px -15px rgba(239, 68, 68, 0.6)"
      icon={<BarChart3 className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  6. ANSCOMBE  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Anscombe Quartet · 1973</Eyebrow>
      <H2>Sayılar aynı, hikâye farklı</H2>
      <Sub className="mt-3 max-w-3xl">
        Dört veri kümesinin de ortalaması, varyansı, korelasyonu ve regresyon doğrusu
        neredeyse aynı — ama çizdiğinizde tamamen başka örüntüler çıkar.
      </Sub>
      <div className="mt-8 grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <AnscombeQuartet />
        </div>
        <div className="vg-card rounded-xl p-5">
          <div className="text-xs font-mono text-[#ef4444] mb-3">ORTAK İSTATİSTİK</div>
          <div className="space-y-2 text-xs text-gray-300">
            <div className="flex justify-between"><span>x̄</span><span className="font-mono">9.00</span></div>
            <div className="flex justify-between"><span>ȳ</span><span className="font-mono">7.50</span></div>
            <div className="flex justify-between"><span>Var(x)</span><span className="font-mono">11.00</span></div>
            <div className="flex justify-between"><span>Var(y)</span><span className="font-mono">4.12</span></div>
            <div className="flex justify-between"><span>r(x, y)</span><span className="font-mono">0.816</span></div>
            <div className="flex justify-between"><span>y = ax+b</span><span className="font-mono">0.5x+3</span></div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 text-[11px] text-gray-400 leading-snug">
            Yalnız özet sayılara bakmak yanıltır. Önce <span className="text-[#ef4444] font-semibold">çiz</span>, sonra modelle.
          </div>
        </div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  7. BAD vs GOOD  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Tufte · Data-Ink Ratio</Eyebrow>
      <H2>Az mürekkep, çok bilgi</H2>
      <Sub className="mt-3 max-w-3xl">
        Aynı verinin iki sunumu: solda süs (chartjunk), sağda bilgi.
      </Sub>
      <div className="mt-8 grid grid-cols-2 gap-6">
        <div className="vg-card rounded-xl p-4 border-2 border-red-500/30">
          <div className="flex items-center gap-2 mb-3">
            <X className="w-5 h-5 text-rose-400" />
            <span className="text-sm font-semibold text-rose-300">Kaçınılması gereken</span>
          </div>
          <Bad3DPie />
          <ul className="mt-3 text-[11px] text-gray-400 space-y-1">
            <li>· 3D perspektif oranları çarpıtır</li>
            <li>· Tüm dikkat süs ve renge gider</li>
            <li>· Dilim büyüklüğü kıyaslanamaz</li>
          </ul>
        </div>
        <div className="vg-card rounded-xl p-4 border-2 border-emerald-500/30">
          <div className="flex items-center gap-2 mb-3">
            <Check className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-300">Önerilen</span>
          </div>
          <GoodHBar />
          <ul className="mt-3 text-[11px] text-gray-400 space-y-1">
            <li>· Sıralanmış yatay bar — hızlı kıyas</li>
            <li>· Eksen, etiket, sayı: hepsi okunaklı</li>
            <li>· &quot;Veri olmayan mürekkep&quot; minimum</li>
          </ul>
        </div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  8. CHART GALLERY  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Grafik Türleri</Eyebrow>
      <H2>Doğru veri · doğru şekil</H2>
      <Sub className="mt-3 max-w-3xl">
        Her grafik bir soruya cevap verir. Önce soruyu, sonra şekli seçin.
      </Sub>
      <div className="mt-8">
        <ChartTypeGallery />
      </div>
      <p className="mt-6 text-xs text-gray-500 text-center font-mono">
        Kategorik kıyas → Bar · Zamansal trend → Line · Pay → Pie (≤ 5 dilim) · İlişki → Scatter · Yoğunluk → Heatmap · Hiyerarşi → Treemap
      </p>
    </SlideShell>
  ),

  /* ─────────────────  9. SECTION 2 — TASARIM  ───────────────── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Tasarım İlkeleri"
      subtitle="Tufte, Gestalt ve renk teorisi — etkili grafiğin üç temel direği."
      bgGradient="linear-gradient(135deg, #f59e0b, #b45309)"
      shadow="0 25px 60px -15px rgba(245, 158, 11, 0.6)"
      icon={<Palette className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  10. TUFTE 5  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Edward Tufte · 5 İlke</Eyebrow>
      <H2>Mükemmel grafiğin anatomisi</H2>
      <Sub className="mt-3 max-w-3xl">
        &quot;The Visual Display of Quantitative Information&quot; (1983) — bugün hâlâ standart.
      </Sub>
      <div className="mt-8 grid grid-cols-3 gap-4">
        <FeatureCard
          icon={Wand2}
          title="Data-ink ratio"
          desc="Mürekkebin maksimumu veriyi göstersin; süs minimumda kalsın."
          delay={0.05}
        />
        <FeatureCard
          icon={X}
          title="Chartjunk yok"
          desc="3D, gölge, gradyan, ızgara — bilgi katmıyorsa silin."
          delay={0.1}
          accent="#f59e0b"
        />
        <FeatureCard
          icon={Layers}
          title="Çok işlevli öğeler"
          desc="Bir öğe birden çok bilgi taşısın (renk + boyut + konum)."
          delay={0.15}
        />
        <FeatureCard
          icon={Gauge}
          title="Yüksek veri yoğunluğu"
          desc="Aynı alanda mümkün olduğunca çok anlamlı veri noktası."
          delay={0.2}
          accent="#f59e0b"
        />
        <FeatureCard
          icon={Target}
          title="Mikro / makro okuma"
          desc="Uzaktan örüntü, yakından detay — iki ölçek tek görselde."
          delay={0.25}
        />
        <FeatureCard
          icon={Lightbulb}
          title="Bonus · doğruluk"
          desc="Hiçbir görsel veriyi çarpıtmamalı. Eksen sıfırdan başlasın."
          delay={0.3}
          accent="#f59e0b"
        />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  11. GESTALT  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Gestalt Prensipleri</Eyebrow>
      <H2>Beyin örüntüyü kendisi tamamlar</H2>
      <Sub className="mt-3 max-w-3xl">
        Bir grafiği &quot;okumadan&quot; önce gözünüz onu gruplar. Bu refleksleri tasarımda kullanın.
      </Sub>
      <div className="mt-8 grid grid-cols-5 gap-3">
        {[
          { k: "proximity" as const, t: "Yakınlık", d: "Yakın olanlar grup." },
          { k: "similarity" as const, t: "Benzerlik", d: "Aynı renk · aynı kategori." },
          { k: "continuity" as const, t: "Devamlılık", d: "Göz akıcı çizgiyi izler." },
          { k: "closure" as const, t: "Kapanım", d: "Eksik şekli beyin tamamlar." },
          { k: "common-fate" as const, t: "Ortak hareket", d: "Birlikte hareket eden grup." },
        ].map((g, i) => (
          <motion.div
            key={g.k}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="vg-card rounded-xl p-3"
          >
            <GestaltExample kind={g.k} />
            <div className="mt-2 text-sm font-semibold text-white">{g.t}</div>
            <div className="text-[11px] text-gray-400 mt-0.5 leading-snug">{g.d}</div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  12. RENK TEORİSİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Renk Paletleri</Eyebrow>
      <H2>Renk · ifade ettiğin veriye uysun</H2>
      <Sub className="mt-3 max-w-3xl">
        Yanlış palet yanlış mesaj demek. Önce verinin türünü belirleyin, sonra paleti.
      </Sub>
      <div className="mt-8 grid grid-cols-3 gap-4">
        <ColorPaletteStrip
          label="Sequential — sıralı"
          colors={["#fff7ed", "#fed7aa", "#fdba74", "#fb923c", "#f97316", "#ea580c", "#c2410c"]}
          desc="Sürekli, tek yönlü büyüklük (gelir, sıcaklık, yoğunluk)."
        />
        <ColorPaletteStrip
          label="Diverging — iki uçlu"
          colors={["#1e3a8a", "#3b82f6", "#93c5fd", "#f3f4f6", "#fca5a5", "#ef4444", "#7f1d1d"]}
          desc="İki uç ve nötr orta nokta (kâr/zarar, +/− sapma)."
        />
        <ColorPaletteStrip
          label="Categorical — kategorik"
          colors={["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6"]}
          desc="Sırasız sınıflar (ürün grupları, bölgeler)."
        />
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="vg-card rounded-lg p-3 text-xs text-gray-300">
          <span className="text-[#ef4444] font-semibold">Kural 1:</span> Sıralı veriye categorical palet uygulamayın.
        </div>
        <div className="vg-card rounded-lg p-3 text-xs text-gray-300">
          <span className="text-[#f59e0b] font-semibold">Kural 2:</span> 7+ kategoride renkle değil etiketle ayırın.
        </div>
        <div className="vg-card rounded-lg p-3 text-xs text-gray-300">
          <span className="text-[#ef4444] font-semibold">Kural 3:</span> Renge anlam ekleyin (kırmızı = düşüş, yeşil = artış).
        </div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  13. COLOR BLINDNESS  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Erişilebilirlik</Eyebrow>
      <H2>Her 12 erkekten biri kırmızı-yeşili karıştırır</H2>
      <Sub className="mt-3 max-w-3xl">
        Aynı grafik üç farklı görme tipinde nasıl görünür? Renkle birlikte şekil/etiket de kullanın.
      </Sub>
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div>
          <div className="text-xs text-gray-400 mb-2 text-center font-mono">Normal görüş</div>
          <ColorBlindBar
            palette={["#ef4444", "#22c55e", "#3b82f6", "#f59e0b", "#a855f7"]}
            title="Çeyrek satışları"
          />
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-2 text-center font-mono">Deuteranopia (~%6 erkek)</div>
          <ColorBlindBar
            palette={["#9a8b3a", "#a39b4a", "#3b82f6", "#c9a55a", "#a855f7"]}
            title="Aynı veri"
          />
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-2 text-center font-mono">Protanopia (~%1 erkek)</div>
          <ColorBlindBar
            palette={["#796b3a", "#9c9544", "#3b82f6", "#b5a14a", "#a855f7"]}
            title="Aynı veri"
          />
        </div>
      </div>
      <div className="mt-6 vg-card rounded-lg p-4 text-sm text-gray-300 flex items-start gap-3">
        <Eye className="w-5 h-5 text-[#ef4444] mt-0.5 shrink-0" />
        <div>
          <span className="text-white font-semibold">Pratik öneri:</span> Sadece renge güvenmeyin.
          Şekil, kalıp veya direkt etiket ekleyin. Coblis, Sim Daltonism gibi araçlarla test edin.
        </div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  14. SECTION 3 — ARAÇLAR  ───────────────── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Modern Araçlar"
      subtitle="İlkeleri bilenler için araç çoğalır. Üç popüler ekosisteme hızlı bir bakış."
      bgGradient="linear-gradient(135deg, #ef4444, #f59e0b)"
      shadow="0 25px 60px -15px rgba(239, 68, 68, 0.55)"
      icon={<Sparkles className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  15. TABLEAU MOCKUP  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Tableau · Pano Örneği</Eyebrow>
      <H2>Bir gerçek panonun mimarisi</H2>
      <Sub className="mt-3 max-w-3xl">
        Üst sırada KPI özetleri, orta sırada trend ve dağılım, alt sırada coğrafi bağlam.
      </Sub>
      <div className="mt-8">
        <TableauDashboardMock />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  16. PYTHON CODE  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Python · matplotlib</Eyebrow>
      <H2>Sekiz satır kod, bir bar chart</H2>
      <Sub className="mt-3 max-w-3xl">
        Tableau&apos;suz, lisanssız, açık kaynak. Veri bilimcinin günlük aracı.
      </Sub>
      <div className="mt-8 grid grid-cols-2 gap-6 items-center">
        <PythonCodeBlock />
        <div>
          <div className="text-xs text-gray-500 mb-2 text-center font-mono">→ render edilmiş çıktı</div>
          <MiniBar
            values={[12, 19, 8, 15, 22]}
            labels={["A", "B", "C", "D", "E"]}
            title="Aylık Satış"
            width={320}
            height={220}
          />
        </div>
      </div>
      <p className="mt-6 text-xs text-gray-500 text-center">
        Hafta 13&apos;te Python görselleştirmeyi daha derin işleyeceğiz: seaborn, plotly, interaktif notebook&apos;lar.
      </p>
    </SlideShell>
  ),

  /* ─────────────────  17. COMPARISON TABLE  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Araç Karşılaştırması</Eyebrow>
      <H2>Hangi araç · ne zaman?</H2>
      <Sub className="mt-3 max-w-3xl">
        Tek doğru cevap yok. İş bağlamı, ekip ve bütçe seçimi belirler.
      </Sub>
      <div className="mt-8 vg-card rounded-xl p-4">
        <table className="vg-table">
          <thead>
            <tr>
              <th>Araç</th>
              <th>Kolaylık</th>
              <th>Esneklik</th>
              <th>Fiyat</th>
              <th>Ekip Paylaşımı</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold text-white">Tableau</td>
              <td><span className="vg-pill vg-pill-good">Yüksek</span></td>
              <td><span className="vg-pill vg-pill-mid">Orta</span></td>
              <td><span className="vg-pill vg-pill-bad">Pahalı</span> · $75/ay</td>
              <td><span className="vg-pill vg-pill-good">Tableau Server / Cloud</span></td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Power BI</td>
              <td><span className="vg-pill vg-pill-good">Yüksek</span></td>
              <td><span className="vg-pill vg-pill-mid">Orta</span></td>
              <td><span className="vg-pill vg-pill-mid">Uygun</span> · $10/ay</td>
              <td><span className="vg-pill vg-pill-good">Microsoft 365 entegre</span></td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Python (matplotlib/seaborn/plotly)</td>
              <td><span className="vg-pill vg-pill-bad">Düşük</span> · kod gerekir</td>
              <td><span className="vg-pill vg-pill-good">Çok yüksek</span></td>
              <td><span className="vg-pill vg-pill-good">Ücretsiz</span></td>
              <td><span className="vg-pill vg-pill-mid">Notebook / Streamlit</span></td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Excel</td>
              <td><span className="vg-pill vg-pill-good">Çok yüksek</span></td>
              <td><span className="vg-pill vg-pill-bad">Sınırlı</span></td>
              <td><span className="vg-pill vg-pill-mid">M365 ile gelir</span></td>
              <td><span className="vg-pill vg-pill-mid">Dosya paylaşımı</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-xs text-gray-500 text-center font-mono">
        Bu dönem: Tableau Public (ücretsiz) + Excel · Hafta 13&apos;te Python.
      </div>
    </SlideShell>
  ),

  /* ─────────────────  18. CHECKLIST  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu Hafta Yapılacaklar</Eyebrow>
      <H2>Eve ödev · 6 madde</H2>
      <Sub className="mt-3 max-w-3xl">
        Sonraki derse hazır gelmek için bu adımları tamamlayın.
      </Sub>
      <div className="mt-8 grid grid-cols-2 gap-4">
        {[
          { t: "Tableau Public&apos;i ücretsiz indir ve kur", d: "public.tableau.com — Mac/Win, hesap aç." },
          { t: "Kendi 1. dönem not ortalamanı CSV&apos;ye gir", d: "Sütunlar: ders, kredi, harf, AGNO." },
          { t: "Tableau&apos;da ilk yatay bar chart&apos;ını oluştur", d: "Dersler × notlar. Renge anlam ver." },
          { t: "&quot;Bir grafiği iyileştir&quot; mini ödevi", d: "Bir gazete grafiğini bul, kötü/iyi yorumla." },
          { t: "X&apos;te (Twitter) #DataViz takip et", d: "@TableauMag · @datavizdone · @observablehq." },
          { t: "Storytelling with Data — bölüm 1 oku", d: "Cole Knaflic · 30 sayfa, Türkçesi var." },
        ].map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="vg-card rounded-lg p-4 flex gap-3"
          >
            <div className="w-7 h-7 rounded-md border border-[#ef4444]/50 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-[#ef4444]" />
            </div>
            <div>
              <div
                className="text-sm font-semibold text-white"
                dangerouslySetInnerHTML={{ __html: it.t }}
              />
              <div
                className="text-[11px] text-gray-400 mt-0.5 leading-snug"
                dangerouslySetInnerHTML={{ __html: it.d }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  19. SIRADAKİ HAFTA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sıradaki Hafta · H2</Eyebrow>
      <H1>
        <span className="vg-shimmer-amber">Popüler Veri Görselleştirme Araçları</span>
      </H1>
      <Sub className="mt-6 max-w-3xl">
        Tableau, Power BI, Looker, Metabase, D3, plotly — her birinin gücü, sınırı ve tipik
        kullanım alanı. Hangi aracı ne zaman seçeceğinizi karar ağacıyla çalışacağız.
      </Sub>
      <div className="mt-10 grid grid-cols-4 gap-3">
        {[
          { i: BarChart3, t: "Tableau" },
          { i: Activity, t: "Power BI" },
          { i: Database, t: "Metabase" },
          { i: Search, t: "Looker" },
          { i: Code2, t: "D3.js" },
          { i: Hash, t: "plotly" },
          { i: Layers, t: "Observable" },
          { i: Grid3x3, t: "Apache Superset" },
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
        <Megaphone className="w-5 h-5 text-[#ef4444]" />
        <span className="text-sm text-gray-300">
          Önceden Tableau Public&apos;i kurup gelmeyenler ders sonunda 15 dakika geride kalır.
        </span>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  20. TEŞEKKÜR  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>Hafta 1 · Tamamlandı</Eyebrow>
        <H1>
          <span className="vg-shimmer">Teşekkürler.</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Veri görselleştirme, sayılara ses verme sanatıdır. Hafta 2&apos;de araçlarla
          ellerimizi kirletmeye başlıyoruz.
        </Sub>
        <div className="mt-12 grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="vg-card rounded-xl p-4">
            <Calendar className="w-5 h-5 text-[#ef4444] mx-auto mb-2" />
            <div className="text-xs text-gray-400">Ders Saati</div>
            <div className="text-sm font-semibold text-white mt-1">Cuma · 11:45–15:10</div>
          </div>
          <div className="vg-card rounded-xl p-4">
            <MapPin className="w-5 h-5 text-[#ef4444] mx-auto mb-2" />
            <div className="text-xs text-gray-400">Sınıf</div>
            <div className="text-sm font-semibold text-white mt-1">EnerjiSA Bilgisayar Lab 1</div>
          </div>
          <div className="vg-card rounded-xl p-4">
            <Mail className="w-5 h-5 text-[#ef4444] mx-auto mb-2" />
            <div className="text-xs text-gray-400">İletişim</div>
            <div className="text-sm font-semibold text-white mt-1">Ofis saatleri · Perş 14:00</div>
          </div>
        </div>
        <div className="mt-12 flex items-center justify-center gap-3 text-xs font-mono text-gray-500">
          <GraduationCap className="w-4 h-4" />
          <span>MCBÜ MYO · BVA 2107 · Veri Görselleştirme · 2025-2026 Bahar</span>
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
          BVA 2107 · 1. Hafta · Görselleştirmeye Giriş
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
