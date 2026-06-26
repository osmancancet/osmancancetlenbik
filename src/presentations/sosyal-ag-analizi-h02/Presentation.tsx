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
  Palette,
  Circle,
  Workflow,
  Maximize,
  Move,
  Ruler,
  Eye,
  EyeOff,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  Sparkles,
  Code2,
  MapPin,
  Clock,
  Mail,
  Calendar,
  GraduationCap,
  Database,
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
   TOPIC MOCKUPS — AĞ GÖRSELLEŞTİRME
   ============================================================ */

type LayoutNode = { id: string; x: number; y: number; r?: number; hub?: boolean };
type LayoutEdge = [string, string];

/**
 * Aynı 8 düğümlü ağı üç farklı yerleştirme (layout) algoritmasıyla
 * çizen küçük şema. Düğüm/kenar kümesi sabit; yalnız koordinatlar değişir.
 */
function LayoutGallery() {
  const force: LayoutNode[] = [
    { id: "A", x: 120, y: 70, hub: true, r: 18 },
    { id: "B", x: 50, y: 150 },
    { id: "C", x: 190, y: 150 },
    { id: "D", x: 110, y: 220 },
    { id: "E", x: 200, y: 60 },
    { id: "F", x: 40, y: 70 },
    { id: "G", x: 160, y: 235 },
    { id: "H", x: 230, y: 200 },
  ];
  const circular: LayoutNode[] = [
    { id: "A", x: 130, y: 40, hub: true, r: 18 },
    { id: "B", x: 200, y: 75 },
    { id: "C", x: 225, y: 150 },
    { id: "D", x: 185, y: 215 },
    { id: "E", x: 110, y: 235 },
    { id: "F", x: 45, y: 200 },
    { id: "G", x: 30, y: 125 },
    { id: "H", x: 60, y: 55 },
  ];
  const hierarchical: LayoutNode[] = [
    { id: "A", x: 130, y: 40, hub: true, r: 18 },
    { id: "B", x: 60, y: 110 },
    { id: "C", x: 200, y: 110 },
    { id: "D", x: 35, y: 185 },
    { id: "E", x: 95, y: 185 },
    { id: "F", x: 165, y: 185 },
    { id: "G", x: 225, y: 185 },
    { id: "H", x: 130, y: 245 },
  ];
  const edges: LayoutEdge[] = [
    ["A", "B"],
    ["A", "C"],
    ["A", "E"],
    ["A", "F"],
    ["B", "D"],
    ["C", "H"],
    ["C", "G"],
    ["B", "F"],
    ["D", "G"],
    ["E", "H"],
  ];

  const panels: Array<{ name: string; tag: string; nodes: LayoutNode[] }> = [
    { name: "Force-directed", tag: "Fruchterman–Reingold", nodes: force },
    { name: "Circular", tag: "Dairesel düzen", nodes: circular },
    { name: "Hierarchical", tag: "Ağaç / katman", nodes: hierarchical },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {panels.map((p, idx) => {
        const find = (id: string) => p.nodes.find((n) => n.id === id)!;
        return (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.12 }}
            className="saa-card rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-white">{p.name}</span>
              <span className="text-[10px] font-mono text-[#5eead4]">{p.tag}</span>
            </div>
            <svg viewBox="0 0 260 270" className="w-full h-auto">
              {edges.map(([a, b], i) => {
                const na = find(a);
                const nb = find(b);
                return (
                  <line
                    key={`${p.name}-e-${i}`}
                    x1={na.x}
                    y1={na.y}
                    x2={nb.x}
                    y2={nb.y}
                    stroke="#475569"
                    strokeWidth={1.2}
                    strokeOpacity={0.55}
                  />
                );
              })}
              {p.nodes.map((n) => (
                <g key={`${p.name}-${n.id}`}>
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={n.r ?? 12}
                    fill={n.hub ? "#0d9488" : "#1f2937"}
                    stroke={n.hub ? "#5eead4" : "#475569"}
                    strokeWidth={n.hub ? 2 : 1.3}
                    className={n.hub ? "saa-node-pulse" : ""}
                  />
                  <text
                    x={n.x}
                    y={n.y + 4}
                    textAnchor="middle"
                    fontSize={n.hub ? 12 : 10}
                    fontWeight={700}
                    fill="#ffffff"
                    fontFamily="Inter, sans-serif"
                  >
                    {n.id}
                  </text>
                </g>
              ))}
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
}

type EncNode = {
  id: string;
  x: number;
  y: number;
  deg: number; // boyutu belirler
  group: 0 | 1 | 2; // rengi belirler
};

/**
 * Görsel kodlama (encoding) örneği: aynı ağda
 *  - boyut  → derece (degree)
 *  - renk   → topluluk (community)
 *  - konum  → force-directed yerleşim
 */
function EncodingExample() {
  const groupColor = ["#14b8a6", "#a78bfa", "#fbbf24"];
  const nodes: EncNode[] = [
    { id: "A", x: 360, y: 210, deg: 6, group: 0 },
    { id: "B", x: 180, y: 110, deg: 3, group: 0 },
    { id: "C", x: 200, y: 320, deg: 2, group: 0 },
    { id: "D", x: 560, y: 130, deg: 4, group: 1 },
    { id: "E", x: 640, y: 250, deg: 3, group: 1 },
    { id: "F", x: 540, y: 340, deg: 2, group: 1 },
    { id: "G", x: 90, y: 220, deg: 1, group: 2 },
    { id: "H", x: 360, y: 70, deg: 2, group: 2 },
  ];
  const edges: LayoutEdge[] = [
    ["A", "B"],
    ["A", "C"],
    ["A", "D"],
    ["A", "H"],
    ["A", "E"],
    ["A", "F"],
    ["B", "G"],
    ["B", "H"],
    ["D", "E"],
    ["D", "F"],
    ["E", "F"],
  ];
  const find = (id: string) => nodes.find((n) => n.id === id)!;
  const radius = (deg: number) => 12 + deg * 4;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
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
          <span className="w-5 h-5 rounded-sm saa-n-tile flex items-center justify-center text-[11px]">
            N
          </span>
          <span>Gephi · boyut = derece · renk = topluluk</span>
        </div>
      </div>
      <div className="p-4 bg-[#070b0a]">
        <svg viewBox="0 0 740 400" className="w-full h-auto">
          {edges.map(([a, b], i) => {
            const na = find(a);
            const nb = find(b);
            return (
              <line
                key={`enc-e-${i}`}
                x1={na.x}
                y1={na.y}
                x2={nb.x}
                y2={nb.y}
                stroke="#374151"
                strokeWidth={1.4}
                strokeOpacity={0.55}
              />
            );
          })}
          {nodes.map((n) => (
            <g key={n.id}>
              <circle
                cx={n.x}
                cy={n.y}
                r={radius(n.deg)}
                fill={groupColor[n.group]}
                fillOpacity={0.85}
                stroke="#0a0f0e"
                strokeWidth={2}
              />
              <text
                x={n.x}
                y={n.y + 4}
                textAnchor="middle"
                fontSize={11}
                fontWeight={700}
                fill="#0a0f0e"
                fontFamily="Inter, sans-serif"
              >
                {n.id}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="px-4 py-3 border-t border-white/5 flex flex-wrap items-center gap-3">
        <span className="saa-chip">
          <Ruler className="w-3 h-3" /> Boyut → derece
        </span>
        <span className="saa-chip">
          <Palette className="w-3 h-3" /> Renk → topluluk
        </span>
        <span className="saa-chip">
          <Move className="w-3 h-3" /> Konum → force-directed
        </span>
      </div>
    </motion.div>
  );
}

/**
 * "Hairball" problemi: çok yoğun, etiketsiz, filtrelenmemiş bir grafiğin
 * neredeyse hiçbir şey anlatmadığını gösteren rastgele görünümlü ağ.
 */
function HairballMockup() {
  const cx = 130;
  const cy = 130;
  const pts = Array.from({ length: 26 }, (_, i) => {
    const ang = (i / 26) * Math.PI * 2;
    const rad = 40 + ((i * 37) % 70);
    return {
      id: i,
      x: cx + Math.cos(ang) * rad + ((i * 13) % 30) - 15,
      y: cy + Math.sin(ang) * rad + ((i * 7) % 30) - 15,
    };
  });
  const lines: Array<[number, number]> = [];
  for (let i = 0; i < pts.length; i++) {
    lines.push([i, (i * 5 + 3) % pts.length]);
    lines.push([i, (i * 11 + 7) % pts.length]);
  }
  return (
    <svg viewBox="0 0 260 260" className="w-full h-auto">
      {lines.map(([a, b], i) => (
        <line
          key={`hb-${i}`}
          x1={pts[a].x}
          y1={pts[a].y}
          x2={pts[b].x}
          y2={pts[b].y}
          stroke="#475569"
          strokeWidth={0.7}
          strokeOpacity={0.5}
        />
      ))}
      {pts.map((p) => (
        <circle key={p.id} cx={p.x} cy={p.y} r={4} fill="#64748b" />
      ))}
    </svg>
  );
}

/** Hairball&apos;ın temizlenmiş hâli: filtre + topluluk renkleri + az düğüm. */
function CleanGraphMockup() {
  const groupColor = ["#14b8a6", "#a78bfa"];
  const nodes: EncNode[] = [
    { id: "A", x: 80, y: 90, deg: 4, group: 0 },
    { id: "B", x: 60, y: 175, deg: 2, group: 0 },
    { id: "C", x: 130, y: 130, deg: 5, group: 0 },
    { id: "D", x: 180, y: 70, deg: 3, group: 1 },
    { id: "E", x: 215, y: 160, deg: 3, group: 1 },
    { id: "F", x: 150, y: 210, deg: 2, group: 1 },
  ];
  const edges: LayoutEdge[] = [
    ["A", "B"],
    ["A", "C"],
    ["B", "C"],
    ["C", "D"],
    ["C", "F"],
    ["D", "E"],
    ["E", "F"],
  ];
  const find = (id: string) => nodes.find((n) => n.id === id)!;
  return (
    <svg viewBox="0 0 260 260" className="w-full h-auto">
      {edges.map(([a, b], i) => {
        const na = find(a);
        const nb = find(b);
        return (
          <line
            key={`cg-${i}`}
            x1={na.x}
            y1={na.y}
            x2={nb.x}
            y2={nb.y}
            stroke="#5eead4"
            strokeWidth={1.4}
            strokeOpacity={0.45}
          />
        );
      })}
      {nodes.map((n) => (
        <g key={n.id}>
          <circle
            cx={n.x}
            cy={n.y}
            r={9 + n.deg * 2.5}
            fill={groupColor[n.group]}
            fillOpacity={0.85}
            stroke="#0a0f0e"
            strokeWidth={1.5}
          />
          <text
            x={n.x}
            y={n.y + 4}
            textAnchor="middle"
            fontSize={10}
            fontWeight={700}
            fill="#0a0f0e"
            fontFamily="Inter, sans-serif"
          >
            {n.id}
          </text>
        </g>
      ))}
    </svg>
  );
}

function VizCodeBlock() {
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
          <span>draw_karate.py · Python 3.12 · NetworkX 3.3</span>
        </div>
      </div>
      <pre className="saa-code p-6 overflow-x-auto m-0">
        <code>
          <span className="saa-code-cmt"># Karate Club ağını okunaklı çizmek</span>
          {"\n"}
          <span className="saa-code-kw">import</span>{" "}
          <span className="saa-code-fn">networkx</span>{" "}
          <span className="saa-code-kw">as</span>{" "}
          <span className="saa-code-fn">nx</span>
          {"\n"}
          <span className="saa-code-kw">import</span>{" "}
          <span className="saa-code-fn">matplotlib.pyplot</span>{" "}
          <span className="saa-code-kw">as</span>{" "}
          <span className="saa-code-fn">plt</span>
          {"\n"}
          {"\n"}
          G = nx.<span className="saa-code-fn">karate_club_graph</span>()
          {"\n"}
          {"\n"}
          <span className="saa-code-cmt"># 1) Yerleştirme algoritması — düğüm koordinatlarını üretir</span>
          {"\n"}
          pos = nx.<span className="saa-code-fn">spring_layout</span>(G, seed=
          <span className="saa-code-num">42</span>)
          <span className="saa-code-cmt"># force-directed</span>
          {"\n"}
          {"\n"}
          <span className="saa-code-cmt"># 2) Boyut = derece · görsel kodlama</span>
          {"\n"}
          sizes = [
          <span className="saa-code-num">120</span> * G.
          <span className="saa-code-fn">degree</span>(n){" "}
          <span className="saa-code-kw">for</span> n{" "}
          <span className="saa-code-kw">in</span> G.nodes()]
          {"\n"}
          {"\n"}
          <span className="saa-code-cmt"># 3) Çiz: düğüm, kenar, etiket ayrı katmanlar</span>
          {"\n"}
          nx.<span className="saa-code-fn">draw_networkx_nodes</span>(G, pos,
          node_size=sizes, node_color=
          <span className="saa-code-str">&quot;#14b8a6&quot;</span>)
          {"\n"}
          nx.<span className="saa-code-fn">draw_networkx_edges</span>(G, pos,
          alpha=<span className="saa-code-num">0.4</span>)
          {"\n"}
          nx.<span className="saa-code-fn">draw_networkx_labels</span>(G, pos,
          font_size=<span className="saa-code-num">8</span>)
          {"\n"}
          plt.<span className="saa-code-fn">axis</span>(
          <span className="saa-code-str">&quot;off&quot;</span>); plt.
          <span className="saa-code-fn">savefig</span>(
          <span className="saa-code-str">&quot;karate.png&quot;</span>, dpi=
          <span className="saa-code-num">200</span>)
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
        <Eyebrow>BVA 2105 · 2. Hafta — Sosyal Ağ Analizi</Eyebrow>
        <H1 className="saa-shimmer">
          Ağ Görselleştirme
          <br />
          Teknikleri
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Düğümü, kenarı, topluluğu okunabilir bir resme çevirmek. Sayıyı görüntüye
          taşıyan üç soru: nereye, hangi renk, ne boyut?
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={Workflow}
            title="Yerleştirme"
            desc="Force-directed, circular, hierarchical — düğümler koordinata nasıl oturur?"
            delay={0.3}
            accent="#14b8a6"
          />
          <FeatureCard
            icon={Palette}
            title="Görsel kodlama"
            desc="Konum, renk ve boyut ile derece, topluluk ve merkeziliği göstermek."
            delay={0.45}
            accent="#a78bfa"
          />
          <FeatureCard
            icon={GraduationCap}
            title="Araçlar"
            desc="Gephi ve NetworkX ile sunum kalitesinde grafik üretmek."
            delay={0.6}
            accent="#fbbf24"
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 inline-flex items-center gap-2 text-xs font-mono text-gray-500"
        >
          <Calendar className="w-3.5 h-3.5" />
          Cuma · 09:55 – 11:35 · Uygulamalı (Gephi 0.10 + NetworkX)
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 2 — Geçen haftadan köprü
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 1. haftadan 2. haftaya</Eyebrow>
      <H2>Geçen hafta ölçtük; bu hafta gösteriyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        1. haftada merkezilik ölçülerini hesapladık: degree, betweenness, closeness,
        eigenvector. O sayılar tabloda saklı kaldıkça anlatması zor. Bu hafta onları
        bir resme dönüştürüyoruz — hub kişiyi büyük çizip, toplulukları renklendirip
        ağı tek bakışta okunur kılıyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#5eead4]">
            <Database className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Geçen hafta · sayı
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] shrink-0" />
              degree(A) = 6 · betweenness(A) = 0.43 …
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] shrink-0" />
              CSV satırları — doğru ama soğuk.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] shrink-0" />
              &ldquo;Kim hub?&rdquo; sorusu gözle değil, sıralayarak yanıtlanır.
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <Eye className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Bu hafta · görüntü
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] shrink-0" />
              Büyük düğüm = yüksek derece; göz hemen bulur.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] shrink-0" />
              Renk kümeleri = topluluklar; gruplar ayrışır.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] shrink-0" />
              Aynı veri — sadece anlatımı kuvvetlendi.
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
      <H2>Üç durak: yerleştirme → kodlama → araç</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce düğümleri nereye koyacağımıza (layout) karar veriyoruz; sonra renk ve
        boyutla anlam yüklüyoruz; en son Gephi ve NetworkX ile gerçek bir grafik
        üretip yaygın hatalardan kaçınıyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            range: "1",
            title: "Yerleştirme algoritmaları",
            items: ["Force-directed (spring)", "Circular düzen", "Hierarchical / ağaç"],
            icon: Workflow,
            accent: "#14b8a6",
          },
          {
            range: "2",
            title: "Görsel kodlama",
            items: ["Konum · renk · boyut", "Derece & topluluk haritalama", "Etiket ve kenar yoğunluğu"],
            icon: Palette,
            accent: "#a78bfa",
          },
          {
            range: "3",
            title: "Araçlar & pratik",
            items: ["Gephi arayüzü", "NetworkX + Matplotlib", "Hairball probleminden kaçınma"],
            icon: GraduationCap,
            accent: "#fbbf24",
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
                    className="w-3.5 h-3.5 mt-0.5 shrink-0"
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

  /* ─────────────────  1. YERLEŞTİRME  ───────────────── */

  // 4 — Section divider 1/3
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Yerleştirme Algoritmaları"
      subtitle="Bir grafın düğüm/kenar kümesi sabittir; ama onu nereye koyduğun anlamı değiştirir. Layout, ağa verdiğin ilk yorumdur."
      bgGradient="linear-gradient(135deg, #14b8a6, #0d9488)"
      shadow="0 20px 60px -10px rgba(20, 184, 166, 0.6)"
      icon={<Workflow className="w-16 h-16 text-white" />}
    />
  ),

  // 5 — Koordinatın anlamı
  () => (
    <SlideShell>
      <Eyebrow>Temel fikir</Eyebrow>
      <H2 className="mb-4">Graf yerleşim içermez — onu biz veririz</H2>
      <Sub className="mb-8 max-w-3xl">
        Bir ağ matematiksel olarak yalnız bir düğüm kümesi ve kenar kümesidir{" "}
        <span className="font-mono text-[#5eead4]">G = (V, E)</span>. Düğümlerin{" "}
        (x, y) koordinatı yoktur. Çizim aşamasında bu koordinatları üreten şey
        yerleştirme (layout) algoritmasıdır.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6">
        <FeatureCard
          icon={Move}
          title="Yakınlık = ilişki"
          desc="İyi bir yerleşimde birbirine bağlı düğümler yan yana, bağlantısızlar uzakta durur. Konum kendiliğinden anlam taşır."
          accent="#14b8a6"
          delay={0.1}
        />
        <FeatureCard
          icon={Maximize}
          title="Kararlılık & tekrarlanabilirlik"
          desc="Force-directed algoritmalar rastgele başlar; aynı görüntüyü tekrar üretmek için seed (rastgele tohum) sabitlenir."
          accent="#0d9488"
          delay={0.25}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="mt-6 saa-card-teal rounded-xl p-5 text-center font-mono text-sm text-[#a7f3d0]"
      >
        layout: V → ℝ² &nbsp;·&nbsp; her düğüme bir (x, y) ata &nbsp;·&nbsp; kenarlar
        çizgi olur
      </motion.div>
    </SlideShell>
  ),

  // 6 — Layout galerisi (aynı ağ, üç düzen)
  () => (
    <SlideShell>
      <Eyebrow>Aynı ağ · üç yerleşim</Eyebrow>
      <H2 className="mb-3">Düğümler aynı, hikâye farklı</H2>
      <Sub className="mb-6 max-w-3xl">
        Aşağıdaki üç panelde tıpatıp aynı 8 düğüm ve 10 kenar var. Yalnız koordinatlar
        değişiyor — ve her biri farklı bir okuma sunuyor.
      </Sub>
      <LayoutGallery />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-5 text-center text-xs text-gray-500"
      >
        <span className="text-[#5eead4]">Force-directed</span> kümeleri ortaya çıkarır ·{" "}
        <span className="text-[#5eead4]">Circular</span> tüm düğümlere eşit alan verir ·{" "}
        <span className="text-[#5eead4]">Hierarchical</span> akış / hiyerarşi gösterir.
      </motion.div>
    </SlideShell>
  ),

  // 7 — Layout karşılaştırma tablosu
  () => (
    <SlideShell>
      <Eyebrow>Hangi düzen, ne zaman?</Eyebrow>
      <H2 className="mb-2">Üç yerleşim algoritması yan yana</H2>
      <Sub className="mb-6 max-w-3xl">
        Tek bir &ldquo;doğru&rdquo; düzen yoktur; anlatmak istediğin şeye göre seçilir.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="saa-card rounded-xl p-5 overflow-x-auto"
      >
        <table className="saa-table">
          <thead>
            <tr>
              <th style={{ width: "16%" }}>Algoritma</th>
              <th>Nasıl çalışır?</th>
              <th>En iyi gösterdiği</th>
              <th>Zayıf yanı</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="saa-row-head">Force-directed</td>
              <td>Kenarlar yay, düğümler birbirini iten yük gibi — denge konumu aranır.</td>
              <td>Topluluklar, hub&apos;lar, doğal kümeler</td>
              <td>Büyük ağda yavaş; rastgelelik için seed gerekir</td>
            </tr>
            <tr>
              <td className="saa-row-head">Circular</td>
              <td>Tüm düğümler bir çember üzerine eşit aralıklı dizilir.</td>
              <td>Kenar yoğunluğu, tüm ikili ilişkiler</td>
              <td>Çok düğümde kenarlar çemberi doldurup karışır</td>
            </tr>
            <tr>
              <td className="saa-row-head">Hierarchical</td>
              <td>Düğümler katmanlara (seviyelere) yerleştirilir, yukarıdan aşağı akar.</td>
              <td>Yönlü akış, ağaç yapısı, organizasyon</td>
              <td>Döngülü / yönsüz ağlarda yapay görünür</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  2. GÖRSEL KODLAMA  ───────────────── */

  // 8 — Section divider 2/3
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Görsel Kodlama"
      subtitle="Konum, renk ve boyut — verinin üç görsel kanalı. Her kanalı bir ölçüye bağlayarak ağı tek resimde çok katmanlı okuruz."
      bgGradient="linear-gradient(135deg, #0d9488, #134e4a)"
      shadow="0 20px 60px -10px rgba(13, 148, 136, 0.6)"
      icon={<Palette className="w-16 h-16 text-white" />}
    />
  ),

  // 9 — Üç görsel kanal
  () => (
    <SlideShell>
      <Eyebrow>Üç görsel kanal</Eyebrow>
      <H2 className="mb-8">Konum · Renk · Boyut</H2>
      <div className="grid md:grid-cols-3 gap-5">
        <FeatureCard
          icon={Move}
          title="Konum"
          desc="En güçlü kanal. Yerleştirme algoritması belirler; yakınlık = bağlantı, küme = topluluk."
          accent="#14b8a6"
          delay={0.1}
        />
        <FeatureCard
          icon={Palette}
          title="Renk"
          desc="Kategori için: topluluk, hesap türü, etiket. Kategori-renk eşlemesi az ve ayırt edilebilir olmalı."
          accent="#a78bfa"
          delay={0.25}
        />
        <FeatureCard
          icon={Ruler}
          title="Boyut"
          desc="Sayısal değer için: derece, betweenness, takipçi. Alan değil yarıçap orantılı olmalı — yoksa abartır."
          accent="#fbbf24"
          delay={0.4}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="mt-6 saa-card rounded-xl p-5 text-sm text-gray-300 text-center"
      >
        Kural: <span className="text-[#5eead4] font-semibold">bir kanal — bir değişken</span>.
        Aynı renge hem topluluğu hem cinsiyeti yüklersen okuyucu hangisini gördüğünü
        bilemez.
      </motion.div>
    </SlideShell>
  ),

  // 10 — Encoding örneği (büyük mockup)
  () => (
    <SlideShell>
      <Eyebrow>Görsel kodlama · uygulanmış</Eyebrow>
      <H2 className="mb-6">Tek resimde üç katman</H2>
      <EncodingExample />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-5 text-center text-xs text-gray-500"
      >
        En büyük teal düğüm <span className="text-[#5eead4]">A</span> — en yüksek derece.
        Sağdaki mor küme ayrı bir topluluk. Konumu force-directed yerleşim verdi.
      </motion.div>
    </SlideShell>
  ),

  // 11 — Renk seçimi ve erişilebilirlik
  () => (
    <SlideShell>
      <Eyebrow>Renk · doğru ve yanlış</Eyebrow>
      <H2 className="mb-2">Renk bir araçtır, süs değil</H2>
      <Sub className="mb-8 max-w-3xl">
        Renk kanalını kötü kullanmak ağı okunamaz yapar. Üç pratik kural:
      </Sub>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            icon: Filter,
            title: "Az kategori kullan",
            ok: "Topluluk sayısını 6–8 ile sınırla; gerisini gri/&ldquo;diğer&rdquo; yap.",
            accent: "#14b8a6",
          },
          {
            icon: Eye,
            title: "Renk-körü güvenli palet",
            ok: "Kırmızı-yeşil ayrımına bel bağlama; ColorBrewer gibi güvenli paletler kullan.",
            accent: "#a78bfa",
          },
          {
            icon: Palette,
            title: "Sıralı vs kategorik",
            ok: "Sayısal değere açık→koyu gradyan; kategoriye ayrık renkler.",
            accent: "#fbbf24",
          },
        ].map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
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
            <h3 className="text-base font-semibold text-white mb-2">{c.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{c.ok}</p>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3. ARAÇLAR & PRATİK  ───────────────── */

  // 12 — Section divider 3/3
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Araçlar &amp; Pratik"
      subtitle="Gephi ve NetworkX ile gerçek bir grafik üretmek — ve en sık görülen tuzaktan, hairball&apos;dan kaçınmak."
      bgGradient="linear-gradient(135deg, #0d9488, #115e59)"
      shadow="0 20px 60px -10px rgba(13, 148, 136, 0.6)"
      icon={<GraduationCap className="w-16 h-16 text-white" />}
    />
  ),

  // 13 — Gephi vs NetworkX
  () => (
    <SlideShell>
      <Eyebrow>İki araç · iki amaç</Eyebrow>
      <H2 className="mb-2">Gephi mi, NetworkX mi?</H2>
      <Sub className="mb-8 max-w-3xl">
        İkisi de bu derste işimize yarar; birini interaktif keşif, diğerini
        tekrarlanabilir üretim için kullanırız.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Network className="w-6 h-6 text-[#5eead4]" />
            <h3 className="text-xl font-semibold text-white">Gephi</h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Görsel, fare ile çalışan masaüstü uygulaması. Tıkla-sürükle ile düzen dene,
            renklendir, filtrele.
          </p>
          <ul className="text-sm text-gray-400 space-y-1.5">
            <li className="flex gap-2">
              <Check className="w-4 h-4 text-[#5eead4] mt-0.5 shrink-0" />
              ForceAtlas2 düzeni, canlı önizleme
            </li>
            <li className="flex gap-2">
              <Check className="w-4 h-4 text-[#5eead4] mt-0.5 shrink-0" />
              GEXF / GraphML / CSV içe aktarma
            </li>
            <li className="flex gap-2">
              <Check className="w-4 h-4 text-[#5eead4] mt-0.5 shrink-0" />
              Sunum kalitesinde PNG/SVG dışa aktarma
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Code2 className="w-6 h-6 text-gray-300" />
            <h3 className="text-xl font-semibold text-white">NetworkX + Matplotlib</h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Kod tabanlı, betikle çalışan kütüphane. Tekrarlanabilir, sürüm kontrolüne
            uygun, hesap + çizim aynı yerde.
          </p>
          <ul className="text-sm text-gray-400 space-y-1.5">
            <li className="flex gap-2">
              <Check className="w-4 h-4 text-[#5eead4] mt-0.5 shrink-0" />
              spring / circular / shell layout fonksiyonları
            </li>
            <li className="flex gap-2">
              <Check className="w-4 h-4 text-[#5eead4] mt-0.5 shrink-0" />
              Merkezilik sonucunu doğrudan boyuta bağlama
            </li>
            <li className="flex gap-2">
              <Check className="w-4 h-4 text-[#5eead4] mt-0.5 shrink-0" />
              Toplu / otomatik üretim (batch)
            </li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 14 — NetworkX kod örneği
  () => (
    <SlideShell>
      <Eyebrow>Python · NetworkX</Eyebrow>
      <H2 className="mb-6">Layout → boyut → çiz</H2>
      <VizCodeBlock />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-5 text-xs text-gray-500 text-center"
      >
        <span className="font-mono text-[#5eead4]">seed=42</span> ile her çalıştırmada
        aynı görüntü; düğüm/kenar/etiket ayrı çizilince renk ve boyutu tek tek kontrol
        edebilirsin.
      </motion.div>
    </SlideShell>
  ),

  // 15 — Hairball problemi
  () => (
    <SlideShell>
      <Eyebrow>En sık tuzak</Eyebrow>
      <H2 className="mb-2">&ldquo;Hairball&rdquo; problemi</H2>
      <Sub className="mb-6 max-w-3xl">
        Bütün düğümleri, bütün kenarları, etiketsiz ve filtresiz çizersen ortaya bir saç
        yumağı çıkar — teknik olarak doğru ama hiçbir şey anlatmaz. Çözüm: filtrele,
        renklendir, boyutlandır, etiketi seç.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6 items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="saa-card-warn rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fca5a5]">
            <EyeOff className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Önce · hairball
            </span>
          </div>
          <HairballMockup />
          <div className="mt-2 text-xs text-gray-400 text-center">
            Hub yok, topluluk yok, akış yok — sadece gürültü.
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="saa-card-teal rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3 text-[#5eead4]">
            <Eye className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Sonra · temizlenmiş
            </span>
          </div>
          <CleanGraphMockup />
          <div className="mt-2 text-xs text-gray-400 text-center">
            Filtre + topluluk renkleri + derece boyutu = okunur resim.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 16 — Görsel yalan / temkin
  () => (
    <SlideShell>
      <Eyebrow>Dürüst görselleştirme</Eyebrow>
      <H2 className="mb-2">Görsel yanıltıcı da olabilir</H2>
      <Sub className="mb-8 max-w-3xl">
        İyi niyetli bir grafik bile yanlış okumalar üretebilir. Sunmadan önce şunları
        kontrol et:
      </Sub>
      <div className="space-y-3">
        {[
          {
            icon: Ruler,
            t: "Boyutu yarıçapa değil alana bakarak algılarız",
            d: "Derece 2 katına çıkınca yarıçapı değil alanı ~2 kat yap; yoksa fark abartılır.",
          },
          {
            icon: Move,
            t: "Konum kanıt değildir",
            d: "Force-directed düzen rastgele başlar; iki düğümün uzak durması mutlaka &ldquo;ilgisiz&rdquo; demek değildir.",
          },
          {
            icon: Filter,
            t: "Filtrelediğini açıkça söyle",
            d: "&ldquo;Derecesi 3&apos;ten küçük düğümler gizlendi&rdquo; gibi notlar olmadan grafik eksik bilgi verir.",
          },
        ].map((it, i) => (
          <motion.div
            key={it.t}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="saa-card rounded-xl p-4 flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-[#14b8a6]/15 border border-[#14b8a6]/35">
              <it.icon className="w-5 h-5 text-[#5eead4]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">{it.t}</div>
              <div className="text-xs text-gray-400 mt-1 leading-relaxed">{it.d}</div>
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
        t: "Karate Club ağını Gephi&apos;ye aktar",
        d: "NetworkX&apos;ten GEXF olarak yaz (nx.write_gexf), Gephi&apos;de aç.",
        icon: Database,
      },
      {
        t: "ForceAtlas2 düzenini çalıştır",
        d: "Düzeni uygula, dur, düğümleri elle düzelt. Aynı ağı circular ile de dene.",
        icon: Workflow,
      },
      {
        t: "Görsel kodlama uygula",
        d: "Boyut = derece, renk = modülarite (topluluk). En az 2 hub&apos;ı etiketle.",
        icon: Palette,
      },
      {
        t: "PNG dışa aktar + 3 cümle yorum",
        d: "Sunum kalitesinde resmi al; hangi düğüm hub, kaç topluluk var, yaz.",
        icon: Check,
      },
    ];
    return (
      <SlideShell>
        <Eyebrow>Bu hafta · uygulamalı görev</Eyebrow>
        <H2 className="mb-8">Gephi ile dört adım</H2>
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
          transition={{ delay: 0.7 }}
          className="mt-6 saa-card-teal rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
        >
          <Sparkles className="w-4 h-4 text-[#5eead4] mt-0.5 shrink-0" />
          <span>
            Teslim: tek bir PNG + üç cümle. Modülarite ile topluluk tespitini 5. haftada
            ayrıntılı işleyeceğiz; bu hafta sadece renk için kullanıyoruz.
          </span>
        </motion.div>
      </SlideShell>
    );
  },

  // 18 — Sıradaki hafta önizleme
  () => (
    <SlideShell>
      <Eyebrow>Sıradaki Hafta</Eyebrow>
      <H2 className="mb-8">3. Hafta — Veri toplama (API &amp; scraping)</H2>
      <div className="grid md:grid-cols-3 gap-5">
        <FeatureCard
          icon={Share2}
          title="Platform API&apos;leri"
          desc="Resmi API&apos;lerden ağ verisi çekme; oran limitleri ve kimlik doğrulama."
          accent="#14b8a6"
          delay={0.1}
        />
        <FeatureCard
          icon={Filter}
          title="Web scraping temelleri"
          desc="Sayfadan veri ayıklama, robots.txt&apos;e saygı, kullanım şartları."
          accent="#0d9488"
          delay={0.25}
        />
        <FeatureCard
          icon={GitBranch}
          title="Kenar listesine dönüştürme"
          desc="Ham veriyi düğüm–kenar tablosuna çevirip NetworkX&apos;e yükleme."
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
          Hazırlık:{" "}
          <span className="text-[#5eead4] font-semibold">Python requests</span> kurulu
          olsun ve bu haftaki{" "}
          <span className="text-[#5eead4] font-semibold">Gephi PNG</span> çıktın hazır
          gelsin.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 19 — Kapanış + iletişim
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
          <Circle className="w-12 h-12 text-white" />
        </motion.div>
        <H1 className="saa-shimmer-teal">Teşekkürler</H1>
        <Sub className="mt-6">
          Sorularınız?{" "}
          <span className="text-[#5eead4]">Hafta 3&apos;te görüşmek üzere.</span>
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
              <div className="text-sm font-semibold text-white">MYO · Derslik 7</div>
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
          BVA 2105 · 2. Hafta · Ağ Görselleştirme
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
