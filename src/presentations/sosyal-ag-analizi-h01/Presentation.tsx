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
  Briefcase,
  Globe,
  Users,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Quote,
  Check,
  Sparkles,
  Zap,
  Hash,
  BarChart3,
  TrendingUp,
  Brain,
  Lightbulb,
  GraduationCap,
  Database,
  Search,
  Code2,
  ArrowRight,
  MapPin,
  Clock,
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

function StatCard({
  icon: Icon,
  value,
  label,
  source,
  delay = 0,
  accent = "#14b8a6",
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
      className="saa-card rounded-xl p-5"
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

function QuoteSlide({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <SlideShell>
      <div className="text-center max-w-4xl mx-auto">
        <Quote className="w-16 h-16 text-[#14b8a6]/40 mx-auto mb-8" />
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
          <div className="text-lg font-semibold text-[#14b8a6]">{author}</div>
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

function GraphMockup() {
  // Hub-and-spoke style sosyal ağ: merkezi "Ali" + 7 düğüm + ek kenarlar
  const nodes: GraphNode[] = [
    { id: "ali", x: 400, y: 230, label: "Ali", highlighted: true, r: 38 },
    { id: "ayse", x: 180, y: 110, label: "Ayşe", r: 24 },
    { id: "mehmet", x: 620, y: 110, label: "Mehmet", r: 24 },
    { id: "zeynep", x: 720, y: 240, label: "Zeynep", r: 24 },
    { id: "can", x: 600, y: 380, label: "Can", r: 24 },
    { id: "elif", x: 200, y: 380, label: "Elif", r: 24 },
    { id: "burak", x: 80, y: 240, label: "Burak", r: 24 },
    { id: "deniz", x: 400, y: 60, label: "Deniz", r: 22 },
  ];
  const edges: GraphEdge[] = [
    { from: "ali", to: "ayse" },
    { from: "ali", to: "mehmet" },
    { from: "ali", to: "zeynep" },
    { from: "ali", to: "can" },
    { from: "ali", to: "elif" },
    { from: "ali", to: "burak" },
    { from: "ali", to: "deniz" },
    { from: "ayse", to: "deniz" },
    { from: "ayse", to: "burak" },
    { from: "mehmet", to: "zeynep" },
    { from: "mehmet", to: "deniz" },
    { from: "zeynep", to: "can" },
    { from: "elif", to: "burak" },
    { from: "can", to: "elif" },
  ];
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
          <span>Gephi · ornek_ag.gexf · 8 düğüm · 14 kenar</span>
        </div>
      </div>
      <div className="p-4 bg-[#070b0a]">
        <svg viewBox="0 0 800 460" className="w-full h-auto">
          <defs>
            <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#5eead4" />
              <stop offset="100%" stopColor="#0d9488" />
            </radialGradient>
            <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#374151" />
              <stop offset="100%" stopColor="#1f2937" />
            </radialGradient>
          </defs>

          {edges.map((e, i) => {
            const a = find(e.from);
            const b = find(e.to);
            const isHubEdge = e.from === "ali" || e.to === "ali";
            return (
              <line
                key={`e-${i}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={isHubEdge ? "#14b8a6" : "#374151"}
                strokeWidth={isHubEdge ? 2 : 1.3}
                strokeOpacity={isHubEdge ? 0.75 : 0.55}
              />
            );
          })}

          {nodes.map((n) => (
            <g key={n.id}>
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r ?? 22}
                fill={n.highlighted ? "url(#hubGrad)" : "url(#nodeGrad)"}
                stroke={n.highlighted ? "#5eead4" : "#4b5563"}
                strokeWidth={n.highlighted ? 2.5 : 1.5}
                className={n.highlighted ? "saa-node-pulse" : ""}
              />
              <text
                x={n.x}
                y={n.y + 4}
                textAnchor="middle"
                fontSize={n.highlighted ? 14 : 11}
                fontWeight={n.highlighted ? 700 : 500}
                fill="#ffffff"
                fontFamily="Inter, sans-serif"
              >
                {n.label}
              </text>
            </g>
          ))}

          {/* Hub etiketi */}
          <g>
            <rect
              x={350}
              y={285}
              width={100}
              height={22}
              rx={6}
              fill="#14b8a6"
              fillOpacity={0.18}
              stroke="#14b8a6"
              strokeOpacity={0.7}
            />
            <text
              x={400}
              y={300}
              textAnchor="middle"
              fontSize={11}
              fill="#5eead4"
              fontFamily="Inter, sans-serif"
              fontWeight={700}
            >
              HUB · derece 7
            </text>
          </g>
        </svg>
      </div>
    </motion.div>
  );
}

type SmallNode = { id: string; x: number; y: number; deg: number; highlight?: boolean };

function DegreeExample() {
  const nodes: SmallNode[] = [
    { id: "A", x: 110, y: 90, deg: 3 },
    { id: "B", x: 320, y: 60, deg: 5, highlight: true },
    { id: "C", x: 520, y: 100, deg: 2 },
    { id: "D", x: 200, y: 260, deg: 4 },
    { id: "E", x: 430, y: 260, deg: 3 },
    { id: "F", x: 90, y: 350, deg: 1 },
    { id: "G", x: 600, y: 320, deg: 2 },
  ];
  const edges: [string, string][] = [
    ["A", "B"],
    ["A", "D"],
    ["A", "F"],
    ["B", "C"],
    ["B", "D"],
    ["B", "E"],
    ["B", "G"],
    ["C", "E"],
    ["D", "E"],
    ["E", "G"],
  ];
  const find = (id: string) => nodes.find((n) => n.id === id)!;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="saa-card rounded-xl p-5"
    >
      <svg viewBox="0 0 700 420" className="w-full h-auto">
        {edges.map(([a, b], i) => {
          const na = find(a);
          const nb = find(b);
          const isHi = a === "B" || b === "B";
          return (
            <line
              key={`de-${i}`}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke={isHi ? "#14b8a6" : "#475569"}
              strokeWidth={isHi ? 2 : 1.3}
              strokeOpacity={isHi ? 0.8 : 0.55}
            />
          );
        })}
        {nodes.map((n) => (
          <g key={n.id}>
            <circle
              cx={n.x}
              cy={n.y}
              r={n.highlight ? 30 : 22}
              fill={n.highlight ? "#0d9488" : "#1f2937"}
              stroke={n.highlight ? "#5eead4" : "#475569"}
              strokeWidth={n.highlight ? 2.5 : 1.5}
              className={n.highlight ? "saa-node-pulse" : ""}
            />
            <text
              x={n.x}
              y={n.y + 5}
              textAnchor="middle"
              fontSize={n.highlight ? 16 : 14}
              fontWeight={700}
              fill="#ffffff"
              fontFamily="Inter, sans-serif"
            >
              {n.id}
            </text>
            <g>
              <rect
                x={n.x - 28}
                y={n.y + (n.highlight ? 38 : 30)}
                width={56}
                height={20}
                rx={5}
                fill={n.highlight ? "#14b8a6" : "#0f172a"}
                fillOpacity={n.highlight ? 0.25 : 0.85}
                stroke={n.highlight ? "#5eead4" : "#334155"}
                strokeOpacity={0.7}
              />
              <text
                x={n.x}
                y={n.y + (n.highlight ? 52 : 44)}
                textAnchor="middle"
                fontSize={11}
                fontWeight={600}
                fill={n.highlight ? "#5eead4" : "#cbd5e1"}
                fontFamily="Inter, sans-serif"
              >
                deg = {n.deg}
              </text>
            </g>
          </g>
        ))}
      </svg>
      <div className="mt-2 text-xs text-gray-400 text-center">
        Düğüm <span className="text-[#5eead4] font-semibold">B</span>’nin derecesi 5 — en
        merkezde olan kişi.
      </div>
    </motion.div>
  );
}

function MiniDirected() {
  return (
    <svg viewBox="0 0 260 160" className="w-full h-auto">
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#14b8a6" />
        </marker>
      </defs>
      <line x1="40" y1="80" x2="125" y2="40" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrow)" />
      <line x1="40" y1="80" x2="125" y2="120" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrow)" />
      <line x1="155" y1="40" x2="220" y2="80" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrow)" />
      <line x1="155" y1="120" x2="220" y2="80" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrow)" />
      {[
        { x: 40, y: 80, l: "A" },
        { x: 140, y: 40, l: "B" },
        { x: 140, y: 120, l: "C" },
        { x: 230, y: 80, l: "D" },
      ].map((n) => (
        <g key={n.l}>
          <circle cx={n.x} cy={n.y} r={16} fill="#0d9488" stroke="#5eead4" strokeWidth="2" />
          <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize={12} fontWeight={700} fill="#fff">
            {n.l}
          </text>
        </g>
      ))}
    </svg>
  );
}

function MiniUndirected() {
  return (
    <svg viewBox="0 0 260 160" className="w-full h-auto">
      <line x1="40" y1="80" x2="125" y2="40" stroke="#6b7280" strokeWidth="2" />
      <line x1="40" y1="80" x2="125" y2="120" stroke="#6b7280" strokeWidth="2" />
      <line x1="155" y1="40" x2="220" y2="80" stroke="#6b7280" strokeWidth="2" />
      <line x1="155" y1="120" x2="220" y2="80" stroke="#6b7280" strokeWidth="2" />
      <line x1="140" y1="40" x2="140" y2="120" stroke="#6b7280" strokeWidth="2" />
      {[
        { x: 40, y: 80, l: "A" },
        { x: 140, y: 40, l: "B" },
        { x: 140, y: 120, l: "C" },
        { x: 230, y: 80, l: "D" },
      ].map((n) => (
        <g key={n.l}>
          <circle cx={n.x} cy={n.y} r={16} fill="#1f2937" stroke="#9ca3af" strokeWidth="2" />
          <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize={12} fontWeight={700} fill="#fff">
            {n.l}
          </text>
        </g>
      ))}
    </svg>
  );
}

function CentralityComparison() {
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
            <th style={{ width: "14%" }}>Ölçü</th>
            <th>Degree</th>
            <th>Betweenness</th>
            <th>Closeness</th>
            <th>Eigenvector</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="saa-row-head">Sorduğu soru</td>
            <td>Kaç doğrudan bağlantın var?</td>
            <td>Bilginin kaç yolu üzerinden geçiyorsun?</td>
            <td>Diğer herkese ortalama ne kadar yakınsın?</td>
            <td>Ne kadar &ldquo;önemli&rdquo; arkadaşların var?</td>
          </tr>
          <tr>
            <td className="saa-row-head">Formül</td>
            <td>
              c<sub>D</sub>(v) = deg(v)
            </td>
            <td>
              c<sub>B</sub>(v) = Σ σ<sub>st</sub>(v) / σ<sub>st</sub>
            </td>
            <td>
              c<sub>C</sub>(v) = 1 / Σ d(v,u)
            </td>
            <td>
              A·x = λ·x (özvektör)
            </td>
          </tr>
          <tr>
            <td className="saa-row-head">Gerçek dünya</td>
            <td>Sınıfın popüleri — en çok arkadaşı</td>
            <td>İki bölümü birbirine bağlayan köprü kişi</td>
            <td>Dedikoduyu en hızlı yayan kişi</td>
            <td>Google PageRank · ünlü dostu olan ünlü</td>
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
          <span>karate_centrality.py · Python 3.12 · NetworkX 3.3</span>
        </div>
      </div>
      <pre className="saa-code p-6 overflow-x-auto m-0">
        <code>
          <span className="saa-code-cmt"># 1) Kütüphaneyi yükle ve klasik Karate Club ağını al</span>
          {"\n"}
          <span className="saa-code-kw">import</span>{" "}
          <span className="saa-code-fn">networkx</span>{" "}
          <span className="saa-code-kw">as</span>{" "}
          <span className="saa-code-fn">nx</span>
          {"\n"}
          {"\n"}
          G = nx.<span className="saa-code-fn">karate_club_graph</span>()
          {"\n"}
          <span className="saa-code-fn">print</span>(
          <span className="saa-code-str">&quot;Düğüm sayısı:&quot;</span>, G.
          <span className="saa-code-fn">number_of_nodes</span>())
          <span className="saa-code-cmt"># 34</span>
          {"\n"}
          <span className="saa-code-fn">print</span>(
          <span className="saa-code-str">&quot;Kenar sayısı:&quot;</span>, G.
          <span className="saa-code-fn">number_of_edges</span>())
          <span className="saa-code-cmt"># 78</span>
          {"\n"}
          {"\n"}
          <span className="saa-code-cmt"># 2) Dört merkezilik ölçüsünü hesapla</span>
          {"\n"}
          deg  = nx.<span className="saa-code-fn">degree_centrality</span>(G)
          {"\n"}
          btw  = nx.<span className="saa-code-fn">betweenness_centrality</span>(G)
          {"\n"}
          clo  = nx.<span className="saa-code-fn">closeness_centrality</span>(G)
          {"\n"}
          eig  = nx.<span className="saa-code-fn">eigenvector_centrality</span>(G)
          {"\n"}
          {"\n"}
          <span className="saa-code-cmt"># 3) En merkezi 3 düğümü yazdır</span>
          {"\n"}
          top = <span className="saa-code-fn">sorted</span>(deg.items(), key=
          <span className="saa-code-kw">lambda</span> x: -x[
          <span className="saa-code-num">1</span>])[:
          <span className="saa-code-num">3</span>]
          {"\n"}
          <span className="saa-code-fn">print</span>(
          <span className="saa-code-str">&quot;Top-3 degree:&quot;</span>, top)
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

  // 1 — Cover
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2105 · 1. Hafta — Sosyal Ağ Analizi</Eyebrow>
        <H1 className="saa-shimmer">
          Sosyal Ağ
          <br />
          Analizi
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Kim, kimi etkiler? Verinin bağlantı yüzü.
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 flex items-center justify-center gap-6 flex-wrap"
        >
          <div className="saa-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center font-bold"
              style={{ background: "rgba(15,20,25,0.8)", color: "#ffffff" }}
            >
              X
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Twitter / X</div>
              <div className="text-[10px] text-gray-500">Yönlü takip ağı</div>
            </div>
          </div>
          <div className="saa-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center font-bold text-sm"
              style={{ background: "rgba(10,102,194,0.18)", color: "#0a66c2" }}
            >
              in
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">LinkedIn</div>
              <div className="text-[10px] text-gray-500">Profesyonel ağ</div>
            </div>
          </div>
          <div className="saa-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(225,48,108,0.18)" }}
            >
              <Hash className="w-5 h-5" style={{ color: "#e1306c" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Instagram</div>
              <div className="text-[10px] text-gray-500">Etkileşim grafı</div>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 2 — Bu dönem ne öğreneceğiz (15 hafta map)
  () => {
    const weeks: Array<{ w: string; t: string; me?: boolean }> = [
      { w: "01", t: "Ağ merkezilik ölçüleri", me: true },
      { w: "02", t: "Ağ görselleştirme" },
      { w: "03", t: "Veri toplama (API, scraping)" },
      { w: "04", t: "Yönlü & ağırlıklı ağlar" },
      { w: "05", t: "Topluluk tespiti — Louvain" },
      { w: "06", t: "Modularite & Girvan-Newman" },
      { w: "07", t: "Vize" },
      { w: "08", t: "Küçük dünya & ölçeksiz ağlar" },
      { w: "09", t: "ERGM modelleri" },
      { w: "10", t: "Bilgi yayılımı (SI, SIR)" },
      { w: "11", t: "Etki maksimizasyonu" },
      { w: "12", t: "Sentiment + ağ" },
      { w: "13", t: "Veri etiği & gizlilik" },
      { w: "14", t: "Proje sunumları" },
      { w: "15", t: "Final" },
    ];
    return (
      <SlideShell>
        <Eyebrow>Dönem Haritası</Eyebrow>
        <H2 className="mb-2">15 haftada sosyal ağ analizi</H2>
        <Sub className="mb-8">
          Bugün başladığımız yer:{" "}
          <span className="text-[#5eead4] font-semibold">Ağ Merkezilik Ölçüleri</span>
          .
        </Sub>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {weeks.map((wk, i) => (
            <motion.div
              key={wk.w}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className={`rounded-lg p-3 border ${
                wk.me
                  ? "saa-card-teal border-[#14b8a6]"
                  : "saa-card border-transparent"
              }`}
            >
              <div
                className={`text-[10px] font-mono uppercase tracking-wider ${
                  wk.me ? "text-[#5eead4]" : "text-gray-500"
                }`}
              >
                H {wk.w}
              </div>
              <div
                className={`text-xs mt-1 leading-snug ${
                  wk.me ? "text-white font-semibold" : "text-gray-300"
                }`}
              >
                {wk.t}
              </div>
            </motion.div>
          ))}
        </div>
      </SlideShell>
    );
  },

  // 3 — İstatistikler
  () => (
    <SlideShell>
      <Eyebrow>Rakamlarla Sosyal Ağlar</Eyebrow>
      <H2 className="mb-12">Neden ağ analizi öğreniyoruz?</H2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          value="6 derece"
          label="Milgram’ın küçük dünya deneyi — ortalama bağlantı"
          source="Milgram, 1967"
        />
        <StatCard
          icon={Briefcase}
          value="300+"
          label="İş bulan ortalama LinkedIn bağlantı sayısı"
          source="LinkedIn Talent, 2024"
          delay={0.1}
        />
        <StatCard
          icon={Zap}
          value="1 dk"
          label="Twitter’da viral olma eşiği (ilk dk etkileşimi)"
          source="MIT Tech Review, 2023"
          delay={0.2}
        />
        <StatCard
          icon={Globe}
          value="4.7 mlr"
          label="2024 küresel sosyal medya kullanıcısı"
          source="DataReportal, 2024"
          delay={0.3}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 saa-card rounded-xl p-5 text-center"
      >
        <div className="text-sm text-gray-300">
          BVA mezunu için sosyal ağ analizi —{" "}
          <span className="text-[#5eead4] font-semibold">
            pazarlama, kriz iletişimi, sahte hesap tespiti, öneri sistemleri
          </span>
          {"  "}gibi pek çok alanda doğrudan iş çıkarır.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 4 — Quote (Milgram)
  () => (
    <QuoteSlide
      quote="Tanımadığın bir insanla aranızda en fazla altı el sıkışma var."
      author="Stanley Milgram"
      role="Sosyal psikolog · Küçük Dünya Deneyi (1967)"
    />
  ),

  /* ─────────────────  1. AĞ NEDİR?  ───────────────── */

  // 5 — Section divider 1/3
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Ağ Nedir?"
      subtitle="Düğümler, kenarlar ve sosyal verinin grafa dönüşümü"
      bgGradient="linear-gradient(135deg, #14b8a6, #0d9488)"
      shadow="0 20px 60px -10px rgba(20, 184, 166, 0.6)"
      icon={<Share2 className="w-16 h-16 text-white" />}
    />
  ),

  // 6 — Düğüm ve Kenar
  () => (
    <SlideShell>
      <Eyebrow>Temel İki Kavram</Eyebrow>
      <H2 className="mb-8">Düğüm (Node) ve Kenar (Edge)</H2>
      <div className="grid md:grid-cols-2 gap-5 mb-6">
        <FeatureCard
          icon={Users}
          title="Düğüm — Node (V)"
          desc="Ağdaki birim: bir kişi, bir hesap, bir hashtag, bir şirket… Sosyal ağda genelde bir kullanıcı."
          accent="#14b8a6"
          delay={0.1}
        />
        <FeatureCard
          icon={GitBranch}
          title="Kenar — Edge (E)"
          desc="İki düğüm arasındaki ilişki: arkadaşlık, takip, retweet, mesaj, beğeni. Yönlü ya da yönsüz olabilir."
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
        G = (V, E) &nbsp;·&nbsp; V = düğüm kümesi &nbsp;·&nbsp; E ⊆ V × V (kenar
        kümesi)
      </motion.div>
      <div className="mt-6 grid grid-cols-2 gap-6 max-w-2xl mx-auto">
        <div className="saa-card rounded-lg p-3">
          <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-1 text-center">
            Yönsüz · arkadaşlık
          </div>
          <MiniUndirected />
        </div>
        <div className="saa-card rounded-lg p-3">
          <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-1 text-center">
            Yönlü · takip
          </div>
          <MiniDirected />
        </div>
      </div>
    </SlideShell>
  ),

  // 7 — Yönlü vs Yönsüz
  () => (
    <SlideShell>
      <Eyebrow>İki Ağ Türü</Eyebrow>
      <H2 className="mb-10">Yönlü vs. Yönsüz Ağ</H2>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <ArrowRight className="w-6 h-6 text-[#5eead4]" />
            <h3 className="text-xl font-semibold text-white">Yönlü Ağ</h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Kenarın bir yönü vardır.{" "}
            <span className="text-[#5eead4] font-semibold">
              A → B
            </span>{" "}
            ile <span className="text-[#5eead4] font-semibold">B → A</span>{" "}
            farklıdır.
          </p>
          <ul className="text-sm text-gray-400 space-y-1 mb-4">
            <li>· Twitter / X takip ağı</li>
            <li>· Instagram takip ağı</li>
            <li>· Mesaj gönderme ağı</li>
          </ul>
          <MiniDirected />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Share2 className="w-6 h-6 text-gray-300" />
            <h3 className="text-xl font-semibold text-white">Yönsüz Ağ</h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Kenar simetriktir.{" "}
            <span className="text-gray-200 font-semibold">A — B</span> demek
            ikisinin de birbirini tanıdığı demektir.
          </p>
          <ul className="text-sm text-gray-400 space-y-1 mb-4">
            <li>· Facebook arkadaşlık</li>
            <li>· LinkedIn bağlantı</li>
            <li>· WhatsApp grup üyeliği</li>
          </ul>
          <MiniUndirected />
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 8 — Graph Mockup (large)
  () => (
    <SlideShell>
      <Eyebrow>Görsel Örnek</Eyebrow>
      <H2 className="mb-6">Küçük bir sosyal ağ — 8 kişi, 14 ilişki</H2>
      <GraphMockup />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-5 text-center text-xs text-gray-500"
      >
        <span className="text-[#5eead4]">Ali</span> herkesle bağlantılı — hub.
        Onu çıkarsak ağ ikiye bölünebilir. Ölçmeden de görüyoruz — peki sayısal
        olarak nasıl ölçülür?
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  2. MERKEZİLİK ÖLÇÜLERİ  ───────────────── */

  // 9 — Section divider 2/3
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Merkezilik Ölçüleri"
      subtitle="Bir ağda 'önemli' düğümü dört farklı şekilde ölçmek"
      bgGradient="linear-gradient(135deg, #0d9488, #134e4a)"
      shadow="0 20px 60px -10px rgba(13, 148, 136, 0.6)"
      icon={<Target className="w-16 h-16 text-white" />}
    />
  ),

  // 10 — Degree Centrality (derece)
  () => (
    <SlideShell>
      <Eyebrow>1 / 4 — Derece Merkeziliği</Eyebrow>
      <H2 className="mb-4">Degree Centrality</H2>
      <Sub className="mb-8">Sosyal ağın en sezgisel popülerlik ölçüsü.</Sub>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-wider text-[#5eead4] mb-3">
            Tanım
          </div>
          <p className="text-base text-gray-200 leading-relaxed mb-5">
            Bir düğümün <span className="text-[#5eead4]">doğrudan</span> kaç
            bağlantısı olduğu. Sosyal ağda &ldquo;kaç arkadaşı var?&rdquo;
            sorusunun cevabı.
          </p>
          <div className="saa-card rounded-lg p-4 font-mono text-sm text-[#a7f3d0] text-center">
            c<sub>D</sub>(v) = deg(v)
          </div>
          <div className="mt-4 text-xs text-gray-500 font-mono">
            Normalize: c<sub>D</sub>(v) = deg(v) / (n − 1)
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-wider text-gray-400 mb-3">
            Gerçek dünya örneği
          </div>
          <div className="flex items-start gap-3 mb-4">
            <Users className="w-5 h-5 text-[#5eead4] mt-1" />
            <p className="text-sm text-gray-300 leading-relaxed">
              Lisede en çok arkadaşı olan kişi. LinkedIn’de 500+ bağlantısı
              olan profesyonel.
            </p>
          </div>
          <div className="flex items-start gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-[#5eead4] mt-1" />
            <p className="text-sm text-gray-300 leading-relaxed">
              Instagram’da takipçi sayısı — basit ama yanıltıcı (sahte hesap
              riski var).
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-[#5eead4] mt-1" />
            <p className="text-sm text-gray-300 leading-relaxed">
              Yönlü ağda <span className="text-[#5eead4]">in-degree</span>{" "}
              (takipçi) ve <span className="text-[#5eead4]">out-degree</span>{" "}
              (takip edilen) ayrı hesaplanır.
            </p>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 11 — DegreeExample
  () => (
    <SlideShell>
      <Eyebrow>Pratik · Degree Centrality</Eyebrow>
      <H2 className="mb-6">Hadi sayalım</H2>
      <Sub className="mb-6">
        Her düğümün altında derecesi yazılı. En yüksek olan{" "}
        <span className="text-[#5eead4] font-semibold">B</span> — derece 5.
      </Sub>
      <DegreeExample />
    </SlideShell>
  ),

  // 12 — Betweenness Centrality (aradalık)
  () => (
    <SlideShell>
      <Eyebrow>2 / 4 — Aradalık Merkeziliği</Eyebrow>
      <H2 className="mb-4">Betweenness Centrality</H2>
      <Sub className="mb-8">
        Bilginin akış kontrolünü kim elinde tutuyor?
      </Sub>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-wider text-[#5eead4] mb-3">
            Tanım
          </div>
          <p className="text-base text-gray-200 leading-relaxed mb-5">
            Tüm düğüm çiftleri arasındaki{" "}
            <span className="text-[#5eead4]">en kısa yolların</span> kaçında
            v düğümünden geçilir. Yüksek değer → köprü kişi.
          </p>
          <div className="saa-card rounded-lg p-4 font-mono text-xs text-[#a7f3d0] text-center">
            c<sub>B</sub>(v) = Σ<sub>s≠v≠t</sub> σ<sub>st</sub>(v) / σ
            <sub>st</sub>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-wider text-gray-400 mb-3">
            Gerçek dünya örneği
          </div>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-3">
              <Network className="w-5 h-5 text-[#5eead4] mt-0.5" />
              <span>
                İki ayrı bölüm arasında iletişim kuran{" "}
                <span className="text-[#5eead4]">tek sekreter</span>.
              </span>
            </li>
            <li className="flex gap-3">
              <Filter className="w-5 h-5 text-[#5eead4] mt-0.5" />
              <span>
                Bir gazetede haberin yazardan editöre, oradan yayına ulaştığı
                geçit kişiler.
              </span>
            </li>
            <li className="flex gap-3">
              <Brain className="w-5 h-5 text-[#5eead4] mt-0.5" />
              <span>
                Bu kişiyi kaybetmek → ağı{" "}
                <span className="text-[#5eead4]">parçalara böler</span>. Kriz
                yönetiminde kritiktir.
              </span>
            </li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 13 — Closeness Centrality (yakınlık)
  () => (
    <SlideShell>
      <Eyebrow>3 / 4 — Yakınlık Merkeziliği</Eyebrow>
      <H2 className="mb-4">Closeness Centrality</H2>
      <Sub className="mb-8">Haberi en hızlı kim yayar?</Sub>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-wider text-[#5eead4] mb-3">
            Tanım
          </div>
          <p className="text-base text-gray-200 leading-relaxed mb-5">
            Düğümün ağdaki{" "}
            <span className="text-[#5eead4]">diğer herkese ortalama
              uzaklığının</span>{" "}
            tersi. Düşük ortalama uzaklık → yüksek yakınlık.
          </p>
          <div className="saa-card rounded-lg p-4 font-mono text-xs text-[#a7f3d0] text-center">
            c<sub>C</sub>(v) = 1 / Σ<sub>u</sub> d(v, u)
          </div>
          <div className="mt-3 text-xs text-gray-500">
            d(v,u) = v ile u arasındaki en kısa yol uzunluğu
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-wider text-gray-400 mb-3">
            Gerçek dünya örneği
          </div>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-3">
              <Zap className="w-5 h-5 text-[#5eead4] mt-0.5" />
              <span>
                Mahalledeki dedikoduyu en hızlı yayan kişi — herkese yakın
                konumdadır.
              </span>
            </li>
            <li className="flex gap-3">
              <Activity className="w-5 h-5 text-[#5eead4] mt-0.5" />
              <span>
                Pandemide ilk bilgilendirmenin geçtiği &ldquo;merkezi&rdquo;
                halk sağlığı çalışanı.
              </span>
            </li>
            <li className="flex gap-3">
              <Sparkles className="w-5 h-5 text-[#5eead4] mt-0.5" />
              <span>
                Bir markanın influencer seçiminde — &ldquo;mesajım kaç adımda
                herkese ulaşır?&rdquo;
              </span>
            </li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 14 — Eigenvector Centrality
  () => (
    <SlideShell>
      <Eyebrow>4 / 4 — Özvektör Merkeziliği</Eyebrow>
      <H2 className="mb-4">Eigenvector Centrality</H2>
      <Sub className="mb-8">
        Önemli olmak demek — önemli kişilerle bağlantılı olmak demektir.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-wider text-[#5eead4] mb-3">
            Tanım
          </div>
          <p className="text-base text-gray-200 leading-relaxed mb-5">
            Bir düğümün önemi,{" "}
            <span className="text-[#5eead4]">komşularının önemine</span>{" "}
            bağlıdır. Komşum ne kadar önemliyse, ben de o kadar önemliyim.
          </p>
          <div className="saa-card rounded-lg p-4 font-mono text-xs text-[#a7f3d0] text-center">
            A · x = λ · x &nbsp; (A: komşuluk matrisi)
          </div>
          <div className="mt-3 text-xs text-gray-500">
            En büyük öz-değere karşılık gelen öz-vektörün bileşenleri.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-wider text-gray-400 mb-3">
            Google PageRank
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Google&apos;ın 1998&apos;de arama motorunu kuran algoritma —{" "}
            <span className="text-[#5eead4]">PageRank</span> — özvektör
            merkeziliğinin doğrudan bir varyantıdır.
          </p>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Bir sayfaya{" "}
            <span className="text-[#5eead4]">popüler sayfalar</span> link
            veriyorsa o sayfa da önemli sayılır.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Database className="w-4 h-4" />
            <span>
              Twitter&apos;da &ldquo;ünlü dostu olan ünlü&rdquo;yü bulur.
            </span>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 15 — CentralityComparison table
  () => (
    <SlideShell>
      <Eyebrow>Toparlayalım</Eyebrow>
      <H2 className="mb-2">Dört merkezilik ölçüsü yan yana</H2>
      <Sub className="mb-6">
        Aynı ağ üzerinde &ldquo;en merkezi düğüm&rdquo; sorusuna her ölçü{" "}
        <span className="text-[#5eead4] font-semibold">farklı</span> cevap
        verir.
      </Sub>
      <CentralityComparison />
    </SlideShell>
  ),

  /* ─────────────────  3. PRATİKTE  ───────────────── */

  // 16 — Section divider 3/3
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Pratikte"
      subtitle="NetworkX, Gephi ve bu hafta yapılacaklar"
      bgGradient="linear-gradient(135deg, #0d9488, #115e59)"
      shadow="0 20px 60px -10px rgba(13, 148, 136, 0.6)"
      icon={<Briefcase className="w-16 h-16 text-white" />}
    />
  ),

  // 17 — Python NetworkX kod örneği
  () => (
    <SlideShell>
      <Eyebrow>Python · NetworkX</Eyebrow>
      <H2 className="mb-6">Dört ölçü, dört satır</H2>
      <CodeBlock />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-5 text-xs text-gray-500 text-center"
      >
        Karate Club veri seti: Zachary&apos;nin 34 kişilik karate kulübü ağı —
        sosyal ağ analizinin &ldquo;Hello World&rdquo;u.
      </motion.div>
    </SlideShell>
  ),

  // 18 — Bu hafta yapılacaklar
  () => {
    const items: Array<{ t: string; d: string; icon: LucideIcon }> = [
      {
        t: "Python + NetworkX kur",
        d: "pip install networkx matplotlib · Colab kullanmayı tercih edebilirsin.",
        icon: Code2,
      },
      {
        t: "Karate Club veri setini yükle",
        d: "nx.karate_club_graph() · 34 düğüm, 78 kenar. İlk grafiği çiz.",
        icon: Database,
      },
      {
        t: "Dört merkezilik ölçüsünü hesapla",
        d: "degree · betweenness · closeness · eigenvector — Top-3 düğümleri raporla.",
        icon: BarChart3,
      },
      {
        t: "Gephi indir & arayüze alış",
        d: "gephi.org · ücretsiz · ödevlerde görsel için kullanacağız.",
        icon: Search,
      },
    ];
    return (
      <SlideShell>
        <Eyebrow>Haftalık Görevler</Eyebrow>
        <H2 className="mb-8">Bu hafta yap-bitir listesi</H2>
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
      </SlideShell>
    );
  },

  // 19 — Sıradaki hafta
  () => (
    <SlideShell>
      <Eyebrow>Sıradaki Hafta</Eyebrow>
      <H2 className="mb-8">2. Hafta — Ağ görselleştirme teknikleri</H2>
      <div className="grid md:grid-cols-3 gap-5">
        <FeatureCard
          icon={Layers}
          title="Yerleştirme algoritmaları"
          desc="Force-directed (Fruchterman-Reingold), circular, hierarchical — hangi düzen ne anlatır?"
          accent="#14b8a6"
          delay={0.1}
        />
        <FeatureCard
          icon={GraduationCap}
          title="Gephi ile pratik"
          desc="Karate Club ağını import et, renklendirme, boyutlandırma, etiketleme — sunum kalitesinde grafik."
          accent="#0d9488"
          delay={0.25}
        />
        <FeatureCard
          icon={Brain}
          title="Görsel yalan ve doğru"
          desc="Yanıltıcı görsellerden kaçınma · scale, renk seçimi, &ldquo;hairball&rdquo; problemi."
          accent="#5eead4"
          delay={0.4}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-10 saa-card-teal rounded-xl p-5 text-center"
      >
        <div className="text-sm text-gray-300">
          Hazırlık önerisi:{" "}
          <span className="text-[#5eead4] font-semibold">Gephi 0.10</span>{" "}
          kurulmuş ve bu haftanın merkezilik sayıları{" "}
          <span className="text-[#5eead4] font-semibold">CSV</span>’ye
          aktarılmış olsun.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 20 — Teşekkürler + iletişim
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
          <Network className="w-12 h-12 text-white" />
        </motion.div>
        <H1 className="saa-shimmer-teal">Teşekkürler</H1>
        <Sub className="mt-6">
          Sorularınız?{" "}
          <span className="text-[#5eead4]">
            Hafta 2&apos;de görüşmek üzere.
          </span>
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
          BVA 2105 · 1. Hafta · Ağ Merkezilik Ölçüleri
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
