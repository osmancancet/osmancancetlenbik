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
  Type,
  Hash,
  Scissors,
  Search,
  Replace,
  Quote,
  ArrowLeftRight,
  Ruler,
  Braces,
  ListChecks,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Layers,
  Zap,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Calendar,
  Target,
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

/* ---- String indeksleme şeridi -------------------------------- */

function IndexStrip({ word, delay = 0 }: { word: string; delay?: number }) {
  const chars = word.split("");
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="prog-flow-bg p-6 w-full overflow-x-auto"
    >
      <div className="flex flex-col items-center gap-2 min-w-max mx-auto">
        {/* Pozitif indeksler */}
        <div className="flex gap-1.5">
          {chars.map((_, i) => (
            <div key={i} className="w-12 text-center text-[11px] font-mono prog-idx-pos">
              {i}
            </div>
          ))}
        </div>
        {/* Karakter kutuları */}
        <div className="flex gap-1.5">
          {chars.map((ch, i) => (
            <div
              key={i}
              className={`w-12 h-12 rounded-md flex items-center justify-center text-lg font-bold ${
                ch === " " ? "prog-char-cell-space" : "prog-char-cell"
              }`}
            >
              {ch === " " ? "␣" : ch}
            </div>
          ))}
        </div>
        {/* Negatif indeksler */}
        <div className="flex gap-1.5">
          {chars.map((_, i) => (
            <div key={i} className="w-12 text-center text-[11px] font-mono prog-idx-neg">
              {i - chars.length}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center gap-6 text-[11px] font-mono">
        <span className="prog-idx-pos">↑ pozitif indeks (baştan, 0&apos;dan başlar)</span>
        <span className="prog-idx-neg">↓ negatif indeks (sondan, -1&apos;den)</span>
      </div>
    </motion.div>
  );
}

/* ---- Section divider ----------------------------------------- */

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
        <Eyebrow>BVA 1101 · 12. Hafta · Bahar Dönemi</Eyebrow>
        <H1>
          <span className="prog-shimmer">Metin İşlemleri</span>
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Karakter katarı (string) nedir, nasıl dilimlenir, aranır ve dönüştürülür —
          Python ile metni programlamak.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 mt-14 max-w-3xl mx-auto"
        >
          {[
            { icon: Hash, name: "İndeksleme", desc: "s[0], s[-1] ile karaktere eriş", color: "#3776ab" },
            { icon: Scissors, name: "Dilimleme", desc: "s[2:5] ile parça al", color: "#5fa8e0" },
            { icon: Replace, name: "Metotlar", desc: ".upper(), .replace() ...", color: "#ffd43b" },
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
                className="w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center"
                style={{ background: `${l.color}22`, color: l.color, border: `1px solid ${l.color}66` }}
              >
                <l.icon className="w-5 h-5" />
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
      <Eyebrow>Köprü · 11. haftadan 12. haftaya</Eyebrow>
      <H2>Sayılarla çalıştık; şimdi sıra metinlerde</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen haftaya kadar değişkenleri, sayısal tipleri ve listeleri gördük.
        Programların büyük kısmı ise sayılarla değil, metinle uğraşır: kullanıcı adı,
        e-posta, dosya yolu, form verisi. Bu hafta metni işlemenin temellerini kuruyoruz.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#5fa8e0]">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Önceden bildiğimiz</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#5fa8e0] flex-shrink-0" />Değişken ve veri tipleri (int, float, bool)</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#5fa8e0] flex-shrink-0" />Koşullar, döngüler, listeler</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#5fa8e0] flex-shrink-0" />input() her zaman bir metin döndürür</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#ffd43b]">
            <Target className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu haftanın hedefi</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ffd43b] flex-shrink-0" />Karaktere indeks ve dilimle (slicing) erişmek</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ffd43b] flex-shrink-0" />String metotlarıyla arama, değiştirme, biçimleme</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ffd43b] flex-shrink-0" />Metnin değişmez (immutable) olduğunu kavramak</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3 · STRING NEDİR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Temel kavram</Eyebrow>
      <H2>Karakter katarı (string) nedir?</H2>
      <Sub className="mt-3 max-w-3xl">
        String, <span className="text-white font-semibold">sıralı karakterlerden oluşan</span> bir
        veri tipidir (<span className="font-mono text-[#9cdcfe]">str</span>). Python&apos;da tek
        tırnak, çift tırnak veya çok satır için üç tırnakla yazılır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <FeatureCard
          icon={Quote}
          title="Tek &amp; çift tırnak"
          desc="'merhaba' ve &quot;merhaba&quot; aynıdır. Metin içinde kesme işareti varsa diğerini kullan."
          delay={0.0}
          accent="#3776ab"
        />
        <FeatureCard
          icon={FileText}
          title="Üç tırnak"
          desc="'''...''' ile birden çok satır tek bir string olur — uzun metinler için."
          delay={0.1}
          accent="#5fa8e0"
        />
        <FeatureCard
          icon={Layers}
          title="Sıralı &amp; indeksli"
          desc="Her karakterin bir konumu vardır; bu yüzden listeler gibi indekslenebilir."
          delay={0.2}
          accent="#ffd43b"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 prog-card rounded-xl p-5 flex items-start gap-4"
      >
        <Lightbulb className="w-6 h-6 text-[#ffd43b] flex-shrink-0 mt-0.5" />
        <div className="text-sm text-gray-300">
          <span className="text-white font-semibold">Kaçış karakterleri:</span>{" "}
          <span className="font-mono text-[#ce9178]">\n</span> satır sonu,{" "}
          <span className="font-mono text-[#ce9178]">\t</span> sekme,{" "}
          <span className="font-mono text-[#ce9178]">\\</span> ters eğik çizgi,{" "}
          <span className="font-mono text-[#ce9178]">\&quot;</span> ise tırnak demektir.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  4 · BÖLÜM 1/3 · İNDEKSLEME  ───────────────── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="İndeksleme &amp; Dilimleme"
      subtitle="Bir metnin tek bir karakterine veya bir parçasına konumuna göre erişmek."
      glowClass="prog-glow-blue"
      icon={<Hash className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  5 · İNDEKSLEME ŞERİDİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 1 · İndeksleme</Eyebrow>
      <H2 className="mb-2">Her karakterin bir numarası var</H2>
      <Sub className="max-w-3xl mb-6">
        Python&apos;da indeksleme <span className="text-white font-semibold">0&apos;dan</span>{" "}
        başlar. <span className="font-mono text-[#9cdcfe]">s[0]</span> ilk karakter,{" "}
        <span className="font-mono text-[#9cdcfe]">s[-1]</span> ise sondan birincidir.
      </Sub>

      <div className="max-w-4xl mx-auto">
        <IndexStrip word="PROGRAM" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl mx-auto text-sm"
      >
        <div className="prog-card rounded-lg px-4 py-3 font-mono">
          <span className="text-[#9cdcfe]">s[0]</span>{" "}
          <span className="text-gray-500">→</span>{" "}
          <span className="text-[#ce9178]">&apos;P&apos;</span>
        </div>
        <div className="prog-card rounded-lg px-4 py-3 font-mono">
          <span className="text-[#9cdcfe]">s[3]</span>{" "}
          <span className="text-gray-500">→</span>{" "}
          <span className="text-[#ce9178]">&apos;G&apos;</span>
        </div>
        <div className="prog-card rounded-lg px-4 py-3 font-mono">
          <span className="text-[#9cdcfe]">s[-1]</span>{" "}
          <span className="text-gray-500">→</span>{" "}
          <span className="text-[#ce9178]">&apos;M&apos;</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-xs text-gray-500 text-center font-mono"
      >
        Geçersiz indeks → IndexError. Son geçerli indeks her zaman len(s) - 1&apos;dir.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  6 · DİLİMLEME (SLICING)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 1 · Dilimleme</Eyebrow>
      <H2 className="mb-2">Dilimleme · s[başlangıç:bitiş:adım]</H2>
      <Sub className="max-w-3xl mb-6">
        Dilim, bir aralıktaki karakterleri alır. Bitiş indeksi{" "}
        <span className="text-white font-semibold">dahil edilmez</span>. Üç parça da
        isteğe bağlıdır; verilmezse varsayılan kullanılır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CodeEditor
          title="dilimleme.py — Visual Studio Code"
          tabs={["dilimleme.py"]}
          activeTab="dilimleme.py"
          lines={[
            <>
              <span className="tok-var">s</span>
              <span className="tok-operator"> = </span>
              <span className="tok-string">&quot;Programlama&quot;</span>
            </>,
            "",
            <>
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">s</span>
              <span className="tok-punct">[</span>
              <span className="tok-number">0</span>
              <span className="tok-punct">:</span>
              <span className="tok-number">4</span>
              <span className="tok-punct">])</span>
              <span className="tok-comment">  # &apos;Prog&apos;</span>
            </>,
            <>
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">s</span>
              <span className="tok-punct">[</span>
              <span className="tok-number">4</span>
              <span className="tok-punct">:])</span>
              <span className="tok-comment">    # &apos;ramlama&apos;</span>
            </>,
            <>
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">s</span>
              <span className="tok-punct">[:</span>
              <span className="tok-number">4</span>
              <span className="tok-punct">])</span>
              <span className="tok-comment">   # &apos;Prog&apos;</span>
            </>,
            <>
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">s</span>
              <span className="tok-punct">[::</span>
              <span className="tok-number">2</span>
              <span className="tok-punct">])</span>
              <span className="tok-comment">   # &apos;Pormaa&apos;</span>
            </>,
            <>
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">s</span>
              <span className="tok-punct">[::-</span>
              <span className="tok-number">1</span>
              <span className="tok-punct">])</span>
              <span className="tok-comment">  # ters çevir</span>
            </>,
          ]}
        />

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-[#5fa8e0] mb-4">
            Parçaları anlamak
          </div>
          <div className="space-y-3 text-sm">
            <div className="bg-black/30 rounded-lg px-4 py-3">
              <span className="font-mono text-[#9cdcfe]">[2:5]</span>
              <span className="text-gray-400"> → 2, 3, 4. karakterler (5 hariç)</span>
            </div>
            <div className="bg-black/30 rounded-lg px-4 py-3">
              <span className="font-mono text-[#9cdcfe]">[:4]</span>
              <span className="text-gray-400"> → baştan 4. indekse kadar</span>
            </div>
            <div className="bg-black/30 rounded-lg px-4 py-3">
              <span className="font-mono text-[#9cdcfe]">[4:]</span>
              <span className="text-gray-400"> → 4. indeksten sona kadar</span>
            </div>
            <div className="bg-black/30 rounded-lg px-4 py-3">
              <span className="font-mono text-[#9cdcfe]">[::2]</span>
              <span className="text-gray-400"> → birer atlayarak (adım 2)</span>
            </div>
            <div className="bg-black/30 rounded-lg px-4 py-3">
              <span className="font-mono text-[#9cdcfe]">[::-1]</span>
              <span className="text-gray-400"> → tersten oku (palindrom kontrolü)</span>
            </div>
          </div>
          <div className="mt-4 text-[11px] text-gray-500">
            Dilim sınırı taşarsa hata vermez; var olan kadarını döndürür.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  7 · DEĞİŞMEZLİK (IMMUTABILITY)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Önemli kural</Eyebrow>
      <H2 className="mb-2">String&apos;ler değişmezdir (immutable)</H2>
      <Sub className="max-w-3xl mb-6">
        Bir karakteri yerinde değiştiremezsin. Her &quot;değiştirme&quot; işlemi aslında{" "}
        <span className="text-white font-semibold">yeni bir string üretir</span>; eskisi olduğu
        gibi kalır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4 text-[#f87171]">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Çalışmaz</span>
          </div>
          <div className="font-mono text-sm space-y-1 bg-black/30 rounded-lg p-4">
            <div><span className="tok-var">s</span> = <span className="tok-string">&quot;kedi&quot;</span></div>
            <div><span className="tok-var">s</span><span className="tok-punct">[</span><span className="tok-number">0</span><span className="tok-punct">]</span> = <span className="tok-string">&quot;b&quot;</span></div>
            <div className="text-[#f87171] mt-2">TypeError: &apos;str&apos; object does</div>
            <div className="text-[#f87171]">not support item assignment</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4 text-[#86efac]">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Doğru yaklaşım</span>
          </div>
          <div className="font-mono text-sm space-y-1 bg-black/30 rounded-lg p-4">
            <div><span className="tok-var">s</span> = <span className="tok-string">&quot;kedi&quot;</span></div>
            <div><span className="tok-var">s</span> = <span className="tok-string">&quot;b&quot;</span> + <span className="tok-var">s</span><span className="tok-punct">[</span><span className="tok-number">1</span><span className="tok-punct">:]</span></div>
            <div className="text-[#86efac] mt-2"># yeni string: &quot;bedi&quot;</div>
            <div className="text-gray-500 mt-1"># ya da .replace() kullan</div>
          </div>
          <div className="mt-4 text-[11px] text-gray-500">
            Karakteri dilimle koru, yeniden birleştir, sonucu yeni değişkene ata.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  8 · BÖLÜM 2/3 · METOTLAR  ───────────────── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="String Metotları"
      subtitle="Metni dönüştüren, arayan ve temizleyen hazır fonksiyonlar — kendin yazma, çağır."
      glowClass="prog-glow-yellow"
      icon={<Replace className="w-14 h-14 text-[#1a1a1a]" />}
    />
  ),

  /* ─────────────────  9 · METOT TABLOSU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 2 · En sık kullanılan metotlar</Eyebrow>
      <H2>Bir metotla bir satırda iş bitsin</H2>
      <Sub className="mt-3 max-w-3xl">
        Metot, bir nesnenin üzerinde nokta ile çağrılan fonksiyondur:{" "}
        <span className="font-mono text-[#9cdcfe]">s.upper()</span>. String hiç değişmez;
        metot her zaman <span className="text-white font-semibold">yeni bir değer döndürür</span>.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 prog-card rounded-xl overflow-hidden"
      >
        <table className="prog-compare">
          <thead>
            <tr>
              <th style={{ width: "26%" }}>Metot</th>
              <th style={{ width: "40%" }}>Ne yapar?</th>
              <th>Örnek &amp; sonuç</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-mono text-[#9cdcfe]">.upper() / .lower()</td>
              <td>Büyük / küçük harfe çevirir</td>
              <td className="font-mono">&quot;Abc&quot;.upper() → &quot;ABC&quot;</td>
            </tr>
            <tr>
              <td className="font-mono text-[#9cdcfe]">.strip()</td>
              <td>Baş ve sondaki boşlukları siler</td>
              <td className="font-mono">&quot; veri &quot;.strip() → &quot;veri&quot;</td>
            </tr>
            <tr>
              <td className="font-mono text-[#9cdcfe]">.replace(a, b)</td>
              <td>a&apos;ları b ile değiştirir</td>
              <td className="font-mono">&quot;a-b&quot;.replace(&quot;-&quot;,&quot;_&quot;) → &quot;a_b&quot;</td>
            </tr>
            <tr>
              <td className="font-mono text-[#9cdcfe]">.split(ayraç)</td>
              <td>Metni listeye böler</td>
              <td className="font-mono">&quot;a,b,c&quot;.split(&quot;,&quot;) → [&apos;a&apos;,&apos;b&apos;,&apos;c&apos;]</td>
            </tr>
            <tr>
              <td className="font-mono text-[#9cdcfe]">ayraç.join(liste)</td>
              <td>Listeyi metne birleştirir</td>
              <td className="font-mono">&quot;-&quot;.join([&apos;a&apos;,&apos;b&apos;]) → &quot;a-b&quot;</td>
            </tr>
            <tr>
              <td className="font-mono text-[#9cdcfe]">.find(alt) / .index(alt)</td>
              <td>Alt metnin konumunu bulur</td>
              <td className="font-mono">&quot;merhaba&quot;.find(&quot;h&quot;) → 3</td>
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
        Bulamazsa: .find() → -1 döner (hata vermez), .index() ise ValueError fırlatır.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  10 · METOTLAR CANLI · TERMİNAL  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Canlı deneme · Python yorumlayıcısı</Eyebrow>
      <H2 className="mb-2">Metotları zincirleyebiliriz</H2>
      <Sub className="max-w-3xl mb-6">
        Bir metodun çıktısı yine bir string olduğundan üzerine başka metot çağrılabilir.
        Aşağıdaki örnekte boşluk temizleniyor, küçük harfe çevriliyor ve değiştiriliyor.
      </Sub>

      <CodeEditor
        title="repl — Python 3.12"
        tabs={["metotlar.py"]}
        activeTab="metotlar.py"
        lines={[
          <>
            <span className="tok-var">e</span>
            <span className="tok-operator"> = </span>
            <span className="tok-string">&quot;  Ali.Veli@KURUM.tr  &quot;</span>
          </>,
          <>
            <span className="tok-var">temiz</span>
            <span className="tok-operator"> = </span>
            <span className="tok-var">e</span>
            <span className="tok-punct">.</span>
            <span className="tok-fname">strip</span>
            <span className="tok-punct">().</span>
            <span className="tok-fname">lower</span>
            <span className="tok-punct">()</span>
          </>,
          <>
            <span className="tok-builtin">print</span>
            <span className="tok-punct">(</span>
            <span className="tok-var">temiz</span>
            <span className="tok-punct">)</span>
          </>,
          "",
          <>
            <span className="tok-var">kullanici</span>
            <span className="tok-operator"> = </span>
            <span className="tok-var">temiz</span>
            <span className="tok-punct">.</span>
            <span className="tok-fname">split</span>
            <span className="tok-punct">(</span>
            <span className="tok-string">&quot;@&quot;</span>
            <span className="tok-punct">)[</span>
            <span className="tok-number">0</span>
            <span className="tok-punct">]</span>
          </>,
          <>
            <span className="tok-builtin">print</span>
            <span className="tok-punct">(</span>
            <span className="tok-var">kullanici</span>
            <span className="tok-punct">)</span>
          </>,
        ]}
        terminal={
          <div className="leading-relaxed">
            <div>
              <span className="prog-terminal-prompt">user@mcbu</span>
              <span className="text-gray-500"> $ </span>
              <span className="prog-terminal-out">python metotlar.py</span>
            </div>
            <div className="prog-terminal-out">ali.veli@kurum.tr</div>
            <div className="prog-terminal-out">ali.veli</div>
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

  /* ─────────────────  11 · ARAMA & KONTROL METOTLARI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 2 · Arama ve doğrulama</Eyebrow>
      <H2>Metin içinde aramak ve sınamak</H2>
      <Sub className="mt-3 max-w-3xl">
        Form ve girdi denetiminde en çok bunlara ihtiyaç duyarsın: bir parça var mı,
        nasıl başlıyor, sadece rakam mı içeriyor?
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={Search}
          title="in operatörü"
          desc="'@' in eposta → True/False. Bir alt metnin var olup olmadığını en kısa yoldan sınar."
          delay={0.0}
          accent="#3776ab"
        />
        <FeatureCard
          icon={Type}
          title=".startswith / .endswith"
          desc="url.startswith('https') veya ad.endswith('.pdf') ön/son ekini kontrol eder."
          delay={0.1}
          accent="#5fa8e0"
        />
        <FeatureCard
          icon={ListChecks}
          title=".isdigit / .isalpha"
          desc="Metnin yalnızca rakam veya yalnızca harf içerip içermediğini True/False döndürür."
          delay={0.2}
          accent="#ffd43b"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 prog-card rounded-xl p-5"
      >
        <div className="text-xs font-mono uppercase tracking-widest text-[#5fa8e0] mb-3">
          Tipik kontrol · basit e-posta doğrulama
        </div>
        <div className="font-mono text-sm bg-black/30 rounded-lg p-4 space-y-1">
          <div>
            <span className="tok-keyword">if</span>{" "}
            <span className="tok-string">&quot;@&quot;</span>{" "}
            <span className="tok-keyword">in</span>{" "}
            <span className="tok-var">eposta</span>{" "}
            <span className="tok-keyword">and</span>{" "}
            <span className="tok-var">eposta</span>
            <span className="tok-punct">.</span>
            <span className="tok-fname">endswith</span>
            <span className="tok-punct">(</span>
            <span className="tok-string">&quot;.tr&quot;</span>
            <span className="tok-punct">):</span>
          </div>
          <div className="pl-6">
            <span className="tok-builtin">print</span>
            <span className="tok-punct">(</span>
            <span className="tok-string">&quot;Geçerli görünüyor&quot;</span>
            <span className="tok-punct">)</span>
          </div>
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  12 · BÖLÜM 3/3 · BİÇİMLEME  ───────────────── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Birleştirme &amp; Biçimleme"
      subtitle="Metinleri yan yana getirmek ve değişkenleri okunabilir bir çıktıya yerleştirmek."
      glowClass="prog-glow-green"
      icon={<Braces className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  13 · BİRLEŞTİRME & f-string  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 3 · Birleştirme yöntemleri</Eyebrow>
      <H2 className="mb-2">Üç yol, tercih edilen tek bir tane</H2>
      <Sub className="max-w-3xl mb-6">
        Değişkeni metne katmanın birkaç yolu var. Modern Python&apos;da{" "}
        <span className="text-white font-semibold">f-string</span> en okunabilir ve en hızlı
        olanıdır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prog-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <ArrowLeftRight className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-gray-400">+ ile</span>
          </div>
          <div className="font-mono text-[12px] bg-black/30 rounded-lg p-3 leading-relaxed">
            <div><span className="tok-string">&quot;Sayı: &quot;</span> + <span className="tok-builtin">str</span><span className="tok-punct">(</span><span className="tok-var">n</span><span className="tok-punct">)</span></div>
          </div>
          <div className="text-[11px] text-gray-500 mt-3">
            str() ile çevirmeyi unutursan TypeError. Hantal.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prog-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-[#5fa8e0]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#5fa8e0]">.format()</span>
          </div>
          <div className="font-mono text-[12px] bg-black/30 rounded-lg p-3 leading-relaxed">
            <div><span className="tok-string">&quot;Sayı: {`{}`}&quot;</span>.<span className="tok-fname">format</span><span className="tok-punct">(</span><span className="tok-var">n</span><span className="tok-punct">)</span></div>
          </div>
          <div className="text-[11px] text-gray-500 mt-3">
            Daha okunabilir; eski kod tabanlarında yaygın.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prog-card-yellow rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-[#ffd43b]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#ffd43b]">f-string (önerilen)</span>
          </div>
          <div className="font-mono text-[12px] bg-black/30 rounded-lg p-3 leading-relaxed">
            <div><span className="tok-fstring">f</span><span className="tok-string">&quot;Sayı: {`{`}</span><span className="tok-var">n</span><span className="tok-string">{`}`}&quot;</span></div>
          </div>
          <div className="text-[11px] text-gray-300 mt-3">
            Değişkeni doğrudan süslü parantezin içine yaz. Kısa, net, hızlı.
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 prog-card rounded-lg px-4 py-3 text-sm text-gray-300 flex items-start gap-3"
      >
        <Lightbulb className="w-5 h-5 text-[#ffd43b] flex-shrink-0 mt-0.5" />
        <span>
          f-string içinde biçimlendirme de yapılır:{" "}
          <span className="font-mono text-[#d7ba7d]">f&quot;{`{pi:.2f}`}&quot;</span> →{" "}
          <span className="font-mono text-[#ce9178]">&quot;3.14&quot;</span> (iki ondalık),{" "}
          <span className="font-mono text-[#d7ba7d]">f&quot;{`{ad:>10}`}&quot;</span> ise sağa yaslar.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  14 · UYGULAMALI · KARAKTER SAYACI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Birlikte yazalım · küçük program</Eyebrow>
      <H2 className="mb-2">Kelime ve karakter sayan bir araç</H2>
      <Sub className="max-w-3xl mb-6">
        Öğrendiğimiz parçaları birleştirelim: kullanıcıdan cümle al, boşlukları temizle,
        uzunluğunu ölç ve kelimelere böl.
      </Sub>

      <CodeEditor
        title="sayac.py — Visual Studio Code"
        tabs={["sayac.py"]}
        activeTab="sayac.py"
        lines={[
          <>
            <span className="tok-var">cumle</span>
            <span className="tok-operator"> = </span>
            <span className="tok-builtin">input</span>
            <span className="tok-punct">(</span>
            <span className="tok-string">&quot;Bir cümle yaz: &quot;</span>
            <span className="tok-punct">).</span>
            <span className="tok-fname">strip</span>
            <span className="tok-punct">()</span>
          </>,
          "",
          <>
            <span className="tok-var">kelimeler</span>
            <span className="tok-operator"> = </span>
            <span className="tok-var">cumle</span>
            <span className="tok-punct">.</span>
            <span className="tok-fname">split</span>
            <span className="tok-punct">()</span>
          </>,
          <>
            <span className="tok-var">harf_sayisi</span>
            <span className="tok-operator"> = </span>
            <span className="tok-builtin">len</span>
            <span className="tok-punct">(</span>
            <span className="tok-var">cumle</span>
            <span className="tok-punct">.</span>
            <span className="tok-fname">replace</span>
            <span className="tok-punct">(</span>
            <span className="tok-string">&quot; &quot;</span>
            <span className="tok-punct">, </span>
            <span className="tok-string">&quot;&quot;</span>
            <span className="tok-punct">))</span>
          </>,
          "",
          <>
            <span className="tok-builtin">print</span>
            <span className="tok-punct">(</span>
            <span className="tok-fstring">f</span>
            <span className="tok-string">&quot;Kelime: </span>
            <span className="tok-punct">{"{"}</span>
            <span className="tok-builtin">len</span>
            <span className="tok-punct">(</span>
            <span className="tok-var">kelimeler</span>
            <span className="tok-punct">)</span>
            <span className="tok-punct">{"}"}</span>
            <span className="tok-string">, Harf: </span>
            <span className="tok-punct">{"{"}</span>
            <span className="tok-var">harf_sayisi</span>
            <span className="tok-punct">{"}"}</span>
            <span className="tok-string">&quot;</span>
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
            <div className="prog-terminal-out">
              Bir cümle yaz: <span className="prog-terminal-user">metin işlemek kolaymış</span>
            </div>
            <div className="prog-terminal-out">Kelime: 3, Harf: 19</div>
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

  /* ─────────────────  15 · BU HAFTA GÖREV  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta sizin göreviniz</Eyebrow>
      <H2>Kendi metin araçlarını yaz</H2>
      <Sub className="mt-3 max-w-3xl">
        Aşağıdaki beş küçük alıştırmayı kendi makinende çöz; sonraki derse çalışan kodu
        ve örnek çıktıyı getir.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 prog-card rounded-xl p-6 max-w-3xl mx-auto"
      >
        <div className="text-xs uppercase tracking-wider text-[#5fa8e0] mb-4 font-mono flex items-center gap-2">
          <ListChecks className="w-4 h-4" />
          Görev listesi · Hafta 12
        </div>
        <div className="space-y-3">
          {[
            { t: "Adını ters çevirip yazdır", d: "input() ile adı al, s[::-1] dilimiyle ters çevir" },
            { t: "Cümledeki kelimeleri say", d: "cumle.split() listesinin len()&apos;ini yazdır" },
            { t: "Bir kelimeyi başkasıyla değiştir", d: ".replace(&quot;eski&quot;, &quot;yeni&quot;) sonucunu göster" },
            { t: "Palindrom mu kontrol et", d: "s == s[::-1] ise &apos;palindrom&apos; yazdır (ör. &quot;kayak&quot;)" },
            { t: "Basit e-posta doğrula", d: "&apos;@&apos; in e ve e.endswith(&apos;.tr&apos;) koşulunu sına" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="flex items-start gap-3 bg-black/30 rounded-lg p-3"
            >
              <div className="w-6 h-6 rounded-md border border-[#5fa8e0]/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#5fa8e0]" />
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
          <Ruler className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>12. hafta tamamlandı · sıradaki: Hata Yönetimi</Eyebrow>
        <H1>
          <span className="prog-shimmer">Hatalar &amp; İstisnalar</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta yanlış girdide programın çöktüğünü gördük (IndexError, ValueError).
          Gelecek hafta bunları try / except ile yakalamayı ve programı ayakta tutmayı öğreneceğiz.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <div className="prog-card rounded-xl p-5">
            <Calendar className="w-5 h-5 text-[#5fa8e0] mb-2 mx-auto" />
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
              Ders saati
            </div>
            <div className="text-white font-semibold mt-1">Perşembe</div>
            <div className="text-sm text-gray-400">09:55 — 12:30</div>
          </div>

          <div className="prog-card rounded-xl p-5">
            <Target className="w-5 h-5 text-[#5fa8e0] mb-2 mx-auto" />
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
              Hazırlık
            </div>
            <div className="text-white font-semibold mt-1">5 alıştırma</div>
            <div className="text-sm text-gray-400">çalışan kodla getir</div>
          </div>

          <div className="prog-card rounded-xl p-5">
            <FileText className="w-5 h-5 text-[#5fa8e0] mb-2 mx-auto" />
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
              Sonraki hafta
            </div>
            <div className="text-white font-semibold mt-1">H13</div>
            <div className="text-sm text-gray-400">Hata yönetimi</div>
          </div>
        </div>

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
          BVA 1101 · 12. Hafta · Metin (String) İşlemleri
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
