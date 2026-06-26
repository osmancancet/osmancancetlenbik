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
  GitMerge,
  Scissors,
  Activity,
  Target,
  Users,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  Sparkles,
  Hash,
  BarChart3,
  Brain,
  Lightbulb,
  Database,
  Search,
  Code2,
  Calendar,
  Layers,
  Filter,
  Gauge,
  Repeat,
  Split,
  Workflow,
  TrendingUp,
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
   KONUYA ÖZGÜ MOCKUP'LAR  (Hafta 5 — Topluluk Tespiti)
   ============================================================ */

type CNode = {
  id: string;
  x: number;
  y: number;
  label: string;
  comm: "a" | "b" | "c";
};
type CEdge = { from: string; to: string; bridge?: boolean };

const COMM_COLOR: Record<"a" | "b" | "c", { fill: string; stroke: string }> = {
  a: { fill: "#0d9488", stroke: "#5eead4" },
  b: { fill: "#92400e", stroke: "#fbbf24" },
  c: { fill: "#4c1d95", stroke: "#c4b5fd" },
};

function CommunityGraph() {
  // Üç belirgin topluluk + aralarında ince köprü kenarlar
  const nodes: CNode[] = [
    // Topluluk A (sol üst)
    { id: "a1", x: 120, y: 90, label: "A1", comm: "a" },
    { id: "a2", x: 230, y: 70, label: "A2", comm: "a" },
    { id: "a3", x: 180, y: 180, label: "A3", comm: "a" },
    { id: "a4", x: 90, y: 190, label: "A4", comm: "a" },
    // Topluluk B (sağ üst)
    { id: "b1", x: 620, y: 90, label: "B1", comm: "b" },
    { id: "b2", x: 720, y: 150, label: "B2", comm: "b" },
    { id: "b3", x: 640, y: 210, label: "B3", comm: "b" },
    { id: "b4", x: 730, y: 60, label: "B4", comm: "b" },
    // Topluluk C (alt orta)
    { id: "c1", x: 360, y: 360, label: "C1", comm: "c" },
    { id: "c2", x: 470, y: 360, label: "C2", comm: "c" },
    { id: "c3", x: 415, y: 270, label: "C3", comm: "c" },
    { id: "c4", x: 415, y: 440, label: "C4", comm: "c" },
  ];
  const edges: CEdge[] = [
    // A içi (yoğun)
    { from: "a1", to: "a2" },
    { from: "a1", to: "a3" },
    { from: "a1", to: "a4" },
    { from: "a2", to: "a3" },
    { from: "a3", to: "a4" },
    // B içi (yoğun)
    { from: "b1", to: "b2" },
    { from: "b1", to: "b3" },
    { from: "b1", to: "b4" },
    { from: "b2", to: "b3" },
    { from: "b2", to: "b4" },
    // C içi (yoğun)
    { from: "c1", to: "c2" },
    { from: "c1", to: "c3" },
    { from: "c2", to: "c3" },
    { from: "c1", to: "c4" },
    { from: "c2", to: "c4" },
    // Topluluklar arası KÖPRÜLER (seyrek)
    { from: "a2", to: "b1", bridge: true },
    { from: "a3", to: "c3", bridge: true },
    { from: "b3", to: "c3", bridge: true },
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
          <span>Gephi · topluluk_ornek.gexf · 12 düğüm · 18 kenar · 3 topluluk</span>
        </div>
      </div>
      <div className="p-4 bg-[#070b0a]">
        <svg viewBox="0 0 800 480" className="w-full h-auto">
          {edges.map((e, i) => {
            const a = find(e.from);
            const b = find(e.to);
            return (
              <line
                key={`ce-${i}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={e.bridge ? "#f87171" : "#374151"}
                strokeWidth={e.bridge ? 2.4 : 1.6}
                strokeOpacity={e.bridge ? 0.9 : 0.6}
                strokeDasharray={e.bridge ? "6 4" : undefined}
              />
            );
          })}
          {nodes.map((n) => {
            const c = COMM_COLOR[n.comm];
            return (
              <g key={n.id}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={22}
                  fill={c.fill}
                  stroke={c.stroke}
                  strokeWidth={2}
                />
                <text
                  x={n.x}
                  y={n.y + 4}
                  textAnchor="middle"
                  fontSize={12}
                  fontWeight={700}
                  fill="#ffffff"
                  fontFamily="Inter, sans-serif"
                >
                  {n.label}
                </text>
              </g>
            );
          })}
          {/* Köprü etiketi */}
          <g>
            <rect
              x={300}
              y={150}
              width={140}
              height={22}
              rx={6}
              fill="#f87171"
              fillOpacity={0.16}
              stroke="#f87171"
              strokeOpacity={0.7}
            />
            <text
              x={370}
              y={165}
              textAnchor="middle"
              fontSize={11}
              fill="#fca5a5"
              fontFamily="Inter, sans-serif"
              fontWeight={700}
            >
              köprü kenar · seyrek
            </text>
          </g>
        </svg>
        <div className="mt-2 flex items-center justify-center gap-5 text-[11px] font-mono">
          <span className="saa-comm-a">● Topluluk A</span>
          <span className="saa-comm-b">● Topluluk B</span>
          <span className="saa-comm-c">● Topluluk C</span>
          <span className="text-[#fca5a5]">- - - köprü</span>
        </div>
      </div>
    </motion.div>
  );
}

function ModularityFormula() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="saa-card-teal rounded-xl p-6"
    >
      <div className="text-xs uppercase tracking-wider text-[#5eead4] mb-4">
        Modularite (Q)
      </div>
      <div className="saa-card rounded-lg p-5 font-mono text-base text-[#a7f3d0] text-center leading-relaxed">
        Q = (1 / 2m) · Σ<sub>ij</sub>
        <span className="text-white"> [ A</span>
        <sub>ij</sub>
        <span className="text-white"> − (k</span>
        <sub>i</sub>
        <span className="text-white">·k</span>
        <sub>j</sub>
        <span className="text-white"> / 2m) ] · δ(c</span>
        <sub>i</sub>
        <span className="text-white">, c</span>
        <sub>j</sub>
        <span className="text-white">)</span>
      </div>
      <ul className="mt-5 space-y-2 text-sm text-gray-300">
        <li>
          <span className="text-[#5eead4] font-mono">A</span>
          <sub className="text-[#5eead4]">ij</sub> — i ve j arasında kenar var
          mı (komşuluk matrisi)
        </li>
        <li>
          <span className="text-[#5eead4] font-mono">k</span>
          <sub className="text-[#5eead4]">i</sub>·k<sub>j</sub>/2m — rastgele bir
          ağda beklenen kenar
        </li>
        <li>
          <span className="text-[#5eead4] font-mono">δ(c</span>
          <sub className="text-[#5eead4]">i</sub>,c<sub>j</sub>) — i ve j aynı
          toplulukta mı (1) değil mi (0)
        </li>
        <li>
          <span className="text-[#5eead4] font-mono">m</span> — toplam kenar
          sayısı
        </li>
      </ul>
      <div className="mt-4 text-xs text-gray-500">
        Q genelde −0.5 ile 1 arasındadır. Pratikte{" "}
        <span className="text-[#5eead4]">Q &gt; 0.3</span> anlamlı bir topluluk
        yapısının işareti sayılır.
      </div>
    </motion.div>
  );
}

function LouvainSteps() {
  const steps = [
    {
      n: "1",
      title: "Yerel optimizasyon",
      desc: "Her düğüm başlangıçta tek başına bir topluluktur. Sırayla her düğüm, komşularının topluluğuna taşınınca Q en çok artıyorsa oraya katılır.",
      icon: Repeat,
    },
    {
      n: "2",
      title: "Toplulaştırma (aggregation)",
      desc: "Bulunan topluluklar tek bir süper-düğüme indirgenir; iç kenarlar öz-döngü, aralarındaki kenarlar ağırlık olur. Yeni, küçük graf elde edilir.",
      icon: Layers,
    },
    {
      n: "↻",
      title: "Tekrarla",
      desc: "1 ve 2 adımları, Q artık artmayana kadar tekrarlanır. Her tur ağı kabalaştırır — bu yüzden çok hızlıdır (milyonlarca düğüme ölçeklenir).",
      icon: Workflow,
    },
  ];
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {steps.map((s, i) => (
        <motion.div
          key={s.n}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + i * 0.12 }}
          className="saa-card rounded-xl p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="saa-step-badge w-9 h-9 rounded-md flex items-center justify-center text-sm">
              {s.n}
            </span>
            <s.icon className="w-5 h-5 text-[#5eead4]" />
          </div>
          <h3 className="text-base font-semibold text-white mb-2">{s.title}</h3>
          <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

function Dendrogram() {
  // Girvan-Newman: kenar çıkarıldıkça ağ parçalanır → ağaç
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="saa-card rounded-xl p-5"
    >
      <svg viewBox="0 0 720 360" className="w-full h-auto">
        {/* Kök: tek topluluk (en üst) */}
        <line x1="360" y1="40" x2="360" y2="80" stroke="#5eead4" strokeWidth="2" />
        {/* 1. bölünme → 2 dal */}
        <line x1="180" y1="80" x2="540" y2="80" stroke="#5eead4" strokeWidth="2" />
        <line x1="180" y1="80" x2="180" y2="140" stroke="#5eead4" strokeWidth="2" />
        <line x1="540" y1="80" x2="540" y2="140" stroke="#5eead4" strokeWidth="2" />
        {/* Sol dal sabit kalır (A topluluğu) */}
        <line x1="180" y1="140" x2="180" y2="300" stroke="#fbbf24" strokeWidth="2" />
        {/* Sağ dal 2. bölünme → B ve C */}
        <line x1="430" y1="140" x2="640" y2="140" stroke="#5eead4" strokeWidth="2" />
        <line x1="430" y1="140" x2="430" y2="300" stroke="#c4b5fd" strokeWidth="2" />
        <line x1="640" y1="140" x2="640" y2="300" stroke="#a78bfa" strokeWidth="2" />

        {/* Düğümler / etiketler */}
        <g>
          <circle cx="360" cy="40" r="9" fill="#0d9488" stroke="#5eead4" strokeWidth="2" />
          <text x="380" y="44" fontSize="12" fill="#9ca3af" fontFamily="Inter">
            Tüm ağ — tek topluluk
          </text>
        </g>

        {[
          { x: 180, c: "#fbbf24", l: "A" },
          { x: 430, c: "#c4b5fd", l: "C" },
          { x: 640, c: "#a78bfa", l: "B" },
        ].map((leaf) => (
          <g key={leaf.l}>
            <rect
              x={leaf.x - 26}
              y={305}
              width={52}
              height={28}
              rx={6}
              fill={leaf.c}
              fillOpacity={0.18}
              stroke={leaf.c}
              strokeOpacity={0.8}
            />
            <text
              x={leaf.x}
              y={323}
              textAnchor="middle"
              fontSize={13}
              fontWeight={700}
              fill="#ffffff"
              fontFamily="Inter"
            >
              {leaf.l}
            </text>
          </g>
        ))}

        {/* Bölünme açıklamaları */}
        <text x="290" y="115" fontSize="11" fill="#fca5a5" fontFamily="Inter">
          1. en yüksek aradalıklı kenar kesilir
        </text>
        <text x="455" y="175" fontSize="11" fill="#fca5a5" fontFamily="Inter">
          2. kesim
        </text>
      </svg>
      <div className="mt-2 text-xs text-gray-400 text-center">
        Yukarıdan aşağı: kenarlar kesildikçe ağ alt-topluluklara ayrışır.{" "}
        <span className="text-[#5eead4]">En yüksek Q</span> veren kesim seviyesi
        seçilir.
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
            <th>Louvain</th>
            <th>Girvan–Newman</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="saa-row-head">Yaklaşım</td>
            <td>
              Birleştirici (agglomerative) — düğümleri topluluklara{" "}
              <span className="text-[#5eead4]">birleştirir</span>
            </td>
            <td>
              Bölücü (divisive) — köprü kenarları{" "}
              <span className="text-[#5eead4]">tek tek siler</span>
            </td>
          </tr>
          <tr>
            <td className="saa-row-head">Temel ölçü</td>
            <td>Modularite kazancı (ΔQ)</td>
            <td>Kenar aradalığı (edge betweenness)</td>
          </tr>
          <tr>
            <td className="saa-row-head">Karmaşıklık</td>
            <td>
              Yaklaşık <span className="font-mono">O(n·log n)</span> — çok hızlı
            </td>
            <td>
              Yaklaşık <span className="font-mono">O(m²·n)</span> — ağır
            </td>
          </tr>
          <tr>
            <td className="saa-row-head">Ölçek</td>
            <td>Milyonlarca düğüm</td>
            <td>Küçük / orta ağlar (birkaç bin düğüm)</td>
          </tr>
          <tr>
            <td className="saa-row-head">Çıktı</td>
            <td>Düz topluluk ataması (hızlı sonuç)</td>
            <td>Hiyerarşi / dendrogram (iç içe yapı)</td>
          </tr>
          <tr>
            <td className="saa-row-head">Topluluk sayısı</td>
            <td>Otomatik (Q&apos;yu maksimize ederek)</td>
            <td>İstenen seviyede kesilerek seçilir</td>
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
          <span>topluluk_tespiti.py · Python 3.12 · NetworkX 3.3</span>
        </div>
      </div>
      <pre className="saa-code p-6 overflow-x-auto m-0">
        <code>
          <span className="saa-code-cmt"># Klasik Karate Club ağı üzerinde iki algoritma</span>
          {"\n"}
          <span className="saa-code-kw">import</span>{" "}
          <span className="saa-code-fn">networkx</span>{" "}
          <span className="saa-code-kw">as</span>{" "}
          <span className="saa-code-fn">nx</span>
          {"\n"}
          <span className="saa-code-kw">from</span> networkx.algorithms{" "}
          <span className="saa-code-kw">import</span> community{" "}
          <span className="saa-code-kw">as</span> nx_comm
          {"\n"}
          {"\n"}
          G = nx.<span className="saa-code-fn">karate_club_graph</span>()
          {"\n"}
          {"\n"}
          <span className="saa-code-cmt"># 1) Louvain — modulariteyi maksimize eden hızlı yöntem</span>
          {"\n"}
          louvain = nx_comm.
          <span className="saa-code-fn">louvain_communities</span>(G, seed=
          <span className="saa-code-num">42</span>)
          {"\n"}
          <span className="saa-code-fn">print</span>(
          <span className="saa-code-str">&quot;Louvain topluluk sayısı:&quot;</span>,{" "}
          <span className="saa-code-fn">len</span>(louvain))
          {"\n"}
          <span className="saa-code-fn">print</span>(
          <span className="saa-code-str">&quot;Q:&quot;</span>, nx_comm.
          <span className="saa-code-fn">modularity</span>(G, louvain))
          {"\n"}
          {"\n"}
          <span className="saa-code-cmt"># 2) Girvan-Newman — ilk bölünme (en yüksek aradalıklı kenarı siler)</span>
          {"\n"}
          gn = nx_comm.
          <span className="saa-code-fn">girvan_newman</span>(G)
          {"\n"}
          ilk_bolunme ={" "}
          <span className="saa-code-fn">tuple</span>(
          <span className="saa-code-fn">sorted</span>(c){" "}
          <span className="saa-code-kw">for</span> c{" "}
          <span className="saa-code-kw">in</span>{" "}
          <span className="saa-code-fn">next</span>(gn))
          {"\n"}
          <span className="saa-code-fn">print</span>(
          <span className="saa-code-str">&quot;GN ilk bölünme:&quot;</span>,{" "}
          <span className="saa-code-fn">len</span>(ilk_bolunme),{" "}
          <span className="saa-code-str">&quot;topluluk&quot;</span>)
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
        <Eyebrow>BVA 2105 · 5. Hafta — Sosyal Ağ Analizi</Eyebrow>
        <H1 className="saa-shimmer">
          Topluluk
          <br />
          Tespiti
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Bir ağdaki gizli grupları nasıl buluruz? Louvain &amp; Girvan–Newman
          algoritmaları.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={Gauge}
            title="Modularite (Q)"
            desc="Bir bölümlemenin ne kadar iyi olduğunu ölçen sayı."
            accent="#14b8a6"
            delay={0.3}
          />
          <FeatureCard
            icon={GitMerge}
            title="Louvain"
            desc="Düğümleri hızla topluluklara birleştiren yöntem."
            accent="#0d9488"
            delay={0.45}
          />
          <FeatureCard
            icon={Scissors}
            title="Girvan–Newman"
            desc="Köprü kenarları kesip ağı parçalara ayıran yöntem."
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
          Cuma · 09:55 – 11:35 · NetworkX + Gephi
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 2 — Geçen haftadan köprü / bu haftanın hedefi
  () => (
    <SlideShell>
      <Eyebrow>Köprü · önceki haftalardan bu haftaya</Eyebrow>
      <H2>Önce düğümleri ölçtük; şimdi grupları arıyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Önceki haftalarda tek tek düğümlerin önemini (merkezilik) ve ağ yapısını
        konuştuk. Bu hafta soru değişiyor: ağı kendi içinde{" "}
        <span className="text-[#5eead4]">hangi gruplara</span> ayırabiliriz?
        Etiket olmadan, sadece bağlantı yoğunluğuna bakarak.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#5eead4]">
            <Target className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Bu haftanın hedefi
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] shrink-0" />
              Topluluk (community) kavramını tanımlamak
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] shrink-0" />
              Bir bölümlemeyi modularite ile puanlamak
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] shrink-0" />
              Louvain ve Girvan–Newman&apos;ı çalıştırıp karşılaştırmak
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <Lightbulb className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Nerede işe yarar?
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] shrink-0" />
              Öneri sistemleri — &quot;senin grubun da bunu beğendi&quot;
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] shrink-0" />
              Eko-oda (echo chamber) ve kutuplaşma analizi
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] shrink-0" />
              Bot/troll ağlarında koordineli kümeleri yakalama
            </li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 3 — Topluluk nedir? (sezgi)
  () => (
    <SlideShell>
      <Eyebrow>Sezgi</Eyebrow>
      <H2 className="mb-6">Topluluk nedir?</H2>
      <Sub className="mb-8 max-w-3xl">
        Bir <span className="text-[#5eead4] font-semibold">topluluk</span>; içeride
        yoğun, dışarıya seyrek bağlanan düğüm grubudur. &quot;Kendi içinde çok
        konuşan, başka gruplarla az konuşan&quot; insanlar.
      </Sub>
      <div className="grid md:grid-cols-3 gap-5">
        <FeatureCard
          icon={Users}
          title="İç bağ yoğun"
          desc="Grup üyeleri birbirine çok bağlı — aynı sınıf, aynı takım, aynı ilgi alanı."
          accent="#14b8a6"
          delay={0.1}
        />
        <FeatureCard
          icon={Filter}
          title="Dış bağ seyrek"
          desc="Gruplar arası bağlantı azdır; bu az sayıdaki kenara köprü (bridge) denir."
          accent="#0d9488"
          delay={0.25}
        />
        <FeatureCard
          icon={Search}
          title="Etiketsiz keşif"
          desc="Hiçbir düğümün grubunu bilmeden, yalnızca yapıdan grupları çıkarırız (kümeleme)."
          accent="#5eead4"
          delay={0.4}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="mt-8 saa-card-teal rounded-xl p-5 text-center text-sm text-gray-300"
      >
        Topluluk tespiti, denetimsiz (unsupervised) bir görevdir: doğru cevabı
        veren bir etiket yoktur, &quot;iyi bölümleme&quot;yi{" "}
        <span className="text-[#5eead4] font-semibold">modularite</span> gibi bir
        ölçüyle tanımlarız.
      </motion.div>
    </SlideShell>
  ),

  // 4 — Görsel örnek: topluluklu graf
  () => (
    <SlideShell>
      <Eyebrow>Görsel örnek</Eyebrow>
      <H2 className="mb-6">Üç topluluk, birkaç köprü</H2>
      <CommunityGraph />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-5 text-center text-xs text-gray-500"
      >
        Renkleri biz çözmeden de gözle görebiliyoruz — peki bir algoritma bunu{" "}
        <span className="text-[#5eead4]">sayısal olarak</span> nasıl bulur?
        Cevap: kırmızı köprü kenarlar kesilince ya da düğümler birleştirilince.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  1. MODULARİTE  ───────────────── */

  // 5 — Section divider 1/3
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Modularite"
      subtitle="Bir bölümlemenin ne kadar iyi olduğunu tek bir sayıyla ölçmek"
      bgGradient="linear-gradient(135deg, #14b8a6, #0d9488)"
      shadow="0 20px 60px -10px rgba(20, 184, 166, 0.6)"
      icon={<Gauge className="w-16 h-16 text-white" />}
    />
  ),

  // 6 — Modularite tanım + formül
  () => (
    <SlideShell>
      <Eyebrow>Ölçü · Q</Eyebrow>
      <H2 className="mb-4">İyi bölümleme nedir, nasıl ölçülür?</H2>
      <Sub className="mb-8 max-w-3xl">
        Modularite (Q); bir topluluğun içindeki gerçek kenar yoğunluğunu,{" "}
        <span className="text-[#5eead4]">rastgele</span> bir ağda beklenen
        yoğunlukla karşılaştırır. Beklenenden ne kadar fazla iç-kenar varsa Q o
        kadar yüksektir.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6">
        <ModularityFormula />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-wider text-gray-400 mb-3">
            Nasıl okunur?
          </div>
          <ul className="space-y-4 text-sm text-gray-300">
            <li className="flex gap-3">
              <TrendingUp className="w-5 h-5 text-[#5eead4] mt-0.5 shrink-0" />
              <span>
                Q yükseldikçe topluluklar daha &quot;net&quot; ayrışmıştır.
                Algoritmaların ortak amacı:{" "}
                <span className="text-[#5eead4]">Q&apos;yu artırmak</span>.
              </span>
            </li>
            <li className="flex gap-3">
              <BarChart3 className="w-5 h-5 text-[#5eead4] mt-0.5 shrink-0" />
              <span>
                Tüm düğümleri tek topluluğa koymak Q&apos;yu artırmaz; her
                düğümü ayrı koymak da. Denge bir yerdedir.
              </span>
            </li>
            <li className="flex gap-3">
              <Brain className="w-5 h-5 text-[#5eead4] mt-0.5 shrink-0" />
              <span>
                Dikkat: Q&apos;nun bir{" "}
                <span className="text-[#5eead4]">çözünürlük sınırı</span> vardır
                — çok küçük toplulukları büyük ağda kaçırabilir.
              </span>
            </li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  2. LOUVAIN  ───────────────── */

  // 7 — Section divider 2/3
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Louvain Yöntemi"
      subtitle="Modulariteyi açgözlü (greedy) ve çok hızlı şekilde maksimize eden algoritma"
      bgGradient="linear-gradient(135deg, #0d9488, #134e4a)"
      shadow="0 20px 60px -10px rgba(13, 148, 136, 0.6)"
      icon={<GitMerge className="w-16 h-16 text-white" />}
    />
  ),

  // 8 — Louvain adımları
  () => (
    <SlideShell>
      <Eyebrow>Louvain · iki aşamalı döngü</Eyebrow>
      <H2 className="mb-4">Algoritma nasıl çalışır?</H2>
      <Sub className="mb-8 max-w-3xl">
        Blondel ve arkadaşları (2008) tarafından önerildi. İki basit adımı, hiç
        iyileşme kalmayana kadar tekrarlar — bu yüzden çok büyük ağlarda bile
        saniyeler içinde sonuç verir.
      </Sub>
      <LouvainSteps />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 text-xs text-gray-500 text-center font-mono"
      >
        Açgözlü ve yerel olduğu için sonuç başlangıç sırasına biraz bağlıdır —
        bu yüzden <span className="text-[#5eead4]">seed</span> sabitlemek
        tekrarlanabilirlik için iyidir.
      </motion.div>
    </SlideShell>
  ),

  // 9 — ΔQ: bir düğüm hangi topluluğa katılır?
  () => (
    <SlideShell>
      <Eyebrow>Louvain · karar kuralı</Eyebrow>
      <H2 className="mb-4">Bir düğüm nereye taşınır?</H2>
      <Sub className="mb-8 max-w-3xl">
        Her düğüm için tek soru sorulur: &quot;Komşu topluluklardan hangisine
        geçersem modularite kazancı{" "}
        <span className="text-[#5eead4]">ΔQ</span> en büyük olur?&quot; Kazanç
        pozitifse taşınır, değilse yerinde kalır.
      </Sub>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            n: "i",
            t: "Düğümü çıkar",
            d: "i düğümünü mevcut topluluğundan geçici olarak ayır.",
            icon: Split,
          },
          {
            n: "ΔQ",
            t: "Komşuları dene",
            d: "i'nin her komşu topluluğu için ΔQ hesapla — hangisi en çok kazandırıyor?",
            icon: Repeat,
          },
          {
            n: "✓",
            t: "En iyiye yerleştir",
            d: "En yüksek pozitif ΔQ veren topluluğa kat. Hiçbiri pozitif değilse yerinde kalır.",
            icon: Check,
          },
        ].map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="saa-card-teal rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="saa-step-badge w-10 h-10 rounded-md flex items-center justify-center text-sm">
                {s.n}
              </span>
              <s.icon className="w-5 h-5 text-[#5eead4]" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">{s.t}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{s.d}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 saa-card rounded-lg p-4 font-mono text-sm text-[#a7f3d0] text-center"
      >
        ΔQ &gt; 0 → taşı &nbsp;·&nbsp; ΔQ ≤ 0 → yerinde kal &nbsp;·&nbsp; tüm
        düğümler sabitlenene kadar tur tekrar
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  3. GIRVAN-NEWMAN  ───────────────── */

  // 10 — Section divider 3/3
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Girvan–Newman"
      subtitle="Köprüleri tespit edip keserek ağı yukarıdan aşağı parçalara ayırmak"
      bgGradient="linear-gradient(135deg, #0d9488, #115e59)"
      shadow="0 20px 60px -10px rgba(13, 148, 136, 0.6)"
      icon={<Scissors className="w-16 h-16 text-white" />}
    />
  ),

  // 11 — GN: kenar aradalığı mantığı
  () => (
    <SlideShell>
      <Eyebrow>Girvan–Newman · temel fikir</Eyebrow>
      <H2 className="mb-4">Köprüyü bul, kes, tekrarla</H2>
      <Sub className="mb-8 max-w-3xl">
        Girvan ve Newman (2002): topluluk içi kenarları değil, topluluklar{" "}
        <span className="text-[#5eead4]">arasındaki köprüleri</span> bulup
        keseriz. Köprü kenarlardan çok sayıda en kısa yol geçer — yani{" "}
        <span className="text-[#5eead4]">kenar aradalığı</span> yüksektir.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-wider text-[#5eead4] mb-3">
            Kenar aradalığı (edge betweenness)
          </div>
          <p className="text-base text-gray-200 leading-relaxed mb-5">
            Tüm düğüm çiftleri arasındaki en kısa yolların{" "}
            <span className="text-[#5eead4]">kaçı bu kenardan geçiyor?</span>{" "}
            İki grubu bağlayan tek köprüden neredeyse tüm gruplar-arası yol
            geçer — bu yüzden değeri en yüksektir.
          </p>
          <div className="saa-card rounded-lg p-4 font-mono text-sm text-[#a7f3d0] text-center">
            en yüksek aradalıklı kenarı sil → yeniden hesapla → tekrarla
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-wider text-gray-400 mb-3">
            Döngü
          </div>
          <ol className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-3">
              <span className="saa-step-badge w-7 h-7 rounded-md flex items-center justify-center text-xs shrink-0">
                1
              </span>
              <span>Tüm kenarların aradalığını hesapla.</span>
            </li>
            <li className="flex gap-3">
              <span className="saa-step-badge w-7 h-7 rounded-md flex items-center justify-center text-xs shrink-0">
                2
              </span>
              <span>En yüksek aradalıklı kenarı ağdan sil.</span>
            </li>
            <li className="flex gap-3">
              <span className="saa-step-badge w-7 h-7 rounded-md flex items-center justify-center text-xs shrink-0">
                3
              </span>
              <span>Ağ bir parçaya daha ayrıldıysa kaydet.</span>
            </li>
            <li className="flex gap-3">
              <span className="saa-step-badge w-7 h-7 rounded-md flex items-center justify-center text-xs shrink-0">
                4
              </span>
              <span>Hiç kenar kalmayana kadar 1&apos;e dön.</span>
            </li>
          </ol>
          <div className="mt-4 text-xs text-gray-500">
            Her silmeden sonra aradalık{" "}
            <span className="text-[#5eead4]">yeniden</span> hesaplanır — bu da
            yöntemi yavaşlatan kısımdır.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 12 — Dendrogram
  () => (
    <SlideShell>
      <Eyebrow>Girvan–Newman · çıktı</Eyebrow>
      <H2 className="mb-4">Sonuç bir hiyerarşi: dendrogram</H2>
      <Sub className="mb-6 max-w-3xl">
        Kenarlar kesildikçe ağ giderek daha çok parçaya ayrılır. Bu, iç içe
        toplulukları gösteren bir ağaç (dendrogram) üretir. Hangi seviyede
        durduğumuza, her seviyenin{" "}
        <span className="text-[#5eead4]">modularite (Q)</span> değerine bakarak
        karar veririz.
      </Sub>
      <Dendrogram />
    </SlideShell>
  ),

  // 13 — Louvain vs Girvan-Newman tablo
  () => (
    <SlideShell>
      <Eyebrow>Toparlayalım</Eyebrow>
      <H2 className="mb-2">İki algoritma yan yana</H2>
      <Sub className="mb-6 max-w-3xl">
        İkisi de aynı amaca hizmet eder (toplulukları bulmak) ama yöntemleri ve
        ölçeklenmeleri çok farklıdır. Hangisini seçeceğin{" "}
        <span className="text-[#5eead4] font-semibold">ağın boyutuna</span> ve
        istediğin çıktıya bağlıdır.
      </Sub>
      <CompareTable />
    </SlideShell>
  ),

  // 14 — Python kod
  () => (
    <SlideShell>
      <Eyebrow>Python · NetworkX</Eyebrow>
      <H2 className="mb-6">İki algoritma, birkaç satır</H2>
      <CodeBlock />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-5 text-xs text-gray-500 text-center"
      >
        Karate Club ağı topluluk tespitinin klasik test setidir: gerçek hayatta
        kulüp ikiye bölünmüştü ve algoritmalar bu bölünmeyi büyük ölçüde
        yakalar.
      </motion.div>
    </SlideShell>
  ),

  // 15 — Uygulamalı lab
  () => {
    const items: Array<{ t: string; d: string; icon: LucideIcon }> = [
      {
        t: "Bir ağ yükle",
        d: "nx.karate_club_graph() ya da kendi seçtiğin küçük bir ağı (CSV kenar listesi) içe aktar.",
        icon: Database,
      },
      {
        t: "Louvain'i çalıştır",
        d: "louvain_communities(G, seed=42) · topluluk sayısını ve modulariteyi (Q) raporla.",
        icon: GitMerge,
      },
      {
        t: "Girvan–Newman'ı çalıştır",
        d: "girvan_newman(G) ile ilk birkaç bölünmeyi al; her seviyenin Q değerini karşılaştır.",
        icon: Scissors,
      },
      {
        t: "Gephi'de renklendir",
        d: "Topluluk etiketini düğümlere yaz, modularity-class'a göre renklendir, ekran görüntüsü al.",
        icon: Network,
      },
    ];
    return (
      <SlideShell>
        <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
        <H2 className="mb-8">Dört adımlık görev</H2>
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
          className="mt-6 saa-card-teal rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
        >
          <Activity className="w-4 h-4 text-[#5eead4] mt-0.5 shrink-0" />
          <span>
            Teslim: iki algoritmanın bulduğu topluluk sayısı, Q değerleri ve
            Gephi görselini içeren kısa bir karşılaştırma notu.
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
        <Eyebrow>5. hafta tamamlandı · sıradaki: modularite &amp; ileri yöntemler</Eyebrow>
        <H1 className="saa-shimmer-teal">Toparladık</H1>
        <Sub className="mt-6">
          Topluluk = içeride yoğun, dışarıda seyrek.{" "}
          <span className="text-[#5eead4]">
            Louvain birleştirir, Girvan–Newman keser; ikisi de Q&apos;yu hedefler.
          </span>
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 text-left">
          <FeatureCard
            icon={Gauge}
            title="Modularite (Q)"
            desc="Bölümleme kalitesini ölçen ortak pusula."
            accent="#14b8a6"
            delay={0.1}
          />
          <FeatureCard
            icon={Repeat}
            title="Sonraki hafta"
            desc="Modulariteyi derinleştirme, çözünürlük sınırı ve alternatif ölçüler."
            accent="#0d9488"
            delay={0.22}
          />
          <FeatureCard
            icon={Sparkles}
            title="Hazırlık"
            desc="Bu haftanın lab çıktısını (Q ve topluluklar) yanında getir."
            accent="#5eead4"
            delay={0.34}
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 inline-flex items-center gap-2 text-xs font-mono text-gray-500"
        >
          <Hash className="w-3.5 h-3.5" />
          BVA 2105 · Sosyal Ağ Analizi · Topluluk Tespiti
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
          BVA 2105 · 5. Hafta · Topluluk Tespiti
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
