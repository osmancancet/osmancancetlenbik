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
  Monitor,
  Database,
  Search,
  BellRing,
  Eye,
  Cctv,
  ScrollText,
  PhoneCall,
  Siren,
  ClipboardList,
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
   HAFTAYA ÖZEL BİLEŞENLER
   ============================================================ */

/* Tek bir kayıt (log): kim, ne zaman, nereden, ne oldu. */
function LogRow({
  kim,
  zaman,
  yer,
  olay,
  delay = 0,
}: {
  kim: string;
  zaman: string;
  yer: string;
  olay: string;
  delay?: number;
}) {
  const cells = [
    { label: "Kim?", value: kim, color: "#67e8f9" },
    { label: "Ne zaman?", value: zaman, color: "#fbbf24" },
    { label: "Nereden?", value: yer, color: "#a78bfa" },
    { label: "Ne oldu?", value: olay, color: "#34d399" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="sgbh-card rounded-lg px-4 py-2.5 grid grid-cols-4 gap-4"
    >
      {cells.map((c) => (
        <div key={c.label}>
          <div className="text-[11px] font-mono uppercase tracking-widest" style={{ color: c.color }}>
            {c.label}
          </div>
          <div className="text-base text-white leading-snug">{c.value}</div>
        </div>
      ))}
    </motion.div>
  );
}

const ESIKLER = [
  {
    n: 1,
    gurultu: 100,
    kacirma: 4,
    yorum: "Şifresini bir kez yanlış yazan herkes için alarm çalar. Ekip yorulur, alarmlara bakmayı bırakır.",
  },
  {
    n: 3,
    gurultu: 65,
    kacirma: 10,
    yorum: "Hâlâ çok gürültü var: pazartesi sabahı herkes şifresini unutur.",
  },
  {
    n: 5,
    gurultu: 30,
    kacirma: 20,
    yorum: "Dengeli: sıradan unutkanlık geçer, ısrarlı deneme yakalanır.",
  },
  {
    n: 10,
    gurultu: 14,
    kacirma: 38,
    yorum: "Ekran sakin; ama biri 9 şifreyi kimse fark etmeden deneyebilir.",
  },
  {
    n: 30,
    gurultu: 5,
    kacirma: 72,
    yorum: "Alarm çok seyrek çalar. Saldırgan onlarca şifre dener, kimse duymaz.",
  },
  {
    n: 100,
    gurultu: 2,
    kacirma: 96,
    yorum: "Alarm neredeyse hiç çalmaz. Saldırıyı da duymazsın.",
  },
];

/* Alarm eşiğini seç: yanlış alarm ile kaçırma riski nasıl değişiyor? */
function ThresholdDemo() {
  const [sel, setSel] = useState(0);
  const cur = ESIKLER[sel];
  const bars = [
    { label: "Yanlış alarm (boşuna çalan)", value: cur.gurultu, color: "#fbbf24" },
    { label: "Saldırıyı kaçırma riski", value: cur.kacirma, color: BAD },
  ];
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-400 mr-1">Alarm kaç hatalı girişte çalsın?</span>
        {ESIKLER.map((e, i) => (
          <button
            type="button"
            key={e.n}
            onClick={() => setSel(i)}
            className="flex-1 py-3 rounded-lg text-xl font-bold font-mono transition-all"
            style={{
              border: `1px solid ${i === sel ? "#06b6d4" : "rgba(6,182,212,0.3)"}`,
              background: i === sel ? "rgba(6,182,212,0.25)" : "rgba(6,182,212,0.05)",
              color: i === sel ? "#ffffff" : "#9ca3af",
            }}
          >
            {e.n}
          </button>
        ))}
      </div>
      <div className="sgbh-card rounded-xl p-5 mt-3">
        <div className="space-y-3">
          {bars.map((b) => (
            <div key={b.label} className="flex items-center gap-4">
              <div className="w-56 text-sm text-gray-300 flex-shrink-0">{b.label}</div>
              <div className="flex-1 h-5 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: b.color }}
                  animate={{ width: `${b.value}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          ))}
        </div>
        <motion.p
          key={sel}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-lg text-[#67e8f9] leading-snug min-h-[3.5rem]"
        >
          {cur.yorum}
        </motion.p>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <TapHint>Sayılara sırayla tıkla, çubukları izle</TapHint>
        <span className="text-xs text-gray-600">Çubuklar örnek amaçlıdır; ölçüm değildir.</span>
      </div>
    </div>
  );
}

/* ============================================================
   SLIDES
   ============================================================ */

const SIEM_ADIMLARI: StepItem[] = [
  {
    title: "Kaynaklar",
    desc: "Bilgisayarlar, sunucular, e-posta, kapıdaki kart okuyucu… Her biri kendi kaydını tutar.",
    extraLabel: "Benzetme:",
    extra: "AVM’nin her katındaki ayrı ayrı kameralar.",
    icon: Monitor,
    color: "#a78bfa",
  },
  {
    title: "Toplama",
    desc: "SIEM bütün bu kayıtları tek bir yere çeker. Artık yüz ayrı yere bakmak gerekmez.",
    extraLabel: "Benzetme:",
    extra: "Bütün kameraların tek odadaki ekranlara bağlanması.",
    icon: Database,
    color: "#06b6d4",
  },
  {
    title: "Karşılaştırma",
    desc: "Kayıtları yan yana koyar: aynı kişi beş dakika arayla iki ayrı ülkeden giriş yapmış mı?",
    extraLabel: "Benzetme:",
    extra: "Otoparktaki adamla kasadaki adamın aynı kişi olduğunu fark etmek.",
    icon: Search,
    color: "#22d3ee",
  },
  {
    title: "Alarm",
    desc: "Şüpheli bir durum yakalanınca ekrana uyarı düşer.",
    extraLabel: "Benzetme:",
    extra: "Ekranın kırmızı yanıp sönmesi.",
    icon: BellRing,
    color: "#fbbf24",
  },
  {
    title: "İnsan bakar",
    desc: "Son kararı SOC çalışanı verir: gerçek bir sorun mu, yanlış alarm mı?",
    extraLabel: "Unutma:",
    extra: "SIEM gösterir; karar veren ve harekete geçen insandır.",
    icon: Eye,
    color: "#34d399",
  },
];

const KAYIT_KARTLARI: ClassifyItem[] = [
  {
    text: "Hafta içi 09:05 · muhasebeci · kendi bilgisayarından · giriş başarılı.",
    answer: 0,
    why: "Mesai saati, bilinen kişi, bilinen cihaz. Sıradan bir sabah.",
  },
  {
    text: "Aynı hesaba 2 dakika içinde 40 hatalı şifre denemesi.",
    answer: 1,
    why: "İnsan bu kadar hızlı ve çok yanılmaz; biri şifre deniyor olabilir.",
  },
  {
    text: "Gece 03:20 · stajyer hesabı · tüm müşteri listesini indirdi.",
    answer: 1,
    why: "Saat de, yapılan iş de stajyerin olağan işine uymuyor.",
  },
  {
    text: "Öğle arası · bir çalışan şifresini 1 kez yanlış yazdı, sonra girdi.",
    answer: 0,
    why: "Herkesin başına gelir. Tek hata alarm sebebi değildir.",
  },
  {
    text: "Aynı hesap 10 dakika arayla önce Manisa’dan, sonra yurt dışından giriş yaptı.",
    answer: 1,
    why: "On dakikada yurt dışına gidilmez; hesabı iki ayrı kişi kullanıyor olabilir.",
  },
];

const ARA_SORU: QuizQuestion[] = [
  {
    q: "SIEM’in SOC ekibine en büyük faydası hangisidir?",
    options: [
      "Bütün saldırıları kendiliğinden engeller",
      "Dağınık kayıtları tek yerde toplar, şüpheli olanı öne çıkarır",
      "Çalışanların şifrelerini saklar",
      "Bilgisayarları hızlandırır",
    ],
    correct: 1,
    why: [
      "SIEM engellemez; gösterir ve uyarır. Harekete geçen insandır.",
      "Tek ekran ve alarm: ekip neye bakacağını bilir.",
      "Şifre saklamak SIEM’in işi değildir.",
      "Hızla ilgisi yok; işi kayıt toplamak ve uyarmak.",
    ],
  },
];

const KAPANIS_SORULARI: QuizQuestion[] = [
  {
    q: "Log (kayıt) nedir?",
    options: [
      "Bir tür virüs",
      "Sistemde olanların saatli kaydı",
      "Şifreleme yöntemi",
      "Yedek dosyası",
    ],
    correct: 1,
    why: [
      "Log zararlı bir şey değil; tam tersine savunmanın gözüdür.",
      "Kim, ne zaman, nereden, ne yaptı: log bunu yazar.",
      "Şifrelemeyi kriptografi haftasında gördük; log başka şey.",
      "Yedek verinin kopyasıdır; log ise olanların günlüğü.",
    ],
  },
  {
    q: "Hangi kayıt daha şüphelidir?",
    options: [
      "Sabah 09:00’da kendi bilgisayarından giriş",
      "Bir kez yanlış yazılan şifre",
      "Gece 03:00’te, hiç gidilmemiş bir ülkeden yönetici girişi",
      "Öğle arasında e-posta okumak",
    ],
    correct: 2,
    why: [
      "Bilinen saat, bilinen cihaz: sıradan.",
      "Tek hata herkesin başına gelir.",
      "Saat, yer ve hesabın yetkisi birlikte alarm sebebidir.",
      "Sıradan bir iş.",
    ],
  },
  {
    q: "Alarm çok hassas ayarlanırsa ne olur?",
    options: [
      "Hiç alarm çalmaz",
      "Yanlış alarm çoğalır; ekip gerçek alarmı kaçırabilir",
      "Saldırılar kendiliğinden durur",
      "Kayıtlar silinir",
    ],
    correct: 1,
    why: [
      "Tam tersi: durmadan çalar.",
      "Sürekli çalan alarma kimse bakmaz; gerçek olan arada kaybolur.",
      "Alarm durdurmaz, yalnız haber verir.",
      "Alarm ayarının kayıtları silmekle ilgisi yok.",
    ],
  },
];

const slides: Array<(active: boolean) => ReactNode> = [
  /* ───── 1. Kapak ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2205 · 11. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="sgbh-shimmer">SOC ve SIEM</span>
          <br />
          <span className="text-white/90">Güvenlik Kamerası Odası</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Kilit taktık, ikinci kilidi de açtık. Peki biri kapıyı zorlarsa bunu kim, nasıl fark edecek?
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-4xl mx-auto text-left">
          <FeatureCard
            icon={Cctv}
            title="Kim izliyor?"
            desc="SOC: ekranların başındaki güvenlik ekibi."
            delay={0.3}
            accent="#06b6d4"
          />
          <FeatureCard
            icon={ScrollText}
            title="Neye bakıyor?"
            desc="Kayıtlara: kim, ne zaman, nereden, ne yaptı?"
            delay={0.45}
            accent="#fbbf24"
          />
          <FeatureCard
            icon={BellRing}
            title="Nasıl fark ediyor?"
            desc="SIEM kayıtları toplar, şüpheli olanda alarm verir."
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
        <H2 className="md:!text-4xl">O uyarıyı sana kim gönderdi?</H2>
        <div className="mt-6">
          <Poll
            question="Kaçınız bugüne kadar “hesabınıza yeni bir cihazdan giriş yapıldı” uyarısı aldı?"
            comment="O mesajı bir insan yazmadı. Bir sistem giriş kayıtlarını izledi, alışılmadık bir şey gördü ve sana haber verdi. Kurumlarda bu işi yapan yapıya SOC ve SIEM diyoruz."
          />
        </div>
        <AskLine>O uyarı hiç gelmeseydi yabancı girişi ne zaman fark ederdin?</AskLine>
      </Mid>
    </SlideShell>
  ),

  /* ───── 3. SOC ───── */
  () => (
    <SlideShell>
      <Eyebrow>Benzetme · AVM’nin kamera odası</Eyebrow>
      <H2>SOC, kurumun güvenlik kamerası odasıdır</H2>
      <Sub className="mt-3 max-w-4xl">
        SOC (Güvenlik Operasyon Merkezi): kurumun sistemlerini sürekli izleyen ekip.
        Kamera odasındaki görevliler gibi üç iş yapar.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={Eye}
          title="1 · İzler"
          desc="Ekranlara bakar: sistemlerde şu an neler oluyor?"
          accent="#06b6d4"
          delay={0.1}
        />
        <FeatureCard
          icon={Search}
          title="2 · Fark eder"
          desc="Olağan dışı olanı ayırır: bu saatte bu kapıda kim var?"
          accent="#fbbf24"
          delay={0.2}
        />
        <FeatureCard
          icon={PhoneCall}
          title="3 · Haber verir"
          desc="Sorun gerçekse ilgili ekibi arar ve müdahaleyi başlatır."
          accent="#34d399"
          delay={0.3}
        />
      </div>
      <AskLine>Kamera var ama ekrana bakan kimse yoksa ne olur?</AskLine>
    </SlideShell>
  ),

  /* ───── 4. Log ───── */
  () => (
    <SlideShell>
      <Mid>
        <Eyebrow>Kavram · kayıt (log)</Eyebrow>
        <H2 className="md:!text-4xl">Her sistem bir günlük tutar: log</H2>
        <Sub className="mt-2 !text-base">
          Log (kayıt): apartmanın ziyaretçi defteri gibi. Her satır dört soruya cevap verir.
        </Sub>
        <div className="mt-4">
          <LogRow kim="ayse.yilmaz" zaman="Salı, 03:14" yer="Yurt dışı, yeni cihaz" olay="Giriş başarılı" delay={0.2} />
        </div>
        <div className="mt-4">
          <Reveal
            accent="#fbbf24"
            question="Ayşe Manisa’da yaşıyor ve gündüz çalışıyor. Bu kayıtta seni ne rahatsız ediyor?"
            answer="Saat ve yer. Gece 03:14’te, yurt dışından, daha önce görülmemiş bir cihaz. Tek başına kanıt değil; ama mutlaka bakılması gereken bir kayıt."
          />
        </div>
        <AskLine>Aynı kayıt &ldquo;Salı 10:30, Manisa, kendi bilgisayarı&rdquo; olsaydı dikkatini çeker miydi?</AskLine>
      </Mid>
    </SlideShell>
  ),

  /* ───── 5. SIEM (adım adım) ───── */
  () => (
    <SlideShell>
      <Mid>
        <Eyebrow>SIEM · adım adım aç</Eyebrow>
        <H2 className="md:!text-4xl">SIEM bütün kameraları tek ekranda toplar</H2>
        <div className="mt-5">
          <Stepper steps={SIEM_ADIMLARI} />
        </div>
        <AskLine>Yüz ayrı ekrana tek kişi aynı anda bakabilir mi?</AskLine>
      </Mid>
    </SlideShell>
  ),

  /* ───── 6. İlişkilendirme ───── */
  () => (
    <SlideShell>
      <Mid>
        <Eyebrow>Örnek · kayıtları yan yana koy</Eyebrow>
        <H2 className="md:!text-4xl">Tek kayıt masum, yan yana gelince hikâye</H2>
        <div className="mt-5 space-y-2">
          <LogRow kim="mehmet.k" zaman="02:10" yer="Bilinmeyen cihaz" olay="25 kez hatalı şifre" delay={0.1} />
          <LogRow kim="mehmet.k" zaman="02:14" yer="Bilinmeyen cihaz" olay="Giriş başarılı" delay={0.2} />
          <LogRow kim="mehmet.k" zaman="02:16" yer="Bilinmeyen cihaz" olay="Müşteri listesi indirildi" delay={0.3} />
        </div>
        <div className="mt-3">
          <Reveal
            accent="#fbbf24"
            question="Bu üç kayıt birlikte ne anlatıyor?"
            answer="Biri şifreyi deneye deneye bulmuş, içeri girmiş ve veriyi alıyor olabilir. SIEM’in işi bu parçaları birleştirmek; buna ilişkilendirme (korelasyon) denir."
          />
        </div>
        <AskLine>Üç kaydı ayrı günlerde, ayrı ekranlarda görsen alarm verir miydin?</AskLine>
      </Mid>
    </SlideShell>
  ),

  /* ───── 7. Normal mi, şüpheli mi? ───── */
  () => (
    <SlideShell>
      <Mid>
        <Eyebrow>Oyna-gör · SOC çalışanı sensin</Eyebrow>
        <H2 className="md:!text-4xl">Bu kayıt normal mi, şüpheli mi?</H2>
        <div className="mt-5">
          <Classify items={KAYIT_KARTLARI} labels={["Normal", "Şüpheli"]} />
        </div>
        <AskLine>Seni en çok hangi ayrıntı şüphelendirdi: saat mi, yer mi, yapılan iş mi?</AskLine>
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

  /* ───── 9. Alarm eşiği (oyna-gör) ───── */
  () => (
    <SlideShell>
      <Mid>
        <Eyebrow>Oyna-gör · alarm ayarı</Eyebrow>
        <H2 className="md:!text-4xl">Alarm çok hassas da olmaz, çok gevşek de</H2>
        <Sub className="mt-2 !text-base">
          Yanlış alarm (false positive): ortada sorun yokken çalan alarm. Kedi geçince öten araba alarmı gibi.
        </Sub>
        <div className="mt-4">
          <ThresholdDemo />
        </div>
        <AskLine>Sen olsan kaçta alarm çaldırırdın? Neden?</AskLine>
      </Mid>
    </SlideShell>
  ),

  /* ───── 10. Öncelik ───── */
  () => (
    <SlideShell>
      <Mid>
        <Eyebrow>Öncelik · hangisine önce bakılır?</Eyebrow>
        <H2 className="md:!text-4xl">Her alarm aynı aciliyette değildir</H2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          <Note icon={Siren} color="#f87171" label="Üç öncelik seviyesi">
            <Bullets
              color="#f87171"
              items={[
                "Düşük: not et, sırası gelince bak.",
                "Orta: bugün içinde bak.",
                "Yüksek: işi bırak, şimdi bak ve haber ver.",
              ]}
            />
          </Note>
          <Reveal
            accent="#fbbf24"
            question="Aynı anda iki alarm geldi. A: Bir öğrenci 3 kez yanlış şifre girdi. B: Yönetici hesabına gece yurt dışından giriş yapıldı. Hangisine önce bakarsın?"
            answer="B. Yönetici hesabı her kapıyı açar; zarar çok büyük olabilir. Öncelik, hesabın gücüne ve olası zarara göre belirlenir."
          />
        </div>
        <AskLine>Acil servisteki sıra da böyle mi işler? Kim önce alınır?</AskLine>
      </Mid>
    </SlideShell>
  ),

  /* ───── 11. Alarmı gören ne yapar ───── */
  () => (
    <SlideShell>
      <Eyebrow>SOC’ta bir alarm · gelecek haftaya hazırlık</Eyebrow>
      <H2>Alarmı gören kişi üç şey yapar</H2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={Search}
          title="1 · Doğrular"
          desc="Gerçek bir sorun mu, yanlış alarm mı? Kayıtlara bakıp karar verir."
          accent="#06b6d4"
          delay={0.1}
        />
        <FeatureCard
          icon={ClipboardList}
          title="2 · Kaydeder"
          desc="Ne gördüğünü, saat kaçta gördüğünü ve ne yaptığını yazar."
          accent="#fbbf24"
          delay={0.2}
        />
        <FeatureCard
          icon={PhoneCall}
          title="3 · Haber verir"
          desc="Sorun gerçekse olay müdahale ekibini devreye sokar."
          accent="#34d399"
          delay={0.3}
        />
      </div>
      <AskLine>Yanlış alarm çıktı diye not almasak ne kaybederiz?</AskLine>
    </SlideShell>
  ),

  /* ───── 12. Sınıfta deneyelim ───── */
  () => (
    <SlideShell>
      <Mid>
        <Eyebrow>Sınıfta deneyelim · 10 dakika · telefonla</Eyebrow>
        <H2 className="md:!text-4xl">Kendi kayıtlarını oku</H2>
        <Sub className="mt-2 !text-base">
          Yalnız kendi hesabın. Menü adları telefona göre biraz değişebilir.
        </Sub>
        <div className="mt-4">
          <Checklist
            steps={[
              "Google hesabını aç, “Güvenlik” bölümüne gir.",
              "Son güvenlik etkinliklerine ve cihaz listesine bak.",
              "Bir kayıt seç: kim, ne zaman, nereden, ne oldu? Dördünü bul.",
              "Tanımadığın bir cihaz varsa o cihazdan çıkış yap.",
              "Yanındakine bir normal, bir dikkat çekici kayıt anlat.",
            ]}
          />
        </div>
        <AskLine>Kimin listesinde tanımadığı ya da unuttuğu bir cihaz çıktı?</AskLine>
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
      <Eyebrow>Özet · 11. hafta</Eyebrow>
      <H2>
        Aklında kalsın: <span className="sgbh-shimmer-soft">3 şey</span>
      </H2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={Cctv}
          title="1 · SOC kamera odasıdır"
          desc="Sistemleri izleyen, olağan dışını fark eden ve haber veren ekip."
          accent="#06b6d4"
          delay={0.1}
        />
        <FeatureCard
          icon={BellRing}
          title="2 · SIEM tek ekrandır"
          desc="Kayıtları toplar, yan yana koyar, şüpheli olanda alarm verir."
          accent="#fbbf24"
          delay={0.2}
        />
        <FeatureCard
          icon={ScrollText}
          title="3 · Kayıt dört şey söyler"
          desc="Kim, ne zaman, nereden, ne oldu? Şüpheyi bu dördü doğurur."
          accent="#34d399"
          delay={0.3}
        />
      </div>
      <div className="mt-6">
        <Note icon={Siren} color="#a78bfa" label="Gelecek hafta">
          Alarm gerçek çıktı. Şimdi ne yapacağız? Olay müdahalesi: panik değil, tatbikat.
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
          BVA 2205 · 11. Hafta · SOC ve SIEM: Güvenlik Kamerası Odası
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
