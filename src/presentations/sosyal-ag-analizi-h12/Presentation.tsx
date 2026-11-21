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
  Unlink,
  Target,
  ShieldCheck,
  Users,
  Shuffle,
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
   12. HAFTA — dayanıklılık: veri ve etkileşimli bileşenler
   ============================================================ */

/** Kalan düğümleri birbirine ulaşabilen parçalara ayırır (büyükten küçüğe). */
function parcalar(dugumler: string[], baglar: GEdge[]): string[][] {
  const gorulen = new Set<string>();
  const sonuc: string[][] = [];
  for (const d of dugumler) {
    if (gorulen.has(d)) continue;
    const parca: string[] = [];
    const sira = [d];
    gorulen.add(d);
    while (sira.length > 0) {
      const x = sira.pop() as string;
      parca.push(x);
      for (const [a, b] of baglar) {
        const k = a === x ? b : b === x ? a : null;
        if (k !== null && dugumler.includes(k) && !gorulen.has(k)) {
          gorulen.add(k);
          sira.push(k);
        }
      }
    }
    sonuc.push(parca);
  }
  return sonuc.sort((p, q) => q.length - p.length);
}

const PARCA_RENK = ["#14b8a6", "#fbbf24", "#a78bfa", "#f472b6", "#60a5fa"];

const D_KISI: GNode[] = [
  { id: "Ali", x: 70, y: 70 },
  { id: "Ayşe", x: 70, y: 235 },
  { id: "Can", x: 190, y: 150 },
  { id: "Deniz", x: 320, y: 150 },
  { id: "Elif", x: 450, y: 150 },
  { id: "Mert", x: 570, y: 70 },
  { id: "Naz", x: 570, y: 235 },
  { id: "Ozan", x: 440, y: 290 },
];
const D_BAG: GEdge[] = [
  ["Ali", "Ayşe"],
  ["Ali", "Can"],
  ["Ayşe", "Can"],
  ["Can", "Deniz"],
  ["Deniz", "Elif"],
  ["Elif", "Mert"],
  ["Elif", "Naz"],
  ["Mert", "Naz"],
  ["Naz", "Ozan"],
];
const YEDEK: GEdge = ["Ayşe", "Ozan"];

/** Düğüme tıkla: ağdan çıkar. Tekrar tıkla: geri gelir. Parçalar renklenir. */
function RemoveDemo({ yedekSecimi = false }: { yedekSecimi?: boolean }) {
  const [cikan, setCikan] = useState<string[]>([]);
  const [yedek, setYedek] = useState(false);
  const baglar = yedek ? [...D_BAG, YEDEK] : D_BAG;
  const kalan = D_KISI.map((n) => n.id).filter((id) => !cikan.includes(id));
  const parca = parcalar(kalan, baglar);
  const bolundu = parca.length > 1;
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-center">
      <div className="md:col-span-3 saa-card rounded-xl p-2">
        <Net
          nodes={D_KISI}
          edges={baglar}
          faded={(id) => cikan.includes(id)}
          fill={(id) => {
            const i = parca.findIndex((p) => p.includes(id));
            return bolundu && i >= 0 ? PARCA_RENK[i % PARCA_RENK.length] : undefined;
          }}
          edgeColor={(a, b) => (a === YEDEK[0] && b === YEDEK[1] ? "#fbbf24" : undefined)}
          onNode={(id) =>
            setCikan((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]))
          }
        />
      </div>
      <div className="md:col-span-2">
        <div className="saa-card-teal rounded-xl p-4 text-base md:text-lg text-gray-200 min-h-[140px]">
          <div
            className="font-semibold mb-1"
            style={{ color: bolundu ? "#fbbf24" : "#5eead4" }}
          >
            {parca.length} parça · en büyüğü {parca[0]?.length ?? 0} kişi
          </div>
          {cikan.length === 0 && (
            <span className="flex items-start gap-2">
              <MousePointerClick className="w-6 h-6 flex-shrink-0 text-[#5eead4]" />
              Bir kişiye tıkla: ağdan çıksın. Tekrar tıkla: geri gelsin.
            </span>
          )}
          {cikan.length > 0 &&
            (bolundu
              ? `Ağ bölündü. Çıkan: ${cikan.join(", ")}. Farklı renkler birbirine ulaşamıyor.`
              : `Çıkan: ${cikan.join(", ")}. Kalanlar hâlâ birbirine ulaşabiliyor.`)}
        </div>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {yedekSecimi && (
            <button
              type="button"
              onClick={() => setYedek((y) => !y)}
              className={`${BTN} ${yedek ? BTN_ON : BTN_IDLE}`}
            >
              Yedek bağ: Ayşe–Ozan {yedek ? "(açık)" : "(kapalı)"}
            </button>
          )}
          <button
            type="button"
            onClick={() => setCikan([])}
            className={`${BTN} ${BTN_IDLE} inline-flex items-center gap-2`}
          >
            <RotateCcw className="w-5 h-5" /> Herkes geri gelsin
          </button>
        </div>
      </div>
    </div>
  );
}

const S_SEHIR: GNode[] = [
  { id: "İstanbul", x: 230, y: 150 },
  { id: "Ankara", x: 420, y: 150 },
  { id: "İzmir", x: 325, y: 255 },
  { id: "Antalya", x: 95, y: 285 },
  { id: "Trabzon", x: 70, y: 85 },
  { id: "Adana", x: 55, y: 195 },
  { id: "Samsun", x: 230, y: 32 },
  { id: "Van", x: 585, y: 80 },
  { id: "Erzurum", x: 470, y: 32 },
  { id: "Gaziantep", x: 570, y: 240 },
];
const S_HAT: GEdge[] = [
  ["İstanbul", "Ankara"],
  ["İstanbul", "İzmir"],
  ["İstanbul", "Antalya"],
  ["İstanbul", "Trabzon"],
  ["İstanbul", "Adana"],
  ["İstanbul", "Samsun"],
  ["Ankara", "İzmir"],
  ["Ankara", "Van"],
  ["Ankara", "Erzurum"],
  ["Ankara", "Gaziantep"],
];
const hatSayisi = (id: string, acik: string[]) =>
  S_HAT.filter((e) => e.includes(id) && acik.includes(e[0]) && acik.includes(e[1])).length;

/** Hayali hat haritası: rastgele arıza ile hedefli saldırıyı karşılaştır. */
function AttackDemo() {
  const [kapali, setKapali] = useState<string[]>([]);
  const [son, setSon] = useState("Henüz hiçbir havalimanı kapanmadı.");
  const tum = S_SEHIR.map((n) => n.id);
  const acik = tum.filter((id) => !kapali.includes(id));
  const parca = parcalar(acik, S_HAT);
  const enBuyuk = parca[0] ?? [];

  function rastgele() {
    const secilen = acik[Math.floor(Math.random() * acik.length)];
    setKapali([...kapali, secilen]);
    setSon(`Rastgele arıza: ${secilen} kapandı.`);
  }
  function hedefli() {
    const secilen = [...acik].sort((a, b) => hatSayisi(b, acik) - hatSayisi(a, acik))[0];
    setKapali([...kapali, secilen]);
    setSon(`Hedefli saldırı: en çok hattı olan ${secilen} kapandı.`);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-center">
      <div className="md:col-span-3 saa-card rounded-xl p-2">
        <Net
          nodes={S_SEHIR}
          edges={S_HAT}
          radius={(id) => 14 + 2 * hatSayisi(id, tum)}
          faded={(id) => kapali.includes(id)}
          fill={(id) => (enBuyuk.includes(id) && enBuyuk.length > 1 ? "#14b8a6" : undefined)}
        />
      </div>
      <div className="md:col-span-2">
        <div className="saa-card-teal rounded-xl p-4 text-base md:text-lg text-gray-200 min-h-[128px]">
          <div className="font-semibold text-[#5eead4] mb-1">
            Birbirine uçulabilen en büyük grup: {enBuyuk.length} / {tum.length} şehir
          </div>
          {son}
        </div>
        <div className="mt-3 flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={rastgele}
            disabled={acik.length === 0}
            className={`${BTN} ${BTN_IDLE} disabled:opacity-30 inline-flex items-center gap-2`}
          >
            <Shuffle className="w-5 h-5" /> Rastgele arıza
          </button>
          <button
            type="button"
            onClick={hedefli}
            disabled={acik.length === 0}
            className={`${BTN} ${BTN_IDLE} disabled:opacity-30 inline-flex items-center gap-2`}
          >
            <Target className="w-5 h-5" /> Hedefli saldırı
          </button>
          <button
            type="button"
            onClick={() => {
              setKapali([]);
              setSon("Henüz hiçbir havalimanı kapanmadı.");
            }}
            className={`${BTN} ${BTN_IDLE} inline-flex items-center gap-2`}
          >
            <RotateCcw className="w-5 h-5" /> Sıfırla
          </button>
        </div>
      </div>
    </div>
  );
}

const TUR = ["Rastgele arıza", "Hedefli saldırı"];

/* ============================================================
   SLIDES — BVA 2105 · 12. Hafta · Ağ Dayanıklılığı
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  // 1 — Kapak
  () => (
    <Cover
      week="12"
      title={["Ağın Dayanıklılığı", "ve Esnekliği"]}
      sub="Bir düğüm giderse ağ ayakta kalır mı? Hangisi giderse ağ ikiye bölünür?"
      cards={[
        { icon: Unlink, title: "Kritik düğüm", desc: "Çıkınca ağı parçalara ayıran düğüm." },
        { icon: Target, title: "Arıza mı, saldırı mı?", desc: "Rastgele bozulma ile seçerek vurma aynı değildir." },
        { icon: ShieldCheck, title: "Yedek yol", desc: "Tek bir ek bağ, ağı kopmaktan kurtarabilir." },
      ]}
    />
  ),

  // 2 — Köprü
  () => (
    <Frame
      eyebrow="11. haftadan 12. haftaya"
      title="Geçen hafta aşıladık; bu hafta düğümü çıkarıyoruz"
      ask="Bir kişi gruptan tamamen çıksa ne değişir?"
    >
      <TwoLists
        left={{
          label: "Geçen hafta",
          items: [
            "Haber ve hastalık bağların üzerinden yayılır.",
            "Ortadaki kişi en hızlı yayar.",
            "Ortadaki kişi aşılanınca salgın durdu.",
          ],
        }}
        right={{
          label: "Bu hafta",
          items: [
            "Bir düğüm ağdan tamamen çıkarsa ne olur?",
            "Her düğümün çıkması aynı zararı vermez.",
            "Ağı nasıl daha sağlam yaparız?",
          ],
        }}
      />
    </Frame>
  ),

  // 3 — El kaldır
  () => (
    <Frame
      eyebrow="El kaldır"
      title="O gelmeyince buluşma iptal olur mu?"
      ask="O kişi grupta ne iş görüyor: herkesi o mu topluyor?"
    >
      <div className="saa-card rounded-xl p-5 mb-4 text-lg md:text-xl text-gray-200">
        Kaçınızın arkadaş grubunda, o gelmeyince buluşmanın iptal olduğu biri var?
      </div>
      <Reveal hint="Eller kalktı mı? Yorumu görmek için tıkla">
        O kişi grubu bir arada tutuyor. Ağlarda da böyle düğümler vardır: çıkınca ağ
        parçalanır. Bazı düğümleri gitse de çalışmaya devam eden ağa{" "}
        <span className="text-[#5eead4] font-semibold">dayanıklı ağ</span> diyoruz.
      </Reveal>
    </Frame>
  ),

  // 4 — Oyna-gör: düğüm çıkar
  () => (
    <Frame
      eyebrow="Oyna-gör"
      title="Hangi düğümü çıkarırsan ağ ikiye bölünür?"
      ask="Tıklamadan önce: sence hangisi? Neden o?"
    >
      <RemoveDemo />
    </Frame>
  ),

  // 5 — Kavram
  () => (
    <Frame
      eyebrow="Kavram"
      title="Dayanıklı ağ, parça kaybetse de çalışır"
      ask="Ali çıkınca neden hiçbir şey olmadı da Deniz çıkınca ağ bölündü?"
    >
      <CardRow
        cards={[
          {
            icon: ShieldCheck,
            title: "Dayanıklılık",
            desc: "Bazı düğümler gitse de kalanların birbirine ulaşabilmesi.",
          },
          {
            icon: Unlink,
            title: "Kritik düğüm",
            desc: "Çıkınca ağı bölen düğüm. Örnekte Deniz: iki grubun arasındaki tek yol.",
          },
          {
            icon: Users,
            title: "En büyük parça",
            desc: "Hâlâ birbirine ulaşabilen en kalabalık grup. Ne kadar büyükse ağ o kadar ayakta.",
          },
        ]}
      />
    </Frame>
  ),

  // 6 — Gerçek ağlar
  () => (
    <Frame
      eyebrow="Tahmin et"
      title="Gerçek ağlarda kritik düğüm neresi?"
      ask="Manisa için kritik bir yol ya da kavşak söyleyebilir misin?"
    >
      <FlipCards
        items={[
          {
            tag: "Elektrik şebekesi",
            front: "Bir mahallenin elektriği hangi noktadan geçer?",
            back: "Trafo merkezinden. O durursa ona bağlı bütün sokaklar karanlıkta kalır.",
          },
          {
            tag: "Havayolu",
            front: "Aktarmalı uçuşların çoğu nereden geçer?",
            back: "Büyük aktarma merkezinden. Orası kapanırsa birçok şehir arasında uçulamaz.",
          },
          {
            tag: "Kargo",
            front: "Kargon sana gelmeden önce nereye uğrar?",
            back: "Aktarma merkezine. Orada sorun çıkarsa birçok ilin kargosu gecikir.",
          },
        ]}
      />
    </Frame>
  ),

  // 7 — Rastgele vs hedefli
  () => (
    <Frame
      eyebrow="Oyna-gör · hayali bir hat haritası"
      title="Rastgele arıza mı, hedefli saldırı mı?"
      ask="Rastgele arızada neden çoğu zaman pek bir şey olmuyor?"
    >
      <AttackDemo />
    </Frame>
  ),

  // 8 — Sonuç
  () => (
    <Frame
      eyebrow="Sonuç"
      title="Merkezli ağ: arızaya dayanıklı, saldırıya kırılgan"
      ask="Bu iyi haber mi, kötü haber mi?"
    >
      <TwoLists
        left={{
          label: "Rastgele arıza",
          items: [
            "Düğümlerin çoğu az bağlantılıdır.",
            "Rastgele bozulan, büyük ihtimalle onlardan biridir.",
            "Ağın geri kalanı çalışmaya devam eder.",
          ],
        }}
        right={{
          label: "Hedefli saldırı",
          items: [
            "Saldırgan en çok bağlantılı düğümü seçer.",
            "Tek hamlede birçok bağ birden gider.",
            "Ağ küçük parçalara ayrılır.",
          ],
        }}
      />
    </Frame>
  ),

  // 9 — Ayırt et
  () => (
    <Frame
      eyebrow="Oyna-gör"
      title="Rastgele mi, hedefli mi?"
      ask="Kendi çevrenden bir rastgele arıza örneği ver."
    >
      <Quiz
        row
        unit="Örnek"
        questions={[
          {
            q: "Fırtınada bir sokağın elektrik direği devrildi.",
            options: TUR,
            correct: 0,
            why: "Kimse seçmedi; hangi direğin devrileceği tesadüf.",
          },
          {
            q: "Bilgisayar korsanları, en çok siteyi barındıran veri merkezini seçip çökertti.",
            options: TUR,
            correct: 1,
            why: "En çok bağlantısı olan düğüm bilerek seçildi.",
          },
          {
            q: "Sınıf grubundan biri telefonunu kaybetti ve gruptan düştü.",
            options: TUR,
            correct: 0,
            why: "Kimin telefonunu kaybedeceği tesadüf.",
          },
          {
            q: "Polis, çetede herkesle görüşen elebaşını yakaladı.",
            options: TUR,
            correct: 1,
            why: "Ağı dağıtmak için en merkezdeki kişi seçildi.",
          },
          {
            q: "Bir şehir içi otobüs yolda arıza yaptı.",
            options: TUR,
            correct: 0,
            why: "Hangi otobüsün bozulacağı önceden seçilmedi.",
          },
        ]}
      />
    </Frame>
  ),

  // 10 — Mini sınav
  () => (
    <Frame
      eyebrow="Mini sınav"
      title="Sınırlı paranla neyi korursun?"
      ask="Peki ya saldırgan da hangi düğümün kritik olduğunu biliyorsa?"
    >
      <Quiz
        questions={[
          {
            q: "Bir ağı korumak için paran yalnızca iki düğüme yetiyor. Hangilerini korursun?",
            options: [
              "Rastgele seçtiğim iki düğümü",
              "En çok bağlantılı ve gruplar arasında köprü olan düğümleri",
              "En az bağlantılı iki düğümü",
            ],
            correct: 1,
            why: "Ağı en çok onların kaybı parçalar; önce onlar korunur.",
          },
        ]}
      />
    </Frame>
  ),

  // 11 — Yedek bağ
  () => (
    <Frame
      eyebrow="Oyna-gör · esneklik"
      title="Tek bir yedek bağ, ağı kopmaktan kurtarır"
      ask="Yedek bağı sen olsan nereye koyardın?"
    >
      <RemoveDemo yedekSecimi />
    </Frame>
  ),

  // 12 — Kod
  () => (
    <Frame
      eyebrow="Python · NetworkX"
      title="Bir düğümü çıkar: ağ hâlâ tek parça mı?"
      ask="İkinci print neden False yazdı?"
    >
      <CodeCard
        file="dayaniklilik.py"
        lines={[
          "import networkx as nx",
          "",
          'G = nx.Graph([("Ali", "Can"), ("Can", "Deniz"), ("Deniz", "Elif")])',
          "print(nx.is_connected(G))                  # True: herkes birbirine ulaşır",
          "",
          'G.remove_node("Deniz")                     # aradaki kişiyi çıkar',
          "print(nx.is_connected(G))                  # False: ağ bölündü",
          "print(nx.number_connected_components(G))   # 2 parça",
        ]}
      />
    </Frame>
  ),

  // 13 — Sınıfta deneyelim
  () => (
    <Frame
      eyebrow="Sınıfta deneyelim · 10 dakika · kağıt ve kalem"
      title="Arkadaşının ağını kopar, sonra onar"
      ask="Tek bir çizgiyle ağını kim kurtarabildi?"
    >
      <Steps
        items={[
          {
            t: "Defterine 8 düğümlü bir ağ çiz",
            d: "Düğümlere isim ver, aralarına 9-10 çizgi koy.",
          },
          {
            t: "Defterini yanındakiyle değiştir",
            d: "Şimdi sen saldırgansın.",
          },
          {
            t: "Tek bir düğümü karala",
            d: "Amaç: ağı en çok parçaya ayırmak. Kaç parça oldu, yanına yaz.",
          },
          {
            t: "Defterini geri al ve tek bir çizgi ekle",
            d: "Öyle bir bağ ekle ki o düğüm gitse de ağ tek parça kalsın.",
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
            q: "Dayanıklı ağ ne demektir?",
            options: [
              "Hiçbir düğümü asla bozulmayan ağ",
              "Bazı düğümleri gitse de çalışmaya devam eden ağ",
              "En çok düğümü olan ağ",
            ],
            correct: 1,
            why: "Önemli olan, kalanların hâlâ birbirine ulaşabilmesidir.",
          },
          {
            q: "Birkaç büyük merkezi olan bir ağ için hangisi doğrudur?",
            options: [
              "Rastgele arızaya dayanıklı, hedefli saldırıya kırılgandır",
              "Her ikisine de aynı ölçüde dayanıklıdır",
              "Rastgele arızada hemen çöker",
            ],
            correct: 0,
            why: "Rastgele arıza çoğunlukla küçük düğüme denk gelir; saldırı merkezi seçer.",
          },
          {
            q: "Bir ağı daha dayanıklı yapmanın en basit yolu hangisidir?",
            options: [
              "Bütün bağları tek bir merkezden geçirmek",
              "Az bağlantılı düğümleri silmek",
              "Yedek yol olacak yeni bağlar eklemek",
            ],
            correct: 2,
            why: "Yedek yol varsa bir düğüm gitse de kalanlar başka yoldan ulaşır.",
          },
        ]}
      />
    </Frame>
  ),

  // 15 — Özet
  () => (
    <Recap
      items={[
        "Her düğüm aynı değildir: bazıları çıkınca ağ ikiye bölünür.",
        "Merkezli ağlar rastgele arızaya dayanıklı, hedefli saldırıya kırılgandır.",
        "Yedek bağ eklemek ağı sağlamlaştırır: bir yol kapanırsa diğeri kalır.",
      ]}
      next="Gerçek ağlar çok büyüktür, tamamına bakamayız. Küçük bir parçasını seçip bütünü anlamaya çalışacağız: ağ örnekleme."
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
          BVA 2105 · 12. Hafta · Ağ Dayanıklılığı
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
