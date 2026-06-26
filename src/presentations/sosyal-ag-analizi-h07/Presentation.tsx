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
  Clock,
  History,
  Repeat,
  GitCompare,
  Waypoints,
  Calendar,
  Users,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  Database,
  Code2,
  MapPin,
  Mail,
  Layers,
  LineChart,
  TrendingUp,
  Gauge,
  Microscope,
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
   TOPIC MOCKUPS — boylamsal (longitudinal) görseller
   ============================================================ */

type PanelNode = { id: string; x: number; y: number };
type PanelEdge = [string, string];

const PANEL_LAYOUT: PanelNode[] = [
  { id: "A", x: 70, y: 50 },
  { id: "B", x: 170, y: 35 },
  { id: "C", x: 200, y: 130 },
  { id: "D", x: 95, y: 155 },
  { id: "E", x: 40, y: 110 },
];

/** Tek bir gözlem dalgası (wave) — küçük ağ paneli */
function WavePanel({
  tag,
  edges,
  added = [],
  removed = [],
}: {
  tag: string;
  edges: PanelEdge[];
  added?: PanelEdge[];
  removed?: PanelEdge[];
}) {
  const find = (id: string) => PANEL_LAYOUT.find((n) => n.id === id)!;
  const key = (e: PanelEdge) => [...e].sort().join("-");
  const addedSet = new Set(added.map(key));
  const removedSet = new Set(removed.map(key));
  // Kaldırılan kenarları da (kesik çizgi olarak) göstermek için birleştir
  const allEdges: PanelEdge[] = [...edges, ...removed];
  return (
    <div className="saa-card rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="saa-panel-tag text-[11px] px-2 py-0.5 rounded">{tag}</span>
        <span className="text-[10px] text-gray-500 font-mono">{edges.length} kenar</span>
      </div>
      <svg viewBox="0 0 240 190" className="w-full h-auto">
        {allEdges.map((e, i) => {
          const a = find(e[0]);
          const b = find(e[1]);
          const k = key(e);
          const isAdded = addedSet.has(k);
          const isRemoved = removedSet.has(k);
          return (
            <line
              key={`pe-${i}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={isAdded ? "#5eead4" : isRemoved ? "#f87171" : "#475569"}
              strokeWidth={isAdded || isRemoved ? 2.2 : 1.4}
              strokeOpacity={isRemoved ? 0.7 : 0.8}
              strokeDasharray={isRemoved ? "5 4" : undefined}
            />
          );
        })}
        {PANEL_LAYOUT.map((n) => (
          <g key={n.id}>
            <circle
              cx={n.x}
              cy={n.y}
              r={14}
              fill="#0d9488"
              stroke="#5eead4"
              strokeWidth={1.6}
            />
            <text
              x={n.x}
              y={n.y + 4}
              textAnchor="middle"
              fontSize={11}
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

/** Üç dalgalı panel serisi — ağ zaman içinde nasıl değişiyor? */
function PanelSeries() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="grid grid-cols-3 gap-4 items-center">
        <WavePanel
          tag="t0 · Eylül"
          edges={[
            ["A", "B"],
            ["A", "E"],
            ["B", "C"],
            ["D", "E"],
          ]}
        />
        <WavePanel
          tag="t1 · Kasım"
          edges={[
            ["A", "B"],
            ["A", "E"],
            ["B", "C"],
            ["C", "D"],
            ["A", "D"],
          ]}
          added={[
            ["C", "D"],
            ["A", "D"],
          ]}
          removed={[["D", "E"]]}
        />
        <WavePanel
          tag="t2 · Ocak"
          edges={[
            ["A", "B"],
            ["B", "C"],
            ["C", "D"],
            ["A", "D"],
            ["B", "D"],
          ]}
          added={[["B", "D"]]}
          removed={[["A", "E"]]}
        />
      </div>
      <div className="relative mt-4 h-px saa-time-axis rounded-full" />
      <div className="mt-3 flex items-center justify-center gap-6 text-[11px]">
        <span className="flex items-center gap-2 text-gray-400">
          <span className="inline-block w-4 h-[3px] rounded bg-[#5eead4]" /> eklenen kenar
        </span>
        <span className="flex items-center gap-2 text-gray-400">
          <span
            className="inline-block w-4 h-[3px] rounded"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg,#f87171 0 4px,transparent 4px 7px)",
            }}
          />{" "}
          silinen kenar
        </span>
        <span className="flex items-center gap-2 text-gray-400">
          <span className="inline-block w-4 h-[3px] rounded bg-[#475569]" /> kalıcı kenar
        </span>
      </div>
    </motion.div>
  );
}

/** Kesitsel vs boylamsal karşılaştırma tablosu */
function CrossSectionVsLongitudinal() {
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
            <th style={{ width: "20%" }}>Boyut</th>
            <th>Kesitsel ağ (tek dalga)</th>
            <th>Boylamsal ağ (çok dalga)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="saa-row-head">Veri</td>
            <td>Tek bir zaman noktasında çekilen tek ağ</td>
            <td>Aynı düğümler, en az 2 zaman noktasında tekrarlı ölçüm</td>
          </tr>
          <tr>
            <td className="saa-row-head">Sorduğu soru</td>
            <td>Şu an kim merkezde, hangi topluluklar var?</td>
            <td>Bağlar nasıl kuruluyor, kopuyor; ağ nasıl evriliyor?</td>
          </tr>
          <tr>
            <td className="saa-row-head">Nedensellik</td>
            <td>Yön belirsiz — seçim mi etki mi ayrılamaz</td>
            <td>Zaman sırası sayesinde seçim ve etki ayrıştırılabilir</td>
          </tr>
          <tr>
            <td className="saa-row-head">Tipik yöntem</td>
            <td>Merkezilik, ERGM, topluluk tespiti</td>
            <td>SAOM (RSiena), TERGM, ağ olay/temporal analiz</td>
          </tr>
        </tbody>
      </table>
    </motion.div>
  );
}

/** Jaccard / kararlılık metrikleri kartı */
function StabilityMetrics() {
  const metrics = [
    {
      label: "Jaccard benzerliği",
      formula: "J = N11 / (N11 + N10 + N01)",
      desc: "İki dalga arasında ortak kalan bağların oranı. 1’e yakın → ağ kararlı, 0’a yakın → büyük çalkalanma.",
      icon: GitCompare,
    },
    {
      label: "Bağ devir hızı (turnover)",
      formula: "yeni + kopan bağ / toplam bağ",
      desc: "Dalgalar arasında kaç bağın değiştiği. Yüksek devir → akışkan ilişki yapısı.",
      icon: Repeat,
    },
    {
      label: "Hamming uzaklığı",
      formula: "Σ |x_ij(t1) − x_ij(t2)|",
      desc: "İki dalganın komşuluk matrisleri arasında farklı hücre sayısı — toplam değişim miktarı.",
      icon: Gauge,
    },
  ];
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="saa-card rounded-xl p-5"
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 bg-[#14b8a6]/15 border border-[#14b8a6]/40">
            <m.icon className="w-5 h-5 text-[#5eead4]" />
          </div>
          <div className="text-sm font-semibold text-white mb-2">{m.label}</div>
          <div className="saa-card rounded-md px-3 py-2 font-mono text-[11px] text-[#a7f3d0] mb-3">
            {m.formula}
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">{m.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

/** RSiena kod örneği */
function SienaCode() {
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
          <span>siena_model.R · R 4.4 · RSiena 1.4</span>
        </div>
      </div>
      <pre className="saa-code p-6 overflow-x-auto m-0">
        <code>
          <span className="saa-code-cmt"># 1) Üç dalgayı tek bir bağımlı ağ değişkeninde topla</span>
          {"\n"}
          <span className="saa-code-kw">library</span>(
          <span className="saa-code-fn">RSiena</span>)
          {"\n"}
          net &lt;- <span className="saa-code-fn">sienaDependent</span>(
          <span className="saa-code-fn">array</span>(c(w0, w1, w2),{" "}
          <span className="saa-code-kw">dim</span> = c(
          <span className="saa-code-num">50</span>,{" "}
          <span className="saa-code-num">50</span>,{" "}
          <span className="saa-code-num">3</span>)))
          {"\n"}
          {"\n"}
          <span className="saa-code-cmt"># 2) Aktör değişkenini (örn. cinsiyet) ekle</span>
          {"\n"}
          cins &lt;- <span className="saa-code-fn">coCovar</span>(cinsiyet)
          {"\n"}
          veri &lt;- <span className="saa-code-fn">sienaDataCreate</span>(net, cins)
          {"\n"}
          {"\n"}
          <span className="saa-code-cmt"># 3) Etkileri seç: karşılıklılık + geçişlilik (üçgenler)</span>
          {"\n"}
          eff &lt;- <span className="saa-code-fn">getEffects</span>(veri)
          {"\n"}
          eff &lt;- <span className="saa-code-fn">includeEffects</span>(eff, recip, transTrip)
          {"\n"}
          eff &lt;- <span className="saa-code-fn">includeEffects</span>(eff, sameX,{" "}
          <span className="saa-code-kw">interaction1</span> ={" "}
          <span className="saa-code-str">&quot;cins&quot;</span>)
          {"\n"}
          {"\n"}
          <span className="saa-code-cmt"># 4) Modeli tahmin et (MCMC tabanlı)</span>
          {"\n"}
          alg &lt;- <span className="saa-code-fn">sienaAlgorithmCreate</span>(
          <span className="saa-code-kw">projname</span> ={" "}
          <span className="saa-code-str">&quot;ders_agi&quot;</span>)
          {"\n"}
          fit &lt;- <span className="saa-code-fn">siena07</span>(alg,{" "}
          <span className="saa-code-kw">data</span> = veri,{" "}
          <span className="saa-code-kw">effects</span> = eff)
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
        <Eyebrow>BVA 2105 · 7. Hafta — Sosyal Ağ Analizi</Eyebrow>
        <H1 className="saa-shimmer">
          Boylamsal
          <br />
          Ağ Analizi
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Ağı bir fotoğraf değil, bir film olarak okumak: bağlar zaman içinde
          nasıl kuruluyor, kopuyor ve dönüşüyor?
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          <FeatureCard
            icon={History}
            title="Panel / dalga verisi"
            desc="Aynı düğümleri birden çok zaman noktasında ölçmek."
            accent="#14b8a6"
            delay={0.3}
          />
          <FeatureCard
            icon={GitCompare}
            title="Değişimi ölçmek"
            desc="Jaccard, devir hızı, Hamming ile kararlılık ve çalkalanma."
            accent="#0d9488"
            delay={0.45}
          />
          <FeatureCard
            icon={Microscope}
            title="SAOM / RSiena"
            desc="Bağ oluşumunu modelleyen aktör-temelli yaklaşım."
            accent="#5eead4"
            delay={0.6}
          />
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. Köprü: geçen hafta → bu hafta ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · Önceki haftalardan bu haftaya</Eyebrow>
      <H2>Şimdiye kadar tek bir anlık ağa baktık</H2>
      <Sub className="mt-3 max-w-3xl">
        Merkezilik, görselleştirme ve topluluk tespitini hep tek bir zaman
        noktasındaki ağ üzerinde çalıştık. Ama gerçek sosyal ağlar durağan
        değildir: arkadaşlıklar kurulur, takipler bırakılır, gruplar dağılır. Bu
        hafta zaman eksenini ekliyoruz.
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
              Şimdiye kadar (kesitsel)
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />
              &quot;Şu an kim merkezde?&quot;
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />
              Tek dalga · tek görüntü · değişim körü.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />
              Neden-sonuç yönünü ayırt edemez.
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
            <Activity className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Bu hafta (boylamsal)
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] flex-shrink-0" />
              &quot;Ağ nasıl değişiyor?&quot;
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] flex-shrink-0" />
              Çok dalga · zaman serisi · evrim.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] flex-shrink-0" />
              Zaman sırası → seçim mi etki mi ayrılabilir.
            </li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 3. Bu dersin akışı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: veri → değişim ölçümü → modelleme</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce zaman içinde ağ verisinin nasıl yapılandığını görüyoruz; sonra
        dalgalar arası değişimi sayısallaştırıyoruz; en son bu değişimi
        açıklayan istatistiksel modele (SAOM) geçiyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            range: "01",
            title: "Zaman içinde ağ",
            items: ["Kesitsel vs boylamsal", "Panel / dalga verisi", "Statik vs temporal ağ"],
            icon: History,
            accent: "#14b8a6",
          },
          {
            range: "02",
            title: "Değişimi ölçmek",
            items: ["Jaccard & devir hızı", "Hamming uzaklığı", "Merkeziliğin zaman serisi"],
            icon: GitCompare,
            accent: "#0d9488",
          },
          {
            range: "03",
            title: "Modelleme",
            items: ["Seçim vs etki ikilemi", "SAOM mantığı", "RSiena ile pratik"],
            icon: Microscope,
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

  /* ───── 4. Bölüm 1 ───── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Zaman İçinde Ağ"
      subtitle="Kesitsel bakıştan boylamsal bakışa: panel verisi ve temporal ağ kavramı"
      bgGradient="linear-gradient(135deg, #14b8a6, #0d9488)"
      shadow="0 20px 60px -10px rgba(20, 184, 166, 0.6)"
      icon={<History className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 5. Kesitsel vs boylamsal ───── */
  () => (
    <SlideShell>
      <Eyebrow>Temel ayrım</Eyebrow>
      <H2 className="mb-2">Tek kare mi, film mi?</H2>
      <Sub className="mb-6 max-w-3xl">
        Kesitsel ağ tek bir andır; boylamsal ağ aynı düğümlerin tekrarlı
        ölçümüdür. Aradaki fark sadece veri miktarı değil — sorabileceğin
        soruların türüdür.
      </Sub>
      <CrossSectionVsLongitudinal />
    </SlideShell>
  ),

  /* ───── 6. Panel / dalga verisi ───── */
  () => (
    <SlideShell>
      <Eyebrow>Veri yapısı</Eyebrow>
      <H2 className="mb-2">Dalgalar (waves): aynı oyuncular, farklı anlar</H2>
      <Sub className="mb-6 max-w-3xl">
        Boylamsal verinin tipik biçimi: aynı düğüm kümesi için her zaman
        noktasında bir komşuluk matrisi. Aşağıda 5 kişilik bir sınıf ağının üç
        dalga boyunca evrimi — bazı bağlar kuruluyor, bazıları kopuyor.
      </Sub>
      <PanelSeries />
    </SlideShell>
  ),

  /* ───── 7. Statik vs temporal ağ ───── */
  () => (
    <SlideShell>
      <Eyebrow>İki boylamsal yaklaşım</Eyebrow>
      <H2 className="mb-10">Panel (dalgalı) vs sürekli (temporal) ağ</H2>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Layers className="w-6 h-6 text-[#5eead4]" />
            <h3 className="text-xl font-semibold text-white">Panel ağ</h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Ağ birkaç ayrık <span className="text-[#5eead4] font-semibold">dalgada</span>{" "}
            (t0, t1, t2…) ölçülür. Dalgalar arasında ne olduğunu bilmeyiz, yalnız
            başlangıç ve bitiş durumunu görürüz.
          </p>
          <ul className="text-sm text-gray-400 space-y-1.5">
            <li>· Yıllık anket: &quot;Bu yıl kimlerle çalıştın?&quot;</li>
            <li>· Dönem başı / dönem sonu sınıf ağı</li>
            <li>· Tipik yöntem: SAOM (RSiena), TERGM</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-6 h-6 text-gray-300" />
            <h3 className="text-xl font-semibold text-white">Sürekli / temporal ağ</h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Her bağ bir <span className="text-gray-200 font-semibold">zaman damgası</span>{" "}
            taşır. Olaylar akış halinde gelir; ağ saniye saniye yeniden
            şekillenir.
          </p>
          <ul className="text-sm text-gray-400 space-y-1.5">
            <li>· E-posta / mesaj kayıtları (zaman damgalı)</li>
            <li>· Retweet akışı, çağrı kayıtları</li>
            <li>· Tipik yöntem: olay tabanlı / temporal grafik analizi</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 8. Bölüm 2 ───── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Değişimi Ölçmek"
      subtitle="İki dalga arasında ağ ne kadar değişti? Kararlılık ve devir metrikleri"
      bgGradient="linear-gradient(135deg, #0d9488, #134e4a)"
      shadow="0 20px 60px -10px rgba(13, 148, 136, 0.6)"
      icon={<GitCompare className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 9. Kararlılık metrikleri ───── */
  () => (
    <SlideShell>
      <Eyebrow>Kararlılık & devir</Eyebrow>
      <H2 className="mb-2">İki dalga arasını üç sayıyla özetlemek</H2>
      <Sub className="mb-7 max-w-3xl">
        Bir ağın &quot;ne kadar değiştiğini&quot; göz kararı değil, sayıyla
        ifade ederiz. En sık kullanılan üç ölçü:
      </Sub>
      <StabilityMetrics />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-xs text-gray-500 text-center max-w-3xl mx-auto"
      >
        N11 = iki dalgada da var olan bağ · N10 = sadece ilk dalgada · N01 =
        sadece ikinci dalgada. RSiena, dalgalar arası Jaccard değerinin çok
        düşük olmamasını (genelde 0.3 üzeri) önerir — aksi halde dalga aralığı
        fazla geniştir.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 10. Jaccard hesabı — somut örnek ───── */
  () => (
    <SlideShell>
      <Eyebrow>Adım adım · Jaccard</Eyebrow>
      <H2 className="mb-2">t0 → t1: ağ ne kadar kararlı?</H2>
      <Sub className="mb-6 max-w-3xl">
        Önceki panelden t0 ve t1 dalgalarını alalım. Kenarları sayar, Jaccard
        benzerliğini elle hesaplarız.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-wider text-[#5eead4] mb-4 font-mono">
            Kenar sayımı
          </div>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex justify-between border-b border-white/5 pb-2">
              <span>Her iki dalgada da olan (N11)</span>
              <span className="font-mono text-[#5eead4] font-bold">3</span>
            </li>
            <li className="flex justify-between border-b border-white/5 pb-2">
              <span>Sadece t0&apos;da olan / kopan (N10)</span>
              <span className="font-mono text-[#f87171] font-bold">1</span>
            </li>
            <li className="flex justify-between">
              <span>Sadece t1&apos;de olan / yeni (N01)</span>
              <span className="font-mono text-[#5eead4] font-bold">2</span>
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-wider text-[#5eead4] mb-4 font-mono">
            Hesap
          </div>
          <div className="saa-card rounded-lg p-4 font-mono text-sm text-[#a7f3d0] text-center mb-4">
            J = 3 / (3 + 1 + 2) = 3 / 6 = 0.50
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            0.50, bağların yarısının iki dalgada da korunduğunu söyler — orta
            düzey bir kararlılık. Çok düşük olsaydı (örn. 0.10), dalga aralığını
            daraltmak ya da ölçümü gözden geçirmek gerekirdi.
          </p>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 11. Merkeziliğin zaman serisi ───── */
  () => (
    <SlideShell>
      <Eyebrow>Düğüm düzeyinde değişim</Eyebrow>
      <H2 className="mb-2">Merkezilik artık bir zaman serisi</H2>
      <Sub className="mb-6 max-w-3xl">
        Boylamsal veride her düğümün merkeziliği her dalgada yeniden hesaplanır.
        Böylece &quot;kim yükseliyor, kim sönüyor?&quot; sorusunu izleyebiliriz.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="saa-card rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-4 text-[11px] font-mono uppercase tracking-widest text-gray-500">
          <span className="flex items-center gap-2">
            <LineChart className="w-4 h-4 text-[#5eead4]" /> Derece merkeziliği · 3 dalga
          </span>
          <span>t0 → t1 → t2</span>
        </div>
        <svg viewBox="0 0 720 280" className="w-full h-auto">
          {/* eksenler */}
          <line x1="60" y1="20" x2="60" y2="240" stroke="#334155" strokeWidth="1.5" />
          <line x1="60" y1="240" x2="690" y2="240" stroke="#334155" strokeWidth="1.5" />
          {["t0", "t1", "t2"].map((t, i) => (
            <text
              key={t}
              x={120 + i * 270}
              y={262}
              textAnchor="middle"
              fontSize={12}
              fill="#94a3b8"
              fontFamily="Fira Code, monospace"
            >
              {t}
            </text>
          ))}
          {/* iki düğümün gidişatı: A yükselen, E düşen */}
          {(() => {
            const xs = [120, 390, 660];
            const aY = [200, 120, 60];
            const eY = [90, 150, 230];
            const path = (ys: number[]) =>
              ys.map((y, i) => `${i === 0 ? "M" : "L"} ${xs[i]} ${y}`).join(" ");
            return (
              <>
                <path d={path(aY)} fill="none" stroke="#5eead4" strokeWidth="3" />
                <path d={path(eY)} fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6 5" />
                {xs.map((x, i) => (
                  <g key={`a-${i}`}>
                    <circle cx={x} cy={aY[i]} r={6} fill="#5eead4" />
                    <circle cx={x} cy={eY[i]} r={6} fill="#f59e0b" />
                  </g>
                ))}
                <text x={672} y={56} fontSize={13} fontWeight={700} fill="#5eead4">
                  A ↑
                </text>
                <text x={672} y={236} fontSize={13} fontWeight={700} fill="#f59e0b">
                  E ↓
                </text>
              </>
            );
          })()}
          <text
            x="20"
            y="130"
            fontSize={11}
            fill="#64748b"
            transform="rotate(-90 20 130)"
            fontFamily="Inter, sans-serif"
          >
            derece
          </text>
        </svg>
        <div className="mt-3 text-xs text-gray-400 text-center">
          <span className="text-[#5eead4] font-semibold">A</span> dönem boyunca
          bağ kazanıp merkeze yürüyor;{" "}
          <span className="text-[#f59e0b] font-semibold">E</span> ise bağ
          kaybedip çevreye itiliyor. Tek bir kesit bunu asla göstermezdi.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 12. Bölüm 3 ───── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Değişimi Modellemek"
      subtitle="Seçim mi, etki mi? SAOM (stochastic actor-oriented model) ve RSiena ile pratik"
      bgGradient="linear-gradient(135deg, #0d9488, #115e59)"
      shadow="0 20px 60px -10px rgba(13, 148, 136, 0.6)"
      icon={<Microscope className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 13. Seçim vs etki ───── */
  () => (
    <SlideShell>
      <Eyebrow>Temel ikilem</Eyebrow>
      <H2 className="mb-2">Seçim mi (selection), etki mi (influence)?</H2>
      <Sub className="mb-8 max-w-3xl">
        Benzer kişilerin arkadaş olması iki çok farklı süreçten doğabilir.
        Boylamsal verinin asıl gücü, bu ikisini ayırt edebilmesidir — tek kesit
        bunu yapamaz.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-6 h-6 text-[#5eead4]" />
            <h3 className="text-xl font-semibold text-white">Seçim (selection)</h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            Önce benzerlik, sonra bağ. Kişiler kendilerine{" "}
            <span className="text-[#5eead4]">benzeyenleri arkadaş seçer</span>{" "}
            (homofili). Özellik bağı yönlendirir.
          </p>
          <div className="saa-card rounded-md px-3 py-2 text-xs font-mono text-[#a7f3d0]">
            benzer özellik → yeni bağ
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-6 h-6 text-[#5eead4]" />
            <h3 className="text-xl font-semibold text-white">Etki (influence)</h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            Önce bağ, sonra benzerlik. Bağlı kişiler{" "}
            <span className="text-[#5eead4]">zamanla birbirine benzer</span>;
            davranış arkadaş üzerinden yayılır. Bağ özelliği yönlendirir.
          </p>
          <div className="saa-card rounded-md px-3 py-2 text-xs font-mono text-[#a7f3d0]">
            var olan bağ → benzeşen özellik
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 text-xs text-gray-500 text-center max-w-3xl mx-auto"
      >
        İki dalgada da ölçtüğümüz için: önce mi özellik değişti, önce mi bağ?
        Zaman sırası bu ayrımı mümkün kılar.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 14. SAOM mantığı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Yöntem · SAOM</Eyebrow>
      <H2 className="mb-2">Stochastic Actor-Oriented Model nasıl düşünür?</H2>
      <Sub className="mb-8 max-w-3xl">
        SAOM, iki dalga arasını birçok küçük adıma böler. Her adımda bir aktör,
        bir bağını değiştirme fırsatı yakalar ve kendi &quot;kazancını&quot;
        artıracak seçimi yapar. Model, t0&apos;dan t1&apos;e geçişi en iyi
        açıklayan davranış kurallarını tahmin eder.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            n: "01",
            t: "Mikro adımlar",
            d: "Dalgalar arası dönüşüm, tek tek bağ değişikliklerine ayrıştırılır.",
            icon: Waypoints,
          },
          {
            n: "02",
            t: "Aktör kararı",
            d: "Her adımda bir düğüm bir bağ kurar, kaldırır ya da olduğu gibi bırakır.",
            icon: GitBranch,
          },
          {
            n: "03",
            t: "Etki katsayıları",
            d: "Karşılıklılık, geçişlilik (üçgen), homofili gibi etkiler tahmin edilir.",
            icon: Gauge,
          },
        ].map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="saa-card rounded-xl p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#14b8a6]/15 border border-[#14b8a6]/40">
                <s.icon className="w-5 h-5 text-[#5eead4]" />
              </div>
              <span className="text-[11px] font-mono text-gray-500">#{s.n}</span>
            </div>
            <div className="text-base font-semibold text-white mb-1">{s.t}</div>
            <p className="text-sm text-gray-400 leading-relaxed">{s.d}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 saa-card-teal rounded-xl p-4 text-center text-sm text-[#a7f3d0]"
      >
        Pozitif <span className="font-semibold">karşılıklılık (reciprocity)</span>{" "}
        katsayısı → bağlar karşılık görme eğiliminde; pozitif{" "}
        <span className="font-semibold">geçişlilik (transitivity)</span> →
        &quot;arkadaşımın arkadaşı arkadaşım olur&quot; eğilimi.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 15. RSiena kod ───── */
  () => (
    <SlideShell>
      <Eyebrow>R · RSiena</Eyebrow>
      <H2 className="mb-6">Üç dalga, birkaç satır R</H2>
      <SienaCode />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-5 text-xs text-gray-500 text-center"
      >
        RSiena, sosyal ağ analizinde boylamsal modellemenin standart
        araçlarından biridir. Çıktıda her etki için bir katsayı ve standart hata
        gelir; t-oranı 2&apos;yi aşıyorsa etki anlamlı kabul edilir.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 16. Bu hafta · uygulamalı lab ───── */
  () => {
    const items: Array<{ t: string; d: string; icon: LucideIcon }> = [
      {
        t: "İki dalgalı ağ verisi bul / üret",
        d: "RSiena içindeki s50 örnek verisi veya kendi sınıf anketinden 2 dalga.",
        icon: Database,
      },
      {
        t: "Jaccard ve devir hızını hesapla",
        d: "İki dalga arasında N11/N10/N01 say; Jaccard değerini elle ve kodla doğrula.",
        icon: GitCompare,
      },
      {
        t: "Merkeziliği dalga dalga çıkar",
        d: "Her dalga için derece merkeziliğini hesapla; en çok yükselen 3 düğümü raporla.",
        icon: LineChart,
      },
      {
        t: "Küçük bir SAOM kur",
        d: "RSiena ile recip + transTrip etkili bir model tahmin et; katsayıları yorumla.",
        icon: Microscope,
      },
    ];
    return (
      <SlideShell>
        <Eyebrow>Bu hafta · uygulamalı görev</Eyebrow>
        <H2 className="mb-8">Dört adımda boylamsal analiz</H2>
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

  /* ───── 17. Sıradaki hafta önizleme ───── */
  () => (
    <SlideShell>
      <Eyebrow>Sıradaki Hafta</Eyebrow>
      <H2 className="mb-8">Küçük dünya &amp; ölçeksiz ağlar</H2>
      <Sub className="mb-8 max-w-3xl">
        Bu hafta ağın zaman içinde nasıl değiştiğine baktık. Gelecek hafta ağın
        bütünsel yapısına dönüyoruz: neden çoğu büyük sosyal ağ &quot;küçük
        dünya&quot; gibi davranır ve neden derece dağılımları çok eşitsizdir?
      </Sub>
      <div className="grid md:grid-cols-3 gap-5">
        <FeatureCard
          icon={Share2}
          title="Küçük dünya"
          desc="Kısa ortalama yol + yüksek kümelenme: Watts-Strogatz modeli."
          accent="#14b8a6"
          delay={0.1}
        />
        <FeatureCard
          icon={TrendingUp}
          title="Ölçeksiz ağlar"
          desc="Güç yasası derece dağılımı, hub&apos;lar ve tercihli bağlanma."
          accent="#0d9488"
          delay={0.25}
        />
        <FeatureCard
          icon={Network}
          title="Sağlamlık"
          desc="Rastgele arızaya dayanıklı, hedefli saldırıya kırılgan yapı."
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
          Hazırlık önerisi: Bu haftanın{" "}
          <span className="text-[#5eead4] font-semibold">Jaccard</span> ve{" "}
          <span className="text-[#5eead4] font-semibold">SAOM</span> çıktıları
          tamamlanmış, kısa yorumlarıyla birlikte not edilmiş olsun.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 18. Kapanış ───── */
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
          <History className="w-12 h-12 text-white" />
        </motion.div>
        <H1 className="saa-shimmer-teal">Özet</H1>
        <Sub className="mt-6">
          Ağ artık durağan bir resim değil, zaman içinde okunan bir süreç.{" "}
          <span className="text-[#5eead4]">8. Hafta&apos;da görüşmek üzere.</span>
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-left"
        >
          <div className="saa-card rounded-xl p-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#14b8a6]/15 border border-[#14b8a6]/35 flex items-center justify-center shrink-0">
              <History className="w-5 h-5 text-[#5eead4]" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500">
                Veri
              </div>
              <div className="text-sm font-semibold text-white">
                Panel / dalga verisi
              </div>
            </div>
          </div>
          <div className="saa-card rounded-xl p-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#14b8a6]/15 border border-[#14b8a6]/35 flex items-center justify-center shrink-0">
              <GitCompare className="w-5 h-5 text-[#5eead4]" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500">
                Ölçüm
              </div>
              <div className="text-sm font-semibold text-white">
                Jaccard · devir · Hamming
              </div>
            </div>
          </div>
          <div className="saa-card rounded-xl p-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#14b8a6]/15 border border-[#14b8a6]/35 flex items-center justify-center shrink-0">
              <Microscope className="w-5 h-5 text-[#5eead4]" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500">
                Model
              </div>
              <div className="text-sm font-semibold text-white">SAOM · RSiena</div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left"
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
          BVA 2105 · 7. Hafta · Boylamsal Ağ Analizi
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
