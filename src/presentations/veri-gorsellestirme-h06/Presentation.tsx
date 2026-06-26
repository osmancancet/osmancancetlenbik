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
  Eye,
  Brain,
  Zap,
  Layers,
  Ruler,
  Palette,
  Move,
  Scan,
  Target,
  Gauge,
  ListChecks,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Calendar,
  Sparkles,
  Check,
  X,
  AlertTriangle,
  Activity,
  Crosshair,
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

function StatCard({
  icon: Icon,
  value,
  label,
  source,
  delay = 0,
  accent = "#ef4444",
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
      className="vg-card rounded-xl p-5"
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
   TOPIC MOCKUPS — görsel algı & biliş
   ============================================================ */

/* Öndikkat (pre-attentive) tek tip görsel ipucuyla "pop-out" örneği.
   variant = "color": tek hedef farklı renk · "shape": tek hedef farklı şekil
   variant = "none": hiçbir ipucu yok — seri tarama gerekir */
function PreAttentiveGrid({
  variant,
  title,
}: {
  variant: "color" | "shape" | "none";
  title: string;
}) {
  const rows = 5;
  const cols = 9;
  const cell = 22;
  const pad = 8;
  const targetR = 1;
  const targetC = 6;
  const width = pad * 2 + cols * cell;
  const height = pad * 2 + rows * cell + 16;
  return (
    <div className="vg-popout-panel">
      <div className="text-[10px] text-gray-400 mb-1 font-mono">{title}</div>
      <svg width={width} height={height} className="block">
        {Array.from({ length: rows }).flatMap((_, r) =>
          Array.from({ length: cols }).map((_, c) => {
            const cx = pad + c * cell + cell / 2;
            const cy = pad + 16 + r * cell + cell / 2;
            const isTarget = r === targetR && c === targetC;
            // varsayılan dağıtıcı: gri daire
            let fill = "#64748b";
            let shape: "circle" | "square" = "circle";
            if (variant === "color" && isTarget) fill = "#ef4444";
            if (variant === "shape" && isTarget) shape = "square";
            if (variant === "none") {
              // sayısal "5" arasına gizlenmiş "2" gibi — burada renk/şekil ipucu yok
              fill = "#64748b";
              shape = "circle";
            }
            if (shape === "square") {
              return (
                <rect
                  key={`${r}-${c}`}
                  x={cx - 7}
                  y={cy - 7}
                  width={14}
                  height={14}
                  rx={2}
                  fill={fill}
                />
              );
            }
            return (
              <circle key={`${r}-${c}`} cx={cx} cy={cy} r={7} fill={fill} />
            );
          })
        )}
      </svg>
    </div>
  );
}

/* Öndikkat öznitelik kataloğu — renk, boyut, yönelim, konum */
function PreAttentiveCatalog() {
  const items: Array<{ key: string; render: ReactNode; label: string }> = [
    {
      key: "color",
      label: "Renk (hue)",
      render: (
        <svg width={130} height={48} className="block">
          {Array.from({ length: 9 }).map((_, i) => (
            <circle
              key={i}
              cx={14 + i * 14}
              cy={24}
              r={6}
              fill={i === 5 ? "#ef4444" : "#64748b"}
            />
          ))}
        </svg>
      ),
    },
    {
      key: "size",
      label: "Boyut (size)",
      render: (
        <svg width={130} height={48} className="block">
          {Array.from({ length: 9 }).map((_, i) => (
            <circle
              key={i}
              cx={14 + i * 14}
              cy={24}
              r={i === 5 ? 10 : 5}
              fill="#94a3b8"
            />
          ))}
        </svg>
      ),
    },
    {
      key: "orient",
      label: "Yönelim (orientation)",
      render: (
        <svg width={130} height={48} className="block">
          {Array.from({ length: 9 }).map((_, i) => {
            const x = 14 + i * 14;
            const tilt = i === 5 ? 45 : 0;
            return (
              <line
                key={i}
                x1={x}
                y1={36}
                x2={x}
                y2={12}
                stroke="#94a3b8"
                strokeWidth={3}
                strokeLinecap="round"
                transform={`rotate(${tilt} ${x} 24)`}
              />
            );
          })}
        </svg>
      ),
    },
    {
      key: "pos",
      label: "Konum (2B uzaysal)",
      render: (
        <svg width={130} height={48} className="block">
          {Array.from({ length: 9 }).map((_, i) => (
            <circle
              key={i}
              cx={14 + i * 14}
              cy={i === 5 ? 10 : 30}
              r={6}
              fill="#94a3b8"
            />
          ))}
        </svg>
      ),
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((it) => (
        <div key={it.key} className="vg-popout-panel">
          <div className="text-[11px] font-semibold text-white mb-1">{it.label}</div>
          {it.render}
        </div>
      ))}
    </div>
  );
}

/* Cleveland–McGill algısal doğruluk merdiveni:
   konumdan alana doğru kodlama biçimleri ne kadar hassas okunur? */
function PerceptualLadder() {
  const ranks = [
    { rank: 1, name: "Ortak eksende konum", note: "Hizalı eksende uzunluk/konum — en hassas", acc: "#34d399", w: 100 },
    { rank: 2, name: "Ortak olmayan eksende konum", note: "Ayrı panellerdeki konum", acc: "#86efac", w: 88 },
    { rank: 3, name: "Uzunluk · açı · eğim", note: "Bar uzunluğu, çizgi eğimi", acc: "#fbbf24", w: 70 },
    { rank: 4, name: "Alan", note: "Kabarcık/daire büyüklüğü", acc: "#f59e0b", w: 52 },
    { rank: 5, name: "Hacim · eğrilik", note: "3B hacim, kavis", acc: "#fb923c", w: 38 },
    { rank: 6, name: "Renk tonu · doygunluk", note: "Sayısal büyüklük için en zayıf", acc: "#f87171", w: 26 },
  ];
  return (
    <div className="space-y-2">
      {ranks.map((r, i) => (
        <motion.div
          key={r.rank}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 + i * 0.08 }}
          className="flex items-center gap-3"
        >
          <span className="w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold text-black flex-shrink-0"
            style={{ background: r.acc }}>
            {r.rank}
          </span>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-white font-medium">{r.name}</span>
              <span className="text-[10px] text-gray-500">{r.note}</span>
            </div>
            <div className="vg-load-track">
              <div className="vg-load-fill" style={{ width: `${r.w}%`, background: r.acc }} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* Aynı veri: solda alan (pie/bubble) kodlaması, sağda hizalı bar.
   Hangisinde sıralamayı gözle daha doğru çıkarırsın? */
function AreaVsLength() {
  const data = [
    { l: "A", v: 23, c: "#ef4444" },
    { l: "B", v: 21, c: "#f59e0b" },
    { l: "C", v: 19, c: "#fbbf24" },
    { l: "D", v: 18, c: "#fb923c" },
    { l: "E", v: 19, c: "#fca5a5" },
  ];
  // pie
  const cx = 70;
  const cy = 70;
  const r = 56;
  const total = data.reduce((a, b) => a + b.v, 0);
  let acc = -Math.PI / 2;
  // bar
  const max = Math.max(...data.map((d) => d.v));
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="vg-popout-panel">
        <div className="text-[10px] text-gray-400 mb-1 font-mono">Alan kodlama — pasta</div>
        <svg width={140} height={150} className="block mx-auto">
          {data.map((d, i) => {
            const ang = (d.v / total) * Math.PI * 2;
            const x1 = cx + r * Math.cos(acc);
            const y1 = cy + r * Math.sin(acc);
            const x2 = cx + r * Math.cos(acc + ang);
            const y2 = cy + r * Math.sin(acc + ang);
            const large = ang > Math.PI ? 1 : 0;
            const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
            acc += ang;
            return <path key={i} d={path} fill={d.c} stroke="#0a0a0a" strokeWidth={1} />;
          })}
          <text x={cx} y={142} textAnchor="middle" fill="#94a3b8" fontSize={9}>
            En büyük dilim hangisi?
          </text>
        </svg>
      </div>
      <div className="vg-popout-panel">
        <div className="text-[10px] text-gray-400 mb-1 font-mono">Uzunluk kodlama — bar</div>
        <svg width={150} height={150} className="block mx-auto">
          {data.map((d, i) => {
            const w = (d.v / max) * 100;
            const y = 12 + i * 26;
            return (
              <g key={i}>
                <text x={4} y={y + 11} fill="#94a3b8" fontSize={10}>{d.l}</text>
                <rect x={20} y={y} width={w} height={16} fill={d.c} rx={2} />
                <text x={20 + w + 4} y={y + 12} fill="#e5e7eb" fontSize={9}>{d.v}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

/* Gestalt gruplama örnekleri (h01'deki mantıkla, bu haftaya odaklı) */
function GestaltMini({ kind }: { kind: "proximity" | "similarity" | "enclosure" | "connection" }) {
  const width = 150;
  const height = 84;
  return (
    <div className="vg-popout-panel">
      <svg width={width} height={height} className="block">
        {kind === "proximity" &&
          Array.from({ length: 3 }).flatMap((_, r) =>
            Array.from({ length: 6 }).map((_, c) => {
              const gap = c >= 3 ? 16 : 0;
              return (
                <circle
                  key={`${r}-${c}`}
                  cx={18 + c * 16 + gap}
                  cy={22 + r * 18}
                  r={4}
                  fill="#ef4444"
                />
              );
            })
          )}
        {kind === "similarity" &&
          Array.from({ length: 4 }).flatMap((_, r) =>
            Array.from({ length: 6 }).map((_, c) => (
              <circle
                key={`${r}-${c}`}
                cx={20 + c * 20}
                cy={14 + r * 18}
                r={4.5}
                fill={c % 2 === 0 ? "#ef4444" : "#fbbf24"}
              />
            ))
          )}
        {kind === "enclosure" && (
          <>
            <rect x={10} y={18} width={64} height={48} rx={6} fill="#ef444418" stroke="#ef4444" strokeWidth={1} />
            {Array.from({ length: 9 }).map((_, i) => (
              <circle
                key={i}
                cx={20 + (i % 3) * 18 + (i >= 9 ? 60 : 0)}
                cy={30 + Math.floor(i / 3) * 16}
                r={4}
                fill="#94a3b8"
              />
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <circle
                key={`o-${i}`}
                cx={92 + (i % 3) * 18}
                cy={30 + Math.floor(i / 3) * 16}
                r={4}
                fill="#94a3b8"
              />
            ))}
          </>
        )}
        {kind === "connection" && (
          <>
            <path d="M 16 60 L 50 28 L 84 48 L 120 20" stroke="#ef4444" strokeWidth={2} fill="none" />
            {[
              { x: 16, y: 60 }, { x: 50, y: 28 }, { x: 84, y: 48 }, { x: 120, y: 20 },
            ].map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={4.5} fill="#fbbf24" />
            ))}
          </>
        )}
      </svg>
    </div>
  );
}

/* "Sınırlamayı aşma" — bilişsel yük: aynı bilgi, az vs çok kod elemanı */
function CognitiveLoadCompare() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="vg-card rounded-xl p-4 border-2 border-red-500/30">
        <div className="flex items-center gap-2 mb-3">
          <X className="w-5 h-5 text-rose-400" />
          <span className="text-sm font-semibold text-rose-300">Yüksek dışsal yük</span>
        </div>
        <svg width="100%" viewBox="0 0 260 140" className="block">
          {/* yoğun ızgara + 3B gölge + çok renk = gereksiz çaba */}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={`g-${i}`} x1={10 + i * 30} y1={10} x2={10 + i * 30} y2={120} stroke="#334155" strokeWidth={0.5} />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <line key={`h-${i}`} x1={10} y1={20 + i * 22} x2={250} y2={20 + i * 22} stroke="#334155" strokeWidth={0.5} />
          ))}
          {[60, 95, 50, 110, 80].map((h, i) => {
            const colors = ["#ef4444", "#22c55e", "#3b82f6", "#a855f7", "#f59e0b"];
            return (
              <g key={i}>
                <rect x={24 + i * 46} y={120 - h} width={30} height={h} fill={colors[i]} />
                <polygon points={`${24 + i * 46},${120 - h} ${30 + i * 46},${114 - h} ${60 + i * 46},${114 - h} ${54 + i * 46},${120 - h}`} fill={colors[i]} opacity={0.5} />
              </g>
            );
          })}
        </svg>
        <p className="mt-2 text-[11px] text-gray-400 leading-snug">
          Izgara gürültüsü, 3B gölge ve her bara ayrı renk: göz önce süsü ayıklamak zorunda.
        </p>
      </div>
      <div className="vg-card rounded-xl p-4 border-2 border-emerald-500/30">
        <div className="flex items-center gap-2 mb-3">
          <Check className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-semibold text-emerald-300">Düşük dışsal yük</span>
        </div>
        <svg width="100%" viewBox="0 0 260 140" className="block">
          <line x1={20} y1={120} x2={250} y2={120} stroke="#475569" strokeWidth={1} />
          {[60, 95, 50, 110, 80].map((h, i) => (
            <g key={i}>
              <rect x={30 + i * 44} y={120 - h} width={28} height={h} fill={i === 3 ? "#ef4444" : "#475569"} rx={2} />
              <text x={44 + i * 44} y={134} fill="#94a3b8" fontSize={9} textAnchor="middle">{["A", "B", "C", "D", "E"][i]}</text>
            </g>
          ))}
        </svg>
        <p className="mt-2 text-[11px] text-gray-400 leading-snug">
          Tek vurgu rengi, ızgara yok, hizalı tek eksen: çalışan bellek doğrudan veriye ayrılır.
        </p>
      </div>
    </div>
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
        <Eyebrow>BVA 2107 · 6. Hafta</Eyebrow>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.02]">
          <span className="vg-shimmer">Görsel Algı ve Biliş</span>
        </h1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Bir grafik &quot;güzel&quot; değil; göz ve beyin onu kolay çözebildiği için iyidir.
          Bu hafta tasarımın altındaki algı bilimine iniyoruz.
        </Sub>
        <div className="mt-12 grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { name: "Öndikkat", desc: "Saniyenin altında ayırt etme", icon: Zap },
            { name: "Algısal hassasiyet", desc: "Konum &gt; uzunluk &gt; alan", icon: Ruler },
            { name: "Çalışan bellek", desc: "Bilişsel yük sınırı", icon: Brain },
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

  /* ───── 2. Köprü: geçen haftadan bu haftaya ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 5. haftadan 6. haftaya</Eyebrow>
      <H2>Veriyi temizledik; şimdi onu beyne nasıl ulaştıracağız?</H2>
      <Sub className="mt-3 max-w-3xl">
        Önceki haftalarda araçları kurduk ve veriyi hazırladık. Bir grafik çizmek kolay; ama
        izleyicinin onu <span className="text-[#ef4444]">doğru ve hızlı</span> okuması bir tasarım kararıdır.
        Bu hafta o kararların dayandığı algı ve biliş ilkelerini öğreniyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="vg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fca5a5]">
            <Eye className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu haftaya kadar</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ef4444] flex-shrink-0" />Doğru grafik türünü seçtik.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ef4444] flex-shrink-0" />Veriyi temizleyip biçimlendirdik.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ef4444] flex-shrink-0" />Aracı (Tableau/Excel) kullandık.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="vg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <Brain className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu hafta sorduğumuz</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Göz hangi farkı anında yakalar?</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Beyin hangi kodlamayı daha doğru okur?</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Çalışan belleği nasıl fazla yormayız?</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 3. Dersin akışı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: algı → hassasiyet → biliş</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce gözün otomatik tarama gücünü; sonra hangi görsel kodlamanın daha doğru okunduğunu;
        en son beynin örüntü kurma ve hatırlama sınırlarını ele alıyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Görsel Algı", items: ["Öndikkat öznitelikler", "Pop-out etkisi", "Görsel arama maliyeti"], icon: Eye, accent: "#ef4444" },
          { range: "02", title: "Algısal Hassasiyet", items: ["Cleveland–McGill sırası", "Konum vs alan vs renk", "Doğru kodlama seçimi"], icon: Ruler, accent: "#f59e0b" },
          { range: "03", title: "Biliş", items: ["Gestalt gruplama", "Çalışan bellek sınırı", "Bilişsel yük"], icon: Brain, accent: "#34d399" },
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

  /* ───── 4. Algı zinciri (stat/kavram) ───── */
  () => (
    <SlideShell>
      <Eyebrow>Görmekten anlamaya</Eyebrow>
      <H2>Bir grafik beyne üç aşamada girer</H2>
      <Sub className="mt-3 max-w-3xl">
        Algı pasif bir kayıt değil, aktif bir yorumdur. Tasarım kararları bu zincirin her halkasını etkiler.
      </Sub>
      <div className="mt-10 grid grid-cols-4 gap-4">
        <StatCard
          icon={Eye}
          value="~%80"
          label="Beynin işlediği duyusal bilginin büyük kısmı görseldir"
          source="Genel görme bilimi"
          delay={0.05}
        />
        <StatCard
          icon={Zap}
          value="< 250 ms"
          label="Öndikkat özniteliklerin ayırt edilme aralığı (paralel)"
          source="Healey & Enns derlemesi"
          delay={0.15}
          accent="#f59e0b"
        />
        <StatCard
          icon={Brain}
          value="~4 öğe"
          label="Görsel çalışan bellekte aynı anda tutulabilen yaklaşık öğe"
          source="Cowan, çalışan bellek"
          delay={0.25}
        />
        <StatCard
          icon={Gauge}
          value="2 sistem"
          label="Hızlı/otomatik (Sistem 1) ve yavaş/çabalı (Sistem 2) işleme"
          source="Kahneman çerçevesi"
          delay={0.35}
          accent="#f59e0b"
        />
      </div>
      <p className="mt-8 text-sm text-gray-500 max-w-3xl">
        İyi tasarım, işin çoğunu <span className="text-[#ef4444] font-semibold">hızlı ve otomatik</span> sisteme
        bırakır; izleyiciyi yavaş, çabalı düşünmeye zorlayan her şey bir tasarım borcudur. Rakamlar
        kaynaklara göre değişir; buradaki amaç büyüklük mertebesini hissettirmektir.
      </p>
    </SlideShell>
  ),

  /* ───── 5. Bölüm 1 — Görsel Algı ───── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Görsel Algı"
      subtitle="Bazı farkları aramayız — göz onları kendiliğinden, paralel ve neredeyse anında yakalar. Buna öndikkat işleme denir."
      bgGradient="linear-gradient(135deg, #ef4444, #b91c1c)"
      shadow="0 25px 60px -15px rgba(239, 68, 68, 0.6)"
      icon={<Eye className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 6. Pop-out — renk/şekil vs seri arama ───── */
  () => (
    <SlideShell>
      <Eyebrow>Öndikkat · pop-out etkisi</Eyebrow>
      <H2 className="mb-2">Hedefi &quot;ararsınız&quot; mı, yoksa &quot;görür&quot; müsünüz?</H2>
      <Sub className="max-w-3xl mb-6">
        Tek bir öndikkat öznitelik (renk, şekil) hedefi anında öne çıkarır — tarama paralel ve hızlıdır.
        İpucu yoksa göz tek tek dolaşmak zorunda kalır; bu seri arama yavaştır ve dikkat ister.
      </Sub>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <PreAttentiveGrid variant="color" title="Renk ipucu — pop-out (paralel)" />
          <p className="text-[11px] text-gray-500 mt-1 leading-snug px-1">Kırmızı hedef anında sıçrar; sayı arttıkça süre değişmez.</p>
        </div>
        <div>
          <PreAttentiveGrid variant="shape" title="Şekil ipucu — pop-out (paralel)" />
          <p className="text-[11px] text-gray-500 mt-1 leading-snug px-1">Kare, daireler arasında tek farklı şekil olarak öne çıkar.</p>
        </div>
        <div>
          <PreAttentiveGrid variant="none" title="İpucu yok — seri arama (yavaş)" />
          <p className="text-[11px] text-gray-500 mt-1 leading-snug px-1">Hedef ayırt edici değilse göz tek tek dolaşır; süre öğe sayısıyla artar.</p>
        </div>
      </div>
      <p className="mt-6 text-xs text-gray-500 text-center font-mono">
        Pratik kural: vurgulamak istediğin değeri tek bir öndikkat öznitelikle ayır; her şeyi vurgularsan hiçbir şey öne çıkmaz.
      </p>
    </SlideShell>
  ),

  /* ───── 7. Öndikkat öznitelik kataloğu ───── */
  () => (
    <SlideShell>
      <Eyebrow>Öndikkat öznitelikler</Eyebrow>
      <H2>Beynin &quot;bedava&quot; algıladığı kanallar</H2>
      <Sub className="mt-3 max-w-3xl">
        Belirli görsel kanallar paralel ve neredeyse çabasız işlenir. Bunları kasıtlı kullan; çünkü
        izleyici onları zaten otomatik okuyor.
      </Sub>
      <div className="mt-8 grid grid-cols-2 gap-8 items-start">
        <PreAttentiveCatalog />
        <div className="space-y-3">
          <div className="vg-card rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2 text-[#ef4444]">
              <Crosshair className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-widest">Dikkat</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Aynı anda iki öznitelik birleşirse (örn. &quot;kırmızı VE kare&quot;) pop-out kaybolur; bu
              birleşim araması yine seri ve yavaştır.
            </p>
          </div>
          <div className="vg-card rounded-lg p-4 text-sm text-gray-300">
            <span className="text-[#f59e0b] font-semibold">Yön seç:</span> Renk ve konum kategorik ayrım için güçlü;
            boyut ve yönelim büyüklük sezgisi verir. Kanalı taşıdığın anlama göre eşle.
          </div>
          <div className="vg-card rounded-lg p-4 text-sm text-gray-300">
            <span className="text-[#ef4444] font-semibold">Ekonomi:</span> Öndikkat kanal sayısı sınırlıdır.
            Hepsini birden kullanırsan grafik gürültüye döner.
          </div>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 8. Bölüm 2 — Algısal Hassasiyet ───── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Algısal Hassasiyet"
      subtitle="Aynı sayıyı konumla da, alanla da, renkle de gösterebilirsin — ama göz hepsini aynı doğrulukla okumaz. Sıralama bellidir."
      bgGradient="linear-gradient(135deg, #f59e0b, #b45309)"
      shadow="0 25px 60px -15px rgba(245, 158, 11, 0.6)"
      icon={<Ruler className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 9. Cleveland–McGill merdiveni ───── */
  () => (
    <SlideShell>
      <Eyebrow>Cleveland &amp; McGill · 1984</Eyebrow>
      <H2 className="mb-2">Algısal doğruluk merdiveni</H2>
      <Sub className="max-w-3xl mb-6">
        Sayısal büyüklüğü okurken bazı kodlamalar diğerlerinden çok daha hassastır. Yukarıdan
        aşağıya doğru doğruluk düşer. Önemli değerleri merdivenin üst basamaklarıyla göster.
      </Sub>
      <div className="grid grid-cols-3 gap-6 items-start">
        <div className="col-span-2">
          <PerceptualLadder />
        </div>
        <div className="vg-card rounded-xl p-5">
          <div className="text-xs font-mono text-[#ef4444] mb-3">PRATİK ÇIKARIM</div>
          <ul className="space-y-2.5 text-[12px] text-gray-300">
            <li className="flex gap-2"><Check className="w-4 h-4 text-[#34d399] mt-0.5 flex-shrink-0" />Kesin kıyas gerekiyorsa hizalı bar kullan.</li>
            <li className="flex gap-2"><Check className="w-4 h-4 text-[#34d399] mt-0.5 flex-shrink-0" />Trend için ortak eksende çizgi.</li>
            <li className="flex gap-2"><AlertTriangle className="w-4 h-4 text-[#f59e0b] mt-0.5 flex-shrink-0" />Pasta/kabarcık: yalnız kaba pay için.</li>
            <li className="flex gap-2"><X className="w-4 h-4 text-[#f87171] mt-0.5 flex-shrink-0" />Renk tonunu sayı ölçmek için kullanma.</li>
          </ul>
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 10. Alan vs uzunluk — somut kıyas ───── */
  () => (
    <SlideShell>
      <Eyebrow>Aynı veri · iki kodlama</Eyebrow>
      <H2 className="mb-2">Hangisinde sıralamayı çıkarabilirsin?</H2>
      <Sub className="max-w-3xl mb-6">
        Soldaki pastada dilimler birbirine yakın olduğunda hangisinin en büyük olduğunu söylemek zor.
        Sağdaki hizalı barda fark anında okunur — çünkü uzunluk, alandan daha hassas bir kanaldır.
      </Sub>
      <AreaVsLength />
      <p className="mt-6 text-xs text-gray-500 text-center font-mono">
        Pasta &quot;yasak&quot; değildir; ama değerler yakın ve karşılaştırma kritikse alan kodlama seni yanıltır.
      </p>
    </SlideShell>
  ),

  /* ───── 11. Renk algısı — büyüklük için zayıf, kategori için güçlü ───── */
  () => (
    <SlideShell>
      <Eyebrow>Renk algısı · doğru iş</Eyebrow>
      <H2>Renk neyi iyi, neyi kötü kodlar?</H2>
      <Sub className="mt-3 max-w-3xl">
        Renk dikkat çekmekte ve kategori ayırmakta güçlüdür; ama ince sayısal sıralamada zayıftır.
        Görevini renge göre değil, rengi görevine göre seç.
      </Sub>
      <div className="mt-8 grid grid-cols-3 gap-4">
        <FeatureCard
          icon={Target}
          title="Vurgu için güçlü"
          desc="Tek doygun renk, gri bir arka plan içinde anında öne çıkar — öndikkat avantajı."
          accent="#ef4444"
          delay={0.1}
        />
        <FeatureCard
          icon={Palette}
          title="Kategori için güçlü"
          desc="Az sayıda ayrık ton, sınıfları birbirinden ayırmak için iyi çalışır (≤ 7 renk)."
          accent="#f59e0b"
          delay={0.2}
        />
        <FeatureCard
          icon={Ruler}
          title="Tam sayı için zayıf"
          desc="İki ton arasındaki farktan kesin değer okumak güçtür; gerekirse etiketle destekle."
          accent="#34d399"
          delay={0.3}
        />
      </div>
      <div className="mt-6 vg-card rounded-lg p-4 text-sm text-gray-300 flex items-start gap-3">
        <Eye className="w-5 h-5 text-[#ef4444] mt-0.5 shrink-0" />
        <div>
          <span className="text-white font-semibold">Hatırlatma:</span> Renk körlüğü nedeniyle yalnız renge
          güvenme; konum, şekil veya doğrudan etiketle yedekle. (5. haftada palet türlerini görmüştük.)
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 12. Bölüm 3 — Biliş ───── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Biliş"
      subtitle="Göz veriyi yakalar; beyin onu gruplar, anlamlandırır ve hatırlar. Bu süreçlerin sınırlarını bilmek tasarımı kararlaştırır."
      bgGradient="linear-gradient(135deg, #22c55e, #15803d)"
      shadow="0 25px 60px -15px rgba(34, 197, 94, 0.55)"
      icon={<Brain className="w-14 h-14 text-white" />}
    />
  ),

  /* ───── 13. Gestalt gruplama ───── */
  () => (
    <SlideShell>
      <Eyebrow>Gestalt ilkeleri</Eyebrow>
      <H2>Beyin neyin &quot;birlikte&quot; olduğuna kendi karar verir</H2>
      <Sub className="mt-3 max-w-3xl">
        Sen gruplamasan da göz öğeleri otomatik kümeler. Bu reflekslere uy: ilişkili olanı yakınlaştır,
        benzet, bir kutuya al veya çizgiyle bağla.
      </Sub>
      <div className="mt-8 grid grid-cols-4 gap-3">
        {[
          { k: "proximity" as const, t: "Yakınlık", d: "Yakın olanlar grup sayılır." },
          { k: "similarity" as const, t: "Benzerlik", d: "Aynı renk/şekil = aynı sınıf." },
          { k: "enclosure" as const, t: "Çevreleme", d: "Bir kutuya alınanlar birlikte." },
          { k: "connection" as const, t: "Bağlantı", d: "Çizgiyle bağlı olan en güçlü grup." },
        ].map((g, i) => (
          <motion.div
            key={g.k}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="vg-card rounded-xl p-3"
          >
            <GestaltMini kind={g.k} />
            <div className="mt-2 text-sm font-semibold text-white">{g.t}</div>
            <div className="text-[11px] text-gray-400 mt-0.5 leading-snug">{g.d}</div>
          </motion.div>
        ))}
      </div>
      <p className="mt-6 text-xs text-gray-500 text-center font-mono">
        Tasarım dili: lejantı veriye yakın koy · ilişkili serileri aynı renkle eşle · grupları beyaz alanla ayır.
      </p>
    </SlideShell>
  ),

  /* ───── 14. Çalışan bellek sınırı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Çalışan bellek</Eyebrow>
      <H2 className="mb-2">Aynı anda az şey tutabiliriz</H2>
      <Sub className="max-w-3xl mb-6">
        Görsel çalışan bellek küçüktür (yaklaşık birkaç öğe). İzleyiciyi lejant ile grafik arasında
        ileri-geri gitmeye zorlayan her tasarım bu sınırı zorlar ve yükü artırır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Layers, title: "Doğrudan etiketle", desc: "Serileri lejant yerine ucuna yazılan etiketle adlandır; göz kod tablosunu ezberlemek zorunda kalmasın.", accent: "#ef4444" },
          { icon: Scan, title: "Parçala (chunking)", desc: "Çok kategoriyi anlamlı az sayıda gruba topla; 12 dilim yerine 4 grup + 'diğer'.", accent: "#f59e0b" },
          { icon: Move, title: "Bağlamı yerinde tut", desc: "Karşılaştırılacak değerleri yan yana koy; izleyici belleğinde taşımak zorunda kalmasın.", accent: "#34d399" },
        ].map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="vg-card rounded-xl p-6"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ background: `${c.accent}18`, border: `1px solid ${c.accent}55` }}
            >
              <c.icon className="w-6 h-6" style={{ color: c.accent }} />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">{c.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 15. Bilişsel yük — az vs çok kod ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bilişsel yük · data-ink ile bağ</Eyebrow>
      <H2 className="mb-2">Gürültü, çalışan belleği boşa harcar</H2>
      <Sub className="max-w-3xl mb-6">
        İçsel yük verinin kendi karmaşıklığıdır; dışsal yük ise tasarımın eklediği gereksiz çabadır.
        İyi tasarım dışsal yükü düşürür — böylece izleyici enerjisini gerçek veriye ayırır.
      </Sub>
      <CognitiveLoadCompare />
      <p className="mt-6 text-xs text-gray-500 text-center font-mono">
        Tufte&apos;nin data-ink ilkesi aslında bir biliş ilkesidir: veri taşımayan her mürekkep, izleyiciye yük olur.
      </p>
    </SlideShell>
  ),

  /* ───── 16. Uygulamalı alıştırma ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı alıştırma</Eyebrow>
      <H2>Bir grafiği &quot;algı&quot; gözüyle yeniden tasarla</H2>
      <Sub className="mt-3 max-w-3xl">
        Bir önceki haftalarda yaptığın panodaki tek bir grafiği seç ve bu haftanın ilkeleriyle
        elden geçir. Sonraki derse öncesi/sonrası iki ekran görüntüsüyle gel.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Eye, title: "Öndikkat vurgusu ekle", desc: "Anlatmak istediğin tek değeri yalnız bir öznitelikle (renk veya konum) öne çıkar.", accent: "#ef4444" },
          { icon: Ruler, title: "Kodlamayı yükselt", desc: "Kritik karşılaştırmayı pasta/alan yerine hizalı bara taşı; merdivenin üstüne çık.", accent: "#f59e0b" },
          { icon: Layers, title: "Gestalt + doğrudan etiket", desc: "Lejantı kaldır, serileri ucundan etiketle; ilişkili olanı yakınlaştır.", accent: "#34d399" },
          { icon: Gauge, title: "Dışsal yükü kes", desc: "Izgarayı, 3B'yi, gereksiz rengi sil. Kalan her öğenin veri taşıdığını doğrula.", accent: "#a78bfa" },
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
          <span className="text-white">Teslim:</span> öncesi/sonrası iki görsel + 3 cümlede &quot;hangi algı ilkesini
          neden uyguladım&quot; açıklaması. Tek grafik yeterli; amaç ilkeyi sahada uygulamak.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 17. Sık yapılan algı hataları ───── */
  () => (
    <SlideShell>
      <Eyebrow>Sahada sık görülen hatalar</Eyebrow>
      <H2>Algıyı yanıltan beş tasarım kararı</H2>
      <Sub className="mt-3 max-w-3xl">
        Bunlar &quot;estetik&quot; tercih değil, okuma doğruluğunu bozan kararlardır. Wireframe&apos;ini bu listeye karşı kontrol et.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 vg-card rounded-xl p-4"
      >
        <table className="vg-table">
          <thead>
            <tr>
              <th style={{ width: "26%" }}>Hata</th>
              <th style={{ width: "37%" }}>Algıya etkisi</th>
              <th>Çözüm</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold text-white">Sıfırdan başlamayan bar ekseni</td>
              <td>Uzunluk kanalı yanıltır; küçük fark devasa görünür.</td>
              <td>Bar grafiklerinde y eksenini 0&apos;dan başlat.</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">3B perspektif</td>
              <td>Alan ve açı çarpıtılır; arka dilimler küçülür.</td>
              <td>Düz (2B) çiz; derinliği at.</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Çok renkli &quot;gökkuşağı&quot;</td>
              <td>Her renk öndikkat çeker; vurgu kaybolur, yük artar.</td>
              <td>Tek vurgu rengi + nötr gri taban.</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Yalnız renge dayalı ayrım</td>
              <td>Renk körü izleyici sınıfları ayıramaz.</td>
              <td>Şekil/etiket/konumla yedekle.</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Uzak lejant</td>
              <td>Göz grafikle tablo arasında gidip gelir; bellek yorulur.</td>
              <td>Serileri doğrudan, yerinde etiketle.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 18. Sıradaki hafta önizleme + kapanış ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8"
          style={{ background: "linear-gradient(135deg,#ef4444,#f59e0b)", boxShadow: "0 30px 80px -20px rgba(239,68,68,0.6)" }}
        >
          <Activity className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>6. hafta tamamlandı · sıradaki: Grafik türleri derinlemesine</Eyebrow>
        <H1>
          <span className="vg-shimmer-amber">Doğru Soru · Doğru Grafik</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta &quot;göz neyi iyi okur&quot; dedik. Gelecek hafta bunu grafik türlerine bağlıyoruz:
          dağılım, ilişki, parça-bütün ve akış için hangi grafik, neden ve ne zaman.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
          <FeatureCard icon={Ruler} title="Dağılım" desc="Histogram, kutu grafiği, yoğunluk." accent="#ef4444" delay={0.1} />
          <FeatureCard icon={Crosshair} title="İlişki" desc="Scatter, korelasyon, kabarcık." accent="#34d399" delay={0.18} />
          <FeatureCard icon={Palette} title="Parça-bütün" desc="Yığılı bar, treemap; pastanın sınırı." accent="#a78bfa" delay={0.26} />
          <FeatureCard icon={Activity} title="Akış / zaman" desc="Çizgi, alan, eğim grafikleri." accent="#f59e0b" delay={0.34} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="vg-card rounded-xl p-5">
            <Calendar className="w-5 h-5 text-[#ef4444] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Ders saati</div>
            <div className="text-white font-semibold">Cuma</div>
            <div className="text-sm text-gray-400">11:45 — 15:10</div>
          </div>
          <div className="vg-card rounded-xl p-5">
            <Target className="w-5 h-5 text-[#a78bfa] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">Bir grafik seç</div>
            <div className="text-sm text-gray-400">yeniden tasarlanacak</div>
          </div>
          <div className="vg-card rounded-xl p-5">
            <Brain className="w-5 h-5 text-[#34d399] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">Öncesi / sonrası</div>
            <div className="text-sm text-gray-400">2 görsel + 3 cümle</div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 text-xs font-mono text-gray-600 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Önce algı, sonra estetik · grafiği gözün için tasarla</span>
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
            background: "linear-gradient(90deg, #ef4444, #f87171, #ef4444)",
            boxShadow: "0 0 16px rgba(239,68,68,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#ef4444]/70">
          BVA 2107 · 6. Hafta · Görsel Algı ve Biliş
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
