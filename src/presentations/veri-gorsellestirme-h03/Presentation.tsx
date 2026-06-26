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
  Activity,
  Code2,
  LineChart,
  MousePointerClick,
  Building2,
  Cloud,
  Boxes,
  Wallet,
  Wand2,
  Layers,
  Network,
  GitBranch,
  Globe,
  Check,
  X,
  Terminal,
  ListChecks,
  Calendar,
  Target,
  Brain,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
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
   TOPIC MOCKUPS
   ============================================================ */

function LogoTile({ label, gradient }: { label: string; gradient: string }) {
  return (
    <span className="vg-logo-tile" style={{ background: gradient }}>
      {label}
    </span>
  );
}

/* Mini bar — araç önizleme panellerinde kullanılır */
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

function PowerBIMock() {
  return (
    <WindowChrome title="Power BI Desktop · Satış Raporu" badge="P">
      <div className="vg-dash p-3 grid grid-cols-12 gap-2" style={{ minHeight: 300 }}>
        <div className="vg-dash-tile col-span-3">
          <div className="text-[9px] text-gray-400 uppercase">Toplam Satış</div>
          <div className="text-2xl font-bold text-white mt-1">₺3.14M</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">▲ %9.6 YoY</div>
        </div>
        <div className="vg-dash-tile col-span-3">
          <div className="text-[9px] text-gray-400 uppercase">Müşteri</div>
          <div className="text-2xl font-bold text-white mt-1">8.402</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">▲ %5.3</div>
        </div>
        <div className="vg-dash-tile-amber col-span-6">
          <div className="text-[9px] text-gray-400 uppercase">Slicer · Yıl / Bölge / Kategori</div>
          <div className="flex gap-1.5 mt-2">
            {["2024", "2025", "2026"].map((y) => (
              <span
                key={y}
                className="px-2 py-0.5 rounded text-[10px] font-mono"
                style={{ background: "rgba(245,158,11,0.18)", color: "#fcd34d" }}
              >
                {y}
              </span>
            ))}
          </div>
        </div>
        <div className="vg-dash-tile col-span-7">
          <div className="text-[10px] text-gray-400 mb-1">Aylık Satış (₺ bin)</div>
          <MiniLine
            values={[180, 210, 240, 220, 280, 300, 340, 320, 380, 410, 440, 480]}
            title=""
            width={440}
            height={130}
            color="#f59e0b"
          />
        </div>
        <div className="vg-dash-tile col-span-5">
          <div className="text-[10px] text-gray-400 mb-1">Kategori Satışı</div>
          <MiniBar
            values={[60, 44, 32, 20]}
            labels={["Elek.", "Mob.", "Gıda", "Diğ."]}
            title=""
            width={240}
            height={130}
            color="#ef4444"
          />
        </div>
      </div>
    </WindowChrome>
  );
}

function SeabornCodeBlock() {
  return (
    <div className="vg-code">
      <div><span className="cm"># Seaborn — pandas DataFrame ile dağılım grafiği</span></div>
      <div><span className="kw">import</span> seaborn <span className="kw">as</span> sns</div>
      <div><span className="kw">import</span> matplotlib.pyplot <span className="kw">as</span> plt</div>
      <div className="mt-2">df <span className="op">=</span> sns.<span className="fn">load_dataset</span>(<span className="str">&quot;tips&quot;</span>)</div>
      <div className="mt-2">sns.<span className="fn">scatterplot</span>(</div>
      <div>{"  "}data<span className="op">=</span>df, x<span className="op">=</span><span className="str">&quot;total_bill&quot;</span>, y<span className="op">=</span><span className="str">&quot;tip&quot;</span>,</div>
      <div>{"  "}hue<span className="op">=</span><span className="str">&quot;time&quot;</span>, size<span className="op">=</span><span className="str">&quot;size&quot;</span></div>
      <div>)</div>
      <div>plt.<span className="fn">title</span>(<span className="str">&quot;Hesap vs Bahşiş&quot;</span>)</div>
      <div>plt.<span className="fn">show</span>()</div>
    </div>
  );
}

function PlotlyCodeBlock() {
  return (
    <div className="vg-code">
      <div><span className="cm"># Plotly Express — tek satırda etkileşimli grafik</span></div>
      <div><span className="kw">import</span> plotly.express <span className="kw">as</span> px</div>
      <div className="mt-2">df <span className="op">=</span> px.data.<span className="fn">gapminder</span>()</div>
      <div className="mt-2">fig <span className="op">=</span> px.<span className="fn">scatter</span>(</div>
      <div>{"  "}df.<span className="fn">query</span>(<span className="str">&quot;year == 2007&quot;</span>),</div>
      <div>{"  "}x<span className="op">=</span><span className="str">&quot;gdpPercap&quot;</span>, y<span className="op">=</span><span className="str">&quot;lifeExp&quot;</span>,</div>
      <div>{"  "}size<span className="op">=</span><span className="str">&quot;pop&quot;</span>, color<span className="op">=</span><span className="str">&quot;continent&quot;</span>,</div>
      <div>{"  "}hover_name<span className="op">=</span><span className="str">&quot;country&quot;</span>, log_x<span className="op">=</span><span className="kw">True</span></div>
      <div>)</div>
      <div>fig.<span className="fn">show</span>(){"  "}<span className="cm"># zoom · hover · pan tarayıcıda</span></div>
    </div>
  );
}

function InstallBlock() {
  return (
    <div className="vg-cmd">
      <div><span className="out"># Python ortamında tek komutla kurulum</span></div>
      <div>
        <span className="prompt">$</span> pip <span className="flag">install</span> seaborn plotly
      </div>
      <div className="out mt-1">Successfully installed seaborn-0.13 plotly-5.x ...</div>
      <div className="mt-2">
        <span className="prompt">$</span> python <span className="flag">-c</span> &quot;import seaborn, plotly; print(&apos;ok&apos;)&quot;
      </div>
      <div className="out mt-1">ok</div>
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
        <Eyebrow>BVA 2107 · 3. Hafta</Eyebrow>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.03]">
          <span className="vg-shimmer">Görselleştirme Yazılımları</span>
          <br />
          <span className="text-white/90 text-4xl md:text-6xl">Genel Bir Bakış</span>
        </h1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Dört araç, iki dünya: tıkla-sürükle panolar ile kod tabanlı grafikler. Hangisi
          hangi iş için?
        </Sub>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { name: "Tableau", desc: "GUI · pano", grad: "linear-gradient(135deg,#1f77b4,#0e4a6e)", abbr: "Tb" },
            { name: "Power BI", desc: "MS ekosistemi", grad: "linear-gradient(135deg,#f2c811,#b8950b)", abbr: "PB" },
            { name: "Plotly", desc: "etkileşimli kod", grad: "linear-gradient(135deg,#636efa,#3b45c7)", abbr: "Pl" },
            { name: "Seaborn", desc: "istatistik · Python", grad: "linear-gradient(135deg,#4c72b0,#2f4b80)", abbr: "Sb" },
          ].map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="vg-card rounded-xl p-4 flex flex-col items-center"
            >
              <LogoTile label={t.abbr} gradient={t.grad} />
              <div className="text-white font-semibold text-sm mt-2">{t.name}</div>
              <div className="text-[11px] text-gray-400 mt-1">{t.desc}</div>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 inline-flex items-center gap-2 text-xs font-mono text-gray-500">
          <Calendar className="w-3.5 h-3.5" />
          Manisa CBÜ MYO · Bilgisayar Programcılığı · 2025-2026 Bahar
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. KÖPRÜ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 2. haftadan 3. haftaya</Eyebrow>
      <H2>İlkeleri biliyoruz; şimdi araçları tanıyalım</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta grafik türlerini ve doğru-araç seçiminin neden bağlama bağlı olduğunu
        konuştuk. Bu hafta o seçimi somutlaştırıyoruz: en yaygın dört yazılımın ne yaptığını,
        ne zaman tercih edildiğini ve birbirinden farkını görüyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="vg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fca5a5]">
            <Target className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu hafta hedef</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ef4444] flex-shrink-0" />Dört aracı işlev ve kullanıcı kitlesiyle tanımak.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ef4444] flex-shrink-0" />GUI ile kod tabanlı yaklaşımı ayırt etmek.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ef4444] flex-shrink-0" />Bir iş için doğru aracı gerekçeyle seçmek.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="vg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fcd34d]">
            <Brain className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Akılda kalsın</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] flex-shrink-0" />En iyi araç yoktur; bağlama en uygun araç vardır.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] flex-shrink-0" />Kolaylık ile esneklik genelde ters orantılıdır.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] flex-shrink-0" />Veri görselleştirme ilkeleri her araçta aynıdır.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 3. İKİ DÜNYA ───── */
  () => (
    <SlideShell>
      <Eyebrow>Manzara · iki yaklaşım</Eyebrow>
      <H2>Tıkla-sürükle mi, kod mu?</H2>
      <Sub className="mt-3 max-w-3xl">
        Görselleştirme araçları kabaca iki gruba ayrılır. Hangi grupta olduğunu bilmek,
        öğrenme eğrisini ve esneklik beklentisini doğru kurmanı sağlar.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="vg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <MousePointerClick className="w-6 h-6 text-[#ef4444]" />
            <span className="text-lg font-semibold text-white">GUI tabanlı</span>
          </div>
          <div className="flex gap-2 mb-3">
            <LogoTile label="Tb" gradient="linear-gradient(135deg,#1f77b4,#0e4a6e)" />
            <LogoTile label="PB" gradient="linear-gradient(135deg,#f2c811,#b8950b)" />
          </div>
          <p className="text-sm text-gray-300 mb-3">Tableau · Power BI</p>
          <ul className="space-y-2 text-[13px] text-gray-400">
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />Hızlı başlangıç, kod gerektirmez.</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />Etkileşimli pano paylaşımı kolay.</li>
            <li className="flex gap-2"><X className="w-4 h-4 mt-0.5 text-rose-400 flex-shrink-0" />Lisans maliyeti; ileri özelleştirme sınırlı.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="vg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Code2 className="w-6 h-6 text-[#f59e0b]" />
            <span className="text-lg font-semibold text-white">Kod tabanlı (Python)</span>
          </div>
          <div className="flex gap-2 mb-3">
            <LogoTile label="Pl" gradient="linear-gradient(135deg,#636efa,#3b45c7)" />
            <LogoTile label="Sb" gradient="linear-gradient(135deg,#4c72b0,#2f4b80)" />
          </div>
          <p className="text-sm text-gray-300 mb-3">Plotly · Seaborn</p>
          <ul className="space-y-2 text-[13px] text-gray-400">
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />Ücretsiz, açık kaynak, sınırsız özelleştirme.</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />Veri analizi (pandas) ile aynı akışta.</li>
            <li className="flex gap-2"><X className="w-4 h-4 mt-0.5 text-rose-400 flex-shrink-0" />Öğrenme eğrisi var; Python bilmek gerekir.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 4. BÖLÜM 1 ───── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="GUI Araçları: Tableau & Power BI"
      subtitle="Kod yazmadan, sürükle-bırak ile etkileşimli panolar. İş zekâsı (BI) dünyasının iki devi."
      bgGradient="linear-gradient(135deg, #ef4444, #b91c1c)"
      shadow="0 25px 60px -15px rgba(239, 68, 68, 0.6)"
      icon={<MousePointerClick className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 5. TABLEAU ───── */
  () => (
    <SlideShell>
      <Eyebrow>Tableau · sürükle-bırak BI</Eyebrow>
      <H2>Veriyi sürükle, grafik kendiliğinden çıksın</H2>
      <Sub className="mt-3 max-w-3xl">
        Tableau, alanları (boyut ve ölçü) satır/sütun raflarına sürükleyerek grafik üretir.
        Güçlü etkileşim ve görsel kalitesiyle tanınır; özellikle keşifsel analizde hızlıdır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={MousePointerClick}
          title="Drag &amp; drop"
          desc="Boyut ve ölçüleri raflara taşı; Tableau uygun grafiği önerir (Show Me)."
          delay={0.05}
        />
        <FeatureCard
          icon={Layers}
          title="Pano &amp; story"
          desc="Birden çok grafiği tek panoda birleştir, filtreleri grafikler arası bağla."
          delay={0.1}
          accent="#f59e0b"
        />
        <FeatureCard
          icon={Wallet}
          title="Lisans &amp; sürümler"
          desc="Tableau Public ücretsiz (yayın herkese açık); Desktop / Server / Cloud ücretli."
          delay={0.15}
        />
      </div>
      <div className="mt-6 vg-card rounded-lg p-4 text-sm text-gray-300 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-[#ef4444] mt-0.5 shrink-0" />
        <div>
          <span className="text-white font-semibold">Tipik kullanım:</span> Analistlerin
          hızlı pano üretip iş birimleriyle paylaştığı; veri keşfinin görsel ve etkileşimli
          yapıldığı senaryolar.
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 6. POWER BI MOCKUP ───── */
  () => (
    <SlideShell>
      <Eyebrow>Power BI · Microsoft ekosistemi</Eyebrow>
      <H2 className="mb-2">Rapor, model ve DAX bir arada</H2>
      <Sub className="max-w-3xl mb-6">
        Power BI; Excel, Azure ve Microsoft 365 ile sıkı entegredir. Veriyi modelle (ilişkiler),
        ölçüleri <span className="font-mono text-[#f59e0b]">DAX</span> ile yaz, dilimleyicilerle
        (slicer) etkileşimli rapor kur. Aşağıda örnek bir rapor görünümü.
      </Sub>
      <PowerBIMock />
    </SlideShell>
  ),

  /* ───── 7. TABLEAU vs POWER BI TABLO ───── */
  () => (
    <SlideShell>
      <Eyebrow>Tableau vs Power BI</Eyebrow>
      <H2>İki BI devi · nerede ayrışır?</H2>
      <Sub className="mt-3 max-w-3xl">
        İkisi de etkileşimli pano üretir; seçim çoğu zaman ekibin mevcut ekosistemine ve
        bütçesine bağlıdır.
      </Sub>
      <div className="mt-8 vg-card rounded-xl p-4">
        <table className="vg-table">
          <thead>
            <tr>
              <th>Ölçüt</th>
              <th>Tableau</th>
              <th>Power BI</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold text-white">Maliyet</td>
              <td><span className="vg-pill vg-pill-bad">Görece pahalı</span></td>
              <td><span className="vg-pill vg-pill-good">Daha uygun</span></td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Ekosistem</td>
              <td>Platformdan bağımsız</td>
              <td>Microsoft 365 / Azure entegre</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">İfade dili</td>
              <td>Calculated Field · LOD</td>
              <td><span className="font-mono text-[#f59e0b]">DAX</span> · Power Query (M)</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Güçlü yönü</td>
              <td>Görsel keşif · etkileşim kalitesi</td>
              <td>Veri modelleme · kurumsal yaygınlık</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Ücretsiz seçenek</td>
              <td><span className="vg-pill vg-pill-mid">Tableau Public (açık yayın)</span></td>
              <td><span className="vg-pill vg-pill-mid">Power BI Desktop (yerel)</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </SlideShell>
  ),

  /* ───── 8. BÖLÜM 2 ───── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Kod Araçları: Plotly & Seaborn"
      subtitle="Python ile birkaç satırda grafik. Veri analizinin (pandas) doğal devamı; ücretsiz ve sınırsız özelleştirilebilir."
      bgGradient="linear-gradient(135deg, #f59e0b, #b45309)"
      shadow="0 25px 60px -15px rgba(245, 158, 11, 0.6)"
      icon={<Code2 className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 9. SEABORN ───── */
  () => (
    <SlideShell>
      <Eyebrow>Seaborn · istatistiksel grafikler</Eyebrow>
      <H2 className="mb-2">Matplotlib üstünde, az kodla şık grafik</H2>
      <Sub className="max-w-3xl mb-6">
        Seaborn, matplotlib&apos;in üzerine kurulu bir kütüphanedir. pandas DataFrame ile doğrudan
        çalışır; dağılım, korelasyon ve kategorik karşılaştırmalar için hazır, estetik grafikler sunar.
      </Sub>
      <div className="grid grid-cols-2 gap-6 items-center">
        <SeabornCodeBlock />
        <div>
          <div className="text-xs text-gray-500 mb-2 text-center font-mono">→ tipik kullanım alanları</div>
          <div className="space-y-2">
            {[
              { i: Activity, t: "Dağılım: histogram · KDE · boxplot" },
              { i: Network, t: "Korelasyon: heatmap · pairplot" },
              { i: BarChart3, t: "Kategorik: barplot · countplot" },
              { i: LineChart, t: "İlişki: scatterplot · regplot" },
            ].map((r, idx) => (
              <div key={idx} className="vg-card rounded-lg p-3 flex items-center gap-3">
                <r.i className="w-5 h-5 text-[#f59e0b] shrink-0" />
                <span className="text-sm text-gray-200">{r.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 10. PLOTLY ───── */
  () => (
    <SlideShell>
      <Eyebrow>Plotly · etkileşimli &amp; web</Eyebrow>
      <H2 className="mb-2">Statik değil; zoom, hover, pan</H2>
      <Sub className="max-w-3xl mb-6">
        Plotly grafikleri tarayıcıda etkileşimlidir: fareyle üzerine gel (hover), yakınlaştır,
        kaydır. Çıktı HTML olarak paylaşılabilir; <span className="font-mono text-[#636efa]">Dash</span> ile
        tam bir web panosuna dönüşebilir.
      </Sub>
      <div className="grid grid-cols-2 gap-6 items-center">
        <PlotlyCodeBlock />
        <div className="space-y-3">
          <FeatureCard
            icon={Globe}
            title="Web çıktısı"
            desc="HTML olarak dışa aktar; e-posta/portalda paylaş, sunucu gerekmeden açılır."
            accent="#636efa"
            delay={0.1}
          />
          <FeatureCard
            icon={GitBranch}
            title="Express vs Graph Objects"
            desc="px ile hızlı; go ile katman katman tam kontrol. İhtiyaca göre seç."
            accent="#636efa"
            delay={0.2}
          />
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 11. SEABORN vs PLOTLY ───── */
  () => (
    <SlideShell>
      <Eyebrow>Seaborn vs Plotly</Eyebrow>
      <H2>Statik analiz mi, etkileşimli paylaşım mı?</H2>
      <Sub className="mt-3 max-w-3xl">
        İkisi de Python; ama farklı işler için. Çoğu veri bilimci ikisini birlikte kullanır.
      </Sub>
      <div className="mt-8 vg-card rounded-xl p-4">
        <table className="vg-table">
          <thead>
            <tr>
              <th>Ölçüt</th>
              <th>Seaborn</th>
              <th>Plotly</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold text-white">Etkileşim</td>
              <td><span className="vg-pill vg-pill-mid">Statik (resim)</span></td>
              <td><span className="vg-pill vg-pill-good">Etkileşimli (hover/zoom)</span></td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Çıktı</td>
              <td>PNG · SVG · PDF</td>
              <td>HTML · web · notebook</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Güçlü yönü</td>
              <td>İstatistiksel grafikler, hızlı keşif</td>
              <td>Paylaşılabilir, etkileşimli sunum</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Tipik yer</td>
              <td>Rapor, makale, EDA</td>
              <td>Dashboard (Dash), web demo</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Temel</td>
              <td>matplotlib</td>
              <td>plotly.js (D3 tabanlı)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </SlideShell>
  ),

  /* ───── 12. BÖLÜM 3 ───── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Karar: Hangi Araç, Ne Zaman?"
      subtitle="Dört aracı bir karar çerçevesinde topluyoruz. İş bağlamı, ekip becerisi ve bütçe seçimi belirler."
      bgGradient="linear-gradient(135deg, #ef4444, #f59e0b)"
      shadow="0 25px 60px -15px rgba(239, 68, 68, 0.55)"
      icon={<Boxes className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 13. KARAR ÇERÇEVESİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Karar çerçevesi</Eyebrow>
      <H2>Soru &amp; bağlam → araç</H2>
      <Sub className="mt-3 max-w-3xl">
        Tek doğru cevap yok; ama yön veren birkaç pratik soru var. Aşağıdaki dört durum en sık karşılaşılanlar.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          {
            icon: Building2,
            t: "Kurumsal pano, kod bilmeyen ekip",
            d: "Microsoft kullanıyorsanız Power BI; platform bağımsızlık ve görsel keşif önemliyse Tableau.",
            accent: "#ef4444",
          },
          {
            icon: Brain,
            t: "Keşifsel veri analizi (EDA)",
            d: "Python + pandas akışındaysanız Seaborn ile hızlı istatistiksel grafik üretin.",
            accent: "#f59e0b",
          },
          {
            icon: Globe,
            t: "Etkileşimli, web&apos;de paylaşılacak",
            d: "Plotly (gerekirse Dash) ile hover/zoom destekli, HTML olarak paylaşılabilen grafikler.",
            accent: "#636efa",
          },
          {
            icon: Wallet,
            t: "Bütçe sıfır / tam kontrol",
            d: "Açık kaynak Seaborn + Plotly; lisans yok, sınırsız özelleştirme, sürüm kontrolüyle uyumlu.",
            accent: "#34d399",
          },
        ].map((c, i) => (
          <motion.div
            key={c.t}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="vg-card vg-card-hover rounded-xl p-5 flex items-start gap-4"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${c.accent}18`, border: `1px solid ${c.accent}55` }}
            >
              <c.icon className="w-5 h-5" style={{ color: c.accent }} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white mb-1" dangerouslySetInnerHTML={{ __html: c.t }} />
              <p className="text-sm text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: c.d }} />
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 14. UYGULAMALI LAB ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı alıştırma</Eyebrow>
      <H2>Aynı veriyi iki dünyada görselleştir</H2>
      <Sub className="mt-3 max-w-3xl">
        Amaç: GUI ile kodu birebir hissetmek. Aşağıdaki kurulumu yapıp dört adımı tamamla;
        sonraki derse ekran görüntüleriyle gel.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 items-start">
        <InstallBlock />
        <div className="grid grid-cols-1 gap-3">
          {[
            { icon: Cloud, title: "Tableau Public&apos;te bir bar chart", desc: "Hazır bir CSV (örn. örnek satış) yükle, kategoriye göre yatay bar üret.", accent: "#ef4444" },
            { icon: Terminal, title: "Seaborn ile aynı grafiği yaz", desc: "Aynı veriyi pandas&apos;a oku, sns.barplot ile çiz; PNG olarak kaydet.", accent: "#f59e0b" },
            { icon: Globe, title: "Plotly ile etkileşimliye çevir", desc: "px.bar ile aynı grafiği üret, hover&apos;ı dene, HTML olarak dışa aktar.", accent: "#636efa" },
            { icon: ListChecks, title: "Üçünü karşılaştır", desc: "Kolaylık, görsel kalite ve esneklik açısından 3 cümlede notunu yaz.", accent: "#34d399" },
          ].map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="vg-card vg-card-hover rounded-lg p-4 flex items-start gap-3"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${t.accent}18`, border: `1px solid ${t.accent}55` }}
              >
                <t.icon className="w-5 h-5" style={{ color: t.accent }} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-[10px] text-gray-500 font-mono">{i + 1}</span>
                  <h3 className="text-sm font-semibold text-white" dangerouslySetInnerHTML={{ __html: t.title }} />
                </div>
                <p className="text-[12px] text-gray-400 leading-snug" dangerouslySetInnerHTML={{ __html: t.desc }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 15. SIRADAKİ HAFTA ───── */
  () => (
    <SlideShell>
      <Eyebrow>Sıradaki Hafta · H4</Eyebrow>
      <H1>
        <span className="vg-shimmer-amber">Tableau Temelleri</span>
      </H1>
      <Sub className="mt-6 max-w-3xl">
        Genel bakıştan derinleşmeye geçiyoruz. Tableau&apos;da veri kaynağı bağlama, boyut/ölçü
        ayrımı, ilk grafik ve ilk pano: tek bir aracı uçtan uca uygulamalı işleyeceğiz.
      </Sub>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { i: Cloud, t: "Veri kaynağı bağla" },
          { i: MousePointerClick, t: "Boyut / ölçü rafları" },
          { i: BarChart3, t: "İlk grafik · Show Me" },
          { i: Layers, t: "İlk pano · filtre" },
        ].map((tool, i) => (
          <motion.div
            key={tool.t}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="vg-card rounded-lg p-4 flex items-center gap-3"
          >
            <tool.i className="w-5 h-5 text-[#f59e0b]" />
            <span className="text-sm text-gray-200">{tool.t}</span>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 vg-card rounded-lg p-4 flex items-center gap-3">
        <Target className="w-5 h-5 text-[#ef4444]" />
        <span className="text-sm text-gray-300">
          Hazırlık: Tableau Public&apos;i kurulu ve hesabı açık şekilde getirin; ilk dersten
          itibaren ekranda birlikte çalışacağız.
        </span>
      </div>
    </SlideShell>
  ),

  /* ───── 16. KAPANIŞ ───── */
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
          <Wand2 className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>3. hafta · Tamamlandı</Eyebrow>
        <H1>
          <span className="vg-shimmer">Özet</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Dört araç, iki yaklaşım: GUI tarafında Tableau ve Power BI hızlı pano üretir; kod
          tarafında Seaborn istatistiksel keşif, Plotly etkileşimli paylaşım sağlar.
        </Sub>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          {[
            { abbr: "Tb", n: "Tableau", d: "görsel keşif", grad: "linear-gradient(135deg,#1f77b4,#0e4a6e)" },
            { abbr: "PB", n: "Power BI", d: "MS + DAX", grad: "linear-gradient(135deg,#f2c811,#b8950b)" },
            { abbr: "Sb", n: "Seaborn", d: "istatistik EDA", grad: "linear-gradient(135deg,#4c72b0,#2f4b80)" },
            { abbr: "Pl", n: "Plotly", d: "etkileşimli web", grad: "linear-gradient(135deg,#636efa,#3b45c7)" },
          ].map((t) => (
            <div key={t.n} className="vg-card rounded-xl p-4 flex flex-col items-center">
              <LogoTile label={t.abbr} gradient={t.grad} />
              <div className="text-sm font-semibold text-white mt-2">{t.n}</div>
              <div className="text-[11px] text-gray-400 mt-0.5">{t.d}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex items-center justify-center gap-3 text-xs font-mono text-gray-500">
          <Calendar className="w-4 h-4" />
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
          BVA 2107 · 3. Hafta · Görselleştirme Yazılımları
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
