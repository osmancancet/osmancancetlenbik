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
  ClipboardList,
  BellRing,
  Unplug,
  Eraser,
  ArchiveRestore,
  Lightbulb,
  Flame,
  FileSearch,
  Users,
  ListOrdered,
  DoorOpen,
  Scale,
  ShieldCheck,
  MousePointerClick,
  Hand,
  Minus,
  Plus,
  Circle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
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
        <div className="absolute inset-0 sgbh-grid-bg pointer-events-none" />
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
      className="inline-flex items-center gap-3 mb-6 text-xs font-mono uppercase tracking-[0.25em] text-[#06b6d4]"
    >
      <span className="w-8 h-px bg-[#06b6d4]" />
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
  accent = "#06b6d4",
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
      className="sgbh-card sgbh-card-hover rounded-xl p-6 transition-all"
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
        style={{ background: `${accent}15`, border: `1px solid ${accent}40` }}
      >
        <Icon className="w-6 h-6" style={{ color: accent }} />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}


/* ============================================================
   ETKİLEŞİM BİLEŞENLERİ (tahmin et · tıkla · karar ver)
   ============================================================ */

const OK = "#34d399";
const BAD = "#f87171";

/* Tıklanabilir içerik ortada kalsın: kenar geçiş alanlarına (%12) taşmaz. */
function Mid({ children }: { children: ReactNode }) {
  return <div className="max-w-4xl mx-auto w-full">{children}</div>;
}

function AskLine({ children }: { children: ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="mt-5 text-sm text-gray-500"
    >
      <span className="font-mono uppercase tracking-widest text-[11px] text-[#06b6d4]/60 mr-2">
        Sınıfa sor:
      </span>
      {children}
    </motion.p>
  );
}

function TapHint({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#67e8f9]/70">
      <MousePointerClick className="w-4 h-4" />
      {children}
    </span>
  );
}

/* El kaldır: hoca sayar, sonra yorumu açar. */
function Poll({ question, comment }: { question: string; comment: string }) {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  return (
    <div className="sgbh-card rounded-xl p-6">
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "#fbbf2418", border: "1px solid #fbbf2455" }}
        >
          <Hand className="w-6 h-6 text-[#fbbf24]" />
        </div>
        <div className="text-2xl font-semibold text-white leading-snug">{question}</div>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          aria-label="Bir azalt"
          onClick={() => setCount((c) => Math.max(0, c - 1))}
          className="w-12 h-12 rounded-lg sgbh-card sgbh-card-hover flex items-center justify-center text-white"
        >
          <Minus className="w-5 h-5" />
        </button>
        <div className="w-16 text-center text-4xl font-bold font-mono text-[#67e8f9]">{count}</div>
        <button
          type="button"
          aria-label="Bir artır"
          onClick={() => setCount((c) => c + 1)}
          className="w-12 h-12 rounded-lg sgbh-card sgbh-card-hover flex items-center justify-center text-white"
        >
          <Plus className="w-5 h-5" />
        </button>
        <span className="text-sm text-gray-400">el kalktı</span>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="ml-auto px-5 py-3 rounded-lg text-sm font-semibold text-white transition-colors"
          style={{ background: "#06b6d430", border: "1px solid #06b6d480" }}
        >
          {open ? "Yorumu gizle" : "Saydık — yorumu aç"}
        </button>
      </div>
      {open ? (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 text-lg text-[#67e8f9] leading-relaxed"
        >
          {comment}
        </motion.p>
      ) : (
        <div className="mt-5">
          <TapHint>Elleri say, + ile gir, sonra yorumu aç</TapHint>
        </div>
      )}
    </div>
  );
}

/* Tahmin et → tıkla göster. */
function Reveal({
  question,
  answer,
  accent = "#06b6d4",
}: {
  question: string;
  answer: string;
  accent?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      className="sgbh-card sgbh-card-hover rounded-xl p-5 text-left w-full transition-all block"
      style={open ? { borderColor: `${accent}90` } : undefined}
    >
      <div className="text-lg font-semibold text-white leading-snug">{question}</div>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-base leading-relaxed"
          style={{ color: accent }}
        >
          {answer}
        </motion.div>
      ) : (
        <div className="mt-3">
          <TapHint>Önce tahmin et, sonra tıkla</TapHint>
        </div>
      )}
    </button>
  );
}

/* Mini sınav: tek ya da birkaç soru. */
type QuizQuestion = { q: string; options: string[]; correct: number; why: string[] };

function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const item = questions[idx];
  const go = (to: number) => {
    setIdx(to);
    setPicked(null);
  };
  return (
    <div>
      {questions.length > 1 && (
        <div className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">
          Soru {idx + 1} / {questions.length}
        </div>
      )}
      <div className="text-xl md:text-2xl font-semibold text-white leading-snug mb-4">{item.q}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {item.options.map((text, i) => {
          const color = picked === i ? (i === item.correct ? OK : BAD) : undefined;
          return (
            <button
              type="button"
              key={text}
              onClick={() => setPicked(i)}
              className="sgbh-card sgbh-card-hover rounded-xl px-4 py-3 text-left text-base text-gray-200 transition-all flex items-center gap-3"
              style={color ? { borderColor: color, background: `${color}18` } : undefined}
            >
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm flex-shrink-0"
                style={{
                  background: `${color ?? "#06b6d4"}25`,
                  color: color ?? "#67e8f9",
                }}
              >
                {"ABCD"[i]}
              </span>
              <span className="leading-snug">{text}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 min-h-[3.5rem] flex items-start justify-between gap-4">
        <div className="text-base leading-relaxed">
          {picked === null ? (
            <TapHint>Sınıf karar versin, sonra şıkka tıkla</TapHint>
          ) : (
            <motion.span
              key={`${idx}-${picked}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ color: picked === item.correct ? OK : BAD }}
            >
              {picked === item.correct ? "Doğru. " : "Olmadı. "}
              {item.why[picked]}
            </motion.span>
          )}
        </div>
        {questions.length > 1 && (
          <div className="flex gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => go(idx - 1)}
              disabled={idx === 0}
              className="px-4 py-2 rounded-lg text-sm text-gray-300 sgbh-card sgbh-card-hover disabled:opacity-30"
            >
              Önceki soru
            </button>
            <button
              type="button"
              onClick={() => go(idx + 1)}
              disabled={idx === questions.length - 1}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-30"
              style={{ background: "#06b6d430", border: "1px solid #06b6d480" }}
            >
              Sonraki soru
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* Adım adım açılan süreç. */
type StepItem = {
  title: string;
  desc: string;
  extraLabel: string;
  extra: string;
  icon: LucideIcon;
  color: string;
};

function Stepper({ steps }: { steps: StepItem[] }) {
  const [shown, setShown] = useState(1);
  const cur = steps[shown - 1];
  const CurIcon = cur.icon;
  return (
    <div>
      <div className="flex items-stretch gap-2">
        {steps.map((s, i) => {
          const open = i < shown;
          return (
            <button
              type="button"
              key={s.title}
              onClick={() => setShown(i + 1)}
              className="flex-1 min-w-0 rounded-lg px-2 py-2.5 text-center transition-all"
              style={{
                border: `1px solid ${open ? `${s.color}80` : "rgba(255,255,255,0.1)"}`,
                background: i === shown - 1 ? `${s.color}25` : open ? `${s.color}0d` : "transparent",
              }}
            >
              <div className="text-[11px] font-mono" style={{ color: open ? s.color : "#6b7280" }}>
                {i + 1}. adım
              </div>
              <div className={`text-sm font-semibold leading-tight mt-0.5 ${open ? "text-white" : "text-gray-600"}`}>
                {open ? s.title : "?"}
              </div>
            </button>
          );
        })}
      </div>
      <motion.div
        key={shown}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="sgbh-card rounded-xl p-5 mt-3 flex gap-4 min-h-[9.5rem]"
        style={{ borderColor: `${cur.color}60` }}
      >
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${cur.color}18`, border: `1px solid ${cur.color}55` }}
        >
          <CurIcon className="w-6 h-6" style={{ color: cur.color }} />
        </div>
        <div>
          <div className="text-xl font-semibold text-white">
            {shown}. {cur.title}
          </div>
          <p className="text-base text-gray-300 leading-relaxed mt-1">{cur.desc}</p>
          <p className="text-base leading-relaxed mt-2" style={{ color: cur.color }}>
            <span className="font-semibold">{cur.extraLabel}</span> {cur.extra}
          </p>
        </div>
      </motion.div>
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setShown((n) => Math.max(1, n - 1))}
          disabled={shown === 1}
          className="px-4 py-2.5 rounded-lg text-sm text-gray-300 sgbh-card sgbh-card-hover disabled:opacity-30"
        >
          Geri
        </button>
        <button
          type="button"
          onClick={() => setShown((n) => (n === steps.length ? 1 : n + 1))}
          className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white"
          style={{ background: "#06b6d430", border: "1px solid #06b6d480" }}
        >
          {shown === steps.length ? "Baştan başla" : "Sonraki adımı aç"}
        </button>
        <TapHint>
          {shown} / {steps.length}
        </TapHint>
      </div>
    </div>
  );
}

/* İki seçenekli karar kartları. */
type ClassifyItem = { text: string; answer: 0 | 1; why: string };

function Classify({ items, labels }: { items: ClassifyItem[]; labels: [string, string] }) {
  const [picks, setPicks] = useState<Record<number, 0 | 1>>({});
  const [last, setLast] = useState<number | null>(null);
  const right = items.filter((it, i) => picks[i] === it.answer).length;
  const answered = Object.keys(picks).length;
  return (
    <div>
      <div className="space-y-2">
        {items.map((it, i) => {
          const p = picks[i];
          const done = p !== undefined;
          const good = done && p === it.answer;
          return (
            <div
              key={it.text}
              className="sgbh-card rounded-lg px-4 py-2 flex items-center gap-3"
              style={done ? { borderColor: `${good ? OK : BAD}80` } : undefined}
            >
              <span className="flex-shrink-0">
                {!done ? (
                  <Circle className="w-5 h-5 text-gray-600" />
                ) : good ? (
                  <CheckCircle2 className="w-5 h-5" style={{ color: OK }} />
                ) : (
                  <XCircle className="w-5 h-5" style={{ color: BAD }} />
                )}
              </span>
              <span className="flex-1 text-[15px] text-gray-200 leading-snug">{it.text}</span>
              {labels.map((label, b) => {
                const mine = p === b;
                const c = mine ? (good ? OK : BAD) : undefined;
                return (
                  <button
                    type="button"
                    key={label}
                    onClick={() => {
                      setPicks((prev) => ({ ...prev, [i]: b as 0 | 1 }));
                      setLast(i);
                    }}
                    className="w-28 py-2 rounded-lg text-sm font-semibold transition-all flex-shrink-0"
                    style={{
                      border: `1px solid ${c ?? "rgba(6,182,212,0.35)"}`,
                      background: c ? `${c}25` : "rgba(6,182,212,0.06)",
                      color: c ?? "#e5e7eb",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="mt-3 min-h-[3rem] flex items-start justify-between gap-4">
        <div className="text-base leading-snug">
          {last === null ? (
            <TapHint>Her satır için sınıfa sor, sonra düğmeye tıkla</TapHint>
          ) : (
            <motion.span
              key={`${last}-${picks[last]}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ color: picks[last] === items[last].answer ? OK : BAD }}
            >
              {picks[last] === items[last].answer ? "Doğru. " : "Tekrar düşün. "}
              {items[last].why}
            </motion.span>
          )}
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-sm font-mono text-gray-400">
            Doğru: {right} / {items.length}
          </span>
          <button
            type="button"
            onClick={() => {
              setPicks({});
              setLast(null);
            }}
            disabled={answered === 0}
            aria-label="Sıfırla"
            className="p-2 rounded-lg sgbh-card sgbh-card-hover text-gray-300 disabled:opacity-30"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* Sınıf etkinliği: biten adımı tıkla, işaretle. */
function Checklist({ steps }: { steps: string[] }) {
  const [done, setDone] = useState<boolean[]>(() => steps.map(() => false));
  const count = done.filter(Boolean).length;
  return (
    <div>
      <div className="space-y-2">
        {steps.map((s, i) => (
          <button
            type="button"
            key={s}
            onClick={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))}
            className="sgbh-card sgbh-card-hover rounded-lg px-4 py-2.5 w-full text-left flex items-center gap-3 transition-all"
            style={done[i] ? { borderColor: `${OK}80`, background: `${OK}10` } : undefined}
          >
            {done[i] ? (
              <CheckCircle2 className="w-6 h-6 flex-shrink-0" style={{ color: OK }} />
            ) : (
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono flex-shrink-0 text-[#67e8f9] border border-[#06b6d4]/50">
                {i + 1}
              </span>
            )}
            <span className={`text-base leading-snug ${done[i] ? "text-gray-400" : "text-gray-200"}`}>{s}</span>
          </button>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <TapHint>Biten adıma tıkla</TapHint>
        <span className="text-sm font-mono text-gray-400">
          {count} / {steps.length} adım tamam
        </span>
      </div>
    </div>
  );
}

/* Kısa başlık + ipucu satırı olan bilgi kartı (tıklanmaz). */
function Note({
  icon: Icon,
  color,
  label,
  children,
}: {
  icon: LucideIcon;
  color: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="sgbh-card rounded-xl p-5"
      style={{ borderColor: `${color}55` }}
    >
      <div className="flex items-center gap-2 mb-2" style={{ color }}>
        <Icon className="w-5 h-5" />
        <span className="text-xs font-mono uppercase tracking-widest">{label}</span>
      </div>
      <div className="text-base text-gray-200 leading-relaxed">{children}</div>
    </motion.div>
  );
}

function Bullets({ items, color = "#06b6d4" }: { items: string[]; color?: string }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it) => (
        <li key={it} className="flex gap-2 text-base text-gray-300 leading-snug">
          <ChevronRight className="w-4 h-4 mt-1 flex-shrink-0" style={{ color }} />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/* ============================================================
   HAFTAYA ÖZEL OYNA-GÖR BİLEŞENLERİ
   ============================================================ */

type OrderItem = { text: string; why: string };

/* Sıraya diz: sıradaki doğru adıma tıkla. */
function OrderGame({ items, display }: { items: OrderItem[]; display: number[] }) {
  const [done, setDone] = useState(0);
  const [wrong, setWrong] = useState<number | null>(null);
  const finished = done === items.length;
  return (
    <div>
      <div className="space-y-2">
        {display.map((idx) => {
          const placed = idx < done;
          const isWrong = wrong === idx;
          const color = placed ? OK : isWrong ? BAD : undefined;
          return (
            <button
              type="button"
              key={items[idx].text}
              disabled={placed}
              onClick={() => {
                if (idx === done) {
                  setDone(done + 1);
                  setWrong(null);
                } else {
                  setWrong(idx);
                }
              }}
              className="sgbh-card sgbh-card-hover rounded-lg px-4 py-2.5 w-full text-left flex items-center gap-3 transition-all"
              style={color ? { borderColor: `${color}90`, background: `${color}12` } : undefined}
            >
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-mono font-bold flex-shrink-0"
                style={{
                  border: `1px solid ${color ?? "rgba(6,182,212,0.5)"}`,
                  color: color ?? "#67e8f9",
                }}
              >
                {placed ? idx + 1 : "?"}
              </span>
              <span className="text-base text-gray-200 leading-snug">{items[idx].text}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-3 min-h-[3rem] flex items-start justify-between gap-4">
        <div className="text-base leading-snug">
          {wrong !== null ? (
            <span style={{ color: BAD }}>Henüz değil. Bundan önce yapılması gereken bir şey var.</span>
          ) : done === 0 ? (
            <TapHint>İlk yapılacak işe tıkla, sonra sıradakine</TapHint>
          ) : (
            <motion.span key={done} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: OK }}>
              {done}. adım doğru. {items[done - 1].why}
              {finished ? " Sıra tamam." : ""}
            </motion.span>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            setDone(0);
            setWrong(null);
          }}
          disabled={done === 0 && wrong === null}
          aria-label="Sıfırla"
          className="p-2 rounded-lg sgbh-card sgbh-card-hover text-gray-300 disabled:opacity-30 flex-shrink-0"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* Gösterim amaçlı kısa özet değeri (gerçek özetler çok daha uzundur). */
function parmakIzi(metin: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < metin.length; i++) {
    h ^= metin.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, "0").toUpperCase();
}

const ASIL_NOT = "Toplantı saat 14:00, ikinci kattaki salonda.";

const DOSYALAR = [
  { label: "Kopya: hiç dokunulmadı", text: ASIL_NOT },
  { label: "Tek rakam değişti", text: "Toplantı saat 15:00, ikinci kattaki salonda." },
  { label: "Sondaki nokta silindi", text: "Toplantı saat 14:00, ikinci kattaki salonda" },
];

/* Dosyayı değiştir, parmak izinin değiştiğini gör. */
function HashDemo() {
  const [sel, setSel] = useState(0);
  const asil = parmakIzi(ASIL_NOT);
  const cur = DOSYALAR[sel];
  const ozet = parmakIzi(cur.text);
  const same = ozet === asil;
  const color = same ? OK : BAD;
  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        {DOSYALAR.map((d, i) => (
          <button
            type="button"
            key={d.label}
            onClick={() => setSel(i)}
            className="rounded-xl px-3 py-3 text-base font-semibold transition-all"
            style={{
              border: `1px solid ${i === sel ? "#06b6d4" : "rgba(6,182,212,0.3)"}`,
              background: i === sel ? "rgba(6,182,212,0.25)" : "rgba(6,182,212,0.05)",
              color: i === sel ? "#ffffff" : "#9ca3af",
            }}
          >
            {d.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
        <div className="sgbh-card rounded-xl p-4">
          <div className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-1">
            Asıl dosya (olay anında alındı)
          </div>
          <div className="text-base text-gray-200">{ASIL_NOT}</div>
          <div className="mt-2 text-xs font-mono uppercase tracking-widest text-gray-500">Parmak izi</div>
          <div className="text-2xl font-mono font-bold text-[#67e8f9] tracking-widest">{asil}</div>
        </div>
        <motion.div
          key={sel}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="sgbh-card rounded-xl p-4"
          style={{ borderColor: `${color}80` }}
        >
          <div className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-1">
            Eldeki dosya (bugün)
          </div>
          <div className="text-base text-gray-200">{cur.text}</div>
          <div className="mt-2 text-xs font-mono uppercase tracking-widest text-gray-500">Parmak izi</div>
          <div className="text-2xl font-mono font-bold tracking-widest" style={{ color }}>
            {ozet}
          </div>
        </motion.div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-4">
        <div className="text-lg font-semibold" style={{ color }}>
          {same ? "Eşleşiyor: dosya değişmemiş." : "Eşleşmiyor: dosyaya dokunulmuş."}
        </div>
        <TapHint>Üç dosyayı sırayla tıkla</TapHint>
      </div>
    </div>
  );
}

/* ============================================================
   SLIDES
   ============================================================ */

const MUDAHALE_ADIMLARI: StepItem[] = [
  {
    title: "Hazırlık",
    desc: "Olay olmadan önce plan yazılır, kimin ne yapacağı belirlenir, yedekler alınır.",
    extraLabel: "Yangında:",
    extra: "Tatbikat yapmak, söndürücüyü yerine asmak.",
    icon: ClipboardList,
    color: "#a78bfa",
  },
  {
    title: "Tespit",
    desc: "Bir şeylerin ters gittiği fark edilir: alarm çalar ya da biri haber verir.",
    extraLabel: "Yangında:",
    extra: "Duman dedektörünün ötmesi.",
    icon: BellRing,
    color: "#06b6d4",
  },
  {
    title: "Sınırlama",
    desc: "Zarar yayılmasın diye etkilenen cihaz ağdan ayrılır, ele geçen hesap kilitlenir.",
    extraLabel: "Yangında:",
    extra: "Yangın kapısını kapatmak.",
    icon: Unplug,
    color: "#fbbf24",
  },
  {
    title: "Temizleme",
    desc: "Sorunun kaynağı kaldırılır: zararlı yazılım silinir, açık kapatılır, şifreler değişir.",
    extraLabel: "Yangında:",
    extra: "Ateşi tamamen söndürmek.",
    icon: Eraser,
    color: "#f87171",
  },
  {
    title: "Kurtarma",
    desc: "Sistemler temiz yedekten geri yüklenir ve kontrol edilerek yeniden açılır.",
    extraLabel: "Yangında:",
    extra: "Binayı onarıp içeri dönmek.",
    icon: ArchiveRestore,
    color: "#34d399",
  },
  {
    title: "Ders çıkarma",
    desc: "Ekip toplanır: ne oldu, neyi iyi yaptık, bir dahakine neyi değiştireceğiz?",
    extraLabel: "Yangında:",
    extra: "Tatbikattan sonraki değerlendirme toplantısı.",
    icon: Lightbulb,
    color: "#67e8f9",
  },
];

const ILK_HAMLELER: OrderItem[] = [
  { text: "Bilgisayarı ağdan ayır: kabloyu çek, Wi-Fi’ı kapat.", why: "Önce yayılma durur." },
  { text: "Sorumluya ya da bilgi işlem ekibine haber ver.", why: "Müdahaleyi yetkili ekip yürütür." },
  { text: "Gördüklerini saatiyle not et, ekranın fotoğrafını çek.", why: "Bu notlar ileride delil olur." },
  { text: "Ekip sorunu temizler, temiz yedekten geri yükler.", why: "Temizleme ve kurtarma uzman işidir." },
  { text: "Olay bitince toplan: ne öğrendik, neyi değiştireceğiz?", why: "Ders çıkarılmazsa aynı olay tekrarlanır." },
];

const HAMLE_KARTLARI: ClassifyItem[] = [
  {
    text: "Tuhaf uyarıyı görünce hemen bilgisayara format atmak.",
    answer: 1,
    why: "Deliller silinir; sorunun nereden girdiği bir daha öğrenilemez.",
  },
  {
    text: "Bilgisayarı ağdan ayırıp sorumluya haber vermek.",
    answer: 0,
    why: "Yayılma durur ve iş yetkili ekibe geçer.",
  },
  {
    text: "Başım ağrımasın diye olayı kimseye söylememek.",
    answer: 1,
    why: "Gizlenen olay büyür. Erken haber veren suçlu değil, yardımcıdır.",
  },
  {
    text: "Ne olduğunu anlamak için şüpheli dosyaları tek tek açmak.",
    answer: 1,
    why: "Hem zarar büyüyebilir hem de izler bozulur.",
  },
  {
    text: "Ne gördüğünü ve saat kaçta gördüğünü not etmek.",
    answer: 0,
    why: "Küçük bir not, incelemede büyük kolaylık sağlar.",
  },
];

const ARA_SORU: QuizQuestion[] = [
  {
    q: "Sınırlama adımının amacı nedir?",
    options: [
      "Suçluyu bulup cezalandırmak",
      "Zararın başka cihazlara ve hesaplara yayılmasını durdurmak",
      "Bütün bilgisayarları yenilemek",
      "Olayı basına duyurmak",
    ],
    correct: 1,
    why: [
      "Suçluyu bulmak sonraki işlerdendir; önce yayılma durmalı.",
      "Yangın kapısını kapatmak gibi: önce yayılma durur, sonra söndürülür.",
      "Yenilemek gerekirse kurtarma adımında yapılır.",
      "Duyuru ayrı bir karardır; sınırlamanın işi değil.",
    ],
  },
];

const KAPANIS_SORULARI: QuizQuestion[] = [
  {
    q: "Olay müdahalesinin ilk adımı hangisidir?",
    options: ["Kurtarma", "Tespit", "Hazırlık", "Temizleme"],
    correct: 2,
    why: [
      "Kurtarma beşinci adım.",
      "Tespit ikinci adım; ondan önce hazır olmak gerekir.",
      "Plan, roller ve yedekler olaydan önce hazırlanır.",
      "Temizleme dördüncü adım.",
    ],
  },
  {
    q: "Ofiste bir bilgisayarda “dosyalarınız şifrelendi” yazısı çıktı. İlk hamlen ne olur?",
    options: [
      "Format atarım",
      "Ağdan ayırır, sorumluya haber veririm",
      "Kapatıp eve giderim",
      "Dosyaları tek tek açıp bakarım",
    ],
    correct: 1,
    why: [
      "Format delilleri siler; sorunun nasıl girdiği öğrenilemez.",
      "Önce yayılmayı durdur, sonra yetkili ekibi devreye sok.",
      "Sorun ağdaki diğer cihazlara yayılmaya devam eder.",
      "Kurcalamak hem zararı büyütür hem izleri bozar.",
    ],
  },
  {
    q: "Delil zinciri neyi gösterir?",
    options: [
      "Delilin kaç lira ettiğini",
      "Delilin kimden kime, ne zaman geçtiğini",
      "Saldırganın adresini",
      "Bilgisayarın markasını",
    ],
    correct: 1,
    why: [
      "Delilin parasal değeriyle ilgisi yok.",
      "Kargo teslim tutanağı gibi: her el değiştirme yazılır.",
      "Saldırganı inceleme bulur; zincir yalnız delilin yolculuğunu yazar.",
      "Marka bir ayrıntı olabilir ama zincirin amacı bu değil.",
    ],
  },
];

const slides: Array<(active: boolean) => ReactNode> = [
  /* ───── 1. Kapak ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2205 · 12. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="sgbh-shimmer">Olay Müdahalesi</span>
          <br />
          <span className="text-white/90">Panik Değil, Tatbikat</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Alarm çaldı ve bu kez gerçek. İlk dakikalarda ne yapacağız, neye dokunmayacağız?
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-4xl mx-auto text-left">
          <FeatureCard
            icon={Flame}
            title="Hangi sırayla?"
            desc="Hazırlıktan ders çıkarmaya altı adım."
            delay={0.3}
            accent="#fbbf24"
          />
          <FeatureCard
            icon={Unplug}
            title="İlk ne yaparım?"
            desc="Ağdan ayır, haber ver, not al."
            delay={0.45}
            accent="#06b6d4"
          />
          <FeatureCard
            icon={FileSearch}
            title="Neye dokunmam?"
            desc="Olay yerine: delil bozulmasın."
            delay={0.6}
            accent="#34d399"
          />
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. El kaldır ───── */
  () => (
    <SlideShell>
      <Mid>
        <Eyebrow>Isınma · el kaldır</Eyebrow>
        <H2 className="md:!text-4xl">Yangın alarmı çaldı. İlk ne yaparsın?</H2>
        <div className="mt-6">
          <Poll
            question="Kaçınız okulda ya da iş yerinde bir yangın tatbikatına katıldı?"
            comment="Tatbikat yapanlar alarm çalınca düşünmez, yürür: çıkış belli, toplanma yeri belli. Siber olayda da plan önceden hazırsa panik olmaz. Buna olay müdahalesi diyoruz."
          />
        </div>
        <AskLine>Hiç tatbikat yapılmamış bir binada alarm çalsa ne olurdu?</AskLine>
      </Mid>
    </SlideShell>
  ),

  /* ───── 3. Olay müdahalesi nedir ───── */
  () => (
    <SlideShell>
      <Eyebrow>Benzetme · yangın tatbikatı</Eyebrow>
      <H2>Olay müdahalesi, siber olayın yangın tatbikatıdır</H2>
      <Sub className="mt-3 max-w-4xl">
        Olay (incident): güvenliği bozan durum. Örnek: ele geçen hesap, kilitlenen dosyalar,
        dışarı sızan veri.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={ClipboardList}
          title="Plan önceden yazılır"
          desc="Olay anı plan yapma zamanı değildir; plan çekmecede hazır bekler."
          accent="#06b6d4"
          delay={0.1}
        />
        <FeatureCard
          icon={Users}
          title="Roller bellidir"
          desc="Kim karar verir, kim haber verir, kim teknik işi yapar? Herkes bilir."
          accent="#fbbf24"
          delay={0.2}
        />
        <FeatureCard
          icon={ListOrdered}
          title="Adımlar sırayla atılır"
          desc="Koşturmak yok; her adımın bir sırası ve bir amacı var."
          accent="#34d399"
          delay={0.3}
        />
      </div>
      <AskLine>Planı olay anında yazmaya kalksak ne olur?</AskLine>
    </SlideShell>
  ),

  /* ───── 4. Altı adım (adım adım) ───── */
  () => (
    <SlideShell>
      <Mid>
        <Eyebrow>Süreç · adım adım aç</Eyebrow>
        <H2 className="md:!text-4xl">Müdahale altı adımda ilerler</H2>
        <div className="mt-5">
          <Stepper steps={MUDAHALE_ADIMLARI} />
        </div>
        <AskLine>Sence gerçek hayatta en çok hangi adım atlanır?</AskLine>
      </Mid>
    </SlideShell>
  ),

  /* ───── 5. Sınırlama ───── */
  () => (
    <SlideShell>
      <Mid>
        <Eyebrow>3. adım · sınırlama</Eyebrow>
        <H2 className="md:!text-4xl">Önce yayılmayı durdur</H2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          <Note icon={Unplug} color="#fbbf24" label="Yangın kapısını kapat">
            <Bullets
              color="#fbbf24"
              items={[
                "Cihazı ağdan ayır: kabloyu çek, Wi-Fi’ı kapat.",
                "Ele geçen hesabın şifresini değiştir.",
                "Cihazı kapatma, kurcalama.",
              ]}
            />
          </Note>
          <Reveal
            accent="#67e8f9"
            question="Laboratuvardaki bir bilgisayarda dosyalar tek tek açılmaz hâle geliyor. Elektrik fişini mi çekersin, ağ kablosunu mu?"
            answer="Ağ kablosunu. Sorun diğer bilgisayarlara yayılamaz. Bilgisayarı kapatırsan o an bellekte duran izler silinir; inceleyecek ekibin işi zorlaşır."
          />
        </div>
        <AskLine>Fişi çekmek ilk akla gelen şey. Neden iyi bir fikir değil?</AskLine>
      </Mid>
    </SlideShell>
  ),

  /* ───── 6. Sıraya diz ───── */
  () => (
    <SlideShell>
      <Mid>
        <Eyebrow>Oyna-gör · sıraya diz</Eyebrow>
        <H2 className="md:!text-4xl">İlk ne yaparsın? Sıraya diz</H2>
        <Sub className="mt-2 !text-base">
          Senaryo: Staj yaptığın ofiste bir bilgisayarın ekranında &ldquo;dosyalarınız şifrelendi&rdquo; yazısı çıktı.
        </Sub>
        <div className="mt-4">
          <OrderGame items={ILK_HAMLELER} display={[3, 0, 4, 2, 1]} />
        </div>
        <AskLine>İlk iki adımın yeri değişse ne kaybederdik?</AskLine>
      </Mid>
    </SlideShell>
  ),

  /* ───── 7. Doğru hamle / yanlış hamle ───── */
  () => (
    <SlideShell>
      <Mid>
        <Eyebrow>Oyna-gör · karar ver</Eyebrow>
        <H2 className="md:!text-4xl">İyi niyetli ama zararlı hamleler var</H2>
        <div className="mt-5">
          <Classify items={HAMLE_KARTLARI} labels={["Doğru", "Yanlış"]} />
        </div>
        <AskLine>Olayı gizlemek kimi korur, kime zarar verir?</AskLine>
      </Mid>
    </SlideShell>
  ),

  /* ───── 8. Mini sınav ───── */
  () => (
    <SlideShell>
      <Mid>
        <Eyebrow>Mini sınav · dersin ortası</Eyebrow>
        <H2 className="md:!text-4xl">Buraya kadar anlaştık mı?</H2>
        <div className="mt-6">
          <Quiz questions={ARA_SORU} />
        </div>
        <AskLine>Şıkka tıklamadan önce: neden o şık?</AskLine>
      </Mid>
    </SlideShell>
  ),

  /* ───── 9. Adli bilişim ───── */
  () => (
    <SlideShell>
      <Eyebrow>Benzetme · polis şeridi çekilmiş olay yeri</Eyebrow>
      <H2>Adli bilişim, dijital olay yeri incelemesidir</H2>
      <Sub className="mt-3 max-w-4xl">
        Adli bilişim (digital forensics): dijital izleri bozmadan toplayıp inceleme işi.
        Üç soruya cevap arar.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={FileSearch}
          title="Ne oldu?"
          desc="Hangi dosyalar, hangi hesaplar etkilendi?"
          accent="#06b6d4"
          delay={0.1}
        />
        <FeatureCard
          icon={DoorOpen}
          title="Nasıl oldu?"
          desc="İçeri hangi kapıdan girildi? O kapı kapatılmalı."
          accent="#fbbf24"
          delay={0.2}
        />
        <FeatureCard
          icon={Scale}
          title="Kanıtlanabilir mi?"
          desc="Bulunan izler mahkemede delil olabilecek kadar sağlam mı?"
          accent="#a78bfa"
          delay={0.3}
        />
      </div>
      <AskLine>Olay bitti, sistem çalışıyor. Neden hâlâ inceliyoruz?</AskLine>
    </SlideShell>
  ),

  /* ───── 10. Delil bütünlüğü ───── */
  () => (
    <SlideShell>
      <Mid>
        <Eyebrow>Kural · delil bütünlüğü</Eyebrow>
        <H2 className="md:!text-4xl">Olay yerine dokunma: delil bozulmasın</H2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          <Note icon={ShieldCheck} color="#34d399" label="Üç kural">
            <Bullets
              color="#34d399"
              items={[
                "Aslına dokunma; inceleme birebir kopyada yapılır.",
                "Delili kim, ne zaman teslim aldı? Yazılır (delil zinciri).",
                "Değişmediği parmak iziyle kanıtlanır.",
              ]}
            />
          </Note>
          <Reveal
            accent="#fbbf24"
            question="Olay yaşanan bilgisayarı merak edip açtın, birkaç dosyaya baktın. Sorun ne?"
            answer="Dosyaya bakmak bile üzerindeki tarih bilgilerini değiştirebilir. Delil artık ilk hâlinde değildir; “sonradan değiştirilmiş olabilir” denebilir."
          />
        </div>
        <AskLine>Polis olay yerine neden şerit çeker? Bilgisayarda bunun karşılığı ne?</AskLine>
      </Mid>
    </SlideShell>
  ),

  /* ───── 11. Parmak izi (oyna-gör) ───── */
  () => (
    <SlideShell>
      <Mid>
        <Eyebrow>Oyna-gör · özet değeri (hash)</Eyebrow>
        <H2 className="md:!text-4xl">Tek harf değişirse parmak izi de değişir</H2>
        <Sub className="mt-2 !text-base">
          Kriptografi haftasından hatırla: özet değeri (hash), dosyanın parmak izidir. Burada kısaltılmış bir örnek var.
        </Sub>
        <div className="mt-4">
          <HashDemo />
        </div>
        <AskLine>İki parmak izi aynıysa bu bize ne söyler? Farklıysa?</AskLine>
      </Mid>
    </SlideShell>
  ),

  /* ───── 12. Sınıfta deneyelim ───── */
  () => (
    <SlideShell>
      <Mid>
        <Eyebrow>Sınıfta deneyelim · 10 dakika · 3–4 kişilik grup</Eyebrow>
        <H2 className="md:!text-4xl">Masa başı tatbikat</H2>
        <Sub className="mt-2 !text-base">
          Senaryo: Okul kulübünün sosyal medya hesabına girilemiyor; hesaptan tuhaf paylaşımlar yapılıyor.
        </Sub>
        <div className="mt-4">
          <Checklist
            steps={[
              "Rolleri dağıt: bir sözcü, bir not tutan.",
              "İlk üç hamleyi sırasıyla yaz.",
              "Kime haber verilecek? Yaz.",
              "Hangi deliller saklanacak? (ekran görüntüsü, saat)",
              "Bir ders çıkar: bir daha olmasın diye ne değişmeli?",
            ]}
          />
        </div>
        <AskLine>Gruplar ilk hamlede anlaştı mı? Farklı düşünen grup neden öyle düşündü?</AskLine>
      </Mid>
    </SlideShell>
  ),

  /* ───── 13. Kendini dene ───── */
  () => (
    <SlideShell>
      <Mid>
        <Eyebrow>Kendini dene · 3 soru</Eyebrow>
        <H2 className="md:!text-4xl">Dersten çıkmadan son kontrol</H2>
        <div className="mt-6">
          <Quiz questions={KAPANIS_SORULARI} />
        </div>
      </Mid>
    </SlideShell>
  ),

  /* ───── 14. Aklında kalsın ───── */
  () => (
    <SlideShell>
      <Eyebrow>Özet · 12. hafta</Eyebrow>
      <H2>
        Aklında kalsın: <span className="sgbh-shimmer-soft">3 şey</span>
      </H2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={Flame}
          title="1 · Altı adım"
          desc="Hazırlık, tespit, sınırlama, temizleme, kurtarma, ders çıkarma."
          accent="#fbbf24"
          delay={0.1}
        />
        <FeatureCard
          icon={Unplug}
          title="2 · Ayır, haber ver, not al"
          desc="Ağdan ayır; kapatma, kurcalama, gizleme. Yetkiliye haber ver."
          accent="#06b6d4"
          delay={0.2}
        />
        <FeatureCard
          icon={ShieldCheck}
          title="3 · Olay yerine dokunma"
          desc="Delil kopyada incelenir; değişmediği parmak iziyle kanıtlanır."
          accent="#34d399"
          delay={0.3}
        />
      </div>
      <div className="mt-6">
        <Note icon={Lightbulb} color="#a78bfa" label="Gelecek hafta">
          Başkalarının yaşadığı olaylardan ders çıkarabilir miyiz? Saldırganı önceden tanımak: tehdit istihbaratı.
        </Note>
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
            background: "linear-gradient(90deg, #06b6d4, #67e8f9, #06b6d4)",
            boxShadow: "0 0 16px rgba(6,182,212,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#06b6d4]/70">
          BVA 2205 · 12. Hafta · Olay Müdahalesi: Panik Değil, Tatbikat
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[#06b6d4]/50">
            <span className="text-[#06b6d4]">
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
            className="p-1.5 text-gray-500 hover:text-[#06b6d4] transition-colors"
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
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#06b6d4] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
                  ? "w-5 bg-[#06b6d4]"
                  : "w-1.5 bg-white/15 hover:bg-white/40"
              }`}
              style={
                i === current
                  ? { boxShadow: "0 0 10px rgba(6,182,212,0.6)" }
                  : undefined
              }
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#06b6d4] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
