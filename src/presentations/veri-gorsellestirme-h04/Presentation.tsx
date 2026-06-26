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
  BarChart3,
  LineChart,
  Hash,
  Type,
  Clock,
  Map as MapIcon,
  Layers,
  Code2,
  Table2,
  Calendar,
  Ruler,
  ListOrdered,
  Tag,
  TrendingUp,
  Globe,
  MapPin,
  Check,
  X,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Sparkles,
  Target,
  Database,
  Megaphone,
  GraduationCap,
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
   TOPIC MOCKUPS — Veri Türleri
   ============================================================ */

/* Renkli sütun tiplerine sahip bir veri çerçevesi (pandas df gibi) */
function TypedDataFrame() {
  const rows = [
    { id: 0, sehir: "İzmir", urun: "Laptop", adet: 14, fiyat: "18.499,90", tarih: "2026-03-01", lat: "38.4237", lon: "27.1428" },
    { id: 1, sehir: "Ankara", urun: "Klavye", adet: 120, fiyat: "549,00", tarih: "2026-03-01", lat: "39.9334", lon: "32.8597" },
    { id: 2, sehir: "İstanbul", urun: "Monitör", adet: 37, fiyat: "4.250,50", tarih: "2026-03-02", lat: "41.0082", lon: "28.9784" },
    { id: 3, sehir: "Bursa", urun: "Mouse", adet: 88, fiyat: "329,90", tarih: "2026-03-02", lat: "40.1885", lon: "29.0610" },
  ];
  return (
    <WindowChrome title="satislar.csv · pandas DataFrame" badge="df">
      <div className="overflow-x-auto">
        <table className="vg-df">
          <thead>
            <tr>
              <th className="text-left">#</th>
              <th>
                sehir
                <div className="mt-1"><span className="vg-dtype vg-dtype-cat">category</span></div>
              </th>
              <th>
                urun
                <div className="mt-1"><span className="vg-dtype vg-dtype-cat">category</span></div>
              </th>
              <th>
                adet
                <div className="mt-1"><span className="vg-dtype vg-dtype-num">int64</span></div>
              </th>
              <th>
                fiyat
                <div className="mt-1"><span className="vg-dtype vg-dtype-num">float64</span></div>
              </th>
              <th>
                tarih
                <div className="mt-1"><span className="vg-dtype vg-dtype-time">datetime64</span></div>
              </th>
              <th>
                lat
                <div className="mt-1"><span className="vg-dtype vg-dtype-geo">float64 (geo)</span></div>
              </th>
              <th>
                lon
                <div className="mt-1"><span className="vg-dtype vg-dtype-geo">float64 (geo)</span></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="vg-df-idx">{r.id}</td>
                <td style={{ color: "#fcd34d" }}>{r.sehir}</td>
                <td style={{ color: "#fcd34d" }}>{r.urun}</td>
                <td style={{ color: "#67e8f9" }}>{r.adet}</td>
                <td style={{ color: "#67e8f9" }}>{r.fiyat}</td>
                <td style={{ color: "#d8b4fe" }}>{r.tarih}</td>
                <td style={{ color: "#86efac" }}>{r.lat}</td>
                <td style={{ color: "#86efac" }}>{r.lon}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 text-[11px] text-gray-500 font-mono">
        Her sütun bir veri türü taşır — doğru grafiği seçmek o türü tanımakla başlar.
      </div>
    </WindowChrome>
  );
}

/* Kategorik veri için yatay bar */
function CategoricalBar({ width = 300, height = 180 }: { width?: number; height?: number }) {
  const data = [
    { l: "Laptop", v: 42 },
    { l: "Telefon", v: 31 },
    { l: "Tablet", v: 18 },
    { l: "Kulaklık", v: 9 },
  ];
  const pad = 70;
  const max = Math.max(...data.map((d) => d.v));
  const bh = (height - 20) / data.length - 8;
  return (
    <svg width={width} height={height} className="block">
      {data.map((d, i) => {
        const w = ((width - pad - 30) * d.v) / max;
        const y = 10 + i * (bh + 8);
        return (
          <g key={d.l}>
            <text x={pad - 8} y={y + bh / 2 + 4} fill="#94a3b8" fontSize={11} textAnchor="end">
              {d.l}
            </text>
            <rect x={pad} y={y} width={w} height={bh} fill="#f59e0b" rx={3} />
            <text x={pad + w + 6} y={y + bh / 2 + 4} fill="#e5e7eb" fontSize={11}>
              {d.v}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* Sayısal veri için histogram */
function NumericHistogram({ width = 300, height = 180 }: { width?: number; height?: number }) {
  const bins = [3, 7, 12, 18, 22, 16, 9, 4];
  const labels = ["0", "", "", "", "orta", "", "", "max"];
  const pad = 24;
  const max = Math.max(...bins);
  const bw = (width - 2 * pad) / bins.length - 2;
  return (
    <svg width={width} height={height} className="block">
      <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#475569" />
      <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="#475569" />
      {bins.map((v, i) => {
        const h = ((height - 2 * pad) * v) / max;
        return (
          <g key={i}>
            <rect
              x={pad + i * (bw + 2)}
              y={height - pad - h}
              width={bw}
              height={h}
              fill="#06b6d4"
              rx={2}
            />
            {labels[i] && (
              <text
                x={pad + i * (bw + 2) + bw / 2}
                y={height - pad + 12}
                fill="#94a3b8"
                fontSize={9}
                textAnchor="middle"
              >
                {labels[i]}
              </text>
            )}
          </g>
        );
      })}
      <text x={width / 2} y={14} fill="#67e8f9" fontSize={10} textAnchor="middle">
        dağılım (frekans)
      </text>
    </svg>
  );
}

/* Zaman serisi için çizgi */
function TimeSeriesLine({ width = 300, height = 180 }: { width?: number; height?: number }) {
  const values = [120, 135, 128, 160, 158, 185, 210, 195, 230, 248, 240, 275];
  const months = ["O", "Ş", "M", "N", "M", "H", "T", "A", "E", "E", "K", "A"];
  const pad = 24;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const step = (width - 2 * pad) / (values.length - 1);
  const pts = values
    .map((v, i) => {
      const x = pad + i * step;
      const y = height - pad - ((v - min) / (max - min)) * (height - 2 * pad);
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={width} height={height} className="block">
      <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#475569" />
      <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="#475569" />
      <polyline points={pts} fill="none" stroke="#a855f7" strokeWidth={2} />
      {values.map((v, i) => {
        const x = pad + i * step;
        const y = height - pad - ((v - min) / (max - min)) * (height - 2 * pad);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={2.5} fill="#d8b4fe" />
            <text x={x} y={height - pad + 12} fill="#94a3b8" fontSize={8} textAnchor="middle">
              {months[i]}
            </text>
          </g>
        );
      })}
      <text x={width / 2} y={14} fill="#d8b4fe" fontSize={10} textAnchor="middle">
        2026 · aylık trend
      </text>
    </svg>
  );
}

/* Coğrafi veri için basit choropleth ızgarası (Türkiye soyutlaması) */
function GeoChoropleth({ width = 300, height = 180 }: { width?: number; height?: number }) {
  const cities = [
    { l: "İST", x: 0.18, y: 0.28, v: 0.95 },
    { l: "ANK", x: 0.45, y: 0.42, v: 0.7 },
    { l: "İZM", x: 0.1, y: 0.55, v: 0.78 },
    { l: "BUR", x: 0.27, y: 0.36, v: 0.5 },
    { l: "ANT", x: 0.4, y: 0.72, v: 0.45 },
    { l: "ADA", x: 0.6, y: 0.65, v: 0.4 },
    { l: "TRA", x: 0.78, y: 0.3, v: 0.3 },
    { l: "VAN", x: 0.9, y: 0.55, v: 0.22 },
    { l: "GAZ", x: 0.7, y: 0.7, v: 0.35 },
  ];
  return (
    <svg width={width} height={height} className="block">
      <rect x={0} y={0} width={width} height={height} fill="#0f172a" rx={6} />
      {/* kaba kara parçası */}
      <path
        d="M 20 60 Q 60 40 120 50 Q 200 45 260 55 Q 285 70 270 100 Q 230 130 160 125 Q 90 130 40 110 Q 18 90 20 60 Z"
        fill="rgba(239,68,68,0.06)"
        stroke="rgba(239,68,68,0.25)"
        strokeWidth={1}
      />
      {cities.map((c) => {
        const cx = c.x * width;
        const cy = c.y * height;
        const r = 6 + c.v * 14;
        return (
          <g key={c.l}>
            <circle cx={cx} cy={cy} r={r} fill={`rgba(239,68,68,${0.25 + c.v * 0.6})`} />
            <text x={cx} y={cy + 3} fill="#fee2e2" fontSize={8} textAnchor="middle" fontWeight={700}>
              {c.l}
            </text>
          </g>
        );
      })}
      <text x={width / 2} y={16} fill="#fca5a5" fontSize={10} textAnchor="middle">
        ile göre yoğunluk (kabarcık)
      </text>
    </svg>
  );
}

/* pandas dtype dönüşümü kod bloğu */
function DtypeCodeBlock() {
  return (
    <div className="vg-code">
      <div><span className="cm"># Sütun türlerini doğru tanımla</span></div>
      <div><span className="kw">import</span> pandas <span className="kw">as</span> pd</div>
      <div className="mt-2">df <span className="op">=</span> pd.<span className="fn">read_csv</span>(<span className="str">&quot;satislar.csv&quot;</span>)</div>
      <div className="mt-2"><span className="cm"># Kategorik</span></div>
      <div>df[<span className="str">&quot;sehir&quot;</span>] <span className="op">=</span> df[<span className="str">&quot;sehir&quot;</span>].<span className="fn">astype</span>(<span className="str">&quot;category&quot;</span>)</div>
      <div className="mt-2"><span className="cm"># Zaman serisi</span></div>
      <div>df[<span className="str">&quot;tarih&quot;</span>] <span className="op">=</span> pd.<span className="fn">to_datetime</span>(df[<span className="str">&quot;tarih&quot;</span>])</div>
      <div className="mt-2"><span className="cm"># Sayısal (binlik ayraç temizliği)</span></div>
      <div>df[<span className="str">&quot;fiyat&quot;</span>] <span className="op">=</span> pd.<span className="fn">to_numeric</span>(df[<span className="str">&quot;fiyat&quot;</span>])</div>
      <div className="mt-2">df.<span className="fn">dtypes</span></div>
      <div className="cm">{"# sehir->category  adet->int64  tarih->datetime64  fiyat->float64"}</div>
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
        <Eyebrow>BVA 2107 · 4. Hafta</Eyebrow>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.02]">
          <span className="vg-shimmer">Veri Türleri</span>
        </h1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Doğru grafik, doğru veri türünü tanımakla başlar.
        </Sub>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { name: "Kategorik", desc: "İsimler, sınıflar", icon: Tag, accent: "#f59e0b" },
            { name: "Sayısal", desc: "Ölçülebilir miktar", icon: Hash, accent: "#06b6d4" },
            { name: "Zaman serisi", desc: "Tarih · sıralı", icon: Clock, accent: "#a855f7" },
            { name: "Coğrafi", desc: "Konum · enlem/boylam", icon: MapIcon, accent: "#22c55e" },
          ].map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="vg-card rounded-xl p-4"
            >
              <div
                className="w-10 h-10 mx-auto mb-2 rounded-md flex items-center justify-center"
                style={{ background: `${t.accent}18`, border: `1px solid ${t.accent}50` }}
              >
                <t.icon className="w-5 h-5" style={{ color: t.accent }} />
              </div>
              <div className="text-white font-semibold text-sm">{t.name}</div>
              <div className="text-[11px] text-gray-400 mt-1">{t.desc}</div>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-xs font-mono text-gray-500">
          Manisa CBÜ MYO · Bilgisayar Programcılığı · 2025-2026 Bahar
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. KÖPRÜ · GEÇEN HAFTADAN ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 3. haftadan 4. haftaya</Eyebrow>
      <H2>Önce aracı kurduk; şimdi araca ne vereceğimizi öğreniyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta Tableau&apos;da ilk panomuzu kurduk ve veriyi içeri aktardık. Ama her sütun aynı
        değil: Tableau bir sütunu <span className="text-[#f59e0b]">mavi (kesikli/boyut)</span> mi
        yoksa <span className="text-[#06b6d4]">yeşil (sürekli/ölçü)</span> mi sayacağına veri
        türüne göre karar verir. Bu hafta o türleri tanıyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { icon: Database, t: "Veri içeri girdi", d: "CSV/Excel bağlandı, sütunlar tanındı.", accent: "#ef4444" },
          { icon: Layers, t: "Tür kararı şart", d: "Yanlış tür = yanlış grafik = yanlış mesaj.", accent: "#f59e0b" },
          { icon: BarChart3, t: "Tür → grafik eşleşmesi", d: "Bu haftanın asıl hedefi.", accent: "#22c55e" },
        ].map((c, i) => (
          <motion.div
            key={c.t}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="vg-card rounded-xl p-5"
          >
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center mb-3"
              style={{ background: `${c.accent}18`, border: `1px solid ${c.accent}50` }}
            >
              <c.icon className="w-5 h-5" style={{ color: c.accent }} />
            </div>
            <div className="text-white font-semibold text-base mb-1">{c.t}</div>
            <div className="text-sm text-gray-400 leading-relaxed">{c.d}</div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 3. BU DERSIN AKIŞI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Dört tür · dört dil · dört grafik</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce iki büyük aileyi (kategorik / sayısal) ayırıyoruz; sonra zamanın ve konumun neden
        ayrı muamele gerektirdiğini görüyoruz. Sonunda küçük bir sınıflama alıştırması.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            range: "01",
            title: "Kategorik & Sayısal",
            items: ["Nominal · ordinal", "Kesikli · sürekli", "Ölçek seviyeleri (NOIR)"],
            icon: Layers,
            accent: "#f59e0b",
          },
          {
            range: "02",
            title: "Zaman Serisi",
            items: ["Tarih/saat türü", "Trend · mevsimsellik", "Sıralı eksende kurallar"],
            icon: Clock,
            accent: "#a855f7",
          },
          {
            range: "03",
            title: "Coğrafi Veri",
            items: ["Nokta · alan (choropleth)", "Enlem/boylam, geokodlama", "Yaygın hatalar"],
            icon: MapIcon,
            accent: "#22c55e",
          },
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
                <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: g.accent }}>
                  Bölüm {g.range}
                </div>
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

  /* ───── 4. TYPED DATAFRAME — AYNI TABLO, FARKLI TÜRLER ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bir tablo · birçok tür</Eyebrow>
      <H2 className="mb-2">Her sütun farklı bir dil konuşur</H2>
      <Sub className="max-w-3xl mb-6">
        Tek bir satış tablosunda dört türün de aynı anda bulunması olağandır. Sütun başlığının
        altındaki etiket, o sütunun türünü ve dolayısıyla onu nasıl çizeceğimizi belirler.
      </Sub>
      <TypedDataFrame />
    </SlideShell>
  ),

  /* ───── 5. BÖLÜM 1 — KATEGORİK & SAYISAL ───── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="Kategorik &amp; Sayısal"
      subtitle="İki büyük aile. Birini sayamazsınız, diğerini sıralayabilir ve ölçebilirsiniz. Tüm grafik seçiminin temeli bu ayrımdır."
      bgGradient="linear-gradient(135deg, #f59e0b, #b45309)"
      shadow="0 25px 60px -15px rgba(245, 158, 11, 0.6)"
      icon={<Layers className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 6. KATEGORİK: NOMİNAL vs ORDİNAL ───── */
  () => (
    <SlideShell>
      <Eyebrow>Kategorik veri</Eyebrow>
      <H2>Nominal mi, ordinal mi?</H2>
      <Sub className="mt-3 max-w-3xl">
        Kategorik veri sınıflara ayrılır. Tek soru: bu sınıfların doğal bir sırası var mı? Cevap
        grafiğin eksen sırasını değiştirir.
      </Sub>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="vg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fcd34d]">
            <Tag className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Nominal · sırasız</span>
          </div>
          <p className="text-sm text-gray-300 mb-3">
            Sınıflar arasında doğal sıra yok. Yalnızca eşitlik/farklılık var.
          </p>
          <ul className="space-y-1.5 text-sm text-gray-400">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] flex-shrink-0" />Şehir: İzmir, Ankara, Bursa</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] flex-shrink-0" />Ürün kategorisi, cinsiyet, kan grubu</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] flex-shrink-0" />Sıralama serbest → değere göre sırala</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="vg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <ListOrdered className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Ordinal · sıralı</span>
          </div>
          <p className="text-sm text-gray-300 mb-3">
            Sınıfların anlamlı bir sırası var, ama aralar eşit değil.
          </p>
          <ul className="space-y-1.5 text-sm text-gray-400">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Memnuniyet: Düşük &lt; Orta &lt; Yüksek</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Eğitim düzeyi, beden (S/M/L), harf notu</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Sırayı koru → doğal sıraya göre diz</li>
          </ul>
        </motion.div>
      </div>
      <div className="mt-5 vg-card rounded-lg p-3 text-xs text-gray-300 flex items-start gap-2 max-w-4xl">
        <AlertTriangle className="w-4 h-4 text-[#f59e0b] mt-0.5 flex-shrink-0" />
        <span>
          Sık hata: ordinal sırayı bozup alfabetik dizmek. &quot;Yüksek, Düşük, Orta&quot; sırası
          okuyucuyu yanıltır — anlamı taşıyan, doğal sıradır.
        </span>
      </div>
    </SlideShell>
  ),

  /* ───── 7. SAYISAL: KESİKLİ vs SÜREKLİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Sayısal veri</Eyebrow>
      <H2>Kesikli mi, sürekli mi?</H2>
      <Sub className="mt-3 max-w-3xl">
        Sayısal (nicel) veri ölçülebilir ve üzerinde aritmetik yapılabilir. İkiye ayrılır.
      </Sub>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="vg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#67e8f9]">
            <Hash className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Kesikli (discrete)</span>
          </div>
          <p className="text-sm text-gray-300 mb-3">
            Sayılabilir, genelde tam sayı. Aradaki değerler anlamsız.
          </p>
          <ul className="space-y-1.5 text-sm text-gray-400">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Sipariş adedi, öğrenci sayısı</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />2,5 sipariş olmaz</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Tipik grafik: bar / sütun</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="vg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#67e8f9]">
            <Ruler className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Sürekli (continuous)</span>
          </div>
          <p className="text-sm text-gray-300 mb-3">
            Ölçülen, herhangi bir ara değeri alabilen büyüklük.
          </p>
          <ul className="space-y-1.5 text-sm text-gray-400">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Fiyat, sıcaklık, ağırlık, süre</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />18.499,90 ₺ gibi ondalıklı</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Tipik grafik: histogram / çizgi / dağılım</li>
          </ul>
        </motion.div>
      </div>
      <p className="mt-5 text-xs text-gray-500 max-w-3xl">
        Sürekli veriyi gruplara bölersek (örn. 0-10, 10-20 yaş aralığı) onu yapay olarak{" "}
        <span className="text-[#06b6d4] font-semibold">kategorik</span> hale getirmiş oluruz —
        buna &quot;binning&quot; denir.
      </p>
    </SlideShell>
  ),

  /* ───── 8. ÖLÇEK SEVİYELERİ — NOIR TABLOSU ───── */
  () => (
    <SlideShell>
      <Eyebrow>Stevens · ölçek seviyeleri</Eyebrow>
      <H2>Dört seviye: nominal → ordinal → aralık → oran</H2>
      <Sub className="mt-3 max-w-3xl">
        Her seviye bir öncekinin üstüne bir matematiksel hak ekler. Hangi işlemin anlamlı
        olduğunu, dolayısıyla hangi özetin (mod, medyan, ortalama) doğru olduğunu belirler.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 vg-card rounded-xl p-1"
      >
        <table className="vg-table">
          <thead>
            <tr>
              <th style={{ width: "16%" }}>Seviye</th>
              <th style={{ width: "28%" }}>İzin verilen işlem</th>
              <th style={{ width: "26%" }}>Örnek</th>
              <th>Anlamlı özet</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold text-white">Nominal</td>
              <td>= , ≠ (eşitlik)</td>
              <td>Şehir, ürün, renk</td>
              <td>Mod (en sık)</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Ordinal</td>
              <td>&lt; , &gt; (sıralama)</td>
              <td>Memnuniyet, harf notu</td>
              <td>Medyan, mod</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Aralık (interval)</td>
              <td>+ , − (fark anlamlı)</td>
              <td>Sıcaklık (°C), takvim yılı</td>
              <td>Ortalama; mutlak sıfır yok</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Oran (ratio)</td>
              <td>× , ÷ (oran anlamlı)</td>
              <td>Fiyat, ağırlık, süre</td>
              <td>Tümü; gerçek sıfır var</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
      <div className="mt-4 text-[11px] text-gray-500 font-mono">
        Not: 20°C, 10°C&apos;nin &quot;iki katı sıcak&quot; değildir (aralık ölçeği) · ama 20 ₺,
        10 ₺&apos;nin iki katıdır (oran ölçeği).
      </div>
    </SlideShell>
  ),

  /* ───── 9. KATEGORİK vs SAYISAL — GRAFİK EŞLEŞMESİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Tür → grafik</Eyebrow>
      <H2>İki aile, iki tipik grafik</H2>
      <Sub className="mt-3 max-w-3xl">
        Kategorileri karşılaştırırken bar; bir sayısal değişkenin dağılımına bakarken histogram.
        Aynı veriyi yanlış grafikle göstermek mesajı bozar.
      </Sub>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="vg-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-5 h-5 text-[#f59e0b]" />
            <span className="text-sm font-semibold text-white">Kategorik → Bar</span>
          </div>
          <div className="vg-chart-frame">
            <CategoricalBar />
          </div>
          <p className="mt-3 text-[11px] text-gray-400 leading-snug">
            Kategoriler birbirinden ayrık; barlar arasında boşluk olur. Değere göre sıralamak
            okumayı kolaylaştırır.
          </p>
        </div>
        <div className="vg-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Hash className="w-5 h-5 text-[#06b6d4]" />
            <span className="text-sm font-semibold text-white">Sayısal → Histogram</span>
          </div>
          <div className="vg-chart-frame">
            <NumericHistogram />
          </div>
          <p className="mt-3 text-[11px] text-gray-400 leading-snug">
            Sürekli değer aralıklara (bin) bölünür; çubuklar bitişiktir çünkü eksen kesintisiz bir
            sayı doğrusudur.
          </p>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 10. BÖLÜM 2 — ZAMAN SERİSİ ───── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Zaman Serisi"
      subtitle="Sıralı, eşit aralıklı zaman damgalarına bağlı veri. Sıranın kendisi bilgi taşır; bu yüzden ayrı bir tür gibi davranır."
      bgGradient="linear-gradient(135deg, #a855f7, #6d28d9)"
      shadow="0 25px 60px -15px rgba(168, 85, 247, 0.6)"
      icon={<Clock className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 11. ZAMAN SERİSİ NEDİR ───── */
  () => (
    <SlideShell>
      <Eyebrow>Zaman serisi · tanım</Eyebrow>
      <H2>Bir tarih sütunu her şeyi değiştirir</H2>
      <Sub className="mt-3 max-w-3xl">
        Zaman serisi, bir değişkenin zaman içindeki ölçümleridir. Tarih ekseni sıralı ve eşit
        aralıklı olduğundan, noktaları birleştirmek (çizgi) anlamlıdır — kategorik veride değildir.
      </Sub>
      <div className="mt-8 grid grid-cols-3 gap-6 items-start">
        <div className="col-span-2 vg-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-[#a855f7]" />
            <span className="text-sm font-semibold text-white">Aylık satış · çizgi grafik</span>
          </div>
          <div className="vg-chart-frame">
            <TimeSeriesLine width={460} height={200} />
          </div>
        </div>
        <div className="space-y-3">
          {[
            { icon: TrendingUp, t: "Trend", d: "Uzun vadeli yön (artış/azalış).", accent: "#a855f7" },
            { icon: Clock, t: "Mevsimsellik", d: "Düzenli tekrar eden örüntü.", accent: "#d8b4fe" },
            { icon: Calendar, t: "Düzgün aralık", d: "Eksik tarihler boşluk bırakır.", accent: "#a855f7" },
          ].map((c) => (
            <div key={c.t} className="vg-card rounded-lg p-3 flex gap-3">
              <c.icon className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: c.accent }} />
              <div>
                <div className="text-sm font-semibold text-white">{c.t}</div>
                <div className="text-[11px] text-gray-400 leading-snug">{c.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 12. ZAMAN SERİSİ KURALLARI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Zaman serisi · kurallar</Eyebrow>
      <H2>Üç altın kural, üç klasik hata</H2>
      <Sub className="mt-3 max-w-3xl">
        Zaman ekseni sıradan bir kategori değildir. Onu kategori gibi ele almak yaygın hataların
        kaynağıdır.
      </Sub>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            ok: "Zaman daima X ekseninde, soldan sağa akar.",
            bad: "Tarihi alfabetik veya değere göre sıralamak.",
          },
          {
            ok: "Eşit aralıkları koru; eksik dönemi boşlukla göster.",
            bad: "Veri yokken iki noktayı düz çizgiyle birleştirmek.",
          },
          {
            ok: "Çok seri varsa renkle ayır, eğimi karşılaştır.",
            bad: "Onlarca seriyi tek grafiğe yığıp &apos;spagetti&apos; yapmak.",
          },
        ].map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="vg-card rounded-xl p-5"
          >
            <div className="flex items-start gap-2 mb-3 text-emerald-300">
              <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-400" />
              <span className="text-sm">{c.ok}</span>
            </div>
            <div
              className="flex items-start gap-2 text-rose-300 border-t border-white/5 pt-3"
            >
              <X className="w-4 h-4 mt-0.5 flex-shrink-0 text-rose-400" />
              <span className="text-sm" dangerouslySetInnerHTML={{ __html: c.bad }} />
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-5 vg-card rounded-lg p-3 text-xs text-gray-300 flex items-start gap-2 max-w-4xl">
        <AlertTriangle className="w-4 h-4 text-[#a855f7] mt-0.5 flex-shrink-0" />
        <span>
          Tableau ve pandas, tarih sütununu <span className="text-[#d8b4fe] font-mono">datetime</span>{" "}
          türüne çevirmezseniz onu metin sanır ve &quot;01.10&quot; ile &quot;1.2&quot; gibi
          değerleri yanlış sıralar.
        </span>
      </div>
    </SlideShell>
  ),

  /* ───── 13. BÖLÜM 3 — COĞRAFİ ───── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Coğrafi Veri"
      subtitle="Bir konuma bağlı veri. &quot;Nerede?&quot; sorusunun cevabı bir haritada en hızlı okunur — ama harita kolayca yanıltabilir."
      bgGradient="linear-gradient(135deg, #22c55e, #15803d)"
      shadow="0 25px 60px -15px rgba(34, 197, 94, 0.6)"
      icon={<MapIcon className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 14. COĞRAFİ VERİ TÜRLERİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Coğrafi veri</Eyebrow>
      <H2 className="mb-2">Konum nasıl saklanır, nasıl çizilir?</H2>
      <Sub className="max-w-3xl mb-6">
        Coğrafi veri ya bir noktadır (enlem/boylam) ya da bir alandır (il, ülke sınırı). Saklama
        biçimi, kullanılacak harita türünü belirler.
      </Sub>
      <div className="grid grid-cols-3 gap-6 items-start">
        <div className="col-span-1 space-y-3">
          {[
            { icon: MapPin, t: "Nokta verisi", d: "Tek tek konumlar: mağaza, olay, sensör. Enlem/boylam çifti.", accent: "#22c55e" },
            { icon: Globe, t: "Alan verisi", d: "Bölgelere göre toplulaştırma: ile/ülkeye göre satış.", accent: "#86efac" },
            { icon: MapIcon, t: "Geokodlama", d: "Adres/il adını koordinata çevirme. Tableau çoğu il adını tanır.", accent: "#34d399" },
          ].map((c) => (
            <div key={c.t} className="vg-card rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <c.icon className="w-4 h-4" style={{ color: c.accent }} />
                <span className="text-sm font-semibold text-white">{c.t}</span>
              </div>
              <div className="text-[11px] text-gray-400 leading-snug">{c.d}</div>
            </div>
          ))}
        </div>
        <div className="col-span-2 vg-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-5 h-5 text-[#22c55e]" />
            <span className="text-sm font-semibold text-white">
              İllere göre yoğunluk · sembol (kabarcık) haritası
            </span>
          </div>
          <div className="vg-chart-frame">
            <GeoChoropleth width={460} height={220} />
          </div>
          <p className="mt-3 text-[11px] text-gray-400 leading-snug">
            Kabarcık boyutu değeri taşır. Geniş bir ilin büyük görünmesi onu daha &quot;önemli&quot;
            yapmaz — bu, choropleth&apos;in klasik tuzağıdır.
          </p>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 15. COĞRAFİ HATALAR ───── */
  () => (
    <SlideShell>
      <Eyebrow>Harita · yaygın hatalar</Eyebrow>
      <H2>Harita güzeldir; ama her zaman dürüst değildir</H2>
      <Sub className="mt-3 max-w-3xl">
        Coğrafi görselleştirmede en sık karşılaşılan üç yanıltma. Bunları bilmek hem üretirken hem
        okurken işe yarar.
      </Sub>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: MapIcon,
            t: "Alan ≠ önem",
            d: "Geniş ama az nüfuslu bir bölge, küçük bir metropolden daha çok yer kaplar ve gözü yanıltır.",
            fix: "Çözüm: nüfusa böl (oranla) ya da kabarcık kullan.",
            accent: "#f87171",
          },
          {
            icon: Hash,
            t: "Ham sayı vs oran",
            d: "Büyük şehirde her şey daha çoktur. Ham toplam neredeyse hep nüfus haritası çıkarır.",
            fix: "Çözüm: kişi başına / 100 binde gibi normalize et.",
            accent: "#fbbf24",
          },
          {
            icon: BarChart3,
            t: "Renk basamağı",
            d: "Eşit aralık mı, yüzdelik dilim mi? Yanlış basamaklama tüm deseni değiştirir.",
            fix: "Çözüm: dağılıma uygun ölçek ve net lejant.",
            accent: "#22c55e",
          },
        ].map((c, i) => (
          <motion.div
            key={c.t}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="vg-card rounded-xl p-5"
          >
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center mb-3"
              style={{ background: `${c.accent}18`, border: `1px solid ${c.accent}55` }}
            >
              <c.icon className="w-5 h-5" style={{ color: c.accent }} />
            </div>
            <div className="text-white font-semibold text-base mb-1">{c.t}</div>
            <p className="text-sm text-gray-400 leading-relaxed mb-3">{c.d}</p>
            <p className="text-[11px] text-emerald-300 border-t border-white/5 pt-2">{c.fix}</p>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 16. KARAR TABLOSU — TÜR → GRAFİK ───── */
  () => (
    <SlideShell>
      <Eyebrow>Özet · tür → grafik karar tablosu</Eyebrow>
      <H2>Hangi tür · hangi grafik · hangi araç ipucu?</H2>
      <Sub className="mt-3 max-w-3xl">
        Bu tabloyu bu hafta cebinizde taşıyın. Önce sütunun türünü belirleyin, sonra satırı izleyin.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 vg-card rounded-xl p-1"
      >
        <table className="vg-table">
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Veri türü</th>
              <th style={{ width: "26%" }}>Tipik soru</th>
              <th style={{ width: "28%" }}>Önerilen grafik</th>
              <th>Dikkat</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="vg-dtype vg-dtype-cat">Kategorik</span></td>
              <td>Hangi grup daha çok?</td>
              <td>Bar / yatay bar</td>
              <td>Değere göre sırala (ordinal hariç)</td>
            </tr>
            <tr>
              <td><span className="vg-dtype vg-dtype-num">Sayısal · tek</span></td>
              <td>Dağılım nasıl?</td>
              <td>Histogram / kutu grafiği</td>
              <td>Bin sayısı deseni değiştirir</td>
            </tr>
            <tr>
              <td><span className="vg-dtype vg-dtype-num">Sayısal · ikili</span></td>
              <td>İlişki var mı?</td>
              <td>Dağılım (scatter)</td>
              <td>Korelasyon ≠ nedensellik</td>
            </tr>
            <tr>
              <td><span className="vg-dtype vg-dtype-time">Zaman serisi</span></td>
              <td>Zamanla nasıl değişti?</td>
              <td>Çizgi grafik</td>
              <td>Eşit aralık, X&apos;te zaman</td>
            </tr>
            <tr>
              <td><span className="vg-dtype vg-dtype-geo">Coğrafi</span></td>
              <td>Nerede yoğun?</td>
              <td>Choropleth / sembol haritası</td>
              <td>Oranla, ham sayı kullanma</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 17. KOD — pandas dtype ───── */
  () => (
    <SlideShell>
      <Eyebrow>Uygulama · pandas dtypes</Eyebrow>
      <H2>Türü doğru atamak, grafiğin yarısıdır</H2>
      <Sub className="mt-3 max-w-3xl">
        Araç türü yanlış okursa grafik de yanlış çıkar. pandas&apos;ta her sütunu doğru türe
        çevirmek birkaç satır; Tableau&apos;da ise sütunu sağ tıklayıp veri türünü değiştirmek.
      </Sub>
      <div className="mt-8 grid grid-cols-2 gap-6 items-start">
        <DtypeCodeBlock />
        <div className="space-y-3">
          {[
            { dt: "category", cls: "vg-dtype-cat", d: "Kategorik. Bellek tasarrufu sağlar, sıralı (ordered) yapılabilir." },
            { dt: "int64 / float64", cls: "vg-dtype-num", d: "Sayısal. Aritmetik ve istatistik buna uygulanır." },
            { dt: "datetime64", cls: "vg-dtype-time", d: "Zaman. Yıl/ay/gün ayrıştırma ve yeniden örnekleme açılır." },
            { dt: "float (lat/lon)", cls: "vg-dtype-geo", d: "Coğrafi. Enlem/boylam çiftiyle harita üzerinde konumlanır." },
          ].map((r) => (
            <div key={r.dt} className="vg-card rounded-lg p-3 flex items-start gap-3">
              <span className={`vg-dtype ${r.cls} mt-0.5 flex-shrink-0`}>{r.dt}</span>
              <span className="text-[12px] text-gray-300 leading-snug">{r.d}</span>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 18. UYGULAMALI ALIŞTIRMA ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı alıştırma</Eyebrow>
      <H2>Bir veri setini sınıfla, dört grafik çiz</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta Tableau&apos;ya aktardığınız veri setiyle çalışın (yoksa örnek
        &quot;satislar.csv&quot;). Sonraki derse bu dördünü yapmış ve ekran görüntülerini almış gelin.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Table2, title: "Her sütunu etiketle", desc: "Sütunları kategorik / sayısal / zaman / coğrafi diye işaretle; ordinal olanı not et.", accent: "#f59e0b" },
          { icon: Clock, title: "Tarih sütununu düzelt", desc: "Tableau&apos;da/pandas&apos;ta tarihi datetime türüne çevir, yıl-ay olarak parçala.", accent: "#a855f7" },
          { icon: BarChart3, title: "Dört grafiği üret", desc: "Kategorik→bar, sayısal→histogram, zaman→çizgi, coğrafi→harita. Her birinde tek bir mesaj.", accent: "#22c55e" },
          { icon: Megaphone, title: "Bir yanlış eşleşme bul", desc: "Kasıtlı olarak yanlış grafik (örn. kategoriye çizgi) yap, neden yanıltıcı olduğunu 2 cümlede yaz.", accent: "#06b6d4" },
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
                <span className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-[10px] text-gray-500 font-mono">
                  {i + 1}
                </span>
                <h3 className="text-base font-semibold text-white" dangerouslySetInnerHTML={{ __html: t.title }} />
              </div>
              <p className="text-sm text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.desc }} />
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 19. SIRADAKİ HAFTA ───── */
  () => (
    <SlideShell>
      <Eyebrow>Sıradaki Hafta · H5</Eyebrow>
      <H1>
        <span className="vg-shimmer-amber">Veri Hazırlama (ETL)</span>
      </H1>
      <Sub className="mt-6 max-w-3xl">
        Tür ayrımını öğrendik; ama gerçek veri kirlidir. 5. hafta veriyi temizliyoruz: eksik
        değerler, biçim düzeltme, tür dönüştürme ve birden çok kaynağı birleştirme.
      </Sub>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { i: Database, t: "Extract — çek" },
          { i: Code2, t: "Transform — dönüştür" },
          { i: Table2, t: "Load — yükle" },
          { i: Type, t: "Tür dönüşümü" },
          { i: X, t: "Eksik değer" },
          { i: Layers, t: "Birleştirme (join)" },
          { i: LineChart, t: "Pivot / unpivot" },
          { i: Target, t: "Veri kalitesi" },
        ].map((tool, i) => (
          <motion.div
            key={tool.t}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="vg-card rounded-lg p-3 flex items-center gap-3"
          >
            <tool.i className="w-5 h-5 text-[#f59e0b]" />
            <span className="text-sm text-gray-200">{tool.t}</span>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 vg-card rounded-lg p-4 flex items-center gap-3">
        <Megaphone className="w-5 h-5 text-[#ef4444]" />
        <span className="text-sm text-gray-300">
          Bu haftanın alıştırmasında türleri etiketlemeyenler, gelecek hafta ETL adımlarında
          nereye dokunacağını bulmakta zorlanır.
        </span>
      </div>
    </SlideShell>
  ),

  /* ───── 20. KAPANIŞ ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>Hafta 4 · Tamamlandı</Eyebrow>
        <H1>
          <span className="vg-shimmer">Önce türü tanı, sonra çiz.</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Kategorik, sayısal, zaman serisi ve coğrafi — dört tür, dört farklı grafik dili. Doğru
          eşleşme, dürüst ve okunaklı görselin ilk adımıdır.
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
            <Target className="w-5 h-5 text-[#ef4444] mx-auto mb-2" />
            <div className="text-xs text-gray-400">Teslim</div>
            <div className="text-sm font-semibold text-white mt-1">4 grafik + tür etiketleri</div>
          </div>
        </div>
        <div className="mt-12 flex items-center justify-center gap-3 text-xs font-mono text-gray-500">
          <GraduationCap className="w-4 h-4" />
          <span>MCBÜ MYO · BVA 2107 · Veri Görselleştirme · 2025-2026 Bahar</span>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-[11px] font-mono text-gray-600">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sonraki: Hafta 5 · Veri Hazırlama (ETL)</span>
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
          BVA 2107 · 4. Hafta · Veri Türleri
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
