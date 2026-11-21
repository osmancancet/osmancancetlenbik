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
  Share2,
  Target,
  HeartPulse,
  Zap,
  Clock,
  Megaphone,
  ShieldAlert,
  Syringe,
  type LucideIcon,
} from "lucide-react";
import "./styles.css";

/* ============================================================
   PRIMITIVES  (h01 ile birebir aynı)
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
   11. HAFTA — yayılım: veri ve etkileşimli bileşenler
   ============================================================ */

const Y_KISI: GNode[] = [
  { id: "Deniz", x: 300, y: 160 },
  { id: "Ali", x: 160, y: 60 },
  { id: "Ayşe", x: 90, y: 190 },
  { id: "Can", x: 240, y: 272 },
  { id: "Ozan", x: 80, y: 295 },
  { id: "Elif", x: 450, y: 120 },
  { id: "Mert", x: 570, y: 55 },
  { id: "Naz", x: 560, y: 235 },
];
const Y_BAG: GEdge[] = [
  ["Deniz", "Ali"],
  ["Deniz", "Ayşe"],
  ["Deniz", "Can"],
  ["Deniz", "Elif"],
  ["Ali", "Ayşe"],
  ["Elif", "Mert"],
  ["Elif", "Naz"],
  ["Can", "Ozan"],
];
const komsular = (id: string) =>
  Y_BAG.filter((e) => e.includes(id)).map((e) => (e[0] === id ? e[1] : e[0]));

/** Dedikodu yayılımı: bir kişiye tıkla, sonra adım adım ilerlet. */
function SpreadDemo() {
  const [ilk, setIlk] = useState<string | null>(null);
  const [bilen, setBilen] = useState<string[]>([]);
  const [adim, setAdim] = useState(0);
  const [skor, setSkor] = useState<Record<string, number>>({});
  const herkes = bilen.length === Y_KISI.length;

  function ilerle() {
    if (ilk === null || herkes) return;
    const yeni = new Set(bilen);
    for (const b of bilen) for (const k of komsular(b)) yeni.add(k);
    setBilen([...yeni]);
    setAdim(adim + 1);
    if (yeni.size === Y_KISI.length) setSkor({ ...skor, [ilk]: adim + 1 });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-center">
      <div className="md:col-span-3 saa-card rounded-xl p-2">
        <Net
          nodes={Y_KISI}
          edges={Y_BAG}
          h={345}
          fill={(id) => (id === ilk ? "#f97316" : bilen.includes(id) ? "#fbbf24" : undefined)}
          onNode={
            ilk === null
              ? (id) => {
                  setIlk(id);
                  setBilen([id]);
                  setAdim(0);
                }
              : undefined
          }
        />
      </div>
      <div className="md:col-span-2">
        <div className="saa-card-teal rounded-xl p-4 text-base md:text-lg text-gray-200 min-h-[112px]">
          {ilk === null && (
            <span className="flex items-start gap-2 text-[#5eead4]">
              <MousePointerClick className="w-6 h-6 flex-shrink-0" />
              Bir kişiye tıkla: haberi ilk o duysun.
            </span>
          )}
          {ilk !== null && (
            <>
              <div className="font-semibold text-[#fbbf24]">
                {adim}. adım · {bilen.length} / {Y_KISI.length} kişi biliyor
              </div>
              {herkes
                ? `${ilk} ile başlayınca herkes ${adim} adımda duydu.`
                : "Bilen herkes, haberi bağlı olduğu kişilere söyler."}
            </>
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={ilerle}
            disabled={ilk === null || herkes}
            className={`${BTN} ${BTN_IDLE} disabled:opacity-30 inline-flex items-center gap-2`}
          >
            <ChevronRight className="w-5 h-5" /> Bir adım ilerle
          </button>
          <button
            type="button"
            onClick={() => {
              setIlk(null);
              setBilen([]);
              setAdim(0);
            }}
            className={`${BTN} ${BTN_IDLE} inline-flex items-center gap-2`}
          >
            <RotateCcw className="w-5 h-5" /> Başkası
          </button>
        </div>
        <div className="mt-3 text-base text-gray-300 min-h-[52px]">
          <span className="text-xs font-mono uppercase tracking-widest text-[#5eead4] mr-2">
            Denenenler:
          </span>
          {Object.keys(skor).length === 0
            ? "henüz yok"
            : Object.entries(skor)
                .sort((a, b) => a[1] - b[1])
                .map(([k, v]) => `${k} ${v} adım`)
                .join(" · ")}
        </div>
      </div>
    </div>
  );
}

type Durum = "S" | "I" | "R";
const ASI_SECENEK: Array<{ ad: string; kim: string | null }> = [
  { ad: "Aşı yok", kim: null },
  { ad: "Deniz aşılı", kim: "Deniz" },
  { ad: "Naz aşılı", kim: "Naz" },
];
const ilkDurum = (): Record<string, Durum> =>
  Object.fromEntries(Y_KISI.map((n) => [n.id, n.id === "Can" ? "I" : "S"]));

/** Grip: sağlıklı → hasta → iyileşmiş. İlk hasta Can. İstenirse bir kişi aşılı. */
function SirDemo({ asiSecimi = false }: { asiSecimi?: boolean }) {
  const [asili, setAsili] = useState<string | null>(null);
  const [durum, setDurum] = useState<Record<string, Durum>>(ilkDurum);
  const [gun, setGun] = useState(0);
  const say = (d: Durum) => Y_KISI.filter((n) => durum[n.id] === d && n.id !== asili).length;
  const bitti = say("I") === 0;

  function sifirla(kim: string | null) {
    setAsili(kim);
    setDurum(ilkDurum());
    setGun(0);
  }
  function ilerle() {
    const yeni = { ...durum };
    for (const n of Y_KISI) {
      if (durum[n.id] !== "I") continue;
      yeni[n.id] = "R";
      for (const k of komsular(n.id))
        if (durum[k] === "S" && k !== asili) yeni[k] = "I";
    }
    setDurum(yeni);
    setGun(gun + 1);
  }

  const kutular: Array<{ ad: string; n: number; renk: string }> = [
    { ad: "Sağlıklı", n: say("S"), renk: "#5eead4" },
    { ad: "Hasta", n: say("I"), renk: "#f87171" },
    { ad: "İyileşmiş", n: say("R"), renk: "#a78bfa" },
  ];
  return (
    <div>
      {asiSecimi && (
        <div className="flex gap-2.5 mb-3">
          {ASI_SECENEK.map((s) => (
            <button
              key={s.ad}
              type="button"
              onClick={() => sifirla(s.kim)}
              className={`${BTN} ${asili === s.kim ? BTN_ON : BTN_IDLE}`}
            >
              {s.ad}
            </button>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-center">
        <div className="md:col-span-3 saa-card rounded-xl p-2">
          <Net
            nodes={Y_KISI}
            edges={Y_BAG}
            h={345}
            fill={(id) =>
              id === asili
                ? "#60a5fa"
                : durum[id] === "I"
                  ? "#f87171"
                  : durum[id] === "R"
                    ? "#a78bfa"
                    : undefined
            }
          />
        </div>
        <div className="md:col-span-2">
          <div className="flex items-stretch gap-1.5">
            {kutular.map((k, i) => (
              <div key={k.ad} className="flex items-center gap-1.5 flex-1">
                <div
                  className="flex-1 rounded-lg px-2 py-2 text-center"
                  style={{ border: `2px solid ${k.renk}`, background: `${k.renk}18` }}
                >
                  <div className="text-2xl font-bold" style={{ color: k.renk }}>
                    {k.n}
                  </div>
                  <div className="text-xs text-gray-300">{k.ad}</div>
                </div>
                {i < 2 && <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />}
              </div>
            ))}
          </div>
          <div className="mt-3 saa-card-teal rounded-xl p-4 text-base md:text-lg text-gray-200 min-h-[104px]">
            <div className="font-semibold text-[#5eead4]">{gun}. gün</div>
            {bitti
              ? `Salgın bitti: ${Y_KISI.length} kişiden ${say("R")} kişi hastalandı.`
              : "Hasta olan komşularına bulaştırır, ertesi gün iyileşir."}
            {asili !== null && <span className="text-[#93c5fd]"> Mavi: {asili} aşılı.</span>}
          </div>
          <div className="mt-3 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={ilerle}
              disabled={bitti}
              className={`${BTN} ${BTN_IDLE} disabled:opacity-30 inline-flex items-center gap-2`}
            >
              <ChevronRight className="w-5 h-5" /> Bir gün ilerle
            </button>
            <button
              type="button"
              onClick={() => sifirla(asili)}
              className={`${BTN} ${BTN_IDLE} inline-flex items-center gap-2`}
            >
              <RotateCcw className="w-5 h-5" /> Baştan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const TEMAS = ["Bir kişiden duymak yeter", "Birkaç arkadaşım yapmalı"];

/* ============================================================
   SLIDES — BVA 2105 · 11. Hafta · Ağlarda Etki ve Yayılım
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  // 1 — Kapak
  () => (
    <Cover
      week="11"
      title={["Ağlarda Etki", "ve Yayılım"]}
      sub="Dedikodu, viral video ve grip aynı yoldan yayılır: kişiden kişiye, bağların üzerinden."
      cards={[
        { icon: Share2, title: "Adım adım", desc: "Bilen, bağlı olduğu kişilere söyler." },
        { icon: Target, title: "İlk kime?", desc: "Başlangıç kişisi hızı belirler." },
        { icon: HeartPulse, title: "Grip", desc: "Sağlıklı, hasta, iyileşmiş: üç kutu." },
      ]}
    />
  ),

  // 2 — Köprü
  () => (
    <Frame
      eyebrow="10. haftadan 11. haftaya"
      title="Ağ kuruldu; şimdi üstünde bir şey dolaşıyor"
      ask="Bu sınıfta en son ne yayıldı: bir haber mi, bir video mu?"
    >
      <TwoLists
        left={{
          label: "Geçen hafta",
          items: [
            "Ağ zamanla büyür ve değişir.",
            "Arkadaşımın arkadaşı, arkadaşım olur.",
            "Yeni gelen, popüler olana bağlanır.",
          ],
        }}
        right={{
          label: "Bu hafta",
          items: [
            "Bağlar yerinde; üstünden haber, video, hastalık geçiyor.",
            "Bir şey ağda kişiden kişiye nasıl yayılır?",
            "İlk kime söylersek en hızlı yayılır?",
          ],
        }}
      />
    </Frame>
  ),

  // 3 — El kaldır
  () => (
    <Frame
      eyebrow="El kaldır"
      title="Bu hafta kime, ne ilettin?"
      ask="İlettiğin şey sana kimden gelmişti?"
    >
      <div className="saa-card rounded-xl p-5 mb-4 text-lg md:text-xl text-gray-200">
        Kaçınız bu hafta bir videoyu, bir haberi ya da bir duyuruyu bir arkadaşına
        iletti?
      </div>
      <Reveal hint="Eller kalktı mı? Yorumu görmek için tıkla">
        Her iletme bir bağın üzerinden geçti: sen aldın, bir başkasına verdin. Bir şeyin
        ağda kişiden kişiye geçmesine{" "}
        <span className="text-[#5eead4] font-semibold">yayılım</span> diyoruz.
      </Reveal>
    </Frame>
  ),

  // 4 — Üç örnek
  () => (
    <Frame
      eyebrow="Tahmin et"
      title="Dedikodu, video ve grip aynı yoldan yayılır"
      ask="Hiç bağı olmayan iki kişi arasında bunlar yayılır mı?"
    >
      <FlipCards
        items={[
          {
            tag: "Dedikodu",
            front: "Sınıftaki bir dedikodu kimden kime geçer?",
            back: "Konuşan kişiler arasında. Bağ: arkadaşlık, sohbet.",
          },
          {
            tag: "Viral video",
            front: "Bir video milyonlara nasıl ulaşır?",
            back: "Gören, takipçilerine ve gruplarına iletir. Bağ: takip, mesaj.",
          },
          {
            tag: "Grip",
            front: "Grip sınıfta kimden kime bulaşır?",
            back: "Yakın duran, aynı ortamı paylaşan kişiler arasında. Bağ: yakın temas.",
          },
        ]}
      />
    </Frame>
  ),

  // 5 — Oyna-gör: yayılım
  () => (
    <Frame
      eyebrow="Oyna-gör"
      title="İlk kime söylersen en hızlı yayılır?"
      ask="Tıklamadan önce: sen kimi seçerdin, neden?"
    >
      <SpreadDemo />
    </Frame>
  ),

  // 6 — Kavram
  () => (
    <Frame
      eyebrow="Kavram"
      title="İlk söylenen kişi, sonucu belirler"
      ask="Ozan'dan başlayınca yayılım neden 4 adım sürdü?"
    >
      <CardRow
        cards={[
          {
            icon: Target,
            title: "Başlangıç kişisi",
            desc: "Haberi ilk duyan kişi. İngilizcede seed, yani tohum denir.",
          },
          {
            icon: Zap,
            title: "Ortadaki hızlıdır",
            desc: "Deniz 4 kişiye bağlı ve herkese yakın. Ondan başlayınca 2 adım yetti.",
          },
          {
            icon: Clock,
            title: "Kenardaki yavaştır",
            desc: "Ozan'ın tek bağı var. Haber önce ortaya ulaşmak zorunda: 4 adım.",
          },
        ]}
      />
    </Frame>
  ),

  // 7 — Mini sınav
  () => (
    <Frame
      eyebrow="Mini sınav"
      title="Tek bir kişiye bedava kahve vereceksin"
      ask="Çok takipçisi olan ama ağın kenarında duran biri işe yarar mı?"
    >
      <Quiz
        questions={[
          {
            q: "Yeni açılan kafeyi az önceki arkadaş grubuna duyurmak istiyorsun. Kimi seçersin?",
            options: [
              "Ozan: kenarda, tek arkadaşı var",
              "Deniz: ortada, dört arkadaşı var",
              "Fark etmez, rastgele biri",
            ],
            correct: 1,
            why: "Deniz haberi ilk adımda dört kişiye, ikinci adımda herkese ulaştırır.",
          },
        ]}
      />
    </Frame>
  ),

  // 8 — SIR kutuları
  () => (
    <Frame
      eyebrow="Adım adım"
      title="Grip farklıdır: hasta olan iyileşir"
      ask="İyileşen kişi yayılım zincirini neden durdurur?"
    >
      <SirDemo />
    </Frame>
  ),

  // 9 — Aşı
  () => (
    <Frame
      eyebrow="Oyna-gör"
      title="Ortadakini korursan salgın yarıda kalır"
      ask="Elinde tek bir aşı olsa kime yapardın?"
    >
      <SirDemo asiSecimi />
    </Frame>
  ),

  // 10 — Tek temas mı
  () => (
    <Frame
      eyebrow="Oyna-gör"
      title="Tek kişiden duymak yeter mi?"
      ask="Sen en son, kaç arkadaşın yaptığı için bir şeye başladın?"
    >
      <Quiz
        row
        unit="Örnek"
        questions={[
          {
            q: "Grip",
            options: TEMAS,
            correct: 0,
            why: "Tek bir hasta kişiyle yakın temas bulaşma için yetebilir.",
          },
          {
            q: "Komik bir video bağlantısı",
            options: TEMAS,
            correct: 0,
            why: "Bir kişi gönderir, izlersin. İkna olmana gerek yok.",
          },
          {
            q: "Herkes bir uygulamadayken başka bir mesajlaşma uygulamasına geçmek",
            options: TEMAS,
            correct: 1,
            why: "Arkadaşların orada değilse geçmenin anlamı olmaz.",
          },
          {
            q: "Spor salonuna yazılmak",
            options: TEMAS,
            correct: 1,
            why: "Çoğumuz çevremizde birkaç kişi başlayınca ikna oluruz.",
          },
          {
            q: "Bir dedikodu",
            options: TEMAS,
            correct: 0,
            why: "Bir kişiden duyman yeter; artık sen de biliyorsun.",
          },
        ]}
      />
    </Frame>
  ),

  // 11 — Ne işe yarar
  () => (
    <Frame
      eyebrow="Ne işe yarar?"
      title="Yayılımı bilen, hızlandırır ya da durdurur"
      ask="Yalan bir haberi durdurmak için önce kime ulaşırdın?"
    >
      <CardRow
        cards={[
          {
            icon: Megaphone,
            title: "Tanıtım",
            desc: "Ürünü ortadaki, çok bağlantılı kişilere ulaştır; gerisini ağ yapar.",
          },
          {
            icon: ShieldAlert,
            title: "Yalan haber",
            desc: "Düzeltmeyi, haberi en çok yayan kişilere ulaştırmak işi kolaylaştırır.",
          },
          {
            icon: Syringe,
            title: "Salgın",
            desc: "Çok kişiyle teması olanları korumak, zinciri erken kırar.",
          },
        ]}
      />
    </Frame>
  ),

  // 12 — Kod
  () => (
    <Frame
      eyebrow="Python · NetworkX"
      title="Kim, kaçıncı adımda duyar?"
      ask="Ozan haberi neden 2. adımda duyuyor?"
    >
      <CodeCard
        file="yayilim.py"
        lines={[
          "import networkx as nx",
          "",
          'G = nx.Graph([("Deniz", "Ali"), ("Deniz", "Can"), ("Can", "Ozan")])',
          "",
          'print(list(G.neighbors("Deniz")))               # Ali, Can → 1. adımda duyanlar',
          'adimlar = nx.shortest_path_length(G, "Deniz")   # kim kaçıncı adımda duyar?',
          'print(adimlar["Ozan"])                          # 2',
        ]}
      />
    </Frame>
  ),

  // 13 — Sınıfta deneyelim
  () => (
    <Frame
      eyebrow="Sınıfta deneyelim · 10 dakika · araç gerekmez"
      title="Sınıfta bir haber yayalım"
      ask="Köşeden başlayınca neden daha uzun sürdü?"
    >
      <Steps
        items={[
          {
            t: "Komşularını belirle",
            d: "Önündeki, arkandaki ve yanındaki kişiler senin bağların.",
          },
          {
            t: "Ortadan biri ayağa kalksın: haberi o duydu",
            d: "Her adımda ayaktakilerin komşuları da kalkar. Kaç adımda herkes ayakta?",
          },
          {
            t: "Şimdi köşedeki biriyle başlayalım",
            d: "Adımları yine sayalım ve ilk sonuçla karşılaştıralım.",
          },
          {
            t: "Grip sürümü",
            d: "Ayağa kalkan bir sonraki adımda oturur ve bir daha kalkmaz: iyileşti.",
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
            q: "Bir haber ağda nasıl yayılır?",
            options: [
              "Herkese aynı anda ulaşır",
              "Bilen kişiden, bağlı olduğu kişilere, adım adım",
              "Yalnızca en popüler kişiye ulaşır",
            ],
            correct: 1,
            why: "Yayılım bağların üzerinden, komşudan komşuya ilerler.",
          },
          {
            q: "Haberin en hızlı yayılması için ilk kime söylersin?",
            options: [
              "Çok bağlantılı ve herkese yakın olan kişiye",
              "Tek arkadaşı olan, kenardaki kişiye",
              "Kime söylediğin fark etmez",
            ],
            correct: 0,
            why: "Ortadaki kişi haberi en az adımda herkese ulaştırır.",
          },
          {
            q: "Grip örneğinde iyileşmiş kişi için hangisi doğrudur?",
            options: [
              "Her gün yeniden hasta olur",
              "Hastalığı yaymaya devam eder",
              "Yeniden hasta olmaz ve bulaştırmaz",
            ],
            correct: 2,
            why: "Sağlıklı, hasta, iyileşmiş: iyileşen kişi zincirden çıkar.",
          },
        ]}
      />
    </Frame>
  ),

  // 15 — Özet
  () => (
    <Recap
      items={[
        "Haber, video ve hastalık bağların üzerinden, komşudan komşuya adım adım yayılır.",
        "İlk söylenen kişi önemlidir: ortadaki ve çok bağlantılı kişi en hızlı yayar.",
        "Gripte üç kutu vardır: sağlıklı, hasta, iyileşmiş. Ortadakini korumak zinciri kırar.",
      ]}
      next="Ortadaki kişi aşılanınca yayılım durdu. Peki bir düğüm ağdan tamamen çıkarsa ağ ayakta kalır mı? Ağın dayanıklılığına bakacağız."
    />
  ),
];

const TOTAL = slides.length;

/* ============================================================
   PRESENTATION ROOT  (h01 ile birebir aynı)
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
          BVA 2105 · 11. Hafta · Ağlarda Etki ve Yayılım
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
