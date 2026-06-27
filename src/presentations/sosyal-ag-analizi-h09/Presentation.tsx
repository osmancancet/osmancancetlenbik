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
  Layers,
  Network,
  GitBranch,
  Building2,
  Users,
  User,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  Boxes,
  Hash,
  Code2,
  Database,
  ArrowUpDown,
  Layers3,
  Workflow,
  Repeat,
  Calendar,
  Clock,
  Mail,
  MapPin,
  AlertTriangle,
  TrendingUp,
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
   TOPIC MOCKUPS — çok seviyeli ağ
   ============================================================ */

type MlNode = { id: string; x: number; y: number; label: string };
type MlEdge = [string, string];

/**
 * Çok katmanlı (multiplex) ağ görseli: AYNI aktör kümesi (A, B, C, D),
 * iki ayrı katmanda (örn. "yüz yüze arkadaşlık" ve "çevrimiçi takip")
 * farklı bağlarla. Katmanlar arası kesikli sarı çizgiler aynı kişinin
 * iki düzlemdeki kopyasını birbirine bağlar (inter-layer coupling).
 */
function MultiplexMockup() {
  const top: MlNode[] = [
    { id: "tA", x: 120, y: 70, label: "A" },
    { id: "tB", x: 330, y: 40, label: "B" },
    { id: "tC", x: 520, y: 95, label: "C" },
    { id: "tD", x: 300, y: 150, label: "D" },
  ];
  const bottom: MlNode[] = [
    { id: "bA", x: 120, y: 300, label: "A" },
    { id: "bB", x: 330, y: 270, label: "B" },
    { id: "bC", x: 520, y: 325, label: "C" },
    { id: "bD", x: 300, y: 380, label: "D" },
  ];
  const topEdges: MlEdge[] = [
    ["tA", "tB"],
    ["tB", "tC"],
    ["tB", "tD"],
    ["tA", "tD"],
  ];
  const bottomEdges: MlEdge[] = [
    ["bA", "bC"],
    ["bB", "bC"],
    ["bC", "bD"],
  ];
  const couplings: [string, string][] = [
    ["tA", "bA"],
    ["tB", "bB"],
    ["tC", "bC"],
    ["tD", "bD"],
  ];
  const all = [...top, ...bottom];
  const find = (id: string) => all.find((n) => n.id === id)!;
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
          <span>multiplex_ag · 2 katman · 4 aktör · aynı düğüm kümesi</span>
        </div>
      </div>
      <div className="p-4 bg-[#070b0a]">
        <svg viewBox="0 0 640 440" className="w-full h-auto">
          {/* katman düzlemleri */}
          <rect x={40} y={20} width={560} height={170} rx={12} fill="#14b8a6" fillOpacity={0.05} stroke="#14b8a6" strokeOpacity={0.25} />
          <rect x={40} y={250} width={560} height={170} rx={12} fill="#0d9488" fillOpacity={0.05} stroke="#0d9488" strokeOpacity={0.25} />

          <text x={56} y={42} fontSize={12} fontWeight={700} fill="#5eead4" fontFamily="Inter, sans-serif">
            Katman 1 · yüz yüze arkadaşlık
          </text>
          <text x={56} y={272} fontSize={12} fontWeight={700} fill="#2dd4bf" fontFamily="Inter, sans-serif">
            Katman 2 · çevrimiçi takip
          </text>

          {/* katmanlar arası bağ (coupling) */}
          {couplings.map(([a, b], i) => {
            const na = find(a);
            const nb = find(b);
            return (
              <line
                key={`c-${i}`}
                x1={na.x}
                y1={na.y}
                x2={nb.x}
                y2={nb.y}
                className="saa-coupling"
                strokeWidth={1.6}
              />
            );
          })}

          {/* katman içi kenarlar */}
          {[...topEdges, ...bottomEdges].map((e, i) => {
            const na = find(e[0]);
            const nb = find(e[1]);
            return (
              <line
                key={`e-${i}`}
                x1={na.x}
                y1={na.y}
                x2={nb.x}
                y2={nb.y}
                stroke="#14b8a6"
                strokeWidth={2}
                strokeOpacity={0.7}
              />
            );
          })}

          {/* düğümler */}
          {all.map((n) => (
            <g key={n.id}>
              <circle
                cx={n.x}
                cy={n.y}
                r={18}
                fill="#0d9488"
                stroke="#5eead4"
                strokeWidth={2}
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
                {n.label}
              </text>
            </g>
          ))}
        </svg>
        <div className="mt-1 flex items-center justify-center gap-5 text-[11px] text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-5 h-px bg-[#14b8a6]" /> katman içi kenar
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-5 h-px" style={{ borderTop: "2px dashed #fbbf24" }} /> katmanlar arası bağ
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * İki seviyeli (bipartite / iç içe) ağ: bireyler ALT seviyede, ait oldukları
 * gruplar (kurum) ÜST seviyede. Aidiyet kenarları seviyeleri birbirine bağlar.
 */
function NestedLevelsMockup() {
  const groups: MlNode[] = [
    { id: "g1", x: 170, y: 60, label: "Bölüm X" },
    { id: "g2", x: 470, y: 60, label: "Bölüm Y" },
  ];
  const people: MlNode[] = [
    { id: "p1", x: 90, y: 300, label: "Ali" },
    { id: "p2", x: 220, y: 300, label: "Ayşe" },
    { id: "p3", x: 330, y: 300, label: "Mehmet" },
    { id: "p4", x: 450, y: 300, label: "Zeynep" },
    { id: "p5", x: 560, y: 300, label: "Can" },
  ];
  const membership: [string, string][] = [
    ["p1", "g1"],
    ["p2", "g1"],
    ["p3", "g1"],
    ["p3", "g2"],
    ["p4", "g2"],
    ["p5", "g2"],
  ];
  const all = [...groups, ...people];
  const find = (id: string) => all.find((n) => n.id === id)!;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="saa-card rounded-xl p-5"
    >
      <svg viewBox="0 0 650 360" className="w-full h-auto">
        <text x={20} y={28} fontSize={12} fontWeight={700} fill="#5eead4" fontFamily="Inter, sans-serif">
          Üst seviye · gruplar
        </text>
        <text x={20} y={262} fontSize={12} fontWeight={700} fill="#9ca3af" fontFamily="Inter, sans-serif">
          Alt seviye · bireyler
        </text>

        {membership.map(([p, g], i) => {
          const np = find(p);
          const ng = find(g);
          return (
            <line
              key={`m-${i}`}
              x1={np.x}
              y1={np.y - 16}
              x2={ng.x}
              y2={ng.y + 20}
              stroke="#fbbf24"
              strokeWidth={1.8}
              strokeOpacity={0.6}
            />
          );
        })}

        {groups.map((g) => (
          <g key={g.id}>
            <rect x={g.x - 60} y={g.y - 22} width={120} height={44} rx={10} fill="#14b8a6" fillOpacity={0.18} stroke="#5eead4" strokeWidth={2} />
            <text x={g.x} y={g.y + 5} textAnchor="middle" fontSize={13} fontWeight={700} fill="#ffffff" fontFamily="Inter, sans-serif">
              {g.label}
            </text>
          </g>
        ))}

        {people.map((p) => (
          <g key={p.id}>
            <circle cx={p.x} cy={p.y} r={18} fill="#1f2937" stroke="#9ca3af" strokeWidth={1.6} />
            <text x={p.x} y={p.y + 40} textAnchor="middle" fontSize={11} fontWeight={600} fill="#cbd5e1" fontFamily="Inter, sans-serif">
              {p.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="mt-1 text-xs text-gray-400 text-center">
        <span className="text-[#5eead4] font-semibold">Mehmet</span> iki bölüme de bağlı — seviyeler arası{" "}
        <span className="text-[#fbbf24] font-semibold">köprü</span> aktör.
      </div>
    </motion.div>
  );
}

function StructureComparison() {
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
            <th style={{ width: "16%" }}>Yapı</th>
            <th>Tek katmanlı</th>
            <th>Çok katmanlı (multiplex)</th>
            <th>İç içe / hiyerarşik</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="saa-row-head">Düğüm kümesi</td>
            <td>Tek küme</td>
            <td>Aynı aktörler her katmanda tekrarlanır</td>
            <td>Farklı seviyelerde farklı türde düğümler</td>
          </tr>
          <tr>
            <td className="saa-row-head">Kenar türü</td>
            <td>Tek ilişki türü</td>
            <td>Katman içi + katmanlar arası bağ (coupling)</td>
            <td>Aidiyet / içerme kenarları</td>
          </tr>
          <tr>
            <td className="saa-row-head">Örnek</td>
            <td>Sadece &ldquo;arkadaşlık&rdquo; ağı</td>
            <td>Arkadaşlık &amp; takip &amp; mesajlaşma birlikte</td>
            <td>Kişi &rarr; ekip &rarr; departman &rarr; şirket</td>
          </tr>
          <tr>
            <td className="saa-row-head">Soru</td>
            <td>Kim merkezde?</td>
            <td>Katmanlar arası kim tutarlı şekilde merkezde?</td>
            <td>Hangi seviyede topluluk oluşuyor?</td>
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
          <span>multilayer.py · Python 3.12 · NetworkX 3.3</span>
        </div>
      </div>
      <pre className="saa-code p-6 overflow-x-auto m-0">
        <code>
          <span className="saa-code-cmt"># 1) Her katmanı ayrı bir grafa koyup sözlükte topla</span>
          {"\n"}
          <span className="saa-code-kw">import</span>{" "}
          <span className="saa-code-fn">networkx</span>{" "}
          <span className="saa-code-kw">as</span>{" "}
          <span className="saa-code-fn">nx</span>
          {"\n"}
          {"\n"}
          aktorler = [<span className="saa-code-str">&quot;A&quot;</span>,{" "}
          <span className="saa-code-str">&quot;B&quot;</span>,{" "}
          <span className="saa-code-str">&quot;C&quot;</span>,{" "}
          <span className="saa-code-str">&quot;D&quot;</span>]
          {"\n"}
          arkadaslik = nx.<span className="saa-code-fn">Graph</span>([(
          <span className="saa-code-str">&quot;A&quot;</span>,
          <span className="saa-code-str">&quot;B&quot;</span>), (
          <span className="saa-code-str">&quot;B&quot;</span>,
          <span className="saa-code-str">&quot;D&quot;</span>)])
          {"\n"}
          takip      = nx.<span className="saa-code-fn">Graph</span>([(
          <span className="saa-code-str">&quot;A&quot;</span>,
          <span className="saa-code-str">&quot;C&quot;</span>), (
          <span className="saa-code-str">&quot;C&quot;</span>,
          <span className="saa-code-str">&quot;D&quot;</span>)])
          {"\n"}
          katmanlar = {"{"}
          <span className="saa-code-str">&quot;arkadaslik&quot;</span>: arkadaslik,{" "}
          <span className="saa-code-str">&quot;takip&quot;</span>: takip{"}"}
          {"\n"}
          {"\n"}
          <span className="saa-code-cmt"># 2) Her aktör için katmana özgü dereceyi karşılaştır</span>
          {"\n"}
          <span className="saa-code-kw">for</span> v{" "}
          <span className="saa-code-kw">in</span> aktorler:
          {"\n"}
          {"    "}satir = {"{"}ad: G.<span className="saa-code-fn">degree</span>(v){" "}
          <span className="saa-code-kw">if</span> v{" "}
          <span className="saa-code-kw">in</span> G{" "}
          <span className="saa-code-kw">else</span>{" "}
          <span className="saa-code-num">0</span>
          {"\n"}
          {"             "}<span className="saa-code-kw">for</span> ad, G{" "}
          <span className="saa-code-kw">in</span> katmanlar.
          <span className="saa-code-fn">items</span>(){"}"}
          {"\n"}
          {"    "}<span className="saa-code-fn">print</span>(v, satir)
          {"\n"}
          <span className="saa-code-cmt"># A {"{"}&apos;arkadaslik&apos;: 1, &apos;takip&apos;: 1{"}"} ...</span>
        </code>
      </pre>
    </motion.div>
  );
}

/* ============================================================
   SLIDES — BVA 2105 · 9. Hafta · Çok Seviyeli Ağ Analizi
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ─────────────────  AÇILIŞ  ───────────────── */

  // 1 — Kapak
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2105 · 9. Hafta — Sosyal Ağ Analizi</Eyebrow>
        <H1 className="saa-shimmer">
          Çok Seviyeli
          <br />
          Ağ Analizi
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Tek bir ilişki türü gerçeği anlatmaz. Aynı insanlar birden çok
          ağda — ve birden çok seviyede — aynı anda yaşar.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={Layers3}
            title="Çok katmanlı ağ"
            desc="Aynı aktörler, birden çok ilişki katmanı (arkadaşlık · takip · mesaj)."
            accent="#14b8a6"
            delay={0.3}
          />
          <FeatureCard
            icon={Building2}
            title="İç içe seviyeler"
            desc="Birey &rarr; ekip &rarr; departman &rarr; kurum — hiyerarşik aidiyet."
            accent="#0d9488"
            delay={0.45}
          />
          <FeatureCard
            icon={ArrowUpDown}
            title="Seviyeler arası bağ"
            desc="Katmanları birbirine bağlayan coupling kenarları ve köprü aktörler."
            accent="#5eead4"
            delay={0.6}
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 inline-flex items-center gap-2 text-xs font-mono text-gray-500"
        >
          <Calendar className="w-3.5 h-3.5" />
          Cuma · 09:55 — 11:35 · Uygulamalı (Python + NetworkX)
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 2 — Geçen haftadan köprü / bu haftanın hedefi
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 8. haftadan 9. haftaya</Eyebrow>
      <H2>Tek katmanı çözdük; gerçek hayat tek katmanlı değil</H2>
      <Sub className="mt-3 max-w-3xl">
        Şimdiye kadar tek bir ilişki türü içeren ağlarda merkezilik ve
        topluluk aradık. Oysa bir kişi aynı anda hem arkadaş, hem takipçi, hem
        de bir bölümün üyesidir. Bu hafta bu katmanları üst üste koyup birlikte
        analiz etmeyi öğreniyoruz.
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
              Şimdiye kadar
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />
              Tek tip kenar: yalnızca &ldquo;arkadaşlık&rdquo; ya da yalnızca
              &ldquo;takip&rdquo;.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />
              Tek seviye: herkes aynı düzlemde bir düğüm.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />
              Merkezilik, topluluk, en kısa yol — hep tek grafta.
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
            <Layers className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Bu haftanın hedefi
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] flex-shrink-0" />
              Çok katmanlı ve iç içe yapıları ayırt etmek.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] flex-shrink-0" />
              Katmanlar arası bağı (coupling) modellemek.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] flex-shrink-0" />
              Çok katmanlı ölçüleri NetworkX ile hesaplamak.
            </li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  1. SEVİYE & KATMAN  ───────────────── */

  // 3 — Section divider 1/3
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Seviye ve Katman"
      subtitle="Tek bir ağ resmi yalan söyler; gerçeği görmek için katmanları üst üste koymak gerekir."
      bgGradient="linear-gradient(135deg, #14b8a6, #0d9488)"
      shadow="0 20px 60px -10px rgba(20, 184, 166, 0.6)"
      icon={<Layers3 className="w-16 h-16 text-white" />}
    />
  ),

  // 4 — Neden tek katman yetmez?
  () => (
    <SlideShell>
      <Eyebrow>Sorun</Eyebrow>
      <H2 className="mb-4">Aynı iki kişi, üç farklı ilişki</H2>
      <Sub className="mb-8 max-w-3xl">
        Ali ile Ayşe&apos;yi düşünün: yüz yüze yakın arkadaşlar, ama Ali
        Ayşe&apos;yi çevrimiçi takip etmiyor ve ikisi hiç mesajlaşmıyor. Tek bir
        ağ çizersek hangi gerçeği kaydedeceğiz? Üçünü birden kaybetmeden
        gösteren tek yol katmanlardır.
      </Sub>
      <div className="grid md:grid-cols-3 gap-5">
        <FeatureCard
          icon={Users}
          title="Arkadaşlık katmanı"
          desc="Yüz yüze, güçlü ama yavaş yayılan bağlar. Güven ve destek burada."
          accent="#14b8a6"
          delay={0.1}
        />
        <FeatureCard
          icon={Repeat}
          title="Takip katmanı"
          desc="Çevrimiçi, çoğu zaman yönlü ve asimetrik. Bilgi hızlı yayılır."
          accent="#0d9488"
          delay={0.25}
        />
        <FeatureCard
          icon={Mail}
          title="Mesajlaşma katmanı"
          desc="Birebir, özel ve sık. Gerçek etkileşimin en güçlü işareti."
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
        Üç katmanı tek ağa ezersek bilgi kaybederiz. Çok seviyeli analiz, her
        katmanı ayrı tutarken{" "}
        <span className="text-[#5eead4] font-semibold">birlikte</span> incelememizi
        sağlar.
      </motion.div>
    </SlideShell>
  ),

  // 5 — Temel kavramlar: düğüm, katman, coupling
  () => (
    <SlideShell>
      <Eyebrow>Temel Kavramlar</Eyebrow>
      <H2 className="mb-8">Çok katmanlı ağın üç bileşeni</H2>
      <div className="grid md:grid-cols-3 gap-5 mb-6">
        <FeatureCard
          icon={User}
          title="Düğüm (aktör)"
          desc="Gerçek varlık: bir kişi. Çok katmanlı ağda aynı aktör her katmanda bir kopyaya sahiptir."
          accent="#14b8a6"
          delay={0.1}
        />
        <FeatureCard
          icon={Layers}
          title="Katman (layer)"
          desc="Tek bir ilişki türünü taşıyan düzlem: arkadaşlık, takip, mesaj. Her katmanın kendi kenarları var."
          accent="#0d9488"
          delay={0.25}
        />
        <FeatureCard
          icon={GitBranch}
          title="Katmanlar arası bağ"
          desc="Aynı kişinin farklı katmanlardaki kopyalarını birleştiren coupling kenarı. Katmanları tek modele bağlar."
          accent="#5eead4"
          delay={0.4}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="saa-card-teal rounded-xl p-5 text-center font-mono text-sm text-[#a7f3d0]"
      >
        M = (V<sub>M</sub>, E<sub>M</sub>, V, L) &nbsp;·&nbsp; V = aktörler
        &nbsp;·&nbsp; L = katmanlar &nbsp;·&nbsp; V<sub>M</sub> ⊆ V × L (düğüm-katman çiftleri)
      </motion.div>
    </SlideShell>
  ),

  // 6 — Multiplex görsel örnek (büyük)
  () => (
    <SlideShell>
      <Eyebrow>Görsel Örnek</Eyebrow>
      <H2 className="mb-6">İki katman, aynı dört aktör</H2>
      <MultiplexMockup />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-5 text-center text-xs text-gray-500"
      >
        Kesikli sarı çizgiler <span className="text-[#fbbf24]">aynı kişinin</span>{" "}
        iki katmandaki kopyasını bağlar (coupling). B üst katmanda merkezdeyken
        alt katmanda kenarda — katman önemli.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  2. YAPI TÜRLERİ  ───────────────── */

  // 7 — Section divider 2/3
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="İki Yapı Türü"
      subtitle="Çok katmanlı (multiplex) ile iç içe / hiyerarşik seviyeleri karıştırmak en sık hatadır."
      bgGradient="linear-gradient(135deg, #0d9488, #134e4a)"
      shadow="0 20px 60px -10px rgba(13, 148, 136, 0.6)"
      icon={<Boxes className="w-16 h-16 text-white" />}
    />
  ),

  // 8 — Multiplex vs İç içe
  () => (
    <SlideShell>
      <Eyebrow>İki yapıyı ayırt et</Eyebrow>
      <H2 className="mb-10">Multiplex mi, iç içe mi?</H2>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Layers3 className="w-6 h-6 text-[#5eead4]" />
            <h3 className="text-xl font-semibold text-white">Çok katmanlı (multiplex)</h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            <span className="text-[#5eead4] font-semibold">Aynı</span> aktör kümesi,
            farklı ilişki türlerinde tekrarlanır. Katmanlar aynı kişileri
            paylaşır.
          </p>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>· Arkadaşlık + takip + mesaj aynı kullanıcılar</li>
            <li>· Ulaşım: aynı şehirde metro + otobüs + tramvay hatları</li>
            <li>· Soru: katmanlar arası kim tutarlı şekilde merkezde?</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Building2 className="w-6 h-6 text-gray-300" />
            <h3 className="text-xl font-semibold text-white">İç içe / hiyerarşik</h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            <span className="text-gray-200 font-semibold">Farklı türde</span>{" "}
            düğümler farklı seviyelerde; alt seviye üst seviyeye{" "}
            <span className="text-gray-200">ait olur</span>.
          </p>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>· Kişi &rarr; ekip &rarr; departman &rarr; şirket</li>
            <li>· Öğrenci &rarr; sınıf &rarr; okul</li>
            <li>· Soru: hangi seviyede topluluk / etki oluşuyor?</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 9 — İç içe seviyeler görseli
  () => (
    <SlideShell>
      <Eyebrow>İç içe seviyeler · görsel</Eyebrow>
      <H2 className="mb-6">Bireyler, gruplar ve aidiyet kenarları</H2>
      <NestedLevelsMockup />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-center text-xs text-gray-500"
      >
        Alt seviye bireyler, üst seviye gruplar. İki seviyeyi bir bipartite
        (iki parçalı) ağ olarak da modelleyebiliriz; aynı gruba bağlananlar
        dolaylı olarak bir topluluk oluşturur.
      </motion.div>
    </SlideShell>
  ),

  // 10 — Karşılaştırma tablosu
  () => (
    <SlideShell>
      <Eyebrow>Toparlayalım</Eyebrow>
      <H2 className="mb-2">Üç yapı yan yana</H2>
      <Sub className="mb-6">
        Aynı veriye üç farklı yapı sorusu sorabiliriz — her biri{" "}
        <span className="text-[#5eead4] font-semibold">farklı</span> modelleme
        gerektirir.
      </Sub>
      <StructureComparison />
    </SlideShell>
  ),

  /* ─────────────────  3. ÖLÇÜM & PRATİK  ───────────────── */

  // 11 — Section divider 3/3
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Ölçüm ve Pratik"
      subtitle="Çok katmanlı dereceden katmanlar arası merkeziliğe ve NetworkX uygulamasına."
      bgGradient="linear-gradient(135deg, #0d9488, #115e59)"
      shadow="0 20px 60px -10px rgba(13, 148, 136, 0.6)"
      icon={<Workflow className="w-16 h-16 text-white" />}
    />
  ),

  // 12 — Çok katmanlı ölçüler
  () => (
    <SlideShell>
      <Eyebrow>Çok katmanlı ölçüler</Eyebrow>
      <H2 className="mb-4">Dereceyi nasıl toplarız?</H2>
      <Sub className="mb-8 max-w-3xl">
        Tek katmanda derece basitti: komşu sayısı. Çok katmanda üç farklı soru
        sorabiliriz ve hepsi ayrı bilgi verir.
      </Sub>
      <div className="grid md:grid-cols-3 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <Hash className="w-6 h-6 text-[#5eead4] mb-3" />
          <h3 className="text-base font-semibold text-white mb-2">
            Katmana özgü derece
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            Yalnızca tek bir katmandaki komşu sayısı. Aktörün o ilişki
            türündeki konumu.
          </p>
          <div className="saa-card rounded-lg p-3 font-mono text-xs text-[#a7f3d0] text-center">
            deg<sub>ℓ</sub>(v)
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="saa-card rounded-xl p-6"
        >
          <TrendingUp className="w-6 h-6 text-[#5eead4] mb-3" />
          <h3 className="text-base font-semibold text-white mb-2">
            Toplam (overlay) derece
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            Tüm katmanlardaki komşuların toplamı. Genel aktiflik, ama katman
            bilgisi kaybolur.
          </p>
          <div className="saa-card rounded-lg p-3 font-mono text-xs text-[#a7f3d0] text-center">
            Σ<sub>ℓ</sub> deg<sub>ℓ</sub>(v)
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="saa-card rounded-xl p-6"
        >
          <Boxes className="w-6 h-6 text-[#5eead4] mb-3" />
          <h3 className="text-base font-semibold text-white mb-2">
            Katman çakışması
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            Aynı bağ kaç katmanda birden var? Yüksek çakışma → güçlü, çok
            kanallı ilişki.
          </p>
          <div className="saa-card rounded-lg p-3 font-mono text-xs text-[#a7f3d0] text-center">
            o(u,v) = | {"{"}ℓ : (u,v) ∈ E<sub>ℓ</sub>{"}"} |
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 13 — Katmanlar arası merkezilik mantığı
  () => (
    <SlideShell>
      <Eyebrow>Katmanlar arası bakış</Eyebrow>
      <H2 className="mb-4">Versatility — çok yönlü merkezilik</H2>
      <Sub className="mb-8 max-w-3xl">
        Çok katmanlı ağda &ldquo;önemli&rdquo; aktör, tek bir katmanda değil,
        katmanlar boyunca tutarlı şekilde merkezde olandır. Bunu ölçen yaklaşıma
        genel olarak versatility (çok yönlülük) denir.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-wider text-[#5eead4] mb-3">
            Mantık
          </div>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-3">
              <ArrowUpDown className="w-5 h-5 text-[#5eead4] mt-0.5 flex-shrink-0" />
              <span>
                Yürüyüş (random walk) katman içinde dolaşır,{" "}
                <span className="text-[#5eead4]">coupling</span> üzerinden
                katman değiştirir.
              </span>
            </li>
            <li className="flex gap-3">
              <Repeat className="w-5 h-5 text-[#5eead4] mt-0.5 flex-shrink-0" />
              <span>
                Birden çok katmanda merkezde olan aktör daha sık ziyaret edilir —
                yüksek versatility.
              </span>
            </li>
            <li className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-[#5eead4] mt-0.5 flex-shrink-0" />
              <span>
                Tek katmanda parlayıp diğerlerinde silik olan aktör burada öne
                çıkmaz.
              </span>
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-wider text-gray-400 mb-3">
            Gerçek dünya
          </div>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-3">
              <Users className="w-5 h-5 text-[#5eead4] mt-0.5 flex-shrink-0" />
              <span>
                Hem yüz yüze sevilen hem çevrimiçi etkili çalışan — gerçek görünür
                lider.
              </span>
            </li>
            <li className="flex gap-3">
              <Building2 className="w-5 h-5 text-[#5eead4] mt-0.5 flex-shrink-0" />
              <span>
                Birden çok departmana dokunan kişi — kurumda bilgi köprüsü.
              </span>
            </li>
            <li className="flex gap-3">
              <Network className="w-5 h-5 text-[#5eead4] mt-0.5 flex-shrink-0" />
              <span>
                Tek katmanlı analiz bu kişileri kolayca ıskalar; çok katmanlı
                bakış yakalar.
              </span>
            </li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 14 — NetworkX kod
  () => (
    <SlideShell>
      <Eyebrow>Python · NetworkX</Eyebrow>
      <H2 className="mb-6">Katmanları sözlükte tut, dereceyi karşılaştır</H2>
      <CodeBlock />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-5 text-xs text-gray-500 text-center"
      >
        NetworkX&apos;te tek bir &ldquo;çok katmanlı graf&rdquo; tipi yok; pratikte
        her katmanı ayrı graf tutmak en sade yöntemdir. Daha ileri analiz için{" "}
        <span className="text-[#5eead4]">multinetx</span> veya{" "}
        <span className="text-[#5eead4]">py3plex</span> gibi kütüphaneler kullanılır.
      </motion.div>
    </SlideShell>
  ),

  // 15 — Uygulamalı: bu hafta yap-bitir
  () => {
    const items: Array<{ t: string; d: string; icon: LucideIcon }> = [
      {
        t: "İki katmanlı veri hazırla",
        d: "Aynı 8-10 kişi için iki ilişki listesi: arkadaşlik.csv ve takip.csv.",
        icon: Database,
      },
      {
        t: "Her katmanı ayrı grafa yükle",
        d: "nx.Graph() ile iki graf kur, ortak düğüm kümesini doğrula.",
        icon: Code2,
      },
      {
        t: "Katmana özgü ve toplam dereceyi hesapla",
        d: "Her aktör için iki katman derecesi + toplamı bir tabloda karşılaştır.",
        icon: TrendingUp,
      },
      {
        t: "Bir köprü aktör bul ve yorumla",
        d: "Bir katmanda silik, diğerinde merkezde olan kişiyi 3 cümlede açıkla.",
        icon: GitBranch,
      },
    ];
    return (
      <SlideShell>
        <Eyebrow>Bu hafta · uygulama</Eyebrow>
        <H2 className="mb-8">Kendi iki katmanlı ağını analiz et</H2>
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
          className="mt-5 text-xs text-gray-500 text-center"
        >
          Teslim: küçük bir not defteri (notebook) + derece karşılaştırma tablosu.
        </motion.div>
      </SlideShell>
    );
  },

  // 16 — Sıradaki hafta
  () => (
    <SlideShell>
      <Eyebrow>Sıradaki Hafta</Eyebrow>
      <H2 className="mb-8">10. Hafta — Bilgi yayılımı (SI · SIR)</H2>
      <div className="grid md:grid-cols-3 gap-5">
        <FeatureCard
          icon={Repeat}
          title="Yayılım modelleri"
          desc="Bir bilginin / söylentinin ağda nasıl yayıldığını SI ve SIR modelleriyle anlatma."
          accent="#14b8a6"
          delay={0.1}
        />
        <FeatureCard
          icon={Layers}
          title="Çok katmanlı yayılım"
          desc="Bu haftaki katman fikri orada da işe yarar: bilgi katmandan katmana atlayabilir."
          accent="#0d9488"
          delay={0.25}
        />
        <FeatureCard
          icon={Workflow}
          title="Simülasyon"
          desc="Küçük bir ağda adım adım yayılımı NetworkX ile çalıştırıp gözlemleme."
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
          Hazırlık önerisi: Bu haftaki{" "}
          <span className="text-[#5eead4] font-semibold">iki katmanlı ağ</span>{" "}
          notebook&apos;unu yanında getir — yayılımı aynı veride deneyeceğiz.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 17 — Kapanış + iletişim
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
          <Layers3 className="w-12 h-12 text-white" />
        </motion.div>
        <H1 className="saa-shimmer-teal">Özet</H1>
        <Sub className="mt-6">
          Tek katman gerçeği basitleştirir; katmanlar onu geri kazandırır.{" "}
          <span className="text-[#5eead4]">Hafta 10&apos;da görüşmek üzere.</span>
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-left"
        >
          <div className="saa-card rounded-xl p-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#14b8a6]/15 border border-[#14b8a6]/35 flex items-center justify-center shrink-0">
              <Layers3 className="w-5 h-5 text-[#5eead4]" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500">
                Kavram
              </div>
              <div className="text-sm font-semibold text-white">Katman &amp; seviye</div>
              <div className="text-xs text-gray-400">multiplex vs. iç içe</div>
            </div>
          </div>
          <div className="saa-card rounded-xl p-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#14b8a6]/15 border border-[#14b8a6]/35 flex items-center justify-center shrink-0">
              <GitBranch className="w-5 h-5 text-[#5eead4]" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500">
                Anahtar fikir
              </div>
              <div className="text-sm font-semibold text-white">Coupling</div>
              <div className="text-xs text-gray-400">katmanları bağlar</div>
            </div>
          </div>
          <div className="saa-card rounded-xl p-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#14b8a6]/15 border border-[#14b8a6]/35 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5 text-[#5eead4]" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500">
                Ölçü
              </div>
              <div className="text-sm font-semibold text-white">Versatility</div>
              <div className="text-xs text-gray-400">çok katmanlı merkezilik</div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left"
        >
          <div className="saa-card rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#14b8a6]/15 border border-[#14b8a6]/35 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-[#5eead4]" />
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
          BVA 2105 · Sosyal Ağ Analizi · 9. Hafta
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
          BVA 2105 · 9. Hafta · Çok Seviyeli Ağ Analizi
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
