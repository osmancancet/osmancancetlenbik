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
  Brain,
  Target,
  Lightbulb,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  AlertTriangle,
  Hash,
  CheckCircle2,
  Layers,
  Database,
  Calendar,
  Boxes,
  ListOrdered,
  Repeat,
  Ruler,
  ArrowRightLeft,
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

/* ---- Array memory diagram ------------------------------------ */

function ArrayDiagram({
  name,
  cells,
  activeIndex,
  delay = 0,
}: {
  name: string;
  cells: string[];
  activeIndex?: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="prog-flow-bg p-6 w-full"
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="font-mono text-sm text-[#9cdcfe]">{name}</span>
        <span className="text-[11px] font-mono text-gray-500">
          uzunluk = {cells.length}
        </span>
      </div>

      <div className="flex items-end gap-2 overflow-x-auto pb-2">
        {cells.map((val, i) => (
          <div key={i} className="flex flex-col items-center gap-2 flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + 0.1 + i * 0.07 }}
              className={`prog-arr-cell w-16 h-16 rounded-lg text-base ${
                i === activeIndex ? "prog-arr-cell-active" : ""
              }`}
            >
              {val}
            </motion.div>
            <div className="prog-arr-index">[{i}]</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[11px] font-mono text-gray-500">
        <span>
          İlk eleman: <span className="text-[#5fa8e0]">{name}[0]</span>
        </span>
        <span>
          Son eleman:{" "}
          <span className="text-[#5fa8e0]">
            {name}[{cells.length - 1}]
          </span>{" "}
          ya da <span className="text-[#5fa8e0]">{name}[-1]</span>
        </span>
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
        <Eyebrow>BVA 1101 · 9. Hafta · Bahar Dönemi</Eyebrow>
        <H1>
          <span className="prog-shimmer">Diziler</span>
          <br />
          <span className="text-white/90">Tek Boyutlu Diziler</span>
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Tek bir isim altında çok sayıda değer. Dizi tanımı, indeksleme ve tek
          boyutlu dizilerle çalışmanın temelleri.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 mt-14 max-w-3xl mx-auto"
        >
          {[
            { name: "Tanım", tag: "[]", color: "#3776ab", desc: "Diziyi oluşturmak" },
            { name: "İndeks", tag: "[i]", color: "#5fa8e0", desc: "Elemana erişmek" },
            { name: "Döngü", tag: "for", color: "#ffd43b", desc: "Tüm elemanları gezmek" },
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
      <Eyebrow>Köprü · 7. haftadan 9. haftaya</Eyebrow>
      <H2>Döngüyü öğrendik; şimdi döngüye verecek veri lazım</H2>
      <Sub className="mt-3 max-w-3xl">
        7. haftada <span className="text-white font-semibold">for</span> ve{" "}
        <span className="text-white font-semibold">while</span> döngülerini gördük.
        Ama 100 öğrencinin notunu 100 ayrı değişkende tutamayız. Bu hafta o değerleri{" "}
        <span className="text-white font-semibold">tek bir dizide</span> toplayıp döngüyle gezeceğiz.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fca5a5]">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Dizi olmadan</span>
          </div>
          <div className="prog-editor rounded-lg px-4 py-3 text-[12px]">
            <div>
              <span className="tok-var">not1</span>
              <span className="tok-operator"> = </span>
              <span className="tok-number">75</span>
            </div>
            <div>
              <span className="tok-var">not2</span>
              <span className="tok-operator"> = </span>
              <span className="tok-number">90</span>
            </div>
            <div>
              <span className="tok-var">not3</span>
              <span className="tok-operator"> = </span>
              <span className="tok-number">60</span>
            </div>
            <div className="tok-comment"># ...not100&apos;e kadar?</div>
          </div>
          <div className="text-[11px] text-gray-500 mt-3">
            Yüz değişken, yüz satır. Ortalamayı almak kâbus.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Dizi ile</span>
          </div>
          <div className="prog-editor rounded-lg px-4 py-3 text-[12px]">
            <div>
              <span className="tok-var">notlar</span>
              <span className="tok-operator"> = </span>
              <span className="tok-punct">[</span>
              <span className="tok-number">75</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">90</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">60</span>
              <span className="tok-punct">, ...]</span>
            </div>
            <div className="tok-comment"># tek isim, yüz değer</div>
            <div>
              <span className="tok-builtin">sum</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">notlar</span>
              <span className="tok-punct">) / </span>
              <span className="tok-builtin">len</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">notlar</span>
              <span className="tok-punct">)</span>
            </div>
          </div>
          <div className="text-[11px] text-gray-500 mt-3">
            Tek değişken, döngüyle gezilir, ortalama tek satır.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3 · BU DERSİN AKIŞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: kavram → tanımlama → erişim ve gezinme</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce dizinin ne olduğunu ve neden gerektiğini görüyoruz; sonra tek boyutlu
        bir diziyi nasıl tanımladığımıza bakıyoruz; en son indeks ve döngüyle
        elemanlara erişiyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Dizi Nedir?", items: ["Tanım ve gerekçe", "Bellekte ardışık hücreler", "Eleman, indeks, uzunluk"], icon: Boxes, accent: "#3776ab" },
          { range: "02", title: "Tek Boyutlu Tanım", items: ["Python listesi []", "Farklı dillerde söz dizimi", "Sabit ve dinamik boyut"], icon: ListOrdered, accent: "#ffd43b" },
          { range: "03", title: "Erişim & Gezinme", items: ["İndeksle okuma/yazma", "for döngüsüyle dolaşma", "len() ve sınır taşması"], icon: Repeat, accent: "#86efac" },
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

  /* ─────────────────  4 · BÖLÜM 1 · DİZİ NEDİR  ───────────────── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Dizi Nedir?"
      subtitle="Aynı türden çok sayıda değeri, tek bir isim altında ardışık olarak tutan veri yapısı."
      glowClass="prog-glow-blue"
      icon={<Boxes className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  5 · DİZİ TANIMI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 1 · Dizi Nedir?</Eyebrow>
      <H2>Tek isim, çok değer</H2>
      <Sub className="mt-3 max-w-3xl">
        Dizi (array); aynı türden birden çok değeri{" "}
        <span className="text-white font-semibold">ardışık bellek hücrelerinde</span> saklayan,
        her hücresine bir sayısal <span className="text-white font-semibold">indeks</span> ile
        ulaşabildiğimiz veri yapısıdır. Bir apartmandaki numaralı daireler gibi düşün.
      </Sub>

      <div className="mt-8 max-w-4xl mx-auto">
        <ArrayDiagram
          name="notlar"
          cells={["75", "90", "60", "85", "100"]}
          activeIndex={2}
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={Hash}
          title="Eleman"
          desc="Dizinin içindeki her bir değer. Yukarıda 75, 90, 60... her biri bir elemandır."
          delay={0.4}
          accent="#3776ab"
        />
        <FeatureCard
          icon={Target}
          title="İndeks"
          desc="Bir elemanın sırasıdır ve çoğu dilde 0&apos;dan başlar. notlar[2] üçüncü elemandır: 60."
          delay={0.5}
          accent="#5fa8e0"
        />
        <FeatureCard
          icon={Ruler}
          title="Uzunluk"
          desc="Dizideki eleman sayısı. Burada 5; geçerli indeksler 0 ile 4 arasındadır."
          delay={0.6}
          accent="#ffd43b"
        />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  6 · NEDEN 0'DAN BAŞLAR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 1 · İndeksleme</Eyebrow>
      <H2>İndeks neden 0&apos;dan başlar?</H2>
      <Sub className="mt-3 max-w-3xl">
        İndeks aslında &ldquo;dizinin başından kaç eleman uzakta&rdquo; demektir.
        İlk eleman başlangıçtan <span className="text-white font-semibold">0</span> uzaklıkta
        olduğu için indeksi 0&apos;dır. Bu yüzden 5 elemanlı dizide son indeks{" "}
        <span className="text-white font-semibold">4</span>&apos;tür, 5 değil.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 prog-card rounded-xl p-5"
      >
        <div className="text-xs uppercase tracking-wider text-[#5fa8e0] mb-3 font-mono">
          harfler = [&apos;A&apos;, &apos;B&apos;, &apos;C&apos;, &apos;D&apos;]
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {[
            { i: "0", v: "A", note: "ilk eleman" },
            { i: "1", v: "B", note: "ikinci" },
            { i: "2", v: "C", note: "üçüncü" },
            { i: "3", v: "D", note: "son eleman" },
          ].map((c, k) => (
            <motion.div
              key={c.i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + k * 0.08 }}
              className="prog-card rounded-lg p-4 text-center"
            >
              <div className="prog-arr-cell w-14 h-14 rounded-lg mx-auto text-lg">
                {c.v}
              </div>
              <div className="prog-arr-index mt-2">indeks {c.i}</div>
              <div className="text-[11px] text-gray-500 mt-1">{c.note}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 prog-card-yellow rounded-xl p-5 flex items-center gap-4"
      >
        <Lightbulb className="w-7 h-7 text-[#ffd43b] flex-shrink-0" />
        <div className="text-sm text-gray-300">
          <span className="text-white font-semibold">Kural:</span> n elemanlı bir
          dizide geçerli indeksler 0&apos;dan n-1&apos;e kadardır. Python&apos;da ayrıca
          negatif indeks de vardır: <span className="font-mono text-[#5fa8e0]">harfler[-1]</span>{" "}
          son elemanı (&apos;D&apos;) verir.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  7 · BÖLÜM 2 · TANIMLAMA  ───────────────── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Tek Boyutlu Dizi Tanımlama"
      subtitle="Diziyi oluşturmanın söz dizimi: köşeli parantezler, eleman sayısı ve dilden dile değişen kurallar."
      glowClass="prog-glow-yellow"
      icon={<ListOrdered className="w-14 h-14 text-[#1a1a1a]" />}
    />
  ),

  /* ─────────────────  8 · PYTHON'DA TANIMLAMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 2 · Python listesi</Eyebrow>
      <H2 className="mb-2">Python&apos;da tek boyutlu dizi tanımlama</H2>
      <Sub className="max-w-3xl">
        Python&apos;da tek boyutlu diziyi <span className="text-white font-semibold">liste (list)</span> ile
        tutarız. Köşeli parantez içine elemanları virgülle yazarız. Boyut sabit
        değildir; sonradan eleman eklenip çıkarılabilir.
      </Sub>

      <div className="mt-6">
        <CodeEditor
          title="diziler.py — Visual Studio Code"
          tabs={["diziler.py", "README.md"]}
          activeTab="diziler.py"
          lines={[
            <>
              <span className="tok-comment"># 1) Doğrudan değerlerle tanımlama</span>
            </>,
            <>
              <span className="tok-var">notlar</span>
              <span className="tok-operator"> = </span>
              <span className="tok-punct">[</span>
              <span className="tok-number">75</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">90</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">60</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">85</span>
              <span className="tok-punct">]</span>
            </>,
            "",
            <>
              <span className="tok-comment"># 2) Boş dizi (sonradan doldurulacak)</span>
            </>,
            <>
              <span className="tok-var">isimler</span>
              <span className="tok-operator"> = </span>
              <span className="tok-punct">[]</span>
            </>,
            "",
            <>
              <span className="tok-comment"># 3) Sabit değerle, belirli boyutta</span>
            </>,
            <>
              <span className="tok-var">sifirlar</span>
              <span className="tok-operator"> = </span>
              <span className="tok-punct">[</span>
              <span className="tok-number">0</span>
              <span className="tok-punct">] * </span>
              <span className="tok-number">5</span>
              {"  "}
              <span className="tok-comment"># [0, 0, 0, 0, 0]</span>
            </>,
            "",
            <>
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-builtin">len</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">notlar</span>
              <span className="tok-punct">), </span>
              <span className="tok-var">notlar</span>
              <span className="tok-punct">[</span>
              <span className="tok-number">0</span>
              <span className="tok-punct">])</span>
            </>,
          ]}
          terminal={
            <div className="leading-relaxed">
              <div>
                <span className="prog-terminal-prompt">user@mcbu</span>
                <span className="text-gray-500"> $ </span>
                <span className="prog-terminal-out">python diziler.py</span>
              </div>
              <div className="prog-terminal-out">4 75</div>
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

  /* ─────────────────  9 · DİLLERDE SÖZ DİZİMİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 2 · Karşılaştırma</Eyebrow>
      <H2>Aynı dizi, farklı dillerde tanım</H2>
      <Sub className="mt-3 max-w-3xl">
        Mantık her dilde aynı: bir isim, bir tür ve elemanlar. Fark söz diziminde
        ve boyutun sabit olup olmamasında. Üç tam sayılık bir dizi:
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
              <th>Dil</th>
              <th>Tanımlama söz dizimi</th>
              <th>Boyut</th>
              <th>İlk elemana erişim</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold text-white">Python</td>
              <td><span className="font-mono text-[#9cdcfe]">sayilar = [10, 20, 30]</span></td>
              <td>Dinamik (büyür/küçülür)</td>
              <td><span className="font-mono text-[#5fa8e0]">sayilar[0]</span></td>
            </tr>
            <tr>
              <td className="font-semibold text-white">C</td>
              <td><span className="font-mono text-[#9cdcfe]">int sayilar[3] = {"{10, 20, 30}"};</span></td>
              <td>Sabit (tanımda belli)</td>
              <td><span className="font-mono text-[#5fa8e0]">sayilar[0]</span></td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Java</td>
              <td><span className="font-mono text-[#9cdcfe]">int[] sayilar = {"{10, 20, 30}"};</span></td>
              <td>Sabit (oluşunca belli)</td>
              <td><span className="font-mono text-[#5fa8e0]">sayilar[0]</span></td>
            </tr>
            <tr>
              <td className="font-semibold text-white">JavaScript</td>
              <td><span className="font-mono text-[#9cdcfe]">let sayilar = [10, 20, 30];</span></td>
              <td>Dinamik</td>
              <td><span className="font-mono text-[#5fa8e0]">sayilar[0]</span></td>
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
        Ortak nokta: tüm dillerde indeks 0&apos;dan başlar ve elemana köşeli parantezle erişilir.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  10 · SABİT vs DİNAMİK  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 2 · Boyut</Eyebrow>
      <H2>Sabit boyut vs dinamik boyut</H2>
      <Sub className="mt-3 max-w-3xl">
        Klasik diziler (C, Java) bir kez tanımlanınca boyutu sabittir. Python listesi
        gibi dinamik yapılarsa çalışma anında büyüyüp küçülebilir. İkisinin de yeri vardır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#ffd43b]/20 border border-[#ffd43b]/50 flex items-center justify-center">
              <Layers className="w-5 h-5 text-[#ffd43b]" />
            </div>
            <div>
              <div className="text-white font-semibold">Sabit boyut</div>
              <div className="text-[10px] font-mono text-[#ffd43b] uppercase">C · Java dizileri</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] mt-2">
            <div className="text-[#86efac]">+ Bellek önceden ayrılır</div>
            <div className="text-[#fca5a5]">– Sonradan büyüyemez</div>
            <div className="text-[#86efac]">+ Erişim çok hızlı</div>
            <div className="text-[#fca5a5]">– Boyutu baştan bilmek gerek</div>
          </div>
          <div className="mt-4 text-xs text-gray-500 font-mono">
            Örnek: aylık 12 sıcaklık ölçümü gibi sayısı belli veriler.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#3776ab]/20 border border-[#3776ab]/50 flex items-center justify-center">
              <ArrowRightLeft className="w-5 h-5 text-[#5fa8e0]" />
            </div>
            <div>
              <div className="text-white font-semibold">Dinamik boyut</div>
              <div className="text-[10px] font-mono text-[#5fa8e0] uppercase">Python listesi</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] mt-2">
            <div className="text-[#86efac]">+ append ile eleman ekle</div>
            <div className="text-[#fca5a5]">– Biraz daha fazla bellek</div>
            <div className="text-[#86efac]">+ Boyutu önceden bilmek şart değil</div>
            <div className="text-[#fca5a5]">– Erişim genelde biraz yavaş</div>
          </div>
          <div className="mt-4 text-xs text-gray-500 font-mono">
            Örnek: kullanıcıdan kaç tane geleceği belli olmayan girişler.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  11 · BÖLÜM 3 · ERİŞİM  ───────────────── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Erişim ve Gezinme"
      subtitle="İndeksle eleman okumak/yazmak, döngüyle tüm diziyi dolaşmak ve sınır taşması hatalarından kaçınmak."
      glowClass="prog-glow-purple"
      icon={<Repeat className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  12 · İNDEKSLE OKUMA/YAZMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 3 · Erişim</Eyebrow>
      <H2 className="mb-2">İndeksle okuma ve değiştirme</H2>
      <Sub className="max-w-3xl mb-6">
        Bir elemanı okumak ve değiştirmek aynı söz dizimini kullanır:{" "}
        <span className="font-mono text-[#5fa8e0]">dizi[indeks]</span>. Sağ tarafta
        olunca okur, sol tarafta olunca o hücreye yeni değer yazar.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <CodeEditor
          title="erisim.py"
          tabs={["erisim.py"]}
          activeTab="erisim.py"
          lines={[
            <>
              <span className="tok-var">renkler</span>
              <span className="tok-operator"> = </span>
              <span className="tok-punct">[</span>
              <span className="tok-string">&quot;kırmızı&quot;</span>
              <span className="tok-punct">, </span>
              <span className="tok-string">&quot;yeşil&quot;</span>
              <span className="tok-punct">, </span>
              <span className="tok-string">&quot;mavi&quot;</span>
              <span className="tok-punct">]</span>
            </>,
            "",
            <>
              <span className="tok-comment"># okuma</span>
            </>,
            <>
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">renkler</span>
              <span className="tok-punct">[</span>
              <span className="tok-number">0</span>
              <span className="tok-punct">])</span>
              {"   "}
              <span className="tok-comment"># kırmızı</span>
            </>,
            <>
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">renkler</span>
              <span className="tok-punct">[-</span>
              <span className="tok-number">1</span>
              <span className="tok-punct">])</span>
              {"  "}
              <span className="tok-comment"># mavi</span>
            </>,
            "",
            <>
              <span className="tok-comment"># yazma (değiştirme)</span>
            </>,
            <>
              <span className="tok-var">renkler</span>
              <span className="tok-punct">[</span>
              <span className="tok-number">1</span>
              <span className="tok-punct">]</span>
              <span className="tok-operator"> = </span>
              <span className="tok-string">&quot;sarı&quot;</span>
            </>,
            <>
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">renkler</span>
              <span className="tok-punct">)</span>
            </>,
          ]}
          terminal={
            <div className="leading-relaxed">
              <div className="prog-terminal-out">kırmızı</div>
              <div className="prog-terminal-out">mavi</div>
              <div className="prog-terminal-out">
                [&apos;kırmızı&apos;, &apos;sarı&apos;, &apos;mavi&apos;]
              </div>
            </div>
          }
        />

        <ArrayDiagram
          name="renkler"
          cells={["kırmızı", "sarı", "mavi"]}
          activeIndex={1}
          delay={0.3}
        />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  13 · DÖNGÜYLE GEZİNME  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 3 · Dizi + döngü</Eyebrow>
      <H2 className="mb-2">Tüm diziyi for döngüsüyle dolaşmak</H2>
      <Sub className="max-w-3xl mb-6">
        Dizinin asıl gücü döngüyle ortaya çıkar. İki yaygın yol var: doğrudan
        elemanlar üzerinde gezmek, ya da indeksler üzerinde gezmek. İkisiyle de
        notların toplamını ve ortalamasını alalım.
      </Sub>

      <CodeEditor
        title="dongu.py — Visual Studio Code"
        tabs={["dongu.py"]}
        activeTab="dongu.py"
        lines={[
          <>
            <span className="tok-var">notlar</span>
            <span className="tok-operator"> = </span>
            <span className="tok-punct">[</span>
            <span className="tok-number">75</span>
            <span className="tok-punct">, </span>
            <span className="tok-number">90</span>
            <span className="tok-punct">, </span>
            <span className="tok-number">60</span>
            <span className="tok-punct">, </span>
            <span className="tok-number">85</span>
            <span className="tok-punct">]</span>
          </>,
          <>
            <span className="tok-var">toplam</span>
            <span className="tok-operator"> = </span>
            <span className="tok-number">0</span>
          </>,
          "",
          <>
            <span className="tok-comment"># yol 1: elemanların üzerinde gez</span>
          </>,
          <>
            <span className="tok-keyword">for</span>
            <span className="tok-punct"> </span>
            <span className="tok-var">n</span>
            <span className="tok-keyword"> in </span>
            <span className="tok-var">notlar</span>
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
            <span className="tok-comment"># yol 2: indekslerin üzerinde gez</span>
          </>,
          <>
            <span className="tok-keyword">for</span>
            <span className="tok-punct"> </span>
            <span className="tok-var">i</span>
            <span className="tok-keyword"> in </span>
            <span className="tok-builtin">range</span>
            <span className="tok-punct">(</span>
            <span className="tok-builtin">len</span>
            <span className="tok-punct">(</span>
            <span className="tok-var">notlar</span>
            <span className="tok-punct">)):</span>
          </>,
          <>
            {"    "}
            <span className="tok-builtin">print</span>
            <span className="tok-punct">(</span>
            <span className="tok-var">i</span>
            <span className="tok-punct">, </span>
            <span className="tok-var">notlar</span>
            <span className="tok-punct">[</span>
            <span className="tok-var">i</span>
            <span className="tok-punct">])</span>
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
            {"   "}
            <span className="tok-comment"># 77.5</span>
          </>,
        ]}
        terminal={
          <div className="leading-relaxed">
            <div className="prog-terminal-out">0 75</div>
            <div className="prog-terminal-out">1 90</div>
            <div className="prog-terminal-out">2 60</div>
            <div className="prog-terminal-out">3 85</div>
            <div className="prog-terminal-out">
              toplam=310 · ortalama=<span className="prog-terminal-user">77.5</span>
            </div>
          </div>
        }
      />
    </SlideShell>
  ),

  /* ─────────────────  14 · SINIR TAŞMASI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 3 · Sık yapılan hata</Eyebrow>
      <H2>Sınır taşması: en sık görülen dizi hatası</H2>
      <Sub className="mt-3 max-w-3xl">
        n elemanlı dizide geçerli indeksler 0 ile n-1 arasındadır. Olmayan bir
        indekse erişmeye çalışmak hatadır. Bu &ldquo;bir fazla&rdquo; hatasına
        (off-by-one) çok dikkat etmek gerekir.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fca5a5]">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Yanlış</span>
          </div>
          <div className="prog-editor rounded-lg px-4 py-3 text-[12px]">
            <div>
              <span className="tok-var">dizi</span>
              <span className="tok-operator"> = </span>
              <span className="tok-punct">[</span>
              <span className="tok-number">10</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">20</span>
              <span className="tok-punct">, </span>
              <span className="tok-number">30</span>
              <span className="tok-punct">]</span>
            </div>
            <div className="tok-comment"># uzunluk 3, geçerli indeks 0..2</div>
            <div>
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">dizi</span>
              <span className="tok-punct">[</span>
              <span className="tok-number">3</span>
              <span className="tok-punct">])</span>
            </div>
          </div>
          <div className="mt-3 prog-terminal rounded-lg px-3 py-2 text-[11px]">
            <span className="text-[#fca5a5]">
              IndexError: list index out of range
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Doğru</span>
          </div>
          <div className="prog-editor rounded-lg px-4 py-3 text-[12px]">
            <div>
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">dizi</span>
              <span className="tok-punct">[</span>
              <span className="tok-builtin">len</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">dizi</span>
              <span className="tok-punct">) - </span>
              <span className="tok-number">1</span>
              <span className="tok-punct">])</span>
            </div>
            <div className="tok-comment"># son eleman: 30</div>
            <div>
              <span className="tok-builtin">print</span>
              <span className="tok-punct">(</span>
              <span className="tok-var">dizi</span>
              <span className="tok-punct">[-</span>
              <span className="tok-number">1</span>
              <span className="tok-punct">])</span>
              {"  "}
              <span className="tok-comment"># aynı sonuç: 30</span>
            </div>
          </div>
          <div className="text-[11px] text-gray-500 mt-3">
            Son elemana güvenle <span className="font-mono text-[#5fa8e0]">len(dizi) - 1</span> ya da
            Python&apos;da <span className="font-mono text-[#5fa8e0]">[-1]</span> ile eriş.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  15 · UYGULAMALI ALIŞTIRMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı alıştırma</Eyebrow>
      <H2>Kendi makinende beş adım</H2>
      <Sub className="mt-3 max-w-3xl">
        Diziler ancak elle yazınca oturur. Aşağıdaki beş görevi tek bir{" "}
        <span className="font-mono text-[#5fa8e0]">diziler_lab.py</span> dosyasında
        yapıp sonraki derse getir.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 prog-card rounded-xl p-6 max-w-3xl mx-auto"
      >
        <div className="text-xs uppercase tracking-wider text-[#5fa8e0] mb-4 font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Görev listesi · Hafta 09
        </div>
        <div className="space-y-3">
          {[
            { t: "5 elemanlı bir sayı dizisi tanımla", d: "sayilar = [4, 8, 15, 16, 23] gibi köşeli parantezle oluştur" },
            { t: "İlk ve son elemanı yazdır", d: "sayilar[0] ve sayilar[-1] (ya da sayilar[len(sayilar)-1])" },
            { t: "Diziyi for döngüsüyle gez", d: "her elemanı tek tek ekrana yazdır" },
            { t: "Toplamı ve ortalamayı hesapla", d: "döngüde toplam biriktir, sonra len() ile böl" },
            { t: "En büyük elemanı bul", d: "ilk elemanı &apos;en büyük&apos; varsay, döngüde karşılaştırarak güncelle" },
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

  /* ─────────────────  16 · SIRADAKİ HAFTA + KAPANIŞ  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8 prog-glow-blue"
        >
          <Sigma className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>9. hafta tamamlandı · sıradaki: 10. hafta</Eyebrow>
        <H1>
          <span className="prog-shimmer">Çok Boyutlu Diziler</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta tek satırlık dizileri gördük. 10. haftada satır ve sütunu olan{" "}
          <span className="text-white">çok boyutlu dizilere</span> (matris/tablo)
          geçiyoruz: iç içe döngüler ve tablo verisi.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          <FeatureCard
            icon={Layers}
            title="İki boyutlu dizi"
            desc="Satır ve sütundan oluşan tablo: dizi[satır][sütun] biçiminde erişim."
            accent="#3776ab"
            delay={0.1}
          />
          <FeatureCard
            icon={Repeat}
            title="İç içe döngü"
            desc="Bir döngü satırları, içteki döngü sütunları gezerek tüm tabloyu dolaşır."
            accent="#5fa8e0"
            delay={0.2}
          />
          <FeatureCard
            icon={Database}
            title="Pratik kullanım"
            desc="Sınav not tablosu, oyun tahtası, görüntü pikselleri gibi gerçek veriler."
            accent="#ffd43b"
            delay={0.3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="prog-card rounded-xl p-5">
            <Calendar className="w-5 h-5 text-[#5fa8e0] mb-3" />
            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-1">Ders saati</div>
            <div className="text-white font-semibold">Perşembe</div>
            <div className="text-sm text-gray-400">09:55 — 12:30</div>
          </div>
          <div className="prog-card rounded-xl p-5">
            <Brain className="w-5 h-5 text-[#86efac] mb-3" />
            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">Lab&apos;ı bitir</div>
            <div className="text-sm text-gray-400">diziler_lab.py</div>
          </div>
          <div className="prog-card rounded-xl p-5">
            <FileText className="w-5 h-5 text-[#5fa8e0] mb-3" />
            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-1">Sonraki hafta</div>
            <div className="text-white font-semibold">H10</div>
            <div className="text-sm text-gray-400">Çok boyutlu diziler</div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
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
          BVA 1101 · 9. Hafta · Tek Boyutlu Diziler
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
