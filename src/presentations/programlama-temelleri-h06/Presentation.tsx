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
  Repeat,
  RotateCw,
  Infinity as InfinityIcon,
  ListOrdered,
  Hash,
  Brain,
  Target,
  Lightbulb,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Layers,
  SkipForward,
  Square,
  Sigma,
  FileText,
  Calendar,
  Users,
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
        <div className="absolute inset-0 prog-grid-bg pointer-events-none" />
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
      className="inline-flex items-center gap-3 mb-6 text-xs font-mono uppercase tracking-[0.25em] text-[#5fa8e0]"
    >
      <span className="w-8 h-px bg-[#5fa8e0]" />
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
  accent = "#3776ab",
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
      className="prog-card prog-card-hover rounded-xl p-6 transition-all"
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
        style={{
          background: `${accent}1f`,
          border: `1px solid ${accent}55`,
        }}
      >
        <Icon className="w-6 h-6" style={{ color: accent }} />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

/* ---- Code Editor Mockup (VS Code style) ---------------------- */

type CodeLine = ReactNode;

function CodeEditor({
  title,
  tabs,
  activeTab,
  lines,
  terminal,
}: {
  title: string;
  tabs: string[];
  activeTab: string;
  lines: CodeLine[];
  terminal?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="prog-window-chrome w-full"
    >
      <div className="prog-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-semibold flex-1 max-w-md mx-auto text-center justify-center"
          style={{ background: "#0d0d0d", color: "#9cdcfe" }}
        >
          <span className="w-5 h-5 rounded-sm prog-py-tile flex items-center justify-center text-[10px]">
            Py
          </span>
          <span>{title}</span>
        </div>
      </div>

      <div className="prog-editor-tabbar flex">
        {tabs.map((t) => (
          <div
            key={t}
            className={`prog-editor-tab ${
              t === activeTab ? "prog-editor-tab-active" : ""
            }`}
          >
            <span
              className="w-3 h-3 rounded-sm"
              style={{
                background: t.endsWith(".py")
                  ? "#3776ab"
                  : t.endsWith(".md")
                  ? "#5fa8e0"
                  : "#ffd43b",
              }}
            />
            {t}
          </div>
        ))}
      </div>

      <div className="prog-editor flex">
        <div className="prog-editor-gutter px-3 py-3 select-none">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <div className="flex-1 px-4 py-3 overflow-x-auto">
          {lines.map((line, i) => (
            <div key={i} className="whitespace-pre">
              {line || " "}
            </div>
          ))}
        </div>
      </div>

      {terminal && (
        <div className="prog-terminal px-4 py-3">
          <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            TERMİNAL
          </div>
          {terminal}
        </div>
      )}
    </motion.div>
  );
}

/* ---- while-döngüsü akış diyagramı ---------------------------- */

function LoopFlowchart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="prog-flow-bg p-6 w-full"
    >
      <svg viewBox="0 0 700 470" className="w-full h-auto">
        <defs>
          <marker
            id="arrL"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="#5fa8e0" />
          </marker>
          <linearGradient id="lgBlue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3776ab" />
            <stop offset="100%" stopColor="#2c5d88" />
          </linearGradient>
          <linearGradient id="lgYellow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffd43b" />
            <stop offset="100%" stopColor="#e6a800" />
          </linearGradient>
          <linearGradient id="lgGreen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ec9b0" />
            <stop offset="100%" stopColor="#2f8a76" />
          </linearGradient>
        </defs>

        {/* Başla — sayac = 0 */}
        <ellipse cx="350" cy="36" rx="80" ry="22" fill="url(#lgGreen)" stroke="#4ec9b0" strokeWidth="1.5" />
        <text x="350" y="41" textAnchor="middle" fill="#0a0a0a" fontSize="13" fontWeight="700">
          Başla · sayac = 1
        </text>

        {/* Koşul — eşkenar dörtgen */}
        <polygon points="350,90 490,165 350,240 210,165" fill="url(#lgBlue)" stroke="#5fa8e0" strokeWidth="1.5" />
        <text x="350" y="160" textAnchor="middle" fill="white" fontSize="13" fontWeight="700">
          sayac &lt;= 5 ?
        </text>
        <text x="350" y="180" textAnchor="middle" fill="#dbeafe" fontSize="11">
          (koşul doğru mu?)
        </text>

        {/* Gövde — dikdörtgen */}
        <rect x="245" y="280" width="210" height="56" rx="6" fill="url(#lgYellow)" stroke="#ffd43b" strokeWidth="1.5" />
        <text x="350" y="305" textAnchor="middle" fill="#1a1a1a" fontSize="12" fontWeight="600">
          Gövde: yazdır(sayac)
        </text>
        <text x="350" y="323" textAnchor="middle" fill="#1a1a1a" fontSize="12" fontWeight="600">
          sayac = sayac + 1
        </text>

        {/* Çıkış / Bitir */}
        <ellipse cx="600" cy="165" rx="68" ry="22" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" />
        <text x="600" y="170" textAnchor="middle" fill="white" fontSize="13" fontWeight="700">
          Döngüden çık
        </text>

        {/* Oklar */}
        <line x1="350" y1="58" x2="350" y2="88" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arrL)" />
        <line x1="350" y1="240" x2="350" y2="278" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arrL)" />
        <line x1="490" y1="165" x2="530" y2="165" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arrL)" />

        {/* Geri dönüş oku (gövde -> koşul) */}
        <path
          d="M245,308 L120,308 L120,165 L208,165"
          fill="none"
          stroke="#5fa8e0"
          strokeWidth="2"
          markerEnd="url(#arrL)"
        />

        {/* Dal etiketleri */}
        <text x="318" y="268" fill="#86efac" fontSize="12" fontWeight="700">
          Evet (doğru)
        </text>
        <text x="500" y="150" fill="#fca5a5" fontSize="12" fontWeight="700">
          Hayır (yanlış)
        </text>
        <text x="60" y="240" fill="#9cdcfe" fontSize="11">
          tekrar
        </text>
      </svg>
    </motion.div>
  );
}

/* ---- Döngü izleme (trace) tablosu ---------------------------- */

function TraceTable({
  caption,
  head,
  rows,
}: {
  caption: string;
  head: string[];
  rows: Array<{ cells: ReactNode[] }>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25 }}
      className="prog-card rounded-xl overflow-hidden"
    >
      <div className="px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-[#5fa8e0] border-b border-[#3776ab]/25 flex items-center gap-2">
        <RotateCw className="w-3.5 h-3.5" />
        {caption}
      </div>
      <table className="prog-trace">
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.cells.map((c, j) => (
                <td key={j}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

function SectionDivider({
  num,
  total,
  title,
  subtitle,
  glowClass,
  icon,
}: {
  num: string;
  total: string;
  title: string;
  subtitle: string;
  glowClass: string;
  icon: ReactNode;
}) {
  return (
    <SlideShell bgPattern={false}>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`inline-flex w-32 h-32 rounded-3xl items-center justify-center mb-8 prog-pulse ${glowClass}`}
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
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ─────────────────  1 · KAPAK  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 1101 · 6. Hafta · Programlama Temelleri</Eyebrow>
        <H1>
          <span className="prog-shimmer">Döngü Yapıları</span>
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Bir işi tekrar tekrar yaptırmak — <span className="text-white">while</span>,{" "}
          <span className="text-white">for</span> ve döngü kontrolü.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 mt-14 max-w-3xl mx-auto"
        >
          {[
            { name: "while", tag: "koşul", color: "#3776ab", desc: "Koşul doğru oldukça" },
            { name: "for", tag: "range", color: "#ffd43b", desc: "Belli sayıda tekrar" },
            { name: "break / continue", tag: "kontrol", color: "#4ec9b0", desc: "Akışı yönet" },
          ].map((l, i) => (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="prog-card rounded-xl p-5"
              style={{ borderColor: `${l.color}55` }}
            >
              <div
                className="w-12 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center text-[10px] font-mono font-bold"
                style={{ background: `${l.color}22`, color: l.color, border: `1px solid ${l.color}66` }}
              >
                {l.tag}
              </div>
              <div className="text-white font-semibold text-sm">{l.name}</div>
              <div className="text-[11px] text-gray-500 mt-1">{l.desc}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-12 text-[11px] font-mono text-gray-600 uppercase tracking-[0.3em]"
        >
          Öğr. Gör. · MCBÜ MYO · Bilgisayar Programcılığı
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  2 · GEÇEN HAFTADAN KÖPRÜ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 5. haftadan 6. haftaya</Eyebrow>
      <H2>Karar vermeyi öğrendik; şimdi tekrar etmeyi</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta <span className="text-white font-semibold">koşullu ifadelerle</span>{" "}
        (if / elif / else) programın bir kararı bir kez vermesini sağladık. Ama
        çoğu iş tek seferlik değildir: 100 öğrencinin notunu okumak, kullanıcı
        doğru parolayı girene kadar sormak, bir listedeki her elemanı işlemek.
        Bunun için <span className="text-white font-semibold">döngülere</span> ihtiyacımız var.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <FeatureCard
          icon={Target}
          title="Bu haftanın hedefi"
          desc="Bir kod bloğunu, kopyala-yapıştır yapmadan, kontrollü biçimde tekrar tekrar çalıştırmak."
          delay={0.0}
          accent="#3776ab"
        />
        <FeatureCard
          icon={Brain}
          title="Neden gerekli?"
          desc="Tekrarı döngüye devredersin; kod kısalır, hata azalır, sayı 5 de olsa 5 milyon da olsa aynı kalır."
          delay={0.1}
          accent="#5fa8e0"
        />
        <FeatureCard
          icon={Layers}
          title="Üç temel parça"
          desc="Başlangıç durumu, devam koşulu ve her turda yapılan güncelleme — her döngünün üç ayağı."
          delay={0.2}
          accent="#ffd43b"
        />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3 · DERSİN AKIŞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: while → for → döngü kontrolü</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce koşula bağlı <span className="text-white">while</span> döngüsünü kurarız;
        sonra sayılarla/dizilerle çalışan <span className="text-white">for</span> döngüsüne
        geçeriz; en sonunda akışı yöneten anahtar kelimeleri öğreniriz.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            range: "01",
            title: "while döngüsü",
            items: ["Koşula bağlı tekrar", "Sayaç ve güncelleme", "Sonsuz döngü tuzağı"],
            icon: Repeat,
            accent: "#3776ab",
          },
          {
            range: "02",
            title: "for & range()",
            items: ["Belirli sayıda tekrar", "range(başlangıç, bitiş, adım)", "Dizi üzerinde dolaşma"],
            icon: ListOrdered,
            accent: "#ffd43b",
          },
          {
            range: "03",
            title: "Döngü kontrolü",
            items: ["break ile erken çıkış", "continue ile turu atla", "İç içe döngüler"],
            icon: SkipForward,
            accent: "#4ec9b0",
          },
        ].map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="prog-card rounded-xl p-6"
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
                  <ChevronRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: g.accent }} />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  4 · BÖLÜM 1 · WHILE  ───────────────── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="while Döngüsü"
      subtitle="Bir koşul doğru kaldığı sürece tekrar et. Kaç kez döneceğini önceden bilmediğimiz işler için en doğal yapı."
      glowClass="prog-glow-blue"
      icon={<Repeat className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  5 · WHILE ANATOMİSİ + AKIŞ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 1 · while</Eyebrow>
      <H2 className="mb-2">Bir while döngüsünün üç parçası</H2>
      <Sub className="max-w-3xl mb-6">
        Döngü; bir <span className="text-white">başlangıç</span> değeri, her turda
        kontrol edilen bir <span className="text-white">koşul</span> ve gövdede yapılan
        bir <span className="text-white">güncelleme</span> ile çalışır. Güncellemeyi
        unutursan koşul hiç bozulmaz — sonsuz döngü.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-3">
          {[
            { n: "1", t: "Başlangıç", d: "sayac = 1 — döngü öncesi hazırlık.", c: "#4ec9b0" },
            { n: "2", t: "Koşul", d: "while sayac <= 5: — doğruysa gövde çalışır.", c: "#5fa8e0" },
            { n: "3", t: "Güncelleme", d: "sayac = sayac + 1 — koşulu bir gün bozar.", c: "#ffd43b" },
          ].map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.12 }}
              className="prog-card rounded-xl p-4 flex items-start gap-3"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-mono text-sm font-bold"
                style={{ background: `${s.c}1f`, border: `1px solid ${s.c}66`, color: s.c }}
              >
                {s.n}
              </div>
              <div>
                <div className="text-white font-semibold text-sm">{s.t}</div>
                <div className="text-xs text-gray-400 mt-0.5 font-mono">{s.d}</div>
              </div>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="prog-card-yellow rounded-xl p-4 flex items-center gap-3"
          >
            <Lightbulb className="w-6 h-6 text-[#ffd43b] flex-shrink-0" />
            <div className="text-xs text-gray-300">
              Üçünden biri eksikse döngü ya hiç çalışmaz ya da hiç durmaz.
            </div>
          </motion.div>
        </div>

        <LoopFlowchart />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  6 · WHILE KOD + TERMİNAL  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Canlı kod · while</Eyebrow>
      <H2 className="mb-2">1&apos;den 5&apos;e kadar say</H2>
      <Sub className="max-w-3xl mb-6">
        Sayaç 1&apos;den başlar, her turda ekrana yazılır ve 1 artar. Koşul{" "}
        <span className="font-mono text-[#9cdcfe]">sayac &lt;= 5</span> yanlış olduğunda
        döngü kendiliğinden biter.
      </Sub>

      <CodeEditor
        title="sayac.py — Visual Studio Code"
        tabs={["sayac.py", "README.md"]}
        activeTab="sayac.py"
        lines={[
          <>
            <span className="tok-var">sayac</span>
            <span className="tok-operator"> = </span>
            <span className="tok-number">1</span>
          </>,
          "",
          <>
            <span className="tok-keyword">while</span>
            <span className="tok-punct"> </span>
            <span className="tok-var">sayac</span>
            <span className="tok-operator"> &lt;= </span>
            <span className="tok-number">5</span>
            <span className="tok-punct">:</span>
          </>,
          <>
            {"    "}
            <span className="tok-builtin">print</span>
            <span className="tok-punct">(</span>
            <span className="tok-var">sayac</span>
            <span className="tok-punct">)</span>
          </>,
          <>
            {"    "}
            <span className="tok-var">sayac</span>
            <span className="tok-operator"> = </span>
            <span className="tok-var">sayac</span>
            <span className="tok-operator"> + </span>
            <span className="tok-number">1</span>
            <span className="tok-comment">  # güncelleme — unutma!</span>
          </>,
          "",
          <>
            <span className="tok-builtin">print</span>
            <span className="tok-punct">(</span>
            <span className="tok-string">&quot;Bitti&quot;</span>
            <span className="tok-punct">)</span>
          </>,
        ]}
        terminal={
          <div className="leading-relaxed">
            <div>
              <span className="prog-terminal-prompt">user@mcbu</span>
              <span className="text-gray-500"> $ </span>
              <span className="prog-terminal-out">python sayac.py</span>
            </div>
            <div className="prog-terminal-out">1</div>
            <div className="prog-terminal-out">2</div>
            <div className="prog-terminal-out">3</div>
            <div className="prog-terminal-out">4</div>
            <div className="prog-terminal-out">5</div>
            <div className="prog-terminal-user">Bitti</div>
            <div>
              <span className="prog-terminal-prompt">user@mcbu</span>
              <span className="text-gray-500"> $ </span>
              <span className="animate-pulse">▌</span>
            </div>
          </div>
        }
      />
    </SlideShell>
  ),

  /* ─────────────────  7 · TRACE TABLOSU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>İzleme · döngüyü kafanda çalıştır</Eyebrow>
      <H2 className="mb-2">Adım adım: değişkenler turdan tura nasıl değişir?</H2>
      <Sub className="max-w-3xl mb-6">
        İyi bir programcı kodu çalıştırmadan önce kağıt üzerinde &quot;izler&quot;.
        Her satırda koşulun doğru/yanlış oluşunu ve sayacın değerini takip et —
        hatayı çoğu zaman burada yakalarsın.
      </Sub>

      <div className="max-w-3xl mx-auto">
        <TraceTable
          caption="while sayac <= 5 · izleme tablosu"
          head={["Tur", "sayac (giriş)", "Koşul: sayac <= 5", "Ekrana yazılan", "sayac (çıkış)"]}
          rows={[
            { cells: ["1", "1", <span key="t" className="prog-trace-true">Doğru</span>, "1", "2"] },
            { cells: ["2", "2", <span key="t" className="prog-trace-true">Doğru</span>, "2", "3"] },
            { cells: ["3", "3", <span key="t" className="prog-trace-true">Doğru</span>, "3", "4"] },
            { cells: ["4", "4", <span key="t" className="prog-trace-true">Doğru</span>, "4", "5"] },
            { cells: ["5", "5", <span key="t" className="prog-trace-true">Doğru</span>, "5", "6"] },
            { cells: ["—", "6", <span key="f" className="prog-trace-false">Yanlış</span>, "—", "çık"] },
          ]}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-4 text-center text-xs text-gray-500 font-mono"
      >
        sayac 6 olunca koşul yanlış olur → gövde bir daha çalışmaz → döngü biter.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  8 · SONSUZ DÖNGÜ TUZAĞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sık yapılan hata · sonsuz döngü</Eyebrow>
      <H2 className="mb-2">Güncellemeyi unutursan ne olur?</H2>
      <Sub className="max-w-3xl mb-8">
        Koşulu bozacak güncelleme yoksa, koşul sonsuza kadar doğru kalır ve program
        asla durmaz. En sık karşılaşılan döngü hatası budur.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="prog-card rounded-xl p-6"
          style={{ borderColor: "rgba(239,68,68,0.4)" }}
        >
          <div className="flex items-center gap-2 mb-4 text-red-400">
            <InfinityIcon className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Yanlış · sonsuz döngü</span>
          </div>
          <div className="prog-editor rounded-lg px-4 py-3 text-[12px]">
            <div className="whitespace-pre">
              <span className="tok-var">sayac</span>
              <span className="tok-operator"> = </span>
              <span className="tok-number">1</span>
            </div>
            <div className="whitespace-pre">
              <span className="tok-keyword">while</span>{" "}
              <span className="tok-var">sayac</span>
              <span className="tok-operator"> &lt;= </span>
              <span className="tok-number">5</span>
              <span className="tok-punct">:</span>
            </div>
            <div className="whitespace-pre">
              {"    "}
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">sayac</span>
              <span className="tok-punct">)</span>
            </div>
            <div className="whitespace-pre">
              {"    "}
              <span className="tok-comment"># güncelleme YOK → durmaz</span>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-400 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
            <span>
              sayac hep 1 kalır, koşul hep doğru. Ekrana sonsuza dek{" "}
              <span className="font-mono text-white">1</span> yazılır.{" "}
              <span className="font-mono text-[#ffd43b]">Ctrl + C</span> ile durdurursun.
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="prog-card rounded-xl p-6"
          style={{ borderColor: "rgba(78,201,176,0.4)" }}
        >
          <div className="flex items-center gap-2 mb-4 text-[#4ec9b0]">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Doğru · güncelleme var</span>
          </div>
          <div className="prog-editor rounded-lg px-4 py-3 text-[12px]">
            <div className="whitespace-pre">
              <span className="tok-var">sayac</span>
              <span className="tok-operator"> = </span>
              <span className="tok-number">1</span>
            </div>
            <div className="whitespace-pre">
              <span className="tok-keyword">while</span>{" "}
              <span className="tok-var">sayac</span>
              <span className="tok-operator"> &lt;= </span>
              <span className="tok-number">5</span>
              <span className="tok-punct">:</span>
            </div>
            <div className="whitespace-pre">
              {"    "}
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">sayac</span>
              <span className="tok-punct">)</span>
            </div>
            <div className="whitespace-pre">
              {"    "}
              <span className="tok-var">sayac</span>
              <span className="tok-operator"> += </span>
              <span className="tok-number">1</span>
              <span className="tok-comment">  # koşulu bozar</span>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-400 flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-[#4ec9b0] mt-0.5 flex-shrink-0" />
            <span>
              <span className="font-mono text-white">sayac += 1</span>, çok kullanılan
              kısaltmadır; <span className="font-mono">sayac = sayac + 1</span> ile aynıdır.
            </span>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  9 · BÖLÜM 2 · FOR  ───────────────── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="for Döngüsü & range()"
      subtitle="Kaç kez döneceğini bildiğimiz işler için. Bir sayı aralığı ya da bir dizi üzerinde, eleman eleman dolaşmanın en temiz yolu."
      glowClass="prog-glow-yellow"
      icon={<ListOrdered className="w-14 h-14 text-[#1a1a1a]" />}
    />
  ),

  /* ─────────────────  10 · RANGE() KULLANIMI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 2 · for ve range()</Eyebrow>
      <H2>range() — sayı dizisi üretir</H2>
      <Sub className="mt-3 max-w-3xl">
        <span className="font-mono text-[#9cdcfe]">for</span> döngüsü genellikle{" "}
        <span className="font-mono text-[#4ec9b0]">range()</span> ile kullanılır.
        range&apos;in üç yazımı vardır; bitiş değerinin <span className="text-white">dahil olmadığını</span>{" "}
        unutma — bu en sık yapılan kayma hatasıdır.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 prog-card rounded-xl overflow-hidden"
      >
        <table className="prog-compare">
          <thead>
            <tr>
              <th>Yazım</th>
              <th>Anlamı</th>
              <th>Üretilen değerler</th>
              <th>Sonuç</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="font-mono text-[#9cdcfe]">range(5)</span></td>
              <td>0&apos;dan başla, 5&apos;e kadar (dahil değil)</td>
              <td className="font-mono text-[#b5cea8]">0, 1, 2, 3, 4</td>
              <td>5 tur</td>
            </tr>
            <tr>
              <td><span className="font-mono text-[#9cdcfe]">range(1, 6)</span></td>
              <td>1&apos;den başla, 6&apos;ya kadar (dahil değil)</td>
              <td className="font-mono text-[#b5cea8]">1, 2, 3, 4, 5</td>
              <td>5 tur</td>
            </tr>
            <tr>
              <td><span className="font-mono text-[#9cdcfe]">range(0, 10, 2)</span></td>
              <td>0&apos;dan 10&apos;a, ikişer ikişer (adım = 2)</td>
              <td className="font-mono text-[#b5cea8]">0, 2, 4, 6, 8</td>
              <td>5 tur</td>
            </tr>
            <tr>
              <td><span className="font-mono text-[#9cdcfe]">range(5, 0, -1)</span></td>
              <td>5&apos;ten geriye doğru (adım = -1)</td>
              <td className="font-mono text-[#b5cea8]">5, 4, 3, 2, 1</td>
              <td>geri sayım</td>
            </tr>
          </tbody>
        </table>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-4 text-xs text-gray-500 font-mono"
      >
        Kural: range(başlangıç, bitiş, adım) · bitiş <span className="text-[#ffd43b]">hiçbir zaman</span> dahil değildir.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  11 · WHILE vs FOR + KOD  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Karşılaştırma · aynı iş, iki döngü</Eyebrow>
      <H2 className="mb-2">while ne zaman, for ne zaman?</H2>
      <Sub className="max-w-3xl mb-6">
        1&apos;den 5&apos;e kadar yazdırmayı her ikisi de yapar. Fark: tekrar sayısını{" "}
        <span className="text-white">biliyorsan for</span>, bir{" "}
        <span className="text-white">koşula bağlıysa while</span> tercih edilir.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="prog-window-chrome overflow-hidden"
        >
          <div className="prog-window-bar flex items-center gap-2 px-3 py-2">
            <div className="flex gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>
            <span className="ml-2 text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: "#3776ab22", color: "#5fa8e0" }}>
              while.py
            </span>
            <span className="ml-auto text-[10px] font-semibold text-[#5fa8e0]">while</span>
          </div>
          <div className="prog-editor px-4 py-3 text-[12px]">
            <div className="whitespace-pre">
              <span className="tok-var">i</span>
              <span className="tok-operator"> = </span>
              <span className="tok-number">1</span>
            </div>
            <div className="whitespace-pre">
              <span className="tok-keyword">while</span>{" "}
              <span className="tok-var">i</span>
              <span className="tok-operator"> &lt;= </span>
              <span className="tok-number">5</span>
              <span className="tok-punct">:</span>
            </div>
            <div className="whitespace-pre">
              {"    "}
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">i</span>
              <span className="tok-punct">)</span>
            </div>
            <div className="whitespace-pre">
              {"    "}
              <span className="tok-var">i</span>
              <span className="tok-operator"> += </span>
              <span className="tok-number">1</span>
            </div>
          </div>
          <div className="px-4 py-2.5 text-[11px] text-gray-400 border-t border-white/5">
            Sayacı elinle yönetirsin · esnek ama hata payı yüksek.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="prog-window-chrome overflow-hidden"
        >
          <div className="prog-window-bar flex items-center gap-2 px-3 py-2">
            <div className="flex gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>
            <span className="ml-2 text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: "#ffd43b22", color: "#ffd43b" }}>
              for.py
            </span>
            <span className="ml-auto text-[10px] font-semibold text-[#ffd43b]">for</span>
          </div>
          <div className="prog-editor px-4 py-3 text-[12px]">
            <div className="whitespace-pre">
              <span className="tok-keyword">for</span>{" "}
              <span className="tok-var">i</span>{" "}
              <span className="tok-keyword">in</span>{" "}
              <span className="tok-builtin">range</span>
              <span className="tok-punct">(</span>
              <span className="tok-number">1</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">6</span>
              <span className="tok-punct">):</span>
            </div>
            <div className="whitespace-pre">
              {"    "}
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">i</span>
              <span className="tok-punct">)</span>
            </div>
            <div className="whitespace-pre"> </div>
            <div className="whitespace-pre">
              <span className="tok-comment"># sayaç otomatik artar</span>
            </div>
          </div>
          <div className="px-4 py-2.5 text-[11px] text-gray-400 border-t border-white/5">
            Sayacı range yönetir · daha kısa, daha az hatalı.
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-5 text-center text-xs text-gray-500"
      >
        İkisinin çıktısı birebir aynı: 1 2 3 4 5 — ama for daha az satırla, sayaç hatası riski olmadan yapar.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  12 · DİZİ ÜZERİNDE FOR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>for ile dolaşma · pratik güç</Eyebrow>
      <H2 className="mb-2">for, bir listenin her elemanını gezer</H2>
      <Sub className="max-w-3xl mb-6">
        for döngüsü yalnızca sayılarla değil; bir liste, bir metin ya da herhangi bir
        dizi üzerinde de doğrudan dolaşır. İşte gerçek bir örnek: not listesinin
        ortalamasını bulmak.
      </Sub>

      <CodeEditor
        title="ortalama.py — Visual Studio Code"
        tabs={["ortalama.py"]}
        activeTab="ortalama.py"
        lines={[
          <>
            <span className="tok-var">notlar</span>
            <span className="tok-operator"> = </span>
            <span className="tok-punct">[</span>
            <span className="tok-number">70</span>
            <span className="tok-punct">, </span>
            <span className="tok-number">85</span>
            <span className="tok-punct">, </span>
            <span className="tok-number">90</span>
            <span className="tok-punct">, </span>
            <span className="tok-number">60</span>
            <span className="tok-punct">]</span>
          </>,
          <>
            <span className="tok-var">toplam</span>
            <span className="tok-operator"> = </span>
            <span className="tok-number">0</span>
          </>,
          "",
          <>
            <span className="tok-keyword">for</span>{" "}
            <span className="tok-var">not_</span>{" "}
            <span className="tok-keyword">in</span>{" "}
            <span className="tok-var">notlar</span>
            <span className="tok-punct">:</span>
          </>,
          <>
            {"    "}
            <span className="tok-var">toplam</span>
            <span className="tok-operator"> += </span>
            <span className="tok-var">not_</span>
            <span className="tok-comment">  # her notu topla</span>
          </>,
          "",
          <>
            <span className="tok-var">ortalama</span>
            <span className="tok-operator"> = </span>
            <span className="tok-var">toplam</span>
            <span className="tok-operator"> / </span>
            <span className="tok-builtin">len</span>
            <span className="tok-punct">(</span>
            <span className="tok-var">notlar</span>
            <span className="tok-punct">)</span>
          </>,
          <>
            <span className="tok-builtin">print</span>
            <span className="tok-punct">(</span>
            <span className="tok-string">&quot;Ortalama:&quot;</span>
            <span className="tok-punct">, </span>
            <span className="tok-var">ortalama</span>
            <span className="tok-punct">)</span>
          </>,
        ]}
        terminal={
          <div className="leading-relaxed">
            <div>
              <span className="prog-terminal-prompt">user@mcbu</span>
              <span className="text-gray-500"> $ </span>
              <span className="prog-terminal-out">python ortalama.py</span>
            </div>
            <div className="prog-terminal-out">
              Ortalama: <span className="prog-terminal-user">76.25</span>
            </div>
            <div>
              <span className="prog-terminal-prompt">user@mcbu</span>
              <span className="text-gray-500"> $ </span>
              <span className="animate-pulse">▌</span>
            </div>
          </div>
        }
      />
    </SlideShell>
  ),

  /* ─────────────────  13 · BÖLÜM 3 · KONTROL  ───────────────── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Döngü Kontrolü"
      subtitle="Bir döngünün akışını içeriden yönetmek: erken çıkmak (break), bir turu atlamak (continue) ve döngüleri iç içe kurmak."
      glowClass="prog-glow-green"
      icon={<SkipForward className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  14 · BREAK vs CONTINUE  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 3 · break &amp; continue</Eyebrow>
      <H2 className="mb-2">İki anahtar kelime, iki farklı davranış</H2>
      <Sub className="max-w-3xl mb-8">
        <span className="font-mono text-[#f87171]">break</span> döngüyü tamamen
        bitirir; <span className="font-mono text-[#ffd43b]">continue</span> sadece o
        turun geri kalanını atlar ve bir sonraki tura geçer. İkisini karıştırmak
        klasik bir kafa karışıklığıdır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-red-500/15 border border-red-500/40 flex items-center justify-center">
              <Square className="w-5 h-5 text-[#f87171]" />
            </div>
            <div>
              <div className="text-white font-semibold">break</div>
              <div className="text-[10px] font-mono text-[#f87171] uppercase">döngüyü bitir</div>
            </div>
          </div>
          <div className="prog-editor rounded-lg px-4 py-3 text-[12px] mb-4">
            <div className="whitespace-pre">
              <span className="tok-keyword">for</span>{" "}
              <span className="tok-var">i</span>{" "}
              <span className="tok-keyword">in</span>{" "}
              <span className="tok-builtin">range</span>
              <span className="tok-punct">(</span>
              <span className="tok-number">1</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">10</span>
              <span className="tok-punct">):</span>
            </div>
            <div className="whitespace-pre">
              {"    "}
              <span className="tok-keyword">if</span>{" "}
              <span className="tok-var">i</span>
              <span className="tok-operator"> == </span>
              <span className="tok-number">4</span>
              <span className="tok-punct">:</span>
            </div>
            <div className="whitespace-pre">
              {"        "}
              <span className="tok-keyword">break</span>
            </div>
            <div className="whitespace-pre">
              {"    "}
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">i</span>
              <span className="tok-punct">)</span>
            </div>
          </div>
          <div className="text-xs text-gray-400">
            Çıktı: <span className="font-mono text-white">1 2 3</span> — i=4 olunca döngü
            tamamen biter, 4 ve sonrası hiç yazılmaz.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#ffd43b]/15 border border-[#ffd43b]/40 flex items-center justify-center">
              <SkipForward className="w-5 h-5 text-[#ffd43b]" />
            </div>
            <div>
              <div className="text-white font-semibold">continue</div>
              <div className="text-[10px] font-mono text-[#ffd43b] uppercase">turu atla</div>
            </div>
          </div>
          <div className="prog-editor rounded-lg px-4 py-3 text-[12px] mb-4">
            <div className="whitespace-pre">
              <span className="tok-keyword">for</span>{" "}
              <span className="tok-var">i</span>{" "}
              <span className="tok-keyword">in</span>{" "}
              <span className="tok-builtin">range</span>
              <span className="tok-punct">(</span>
              <span className="tok-number">1</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">6</span>
              <span className="tok-punct">):</span>
            </div>
            <div className="whitespace-pre">
              {"    "}
              <span className="tok-keyword">if</span>{" "}
              <span className="tok-var">i</span>
              <span className="tok-operator"> == </span>
              <span className="tok-number">3</span>
              <span className="tok-punct">:</span>
            </div>
            <div className="whitespace-pre">
              {"        "}
              <span className="tok-keyword">continue</span>
            </div>
            <div className="whitespace-pre">
              {"    "}
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">i</span>
              <span className="tok-punct">)</span>
            </div>
          </div>
          <div className="text-xs text-gray-400">
            Çıktı: <span className="font-mono text-white">1 2 4 5</span> — sadece 3
            atlanır, döngü devam eder.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  15 · İÇ İÇE DÖNGÜ · ÇARPIM TABLOSU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>İç içe döngü · nested loop</Eyebrow>
      <H2 className="mb-2">Bir döngünün içinde başka bir döngü</H2>
      <Sub className="max-w-3xl mb-6">
        Dış döngünün her turunda, iç döngü baştan sona çalışır. Klasik örnek:
        çarpım tablosu. Dış döngü satırları, iç döngü o satırdaki sütunları üretir.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="prog-window-chrome overflow-hidden"
        >
          <div className="prog-window-bar flex items-center gap-2 px-3 py-2">
            <div className="flex gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>
            <span className="ml-2 text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: "#3776ab22", color: "#5fa8e0" }}>
              carpim.py
            </span>
          </div>
          <div className="prog-editor px-4 py-3 text-[12px]">
            <div className="whitespace-pre">
              <span className="tok-keyword">for</span>{" "}
              <span className="tok-var">satir</span>{" "}
              <span className="tok-keyword">in</span>{" "}
              <span className="tok-builtin">range</span>
              <span className="tok-punct">(</span>
              <span className="tok-number">1</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">4</span>
              <span className="tok-punct">):</span>
            </div>
            <div className="whitespace-pre">
              {"    "}
              <span className="tok-keyword">for</span>{" "}
              <span className="tok-var">sutun</span>{" "}
              <span className="tok-keyword">in</span>{" "}
              <span className="tok-builtin">range</span>
              <span className="tok-punct">(</span>
              <span className="tok-number">1</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">4</span>
              <span className="tok-punct">):</span>
            </div>
            <div className="whitespace-pre">
              {"        "}
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">satir</span>
              <span className="tok-operator"> * </span>
              <span className="tok-var">sutun</span>
              <span className="tok-punct">, </span>
              <span className="tok-var">end</span>
              <span className="tok-operator">=</span>
              <span className="tok-string">&quot; \t&quot;</span>
              <span className="tok-punct">)</span>
            </div>
            <div className="whitespace-pre">
              {"    "}
              <span className="tok-builtin">print</span>
              <span className="tok-punct">()</span>
              <span className="tok-comment">  # satır sonu</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-[#5fa8e0] mb-4">
            Çıktı · 3&times;3 çarpım
          </div>
          <div className="grid grid-cols-3 gap-2 max-w-xs">
            {[1, 2, 3].map((s) =>
              [1, 2, 3].map((c) => (
                <div
                  key={`${s}-${c}`}
                  className="prog-card rounded-md py-3 text-center font-mono text-white text-sm"
                >
                  {s * c}
                </div>
              ))
            )}
          </div>
          <div className="mt-5 text-xs text-gray-400 leading-relaxed">
            Dış döngü <span className="font-mono text-white">3</span> tur döner; her
            turda iç döngü <span className="font-mono text-white">3</span> tur. Toplam{" "}
            <span className="font-mono text-[#ffd43b]">3 &times; 3 = 9</span> kez yazdırılır.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  16 · UYGULAMALI LAB  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı alıştırma</Eyebrow>
      <H2>Kendi makinende beş döngü problemi</H2>
      <Sub className="mt-3 max-w-3xl">
        Döngü ancak yazarak pekişir. Aşağıdaki beş problemi VS Code&apos;da çöz,
        çalıştır ve sonraki derse kodunla gel.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 prog-card rounded-xl p-6 max-w-3xl mx-auto"
      >
        <div className="text-xs uppercase tracking-wider text-[#5fa8e0] mb-4 font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Görev listesi · Hafta 06
        </div>
        <div className="space-y-3">
          {[
            { t: "10&apos;dan 1&apos;e geri say", d: "range(10, 0, -1) ile bir for döngüsü kur, her sayıyı yazdır." },
            { t: "1&apos;den 100&apos;e topla", d: "for i in range(1, 101): ile toplamı biriktir — sonuç 5050 olmalı." },
            { t: "Parolayı doğrulat", d: "while döngüsü ile kullanıcı doğru parolayı girene kadar input() ile sor." },
            { t: "Çift sayıları yazdır", d: "1-20 arasında dolaş; if i % 2 == 0 değilse continue ile atla." },
            { t: "Yıldız üçgeni çiz", d: "İç içe for ile her satırda bir tane artan * (yıldız) yazdır." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="flex items-start gap-3 bg-black/30 rounded-lg p-3"
            >
              <div className="w-6 h-6 rounded-md border border-[#5fa8e0]/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 text-[#5fa8e0]" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-white font-medium" dangerouslySetInnerHTML={{ __html: item.t }} />
                <div className="text-xs text-gray-400 mt-0.5">{item.d}</div>
              </div>
              <div className="text-[10px] font-mono text-gray-600 mt-1">
                {String(i + 1).padStart(2, "0")}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  17 · SIRADAKİ HAFTA + KAPANIŞ  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8 prog-glow-blue"
        >
          <Sigma className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>6. hafta tamamlandı · sıradaki: Diziler &amp; Listeler</Eyebrow>
        <H1>
          <span className="prog-shimmer">Çoklu Veriyi Tut</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta tekrarı döngüye devrettik. Hafta 7&apos;de tekrarladığımız
          verileri tek tek değişkenlerde değil; <span className="text-white">listelerde</span>{" "}
          toplamayı öğreneceğiz. Döngü ile liste birlikte gerçek programların belkemiğidir.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto">
          <FeatureCard
            icon={Layers}
            title="Liste oluşturma"
            desc="Birden çok değeri tek bir değişkende tutmak ve indeksle erişmek."
            accent="#3776ab"
            delay={0.1}
          />
          <FeatureCard
            icon={ListOrdered}
            title="Liste + for"
            desc="Bir liste üzerinde dolaşıp her elemanı işlemek — bu haftanın doğal devamı."
            accent="#ffd43b"
            delay={0.2}
          />
          <FeatureCard
            icon={Hash}
            title="Ekle / çıkar / ara"
            desc="append, remove, in operatörü ve listenin uzunluğu (len)."
            accent="#4ec9b0"
            delay={0.3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="prog-card rounded-xl p-5">
            <Calendar className="w-5 h-5 text-[#5fa8e0] mb-2" />
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">Ders saati</div>
            <div className="text-white font-semibold mt-1">Perşembe</div>
            <div className="text-sm text-gray-400">09:55 — 12:30</div>
          </div>
          <div className="prog-card rounded-xl p-5">
            <Users className="w-5 h-5 text-[#5fa8e0] mb-2" />
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">Konum</div>
            <div className="text-white font-semibold mt-1">Amfi 1</div>
            <div className="text-sm text-gray-400">MCBÜ MYO</div>
          </div>
          <div className="prog-card rounded-xl p-5">
            <FileText className="w-5 h-5 text-[#5fa8e0] mb-2" />
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">Teslim</div>
            <div className="text-white font-semibold mt-1">5 döngü problemi</div>
            <div className="text-sm text-gray-400">çalışan kodla gel</div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 text-xs font-mono text-gray-600 flex items-center justify-center gap-2"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>BVA 1101 · Programlama Temelleri · Döngü Yapıları</span>
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
            background: "linear-gradient(90deg, #3776ab, #5fa8e0, #ffd43b)",
            boxShadow: "0 0 16px rgba(55,118,171,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#5fa8e0]/70">
          BVA 1101 · 6. Hafta · Döngü Yapıları
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[#5fa8e0]/50">
            <span className="text-[#5fa8e0]">
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
            className="p-1.5 text-gray-500 hover:text-[#5fa8e0] transition-colors"
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
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#5fa8e0] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
                  ? "w-5 bg-[#5fa8e0]"
                  : "w-1.5 bg-white/15 hover:bg-white/40"
              }`}
              style={
                i === current
                  ? { boxShadow: "0 0 10px rgba(95,168,224,0.7)" }
                  : undefined
              }
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#5fa8e0] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
