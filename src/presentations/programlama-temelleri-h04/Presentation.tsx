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
  Hash,
  Type,
  ToggleLeft,
  Binary,
  Sigma,
  Plus,
  Equal,
  GitCompare,
  Brackets,
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
  Layers,
  ArrowRightLeft,
  Terminal,
  Calendar,
  Users,
  FileText,
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

/* ---- Tip kutusu — bir veri tipini görselleştirir ------------- */

function TypeCard({
  icon: Icon,
  pyType,
  label,
  example,
  desc,
  accent,
  delay = 0,
}: {
  icon: LucideIcon;
  pyType: string;
  label: string;
  example: string;
  desc: string;
  accent: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="prog-card rounded-xl p-5"
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${accent}1f`, border: `1px solid ${accent}55` }}
        >
          <Icon className="w-5 h-5" style={{ color: accent }} />
        </div>
        <div>
          <span
            className="prog-type-badge"
            style={{ background: `${accent}22`, color: accent }}
          >
            {pyType}
          </span>
          <div className="text-white font-semibold text-sm mt-1">{label}</div>
        </div>
      </div>
      <div className="prog-editor rounded-md px-3 py-2 text-[12px] mb-3 whitespace-pre">
        {example}
      </div>
      <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
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
        <Eyebrow>BVA 1101 · 4. Hafta · Bahar Dönemi</Eyebrow>
        <H1>
          <span className="prog-shimmer">Veri Tipleri &amp; Operatörler</span>
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Değişkende ne tutuyoruz, onu nasıl işleriz, kullanıcıyla nasıl konuşuruz?
          Tip — operatör — giriş/çıkış.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 mt-14 max-w-3xl mx-auto"
        >
          {[
            { name: "Veri tipleri", tag: "type", color: "#3776ab", desc: "int · float · str · bool" },
            { name: "Operatörler", tag: "op", color: "#ffd43b", desc: "+ − * / · == · and" },
            { name: "Giriş / Çıkış", tag: "io", color: "#4ec9b0", desc: "input() · print()" },
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

  /* ─────────────────  2 · GEÇEN HAFTADAN KÖPRÜ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 3. haftadan 4. haftaya</Eyebrow>
      <H2>Akışı çizdik; şimdi kutuları dolduruyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta akış diyagramlarıyla bir programın &ldquo;hangi sırayla ne yapacağını&rdquo;
        çizdik. Ama her programın bir de malzemesi var: <span className="text-white font-semibold">veri</span>.
        Bu hafta veriyi değişkende saklamayı, tipini tanımayı, operatörle işlemeyi ve
        kullanıcıyla giriş/çıkış üzerinden konuşmayı öğreniyoruz.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#5fa8e0]">
            <Layers className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Geçen hafta (H03)</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#5fa8e0] flex-shrink-0" />Akış diyagramı sembolleri ve yönü.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#5fa8e0] flex-shrink-0" />Giriş/işlem/çıkış/karar adımları.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#5fa8e0] flex-shrink-0" />Algoritmayı kod yazmadan tasarlamak.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <Target className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu hafta (H04) · hedef</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#4ec9b0] flex-shrink-0" />Temel veri tiplerini ayırt etmek.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#4ec9b0] flex-shrink-0" />Aritmetik, karşılaştırma ve mantıksal operatörler.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#4ec9b0] flex-shrink-0" />input() ile veri almak, print() ile yazmak.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3 · DERSİN AKIŞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: tip → operatör → giriş/çıkış</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce veriyi tanıyoruz (hangi tip?), sonra onu işliyoruz (hangi operatör?), en son
        kullanıcıyla iletişim kuruyoruz (input/print). Sonunda küçük bir uygulama.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            range: "01",
            title: "Veri Tipleri",
            items: ["int, float, str, bool", "type() ile tip sorgulama", "Tip dönüşümü (casting)"],
            icon: Type,
            accent: "#3776ab",
          },
          {
            range: "02",
            title: "Operatörler",
            items: ["Aritmetik (+ − * / // % **)", "Karşılaştırma (== != < >)", "Mantıksal (and / or / not)"],
            icon: Sigma,
            accent: "#ffd43b",
          },
          {
            range: "03",
            title: "Giriş / Çıkış",
            items: ["input() ile veri almak", "print() biçimlendirme", "f-string ile yazdırma"],
            icon: Terminal,
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

  /* ─────────────────  4 · SECTION 1/3 · VERİ TİPLERİ  ───────────────── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Veri Tipleri"
      subtitle="Bir değerin türü, ona nasıl davranabileceğini belirler. 5 ile 5 toplanır, &ldquo;5&rdquo; ile &ldquo;5&rdquo; yan yana eklenir."
      glowClass="prog-glow-blue"
      icon={<Type className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  5 · DÖRT TEMEL TİP  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 1 · Veri Tipleri</Eyebrow>
      <H2>Dört temel veri tipi</H2>
      <Sub className="mt-3 max-w-3xl">
        Python&apos;da değişkenin tipini siz bildirmezsiniz; atadığınız değere göre belirlenir.
        İşte en sık kullanılan dördü:
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <TypeCard
          icon={Hash}
          pyType="int"
          label="Tam sayı"
          example="yas = 21"
          desc="Ondalık kısmı olmayan sayılar: 0, 42, -7. Sayma ve adetlerde kullanılır."
          accent="#5fa8e0"
          delay={0.0}
        />
        <TypeCard
          icon={Sigma}
          pyType="float"
          label="Ondalıklı sayı"
          example="boy = 1.78"
          desc="Kesirli/ondalıklı değerler: 3.14, 0.5, -2.0. Ölçüm ve hesaplamalarda kullanılır."
          accent="#3776ab"
          delay={0.1}
        />
        <TypeCard
          icon={Type}
          pyType="str"
          label="Metin (string)"
          example={'ad = "Ayşe"'}
          desc="Tırnak içindeki karakter dizileri. İsim, mesaj, kullanıcı girişi metinleri."
          accent="#ffd43b"
          delay={0.2}
        />
        <TypeCard
          icon={ToggleLeft}
          pyType="bool"
          label="Mantıksal değer"
          example="aktif = True"
          desc="Yalnızca iki değer: True veya False. Koşulların ve karşılaştırmaların sonucu."
          accent="#4ec9b0"
          delay={0.3}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 prog-card rounded-xl p-4 flex items-center gap-4"
      >
        <Lightbulb className="w-6 h-6 text-[#ffd43b] flex-shrink-0" />
        <div className="text-sm text-gray-300">
          <span className="text-white font-semibold">Dikkat:</span> <span className="font-mono text-[#9cdcfe]">5</span>{" "}
          bir int&apos;tir; <span className="font-mono text-[#ce9178]">&quot;5&quot;</span> ise bir str&apos;dir.
          Görünüşleri aynı, davranışları farklı.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  6 · type() İLE TİP SORGULAMA (CODE)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 1 · Tipi öğrenmek</Eyebrow>
      <H2 className="mb-2">Bir değerin tipi: type()</H2>
      <Sub className="max-w-3xl">
        Bir değişkenin neyi tuttuğundan emin değil misin? <span className="font-mono text-[#4ec9b0]">type()</span>{" "}
        fonksiyonu sana tipini söyler. Hata ayıklamanın ilk adımı.
      </Sub>

      <div className="mt-6">
        <CodeEditor
          title="tipler.py — Visual Studio Code"
          tabs={["tipler.py", "README.md"]}
          activeTab="tipler.py"
          lines={[
            <>
              <span className="tok-var">yas</span>
              <span className="tok-operator"> = </span>
              <span className="tok-number">21</span>
              {"          "}
              <span className="tok-comment"># int</span>
            </>,
            <>
              <span className="tok-var">boy</span>
              <span className="tok-operator"> = </span>
              <span className="tok-number">1.78</span>
              {"        "}
              <span className="tok-comment"># float</span>
            </>,
            <>
              <span className="tok-var">ad</span>
              <span className="tok-operator"> = </span>
              <span className="tok-string">&quot;Ayşe&quot;</span>
              {"      "}
              <span className="tok-comment"># str</span>
            </>,
            <>
              <span className="tok-var">aktif</span>
              <span className="tok-operator"> = </span>
              <span className="tok-keyword">True</span>
              {"      "}
              <span className="tok-comment"># bool</span>
            </>,
            "",
            <>
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-builtin">type</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">yas</span>
              <span className="tok-punct">), </span>
              <span className="tok-builtin">type</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">ad</span>
              <span className="tok-punct">))</span>
            </>,
          ]}
          terminal={
            <div className="leading-relaxed">
              <div>
                <span className="prog-terminal-prompt">user@mcbu</span>
                <span className="text-gray-500"> $ </span>
                <span className="prog-terminal-out">python tipler.py</span>
              </div>
              <div className="prog-terminal-out">
                &lt;class &apos;int&apos;&gt; &lt;class &apos;str&apos;&gt;
              </div>
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

  /* ─────────────────  7 · TİP DÖNÜŞÜMÜ (CASTING)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 1 · Tip dönüşümü</Eyebrow>
      <H2 className="mb-2">Casting · bir tipi başka tipe çevirmek</H2>
      <Sub className="max-w-3xl mb-6">
        <span className="font-mono text-[#4ec9b0]">int()</span>, <span className="font-mono text-[#4ec9b0]">float()</span>,{" "}
        <span className="font-mono text-[#4ec9b0]">str()</span> fonksiyonları değeri başka tipe dönüştürür.
        Bu çok önemli çünkü <span className="text-white">input() her zaman str döndürür</span> — sayı lazımsa çevirmen gerekir.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="prog-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Doğru — önce çevir</span>
          </div>
          <div className="prog-editor rounded-md px-3 py-3 text-[12px] space-y-1">
            <div className="whitespace-pre">
              <span className="tok-var">metin</span>
              <span className="tok-operator"> = </span>
              <span className="tok-string">&quot;5&quot;</span>
            </div>
            <div className="whitespace-pre">
              <span className="tok-var">sayi</span>
              <span className="tok-operator"> = </span>
              <span className="tok-builtin">int</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">metin</span>
              <span className="tok-punct">)</span>
            </div>
            <div className="whitespace-pre">
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">sayi</span>
              <span className="tok-operator"> + </span>
              <span className="tok-number">3</span>
              <span className="tok-punct">)</span>
              {"  "}
              <span className="tok-comment"># 8</span>
            </div>
          </div>
          <div className="text-[11px] text-gray-500 mt-3">
            str → int dönüşümünden sonra aritmetik çalışır.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="prog-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fca5a5]">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Hatalı — çevirmeden</span>
          </div>
          <div className="prog-editor rounded-md px-3 py-3 text-[12px] space-y-1">
            <div className="whitespace-pre">
              <span className="tok-var">metin</span>
              <span className="tok-operator"> = </span>
              <span className="tok-string">&quot;5&quot;</span>
            </div>
            <div className="whitespace-pre">
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">metin</span>
              <span className="tok-operator"> + </span>
              <span className="tok-number">3</span>
              <span className="tok-punct">)</span>
            </div>
            <div className="whitespace-pre text-gray-600">&nbsp;</div>
            <div className="whitespace-pre" style={{ color: "#f87171" }}>
              TypeError: can only
            </div>
            <div className="whitespace-pre" style={{ color: "#f87171" }}>
              concatenate str ... to str
            </div>
          </div>
          <div className="text-[11px] text-gray-500 mt-3">
            str ile int toplanamaz; Python tip karışıklığını hata olarak bildirir.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  8 · SECTION 2/3 · OPERATÖRLER  ───────────────── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Operatörler"
      subtitle="Veriyi işleyen semboller. Toplarlar, karşılaştırırlar, koşulları birleştirirler — programın gerçek işi burada başlar."
      glowClass="prog-glow-yellow"
      icon={<Sigma className="w-14 h-14 text-[#1a1a1a]" />}
    />
  ),

  /* ─────────────────  9 · ARİTMETİK OPERATÖRLER (TABLO)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 2 · Aritmetik operatörler</Eyebrow>
      <H2>Sayılarla işlem yapmak</H2>
      <Sub className="mt-3 max-w-3xl">
        Yedi temel aritmetik operatör. <span className="text-white">//</span> ve{" "}
        <span className="text-white">%</span> çok karıştırılır: biri bölümün tam kısmını, diğeri kalanını verir.
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
              <th style={{ width: "14%" }}>Operatör</th>
              <th style={{ width: "26%" }}>Anlamı</th>
              <th style={{ width: "30%" }}>Örnek</th>
              <th>Sonuç</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="op-cell">+</span></td>
              <td>Toplama</td>
              <td><span className="op-cell">7 + 2</span></td>
              <td><span className="op-cell">9</span></td>
            </tr>
            <tr>
              <td><span className="op-cell">-</span></td>
              <td>Çıkarma</td>
              <td><span className="op-cell">7 - 2</span></td>
              <td><span className="op-cell">5</span></td>
            </tr>
            <tr>
              <td><span className="op-cell">*</span></td>
              <td>Çarpma</td>
              <td><span className="op-cell">7 * 2</span></td>
              <td><span className="op-cell">14</span></td>
            </tr>
            <tr>
              <td><span className="op-cell">/</span></td>
              <td>Bölme (ondalıklı)</td>
              <td><span className="op-cell">7 / 2</span></td>
              <td><span className="op-cell">3.5</span></td>
            </tr>
            <tr>
              <td><span className="op-cell">//</span></td>
              <td>Tam sayı bölme</td>
              <td><span className="op-cell">7 // 2</span></td>
              <td><span className="op-cell">3</span></td>
            </tr>
            <tr>
              <td><span className="op-cell">%</span></td>
              <td>Kalan (mod)</td>
              <td><span className="op-cell">7 % 2</span></td>
              <td><span className="op-cell">1</span></td>
            </tr>
            <tr>
              <td><span className="op-cell">**</span></td>
              <td>Üs alma</td>
              <td><span className="op-cell">7 ** 2</span></td>
              <td><span className="op-cell">49</span></td>
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
        İşlem önceliği: önce <span className="text-[#ffd43b]">**</span>, sonra{" "}
        <span className="text-[#ffd43b]">* / // %</span>, en son <span className="text-[#ffd43b]">+ -</span>. Parantez her zaman önce.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  10 · KARŞILAŞTIRMA & MANTIKSAL  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 2 · Karşılaştırma &amp; mantıksal</Eyebrow>
      <H2>Karşılaştır ve birleştir</H2>
      <Sub className="mt-3 max-w-3xl">
        Karşılaştırma operatörleri her zaman bir <span className="font-mono text-[#4ec9b0]">bool</span>{" "}
        (True/False) üretir. Mantıksal operatörler bu bool sonuçları birleştirir — koşulların temeli.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="prog-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3 text-[#5fa8e0]">
            <GitCompare className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Karşılaştırma</span>
          </div>
          <div className="space-y-2 font-mono text-[12px]">
            {[
              { op: "==", t: "eşit mi", ex: "5 == 5", r: "True" },
              { op: "!=", t: "eşit değil mi", ex: "5 != 3", r: "True" },
              { op: ">", t: "büyük mü", ex: "5 > 8", r: "False" },
              { op: "<", t: "küçük mü", ex: "5 < 8", r: "True" },
              { op: ">=", t: "büyük-eşit", ex: "5 >= 5", r: "True" },
              { op: "<=", t: "küçük-eşit", ex: "9 <= 5", r: "False" },
            ].map((row) => (
              <div key={row.op} className="bg-black/30 rounded px-3 py-1.5 flex items-center justify-between">
                <span>
                  <span className="text-[#9cdcfe]">{row.ex}</span>
                  <span className="text-gray-500"> · {row.t}</span>
                </span>
                <span className={row.r === "True" ? "text-[#86efac]" : "text-[#fca5a5]"}>{row.r}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="prog-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3 text-[#ffd43b]">
            <Brackets className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Mantıksal</span>
          </div>
          <div className="space-y-2 font-mono text-[12px]">
            {[
              { op: "and", t: "ikisi de doğruysa", ex: "(5 > 2) and (3 > 1)", r: "True" },
              { op: "or", t: "biri doğruysa", ex: "(5 > 9) or (3 > 1)", r: "True" },
              { op: "not", t: "tersini al", ex: "not (5 > 2)", r: "False" },
            ].map((row) => (
              <div key={row.op} className="bg-black/30 rounded px-3 py-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#c586c0]">{row.op}</span>
                  <span className={row.r === "True" ? "text-[#86efac]" : "text-[#fca5a5]"}>{row.r}</span>
                </div>
                <div className="text-[10px] text-gray-500 mt-0.5">{row.t}</div>
                <div className="text-[#9cdcfe] mt-1">{row.ex}</div>
              </div>
            ))}
          </div>
          <div className="text-[11px] text-gray-500 mt-3 leading-relaxed">
            5. hafta koşullu ifadelerde (if / else) bu bool sonuçları doğrudan kullanacağız.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  11 · ATAMA OPERATÖRLERİ + ÖNCELİK  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 2 · Atama &amp; öncelik</Eyebrow>
      <H2 className="mb-2">Kısayol atamalar ve işlem sırası</H2>
      <Sub className="max-w-3xl mb-6">
        <span className="font-mono text-[#9cdcfe]">+=</span> gibi atama operatörleri,
        bir değişkeni kendi değeri üzerinden güncellemenin kısa yoludur. İşlem önceliği ise
        ifadenin hangi sırayla hesaplandığını belirler.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="prog-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3 text-[#4ec9b0]">
            <Equal className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Atama kısayolları</span>
          </div>
          <div className="space-y-2 font-mono text-[12px]">
            {[
              { s: "x += 3", l: "x = x + 3" },
              { s: "x -= 1", l: "x = x - 1" },
              { s: "x *= 2", l: "x = x * 2" },
              { s: "x //= 2", l: "x = x // 2" },
            ].map((row) => (
              <div key={row.s} className="bg-black/30 rounded px-3 py-1.5 flex items-center justify-between">
                <span className="text-[#9cdcfe]">{row.s}</span>
                <span className="text-gray-500">↔ {row.l}</span>
              </div>
            ))}
          </div>
          <div className="text-[11px] text-gray-500 mt-3">
            Aynı işi yaparlar; kısa yazım sayaçlarda çok kullanışlıdır.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="prog-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3 text-[#ffd43b]">
            <Plus className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">İşlem önceliği</span>
          </div>
          <div className="prog-editor rounded-md px-3 py-3 text-[12px] space-y-1.5">
            <div className="whitespace-pre">
              <span className="tok-number">2</span>
              <span className="tok-operator"> + </span>
              <span className="tok-number">3</span>
              <span className="tok-operator"> * </span>
              <span className="tok-number">4</span>
              {"   "}
              <span className="tok-comment"># 14, çünkü önce *</span>
            </div>
            <div className="whitespace-pre">
              <span className="tok-punct">(</span>
              <span className="tok-number">2</span>
              <span className="tok-operator"> + </span>
              <span className="tok-number">3</span>
              <span className="tok-punct">)</span>
              <span className="tok-operator"> * </span>
              <span className="tok-number">4</span>
              {" "}
              <span className="tok-comment"># 20, parantez önce</span>
            </div>
            <div className="whitespace-pre">
              <span className="tok-number">2</span>
              <span className="tok-operator"> ** </span>
              <span className="tok-number">3</span>
              <span className="tok-operator"> * </span>
              <span className="tok-number">2</span>
              {"  "}
              <span className="tok-comment"># 16, önce **</span>
            </div>
          </div>
          <div className="text-[11px] text-gray-500 mt-3 leading-relaxed">
            Emin değilsen parantez kullan — hem doğru hem okunabilir olur.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  12 · SECTION 3/3 · GİRİŞ / ÇIKIŞ  ───────────────── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Giriş / Çıkış"
      subtitle="Program kullanıcıyla burada konuşur: input() ile veri alır, print() ile sonucu gösterir. Etkileşimli programın kalbi."
      glowClass="prog-glow-purple"
      icon={<Terminal className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  13 · input() ve print() (CODE)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 3 · Etkileşimli program</Eyebrow>
      <H2 className="mb-2">input() al, işle, print() ile yaz</H2>
      <Sub className="max-w-3xl">
        input() kullanıcıdan metin alır (her zaman <span className="font-mono text-[#4ec9b0]">str</span>).
        Sayı lazımsa int()/float() ile çevir; sonucu f-string ile biçimli yazdır.
      </Sub>

      <div className="mt-5">
        <CodeEditor
          title="alan.py — Visual Studio Code"
          tabs={["alan.py", "README.md"]}
          activeTab="alan.py"
          lines={[
            <>
              <span className="tok-comment"># dikdörtgen alanı hesapla</span>
            </>,
            <>
              <span className="tok-var">en</span>
              <span className="tok-operator"> = </span>
              <span className="tok-builtin">float</span>
              <span className="tok-punct">(</span>
              <span className="tok-builtin">input</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;En (cm): &quot;</span>
              <span className="tok-punct">))</span>
            </>,
            <>
              <span className="tok-var">boy</span>
              <span className="tok-operator"> = </span>
              <span className="tok-builtin">float</span>
              <span className="tok-punct">(</span>
              <span className="tok-builtin">input</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;Boy (cm): &quot;</span>
              <span className="tok-punct">))</span>
            </>,
            <>
              <span className="tok-var">alan</span>
              <span className="tok-operator"> = </span>
              <span className="tok-var">en</span>
              <span className="tok-operator"> * </span>
              <span className="tok-var">boy</span>
            </>,
            "",
            <>
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-fstring">f</span>
              <span className="tok-string">&quot;Alan: </span>
              <span className="tok-punct">{"{"}</span>
              <span className="tok-var">alan</span>
              <span className="tok-punct">{"}"}</span>
              <span className="tok-string"> cm²&quot;</span>
              <span className="tok-punct">)</span>
            </>,
          ]}
          terminal={
            <div className="leading-relaxed">
              <div>
                <span className="prog-terminal-prompt">user@mcbu</span>
                <span className="text-gray-500"> $ </span>
                <span className="prog-terminal-out">python alan.py</span>
              </div>
              <div className="prog-terminal-out">
                En (cm): <span className="prog-terminal-user">12</span>
              </div>
              <div className="prog-terminal-out">
                Boy (cm): <span className="prog-terminal-user">5</span>
              </div>
              <div className="prog-terminal-out">Alan: 60.0 cm²</div>
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

  /* ─────────────────  14 · print BİÇİMLENDİRME · f-string vs , vs +  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 3 · Çıktı biçimlendirme</Eyebrow>
      <H2>print() ile yazdırmanın üç yolu</H2>
      <Sub className="mt-3 max-w-3xl">
        Aynı satırı üç farklı şekilde yazdırabilirsin. f-string en okunabilir olanı; modern Python&apos;da tercih edilir.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[
          {
            tag: "f-string (önerilen)",
            accent: "#4ec9b0",
            icon: CheckCircle2,
            code: 'print(f"{ad}: {puan}")',
            note: "Değişkeni süslü parantez içine yaz — en temiz yöntem.",
          },
          {
            tag: "virgülle ayırma",
            accent: "#5fa8e0",
            icon: ArrowRightLeft,
            code: 'print(ad, ":", puan)',
            note: "Virgül araya boşluk koyar; tip dönüşümü gerekmez.",
          },
          {
            tag: "birleştirme (+)",
            accent: "#ffd43b",
            icon: Plus,
            code: 'print(ad + ": " + str(puan))',
            note: "str ile + yapılır; sayıyı str() ile çevirmek şart.",
          },
        ].map((c, i) => (
          <motion.div
            key={c.tag}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="prog-card rounded-xl p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <c.icon className="w-5 h-5" style={{ color: c.accent }} />
              <span className="text-xs font-mono uppercase tracking-wider" style={{ color: c.accent }}>
                {c.tag}
              </span>
            </div>
            <div className="prog-editor rounded-md px-3 py-2 text-[11px] whitespace-pre overflow-x-auto">
              {c.code}
            </div>
            <p className="text-xs text-gray-400 mt-3 leading-relaxed">{c.note}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 prog-card rounded-xl p-4 flex items-center gap-4"
      >
        <Lightbulb className="w-6 h-6 text-[#ffd43b] flex-shrink-0" />
        <div className="text-sm text-gray-300">
          <span className="text-white font-semibold">Faydalı:</span>{" "}
          <span className="font-mono text-[#9cdcfe]">print(a, b, sep=&quot;-&quot;)</span> ayraç değiştirir;{" "}
          <span className="font-mono text-[#9cdcfe]">end=&quot;&quot;</span> satır sonundaki alt satıra geçişi kaldırır.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  15 · UYGULAMALI LAB  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulama</Eyebrow>
      <H2>Mini hesap makinesi yaz</H2>
      <Sub className="mt-3 max-w-3xl">
        Bu haftanın üç konusunu tek programda birleştir: girişten iki sayı al (tip dönüşümü),
        operatörlerle işle, sonucu biçimli yazdır. Sonraki derse çalışan haliyle gel.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 prog-card rounded-xl p-6 max-w-3xl mx-auto"
      >
        <div className="text-xs uppercase tracking-wider text-[#5fa8e0] mb-4 font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Görev listesi · Hafta 04
        </div>
        <div className="space-y-3">
          {[
            { t: "İki sayıyı girişten al", d: "input() ile al, float() ile sayıya çevir (a ve b)" },
            { t: "Dört işlemi hesapla", d: "toplam, fark, çarpım ve bölüm (a / b) değerlerini bul" },
            { t: "Tam bölme ve kalanı ekle", d: "a // b ve a % b sonuçlarını da hesapla" },
            { t: "Bir karşılaştırma yaz", d: "a > b sonucunu (True/False) ekrana yazdır" },
            { t: "Sonuçları f-string ile yazdır", d: 'print(f"Toplam: {toplam}") biçiminde, her satırda bir sonuç' },
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

  /* ─────────────────  16 · SIRADAKİ HAFTA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Hafta 05 · Önizleme</Eyebrow>
      <H2>Koşullu ifadeler · if / elif / else</H2>
      <Sub className="mt-3 max-w-3xl">
        Bu hafta veriyi karşılaştırmayı (bool üretmeyi) öğrendik. Gelecek hafta bu bool
        sonuçlarına göre programın <span className="text-white">dallanmasını</span> sağlayacağız:
        koşula göre farklı yollar.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <FeatureCard
          icon={GitCompare}
          title="if · koşulu sına"
          desc="Bir bool ifade True ise içindeki blok çalışır; değilse atlanır."
          accent="#3776ab"
          delay={0.0}
        />
        <FeatureCard
          icon={Binary}
          title="elif / else · dallan"
          desc="Birden çok durumu sırayla kontrol et; hiçbiri tutmazsa else çalışır."
          accent="#5fa8e0"
          delay={0.1}
        />
        <FeatureCard
          icon={Brain}
          title="İç içe koşullar"
          desc="Bir kararın içine başka karar; bu hafta öğrendiğin operatörler doğrudan girdi."
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
        + Pratik: &ldquo;Girilen sayı çift mi tek mi&rdquo; · &ldquo;Notu harf karşılığına çevir&rdquo;
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  17 · KAPANIŞ  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center max-w-3xl mx-auto">
        <Eyebrow>Hafta 04 · Sonu</Eyebrow>
        <H1>
          <span className="prog-shimmer">Özet &amp; Kapanış</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Tip belirler, operatör işler, giriş/çıkış konuşturur. Bu üçlüyle artık
          küçük ama gerçek bir etkileşimli program yazabilirsin.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12"
        >
          <div className="prog-card rounded-xl p-5">
            <Type className="w-5 h-5 text-[#5fa8e0] mb-2 mx-auto" />
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
              Veri tipleri
            </div>
            <div className="text-white font-semibold mt-1">int · float</div>
            <div className="text-sm text-gray-400">str · bool · casting</div>
          </div>

          <div className="prog-card rounded-xl p-5">
            <Sigma className="w-5 h-5 text-[#5fa8e0] mb-2 mx-auto" />
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
              Operatörler
            </div>
            <div className="text-white font-semibold mt-1">Aritmetik</div>
            <div className="text-sm text-gray-400">karşılaştırma · mantıksal</div>
          </div>

          <div className="prog-card rounded-xl p-5">
            <Terminal className="w-5 h-5 text-[#5fa8e0] mb-2 mx-auto" />
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
              Giriş / Çıkış
            </div>
            <div className="text-white font-semibold mt-1">input()</div>
            <div className="text-sm text-gray-400">print() · f-string</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
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
            <div className="text-white font-semibold mt-1">H05</div>
            <div className="text-sm text-gray-400">Koşullu ifadeler</div>
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
          BVA 1101 · 4. Hafta · Veri Tipleri, Operatörler, Giriş/Çıkış
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
