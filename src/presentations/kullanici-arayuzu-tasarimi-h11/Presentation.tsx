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
  MousePointerClick,
  Workflow,
  Zap,
  Layers,
  Frame,
  Play,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  X,
  ArrowRight,
  ArrowLeftRight,
  Sparkles,
  Calendar,
  Target,
  Smartphone,
  Hand,
  Square,
  Type,
  PenTool,
  Clock,
  Eye,
  Link2,
  Gauge,
  Repeat,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Share2,
  ListChecks,
  Hash,
  GraduationCap,
  Briefcase,
  Globe,
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
   TOPIC-SPECIFIC MOCKUPS — H11: prototip / smart animate / geçiş
   ============================================================ */

/* Bir küçük telefon ekranı — prototip akışındaki düğümler için */
function ProtoScreen({
  label,
  variant,
}: {
  label: string;
  variant: "list" | "detail" | "cart";
}) {
  return (
    <div className="katas-proto-screen w-[120px] h-[240px] flex flex-col">
      <div className="flex items-center justify-between px-2 py-1 text-[6px] text-gray-600 font-semibold">
        <span>9:41</span>
        <span className="w-3 h-1.5 rounded-sm border border-gray-500" />
      </div>
      <div className="px-2 py-1 text-[9px] font-bold text-gray-900">{label}</div>
      {variant === "list" && (
        <div className="px-2 space-y-1.5 mt-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-1.5 p-1 rounded bg-white shadow-sm">
              <span className="w-5 h-5 rounded" style={{ background: i === 0 ? "#ec4899" : "#f9a8d4" }} />
              <div className="flex-1">
                <div className="h-1 w-full bg-gray-300 rounded mb-1" />
                <div className="h-1 w-2/3 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      )}
      {variant === "detail" && (
        <div className="px-2 mt-1">
          <div className="w-full h-16 rounded" style={{ background: "linear-gradient(135deg,#ec4899,#be185d)" }} />
          <div className="h-1.5 w-3/4 bg-gray-300 rounded mt-2" />
          <div className="h-1 w-full bg-gray-200 rounded mt-1.5" />
          <div className="h-1 w-5/6 bg-gray-200 rounded mt-1" />
          <div className="mt-auto" />
          <div className="text-center py-1.5 rounded mt-6 text-[7px] font-bold text-white" style={{ background: "#111" }}>
            Sepete ekle
          </div>
        </div>
      )}
      {variant === "cart" && (
        <div className="px-2 mt-1 space-y-1.5">
          <div className="flex items-center gap-1.5 p-1 rounded bg-white shadow-sm">
            <span className="w-5 h-5 rounded" style={{ background: "#ec4899" }} />
            <div className="flex-1 h-1.5 bg-gray-300 rounded" />
            <span className="text-[7px] text-gray-700">×1</span>
          </div>
          <div className="flex items-center justify-between text-[7px] text-gray-700 px-1 pt-1">
            <span>Toplam</span>
            <span className="font-bold">₺349</span>
          </div>
          <div className="text-center py-1.5 rounded text-[7px] font-bold text-white" style={{ background: "linear-gradient(135deg,#ec4899,#be185d)" }}>
            Öde
          </div>
        </div>
      )}
    </div>
  );
}

/* Prototip kanvası — ekranlar arası etkileşim bağlantıları (wire) */
function PrototypeFlowMockup() {
  return (
    <FigmaFrameMockup title="magaza.fig — Prototype sekmesi">
      <div className="relative katas-proto-canvas h-[420px] flex items-center justify-around px-6">
        <div className="absolute top-2 left-3 text-[9px] font-mono text-purple-300 flex items-center gap-1.5">
          <Play className="w-3 h-3" /> Prototype · Flow 1 · &quot;Satın alma&quot;
        </div>

        {/* bağlantı okları */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          <defs>
            <marker id="arrowP" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#a855f7" />
            </marker>
          </defs>
          <line x1="27%" y1="50%" x2="42%" y2="50%" className="katas-proto-wire" markerEnd="url(#arrowP)" />
          <line x1="61%" y1="50%" x2="76%" y2="50%" className="katas-proto-wire" markerEnd="url(#arrowP)" />
        </svg>

        {/* düğümler */}
        <div className="relative z-10 flex flex-col items-center">
          <ProtoScreen label="Ürünler" variant="list" />
          <span className="mt-2 katas-chip">On tap → Ürün</span>
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <ProtoScreen label="Ürün detay" variant="detail" />
          <span className="mt-2 katas-chip">On tap → Sepet</span>
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <ProtoScreen label="Sepet" variant="cart" />
          <span className="mt-2 katas-chip">Bitiş ekranı</span>
        </div>
      </div>
      <div className="px-4 py-2.5 text-[11px] font-mono text-gray-500 border-t border-white/5 flex items-center gap-2">
        <Link2 className="w-3.5 h-3.5 text-purple-400" />
        Her mavi/mor ok bir <span className="text-purple-300">etkileşim (interaction)</span>: tetikleyici + eylem + hedef + animasyon.
      </div>
    </FigmaFrameMockup>
  );
}

/* Bir etkileşimin sağ panel anatomisi */
function InteractionPanelMockup() {
  return (
    <div className="katas-figma-panel w-full max-w-sm rounded-xl overflow-hidden border border-black/40">
      <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-gray-500 font-semibold border-b border-black/30 flex items-center justify-between">
        <span>Interaction details</span>
        <span className="text-purple-300 normal-case">Buton → Ödeme</span>
      </div>
      <div className="p-3 space-y-2.5 text-[11px]">
        <div>
          <div className="text-gray-500 mb-1">Trigger (Tetikleyici)</div>
          <div className="bg-pink-500/20 text-pink-200 px-2 py-1.5 rounded flex items-center justify-between">
            <span>On tap</span>
            <Hand className="w-3 h-3" />
          </div>
        </div>
        <div>
          <div className="text-gray-500 mb-1">Action (Eylem)</div>
          <div className="bg-[#1a1a1a] px-2 py-1.5 rounded text-gray-300">Navigate to →</div>
        </div>
        <div>
          <div className="text-gray-500 mb-1">Destination (Hedef)</div>
          <div className="bg-[#1a1a1a] px-2 py-1.5 rounded text-gray-300 flex items-center gap-2">
            <Frame className="w-3 h-3 text-pink-400" /> Ödeme · Frame 4
          </div>
        </div>
        <div>
          <div className="text-gray-500 mb-1">Animation (Geçiş)</div>
          <div className="bg-purple-500/20 text-purple-200 px-2 py-1.5 rounded flex items-center justify-between">
            <span>Smart animate</span>
            <Zap className="w-3 h-3" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-gray-500 mb-1">Easing</div>
            <div className="bg-[#1a1a1a] px-2 py-1.5 rounded text-gray-300">Ease out</div>
          </div>
          <div>
            <div className="text-gray-500 mb-1">Süre</div>
            <div className="bg-[#1a1a1a] px-2 py-1.5 rounded text-gray-300">300 ms</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Smart Animate — aynı katman adı eşleşmesiyle iki frame */
function SmartAnimateMockup() {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center max-w-4xl mx-auto">
      {/* Frame A */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="katas-card rounded-xl p-5"
      >
        <div className="text-[10px] font-mono uppercase text-pink-300 mb-3">Frame A — Liste</div>
        <div className="bg-[#fdf2f8] rounded-lg p-3 h-[220px] relative">
          <div className="absolute left-3 top-3 w-12 h-12 rounded-lg" style={{ background: "linear-gradient(135deg,#ec4899,#be185d)" }} />
          <div className="absolute left-[68px] top-4 right-3">
            <div className="h-2 bg-gray-300 rounded w-3/4 mb-2" />
            <div className="h-1.5 bg-gray-200 rounded w-1/2" />
          </div>
          <div className="absolute left-3 right-3 bottom-3 text-[8px] font-mono text-pink-500">
            katman adı: <span className="font-bold">card-foto</span>
          </div>
        </div>
      </motion.div>

      {/* Eşleşme oku */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col items-center gap-2"
      >
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#a855f7,#7c3aed)", boxShadow: "0 0 24px rgba(168,85,247,0.5)" }}>
          <ArrowLeftRight className="w-6 h-6 text-white" />
        </div>
        <span className="katas-chip whitespace-nowrap">aynı isim → tween</span>
      </motion.div>

      {/* Frame B */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="katas-card rounded-xl p-5"
      >
        <div className="text-[10px] font-mono uppercase text-pink-300 mb-3">Frame B — Detay</div>
        <div className="bg-[#fdf2f8] rounded-lg p-3 h-[220px] relative">
          <div className="absolute left-3 top-3 right-3 h-24 rounded-lg" style={{ background: "linear-gradient(135deg,#ec4899,#be185d)" }} />
          <div className="absolute left-3 right-3 top-[112px]">
            <div className="h-2.5 bg-gray-300 rounded w-2/3 mb-2" />
            <div className="h-1.5 bg-gray-200 rounded w-full" />
          </div>
          <div className="absolute left-3 right-3 bottom-3 text-[8px] font-mono text-pink-500">
            katman adı: <span className="font-bold">card-foto</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* Easing eğrisi görseli */
function EasingCurve({
  label,
  d,
  note,
  color,
}: {
  label: string;
  d: string;
  note: string;
  color: string;
}) {
  return (
    <div className="katas-easing-box p-4">
      <div className="text-xs font-mono mb-2" style={{ color }}>{label}</div>
      <svg viewBox="0 0 100 100" className="w-full h-24">
        <line x1="0" y1="100" x2="100" y2="100" stroke="#333" strokeWidth="1" />
        <line x1="0" y1="0" x2="0" y2="100" stroke="#333" strokeWidth="1" />
        <path d={d} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
      </svg>
      <div className="text-[11px] text-gray-400 mt-2 leading-snug">{note}</div>
    </div>
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
        <Eyebrow>BVA 2245 · 11. Hafta · Etkileşimli Prototip</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-8xl font-bold tracking-tight leading-[1] mb-6"
        >
          <span className="katas-shimmer">İnteraktif Prototip</span>
          <br />
          <span className="text-white">Smart Animate &amp; Geçişler</span>
        </motion.h1>
        <Sub className="mt-6 max-w-3xl mx-auto">
          Statik ekranları tıklanabilir bir akışa dönüştürüyoruz. Figma&apos;nın
          Prototype modunda etkileşim, geçiş ve Smart Animate ile ekranlara hayat
          veriyoruz.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 grid grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          <FeatureCard
            icon={MousePointerClick}
            title="Etkileşim"
            desc="Tetikleyici → eylem → hedef. Ekranları birbirine bağla."
            accent="#ec4899"
            delay={0.6}
          />
          <FeatureCard
            icon={Zap}
            title="Smart Animate"
            desc="Aynı katmanı iki frame arasında otomatik tween&apos;le."
            accent="#a855f7"
            delay={0.72}
          />
          <FeatureCard
            icon={Workflow}
            title="Geçişler"
            desc="Dissolve, move, push, slide — doğru geçiş, doğru his."
            accent="#3b82f6"
            delay={0.84}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-10 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/5 text-xs text-pink-300 font-mono"
        >
          <Calendar className="w-3 h-3" />
          Cuma · 15:20 — 17:00 · Uygulamalı: Figma Prototype
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  02 · KÖPRÜ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 10. haftadan 11. haftaya</Eyebrow>
      <H2>Ekranları çizdik; şimdi onları birbirine bağlıyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta high-fidelity ekranları ve bileşenleri Figma&apos;da tamamladık.
        Ama tek tek frame&apos;ler bir ürün değildir. Bu hafta o frame&apos;leri
        tıklanabilir, gezilebilir bir <strong className="text-pink-300">akışa</strong>{" "}
        dönüştürüyoruz — kullanıcı testi ve sunum için.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="katas-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-gray-400">
            <Frame className="w-5 h-5 text-pink-400" />
            <span className="text-xs font-mono uppercase tracking-widest">Geçen hafta · Statik</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-pink-400 flex-shrink-0" />Ayrı ayrı duran high-fi ekranlar.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-pink-400 flex-shrink-0" />Bileşenler, Auto Layout, varyantlar.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-pink-400 flex-shrink-0" />Tıklayınca hiçbir şey olmuyor.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="katas-card-rose rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-pink-300">
            <MousePointerClick className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu hafta · İnteraktif</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-pink-300 flex-shrink-0" />Ekranlar arasında gerçek bağlantılar.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-pink-300 flex-shrink-0" />Geçiş animasyonları ve Smart Animate.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-pink-300 flex-shrink-0" />Telefonda denenebilir, paylaşılabilir akış.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  03 · BU DERSİN AKIŞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: bağla → animasyonla → test et</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce ekranları etkileşimlerle bağlıyoruz; sonra geçiş ve Smart Animate ile
        hareketi tasarlıyoruz; en son prototipi paylaşıp test ediyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Etkileşim & Akış", items: ["Prototype sekmesi", "Tetikleyici · eylem · hedef", "Flow ve başlangıç noktası"], icon: MousePointerClick, accent: "#ec4899" },
          { range: "02", title: "Geçiş & Smart Animate", items: ["Geçiş türleri (dissolve, push...)", "Smart Animate eşleşmesi", "Easing ve süre"], icon: Zap, accent: "#a855f7" },
          { range: "03", title: "Test & Paylaşım", items: ["Present (▶) modu", "Cihazda önizleme", "Paylaşım linki & yorum"], icon: Share2, accent: "#3b82f6" },
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

  /* ─────────────────  04 · DIVIDER 1/3  ───────────────── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="Etkileşim &amp; Akış"
      subtitle="Prototype modunda ekranları birbirine bağlıyoruz: her bağlantı bir tetikleyici, bir eylem ve bir hedeften oluşur."
      bgGradient="linear-gradient(135deg, #ec4899 0%, #be185d 100%)"
      shadow="0 0 60px rgba(236, 72, 153, 0.5)"
      icon={<MousePointerClick className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  05 · PROTOTYPE SEKMESİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Figma · Design → Prototype</Eyebrow>
      <H2 className="mb-2">İki mod, tek dosya</H2>
      <Sub className="max-w-3xl mb-6">
        Sağ panelin üstündeki <span className="katas-chip">Design</span> /
        <span className="katas-chip">Prototype</span> sekmesi tüm farkı yaratır.
        Design&apos;da ekranı çizersin; Prototype&apos;ta o ekranları birbirine
        bağlarsın. Tasarımı bozmadan, ayrı bir katman gibi.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <FeatureCard
          icon={Square}
          title="Design sekmesi"
          desc="Konum, boyut, renk, tipografi, Auto Layout, bileşen — görünümün her şeyi burada. 1.–10. hafta hep buradaydık."
          accent="#ec4899"
          delay={0.1}
        />
        <FeatureCard
          icon={MousePointerClick}
          title="Prototype sekmesi"
          desc="Bir nesne seçilince kenarında beliren artı (+) düğümünden başka bir frame&apos;e ok çekersin. İşte etkileşim böyle doğar."
          accent="#a855f7"
          delay={0.25}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 katas-card-rose rounded-xl p-5 flex items-start gap-3"
      >
        <Eye className="w-5 h-5 text-pink-300 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-gray-300 leading-relaxed">
          Önemli: Prototype bağlantıları tasarımın <strong className="text-pink-300">üzerinde</strong>{" "}
          yaşar. Bağlantıları silmek ekranı bozmaz; sadece akışı kaldırır.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  06 · ETKİLEŞİM ANATOMİSİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Etkileşim anatomisi</Eyebrow>
      <H2 className="mb-2">Her bağlantı dört parçadan oluşur</H2>
      <Sub className="max-w-3xl mb-6">
        Bir etkileşimi kurarken hep aynı dört soruyu yanıtlarsın: ne zaman, ne olsun,
        nereye, nasıl? Sağ panelde aynen bu sırayla görünür.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-3">
          {[
            { k: "Trigger", tr: "Tetikleyici", d: "On tap, on drag, while hovering, after delay, mouse enter…", icon: Hand, c: "#ec4899" },
            { k: "Action", tr: "Eylem", d: "Navigate to, Back, Open overlay, Swap, Scroll to, Open link…", icon: ArrowRight, c: "#a855f7" },
            { k: "Destination", tr: "Hedef", d: "Hangi frame&apos;e gidilecek (Navigate ise).", icon: Frame, c: "#3b82f6" },
            { k: "Animation", tr: "Geçiş", d: "Instant, Dissolve, Move, Push, Slide, Smart animate + easing/süre.", icon: Zap, c: "#10b981" },
          ].map((row, i) => (
            <motion.div
              key={row.k}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="katas-card rounded-lg p-4 flex items-start gap-3"
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${row.c}18`, border: `1px solid ${row.c}55` }}>
                <row.icon className="w-4 h-4" style={{ color: row.c }} />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  {row.k} <span className="text-gray-500 font-normal">· {row.tr}</span>
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{row.d}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center"
        >
          <InteractionPanelMockup />
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  07 · TETİKLEYİCİ TABLOSU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Tetikleyici (Trigger) türleri</Eyebrow>
      <H2>Doğru tetikleyici, doğru deneyim</H2>
      <Sub className="mt-3 max-w-3xl">
        Tek bir &quot;tıklama&quot; yok. Ne taklit ettiğine göre tetikleyici seçersin —
        mobil dokunma, masaüstü hover veya otomatik akış.
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
              <th style={{ width: "20%" }}>Tetikleyici</th>
              <th style={{ width: "34%" }}>Ne zaman çalışır?</th>
              <th>Tipik kullanım</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="katas-chip">On tap / click</span></td>
              <td>Nesneye dokunulduğunda / tıklandığında.</td>
              <td>Buton, kart, liste öğesi — en sık kullanılan.</td>
            </tr>
            <tr>
              <td><span className="katas-chip">On drag</span></td>
              <td>Parmakla sürüklendiğinde.</td>
              <td>Alt sayfayı (bottom sheet) yukarı çekme, kaydırarak silme.</td>
            </tr>
            <tr>
              <td><span className="katas-chip">While hovering</span></td>
              <td>İmleç üstündeyken (yalnız üstünde durduğu sürece).</td>
              <td>Masaüstü menü açılımı, tooltip, hover durumu.</td>
            </tr>
            <tr>
              <td><span className="katas-chip">While pressing</span></td>
              <td>Basılı tutulduğu sürece.</td>
              <td>Bas-bırak buton durumu, uzun basış önizlemesi.</td>
            </tr>
            <tr>
              <td><span className="katas-chip">Mouse enter / leave</span></td>
              <td>İmleç alana girdiğinde / çıktığında.</td>
              <td>Açılır panelin gir-çık davranışı.</td>
            </tr>
            <tr>
              <td><span className="katas-chip">After delay</span></td>
              <td>Frame açıldıktan belirli süre sonra (otomatik).</td>
              <td>Splash → ana ekran, otomatik karusel, yükleniyor → içerik.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  08 · PROTOTİP AKIŞI (KANVAS)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Prototype kanvası · canlı akış</Eyebrow>
      <H2 className="mb-2">Üç ekran, iki etkileşim, bir akış</H2>
      <Sub className="max-w-3xl mb-6">
        Aşağıda küçük bir &quot;satın alma&quot; akışı: ürün listesinden detaya, oradan
        sepete. Mor oklar Prototype modunda kurulan etkileşimler; her birinin bir
        tetikleyicisi ve geçişi var.
      </Sub>
      <PrototypeFlowMockup />
    </SlideShell>
  ),

  /* ─────────────────  09 · FLOW & BAŞLANGIÇ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Flow &amp; Başlangıç noktası</Eyebrow>
      <H2 className="mb-2">Akış nerede başlar?</H2>
      <Sub className="max-w-3xl mb-6">
        Her prototip bir <strong className="text-pink-300">Flow starting point</strong>
        (başlangıç bayrağı) ile başlar. Bir frame&apos;e başlangıç verirsen, Present
        modu oradan açılır. Bir dosyada birden çok akış (ör. &quot;Onboarding&quot;,
        &quot;Satın alma&quot;) tanımlayabilirsin.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Play, t: "Başlangıç bayrağı", d: "Frame seçili iken Prototype panelinde &quot;Flow starting point&quot; ekle. Mavi bir etiket belirir.", c: "#ec4899" },
          { icon: Workflow, t: "Birden çok akış", d: "Aynı dosyada farklı senaryoları ayrı akış olarak adlandır; her biri kendi başından test edilir.", c: "#a855f7" },
          { icon: ArrowRight, t: "Back & geri akış", d: "&quot;Back&quot; eylemi kullanıcıyı bir önceki ekrana, geçişi tersine çevirerek götürür.", c: "#3b82f6" },
        ].map((g, i) => (
          <FeatureCard key={g.t} icon={g.icon} title={g.t} desc={g.d} accent={g.c} delay={0.1 + i * 0.12} />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 katas-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3 max-w-4xl"
      >
        <AlertTriangle className="w-4 h-4 text-pink-300 mt-0.5 flex-shrink-0" />
        <span>
          Sık hata: başlangıç noktası unutulur, Present modu yanlış ekrandan açılır.
          Test etmeden önce akışın doğru frame&apos;den başladığını doğrula.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  10 · DIVIDER 2/3  ───────────────── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Geçiş &amp; Smart Animate"
      subtitle="Bağlantı &apos;ne&apos;yi yapar; geçiş &apos;nasıl&apos; hissettirir. Smart Animate ise aradaki kareleri sizin yerinize üretir."
      bgGradient="linear-gradient(135deg, #a855f7 0%, #ec4899 100%)"
      shadow="0 0 60px rgba(168, 85, 247, 0.5)"
      icon={<Zap className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  11 · GEÇİŞ TÜRLERİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Geçiş (Animation) türleri</Eyebrow>
      <H2>Altı geçiş, altı farklı his</H2>
      <Sub className="mt-3 max-w-3xl">
        Aynı bağlantı, farklı geçişle bambaşka hissettirir. Geçişi içeriğin
        mantığına göre seç — rastgele değil.
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
              <th style={{ width: "18%" }}>Geçiş</th>
              <th style={{ width: "42%" }}>Ne yapar?</th>
              <th>Ne zaman?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="katas-chip">Instant</span></td>
              <td>Animasyonsuz, anında değişim.</td>
              <td>Sekme değişimi, hızlı durum geçişi.</td>
            </tr>
            <tr>
              <td><span className="katas-chip">Dissolve</span></td>
              <td>Eski ekran solar, yeni ekran belirir (çapraz geçiş).</td>
              <td>İlişkisiz iki ekran arası yumuşak geçiş.</td>
            </tr>
            <tr>
              <td><span className="katas-chip">Move in / out</span></td>
              <td>Yeni ekran mevcut ekranın üzerine kayar / üstünden çıkar.</td>
              <td>Modal, bildirim, alttan açılan panel.</td>
            </tr>
            <tr>
              <td><span className="katas-chip">Push</span></td>
              <td>Yeni ekran eskisini iterek yerini alır.</td>
              <td>Adım adım ilerleme (onboarding, sihirbaz).</td>
            </tr>
            <tr>
              <td><span className="katas-chip">Slide in / out</span></td>
              <td>Yeni ekran kayar; eski yerinde sabit kalır.</td>
              <td>Yan menü (drawer), sayfa kaydırma.</td>
            </tr>
            <tr>
              <td><span className="katas-chip">Smart animate</span></td>
              <td>Eşleşen katmanların konum/boyut/renk farkını yumuşatır.</td>
              <td>Aynı öğenin iki durumu arası (kart → detay).</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-[11px] text-gray-500 font-mono"
      >
        Yön (↑ ↓ ← →) çoğu geçişte seçilebilir; örn. <span className="text-pink-300">Move in · ←</span> soldan girer.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  12 · SMART ANIMATE NASIL  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Smart Animate · nasıl çalışır?</Eyebrow>
      <H2 className="mb-2">Sihir değil: aynı katman adı eşleşmesi</H2>
      <Sub className="max-w-3xl mb-6">
        Smart Animate, iki frame&apos;de <strong className="text-pink-300">aynı isme
        sahip</strong> katmanları bulur ve aralarındaki konum, boyut, döndürme,
        opaklık ve renk farkını otomatik olarak adım adım canlandırır. Sen yalnızca
        iki durumu çizersin; ara kareleri Figma üretir.
      </Sub>
      <SmartAnimateMockup />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl mx-auto text-xs"
      >
        <div className="flex items-center gap-2 text-gray-400">
          <Check className="w-4 h-4 text-emerald-400" /> Katman adları birebir aynı olmalı
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <Check className="w-4 h-4 text-emerald-400" /> Sadece değişen özellik animasyonlanır
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <X className="w-4 h-4 text-red-400" /> İsim eşleşmezse: sadece dissolve olur
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  13 · EASING & SÜRE  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Easing &amp; süre · hareketin hissi</Eyebrow>
      <H2 className="mb-2">Geçiş ne kadar &quot;doğal&quot; hissedecek?</H2>
      <Sub className="max-w-3xl mb-6">
        Easing, hareketin hızlanma/yavaşlama eğrisidir. Gerçek dünyada hiçbir şey
        sabit hızla başlayıp durmaz — bu yüzden <span className="katas-chip">Ease out</span>
        çoğu arayüz geçişinde en doğal seçenektir. Süre genelde
        <span className="katas-chip">200–400 ms</span> aralığında tutulur.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <EasingCurve
          label="Linear"
          d="M0,100 L100,0"
          note="Sabit hız. Mekanik, robotik hisseder. Genelde kaçınılır."
          color="#94a3b8"
        />
        <EasingCurve
          label="Ease out"
          d="M0,100 C40,0 60,0 100,0"
          note="Hızlı başlar, yumuşak durur. Ekrana giren öğeler için ideal."
          color="#ec4899"
        />
        <EasingCurve
          label="Ease in & out"
          d="M0,100 C30,100 70,0 100,0"
          note="İki ucu da yumuşak. Yer değiştiren / dönüşen öğeler için."
          color="#a855f7"
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 katas-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3 max-w-4xl"
      >
        <Gauge className="w-4 h-4 text-pink-300 mt-0.5 flex-shrink-0" />
        <span>
          Süre tuzağı: çok uzun geçiş (&gt; 500 ms) arayüzü yavaş, çok kısa (&lt; 120 ms)
          ani gösterir. Spring (yaylanma) ise oyun/eğlence tonu için kullanılır.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  14 · DOĞRU GEÇİŞ KARARI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Karar · doğru geçişi seçmek</Eyebrow>
      <H2 className="mb-2">Geçiş bir &quot;süs&quot; değil, bir anlam taşır</H2>
      <Sub className="max-w-3xl mb-6">
        İyi geçiş kullanıcının zihinsel modelini güçlendirir: nesne nereden geldi,
        nereye gitti? Kötü geçiş yön duygusunu bozar.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="katas-card rounded-xl overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500/10 border-b border-emerald-500/30">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono uppercase text-emerald-300">Anlamlı geçiş</span>
          </div>
          <div className="p-5 space-y-3 text-sm text-gray-300">
            <div className="flex gap-2"><Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />Kart → detay: Smart animate ile aynı görsel büyür.</div>
            <div className="flex gap-2"><Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />Yan menü: soldan Slide in (geldiği yön belli).</div>
            <div className="flex gap-2"><Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />Modal: alttan Move in, kapanışta aşağı iner.</div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="katas-card rounded-xl overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 border-b border-red-500/30">
            <XCircle className="w-4 h-4 text-red-400" />
            <span className="text-xs font-mono uppercase text-red-300">Kafa karıştıran geçiş</span>
          </div>
          <div className="p-5 space-y-3 text-sm text-gray-300">
            <div className="flex gap-2"><X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />Her ekran için rastgele farklı geçiş.</div>
            <div className="flex gap-2"><X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />İleri giderken sağdan, geri dönerken de sağdan.</div>
            <div className="flex gap-2"><X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />800 ms süren, akışı yavaşlatan abartılı animasyon.</div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  15 · DIVIDER 3/3  ───────────────── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Test &amp; Paylaşım"
      subtitle="Prototip ancak denenince işe yarar. Present modu, cihaz önizlemesi ve paylaşım linkiyle akışı gerçek kullanıcıya götürüyoruz."
      bgGradient="linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)"
      shadow="0 0 60px rgba(59, 130, 246, 0.5)"
      icon={<Share2 className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  16 · PRESENT & PAYLAŞIM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Present (▶) · cihaz · paylaşım</Eyebrow>
      <H2 className="mb-2">Prototipi gerçek kullanıcıya götür</H2>
      <Sub className="max-w-3xl mb-6">
        Sağ üstteki <span className="katas-chip">▶ Present</span> butonu prototipi tam
        ekran, tıklanabilir modda açar. Figma mobil uygulaması (Figma Mirror) ile
        aynı akışı kendi telefonunda dokunarak denersin.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Play}
          title="Present modu"
          desc="Başlangıç noktasından akışı oynat. Bağlantısı olmayan yeri tıklayınca etkileşim alanları mavi yanıp söner."
          accent="#3b82f6"
          delay={0.1}
        />
        <FeatureCard
          icon={Smartphone}
          title="Cihazda önizleme"
          desc="Figma Mirror ile prototipi gerçek telefonda gör; dokunma ve gerçek ölçek hissini masaüstü taklit edemez."
          accent="#ec4899"
          delay={0.22}
        />
        <FeatureCard
          icon={Share2}
          title="Paylaşım linki"
          desc="&quot;Share&quot; → link kopyala. İzleyiciler hesapsız açar, yorum bırakır; sürüm geçmişiyle geri dönebilirsin."
          accent="#a855f7"
          delay={0.34}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 katas-card-rose rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <Eye className="w-4 h-4 text-pink-300 mt-0.5 flex-shrink-0" />
        <span>
          Test ipucu: kullanıcıya görev ver (&quot;bir ürünü sepete ekle&quot;), yönlendirme
          yapma, sadece izle. Nerede duraksıyor? Hangi etkileşimi bulamıyor? Akış buradan düzelir.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  17 · UYGULAMALI LAB  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı görev</Eyebrow>
      <H2>Kendi 3 ekranlı akışını prototiple</H2>
      <Sub className="mt-3 max-w-3xl">
        10. haftada çizdiğin ekranlardan en az üçünü tıklanabilir bir akışa bağla.
        Sonraki derse linkini ve kısa bir notu hazır getir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Link2, title: "İki etkileşim kur", desc: "Liste → detay → sepet gibi en az iki &quot;On tap → Navigate to&quot; bağlantısı oluştur.", accent: "#ec4899" },
          { icon: Zap, title: "Bir Smart Animate kullan", desc: "Bir geçişte aynı isimli katmanı (örn. card-foto) iki frame&apos;de eşleştir ve animasyonu izle.", accent: "#a855f7" },
          { icon: Play, title: "Başlangıç + Present", desc: "Akışa &quot;Flow starting point&quot; ekle, Present modunda baştan sona oynat.", accent: "#3b82f6" },
          { icon: Share2, title: "Linki paylaş", desc: "&quot;Share&quot; linkini al; bir arkadaşına test ettir ve takıldığı tek noktayı not et.", accent: "#10b981" },
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
        className="mt-6 katas-card rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <ListChecks className="w-4 h-4 text-pink-300 mt-0.5 flex-shrink-0" />
        <span>
          Teslim: paylaşım linki + 3 cümlelik not (&quot;hangi geçişi neden seçtim, test
          edende nerede takıldı&quot;). Süre hedefi: yaklaşık 90 dakika.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  18 · SIK YAPILAN HATALAR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sık yapılan hatalar · kontrol listesi</Eyebrow>
      <H2>Prototip çalışmıyorsa önce bunlara bak</H2>
      <Sub className="mt-3 max-w-3xl">
        Bağlantı kurdun ama geçiş olmuyor mu? Aşağıdaki dört durum, derste en sık
        karşılaşılan tıkanma noktalarıdır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { p: "Smart Animate atlıyor", c: "Katman adları iki frame&apos;de aynı değil. Yeniden adlandır; eşleşmeyi sağla.", icon: Repeat },
          { p: "Yanlış ekrandan başlıyor", c: "Flow starting point yanlış frame&apos;de. Başlangıç bayrağını taşı.", icon: Play },
          { p: "Buton tıklanmıyor", c: "Bağlantı butona değil, arkadaki frame&apos;e bağlanmış. Doğru katmanı seç.", icon: MousePointerClick },
          { p: "Geri dönülemiyor", c: "Geri butonunda &quot;Back&quot; eylemi yok. Navigate yerine Back kullan.", icon: ArrowRight },
        ].map((row, i) => (
          <motion.div
            key={row.p}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="katas-card rounded-xl p-5 flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-red-500/12 border border-red-500/40">
              <row.icon className="w-5 h-5 text-red-300" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white mb-1">{row.p}</div>
              <div className="text-sm text-gray-400 leading-relaxed">{row.c}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  19 · SIRADAKİ HAFTA + KAPANIŞ  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8"
          style={{ background: "linear-gradient(135deg,#3b82f6,#a855f7)", boxShadow: "0 30px 80px -20px rgba(59,130,246,0.6)" }}
        >
          <Clock className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>11. hafta tamamlandı · sıradaki: Mikro-etkileşimler</Eyebrow>
        <H1>
          <span className="katas-shimmer">Mikro-etkileşim &amp; Durumlar</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta ekranlar arası geçişi kurduk. Hafta 12&apos;de ekranın içindeki
          küçük anları tasarlıyoruz: buton durumları, yükleniyor göstergeleri,
          boş/hata/başarı ekranları ve component varyantlarıyla mikro-etkileşimler.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <FeatureCard icon={PenTool} title="Durumlar" desc="Default · hover · pressed · disabled · loading." accent="#ec4899" delay={0.1} />
          <FeatureCard icon={Layers} title="Varyantlar" desc="Bileşen varyantları ile durum geçişleri." accent="#a855f7" delay={0.2} />
          <FeatureCard icon={Type} title="Boş/Hata ekranı" desc="Empty, error, success — kenar durumları." accent="#3b82f6" delay={0.3} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto text-left">
          <div className="katas-card rounded-xl p-5">
            <Calendar className="w-5 h-5 text-pink-400 mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Ders saati</div>
            <div className="text-white font-semibold">Cuma</div>
            <div className="text-sm text-gray-400">15:20 — 17:00</div>
          </div>
          <div className="katas-card rounded-xl p-5">
            <Target className="w-5 h-5 text-purple-400 mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">3 ekranlı prototip</div>
            <div className="text-sm text-gray-400">linkini hazır getir</div>
          </div>
          <div className="katas-card rounded-xl p-5">
            <Briefcase className="w-5 h-5 text-blue-400 mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">Prototip linki</div>
            <div className="text-sm text-gray-400">+ 3 cümle test notu</div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 flex items-center justify-center gap-3 text-xs text-gray-500 font-mono"
        >
          <Globe className="w-3 h-3" />
          <span>BVA 2245 · Kullanıcı Arayüzü Tasarımı · 2026 Bahar · Hafta 11</span>
          <Hash className="w-3 h-3" />
          <GraduationCap className="w-3 h-3" />
          <Sparkles className="w-3 h-3" />
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
          BVA 2245 · 11. Hafta · İnteraktif Prototip
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
