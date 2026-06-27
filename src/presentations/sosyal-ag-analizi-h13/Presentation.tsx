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
  GitBranch,
  Target,
  Users,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  Shuffle,
  Hash,
  Layers,
  Database,
  Search,
  Code2,
  MapPin,
  Clock,
  Mail,
  Calendar,
  Filter,
  Crosshair,
  Scaling,
  AlertTriangle,
  Footprints,
  Waypoints,
  Dice5,
  TableProperties,
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
   TOPIC MOCKUPS — AĞ ÖRNEKLEME
   ============================================================ */

type SampleNode = {
  id: string;
  x: number;
  y: number;
  /** örnekleme adımı (0 = henüz alınmadı) */
  step?: number;
  seed?: boolean;
};

type SampleEdge = { from: string; to: string };

const samplingNodes: SampleNode[] = [
  { id: "n1", x: 110, y: 90 },
  { id: "n2", x: 250, y: 60 },
  { id: "n3", x: 400, y: 80, seed: true, step: 1 },
  { id: "n4", x: 560, y: 70 },
  { id: "n5", x: 690, y: 130 },
  { id: "n6", x: 180, y: 220 },
  { id: "n7", x: 330, y: 210, step: 2 },
  { id: "n8", x: 480, y: 220, step: 3 },
  { id: "n9", x: 640, y: 250 },
  { id: "n10", x: 120, y: 360 },
  { id: "n11", x: 290, y: 360, step: 4 },
  { id: "n12", x: 470, y: 360 },
  { id: "n13", x: 640, y: 370 },
];

const samplingEdges: SampleEdge[] = [
  { from: "n1", to: "n2" },
  { from: "n2", to: "n3" },
  { from: "n3", to: "n4" },
  { from: "n4", to: "n5" },
  { from: "n3", to: "n7" },
  { from: "n7", to: "n8" },
  { from: "n8", to: "n9" },
  { from: "n7", to: "n11" },
  { from: "n11", to: "n12" },
  { from: "n12", to: "n13" },
  { from: "n6", to: "n7" },
  { from: "n6", to: "n10" },
  { from: "n1", to: "n6" },
  { from: "n8", to: "n4" },
  { from: "n9", to: "n13" },
];

/**
 * Snowball / kartopu örneklemesini görselleştirir: seed düğümden başlayıp
 * komşulara doğru dalga dalga genişleyen bir alt-ağ.
 */
function SnowballMockup() {
  const find = (id: string) => samplingNodes.find((n) => n.id === id)!;
  const inSample = (n: SampleNode) => (n.step ?? 0) > 0;
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
          <span>snowball_sample · seed=n3 · dalga 0→2 · 13 düğüm evrenden 5 örnek</span>
        </div>
      </div>
      <div className="p-4 bg-[#070b0a]">
        <svg viewBox="0 0 800 440" className="w-full h-auto">
          <defs>
            <radialGradient id="seedGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#5eead4" />
              <stop offset="100%" stopColor="#0d9488" />
            </radialGradient>
            <radialGradient id="sampleGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0d9488" />
              <stop offset="100%" stopColor="#134e4a" />
            </radialGradient>
            <radialGradient id="outGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1f2937" />
              <stop offset="100%" stopColor="#111827" />
            </radialGradient>
          </defs>

          {samplingEdges.map((e, i) => {
            const a = find(e.from);
            const b = find(e.to);
            const sampled = inSample(a) && inSample(b);
            return (
              <line
                key={`se-${i}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={sampled ? "#14b8a6" : "#374151"}
                strokeWidth={sampled ? 2.2 : 1.2}
                strokeOpacity={sampled ? 0.8 : 0.4}
              />
            );
          })}

          {samplingNodes.map((n) => {
            const sampled = inSample(n);
            return (
              <g key={n.id}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={n.seed ? 26 : sampled ? 20 : 15}
                  fill={
                    n.seed
                      ? "url(#seedGrad)"
                      : sampled
                      ? "url(#sampleGrad)"
                      : "url(#outGrad)"
                  }
                  stroke={n.seed ? "#5eead4" : sampled ? "#2dd4bf" : "#374151"}
                  strokeWidth={n.seed ? 2.5 : sampled ? 1.8 : 1}
                  className={n.seed ? "saa-node-pulse" : ""}
                />
                {sampled && (
                  <text
                    x={n.x}
                    y={n.y + 4}
                    textAnchor="middle"
                    fontSize={n.seed ? 12 : 10}
                    fontWeight={700}
                    fill="#ffffff"
                    fontFamily="Inter, sans-serif"
                  >
                    {n.seed ? "seed" : `d${n.step}`}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        <div className="mt-1 flex items-center justify-center gap-5 text-[11px] text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ background: "#0d9488" }} />
            Örnekte (5)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ background: "#1f2937", border: "1px solid #374151" }} />
            Evrende ama örnek dışında (8)
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Random Node vs Random Walk farkını yan yana gösteren küçük diyagram.
 */
function MiniRandomNode() {
  const pts = [
    { x: 50, y: 50, on: true },
    { x: 130, y: 35, on: false },
    { x: 210, y: 55, on: false },
    { x: 70, y: 120, on: false },
    { x: 150, y: 110, on: true },
    { x: 220, y: 125, on: false },
    { x: 45, y: 185, on: false },
    { x: 135, y: 180, on: false },
    { x: 215, y: 185, on: true },
  ];
  return (
    <svg viewBox="0 0 260 220" className="w-full h-auto">
      {pts.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={p.on ? 12 : 8}
          fill={p.on ? "#0d9488" : "#1f2937"}
          stroke={p.on ? "#5eead4" : "#374151"}
          strokeWidth={p.on ? 2 : 1}
        />
      ))}
    </svg>
  );
}

function MiniRandomWalk() {
  const path = [
    { x: 40, y: 60 },
    { x: 120, y: 40 },
    { x: 175, y: 100 },
    { x: 110, y: 150 },
    { x: 180, y: 185 },
    { x: 60, y: 170 },
  ];
  return (
    <svg viewBox="0 0 260 220" className="w-full h-auto">
      <defs>
        <marker
          id="walk-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#5eead4" />
        </marker>
      </defs>
      {path.slice(1).map((p, i) => {
        const a = path[i];
        return (
          <line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={p.x}
            y2={p.y}
            stroke="#5eead4"
            strokeWidth={2}
            strokeOpacity={0.85}
            markerEnd="url(#walk-arrow)"
          />
        );
      })}
      {path.map((p, i) => (
        <g key={`w-${i}`}>
          <circle
            cx={p.x}
            cy={p.y}
            r={12}
            fill="#0d9488"
            stroke="#5eead4"
            strokeWidth={2}
          />
          <text
            x={p.x}
            y={p.y + 4}
            textAnchor="middle"
            fontSize={10}
            fontWeight={700}
            fill="#fff"
            fontFamily="Inter, sans-serif"
          >
            {i + 1}
          </text>
        </g>
      ))}
    </svg>
  );
}

function MethodComparison() {
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
            <th style={{ width: "16%" }}>Yöntem</th>
            <th>Nasıl çalışır?</th>
            <th>Güçlü yanı</th>
            <th>Yanlılık (bias) riski</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="saa-row-head">Random Node</td>
            <td>Düğümleri eşit olasılıkla rastgele seç.</td>
            <td>Derece dağılımını görece korur; basit.</td>
            <td>Seçilen düğümler arasında kenar az kalır — ağ kopuk görünür.</td>
          </tr>
          <tr>
            <td className="saa-row-head">Random Edge</td>
            <td>Kenarları rastgele seç, uçlarını örneğe al.</td>
            <td>Bağlı bir alt-ağ üretmesi daha olası.</td>
            <td>Yüksek dereceli düğümlere doğru yanlı (orantısız seçilir).</td>
          </tr>
          <tr>
            <td className="saa-row-head">Snowball / BFS</td>
            <td>Seed düğümden komşulara dalga dalga genişle.</td>
            <td>Gizli/erişimi zor topluluklara ulaşır.</td>
            <td>Merkezi, yüksek dereceli düğümleri aşırı temsil eder.</td>
          </tr>
          <tr>
            <td className="saa-row-head">Random Walk</td>
            <td>Bir düğümden başla, komşuya rastgele adımla.</td>
            <td>Büyük ağda API kotasıyla uyumlu, yerel.</td>
            <td>Dereceyle orantılı yanlılık; RDS/MHRW ile düzeltilir.</td>
          </tr>
        </tbody>
      </table>
    </motion.div>
  );
}

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
          <span>network_sampling.py · Python 3.12 · NetworkX 3.3 · Little Ball of Fur</span>
        </div>
      </div>
      <pre className="saa-code p-6 overflow-x-auto m-0">
        <code>
          <span className="saa-code-cmt"># 1) Büyük bir ağ (evren) hazırla — örn. 5000 düğümlü ölçeksiz ağ</span>
          {"\n"}
          <span className="saa-code-kw">import</span>{" "}
          <span className="saa-code-fn">networkx</span>{" "}
          <span className="saa-code-kw">as</span>{" "}
          <span className="saa-code-fn">nx</span>
          {"\n"}
          <span className="saa-code-kw">from</span>{" "}
          <span className="saa-code-fn">littleballoffur</span>{" "}
          <span className="saa-code-kw">import</span> RandomWalkSampler, SnowBallSampler
          {"\n"}
          {"\n"}
          G = nx.<span className="saa-code-fn">barabasi_albert_graph</span>(
          <span className="saa-code-num">5000</span>,{" "}
          <span className="saa-code-num">4</span>, seed=
          <span className="saa-code-num">42</span>)
          {"\n"}
          {"\n"}
          <span className="saa-code-cmt"># 2) Rastgele yürüyüş ile ~%10 örnek al</span>
          {"\n"}
          rw = <span className="saa-code-fn">RandomWalkSampler</span>(
          number_of_nodes=<span className="saa-code-num">500</span>, seed=
          <span className="saa-code-num">42</span>)
          {"\n"}
          G_rw = rw.<span className="saa-code-fn">sample</span>(G)
          {"\n"}
          {"\n"}
          <span className="saa-code-cmt"># 3) Kartopu (snowball) ile karşılaştır</span>
          {"\n"}
          sb = <span className="saa-code-fn">SnowBallSampler</span>(
          number_of_nodes=<span className="saa-code-num">500</span>, k=
          <span className="saa-code-num">50</span>, seed=
          <span className="saa-code-num">42</span>)
          {"\n"}
          G_sb = sb.<span className="saa-code-fn">sample</span>(G)
          {"\n"}
          {"\n"}
          <span className="saa-code-cmt"># 4) Örneğin evreni ne kadar koruduğunu ölç</span>
          {"\n"}
          <span className="saa-code-kw">for</span> ad, alt{" "}
          <span className="saa-code-kw">in</span> [(
          <span className="saa-code-str">&quot;walk&quot;</span>, G_rw), (
          <span className="saa-code-str">&quot;snowball&quot;</span>, G_sb)]:
          {"\n"}
          {"    "}
          <span className="saa-code-fn">print</span>(ad, alt.
          <span className="saa-code-fn">number_of_nodes</span>(),{" "}
          <span className="saa-code-fn">round</span>(nx.
          <span className="saa-code-fn">density</span>(alt),{" "}
          <span className="saa-code-num">4</span>))
        </code>
      </pre>
    </motion.div>
  );
}

function BiasBar({
  label,
  pct,
  caption,
  delay = 0,
}: {
  label: string;
  pct: number;
  caption: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="saa-card rounded-lg p-4"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-white">{label}</span>
        <span className="text-xs font-mono text-[#5eead4]">{pct}%</span>
      </div>
      <div className="saa-bar-track">
        <motion.div
          className="saa-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, delay: delay + 0.15, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <div className="text-[11px] text-gray-500 mt-2">{caption}</div>
    </motion.div>
  );
}

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ─────────────────  AÇILIŞ  ───────────────── */

  // 1 — Kapak
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2105 · 13. Hafta — Sosyal Ağ Analizi</Eyebrow>
        <H1 className="saa-shimmer">
          Ağ Örnekleme
          <br />
          Teknikleri
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Milyonlarca düğümlü bir ağı bütün indiremezsin. Peki temsil eden küçük
          bir parçayı nasıl, hangi yanlılıkla seçersin?
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={Dice5}
            title="Düğüm &amp; kenar örnekleme"
            desc="Random node, random edge — en temel rastgele seçim aileleri."
            accent="#14b8a6"
            delay={0.3}
          />
          <FeatureCard
            icon={Footprints}
            title="Gezinme tabanlı"
            desc="Snowball / BFS ve random walk — komşuluk üzerinden büyüyen örnek."
            accent="#0d9488"
            delay={0.45}
          />
          <FeatureCard
            icon={Scaling}
            title="Yanlılık &amp; kalite"
            desc="Örnek evreni temsil ediyor mu? Bias nasıl ölçülür ve düzeltilir?"
            accent="#5eead4"
            delay={0.6}
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 inline-flex items-center gap-2 text-xs font-mono text-gray-500"
        >
          <Calendar className="w-3.5 h-3.5" />
          Cuma · 09:55 – 11:35 · NetworkX + Little Ball of Fur ile uygulama
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 2 — Geçen haftadan köprü / bu haftanın hedefi
  () => (
    <SlideShell>
      <Eyebrow>Köprü · neyi neden örnekliyoruz?</Eyebrow>
      <H2>Önceki haftalar tüm ağ elimizdeydi; gerçekte çoğu zaman değildir</H2>
      <Sub className="mt-3 max-w-3xl">
        Karate Club 34 düğümdü, kolayca tümünü işledik. Ama Twitter/X takip ağı
        milyarlarca kenar, API kotaları sınırlı, RAM yetmez. Bu hafta soru
        değişiyor: tümünü değil, <span className="text-[#5eead4]">temsil eden bir
        alt-ağı</span> nasıl seçeriz?
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#67e8f9]">
            <Database className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Neden örnekleme zorunlu?
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />
              Ağın tamamı erişilemez (API limiti, gizlilik, oran sınırı).
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />
              Hesaplama maliyeti: bazı metrikler O(n³) — milyonlarca düğümde imkânsız.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />
              Hızlı keşif: önce küçük örnekte hipotez kur, sonra ölçekle.
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#5eead4]">
            <Target className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Bu haftanın hedefi
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] flex-shrink-0" />
              Dört örnekleme ailesini ayırt etmek ve uygun olanı seçmek.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] flex-shrink-0" />
              Her yöntemin getirdiği yanlılığı (bias) tanımak.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] flex-shrink-0" />
              Örneğin evreni ne kadar koruduğunu sayısal olarak ölçmek.
            </li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 3 — Evren / örnek terminolojisi
  () => (
    <SlideShell>
      <Eyebrow>Temel terimler</Eyebrow>
      <H2 className="mb-2">Evren, örnek ve indüklenmiş alt-graf</H2>
      <Sub className="max-w-3xl mb-8">
        Ağ örneklemesi, klasik anket örneklemesine benzer ama bir farkla: birim
        bağımsız değil. Bir düğümü seçmek, ona bağlı kenarları da etkiler.
      </Sub>
      <div className="grid md:grid-cols-3 gap-5">
        <FeatureCard
          icon={Network}
          title="Evren (population)"
          desc="Gerçek tam ağ G = (V, E). Çoğu zaman tamamına hiç erişemeyiz; varlığını bilir, parçasını görürüz."
          accent="#14b8a6"
          delay={0.1}
        />
        <FeatureCard
          icon={Filter}
          title="Örnek (sample)"
          desc="Seçtiğimiz düğüm alt-kümesi Vs ⊆ V ve aralarındaki kenarlar. Amaç: küçük ama temsil edici."
          accent="#0d9488"
          delay={0.25}
        />
        <FeatureCard
          icon={GitBranch}
          title="İndüklenmiş alt-graf"
          desc="Seçilen düğümler arasındaki TÜM kenarları tutan alt-ağ. Kenarları nasıl dahil ettiğin metrikleri değiştirir."
          accent="#5eead4"
          delay={0.4}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="mt-6 saa-card-teal rounded-xl p-5 text-center font-mono text-sm text-[#a7f3d0]"
      >
        Gs = (Vs, Es) &nbsp;·&nbsp; Vs ⊆ V &nbsp;·&nbsp; Es = {"{ (u,v) ∈ E : u,v ∈ Vs }"}
      </motion.div>
    </SlideShell>
  ),

  // 4 — Neyi korumak istiyoruz?
  () => (
    <SlideShell>
      <Eyebrow>Kalite ölçütü</Eyebrow>
      <H2 className="mb-2">İyi örnek neyi korur?</H2>
      <Sub className="max-w-3xl mb-8">
        &ldquo;Temsil edici&rdquo; soyut bir söz değil — örneğin, evrenin hangi
        yapısal özelliklerini ne kadar koruduğuyla ölçülür.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BiasBar
          label="Derece dağılımı"
          pct={82}
          caption="Random node yöntemi derece dağılımını görece iyi korur."
          delay={0.1}
        />
        <BiasBar
          label="Kümelenme katsayısı"
          pct={61}
          caption="Snowball yerel üçgenleri şişirme eğiliminde; korunum orta."
          delay={0.2}
        />
        <BiasBar
          label="Bağlılık / bileşen yapısı"
          pct={45}
          caption="Random node örneği çoğu kez kopuk; bağlılık zayıf korunur."
          delay={0.3}
        />
        <BiasBar
          label="En kısa yol uzunluğu"
          pct={70}
          caption="Random walk yolları görece korur ama dereceye yanlıdır."
          delay={0.4}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-5 text-[11px] text-gray-500 text-center"
      >
        Çubuklar yöntemleri kıyaslamak için örnek/temsilî değerlerdir; gerçek
        korunum ağa ve örnek oranına göre değişir.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  1. DÜĞÜM/KENAR ÖRNEKLEME  ───────────────── */

  // 5 — Section divider 1/3
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Düğüm &amp; Kenar Örnekleme"
      subtitle="En temel iki rastgele aile: düğümleri mi yoksa kenarları mı seçeceğiz?"
      bgGradient="linear-gradient(135deg, #14b8a6, #0d9488)"
      shadow="0 20px 60px -10px rgba(20, 184, 166, 0.6)"
      icon={<Dice5 className="w-16 h-16 text-white" />}
    />
  ),

  // 6 — Random Node vs Random Edge
  () => (
    <SlideShell>
      <Eyebrow>1 / 4 ve 2 / 4 — Düğüm ve kenar</Eyebrow>
      <H2 className="mb-8">Random Node ve Random Edge örnekleme</H2>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Crosshair className="w-6 h-6 text-[#5eead4]" />
            <h3 className="text-xl font-semibold text-white">Random Node (RN)</h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Her düğümü <span className="text-[#5eead4] font-semibold">eşit
            olasılıkla</span> bağımsız seç; sonra aralarındaki kenarları al.
          </p>
          <div className="saa-card rounded-lg p-3 mb-3">
            <MiniRandomNode />
          </div>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>+ Derece dağılımı görece korunur.</li>
            <li>− Seçilenler arasında az kenar kalır → ağ kopuk görünür.</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <GitBranch className="w-6 h-6 text-gray-300" />
            <h3 className="text-xl font-semibold text-white">Random Edge (RE)</h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Kenarları rastgele seç,{" "}
            <span className="text-gray-200 font-semibold">uçlarını</span> örneğe
            ekle. Bağlı bir alt-ağ üretmesi daha olasıdır.
          </p>
          <div className="saa-card rounded-lg p-3 mb-3">
            <MiniRandomWalk />
          </div>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>+ Örnek daha bağlantılı çıkar.</li>
            <li>− Yüksek dereceli düğümler orantısız sık seçilir (bias).</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 7 — Derece yanlılığı (neden RE yanlı?)
  () => (
    <SlideShell>
      <Eyebrow>Dikkat · derece yanlılığı</Eyebrow>
      <H2 className="mb-2">Neden kenar seçmek yüksek dereceyi kayırır?</H2>
      <Sub className="max-w-3xl mb-8">
        Bir düğüm ne kadar çok kenara sahipse, rastgele seçilen bir kenarın o
        düğüme dokunma olasılığı o kadar yüksektir. Bu, &ldquo;arkadaşlık
        paradoksu&rdquo;nun örnekleme yüzüdür.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-wider text-[#5eead4] mb-3">
            Seçilme olasılığı
          </div>
          <p className="text-base text-gray-200 leading-relaxed mb-5">
            Rastgele bir kenar üzerinden bir düğüme ulaşma olasılığı,{" "}
            <span className="text-[#5eead4]">derecesiyle orantılıdır</span>:
          </p>
          <div className="saa-card rounded-lg p-4 font-mono text-sm text-[#a7f3d0] text-center">
            P(v seçilir) ∝ deg(v)
          </div>
          <div className="mt-3 text-xs text-gray-500">
            Random node&apos;da bu olasılık tüm düğümler için eşittir (1/n).
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-wider text-gray-400 mb-3">
            Sonuç olarak
          </div>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-3">
              <Hash className="w-5 h-5 text-[#5eead4] mt-0.5" />
              <span>
                Örneklenen ortalama derece, gerçek ortalamadan{" "}
                <span className="text-[#5eead4]">büyük</span> çıkar.
              </span>
            </li>
            <li className="flex gap-3">
              <Scaling className="w-5 h-5 text-[#5eead4] mt-0.5" />
              <span>
                Hub&apos;lar neredeyse her örnekte; uç (düşük dereceli) düğümler
                sık atlanır.
              </span>
            </li>
            <li className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-[#5eead4] mt-0.5" />
              <span>
                Düzeltme için ağırlıklandırma (Horvitz-Thompson tipi) ya da
                yöntem değiştirmek gerekir.
              </span>
            </li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  2. GEZİNME TABANLI  ───────────────── */

  // 8 — Section divider 2/3
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Gezinme Tabanlı Örnekleme"
      subtitle="Bir tohum düğümden başlayıp komşuluklar boyunca büyüyen örnekler: snowball ve random walk."
      bgGradient="linear-gradient(135deg, #0d9488, #134e4a)"
      shadow="0 20px 60px -10px rgba(13, 148, 136, 0.6)"
      icon={<Footprints className="w-16 h-16 text-white" />}
    />
  ),

  // 9 — Snowball / BFS
  () => (
    <SlideShell>
      <Eyebrow>3 / 4 — Kartopu (Snowball / BFS)</Eyebrow>
      <H2 className="mb-4">Snowball Sampling</H2>
      <Sub className="mb-8">
        Bir seed düğümden başla; komşularını, sonra komşularının komşularını ekle.
        Dalga dalga büyüyen bir alt-ağ.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-wider text-[#5eead4] mb-3">
            Nasıl çalışır?
          </div>
          <ol className="space-y-3 text-sm text-gray-300 list-decimal list-inside">
            <li>Bir veya birkaç seed düğüm seç (dalga 0).</li>
            <li>Onların komşularını ekle (dalga 1).</li>
            <li>Yeni eklenenlerin komşularını ekle (dalga 2)…</li>
            <li>İstenen örnek boyutuna ulaşınca dur.</li>
          </ol>
          <div className="mt-4 saa-badge">BFS ile aynı genişleme mantığı</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-wider text-gray-400 mb-3">
            Nerede vazgeçilmez?
          </div>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-3">
              <Users className="w-5 h-5 text-[#5eead4] mt-0.5" />
              <span>
                Erişimi zor, gizli popülasyonlar (örn. yönlendirmeyle ulaşılan
                topluluklar).
              </span>
            </li>
            <li className="flex gap-3">
              <Search className="w-5 h-5 text-[#5eead4] mt-0.5" />
              <span>
                API ile büyük ağı keşfetmek: yalnız komşu listesini çekip ilerlersin.
              </span>
            </li>
            <li className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-[#5eead4] mt-0.5" />
              <span>
                Yanlılık: merkezi/yüksek dereceli düğümleri aşırı temsil eder,
                seed seçimine duyarlıdır.
              </span>
            </li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 10 — Snowball görsel (büyük mockup)
  () => (
    <SlideShell>
      <Eyebrow>Görsel · kartopu büyümesi</Eyebrow>
      <H2 className="mb-6">Seed&apos;den dalga dalga büyüyen örnek</H2>
      <SnowballMockup />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-5 text-center text-xs text-gray-500"
      >
        <span className="text-[#5eead4]">seed</span> ve ulaşılan komşular örneğe
        girer; uzaktaki düğümler örnek dışında kalır. Farklı seed seçimi farklı
        bir alt-ağ verir — sonuçların seed&apos;e bağımlılığını bu yüzden raporlamak gerekir.
      </motion.div>
    </SlideShell>
  ),

  // 11 — Random Walk + RDS/MHRW
  () => (
    <SlideShell>
      <Eyebrow>4 / 4 — Rastgele Yürüyüş (Random Walk)</Eyebrow>
      <H2 className="mb-4">Random Walk &amp; düzeltmeleri</H2>
      <Sub className="mb-8">
        Bir düğümden başla, her adımda rastgele bir komşuya geç. Büyük ağlarda en
        çok kullanılan, API dostu yöntem.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-wider text-[#5eead4] mb-3">
            Temel fikir
          </div>
          <p className="text-base text-gray-200 leading-relaxed mb-4">
            Yürüyüş, ziyaret olasılığı{" "}
            <span className="text-[#5eead4]">dereceyle orantılı</span> bir
            durağan dağılıma yakınsar:
          </p>
          <div className="saa-card rounded-lg p-4 font-mono text-sm text-[#a7f3d0] text-center">
            π(v) = deg(v) / 2|E|
          </div>
          <div className="mt-3 text-xs text-gray-500">
            Yani ham random walk da yüksek dereceye yanlıdır — ama bu yanlılık
            <span className="text-[#5eead4]"> bilinir ve düzeltilebilir</span>.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-wider text-gray-400 mb-3">
            Yaygın varyantlar
          </div>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-3">
              <Waypoints className="w-5 h-5 text-[#5eead4] mt-0.5" />
              <span>
                <span className="text-[#5eead4]">RDS</span> (Respondent-Driven
                Sampling): derece-bilgisiyle ağırlık vererek yanlılığı düzeltir.
              </span>
            </li>
            <li className="flex gap-3">
              <Shuffle className="w-5 h-5 text-[#5eead4] mt-0.5" />
              <span>
                <span className="text-[#5eead4]">MHRW</span>
                (Metropolis-Hastings RW): düğümleri eşit olasılığa yaklaştırır.
              </span>
            </li>
            <li className="flex gap-3">
              <Layers className="w-5 h-5 text-[#5eead4] mt-0.5" />
              <span>
                <span className="text-[#5eead4]">Forest Fire</span>: yürüyüş +
                olasılıksal dallanma; topluluk yapısını iyi yakalar.
              </span>
            </li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3. PRATİKTE  ───────────────── */

  // 12 — Section divider 3/3
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Pratikte"
      subtitle="Yöntem karşılaştırması, NetworkX kodu ve bu hafta yapılacak uygulama."
      bgGradient="linear-gradient(135deg, #0d9488, #115e59)"
      shadow="0 20px 60px -10px rgba(13, 148, 136, 0.6)"
      icon={<TableProperties className="w-16 h-16 text-white" />}
    />
  ),

  // 13 — Yöntem karşılaştırma tablosu
  () => (
    <SlideShell>
      <Eyebrow>Toparlayalım</Eyebrow>
      <H2 className="mb-2">Dört yöntem yan yana</H2>
      <Sub className="mb-6">
        &ldquo;En iyi yöntem&rdquo; yoktur; soru ve kısıt &mdash; ne korumak
        istediğin ve hangi erişimin olduğu &mdash; yöntemi belirler.
      </Sub>
      <MethodComparison />
    </SlideShell>
  ),

  // 14 — Python / NetworkX kod
  () => (
    <SlideShell>
      <Eyebrow>Python · NetworkX + Little Ball of Fur</Eyebrow>
      <H2 className="mb-6">Örnekle, sonra evrenle kıyasla</H2>
      <CodeBlock />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-5 text-xs text-gray-500 text-center"
      >
        Little Ball of Fur, onlarca örnekleme algoritmasını tek arayüzde toplar.
        Aynı seed ile karşılaştırma yaparak örneğin{" "}
        <span className="text-[#5eead4]">yoğunluk</span> ve{" "}
        <span className="text-[#5eead4]">derece</span> korunumunu raporlayabilirsin.
      </motion.div>
    </SlideShell>
  ),

  // 15 — Bu hafta yapılacaklar (uygulama)
  () => {
    const items: Array<{ t: string; d: string; icon: LucideIcon }> = [
      {
        t: "Evren ağını hazırla",
        d: "nx.barabasi_albert_graph(5000, 4) ile ölçeksiz bir ağ üret; ortalama derece ve yoğunluğu not et.",
        icon: Database,
      },
      {
        t: "Üç farklı örnek al",
        d: "Random node, snowball ve random walk ile ~%10 (≈500 düğüm) örnek çıkar. Hepsinde aynı seed kullan.",
        icon: Dice5,
      },
      {
        t: "Korunumu ölç",
        d: "Her örnek için ortalama derece, yoğunluk ve kümelenme katsayısını evrenle karşılaştır; tabloya yaz.",
        icon: Scaling,
      },
      {
        t: "Yanlılığı yorumla",
        d: "Hangi yöntem hangi metriği daha iyi korudu? 4-5 cümlede yöntem seçimini gerekçelendir.",
        icon: TableProperties,
      },
    ];
    return (
      <SlideShell>
        <Eyebrow>Bu hafta · uygulamalı görev</Eyebrow>
        <H2 className="mb-8">Örnekle, ölç, karşılaştır</H2>
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
          transition={{ delay: 0.7 }}
          className="mt-6 saa-card-teal rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
        >
          <AlertTriangle className="w-4 h-4 text-[#5eead4] mt-0.5 flex-shrink-0" />
          <span>
            <span className="text-white">İpucu:</span> Karşılaştırmanın adil
            olması için her yöntemde aynı örnek boyutunu ve aynı rastgelelik
            tohumunu (seed) kullan; aksi halde farkın yöntemden mi yoksa şanstan
            mı geldiğini ayıramazsın.
          </span>
        </motion.div>
      </SlideShell>
    );
  },

  // 16 — Sıradaki hafta + kapanış
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
        <Eyebrow>13. hafta tamamlandı · sıradaki: proje sunumları</Eyebrow>
        <H1 className="saa-shimmer-teal">Teşekkürler</H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta büyük ağı küçük ama temsil edici bir parçaya indirdik. Hafta
          14&apos;te kendi topladığınız ağ üzerinde dönem projelerini sunuyoruz —
          örnekleme kararınızı da gerekçeleriyle anlatacaksınız.
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
                Karşılaştırma raporu
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
            background: "linear-gradient(90deg, #14b8a6, #5eead4, #14b8a6)",
            boxShadow: "0 0 16px rgba(20,184,166,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#14b8a6]/70">
          BVA 2105 · 13. Hafta · Ağ Örnekleme Teknikleri
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
