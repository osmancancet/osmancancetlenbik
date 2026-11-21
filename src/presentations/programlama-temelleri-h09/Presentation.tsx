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
  Hand,
  Boxes,
  Hash,
  Ruler,
  ListOrdered,
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

/** Numaralı kutu sırası: her kutunun altında indeksi yazar. */
function Cells({
  items,
  hi = [],
  dim = [],
  onPick,
  size = "w-16 h-16 text-lg",
}: {
  items: string[];
  hi?: number[];
  dim?: number[];
  onPick?: (i: number) => void;
  size?: string;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {items.map((v, i) => {
        const box = `${size} rounded-lg font-mono font-semibold flex items-center justify-center border transition-all`;
        const style = hi.includes(i)
          ? {
              background: "linear-gradient(180deg, #3776ab, #2c5d88)",
              borderColor: "#5fa8e0",
              color: "#ffffff",
              boxShadow: "0 0 18px -2px rgba(95,168,224,0.6)",
            }
          : {
              background: "#111827",
              borderColor: "rgba(55,118,171,0.45)",
              color: dim.includes(i) ? "#4b5563" : "#ffffff",
            };
        return (
          <div key={i} className="flex flex-col items-center gap-1">
            {onPick ? (
              <button
                type="button"
                onClick={(e) => {
                  onPick(i);
                  e.currentTarget.blur();
                }}
                className={`${box} cursor-pointer hover:border-[#ffd43b]`}
                style={style}
              >
                {v}
              </button>
            ) : (
              <div className={box} style={style}>
                {v}
              </div>
            )}
            <div className="font-mono text-xs text-[#5fa8e0]">[{i}]</div>
          </div>
        );
      })}
    </div>
  );
}

/* ============================================================
   H09 ETKİLEŞİMLİ BİLEŞENLER
   ============================================================ */

/** Numaralı dolaplar: tıklanan dolap açılır, Python karşılığı altında yazar. */
function LockerRow() {
  const esyalar = ["kalem", "defter", "silgi", "cetvel", "boya"];
  const [acik, setAcik] = useState<number[]>([]);
  const [son, setSon] = useState<number | null>(null);
  return (
    <div className="prog-flow-bg p-6">
      <Cells
        items={esyalar.map((e, i) => (acik.includes(i) ? e : "?"))}
        hi={son === null ? [] : [son]}
        size="w-28 h-20 text-lg"
        onPick={(i) => {
          setAcik((a) => (a.includes(i) ? a : [...a, i]));
          setSon(i);
        }}
      />
      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="font-mono text-xl text-white min-h-[2rem]">
          {son === null ? (
            <span className="text-[#ffd43b] text-lg">Bir dolaba tıkla, açılsın.</span>
          ) : (
            <>
              <span className="text-[#9cdcfe]">dolap[{son}]</span>
              <span className="text-gray-500"> → </span>
              <span className="text-[#ce9178]">&quot;{esyalar[son]}&quot;</span>
            </>
          )}
        </div>
        <Btn
          onClick={() => {
            setAcik([]);
            setSon(null);
          }}
          disabled={acik.length === 0}
        >
          <RotateCcw className="w-4 h-4" />
          Dolapları kapat
        </Btn>
      </div>
    </div>
  );
}

/** İndeks dene: geçerli indeks değeri getirir, olmayan indeks hata verir. */
function IndexProbe() {
  const notlar = [70, 85, 60, 90, 75];
  const secenekler = [0, 2, 4, 5, 7, -1];
  const [idx, setIdx] = useState<number | null>(null);
  const gercek = idx === null ? null : idx < 0 ? notlar.length + idx : idx;
  const gecerli = gercek !== null && gercek >= 0 && gercek < notlar.length;
  return (
    <div className="prog-flow-bg p-6">
      <div className="font-mono text-sm text-[#9cdcfe] mb-3 text-center">
        notlar = [70, 85, 60, 90, 75]
      </div>
      <Cells items={notlar.map(String)} hi={gecerli && gercek !== null ? [gercek] : []} />
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        {secenekler.map((s) => (
          <Btn key={s} mono active={idx === s} onClick={() => setIdx(s)}>
            notlar[{s}]
          </Btn>
        ))}
      </div>
      <div className="mt-4 text-center text-lg min-h-[3.5rem]">
        {idx === null && <span className="text-[#ffd43b]">Bir indeks seç, ne olacağını gör.</span>}
        {idx !== null && gecerli && gercek !== null && (
          <span className="text-[#86efac] font-mono">
            {notlar[gercek]}
            {idx < 0 && (
              <span className="text-gray-400 font-sans text-base">
                {" "}
                · -1 &ldquo;sondan birinci&rdquo; demektir
              </span>
            )}
          </span>
        )}
        {idx !== null && !gecerli && (
          <div>
            <div className="text-[#fca5a5] font-mono">IndexError: list index out of range</div>
            <div className="text-gray-400 text-base">
              Türkçesi: böyle bir dolap yok. Son dolabın numarası 4.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** Liste laboratuvarı: düzelt, sona ekle, sondan çıkar; uzunluk anında değişir. */
function ListLab() {
  const ilk = [70, 85, 60];
  const [liste, setListe] = useState<number[]>(ilk);
  const [son, setSon] = useState("Bir düğmeye bas, listeyi izle.");
  return (
    <div className="prog-flow-bg p-6">
      <div className="min-h-[6rem]">
        <Cells items={liste.map(String)} />
      </div>
      <div className="mt-3 text-center font-mono text-lg">
        <span className="text-[#9cdcfe]">notlar</span>
        <span className="text-gray-500"> = </span>
        <span className="text-white">[{liste.join(", ")}]</span>
        <span className="text-gray-500"> · </span>
        <span className="text-[#ffd43b]">len(notlar) = {liste.length}</span>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <Btn
          mono
          disabled={liste.length < 3}
          onClick={() => {
            setListe((l) => l.map((v, i) => (i === 2 ? 65 : v)));
            setSon("2 numaralı dolaptaki not 65 oldu. Uzunluk değişmedi.");
          }}
        >
          notlar[2] = 65
        </Btn>
        <Btn
          mono
          disabled={liste.length >= 7}
          onClick={() => {
            setListe((l) => [...l, 90]);
            setSon("append sona yeni bir dolap ekledi. Uzunluk 1 arttı.");
          }}
        >
          notlar.append(90)
        </Btn>
        <Btn
          mono
          disabled={liste.length === 0}
          onClick={() => {
            setListe((l) => l.slice(0, -1));
            setSon("pop son dolabı kaldırdı. Uzunluk 1 azaldı.");
          }}
        >
          notlar.pop()
        </Btn>
        <Btn
          onClick={() => {
            setListe(ilk);
            setSon("Liste başa döndü.");
          }}
        >
          <RotateCcw className="w-4 h-4" />
          Sıfırla
        </Btn>
      </div>
      <div className="mt-3 text-center text-base text-gray-300">{son}</div>
    </div>
  );
}

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* 1 · KAPAK */
  () => (
    <Cover
      week="9. Hafta"
      title="Listeler"
      second="Tek isim, çok değer"
      sub="Otuz notu otuz ayrı değişkende tutmak yerine hepsini tek bir listeye koymayı öğreniyoruz."
      tags={[
        { tag: "[ ]", name: "Tanımla", desc: "Listeyi oluştur", color: "#3776ab" },
        { tag: "[0]", name: "Numarayla ulaş", desc: "Oku, değiştir, ekle", color: "#5fa8e0" },
        { tag: "for", name: "Sırayla gez", desc: "Hepsini dolaş", color: "#ffd43b" },
      ]}
    />
  ),

  /* 2 · SORUN */
  () => (
    <Frame
      eyebrow="Sorun"
      title="30 öğrencinin notu için 30 değişken mi açacağız?"
      ask="Sınıf 30 değil 300 kişi olsaydı ne yapardık?"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="prog-card rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3 text-[#fca5a5]">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bildiğimiz yol</span>
          </div>
          <pre className="prog-editor rounded-lg px-4 py-3 text-[16px]">{`not1 = 75
not2 = 90
not3 = 60
# ... not30'a kadar?`}</pre>
          <div className="text-base text-gray-400 mt-3">
            Her not için ayrı isim, ayrı satır.
          </div>
        </div>
        <div className="space-y-4">
          <div className="prog-card-yellow rounded-xl p-5">
            <div className="flex items-center gap-2 text-[#ffd43b] mb-1">
              <Hand className="w-5 h-5" />
              <span className="text-xs font-mono uppercase tracking-widest">El kaldır</span>
            </div>
            <div className="text-lg text-white">
              Bu yolla 30 notun ortalamasını almak için kaç değişken yazarız?
            </div>
          </div>
          <Reveal label="Tahminler alındı mı? Tıkla, göster">
            30 değişken, 30 satır ve upuzun bir toplama. Çözüm:{" "}
            <span className="font-mono text-[#86efac]">notlar = [75, 90, 60]</span> gibi{" "}
            <span className="text-white font-semibold">tek bir liste</span>.
          </Reveal>
        </div>
      </div>
    </Frame>
  ),

  /* 3 · BENZETME */
  () => (
    <Frame
      eyebrow="Benzetme · okul dolapları"
      title="Liste, yan yana duran numaralı dolaplar gibidir"
      ask="İlk dolabın numarası kaç çıktı? Beklediğiniz bu muydu?"
    >
      <LockerRow />
    </Frame>
  ),

  /* 4 · KAVRAM */
  () => (
    <Frame
      eyebrow="Kavram"
      title="Bir listede üç şey vardır: eleman, indeks, uzunluk"
      ask="Sınıf listesi bir Python listesi olsaydı senin indeksin kaç olurdu?"
    >
      <pre className="prog-editor rounded-lg px-5 py-3 text-[18px] mb-5">{`dolap = ["kalem", "defter", "silgi"]`}</pre>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Boxes}
          title="Eleman"
          desc="Dolabın içindeki şey. Burada: kalem, defter, silgi."
          accent="#3776ab"
          delay={0.1}
        />
        <FeatureCard
          icon={Hash}
          title="İndeks (sıra numarası)"
          desc="Dolabın kapısındaki numara. 0'dan başlar: 0, 1, 2."
          accent="#ffd43b"
          delay={0.2}
        />
        <FeatureCard
          icon={Ruler}
          title="Uzunluk"
          desc="Kaç dolap olduğu. len(dolap) yazarsın, 3 cevabını alırsın."
          accent="#86efac"
          delay={0.3}
        />
      </div>
    </Frame>
  ),

  /* 5 · TUZAK · MİNİ SINAV */
  () => (
    <Frame
      eyebrow="Klasik tuzak · mini sınav"
      title="Python saymaya 1&apos;den değil 0&apos;dan başlar"
      ask="Üç elemanlı bu listede en büyük indeks kaç?"
    >
      <div className="max-w-3xl mx-auto">
        <Quiz
          q="Bu kod ekrana ne yazar?"
          code={`meyveler = ["elma", "armut", "kiraz"]
print(meyveler[1])`}
          options={["elma", "armut", "kiraz", "Hata verir"]}
          correct={1}
          why="İndeks 0'dan başlar: [0] elma, [1] armut, [2] kiraz."
        />
      </div>
    </Frame>
  ),

  /* 6 · KOD 1 */
  () => (
    <Frame
      eyebrow="Kod · önce tahmin et"
      title="Sepetten numarayla eleman okuyalım"
      ask="sepet[3] yazsaydık ne olurdu?"
    >
      <PredictRun
        file="sepet.py"
        code={`sepet = ["elma", "armut", "kiraz"]
print(sepet[0])
print(sepet[2])
print(len(sepet))`}
        question="Ekrana alt alta üç satır çıkacak. Sırayla ne yazar?"
        answer={["elma", "kiraz", "3"]}
        note="Uzunluk 3, ama son indeks 2. Bu ikisi hep 1 farklıdır."
      />
    </Frame>
  ),

  /* 7 · OLMAYAN DOLAP */
  () => (
    <Frame
      eyebrow="Klasik tuzak · dene gör"
      title="Olmayan dolabı açmak istersen Python hata verir"
      ask="5 elemanlı listede notlar[5] neden yok?"
    >
      <IndexProbe />
    </Frame>
  ),

  /* 8 · DEĞİŞTİR, EKLE */
  () => (
    <Frame
      eyebrow="Dene gör"
      title="Liste değişebilir: düzelt, sona ekle, sondan çıkar"
      ask="append yeni elemanı başa mı koydu, sona mı?"
    >
      <ListLab />
    </Frame>
  ),

  /* 9 · KOD 2 */
  () => (
    <Frame
      eyebrow="Kod · önce tahmin et"
      title="Yanlış girilen notu düzeltip yeni not ekleyelim"
      ask="Bu koddan sonra notlar[3] kaçtır?"
    >
      <PredictRun
        file="notlar.py"
        code={`notlar = [70, 85, 60]
notlar[2] = 65       # 2 numaralı notu düzelt
notlar.append(90)    # sona yeni not ekle
print(notlar)
print(len(notlar))`}
        question="Liste son hâliyle nasıl görünür? Uzunluğu kaç olur?"
        answer={["[70, 85, 65, 90]", "4"]}
        note="60 gitti, yerine 65 geldi; 90 en sona eklendi."
      />
    </Frame>
  ),

  /* 10 · ADIM ADIM FOR */
  () => (
    <Frame
      eyebrow="Adım adım"
      title="for döngüsü dolapları sırayla, tek tek açar"
      ask="toplam neden 0 ile başlıyor?"
    >
      <Trace
        code={[
          "harcama = [40, 25, 35]",
          "toplam = 0",
          "for h in harcama:",
          "    toplam = toplam + h",
          "print(toplam)",
        ]}
        steps={[
          { line: 1, vars: "toplam = 0", note: "Kumbara boş başlıyor." },
          { line: 2, vars: "h = 40 · toplam = 0", note: "Döngü ilk dolabı açtı: h artık 40.", hi: 0 },
          { line: 3, vars: "h = 40 · toplam = 40", note: "0 + 40 = 40.", hi: 0 },
          { line: 2, vars: "h = 25 · toplam = 40", note: "Sıradaki dolap: h artık 25.", hi: 1 },
          { line: 3, vars: "h = 25 · toplam = 65", note: "40 + 25 = 65.", hi: 1 },
          { line: 2, vars: "h = 35 · toplam = 65", note: "Son dolap: h artık 35.", hi: 2 },
          { line: 3, vars: "h = 35 · toplam = 100", note: "65 + 35 = 100.", hi: 2 },
          { line: 4, vars: "toplam = 100", note: "Dolap kalmadı, döngü bitti. Ekrana 100 yazılır." },
        ]}
        render={(hi) => (
          <Cells items={["40", "25", "35"]} hi={hi === undefined ? [] : [hi]} />
        )}
      />
    </Frame>
  ),

  /* 11 · KOD 3 */
  () => (
    <Frame
      eyebrow="Kod · önce tahmin et"
      title="Notların ortalamasını listeyi gezerek bulalım"
      ask="Listeye beşinci bir not eklersek kodun hangi satırı değişir?"
    >
      <PredictRun
        file="ortalama.py"
        code={`notlar = [70, 80, 60, 90]
toplam = 0
for n in notlar:
    toplam = toplam + n
print(toplam / len(notlar))`}
        question="Ekrana tek bir sayı çıkacak. Kaç? (İpucu: toplam 300.)"
        answer={["75.0"]}
        note="300 / 4 = 75. Python bölme sonucunu hep ondalıklı yazar: 75.0."
      />
    </Frame>
  ),

  /* 12 · SINIFTA DENEYELİM */
  () => (
    <Frame
      eyebrow="Sınıfta deneyelim · 8 dakika"
      title="Kendi haftalık harcama listeni yaz"
      ask="En çok hangi gün harcamışsın? Listenin kaçıncı indeksi?"
    >
      <Activity
        file="harcama.py"
        code={`# Bu hafta 5 günde harcadıkların (TL)
harcama = [120, 80, 0, 150, 60]
print(harcama[0])`}
        steps={[
          "Sayıları kendi harcamalarınla değiştir, çalıştır.",
          "Son günün harcamasını yazdır.",
          "append ile 6. günü ekle, len ile kontrol et.",
          "for ile hepsini topla, toplamı yazdır.",
        ]}
      />
    </Frame>
  ),

  /* 13 · KENDİNİ DENE */
  () => (
    <Frame
      eyebrow="Kendini dene"
      title="İki soru: indeks ve uzunluk"
      ask="Yanlış şıkkı seçenler neyi karıştırmış olabilir?"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Quiz
          q="Son elemanın (40) indeksi kaçtır?"
          code={`sayilar = [10, 20, 30, 40]`}
          options={["4", "3", "40", "1"]}
          correct={1}
          why="4 eleman var; indeksler 0, 1, 2, 3. Son indeks = uzunluk - 1."
        />
        <Quiz
          q="Ekrana ne yazar?"
          code={`liste = [5, 8]
liste.append(1)
print(len(liste))`}
          options={["2", "1", "3", "14"]}
          correct={2}
          why="append sona bir eleman ekler: [5, 8, 1]. Uzunluk 3 olur."
        />
      </div>
    </Frame>
  ),

  /* 14 · ÖZET + KÖPRÜ */
  () => (
    <Closing
      items={[
        {
          icon: ListOrdered,
          title: "Tek isim, çok değer",
          desc: "Liste köşeli parantezle yazılır: notlar = [70, 85, 60].",
          accent: "#3776ab",
        },
        {
          icon: Hash,
          title: "Saymaya 0'dan başla",
          desc: "İlk eleman [0]. Son indeks, uzunluktan 1 eksiktir.",
          accent: "#ffd43b",
        },
        {
          icon: Repeat,
          title: "for hepsini gezer",
          desc: "Döngü elemanları sırayla verir; toplamı, ortalamayı böyle buluruz.",
          accent: "#86efac",
        },
      ]}
      bridge="Tek sıra dolap yetmeyince ne olur? Satırı ve sütunu olan tablolara geçiyoruz."
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
          BVA 1101 · 9. Hafta · Listeler
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
