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
  Boxes,
  Repeat,
  Package,
  Layers,
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
  ArrowRightLeft,
  ArrowDownToLine,
  ArrowUpFromLine,
  Wrench,
  Scissors,
  Calendar,
  Code2,
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

/* ---- Fonksiyon anatomisi (etiketli SVG) ---------------------- */

function FunctionAnatomy() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="prog-flow-bg p-6 w-full"
    >
      <svg viewBox="0 0 720 300" className="w-full h-auto">
        <defs>
          <marker
            id="anatomyArr"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="#5fa8e0" />
          </marker>
        </defs>

        {/* Kod satırı */}
        <text
          x="360"
          y="150"
          textAnchor="middle"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="26"
        >
          <tspan fill="#c586c0">def</tspan>
          <tspan fill="#dcdcaa"> kdv_ekle</tspan>
          <tspan fill="#d4d4d4">(</tspan>
          <tspan fill="#9cdcfe">fiyat</tspan>
          <tspan fill="#d4d4d4">, </tspan>
          <tspan fill="#9cdcfe">oran</tspan>
          <tspan fill="#d4d4d4">):</tspan>
        </text>

        {/* def anahtar kelimesi */}
        <line x1="300" y1="120" x2="300" y2="70" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#anatomyArr)" />
        <rect x="220" y="36" width="160" height="30" rx="6" fill="#3776ab33" stroke="#c586c0" strokeWidth="1.5" />
        <text x="300" y="56" textAnchor="middle" fill="#e9d5ff" fontSize="13" fontWeight="700">
          def · tanım anahtarı
        </text>

        {/* fonksiyon adı */}
        <line x1="362" y1="160" x2="430" y2="210" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#anatomyArr)" />
        <rect x="360" y="216" width="150" height="30" rx="6" fill="#3776ab33" stroke="#dcdcaa" strokeWidth="1.5" />
        <text x="435" y="236" textAnchor="middle" fill="#fdf6c2" fontSize="13" fontWeight="700">
          fonksiyon adı
        </text>

        {/* parametreler */}
        <line x1="470" y1="160" x2="560" y2="110" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#anatomyArr)" />
        <rect x="500" y="40" width="180" height="46" rx="6" fill="#3776ab33" stroke="#9cdcfe" strokeWidth="1.5" />
        <text x="590" y="60" textAnchor="middle" fill="#dbeafe" fontSize="13" fontWeight="700">
          parametreler
        </text>
        <text x="590" y="76" textAnchor="middle" fill="#93c5fd" fontSize="11">
          (girdi yuvaları)
        </text>

        {/* iki nokta / gövde başlangıcı */}
        <line x1="200" y1="160" x2="150" y2="210" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#anatomyArr)" />
        <rect x="40" y="216" width="220" height="46" rx="6" fill="#3776ab33" stroke="#5fa8e0" strokeWidth="1.5" />
        <text x="150" y="236" textAnchor="middle" fill="#dbeafe" fontSize="13" fontWeight="700">
          iki nokta + girintili gövde
        </text>
        <text x="150" y="252" textAnchor="middle" fill="#93c5fd" fontSize="11">
          işin yapıldığı satırlar
        </text>
      </svg>
    </motion.div>
  );
}

/* ---- Çağrı yığını (call stack) görseli ----------------------- */

function CallStack() {
  const frames = [
    { name: "main()", note: "programın girişi", color: "#4ec9b0", active: false },
    { name: "fatura_yaz()", note: "kdv_ekle&apos;yi çağırır", color: "#5fa8e0", active: false },
    { name: "kdv_ekle(100, 20)", note: "şu an çalışan · en üstte", color: "#ffd43b", active: true },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="prog-card rounded-xl p-6 max-w-3xl mx-auto"
    >
      <div className="flex items-center justify-between mb-5 text-xs font-mono uppercase tracking-widest text-gray-400">
        <span className="flex items-center gap-2 text-[#ffd43b]">
          <ArrowUpFromLine className="w-4 h-4" /> En üst (son çağrı)
        </span>
        <span className="flex items-center gap-2 text-[#4ec9b0]">
          Taban <ArrowDownToLine className="w-4 h-4" />
        </span>
      </div>
      <div className="flex flex-col-reverse gap-2.5">
        {frames.map((f, i) => (
          <motion.div
            key={f.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.18 }}
            className="prog-stack-frame px-4 py-3 flex items-center gap-3"
            style={
              f.active
                ? { borderColor: "#ffd43b", boxShadow: "0 0 22px -6px rgba(255,212,59,0.5)" }
                : undefined
            }
          >
            <span
              className="font-mono text-sm font-bold px-2 py-0.5 rounded"
              style={{ background: `${f.color}22`, color: f.color }}
            >
              {f.name}
            </span>
            <span className="text-sm text-gray-300" dangerouslySetInnerHTML={{ __html: f.note }} />
          </motion.div>
        ))}
      </div>
      <div className="mt-5 text-[11px] text-gray-500 font-mono">
        Bir fonksiyon dönünce kendi çerçevesi yığından silinir; akış onu
        çağıran satıra geri döner.
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
        <Eyebrow>BVA 1101 · 13. Hafta · Bahar Dönemi</Eyebrow>
        <H1>
          <span className="prog-shimmer">Fonksiyonlar</span>
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Tanımla, çağır, tekrar kullan — programı küçük ve adlandırılmış
          alt parçalara bölmek.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 mt-14 max-w-3xl mx-auto"
        >
          {[
            { name: "Tanım", tag: "def", color: "#3776ab", desc: "Fonksiyonu bir kez yaz" },
            { name: "Çağrı", tag: "()", color: "#ffd43b", desc: "İstediğin yerde çalıştır" },
            { name: "Alt program", tag: "↺", color: "#4ec9b0", desc: "Kodu parçalara böl" },
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
                className="w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center text-[12px] font-mono font-bold"
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

  /* ─────────────────  2 · KÖPRÜ / HEDEF  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 12. haftadan 13. haftaya</Eyebrow>
      <H2>Aynı kodu üçüncü kez yazıyorsan — fonksiyon vakti</H2>
      <Sub className="mt-3 max-w-3xl">
        Şimdiye kadar değişken, koşul, döngü ve listelerle bir programı baştan
        sona düz yazdık. Program büyüdükçe aynı satırlar tekrar ediyor. Bu hafta
        o tekrarı tek bir ada bağlayıp her yerden çağırmayı öğreniyoruz.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="prog-card-yellow rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#ffd43b]">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Fonksiyonsuz</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ffd43b] flex-shrink-0" />Aynı hesaplama kopyala-yapıştır ile her yerde.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ffd43b] flex-shrink-0" />Bir hata bulunca on yeri tek tek düzeltmek.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ffd43b] flex-shrink-0" />Uzun, okunması zor tek parça program.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Fonksiyonlu</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#4ec9b0] flex-shrink-0" />Mantığı tek yerde yaz, adıyla istediğin kadar çağır.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#4ec9b0] flex-shrink-0" />Düzeltmeyi tek noktada yap, her yer güncellenir.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#4ec9b0] flex-shrink-0" />Kısa, isimlendirilmiş, test edilebilir parçalar.</li>
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 prog-card rounded-lg px-4 py-3 text-sm text-gray-300 flex items-center gap-3"
      >
        <Lightbulb className="w-5 h-5 text-[#ffd43b] flex-shrink-0" />
        <span>
          <span className="text-white font-semibold">DRY ilkesi</span> — &quot;Don&apos;t Repeat
          Yourself&quot;: kendini tekrarlama. Fonksiyon, bu ilkenin en temel aracıdır.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  3 · DERSIN AKIŞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: tanım → çağrı → alt programlarla tasarım</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce bir fonksiyonu nasıl tanımladığımıza, sonra parametre verip değer
        alarak nasıl çağırdığımıza, en son bir programı alt programlara bölmenin
        tasarım mantığına bakacağız.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Tanım (def)", items: ["def anahtar kelimesi", "Parametreler & gövde", "return ile değer döndürme"], icon: Code2, accent: "#3776ab" },
          { range: "02", title: "Çağrı", items: ["Argüman geçirme", "Yerel & global kapsam", "Çağrı yığını (call stack)"], icon: ArrowRightLeft, accent: "#ffd43b" },
          { range: "03", title: "Alt programlar", items: ["Problemi parçalama", "Tek sorumluluk", "Yeniden kullanım"], icon: Boxes, accent: "#4ec9b0" },
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
                <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: g.accent }}>Durak {g.range}</div>
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

  /* ─────────────────  4 · BÖLÜM 1 · TANIM  ───────────────── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Fonksiyon Tanımı"
      subtitle="Bir işi bir kez yaz, ona bir ad ver. def ile başlar; girdileri parametreler, sonucu return belirler."
      glowClass="prog-glow-blue"
      icon={<Code2 className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  5 · FONKSIYON ANATOMISI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 1 · Tanım</Eyebrow>
      <H2 className="mb-2">Bir fonksiyonun anatomisi</H2>
      <Sub className="max-w-3xl mb-6">
        Tanım satırı dört parçadan oluşur: <span className="text-white font-semibold">def</span> anahtar
        kelimesi, bir <span className="text-white font-semibold">ad</span>, parantez içinde
        <span className="text-white font-semibold"> parametreler</span> ve iki noktadan sonra
        girintili <span className="text-white font-semibold">gövde</span>.
      </Sub>
      <FunctionAnatomy />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-4 text-xs text-gray-500 text-center font-mono"
      >
        Python&apos;da gövde girinti (indentation) ile belirlenir — süslü parantez yok.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  6 · PARAMETRE vs ARGÜMAN  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 1 · Terimler</Eyebrow>
      <H2>Parametre, argüman, return</H2>
      <Sub className="mt-3 max-w-3xl">
        Bu üç terim sık karıştırılır. Tanım anındaki yer tutucuya
        <span className="text-white font-semibold"> parametre</span>, çağrı anında
        geçirilen gerçek değere <span className="text-white font-semibold">argüman</span> denir.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <FeatureCard
          icon={ArrowDownToLine}
          title="Parametre"
          desc="Tanımda parantez içine yazdığın isim — bir girdi yuvası. Örn. def kdv_ekle(fiyat, oran)."
          delay={0.0}
          accent="#3776ab"
        />
        <FeatureCard
          icon={ArrowRightLeft}
          title="Argüman"
          desc="Çağrıda yuvalara koyduğun gerçek değer. Örn. kdv_ekle(100, 20) — 100 ve 20 argümandır."
          delay={0.1}
          accent="#ffd43b"
        />
        <FeatureCard
          icon={ArrowUpFromLine}
          title="return"
          desc="Fonksiyonun ürettiği sonucu dışarı verir. return yoksa fonksiyon None döndürür."
          delay={0.2}
          accent="#4ec9b0"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 prog-card rounded-lg px-4 py-3 text-sm text-gray-300 flex items-start gap-3"
      >
        <Lightbulb className="w-5 h-5 text-[#ffd43b] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white font-semibold">return ≠ print:</span> print
          ekrana yazı basar; return ise değeri çağrıya geri verir, böylece o değeri
          bir değişkende saklayabilir veya başka hesapta kullanabilirsin.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  7 · KOD: TANIM + RETURN  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Editörde · ilk fonksiyon</Eyebrow>
      <H2 className="mb-2">Tanımla, sonra çağır</H2>
      <Sub className="max-w-3xl">
        kdv_ekle, bir fiyat ile bir oran alır ve KDV&apos;li tutarı
        <span className="text-white font-semibold"> döndürür</span>. Tanım çalıştırmaz;
        çalışması için aşağıda çağırırız.
      </Sub>

      <div className="mt-6">
        <CodeEditor
          title="fatura.py — Visual Studio Code"
          tabs={["fatura.py", "README.md"]}
          activeTab="fatura.py"
          lines={[
            <>
              <span className="tok-comment"># bir fonksiyon TANIMI</span>
            </>,
            <>
              <span className="tok-keyword">def</span>{" "}
              <span className="tok-fname">kdv_ekle</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">fiyat</span>
              <span className="tok-punct">, </span>
              <span className="tok-var">oran</span>
              <span className="tok-punct">):</span>
            </>,
            <>
              {"    "}
              <span className="tok-var">kdv</span>
              <span className="tok-operator"> = </span>
              <span className="tok-var">fiyat</span>
              <span className="tok-operator"> * </span>
              <span className="tok-var">oran</span>
              <span className="tok-operator"> / </span>
              <span className="tok-number">100</span>
            </>,
            <>
              {"    "}
              <span className="tok-keyword">return</span>{" "}
              <span className="tok-var">fiyat</span>
              <span className="tok-operator"> + </span>
              <span className="tok-var">kdv</span>
            </>,
            "",
            <>
              <span className="tok-comment"># fonksiyon ÇAĞRISI — sonucu sakla</span>
            </>,
            <>
              <span className="tok-var">toplam</span>
              <span className="tok-operator"> = </span>
              <span className="tok-fname">kdv_ekle</span>
              <span className="tok-punct">(</span>
              <span className="tok-number">100</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">20</span>
              <span className="tok-punct">)</span>
            </>,
            <>
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-fstring">f</span>
              <span className="tok-string">&quot;Ödenecek: </span>
              <span className="tok-punct">{"{"}</span>
              <span className="tok-var">toplam</span>
              <span className="tok-punct">{"}"}</span>
              <span className="tok-string"> TL&quot;</span>
              <span className="tok-punct">)</span>
            </>,
          ]}
          terminal={
            <div className="leading-relaxed">
              <div>
                <span className="prog-terminal-prompt">user@mcbu</span>
                <span className="text-gray-500"> $ </span>
                <span className="prog-terminal-out">python fatura.py</span>
              </div>
              <div className="prog-terminal-out">Ödenecek: 120.0 TL</div>
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

  /* ─────────────────  8 · VARSAYILAN & ANAHTAR ARGÜMAN  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 1 · Esnek tanımlar</Eyebrow>
      <H2>Varsayılan değer ve anahtarlı argüman</H2>
      <Sub className="mt-3 max-w-3xl">
        Parametreye varsayılan değer verirsen, çağrıda onu yazmak zorunda kalmazsın.
        Ayrıca argümanları <span className="text-white font-semibold">ad=değer</span> biçiminde
        geçerek sırayı değil, niyetini belirtirsin.
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
              <th>Çağrı biçimi</th>
              <th>Anlamı</th>
              <th>Sonuç (oran varsayılan 20)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-mono text-[#9cdcfe]">kdv_ekle(100, 20)</td>
              <td>Konuma göre: fiyat=100, oran=20</td>
              <td>120.0</td>
            </tr>
            <tr>
              <td className="font-mono text-[#9cdcfe]">kdv_ekle(100)</td>
              <td>oran yazılmadı → varsayılan 20 kullanılır</td>
              <td>120.0</td>
            </tr>
            <tr>
              <td className="font-mono text-[#9cdcfe]">kdv_ekle(100, oran=10)</td>
              <td>Anahtarlı argüman: oran açıkça 10</td>
              <td>110.0</td>
            </tr>
            <tr>
              <td className="font-mono text-[#9cdcfe]">kdv_ekle(oran=1, fiyat=200)</td>
              <td>Adlar yazılınca sıra önemsiz</td>
              <td>202.0</td>
            </tr>
          </tbody>
        </table>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-4 text-[11px] text-gray-500 font-mono"
      >
        Tanım: <span className="text-[#5fa8e0]">def kdv_ekle(fiyat, oran=20):</span> · varsayılanlı
        parametreler her zaman sona yazılır.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  9 · BÖLÜM 2 · ÇAĞRI  ───────────────── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Fonksiyon Çağrımı"
      subtitle="Adı yazıp parantez açtığında akış o fonksiyona dallanır, işini yapar ve geri döner. Değerler nasıl gidip geliyor?"
      glowClass="prog-glow-yellow"
      icon={<ArrowRightLeft className="w-14 h-14 text-[#1a1a1a]" />}
    />
  ),

  /* ─────────────────  10 · ÇAĞRI AKIŞI (call stack)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 2 · Çağrı akışı</Eyebrow>
      <H2 className="mb-2">Çağrı yığını: akış nereye gidiyor?</H2>
      <Sub className="max-w-3xl mb-6">
        Bir fonksiyon çağrıldığında program o satırda durur, denetimi fonksiyona
        verir ve fonksiyon için bir <span className="text-white font-semibold">çerçeve (frame)</span>
        açar. İç içe çağrılar yığını büyütür; her return bir çerçeveyi kapatır.
      </Sub>
      <CallStack />
    </SlideShell>
  ),

  /* ─────────────────  11 · KAPSAM (scope)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 2 · Kapsam (scope)</Eyebrow>
      <H2>Yerel mi, global mi?</H2>
      <Sub className="mt-3 max-w-3xl">
        Fonksiyon içinde tanımlanan değişken <span className="text-white font-semibold">yereldir</span>:
        yalnızca o fonksiyon çalışırken yaşar ve dışarıdan görünmez. Dışarıda
        tanımlanan ise <span className="text-white font-semibold">globaldir</span>.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="prog-scope-global p-5"
        >
          <div className="flex items-center gap-2 mb-3 text-[#4ec9b0]">
            <Layers className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Global kapsam</span>
          </div>
          <div className="font-mono text-[12px] space-y-1.5 text-gray-300">
            <div><span className="tok-var">vergi_orani</span> = <span className="tok-number">20</span></div>
            <div className="prog-scope-local px-3 py-2.5 mt-2">
              <div className="text-[10px] uppercase tracking-widest text-[#ffd43b] mb-1">kdv_ekle() · yerel</div>
              <div><span className="tok-keyword">def</span> <span className="tok-fname">kdv_ekle</span>(<span className="tok-var">fiyat</span>):</div>
              <div>{"    "}<span className="tok-var">kdv</span> = <span className="tok-var">fiyat</span> * <span className="tok-var">vergi_orani</span> / <span className="tok-number">100</span></div>
              <div>{"    "}<span className="tok-keyword">return</span> <span className="tok-var">fiyat</span> + <span className="tok-var">kdv</span></div>
            </div>
          </div>
          <div className="text-[11px] text-gray-500 mt-3">
            kdv yereldir; fonksiyon dışında print(kdv) yazarsan
            <span className="text-[#f87171]"> NameError</span> alırsın.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="prog-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3 text-[#5fa8e0]">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">İyi alışkanlık</span>
          </div>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5fa8e0] flex-shrink-0" />
              Veriyi <span className="text-white">argüman olarak ver</span>, global değişkene
              dokunma; fonksiyon kendi kendine yeter.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5fa8e0] flex-shrink-0" />
              Sonucu <span className="text-white">return ile geri al</span>; global&apos;i
              içeriden değiştirmek hatayı gizler.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5fa8e0] flex-shrink-0" />
              Aynı adı yerelde yeniden kullanmak globali ezmez; ikisi ayrı yaşar.
            </li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  12 · BÖLÜM 3 · ALT PROGRAMLAR  ───────────────── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Alt Programlar"
      subtitle="Büyük bir problemi, her biri tek bir işi yapan küçük fonksiyonlara bölmek — okunabilir, test edilebilir, yeniden kullanılabilir kod."
      glowClass="prog-glow-purple"
      icon={<Boxes className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  13 · PARÇALAMA (decomposition)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 3 · Tasarım</Eyebrow>
      <H2 className="mb-2">Bir işi alt programlara bölmek</H2>
      <Sub className="max-w-3xl mb-6">
        &quot;Sipariş özeti yazdır&quot; tek bir dev fonksiyon olmak zorunda değil.
        Onu küçük, adlandırılmış adımlara böleriz; ana fonksiyon yalnızca bu
        adımları sırayla çağırır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: ArrowDownToLine, title: "ara_topla()", desc: "Ürün fiyatlarını toplar.", accent: "#3776ab" },
          { icon: Wrench, title: "kdv_ekle()", desc: "Vergiyi hesaplayıp ekler.", accent: "#ffd43b" },
          { icon: Scissors, title: "indirim_uygula()", desc: "Varsa kuponu düşer.", accent: "#f472b6" },
          { icon: FileText, title: "fis_yaz()", desc: "Sonucu ekrana basar.", accent: "#4ec9b0" },
        ].map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="prog-card rounded-xl p-5"
          >
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center mb-3"
              style={{ background: `${s.accent}1f`, border: `1px solid ${s.accent}55` }}
            >
              <s.icon className="w-5 h-5" style={{ color: s.accent }} />
            </div>
            <div className="font-mono text-sm font-semibold text-white">{s.title}</div>
            <div className="text-xs text-gray-400 mt-1 leading-relaxed">{s.desc}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 prog-card rounded-lg px-4 py-3 text-sm text-gray-300 flex items-center gap-3"
      >
        <Package className="w-5 h-5 text-[#5fa8e0] flex-shrink-0" />
        <span>
          Ana fonksiyon:{" "}
          <span className="font-mono text-[#9cdcfe]">
            yazdir(fis_yaz(indirim_uygula(kdv_ekle(ara_topla(sepet)))))
          </span>{" "}
          — her parça tek bir işten sorumlu.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  14 · İYİ FONKSIYON İLKELERI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 3 · İlkeler</Eyebrow>
      <H2>İyi bir fonksiyonun beş özelliği</H2>
      <Sub className="mt-3 max-w-3xl">
        Alt programları bölerken şu kurallara uymak kodu hem okunur hem de
        bakımı kolay tutar:
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <FeatureCard
          icon={Target}
          title="1 · Tek sorumluluk"
          desc="Bir fonksiyon tek bir işi yapsın. Adı işini açıkça anlatabiliyorsa doğru bölmüşsündür."
          delay={0.0}
          accent="#3776ab"
        />
        <FeatureCard
          icon={CheckCircle2}
          title="2 · Anlamlı ad"
          desc="hesapla yerine kdv_ekle. İyi ad, yorum satırına olan ihtiyacı azaltır."
          delay={0.1}
          accent="#5fa8e0"
        />
        <FeatureCard
          icon={ArrowRightLeft}
          title="3 · Net arayüz"
          desc="Girdiyi parametreyle al, sonucu return ile ver. Yan etkiden (global değiştirme) kaçın."
          delay={0.2}
          accent="#ffd43b"
        />
        <FeatureCard
          icon={Scissors}
          title="4 · Kısa tut"
          desc="Bir ekrana sığsın. Çok uzuyorsa, içinden yeni bir fonksiyon çıkarmaktır çözüm."
          delay={0.3}
          accent="#4ec9b0"
        />
        <FeatureCard
          icon={Repeat}
          title="5 · Yeniden kullanılabilir"
          desc="Belirli bir veriye değil, parametreye bağlı olsun; farklı yerlerde de işe yarasın."
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
            <div className="text-white font-semibold mb-1 text-sm">İpucu</div>
            <div className="text-xs text-gray-300 leading-relaxed">
              Bir fonksiyona iyi bir ad bulmakta zorlanıyorsan, muhtemelen birden
              fazla iş yapıyordur — ikiye böl.
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  15 · UYGULAMALI ALIŞTIRMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı alıştırma</Eyebrow>
      <H2>Kendi makinende dört fonksiyon yaz</H2>
      <Sub className="mt-3 max-w-3xl">
        Tek başına yazınca pekişir. Aşağıdaki dört görevi tamamlayıp sonraki
        derse dosyanla gel.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 prog-card rounded-xl p-6 max-w-3xl mx-auto"
      >
        <div className="text-xs uppercase tracking-wider text-[#5fa8e0] mb-4 font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Görev listesi · Hafta 13
        </div>
        <div className="space-y-3">
          {[
            { t: "alan(kenar) yaz", d: "Bir kenar al, karenin alanını return et — print etme, döndür." },
            { t: "kdv_ekle(fiyat, oran=20)", d: "Varsayılan oranla çalışsın; kdv_ekle(50) ve kdv_ekle(50, 10) dene." },
            { t: "buyuk_olan(a, b)", d: "İki sayıdan büyüğünü döndür; eşitse ikisinden birini döndür." },
            { t: "ozet(ad, *notlar)", d: "Bir öğrenci adı ve değişken sayıda not al; ortalamayı hesaplayıp yazdır." },
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
                <div className="text-sm text-white font-medium font-mono">{item.t}</div>
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

  /* ─────────────────  16 · SIRADAKİ HAFTA + KAPANIŞ  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8 prog-glow-blue"
        >
          <Package className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>13. hafta tamamlandı · sıradaki: Modüller</Eyebrow>
        <H1>
          <span className="prog-shimmer">Fonksiyondan modüle</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta fonksiyonları tanımlayıp çağırdık. Hafta 14&apos;te birden çok
          fonksiyonu bir dosyada (modülde) toplayıp import ile yeniden kullanmaya
          ve hazır kütüphanelerden yararlanmaya geçiyoruz.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <FeatureCard
            icon={Package}
            title="import"
            desc="Kendi .py dosyandaki fonksiyonları başka dosyadan çağırmak."
            accent="#3776ab"
            delay={0.1}
          />
          <FeatureCard
            icon={Boxes}
            title="Standart kütüphane"
            desc="math, random, datetime gibi hazır modülleri kullanmak."
            accent="#ffd43b"
            delay={0.2}
          />
          <FeatureCard
            icon={Sparkles}
            title="pip & paketler"
            desc="Topluluğun yazdığı paketleri kurup projene katmak."
            accent="#4ec9b0"
            delay={0.3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto text-left">
          <div className="prog-card rounded-xl p-5">
            <Calendar className="w-5 h-5 text-[#5fa8e0] mb-2" />
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">Ders saati</div>
            <div className="text-white font-semibold mt-1">Perşembe</div>
            <div className="text-sm text-gray-400">09:55 — 12:30</div>
          </div>
          <div className="prog-card rounded-xl p-5">
            <Target className="w-5 h-5 text-[#ffd43b] mb-2" />
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">Teslim</div>
            <div className="text-white font-semibold mt-1">4 fonksiyon</div>
            <div className="text-sm text-gray-400">fonksiyon.py dosyası</div>
          </div>
          <div className="prog-card rounded-xl p-5">
            <FileText className="w-5 h-5 text-[#4ec9b0] mb-2" />
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">Sonraki hafta</div>
            <div className="text-white font-semibold mt-1">H14</div>
            <div className="text-sm text-gray-400">Modüller</div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-10 text-[11px] font-mono text-gray-600 uppercase tracking-[0.3em]"
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
          BVA 1101 · 13. Hafta · Fonksiyonlar
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
