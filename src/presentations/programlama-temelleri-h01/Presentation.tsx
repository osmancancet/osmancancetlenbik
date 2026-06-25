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
  FileText,
  Sigma,
  Calculator,
  Brain,
  Target,
  Lightbulb,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Quote,
  Check,
  Sparkles,
  AlertTriangle,
  Zap,
  Hash,
  Type,
  CheckCircle2,
  Layers,
  Users,
  Globe,
  Briefcase,
  GraduationCap,
  BarChart3,
  TrendingUp,
  Database,
  Calendar,
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

function StatCard({
  icon: Icon,
  value,
  label,
  source,
  delay = 0,
  accent = "#3776ab",
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
      className="prog-card rounded-xl p-5"
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
              {line || " "}
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

/* ---- Flowchart SVG component --------------------------------- */

function Flowchart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="prog-flow-bg p-6 w-full"
    >
      <svg viewBox="0 0 700 460" className="w-full h-auto">
        <defs>
          <marker
            id="arr"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="#5fa8e0" />
          </marker>
          <linearGradient id="gBlue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3776ab" />
            <stop offset="100%" stopColor="#2c5d88" />
          </linearGradient>
          <linearGradient id="gYellow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffd43b" />
            <stop offset="100%" stopColor="#e6a800" />
          </linearGradient>
          <linearGradient id="gGreen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ec9b0" />
            <stop offset="100%" stopColor="#2f8a76" />
          </linearGradient>
        </defs>

        {/* Başla — oval */}
        <ellipse
          cx="350"
          cy="40"
          rx="70"
          ry="22"
          fill="url(#gGreen)"
          stroke="#4ec9b0"
          strokeWidth="1.5"
        />
        <text x="350" y="46" textAnchor="middle" fill="#0a0a0a" fontSize="14" fontWeight="700">
          Başla
        </text>

        {/* Sayı al — paralelkenar (giriş) */}
        <polygon
          points="270,100 460,100 440,150 250,150"
          fill="url(#gYellow)"
          stroke="#ffd43b"
          strokeWidth="1.5"
        />
        <text x="355" y="130" textAnchor="middle" fill="#1a1a1a" fontSize="13" fontWeight="600">
          Sayı (n) al
        </text>

        {/* Karar — eşkenar dörtgen */}
        <polygon
          points="350,185 470,250 350,315 230,250"
          fill="url(#gBlue)"
          stroke="#5fa8e0"
          strokeWidth="1.5"
        />
        <text x="350" y="246" textAnchor="middle" fill="white" fontSize="13" fontWeight="700">
          n % 2 == 0 ?
        </text>
        <text x="350" y="266" textAnchor="middle" fill="#dbeafe" fontSize="11">
          (kalan sıfır mı?)
        </text>

        {/* Evet — Çift yaz (paralelkenar) */}
        <polygon
          points="120,340 270,340 250,390 100,390"
          fill="url(#gYellow)"
          stroke="#ffd43b"
          strokeWidth="1.5"
        />
        <text x="185" y="370" textAnchor="middle" fill="#1a1a1a" fontSize="13" fontWeight="600">
          &quot;Çift&quot; yaz
        </text>

        {/* Hayır — Tek yaz */}
        <polygon
          points="450,340 600,340 580,390 430,390"
          fill="url(#gYellow)"
          stroke="#ffd43b"
          strokeWidth="1.5"
        />
        <text x="515" y="370" textAnchor="middle" fill="#1a1a1a" fontSize="13" fontWeight="600">
          &quot;Tek&quot; yaz
        </text>

        {/* Bitir */}
        <ellipse
          cx="350"
          cy="430"
          rx="70"
          ry="22"
          fill="#7f1d1d"
          stroke="#ef4444"
          strokeWidth="1.5"
        />
        <text x="350" y="436" textAnchor="middle" fill="white" fontSize="14" fontWeight="700">
          Bitir
        </text>

        {/* Arrows */}
        <line x1="350" y1="62" x2="350" y2="98" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr)" />
        <line x1="350" y1="152" x2="350" y2="183" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr)" />
        <line x1="285" y1="285" x2="200" y2="338" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr)" />
        <line x1="415" y1="285" x2="500" y2="338" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr)" />
        <line x1="185" y1="392" x2="305" y2="425" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr)" />
        <line x1="515" y1="392" x2="395" y2="425" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr)" />

        {/* Branch labels */}
        <text x="235" y="310" fill="#86efac" fontSize="12" fontWeight="700">
          Evet
        </text>
        <text x="445" y="310" fill="#fca5a5" fontSize="12" fontWeight="700">
          Hayır
        </text>
      </svg>
    </motion.div>
  );
}

/* ---- Flowchart symbols mini-svg ------------------------------ */

function FlowSymbol({
  shape,
  label,
  desc,
  delay = 0,
}: {
  shape: "oval" | "rect" | "diamond" | "parallel";
  label: string;
  desc: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="prog-card rounded-xl p-5 flex flex-col items-center text-center"
    >
      <svg viewBox="0 0 140 80" className="w-32 h-20 mb-3">
        {shape === "oval" && (
          <ellipse cx="70" cy="40" rx="60" ry="28" fill="#3776ab33" stroke="#5fa8e0" strokeWidth="2" />
        )}
        {shape === "rect" && (
          <rect x="14" y="14" width="112" height="52" rx="4" fill="#3776ab33" stroke="#5fa8e0" strokeWidth="2" />
        )}
        {shape === "diamond" && (
          <polygon points="70,8 132,40 70,72 8,40" fill="#3776ab33" stroke="#5fa8e0" strokeWidth="2" />
        )}
        {shape === "parallel" && (
          <polygon points="30,14 132,14 110,66 8,66" fill="#3776ab33" stroke="#5fa8e0" strokeWidth="2" />
        )}
      </svg>
      <div className="text-sm font-semibold text-white">{label}</div>
      <div className="text-xs text-gray-400 mt-1 leading-relaxed">{desc}</div>
    </motion.div>
  );
}

/* ---- Language code block (Hello World grid) ------------------ */

function LangCodeBlock({
  name,
  color,
  filename,
  lines,
  delay = 0,
}: {
  name: string;
  color: string;
  filename: string;
  lines: ReactNode[];
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="prog-window-chrome overflow-hidden"
    >
      <div className="prog-window-bar flex items-center gap-2 px-3 py-2">
        <div className="flex gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <div
          className="ml-2 text-[10px] font-mono px-2 py-0.5 rounded"
          style={{ background: `${color}22`, color }}
        >
          {filename}
        </div>
        <div className="ml-auto text-[10px] font-semibold" style={{ color }}>
          {name}
        </div>
      </div>
      <div className="prog-editor px-4 py-3 text-[12px]">
        {lines.map((l, i) => (
          <div key={i} className="whitespace-pre">
            {l}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function QuoteSlide({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <SlideShell>
      <div className="text-center max-w-4xl mx-auto">
        <Quote className="w-16 h-16 text-[#5fa8e0]/40 mx-auto mb-8" />
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
          <div className="text-lg font-semibold text-[#5fa8e0]">{author}</div>
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
        <Eyebrow>BVA 1101 · 1. Hafta · Bahar Dönemi</Eyebrow>
        <H1>
          <span className="prog-shimmer">Programlama Temelleri</span>
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Bilgisayara nasıl konuşulur — algoritmadan koda yolculuk.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 mt-14 max-w-3xl mx-auto"
        >
          {[
            { name: "Python", tag: ".py", color: "#3776ab", desc: "Kolay ve okunabilir" },
            { name: "JavaScript", tag: ".js", color: "#f7df1e", desc: "Tarayıcının dili" },
            { name: "C++", tag: ".cpp", color: "#659ad2", desc: "Hızlı ve sistem-yakını" },
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
                className="w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center text-[11px] font-mono font-bold"
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

  /* ─────────────────  2 · 15 HAFTALIK KONULAR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dönem ne öğreneceğiz?</Eyebrow>
      <H2>15 hafta · Sıfırdan kod yazmaya</H2>
      <Sub className="mt-3 max-w-3xl">
        Algoritma düşüncesinden başlayıp döngülere, dizilere ve dosya okumaya kadar
        adım adım bir programcı gibi düşünmeyi öğreneceğiz.
      </Sub>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-10">
        {[
          { w: "01", t: "Temel kavramlar", icon: Sparkles },
          { w: "02", t: "Algoritma türleri", icon: Brain },
          { w: "03", t: "Akış diyagramları", icon: Layers },
          { w: "04", t: "Değişken & veri tipi", icon: Hash },
          { w: "05", t: "Operatörler", icon: Sigma },
          { w: "06", t: "Koşullu ifadeler", icon: AlertTriangle },
          { w: "07", t: "Döngüler (for / while)", icon: Zap },
          { w: "08", t: "Ara sınav", icon: GraduationCap },
          { w: "09", t: "Diziler / listeler", icon: Database },
          { w: "10", t: "Fonksiyonlar", icon: Calculator },
          { w: "11", t: "Modüller", icon: Briefcase },
          { w: "12", t: "Dosya okuma/yazma", icon: FileText },
          { w: "13", t: "Hata yönetimi", icon: AlertTriangle },
          { w: "14", t: "Mini proje", icon: Target },
          { w: "15", t: "Genel tekrar", icon: CheckCircle2 },
        ].map((c, i) => (
          <motion.div
            key={c.w}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="prog-card rounded-lg p-3 flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-md bg-[#3776ab]/15 border border-[#3776ab]/40 flex items-center justify-center">
              <c.icon className="w-4 h-4 text-[#5fa8e0]" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-mono text-[#5fa8e0]">H{c.w}</div>
              <div className="text-sm text-white font-medium leading-tight">{c.t}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3 · STATS  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Programlama dünyası · 2024</Eyebrow>
      <H2>Neden bu kadar önemli?</H2>
      <Sub className="mt-3 max-w-3xl">
        Kod yazmak, son 75 yılın en hızlı büyüyen mesleki becerisi. Birkaç rakam:
      </Sub>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        <StatCard
          icon={TrendingUp}
          value="%51"
          label="Geliştiricilerin Python kullandığı oran"
          source="Stack Overflow Developer Survey 2024"
          accent="#3776ab"
          delay={0.0}
        />
        <StatCard
          icon={Database}
          value="420M+"
          label="GitHub üzerindeki herkese açık repo (2024)"
          source="GitHub Octoverse 2024"
          accent="#5fa8e0"
          delay={0.1}
        />
        <StatCard
          icon={Briefcase}
          value="%82"
          label="Programlama isteyen teknik iş ilanı"
          source="LinkedIn Workforce Report"
          accent="#ffd43b"
          delay={0.2}
        />
        <StatCard
          icon={Calendar}
          value="1957"
          label="İlk yüksek seviye dil: Fortran"
          source="IBM, John Backus"
          accent="#86efac"
          delay={0.3}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 text-xs text-gray-500 font-mono"
      >
        Kaynak: Stack Overflow 2024 · GitHub Octoverse 2024 · LinkedIn 2023 · IBM Tarihçesi
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  4 · QUOTE 1  ───────────────── */
  () => (
    <QuoteSlide
      quote="Programlama, bilgisayara değil — başka bir insana ne yapması gerektiğini anlatma sanatıdır."
      author="Donald E. Knuth"
      role="Bilgisayar bilimcisi · The Art of Computer Programming"
    />
  ),

  /* ─────────────────  5 · SECTION 1/3 · ALGORİTMA  ───────────────── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Algoritma"
      subtitle="Bir problemin çözümünü adım adım, herkesin anlayabileceği biçimde tarif etmek."
      glowClass="prog-glow-blue"
      icon={<Target className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  6 · ALGORİTMA NEDİR?  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 1 · Algoritma</Eyebrow>
      <H2>Algoritma nedir?</H2>
      <Sub className="mt-3 max-w-3xl">
        Bir işi yapmak için izlenecek <span className="text-white font-semibold">sıralı, açık ve sonlu</span>{" "}
        adımlar dizisi. Çay yapmaktan otomatik para çekmeye kadar her yerde vardır.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 prog-card rounded-xl p-5"
      >
        <div className="text-xs uppercase tracking-wider text-[#5fa8e0] mb-3 font-mono">
          Günlük örnek · Çay demlemek
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
          {[
            "Demliğe su koy",
            "Ocağı yak",
            "Su kaynayınca çayı ekle",
            "10 dk demle",
            "Bardağa koy ve ikram et",
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="prog-card rounded-lg px-3 py-3 flex-1 text-sm text-white text-center">
                <span className="font-mono text-[10px] text-[#5fa8e0] block mb-1">
                  Adım {i + 1}
                </span>
                {step}
              </div>
              {i < 4 && <ChevronRight className="w-4 h-4 text-[#5fa8e0]/60 hidden md:block" />}
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={Brain}
          title="Problemi çöz"
          desc="Önce ne yapacağını net biçimde söylersin, sonra nasıl yapacağını kodlarsın."
          delay={0.4}
          accent="#3776ab"
        />
        <FeatureCard
          icon={Layers}
          title="Adım adım düşün"
          desc="Karmaşık bir işi küçük, doğrulanabilir parçalara böl."
          delay={0.5}
          accent="#5fa8e0"
        />
        <FeatureCard
          icon={Globe}
          title="Dilden bağımsız"
          desc="İyi bir algoritma; Python, Java, C++ — her dilde aynı işi yapar."
          delay={0.6}
          accent="#ffd43b"
        />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  7 · ALGORİTMA 5 ÖZELLİK  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 1 · Algoritma</Eyebrow>
      <H2>Bir algoritmanın 5 temel özelliği</H2>
      <Sub className="mt-3 max-w-3xl">
        Knuth&apos;a göre bir adım dizisinin &ldquo;algoritma&rdquo; sayılabilmesi için
        şu beş şartı sağlaması gerekir:
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <FeatureCard
          icon={CheckCircle2}
          title="1 · Sonluluk"
          desc="Algoritma sonunda mutlaka durmalı — sonsuz döngüye girmemeli."
          delay={0.0}
          accent="#3776ab"
        />
        <FeatureCard
          icon={Target}
          title="2 · Kesinlik"
          desc="Her adım açık ve tek anlamlı olmalı — &lsquo;bir şeyler ekle&rsquo; geçmez."
          delay={0.1}
          accent="#5fa8e0"
        />
        <FeatureCard
          icon={Type}
          title="3 · Girdi"
          desc="Sıfır veya daha fazla, iyi tanımlanmış girdi alır."
          delay={0.2}
          accent="#ffd43b"
        />
        <FeatureCard
          icon={Sparkles}
          title="4 · Çıktı"
          desc="En az bir anlamlı sonuç üretir — yoksa neden çalıştırasın?"
          delay={0.3}
          accent="#86efac"
        />
        <FeatureCard
          icon={Zap}
          title="5 · Etkililik"
          desc="Her adım kalemle kağıtla bile yapılabilir kadar basit olmalı."
          delay={0.4}
          accent="#f472b6"
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="prog-card-yellow rounded-xl p-6 flex items-center gap-4"
        >
          <Lightbulb className="w-8 h-8 text-[#ffd43b]" />
          <div>
            <div className="text-white font-semibold mb-1 text-sm">
              İpucu
            </div>
            <div className="text-xs text-gray-300 leading-relaxed">
              Bir tarifi başkasına okuduğunda kafa karışıklığı yoksa — algoritmandır.
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  8 · CODE EDITOR — İLK PROGRAM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>İlk programımız</Eyebrow>
      <H2 className="mb-2">Üç satır Python · Hasan&apos;a merhaba</H2>
      <Sub className="max-w-3xl">
        Kullanıcıdan adını al, ekrana karşılama mesajı yazdır. Klasik
        &ldquo;Hello, World!&rdquo;ün biraz daha akıllısı.
      </Sub>

      <div className="mt-6">
        <CodeEditor
          title="main.py — Visual Studio Code"
          tabs={["main.py", "README.md"]}
          activeTab="main.py"
          lines={[
            <>
              <span className="tok-comment"># ilk programım</span>
            </>,
            <>
              <span className="tok-var">ad</span>
              <span className="tok-operator"> = </span>
              <span className="tok-builtin">input</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;Adın ne? &quot;</span>
              <span className="tok-punct">)</span>
            </>,
            <>
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-fstring">f</span>
              <span className="tok-string">&quot;Merhaba, </span>
              <span className="tok-punct">{"{"}</span>
              <span className="tok-var">ad</span>
              <span className="tok-punct">{"}"}</span>
              <span className="tok-string">!&quot;</span>
              <span className="tok-punct">)</span>
            </>,
            "",
            <>
              <span className="tok-comment"># çıktı:</span>
            </>,
            <>
              <span className="tok-comment"># Adın ne? Hasan</span>
            </>,
            <>
              <span className="tok-comment"># Merhaba, Hasan!</span>
            </>,
          ]}
          terminal={
            <div className="leading-relaxed">
              <div>
                <span className="prog-terminal-prompt">user@mcbu</span>
                <span className="text-gray-500"> $ </span>
                <span className="prog-terminal-out">python main.py</span>
              </div>
              <div className="prog-terminal-out">
                Adın ne? <span className="prog-terminal-user">Hasan</span>
              </div>
              <div className="prog-terminal-out">Merhaba, Hasan!</div>
              <div>
                <span className="prog-terminal-prompt">user@mcbu</span>
                <span className="text-gray-500"> $ </span>
                <span className="animate-pulse">▌</span>
              </div>
            </div>
          }
        />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  9 · SECTION 2/3 · AKIŞ DİYAGRAMI  ───────────────── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Akış Diyagramı"
      subtitle="Algoritmayı şekillerle, oklarla anlatmak — kod yazmadan önce zihinde test etmek."
      glowClass="prog-glow-yellow"
      icon={<Layers className="w-14 h-14 text-[#1a1a1a]" />}
    />
  ),

  /* ─────────────────  10 · AKIŞ DİYAGRAMI SEMBOLLERİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 2 · Akış Diyagramı</Eyebrow>
      <H2>Dört temel sembol</H2>
      <Sub className="mt-3 max-w-3xl">
        Akış diyagramı uluslararası standarttır (ISO 5807). Aşağıdaki dört şekil
        çoğu programı çizmeye yeter.
      </Sub>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        <FlowSymbol
          shape="oval"
          label="Oval"
          desc="Başla / Bitir noktaları"
          delay={0.0}
        />
        <FlowSymbol
          shape="rect"
          label="Dikdörtgen"
          desc="İşlem / hesaplama adımı"
          delay={0.1}
        />
        <FlowSymbol
          shape="diamond"
          label="Eşkenar dörtgen"
          desc="Karar — evet/hayır sorusu"
          delay={0.2}
        />
        <FlowSymbol
          shape="parallel"
          label="Paralelkenar"
          desc="Veri girişi veya çıkışı"
          delay={0.3}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 prog-card rounded-xl p-5 flex items-center gap-4"
      >
        <Lightbulb className="w-6 h-6 text-[#ffd43b] flex-shrink-0" />
        <div className="text-sm text-gray-300">
          <span className="text-white font-semibold">Akış yönü:</span> her zaman
          yukarıdan aşağıya, soldan sağa. Oklar geri dönüşleri (döngüleri) gösterir.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  11 · ÖRNEK AKIŞ — ÇİFT/TEK  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Örnek akış diyagramı</Eyebrow>
      <H2>Bir sayı çift mi, tek mi?</H2>
      <Sub className="mt-3 max-w-3xl">
        Kullanıcıdan bir sayı al, 2&apos;ye bölümünden kalana bak. Kalan 0 ise
        çift, değilse tek. Bu fikri henüz kod değil — şekil olarak çiziyoruz.
      </Sub>

      <div className="mt-6 max-w-3xl mx-auto">
        <Flowchart />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-4 text-xs text-gray-500 text-center font-mono"
      >
        Aynı algoritma → Python, Java, C++ — her dilde aynı oklar, farklı söz dizimi.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  12 · SECTION 3/3 · PROGRAMLAMA DİLİ  ───────────────── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Programlama Dili"
      subtitle="Algoritmayı bilgisayara anlatan resmi söz dizimi — yüzlerce dil, tek mantık."
      glowClass="prog-glow-purple"
      icon={<Hash className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  13 · YÜKSEK vs DÜŞÜK SEVİYE  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 3 · Diller</Eyebrow>
      <H2>Yüksek seviye vs düşük seviye</H2>
      <Sub className="mt-3 max-w-3xl">
        İnsana yakın diller okuması kolay ama yavaş; donanıma yakın diller hızlı
        ama anlaşılması zor. Arada bir denge var.
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
              <th>Özellik</th>
              <th>Yüksek seviye · Python, JS</th>
              <th>Orta seviye · C, C++</th>
              <th>Düşük seviye · Assembly</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold text-white">Okunabilirlik</td>
              <td>Çok kolay (İngilizceye yakın)</td>
              <td>Orta</td>
              <td>Zor (CPU komutları)</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Hız</td>
              <td>Yavaş–orta</td>
              <td>Hızlı</td>
              <td>En hızlı</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Bellek kontrolü</td>
              <td>Otomatik (GC)</td>
              <td>Manuel (pointer)</td>
              <td>Doğrudan donanım</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Tipik kullanım</td>
              <td>Web, veri bilimi, otomasyon</td>
              <td>Oyun, işletim sistemi</td>
              <td>Sürücü, gömülü çekirdek</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Hata yapmak</td>
              <td>Kolayca yakalanır</td>
              <td>Sessizce çöker</td>
              <td>Sistemi düşürür</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  14 · YORUMLAYICI vs DERLEYİCİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kod nasıl çalışır?</Eyebrow>
      <H2>Yorumlayıcı (Python) vs Derleyici (C++)</H2>
      <Sub className="mt-3 max-w-3xl">
        Bilgisayar yalnızca 0 ve 1 anlar. İki farklı yöntem var: ya kodu satır
        satır çevir, ya da hepsini önceden makine koduna dönüştür.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#3776ab]/20 border border-[#3776ab]/50 flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#5fa8e0]" />
            </div>
            <div>
              <div className="text-white font-semibold">Yorumlayıcı</div>
              <div className="text-[10px] font-mono text-[#5fa8e0] uppercase">Interpreter</div>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            {["Kaynak kod (.py)", "↓", "Yorumlayıcı satır satır okur", "↓", "Sonucu hemen üretir"].map((s, i) => (
              <div
                key={i}
                className={`text-sm ${s === "↓" ? "text-[#5fa8e0] text-center" : "text-gray-300 bg-black/30 rounded px-3 py-1.5"}`}
              >
                {s}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] mt-4">
            <div className="text-[#86efac]">+ Hızlı denemek için ideal</div>
            <div className="text-[#fca5a5]">– Çalıştırma yavaş</div>
            <div className="text-[#86efac]">+ Platformdan bağımsız</div>
            <div className="text-[#fca5a5]">– Yorumlayıcı kurulmalı</div>
          </div>

          <div className="mt-4 text-xs text-gray-500 font-mono">
            Örnek: Python, JavaScript, Ruby, PHP
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#ffd43b]/20 border border-[#ffd43b]/50 flex items-center justify-center">
              <Hash className="w-5 h-5 text-[#ffd43b]" />
            </div>
            <div>
              <div className="text-white font-semibold">Derleyici</div>
              <div className="text-[10px] font-mono text-[#ffd43b] uppercase">Compiler</div>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            {[
              "Kaynak kod (.cpp)",
              "↓",
              "Derleyici tüm dosyayı çevirir",
              "↓",
              "Çalıştırılabilir (.exe) oluşur",
            ].map((s, i) => (
              <div
                key={i}
                className={`text-sm ${s === "↓" ? "text-[#ffd43b] text-center" : "text-gray-300 bg-black/30 rounded px-3 py-1.5"}`}
              >
                {s}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] mt-4">
            <div className="text-[#86efac]">+ Çalışma anı çok hızlı</div>
            <div className="text-[#fca5a5]">– Her değişiklikte derle</div>
            <div className="text-[#86efac]">+ Tek dosya dağıtılır</div>
            <div className="text-[#fca5a5]">– Platform için ayrı derle</div>
          </div>

          <div className="mt-4 text-xs text-gray-500 font-mono">
            Örnek: C, C++, Go, Rust, Swift
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  15 · HELLO WORLD 4 DİLDE  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Karşılaştırma · Aynı iş, farklı dil</Eyebrow>
      <H2>&ldquo;Merhaba&rdquo; dört dilde</H2>
      <Sub className="mt-3 max-w-3xl">
        Aynı çıktıyı üreten dört program. Farkı söz diziminde — algoritma değişmiyor.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <LangCodeBlock
          name="Python"
          color="#3776ab"
          filename="merhaba.py"
          delay={0.0}
          lines={[
            <>
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;Merhaba&quot;</span>
              <span className="tok-punct">)</span>
            </>,
          ]}
        />

        <LangCodeBlock
          name="JavaScript"
          color="#f7df1e"
          filename="merhaba.js"
          delay={0.1}
          lines={[
            <>
              <span className="tok-var">console</span>
              <span className="tok-punct">.</span>
              <span className="tok-fname">log</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;Merhaba&quot;</span>
              <span className="tok-punct">);</span>
            </>,
          ]}
        />

        <LangCodeBlock
          name="Java"
          color="#f89820"
          filename="Merhaba.java"
          delay={0.2}
          lines={[
            <>
              <span className="tok-keyword">public class</span>{" "}
              <span className="tok-fname">Merhaba</span> <span className="tok-punct">{"{"}</span>
            </>,
            <>
              {"  "}
              <span className="tok-keyword">public static void</span>{" "}
              <span className="tok-fname">main</span>
              <span className="tok-punct">(</span>
              <span className="tok-builtin">String</span>
              <span className="tok-punct">[] </span>
              <span className="tok-var">args</span>
              <span className="tok-punct">) {"{"}</span>
            </>,
            <>
              {"    "}
              <span className="tok-var">System</span>
              <span className="tok-punct">.</span>
              <span className="tok-var">out</span>
              <span className="tok-punct">.</span>
              <span className="tok-fname">println</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;Merhaba&quot;</span>
              <span className="tok-punct">);</span>
            </>,
            <>
              {"  "}
              <span className="tok-punct">{"}"}</span>
            </>,
            <>
              <span className="tok-punct">{"}"}</span>
            </>,
          ]}
        />

        <LangCodeBlock
          name="C"
          color="#a8b9cc"
          filename="merhaba.c"
          delay={0.3}
          lines={[
            <>
              <span className="tok-keyword">#include</span>{" "}
              <span className="tok-string">&lt;stdio.h&gt;</span>
            </>,
            "",
            <>
              <span className="tok-builtin">int</span>{" "}
              <span className="tok-fname">main</span>
              <span className="tok-punct">() {"{"}</span>
            </>,
            <>
              {"  "}
              <span className="tok-fname">printf</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;Merhaba</span>
              <span className="tok-fstring">\n</span>
              <span className="tok-string">&quot;</span>
              <span className="tok-punct">);</span>
            </>,
            <>
              {"  "}
              <span className="tok-keyword">return</span>{" "}
              <span className="tok-number">0</span>
              <span className="tok-punct">;</span>
            </>,
            <>
              <span className="tok-punct">{"}"}</span>
            </>,
          ]}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 text-center text-xs text-gray-500"
      >
        Python en az satırla yapar; C en çok hazırlık ister — ama hepsi aynı şeyi yazdırır.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  16 · BU HAFTA YAPILACAKLAR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta sizin göreviniz</Eyebrow>
      <H2>Kendi makinende Python&apos;a &ldquo;merhaba&rdquo; de</H2>
      <Sub className="mt-3 max-w-3xl">
        Tek başına çalıştığında pekişir. Aşağıdaki 5 adımı tamamlayıp sonraki
        derse ekran görüntüsüyle gel.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 prog-card rounded-xl p-6 max-w-3xl mx-auto"
      >
        <div className="text-xs uppercase tracking-wider text-[#5fa8e0] mb-4 font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Görev listesi · Hafta 01
        </div>
        <div className="space-y-3">
          {[
            { t: "Python 3.12 indir ve kur", d: "python.org → Downloads · kurarken &lsquo;Add to PATH&rsquo; seç" },
            { t: "Visual Studio Code kur", d: "code.visualstudio.com · Python eklentisini ekle" },
            { t: "İlk Hello World&apos;ü çalıştır", d: "print(&quot;Merhaba dünya&quot;) → F5 ile çalıştır" },
            { t: "Kendi adınla print yap", d: "input() ile adını al, f-string ile yazdır" },
            { t: "Bir karenin alanını hesapla", d: "kenarı sor, çıktıyı yazdır — print(kenar * kenar)" },
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
                <div className="text-sm text-white font-medium">{item.t}</div>
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

  /* ─────────────────  17 · SIRADAKİ HAFTA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Hafta 02 · Önizleme</Eyebrow>
      <H2>Algoritma türleri ve algoritma oluşturma</H2>
      <Sub className="mt-3 max-w-3xl">
        Bu hafta &ldquo;ne&rdquo; sorusuna baktık. Önümüzdeki hafta &ldquo;nasıl&rdquo;
        kısmına geçiyoruz: farklı problem tiplerine farklı algoritmalar.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <FeatureCard
          icon={Sigma}
          title="Sıralı algoritmalar"
          desc="Adımları başından sonuna doğru izleyen, dallanma içermeyen yapılar."
          accent="#3776ab"
          delay={0.0}
        />
        <FeatureCard
          icon={AlertTriangle}
          title="Koşullu algoritmalar"
          desc="Eğer–değilse karar noktaları içeren — duruma göre dallanan akışlar."
          accent="#5fa8e0"
          delay={0.1}
        />
        <FeatureCard
          icon={Zap}
          title="Döngüsel algoritmalar"
          desc="Bir adımı belirli sayıda veya bir koşul sağlanana kadar tekrar eden yapılar."
          accent="#ffd43b"
          delay={0.2}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center text-xs text-gray-500 font-mono"
      >
        + Pratik: &ldquo;İki sayıdan büyüğünü bul&rdquo; · &ldquo;1&apos;den N&apos;e topla&rdquo; akış diyagramları
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  18 · QUOTE 2  ───────────────── */
  () => (
    <QuoteSlide
      quote="Konuşmak ucuzdur. Bana kodu göster."
      author="Linus Torvalds"
      role="Linux & Git&apos;in yaratıcısı"
    />
  ),

  /* ─────────────────  19 · TEŞEKKÜRLER  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center max-w-3xl mx-auto">
        <Eyebrow>Hafta 01 · Sonu</Eyebrow>
        <H1>
          <span className="prog-shimmer">Teşekkürler</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Sorular, takıldığınız yerler, çalıştırılmayan kodlar — derse veya
          office hour&apos;a getirin. Programcı olmanın ilk şartı: sormak.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12"
        >
          <div className="prog-card rounded-xl p-5">
            <Calendar className="w-5 h-5 text-[#5fa8e0] mb-2 mx-auto" />
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
              Ders saati
            </div>
            <div className="text-white font-semibold mt-1">Perşembe</div>
            <div className="text-sm text-gray-400">09:55 — 12:30</div>
          </div>

          <div className="prog-card rounded-xl p-5">
            <Users className="w-5 h-5 text-[#5fa8e0] mb-2 mx-auto" />
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
              Konum
            </div>
            <div className="text-white font-semibold mt-1">Amfi 1</div>
            <div className="text-sm text-gray-400">MCBÜ MYO</div>
          </div>

          <div className="prog-card rounded-xl p-5">
            <FileText className="w-5 h-5 text-[#5fa8e0] mb-2 mx-auto" />
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
              Sonraki hafta
            </div>
            <div className="text-white font-semibold mt-1">H02</div>
            <div className="text-sm text-gray-400">Algoritma türleri</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-12 text-[11px] font-mono text-gray-600 uppercase tracking-[0.3em]"
        >
          BVA 1101 · Programlama Temelleri · Bahar 2026
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
          BVA 1101 · 1. Hafta · Programlama Temellerine Giriş
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
