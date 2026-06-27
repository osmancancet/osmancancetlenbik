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
  LayoutDashboard,
  Gauge,
  Target,
  Eye,
  Users,
  Filter,
  Layers,
  Grid3x3,
  AlignLeft,
  MousePointerClick,
  Palette,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Check,
  X,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Calendar,
  MapPin,
  Mail,
  GraduationCap,
  Sparkles,
  Smartphone,
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
        <div className="absolute inset-0 vg-grid-bg pointer-events-none" />
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
      className="inline-flex items-center gap-3 mb-6 text-xs font-mono uppercase tracking-[0.25em] text-[#ef4444]"
    >
      <span className="w-8 h-px bg-[#ef4444]" />
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
  accent = "#ef4444",
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
      className="vg-card vg-card-hover rounded-xl p-6 transition-all"
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

function WindowChrome({
  title,
  children,
  badge,
}: {
  title: string;
  children: ReactNode;
  badge?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="vg-window-chrome w-full"
    >
      <div className="vg-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-semibold flex-1 max-w-md mx-auto text-center justify-center"
          style={{ background: "#0d0d0d", color: "#fca5a5" }}
        >
          <span className="w-5 h-5 rounded-sm vg-tool-tile flex items-center justify-center text-[11px]">
            {badge ?? "V"}
          </span>
          <span>{title}</span>
        </div>
      </div>
      <div className="p-4 bg-[#0a0a0a]">{children}</div>
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
          className="inline-flex w-32 h-32 rounded-3xl items-center justify-center mb-8 vg-pulse"
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
   TOPIC MOCKUPS — DASHBOARD
   ============================================================ */

function MiniLine({
  values,
  color = "#ef4444",
  title,
  width = 220,
  height = 130,
}: {
  values: number[];
  color?: string;
  title?: string;
  width?: number;
  height?: number;
}) {
  const pad = 14;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const step = (width - 2 * pad) / (values.length - 1);
  const pts = values
    .map((v, i) => {
      const x = pad + i * step;
      const y = height - pad - ((v - min) / (max - min || 1)) * (height - 2 * pad);
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <div>
      {title && <div className="text-[10px] text-gray-400 mb-1 font-mono">{title}</div>}
      <svg width={width} height={height} className="block">
        <line
          x1={pad}
          y1={height - pad}
          x2={width - pad}
          y2={height - pad}
          stroke="#475569"
          strokeWidth={1}
        />
        <polyline points={pts} fill="none" stroke={color} strokeWidth={2} />
      </svg>
    </div>
  );
}

function MiniBar({
  values,
  labels,
  color = "#ef4444",
  title,
  width = 220,
  height = 130,
}: {
  values: number[];
  labels?: string[];
  color?: string;
  title?: string;
  width?: number;
  height?: number;
}) {
  const pad = 16;
  const max = Math.max(...values);
  const bw = (width - 2 * pad) / values.length - 4;
  return (
    <div>
      {title && <div className="text-[10px] text-gray-400 mb-1 font-mono">{title}</div>}
      <svg width={width} height={height} className="block">
        <line
          x1={pad}
          y1={height - pad}
          x2={width - pad}
          y2={height - pad}
          stroke="#475569"
          strokeWidth={1}
        />
        {values.map((v, i) => {
          const h = ((height - 2 * pad) * v) / max;
          return (
            <g key={i}>
              <rect
                x={pad + i * (bw + 4)}
                y={height - pad - h}
                width={bw}
                height={h}
                fill={color}
                rx={2}
              />
              {labels && (
                <text
                  x={pad + i * (bw + 4) + bw / 2}
                  y={height - pad + 9}
                  fill="#94a3b8"
                  fontSize={8}
                  textAnchor="middle"
                >
                  {labels[i]}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* KPI / BAN — Big Aggregate Number */
function KpiTile({
  label,
  value,
  delta,
  up = true,
  amber = false,
}: {
  label: string;
  value: string;
  delta: string;
  up?: boolean;
  amber?: boolean;
}) {
  return (
    <div className={amber ? "vg-dash-tile-amber" : "vg-dash-tile"}>
      <div className="text-[9px] text-gray-400 uppercase tracking-wide">{label}</div>
      <div className="text-2xl font-bold text-white mt-1">{value}</div>
      <div
        className={`text-[10px] mt-0.5 flex items-center gap-1 ${
          up ? "text-emerald-400" : "text-rose-400"
        }`}
      >
        {up ? (
          <TrendingUp className="w-3 h-3" />
        ) : (
          <TrendingDown className="w-3 h-3" />
        )}
        {delta}
      </div>
    </div>
  );
}

/* Tam pano mockup — iyi düzen */
function GoodDashboardMock() {
  return (
    <WindowChrome title="Satış Operasyon Panosu · Q2 2026" badge="D">
      <div className="vg-dash p-3" style={{ minHeight: 330 }}>
        {/* Başlık + bağlam */}
        <div className="flex items-center justify-between mb-2 px-1">
          <div className="text-sm font-semibold text-white">
            Bölge satış performansı
          </div>
          <div className="text-[9px] text-gray-400 font-mono">
            Güncelleme: 26.06.2026 09:00 · Kaynak: CRM
          </div>
        </div>

        {/* Filtre çubuğu */}
        <div className="flex items-center gap-2 mb-3 px-1">
          <Filter className="w-3.5 h-3.5 text-rose-400" />
          {["Dönem: Q2", "Bölge: Tümü", "Kanal: Tümü"].map((f) => (
            <span
              key={f}
              className="text-[9px] px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(239,68,68,0.12)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#fca5a5",
              }}
            >
              {f}
            </span>
          ))}
        </div>

        {/* KPI satırı */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          <KpiTile label="Gelir" value="₺4.8M" delta="%12 YoY" up />
          <KpiTile label="Sipariş" value="12.345" delta="%8" up />
          <KpiTile label="Ort. Sepet" value="₺389" delta="%3" up />
          <KpiTile label="İade" value="%3.2" delta="hedef %2" up={false} amber />
        </div>

        {/* Grafik satırı */}
        <div className="grid grid-cols-12 gap-2">
          <div className="vg-dash-tile col-span-7">
            <div className="text-[10px] text-gray-400 mb-1">Aylık gelir (₺ bin)</div>
            <MiniLine
              values={[210, 240, 290, 270, 330, 360, 410, 460]}
              width={440}
              height={120}
              color="#ef4444"
            />
          </div>
          <div className="vg-dash-tile col-span-5">
            <div className="text-[10px] text-gray-400 mb-1">Kanala göre pay</div>
            <MiniBar
              values={[58, 42, 30, 22]}
              labels={["Web", "Mağ.", "B2B", "App"]}
              width={250}
              height={120}
              color="#fbbf24"
            />
          </div>
        </div>
      </div>
    </WindowChrome>
  );
}

/* Inverted pyramid wireframe */
function InvertedPyramid() {
  const rows = [
    { w: "100%", c: "#ef4444", label: "Üst: KPI / BAN — en önemli özet (büyük rakamlar)" },
    { w: "78%", c: "#f59e0b", label: "Orta: Trend ve kırılım grafikleri — niye böyle?" },
    { w: "54%", c: "#fbbf24", label: "Alt: Detay tablo / filtre — derinleşmek isteyene" },
  ];
  return (
    <div className="space-y-3">
      {rows.map((r, i) => (
        <motion.div
          key={r.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + i * 0.12 }}
          className="mx-auto rounded-lg px-4 py-3 text-sm text-gray-200"
          style={{
            width: r.w,
            background: `${r.c}12`,
            border: `1px solid ${r.c}45`,
          }}
        >
          {r.label}
        </motion.div>
      ))}
    </div>
  );
}

/* Z / F okuma deseni wireframe */
function ReadingPatternWire() {
  return (
    <svg viewBox="0 0 240 150" className="w-full max-w-sm mx-auto block">
      {/* hücreler */}
      {[
        { x: 10, y: 10, w: 105, h: 50, t: "KPI" },
        { x: 125, y: 10, w: 105, h: 50, t: "KPI" },
        { x: 10, y: 70, w: 105, h: 70, t: "Trend" },
        { x: 125, y: 70, w: 105, h: 70, t: "Kırılım" },
      ].map((c) => (
        <g key={`${c.x}-${c.y}`}>
          <rect
            x={c.x}
            y={c.y}
            width={c.w}
            height={c.h}
            rx={4}
            fill="rgba(239,68,68,0.05)"
            stroke="rgba(239,68,68,0.35)"
            strokeDasharray="4 4"
          />
          <text
            x={c.x + c.w / 2}
            y={c.y + c.h / 2 + 3}
            fill="#fca5a5"
            fontSize={9}
            fontFamily="monospace"
            textAnchor="middle"
          >
            {c.t}
          </text>
        </g>
      ))}
      {/* Z yolu */}
      <path className="vg-flow-path" d="M 30 35 L 200 35 L 35 105 L 205 105" />
      <circle cx={30} cy={35} r={4} fill="#ef4444" />
      <polygon points="205,105 197,101 197,109" fill="#ef4444" />
    </svg>
  );
}

/* Kötü pano — gösterge ve gauge çöplüğü */
function BadDashboardMock() {
  return (
    <div className="vg-card rounded-xl p-4 border-2 border-red-500/30">
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="rounded-md p-2 flex flex-col items-center justify-center"
            style={{
              background: ["#7f1d1d", "#1e3a8a", "#14532d", "#78350f", "#581c87"][
                i % 5
              ],
              minHeight: 56,
            }}
          >
            <Gauge className="w-5 h-5 text-white/80" />
            <div className="text-[8px] text-white/70 mt-1">Gösterge {i + 1}</div>
          </div>
        ))}
      </div>
      <div className="text-center text-[10px] text-rose-300 mt-2 font-bold">
        9 GAUGE + 7 RENK — GÖZ NEREYE BAKACAĞINI BİLEMİYOR
      </div>
    </div>
  );
}

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ───── 1. KAPAK ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2107 · 15. Hafta</Eyebrow>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.04]">
          <span className="vg-shimmer">Gösterge Paneli</span>
          <br />
          <span className="text-white/90">Tasarım İlkeleri</span>
        </h1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Tek tek grafik çizmeyi biliyoruz. Bu hafta onları tek ekranda,
          karar verdiren bir bütüne dönüştürüyoruz.
        </Sub>
        <div className="mt-12 grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { name: "Amaç & Kitle", desc: "Pano kim için, ne kararı için", icon: Target },
            { name: "Düzen & Hiyerarşi", desc: "Izgara · ters piramit · Z deseni", icon: LayoutDashboard },
            { name: "Etkileşim", desc: "Filtre, detaya inme, mobil", icon: MousePointerClick },
          ].map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="vg-card rounded-xl p-4"
            >
              <div className="w-10 h-10 mx-auto mb-2 rounded-md vg-tool-tile flex items-center justify-center">
                <t.icon className="w-5 h-5" />
              </div>
              <div className="text-white font-semibold text-sm">{t.name}</div>
              <div className="text-[11px] text-gray-400 mt-1">{t.desc}</div>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-xs font-mono text-gray-500">
          MCBÜ MYO · Bilgisayar Programcılığı · 2025-2026 Bahar
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. GEÇEN HAFTADAN KÖPRÜ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · tek grafikten panoya</Eyebrow>
      <H2>Grafik bir cümle ise, pano bir paragraftır</H2>
      <Sub className="mt-3 max-w-3xl">
        Önceki haftalarda doğru grafik türünü, renk paletini ve etkileşimi öğrendik.
        Bir pano (dashboard) bunların hepsini tek bir yüzeyde, belirli bir karar için
        düzenlemektir. Bu hafta &quot;çok grafik&quot; ile &quot;iyi pano&quot; arasındaki farkı kuruyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="vg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-rose-300">
            <X className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Sık yapılan hata</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-rose-400 flex-shrink-0" />Eldeki tüm grafikleri tek ekrana tıkıştırmak.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-rose-400 flex-shrink-0" />Önce grafik yapıp sonra &quot;kime lazım?&quot; diye sormak.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-rose-400 flex-shrink-0" />Her metriği eşit boyutta gösterip hiyerarşi kurmamak.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="vg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-emerald-300">
            <Check className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">İyi pano</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />Tek bir soruyu / kararı yanıtlar.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />En önemli sayı, en görünür yerde.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />Bağlam (hedef, kıyas, zaman) ile birlikte gösterir.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 3. DERSİN AKIŞI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: amaç → düzen → etkileşim</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce panonun kimin, hangi karar için olduğunu belirliyoruz; sonra bilgiyi
        düzen ve hiyerarşiyle yerleştiriyoruz; en son etkileşim ve son rötuşları ekliyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Amaç & Kitle", items: ["Stratejik / analitik / operasyonel", "Tek karar sorusu", "Hangi metrikler (KPI)"], icon: Target, accent: "#ef4444" },
          { range: "02", title: "Düzen & Hiyerarşi", items: ["Izgara (grid) sistemi", "Ters piramit", "Z / F okuma deseni"], icon: LayoutDashboard, accent: "#f59e0b" },
          { range: "03", title: "Etkileşim & Rötuş", items: ["Filtre · detaya inme", "Renk ve veri-mürekkep", "Mobil / responsive"], icon: MousePointerClick, accent: "#fbbf24" },
        ].map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="vg-card rounded-xl p-6"
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

  /* ───── 4. BÖLÜM 1 — AMAÇ & KİTLE ───── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Amaç & Kitle"
      subtitle="Tasarıma başlamadan önce iki soru: Bu pano kim için? Hangi kararı veriyor? Cevap, her şeyi belirler."
      bgGradient="linear-gradient(135deg, #ef4444, #b91c1c)"
      shadow="0 25px 60px -15px rgba(239, 68, 68, 0.6)"
      icon={<Target className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 5. PANO TÜRLERİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Pano türleri · Few sınıflaması</Eyebrow>
      <H2>Aynı kelime, üç farklı pano</H2>
      <Sub className="mt-3 max-w-3xl">
        Stephen Few panoları kullanım amacına göre ayırır. Türü belirlemek; hangi
        metrik, hangi güncelleme sıklığı ve hangi detay seviyesi gerektiğini söyler.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[
          {
            icon: TrendingUp,
            title: "Stratejik",
            who: "Üst yönetim",
            desc: "Yüksek seviye KPI, uzun dönem trend. Az sayıda sayı, hedefe göre kıyas. Güncelleme: haftalık/aylık.",
            accent: "#ef4444",
          },
          {
            icon: Eye,
            title: "Analitik",
            who: "Analist · uzman",
            desc: "Kırılım, karşılaştırma, neden-sonuç. Çok boyutlu, etkileşimli, detaya inilebilir.",
            accent: "#f59e0b",
          },
          {
            icon: Gauge,
            title: "Operasyonel",
            who: "Saha · operasyon",
            desc: "Anlık durum, eşik/alarm. Sık güncellenir (saatlik/canlı), &quot;şimdi ne oluyor&quot; sorusuna bakar.",
            accent: "#fbbf24",
          },
        ].map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="vg-card rounded-xl p-6"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ background: `${p.accent}18`, border: `1px solid ${p.accent}55` }}
            >
              <p.icon className="w-6 h-6" style={{ color: p.accent }} />
            </div>
            <div className="text-lg font-semibold text-white">{p.title}</div>
            <div className="text-[11px] font-mono uppercase tracking-widest mb-2" style={{ color: p.accent }}>{p.who}</div>
            <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 6. 5 SANİYE KURALI + KPI SEÇİMİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Tek soru · 5 saniye kuralı</Eyebrow>
      <H2 className="mb-2">İyi pano 5 saniyede yanıt verir</H2>
      <Sub className="max-w-3xl mb-6">
        Kullanıcı panoya baktığında &quot;İşler iyi mi, kötü mü; nereye bakmalıyım?&quot;
        sorusuna saniyeler içinde cevap alabilmeli. Bunun için önce panonun yanıtladığı
        tek soruyu, sonra o soruyu ölçen az sayıda KPI&apos;ı netleştir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="vg-card rounded-xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-[#ef4444] mb-3">İYİ KPI&apos;ın özellikleri</div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />Karara bağlı — değişirse bir aksiyon tetikler.</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />Bağlamlı — hedef, geçen dönem veya kıyasla gösterilir.</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />Net sahibi var — kim sorumlu belli.</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />Az sayıda — 5-7 ana metriği geçmez.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="vg-card rounded-xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-[#f59e0b] mb-3">Tek başına yanıltan sayı</div>
          <div className="space-y-3">
            <div className="vg-dash-tile">
              <div className="text-[9px] text-gray-400 uppercase">Gelir</div>
              <div className="text-2xl font-bold text-white">₺4.8M</div>
              <div className="text-[10px] text-gray-500">…iyi mi kötü mü? Belirsiz.</div>
            </div>
            <div className="vg-dash-tile">
              <div className="text-[9px] text-gray-400 uppercase">Gelir · bağlamlı</div>
              <div className="text-2xl font-bold text-white">₺4.8M</div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> %12 YoY · hedefin %96&apos;sı
              </div>
            </div>
          </div>
          <div className="text-[11px] text-gray-500 mt-3">Bir sayı tek başına değersiz; onu bir referansla göster.</div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 7. BÖLÜM 2 — DÜZEN & HİYERARŞİ ───── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Düzen & Hiyerarşi"
      subtitle="Aynı grafikler, farklı yerleşim, tamamen farklı bir deneyim. Izgara, ters piramit ve okuma deseni ile gözü yönlendiriyoruz."
      bgGradient="linear-gradient(135deg, #f59e0b, #b45309)"
      shadow="0 25px 60px -15px rgba(245, 158, 11, 0.6)"
      icon={<LayoutDashboard className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 8. IZGARA SİSTEMİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Düzen · ızgara (grid) sistemi</Eyebrow>
      <H2 className="mb-2">Hizalanmamış pano dağınık görünür</H2>
      <Sub className="max-w-3xl mb-6">
        Profesyonel panolar görünmez bir ızgaraya oturur (örn. 12 sütunlu). Bileşenler
        aynı kenara hizalanır, aralar (boşluk/gutter) eşittir. Bu, &quot;süslü&quot; değil
        &quot;düzenli&quot; algısı yaratır ve gözün taramasını hızlandırır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="vg-wire p-3"
        >
          <div className="text-[10px] text-gray-400 font-mono mb-2">12 sütunlu ızgara</div>
          <div className="grid grid-cols-12 gap-1.5">
            <div className="vg-wire-cell col-span-3" style={{ minHeight: 38 }}>KPI</div>
            <div className="vg-wire-cell col-span-3" style={{ minHeight: 38 }}>KPI</div>
            <div className="vg-wire-cell col-span-3" style={{ minHeight: 38 }}>KPI</div>
            <div className="vg-wire-cell col-span-3" style={{ minHeight: 38 }}>KPI</div>
            <div className="vg-wire-cell col-span-8" style={{ minHeight: 80 }}>Trend (8)</div>
            <div className="vg-wire-cell col-span-4" style={{ minHeight: 80 }}>Kırılım (4)</div>
            <div className="vg-wire-cell col-span-12" style={{ minHeight: 48 }}>Detay tablo (12)</div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="vg-card rounded-xl p-6 flex flex-col justify-center"
        >
          <div className="flex items-center gap-2 mb-3 text-[#f59e0b]">
            <Grid3x3 className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Izgara kuralları</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] flex-shrink-0" />Bileşenleri ortak bir kenara hizala (sol kenar referans).</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] flex-shrink-0" />Eşit boşluk bırak; rastgele aralık dağınık gösterir.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] flex-shrink-0" />İlişkili kartları yakın grupla (Gestalt yakınlık ilkesi).</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] flex-shrink-0" />Beyaz boşluk düşman değil; nefes alanı verir.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 9. TERS PİRAMİT + OKUMA DESENİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Hiyerarşi · ters piramit ve okuma deseni</Eyebrow>
      <H2 className="mb-2">Önce sonuç, sonra detay</H2>
      <Sub className="max-w-3xl mb-6">
        Bilgiyi gazete manşeti gibi diz: en üstte özet (ne oldu?), ortada açıklayan
        grafikler (neden?), en altta detay (kanıt). Batı dillerinde göz sol-üstten
        başlar; en önemli sayıyı oraya koy.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="text-[11px] text-gray-400 font-mono mb-3 text-center">Ters piramit · önemden detaya</div>
          <InvertedPyramid />
        </div>
        <div>
          <div className="text-[11px] text-gray-400 font-mono mb-3 text-center">Z deseni · gözün izlediği yol</div>
          <ReadingPatternWire />
          <p className="text-[11px] text-gray-500 mt-3 text-center max-w-xs mx-auto leading-snug">
            Az bileşenli panolarda göz &quot;Z&quot;, metin-yoğun panolarda &quot;F&quot; deseni izler.
            Birincil KPI&apos;ı sol-üst köşeye yerleştir.
          </p>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 10. İYİ PANO MOCKUP ───── */
  () => (
    <SlideShell>
      <Eyebrow>Uygulama · bir araya gelince</Eyebrow>
      <H2 className="mb-2">İlkeler tek panoda</H2>
      <Sub className="max-w-3xl mb-6">
        Başlık ve bağlam üstte, filtre çubuğu hemen altında, KPI satırı en görünür yerde,
        sonra trend ve kırılım. Tek soruya (&quot;bölge satışı nasıl gidiyor?&quot;) odaklı, hizalı ve sade.
      </Sub>
      <GoodDashboardMock />
    </SlideShell>
  ),

  /* ───── 11. BÖLÜM 3 — ETKİLEŞİM & RÖTUŞ ───── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Etkileşim & Rötuş"
      subtitle="Statik bir resim mi, keşfedilebilir bir araç mı? Filtre, detaya inme, renk disiplini ve mobil uyum panoyu canlı kılar."
      bgGradient="linear-gradient(135deg, #ef4444, #f59e0b)"
      shadow="0 25px 60px -15px rgba(239, 68, 68, 0.55)"
      icon={<MousePointerClick className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 12. ETKİLEŞİM DESENLERİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Etkileşim desenleri</Eyebrow>
      <H2>Bir ekrana çok veri sığdırmanın yolu</H2>
      <Sub className="mt-3 max-w-3xl">
        Etkileşim, panoyu kalabalıklaştırmadan derinleştirir. Dört temel desen, çoğu
        ihtiyacı karşılar.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <FeatureCard
          icon={Filter}
          title="Filtre · dilimleyici"
          desc="Dönem, bölge, kategori seçici. Tüm görselleri aynı anda süzer; kullanıcı kendi sorusunu sorar."
          accent="#ef4444"
          delay={0.1}
        />
        <FeatureCard
          icon={Layers}
          title="Detaya inme (drill-down)"
          desc="Yıl → çeyrek → ay; ülke → şehir. Üstte özet, tıklayınca alt kırılım açılır."
          accent="#f59e0b"
          delay={0.18}
        />
        <FeatureCard
          icon={AlignLeft}
          title="İpucu (tooltip)"
          desc="Üzerine gelince tam sayı ve bağlam. Detayı ekrandan saklar, isteyene gösterir."
          accent="#fbbf24"
          delay={0.26}
        />
        <FeatureCard
          icon={MousePointerClick}
          title="Vurgu / cross-filter"
          desc="Bir grafikte bir öğeye tıklayınca diğer grafikler ona göre filtrelenir; ilişkileri keşfettirir."
          accent="#ef4444"
          delay={0.34}
        />
      </div>
      <div className="mt-5 vg-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3 max-w-4xl">
        <AlertTriangle className="w-4 h-4 text-[#f59e0b] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Dikkat:</span> Etkileşim, eksik tasarımı kurtarmaz.
          Pano filtre olmadan da, varsayılan halinde anlamlı bir hikâye anlatmalı.
        </span>
      </div>
    </SlideShell>
  ),

  /* ───── 13. RENK & VERİ-MÜREKKEP DİSİPLİNİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Rötuş · renk ve veri-mürekkep</Eyebrow>
      <H2 className="mb-2">Renk dikkat yönetir, süs değildir</H2>
      <Sub className="max-w-3xl mb-6">
        Panoda renk sınırlı bir kaynaktır. Her şey renkliyse hiçbir şey öne çıkmaz.
        Nötr bir taban kullan; rengi yalnızca dikkat çekmesi gereken yere (alarm, hedef
        sapması) sakla. Aşağıda aynı veri, iki disiplin.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <BadDashboardMock />
          <ul className="mt-3 text-[11px] text-gray-400 space-y-1">
            <li>· 9 gauge — hepsi aynı &quot;önemde&quot; bağırıyor</li>
            <li>· 7 farklı renk anlam taşımıyor</li>
            <li>· Göz nereye odaklanacağını bulamıyor</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="vg-card rounded-xl p-4 border-2 border-emerald-500/30"
        >
          <div className="grid grid-cols-4 gap-2">
            <KpiTile label="Gelir" value="₺4.8M" delta="%12" up />
            <KpiTile label="Sipariş" value="12.3K" delta="%8" up />
            <KpiTile label="Sepet" value="₺389" delta="%3" up />
            <KpiTile label="İade" value="%3.2" delta="hedef %2" up={false} amber />
          </div>
          <div className="mt-3">
            <MiniLine values={[210, 240, 290, 270, 330, 360, 410, 460]} width={420} height={92} color="#94a3b8" />
          </div>
          <ul className="mt-3 text-[11px] text-gray-400 space-y-1">
            <li>· Trend nötr gri; yalnız sorunlu KPI (iade) renkli</li>
            <li>· Göz doğrudan dikkat gereken yere gidiyor</li>
            <li>· Veri-mürekkep oranı yüksek (Tufte)</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 14. MOBİL / RESPONSIVE ───── */
  () => (
    <SlideShell>
      <Eyebrow>Rötuş · cihaz uyumu</Eyebrow>
      <H2 className="mb-2">Masaüstü pano telefonda aynısı değildir</H2>
      <Sub className="max-w-3xl mb-6">
        Bir yöneticinin panoya çoğu zaman telefondan baktığını varsay. Geniş ekran
        ızgarası küçük ekranda tek sütuna iner; önem sırası dikey okumayı belirler.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="vg-wire p-3">
          <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono mb-2">
            <Globe className="w-3.5 h-3.5" /> Masaüstü · çok sütun
          </div>
          <div className="grid grid-cols-12 gap-1.5">
            <div className="vg-wire-cell col-span-3" style={{ minHeight: 30 }}>KPI</div>
            <div className="vg-wire-cell col-span-3" style={{ minHeight: 30 }}>KPI</div>
            <div className="vg-wire-cell col-span-3" style={{ minHeight: 30 }}>KPI</div>
            <div className="vg-wire-cell col-span-3" style={{ minHeight: 30 }}>KPI</div>
            <div className="vg-wire-cell col-span-7" style={{ minHeight: 60 }}>Trend</div>
            <div className="vg-wire-cell col-span-5" style={{ minHeight: 60 }}>Kırılım</div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="vg-wire p-3" style={{ width: 150 }}>
            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono mb-2">
              <Smartphone className="w-3.5 h-3.5" /> Mobil · tek sütun
            </div>
            <div className="space-y-1.5">
              <div className="vg-wire-cell" style={{ minHeight: 26 }}>KPI · en önemli</div>
              <div className="vg-wire-cell" style={{ minHeight: 26 }}>KPI</div>
              <div className="vg-wire-cell" style={{ minHeight: 40 }}>Trend</div>
              <div className="vg-wire-cell" style={{ minHeight: 40 }}>Kırılım</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 vg-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3 max-w-4xl">
        <ChevronRight className="w-4 h-4 text-[#ef4444] mt-0.5 flex-shrink-0" />
        <span>
          Tableau&apos;da &quot;Device Designer&quot;, Power BI&apos;da &quot;Mobil düzen&quot;
          ile telefon görünümünü ayrı tasarlayabilirsin. Birincil KPI&apos;ı en üste taşı.
        </span>
      </div>
    </SlideShell>
  ),

  /* ───── 15. PANO TASARIM KONTROL LİSTESİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Özet · pano tasarım kontrol listesi</Eyebrow>
      <H2>Yayınlamadan önce 6 soru</H2>
      <Sub className="mt-3 max-w-3xl">
        Bu altı maddeyi geçemeyen pano henüz hazır değildir.
      </Sub>
      <div className="mt-8 vg-card rounded-xl p-4">
        <table className="vg-table">
          <thead>
            <tr>
              <th style={{ width: "34%" }}>Soru</th>
              <th>Neden önemli?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Bu pano kim için?</td>
              <td>Kitle, detay seviyesini ve dili belirler.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Hangi tek soruyu yanıtlıyor?</td>
              <td>Odaksız pano her şeyi gösterir, hiçbir şey söylemez.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">En önemli sayı 5 sn&apos;de görünür mü?</td>
              <td>Birincil KPI sol-üstte ve en büyük olmalı.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Her sayının bir bağlamı var mı?</td>
              <td>Hedef / geçen dönem / kıyas olmadan sayı anlamsız.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Renk anlam taşıyor mu?</td>
              <td>Renk yalnızca dikkat ve durum için; süs için değil.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Silinebilecek bir şey var mı?</td>
              <td>Veri katmayan her öğe (ızgara, kutu, gauge) çıkarılmalı.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-xs text-gray-500 text-center font-mono">
        Az ama doğru &gt; çok ama gürültülü.
      </div>
    </SlideShell>
  ),

  /* ───── 16. UYGULAMALI LAB ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
      <H2>Kendi panonu sıfırdan kur</H2>
      <Sub className="mt-3 max-w-3xl">
        Tableau Public veya Power BI&apos;da, dönem boyunca kullandığın bir veri kümesiyle
        (örn. satış, not, hava durumu) tek ekranlık bir pano tasarla. Aşağıdaki dört adımı izle.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Target, title: "Amacı ve kitleyi yaz", desc: "Tek cümle: Bu pano [kim] için [hangi kararı] verir. Ardından 3-5 KPI seç.", accent: "#ef4444" },
          { icon: Grid3x3, title: "Kafes (wireframe) çiz", desc: "Kâğıtta ızgarayı çiz: üstte KPI, ortada trend/kırılım, altta detay. Sonra araçta kur.", accent: "#f59e0b" },
          { icon: Filter, title: "Bir filtre ve detaya inme ekle", desc: "Dönem/kategori dilimleyici + bir grafikte yıl→ay drill-down ekle.", accent: "#fbbf24" },
          { icon: Palette, title: "Renk ve mürekkep budaması", desc: "Tabanı nötr yap; rengi yalnız sorunlu/önemli metriğe sakla. Gereksiz çizgi-kutu sil.", accent: "#ef4444" },
        ].map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="vg-card vg-card-hover rounded-xl p-5 flex items-start gap-4"
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
      <div className="mt-5 vg-card rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl">
        <Users className="w-4 h-4 text-[#f59e0b] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Teslim:</span> Panonun ekran görüntüsü + 5 cümlelik gerekçe
          (kitle, tek soru, neden bu yerleşim). Sonraki derste kısa eşli (peer) değerlendirme yapacağız.
        </span>
      </div>
    </SlideShell>
  ),

  /* ───── 17. SIRADAKİ HAFTA ───── */
  () => (
    <SlideShell>
      <Eyebrow>Sıradaki Hafta · H16</Eyebrow>
      <H1>
        <span className="vg-shimmer-amber">Veri Hikâyeciliği &amp; Final Tekrarı</span>
      </H1>
      <Sub className="mt-6 max-w-3xl">
        Panoyu kurduk; şimdi onunla bir hikâye anlatmaya geçiyoruz. Bağlam, anlatı akışı
        ve sunum; ardından dönem boyunca öğrendiklerimizin final tekrarı.
      </Sub>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
        <FeatureCard
          icon={AlignLeft}
          title="Anlatı akışı"
          desc={'Veri + bağlam + öneri. "Ne oldu, neden, ne yapmalıyız?"'}
          accent="#ef4444"
          delay={0.1}
        />
        <FeatureCard
          icon={Eye}
          title="Dikkat yönlendirme"
          desc="Annotation, vurgu ve sıralama ile izleyiciyi yönlendirme."
          accent="#f59e0b"
          delay={0.2}
        />
        <FeatureCard
          icon={GraduationCap}
          title="Final tekrarı"
          desc="Grafik türleri, tasarım ilkeleri, araçlar — bütünleşik tekrar."
          accent="#fbbf24"
          delay={0.3}
        />
      </div>
      <div className="mt-8 vg-card rounded-lg p-4 flex items-center gap-3">
        <Calendar className="w-5 h-5 text-[#ef4444]" />
        <span className="text-sm text-gray-300">
          Lab panonu yarım bırakanlar, hikâyecilik haftasında üzerine kuracak bir tabanları olmaz.
        </span>
      </div>
    </SlideShell>
  ),

  /* ───── 18. KAPANIŞ ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8"
          style={{ background: "linear-gradient(135deg,#ef4444,#b91c1c)", boxShadow: "0 30px 80px -20px rgba(239,68,68,0.6)" }}
        >
          <LayoutDashboard className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>Hafta 15 · Tamamlandı</Eyebrow>
        <H1>
          <span className="vg-shimmer">Teşekkürler.</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          İyi pano çok grafik değil, doğru kararı kolaylaştıran az ve düzenli grafiktir.
          Önce amaç, sonra düzen, en son süs.
        </Sub>
        <div className="mt-12 grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="vg-card rounded-xl p-4">
            <Calendar className="w-5 h-5 text-[#ef4444] mx-auto mb-2" />
            <div className="text-xs text-gray-400">Ders Saati</div>
            <div className="text-sm font-semibold text-white mt-1">Cuma · 11:45–15:10</div>
          </div>
          <div className="vg-card rounded-xl p-4">
            <MapPin className="w-5 h-5 text-[#ef4444] mx-auto mb-2" />
            <div className="text-xs text-gray-400">Sınıf</div>
            <div className="text-sm font-semibold text-white mt-1">EnerjiSA Bilgisayar Lab 1</div>
          </div>
          <div className="vg-card rounded-xl p-4">
            <Mail className="w-5 h-5 text-[#ef4444] mx-auto mb-2" />
            <div className="text-xs text-gray-400">İletişim</div>
            <div className="text-sm font-semibold text-white mt-1">Ofis saatleri · Perş 14:00</div>
          </div>
        </div>
        <div className="mt-12 flex items-center justify-center gap-3 text-xs font-mono text-gray-500">
          <Sparkles className="w-4 h-4" />
          <span>MCBÜ MYO · BVA 2107 · Veri Görselleştirme · 2025-2026 Bahar</span>
        </div>
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
            background: "linear-gradient(90deg, #ef4444, #f87171, #ef4444)",
            boxShadow: "0 0 16px rgba(239,68,68,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#ef4444]/70">
          BVA 2107 · 15. Hafta · Gösterge Paneli Tasarımı
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[#ef4444]/50">
            <span className="text-[#ef4444]">
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
            className="p-1.5 text-gray-500 hover:text-[#ef4444] transition-colors"
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
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#ef4444] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
                  ? "w-5 bg-[#ef4444]"
                  : "w-1.5 bg-white/15 hover:bg-white/40"
              }`}
              style={
                i === current
                  ? { boxShadow: "0 0 10px rgba(239,68,68,0.6)" }
                  : undefined
              }
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#ef4444] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
