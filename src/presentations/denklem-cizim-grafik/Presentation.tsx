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
  Square,
  Circle,
  Triangle,
  ArrowRight,
  ArrowDownRight,
  GitBranch,
  Layers,
  BarChart3,
  LineChart,
  PieChart,
  AreaChart,
  ScatterChart,
  Radar,
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Brain,
  Globe,
  Briefcase,
  GraduationCap,
  History,
  Award,
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
  Edit3,
  Palette,
  Share2,
  Download,
  AlertTriangle,
  Zap,
  Shapes,
  PenTool,
  Brush,
  MousePointer2,
  Group,
  AlignCenter,
  Move,
  RotateCw,
  CheckCircle2,
  XCircle,
  Calculator,
  Atom,
  Bookmark,
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
        <div className="absolute inset-0 dcg-grid-bg pointer-events-none" />
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
      className="dcg-card dcg-card-hover rounded-xl p-6 transition-all"
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
      className="dcg-card rounded-xl p-5"
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
      className="dcg-window-chrome w-full"
    >
      <div className="dcg-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-semibold flex-1 max-w-md mx-auto text-center justify-center"
          style={{ background: "#0d0d0d", color: "#c4b5fd" }}
        >
          <span className="w-5 h-5 rounded-sm dcg-w-tile flex items-center justify-center text-[11px]">W</span>
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
          className="inline-flex w-32 h-32 rounded-3xl items-center justify-center mb-8 dcg-pulse"
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
        <Eyebrow>11. Hafta · BVA 1108 — Bilgi Teknolojileri</Eyebrow>
        <H1 className="dcg-shimmer-violet">
          Denklem · Çizim
          <br />
          · Grafik
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Word&apos;ün üç görsel süper gücü — staj raporu ve ödevlerinizi
          profesyonel görünümlü yapan araçlar
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 flex items-center justify-center gap-6 flex-wrap"
        >
          <div className="dcg-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(59,130,246,0.15)" }}
            >
              <Sigma className="w-5 h-5" style={{ color: "#3b82f6" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Denklem</div>
              <div className="text-[10px] text-gray-500">Equation Editor</div>
            </div>
          </div>
          <div className="dcg-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(234,88,12,0.15)" }}
            >
              <Shapes className="w-5 h-5" style={{ color: "#ea580c" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Çizim</div>
              <div className="text-[10px] text-gray-500">Shapes &amp; SmartArt</div>
            </div>
          </div>
          <div className="dcg-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(22,163,74,0.15)" }}
            >
              <BarChart3 className="w-5 h-5" style={{ color: "#16a34a" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Grafik</div>
              <div className="text-[10px] text-gray-500">Charts</div>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 2 — Why these 3 tools
  () => (
    <SlideShell>
      <Eyebrow>Üç Süper Güç</Eyebrow>
      <H2 className="mb-10">Neden bu üç araç?</H2>
      <div className="grid md:grid-cols-3 gap-5">
        <FeatureCard
          icon={Sigma}
          title="Denklem"
          desc="Matematik, fizik, mühendislik formüllerini profesyonel görünümlü yaz. LaTeX gibi ama Word içinde."
          accent="#3b82f6"
          delay={0.15}
        />
        <FeatureCard
          icon={Shapes}
          title="Çizim"
          desc="Akış şeması, organizasyon şeması, kavram haritası — fikrini görselleştir, yazıdan çıkar."
          accent="#ea580c"
          delay={0.3}
        />
        <FeatureCard
          icon={BarChart3}
          title="Grafik"
          desc="Sayıları görsel hikayeye çevir. Sütun, çizgi, pasta — Excel verisi anında grafiğe."
          accent="#16a34a"
          delay={0.45}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-10 dcg-card-violet rounded-xl p-5 text-center"
      >
        <div className="text-sm text-gray-300">
          Staj raporunda bir <span className="text-[#3b82f6] font-semibold">denklem</span>,{" "}
          bir <span className="text-[#ea580c] font-semibold">akış şeması</span> ve{" "}
          bir <span className="text-[#16a34a] font-semibold">grafik</span> →
          notunuzu yükselten görseller.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 3 — Big numbers / why visuals matter
  () => (
    <SlideShell>
      <Eyebrow>Görsel = Anlam</Eyebrow>
      <H2 className="mb-12">Beyninizin görselle ilişkisi</H2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={Brain}
          value="60.000×"
          label="Beyin görseli, metinden bu kadar hızlı işler"
          source="MIT, 2014"
          accent="#a78bfa"
        />
        <StatCard
          icon={Target}
          value="65%"
          label="İnsanlar görsel öğrenicidir"
          source="Visual Teaching Alliance"
          delay={0.1}
          accent="#a78bfa"
        />
        <StatCard
          icon={TrendingUp}
          value="+43%"
          label="Görsel raporlar daha ikna edici"
          source="Wharton Business"
          delay={0.2}
          accent="#a78bfa"
        />
        <StatCard
          icon={Lightbulb}
          value="80%"
          label="Görseli içeren bilgi 3 gün sonra hatırlanır"
          source="3M Visual Studies"
          delay={0.3}
          accent="#a78bfa"
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 dcg-card rounded-xl p-5 text-center"
      >
        <div className="text-sm text-gray-300">
          Bir resim bin kelime eder &mdash;{" "}
          <span className="text-[#a78bfa]">bir grafik on bin tablo eder</span>.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 4 — Tufte quote
  () => (
    <QuoteSlide
      quote="Her şeyden önce veriyi göster. Mürekkebin çoğu veriye ayrılmalı, dekorasyona değil."
      author="Edward Tufte"
      role="Veri görselleştirme öncüsü · Yale Üniversitesi"
    />
  ),

  /* ─────────────────  1. DENKLEM EDİTÖRÜ  ───────────────── */

  // 5 — Section: Denklem
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Denklem Editörü"
      subtitle="Word'de matematik var — LaTeX bilmenize gerek yok"
      bgGradient="linear-gradient(135deg, #3b82f6, #1e40af)"
      shadow="0 20px 60px -10px rgba(59, 130, 246, 0.6)"
      icon={<Sigma className="w-16 h-16 text-white" />}
    />
  ),

  // 6 — Word'de matematik
  () => (
    <SlideShell>
      <Eyebrow>Hızlı Tanışma</Eyebrow>
      <H2 className="mb-10">Word&apos;de profesyonel matematik</H2>
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 items-center">
        <div>
          <Sub className="!text-base mb-6">
            Word 2007&apos;den beri yerleşik bir{" "}
            <span className="text-[#3b82f6] font-semibold">Denklem Editörü</span>{" "}
            var. Yunan harfleri, integraller, matrisler &mdash; hepsi bir
            menüden, görsel olarak.
          </Sub>
          <div className="space-y-3">
            {[
              { k: "Alt + =", d: "Yeni denklem ekle (anlık)" },
              { k: "Ekle → Denklem", d: "Şerit üzerinden ekle" },
              { k: "Tasarım", d: "Denklem aktifken Tasarım sekmesi açılır" },
              { k: "F9", d: "Denklemi güncelle (alanlar)" },
            ].map((s, i) => (
              <motion.div
                key={s.k}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="flex items-center gap-3"
              >
                <kbd className="px-2 py-0.5 text-[11px] font-mono bg-[#3b82f6]/15 border border-[#3b82f6]/30 rounded text-[#93c5fd] shrink-0 min-w-[100px] text-center">
                  {s.k}
                </kbd>
                <span className="text-sm text-gray-400">{s.d}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="dcg-paper p-8 space-y-5"
        >
          <div className="text-base font-bold text-[#3b82f6] mb-2">Örnek Formüller</div>
          <div className="space-y-4 dcg-eq text-2xl text-gray-900">
            <div className="text-center">a² + b² = c²</div>
            <div className="text-center">
              x = <span className="text-xl">(-b ± √(b² - 4ac)) / 2a</span>
            </div>
            <div className="text-center">
              ∫<sub>0</sub><sup>∞</sup> e<sup>-x²</sup> dx = √π/2
            </div>
            <div className="text-center">∇ × E = -∂B/∂t</div>
          </div>
          <div className="pt-3 border-t border-gray-200 text-[10px] text-gray-500 font-mono text-center">
            Pisagor · Quadratik · Gauss · Maxwell
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 7 — Denklem ekleme akışı
  () => (
    <SlideShell>
      <Eyebrow>Adım Adım</Eyebrow>
      <H2 className="mb-8">Denklem nasıl eklenir?</H2>
      <WordMockup title="Belge1 - Word">
        <div className="space-y-4">
          <div className="flex gap-1.5 flex-wrap">
            {["Dosya", "Giriş", "Ekle", "Çizim", "Tasarım", "Düzen", "Başvurular"].map(
              (tab) => (
                <div
                  key={tab}
                  className={`px-3 py-1.5 text-xs rounded ${
                    tab === "Ekle"
                      ? "bg-[#3b82f6] text-white font-semibold"
                      : "bg-white/5 text-gray-400 border border-white/10"
                  }`}
                >
                  {tab}
                </div>
              )
            )}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-3 p-3 rounded bg-white/5 border border-white/10"
          >
            <div className="flex items-center gap-2 px-3 py-2 rounded bg-[#3b82f6]/20 border border-[#3b82f6]/40">
              <Sigma className="w-5 h-5 text-[#3b82f6]" />
              <span className="text-xs text-white font-semibold">Denklem</span>
              <ChevronRight className="w-3 h-3 text-gray-400" />
            </div>
            <div className="text-[10px] text-gray-500">
              Tasarım sekmesi açılır → semboller, yapılar, dönüşüm
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="aspect-[16/7] rounded bg-white p-6 text-black flex items-center justify-center overflow-hidden"
          >
            <div className="text-center">
              <div className="text-xl text-gray-700 mb-3">
                Burada formülünüzü yazın:
              </div>
              <div
                className="dcg-eq text-3xl text-gray-900"
                style={{ fontFamily: "Cambria Math, Georgia, serif" }}
              >
                E = mc²
              </div>
              <div className="mt-3 text-[10px] text-gray-500 font-mono">
                Einstein, kütle-enerji denkliği
              </div>
            </div>
          </motion.div>
        </div>
      </WordMockup>
    </SlideShell>
  ),

  // 8 — UnicodeMath vs LaTeX
  () => (
    <SlideShell>
      <Eyebrow>İki Mod</Eyebrow>
      <H2 className="mb-10">UnicodeMath &amp; LaTeX modu</H2>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="dcg-card-violet rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sigma className="w-5 h-5 text-[#3b82f6]" />
            <div className="text-sm font-semibold text-white">UnicodeMath</div>
            <span className="ml-auto text-[10px] text-gray-500 font-mono">
              varsayılan
            </span>
          </div>
          <div className="space-y-3 text-sm">
            <div className="font-mono text-[11px] bg-black/40 rounded p-3">
              <div className="text-[#3b82f6]">Yazarsınız:</div>
              <div className="text-gray-300 mt-1">a/b</div>
              <div className="text-[#3b82f6] mt-2">Görünür:</div>
              <div className="text-gray-100 mt-1 dcg-eq text-base">a/b</div>
            </div>
            <div className="font-mono text-[11px] bg-black/40 rounded p-3">
              <div className="text-[#3b82f6]">Yazarsınız:</div>
              <div className="text-gray-300 mt-1">alpha + beta</div>
              <div className="text-[#3b82f6] mt-2">Görünür:</div>
              <div className="text-gray-100 mt-1 dcg-eq text-base">α + β</div>
            </div>
            <div className="font-mono text-[11px] bg-black/40 rounded p-3">
              <div className="text-[#3b82f6]">Yazarsınız:</div>
              <div className="text-gray-300 mt-1">x_1^2</div>
              <div className="text-[#3b82f6] mt-2">Görünür:</div>
              <div className="text-gray-100 mt-1 dcg-eq text-base">
                x<sub>1</sub><sup>2</sup>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="dcg-card-violet rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <Calculator className="w-5 h-5 text-[#3b82f6]" />
            <div className="text-sm font-semibold text-white">LaTeX modu</div>
            <span className="ml-auto text-[10px] text-gray-500 font-mono">
              Word 2016+
            </span>
          </div>
          <div className="space-y-3 text-sm">
            <div className="font-mono text-[11px] bg-black/40 rounded p-3">
              <div className="text-[#3b82f6]">Yazarsınız:</div>
              <div className="text-gray-300 mt-1">{"\\frac{a}{b}"}</div>
              <div className="text-[#3b82f6] mt-2">Görünür:</div>
              <div className="text-gray-100 mt-1 dcg-eq text-base">
                <span className="inline-flex flex-col items-center mx-1 align-middle">
                  <span>a</span>
                  <span className="border-t border-white">b</span>
                </span>
              </div>
            </div>
            <div className="font-mono text-[11px] bg-black/40 rounded p-3">
              <div className="text-[#3b82f6]">Yazarsınız:</div>
              <div className="text-gray-300 mt-1">{"\\alpha + \\beta"}</div>
              <div className="text-[#3b82f6] mt-2">Görünür:</div>
              <div className="text-gray-100 mt-1 dcg-eq text-base">α + β</div>
            </div>
            <div className="font-mono text-[11px] bg-black/40 rounded p-3">
              <div className="text-[#3b82f6]">Yazarsınız:</div>
              <div className="text-gray-300 mt-1">{"\\sum_{i=1}^{n} i"}</div>
              <div className="text-[#3b82f6] mt-2">Görünür:</div>
              <div className="text-gray-100 mt-1 dcg-eq text-base">
                ∑<sub>i=1</sub><sup>n</sup> i
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-6 text-center text-xs text-gray-500"
      >
        Tasarım sekmesi → <span className="text-[#3b82f6]">Dönüşüm</span> →
        UnicodeMath veya LaTeX seç
      </motion.div>
    </SlideShell>
  ),

  // 9 — Sembol kütüphanesi
  () => (
    <SlideShell>
      <Eyebrow>Sembol Galerisi</Eyebrow>
      <H2 className="mb-10">Yüzlerce hazır sembol</H2>
      <div className="grid md:grid-cols-4 gap-4">
        {[
          {
            t: "Yunan Harfleri",
            items: ["α β γ δ", "ε ζ η θ", "λ μ π σ", "Ω Δ Σ Π"],
            color: "#3b82f6",
          },
          {
            t: "Operatörler",
            items: ["± × ÷ ∓", "≤ ≥ ≠ ≈", "∞ ∂ ∇ ∫", "∑ ∏ √ ∛"],
            color: "#a78bfa",
          },
          {
            t: "İlişkiler",
            items: ["⊂ ⊃ ⊆ ⊇", "∈ ∉ ∋ ∌", "∪ ∩ ∅ ∀", "∃ ∄ ⇒ ⇔"],
            color: "#ec4899",
          },
          {
            t: "Geometri",
            items: ["∠ ⊥ ∥ △", "□ ○ ◊ ★", "° ′ ″ π", "↔ → ← ↑"],
            color: "#f59e0b",
          },
        ].map((g, i) => (
          <motion.div
            key={g.t}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="dcg-card rounded-xl p-5"
            style={{ borderColor: `${g.color}30` }}
          >
            <div
              className="text-xs uppercase tracking-wider mb-3"
              style={{ color: g.color }}
            >
              {g.t}
            </div>
            <div className="space-y-2">
              {g.items.map((row, ri) => (
                <div
                  key={ri}
                  className="dcg-eq text-xl text-white tracking-wider"
                >
                  {row}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 text-center text-xs text-gray-500"
      >
        Tasarım → Semboller → kategoriden seç. 800+ sembol.
      </motion.div>
    </SlideShell>
  ),

  // 10 — Yapı blokları
  () => (
    <SlideShell>
      <Eyebrow>Yapı Blokları</Eyebrow>
      <H2 className="mb-10">Hazır matematiksel yapılar</H2>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            t: "Kesir",
            ex: <span className="dcg-eq text-3xl">a/b</span>,
            d: "Yığılmış kesir, doğrusal, pareli",
            color: "#3b82f6",
          },
          {
            t: "Üst/Alt",
            ex: <span className="dcg-eq text-3xl">x²·xⁿ·x_i</span>,
            d: "Üst, alt, ikisi birden",
            color: "#3b82f6",
          },
          {
            t: "Kök",
            ex: <span className="dcg-eq text-3xl">√x · ∛y · ⁿ√z</span>,
            d: "Kare, küp, n. dereceden kök",
            color: "#3b82f6",
          },
          {
            t: "İntegral",
            ex: <span className="dcg-eq text-3xl">∫ ∬ ∭ ∮</span>,
            d: "Belirli, belirsiz, kapalı integral",
            color: "#a78bfa",
          },
          {
            t: "Toplam/Çarpım",
            ex: (
              <span className="dcg-eq text-3xl">
                ∑ ∏ ⋃ ⋂
              </span>
            ),
            d: "Sonlu/sonsuz toplam, küme",
            color: "#a78bfa",
          },
          {
            t: "Matris",
            ex: (
              <span className="dcg-eq text-2xl">
                [<span className="inline-flex flex-col mx-1 align-middle text-[10px]">
                  <span>a b</span>
                  <span>c d</span>
                </span>]
              </span>
            ),
            d: "1×2, 2×2, 3×3, n×m boyut",
            color: "#a78bfa",
          },
          {
            t: "Limit/Log",
            ex: (
              <span className="dcg-eq text-2xl">
                lim<sub>x→0</sub> · log<sub>2</sub> x
              </span>
            ),
            d: "Limit, logaritma, ln, sin/cos",
            color: "#ec4899",
          },
          {
            t: "Operatör",
            ex: (
              <span className="dcg-eq text-2xl">
                f(x) · ∇f · |x|
              </span>
            ),
            d: "Fonksiyon, gradient, mutlak",
            color: "#ec4899",
          },
          {
            t: "Aksan",
            ex: <span className="dcg-eq text-3xl">x̄ x⃗ x̂ x̃</span>,
            d: "Ortalama, vektör, şapka, tilde",
            color: "#ec4899",
          },
        ].map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="dcg-card rounded-lg p-4 text-center"
            style={{ borderColor: `${s.color}30` }}
          >
            <div
              className="text-[10px] uppercase tracking-wider mb-2"
              style={{ color: s.color }}
            >
              {s.t}
            </div>
            <div className="text-white py-2">{s.ex}</div>
            <div className="text-[10px] text-gray-500 mt-1">{s.d}</div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  // 11 — Inline vs Display
  () => (
    <SlideShell>
      <Eyebrow>Konumlandırma</Eyebrow>
      <H2 className="mb-10">Inline (satır içi) vs Display (gösterim)</H2>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="dcg-paper p-6"
        >
          <div className="text-xs uppercase tracking-wider text-[#3b82f6] mb-4">
            Satır içi (Inline)
          </div>
          <div
            className="text-sm text-gray-800 leading-relaxed"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Pisagor teoremine göre dik üçgende{" "}
            <span className="dcg-eq inline-block px-1 bg-blue-50 text-base">
              a² + b² = c²
            </span>{" "}
            eşitliği geçerlidir. Bu temel ilişki, koordinat geometrisinde de
            kullanılır ve uzaklık formülü{" "}
            <span className="dcg-eq inline-block px-1 bg-blue-50 text-base">
              √((x₂-x₁)² + (y₂-y₁)²)
            </span>{" "}
            şeklindedir.
          </div>
          <div className="mt-4 pt-3 border-t border-gray-200 text-[10px] text-gray-500 font-mono">
            ↑ Cümle akışı içinde · küçük formüller için
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="dcg-paper p-6"
        >
          <div className="text-xs uppercase tracking-wider text-[#3b82f6] mb-4">
            Gösterim (Display)
          </div>
          <div
            className="text-sm text-gray-800 leading-relaxed"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Gauss integralinin ünlü sonucu aşağıda verilmiştir:
            <div className="my-5 text-center dcg-eq text-2xl text-gray-900 bg-blue-50 py-3 rounded">
              ∫<sub>-∞</sub><sup>+∞</sup> e<sup>-x²</sup> dx = √π
            </div>
            Bu eşitlik, olasılık teorisinde normal dağılımın temelidir.
          </div>
          <div className="mt-4 pt-3 border-t border-gray-200 text-[10px] text-gray-500 font-mono">
            ↑ Kendi satırında · ortalanmış · büyük formüller için
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 12 — Famous equations
  () => (
    <SlideShell>
      <Eyebrow>Hazır Galeri</Eyebrow>
      <H2 className="mb-10">Word&apos;ün hazır denklem koleksiyonu</H2>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          {
            t: "Pisagor Teoremi",
            eq: "a² + b² = c²",
            who: "Pisagor · M.Ö. 500",
          },
          {
            t: "Kuadratik Çözüm",
            eq: "x = (-b ± √(b²-4ac)) / 2a",
            who: "İkinci derece denklem",
          },
          {
            t: "Einstein Eşitliği",
            eq: "E = mc²",
            who: "Albert Einstein · 1905",
          },
          {
            t: "Fourier Serisi",
            eq: "f(x) = a₀ + ∑(aₙ cos nx + bₙ sin nx)",
            who: "Joseph Fourier · 1822",
          },
          {
            t: "Newton 2. Yasası",
            eq: "F = m·a",
            who: "Isaac Newton · 1687",
          },
          {
            t: "Maxwell Denklemi",
            eq: "∇ × E = -∂B/∂t",
            who: "James Clerk Maxwell · 1865",
          },
          {
            t: "Gauss İntegrali",
            eq: "∫ e^(-x²) dx = √π",
            who: "Carl F. Gauss · 1809",
          },
          {
            t: "Schrödinger",
            eq: "iℏ ∂ψ/∂t = Ĥψ",
            who: "Erwin Schrödinger · 1926",
          },
        ].map((eq, i) => (
          <motion.div
            key={eq.t}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            className="dcg-card rounded-lg p-4"
          >
            <div className="text-[10px] uppercase tracking-wider text-[#3b82f6] mb-1">
              {eq.t}
            </div>
            <div className="dcg-eq text-xl text-white py-2">{eq.eq}</div>
            <div className="text-[10px] text-gray-500 font-mono">{eq.who}</div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-6 text-center text-xs text-gray-500"
      >
        Ekle → Denklem → açılır galeriden seç
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  2. ÇİZİM  ───────────────── */

  // 13 — Section: Çizim
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Çizim ve Şekiller"
      subtitle="Akış şeması, organizasyon şeması, kavram haritası — fikrini görselleştir"
      bgGradient="linear-gradient(135deg, #ea580c, #c2410c)"
      shadow="0 20px 60px -10px rgba(234, 88, 12, 0.6)"
      icon={<Shapes className="w-16 h-16 text-white" />}
    />
  ),

  // 14 — Şekil galerisi
  () => (
    <SlideShell>
      <Eyebrow>Şekil Galerisi</Eyebrow>
      <H2 className="mb-10">8 kategori, 60+ şekil</H2>
      <div className="grid md:grid-cols-4 gap-3">
        {[
          { t: "Çizgiler", n: "8", ex: "↗ ➜ ⌐", color: "#ea580c" },
          { t: "Dikdörtgenler", n: "9", ex: "▭ ▱", color: "#ea580c" },
          { t: "Temel Şekiller", n: "30", ex: "○ △ ◊ ✦", color: "#ea580c" },
          { t: "Blok Oklar", n: "27", ex: "➔ ↗ ⤴ ⬅", color: "#fb923c" },
          { t: "Denklem Şekilleri", n: "6", ex: "+ − × =", color: "#fb923c" },
          { t: "Akış Şeması", n: "28", ex: "▭ ◊ ○ ▱", color: "#fb923c" },
          { t: "Yıldız ve Bayrak", n: "16", ex: "★ ✪ 🏴", color: "#fdba74" },
          { t: "Çağrı Balonları", n: "20", ex: "💬 🗨", color: "#fdba74" },
        ].map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            className="dcg-card rounded-xl p-4 text-center"
            style={{ borderColor: `${s.color}30` }}
          >
            <div
              className="text-3xl mb-2 tracking-wider"
              style={{ color: s.color }}
            >
              {s.ex}
            </div>
            <div className="text-sm font-semibold text-white">{s.t}</div>
            <div
              className="text-[10px] font-mono mt-1"
              style={{ color: s.color }}
            >
              {s.n} şekil
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 text-center text-xs text-gray-500"
      >
        Ekle → Şekiller → kategoriden seç → tuvale çiz
      </motion.div>
    </SlideShell>
  ),

  // 15 — Bağlantı çizgileri & flow
  () => (
    <SlideShell>
      <Eyebrow>Akış Şeması</Eyebrow>
      <H2 className="mb-10">Bağlantı çizgileri (Connectors)</H2>
      <div className="grid md:grid-cols-[1fr_1.4fr] gap-8 items-center">
        <div className="space-y-3">
          {[
            { t: "Düz çizgi", d: "İki şekil arasında doğrudan ok" },
            { t: "Dirsekli", d: "90° dönüş — dikey/yatay akış için" },
            { t: "Eğri", d: "Yumuşak Bezier eğrisi" },
            {
              t: "Otomatik tutucu",
              d: "Şekli sürüklediğinde bağlantı kopmaz",
            },
            {
              t: "Karar düğümü",
              d: "Elmas (◊) → Evet/Hayır akışı",
            },
          ].map((c, i) => (
            <motion.div
              key={c.t}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="dcg-card rounded-lg p-3 flex items-start gap-3"
            >
              <ArrowRight className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-white">{c.t}</div>
                <div className="text-xs text-gray-400">{c.d}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="dcg-paper p-6"
        >
          <div className="text-xs font-bold mb-4 text-center" style={{ color: "#ea580c" }}>
            Müşteri Sipariş Akışı
          </div>
          <div className="flex flex-col items-center gap-2 text-[11px]">
            <div className="px-3 py-2 rounded bg-orange-100 border-2 border-orange-400 text-orange-900 font-semibold">
              Sipariş Alındı
            </div>
            <ArrowDownRight className="w-4 h-4 text-orange-500 rotate-90" />
            <div className="px-3 py-2 rounded bg-yellow-100 border-2 border-yellow-500 text-yellow-900 font-semibold transform rotate-45 w-20 h-20 flex items-center justify-center">
              <span className="-rotate-45 text-center">Stokta var mı?</span>
            </div>
            <ArrowDownRight className="w-4 h-4 text-orange-500 rotate-90" />
            <div className="flex gap-3">
              <div className="px-3 py-2 rounded bg-green-100 border-2 border-green-500 text-green-900 font-semibold">
                Evet → Kargo
              </div>
              <div className="px-3 py-2 rounded bg-red-100 border-2 border-red-500 text-red-900 font-semibold">
                Hayır → Tedarik
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 16 — SmartArt 8 categories
  () => (
    <SlideShell>
      <Eyebrow>SmartArt</Eyebrow>
      <H2 className="mb-10">Hazır profesyonel diyagramlar</H2>
      <div className="grid md:grid-cols-4 gap-3">
        {[
          { t: "Liste", d: "Sıralı, sırasız, hedef listeler", icon: Layers },
          { t: "Süreç", d: "Adım adım ilerleyen akış", icon: ArrowRight },
          { t: "Döngü", d: "Tekrarlanan döngüsel süreç", icon: RotateCw },
          { t: "Hiyerarşi", d: "Org şeması, ağaç yapısı", icon: GitBranch },
          { t: "İlişki", d: "Venn, denge, dişli, radyal", icon: Share2 },
          { t: "Matris", d: "2×2, 3×3 ızgara analizleri", icon: Square },
          { t: "Piramit", d: "Maslow, Bloom taksonomisi", icon: Triangle },
          { t: "Resim", d: "Foto + metin kombinasyonu", icon: Group },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              className="dcg-card rounded-xl p-5"
              style={{ borderColor: "rgba(234,88,12,0.25)" }}
            >
              <Icon className="w-6 h-6 mb-3" style={{ color: "#ea580c" }} />
              <div className="text-sm font-semibold text-white">{s.t}</div>
              <div className="text-[11px] text-gray-400 mt-1">{s.d}</div>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-center text-xs text-gray-500"
      >
        Ekle → SmartArt → kategori + şablon seç → metin gir, görsel otomatik
      </motion.div>
    </SlideShell>
  ),

  // 17 — Org chart örneği (SmartArt detail)
  () => (
    <SlideShell>
      <Eyebrow>Canlı Örnek</Eyebrow>
      <H2 className="mb-10">Şirket Organizasyon Şeması</H2>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="dcg-paper p-8"
      >
        <div className="flex flex-col items-center gap-6">
          <div className="px-6 py-3 rounded-lg bg-[#ea580c] text-white text-sm font-semibold shadow-lg">
            Genel Müdür
          </div>
          <div className="w-px h-4 bg-orange-300" />
          <div className="grid grid-cols-3 gap-8">
            {["Yazılım", "Veri Analizi", "İK"].map((dept, i) => (
              <motion.div
                key={dept}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="px-4 py-2 rounded bg-orange-100 border-2 border-orange-400 text-orange-900 text-xs font-semibold">
                  {dept} Müdürü
                </div>
                <div className="w-px h-3 bg-orange-200" />
                <div className="flex flex-col gap-1.5">
                  {[1, 2, 3].map((n) => (
                    <div
                      key={n}
                      className="px-3 py-1 rounded bg-orange-50 border border-orange-200 text-orange-800 text-[10px]"
                    >
                      {dept === "Veri Analizi" ? "Stajyer" : "Uzman"} #{n}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      <div className="mt-6 grid md:grid-cols-3 gap-3 text-xs text-gray-400">
        <div className="dcg-card rounded p-3 text-center">
          SmartArt → Hiyerarşi → Org Chart
        </div>
        <div className="dcg-card rounded p-3 text-center">
          Metin paneli → Tab ile alt seviyeler
        </div>
        <div className="dcg-card rounded p-3 text-center">
          Renk şeması: Tasarım → SmartArt Stilleri
        </div>
      </div>
    </SlideShell>
  ),

  // 18 — Hizalama ve gruplandırma
  () => (
    <SlideShell>
      <Eyebrow>Düzen</Eyebrow>
      <H2 className="mb-10">Hizalama, Gruplandırma, Z-Order</H2>
      <div className="grid md:grid-cols-3 gap-5">
        {[
          {
            icon: AlignCenter,
            t: "Hizala",
            items: [
              "Sola/sağa/üste/alta",
              "Yatay/dikey ortala",
              "Eşit dağıt",
              "Sayfaya/seçime göre",
            ],
          },
          {
            icon: Group,
            t: "Grupla",
            items: [
              "Birden fazla şekli birleştir",
              "Tek nesne gibi taşı",
              "Ctrl+G ile grupla",
              "Ctrl+Shift+G ile ayır",
            ],
          },
          {
            icon: Layers,
            t: "Z-Order (Sıralama)",
            items: [
              "Öne getir / arkaya gönder",
              "Bir adım öne / arkaya",
              "Metin önünde / arkasında",
              "Katman gibi düşün",
            ],
          },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="dcg-card rounded-xl p-5"
              style={{ borderColor: "rgba(234,88,12,0.3)" }}
            >
              <Icon className="w-7 h-7 mb-3" style={{ color: "#ea580c" }} />
              <div className="text-base font-semibold text-white mb-3">
                {s.t}
              </div>
              <ul className="space-y-1.5">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs text-gray-400"
                  >
                    <Check className="w-3 h-3 text-[#ea580c] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 dcg-card-violet rounded-lg p-4 text-center"
      >
        <div className="text-xs text-gray-300">
          <span className="text-[#ea580c] font-mono">PRO TİP:</span> Birden
          fazla şekli birlikte hizalamak için Shift basılı tut → tıkla → Şekil
          Biçimi → Hizala
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 19 — Metin sarma ve kutuları
  () => (
    <SlideShell>
      <Eyebrow>Metinle İlişki</Eyebrow>
      <H2 className="mb-10">Metin Kutusu &amp; Metin Sarma</H2>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="dcg-card rounded-xl p-5"
          style={{ borderColor: "rgba(234,88,12,0.3)" }}
        >
          <Edit3 className="w-6 h-6 text-[#ea580c] mb-3" />
          <div className="text-base font-semibold text-white mb-3">
            Metin Kutusu
          </div>
          <div className="text-xs text-gray-400 space-y-2">
            <div>· Sayfanın herhangi bir yerine bağımsız metin koy</div>
            <div>· Çağrı, vurgu, kenar notu için ideal</div>
            <div>· Şekil gibi davranır — hareketli, döndürülebilir</div>
            <div>· Birden fazla metin kutusu birbirine bağlanabilir</div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 text-[10px] text-gray-500 font-mono">
            Ekle → Metin Kutusu → çiz veya hazır seç
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="dcg-card rounded-xl p-5"
          style={{ borderColor: "rgba(234,88,12,0.3)" }}
        >
          <MousePointer2 className="w-6 h-6 text-[#ea580c] mb-3" />
          <div className="text-base font-semibold text-white mb-3">
            Metin Sarma (Wrap)
          </div>
          <div className="space-y-1.5 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-sm border"
                style={{ borderColor: "#ea580c" }}
              />
              <span>
                <span className="text-white font-semibold">Satır içi:</span>{" "}
                metnin parçası gibi
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-sm border"
                style={{ borderColor: "#ea580c" }}
              />
              <span>
                <span className="text-white font-semibold">Kare:</span>{" "}
                etrafından metin akar
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-sm border"
                style={{ borderColor: "#ea580c" }}
              />
              <span>
                <span className="text-white font-semibold">Sıkı:</span> şeklin
                konturuna sarılır
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-sm border"
                style={{ borderColor: "#ea580c" }}
              />
              <span>
                <span className="text-white font-semibold">Önünde/Arkasında:</span>{" "}
                metni örter / metin örter
              </span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 text-[10px] text-gray-500 font-mono">
            Şekil seç → Düzen Seçenekleri → Metin Sarma
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 20 — Serbest çizim
  () => (
    <SlideShell>
      <Eyebrow>Çizim Sekmesi</Eyebrow>
      <H2 className="mb-10">Serbest Çizim &mdash; tablet + kalem</H2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          {[
            { icon: PenTool, t: "Kalem", d: "Çizgi kalınlığı, renk, baskı duyarlılığı" },
            { icon: Brush, t: "Vurgulayıcı", d: "Yarı saydam — önemli yerleri işaretle" },
            { icon: Move, t: "Lasso", d: "Çizimi serbest seç, taşı, döndür" },
            { icon: Sparkles, t: "Mürekkep AI", d: "El yazısını metne, çizimi şekle çevir" },
          ].map((d, i) => {
            const Icon = d.icon;
            return (
              <motion.div
                key={d.t}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="dcg-card rounded-lg p-4 flex items-start gap-3"
              >
                <Icon className="w-5 h-5 text-[#ea580c] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-white">{d.t}</div>
                  <div className="text-xs text-gray-400">{d.d}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="dcg-paper p-6 relative aspect-square"
        >
          <div className="absolute top-2 left-2 text-[10px] font-mono text-gray-400">
            Çizim modu &middot; ID-2024
          </div>
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Hand-drawn arrow */}
            <path
              d="M 30 150 Q 80 50, 150 80"
              stroke="#ea580c"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 140 70 L 150 80 L 145 95"
              stroke="#ea580c"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Hand-drawn circle */}
            <ellipse
              cx="50"
              cy="155"
              rx="20"
              ry="18"
              stroke="#3b82f6"
              strokeWidth="2.5"
              fill="none"
            />
            {/* Hand-drawn rectangle (offset) */}
            <path
              d="M 130 60 L 175 58 L 173 95 L 128 97 Z"
              stroke="#16a34a"
              strokeWidth="2.5"
              fill="none"
              strokeLinejoin="round"
            />
            {/* Highlight stroke */}
            <path
              d="M 80 130 L 120 130"
              stroke="#fde047"
              strokeWidth="10"
              opacity="0.5"
              strokeLinecap="round"
            />
            <text
              x="80"
              y="135"
              fontSize="11"
              fill="#1f2937"
              fontFamily="cursive"
            >
              önemli!
            </text>
          </svg>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3. GRAFİK  ───────────────── */

  // 21 — Section: Grafik
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Grafik (Charts)"
      subtitle="Sayıları görsel hikayeye çevir — Excel'den anında"
      bgGradient="linear-gradient(135deg, #16a34a, #15803d)"
      shadow="0 20px 60px -10px rgba(22, 163, 74, 0.6)"
      icon={<BarChart3 className="w-16 h-16 text-white" />}
    />
  ),

  // 22 — 8 grafik tipi
  () => (
    <SlideShell>
      <Eyebrow>8 Ana Tip</Eyebrow>
      <H2 className="mb-10">Word&apos;ün grafik kütüphanesi</H2>
      <div className="grid md:grid-cols-4 gap-3">
        {[
          { icon: BarChart3, t: "Sütun", d: "Karşılaştırma" },
          { icon: BarChart3, t: "Çubuk", d: "Yatay sütun" },
          { icon: LineChart, t: "Çizgi", d: "Zaman serisi" },
          { icon: PieChart, t: "Pasta", d: "Oranlar" },
          { icon: AreaChart, t: "Alan", d: "Toplamla zaman" },
          { icon: ScatterChart, t: "Dağılım", d: "Korelasyon" },
          { icon: Radar, t: "Radar", d: "Çok boyutlu" },
          { icon: Globe, t: "Harita", d: "Coğrafi veri" },
        ].map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.t}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              className="dcg-card rounded-xl p-4 text-center"
              style={{ borderColor: "rgba(22,163,74,0.25)" }}
            >
              <Icon
                className="w-8 h-8 mx-auto mb-3"
                style={{ color: "#16a34a" }}
              />
              <div className="text-sm font-semibold text-white">{c.t}</div>
              <div className="text-[10px] text-gray-500 mt-1">{c.d}</div>
            </motion.div>
          );
        })}
      </div>
    </SlideShell>
  ),

  // 23 — Hangi grafik ne için?
  () => (
    <SlideShell>
      <Eyebrow>Karar Rehberi</Eyebrow>
      <H2 className="mb-10">Hangi grafik ne için?</H2>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          {
            t: "Karşılaştırma",
            chart: "Sütun / Çubuk",
            ex: "Aylık satışlar · ülkelere göre kullanıcı",
            color: "#16a34a",
            icon: BarChart3,
          },
          {
            t: "Zaman İçinde Değişim",
            chart: "Çizgi / Alan",
            ex: "Yıllık ziyaretçi sayısı · döviz kuru",
            color: "#16a34a",
            icon: LineChart,
          },
          {
            t: "Oran/Pay (toplama göre)",
            chart: "Pasta / Halka",
            ex: "Pazar payı · bütçe dağılımı",
            color: "#22c55e",
            icon: PieChart,
          },
          {
            t: "İlişki/Korelasyon",
            chart: "Dağılım (Scatter)",
            ex: "Yaş - gelir · sıcaklık - satış",
            color: "#22c55e",
            icon: ScatterChart,
          },
          {
            t: "Çok Boyutlu Profil",
            chart: "Radar / Örümcek",
            ex: "Yetenek profili · ürün özellikleri",
            color: "#4ade80",
            icon: Radar,
          },
          {
            t: "Coğrafi Dağılım",
            chart: "Harita",
            ex: "Şehir bazlı satış · doğum yeri",
            color: "#4ade80",
            icon: Globe,
          },
        ].map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.t}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              className="dcg-card rounded-lg p-4 flex gap-4"
              style={{ borderColor: `${c.color}30` }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background: `${c.color}15`,
                  border: `1px solid ${c.color}40`,
                }}
              >
                <Icon className="w-5 h-5" style={{ color: c.color }} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">{c.t}</div>
                <div className="text-xs mt-0.5" style={{ color: c.color }}>
                  → {c.chart}
                </div>
                <div className="text-[11px] text-gray-500 mt-1">{c.ex}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SlideShell>
  ),

  // 24 — Grafik ekleme akışı
  () => (
    <SlideShell>
      <Eyebrow>Veri Akışı</Eyebrow>
      <H2 className="mb-10">Grafik ekleme &mdash; Excel ile entegre</H2>
      <div className="grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-3 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="dcg-card rounded-xl p-4 text-center"
          style={{ borderColor: "rgba(22,163,74,0.3)" }}
        >
          <div
            className="w-10 h-10 mx-auto mb-3 rounded flex items-center justify-center font-bold text-white"
            style={{ background: "#22c55e" }}
          >
            X
          </div>
          <div className="text-sm font-semibold text-white">1. Excel</div>
          <div className="text-[11px] text-gray-400 mt-2 font-mono leading-tight">
            Ay  | Satış<br />
            Oca | 1200<br />
            Şub | 1450<br />
            Mar | 1600
          </div>
        </motion.div>
        <ChevronRight className="w-5 h-5 text-[#16a34a] mx-auto" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="dcg-card rounded-xl p-4 text-center"
          style={{ borderColor: "rgba(22,163,74,0.3)" }}
        >
          <BarChart3
            className="w-10 h-10 mx-auto mb-3"
            style={{ color: "#16a34a" }}
          />
          <div className="text-sm font-semibold text-white">2. Word</div>
          <div className="text-[11px] text-gray-400 mt-2">
            Ekle → Grafik → Sütun → seç
          </div>
        </motion.div>
        <ChevronRight className="w-5 h-5 text-[#16a34a] mx-auto" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="dcg-card rounded-xl p-4 text-center"
          style={{ borderColor: "rgba(22,163,74,0.3)" }}
        >
          <div className="flex items-end justify-center gap-1 h-12 mb-2">
            <div className="dcg-bar w-3" style={{ height: "60%" }} />
            <div className="dcg-bar w-3" style={{ height: "75%" }} />
            <div className="dcg-bar w-3" style={{ height: "90%" }} />
          </div>
          <div className="text-sm font-semibold text-white">3. Grafik</div>
          <div className="text-[11px] text-gray-400 mt-1">
            Veri canlı bağlı &middot; Excel değişirse, grafik güncellenir
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-10 dcg-card-violet rounded-lg p-4 text-center"
      >
        <div className="text-xs text-gray-300">
          Ekle → Grafik → tip seç → açılan Excel sayfasına verini gir →
          <span className="text-[#16a34a] font-semibold">otomatik</span> Word&apos;e
          eklenir.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 25 — Grafik anatomisi
  () => (
    <SlideShell>
      <Eyebrow>Bileşenler</Eyebrow>
      <H2 className="mb-10">Bir grafiğin anatomisi</H2>
      <div className="grid md:grid-cols-[1.3fr_1fr] gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="dcg-paper p-6 relative"
        >
          <div className="text-center text-sm font-bold text-gray-900 mb-4">
            Aylık Web Sitesi Ziyaretçileri (2026)
          </div>
          <div className="relative h-48">
            <div className="absolute left-0 top-0 bottom-6 w-8 flex flex-col justify-between text-[9px] text-gray-500 text-right pr-1">
              <span>2k</span>
              <span>1.5k</span>
              <span>1k</span>
              <span>500</span>
              <span>0</span>
            </div>
            <div className="ml-9 h-full flex items-end gap-2 border-b-2 border-l-2 border-gray-300 pr-2">
              {[
                { l: "Oca", v: 50 },
                { l: "Şub", v: 60 },
                { l: "Mar", v: 75 },
                { l: "Nis", v: 85 },
                { l: "May", v: 70 },
                { l: "Haz", v: 90 },
                { l: "Tem", v: 95 },
              ].map((b, i) => (
                <div
                  key={b.l}
                  className="flex-1 flex flex-col items-center"
                >
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${b.v}%` }}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
                    className="dcg-bar w-full"
                  />
                  <div className="text-[9px] text-gray-600 mt-1">{b.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 flex items-center justify-center gap-4 text-[9px] text-gray-600">
            <div className="flex items-center gap-1">
              <span className="dcg-bar w-3 h-2.5 rounded-sm" />
              <span>Ziyaretçi</span>
            </div>
          </div>
        </motion.div>
        <div className="space-y-2.5">
          {[
            { n: "1", t: "Başlık (Title)", d: "Grafik ne anlatıyor — Aylık ziyaretçiler" },
            { n: "2", t: "X-Eksen (Yatay)", d: "Bağımsız değişken — aylar" },
            { n: "3", t: "Y-Eksen (Dikey)", d: "Bağımlı değişken — sayı" },
            { n: "4", t: "Veri Serisi (Bar)", d: "Asıl veri — sütunlar" },
            { n: "5", t: "Açıklama (Legend)", d: "Hangi renk ne anlama gelir" },
            { n: "6", t: "Veri Etiketi", d: "Sayıyı çubuğun üstünde göster" },
          ].map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.07 }}
              className="flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-[#16a34a]/15 border border-[#16a34a]/40 flex items-center justify-center text-[10px] font-mono text-[#16a34a] shrink-0">
                {p.n}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{p.t}</div>
                <div className="text-[11px] text-gray-400">{p.d}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideShell>
  ),

  // 26 — Stil & renk
  () => (
    <SlideShell>
      <Eyebrow>Görsel İnce Ayar</Eyebrow>
      <H2 className="mb-10">Stil &amp; Renk Şeması</H2>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            t: "Hızlı Düzen",
            ex: "12 hazır şablon",
            d: "Eksen, başlık, açıklama yerleşimi tek tıkla",
            color: "#16a34a",
          },
          {
            t: "Renk Paleti",
            ex: "16 hazır şema",
            d: "Renk Körü dostu seçenek dahil",
            color: "#22c55e",
          },
          {
            t: "Grafik Stili",
            ex: "11 görsel stil",
            d: "Gölge, gradient, 3D, düz",
            color: "#4ade80",
          },
        ].map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="dcg-card rounded-xl p-5 text-center"
            style={{ borderColor: `${s.color}30` }}
          >
            <Palette
              className="w-8 h-8 mx-auto mb-3"
              style={{ color: s.color }}
            />
            <div className="text-sm font-semibold text-white mb-1">{s.t}</div>
            <div className="text-xs font-mono mb-2" style={{ color: s.color }}>
              {s.ex}
            </div>
            <div className="text-[11px] text-gray-400">{s.d}</div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-10"
      >
        <div className="text-xs uppercase tracking-wider text-gray-500 mb-3 text-center">
          Renk Paleti Örnekleri
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[
            { n: "Renkli", colors: ["#3b82f6", "#22c55e", "#f59e0b", "#ec4899"] },
            { n: "Tek ton", colors: ["#16a34a", "#22c55e", "#4ade80", "#86efac"] },
            { n: "Toprak", colors: ["#92400e", "#b45309", "#d97706", "#f59e0b"] },
            { n: "Pastel", colors: ["#fda4af", "#a5b4fc", "#86efac", "#fde68a"] },
          ].map((p) => (
            <div
              key={p.n}
              className="dcg-card rounded-lg p-3 text-center"
            >
              <div className="flex justify-center gap-0.5 mb-2">
                {p.colors.map((c) => (
                  <div
                    key={c}
                    className="w-5 h-8 rounded-sm"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <div className="text-[10px] text-gray-400">{p.n}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 27 — Yaygın grafik hataları
  () => (
    <SlideShell>
      <Eyebrow>Veri Görselleştirme</Eyebrow>
      <H2 className="mb-10">Yapma! &mdash; Grafik felaketleri</H2>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          {
            t: "3D Pasta",
            d: "3D pasta dilimleri yanlış oranda görünür — hep 2D kullan",
            icon: PieChart,
          },
          {
            t: "Çok dilim pasta",
            d: "5+ dilim olunca pasta okunmaz — sütun grafiği daha iyi",
            icon: PieChart,
          },
          {
            t: "Zorla 0'dan başlamayan eksen",
            d: "Y-eksenini 80'den başlatma → küçük farkı abartır",
            icon: TrendingDown,
          },
          {
            t: "Yanlış grafik tipi",
            d: "Zaman verisi pastaya gömme — çizgi kullan",
            icon: AlertTriangle,
          },
          {
            t: "10+ renk",
            d: "Gözü yorar, hiyerarşi kaybolur — max 4-5 renk",
            icon: Palette,
          },
          {
            t: "Etiketsiz eksen",
            d: "X ve Y ne anlatıyor? Birim, tarih, başlık şart",
            icon: X,
          },
        ].map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={m.t}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              className="dcg-card rounded-lg p-4 flex gap-3"
              style={{ borderColor: "rgba(239,68,68,0.25)" }}
            >
              <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{m.t}</div>
                <div className="text-[11px] text-gray-400 mt-0.5">{m.d}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SlideShell>
  ),

  // 28 — Sparklines
  () => (
    <SlideShell>
      <Eyebrow>Mini Grafik</Eyebrow>
      <H2 className="mb-10">Sparklines &mdash; tek hücrede grafik</H2>
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 items-center">
        <div>
          <Sub className="!text-base mb-6">
            Sparkline = bir hücreye sığan, başlığı ve eksenleri olmayan minik
            grafik. Tablonun yanında trend göstermek için ideal.
          </Sub>
          <div className="space-y-2.5 text-xs text-gray-400">
            {[
              "Excel'de hücre seç → Ekle → Sparklines",
              "3 tip: çizgi, sütun, kazanç/kayıp",
              "Word'de Excel ile bağlı tabloyu yapıştır",
              "Tablo → Sparkline ekle (Excel benzeri)",
            ].map((s, i) => (
              <motion.div
                key={s}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.07 }}
                className="flex items-start gap-2"
              >
                <Check className="w-3 h-3 text-[#16a34a] shrink-0 mt-1" />
                <span>{s}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="dcg-paper p-5"
        >
          <table className="w-full text-[11px]" style={{ fontFamily: "Calibri, sans-serif" }}>
            <thead>
              <tr style={{ background: "#16a34a", color: "white" }}>
                <th className="text-left px-2 py-1.5">Şehir</th>
                <th className="text-right px-2 py-1.5">Müşteri</th>
                <th className="text-right px-2 py-1.5">Satış</th>
                <th className="text-center px-2 py-1.5">6 ay trend</th>
              </tr>
            </thead>
            <tbody>
              {[
                { c: "İstanbul", m: 1240, s: "₺85k", trend: [3, 4, 6, 5, 7, 8] },
                { c: "Ankara", m: 580, s: "₺42k", trend: [4, 5, 5, 6, 7, 7] },
                { c: "İzmir", m: 720, s: "₺53k", trend: [5, 4, 6, 5, 4, 6] },
                { c: "Bursa", m: 320, s: "₺21k", trend: [2, 3, 3, 4, 5, 6] },
                { c: "Antalya", m: 410, s: "₺28k", trend: [6, 5, 4, 3, 4, 5] },
              ].map((row, i) => (
                <tr
                  key={row.c}
                  className={i % 2 === 0 ? "bg-gray-50" : ""}
                  style={{ color: "#1f2937" }}
                >
                  <td className="px-2 py-1.5 border-b border-gray-200 font-semibold">
                    {row.c}
                  </td>
                  <td className="px-2 py-1.5 border-b border-gray-200 text-right">
                    {row.m}
                  </td>
                  <td className="px-2 py-1.5 border-b border-gray-200 text-right">
                    {row.s}
                  </td>
                  <td className="px-2 py-1.5 border-b border-gray-200">
                    <svg viewBox="0 0 60 16" className="w-full h-4">
                      <polyline
                        fill="none"
                        stroke="#16a34a"
                        strokeWidth="1.5"
                        points={row.trend
                          .map((v, j) => `${(j / (row.trend.length - 1)) * 60},${16 - (v / 8) * 14}`)
                          .join(" ")}
                      />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  4. PRATİK  ───────────────── */

  // 29 — Section: Pratik
  () => (
    <SectionDivider
      num="4"
      total="3"
      title="Pratik &amp; Kapanış"
      subtitle="Kısayollar, yaygın hatalar, ödev — derste öğreneceklerini eve götür"
      bgGradient="linear-gradient(135deg, #00ff41, #0e6802)"
      shadow="0 20px 60px -10px rgba(0, 255, 65, 0.5)"
      icon={<Keyboard className="w-16 h-16 text-black" />}
    />
  ),

  // 30 — Kısayollar
  () => (
    <SlideShell>
      <Eyebrow>Klavye Kısayolları</Eyebrow>
      <H2 className="mb-10">Denklem · Çizim · Grafik için</H2>
      <div className="grid md:grid-cols-2 gap-3">
        {[
          { keys: ["Alt", "="], desc: "Yeni denklem ekle (anlık)" },
          { keys: ["Ctrl", "G"], desc: "Şekilleri grupla" },
          { keys: ["Ctrl", "Shift", "G"], desc: "Grubu çöz" },
          { keys: ["Ctrl", "D"], desc: "Şekli/grafiği çoğalt" },
          { keys: ["F4"], desc: "Son işlemi tekrarla" },
          { keys: ["Ctrl", "drag"], desc: "Şekli sürüklerken kopyala" },
          { keys: ["Shift", "drag"], desc: "Şekli kareli/dik tut" },
          { keys: ["Alt", "drag"], desc: "Izgaraya hizalanmadan taşı" },
          { keys: ["Esc"], desc: "Şekil seçiminden çık" },
          { keys: ["Tab"], desc: "Bir sonraki şekle geç" },
          { keys: ["Ctrl", "T"], desc: "Tablo ekle (grafiğin altı için)" },
          { keys: ["F9"], desc: "Alanları/grafiği güncelle" },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 + i * 0.04 }}
            className="dcg-card rounded-lg px-5 py-2.5 flex items-center justify-between"
          >
            <div className="text-sm text-gray-300">{s.desc}</div>
            <div className="flex items-center gap-1">
              {s.keys.map((k, ki) => (
                <span key={k + ki} className="flex items-center gap-1">
                  <kbd className="px-2 py-0.5 text-[10px] font-mono bg-violet-500/15 border border-violet-400/30 rounded text-violet-300 min-w-7 text-center">
                    {k}
                  </kbd>
                  {ki < s.keys.length - 1 && (
                    <span className="text-gray-600 text-[10px]">+</span>
                  )}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  // 31 — Word vs PowerPoint vs Excel
  () => (
    <SlideShell>
      <Eyebrow>Hangi Araç Hangisi İçin?</Eyebrow>
      <H2 className="mb-10">Word · PowerPoint · Excel</H2>
      <div className="grid md:grid-cols-3 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="dcg-card rounded-xl p-5"
          style={{ borderColor: "rgba(43,87,154,0.4)" }}
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 dcg-w-tile text-base">
            W
          </div>
          <div className="text-base font-semibold text-white mb-2">Word</div>
          <div className="text-[11px] text-gray-400 mb-3">
            Metin ağırlıklı belge
          </div>
          <ul className="space-y-1 text-[11px] text-gray-300">
            <li className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-[#3b82f6]" />
              Staj raporu, ödev, dilekçe
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-[#3b82f6]" />
              1-2 grafik, birkaç şekil
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-[#3b82f6]" />
              İçindekiler, kaynakça
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="dcg-card rounded-xl p-5"
          style={{ borderColor: "rgba(210,71,38,0.4)" }}
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 font-bold text-white"
            style={{ background: "#d24726" }}
          >
            P
          </div>
          <div className="text-base font-semibold text-white mb-2">PowerPoint</div>
          <div className="text-[11px] text-gray-400 mb-3">
            Görsel sunum
          </div>
          <ul className="space-y-1 text-[11px] text-gray-300">
            <li className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-[#d24726]" />
              Topluluk önünde anlatım
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-[#d24726]" />
              Animasyonlu görsel akış
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-[#d24726]" />
              Tek mesaj/slayt
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="dcg-card rounded-xl p-5"
          style={{ borderColor: "rgba(22,163,74,0.4)" }}
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 font-bold text-white"
            style={{ background: "#16a34a" }}
          >
            X
          </div>
          <div className="text-base font-semibold text-white mb-2">Excel</div>
          <div className="text-[11px] text-gray-400 mb-3">
            Veri ve grafik atölyesi
          </div>
          <ul className="space-y-1 text-[11px] text-gray-300">
            <li className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-[#16a34a]" />
              Veri analizi, formüller
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-[#16a34a]" />
              Çok grafik, çok sayfa
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-[#16a34a]" />
              Pivot, dashboard
            </li>
          </ul>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 dcg-card-violet rounded-lg p-4 text-center"
      >
        <div className="text-xs text-gray-300">
          Pratik kural: <span className="text-[#a78bfa] font-semibold">Veri Excel&apos;de toplanır</span>,{" "}
          <span className="text-[#3b82f6] font-semibold">Word&apos;de raporlanır</span>,{" "}
          <span className="text-[#d24726] font-semibold">PowerPoint&apos;te sunulur</span>.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 32 — Yaygın hatalar
  () => (
    <SlideShell>
      <Eyebrow>Yapma!</Eyebrow>
      <H2 className="mb-10">Üç araçla en sık yapılan hatalar</H2>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          {
            t: "Denklemi resim olarak yapıştırma",
            d: "Klavyeyle Alt+= ile yaz — sonra düzenleyebilirsin, kalitesi bozulmaz",
          },
          {
            t: "Şekilleri elle hizalamak",
            d: "Şekil Biçimi → Hizala kullan, milimetri pikselle uğraşma",
          },
          {
            t: "Her veri için pasta grafik",
            d: "Pasta sadece 2-4 dilim için. Daha çoksa sütun kullan",
          },
          {
            t: "Grafikte 3D efekt",
            d: "3D oranları çarpıtır, okumayı zorlaştırır — düz tut",
          },
          {
            t: "SmartArt yerine elle çizim",
            d: "Org şeması, akış için SmartArt kullan, daha hızlı + tutarlı",
          },
          {
            t: "Grafik başlığı ve eksen yazmamak",
            d: "&ldquo;Aylar&rdquo; ve &ldquo;Satış (₺)&rdquo; mutlaka yaz — etiketsiz grafik anlamsız",
          },
        ].map((m, i) => (
          <motion.div
            key={m.t}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            className="dcg-card rounded-lg p-4 flex gap-3"
            style={{ borderColor: "rgba(239,68,68,0.25)" }}
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

  // 33 — Ödev
  () => (
    <SlideShell>
      <Eyebrow>Bu Hafta</Eyebrow>
      <H2 className="mb-4">Ödev &mdash; 3-in-1 Görsel Belge</H2>
      <Sub className="mb-8 !text-base">
        Tek Word belgesinde üç araçla bir &ldquo;Sayısal Rapor&rdquo; hazırla.
      </Sub>
      <div className="grid md:grid-cols-3 gap-5">
        {[
          {
            n: "01",
            icon: Sigma,
            t: "1 Denklem",
            d: "Çalışma alanınla ilgili (büyük veri için: ortalama, standart sapma, korelasyon, regresyon) bir formül yaz.",
            color: "#3b82f6",
            ex: "x̄ = (∑xᵢ) / n",
          },
          {
            n: "02",
            icon: Shapes,
            t: "1 SmartArt",
            d: "Bir süreç akışı çiz — örnek: &ldquo;Veri toplama → temizleme → analiz → rapor&rdquo;",
            color: "#ea580c",
            ex: "5 adımlık süreç",
          },
          {
            n: "03",
            icon: BarChart3,
            t: "1 Grafik",
            d: "Excel'den 6 aylık örnek veri al → sütun grafiği. Eksen, başlık ve veri etiketleri tam olsun.",
            color: "#16a34a",
            ex: "Aylık satış sütun",
          },
        ].map((task, i) => {
          const Icon = task.icon;
          return (
            <motion.div
              key={task.n}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="dcg-card rounded-xl p-5"
              style={{ borderColor: `${task.color}40` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-white text-sm"
                  style={{ background: task.color }}
                >
                  {task.n}
                </div>
                <Icon className="w-5 h-5" style={{ color: task.color }} />
              </div>
              <div className="text-base font-semibold text-white mb-2">
                {task.t}
              </div>
              <div className="text-xs text-gray-400 leading-relaxed">
                {task.d}
              </div>
              <div
                className="mt-3 pt-3 border-t border-white/5 text-[10px] font-mono text-center"
                style={{ color: task.color }}
              >
                ↳ {task.ex}
              </div>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-center text-[11px] text-gray-500"
      >
        Teslim: PDF olarak · Dosya adı:{" "}
        <span className="font-mono text-[#a78bfa]">
          AdSoyad_OkulNo_Hafta11.pdf
        </span>
      </motion.div>
    </SlideShell>
  ),

  // 34 — Teşekkürler
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
        <H1 className="dcg-shimmer">Teşekkürler</H1>
        <Sub className="mt-8 max-w-xl mx-auto">
          Sorularınız için sınıf saatinde &mdash; Çarşamba 09:55–12:30
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 inline-flex items-center gap-3 px-6 py-3 rounded-full dcg-card"
        >
          <FileText className="w-4 h-4 text-[#00ff41]" />
          <span className="text-sm text-gray-300">
            BVA 1108 · Bilgi Teknolojileri · 11. Hafta — Denklem · Çizim ·
            Grafik
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-10 text-[10px] text-gray-600 font-mono"
        >
          Kaynaklar: Microsoft (2025) · Edward Tufte (Visual Display) ·
          MIT Visual Cognition · Wharton Reports
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
          BVA 1108 · 11. Hafta · Denklem · Çizim · Grafik
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
