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
  Component as ComponentIcon,
  Copy,
  Layers,
  Frame,
  Square,
  Type,
  PenTool,
  Hand,
  MousePointer2,
  Check,
  X,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Sparkles,
  ArrowDownUp,
  ArrowLeftRight,
  AlignVerticalJustifyStart,
  Maximize,
  Boxes,
  ToggleLeft,
  SlidersHorizontal,
  RefreshCw,
  GitBranch,
  Repeat,
  Wand2,
  CheckCircle2,
  XCircle,
  Calendar,
  Target,
  Brain,
  Lightbulb,
  Hash,
  Globe,
  GraduationCap,
  Briefcase,
  Clock,
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
        <div className="absolute inset-0 katas-grid-bg pointer-events-none" />
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
      className="inline-flex items-center gap-3 mb-6 text-xs font-mono uppercase tracking-[0.25em] text-[#ec4899]"
    >
      <span className="w-8 h-px bg-[#ec4899]" />
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
  accent = "#ec4899",
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
      className="katas-card katas-card-hover rounded-xl p-6 transition-all"
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
          className="inline-flex w-32 h-32 rounded-3xl items-center justify-center mb-8 katas-pulse"
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
   TOPIC-SPECIFIC MOCKUPS
   ============================================================ */

function FigmaFrameMockup({
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
      className="katas-window-chrome w-full"
    >
      <div className="katas-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-semibold flex-1 max-w-md mx-auto text-center justify-center"
          style={{ background: "#0d0d0d", color: "#f9a8d4" }}
        >
          <span className="w-5 h-5 rounded-sm katas-f-tile flex items-center justify-center text-[11px]">F</span>
          <span>{title}</span>
        </div>
      </div>
      <div className="p-0">{children}</div>
    </motion.div>
  );
}

/* Bir buton bileşeni — paylaşılan görsel, slaytlar arası tekrar kullanılır */
function SampleButton({
  label = "Devam et",
  variant = "primary",
  state = "default",
  size = "md",
}: {
  label?: string;
  variant?: "primary" | "secondary";
  state?: "default" | "hover" | "disabled";
  size?: "sm" | "md";
}) {
  const pad = size === "sm" ? "px-3 py-1.5 text-[10px]" : "px-5 py-2.5 text-[12px]";
  let bg = "linear-gradient(135deg, #ec4899, #be185d)";
  let color = "#ffffff";
  let border = "none";
  let opacity = 1;
  if (variant === "secondary") {
    bg = "transparent";
    color = "#ec4899";
    border = "1.5px solid #ec4899";
  }
  if (state === "hover" && variant === "primary") {
    bg = "linear-gradient(135deg, #f472b6, #db2777)";
  }
  if (state === "hover" && variant === "secondary") {
    bg = "rgba(236, 72, 153, 0.12)";
  }
  if (state === "disabled") {
    bg = variant === "primary" ? "#3f3f46" : "transparent";
    color = "#6b7280";
    border = variant === "secondary" ? "1.5px solid #3f3f46" : "none";
    opacity = 0.7;
  }
  return (
    <span
      className={`inline-flex items-center justify-center rounded-lg font-semibold ${pad}`}
      style={{ background: bg, color, border, opacity }}
    >
      {label}
    </span>
  );
}

/* Bileşen kavramı: bir master, çok sayıda instance */
function ComponentInstanceMockup() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch max-w-5xl mx-auto">
      {/* Master */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="katas-card-rose rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <ComponentIcon className="w-5 h-5 text-pink-300" />
          <span className="text-xs font-mono uppercase tracking-widest text-pink-300">
            Master / Ana bileşen
          </span>
        </div>
        <div className="flex items-center justify-center h-24 rounded-lg bg-black/30 border border-dashed border-pink-500/40">
          <SampleButton label="Buton" />
        </div>
        <p className="text-sm text-gray-300 mt-4 leading-relaxed">
          Tek bir kaynak doğru (single source of truth). Burada yapılan değişiklik
          tüm kopyalara <strong className="text-pink-300">otomatik</strong> yansır.
        </p>
      </motion.div>

      {/* Instances */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="katas-card rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Copy className="w-5 h-5 text-pink-400" />
          <span className="text-xs font-mono uppercase tracking-widest text-pink-300">
            Instance / Kopyalar
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            "Giriş ekranı",
            "Kayıt ekranı",
            "Ödeme akışı",
            "Profil sayfası",
          ].map((ctx) => (
            <div
              key={ctx}
              className="rounded-lg bg-black/20 border border-pink-500/15 p-3 flex flex-col items-center gap-2"
            >
              <SampleButton label="Buton" size="sm" />
              <span className="text-[10px] text-gray-500">{ctx}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-300 mt-4 leading-relaxed">
          Her kopya bağımsız metne/içeriğe sahip olabilir ama yapı ve stil
          ana bileşene bağlı kalır.
        </p>
      </motion.div>
    </div>
  );
}

/* Auto-layout: yatay vs dikey, padding ve gap */
function AutoLayoutMockup() {
  return (
    <FigmaFrameMockup title="auto-layout-demo.fig — Bileşen">
      <div className="flex h-[420px] bg-[#1e1e1e]">
        {/* Canvas */}
        <div className="flex-1 katas-figma-canvas flex items-center justify-center relative">
          <div className="absolute top-2 left-2 text-[9px] text-gray-500 font-mono">
            Card / Auto-layout · Vertical
          </div>
          {/* Auto-layout kart */}
          <div className="relative">
            {/* padding görselleştirme */}
            <div className="absolute -inset-3 rounded-xl border border-dashed border-pink-500/40" />
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono text-pink-300">
              padding 24
            </span>
            <div
              className="rounded-xl bg-white p-4 flex flex-col"
              style={{ width: 200, gap: 12 }}
            >
              <div className="h-16 rounded-md" style={{ background: "linear-gradient(135deg,#ec4899,#be185d)" }} />
              <div className="h-2.5 w-3/4 rounded bg-gray-300" />
              <div className="h-2 w-full rounded bg-gray-200" />
              <div className="h-2 w-5/6 rounded bg-gray-200" />
              <div className="flex justify-center pt-1">
                <SampleButton label="Detay" size="sm" />
              </div>
            </div>
            {/* gap işaretçisi */}
            <span className="absolute top-1/2 -right-14 text-[9px] font-mono text-cyan-300 flex items-center gap-1">
              <ArrowDownUp className="w-3 h-3" /> gap 12
            </span>
          </div>
        </div>
        {/* Properties */}
        <div className="katas-figma-panel w-[220px] flex flex-col border-l border-black/30">
          <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-gray-500 font-semibold border-b border-black/30">
            Auto Layout
          </div>
          <div className="p-3 space-y-3 text-[10px]">
            <div>
              <div className="text-gray-500 mb-1">Yön (Direction)</div>
              <div className="grid grid-cols-2 gap-1">
                <div className="bg-pink-500/20 text-pink-300 px-2 py-1.5 rounded flex items-center justify-center gap-1">
                  <ArrowDownUp className="w-3 h-3" /> Dikey
                </div>
                <div className="bg-[#1a1a1a] px-2 py-1.5 rounded text-gray-400 flex items-center justify-center gap-1">
                  <ArrowLeftRight className="w-3 h-3" /> Yatay
                </div>
              </div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Boşluk (Gap)</div>
              <div className="bg-[#1a1a1a] px-2 py-1 rounded text-gray-300">12 px</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">İç boşluk (Padding)</div>
              <div className="grid grid-cols-2 gap-1">
                <div className="bg-[#1a1a1a] px-2 py-1 rounded text-gray-300">↕ 24</div>
                <div className="bg-[#1a1a1a] px-2 py-1 rounded text-gray-300">↔ 24</div>
              </div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Hizalama (Align)</div>
              <div className="bg-[#1a1a1a] px-2 py-1 rounded text-gray-300 flex items-center gap-2">
                <AlignVerticalJustifyStart className="w-3 h-3" /> Üst · Ortala
              </div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Resize</div>
              <div className="bg-[#1a1a1a] px-2 py-1 rounded text-gray-300 flex items-center gap-2">
                <Maximize className="w-3 h-3" /> Hug contents
              </div>
            </div>
          </div>
        </div>
      </div>
    </FigmaFrameMockup>
  );
}

/* Variant matrisi: type × state */
function VariantMatrixMockup() {
  const types: Array<"primary" | "secondary"> = ["primary", "secondary"];
  const states: Array<"default" | "hover" | "disabled"> = [
    "default",
    "hover",
    "disabled",
  ];
  const stateLabel: Record<string, string> = {
    default: "Default",
    hover: "Hover",
    disabled: "Disabled",
  };
  const typeLabel: Record<string, string> = {
    primary: "Primary",
    secondary: "Secondary",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="katas-card-rose rounded-xl p-6 max-w-4xl mx-auto"
    >
      <div className="flex items-center gap-2 mb-5 text-xs font-mono uppercase tracking-widest text-pink-300">
        <Boxes className="w-4 h-4" />
        Button — 2 type × 3 state = 6 variant
      </div>
      <div className="overflow-hidden rounded-lg border border-pink-500/25">
        <table className="w-full">
          <thead>
            <tr>
              <th className="bg-black/30 px-3 py-2 text-left text-[10px] font-mono uppercase text-gray-500 w-28">
                type \ state
              </th>
              {states.map((s) => (
                <th
                  key={s}
                  className="bg-black/30 px-3 py-2 text-center text-[10px] font-mono uppercase text-pink-300"
                >
                  {stateLabel[s]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {types.map((t) => (
              <tr key={t}>
                <td className="px-3 py-3 text-[11px] font-mono text-pink-200 bg-black/20">
                  {typeLabel[t]}
                </td>
                {states.map((s) => (
                  <td key={s} className="px-3 py-3">
                    <div className="katas-variant-cell h-14">
                      <SampleButton label="Buton" variant={t} state={s} size="sm" />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-gray-500 mt-4 font-mono">
        Tek &quot;Button&quot; bileşeninin 6 varyantı tek bir component set
        altında toplanır.
      </p>
    </motion.div>
  );
}

/* Properties paneli: variant açılır menüleri */
function VariantPropsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="katas-figma-panel rounded-xl overflow-hidden border border-pink-500/25"
    >
      <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-gray-500 font-semibold border-b border-black/30 flex items-center gap-2">
        <SlidersHorizontal className="w-3 h-3" /> Component · Properties
      </div>
      <div className="p-3 space-y-3 text-[11px]">
        <div>
          <div className="text-gray-500 mb-1">type</div>
          <div className="bg-[#1a1a1a] px-2 py-1.5 rounded text-gray-200 flex items-center justify-between">
            <span>Primary</span>
            <ChevronRight className="w-3 h-3 rotate-90 text-gray-500" />
          </div>
        </div>
        <div>
          <div className="text-gray-500 mb-1">state</div>
          <div className="bg-[#1a1a1a] px-2 py-1.5 rounded text-gray-200 flex items-center justify-between">
            <span>Default</span>
            <ChevronRight className="w-3 h-3 rotate-90 text-gray-500" />
          </div>
        </div>
        <div>
          <div className="text-gray-500 mb-1 flex items-center gap-1">
            <Type className="w-3 h-3" /> label · Text property
          </div>
          <div className="bg-[#1a1a1a] px-2 py-1.5 rounded text-gray-200">Devam et</div>
        </div>
        <div>
          <div className="text-gray-500 mb-1 flex items-center gap-1">
            <ToggleLeft className="w-3 h-3" /> hasIcon · Boolean
          </div>
          <div className="bg-pink-500/20 text-pink-300 px-2 py-1.5 rounded flex items-center justify-between">
            <span>true</span>
            <Check className="w-3 h-3" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ─────────────────  01 · KAPAK  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2245 · 10. Hafta · Figma İleri Seviye</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-8xl font-bold tracking-tight leading-[1] mb-6"
        >
          <span className="katas-shimmer">Bileşenler</span>
          <br />
          <span className="text-white">Auto-Layout &amp; Variants</span>
        </motion.h1>
        <Sub className="mt-6 max-w-3xl mx-auto">
          Tek tek ekran çizmekten ölçeklenebilir tasarıma. Bu hafta Figma&apos;da
          yeniden kullanılabilir bileşenler, esnek yerleşim ve varyant sistemleri.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 grid grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          <FeatureCard
            icon={ComponentIcon}
            title="Bileşenler"
            desc="Master &amp; instance: bir kez tasarla, her yerde kullan."
            accent="#ec4899"
            delay={0.3}
          />
          <FeatureCard
            icon={Maximize}
            title="Auto-Layout"
            desc="İçerik değişince yerleşim kendiliğinden uyum sağlasın."
            accent="#a855f7"
            delay={0.45}
          />
          <FeatureCard
            icon={Boxes}
            title="Variants"
            desc="Bir bileşenin durum ve türlerini tek sette topla."
            accent="#3b82f6"
            delay={0.6}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-10 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/5 text-xs text-pink-300 font-mono"
        >
          <Calendar className="w-3 h-3" />
          Cuma · 15:20 — 17:00 · Uygulamalı Figma laboratuvarı
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  02 · KÖPRÜ / HEDEF  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 9. haftadan 10. haftaya</Eyebrow>
      <H2>Önce statik ekranlar çizdik; şimdi onları sisteme dönüştürüyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta wireframe ve ilk yüksek-çözünürlüklü ekranları Figma&apos;da
        kurduk. Aynı butonu, kartı, başlığı defalarca kopyaladık. Bir öğeyi
        değiştirince hepsini tek tek güncellemek gerekti. Bu haftanın derdi tam
        bu: tekrarı bitirmek.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="katas-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-red-300">
            <XCircle className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              9. hafta · elle kopyala-yapıştır
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-pink-400 flex-shrink-0" />Her butonu Ctrl+C / Ctrl+V ile çoğalttık.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-pink-400 flex-shrink-0" />Renk değişti — 40 ekranı tek tek düzelttik.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-pink-400 flex-shrink-0" />Metin uzayınca kutu taştı, hizalama bozuldu.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="katas-card-rose rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-emerald-300">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              10. hafta · bileşen sistemi
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />Bir &quot;ana bileşen&quot;, sayısız bağlı kopya.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />Tek değişiklik tüm kopyalara yansır.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />Auto-layout ile yerleşim içeriğe uyar.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  03 · DERSİN AKIŞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: bileşen → auto-layout → variant</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce yeniden kullanılabilirliğin temeli olan bileşeni kuruyoruz; sonra
        içeriğe uyum sağlayan auto-layout&apos;u; en son tek bileşende çok durumu
        toplayan varyantları. Sonunda kendi bileşen kütüphaneni kurduğun bir lab.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Bileşenler", items: ["Master & instance", "Override (üzerine yazma)", "Detach / ayırma"], icon: ComponentIcon, accent: "#ec4899" },
          { range: "02", title: "Auto-Layout", items: ["Yön, gap, padding", "Hug / Fill / Fixed", "İç içe (nested) yerleşim"], icon: Maximize, accent: "#a855f7" },
          { range: "03", title: "Variants", items: ["Property & değer", "Type × State matrisi", "Boolean & text property"], icon: Boxes, accent: "#3b82f6" },
        ].map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="katas-card rounded-xl p-6"
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

  /* ─────────────────  04 · DIVIDER 1/3 · BİLEŞENLER  ───────────────── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="Bileşenler"
      subtitle="Tasarımın yeniden kullanılabilir yapı taşı. Bir kez tanımla, her yerde aynı kalsın — tek noktadan güncellenebilsin."
      bgGradient="linear-gradient(135deg, #ec4899 0%, #be185d 100%)"
      shadow="0 0 60px rgba(236, 72, 153, 0.5)"
      icon={<ComponentIcon className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  05 · MASTER vs INSTANCE  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bileşen · Master &amp; Instance</Eyebrow>
      <H2 className="mb-2">Bir kaynak, sayısız kopya</H2>
      <Sub className="max-w-3xl mb-6">
        Bir öğeyi seçip <span className="katas-kbd">Ctrl</span>{" "}
        <span className="katas-kbd">Alt</span> <span className="katas-kbd">K</span>{" "}
        ile bileşene dönüştürürsün. Ana bileşen (master) değişikliğin kaynağıdır;
        her kullanım yeri bir kopyadır (instance) ve mor bir elmas simgesiyle gösterilir.
      </Sub>
      <ComponentInstanceMockup />
    </SlideShell>
  ),

  /* ─────────────────  06 · OVERRIDE & DETACH  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bileşen · Override &amp; Detach</Eyebrow>
      <H2 className="mb-2">Kopya ne kadar bağımsız?</H2>
      <Sub className="max-w-3xl mb-8">
        Kopyada metni, ikonu, rengi değiştirebilirsin — buna override (üzerine
        yazma) denir, yapısal bağ korunur. Bağı tamamen koparmak istersen detach
        edersin; o andan sonra master&apos;ı izlemez.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Wand2}
          title="Override"
          desc="Kopyanın metnini/rengini değiştir; yapı master'a bağlı kalır. Master güncellenince yapı yine yansır."
          accent="#ec4899"
          delay={0}
        />
        <FeatureCard
          icon={RefreshCw}
          title="Reset"
          desc="Kopyada yapılan tüm override'ları geri al; bileşeni fabrika ayarına döndür."
          accent="#a855f7"
          delay={0.12}
        />
        <FeatureCard
          icon={GitBranch}
          title="Detach"
          desc="Bağı kopar. Artık bağımsız katmanlardır; master değişse de etkilenmez. Geri dönüşü yoktur."
          accent="#3b82f6"
          delay={0.24}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 katas-card-rose rounded-xl p-5 flex items-start gap-3 max-w-4xl"
      >
        <Lightbulb className="w-5 h-5 text-pink-300 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-gray-300 leading-relaxed">
          Pratik kural: <strong className="text-pink-300">override yeter, detach gereksizdir</strong>.
          Detach edersen o öğe sistemden kopar; bileşenin tüm avantajını kaybedersin.
          Yalnızca gerçekten farklı bir öğeye dönüştürüyorsan detach et.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  07 · BİLEŞEN NEDEN ÖNEMLİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bileşen · neden önemli</Eyebrow>
      <H2>Tutarlılık + bakım = ölçeklenebilir tasarım</H2>
      <Sub className="mt-3 max-w-3xl">
        Bileşenler sadece zaman kazandırmaz; ürünün tutarlılığını garanti eder ve
        tasarım-geliştirme aktarımını kolaylaştırır.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 katas-card rounded-xl p-1"
      >
        <table className="katas-tbl">
          <thead>
            <tr>
              <th style={{ width: "26%" }}>Sorun (kopya-yapıştır)</th>
              <th style={{ width: "37%" }}>Bileşenle çözüm</th>
              <th>Kazanç</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Stil tutarsızlığı</td>
              <td>Tüm kopyalar tek master&apos;a bağlı; aynı görünür.</td>
              <td>Marka tutarlılığı</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Güncelleme zahmeti</td>
              <td>Master&apos;ı bir kez değiştir, hepsi güncellenir.</td>
              <td>Hızlı bakım</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Devasa dosya</td>
              <td>Tekrar eden katmanlar yerine paylaşılan bileşen.</td>
              <td>Daha hafif dosya</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Ekip kaosu</td>
              <td>Paylaşılan kütüphane (team library) ile ortak dil.</td>
              <td>Ölçeklenebilir iş akışı</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  08 · DIVIDER 2/3 · AUTO-LAYOUT  ───────────────── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Auto-Layout"
      subtitle="Yerleşimi sabit koordinatlardan kurtaran sistem. İçerik değişince çerçeve kendiliğinden büyür, küçülür, hizalanır."
      bgGradient="linear-gradient(135deg, #a855f7 0%, #ec4899 100%)"
      shadow="0 0 60px rgba(168, 85, 247, 0.5)"
      icon={<Maximize className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  09 · AUTO-LAYOUT NEDİR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Auto-Layout · temel kavram</Eyebrow>
      <H2 className="mb-2">İçerik yönlendirir, yerleşim uyum sağlar</H2>
      <Sub className="max-w-3xl mb-6">
        Bir çerçeveyi seç, <span className="katas-kbd">Shift</span>{" "}
        <span className="katas-kbd">A</span> ile auto-layout ekle. Artık öğeler
        bir satıra/sütuna dizilir; aralarındaki boşluğu (gap) ve kenar boşluğunu
        (padding) sayıyla yönetirsin. Bir öğe eklenince/silinince diğerleri kayar.
      </Sub>
      <AutoLayoutMockup />
    </SlideShell>
  ),

  /* ─────────────────  10 · RESIZING: HUG / FILL / FIXED  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Auto-Layout · boyutlandırma</Eyebrow>
      <H2 className="mb-2">Üç boyutlandırma davranışı</H2>
      <Sub className="max-w-3xl mb-8">
        Her auto-layout öğesi genişlik ve yükseklik için ayrı ayrı bir davranış
        seçer. Bu üçü karıştırılınca yerleşim &quot;neden böyle oldu&quot;
        sorusunun cevabı çoğunlukla buradadır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { name: "Hug contents", icon: Maximize, color: "#ec4899", what: "Kutu, içeriği kadar büyür/küçülür.", use: "Buton, etiket — metne göre sarılsın." },
          { name: "Fill container", icon: ArrowLeftRight, color: "#a855f7", what: "Kutu, üst çerçevenin kalan alanını kaplar.", use: "Arama çubuğu — satırda yayılsın." },
          { name: "Fixed", icon: Square, color: "#3b82f6", what: "Kutu sabit ölçüde kalır, içerik değişse de.", use: "Avatar, ikon — hep 40×40 kalsın." },
        ].map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="katas-card rounded-xl p-6"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ background: `${r.color}18`, border: `1px solid ${r.color}55` }}
            >
              <r.icon className="w-6 h-6" style={{ color: r.color }} />
            </div>
            <div className="font-mono text-base font-bold mb-2" style={{ color: r.color }}>{r.name}</div>
            <p className="text-sm text-gray-300 mb-3">{r.what}</p>
            <p className="text-xs text-gray-500 border-t border-white/5 pt-3">{r.use}</p>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  11 · DIVIDER 3/3 · VARIANTS  ───────────────── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Variants"
      subtitle="Bir bileşenin tüm durum ve türlerini tek bir set altında toplama yöntemi. Açılır menüden seçilen özelliklerle yönetilir."
      bgGradient="linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)"
      shadow="0 0 60px rgba(59, 130, 246, 0.5)"
      icon={<Boxes className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  12 · VARIANT MATRİSİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Variants · component set</Eyebrow>
      <H2 className="mb-2">Tek bileşen, çok durum</H2>
      <Sub className="max-w-3xl mb-6">
        Aynı işi yapan ama görünüşü değişen kopyaları (primary/secondary,
        default/hover/disabled) tek tek bileşen yapmak yerine birleştirip
        <strong className="text-pink-300"> variant</strong> yaparsın. Bir
        &quot;property&quot; ekleyip değerlerini tanımlarsın; matris kendiliğinden oluşur.
      </Sub>
      <VariantMatrixMockup />
    </SlideShell>
  ),

  /* ─────────────────  13 · PROPERTY TİPLERİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Variants · property tipleri</Eyebrow>
      <H2 className="mb-2">Dört özellik tipiyle bileşeni yapılandır</H2>
      <Sub className="max-w-3xl mb-6">
        Figma&apos;da bir bileşen, sağ panelden seçilen özelliklerle kullanılır.
        Dört property tipini doğru seçmek, geliştiriciye geçişi de netleştirir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="space-y-3">
          <FeatureCard
            icon={Boxes}
            title="Variant property"
            desc="Sınırlı seçenekli açılır menü: type = primary | secondary."
            accent="#ec4899"
            delay={0}
          />
          <FeatureCard
            icon={ToggleLeft}
            title="Boolean property"
            desc="Aç/kapa: hasIcon = true/false ile bir katmanı gösterip gizle."
            accent="#a855f7"
            delay={0.1}
          />
          <FeatureCard
            icon={Type}
            title="Text property"
            desc="Metni dışarıdan düzenlenebilir alan yap: label = 'Devam et'."
            accent="#3b82f6"
            delay={0.2}
          />
          <FeatureCard
            icon={Repeat}
            title="Instance swap"
            desc="İçteki bir kopyayı başka bir bileşenle değiştirilebilir kıl: ikon değişimi."
            accent="#10b981"
            delay={0.3}
          />
        </div>
        <VariantPropsPanel />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  14 · İYİ vs KÖTÜ VARIANT  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Variants · iyi pratik</Eyebrow>
      <H2 className="mb-2">Tutarlı property isimleri her şeyi değiştirir</H2>
      <Sub className="max-w-3xl mb-8">
        Variant gücü, property&apos;lerin tutarlı adlandırılmasından gelir.
        Karışık isimler matrisi bozar; geliştirici de hangi durumu çağıracağını anlamaz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="katas-card rounded-xl overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 border-b border-red-500/30">
            <XCircle className="w-4 h-4 text-red-400" />
            <span className="text-xs font-mono uppercase text-red-300">Kötü · tutarsız</span>
          </div>
          <div className="p-5 space-y-2 font-mono text-xs">
            <div className="bg-black/30 rounded px-3 py-2 text-gray-300">Button-Primary-Big</div>
            <div className="bg-black/30 rounded px-3 py-2 text-gray-300">btn secondary sm</div>
            <div className="bg-black/30 rounded px-3 py-2 text-gray-300">Buton/Mavi/Pasif</div>
            <div className="text-[11px] text-gray-500 pt-1 font-sans">
              Üç ayrı bileşen gibi davranır; tek matris kurulamaz.
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="katas-card-rose rounded-xl overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500/10 border-b border-emerald-500/30">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono uppercase text-emerald-300">İyi · property = değer</span>
          </div>
          <div className="p-5 space-y-2 font-mono text-xs">
            <div className="bg-black/30 rounded px-3 py-2 text-gray-300">
              type=<span className="text-pink-300">primary</span>, size=<span className="text-pink-300">md</span>, state=<span className="text-pink-300">default</span>
            </div>
            <div className="bg-black/30 rounded px-3 py-2 text-gray-300">
              type=<span className="text-pink-300">secondary</span>, size=<span className="text-pink-300">sm</span>, state=<span className="text-pink-300">default</span>
            </div>
            <div className="bg-black/30 rounded px-3 py-2 text-gray-300">
              type=<span className="text-pink-300">primary</span>, size=<span className="text-pink-300">md</span>, state=<span className="text-pink-300">disabled</span>
            </div>
            <div className="text-[11px] text-gray-500 pt-1 font-sans">
              Aynı &quot;property=value&quot; dili; matris düzenli ve genişletilebilir.
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  15 · BİLEŞEN ANATOMİSİ — HEPSİ BİRADA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Üçü birlikte · gerçek bir bileşen</Eyebrow>
      <H2 className="mb-2">Bileşen + Auto-Layout + Variant tek kartta</H2>
      <Sub className="max-w-3xl mb-6">
        Profesyonel bir kart bileşeni üç tekniği aynı anda kullanır: yeniden
        kullanılabilir bileşen, içeriğe uyan auto-layout ve durum varyantları.
        Sağdaki panel, geliştiricinin de okuyacağı özellik sözleşmesidir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="katas-card rounded-xl p-6 flex items-center justify-center"
        >
          <div className="rounded-xl bg-white p-4 flex flex-col w-[240px]" style={{ gap: 12 }}>
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-full" style={{ background: "linear-gradient(135deg,#ec4899,#be185d)" }} />
              <div className="flex flex-col">
                <span className="text-[12px] font-bold text-gray-900">Yağmur K.</span>
                <span className="text-[9px] text-gray-500">UI Tasarımcı</span>
              </div>
              <span className="ml-auto text-[9px] px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 font-semibold">Pro</span>
            </div>
            <div className="h-2.5 w-5/6 rounded bg-gray-300" />
            <div className="h-2 w-full rounded bg-gray-200" />
            <div className="h-2 w-2/3 rounded bg-gray-200" />
            <div className="flex gap-2 pt-1">
              <SampleButton label="Takip et" size="sm" />
              <SampleButton label="Mesaj" variant="secondary" size="sm" />
            </div>
          </div>
        </motion.div>
        <div className="space-y-3">
          <div className="katas-card rounded-lg p-4 flex items-start gap-3">
            <ComponentIcon className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-semibold text-white">Bileşen</div>
              <div className="text-xs text-gray-400">Card/User — kütüphanedeki tek kaynak.</div>
            </div>
          </div>
          <div className="katas-card rounded-lg p-4 flex items-start gap-3">
            <Maximize className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-semibold text-white">Auto-Layout</div>
              <div className="text-xs text-gray-400">Dikey, gap 12, padding 16; isim uzayınca kart büyür.</div>
            </div>
          </div>
          <div className="katas-card rounded-lg p-4 flex items-start gap-3">
            <Boxes className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-semibold text-white">Variant</div>
              <div className="text-xs text-gray-400">plan = free | pro · içteki rozet ve buton değişir.</div>
            </div>
          </div>
          <div className="katas-card rounded-lg p-4 flex items-start gap-3">
            <Repeat className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-semibold text-white">Nested instance</div>
              <div className="text-xs text-gray-400">İçindeki butonlar ayrı Button bileşeninin kopyası.</div>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  16 · UYGULAMALI LAB  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
      <H2>Kendi buton bileşenini sıfırdan kur</H2>
      <Sub className="mt-3 max-w-3xl">
        Lab tamamen Figma&apos;da, kendi dosyanda. Sonraki derse bu dört adımı
        tamamlamış ve kütüphane olarak yayınlamış gelmen bekleniyor.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: ComponentIcon, title: "Butonu bileşen yap", desc: "Bir buton çiz, Ctrl+Alt+K ile bileşene çevir. Adını Button/Primary koy.", accent: "#ec4899" },
          { icon: Maximize, title: "Auto-layout ekle", desc: "Shift+A ile auto-layout ver; padding 12/20, metin Hug olsun. Metni uzat, kutunun büyüdüğünü gör.", accent: "#a855f7" },
          { icon: Boxes, title: "Variant oluştur", desc: "state property ekle: default, hover, disabled. Üç görünümü matriste topla.", accent: "#3b82f6" },
          { icon: Type, title: "Text + boolean property", desc: "label'ı text property, ikonu boolean (hasIcon) yap. Kopyada metni override et.", accent: "#10b981" },
        ].map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="katas-card katas-card-hover rounded-xl p-5 flex items-start gap-4"
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
        className="mt-6 katas-card-rose rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <Target className="w-4 h-4 text-pink-300 mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Teslim:</span> bileşenini bir kez kullan,
          sonra master&apos;ın rengini değiştir ve tüm kopyaların güncellendiğini
          gösteren bir ekran görüntüsü ekle.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  17 · FIGMA KISAYOLLARI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Hız · sık kullanılan kısayollar</Eyebrow>
      <H2>Eli klavyede tut, akış bozulmasın</H2>
      <Sub className="mt-3 max-w-3xl">
        Bu hafta en çok dokunacağın komutlar. Kısayolları ezberlemek, bu konuyu
        pratikte hızlandıran en somut kazanç.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 katas-card rounded-xl p-1"
      >
        <table className="katas-tbl">
          <thead>
            <tr>
              <th style={{ width: "32%" }}>Kısayol</th>
              <th>Ne yapar?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="katas-kbd">Ctrl</span> <span className="katas-kbd">Alt</span> <span className="katas-kbd">K</span></td>
              <td>Seçili öğeyi bileşene (component) dönüştürür.</td>
            </tr>
            <tr>
              <td><span className="katas-kbd">Shift</span> <span className="katas-kbd">A</span></td>
              <td>Seçime auto-layout ekler.</td>
            </tr>
            <tr>
              <td><span className="katas-kbd">Ctrl</span> <span className="katas-kbd">Alt</span> <span className="katas-kbd">B</span></td>
              <td>Seçili kopyayı detach eder (bağı koparır).</td>
            </tr>
            <tr>
              <td><span className="katas-kbd">Alt</span> + sürükle</td>
              <td>Bir öğeyi anında çoğaltır (kopya çıkarır).</td>
            </tr>
            <tr>
              <td><span className="katas-kbd">Ctrl</span> <span className="katas-kbd">G</span></td>
              <td>Öğeleri grupla (auto-layout&apos;tan farklı, sadece gruplama).</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-[11px] text-gray-500 font-mono flex items-center gap-2"
      >
        <MousePointer2 className="w-3.5 h-3.5" />
        macOS&apos;ta <span className="text-pink-300">Ctrl</span> yerine{" "}
        <span className="text-pink-300">Cmd</span> kullanılır.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  18 · ARAÇ ÇUBUĞU HATIRLATMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Tuval · araç çubuğu</Eyebrow>
      <H2 className="mb-2">Bu hafta dokunacağın araçlar</H2>
      <Sub className="max-w-3xl mb-8">
        Bileşen kurarken sürekli geçeceğin temel araçlar. Çoğunun tek tuşluk
        kısayolu var; alttaki çubuk Figma&apos;daki sırayı taklit eder.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="katas-card rounded-2xl p-6 max-w-3xl mx-auto"
      >
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {[
            { Ic: MousePointer2, label: "Move", key: "V" },
            { Ic: Frame, label: "Frame", key: "F" },
            { Ic: Square, label: "Rectangle", key: "R" },
            { Ic: Type, label: "Text", key: "T" },
            { Ic: PenTool, label: "Pen", key: "P" },
            { Ic: Hand, label: "Hand", key: "H" },
          ].map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-12 h-12 rounded-lg bg-[#2c2c2c] border border-pink-500/20 flex items-center justify-center">
                <t.Ic className="w-5 h-5 text-pink-300" />
              </div>
              <span className="text-[10px] text-gray-400">{t.label}</span>
              <span className="katas-kbd">{t.key}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 text-center text-xs text-gray-500">
          Bir öğe çizip <span className="text-pink-300 font-mono">Ctrl+Alt+K</span> ile bileşene çevirdiğinde
          araç çubuğunun üstünde <X className="w-3 h-3 inline text-gray-500" /> yerine{" "}
          <ComponentIcon className="w-3 h-3 inline text-pink-300" /> elmas simgesini görürsün.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  19 · SIRADAKİ HAFTA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Hafta 11 · Önizleme</Eyebrow>
      <H2 className="mb-4">Sıradaki hafta: <span className="katas-shimmer">Prototipleme &amp; etkileşim</span></H2>
      <Sub className="mb-10 max-w-3xl">
        Bu hafta yeniden kullanılabilir bileşenleri kurduk. Gelecek hafta onları
        birbirine bağlayıp tıklanabilir bir akış haline getiriyoruz: ekranlar arası
        geçişler, variant&apos;lar arası etkileşim ve animasyon.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { i: GitBranch, t: "Akış bağlama", d: "Ekranları ok'larla bağla; tıklayınca nereye gidileceğini tanımla." },
          { i: RefreshCw, t: "Smart Animate", d: "Variant'lar arası yumuşak geçiş — hover, açılır menü, geçiş hareketi." },
          { i: Sparkles, t: "Sunum modu", d: "Prototype'ı tarayıcıda çalıştır, kullanıcıyla test et." },
        ].map((m, i) => (
          <motion.div
            key={m.t}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="katas-card-rose rounded-2xl p-6"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-rose-700 flex items-center justify-center mb-4 shadow-lg shadow-pink-500/30">
              <m.i className="w-7 h-7 text-white" />
            </div>
            <div className="text-xl font-bold text-white mb-2">{m.t}</div>
            <div className="text-sm text-gray-300 leading-relaxed">{m.d}</div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 flex items-center justify-center gap-3 text-sm text-gray-400"
      >
        <Calendar className="w-4 h-4 text-pink-400" />
        <span>Hazırlık: bu haftanın buton + kart bileşenlerini bitirmiş gel.</span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  20 · KAPANIŞ  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-3xl bg-gradient-to-br from-pink-500 to-rose-700 items-center justify-center mb-8 shadow-2xl shadow-pink-500/40"
        >
          <Boxes className="w-12 h-12 text-white" />
        </motion.div>

        <Eyebrow>10. hafta tamamlandı · özet</Eyebrow>
        <H1 className="mb-4">
          <span className="katas-shimmer">Bileşen · Auto-Layout · Variant</span>
        </H1>
        <Sub className="max-w-2xl mx-auto mb-10">
          Tek tek ekran çizmekten ölçeklenebilir bir tasarım sistemine geçtik.
          Yeniden kullanılabilirlik, esneklik ve tutarlılık artık elinde.
        </Sub>

        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mb-10">
          {[
            { i: ComponentIcon, l: "Bileşen", v: "Master & instance" },
            { i: Maximize, l: "Auto-Layout", v: "Hug · Fill · Fixed" },
            { i: Boxes, l: "Variant", v: "Property = value" },
          ].map((info, i) => (
            <motion.div
              key={info.l}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="katas-card rounded-xl p-5"
            >
              <info.i className="w-5 h-5 text-pink-400 mb-3 mx-auto" />
              <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">
                {info.l}
              </div>
              <div className="text-sm font-semibold text-white">{info.v}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
          <div className="katas-card rounded-xl p-5">
            <Clock className="w-5 h-5 text-pink-400 mb-3" />
            <div className="text-[10px] uppercase tracking-wider text-gray-500 font-mono mb-1">Ders saati</div>
            <div className="text-white font-semibold">Cuma</div>
            <div className="text-sm text-gray-400">15:20 — 17:00</div>
          </div>
          <div className="katas-card rounded-xl p-5">
            <GraduationCap className="w-5 h-5 text-pink-400 mb-3" />
            <div className="text-[10px] uppercase tracking-wider text-gray-500 font-mono mb-1">Konum</div>
            <div className="text-white font-semibold">EnerjiSA Bil. Lab 1</div>
            <div className="text-sm text-gray-400">Figma kurulu gel</div>
          </div>
          <div className="katas-card rounded-xl p-5">
            <Briefcase className="w-5 h-5 text-pink-400 mb-3" />
            <div className="text-[10px] uppercase tracking-wider text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">Buton bileşeni</div>
            <div className="text-sm text-gray-400">4 adım + ekran görüntüsü</div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10 flex items-center justify-center gap-3 text-xs text-gray-500 font-mono"
        >
          <Globe className="w-3 h-3" />
          <span>BVA 2245 · Kullanıcı Arayüzü Tasarımı · 2026 Bahar · Hafta 10</span>
          <Hash className="w-3 h-3" />
          <Brain className="w-3 h-3" />
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
            background: "linear-gradient(90deg, #ec4899, #f472b6, #ec4899)",
            boxShadow: "0 0 16px rgba(236,72,153,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#ec4899]/70">
          BVA 2245 · 10. Hafta · Bileşenler, Auto-Layout &amp; Variants
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[#ec4899]/50">
            <span className="text-[#ec4899]">
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
            className="p-1.5 text-gray-500 hover:text-[#ec4899] transition-colors"
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
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#ec4899] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
                  ? "w-5 bg-[#ec4899]"
                  : "w-1.5 bg-white/15 hover:bg-white/40"
              }`}
              style={
                i === current
                  ? { boxShadow: "0 0 10px rgba(236,72,153,0.6)" }
                  : undefined
              }
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#ec4899] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
