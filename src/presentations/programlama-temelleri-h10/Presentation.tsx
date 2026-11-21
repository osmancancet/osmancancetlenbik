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
  MousePointerClick,
  RotateCcw,
  AlertTriangle,
  Table,
  Gamepad2,
  Image,
  Layers,
  Grid3x3,
  Repeat,
  type LucideIcon,
} from "lucide-react";
import { CodeEditor } from "../_shared/code/CodeEditor";
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
        <div className="absolute inset-0 prog-grid-bg pointer-events-none" />
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
      className="inline-flex items-center gap-3 mb-4 text-xs font-mono uppercase tracking-[0.25em] text-[#5fa8e0]"
    >
      <span className="w-8 h-px bg-[#5fa8e0]" />
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
      className={`text-3xl md:text-4xl font-semibold tracking-tight text-white ${className}`}
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
  accent = "#3776ab",
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
      className="prog-card prog-card-hover rounded-xl p-6 transition-all"
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
        style={{
          background: `${accent}1f`,
          border: `1px solid ${accent}55`,
        }}
      >
        <Icon className="w-6 h-6" style={{ color: accent }} />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-base text-gray-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

/* ---- Anlatım yardımcıları ------------------------------------ */

/** Hocanın sınıfa yönelteceği tek soru (slaydın altında, soluk). */
function Ask({ children }: { children: ReactNode }) {
  return (
    <div className="mt-5 text-sm text-gray-500">
      <span className="font-mono uppercase tracking-widest text-[11px] text-[#5fa8e0]/70 mr-2">
        Sınıfa sor:
      </span>
      {children}
    </div>
  );
}

/** Standart içerik slaydı: üst etiket + cümle başlık + içerik + "Sınıfa sor". */
function Frame({
  eyebrow,
  title,
  ask,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  ask: string;
  children: ReactNode;
}) {
  return (
    <SlideShell>
      <Eyebrow>{eyebrow}</Eyebrow>
      <H2>{title}</H2>
      {/* Dar orta sütun: tıklanabilir öğeler kenar geçiş alanlarının (%12) dışında kalır. */}
      <div className="mt-6 max-w-4xl mx-auto">{children}</div>
      <Ask>{ask}</Ask>
    </SlideShell>
  );
}

/** Büyük, belirgin düğme. Tıklamadan sonra odağı bırakır; böylece boşluk
 *  tuşu düğmeyi yeniden tetiklemez, yalnızca slaydı ilerletir. */
function Btn({
  onClick,
  children,
  active = false,
  disabled = false,
  mono = false,
}: {
  onClick: () => void;
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  mono?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={(e) => {
        onClick();
        e.currentTarget.blur();
      }}
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-base border transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
        mono ? "font-mono" : "font-semibold"
      }`}
      style={
        active
          ? { background: "rgba(255,212,59,0.18)", borderColor: "#ffd43b", color: "#ffe169" }
          : { background: "rgba(55,118,171,0.14)", borderColor: "rgba(95,168,224,0.5)", color: "#e5e7eb" }
      }
    >
      {children}
    </button>
  );
}

/** Tahmin et → tıkla göster. */
function Reveal({
  label = "Cevabı görmek için tıkla",
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={(e) => {
        setOpen((o) => !o);
        e.currentTarget.blur();
      }}
      className="w-full text-left rounded-xl p-5 prog-card prog-card-hover transition-all"
      style={open ? { borderColor: "rgba(134,239,172,0.55)" } : { borderStyle: "dashed" }}
    >
      {open ? (
        <div className="text-lg text-gray-200 leading-relaxed">{children}</div>
      ) : (
        <div className="flex items-center gap-3 text-[#ffd43b]">
          <MousePointerClick className="w-5 h-5 shrink-0" />
          <span className="text-lg font-semibold">{label}</span>
        </div>
      )}
    </button>
  );
}

/** Mini sınav: şıkka tıkla; doğru yeşil, yanlış kırmızı, altında açıklama. */
function Quiz({
  q,
  code,
  options,
  correct,
  why,
}: {
  q: string;
  code?: string;
  options: string[];
  correct: number;
  why: string;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <div className="prog-card rounded-xl p-5">
      <div className="text-lg text-white font-semibold">{q}</div>
      {code && (
        <pre className="prog-editor rounded-lg px-4 py-2 mt-3 text-[15px] whitespace-pre-wrap">
          {code}
        </pre>
      )}
      <div className="grid grid-cols-2 gap-2 mt-4">
        {options.map((o, i) => {
          const shown = picked !== null && (i === picked || i === correct);
          const ok = i === correct;
          return (
            <button
              key={o}
              type="button"
              onClick={(e) => {
                setPicked(i);
                e.currentTarget.blur();
              }}
              className="text-left rounded-lg px-4 py-3 text-base font-mono border transition-colors"
              style={
                shown
                  ? {
                      background: ok ? "rgba(134,239,172,0.14)" : "rgba(252,165,165,0.14)",
                      borderColor: ok ? "#86efac" : "#fca5a5",
                      color: ok ? "#86efac" : "#fca5a5",
                    }
                  : { borderColor: "rgba(95,168,224,0.4)", color: "#e5e7eb" }
              }
            >
              <span className="text-gray-500 mr-3">{"ABCD"[i]}</span>
              {o}
            </button>
          );
        })}
      </div>
      <div className="mt-3 text-base min-h-[3rem] text-gray-300">
        {picked === null ? (
          <span className="text-gray-600">Bir şıkka tıkla.</span>
        ) : (
          <>
            <span className={picked === correct ? "text-[#86efac]" : "text-[#fca5a5]"}>
              {picked === correct ? "Doğru. " : "Olmadı. "}
            </span>
            {why}
          </>
        )}
      </div>
    </div>
  );
}

/** Adım adım kod izleme: İleri/Geri ile satır satır, değişkenler yanında. */
type TraceStep = { line: number; vars: string; note: string; hi?: number };

function Trace({
  code,
  steps,
  render,
}: {
  code: string[];
  steps: TraceStep[];
  render?: (hi: number | undefined) => ReactNode;
}) {
  const [i, setI] = useState(0);
  const s = steps[i];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
      <div className="prog-editor rounded-xl p-4 text-[16px]">
        {code.map((l, n) => (
          <div
            key={n}
            className="px-2 rounded whitespace-pre"
            style={
              n === s.line
                ? { background: "rgba(255,212,59,0.16)", color: "#ffe169" }
                : undefined
            }
          >
            {l || " "}
          </div>
        ))}
      </div>
      <div className="prog-card rounded-xl p-5 flex flex-col">
        {render && <div className="mb-4">{render(s.hi)}</div>}
        <div className="font-mono text-lg text-[#9cdcfe]">{s.vars}</div>
        <div className="text-base text-gray-300 mt-2 flex-1">{s.note}</div>
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <Btn onClick={() => setI((v) => Math.max(v - 1, 0))} disabled={i === 0}>
            Geri
          </Btn>
          <Btn
            onClick={() => setI((v) => Math.min(v + 1, steps.length - 1))}
            disabled={i === steps.length - 1}
            active={i < steps.length - 1}
          >
            İleri
          </Btn>
          <Btn onClick={() => setI(0)} disabled={i === 0}>
            <RotateCcw className="w-4 h-4" />
            Baştan
          </Btn>
          <span className="ml-auto font-mono text-sm text-gray-500">
            Adım {i + 1} / {steps.length}
          </span>
        </div>
      </div>
    </div>
  );
}

/** Önce tahmin et, sonra çalıştır: solda gerçek Python çalıştırıcısı. */
function PredictRun({
  file,
  code,
  question,
  answer,
  note,
}: {
  file: string;
  code: string;
  question: string;
  answer: string[];
  note: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-start">
      <div className="md:col-span-3">
        <CodeEditor
          title={`${file} — Visual Studio Code`}
          tabs={[file]}
          activeTab={file}
          code={code}
        />
      </div>
      <div className="md:col-span-2 space-y-3">
        <div className="prog-card-yellow rounded-xl p-4">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#ffd43b] mb-1">
            1 · Önce tahmin et
          </div>
          <div className="text-lg text-white">{question}</div>
        </div>
        <Reveal label="2 · Tahminler tamam mı? Çıktıyı göster">
          <div className="font-mono text-[#86efac]">
            {answer.map((l, n) => (
              <div key={n}>{l}</div>
            ))}
          </div>
          <div className="text-base text-gray-400 mt-2">{note}</div>
        </Reveal>
        <div className="text-base text-gray-400 px-1">
          3 · Şimdi <span className="text-white font-semibold">Çalıştır</span>&apos;a bas,
          tahminle karşılaştır.
        </div>
      </div>
    </div>
  );
}

/** Sınıfta deneyelim: solda tıklayıp işaretlenen adımlar, sağda çalıştırıcı. */
function Activity({
  file,
  code,
  steps,
}: {
  file: string;
  code: string;
  steps: string[];
}) {
  const [done, setDone] = useState<number[]>([]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-start">
      <div className="md:col-span-2 space-y-2">
        {steps.map((t, i) => {
          const ok = done.includes(i);
          return (
            <button
              key={t}
              type="button"
              onClick={(e) => {
                setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]));
                e.currentTarget.blur();
              }}
              className="w-full flex items-center gap-3 text-left rounded-lg px-4 py-3 border transition-colors"
              style={
                ok
                  ? { background: "rgba(134,239,172,0.12)", borderColor: "#86efac", color: "#86efac" }
                  : { background: "rgba(55,118,171,0.08)", borderColor: "rgba(95,168,224,0.4)", color: "#e5e7eb" }
              }
            >
              <span className="w-7 h-7 shrink-0 rounded-full border border-current flex items-center justify-center font-mono text-sm">
                {ok ? <Check className="w-4 h-4" /> : i + 1}
              </span>
              <span className="text-base">{t}</span>
            </button>
          );
        })}
        <div className="text-xs text-gray-600 px-1">Biten adıma tıkla, işaretlensin.</div>
      </div>
      <div className="md:col-span-3">
        <CodeEditor
          title={`${file} — Visual Studio Code`}
          tabs={[file]}
          activeTab={file}
          code={code}
        />
      </div>
    </div>
  );
}

/** Kapak slaydı. */
function Cover({
  week,
  title,
  second,
  sub,
  tags,
}: {
  week: string;
  title: string;
  second: string;
  sub: string;
  tags: { tag: string; name: string; desc: string; color: string }[];
}) {
  return (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 1101 · {week}</Eyebrow>
        <H1>
          <span className="prog-shimmer">{title}</span>
          <br />
          <span className="text-white/90">{second}</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">{sub}</Sub>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto"
        >
          {tags.map((l) => (
            <div
              key={l.name}
              className="prog-card rounded-xl p-5"
              style={{ borderColor: `${l.color}55` }}
            >
              <div
                className="h-10 px-3 rounded-lg mx-auto mb-3 inline-flex items-center justify-center text-sm font-mono font-bold"
                style={{ background: `${l.color}22`, color: l.color, border: `1px solid ${l.color}66` }}
              >
                {l.tag}
              </div>
              <div className="text-white font-semibold">{l.name}</div>
              <div className="text-sm text-gray-500 mt-1">{l.desc}</div>
            </div>
          ))}
        </motion.div>
        <div className="mt-10 text-[11px] font-mono text-gray-600 uppercase tracking-[0.3em]">
          Programlama Temelleri · MCBÜ Manisa Teknik Bilimler MYO
        </div>
      </div>
    </SlideShell>
  );
}

/** Kapanış: "Aklında kalsın: 3 şey" + gelecek haftaya köprü. */
function Closing({
  items,
  bridge,
}: {
  items: { icon: LucideIcon; title: string; desc: string; accent: string }[];
  bridge: string;
}) {
  return (
    <SlideShell>
      <Eyebrow>Özet</Eyebrow>
      <H2>Aklında kalsın: 3 şey</H2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {items.map((it, i) => (
          <FeatureCard
            key={it.title}
            icon={it.icon}
            title={it.title}
            desc={it.desc}
            accent={it.accent}
            delay={0.1 + i * 0.1}
          />
        ))}
      </div>
      <div className="prog-card-yellow rounded-xl px-6 py-4 mt-6 text-lg text-gray-200">
        <span className="font-mono uppercase tracking-widest text-xs text-[#ffd43b] mr-3">
          Gelecek hafta
        </span>
        {bridge}
      </div>
    </SlideShell>
  );
}

/* ============================================================
   H10 ETKİLEŞİMLİ BİLEŞENLER
   ============================================================ */

/** Satır ve sütun numaralı tablo. */
function Grid({
  rows,
  hi = null,
  onPick,
  cell = "w-20 h-14 text-base",
}: {
  rows: string[][];
  hi?: [number, number] | null;
  onPick?: (r: number, c: number) => void;
  cell?: string;
}) {
  return (
    <div className="inline-flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <div className="w-20 text-right text-[11px] font-mono text-gray-500 pr-1">sütun →</div>
        {rows[0].map((_, c) => (
          <div key={c} className={`${cell} prog-index text-center`} style={{ height: 20 }}>
            [{c}]
          </div>
        ))}
      </div>
      {rows.map((row, r) => (
        <div key={r} className="flex gap-2 items-center">
          <div className="w-20 text-right prog-index pr-1">satır [{r}]</div>
          {row.map((v, c) => {
            const on = hi !== null && hi[0] === r && hi[1] === c;
            const cls = `${cell} prog-cell font-semibold ${on ? "prog-cell-active" : ""}`;
            return onPick ? (
              <button
                key={c}
                type="button"
                onClick={(e) => {
                  onPick(r, c);
                  e.currentTarget.blur();
                }}
                className={`${cls} cursor-pointer hover:border-[#ffd43b]`}
              >
                {v}
              </button>
            ) : (
              <div key={c} className={cls}>
                {v}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/** Sinema salonu: koltuğa tıkla, adresini (satır, sütun) gör. */
function SeatGrid() {
  const salon = [
    ["Ali", "Ece", "Can", "Naz"],
    ["Efe", "Su", "Mert", "Elif"],
    ["Deniz", "Ada", "Bora", "Ilgın"],
  ];
  const [sec, setSec] = useState<[number, number] | null>(null);
  return (
    <div className="prog-flow-bg p-6 text-center">
      <div className="mx-auto mb-4 h-2 w-80 rounded-full bg-white/30" />
      <div className="text-[11px] font-mono uppercase tracking-widest text-gray-500 mb-3">
        Perde
      </div>
      <Grid rows={salon} hi={sec} onPick={(r, c) => setSec([r, c])} cell="w-24 h-14 text-base" />
      <div className="mt-5 font-mono text-xl min-h-[4rem]">
        {sec === null ? (
          <span className="text-[#ffd43b] text-lg font-sans">Bir koltuğa tıkla.</span>
        ) : (
          <>
            <div>
              <span className="text-[#9cdcfe]">
                salon[{sec[0]}][{sec[1]}]
              </span>
              <span className="text-gray-500"> → </span>
              <span className="text-[#ce9178]">&quot;{salon[sec[0]][sec[1]]}&quot;</span>
            </div>
            <div className="text-base text-gray-400 font-sans mt-1">
              Önce satır ({sec[0]}), sonra o satırdaki koltuk ({sec[1]}).
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/** XOX: kareye tıkla, tahta[satır][sütun] = "X" ataması canlı görünür. */
function XoxBoard() {
  const bos = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const [tahta, setTahta] = useState<string[][]>(bos);
  const [sira, setSira] = useState<"X" | "O">("X");
  const [son, setSon] = useState<string | null>(null);
  const [hi, setHi] = useState<[number, number] | null>(null);
  return (
    <div className="prog-flow-bg p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div className="text-center">
        <Grid
          rows={tahta.map((s) => s.map((v) => v || "·"))}
          hi={hi}
          cell="w-16 h-16 text-2xl"
          onPick={(r, c) => {
            if (tahta[r][c] !== "") return;
            setTahta((t) => t.map((s, i) => s.map((v, j) => (i === r && j === c ? sira : v))));
            setSon(`tahta[${r}][${c}] = "${sira}"`);
            setHi([r, c]);
            setSira((s) => (s === "X" ? "O" : "X"));
          }}
        />
      </div>
      <div>
        <div className="text-[11px] font-mono uppercase tracking-widest text-gray-500 mb-1">
          Az önce çalışan satır
        </div>
        <div className="font-mono text-xl text-[#ffe169] min-h-[2rem]">
          {son ?? <span className="text-[#ffd43b] text-lg font-sans">Boş bir kareye tıkla.</span>}
        </div>
        <div className="text-[11px] font-mono uppercase tracking-widest text-gray-500 mt-4 mb-1">
          Python&apos;daki hâli
        </div>
        <pre className="prog-editor rounded-lg px-4 py-3 text-[16px]">
          {`tahta = [\n${tahta
            .map((s) => `    [${s.map((v) => `"${v || " "}"`).join(", ")}],`)
            .join("\n")}\n]`}
        </pre>
        <div className="mt-4 flex items-center gap-3">
          <Btn
            onClick={() => {
              setTahta(bos);
              setSira("X");
              setSon(null);
              setHi(null);
            }}
          >
            <RotateCcw className="w-4 h-4" />
            Tahtayı temizle
          </Btn>
          <span className="text-base text-gray-400">
            Sıra: <span className="font-mono text-white">{sira}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

const ORNEK_SALON = [
  ["Ali", "Ece", "Can"],
  ["Naz", "Efe", "Su"],
];

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* 1 · KAPAK */
  () => (
    <Cover
      week="10. Hafta"
      title="Tablolar"
      second="Satır ve sütun"
      sub="Tek sıra liste yetmediğinde listeleri alt alta dizeriz: sinema salonu, oturma planı, XOX tahtası."
      tags={[
        { tag: "[[ ]]", name: "Tablo kur", desc: "Liste içinde liste", color: "#3776ab" },
        { tag: "[s][k]", name: "Hücreye ulaş", desc: "Önce satır, sonra sütun", color: "#5fa8e0" },
        { tag: "for for", name: "Hepsini gez", desc: "İç içe iki döngü", color: "#ffd43b" },
      ]}
    />
  ),

  /* 2 · SORUN */
  () => (
    <Frame
      eyebrow="Sorun"
      title="Sınıfı tek sıra listeye yazarsak kim kimin arkasında, bilemeyiz"
      ask="Bu sınıfı kâğıda çizseydin nasıl çizerdin?"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="prog-card rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3 text-[#fca5a5]">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Tek liste</span>
          </div>
          <pre className="prog-editor rounded-lg px-4 py-3 text-[16px] whitespace-pre-wrap">{`sinif = ["Ali", "Ece", "Can",
         "Naz", "Efe", "Su"]`}</pre>
          <div className="text-base text-gray-400 mt-3">
            Altı isim var. Ama kaç sıra var, Efe hangi sırada oturuyor?
          </div>
        </div>
        <div className="space-y-4">
          <div className="prog-card-yellow rounded-xl p-5 text-lg text-white">
            Sıraları kaybetmeden yazmanın bir yolu var mı?
          </div>
          <Reveal label="Fikirleri dinle, sonra tıkla">
            Her sırayı <span className="text-white font-semibold">ayrı bir liste</span> yap, sonra
            bu listeleri bir listeye koy. Liste içinde liste ={" "}
            <span className="text-[#86efac] font-semibold">tablo</span>.
          </Reveal>
        </div>
      </div>
    </Frame>
  ),

  /* 3 · BENZETME */
  () => (
    <Frame
      eyebrow="Benzetme · sinema salonu"
      title="Sinema biletinde iki numara yazar: sıra ve koltuk"
      ask="En öndeki sıranın numarası kaç çıktı? Peki ilk koltuğun?"
    >
      <SeatGrid />
    </Frame>
  ),

  /* 4 · KAVRAM */
  () => (
    <Frame
      eyebrow="Kavram"
      title="Tablo (matris), listelerden oluşan bir listedir"
      ask="Bu tabloda kaç tane liste görüyorsun?"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
        <pre className="prog-editor rounded-xl px-5 py-4 text-[18px]">{`salon = [
    ["Ali", "Ece", "Can"],
    ["Naz", "Efe", "Su"],
]`}</pre>
        <div className="space-y-3">
          {[
            { ad: "Satır", ne: "Yatay sıra. Her satır kendi başına bir listedir.", renk: "#5fa8e0" },
            { ad: "Sütun", ne: "Satırın içindeki sıra numarası: kaçıncı koltuk.", renk: "#ffd43b" },
            { ad: "Hücre", ne: "Satır ile sütunun kesiştiği tek kutu.", renk: "#86efac" },
          ].map((k) => (
            <div key={k.ad} className="prog-card rounded-xl px-5 py-3">
              <span className="text-lg font-semibold" style={{ color: k.renk }}>
                {k.ad}
              </span>
              <span className="text-base text-gray-300"> · {k.ne}</span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  ),

  /* 5 · KOD 1 */
  () => (
    <Frame
      eyebrow="Kod · önce tahmin et"
      title="Salonu yazalım, önce bir sırayı sonra bir koltuğu okuyalım"
      ask="salon[0] tek bir kişi mi verir, bütün sırayı mı?"
    >
      <PredictRun
        file="salon.py"
        code={`salon = [
    ["Ali", "Ece", "Can"],
    ["Naz", "Efe", "Su"],
]
print(salon[0])
print(salon[1][2])`}
        question="İki satır çıkacak. Birincisi bir liste mi, bir isim mi? İkincisi kim?"
        answer={["['Ali', 'Ece', 'Can']", "Su"]}
        note="Tek numara bütün satırı verir. İki numara tek bir hücreyi verir."
      />
    </Frame>
  ),

  /* 6 · TUZAK · MİNİ SINAV */
  () => (
    <Frame
      eyebrow="Klasik tuzak · mini sınav"
      title="Önce satır, sonra sütun; ikisi de 0&apos;dan başlar"
      ask="tablo[0][1] yazsaydık cevap ne olurdu?"
    >
      <div className="max-w-3xl mx-auto">
        <Quiz
          q="Bu kod ekrana ne yazar?"
          code={`tablo = [
    [1, 2, 3],
    [4, 5, 6],
]
print(tablo[1][0])`}
          options={["1", "2", "4", "5"]}
          correct={2}
          why="[1] ikinci satırdır: [4, 5, 6]. O satırın [0] numaralı elemanı 4."
        />
      </div>
    </Frame>
  ),

  /* 7 · XOX */
  () => (
    <Frame
      eyebrow="Dene gör · XOX"
      title="Bir hücreyi değiştirmek için adresini yazıp değer atarız"
      ask="Tam ortadaki karenin adresi nedir?"
    >
      <XoxBoard />
    </Frame>
  ),

  /* 8 · BOYUT */
  () => (
    <Frame
      eyebrow="Tahmin et"
      title="Kaç satır, kaç sütun? len&apos;e iki ayrı soru sorarız"
      ask="Salona üçüncü bir sıra eklersek hangi cevap değişir?"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
        <div className="prog-flow-bg p-5 text-center">
          <Grid rows={ORNEK_SALON} />
        </div>
        <div className="space-y-4">
          <Reveal label="len(salon) kaçtır? Tıkla">
            <span className="font-mono text-[#86efac]">2</span> · Dıştaki listede iki liste var:
            satır sayısı.
          </Reveal>
          <Reveal label="len(salon[0]) kaçtır? Tıkla">
            <span className="font-mono text-[#86efac]">3</span> · İlk satırda üç koltuk var: sütun
            sayısı.
          </Reveal>
        </div>
      </div>
    </Frame>
  ),

  /* 9 · ADIM ADIM İÇ İÇE DÖNGÜ */
  () => (
    <Frame
      eyebrow="Adım adım"
      title="İç içe döngü tabloyu sıra sıra, koltuk koltuk gezer"
      ask="İçteki döngü toplam kaç kez baştan başladı?"
    >
      <Trace
        code={[
          "notlar = [[70, 80], [90, 60]]",
          "toplam = 0",
          "for satir in notlar:",
          "    for n in satir:",
          "        toplam = toplam + n",
          "print(toplam)",
        ]}
        steps={[
          { line: 1, vars: "toplam = 0", note: "Toplam sıfırdan başlıyor." },
          { line: 2, vars: "satir = [70, 80]", note: "Dış döngü ilk satırı aldı." },
          { line: 3, vars: "n = 70", note: "İç döngü bu satırın ilk hücresinde.", hi: 0 },
          { line: 4, vars: "n = 70 · toplam = 70", note: "0 + 70 = 70.", hi: 0 },
          { line: 3, vars: "n = 80", note: "Aynı satırın ikinci hücresi.", hi: 1 },
          { line: 4, vars: "n = 80 · toplam = 150", note: "70 + 80 = 150.", hi: 1 },
          { line: 2, vars: "satir = [90, 60]", note: "Satır bitti. Dış döngü ikinci satıra geçti." },
          { line: 3, vars: "n = 90", note: "İç döngü baştan başladı: ilk hücre.", hi: 2 },
          { line: 4, vars: "n = 90 · toplam = 240", note: "150 + 90 = 240.", hi: 2 },
          { line: 3, vars: "n = 60", note: "İkinci hücre.", hi: 3 },
          { line: 4, vars: "n = 60 · toplam = 300", note: "240 + 60 = 300.", hi: 3 },
          { line: 5, vars: "toplam = 300", note: "Satır kalmadı. Ekrana 300 yazılır." },
        ]}
        render={(hi) => (
          <div className="text-center">
            <Grid
              rows={[
                ["70", "80"],
                ["90", "60"],
              ]}
              hi={hi === undefined ? null : [Math.floor(hi / 2), hi % 2]}
              cell="w-16 h-11 text-base"
            />
          </div>
        )}
      />
    </Frame>
  ),

  /* 10 · KOD 2 */
  () => (
    <Frame
      eyebrow="Kod · önce tahmin et"
      title="Kantinin iki günlük satış tablosunu toplayalım"
      ask="Yalnızca ilk günün toplamını istesek neyi değiştirirdik?"
    >
      <PredictRun
        file="kantin.py"
        code={`# Her iç liste bir gün: tost, çay, simit adedi
satis = [[3, 5, 2], [4, 1, 5]]
toplam = 0
for gun in satis:
    for adet in gun:
        toplam = toplam + adet
print(toplam)`}
        question="İki günde toplam kaç ürün satılmış? Kafadan topla."
        answer={["20"]}
        note="İlk gün 10, ikinci gün 10. Döngü altı hücrenin hepsine uğradı."
      />
    </Frame>
  ),

  /* 11 · NEREDE */
  () => (
    <Frame
      eyebrow="Nerede karşıma çıkar?"
      title="Satır ve sütun gördüğün her yerde bir tablo vardır"
      ask="Telefonunda tablo gibi çalışan başka hangi uygulama var?"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Table}
          title="Not çizelgesi"
          desc="Her satır bir öğrenci, her sütun bir sınav. Excel tam olarak budur."
          accent="#3776ab"
          delay={0.1}
        />
        <FeatureCard
          icon={Gamepad2}
          title="Oyun tahtası"
          desc="XOX, satranç, mayın tarlası: her kare bir hücre."
          accent="#ffd43b"
          delay={0.2}
        />
        <FeatureCard
          icon={Image}
          title="Fotoğraf"
          desc="Ekrandaki resim, renkli noktalardan (piksel) oluşan dev bir tablodur."
          accent="#86efac"
          delay={0.3}
        />
      </div>
      <div className="mt-4">
        <Reveal label="El kaldır: otobüs sefer saatleri de tablo mu? Tıkla">
          Evet. Satırlar hatlar, sütunlar kalkış saatleri. Hat ve saat seçince tek bir hücreye
          bakarsın.
        </Reveal>
      </div>
    </Frame>
  ),

  /* 12 · SINIFTA DENEYELİM */
  () => (
    <Frame
      eyebrow="Sınıfta deneyelim · 10 dakika"
      title="Kendi sıranın oturma planını tabloya dök"
      ask="Senin koltuğunun adresi ne çıktı?"
    >
      <Activity
        file="plan.py"
        code={`# Sınıfın ilk iki sırası
plan = [
    ["Ali", "Ece", "Can"],
    ["Naz", "Efe", "Su"],
]
print(plan[0][1])`}
        steps={[
          "İsimleri kendi sıranla ve arkandaki sırayla değiştir.",
          "Kendi adını satır ve sütun numarasıyla yazdır.",
          "Bir koltuğa başka birini oturt: plan[1][2] = ...",
          "İç içe iki for ile herkesi tek tek yazdır.",
        ]}
      />
    </Frame>
  ),

  /* 13 · KENDİNİ DENE */
  () => (
    <Frame
      eyebrow="Kendini dene"
      title="İki soru: boyut ve adres"
      ask="İkinci soruda en çok hangi yanlış şık seçildi, neden?"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Quiz
          q="len(t) kaçtır?"
          code={`t = [[1, 2], [3, 4], [5, 6]]`}
          options={["2", "3", "6", "5"]}
          correct={1}
          why="Dıştaki listede üç liste var. len satırları sayar."
        />
        <Quiz
          q="6 değerini hangisi verir?"
          code={`tablo = [[1, 2, 3], [4, 5, 6]]`}
          options={["tablo[2][3]", "tablo[2][1]", "tablo[1][2]", "tablo[6]"]}
          correct={2}
          why="6, ikinci satırın üçüncü elemanı. 0'dan sayınca: satır 1, sütun 2."
        />
      </div>
    </Frame>
  ),

  /* 14 · ÖZET + KÖPRÜ */
  () => (
    <Closing
      items={[
        {
          icon: Layers,
          title: "Tablo = liste içinde liste",
          desc: "Her satır bir listedir; satırlar da tek bir listenin içinde durur.",
          accent: "#3776ab",
        },
        {
          icon: Grid3x3,
          title: "Önce satır, sonra sütun",
          desc: "tablo[satır][sütun]. İki numara da 0'dan başlar.",
          accent: "#ffd43b",
        },
        {
          icon: Repeat,
          title: "İç içe iki for",
          desc: "Dıştaki döngü satırları, içteki döngü o satırın hücrelerini gezer.",
          accent: "#86efac",
        },
      ]}
      bridge="Listeyi ve tabloyu tanıdık. Sırada onlarla gerçek sorular çözmek var: ortalama, en büyük, arama."
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
            background: "linear-gradient(90deg, #3776ab, #5fa8e0, #ffd43b)",
            boxShadow: "0 0 16px rgba(55,118,171,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#5fa8e0]/70">
          BVA 1101 · 10. Hafta · Tablolar (Matris)
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[#5fa8e0]/50">
            <span className="text-[#5fa8e0]">
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
            className="p-1.5 text-gray-500 hover:text-[#5fa8e0] transition-colors"
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
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#5fa8e0] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
                  ? "w-5 bg-[#5fa8e0]"
                  : "w-1.5 bg-white/15 hover:bg-white/40"
              }`}
              style={
                i === current
                  ? { boxShadow: "0 0 10px rgba(95,168,224,0.7)" }
                  : undefined
              }
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#5fa8e0] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
