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
  GitBranch,
  Repeat,
  RotateCw,
  Target,
  Lightbulb,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  Sparkles,
  AlertTriangle,
  Hash,
  ListChecks,
  CheckCircle2,
  Layers,
  SkipForward,
  Ban,
  Bug,
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

/* ---- Karar (if/elif/else) akış diyagramı --------------------- */

function DecisionFlow() {
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
            id="arrD"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="#5fa8e0" />
          </marker>
          <linearGradient id="dBlue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3776ab" />
            <stop offset="100%" stopColor="#2c5d88" />
          </linearGradient>
          <linearGradient id="dYellow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffd43b" />
            <stop offset="100%" stopColor="#e6a800" />
          </linearGradient>
          <linearGradient id="dGreen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ec9b0" />
            <stop offset="100%" stopColor="#2f8a76" />
          </linearGradient>
        </defs>

        {/* Başla */}
        <ellipse cx="350" cy="34" rx="66" ry="22" fill="url(#dGreen)" stroke="#4ec9b0" strokeWidth="1.5" />
        <text x="350" y="40" textAnchor="middle" fill="#0a0a0a" fontSize="14" fontWeight="700">
          Not (n) al
        </text>

        {/* Karar 1: n >= 85 ? */}
        <polygon points="350,80 480,135 350,190 220,135" fill="url(#dBlue)" stroke="#5fa8e0" strokeWidth="1.5" />
        <text x="350" y="140" textAnchor="middle" fill="white" fontSize="13" fontWeight="700">
          n &gt;= 85 ?
        </text>

        {/* AA (sağ kol) */}
        <rect x="500" y="110" width="150" height="50" rx="6" fill="url(#dYellow)" stroke="#ffd43b" strokeWidth="1.5" />
        <text x="575" y="140" textAnchor="middle" fill="#1a1a1a" fontSize="13" fontWeight="700">
          &quot;AA&quot; yaz
        </text>

        {/* Karar 2: n >= 70 ? */}
        <polygon points="350,210 480,265 350,320 220,265" fill="url(#dBlue)" stroke="#5fa8e0" strokeWidth="1.5" />
        <text x="350" y="270" textAnchor="middle" fill="white" fontSize="13" fontWeight="700">
          n &gt;= 70 ?
        </text>

        {/* BB (sağ kol) */}
        <rect x="500" y="240" width="150" height="50" rx="6" fill="url(#dYellow)" stroke="#ffd43b" strokeWidth="1.5" />
        <text x="575" y="270" textAnchor="middle" fill="#1a1a1a" fontSize="13" fontWeight="700">
          &quot;BB&quot; yaz
        </text>

        {/* else: Kaldı (alt) */}
        <rect x="275" y="345" width="150" height="50" rx="6" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" />
        <text x="350" y="375" textAnchor="middle" fill="white" fontSize="13" fontWeight="700">
          &quot;Kaldı&quot; yaz
        </text>

        {/* Bitir */}
        <ellipse cx="350" cy="440" rx="66" ry="22" fill="#1f1f1f" stroke="#5fa8e0" strokeWidth="1.5" />
        <text x="350" y="446" textAnchor="middle" fill="#dbeafe" fontSize="14" fontWeight="700">
          Bitir
        </text>

        {/* Oklar */}
        <line x1="350" y1="56" x2="350" y2="78" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arrD)" />
        <line x1="480" y1="135" x2="498" y2="135" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arrD)" />
        <line x1="350" y1="190" x2="350" y2="208" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arrD)" />
        <line x1="480" y1="265" x2="498" y2="265" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arrD)" />
        <line x1="350" y1="320" x2="350" y2="343" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arrD)" />
        <line x1="350" y1="395" x2="350" y2="416" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arrD)" />
        {/* Sağ kollar bitire iner */}
        <line x1="575" y1="160" x2="575" y2="420" stroke="#5fa8e0" strokeWidth="2" />
        <line x1="575" y1="420" x2="418" y2="430" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arrD)" />

        {/* Dal etiketleri */}
        <text x="455" y="118" fill="#86efac" fontSize="12" fontWeight="700">Evet</text>
        <text x="358" y="205" fill="#fca5a5" fontSize="12" fontWeight="700">Hayır</text>
        <text x="455" y="248" fill="#86efac" fontSize="12" fontWeight="700">Evet</text>
        <text x="358" y="338" fill="#fca5a5" fontSize="12" fontWeight="700">else</text>
      </svg>
    </motion.div>
  );
}

/* ---- for vs while karşılaştırma kartı ------------------------ */

function LoopCompareCard({
  icon: Icon,
  name,
  subtitle,
  when,
  lines,
  accent,
  delay = 0,
}: {
  icon: LucideIcon;
  name: string;
  subtitle: string;
  when: string;
  lines: ReactNode[];
  accent: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="prog-card rounded-xl p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: `${accent}20`, border: `1px solid ${accent}55` }}
        >
          <Icon className="w-5 h-5" style={{ color: accent }} />
        </div>
        <div>
          <div className="text-white font-semibold">{name}</div>
          <div className="text-[10px] font-mono uppercase" style={{ color: accent }}>
            {subtitle}
          </div>
        </div>
      </div>

      <div className="prog-editor rounded-lg px-4 py-3 text-[12px] mb-4">
        {lines.map((l, i) => (
          <div key={i} className="whitespace-pre">
            {l || " "}
          </div>
        ))}
      </div>

      <div className="text-xs text-gray-400 leading-relaxed">
        <span className="text-white font-semibold">Ne zaman?</span> {when}
      </div>
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
        <Eyebrow>BVA 1101 · 7. Hafta · Programlama Temelleri</Eyebrow>
        <H1>
          <span className="prog-shimmer">Karar &amp; Döngü ile Problem Çözme</span>
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Koşullar yön verir, döngüler tekrarlar. İkisini birleştirip gerçek
          problemleri adım adım çözüyoruz.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 mt-14 max-w-3xl mx-auto"
        >
          {[
            { name: "Karar", tag: "if", color: "#3776ab", desc: "Koşula göre dallan" },
            { name: "Döngü", tag: "for", color: "#ffd43b", desc: "Belli sayıda tekrarla" },
            { name: "Koşullu döngü", tag: "while", color: "#4ec9b0", desc: "Şart sağlandıkça sür" },
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
                className="w-12 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center text-[12px] font-mono font-bold"
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
      <Eyebrow>Köprü · 6. haftadan 7. haftaya</Eyebrow>
      <H2>Tek karardan, karar + tekrara</H2>
      <Sub className="mt-3 max-w-3xl">
        6. hafta <span className="text-white font-semibold">koşullu ifadeleri</span> (if / elif / else)
        gördük. Bu hafta onları <span className="text-white font-semibold">döngülerin</span> içine
        koyup bir işi yüzlerce kez, ama her seferinde &quot;duruma bakarak&quot; yaptıracağız.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#5fa8e0]">
            <GitBranch className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Geçen hafta · biliyoruz</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#3776ab] flex-shrink-0" />Bir koşulun doğru/yanlış olması (True/False).</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#3776ab] flex-shrink-0" />if / elif / else ile dallanma.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#3776ab] flex-shrink-0" />Karşılaştırma ve mantık operatörleri (and / or / not).</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#ffd43b]">
            <Repeat className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu hafta · ekliyoruz</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ffd43b] flex-shrink-0" />for ve while ile tekrar (iterasyon).</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ffd43b] flex-shrink-0" />Döngü içinde karar verme (iç içe yapı).</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ffd43b] flex-shrink-0" />break / continue ile akışı yönetme.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3 · HEDEF / DERSİN AKIŞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: karar → döngü → ikisi bir arada</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce kararı tazeleyip akış diyagramına oturtuyoruz; sonra for ve while
        döngülerini ayırıyoruz; en son ikisini birleştirip gerçek bir problem çözüyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Karar yapıları", items: ["if / elif / else", "Akış diyagramı", "Not → harf örneği"], icon: GitBranch, accent: "#3776ab" },
          { range: "02", title: "Döngü yapıları", items: ["for + range()", "while + koşul", "Döngü izleme (trace)"], icon: Repeat, accent: "#ffd43b" },
          { range: "03", title: "Birlikte kullanım", items: ["İç içe yapı", "break / continue", "Uygulamalı problem"], icon: Layers, accent: "#4ec9b0" },
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
                <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: g.accent }}>
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

  /* ─────────────────  4 · BÖLÜM 1 · KARAR  ───────────────── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Karar Yapıları"
      subtitle="Program bir yol ayrımına geldiğinde bir koşula bakar ve hangi yöne gideceğine karar verir."
      glowClass="prog-glow-blue"
      icon={<GitBranch className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  5 · if / elif / else  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 1 · Karar</Eyebrow>
      <H2>if &middot; elif &middot; else — üç anahtar</H2>
      <Sub className="mt-3 max-w-3xl">
        Koşul <span className="text-white font-semibold">True</span> ise o blok çalışır; değilse
        bir sonraki <span className="font-mono text-[#5fa8e0]">elif</span>&apos;e bakılır; hiçbiri
        tutmazsa <span className="font-mono text-[#5fa8e0]">else</span> devreye girer.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <FeatureCard
          icon={Check}
          title="if · koşul"
          desc="İlk ve zorunlu adım. Koşul doğruysa girintili bloğu çalıştırır, gerisine bakmaz."
          delay={0.0}
          accent="#3776ab"
        />
        <FeatureCard
          icon={Layers}
          title="elif · başka koşul"
          desc="Üsttekiler tutmadıysa yeni bir koşul dener. İstediğin kadar elif eklenebilir."
          delay={0.1}
          accent="#5fa8e0"
        />
        <FeatureCard
          icon={Ban}
          title="else · hiçbiri değilse"
          desc="Koşulsuz son durak. Yukarıdakilerin hiçbiri tutmazsa bu blok çalışır."
          delay={0.2}
          accent="#ffd43b"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 prog-card rounded-xl p-5 flex items-start gap-4"
      >
        <Lightbulb className="w-6 h-6 text-[#ffd43b] flex-shrink-0 mt-0.5" />
        <div className="text-sm text-gray-300">
          <span className="text-white font-semibold">Python&apos;da girinti zorunludur:</span> bir
          bloğun nerede başlayıp bittiğini süslü parantez değil, satır başındaki boşluk (genelde
          4 boşluk) belirler. Yanlış girinti <span className="font-mono text-[#5fa8e0]">IndentationError</span> verir.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  6 · KARAR AKIŞ DİYAGRAMI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Örnek · not → harf notu</Eyebrow>
      <H2>Önce çiz, sonra kodla</H2>
      <Sub className="mt-3 max-w-3xl">
        Bir sayısal notu harf notuna çeviriyoruz. 85 ve üstü &quot;AA&quot;, 70&ndash;84 arası
        &quot;BB&quot;, altı &quot;Kaldı&quot;. İlk tutan koşulda durulur — sıra önemlidir.
      </Sub>

      <div className="mt-6 max-w-3xl mx-auto">
        <DecisionFlow />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-4 text-xs text-gray-500 text-center font-mono"
      >
        Sıralama hatası: önce <span className="text-[#5fa8e0]">n &gt;= 70</span> yazsaydık, 90 alan da &quot;BB&quot; olurdu.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  7 · KARAR KODU (CODE EDITOR)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Aynı algoritma · Python</Eyebrow>
      <H2 className="mb-2">Diyagramı koda dökmek</H2>
      <Sub className="max-w-3xl">
        Üstteki akış diyagramının birebir karşılığı. Girinti, blokları ayırır;
        f-string ile sonucu ekrana yazdırırız.
      </Sub>

      <div className="mt-6">
        <CodeEditor
          title="harf_notu.py — Visual Studio Code"
          tabs={["harf_notu.py", "README.md"]}
          activeTab="harf_notu.py"
          lines={[
            <>
              <span className="tok-var">n</span>
              <span className="tok-operator"> = </span>
              <span className="tok-builtin">int</span>
              <span className="tok-punct">(</span>
              <span className="tok-builtin">input</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;Not: &quot;</span>
              <span className="tok-punct">))</span>
            </>,
            "",
            <>
              <span className="tok-keyword">if</span>
              <span className="tok-var"> n</span>
              <span className="tok-operator"> &gt;= </span>
              <span className="tok-number">85</span>
              <span className="tok-punct">:</span>
            </>,
            <>
              {"    "}
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;AA&quot;</span>
              <span className="tok-punct">)</span>
            </>,
            <>
              <span className="tok-keyword">elif</span>
              <span className="tok-var"> n</span>
              <span className="tok-operator"> &gt;= </span>
              <span className="tok-number">70</span>
              <span className="tok-punct">:</span>
            </>,
            <>
              {"    "}
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;BB&quot;</span>
              <span className="tok-punct">)</span>
            </>,
            <>
              <span className="tok-keyword">else</span>
              <span className="tok-punct">:</span>
            </>,
            <>
              {"    "}
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;Kaldı&quot;</span>
              <span className="tok-punct">)</span>
            </>,
          ]}
          terminal={
            <div className="leading-relaxed">
              <div>
                <span className="prog-terminal-prompt">user@mcbu</span>
                <span className="text-gray-500"> $ </span>
                <span className="prog-terminal-out">python harf_notu.py</span>
              </div>
              <div className="prog-terminal-out">
                Not: <span className="prog-terminal-user">78</span>
              </div>
              <div className="prog-terminal-out">BB</div>
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

  /* ─────────────────  8 · BÖLÜM 2 · DÖNGÜ  ───────────────── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Döngü Yapıları"
      subtitle="Aynı kodu kopyala-yapıştır yapmak yerine, bilgisayara &quot;bunu tekrar et&quot; demenin yolu."
      glowClass="prog-glow-yellow"
      icon={<Repeat className="w-14 h-14 text-[#1a1a1a]" />}
    />
  ),

  /* ─────────────────  9 · for vs while  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 2 · Döngü</Eyebrow>
      <H2>İki döngü, iki farklı soru</H2>
      <Sub className="mt-3 max-w-3xl">
        <span className="font-mono text-[#ffd43b]">for</span> &quot;kaç kez?&quot; bilindiğinde;
        <span className="font-mono text-[#4ec9b0]"> while</span> &quot;koşul bozulana kadar&quot;
        çalıştırmak istendiğinde kullanılır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        <LoopCompareCard
          icon={Repeat}
          name="for döngüsü"
          subtitle="sayım belli"
          accent="#ffd43b"
          delay={0.1}
          when="Tekrar sayısı baştan belliyse: 1&ndash;10 arası, bir listenin elemanları, N kere."
          lines={[
            <>
              <span className="tok-keyword">for</span>
              <span className="tok-var"> i </span>
              <span className="tok-keyword">in</span>
              <span className="tok-builtin"> range</span>
              <span className="tok-punct">(</span>
              <span className="tok-number">1</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">6</span>
              <span className="tok-punct">):</span>
            </>,
            <>
              {"    "}
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">i</span>
              <span className="tok-punct">)</span>
            </>,
            "",
            <>
              <span className="tok-comment"># 1 2 3 4 5</span>
            </>,
          ]}
        />
        <LoopCompareCard
          icon={RotateCw}
          name="while döngüsü"
          subtitle="koşula bağlı"
          accent="#4ec9b0"
          delay={0.2}
          when="Tekrar sayısı önceden belli değilse: doğru parola girilene kadar, bakiye bitene kadar."
          lines={[
            <>
              <span className="tok-var">sayac</span>
              <span className="tok-operator"> = </span>
              <span className="tok-number">1</span>
            </>,
            <>
              <span className="tok-keyword">while</span>
              <span className="tok-var"> sayac</span>
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
              <span className="tok-operator"> += </span>
              <span className="tok-number">1</span>
            </>,
          ]}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 prog-card-yellow rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3"
      >
        <AlertTriangle className="w-4 h-4 text-[#ffd43b] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white font-semibold">Sonsuz döngü tuzağı:</span> while içinde
          sayacı artırmayı (<span className="font-mono">sayac += 1</span>) unutursan koşul hiç
          bozulmaz ve program asla durmaz. Döngüyü her turda &quot;sona yaklaştıran&quot; bir adım şart.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  10 · range() açıklama  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>for &middot; range() fonksiyonu</Eyebrow>
      <H2>range — sayı dizisi üretici</H2>
      <Sub className="mt-3 max-w-3xl">
        <span className="font-mono text-[#ffd43b]">range</span> sayıları üretir;
        <span className="text-white"> başlangıç dahil, bitiş hariçtir.</span> Üç parametresi vardır:
        başlangıç, bitiş ve adım.
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
              <th>Ürettiği değerler</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-mono text-[#5fa8e0]">range(5)</td>
              <td>0&apos;dan başla, 5&apos;e kadar (5 hariç)</td>
              <td className="font-mono">0 · 1 · 2 · 3 · 4</td>
            </tr>
            <tr>
              <td className="font-mono text-[#5fa8e0]">range(1, 6)</td>
              <td>1&apos;den başla, 6 hariç</td>
              <td className="font-mono">1 · 2 · 3 · 4 · 5</td>
            </tr>
            <tr>
              <td className="font-mono text-[#5fa8e0]">range(0, 10, 2)</td>
              <td>0&apos;dan 10&apos;a, ikişer adım</td>
              <td className="font-mono">0 · 2 · 4 · 6 · 8</td>
            </tr>
            <tr>
              <td className="font-mono text-[#5fa8e0]">range(5, 0, -1)</td>
              <td>5&apos;ten geri say, 0 hariç</td>
              <td className="font-mono">5 · 4 · 3 · 2 · 1</td>
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
        En sık hata: <span className="text-[#ffd43b]">range(1, 5)</span> 5&apos;i içermez — 5 de lazımsa <span className="text-[#ffd43b]">range(1, 6)</span> yaz.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  11 · DÖNGÜ İZLEME (TRACE)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Döngü izleme · trace tablosu</Eyebrow>
      <H2 className="mb-2">Toplam = 1 + 2 + ... + 5</H2>
      <Sub className="max-w-3xl mb-6">
        Kafamızda çalıştırmak yerine her turu tabloya yazarız. Bu, hata ayıklamanın
        (debugging) en temel yöntemi: değişkenler adım adım nasıl değişiyor?
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <CodeEditor
          title="toplam.py — Visual Studio Code"
          tabs={["toplam.py"]}
          activeTab="toplam.py"
          lines={[
            <>
              <span className="tok-var">toplam</span>
              <span className="tok-operator"> = </span>
              <span className="tok-number">0</span>
            </>,
            <>
              <span className="tok-keyword">for</span>
              <span className="tok-var"> i </span>
              <span className="tok-keyword">in</span>
              <span className="tok-builtin"> range</span>
              <span className="tok-punct">(</span>
              <span className="tok-number">1</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">6</span>
              <span className="tok-punct">):</span>
            </>,
            <>
              {"    "}
              <span className="tok-var">toplam</span>
              <span className="tok-operator"> += </span>
              <span className="tok-var">i</span>
            </>,
            <>
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">toplam</span>
              <span className="tok-punct">)</span>
              <span className="tok-comment">  # 15</span>
            </>,
          ]}
        />

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="prog-card rounded-xl p-4"
        >
          <div className="text-xs uppercase tracking-wider text-[#5fa8e0] mb-3 font-mono">
            Adım adım izleme
          </div>
          <table className="prog-trace">
            <thead>
              <tr>
                <th>Tur</th>
                <th>i</th>
                <th>toplam (önce)</th>
                <th>toplam (sonra)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>1</td><td>0</td><td>1</td></tr>
              <tr><td>2</td><td>2</td><td>1</td><td>3</td></tr>
              <tr><td>3</td><td>3</td><td>3</td><td>6</td></tr>
              <tr><td>4</td><td>4</td><td>6</td><td>10</td></tr>
              <tr className="prog-trace-final"><td>5</td><td>5</td><td>10</td><td>15</td></tr>
            </tbody>
          </table>
          <div className="text-[11px] text-gray-500 mt-3 font-mono">
            Döngü bitti → toplam = 15
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  12 · BÖLÜM 3 · BİRLİKTE  ───────────────── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Karar + Döngü Birlikte"
      subtitle="Gerçek programların çoğu, bir döngünün her turunda karar veren bu iki yapının iç içe halidir."
      glowClass="prog-glow-purple"
      icon={<Layers className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  13 · İÇ İÇE YAPI — FizzBuzz benzeri  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>İç içe yapı · döngü + karar</Eyebrow>
      <H2 className="mb-2">1&ndash;10: çift mi, tek mi?</H2>
      <Sub className="max-w-3xl mb-6">
        for döngüsü sayıları üretir; içindeki if her sayı için ayrı karar verir.
        Bu, &quot;her eleman için kontrol et&quot; deseninin temelidir.
      </Sub>

      <CodeEditor
        title="cift_tek.py — Visual Studio Code"
        tabs={["cift_tek.py"]}
        activeTab="cift_tek.py"
        lines={[
          <>
            <span className="tok-keyword">for</span>
            <span className="tok-var"> sayi </span>
            <span className="tok-keyword">in</span>
            <span className="tok-builtin"> range</span>
            <span className="tok-punct">(</span>
            <span className="tok-number">1</span>
            <span className="tok-punct">, </span>
            <span className="tok-number">11</span>
            <span className="tok-punct">):</span>
          </>,
          <>
            {"    "}
            <span className="tok-keyword">if</span>
            <span className="tok-var"> sayi</span>
            <span className="tok-operator"> % </span>
            <span className="tok-number">2</span>
            <span className="tok-operator"> == </span>
            <span className="tok-number">0</span>
            <span className="tok-punct">:</span>
          </>,
          <>
            {"        "}
            <span className="tok-builtin">print</span>
            <span className="tok-punct">(</span>
            <span className="tok-var">sayi</span>
            <span className="tok-punct">, </span>
            <span className="tok-string">&quot;çift&quot;</span>
            <span className="tok-punct">)</span>
          </>,
          <>
            {"    "}
            <span className="tok-keyword">else</span>
            <span className="tok-punct">:</span>
          </>,
          <>
            {"        "}
            <span className="tok-builtin">print</span>
            <span className="tok-punct">(</span>
            <span className="tok-var">sayi</span>
            <span className="tok-punct">, </span>
            <span className="tok-string">&quot;tek&quot;</span>
            <span className="tok-punct">)</span>
          </>,
        ]}
        terminal={
          <div className="leading-relaxed">
            <div className="prog-terminal-out">1 tek</div>
            <div className="prog-terminal-out">2 çift</div>
            <div className="prog-terminal-out">3 tek</div>
            <div className="prog-terminal-out text-gray-500">... 10 çift</div>
          </div>
        }
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-4 text-xs text-gray-500 font-mono"
      >
        Dikkat: iki kademeli girinti — if döngünün içinde, print de if&apos;in içinde (8 boşluk).
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  14 · break / continue  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Akış kontrolü · break &amp; continue</Eyebrow>
      <H2>Döngüyü erken kes ya da turu atla</H2>
      <Sub className="mt-3 max-w-3xl">
        Bazen döngünün tamamını beklemek istemeyiz. İki anahtar kelime akışı yönetir:
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#3776ab]/20 border border-[#3776ab]/50 flex items-center justify-center">
              <Ban className="w-5 h-5 text-[#5fa8e0]" />
            </div>
            <div>
              <div className="text-white font-semibold">break</div>
              <div className="text-[10px] font-mono text-[#5fa8e0] uppercase">döngüyü bitir</div>
            </div>
          </div>
          <div className="prog-editor rounded-lg px-4 py-3 text-[12px] mb-3">
            <div className="whitespace-pre">
              <span className="tok-keyword">for</span>
              <span className="tok-var"> n </span>
              <span className="tok-keyword">in</span>
              <span className="tok-builtin"> range</span>
              <span className="tok-punct">(</span>
              <span className="tok-number">1</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">100</span>
              <span className="tok-punct">):</span>
            </div>
            <div className="whitespace-pre">
              {"    "}
              <span className="tok-keyword">if</span>
              <span className="tok-var"> n</span>
              <span className="tok-operator"> == </span>
              <span className="tok-number">7</span>
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
              <span className="tok-var">n</span>
              <span className="tok-punct">)</span>
              <span className="tok-comment">  # 1..6</span>
            </div>
          </div>
          <div className="text-xs text-gray-400">
            n 7 olunca döngü <span className="text-white">tamamen durur</span>. Aranan bulununca devam etmek anlamsızsa kullanılır.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#ffd43b]/20 border border-[#ffd43b]/50 flex items-center justify-center">
              <SkipForward className="w-5 h-5 text-[#ffd43b]" />
            </div>
            <div>
              <div className="text-white font-semibold">continue</div>
              <div className="text-[10px] font-mono text-[#ffd43b] uppercase">bu turu atla</div>
            </div>
          </div>
          <div className="prog-editor rounded-lg px-4 py-3 text-[12px] mb-3">
            <div className="whitespace-pre">
              <span className="tok-keyword">for</span>
              <span className="tok-var"> n </span>
              <span className="tok-keyword">in</span>
              <span className="tok-builtin"> range</span>
              <span className="tok-punct">(</span>
              <span className="tok-number">1</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">7</span>
              <span className="tok-punct">):</span>
            </div>
            <div className="whitespace-pre">
              {"    "}
              <span className="tok-keyword">if</span>
              <span className="tok-var"> n</span>
              <span className="tok-operator"> % </span>
              <span className="tok-number">2</span>
              <span className="tok-operator"> == </span>
              <span className="tok-number">0</span>
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
              <span className="tok-var">n</span>
              <span className="tok-punct">)</span>
              <span className="tok-comment">  # 1 3 5</span>
            </div>
          </div>
          <div className="text-xs text-gray-400">
            Çift sayılarda <span className="text-white">kalan satırlar atlanır</span>, döngü bir sonraki tura geçer. Döngü bitmez.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  15 · UYGULAMALI PROBLEM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Uygulamalı problem · while + if</Eyebrow>
      <H2 className="mb-2">Parola deneme: 3 hak</H2>
      <Sub className="max-w-3xl mb-6">
        while ile &quot;doğru girilene kadar veya hak bitene kadar&quot; tekrar; if ile her
        denemede kontrol. Karar ve döngünün klasik birleşimi.
      </Sub>

      <CodeEditor
        title="parola.py — Visual Studio Code"
        tabs={["parola.py"]}
        activeTab="parola.py"
        lines={[
          <>
            <span className="tok-var">dogru</span>
            <span className="tok-operator"> = </span>
            <span className="tok-string">&quot;mcbu2026&quot;</span>
          </>,
          <>
            <span className="tok-var">hak</span>
            <span className="tok-operator"> = </span>
            <span className="tok-number">3</span>
          </>,
          "",
          <>
            <span className="tok-keyword">while</span>
            <span className="tok-var"> hak</span>
            <span className="tok-operator"> &gt; </span>
            <span className="tok-number">0</span>
            <span className="tok-punct">:</span>
          </>,
          <>
            {"    "}
            <span className="tok-var">giris</span>
            <span className="tok-operator"> = </span>
            <span className="tok-builtin">input</span>
            <span className="tok-punct">(</span>
            <span className="tok-string">&quot;Parola: &quot;</span>
            <span className="tok-punct">)</span>
          </>,
          <>
            {"    "}
            <span className="tok-keyword">if</span>
            <span className="tok-var"> giris</span>
            <span className="tok-operator"> == </span>
            <span className="tok-var">dogru</span>
            <span className="tok-punct">:</span>
          </>,
          <>
            {"        "}
            <span className="tok-builtin">print</span>
            <span className="tok-punct">(</span>
            <span className="tok-string">&quot;Giriş başarılı&quot;</span>
            <span className="tok-punct">)</span>
          </>,
          <>
            {"        "}
            <span className="tok-keyword">break</span>
          </>,
          <>
            {"    "}
            <span className="tok-var">hak</span>
            <span className="tok-operator"> -= </span>
            <span className="tok-number">1</span>
          </>,
          <>
            {"    "}
            <span className="tok-builtin">print</span>
            <span className="tok-punct">(</span>
            <span className="tok-string">&quot;Yanlış, kalan hak:&quot;</span>
            <span className="tok-punct">, </span>
            <span className="tok-var">hak</span>
            <span className="tok-punct">)</span>
          </>,
        ]}
        terminal={
          <div className="leading-relaxed">
            <div className="prog-terminal-out">Parola: <span className="prog-terminal-user">1234</span></div>
            <div className="prog-terminal-out">Yanlış, kalan hak: 2</div>
            <div className="prog-terminal-out">Parola: <span className="prog-terminal-user">mcbu2026</span></div>
            <div className="prog-terminal-out">Giriş başarılı</div>
          </div>
        }
      />
    </SlideShell>
  ),

  /* ─────────────────  16 · SIK HATALAR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sık yapılan hatalar</Eyebrow>
      <H2>Bu dört tuzağa düşme</H2>
      <Sub className="mt-3 max-w-3xl">
        Karar ve döngülerde en çok karşılaşılan hatalar. Tanırsan, ayıklaması kolaylaşır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: RotateCw, t: "Sonsuz döngü", d: "while koşulu hiç bozulmaz — sayacı artırmayı/azaltmayı unutmak. Program donar.", accent: "#f87171" },
          { icon: Hash, t: "= ile == karışması", d: "Karşılaştırma çift eşittir (==). Tek eşittir (=) atamadır, koşulda sözdizimi hatası verir.", accent: "#ffd43b" },
          { icon: Layers, t: "Yanlış girinti", d: "print&apos;i döngünün dışında bırakmak. Girinti, kodun hangi bloğa ait olduğunu belirler.", accent: "#5fa8e0" },
          { icon: Bug, t: "range sınırı", d: "range(1, 5) 5&apos;i içermez. 1&ndash;5 arası hepsi lazımsa range(1, 6) yazılmalı.", accent: "#4ec9b0" },
        ].map((c, i) => (
          <motion.div
            key={c.t}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="prog-card rounded-xl p-5 flex items-start gap-4"
          >
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${c.accent}1f`, border: `1px solid ${c.accent}55` }}
            >
              <c.icon className="w-5 h-5" style={{ color: c.accent }} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white mb-1">{c.t}</h3>
              <p className="text-sm text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: c.d }} />
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  17 · BU HAFTA GÖREV  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta sizin göreviniz</Eyebrow>
      <H2>Kendin yaz, çalıştır, sonraki derse getir</H2>
      <Sub className="mt-3 max-w-3xl">
        Aşağıdaki beş küçük programı yaz. Hepsi karar + döngü gerektiriyor.
        Çalışan çıktılarının ekran görüntüsüyle gel.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 prog-card rounded-xl p-6 max-w-3xl mx-auto"
      >
        <div className="text-xs uppercase tracking-wider text-[#5fa8e0] mb-4 font-mono flex items-center gap-2">
          <ListChecks className="w-4 h-4" />
          Görev listesi · Hafta 07
        </div>
        <div className="space-y-3">
          {[
            { t: "1&apos;den 50&apos;ye 3&apos;ün katları", d: "for + if: range(1, 51) içinde sayi % 3 == 0 olanları yazdır" },
            { t: "Faktöriyel hesapla", d: "Kullanıcıdan n al, for döngüsüyle 1*2*...*n çarpımını bul" },
            { t: "Geri sayım", d: "while ile 10&apos;dan 1&apos;e say, sonunda &quot;Kalkış!&quot; yazdır" },
            { t: "En büyüğü bul", d: "5 sayı al, döngü içinde if ile en büyüğünü takip et" },
            { t: "Menü döngüsü", d: "while True + if: kullanıcı 0 girene kadar işlem tekrarla, break ile çık" },
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
                <div className="text-xs text-gray-400 mt-0.5" dangerouslySetInnerHTML={{ __html: item.d }} />
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

  /* ─────────────────  18 · SIRADAKİ HAFTA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Hafta 08 · Önizleme</Eyebrow>
      <H2>Ara sınav &amp; tekrar</H2>
      <Sub className="mt-3 max-w-3xl">
        İlk yedi haftanın özeti: değişkenler, operatörler, karar ve döngü yapıları.
        Bu hafta öğrendiğin karar + döngü birleşimi, sınavın çekirdek konusu olacak.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <FeatureCard
          icon={GitBranch}
          title="Karar tekrarı"
          desc="if / elif / else sıralaması, iç içe koşullar ve mantık operatörleri üzerinden örnekler."
          accent="#3776ab"
          delay={0.0}
        />
        <FeatureCard
          icon={Repeat}
          title="Döngü tekrarı"
          desc="for + range ve while ile sayma, toplama, biriktirme problemlerinin çözümü."
          accent="#ffd43b"
          delay={0.1}
        />
        <FeatureCard
          icon={Target}
          title="Karma problemler"
          desc="Döngü içinde karar veren, break/continue kullanan birleşik soru tipleri."
          accent="#4ec9b0"
          delay={0.2}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center text-xs text-gray-500 font-mono"
      >
        Hazırlık: 1&ndash;7. hafta görevlerini tekrar çöz · trace tablosuyla kontrol et.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  19 · KAPANIŞ  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center max-w-3xl mx-auto">
        <Eyebrow>Hafta 07 · Sonu</Eyebrow>
        <H1>
          <span className="prog-shimmer">Özet &amp; Kapanış</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Karar yön verir, döngü tekrarlar; ikisi birleşince program gerçek
          problemleri çözer. Bol bol kod yazmak en iyi çalışma yöntemidir.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12"
        >
          <div className="prog-card rounded-xl p-5">
            <GitBranch className="w-5 h-5 text-[#5fa8e0] mb-2 mx-auto" />
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
              Bu hafta
            </div>
            <div className="text-white font-semibold mt-1">Karar + Döngü</div>
            <div className="text-sm text-gray-400">if · for · while</div>
          </div>

          <div className="prog-card rounded-xl p-5">
            <Sparkles className="w-5 h-5 text-[#5fa8e0] mb-2 mx-auto" />
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
              Görev
            </div>
            <div className="text-white font-semibold mt-1">5 program</div>
            <div className="text-sm text-gray-400">çalıştır + ekran görüntüsü</div>
          </div>

          <div className="prog-card rounded-xl p-5">
            <CheckCircle2 className="w-5 h-5 text-[#5fa8e0] mb-2 mx-auto" />
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
              Sonraki hafta
            </div>
            <div className="text-white font-semibold mt-1">H08</div>
            <div className="text-sm text-gray-400">Ara sınav &amp; tekrar</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-12 text-[11px] font-mono text-gray-600 uppercase tracking-[0.3em]"
        >
          BVA 1101 · Programlama Temelleri · 7. Hafta
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
          BVA 1101 · 7. Hafta · Karar &amp; Döngü ile Problem Çözme
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
