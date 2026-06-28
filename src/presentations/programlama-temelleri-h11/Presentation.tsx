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
  Database,
  Layers,
  Hash,
  Target,
  Brain,
  Sparkles,
  Lightbulb,
  AlertTriangle,
  Repeat,
  Search,
  Filter,
  ArrowRightLeft,
  ListOrdered,
  Sigma,
  Check,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Calendar,
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

/* ---- Array visualizer (indeksli kutular) --------------------- */

function ArrayViz({
  values,
  activeIndex,
  caption,
  delay = 0,
}: {
  values: (string | number)[];
  activeIndex?: number;
  caption?: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="prog-flow-bg p-6 w-full"
    >
      <div className="flex flex-wrap items-end justify-center gap-2">
        {values.map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + i * 0.06 }}
            className="flex flex-col items-center gap-2"
          >
            <div
              className={`w-14 h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center text-base md:text-lg font-semibold prog-arr-cell ${
                i === activeIndex ? "prog-arr-cell-active" : ""
              }`}
            >
              {v}
            </div>
            <div className="prog-arr-index">[{i}]</div>
          </motion.div>
        ))}
      </div>
      {caption && (
        <div className="mt-5 text-center text-xs text-gray-500 font-mono">
          {caption}
        </div>
      )}
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
        <Eyebrow>BVA 1101 · 11. Hafta · Bahar Dönemi</Eyebrow>
        <H1>
          <span className="prog-shimmer">Dizi ile Problem Çözme</span>
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Tek tek değişken yerine bir liste: birden çok veriyi indeksle saklamak,
          döngüyle gezmek ve klasik problemleri çözmek.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 mt-14 max-w-3xl mx-auto"
        >
          {[
            { name: "Topla & Ortala", tag: "Σ", color: "#3776ab", desc: "Bütün elemanları gez" },
            { name: "Ara & Bul", tag: "🔍", color: "#5fa8e0", desc: "İndeksini tespit et" },
            { name: "Süz & Dönüştür", tag: "≫", color: "#ffd43b", desc: "Yeni dizi üret" },
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
                className="w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center text-[13px] font-mono font-bold"
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
      <Eyebrow>Köprü · 9. ve 10. haftadan 11. haftaya</Eyebrow>
      <H2>Diziyi tanıdık; şimdi onunla problem çözüyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        9. haftada diziyi (listeyi) <span className="text-white font-semibold">veri yapısı</span> olarak
        gördük, 10. haftada fonksiyonlarla kodu parçaladık. Bu hafta ikisini birleştirip
        gerçek problemleri çözüyoruz: toplama, arama, süzme, en büyüğü bulma.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#5fa8e0]">
            <Database className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Geçen haftalarda</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#5fa8e0] flex-shrink-0" />Liste oluşturma: <span className="font-mono text-[#9cdcfe]">notlar = [70, 85, 90]</span></li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#5fa8e0] flex-shrink-0" />İndeksle erişim: <span className="font-mono text-[#9cdcfe]">notlar[0]</span> ilk eleman</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#5fa8e0] flex-shrink-0" />Döngüyle gezme: <span className="font-mono text-[#c586c0]">for</span> not <span className="font-mono text-[#c586c0]">in</span> notlar</li>
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
            <span className="text-xs font-mono uppercase tracking-widest">Bu haftanın hedefi</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#86efac] flex-shrink-0" />Bir diziyi tarayıp tek değere indirgemek (toplam, ortalama).</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#86efac] flex-shrink-0" />Aranan elemanı ve indeksini bulmak.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#86efac] flex-shrink-0" />Koşula uyanları süzüp yeni dizi üretmek.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3 · NEDEN DİZİ?  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Hatırlatma · neden dizi?</Eyebrow>
      <H2>30 öğrencinin notu · 30 değişken mi?</H2>
      <Sub className="mt-3 max-w-3xl">
        Aynı tür birçok veriyi tek tek değişkene koymak hem yazması zor hem döngüyle
        işlenemez. Dizi, hepsini tek isimde toplar; indeks (0&apos;dan başlayan numara) ile
        her birine ulaşırsın.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="prog-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fca5a5]">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Dizi olmadan</span>
          </div>
          <div className="font-mono text-[12px] space-y-1.5 text-gray-300">
            <div><span className="tok-var">not1</span> = <span className="tok-number">70</span></div>
            <div><span className="tok-var">not2</span> = <span className="tok-number">85</span></div>
            <div><span className="tok-var">not3</span> = <span className="tok-number">90</span></div>
            <div className="text-gray-600"># ... not30 = ...</div>
            <div className="text-[#fca5a5] mt-2"># Toplamayı 30 kez tek tek yazmak gerekir.</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="prog-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Dizi ile</span>
          </div>
          <div className="font-mono text-[12px] space-y-1.5 text-gray-300">
            <div><span className="tok-var">notlar</span> = [<span className="tok-number">70</span>, <span className="tok-number">85</span>, <span className="tok-number">90</span>, <span className="tok-punct">...</span>]</div>
            <div className="text-gray-600"># tek isim, 30 değer</div>
            <div className="mt-2"><span className="tok-builtin">sum</span>(<span className="tok-var">notlar</span>) <span className="text-gray-600"># bir satırda toplam</span></div>
            <div><span className="tok-builtin">len</span>(<span className="tok-var">notlar</span>) <span className="text-gray-600"># kaç eleman var</span></div>
          </div>
        </motion.div>
      </div>

      <div className="mt-8">
        <ArrayViz
          values={[70, 85, 90, 60, 95]}
          activeIndex={2}
          caption={<>İndeksleme 0&apos;dan başlar · <span className="text-[#5fa8e0]">notlar[2]</span> üçüncü elemana (90) karşılık gelir · son indeks = len − 1</>}
          delay={0.5}
        />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  4 · BÖLÜM 1 · GEZ & İNDİRGE  ───────────────── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Diziyi Gez ve İndirge"
      subtitle="Bütün elemanları döngüyle dolaşıp tek bir sonuca ulaşmak: toplam, ortalama, en büyük, sayım."
      glowClass="prog-glow-blue"
      icon={<Sigma className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  5 · DİZİYİ DOLAŞMA — İKİ YOL  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 1 · Gezme</Eyebrow>
      <H2>Bir diziyi dolaşmanın iki yolu</H2>
      <Sub className="mt-3 max-w-3xl">
        Elemanın kendisi yetiyorsa <span className="text-white font-semibold">for-each</span> kullan;
        indekse de ihtiyacın varsa <span className="text-white font-semibold">range(len(...))</span>
        veya <span className="font-mono text-[#dcdcaa]">enumerate</span> kullan.
      </Sub>

      <div className="mt-6">
        <CodeEditor
          title="gezme.py — Visual Studio Code"
          tabs={["gezme.py", "README.md"]}
          activeTab="gezme.py"
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
              <span className="tok-punct">]</span>
            </>,
            "",
            <>
              <span className="tok-comment"># 1) Sadece değer lazımsa — for-each</span>
            </>,
            <>
              <span className="tok-keyword">for</span>
              <span className="tok-var"> n </span>
              <span className="tok-keyword">in</span>
              <span className="tok-var"> notlar</span>
              <span className="tok-punct">:</span>
            </>,
            <>
              {"    "}
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">n</span>
              <span className="tok-punct">)</span>
            </>,
            "",
            <>
              <span className="tok-comment"># 2) İndeks de lazımsa — enumerate</span>
            </>,
            <>
              <span className="tok-keyword">for</span>
              <span className="tok-var"> i</span>
              <span className="tok-punct">, </span>
              <span className="tok-var">n </span>
              <span className="tok-keyword">in</span>
              <span className="tok-builtin"> enumerate</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">notlar</span>
              <span className="tok-punct">):</span>
            </>,
            <>
              {"    "}
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-fstring">f</span>
              <span className="tok-string">&quot;</span>
              <span className="tok-punct">{"{"}</span>
              <span className="tok-var">i</span>
              <span className="tok-punct">{"}"}</span>
              <span className="tok-string">. öğrenci: </span>
              <span className="tok-punct">{"{"}</span>
              <span className="tok-var">n</span>
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
                <span className="prog-terminal-out">python gezme.py</span>
              </div>
              <div className="prog-terminal-out">0. öğrenci: 70</div>
              <div className="prog-terminal-out">1. öğrenci: 85</div>
              <div className="prog-terminal-out">2. öğrenci: 90</div>
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

  /* ─────────────────  6 · TOPLAM & ORTALAMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Klasik problem · indirgeme</Eyebrow>
      <H2 className="mb-2">Toplam, ortalama ve sayım</H2>
      <Sub className="max-w-3xl">
        En çok ihtiyaç duyulan desen: bir <span className="text-white font-semibold">biriktirici</span>
        (accumulator) değişken aç, diziyi gez, her adımda güncelle. Hazır
        <span className="font-mono text-[#4ec9b0]"> sum</span> ve <span className="font-mono text-[#4ec9b0]">len</span> de aynı işi yapar.
      </Sub>

      <div className="mt-6">
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
              <span className="tok-punct">, </span>
              <span className="tok-number">95</span>
              <span className="tok-punct">]</span>
            </>,
            "",
            <>
              <span className="tok-comment"># elle: biriktirici desen</span>
            </>,
            <>
              <span className="tok-var">toplam</span>
              <span className="tok-operator"> = </span>
              <span className="tok-number">0</span>
            </>,
            <>
              <span className="tok-keyword">for</span>
              <span className="tok-var"> n </span>
              <span className="tok-keyword">in</span>
              <span className="tok-var"> notlar</span>
              <span className="tok-punct">:</span>
            </>,
            <>
              {"    "}
              <span className="tok-var">toplam</span>
              <span className="tok-operator"> += </span>
              <span className="tok-var">n</span>
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
              <span className="tok-var">toplam</span>
              <span className="tok-punct">, </span>
              <span className="tok-builtin">round</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">ortalama</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">1</span>
              <span className="tok-punct">))</span>
            </>,
            "",
            <>
              <span className="tok-comment"># hazır fonksiyonlarla aynı sonuç:</span>
            </>,
            <>
              <span className="tok-comment"># sum(notlar) / len(notlar)</span>
            </>,
          ]}
          terminal={
            <div className="leading-relaxed">
              <div>
                <span className="prog-terminal-prompt">user@mcbu</span>
                <span className="text-gray-500"> $ </span>
                <span className="prog-terminal-out">python ortalama.py</span>
              </div>
              <div className="prog-terminal-out">400 80.0</div>
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

  /* ─────────────────  7 · EN BÜYÜĞÜ BULMA — İZLEME  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>İzleme · en büyüğü bulma</Eyebrow>
      <H2>Diziyi gezerken &quot;şimdiye kadarki en büyük&quot;</H2>
      <Sub className="mt-3 max-w-3xl">
        İlk elemanı geçici şampiyon kabul et; her elemanı onunla karşılaştır, daha büyüğü
        görürsen şampiyonu güncelle. Aşağıda aktif (mavi) hücre, o ana kadarki en büyüktür.
      </Sub>

      <div className="mt-6">
        <ArrayViz
          values={[42, 17, 88, 35, 91, 64]}
          activeIndex={4}
          caption={<>Gezildikçe en_buyuk değeri 42 → 88 → 91 olur · sonuç: <span className="text-[#5fa8e0]">91 (indeks 4)</span></>}
          delay={0.2}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="prog-card rounded-xl p-5"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-[#5fa8e0] mb-3">Mantık · adım adım</div>
          <ol className="space-y-2 text-sm text-gray-300 list-decimal list-inside">
            <li>en_buyuk = dizi[0] (ilk eleman)</li>
            <li>Kalan her eleman için karşılaştır.</li>
            <li>Eleman &gt; en_buyuk ise en_buyuk = eleman.</li>
            <li>Döngü bitince en_buyuk = sonuç.</li>
          </ol>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="prog-card rounded-xl p-5"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-[#86efac] mb-3">Kod</div>
          <div className="font-mono text-[12px] space-y-1 text-gray-300">
            <div><span className="tok-var">en_buyuk</span> = <span className="tok-var">dizi</span>[<span className="tok-number">0</span>]</div>
            <div><span className="tok-keyword">for</span> <span className="tok-var">x</span> <span className="tok-keyword">in</span> <span className="tok-var">dizi</span>[<span className="tok-number">1</span>:]:</div>
            <div>{"    "}<span className="tok-keyword">if</span> <span className="tok-var">x</span> &gt; <span className="tok-var">en_buyuk</span>:</div>
            <div>{"        "}<span className="tok-var">en_buyuk</span> = <span className="tok-var">x</span></div>
            <div className="text-gray-600 mt-1"># hazır: max(dizi)</div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  8 · BÖLÜM 2 · ARAMA  ───────────────── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Dizide Arama"
      subtitle="Aranan bir değer dizide var mı, varsa hangi indekste? Doğrusal aramadan ikili aramaya."
      glowClass="prog-glow-yellow"
      icon={<Search className="w-14 h-14 text-[#1a1a1a]" />}
    />
  ),

  /* ─────────────────  9 · DOĞRUSAL ARAMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 2 · arama</Eyebrow>
      <H2 className="mb-2">Doğrusal arama (linear search)</H2>
      <Sub className="max-w-3xl">
        En basit yöntem: baştan başla, eleman eşleşene kadar tek tek bak. Sıralı olmayan
        dizilerde tek seçenektir. Bulununca indeksi döndür, hiç bulamazsan
        <span className="font-mono text-[#dcdcaa]"> -1</span>.
      </Sub>

      <div className="mt-5">
        <ArrayViz
          values={[12, 7, 25, 9, 30, 18]}
          activeIndex={3}
          caption={<>Aranan = <span className="text-[#5fa8e0]">9</span> · sırayla 12, 7, 25 atlanır · indeks 3&apos;te bulunur</>}
          delay={0.2}
        />
      </div>

      <div className="mt-6">
        <CodeEditor
          title="dogrusal_arama.py"
          tabs={["dogrusal_arama.py"]}
          activeTab="dogrusal_arama.py"
          lines={[
            <>
              <span className="tok-keyword">def</span>
              <span className="tok-fname"> ara</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">dizi</span>
              <span className="tok-punct">, </span>
              <span className="tok-var">hedef</span>
              <span className="tok-punct">):</span>
            </>,
            <>
              {"    "}
              <span className="tok-keyword">for</span>
              <span className="tok-var"> i</span>
              <span className="tok-punct">, </span>
              <span className="tok-var">x </span>
              <span className="tok-keyword">in</span>
              <span className="tok-builtin"> enumerate</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">dizi</span>
              <span className="tok-punct">):</span>
            </>,
            <>
              {"        "}
              <span className="tok-keyword">if</span>
              <span className="tok-var"> x </span>
              <span className="tok-operator">==</span>
              <span className="tok-var"> hedef</span>
              <span className="tok-punct">:</span>
            </>,
            <>
              {"            "}
              <span className="tok-keyword">return</span>
              <span className="tok-var"> i</span>
              <span className="tok-comment">  # ilk eşleşmenin indeksi</span>
            </>,
            <>
              {"    "}
              <span className="tok-keyword">return</span>
              <span className="tok-number"> -1</span>
              <span className="tok-comment">  # bulunamadı</span>
            </>,
            "",
            <>
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-fname">ara</span>
              <span className="tok-punct">([</span>
              <span className="tok-number">12</span>
              <span className="tok-punct">,</span>
              <span className="tok-number">7</span>
              <span className="tok-punct">,</span>
              <span className="tok-number">25</span>
              <span className="tok-punct">,</span>
              <span className="tok-number">9</span>
              <span className="tok-punct">], </span>
              <span className="tok-number">9</span>
              <span className="tok-punct">))</span>
            </>,
          ]}
          terminal={
            <div className="leading-relaxed">
              <div>
                <span className="prog-terminal-prompt">user@mcbu</span>
                <span className="text-gray-500"> $ </span>
                <span className="prog-terminal-out">python dogrusal_arama.py</span>
              </div>
              <div className="prog-terminal-out">3</div>
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

  /* ─────────────────  10 · DOĞRUSAL vs İKİLİ ARAMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Karşılaştırma · arama yöntemleri</Eyebrow>
      <H2>Doğrusal arama vs ikili arama</H2>
      <Sub className="mt-3 max-w-3xl">
        İkili arama (binary search) dizinin <span className="text-white font-semibold">sıralı</span>
        olmasını şart koşar; ama her adımda kalanın yarısını eler, bu yüzden büyük dizilerde
        çok daha hızlıdır.
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
              <th>Doğrusal arama</th>
              <th>İkili arama</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold text-white">Ön koşul</td>
              <td>Yok — her dizide çalışır</td>
              <td>Dizi sıralı olmalı</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Çalışma mantığı</td>
              <td>Baştan sona tek tek bak</td>
              <td>Ortaya bak, yarısını ele, tekrarla</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">En kötü adım sayısı</td>
              <td>n (tüm eleman)</td>
              <td>≈ log₂(n)</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">1.000.000 elemanda</td>
              <td>En kötü ~1.000.000 karşılaştırma</td>
              <td>En kötü ~20 karşılaştırma</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Ne zaman seç</td>
              <td>Küçük / sırasız diziler</td>
              <td>Büyük, sıralı, sık aranan diziler</td>
            </tr>
          </tbody>
        </table>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 prog-card rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <Lightbulb className="w-4 h-4 text-[#ffd43b] mt-0.5 flex-shrink-0" />
        <span>
          Python&apos;da bir elemanın varlığını <span className="font-mono text-[#5fa8e0]">hedef in dizi</span>
          ile sorabilir, sıralı dizide ikili arama için <span className="font-mono text-[#5fa8e0]">bisect</span>
          modülünü kullanabilirsin.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  11 · BÖLÜM 3 · SÜZME & DÖNÜŞTÜRME  ───────────────── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Süzme ve Dönüştürme"
      subtitle="Koşula uyan elemanları seçip yeni bir dizi üretmek; her elemanı bir kurala göre değiştirmek."
      glowClass="prog-glow-purple"
      icon={<Filter className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  12 · SÜZME — GEÇEN ÖĞRENCİLER  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 3 · süzme (filter)</Eyebrow>
      <H2 className="mb-2">Koşula uyanları yeni diziye topla</H2>
      <Sub className="max-w-3xl">
        Sık desen: boş bir liste aç, diziyi gez, koşulu sağlayanı
        <span className="font-mono text-[#dcdcaa]"> append</span> ile ekle. Aşağıda 50 ve üzeri
        notlar &quot;geçenler&quot; dizisine süzülüyor.
      </Sub>

      <div className="mt-5">
        <ArrayViz
          values={[70, 45, 90, 30, 65, 50]}
          caption={<>Eşik = 50 · geçenler → <span className="text-[#86efac]">[70, 90, 65, 50]</span> · 45 ve 30 elenir</>}
          delay={0.2}
        />
      </div>

      <div className="mt-6">
        <CodeEditor
          title="suzme.py"
          tabs={["suzme.py"]}
          activeTab="suzme.py"
          lines={[
            <>
              <span className="tok-var">notlar</span>
              <span className="tok-operator"> = </span>
              <span className="tok-punct">[</span>
              <span className="tok-number">70</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">45</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">90</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">30</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">65</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">50</span>
              <span className="tok-punct">]</span>
            </>,
            <>
              <span className="tok-var">gecenler</span>
              <span className="tok-operator"> = </span>
              <span className="tok-punct">[]</span>
            </>,
            "",
            <>
              <span className="tok-keyword">for</span>
              <span className="tok-var"> n </span>
              <span className="tok-keyword">in</span>
              <span className="tok-var"> notlar</span>
              <span className="tok-punct">:</span>
            </>,
            <>
              {"    "}
              <span className="tok-keyword">if</span>
              <span className="tok-var"> n </span>
              <span className="tok-operator">&gt;=</span>
              <span className="tok-number"> 50</span>
              <span className="tok-punct">:</span>
            </>,
            <>
              {"        "}
              <span className="tok-var">gecenler</span>
              <span className="tok-punct">.</span>
              <span className="tok-fname">append</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">n</span>
              <span className="tok-punct">)</span>
            </>,
            "",
            <>
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">gecenler</span>
              <span className="tok-punct">)</span>
            </>,
            "",
            <>
              <span className="tok-comment"># tek satırda (list comprehension):</span>
            </>,
            <>
              <span className="tok-comment"># [n for n in notlar if n &gt;= 50]</span>
            </>,
          ]}
          terminal={
            <div className="leading-relaxed">
              <div>
                <span className="prog-terminal-prompt">user@mcbu</span>
                <span className="text-gray-500"> $ </span>
                <span className="prog-terminal-out">python suzme.py</span>
              </div>
              <div className="prog-terminal-out">[70, 90, 65, 50]</div>
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

  /* ─────────────────  13 · DÖNÜŞTÜRME & LIST COMPREHENSION  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Dönüştürme (map) · pratik yazım</Eyebrow>
      <H2>Her elemanı bir kurala göre değiştir</H2>
      <Sub className="mt-3 max-w-3xl">
        Süzme &quot;hangileri kalsın&quot; sorusudur; dönüştürme &quot;her birini nasıl değiştireyim&quot;.
        İkisi de döngüyle yapılır ama Python&apos;da <span className="font-mono text-[#dcdcaa]">list comprehension</span>
        ile tek satıra iner.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="prog-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3 text-[#5fa8e0]">
            <Repeat className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Klasik döngü</span>
          </div>
          <div className="font-mono text-[12px] space-y-1 text-gray-300">
            <div><span className="tok-var">zamli</span> = []</div>
            <div><span className="tok-keyword">for</span> <span className="tok-var">f</span> <span className="tok-keyword">in</span> <span className="tok-var">fiyatlar</span>:</div>
            <div>{"    "}<span className="tok-var">zamli</span>.<span className="tok-fname">append</span>(<span className="tok-var">f</span> * <span className="tok-number">1.20</span>)</div>
          </div>
          <div className="text-[11px] text-gray-500 mt-3">%20 zam: her fiyatı 1.20 ile çarp.</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="prog-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <ArrowRightLeft className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">List comprehension</span>
          </div>
          <div className="font-mono text-[12px] space-y-1 text-gray-300">
            <div><span className="tok-var">zamli</span> = [<span className="tok-var">f</span> * <span className="tok-number">1.20</span> <span className="tok-keyword">for</span> <span className="tok-var">f</span> <span className="tok-keyword">in</span> <span className="tok-var">fiyatlar</span>]</div>
            <div className="text-gray-600 mt-2"># süzme + dönüştürme birlikte:</div>
            <div>[<span className="tok-var">f</span>*<span className="tok-number">1.2</span> <span className="tok-keyword">for</span> <span className="tok-var">f</span> <span className="tok-keyword">in</span> <span className="tok-var">fiyatlar</span> <span className="tok-keyword">if</span> <span className="tok-var">f</span> &gt; <span className="tok-number">100</span>]</div>
          </div>
          <div className="text-[11px] text-gray-500 mt-3">Aynı sonuç, tek satır — okunabilirliği bozmadığı sürece tercih edilir.</div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 prog-card rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <AlertTriangle className="w-4 h-4 text-[#ffd43b] mt-0.5 flex-shrink-0" />
        <span>
          Döngü içinde gezdiğin diziye aynı anda <span className="text-white">eleman ekleyip silme</span>;
          gezme sırasında diziyi değiştirmek hatalı/atlanmış sonuç verir. Yeni bir diziye yaz.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  14 · SIK YAPILAN HATALAR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Hata avı · dizilerde tuzaklar</Eyebrow>
      <H2>En sık üç hata</H2>
      <Sub className="mt-3 max-w-3xl">
        Dizilerle çalışırken karşılaşacağın klasik hatalar. Bunları tanımak, hata
        mesajını okumayı ve hızlı düzeltmeyi sağlar.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={Hash}
          title="IndexError · sınır aşımı"
          desc="5 elemanlı dizide dizi[5] yok; son geçerli indeks len-1 yani 4&apos;tür. Döngü sınırına dikkat et."
          accent="#fca5a5"
          delay={0.1}
        />
        <FeatureCard
          icon={Layers}
          title="Referans paylaşımı"
          desc="b = a diziyi kopyalamaz; ikisi aynı listeyi gösterir. Kopya için a.copy() veya a[:] kullan."
          accent="#ffd43b"
          delay={0.2}
        />
        <FeatureCard
          icon={Repeat}
          title="0 yerine 1&apos;den saymak"
          desc="İndeks 0&apos;dan başlar. İlk eleman dizi[0], sonuncusu dizi[-1]. Bunu karıştırmak kapalı uçtan kayma yaratır."
          accent="#5fa8e0"
          delay={0.3}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 prog-card rounded-xl p-5"
      >
        <div className="text-xs font-mono uppercase tracking-widest text-[#fca5a5] mb-2">Örnek hata · terminal</div>
        <div className="font-mono text-[12px] text-gray-300 space-y-1">
          <div><span className="prog-terminal-prompt">user@mcbu</span><span className="text-gray-500"> $ </span>python dizi.py</div>
          <div className="text-[#ce9178]">Traceback (most recent call last):</div>
          <div className="text-gray-400">{"  "}File &quot;dizi.py&quot;, line 3, in &lt;module&gt;</div>
          <div className="text-gray-400">{"    "}print(notlar[5])</div>
          <div className="text-[#f87171]">IndexError: list index out of range</div>
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  15 · UYGULAMALI ALIŞTIRMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı görev</Eyebrow>
      <H2>Mini ödev: not analiz programı</H2>
      <Sub className="mt-3 max-w-3xl">
        Tek bir <span className="font-mono text-[#9cdcfe]">notlar</span> dizisi üzerinde bu haftaki dört deseni
        de uygula. Sonraki derse çalışan kodu ve terminal çıktısını getir.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 prog-card rounded-xl p-6 max-w-3xl mx-auto"
      >
        <div className="text-xs uppercase tracking-wider text-[#5fa8e0] mb-4 font-mono flex items-center gap-2">
          <ListOrdered className="w-4 h-4" />
          Görev listesi · Hafta 11
        </div>
        <div className="space-y-3">
          {[
            { t: "Ortalama ve toplam", d: "notlar = [55, 80, 42, 95, 67] → toplam ve ortalamayı yazdır" },
            { t: "En büyük ve en küçük", d: "Döngüyle bul; sonra max()/min() ile doğrula" },
            { t: "Geçenleri süz", d: "50 ve üzeri notları yeni bir &apos;gecenler&apos; dizisine ekle" },
            { t: "Sınıf raporu", d: "Kaç kişi geçti, kaç kişi kaldı, geçme oranı yüzde olarak" },
            { t: "Aranan notu bul", d: "Kullanıcıdan bir not iste, dizide var mı / hangi indekste — yaz" },
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
      <Eyebrow>Hafta 12 · Önizleme</Eyebrow>
      <H2>Dosya okuma ve yazma</H2>
      <Sub className="mt-3 max-w-3xl">
        Bu hafta verileri bellekte (dizide) tuttuk; program kapanınca kayboldular. Önümüzdeki
        hafta veriyi <span className="text-white font-semibold">kalıcı</span> hale getiriyoruz: bir dosyadan
        notları okuyup diziye almak, sonucu dosyaya yazmak.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <FeatureCard
          icon={FileText}
          title="Dosyadan okuma"
          desc="open() ile bir metin dosyasını aç, satırları diziye al, sayıya çevir."
          accent="#3776ab"
          delay={0.0}
        />
        <FeatureCard
          icon={Sigma}
          title="Diziyle işleme"
          desc="Bu haftaki desenleri (toplam, süzme, arama) gerçek veride uygula."
          accent="#5fa8e0"
          delay={0.1}
        />
        <FeatureCard
          icon={Sparkles}
          title="Dosyaya yazma"
          desc="Hesaplanan raporu yeni bir dosyaya yaz; with bloğuyla güvenli kapatma."
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
        Hazırlık: bu haftaki mini ödevin notlarını bir <span className="text-[#5fa8e0]">notlar.txt</span> dosyasına yaz, yanında getir.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  17 · KAPANIŞ  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center max-w-3xl mx-auto">
        <Eyebrow>Hafta 11 · Özet</Eyebrow>
        <H1>
          <span className="prog-shimmer">Gez · Ara · Süz</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Dizi ile problem çözmenin çekirdeği üç desendir: diziyi gezip indirgemek,
          içinde arama yapmak, koşula göre süzüp dönüştürmek. Gerisi bunların birleşimi.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10"
        >
          <StatCard
            icon={Sigma}
            value="sum / max"
            label="Gez ve indirge: tek değere ulaş"
            accent="#3776ab"
            delay={0.1}
          />
          <StatCard
            icon={Search}
            value="in / index"
            label="Ara: var mı, hangi indekste"
            accent="#ffd43b"
            delay={0.2}
          />
          <StatCard
            icon={Filter}
            value="[ … if … ]"
            label="Süz ve dönüştür: yeni dizi üret"
            accent="#86efac"
            delay={0.3}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
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
            <Brain className="w-5 h-5 text-[#5fa8e0] mb-2 mx-auto" />
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
              Teslim
            </div>
            <div className="text-white font-semibold mt-1">Mini ödev</div>
            <div className="text-sm text-gray-400">Not analiz programı</div>
          </div>

          <div className="prog-card rounded-xl p-5">
            <FileText className="w-5 h-5 text-[#5fa8e0] mb-2 mx-auto" />
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
              Sonraki hafta
            </div>
            <div className="text-white font-semibold mt-1">H12</div>
            <div className="text-sm text-gray-400">Dosya okuma/yazma</div>
          </div>
        </motion.div>

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
          BVA 1101 · 11. Hafta · Dizi ile Problem Çözme
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
