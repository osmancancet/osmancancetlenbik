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
  Workflow,
  GitBranch,
  Repeat,
  Play,
  Square,
  Diamond,
  ArrowDownUp,
  CornerDownRight,
  Target,
  Lightbulb,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Hash,
  Calendar,
  Users,
  PenTool,
  ListOrdered,
  Code2,
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

/* ---- Flowchart symbol reference card ------------------------- */

function FlowSymbol({
  shape,
  label,
  english,
  desc,
  delay = 0,
}: {
  shape: "oval" | "rect" | "diamond" | "parallel" | "doc";
  label: string;
  english: string;
  desc: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="prog-card rounded-xl p-5 flex flex-col items-center text-center"
    >
      <svg viewBox="0 0 140 80" className="w-32 h-20 mb-3">
        {shape === "oval" && (
          <ellipse cx="70" cy="40" rx="60" ry="28" fill="#3776ab33" stroke="#5fa8e0" strokeWidth="2" />
        )}
        {shape === "rect" && (
          <rect x="14" y="14" width="112" height="52" rx="4" fill="#3776ab33" stroke="#5fa8e0" strokeWidth="2" />
        )}
        {shape === "diamond" && (
          <polygon points="70,8 132,40 70,72 8,40" fill="#3776ab33" stroke="#5fa8e0" strokeWidth="2" />
        )}
        {shape === "parallel" && (
          <polygon points="30,14 132,14 110,66 8,66" fill="#3776ab33" stroke="#5fa8e0" strokeWidth="2" />
        )}
        {shape === "doc" && (
          <path
            d="M14,14 H126 V58 Q98,72 70,58 Q42,44 14,58 Z"
            fill="#3776ab33"
            stroke="#5fa8e0"
            strokeWidth="2"
          />
        )}
      </svg>
      <div className="text-sm font-semibold text-white">{label}</div>
      <div className="text-[10px] font-mono text-[#5fa8e0] mt-0.5">{english}</div>
      <div className="text-xs text-gray-400 mt-1 leading-relaxed">{desc}</div>
    </motion.div>
  );
}

/* ---- Generic flow window wrapper ----------------------------- */

function FlowFrame({
  caption,
  children,
}: {
  caption?: ReactNode;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="prog-flow-bg p-6 w-full"
    >
      {children}
      {caption && (
        <div className="mt-3 text-[11px] text-gray-500 text-center font-mono">
          {caption}
        </div>
      )}
    </motion.div>
  );
}

/* Reusable SVG defs (arrow markers + gradients) */
function FlowDefs() {
  return (
    <defs>
      <marker
        id="arr"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M0,0 L10,5 L0,10 z" fill="#5fa8e0" />
      </marker>
      <linearGradient id="gBlue" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3776ab" />
        <stop offset="100%" stopColor="#2c5d88" />
      </linearGradient>
      <linearGradient id="gYellow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffd43b" />
        <stop offset="100%" stopColor="#e6a800" />
      </linearGradient>
      <linearGradient id="gGreen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4ec9b0" />
        <stop offset="100%" stopColor="#2f8a76" />
      </linearGradient>
    </defs>
  );
}

/* ---- Sequence (sıralı) flowchart: dikdörtgen alanı ----------- */

function SequenceFlow() {
  return (
    <FlowFrame caption="Sıralı yapı · dallanma yok, her adım bir kez ve sırayla çalışır.">
      <svg viewBox="0 0 320 520" className="w-full h-auto max-w-xs mx-auto">
        <FlowDefs />

        <ellipse cx="160" cy="32" rx="70" ry="22" fill="url(#gGreen)" stroke="#4ec9b0" strokeWidth="1.5" />
        <text x="160" y="38" textAnchor="middle" fill="#0a0a0a" fontSize="13" fontWeight="700">
          Başla
        </text>

        <polygon points="55,90 265,90 245,134 35,134" fill="url(#gYellow)" stroke="#ffd43b" strokeWidth="1.5" />
        <text x="150" y="117" textAnchor="middle" fill="#1a1a1a" fontSize="12" fontWeight="600">
          Kenar (a) al
        </text>

        <rect x="50" y="172" width="220" height="48" rx="5" fill="url(#gBlue)" stroke="#5fa8e0" strokeWidth="1.5" />
        <text x="160" y="201" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
          alan = a × a
        </text>

        <rect x="50" y="256" width="220" height="48" rx="5" fill="url(#gBlue)" stroke="#5fa8e0" strokeWidth="1.5" />
        <text x="160" y="285" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
          cevre = 4 × a
        </text>

        <polygon points="55,342 265,342 245,386 35,386" fill="url(#gYellow)" stroke="#ffd43b" strokeWidth="1.5" />
        <text x="150" y="369" textAnchor="middle" fill="#1a1a1a" fontSize="12" fontWeight="600">
          alan, cevre yaz
        </text>

        <ellipse cx="160" cy="460" rx="70" ry="22" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" />
        <text x="160" y="466" textAnchor="middle" fill="white" fontSize="13" fontWeight="700">
          Bitir
        </text>

        <line x1="160" y1="54" x2="160" y2="88" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr)" />
        <line x1="160" y1="134" x2="160" y2="170" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr)" />
        <line x1="160" y1="220" x2="160" y2="254" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr)" />
        <line x1="160" y1="304" x2="160" y2="340" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr)" />
        <line x1="160" y1="386" x2="160" y2="436" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr)" />
      </svg>
    </FlowFrame>
  );
}

/* ---- Decision (karar) flowchart: en büyük sayı --------------- */

function DecisionFlow() {
  return (
    <FlowFrame caption="Karar yapısı · eşkenar dörtgen akışı iki kola ayırır (Evet / Hayır).">
      <svg viewBox="0 0 700 470" className="w-full h-auto">
        <FlowDefs />

        <ellipse cx="350" cy="34" rx="70" ry="22" fill="url(#gGreen)" stroke="#4ec9b0" strokeWidth="1.5" />
        <text x="350" y="40" textAnchor="middle" fill="#0a0a0a" fontSize="14" fontWeight="700">
          Başla
        </text>

        <polygon points="250,90 450,90 430,138 230,138" fill="url(#gYellow)" stroke="#ffd43b" strokeWidth="1.5" />
        <text x="340" y="118" textAnchor="middle" fill="#1a1a1a" fontSize="13" fontWeight="600">
          a, b sayılarını al
        </text>

        <polygon points="350,180 480,250 350,320 220,250" fill="url(#gBlue)" stroke="#5fa8e0" strokeWidth="1.5" />
        <text x="350" y="248" textAnchor="middle" fill="white" fontSize="13" fontWeight="700">
          a &gt; b ?
        </text>

        <polygon points="105,348 255,348 235,396 85,396" fill="url(#gYellow)" stroke="#ffd43b" strokeWidth="1.5" />
        <text x="170" y="376" textAnchor="middle" fill="#1a1a1a" fontSize="12" fontWeight="600">
          a&apos;yı yaz
        </text>

        <polygon points="445,348 595,348 575,396 425,396" fill="url(#gYellow)" stroke="#ffd43b" strokeWidth="1.5" />
        <text x="510" y="376" textAnchor="middle" fill="#1a1a1a" fontSize="12" fontWeight="600">
          b&apos;yi yaz
        </text>

        <ellipse cx="350" cy="438" rx="70" ry="22" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" />
        <text x="350" y="444" textAnchor="middle" fill="white" fontSize="14" fontWeight="700">
          Bitir
        </text>

        <line x1="350" y1="56" x2="350" y2="88" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr)" />
        <line x1="350" y1="138" x2="350" y2="178" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr)" />
        <line x1="285" y1="285" x2="185" y2="346" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr)" />
        <line x1="415" y1="285" x2="515" y2="346" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr)" />
        <line x1="170" y1="396" x2="300" y2="432" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr)" />
        <line x1="510" y1="396" x2="400" y2="432" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr)" />

        <text x="245" y="318" fill="#86efac" fontSize="12" fontWeight="700">
          Evet
        </text>
        <text x="430" y="318" fill="#fca5a5" fontSize="12" fontWeight="700">
          Hayır
        </text>
      </svg>
    </FlowFrame>
  );
}

/* ---- Loop (döngü) flowchart: 1..n topla ---------------------- */

function LoopFlow() {
  return (
    <FlowFrame caption="Döngü yapısı · karardan çıkan ok yukarı geri döner, bu geri dönüş tekrarı sağlar.">
      <svg viewBox="0 0 640 560" className="w-full h-auto">
        <FlowDefs />

        <ellipse cx="300" cy="32" rx="68" ry="22" fill="url(#gGreen)" stroke="#4ec9b0" strokeWidth="1.5" />
        <text x="300" y="38" textAnchor="middle" fill="#0a0a0a" fontSize="13" fontWeight="700">
          Başla
        </text>

        <polygon points="205,88 395,88 377,132 187,132" fill="url(#gYellow)" stroke="#ffd43b" strokeWidth="1.5" />
        <text x="291" y="115" textAnchor="middle" fill="#1a1a1a" fontSize="12" fontWeight="600">
          n sayısını al
        </text>

        <rect x="190" y="168" width="220" height="46" rx="5" fill="url(#gBlue)" stroke="#5fa8e0" strokeWidth="1.5" />
        <text x="300" y="196" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
          toplam = 0 ; i = 1
        </text>

        <polygon points="300,246 430,312 300,378 170,312" fill="url(#gBlue)" stroke="#5fa8e0" strokeWidth="1.5" />
        <text x="300" y="316" textAnchor="middle" fill="white" fontSize="13" fontWeight="700">
          i &lt;= n ?
        </text>

        <rect x="190" y="412" width="220" height="46" rx="5" fill="url(#gBlue)" stroke="#5fa8e0" strokeWidth="1.5" />
        <text x="300" y="440" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
          toplam += i ; i += 1
        </text>

        <polygon points="455,288 605,288 587,332 437,332" fill="url(#gYellow)" stroke="#ffd43b" strokeWidth="1.5" />
        <text x="521" y="315" textAnchor="middle" fill="#1a1a1a" fontSize="12" fontWeight="600">
          toplam yaz
        </text>

        <ellipse cx="521" cy="392" rx="64" ry="22" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" />
        <text x="521" y="398" textAnchor="middle" fill="white" fontSize="13" fontWeight="700">
          Bitir
        </text>

        <line x1="300" y1="54" x2="300" y2="86" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr)" />
        <line x1="300" y1="132" x2="300" y2="166" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr)" />
        <line x1="300" y1="214" x2="300" y2="244" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr)" />
        <line x1="300" y1="378" x2="300" y2="410" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr)" />

        {/* Hayır kolu: karardan sağa çıkışa */}
        <line x1="430" y1="312" x2="455" y2="312" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr)" />
        <line x1="521" y1="332" x2="521" y2="368" stroke="#5fa8e0" strokeWidth="2" markerEnd="url(#arr)" />

        {/* Evet sonrası geri dönüş: işlem kutusundan sola, yukarı, karara geri */}
        <polyline
          points="190,435 90,435 90,312 168,312"
          fill="none"
          stroke="#86efac"
          strokeWidth="2"
          markerEnd="url(#arr)"
        />

        <text x="300" y="402" fill="#86efac" fontSize="12" fontWeight="700">
          Evet
        </text>
        <text x="436" y="302" fill="#fca5a5" fontSize="12" fontWeight="700">
          Hayır
        </text>
        <text x="60" y="305" fill="#86efac" fontSize="11" fontWeight="600">
          geri dön
        </text>
      </svg>
    </FlowFrame>
  );
}

/* ---- Pseudocode -> flowchart -> Python mapping --------------- */

function MappingBlock({
  delay = 0,
  title,
  accent,
  children,
}: {
  delay?: number;
  title: string;
  accent: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="prog-pseudo p-4"
    >
      <div
        className="text-[10px] font-mono uppercase tracking-widest mb-3"
        style={{ color: accent }}
      >
        {title}
      </div>
      <div className="space-y-1">{children}</div>
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
        <Eyebrow>BVA 1101 · 3. Hafta · Bahar Dönemi</Eyebrow>
        <H1>
          <span className="prog-shimmer">Akış Diyagramları</span>
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Algoritmayı kelimelerle değil, standart şekiller ve oklarla çizmek —
          kod yazmadan önce mantığı kâğıt üstünde görmek.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 mt-14 max-w-3xl mx-auto"
        >
          {[
            { name: "Sembol", icon: Diamond, color: "#5fa8e0", desc: "ISO 5807 şekilleri" },
            { name: "Akış", icon: ArrowDownUp, color: "#ffd43b", desc: "Oklarla yön" },
            { name: "Yapı", icon: Workflow, color: "#4ec9b0", desc: "Sıra · karar · döngü" },
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
                className="w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center"
                style={{ background: `${l.color}22`, color: l.color, border: `1px solid ${l.color}66` }}
              >
                <l.icon className="w-5 h-5" />
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
      <Eyebrow>Köprü · 2. haftadan 3. haftaya</Eyebrow>
      <H2>Geçen hafta algoritma türlerini konuştuk; şimdi onları çiziyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        2. haftada sıralı, koşullu ve döngüsel algoritmaları metin olarak tanımladık.
        Bu hafta aynı üç yapıyı <span className="text-white font-semibold">akış diyagramı</span>{" "}
        (flowchart) ile görselleştirmeyi öğreniyoruz: standart semboller, akış yönü ve
        adım adım çizim.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#5fa8e0]">
            <ListOrdered className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Geçen hafta</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#5fa8e0] flex-shrink-0" />Sıralı, koşullu ve döngüsel algoritma türleri</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#5fa8e0] flex-shrink-0" />Sözde kod (pseudocode) ile yazılı anlatım</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#5fa8e0] flex-shrink-0" />Girdi → işlem → çıktı mantığı</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="prog-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <Workflow className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu hafta hedef</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#4ec9b0] flex-shrink-0" />Akış diyagramı sembollerini tanımak (ISO 5807)</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#4ec9b0] flex-shrink-0" />Akış yönü ve oklarla bağlama kuralları</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#4ec9b0] flex-shrink-0" />Sıfırdan bir problemi diyagrama dökmek</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3 · DERSİN AKIŞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: semboller → yapılar → çizim</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce hangi şeklin ne anlama geldiğini öğreniyoruz; sonra üç temel yapıyı
        (sıra, karar, döngü) diyagramda görüyoruz; en sonunda bir problemi adım adım
        kendimiz çiziyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Semboller", items: ["Akış diyagramı nedir?", "ISO 5807 standart şekiller", "Akış yönü ve ok kuralları"], icon: Diamond, accent: "#3776ab" },
          { range: "02", title: "Yapılar", items: ["Sıralı yapı", "Karar yapısı (if)", "Döngü yapısı (while)"], icon: Workflow, accent: "#ffd43b" },
          { range: "03", title: "Çizim", items: ["Problemi adım adım çöz", "Diyagram → Python", "Sık yapılan hatalar"], icon: PenTool, accent: "#4ec9b0" },
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

  /* ─────────────────  4 · SECTION 1/3 · SEMBOLLER  ───────────────── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="Akış Diyagramı &amp; Semboller"
      subtitle="Akış diyagramı, bir algoritmanın adımlarını standart şekiller ve oklarla gösteren grafiksel bir anlatımdır."
      glowClass="prog-glow-blue"
      icon={<Diamond className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  5 · AKIŞ DİYAGRAMI NEDİR?  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 1 · Semboller</Eyebrow>
      <H2>Akış diyagramı nedir?</H2>
      <Sub className="mt-3 max-w-3xl">
        Bir algoritmanın işleyişini <span className="text-white font-semibold">şekiller ve oklarla</span>{" "}
        gösteren grafiksel araç. Kod yazmadan önce mantığı görselleştirir; karmaşık akışı
        herkesin anlayacağı tek bir resme indirger.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <FeatureCard
          icon={Workflow}
          title="Görsel mantık"
          desc="Adımlar arasındaki bağlantı ve karar noktaları bir bakışta görünür."
          delay={0.0}
          accent="#3776ab"
        />
        <FeatureCard
          icon={Code2}
          title="Dilden bağımsız"
          desc="Aynı diyagram Python, Java veya C++ — her dile çevrilebilir. Mantık ortaktır."
          delay={0.1}
          accent="#5fa8e0"
        />
        <FeatureCard
          icon={Users}
          title="Ortak dil"
          desc="Geliştirici, öğrenci ve müşteri aynı resme bakarak anlaşır; yanlış anlamayı azaltır."
          delay={0.2}
          accent="#ffd43b"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 prog-card rounded-xl p-5 flex items-center gap-4"
      >
        <Lightbulb className="w-6 h-6 text-[#ffd43b] flex-shrink-0" />
        <div className="text-sm text-gray-300">
          <span className="text-white font-semibold">Hatırla:</span> Diyagram bir
          <span className="text-white"> plandır</span>, kod değil. Önce planı doğrula,
          sonra koda dök — hata kâğıt üstünde düzeltmek çok daha ucuzdur.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  6 · TEMEL SEMBOLLER  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 1 · Semboller</Eyebrow>
      <H2>Beş temel sembol</H2>
      <Sub className="mt-3 max-w-3xl">
        Akış diyagramı sembolleri ISO 5807 standardıyla tanımlanır. Aşağıdaki beş şekil,
        çoğu programı çizmeye yeter.
      </Sub>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-10">
        <FlowSymbol
          shape="oval"
          label="Terminal"
          english="oval"
          desc="Başla / Bitir — diyagramın giriş ve çıkış noktaları"
          delay={0.0}
        />
        <FlowSymbol
          shape="parallel"
          label="Giriş / Çıkış"
          english="paralelkenar"
          desc="Veri okuma (input) veya yazdırma (output)"
          delay={0.1}
        />
        <FlowSymbol
          shape="rect"
          label="İşlem"
          english="dikdörtgen"
          desc="Hesaplama veya değer atama adımı"
          delay={0.2}
        />
        <FlowSymbol
          shape="diamond"
          label="Karar"
          english="eşkenar dörtgen"
          desc="Evet / hayır sorusu — akışı dallandırır"
          delay={0.3}
        />
        <FlowSymbol
          shape="doc"
          label="Belge"
          english="document"
          desc="Yazdırılan rapor / belge çıktısı (opsiyonel)"
          delay={0.4}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 prog-card rounded-xl p-5 flex items-center gap-4"
      >
        <ArrowDownUp className="w-6 h-6 text-[#5fa8e0] flex-shrink-0" />
        <div className="text-sm text-gray-300">
          <span className="text-white font-semibold">Bağlayıcı oklar (akış çizgisi):</span>{" "}
          sembolleri birbirine bağlar ve akışın yönünü gösterir. Ok ucu her zaman bir
          sonraki adımı işaret eder.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  7 · SEMBOL → ANLAM TABLOSU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 1 · Referans tablosu</Eyebrow>
      <H2>Hangi şekil ne işe yarar?</H2>
      <Sub className="mt-3 max-w-3xl">
        Sembolü kullanım amacına göre seçeriz. Yanlış şekil, diyagramı okuyan kişiyi
        yanıltır — bu yüzden standart önemlidir.
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
              <th>Sembol</th>
              <th>Şekil</th>
              <th>Anlamı</th>
              <th>Örnek</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold text-white">Terminal</td>
              <td>Oval</td>
              <td>Başlangıç ve bitiş noktası</td>
              <td className="font-mono text-[#5fa8e0]">Başla · Bitir</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Giriş / Çıkış</td>
              <td>Paralelkenar</td>
              <td>Veri al veya sonuç yazdır</td>
              <td className="font-mono text-[#5fa8e0]">n al · sonucu yaz</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">İşlem</td>
              <td>Dikdörtgen</td>
              <td>Hesaplama veya atama</td>
              <td className="font-mono text-[#5fa8e0]">alan = a × a</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Karar</td>
              <td>Eşkenar dörtgen</td>
              <td>Koşul sorgusu — iki çıkış</td>
              <td className="font-mono text-[#5fa8e0]">n &gt; 0 ?</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Akış çizgisi</td>
              <td>Ok</td>
              <td>Adımlar arası yön</td>
              <td className="font-mono text-[#5fa8e0]">→ ↓ ↑</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  8 · AKIŞ YÖNÜ KURALLARI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 1 · Akış yönü</Eyebrow>
      <H2>Akış yönü kuralları</H2>
      <Sub className="mt-3 max-w-3xl">
        Diyagramı okunabilir kılan birkaç basit alışkanlık vardır. Bunlara uymak, başkasının
        diyagramını da senin kadar hızlı anlamasını sağlar.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: ArrowDownUp, t: "Yukarıdan aşağıya", d: "Varsayılan akış yönü yukarıdan aşağıya, soldan sağa ilerler." },
          { icon: GitBranch, t: "Karardan iki ok", d: "Eşkenar dörtgenden tam iki ok çıkar: biri Evet, biri Hayır. Etiketlemeyi unutma." },
          { icon: CornerDownRight, t: "Döngü geri döner", d: "Tekrar için bir akış çizgisi yukarı, önceki bir adıma geri bağlanır." },
          { icon: CheckCircle2, t: "Tek başla, net bitiş", d: "Bir Başla noktası olur; her yol mutlaka bir Bitir&apos;e ulaşır — boşta kalan ok olmaz." },
        ].map((r, i) => (
          <motion.div
            key={r.t}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="prog-card rounded-xl p-5 flex items-start gap-4"
          >
            <div className="w-11 h-11 rounded-lg bg-[#3776ab]/15 border border-[#3776ab]/40 flex items-center justify-center flex-shrink-0">
              <r.icon className="w-5 h-5 text-[#5fa8e0]" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm mb-1">{r.t}</div>
              <div className="text-sm text-gray-400 leading-relaxed">{r.d}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  9 · SECTION 2/3 · YAPILAR  ───────────────── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Üç Temel Yapı"
      subtitle="Her algoritma; sıralı, karar ve döngü yapılarının birleşiminden oluşur. Bu üçünü diyagramda görelim."
      glowClass="prog-glow-yellow"
      icon={<Workflow className="w-14 h-14 text-[#1a1a1a]" />}
    />
  ),

  /* ─────────────────  10 · SIRALI YAPI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 2 · Sıralı yapı</Eyebrow>
      <H2 className="mb-2">Sıralı yapı · kare alan ve çevre</H2>
      <Sub className="max-w-3xl mb-2">
        Adımlar tepeden tabana, dallanma olmadan tek tek çalışır. Kullanıcıdan kenarı al,
        alanı ve çevreyi hesapla, ekrana yazdır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mt-4">
        <SequenceFlow />
        <div className="space-y-3">
          {[
            { n: "1", t: "Kenarı al", d: "Paralelkenar — kullanıcıdan a değeri okunur." },
            { n: "2", t: "Hesapla", d: "İki dikdörtgen: alan = a × a, çevre = 4 × a." },
            { n: "3", t: "Yazdır", d: "Paralelkenar — sonuçlar ekrana verilir." },
          ].map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.12 }}
              className="prog-card rounded-lg p-4 flex items-start gap-3"
            >
              <div className="w-7 h-7 rounded-md bg-[#3776ab]/20 border border-[#3776ab]/50 flex items-center justify-center text-[12px] font-mono text-[#5fa8e0] flex-shrink-0">
                {s.n}
              </div>
              <div>
                <div className="text-white font-semibold text-sm">{s.t}</div>
                <div className="text-xs text-gray-400 mt-0.5">{s.d}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  11 · KARAR YAPISI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 2 · Karar yapısı</Eyebrow>
      <H2 className="mb-2">Karar yapısı · iki sayıdan büyüğü</H2>
      <Sub className="max-w-3xl mb-4">
        Eşkenar dörtgen bir koşul sorar; cevaba göre akış iki kola ayrılır. İki sayıyı al,
        <span className="text-white"> a &gt; b</span> sorusunu sor, büyük olanı yazdır.
      </Sub>
      <div className="max-w-3xl mx-auto">
        <DecisionFlow />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  12 · DÖNGÜ YAPISI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 2 · Döngü yapısı</Eyebrow>
      <H2 className="mb-2">Döngü yapısı · 1&apos;den n&apos;e topla</H2>
      <Sub className="max-w-3xl mb-4">
        Karardan çıkan bir akış çizgisi yukarı geri döner; bu geri dönüş adımı tekrarlar.
        i sayacı n&apos;i geçince döngü biter ve toplam yazdırılır.
      </Sub>
      <div className="max-w-3xl mx-auto">
        <LoopFlow />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  13 · SECTION 3/3 · ÇİZİM  ───────────────── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Diyagram Oluşturma"
      subtitle="Bir problemi sıfırdan akış diyagramına dökmek: adımları ayır, sembolleri seç, okları bağla, kontrol et."
      glowClass="prog-glow-green"
      icon={<PenTool className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  14 · ÇİZİM ADIMLARI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 3 · Çizim yöntemi</Eyebrow>
      <H2>Diyagramı beş adımda kur</H2>
      <Sub className="mt-3 max-w-3xl">
        Boş kâğıt korkutucu olmasın. Bu sırayı izlersen her problem aynı şekilde çözülür.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-10">
        {[
          { n: "1", icon: Target, t: "Problemi anla", d: "Girdi ne, çıktı ne? Önce bunu netleştir." },
          { n: "2", icon: ListOrdered, t: "Adımlara böl", d: "Çözümü sıralı küçük adımlara ayır." },
          { n: "3", icon: Diamond, t: "Sembol seç", d: "Her adıma uygun şekli ata (işlem mi, karar mı)." },
          { n: "4", icon: ArrowDownUp, t: "Okları bağla", d: "Başla&apos;dan Bitir&apos;e akışı çiz." },
          { n: "5", icon: CheckCircle2, t: "Kontrol et", d: "Bir örnek değerle diyagramı zihinden çalıştır." },
        ].map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="prog-card rounded-xl p-4 text-center"
          >
            <div className="w-11 h-11 rounded-lg bg-[#4ec9b0]/15 border border-[#4ec9b0]/40 flex items-center justify-center mx-auto mb-3">
              <s.icon className="w-5 h-5 text-[#4ec9b0]" />
            </div>
            <div className="text-[10px] font-mono text-[#4ec9b0] mb-1">ADIM {s.n}</div>
            <div className="text-white font-semibold text-sm mb-1">{s.t}</div>
            <div className="text-xs text-gray-400 leading-relaxed">{s.d}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 prog-card rounded-xl p-5 flex items-center gap-4"
      >
        <Lightbulb className="w-6 h-6 text-[#ffd43b] flex-shrink-0" />
        <div className="text-sm text-gray-300">
          <span className="text-white font-semibold">5. adım kritik:</span> Diyagramı bir
          örnek girdiyle &quot;kafadan&quot; çalıştırmak (kuru çalıştırma / dry run) çoğu
          mantık hatasını daha kod yazmadan yakalar.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  15 · DİYAGRAM → PYTHON  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 3 · Diyagramdan koda</Eyebrow>
      <H2 className="mb-2">Aynı mantık · diyagram ve Python</H2>
      <Sub className="max-w-3xl mb-6">
        Karar yapısının her sembolü doğrudan bir Python satırına karşılık gelir. Diyagramı
        doğru çizersen kod neredeyse kendiliğinden yazılır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        <MappingBlock title="Diyagram adımı" accent="#5fa8e0" delay={0.0}>
          <div>Paralelkenar: a, b al</div>
          <div>Eşkenar dörtgen: a &gt; b ?</div>
          <div className="pl-3 text-[#86efac]">Evet → a&apos;yı yaz</div>
          <div className="pl-3 text-[#fca5a5]">Hayır → b&apos;yi yaz</div>
          <div>Oval: Bitir</div>
        </MappingBlock>

        <div className="hidden md:flex items-center justify-center h-full">
          <ChevronRight className="w-8 h-8 text-[#5fa8e0]/60" />
        </div>

        <MappingBlock title="Python kodu" accent="#ffd43b" delay={0.2}>
          <div>
            <span className="prog-pseudo-kw">a, b</span> = <span className="tok-builtin">int</span>(<span className="tok-builtin">input</span>()), <span className="tok-builtin">int</span>(<span className="tok-builtin">input</span>())
          </div>
          <div>
            <span className="prog-pseudo-kw">if</span> a &gt; b:
          </div>
          <div className="pl-4">
            <span className="tok-builtin">print</span>(a)
          </div>
          <div>
            <span className="prog-pseudo-kw">else</span>:
          </div>
          <div className="pl-4">
            <span className="tok-builtin">print</span>(b)
          </div>
        </MappingBlock>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 text-center text-xs text-gray-500 font-mono"
      >
        Eşkenar dörtgen → if · Evet kolu → if gövdesi · Hayır kolu → else gövdesi
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  16 · SIK YAPILAN HATALAR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bölüm 3 · Dikkat</Eyebrow>
      <H2>Sık yapılan dört hata</H2>
      <Sub className="mt-3 max-w-3xl">
        Bu hatalar diyagramı çalışmaz ya da okunmaz hâle getirir. Çizerken kontrol listesi
        olarak kullan.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { t: "Yanlış sembol", d: "Karar adımını dikdörtgenle çizmek. Koşul varsa şekil eşkenar dörtgen olmalı." },
          { t: "Etiketsiz karar", d: "Karardan çıkan oklara Evet / Hayır yazmamak. Okuyan hangi kolun ne olduğunu bilemez." },
          { t: "Sonsuz döngü", d: "Döngünün bir çıkış koşulu yok; geri dönüş okunu hiç bitmeyen biçimde bağlamak." },
          { t: "Açık uç", d: "Bir yolun Bitir&apos;e bağlanmaması; boşta kalan ok veya ulaşılamayan adım bırakmak." },
        ].map((h, i) => (
          <motion.div
            key={h.t}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="prog-card rounded-xl p-5 flex items-start gap-4"
          >
            <div className="w-11 h-11 rounded-lg bg-[#ef4444]/15 border border-[#ef4444]/40 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-[#fca5a5]" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm mb-1">{h.t}</div>
              <div className="text-sm text-gray-400 leading-relaxed">{h.d}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  17 · UYGULAMA / GÖREV  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulama</Eyebrow>
      <H2>Üç problemi kendin çiz</H2>
      <Sub className="mt-3 max-w-3xl">
        Kâğıt-kalemle veya draw.io / Lucidchart gibi bir araçla çiz. Sonraki derse
        getirip tahtada birlikte kontrol edeceğiz.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 prog-card rounded-xl p-6 max-w-3xl mx-auto"
      >
        <div className="text-xs uppercase tracking-wider text-[#5fa8e0] mb-4 font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Görev listesi · Hafta 03
        </div>
        <div className="space-y-3">
          {[
            { t: "Bir sayının pozitif/negatif/sıfır olduğunu bul", d: "Karar yapısı · iki ardışık koşul (n > 0, n == 0)", lvl: "Karar" },
            { t: "Bir öğrencinin notunu harfe çevir (AA-FF)", d: "İç içe karar · birden çok eşik değeriyle dallanma", lvl: "Çoklu karar" },
            { t: "1&apos;den 10&apos;a kadar sayıların karesini yazdır", d: "Döngü yapısı · sayaç ve geri dönüş oku", lvl: "Döngü" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="flex items-start gap-3 bg-black/30 rounded-lg p-3"
            >
              <div className="w-6 h-6 rounded-md border border-[#5fa8e0]/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 text-[#5fa8e0]" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-white font-medium">{item.t}</div>
                <div className="text-xs text-gray-400 mt-0.5">{item.d}</div>
              </div>
              <div className="text-[10px] font-mono text-[#5fa8e0] bg-[#3776ab]/15 border border-[#3776ab]/40 rounded px-2 py-1 mt-0.5 flex-shrink-0">
                {item.lvl}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-5 text-center text-xs text-gray-500 font-mono"
      >
        İpucu: Önce sözde kodu yaz, sonra her satırı bir sembole dönüştür.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  18 · SIRADAKİ HAFTA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Hafta 04 · Önizleme</Eyebrow>
      <H2>Değişkenler ve veri tipleri</H2>
      <Sub className="mt-3 max-w-3xl">
        Diyagramdaki kutularda &quot;a&quot;, &quot;toplam&quot;, &quot;alan&quot; gibi adlar
        kullandık. Önümüzdeki hafta bu adların ardındaki kavramı açıyoruz: değişkenler bilgisayar
        belleğinde nasıl saklanır ve hangi veri tipleri vardır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <FeatureCard
          icon={Hash}
          title="Değişken nedir?"
          desc="Bellekte adlandırılmış bir kutu; içine değer koyar, sonra adıyla çağırırsın."
          accent="#3776ab"
          delay={0.0}
        />
        <FeatureCard
          icon={Layers}
          title="Veri tipleri"
          desc="int, float, str, bool — Python&apos;da değerin türü ve neden önemli olduğu."
          accent="#5fa8e0"
          delay={0.1}
        />
        <FeatureCard
          icon={FileText}
          title="Atama &amp; tip dönüşümü"
          desc="= operatörü, input() ile gelen metni sayıya çevirmek (int / float)."
          accent="#ffd43b"
          delay={0.2}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center text-xs text-gray-500 font-mono"
      >
        Bu haftaki diyagramlardaki kutuları gerçek Python değişkenlerine dönüştüreceğiz.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  19 · KAPANIŞ  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8 prog-glow-green"
        >
          <Workflow className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>Hafta 03 · Özet</Eyebrow>
        <H1>
          <span className="prog-shimmer">Önce çiz, sonra kodla</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta sembolleri, akış yönünü ve üç temel yapıyı diyagramda gördük. Artık bir
          problemi koda dökmeden önce kâğıt üstünde çözebilirsin — soruları derse getir.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 text-left"
        >
          <div className="prog-card rounded-xl p-5">
            <Calendar className="w-5 h-5 text-[#5fa8e0] mb-2" />
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
              Ders saati
            </div>
            <div className="text-white font-semibold mt-1">Perşembe</div>
            <div className="text-sm text-gray-400">09:55 — 12:30</div>
          </div>

          <div className="prog-card rounded-xl p-5">
            <PenTool className="w-5 h-5 text-[#5fa8e0] mb-2" />
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
              Teslim
            </div>
            <div className="text-white font-semibold mt-1">3 diyagram</div>
            <div className="text-sm text-gray-400">karar &amp; döngü problemleri</div>
          </div>

          <div className="prog-card rounded-xl p-5">
            <FileText className="w-5 h-5 text-[#5fa8e0] mb-2" />
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
              Sonraki hafta
            </div>
            <div className="text-white font-semibold mt-1">H04</div>
            <div className="text-sm text-gray-400">Değişken &amp; veri tipi</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-12 text-[11px] font-mono text-gray-600 uppercase tracking-[0.3em]"
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
          BVA 1101 · 3. Hafta · Akış Diyagramları
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
