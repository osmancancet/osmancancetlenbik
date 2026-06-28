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
  Grid3x3,
  Table2,
  Rows3,
  Columns3,
  Layers,
  Brackets,
  Hash,
  Repeat,
  Target,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  Check,
  Sigma,
  Image as ImageIcon,
  Map as MapIcon,
  Gamepad2,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
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

/* ---- Matris ızgarası (satır × sütun) ------------------------- */

function MatrixGrid({
  data,
  highlight,
  showIndices = true,
  delay = 0,
}: {
  data: (number | string)[][];
  highlight?: [number, number];
  showIndices?: boolean;
  delay?: number;
}) {
  const cols = data[0]?.length ?? 0;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="prog-flow-bg p-6 inline-block"
    >
      <div className="inline-block">
        {showIndices && (
          <div className="flex mb-2 ml-10">
            {Array.from({ length: cols }).map((_, c) => (
              <div key={c} className="w-12 text-center prog-index">
                [{c}]
              </div>
            ))}
          </div>
        )}
        {data.map((row, r) => (
          <div key={r} className="flex items-center mb-2">
            {showIndices && (
              <div className="w-10 prog-index text-right pr-2">[{r}]</div>
            )}
            {row.map((val, c) => {
              const isHi = highlight && highlight[0] === r && highlight[1] === c;
              return (
                <div
                  key={c}
                  className={`w-12 h-12 mr-0 text-sm ${
                    isHi ? "prog-cell prog-cell-active" : "prog-cell"
                  }`}
                  style={{ marginRight: 8 }}
                >
                  {val}
                </div>
              );
            })}
          </div>
        ))}
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
        <Eyebrow>BVA 1101 · 10. Hafta · Bahar Dönemi</Eyebrow>
        <H1>
          <span className="prog-shimmer">Çok Boyutlu Diziler</span>
          <br />
          <span className="text-white/90">ve Matrisler</span>
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Tek satır listeden ızgaraya geçiyoruz: satır ve sütunla düşünmek, iç içe
          döngüyle gezmek.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 mt-14 max-w-3xl mx-auto"
        >
          {[
            { name: "Liste içinde liste", tag: "[[ ]]", color: "#3776ab", desc: "matris[satır][sütun]" },
            { name: "İç içe döngü", tag: "for·for", color: "#ffd43b", desc: "satırı, sonra sütunu gez" },
            { name: "Uygulama", tag: "grid", color: "#4ec9b0", desc: "tablo · görüntü · oyun" },
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
                className="w-12 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center text-[11px] font-mono font-bold"
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
      <Eyebrow>Köprü · 9. haftadan 10. haftaya</Eyebrow>
      <H2>Tek boyutlu listeyi biliyoruz — peki ya tablo?</H2>
      <Sub className="mt-3 max-w-3xl">
        9. hafta diziyi/listeyi tek bir sırada öğrendik:{" "}
        <span className="font-mono text-[#5fa8e0]">notlar[3]</span> dördüncü elemanı verir.
        Ama bir sınıf çizelgesi, satranç tahtası ya da Excel sayfası tek sıra değil —
        satır <span className="text-white">ve</span> sütundan oluşur. Bu hafta o ikinci ekseni ekliyoruz.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#5fa8e0]">
            <Brackets className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Tek boyut · 1B</span>
          </div>
          <div className="font-mono text-sm text-gray-300 bg-black/30 rounded px-3 py-2 mb-3">
            notlar = [70, 85, 90, 60]
          </div>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#5fa8e0] flex-shrink-0" />Tek indis: <span className="font-mono text-white ml-1">notlar[2]</span> &rarr; 90</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#5fa8e0] flex-shrink-0" />Bir <span className="text-white">for</span> döngüsü gezmeye yeter.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#ffd43b]">
            <Grid3x3 className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">İki boyut · 2B</span>
          </div>
          <div className="font-mono text-sm text-gray-300 bg-black/30 rounded px-3 py-2 mb-3">
            tablo = [[70, 85], [90, 60]]
          </div>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ffd43b] flex-shrink-0" />İki indis: <span className="font-mono text-white ml-1">tablo[1][0]</span> &rarr; 90</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ffd43b] flex-shrink-0" />İç içe <span className="text-white">for</span> ister: satır, sonra sütun.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3 · BU HAFTANIN HEDEFİ / AKIŞ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: kavram &rarr; gezinti &rarr; uygulama</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce iki boyutlu dizinin ne olduğunu ve nasıl oluşturulduğunu görüyoruz; sonra
        iç içe döngüyle gezmeyi öğreniyoruz; en sonda gerçek kullanım alanlarına ve bir
        alıştırmaya geçiyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Kavram & Tanım", items: ["Liste içinde liste", "Satır × sütun mantığı", "matris[i][j] erişimi"], icon: Grid3x3, accent: "#3776ab" },
          { range: "02", title: "İç İçe Döngü", items: ["Dış döngü = satır", "İç döngü = sütun", "Toplama / arama / dönüştürme"], icon: Repeat, accent: "#ffd43b" },
          { range: "03", title: "Uygulama", items: ["Tablo & not çizelgesi", "Görüntü pikselleri", "Oyun tahtası (XOX)"], icon: Gamepad2, accent: "#4ec9b0" },
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

  /* ─────────────────  4 · SECTION 1/3 · KAVRAM  ───────────────── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Matris Nedir?"
      subtitle="İki boyutlu dizi = listeyi eleman olarak tutan bir liste. Satır ve sütunla adreslenen bir ızgara."
      glowClass="prog-glow-blue"
      icon={<Grid3x3 className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  5 · SATIR × SÜTUN / İNDİS  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 1 · Kavram</Eyebrow>
      <H2>Satır, sütun ve iki indis</H2>
      <Sub className="mt-3 max-w-3xl">
        İki boyutlu bir dizide her hücreye <span className="text-white font-semibold">iki</span>{" "}
        sayıyla ulaşırsın: önce satır (i), sonra sütun (j). İndis her zaman{" "}
        <span className="font-mono text-[#5fa8e0]">0</span>&apos;dan başlar.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 items-center">
        <div className="flex justify-center">
          <MatrixGrid
            data={[
              [12, 7, 3],
              [9, 25, 6],
              [4, 18, 11],
            ]}
            highlight={[1, 1]}
            delay={0.2}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-[#5fa8e0] mb-4">
            3 × 3 matris · erişim
          </div>
          <div className="space-y-3 font-mono text-sm">
            <div className="bg-black/30 rounded px-3 py-2 text-gray-300">
              <span className="text-[#9cdcfe]">m</span>[<span className="text-[#b5cea8]">1</span>][<span className="text-[#b5cea8]">1</span>] &rarr; <span className="text-[#ffe169]">25</span>
            </div>
            <div className="bg-black/30 rounded px-3 py-2 text-gray-300">
              <span className="text-[#9cdcfe]">m</span>[<span className="text-[#b5cea8]">0</span>][<span className="text-[#b5cea8]">2</span>] &rarr; <span className="text-white">3</span> <span className="text-gray-500"># 1. satır, 3. sütun</span>
            </div>
            <div className="bg-black/30 rounded px-3 py-2 text-gray-300">
              <span className="text-[#9cdcfe]">m</span>[<span className="text-[#b5cea8]">2</span>][<span className="text-[#b5cea8]">0</span>] &rarr; <span className="text-white">4</span>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500 leading-relaxed">
            Sarı hücre <span className="font-mono text-[#ffe169]">m[1][1]</span> &mdash;
            ikinci satır (i=1) ile ikinci sütunun (j=1) kesişimi.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  6 · OLUŞTURMA YÖNTEMLERİ (KOD)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 1 · Oluşturma</Eyebrow>
      <H2 className="mb-2">İki boyutlu dizi nasıl oluşturulur?</H2>
      <Sub className="max-w-3xl">
        Python&apos;da ayrı bir &quot;matris&quot; tipi yoktur; bir listenin içine satırları liste
        olarak koyarsın. Boş ızgarayı <span className="text-white">döngüyle</span> üretmek en güvenli yöntemdir.
      </Sub>

      <div className="mt-6">
        <CodeEditor
          title="matris_olustur.py — Visual Studio Code"
          tabs={["matris_olustur.py", "README.md"]}
          activeTab="matris_olustur.py"
          lines={[
            <>
              <span className="tok-comment"># 1) doğrudan yazarak (3 satır, 3 sütun)</span>
            </>,
            <>
              <span className="tok-var">m</span>
              <span className="tok-operator"> = </span>
              <span className="tok-punct">[[</span>
              <span className="tok-number">1</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">2</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">3</span>
              <span className="tok-punct">], [</span>
              <span className="tok-number">4</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">5</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">6</span>
              <span className="tok-punct">], [</span>
              <span className="tok-number">7</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">8</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">9</span>
              <span className="tok-punct">]]</span>
            </>,
            "",
            <>
              <span className="tok-comment"># 2) sıfırlarla doldurulmuş 3x3 boş ızgara</span>
            </>,
            <>
              <span className="tok-var">satir</span>
              <span className="tok-punct">, </span>
              <span className="tok-var">sutun</span>
              <span className="tok-operator"> = </span>
              <span className="tok-number">3</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">3</span>
            </>,
            <>
              <span className="tok-var">grid</span>
              <span className="tok-operator"> = </span>
              <span className="tok-punct">[[</span>
              <span className="tok-number">0</span>
              <span className="tok-punct">] * </span>
              <span className="tok-var">sutun</span>
              <span className="tok-keyword"> for </span>
              <span className="tok-var">_</span>
              <span className="tok-keyword"> in </span>
              <span className="tok-builtin">range</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">satir</span>
              <span className="tok-punct">)]</span>
            </>,
            "",
            <>
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">grid</span>
              <span className="tok-punct">)</span>
            </>,
          ]}
          terminal={
            <div className="leading-relaxed">
              <div>
                <span className="prog-terminal-prompt">user@mcbu</span>
                <span className="text-gray-500"> $ </span>
                <span className="prog-terminal-out">python matris_olustur.py</span>
              </div>
              <div className="prog-terminal-out">[[0, 0, 0], [0, 0, 0], [0, 0, 0]]</div>
              <div>
                <span className="prog-terminal-prompt">user@mcbu</span>
                <span className="text-gray-500"> $ </span>
                <span className="animate-pulse">▌</span>
              </div>
            </div>
          }
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-4 prog-card-yellow rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <AlertTriangle className="w-4 h-4 text-[#ffd43b] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Tuzak:</span>{" "}
          <span className="font-mono">[[0]*3]*3</span> yazma! Bu, aynı satır listesini üç kez
          paylaştırır; bir hücreyi değiştirince üç satır birden değişir. Yukarıdaki{" "}
          <span className="font-mono text-[#ffd43b]">for</span>&apos;lu yöntem her satırı ayrı oluşturur.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  7 · DÜZ vs DÜZENSİZ / SHAPE  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 1 · Boyut bilgisi</Eyebrow>
      <H2>Boyutu öğrenmek &amp; düzenli olmak</H2>
      <Sub className="mt-3 max-w-3xl">
        Bir matrisin kaç satır kaç sütun olduğunu <span className="font-mono text-[#5fa8e0]">len()</span> ile
        ölçersin. &quot;Düzenli&quot; matriste her satır aynı uzunlukta olmalı; aksi halde indis hatası
        kaçınılmazdır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4 text-[#4ec9b0]">
            <Rows3 className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Boyutu ölçmek</span>
          </div>
          <div className="space-y-2 font-mono text-[13px]">
            <div className="bg-black/30 rounded px-3 py-2 text-gray-300">
              <span className="text-[#9cdcfe]">satir_sayisi</span> = <span className="text-[#4ec9b0]">len</span>(m) <span className="text-gray-500"># 3</span>
            </div>
            <div className="bg-black/30 rounded px-3 py-2 text-gray-300">
              <span className="text-[#9cdcfe]">sutun_sayisi</span> = <span className="text-[#4ec9b0]">len</span>(m[<span className="text-[#b5cea8]">0</span>]) <span className="text-gray-500"># 3</span>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <Columns3 className="w-5 h-5 text-[#5fa8e0]" />
            <div className="text-xs text-gray-400">
              <span className="text-white">len(m)</span> satır sayısını,{" "}
              <span className="text-white">len(m[0])</span> ilk satırın sütun sayısını verir.
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4 text-[#ffd43b]">
            <Table2 className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Düzenli mi?</span>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#4ec9b0] mt-0.5 flex-shrink-0" />
              <div className="text-gray-300">
                <span className="font-mono text-[#86efac]">[[1,2,3],[4,5,6]]</span>
                <div className="text-xs text-gray-500">Her satır 3 eleman &mdash; düzenli (2×3).</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#f87171] mt-0.5 flex-shrink-0" />
              <div className="text-gray-300">
                <span className="font-mono text-[#fca5a5]">[[1,2,3],[4,5]]</span>
                <div className="text-xs text-gray-500">Satırlar farklı uzunlukta &mdash; düzensiz; m[1][2] hata verir.</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  8 · SECTION 2/3 · İÇ İÇE DÖNGÜ  ───────────────── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="İç İçe Döngüyle Gezmek"
      subtitle="Dış döngü satırı, iç döngü sütunu dolaşır. Her hücreye tam bir kez uğramanın standart deseni."
      glowClass="prog-glow-yellow"
      icon={<Repeat className="w-14 h-14 text-[#1a1a1a]" />}
    />
  ),

  /* ─────────────────  9 · İÇ İÇE DÖNGÜ DESENİ (KOD)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 2 · Standart desen</Eyebrow>
      <H2 className="mb-2">Satır satır, hücre hücre</H2>
      <Sub className="max-w-3xl">
        Bir matrisin tamamını gezmek için iki döngü iç içe girer: dıştaki <span className="text-white">i</span>{" "}
        satırı, içteki <span className="text-white">j</span> sütunu sayar. İçteki gövde her hücre için bir kez çalışır.
      </Sub>

      <div className="mt-6">
        <CodeEditor
          title="gezinti.py — Visual Studio Code"
          tabs={["gezinti.py"]}
          activeTab="gezinti.py"
          lines={[
            <>
              <span className="tok-var">m</span>
              <span className="tok-operator"> = </span>
              <span className="tok-punct">[[</span>
              <span className="tok-number">1</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">2</span>
              <span className="tok-punct">], [</span>
              <span className="tok-number">3</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">4</span>
              <span className="tok-punct">], [</span>
              <span className="tok-number">5</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">6</span>
              <span className="tok-punct">]]</span>
            </>,
            "",
            <>
              <span className="tok-keyword">for</span>
              <span className="tok-var"> i</span>
              <span className="tok-keyword"> in </span>
              <span className="tok-builtin">range</span>
              <span className="tok-punct">(</span>
              <span className="tok-builtin">len</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">m</span>
              <span className="tok-punct">)):</span>
              <span className="tok-comment">          # satırlar</span>
            </>,
            <>
              {"    "}
              <span className="tok-keyword">for</span>
              <span className="tok-var"> j</span>
              <span className="tok-keyword"> in </span>
              <span className="tok-builtin">range</span>
              <span className="tok-punct">(</span>
              <span className="tok-builtin">len</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">m</span>
              <span className="tok-punct">[</span>
              <span className="tok-var">i</span>
              <span className="tok-punct">])):</span>
              <span className="tok-comment">   # sütunlar</span>
            </>,
            <>
              {"        "}
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-fstring">f</span>
              <span className="tok-string">&quot;m[</span>
              <span className="tok-punct">{"{"}</span>
              <span className="tok-var">i</span>
              <span className="tok-punct">{"}"}</span>
              <span className="tok-string">][</span>
              <span className="tok-punct">{"{"}</span>
              <span className="tok-var">j</span>
              <span className="tok-punct">{"}"}</span>
              <span className="tok-string">] = </span>
              <span className="tok-punct">{"{"}</span>
              <span className="tok-var">m</span>
              <span className="tok-punct">[</span>
              <span className="tok-var">i</span>
              <span className="tok-punct">][</span>
              <span className="tok-var">j</span>
              <span className="tok-punct">]{"}"}</span>
              <span className="tok-string">&quot;</span>
              <span className="tok-punct">)</span>
            </>,
          ]}
          terminal={
            <div className="leading-relaxed">
              <div>
                <span className="prog-terminal-prompt">user@mcbu</span>
                <span className="text-gray-500"> $ </span>
                <span className="prog-terminal-out">python gezinti.py</span>
              </div>
              <div className="prog-terminal-out">m[0][0] = 1</div>
              <div className="prog-terminal-out">m[0][1] = 2</div>
              <div className="prog-terminal-out">m[1][0] = 3</div>
              <div className="prog-terminal-out">m[1][1] = 4</div>
              <div className="prog-terminal-out">m[2][0] = 5</div>
              <div className="prog-terminal-out">m[2][1] = 6</div>
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

  /* ─────────────────  10 · TOPLAM HESAPLAMA (KOD + GRID)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 2 · İşlem örneği</Eyebrow>
      <H2 className="mb-2">Tüm elemanların toplamı</H2>
      <Sub className="max-w-3xl mb-6">
        Klasik bir görev: matristeki bütün sayıları topla. Bir <span className="font-mono text-[#5fa8e0]">toplam</span>{" "}
        değişkeni tut, her hücrede üzerine ekle. Aşağıdaki ızgaranın toplamı{" "}
        <span className="text-white font-semibold">45</span>.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center">
          <MatrixGrid
            data={[
              [1, 2, 3],
              [4, 5, 6],
              [7, 8, 9],
            ]}
            showIndices={false}
            delay={0.2}
          />
        </div>
        <CodeEditor
          title="toplam.py"
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
              <span className="tok-var"> satir</span>
              <span className="tok-keyword"> in </span>
              <span className="tok-var">m</span>
              <span className="tok-punct">:</span>
            </>,
            <>
              {"    "}
              <span className="tok-keyword">for</span>
              <span className="tok-var"> deger</span>
              <span className="tok-keyword"> in </span>
              <span className="tok-var">satir</span>
              <span className="tok-punct">:</span>
            </>,
            <>
              {"        "}
              <span className="tok-var">toplam</span>
              <span className="tok-operator"> += </span>
              <span className="tok-var">deger</span>
            </>,
            "",
            <>
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">toplam</span>
              <span className="tok-punct">)</span>
              <span className="tok-comment">  # 45</span>
            </>,
          ]}
          terminal={
            <div className="leading-relaxed">
              <div>
                <span className="prog-terminal-prompt">user@mcbu</span>
                <span className="text-gray-500"> $ </span>
                <span className="prog-terminal-out">python toplam.py</span>
              </div>
              <div className="prog-terminal-out">45</div>
            </div>
          }
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-4 text-xs text-gray-500 text-center font-mono"
      >
        İndise ihtiyacın yoksa <span className="text-[#5fa8e0]">for satir in m</span> doğrudan satırları,
        içteki döngü değerleri verir &mdash; daha okunaklı.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  11 · OPERASYONLAR TABLOSU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 2 · Sık işlemler</Eyebrow>
      <H2>Matrisle ne yapabilirsin?</H2>
      <Sub className="mt-3 max-w-3xl">
        Aynı iç içe döngü deseniyle çok farklı işler çözülür. En sık karşına çıkacak beş tanesi:
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
              <th>İşlem</th>
              <th>Ne yapar?</th>
              <th>Anahtar fikir</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold text-white">Toplam / ortalama</td>
              <td>Tüm hücreleri tek değere indirger</td>
              <td>Bir biriktirici değişken + iç içe döngü</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Eleman arama</td>
              <td>Bir değeri ve konumunu (i, j) bulur</td>
              <td>Eşleşince satır/sütunu yazdır veya döndür</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Satır / sütun toplamı</td>
              <td>Her satırın veya sütunun toplamını alır</td>
              <td>Sütun için indisleri ters kullan: m[i][j]</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Transpoze</td>
              <td>Satırları sütunlarla yer değiştirir</td>
              <td>yeni[j][i] = m[i][j]</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Matris toplama</td>
              <td>Aynı boyutta iki matrisi hücre hücre toplar</td>
              <td>C[i][j] = A[i][j] + B[i][j]</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  12 · SECTION 3/3 · UYGULAMA  ───────────────── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Gerçek Hayatta Matrisler"
      subtitle="Tablolar, dijital görüntüler, oyun tahtaları, harita ızgaraları — hepsi içeride iki boyutlu dizidir."
      glowClass="prog-glow-purple"
      icon={<Layers className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  13 · KULLANIM ALANLARI (KARTLAR + XOX)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 3 · Nerede karşına çıkar?</Eyebrow>
      <H2 className="mb-2">Matris her yerde</H2>
      <Sub className="max-w-3xl mb-6">
        Bir ekran görüntüsü, bir Excel sayfası ya da bir satranç tahtası &mdash; hepsi bellekte
        satır × sütun ızgarasıdır. Sağda klasik bir XOX (tic-tac-toe) tahtası, bir 3×3 matrisle saklanır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="grid grid-cols-1 gap-4">
          <FeatureCard
            icon={Table2}
            title="Tablolar & çizelgeler"
            desc="Öğrenci × ders not tablosu; satır bir öğrenci, sütun bir ders."
            accent="#3776ab"
            delay={0.1}
          />
          <FeatureCard
            icon={ImageIcon}
            title="Dijital görüntüler"
            desc="Bir resim piksel ızgarasıdır; her hücre bir gri ton ya da renk değeri tutar."
            accent="#ffd43b"
            delay={0.2}
          />
          <FeatureCard
            icon={MapIcon}
            title="Harita & oyun tahtası"
            desc="Labirent, kâğıt-üzeri oyunlar, satranç: konum = (satır, sütun)."
            accent="#4ec9b0"
            delay={0.3}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center"
        >
          <div className="prog-flow-bg p-6">
            <div className="grid grid-cols-3 gap-2">
              {[
                ["X", "O", "X"],
                ["O", "X", " "],
                [" ", "O", "X"],
              ].flat().map((c, i) => (
                <div
                  key={i}
                  className={`w-16 h-16 text-2xl font-bold ${c.trim() ? "prog-cell prog-cell-active" : "prog-cell"}`}
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 font-mono text-xs text-gray-400 text-center">
            tahta[<span className="text-[#5fa8e0]">0</span>][<span className="text-[#5fa8e0]">0</span>] = <span className="text-[#ffe169]">&quot;X&quot;</span>
            {"   "}·{"   "}
            tahta[<span className="text-[#5fa8e0]">1</span>][<span className="text-[#5fa8e0]">2</span>] = <span className="text-white">&quot; &quot;</span> (boş)
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  14 · UYGULAMALI ALIŞTIRMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı alıştırma</Eyebrow>
      <H2>Kendi makinende dört görev</H2>
      <Sub className="mt-3 max-w-3xl">
        Bu haftanın deseni iç içe döngüdür &mdash; pekişmesi için kod yazmak şart. Aşağıdaki dördünü
        tamamlayıp sonraki derse <span className="text-white">çıktının ekran görüntüsüyle</span> gel.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 prog-card rounded-xl p-6 max-w-3xl mx-auto"
      >
        <div className="text-xs uppercase tracking-wider text-[#5fa8e0] mb-4 font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Görev listesi · Hafta 10
        </div>
        <div className="space-y-3">
          {[
            { t: "3×3 matrisi düzgün yazdır", d: "İç içe döngüyle her satırı alt alta, hücreleri yan yana bas." },
            { t: "En büyük elemanı bul", d: "Tüm hücreleri gez; en büyük değeri ve konumunu (i, j) yazdır." },
            { t: "Satır toplamlarını çıkar", d: "Her satır için ayrı toplam hesapla, satır indisiyle birlikte yazdır." },
            { t: "Matrisin transpozunu al", d: "yeni[j][i] = m[i][j] ile satır-sütun yer değiştir; sonucu yazdır." },
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-xs text-gray-500 text-center font-mono flex items-center justify-center gap-2"
      >
        <Lightbulb className="w-3.5 h-3.5 text-[#ffd43b]" />
        İpucu: önce 9. slayttaki gezinti desenini kopyala, sonra gövdeyi göreve göre değiştir.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  15 · SIRADAKİ HAFTA + KAPANIŞ  ───────────────── */
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
        <Eyebrow>10. hafta tamamlandı · sıradaki: Fonksiyonlar</Eyebrow>
        <H1>
          <span className="prog-shimmer">Kodu Parçalara Böl</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta iç içe döngüleri tekrar tekrar yazdık. 11. haftada bu tekrarı bir{" "}
          <span className="text-white">fonksiyona</span> sarıp tek bir isimle çağırmayı öğreneceğiz:
          parametre, dönüş değeri ve yeniden kullanım.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <FeatureCard
            icon={Hash}
            title="def ile tanım"
            desc="Bir işi adlandır; matris_topla(m) gibi tekrar tekrar çağır."
            accent="#3776ab"
            delay={0.1}
          />
          <FeatureCard
            icon={Brackets}
            title="Parametre & return"
            desc="Fonksiyona matris ver, sonucu geri al; kod kısalır ve okunur."
            accent="#ffd43b"
            delay={0.2}
          />
          <FeatureCard
            icon={Target}
            title="Yeniden kullanım"
            desc="Bu haftanın transpoze / toplam kodunu fonksiyona taşı."
            accent="#4ec9b0"
            delay={0.3}
          />
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
          BVA 1101 · 10. Hafta · Çok Boyutlu Diziler &amp; Matrisler
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
