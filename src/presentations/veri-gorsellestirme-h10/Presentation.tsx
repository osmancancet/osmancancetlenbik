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
  ScatterChart,
  TrendingUp,
  Code2,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  X,
  AlertTriangle,
  Table2,
  Tag,
  Ruler,
  Calendar,
  Layers,
  Sparkles,
  Target,
  Activity,
  type LucideIcon,
} from "lucide-react";
import "./styles.css";

/* ============================================================
   PRIMITIVES  (h01 ile birebir aynı)
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
   GRAFİK MOCKUP'LARI  (bu haftanın konusu: bar / line / scatter)
   ============================================================ */

type Pt = { x: number; y: number };

function MiniBar({
  values,
  labels,
  color = "#ef4444",
  title,
  horizontal = false,
  width = 240,
  height = 150,
}: {
  values: number[];
  labels?: string[];
  color?: string;
  title: string;
  horizontal?: boolean;
  width?: number;
  height?: number;
}) {
  const max = Math.max(...values);
  if (horizontal) {
    const padL = 44;
    const padR = 26;
    const bh = (height - 20) / values.length - 6;
    return (
      <div className="vg-chart-frame">
        <div className="text-[10px] text-gray-400 mb-1 font-mono">{title}</div>
        <svg width={width} height={height} className="block">
          {values.map((v, i) => {
            const w = ((width - padL - padR) * v) / max;
            const y = 10 + i * (bh + 6);
            return (
              <g key={i}>
                {labels && (
                  <text x={padL - 6} y={y + bh / 2 + 3} className="vg-axis-label" textAnchor="end">
                    {labels[i]}
                  </text>
                )}
                <rect x={padL} y={y} width={w} height={bh} fill={color} rx={2} />
                <text x={padL + w + 4} y={y + bh / 2 + 3} fill="#e5e7eb" fontSize={9}>
                  {v}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  }
  const pad = 20;
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
                  y={height - pad + 11}
                  className="vg-axis-label"
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
  series,
  labels,
  title,
  width = 240,
  height = 150,
}: {
  series: Array<{ values: number[]; color: string; name?: string }>;
  labels?: string[];
  title: string;
  width?: number;
  height?: number;
}) {
  const pad = 22;
  const all = series.flatMap((s) => s.values);
  const max = Math.max(...all);
  const min = Math.min(...all);
  const n = series[0].values.length;
  const step = (width - 2 * pad) / (n - 1);
  const sx = (i: number) => pad + i * step;
  const sy = (v: number) =>
    height - pad - ((v - min) / (max - min || 1)) * (height - 2 * pad);
  return (
    <div className="vg-chart-frame">
      <div className="text-[10px] text-gray-400 mb-1 font-mono">{title}</div>
      <svg width={width} height={height} className="block">
        <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#475569" />
        <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="#475569" />
        {series.map((s, si) => {
          const pts = s.values.map((v, i) => `${sx(i)},${sy(v)}`).join(" ");
          return (
            <g key={si}>
              <polyline points={pts} fill="none" stroke={s.color} strokeWidth={2} />
              {s.values.map((v, i) => (
                <circle key={i} cx={sx(i)} cy={sy(v)} r={2.5} fill={s.color} />
              ))}
            </g>
          );
        })}
        {labels &&
          labels.map((l, i) => (
            <text key={i} x={sx(i)} y={height - pad + 11} className="vg-axis-label" textAnchor="middle">
              {l}
            </text>
          ))}
      </svg>
    </div>
  );
}

function MiniScatter({
  data,
  line,
  title,
  color = "#f87171",
  width = 240,
  height = 150,
}: {
  data: Pt[];
  line?: { m: number; b: number };
  title: string;
  color?: string;
  width?: number;
  height?: number;
}) {
  const pad = 20;
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
        <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#475569" />
        <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="#475569" />
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
          <circle key={i} cx={sx(d.x)} cy={sy(d.y)} r={3} fill={color} opacity={0.9} />
        ))}
      </svg>
    </div>
  );
}

/* Yatay eksenin sıfırdan başlamamasının çarpıtmasını gösteren karşılaştırma */
function TruncatedAxisDemo() {
  const values = [98, 99, 100, 101, 102];
  const labels = ["Oca", "Şub", "Mar", "Nis", "May"];
  const width = 230;
  const height = 150;
  const pad = 22;
  const bw = (width - 2 * pad) / values.length - 6;

  // Sol: y ekseni 97'den başlar (çarpıtır)
  const tMin = 97;
  const tMax = 103;
  const tH = (v: number) => ((height - 2 * pad) * (v - tMin)) / (tMax - tMin);

  // Sağ: y ekseni 0'dan başlar (dürüst)
  const fMax = 110;

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="vg-chart-frame border border-red-500/30">
        <div className="text-[10px] text-rose-300 mb-1 font-mono">y ekseni 97&apos;den başlıyor</div>
        <svg width={width} height={height} className="block">
          <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#475569" />
          {values.map((v, i) => {
            const h = tH(v);
            return (
              <g key={i}>
                <rect x={pad + i * (bw + 6)} y={height - pad - h} width={bw} height={h} fill="#f87171" rx={2} />
                <text x={pad + i * (bw + 6) + bw / 2} y={height - pad + 11} className="vg-axis-label" textAnchor="middle">
                  {labels[i]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="vg-chart-frame border border-emerald-500/30">
        <div className="text-[10px] text-emerald-300 mb-1 font-mono">y ekseni 0&apos;dan başlıyor</div>
        <svg width={width} height={height} className="block">
          <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#475569" />
          {values.map((v, i) => {
            const h = ((height - 2 * pad) * v) / fMax;
            return (
              <g key={i}>
                <rect x={pad + i * (bw + 6)} y={height - pad - h} width={bw} height={h} fill="#34d399" rx={2} />
                <text x={pad + i * (bw + 6) + bw / 2} y={height - pad + 11} className="vg-axis-label" textAnchor="middle">
                  {labels[i]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function PythonChartsBlock() {
  return (
    <div className="vg-code">
      <div><span className="cm"># Üç temel grafik — matplotlib</span></div>
      <div><span className="kw">import</span> matplotlib.pyplot <span className="kw">as</span> plt</div>
      <div className="mt-2"><span className="cm"># 1) Çubuk grafik — kategori karşılaştırma</span></div>
      <div>plt.<span className="fn">bar</span>(urunler, satislar, color<span className="op">=</span><span className="str">&quot;#ef4444&quot;</span>)</div>
      <div className="mt-2"><span className="cm"># 2) Çizgi grafik — zaman serisi</span></div>
      <div>plt.<span className="fn">plot</span>(aylar, gelir, marker<span className="op">=</span><span className="str">&quot;o&quot;</span>)</div>
      <div className="mt-2"><span className="cm"># 3) Dağılım grafiği — iki değişkenli ilişki</span></div>
      <div>plt.<span className="fn">scatter</span>(reklam, satis, alpha<span className="op">=</span><span className="num">0.7</span>)</div>
      <div className="mt-2">plt.<span className="fn">xlabel</span>(<span className="str">&quot;X ekseni&quot;</span>); plt.<span className="fn">ylabel</span>(<span className="str">&quot;Y ekseni&quot;</span>)</div>
      <div>plt.<span className="fn">title</span>(<span className="str">&quot;Başlık&quot;</span>); plt.<span className="fn">show</span>()</div>
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
        <Eyebrow>BVA 2107 · 10. Hafta</Eyebrow>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.04]">
          <span className="vg-shimmer">Çubuk · Çizgi · Dağılım</span>
        </h1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Üç temel grafik türü: ne zaman hangisi, nasıl doğru çizilir, hangi hatalardan kaçınılır.
        </Sub>
        <div className="mt-12 grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { name: "Çubuk", desc: "Kategori karşılaştırma", icon: BarChart3 },
            { name: "Çizgi", desc: "Zaman içinde değişim", icon: LineChart },
            { name: "Dağılım", desc: "İki değişken arası ilişki", icon: ScatterChart },
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
      <Eyebrow>Köprü · 9. haftadan 10. haftaya</Eyebrow>
      <H2>İlkeleri biliyoruz; artık üç grafiği elimizle kuruyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Önceki haftalarda renk, eksen, veri-mürekkep oranı gibi tasarım ilkelerini konuştuk. Bu hafta
        bu ilkeleri en çok kullanılan üç grafik türüne uyguluyoruz: çubuk, çizgi ve dağılım.
        Her birinin doğru kullanım alanını ve sık yapılan hataları somut örneklerle göreceğiz.
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
            <span className="text-xs font-mono uppercase tracking-widest">Bildiklerimiz</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ef4444] flex-shrink-0" />Veri türü → grafik türü eşleştirmesi.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ef4444] flex-shrink-0" />Renk paletleri ve erişilebilirlik.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ef4444] flex-shrink-0" />Eksen, etiket ve veri-mürekkep oranı.</li>
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
            <span className="text-xs font-mono uppercase tracking-widest">Bu haftanın hedefi</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] flex-shrink-0" />Üç grafik türünü doğru veriyle eşleştirmek.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] flex-shrink-0" />Her birini eksiksiz (eksen + etiket + başlık) çizmek.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] flex-shrink-0" />Yaygın çarpıtma hatalarını tanıyıp önlemek.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 3. DERSİN AKIŞI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: çubuk → çizgi → dağılım</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce hangi soruda hangi grafik sorusunu netleştiriyoruz; sonra her türü tek tek, anatomisi ve
        sık hatalarıyla işliyoruz. Sonunda küçük bir uygulamalı alıştırma.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Çubuk Grafik", items: ["Kategorik karşılaştırma", "Dikey / yatay seçimi", "Sıralı çubuk ve sıfır eksen"], icon: BarChart3, accent: "#ef4444" },
          { range: "02", title: "Çizgi Grafik", items: ["Zaman serisi trendi", "Çoklu seri kıyaslama", "Eksen aralığı tuzakları"], icon: LineChart, accent: "#f59e0b" },
          { range: "03", title: "Dağılım Grafiği", items: ["İki değişken ilişkisi", "Korelasyon ≠ nedensellik", "Trend çizgisi ve aykırı değer"], icon: ScatterChart, accent: "#34d399" },
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

  /* ───── 4. SORU → GRAFİK ───── */
  () => (
    <SlideShell>
      <Eyebrow>Karar · önce soru</Eyebrow>
      <H2>Hangi soru, hangi grafik?</H2>
      <Sub className="mt-3 max-w-3xl">
        Grafik türü seçimi estetik değil, soru meselesidir. Verinizin türünü ve sormak istediğiniz
        soruyu netleştirin; grafik kendiliğinden gelir.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 vg-card rounded-xl p-4"
      >
        <table className="vg-table">
          <thead>
            <tr>
              <th style={{ width: "30%" }}>Soru tipi</th>
              <th style={{ width: "22%" }}>Veri</th>
              <th style={{ width: "20%" }}>Grafik</th>
              <th>Örnek</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white">&quot;Hangi kategori daha büyük?&quot;</td>
              <td>Kategorik + sayısal</td>
              <td><span className="vg-pill vg-pill-bad">Çubuk</span></td>
              <td>Şubelere göre satış adedi</td>
            </tr>
            <tr>
              <td className="text-white">&quot;Zaman içinde nasıl değişti?&quot;</td>
              <td>Sürekli zaman + sayısal</td>
              <td><span className="vg-pill vg-pill-mid">Çizgi</span></td>
              <td>Aylık gelir trendi</td>
            </tr>
            <tr>
              <td className="text-white">&quot;İki değişken ilişkili mi?&quot;</td>
              <td>Sayısal + sayısal</td>
              <td><span className="vg-pill vg-pill-good">Dağılım</span></td>
              <td>Reklam bütçesi ↔ satış</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
      <p className="mt-4 text-xs text-gray-500 text-center font-mono">
        Kategorik kıyas → Çubuk · Zamansal trend → Çizgi · İki sayısal değişken → Dağılım
      </p>
    </SlideShell>
  ),

  /* ───── 5. BÖLÜM 1 — ÇUBUK ───── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="Çubuk Grafik"
      subtitle="Kategorileri karşılaştırmanın en doğrudan yolu. Çubuk uzunluğunu gözle kıyaslamak hızlı ve doğrudur."
      bgGradient="linear-gradient(135deg, #ef4444, #b91c1c)"
      shadow="0 25px 60px -15px rgba(239, 68, 68, 0.6)"
      icon={<BarChart3 className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 6. ÇUBUK ANATOMİSİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Çubuk · anatomi</Eyebrow>
      <H2 className="mb-2">Tablodan çubuğa</H2>
      <Sub className="max-w-3xl mb-6">
        Çubuk grafik, kategorik bir eksene karşılık sayısal yükseklik gösterir. Aynı veri tabloda
        okunması zorken, çubuk olarak tek bakışta sıralanır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="vg-card rounded-xl p-1"
        >
          <table className="vg-table">
            <thead>
              <tr>
                <th>Şube</th>
                <th>Satış (adet)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="text-white">Manisa</td><td className="font-mono">320</td></tr>
              <tr><td className="text-white">İzmir</td><td className="font-mono">510</td></tr>
              <tr><td className="text-white">Aydın</td><td className="font-mono">180</td></tr>
              <tr><td className="text-white">Muğla</td><td className="font-mono">260</td></tr>
              <tr><td className="text-white">Denizli</td><td className="font-mono">400</td></tr>
            </tbody>
          </table>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
        >
          <MiniBar
            values={[320, 510, 180, 260, 400]}
            labels={["Man", "İzm", "Ayd", "Muğ", "Den"]}
            title="Şubelere göre satış (adet)"
            width={320}
            height={200}
          />
          <p className="text-[11px] text-gray-500 mt-2 px-1 leading-snug">
            Kategori ekseninde sıra yok; yükseklik tek anlamlı boyut. Bu yüzden ölçek sıfırdan başlamalı.
          </p>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 7. DİKEY vs YATAY + SIRALAMA ───── */
  () => (
    <SlideShell>
      <Eyebrow>Çubuk · varyasyonlar</Eyebrow>
      <H2>Dikey mi, yatay mı? Sıralı mı?</H2>
      <Sub className="mt-3 max-w-3xl">
        Etiketler uzunsa veya kategori çoksa yatay çubuk daha okunur. Sıralama yapıldığında ise
        kıyaslama anında netleşir.
      </Sub>
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div>
          <MiniBar
            values={[3, 7, 5, 9, 6]}
            labels={["A", "B", "C", "D", "E"]}
            title="Dikey — kısa etiket"
          />
          <p className="text-[11px] text-gray-500 mt-1 px-1 leading-snug">Az kategori, kısa etiket.</p>
        </div>
        <div>
          <MiniBar
            values={[42, 28, 55, 19, 36]}
            labels={["Pazarlama", "Finans", "Üretim", "İK", "Lojistik"]}
            title="Yatay — uzun etiket"
            horizontal
            color="#f59e0b"
          />
          <p className="text-[11px] text-gray-500 mt-1 px-1 leading-snug">Uzun etiket yatayda sığar.</p>
        </div>
        <div>
          <MiniBar
            values={[55, 42, 36, 28, 19]}
            labels={["Üretim", "Pazarlama", "Lojistik", "Finans", "İK"]}
            title="Yatay — sıralı"
            horizontal
            color="#34d399"
          />
          <p className="text-[11px] text-gray-500 mt-1 px-1 leading-snug">Sıralama kıyası kolaylaştırır.</p>
        </div>
      </div>
      <div className="mt-6 vg-card rounded-lg p-3 text-sm text-gray-300 flex items-start gap-3">
        <Layers className="w-5 h-5 text-[#ef4444] mt-0.5 shrink-0" />
        <div>
          <span className="text-white font-semibold">Kural:</span> Kategoriler arasında doğal bir sıra
          (ör. ay, yaş aralığı) yoksa, çubukları değere göre sıralayın.
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 8. ÇUBUK HATASI — KESİK EKSEN ───── */
  () => (
    <SlideShell>
      <Eyebrow>Çubuk · sık hata</Eyebrow>
      <H2>Sıfırdan başlamayan eksen yanıltır</H2>
      <Sub className="mt-3 max-w-3xl">
        Çubuğun anlamı uzunluğudur. Y ekseni sıfırdan başlamazsa, küçük farklar dramatik görünür.
        Aynı veri, iki farklı eksende tamamen farklı bir hikâye anlatır.
      </Sub>
      <div className="mt-8">
        <TruncatedAxisDemo />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="vg-card rounded-lg p-3 text-xs text-gray-300 flex items-start gap-2">
          <X className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
          <span>Solda %4&apos;lük fark, eksen kesildiği için iki katına çıkmış gibi görünüyor.</span>
        </div>
        <div className="vg-card rounded-lg p-3 text-xs text-gray-300 flex items-start gap-2">
          <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
          <span>Sağda sıfırdan başlayan eksen gerçek oranı dürüstçe gösteriyor.</span>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 9. BÖLÜM 2 — ÇİZGİ ───── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Çizgi Grafik"
      subtitle="Zaman içindeki değişimi ve trendi göstermenin standart yolu. Noktalar arasındaki çizgi sürekliliği ima eder."
      bgGradient="linear-gradient(135deg, #f59e0b, #b45309)"
      shadow="0 25px 60px -15px rgba(245, 158, 11, 0.6)"
      icon={<LineChart className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 10. ÇİZGİ — TREND & ÇOKLU SERİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Çizgi · trend ve karşılaştırma</Eyebrow>
      <H2 className="mb-2">Tek seriden çoklu seriye</H2>
      <Sub className="max-w-3xl mb-6">
        Çizgi grafiğin x ekseni sıralı (genellikle zamandır). Tek çizgi bir trendi; birden çok çizgi
        ise seriler arası kıyası gösterir. Çizgiyi yalnızca süreklilik anlamlıysa kullanın.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <MiniLine
            series={[{ values: [210, 240, 230, 290, 320, 360], color: "#f59e0b" }]}
            labels={["Oca", "Şub", "Mar", "Nis", "May", "Haz"]}
            title="Tek seri — aylık gelir trendi"
            width={300}
            height={190}
          />
          <p className="text-[11px] text-gray-500 mt-2 px-1 leading-snug">
            Genel yön yukarı; Şubat-Mart&apos;taki küçük düşüş tek bakışta görünür.
          </p>
        </div>
        <div>
          <MiniLine
            series={[
              { values: [210, 240, 230, 290, 320, 360], color: "#f59e0b" },
              { values: [180, 200, 260, 250, 300, 340], color: "#ef4444" },
              { values: [120, 160, 150, 210, 240, 230], color: "#34d399" },
            ]}
            labels={["Oca", "Şub", "Mar", "Nis", "May", "Haz"]}
            title="Çoklu seri — üç şube"
            width={300}
            height={190}
          />
          <p className="text-[11px] text-gray-500 mt-2 px-1 leading-snug">
            Çizgi sayısını sınırlı tutun; 4-5 seriden sonra okunaklılık düşer.
          </p>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 11. ÇİZGİ HATASI — EKSEN ARALIĞI & KATEGORİK X ───── */
  () => (
    <SlideShell>
      <Eyebrow>Çizgi · sık hata</Eyebrow>
      <H2>İki yaygın tuzak</H2>
      <Sub className="mt-3 max-w-3xl">
        Çizgi grafikte iki hata sıkça tekrarlanır. İkisi de aynı veriyi yanlış okutur.
      </Sub>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="vg-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <Ruler className="w-5 h-5 text-rose-400" />
            <span className="text-sm font-semibold text-rose-300">1. Düzensiz x aralığı</span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            X eksenindeki noktalar eşit aralıklı değilse (ör. 2010, 2011, 2015, 2016), çizginin eğimi
            yanıltır. Eksik zaman noktalarını eşit ölçekte gösterin; aksi hâlde trend hızı çarpık görünür.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="vg-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-5 h-5 text-rose-400" />
            <span className="text-sm font-semibold text-rose-300">2. Kategorik veride çizgi</span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            Şehirleri (Manisa, İzmir, Aydın) çizgiyle bağlamayın. Çizgi süreklilik ima eder; kategoriler
            arasında ise &quot;ara değer&quot; yoktur. Bu durumda çubuk grafik doğru seçimdir.
          </p>
        </motion.div>
      </div>
      <div className="mt-6 vg-card rounded-lg p-3 text-sm text-gray-300 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-[#f59e0b] mt-0.5 shrink-0" />
        <div>
          <span className="text-white font-semibold">Özet:</span> Çizgi yalnızca x ekseni sıralı ve
          sürekli (zaman gibi) olduğunda anlamlıdır.
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 12. BÖLÜM 3 — DAĞILIM ───── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Dağılım Grafiği"
      subtitle="İki sayısal değişken arasındaki ilişkiyi gösterir. Her nokta bir gözlem; bulutun şekli ilişkiyi ele verir."
      bgGradient="linear-gradient(135deg, #22c55e, #15803d)"
      shadow="0 25px 60px -15px rgba(34, 197, 94, 0.55)"
      icon={<ScatterChart className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 13. DAĞILIM — KORELASYON TÜRLERİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Dağılım · ilişki türleri</Eyebrow>
      <H2 className="mb-2">Bulutun şekli ilişkiyi söyler</H2>
      <Sub className="max-w-3xl mb-6">
        Noktaların dizilişi iki değişken arasındaki ilişkinin yönünü ve gücünü gösterir. Trend çizgisi
        (regresyon) bu eğilimi özetler ama her zaman gereken bir şey değildir.
      </Sub>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <MiniScatter
            data={[
              { x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 5 }, { x: 4, y: 5 },
              { x: 5, y: 7 }, { x: 6, y: 8 }, { x: 7, y: 9 }, { x: 8, y: 11 },
            ]}
            line={{ m: 1.2, b: 0.8 }}
            title="Pozitif ilişki"
          />
          <p className="text-[11px] text-gray-500 mt-1 px-1 leading-snug">X arttıkça Y artıyor.</p>
        </div>
        <div>
          <MiniScatter
            data={[
              { x: 1, y: 11 }, { x: 2, y: 9 }, { x: 3, y: 9 }, { x: 4, y: 7 },
              { x: 5, y: 6 }, { x: 6, y: 5 }, { x: 7, y: 3 }, { x: 8, y: 2 },
            ]}
            line={{ m: -1.2, b: 12 }}
            title="Negatif ilişki"
            color="#fbbf24"
          />
          <p className="text-[11px] text-gray-500 mt-1 px-1 leading-snug">X arttıkça Y azalıyor.</p>
        </div>
        <div>
          <MiniScatter
            data={[
              { x: 1, y: 6 }, { x: 2, y: 9 }, { x: 3, y: 3 }, { x: 4, y: 8 },
              { x: 5, y: 4 }, { x: 6, y: 10 }, { x: 7, y: 5 }, { x: 8, y: 7 },
            ]}
            title="İlişki yok"
            color="#34d399"
          />
          <p className="text-[11px] text-gray-500 mt-1 px-1 leading-snug">Belirgin bir örüntü yok.</p>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 14. DAĞILIM — KORELASYON ≠ NEDENSELLİK ───── */
  () => (
    <SlideShell>
      <Eyebrow>Dağılım · yorum tuzağı</Eyebrow>
      <H2 className="mb-2">Korelasyon, nedensellik değildir</H2>
      <Sub className="max-w-3xl mb-6">
        İki değişken birlikte değişiyorsa biri diğerinin sebebi olmayabilir. Aykırı bir değer (outlier)
        de trend çizgisini tek başına kaydırabilir. Dağılım grafiğini her zaman bağlamla okuyun.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <MiniScatter
            data={[
              { x: 2, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 6 },
              { x: 6, y: 5 }, { x: 7, y: 7 }, { x: 8, y: 8 }, { x: 14, y: 2 },
            ]}
            line={{ m: 0.3, b: 3.5 }}
            title="Tek aykırı değer trendi büker"
            width={300}
            height={190}
          />
        </div>
        <div className="space-y-3">
          <div className="vg-card rounded-lg p-4 text-sm text-gray-300 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#34d399] mt-0.5 shrink-0" />
            <span>
              <span className="text-white font-semibold">Aykırı değer:</span> Sağ alttaki tek nokta
              regresyon doğrusunu aşağı çeker. Önce o noktanın hata mı, gerçek mi olduğunu sorun.
            </span>
          </div>
          <div className="vg-card rounded-lg p-4 text-sm text-gray-300 flex items-start gap-3">
            <Activity className="w-5 h-5 text-[#34d399] mt-0.5 shrink-0" />
            <span>
              <span className="text-white font-semibold">Gizli değişken:</span> Dondurma satışı ile
              boğulma vakaları birlikte artar; sebep ikisi değil, ortak etken olan sıcak havadır.
            </span>
          </div>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 15. ÜÇÜNÜ KOD İLE ÜRETMEK ───── */
  () => (
    <SlideShell>
      <Eyebrow>Pratik · matplotlib</Eyebrow>
      <H2>Üç grafik, üç fonksiyon</H2>
      <Sub className="mt-3 max-w-3xl">
        Tableau ya da Excel kadar kodla da çizilir. matplotlib&apos;te üç türün her biri tek bir
        fonksiyon çağrısıdır: <span className="font-mono text-[#fca5a5]">bar</span>,{" "}
        <span className="font-mono text-[#fca5a5]">plot</span>,{" "}
        <span className="font-mono text-[#fca5a5]">scatter</span>.
      </Sub>
      <div className="mt-8 grid grid-cols-2 gap-6 items-center">
        <PythonChartsBlock />
        <div className="space-y-3">
          <MiniBar
            values={[12, 19, 8, 15, 22]}
            labels={["A", "B", "C", "D", "E"]}
            title="bar() → çubuk"
            width={300}
            height={120}
          />
          <MiniScatter
            data={[
              { x: 1, y: 2 }, { x: 2, y: 4 }, { x: 3, y: 3 }, { x: 4, y: 6 },
              { x: 5, y: 7 }, { x: 6, y: 6 }, { x: 7, y: 9 },
            ]}
            title="scatter() → dağılım"
            width={300}
            height={120}
          />
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 16. UYGULAMALI ALIŞTIRMA ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı alıştırma</Eyebrow>
      <H2>Aynı veri setiyle üç grafik</H2>
      <Sub className="mt-3 max-w-3xl">
        Kendi seçtiğiniz küçük bir veri setiyle (ör. aylık harcamalarınız veya ders notlarınız) üç
        grafiği de oluşturun. Tableau, Excel veya matplotlib — araç sizin seçiminiz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Table2, title: "Veriyi hazırla", desc: "5-8 satırlık temiz bir tablo: bir kategori, bir zaman ve iki sayısal sütun.", accent: "#fbbf24" },
          { icon: BarChart3, title: "Çubuk grafik çiz", desc: "Kategorileri değere göre sırala; ekseni sıfırdan başlat, başlık ve etiket ekle.", accent: "#ef4444" },
          { icon: LineChart, title: "Çizgi grafik çiz", desc: "Zaman sütununu x eksenine koy; trendi yorumla. Mümkünse ikinci bir seri ekle.", accent: "#f59e0b" },
          { icon: ScatterChart, title: "Dağılım grafiği çiz", desc: "İki sayısal sütunu karşılaştır; ilişkinin yönünü tek cümleyle yaz.", accent: "#34d399" },
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
                <span className="vg-step-badge">{i + 1}</span>
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
        <Check className="w-4 h-4 text-[#34d399] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Teslim:</span> Üç grafiğin ekran görüntüsü ve her biri için
          tek cümlelik &quot;bu grafik şunu gösteriyor&quot; yorumu.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 17. ÖZET — DOĞRU SEÇİM TABLOSU ───── */
  () => (
    <SlideShell>
      <Eyebrow>Özet · karar tablosu</Eyebrow>
      <H2>Üç grafik, tek bakışta</H2>
      <Sub className="mt-3 max-w-3xl">
        Bu haftanın özü tek bir tabloda. Doğru türü seçtikten sonra, eksen ve etiketleri eksiksiz çizin.
      </Sub>
      <div className="mt-8 vg-card rounded-xl p-4">
        <table className="vg-table">
          <thead>
            <tr>
              <th>Grafik</th>
              <th>Ne için?</th>
              <th>X ekseni</th>
              <th>Dikkat</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold text-white">Çubuk</td>
              <td>Kategori karşılaştırma</td>
              <td>Kategorik</td>
              <td><span className="vg-pill vg-pill-bad">Eksen sıfırdan</span></td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Çizgi</td>
              <td>Zaman içinde değişim</td>
              <td>Sıralı / sürekli</td>
              <td><span className="vg-pill vg-pill-mid">Eşit aralık</span></td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Dağılım</td>
              <td>İki değişken ilişkisi</td>
              <td>Sayısal</td>
              <td><span className="vg-pill vg-pill-good">Nedensellik ≠ korelasyon</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-xs text-gray-500 text-center font-mono">
        Her grafikte ortak kural: anlamlı başlık + eksen etiketleri + okunabilir ölçek.
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
          style={{ background: "linear-gradient(135deg,#ef4444,#f59e0b)", boxShadow: "0 30px 80px -20px rgba(239,68,68,0.6)" }}
        >
          <TrendingUp className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>10. hafta tamamlandı · sıradaki: Coğrafi Görselleştirme</Eyebrow>
        <H1>
          <span className="vg-shimmer-amber">Harita Üzerinde Veri</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta çubuk, çizgi ve dağılımı kurduk. Gelecek hafta veriyi haritaya taşıyoruz:
          koroplet (renk yoğunluklu) haritalar, nokta haritaları ve coğrafi alan seçimi.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <FeatureCard icon={Code2} title="Koroplet harita" desc="Bölgeleri değere göre renklendir; sequential palet kullan." accent="#ef4444" delay={0.1} />
          <FeatureCard icon={Target} title="Nokta haritası" desc="Konuma göre tekil gözlemler; yoğunluk ve kümeleme." accent="#f59e0b" delay={0.2} />
          <FeatureCard icon={Sparkles} title="Coğrafi yorum" desc="Nüfusa göre normalize et; ham sayı yanıltır." accent="#34d399" delay={0.3} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto text-left">
          <div className="vg-card rounded-xl p-5">
            <Calendar className="w-5 h-5 text-[#ef4444] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Ders saati</div>
            <div className="text-white font-semibold">Cuma</div>
            <div className="text-sm text-gray-400">11:45 — 15:10</div>
          </div>
          <div className="vg-card rounded-xl p-5">
            <Target className="w-5 h-5 text-[#f59e0b] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">Üç grafik alıştırması</div>
            <div className="text-sm text-gray-400">tamamlanmış getir</div>
          </div>
          <div className="vg-card rounded-xl p-5">
            <Check className="w-5 h-5 text-[#34d399] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">3 grafik + yorum</div>
            <div className="text-sm text-gray-400">ekran görüntüsüyle</div>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-center gap-3 text-xs font-mono text-gray-600">
          <Keyboard className="w-3.5 h-3.5" />
          <span>← → ile gez · F tam ekran · MCBÜ MYO · BVA 2107</span>
        </div>
      </div>
    </SlideShell>
  ),
];

const TOTAL = slides.length;

/* ============================================================
   PRESENTATION ROOT  (h01 ile birebir aynı)
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
          BVA 2107 · 10. Hafta · Çubuk · Çizgi · Dağılım
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
