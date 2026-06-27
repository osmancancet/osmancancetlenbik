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
  ShieldAlert,
  Network,
  Activity,
  Target,
  Dice5,
  Crosshair,
  Scissors,
  TrendingDown,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  Zap,
  BarChart3,
  Code2,
  ArrowRight,
  Calendar,
  Layers,
  Droplet,
  AlertTriangle,
  Terminal,
  ListChecks,
  GitBranch,
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
  removed?: boolean;
  hub?: boolean;
  r?: number;
};

type GraphEdge = { from: string; to: string };

/* Aynı ağ üç aşamada: sağlam → birkaç düğüm gitti → hub gitti (parçalandı) */
function ResilienceProgression() {
  const baseNodes: GraphNode[] = [
    { id: "h", x: 130, y: 110, hub: true, r: 22 },
    { id: "a", x: 50, y: 50, r: 13 },
    { id: "b", x: 50, y: 175, r: 13 },
    { id: "c", x: 130, y: 30, r: 13 },
    { id: "d", x: 210, y: 60, r: 13 },
    { id: "e", x: 215, y: 165, r: 13 },
    { id: "f", x: 130, y: 195, r: 13 },
  ];
  const baseEdges: GraphEdge[] = [
    { from: "h", to: "a" },
    { from: "h", to: "b" },
    { from: "h", to: "c" },
    { from: "h", to: "d" },
    { from: "h", to: "e" },
    { from: "h", to: "f" },
    { from: "a", to: "c" },
    { from: "d", to: "e" },
    { from: "b", to: "f" },
  ];

  const stages: Array<{
    label: string;
    sub: string;
    removed: string[];
    color: string;
  }> = [
    {
      label: "Sağlam ağ",
      sub: "Tek dev bileşen · S = 7/7",
      removed: [],
      color: "#5eead4",
    },
    {
      label: "Rastgele kayıp",
      sub: "2 çevre düğümü gitti · ağ hâlâ bağlı",
      removed: ["a", "f"],
      color: "#fbbf24",
    },
    {
      label: "Hedefli saldırı",
      sub: "Hub gitti · ağ parçalara ayrıldı",
      removed: ["h"],
      color: "#f87171",
    },
  ];

  const find = (id: string) => baseNodes.find((n) => n.id === id)!;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {stages.map((st, si) => {
        const removedSet = new Set(st.removed);
        return (
          <motion.div
            key={st.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + si * 0.15 }}
            className="saa-card rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: st.color }}
              />
              <span className="text-sm font-semibold text-white">
                {st.label}
              </span>
            </div>
            <svg viewBox="0 0 260 220" className="w-full h-auto">
              {baseEdges.map((e, i) => {
                const dead =
                  removedSet.has(e.from) || removedSet.has(e.to);
                const a = find(e.from);
                const b = find(e.to);
                return (
                  <line
                    key={`e-${si}-${i}`}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke={dead ? "#3f3f46" : "#14b8a6"}
                    strokeWidth={dead ? 1 : 1.6}
                    strokeOpacity={dead ? 0.3 : 0.6}
                    strokeDasharray={dead ? "3 3" : undefined}
                  />
                );
              })}
              {baseNodes.map((n) => {
                const gone = removedSet.has(n.id);
                return (
                  <g key={`${si}-${n.id}`}>
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={n.r ?? 13}
                      fill={
                        gone
                          ? "#1f2937"
                          : n.hub
                            ? "#0d9488"
                            : "#1f2937"
                      }
                      stroke={
                        gone ? "#52525b" : n.hub ? "#5eead4" : "#475569"
                      }
                      strokeWidth={n.hub ? 2.2 : 1.4}
                      strokeOpacity={gone ? 0.45 : 1}
                      strokeDasharray={gone ? "3 3" : undefined}
                      fillOpacity={gone ? 0.35 : 1}
                    />
                    {gone && (
                      <line
                        x1={n.x - 8}
                        y1={n.y - 8}
                        x2={n.x + 8}
                        y2={n.y + 8}
                        stroke="#f87171"
                        strokeWidth={2}
                      />
                    )}
                  </g>
                );
              })}
            </svg>
            <div className="mt-1 text-[11px] text-gray-400 text-center">
              {st.sub}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* S(f): kaldırılan düğüm oranına karşı dev bileşen büyüklüğü */
function PercolationChart() {
  // Şematik eğriler: rastgele (yavaş düşüş) vs hedefli (ani çöküş)
  const W = 700;
  const H = 360;
  const padL = 60;
  const padB = 50;
  const padT = 20;
  const padR = 20;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const xToPx = (f: number) => padL + f * plotW;
  const yToPx = (s: number) => padT + (1 - s) * plotH;

  // Rastgele başarısızlık: ölçeksiz ağda eşik ~1'e yakın (yavaş, dirençli)
  const randomPts: Array<[number, number]> = [
    [0, 1],
    [0.2, 0.94],
    [0.4, 0.85],
    [0.6, 0.7],
    [0.8, 0.45],
    [0.95, 0.12],
    [1, 0],
  ];
  // Hedefli saldırı: en yüksek dereceli düğümler önce → erken çöküş
  const targetedPts: Array<[number, number]> = [
    [0, 1],
    [0.05, 0.82],
    [0.12, 0.55],
    [0.2, 0.28],
    [0.3, 0.08],
    [0.4, 0.02],
    [1, 0],
  ];

  const toPath = (pts: Array<[number, number]>) =>
    pts
      .map((p, i) => `${i === 0 ? "M" : "L"} ${xToPx(p[0])} ${yToPx(p[1])}`)
      .join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="saa-card rounded-xl p-5"
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {/* eksenler */}
        <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke="#475569" strokeWidth={1.5} />
        <line x1={padL} y1={padT + plotH} x2={padL + plotW} y2={padT + plotH} stroke="#475569" strokeWidth={1.5} />

        {/* yatay ızgara */}
        {[0.25, 0.5, 0.75, 1].map((g) => (
          <line
            key={`g-${g}`}
            x1={padL}
            y1={yToPx(g)}
            x2={padL + plotW}
            y2={yToPx(g)}
            stroke="#14b8a6"
            strokeOpacity={0.08}
            strokeWidth={1}
          />
        ))}

        {/* eğriler */}
        <path d={toPath(randomPts)} fill="none" stroke="#fbbf24" strokeWidth={3} />
        <path d={toPath(targetedPts)} fill="none" stroke="#f87171" strokeWidth={3} />

        {/* eksen etiketleri */}
        <text x={padL + plotW / 2} y={H - 12} textAnchor="middle" fontSize={13} fill="#9ca3af" fontFamily="Inter, sans-serif">
          Kaldırılan düğüm oranı f
        </text>
        <text
          x={18}
          y={padT + plotH / 2}
          textAnchor="middle"
          fontSize={13}
          fill="#9ca3af"
          fontFamily="Inter, sans-serif"
          transform={`rotate(-90 18 ${padT + plotH / 2})`}
        >
          Dev bileşen oranı S
        </text>

        {/* eksen değerleri */}
        <text x={padL} y={padT + plotH + 20} textAnchor="middle" fontSize={11} fill="#6b7280">0</text>
        <text x={padL + plotW} y={padT + plotH + 20} textAnchor="middle" fontSize={11} fill="#6b7280">1</text>
        <text x={padL - 12} y={yToPx(1) + 4} textAnchor="end" fontSize={11} fill="#6b7280">1</text>
        <text x={padL - 12} y={yToPx(0) + 4} textAnchor="end" fontSize={11} fill="#6b7280">0</text>

        {/* lejant */}
        <g transform={`translate(${padL + plotW - 220}, ${padT + 10})`}>
          <rect x={0} y={0} width={210} height={56} rx={8} fill="#0a0f0e" stroke="#14b8a6" strokeOpacity={0.25} />
          <line x1={14} y1={20} x2={40} y2={20} stroke="#fbbf24" strokeWidth={3} />
          <text x={48} y={24} fontSize={12} fill="#d1d5db" fontFamily="Inter, sans-serif">Rastgele başarısızlık</text>
          <line x1={14} y1={42} x2={40} y2={42} stroke="#f87171" strokeWidth={3} />
          <text x={48} y={46} fontSize={12} fill="#d1d5db" fontFamily="Inter, sans-serif">Hedefli saldırı</text>
        </g>
      </svg>
      <div className="mt-2 text-xs text-gray-400 text-center">
        Ölçeksiz ağlar rastgele kayba <span className="text-[#fbbf24] font-semibold">dirençli</span>,
        hub hedefli saldırıya ise <span className="text-[#f87171] font-semibold">kırılgandır</span> — &quot;sağlam ama kırılgan&quot;.
      </div>
    </motion.div>
  );
}

function MetricTable() {
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
            <th style={{ width: "20%" }}>Ölçü</th>
            <th>Ne ölçer?</th>
            <th>Yüksek değer ne anlama gelir?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="saa-row-head">Dev bileşen S</td>
            <td>En büyük bağlı bileşendeki düğümlerin oranı.</td>
            <td>Ağın büyük kısmı hâlâ tek parça — iletişim sürüyor.</td>
          </tr>
          <tr>
            <td className="saa-row-head">Perkolasyon eşiği f<sub>c</sub></td>
            <td>Dev bileşenin dağıldığı kritik kaldırma oranı.</td>
            <td>1&apos;e yakınsa ağ çok dayanıklı; düşükse kolay çöker.</td>
          </tr>
          <tr>
            <td className="saa-row-head">Cebirsel bağlantı λ<sub>2</sub></td>
            <td>Laplace matrisinin ikinci en küçük öz-değeri (Fiedler).</td>
            <td>Büyükse ağı ikiye bölmek zor — güçlü bağlı.</td>
          </tr>
          <tr>
            <td className="saa-row-head">Düğüm/kenar bağlantısı κ</td>
            <td>Ağı kopartmak için silinmesi gereken en az düğüm/kenar.</td>
            <td>Yüksekse tek bir noktanın kaybı ağı bölmez.</td>
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
          <span>resilience.py · Python 3.12 · NetworkX 3.3</span>
        </div>
      </div>
      <pre className="saa-code p-6 overflow-x-auto m-0">
        <code>
          <span className="saa-code-kw">import</span>{" "}
          <span className="saa-code-fn">networkx</span>{" "}
          <span className="saa-code-kw">as</span>{" "}
          <span className="saa-code-fn">nx</span>
          {"\n"}
          {"\n"}
          <span className="saa-code-cmt"># Ölçeksiz bir test ağı (Barabási–Albert)</span>
          {"\n"}
          G = nx.<span className="saa-code-fn">barabasi_albert_graph</span>(
          <span className="saa-code-num">1000</span>,{" "}
          <span className="saa-code-num">3</span>)
          {"\n"}
          {"\n"}
          <span className="saa-code-cmt"># Dev bileşen oranı S = en büyük bileşen / n</span>
          {"\n"}
          <span className="saa-code-kw">def</span>{" "}
          <span className="saa-code-fn">giant_frac</span>(g):
          {"\n"}
          {"    "}
          <span className="saa-code-kw">if</span> g.
          <span className="saa-code-fn">number_of_nodes</span>() ==
          <span className="saa-code-num"> 0</span>:
          <span className="saa-code-kw"> return</span>{" "}
          <span className="saa-code-num">0.0</span>
          {"\n"}
          {"    "}cc =
          <span className="saa-code-fn"> max</span>(nx.
          <span className="saa-code-fn">connected_components</span>(g), key=
          <span className="saa-code-fn">len</span>)
          {"\n"}
          {"    "}
          <span className="saa-code-kw">return</span>{" "}
          <span className="saa-code-fn">len</span>(cc) / G.
          <span className="saa-code-fn">number_of_nodes</span>()
          {"\n"}
          {"\n"}
          <span className="saa-code-cmt"># Hedefli saldırı: en yüksek dereceli düğümü tekrar tekrar sil</span>
          {"\n"}
          H = G.<span className="saa-code-fn">copy</span>()
          {"\n"}
          <span className="saa-code-kw">for</span> _{" "}
          <span className="saa-code-kw">in</span>{" "}
          <span className="saa-code-fn">range</span>(
          <span className="saa-code-num">50</span>):
          {"\n"}
          {"    "}v =
          <span className="saa-code-fn"> max</span>(H.
          <span className="saa-code-fn">degree</span>, key=
          <span className="saa-code-kw">lambda</span> x: x[
          <span className="saa-code-num">1</span>])[
          <span className="saa-code-num">0</span>]
          {"\n"}
          {"    "}H.<span className="saa-code-fn">remove_node</span>(v)
          {"\n"}
          {"\n"}
          <span className="saa-code-fn">print</span>(
          <span className="saa-code-str">&quot;S (saldırı sonrası):&quot;</span>,{" "}
          <span className="saa-code-fn">round</span>(
          <span className="saa-code-fn">giant_frac</span>(H),{" "}
          <span className="saa-code-num">3</span>))
        </code>
      </pre>
    </motion.div>
  );
}

function AttackTerminal() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
          <Terminal className="w-3.5 h-3.5" />
          <span>python resilience.py — saldırı vs rastgele</span>
        </div>
      </div>
      <div className="saa-terminal">
        <div>
          <span className="saa-term-prompt">analiz@lab</span>
          <span className="saa-term-dim">:~$</span>{" "}
          <span className="saa-term-cmd">python resilience.py</span>
        </div>
        <div className="saa-term-dim">Ağ: BA(n=1000, m=3) · kenar=2991 · &lt;k&gt;≈5.98</div>
        <div className="mt-1 saa-term-warn">f       S_rastgele   S_hedefli</div>
        <div><span className="saa-term-ok">0.00</span>{"    "}1.000{"        "}1.000</div>
        <div><span className="saa-term-ok">0.05</span>{"    "}0.982{"        "}<span className="saa-term-err">0.611</span></div>
        <div><span className="saa-term-ok">0.10</span>{"    "}0.961{"        "}<span className="saa-term-err">0.298</span></div>
        <div><span className="saa-term-ok">0.20</span>{"    "}0.913{"        "}<span className="saa-term-err">0.041</span></div>
        <div className="saa-term-dim mt-1">
          Yorum: %10 hub silinince hedefli S ~0.30&apos;a düşer; rastgelede neredeyse değişmez.
        </div>
        <div className="mt-2">
          <span className="saa-term-prompt">analiz@lab</span>
          <span className="saa-term-dim">:~$</span>{" "}
          <span className="saa-term-cmd">_</span>
          <span className="animate-pulse">█</span>
        </div>
      </div>
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
        <Eyebrow>BVA 2105 · 12. Hafta — Sosyal Ağ Analizi</Eyebrow>
        <H1 className="saa-shimmer">
          Ağın Dayanıklılığı
          <br />
          ve Esnekliği
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Bir ağ ne zaman ayakta kalır, ne zaman parçalanır? Rastgele kayıp ile
          hedefli saldırının farkı.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={Dice5}
            title="Rastgele Başarısızlık"
            desc="Düğümler gelişigüzel kaybolur — sosyal ağlar buna genelde dayanıklıdır."
            delay={0.3}
            accent="#fbbf24"
          />
          <FeatureCard
            icon={Crosshair}
            title="Hedefli Saldırı"
            desc="Önce en merkezi hub&apos;lar gider — ölçeksiz ağların zayıf noktası."
            delay={0.45}
            accent="#f87171"
          />
          <FeatureCard
            icon={Droplet}
            title="Perkolasyon"
            desc="Dev bileşenin dağıldığı kritik eşik f_c ile dayanıklılığı sayısallaştırırız."
            delay={0.6}
            accent="#14b8a6"
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 inline-flex items-center gap-2 text-xs font-mono text-gray-500"
        >
          <Calendar className="w-3.5 h-3.5" />
          Cuma · 09:55 – 11:35 · NetworkX ile uygulamalı analiz
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 2 — Geçen haftadan köprü + bu haftanın hedefi
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 11. haftadan 12. haftaya</Eyebrow>
      <H2>Önce yayılımı konuştuk; şimdi ağın kendisi ayakta kalır mı?</H2>
      <Sub className="mt-3 max-w-3xl">
        11. haftada etki maksimizasyonuyla &quot;kimi seçersek mesaj en geniş
        yayılır?&quot; sorusunu yanıtladık. Bu hafta tersini soruyoruz: düğümler
        kaybolduğunda ağ ne kadarını korur? Bu, dayanıklılık (robustness) ve
        esneklik (resilience) sorusudur.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#5eead4]">
            <Network className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Dayanıklılık (robustness)
            </span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            Düğüm/kenar kaybına rağmen ağın yapısını (bağlılığını, kısa
            yollarını) ne kadar koruduğu. Statik bir ölçüdür: &quot;ne kadar
            dayanır?&quot;
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#5eead4]">
            <Activity className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Esneklik (resilience)
            </span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            Hasardan sonra ağın kendini toparlama / işlevini sürdürme kapasitesi.
            Dinamik bir bakış: &quot;kopan bağ yeniden kurulur mu, akış başka
            yoldan devam eder mi?&quot;
          </p>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 3 — Bu dersin akışı
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: tehdit türleri → ölçüler → pratik</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce ağı hangi senaryoların yıprattığını ayırıyoruz; sonra dayanıklılığı
        sayısallaştıran ölçüleri tanımlıyoruz; en son NetworkX ile kendi ağımızı
        kırmayı deniyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            range: "01",
            title: "Kayıp Senaryoları",
            items: ["Rastgele başarısızlık", "Hedefli saldırı", "Sağlam ama kırılgan"],
            icon: Crosshair,
            accent: "#f87171",
          },
          {
            range: "02",
            title: "Dayanıklılık Ölçüleri",
            items: ["Dev bileşen S", "Perkolasyon eşiği f_c", "Bağlantı & λ₂"],
            icon: BarChart3,
            accent: "#14b8a6",
          },
          {
            range: "03",
            title: "Pratikte",
            items: ["NetworkX ile saldırı", "Eğri çizimi", "Bu hafta lab"],
            icon: Code2,
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
                style={{
                  background: `${g.accent}18`,
                  border: `1px solid ${g.accent}55`,
                }}
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

  /* ─────────────────  1. KAYIP SENARYOLARI  ───────────────── */

  // 4 — Section divider 1/3
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Kayıp Senaryoları"
      subtitle="Bir ağ neden çöker? Rastgele başarısızlık ile hedefli saldırı çok farklı sonuçlar doğurur."
      bgGradient="linear-gradient(135deg, #f87171, #b91c1c)"
      shadow="0 20px 60px -10px rgba(248, 113, 113, 0.5)"
      icon={<ShieldAlert className="w-16 h-16 text-white" />}
    />
  ),

  // 5 — Rastgele vs hedefli karşılaştırma kartları
  () => (
    <SlideShell>
      <Eyebrow>İki temel senaryo</Eyebrow>
      <H2 className="mb-2">Rastgele başarısızlık ve hedefli saldırı</H2>
      <Sub className="max-w-3xl mb-8">
        Aynı sayıda düğümü silersin — ama hangilerini sildiğin sonucu kökten
        değiştirir. Sosyal ağda &quot;hangi düğüm?&quot; sorusu &quot;kaç
        düğüm?&quot; sorusundan daha önemlidir.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="saa-card rounded-xl p-6"
          style={{ borderColor: "rgba(251,191,36,0.4)" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <Dice5 className="w-6 h-6 text-[#fbbf24]" />
            <h3 className="text-xl font-semibold text-white">
              Rastgele başarısızlık
            </h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Düğümler gelişigüzel kaybolur: kullanıcı hesabını siler, bir röle
            arızalanır. Ağdaki düğümlerin çoğu düşük dereceli olduğu için
            silinen de büyük olasılıkla bir çevre düğümüdür.
          </p>
          <ul className="text-sm text-gray-400 space-y-1.5">
            <li>· Hesap silme / pasifleşme dalgaları</li>
            <li>· Donanım arızaları, kesintiler</li>
            <li>· Sonuç: ölçeksiz ağ genelde dayanıklı</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="saa-card rounded-xl p-6"
          style={{ borderColor: "rgba(248,113,113,0.4)" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <Crosshair className="w-6 h-6 text-[#f87171]" />
            <h3 className="text-xl font-semibold text-white">Hedefli saldırı</h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            En yüksek dereceli / aradalığı yüksek düğümler bilerek seçilip
            silinir. Birkaç hub yeter — ağ hızla kopuk parçalara ayrılır.
          </p>
          <ul className="text-sm text-gray-400 space-y-1.5">
            <li>· Sahte hesap kampanyalarının elebaşıları</li>
            <li>· Bot ağında komuta-kontrol düğümleri</li>
            <li>· Sonuç: ölçeksiz ağ kırılgan</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 6 — Üç aşamalı görsel ilerleme
  () => (
    <SlideShell>
      <Eyebrow>Görsel · aynı ağ, üç senaryo</Eyebrow>
      <H2 className="mb-2">Hub&apos;ı çekince ağ dağılır</H2>
      <Sub className="max-w-3xl mb-6">
        Soldan sağa: sağlam ağ, iki çevre düğümünün rastgele kaybı, ve tek bir
        hub&apos;ın hedefli kaybı. Aynı &quot;silme sayısı&quot; çok farklı
        sonuç verir.
      </Sub>
      <ResilienceProgression />
    </SlideShell>
  ),

  // 7 — Sağlam ama kırılgan (robust yet fragile)
  () => (
    <SlideShell>
      <Eyebrow>Ölçeksiz ağların paradoksu</Eyebrow>
      <H2 className="mb-2">&quot;Sağlam ama kırılgan&quot;</H2>
      <Sub className="max-w-3xl mb-8">
        Çoğu sosyal ağın derece dağılımı kuyrukludur (birkaç çok bağlantılı hub,
        çok sayıda az bağlantılı düğüm). Bu yapı iki yüzlüdür:
      </Sub>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#5eead4]">
            <Dice5 className="w-5 h-5" />
            <span className="text-sm font-semibold">Rastgeleye karşı SAĞLAM</span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            Rastgele silinen düğüm büyük olasılıkla düşük dereceli bir çevre
            düğümüdür; ağın iskeletini taşıyan hub&apos;lara dokunmaz. Bu yüzden
            dev bileşen uzun süre ayakta kalır.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="saa-card rounded-xl p-6"
          style={{ borderColor: "rgba(248,113,113,0.4)" }}
        >
          <div className="flex items-center gap-2 mb-3 text-[#f87171]">
            <Crosshair className="w-5 h-5" />
            <span className="text-sm font-semibold">Hedefliye karşı KIRILGAN</span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            Saldırgan hub&apos;ları bilerek seçerse ağı taşıyan az sayıdaki
            yüksek dereceli düğümü kaldırır; kısa yollar uzar, dev bileşen hızla
            küçülür. Tek noktaya bağımlılık (single point of failure) burada.
          </p>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  2. DAYANIKLILIK ÖLÇÜLERİ  ───────────────── */

  // 8 — Section divider 2/3
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Dayanıklılığı Ölçmek"
      subtitle="Sezgiyi sayıya çevirelim: dev bileşen, perkolasyon eşiği ve bağlantı temelli ölçüler."
      bgGradient="linear-gradient(135deg, #14b8a6, #0d9488)"
      shadow="0 20px 60px -10px rgba(20, 184, 166, 0.6)"
      icon={<Target className="w-16 h-16 text-white" />}
    />
  ),

  // 9 — Dev bileşen ve perkolasyon eşiği
  () => (
    <SlideShell>
      <Eyebrow>Temel ölçü</Eyebrow>
      <H2 className="mb-2">Dev bileşen S ve perkolasyon eşiği</H2>
      <Sub className="max-w-3xl mb-8">
        Dayanıklılığın ana göstergesi, en büyük bağlı bileşendeki düğümlerin
        oranı S&apos;tir. Düğümleri sildikçe S düşer; belirli bir kritik oranda
        ağ aniden &quot;dev bileşensiz&quot; kalır — buna perkolasyon eşiği denir.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-wider text-[#5eead4] mb-3">
            Dev bileşen oranı
          </div>
          <div className="saa-card rounded-lg p-4 font-mono text-sm text-[#a7f3d0] text-center">
            S = |en büyük bileşen| / n
          </div>
          <p className="mt-4 text-sm text-gray-300 leading-relaxed">
            S ≈ 1 → ağın neredeyse tamamı tek parça. S küçüldükçe ağ kopuk
            adacıklara bölünür; iletişim/yayılım durur.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-wider text-gray-400 mb-3">
            Perkolasyon eşiği
          </div>
          <div className="saa-card rounded-lg p-4 font-mono text-sm text-[#a7f3d0] text-center">
            f<sub>c</sub> = kritik kaldırma oranı
          </div>
          <p className="mt-4 text-sm text-gray-300 leading-relaxed">
            f &lt; f<sub>c</sub> iken dev bileşen var; f ≥ f<sub>c</sub> olunca
            yok. f<sub>c</sub> 1&apos;e ne kadar yakınsa ağ o kadar dayanıklıdır.
          </p>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 10 — Perkolasyon eğrisi grafiği
  () => (
    <SlideShell>
      <Eyebrow>Görsel · S(f) eğrisi</Eyebrow>
      <H2 className="mb-2">Aynı ağ, iki çok farklı eğri</H2>
      <Sub className="max-w-3xl mb-6">
        Yatay eksen kaldırılan düğüm oranı f, dikey eksen dev bileşen oranı
        S&apos;tir. Hedefli saldırı (kırmızı) çok küçük f&apos;te ağı çökertirken,
        rastgele kayıp (sarı) yavaş ve geç düşer.
      </Sub>
      <PercolationChart />
    </SlideShell>
  ),

  // 11 — Ölçüler tablosu
  () => (
    <SlideShell>
      <Eyebrow>Toparlayalım · ölçüler</Eyebrow>
      <H2 className="mb-2">Dört dayanıklılık ölçüsü yan yana</H2>
      <Sub className="max-w-3xl mb-6">
        S anlık durumu, f<sub>c</sub> kritik eşiği, λ<sub>2</sub> bölünmeye
        direnci, κ ise &quot;kaç düğüm silinirse kopar&quot; sorusunu ölçer.
      </Sub>
      <MetricTable />
    </SlideShell>
  ),

  // 12 — Esneklik: toparlanma / yeniden yönlendirme
  () => (
    <SlideShell>
      <Eyebrow>Statikten dinamiğe</Eyebrow>
      <H2 className="mb-2">Esneklik: hasardan sonra ne olur?</H2>
      <Sub className="max-w-3xl mb-8">
        Dayanıklılık ölçüleri &quot;ne kadar dayanır&quot;ı verir; esneklik ise
        kopan bağların yerine ağın nasıl yeni yollar bulduğunu sorar. Sosyal
        ağlarda esneklik üç mekanizmayla artar:
      </Sub>
      <div className="grid md:grid-cols-3 gap-5">
        <FeatureCard
          icon={GitBranch}
          title="Yedek yollar"
          desc="Yüksek geçişlilik (üçgenler) ve fazla bağlantı, bir kenar koptuğunda akışın başka rotadan devamını sağlar."
          accent="#14b8a6"
          delay={0.1}
        />
        <FeatureCard
          icon={Zap}
          title="Yeniden bağlanma"
          desc="Kullanıcılar kaybolan bağlantı yerine yeni ilişkiler kurar; ağ zamanla kendini yeniden örer."
          accent="#0d9488"
          delay={0.25}
        />
        <FeatureCard
          icon={Layers}
          title="Modüler yapı"
          desc="Topluluklara bölünmüş ağda bir modüldeki hasar diğerlerine sıçramaz; arıza yerel kalır."
          accent="#5eead4"
          delay={0.4}
        />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3. PRATİKTE  ───────────────── */

  // 13 — Section divider 3/3
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Pratikte"
      subtitle="NetworkX ile bir ağı kendi elinle kır: hedefli saldırı, rastgele kayıp ve S(f) eğrisi."
      bgGradient="linear-gradient(135deg, #0d9488, #115e59)"
      shadow="0 20px 60px -10px rgba(13, 148, 136, 0.6)"
      icon={<Code2 className="w-16 h-16 text-white" />}
    />
  ),

  // 14 — Python kod örneği
  () => (
    <SlideShell>
      <Eyebrow>Python · NetworkX</Eyebrow>
      <H2 className="mb-6">Hedefli saldırıyı kodla</H2>
      <CodeBlock />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-5 text-xs text-gray-500 text-center"
      >
        Barabási–Albert modeli ölçeksiz bir ağ üretir; en yüksek dereceli düğümü
        tekrar tekrar silmek hedefli saldırının en basit hâlidir.
      </motion.div>
    </SlideShell>
  ),

  // 15 — Terminal çıktısı
  () => (
    <SlideShell>
      <Eyebrow>Canlı çıktı · S(f) tablosu</Eyebrow>
      <H2 className="mb-2">Rakamlar farkı doğruluyor</H2>
      <Sub className="max-w-3xl mb-6">
        Aynı ağda f arttıkça rastgele senaryoda S neredeyse sabit kalırken,
        hedefli senaryoda %10 düğüm silinince dev bileşen üçte birine iner.
      </Sub>
      <AttackTerminal />
    </SlideShell>
  ),

  // 16 — Bu hafta uygulamalı lab
  () => {
    const items: Array<{ t: string; d: string; icon: LucideIcon }> = [
      {
        t: "Bir ağ seç ve yükle",
        d: "nx.karate_club_graph() ya da BA(500, 3). Başlangıç S, n ve <k> değerlerini not et.",
        icon: Network,
      },
      {
        t: "Rastgele kayıp uygula",
        d: "Her adımda rastgele bir düğüm sil, S&apos;i kaydet — f = 0&apos;dan 0.5&apos;e kadar.",
        icon: Dice5,
      },
      {
        t: "Hedefli saldırı uygula",
        d: "Her adımda en yüksek dereceli düğümü sil, S&apos;i tekrar kaydet.",
        icon: Scissors,
      },
      {
        t: "İki eğriyi çiz ve yorumla",
        d: "matplotlib ile S(f) eğrilerini üst üste çiz; eşik farkını 3 cümlede açıkla.",
        icon: TrendingDown,
      },
    ];
    return (
      <SlideShell>
        <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
        <H2 className="mb-8">Kendi ağını kır, eğrisini çiz</H2>
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
          className="mt-6 saa-card-warn rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
        >
          <AlertTriangle className="w-4 h-4 text-[#f87171] mt-0.5 flex-shrink-0" />
          <span>
            <span className="text-white">Dikkat:</span> Saldırı simülasyonu
            yalnızca elindeki veri/model üzerinde bir analizdir — gerçek bir
            kişiyi veya sistemi hedef alma çağrısı değildir. Etik ve gizlilik 13.
            haftanın konusu.
          </span>
        </motion.div>
      </SlideShell>
    );
  },

  // 17 — Sıradaki hafta önizleme
  () => (
    <SlideShell>
      <Eyebrow>Sıradaki Hafta</Eyebrow>
      <H2 className="mb-8">13. Hafta — Veri etiği ve gizlilik</H2>
      <div className="grid md:grid-cols-3 gap-5">
        <FeatureCard
          icon={ListChecks}
          title="Veri toplama etiği"
          desc="Rıza, anonimleştirme ve KVKK/GDPR çerçevesinde sosyal ağ verisini sorumlu kullanmak."
          accent="#14b8a6"
          delay={0.1}
        />
        <FeatureCard
          icon={ShieldAlert}
          title="Yeniden kimliklendirme"
          desc="Anonim ağların bile yapı üzerinden nasıl çözülebildiği ve buna karşı önlemler."
          accent="#0d9488"
          delay={0.25}
        />
        <FeatureCard
          icon={ArrowRight}
          title="Projeye köprü"
          desc="Bu hafta üretilen analizleri 14. haftadaki proje sunumuna taşımak için etik kontrol listesi."
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
          <span className="text-[#5eead4] font-semibold">
            bu haftaki S(f) eğrilerini ve kodunu
          </span>{" "}
          yanında getir — gelecek hafta bu analizin etik sınırlarını
          tartışacağız.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 18 — Kapanış
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
        <H1 className="saa-shimmer-teal">Özet</H1>
        <Sub className="mt-6">
          Rastgele kayıp ağı yorar, hedefli saldırı çökertir —{" "}
          <span className="text-[#5eead4]">hub&apos;ı koru, eşiği bil.</span>
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 text-left"
        >
          <div className="saa-card rounded-xl p-5">
            <Crosshair className="w-5 h-5 text-[#5eead4] mb-3" />
            <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
              Tehdit
            </div>
            <div className="text-sm font-semibold text-white">
              Rastgele vs hedefli
            </div>
            <div className="text-xs text-gray-400">aynı sayı, farklı sonuç</div>
          </div>
          <div className="saa-card rounded-xl p-5">
            <BarChart3 className="w-5 h-5 text-[#5eead4] mb-3" />
            <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
              Ölçü
            </div>
            <div className="text-sm font-semibold text-white">
              S · f_c · λ₂ · κ
            </div>
            <div className="text-xs text-gray-400">dayanıklılığı sayar</div>
          </div>
          <div className="saa-card rounded-xl p-5">
            <Code2 className="w-5 h-5 text-[#5eead4] mb-3" />
            <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
              Pratik
            </div>
            <div className="text-sm font-semibold text-white">NetworkX labı</div>
            <div className="text-xs text-gray-400">S(f) eğrisini çiz</div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 inline-flex items-center gap-2 text-xs font-mono text-gray-500"
        >
          <Keyboard className="w-3.5 h-3.5" />
          BVA 2105 · Sosyal Ağ Analizi · 12. Hafta
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
          BVA 2105 · 12. Hafta · Ağ Dayanıklılığı
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
