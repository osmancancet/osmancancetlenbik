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
  Dices,
  Sigma,
  Target,
  Triangle,
  Scale,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  Repeat,
  Code2,
  Calendar,
  MapPin,
  Mail,
  Clock,
  Layers,
  FlaskConical,
  AlertTriangle,
  TrendingUp,
  Users,
  Database,
  BarChart3,
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
   TOPIC MOCKUPS (ERGM)
   ============================================================ */

/* İki ağ yan yana: gözlenen ağ vs. rastgele Erdős–Rényi ağ.
   ERGM'in temel sorusunu görselleştirir: gözlenen ağdaki yapı
   (kümeleme/üçgenler) şanstan mı kaynaklanıyor? */
function ObservedVsRandom() {
  type N = { id: string; x: number; y: number };
  const layout: N[] = [
    { id: "A", x: 90, y: 70 },
    { id: "B", x: 230, y: 50 },
    { id: "C", x: 300, y: 160 },
    { id: "D", x: 190, y: 230 },
    { id: "E", x: 70, y: 190 },
    { id: "F", x: 330, y: 60 },
  ];
  // Gözlenen ağ: yoğun kümeli (üçgenler içeren) topluluk
  const observed: [string, string][] = [
    ["A", "B"],
    ["A", "E"],
    ["B", "C"],
    ["B", "F"],
    ["C", "D"],
    ["C", "F"],
    ["D", "E"],
    ["A", "D"],
    ["B", "D"],
  ];
  // Rastgele ağ: aynı düğüm sayısı, benzer kenar sayısı, kümelenme yok
  const random: [string, string][] = [
    ["A", "C"],
    ["A", "F"],
    ["B", "E"],
    ["B", "D"],
    ["C", "E"],
    ["D", "F"],
    ["E", "F"],
    ["A", "D"],
    ["C", "D"],
  ];
  const find = (l: N[], id: string) => l.find((n) => n.id === id)!;

  const Mini = ({
    edges,
    accent,
  }: {
    edges: [string, string][];
    accent: string;
  }) => (
    <svg viewBox="0 0 400 280" className="w-full h-auto">
      {edges.map(([a, b], i) => {
        const na = find(layout, a);
        const nb = find(layout, b);
        return (
          <line
            key={`${a}-${b}-${i}`}
            x1={na.x}
            y1={na.y}
            x2={nb.x}
            y2={nb.y}
            stroke={accent}
            strokeWidth={1.6}
            strokeOpacity={0.6}
          />
        );
      })}
      {layout.map((n) => (
        <g key={n.id}>
          <circle
            cx={n.x}
            cy={n.y}
            r={16}
            fill="#1f2937"
            stroke={accent}
            strokeWidth={2}
          />
          <text
            x={n.x}
            y={n.y + 5}
            textAnchor="middle"
            fontSize={12}
            fontWeight={700}
            fill="#ffffff"
            fontFamily="Inter, sans-serif"
          >
            {n.id}
          </text>
        </g>
      ))}
    </svg>
  );

  return (
    <div className="grid md:grid-cols-2 gap-5">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="saa-card-teal rounded-xl p-5"
      >
        <div className="text-[10px] uppercase tracking-wider text-[#5eead4] mb-1 text-center font-semibold">
          Gözlenen ağ · 6 düğüm · 9 kenar
        </div>
        <Mini edges={observed} accent="#14b8a6" />
        <div className="text-xs text-gray-300 text-center mt-1">
          Çok sayıda <span className="text-[#5eead4] font-semibold">üçgen</span> —
          arkadaşımın arkadaşı benim de arkadaşım.
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="saa-card rounded-xl p-5"
      >
        <div className="text-[10px] uppercase tracking-wider text-gray-400 mb-1 text-center font-semibold">
          Rastgele ağ · 6 düğüm · 9 kenar
        </div>
        <Mini edges={random} accent="#64748b" />
        <div className="text-xs text-gray-400 text-center mt-1">
          Aynı yoğunluk, ama kümelenme yok — kenarlar{" "}
          <span className="text-gray-200 font-semibold">bağımsız</span> atılmış.
        </div>
      </motion.div>
    </div>
  );
}

/* Ağ istatistiklerini (motif) gösteren küçük SVG'ler */
function MotifEdge() {
  return (
    <svg viewBox="0 0 120 80" className="w-full h-auto">
      <line x1="30" y1="40" x2="90" y2="40" stroke="#14b8a6" strokeWidth="3" />
      <circle cx="30" cy="40" r="11" fill="#0d9488" stroke="#5eead4" strokeWidth="2" />
      <circle cx="90" cy="40" r="11" fill="#0d9488" stroke="#5eead4" strokeWidth="2" />
    </svg>
  );
}

function MotifTwoStar() {
  return (
    <svg viewBox="0 0 120 80" className="w-full h-auto">
      <line x1="20" y1="60" x2="60" y2="22" stroke="#14b8a6" strokeWidth="3" />
      <line x1="100" y1="60" x2="60" y2="22" stroke="#14b8a6" strokeWidth="3" />
      <circle cx="20" cy="60" r="10" fill="#1f2937" stroke="#5eead4" strokeWidth="2" />
      <circle cx="60" cy="22" r="11" fill="#0d9488" stroke="#5eead4" strokeWidth="2" />
      <circle cx="100" cy="60" r="10" fill="#1f2937" stroke="#5eead4" strokeWidth="2" />
    </svg>
  );
}

function MotifTriangle() {
  return (
    <svg viewBox="0 0 120 80" className="w-full h-auto">
      <polygon
        points="60,18 24,62 96,62"
        fill="none"
        stroke="#14b8a6"
        strokeWidth="3"
      />
      <circle cx="60" cy="18" r="10" fill="#0d9488" stroke="#5eead4" strokeWidth="2" />
      <circle cx="24" cy="62" r="10" fill="#0d9488" stroke="#5eead4" strokeWidth="2" />
      <circle cx="96" cy="62" r="10" fill="#0d9488" stroke="#5eead4" strokeWidth="2" />
    </svg>
  );
}

/* ERGM aile karşılaştırma tablosu */
function ModelFamilyTable() {
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
            <th style={{ width: "20%" }}>Model</th>
            <th>Temel varsayım</th>
            <th>Yakalayabildiği yapı</th>
            <th>Sınırı</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="saa-row-head">Erdős–Rényi G(n, p)</td>
            <td>Her kenar bağımsız, sabit p olasılıkla var.</td>
            <td>Sadece yoğunluk (ortalama derece).</td>
            <td>Kümelenme ve geçişlilik üretmez.</td>
          </tr>
          <tr>
            <td className="saa-row-head">Yapılandırma modeli</td>
            <td>Derece dizisi sabit, kalanı rastgele.</td>
            <td>Derece dağılımı (ölçeksizlik).</td>
            <td>Üçgen / homofili açıklayamaz.</td>
          </tr>
          <tr>
            <td className="saa-row-head">
              ERGM (p<sup>*</sup>)
            </td>
            <td>
              Olasılık, seçilen istatistiklerin (kenar, üçgen, homofili)
              üstel fonksiyonu.
            </td>
            <td>
              Geçişlilik, karşılıklılık, homofili — aynı anda.
            </td>
            <td>Kestirim pahalı; dejenerasyon riski.</td>
          </tr>
        </tbody>
      </table>
    </motion.div>
  );
}

/* R / statnet kod mockup'ı — ergm() çağrısı */
function ErgmCodeBlock() {
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
          <span>florentine_ergm.R · R 4.4 · statnet / ergm 4.x</span>
        </div>
      </div>
      <pre className="saa-code p-6 overflow-x-auto m-0">
        <code>
          <span className="saa-code-cmt"># 1) Paketi yükle ve klasik veri setini al</span>
          {"\n"}
          <span className="saa-code-kw">library</span>(
          <span className="saa-code-fn">ergm</span>)
          {"\n"}
          <span className="saa-code-kw">data</span>(
          <span className="saa-code-str">&quot;florentine&quot;</span>)
          {"  "}
          <span className="saa-code-cmt"># 16 Floransa ailesi · evlilik ağı</span>
          {"\n"}
          {"\n"}
          <span className="saa-code-cmt"># 2) Modeli kur: kenar + üçgen istatistikleri</span>
          {"\n"}
          model {"<-"} <span className="saa-code-fn">ergm</span>(
          {"\n"}
          {"  "}flomarriage {"~"} <span className="saa-code-fn">edges</span> +{" "}
          <span className="saa-code-fn">triangle</span>
          {"\n"}
          )
          {"\n"}
          {"\n"}
          <span className="saa-code-cmt"># 3) Katsayıları ve anlamlılığı raporla</span>
          {"\n"}
          <span className="saa-code-fn">summary</span>(model)
          {"\n"}
          {"\n"}
          <span className="saa-code-cmt"># 4) Modelden sentetik ağ üret (simülasyon)</span>
          {"\n"}
          sim {"<-"} <span className="saa-code-fn">simulate</span>(model, nsim ={" "}
          <span className="saa-code-num">100</span>)
        </code>
      </pre>
    </motion.div>
  );
}

/* statnet katsayı çıktısı mockup'ı */
function CoefOutput() {
  const rows = [
    {
      term: "edges",
      est: "-1.59",
      se: "0.35",
      sign: "neg" as const,
      note: "Negatif → ağ seyrek; rastgele bir kenar olasılığı düşük.",
    },
    {
      term: "triangle",
      est: "+0.19",
      se: "0.59",
      sign: "pos" as const,
      note: "Pozitif ama SE büyük → üçgen eğilimi bu veride anlamlı değil.",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="saa-window-chrome w-full max-w-3xl mx-auto"
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
          <BarChart3 className="w-3.5 h-3.5" />
          <span>summary(model) — Maximum Likelihood Results</span>
        </div>
      </div>
      <div className="p-5 bg-[#070b0a] font-mono text-[12px]">
        <div className="grid grid-cols-12 gap-2 px-2 pb-2 text-[10px] uppercase tracking-wider text-gray-500">
          <div className="col-span-3">Terim</div>
          <div className="col-span-2 text-right">Tahmin</div>
          <div className="col-span-2 text-right">Std. Hata</div>
          <div className="col-span-5">Yorum</div>
        </div>
        {rows.map((r) => (
          <div
            key={r.term}
            className="saa-coef-row grid grid-cols-12 gap-2 items-center px-2 py-2 mb-1.5"
          >
            <div className="col-span-3 text-[#a7f3d0]">{r.term}</div>
            <div
              className={`col-span-2 text-right ${
                r.sign === "pos" ? "saa-coef-pos" : "saa-coef-neg"
              }`}
            >
              {r.est}
            </div>
            <div className="col-span-2 text-right text-gray-400">{r.se}</div>
            <div className="col-span-5 text-gray-400 text-[10px] leading-snug">
              {r.note}
            </div>
          </div>
        ))}
        <div className="text-[10px] text-gray-500 mt-2 px-2">
          AIC ve BIC değerleri model karşılaştırması için kullanılır; küçük olan
          tercih edilir.
        </div>
      </div>
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
        <Eyebrow>BVA 2105 · 4. Hafta — Sosyal Ağ Analizi</Eyebrow>
        <H1 className="saa-shimmer">
          Üstel Rastgele
          <br />
          Graf Modelleri
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          ERGM · Gözlenen ağ &ldquo;şans eseri&rdquo; mi oluştu, yoksa arkasında
          üçgen kurma, karşılıklılık ve homofili gibi kurallar mı var?
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          <FeatureCard
            icon={Dices}
            title="Rastgele graf fikri"
            desc="Erdős–Rényi'den ERGM'e: ağı bir olasılık dağılımının örneği olarak görmek."
            accent="#14b8a6"
            delay={0.3}
          />
          <FeatureCard
            icon={Sigma}
            title="Ağ istatistikleri"
            desc="Kenar, 2-yıldız, üçgen, homofili — modeli besleyen yapı taşları."
            accent="#0d9488"
            delay={0.45}
          />
          <FeatureCard
            icon={FlaskConical}
            title="statnet ile kestirim"
            desc="R'da ergm() ile katsayı tahmini, anlamlılık ve simülasyon."
            accent="#5eead4"
            delay={0.6}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 inline-flex items-center gap-2 text-xs font-mono text-gray-500"
        >
          <Calendar className="w-3.5 h-3.5" />
          Cuma · 09:55 – 11:35 · Uygulamalı oturum (R + statnet)
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 2 — Geçen haftadan köprü / bu haftanın hedefi
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 3. haftadan 4. haftaya</Eyebrow>
      <H2>Önce ağı ölçtük; şimdi ağı &ldquo;açıklayan&rdquo; bir model kuruyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        İlk haftalarda merkezilik, görselleştirme ve veri toplama ile bir ağı{" "}
        <span className="text-[#5eead4]">betimledik</span>. Bu hafta soruyu
        değiştiriyoruz: gözlediğimiz yapı (yoğunluk, kümelenme, gruplaşma)
        istatistiksel olarak <span className="text-[#5eead4]">beklenenin
        üstünde mi</span>? Cevap için bir üretici model gerekir: ERGM.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#5eead4]">
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Şimdiye kadar — betimleme
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />
              &ldquo;Bu ağda en merkezi kim?&rdquo; (Hafta 1)
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />
              &ldquo;Ağ neye benziyor?&rdquo; (Hafta 2-3)
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#14b8a6] flex-shrink-0" />
              Tek bir sayıyla / görselle özet.
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
              Bu hafta — çıkarım
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] flex-shrink-0" />
              &ldquo;Bu yapı neden oluşmuş olabilir?&rdquo;
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] flex-shrink-0" />
              Kenarları üreten <span className="text-[#5eead4]">kuralları</span>{" "}
              tahmin etmek.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5eead4] flex-shrink-0" />
              Bir <span className="text-[#5eead4]">olasılık modeli</span> uydurup
              katsayı yorumlamak.
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
      <H2>Üç durak: rastgele graf → ERGM kuruluşu → kestirim</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce ağı bir olasılık nesnesi olarak düşünmeyi öğreniyoruz; sonra ERGM
        denklemini ve ağ istatistiklerini kuruyoruz; en son R&apos;da gerçek bir
        veride katsayı tahmin edip yorumluyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            range: "01",
            title: "Rastgele Graf Modelleri",
            items: ["Erdős–Rényi G(n, p)", "Gözlenen vs. beklenen yapı", "Neden bir model gerekir?"],
            icon: Dices,
            accent: "#14b8a6",
          },
          {
            range: "02",
            title: "ERGM'in Anatomisi",
            items: ["Üstel aile formu", "Ağ istatistikleri (motifler)", "Katsayı (θ) ne anlatır?"],
            icon: Sigma,
            accent: "#0d9488",
          },
          {
            range: "03",
            title: "Kestirim & Tanı",
            items: ["statnet · ergm()", "Anlamlılık & AIC/BIC", "Dejenerasyon ve uyum (GOF)"],
            icon: FlaskConical,
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

  /* ───────────────── 1. RASTGELE GRAF MODELLERİ ───────────────── */

  // 4 — Section divider 1/3
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="Rastgele Graf Modelleri"
      subtitle="Bir ağı tek bir nesne değil, olası ağlardan oluşan bir dağılımdan çekilmiş tek bir örnek olarak düşünmek."
      bgGradient="linear-gradient(135deg, #14b8a6, #0d9488)"
      shadow="0 30px 80px -20px rgba(20, 184, 166, 0.6)"
      icon={<Dices className="w-16 h-16 text-white" />}
    />
  ),

  // 5 — Erdős–Rényi temel model
  () => (
    <SlideShell>
      <Eyebrow>Başlangıç noktası · G(n, p)</Eyebrow>
      <H2 className="mb-4">En basit rastgele graf: Erdős–Rényi</H2>
      <Sub className="mb-8 max-w-3xl">
        n düğüm al; olası her kenarı birbirinden{" "}
        <span className="text-[#5eead4]">bağımsız</span> olarak p olasılığıyla
        çiz. Bu, kenarların hiçbir kuralı olmadığı &ldquo;sıfır hipotezi&rdquo;
        ağıdır.
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
            Her olası kenar bir{" "}
            <span className="text-[#5eead4]">yazı-tura</span> atışı: p ihtimalle
            var, (1 − p) ihtimalle yok. Kenarlar birbirini etkilemez.
          </p>
          <div className="saa-card rounded-lg p-4 font-mono text-sm text-[#a7f3d0] text-center">
            P(kenar) = p &nbsp;·&nbsp; E[kenar] = p · n(n−1)/2
          </div>
          <div className="mt-4 text-xs text-gray-500">
            Tek parametre p, sadece <span className="text-gray-300">yoğunluğu</span>{" "}
            kontrol eder.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-wider text-gray-400 mb-3">
            Neden yetmiyor?
          </div>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-3">
              <Triangle className="w-5 h-5 text-[#5eead4] mt-0.5" />
              <span>
                Gerçek sosyal ağlarda{" "}
                <span className="text-[#5eead4]">çok fazla üçgen</span> vardır;
                ER bunu açıklayamaz.
              </span>
            </li>
            <li className="flex gap-3">
              <Users className="w-5 h-5 text-[#5eead4] mt-0.5" />
              <span>
                Benzer kişiler birbirine bağlanır (homofili) — ER&apos;de böyle
                bir eğilim yoktur.
              </span>
            </li>
            <li className="flex gap-3">
              <Repeat className="w-5 h-5 text-[#5eead4] mt-0.5" />
              <span>
                Yönlü ağlarda <span className="text-[#5eead4]">karşılıklılık</span>{" "}
                (A→B ise B→A) gözlenir; ER bunu da kaçırır.
              </span>
            </li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 6 — Gözlenen vs. rastgele görsel karşılaştırma
  () => (
    <SlideShell>
      <Eyebrow>Asıl soru</Eyebrow>
      <H2 className="mb-2">Bu yapı şanstan mı, yoksa bir kuraldan mı?</H2>
      <Sub className="mb-6 max-w-3xl">
        İki ağ da aynı düğüm ve kenar sayısına sahip. Soldakinde gözle görülür
        üçgenler var; sağdaki tamamen rastgele. ERGM&apos;in işi tam olarak bu
        farkı <span className="text-[#5eead4]">sayısallaştırmaktır</span>.
      </Sub>
      <ObservedVsRandom />
    </SlideShell>
  ),

  /* ───────────────── 2. ERGM'İN ANATOMİSİ ───────────────── */

  // 7 — Section divider 2/3
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="ERGM'in Anatomisi"
      subtitle="Ağın olasılığını, seçtiğimiz yapı sayımlarının (istatistiklerin) üstel bir fonksiyonu olarak yazmak."
      bgGradient="linear-gradient(135deg, #0d9488, #134e4a)"
      shadow="0 30px 80px -20px rgba(13, 148, 136, 0.6)"
      icon={<Sigma className="w-16 h-16 text-white" />}
    />
  ),

  // 8 — ERGM denklemi
  () => (
    <SlideShell>
      <Eyebrow>Modelin kalbi</Eyebrow>
      <H2 className="mb-2">ERGM denklemi parça parça</H2>
      <Sub className="mb-6 max-w-3xl">
        ERGM, gözlenen ağ y&apos;nin olasılığını şu üstel forma koyar. Korkutucu
        görünür ama her parçanın net bir anlamı var.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="saa-card-teal rounded-xl p-7 text-center"
      >
        <div className="font-mono text-xl md:text-2xl text-[#a7f3d0]">
          P(Y = y) = exp( θ<sup>T</sup> · g(y) ) / κ(θ)
        </div>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        {[
          {
            sym: "y",
            name: "Gözlenen ağ",
            desc: "Elimizdeki gerçek ağ (komşuluk matrisi).",
          },
          {
            sym: "g(y)",
            name: "Ağ istatistikleri",
            desc: "Kenar, üçgen, homofili gibi yapı sayımları vektörü.",
          },
          {
            sym: "θ",
            name: "Katsayılar",
            desc: "Her istatistiğin etkisinin yönü ve gücü — tahmin edeceğimiz şey.",
          },
          {
            sym: "κ(θ)",
            name: "Normalleştirici",
            desc: "Olasılıkların toplamını 1 yapan sabit; tüm olası ağlar üzerinden.",
          },
        ].map((p, i) => (
          <motion.div
            key={p.sym}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="saa-card rounded-xl p-5"
          >
            <div className="font-mono text-2xl text-[#5eead4] mb-2">{p.sym}</div>
            <div className="text-sm font-semibold text-white mb-1">{p.name}</div>
            <div className="text-xs text-gray-400 leading-relaxed">{p.desc}</div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-5 text-xs text-gray-500 text-center"
      >
        Sezgi: bir istatistiğin katsayısı pozitifse, o yapıyı{" "}
        <span className="text-[#5eead4]">çok içeren</span> ağlar daha olasıdır.
      </motion.div>
    </SlideShell>
  ),

  // 9 — Ağ istatistikleri / motifler
  () => (
    <SlideShell>
      <Eyebrow>g(y) · yapı taşları</Eyebrow>
      <H2 className="mb-2">Ağ istatistikleri: modeli neyle besliyoruz?</H2>
      <Sub className="mb-8 max-w-3xl">
        g(y) bir motif sayımıdır. En çok kullanılan üçü aşağıda. Hangi motifleri
        koyduğun, modelin neyi &ldquo;açıklamaya&rdquo; çalıştığını belirler.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            comp: <MotifEdge />,
            term: "edges",
            title: "Kenar sayısı",
            desc: "Ağın yoğunluğunu yakalar. Regresyondaki sabit terim gibidir; neredeyse her modelde bulunur.",
          },
          {
            comp: <MotifTwoStar />,
            term: "kstar(2)",
            title: "2-yıldız",
            desc: "Bir düğümün iki komşusu. Derece dağılımının yayılımını / hub eğilimini kontrol eder.",
          },
          {
            comp: <MotifTriangle />,
            term: "triangle",
            title: "Üçgen",
            desc: "Geçişlilik: arkadaşımın arkadaşı benim de arkadaşım. Kümelenmeyi modellemenin temel yolu.",
          },
        ].map((m, i) => (
          <motion.div
            key={m.term}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="saa-motif p-5 flex flex-col"
          >
            <div className="h-20 flex items-center justify-center mb-3">
              {m.comp}
            </div>
            <div className="font-mono text-sm text-[#5eead4] text-center mb-1">
              {m.term}
            </div>
            <div className="text-base font-semibold text-white text-center mb-2">
              {m.title}
            </div>
            <p className="text-xs text-gray-400 leading-relaxed text-center">
              {m.desc}
            </p>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-5 text-[11px] text-gray-500 text-center font-mono"
      >
        Pratikte ham triangle yerine genelde gwesp (geometric weighted ESP)
        tercih edilir — dejenerasyona daha dayanıklıdır.
      </motion.div>
    </SlideShell>
  ),

  // 10 — Düğüm öznitelikleri: homofili
  () => (
    <SlideShell>
      <Eyebrow>Sadece yapı değil · öznitelikler</Eyebrow>
      <H2 className="mb-2">Homofili: benzer benzeri arar</H2>
      <Sub className="mb-8 max-w-3xl">
        ERGM&apos;in gücü, kenarları yalnızca yapıdan değil, düğüm
        özniteliklerinden de açıklayabilmesidir. statnet terimleriyle{" "}
        <span className="font-mono text-[#5eead4]">nodematch</span> ve{" "}
        <span className="font-mono text-[#5eead4]">nodefactor</span> bunu sağlar.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-6 h-6 text-[#5eead4]" />
            <h3 className="text-xl font-semibold text-white">
              nodematch(&quot;bölüm&quot;)
            </h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Aynı bölümden iki kişinin bağlanma eğilimini ölçer. Pozitif katsayı →{" "}
            <span className="text-[#5eead4]">aynı grup içinde</span> daha çok
            bağlantı.
          </p>
          <div className="saa-card rounded-lg p-3 font-mono text-xs text-[#a7f3d0]">
            flonet ~ edges + nodematch(&quot;dept&quot;)
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Scale className="w-6 h-6 text-[#5eead4]" />
            <h3 className="text-xl font-semibold text-white">
              nodefactor / nodecov
            </h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Bir özniteliğin (örn. kıdem, gelir) bağlantı sayısını nasıl etkilediğini
            ölçer. Yüksek değerli düğüm daha mı çok kenar çekiyor?
          </p>
          <ul className="text-xs text-gray-400 space-y-1.5">
            <li>· nodefactor → kategorik öznitelik (cinsiyet, bölüm)</li>
            <li>· nodecov → sayısal öznitelik (yaş, kıdem)</li>
            <li>· absdiff → değer farkı küçükse bağlanma eğilimi</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 11 — Model ailesi karşılaştırma tablosu
  () => (
    <SlideShell>
      <Eyebrow>Toparlayalım</Eyebrow>
      <H2 className="mb-2">Üç model, üç soyutlama düzeyi</H2>
      <Sub className="mb-6 max-w-3xl">
        ERGM neden gerekli? Aynı ağı üç model üzerinden açıklamaya çalıştığımızda
        her birinin neyi yakalayıp neyi <span className="text-[#5eead4]">kaçırdığı</span>{" "}
        netleşir.
      </Sub>
      <ModelFamilyTable />
    </SlideShell>
  ),

  /* ───────────────── 3. KESTİRİM & TANI ───────────────── */

  // 12 — Section divider 3/3
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Kestirim & Tanı"
      subtitle="R / statnet ile katsayıları tahmin etmek, anlamlılığı okumak, modelin gerçekten uyup uymadığını sınamak."
      bgGradient="linear-gradient(135deg, #0d9488, #115e59)"
      shadow="0 30px 80px -20px rgba(13, 148, 136, 0.6)"
      icon={<FlaskConical className="w-16 h-16 text-white" />}
    />
  ),

  // 13 — R / statnet kod
  () => (
    <SlideShell>
      <Eyebrow>R · statnet</Eyebrow>
      <H2 className="mb-2">ERGM&apos;i koda dökmek: dört adım</H2>
      <Sub className="mb-6 max-w-3xl">
        Klasik Florentine evlilik ağı üzerinde model kuruyoruz: 16 Floransa
        ailesi, kenarlar evlilik bağı. Formül{" "}
        <span className="font-mono text-[#5eead4]">ağ ~ terimler</span> şeklinde
        yazılır.
      </Sub>
      <ErgmCodeBlock />
    </SlideShell>
  ),

  // 14 — Katsayı çıktısı ve yorumu
  () => (
    <SlideShell>
      <Eyebrow>Çıktıyı okumak</Eyebrow>
      <H2 className="mb-2">summary(model): katsayı ne diyor?</H2>
      <Sub className="mb-6 max-w-3xl">
        Tahmin (estimate) işareti yapının eğilimini, standart hata ise
        güvenilirliğini verir. Katsayı, standart hatasının kabaca iki katından
        büyükse o terim genelde <span className="text-[#5eead4]">anlamlı</span>{" "}
        sayılır.
      </Sub>
      <CoefOutput />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-5 text-xs text-gray-500 text-center max-w-3xl mx-auto"
      >
        Not: Buradaki değerler örnek amaçlıdır; gerçek katsayılar veri setine ve
        modele göre değişir. Yorum yaparken her zaman standart hatayı birlikte
        okuyun.
      </motion.div>
    </SlideShell>
  ),

  // 15 — Dejenerasyon ve uyum iyiliği (GOF)
  () => (
    <SlideShell>
      <Eyebrow>Tuzaklar · tanı</Eyebrow>
      <H2 className="mb-2">İki kritik kontrol: dejenerasyon ve GOF</H2>
      <Sub className="mb-8 max-w-3xl">
        Bir ERGM &ldquo;çalıştı&rdquo; demek yetmez. Modelin sağlıklı olduğunu iki
        şeyle denetleriz.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="saa-card rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="w-6 h-6 text-[#fca5a5]" />
            <h3 className="text-xl font-semibold text-white">Dejenerasyon</h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Kötü seçilmiş terimlerle (örn. ham triangle) model, neredeyse{" "}
            <span className="text-[#fca5a5]">tamamen boş</span> ya da{" "}
            <span className="text-[#fca5a5]">tamamen dolu</span> ağlara çöker —
            kestirim yakınsamaz.
          </p>
          <ul className="text-xs text-gray-400 space-y-1.5">
            <li>· MCMC zincirleri (trace plot) dengeye gelmiyorsa şüphelen.</li>
            <li>
              · Çözüm: ham terim yerine{" "}
              <span className="font-mono text-[#5eead4]">gwesp</span>,{" "}
              <span className="font-mono text-[#5eead4]">gwdegree</span> gibi
              &ldquo;curved&rdquo; terimler.
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="saa-card-teal rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-6 h-6 text-[#5eead4]" />
            <h3 className="text-xl font-semibold text-white">
              Uyum iyiliği (GOF)
            </h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Modelden yüzlerce ağ simüle edip{" "}
            <span className="text-[#5eead4]">modele konmamış</span> özellikleri
            (örn. derece dağılımı, yol uzunluğu) gözlenen ağla karşılaştırırız.
          </p>
          <div className="saa-card rounded-lg p-3 font-mono text-xs text-[#a7f3d0] mb-3">
            gof(model) ; plot(gof(model))
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Gözlenen değer, simülasyonların aralığında düşüyorsa model iyi uyuyor
            demektir.
          </p>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 16 — Uygulamalı: bu hafta yap-bitir
  () => {
    const items: Array<{ t: string; d: string; icon: LucideIcon }> = [
      {
        t: "R + statnet kur",
        d: "install.packages(\"statnet\") · library(ergm) · ağ veri yapısını tanı.",
        icon: Code2,
      },
      {
        t: "Florentine veri setini yükle",
        d: "data(\"florentine\") · 16 aile. Önce ağı çiz, kenar ve üçgen sayısını gözle.",
        icon: Database,
      },
      {
        t: "İki model kur ve karşılaştır",
        d: "M1: edges · M2: edges + nodematch(\"wealth-grup\"). AIC'leri kıyasla.",
        icon: Sigma,
      },
      {
        t: "GOF çalıştır ve yorumla",
        d: "gof(M2) çıktısını üret, derece dağılımı uyumunu 3 cümlede raporla.",
        icon: FlaskConical,
      },
    ];
    return (
      <SlideShell>
        <Eyebrow>Bu hafta · uygulamalı görev</Eyebrow>
        <H2 className="mb-8">Kendi R oturumunda dört adım</H2>
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
                <div className="text-xs text-gray-400 mt-0.5 font-mono">
                  {it.d}
                </div>
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
          <Layers className="w-4 h-4 text-[#5eead4] mt-0.5 flex-shrink-0" />
          <span>
            Teslim: tek bir .R betiği + kısa rapor. Katsayı işaretlerini ve GOF
            grafiğini <span className="text-white">kendi cümlelerinle</span>{" "}
            yorumla.
          </span>
        </motion.div>
      </SlideShell>
    );
  },

  // 17 — Sıradaki hafta önizleme + kapanış
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8 saa-pulse"
          style={{
            background: "linear-gradient(135deg, #14b8a6, #0d9488)",
            boxShadow: "0 30px 80px -20px rgba(20, 184, 166, 0.6)",
          }}
        >
          <Network className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>4. hafta tamamlandı · sıradaki: Topluluk Tespiti</Eyebrow>
        <H1 className="saa-shimmer-teal">Gruplaşmayı Bulmak</H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta ağı bir model ile açıkladık. 5. haftada ağı parçalara
          ayırıyoruz: modülarite, Louvain ve Girvan–Newman ile{" "}
          <span className="text-[#5eead4]">toplulukları</span> ortaya çıkaracağız.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto">
          <FeatureCard
            icon={Share2}
            title="Modülarite"
            desc="Bir bölünmenin ne kadar 'iyi' olduğunu ölçen Q skoru."
            accent="#14b8a6"
            delay={0.1}
          />
          <FeatureCard
            icon={GitBranch}
            title="Girvan–Newman"
            desc="Aradalığı yüksek kenarları silerek ağı kademeli bölmek."
            accent="#0d9488"
            delay={0.2}
          />
          <FeatureCard
            icon={Layers}
            title="Louvain"
            desc="Büyük ağlarda hızlı, hiyerarşik topluluk bulma yöntemi."
            accent="#5eead4"
            delay={0.3}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-left max-w-3xl mx-auto"
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
                Hazırlık
              </div>
              <div className="text-sm font-semibold text-white">
                R + statnet kurulu
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
                ERGM lab raporu
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
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
          BVA 2105 · 4. Hafta · Üstel Rastgele Graf Modelleri (ERGM)
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
