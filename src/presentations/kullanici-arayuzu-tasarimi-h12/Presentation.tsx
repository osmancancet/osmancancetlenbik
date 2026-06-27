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
  Layers,
  Palette,
  Type,
  Boxes,
  Component,
  Package,
  Ruler,
  GitBranch,
  Apple,
  Smartphone,
  Wind,
  Check,
  X,
  Copy,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Calendar,
  Target,
  Sparkles,
  Hash,
  BookOpen,
  Accessibility,
  ToggleLeft,
  ListChecks,
  Library,
  Braces,
  AlertTriangle,
  CheckCircle2,
  Globe,
  type LucideIcon,
} from "lucide-react";
import "./styles.css";

/* ============================================================
   PRIMITIVES  (h01 ile birebir aynı)
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
   TOPIC-SPECIFIC MOCKUPS  (Hafta 12 · Tasarım sistemleri)
   ============================================================ */

/* Pencere kromu — kod / token örnekleri için (h01 Figma chrome ile aynı stil) */
function CodeWindow({
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
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-mono flex-1 max-w-md mx-auto text-center justify-center"
          style={{ background: "#0d0d0d", color: "#f9a8d4" }}
        >
          <Braces className="w-3.5 h-3.5" />
          <span>{title}</span>
        </div>
      </div>
      <div className="katas-terminal">{children}</div>
    </motion.div>
  );
}

/* Tasarım sistemi katman piramidi: token → bileşen → desen */
function SystemLayers() {
  const rows = [
    {
      label: "Foundations · Tokens",
      desc: "Renk, tipografi, boşluk, gölge, yarıçap — en küçük karar birimleri.",
      color: "#ec4899",
      width: "100%",
      icon: Palette,
    },
    {
      label: "Components",
      desc: "Buton, input, kart, modal — token'lardan kurulu yeniden kullanılabilir parçalar.",
      color: "#a855f7",
      width: "78%",
      icon: Component,
    },
    {
      label: "Patterns",
      desc: "Form, navigasyon, boş durum — bileşenlerin tekrar eden birleşimleri.",
      color: "#3b82f6",
      width: "56%",
      icon: Boxes,
    },
    {
      label: "Guidelines",
      desc: "Ne zaman hangisini kullanmalı? Erişilebilirlik, ses-ton, içerik kuralları.",
      color: "#10b981",
      width: "34%",
      icon: BookOpen,
    },
  ];
  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {rows.map((r, i) => (
        <motion.div
          key={r.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + i * 0.12 }}
          className="mx-auto rounded-xl px-5 py-4 flex items-center gap-4"
          style={{
            width: r.width,
            background: `${r.color}12`,
            border: `1px solid ${r.color}45`,
          }}
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: `${r.color}22`, border: `1px solid ${r.color}55` }}
          >
            <r.icon className="w-5 h-5" style={{ color: r.color }} />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">{r.label}</div>
            <div className="text-xs text-gray-400 leading-snug">{r.desc}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* Renk + token swatch'ları */
function TokenSwatches() {
  const tokens = [
    { name: "color.brand.500", hex: "#ec4899" },
    { name: "color.brand.700", hex: "#be185d" },
    { name: "color.accent.500", hex: "#a855f7" },
    { name: "color.info.500", hex: "#3b82f6" },
    { name: "color.success.500", hex: "#10b981" },
    { name: "color.neutral.900", hex: "#111827" },
  ];
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
      {tokens.map((t, i) => (
        <motion.div
          key={t.name}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.08 }}
          className="katas-swatch"
        >
          <div className="katas-swatch-chip" style={{ background: t.hex }} />
          <div className="katas-swatch-meta">
            <div className="text-[#f9a8d4]">{t.name}</div>
            <div className="text-gray-500">{t.hex}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* Buton bileşeninin varyant + durum matrisi */
function ButtonVariantMatrix() {
  const variants = [
    { name: "Primary", base: "katas-form-good-btn", outline: false },
    { name: "Secondary", base: "", outline: true },
    { name: "Ghost", base: "", outline: false },
  ];
  const states = ["Default", "Hover", "Disabled"];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="katas-card rounded-xl p-6 max-w-3xl mx-auto"
    >
      <div className="grid grid-cols-4 gap-3 items-center">
        <div />
        {states.map((s) => (
          <div
            key={s}
            className="text-center text-[10px] font-mono uppercase tracking-widest text-gray-500"
          >
            {s}
          </div>
        ))}
        {variants.map((v) => (
          <ButtonRow key={v.name} name={v.name} outline={v.outline} primary={v.base !== ""} />
        ))}
      </div>
      <div className="mt-5 text-[11px] text-gray-500 font-mono">
        3 varyant &times; 3 durum = 9 hücre. Hepsi <span className="text-[#f9a8d4]">aynı token&apos;ları</span> kullanır — tek değişiklik tüm matrisi günceller.
      </div>
    </motion.div>
  );
}

function ButtonRow({
  name,
  outline,
  primary,
}: {
  name: string;
  outline: boolean;
  primary: boolean;
}) {
  function btn(state: "default" | "hover" | "disabled") {
    const label = "Kaydet";
    if (primary) {
      const op = state === "hover" ? 1 : state === "disabled" ? 0.4 : 0.92;
      return (
        <span
          className="inline-block text-[11px] font-semibold text-white rounded-md px-3 py-1.5"
          style={{
            background:
              state === "hover"
                ? "linear-gradient(135deg, #f472b6, #db2777)"
                : "linear-gradient(135deg, #ec4899, #be185d)",
            opacity: op,
          }}
        >
          {label}
        </span>
      );
    }
    if (outline) {
      return (
        <span
          className="inline-block text-[11px] font-semibold rounded-md px-3 py-1.5"
          style={{
            border: "1px solid #ec4899",
            color: state === "disabled" ? "#9d174d" : "#f9a8d4",
            background: state === "hover" ? "rgba(236,72,153,0.12)" : "transparent",
            opacity: state === "disabled" ? 0.45 : 1,
          }}
        >
          {label}
        </span>
      );
    }
    return (
      <span
        className="inline-block text-[11px] font-semibold rounded-md px-3 py-1.5"
        style={{
          color: state === "disabled" ? "#6b7280" : "#f9a8d4",
          background: state === "hover" ? "rgba(236,72,153,0.10)" : "transparent",
          opacity: state === "disabled" ? 0.6 : 1,
        }}
      >
        {label}
      </span>
    );
  }
  return (
    <>
      <div className="text-xs font-semibold text-white">{name}</div>
      <div className="text-center">{btn("default")}</div>
      <div className="text-center">{btn("hover")}</div>
      <div className="text-center">{btn("disabled")}</div>
    </>
  );
}

/* Tailwind utility → ham CSS karşılaştırması */
function TailwindCompare() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="katas-card rounded-xl overflow-hidden"
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-pink-500/10 border-b border-pink-500/30">
          <Wind className="w-4 h-4 text-pink-300" />
          <span className="text-xs font-mono uppercase text-pink-200">Utility-first (Tailwind)</span>
        </div>
        <div className="katas-terminal text-[11px]">
          <div>
            <span className="katas-term-dim">{"<button class="}</span>
            <span className="katas-term-str">&quot;px-4 py-2 rounded-lg</span>
          </div>
          <div className="pl-6">
            <span className="katas-term-str">bg-pink-600 text-white</span>
          </div>
          <div className="pl-6">
            <span className="katas-term-str">hover:bg-pink-700&quot;</span>
            <span className="katas-term-dim">{">Kaydet</button>"}</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.35 }}
        className="katas-card rounded-xl overflow-hidden"
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border-b border-purple-500/30">
          <Braces className="w-4 h-4 text-purple-300" />
          <span className="text-xs font-mono uppercase text-purple-200">Klasik CSS</span>
        </div>
        <div className="katas-terminal text-[11px]">
          <div>
            <span className="katas-term-key">.btn</span>
            <span className="katas-term-dim"> {"{"}</span>
          </div>
          <div className="pl-4">
            <span className="katas-term-key">padding</span>
            <span className="katas-term-dim">: </span>
            <span className="katas-term-num">8px 16px</span>
            <span className="katas-term-dim">;</span>
          </div>
          <div className="pl-4">
            <span className="katas-term-key">border-radius</span>
            <span className="katas-term-dim">: </span>
            <span className="katas-term-num">8px</span>
            <span className="katas-term-dim">;</span>
          </div>
          <div className="pl-4">
            <span className="katas-term-key">background</span>
            <span className="katas-term-dim">: </span>
            <span className="katas-term-num">#db2777</span>
            <span className="katas-term-dim">;</span>
          </div>
          <div>
            <span className="katas-term-dim">{"}"}</span>
            <span className="katas-term-dim"> /* + :hover ayrı blok */</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ───── 01 · KAPAK ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2245 · 12. Hafta · Tasarım Sistemleri</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-8xl font-bold tracking-tight leading-[1] mb-6"
        >
          <span className="katas-shimmer">Tasarım Sistemleri</span>
          <br />
          <span className="text-white">&amp; Component Library</span>
        </motion.h1>
        <Sub className="mt-6 max-w-3xl mx-auto">
          Tek tek ekran çizmekten, ölçeklenebilir bir dil kurmaya. Token&apos;dan
          bileşene, Material&apos;dan Apple HIG ve Tailwind UI&apos;a.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 grid grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          <FeatureCard
            icon={Boxes}
            title="Material Design"
            desc="Google'ın açık, kapsamlı ve cihazlar arası tasarım sistemi."
            delay={0.6}
            accent="#10b981"
          />
          <FeatureCard
            icon={Apple}
            title="Apple HIG"
            desc="iOS / macOS için Human Interface Guidelines."
            delay={0.7}
            accent="#a855f7"
          />
          <FeatureCard
            icon={Wind}
            title="Tailwind UI"
            desc="Utility-first CSS üzerine kurulu hazır bileşen kütüphanesi."
            delay={0.8}
            accent="#ec4899"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-10 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/5 text-xs text-pink-300 font-mono"
        >
          <Calendar className="w-3 h-3" />
          Cuma 15:20 — 17:00 · EnerjiSA Bil. Lab 1
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 02 · KÖPRÜ / HEDEF ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 11. haftadan 12. haftaya</Eyebrow>
      <H2>Tek ekrandan, ölçeklenebilir bir dile</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta tek tek bileşenler (buton, kart, input) tasarladık. Ama bir
        ürün yüzlerce ekrandan oluşur. Her ekranda butonu yeniden çizmek tutarsızlık
        ve tekrar üretir. Çözüm: bir <strong className="text-pink-300">tasarım sistemi</strong>.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="katas-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#f9a8d4]">
            <X className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Sistemsiz</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ec4899] flex-shrink-0" />Aynı buton 5 ekranda 5 farklı pembe.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ec4899] flex-shrink-0" />Her tasarımcı kendi boşluk değerini uydurur.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ec4899] flex-shrink-0" />Tek bir renk değişikliği = saatlerce el işi.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="katas-card-rose rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <Check className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Tasarım sistemiyle</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />Tek bir &quot;buton&quot; tanımı; her yerde aynı.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />Token tabanlı kararlar — paylaşılmış dil.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />Tasarımcı &amp; geliştirici aynı kaynağa bakar.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 03 · DERSİN AKIŞI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: anatomi → standartlar → uygulama</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce bir tasarım sisteminin neden ve katmanlarını kuruyoruz; sonra üç büyük
        endüstri standardını karşılaştırıyoruz; en son kendi component library&apos;mizi
        kurmaya başlıyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Anatomi", items: ["Tasarım sistemi nedir?", "Token → bileşen → desen", "Tek doğruluk kaynağı"], icon: Layers, accent: "#ec4899" },
          { range: "02", title: "Standartlar", items: ["Material Design 3", "Apple HIG", "Tailwind UI / utility-first"], icon: Library, accent: "#a855f7" },
          { range: "03", title: "Uygulama", items: ["Component library kurmak", "Varyant & durum", "Figma + kod senkronu"], icon: Component, accent: "#10b981" },
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

  /* ───── 04 · BÖLÜM 1 ───── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="Tasarım Sisteminin Anatomisi"
      subtitle="Bir tasarım sistemi sadece bir UI kit değildir; karar, kod ve dokümantasyonun paylaşılmış kaynağıdır."
      bgGradient="linear-gradient(135deg, #ec4899 0%, #be185d 100%)"
      shadow="0 0 60px rgba(236, 72, 153, 0.5)"
      icon={<Layers className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 05 · TASARIM SİSTEMİ NEDİR ───── */
  () => (
    <SlideShell>
      <Eyebrow>Tanım · Design System</Eyebrow>
      <H2 className="mb-2">Tasarım sistemi nedir, ne değildir?</H2>
      <Sub className="max-w-3xl mb-8">
        Tasarım sistemi; ortak ilkeler, yeniden kullanılabilir bileşenler ve
        bunları nasıl kullanacağını anlatan kurallardan oluşan canlı bir bütündür.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="katas-card-rose rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4 text-[#f9a8d4]">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Dahildir</span>
          </div>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />Tasarım ilkeleri (örn. &quot;net &amp; erişilebilir&quot;).</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />Token&apos;lar: renk, tipografi, boşluk, gölge.</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />Kodlu bileşen kütüphanesi (React, Vue vb.).</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />Kullanım kuralları &amp; örnekleri (docs).</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="katas-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4 text-gray-400">
            <AlertTriangle className="w-5 h-5 text-[#fbbf24]" />
            <span className="text-xs font-mono uppercase tracking-widest">Yaygın yanlış anlama</span>
          </div>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-2"><X className="w-4 h-4 mt-0.5 text-red-400 flex-shrink-0" />Sadece bir Figma sticker-sheet değildir.</li>
            <li className="flex gap-2"><X className="w-4 h-4 mt-0.5 text-red-400 flex-shrink-0" />Tek seferlik bir proje değil; sürekli bakımı olan bir <strong className="text-white">ürün</strong>dür.</li>
            <li className="flex gap-2"><X className="w-4 h-4 mt-0.5 text-red-400 flex-shrink-0" />Yaratıcılığı öldürmez; tekrar eden kararları otomatikleştirir.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 06 · KATMANLAR (token → desen) ───── */
  () => (
    <SlideShell>
      <Eyebrow>Anatomi · katmanlar</Eyebrow>
      <H2 className="mb-2">Atomdan ekrana: dört katman</H2>
      <Sub className="max-w-3xl mb-8">
        Brad Frost&apos;un &quot;Atomic Design&quot; mantığına benzer biçimde, bir sistem
        küçük token&apos;lardan büyük desenlere doğru kademelenir. Üsttekiler alttakileri kullanır.
      </Sub>
      <SystemLayers />
    </SlideShell>
  ),

  /* ───── 07 · TOKEN'LAR ───── */
  () => (
    <SlideShell>
      <Eyebrow>Foundations · Design Tokens</Eyebrow>
      <H2 className="mb-2">Token: tasarımın değişken adı</H2>
      <Sub className="max-w-3xl mb-6">
        Token, &quot;#ec4899&quot; yerine <span className="font-mono text-[#f9a8d4]">color.brand.500</span>
        demektir. Değeri tek yerde değiştir, tüm üründe yansısın. Tasarımcı ile geliştirici
        aynı isimleri konuşur.
      </Sub>
      <div className="mb-6">
        <TokenSwatches />
      </div>
      <CodeWindow title="tokens.json — W3C Design Tokens formatı">
        <div><span className="katas-term-dim">{"{"}</span></div>
        <div className="pl-3"><span className="katas-term-key">&quot;color.brand.500&quot;</span><span className="katas-term-dim">: {"{"} </span><span className="katas-term-key">&quot;value&quot;</span><span className="katas-term-dim">: </span><span className="katas-term-str">&quot;#ec4899&quot;</span><span className="katas-term-dim"> {"}"},</span></div>
        <div className="pl-3"><span className="katas-term-key">&quot;space.4&quot;</span><span className="katas-term-dim">{"        "}: {"{"} </span><span className="katas-term-key">&quot;value&quot;</span><span className="katas-term-dim">: </span><span className="katas-term-str">&quot;16px&quot;</span><span className="katas-term-dim"> {"}"},</span></div>
        <div className="pl-3"><span className="katas-term-key">&quot;radius.lg&quot;</span><span className="katas-term-dim">{"   "}: {"{"} </span><span className="katas-term-key">&quot;value&quot;</span><span className="katas-term-dim">: </span><span className="katas-term-str">&quot;12px&quot;</span><span className="katas-term-dim"> {"}"},</span></div>
        <div className="pl-3"><span className="katas-term-key">&quot;font.body&quot;</span><span className="katas-term-dim">{"   "}: {"{"} </span><span className="katas-term-key">&quot;value&quot;</span><span className="katas-term-dim">: </span><span className="katas-term-str">&quot;Inter, 16px/1.5&quot;</span><span className="katas-term-dim"> {"}"}</span></div>
        <div><span className="katas-term-dim">{"}"}</span></div>
        <div className="katas-term-dim mt-2">// Style Dictionary bunu CSS değişkenine, Android XML&apos;e, iOS Swift&apos;e üretir.</div>
      </CodeWindow>
    </SlideShell>
  ),

  /* ───── 08 · BÖLÜM 2 ───── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Üç Büyük Standart"
      subtitle="Material, HIG ve Tailwind UI — farklı felsefeler, farklı platformlar. Hangisini ne zaman seçersin?"
      bgGradient="linear-gradient(135deg, #a855f7 0%, #ec4899 100%)"
      shadow="0 0 60px rgba(168, 85, 247, 0.5)"
      icon={<Library className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 09 · KARŞILAŞTIRMA TABLOSU ───── */
  () => (
    <SlideShell>
      <Eyebrow>Standartlar · karşılaştırma</Eyebrow>
      <H2>Material vs HIG vs Tailwind UI</H2>
      <Sub className="mt-3 max-w-3xl">
        Üçü de tasarım sistemidir; ama amaç, platform ve özgürlük dereceleri ayrışır.
        Doğru seçim, ürünün hedef platformuna ve ekibine bağlıdır.
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
              <th style={{ width: "20%" }}>Boyut</th>
              <th style={{ width: "27%" }}>Material Design 3</th>
              <th style={{ width: "27%" }}>Apple HIG</th>
              <th>Tailwind UI</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Sahibi</td>
              <td>Google</td>
              <td>Apple</td>
              <td>Tailwind Labs</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Ana platform</td>
              <td>Android &amp; Web (cihaz bağımsız)</td>
              <td>iOS · iPadOS · macOS</td>
              <td>Web (HTML + utility CSS)</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Türü</td>
              <td>Kapsamlı yönerge + bileşen + token</td>
              <td>Yönerge (guideline) ağırlıklı</td>
              <td>Hazır bileşen markup&apos;ları</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Özelleştirme</td>
              <td>Orta — &quot;Material You&quot; ile dinamik tema</td>
              <td>Düşük — platform tutarlılığı esas</td>
              <td>Yüksek — her şey utility ile değişir</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Lisans</td>
              <td>Açık / ücretsiz</td>
              <td>Apple platformları için</td>
              <td>Ücretli (kaynak markup)</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 10 · MATERIAL & HIG İLKELERİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Standartlar · felsefeler</Eyebrow>
      <H2>Her sistemin bir &quot;dünya görüşü&quot; var</H2>
      <Sub className="mt-3 mb-8 max-w-3xl">
        Bileşenler benzer görünse de altta yatan ilkeler farklıdır. Bir sistemi kullanmak,
        onun ilkelerini de benimsemek demektir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Boxes}
          title="Material · &quot;dijital kâğıt&quot;"
          desc="Yükseklik (elevation), gölge ve hareket ile katmanlı, fiziksel hisli arayüz. Belirgin durum geçişleri."
          accent="#10b981"
          delay={0.1}
        />
        <FeatureCard
          icon={Apple}
          title="HIG · &quot;içerik öne çıksın&quot;"
          desc="Netlik, deference (içeriğe yol verme) ve derinlik. Sistem hissi tutarlı; bileşenler platformla bütünleşir."
          accent="#a855f7"
          delay={0.2}
        />
        <FeatureCard
          icon={Wind}
          title="Tailwind · &quot;kısıtlı özgürlük&quot;"
          desc="Önceden tanımlı ölçek (spacing, renk) ile sınırlandırılmış ama markup'ta tam kontrollü utility yaklaşımı."
          accent="#ec4899"
          delay={0.3}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 katas-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3 max-w-4xl"
      >
        <Accessibility className="w-4 h-4 text-[#ec4899] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Ortak nokta:</span> Üçü de erişilebilirliği (kontrast, dokunma hedefi boyutu,
          klavye/odak) temel kabul eder. Sistem seçimi erişilebilirliği &quot;bedava&quot; getirmez ama kolaylaştırır.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 11 · TAILWIND UTILITY-FIRST ───── */
  () => (
    <SlideShell>
      <Eyebrow>Tailwind · utility-first</Eyebrow>
      <H2 className="mb-2">Sınıf isimleri yerine, hazır araçlar</H2>
      <Sub className="max-w-3xl mb-6">
        Tailwind&apos;de stil doğrudan markup&apos;ta küçük &quot;utility&quot; sınıflarıyla yazılır.
        Token&apos;lar (spacing, renk ölçeği) sınıf adlarının içine gömülüdür; bu da tutarlılığı zorlar.
      </Sub>
      <TailwindCompare />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl mx-auto text-xs"
      >
        <div className="katas-card rounded-lg p-3 flex items-center gap-2 text-gray-300">
          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" /> İsim uydurma yok, hızlı prototip
        </div>
        <div className="katas-card rounded-lg p-3 flex items-center gap-2 text-gray-300">
          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Token&apos;lar ölçeğe gömülü
        </div>
        <div className="katas-card rounded-lg p-3 flex items-center gap-2 text-gray-300">
          <AlertTriangle className="w-4 h-4 text-[#fbbf24] flex-shrink-0" /> Uzun class — tekrar için bileşen şart
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 12 · BÖLÜM 3 ───── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Component Library Kurmak"
      subtitle="Standartları anladık; şimdi kendi sistemimizi kuruyoruz. Varyant, durum, dokümantasyon ve kod senkronu."
      bgGradient="linear-gradient(135deg, #f472b6 0%, #a855f7 100%)"
      shadow="0 0 60px rgba(244, 114, 182, 0.5)"
      icon={<Component className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 13 · VARYANT & DURUM MATRİSİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Component library · anatomi</Eyebrow>
      <H2 className="mb-2">Bir bileşen = varyantlar &times; durumlar</H2>
      <Sub className="max-w-3xl mb-6">
        İyi bir bileşen tek bir görsel değildir. Her bileşen birden çok
        <span className="text-pink-300"> varyant</span> (primary, secondary...) ve
        <span className="text-pink-300"> durum</span> (default, hover, disabled...) tanımlar.
        Figma&apos;da &quot;Component Properties&quot;, kodda &quot;props&quot; bunu temsil eder.
      </Sub>
      <ButtonVariantMatrix />
    </SlideShell>
  ),

  /* ───── 14 · FIGMA ↔ KOD SENKRONU ───── */
  () => (
    <SlideShell>
      <Eyebrow>Tek doğruluk kaynağı · single source of truth</Eyebrow>
      <H2 className="mb-2">Figma ile kod nasıl senkron kalır?</H2>
      <Sub className="max-w-3xl mb-8">
        Tasarım ve kodun ayrışması en sık karşılaşılan sorundur. Çözüm, token&apos;ları
        tek bir kaynaktan (örn. JSON) üretip her iki tarafa dağıtmaktır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
        <FeatureCard
          icon={Palette}
          title="1 · Figma Variables"
          desc="Renk, boşluk, tipografi Figma'da değişken olarak tanımlanır; tasarımcı burada düzenler."
          accent="#ec4899"
          delay={0.1}
        />
        <FeatureCard
          icon={GitBranch}
          title="2 · Token dosyası"
          desc="Token'lar JSON olarak dışa aktarılır ve sürüm kontrolüne (Git) girer — tek kaynak burası."
          accent="#a855f7"
          delay={0.2}
        />
        <FeatureCard
          icon={Braces}
          title="3 · Koda üretim"
          desc="Style Dictionary gibi araçlar JSON'u CSS değişkenine / Tailwind config'e çevirir."
          accent="#10b981"
          delay={0.3}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 flex items-center justify-center gap-3 text-sm text-gray-400 font-mono"
      >
        <span className="text-[#f9a8d4]">Figma</span>
        <ChevronRight className="w-4 h-4 text-gray-600" />
        <span className="text-[#c4b5fd]">tokens.json (Git)</span>
        <ChevronRight className="w-4 h-4 text-gray-600" />
        <span className="text-[#86efac]">CSS / Tailwind / iOS / Android</span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 15 · UYGULAMALI LAB ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
      <H2>Kendi mini tasarım sistemini kur</H2>
      <Sub className="mt-3 max-w-3xl">
        Figma&apos;da küçük ama tam bir component library. Sonraki derse bunu kurulmuş ve
        bir ekranda kullanmış gelmen bekleniyor.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Palette, title: "Token tabanını tanımla", desc: "Figma Variables ile 6 renk, 4 boşluk (4/8/16/24) ve 2 yazı stili oluştur.", accent: "#ec4899" },
          { icon: Component, title: "Buton bileşenini kur", desc: "3 varyant (primary/secondary/ghost) ve 3 durum (default/hover/disabled) — toplam 9 hücre.", accent: "#a855f7" },
          { icon: ToggleLeft, title: "Properties ekle", desc: "Component Properties ile 'variant' ve 'state' özelliklerini tek bileşende parametrik hale getir.", accent: "#3b82f6" },
          { icon: ListChecks, title: "Bir ekranda kullan", desc: "Oluşturduğun bileşenle küçük bir 'giriş' ekranı kur; sadece token'larla renklendir.", accent: "#10b981" },
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
        <Copy className="w-4 h-4 text-[#f9a8d4] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">İpucu:</span> Bileşeni baştan &quot;component&quot; olarak oluştur; sonradan kopyalanmış
          katmanları bileşene çevirmek çok daha zahmetlidir. Önce token, sonra bileşen, en son ekran.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 16 · SIRADAKİ HAFTA + KAPANIŞ ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8"
          style={{ background: "linear-gradient(135deg, #ec4899, #be185d)", boxShadow: "0 30px 80px -20px rgba(236,72,153,0.6)" }}
        >
          <Package className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>12. hafta tamamlandı · sıradaki: Prototipleme &amp; Handoff</Eyebrow>
        <H1>
          <span className="katas-shimmer">Sistemi Harekete Geçir</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta tutarlı bir bileşen dili kurduk. 13. haftada bu bileşenleri
          tıklanabilir prototiplere bağlayacak ve geliştiriciye temiz bir &quot;handoff&quot;
          (devir) yapmayı öğreneceğiz.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="katas-card rounded-xl p-5">
            <Ruler className="w-5 h-5 text-[#ec4899] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Hatırla</div>
            <div className="text-white font-semibold">Token → Bileşen → Ekran</div>
            <div className="text-sm text-gray-400">tek doğruluk kaynağı</div>
          </div>
          <div className="katas-card rounded-xl p-5">
            <Target className="w-5 h-5 text-[#a855f7] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">Mini sistemini bitir</div>
            <div className="text-sm text-gray-400">buton + 1 ekran</div>
          </div>
          <div className="katas-card rounded-xl p-5">
            <Smartphone className="w-5 h-5 text-[#10b981] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">Figma dosyası</div>
            <div className="text-sm text-gray-400">9 hücreli buton matrisi</div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 flex items-center justify-center gap-2 text-xs font-mono text-gray-600"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>BVA 2245 · Kullanıcı Arayüzü Tasarımı · Hafta 12</span>
          <Hash className="w-3.5 h-3.5" />
          <Sparkles className="w-3.5 h-3.5" />
        </motion.div>
      </div>
    </SlideShell>
  ),
];

const TOTAL = slides.length;

/* ============================================================
   PRESENTATION ROOT  (h01 ile birebir aynı)
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
          BVA 2245 · 12. Hafta · Tasarım Sistemleri
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
