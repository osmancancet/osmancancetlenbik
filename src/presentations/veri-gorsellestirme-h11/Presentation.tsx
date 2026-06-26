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
  PieChart,
  BarChart3,
  Palette,
  Target,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  X,
  Layers,
  Eye,
  Calendar,
  Code2,
  Gauge,
  AlertTriangle,
  ListChecks,
  Ban,
  CircleDot,
  Percent,
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

/* ============================================================
   TOPIC MOCKUPS — pasta & halka grafikleri
   ============================================================ */

type Slice = { label: string; value: number; color: string };

const polar = (cx: number, cy: number, r: number, ang: number) => ({
  x: cx + r * Math.cos(ang),
  y: cy + r * Math.sin(ang),
});

/** Tam pasta veya (innerR > 0) halka grafiği çizen yardımcı. */
function PieChartSvg({
  slices,
  innerR = 0,
  size = 200,
  showLabels = false,
}: {
  slices: Slice[];
  innerR?: number;
  size?: number;
  showLabels?: boolean;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 8;
  const total = slices.reduce((a, s) => a + s.value, 0);
  let acc = -Math.PI / 2;

  return (
    <svg width={size} height={size} className="block mx-auto">
      {slices.map((s, i) => {
        const ang = (s.value / total) * Math.PI * 2;
        const start = acc;
        const end = acc + ang;
        acc = end;
        const large = ang > Math.PI ? 1 : 0;
        const o1 = polar(cx, cy, r, start);
        const o2 = polar(cx, cy, r, end);

        let d: string;
        if (innerR > 0) {
          const i1 = polar(cx, cy, innerR, start);
          const i2 = polar(cx, cy, innerR, end);
          d = `M ${o1.x} ${o1.y} A ${r} ${r} 0 ${large} 1 ${o2.x} ${o2.y} L ${i2.x} ${i2.y} A ${innerR} ${innerR} 0 ${large} 0 ${i1.x} ${i1.y} Z`;
        } else {
          d = `M ${cx} ${cy} L ${o1.x} ${o1.y} A ${r} ${r} 0 ${large} 1 ${o2.x} ${o2.y} Z`;
        }

        const mid = (start + end) / 2;
        const lr = innerR > 0 ? (r + innerR) / 2 : r * 0.62;
        const lp = polar(cx, cy, lr, mid);

        return (
          <g key={i}>
            <path d={d} fill={s.color} stroke="#0a0a0a" strokeWidth={1.5} />
            {showLabels && (
              <text
                x={lp.x}
                y={lp.y}
                fill="#0a0a0a"
                fontSize={10}
                fontWeight={800}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {Math.round((s.value / total) * 100)}%
              </text>
            )}
          </g>
        );
      })}
      {innerR > 0 && (
        <text
          x={cx}
          y={cy}
          fill="#e5e7eb"
          fontSize={13}
          fontWeight={700}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {total}
        </text>
      )}
    </svg>
  );
}

function Legend({ slices, asPercent = true }: { slices: Slice[]; asPercent?: boolean }) {
  const total = slices.reduce((a, s) => a + s.value, 0);
  return (
    <div className="space-y-0.5">
      {slices.map((s) => (
        <div key={s.label} className="vg-legend-row">
          <span className="vg-legend-swatch" style={{ background: s.color }} />
          <span className="flex-1">{s.label}</span>
          <span className="font-mono text-gray-400">
            {asPercent ? `${Math.round((s.value / total) * 100)}%` : s.value}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Sıralanmış yatay bar — pastaya alternatif. */
function HBar({
  slices,
  width = 240,
  asPercent = true,
}: {
  slices: Slice[];
  width?: number;
  asPercent?: boolean;
}) {
  const total = slices.reduce((a, s) => a + s.value, 0);
  const sorted = [...slices].sort((a, b) => b.value - a.value);
  const max = Math.max(...sorted.map((s) => s.value));
  const labelW = 64;
  const valW = 38;
  const barAreaW = width - labelW - valW;
  const bh = 18;
  const gap = 8;
  const height = sorted.length * (bh + gap) + 6;
  return (
    <svg width={width} height={height} className="block">
      {sorted.map((s, i) => {
        const w = (barAreaW * s.value) / max;
        const y = 3 + i * (bh + gap);
        return (
          <g key={s.label}>
            <text x={labelW - 6} y={y + bh / 2 + 3} fill="#cbd5e1" fontSize={10} textAnchor="end">
              {s.label}
            </text>
            <rect x={labelW} y={y} width={w} height={bh} fill={s.color} rx={2} />
            <text x={labelW + w + 5} y={y + bh / 2 + 3} fill="#e5e7eb" fontSize={10}>
              {asPercent ? `${Math.round((s.value / total) * 100)}%` : s.value}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** Bir pastayı bilerek kötü kullanan örnek: çok dilim + yakın değerler. */
function TooManySlicesPie() {
  const slices: Slice[] = [
    { label: "A", value: 14, color: "#ef4444" },
    { label: "B", value: 13, color: "#f59e0b" },
    { label: "C", value: 13, color: "#fbbf24" },
    { label: "D", value: 12, color: "#a78bfa" },
    { label: "E", value: 12, color: "#60a5fa" },
    { label: "F", value: 11, color: "#34d399" },
    { label: "G", value: 9, color: "#f472b6" },
    { label: "H", value: 8, color: "#22d3ee" },
    { label: "I", value: 8, color: "#fca5a5" },
  ];
  return <PieChartSvg slices={slices} size={190} />;
}

/* ============================================================
   SLIDES
   ============================================================ */

const PART_PIE: Slice[] = [
  { label: "Mobil", value: 58, color: "#ef4444" },
  { label: "Masaüstü", value: 27, color: "#f59e0b" },
  { label: "Tablet", value: 15, color: "#fbbf24" },
];

const DONUT_PIE: Slice[] = [
  { label: "Tamamlandı", value: 64, color: "#22c55e" },
  { label: "Devam eden", value: 23, color: "#f59e0b" },
  { label: "Bekleyen", value: 13, color: "#ef4444" },
];

const slides: Array<(active: boolean) => ReactNode> = [
  /* ───── 1. Kapak ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2107 · 11. Hafta</Eyebrow>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.02]">
          <span className="vg-shimmer">Pasta &amp; Halka Grafikleri</span>
        </h1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Parça-bütün ilişkisini gösteren grafikleri doğru tasarlamak — ve ne zaman
          tamamen kaçınmak gerektiği.
        </Sub>
        <div className="mt-12 grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { name: "Pasta", desc: "Tek bütünün payları", icon: PieChart },
            { name: "Halka", desc: "Boş merkezli pasta (donut)", icon: CircleDot },
            { name: "Alternatif", desc: "Bar · sıralanmış kıyas", icon: BarChart3 },
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
          Manisa CBÜ MYO · Bilgisayar Programcılığı · 2025-2026 Bahar
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. Geçen haftadan köprü ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 10. haftadan 11. haftaya</Eyebrow>
      <H2>Geçen hafta &quot;trend&quot;, bu hafta &quot;pay&quot;</H2>
      <Sub className="mt-3 max-w-3xl">
        Önceki haftalarda zamansal değişimi (line) ve kategorik kıyası (bar) işledik. Bu hafta
        farklı bir soruya odaklanıyoruz: bir bütün, parçalarına nasıl bölünüyor? Pasta ve halka
        grafikleri tam da bunun içindir — ama dar bir kullanım alanı vardır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            icon: Percent,
            t: "Bu haftanın sorusu",
            d: "&quot;Bütünün ne kadarı X?&quot; — parça-bütün (part-to-whole) ilişkisi.",
            a: "#ef4444",
          },
          {
            icon: Target,
            t: "Hedef",
            d: "Pasta/halkayı okunur tasarlamak ve sınırlarını fark etmek.",
            a: "#f59e0b",
          },
          {
            icon: Ban,
            t: "Asıl ders",
            d: "Çoğu durumda daha iyi bir alternatif vardır: sıralanmış bar.",
            a: "#ef4444",
          },
        ].map((c, i) => (
          <motion.div
            key={c.t}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="vg-card rounded-xl p-5"
          >
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center mb-3"
              style={{ background: `${c.a}18`, border: `1px solid ${c.a}55` }}
            >
              <c.icon className="w-5 h-5" style={{ color: c.a }} />
            </div>
            <div className="text-white font-semibold text-sm mb-1">{c.t}</div>
            <div
              className="text-[12px] text-gray-400 leading-snug"
              dangerouslySetInnerHTML={{ __html: c.d }}
            />
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 3. Dersin akışı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç bölüm: anatomi → tasarım → ne zaman değil</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce pastanın nasıl algılandığını ve halkadan farkını görüyoruz; sonra okunur bir pasta
        için tasarım kurallarını; en son hangi durumda pastayı bırakıp başka grafiğe geçmemiz
        gerektiğini netleştiriyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            range: "01",
            title: "Anatomi",
            items: ["Açı ile alanın okunması", "Pasta vs halka farkı", "Açı yargısının zorluğu"],
            icon: PieChart,
            accent: "#ef4444",
          },
          {
            range: "02",
            title: "Tasarım Kuralları",
            items: ["Dilim sayısı ve sıralama", "Etiket ve yüzde", "Renk ve başlangıç açısı"],
            icon: Palette,
            accent: "#f59e0b",
          },
          {
            range: "03",
            title: "Ne Zaman Kullanma",
            items: ["Çok dilim / yakın değer", "Kıyas ve zaman serisi", "3D ve patlatma"],
            icon: Ban,
            accent: "#ef4444",
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
                <div
                  className="text-[10px] font-mono uppercase tracking-widest"
                  style={{ color: g.accent }}
                >
                  Bölüm {g.range}
                </div>
                <div className="text-lg font-semibold text-white">{g.title}</div>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-400">
              {g.items.map((it) => (
                <li key={it} className="flex items-start gap-2">
                  <ChevronRight
                    className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                    style={{ color: g.accent }}
                  />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 4. Bölüm 1 — Anatomi ───── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="Pasta &amp; Halkanın Anatomisi"
      subtitle="Pasta açıyla, bar ise konumla anlatır. Aralarındaki fark, neyi neden kullandığımızı belirler."
      bgGradient="linear-gradient(135deg, #ef4444, #b91c1c)"
      shadow="0 25px 60px -15px rgba(239, 68, 68, 0.6)"
      icon={<PieChart className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 5. Pasta vs halka ───── */
  () => (
    <SlideShell>
      <Eyebrow>Pasta · Halka · Fark</Eyebrow>
      <H2>İkisi de aynı işi yapar — biri merkezi boş</H2>
      <Sub className="mt-3 max-w-3xl">
        Pasta dilimleri merkezden başlar; halka (donut) merkezi boşaltır. Boş merkez bir KPI
        sayısı için yer açar; ama okuma artık dilim alanına değil, yay uzunluğuna dayanır.
      </Sub>
      <div className="mt-8 grid grid-cols-2 gap-6">
        <div className="vg-card rounded-xl p-5">
          <div className="text-xs font-mono text-[#ef4444] mb-3 uppercase tracking-widest">
            Pasta (pie)
          </div>
          <div className="grid grid-cols-2 gap-3 items-center">
            <PieChartSvg slices={PART_PIE} size={170} showLabels />
            <Legend slices={PART_PIE} />
          </div>
          <p className="text-[11px] text-gray-500 mt-3 leading-snug">
            Dilim açısı + alan birlikte payı kodlar. Merkez doludur.
          </p>
        </div>
        <div className="vg-card rounded-xl p-5">
          <div className="text-xs font-mono text-[#f59e0b] mb-3 uppercase tracking-widest">
            Halka (donut)
          </div>
          <div className="grid grid-cols-2 gap-3 items-center">
            <PieChartSvg slices={DONUT_PIE} innerR={48} size={170} />
            <Legend slices={DONUT_PIE} />
          </div>
          <p className="text-[11px] text-gray-500 mt-3 leading-snug">
            Boş merkez toplamı (100) gösterir; payı yalnız yay uzunluğu kodlar.
          </p>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 6. Algı sorunu — açı yargısı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Algı · Cleveland-McGill</Eyebrow>
      <H2>İnsan açıyı, uzunluk kadar iyi okuyamaz</H2>
      <Sub className="mt-3 max-w-3xl">
        Cleveland ve McGill&apos;in (1984) algı sıralamasına göre, nicel değerleri en doğru
        ortak bir eksen üzerindeki <span className="text-white">konum ve uzunluktan</span> okuruz.
        Açı, alan ve eğim bunların altında kalır — yani pastanın temel dili zaten zor okunandır.
      </Sub>
      <div className="mt-8 grid grid-cols-3 gap-4">
        {[
          { rank: "1", t: "Konum (ortak eksen)", d: "Hizalı bar, scatter — en doğru.", a: "#22c55e", icon: BarChart3 },
          { rank: "4", t: "Açı &amp; eğim", d: "Pasta dilimleri burada — orta doğruluk.", a: "#f59e0b", icon: PieChart },
          { rank: "5", t: "Alan", d: "Kabarcık, 3D pasta — daha hatalı.", a: "#ef4444", icon: Gauge },
        ].map((c, i) => (
          <motion.div
            key={c.t}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="vg-card rounded-xl p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${c.a}18`, border: `1px solid ${c.a}55` }}
              >
                <c.icon className="w-5 h-5" style={{ color: c.a }} />
              </div>
              <div className="text-2xl font-bold" style={{ color: c.a }}>
                #{c.rank}
              </div>
            </div>
            <div
              className="text-white font-semibold text-sm mb-1"
              dangerouslySetInnerHTML={{ __html: c.t }}
            />
            <div className="text-[12px] text-gray-400 leading-snug">{c.d}</div>
          </motion.div>
        ))}
      </div>
      <p className="mt-6 text-sm text-gray-500 max-w-3xl">
        Sonuç: pasta &quot;yaklaşık paylar&quot; için iş görür; kesin kıyas gerekiyorsa
        <span className="text-[#ef4444] font-semibold"> bar</span> daha güvenlidir.
      </p>
    </SlideShell>
  ),

  /* ───── 7. Bölüm 2 — Tasarım ───── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Okunur Bir Pasta Tasarlamak"
      subtitle="Pastayı kullanacaksanız, hiç değilse iyi tasarlayın: az dilim, doğru sıra, net etiket."
      bgGradient="linear-gradient(135deg, #f59e0b, #b45309)"
      shadow="0 25px 60px -15px rgba(245, 158, 11, 0.6)"
      icon={<Palette className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 8. Tasarım kuralları ───── */
  () => (
    <SlideShell>
      <Eyebrow>Tasarım · 6 kural</Eyebrow>
      <H2>İyi bir pastanın kontrol listesi</H2>
      <Sub className="mt-3 max-w-3xl">
        Pasta seçtiyseniz bu altı kural okunabilirliği belirler. Çoğu, pastayı &quot;yapma&quot;ya
        değil, &quot;daha az kötü&quot;ye taşır.
      </Sub>
      <div className="mt-8 grid grid-cols-3 gap-4">
        <FeatureCard
          icon={Layers}
          title="En fazla 5-6 dilim"
          desc="Daha fazlası ayırt edilemez. Küçükleri tek &quot;Diğer&quot; diliminde toplayın."
          delay={0.05}
        />
        <FeatureCard
          icon={Gauge}
          title="Saat 12&apos;den başla, sırala"
          desc="En büyük dilim 12 yönünde başlasın ve saat yönünde küçülsün."
          delay={0.1}
          accent="#f59e0b"
        />
        <FeatureCard
          icon={Percent}
          title="Değeri etikete yaz"
          desc="Yüzde/değeri doğrudan dilime ya da kenara yazın; göz açı tahminine kalmasın."
          delay={0.15}
        />
        <FeatureCard
          icon={Palette}
          title="Kategorik palet, tek vurgu"
          desc="Anlatmak istediğiniz dilimi vurgulayın, kalanını nötr griye çekin."
          delay={0.2}
          accent="#f59e0b"
        />
        <FeatureCard
          icon={Eye}
          title="Lejantı dilime taşı"
          desc="Ayrı lejant göz gezdirir; mümkünse etiketi doğrudan dilimin yanına koyun."
          delay={0.25}
        />
        <FeatureCard
          icon={Check}
          title="Toplam %100 olsun"
          desc="Pasta yalnız bir bütünün payları içindir. Toplamı 100 değilse pasta kullanmayın."
          delay={0.3}
          accent="#f59e0b"
        />
      </div>
    </SlideShell>
  ),

  /* ───── 9. Önce/sonra — kötü vs iyi pasta ───── */
  () => (
    <SlideShell>
      <Eyebrow>Önce / Sonra</Eyebrow>
      <H2>Aynı veri, iki pasta</H2>
      <Sub className="mt-3 max-w-3xl">
        Solda dokuz benzer dilimli, etiketsiz bir pasta — hangi pay büyük, söylemek imkânsız.
        Sağda küçükler &quot;Diğer&quot;de toplanmış, sıralı, etiketli üç+bir dilim.
      </Sub>
      <div className="mt-8 grid grid-cols-2 gap-6">
        <div className="vg-card rounded-xl p-4 border-2 border-red-500/30">
          <div className="flex items-center gap-2 mb-3">
            <X className="w-5 h-5 text-rose-400" />
            <span className="text-sm font-semibold text-rose-300">Kaçınılması gereken</span>
          </div>
          <TooManySlicesPie />
          <ul className="mt-3 text-[11px] text-gray-400 space-y-1">
            <li>· 9 dilim, hepsi yakın boyutta</li>
            <li>· Etiket yok, sıralama yok</li>
            <li>· Hangisi büyük, gözle seçilemez</li>
          </ul>
        </div>
        <div className="vg-card rounded-xl p-4 border-2 border-emerald-500/30">
          <div className="flex items-center gap-2 mb-3">
            <Check className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-300">Önerilen</span>
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <PieChartSvg
              slices={[
                { label: "A", value: 42, color: "#ef4444" },
                { label: "B", value: 28, color: "#f59e0b" },
                { label: "C", value: 18, color: "#fbbf24" },
                { label: "Diğer", value: 12, color: "#6b7280" },
              ]}
              size={150}
              showLabels
            />
            <Legend
              slices={[
                { label: "A", value: 42, color: "#ef4444" },
                { label: "B", value: 28, color: "#f59e0b" },
                { label: "C", value: 18, color: "#fbbf24" },
                { label: "Diğer", value: 12, color: "#6b7280" },
              ]}
            />
          </div>
          <ul className="mt-3 text-[11px] text-gray-400 space-y-1">
            <li>· 3 ana dilim + &quot;Diğer&quot;</li>
            <li>· Sıralı, saat 12&apos;den başlar</li>
            <li>· Yüzdeler dilim üstünde</li>
          </ul>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 10. Tableau / yazılımda nasıl yapılır ───── */
  () => (
    <SlideShell>
      <Eyebrow>Uygulama · Tableau &amp; kod</Eyebrow>
      <H2>Pasta ve halka pratikte nasıl kurulur?</H2>
      <Sub className="mt-3 max-w-3xl">
        Tableau&apos;da pasta birkaç tıkla; halka, ikili bir eksenle (dual axis) ortaya bir disk
        koyularak elde edilir. matplotlib&apos;te halka, pastanın merkezine beyaz bir daire eklemektir.
      </Sub>
      <div className="mt-8 grid grid-cols-2 gap-6 items-start">
        <div className="vg-card rounded-xl p-5">
          <div className="text-xs font-mono text-[#ef4444] mb-3 uppercase tracking-widest">
            Tableau — adımlar
          </div>
          <ol className="space-y-2.5 text-sm text-gray-300">
            {[
              "Marks kartından grafik türünü Pie seç.",
              "Kategoriyi Color, ölçüyü Angle alanına bırak.",
              "Yüzde için Quick Table Calculation → Percent of Total.",
              "Halka için ölçüyü ikinci kez Rows&apos;a koy → Dual Axis.",
              "İkinci pastayı küçült ve arka planla aynı renge boya.",
            ].map((s, i) => (
              <li key={i} className="flex gap-2">
                <span className="w-5 h-5 rounded-full border border-[#ef4444]/50 flex items-center justify-center text-[10px] text-[#ef4444] font-mono flex-shrink-0">
                  {i + 1}
                </span>
                <span dangerouslySetInnerHTML={{ __html: s }} />
              </li>
            ))}
          </ol>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-2 font-mono">matplotlib — halka grafiği</div>
          <div className="vg-code">
            <div>
              <span className="cm"># Pasta → halka: merkeze beyaz daire</span>
            </div>
            <div>
              <span className="kw">import</span> matplotlib.pyplot <span className="kw">as</span> plt
            </div>
            <div className="mt-2">
              pay <span className="op">=</span> [<span className="num">58</span>,{" "}
              <span className="num">27</span>, <span className="num">15</span>]
            </div>
            <div>
              etiket <span className="op">=</span> [<span className="str">&quot;Mobil&quot;</span>,{" "}
              <span className="str">&quot;Masaüstü&quot;</span>,{" "}
              <span className="str">&quot;Tablet&quot;</span>]
            </div>
            <div className="mt-2">
              plt.<span className="fn">pie</span>(pay, labels<span className="op">=</span>etiket,
            </div>
            <div>
              {"        "}autopct<span className="op">=</span>
              <span className="str">&quot;%1.0f%%&quot;</span>,
            </div>
            <div>
              {"        "}startangle<span className="op">=</span>
              <span className="num">90</span>,
            </div>
            <div>
              {"        "}counterclock<span className="op">=</span>
              <span className="kw">False</span>)
            </div>
            <div className="mt-2">
              plt.<span className="fn">gca</span>().<span className="fn">add_artist</span>(
            </div>
            <div>
              {"    "}plt.<span className="fn">Circle</span>((<span className="num">0</span>,{" "}
              <span className="num">0</span>), <span className="num">0.6</span>,
              fc<span className="op">=</span><span className="str">&quot;white&quot;</span>))
            </div>
            <div>
              plt.<span className="fn">show</span>()
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 11. Bölüm 3 — Ne zaman kullanma ───── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Ne Zaman Kullanılmamalı?"
      subtitle="Pasta dar bir araçtır. Şu durumlarda başka grafiğe geçin — gerekçeleriyle."
      bgGradient="linear-gradient(135deg, #ef4444, #f59e0b)"
      shadow="0 25px 60px -15px rgba(239, 68, 68, 0.55)"
      icon={<Ban className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 12. Kaçınma durumları tablosu ───── */
  () => (
    <SlideShell>
      <Eyebrow>Karar · pasta yerine ne?</Eyebrow>
      <H2>Bu durumda pasta yerine şunu kullan</H2>
      <Sub className="mt-3 max-w-3xl">
        Her satır, pastanın zayıf kaldığı bir durum ve daha doğru bir alternatif. Genel kural:
        kesin kıyas, çok kategori veya zaman varsa pasta gitmeli.
      </Sub>
      <div className="mt-7 vg-card rounded-xl p-4">
        <table className="vg-table">
          <thead>
            <tr>
              <th style={{ width: "30%" }}>Durum</th>
              <th style={{ width: "22%" }}>Neden sorun?</th>
              <th>Daha iyi grafik</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold text-white">6&apos;dan çok kategori</td>
              <td>Dilimler küçülür, ayırt edilemez.</td>
              <td>
                <span className="vg-pill vg-pill-good">Sıralı yatay bar</span>
              </td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Yakın değerleri kıyaslama</td>
              <td>30% ile 33% açıdan ayrılmaz.</td>
              <td>
                <span className="vg-pill vg-pill-good">Bar (ortak eksen)</span>
              </td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Zaman içinde değişim</td>
              <td>Pasta tek ana, trendi gizler.</td>
              <td>
                <span className="vg-pill vg-pill-good">Çizgi / yığılmış alan</span>
              </td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Toplam %100 değil</td>
              <td>Parça-bütün varsayımı bozulur.</td>
              <td>
                <span className="vg-pill vg-pill-good">Bar grafiği</span>
              </td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Birden çok grubu yan yana</td>
              <td>Çoklu pasta kıyaslanamaz.</td>
              <td>
                <span className="vg-pill vg-pill-good">Gruplu / yığılmış bar</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </SlideShell>
  ),

  /* ───── 13. Pasta → bar kanıtı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Kanıt · aynı veri</Eyebrow>
      <H2>Yakın paylarda bar &quot;kim büyük&quot;ü tek bakışta söyler</H2>
      <Sub className="mt-3 max-w-3xl">
        Aşağıdaki beş pay birbirine çok yakın. Pastada hangisinin önde olduğunu söylemek için
        etikete bakmanız gerekir; sıralı barda göz, anında en uzunu seçer.
      </Sub>
      <div className="mt-8 grid grid-cols-2 gap-8 items-center">
        <div className="vg-card rounded-xl p-5 text-center">
          <div className="text-xs font-mono text-rose-300 mb-3 uppercase tracking-widest">
            Pasta — okuması zor
          </div>
          <PieChartSvg
            slices={[
              { label: "Birim A", value: 22, color: "#ef4444" },
              { label: "Birim B", value: 21, color: "#f59e0b" },
              { label: "Birim C", value: 20, color: "#fbbf24" },
              { label: "Birim D", value: 19, color: "#a78bfa" },
              { label: "Birim E", value: 18, color: "#60a5fa" },
            ]}
            size={190}
          />
        </div>
        <div className="vg-card rounded-xl p-5">
          <div className="text-xs font-mono text-emerald-300 mb-3 uppercase tracking-widest">
            Bar — okuması kolay
          </div>
          <HBar
            slices={[
              { label: "Birim A", value: 22, color: "#ef4444" },
              { label: "Birim B", value: 21, color: "#f59e0b" },
              { label: "Birim C", value: 20, color: "#fbbf24" },
              { label: "Birim D", value: 19, color: "#a78bfa" },
              { label: "Birim E", value: 18, color: "#60a5fa" },
            ]}
            width={300}
          />
          <p className="text-[11px] text-gray-500 mt-3 leading-snug">
            Ortak bir tabandan başlayan uzunluklar, 1 puanlık farkı bile gösterir.
          </p>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 14. 3D ve patlatma — anti-pattern ───── */
  () => (
    <SlideShell>
      <Eyebrow>Anti-pattern · süsleme</Eyebrow>
      <H2>3D, eğim ve &quot;patlatma&quot; veriyi bozar</H2>
      <Sub className="mt-3 max-w-3xl">
        Pastayı kötüleştirmenin en hızlı yolu: 3D perspektif ve dilim patlatma (explode). İkisi de
        süs ekler, doğruluk çıkarır. Bunları varsayılan olarak kapatın.
      </Sub>
      <div className="mt-8 grid grid-cols-3 gap-4">
        {[
          {
            icon: AlertTriangle,
            t: "3D perspektif",
            d: "Öne yatan dilimler olduğundan büyük, arkadakiler küçük görünür. Açı yargısı zaten zorken bir de eğer.",
            a: "#ef4444",
          },
          {
            icon: AlertTriangle,
            t: "Dilim patlatma",
            d: "Dilimleri merkezden ayırmak boşluk yaratır; göz artık bitişik açıyı doğru kıyaslayamaz.",
            a: "#f59e0b",
          },
          {
            icon: AlertTriangle,
            t: "Gölge ve gradyan",
            d: "Veri taşımayan &quot;mürekkep&quot;tir (chartjunk). Dilim sınırını ve okumayı bulanıklaştırır.",
            a: "#ef4444",
          },
        ].map((c, i) => (
          <motion.div
            key={c.t}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="vg-card rounded-xl p-5"
          >
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center mb-3"
              style={{ background: `${c.a}18`, border: `1px solid ${c.a}55` }}
            >
              <c.icon className="w-5 h-5" style={{ color: c.a }} />
            </div>
            <div className="text-white font-semibold text-sm mb-1">{c.t}</div>
            <div
              className="text-[12px] text-gray-400 leading-snug"
              dangerouslySetInnerHTML={{ __html: c.d }}
            />
          </motion.div>
        ))}
      </div>
      <div className="mt-6 vg-card rounded-lg p-4 text-sm text-gray-300 flex items-start gap-3">
        <Check className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
        <div>
          <span className="text-white font-semibold">Kural:</span> Düz (2D), gölgesiz, patlatmasız
          pasta her zaman süslü olandan daha doğru okunur.
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 15. Uygulamalı lab ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı alıştırma</Eyebrow>
      <H2>Bir pastayı değerlendir ve iyileştir</H2>
      <Sub className="mt-3 max-w-3xl">
        Verilen tek bir veri kümesiyle dört adım. Amaç pastayı &quot;güzelleştirmek&quot; değil,
        ne zaman pasta ne zaman bar olması gerektiğine karar verebilmek.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          {
            icon: PieChart,
            title: "Pasta kur",
            desc: "8 kategorili satış payını Tableau/Excel&apos;de pasta yap; okunabilir mi, not al.",
            accent: "#ef4444",
          },
          {
            icon: Layers,
            title: "&quot;Diğer&quot;e topla",
            desc: "Küçük dilimleri tek &quot;Diğer&quot; diliminde birleştir, en fazla 5 dilime indir.",
            accent: "#f59e0b",
          },
          {
            icon: BarChart3,
            title: "Bar&apos;a çevir",
            desc: "Aynı veriyi sıralanmış yatay bar yap; iki grafiği yan yana ekran görüntüsü al.",
            accent: "#22c55e",
          },
          {
            icon: ListChecks,
            title: "Karar yaz",
            desc: "3 cümlede gerekçelendir: bu veri için pasta mı bar mı, neden?",
            accent: "#a78bfa",
          },
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
                <h3
                  className="text-base font-semibold text-white"
                  dangerouslySetInnerHTML={{ __html: t.title }}
                />
              </div>
              <p
                className="text-sm text-gray-400 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t.desc }}
              />
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
        <Target className="w-4 h-4 text-[#ef4444] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Teslim:</span> İki grafiğin ekran görüntüsü + 3 cümlelik
          karar notu. Sonraki derse getir.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 16. Özet karar kuralı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Özet · tek karar kuralı</Eyebrow>
      <H2>Pasta mı, değil mi?</H2>
      <Sub className="mt-3 max-w-3xl">
        Bu haftayı tek bir karar kuralında topluyoruz. Pasta yalnızca dar bir kesişimde
        doğru seçimdir.
      </Sub>
      <div className="mt-8 grid grid-cols-2 gap-6">
        <div className="vg-rule-box vg-rule-yes">
          <div className="flex items-center gap-2 mb-2 font-semibold text-emerald-300">
            <Check className="w-4 h-4" /> Pasta / halka uygun
          </div>
          <ul className="space-y-1.5">
            <li>· Tek bütünün parçaları (toplam %100)</li>
            <li>· En fazla 5-6 kategori</li>
            <li>· &quot;Yaklaşık yarısı / çoğunluğu&quot; mesajı yeterli</li>
            <li>· Tek bir an / tek bir grup</li>
          </ul>
        </div>
        <div className="vg-rule-box vg-rule-no">
          <div className="flex items-center gap-2 mb-2 font-semibold text-rose-300">
            <X className="w-4 h-4" /> Pasta&apos;dan kaçın
          </div>
          <ul className="space-y-1.5">
            <li>· Çok kategori veya yakın değerler</li>
            <li>· Kesin kıyas / sıralama gerekiyor</li>
            <li>· Zaman içinde değişim</li>
            <li>· Birden çok grubu yan yana koyma</li>
          </ul>
        </div>
      </div>
      <p className="mt-6 text-sm text-gray-500 max-w-3xl text-center mx-auto">
        Tereddütteyseniz <span className="text-[#ef4444] font-semibold">sıralanmış bar</span>{" "}
        neredeyse her zaman güvenli seçimdir.
      </p>
    </SlideShell>
  ),

  /* ───── 17. Sıradaki hafta + kapanış ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8"
          style={{
            background: "linear-gradient(135deg, #ef4444, #f59e0b)",
            boxShadow: "0 30px 80px -20px rgba(239,68,68,0.6)",
          }}
        >
          <Code2 className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>11. hafta tamamlandı · sıradaki: H12</Eyebrow>
        <H1>
          <span className="vg-shimmer-amber">Veriyle Hikâye Anlatımı</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta &quot;doğru grafik türünü seç&quot; dedik. 12. haftada grafikleri bir araya
          getirip bir <span className="text-white">anlatı</span> kurmayı işliyoruz: bağlam,
          vurgu ve okuyucuyu yönlendirme.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="vg-card rounded-xl p-5">
            <Calendar className="w-5 h-5 text-[#ef4444] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">
              Ders saati
            </div>
            <div className="text-white font-semibold">Cuma</div>
            <div className="text-sm text-gray-400">11:45 — 15:10</div>
          </div>
          <div className="vg-card rounded-xl p-5">
            <Target className="w-5 h-5 text-[#f59e0b] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">
              Hazırlık
            </div>
            <div className="text-white font-semibold">Pasta/bar alıştırması</div>
            <div className="text-sm text-gray-400">2 grafik + karar notu</div>
          </div>
          <div className="vg-card rounded-xl p-5">
            <ListChecks className="w-5 h-5 text-[#22c55e] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">
              Teslim
            </div>
            <div className="text-white font-semibold">Ekran görüntüsü</div>
            <div className="text-sm text-gray-400">pasta vs bar kıyas</div>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-center gap-3 text-xs font-mono text-gray-500">
          <PieChart className="w-4 h-4" />
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
          BVA 2107 · 11. Hafta · Pasta &amp; Halka Grafikleri
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
