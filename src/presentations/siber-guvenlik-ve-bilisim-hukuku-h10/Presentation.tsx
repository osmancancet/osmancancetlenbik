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
  Handshake,
  DoorOpen,
  KeyRound,
  Server,
  Building2,
  Cloud,
  ScrollText,
  Bell,
  Eye,
  ShieldCheck,
  AlertTriangle,
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

const PAYLASIM = [
  {
    label: "Yalnız ben",
    who: "Sadece sen görürsün.",
    risk: "Düşük",
    color: OK,
    when: "Kimlik fotoğrafı, okul belgesi gibi kişisel dosyalar.",
  },
  {
    label: "Seçtiğim kişiler",
    who: "Yalnız e-postasını eklediğin kişiler görür.",
    risk: "Düşük",
    color: "#67e8f9",
    when: "Grup ödevi, ortak rapor. İş bitince kişileri listeden çıkar.",
  },
  {
    label: "Bağlantıya sahip herkes",
    who: "Bağlantı kimin eline geçerse o görür. Giriş yapması bile gerekmez.",
    risk: "Yüksek",
    color: BAD,
    when: "Yalnız herkesin görmesinde sakınca olmayan şeyler: afiş, duyuru.",
  },
];

/* Paylaşım ayarını seç, kimin gördüğünü gör. */
function ShareDemo() {
  const [sel, setSel] = useState(0);
  const cur = PAYLASIM[sel];
  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        {PAYLASIM.map((p, i) => (
          <button
            type="button"
            key={p.label}
            onClick={() => setSel(i)}
            className="rounded-xl px-4 py-4 text-base font-semibold transition-all"
            style={{
              border: `1px solid ${i === sel ? p.color : "rgba(6,182,212,0.3)"}`,
              background: i === sel ? `${p.color}22` : "rgba(6,182,212,0.05)",
              color: i === sel ? p.color : "#e5e7eb",
            }}
          >
            {p.label}
          </button>
        ))}
      </div>
      <motion.div
        key={sel}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="sgbh-card rounded-xl p-5 mt-3 grid grid-cols-1 md:grid-cols-3 gap-5 min-h-[8.5rem]"
        style={{ borderColor: `${cur.color}70` }}
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500 mb-1">
            <Eye className="w-4 h-4" />
            Kim görür?
          </div>
          <div className="text-base text-gray-200 leading-snug">{cur.who}</div>
        </div>
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-1">Risk</div>
          <div className="text-2xl font-bold" style={{ color: cur.color }}>
            {cur.risk}
          </div>
        </div>
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-1">Ne zaman uygun?</div>
          <div className="text-base text-gray-200 leading-snug">{cur.when}</div>
        </div>
      </motion.div>
      <div className="mt-3">
        <TapHint>Üç ayarı sırayla tıkla, farkı gör</TapHint>
      </div>
    </div>
  );
}

/* MFA'yı aç/kapa: şifre çalınınca ne olur? */
function MfaToggle() {
  const [on, setOn] = useState(false);
  const color = on ? OK : BAD;
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
        <div className="sgbh-card rounded-xl p-4">
          <div className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-1">1 · Olay</div>
          <div className="text-base text-gray-200 leading-snug">
            Şifren bir sızıntıda ele geçti. Saldırgan e-postanı ve şifreni biliyor.
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOn((v) => !v)}
          className="rounded-xl p-4 text-left transition-all"
          style={{ border: `1px solid ${color}`, background: `${color}18` }}
        >
          <div className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">
            2 · İkinci kilit (MFA)
          </div>
          <div className="flex items-center gap-3">
            <span
              className="relative w-16 h-8 rounded-full transition-colors flex-shrink-0"
              style={{ background: on ? OK : "#4b5563" }}
            >
              <span
                className="absolute top-1 w-6 h-6 rounded-full bg-white transition-all"
                style={{ left: on ? "2.25rem" : "0.25rem" }}
              />
            </span>
            <span className="text-2xl font-bold" style={{ color }}>
              {on ? "AÇIK" : "KAPALI"}
            </span>
          </div>
          <div className="mt-2">
            <TapHint>Tıkla, değiştir</TapHint>
          </div>
        </button>
        <motion.div
          key={String(on)}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="sgbh-card rounded-xl p-4"
          style={{ borderColor: `${color}80` }}
        >
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest mb-1" style={{ color }}>
            {on ? <ShieldCheck className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            3 · Sonuç
          </div>
          <div className="text-base leading-snug" style={{ color }}>
            {on
              ? "Şifre doğru ama giriş, telefonuna gelen onayda takıldı. Sana “Bu sen misin?” bildirimi geldi; “Hayır” dedin ve şifreni değiştirdin."
              : "Saldırgan doğrudan içeri girdi. E-postaların, fotoğrafların ve dosyaların artık onun da elinde."}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ============================================================
   SLIDES
   ============================================================ */

const KIMIN_ISI: ClassifyItem[] = [
  {
    text: "Veri merkezinin kapısında güvenlik görevlisi bulundurmak.",
    answer: 0,
    why: "Bina sağlayıcının; fiziksel güvenlik de onun işi.",
  },
  {
    text: "Hesaba güçlü bir şifre koymak ve iki adımlı doğrulamayı açmak.",
    answer: 1,
    why: "Dairenin anahtarı müşteride; hesabı korumak onun işi.",
  },
  {
    text: "Bozulan diski yenisiyle değiştirmek.",
    answer: 0,
    why: "Donanım sağlayıcıya ait; arızayı o giderir.",
  },
  {
    text: "Bir dosyanın paylaşım ayarını “herkes görebilir” bırakmamak.",
    answer: 1,
    why: "Dosya ve ayar müşterinin; sağlayıcı senin yerine karar vermez.",
  },
  {
    text: "İşten ayrılan çalışanın hesabını kapatmak.",
    answer: 1,
    why: "Kimin erişeceğine müşteri karar verir; eski hesap açık kapıdır.",
  },
];

const IZLEME_ADIMLARI: StepItem[] = [
  {
    title: "Kayıt tut",
    desc: "Kim, ne zaman, nereden girdi? Bulut bunu yazar; yeter ki kayıt tutma açık olsun.",
    extraLabel: "Günlük hayatta:",
    extra: "Apartman girişindeki ziyaretçi defteri.",
    icon: ScrollText,
    color: "#06b6d4",
  },
  {
    title: "Uyarı kur",
    desc: "Alışılmadık bir şey olunca haber gelsin: yeni cihaz, yeni ülke, gece yarısı girişi.",
    extraLabel: "Günlük hayatta:",
    extra: "E-postana gelen “yeni cihazdan giriş yapıldı” mesajı.",
    icon: Bell,
    color: "#fbbf24",
  },
  {
    title: "Uyarıya bak",
    desc: "Uyarı geldiyse biri ona bakmalı: bu ben miyim, değil miyim? Değilse şifreyi değiştir.",
    extraLabel: "Unutma:",
    extra: "Okunmayan uyarı, çalıp da kimsenin duymadığı alarm gibidir.",
    icon: Eye,
    color: "#34d399",
  },
];

const ARA_SORU: QuizQuestion[] = [
  {
    q: "Bir şirket, müşteri listesini bulutta “bağlantıya sahip herkes” ayarıyla bırakmış ve liste sızmış. Bu ayar kimin işiydi?",
    options: [
      "Bulut sağlayıcısının",
      "Dosyayı paylaşan şirketin (müşterinin)",
      "İnternet şirketinin",
      "Kimsenin; önlenemezdi",
    ],
    correct: 1,
    why: [
      "Sağlayıcı binayı korur; dosyanı kiminle paylaştığına karışmaz.",
      "Paylaşım ayarı müşterinin sorumluluğundadır.",
      "İnternet şirketi yalnız bağlantıyı sağlar.",
      "Tek bir ayar değişikliğiyle önlenebilirdi.",
    ],
  },
];

const KAPANIS_SORULARI: QuizQuestion[] = [
  {
    q: "Paylaşılan sorumlulukta veri merkezinin fiziksel güvenliği kimdedir?",
    options: ["Müşteride", "Sağlayıcıda", "Devlette", "Kullanıcının telefonunda"],
    correct: 1,
    why: [
      "Müşteri binaya giremez bile; onun işi hesabı ve verisi.",
      "Bina, donanım ve fiziksel güvenlik sağlayıcının işidir.",
      "Devlet kural koyar ama binayı korumaz.",
      "Telefon yalnız hesabına açılan kapıdır.",
    ],
  },
  {
    q: "Şifren sızdı ama hesabına giremediler. Seni büyük olasılıkla ne korudu?",
    options: [
      "Şifrenin uzun olması",
      "İki adımlı doğrulama (MFA)",
      "Telefonunun kılıfı",
      "Hesabın eski olması",
    ],
    correct: 1,
    why: [
      "Şifre zaten sızmış; uzun olması artık işe yaramaz.",
      "Şifre bilinse de ikinci adım (telefon onayı) olmadan giriş tamamlanmaz.",
      "Kılıf telefonu düşmekten korur, hesabı değil.",
      "Hesabın yaşı güvenlik sağlamaz.",
    ],
  },
  {
    q: "Yalnız rapor okuyacak bir stajyere hangi yetki verilmeli?",
    options: [
      "Yönetici yetkisi; ne olur ne olmaz",
      "Yalnız okuma yetkisi",
      "Herkesle aynı yetki",
      "Hiç hesap açmadan başkasının şifresi",
    ],
    correct: 1,
    why: [
      "Fazla yetki, hata ya da hesap çalınması hâlinde zararı büyütür.",
      "En az yetki: işine yetecek kadar, fazlası değil.",
      "Herkesin işi aynı değil; yetkisi de aynı olmamalı.",
      "Şifre paylaşılırsa kimin ne yaptığı bilinemez.",
    ],
  },
];

const slides: Array<(active: boolean) => ReactNode> = [
  /* ───── 1. Kapak ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2205 · 10. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="sgbh-shimmer">Bulut Güvenliği</span>
          <br />
          <span className="text-white/90">Bina Onların, Anahtar Senin</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Dosyalarımız artık başkasının bilgisayarında duruyor. Peki onları korumak kimin işi
          ve biz kendi payımıza düşeni nasıl yaparız?
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-4xl mx-auto text-left">
          <FeatureCard
            icon={Handshake}
            title="Kim neyi korur?"
            desc="Paylaşılan sorumluluk: bina sağlayıcının, anahtar senin."
            delay={0.3}
            accent="#06b6d4"
          />
          <FeatureCard
            icon={DoorOpen}
            title="En sık hata ne?"
            desc="Saldırı değil, açık unutulan kapı: yanlış ayar."
            delay={0.45}
            accent="#f87171"
          />
          <FeatureCard
            icon={KeyRound}
            title="Ben ne yaparım?"
            desc="İkinci kilit (MFA) ve işine yetecek kadar anahtar."
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
        <H2 className="md:!text-4xl">Fotoğrafların şu an nerede duruyor?</H2>
        <div className="mt-6">
          <Poll
            question="Kaçınızın telefonundaki fotoğraflar Google Fotoğraflar ya da iCloud’a yedekleniyor?"
            comment="Eli kalkan herkes zaten bulut kullanıyor. Fotoğrafların telefonda değil, bir şirketin uzaktaki bilgisayarlarında da duruyor. Bugünün sorusu: orayı kim koruyor?"
          />
        </div>
        <AskLine>Telefonun bugün bozulsa fotoğrafların gider mi? Neden?</AskLine>
      </Mid>
    </SlideShell>
  ),

  /* ───── 3. Bulut nedir ───── */
  () => (
    <SlideShell>
      <Eyebrow>Benzetme · ev almak mı, kiralamak mı?</Eyebrow>
      <H2>Bulut, başkasının bilgisayarını kiralamaktır</H2>
      <Sub className="mt-3 max-w-4xl">
        Bulut (cloud): internet üzerinden kullandığın, başka bir şirkete ait bilgisayarlar.
        O şirkete sağlayıcı diyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={Server}
          title="Kendi sunucun: kendi evin"
          desc="Her şey sende: tamiri de, kilidi de, faturası da."
          accent="#fbbf24"
          delay={0.1}
        />
        <FeatureCard
          icon={Building2}
          title="Bulut: kiralık daire"
          desc="Bina ve bakım sağlayıcıda. Sen içeri yerleşir, kullandığın kadar ödersin."
          accent="#06b6d4"
          delay={0.2}
        />
        <FeatureCard
          icon={Cloud}
          title="Zaten kullanıyorsun"
          desc="E-posta, Drive, iCloud, fotoğraf yedeği. Şirketler de sunucularını böyle kiralar."
          accent="#34d399"
          delay={0.3}
        />
      </div>
      <AskLine>Bugün sabahtan beri hangi bulut hizmetini kullandın?</AskLine>
    </SlideShell>
  ),

  /* ───── 4. Paylaşılan sorumluluk ───── */
  () => (
    <SlideShell>
      <Eyebrow>Temel kural · paylaşılan sorumluluk</Eyebrow>
      <H2>Bina onların, dairenin anahtarı senin</H2>
      <Sub className="mt-3 max-w-4xl">
        Paylaşılan sorumluluk (shared responsibility): güvenlik işi ikiye bölünür.
        Sağlayıcı binayı korur, müşteri kendi dairesini.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-7">
        <Note icon={Building2} color="#67e8f9" label="Sağlayıcının işi · bina">
          <Bullets
            items={[
              "Veri merkezinin kapısı, kamerası, görevlisi.",
              "Elektrik, soğutma, internet bağlantısı.",
              "Bozulan donanımı değiştirmek.",
            ]}
          />
        </Note>
        <Note icon={KeyRound} color="#fbbf24" label="Müşterinin işi · daire">
          <Bullets
            color="#fbbf24"
            items={[
              "Şifreler ve iki adımlı doğrulama.",
              "Kimin neye erişeceği.",
              "Hangi dosyanın herkese açık olduğu.",
            ]}
          />
        </Note>
      </div>
      <AskLine>Dairene hırsız girdi; kapıyı kilitlememişsin. Suç ev sahibinde mi?</AskLine>
    </SlideShell>
  ),

  /* ───── 5. Kimin işi? ───── */
  () => (
    <SlideShell>
      <Mid>
        <Eyebrow>Oyna-gör · karar ver</Eyebrow>
        <H2 className="md:!text-4xl">Bu kimin işi: sağlayıcının mı, müşterinin mi?</H2>
        <div className="mt-5">
          <Classify items={KIMIN_ISI} labels={["Sağlayıcı", "Müşteri"]} />
        </div>
        <AskLine>Müşterinin en sık unuttuğu iş sence hangisi?</AskLine>
      </Mid>
    </SlideShell>
  ),

  /* ───── 6. Yanlış yapılandırma ───── */
  () => (
    <SlideShell>
      <Mid>
        <Eyebrow>Sorun · açık unutulan kapı</Eyebrow>
        <H2 className="md:!text-4xl">En sık hata saldırı değil, yanlış ayardır</H2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          <Note icon={DoorOpen} color="#f87171" label="Yanlış yapılandırma">
            Yanlış yapılandırma (misconfiguration): bir ayarı olması gerekenden açık bırakmak.
            Kilit sağlam, ama kapı kapatılmamış.
          </Note>
          <Reveal
            accent="#fbbf24"
            question="Bir şirketin müşteri listesi internete düştü. Kimse şifre kırmadı, kimse içeri sızmadı. Nasıl olmuş olabilir?"
            answer="Dosyanın paylaşım ayarı “bağlantıya sahip herkes” olarak unutulmuş. Bağlantıyı bulan herkes dosyayı açabilmiş."
          />
        </div>
        <AskLine>Kimse şifre kırmadıysa veri nasıl dışarı çıkar?</AskLine>
      </Mid>
    </SlideShell>
  ),

  /* ───── 7. Paylaşım ayarı (oyna-gör) ───── */
  () => (
    <SlideShell>
      <Mid>
        <Eyebrow>Oyna-gör · paylaşım ayarı</Eyebrow>
        <H2 className="md:!text-4xl">Paylaşım ayarını değiştir, kim görüyor bak</H2>
        <div className="mt-6">
          <ShareDemo />
        </div>
        <AskLine>En son hangi dosyanı &ldquo;bağlantıya sahip herkes&rdquo; ile paylaştın? Hâlâ açık mı?</AskLine>
      </Mid>
    </SlideShell>
  ),

  /* ───── 8. MFA (oyna-gör) ───── */
  () => (
    <SlideShell>
      <Mid>
        <Eyebrow>Oyna-gör · ikinci kilit</Eyebrow>
        <H2 className="md:!text-4xl">Şifre çalınsa bile ikinci kilit durdurur</H2>
        <Sub className="mt-2 !text-base">
          MFA (çok adımlı doğrulama): şifreye ek ikinci bir kanıt. Bankamatik gibi: kart
          (sahip olduğun) + şifre (bildiğin).
        </Sub>
        <div className="mt-5">
          <MfaToggle />
        </div>
        <AskLine>Kaçınızın e-posta hesabında iki adımlı doğrulama açık?</AskLine>
      </Mid>
    </SlideShell>
  ),

  /* ───── 9. Mini sınav ───── */
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

  /* ───── 10. En az yetki ───── */
  () => (
    <SlideShell>
      <Mid>
        <Eyebrow>Kural · en az yetki</Eyebrow>
        <H2 className="md:!text-4xl">Herkese işine yetecek kadar anahtar</H2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          <Note icon={KeyRound} color="#34d399" label="En az yetki (least privilege)">
            <Bullets
              color="#34d399"
              items={[
                "Apartman görevlisine bütün dairelerin anahtarı verilmez.",
                "Yetkiyi işe göre ver: okuyacaksa yalnız okuma.",
                "İş bitince yetkiyi geri al.",
              ]}
            />
          </Note>
          <Reveal
            accent="#fbbf24"
            question="Stajyer Ayşe yalnız rapor okuyacak. Kolay olsun diye ona yönetici yetkisi verdik. Ne ters gidebilir?"
            answer="Yanlışlıkla bir şeyi silebilir. Daha kötüsü: hesabı çalınırsa saldırgan da yönetici olur. Yetki ne kadar azsa zarar o kadar küçük kalır."
          />
        </div>
        <AskLine>Herkese yönetici yetkisi vermek neden kolaya kaçmaktır?</AskLine>
      </Mid>
    </SlideShell>
  ),

  /* ───── 11. Kayıt ve uyarı (adım adım) ───── */
  () => (
    <SlideShell>
      <Mid>
        <Eyebrow>İzleme · adım adım aç</Eyebrow>
        <H2 className="md:!text-4xl">Bulutta da kayıt tutulur: kim, ne zaman girdi?</H2>
        <div className="mt-5">
          <Stepper steps={IZLEME_ADIMLARI} />
        </div>
        <AskLine>&ldquo;Yeni cihazdan giriş&rdquo; uyarısı geldi ve o sen değilsin. İlk ne yaparsın?</AskLine>
      </Mid>
    </SlideShell>
  ),

  /* ───── 12. Sınıfta deneyelim ───── */
  () => (
    <SlideShell>
      <Mid>
        <Eyebrow>Sınıfta deneyelim · 10 dakika · telefonla</Eyebrow>
        <H2 className="md:!text-4xl">Kendi bulutunu denetle</H2>
        <Sub className="mt-2 !text-base">
          Yalnız kendi hesabın. Ekranını kimseye göstermek zorunda değilsin.
        </Sub>
        <div className="mt-4">
          <Checklist
            steps={[
              "Drive’ı (ya da iCloud’u) aç, “Paylaşılanlar” bölümüne gir.",
              "“Bağlantıya sahip herkes” ayarında kalmış bir dosya ara.",
              "Bulduysan ve artık gerekmiyorsa ayarı “Kısıtlı” yap.",
              "Hesap ayarlarında iki adımlı doğrulamaya bak: açık mı?",
              "Hesabına bağlı cihazlara bak: tanımadığın var mı?",
            ]}
          />
        </div>
        <AskLine>Kimde &ldquo;herkese açık&rdquo; unutulmuş bir dosya çıktı? Ne zamandan kalmış?</AskLine>
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
      <Eyebrow>Özet · 10. hafta</Eyebrow>
      <H2>
        Aklında kalsın: <span className="sgbh-shimmer-soft">3 şey</span>
      </H2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={Handshake}
          title="1 · Sorumluluk paylaşılır"
          desc="Binayı sağlayıcı korur; hesabı, ayarı ve veriyi sen korursun."
          accent="#06b6d4"
          delay={0.1}
        />
        <FeatureCard
          icon={DoorOpen}
          title="2 · En sık hata yanlış ayar"
          desc="“Bağlantıya sahip herkes” açık unutulan kapıdır. Paylaşımlarını arada bir denetle."
          accent="#f87171"
          delay={0.2}
        />
        <FeatureCard
          icon={KeyRound}
          title="3 · MFA ve en az yetki"
          desc="İkinci kilidi aç; herkese yalnız işine yetecek kadar yetki ver."
          accent="#34d399"
          delay={0.3}
        />
      </div>
      <div className="mt-6">
        <Note icon={Eye} color="#a78bfa" label="Gelecek hafta">
          Kayıtlar tutuluyor, peki onlara kim bakıyor? Kurumun güvenlik kamerası odası: SOC ve SIEM.
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
          BVA 2205 · 10. Hafta · Bulut Güvenliği: Bina Onların, Anahtar Senin
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
