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
  Layers3,
  Users,
  School,
  Network,
  Megaphone,
  Bus,
  UserPlus,
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
   9. HAFTA — çok katmanlı ağ: veri ve etkileşimli bileşenler
   ============================================================ */

const KISILER: GNode[] = [
  { id: "Ali", x: 320, y: 45 },
  { id: "Ayşe", x: 510, y: 105 },
  { id: "Can", x: 510, y: 225 },
  { id: "Deniz", x: 320, y: 280 },
  { id: "Elif", x: 130, y: 225 },
  { id: "Mert", x: 130, y: 105 },
];

const KATMANLAR: Array<{ ad: string; anlam: string; renk: string; kenarlar: GEdge[] }> = [
  {
    ad: "WhatsApp",
    anlam: "Bu hafta birebir yazışanlar",
    renk: "#34d399",
    kenarlar: [
      ["Ali", "Ayşe"],
      ["Ali", "Can"],
      ["Ali", "Deniz"],
      ["Ali", "Elif"],
      ["Can", "Deniz"],
    ],
  },
  {
    ad: "Instagram",
    anlam: "Karşılıklı takipleşenler",
    renk: "#f0abfc",
    kenarlar: [
      ["Ali", "Elif"],
      ["Ayşe", "Elif"],
      ["Can", "Elif"],
      ["Elif", "Mert"],
      ["Deniz", "Elif"],
      ["Ayşe", "Mert"],
      ["Can", "Deniz"],
    ],
  },
  {
    ad: "Sınıf",
    anlam: "Aynı proje grubunda çalışanlar",
    renk: "#93c5fd",
    kenarlar: [
      ["Can", "Deniz"],
      ["Deniz", "Mert"],
      ["Ayşe", "Deniz"],
      ["Can", "Mert"],
    ],
  },
];

const anahtar = (a: string, b: string) => [a, b].sort().join("|");

/** Aynı altı kişi: katman çipine tıkla, bağlar değişsin. */
function LayerExplorer() {
  const [k, setK] = useState(0);
  const hepsi = k === KATMANLAR.length;
  const sayim = new Map<string, number>();
  for (const kat of KATMANLAR)
    for (const [a, b] of kat.kenarlar)
      sayim.set(anahtar(a, b), (sayim.get(anahtar(a, b)) ?? 0) + 1);
  const kenarlar: GEdge[] = hepsi
    ? [...sayim.keys()].map((s) => s.split("|") as GEdge)
    : KATMANLAR[k].kenarlar;
  const derece = (id: string) => kenarlar.filter((e) => e.includes(id)).length;
  const enCok = Math.max(...KISILER.map((n) => derece(n.id)));
  const lider = KISILER.filter((n) => derece(n.id) === enCok).map((n) => n.id);
  const renk = hepsi ? "#5eead4" : KATMANLAR[k].renk;
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-center">
      <div className="md:col-span-3 saa-card rounded-xl p-2">
        <Net
          nodes={KISILER}
          edges={kenarlar}
          fill={(id) => (!hepsi && derece(id) === enCok ? renk : undefined)}
          edgeColor={(a, b) =>
            hepsi ? (sayim.get(anahtar(a, b)) === 3 ? "#fbbf24" : "#5eead4") : renk
          }
          edgeWidth={(a, b) => (hepsi ? (sayim.get(anahtar(a, b)) ?? 1) * 2.5 : 2.5)}
        />
      </div>
      <div className="md:col-span-2">
        <div className="text-sm text-gray-500 mb-2 flex items-center gap-2">
          <MousePointerClick className="w-4 h-4" /> Bir katmana tıkla
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {[...KATMANLAR.map((x) => x.ad), "Hepsi üst üste"].map((ad, i) => (
            <button
              key={ad}
              type="button"
              onClick={() => setK(i)}
              className={`${BTN} ${k === i ? BTN_ON : BTN_IDLE}`}
            >
              {ad}
            </button>
          ))}
        </div>
        <div className="mt-4 saa-card-teal rounded-xl p-4 text-base md:text-lg text-gray-200 min-h-[120px]">
          {hepsi ? (
            <>
              Kalın çizgi: aynı bağ birden çok katmanda var.{" "}
              <span className="text-[#fbbf24] font-semibold">Can ile Deniz</span> üç
              katmanda da bağlı.
            </>
          ) : (
            <>
              <span className="text-gray-400">{KATMANLAR[k].anlam}.</span>
              <br />
              En çok bağlantı:{" "}
              <span className="font-semibold" style={{ color: renk }}>
                {lider.join(", ")}
              </span>{" "}
              ({enCok} bağ)
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const SEVIYE_NOT = [
  "En altta öğrenciler var. Henüz hiçbir yere bağlamadık.",
  "Her öğrenci bir sınıfa aittir.",
  "Sınıflar bir bölüme aittir.",
  "Bölüm de okula aittir. Küçük olan, büyüğün içindedir.",
];

/** İç içe seviyeler: İleri düğmesiyle bir üst seviye eklenir. */
function NestedSteps() {
  const [adim, setAdim] = useState(0);
  const ogr = [70, 170, 270, 370, 470, 570];
  const sinif = [
    { x: 170, ad: "1-A" },
    { x: 470, ad: "1-B" },
  ];
  const kutu = (x: number, y: number, ad: string, w: number) => (
    <g key={ad}>
      <rect
        x={x - w / 2}
        y={y - 18}
        width={w}
        height={36}
        rx={8}
        fill="#134e4a"
        stroke="#5eead4"
        strokeWidth={2}
      />
      <text x={x} y={y + 5} textAnchor="middle" fontSize={15} fontWeight={700} fill="#fff">
        {ad}
      </text>
    </g>
  );
  const cizgi = (x1: number, y1: number, x2: number, y2: number) => (
    <line
      key={`${x1}-${y1}-${x2}`}
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#fbbf24"
      strokeWidth={2}
      strokeDasharray="5 4"
    />
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-center">
      <div className="md:col-span-3 saa-card rounded-xl p-2">
        <svg viewBox="0 0 640 320" className="w-full h-auto max-h-[40vh]">
          {adim >= 1 && ogr.map((x, i) => cizgi(x, 268, sinif[i < 3 ? 0 : 1].x, 198))}
          {adim >= 2 && sinif.map((s) => cizgi(s.x, 162, 320, 118))}
          {adim >= 3 && cizgi(320, 82, 320, 48)}
          {ogr.map((x) => (
            <circle key={x} cx={x} cy={285} r={17} fill="#0f2a27" stroke="#5eead4" strokeWidth={2} />
          ))}
          {adim >= 1 && sinif.map((s) => kutu(s.x, 180, s.ad, 90))}
          {adim >= 2 && kutu(320, 100, "Büyük Veri Analistliği", 230)}
          {adim >= 3 && kutu(320, 30, "MYO", 110)}
        </svg>
      </div>
      <div className="md:col-span-2">
        <div className="saa-card-teal rounded-xl p-4 text-base md:text-lg text-gray-200 min-h-[110px]">
          <div className="text-xs font-mono uppercase tracking-widest text-[#5eead4] mb-1">
            Adım {adim + 1} / 4
          </div>
          {SEVIYE_NOT[adim]}
        </div>
        <button
          type="button"
          onClick={() => setAdim(adim === 3 ? 0 : adim + 1)}
          className={`${BTN} ${BTN_IDLE} mt-4 inline-flex items-center gap-2`}
        >
          {adim === 3 ? <RotateCcw className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          {adim === 3 ? "Baştan" : "İleri: bir üst seviye"}
        </button>
      </div>
    </div>
  );
}

const SECENEK = ["Katman: aynı kişiler, başka ilişki", "Seviye: küçük, büyüğün içinde"];

/* ============================================================
   SLIDES — BVA 2105 · 9. Hafta · Çok Seviyeli Ağ Analizi
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  // 1 — Kapak
  () => (
    <Cover
      week="9"
      title={["Çok Seviyeli", "Ağ Analizi"]}
      sub="Aynı arkadaş grubu, tek bir ağ değildir: WhatsApp'ta ayrı, Instagram'da ayrı, sınıfta ayrı bağlar vardır."
      cards={[
        { icon: Layers3, title: "Katman", desc: "Aynı kişiler arasında tek bir ilişki türü." },
        { icon: Users, title: "Kim önemli?", desc: "Cevap, baktığın katmana göre değişir." },
        { icon: School, title: "Seviye", desc: "Öğrenci sınıfın, sınıf okulun içindedir." },
      ]}
    />
  ),

  // 2 — Köprü
  () => (
    <Frame
      eyebrow="Vizeden bu haftaya"
      title="Şimdiye kadar tek tür çizgi çizdik"
      ask="İki arkadaş arasında kaç farklı türde bağ olabilir?"
    >
      <TwoLists
        left={{
          label: "Vizeye kadar",
          items: [
            "Tek bir ilişki türü: yalnız arkadaşlık ya da yalnız takip.",
            "En çok bağlantılı kişiyi bulduk (merkezilik).",
            "Grupları bulduk (topluluk tespiti).",
          ],
        }}
        right={{
          label: "Bu hafta",
          items: [
            "Aynı kişiler arasında birden çok ilişki türü var.",
            "Her ilişki türünü ayrı bir katman olarak çizeceğiz.",
            "Katmanları yan yana koyup karşılaştıracağız.",
          ],
        }}
      />
    </Frame>
  ),

  // 3 — El kaldır
  () => (
    <Frame
      eyebrow="El kaldır"
      title="En yakın arkadaşınla kaç yerden bağlısın?"
      ask="Tek bir çizgi çizseydik hangi bağı çizmiş olurduk?"
    >
      <div className="saa-card rounded-xl p-5 mb-4 text-lg md:text-xl text-gray-200">
        Kaçınız en yakın arkadaşıyla hem WhatsApp&apos;ta yazışıyor, hem Instagram&apos;da
        takipleşiyor, hem de aynı sınıfta oturuyor?
      </div>
      <Reveal hint="Eller kalktı mı? Yorumu görmek için tıkla">
        Demek ki aynı iki kişi arasında{" "}
        <span className="text-[#5eead4] font-semibold">üç ayrı bağ</span> var. Tek çizgi
        çizersek ikisini kaybederiz. Çözüm: her ilişki türünü ayrı çizmek.
      </Reveal>
    </Frame>
  ),

  // 4 — Oyna-gör: katmanlar
  () => (
    <Frame
      eyebrow="Oyna-gör"
      title="Aynı altı kişi, üç ayrı ağ"
      ask="Katman değişince en çok bağlantılı kişi neden değişti?"
    >
      <LayerExplorer />
    </Frame>
  ),

  // 5 — Terim
  () => (
    <Frame
      eyebrow="Kavram"
      title="Katman, tek bir ilişki türünün ağıdır"
      ask="Bu arkadaş grubu için dördüncü katman ne olabilirdi?"
    >
      <CardRow
        cards={[
          {
            icon: Users,
            title: "Kişiler aynı",
            desc: "Ali her katmanda aynı Ali'dir. Değişen yalnızca bağlardır.",
          },
          {
            icon: Layers3,
            title: "Katman (layer)",
            desc: "Tek bir ilişki türünü gösteren ağ: yalnız WhatsApp ya da yalnız sınıf.",
          },
          {
            icon: Network,
            title: "Çok katmanlı ağ",
            desc: "Aynı kişilerin katmanlarının üst üste konmuş hâli. Bütün resmi verir.",
          },
        ]}
      />
    </Frame>
  ),

  // 6 — Tahmin et: kim önemli?
  () => (
    <Frame
      eyebrow="Tahmin et"
      title="Grubun en önemli kişisi kim?"
      ask="Sence hangisi grubun gerçek lideri? Neden?"
    >
      <FlipCards
        items={[
          {
            tag: "WhatsApp",
            front: "Yazışmalarda en çok bağlantısı olan kim?",
            back: "Ali: 4 kişiyle yazışıyor. Haber önce ona ulaşır.",
          },
          {
            tag: "Instagram",
            front: "Takipleşmede en çok bağlantısı olan kim?",
            back: "Elif: 5 kişiyle takipleşiyor. Ama WhatsApp'ta tek bağı var.",
          },
          {
            tag: "Sınıf",
            front: "Proje grubunda en çok bağlantısı olan kim?",
            back: "Deniz: 3 kişiyle çalışıyor. Ali'nin bu katmanda hiç bağı yok.",
          },
        ]}
      />
    </Frame>
  ),

  // 7 — Mini sınav: güçlü bağ
  () => (
    <Frame
      eyebrow="Mini sınav"
      title="Aynı bağ çok katmanda varsa güçlüdür"
      ask="Senin üç katmanda da bağlı olduğun biri var mı?"
    >
      <Quiz
        questions={[
          {
            q: "Hangi ikilinin arasındaki ilişki en güçlüdür?",
            options: [
              "Ali ile Ayşe: yalnız WhatsApp'ta bağlılar",
              "Can ile Deniz: WhatsApp, Instagram ve sınıfta bağlılar",
              "Ayşe ile Mert: yalnız Instagram'da bağlılar",
            ],
            correct: 1,
            why: "Üç katmanda da bağlı olanlar birbirine birçok yoldan ulaşır.",
          },
        ]}
      />
    </Frame>
  ),

  // 8 — İç içe seviyeler
  () => (
    <Frame
      eyebrow="İkinci yapı · adım adım"
      title="Seviyede küçük, büyüğün içindedir"
      ask="Okulun üstüne bir seviye daha koysak ne yazardık?"
    >
      <NestedSteps />
    </Frame>
  ),

  // 9 — Katman mı seviye mi
  () => (
    <Frame
      eyebrow="Oyna-gör"
      title="Katman mı, seviye mi?"
      ask="Kendi hayatından bir katman, bir de seviye örneği ver."
    >
      <Quiz
        row
        unit="Örnek"
        questions={[
          {
            q: "Aynı çalışanlar: kim kime e-posta atıyor, kim kiminle öğle yemeği yiyor?",
            options: SECENEK,
            correct: 0,
            why: "Kişiler aynı, ilişki türü farklı: iki katman.",
          },
          {
            q: "Oyuncu, takım, lig.",
            options: SECENEK,
            correct: 1,
            why: "Oyuncu takımın, takım ligin içinde: iç içe seviyeler.",
          },
          {
            q: "Aynı duraklar: otobüs hatları ve minibüs hatları.",
            options: SECENEK,
            correct: 0,
            why: "Duraklar aynı, hat türü farklı: iki katman.",
          },
          {
            q: "Mahalle, ilçe, il.",
            options: SECENEK,
            correct: 1,
            why: "Mahalle ilçenin, ilçe ilin içinde: iç içe seviyeler.",
          },
          {
            q: "Aynı sınıf: kim kiminle oturuyor, kim kiminle oyun oynuyor?",
            options: SECENEK,
            correct: 0,
            why: "Öğrenciler aynı, ilişki türü farklı: iki katman.",
          },
        ]}
      />
    </Frame>
  ),

  // 10 — Ne işe yarar
  () => (
    <Frame
      eyebrow="Ne işe yarar?"
      title="Tek katmana bakan, birini kaçırır"
      ask="Sınıfa bir duyuruyu hangi katmandan yapardın? Neden?"
    >
      <CardRow
        cards={[
          {
            icon: Megaphone,
            title: "Duyuru yapmak",
            desc: "Haberi WhatsApp'tan yayacaksan Ali'ye, Instagram'dan yayacaksan Elif'e söylersin.",
          },
          {
            icon: Bus,
            title: "Şehir ulaşımı",
            desc: "Otobüs ve minibüs ayrı katmandır. Yolcu ikisini birlikte kullanır.",
          },
          {
            icon: UserPlus,
            title: "Arkadaş önerisi",
            desc: "Sınıfta birlikte çalışıp takipleşmeyen iki kişi, iyi bir öneri adayıdır.",
          },
        ]}
      />
    </Frame>
  ),

  // 11 — Kod
  () => (
    <Frame
      eyebrow="Python · NetworkX"
      title="Her katmanı ayrı bir ağ olarak tutarız"
      ask="Ali'nin iki katmandaki bağlantı sayısı neden farklı çıktı?"
    >
      <CodeCard
        file="katmanlar.py"
        lines={[
          "import networkx as nx",
          "",
          'whatsapp  = nx.Graph([("Ali", "Ayşe"), ("Ali", "Can"), ("Can", "Deniz")])',
          'instagram = nx.Graph([("Elif", "Ali"), ("Elif", "Can"), ("Can", "Deniz")])',
          "",
          'print(whatsapp.degree("Ali"))     # 2 → WhatsApp katmanında 2 bağ',
          'print(instagram.degree("Ali"))    # 1 → Instagram katmanında 1 bağ',
        ]}
      />
    </Frame>
  ),

  // 12 — Sınıfta deneyelim
  () => (
    <Frame
      eyebrow="Sınıfta deneyelim · 10 dakika · kağıt ve kalem"
      title="Kendi grubunun üç katmanını çiz"
      ask="Hangi katmanda en çok bağlantı sende çıktı?"
    >
      <Steps
        items={[
          {
            t: "4-5 kişilik grup ol",
            d: "İsimleri bir kağıda üç kez, daire biçiminde yaz: üç ayrı katman.",
          },
          {
            t: "Bağları çiz",
            d: "1: WhatsApp'ta bu hafta yazışanlar · 2: Instagram'da takipleşenler · 3: Yan yana oturanlar.",
          },
          {
            t: "Her katmanda en çok bağlantılı kişiyi yuvarlak içine al",
            d: "Üç katmanda aynı kişi mi çıktı?",
          },
          {
            t: "Üç katmanda da geçen bağı bul",
            d: "Varsa kalın çiz: grubun en güçlü ilişkisi o.",
          },
        ]}
      />
    </Frame>
  ),

  // 13 — Kendini dene
  () => (
    <Frame
      eyebrow="Kendini dene"
      title="Üç soruda bu hafta"
      ask="Hangi soruda kararsız kaldın?"
    >
      <Quiz
        questions={[
          {
            q: "Çok katmanlı ağda katmanlar arasında ne aynı kalır?",
            options: ["Kişiler (düğümler)", "Bağlar (çizgiler)", "En çok bağlantılı kişi"],
            correct: 0,
            why: "Kişiler aynıdır; her katmanda yalnız bağlar değişir.",
          },
          {
            q: "Ali WhatsApp'ta 4, sınıf katmanında 0 bağa sahip. Ne söyleyebiliriz?",
            options: [
              "Ali her yerde önemlidir",
              "Ali hiç önemli değildir",
              "Ali'nin önemi katmana göre değişir",
            ],
            correct: 2,
            why: "Önem tek bir sayı değildir; hangi ilişkiye baktığına bağlıdır.",
          },
          {
            q: "Hangisi katman değil, iç içe seviye örneğidir?",
            options: [
              "Aynı kişilerin WhatsApp ve Instagram bağları",
              "Öğrenci, sınıf, bölüm, okul",
              "Aynı durakların otobüs ve minibüs hatları",
            ],
            correct: 1,
            why: "Öğrenci sınıfın, sınıf bölümün içindedir: küçük, büyüğün içinde.",
          },
        ]}
      />
    </Frame>
  ),

  // 14 — Özet
  () => (
    <Recap
      items={[
        "Aynı kişiler arasında birden çok ilişki türü vardır; her biri ayrı bir katmandır.",
        "Kimin önemli olduğu, baktığın katmana göre değişir.",
        "Katman: aynı kişiler, başka ilişki. Seviye: küçük, büyüğün içinde.",
      ]}
      next="Ağlar yerinde durmaz. Yeni kişiler gelir, yeni bağlar kurulur: ağın zamanla nasıl değiştiğine bakacağız."
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
          BVA 2105 · 9. Hafta · Çok Seviyeli Ağ Analizi
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
