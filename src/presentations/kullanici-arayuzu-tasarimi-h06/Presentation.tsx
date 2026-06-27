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
  Type,
  AlignLeft,
  Heading,
  Ruler,
  Columns3,
  LayoutGrid,
  Eye,
  Layers,
  Scaling,
  Sparkles,
  Calendar,
  Target,
  ListChecks,
  PenTool,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  CheckCircle2,
  XCircle,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import "./styles.css";

/* ============================================================
   PRIMITIVES  (h01 ile birebir aynı — katas- öneki)
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
   KONUYA ÖZGÜ MOCKUP'LAR — Tipografi, hiyerarşi, ızgara
   ============================================================ */

/* Üç ana yazı tipi sınıfının canlı örneği */
function TypeAnatomyCard({
  family,
  classify,
  sampleClass,
  use,
  accent,
  delay = 0,
}: {
  family: string;
  classify: string;
  sampleClass: string;
  use: string;
  accent: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="katas-card rounded-xl overflow-hidden"
    >
      <div
        className="katas-canvas-white px-5 py-6 flex items-baseline justify-between"
        style={{ borderBottom: `2px solid ${accent}` }}
      >
        <span className={`${sampleClass} text-5xl font-semibold text-gray-900`}>Ag</span>
        <span className={`${sampleClass} text-sm text-gray-500`}>Tasarım 2026</span>
      </div>
      <div className="p-5">
        <div className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: accent }}>
          {classify}
        </div>
        <div className="text-base font-semibold text-white">{family}</div>
        <div className="text-sm text-gray-400 mt-2 leading-relaxed">{use}</div>
      </div>
    </motion.div>
  );
}

/* Modüler ölçek — orantılı tipografi merdiveni */
function TypeScaleLadder() {
  const steps = [
    { name: "Display", px: "48 px", role: "Sayfa kahramanı / kapak", size: "text-5xl" },
    { name: "H1", px: "36 px", role: "Bölüm başlığı", size: "text-4xl" },
    { name: "H2", px: "28 px", role: "Alt başlık", size: "text-3xl" },
    { name: "H3", px: "21 px", role: "Kart / blok başlığı", size: "text-2xl" },
    { name: "Body", px: "16 px", role: "Gövde metni (taban)", size: "text-base" },
    { name: "Small", px: "13 px", role: "Yardımcı / dipnot", size: "text-sm" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="katas-card rounded-xl katas-canvas-white p-6"
    >
      <div className="space-y-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + i * 0.08 }}
            className="flex items-baseline gap-4 border-b border-gray-100 pb-2 last:border-b-0"
          >
            <span className="w-16 text-[10px] font-mono uppercase tracking-wider text-pink-500 flex-shrink-0">
              {s.name}
            </span>
            <span className={`${s.size} font-semibold text-gray-900 leading-none`}>
              Ölçek
            </span>
            <span className="ml-auto text-[11px] font-mono text-gray-400 flex-shrink-0">
              {s.px}
            </span>
            <span className="hidden md:block w-44 text-xs text-gray-500 flex-shrink-0">
              {s.role}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 text-[11px] text-gray-400 font-mono">
        Oran ≈ 1.25 (majör üçlü) · her adım bir öncekinin katı — keyfi punto değil, sistem.
      </div>
    </motion.div>
  );
}

/* Görsel hiyerarşi: düz vs kademeli aynı kart */
function HierarchyCompare() {
  return (
    <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto">
      {/* Hiyerarşisiz */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="katas-card rounded-xl overflow-hidden"
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border-b border-red-500/30">
          <XCircle className="w-4 h-4 text-red-400" />
          <span className="text-xs font-mono uppercase text-red-300">Hiyerarşi yok · her şey eşit</span>
        </div>
        <div className="katas-canvas-white p-6 h-[300px]">
          <div className="text-base text-gray-800 leading-relaxed">
            Yıllık Tasarım Konferansı 2026 Kayıtlar Açıldı Erken kayıt indirimi 30 Haziran&apos;a
            kadar geçerli Konum Çevrim İçi ve Hibrit Kontenjan Sınırlıdır Hemen Kayıt Ol Konuşmacılar
            ve program yakında açıklanacak Sorular için iletişime geçin.
          </div>
        </div>
        <div className="px-4 py-3 text-xs text-gray-500 border-t border-white/5">
          Göz nereye bakacağını bilemez; okuyucu tek tek tarar, yorulur.
        </div>
      </motion.div>

      {/* Hiyerarşili */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="katas-card rounded-xl overflow-hidden"
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border-b border-emerald-500/30">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono uppercase text-emerald-300">Hiyerarşi var · net rota</span>
        </div>
        <div className="katas-canvas-white p-6 h-[300px] flex flex-col">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-pink-500 mb-1">
            27–28 Haziran 2026
          </div>
          <div className="text-2xl font-bold text-gray-900 leading-tight mb-2">
            Yıllık Tasarım Konferansı
          </div>
          <div className="text-sm text-gray-500 mb-4">
            Erken kayıt indirimi 30 Haziran&apos;a kadar. Çevrim içi ve hibrit, kontenjan sınırlı.
          </div>
          <button className="katas-form-good-btn text-xs w-fit flex items-center gap-1.5 mt-auto">
            Hemen Kayıt Ol <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="px-4 py-3 text-xs text-gray-500 border-t border-white/5">
          Boyut, ağırlık ve renk gözü sırayla yönlendirir: tarih → başlık → eylem.
        </div>
      </motion.div>
    </div>
  );
}

/* Hiyerarşi araçları — boyut/ağırlık/renk/boşluk merdiveni */
function HierarchyToolsDemo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="katas-card rounded-xl katas-canvas-white p-8 max-w-3xl mx-auto"
    >
      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-pink-500 mb-2">Boyut</div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-semibold text-gray-900">Aa</span>
            <span className="text-base text-gray-600">Aa</span>
            <span className="text-xs text-gray-400">Aa</span>
          </div>
        </div>
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-pink-500 mb-2">Ağırlık</div>
          <div className="flex items-baseline gap-3 text-2xl text-gray-900">
            <span className="font-black">Aa</span>
            <span className="font-semibold">Aa</span>
            <span className="font-light">Aa</span>
          </div>
        </div>
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-pink-500 mb-2">Renk / Kontrast</div>
          <div className="flex items-baseline gap-3 text-2xl font-semibold">
            <span className="text-gray-900">Aa</span>
            <span className="text-gray-500">Aa</span>
            <span className="text-gray-300">Aa</span>
          </div>
        </div>
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-pink-500 mb-2">Boşluk (yakınlık)</div>
          <div className="space-y-1">
            <div className="text-sm font-semibold text-gray-900">Başlık</div>
            <div className="text-xs text-gray-500">Hemen altındaki açıklama ona ait hisseder.</div>
            <div className="text-xs text-gray-300 pt-3">Uzaktaki satır ayrı bir gruptur.</div>
          </div>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-gray-100 text-[11px] text-gray-400 font-mono">
        Renge gerek kalmadan bile boyut + ağırlık + boşluk tek başına hiyerarşi kurar.
      </div>
    </motion.div>
  );
}

/* 12 kolon ızgara üzerine yerleşmiş bir layout */
function TwelveColumnGrid() {
  const blocks = [
    { label: "Header — 12 kolon", span: 12, color: "#ec4899" },
    { label: "Ana içerik — 8 kolon", span: 8, color: "#a855f7" },
    { label: "Kenar — 4 kolon", span: 4, color: "#3b82f6" },
    { label: "Kart 4", span: 4, color: "#10b981" },
    { label: "Kart 4", span: 4, color: "#10b981" },
    { label: "Kart 4", span: 4, color: "#10b981" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="katas-card rounded-xl p-6"
    >
      {/* kolon cetveli */}
      <div className="grid grid-cols-12 gap-2 mb-4 h-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="katas-grid-col rounded-sm flex items-end justify-center pb-1"
          >
            <span className="text-[8px] font-mono text-pink-300">{i + 1}</span>
          </div>
        ))}
      </div>
      {/* yerleşim blokları */}
      <div className="grid grid-cols-12 gap-2">
        {blocks.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.07 }}
            className="rounded-md px-3 py-4 text-xs font-semibold text-white flex items-center"
            style={{
              gridColumn: `span ${b.span} / span ${b.span}`,
              background: `${b.color}22`,
              border: `1px solid ${b.color}66`,
            }}
          >
            {b.label}
          </motion.div>
        ))}
      </div>
      <div className="mt-4 text-[11px] text-gray-500 font-mono flex flex-wrap gap-x-5 gap-y-1">
        <span>Kolon (column): içeriğin oturduğu şerit</span>
        <span>Oluk (gutter): kolonlar arası boşluk</span>
        <span>Kenar boşluğu (margin): tuvalin kenarı</span>
      </div>
    </motion.div>
  );
}

/* 8pt boşluk sistemi + baseline grid */
function SpacingSystem() {
  const tokens = [
    { name: "xs", v: 4 },
    { name: "sm", v: 8 },
    { name: "md", v: 16 },
    { name: "lg", v: 24 },
    { name: "xl", v: 32 },
    { name: "2xl", v: 48 },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="katas-card rounded-xl p-6"
      >
        <div className="text-xs font-mono uppercase tracking-widest text-[#ec4899] mb-4">
          8&apos;in katları · boşluk token&apos;ları
        </div>
        <div className="space-y-2.5">
          {tokens.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.07 }}
              className="flex items-center gap-3"
            >
              <span className="w-10 text-[11px] font-mono text-pink-300">{t.name}</span>
              <span
                className="h-4 rounded-sm"
                style={{ width: `${t.v * 2.4}px`, background: "linear-gradient(90deg,#ec4899,#be185d)" }}
              />
              <span className="text-[11px] font-mono text-gray-500">{t.v} px</span>
            </motion.div>
          ))}
        </div>
        <div className="text-[11px] text-gray-500 mt-4">
          Tek bir taban birim, sayısız tutarlı ölçü üretir; gözle &quot;biraz&quot; yerine sistem konuşur.
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.35 }}
        className="katas-card rounded-xl p-6"
      >
        <div className="text-xs font-mono uppercase tracking-widest text-[#ec4899] mb-4">
          Baseline grid · satırlar hizada
        </div>
        <div className="katas-canvas-white katas-baseline rounded-lg p-5">
          <div className="text-xl font-bold text-gray-900" style={{ lineHeight: "32px" }}>
            Hizalı tipografi
          </div>
          <div className="text-sm text-gray-600" style={{ lineHeight: "24px" }}>
            Satır yüksekliği 8&apos;in katı seçilince her metin satırı görünmez ızgara
            çizgilerine oturur. Farklı blokların metni yan yana hizalı kalır.
          </div>
        </div>
        <div className="text-[11px] text-gray-500 mt-4">
          Pembe çizgiler 8 px aralıklı baseline ızgarasıdır — yayında görünmez, hizada tutar.
        </div>
      </motion.div>
    </div>
  );
}

/* Figma "Type & Grid" workspace mockup */
function TypeGridWorkspace() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
          <span>tipografi-h06.fig — Type &amp; Grid</span>
        </div>
      </div>
      <div className="flex h-[420px] bg-[#1e1e1e]">
        {/* Sol: Text styles */}
        <div className="katas-figma-panel w-[190px] flex flex-col border-r border-black/30">
          <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-gray-500 font-semibold border-b border-black/30">
            Text styles
          </div>
          <div className="p-2 space-y-0.5 text-[10px]">
            <div className="katas-figma-row katas-figma-row-active">
              <Type className="w-3 h-3" />
              <span>Display / 48 · Bold</span>
            </div>
            <div className="katas-figma-row">
              <Type className="w-3 h-3 text-gray-400" />
              <span>Heading / 28 · Semibold</span>
            </div>
            <div className="katas-figma-row">
              <Type className="w-3 h-3 text-gray-400" />
              <span>Body / 16 · Regular</span>
            </div>
            <div className="katas-figma-row">
              <Type className="w-3 h-3 text-gray-400" />
              <span>Caption / 13 · Medium</span>
            </div>
            <div className="katas-figma-divider" />
            <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
              Layout grid
            </div>
            <div className="katas-figma-row">
              <Columns3 className="w-3 h-3 text-purple-400" />
              <span>Columns · 12</span>
            </div>
            <div className="katas-figma-row pl-5 text-gray-400">
              <span>Gutter · 16</span>
            </div>
            <div className="katas-figma-row pl-5 text-gray-400">
              <span>Margin · 24</span>
            </div>
          </div>
        </div>

        {/* Orta: Canvas */}
        <div className="flex-1 katas-figma-canvas flex items-center justify-center relative p-6">
          <div className="absolute top-2 left-2 text-[9px] text-gray-500 font-mono">
            Desktop — 1440 × 1024 · grid açık
          </div>
          <div className="w-full max-w-md katas-canvas-white rounded-lg overflow-hidden relative">
            {/* sütun overlay */}
            <div className="absolute inset-0 grid grid-cols-12 gap-1 px-3 pointer-events-none">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="katas-grid-col opacity-40" />
              ))}
            </div>
            <div className="relative p-5">
              <div className="text-[9px] font-semibold uppercase tracking-widest text-pink-500 mb-1">
                Yeni Koleksiyon
              </div>
              <div className="text-2xl font-bold text-gray-900 leading-tight mb-2">
                Bahar Tipografi Seti
              </div>
              <div className="text-xs text-gray-500 mb-3">
                Bir başlık ailesi, bir gövde ailesi — net hiyerarşi, 12 kolon ızgara.
              </div>
              <div className="inline-block text-[10px] font-semibold text-white px-3 py-1.5 rounded"
                   style={{ background: "linear-gradient(135deg,#ec4899,#be185d)" }}>
                İncele
              </div>
            </div>
          </div>
        </div>

        {/* Sağ: Properties */}
        <div className="katas-figma-panel w-[200px] flex flex-col border-l border-black/30">
          <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-gray-500 font-semibold border-b border-black/30">
            Typography
          </div>
          <div className="p-3 space-y-3 text-[10px]">
            <div>
              <div className="text-gray-500 mb-1">Font</div>
              <div className="bg-[#1a1a1a] px-2 py-1 rounded text-gray-300">Inter</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Size / Line height</div>
              <div className="grid grid-cols-2 gap-1">
                <div className="bg-[#1a1a1a] px-2 py-1 rounded text-gray-300">28</div>
                <div className="bg-[#1a1a1a] px-2 py-1 rounded text-gray-300">36</div>
              </div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Weight</div>
              <div className="bg-pink-500/20 text-pink-300 px-2 py-1.5 rounded">Semibold · 600</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Letter spacing</div>
              <div className="bg-[#1a1a1a] px-2 py-1 rounded text-gray-300">-0.5%</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Alignment</div>
              <div className="bg-[#1a1a1a] px-2 py-1 rounded flex items-center gap-2 text-gray-300">
                <AlignLeft className="w-3 h-3" /> Left
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   SLIDES — Hafta 6: Tipografi, hiyerarşi, ızgara sistemleri
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ───── 01 · KAPAK ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2245 · 6. Hafta · Güz Dönemi</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-8xl font-bold tracking-tight leading-[1] mb-6"
        >
          <span className="katas-shimmer">Tipografi &amp; Izgara</span>
          <br />
          <span className="text-white">Hiyerarşi ile Düzen</span>
        </motion.h1>
        <Sub className="mt-6 max-w-3xl mx-auto">
          Doğru yazı tipi, doğru ölçek, doğru kolon. Bu hafta arayüzü gözün
          okuyabileceği bir sisteme dönüştürüyoruz.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          <FeatureCard
            icon={Type}
            title="Tipografi"
            desc="Yazı tipi sınıfları, modüler ölçek, satır yüksekliği ve okunabilirlik."
            delay={0.3}
            accent="#ec4899"
          />
          <FeatureCard
            icon={Heading}
            title="Hiyerarşi"
            desc="Boyut, ağırlık, renk ve boşlukla gözü doğru sıraya yönlendirme."
            delay={0.45}
            accent="#a855f7"
          />
          <FeatureCard
            icon={LayoutGrid}
            title="Izgara"
            desc="12 kolon sistem, oluk, kenar boşluğu ve 8pt boşluk düzeni."
            delay={0.6}
            accent="#3b82f6"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-10 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/5 text-xs text-pink-300 font-mono"
        >
          <Calendar className="w-3 h-3" />
          Cuma 15:20 — 17:00 · Figma uygulamalı
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 02 · GEÇEN HAFTADAN KÖPRÜ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 5. haftadan 6. haftaya</Eyebrow>
      <H2>Wireframe iskeleti kurduk; şimdi onu okunur kılıyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta düşük çözünürlüklü wireframe&apos;lerle &quot;ne nerede duracak&quot;
        sorusunu çözdük. Kutular yerli yerinde ama hâlâ gri ve sessiz. Bu hafta o
        iskelete tipografi, hiyerarşi ve ızgara giydirip gerçek bir arayüze
        yaklaştırıyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { n: "Vardı", t: "Wireframe", d: "Gri kutular, yer tutucu metin, kaba yerleşim.", icon: PenTool, accent: "#64748b" },
          { n: "Bu hafta", t: "Tip + ızgara", d: "Ölçek, hiyerarşi ve kolon sistemiyle düzenlenmiş içerik.", icon: LayoutGrid, accent: "#ec4899" },
          { n: "Gelecek", t: "Bileşen sistemi", d: "Tutarlı stiller buton/kart bileşenlerine dönüşür.", icon: Layers, accent: "#a855f7" },
        ].map((g, i) => (
          <motion.div
            key={g.t}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="katas-card rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${g.accent}18`, border: `1px solid ${g.accent}55` }}
              >
                <g.icon className="w-5 h-5" style={{ color: g.accent }} />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: g.accent }}>{g.n}</div>
                <div className="text-lg font-semibold text-white">{g.t}</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{g.d}</p>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 03 · DERSİN AKIŞI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: harf → sıra → çatı</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce yazının kendisini (tipografi), sonra gözün okuma sırasını (hiyerarşi),
        en son her şeyi hizalayan görünmez iskeleti (ızgara) ele alıyoruz. Sonunda
        kısa bir Figma alıştırması.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Tipografi", items: ["Yazı tipi sınıfları", "Modüler ölçek & punto", "Satır yüksekliği, ölçü, izleme"], icon: Type, accent: "#ec4899" },
          { range: "02", title: "Hiyerarşi", items: ["Görsel hiyerarşi nedir", "Boyut · ağırlık · renk · boşluk", "Yakınlık ve gruplama"], icon: Heading, accent: "#a855f7" },
          { range: "03", title: "Izgara sistemleri", items: ["12 kolon · oluk · kenar", "8pt boşluk & baseline", "Figma layout grid"], icon: LayoutGrid, accent: "#3b82f6" },
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

  /* ───── 04 · BÖLÜM 1 — TİPOGRAFİ ───── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="Tipografi"
      subtitle="Bir arayüzdeki içeriğin çoğu metindir. Yazıyı doğru seçmek ve ölçeklemek, tasarımın görünmez ama en belirleyici katmanıdır."
      bgGradient="linear-gradient(135deg, #ec4899 0%, #be185d 100%)"
      shadow="0 0 60px rgba(236, 72, 153, 0.5)"
      icon={<Type className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 05 · YAZI TİPİ SINIFLARI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Tipografi · sınıflandırma</Eyebrow>
      <H2 className="mb-2">Üç temel yazı tipi sınıfı</H2>
      <Sub className="mb-8 max-w-3xl">
        Her yazı tipi bir ton taşır. Arayüzde genellikle bir başlık ailesi ve bir
        gövde ailesi yeter — ikiden fazlası tutarlılığı zedeler.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <TypeAnatomyCard
          family="Inter, Helvetica, Roboto"
          classify="Sans-serif"
          sampleClass="katas-spec-sans"
          use="Tırnaksız, nötr, ekranda yüksek okunabilirlik. Çoğu arayüzün gövde ve başlık seçimi."
          accent="#ec4899"
          delay={0}
        />
        <TypeAnatomyCard
          family="Georgia, Merriweather"
          classify="Serif"
          sampleClass="katas-spec-serif"
          use="Tırnaklı, klasik ve resmi ton. Uzun okuma metinleri, editöryel içerik için uygun."
          accent="#a855f7"
          delay={0.12}
        />
        <TypeAnatomyCard
          family="JetBrains Mono, Menlo"
          classify="Monospace"
          sampleClass="katas-spec-mono"
          use="Her karakter eşit genişlikte. Kod, terminal, tablo verisi ve hizalı sayılar için."
          accent="#3b82f6"
          delay={0.24}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 katas-card-rose rounded-xl p-4 text-sm text-gray-300 max-w-4xl"
      >
        Pratik kural: <strong className="text-pink-300">eşleştir, çoğaltma.</strong> Bir
        sans-serif gövde + ya aynı ailenin koyu ağırlığı ya da kontrast bir serif başlık —
        ikili çoğu projeyi taşır.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 06 · MODÜLER ÖLÇEK ───── */
  () => (
    <SlideShell>
      <Eyebrow>Tipografi · ölçek</Eyebrow>
      <H2 className="mb-2">Punto seçmek değil, ölçek kurmak</H2>
      <Sub className="mb-6 max-w-3xl">
        Başlık 31, alt başlık 19, gövde 15... gibi keyfi sayılar yerine bir taban
        boyuttan oran ile türetilen <strong className="text-pink-300">modüler ölçek</strong>
        kullanılır. Adımlar orantılı olunca hiyerarşi kendiliğinden tutarlı çıkar.
      </Sub>
      <TypeScaleLadder />
    </SlideShell>
  ),

  /* ───── 07 · OKUNABİLİRLİK PARAMETRELERİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Tipografi · okunabilirlik</Eyebrow>
      <H2>Gövde metnini ayarlayan dört parametre</H2>
      <Sub className="mt-3 max-w-3xl">
        Yazı tipini seçtikten sonra okumayı kolaylaştıran ya da zorlaştıran asıl
        ayarlar bunlardır. Pratik aralıklar genel kabul görmüş başlangıç değerleridir.
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
              <th style={{ width: "22%" }}>Parametre</th>
              <th style={{ width: "26%" }}>Ne kontrol eder?</th>
              <th style={{ width: "20%" }}>Pratik aralık</th>
              <th>Aşırıya kaçarsa</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Satır yüksekliği <span className="font-mono text-pink-300">(line-height)</span></td>
              <td>Satırlar arası dikey boşluk.</td>
              <td className="font-mono text-[#f9a8d4]">Gövde için ≈ 1.4 – 1.6</td>
              <td>Çok az: sıkışık · çok fazla: satırlar kopuk hisseder.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Satır uzunluğu <span className="font-mono text-pink-300">(measure)</span></td>
              <td>Bir satırdaki karakter sayısı.</td>
              <td className="font-mono text-[#f9a8d4]">≈ 45 – 75 karakter</td>
              <td>Çok uzun: göz satırı kaybeder · çok kısa: yorucu zıplama.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Harf aralığı <span className="font-mono text-pink-300">(tracking)</span></td>
              <td>Tüm harfler arası eşit boşluk.</td>
              <td className="font-mono text-[#f9a8d4]">Büyük başlıkta hafif sık</td>
              <td>Gövdede oynamak okumayı bozar; çoğunlukla 0 bırak.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Hizalama <span className="font-mono text-pink-300">(alignment)</span></td>
              <td>Metin bloğunun kenar hizası.</td>
              <td className="font-mono text-[#f9a8d4]">Genelde sola yaslı</td>
              <td>İki yana yaslama (justify) arayüzde &quot;nehir&quot; boşluklar açar.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 08 · BÖLÜM 2 — HİYERARŞİ ───── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Görsel Hiyerarşi"
      subtitle="Kullanıcı sayfayı kelime kelime okumaz; tarar. Hiyerarşi, gözün hangi sırayla bakacağını sessizce belirleyen düzendir."
      bgGradient="linear-gradient(135deg, #a855f7 0%, #ec4899 100%)"
      shadow="0 0 60px rgba(168, 85, 247, 0.5)"
      icon={<Heading className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 09 · HİYERARŞİ KARŞILAŞTIRMA ───── */
  () => (
    <SlideShell>
      <Eyebrow>Hiyerarşi · neden gerekli?</Eyebrow>
      <H2 className="mb-2">Aynı içerik, iki farklı deneyim</H2>
      <Sub className="mb-6 max-w-3xl">
        Solda her şey aynı boyutta — okuyucu nereye bakacağını bilemez. Sağda boyut,
        ağırlık, renk ve boşluk gözü tarih → başlık → eylem sırasıyla yönlendirir.
      </Sub>
      <HierarchyCompare />
    </SlideShell>
  ),

  /* ───── 10 · HİYERARŞİ ARAÇLARI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Hiyerarşi · araç kutusu</Eyebrow>
      <H2 className="mb-2">Hiyerarşiyi kuran dört kaldıraç</H2>
      <Sub className="mb-6 max-w-3xl">
        Önem sırasını yalnızca büyük başlıkla değil; boyut, ağırlık, renk/kontrast ve
        çevresindeki boşlukla kurarsın. Genellikle ikisini birlikte kullanmak en güçlü
        sonucu verir.
      </Sub>
      <HierarchyToolsDemo />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 text-center text-sm text-gray-400 max-w-3xl mx-auto"
      >
        <strong className="text-pink-300">Yakınlık ilkesi:</strong> ilişkili öğeleri
        birbirine yaklaştır, ilişkisizleri uzaklaştır. Çoğu zaman bir başlık için
        gereken tek şey, üstündeki değil altındaki boşluğu büyütmektir.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 11 · BÖLÜM 3 — IZGARA ───── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Izgara Sistemleri"
      subtitle="Izgara, içeriği hizalayan görünmez iskelettir. Sezgiyle değil sistemle yerleştirilen her öğe, ekranlar arasında tutarlı kalır."
      bgGradient="linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)"
      shadow="0 0 60px rgba(59, 130, 246, 0.5)"
      icon={<LayoutGrid className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 12 · 12 KOLON IZGARA ───── */
  () => (
    <SlideShell>
      <Eyebrow>Izgara · anatomi</Eyebrow>
      <H2 className="mb-2">12 kolonlu ızgara nasıl çalışır?</H2>
      <Sub className="mb-6 max-w-3xl">
        12 sayısı 2, 3, 4 ve 6&apos;ya bölünebildiği için en esnek seçimdir: yan yana
        2, 3 ya da 4 sütunlu yerleşimlerin hepsi aynı sistemden çıkar. Üç temel parça:
        <strong className="text-pink-300"> kolon</strong>,
        <strong className="text-purple-300"> oluk</strong> ve
        <strong className="text-blue-300"> kenar boşluğu</strong>.
      </Sub>
      <TwelveColumnGrid />
    </SlideShell>
  ),

  /* ───── 13 · 8PT BOŞLUK + BASELINE ───── */
  () => (
    <SlideShell>
      <Eyebrow>Izgara · boşluk düzeni</Eyebrow>
      <H2 className="mb-2">8pt sistemi ve baseline ızgarası</H2>
      <Sub className="mb-6 max-w-3xl">
        Yalnızca yatay kolonlar değil, dikey boşluklar da sistemli olmalı. Tüm
        ölçüleri 8&apos;in katlarından (8, 16, 24, 32...) seçmek, ekran her ölçeğe
        büyürken hizayı korur ve geliştiriciyle ortak bir dil kurar.
      </Sub>
      <SpacingSystem />
    </SlideShell>
  ),

  /* ───── 14 · FIGMA TYPE & GRID WORKSPACE ───── */
  () => (
    <SlideShell>
      <Eyebrow>Uygulama · Figma&apos;da kurmak</Eyebrow>
      <H2 className="mb-2">Text styles + Layout grid: tek yerde tip ve ızgara</H2>
      <Sub className="mb-6 max-w-3xl">
        Figma&apos;da ölçeği <strong className="text-pink-300">Text styles</strong> olarak,
        kolon sistemini <strong className="text-pink-300">Layout grid</strong> olarak bir
        kez tanımlarsın; sonra her ekranda tek tıkla uygularsın. Sistem dosyada yaşar,
        kafanda değil.
      </Sub>
      <TypeGridWorkspace />
    </SlideShell>
  ),

  /* ───── 15 · UYGULAMALI ALIŞTIRMA ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı alıştırma</Eyebrow>
      <H2>Geçen haftaki wireframe&apos;ini giydirip teslim et</H2>
      <Sub className="mt-3 max-w-3xl">
        Yeni bir şey çizme; 5. haftada yaptığın wireframe&apos;e bu haftanın üç
        katmanını uygula. Sonraki derse bitmiş .fig dosyası ve bir ekran görüntüsüyle gel.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Type, title: "Tip ölçeğini tanımla", desc: "Bir başlık + bir gövde ailesi seç; Display/H1/H2/Body/Caption için 5 Text style oluştur.", accent: "#ec4899", time: "20 dk" },
          { icon: Heading, title: "Hiyerarşiyi kur", desc: "Bir kart veya ekran başlığında boyut, ağırlık ve boşlukla net bir okuma sırası ver.", accent: "#a855f7", time: "20 dk" },
          { icon: Columns3, title: "12 kolon ızgara ekle", desc: "Frame'e Layout grid uygula (12 kolon, 16 oluk, 24 kenar) ve öğeleri kolonlara hizala.", accent: "#3b82f6", time: "20 dk" },
          { icon: Ruler, title: "8pt boşluğa geçir", desc: "Tüm dolgu ve aralıkları 8'in katlarına yuvarla; baseline'da hizasızlıkları düzelt.", accent: "#10b981", time: "20 dk" },
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
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-[10px] text-gray-500 font-mono">{i + 1}</span>
                  <h3 className="text-base font-semibold text-white">{t.title}</h3>
                </div>
                <span className="text-[10px] font-mono text-pink-300 bg-pink-500/10 px-2 py-0.5 rounded">{t.time}</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{t.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
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
          style={{ background: "linear-gradient(135deg,#ec4899,#be185d)", boxShadow: "0 30px 80px -20px rgba(236,72,153,0.6)" }}
        >
          <Scaling className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>6. hafta tamamlandı · sıradaki: Renk &amp; bileşen sistemleri</Eyebrow>
        <H1>
          <span className="katas-shimmer">Renk · Stil · Bileşen</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta yazıyı ve düzeni sisteme bağladık. Gelecek hafta renk paletini,
          durum renklerini ve bu stilleri yeniden kullanılabilir bileşenlere
          dönüştürmeyi ele alacağız.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="katas-card rounded-xl p-5">
            <Eye className="w-5 h-5 text-[#ec4899] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Önizleme</div>
            <div className="text-white font-semibold">Renk &amp; tema</div>
            <div className="text-sm text-gray-400">palet, durum renkleri, kontrast</div>
          </div>
          <div className="katas-card rounded-xl p-5">
            <Layers className="w-5 h-5 text-[#a855f7] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Devamı</div>
            <div className="text-white font-semibold">Bileşenler</div>
            <div className="text-sm text-gray-400">buton, kart, varyant, state</div>
          </div>
          <div className="katas-card rounded-xl p-5">
            <ListChecks className="w-5 h-5 text-[#3b82f6] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">.fig + ekran görüntüsü</div>
            <div className="text-sm text-gray-400">tip + ızgara uygulanmış</div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 text-xs font-mono text-gray-600 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>BVA 2245 · Kullanıcı Arayüzü Tasarımı · Hafta 06</span>
          <Target className="w-3.5 h-3.5" />
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
          BVA 2245 · 6. Hafta · Tipografi &amp; Izgara
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
