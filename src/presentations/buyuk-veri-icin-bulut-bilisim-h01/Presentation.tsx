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
  Cloud,
  Server,
  Cpu,
  Database,
  Globe,
  Layers,
  Layers3,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Quote,
  Check,
  X,
  Sparkles,
  Zap,
  Target,
  Lightbulb,
  Users,
  BarChart3,
  TrendingUp,
  Search,
  Brain,
  Lock,
  Shield,
  DollarSign,
  Activity,
  HardDrive,
  Network,
  Box,
  Package,
  Settings,
  Code,
  Terminal,
  Building2,
  Workflow,
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
        <div className="absolute inset-0 bvbb-grid-bg pointer-events-none" />
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
      className="inline-flex items-center gap-3 mb-6 text-xs font-mono uppercase tracking-[0.25em] text-[#60a5fa]"
    >
      <span className="w-8 h-px bg-[#60a5fa]" />
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
  accent = "#2563eb",
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
      className="bvbb-card bvbb-card-hover rounded-xl p-6 transition-all"
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

function StatCard({
  icon: Icon,
  value,
  label,
  source,
  delay = 0,
  accent = "#2563eb",
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
      className="bvbb-card rounded-xl p-5"
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

function QuoteSlide({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <SlideShell>
      <div className="text-center max-w-4xl mx-auto">
        <Quote className="w-16 h-16 text-[#60a5fa]/40 mx-auto mb-8" />
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
          <div className="text-lg font-semibold text-[#60a5fa]">{author}</div>
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
          className="inline-flex w-32 h-32 rounded-3xl items-center justify-center mb-8 bvbb-pulse"
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

function CloudServiceTile({
  icon: Icon,
  brand,
  name,
  desc,
  color,
  delay = 0,
}: {
  icon: LucideIcon;
  brand: string;
  name: string;
  desc: string;
  color: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bvbb-card bvbb-card-hover rounded-xl p-5 flex flex-col"
    >
      <div className="flex items-center justify-between mb-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: `${color}25`, border: `1px solid ${color}66` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <span
          className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded"
          style={{ background: `${color}1a`, color }}
        >
          {brand}
        </span>
      </div>
      <div className="text-base font-semibold text-white">{name}</div>
      <div className="text-xs text-gray-400 mt-1 flex-1">{desc}</div>
      <button
        className="mt-3 text-[11px] font-medium self-start px-3 py-1 rounded transition-colors"
        style={{
          background: `${color}1c`,
          color,
          border: `1px solid ${color}55`,
        }}
      >
        Kullan →
      </button>
    </motion.div>
  );
}

function OnPremVsCloudDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* On-premise rack */}
      <div className="bvbb-card rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="w-5 h-5 text-gray-300" />
          <div className="text-sm font-semibold text-white">On-Premise</div>
          <span className="ml-auto text-[10px] text-gray-500 font-mono">SERVER ROOM</span>
        </div>
        <svg viewBox="0 0 320 200" className="w-full h-44">
          {/* Floor */}
          <rect x="0" y="180" width="320" height="20" fill="#0f172a" />
          {/* Rack */}
          <rect x="60" y="20" width="90" height="160" rx="4" fill="#1e293b" stroke="#475569" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <rect x="66" y={30 + i * 24} width="78" height="20" rx="2" fill="#334155" stroke="#64748b" />
              <circle cx={72} cy={40 + i * 24} r="2" fill={i % 2 === 0 ? "#22c55e" : "#f59e0b"} />
              <circle cx={80} cy={40 + i * 24} r="2" fill="#22c55e" />
              <rect x={90} y={36 + i * 24} width="48" height="8" rx="1" fill="#0f172a" />
            </g>
          ))}
          {/* Second rack */}
          <rect x="170" y="20" width="90" height="160" rx="4" fill="#1e293b" stroke="#475569" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={`r2-${i}`}>
              <rect x="176" y={30 + i * 24} width="78" height="20" rx="2" fill="#334155" stroke="#64748b" />
              <circle cx={182} cy={40 + i * 24} r="2" fill={i === 1 ? "#ef4444" : "#22c55e"} />
              <circle cx={190} cy={40 + i * 24} r="2" fill="#22c55e" />
              <rect x={200} y={36 + i * 24} width="48" height="8" rx="1" fill="#0f172a" />
            </g>
          ))}
          {/* Cables */}
          <path d="M 105 180 Q 160 195 215 180" stroke="#64748b" strokeWidth="1.5" fill="none" />
          <path d="M 110 180 Q 165 200 220 180" stroke="#475569" strokeWidth="1.5" fill="none" />
        </svg>
        <div className="mt-4 grid grid-cols-3 gap-2 text-[10px]">
          <div className="bvbb-heat-low rounded px-2 py-1 text-center">Yüksek CapEx</div>
          <div className="bvbb-heat-mid rounded px-2 py-1 text-center">Yavaş ölçek</div>
          <div className="bvbb-heat-low rounded px-2 py-1 text-center">Bakım yükü</div>
        </div>
      </div>

      {/* Cloud side */}
      <div className="bvbb-card-sky rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Cloud className="w-5 h-5 text-sky-300" />
          <div className="text-sm font-semibold text-white">Cloud</div>
          <span className="ml-auto text-[10px] text-sky-300/80 font-mono">PAY-AS-YOU-GO</span>
        </div>
        <svg viewBox="0 0 320 200" className="w-full h-44">
          {/* Cloud */}
          <defs>
            <linearGradient id="cloudGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
          <path
            d="M 80 110
               C 60 110, 50 90, 70 80
               C 70 55, 110 50, 125 70
               C 140 50, 185 55, 190 80
               C 220 75, 240 100, 220 120
               C 230 140, 200 150, 175 140
               L 100 140
               C 70 145, 55 125, 80 110 Z"
            fill="url(#cloudGrad)"
            opacity="0.92"
          />
          {/* Service blocks inside */}
          <g>
            <rect x="85" y="85" width="28" height="20" rx="3" fill="#fff" opacity="0.85" />
            <text x="99" y="99" textAnchor="middle" fontSize="9" fill="#1e3a8a" fontWeight="700">EC2</text>
            <rect x="120" y="85" width="28" height="20" rx="3" fill="#fff" opacity="0.85" />
            <text x="134" y="99" textAnchor="middle" fontSize="9" fill="#1e3a8a" fontWeight="700">S3</text>
            <rect x="155" y="85" width="32" height="20" rx="3" fill="#fff" opacity="0.85" />
            <text x="171" y="99" textAnchor="middle" fontSize="9" fill="#1e3a8a" fontWeight="700">RDS</text>
            <rect x="105" y="110" width="60" height="18" rx="3" fill="#fff" opacity="0.85" />
            <text x="135" y="123" textAnchor="middle" fontSize="9" fill="#1e3a8a" fontWeight="700">Lambda</text>
          </g>
          {/* Connections to users */}
          <g stroke="#93c5fd" strokeWidth="1.5" fill="none">
            <path d="M 30 175 L 80 145" />
            <path d="M 160 175 L 160 145" />
            <path d="M 290 175 L 230 145" />
          </g>
          {/* User glyphs */}
          <circle cx="30" cy="180" r="6" fill="#93c5fd" />
          <circle cx="160" cy="180" r="6" fill="#93c5fd" />
          <circle cx="290" cy="180" r="6" fill="#93c5fd" />
        </svg>
        <div className="mt-4 grid grid-cols-3 gap-2 text-[10px]">
          <div className="bvbb-heat-high rounded px-2 py-1 text-center">OpEx</div>
          <div className="bvbb-heat-high rounded px-2 py-1 text-center">Anlık ölçek</div>
          <div className="bvbb-heat-high rounded px-2 py-1 text-center">Sağlayıcı bakar</div>
        </div>
      </div>
    </motion.div>
  );
}

function AWSConsoleMock() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bvbb-window-chrome w-full"
    >
      {/* OS-level window bar */}
      <div className="bvbb-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-mono flex-1 max-w-md mx-auto text-center justify-center"
          style={{ background: "#0d1117", color: "#94a3b8" }}
        >
          <Globe className="w-3 h-3" />
          <span>console.aws.amazon.com/home</span>
        </div>
      </div>

      {/* AWS top nav */}
      <div className="bvbb-aws-header flex items-center px-4 py-2 gap-4 text-[11px]">
        <span className="w-6 h-6 rounded bvbb-aws-tile flex items-center justify-center text-[11px]">aws</span>
        <span className="text-white/90 font-medium">Services</span>
        <input
          readOnly
          value="Search [Option+S]"
          className="bg-[#16191f] text-gray-400 px-3 py-1 rounded flex-1 max-w-xs text-[10px] border border-[#3b4858]"
        />
        <div className="ml-auto flex items-center gap-4 text-gray-300">
          <span>N. Virginia ▾</span>
          <span>ocetlenbik @ mcbu</span>
        </div>
      </div>

      {/* Body grid */}
      <div className="grid grid-cols-[180px_1fr] bvbb-aws-body">
        {/* Sidebar */}
        <div className="bvbb-aws-sidebar p-3 text-[11px]">
          <div className="text-[9px] uppercase tracking-wider text-gray-500 mb-2">Recently visited</div>
          <ul className="space-y-1.5">
            {[
              { icon: HardDrive, name: "S3", color: "#22c55e" },
              { icon: Server, name: "EC2", color: "#ff9900" },
              { icon: Database, name: "RDS", color: "#3b82f6" },
              { icon: Zap, name: "Lambda", color: "#fb923c" },
              { icon: Globe, name: "CloudFront", color: "#a855f7" },
              { icon: Lock, name: "IAM", color: "#ef4444" },
            ].map((s) => (
              <li key={s.name} className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/5 cursor-pointer">
                <s.icon className="w-3.5 h-3.5" style={{ color: s.color }} />
                <span>{s.name}</span>
              </li>
            ))}
          </ul>
          <div className="text-[9px] uppercase tracking-wider text-gray-500 mt-4 mb-2">Favorites</div>
          <div className="text-gray-500 italic text-[10px]">No favorites yet</div>
        </div>

        {/* Main panel */}
        <div className="bvbb-aws-main p-4 space-y-3 min-h-[280px]">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-[#16191f]">Console Home</div>
            <button className="text-[10px] bg-[#ff9900] text-[#16191f] px-2.5 py-1 rounded font-semibold">
              + Create resource
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {/* Resources widget */}
            <div className="bvbb-aws-widget p-3">
              <div className="text-[10px] uppercase text-gray-500">Recent resources</div>
              <div className="text-2xl font-bold mt-1">14</div>
              <div className="text-[10px] text-gray-500">across 4 services</div>
              <div className="mt-2 h-1.5 bg-gray-200 rounded">
                <div className="h-full bg-[#ff9900] rounded" style={{ width: "70%" }} />
              </div>
            </div>
            {/* Cost widget */}
            <div className="bvbb-aws-widget p-3">
              <div className="text-[10px] uppercase text-gray-500">MTD cost</div>
              <div className="text-2xl font-bold mt-1">$0.42</div>
              <div className="text-[10px] text-green-700">Free Tier · %98 kalan</div>
              <svg viewBox="0 0 100 24" className="mt-2 w-full h-5">
                <polyline points="0,18 12,16 24,14 36,12 48,10 60,11 72,8 84,5 100,4" stroke="#22c55e" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            {/* Health widget */}
            <div className="bvbb-aws-widget p-3">
              <div className="text-[10px] uppercase text-gray-500">Service health</div>
              <div className="text-2xl font-bold mt-1 text-green-700">OK</div>
              <div className="text-[10px] text-gray-500">us-east-1 normal</div>
              <div className="mt-2 flex gap-1">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="flex-1 h-2 rounded-sm" style={{ background: i === 7 ? "#f59e0b" : "#22c55e" }} />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bvbb-aws-widget p-3">
              <div className="text-[10px] uppercase text-gray-500 mb-2">EC2 instances</div>
              <table className="w-full text-[10px]">
                <thead className="text-gray-500">
                  <tr><th className="text-left">Name</th><th className="text-left">Type</th><th className="text-right">State</th></tr>
                </thead>
                <tbody>
                  <tr><td>bigdata-master</td><td>t3.medium</td><td className="text-right text-green-700">● running</td></tr>
                  <tr><td>worker-01</td><td>t2.micro</td><td className="text-right text-green-700">● running</td></tr>
                  <tr><td>worker-02</td><td>t2.micro</td><td className="text-right text-amber-600">● pending</td></tr>
                </tbody>
              </table>
            </div>
            <div className="bvbb-aws-widget p-3">
              <div className="text-[10px] uppercase text-gray-500 mb-2">S3 storage</div>
              <div className="space-y-1.5 text-[10px]">
                <div className="flex justify-between"><span>mcbu-veriseti/</span><span className="text-gray-500">412 MB</span></div>
                <div className="flex justify-between"><span>logs-2026/</span><span className="text-gray-500">88 MB</span></div>
                <div className="flex justify-between"><span>backup-rds/</span><span className="text-gray-500">2.1 GB</span></div>
                <div className="h-1.5 bg-gray-200 rounded mt-2">
                  <div className="h-full bg-[#ff9900] rounded" style={{ width: "26%" }} />
                </div>
                <div className="text-[9px] text-gray-500">2.6 GB / 5 GB Free Tier</div>
              </div>
            </div>
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
  /* ─────────────────  1 · COVER  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2103 · 1. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="bvbb-shimmer">Büyük Veri İçin</span>
          <br />
          <span className="text-white">Bulut Bilişim</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Sunucusuz dünya — her şey buluttan. AWS, Azure ve GCP üzerinde
          ölçeklenebilir veri mimarileri kurmaya hoş geldiniz.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {[
            { name: "AWS", tag: "Amazon Web Services", color: "#ff9900", icon: Cloud },
            { name: "Azure", tag: "Microsoft Cloud", color: "#0078d4", icon: Cloud },
            { name: "GCP", tag: "Google Cloud Platform", color: "#4285f4", icon: Cloud },
          ].map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              className="bvbb-card rounded-xl p-4 flex items-center gap-3"
              style={{ borderColor: `${p.color}55` }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${p.color}22`, border: `1px solid ${p.color}66` }}
              >
                <p.icon className="w-5 h-5" style={{ color: p.color }} />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white">{p.name}</div>
                <div className="text-[10px] text-gray-400">{p.tag}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-10 text-[11px] font-mono text-gray-600"
        >
          Öğr. Gör. Osman Can Çetlenbik · MCBÜ MYO · Bilgisayar Programcılığı
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  2 · DÖNEM HARİTASI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>15 Haftalık Yolculuk</Eyebrow>
      <H2>Bu dönem ne öğreneceğiz?</H2>
      <Sub className="mt-3 max-w-3xl">
        Bulut bilişim temellerinden başlayıp Hadoop, Spark ve bulutta makine
        öğrenmesine uzanan eksiksiz bir büyük veri yolculuğu.
      </Sub>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-8">
        {[
          { w: "01", t: "Bulut bilişime giriş", icon: Cloud, here: true },
          { w: "02", t: "Büyük veri kavramları", icon: Database },
          { w: "03", t: "IaaS · PaaS · SaaS", icon: Layers3 },
          { w: "04", t: "AWS temelleri", icon: Cloud },
          { w: "05", t: "Azure & GCP", icon: Globe },
          { w: "06", t: "Sanallaştırma", icon: Box },
          { w: "07", t: "Konteynerler", icon: Package },
          { w: "08", t: "Vize", icon: Target },
          { w: "09", t: "Hadoop ekosistemi", icon: Network },
          { w: "10", t: "HDFS & MapReduce", icon: HardDrive },
          { w: "11", t: "Apache Spark", icon: Zap },
          { w: "12", t: "NoSQL & DWH", icon: Database },
          { w: "13", t: "Bulutta ML", icon: Brain },
          { w: "14", t: "Güvenlik & maliyet", icon: Shield },
          { w: "15", t: "Final projeleri", icon: Sparkles },
        ].map((item, i) => (
          <motion.div
            key={item.w}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            className={`rounded-lg p-3 ${
              item.here ? "bvbb-card-sky" : "bvbb-card"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-mono text-gray-500">H{item.w}</span>
              <item.icon
                className="w-4 h-4"
                style={{ color: item.here ? "#60a5fa" : "#94a3b8" }}
              />
            </div>
            <div className={`text-xs font-medium ${item.here ? "text-white" : "text-gray-300"}`}>
              {item.t}
            </div>
            {item.here && (
              <div className="mt-1 text-[9px] font-mono text-[#60a5fa]">● buradayız</div>
            )}
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3 · STATS  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Rakamlarla Bulut · 2024</Eyebrow>
      <H2>
        Bulut artık <span className="bvbb-shimmer-sky">istisna değil, kural</span>
      </H2>
      <Sub className="mt-3 max-w-3xl">
        Pazar büyüklüğü ve benimsenme oranları bulutun bir tercih değil bir
        zorunluluk haline geldiğini gösteriyor.
      </Sub>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <StatCard
          icon={DollarSign}
          value="$679B"
          label="2024 küresel bulut pazarı"
          source="Gartner · 2024"
          delay={0.0}
          accent="#22c55e"
        />
        <StatCard
          icon={TrendingUp}
          value="%94"
          label="kurumsal bulut kullanım oranı"
          source="Flexera · 2024"
          delay={0.1}
          accent="#2563eb"
        />
        <StatCard
          icon={Activity}
          value="1.7 MB"
          label="kişi başı / saniye üretilen veri"
          source="Domo · Data Never Sleeps"
          delay={0.2}
          accent="#a855f7"
        />
        <StatCard
          icon={Cloud}
          value="%60"
          label="kurumsal verinin 2025'te bulutta olma tahmini"
          source="IDC · 2024"
          delay={0.3}
          accent="#ff9900"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 bvbb-card rounded-xl p-4 flex items-start gap-3"
      >
        <Lightbulb className="w-5 h-5 text-[#60a5fa] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-300">
          <span className="bvbb-token">Sonuç</span> Veri patlaması artık tek bir
          sunucuya sığmıyor — esnek, ölçeklenebilir ve ölçülebilir kaynaklara
          ihtiyaç var.
        </p>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  4 · QUOTE BENIOFF  ───────────────── */
  () => (
    <QuoteSlide
      quote="Bulut bilişim sadece IT'yi değil, iş yapma şeklini değiştiriyor."
      author="Marc Benioff"
      role="Salesforce CEO · Kurucu"
    />
  ),

  /* ─────────────────  5 · SECTION 1 · BULUT NEDİR  ───────────────── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Bulut Nedir?"
      subtitle="Tanım, NIST'in beş temel özelliği ve on-premise dünya ile temel farklar."
      bgGradient="linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)"
      shadow="0 20px 60px -10px rgba(37, 99, 235, 0.6)"
      icon={<Database className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  6 · NIST 5 ÖZELLİK  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>NIST SP 800-145 · Resmi Tanım</Eyebrow>
      <H2>Bulut bilişimin 5 temel özelliği</H2>
      <Sub className="mt-3 max-w-3xl">
        ABD Ulusal Standartlar Enstitüsü (NIST) bir hizmetin &ldquo;bulut&rdquo;
        sayılabilmesi için aşağıdaki beş özelliği şart koşar.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={Terminal}
          title="On-demand self-service"
          desc="Kullanıcı, insan müdahalesi olmadan hesap kaynaklarını web üzerinden anında temin edebilir."
          delay={0.0}
          accent="#2563eb"
        />
        <FeatureCard
          icon={Network}
          title="Broad network access"
          desc="Hizmetler standart ağ protokolleri ile her cihazdan (PC, telefon, IoT) erişilebilir."
          delay={0.1}
          accent="#0ea5e9"
        />
        <FeatureCard
          icon={Layers}
          title="Resource pooling"
          desc="Sağlayıcının kaynakları çoklu kiracı modelinde paylaşılır, fiziksel konum soyutlanır."
          delay={0.2}
          accent="#a855f7"
        />
        <FeatureCard
          icon={Zap}
          title="Rapid elasticity"
          desc="Talebe göre dakikalar içinde otomatik büyür veya küçülür — kullanıcıya sınırsız görünür."
          delay={0.3}
          accent="#22c55e"
        />
        <FeatureCard
          icon={BarChart3}
          title="Measured service"
          desc="Kullanım otomatik ölçülür, raporlanır ve faturalanır — şeffaf, kullandığın kadar öde."
          delay={0.4}
          accent="#f59e0b"
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bvbb-card-sky rounded-xl p-6 flex flex-col justify-center"
        >
          <Sparkles className="w-6 h-6 text-[#60a5fa] mb-3" />
          <div className="text-white font-semibold text-base mb-1">5/5 = bulut</div>
          <div className="text-xs text-gray-400">
            Bir hizmet bu beş özelliğin tamamını karşılamıyorsa &ldquo;sadece
            uzak sunucu&rdquo; olarak değerlendirilir.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  7 · ON-PREM vs CLOUD TABLE  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Karşılaştırma</Eyebrow>
      <H2>On-premise vs Cloud</H2>
      <Sub className="mt-3 max-w-3xl">
        İki dünya arasındaki temel farkları beş eksende inceleyelim.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-8 bvbb-card rounded-xl overflow-hidden"
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#1e293b] text-gray-300">
              <th className="text-left px-4 py-3 font-semibold">Boyut</th>
              <th className="text-left px-4 py-3 font-semibold">
                <Building2 className="inline w-4 h-4 mr-1.5 -mt-0.5" />
                On-Premise
              </th>
              <th className="text-left px-4 py-3 font-semibold">
                <Cloud className="inline w-4 h-4 mr-1.5 -mt-0.5 text-[#60a5fa]" />
                Cloud
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {[
              {
                k: "Donanım sahipliği",
                op: "Kurum satın alır, sahiplenir",
                cl: "Sağlayıcıya ait, kiralanır",
              },
              {
                k: "Ölçeklenebilirlik",
                op: "Yeni donanım siparişi → haftalar",
                cl: "Auto-scaling · dakikalar",
              },
              {
                k: "Maliyet modeli",
                op: "CapEx — büyük peşin yatırım",
                cl: "OpEx — kullandığın kadar",
              },
              {
                k: "Bakım & güncelleme",
                op: "İç IT ekibinin sorumluluğu",
                cl: "Sağlayıcı yönetir (paylaşılan model)",
              },
              {
                k: "Başlangıç hızı",
                op: "Sipariş → kurulum → haftalar",
                cl: "Hesap aç → 5 dakikada üretim",
              },
            ].map((row, i) => (
              <motion.tr
                key={row.k}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="border-t border-white/5"
              >
                <td className="px-4 py-3 font-medium text-white">{row.k}</td>
                <td className="px-4 py-3 text-gray-400">{row.op}</td>
                <td className="px-4 py-3 text-[#93c5fd]">{row.cl}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-4 text-[11px] text-gray-500 text-center"
      >
        <span className="bvbb-token">Not</span> Bulut her zaman daha ucuz
        değildir — sabit ve öngörülebilir iş yükleri için on-premise hâlâ
        rekabetçi olabilir.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  8 · AWS SERVİS PANELİ (mockup)  ───────────────── */
  () => (
    <SlideShell bgPattern={false}>
      <Eyebrow>AWS · Hızlı Tanışma</Eyebrow>
      <H2>Bulutta ilk 6 hizmet</H2>
      <Sub className="mt-3 max-w-3xl">
        Konsol arayüzünden seçeceğimiz altı temel servisi sık sık göreceksiniz.
      </Sub>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        <CloudServiceTile
          icon={HardDrive}
          brand="S3"
          name="Simple Storage"
          desc="Sınırsız nesne deposu — fotoğraf, log, yedek; %99.999999999 dayanıklılık."
          color="#22c55e"
          delay={0.0}
        />
        <CloudServiceTile
          icon={Server}
          brand="EC2"
          name="Elastic Compute"
          desc="İstediğin işletim sistemi + işlemciyle sanal sunucu — dakikada açılır."
          color="#ff9900"
          delay={0.08}
        />
        <CloudServiceTile
          icon={Database}
          brand="RDS"
          name="Managed Database"
          desc="MySQL, PostgreSQL, Aurora — sağlayıcı yönetir, sen sorgu yazarsın."
          color="#3b82f6"
          delay={0.16}
        />
        <CloudServiceTile
          icon={Zap}
          brand="Lambda"
          name="Serverless Function"
          desc="Sunucu yok — sadece kod. Tetikleme başına milisaniye faturalama."
          color="#fb923c"
          delay={0.24}
        />
        <CloudServiceTile
          icon={Globe}
          brand="CloudFront"
          name="CDN"
          desc="450+ uç nokta üzerinden global içerik dağıtımı — düşük gecikme."
          color="#a855f7"
          delay={0.32}
        />
        <CloudServiceTile
          icon={Lock}
          brand="IAM"
          name="Identity & Access"
          desc="Kullanıcı, rol ve izin yönetimi — en az yetki ilkesi (least privilege)."
          color="#ef4444"
          delay={0.40}
        />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  9 · SECTION 2 · HİZMET MODELLERİ  ───────────────── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Hizmet Modelleri"
      subtitle="IaaS, PaaS, SaaS — bulut yığınının üç katmanı ve kim neyi yönetir?"
      bgGradient="linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)"
      shadow="0 20px 60px -10px rgba(124, 58, 237, 0.6)"
      icon={<Layers className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  10 · IaaS / PaaS / SaaS  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Üç Katman</Eyebrow>
      <H2>IaaS · PaaS · SaaS</H2>
      <Sub className="mt-3 max-w-3xl">
        Yukarı çıktıkça soyutlama artar, kontrol azalır — ama hız ve kolaylık
        kazanırsınız.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[
          {
            tier: "SaaS",
            sub: "Software as a Service",
            color: "#22c55e",
            icon: Briefcase,
            ctrl: "En düşük",
            you: ["Veriler", "Kullanıcılar"],
            them: ["Uygulama", "Çalışma zamanı", "OS", "Sanallaştırma", "Donanım"],
            ex: ["Microsoft 365", "Gmail", "Salesforce", "Dropbox"],
          },
          {
            tier: "PaaS",
            sub: "Platform as a Service",
            color: "#2563eb",
            icon: Code,
            ctrl: "Orta",
            you: ["Uygulama kodu", "Veriler"],
            them: ["Çalışma zamanı", "OS", "Sanallaştırma", "Donanım"],
            ex: ["Heroku", "Google App Engine", "Azure Web Apps", "AWS Elastic Beanstalk"],
          },
          {
            tier: "IaaS",
            sub: "Infrastructure as a Service",
            color: "#a855f7",
            icon: Server,
            ctrl: "En yüksek",
            you: ["Uygulama", "Çalışma zamanı", "OS", "Veri"],
            them: ["Sanallaştırma", "Sunucu", "Depolama", "Ağ"],
            ex: ["Amazon EC2", "Azure VM", "Google Compute Engine", "DigitalOcean"],
          },
        ].map((m, i) => (
          <motion.div
            key={m.tier}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bvbb-card rounded-xl p-5"
            style={{ borderColor: `${m.color}55` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${m.color}25`, border: `1px solid ${m.color}66` }}
              >
                <m.icon className="w-5 h-5" style={{ color: m.color }} />
              </div>
              <div>
                <div className="text-base font-bold text-white">{m.tier}</div>
                <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">{m.sub}</div>
              </div>
            </div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Kontrol seviyesi</div>
            <div className="text-sm font-semibold mb-3" style={{ color: m.color }}>{m.ctrl}</div>

            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Senin sorumluluğun</div>
            <div className="flex flex-wrap gap-1 mb-3">
              {m.you.map((y) => (
                <span key={y} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/10">
                  {y}
                </span>
              ))}
            </div>

            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Örnekler</div>
            <ul className="space-y-1">
              {m.ex.map((e) => (
                <li key={e} className="text-xs text-gray-300 flex items-center gap-1.5">
                  <Check className="w-3 h-3 flex-shrink-0" style={{ color: m.color }} />
                  {e}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-5 text-center text-[11px] text-gray-500"
      >
        Pizza analojisi: IaaS = malzemeleri sen al, PaaS = mutfak hazır, SaaS =
        pizza sıcak servis edilir.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  11 · ON-PREM vs CLOUD DIAGRAM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Görsel Karşılaştırma</Eyebrow>
      <H2>Sunucu odası vs Bulut</H2>
      <Sub className="mt-3 max-w-3xl">
        Aynı işi iki farklı dünyada hayal edelim: solda kabloların arasında
        koşturan IT, sağda tek tıklamayla başlatılan kaynaklar.
      </Sub>
      <div className="mt-8">
        <OnPremVsCloudDiagram />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  12 · SECTION 3 · DAĞITIM MODELLERİ  ───────────────── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Dağıtım Modelleri"
      subtitle="Public, Private, Hybrid, Community — bulutun kim tarafından, nasıl tüketildiği."
      bgGradient="linear-gradient(135deg, #0ea5e9 0%, #22d3ee 100%)"
      shadow="0 20px 60px -10px rgba(14, 165, 233, 0.6)"
      icon={<Globe className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  13 · PUBLIC / PRIVATE / HYBRID / COMMUNITY  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>4 Dağıtım Modeli</Eyebrow>
      <H2>Public · Private · Hybrid · Community</H2>
      <Sub className="mt-3 max-w-3xl">
        &ldquo;Kim sahip, kim kullanıyor?&rdquo; sorusunun cevabı bulutun
        dağıtım modelini belirler.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-7">
        {[
          {
            n: "Public Cloud",
            icon: Globe,
            color: "#2563eb",
            ex: "AWS · Azure · GCP",
            pro: "Düşük maliyet, hızlı başlangıç",
            con: "Veri kontrolü daha az, regülasyon riski",
          },
          {
            n: "Private Cloud",
            icon: Lock,
            color: "#a855f7",
            ex: "VMware vCloud · OpenStack",
            pro: "Tam kontrol, yüksek güvenlik",
            con: "Yüksek CapEx, iç ekip yükü",
          },
          {
            n: "Hybrid Cloud",
            icon: Workflow,
            color: "#22c55e",
            ex: "AWS Outposts · Azure Arc",
            pro: "Esneklik, kritik veri içeride",
            con: "Karmaşık entegrasyon",
          },
          {
            n: "Community Cloud",
            icon: Users,
            color: "#f59e0b",
            ex: "GovCloud · Sağlık birlikleri",
            pro: "Ortak ihtiyaç, ortak maliyet",
            con: "Sınırlı esneklik, üye yönetimi zor",
          },
        ].map((d, i) => (
          <motion.div
            key={d.n}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bvbb-card rounded-xl p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${d.color}22`, border: `1px solid ${d.color}66` }}
              >
                <d.icon className="w-5 h-5" style={{ color: d.color }} />
              </div>
              <div>
                <div className="text-base font-bold text-white">{d.n}</div>
                <div className="text-[10px] text-gray-500 font-mono">{d.ex}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs mt-3">
              <div className="bvbb-heat-high rounded p-2">
                <div className="flex items-center gap-1 font-semibold text-[10px] uppercase tracking-wider">
                  <Check className="w-3 h-3" /> Avantaj
                </div>
                <div className="mt-1">{d.pro}</div>
              </div>
              <div className="bvbb-heat-low rounded p-2">
                <div className="flex items-center gap-1 font-semibold text-[10px] uppercase tracking-wider">
                  <X className="w-3 h-3" /> Dezavantaj
                </div>
                <div className="mt-1">{d.con}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  14 · MARKET SHARE BAR CHART  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Pazar Payı · IaaS+PaaS · 2024</Eyebrow>
      <H2>Büyük üçlü ve diğerleri</H2>
      <Sub className="mt-3 max-w-3xl">
        Synergy Research Group&apos;a göre küresel bulut altyapı pazarının
        yaklaşık üçte ikisi tek bir sağlayıcıda toplanmış değil — ama ilk üçte.
      </Sub>

      <div className="mt-10 space-y-5">
        {[
          { name: "AWS", value: 32, color: "#ff9900", barClass: "bvbb-bar-aws", note: "Lider · Amazon" },
          { name: "Microsoft Azure", value: 23, color: "#0078d4", barClass: "bvbb-bar-azure", note: "Hızlı büyüyor" },
          { name: "Google Cloud", value: 11, color: "#4285f4", barClass: "bvbb-bar-gcp", note: "Veri & ML odaklı" },
          { name: "Diğer (Alibaba, IBM, Oracle…)", value: 34, color: "#94a3b8", barClass: "bvbb-bar-other", note: "Birlikte" },
        ].map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">{p.name}</span>
                <span className="text-[10px] text-gray-500 font-mono">{p.note}</span>
              </div>
              <span className="text-lg font-bold" style={{ color: p.color }}>%{p.value}</span>
            </div>
            <div className="h-6 bg-white/5 rounded-md overflow-hidden border border-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${p.value * 2.5}%` }}
                transition={{ duration: 1, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className={`h-full ${p.barClass}`}
                style={{ maxWidth: "100%" }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="mt-8 text-[11px] text-gray-500 text-center font-mono"
      >
        Kaynak · Synergy Research Group, Q4 2024 · Bar genişlikleri görselleştirme için ölçeklenmiştir.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  15 · AWS CONSOLE MOCKUP  ───────────────── */
  () => (
    <SlideShell bgPattern={false}>
      <Eyebrow>İlk Bakış · console.aws.amazon.com</Eyebrow>
      <H2 className="text-center md:text-left">AWS Yönetim Konsolu</H2>
      <Sub className="mt-3 max-w-3xl">
        Önümüzdeki haftalarda bu arayüzde çok vakit geçireceğiz. Üst navigasyon,
        sol panel ve widget&apos;lı ana ekran ile tanışın.
      </Sub>
      <div className="mt-7">
        <AWSConsoleMock />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  16 · BÜYÜK VERİ İÇİN NEDEN BULUT  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu Dersin Özü</Eyebrow>
      <H2>
        Büyük veri için neden <span className="bvbb-shimmer-sky">bulut?</span>
      </H2>
      <Sub className="mt-3 max-w-3xl">
        Terabayt&apos;lardan petabayt&apos;lara uzanan iş yükleri klasik
        sunucularda zar zor ayakta dururken bulut bunu rutine çeviriyor.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <FeatureCard
          icon={HardDrive}
          title="Sınırsız depolama"
          desc="S3, GCS, Azure Blob — petabayt ölçeğinde nesne deposu; sen sadece veriyi yükle."
          delay={0.0}
          accent="#22c55e"
        />
        <FeatureCard
          icon={Cpu}
          title="Esnek hesaplama gücü"
          desc="GPU/TPU dahil her cins düğümü dakikada başlat, iş bitince kapat — boşa para yok."
          delay={0.1}
          accent="#2563eb"
        />
        <FeatureCard
          icon={Brain}
          title="Hazır ML araçları"
          desc="SageMaker, Vertex AI, Azure ML — model eğitimi, deploy, izleme tek panelden."
          delay={0.2}
          accent="#a855f7"
        />
        <FeatureCard
          icon={DollarSign}
          title="Kullandığın kadar öde"
          desc="Saniye/istek bazlı faturalama + Free Tier — okul projeleri için neredeyse bedava."
          delay={0.3}
          accent="#f59e0b"
        />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  17 · BU HAFTA YAPILACAKLAR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Hafta 1 · Ev Ödevi</Eyebrow>
      <H2>Bu hafta yapılacaklar</H2>
      <Sub className="mt-3 max-w-3xl">
        Tek bir hesap, 30 dakika ve sıfır maliyet ile bulutta yaşıyor olacaksınız.
      </Sub>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            n: 1,
            t: "AWS Free Tier hesabı aç",
            d: "aws.amazon.com → kredi kartı gerekli ama 12 ay ücretsiz kotalar tanımlı.",
            icon: Cloud,
            color: "#ff9900",
          },
          {
            n: 2,
            t: "S3 bucket oluştur",
            d: "Globally unique isim seç (örn. bvabb-ocet-2026); region: eu-central-1 öner.",
            icon: HardDrive,
            color: "#22c55e",
          },
          {
            n: 3,
            t: "İlk dosyayı yükle",
            d: "Bir resim veya CSV at; public/private ayarını ve presigned URL kavramını dene.",
            icon: Package,
            color: "#2563eb",
          },
          {
            n: 4,
            t: "EC2 t2.micro başlat",
            d: "Amazon Linux 2023 AMI · SSH key indir · ilk Linux komutlarını çalıştır.",
            icon: Server,
            color: "#a855f7",
          },
        ].map((item, i) => (
          <motion.label
            key={item.n}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className="bvbb-card bvbb-card-hover rounded-xl p-5 flex gap-4 cursor-pointer transition-all"
          >
            <div className="flex flex-col items-center gap-2">
              <input
                type="checkbox"
                className="w-5 h-5 accent-[#2563eb] rounded"
              />
              <span className="text-[10px] font-mono text-gray-500">#{item.n}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <item.icon className="w-4 h-4" style={{ color: item.color }} />
                <div className="text-base font-semibold text-white">{item.t}</div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{item.d}</p>
            </div>
          </motion.label>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-5 text-[11px] text-gray-500 text-center"
      >
        <span className="bvbb-token">İpucu</span> Faturalama uyarısı (Billing
        alert) oluşturmayı unutma — $5 üzerinde e-posta gelsin.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  18 · SIRADAKİ HAFTA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Hafta 2 Önizleme</Eyebrow>
      <H2>Büyük veri kavramlarının genel bakışı</H2>
      <Sub className="mt-3 max-w-3xl">
        Bulut altyapımız hazır — şimdi üzerinde duracağımız &ldquo;büyük veri&rdquo;nin
        ne demek olduğunu, nereden geldiğini ve neden klasik araçların çuvalladığını
        konuşacağız.
      </Sub>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Database}
          title="5V Modeli"
          desc="Volume, Velocity, Variety, Veracity, Value — büyük veriyi tanımlayan beş eksen."
          delay={0.0}
          accent="#2563eb"
        />
        <FeatureCard
          icon={Activity}
          title="Veri kaynakları"
          desc="IoT, sosyal medya, sensör, log, görüntü, finansal akış — yapılandırılmış ve değil."
          delay={0.1}
          accent="#a855f7"
        />
        <FeatureCard
          icon={Search}
          title="Vaka çalışmaları"
          desc="Netflix önerileri, Uber rota tahmini, banka dolandırıcılık tespiti."
          delay={0.2}
          accent="#22c55e"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 bvbb-card rounded-xl p-5 flex items-center gap-4"
      >
        <Settings className="w-6 h-6 text-[#60a5fa]" />
        <div className="flex-1">
          <div className="text-sm font-semibold text-white">Hazırlık</div>
          <div className="text-xs text-gray-400 mt-0.5">
            Çevrimiçi okuma · NIST Big Data Working Group raporu (Volume 1) ·
            Bölüm 1 ve 2.
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-500" />
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  19 · QUOTE VOGELS  ───────────────── */
  () => (
    <QuoteSlide
      quote="Bulut bilişim teknolojiden çok bir iş stratejisidir."
      author="Werner Vogels"
      role="Amazon Web Services · CTO"
    />
  ),

  /* ─────────────────  20 · TEŞEKKÜRLER  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex w-24 h-24 rounded-3xl items-center justify-center mb-8"
          style={{
            background: "linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)",
            boxShadow: "0 20px 60px -10px rgba(37,99,235,0.6)",
          }}
        >
          <Cloud className="w-12 h-12 text-white" />
        </motion.div>

        <Eyebrow>Hafta 1 · Son</Eyebrow>
        <H1>
          <span className="bvbb-shimmer">Teşekkürler!</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Sorular için derslik 7&apos;de buluşuyoruz. Bulutta görüşmek üzere.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {[
            { icon: Users, label: "Ders saati", value: "Çarşamba 09:55 — 12:30" },
            { icon: Briefcase, label: "Konum", value: "Derslik 7 · MCBÜ MYO" },
            { icon: Globe, label: "Ders yöneticisi", value: "Öğr. Gör. Osman Can Çetlenbik" },
          ].map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="bvbb-card rounded-xl p-4 text-left"
            >
              <c.icon className="w-5 h-5 text-[#60a5fa] mb-2" />
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">{c.label}</div>
              <div className="text-sm font-semibold text-white mt-1">{c.value}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-10 text-[11px] font-mono text-gray-600"
        >
          BVA 2103 · Büyük Veri İçin Bulut Bilişim · Güz 2026
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
            background: "linear-gradient(90deg, #2563eb, #60a5fa, #2563eb)",
            boxShadow: "0 0 16px rgba(37,99,235,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#60a5fa]/80">
          BVA 2103 · 1. Hafta · Bulut Bilişime Giriş
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[#60a5fa]/60">
            <span className="text-[#60a5fa]">
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
            className="p-1.5 text-gray-500 hover:text-[#60a5fa] transition-colors"
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
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#60a5fa] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
                  ? "w-5 bg-[#60a5fa]"
                  : "w-1.5 bg-white/15 hover:bg-white/40"
              }`}
              style={
                i === current
                  ? { boxShadow: "0 0 10px rgba(96,165,250,0.6)" }
                  : undefined
              }
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#60a5fa] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
