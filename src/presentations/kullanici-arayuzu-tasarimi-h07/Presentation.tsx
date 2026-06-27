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
  Droplet,
  Contrast,
  Eye,
  Sparkles,
  Target,
  Lightbulb,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  X,
  Sun,
  Moon,
  Layers,
  Pipette,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Accessibility,
  Calendar,
  Hash,
  Globe,
  Brain,
  Type,
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

/* ============================================================
   TOPIC-SPECIFIC MOCKUPS — RENK TEORİSİ & WCAG
   ============================================================ */

/* Renk çarkı — birincil/ikincil/üçüncül 12 renk */
function ColorWheel() {
  const hues = Array.from({ length: 12 }, (_, i) => i * 30);
  const labels: Record<number, string> = {
    0: "Kırmızı",
    120: "Yeşil",
    240: "Mavi",
    60: "Sarı",
    180: "Camgöbeği",
    300: "Macenta",
  };
  return (
    <div className="relative w-[320px] h-[320px] mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {hues.map((h) => {
          const start = (h - 15) * (Math.PI / 180);
          const end = (h + 15) * (Math.PI / 180);
          const r1 = 50;
          const r2 = 92;
          const x1 = 100 + r1 * Math.cos(start);
          const y1 = 100 + r1 * Math.sin(start);
          const x2 = 100 + r2 * Math.cos(start);
          const y2 = 100 + r2 * Math.sin(start);
          const x3 = 100 + r2 * Math.cos(end);
          const y3 = 100 + r2 * Math.sin(end);
          const x4 = 100 + r1 * Math.cos(end);
          const y4 = 100 + r1 * Math.sin(end);
          return (
            <path
              key={h}
              d={`M ${x1} ${y1} L ${x2} ${y2} A ${r2} ${r2} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${r1} ${r1} 0 0 0 ${x1} ${y1} Z`}
              fill={`hsl(${h}, 75%, 55%)`}
              stroke="#0a0a0a"
              strokeWidth="1"
            />
          );
        })}
        <circle cx="100" cy="100" r="48" fill="#0a0a0a" />
        <text x="100" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#f9a8d4">
          HSL
        </text>
        <text x="100" y="110" textAnchor="middle" fontSize="6.5" fill="#9ca3af">
          Hue · Sat · Light
        </text>
      </svg>
      {Object.entries(labels).map(([deg, name]) => {
        const d = Number(deg) * (Math.PI / 180);
        const left = 50 + 48 * Math.cos(d);
        const top = 50 + 48 * Math.sin(d);
        return (
          <span
            key={deg}
            className="absolute text-[9px] font-mono text-white/80 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            {name}
          </span>
        );
      })}
    </div>
  );
}

/* HSL kanal açıklama kartları */
function HSLChannels() {
  const channels = [
    {
      icon: Palette,
      key: "H",
      name: "Hue · Ton",
      range: "0°–360°",
      desc: "Renk çarkındaki açı. 0° kırmızı, 120° yeşil, 240° mavi.",
      grad: "linear-gradient(90deg, #ef4444, #eab308, #22c55e, #06b6d4, #3b82f6, #a855f7, #ef4444)",
    },
    {
      icon: Droplet,
      key: "S",
      name: "Saturation · Doygunluk",
      range: "%0–%100",
      desc: "Rengin canlılığı. %0 gri tonu, %100 en saf hâli.",
      grad: "linear-gradient(90deg, #6b7280, #ec4899)",
    },
    {
      icon: Sun,
      key: "L",
      name: "Lightness · Açıklık",
      range: "%0–%100",
      desc: "Siyahtan beyaza. %50 saf renk; uçlarda detay kaybolur.",
      grad: "linear-gradient(90deg, #000000, #ec4899, #ffffff)",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {channels.map((c, i) => (
        <motion.div
          key={c.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + i * 0.12 }}
          className="katas-card rounded-xl p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-pink-500/15 border border-pink-500/40">
              <c.icon className="w-5 h-5 text-pink-400" />
            </div>
            <div>
              <div className="text-base font-semibold text-white">{c.name}</div>
              <div className="text-[10px] font-mono text-pink-300">{c.range}</div>
            </div>
          </div>
          <div className="h-3 rounded-full mb-3 katas-swatch" style={{ background: c.grad }} />
          <p className="text-sm text-gray-400 leading-relaxed">{c.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

/* Renk uyum şemaları — küçük çark üzerinde işaretler */
function HarmonyDiagram({
  title,
  angles,
  desc,
  accent,
}: {
  title: string;
  angles: number[];
  desc: string;
  accent: string;
}) {
  const baseHues = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="katas-card rounded-xl p-5 flex flex-col items-center text-center"
    >
      <div className="text-sm font-semibold text-white mb-1">{title}</div>
      <svg viewBox="0 0 120 120" className="w-[150px] h-[150px] my-2">
        {baseHues.map((h) => {
          const d = (h - 90) * (Math.PI / 180);
          const cx = 60 + 44 * Math.cos(d);
          const cy = 60 + 44 * Math.sin(d);
          const picked = angles.includes(h);
          return (
            <circle
              key={h}
              cx={cx}
              cy={cy}
              r={picked ? 9 : 4}
              fill={`hsl(${h}, 70%, 55%)`}
              stroke={picked ? "#ffffff" : "transparent"}
              strokeWidth={picked ? 2 : 0}
            />
          );
        })}
        {angles.map((h, idx) => {
          const d = (h - 90) * (Math.PI / 180);
          const cx = 60 + 44 * Math.cos(d);
          const cy = 60 + 44 * Math.sin(d);
          return <line key={idx} x1="60" y1="60" x2={cx} y2={cy} stroke={accent} strokeWidth="1.5" opacity="0.6" />;
        })}
        <circle cx="60" cy="60" r="3" fill="#0a0a0a" stroke={accent} strokeWidth="1" />
      </svg>
      <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

/* WCAG kontrast denetleyici kartı */
function ContrastCheckerCard({
  fg,
  bg,
  ratio,
  passAA,
  passAAA,
  note,
}: {
  fg: string;
  bg: string;
  ratio: string;
  passAA: boolean;
  passAAA: boolean;
  note: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="katas-card rounded-xl overflow-hidden"
    >
      <div className="p-7 text-center" style={{ background: bg, color: fg }}>
        <div className="text-xl font-bold">Bu metin okunabilir mi?</div>
        <div className="text-sm opacity-90 mt-1">Aa Bb Cc · 16px gövde metni</div>
      </div>
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider font-mono">Kontrast oranı</div>
            <div className="text-2xl font-bold text-white">{ratio}</div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Badge ok={passAA} label="AA" />
            <Badge ok={passAAA} label="AAA" />
          </div>
        </div>
        <div className="text-[11px] text-gray-400 border-t border-white/5 pt-2 flex items-center gap-2 font-mono">
          <span style={{ color: fg, background: bg }} className="px-1.5 rounded">{fg}</span>
          <span className="text-gray-600">on</span>
          <span className="px-1.5 rounded border border-white/10">{bg}</span>
        </div>
        <div className="text-[11px] text-gray-500 mt-2">{note}</div>
      </div>
    </motion.div>
  );
}

function Badge({ ok, label }: { ok: boolean; label: string }) {
  return ok ? (
    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
      <Check className="w-3.5 h-3.5" /> {label}
    </div>
  ) : (
    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/40 text-red-300 text-xs font-bold">
      <X className="w-3.5 h-3.5" /> {label}
    </div>
  );
}

/* DevTools / token paneli */
function TokenPanel() {
  return (
    <FigmaFrameMockup title="tasarim-sistemi.css — renk token'ları">
      <div className="katas-code">
        <div><span className="katas-code-com">/* Marka & nötr ölçek — HSL ile sistematik */</span></div>
        <div><span className="katas-code-key">:root</span> {"{"}</div>
        <div className="pl-4"><span className="katas-code-key">--brand-500</span>: <span className="katas-code-val">hsl(330 81% 60%)</span>; <span className="katas-code-com">/* ana */</span></div>
        <div className="pl-4"><span className="katas-code-key">--brand-700</span>: <span className="katas-code-val">hsl(336 74% 35%)</span>; <span className="katas-code-com">/* koyu */</span></div>
        <div className="pl-4"><span className="katas-code-key">--surface</span>:   <span className="katas-code-val">hsl(0 0% 7%)</span>;</div>
        <div className="pl-4"><span className="katas-code-key">--text</span>:      <span className="katas-code-val">hsl(0 0% 98%)</span>; <span className="katas-code-com">/* 18:1 */</span></div>
        <div className="pl-4"><span className="katas-code-key">--text-muted</span>: <span className="katas-code-val">hsl(0 0% 64%)</span>; <span className="katas-code-com">/* 4.6:1 */</span></div>
        <div className="pl-4"><span className="katas-code-key">--success</span>:  <span className="katas-code-val">hsl(152 60% 45%)</span>;</div>
        <div className="pl-4"><span className="katas-code-key">--danger</span>:   <span className="katas-code-val">hsl(0 72% 55%)</span>;</div>
        <div><span className="katas-code-key">{"}"}</span></div>
        <div className="mt-2"><span className="katas-code-com">/* Anlam üzerinden kullan, ham hex değil */</span></div>
        <div><span className="katas-code-key">.btn-primary</span> {"{"} <span className="katas-code-key">background</span>: <span className="katas-code-val">var(--brand-500)</span>; {"}"}</div>
      </div>
    </FigmaFrameMockup>
  );
}

/* Renk körlüğü simülasyon şeridi */
function ColorBlindStrip() {
  const rows = [
    { label: "Normal görüş", colors: ["#22c55e", "#ef4444", "#eab308", "#3b82f6"] },
    { label: "Döteranopi (kırmızı-yeşil)", colors: ["#9a8f3a", "#8a8b2c", "#c9b53a", "#3b82f6"] },
    { label: "Protanopi (kırmızı-yeşil)", colors: ["#8f8a4a", "#6f7a2c", "#bcae44", "#4a78c0"] },
  ];
  return (
    <div className="space-y-3">
      {rows.map((r, i) => (
        <motion.div
          key={r.label}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 + i * 0.12 }}
          className="flex items-center gap-4"
        >
          <div className="w-56 text-xs text-gray-400 font-mono text-right flex-shrink-0">{r.label}</div>
          <div className="flex gap-2 flex-1">
            {r.colors.map((c, idx) => (
              <div key={idx} className="flex-1 h-10 rounded-md katas-swatch flex items-center justify-center" style={{ background: c }}>
                <span className="text-[9px] font-bold text-black/50">{["Onay", "Hata", "Uyarı", "Bilgi"][idx]}</span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
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
        <Eyebrow>BVA 2245 · 7. Hafta · Renk &amp; Kontrast</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-8xl font-bold tracking-tight leading-[1] mb-6"
        >
          <span className="katas-shimmer">Renk Teorisi</span>
          <br />
          <span className="text-white">&amp; Erişilebilir Palet</span>
        </motion.h1>
        <Sub className="mt-6 max-w-3xl mx-auto">
          Renk bir süs değil; hiyerarşi, anlam ve okunabilirlik aracıdır. Bu hafta
          rengi sayıyla (HSL) kontrol etmeyi, uyumlu palet kurmayı ve WCAG kontrast
          kurallarını öğreniyoruz.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 grid grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          <FeatureCard
            icon={Palette}
            title="Renk modeli"
            desc="HSL ile tonu, doygunluğu ve açıklığı ayrı ayrı kontrol et."
            delay={0.3}
          />
          <FeatureCard
            icon={Layers}
            title="Palet seçimi"
            desc="Uyum şemaları, 60-30-10 kuralı ve durum renkleri."
            delay={0.45}
            accent="#a855f7"
          />
          <FeatureCard
            icon={Contrast}
            title="WCAG kontrast"
            desc="4.5:1 ve 3:1 eşikleri — herkes için okunabilir metin."
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
          Cuma · 15:20 — 17:00 · Figma + kontrast denetleyici
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 02 · GEÇEN HAFTADAN KÖPRÜ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · tipografiden renge</Eyebrow>
      <H2>Geçen hafta düzeni kurduk; bu hafta ona ses veriyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Tipografi ve hiyerarşiyle &quot;neyin önce okunacağını&quot; belirledik. Renk de tam
        olarak bunun için bir araç: dikkati yönlendirir, durumu (başarı/hata) anlatır ve
        markayı taşır. Ama yanlış kullanılırsa okunabilirliği bitirir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="katas-card rounded-xl p-6"
        >
          <Target className="w-6 h-6 text-pink-400 mb-3" />
          <div className="text-base font-semibold text-white mb-1">Hiyerarşi</div>
          <p className="text-sm text-gray-400">Birincil eylem vurgulu renkte; ikincil eylem nötr. Göz nereye gitsin?</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="katas-card rounded-xl p-6"
        >
          <Brain className="w-6 h-6 text-purple-400 mb-3" />
          <div className="text-base font-semibold text-white mb-1">Anlam</div>
          <p className="text-sm text-gray-400">Yeşil onay, kırmızı tehlike — öğrenilmiş kodları boşa harcama.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="katas-card rounded-xl p-6"
        >
          <Accessibility className="w-6 h-6 text-blue-400 mb-3" />
          <div className="text-base font-semibold text-white mb-1">Erişilebilirlik</div>
          <p className="text-sm text-gray-400">Renk asla tek başına bilgi taşımamalı; kontrast ölçülebilir bir kural.</p>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 03 · DERSİN AKIŞI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: renk modeli → palet → kontrast</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce rengi sayıyla (HSL) anlıyoruz; sonra uyumlu bir palet kuruyoruz; en sonunda
        o paletin WCAG kontrast eşiklerini geçip geçmediğini ölçüyoruz. Bitişte küçük bir alıştırma.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Renk Modeli", items: ["RGB, HEX ve HSL", "Hue / Saturation / Lightness", "Neden HSL ile çalışmak kolay"], icon: Palette, accent: "#ec4899" },
          { range: "02", title: "Palet Seçimi", items: ["Uyum şemaları (tamamlayıcı vb.)", "60-30-10 kuralı", "Durum & nötr renkler"], icon: Layers, accent: "#a855f7" },
          { range: "03", title: "Kontrast & WCAG", items: ["Kontrast oranı nedir", "AA / AAA eşikleri", "Renk körlüğü & güvenli kullanım"], icon: Contrast, accent: "#3b82f6" },
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
      title="Rengi Sayıyla Anlamak"
      subtitle="Bir rengi gözle değil, kontrol edilebilir bir koordinatla tarif etmek istiyoruz. HSL bunu en sezgisel biçimde yapar."
      bgGradient="linear-gradient(135deg, #ec4899 0%, #be185d 100%)"
      shadow="0 0 60px rgba(236, 72, 153, 0.5)"
      icon={<Palette className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 05 · RENK ÇARKI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Renk çarkı · 12 ton</Eyebrow>
      <H2 className="mb-2">Birincil, ikincil, üçüncül renkler</H2>
      <Sub className="max-w-3xl mb-4">
        Renk çarkı tonları (hue) bir daire üzerine dizer. Çark üzerindeki konum, bir sonraki
        adımda kuracağımız uyum şemalarının temelidir — &quot;karşıdaki&quot; ya da &quot;yanındaki&quot; renk gibi.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <ColorWheel />
        <div className="space-y-3">
          <div className="katas-card rounded-lg p-4">
            <div className="text-xs font-mono uppercase text-pink-300 mb-1">Birincil</div>
            <div className="text-sm text-gray-300">Kırmızı · Sarı · Mavi — diğer renkler bunların karışımıdır.</div>
          </div>
          <div className="katas-card rounded-lg p-4">
            <div className="text-xs font-mono uppercase text-purple-300 mb-1">İkincil</div>
            <div className="text-sm text-gray-300">Yeşil · Turuncu · Mor — iki birincilin karışımı.</div>
          </div>
          <div className="katas-card rounded-lg p-4">
            <div className="text-xs font-mono uppercase text-blue-300 mb-1">Üçüncül & sıcaklık</div>
            <div className="text-sm text-gray-300">Aradaki ara tonlar. Çarkın bir yarısı &quot;sıcak&quot; (kırmızı-sarı), diğeri &quot;soğuk&quot; (mavi-yeşil) algılanır.</div>
          </div>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 06 · RGB/HEX/HSL ───── */
  () => (
    <SlideShell>
      <Eyebrow>Renk modelleri · ekranda renk</Eyebrow>
      <H2>Aynı renk, üç farklı yazılış</H2>
      <Sub className="mt-3 max-w-3xl">
        Ekranlar rengi RGB (kırmızı-yeşil-mavi ışık) ile üretir; HEX onun onaltılık kısaltmasıdır.
        HSL ise aynı rengi insanın düşündüğü gibi (ton, doygunluk, açıklık) tarif eder — bu yüzden
        elle ayar yapmak çok daha kolaydır.
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
              <th style={{ width: "14%" }}>Örnek</th>
              <th style={{ width: "20%" }}>Model</th>
              <th style={{ width: "30%" }}>Yazılış</th>
              <th>Ne işe yarar?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="inline-block w-7 h-7 rounded katas-swatch" style={{ background: "#ec4899" }} /></td>
              <td className="text-white font-semibold">RGB</td>
              <td><span className="font-mono text-[#67e8f9]">rgb(236 72 153)</span></td>
              <td>Ekranın ışık karışımı. Donanıma en yakın; elle ayarı sezgisel değil.</td>
            </tr>
            <tr>
              <td><span className="inline-block w-7 h-7 rounded katas-swatch" style={{ background: "#ec4899" }} /></td>
              <td className="text-white font-semibold">HEX</td>
              <td><span className="font-mono text-[#67e8f9]">#EC4899</span></td>
              <td>RGB&apos;nin onaltılık kısaltması. Kopyala-yapıştır için pratik standart.</td>
            </tr>
            <tr>
              <td><span className="inline-block w-7 h-7 rounded katas-swatch" style={{ background: "hsl(330,81%,60%)" }} /></td>
              <td className="text-white font-semibold">HSL</td>
              <td><span className="font-mono text-[#f472b6]">hsl(330 81% 60%)</span></td>
              <td>Ton, doygunluk, açıklık ayrı. &quot;Biraz daha koyu&quot; demek için tek sayı değiştir.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-[12px] text-gray-500"
      >
        İpucu: Aynı tonu (Hue) sabit tutup yalnızca Lightness&apos;ı değiştirerek tutarlı bir ton ölçeği (50–900) kurarsın.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 07 · HSL KANALLARI ───── */
  () => (
    <SlideShell>
      <Eyebrow>HSL · üç kanal</Eyebrow>
      <H2 className="mb-2">Tek bir sayıyı kaydır, rengi kontrol et</H2>
      <Sub className="max-w-3xl mb-6">
        HSL&apos;in gücü: üç eksen birbirinden bağımsız. Doygunluğu düşürünce renk &quot;sakinleşir&quot;,
        açıklığı artırınca arka plan için uygun açık tonlar elde edersin. Palet üretmenin en hızlı yolu budur.
      </Sub>
      <HSLChannels />
    </SlideShell>
  ),

  /* ───── 08 · BÖLÜM 2 ───── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Palet Seçimi"
      subtitle="Rastgele renk seçmek yerine çark üzerindeki ilişkilerden yararlanırız. Az sayıda, ilişkili ve rolleri net renkler."
      bgGradient="linear-gradient(135deg, #a855f7 0%, #ec4899 100%)"
      shadow="0 0 60px rgba(168, 85, 247, 0.5)"
      icon={<Layers className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 09 · UYUM ŞEMALARI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Renk uyumu · çark ilişkileri</Eyebrow>
      <H2 className="mb-2">Dört temel uyum şeması</H2>
      <Sub className="max-w-3xl mb-6">
        Çark üzerindeki açısal ilişkiler &quot;birbirine giden&quot; renkleri tarif eder. Beyaz halka
        ile işaretli noktalar paletin tonlarıdır.
      </Sub>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <HarmonyDiagram
          title="Tamamlayıcı"
          angles={[0, 180]}
          desc="Çarkta karşılıklı iki ton. En yüksek kontrast — vurgu için güçlü, geniş alanda yorucu."
          accent="#ec4899"
        />
        <HarmonyDiagram
          title="Analog"
          angles={[0, 30, 330]}
          desc="Yan yana üç ton. Sakin, uyumlu; arayüz arka planları için doğal."
          accent="#a855f7"
        />
        <HarmonyDiagram
          title="Üçlü (Triadik)"
          angles={[0, 120, 240]}
          desc="Çarkta eşit aralıklı üç ton. Canlı ve dengeli; biri baskın olmalı."
          accent="#3b82f6"
        />
        <HarmonyDiagram
          title="Bölünmüş Tamamlayıcı"
          angles={[0, 150, 210]}
          desc="Tamamlayıcının iki komşusu. Kontrast var ama daha az gergin."
          accent="#22c55e"
        />
      </div>
    </SlideShell>
  ),

  /* ───── 10 · 60-30-10 ───── */
  () => (
    <SlideShell>
      <Eyebrow>Oran kuralı · 60-30-10</Eyebrow>
      <H2 className="mb-2">Renkleri eşit değil, rollü dağıt</H2>
      <Sub className="max-w-3xl mb-6">
        İyi bir arayüz dengeli görünür çünkü renkler eşit miktarda kullanılmaz. Klasik oran:
        baskın nötr %60, ikincil %30, vurgu %10. Vurgu rengi az olduğu için &quot;çağırır&quot;.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { pct: "%60", role: "Baskın / nötr", color: "#1f1f23", text: "#e5e7eb", desc: "Arka plan, yüzeyler. Genelde nötr (gri/koyu). Gözü dinlendirir.", icon: Moon },
          { pct: "%30", role: "İkincil", color: "#7e22ce", text: "#ffffff", desc: "Kartlar, başlıklar, ikincil bileşenler. Karakteri verir.", icon: Layers },
          { pct: "%10", role: "Vurgu (accent)", color: "#ec4899", text: "#ffffff", desc: "Birincil buton, aktif durum, çağrı. Az kullan ki dikkat çeksin.", icon: Sparkles },
        ].map((b, i) => (
          <motion.div
            key={b.role}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="katas-card rounded-xl overflow-hidden"
          >
            <div className="h-24 flex items-center justify-center" style={{ background: b.color, color: b.text }}>
              <b.icon className="w-5 h-5 mr-2" />
              <span className="text-3xl font-bold">{b.pct}</span>
            </div>
            <div className="p-4">
              <div className="text-base font-semibold text-white mb-1">{b.role}</div>
              <p className="text-sm text-gray-400 leading-relaxed">{b.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 katas-card-rose rounded-xl p-4 flex items-start gap-3 max-w-4xl"
      >
        <Lightbulb className="w-5 h-5 text-pink-300 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-gray-300 leading-relaxed">
          Oranlar katı bir formül değil, başlangıç noktasıdır. Asıl kural şu: bir ekranda göz, en çok
          vurgu rengini aramalı — onu her yere koyarsan vurgu olmaktan çıkar.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 11 · DURUM RENKLERİ + TOKEN ───── */
  () => (
    <SlideShell>
      <Eyebrow>Sistematik renk · token&apos;lar</Eyebrow>
      <H2 className="mb-2">Renkleri isimle değil, rolle kullan</H2>
      <Sub className="max-w-3xl mb-6">
        Profesyonel arayüzlerde renkler doğrudan hex olarak yazılmaz; anlamlı token&apos;lara bağlanır
        (örn. <span className="font-mono text-[#67e8f9]">--brand-500</span>,
        <span className="font-mono text-[#67e8f9]"> --danger</span>). Böylece temayı tek yerden değiştirir,
        karanlık mod gibi varyantları kolayca yönetirsin.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <TokenPanel />
        <div className="space-y-3">
          {[
            { c: "#22c55e", n: "success", d: "Onay, tamamlanan işlem, geçerli alan." },
            { c: "#eab308", n: "warning", d: "Dikkat gerektiren ama engelleyici olmayan durum." },
            { c: "#ef4444", n: "danger", d: "Hata, silme, geri alınamaz eylem." },
            { c: "#3b82f6", n: "info", d: "Nötr bilgilendirme, ipucu." },
          ].map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="katas-card rounded-lg p-3 flex items-center gap-3"
            >
              <span className="w-9 h-9 rounded-md katas-swatch flex-shrink-0" style={{ background: s.c }} />
              <div>
                <div className="text-sm font-mono text-white">--{s.n}</div>
                <div className="text-xs text-gray-400">{s.d}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 12 · BÖLÜM 3 ───── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Kontrast & WCAG"
      subtitle="Güzel palet yetmez; metin okunabilir olmalı. Kontrast, gözle değil ölçülebilir bir oranla denetlenir."
      bgGradient="linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)"
      shadow="0 0 60px rgba(59, 130, 246, 0.5)"
      icon={<Contrast className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 13 · KONTRAST ORANI & EŞİKLER ───── */
  () => (
    <SlideShell>
      <Eyebrow>WCAG 2.2 · kontrast oranı</Eyebrow>
      <H2 className="mb-2">Okunabilirlik bir his değil, bir sayı</H2>
      <Sub className="max-w-3xl mb-6">
        Kontrast oranı, metin ile arka planın bağıl parlaklıklarının oranıdır;
        <span className="font-mono text-[#67e8f9]"> 1:1</span> (görünmez) ile
        <span className="font-mono text-[#67e8f9]"> 21:1</span> (siyah-beyaz) arasında değişir.
        WCAG, içerik türüne göre minimum eşikler tanımlar.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="katas-card rounded-xl p-1"
        >
          <table className="katas-tbl">
            <thead>
              <tr>
                <th>İçerik</th>
                <th style={{ width: "22%" }}>AA (min)</th>
                <th style={{ width: "22%" }}>AAA (min)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-white">Normal metin (&lt; 18pt)</td>
                <td><span className="font-mono text-[#f472b6]">4.5 : 1</span></td>
                <td><span className="font-mono text-[#86efac]">7 : 1</span></td>
              </tr>
              <tr>
                <td className="text-white">Büyük metin (≥ 18pt / 14pt kalın)</td>
                <td><span className="font-mono text-[#f472b6]">3 : 1</span></td>
                <td><span className="font-mono text-[#86efac]">4.5 : 1</span></td>
              </tr>
              <tr>
                <td className="text-white">Arayüz bileşeni &amp; ikon sınırı</td>
                <td><span className="font-mono text-[#f472b6]">3 : 1</span></td>
                <td className="text-gray-600">—</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="space-y-3"
        >
          <div className="katas-card rounded-lg p-4 flex items-start gap-3">
            <Type className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-300">
              <span className="text-white font-semibold">AA</span> yasal/pratik taban kabul edilir; çoğu kurum bunu hedefler.
            </div>
          </div>
          <div className="katas-card rounded-lg p-4 flex items-start gap-3">
            <Eye className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-300">
              <span className="text-white font-semibold">AAA</span> daha sıkı; uzun okuma metinleri ve yüksek erişilebilirlik hedefli ürünler için.
            </div>
          </div>
          <div className="katas-card-rose rounded-lg p-4 flex items-start gap-3">
            <Pipette className="w-5 h-5 text-pink-300 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-300">
              Figma&apos;da eklenti (örn. Contrast / Stark) ya da tarayıcı DevTools renk seçici ile oranı anında ölçebilirsin.
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 14 · KONTRAST DENETLEYİCİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Canlı örnek · geç / kal</Eyebrow>
      <H2 className="mb-2">Aynı pembe, farklı sonuç</H2>
      <Sub className="max-w-3xl mb-6">
        Marka rengini metin olarak kullanmak cazip ama tehlikelidir. Aşağıdaki üç örnekte aynı
        ailenin tonları var; yalnızca açıklık farkı AA eşiğini geçirip geçirmediğini belirliyor.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <ContrastCheckerCard
          fg="#ffffff"
          bg="#9d174d"
          ratio="8.6 : 1"
          passAA
          passAAA
          note="Koyu pembe zeminde beyaz — gövde metni için güvenli."
        />
        <ContrastCheckerCard
          fg="#831843"
          bg="#fbcfe8"
          ratio="6.9 : 1"
          passAA
          passAAA={false}
          note="Açık zeminde koyu pembe — AA geçer, uzun metin için AAA hedefliyorsan dikkat."
        />
        <ContrastCheckerCard
          fg="#f9a8d4"
          bg="#ec4899"
          ratio="1.7 : 1"
          passAA={false}
          passAAA={false}
          note="Açık pembe üstünde açık pembe — okunmaz. Klasik &apos;marka rengi tuzağı&apos;."
        />
      </div>
    </SlideShell>
  ),

  /* ───── 15 · RENK KÖRLÜĞÜ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Erişilebilirlik · renk körlüğü</Eyebrow>
      <H2 className="mb-2">Renk asla tek başına bilgi taşımamalı</H2>
      <Sub className="max-w-3xl mb-6">
        Erkeklerin yaklaşık her on ikiden birinde bir tür renk görme farkı bulunur; en yaygını
        kırmızı-yeşil ayrımıdır. Yalnızca renge dayalı bir arayüz bu kullanıcılar için anlamı yok eder.
        Yanına ikon, etiket veya desen ekle.
      </Sub>
      <div className="katas-card rounded-xl p-6 mb-5">
        <ColorBlindStrip />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="katas-card rounded-xl p-4 flex items-start gap-3"
        >
          <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-300">
            <span className="text-white font-semibold">Yetersiz:</span> &quot;Yeşil nokta = çevrimiçi, kırmızı = çevrimdışı.&quot;
            Renk körü kullanıcı ikisini ayırt edemez.
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="katas-card rounded-xl p-4 flex items-start gap-3"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-300">
            <span className="text-white font-semibold">Doğru:</span> Renge ek olarak ikon (✓ / ✕), metin etiketi
            veya farklı şekil kullan. Renk pekiştirir, yalnız taşımaz.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 16 · UYGULAMALI LAB ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı alıştırma</Eyebrow>
      <H2>Kendi erişilebilir paletini kur</H2>
      <Sub className="mt-3 max-w-3xl">
        Figma&apos;da küçük bir kart ekranı tasarla ve paletini WCAG ile doğrula. Sonraki derse
        bunu yapmış ve ekran görüntüsünü almış gelmen bekleniyor.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Pipette, title: "Bir marka tonu seç", desc: "HSL ile bir ana renk belirle, sonra Lightness'ı değiştirerek 5 basamaklı bir ton ölçeği (100–900) üret.", accent: "#ec4899" },
          { icon: Layers, title: "60-30-10 ile bir kart kur", desc: "Nötr yüzey, ikincil renk ve tek bir vurgu butonu olan basit bir kart bileşeni tasarla.", accent: "#a855f7" },
          { icon: Contrast, title: "Kontrastı ölç", desc: "Tüm metin/arka plan çiftlerini bir kontrast denetleyiciyle test et; AA geçmeyenleri düzelt.", accent: "#3b82f6" },
          { icon: Accessibility, title: "Renk körlüğünü kontrol et", desc: "Durum bilgisini (başarı/hata) yalnız renge bırakmadığını doğrula; ikon veya etiket ekle.", accent: "#22c55e" },
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
        <AlertTriangle className="w-4 h-4 text-pink-300 mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Teslim:</span> Ton ölçeği + kart tasarımı + kontrast raporu (her çift için oran ve AA/AAA durumu) tek bir Figma sayfasında.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 17 · SIRADAKİ HAFTA + KAPANIŞ ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8"
          style={{ background: "linear-gradient(135deg, #ec4899, #be185d)", boxShadow: "0 0 60px rgba(236,72,153,0.5)" }}
        >
          <Layers className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>7. hafta tamamlandı · sıradaki: Bileşen sistemleri</Eyebrow>
        <H1>
          <span className="katas-shimmer">Renkten Bileşene</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta renk token&apos;larını kurduk. Hafta 8&apos;de bu token&apos;ları gerçek bileşenlere bağlıyoruz:
          buton varyantları, durum stilleri ve yeniden kullanılabilir kartlar — Figma component&apos;ları ile.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="katas-card rounded-xl p-5">
            <Calendar className="w-5 h-5 text-[#ec4899] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Ders saati</div>
            <div className="text-white font-semibold">Cuma</div>
            <div className="text-sm text-gray-400">15:20 — 17:00</div>
          </div>
          <div className="katas-card rounded-xl p-5">
            <Target className="w-5 h-5 text-[#a855f7] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">Bu haftaki palet</div>
            <div className="text-sm text-gray-400">token&apos;larıyla getir</div>
          </div>
          <div className="katas-card rounded-xl p-5">
            <Code2 className="w-5 h-5 text-[#3b82f6] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">Erişilebilir palet</div>
            <div className="text-sm text-gray-400">kontrast raporu ile</div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 flex items-center justify-center gap-2 text-xs font-mono text-gray-600"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>BVA 2245 · Kullanıcı Arayüzü Tasarımı · Hafta 07</span>
          <Hash className="w-3.5 h-3.5" />
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
          BVA 2245 · 7. Hafta · Renk Teorisi &amp; Kontrast
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
