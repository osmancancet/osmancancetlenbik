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
  ArrowDownWideNarrow,
  Search,
  Repeat,
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
  Hash,
  Binary,
  GitBranch,
  Scale,
  Clock,
  ListOrdered,
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

/* ---- Array row visualizer ----------------------------------- */

type CellState = "normal" | "active" | "sorted" | "found";

function ArrayRow({
  label,
  cells,
  delay = 0,
}: {
  label?: string;
  cells: Array<{ v: string; state?: CellState }>;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay }}
      className="flex items-center gap-3"
    >
      {label && (
        <span className="w-24 text-[11px] font-mono text-gray-500 text-right flex-shrink-0">
          {label}
        </span>
      )}
      <div className="flex gap-1.5">
        {cells.map((c, i) => {
          const cls =
            c.state === "active"
              ? "prog-array-cell prog-array-cell-active"
              : c.state === "sorted"
              ? "prog-array-cell prog-array-cell-sorted"
              : c.state === "found"
              ? "prog-array-cell prog-array-cell-found"
              : "prog-array-cell";
          return (
            <div
              key={i}
              className={`${cls} w-11 h-11 rounded-md flex items-center justify-center text-sm font-semibold`}
            >
              {c.v}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ---- Recursion call-stack diagram --------------------------- */

function CallStack({
  frames,
}: {
  frames: Array<{ call: string; ret?: string; depth: number }>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="prog-flow-bg p-6 w-full"
    >
      <div className="text-[10px] font-mono uppercase tracking-widest text-[#5fa8e0] mb-4">
        Çağrı yığını · faktoriyel(4)
      </div>
      <div className="space-y-2">
        {frames.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + i * 0.12 }}
            className="flex items-center gap-3"
            style={{ paddingLeft: `${f.depth * 28}px` }}
          >
            <div className="prog-card rounded-lg px-4 py-2.5 flex items-center justify-between flex-1 max-w-xl">
              <span className="font-mono text-sm text-[#9cdcfe]">{f.call}</span>
              {f.ret && (
                <span className="font-mono text-xs text-[#86efac]">
                  &rarr; döner {f.ret}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 text-[11px] text-gray-500">
        Her çağrı bir alt çağrı açar (iniş); taban duruma ulaşınca sonuçlar geriye
        çarpılarak toplanır (çıkış).
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
        <Eyebrow>BVA 1101 · 14. Hafta · Bahar Dönemi</Eyebrow>
        <H1>
          <span className="prog-shimmer">Sıralama, Arama ve Rekürsiyon</span>
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Bir listeyi düzene sokmak, içinde hızlıca aramak ve bir fonksiyonun
          kendini çağırması — üç temel algoritmik araç.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 mt-14 max-w-3xl mx-auto"
        >
          {[
            { name: "Sıralama", icon: ArrowDownWideNarrow, color: "#3776ab", desc: "Veriyi düzene sok" },
            { name: "Arama", icon: Search, color: "#ffd43b", desc: "Aradığını çabuk bul" },
            { name: "Rekürsiyon", icon: Repeat, color: "#86efac", desc: "Kendini çağıran çözüm" },
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

  /* ─────────────────  2 · KÖPRÜ / HEDEF  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 13. haftadan 14. haftaya</Eyebrow>
      <H2>Verimiz artık listede; peki onunla ne yapacağız?</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta diziler/listeler ve fonksiyonlar ile veriyi tek bir yapıda
        toplamayı öğrendik. Bu hafta o listeyi <span className="text-white font-semibold">düzene sokmayı</span> (sıralama),
        içinde <span className="text-white font-semibold">verimli aramayı</span> ve problemleri kendini çağıran
        fonksiyonlarla (rekürsiyon) çözmeyi göreceğiz.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <FeatureCard
          icon={ArrowDownWideNarrow}
          title="Sıralama"
          desc="Seçmeli ve kabarcık sıralamayı adım adım izleyip nasıl çalıştıklarını göreceğiz."
          delay={0.0}
          accent="#3776ab"
        />
        <FeatureCard
          icon={Search}
          title="Arama"
          desc="Doğrusal arama ile ikili aramayı karşılaştıracak, neden farkın büyük olduğunu anlayacağız."
          delay={0.1}
          accent="#ffd43b"
        />
        <FeatureCard
          icon={Repeat}
          title="Rekürsiyon"
          desc="Taban durum ve özyineli adım kavramını, çağrı yığını üzerinden somutlaştıracağız."
          delay={0.2}
          accent="#86efac"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 prog-card rounded-xl p-5 flex items-center gap-4"
      >
        <Clock className="w-6 h-6 text-[#5fa8e0] flex-shrink-0" />
        <div className="text-sm text-gray-300">
          <span className="text-white font-semibold">Bu haftanın anahtar fikri:</span> Aynı işi
          yapan iki algoritma çok farklı hızlarda çalışabilir. &quot;Çalışıyor&quot; yetmez —
          &quot;ne kadar adımda çalışıyor&quot; sorusunu da sormaya başlıyoruz.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  3 · SECTION 1/3 · SIRALAMA  ───────────────── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Sıralama Algoritmaları"
      subtitle="Bir listeyi küçükten büyüğe (veya tersine) dizmek — birçok başka işlemin ön koşulu."
      glowClass="prog-glow-blue"
      icon={<ArrowDownWideNarrow className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  4 · NEDEN SIRALAMA?  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 1 · Sıralama</Eyebrow>
      <H2>Neden sıralarız?</H2>
      <Sub className="mt-3 max-w-3xl">
        Sıralama tek başına amaç değil; <span className="text-white font-semibold">başka işleri
        kolaylaştırdığı</span> için yaparız. Sıralı veride aramak, en küçüğü/en büyüğü bulmak ve
        tekrarları ayıklamak çok daha hızlıdır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <FeatureCard
          icon={Search}
          title="Hızlı arama"
          desc="Sıralı listede ikili arama yapılabilir; aradığını çok daha az adımda bulursun."
          delay={0.0}
          accent="#3776ab"
        />
        <FeatureCard
          icon={ListOrdered}
          title="Düzenli sunum"
          desc="Sınıf listesi, fiyat listesi, sonuç tablosu — insan gözü sıralı veriyi daha kolay okur."
          delay={0.1}
          accent="#5fa8e0"
        />
        <FeatureCard
          icon={Scale}
          title="Karşılaştırma"
          desc="En yakın iki değeri bulmak, medyan almak, tekrarı saptamak sıralı veride basitleşir."
          delay={0.2}
          accent="#ffd43b"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 prog-card-yellow rounded-xl p-5 flex items-center gap-4"
      >
        <Lightbulb className="w-7 h-7 text-[#ffd43b] flex-shrink-0" />
        <div className="text-sm text-gray-300">
          <span className="text-white font-semibold">Pratikte:</span> Python&apos;da hazır{" "}
          <span className="font-mono text-[#9cdcfe]">sorted(liste)</span> ve{" "}
          <span className="font-mono text-[#9cdcfe]">liste.sort()</span> vardır. Biz mantığını
          anlamak için elle yazıyoruz — gerçek projede genellikle hazırını kullanırsın.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  5 · SEÇMELİ SIRALAMA — GÖRSEL  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Seçmeli sıralama · selection sort</Eyebrow>
      <H2 className="mb-2">En küçüğü seç, başa al, tekrarla</H2>
      <Sub className="max-w-3xl mb-6">
        Her turda kalan kısmın <span className="text-white">en küçük</span> elemanını bulup sıranın
        başındaki yerine yerleştiririz. Sol taraf adım adım sıralanır (yeşil).
      </Sub>

      <div className="prog-card rounded-xl p-6 space-y-3">
        <ArrayRow
          label="başlangıç"
          delay={0.0}
          cells={[
            { v: "29" }, { v: "10" }, { v: "14" }, { v: "37" }, { v: "13" },
          ]}
        />
        <ArrayRow
          label="tur 1 sonu"
          delay={0.12}
          cells={[
            { v: "10", state: "sorted" }, { v: "29", state: "active" }, { v: "14" }, { v: "37" }, { v: "13" },
          ]}
        />
        <ArrayRow
          label="tur 2 sonu"
          delay={0.24}
          cells={[
            { v: "10", state: "sorted" }, { v: "13", state: "sorted" }, { v: "14", state: "active" }, { v: "37" }, { v: "29" },
          ]}
        />
        <ArrayRow
          label="tur 3 sonu"
          delay={0.36}
          cells={[
            { v: "10", state: "sorted" }, { v: "13", state: "sorted" }, { v: "14", state: "sorted" }, { v: "37", state: "active" }, { v: "29" },
          ]}
        />
        <ArrayRow
          label="sonuç"
          delay={0.48}
          cells={[
            { v: "10", state: "sorted" }, { v: "13", state: "sorted" }, { v: "14", state: "sorted" }, { v: "29", state: "sorted" }, { v: "37", state: "sorted" },
          ]}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-4 text-xs text-gray-500 font-mono text-center"
      >
        Yeşil = kesin yerine oturmuş · Sarı = bu turda taşınan en küçük eleman
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  6 · SEÇMELİ SIRALAMA — KOD  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Seçmeli sıralama · Python</Eyebrow>
      <H2 className="mb-2">Aynı mantık, on satır kod</H2>
      <Sub className="max-w-3xl">
        İç içe iki döngü: dış döngü sıranın hangi yerini dolduracağımızı, iç döngü kalan
        kısımdaki en küçüğü bulmayı sağlar.
      </Sub>

      <div className="mt-6">
        <CodeEditor
          title="secmeli_siralama.py — Visual Studio Code"
          tabs={["secmeli_siralama.py", "README.md"]}
          activeTab="secmeli_siralama.py"
          lines={[
            <>
              <span className="tok-keyword">def</span>{" "}
              <span className="tok-fname">secmeli_sirala</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">dizi</span>
              <span className="tok-punct">):</span>
            </>,
            <>
              {"  "}
              <span className="tok-keyword">for</span>{" "}
              <span className="tok-var">i</span>{" "}
              <span className="tok-keyword">in</span>{" "}
              <span className="tok-builtin">range</span>
              <span className="tok-punct">(</span>
              <span className="tok-builtin">len</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">dizi</span>
              <span className="tok-punct">)):</span>
            </>,
            <>
              {"    "}
              <span className="tok-var">en_kucuk</span>
              <span className="tok-operator"> = </span>
              <span className="tok-var">i</span>
            </>,
            <>
              {"    "}
              <span className="tok-keyword">for</span>{" "}
              <span className="tok-var">j</span>{" "}
              <span className="tok-keyword">in</span>{" "}
              <span className="tok-builtin">range</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">i</span>
              <span className="tok-operator"> + </span>
              <span className="tok-number">1</span>
              <span className="tok-punct">, </span>
              <span className="tok-builtin">len</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">dizi</span>
              <span className="tok-punct">)):</span>
            </>,
            <>
              {"      "}
              <span className="tok-keyword">if</span>{" "}
              <span className="tok-var">dizi</span>
              <span className="tok-punct">[</span>
              <span className="tok-var">j</span>
              <span className="tok-punct">] &lt; </span>
              <span className="tok-var">dizi</span>
              <span className="tok-punct">[</span>
              <span className="tok-var">en_kucuk</span>
              <span className="tok-punct">]:</span>
            </>,
            <>
              {"        "}
              <span className="tok-var">en_kucuk</span>
              <span className="tok-operator"> = </span>
              <span className="tok-var">j</span>
            </>,
            <>
              {"    "}
              <span className="tok-comment"># en küçüğü baştaki ile yer değiştir</span>
            </>,
            <>
              {"    "}
              <span className="tok-var">dizi</span>
              <span className="tok-punct">[</span>
              <span className="tok-var">i</span>
              <span className="tok-punct">], </span>
              <span className="tok-var">dizi</span>
              <span className="tok-punct">[</span>
              <span className="tok-var">en_kucuk</span>
              <span className="tok-punct">] = </span>
              <span className="tok-var">dizi</span>
              <span className="tok-punct">[</span>
              <span className="tok-var">en_kucuk</span>
              <span className="tok-punct">], </span>
              <span className="tok-var">dizi</span>
              <span className="tok-punct">[</span>
              <span className="tok-var">i</span>
              <span className="tok-punct">]</span>
            </>,
            <>
              {"  "}
              <span className="tok-keyword">return</span>{" "}
              <span className="tok-var">dizi</span>
            </>,
          ]}
          terminal={
            <div className="leading-relaxed">
              <div>
                <span className="prog-terminal-prompt">user@mcbu</span>
                <span className="text-gray-500"> $ </span>
                <span className="prog-terminal-out">python secmeli_siralama.py</span>
              </div>
              <div className="prog-terminal-out">
                secmeli_sirala([29, 10, 14, 37, 13])
              </div>
              <div className="prog-terminal-out">
                &rarr; <span className="prog-terminal-user">[10, 13, 14, 29, 37]</span>
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

  /* ─────────────────  7 · KABARCIK SIRALAMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kabarcık sıralama · bubble sort</Eyebrow>
      <H2 className="mb-2">Komşuları karşılaştır, gerekirse takas et</H2>
      <Sub className="max-w-3xl mb-6">
        Yan yana iki elemana bakarız; soldaki büyükse yer değiştirirler. Her turda en büyük
        eleman sağ uca &quot;kabarır&quot;. Aşağıda ilk turun ilk üç karşılaştırması:
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="prog-card rounded-xl p-6 space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-[#5fa8e0] mb-2">
            Tur 1 · adım adım
          </div>
          <ArrayRow
            label="5 &gt; 1 → takas"
            delay={0.0}
            cells={[
              { v: "5", state: "active" }, { v: "1", state: "active" }, { v: "4" }, { v: "2" },
            ]}
          />
          <ArrayRow
            label="5 &gt; 4 → takas"
            delay={0.12}
            cells={[
              { v: "1" }, { v: "5", state: "active" }, { v: "4", state: "active" }, { v: "2" },
            ]}
          />
          <ArrayRow
            label="5 &gt; 2 → takas"
            delay={0.24}
            cells={[
              { v: "1" }, { v: "4" }, { v: "5", state: "active" }, { v: "2", state: "active" },
            ]}
          />
          <ArrayRow
            label="tur 1 sonu"
            delay={0.36}
            cells={[
              { v: "1" }, { v: "4" }, { v: "2" }, { v: "5", state: "sorted" },
            ]}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="prog-card rounded-xl p-6 flex flex-col justify-center"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#ffd43b]/20 border border-[#ffd43b]/50 flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#ffd43b]" />
            </div>
            <div className="text-white font-semibold">Püf noktası</div>
          </div>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5fa8e0] flex-shrink-0" />
              Her tam turda en az bir eleman kesin yerine oturur.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5fa8e0] flex-shrink-0" />
              Bir turda hiç takas olmadıysa dizi zaten sıralıdır; erken durabiliriz.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#5fa8e0] flex-shrink-0" />
              Anlaması çok kolaydır ama büyük listelerde yavaş kalır.
            </li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  8 · KARMAŞIKLIK · BÜYÜK-O  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Verimlilik · büyük-O gösterimi</Eyebrow>
      <H2>Aynı işi yapan algoritmalar, farklı maliyet</H2>
      <Sub className="mt-3 max-w-3xl">
        Bir algoritmanın kabaca kaç adımda çalıştığını <span className="text-white font-semibold">büyük-O</span> ile
        ifade ederiz. Liste büyüdükçe adım sayısının nasıl arttığına bakarız.
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
              <th>Algoritma</th>
              <th>Tür</th>
              <th>Tipik karmaşıklık</th>
              <th>Yorum</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold text-white">Seçmeli sıralama</td>
              <td>Sıralama</td>
              <td className="font-mono text-[#9cdcfe]">O(n²)</td>
              <td>Liste 10 kat büyürse adım yaklaşık 100 kat artar.</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Kabarcık sıralama</td>
              <td>Sıralama</td>
              <td className="font-mono text-[#9cdcfe]">O(n²)</td>
              <td>Basit ama büyük veride yavaş; eğitim amaçlı tercih edilir.</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Doğrusal arama</td>
              <td>Arama</td>
              <td className="font-mono text-[#9cdcfe]">O(n)</td>
              <td>En kötü durumda tüm elemanlara tek tek bakar.</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">İkili arama</td>
              <td>Arama (sıralı)</td>
              <td className="font-mono text-[#86efac]">O(log n)</td>
              <td>Her adımda kalan kısmı yarıya böler — çok hızlı.</td>
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
        Not: Python&apos;un yerleşik sort&apos;u ortalama O(n log n)&apos;dir; bizim elle
        yazdıklarımız öğrenme amaçlı daha basit sürümlerdir.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  9 · SECTION 2/3 · ARAMA  ───────────────── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Arama Algoritmaları"
      subtitle="Bir değeri bir listede bulmak. İki yöntem var ve aralarındaki hız farkı çarpıcı."
      glowClass="prog-glow-yellow"
      icon={<Search className="w-14 h-14 text-[#1a1a1a]" />}
    />
  ),

  /* ─────────────────  10 · DOĞRUSAL ARAMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 2 · Arama</Eyebrow>
      <H2 className="mb-2">Doğrusal arama: baştan sona tara</H2>
      <Sub className="max-w-3xl mb-6">
        En basit yöntem: ilk elemandan başla, aradığını bulana kadar tek tek bak. Liste sıralı
        olmasa bile çalışır. Hedef: <span className="font-mono text-[#ffd43b]">22</span>.
      </Sub>

      <div className="prog-card rounded-xl p-6 space-y-3">
        <ArrayRow
          label="adım 1 · 8?"
          delay={0.0}
          cells={[
            { v: "8", state: "active" }, { v: "3" }, { v: "22" }, { v: "17" }, { v: "5" },
          ]}
        />
        <ArrayRow
          label="adım 2 · 3?"
          delay={0.14}
          cells={[
            { v: "8" }, { v: "3", state: "active" }, { v: "22" }, { v: "17" }, { v: "5" },
          ]}
        />
        <ArrayRow
          label="adım 3 · 22? ✓"
          delay={0.28}
          cells={[
            { v: "8" }, { v: "3" }, { v: "22", state: "found" }, { v: "17" }, { v: "5" },
          ]}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="prog-card rounded-lg p-4 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#86efac] mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-300">
            <span className="text-white font-semibold">Artı:</span> Liste sıralı olmasa da çalışır,
            yazması çok kolaydır.
          </div>
        </div>
        <div className="prog-card rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#fca5a5] mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-300">
            <span className="text-white font-semibold">Eksi:</span> En kötü durumda{" "}
            <span className="font-mono text-[#9cdcfe]">n</span> elemanın hepsine bakar — O(n).
          </div>
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  11 · İKİLİ ARAMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>İkili arama · binary search</Eyebrow>
      <H2 className="mb-2">Sıralı listeyi her adımda yarıya böl</H2>
      <Sub className="max-w-3xl mb-6">
        Liste <span className="text-white">sıralı olmalı</span>. Ortadaki elemana bak: hedef küçükse
        sol yarıya, büyükse sağ yarıya geç. Hedef: <span className="font-mono text-[#ffd43b]">23</span>.
      </Sub>

      <div className="prog-card rounded-xl p-6 space-y-3">
        <ArrayRow
          label="orta=14, 23&gt;14"
          delay={0.0}
          cells={[
            { v: "2" }, { v: "7" }, { v: "9" }, { v: "14", state: "active" }, { v: "20" }, { v: "23" }, { v: "31" },
          ]}
        />
        <ArrayRow
          label="sağ yarı · orta=23"
          delay={0.16}
          cells={[
            { v: "2" }, { v: "7" }, { v: "9" }, { v: "14" }, { v: "20" }, { v: "23", state: "active" }, { v: "31" },
          ]}
        />
        <ArrayRow
          label="bulundu ✓"
          delay={0.32}
          cells={[
            { v: "2" }, { v: "7" }, { v: "9" }, { v: "14" }, { v: "20" }, { v: "23", state: "found" }, { v: "31" },
          ]}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 prog-card-yellow rounded-xl p-5 flex items-center gap-4"
      >
        <Binary className="w-7 h-7 text-[#ffd43b] flex-shrink-0" />
        <div className="text-sm text-gray-300">
          <span className="text-white font-semibold">Güç buradan geliyor:</span> 1.000.000 elemanlı
          sıralı bir listede ikili arama en fazla yaklaşık <span className="font-mono text-[#9cdcfe]">20</span> adımda
          sonuç verir (log₂ 1.000.000 ≈ 20). Doğrusal arama en kötü durumda bir milyon adım yapardı.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  12 · İKİLİ ARAMA KOD  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>İkili arama · Python</Eyebrow>
      <H2 className="mb-2">Sol-sağ sınırları ortada buluştur</H2>
      <Sub className="max-w-3xl">
        İki işaretçi tutarız: <span className="font-mono text-[#9cdcfe]">sol</span> ve{" "}
        <span className="font-mono text-[#9cdcfe]">sag</span>. Ortayı kontrol eder, hedefe göre
        aralığı daraltırız. Bulamazsak <span className="font-mono text-[#c586c0]">-1</span> döneriz.
      </Sub>

      <div className="mt-6">
        <CodeEditor
          title="ikili_arama.py — Visual Studio Code"
          tabs={["ikili_arama.py", "README.md"]}
          activeTab="ikili_arama.py"
          lines={[
            <>
              <span className="tok-keyword">def</span>{" "}
              <span className="tok-fname">ikili_ara</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">dizi</span>
              <span className="tok-punct">, </span>
              <span className="tok-var">hedef</span>
              <span className="tok-punct">):</span>
            </>,
            <>
              {"  "}
              <span className="tok-var">sol</span>
              <span className="tok-punct">, </span>
              <span className="tok-var">sag</span>
              <span className="tok-operator"> = </span>
              <span className="tok-number">0</span>
              <span className="tok-punct">, </span>
              <span className="tok-builtin">len</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">dizi</span>
              <span className="tok-punct">) - </span>
              <span className="tok-number">1</span>
            </>,
            <>
              {"  "}
              <span className="tok-keyword">while</span>{" "}
              <span className="tok-var">sol</span>
              <span className="tok-punct"> &lt;= </span>
              <span className="tok-var">sag</span>
              <span className="tok-punct">:</span>
            </>,
            <>
              {"    "}
              <span className="tok-var">orta</span>
              <span className="tok-operator"> = </span>
              <span className="tok-punct">(</span>
              <span className="tok-var">sol</span>
              <span className="tok-operator"> + </span>
              <span className="tok-var">sag</span>
              <span className="tok-punct">) // </span>
              <span className="tok-number">2</span>
            </>,
            <>
              {"    "}
              <span className="tok-keyword">if</span>{" "}
              <span className="tok-var">dizi</span>
              <span className="tok-punct">[</span>
              <span className="tok-var">orta</span>
              <span className="tok-punct">] == </span>
              <span className="tok-var">hedef</span>
              <span className="tok-punct">:</span>
            </>,
            <>
              {"      "}
              <span className="tok-keyword">return</span>{" "}
              <span className="tok-var">orta</span>
              {"  "}
              <span className="tok-comment"># indeks bulundu</span>
            </>,
            <>
              {"    "}
              <span className="tok-keyword">elif</span>{" "}
              <span className="tok-var">dizi</span>
              <span className="tok-punct">[</span>
              <span className="tok-var">orta</span>
              <span className="tok-punct">] &lt; </span>
              <span className="tok-var">hedef</span>
              <span className="tok-punct">:</span>
            </>,
            <>
              {"      "}
              <span className="tok-var">sol</span>
              <span className="tok-operator"> = </span>
              <span className="tok-var">orta</span>
              <span className="tok-operator"> + </span>
              <span className="tok-number">1</span>
            </>,
            <>
              {"    "}
              <span className="tok-keyword">else</span>
              <span className="tok-punct">:</span>
            </>,
            <>
              {"      "}
              <span className="tok-var">sag</span>
              <span className="tok-operator"> = </span>
              <span className="tok-var">orta</span>
              <span className="tok-operator"> - </span>
              <span className="tok-number">1</span>
            </>,
            <>
              {"  "}
              <span className="tok-keyword">return</span>{" "}
              <span className="tok-number">-1</span>
              {"  "}
              <span className="tok-comment"># bulunamadı</span>
            </>,
          ]}
          terminal={
            <div className="leading-relaxed">
              <div>
                <span className="prog-terminal-prompt">user@mcbu</span>
                <span className="text-gray-500"> $ </span>
                <span className="prog-terminal-out">python ikili_arama.py</span>
              </div>
              <div className="prog-terminal-out">
                ikili_ara([2, 7, 9, 14, 20, 23, 31], 23)
              </div>
              <div className="prog-terminal-out">
                &rarr; <span className="prog-terminal-user">5</span>{" "}
                <span className="text-gray-500"># 23 sayısı 5. indekste</span>
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

  /* ─────────────────  13 · SECTION 3/3 · REKÜRSİYON  ───────────────── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Rekürsif Fonksiyonlar"
      subtitle="Bir fonksiyonun problemi küçülterek kendi kendini çağırması — döngülere zarif bir alternatif."
      glowClass="prog-glow-purple"
      icon={<Repeat className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  14 · REKÜRSİYON NEDİR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 3 · Rekürsiyon</Eyebrow>
      <H2>Rekürsiyon: kendini çağıran fonksiyon</H2>
      <Sub className="mt-3 max-w-3xl">
        Bir problemi, <span className="text-white font-semibold">aynı problemin daha küçük bir
        hâline</span> indirgeyerek çözmektir. İki parçası mutlaka olmalı: bir{" "}
        <span className="text-[#86efac] font-semibold">taban durum</span> (durma noktası) ve bir{" "}
        <span className="text-[#9cdcfe] font-semibold">özyineli adım</span> (kendini çağırma).
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        <FeatureCard
          icon={Target}
          title="Taban durum"
          desc="Fonksiyonun artık kendini çağırmadan doğrudan sonuç döndürdüğü en küçük durum. Olmazsa sonsuza dek çağrılır."
          delay={0.0}
          accent="#86efac"
        />
        <FeatureCard
          icon={GitBranch}
          title="Özyineli adım"
          desc="Problemi bir adım küçültüp fonksiyonun kendini tekrar çağırdığı kısım. Her çağrı tabana yaklaşmalı."
          delay={0.1}
          accent="#5fa8e0"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 prog-card rounded-xl p-5 flex items-start gap-4"
      >
        <AlertTriangle className="w-6 h-6 text-[#ffd43b] mt-0.5 flex-shrink-0" />
        <div className="text-sm text-gray-300">
          <span className="text-white font-semibold">Dikkat:</span> Taban durumu unutursan ya da
          her adımda problemi küçültmezsen, Python bir noktada{" "}
          <span className="font-mono text-[#fca5a5]">RecursionError: maximum recursion depth exceeded</span>{" "}
          hatası verir. Sonsuz döngünün rekürsif karşılığıdır.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  15 · FAKTORİYEL · KOD + YIĞIN  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Klasik örnek · faktöriyel</Eyebrow>
      <H2 className="mb-2">n! = n × (n-1)!</H2>
      <Sub className="max-w-3xl mb-6">
        Faktöriyel rekürsiyonun ders kitabı örneğidir: <span className="font-mono text-[#9cdcfe]">4! = 4 × 3!</span>,{" "}
        <span className="font-mono text-[#9cdcfe]">3! = 3 × 2!</span> ... Taban durum{" "}
        <span className="font-mono text-[#86efac]">0! = 1</span>&apos;dir.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <CodeEditor
          title="faktoriyel.py"
          tabs={["faktoriyel.py"]}
          activeTab="faktoriyel.py"
          lines={[
            <>
              <span className="tok-keyword">def</span>{" "}
              <span className="tok-fname">faktoriyel</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">n</span>
              <span className="tok-punct">):</span>
            </>,
            <>
              {"  "}
              <span className="tok-comment"># taban durum</span>
            </>,
            <>
              {"  "}
              <span className="tok-keyword">if</span>{" "}
              <span className="tok-var">n</span>
              <span className="tok-punct"> == </span>
              <span className="tok-number">0</span>
              <span className="tok-punct">:</span>
            </>,
            <>
              {"    "}
              <span className="tok-keyword">return</span>{" "}
              <span className="tok-number">1</span>
            </>,
            <>
              {"  "}
              <span className="tok-comment"># özyineli adım</span>
            </>,
            <>
              {"  "}
              <span className="tok-keyword">return</span>{" "}
              <span className="tok-var">n</span>
              <span className="tok-operator"> * </span>
              <span className="tok-fname">faktoriyel</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">n</span>
              <span className="tok-operator"> - </span>
              <span className="tok-number">1</span>
              <span className="tok-punct">)</span>
            </>,
            "",
            <>
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-fname">faktoriyel</span>
              <span className="tok-punct">(</span>
              <span className="tok-number">4</span>
              <span className="tok-punct">))</span>
              {"  "}
              <span className="tok-comment"># 24</span>
            </>,
          ]}
        />

        <CallStack
          frames={[
            { call: "faktoriyel(4)", depth: 0 },
            { call: "faktoriyel(3)", depth: 1 },
            { call: "faktoriyel(2)", depth: 2 },
            { call: "faktoriyel(1)", depth: 3 },
            { call: "faktoriyel(0)", ret: "1", depth: 4 },
            { call: "→ 1 × 1 = 1", ret: "1", depth: 3 },
            { call: "→ 2 × 1 = 2", ret: "2", depth: 2 },
            { call: "→ 3 × 2 = 6", ret: "6", depth: 1 },
            { call: "→ 4 × 6 = 24", ret: "24", depth: 0 },
          ]}
        />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  16 · DÖNGÜ vs REKÜRSİYON  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Karşılaştırma · iki yol, aynı sonuç</Eyebrow>
      <H2>Döngü mü, rekürsiyon mu?</H2>
      <Sub className="mt-3 max-w-3xl">
        Çoğu rekürsif çözüm döngüyle de yazılabilir. Hangisinin daha okunabilir olduğu probleme
        bağlıdır; ikisini de bilmek gerekir.
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
              <th>Döngü (iteratif)</th>
              <th>Rekürsiyon</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold text-white">Yapı</td>
              <td>for / while ile tekrar</td>
              <td>Fonksiyon kendini çağırır</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Bellek</td>
              <td>Genelde sabit, düşük</td>
              <td>Her çağrı yığında yer kaplar</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Okunabilirlik</td>
              <td>Basit tekrarlarda net</td>
              <td>Ağaç/parçalama problemlerinde çok zarif</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Risk</td>
              <td>Sonsuz döngü</td>
              <td>Taban durum yoksa RecursionError</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">İyi olduğu yer</td>
              <td>Sayma, toplama, basit gezinme</td>
              <td>Faktöriyel, klasör ağacı, ikili arama</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  17 · UYGULAMALI ALIŞTIRMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı alıştırma</Eyebrow>
      <H2>Kendi makinende dört görev</H2>
      <Sub className="mt-3 max-w-3xl">
        Üç konuyu da elle uygula. Sonraki derse kodlarını ve terminal çıktının ekran görüntüsünü
        alarak gel.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 prog-card rounded-xl p-6 max-w-3xl mx-auto"
      >
        <div className="text-xs uppercase tracking-wider text-[#5fa8e0] mb-4 font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Görev listesi · Hafta 14
        </div>
        <div className="space-y-3">
          {[
            { t: "Seçmeli sıralamayı yaz", d: "[29, 10, 14, 37, 13] listesini elle sırala; her turdaki diziyi yazdır." },
            { t: "Doğrusal aramayı yaz", d: "Bir sayı sor; listede varsa indeksini, yoksa -1 döndür." },
            { t: "İkili aramayı dene", d: "Sıralı bir listede ikili aramayı çalıştır; kaç adımda bulduğunu say." },
            { t: "Rekürsif toplam yaz", d: "1&apos;den n&apos;e kadar olan sayıları rekürsif bir fonksiyonla topla; taban durumu unutma." },
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
                <div
                  className="text-xs text-gray-400 mt-0.5"
                  dangerouslySetInnerHTML={{ __html: item.d }}
                />
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

  /* ─────────────────  18 · SIRADAKİ HAFTA + KAPANIŞ  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>Hafta 15 · Önizleme ve dönem kapanışı</Eyebrow>
        <H1>
          <span className="prog-shimmer">Genel Tekrar</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Önümüzdeki hafta tüm dönemi baştan sona toparlıyoruz: değişkenlerden döngülere,
          fonksiyonlardan bu haftaki algoritmalara kadar — final öncesi büyük tekrar.
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
            <Hash className="w-5 h-5 text-[#5fa8e0] mb-2 mx-auto" />
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
              Getir
            </div>
            <div className="text-white font-semibold mt-1">4 görev</div>
            <div className="text-sm text-gray-400">kod + ekran görüntüsü</div>
          </div>

          <div className="prog-card rounded-xl p-5">
            <FileText className="w-5 h-5 text-[#5fa8e0] mb-2 mx-auto" />
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
              Sonraki hafta
            </div>
            <div className="text-white font-semibold mt-1">H15</div>
            <div className="text-sm text-gray-400">Genel tekrar · final</div>
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
          BVA 1101 · 14. Hafta · Sıralama, Arama ve Rekürsiyon
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
