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
  Network,
  GitBranch,
  Brain,
  Layers,
  Target,
  Sparkles,
  Boxes,
  Workflow,
  Cpu,
  Database,
  Code2,
  Check,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  ArrowRight,
  Route,
  Shuffle,
  Gauge,
  AlertTriangle,
  Calendar,
  MapPin,
  Mail,
  Clock,
  GraduationCap,
  Tag,
  Link2,
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

type GraphNode = {
  id: string;
  x: number;
  y: number;
  label: string;
  highlighted?: boolean;
  r?: number;
};

type GraphEdge = { from: string; to: string };

/* Ağdaki bir düğümün vektöre dönüşmesini gösteren mockup:
   solda küçük graf, ortada ok, sağda embedding vektörü. */
function EmbeddingMockup() {
  const nodes: GraphNode[] = [
    { id: "u", x: 150, y: 130, label: "u", highlighted: true, r: 30 },
    { id: "a", x: 60, y: 50, label: "a", r: 20 },
    { id: "b", x: 250, y: 50, label: "b", r: 20 },
    { id: "c", x: 250, y: 210, label: "c", r: 20 },
    { id: "d", x: 50, y: 210, label: "d", r: 20 },
  ];
  const edges: GraphEdge[] = [
    { from: "u", to: "a" },
    { from: "u", to: "b" },
    { from: "u", to: "c" },
    { from: "u", to: "d" },
    { from: "a", to: "b" },
    { from: "c", to: "d" },
  ];
  const find = (id: string) => nodes.find((n) => n.id === id)!;
  const vector = ["0.82", "-0.14", "0.37", "0.05", "-0.61", "0.49"];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
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
          <Boxes className="w-3.5 h-3.5" />
          <span>node2vec · düğüm &rarr; d=6 vektör</span>
        </div>
      </div>
      <div className="p-6 bg-[#070b0a] grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
        <svg viewBox="0 0 300 260" className="w-full h-auto">
          {edges.map((e, i) => {
            const a = find(e.from);
            const b = find(e.to);
            const isHi = e.from === "u" || e.to === "u";
            return (
              <line
                key={`emb-e-${i}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={isHi ? "#14b8a6" : "#374151"}
                strokeWidth={isHi ? 2 : 1.3}
                strokeOpacity={isHi ? 0.8 : 0.5}
              />
            );
          })}
          {nodes.map((n) => (
            <g key={n.id}>
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r ?? 20}
                fill={n.highlighted ? "#0d9488" : "#1f2937"}
                stroke={n.highlighted ? "#5eead4" : "#475569"}
                strokeWidth={n.highlighted ? 2.5 : 1.5}
                className={n.highlighted ? "saa-node-pulse" : ""}
              />
              <text
                x={n.x}
                y={n.y + 5}
                textAnchor="middle"
                fontSize={n.highlighted ? 15 : 12}
                fontWeight={700}
                fill="#ffffff"
                fontFamily="Inter, sans-serif"
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>

        <div className="flex md:flex-col items-center justify-center text-[#5eead4]">
          <ArrowRight className="w-8 h-8" />
          <span className="text-[10px] font-mono mt-1 text-gray-500">embed</span>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-2 font-mono">
            z<sub>u</sub> &isin; &#8477;<sup>6</sup>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {vector.map((v, i) => (
              <div key={`vc-${i}`} className="saa-emb-cell">
                {v}
              </div>
            ))}
          </div>
          <div className="mt-3 text-[11px] text-gray-500 leading-relaxed">
            Komşuluğu benzeyen düğümler bu uzayda{" "}
            <span className="text-[#5eead4]">birbirine yakın</span> noktalara düşer.
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* GNN mesaj geçişi (message passing) tek katman mockup */
function MessagePassing() {
  const center = { x: 230, y: 150 };
  const neighbors = [
    { x: 90, y: 70 },
    { x: 380, y: 80 },
    { x: 380, y: 230 },
    { x: 100, y: 240 },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="saa-card rounded-xl p-5"
    >
      <svg viewBox="0 0 460 300" className="w-full h-auto">
        <defs>
          <marker
            id="mp-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#5eead4" />
          </marker>
        </defs>
        {neighbors.map((n, i) => (
          <line
            key={`mp-l-${i}`}
            x1={n.x}
            y1={n.y}
            x2={center.x}
            y2={center.y}
            stroke="#14b8a6"
            strokeWidth={2}
            strokeOpacity={0.75}
            markerEnd="url(#mp-arrow)"
          />
        ))}
        {neighbors.map((n, i) => (
          <g key={`mp-n-${i}`}>
            <circle
              cx={n.x}
              cy={n.y}
              r={22}
              fill="#1f2937"
              stroke="#475569"
              strokeWidth={1.5}
            />
            <text
              x={n.x}
              y={n.y + 5}
              textAnchor="middle"
              fontSize={12}
              fontWeight={600}
              fill="#cbd5e1"
              fontFamily="Inter, sans-serif"
            >
              h{i + 1}
            </text>
          </g>
        ))}
        <circle
          cx={center.x}
          cy={center.y}
          r={32}
          fill="#0d9488"
          stroke="#5eead4"
          strokeWidth={2.5}
          className="saa-node-pulse"
        />
        <text
          x={center.x}
          y={center.y + 6}
          textAnchor="middle"
          fontSize={16}
          fontWeight={700}
          fill="#ffffff"
          fontFamily="Inter, sans-serif"
        >
          v
        </text>
      </svg>
      <div className="mt-2 text-xs text-gray-400 text-center leading-relaxed">
        v düğümü, komşularının (h1..h4){" "}
        <span className="text-[#5eead4] font-semibold">mesajlarını toplar</span>,
        kendi gösterimiyle birleştirir &mdash; bir GNN katmanı budur.
      </div>
    </motion.div>
  );
}

function CompareTable() {
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
            <th style={{ width: "20%" }}>Özellik</th>
            <th>Shallow embedding (node2vec / DeepWalk)</th>
            <th>GNN (GCN / GraphSAGE / GAT)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="saa-row-head">Nasıl öğrenir?</td>
            <td>Rastgele yürüyüşler &rarr; Skip-gram (Word2Vec mantığı)</td>
            <td>Komşu mesajlarını katman katman toplar (message passing)</td>
          </tr>
          <tr>
            <td className="saa-row-head">Düğüm öznitelikleri</td>
            <td>Kullanmaz; yalnız graf yapısı</td>
            <td>Kullanır (yaş, ilgi, metin gömme vb. ile birlikte)</td>
          </tr>
          <tr>
            <td className="saa-row-head">Yeni düğüm (inductive)</td>
            <td>Zor &mdash; baştan eğitmek gerekir (transductive)</td>
            <td>GraphSAGE ile mümkün &mdash; görülmemiş düğüme genelleme</td>
          </tr>
          <tr>
            <td className="saa-row-head">Tipik kullanım</td>
            <td>Hızlı temel çizgi, küçük/orta statik ağ</td>
            <td>Öznitelikli, büyük, değişen ağlar &mdash; üretim sistemleri</td>
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
          <span>node2vec_demo.py · Python 3.12 · NetworkX + node2vec</span>
        </div>
      </div>
      <pre className="saa-code p-6 overflow-x-auto m-0">
        <code>
          <span className="saa-code-cmt"># 1) Klasik Karate Club ağını al</span>
          {"\n"}
          <span className="saa-code-kw">import</span>{" "}
          <span className="saa-code-fn">networkx</span>{" "}
          <span className="saa-code-kw">as</span>{" "}
          <span className="saa-code-fn">nx</span>
          {"\n"}
          <span className="saa-code-kw">from</span> node2vec{" "}
          <span className="saa-code-kw">import</span>{" "}
          <span className="saa-code-fn">Node2Vec</span>
          {"\n"}
          {"\n"}
          G = nx.<span className="saa-code-fn">karate_club_graph</span>()
          <span className="saa-code-cmt"># 34 düğüm, 78 kenar</span>
          {"\n"}
          {"\n"}
          <span className="saa-code-cmt"># 2) Rastgele yürüyüş + Skip-gram ile gömme öğren</span>
          {"\n"}
          n2v = <span className="saa-code-fn">Node2Vec</span>(
          {"\n"}
          {"    "}G, dimensions=<span className="saa-code-num">16</span>,
          walk_length=<span className="saa-code-num">20</span>,
          {"\n"}
          {"    "}num_walks=<span className="saa-code-num">100</span>, p=
          <span className="saa-code-num">1</span>, q=
          <span className="saa-code-num">1</span>)
          {"\n"}
          model = n2v.<span className="saa-code-fn">fit</span>(window=
          <span className="saa-code-num">5</span>, min_count=
          <span className="saa-code-num">1</span>)
          {"\n"}
          {"\n"}
          <span className="saa-code-cmt"># 3) 0 numaralı düğümün vektörü ve en yakın komşuları</span>
          {"\n"}
          z0 = model.wv[<span className="saa-code-str">&quot;0&quot;</span>]
          <span className="saa-code-cmt"># 16 boyutlu vektör</span>
          {"\n"}
          <span className="saa-code-fn">print</span>(model.wv.
          <span className="saa-code-fn">most_similar</span>(
          <span className="saa-code-str">&quot;0&quot;</span>, topn=
          <span className="saa-code-num">3</span>))
        </code>
      </pre>
    </motion.div>
  );
}

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ───────────────── AÇILIŞ ───────────────── */

  // 1 — Kapak
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2105 · 14. Hafta — Sosyal Ağ Analizi</Eyebrow>
        <H1 className="saa-shimmer">
          Ağ Temelli
          <br />
          Makine Öğrenimi
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Graf gömmeleri (graph embeddings) ve grafik sinir ağları (GNN) &mdash;
          ağ yapısını öğrenen modeller.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={Boxes}
            title="Graph Embedding"
            desc="Her düğümü, yapısını koruyan düşük boyutlu bir vektöre çevir."
            delay={0.3}
            accent="#14b8a6"
          />
          <FeatureCard
            icon={Brain}
            title="GNN"
            desc="Komşu bilgisini katman katman toplayan sinir ağları."
            delay={0.45}
            accent="#0d9488"
          />
          <FeatureCard
            icon={Target}
            title="Görevler"
            desc="Düğüm sınıflama, bağlantı tahmini, öneri sistemleri."
            delay={0.6}
            accent="#5eead4"
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 inline-flex items-center gap-2 text-xs font-mono text-gray-500"
        >
          <Calendar className="w-3.5 h-3.5" />
          Cuma · 09:55 – 11:35 · Dönemin son teknik konusu
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 2 — Geçen haftadan köprü / bu haftanın hedefi
  () => (
    <SlideShell>
      <Eyebrow>Köprü · Önceki haftalardan buraya</Eyebrow>
      <H2>Elle ölçtüğümüz şeyi artık model öğrensin</H2>
      <Sub className="mt-3 max-w-3xl">
        Dönem boyunca merkezilik, topluluk tespiti, yayılım gibi ölçüleri{" "}
        <span className="text-[#5eead4]">elle</span> hesapladık. Bu hafta soruyu
        tersine çeviriyoruz: ağ yapısını bir makine öğrenmesi modeline{" "}
        <span className="text-[#5eead4]">girdi</span> olacak şekilde nasıl
        sayısallaştırırız?
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#5eead4]">
            <GitBranch className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Şimdiye kadar
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />
              Tanımlı formüller: derece, aradalık, modularite.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />
              İnsanın seçtiği elle öznitelikler (feature engineering).
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />
              Her görev için yeni ölçü düşünmek gerekiyordu.
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
            <Sparkles className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Bu hafta
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] flex-shrink-0" />
              Model, gösterimi (representation) kendisi öğrensin.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] flex-shrink-0" />
              Düğüm &rarr; vektör (embedding) &rarr; standart ML modeli.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] flex-shrink-0" />
              Tek gösterim, birçok görevde yeniden kullanılır.
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
      <H2>Üç durak: gömme &rarr; GNN &rarr; görevler</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce düğümü neden ve nasıl vektöre çevirdiğimizi; sonra bu fikri sinir
        ağına taşıyan GNN&apos;leri; en sonda da bunların hangi gerçek problemleri
        çözdüğünü görüyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            range: "01",
            title: "Graph Embedding",
            items: ["Neden vektöre çeviriyoruz?", "Rastgele yürüyüş", "node2vec / DeepWalk"],
            icon: Boxes,
            accent: "#14b8a6",
          },
          {
            range: "02",
            title: "GNN",
            items: ["Mesaj geçişi (message passing)", "GCN · GraphSAGE · GAT", "Öznitelik + yapı birlikte"],
            icon: Brain,
            accent: "#0d9488",
          },
          {
            range: "03",
            title: "Görevler & Pratik",
            items: ["Düğüm sınıflama", "Bağlantı tahmini", "Riskler ve lab"],
            icon: Target,
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

  /* ───────────────── 1. GRAPH EMBEDDING ───────────────── */

  // 4 — Section divider 1/3
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Graph Embedding"
      subtitle="Bir düğümü, ağdaki konumunu koruyan düşük boyutlu bir vektöre çevirmek"
      bgGradient="linear-gradient(135deg, #14b8a6, #0d9488)"
      shadow="0 20px 60px -10px rgba(20, 184, 166, 0.6)"
      icon={<Boxes className="w-16 h-16 text-white" />}
    />
  ),

  // 5 — Neden vektöre çeviriyoruz?
  () => (
    <SlideShell>
      <Eyebrow>Temel Sorun</Eyebrow>
      <H2 className="mb-2">Makine öğrenmesi vektör ister, ağ ise graf</H2>
      <Sub className="max-w-3xl mb-6">
        Lojistik regresyon, rastgele orman, sinir ağı &mdash; hepsi girdi olarak{" "}
        <span className="text-[#5eead4]">sabit boyutlu sayı dizisi</span> bekler.
        Bir düğümün komşuluk listesi bunu doğrudan vermez. Graph embedding bu
        boşluğu kapatır.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <FeatureCard
          icon={Tag}
          title="Yapıyı say&iacute;ya gömmek"
          desc="Her düğüm d-boyutlu (örn. 64-128) bir vektörle temsil edilir. Komşuluğu benzer düğümler benzer vektör alır."
          accent="#14b8a6"
          delay={0.1}
        />
        <FeatureCard
          icon={Layers}
          title="Tek gösterim, çok görev"
          desc="Aynı vektörler sınıflama, kümeleme, öneri ve bağlantı tahmininde yeniden kullanılır. Her görev için yeni ölçü gerekmez."
          accent="#0d9488"
          delay={0.25}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="saa-card-teal rounded-xl p-5 text-center font-mono text-sm text-[#a7f3d0]"
      >
        f : V &rarr; &#8477;<sup>d</sup> &nbsp;·&nbsp; her düğüm v için z
        <sub>v</sub> &isin; &#8477;<sup>d</sup>
      </motion.div>
    </SlideShell>
  ),

  // 6 — node2vec / rastgele yürüyüş
  () => (
    <SlideShell>
      <Eyebrow>Shallow Embedding · Rastgele Yürüyüş</Eyebrow>
      <H2 className="mb-2">node2vec / DeepWalk nasıl çalışır?</H2>
      <Sub className="max-w-3xl mb-6">
        Fikir Word2Vec&apos;ten ödünç: cümle yerine{" "}
        <span className="text-[#5eead4]">rastgele yürüyüş</span> dizileri kullan.
        Birlikte sık görünen düğümler, birlikte sık geçen kelimeler gibi davranır.
      </Sub>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            n: "1",
            icon: Route,
            t: "Rastgele yürüyüş üret",
            d: "Her düğümden başlayıp komşudan komşuya zıplayan kısa diziler topla (örn. uzunluk 20).",
          },
          {
            n: "2",
            icon: Shuffle,
            t: "Diziyi cümle say",
            d: "Yürüyüşler birer cümle, düğümler birer kelime. Skip-gram (Word2Vec) ile bağlamı öğren.",
          },
          {
            n: "3",
            icon: Boxes,
            t: "Vektörleri al",
            d: "Her düğüm için d-boyutlu embedding çıkar. Yakın yürüyen düğümler yakın vektör alır.",
          },
        ].map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="saa-card rounded-xl p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="w-7 h-7 rounded-full border border-[#14b8a6]/50 flex items-center justify-center text-xs font-mono text-[#5eead4]">
                {s.n}
              </span>
              <s.icon className="w-5 h-5 text-[#5eead4]" />
            </div>
            <h3 className="text-base font-semibold text-white mb-1">{s.t}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{s.d}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-5 text-xs text-gray-500 font-mono text-center"
      >
        node2vec, p ve q parametreleriyle yürüyüşü ayarlar: küçük q &rarr; uzağa
        keşif (DFS-vari) · küçük p &rarr; yerelde kalma (BFS-vari).
      </motion.div>
    </SlideShell>
  ),

  // 7 — Embedding mockup (görsel)
  () => (
    <SlideShell>
      <Eyebrow>Görsel Örnek · Düğüm &rarr; Vektör</Eyebrow>
      <H2 className="mb-6">Bir düğüm gömüldükten sonra neye benzer?</H2>
      <EmbeddingMockup />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-5 text-center text-xs text-gray-500"
      >
        Vektör tek başına anlamsız görünür &mdash; gücü{" "}
        <span className="text-[#5eead4]">karşılaştırmada</span>: iki düğümün
        vektörü ne kadar yakınsa, ağdaki rolleri o kadar benzer.
      </motion.div>
    </SlideShell>
  ),

  /* ───────────────── 2. GNN ───────────────── */

  // 8 — Section divider 2/3
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Grafik Sinir Ağları (GNN)"
      subtitle="Komşu bilgisini katman katman toplayarak öğrenen sinir ağları"
      bgGradient="linear-gradient(135deg, #0d9488, #134e4a)"
      shadow="0 20px 60px -10px rgba(13, 148, 136, 0.6)"
      icon={<Brain className="w-16 h-16 text-white" />}
    />
  ),

  // 9 — Mesaj geçişi
  () => (
    <SlideShell>
      <Eyebrow>GNN&apos;in Kalbi</Eyebrow>
      <H2 className="mb-2">Mesaj geçişi (message passing)</H2>
      <Sub className="max-w-3xl mb-6">
        Her katmanda bir düğüm, komşularından gelen bilgileri{" "}
        <span className="text-[#5eead4]">toplar</span> (aggregate), kendi
        gösterimiyle <span className="text-[#5eead4]">günceller</span> (update).
        Katman sayısı, kaç adım uzaktaki komşuyu duyduğunu belirler.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <MessagePassing />
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-wider text-[#5eead4] mb-3 font-mono">
            Tek katman, sade biçim
          </div>
          <div className="saa-card rounded-lg p-4 font-mono text-xs text-[#a7f3d0] text-center leading-relaxed">
            h<sub>v</sub><sup>(k)</sup> = &sigma;( W &middot; AGG&#123; h
            <sub>u</sub><sup>(k-1)</sup> : u &isin; N(v) &#125; + B &middot; h
            <sub>v</sub><sup>(k-1)</sup> )
          </div>
          <ul className="mt-4 space-y-2 text-sm text-gray-300">
            <li className="flex gap-2">
              <Workflow className="w-4 h-4 text-[#5eead4] mt-0.5 flex-shrink-0" />
              <span>AGG: toplam, ortalama ya da maksimum.</span>
            </li>
            <li className="flex gap-2">
              <Layers className="w-4 h-4 text-[#5eead4] mt-0.5 flex-shrink-0" />
              <span>k katman = k-adım komşuluk (genelde 2-3 yeterli).</span>
            </li>
            <li className="flex gap-2">
              <Cpu className="w-4 h-4 text-[#5eead4] mt-0.5 flex-shrink-0" />
              <span>W, B öğrenilen ağırlıklar; geri yayılımla eğitilir.</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 10 — GNN mimarileri
  () => (
    <SlideShell>
      <Eyebrow>Üç Temel Mimari</Eyebrow>
      <H2 className="mb-8">GCN · GraphSAGE · GAT</H2>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            t: "GCN",
            sub: "Graph Convolutional Network",
            icon: Network,
            d: "Komşuların ortalamasını alır (derece ile normalize). En sade ve en yaygın temel çizgi.",
            note: "Kipf & Welling, 2017",
            accent: "#14b8a6",
          },
          {
            t: "GraphSAGE",
            sub: "Sample & Aggregate",
            icon: Layers,
            d: "Komşulardan örnekleme yapar; görülmemiş düğüme de genelleşir (inductive). Büyük ağlar için.",
            note: "Hamilton ve ark., 2017",
            accent: "#0d9488",
          },
          {
            t: "GAT",
            sub: "Graph Attention Network",
            icon: Gauge,
            d: "Her komşuya bir dikkat (attention) ağırlığı öğrenir; bazı komşular daha önemli sayılır.",
            note: "Veličković ve ark., 2018",
            accent: "#5eead4",
          },
        ].map((m, i) => (
          <motion.div
            key={m.t}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="saa-card rounded-xl p-6"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ background: `${m.accent}18`, border: `1px solid ${m.accent}55` }}
            >
              <m.icon className="w-6 h-6" style={{ color: m.accent }} />
            </div>
            <div className="text-lg font-bold text-white">{m.t}</div>
            <div className="text-[11px] font-mono text-gray-500 mb-3">{m.sub}</div>
            <p className="text-sm text-gray-300 leading-relaxed mb-3">{m.d}</p>
            <div className="text-[10px] font-mono text-gray-600 border-t border-white/5 pt-2">
              {m.note}
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  // 11 — Embedding vs GNN karşılaştırma tablosu
  () => (
    <SlideShell>
      <Eyebrow>Toparlayalım</Eyebrow>
      <H2 className="mb-2">Shallow embedding mi, GNN mi?</H2>
      <Sub className="mb-6 max-w-3xl">
        İkisi de düğümü vektöre çevirir; fark, neyi kullandıkları ve yeni düğüme
        nasıl davrandıklarındadır.
      </Sub>
      <CompareTable />
    </SlideShell>
  ),

  /* ───────────────── 3. GÖREVLER & PRATİK ───────────────── */

  // 12 — Section divider 3/3
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Görevler & Pratik"
      subtitle="Embedding ve GNN ile hangi gerçek problemleri çözüyoruz?"
      bgGradient="linear-gradient(135deg, #0d9488, #115e59)"
      shadow="0 20px 60px -10px rgba(13, 148, 136, 0.6)"
      icon={<Target className="w-16 h-16 text-white" />}
    />
  ),

  // 13 — Üç görev türü
  () => (
    <SlideShell>
      <Eyebrow>Ağ ML&apos;inin Üç Klasik Görevi</Eyebrow>
      <H2 className="mb-8">Düğüm · Bağlantı · Graf</H2>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            icon: Tag,
            t: "Düğüm sınıflama",
            d: "Bir hesabın bot mu gerçek mi olduğunu, bir kullanıcının ilgi alanını tahmin etmek.",
            ex: "Sahte hesap / spam tespiti",
            accent: "#14b8a6",
          },
          {
            icon: Link2,
            t: "Bağlantı tahmini",
            d: "İki düğüm arasında ileride kenar oluşur mu? Var olmayan ama olası ilişkileri bulmak.",
            ex: "Arkadaş / takip önerisi",
            accent: "#0d9488",
          },
          {
            icon: Boxes,
            t: "Graf sınıflama",
            d: "Tüm bir altağı (örn. bir kullanıcı topluluğu) tek bir etiketle sınıflamak.",
            ex: "Topluluk türü etiketleme",
            accent: "#5eead4",
          },
        ].map((g, i) => (
          <motion.div
            key={g.t}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="saa-card saa-card-hover rounded-xl p-6"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ background: `${g.accent}18`, border: `1px solid ${g.accent}55` }}
            >
              <g.icon className="w-6 h-6" style={{ color: g.accent }} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{g.t}</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-3">{g.d}</p>
            <div className="text-[11px] font-mono text-[#5eead4] border-t border-white/5 pt-2">
              {g.ex}
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  // 14 — Öneri sistemleri / gerçek dünya
  () => (
    <SlideShell>
      <Eyebrow>Gerçek Dünya · Öneri Sistemleri</Eyebrow>
      <H2 className="mb-2">&quot;Tanıyor olabileceğin kişiler&quot; nereden geliyor?</H2>
      <Sub className="max-w-3xl mb-6">
        Sosyal platformlardaki arkadaş/takip önerileri, büyük ölçüde bir{" "}
        <span className="text-[#5eead4]">bağlantı tahmini</span> problemidir.
        Düğüm gömmeleri benzer kullanıcıları yakınlaştırır; model henüz olmayan
        ama olası kenarları sıralar.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#5eead4]">
            <Workflow className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Tipik boru hattı
            </span>
          </div>
          <div className="space-y-2.5">
            {[
              "Ağı topla (takip / arkadaşlık kenarları)",
              "Düğüm gömmelerini öğren (node2vec / GraphSAGE)",
              "Aday çiftler için skor hesapla (vektör benzerliği)",
              "En yüksek skorlu önerileri kullanıcıya sun",
            ].map((step, i) => (
              <div key={i} className="saa-pipe-step px-3 py-2 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#14b8a6]/15 border border-[#14b8a6]/40 flex items-center justify-center text-[10px] font-mono text-[#5eead4] flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm text-gray-300">{step}</span>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-gray-300">
            <Database className="w-5 h-5 text-[#5eead4]" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Nerede karşına çıkar?
            </span>
          </div>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-3">
              <ChevronRight className="w-4 h-4 text-[#5eead4] mt-0.5 flex-shrink-0" />
              Sosyal ağlarda arkadaş / takip önerisi.
            </li>
            <li className="flex gap-3">
              <ChevronRight className="w-4 h-4 text-[#5eead4] mt-0.5 flex-shrink-0" />
              E-ticarette &quot;bunu alanlar şunu da aldı&quot;.
            </li>
            <li className="flex gap-3">
              <ChevronRight className="w-4 h-4 text-[#5eead4] mt-0.5 flex-shrink-0" />
              Bilimsel makale / ortak yazar önerileri.
            </li>
            <li className="flex gap-3">
              <ChevronRight className="w-4 h-4 text-[#5eead4] mt-0.5 flex-shrink-0" />
              Sahte hesap halkalarının tespitinde sınıflama.
            </li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 15 — Kod örneği
  () => (
    <SlideShell>
      <Eyebrow>Python · Mini Demo</Eyebrow>
      <H2 className="mb-6">node2vec ile birkaç satırda gömme</H2>
      <CodeBlock />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-5 text-xs text-gray-500 text-center"
      >
        GNN için endüstri standardı: <span className="text-[#5eead4]">PyTorch Geometric (PyG)</span>{" "}
        ve <span className="text-[#5eead4]">DGL</span> &mdash; GCN/SAGE/GAT katmanları hazır gelir.
      </motion.div>
    </SlideShell>
  ),

  // 16 — Riskler / sınırlar
  () => (
    <SlideShell>
      <Eyebrow>Dikkat · Sınırlar ve Riskler</Eyebrow>
      <H2 className="mb-8">Güçlü ama sihir değil</H2>
      <div className="grid md:grid-cols-2 gap-5">
        {[
          {
            icon: AlertTriangle,
            t: "Önyargı miras alınır",
            d: "Model, eğitim ağındaki ayrımcı veya homofilik örüntüleri öğrenip pekiştirebilir. Öneriler yankı odası yaratabilir.",
          },
          {
            icon: AlertTriangle,
            t: "Yorumlanabilirlik düşük",
            d: "64 boyutlu bir vektörün her ekseni anlamlı değildir; kararı açıklamak merkezilik ölçülerinden daha zordur.",
          },
          {
            icon: AlertTriangle,
            t: "Ölçek ve maliyet",
            d: "Milyonlarca düğümlü ağda GNN eğitimi yüksek bellek/işlem ister; örnekleme (sampling) ve altyapı gerekir.",
          },
          {
            icon: AlertTriangle,
            t: "Gizlilik",
            d: "Düğüm gömmeleri, görünürde silinmiş ilişkileri yeniden çıkarabilir. Kişisel veri ve KVKK çerçevesi gözetilmeli.",
          },
        ].map((r, i) => (
          <motion.div
            key={r.t}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 + i * 0.1 }}
            className="saa-card rounded-xl p-5 flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-[#14b8a6]/12 border border-[#14b8a6]/30 flex items-center justify-center flex-shrink-0">
              <r.icon className="w-5 h-5 text-[#5eead4]" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white mb-1">{r.t}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{r.d}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  // 17 — Bu hafta yapılacaklar (lab)
  () => {
    const items: Array<{ t: string; d: string; icon: LucideIcon }> = [
      {
        t: "Ortamı kur",
        d: "pip install networkx node2vec scikit-learn · GNN için isteğe bağlı torch-geometric (Colab önerilir).",
        icon: Code2,
      },
      {
        t: "Karate Club&apos;ı göm",
        d: "node2vec ile 16 boyutlu vektör çıkar. Düğümleri 2B&apos;ye indirip (PCA/t-SNE) çiz.",
        icon: Boxes,
      },
      {
        t: "Düğüm sınıflama dene",
        d: "Vektörleri girdi verip basit bir sınıflandırıcı (lojistik regresyon) ile kulüp ayrımını tahmin et.",
        icon: Tag,
      },
      {
        t: "Bağlantı tahmini gözlemle",
        d: "Birkaç kenarı gizle; gömmelerin benzerliği bu eksik kenarları geri öneriyor mu, kontrol et.",
        icon: Link2,
      },
    ];
    return (
      <SlideShell>
        <Eyebrow>Bu Hafta · Uygulamalı Lab</Eyebrow>
        <H2 className="mb-8">Dört adımlık alıştırma</H2>
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
      </SlideShell>
    );
  },

  // 18 — Sıradaki hafta + kapanış
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
          <GraduationCap className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>14. hafta tamamlandı · sıradaki: Final</Eyebrow>
        <H1 className="saa-shimmer-teal">Toparlama &amp; Final</H1>
        <Sub className="mt-6">
          Dönemi kapatıyoruz:{" "}
          <span className="text-[#5eead4]">
            merkezilikten GNN&apos;e tüm konuların gözden geçirilmesi.
          </span>
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 text-left">
          <div className="saa-card rounded-xl p-5">
            <Calendar className="w-5 h-5 text-[#5eead4] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">
              Ders Saati
            </div>
            <div className="text-white font-semibold">Cuma</div>
            <div className="text-sm text-gray-400">09:55 – 11:35</div>
          </div>
          <div className="saa-card rounded-xl p-5">
            <MapPin className="w-5 h-5 text-[#5eead4] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">
              Hazırlık
            </div>
            <div className="text-white font-semibold">Lab notebook&apos;u</div>
            <div className="text-sm text-gray-400">çalışır halde getir</div>
          </div>
          <div className="saa-card rounded-xl p-5">
            <Clock className="w-5 h-5 text-[#5eead4] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">
              Teslim
            </div>
            <div className="text-white font-semibold">Embedding raporu</div>
            <div className="text-sm text-gray-400">4 adım + grafikler</div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 inline-flex items-center gap-2 text-xs font-mono text-gray-500"
        >
          <Mail className="w-3.5 h-3.5" />
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
          BVA 2105 · 14. Hafta · Ağ Temelli Makine Öğrenimi
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
