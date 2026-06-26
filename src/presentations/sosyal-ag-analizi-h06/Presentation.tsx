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
  Activity,
  Target,
  Clock,
  Users,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  Repeat,
  Dice5,
  Scale,
  Hash,
  TrendingUp,
  Brain,
  Lightbulb,
  GraduationCap,
  Database,
  Sigma,
  Code2,
  ArrowRight,
  MapPin,
  Mail,
  Calendar,
  Layers,
  Filter,
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
   TOPIC MOCKUPS
   ============================================================ */

type PanelNode = { id: string; x: number; y: number };
type PanelEdge = [string, string];

const PANEL_NODES: PanelNode[] = [
  { id: "A", x: 90, y: 70 },
  { id: "B", x: 250, y: 50 },
  { id: "C", x: 320, y: 190 },
  { id: "D", x: 170, y: 240 },
  { id: "E", x: 50, y: 200 },
];

function panelNode(id: string) {
  return PANEL_NODES.find((n) => n.id === id)!;
}

function PanelWave({
  label,
  edges,
  newEdges = [],
  goneEdges = [],
}: {
  label: string;
  edges: PanelEdge[];
  newEdges?: PanelEdge[];
  goneEdges?: PanelEdge[];
}) {
  const isNew = (a: string, b: string) =>
    newEdges.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
  return (
    <div className="saa-card rounded-xl p-4">
      <div className="text-[11px] font-mono uppercase tracking-wider text-[#5eead4] mb-2 text-center">
        {label}
      </div>
      <svg viewBox="0 0 370 290" className="w-full h-auto">
        {goneEdges.map(([a, b], i) => {
          const na = panelNode(a);
          const nb = panelNode(b);
          return (
            <line
              key={`gone-${i}`}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke="#f87171"
              strokeWidth={1.5}
              strokeOpacity={0.5}
              strokeDasharray="3 4"
            />
          );
        })}
        {edges.map(([a, b], i) => {
          const na = panelNode(a);
          const nb = panelNode(b);
          const fresh = isNew(a, b);
          return (
            <line
              key={`e-${i}`}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke={fresh ? "#5eead4" : "#475569"}
              strokeWidth={fresh ? 2.4 : 1.5}
              strokeOpacity={fresh ? 0.95 : 0.6}
              className={fresh ? "saa-edge-new" : ""}
            />
          );
        })}
        {PANEL_NODES.map((n) => (
          <g key={n.id}>
            <circle
              cx={n.x}
              cy={n.y}
              r={17}
              fill="#1f2937"
              stroke="#5eead4"
              strokeWidth={1.6}
            />
            <text
              x={n.x}
              y={n.y + 5}
              textAnchor="middle"
              fontSize={13}
              fontWeight={700}
              fill="#ffffff"
              fontFamily="Inter, sans-serif"
            >
              {n.id}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function PanelMockup() {
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
          <span>panel · 5 aktör · 3 gözlem dalgası (wave)</span>
        </div>
      </div>
      <div className="p-4 bg-[#070b0a] grid grid-cols-1 md:grid-cols-3 gap-3">
        <PanelWave
          label="t1 — dönem başı"
          edges={[
            ["A", "B"],
            ["B", "C"],
            ["C", "D"],
          ]}
        />
        <PanelWave
          label="t2 — dönem ortası"
          edges={[
            ["A", "B"],
            ["B", "C"],
            ["C", "D"],
            ["D", "E"],
          ]}
          newEdges={[["D", "E"]]}
          goneEdges={[]}
        />
        <PanelWave
          label="t3 — dönem sonu"
          edges={[
            ["A", "B"],
            ["B", "C"],
            ["D", "E"],
            ["A", "E"],
            ["B", "D"],
          ]}
          newEdges={[
            ["A", "E"],
            ["B", "D"],
          ]}
          goneEdges={[["C", "D"]]}
        />
      </div>
      <div className="px-4 pb-3 text-[11px] text-gray-500 font-mono text-center">
        Yeşil kesikli = yeni bağ · kırmızı kesikli = kopan bağ. SAOM tam bu
        değişimleri modeller.
      </div>
    </motion.div>
  );
}

function MicroStep() {
  // Aktör D, mikro-adımda iki seçenek arasında karar veriyor
  const base: PanelEdge[] = [
    ["A", "B"],
    ["B", "C"],
    ["C", "D"],
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid md:grid-cols-3 gap-4 items-center"
    >
      <div className="saa-card-teal rounded-xl p-4">
        <div className="text-[11px] font-mono uppercase tracking-wider text-[#5eead4] mb-2 text-center">
          Şu anki durum
        </div>
        <svg viewBox="0 0 370 290" className="w-full h-auto">
          {base.map(([a, b], i) => {
            const na = panelNode(a);
            const nb = panelNode(b);
            return (
              <line
                key={i}
                x1={na.x}
                y1={na.y}
                x2={nb.x}
                y2={nb.y}
                stroke="#475569"
                strokeWidth={1.6}
                strokeOpacity={0.6}
              />
            );
          })}
          {PANEL_NODES.map((n) => (
            <g key={n.id}>
              <circle
                cx={n.x}
                cy={n.y}
                r={17}
                fill={n.id === "D" ? "#0d9488" : "#1f2937"}
                stroke="#5eead4"
                strokeWidth={n.id === "D" ? 2.4 : 1.4}
                className={n.id === "D" ? "saa-node-pulse" : ""}
              />
              <text
                x={n.x}
                y={n.y + 5}
                textAnchor="middle"
                fontSize={13}
                fontWeight={700}
                fill="#fff"
                fontFamily="Inter, sans-serif"
              >
                {n.id}
              </text>
            </g>
          ))}
        </svg>
        <div className="text-[11px] text-gray-400 text-center mt-1">
          Sıra aktör <span className="text-[#5eead4] font-semibold">D</span>&apos;de
        </div>
      </div>

      <div className="flex flex-col items-center justify-center text-center">
        <Dice5 className="w-9 h-9 text-[#5eead4] mb-2" />
        <div className="text-sm text-gray-300 leading-relaxed">
          D, hedef fonksiyonunu en çok artıran komşuluk değişikliğini seçer —{" "}
          <span className="text-[#5eead4]">olasılıksal</span> olarak.
        </div>
        <ArrowRight className="w-7 h-7 text-gray-600 mt-3 hidden md:block" />
      </div>

      <div className="saa-card rounded-xl p-4">
        <div className="text-[11px] font-mono uppercase tracking-wider text-[#5eead4] mb-2 text-center">
          Bir mikro-adım sonra
        </div>
        <svg viewBox="0 0 370 290" className="w-full h-auto">
          {[...base, ["D", "E"] as PanelEdge].map(([a, b], i) => {
            const na = panelNode(a);
            const nb = panelNode(b);
            const fresh = a === "D" && b === "E";
            return (
              <line
                key={i}
                x1={na.x}
                y1={na.y}
                x2={nb.x}
                y2={nb.y}
                stroke={fresh ? "#5eead4" : "#475569"}
                strokeWidth={fresh ? 2.4 : 1.6}
                strokeOpacity={fresh ? 0.95 : 0.6}
                className={fresh ? "saa-edge-new" : ""}
              />
            );
          })}
          {PANEL_NODES.map((n) => (
            <g key={n.id}>
              <circle
                cx={n.x}
                cy={n.y}
                r={17}
                fill={n.id === "D" ? "#0d9488" : "#1f2937"}
                stroke="#5eead4"
                strokeWidth={n.id === "D" ? 2.4 : 1.4}
              />
              <text
                x={n.x}
                y={n.y + 5}
                textAnchor="middle"
                fontSize={13}
                fontWeight={700}
                fill="#fff"
                fontFamily="Inter, sans-serif"
              >
                {n.id}
              </text>
            </g>
          ))}
        </svg>
        <div className="text-[11px] text-gray-400 text-center mt-1">
          D → E <span className="text-[#5eead4]">yeni bağ</span> kuruldu
        </div>
      </div>
    </motion.div>
  );
}

function EffectsTable() {
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
            <th style={{ width: "20%" }}>Etki (effect)</th>
            <th style={{ width: "16%" }}>Tür</th>
            <th>Aktörün eğilimi</th>
            <th style={{ width: "14%" }}>İşaret</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="saa-row-head">Yoğunluk (density / outdegree)</td>
            <td>Yapısal</td>
            <td>Genel olarak bağ kurmanın maliyeti — temel eğilim.</td>
            <td>
              <span className="saa-sign-neg px-1.5 py-0.5 text-[11px] font-mono">
                genelde −
              </span>
            </td>
          </tr>
          <tr>
            <td className="saa-row-head">Karşılıklılık (reciprocity)</td>
            <td>Yapısal</td>
            <td>&ldquo;Beni takip edeni ben de takip ederim.&rdquo;</td>
            <td>
              <span className="saa-sign-pos px-1.5 py-0.5 text-[11px] font-mono">
                genelde +
              </span>
            </td>
          </tr>
          <tr>
            <td className="saa-row-head">Geçişlilik (transitive triplets)</td>
            <td>Yapısal</td>
            <td>&ldquo;Arkadaşımın arkadaşı, arkadaşımdır.&rdquo;</td>
            <td>
              <span className="saa-sign-pos px-1.5 py-0.5 text-[11px] font-mono">
                genelde +
              </span>
            </td>
          </tr>
          <tr>
            <td className="saa-row-head">Homofili (same-X)</td>
            <td>Kovaryat</td>
            <td>Aynı özelliği (cinsiyet, bölüm) paylaşanla bağ kurma.</td>
            <td>
              <span className="saa-sign-pos px-1.5 py-0.5 text-[11px] font-mono">
                bağlama göre
              </span>
            </td>
          </tr>
          <tr>
            <td className="saa-row-head">Bulaşma (avg. similarity)</td>
            <td>Davranış</td>
            <td>Komşuların davranışına benzeme (etki / influence).</td>
            <td>
              <span className="saa-sign-pos px-1.5 py-0.5 text-[11px] font-mono">
                bağlama göre
              </span>
            </td>
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
          <span>saom_friendship.R · R 4.4 · RSiena 1.4</span>
        </div>
      </div>
      <pre className="saa-code p-6 overflow-x-auto m-0">
        <code>
          <span className="saa-code-cmt"># 1) Üç dalgalı ağı tek bir bağımlı değişkene koy</span>
          {"\n"}
          <span className="saa-code-kw">library</span>(
          <span className="saa-code-fn">RSiena</span>)
          {"\n"}
          friendship = <span className="saa-code-fn">sienaDependent</span>(
          {"\n"}
          {"  "}
          <span className="saa-code-fn">array</span>(<span className="saa-code-fn">c</span>(w1, w2, w3),{" "}
          <span className="saa-code-kw">dim</span> = <span className="saa-code-fn">c</span>(
          <span className="saa-code-num">50</span>, <span className="saa-code-num">50</span>,{" "}
          <span className="saa-code-num">3</span>)))
          {"\n"}
          gender    = <span className="saa-code-fn">coCovar</span>(gender.vec)
          {"\n"}
          {"\n"}
          <span className="saa-code-cmt"># 2) Veriyi ve etki listesini kur</span>
          {"\n"}
          data = <span className="saa-code-fn">sienaDataCreate</span>(friendship, gender)
          {"\n"}
          eff  = <span className="saa-code-fn">getEffects</span>(data)
          {"\n"}
          eff  = <span className="saa-code-fn">includeEffects</span>(eff, transTrip, recip)
          {"\n"}
          eff  = <span className="saa-code-fn">includeEffects</span>(eff, sameX,{" "}
          <span className="saa-code-kw">interaction1</span> ={" "}
          <span className="saa-code-str">&quot;gender&quot;</span>)
          {"\n"}
          {"\n"}
          <span className="saa-code-cmt"># 3) Modeli tahmin et (MoM — moment yöntemi)</span>
          {"\n"}
          alg = <span className="saa-code-fn">sienaAlgorithmCreate</span>(
          <span className="saa-code-kw">projname</span> ={" "}
          <span className="saa-code-str">&quot;friend&quot;</span>)
          {"\n"}
          ans = <span className="saa-code-fn">siena07</span>(alg,{" "}
          <span className="saa-code-kw">data</span> = data,{" "}
          <span className="saa-code-kw">effects</span> = eff)
          {"\n"}
          <span className="saa-code-fn">print</span>(ans){" "}
          <span className="saa-code-cmt"># tahmin · std. hata · yakınsama t</span>
        </code>
      </pre>
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
        <Eyebrow>BVA 2105 · 6. Hafta — Sosyal Ağ Analizi</Eyebrow>
        <H1 className="saa-shimmer">
          Aktör Odaklı
          <br />
          Modeller
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Ağ neden zaman içinde değişiyor? Her aktörü kendi seçimlerini yapan bir
          karar verici gibi modelliyoruz.
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          <FeatureCard
            icon={Repeat}
            title="Ağ dinamiği"
            desc="Statik fotoğraf değil; dalga dalga (panel) ölçülen değişim."
            accent="#14b8a6"
            delay={0.3}
          />
          <FeatureCard
            icon={Users}
            title="Aktör perspektifi"
            desc="Bağı kuran/kesen kararın öznesi düğümün kendisidir."
            accent="#0d9488"
            delay={0.45}
          />
          <FeatureCard
            icon={Sigma}
            title="SAOM / SIENA"
            desc="Snijders&apos;in stokastik aktör odaklı modeli ve RSiena aracı."
            accent="#5eead4"
            delay={0.6}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 inline-flex items-center gap-2 text-xs font-mono text-gray-500"
        >
          <Calendar className="w-3.5 h-3.5" />
          Cuma · 09:55 – 11:35 · Teori + RSiena demo
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 2 — Geçen haftadan köprü + bu haftanın hedefi
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 5. haftadan 6. haftaya</Eyebrow>
      <H2>Toplulukları bulduk; şimdi bağların nasıl oluştuğunu soruyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        5. hafta Louvain ile bir <span className="text-white">anlık</span> ağı
        topluluklara ayırdık. Ama o topluluklar nasıl oluştu? Geçişlilik mi,
        homofili mi sürükledi? Bunu yanıtlamak için ağı tek kare değil, zaman
        içinde değişen bir süreç olarak ele almalıyız.
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
              Şimdiye kadar — tanımlayıcı
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />
              Merkezilik, topluluk: ağın <span className="text-white">ne</span> olduğunu ölçtük.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />
              Tek bir anlık görüntü (snapshot) üzerinde çalıştık.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />
              &ldquo;Neden bu yapı?&rdquo; sorusu açıkta kaldı.
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
              Bu hafta — açıklayıcı
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] flex-shrink-0" />
              Ağ <span className="text-white">değişimini</span> istatistiksel olarak modelliyoruz.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] flex-shrink-0" />
              Her aktöre &ldquo;niçin bu bağı kurdun?&rdquo; diye soruyoruz.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] flex-shrink-0" />
              Sonuç: yapısal eğilimleri ayrı ayrı sayısallaştıran parametreler.
            </li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 3 — Bu dersin akışı
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: neden dinamik → mekanizma → pratik</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce ağ dinamiğini ve panel verisini kuruyoruz; sonra modelin kalbini —
        hız ve hedef fonksiyonunu — açıyoruz; en son RSiena ile gerçek bir
        tahmin yapıyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            range: "1",
            title: "Ağ dinamiği & panel",
            items: ["Statik vs dinamik", "Gözlem dalgaları (waves)", "Seçim mi, etki mi?"],
            icon: Repeat,
            accent: "#14b8a6",
          },
          {
            range: "2",
            title: "SAOM mekanizması",
            items: ["Hız fonksiyonu (rate)", "Hedef fonksiyonu", "Etkiler (effects)"],
            icon: Sigma,
            accent: "#0d9488",
          },
          {
            range: "3",
            title: "Pratikte — RSiena",
            items: ["Veri kurulumu", "Model tahmini", "Çıktıyı yorumlama"],
            icon: Code2,
            accent: "#5eead4",
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
                  Bölüm {g.range}
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

  /* ─────────────────  1. AĞ DİNAMİĞİ  ───────────────── */

  // 4 — Section divider 1/3
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Ağ Dinamiği"
      subtitle="Tek fotoğraf yetmez: ağı zaman içinde değişen bir süreç olarak ölçmek"
      bgGradient="linear-gradient(135deg, #14b8a6, #0d9488)"
      shadow="0 20px 60px -10px rgba(20, 184, 166, 0.6)"
      icon={<Repeat className="w-16 h-16 text-white" />}
    />
  ),

  // 5 — Statik vs dinamik + neden aktör odaklı
  () => (
    <SlideShell>
      <Eyebrow>Neden yeni bir model?</Eyebrow>
      <H2 className="mb-2">Statik regresyon neden yetmez?</H2>
      <Sub className="max-w-3xl mb-6">
        Ağ verisinde gözlemler bağımsız değildir: A&apos;nın B&apos;ye bağı,
        B&apos;nin C&apos;ye bağına dayanır. Klasik regresyonun bağımsızlık
        varsayımı çöker. Aktör odaklı model bu bağımlılığı doğrudan kurgular.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6">
        <FeatureCard
          icon={Filter}
          title="Sorun — bağımlılık"
          desc="Bağlar birbirini koşullar (geçişlilik, karşılıklılık). Her bağı ayrı bir bağımsız gözlem saymak yanlıştır."
          accent="#f87171"
          delay={0.1}
        />
        <FeatureCard
          icon={Users}
          title="Çözüm — aktör kararı"
          desc="Değişimi aktörün kendisinin verdiği küçük bağ kararlarına indirgeriz; bağımlılık modelin içine girer."
          accent="#14b8a6"
          delay={0.25}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="mt-6 saa-card-teal rounded-xl p-5 text-sm text-gray-300 leading-relaxed"
      >
        <span className="text-[#5eead4] font-semibold">Temel varsayım:</span>{" "}
        Aktörler kendi dış-bağlarını (outgoing ties) kontrol eder ve gözlemler
        arasında ağ, görmediğimiz pek çok küçük adımla sürekli evrilir. Biz
        yalnızca belirli zamanlardaki <span className="text-white">dalgaları</span>{" "}
        görürüz.
      </motion.div>
    </SlideShell>
  ),

  // 6 — Panel verisi (dalgalar) — PanelMockup
  () => (
    <SlideShell>
      <Eyebrow>Veri yapısı · panel</Eyebrow>
      <H2 className="mb-6">Aynı aktörler, birkaç kez ölçülmüş ağ</H2>
      <PanelMockup />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-5 text-center text-xs text-gray-500"
      >
        SAOM en az <span className="text-[#5eead4]">2 dalga</span> ister (3+ daha
        sağlam). Düğüm kümesi sabit kalır; değişen şey aralarındaki bağlardır.
      </motion.div>
    </SlideShell>
  ),

  // 7 — Seçim mi, etki mi? (selection vs influence)
  () => (
    <SlideShell>
      <Eyebrow>İki süreç · ayırmak zor</Eyebrow>
      <H2 className="mb-2">Seçim mi, Etki mi?</H2>
      <Sub className="max-w-3xl mb-8">
        İki arkadaşın aynı müziği dinlemesi iki nedenle olabilir. SAOM&apos;un en
        güçlü yanı, bu iki süreci <span className="text-[#5eead4]">aynı modelde
        ayrı parametrelerle</span> tahmin edebilmesidir.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <GitBranch className="w-6 h-6 text-[#5eead4]" />
            <h3 className="text-xl font-semibold text-white">Seçim (selection)</h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            Benzeyenler birbirini arkadaş <span className="text-white">seçer</span>.
            Yani önce benzerlik var, sonra bağ kurulur — <span className="text-[#5eead4]">homofili</span>.
          </p>
          <p className="text-xs text-gray-500">
            Ağın değişimini açıklar: kim kiminle bağ kurar?
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Activity className="w-6 h-6 text-[#5eead4]" />
            <h3 className="text-xl font-semibold text-white">Etki (influence)</h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            Arkadaş olunca birbirine <span className="text-white">benzemeye</span>{" "}
            başlarlar. Önce bağ var, sonra davranış yaklaşır — <span className="text-[#5eead4]">bulaşma</span>.
          </p>
          <p className="text-xs text-gray-500">
            Davranış değişimini açıklar: davranış komşuya nasıl yakınsar?
          </p>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  2. SAOM MEKANİZMASI  ───────────────── */

  // 8 — Section divider 2/3
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="SAOM Mekanizması"
      subtitle="Hız fonksiyonu ne zaman, hedef fonksiyonu neyi seçtiriyor?"
      bgGradient="linear-gradient(135deg, #0d9488, #134e4a)"
      shadow="0 20px 60px -10px rgba(13, 148, 136, 0.6)"
      icon={<Sigma className="w-16 h-16 text-white" />}
    />
  ),

  // 9 — Mikro-adım (continuous-time micro-step)
  () => (
    <SlideShell>
      <Eyebrow>Sürecin kalbi · mikro-adım</Eyebrow>
      <H2 className="mb-2">Ağ tek tek bağ kararlarıyla evrilir</H2>
      <Sub className="max-w-3xl mb-6">
        İki gözlem arasında ağ, sürekli zamanda küçük adımlarla değişir. Her
        adımda rastgele bir aktör sıraya gelir ve <span className="text-[#5eead4]">tek
        bir bağını</span> ekler, siler veya hiçbir şey yapmaz.
      </Sub>
      <MicroStep />
    </SlideShell>
  ),

  // 10 — Hız fonksiyonu + Hedef fonksiyonu
  () => (
    <SlideShell>
      <Eyebrow>Modelin iki bileşeni</Eyebrow>
      <H2 className="mb-8">Ne zaman? (hız) ve Neyi? (hedef)</H2>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-6 h-6 text-[#5eead4]" />
            <h3 className="text-lg font-semibold text-white">
              Hız fonksiyonu (rate)
            </h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Bir aktörün ne sıklıkla değişiklik yapma <span className="text-[#5eead4]">fırsatı</span>{" "}
            bulduğunu belirler. Yüksek hız → o aktör daha sık karar verir.
          </p>
          <div className="saa-card-teal rounded-lg p-4 font-mono text-sm text-[#a7f3d0] text-center">
            λ<sub>i</sub> = değişim fırsatı sıklığı
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Scale className="w-6 h-6 text-[#5eead4]" />
            <h3 className="text-lg font-semibold text-white">
              Hedef fonksiyonu (objective)
            </h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Fırsat gelince aktör, hedef fonksiyonunu en çok artıran komşuluğu{" "}
            <span className="text-[#5eead4]">olasılıksal</span> olarak seçer.
            Etkilerin ağırlıklı toplamıdır.
          </p>
          <div className="saa-card rounded-lg p-4 font-mono text-xs text-[#a7f3d0] text-center">
            f<sub>i</sub>(x) = Σ<sub>k</sub> β<sub>k</sub> · s<sub>ik</sub>(x)
          </div>
          <div className="mt-3 text-xs text-gray-500">
            β<sub>k</sub>: etkinin önemi (tahmin ettiğimiz parametre) · s
            <sub>ik</sub>: etki istatistiği
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="mt-6 text-xs text-gray-500 text-center"
      >
        Seçim olasılığı multinomiyal logit biçimindedir: f<sub>i</sub> ne kadar
        yüksekse o komşuluğun seçilme ihtimali o kadar yüksek.
      </motion.div>
    </SlideShell>
  ),

  // 11 — Etkiler tablosu
  () => (
    <SlideShell>
      <Eyebrow>Hedef fonksiyonunun yapı taşları</Eyebrow>
      <H2 className="mb-2">Sık kullanılan etkiler (effects)</H2>
      <Sub className="mb-6">
        Her etkinin bir β parametresi vardır. Pozitif β → aktör o yapıdan
        &ldquo;hoşlanır&rdquo;; negatif β → kaçınır.
      </Sub>
      <EffectsTable />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-xs text-gray-500 text-center"
      >
        İşaretler yalnızca tipik beklentidir; gerçek değer ve yön daima verinin
        tahmininden okunur.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  3. PRATİKTE  ───────────────── */

  // 12 — Section divider 3/3
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Pratikte — RSiena"
      subtitle="Veriyi kur, modeli tahmin et, çıktıyı yorumla"
      bgGradient="linear-gradient(135deg, #0d9488, #115e59)"
      shadow="0 20px 60px -10px rgba(13, 148, 136, 0.6)"
      icon={<Code2 className="w-16 h-16 text-white" />}
    />
  ),

  // 13 — RSiena kod örneği
  () => (
    <SlideShell>
      <Eyebrow>R · RSiena</Eyebrow>
      <H2 className="mb-6">Üç dalga, üç adımda model</H2>
      <CodeBlock />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-5 text-xs text-gray-500 text-center"
      >
        RSiena, Tom Snijders ve ekibinin SAOM tahmini için geliştirdiği R
        paketidir — alanın fiili standardıdır.
      </motion.div>
    </SlideShell>
  ),

  // 14 — Çıktıyı yorumlama
  () => (
    <SlideShell>
      <Eyebrow>Çıktıyı okumak</Eyebrow>
      <H2 className="mb-2">Tahmin tablosu üç şey söyler</H2>
      <Sub className="max-w-3xl mb-8">
        siena07 çıktısında her etki için bir tahmin, bir standart hata ve bir
        yakınsama göstergesi vardır. Bu üçünü birlikte okuruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            t: "Tahmin (estimate)",
            d: "Etkinin yönü ve gücü. Pozitif → eğilim var, negatif → kaçınma. Büyüklük etkiler arasında doğrudan karşılaştırılmaz.",
            icon: TrendingUp,
            accent: "#14b8a6",
          },
          {
            t: "Std. hata & t-oranı",
            d: "tahmin / std. hata. Kabaca |t| > 2 ise etki anlamlı kabul edilir — sıfırdan ayırt edilebilir.",
            icon: Scale,
            accent: "#0d9488",
          },
          {
            t: "Yakınsama (t-conv.)",
            d: "Genel max. yakınsama oranı < 0.25 ve her etki için |t| < 0.10 ise model güvenle yakınsamıştır.",
            icon: Check,
            accent: "#5eead4",
          },
        ].map((c, i) => (
          <motion.div
            key={c.t}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="saa-card rounded-xl p-6"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ background: `${c.accent}18`, border: `1px solid ${c.accent}55` }}
            >
              <c.icon className="w-6 h-6" style={{ color: c.accent }} />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">{c.t}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{c.d}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 saa-card-teal rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <Lightbulb className="w-4 h-4 text-[#5eead4] mt-0.5 flex-shrink-0" />
        <span>
          Önce <span className="text-white">yakınsamaya</span> bak: model
          yakınsamadıysa parametreleri yorumlamak anlamsızdır. Gerekirse{" "}
          <span className="text-[#5eead4]">siena07</span> çıktısını{" "}
          <span className="text-[#5eead4]">prevAns</span> ile yeniden çalıştır.
        </span>
      </motion.div>
    </SlideShell>
  ),

  // 15 — Bu hafta alıştırma / lab
  () => {
    const items: Array<{ t: string; d: string; icon: LucideIcon }> = [
      {
        t: "RSiena&apos;yı kur",
        d: "install.packages(&quot;RSiena&quot;) · R 4.x. Örnek veri: data(s50) — 50 öğrenci, 3 dalga.",
        icon: Database,
      },
      {
        t: "Bağımlı değişkeni oluştur",
        d: "Üç dalgayı sienaDependent ile tek diziye koy; alkol/cinsiyet kovaryatını ekle.",
        icon: Layers,
      },
      {
        t: "Etki seç ve tahmin et",
        d: "recip + transTrip ekle, siena07 ile çalıştır; yakınsama t değerlerini kontrol et.",
        icon: Sigma,
      },
      {
        t: "Tek paragraf yorum yaz",
        d: "Anlamlı bir etkiyi seç (örn. transTrip) ve gerçek dünya diliyle 3 cümlede açıkla.",
        icon: Brain,
      },
    ];
    return (
      <SlideShell>
        <Eyebrow>Bu hafta · uygulama</Eyebrow>
        <H2 className="mb-8">s50 veri setiyle ilk SAOM modelin</H2>
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
                <div
                  className="text-sm font-semibold text-white"
                  dangerouslySetInnerHTML={{ __html: it.t }}
                />
                <div
                  className="text-xs text-gray-400 mt-0.5"
                  dangerouslySetInnerHTML={{ __html: it.d }}
                />
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
          className="mt-5 text-xs text-gray-500 text-center"
        >
          s50, RSiena ile birlikte gelen klasik örnek veridir — kurulumdan sonra{" "}
          <span className="text-[#5eead4] font-mono">data(s50)</span> ile gelir.
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
          <Hash className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>6. hafta tamamlandı · sıradaki: Vize</Eyebrow>
        <H1 className="saa-shimmer-teal">Vize Haftası</H1>
        <Sub className="mt-6">
          Aktör odaklı modeller, 1–6. haftaların kavramlarını birleştiren son
          parçaydı.{" "}
          <span className="text-[#5eead4]">7. hafta vize</span> ile ilk yarıyı
          kapatıyoruz.
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <FeatureCard
            icon={Network}
            title="Merkezilik & topluluk"
            desc="Hafta 1–5: ölçüler, görselleştirme, Louvain. Tanım soruları gelir."
            accent="#14b8a6"
            delay={0.1}
          />
          <FeatureCard
            icon={GraduationCap}
            title="Aktör odaklı model"
            desc="Seçim/etki ayrımı, hız & hedef fonksiyonu, etki yorumu."
            accent="#0d9488"
            delay={0.25}
          />
          <FeatureCard
            icon={Code2}
            title="Araç bilgisi"
            desc="NetworkX, Gephi ve RSiena&apos;nın hangi işe yaradığı."
            accent="#5eead4"
            delay={0.4}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-left"
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
                Ofis Saati
              </div>
              <div className="text-sm font-semibold text-white">
                Salı · 14:00 – 16:00
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
          <Share2 className="w-3.5 h-3.5" />
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
          BVA 2105 · 6. Hafta · Aktör Odaklı Modeller
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
