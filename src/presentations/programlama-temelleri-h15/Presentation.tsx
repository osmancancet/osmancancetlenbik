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
  FolderOpen,
  Save,
  PlusCircle,
  BookOpen,
  Pencil,
  Trash2,
  Lock,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Database,
  ArrowRight,
  Table2,
  Braces,
  Layers,
  Terminal,
  ListChecks,
  Check,
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

/* ---- File tree / dizin gezgini mockup ------------------------ */

function FileTree() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="prog-window-chrome w-full max-w-sm"
    >
      <div className="prog-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] flex-1 text-center justify-center font-mono"
          style={{ background: "#0d0d0d", color: "#9cdcfe" }}
        >
          <FolderOpen className="w-3.5 h-3.5" />
          <span>PROJE GEZGİNİ</span>
        </div>
      </div>
      <div className="prog-filetree px-4 py-3">
        <div className="prog-filetree-folder">📁 ogrenci_proje/</div>
        <div className="pl-4 prog-filetree-folder">📁 veri/</div>
        <div className="pl-8 prog-filetree-file">📄 notlar.txt</div>
        <div className="pl-8 prog-filetree-file">📄 ogrenciler.csv</div>
        <div className="pl-8 prog-filetree-file">📄 ayarlar.json</div>
        <div className="pl-4 prog-filetree-file">📄 main.py</div>
        <div className="pl-4 prog-filetree-file">📄 README.md</div>
        <div className="mt-3 prog-filetree-dim text-[11px]">
          # main.py içinden veri/ klasörüne
        </div>
        <div className="prog-filetree-dim text-[11px]">
          # &quot;veri/notlar.txt&quot; ile erişilir
        </div>
      </div>
    </motion.div>
  );
}

/* ---- Mod kartı (r, w, a, x) ---------------------------------- */

function ModeCard({
  icon: Icon,
  mode,
  name,
  desc,
  note,
  accent,
  delay = 0,
}: {
  icon: LucideIcon;
  mode: string;
  name: string;
  desc: string;
  note: string;
  accent: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="prog-card rounded-xl p-5"
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: `${accent}1f`, border: `1px solid ${accent}55` }}
        >
          <Icon className="w-5 h-5" style={{ color: accent }} />
        </div>
        <div>
          <div className="font-mono text-lg font-bold" style={{ color: accent }}>
            &quot;{mode}&quot;
          </div>
          <div className="text-xs text-gray-400">{name}</div>
        </div>
      </div>
      <p className="text-sm text-gray-300 leading-relaxed">{desc}</p>
      <p className="text-[11px] text-gray-500 border-t border-white/5 pt-3 mt-3">
        {note}
      </p>
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
        <Eyebrow>BVA 1101 · 15. Hafta · Bahar Dönemi</Eyebrow>
        <H1>
          <span className="prog-shimmer">Dosyalama İşlemleri</span>
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Program kapanınca veriyi kaybetme — Python ile dosya açma, okuma, yazma
          ve güvenli kapatma.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 mt-14 max-w-3xl mx-auto"
        >
          {[
            { name: "open()", tag: "aç", color: "#3776ab", desc: "Dosyayı belleğe bağla" },
            { name: "read / write", tag: "g/ç", color: "#5fa8e0", desc: "Veriyi oku veya yaz" },
            { name: "with", tag: "kapat", color: "#ffd43b", desc: "Otomatik güvenli kapanış" },
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
      <Eyebrow>Köprü · 14. haftadan 15. haftaya</Eyebrow>
      <H2>Veri artık programla birlikte ölmesin</H2>
      <Sub className="mt-3 max-w-3xl">
        Şimdiye dek değişkenler, listeler ve fonksiyonlarla çalıştık; ama bütün bu
        veri yalnızca <span className="text-white font-semibold">bellekte (RAM)</span>{" "}
        tutuluyordu. Program kapanınca her şey siliniyor. Bu hafta veriyi{" "}
        <span className="text-white font-semibold">diske (kalıcı depolama)</span>{" "}
        yazmayı öğreniyoruz.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fca5a5]">
            <Database className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Bellek (geçici)
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#5fa8e0] flex-shrink-0" />Çok hızlı erişim.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#5fa8e0] flex-shrink-0" />Değişken, liste, sözlük burada durur.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#5fa8e0] flex-shrink-0" />Program bitince içerik kaybolur.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <Save className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Disk (kalıcı)
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Daha yavaş ama kalıcı.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Dosyalar burada saklanır (.txt, .csv, .json).</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Program kapansa da veri yerinde kalır.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3 · BU HAFTANIN HEDEFİ / AKIŞ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: aç → oku/yaz → güvenli kapat</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce bir dosyanın nasıl açıldığını ve modları öğreniyoruz; sonra okuma ve
        yazma yöntemlerini görüyoruz; en son <span className="text-white">with</span> bloğuyla
        kaynağı güvenli kapatmayı ve sık yapılan hataları işliyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Dosyayı Açmak", items: ["open() ve kapatma", "Mod harfleri: r w a x", "Metin / ikili (binary)"], icon: FolderOpen, accent: "#3776ab" },
          { range: "02", title: "Okuma & Yazma", items: ["read / readline / readlines", "write / writelines", "Satır satır gezinme"], icon: BookOpen, accent: "#5fa8e0" },
          { range: "03", title: "Güvenli Kapatma", items: ["with as bloğu", "Karşılaşılan hatalar", "CSV / JSON formatları"], icon: Lock, accent: "#ffd43b" },
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

  /* ─────────────────  4 · SECTION 1/3 · DOSYAYI AÇMAK  ───────────────── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Dosyayı Açmak"
      subtitle="Bir dosyayla çalışmadan önce onu açmak gerekir. open() dosyaya bir bağlantı (handle) kurar; nasıl kullanacağını mod belirler."
      glowClass="prog-glow-blue"
      icon={<FolderOpen className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  5 · open() ANATOMİSİ + DOSYA YOLU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 1 · open()</Eyebrow>
      <H2 className="mb-2">open() ne ister, ne döndürür?</H2>
      <Sub className="max-w-3xl mb-6">
        İki temel argüman: <span className="text-white font-semibold">dosya yolu</span> ve{" "}
        <span className="text-white font-semibold">mod</span>. Geriye bir dosya nesnesi döner;
        işin bitince <span className="font-mono text-[#5fa8e0]">close()</span> ile kapatılır.
        Yol; dosyanın bilgisayardaki adresidir.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <CodeEditor
          title="ornek.py — open() anatomisi"
          tabs={["ornek.py"]}
          activeTab="ornek.py"
          lines={[
            <>
              <span className="tok-comment"># dosya = open(yol, mod, encoding)</span>
            </>,
            <>
              <span className="tok-var">dosya</span>
              <span className="tok-operator"> = </span>
              <span className="tok-builtin">open</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;veri/notlar.txt&quot;</span>
              <span className="tok-punct">,</span>
              <span className="tok-string"> &quot;r&quot;</span>
              <span className="tok-punct">,</span>
              <span className="tok-var"> encoding</span>
              <span className="tok-operator">=</span>
              <span className="tok-string">&quot;utf-8&quot;</span>
              <span className="tok-punct">)</span>
            </>,
            "",
            <>
              <span className="tok-var">icerik</span>
              <span className="tok-operator"> = </span>
              <span className="tok-var">dosya</span>
              <span className="tok-punct">.</span>
              <span className="tok-fname">read</span>
              <span className="tok-punct">()</span>
            </>,
            <>
              <span className="tok-var">dosya</span>
              <span className="tok-punct">.</span>
              <span className="tok-fname">close</span>
              <span className="tok-punct">()</span>
              <span className="tok-comment">  # mutlaka kapat!</span>
            </>,
          ]}
        />

        <div className="space-y-3">
          <FeatureCard
            icon={FolderOpen}
            title="Dosya yolu"
            desc="Türkçe karakter ve boşluk varsa dikkat; encoding=&apos;utf-8&apos; vermek metin dosyalarında güvenlidir."
            delay={0.3}
            accent="#3776ab"
          />
          <FeatureCard
            icon={Layers}
            title="Göreli vs mutlak yol"
            desc="&apos;veri/notlar.txt&apos; göreli (programın bulunduğu klasöre göre); &apos;/home/ders/...&apos; mutlak yoldur."
            delay={0.4}
            accent="#5fa8e0"
          />
        </div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  6 · DOSYA AĞACI / GÖRELİ YOL  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Dosya yolu · proje düzeni</Eyebrow>
      <H2 className="mb-2">Program dosyayı nerede arar?</H2>
      <Sub className="max-w-3xl mb-6">
        Göreli yol, kodun çalıştığı klasörden başlar. Aşağıdaki düzende{" "}
        <span className="font-mono text-[#5fa8e0]">main.py</span>, alt klasördeki dosyaya{" "}
        <span className="font-mono text-[#5fa8e0]">&quot;veri/notlar.txt&quot;</span> ile ulaşır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <FileTree />

        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="prog-card rounded-xl p-5"
          >
            <div className="text-xs uppercase tracking-wider text-[#5fa8e0] mb-3 font-mono">
              Yol kuralları
            </div>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#5fa8e0] flex-shrink-0" /><span><span className="font-mono text-[#ce9178]">&quot;notlar.txt&quot;</span> → aynı klasör</span></li>
              <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#5fa8e0] flex-shrink-0" /><span><span className="font-mono text-[#ce9178]">&quot;veri/notlar.txt&quot;</span> → alt klasör</span></li>
              <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#5fa8e0] flex-shrink-0" /><span><span className="font-mono text-[#ce9178]">&quot;../notlar.txt&quot;</span> → bir üst klasör</span></li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="prog-card-yellow rounded-xl p-5 flex items-start gap-3"
          >
            <Lightbulb className="w-6 h-6 text-[#ffd43b] flex-shrink-0" />
            <div className="text-sm text-gray-300">
              <span className="text-white font-semibold">Windows ipucu:</span> ters bölü
              işareti <span className="font-mono">\</span> kaçış karakteridir. Bu yüzden ya
              çift yaz (<span className="font-mono">\\</span>) ya da ham dizi kullan:{" "}
              <span className="font-mono text-[#5fa8e0]">r&quot;C:\veri\not.txt&quot;</span>.
            </div>
          </motion.div>
        </div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  7 · MODLAR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 1 · Açma modları</Eyebrow>
      <H2>Dört temel mod — ve büyük tehlike</H2>
      <Sub className="mt-3 max-w-3xl">
        Mod harfi, dosyayla ne yapacağını belirler. Bunları karıştırmak{" "}
        <span className="text-white font-semibold">veri kaybına</span> yol açar.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <ModeCard
          icon={BookOpen}
          mode="r"
          name="read (oku)"
          desc="Varsayılan mod. Dosyayı yalnızca okur. Dosya yoksa hata (FileNotFoundError) verir."
          note="Yazma yapılamaz; imleç en başta başlar."
          accent="#3776ab"
          delay={0.0}
        />
        <ModeCard
          icon={Pencil}
          mode="w"
          name="write (yaz)"
          desc="Dosya yoksa oluşturur. VARSA içeriğini tamamen siler ve sıfırdan yazar."
          note="Dikkat: mevcut veriyi geri dönüşsüz siler."
          accent="#fca5a5"
          delay={0.1}
        />
        <ModeCard
          icon={PlusCircle}
          mode="a"
          name="append (ekle)"
          desc="Dosyanın SONUNA ekler; var olan içeriğe dokunmaz. Dosya yoksa oluşturur."
          note="Log / kayıt tutmak için ideal seçim."
          accent="#86efac"
          delay={0.2}
        />
        <ModeCard
          icon={Lock}
          mode="x"
          name="exclusive (özel oluştur)"
          desc="Yeni dosya oluşturur. Aynı isimde dosya VARSA hata verir — üzerine yazmayı önler."
          note="Yanlışlıkla üzerine yazmaya karşı koruma."
          accent="#ffd43b"
          delay={0.3}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-5 text-[11px] text-gray-500 font-mono"
      >
        Ek harfler: <span className="text-[#5fa8e0]">&quot;b&quot;</span> ikili (resim/ses),{" "}
        <span className="text-[#5fa8e0]">&quot;t&quot;</span> metin (varsayılan),{" "}
        <span className="text-[#5fa8e0]">&quot;+&quot;</span> hem oku hem yaz. Örn: <span className="text-[#5fa8e0]">&quot;rb&quot;</span>, <span className="text-[#5fa8e0]">&quot;a+&quot;</span>.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  8 · SECTION 2/3 · OKUMA & YAZMA  ───────────────── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Okuma & Yazma"
      subtitle="Dosya açıldıktan sonra içeriğini almak (okuma) ya da içine veri koymak (yazma) için Python birkaç farklı yöntem sunar — her birinin yeri ayrıdır."
      glowClass="prog-glow-yellow"
      icon={<BookOpen className="w-14 h-14 text-[#1a1a1a]" />}
    />
  ),

  /* ─────────────────  9 · OKUMA YÖNTEMLERİ TABLOSU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 2 · Okuma yöntemleri</Eyebrow>
      <H2>read · readline · readlines</H2>
      <Sub className="mt-3 max-w-3xl">
        Üç yöntem de aynı dosyayı okur ama farklı tipte sonuç döner. Hangisini
        seçeceğin, veriyi nasıl işleyeceğine bağlıdır.
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
              <th>Yöntem</th>
              <th>Ne döndürür?</th>
              <th>Ne zaman kullanılır?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold text-white font-mono">read()</td>
              <td>Tüm dosyayı tek bir metin (string) olarak.</td>
              <td>Dosya küçükse ve içeriği bir bütün olarak işliyorsan.</td>
            </tr>
            <tr>
              <td className="font-semibold text-white font-mono">read(n)</td>
              <td>İlk n karakteri metin olarak.</td>
              <td>Büyük dosyayı parça parça okurken.</td>
            </tr>
            <tr>
              <td className="font-semibold text-white font-mono">readline()</td>
              <td>Sıradaki tek satırı (sonunda \n ile).</td>
              <td>Satır satır, kontrollü ilerlemek gerektiğinde.</td>
            </tr>
            <tr>
              <td className="font-semibold text-white font-mono">readlines()</td>
              <td>Tüm satırları bir liste olarak.</td>
              <td>Satırları indeksle gezmek / saymak istediğinde.</td>
            </tr>
            <tr>
              <td className="font-semibold text-white font-mono">for satir in dosya</td>
              <td>Her döngüde bir satır (bellek dostu).</td>
              <td>Büyük dosyalarda önerilen, en verimli yöntem.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  10 · OKUMA — CANLI KOD + TERMİNAL  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Canlı kod · satır satır okuma</Eyebrow>
      <H2 className="mb-2">Bir dosyayı satır satır gez</H2>
      <Sub className="max-w-3xl mb-6">
        En çok kullanılan kalıp: <span className="font-mono text-[#5fa8e0]">with open(...)</span>{" "}
        ile aç, <span className="font-mono text-[#5fa8e0]">for</span> döngüsüyle her satırı oku.
        <span className="font-mono"> strip()</span> satır sonundaki görünmez{" "}
        <span className="font-mono">\n</span> karakterini temizler.
      </Sub>

      <CodeEditor
        title="oku.py — Visual Studio Code"
        tabs={["oku.py", "notlar.txt"]}
        activeTab="oku.py"
        lines={[
          <>
            <span className="tok-keyword">with</span>{" "}
            <span className="tok-builtin">open</span>
            <span className="tok-punct">(</span>
            <span className="tok-string">&quot;veri/notlar.txt&quot;</span>
            <span className="tok-punct">,</span>
            <span className="tok-string"> &quot;r&quot;</span>
            <span className="tok-punct">,</span>
            <span className="tok-var"> encoding</span>
            <span className="tok-operator">=</span>
            <span className="tok-string">&quot;utf-8&quot;</span>
            <span className="tok-punct">)</span>{" "}
            <span className="tok-keyword">as</span>{" "}
            <span className="tok-var">dosya</span>
            <span className="tok-punct">:</span>
          </>,
          <>
            {"    "}
            <span className="tok-var">satir_no</span>
            <span className="tok-operator"> = </span>
            <span className="tok-number">1</span>
          </>,
          <>
            {"    "}
            <span className="tok-keyword">for</span>{" "}
            <span className="tok-var">satir</span>{" "}
            <span className="tok-keyword">in</span>{" "}
            <span className="tok-var">dosya</span>
            <span className="tok-punct">:</span>
          </>,
          <>
            {"        "}
            <span className="tok-var">temiz</span>
            <span className="tok-operator"> = </span>
            <span className="tok-var">satir</span>
            <span className="tok-punct">.</span>
            <span className="tok-fname">strip</span>
            <span className="tok-punct">()</span>
            <span className="tok-comment">  # \n ve boşlukları at</span>
          </>,
          <>
            {"        "}
            <span className="tok-builtin">print</span>
            <span className="tok-punct">(</span>
            <span className="tok-fstring">f</span>
            <span className="tok-string">&quot;</span>
            <span className="tok-punct">{"{"}</span>
            <span className="tok-var">satir_no</span>
            <span className="tok-punct">{"}"}</span>
            <span className="tok-string">: </span>
            <span className="tok-punct">{"{"}</span>
            <span className="tok-var">temiz</span>
            <span className="tok-punct">{"}"}</span>
            <span className="tok-string">&quot;</span>
            <span className="tok-punct">)</span>
          </>,
          <>
            {"        "}
            <span className="tok-var">satir_no</span>
            <span className="tok-operator"> += </span>
            <span className="tok-number">1</span>
          </>,
        ]}
        terminal={
          <div className="leading-relaxed">
            <div>
              <span className="prog-terminal-prompt">user@mcbu</span>
              <span className="text-gray-500"> $ </span>
              <span className="prog-terminal-out">python oku.py</span>
            </div>
            <div className="prog-terminal-out">1: Ali Yılmaz 85</div>
            <div className="prog-terminal-out">2: Ayşe Demir 92</div>
            <div className="prog-terminal-out">3: Mehmet Kaya 74</div>
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

  /* ─────────────────  11 · YAZMA — w vs a  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 2 · Yazma</Eyebrow>
      <H2 className="mb-2">write() · &quot;w&quot; siler, &quot;a&quot; ekler</H2>
      <Sub className="max-w-3xl mb-6">
        Aynı kod, tek harf farkla bambaşka sonuç verir.{" "}
        <span className="font-mono text-[#fca5a5]">&quot;w&quot;</span> dosyayı sıfırlar;{" "}
        <span className="font-mono text-[#86efac]">&quot;a&quot;</span> sonuna ekler.{" "}
        <span className="font-mono">write()</span> otomatik satır atlamaz —{" "}
        <span className="font-mono">\n</span>&apos;i sen koyarsın.
      </Sub>

      <CodeEditor
        title="yaz.py — Visual Studio Code"
        tabs={["yaz.py"]}
        activeTab="yaz.py"
        lines={[
          <>
            <span className="tok-comment"># &quot;w&quot;: dosyayı sıfırlar, baştan yazar</span>
          </>,
          <>
            <span className="tok-keyword">with</span>{" "}
            <span className="tok-builtin">open</span>
            <span className="tok-punct">(</span>
            <span className="tok-string">&quot;rapor.txt&quot;</span>
            <span className="tok-punct">,</span>
            <span className="tok-string"> &quot;w&quot;</span>
            <span className="tok-punct">,</span>
            <span className="tok-var"> encoding</span>
            <span className="tok-operator">=</span>
            <span className="tok-string">&quot;utf-8&quot;</span>
            <span className="tok-punct">)</span>{" "}
            <span className="tok-keyword">as</span>{" "}
            <span className="tok-var">f</span>
            <span className="tok-punct">:</span>
          </>,
          <>
            {"    "}
            <span className="tok-var">f</span>
            <span className="tok-punct">.</span>
            <span className="tok-fname">write</span>
            <span className="tok-punct">(</span>
            <span className="tok-string">&quot;Başlık: Haftalık Rapor</span>
            <span className="tok-fstring">\n</span>
            <span className="tok-string">&quot;</span>
            <span className="tok-punct">)</span>
          </>,
          "",
          <>
            <span className="tok-comment"># &quot;a&quot;: var olanı koru, sonuna ekle</span>
          </>,
          <>
            <span className="tok-keyword">with</span>{" "}
            <span className="tok-builtin">open</span>
            <span className="tok-punct">(</span>
            <span className="tok-string">&quot;rapor.txt&quot;</span>
            <span className="tok-punct">,</span>
            <span className="tok-string"> &quot;a&quot;</span>
            <span className="tok-punct">,</span>
            <span className="tok-var"> encoding</span>
            <span className="tok-operator">=</span>
            <span className="tok-string">&quot;utf-8&quot;</span>
            <span className="tok-punct">)</span>{" "}
            <span className="tok-keyword">as</span>{" "}
            <span className="tok-var">f</span>
            <span className="tok-punct">:</span>
          </>,
          <>
            {"    "}
            <span className="tok-var">f</span>
            <span className="tok-punct">.</span>
            <span className="tok-fname">write</span>
            <span className="tok-punct">(</span>
            <span className="tok-string">&quot;Satış: 1240 adet</span>
            <span className="tok-fstring">\n</span>
            <span className="tok-string">&quot;</span>
            <span className="tok-punct">)</span>
          </>,
          <>
            {"    "}
            <span className="tok-var">f</span>
            <span className="tok-punct">.</span>
            <span className="tok-fname">writelines</span>
            <span className="tok-punct">(</span>
            <span className="tok-punct">[</span>
            <span className="tok-string">&quot;Şehir: Manisa</span>
            <span className="tok-fstring">\n</span>
            <span className="tok-string">&quot;</span>
            <span className="tok-punct">,</span>
            <span className="tok-string"> &quot;Yıl: 2026</span>
            <span className="tok-fstring">\n</span>
            <span className="tok-string">&quot;</span>
            <span className="tok-punct">])</span>
          </>,
        ]}
      />
    </SlideShell>
  ),

  /* ─────────────────  12 · SECTION 3/3 · GÜVENLİ KAPATMA  ───────────────── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Güvenli Kapatma & Formatlar"
      subtitle="Açılan her dosya kapatılmalı. with bloğu bunu otomatik yapar. Ardından gerçek dünyada en çok kullanılan iki format: CSV ve JSON."
      glowClass="prog-glow-purple"
      icon={<Lock className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  13 · with — close() KARŞILAŞTIRMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 3 · with bloğu</Eyebrow>
      <H2>Neden hep with kullanmalısın?</H2>
      <Sub className="mt-3 max-w-3xl">
        Elle <span className="font-mono">close()</span> yazarsan, arada bir hata oluşunca dosya
        açık kalabilir — bu, veri kaybına ve kilitli dosyalara yol açar.{" "}
        <span className="font-mono text-[#5fa8e0]">with</span> bloğu, hata olsa bile dosyayı
        otomatik kapatır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4 text-[#fca5a5]">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Riskli · elle kapatma</span>
          </div>
          <div className="prog-editor rounded-lg px-4 py-3 text-[12px]">
            <div className="whitespace-pre">
              <span className="tok-var">f</span>
              <span className="tok-operator"> = </span>
              <span className="tok-builtin">open</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;d.txt&quot;</span>
              <span className="tok-punct">)</span>
            </div>
            <div className="whitespace-pre">
              <span className="tok-var">veri</span>
              <span className="tok-operator"> = </span>
              <span className="tok-var">f</span>
              <span className="tok-punct">.</span>
              <span className="tok-fname">read</span>
              <span className="tok-punct">()</span>
              <span className="tok-comment">  # burada hata olursa?</span>
            </div>
            <div className="whitespace-pre">
              <span className="tok-var">f</span>
              <span className="tok-punct">.</span>
              <span className="tok-fname">close</span>
              <span className="tok-punct">()</span>
              <span className="tok-comment">  # bu satıra hiç gelinmez</span>
            </div>
          </div>
          <p className="text-[11px] text-gray-500 mt-3">
            Hata, close() öncesi oluşursa dosya açık kalır.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4 text-[#86efac]">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Doğru · with bloğu</span>
          </div>
          <div className="prog-editor rounded-lg px-4 py-3 text-[12px]">
            <div className="whitespace-pre">
              <span className="tok-keyword">with</span>{" "}
              <span className="tok-builtin">open</span>
              <span className="tok-punct">(</span>
              <span className="tok-string">&quot;d.txt&quot;</span>
              <span className="tok-punct">)</span>{" "}
              <span className="tok-keyword">as</span>{" "}
              <span className="tok-var">f</span>
              <span className="tok-punct">:</span>
            </div>
            <div className="whitespace-pre">
              {"    "}
              <span className="tok-var">veri</span>
              <span className="tok-operator"> = </span>
              <span className="tok-var">f</span>
              <span className="tok-punct">.</span>
              <span className="tok-fname">read</span>
              <span className="tok-punct">()</span>
            </div>
            <div className="whitespace-pre">
              <span className="tok-comment"># blok bitince f otomatik kapanır</span>
            </div>
            <div className="whitespace-pre">
              <span className="tok-comment"># hata olsa bile kapanır</span>
            </div>
          </div>
          <p className="text-[11px] text-gray-500 mt-3">
            close() yazmaya gerek yok; Python halleder.
          </p>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  14 · SIK YAPILAN HATALAR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Dosya işlerinde · sık hatalar</Eyebrow>
      <H2>En çok karşılaşacağın üç hata</H2>
      <Sub className="mt-3 max-w-3xl">
        Bu üç durumu tanımak, hata mesajını okuyup hızlıca çözmeni sağlar.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={AlertTriangle}
          title="FileNotFoundError"
          desc="&quot;r&quot; modunda var olmayan dosyayı açmaya çalıştın. Yolu ve klasörü kontrol et; gerekirse önce oluştur."
          accent="#fca5a5"
          delay={0.1}
        />
        <FeatureCard
          icon={Trash2}
          title="İçeriğin silinmesi"
          desc="Eklemek isterken &quot;w&quot; kullandın; dosya sıfırlandı. Var olan veriyi korumak için her zaman &quot;a&quot; seç."
          accent="#ffd43b"
          delay={0.2}
        />
        <FeatureCard
          icon={Braces}
          title="UnicodeDecodeError"
          desc="Türkçe karakterli dosyada encoding belirtmedin. open() çağrısına encoding=&quot;utf-8&quot; ekle."
          accent="#5fa8e0"
          delay={0.3}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 prog-card rounded-lg px-4 py-3 text-sm text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <Lightbulb className="w-5 h-5 text-[#ffd43b] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Güvenli kalıp:</span> dosya işlemini bir{" "}
          <span className="font-mono text-[#5fa8e0]">try / except FileNotFoundError</span>{" "}
          bloğuna alıp kullanıcıya anlaşılır bir uyarı göster — programın çökmesini önle. (Hata yönetimini geçen hafta işledik.)
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  15 · CSV ve JSON  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Gerçek dünya formatları</Eyebrow>
      <H2>Düz metin yetmediğinde: CSV &amp; JSON</H2>
      <Sub className="mt-3 max-w-3xl">
        Verinin yapısı varsa düz metin yerine standart format kullanılır. Python&apos;ın
        hazır <span className="font-mono text-[#5fa8e0]">csv</span> ve{" "}
        <span className="font-mono text-[#5fa8e0]">json</span> modülleri bu dosyaları
        kolayca okur ve yazar.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <Table2 className="w-5 h-5" />
            <span className="text-sm font-semibold text-white">CSV — tablo verisi</span>
          </div>
          <div className="prog-editor rounded-lg px-4 py-3 text-[12px] mb-3">
            <div className="whitespace-pre"><span className="tok-comment">ogrenciler.csv</span></div>
            <div className="whitespace-pre tok-var">ad,soyad,not</div>
            <div className="whitespace-pre tok-string">Ali,Yılmaz,85</div>
            <div className="whitespace-pre tok-string">Ayşe,Demir,92</div>
          </div>
          <p className="text-sm text-gray-400">
            Virgülle ayrılmış değerler. Excel ve Google Sheets ile uyumlu — tablo
            şeklindeki kayıtlar için idealdir.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#5fa8e0]">
            <Braces className="w-5 h-5" />
            <span className="text-sm font-semibold text-white">JSON — iç içe veri</span>
          </div>
          <div className="prog-editor rounded-lg px-4 py-3 text-[12px] mb-3">
            <div className="whitespace-pre"><span className="tok-comment">ayarlar.json</span></div>
            <div className="whitespace-pre"><span className="tok-punct">{"{"}</span></div>
            <div className="whitespace-pre">{"  "}<span className="tok-string">&quot;ad&quot;</span><span className="tok-punct">: </span><span className="tok-string">&quot;Ali&quot;</span><span className="tok-punct">,</span></div>
            <div className="whitespace-pre">{"  "}<span className="tok-string">&quot;not&quot;</span><span className="tok-punct">: </span><span className="tok-number">85</span></div>
            <div className="whitespace-pre"><span className="tok-punct">{"}"}</span></div>
          </div>
          <p className="text-sm text-gray-400">
            Anahtar-değer yapısı; Python sözlüğüne birebir benzer. Ayar dosyaları ve
            web (API) verisi için standarttır.
          </p>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  16 · UYGULAMALI LAB  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı alıştırma</Eyebrow>
      <H2>Mini not defteri programı yaz</H2>
      <Sub className="mt-3 max-w-3xl">
        Tek başına çalışınca pekişir. Aşağıdaki dört adımı tamamla; sonraki derse
        kodunu ve ekran görüntüsünü getir.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: PlusCircle, title: "Kayıt ekle", desc: "Kullanıcıdan bir not al, &quot;a&quot; modunda notlar.txt dosyasına satır olarak ekle.", accent: "#86efac" },
          { icon: BookOpen, title: "Tüm notları listele", desc: "Dosyayı with + for ile satır satır oku; başına satır numarası koyup ekrana yaz.", accent: "#5fa8e0" },
          { icon: Terminal, title: "Notları say", desc: "readlines() ile satır listesini al, len() ile toplam not sayısını yazdır.", accent: "#3776ab" },
          { icon: ListChecks, title: "Hataya dayanıklı yap", desc: "Dosya yoksa try/except FileNotFoundError ile &quot;Henüz not yok&quot; mesajı göster.", accent: "#ffd43b" },
        ].map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="prog-card prog-card-hover rounded-xl p-5 flex items-start gap-4"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${t.accent}18`, border: `1px solid ${t.accent}55` }}
            >
              <t.icon className="w-5 h-5" style={{ color: t.accent }} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-[10px] text-gray-500 font-mono">{i + 1}</span>
                <h3 className="text-base font-semibold text-white">{t.title}</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{t.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 prog-card-yellow rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <Check className="w-4 h-4 text-[#ffd43b] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">İpucu:</span> ekleme ve okuma için ayrı{" "}
          <span className="font-mono text-[#5fa8e0]">with</span> blokları kullan; aynı dosyayı
          &quot;a&quot; ile yazıp, sonra &quot;r&quot; ile oku. encoding=&quot;utf-8&quot; eklemeyi unutma.
        </span>
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
          <FileText className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>15. hafta tamamlandı · sıradaki: Genel tekrar &amp; proje</Eyebrow>
        <H1>
          <span className="prog-shimmer">Veriyi artık saklayabiliyorsun</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta dosya açmayı, okumayı, yazmayı ve güvenli kapatmayı öğrendik.
          Önümüzdeki hafta tüm dönemin parçalarını — değişken, döngü, fonksiyon ve
          dosya — tek bir küçük projede birleştiriyoruz.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="prog-card rounded-xl p-5">
            <CheckCircle2 className="w-5 h-5 text-[#86efac] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Öğrendik</div>
            <div className="text-white font-semibold">open / read / write</div>
            <div className="text-sm text-gray-400">modlar ve with bloğu</div>
          </div>
          <div className="prog-card rounded-xl p-5">
            <ArrowRight className="w-5 h-5 text-[#5fa8e0] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Sonraki hafta</div>
            <div className="text-white font-semibold">Genel tekrar</div>
            <div className="text-sm text-gray-400">uçtan uca mini proje</div>
          </div>
          <div className="prog-card rounded-xl p-5">
            <ListChecks className="w-5 h-5 text-[#ffd43b] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">Not defteri</div>
            <div className="text-sm text-gray-400">4 adım + ekran görüntüsü</div>
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
          BVA 1101 · 15. Hafta · Dosyalama İşlemleri
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
