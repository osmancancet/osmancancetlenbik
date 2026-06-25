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
  Palette,
  Brain,
  Layers,
  Eye,
  Sparkles,
  Target,
  Lightbulb,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Quote,
  Check,
  X,
  Wand2,
  Zap,
  Hash,
  Globe,
  GraduationCap,
  Users,
  Briefcase,
  Calendar,
  Layout as LayoutIcon,
  Smartphone,
  MonitorSmartphone,
  PenTool,
  Frame,
  Square,
  MousePointer2,
  Accessibility,
  Compass,
  BookOpen,
  Heart,
  Clock,
  MessageSquare,
  Search,
  TestTube2,
  Pencil,
  Smile,
  Workflow,
  Hand,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  DollarSign,
  TrendingUp,
  Type,
  Image as ImageIcon,
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

function StatCard({
  icon: Icon,
  value,
  label,
  source,
  delay = 0,
  accent = "#ec4899",
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
      className="katas-card rounded-xl p-5"
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

function QuoteSlide({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <SlideShell>
      <div className="text-center max-w-4xl mx-auto">
        <Quote className="w-16 h-16 text-[#ec4899]/40 mx-auto mb-8" />
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
          <div className="text-lg font-semibold text-[#ec4899]">{author}</div>
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

function MiniPhoneUI() {
  return (
    <div className="katas-phone w-[180px] h-[360px] p-2 mx-auto">
      <div className="katas-phone-screen w-full h-full flex flex-col">
        {/* status bar */}
        <div className="flex items-center justify-between px-3 py-1.5 text-[8px] text-gray-700 font-semibold">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-gray-700" />
            <span className="w-1 h-1 rounded-full bg-gray-700" />
            <span className="w-3 h-1.5 rounded-sm border border-gray-700" />
          </span>
        </div>
        {/* header */}
        <div className="px-3 py-2">
          <div className="text-[14px] font-bold text-gray-900">Merhaba 👋</div>
          <div className="text-[9px] text-gray-500">Bugün ne yapalım?</div>
        </div>
        {/* card */}
        <div className="mx-3 my-2 p-3 rounded-lg" style={{ background: "linear-gradient(135deg, #ec4899, #be185d)" }}>
          <div className="text-[9px] text-white/80">Bugünün önerisi</div>
          <div className="text-[12px] font-bold text-white mt-1">Yeni bir tasarım sistemi keşfet</div>
        </div>
        {/* list */}
        <div className="px-3 space-y-1.5">
          {[
            { t: "Wireframe çizimi", c: "#f472b6" },
            { t: "Renk paleti", c: "#a855f7" },
            { t: "Tipografi", c: "#3b82f6" },
          ].map((r, i) => (
            <div key={i} className="flex items-center gap-2 py-1.5 px-2 bg-white rounded shadow-sm">
              <span className="w-5 h-5 rounded" style={{ background: r.c }} />
              <span className="text-[9px] text-gray-800 font-medium">{r.t}</span>
            </div>
          ))}
        </div>
        {/* button */}
        <div className="mt-auto p-3">
          <div className="text-center py-2 rounded-lg text-[10px] font-bold text-white" style={{ background: "#111" }}>
            Başla
          </div>
        </div>
      </div>
    </div>
  );
}

function FigmaWorkspaceMockup() {
  return (
    <FigmaFrameMockup title="ders-h01.fig — UI Tasarım">
      <div className="flex h-[440px] bg-[#1e1e1e]">
        {/* Left: Layers */}
        <div className="katas-figma-panel w-[180px] flex flex-col border-r border-black/30">
          <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-gray-500 font-semibold border-b border-black/30">
            Layers
          </div>
          <div className="p-2 space-y-0.5 text-[10px]">
            <div className="katas-figma-row">
              <Frame className="w-3 h-3 text-pink-400" />
              <span className="font-semibold">Frame · iPhone 14</span>
            </div>
            <div className="katas-figma-row pl-5">
              <Square className="w-3 h-3 text-gray-400" />
              <span>Status Bar</span>
            </div>
            <div className="katas-figma-row pl-5">
              <Type className="w-3 h-3 text-gray-400" />
              <span>Header</span>
            </div>
            <div className="katas-figma-row pl-5 katas-figma-row-active">
              <Square className="w-3 h-3" />
              <span>Hero Card</span>
            </div>
            <div className="katas-figma-row pl-7">
              <Type className="w-3 h-3 text-gray-400" />
              <span>Title</span>
            </div>
            <div className="katas-figma-row pl-7">
              <Type className="w-3 h-3 text-gray-400" />
              <span>Subtitle</span>
            </div>
            <div className="katas-figma-row pl-5">
              <Layers className="w-3 h-3 text-gray-400" />
              <span>List Items</span>
            </div>
            <div className="katas-figma-row pl-5">
              <Square className="w-3 h-3 text-gray-400" />
              <span>CTA Button</span>
            </div>
            <div className="katas-figma-divider" />
            <div className="katas-figma-row">
              <Frame className="w-3 h-3 text-purple-400" />
              <span className="font-semibold">Components</span>
            </div>
            <div className="katas-figma-row pl-5">
              <span className="w-2 h-2 rounded-sm bg-purple-500" />
              <span>Button / Primary</span>
            </div>
            <div className="katas-figma-row pl-5">
              <span className="w-2 h-2 rounded-sm bg-purple-500" />
              <span>Card / Default</span>
            </div>
          </div>
        </div>
        {/* Center: Canvas */}
        <div className="flex-1 katas-figma-canvas flex items-center justify-center relative">
          <div className="absolute top-2 left-2 text-[9px] text-gray-500 font-mono">
            iPhone 14 — 390 × 844
          </div>
          <div className="absolute top-2 right-2 text-[9px] text-pink-400 font-mono">
            100%
          </div>
          <MiniPhoneUI />
          <div className="absolute bottom-3 left-3 flex gap-1.5">
            {[MousePointer2, Frame, Square, Type, PenTool, Hand].map((Ic, i) => (
              <div key={i} className={`w-7 h-7 rounded flex items-center justify-center ${i === 1 ? "bg-pink-500" : "bg-[#2c2c2c]"}`}>
                <Ic className="w-3.5 h-3.5 text-white" />
              </div>
            ))}
          </div>
        </div>
        {/* Right: Properties */}
        <div className="katas-figma-panel w-[200px] flex flex-col border-l border-black/30">
          <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-gray-500 font-semibold border-b border-black/30">
            Design
          </div>
          <div className="p-3 space-y-3 text-[10px]">
            <div>
              <div className="text-gray-500 mb-1">Position</div>
              <div className="grid grid-cols-2 gap-1">
                <div className="bg-[#1a1a1a] px-2 py-1 rounded text-gray-300">X 24</div>
                <div className="bg-[#1a1a1a] px-2 py-1 rounded text-gray-300">Y 120</div>
              </div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Auto Layout</div>
              <div className="bg-pink-500/20 text-pink-300 px-2 py-1.5 rounded flex items-center justify-between">
                <span>Vertical · 12px</span>
                <Check className="w-3 h-3" />
              </div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Typography</div>
              <div className="bg-[#1a1a1a] px-2 py-1 rounded text-gray-300">Inter · Bold · 14</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Fill</div>
              <div className="bg-[#1a1a1a] px-2 py-1 rounded flex items-center gap-2">
                <span className="w-3 h-3 rounded" style={{ background: "#ec4899" }} />
                <span className="text-gray-300">EC4899</span>
                <span className="ml-auto text-gray-500">100%</span>
              </div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Stroke</div>
              <div className="bg-[#1a1a1a] px-2 py-1 rounded text-gray-500 italic">None</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Effects</div>
              <div className="bg-[#1a1a1a] px-2 py-1 rounded text-gray-300">Drop shadow</div>
            </div>
          </div>
        </div>
      </div>
    </FigmaFrameMockup>
  );
}

function NormanDoorMockup() {
  return (
    <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
      {/* Bad door */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="katas-card rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <XCircle className="w-5 h-5 text-red-400" />
          <span className="text-xs font-mono uppercase text-red-400">Norman Kapısı</span>
        </div>
        <div className="relative h-[280px] flex items-center justify-center bg-gradient-to-b from-stone-800/40 to-stone-900/40 rounded-lg">
          <svg viewBox="0 0 200 280" className="h-full">
            {/* frame */}
            <rect x="20" y="20" width="160" height="240" fill="#6b4423" />
            {/* door */}
            <rect x="30" y="30" width="140" height="220" fill="url(#wood1)" stroke="#3d2817" strokeWidth="2" />
            <defs>
              <linearGradient id="wood1" x1="0" x2="1">
                <stop offset="0" stopColor="#d4a373" />
                <stop offset="1" stopColor="#a67852" />
              </linearGradient>
            </defs>
            {/* visible PULL handle (vertical bar) on the side you should push */}
            <rect x="48" y="120" width="8" height="60" fill="#1a1a1a" rx="2" />
            <circle cx="52" cy="120" r="6" fill="#1a1a1a" />
            <circle cx="52" cy="180" r="6" fill="#1a1a1a" />
            {/* PUSH sign */}
            <rect x="80" y="100" width="80" height="36" fill="#fef2f2" stroke="#991b1b" strokeWidth="1.5" rx="3" />
            <text x="120" y="124" textAnchor="middle" fontSize="20" fontWeight="900" fill="#991b1b" fontFamily="Arial">
              İTİNİZ
            </text>
          </svg>
          {/* arrows */}
          <div className="absolute top-4 right-4 text-[10px] text-red-300 max-w-[110px] text-right">
            <div className="bg-red-500/20 border border-red-500/40 rounded px-2 py-1 mb-1">
              Kol = &ldquo;çek beni&rdquo;
            </div>
            <div className="bg-red-500/20 border border-red-500/40 rounded px-2 py-1">
              Etiket = &ldquo;it&rdquo;
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-400 mt-4 leading-relaxed">
          Görsel ipucu (kol) ile etiket çelişiyor. Kullanıcı duraksar, deneme yapar.
          <strong className="text-red-300"> Tasarım hatasını kullanıcı düşünerek telafi eder.</strong>
        </p>
      </motion.div>

      {/* Good door */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="katas-card rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-mono uppercase text-emerald-400">Doğru Tasarım</span>
        </div>
        <div className="relative h-[280px] flex items-center justify-center bg-gradient-to-b from-stone-800/40 to-stone-900/40 rounded-lg">
          <svg viewBox="0 0 200 280" className="h-full">
            <rect x="20" y="20" width="160" height="240" fill="#6b4423" />
            <rect x="30" y="30" width="140" height="220" fill="url(#wood2)" stroke="#3d2817" strokeWidth="2" />
            <defs>
              <linearGradient id="wood2" x1="0" x2="1">
                <stop offset="0" stopColor="#d4a373" />
                <stop offset="1" stopColor="#a67852" />
              </linearGradient>
            </defs>
            {/* flat metal plate — clearly "push" */}
            <rect x="42" y="120" width="50" height="60" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" rx="2" />
            <text x="67" y="155" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1f2937">İTİNİZ</text>
          </svg>
          <div className="absolute top-4 right-4 text-[10px] text-emerald-300 max-w-[110px] text-right">
            <div className="bg-emerald-500/20 border border-emerald-500/40 rounded px-2 py-1">
              Düz plaka = sadece itilebilir
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-400 mt-4 leading-relaxed">
          Affordance (görsel ipucu) ile signifier (etiket) aynı şeyi söyler.
          <strong className="text-emerald-300"> Kullanıcı düşünmeden kullanır.</strong>
        </p>
      </motion.div>
    </div>
  );
}

function UIvsUXMetaphor() {
  return (
    <div className="grid grid-cols-2 gap-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="katas-card-rose rounded-2xl p-6 text-center"
      >
        <div className="text-xs font-mono uppercase tracking-widest text-pink-300 mb-3">UI</div>
        <div className="text-2xl font-bold text-white mb-2">Görünen Yüz</div>
        <div className="relative h-[200px] flex items-center justify-center my-4">
          <svg viewBox="0 0 200 200" className="h-full">
            {/* jar */}
            <rect x="60" y="40" width="80" height="22" fill="#92400e" rx="3" />
            <path d="M 55 62 L 145 62 L 150 180 Q 150 190 140 190 L 60 190 Q 50 190 50 180 Z"
                  fill="url(#jarFill)" stroke="#f9a8d4" strokeWidth="2" />
            <defs>
              <linearGradient id="jarFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#fbcfe8" />
                <stop offset="1" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            {/* label */}
            <rect x="65" y="100" width="70" height="60" fill="white" stroke="#be185d" strokeWidth="1.5" rx="3" />
            <text x="100" y="125" textAnchor="middle" fontSize="14" fontWeight="900" fill="#be185d">JAM</text>
            <text x="100" y="143" textAnchor="middle" fontSize="8" fill="#831843">Strawberry · 2026</text>
            {/* shine */}
            <ellipse cx="75" cy="100" rx="6" ry="40" fill="white" opacity="0.3" />
          </svg>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed">
          Renk, tipografi, ikon, etiket — <strong className="text-pink-300">nasıl göründüğü</strong>.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="katas-card rounded-2xl p-6 text-center"
      >
        <div className="text-xs font-mono uppercase tracking-widest text-pink-300 mb-3">UX</div>
        <div className="text-2xl font-bold text-white mb-2">Hissedilen Deneyim</div>
        <div className="relative h-[200px] flex items-center justify-center my-4">
          <svg viewBox="0 0 200 200" className="h-full">
            {/* hand */}
            <path d="M 35 100 Q 25 100 25 110 L 25 140 Q 25 155 40 155 L 75 155 L 75 165 Q 75 175 85 175 L 100 175 Q 110 175 110 165 L 110 100 Q 110 90 100 90 L 90 90 L 90 75 Q 90 65 80 65 L 80 90 L 70 90 L 70 70 Q 70 60 60 60 L 60 90 L 50 90 L 50 80 Q 50 70 40 70 L 40 100 Z"
                  fill="#fef3c7" stroke="#92400e" strokeWidth="1.5" />
            {/* lid lifting easily */}
            <g transform="rotate(-18 145 60)">
              <rect x="120" y="40" width="60" height="22" fill="#92400e" rx="3" />
              <circle cx="150" cy="51" r="6" fill="#fbbf24" />
            </g>
            {/* jar */}
            <path d="M 120 65 L 180 65 L 183 140 Q 183 150 175 150 L 125 150 Q 117 150 117 140 Z"
                  fill="rgba(236, 72, 153, 0.2)" stroke="#f9a8d4" strokeWidth="1.5" />
            {/* sparkle */}
            <g fill="#fbbf24">
              <circle cx="160" cy="35" r="2" />
              <circle cx="170" cy="28" r="1.5" />
              <circle cx="178" cy="38" r="1.5" />
            </g>
            <text x="150" y="190" textAnchor="middle" fontSize="9" fill="#a7f3d0" fontFamily="monospace">click ✓</text>
          </svg>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed">
          Kapağın kolay açılması, akışın doğal hissi — <strong className="text-emerald-300">nasıl çalıştığı</strong>.
        </p>
      </motion.div>
    </div>
  );
}

function UXProcessTimeline() {
  const steps = [
    { icon: Heart, label: "Empathize", desc: "Anla", color: "#ec4899" },
    { icon: Target, label: "Define", desc: "Tanımla", color: "#a855f7" },
    { icon: Lightbulb, label: "Ideate", desc: "Fikirleştir", color: "#3b82f6" },
    { icon: PenTool, label: "Prototype", desc: "Prototiple", color: "#10b981" },
    { icon: TestTube2, label: "Test", desc: "Test et", color: "#f59e0b" },
  ];
  return (
    <div className="relative w-full max-w-5xl mx-auto py-12">
      {/* connecting line */}
      <div className="absolute top-[60px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-amber-500 opacity-50" />
      <div className="grid grid-cols-5 gap-4 relative z-10">
        {steps.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="flex flex-col items-center text-center"
          >
            <div
              className="w-[100px] h-[100px] rounded-full flex items-center justify-center mb-4"
              style={{
                background: `linear-gradient(135deg, ${s.color}, ${s.color}aa)`,
                boxShadow: `0 0 30px ${s.color}55`,
              }}
            >
              <s.icon className="w-10 h-10 text-white" />
            </div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="text-base font-bold text-white">{s.label}</div>
            <div className="text-xs text-gray-400 mt-1">{s.desc}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function HCIVennDiagram() {
  return (
    <div className="relative w-full h-[360px] flex items-center justify-center">
      <svg viewBox="0 0 500 360" className="w-full h-full max-w-2xl">
        {/* Computer Science */}
        <circle cx="170" cy="160" r="120" fill="#3b82f6" opacity="0.35" />
        <text x="105" y="80" fontSize="14" fontWeight="700" fill="#93c5fd">Bilgisayar Bilimi</text>
        <text x="115" y="98" fontSize="9" fill="#bfdbfe">algoritma · arayüz · sistem</text>

        {/* Psychology */}
        <circle cx="330" cy="160" r="120" fill="#a855f7" opacity="0.35" />
        <text x="320" y="80" fontSize="14" fontWeight="700" fill="#d8b4fe">Psikoloji</text>
        <text x="305" y="98" fontSize="9" fill="#e9d5ff">algı · hafıza · davranış</text>

        {/* Design */}
        <circle cx="250" cy="260" r="120" fill="#ec4899" opacity="0.35" />
        <text x="220" y="350" fontSize="14" fontWeight="700" fill="#f9a8d4">Tasarım</text>
        <text x="180" y="335" fontSize="9" fill="#fbcfe8">form · estetik · iletişim</text>

        {/* Intersection label */}
        <rect x="200" y="180" width="100" height="40" rx="20" fill="#0a0a0a" stroke="#ec4899" strokeWidth="2" />
        <text x="250" y="198" textAnchor="middle" fontSize="14" fontWeight="900" fill="white">HCI</text>
        <text x="250" y="212" textAnchor="middle" fontSize="8" fill="#f9a8d4">İnsan–Bilgisayar</text>
      </svg>
    </div>
  );
}

function BadVsGoodFormUI() {
  return (
    <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto">
      {/* Bad form */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="katas-card rounded-xl overflow-hidden"
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border-b border-red-500/30">
          <XCircle className="w-4 h-4 text-red-400" />
          <span className="text-xs font-mono uppercase text-red-300">Kötü UI · Bilişsel yük yüksek</span>
        </div>
        <div className="bg-white p-4 h-[380px] overflow-hidden">
          <div className="text-[11px] font-bold text-gray-800 mb-2">Kayıt Formu</div>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              "Ad", "Soyad", "TC Kimlik", "Doğum", "Cinsiyet", "E-posta",
              "Telefon", "Adres", "İl", "İlçe", "Posta Kodu", "Ülke",
              "Meslek", "Şirket", "Vergi No", "IBAN", "Şifre", "Şifre tekrar",
              "Güvenlik sorusu", "Cevap",
            ].map((l, i) => (
              <div key={i}>
                <div className="text-[7px] text-gray-600">{l} *</div>
                <div className="katas-form-bad-input">_</div>
              </div>
            ))}
          </div>
          <div className="flex items-start gap-1 mt-2 text-[7px] text-gray-500">
            <Square className="w-2 h-2 mt-0.5" />
            <span>Kullanım koşullarını, gizlilik politikasını, KVKK aydınlatma metnini ve pazarlama izinlerini okudum onaylıyorum...</span>
          </div>
          <button className="mt-2 w-full bg-gray-300 text-gray-600 text-[8px] py-1 rounded">Gönder</button>
        </div>
      </motion.div>

      {/* Good form */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="katas-card rounded-xl overflow-hidden"
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border-b border-emerald-500/30">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono uppercase text-emerald-300">İyi UI · Adım adım</span>
        </div>
        <div className="bg-gradient-to-b from-pink-50 to-white p-6 h-[380px] flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-1.5">
              <span className="w-8 h-1 rounded-full bg-pink-500" />
              <span className="w-8 h-1 rounded-full bg-pink-200" />
              <span className="w-8 h-1 rounded-full bg-pink-200" />
            </div>
            <span className="text-[10px] text-gray-500 ml-auto">1 / 3</span>
          </div>
          <div className="text-lg font-bold text-gray-900 mb-1">Seni tanıyalım</div>
          <div className="text-xs text-gray-500 mb-5">Yalnızca adın ile başlayalım.</div>

          <label className="text-[10px] font-semibold text-gray-700 mb-1">Adın</label>
          <input
            type="text"
            defaultValue="Yağmur"
            className="katas-form-good-input"
            readOnly
          />

          <div className="mt-3 text-[10px] text-gray-500">
            Bu bilgiyi sadece sana hitap etmek için kullanırız.
          </div>

          <div className="mt-auto flex items-center justify-between">
            <button className="text-xs text-gray-500 hover:text-gray-700">Geç</button>
            <button className="katas-form-good-btn text-xs flex items-center gap-1.5">
              Devam <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function WCAGContrastCard({
  pass,
  ratio,
  text,
  bg,
  fg,
  label,
}: {
  pass: boolean;
  ratio: string;
  text: string;
  bg: string;
  fg: string;
  label: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="katas-card rounded-xl overflow-hidden"
    >
      <div className="p-8 text-center" style={{ background: bg, color: fg }}>
        <div className="text-2xl font-bold">{text}</div>
        <div className="text-sm opacity-90 mt-2">Okunabilirlik testi</div>
      </div>
      <div className="px-4 py-3 flex items-center justify-between">
        <div>
          <div className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</div>
          <div className="text-lg font-bold text-white">{ratio}</div>
        </div>
        {pass ? (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
            <Check className="w-3.5 h-3.5" /> AA
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/15 border border-red-500/40 text-red-300 text-xs font-bold">
            <X className="w-3.5 h-3.5" /> Fail
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ─────────────────  01 · COVER  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2245 · 1. Hafta · Açılış</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-8xl font-bold tracking-tight leading-[1] mb-6"
        >
          <span className="katas-shimmer">Kullanıcı Arayüzü</span>
          <br />
          <span className="text-white">Tasarımı</span>
        </motion.h1>
        <Sub className="mt-6 max-w-3xl mx-auto">
          Tasarım nasıl çalışır? Kullanıcı nasıl düşünür? — Görünen ekrandan,
          görünmeyen deneyime.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 grid grid-cols-3 gap-4 max-w-2xl mx-auto"
        >
          {[
            { name: "Figma", desc: "Tarayıcı tabanlı", cls: "katas-tool-figma", letter: "F" },
            { name: "Sketch", desc: "macOS klasiği", cls: "katas-tool-sketch", letter: "S" },
            { name: "Adobe XD", desc: "Adobe ekosistemi", cls: "katas-tool-xd", letter: "Xd" },
          ].map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="katas-card rounded-xl p-5"
            >
              <div className={`w-14 h-14 rounded-xl ${t.cls} flex items-center justify-center mx-auto mb-3 text-white font-black text-xl shadow-lg`}>
                {t.letter}
              </div>
              <div className="text-sm font-bold text-white">{t.name}</div>
              <div className="text-[10px] text-gray-500 mt-1">{t.desc}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-10 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/5 text-xs text-pink-300 font-mono"
        >
          <Sparkles className="w-3 h-3" />
          15 hafta · ekrandan deneyime
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  02 · DÖNEM HARİTASI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Dönem Yol Haritası</Eyebrow>
      <H2>Bu dönem ne öğreneceğiz?</H2>
      <Sub className="mt-3 mb-10 max-w-3xl">
        15 hafta boyunca temellerden tasarım sistemlerine — her hafta bir önceki
        üzerine inşa eder.
      </Sub>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
        {[
          { n: "01", t: "UI/UX'e giriş", i: Palette, active: true },
          { n: "02", t: "Kullanıcı araştırması", i: Search },
          { n: "03", t: "Persona & senaryo", i: Users },
          { n: "04", t: "Bilgi mimarisi", i: Workflow },
          { n: "05", t: "Wireframe", i: Pencil },
          { n: "06", t: "Figma temelleri", i: Frame },
          { n: "07", t: "Tipografi & renk", i: Type },
          { n: "08", t: "Bileşen sistemleri", i: Layers },
          { n: "09", t: "Etkileşim & animasyon", i: Zap },
          { n: "10", t: "Prototipleme", i: PenTool },
          { n: "11", t: "Mobil tasarım", i: Smartphone },
          { n: "12", t: "Web tasarım", i: MonitorSmartphone },
          { n: "13", t: "Erişilebilirlik", i: Accessibility },
          { n: "14", t: "Tasarım sistemi", i: Layers },
          { n: "15", t: "Sunum & portföy", i: Sparkles },
        ].map((w, i) => (
          <motion.div
            key={w.n}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.4 }}
            className={`rounded-lg p-3 border ${
              w.active
                ? "border-pink-500 bg-pink-500/10 shadow-[0_0_24px_rgba(236,72,153,0.3)]"
                : "border-white/10 bg-white/[0.02]"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[9px] font-mono ${w.active ? "text-pink-300" : "text-gray-600"}`}>
                H{w.n}
              </span>
              <w.i className={`w-3.5 h-3.5 ${w.active ? "text-pink-400" : "text-gray-500"}`} />
            </div>
            <div className={`text-[11px] font-semibold leading-tight ${w.active ? "text-white" : "text-gray-400"}`}>
              {w.t}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-2 text-xs text-gray-500">
        <span className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
        <span>Bu hafta buradayız.</span>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  03 · STATS  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Neden bu ders?</Eyebrow>
      <H2>Tasarım sayılarla konuşur</H2>
      <Sub className="mt-3 mb-8 max-w-3xl">
        Akademik araştırmalar ve endüstri raporları aynı yöne işaret ediyor:
        kullanıcı deneyimi bir &ldquo;ekstra&rdquo; değil, ürünün kendisi.
      </Sub>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={Clock}
          value="50 ms"
          label="Kullanıcının bir arayüz hakkında ilk izlenim oluşturma süresi"
          source="Lindgaard et al., 2006"
          delay={0}
        />
        <StatCard
          icon={DollarSign}
          value="$100"
          label="UX'e yatırılan her $1'ın geri dönüşü"
          source="Forrester Research"
          delay={0.1}
        />
        <StatCard
          icon={TrendingUp}
          value="%88"
          label="Kötü deneyim sonrası siteye geri dönmeyen kullanıcı oranı"
          source="Toptal UX Report"
          delay={0.2}
        />
        <StatCard
          icon={Calendar}
          value="1990"
          label="Don Norman'ın Apple'da “User Experience Designer” terimini icat ettiği yıl"
          source="Nielsen Norman Group"
          delay={0.3}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 katas-card-rose rounded-xl p-5 flex items-start gap-3"
      >
        <Lightbulb className="w-5 h-5 text-pink-300 flex-shrink-0 mt-0.5" />
        <div>
          <div className="text-sm font-semibold text-white mb-1">Şuna dikkat:</div>
          <div className="text-sm text-gray-300 leading-relaxed">
            İlk izlenim için kullanıcı sayfanın <strong className="text-pink-300">yarım
            saniyesinin onda birini</strong> harcıyor. Bu sürede sadece estetik
            değil, &ldquo;güvenilir mi&rdquo; kararı da veriyor.
          </div>
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  04 · QUOTE  ───────────────── */
  () => (
    <QuoteSlide
      quote="Tasarım kullanıcı yerine düşünür; eğer kullanıcı tasarımı anlamak için düşünmek zorunda kalıyorsa, tasarım başarısızdır."
      author="Don Norman"
      role="The Design of Everyday Things · UX teriminin mucidi"
    />
  ),

  /* ─────────────────  05 · DIVIDER 1/3  ───────────────── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="UI vs UX"
      subtitle="İki kavram, sürekli karıştırılır. Bu hafta net olarak ayıracağız."
      bgGradient="linear-gradient(135deg, #ec4899 0%, #be185d 100%)"
      shadow="0 0 60px rgba(236, 72, 153, 0.5)"
      icon={<Palette className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  06 · UI NEDİR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>UI · User Interface</Eyebrow>
      <H2>UI nedir? — Görünen arayüz</H2>
      <Sub className="mt-3 mb-8 max-w-3xl">
        Kullanıcının ekranda gördüğü, dokunduğu her şey. Görsel ve etkileşim
        katmanı.
      </Sub>

      <div className="grid grid-cols-2 gap-8 items-center">
        <div className="space-y-3">
          <FeatureCard
            icon={Square}
            title="Düzen & boşluk"
            desc="Hiyerarşi, ızgara, grid sistemleri ve nefes alacak boşluklar."
            delay={0}
          />
          <FeatureCard
            icon={Type}
            title="Tipografi"
            desc="Yazı tipi, boy, satır yüksekliği ve okuma akışı."
            delay={0.1}
          />
          <FeatureCard
            icon={Palette}
            title="Renk & ikon"
            desc="Marka paleti, durum renkleri, ikonografi tutarlılığı."
            delay={0.2}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="katas-card rounded-2xl p-6 flex flex-col items-center"
        >
          <div className="text-[10px] font-mono uppercase tracking-widest text-pink-300 mb-3">
            Örnek bileşen
          </div>
          <MiniPhoneUI />
          <div className="mt-4 text-center text-xs text-gray-400">
            Buton, kart, başlık, ikon — hepsi <strong className="text-pink-300">UI</strong>.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  07 · UX NEDİR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>UX · User Experience</Eyebrow>
      <H2>UX nedir? — Görünmeyen deneyim</H2>
      <Sub className="mt-3 mb-8 max-w-3xl">
        Kullanıcının hissi: akış, hız, kolaylık, güven. Ekranda gözükmez ama
        kullanıcı her saniye hisseder.
      </Sub>

      <div className="grid grid-cols-3 gap-4">
        <FeatureCard
          icon={Workflow}
          title="Akış"
          desc="A noktasından B noktasına kaç adım? Adımlar mantıklı sırada mı?"
          delay={0}
        />
        <FeatureCard
          icon={Brain}
          title="Bilişsel yük"
          desc="Kullanıcı kaç şeyi aynı anda akılda tutmak zorunda?"
          delay={0.1}
        />
        <FeatureCard
          icon={Smile}
          title="His"
          desc="Doyum, güven, akıcılık — &ldquo;keşke daha çok kullansam&rdquo;."
          delay={0.2}
        />
        <FeatureCard
          icon={Zap}
          title="Hız"
          desc="Algılanan performans gerçek performanstan önce gelir."
          delay={0.3}
        />
        <FeatureCard
          icon={Accessibility}
          title="Erişilebilirlik"
          desc="Her kullanıcı (görme, motor, bilişsel farklılıklar) için çalışıyor mu?"
          delay={0.4}
        />
        <FeatureCard
          icon={Heart}
          title="Anlam"
          desc="Kullanıcı bu uygulamayı niye seviyor / bırakıyor?"
          delay={0.5}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 katas-card-rose rounded-xl p-5 flex items-start gap-3"
      >
        <Quote className="w-5 h-5 text-pink-300 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-gray-300 leading-relaxed">
          UX, ürünle ilk temasından <strong className="text-pink-300">çok önce</strong>
          başlar (reklam, beklenti) ve kullanım <strong className="text-pink-300">sonrasında
          da</strong> sürer (destek, iade, hatırlanan duygu).
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  08 · UI vs UX METAFOR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>UI vs UX · Metafor</Eyebrow>
      <H2 className="mb-2">Reçel kavanozu metaforu</H2>
      <Sub className="mb-8 max-w-3xl">
        Aynı ürünün iki katmanı: kavanoz görünümü (UI) ve kapağı açabilmek (UX).
        Biri olmadan diğeri tek başına yeterli değil.
      </Sub>
      <UIvsUXMetaphor />

      <div className="mt-8 grid grid-cols-2 gap-4 max-w-4xl mx-auto text-center">
        <div className="text-xs text-gray-400">
          Güzel kavanoz + sıkışmış kapak = <strong className="text-red-300">hayal kırıklığı</strong>
        </div>
        <div className="text-xs text-gray-400">
          Sıradan kavanoz + akıcı kullanım = <strong className="text-emerald-300">tekrar alır</strong>
        </div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  09 · DIVIDER 2/3  ───────────────── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="HCI Temelleri"
      subtitle="İnsan–Bilgisayar Etkileşimi: tasarımı bilim haline getiren disiplin."
      bgGradient="linear-gradient(135deg, #a855f7 0%, #ec4899 100%)"
      shadow="0 0 60px rgba(168, 85, 247, 0.5)"
      icon={<Brain className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  10 · HCI TANIMI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>HCI · Human-Computer Interaction</Eyebrow>
      <H2>Üç disiplinin kesişimi</H2>
      <Sub className="mt-3 mb-6 max-w-3xl">
        HCI, &ldquo;insan&rdquo; ile &ldquo;bilgisayar&rdquo; arasındaki etkileşimi
        sistematik biçimde inceleyen alandır. Üç disiplinin tam ortasında durur.
      </Sub>

      <div className="grid grid-cols-2 gap-8 items-center">
        <HCIVennDiagram />
        <div className="space-y-3">
          <div className="katas-card rounded-lg p-4">
            <div className="text-xs font-mono uppercase text-blue-300 mb-1">Bilgisayar Bilimi</div>
            <div className="text-sm text-gray-300">Sistemin <em>nasıl</em> çalıştığını bilmek — input, output, gecikme.</div>
          </div>
          <div className="katas-card rounded-lg p-4">
            <div className="text-xs font-mono uppercase text-purple-300 mb-1">Psikoloji</div>
            <div className="text-sm text-gray-300">İnsanın <em>nasıl</em> algıladığını bilmek — dikkat, hafıza, beklenti.</div>
          </div>
          <div className="katas-card rounded-lg p-4">
            <div className="text-xs font-mono uppercase text-pink-300 mb-1">Tasarım</div>
            <div className="text-sm text-gray-300">İkisini <em>iletişime</em> sokmak — form, akış, geri bildirim.</div>
          </div>
          <div className="katas-card-rose rounded-lg p-4 mt-4">
            <div className="text-xs font-bold text-pink-300 mb-1">Kısa tanım</div>
            <div className="text-sm text-white leading-snug">
              &ldquo;İnsanların bilgisayarlı sistemleri nasıl kullandığını ve
              bu sistemlerin insanlar için nasıl tasarlanması gerektiğini
              inceleyen disiplin.&rdquo;
            </div>
            <div className="text-[10px] text-gray-500 mt-2 font-mono">— ACM SIGCHI, 1992</div>
          </div>
        </div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  11 · NORMAN KAPISI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Don Norman · Norman Door</Eyebrow>
      <H2 className="mb-2">Tasarımın sessiz dili: Norman Kapısı</H2>
      <Sub className="mb-6 max-w-3xl">
        Kapıyı itecek mi, çekecek mi? Eğer kapının üstünde yön belirten bir
        etiket varsa — o kapı kötü tasarlanmıştır.
      </Sub>
      <NormanDoorMockup />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-center text-xs text-gray-500 italic max-w-2xl mx-auto"
      >
        &ldquo;Eğer bir kapıya talimat yazmak zorundaysan, o kapı başarısızdır.&rdquo; — Don Norman
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  12 · NORMAN'IN 6 İLKESİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Don Norman · 6 Temel İlke</Eyebrow>
      <H2>Her tasarımcının bilmesi gereken 6 kavram</H2>
      <Sub className="mt-3 mb-8 max-w-3xl">
        Norman'ın <em>The Design of Everyday Things</em> kitabından — kapı
        kollarından mobil uygulamalara kadar her şeye uygulanır.
      </Sub>

      <div className="grid grid-cols-3 gap-4">
        <FeatureCard
          icon={Hand}
          title="Affordance"
          desc="Nesnenin ne yapılabileceğini görünür şekilde önermesi. Buton basılabilir görünür."
          delay={0}
        />
        <FeatureCard
          icon={Eye}
          title="Signifier"
          desc="Affordance'ı belirginleştiren ipuçları — etiket, ok, renk, ses."
          delay={0.1}
        />
        <FeatureCard
          icon={Compass}
          title="Mapping"
          desc="Kontrol ile sonucun mekânsal eşleşmesi. Yukarı kaydır = yukarı git."
          delay={0.2}
        />
        <FeatureCard
          icon={Zap}
          title="Feedback"
          desc="Her eyleme anında, anlaşılır geri bildirim — yükleniyor, başarılı, hata."
          delay={0.3}
        />
        <FeatureCard
          icon={BookOpen}
          title="Conceptual Model"
          desc="Kullanıcının sistemin nasıl çalıştığına dair zihinsel modeli."
          delay={0.4}
        />
        <FeatureCard
          icon={AlertTriangle}
          title="Constraints"
          desc="Yanlış kullanımı fiziksel/mantıksal olarak imkânsız hale getirme."
          delay={0.5}
        />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  13 · DIVIDER 3/3  ───────────────── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Modern Süreç"
      subtitle="Tasarım bir an değil bir döngüdür. Empati ile başlar, test ile döner."
      bgGradient="linear-gradient(135deg, #f472b6 0%, #a855f7 100%)"
      shadow="0 0 60px rgba(244, 114, 182, 0.5)"
      icon={<Layers className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  14 · UX SÜRECİ 5 AŞAMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Design Thinking · Stanford d.school</Eyebrow>
      <H2>UX süreci 5 aşamadan oluşur</H2>
      <Sub className="mt-3 mb-2 max-w-3xl">
        Doğrusal değil, döngüseldir. Her aşamadan bir öncekine dönülebilir;
        kullanıcıyı her döngüde daha iyi anlarsın.
      </Sub>

      <UXProcessTimeline />

      <div className="grid grid-cols-5 gap-3 mt-4 text-xs text-gray-400">
        <div className="text-center">Görüşme, gözlem, anket</div>
        <div className="text-center">Problem cümlesi, persona</div>
        <div className="text-center">Beyin fırtınası, eskiz</div>
        <div className="text-center">Wireframe → high-fi</div>
        <div className="text-center">Kullanıcı testi, iterasyon</div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  15 · FIGMA WORKSPACE  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dönemin ana aracı</Eyebrow>
      <H2 className="mb-2">Figma: tarayıcıda gerçek zamanlı tasarım</H2>
      <Sub className="mb-6 max-w-3xl">
        Sol Layers, ortada Canvas, sağda Properties. Üç panel — her tasarım
        yazılımının ortak dili.
      </Sub>
      <FigmaWorkspaceMockup />

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="katas-card rounded-lg p-3 text-center">
          <div className="text-[10px] font-mono uppercase text-pink-300">Sol panel</div>
          <div className="text-xs text-gray-300 mt-1">Hiyerarşi · ne nerede</div>
        </div>
        <div className="katas-card rounded-lg p-3 text-center">
          <div className="text-[10px] font-mono uppercase text-pink-300">Canvas</div>
          <div className="text-xs text-gray-300 mt-1">Tasarladığın yer</div>
        </div>
        <div className="katas-card rounded-lg p-3 text-center">
          <div className="text-[10px] font-mono uppercase text-pink-300">Sağ panel</div>
          <div className="text-xs text-gray-300 mt-1">Stil, ölçü, davranış</div>
        </div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  16 · BAD vs GOOD FORM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>UI Karşılaştırma · Aynı içerik, farklı deneyim</Eyebrow>
      <H2 className="mb-2">Kötü UI vs İyi UI</H2>
      <Sub className="mb-6 max-w-3xl">
        İçerik aynı — &ldquo;kullanıcıyı tanı&rdquo;. Solda tek seferde her şey,
        sağda adım adım. Tamamlama oranı arasındaki fark <strong className="text-pink-300">3–5 kat</strong>.
      </Sub>
      <BadVsGoodFormUI />

      <div className="mt-6 grid grid-cols-3 gap-3 max-w-4xl mx-auto text-xs">
        <div className="flex items-center gap-2 text-gray-400">
          <Check className="w-4 h-4 text-emerald-400" /> İlerleme göstergesi
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <Check className="w-4 h-4 text-emerald-400" /> Tek odak, az alan
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <Check className="w-4 h-4 text-emerald-400" /> Net birincil eylem
        </div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  17 · WCAG ERİŞİLEBİLİRLİK  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>WCAG 2.2 · Web Content Accessibility Guidelines</Eyebrow>
      <H2>Erişilebilirlik: ek değil, başlangıç</H2>
      <Sub className="mt-3 mb-8 max-w-3xl">
        Erişilebilir tasarım engelli kullanıcılar için &ldquo;ekstra&rdquo; değildir;
        herkes için daha iyi tasarımdır. Bu hafta üç temel ile başlayalım.
      </Sub>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <WCAGContrastCard
          pass
          ratio="14.8 : 1"
          text="Okunabilir metin"
          bg="#111111"
          fg="#ffffff"
          label="Kontrast oranı"
        />
        <WCAGContrastCard
          pass={false}
          ratio="1.6 : 1"
          text="Görünmez metin"
          bg="#f9a8d4"
          fg="#fbcfe8"
          label="Kontrast oranı"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="katas-card-rose rounded-xl p-5 flex flex-col justify-center"
        >
          <div className="text-xs font-mono uppercase text-pink-300 mb-2">WCAG AA kuralı</div>
          <div className="text-3xl font-bold text-white">≥ 4.5 : 1</div>
          <div className="text-xs text-gray-300 mt-2 leading-relaxed">
            Normal metin için minimum kontrast oranı. Büyük başlık için 3:1
            yeterli.
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <FeatureCard
          icon={Eye}
          title="Renk kontrastı"
          desc="Metin ile arka plan arasında en az 4.5:1 oranı koru. Renk körlüğünü test et."
          delay={0}
        />
        <FeatureCard
          icon={Keyboard}
          title="Klavye navigasyonu"
          desc="Her etkileşim sadece klavye ile yapılabilmeli. Tab sırası mantıklı olmalı."
          delay={0.1}
        />
        <FeatureCard
          icon={ImageIcon}
          title="Alt metin"
          desc="Her anlamlı görselin alternatif metni olmalı. Ekran okuyucular için."
          delay={0.2}
        />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  18 · BU HAFTA YAPILACAKLAR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · Pratik checklist</Eyebrow>
      <H2>Hafta sonuna kadar tamamlayın</H2>
      <Sub className="mt-3 mb-8 max-w-3xl">
        Teorinin bir faydası yok — el alıştırmazsa kavram öğrenilmez. Dört
        küçük adım, hepsi 90 dakikada bitmeli.
      </Sub>

      <div className="grid grid-cols-2 gap-4">
        {[
          {
            i: Frame,
            t: "Figma hesabı aç",
            d: "figma.com — ücretsiz Education planına başvur (.edu.tr mailiyle).",
            time: "10 dk",
          },
          {
            i: PenTool,
            t: "İlk frame'ini oluştur",
            d: "Yeni dosya · iPhone 14 frame · içine bir başlık + bir buton koy. Ekran görüntüsünü kaydet.",
            time: "20 dk",
          },
          {
            i: MonitorSmartphone,
            t: "Sevdiğin uygulamanın bir akışını taklit et",
            d: "Spotify, Instagram, BiTaksi... bir ekranın yeniden çizimi. Düzeni, renkleri, tipografiyi gözle.",
            time: "40 dk",
          },
          {
            i: Sparkles,
            t: "Dribbble'da 10 örnek incele",
            d: "dribbble.com/shots · &ldquo;mobile app&rdquo; etiketinde beğendiğin 10 tasarımı bir Figma sayfasına yapıştır + neden beğendiğini yaz.",
            time: "20 dk",
          },
        ].map((task, i) => (
          <motion.div
            key={task.t}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="katas-card katas-card-hover rounded-xl p-5 flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center bg-pink-500/15 border border-pink-500/40">
              <task.i className="w-6 h-6 text-pink-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <div className="text-base font-semibold text-white">{task.t}</div>
                <div className="text-[10px] font-mono text-pink-300 bg-pink-500/10 px-2 py-0.5 rounded">
                  {task.time}
                </div>
              </div>
              <div className="text-sm text-gray-400 leading-relaxed">{task.d}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  19 · SIRADAKİ HAFTA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Hafta 02 · Önizleme</Eyebrow>
      <H2 className="mb-4">Sıradaki hafta: <span className="katas-shimmer">Kullanıcı araştırması</span></H2>
      <Sub className="mb-10 max-w-3xl">
        Tasarımı sezgilerle değil, kanıtlarla yaparız. Önümüzdeki hafta veri
        toplamanın üç yolunu öğreneceğiz.
      </Sub>

      <div className="grid grid-cols-3 gap-5">
        {[
          { i: MessageSquare, t: "Anket", d: "Çok kişi, az derinlik. Google Forms ile hızlı veri." },
          { i: Users, t: "Görüşme", d: "Az kişi, çok derinlik. Yarı yapılandırılmış 30 dk." },
          { i: Eye, t: "Gözlem", d: "Sözden değil davranıştan öğren. Bağlamsal araştırma." },
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
        <span>Hazırlık: hafta 1 ödevini bitir + figma.com hesabını doğrula.</span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  20 · TEŞEKKÜR  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-3xl bg-gradient-to-br from-pink-500 to-rose-700 items-center justify-center mb-8 shadow-2xl shadow-pink-500/40"
        >
          <Heart className="w-12 h-12 text-white" />
        </motion.div>

        <H1 className="mb-4">
          <span className="katas-shimmer">Teşekkürler!</span>
        </H1>
        <Sub className="max-w-2xl mx-auto mb-12">
          Bu dönem birlikte ekrandan deneyime geçeceğiz. Sorular için her zaman
          buradayım.
        </Sub>

        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { i: Clock, l: "Ders saati", v: "Cuma · 15:20 — 17:00" },
            { i: GraduationCap, l: "Konum", v: "EnerjiSA Bil. Lab 1" },
            { i: Briefcase, l: "Ders kodu", v: "BVA 2245" },
          ].map((info, i) => (
            <motion.div
              key={info.l}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex items-center justify-center gap-3 text-xs text-gray-500 font-mono"
        >
          <Globe className="w-3 h-3" />
          <span>BVA 2245 · Kullanıcı Arayüzü Tasarımı · 2026 Bahar · Hafta 01</span>
          <Hash className="w-3 h-3" />
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
          BVA 2245 · 1. Hafta · UI/UX Tasarımına Giriş
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
