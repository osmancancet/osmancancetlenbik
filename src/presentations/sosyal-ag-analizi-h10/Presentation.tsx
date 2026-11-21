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
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  X,
  Code2,
  MousePointerClick,
  RotateCcw,
  Film,
  Users,
  Star,
  UserPlus,
  Link2,
  Unlink,
  TrendingUp,
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
        <div className="absolute inset-0 saa-grid-bg pointer-events-none" />
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
      className="inline-flex items-center gap-3 mb-6 text-xs font-mono uppercase tracking-[0.25em] text-[#14b8a6]"
    >
      <span className="w-8 h-px bg-[#14b8a6]" />
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
  accent = "#14b8a6",
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
      className="saa-card saa-card-hover rounded-xl p-6 transition-all"
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
        style={{
          background: `${accent}18`,
          border: `1px solid ${accent}50`,
        }}
      >
        <Icon className="w-6 h-6" style={{ color: accent }} />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

/* ============================================================
   ORTAK YARDIMCILAR — slayt kalıpları ve tıklanabilir bileşenler
   ============================================================ */

const BTN =
  "px-5 py-3 rounded-xl border text-base md:text-lg font-semibold transition-colors cursor-pointer";
const BTN_IDLE =
  "bg-white/5 border-[#14b8a6]/40 text-gray-100 hover:border-[#5eead4] hover:bg-[#14b8a6]/15";
const BTN_ON = "bg-[#14b8a6]/30 border-[#5eead4] text-white";
const BTN_OK = "bg-emerald-500/25 border-emerald-400 text-white";
const BTN_NO = "bg-red-500/25 border-red-400 text-white";

type CardInfo = { icon: LucideIcon; title: string; desc: string };
type ListInfo = { label: string; items: string[] };
type Question = { q: string; options: string[]; correct: number; why: string };
type GNode = { id: string; x: number; y: number };
type GEdge = [string, string];

/** Hocanın sınıfa yönelteceği tek soru — her içerik slaydının altında. */
function Ask({ children }: { children: ReactNode }) {
  return (
    <p className="mt-5 text-sm text-gray-500">
      <span className="font-mono text-xs uppercase tracking-widest text-[#14b8a6]/70 mr-2">
        Sınıfa sor:
      </span>
      {children}
    </p>
  );
}

/** Standart içerik slaydı: üst etiket + cümle başlık + ortada içerik + Sınıfa sor. */
function Frame({
  eyebrow,
  title,
  ask,
  children,
}: {
  eyebrow: string;
  title: string;
  ask: string;
  children: ReactNode;
}) {
  return (
    <SlideShell>
      <Eyebrow>{eyebrow}</Eyebrow>
      <H2 className="mb-6">{title}</H2>
      <div className="max-w-4xl mx-auto">
        {children}
        <Ask>{ask}</Ask>
      </div>
    </SlideShell>
  );
}

function Cover({
  week,
  title,
  sub,
  cards,
}: {
  week: string;
  title: [string, string];
  sub: string;
  cards: CardInfo[];
}) {
  return (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2105 · {week}. Hafta — Sosyal Ağ Analizi</Eyebrow>
        <H1 className="saa-shimmer">
          {title[0]}
          <br />
          {title[1]}
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">{sub}</Sub>
        <div className="mt-8 max-w-4xl mx-auto text-left">
          <CardRow cards={cards} />
        </div>
      </div>
    </SlideShell>
  );
}

function CardRow({ cards }: { cards: CardInfo[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((c, i) => (
        <FeatureCard
          key={c.title}
          icon={c.icon}
          title={c.title}
          desc={c.desc}
          delay={0.15 + i * 0.12}
        />
      ))}
    </div>
  );
}

/** Yan yana iki kısa liste (ör. geçen hafta / bu hafta). */
function TwoLists({ left, right }: { left: ListInfo; right: ListInfo }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {[left, right].map((l, i) => (
        <motion.div
          key={l.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + i * 0.15 }}
          className={`${i === 0 ? "saa-card" : "saa-card-teal"} rounded-xl p-5`}
        >
          <div className="text-xs font-mono uppercase tracking-widest text-[#5eead4] mb-3">
            {l.label}
          </div>
          <ul className="space-y-2.5 text-base md:text-lg text-gray-200">
            {l.items.map((t) => (
              <li key={t} className="flex gap-2">
                <ChevronRight className="w-5 h-5 mt-1 text-[#14b8a6] flex-shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}

/** Tahmin et → tıkla göster. */
function Reveal({
  hint = "Cevabı görmek için tıkla",
  children,
}: {
  hint?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      className={`w-full text-left rounded-xl p-6 transition-colors cursor-pointer ${
        open ? "saa-card-teal" : "saa-card saa-card-hover"
      }`}
    >
      {open ? (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="block text-lg md:text-xl text-gray-100 leading-relaxed"
        >
          {children}
        </motion.span>
      ) : (
        <span className="flex items-center gap-3 text-lg md:text-xl text-[#5eead4]">
          <MousePointerClick className="w-6 h-6" />
          {hint}
        </span>
      )}
    </button>
  );
}

/** Ön yüzde soru, tıklayınca arka yüzde cevap. */
function FlipCards({
  items,
}: {
  items: Array<{ tag: string; front: string; back: string }>;
}) {
  const [open, setOpen] = useState<number[]>([]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((it, i) => {
        const on = open.includes(i);
        return (
          <button
            key={it.tag}
            type="button"
            onClick={() =>
              setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]))
            }
            className={`text-left rounded-xl p-5 min-h-[190px] flex flex-col transition-colors cursor-pointer ${
              on ? "saa-card-teal" : "saa-card saa-card-hover"
            }`}
          >
            <span className="text-xs font-mono uppercase tracking-widest text-[#5eead4] mb-2">
              {it.tag}
            </span>
            <span className="text-lg font-semibold text-white leading-snug">
              {it.front}
            </span>
            {on ? (
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-base text-[#a7f3d0] leading-relaxed"
              >
                {it.back}
              </motion.span>
            ) : (
              <span className="mt-auto pt-3 flex items-center gap-2 text-sm text-gray-500">
                <MousePointerClick className="w-4 h-4" />
                tıkla, cevabı gör
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/** Mini sınav: doğru şık yeşil, yanlış kırmızı; doğruysa tek cümle açıklama. */
function Quiz({
  questions,
  row = false,
  unit = "Soru",
}: {
  questions: Question[];
  row?: boolean;
  unit?: string;
}) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const cur = questions[idx];
  const dogru = picked === cur.correct;
  const son = idx === questions.length - 1;
  return (
    <div className="saa-card rounded-xl p-5">
      {questions.length > 1 && (
        <div className="text-xs font-mono uppercase tracking-widest text-[#5eead4] mb-2">
          {unit} {idx + 1} / {questions.length}
        </div>
      )}
      <div className="text-xl md:text-2xl font-semibold text-white mb-4 leading-snug">
        {cur.q}
      </div>
      <div className={row ? "grid grid-cols-2 gap-3" : "grid grid-cols-1 gap-2.5"}>
        {cur.options.map((o, i) => (
          <button
            key={o}
            type="button"
            onClick={() => setPicked(i)}
            className={`${BTN} text-left ${
              picked === i ? (i === cur.correct ? BTN_OK : BTN_NO) : BTN_IDLE
            }`}
          >
            {o}
          </button>
        ))}
      </div>
      <div className="mt-4 min-h-[52px] flex items-center justify-between gap-4">
        <div className="text-base md:text-lg">
          {picked === null && (
            <span className="text-gray-500">Bir şıkka tıkla.</span>
          )}
          {picked !== null && !dogru && (
            <span className="text-red-300 flex items-center gap-2">
              <X className="w-5 h-5" /> Olmadı, bir daha dene.
            </span>
          )}
          {dogru && (
            <span className="text-emerald-300 flex items-start gap-2">
              <Check className="w-5 h-5 mt-1 flex-shrink-0" /> {cur.why}
            </span>
          )}
        </div>
        {questions.length > 1 && (
          <button
            type="button"
            onClick={() => {
              setIdx(son ? 0 : idx + 1);
              setPicked(null);
            }}
            className={`${BTN} ${BTN_IDLE} flex-shrink-0`}
          >
            {son ? "Baştan" : "Sıradaki"}
          </button>
        )}
      </div>
    </div>
  );
}

/** Adım adım açılan liste (etkinlik yönergesi). */
function Steps({ items }: { items: Array<{ t: string; d: string }> }) {
  const [n, setN] = useState(1);
  const bitti = n >= items.length;
  return (
    <div>
      <div className="space-y-2.5 min-h-[250px]">
        {items.slice(0, n).map((it, i) => (
          <motion.div
            key={it.t}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            className="saa-card rounded-xl px-4 py-3 flex items-center gap-4"
          >
            <div className="saa-tick w-9 h-9 flex items-center justify-center shrink-0 text-lg font-bold">
              {i + 1}
            </div>
            <div>
              <div className="text-lg font-semibold text-white">{it.t}</div>
              <div className="text-sm text-gray-400">{it.d}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setN(bitti ? 1 : n + 1)}
        className={`${BTN} ${BTN_IDLE} mt-4 inline-flex items-center gap-2`}
      >
        {bitti ? <RotateCcw className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        {bitti ? "Baştan göster" : `Sonraki adım (${n} / ${items.length})`}
      </button>
    </div>
  );
}

/** Tek, kısa Python örneği. "#" sonrası yorum olarak soluk yazılır. */
function CodeCard({ file, lines }: { file: string; lines: string[] }) {
  return (
    <div className="saa-window-chrome w-full">
      <div className="saa-window-bar flex items-center gap-2 px-4 py-2">
        <Code2 className="w-4 h-4 text-[#5eead4]" />
        <span className="text-xs font-mono text-[#5eead4]">{file}</span>
      </div>
      <pre className="saa-code px-6 py-4 overflow-x-auto m-0" style={{ fontSize: 16 }}>
        <code>
          {lines.map((ln, i) => {
            const k = ln.indexOf("#");
            return (
              <span key={i}>
                {k < 0 ? ln : ln.slice(0, k)}
                {k >= 0 && <span className="saa-code-cmt">{ln.slice(k)}</span>}
                {"\n"}
              </span>
            );
          })}
        </code>
      </pre>
    </div>
  );
}

/** Küçük ağ çizimi (SVG, 640 birim genişlik). Düğümler tıklanabilir olabilir. */
function Net({
  nodes,
  edges,
  h = 340,
  fill,
  radius,
  edgeColor,
  edgeWidth,
  faded,
  onNode,
}: {
  nodes: GNode[];
  edges: GEdge[];
  h?: number;
  fill?: (id: string) => string | undefined;
  radius?: (id: string) => number;
  edgeColor?: (a: string, b: string) => string | undefined;
  edgeWidth?: (a: string, b: string) => number;
  faded?: (id: string) => boolean;
  onNode?: (id: string) => void;
}) {
  const pos = new Map(nodes.map((n) => [n.id, n]));
  return (
    <svg viewBox={`0 0 640 ${h}`} className="w-full h-auto max-h-[40vh]">
      {edges.map(([a, b]) => {
        const p = pos.get(a);
        const q = pos.get(b);
        if (!p || !q) return null;
        const soluk = Boolean(faded?.(a)) || Boolean(faded?.(b));
        const renk = edgeColor?.(a, b) ?? "#5eead4";
        return (
          <line
            key={`${a}-${b}`}
            x1={p.x}
            y1={p.y}
            x2={q.x}
            y2={q.y}
            stroke={soluk ? "#475569" : renk}
            strokeWidth={edgeWidth?.(a, b) ?? 2.5}
            strokeOpacity={soluk ? 0.35 : 0.85}
            strokeDasharray={soluk ? "4 6" : undefined}
          />
        );
      })}
      {nodes.map((n) => {
        const r = radius?.(n.id) ?? 22;
        const soluk = Boolean(faded?.(n.id));
        return (
          <g
            key={n.id}
            onClick={onNode ? () => onNode(n.id) : undefined}
            style={{
              cursor: onNode ? "pointer" : "default",
              opacity: soluk ? 0.3 : 1,
              transition: "opacity 0.3s",
            }}
          >
            <circle cx={n.x} cy={n.y} r={r + 12} fill="transparent" />
            <circle
              cx={n.x}
              cy={n.y}
              r={r}
              fill={fill?.(n.id) ?? "#0f2a27"}
              stroke="#5eead4"
              strokeWidth={2}
              style={{ transition: "fill 0.3s" }}
            />
            <text
              x={n.x}
              y={n.y + r + 17}
              textAnchor="middle"
              fontSize={15}
              fontWeight={600}
              fill="#e5e7eb"
            >
              {n.id}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** Kapanış: Aklında kalsın — 3 şey + gelecek haftaya köprü. */
function Recap({ items, next }: { items: [string, string, string]; next: string }) {
  return (
    <SlideShell>
      <Eyebrow>Özet</Eyebrow>
      <H2 className="mb-6">Aklında kalsın: 3 şey</H2>
      <div className="max-w-4xl mx-auto">
        <div className="space-y-3">
          {items.map((t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.15 }}
              className="saa-card rounded-xl px-5 py-4 flex items-center gap-4"
            >
              <div className="saa-tick w-10 h-10 flex items-center justify-center shrink-0 text-xl font-bold">
                {i + 1}
              </div>
              <div className="text-lg md:text-xl text-gray-100">{t}</div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-5 saa-card-teal rounded-xl px-5 py-4 text-base md:text-lg text-gray-200"
        >
          <span className="text-[#5eead4] font-semibold">Gelecek hafta: </span>
          {next}
        </motion.div>
        <Ask>Bugünden aklında kalan tek cümle ne?</Ask>
      </div>
    </SlideShell>
  );
}

/* ============================================================
   10. HAFTA — ağın zamanla değişimi: veri ve etkileşimli bileşenler
   ============================================================ */

const HAFTALAR = ["1. hafta", "4. hafta", "8. hafta", "12. hafta"];
const HAFTA_NOT = [
  "Dönemin ilk haftası: yalnızca üç kişi birbirini tanıyor.",
  "Deniz ve Elif geldi. Ayşe ile Can, ortak arkadaşları Ali sayesinde tanıştı.",
  "Mert ve Naz geldi. Yeni gelenler eskilere bağlandı, ağ büyüdü.",
  "İki yeni bağ kuruldu. Ali ile Can artık görüşmüyor: o bağ koptu.",
];

const Z_KISI: Array<GNode & { from: number }> = [
  { id: "Ali", x: 130, y: 90, from: 0 },
  { id: "Ayşe", x: 300, y: 55, from: 0 },
  { id: "Can", x: 210, y: 230, from: 0 },
  { id: "Deniz", x: 400, y: 185, from: 1 },
  { id: "Elif", x: 520, y: 75, from: 1 },
  { id: "Mert", x: 540, y: 250, from: 2 },
  { id: "Naz", x: 350, y: 285, from: 2 },
];

const Z_BAG: Array<{ e: GEdge; from: number; to?: number }> = [
  { e: ["Ali", "Ayşe"], from: 0 },
  { e: ["Ali", "Can"], from: 0, to: 3 },
  { e: ["Ayşe", "Deniz"], from: 1 },
  { e: ["Deniz", "Elif"], from: 1 },
  { e: ["Ayşe", "Can"], from: 1 },
  { e: ["Deniz", "Mert"], from: 2 },
  { e: ["Can", "Naz"], from: 2 },
  { e: ["Ayşe", "Elif"], from: 2 },
  { e: ["Can", "Deniz"], from: 2 },
  { e: ["Deniz", "Naz"], from: 3 },
  { e: ["Elif", "Mert"], from: 3 },
];

/** Aynı ağın dört anı: hafta çipine tıkla. Yeni bağlar sarı görünür. */
function TimeNet() {
  const [t, setT] = useState(0);
  const kisiler = Z_KISI.filter((n) => n.from <= t);
  const baglar = Z_BAG.filter((b) => b.from <= t && (b.to === undefined || t < b.to));
  const yeni = (a: string, b: string) =>
    t > 0 && baglar.some((x) => x.from === t && x.e[0] === a && x.e[1] === b);
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-center">
      <div className="md:col-span-3 saa-card rounded-xl p-2">
        <Net
          nodes={kisiler}
          edges={baglar.map((b) => b.e)}
          fill={(id) =>
            t > 0 && Z_KISI.some((n) => n.id === id && n.from === t) ? "#fbbf24" : undefined
          }
          edgeColor={(a, b) => (yeni(a, b) ? "#fbbf24" : undefined)}
          edgeWidth={(a, b) => (yeni(a, b) ? 4 : 2.5)}
        />
      </div>
      <div className="md:col-span-2">
        <div className="text-sm text-gray-500 mb-2 flex items-center gap-2">
          <MousePointerClick className="w-4 h-4" /> Bir haftaya tıkla
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {HAFTALAR.map((ad, i) => (
            <button
              key={ad}
              type="button"
              onClick={() => setT(i)}
              className={`${BTN} ${t === i ? BTN_ON : BTN_IDLE}`}
            >
              {ad}
            </button>
          ))}
        </div>
        <div className="mt-4 saa-card-teal rounded-xl p-4 text-base md:text-lg text-gray-200 min-h-[130px]">
          <div className="font-semibold text-[#5eead4] mb-1">
            {kisiler.length} kişi · {baglar.length} bağ
          </div>
          {HAFTA_NOT[t]}
          {t > 0 && <span className="text-[#fbbf24]"> Sarı: bu dönemde yeni.</span>}
        </div>
      </div>
    </div>
  );
}

const U_KISI: GNode[] = [
  { id: "Ayşe", x: 80, y: 95 },
  { id: "Ali", x: 220, y: 55 },
  { id: "Can", x: 320, y: 175 },
  { id: "Deniz", x: 450, y: 75 },
  { id: "Elif", x: 560, y: 185 },
  { id: "Mert", x: 450, y: 275 },
];
const U_ILK: GEdge[] = [
  ["Ali", "Ayşe"],
  ["Ali", "Can"],
  ["Can", "Deniz"],
  ["Deniz", "Elif"],
  ["Elif", "Mert"],
];
const U_ADIM: Array<{ e: GEdge; ortak: string }> = [
  { e: ["Ayşe", "Can"], ortak: "Ali" },
  { e: ["Ali", "Deniz"], ortak: "Can" },
  { e: ["Can", "Elif"], ortak: "Deniz" },
  { e: ["Deniz", "Mert"], ortak: "Elif" },
];

/** Arkadaşımın arkadaşı: her tıklamada bir açık üçgen kapanır. */
function TriadDemo() {
  const [n, setN] = useState(0);
  const son = n > 0 ? U_ADIM[n - 1] : null;
  const baglar = [...U_ILK, ...U_ADIM.slice(0, n).map((a) => a.e)];
  const sonMu = (a: string, b: string) =>
    son !== null && son.e[0] === a && son.e[1] === b;
  const bitti = n === U_ADIM.length;
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-center">
      <div className="md:col-span-3 saa-card rounded-xl p-2">
        <Net
          nodes={U_KISI}
          edges={baglar}
          h={320}
          fill={(id) =>
            son === null
              ? undefined
              : id === son.ortak
                ? "#fbbf24"
                : son.e.includes(id)
                  ? "#14b8a6"
                  : undefined
          }
          edgeColor={(a, b) => (sonMu(a, b) ? "#fbbf24" : undefined)}
          edgeWidth={(a, b) => (sonMu(a, b) ? 4.5 : 2.5)}
        />
      </div>
      <div className="md:col-span-2">
        <div className="saa-card-teal rounded-xl p-4 text-base md:text-lg text-gray-200 min-h-[130px]">
          {son === null ? (
            <>Başlangıç: 6 kişi, 5 bağ. Sence ilk yeni arkadaşlık kimler arasında kurulur?</>
          ) : (
            <>
              <span className="text-[#5eead4] font-semibold">
                {son.e[0]} ile {son.e[1]}
              </span>{" "}
              tanıştı. Ortak arkadaşları:{" "}
              <span className="text-[#fbbf24] font-semibold">{son.ortak}</span>. Üçgen
              kapandı.
            </>
          )}
        </div>
        <button
          type="button"
          onClick={() => setN(bitti ? 0 : n + 1)}
          className={`${BTN} ${BTN_IDLE} mt-4 inline-flex items-center gap-2`}
        >
          {bitti ? <RotateCcw className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          {bitti ? "Baştan" : `İleri: yeni bağ (${n} / ${U_ADIM.length})`}
        </button>
      </div>
    </div>
  );
}

const P_ILK_KISI: GNode[] = [
  { id: "Zeynep", x: 320, y: 165 },
  { id: "Ali", x: 170, y: 85 },
  { id: "Ayşe", x: 170, y: 255 },
  { id: "Can", x: 470, y: 85 },
];
const P_ILK_BAG: GEdge[] = [
  ["Zeynep", "Ali"],
  ["Zeynep", "Ayşe"],
  ["Zeynep", "Can"],
  ["Ali", "Ayşe"],
];
const P_YENI: Array<GNode & { kime: string }> = [
  { id: "Yeni 1", x: 470, y: 255, kime: "Zeynep" },
  { id: "Yeni 2", x: 320, y: 35, kime: "Zeynep" },
  { id: "Yeni 3", x: 50, y: 165, kime: "Ali" },
  { id: "Yeni 4", x: 590, y: 165, kime: "Zeynep" },
  { id: "Yeni 5", x: 320, y: 290, kime: "Zeynep" },
];

/** Popüler olana bağlanma: her tıklamada sınıfa bir yeni kişi gelir. */
function GrowDemo() {
  const [n, setN] = useState(0);
  const gelen = P_YENI.slice(0, n);
  const kisiler: GNode[] = [...P_ILK_KISI, ...gelen];
  const baglar: GEdge[] = [...P_ILK_BAG, ...gelen.map((g): GEdge => [g.id, g.kime])];
  const derece = (id: string) => baglar.filter((e) => e.includes(id)).length;
  const son = n > 0 ? P_YENI[n - 1] : null;
  const bitti = n === P_YENI.length;
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-center">
      <div className="md:col-span-3 saa-card rounded-xl p-2">
        <Net
          nodes={kisiler}
          edges={baglar}
          radius={(id) => 12 + 3 * derece(id)}
          fill={(id) =>
            id === "Zeynep" ? "#14b8a6" : son !== null && id === son.id ? "#fbbf24" : undefined
          }
          edgeColor={(a) => (son !== null && a === son.id ? "#fbbf24" : undefined)}
        />
      </div>
      <div className="md:col-span-2">
        <div className="saa-card-teal rounded-xl p-4 text-base md:text-lg text-gray-200 min-h-[150px]">
          <div className="font-semibold text-[#5eead4] mb-1">
            Zeynep: {derece("Zeynep")} bağ · Ali: {derece("Ali")} bağ
          </div>
          {son === null && <>Zeynep sınıfın en çok tanınan kişisi. Daire büyüdükçe bağ sayısı artar.</>}
          {son !== null && !bitti && (
            <>
              {son.id}, <span className="text-[#fbbf24] font-semibold">{son.kime}</span> ile
              tanıştı.
            </>
          )}
          {bitti && <>Bu örnekte 5 yeni kişiden 4&apos;ü Zeynep&apos;i seçti. Popüler olan daha da popüler oldu.</>}
        </div>
        <button
          type="button"
          onClick={() => setN(bitti ? 0 : n + 1)}
          className={`${BTN} ${BTN_IDLE} mt-4 inline-flex items-center gap-2`}
        >
          {bitti ? <RotateCcw className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
          {bitti ? "Baştan" : "Yeni kişi gelsin"}
        </button>
      </div>
    </div>
  );
}

const CUBUKLAR: Array<{ ad: string; bag: number }> = [
  { ad: "Zeynep", bag: 7 },
  { ad: "Ali", bag: 3 },
  { ad: "Ayşe", bag: 2 },
  { ad: "Can", bag: 1 },
  { ad: "Yeni gelenlerin her biri", bag: 1 },
];

/** Az önceki ağın son hâli: kimin kaç bağı var? */
function HubBars() {
  return (
    <div className="saa-card rounded-xl p-5 space-y-3">
      {CUBUKLAR.map((c, i) => (
        <div key={c.ad} className="flex items-center gap-4">
          <div className="w-56 text-base md:text-lg text-gray-200 text-right">{c.ad}</div>
          <div className="flex-1">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(c.bag / 7) * 100}%` }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="h-7 rounded-md"
              style={{ background: i === 0 ? "#14b8a6" : "#134e4a", border: "1px solid #5eead4" }}
            />
          </div>
          <div className="w-16 text-lg font-semibold text-[#5eead4]">{c.bag} bağ</div>
        </div>
      ))}
    </div>
  );
}

const KURAL = ["Arkadaşımın arkadaşı", "Popüler olana bağlanma"];

/* ============================================================
   SLIDES — BVA 2105 · 10. Hafta · Ağ Dinamikleri ve Evrim
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  // 1 — Kapak
  () => (
    <Cover
      week="10"
      title={["Ağ Dinamikleri", "ve Evrim"]}
      sub="Ağ bir fotoğraf değil, bir filmdir: her hafta yeni kişiler gelir, yeni bağlar kurulur, bazı bağlar kopar."
      cards={[
        { icon: Film, title: "Ağ değişir", desc: "Bugünkü ağ, geçen ayki ağ değildir." },
        { icon: Users, title: "Ortak arkadaş", desc: "Arkadaşımın arkadaşı, arkadaşım olur." },
        { icon: Star, title: "Popüler olan", desc: "Yeni gelen, çok tanınan kişiye bağlanır." },
      ]}
    />
  ),

  // 2 — Köprü
  () => (
    <Frame
      eyebrow="9. haftadan 10. haftaya"
      title="Geçen hafta katmanlara, bu hafta zamana bakıyoruz"
      ask="Bu sınıfın arkadaşlık ağı dönemin ilk günü nasıldı?"
    >
      <TwoLists
        left={{
          label: "Geçen hafta",
          items: [
            "Aynı kişiler, farklı ilişki türleri: katmanlar.",
            "Ağa hep tek bir anda baktık.",
            "Sanki ağın bir fotoğrafını çektik.",
          ],
        }}
        right={{
          label: "Bu hafta",
          items: [
            "Ağ zamanla nasıl değişir?",
            "Yeni bağlar rastgele mi kurulur, bir kuralı var mı?",
            "İki basit kural öğreneceğiz.",
          ],
        }}
      />
    </Frame>
  ),

  // 3 — El kaldır
  () => (
    <Frame
      eyebrow="El kaldır"
      title="Dönem başında tanımadığın biri, şimdi arkadaşın mı?"
      ask="O kişiyle nasıl tanıştın: biri mi tanıştırdı, kendin mi buldun?"
    >
      <div className="saa-card rounded-xl p-5 mb-4 text-lg md:text-xl text-gray-200">
        Kaçınızın bu dönem tanıştığı, şimdi yazıştığı ya da takipleştiği biri var?
      </div>
      <Reveal hint="Eller kalktı mı? Yorumu görmek için tıkla">
        Demek ki sınıfın ağı dönem başında başkaydı, bugün başka. Ağın zamanla
        değişmesine <span className="text-[#5eead4] font-semibold">ağın evrimi</span>{" "}
        diyoruz.
      </Reveal>
    </Frame>
  ),

  // 4 — Oyna-gör: zaman
  () => (
    <Frame
      eyebrow="Oyna-gör"
      title="Ağ bir fotoğraf değil, bir filmdir"
      ask="8. haftadan 12. haftaya geçince ne değişti?"
    >
      <TimeNet />
    </Frame>
  ),

  // 5 — Kavram
  () => (
    <Frame
      eyebrow="Kavram"
      title="Bir ağda zamanla üç şey değişir"
      ask="Senin ağında bu dönem bunlardan hangisi oldu?"
    >
      <CardRow
        cards={[
          {
            icon: UserPlus,
            title: "Yeni kişi gelir",
            desc: "Sınıfa yeni öğrenci, uygulamaya yeni kullanıcı. Ağa bir düğüm eklenir.",
          },
          {
            icon: Link2,
            title: "Yeni bağ kurulur",
            desc: "İki kişi tanışır, takipleşir, yazışmaya başlar.",
          },
          {
            icon: Unlink,
            title: "Bağ kopar",
            desc: "Taşınma, mezuniyet, takipten çıkma. Ağ yalnız büyümez, eksilir de.",
          },
        ]}
      />
    </Frame>
  ),

  // 6 — Kural 1
  () => (
    <Frame
      eyebrow="1. kural · adım adım"
      title="Arkadaşımın arkadaşı, arkadaşım olur"
      ask="İleri'ye basmadan önce: sıradaki arkadaşlık kimler arasında kurulur?"
    >
      <TriadDemo />
    </Frame>
  ),

  // 7 — Kural 2
  () => (
    <Frame
      eyebrow="2. kural · oyna-gör"
      title="Yeni gelen, popüler olana bağlanır"
      ask="Düğmeye basmadan önce: yeni gelen sence kimle tanışacak?"
    >
      <GrowDemo />
    </Frame>
  ),

  // 8 — Günlük örnekler
  () => (
    <Frame
      eyebrow="Tahmin et"
      title="Popüler olan neden daha da popüler olur?"
      ask="Sen en son kimi, herkes takip ediyor diye takip ettin?"
    >
      <FlipCards
        items={[
          {
            tag: "Lokanta",
            front: "Yan yana iki lokanta: biri dolu, biri boş. Hangisine girersin?",
            back: "Çoğumuz dolu olana. Dolu olan böylece daha da dolar.",
          },
          {
            tag: "Video",
            front: "İki kanal aynı konuyu anlatıyor. Hangisi sana önerilir?",
            back: "Genellikle çok izleneni görürsün. O da daha çok abone kazanır.",
          },
          {
            tag: "Sınıf",
            front: "Yeni gelen öğrenci ilk gün kiminle tanışır?",
            back: "Çoğunlukla herkesin tanıdığı kişiyle. Onun çevresi bir kişi daha büyür.",
          },
        ]}
      />
    </Frame>
  ),

  // 9 — Sonuç
  () => (
    <Frame
      eyebrow="Sonuç"
      title="Birkaç dev, çok sayıda küçük düğüm oluşur"
      ask="Bu sınıfın ağında çok bağlantılı kişi kim olurdu?"
    >
      <HubBars />
      <div className="mt-4 saa-card-teal rounded-xl p-4 text-base md:text-lg text-gray-200">
        Çok bağlantılı düğüme{" "}
        <span className="text-[#5eead4] font-semibold">merkez düğüm (hub)</span> denir.
        Gerçek ağların çoğunda birkaç merkez, çok sayıda az bağlantılı düğüm vardır.
      </div>
    </Frame>
  ),

  // 10 — Hangi kural
  () => (
    <Frame
      eyebrow="Oyna-gör"
      title="Hangi kural çalışıyor?"
      ask="Kendi hayatından iki kurala birer örnek ver."
    >
      <Quiz
        row
        unit="Örnek"
        questions={[
          {
            q: "Kuzeninin ev arkadaşıyla bir doğum gününde tanıştın.",
            options: KURAL,
            correct: 0,
            why: "Sizi ortak tanıdığınız kuzenin buluşturdu.",
          },
          {
            q: "Yeni açtığın hesapla ilk iş çok ünlü bir futbolcuyu takip ettin.",
            options: KURAL,
            correct: 1,
            why: "Zaten çok takipçisi olan, bir takipçi daha kazandı.",
          },
          {
            q: "Uygulama, 12 ortak arkadaşınız olan birini önerdi.",
            options: KURAL,
            correct: 0,
            why: "Ortak arkadaş çoksa tanışma ihtimali yüksektir.",
          },
          {
            q: "Yeni bir oyuna başladın ve en kalabalık topluluğa katıldın.",
            options: KURAL,
            correct: 1,
            why: "Kalabalık olan seçildi ve daha da kalabalıklaştı.",
          },
          {
            q: "Sıra arkadaşının eski okul arkadaşıyla proje grubunda tanıştın.",
            options: KURAL,
            correct: 0,
            why: "Aradaki ortak kişi sıra arkadaşın.",
          },
        ]}
      />
    </Frame>
  ),

  // 11 — Ne işe yarar
  () => (
    <Frame
      eyebrow="Ne işe yarar?"
      title="Bu iki kuralla ağın yarınını tahmin ederiz"
      ask="Tanıyor olabileceğin kişiler listesi sence nasıl hazırlanıyor?"
    >
      <CardRow
        cards={[
          {
            icon: Users,
            title: "Arkadaş önerisi",
            desc: "Ortak arkadaşı çok olan iki kişi birbirine önerilir. Bu, 1. kuraldır.",
          },
          {
            icon: TrendingUp,
            title: "Kim büyüyecek?",
            desc: "Bugün çok bağlantısı olan, yarın büyük ihtimalle daha da büyür. Bu, 2. kuraldır.",
          },
          {
            icon: Unlink,
            title: "Kim kopuyor?",
            desc: "Bağları azalan müşteri ya da üye, ayrılmak üzere olabilir.",
          },
        ]}
      />
    </Frame>
  ),

  // 12 — Kod
  () => (
    <Frame
      eyebrow="Python · NetworkX"
      title="Ağa yeni bağ eklemek tek satırdır"
      ask="Son satır neden 4 ve 3 yazdı?"
    >
      <CodeCard
        file="ag_buyuyor.py"
        lines={[
          "import networkx as nx",
          "",
          'G = nx.Graph([("Ali", "Ayşe"), ("Ali", "Can")])   # 1. hafta: 2 bağ',
          "",
          'G.add_edge("Ayşe", "Can")     # arkadaşımın arkadaşı',
          'G.add_edge("Yeni", "Ali")     # yeni gelen, popüler olana',
          "",
          'print(G.number_of_edges(), G.degree("Ali"))   # 4 3',
        ]}
      />
    </Frame>
  ),

  // 13 — Sınıfta deneyelim
  () => (
    <Frame
      eyebrow="Sınıfta deneyelim · 10 dakika · tahta"
      title="Tahtada bir ağ büyütelim"
      ask="En çok bağ kimde toplandı? Neden o?"
    >
      <Steps
        items={[
          {
            t: "Dört gönüllü tahtaya adını yazsın",
            d: "Aralarına gerçek arkadaşlıklara göre birkaç çizgi çizelim.",
          },
          {
            t: "Sırayla gelin, adınızı yazıp tek bir kişiye bağlanın",
            d: "Kime bağlanacağına herkes kendi karar versin. 8-10 kişi yeter.",
          },
          {
            t: "Bağları sayalım",
            d: "En çok çizgi kimde? İlk dört kişiden biri mi?",
          },
          {
            t: "Açık üçgenleri bulalım",
            d: "Ortak arkadaşı olup da bağlı olmayan iki kişi var mı? Kesikli çizgiyle bağlayalım.",
          },
        ]}
      />
    </Frame>
  ),

  // 14 — Kendini dene
  () => (
    <Frame
      eyebrow="Kendini dene"
      title="Üç soruda bu hafta"
      ask="Hangi soruda kararsız kaldın?"
    >
      <Quiz
        questions={[
          {
            q: "Ağın evrimi ne demektir?",
            options: [
              "Ağın zamanla değişmesi: yeni kişi, yeni bağ, kopan bağ",
              "Ağın renkli çizilmesi",
              "Ağdaki en çok bağlantılı kişinin bulunması",
            ],
            correct: 0,
            why: "Ağ yerinde durmaz; evrim bu değişimin adıdır.",
          },
          {
            q: "Ayşe ile Can tanışmıyor ama ikisi de Ali'nin arkadaşı. Büyük ihtimalle ne olur?",
            options: [
              "Ali ikisiyle de bağını koparır",
              "Ayşe ile Can tanışır",
              "Hiçbir şey değişmez",
            ],
            correct: 1,
            why: "Arkadaşımın arkadaşı, arkadaşım olur: açık üçgen kapanır.",
          },
          {
            q: "Bir ağda neden birkaç kişi çok fazla bağlantıya sahip olur?",
            options: [
              "Çünkü ağlar hep eşit büyür",
              "Çünkü bağlar zamanla kopar",
              "Çünkü yeni gelenler çoğunlukla zaten popüler olana bağlanır",
            ],
            correct: 2,
            why: "Popüler olan her yeni gelenle biraz daha büyür.",
          },
        ]}
      />
    </Frame>
  ),

  // 15 — Özet
  () => (
    <Recap
      items={[
        "Ağ yerinde durmaz: yeni kişi gelir, yeni bağ kurulur, bazı bağlar kopar.",
        "Arkadaşımın arkadaşı, arkadaşım olur: ortak arkadaş yeni bağ kurdurur.",
        "Yeni gelen popüler olana bağlanır; böylece birkaç merkez düğüm oluşur.",
      ]}
      next="Ağın üstünde bir şeyler dolaşır: dedikodu, viral video, grip. Bunların kişiden kişiye nasıl yayıldığına bakacağız."
    />
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
            background: "linear-gradient(90deg, #14b8a6, #5eead4, #14b8a6)",
            boxShadow: "0 0 16px rgba(20,184,166,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#14b8a6]/70">
          BVA 2105 · 10. Hafta · Ağ Dinamikleri ve Evrim
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[#14b8a6]/50">
            <span className="text-[#14b8a6]">
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
            className="p-1.5 text-gray-500 hover:text-[#14b8a6] transition-colors"
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
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#14b8a6] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
                  ? "w-5 bg-[#14b8a6]"
                  : "w-1.5 bg-white/15 hover:bg-white/40"
              }`}
              style={
                i === current
                  ? { boxShadow: "0 0 10px rgba(20,184,166,0.6)" }
                  : undefined
              }
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#14b8a6] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        >
          Sonraki
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="absolute bottom-3 right-8 text-[11px] font-mono text-white/45 z-50 hidden md:flex items-center gap-2">
        <Keyboard className="w-3 h-3" />
        <span>← → · F · Esc</span>
      </div>
    </div>
  );
}
