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
  Share2,
  Network,
  Activity,
  Zap,
  Users,
  Radio,
  Waves,
  Flame,
  Shield,
  HeartPulse,
  RefreshCw,
  GitBranch,
  Code2,
  Database,
  BarChart3,
  Check,
  Calendar,
  MapPin,
  Mail,
  Clock,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  ArrowRight,
  Target,
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
        <div className="absolute inset-0 saa-grid-bg pointer-events-none" />
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
      className="inline-flex items-center gap-3 mb-6 text-xs font-mono uppercase tracking-[0.25em] text-[#14b8a6]"
    >
      <span className="w-8 h-px bg-[#14b8a6]" />
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
  accent = "#14b8a6",
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
      className="saa-card saa-card-hover rounded-xl p-6 transition-all"
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
        style={{
          background: `${accent}18`,
          border: `1px solid ${accent}50`,
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
          className="inline-flex w-32 h-32 rounded-3xl items-center justify-center mb-8 saa-pulse"
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
   KONUYA ÖZGÜ MOCKUP'LAR (11. hafta — yayılım & SIR/SIS)
   ============================================================ */

type DiffNode = {
  id: string;
  x: number;
  y: number;
  label: string;
  /* yayılımın hangi adımında etkilendi: 0 = tohum, 1, 2 ... veya null (hiç) */
  step: number | null;
};

type DiffEdge = { from: string; to: string };

/* Bir bilginin tohumdan dalga dalga yayılışı — adım renkleriyle */
function CascadeGraph() {
  const nodes: DiffNode[] = [
    { id: "seed", x: 110, y: 230, label: "Tohum", step: 0 },
    { id: "a", x: 290, y: 110, label: "A", step: 1 },
    { id: "b", x: 290, y: 230, label: "B", step: 1 },
    { id: "c", x: 290, y: 360, label: "C", step: 1 },
    { id: "d", x: 480, y: 70, label: "D", step: 2 },
    { id: "e", x: 490, y: 200, label: "E", step: 2 },
    { id: "f", x: 480, y: 320, label: "F", step: 2 },
    { id: "g", x: 660, y: 130, label: "G", step: null },
    { id: "h", x: 670, y: 260, label: "H", step: 3 },
    { id: "i", x: 640, y: 390, label: "I", step: null },
  ];
  const edges: DiffEdge[] = [
    { from: "seed", to: "a" },
    { from: "seed", to: "b" },
    { from: "seed", to: "c" },
    { from: "a", to: "d" },
    { from: "a", to: "e" },
    { from: "b", to: "e" },
    { from: "c", to: "f" },
    { from: "e", to: "h" },
    { from: "d", to: "g" },
    { from: "f", to: "i" },
    { from: "f", to: "h" },
  ];
  const stepColor = (s: number | null) => {
    if (s === null) return { fill: "#1f2937", stroke: "#4b5563" };
    if (s === 0) return { fill: "url(#seedGrad)", stroke: "#5eead4" };
    if (s === 1) return { fill: "#0d9488", stroke: "#5eead4" };
    if (s === 2) return { fill: "#0e7490", stroke: "#67e8f9" };
    return { fill: "#7c3aed", stroke: "#c4b5fd" };
  };
  const find = (id: string) => nodes.find((n) => n.id === id)!;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="saa-window-chrome w-full"
    >
      <div className="saa-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-semibold flex-1 max-w-md mx-auto text-center justify-center"
          style={{ background: "#0a0f0e", color: "#5eead4" }}
        >
          <span className="w-5 h-5 rounded-sm saa-n-tile flex items-center justify-center text-[11px]">
            N
          </span>
          <span>yayilim_simulasyonu · t = 0 &rarr; 3 · 10 düğüm</span>
        </div>
      </div>
      <div className="p-4 bg-[#070b0a]">
        <svg viewBox="0 0 760 460" className="w-full h-auto">
          <defs>
            <radialGradient id="seedGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#5eead4" />
              <stop offset="100%" stopColor="#0d9488" />
            </radialGradient>
          </defs>

          {edges.map((e, i) => {
            const a = find(e.from);
            const b = find(e.to);
            const active = a.step !== null && b.step !== null;
            return (
              <line
                key={`ce-${i}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={active ? "#14b8a6" : "#374151"}
                strokeWidth={active ? 2 : 1.2}
                strokeOpacity={active ? 0.7 : 0.45}
              />
            );
          })}

          {nodes.map((n) => {
            const c = stepColor(n.step);
            const isSeed = n.step === 0;
            return (
              <g key={n.id}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={isSeed ? 34 : 24}
                  fill={c.fill}
                  stroke={c.stroke}
                  strokeWidth={isSeed ? 2.5 : 1.6}
                  className={isSeed ? "saa-node-pulse" : ""}
                />
                <text
                  x={n.x}
                  y={n.y + 4}
                  textAnchor="middle"
                  fontSize={isSeed ? 12 : 11}
                  fontWeight={700}
                  fill="#ffffff"
                  fontFamily="Inter, sans-serif"
                >
                  {n.label}
                </text>
                {n.step !== null && (
                  <text
                    x={n.x}
                    y={n.y + (isSeed ? 50 : 40)}
                    textAnchor="middle"
                    fontSize={10}
                    fontWeight={600}
                    fill={c.stroke}
                    fontFamily="Inter, sans-serif"
                  >
                    t = {n.step}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2 text-[11px] text-gray-400">
          <span className="inline-flex items-center gap-1.5">
            <span className="saa-legend-dot" style={{ background: "#0d9488" }} />
            t = 1
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="saa-legend-dot" style={{ background: "#0e7490" }} />
            t = 2
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="saa-legend-dot" style={{ background: "#7c3aed" }} />
            t = 3
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="saa-legend-dot" style={{ background: "#1f2937" }} />
            hiç ulaşmadı (G, I)
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* SIR kompartman akış diyagramı: S → I → R */
function SIRDiagram() {
  const boxes = [
    {
      key: "S",
      title: "S — Susceptible",
      sub: "Duyarlı / henüz etkilenmemiş",
      color: "#14b8a6",
      icon: Users,
    },
    {
      key: "I",
      title: "I — Infected",
      sub: "Etkilenmiş / aktif yayan",
      color: "#f87171",
      icon: Flame,
    },
    {
      key: "R",
      title: "R — Recovered",
      sub: "Bağışık / artık yaymaz",
      color: "#a78bfa",
      icon: Shield,
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="saa-card rounded-xl p-6"
    >
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-3">
        {boxes.map((b, i) => (
          <div key={b.key} className="flex items-center gap-3 flex-1">
            <div
              className="rounded-xl p-4 flex-1 text-center"
              style={{ background: `${b.color}12`, border: `1px solid ${b.color}50` }}
            >
              <b.icon className="w-6 h-6 mx-auto mb-2" style={{ color: b.color }} />
              <div className="text-base font-bold text-white">{b.title}</div>
              <div className="text-xs text-gray-400 mt-1">{b.sub}</div>
            </div>
            {i < boxes.length - 1 && (
              <div className="flex flex-col items-center text-gray-500 px-1">
                <ArrowRight className="w-6 h-6" style={{ color: "#5eead4" }} />
                <span className="text-[10px] font-mono mt-1">
                  {i === 0 ? "β · oran" : "γ · oran"}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-300">
        <div className="saa-card-teal rounded-lg p-3 font-mono text-[#a7f3d0] text-center">
          dI/dt = &beta; · S · I &minus; &gamma; · I
        </div>
        <div className="saa-card rounded-lg p-3 text-gray-400">
          <span className="text-[#5eead4] font-semibold">&beta;</span> = bulaş
          (geçiş) oranı &nbsp;·&nbsp;{" "}
          <span className="text-[#c4b5fd] font-semibold">&gamma;</span> = iyileşme
          (çıkış) oranı
        </div>
      </div>
    </motion.div>
  );
}

/* SIS vs SIR yan yana yığılmış bantlar (şematik son durum) */
function ModelBars() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-5"
    >
      <div className="saa-card rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <RefreshCw className="w-5 h-5 text-[#f87171]" />
          <span className="text-sm font-semibold text-white">SIS — kalıcı bağışıklık yok</span>
        </div>
        <p className="text-xs text-gray-400 mb-4 leading-relaxed">
          Etkilenen düğüm iyileşir ama yeniden{" "}
          <span className="saa-state-s">duyarlı</span> hale gelir.{" "}
          <span className="text-white">S &rarr; I &rarr; S</span> döngüsü.
          Sistem sıfıra inmeyip bir{" "}
          <span className="text-[#f87171]">denge (endemik)</span> seviyesinde
          kalabilir.
        </p>
        <div className="saa-phasebar">
          <span style={{ width: "60%", background: "#14b8a6" }} />
          <span style={{ width: "40%", background: "#f87171" }} />
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-gray-500 font-mono">
          <span>S kalıcı</span>
          <span>I kalıcı (endemik)</span>
        </div>
      </div>

      <div className="saa-card rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-5 h-5 text-[#a78bfa]" />
          <span className="text-sm font-semibold text-white">SIR — kalıcı bağışıklık var</span>
        </div>
        <p className="text-xs text-gray-400 mb-4 leading-relaxed">
          İyileşen düğüm <span className="saa-state-r">bağışık</span> olur, bir
          daha etkilenmez. <span className="text-white">S &rarr; I &rarr; R</span>{" "}
          tek yönlü. Salgın bir tepe yapar, sonra{" "}
          <span className="text-[#a78bfa]">söner</span>.
        </p>
        <div className="saa-phasebar">
          <span style={{ width: "20%", background: "#14b8a6" }} />
          <span style={{ width: "12%", background: "#f87171" }} />
          <span style={{ width: "68%", background: "#a78bfa" }} />
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-gray-500 font-mono">
          <span>S kalan</span>
          <span>R bağışık (büyür)</span>
        </div>
      </div>
    </motion.div>
  );
}

/* Eşik / R0 tablosu */
function ThresholdTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="saa-card rounded-xl p-5 overflow-x-auto"
    >
      <table className="saa-table">
        <thead>
          <tr>
            <th style={{ width: "20%" }}>Model</th>
            <th>Kural</th>
            <th>Geri dönüş?</th>
            <th>Tipik kullanım</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="saa-row-head">Bağımsız Çağlayan (IC)</td>
            <td>Her etkilenen komşusunu p olasılığıyla bir kez dener</td>
            <td>Yok</td>
            <td>Retweet, viral paylaşım, &quot;duydum-yaydım&quot;</td>
          </tr>
          <tr>
            <td className="saa-row-head">Eşik (LT)</td>
            <td>
              Komşularının ağırlık toplamı &theta; eşiğini geçince etkilenir
            </td>
            <td>Yok</td>
            <td>Yeni teknoloji/alışkanlık benimseme, akran baskısı</td>
          </tr>
          <tr>
            <td className="saa-row-head">SIS</td>
            <td>
              S &rarr; I &rarr; S · iyileşen tekrar duyarlı (oran &beta;, &gamma;)
            </td>
            <td>Var</td>
            <td>Tekrarlayan söylenti, kalıcı bağışıklık olmayan bulaş</td>
          </tr>
          <tr>
            <td className="saa-row-head">SIR</td>
            <td>
              S &rarr; I &rarr; R · iyileşen bağışık (oran &beta;, &gamma;)
            </td>
            <td>Yok</td>
            <td>Tek dalga salgın, bir kez ilgilenip bırakılan haber</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-3 text-[11px] text-gray-500 text-center">
        Temel üreme sayısı{" "}
        <span className="text-[#5eead4] font-mono">R&#8320; = &beta; / &gamma;</span>{" "}
        &middot; R&#8320; &gt; 1 ise yayılım büyür, R&#8320; &lt; 1 ise söner.
      </div>
    </motion.div>
  );
}

/* NetworkX + EoN kod örneği */
function CodeBlock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="saa-window-chrome w-full"
    >
      <div className="saa-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-semibold flex-1 max-w-md mx-auto text-center justify-center"
          style={{ background: "#0a0f0e", color: "#5eead4" }}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>sir_simulasyon.py · Python 3.12 · NetworkX 3.3 + EoN</span>
        </div>
      </div>
      <pre className="saa-code p-6 overflow-x-auto m-0">
        <code>
          <span className="saa-code-cmt"># 1) Ölçeksiz bir ağ üret (gerçek sosyal ağa benzer)</span>
          {"\n"}
          <span className="saa-code-kw">import</span>{" "}
          <span className="saa-code-fn">networkx</span>{" "}
          <span className="saa-code-kw">as</span>{" "}
          <span className="saa-code-fn">nx</span>
          {"\n"}
          <span className="saa-code-kw">import</span>{" "}
          <span className="saa-code-fn">EoN</span>
          {"\n"}
          {"\n"}
          G = nx.<span className="saa-code-fn">barabasi_albert_graph</span>(
          <span className="saa-code-num">1000</span>,{" "}
          <span className="saa-code-num">3</span>)
          {"\n"}
          {"\n"}
          <span className="saa-code-cmt"># 2) SIR sürecini çalıştır: bulaş tau, iyileşme gamma</span>
          {"\n"}
          t, S, I, R = EoN.<span className="saa-code-fn">fast_SIR</span>(
          {"\n"}
          {"    "}G, tau=<span className="saa-code-num">0.20</span>,
          gamma=<span className="saa-code-num">1.0</span>,
          {"\n"}
          {"    "}rho=<span className="saa-code-num">0.01</span>
          {"  "}
          <span className="saa-code-cmt"># başlangıçta düğümlerin %1&apos;i etkilenmiş</span>
          {"\n"}
          )
          {"\n"}
          {"\n"}
          <span className="saa-code-cmt"># 3) R0 yaklaşık eşik ve tepe etkilenme</span>
          {"\n"}
          <span className="saa-code-fn">print</span>(
          <span className="saa-code-str">&quot;Tepe I:&quot;</span>, I.
          <span className="saa-code-fn">max</span>())
          {"\n"}
          <span className="saa-code-fn">print</span>(
          <span className="saa-code-str">&quot;Toplam etkilenen:&quot;</span>, R[
          <span className="saa-code-num">-1</span>])
        </code>
      </pre>
    </motion.div>
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
        <Eyebrow>BVA 2105 · 11. Hafta — Sosyal Ağ Analizi</Eyebrow>
        <H1 className="saa-shimmer">
          Ağlarda Etki
          <br />
          ve Yayılım
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Bir fikir, bir söylenti ya da bir salgın bir ağda nasıl yol alır? Bilgi
          çağlayanları ve SIR/SIS yayılım modelleri.
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          <FeatureCard
            icon={Waves}
            title="Bilgi Çağlayanları"
            desc="Tohumdan dalga dalga yayılım: bağımsız çağlayan (IC) ve eşik (LT) modelleri."
            accent="#14b8a6"
            delay={0.2}
          />
          <FeatureCard
            icon={HeartPulse}
            title="SIR / SIS"
            desc="Epidemiyolojiden ödünç alınan kompartman modelleri ile sosyal yayılımı modelleme."
            accent="#f87171"
            delay={0.35}
          />
          <FeatureCard
            icon={Target}
            title="Eşik ve R₀"
            desc="Yayılım ne zaman patlar, ne zaman söner? Temel üreme sayısı ve kritik eşik."
            accent="#a78bfa"
            delay={0.5}
          />
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. Geçen hafta → bu hafta köprüsü ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 10. haftadan 11. haftaya</Eyebrow>
      <H2>Yapıyı tanıdık; şimdi ağ üstünde &quot;hareket&quot; var</H2>
      <Sub className="mt-3 max-w-3xl">
        10. haftada bilgi yayılımının temel modellerine (SI, basit difüzyon)
        giriş yaptık. Bu hafta bunu derinleştiriyoruz: bilgi çağlayanlarının
        mekaniği, iyileşme/unutmayı ekleyen SIR ve SIS, ve yayılımın büyüyüp
        büyümeyeceğini söyleyen eşik koşulları.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#5eead4]">
            <Network className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Elimizde olan
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />
              Düğüm, kenar, derece ve merkezilik ölçüleri.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />
              Ölçeksiz ağlar ve hub kavramı (hub&apos;lar yayılımı hızlandırır).
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />
              Basit SI difüzyonunun sezgisi.
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#a7f3d0]">
            <Zap className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Bu hafta ekleniyor
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] flex-shrink-0" />
              Çağlayan modelleri: bağımsız çağlayan (IC) ve eşik (LT).
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] flex-shrink-0" />
              İyileşme/unutmayı modelleyen SIR ve SIS.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] flex-shrink-0" />
              R&#8320; eşiği: yayılım büyür mü, söner mi?
            </li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 3. Dersin akışı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: çağlayan &rarr; kompartman &rarr; eşik</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce ayrık-zamanlı çağlayan modellerini görüyoruz; sonra
        epidemiyolojiden gelen SIR/SIS kompartman modellerine geçiyoruz; en sonda
        yayılımın kaderini belirleyen eşik koşulunu ve küçük bir simülasyon labını
        ele alıyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            range: "01",
            title: "Bilgi Çağlayanları",
            items: ["Tohum & yayılım adımları", "Bağımsız çağlayan (IC)", "Doğrusal eşik (LT)"],
            icon: Waves,
            accent: "#14b8a6",
          },
          {
            range: "02",
            title: "SIR & SIS",
            items: ["S / I / R kompartmanları", "β bulaş, γ iyileşme", "SIS: tekrar duyarlı olma"],
            icon: HeartPulse,
            accent: "#f87171",
          },
          {
            range: "03",
            title: "Eşik & Pratik",
            items: ["R₀ = β / γ", "Kritik eşik & söndürme", "NetworkX + EoN simülasyonu"],
            icon: Target,
            accent: "#a78bfa",
          },
        ].map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="saa-card rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${g.accent}18`, border: `1px solid ${g.accent}55` }}
              >
                <g.icon className="w-5 h-5" style={{ color: g.accent }} />
              </div>
              <div>
                <div
                  className="text-[10px] font-mono uppercase tracking-widest"
                  style={{ color: g.accent }}
                >
                  Durak {g.range}
                </div>
                <div className="text-lg font-semibold text-white">{g.title}</div>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-400">
              {g.items.map((it) => (
                <li key={it} className="flex items-start gap-2">
                  <ChevronRight
                    className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                    style={{ color: g.accent }}
                  />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 4. Bölüm 1 — Çağlayanlar ───── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="Bilgi Çağlayanları"
      subtitle="Bir tohum düğümden başlayan bilginin, komşudan komşuya adım adım yayılması. İki klasik model: bağımsız çağlayan ve doğrusal eşik."
      bgGradient="linear-gradient(135deg, #14b8a6, #0d9488)"
      shadow="0 30px 80px -20px rgba(20, 184, 166, 0.6)"
      icon={<Waves className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 5. Çağlayan grafiği (görsel) ───── */
  () => (
    <SlideShell>
      <Eyebrow>Görsel · yayılım adımları</Eyebrow>
      <H2 className="mb-2">Tohumdan dalga dalga yayılım</H2>
      <Sub className="max-w-3xl mb-6">
        Renkler bir düğümün hangi zaman adımında etkilendiğini gösterir.
        Etkilenen her düğüm bir sonraki adımda komşularını etkilemeye çalışır;
        bazı düğümlere (G, I) bilgi hiç ulaşmaz.
      </Sub>
      <CascadeGraph />
    </SlideShell>
  ),

  /* ───── 6. IC vs LT modelleri ───── */
  () => (
    <SlideShell>
      <Eyebrow>İki çağlayan modeli</Eyebrow>
      <H2 className="mb-8">Bağımsız Çağlayan vs. Doğrusal Eşik</H2>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Radio className="w-6 h-6 text-[#5eead4]" />
            <h3 className="text-xl font-semibold text-white">
              Bağımsız Çağlayan (IC)
            </h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Yeni etkilenen her düğüm, her etkilenmemiş komşusunu{" "}
            <span className="text-[#5eead4]">tek bir kez</span> ve{" "}
            <span className="text-[#5eead4]">p olasılığıyla</span> etkilemeye
            dener. Başarısız olursa bir daha denemez.
          </p>
          <ul className="text-sm text-gray-400 space-y-1.5 mb-4">
            <li>· Her kenar bağımsız bir &quot;yazı-tura&quot;.</li>
            <li>· Retweet / viral paylaşıma uygun.</li>
            <li>· &quot;Duydum, bir kez paylaştım&quot; mantığı.</li>
          </ul>
          <div className="saa-card rounded-lg p-3 font-mono text-xs text-[#a7f3d0] text-center">
            P(u &rarr; v) = p<sub>uv</sub> &nbsp; (her komşu için bir deneme)
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <GitBranch className="w-6 h-6 text-gray-300" />
            <h3 className="text-xl font-semibold text-white">
              Doğrusal Eşik (LT)
            </h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Bir düğüm, etkilenmiş komşularının{" "}
            <span className="text-white">ağırlık toplamı</span> kişisel eşiği{" "}
            <span className="text-white">&theta;</span>&apos;yı geçtiğinde
            etkilenir. Tek bir komşu yetmez; birikim gerekir.
          </p>
          <ul className="text-sm text-gray-400 space-y-1.5 mb-4">
            <li>· Akran baskısı / sosyal onay.</li>
            <li>· Yeni teknoloji-alışkanlık benimseme.</li>
            <li>· &quot;Herkes yapıyorsa ben de&quot; mantığı.</li>
          </ul>
          <div className="saa-card rounded-lg p-3 font-mono text-xs text-[#a7f3d0] text-center">
            &Sigma;<sub>u&isin;N(v)</sub> w<sub>uv</sub> &ge; &theta;<sub>v</sub>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 7. Bölüm 2 — SIR / SIS ───── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="SIR & SIS Modelleri"
      subtitle="Epidemiyolojiden ödünç alınan kompartman modelleri. Düğümler S, I, R durumları arasında belirli oranlarla geçer; sosyal yayılımı da aynı dil tarif eder."
      bgGradient="linear-gradient(135deg, #f87171, #b91c1c)"
      shadow="0 30px 80px -20px rgba(248, 113, 113, 0.55)"
      icon={<HeartPulse className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 8. SIR kompartman diyagramı ───── */
  () => (
    <SlideShell>
      <Eyebrow>SIR · kompartman akışı</Eyebrow>
      <H2 className="mb-2">Üç durum, iki geçiş oranı</H2>
      <Sub className="max-w-3xl mb-6">
        Her düğüm üç durumdan birindedir.{" "}
        <span className="saa-state-s">Duyarlı (S)</span> bir düğüm, etkilenmiş bir
        komşusundan β oranıyla{" "}
        <span className="saa-state-i">etkilenir (I)</span>; etkilenmiş bir düğüm
        γ oranıyla <span className="saa-state-r">iyileşip bağışık olur (R)</span>.
      </Sub>
      <SIRDiagram />
    </SlideShell>
  ),

  /* ───── 9. SIS vs SIR davranışı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Tek fark · geri dönüş var mı?</Eyebrow>
      <H2 className="mb-2">SIS ile SIR&apos;ı ayıran kritik soru</H2>
      <Sub className="max-w-3xl mb-6">
        İyileşen bir düğüm tekrar duyarlı hale gelir mi (SIS), yoksa kalıcı
        bağışık mı olur (SIR)? Bu tek farkın uzun vadeli sonucu tamamen değiştirir
        — biri endemik bir dengede kalabilir, diğeri eninde sonunda söner.
      </Sub>
      <ModelBars />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-5 text-center text-[11px] text-gray-500"
      >
        Çubuklar son durumu temsil eden şematik gösterimlerdir; gerçek oranlar β,
        γ ve ağ yapısına göre değişir.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 10. Model karşılaştırma tablosu ───── */
  () => (
    <SlideShell>
      <Eyebrow>Toparlayalım · dört model</Eyebrow>
      <H2 className="mb-2">Hangi yayılıma hangi model?</H2>
      <Sub className="mb-6 max-w-3xl">
        Çağlayan modelleri (IC, LT) ayrık ve geri dönüşsüzdür; kompartman
        modelleri (SIS, SIR) zaman içinde sürekli oranlarla çalışır. Doğru model,
        modellediğin olgunun &quot;hafızasına&quot; bağlıdır.
      </Sub>
      <ThresholdTable />
    </SlideShell>
  ),

  /* ───── 11. Bölüm 3 — Eşik & Pratik ───── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Eşik, R₀ ve Simülasyon"
      subtitle="Yayılım ne zaman patlar, ne zaman söner? Temel üreme sayısı R₀ ile kritik eşiği tanımlıyor, sonra küçük bir NetworkX + EoN simülasyonu kuruyoruz."
      bgGradient="linear-gradient(135deg, #a78bfa, #6d28d9)"
      shadow="0 30px 80px -20px rgba(167, 139, 250, 0.55)"
      icon={<Target className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 12. R0 & eşik ───── */
  () => (
    <SlideShell>
      <Eyebrow>Eşik koşulu · R&#8320;</Eyebrow>
      <H2 className="mb-2">Yayılım büyür mü, söner mi?</H2>
      <Sub className="max-w-3xl mb-8">
        Temel üreme sayısı R&#8320;, etkilenmiş tek bir düğümün ortalama kaç yeni
        düğümü etkilediğidir. Bu basit sayı, yayılımın kaderini belirler.
      </Sub>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            cond: "R₀ < 1",
            color: "#34d399",
            icon: Shield,
            title: "Söner",
            desc: "Her etkilenen ortalama birden az kişiye geçirir. Çağlayan büyüyemez, kendiliğinden biter.",
          },
          {
            cond: "R₀ = 1",
            color: "#fbbf24",
            icon: Activity,
            title: "Kritik eşik",
            desc: "Tam denge. Küçük dalgalanmalar yayılımı patlatabilir ya da söndürebilir.",
          },
          {
            cond: "R₀ > 1",
            color: "#f87171",
            icon: Flame,
            title: "Patlar",
            desc: "Her etkilenen birden fazla kişiye geçirir. Üstel büyüme, geniş çağlayan.",
          },
        ].map((p, i) => (
          <motion.div
            key={p.cond}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="saa-card rounded-xl p-6"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ background: `${p.color}18`, border: `1px solid ${p.color}55` }}
            >
              <p.icon className="w-6 h-6" style={{ color: p.color }} />
            </div>
            <div className="font-mono text-lg font-bold mb-2" style={{ color: p.color }}>
              {p.cond}
            </div>
            <div className="text-base font-semibold text-white mb-1">{p.title}</div>
            <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 saa-card-teal rounded-lg px-4 py-3 text-xs text-gray-300 text-center max-w-3xl mx-auto"
      >
        Basit kompartman modelinde{" "}
        <span className="text-[#5eead4] font-mono">R&#8320; = &beta; / &gamma;</span>
        . Ağ yapısı önemlidir: hub&apos;ların bol olduğu ölçeksiz ağlarda eşik
        çok düşebilir, bu yüzden hedefli aşılama/yavaşlatma etkili olur.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 13. NetworkX + EoN simülasyon ───── */
  () => (
    <SlideShell>
      <Eyebrow>Python · NetworkX + EoN</Eyebrow>
      <H2 className="mb-6">Bir SIR salgınını simüle et</H2>
      <CodeBlock />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-5 text-xs text-gray-500 text-center"
      >
        EoN (Epidemics on Networks) NetworkX üstüne kurulu olay-tabanlı bir
        simülatördür; <span className="text-[#5eead4]">fast_SIR</span> ve{" "}
        <span className="text-[#5eead4]">fast_SIS</span> büyük ağlarda hızlı
        çalışır.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 14. Uygulamalı lab — bu hafta yap-bitir ───── */
  () => {
    const items: Array<{ t: string; d: string; icon: LucideIcon }> = [
      {
        t: "Bir test ağı üret",
        d: "nx.barabasi_albert_graph(1000, 3) ile ölçeksiz bir ağ kur; derece dağılımını çiz.",
        icon: Network,
      },
      {
        t: "SIR ve SIS'i çalıştır",
        d: "EoN.fast_SIR ve fast_SIS ile aynı ağda tau ve gamma değerleri sabitken iki süreci karşılaştır.",
        icon: HeartPulse,
      },
      {
        t: "Eşiği ara",
        d: "tau değerini kademeli artır; toplam etkilenenin (R[-1]) hangi noktada sıçradığını bul.",
        icon: Target,
      },
      {
        t: "Sonucu raporla",
        d: "S/I/R eğrilerini matplotlib ile çiz; tepe etkilenme ve toplam etkileneni 3 cümlede yorumla.",
        icon: BarChart3,
      },
    ];
    return (
      <SlideShell>
        <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
        <H2 className="mb-8">Yayılımı kendi elinle simüle et</H2>
        <div className="space-y-3">
          {items.map((it, i) => (
            <motion.div
              key={it.t}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="saa-card saa-card-hover rounded-xl p-4 flex items-center gap-4"
            >
              <div className="saa-tick w-9 h-9 rounded-md flex items-center justify-center shrink-0">
                <Check className="w-5 h-5" strokeWidth={3} />
              </div>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-[#14b8a6]/15 border border-[#14b8a6]/35">
                <it.icon className="w-4 h-4 text-[#5eead4]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white">{it.t}</div>
                <div className="text-xs text-gray-400 mt-0.5">{it.d}</div>
              </div>
              <div className="text-[10px] font-mono text-gray-600">
                #{String(i + 1).padStart(2, "0")}
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-5 saa-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3 max-w-4xl"
        >
          <Database className="w-4 h-4 text-[#5eead4] mt-0.5 flex-shrink-0" />
          <span>
            Kurulum: <span className="text-[#5eead4] font-mono">pip install networkx EoN matplotlib</span>{" "}
            &middot; Colab da uygundur. Çıktıları sonraki derse getir.
          </span>
        </motion.div>
      </SlideShell>
    );
  },

  /* ───── 15. Sıradaki hafta + kapanış ───── */
  () => (
    <SlideShell>
      <div className="text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-3xl items-center justify-center mb-8 saa-pulse"
          style={{
            background: "linear-gradient(135deg, #14b8a6, #0d9488)",
            boxShadow: "0 20px 60px -10px rgba(20, 184, 166, 0.6)",
          }}
        >
          <Share2 className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>11. hafta tamamlandı · sıradaki: Etki Maksimizasyonu</Eyebrow>
        <H1 className="saa-shimmer-teal">Kimi Tohumlamalı?</H1>
        <Sub className="mt-6">
          Bu hafta yayılımın <span className="text-[#5eead4]">nasıl</span>{" "}
          işlediğini gördük. 12. haftada tersini soruyoruz: en geniş çağlayanı
          başlatmak için <span className="text-[#5eead4]">hangi k düğümü</span>{" "}
          tohum seçmeli? Etki maksimizasyonu ve açgözlü (greedy) algoritma.
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 text-left"
        >
          <div className="saa-card rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#14b8a6]/15 border border-[#14b8a6]/35 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-[#5eead4]" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500">
                Ders Saati
              </div>
              <div className="text-sm font-semibold text-white">
                Cuma · 09:55 – 11:35
              </div>
            </div>
          </div>
          <div className="saa-card rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#14b8a6]/15 border border-[#14b8a6]/35 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-[#5eead4]" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500">
                Derslik
              </div>
              <div className="text-sm font-semibold text-white">
                MYO · Derslik 7
              </div>
            </div>
          </div>
          <div className="saa-card rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#14b8a6]/15 border border-[#14b8a6]/35 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-[#5eead4]" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500">
                Teslim
              </div>
              <div className="text-sm font-semibold text-white">
                Simülasyon raporu
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 inline-flex items-center gap-2 text-xs font-mono text-gray-500"
        >
          <Clock className="w-3.5 h-3.5" />
          BVA 2105 · Sosyal Ağ Analizi · 2026 Bahar
        </motion.div>
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
            background: "linear-gradient(90deg, #14b8a6, #5eead4, #14b8a6)",
            boxShadow: "0 0 16px rgba(20,184,166,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#14b8a6]/70">
          BVA 2105 · 11. Hafta · Ağlarda Etki ve Yayılım
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[#14b8a6]/50">
            <span className="text-[#14b8a6]">
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
            className="p-1.5 text-gray-500 hover:text-[#14b8a6] transition-colors"
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
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#14b8a6] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
                  ? "w-5 bg-[#14b8a6]"
                  : "w-1.5 bg-white/15 hover:bg-white/40"
              }`}
              style={
                i === current
                  ? { boxShadow: "0 0 10px rgba(20,184,166,0.6)" }
                  : undefined
              }
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#14b8a6] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
