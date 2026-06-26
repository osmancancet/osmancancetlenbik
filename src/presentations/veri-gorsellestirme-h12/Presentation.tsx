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
  Sparkles,
  Eraser,
  Crosshair,
  Type,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  X,
  Eye,
  Tag,
  Highlighter,
  Ruler,
  Trash2,
  AlignLeft,
  ArrowRight,
  ListChecks,
  Target,
  Layers,
  Calendar,
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

/* ============================================================
   TOPIC MOCKUPS — netlik & etkililik
   ============================================================ */

type Bar = { l: string; v: number };

const QUARTER_DATA: Bar[] = [
  { l: "Oca", v: 32 },
  { l: "Şub", v: 41 },
  { l: "Mar", v: 38 },
  { l: "Nis", v: 47 },
  { l: "May", v: 44 },
  { l: "Haz", v: 71 },
  { l: "Tem", v: 58 },
  { l: "Ağu", v: 53 },
];

/* Aşırı süslenmiş, okunması zor "kötü" bar grafik */
function CluttererBar({ width = 300, height = 220 }: { width?: number; height?: number }) {
  const pad = 30;
  const max = Math.max(...QUARTER_DATA.map((d) => d.v));
  const bw = (width - 2 * pad) / QUARTER_DATA.length - 6;
  const palette = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6", "#eab308"];
  return (
    <svg width={width} height={height} className="block mx-auto">
      {/* Yoğun ızgara çizgileri = gürültü */}
      {Array.from({ length: 9 }).map((_, i) => (
        <line
          key={`g-${i}`}
          x1={pad}
          y1={pad + i * ((height - 2 * pad) / 8)}
          x2={width - pad}
          y2={pad + i * ((height - 2 * pad) / 8)}
          stroke="#475569"
          strokeWidth={1}
          strokeDasharray="2 2"
        />
      ))}
      <text x={width / 2} y={16} textAnchor="middle" fill="#fbbf24" fontSize={13} fontWeight={900}>
        2025 AYLIK SATIŞLAR (bin ₺)!!!
      </text>
      {QUARTER_DATA.map((d, i) => {
        const h = ((height - 2 * pad) * d.v) / max;
        const x = pad + i * (bw + 6);
        const y = height - pad - h;
        return (
          <g key={d.l}>
            {/* Sahte 3D gölge */}
            <rect x={x + 4} y={y + 4} width={bw} height={h} fill="#000" opacity={0.4} />
            <rect x={x} y={y} width={bw} height={h} fill={palette[i % palette.length]} />
            {/* Her bara veri etiketi + gölge metin = kalabalık */}
            <text x={x + bw / 2} y={y - 4} textAnchor="middle" fill="#fff" fontSize={9} fontWeight={700}>
              {d.v}
            </text>
            <text x={x + bw / 2} y={height - pad + 12} textAnchor="middle" fill="#cbd5e1" fontSize={8}>
              {d.l}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* Sadeleştirilmiş, tek bir vurgulu "iyi" bar grafik */
function FocusedBar({ width = 300, height = 220 }: { width?: number; height?: number }) {
  const pad = 30;
  const max = Math.max(...QUARTER_DATA.map((d) => d.v));
  const bw = (width - 2 * pad) / QUARTER_DATA.length - 6;
  const peakIndex = QUARTER_DATA.reduce(
    (best, d, i) => (d.v > QUARTER_DATA[best].v ? i : best),
    0
  );
  return (
    <svg width={width} height={height} className="block mx-auto">
      {/* Tek bir referans çizgisi — hafif */}
      <line
        x1={pad}
        y1={pad}
        x2={pad}
        y2={height - pad}
        stroke="#334155"
        strokeWidth={1}
      />
      <line
        x1={pad}
        y1={height - pad}
        x2={width - pad}
        y2={height - pad}
        stroke="#334155"
        strokeWidth={1}
      />
      <text x={pad} y={16} fill="#e5e7eb" fontSize={12} fontWeight={600}>
        Haziran zirvesi: tüm yılın en yükseği
      </text>
      {QUARTER_DATA.map((d, i) => {
        const h = ((height - 2 * pad) * d.v) / max;
        const x = pad + i * (bw + 6);
        const y = height - pad - h;
        const isPeak = i === peakIndex;
        return (
          <g key={d.l}>
            <rect
              x={x}
              y={y}
              width={bw}
              height={h}
              rx={2}
              fill={isPeak ? "#ef4444" : "#475569"}
            />
            {/* Yalnızca vurgulanan bara değer yaz */}
            {isPeak && (
              <text x={x + bw / 2} y={y - 5} textAnchor="middle" fill="#fca5a5" fontSize={11} fontWeight={700}>
                {d.v}
              </text>
            )}
            <text
              x={x + bw / 2}
              y={height - pad + 12}
              textAnchor="middle"
              fill={isPeak ? "#fca5a5" : "#64748b"}
              fontSize={8}
            >
              {d.l}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* Ön-dikkatsel (preattentive) öznitelik gösterimi: sayı içinde tek vurgulu hücre */
function PreattentiveGrid({ highlight }: { highlight: boolean }) {
  const cols = 9;
  const rows = 4;
  const targetR = 2;
  const targetC = 6;
  return (
    <div className="vg-chart-frame">
      <div className="grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 6 }}>
        {Array.from({ length: rows * cols }).map((_, idx) => {
          const r = Math.floor(idx / cols);
          const c = idx % cols;
          const isTarget = r === targetR && c === targetC;
          const emph = highlight && isTarget;
          return (
            <div
              key={idx}
              className="flex items-center justify-center rounded text-[11px] font-mono"
              style={{
                height: 26,
                background: emph ? "#ef4444" : "rgba(148,163,184,0.10)",
                color: emph ? "#fff" : "#94a3b8",
                fontWeight: emph ? 800 : 400,
              }}
            >
              7
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* Vurgu (highlight) tekniği: bir kategori öne, geri kalanı geri */
function HighlightBar({ width = 300, height = 180 }: { width?: number; height?: number }) {
  const data: Bar[] = [
    { l: "A Bölge", v: 28 },
    { l: "B Bölge", v: 35 },
    { l: "Biz", v: 62 },
    { l: "C Bölge", v: 30 },
    { l: "D Bölge", v: 24 },
  ];
  const pad = 26;
  const max = Math.max(...data.map((d) => d.v));
  const bw = (width - 2 * pad) / data.length - 8;
  return (
    <svg width={width} height={height} className="block mx-auto">
      <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#334155" />
      {data.map((d, i) => {
        const h = ((height - 2 * pad) * d.v) / max;
        const x = pad + i * (bw + 8);
        const y = height - pad - h;
        const mine = d.l === "Biz";
        return (
          <g key={d.l}>
            <rect x={x} y={y} width={bw} height={h} rx={2} fill={mine ? "#ef4444" : "#3f3f46"} />
            <text
              x={x + bw / 2}
              y={height - pad + 12}
              textAnchor="middle"
              fill={mine ? "#fca5a5" : "#71717a"}
              fontSize={8}
            >
              {d.l}
            </text>
            {mine && (
              <text x={x + bw / 2} y={y - 5} textAnchor="middle" fill="#fca5a5" fontSize={11} fontWeight={700}>
                {d.v}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* Doğrudan etiketleme vs. ayrık lejant karşılaştırması (çizgi grafik) */
function DirectLabelLine({ width = 320, height = 180 }: { width?: number; height?: number }) {
  const series = [
    { name: "Ürün A", color: "#ef4444", pts: [20, 26, 30, 36, 44, 52] },
    { name: "Ürün B", color: "#f59e0b", pts: [30, 31, 29, 33, 34, 36] },
  ];
  const pad = 26;
  const all = series.flatMap((s) => s.pts);
  const max = Math.max(...all);
  const min = Math.min(...all);
  const n = series[0].pts.length;
  const step = (width - 2 * pad - 36) / (n - 1);
  const sx = (i: number) => pad + i * step;
  const sy = (v: number) => height - pad - ((v - min) / (max - min)) * (height - 2 * pad);
  return (
    <svg width={width} height={height} className="block mx-auto">
      <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#334155" />
      {series.map((s) => {
        const path = s.pts.map((v, i) => `${sx(i)},${sy(v)}`).join(" ");
        const lastI = s.pts.length - 1;
        return (
          <g key={s.name}>
            <polyline points={path} fill="none" stroke={s.color} strokeWidth={2} />
            {/* Lejant yerine doğrudan çizgi ucuna etiket */}
            <text x={sx(lastI) + 6} y={sy(s.pts[lastI]) + 3} fill={s.color} fontSize={10} fontWeight={700}>
              {s.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* Eksen kırpma yanıltması: aynı veri, iki farklı y-ekseni başlangıcı */
function AxisTruncation({ start, width = 240, height = 160 }: { start: number; width?: number; height?: number }) {
  const data = [98, 99, 100, 101, 103];
  const labels = ["1Ç", "2Ç", "3Ç", "4Ç", "1Ç"];
  const pad = 28;
  const max = 105;
  const sx = (i: number) => pad + i * ((width - 2 * pad) / data.length) + 4;
  const bw = (width - 2 * pad) / data.length - 8;
  const sy = (v: number) =>
    height - pad - ((v - start) / (max - start)) * (height - 2 * pad);
  return (
    <div className="vg-chart-frame">
      <div className="text-[10px] text-gray-400 mb-1 font-mono">y ekseni {start}&apos;den başlıyor</div>
      <svg width={width} height={height} className="block">
        <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#475569" />
        <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="#475569" />
        <text x={pad - 6} y={height - pad + 3} fill="#64748b" fontSize={8} textAnchor="end">{start}</text>
        <text x={pad - 6} y={pad + 6} fill="#64748b" fontSize={8} textAnchor="end">{max}</text>
        {data.map((v, i) => {
          const h = height - pad - sy(v);
          return (
            <g key={i}>
              <rect x={sx(i)} y={sy(v)} width={bw} height={h} rx={2} fill="#ef4444" />
              <text x={sx(i) + bw / 2} y={height - pad + 11} textAnchor="middle" fill="#94a3b8" fontSize={7}>
                {labels[i]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* Tableau "Format" panel mockup — gridline/etiket/font ayarları */
function FormatPanelMock() {
  const rows = [
    { icon: Trash2, label: "Izgara çizgileri", value: "Yok", accent: "#86efac" },
    { icon: AlignLeft, label: "Eksen başlığı", value: "Gelir (bin ₺)", accent: "#67e8f9" },
    { icon: Tag, label: "İşaret etiketi", value: "Yalnızca seçili", accent: "#fcd34d" },
    { icon: Highlighter, label: "Vurgu rengi", value: "#ef4444", accent: "#fca5a5" },
    { icon: Type, label: "Sayı biçimi", value: "₺#,##0\"K\"", accent: "#c4b5fd" },
  ];
  return (
    <WindowChrome title="Tableau · Biçim (Format) paneli" badge="T">
      <div className="vg-dash p-3" style={{ minHeight: 280 }}>
        <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-3">
          Çalışma sayfası &gt; Biçim &gt; Hücre / Eksen
        </div>
        <div className="space-y-2">
          {rows.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="vg-dash-tile flex items-center justify-between"
            >
              <span className="flex items-center gap-2 text-[12px] text-gray-200">
                <r.icon className="w-4 h-4" style={{ color: r.accent }} />
                {r.label}
              </span>
              <span className="font-mono text-[11px]" style={{ color: r.accent }}>
                {r.value}
              </span>
            </motion.div>
          ))}
        </div>
        <div className="mt-3 text-[10px] text-gray-500 leading-snug">
          Her satır bir &quot;veri olmayan mürekkep&quot; kararı: göster, gizle veya sadeleştir.
          Varsayılanlar nadiren en iyisidir.
        </div>
      </div>
    </WindowChrome>
  );
}

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ───── 1. Kapak ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2107 · 12. Hafta</Eyebrow>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
          <span className="vg-shimmer">Netlik &amp; Etkililik için</span>
          <br />
          <span className="text-white/90">Görselleştirmeyi Özelleştirme</span>
        </h1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Varsayılan grafik bir başlangıçtır, bir bitiş değil. Bu hafta her grafiği
          gürültüden arındırıp tek bir mesaja odaklamayı öğreniyoruz.
        </Sub>
        <div className="mt-12 grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { name: "Sadeleştir", desc: "Gereksiz mürekkebi at", icon: Eraser },
            { name: "Vurgula", desc: "Dikkati tek noktaya yönlendir", icon: Crosshair },
            { name: "Etiketle", desc: "Başlık · eksen · doğrudan etiket", icon: Type },
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
        <div className="mt-10 inline-flex items-center gap-2 text-xs font-mono text-gray-500">
          <Calendar className="w-3.5 h-3.5" />
          Manisa CBÜ MYO · Bilgisayar Programcılığı · Uygulamalı (Tableau)
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. Geçen haftadan köprü ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 11. haftadan 12. haftaya</Eyebrow>
      <H2>Doğru grafiği seçtik; şimdi onu &quot;konuşturacağız&quot;</H2>
      <Sub className="mt-3 max-w-3xl">
        Önceki haftalarda doğru grafik türünü seçmeyi ve panoyu kurmayı işledik. Ama doğru tür
        tek başına yetmez: aynı bar grafik hem kafa karıştırabilir hem de bir mesajı net biçimde
        iletebilir. Aradaki fark özelleştirmedir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="vg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fca5a5]">
            <X className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Önce neredeydik</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ef4444] flex-shrink-0" />&quot;Veriyi gösteren&quot; bir grafik var.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ef4444] flex-shrink-0" />Tüm kategoriler eşit ağırlıkta.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ef4444] flex-shrink-0" />İzleyici &quot;ne demek istiyor?&quot; diye düşünüyor.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="vg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <Check className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu haftanın hedefi</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Mesajı taşımayan her öğeyi kaldırmak.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Dikkati tek bir bulguya yönlendirmek.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Başlık ve etiketlerle &quot;ne&quot; ve &quot;ne olmuş&quot;u söylemek.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 3. Dersin akışı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: sadeleştir → vurgula → etiketle</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce gürültüyü temizliyoruz; sonra kalan veride dikkati yönetiyoruz; en son metinle anlamı
        kilitliyoruz. Sonunda Tableau&apos;da küçük bir özelleştirme labı.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Netlik · Sadeleştirme", items: ["Veri-mürekkep oranı", "Chartjunk temizliği", "Önce/sonra karşılaştırma"], icon: Eraser, accent: "#ef4444" },
          { range: "02", title: "Etkililik · Vurgu", items: ["Ön-dikkatsel öznitelikler", "Renkle vurgulama", "Annotation ile not düşme"], icon: Crosshair, accent: "#f59e0b" },
          { range: "03", title: "Etiketleme · Bütünlük", items: ["Anlamlı başlık", "Doğrudan etiketleme", "Eksen dürüstlüğü"], icon: Type, accent: "#22c55e" },
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

  /* ───── 4. Bölüm 1 — Netlik ───── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Netlik: Sadeleştirme"
      subtitle="İyi bir grafik, eklenecek bir şey kalmadığında değil; çıkarılacak bir şey kalmadığında biter. Önce gürültüyü temizleyelim."
      bgGradient="linear-gradient(135deg, #ef4444, #b91c1c)"
      shadow="0 25px 60px -15px rgba(239, 68, 68, 0.6)"
      icon={<Eraser className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 5. Data-ink ratio hatırlatma ───── */
  () => (
    <SlideShell>
      <Eyebrow>Veri-mürekkep oranı</Eyebrow>
      <H2>Her piksel bir veri taşıyor mu?</H2>
      <Sub className="mt-3 max-w-3xl">
        Tufte&apos;nin ölçütü basit: grafikteki mürekkebin mümkün olduğunca büyük kısmı veriyi
        göstermeli. Özelleştirmenin ilk adımı, veriyi göstermeyen her şeyi sorgulamaktır.
      </Sub>
      <div className="mt-8 grid grid-cols-2 gap-6">
        <FeatureCard
          icon={Trash2}
          title="Önce sil, sonra ekle"
          desc="Izgara çizgileri, kenarlık, arka plan dolgusu, gölge ve 3D — kanıtla gerekçelendirilemiyorsa kaldırın."
          delay={0.1}
        />
        <FeatureCard
          icon={Ruler}
          title="Sonra inceltip soluklaştır"
          desc="Tutmaya karar verdiğiniz yardımcı öğeleri (eksen, kılavuz) inceltin ve gri tonuna çekin; veriyle yarışmasınlar."
          delay={0.2}
          accent="#f59e0b"
        />
      </div>
      <div className="mt-6 vg-card rounded-lg p-4 text-sm text-gray-300 flex items-start gap-3">
        <Eye className="w-5 h-5 text-[#ef4444] mt-0.5 shrink-0" />
        <div>
          <span className="text-white font-semibold">Pratik sınama:</span> Bir öğeyi sildiğinizde
          okuyucu veriyi hâlâ doğru okuyabiliyorsa, o öğe muhtemelen gereksizdi.
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 6. Önce / sonra (chartjunk) ───── */
  () => (
    <SlideShell>
      <Eyebrow>Önce · Sonra</Eyebrow>
      <H2>Aynı veri, iki sunum</H2>
      <Sub className="mt-3 max-w-3xl">
        Soldaki grafik &quot;her şeyi&quot; gösterir ve bu yüzden hiçbir şey söylemez. Sağdaki tek
        bir cümleyi anlatır: Haziran zirvesi.
      </Sub>
      <div className="mt-8 grid grid-cols-2 gap-6">
        <div className="vg-card rounded-xl p-4 border-2 border-red-500/30">
          <div className="flex items-center gap-2 mb-3">
            <X className="w-5 h-5 text-rose-400" />
            <span className="text-sm font-semibold text-rose-300">Gürültülü</span>
          </div>
          <CluttererBar />
          <ul className="mt-3 text-[11px] text-gray-400 space-y-1">
            <li>· 8 farklı renk + 3D gölge: anlamsız çeşitlilik</li>
            <li>· Her bara etiket: göz nereye baksın belirsiz</li>
            <li>· Yoğun ızgara çizgileri veriyle yarışıyor</li>
          </ul>
        </div>
        <div className="vg-card rounded-xl p-4 border-2 border-emerald-500/30">
          <div className="flex items-center gap-2 mb-3">
            <Check className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-300">Sadeleştirilmiş</span>
          </div>
          <FocusedBar />
          <ul className="mt-3 text-[11px] text-gray-400 space-y-1">
            <li>· Tek vurgu rengi; geri kalan nötr gri</li>
            <li>· Yalnızca anlamlı değer etiketlenmiş</li>
            <li>· Başlık bulguyu söylüyor, &quot;veri&quot; demiyor</li>
          </ul>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 7. Sadeleştirme kontrol listesi ───── */
  () => (
    <SlideShell>
      <Eyebrow>Sadeleştirme · kontrol listesi</Eyebrow>
      <H2>Sileceğin sıra</H2>
      <Sub className="mt-3 max-w-3xl">
        Bir grafiği özelleştirmeye başladığınızda bu sırayla ilerleyin. Her madde bir
        &quot;veri olmayan mürekkep&quot; kararıdır.
      </Sub>
      <div className="mt-8 grid grid-cols-2 gap-4">
        {[
          { t: "Kenarlık ve arka plan dolgusu", d: "Çerçeve ve gri kutular bilgi taşımaz; kaldırın." },
          { t: "Ağır ızgara çizgileri", d: "Tamamen silin ya da çok ince ve soluk bırakın." },
          { t: "Gereksiz eksen işaretleri", d: "Çok sık işaret yerine 4-5 yuvarlak değer yeter." },
          { t: "3D, gölge, gradyan", d: "Derinlik yanılsaması oranları bozar; düzleştirin." },
          { t: "Tekrarlayan veri etiketleri", d: "Hepsini değil, yalnızca öne çıkanı etiketleyin." },
          { t: "Renk israfı", d: "Kategori başına ayrı renk yerine tek vurgu + gri kullanın." },
        ].map((it, i) => (
          <motion.div
            key={it.t}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="vg-card rounded-lg p-4 flex gap-3"
          >
            <div className="w-7 h-7 rounded-md border border-[#ef4444]/50 flex items-center justify-center shrink-0">
              <Trash2 className="w-4 h-4 text-[#ef4444]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">{it.t}</div>
              <div className="text-[11px] text-gray-400 mt-0.5 leading-snug">{it.d}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 8. Bölüm 2 — Etkililik / Vurgu ───── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Etkililik: Vurgu"
      subtitle="Gürültü gidince yeni soru: izleyici önce nereye baksın? Bunu siz seçersiniz — ön-dikkatsel öznitelikler ile."
      bgGradient="linear-gradient(135deg, #f59e0b, #b45309)"
      shadow="0 25px 60px -15px rgba(245, 158, 11, 0.6)"
      icon={<Crosshair className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 9. Ön-dikkatsel öznitelikler ───── */
  () => (
    <SlideShell>
      <Eyebrow>Ön-dikkatsel (preattentive) öznitelikler</Eyebrow>
      <H2>Bir öğeyi &quot;aramadan&quot; bulmak</H2>
      <Sub className="mt-3 max-w-3xl">
        Beyin renk, boyut, konum ve yönelim gibi bazı özellikleri saniyeden hızlı, çaba harcamadan
        işler. Aynı tabloda tek bir hücreyi renkle ayırdığınızda göz ona kendiliğinden gider.
      </Sub>
      <div className="mt-8 grid grid-cols-2 gap-6 items-start">
        <div>
          <div className="text-xs text-gray-400 mb-2 text-center font-mono">Vurgusuz — &quot;7&quot;leri saymak için tararsın</div>
          <PreattentiveGrid highlight={false} />
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-2 text-center font-mono">Tek renk vurgusu — hedef anında belli</div>
          <PreattentiveGrid highlight />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-4 gap-3">
        {[
          { t: "Renk tonu", d: "Tek bir öğeyi belirgin renge boya." },
          { t: "Yoğunluk", d: "Önemliyi koyu, gerisini soluk yap." },
          { t: "Boyut", d: "Daha büyük = daha önemli algısı." },
          { t: "Konum", d: "Üste/sola yerleştirilen önce okunur." },
        ].map((a, i) => (
          <motion.div
            key={a.t}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
            className="vg-card rounded-lg p-3"
          >
            <div className="text-sm font-semibold text-white">{a.t}</div>
            <div className="text-[11px] text-gray-400 mt-0.5 leading-snug">{a.d}</div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 10. Renkle vurgu (highlight) ───── */
  () => (
    <SlideShell>
      <Eyebrow>Vurgu tekniği · gri + tek renk</Eyebrow>
      <H2>Kalabalığı sustur, mesajı yükselt</H2>
      <Sub className="mt-3 max-w-3xl">
        En güçlü vurgu yöntemlerinden biri: ilgilendiğiniz kategoriyi tek bir vurgu rengine, geri
        kalan her şeyi nötr griye çekmek. Karşılaştırma korunur ama dikkat tek yere gider.
      </Sub>
      <div className="mt-8 grid grid-cols-2 gap-6 items-center">
        <div className="vg-card rounded-xl p-5">
          <div className="text-xs text-gray-400 mb-2 text-center font-mono">&quot;Biz&quot; vurgulu — kıyas anında okunur</div>
          <HighlightBar />
        </div>
        <div className="space-y-3">
          <div className="vg-card rounded-lg p-4 text-sm text-gray-300">
            <span className="text-[#ef4444] font-semibold">1.</span> Önce hikâyenin kahramanını seçin
            (bir kategori, bir dönem, bir eşik).
          </div>
          <div className="vg-card rounded-lg p-4 text-sm text-gray-300">
            <span className="text-[#f59e0b] font-semibold">2.</span> Geri kalan her şeyi tek bir nötr
            tona indirin (gri); rengi &quot;harcamayın&quot;.
          </div>
          <div className="vg-card rounded-lg p-4 text-sm text-gray-300">
            <span className="text-[#22c55e] font-semibold">3.</span> Vurgu rengini yalnızca bir kez,
            tutarlı biçimde kullanın — anlamı sabit kalsın.
          </div>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 11. Annotation — not düşme ───── */
  () => (
    <SlideShell>
      <Eyebrow>Annotation · grafiğin üstüne yazı</Eyebrow>
      <H2>&quot;Şuna bak&quot; demenin en doğrudan yolu</H2>
      <Sub className="mt-3 max-w-3xl">
        Renk dikkati çeker; annotation ise nedenini söyler. Grafiğin üstüne yerleştirilen kısa bir
        not, izleyiciyi tahminde bırakmaz. İyi annotation kısa, veriye yakın ve gerekçeli olur.
      </Sub>
      <div className="mt-8 grid grid-cols-2 gap-6 items-start">
        <div className="vg-card rounded-xl p-5">
          <div className="text-xs text-gray-400 mb-2 text-center font-mono">Çizgi grafik + olay notu</div>
          <svg width={320} height={190} className="block mx-auto">
            <line x1={26} y1={164} x2={300} y2={164} stroke="#334155" />
            {(() => {
              const pts = [22, 24, 23, 25, 40, 52, 58, 61];
              const max = 65;
              const min = 18;
              const step = (300 - 26 - 10) / (pts.length - 1);
              const sx = (i: number) => 26 + i * step;
              const sy = (v: number) => 164 - ((v - min) / (max - min)) * (164 - 26);
              const path = pts.map((v, i) => `${sx(i)},${sy(v)}`).join(" ");
              return (
                <>
                  <polyline points={path} fill="none" stroke="#ef4444" strokeWidth={2} />
                  <circle cx={sx(4)} cy={sy(40)} r={4} fill="#ef4444" />
                  <line x1={sx(4)} y1={sy(40)} x2={sx(4)} y2={40} stroke="#fca5a5" strokeWidth={1} strokeDasharray="3 3" />
                  <text x={sx(4) + 4} y={36} fill="#fca5a5" fontSize={9} fontWeight={700}>
                    Mayıs: kampanya
                  </text>
                </>
              );
            })()}
          </svg>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="vg-annot"><Tag className="w-3 h-3" /> İYİ ANNOTATION</span>
          </div>
          {[
            "Kısa: bir-iki kelime ya da tek cümle.",
            "Veriye yakın: ait olduğu noktaya bağlı (ok / çizgi).",
            "Gerekçeli: &quot;ne&quot; değil &quot;neden&quot;i anlatır (kampanya, kesinti, mevzuat).",
            "Sade: kutu/gölge değil; ince çizgi ve net yazı.",
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              className="vg-card rounded-lg p-3 text-sm text-gray-300 flex items-start gap-2"
            >
              <ArrowRight className="w-4 h-4 text-[#ef4444] mt-0.5 shrink-0" />
              <span dangerouslySetInnerHTML={{ __html: t }} />
            </motion.div>
          ))}
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 12. Bölüm 3 — Etiketleme & Bütünlük ───── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Etiketleme &amp; Bütünlük"
      subtitle="Görsel hazır; şimdi metin. Başlık mesajı söyler, doğrudan etiketler okumayı hızlandırır, dürüst eksen güveni korur."
      bgGradient="linear-gradient(135deg, #ef4444, #f59e0b)"
      shadow="0 25px 60px -15px rgba(239, 68, 68, 0.55)"
      icon={<Type className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 13. Anlamlı başlık ───── */
  () => (
    <SlideShell>
      <Eyebrow>Başlık · grafiğin manşeti</Eyebrow>
      <H2>Konuyu değil, bulguyu yaz</H2>
      <Sub className="mt-3 max-w-3xl">
        &quot;Aylık Satışlar&quot; konuyu söyler ama mesajı söylemez. Başlığı bir gazete manşeti
        gibi düşünün: izleyici sadece onu okusa bile ana fikri almalı.
      </Sub>
      <div className="mt-8 grid grid-cols-2 gap-6">
        <div className="vg-card rounded-xl p-5 border-2 border-red-500/30">
          <div className="flex items-center gap-2 mb-3">
            <X className="w-5 h-5 text-rose-400" />
            <span className="text-sm font-semibold text-rose-300">Etiket gibi başlık</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="font-mono text-gray-300 bg-black/40 rounded px-3 py-2">&quot;Aylık Satışlar&quot;</div>
            <div className="font-mono text-gray-300 bg-black/40 rounded px-3 py-2">&quot;Bölge Bazlı Gelir&quot;</div>
            <div className="font-mono text-gray-300 bg-black/40 rounded px-3 py-2">&quot;Grafik 4&quot;</div>
          </div>
          <p className="text-[11px] text-gray-400 mt-3">Sadece &quot;ne&quot;yi söyler; sonucu izleyiciye bırakır.</p>
        </div>
        <div className="vg-card rounded-xl p-5 border-2 border-emerald-500/30">
          <div className="flex items-center gap-2 mb-3">
            <Check className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-300">Bulgu söyleyen başlık</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="font-mono text-emerald-200 bg-black/40 rounded px-3 py-2">&quot;Haziran satışları yılın zirvesine ulaştı&quot;</div>
            <div className="font-mono text-emerald-200 bg-black/40 rounded px-3 py-2">&quot;Gelirin yarısı tek bölgeden geliyor&quot;</div>
            <div className="font-mono text-emerald-200 bg-black/40 rounded px-3 py-2">&quot;İade oranı hedefin iki katı&quot;</div>
          </div>
          <p className="text-[11px] text-gray-400 mt-3">&quot;Ne olmuş&quot;u söyler; izleyiciyi sonuca taşır.</p>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 14. Doğrudan etiketleme vs lejant ───── */
  () => (
    <SlideShell>
      <Eyebrow>Etiketleme · lejant yerine doğrudan</Eyebrow>
      <H2>Gözü ileri geri koşturma</H2>
      <Sub className="mt-3 max-w-3xl">
        Ayrı bir lejant, izleyiciyi sürekli renkle açıklama arasında gidip gelmeye zorlar. Çizginin
        ucuna doğrudan yazılan etiket bu zihinsel yükü kaldırır.
      </Sub>
      <div className="mt-8 grid grid-cols-2 gap-6 items-center">
        <div className="vg-card rounded-xl p-5">
          <div className="text-xs text-gray-400 mb-2 text-center font-mono">Doğrudan etiket — okuma akıcı</div>
          <DirectLabelLine />
        </div>
        <div className="space-y-3">
          <div className="vg-card rounded-lg p-4 text-sm text-gray-300 flex items-start gap-2">
            <Tag className="w-4 h-4 text-[#ef4444] mt-0.5 shrink-0" />
            <span>Etiketi serinin <span className="text-white">son noktasına</span> ve aynı renkte koyun.</span>
          </div>
          <div className="vg-card rounded-lg p-4 text-sm text-gray-300 flex items-start gap-2">
            <Layers className="w-4 h-4 text-[#f59e0b] mt-0.5 shrink-0" />
            <span>2-4 seriye kadar harika; çok kalabalıkta seçili olanları etiketleyin.</span>
          </div>
          <div className="vg-card rounded-lg p-4 text-sm text-gray-300 flex items-start gap-2">
            <Eye className="w-4 h-4 text-[#22c55e] mt-0.5 shrink-0" />
            <span>Lejant gerekiyorsa renk sırasını grafikteki sırayla eşleştirin.</span>
          </div>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 15. Eksen dürüstlüğü ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bütünlük · eksen dürüstlüğü</Eyebrow>
      <H2>Özelleştirme yanıltmaya dönüşmesin</H2>
      <Sub className="mt-3 max-w-3xl">
        Netlik için yapılan ayarlar veriyi çarpıtmamalı. Aynı sayılar, bar grafikte sıfırdan
        başlamayan bir y-ekseniyle çok daha büyük bir değişim &quot;hissi&quot; verir — bu bir tasarım
        hatasıdır, bir teknik değil.
      </Sub>
      <div className="mt-8 grid grid-cols-2 gap-6">
        <div>
          <div className="text-xs text-emerald-300 mb-2 text-center font-mono">Dürüst — bar grafikte sıfırdan başla</div>
          <AxisTruncation start={0} />
        </div>
        <div>
          <div className="text-xs text-rose-300 mb-2 text-center font-mono">Yanıltıcı — kırpılmış eksen farkı abartır</div>
          <AxisTruncation start={97} />
        </div>
      </div>
      <div className="mt-6 vg-card rounded-lg p-4 text-sm text-gray-300 flex items-start gap-3">
        <Ruler className="w-5 h-5 text-[#ef4444] mt-0.5 shrink-0" />
        <div>
          <span className="text-white font-semibold">Kural:</span> Uzunlukla karşılaştırma yapan
          grafiklerde (bar/sütun) eksen sıfırdan başlar. Çizgi grafikte odak değişimse kırpma kabul
          edilebilir, ama her zaman eksen değerlerini açıkça etiketleyin.
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 16. Tableau format panel mockup ───── */
  () => (
    <SlideShell>
      <Eyebrow>Tableau · uygulamada</Eyebrow>
      <H2>Bu kararlar araçta nereye düşer?</H2>
      <Sub className="mt-3 max-w-3xl">
        Tableau&apos;da öğrendiğimiz her ilke &quot;Biçim&quot; panelindeki bir ayara karşılık gelir:
        ızgarayı kapat, başlığı yeniden yaz, yalnızca seçili işareti etiketle, tek vurgu rengi ata.
      </Sub>
      <div className="mt-8 grid grid-cols-2 gap-6 items-center">
        <FormatPanelMock />
        <div className="space-y-3">
          {[
            { i: Eraser, t: "Izgara çizgileri → Yok", d: "Çalışma sayfası &gt; Biçim &gt; Satır/Sütun çizgileri = Yok." },
            { i: Type, t: "Başlığı düzenle", d: "Sayfa başlığına çift tıkla; bulguyu yazan manşeti gir." },
            { i: Tag, t: "Etiketi sınırla", d: "Etiketler &gt; Min/Maks ya da yalnızca seçili işaretler." },
            { i: Highlighter, t: "Renk → tek vurgu", d: "Ölçüyü Renk&apos;e at; vurgulanan dışını griye sabitle." },
          ].map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              className="vg-card rounded-lg p-3 flex items-start gap-3"
            >
              <s.i className="w-5 h-5 text-[#ef4444] mt-0.5 shrink-0" />
              <div>
                <div className="text-sm font-semibold text-white">{s.t}</div>
                <div className="text-[11px] text-gray-400 mt-0.5 leading-snug" dangerouslySetInnerHTML={{ __html: s.d }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 17. Uygulamalı lab ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
      <H2>Bir grafiği &quot;önce/sonra&quot; dönüştür</H2>
      <Sub className="mt-3 max-w-3xl">
        Daha önceki haftalarda yaptığınız panodan bir grafik seçin. Aşağıdaki dört adımı uygulayıp
        önce/sonra ekran görüntüsünü sonraki derse getirin.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Eraser, title: "Gürültüyü temizle", desc: "Izgarayı, kenarlığı, 3D ve gölgeyi kaldır; yardımcı çizgileri soluklaştır.", accent: "#ef4444" },
          { icon: Highlighter, title: "Tek vurgu uygula", desc: "Hikâyenin kahramanı kategoriyi vurgu rengine, gerisini griye çek.", accent: "#f59e0b" },
          { icon: Type, title: "Başlığı yeniden yaz", desc: "Konu değil bulgu söyleyen bir manşet yaz; eksen başlıklarını netleştir.", accent: "#22c55e" },
          { icon: Tag, title: "Etiketle ve not düş", desc: "Doğrudan etiket ekle, kritik noktaya kısa bir annotation koy.", accent: "#a855f7" },
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 vg-card rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <ListChecks className="w-4 h-4 text-[#ef4444] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Teslim:</span> Aynı grafiğin &quot;önce&quot; ve &quot;sonra&quot;
          görüntüsü + 3 cümlede hangi öğeleri neden değiştirdiğinizin açıklaması.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 18. Hatırla — özet kartları ───── */
  () => (
    <SlideShell>
      <Eyebrow>Özet · üç adımda netlik</Eyebrow>
      <H2>Her grafikte aynı refleks</H2>
      <Sub className="mt-3 max-w-3xl">
        Bir grafiği yayınlamadan önce kendinize bu üç soruyu sorun. Hepsine net cevap verebiliyorsanız
        grafik hazırdır.
      </Sub>
      <div className="mt-8 grid grid-cols-3 gap-4">
        <FeatureCard
          icon={Eraser}
          title="Sildim mi?"
          desc="Veriyi göstermeyen her öğe gitti mi, kalan yardımcılar soluk mu?"
          accent="#ef4444"
          delay={0.1}
        />
        <FeatureCard
          icon={Crosshair}
          title="Yönlendirdim mi?"
          desc="İzleyicinin gözü ilk nereye gidiyor; orası benim mesajım mı?"
          accent="#f59e0b"
          delay={0.2}
        />
        <FeatureCard
          icon={Type}
          title="Söyledim mi?"
          desc="Başlık bulguyu, etiketler bağlamı veriyor mu; eksen dürüst mü?"
          accent="#22c55e"
          delay={0.3}
        />
      </div>
      <div className="mt-6 vg-card rounded-lg p-4 text-sm text-gray-300 flex items-start gap-3 max-w-4xl">
        <Target className="w-5 h-5 text-[#ef4444] mt-0.5 shrink-0" />
        <div>
          <span className="text-white font-semibold">Anahtar fikir:</span> Özelleştirme bir süsleme
          değil, bir eleme işidir. Amaç grafiği güzelleştirmek değil, tek bir mesajı en az çabayla
          okunur kılmaktır.
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 19. Sıradaki hafta + kapanış ───── */
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
          <Sparkles className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>12. hafta tamamlandı · sıradaki: Veri Hikâyeleştirme</Eyebrow>
        <H1>
          <span className="vg-shimmer-amber">Tek Grafikten Anlatıya</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta tek bir grafiği netleştirdik. 13. haftada birden çok netleştirilmiş grafiği bir
          araya getirip akıcı bir veri hikâyesi (data storytelling) kurmayı işleyeceğiz:
          bağlam, gerilim ve çözüm.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="vg-card rounded-xl p-5">
            <AlignLeft className="w-5 h-5 text-[#ef4444] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Yapı</div>
            <div className="text-white font-semibold">Bağlam → bulgu → eylem</div>
            <div className="text-sm text-gray-400">anlatı yayı</div>
          </div>
          <div className="vg-card rounded-xl p-5">
            <Target className="w-5 h-5 text-[#f59e0b] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">Lab grafiğini getir</div>
            <div className="text-sm text-gray-400">önce/sonra ile</div>
          </div>
          <div className="vg-card rounded-xl p-5">
            <ListChecks className="w-5 h-5 text-[#22c55e] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">Özelleştirme raporu</div>
            <div className="text-sm text-gray-400">önce/sonra + 3 cümle</div>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-center gap-3 text-xs font-mono text-gray-500">
          <Keyboard className="w-3.5 h-3.5" />
          <span>MCBÜ MYO · BVA 2107 · Veri Görselleştirme</span>
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
          BVA 2107 · 12. Hafta · Netlik &amp; Etkililik
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
