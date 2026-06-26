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
  TrendingUp,
  Brain,
  Lightbulb,
  Database,
  Code2,
  ArrowRight,
  Calendar,
  Link2,
  History,
  GitCompare,
  Sparkles,
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
   TOPIC MOCKUPS — AĞ DİNAMİKLERİ & EVRİM
   ============================================================ */

type EvNode = { id: string; x: number; y: number; r?: number; appears?: number };
type EvEdge = { from: string; to: string; appears: number };

/* Üç anlık görüntüde (t0, t1, t2) büyüyen küçük bir ağ.
   step = kaçıncı snapshot'a kadar gösterileceği. */
function EvolvingGraph({ step }: { step: 0 | 1 | 2 }) {
  const nodes: EvNode[] = [
    { id: "A", x: 130, y: 110, r: 22, appears: 0 },
    { id: "B", x: 330, y: 70, r: 22, appears: 0 },
    { id: "C", x: 250, y: 240, r: 22, appears: 0 },
    { id: "D", x: 470, y: 180, r: 22, appears: 1 },
    { id: "E", x: 110, y: 300, r: 20, appears: 1 },
    { id: "F", x: 540, y: 70, r: 20, appears: 2 },
    { id: "G", x: 420, y: 330, r: 20, appears: 2 },
  ];
  const edges: EvEdge[] = [
    { from: "A", to: "B", appears: 0 },
    { from: "A", to: "C", appears: 0 },
    { from: "B", to: "C", appears: 0 },
    { from: "B", to: "D", appears: 1 },
    { from: "C", to: "E", appears: 1 },
    { from: "C", to: "D", appears: 1 },
    { from: "D", to: "F", appears: 2 },
    { from: "D", to: "G", appears: 2 },
    { from: "C", to: "G", appears: 2 },
  ];
  const find = (id: string) => nodes.find((n) => n.id === id)!;
  const visNodes = nodes.filter((n) => (n.appears ?? 0) <= step);
  const visEdges = edges.filter((e) => e.appears <= step);
  return (
    <svg viewBox="0 0 640 400" className="w-full h-auto">
      {visEdges.map((e, i) => {
        const a = find(e.from);
        const b = find(e.to);
        const isNew = e.appears === step && step > 0;
        return (
          <line
            key={`ee-${e.from}-${e.to}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={isNew ? "#5eead4" : "#475569"}
            strokeWidth={isNew ? 2.4 : 1.4}
            strokeOpacity={isNew ? 0.95 : 0.55}
            className={isNew ? "saa-edge-new" : ""}
            style={{ transitionDelay: `${i * 40}ms` }}
          />
        );
      })}
      {visNodes.map((n) => {
        const isNew = (n.appears ?? 0) === step && step > 0;
        return (
          <g key={n.id}>
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r ?? 20}
              fill={isNew ? "#0d9488" : "#1f2937"}
              stroke={isNew ? "#5eead4" : "#475569"}
              strokeWidth={isNew ? 2.5 : 1.5}
              className={isNew ? "saa-node-pulse" : ""}
            />
            <text
              x={n.x}
              y={n.y + 5}
              textAnchor="middle"
              fontSize={14}
              fontWeight={700}
              fill="#ffffff"
              fontFamily="Inter, sans-serif"
            >
              {n.id}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function EvolutionTimeline() {
  const frames: Array<{ step: 0 | 1 | 2; label: string; n: number; m: number; note: string }> = [
    { step: 0, label: "t0", n: 3, m: 3, note: "Başlangıç çekirdeği — 3 düğüm, kapalı üçgen" },
    { step: 1, label: "t1", n: 5, m: 6, note: "D ve E katıldı; yeni kenarlar mevcut düğümlere bağlandı" },
    { step: 2, label: "t2", n: 7, m: 9, note: "F ve G çoğunlukla D ve C'ye bağlandı — yüksek dereceli düğüm büyüyor" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid md:grid-cols-3 gap-4"
    >
      {frames.map((f, i) => (
        <motion.div
          key={f.label}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: i * 0.12 }}
          className="saa-card rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="saa-time-badge px-2.5 py-1 text-xs">{f.label}</span>
            <span className="text-[11px] font-mono text-gray-500">
              n={f.n} · m={f.m}
            </span>
          </div>
          <div className="rounded-lg bg-[#070b0a] p-2">
            <EvolvingGraph step={f.step} />
          </div>
          <p className="text-[11px] text-gray-400 leading-snug mt-3">{f.note}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

function MechanismTable() {
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
            <th style={{ width: "20%" }}>Mekanizma</th>
            <th>Ne der?</th>
            <th>Sosyal karşılığı</th>
            <th>İz bıraktığı yapı</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="saa-row-head">Üçlü kapanma</td>
            <td>Ortak arkadaşı olan iki kişi zamanla tanışır</td>
            <td>&ldquo;Arkadaşımın arkadaşı arkadaşımdır&rdquo;</td>
            <td>Yüksek kümelenme katsayısı</td>
          </tr>
          <tr>
            <td className="saa-row-head">Tercihli bağlanma</td>
            <td>Yeni düğüm, derecesi yüksek düğüme bağlanmaya meyillidir</td>
            <td>Popüler hesap daha hızlı takipçi kazanır</td>
            <td>Ölçeksiz derece dağılımı (hub&apos;lar)</td>
          </tr>
          <tr>
            <td className="saa-row-head">Homofili</td>
            <td>Benzer düğümler birbirine bağlanma eğilimindedir</td>
            <td>Benzer ilgi / şehir / dil gruplaşır</td>
            <td>Topluluk yapısı (community)</td>
          </tr>
          <tr>
            <td className="saa-row-head">Kopma / silinme</td>
            <td>Kenarlar ve düğümler zamanla kaybolabilir</td>
            <td>Takipten çıkma, hesap kapatma</td>
            <td>Küçülen bileşenler, seyrelme</td>
          </tr>
        </tbody>
      </table>
    </motion.div>
  );
}

function DegreeDistribution() {
  // Sağa çarpık (power-law benzeri) derece dağılımı — birkaç hub, çok sayıda düşük dereceli düğüm.
  const bars = [
    { k: "1", h: 96 },
    { k: "2", h: 72 },
    { k: "3", h: 50 },
    { k: "4", h: 34 },
    { k: "5", h: 22 },
    { k: "6", h: 14 },
    { k: "7", h: 9 },
    { k: "8+", h: 5 },
  ];
  const max = 96;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="saa-card rounded-xl p-5"
    >
      <svg viewBox="0 0 560 300" className="w-full h-auto">
        {/* eksenler */}
        <line x1="60" y1="250" x2="540" y2="250" stroke="#475569" strokeWidth="1.5" />
        <line x1="60" y1="30" x2="60" y2="250" stroke="#475569" strokeWidth="1.5" />
        {bars.map((b, i) => {
          const bw = 48;
          const gap = 12;
          const x = 78 + i * (bw + gap);
          const barH = (b.h / max) * 200;
          const y = 250 - barH;
          const isHub = i >= 5;
          return (
            <g key={b.k}>
              <rect
                x={x}
                y={y}
                width={bw}
                height={barH}
                rx={4}
                fill={isHub ? "#0d9488" : "#14b8a6"}
                fillOpacity={isHub ? 0.55 : 0.85}
                stroke={isHub ? "#5eead4" : "#14b8a6"}
                strokeOpacity={0.6}
              />
              <text x={x + bw / 2} y={268} textAnchor="middle" fontSize={12} fill="#9ca3af" fontFamily="Inter, sans-serif">
                {b.k}
              </text>
            </g>
          );
        })}
        <text x="300" y="292" textAnchor="middle" fontSize={12} fill="#6b7280" fontFamily="Inter, sans-serif">
          k = düğüm derecesi
        </text>
        <text
          x="22"
          y="140"
          textAnchor="middle"
          fontSize={12}
          fill="#6b7280"
          fontFamily="Inter, sans-serif"
          transform="rotate(-90 22 140)"
        >
          düğüm sayısı P(k)
        </text>
        {/* hub işareti */}
        <text x="470" y="60" textAnchor="middle" fontSize={11} fill="#5eead4" fontWeight={700} fontFamily="Inter, sans-serif">
          ↙ az sayıda hub
        </text>
      </svg>
      <div className="mt-1 text-xs text-gray-400 text-center">
        Tercihli bağlanma ile ortaya çıkan{" "}
        <span className="text-[#5eead4] font-semibold">ağır kuyruklu (power-law benzeri)</span>{" "}
        derece dağılımı.
      </div>
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
          <span>ag_evrimi.py · Python 3.12 · NetworkX 3.3</span>
        </div>
      </div>
      <pre className="saa-code p-6 overflow-x-auto m-0">
        <code>
          <span className="saa-code-cmt"># 1) Tercihli bağlanma ile büyüyen ağ üret (Barabási–Albert)</span>
          {"\n"}
          <span className="saa-code-kw">import</span>{" "}
          <span className="saa-code-fn">networkx</span>{" "}
          <span className="saa-code-kw">as</span>{" "}
          <span className="saa-code-fn">nx</span>
          {"\n"}
          {"\n"}
          BA = nx.<span className="saa-code-fn">barabasi_albert_graph</span>(
          <span className="saa-code-num">500</span>,{" "}
          <span className="saa-code-num">2</span>)
          <span className="saa-code-cmt"># 500 düğüm, her yeni düğüm 2 kenarla katılır</span>
          {"\n"}
          {"\n"}
          <span className="saa-code-cmt"># 2) Zaman içinde değişimi snapshot&apos;larla karşılaştır</span>
          {"\n"}
          G_t0 = nx.<span className="saa-code-fn">read_graphml</span>(
          <span className="saa-code-str">&quot;ag_ocak.graphml&quot;</span>)
          {"\n"}
          G_t1 = nx.<span className="saa-code-fn">read_graphml</span>(
          <span className="saa-code-str">&quot;ag_subat.graphml&quot;</span>)
          {"\n"}
          {"\n"}
          yeni = <span className="saa-code-fn">set</span>(G_t1.edges()) -{" "}
          <span className="saa-code-fn">set</span>(G_t0.edges())
          {"\n"}
          <span className="saa-code-fn">print</span>(
          <span className="saa-code-str">&quot;Yeni kenar:&quot;</span>,{" "}
          <span className="saa-code-fn">len</span>(yeni))
          {"\n"}
          {"\n"}
          <span className="saa-code-cmt"># 3) Bağlantı tahmini — kimler bağlanacak? (Jaccard)</span>
          {"\n"}
          skor = nx.<span className="saa-code-fn">jaccard_coefficient</span>(G_t0)
          {"\n"}
          top = <span className="saa-code-fn">sorted</span>(skor, key=
          <span className="saa-code-kw">lambda</span> x: -x[
          <span className="saa-code-num">2</span>])[:
          <span className="saa-code-num">5</span>]
          {"\n"}
          <span className="saa-code-fn">print</span>(
          <span className="saa-code-str">&quot;En olası 5 yeni bağ:&quot;</span>, top)
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
        <Eyebrow>BVA 2105 · 10. Hafta — Sosyal Ağ Analizi</Eyebrow>
        <H1 className="saa-shimmer">
          Ağ Dinamikleri
          <br />
          ve Evrim
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Ağlar fotoğraf değil, filmdir. Düğüm ve kenarlar zamanla doğar, büyür ve
          kaybolur — peki bu değişim nasıl ölçülür?
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex items-center justify-center gap-3 flex-wrap"
        >
          {[
            { l: "t0", s: "başlangıç" },
            { l: "t1", s: "büyüme" },
            { l: "t2", s: "olgunlaşma" },
          ].map((t, i) => (
            <div key={t.l} className="flex items-center gap-3">
              <div className="saa-card rounded-xl px-5 py-3 flex items-center gap-3">
                <span className="saa-time-badge px-2.5 py-1 text-xs">{t.l}</span>
                <span className="text-sm text-gray-300">{t.s}</span>
              </div>
              {i < 2 && <ArrowRight className="w-5 h-5 text-[#5eead4]" />}
            </div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 inline-flex items-center gap-2 text-xs font-mono text-gray-500"
        >
          <Calendar className="w-3.5 h-3.5" />
          Cuma · 09:55 — 11:35 · Temporal ağlar, büyüme modelleri ve bağlantı tahmini
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 2 — Geçen haftadan köprü / bu haftanın hedefi
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 9. haftadan 10. haftaya</Eyebrow>
      <H2>Şimdiye kadar hep tek bir an&apos;ı ölçtük</H2>
      <Sub className="mt-3 max-w-3xl">
        Merkezilik, topluluk tespiti, ölçeksiz ağlar… hepsini ağın{" "}
        <span className="text-[#5eead4]">tek bir fotoğrafı</span> üzerinde hesapladık.
        Bu hafta zamanı ekliyoruz: aynı ağı farklı anlarda inceleyip{" "}
        <span className="text-[#5eead4]">nasıl değiştiğini</span> sorguluyoruz.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-gray-300">
            <History className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Şimdiye kadar — statik ağ
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-400">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-gray-500 shrink-0" />
              Tek G = (V, E) üzerinde ölçüm
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-gray-500 shrink-0" />
              &ldquo;Şu an en merkezi kim?&rdquo;
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-gray-500 shrink-0" />
              Zaman bilgisi yok
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
            <Activity className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Bu hafta — dinamik ağ
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] shrink-0" />
              G(t0), G(t1), G(t2) … zaman serisi
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] shrink-0" />
              &ldquo;Kim bağlanacak, kim kopacak?&rdquo;
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] shrink-0" />
              Büyüme mekanizmaları ve tahmin
            </li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 3 — Dersin akışı
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: zaman → mekanizma → ölçüm</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce ağa zaman boyutunu nasıl ekleyeceğimizi tanımlıyoruz; sonra ağı büyüten
        mekanizmaları görüyoruz; en son değişimi sayısal olarak ölçüp tahmin ediyoruz.
      </Sub>
      <div className="grid md:grid-cols-3 gap-4 mt-10">
        {[
          {
            range: "1",
            title: "Temporal Ağ",
            items: ["Statik vs dinamik", "Snapshot / zaman penceresi", "Zaman damgalı kenar"],
            icon: Clock,
            accent: "#14b8a6",
          },
          {
            range: "2",
            title: "Büyüme Mekanizmaları",
            items: ["Üçlü kapanma", "Tercihli bağlanma", "Homofili & kopma"],
            icon: GitBranch,
            accent: "#0d9488",
          },
          {
            range: "3",
            title: "Değişimi Ölçmek",
            items: ["Snapshot karşılaştırma", "Bağlantı tahmini", "NetworkX ile pratik"],
            icon: TrendingUp,
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

  /* ─────────────────  1. TEMPORAL AĞ  ───────────────── */

  // 4 — Section divider 1/3
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Temporal Ağ"
      subtitle="Ağa zaman boyutunu eklemek: snapshot dizisi ve zaman damgalı kenarlar"
      bgGradient="linear-gradient(135deg, #14b8a6, #0d9488)"
      shadow="0 20px 60px -10px rgba(20, 184, 166, 0.6)"
      icon={<Clock className="w-16 h-16 text-white" />}
    />
  ),

  // 5 — Statik vs Dinamik
  () => (
    <SlideShell>
      <Eyebrow>İki bakış açısı</Eyebrow>
      <H2 className="mb-8">Statik fotoğraf vs. dinamik film</H2>
      <div className="grid md:grid-cols-2 gap-5 mb-6">
        <FeatureCard
          icon={History}
          title="Statik ağ — G = (V, E)"
          desc="Tek bir an. Zaman bilgisi yoktur; tüm kenarlar aynı anda varmış gibi ele alınır. Hızlı ve basit ama değişimi gizler."
          accent="#64748b"
          delay={0.1}
        />
        <FeatureCard
          icon={Activity}
          title="Dinamik ağ — G(t)"
          desc="Aynı ağın zamanla değişen hali. Düğüm/kenar ekleme-silme zamanı kayıtlıdır; büyüme ve çözülme görünür hale gelir."
          accent="#14b8a6"
          delay={0.25}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="saa-card-teal rounded-xl p-5 text-center font-mono text-sm text-[#a7f3d0]"
      >
        G(t) = (V(t), E(t)) &nbsp;·&nbsp; her kenara (u, v, t) zaman damgası eklenir
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-5 text-xs text-gray-500 text-center max-w-3xl mx-auto"
      >
        Statik ağda &ldquo;A ve B arkadaş&rdquo; bilgisini görürüz; dinamik ağda{" "}
        <span className="text-[#5eead4]">ne zaman</span> arkadaş olduklarını da biliriz.
      </motion.div>
    </SlideShell>
  ),

  // 6 — Snapshot dizisi (büyüyen ağ)
  () => (
    <SlideShell>
      <Eyebrow>Snapshot dizisi</Eyebrow>
      <H2 className="mb-2">Aynı ağ, üç farklı anda</H2>
      <Sub className="mb-6 max-w-3xl">
        Sürekli değişen ağı incelemenin en yaygın yolu, onu eşit aralıklı{" "}
        <span className="text-[#5eead4]">anlık görüntülere (snapshot)</span> bölmek.
        Aşağıda yeni gelen düğüm ve kenarlar her adımda vurgulanıyor.
      </Sub>
      <EvolutionTimeline />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-5 text-center text-xs text-gray-500"
      >
        Pencere çok dar olursa gürültü, çok geniş olursa değişim kaybolur — pencere
        seçimi analiz kararıdır.
      </motion.div>
    </SlideShell>
  ),

  // 7 — Zaman damgalı kenar listesi
  () => (
    <SlideShell>
      <Eyebrow>Veri tarafı · zaman damgalı kenar</Eyebrow>
      <H2 className="mb-2">Dinamik ağı bir tablo nasıl saklar?</H2>
      <Sub className="max-w-3xl mb-6">
        Temporal ağ pratikte çoğu zaman üç-sütunlu (hatta dört) bir kenar listesidir:
        kim, kiminle, ne zaman — istenirse ağırlık. Bu satırlar zaman penceresine göre
        filtrelenip her snapshot oluşturulur.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="saa-card rounded-xl p-5 overflow-x-auto"
      >
        <table className="saa-table">
          <thead>
            <tr>
              <th>source</th>
              <th>target</th>
              <th>timestamp</th>
              <th>etkileşim</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["ayse", "mehmet", "2026-01-04 09:12", "mesaj"],
              ["ayse", "deniz", "2026-01-04 18:40", "yorum"],
              ["mehmet", "deniz", "2026-01-18 11:05", "beğeni"],
              ["can", "mehmet", "2026-02-02 21:33", "retweet"],
              ["can", "elif", "2026-02-15 08:20", "mesaj"],
            ].map((r) => (
              <tr key={`${r[0]}-${r[1]}-${r[2]}`}>
                <td className="font-mono text-[#5eead4]">{r[0]}</td>
                <td className="font-mono text-[#5eead4]">{r[1]}</td>
                <td className="font-mono text-gray-300">{r[2]}</td>
                <td className="text-gray-400">{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 text-xs text-gray-500 text-center"
      >
        Ocak satırları → G(t0), Şubat satırları → G(t1). Sıralama (zaman yönü) ağda
        bilginin akış yönünü de belirler.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  2. BÜYÜME MEKANİZMALARI  ───────────────── */

  // 8 — Section divider 2/3
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Büyüme Mekanizmaları"
      subtitle="Ağlar rastgele büyümez. Birkaç basit kural, gerçek sosyal ağların yapısını üretir."
      bgGradient="linear-gradient(135deg, #0d9488, #134e4a)"
      shadow="0 20px 60px -10px rgba(13, 148, 136, 0.6)"
      icon={<GitBranch className="w-16 h-16 text-white" />}
    />
  ),

  // 9 — Üçlü kapanma
  () => (
    <SlideShell>
      <Eyebrow>Mekanizma 1 — Üçlü Kapanma (Triadic Closure)</Eyebrow>
      <H2 className="mb-4">Arkadaşımın arkadaşı, arkadaşım olur</H2>
      <Sub className="mb-8 max-w-3xl">
        İki kişinin ortak bir arkadaşı varsa, zamanla onların da birbirine bağlanma
        olasılığı yüksektir. Sosyal ağlardaki üçgenlerin (ve yüksek kümelenmenin) ana
        kaynağı budur.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="saa-card rounded-xl p-5"
        >
          <div className="text-[11px] uppercase tracking-wider text-gray-500 mb-2 text-center">
            Önce — açık üçlü
          </div>
          <svg viewBox="0 0 320 220" className="w-full h-auto">
            <line x1="60" y1="170" x2="160" y2="50" stroke="#475569" strokeWidth="2" />
            <line x1="160" y1="50" x2="260" y2="170" stroke="#475569" strokeWidth="2" />
            {[
              { x: 60, y: 170, l: "A" },
              { x: 160, y: 50, l: "C" },
              { x: 260, y: 170, l: "B" },
            ].map((n) => (
              <g key={n.l}>
                <circle cx={n.x} cy={n.y} r={20} fill="#1f2937" stroke="#475569" strokeWidth="2" />
                <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill="#fff">
                  {n.l}
                </text>
              </g>
            ))}
            <text x="160" y="205" textAnchor="middle" fontSize={11} fill="#94a3b8">
              A — C — B (A ile B bağsız)
            </text>
          </svg>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="saa-card-teal rounded-xl p-5"
        >
          <div className="text-[11px] uppercase tracking-wider text-[#5eead4] mb-2 text-center">
            Sonra — üçgen kapandı
          </div>
          <svg viewBox="0 0 320 220" className="w-full h-auto">
            <line x1="60" y1="170" x2="160" y2="50" stroke="#475569" strokeWidth="2" />
            <line x1="160" y1="50" x2="260" y2="170" stroke="#475569" strokeWidth="2" />
            <line
              x1="60"
              y1="170"
              x2="260"
              y2="170"
              stroke="#5eead4"
              strokeWidth="2.5"
              className="saa-edge-new"
            />
            {[
              { x: 60, y: 170, l: "A" },
              { x: 160, y: 50, l: "C" },
              { x: 260, y: 170, l: "B" },
            ].map((n) => (
              <g key={n.l}>
                <circle cx={n.x} cy={n.y} r={20} fill="#0d9488" stroke="#5eead4" strokeWidth="2" />
                <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill="#fff">
                  {n.l}
                </text>
              </g>
            ))}
            <text x="160" y="205" textAnchor="middle" fontSize={11} fill="#5eead4">
              A — B yeni kenarı oluştu
            </text>
          </svg>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 10 — Tercihli bağlanma
  () => (
    <SlideShell>
      <Eyebrow>Mekanizma 2 — Tercihli Bağlanma (Preferential Attachment)</Eyebrow>
      <H2 className="mb-4">Zengin daha da zenginleşir</H2>
      <Sub className="mb-8 max-w-3xl">
        Ağa yeni katılan bir düğüm, rastgele değil; derecesi zaten yüksek olan düğümlere
        bağlanma eğilimindedir. Barabási–Albert modelinin temel kuralı budur.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-wider text-[#5eead4] mb-3">Kural</div>
          <p className="text-base text-gray-200 leading-relaxed mb-5">
            Yeni düğümün i&apos;ye bağlanma olasılığı, i&apos;nin derecesiyle{" "}
            <span className="text-[#5eead4]">orantılıdır</span>.
          </p>
          <div className="saa-card rounded-lg p-4 font-mono text-sm text-[#a7f3d0] text-center">
            P(i) = k<sub>i</sub> / Σ<sub>j</sub> k<sub>j</sub>
          </div>
          <div className="mt-4 text-xs text-gray-500">
            Sonuç: ağır kuyruklu (ölçeksiz benzeri) derece dağılımı ve birkaç büyük hub.
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
              <Users className="w-5 h-5 text-[#5eead4] mt-0.5 shrink-0" />
              <span>
                Çok takipçili hesap, görünürlüğü yüksek olduğu için daha hızlı takipçi
                kazanır.
              </span>
            </li>
            <li className="flex gap-3">
              <Link2 className="w-5 h-5 text-[#5eead4] mt-0.5 shrink-0" />
              <span>
                Çok atıf alan bilimsel makale, yeni yazarlarca daha kolay bulunup tekrar
                atıf alır.
              </span>
            </li>
            <li className="flex gap-3">
              <Lightbulb className="w-5 h-5 text-[#5eead4] mt-0.5 shrink-0" />
              <span>
                Tek başına popülerlik her şeyi açıklamaz — yenilik, kalite ve homofili de
                rol oynar.
              </span>
            </li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 11 — Derece dağılımı grafiği
  () => (
    <SlideShell>
      <Eyebrow>Mekanizmanın izi</Eyebrow>
      <H2 className="mb-2">Tercihli bağlanma neye benzer bir dağılım üretir?</H2>
      <Sub className="max-w-3xl mb-6">
        Tercihli bağlanmayla büyüyen bir ağda çoğu düğümün derecesi düşük, çok az
        düğümün ise çok yüksektir. Bu &ldquo;ağır kuyruk&rdquo; ölçeksiz ağların imzasıdır.
      </Sub>
      <DegreeDistribution />
    </SlideShell>
  ),

  // 12 — Mekanizma tablosu (toparlama)
  () => (
    <SlideShell>
      <Eyebrow>Toparlayalım</Eyebrow>
      <H2 className="mb-2">Dört mekanizma yan yana</H2>
      <Sub className="mb-6 max-w-3xl">
        Gerçek bir sosyal ağ aynı anda birden çok mekanizmanın sonucudur. Her biri ağda
        farklı bir yapısal iz bırakır.
      </Sub>
      <MechanismTable />
    </SlideShell>
  ),

  /* ─────────────────  3. DEĞİŞİMİ ÖLÇMEK  ───────────────── */

  // 13 — Section divider 3/3
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Değişimi Ölçmek"
      subtitle="Snapshot karşılaştırma, bağlantı tahmini ve NetworkX ile pratik"
      bgGradient="linear-gradient(135deg, #0d9488, #115e59)"
      shadow="0 20px 60px -10px rgba(13, 148, 136, 0.6)"
      icon={<TrendingUp className="w-16 h-16 text-white" />}
    />
  ),

  // 14 — Snapshot karşılaştırma metrikleri
  () => (
    <SlideShell>
      <Eyebrow>İki snapshot arasındaki fark</Eyebrow>
      <H2 className="mb-8">G(t0) ile G(t1) ne kadar değişti?</H2>
      <div className="grid md:grid-cols-3 gap-4">
        <FeatureCard
          icon={GitCompare}
          title="Kenar dönüşümü (turnover)"
          desc="Kaç kenar eklendi, kaçı silindi? Eklenen ve silinen kenar kümeleri ağın oynaklığını gösterir."
          accent="#14b8a6"
          delay={0.1}
        />
        <FeatureCard
          icon={Users}
          title="Büyüme & kalıcılık"
          desc="Düğüm sayısı artıyor mu, hangi düğümler her snapshot'ta kalıyor (çekirdek), hangileri geçici?"
          accent="#0d9488"
          delay={0.2}
        />
        <FeatureCard
          icon={Activity}
          title="Yapısal metrik serisi"
          desc="Yoğunluk, ortalama derece, kümelenme katsayısı zamana göre çizilir — eğilim okunur."
          accent="#5eead4"
          delay={0.3}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 saa-card-teal rounded-xl p-5 text-center"
      >
        <div className="text-sm text-gray-300">
          Pratik kural:{" "}
          <span className="text-[#5eead4] font-semibold">tek bir sayı değil bir seri</span>{" "}
          çizin. Bir metriğin t0&apos;dan t2&apos;ye eğilimi, tek bir snapshot&apos;tan çok daha
          fazlasını anlatır.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 15 — Bağlantı tahmini
  () => (
    <SlideShell>
      <Eyebrow>Geleceğe bakmak · Link Prediction</Eyebrow>
      <H2 className="mb-2">Sıradaki kenar nerede oluşacak?</H2>
      <Sub className="max-w-3xl mb-6">
        Bağlantı tahmini, henüz bağlı olmayan iki düğümün gelecekte bağlanma olasılığını
        skorlar. Öneri sistemlerinin (&ldquo;tanıyor olabileceğin kişiler&rdquo;) temelidir.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="saa-card rounded-xl p-5 overflow-x-auto"
      >
        <table className="saa-table">
          <thead>
            <tr>
              <th style={{ width: "22%" }}>Skor</th>
              <th>Sezgi</th>
              <th>Formül (özet)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="saa-row-head">Ortak komşu</td>
              <td>Ne kadar çok ortak arkadaş, o kadar olası</td>
              <td className="font-mono">|Γ(u) ∩ Γ(v)|</td>
            </tr>
            <tr>
              <td className="saa-row-head">Jaccard</td>
              <td>Ortak komşuyu, toplam komşuya oranlar</td>
              <td className="font-mono">|Γ(u) ∩ Γ(v)| / |Γ(u) ∪ Γ(v)|</td>
            </tr>
            <tr>
              <td className="saa-row-head">Adamic–Adar</td>
              <td>Az dereceli ortak komşuya daha çok ağırlık verir</td>
              <td className="font-mono">Σ 1 / log k(w)</td>
            </tr>
            <tr>
              <td className="saa-row-head">Tercihli bağlanma</td>
              <td>İki düğüm de yüksek dereceliyse olası</td>
              <td className="font-mono">k(u) · k(v)</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 text-xs text-gray-500 text-center"
      >
        Değerlendirme: G(t0) üzerinde skorla, G(t1)&apos;de gerçekten oluşan kenarlarla
        karşılaştır (AUC / precision@k).
      </motion.div>
    </SlideShell>
  ),

  // 16 — NetworkX kod örneği
  () => (
    <SlideShell>
      <Eyebrow>Python · NetworkX</Eyebrow>
      <H2 className="mb-6">Üret, karşılaştır, tahmin et</H2>
      <CodeBlock />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-5 text-xs text-gray-500 text-center"
      >
        barabasi_albert_graph ile sentetik büyüme; set farkıyla yeni kenarlar;
        jaccard_coefficient ile bağlantı tahmini — üçü de tek kütüphanede.
      </motion.div>
    </SlideShell>
  ),

  // 17 — Bu hafta yapılacaklar (uygulamalı)
  () => {
    const items: Array<{ t: string; d: string; icon: LucideIcon }> = [
      {
        t: "İki snapshot hazırla",
        d: "Bir temporal kenar listesini iki zaman penceresine böl → G(t0), G(t1). NetworkX'e yükle.",
        icon: Database,
      },
      {
        t: "Değişimi say",
        d: "Eklenen ve silinen kenarları set farkıyla bul; düğüm/kenar/yoğunluk değişimini raporla.",
        icon: GitCompare,
      },
      {
        t: "Bağlantı tahmini çalıştır",
        d: "G(t0) üzerinde jaccard_coefficient ile en olası 10 yeni bağı skorla.",
        icon: Link2,
      },
      {
        t: "Tahmini doğrula",
        d: "Tahmin edilen bağların kaçı G(t1)'de gerçekten oluşmuş? precision@10 hesapla.",
        icon: Check,
      },
    ];
    return (
      <SlideShell>
        <Eyebrow>Bu hafta · uygulamalı görev</Eyebrow>
        <H2 className="mb-8">Yap-bitir listesi</H2>
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

  // 18 — Sıradaki hafta + kapanış
  () => (
    <SlideShell>
      <div className="text-center max-w-4xl mx-auto">
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
        <Eyebrow>10. hafta tamamlandı · sıradaki: Etki Maksimizasyonu</Eyebrow>
        <H1 className="saa-shimmer-teal">Kimden başlatmalı?</H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta ağın nasıl büyüdüğünü ve değiştiğini gördük. 11. hafta bunu kullanıma
          döküyoruz: bir mesajı en geniş kitleye yaymak için hangi düğümlerden
          başlamalı?
        </Sub>
        <div className="grid md:grid-cols-3 gap-4 mt-10 text-left">
          <FeatureCard
            icon={Target}
            title="Tohum seçimi"
            desc="Yayılımı başlatacak en etkili k düğümü seçme problemi."
            accent="#14b8a6"
            delay={0.1}
          />
          <FeatureCard
            icon={Network}
            title="Yayılım modeli"
            desc="Bağımsız basamak (IC) ve doğrusal eşik (LT) modelleri."
            accent="#0d9488"
            delay={0.2}
          />
          <FeatureCard
            icon={Brain}
            title="Açgözlü algoritma"
            desc="Submodülerlik ve yaklaşık çözüm garantisi."
            accent="#5eead4"
            delay={0.3}
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-10 inline-flex items-center gap-2 text-xs font-mono text-gray-500"
        >
          <Sparkles className="w-3.5 h-3.5" />
          BVA 2105 · Sosyal Ağ Analizi · 2026 Bahar — İki snapshot&apos;lı veri setini hazır getirin
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
          BVA 2105 · 10. Hafta · Ağ Dinamikleri ve Evrim
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
