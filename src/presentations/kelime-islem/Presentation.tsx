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
  FileType2,
  Type,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Heading1,
  Table as TableIcon,
  Image as ImageIcon,
  SpellCheck,
  MessageSquare,
  GitBranch,
  Send,
  Users,
  Cloud,
  Download,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Quote,
  Check,
  X,
  Sparkles,
  Lightbulb,
  Target,
  Brain,
  Globe,
  History,
  Award,
  GraduationCap,
  Briefcase,
  DollarSign,
  Layers,
  Palette,
  Edit3,
  Ruler,
  BookOpen,
  BookMarked,
  Scissors,
  Copy,
  ClipboardPaste,
  Highlighter,
  AlertTriangle,
  Zap,
  FileCheck2,
  FileArchive,
  Shapes,
  Columns3,
  Rows3,
  Bookmark,
  XCircle,
  CheckCircle2,
  Code2,
  Braces,
  Asterisk,
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
        <div className="absolute inset-0 word-grid-bg pointer-events-none" />
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
      className="inline-flex items-center gap-3 mb-6 text-xs font-mono uppercase tracking-[0.25em] text-[#00ff41]"
    >
      <span className="w-8 h-px bg-[#00ff41]" />
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
  accent = "#00ff41",
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
      className="word-card word-card-hover rounded-xl p-6 transition-all"
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
        style={{
          background: `${accent}15`,
          border: `1px solid ${accent}40`,
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
  accent = "#00ff41",
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
      className="word-card rounded-xl p-5"
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

function WordMockup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="word-window-chrome w-full"
    >
      <div className="word-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-semibold flex-1 max-w-md mx-auto text-center justify-center"
          style={{ background: "#0d0d0d", color: "#a8c5ec" }}
        >
          <span className="w-5 h-5 rounded-sm word-w-tile flex items-center justify-center text-[11px]">W</span>
          <span>{title}</span>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </motion.div>
  );
}

function QuoteSlide({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <SlideShell>
      <div className="text-center max-w-4xl mx-auto">
        <Quote className="w-16 h-16 text-[#00ff41]/40 mx-auto mb-8" />
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
          <div className="text-lg font-semibold text-[#00ff41]">{author}</div>
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
  bgGradient,
  shadow,
  icon,
}: {
  num: string;
  total: string;
  title: string;
  subtitle: string;
  bgGradient: string;
  shadow: string;
  icon: ReactNode;
}) {
  return (
    <SlideShell bgPattern={false}>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex w-32 h-32 rounded-3xl items-center justify-center mb-8 word-pulse"
          style={{
            background: bgGradient,
            boxShadow: shadow,
          }}
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
  /* ─────────────────  AÇILIŞ  ───────────────── */

  // 1 — Cover
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>10. Hafta · BVA 1108 — Bilgi Teknolojileri</Eyebrow>
        <H1 className="word-shimmer-blue">
          Kelime İşlem
          <br />
          Programı
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Staj raporundan CV&apos;ye, dilekçeden ödev raporuna — günlük belge
          araçların
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 flex items-center justify-center gap-6 flex-wrap"
        >
          <div className="word-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-md flex items-center justify-center text-lg word-w-tile">
              W
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Microsoft Word</div>
              <div className="text-[10px] text-gray-500">1.4 milyar kullanıcı</div>
            </div>
          </div>
          <div className="word-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center font-bold"
              style={{ background: "rgba(66,133,244,0.15)", color: "#4285f4" }}
            >
              G
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Google Docs</div>
              <div className="text-[10px] text-gray-500">Cloud tabanlı</div>
            </div>
          </div>
          <div className="word-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(24,163,3,0.15)" }}
            >
              <FileType2 className="w-5 h-5" style={{ color: "#18a303" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">LibreOffice</div>
              <div className="text-[10px] text-gray-500">Açık kaynak</div>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 2 — Kelime işlem nedir?
  () => (
    <SlideShell>
      <Eyebrow>Tanım</Eyebrow>
      <H2 className="mb-10">Kelime işlem programı nedir?</H2>
      <div className="grid md:grid-cols-[1.1fr_1fr] gap-10 items-center">
        <div>
          <Sub className="!text-lg">
            Bilgisayarda yazılı metni üretmek, düzenlemek, biçimlendirmek,
            kaydetmek ve yazdırmak için kullanılan yazılımlara{" "}
            <span className="text-[#4a89dc] font-semibold">kelime işlem programı</span>{" "}
            (word processor) denir.
          </Sub>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 space-y-3"
          >
            {[
              { icon: Edit3, t: "WYSIWYG", d: "Ekranda ne görüyorsan çıktıda o — What You See Is What You Get" },
              { icon: SpellCheck, t: "Otomatik Denetim", d: "Yazım, dil bilgisi ve biçim önerileri gerçek zamanlı" },
              { icon: Palette, t: "Biçimlendirme", d: "Font, renk, hizalama, tablo, görsel — sınırsız kontrol" },
              { icon: Cloud, t: "Senkronizasyon", d: "Bulut kayıt, sürüm geçmişi, gerçek zamanlı işbirliği" },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.t}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <Icon className="w-5 h-5 text-[#4a89dc] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-white">{f.t}</div>
                    <div className="text-xs text-gray-400">{f.d}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="word-paper p-6 aspect-[3/4] flex flex-col gap-2"
        >
          <div className="word-paper-ruler">
            <span>│</span><span className="ml-[60px]">2</span><span className="ml-[60px]">4</span><span className="ml-[60px]">6</span>
          </div>
          <div className="pt-3">
            <div className="h-5 bg-[#2b579a] w-2/3 rounded-sm mb-3" />
            <div className="space-y-1.5">
              <div className="h-2 bg-gray-300 rounded-sm" />
              <div className="h-2 bg-gray-300 rounded-sm w-[95%]" />
              <div className="h-2 bg-gray-300 rounded-sm w-[87%]" />
              <div className="h-2 bg-gray-300 rounded-sm w-[92%]" />
            </div>
            <div className="h-3 bg-[#2b579a]/80 w-1/2 rounded-sm mt-5 mb-2" />
            <div className="space-y-1.5">
              <div className="h-2 bg-gray-300 rounded-sm w-[90%]" />
              <div className="h-2 bg-gray-300 rounded-sm w-[85%]" />
              <div className="h-2 bg-gray-300 rounded-sm w-[70%]" />
            </div>
            <div className="h-3 bg-[#2b579a]/80 w-[40%] rounded-sm mt-5 mb-2" />
            <div className="space-y-1.5">
              <div className="h-2 bg-gray-300 rounded-sm" />
              <div className="h-2 bg-gray-300 rounded-sm w-[80%]" />
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // NEW — Daktilo vs Word (before/after)
  () => (
    <SlideShell>
      <Eyebrow>Neden Büyük Devrim?</Eyebrow>
      <H2 className="mb-10">Daktilodan Word&apos;e — 5 dakikalık fark</H2>
      <div className="grid md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl p-6 border border-red-500/25 bg-gradient-to-br from-red-950/20 to-transparent"
        >
          <div className="flex items-center gap-2 mb-4">
            <XCircle className="w-5 h-5 text-red-400" />
            <div className="text-xs uppercase tracking-wider text-red-400">
              Daktilo · 1950–1990
            </div>
          </div>
          <div className="space-y-2.5 text-sm text-gray-300">
            {[
              "Hatayı silmek = karton kağıt sile ya da özrü dile",
              "Kopya almak = karbon kağıt + en fazla 3 nüsha",
              "Altı çizili = geri dön, alt çizgi üst üste yaz",
              "Başlık numarası = manuel, düzen değişince baştan",
              "Görsel = fotoğraf yapıştır → fotokopi",
              "Paylaşım = posta / faks / elden",
            ].map((l, i) => (
              <motion.div
                key={l}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="flex items-start gap-2"
              >
                <span className="text-red-400 font-mono mt-0.5">×</span>
                <span className="text-[13px]">{l}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl p-6 border border-[#4a89dc]/35 bg-gradient-to-br from-[#2b579a]/20 to-transparent"
        >
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-[#4a89dc]" />
            <div className="text-xs uppercase tracking-wider text-[#4a89dc]">
              Word · 1983+
            </div>
          </div>
          <div className="space-y-2.5 text-sm text-gray-300">
            {[
              { k: "Ctrl+Z", d: "sınırsız geri alma, sınırsız pişmanlık" },
              { k: "Ctrl+C", d: "kopya · anında · dijital · ücretsiz" },
              { k: "Ctrl+B", d: "tek tuşla kalın / italik / altı çizili" },
              { k: "Auto", d: "başlık stillerinden otomatik numaralama" },
              { k: "Drag", d: "sürükle-bırak görsel, etrafında metin sarsın" },
              { k: "Share", d: "tek linkle 30 kişi aynı anda düzenler" },
            ].map((l, i) => (
              <motion.div
                key={l.k}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="flex items-center gap-3"
              >
                <kbd className="px-2 py-0.5 text-[10px] font-mono bg-[#2b579a]/20 border border-[#4a89dc]/30 rounded text-[#a8c5ec] shrink-0 min-w-[56px] text-center">
                  {l.k}
                </kbd>
                <span className="text-[13px]">{l.d}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 text-center text-sm text-gray-400"
      >
        1980&apos;lerde bir tez yazmak:{" "}
        <span className="text-red-400 font-semibold">3 ay</span>{" "}
        · Bugün aynı tez:{" "}
        <span className="text-[#4a89dc] font-semibold">3 gün</span>
      </motion.div>
    </SlideShell>
  ),

  // 3 — Big numbers
  () => (
    <SlideShell>
      <Eyebrow>Neden önemli?</Eyebrow>
      <H2 className="mb-12">Kelime işlem — 21. yüzyılın yazma aracı</H2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          value="1.4 mlr"
          label="Microsoft 365 kullanıcısı"
          source="Microsoft, 2025"
          accent="#4a89dc"
        />
        <StatCard
          icon={History}
          value="43 yıl"
          label="Word'ün piyasadaki süresi"
          source="1983'ten beri"
          delay={0.1}
          accent="#4a89dc"
        />
        <StatCard
          icon={Globe}
          value="100+"
          label="Word'ün desteklediği dil"
          source="Microsoft, 2025"
          delay={0.2}
          accent="#4a89dc"
        />
        <StatCard
          icon={Cloud}
          value="3 mlr"
          label="Google Workspace kullanıcısı"
          source="Google, 2025"
          delay={0.3}
          accent="#4285f4"
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 word-card rounded-xl p-5 text-center"
      >
        <div className="text-sm text-gray-300">
          Staj başvurusu · CV · dilekçe · ödev raporu · iş sözleşmesi —{" "}
          <span className="text-[#4a89dc] font-semibold">hepsi</span> Word (
          <span className="font-mono text-[#4a89dc]">.docx</span>) veya PDF
          olarak istenir.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 4 — Historical timeline
  () => (
    <SlideShell>
      <Eyebrow>Tarihsel Yolculuk</Eyebrow>
      <H2 className="mb-12">Daktilodan yapay zekâya</H2>
      <div className="relative">
        <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[#4a89dc]/40 to-transparent" />
        <div className="grid grid-cols-2 md:grid-cols-7 gap-2 relative">
          {[
            { y: "1978", n: "WordStar", d: "İlk popüler kelime işlem — CP/M" },
            { y: "1982", n: "WordPerfect", d: "1980'lerin hâkimi" },
            { y: "1983", n: "MS Word 1.0", d: "Xenix/DOS — 2 düğmeli fare devri" },
            { y: "1989", n: "Word for Windows", d: "WYSIWYG ile patladı" },
            { y: "2002", n: "OpenOffice", d: "Açık kaynak alternatif" },
            { y: "2006", n: "Google Docs", d: "Cloud & real-time collab" },
            { y: "2024", n: "Copilot/AI", d: "Yapay zekâ destekli yazma" },
          ].map((e, i) => (
            <motion.div
              key={e.y}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="word-card rounded-lg p-3 text-center"
            >
              <div className="text-[10px] font-mono text-[#4a89dc] mb-1">
                {e.y}
              </div>
              <div className="text-xs font-semibold text-white mb-1">{e.n}</div>
              <div className="text-[10px] text-gray-500 leading-tight">{e.d}</div>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="mt-10 text-center text-sm text-gray-400"
      >
        Yazmak hep vardı — artık{" "}
        <span className="text-[#4a89dc]">düşünmek</span> kadar hızlı.
      </motion.div>
    </SlideShell>
  ),

  // NEW — .docx Anatomisi
  () => (
    <SlideShell>
      <Eyebrow>Teknik Detay</Eyebrow>
      <H2 className="mb-2">.docx aslında bir ZIP</H2>
      <Sub className="mb-10 !text-base">
        Word 2007&apos;den beri kullanılan format{" "}
        <span className="text-[#4a89dc] font-mono">OOXML</span> (Office Open XML).
        Uzantıyı <span className="font-mono text-[#4a89dc]">.zip</span> yap, içini aç —
        her şey XML.
      </Sub>
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="word-card rounded-xl p-5 font-mono text-[11px]"
        >
          <div className="flex items-center gap-2 text-[#4a89dc] mb-3 pb-3 border-b border-white/5">
            <FileArchive className="w-4 h-4" />
            <span>rapor.docx</span>
            <span className="text-gray-600 text-[9px] ml-auto">= ZIP</span>
          </div>
          <div className="space-y-1 text-gray-400 leading-relaxed">
            <div>├── <span className="text-yellow-400">[Content_Types].xml</span></div>
            <div>├── <span className="text-blue-400">_rels/</span></div>
            <div>│   └── .rels</div>
            <div>├── <span className="text-blue-400">word/</span></div>
            <div>│   ├── <span className="text-green-400">document.xml</span>   <span className="text-gray-600">// ana metin</span></div>
            <div>│   ├── <span className="text-green-400">styles.xml</span>     <span className="text-gray-600">// başlık + font</span></div>
            <div>│   ├── <span className="text-green-400">settings.xml</span></div>
            <div>│   ├── <span className="text-green-400">fontTable.xml</span></div>
            <div>│   ├── <span className="text-blue-400">theme/</span>theme1.xml</div>
            <div>│   └── <span className="text-blue-400">media/</span>image1.png</div>
            <div>└── <span className="text-blue-400">docProps/</span></div>
            <div>    ├── core.xml   <span className="text-gray-600">// yazar, tarih</span></div>
            <div>    └── app.xml    <span className="text-gray-600">// sayfa/kelime sayısı</span></div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-xs uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
            <Code2 className="w-4 h-4" />
            document.xml içinden bir parça
          </div>
          <pre className="word-card rounded-lg p-4 text-[10px] leading-relaxed font-mono text-gray-300 overflow-x-auto">
{`<w:document>
  <w:body>
    <w:p>
      <w:pPr>
        <w:pStyle w:val="Heading1"/>
      </w:pPr>
      <w:r>
        <w:t>Giriş</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:r>
        <w:t xml:space="preserve">
          Bu bir paragraf.
        </w:t>
      </w:r>
    </w:p>
  </w:body>
</w:document>`}
          </pre>
          <div className="mt-4 space-y-2 text-[11px] text-gray-400">
            <div className="flex items-start gap-2">
              <Check className="w-3 h-3 text-[#4a89dc] shrink-0 mt-0.5" />
              <span>ISO/IEC 29500 standardı — 2006&apos;dan beri</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-3 h-3 text-[#4a89dc] shrink-0 mt-0.5" />
              <span>Git ile versiyonlanabilir (eski ikili .doc değildi)</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-3 h-3 text-[#4a89dc] shrink-0 mt-0.5" />
              <span>
                Kod ile oluştur: <span className="font-mono">python-docx</span>,{" "}
                <span className="font-mono">docxtemplater</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 5 — Quote
  () => (
    <QuoteSlide
      quote="Yazmak, kâğıda düşünmektir. Ne yazmak istediğini bilmiyorsan, aslında ne düşündüğünü de bilmiyorsundur."
      author="William Zinsser"
      role='"On Writing Well" yazarı · 1.5M+ baskı'
    />
  ),

  /* ─────────────────  1. MICROSOFT WORD  ───────────────── */

  // 6 — Section: Word
  () => (
    <SectionDivider
      num="1"
      total="4"
      title="Microsoft Word"
      subtitle="1983'ten beri profesyonel yazmanın standartı. 43 yıllık miras."
      bgGradient="linear-gradient(135deg, #2b579a, #1e3f72)"
      shadow="0 20px 60px -10px rgba(43, 87, 154, 0.6)"
      icon={<span className="text-7xl font-black text-white" style={{ fontFamily: "Georgia, serif" }}>W</span>}
    />
  ),

  // 7 — Word by numbers
  () => (
    <SlideShell>
      <Eyebrow>Rakamlarla Word</Eyebrow>
      <H2 className="mb-12">Bir endüstri standartı</H2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={History}
          value="1983"
          label="İlk sürüm yılı (Xenix + DOS)"
          accent="#4a89dc"
        />
        <StatCard
          icon={Users}
          value="400M+"
          label="Aylık aktif Word kullanıcı"
          source="Microsoft, 2025"
          delay={0.1}
          accent="#4a89dc"
        />
        <StatCard
          icon={Globe}
          value="90+"
          label="Desteklenen dil + bölge"
          source="Microsoft, 2025"
          delay={0.2}
          accent="#4a89dc"
        />
        <StatCard
          icon={Briefcase}
          value="85%"
          label="Kurumsal kelime işlem pazarı"
          source="6sense, 2025"
          delay={0.3}
          accent="#4a89dc"
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 grid md:grid-cols-3 gap-4"
      >
        <div className="word-card rounded-lg p-4 text-center">
          <GraduationCap className="w-5 h-5 text-[#4a89dc] mx-auto mb-2" />
          <div className="text-xs text-gray-400">Akademik</div>
          <div className="text-[10px] text-gray-600 mt-1">Tez · makale · rapor</div>
        </div>
        <div className="word-card rounded-lg p-4 text-center">
          <Briefcase className="w-5 h-5 text-[#4a89dc] mx-auto mb-2" />
          <div className="text-xs text-gray-400">Kurumsal</div>
          <div className="text-[10px] text-gray-600 mt-1">Sözleşme · rapor · teklif</div>
        </div>
        <div className="word-card rounded-lg p-4 text-center">
          <FileCheck2 className="w-5 h-5 text-[#4a89dc] mx-auto mb-2" />
          <div className="text-xs text-gray-400">Resmi Yazışma</div>
          <div className="text-[10px] text-gray-600 mt-1">Dilekçe · özgeçmiş · CV</div>
        </div>
      </motion.div>
      <div className="mt-6 text-center text-xs text-gray-600">
        En yaygın 3 kullanım alanı
      </div>
    </SlideShell>
  ),

  // 8 — Ribbon mockup
  () => (
    <SlideShell>
      <Eyebrow>Arayüz</Eyebrow>
      <H2 className="mb-8">Şerit (Ribbon) Yapısı</H2>
      <WordMockup title="Belge1 - Word">
        <div className="space-y-3">
          <div className="flex gap-1.5 flex-wrap">
            {[
              { t: "Dosya", active: false },
              { t: "Giriş", active: true },
              { t: "Ekle", active: false },
              { t: "Çizim", active: false },
              { t: "Tasarım", active: false },
              { t: "Düzen", active: false },
              { t: "Başvurular", active: false },
              { t: "Postalar", active: false },
              { t: "Gözden Geçir", active: false },
              { t: "Görünüm", active: false },
            ].map((tab, i) => (
              <motion.div
                key={tab.t}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.04 }}
                className={`px-3 py-1.5 text-xs rounded ${
                  tab.active
                    ? "bg-[#2b579a] text-white font-semibold"
                    : "bg-white/5 text-gray-400 border border-white/10"
                }`}
              >
                {tab.t}
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-2 p-3 rounded bg-white/5 border border-white/10"
          >
            <div className="flex items-center gap-1 pr-3 border-r border-white/10">
              <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center"><Copy className="w-3 h-3 text-gray-400" /></div>
              <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center"><Scissors className="w-3 h-3 text-gray-400" /></div>
              <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center"><ClipboardPaste className="w-3 h-3 text-gray-400" /></div>
            </div>
            <div className="flex items-center gap-1 px-3 border-r border-white/10">
              <div className="text-[10px] text-gray-500 mr-2">Calibri · 11</div>
              <div className="w-7 h-7 rounded bg-white/5 flex items-center justify-center"><Bold className="w-3 h-3 text-gray-400" /></div>
              <div className="w-7 h-7 rounded bg-white/5 flex items-center justify-center"><Italic className="w-3 h-3 text-gray-400" /></div>
              <div className="w-7 h-7 rounded bg-white/5 flex items-center justify-center"><Underline className="w-3 h-3 text-gray-400" /></div>
              <div className="w-7 h-7 rounded bg-white/5 flex items-center justify-center"><Highlighter className="w-3 h-3 text-gray-400" /></div>
            </div>
            <div className="flex items-center gap-1 px-3 border-r border-white/10">
              <div className="w-7 h-7 rounded bg-white/5 flex items-center justify-center"><AlignLeft className="w-3 h-3 text-gray-400" /></div>
              <div className="w-7 h-7 rounded bg-white/5 flex items-center justify-center"><AlignCenter className="w-3 h-3 text-gray-400" /></div>
              <div className="w-7 h-7 rounded bg-white/5 flex items-center justify-center"><AlignRight className="w-3 h-3 text-gray-400" /></div>
              <div className="w-7 h-7 rounded bg-white/5 flex items-center justify-center"><AlignJustify className="w-3 h-3 text-gray-400" /></div>
            </div>
            <div className="flex items-center gap-1 px-3">
              <div className="w-7 h-7 rounded bg-white/5 flex items-center justify-center"><List className="w-3 h-3 text-gray-400" /></div>
              <div className="w-7 h-7 rounded bg-white/5 flex items-center justify-center"><ListOrdered className="w-3 h-3 text-gray-400" /></div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="aspect-[16/9] rounded bg-white p-8 text-black overflow-hidden"
          >
            <div className="text-2xl font-bold mb-3" style={{ color: "#2b579a" }}>
              Belge Başlığı<span className="word-caret" />
            </div>
            <div className="space-y-1.5 text-[10px] leading-relaxed text-gray-700">
              <div className="w-full h-1.5 bg-gray-200 rounded-sm" />
              <div className="w-[95%] h-1.5 bg-gray-200 rounded-sm" />
              <div className="w-[90%] h-1.5 bg-gray-200 rounded-sm" />
            </div>
          </motion.div>
        </div>
      </WordMockup>
    </SlideShell>
  ),

  // 9 — Sekmelerin rolü
  () => (
    <SlideShell>
      <Eyebrow>Sekme Detayları</Eyebrow>
      <H2 className="mb-10">Her sekme ne yapar?</H2>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { t: "Dosya", d: "Aç, Kaydet, Farklı Kaydet, Yazdır, Paylaş, Dışa Aktar" },
          { t: "Giriş", d: "Pano, Yazı Tipi, Paragraf, Stiller — en çok kullanılan" },
          { t: "Ekle", d: "Sayfa, Tablo, Resim, Şekil, SmartArt, Grafik, Simge" },
          { t: "Çizim", d: "Tablet + kalem ile elle çizim, işaretleme, vurgu" },
          { t: "Tasarım", d: "Tema, renk, yazı tipi seti, filigran, sayfa rengi" },
          { t: "Düzen", d: "Kenar boşluğu, yön, boyut, sütun, kesmeler, girinti" },
          { t: "Başvurular", d: "İçindekiler, dipnot, alıntı, kaynakça, dizin" },
          { t: "Postalar", d: "Adres Mektup Birleştirme (mail merge), zarf, etiket" },
          { t: "Gözden Geçir", d: "Yazım, dil, yorum, değişiklikleri izle, koru" },
        ].map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="word-card rounded-lg p-4"
          >
            <div className="text-sm font-semibold text-[#4a89dc] mb-1">
              {s.t}
            </div>
            <div className="text-xs text-gray-400 leading-relaxed">{s.d}</div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  // 10 — Sayfa Düzeni
  () => (
    <SlideShell>
      <Eyebrow>Düzen Sekmesi</Eyebrow>
      <H2 className="mb-10">Sayfa Düzeni</H2>
      <div className="grid md:grid-cols-[1fr_1fr] gap-8">
        <div className="space-y-4">
          {[
            { icon: Ruler, t: "Kenar Boşluğu", d: "Standart 2.54 cm · Dar 1.27 cm · Geniş 5 cm · Özel ayar" },
            { icon: Columns3, t: "Yönlendirme", d: "Dikey (portrait) veya Yatay (landscape)" },
            { icon: Shapes, t: "Sayfa Boyutu", d: "A4 (21×29.7 cm) · A5 · Letter · Legal · özel boyut" },
            { icon: Rows3, t: "Sütun", d: "Tek · iki · üç · sol · sağ — dergi / bülten görünümü" },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.t}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="word-card rounded-lg p-4 flex gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-[#2b579a]/15 border border-[#4a89dc]/30 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#4a89dc]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{f.t}</div>
                  <div className="text-xs text-gray-400">{f.d}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center"
        >
          <div className="word-paper p-5 aspect-[3/4] w-[72%] relative">
            <div className="absolute inset-5 border-2 border-dashed border-[#4a89dc]/50 rounded-sm pointer-events-none" />
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[#2b579a]">
              2.54 cm
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[#2b579a]">
              2.54 cm
            </div>
            <div className="absolute left-1 top-1/2 -translate-y-1/2 text-[9px] font-mono text-[#2b579a] -rotate-90">
              2.54 cm
            </div>
            <div className="absolute right-1 top-1/2 -translate-y-1/2 text-[9px] font-mono text-[#2b579a] rotate-90">
              2.54 cm
            </div>
            <div className="space-y-1.5 p-4 h-full flex flex-col justify-center">
              <div className="h-2 bg-gray-300 rounded-sm" />
              <div className="h-2 bg-gray-300 rounded-sm w-[92%]" />
              <div className="h-2 bg-gray-300 rounded-sm w-[86%]" />
              <div className="h-2 bg-gray-300 rounded-sm w-[94%]" />
            </div>
            <div className="absolute bottom-6 right-4 text-[9px] text-gray-400 font-mono">
              A4 · Dikey
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 11 — Font & Paragraph
  () => (
    <SlideShell>
      <Eyebrow>Giriş Sekmesi</Eyebrow>
      <H2 className="mb-10">Yazı Tipi & Paragraf</H2>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="word-card-blue rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Type className="w-5 h-5 text-[#4a89dc]" />
            <div className="text-sm font-semibold text-white">Yazı Tipi</div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Calibri</span>
              <span className="text-[10px] text-gray-600 font-mono">varsayılan · 11pt</span>
            </div>
            <div className="flex items-center justify-between text-sm" style={{ fontFamily: "Times New Roman, serif" }}>
              <span className="text-gray-400">Times New Roman</span>
              <span className="text-[10px] text-gray-600 font-mono">akademik · 12pt</span>
            </div>
            <div className="flex items-center justify-between text-sm" style={{ fontFamily: "Arial, sans-serif" }}>
              <span className="text-gray-400">Arial</span>
              <span className="text-[10px] text-gray-600 font-mono">modern · 11pt</span>
            </div>
            <div className="flex items-center justify-between text-sm" style={{ fontFamily: "Georgia, serif" }}>
              <span className="text-gray-400">Georgia</span>
              <span className="text-[10px] text-gray-600 font-mono">kitap · 11pt</span>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-2">
            <kbd className="px-2 py-0.5 text-[10px] font-mono bg-[#2b579a]/20 border border-[#4a89dc]/30 rounded text-[#a8c5ec]">Ctrl</kbd>
            <span className="text-gray-600">+</span>
            <kbd className="px-2 py-0.5 text-[10px] font-mono bg-[#2b579a]/20 border border-[#4a89dc]/30 rounded text-[#a8c5ec]">B</kbd>
            <span className="text-xs text-gray-500 ml-2">Kalın</span>
            <kbd className="ml-4 px-2 py-0.5 text-[10px] font-mono bg-[#2b579a]/20 border border-[#4a89dc]/30 rounded text-[#a8c5ec]">Ctrl</kbd>
            <span className="text-gray-600">+</span>
            <kbd className="px-2 py-0.5 text-[10px] font-mono bg-[#2b579a]/20 border border-[#4a89dc]/30 rounded text-[#a8c5ec]">I</kbd>
            <span className="text-xs text-gray-500 ml-2">İtalik</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="word-card-blue rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <AlignJustify className="w-5 h-5 text-[#4a89dc]" />
            <div className="text-sm font-semibold text-white">Paragraf</div>
          </div>
          <div className="space-y-3 text-xs text-gray-400">
            <div className="flex items-center justify-between">
              <span>Satır Aralığı</span>
              <span className="font-mono text-[#4a89dc]">1.15 · 1.5 · 2.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Paragraf Aralığı</span>
              <span className="font-mono text-[#4a89dc]">önce / sonra</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Girinti</span>
              <span className="font-mono text-[#4a89dc]">sol · sağ · özel</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Hizalama</span>
              <span className="font-mono text-[#4a89dc]">sol · orta · sağ · yasla</span>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-white/5">
            <div className="word-paper p-3 text-[9px] leading-relaxed text-gray-700 font-serif">
              <div style={{ textAlign: "justify" }}>
                Kelime işlem programı yazılı iletişimin temelidir.
                Metnin görsel hiyerarşisi okunabilirliği doğrudan etkiler.
              </div>
            </div>
            <div className="text-[9px] text-gray-600 font-mono mt-1 text-right">
              ↑ iki yana yaslama örneği
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 12 — Stiller (Styles)
  () => (
    <SlideShell>
      <Eyebrow>Süper Güç</Eyebrow>
      <H2 className="mb-6">
        Stiller —{" "}
        <span className="text-[#4a89dc]">
          Word&apos;ün en az bilinen gücü
        </span>
      </H2>
      <Sub className="mb-10 !text-base max-w-3xl">
        Stil = bir tıkla tanımlı biçim. Başlık, alt başlık, gövde, alıntı...
        Tek yerden değiştir, tüm belge güncellensin.
      </Sub>
      <div className="grid md:grid-cols-[1.1fr_1fr] gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="word-card rounded-xl p-5"
        >
          <div className="text-xs uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
            <Heading1 className="w-4 h-4" /> Stil Galerisi
          </div>
          <div className="space-y-2">
            {[
              { t: "Normal", c: "gövde metni", size: "text-sm", color: "text-gray-300" },
              { t: "Başlık 1", c: "En büyük başlık", size: "text-2xl font-bold", color: "text-white" },
              { t: "Başlık 2", c: "Alt başlık", size: "text-xl font-semibold", color: "text-gray-100" },
              { t: "Başlık 3", c: "Üçüncü düzey", size: "text-lg font-medium", color: "text-gray-200" },
              { t: "Alıntı", c: "Italik + girintili", size: "text-sm italic", color: "text-gray-400" },
              { t: "Vurgu", c: "Italik", size: "text-sm italic", color: "text-gray-300" },
              { t: "Kod", c: "Monospace", size: "text-sm font-mono", color: "text-[#4a89dc]" },
            ].map((s, i) => (
              <motion.div
                key={s.t}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="flex items-center justify-between border-b border-white/5 pb-2"
              >
                <div className={`${s.size} ${s.color}`}>{s.t}</div>
                <div className="text-[10px] text-gray-600 font-mono">{s.c}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          {[
            { icon: Target, t: "Tutarlılık", d: "Tüm belgede aynı başlıklar birebir aynı görünür" },
            { icon: Zap, t: "Hız", d: "Tüm H2&apos;leri değiştir → 1 tıkla, değil tek tek" },
            { icon: BookMarked, t: "İçindekiler", d: "Başlık stilleri otomatik içindekiler tablosu üretir" },
            { icon: Edit3, t: "Yeniden düzen", d: "Anahat görünümünde başlıkları sürükle-bırak ile taşı" },
          ].map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.t}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.08 }}
                className="word-card-blue rounded-lg p-4 flex gap-3"
              >
                <Icon className="w-5 h-5 text-[#4a89dc] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-white">{b.t}</div>
                  <div className="text-xs text-gray-400">{b.d}</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 13 — İçindekiler Tablosu
  () => (
    <SlideShell>
      <Eyebrow>Başvurular</Eyebrow>
      <H2 className="mb-10">İçindekiler Tablosu — 1 tıkla</H2>
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-8">
        <div>
          <div className="space-y-3">
            {[
              "Başlık stillerini kullan (Başlık 1, 2, 3)",
              "Başvurular → İçindekiler Tablosu",
              "Otomatik Tablo 1 veya 2 seç",
              "Yeni başlık eklediğinde: Tümünü Güncelle",
            ].map((s, i) => (
              <motion.div
                key={s}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-[#2b579a]/20 border border-[#4a89dc]/40 flex items-center justify-center text-[10px] font-mono text-[#4a89dc] shrink-0">
                  {i + 1}
                </div>
                <div className="text-sm text-gray-300 pt-0.5">{s}</div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 word-card rounded-lg p-4"
          >
            <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">
              Pro ipucu
            </div>
            <div className="text-xs text-gray-400">
              Başlık stillerini kullanmazsan içindekiler tablosu boş çıkar.
              Stiller = otomasyonun anahtarı.
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="word-paper p-8 font-serif"
          style={{ fontFamily: "Georgia, serif" }}
        >
          <div className="text-xl font-bold text-gray-900 mb-5 pb-2 border-b-2" style={{ borderColor: "#2b579a" }}>
            İçindekiler
          </div>
          <div className="space-y-2 text-sm text-gray-800">
            {[
              { t: "1.  Staj Yerinin Tanıtımı", p: "1", indent: 0 },
              { t: "2.  Şirket / Kurum Yapısı", p: "3", indent: 0 },
              { t: "2.1  Departmanlar", p: "5", indent: 4 },
              { t: "2.2  Kullanılan Teknolojiler", p: "8", indent: 4 },
              { t: "3.  Haftalık Yapılan İşler", p: "11", indent: 0 },
              { t: "3.1  Görev Tanımları", p: "14", indent: 4 },
              { t: "4.  Kazanımlar & Gözlemler", p: "18", indent: 0 },
              { t: "5.  Sonuç", p: "22", indent: 0 },
              { t: "Ekler (fotoğraflar)", p: "25", indent: 0 },
            ].map((row, i) => (
              <motion.div
                key={row.t}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.05 }}
                className="flex items-center"
                style={{ paddingLeft: `${row.indent * 4}px` }}
              >
                <span>{row.t}</span>
                <span className="flex-1 mx-2 border-b border-dotted border-gray-400 mb-1" />
                <span className="font-mono text-xs">{row.p}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 14 — Üstbilgi & Altbilgi
  () => (
    <SlideShell>
      <Eyebrow>Ekle Sekmesi</Eyebrow>
      <H2 className="mb-10">Üstbilgi · Altbilgi · Sayfa Numarası</H2>
      <div className="grid md:grid-cols-[1fr_1fr] gap-8 items-center">
        <div className="space-y-3">
          {[
            { t: "Üstbilgi (Header)", d: "Ekle → Üstbilgi → her sayfanın en üstü", icon: Layers },
            { t: "Altbilgi (Footer)", d: "Ekle → Altbilgi → her sayfanın en altı", icon: Layers },
            { t: "Sayfa Numarası", d: "Ekle → Sayfa Numarası → konum + stil seç", icon: Bookmark },
            { t: "Farklı İlk Sayfa", d: "Kapakta üstbilgi görünmesin diye özel kutucuğu seç", icon: FileText },
            { t: "Çift/Tek Farklı", d: "Kitap düzeninde sol/sağ sayfalar farklı görünsün", icon: BookOpen },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.t}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="word-card rounded-lg p-4 flex gap-3"
              >
                <Icon className="w-5 h-5 text-[#4a89dc] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-white">{f.t}</div>
                  <div className="text-xs text-gray-400">{f.d}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="word-paper p-0 aspect-[3/4] overflow-hidden relative"
        >
          <div className="bg-[#2b579a]/10 border-b border-[#2b579a]/20 px-6 py-3 flex items-center justify-between text-[10px] text-[#2b579a] font-mono">
            <span>BVA 1108 · Hafta 10</span>
            <span>Kelime İşlem Programı</span>
          </div>
          <div className="p-6 text-[10px] text-gray-700 leading-relaxed space-y-2" style={{ fontFamily: "Georgia, serif" }}>
            <div className="text-base font-bold text-gray-900">1. Giriş</div>
            <div className="h-1.5 bg-gray-200 rounded-sm" />
            <div className="h-1.5 bg-gray-200 rounded-sm w-[95%]" />
            <div className="h-1.5 bg-gray-200 rounded-sm w-[88%]" />
            <div className="h-1.5 bg-gray-200 rounded-sm w-[92%]" />
            <div className="h-1.5 bg-gray-200 rounded-sm w-[82%]" />
            <div className="text-base font-bold text-gray-900 pt-4">2. Literatür</div>
            <div className="h-1.5 bg-gray-200 rounded-sm" />
            <div className="h-1.5 bg-gray-200 rounded-sm w-[90%]" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-[#2b579a]/10 border-t border-[#2b579a]/20 px-6 py-3 flex items-center justify-between text-[10px] text-[#2b579a] font-mono">
            <span>Osman Can Çetlenbik</span>
            <span>Sayfa 3 / 24</span>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 15 — Kesmeler
  () => (
    <SlideShell>
      <Eyebrow>Düzen</Eyebrow>
      <H2 className="mb-10">Kesmeler (Breaks)</H2>
      <div className="grid md:grid-cols-2 gap-5">
        {[
          {
            t: "Sayfa Sonu",
            k: ["Ctrl", "Enter"],
            d: "Metin bittikten sonra yeni sayfaya zorla geç. Boş satırla değil!",
            icon: FileText,
          },
          {
            t: "Sütun Sonu",
            k: ["Ctrl", "Shift", "Enter"],
            d: "Sütunlu metinde bir sonraki sütuna geç",
            icon: Columns3,
          },
          {
            t: "Bölüm Sonu — Sonraki Sayfa",
            k: ["Düzen", "Kesmeler"],
            d: "Yeni bölüm + sayfa düzeni, üstbilgi, sütun ayarı tekrar başlar",
            icon: Layers,
          },
          {
            t: "Bölüm Sonu — Sürekli",
            k: ["Düzen", "Kesmeler"],
            d: "Aynı sayfada yeni bölüm — örneğin tek sütundan iki sütuna geçiş",
            icon: Rows3,
          },
        ].map((b, i) => {
          const Icon = b.icon;
          return (
            <motion.div
              key={b.t}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="word-card rounded-xl p-5"
            >
              <div className="flex items-start gap-3">
                <Icon className="w-5 h-5 text-[#4a89dc] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">{b.t}</div>
                  <div className="text-xs text-gray-400 mt-1">{b.d}</div>
                  <div className="mt-3 flex items-center gap-1 flex-wrap">
                    {b.k.map((key, ki) => (
                      <span key={key} className="flex items-center gap-1">
                        <kbd className="px-2 py-0.5 text-[10px] font-mono bg-[#2b579a]/20 border border-[#4a89dc]/30 rounded text-[#a8c5ec]">
                          {key}
                        </kbd>
                        {ki < b.k.length - 1 && <span className="text-gray-600 text-xs">+</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 word-card-blue rounded-lg p-4 text-center"
      >
        <div className="text-xs text-gray-400">
          <span className="text-[#4a89dc] font-mono">YAPMA:</span> Sayfanın
          ortasında yeni sayfa başlatmak için{" "}
          <span className="line-through">15 kez Enter</span> — kesinlikle{" "}
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-[#2b579a]/20 border border-[#4a89dc]/30 rounded text-[#a8c5ec]">
            Ctrl+Enter
          </kbd>{" "}
          kullan.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 16 — Listeler
  () => (
    <SlideShell>
      <Eyebrow>Paragraf</Eyebrow>
      <H2 className="mb-10">Listeler — Maddelenmiş ve Numaralı</H2>
      <div className="grid md:grid-cols-3 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="word-card rounded-xl p-5"
        >
          <List className="w-6 h-6 text-[#4a89dc] mb-3" />
          <div className="text-sm font-semibold text-white mb-3">Madde İşaretli</div>
          <div className="text-[13px] text-gray-400 space-y-1.5 font-serif">
            <div>• Sıra önemsiz öğeler</div>
            <div>• Özellikler, kurallar</div>
            <div>• Bullet points</div>
            <div className="ml-4">◦ Alt madde</div>
            <div className="ml-4">◦ Çok düzeyli olabilir</div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="word-card rounded-xl p-5"
        >
          <ListOrdered className="w-6 h-6 text-[#4a89dc] mb-3" />
          <div className="text-sm font-semibold text-white mb-3">Numaralı</div>
          <div className="text-[13px] text-gray-400 space-y-1.5 font-serif">
            <div>1. Sıra önemli öğeler</div>
            <div>2. Adım adım rehberler</div>
            <div>3. Sıralama — kural</div>
            <div className="ml-4">3.1 Alt madde</div>
            <div className="ml-4">3.2 Sürdürür</div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="word-card rounded-xl p-5"
        >
          <Layers className="w-6 h-6 text-[#4a89dc] mb-3" />
          <div className="text-sm font-semibold text-white mb-3">Çok Düzeyli</div>
          <div className="text-[13px] text-gray-400 space-y-1.5 font-serif">
            <div>1. Ana başlık</div>
            <div className="ml-3">1.1 Alt başlık</div>
            <div className="ml-6">1.1.1 Alt-alt</div>
            <div className="ml-3">1.2 İkinci alt</div>
            <div>2. Başka ana</div>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 flex items-center justify-center gap-6 text-xs text-gray-400"
      >
        <div className="flex items-center gap-2">
          <kbd className="px-2 py-0.5 text-[10px] font-mono bg-[#2b579a]/20 border border-[#4a89dc]/30 rounded text-[#a8c5ec]">Tab</kbd>
          <span>alt düzeye indir</span>
        </div>
        <div className="flex items-center gap-2">
          <kbd className="px-2 py-0.5 text-[10px] font-mono bg-[#2b579a]/20 border border-[#4a89dc]/30 rounded text-[#a8c5ec]">Shift + Tab</kbd>
          <span>üst düzeye çık</span>
        </div>
      </motion.div>
    </SlideShell>
  ),

  // NEW — Fields + Wildcards
  () => (
    <SlideShell>
      <Eyebrow>Power-user Özellikleri</Eyebrow>
      <H2 className="mb-10">Alanlar (Fields) & Wildcards</H2>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="word-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <Braces className="w-5 h-5 text-[#4a89dc]" />
            <div className="text-sm font-semibold text-white">
              Alanlar — Dinamik İçerik
            </div>
          </div>
          <div className="text-[11px] text-gray-400 mb-4 leading-relaxed">
            Alan = belgeye otomatik güncellenen dinamik değer.{" "}
            <kbd className="px-1.5 py-0 text-[9px] font-mono bg-[#2b579a]/20 border border-[#4a89dc]/30 rounded text-[#a8c5ec]">
              Ctrl+F9
            </kbd>{" "}
            ile ekle,{" "}
            <kbd className="px-1.5 py-0 text-[9px] font-mono bg-[#2b579a]/20 border border-[#4a89dc]/30 rounded text-[#a8c5ec]">
              F9
            </kbd>{" "}
            ile güncelle.
          </div>
          <div className="space-y-2 font-mono">
            {[
              { f: "{ DATE }", r: "21.04.2026", d: "bugünün tarihi" },
              { f: "{ PAGE }", r: "3", d: "geçerli sayfa" },
              { f: "{ NUMPAGES }", r: "24", d: "toplam sayfa" },
              { f: "{ TOC }", r: "İçindekiler tablosu", d: "otomatik TOC" },
              { f: "{ REF Bookmark1 }", r: "—", d: "çapraz başvuru" },
              { f: "{ IF x = y \"Evet\" \"Hayır\" }", r: "koşullu metin", d: "şablon mantığı" },
            ].map((a, i) => (
              <motion.div
                key={a.f}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.06 }}
                className="flex items-center justify-between text-[11px] border-b border-white/5 pb-1.5"
              >
                <div className="text-[#4a89dc] truncate">{a.f}</div>
                <div className="text-gray-500 text-[10px] shrink-0 ml-2">
                  → {a.r}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="word-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <Asterisk className="w-5 h-5 text-[#4a89dc]" />
            <div className="text-sm font-semibold text-white">
              Bul &amp; Değiştir — Wildcards
            </div>
          </div>
          <div className="text-[11px] text-gray-400 mb-4 leading-relaxed">
            <kbd className="px-1.5 py-0 text-[9px] font-mono bg-[#2b579a]/20 border border-[#4a89dc]/30 rounded text-[#a8c5ec]">
              Ctrl+H
            </kbd>{" "}
            → Diğer →{" "}
            <span className="text-[#4a89dc]">Joker karakter kullan</span>. Regex
            gibi, ama Word lehçesi.
          </div>
          <div className="space-y-2 font-mono">
            {[
              { p: "[A-Z]", m: "herhangi büyük harf" },
              { p: "<bir>", m: "kelime sınırı (tam 'bir')" },
              { p: "b?r", m: "b + herhangi karakter + r" },
              { p: "*", m: "her şey (açgözlü)" },
              { p: "(Ahmet) (Veli) → \\2 \\1", m: "grupları yer değiştir" },
              { p: "^p^p", m: "çift boş satırı tek yap" },
            ].map((w, i) => (
              <motion.div
                key={w.p}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 + i * 0.06 }}
                className="flex items-start gap-2 text-[11px] border-b border-white/5 pb-1.5"
              >
                <div className="text-[#4a89dc] shrink-0">{w.p}</div>
                <div className="text-gray-500 text-[10px] ml-auto text-right">
                  {w.m}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6 text-center text-xs text-gray-500"
      >
        Bu iki özellikle 500 kişilik liste → kişiselleştirilmiş belge · 30 saniyede.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  2. İLERİ ÖZELLİKLER  ───────────────── */

  // 17 — Section: İleri
  () => (
    <SectionDivider
      num="2"
      total="4"
      title="İleri Özellikler"
      subtitle="Tablolar, görseller, başvurular, mail merge ve ortak yazarlık"
      bgGradient="linear-gradient(135deg, #a855f7, #6b21a8)"
      shadow="0 20px 60px -10px rgba(168, 85, 247, 0.5)"
      icon={<Sparkles className="w-16 h-16 text-white" />}
    />
  ),

  // 18 — Tablo
  () => (
    <SlideShell>
      <Eyebrow>Ekle Sekmesi</Eyebrow>
      <H2 className="mb-10">Tablo Ekleme ve Biçimlendirme</H2>
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-8">
        <div>
          <div className="space-y-3">
            {[
              { t: "Hızlı Tablo", d: "Ekle → Tablo → ızgaradan hücre sayısı seç" },
              { t: "Tablo Ekle Dialog", d: "Ekle → Tablo → Tablo Ekle (özel boyut)" },
              { t: "Metinden Dönüştür", d: "Sekmeli veya virgüllü metni → tabloya" },
              { t: "Hücre Birleştir", d: "Seç → Düzen → Hücreleri Birleştir" },
              { t: "Başlık Tekrar", d: "Düzen → Başlık Satırlarını Tekrarla (çok sayfalı)" },
              { t: "Otomatik Biçim", d: "Tablo Tasarım → hazır şablonlar" },
            ].map((f, i) => (
              <motion.div
                key={f.t}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                className="flex items-start gap-3"
              >
                <TableIcon className="w-4 h-4 text-[#4a89dc] shrink-0 mt-1" />
                <div>
                  <div className="text-sm font-semibold text-white">{f.t}</div>
                  <div className="text-xs text-gray-400">{f.d}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="word-paper p-5"
        >
          <div className="text-xs font-semibold mb-3" style={{ color: "#2b579a", fontFamily: "Georgia, serif" }}>
            Tablo 1. Kelime işlem araçları karşılaştırması
          </div>
          <table className="w-full text-[11px]" style={{ fontFamily: "Calibri, sans-serif" }}>
            <thead>
              <tr style={{ background: "#2b579a", color: "white" }}>
                <th className="text-left px-2 py-1.5 font-semibold">Araç</th>
                <th className="text-left px-2 py-1.5 font-semibold">Tip</th>
                <th className="text-left px-2 py-1.5 font-semibold">Fiyat</th>
              </tr>
            </thead>
            <tbody>
              {[
                { a: "Microsoft Word", t: "Masaüstü", p: "Lisans" },
                { a: "Google Docs", t: "Web", p: "Ücretsiz" },
                { a: "LibreOffice Writer", t: "Masaüstü", p: "Ücretsiz" },
                { a: "WPS Office", t: "Masaüstü / Web", p: "Ücretsiz" },
                { a: "Apple Pages", t: "macOS / iOS", p: "Ücretsiz" },
              ].map((row, i) => (
                <tr
                  key={row.a}
                  className={i % 2 === 0 ? "bg-gray-50" : ""}
                  style={{ color: "#1f2937" }}
                >
                  <td className="px-2 py-1.5 border-b border-gray-200">{row.a}</td>
                  <td className="px-2 py-1.5 border-b border-gray-200">{row.t}</td>
                  <td className="px-2 py-1.5 border-b border-gray-200">{row.p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 19 — Resim, Şekil, SmartArt
  () => (
    <SlideShell>
      <Eyebrow>Ekle Sekmesi</Eyebrow>
      <H2 className="mb-10">Görsel Öğeler — Resim · Şekil · SmartArt</H2>
      <div className="grid md:grid-cols-3 gap-5">
        <FeatureCard
          icon={ImageIcon}
          title="Resim Ekle"
          desc="Bu cihaz · Stok Görselleri · Çevrimiçi Görseller · Ekran Kırpma"
          accent="#4a89dc"
          delay={0.15}
        />
        <FeatureCard
          icon={Shapes}
          title="Şekil"
          desc="Ok, daire, dikdörtgen, bağlantı çizgileri — akış şeması için ideal"
          accent="#4a89dc"
          delay={0.25}
        />
        <FeatureCard
          icon={GitBranch}
          title="SmartArt"
          desc="Hiyerarşik diyagram, süreç akışı, Venn diyagramı, piramit, matris"
          accent="#4a89dc"
          delay={0.35}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-10"
      >
        <div className="text-xs uppercase tracking-wider text-gray-500 mb-4">
          Metin Kaydırma Seçenekleri
        </div>
        <div className="grid grid-cols-5 gap-3">
          {[
            { t: "Satır İçi", d: "Metnin bir parçası gibi" },
            { t: "Kare", d: "Etrafından metin akar" },
            { t: "Sıkı", d: "Şekle sarılarak" },
            { t: "Önünde", d: "Metnin üstünde" },
            { t: "Arkasında", d: "Metnin altında" },
          ].map((w, i) => (
            <motion.div
              key={w.t}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.08 }}
              className="word-card rounded-lg p-3 text-center"
            >
              <div className="text-sm font-semibold text-[#4a89dc]">{w.t}</div>
              <div className="text-[10px] text-gray-500 mt-1">{w.d}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 20 — Başvurular
  () => (
    <SlideShell>
      <Eyebrow>Ödev & rapor için</Eyebrow>
      <H2 className="mb-10">Başvurular — Dipnot, Alıntı, Kaynakça</H2>
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-8">
        <div className="space-y-3">
          {[
            {
              icon: BookMarked,
              t: "Dipnot Ekle",
              d: "İmleci yerleştir → Başvurular → Dipnot Ekle",
              k: ["Ctrl", "Alt", "F"],
            },
            {
              icon: Quote,
              t: "Alıntı Ekle",
              d: "Başvurular → Alıntı Ekle → Yeni Kaynak",
            },
            {
              icon: BookOpen,
              t: "Kaynak Yönet",
              d: "Tüm kaynakları tek yerden görüntüle, düzenle",
            },
            {
              icon: Award,
              t: "Stil Seç",
              d: "Hocanın istediği stil: APA · IEEE · MLA · Chicago",
            },
            {
              icon: FileCheck2,
              t: "Kaynakça Oluştur",
              d: "Başvurular → Kaynakça → otomatik üretilir",
            },
          ].map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.t}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="word-card rounded-lg p-3 flex items-start gap-3"
              >
                <Icon className="w-4 h-4 text-[#4a89dc] shrink-0 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold text-white">{r.t}</div>
                    {r.k && (
                      <div className="flex items-center gap-0.5">
                        {r.k.map((key, ki) => (
                          <span key={key} className="flex items-center gap-0.5">
                            <kbd className="px-1.5 py-0 text-[9px] font-mono bg-[#2b579a]/20 border border-[#4a89dc]/30 rounded text-[#a8c5ec]">
                              {key}
                            </kbd>
                            {ki < r.k!.length - 1 && <span className="text-gray-600 text-[9px]">+</span>}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-400">{r.d}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="word-paper p-6 text-[11px]"
          style={{ fontFamily: "Times New Roman, serif" }}
        >
          <div className="text-sm font-bold mb-3 pb-2 border-b-2" style={{ color: "#2b579a", borderColor: "#2b579a" }}>
            Kaynakça
          </div>
          <div className="space-y-3 text-gray-800 leading-relaxed">
            <div>
              Çetlenbik, O. C. (2024).{" "}
              <span className="italic">
                Bilişim sistemlerinde sosyal mühendislik saldırıları
              </span>
              . Manisa Celal Bayar Üniversitesi.
            </div>
            <div>
              Laudon, K. C., &amp; Laudon, J. P. (2020).{" "}
              <span className="italic">
                Management Information Systems: Managing the Digital Firm
              </span>{" "}
              (16th ed.). Pearson Education.
            </div>
            <div>
              Turan, H. (2020).{" "}
              <span className="italic">Bilgi Teknolojileri ve Sistemleri</span>
              . Nobel Akademik Yayıncılık.
            </div>
            <div>
              Yavuz, M. (2018).{" "}
              <span className="italic">Bilgi Teknolojileri ve Uygulamaları</span>
              . Seçkin Yayıncılık.
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-200 text-[9px] text-gray-500 font-mono">
            ↑ Ödev için kaynakça · alfabetik · Word otomatik yazdı
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 21 — Mail Merge
  () => (
    <SlideShell>
      <Eyebrow>Postalar Sekmesi</Eyebrow>
      <H2 className="mb-4">
        Adres Mektup Birleştirme{" "}
        <span className="text-[#4a89dc]">(Mail Merge)</span>
      </H2>
      <Sub className="mb-10 !text-base">
        Tek şablon + 500 kişilik Excel = 500 kişiselleştirilmiş mektup. 1
        dakikada.
      </Sub>
      <div className="grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="word-card rounded-xl p-5"
        >
          <TableIcon className="w-6 h-6 text-[#00c4cc] mb-3" />
          <div className="text-sm font-semibold text-white mb-2">Veri Kaynağı</div>
          <div className="text-xs text-gray-400 mb-3">Excel / Access / Outlook kişiler</div>
          <div className="font-mono text-[10px] text-gray-300 bg-black/40 rounded p-2 leading-relaxed">
            <div className="text-[#00c4cc]">Ad | Soyad | Email</div>
            <div>Ayşe | Yılmaz | ay@...</div>
            <div>Mehmet | Kaya | me@...</div>
            <div>Fatma | Demir | fa@...</div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <ChevronRight className="w-6 h-6 text-[#4a89dc] mx-auto" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="word-card rounded-xl p-5"
        >
          <FileText className="w-6 h-6 text-[#4a89dc] mb-3" />
          <div className="text-sm font-semibold text-white mb-2">Word Şablonu</div>
          <div className="text-xs text-gray-400 mb-3">Alan yer tutucuları</div>
          <div className="font-mono text-[10px] text-gray-300 bg-black/40 rounded p-2 leading-relaxed">
            <div>Sayın</div>
            <div className="text-[#4a89dc]">«Ad» «Soyad»,</div>
            <div className="mt-1">Bursiyerlik...</div>
            <div>başvurunuz kabul edildi.</div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <ChevronRight className="w-6 h-6 text-[#4a89dc] mx-auto" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="word-card-blue rounded-xl p-5"
        >
          <Send className="w-6 h-6 text-[#4a89dc] mb-3" />
          <div className="text-sm font-semibold text-white mb-2">Çıktı</div>
          <div className="text-xs text-gray-400 mb-3">Yazdır / PDF / E-posta</div>
          <div className="font-mono text-[10px] text-gray-300 bg-black/40 rounded p-2 leading-relaxed">
            <div>Sayın</div>
            <div className="text-[#4a89dc]">Ayşe Yılmaz,</div>
            <div className="mt-1">Bursiyerlik...</div>
            <div className="text-[9px] text-gray-500 mt-1">+ 499 kişi</div>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-8 text-center text-xs text-gray-500"
      >
        <span className="text-[#4a89dc] font-mono">YOL:</span> Postalar →
        Adım Adım Posta Birleştirme Sihirbazı → veri seç → alanları yerleştir
        → birleştir
      </motion.div>
    </SlideShell>
  ),

  // 22 — Yazım ve Yorum
  () => (
    <SlideShell>
      <Eyebrow>Gözden Geçir</Eyebrow>
      <H2 className="mb-10">Yazım Denetimi & Yorumlar</H2>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="word-card rounded-xl p-6"
        >
          <SpellCheck className="w-8 h-8 text-[#4a89dc] mb-4" />
          <div className="text-lg font-semibold text-white mb-3">Yazım Denetimi</div>
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#4a89dc] shrink-0 mt-0.5" />
              <span>Kırmızı dalgalı çizgi: yazım hatası</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#4a89dc] shrink-0 mt-0.5" />
              <span>Mavi dalgalı çizgi: dil bilgisi</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#4a89dc] shrink-0 mt-0.5" />
              <span>Sağ tık → önerilen düzeltmeler</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#4a89dc] shrink-0 mt-0.5" />
              <span>Dil değiştir: TR / EN / DE / FR ...</span>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-2">
            <kbd className="px-2 py-0.5 text-[10px] font-mono bg-[#2b579a]/20 border border-[#4a89dc]/30 rounded text-[#a8c5ec]">F7</kbd>
            <span className="text-xs text-gray-500">Yazım ve Dil bilgisi panelini aç</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="word-card rounded-xl p-6"
        >
          <MessageSquare className="w-8 h-8 text-[#4a89dc] mb-4" />
          <div className="text-lg font-semibold text-white mb-3">Yorumlar</div>
          <div className="space-y-2 text-sm text-gray-400 mb-4">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#4a89dc] shrink-0 mt-0.5" />
              <span>Gözden Geçir → Yeni Yorum</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#4a89dc] shrink-0 mt-0.5" />
              <span>@kullanıcı etiketi (OneDrive)</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#4a89dc] shrink-0 mt-0.5" />
              <span>Yanıtla + çöz akışı</span>
            </div>
          </div>
          <div className="word-paper p-3 text-[10px] text-gray-700 relative" style={{ fontFamily: "Georgia, serif" }}>
            <div>
              Bu paragraf{" "}
              <span className="bg-yellow-200">kelime işlem programı</span>
              ...
            </div>
            <div className="mt-3 pl-3 border-l-2 border-[#2b579a] bg-blue-50 p-2 rounded-r">
              <div className="text-[8px] font-semibold text-[#2b579a]">
                Osman C.Ç.
              </div>
              <div className="text-[10px] text-gray-700">
                Kaynak göstermeliyiz mi burada?
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 23 — Track Changes
  () => (
    <SlideShell>
      <Eyebrow>Ortak Yazarlık</Eyebrow>
      <H2 className="mb-4">Değişiklikleri İzle (Track Changes)</H2>
      <Sub className="mb-10 !text-base">
        Kim ne değiştirdi — tek bakışta. Tezinizi hocanıza gönderirseniz
        büyük ihtimalle bu modda geri gelir.
      </Sub>
      <div className="grid md:grid-cols-[1fr_1.3fr] gap-8">
        <div className="space-y-3">
          {[
            { k: ["Ctrl", "Shift", "E"], d: "Değişiklikleri izlemeyi aç/kapat" },
            { k: ["Ctrl", "Z"], d: "Son değişikliği geri al" },
            { k: null, d: "Gözden Geçir → Kabul Et (tekli veya tümü)" },
            { k: null, d: "Gözden Geçir → Reddet" },
            { k: null, d: "Görünüm: İşaretlemeleri Göster / Son / Özgün" },
          ].map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="word-card rounded-lg p-3 flex items-center gap-3"
            >
              {r.k && (
                <div className="flex items-center gap-1">
                  {r.k.map((key, ki) => (
                    <span key={key} className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0 text-[9px] font-mono bg-[#2b579a]/20 border border-[#4a89dc]/30 rounded text-[#a8c5ec]">
                        {key}
                      </kbd>
                      {ki < r.k!.length - 1 && <span className="text-gray-600 text-[9px]">+</span>}
                    </span>
                  ))}
                </div>
              )}
              <div className="text-xs text-gray-300 flex-1">{r.d}</div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="word-paper p-5"
          style={{ fontFamily: "Georgia, serif" }}
        >
          <div className="text-[11px] text-gray-800 leading-relaxed">
            <span>
              Sosyal mühendislik saldırıları, teknik zafiyet yerine{" "}
            </span>
            <span className="line-through" style={{ color: "#dc2626" }}>
              kullanıcıyı
            </span>{" "}
            <span className="underline" style={{ color: "#2563eb" }}>
              insan davranışını
            </span>{" "}
            <span>
              hedef alan bir dolandırıcılık türüdür. Bu saldırılar genellikle{" "}
            </span>
            <span className="underline" style={{ color: "#2563eb" }}>
              korku, aciliyet veya otorite
            </span>{" "}
            <span>duygusu yaratılarak gerçekleştirilir.</span>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-200 grid grid-cols-2 gap-3 text-[10px]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-red-500" />
              <span className="text-gray-600">Silinen metin</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-blue-500" />
              <span className="text-gray-600">Eklenen metin</span>
            </div>
          </div>
          <div className="mt-2 text-[9px] text-gray-500 text-right font-mono">
            Yazar: Osman Can Ç. · 21.04.2026 14:32
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // NEW — Makrolar & VBA
  () => (
    <SlideShell>
      <Eyebrow>Otomasyon</Eyebrow>
      <H2 className="mb-4">Makrolar — Word&apos;ün Programlama Dili</H2>
      <Sub className="mb-8 !text-base">
        Word&apos;ün arkasında{" "}
        <span className="text-[#4a89dc] font-mono">VBA</span> (Visual Basic for
        Applications) var. Tekrar eden her işi otomatize et.
      </Sub>
      <div className="grid md:grid-cols-[1.2fr_1fr] gap-6">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Code2 className="w-4 h-4 text-[#4a89dc]" />
            <div className="text-xs font-mono text-gray-500">Module1.bas</div>
            <div className="ml-auto flex gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            </div>
          </div>
          <pre className="word-card rounded-lg p-5 text-[11px] leading-relaxed font-mono text-gray-300 overflow-x-auto">
{`Sub TumBasliklaraNumaraEkle()
  Dim p As Paragraph
  Dim sayac As Integer
  sayac = 0

  For Each p In ActiveDocument.Paragraphs
    If p.Style = "Heading 1" Then
      sayac = sayac + 1
      p.Range.InsertBefore sayac & ". "
    End If
  Next p

  MsgBox sayac & " başlık numaralandı.", _
         vbInformation, "Bitti!"
End Sub`}
          </pre>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          {[
            { icon: Keyboard, t: "VBA Editörü", d: "Alt+F11 ile editör aç" },
            {
              icon: Edit3,
              t: "Makro Kaydet",
              d: "Geliştirici → Makro Kaydet — klavye+fare hareketlerini koda dönüştürür",
            },
            {
              icon: Zap,
              t: "Kısayol Ata",
              d: "Dosya → Seçenekler → Şerit → Geliştirici sekmesini aç",
            },
            {
              icon: AlertTriangle,
              t: "Güvenlik",
              d: "Dış kaynaktan gelen .docm/.dotm dosyalarını açma — makro virüsleri",
            },
            {
              icon: FileType2,
              t: ".docm / .dotm",
              d: "Makrolu belge uzantıları (.docx'te makro çalışmaz)",
            },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.t}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.07 }}
                className="word-card rounded-lg p-3 flex gap-3"
              >
                <Icon className="w-4 h-4 text-[#4a89dc] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-white">{f.t}</div>
                  <div className="text-[11px] text-gray-400">{f.d}</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </SlideShell>
  ),

  // NEW — AI Copilot
  () => (
    <SlideShell>
      <Eyebrow>Yapay Zekâ</Eyebrow>
      <H2 className="mb-4">Copilot — Word&apos;ün içinde AI ortağı</H2>
      <Sub className="mb-8 !text-base">
        Microsoft 365 Copilot · GPT-4 ve kuzenleri Word&apos;ün içinde. Yazmadan
        özetlemeye, çeviriye kadar.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-xs uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#4a89dc]" />
            Prompt örnekleri
          </div>
          <div className="space-y-2">
            {[
              "Bu paragrafı akademik tona çevir",
              "3 madde halinde özetle",
              "Bu metni İngilizceye çevir",
              "Kaynakçayı APA 7'ye dönüştür",
              "Toplantı notlarından aksiyon listesi çıkar",
              "Bu tablo için 3 cümlelik özet yaz",
            ].map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.06 }}
                className="word-card rounded px-4 py-2.5 flex items-center gap-3"
              >
                <span className="text-[#4a89dc] font-mono text-[10px]">
                  &gt;
                </span>
                <span className="text-xs text-gray-300 italic">{p}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <div className="word-card-blue rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-[#4a89dc]" />
              <div className="text-sm font-semibold text-white">
                Nerede bulursun?
              </div>
            </div>
            <div className="space-y-2 text-[11px] text-gray-400">
              <div>· Giriş sekmesinde &ldquo;Copilot&rdquo; butonu</div>
              <div>· Sağ panelden konuşma arayüzü</div>
              <div>· Seçili metin üstünde &ldquo;Rewrite&rdquo;</div>
              <div>· Boş belgede &ldquo;Draft with Copilot&rdquo;</div>
            </div>
          </div>
          <div className="word-card-blue rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-4 h-4 text-[#4a89dc]" />
              <div className="text-sm font-semibold text-white">
                Fiyatlandırma
              </div>
            </div>
            <div className="space-y-2 text-[11px] text-gray-400">
              <div className="flex justify-between">
                <span>Microsoft 365 Copilot Pro</span>
                <span className="font-mono text-[#4a89dc]">$20/ay</span>
              </div>
              <div className="flex justify-between">
                <span>Copilot Enterprise</span>
                <span className="font-mono text-[#4a89dc]">$30/ay</span>
              </div>
              <div className="flex justify-between">
                <span>Free (sınırlı)</span>
                <span className="font-mono text-gray-500">Outlook, Teams</span>
              </div>
            </div>
          </div>
          <div className="text-[10px] text-gray-600 text-center mt-2">
            GPT-4 + Microsoft Graph (e-posta, takvim, belge) verilerine erişir —
            gizlilik için kurumsal hesap kullan.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3. ALTERNATİFLER  ───────────────── */

  // 24 — Section: Alternatives
  () => (
    <SectionDivider
      num="3"
      total="4"
      title="Alternatifler"
      subtitle="Google Docs · LibreOffice Writer · WPS · Apple Pages — ücretsiz dünyası"
      bgGradient="linear-gradient(135deg, #18a303, #0e6802)"
      shadow="0 20px 60px -10px rgba(24, 163, 3, 0.5)"
      icon={<FileType2 className="w-16 h-16 text-white" />}
    />
  ),

  // 25 — Google Docs
  () => (
    <SlideShell>
      <Eyebrow>Bulut Öncüsü</Eyebrow>
      <H2 className="mb-4">Google Docs</H2>
      <Sub className="mb-10 !text-base">
        2006&apos;da piyasaya çıktı, &ldquo;real-time collab&rdquo; kavramını
        kitlelerle tanıştırdı. 3 milyar Workspace kullanıcısı.
      </Sub>
      <div className="grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Cloud, t: "100% Web", d: "Kurulum yok — docs.google.com" },
            { icon: Users, t: "Gerçek Zamanlı", d: "20+ kişi aynı anda yazar" },
            { icon: History, t: "Otomatik Kayıt", d: "Her saniye bulutta — versiyon geçmişi sınırsız" },
            { icon: Sparkles, t: "Gemini AI", d: "Yazma, özetleme, çeviri, rephrase" },
            { icon: Download, t: "Esnek Dışa Aktarım", d: ".docx · .pdf · .odt · .rtf · .txt · .epub" },
            { icon: Brain, t: "Offline Mode", d: "İnternet yokken bile yaz, sonra senkronize" },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.t}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.07 }}
                className="word-card rounded-lg p-3"
                style={{ borderColor: "rgba(66,133,244,0.25)" }}
              >
                <Icon className="w-4 h-4 mb-2" style={{ color: "#4285f4" }} />
                <div className="text-sm font-semibold text-white">{f.t}</div>
                <div className="text-[11px] text-gray-400 mt-0.5">{f.d}</div>
              </motion.div>
            );
          })}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="word-paper p-6 relative"
        >
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
            <div className="w-8 h-8 rounded flex items-center justify-center text-white font-bold" style={{ background: "#4285f4" }}>
              G
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-900">Belge adı</div>
              <div className="text-[9px] text-gray-500 font-mono">Google Docs · Kaydedildi</div>
            </div>
            <div className="ml-auto flex -space-x-2">
              <div className="w-6 h-6 rounded-full border-2 border-white" style={{ background: "#4285f4" }} />
              <div className="w-6 h-6 rounded-full border-2 border-white" style={{ background: "#34a853" }} />
              <div className="w-6 h-6 rounded-full border-2 border-white" style={{ background: "#fbbc04" }} />
            </div>
          </div>
          <div className="space-y-1.5 text-[10px] text-gray-800 font-serif">
            <div className="h-2 bg-gray-300 rounded-sm" />
            <div className="h-2 bg-gray-300 rounded-sm w-[92%]" />
            <div className="h-2 bg-gray-300 rounded-sm w-[88%]" />
            <div className="relative mt-3">
              <div className="h-2 bg-blue-200 rounded-sm w-[70%]" />
              <div className="absolute -top-1 left-[70%] text-[8px] text-[#4285f4] font-bold">
                ▲ Ayşe
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 26 — LibreOffice Writer
  () => (
    <SlideShell>
      <Eyebrow>Açık Kaynak Savunucusu</Eyebrow>
      <H2 className="mb-4">LibreOffice Writer</H2>
      <Sub className="mb-10 !text-base">
        2010&apos;da OpenOffice&apos;ten &ldquo;fork&rdquo; edildi. %100 ücretsiz,
        tamamen açık kaynak. Ubuntu/Fedora&apos;da ön yüklü gelir.
      </Sub>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { icon: DollarSign, t: "Tamamen Ücretsiz", d: "Bireysel, eğitim, ticari — hiçbir lisans ücreti yok" },
          { icon: Globe, t: "Çapraz Platform", d: "Windows · macOS · Linux · BSD · Android · iOS" },
          { icon: FileText, t: ".docx Uyumlu", d: "Word dosyalarını açar, kaydeder. Native: .odt" },
          { icon: Shapes, t: "Zengin Özellik", d: "Stiller, denklemler, dipnot, mail merge — Word neredeyse her şey" },
          { icon: Lightbulb, t: "ODF Standardı", d: "ISO onaylı açık belge formatı — kilitlenme yok" },
          { icon: Users, t: "Topluluk", d: "Document Foundation vakfı + gönüllü geliştiriciler" },
        ].map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={f.t}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="word-card rounded-xl p-5"
              style={{ borderColor: "rgba(24,163,3,0.25)" }}
            >
              <Icon className="w-6 h-6 mb-3" style={{ color: "#18a303" }} />
              <div className="text-sm font-semibold text-white mb-1">{f.t}</div>
              <div className="text-xs text-gray-400">{f.d}</div>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-8 text-center"
      >
        <a className="text-xs font-mono text-[#18a303]">libreoffice.org</a>
        <span className="mx-3 text-gray-600">·</span>
        <span className="text-xs text-gray-500">
          &gt;200 milyon kullanıcı (2024)
        </span>
      </motion.div>
    </SlideShell>
  ),

  // 27 — WPS + Pages
  () => (
    <SlideShell>
      <Eyebrow>Diğer Alternatifler</Eyebrow>
      <H2 className="mb-10">WPS Office · Apple Pages · OnlyOffice</H2>
      <div className="grid md:grid-cols-3 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="word-card rounded-2xl p-6"
          style={{ borderColor: "rgba(232,30,36,0.3)" }}
        >
          <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-2xl font-bold" style={{ background: "rgba(232,30,36,0.15)", color: "#e81e24" }}>
            W
          </div>
          <div className="text-lg font-semibold text-white mb-2">WPS Office</div>
          <div className="text-xs text-gray-400 mb-4">
            Çinli Kingsoft şirketinin tamamen ücretsiz ofis paketi. Word&apos;e
            çok yakın arayüz.
          </div>
          <ul className="space-y-1.5 text-[11px] text-gray-300">
            <li className="flex items-center gap-2"><Check className="w-3 h-3" style={{ color: "#e81e24" }} />Ücretsiz</li>
            <li className="flex items-center gap-2"><Check className="w-3 h-3" style={{ color: "#e81e24" }} />PDF editör dahil</li>
            <li className="flex items-center gap-2"><Check className="w-3 h-3" style={{ color: "#e81e24" }} />Cloud senkron</li>
            <li className="flex items-center gap-2"><Check className="w-3 h-3" style={{ color: "#e81e24" }} />Reklamlı (free plan)</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="word-card rounded-2xl p-6"
          style={{ borderColor: "rgba(156,163,175,0.3)" }}
        >
          <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: "rgba(255,149,0,0.15)", color: "#ff9500" }}>
            <FileText className="w-6 h-6" />
          </div>
          <div className="text-lg font-semibold text-white mb-2">Apple Pages</div>
          <div className="text-xs text-gray-400 mb-4">
            Apple&apos;ın şık kelime işlem aracı. macOS/iOS&apos;ta ön yüklü,
            tamamen ücretsiz.
          </div>
          <ul className="space-y-1.5 text-[11px] text-gray-300">
            <li className="flex items-center gap-2"><Check className="w-3 h-3 text-[#ff9500]" />Tasarım odaklı şablon</li>
            <li className="flex items-center gap-2"><Check className="w-3 h-3 text-[#ff9500]" />iCloud senkron</li>
            <li className="flex items-center gap-2"><Check className="w-3 h-3 text-[#ff9500]" />.docx açar/kaydeder</li>
            <li className="flex items-center gap-2"><X className="w-3 h-3 text-gray-500" />Sadece Apple ekosistemi</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="word-card rounded-2xl p-6"
          style={{ borderColor: "rgba(255,105,0,0.3)" }}
        >
          <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: "rgba(255,105,0,0.15)", color: "#ff6900" }}>
            <Cloud className="w-6 h-6" />
          </div>
          <div className="text-lg font-semibold text-white mb-2">OnlyOffice</div>
          <div className="text-xs text-gray-400 mb-4">
            Sunucuna kurup kendi Google Docs&apos;unu çalıştırabilirsin. Açık
            kaynak + kurumsal.
          </div>
          <ul className="space-y-1.5 text-[11px] text-gray-300">
            <li className="flex items-center gap-2"><Check className="w-3 h-3 text-[#ff6900]" />Self-hosted seçenek</li>
            <li className="flex items-center gap-2"><Check className="w-3 h-3 text-[#ff6900]" />.docx native</li>
            <li className="flex items-center gap-2"><Check className="w-3 h-3 text-[#ff6900]" />Gerçek zamanlı collab</li>
            <li className="flex items-center gap-2"><Check className="w-3 h-3 text-[#ff6900]" />Nextcloud entegrasyonu</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 28 — Comparison table
  () => (
    <SlideShell>
      <Eyebrow>Kararı sen ver</Eyebrow>
      <H2 className="mb-10">Tam Karşılaştırma</H2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="word-card rounded-xl overflow-hidden"
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left px-4 py-3 text-xs text-gray-500 font-mono uppercase tracking-wider">Özellik</th>
              <th className="text-center px-4 py-3 text-xs font-semibold" style={{ color: "#4a89dc" }}>MS Word</th>
              <th className="text-center px-4 py-3 text-xs font-semibold" style={{ color: "#4285f4" }}>Google Docs</th>
              <th className="text-center px-4 py-3 text-xs font-semibold" style={{ color: "#18a303" }}>LibreOffice</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-[#e81e24]">WPS Office</th>
            </tr>
          </thead>
          <tbody className="text-xs text-gray-300">
            {[
              ["Fiyat", "Microsoft 365 · $7/ay", "Ücretsiz", "Ücretsiz", "Ücretsiz (reklamlı)"],
              ["Kurulum", "Masaüstü + Web", "Web", "Masaüstü", "Masaüstü + Web"],
              ["Çevrimdışı", "✓", "Sınırlı", "✓", "✓"],
              ["Gerçek Zamanlı İşbirliği", "OneDrive", "✓ (güçlü)", "Sınırlı", "✓"],
              ["Yapay Zekâ", "Copilot ($30/ay)", "Gemini (dahil)", "–", "WPS AI"],
              ["Native Format", ".docx", "Google Docs", ".odt", ".wps / .docx"],
              ["Platform", "Win · Mac · Web", "Web + App", "Win · Mac · Linux", "Win · Mac · Linux"],
            ].map((row, i) => (
              <motion.tr
                key={row[0]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.02]"
              >
                <td className="px-4 py-3 font-medium text-white">{row[0]}</td>
                <td className="px-4 py-3 text-center">{row[1]}</td>
                <td className="px-4 py-3 text-center">{row[2]}</td>
                <td className="px-4 py-3 text-center">{row[3]}</td>
                <td className="px-4 py-3 text-center">{row[4]}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-8 grid md:grid-cols-4 gap-3 text-[11px] text-gray-400"
      >
        <div className="word-card rounded p-3 text-center">
          <div className="font-semibold text-[#4a89dc]">Word →</div>
          <div>Tez · resmi belge · DOCX</div>
        </div>
        <div className="word-card rounded p-3 text-center">
          <div className="font-semibold text-[#4285f4]">Google Docs →</div>
          <div>Ekip projeleri · hızlı notlar</div>
        </div>
        <div className="word-card rounded p-3 text-center">
          <div className="font-semibold text-[#18a303]">LibreOffice →</div>
          <div>Ücretsiz güçlü masaüstü</div>
        </div>
        <div className="word-card rounded p-3 text-center">
          <div className="font-semibold text-[#e81e24]">WPS →</div>
          <div>Düşük bütçe · Word görünümü</div>
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  4. PRATİK  ───────────────── */

  // 29 — Section: Pratik
  () => (
    <SectionDivider
      num="4"
      total="4"
      title="Pratik İpuçları"
      subtitle="Kısayollar, akademik yazı, dosya formatları ve yapılması gerekenler"
      bgGradient="linear-gradient(135deg, #00ff41, #0e6802)"
      shadow="0 20px 60px -10px rgba(0, 255, 65, 0.5)"
      icon={<Keyboard className="w-16 h-16 text-black" />}
    />
  ),

  // 30 — Kısayollar
  () => (
    <SlideShell>
      <Eyebrow>Klavye Kısayolları</Eyebrow>
      <H2 className="mb-10">Word için olmazsa olmaz 12 kısayol</H2>
      <div className="grid md:grid-cols-2 gap-3">
        {[
          { keys: ["Ctrl", "N"], desc: "Yeni belge" },
          { keys: ["Ctrl", "O"], desc: "Belge aç" },
          { keys: ["Ctrl", "S"], desc: "Kaydet" },
          { keys: ["F12"], desc: "Farklı Kaydet" },
          { keys: ["Ctrl", "P"], desc: "Yazdır" },
          { keys: ["Ctrl", "Z"], desc: "Geri al" },
          { keys: ["Ctrl", "Y"], desc: "Yinele" },
          { keys: ["Ctrl", "F"], desc: "Bul" },
          { keys: ["Ctrl", "H"], desc: "Bul ve Değiştir" },
          { keys: ["Ctrl", "B"], desc: "Kalın" },
          { keys: ["Ctrl", "I"], desc: "İtalik" },
          { keys: ["Ctrl", "U"], desc: "Altı çizili" },
          { keys: ["Ctrl", "L"], desc: "Sola hizala" },
          { keys: ["Ctrl", "E"], desc: "Ortaya hizala" },
          { keys: ["Ctrl", "J"], desc: "İki yana yasla" },
          { keys: ["Ctrl", "Enter"], desc: "Sayfa sonu" },
          { keys: ["Ctrl", "Shift", "C"], desc: "Biçim kopyala" },
          { keys: ["F7"], desc: "Yazım denetimi" },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 + i * 0.03 }}
            className="word-card rounded-lg px-5 py-2.5 flex items-center justify-between"
            style={{ borderColor: "rgba(74,137,220,0.2)" }}
          >
            <div className="text-sm text-gray-300">{s.desc}</div>
            <div className="flex items-center gap-1">
              {s.keys.map((k, ki) => (
                <span key={k + ki} className="flex items-center gap-1">
                  <kbd className="px-2 py-0.5 text-[10px] font-mono bg-[#2b579a]/15 border border-[#4a89dc]/30 rounded text-[#a8c5ec] min-w-7 text-center">
                    {k}
                  </kbd>
                  {ki < s.keys.length - 1 && <span className="text-gray-600 text-[10px]">+</span>}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  // 31 — Staj Raporu & CV ayarları (MYO pratik)
  () => (
    <SlideShell>
      <Eyebrow>Pratik Ayarlar</Eyebrow>
      <H2 className="mb-4">Staj Raporu · Ödev · CV için Word ayarları</H2>
      <Sub className="mb-8 !text-base">
        Hocaların ve iş dünyasının beklediği temel format — bir kere ayarla,
        hep kullan.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="word-card-blue rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-wider text-[#4a89dc] mb-4">
            Sayfa ayarları (staj raporu)
          </div>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-400">Kağıt boyutu</span>
              <span className="font-mono text-[#a8c5ec]">A4 · 21×29.7 cm</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-400">Kenar boşluğu</span>
              <span className="font-mono text-[#a8c5ec]">2.5 cm (her yön)</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-400">Yazı tipi</span>
              <span className="font-mono text-[#a8c5ec]">Calibri / Arial · 11pt</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-400">Satır aralığı</span>
              <span className="font-mono text-[#a8c5ec]">1.15 veya 1.5</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-400">Hizalama</span>
              <span className="font-mono text-[#a8c5ec]">İki yana yasla</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Kapak sayfası</span>
              <span className="font-mono text-[#a8c5ec]">Ad · No · Okul · Tarih</span>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="space-y-3"
        >
          {[
            { icon: Heading1, t: "Başlık stillerini kullan", d: "Başlık 1, 2, 3 → içindekiler tablosu otomatik oluşsun" },
            { icon: TableIcon, t: "Tablo ve şekilleri numaralı", d: "Başlık Ekle → \"Tablo 1\", \"Şekil 1\"" },
            { icon: Bookmark, t: "Sayfa numarası", d: "Sağ alt köşe · kapakta gösterme" },
            { icon: BookMarked, t: "Üstbilgi: ad + okul no", d: "Her sayfanın üstünde: \"Ahmet Yılmaz · 2021541023\"" },
            { icon: FileCheck2, t: "Son gönderim PDF", d: "Hoca farklı Word sürümüyle açarsa format bozulur" },
            { icon: FileText, t: "Dosya adı", d: "\"AdSoyad_OkulNo_Rapor.pdf\" formatı" },
          ].map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={t.t}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.07 }}
                className="word-card rounded-lg p-3 flex items-start gap-3"
              >
                <Icon className="w-4 h-4 text-[#4a89dc] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-white">{t.t}</div>
                  <div className="text-xs text-gray-400">{t.d}</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 32 — Dosya formatları
  () => (
    <SlideShell>
      <Eyebrow>Dışa Aktar</Eyebrow>
      <H2 className="mb-10">Hangi format ne için?</H2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { ext: ".docx", desc: "Düzenlenebilir orijinal (Word 2007+)", color: "#4a89dc" },
          { ext: ".pdf", desc: "Paylaşım — format asla bozulmaz", color: "#ef4444" },
          { ext: ".doc", desc: "Eski Word formatı (1997–2003)", color: "#9ca3af" },
          { ext: ".odt", desc: "OpenDocument — LibreOffice native", color: "#18a303" },
          { ext: ".rtf", desc: "Rich Text — her araç açabilir", color: "#a855f7" },
          { ext: ".txt", desc: "Düz metin — sadece harfler", color: "#6b7280" },
          { ext: ".dotx", desc: "Şablon — hazır stil paketi", color: "#00c4cc" },
          { ext: ".pdf/A", desc: "Arşiv PDF — uzun ömürlü", color: "#eab308" },
        ].map((f, i) => (
          <motion.div
            key={f.ext}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            className="word-card rounded-2xl p-5 text-center"
            style={{ borderColor: `${f.color}40` }}
          >
            <FileText className="w-9 h-9 mx-auto mb-3" style={{ color: f.color }} />
            <div className="text-xl font-mono font-bold mb-2" style={{ color: f.color }}>
              {f.ext}
            </div>
            <div className="text-[11px] text-gray-400 leading-tight">{f.desc}</div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 word-card-blue rounded-xl p-5 text-center"
      >
        <div className="text-sm text-gray-300">
          <span className="text-[#4a89dc] font-mono">PRO TIP:</span> Word
          dosyan karşı tarafa açıldığında hizalama, font ve tablolar
          kayabilir. Final göndermeden önce{" "}
          <span className="font-mono text-[#4a89dc]">Dosya → Dışa Aktar → PDF</span>.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 33 — Yaygın hatalar
  () => (
    <SlideShell>
      <Eyebrow>Yapma!</Eyebrow>
      <H2 className="mb-10">Başlangıçta herkesin yaptığı hatalar</H2>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          {
            t: "Hizalama için Space tuşu",
            d: "Metni hizalamak için boşluklar kullanma — sekme (Tab), hizalama veya tablo kullan",
          },
          {
            t: "Paragraf aralığı için Enter",
            d: "Boş satırlar değil — Paragraf Önce/Sonra ayarı kullan",
          },
          {
            t: "Başlıkları manuel biçimlendirme",
            d: "Sadece &ldquo;14pt bold&rdquo; yapma — Başlık 1/2/3 stilini uygula (otomatik içindekiler için)",
          },
          {
            t: "Sayfa sonu için 20 kez Enter",
            d: "Kesinlikle hayır — Ctrl+Enter ile sayfa sonu ekle",
          },
          {
            t: "Dosyayı .docx olarak paylaşmak",
            d: "Karşı tarafın Word versiyonu farklıysa hizalama kayar — .pdf gönder",
          },
          {
            t: "Kaynakçayı elle yazmak",
            d: "Başvurular menüsü ile yönetsen: Stil değiştir → tüm kaynakça tek tıkla güncellenir",
          },
          {
            t: "Kaydetmemek",
            d: "Ctrl+S artık bir refleks olmalı — veya OneDrive otomatik kaydı aç",
          },
          {
            t: "Farklı font karışımı",
            d: "En fazla 2 font kullan — biri başlık, diğeri gövde için",
          },
        ].map((m, i) => (
          <motion.div
            key={m.t}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="word-card rounded-lg p-4 flex gap-3"
            style={{ borderColor: "rgba(239,68,68,0.2)" }}
          >
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-white">{m.t}</div>
              <div className="text-xs text-gray-400 mt-0.5">{m.d}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  // 34 — Homework: CV + Dilekçe (MYO odaklı)
  () => (
    <SlideShell>
      <Eyebrow>Bu Hafta</Eyebrow>
      <H2 className="mb-4">Yapılacaklar — CV + Staj Dilekçesi</H2>
      <Sub className="mb-8 !text-base">
        İki gerçek iş belgesi üret. Mezun olurken bu ikisine ihtiyacın
        olacak — şimdi öğren.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="word-card rounded-xl p-5"
          style={{ borderColor: "rgba(74,137,220,0.35)" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white"
              style={{ background: "#2b579a" }}
            >
              1
            </div>
            <div>
              <div className="text-base font-semibold text-white">
                Görev 1 — Özgeçmiş (CV)
              </div>
              <div className="text-[10px] text-gray-500 font-mono">
                AdSoyad_CV.pdf · tek sayfa
              </div>
            </div>
          </div>
          <ul className="space-y-2 text-xs text-gray-300">
            {[
              "Üstte: Ad Soyad + iletişim (e-posta, tel, LinkedIn)",
              "Eğitim — Başlık 1 (MYO + Lise)",
              "Beceriler — MS Office · Python · İngilizce seviyesi",
              "Staj / deneyim — Başlık 1 · tarih sıralı",
              "Projeler — Başlık 1 · GitHub linki varsa",
              "Max 2 font · Calibri/Arial · tek sayfa",
              "PDF kaydet — \"AdSoyad_CV.pdf\"",
            ].map((step, i) => (
              <motion.li
                key={step}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="flex items-start gap-2"
              >
                <Check className="w-3 h-3 text-[#4a89dc] shrink-0 mt-0.5" />
                <span>{step}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="word-card rounded-xl p-5"
          style={{ borderColor: "rgba(74,137,220,0.35)" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white"
              style={{ background: "#2b579a" }}
            >
              2
            </div>
            <div>
              <div className="text-base font-semibold text-white">
                Görev 2 — Staj Dilekçesi
              </div>
              <div className="text-[10px] text-gray-500 font-mono">
                AdSoyad_Staj_Dilekce.pdf
              </div>
            </div>
          </div>
          <ul className="space-y-2 text-xs text-gray-300">
            {[
              "Sağ üstte: Ad Soyad + okul no + tarih",
              "Alıcı: \"Sayın [Şirket Adı] İK Yöneticisi\"",
              "Giriş: kendini tanıt (okul, program, sınıf)",
              "Asıl: neden bu şirket + ne öğrenmek istiyorsun",
              "Kapanış: \"Saygılarımla,\" + isim",
              "Ek notu: CV + transkript iliştirilecek",
              "PDF kaydet — \"AdSoyad_Staj_Dilekce.pdf\"",
            ].map((step, i) => (
              <motion.li
                key={step}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 + i * 0.05 }}
                className="flex items-start gap-2"
              >
                <Check className="w-3 h-3 text-[#4a89dc] shrink-0 mt-0.5" />
                <span>{step}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="mt-6 text-center text-[11px] text-gray-500"
      >
        Teslim: bir sonraki ders · her iki dosyayı da e-posta ekle gönder ·
        dosya adı kuralına uyulmazsa <span className="text-red-400">-10</span>
      </motion.div>
    </SlideShell>
  ),

  // 35 — Thanks
  () => (
    <SlideShell bgPattern={false}>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-20 h-20 rounded-full items-center justify-center mb-8"
          style={{
            background: "rgba(0,255,65,0.1)",
            border: "2px solid rgba(0,255,65,0.4)",
          }}
        >
          <Sparkles className="w-10 h-10 text-[#00ff41]" />
        </motion.div>
        <H1 className="word-shimmer">Teşekkürler</H1>
        <Sub className="mt-8 max-w-xl mx-auto">
          Sorularınız için sınıf saatinde — Çarşamba 09:55–12:30
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 inline-flex items-center gap-3 px-6 py-3 rounded-full word-card"
        >
          <FileText className="w-4 h-4 text-[#00ff41]" />
          <span className="text-sm text-gray-300">
            BVA 1108 · Bilgi Teknolojileri · 10. Hafta — Kelime İşlem Programı
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-10 text-[10px] text-gray-600 font-mono"
        >
          Kaynaklar: Microsoft (2025) · Google Workspace (2025) · The Document
          Foundation · William Zinsser — On Writing Well
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
            background: "linear-gradient(90deg, #00ff41, #4dff80, #00ff41)",
            boxShadow: "0 0 16px rgba(0,255,65,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#00ff41]/70">
          BVA 1108 · 10. Hafta · Kelime İşlem Programı
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[#00ff41]/50">
            <span className="text-[#00ff41]">
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
            className="p-1.5 text-gray-500 hover:text-[#00ff41] transition-colors"
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
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#00ff41] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
                  ? "w-5 bg-[#00ff41]"
                  : "w-1.5 bg-white/15 hover:bg-white/40"
              }`}
              style={
                i === current
                  ? { boxShadow: "0 0 10px rgba(0,255,65,0.6)" }
                  : undefined
              }
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#00ff41] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
