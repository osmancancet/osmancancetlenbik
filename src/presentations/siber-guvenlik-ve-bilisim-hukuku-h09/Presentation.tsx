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
  FileSignature,
  Search,
  Bug,
  ShieldCheck,
  FileText,
  DoorOpen,
  ListChecks,
  Scale,
  Building2,
  Handshake,
  Ban,
  CreditCard,
  Wrench,
  ClipboardCheck,
  RefreshCw,
  Cloud,
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
   SLIDES
   ============================================================ */

const ASAMALAR: StepItem[] = [
  {
    title: "Kapsam ve izin",
    desc: "Neye bakılacak, ne zaman, neye dokunulmayacak? Hepsi yazılır ve imzalanır. İmza yoksa hiçbir şey başlamaz.",
    extraLabel: "Savunan ne yapar:",
    extra: "Sistemlerini listeler, sınırı çizer, ulaşılacak kişiyi belirler.",
    icon: FileSignature,
    color: "#a78bfa",
  },
  {
    title: "Keşif",
    desc: "Usta binanın çevresinde dolaşır: kaç kapı var, hangi pencere sokağa bakıyor? Kurumun dışarıdan görünen yüzü çıkarılır.",
    extraLabel: "Savunan ne yapar:",
    extra: "Dışarıdan görünen bilgiyi azaltır; gereksiz açık kapıyı kapatır.",
    icon: Search,
    color: "#06b6d4",
  },
  {
    title: "Zafiyet bulma",
    desc: "Hangi kilit eski, hangi pencere tam kapanmıyor? Olası zayıf noktaların listesi çıkarılır.",
    extraLabel: "Savunan ne yapar:",
    extra: "Güncellemeleri yapar; eski ve kullanılmayan sistemleri kaldırır.",
    icon: Bug,
    color: "#22d3ee",
  },
  {
    title: "Doğrulama",
    desc: "Listede yazan açık gerçekten açık mı? Uzman, zarar vermeden ve izin sınırı içinde bunu gösterir.",
    extraLabel: "Savunan ne yapar:",
    extra: "Kayıtlarına bakar: bu denemeyi biz fark edebildik mi?",
    icon: ShieldCheck,
    color: "#fbbf24",
  },
  {
    title: "Raporlama",
    desc: "Ne bulundu, ne kadar tehlikeli, nasıl kapatılır? Hepsi kurumun anlayacağı dille yazılır.",
    extraLabel: "Savunan ne yapar:",
    extra: "Açıkları önem sırasına göre kapatır, sonra yeniden test ettirir.",
    icon: FileText,
    color: "#34d399",
  },
];

const IZIN_KARTLARI: ClassifyItem[] = [
  {
    text: "Bir şirket, güvenlik firmasıyla sözleşme imzalayıp kendi sitesini test ettiriyor.",
    answer: 0,
    why: "Sistemin sahibi istedi, yazılı izin ve kapsam var.",
  },
  {
    text: "Arkadaşının sosyal medya şifresini şaka olsun diye tahmin edip hesabına giriyorsun.",
    answer: 1,
    why: "Hesap senin değil, izin yok. Şaka olması durumu değiştirmez (TCK 243).",
  },
  {
    text: "Kendi bilgisayarına kurduğun deneme ortamında alıştırma yapıyorsun.",
    answer: 0,
    why: "Sistem senin; kimsenin verisine ya da cihazına dokunmuyorsun.",
  },
  {
    text: "Okulun not sisteminde bir açık fark ettin; yardım etmek için içeri girip bakıyorsun.",
    answer: 1,
    why: "İyi niyet izin yerine geçmez. Doğrusu: içeri girmeden yetkiliye haber vermek.",
  },
  {
    text: "Sözleşmede yalnız web sitesi yazıyor; uzman muhasebe sunucusuna da bakıyor.",
    answer: 1,
    why: "Kapsamın dışına çıkmak, izinsiz iş yapmaktır.",
  },
];

const ARA_SORU: QuizQuestion[] = [
  {
    q: "Sızma testini gerçek bir saldırıdan ayıran en önemli şey nedir?",
    options: [
      "Kullanılan programlar",
      "Sistem sahibinin yazılı izni ve belirlenen kapsam",
      "Testi yapan kişinin iyi niyeti",
      "İşin mesai saatinde yapılması",
    ],
    correct: 1,
    why: [
      "Aynı programları saldırgan da kullanabilir; fark programda değil.",
      "İzin ve kapsam yoksa yapılan iş test değil, izinsiz erişimdir.",
      "Niyet tek başına yetmez; izin yazılı olmalı.",
      "Saat, izni olmayan bir işi izinli yapmaz.",
    ],
  },
];

const KAPANIS_SORULARI: QuizQuestion[] = [
  {
    q: "Sızma testinde ilk aşama hangisidir?",
    options: ["Keşif", "Raporlama", "Kapsam ve yazılı izin", "Zafiyet bulma"],
    correct: 2,
    why: [
      "Keşif ikinci adım; ondan önce imza gerekir.",
      "Raporlama en son adımdır.",
      "Önce neye bakılacağı yazılır ve imzalanır.",
      "Zafiyet bulma, izin ve keşiften sonra gelir.",
    ],
  },
  {
    q: "Uzman, sözleşmede olmayan bir sunucuda açık fark etti. Ne yapmalı?",
    options: [
      "Hazır bulmuşken onu da test eder",
      "Dokunmaz, kurumu bilgilendirir",
      "Kimseye söylemez",
      "Açığı sosyal medyada paylaşır",
    ],
    correct: 1,
    why: [
      "Kapsam dışına çıkmak izinsiz erişimdir.",
      "Kapsam dışındaki sisteme dokunulmaz; kuruma haber verilir, isterse kapsamı genişletir.",
      "Susmak kurumu açıkta bırakır.",
      "Paylaşmak hem kuruma zarar verir hem de sözleşmeye aykırıdır.",
    ],
  },
  {
    q: "Sızma testinin kuruma teslim edilen asıl ürünü nedir?",
    options: [
      "Ele geçirilen şifreler",
      "Kullanılan programların listesi",
      "Bulguları ve çözüm önerilerini anlatan rapor",
      "Sistemin yedeği",
    ],
    correct: 2,
    why: [
      "Amaç şifre toplamak değil, açığı gösterip kapattırmak.",
      "Program listesi kuruma açığını nasıl kapatacağını söylemez.",
      "Kurum raporla neyi, hangi sırayla düzelteceğini öğrenir.",
      "Yedek almak sızma testinin işi değil.",
    ],
  },
];

const slides: Array<(active: boolean) => ReactNode> = [
  /* ───── 1. Kapak ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2205 · 9. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="sgbh-shimmer">Sızma Testi</span>
          <br />
          <span className="text-white/90">İzinli Güvenlik Denetimi</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Kurum, açığını saldırgandan önce bulmak için kendi kapısını bir uzmana denetletir.
          Bugün bu işin nasıl ve hangi sınırlar içinde yapıldığına bakıyoruz.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-4xl mx-auto text-left">
          <FeatureCard
            icon={DoorOpen}
            title="Ne ve neden?"
            desc="Binanın kapı-pencere kontrolünü yaptırmak gibi."
            delay={0.3}
            accent="#06b6d4"
          />
          <FeatureCard
            icon={ListChecks}
            title="Hangi aşamalar?"
            desc="İzinden rapora beş adım; her adımda savunan ne yapar?"
            delay={0.45}
            accent="#fbbf24"
          />
          <FeatureCard
            icon={Scale}
            title="Sınır nerede?"
            desc="İzin varsa denetim, izin yoksa suç."
            delay={0.6}
            accent="#f87171"
          />
        </div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. Sorun: el kaldır ───── */
  () => (
    <SlideShell>
      <Mid>
        <Eyebrow>Isınma · el kaldır</Eyebrow>
        <H2 className="md:!text-4xl">Kapını hırsızdan önce sen dene</H2>
        <div className="mt-6">
          <Poll
            question="Kaçınız evden çıkarken kapıyı kilitledikten sonra kolu bir kez yoklar?"
            comment="Kolu yoklamak küçük bir testtir: kilit gerçekten tutuyor mu? Kurumlar da aynısını bilgisayar sistemleri için yapar. Buna sızma testi denir."
          />
        </div>
        <AskLine>Kapı açık kalsa bunu senden önce kim fark eder?</AskLine>
      </Mid>
    </SlideShell>
  ),

  /* ───── 3. Tanım ───── */
  () => (
    <SlideShell>
      <Eyebrow>Benzetme · kapı-pencere kontrolü</Eyebrow>
      <H2>Sızma testi, izinli bir güvenlik denetimidir</H2>
      <Sub className="mt-3 max-w-4xl">
        Bina sahibi bir ustayı çağırır: &ldquo;Kapılara, pencerelere bak; hırsız nereden girer, bana söyle.&rdquo;
        Sızma testi (penetration test) bunun bilgisayar sistemleri için yapılanıdır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={Building2}
          title="Kim ister?"
          desc="Sistemin sahibi olan kurum. Kendi isteğiyle, kendi sistemi için."
          accent="#06b6d4"
          delay={0.1}
        />
        <FeatureCard
          icon={Handshake}
          title="Kim yapar?"
          desc="Sözleşme imzalamış güvenlik uzmanı. Ne yapacağı baştan bellidir."
          accent="#fbbf24"
          delay={0.2}
        />
        <FeatureCard
          icon={FileText}
          title="Sonunda ne çıkar?"
          desc="Bir rapor: hangi açıklar bulundu ve nasıl kapatılır."
          accent="#34d399"
          delay={0.3}
        />
      </div>
      <AskLine>Bir kurum kendi sistemini neden para verip başkasına denetletir?</AskLine>
    </SlideShell>
  ),

  /* ───── 4. Tarama ≠ sızma testi ───── */
  () => (
    <SlideShell>
      <Eyebrow>Karıştırma · iki ayrı iş</Eyebrow>
      <H2>Tarama listeler, sızma testi doğrular</H2>
      <Sub className="mt-3 max-w-4xl">
        Zafiyet (vulnerability), sistemdeki güvenlik açığı demek: kırık kilit, aralık pencere.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        <Note icon={Search} color="#67e8f9" label="Zafiyet taraması">
          <Bullets
            items={[
              "Bir program otomatik bakar.",
              "“Bu pencere açık olabilir” der; emin değildir.",
              "Çıktısı: olası açıkların listesi.",
            ]}
          />
        </Note>
        <Note icon={ShieldCheck} color="#fbbf24" label="Sızma testi">
          <Bullets
            color="#fbbf24"
            items={[
              "Bir uzman, izinle ve elle bakar.",
              "Pencere gerçekten açılıyor mu, dener ve gösterir.",
              "Çıktısı: doğrulanmış açık ve çözüm önerisi.",
            ]}
          />
        </Note>
      </div>
      <AskLine>Listede 100 olası açık var. Hangisinin gerçek olduğunu nasıl anlarız?</AskLine>
    </SlideShell>
  ),

  /* ───── 5. Beş aşama (adım adım) ───── */
  () => (
    <SlideShell>
      <Mid>
        <Eyebrow>Süreç · adım adım aç</Eyebrow>
        <H2 className="md:!text-4xl">Test beş aşamada ilerler</H2>
        <div className="mt-5">
          <Stepper steps={ASAMALAR} />
        </div>
        <AskLine>Sence en çok zaman hangi aşamaya gider? Neden?</AskLine>
      </Mid>
    </SlideShell>
  ),

  /* ───── 6. Yazılı izin ───── */
  () => (
    <SlideShell>
      <Mid>
        <Eyebrow>1. aşama · en önemlisi</Eyebrow>
        <H2 className="md:!text-4xl">Yazılı izin yoksa test de yok</H2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          <Note icon={FileSignature} color="#a78bfa" label="Sözleşmede yazanlar">
            <Bullets
              color="#a78bfa"
              items={[
                "Kapsam: hangi sistemlere bakılacak?",
                "Zaman: hangi gün ve saatlerde?",
                "Yasak bölge: neye dokunulmayacak?",
                "Sorun çıkarsa kim aranacak?",
              ]}
            />
          </Note>
          <Reveal
            accent="#fbbf24"
            question="Bir çalışan sana &ldquo;şirketin sitesini bir dene bakalım&rdquo; dedi. Bu izin yeter mi?"
            answer="Yetmez. İzni sistemin sahibi olan kurumun yetkilisi verir ve izin yazılı olur. Sözlü bir &ldquo;bak bakalım&rdquo; seni korumaz."
          />
        </div>
        <AskLine>Sözlü &ldquo;bir bakıver&rdquo; neden yetmez? Sorun çıkarsa kim kimi suçlar?</AskLine>
      </Mid>
    </SlideShell>
  ),

  /* ───── 7. İzinli mi, izinsiz mi? ───── */
  () => (
    <SlideShell>
      <Mid>
        <Eyebrow>Oyna-gör · karar ver</Eyebrow>
        <H2 className="md:!text-4xl">İzinli mi, izinsiz mi? Birlikte karar verelim</H2>
        <div className="mt-5">
          <Classify items={IZIN_KARTLARI} labels={["İzinli", "İzinsiz"]} />
        </div>
        <AskLine>İyi niyet, izin yerine geçer mi?</AskLine>
      </Mid>
    </SlideShell>
  ),

  /* ───── 8. TCK 243–245 ───── */
  () => (
    <SlideShell>
      <Eyebrow>Hukuk · Türk Ceza Kanunu</Eyebrow>
      <H2>Kanun açık: izinsiz girmek suçtur</H2>
      <Sub className="mt-3 max-w-4xl">
        Kapı açık diye başkasının evine girilmez. Bilgisayar sistemi için de kural aynı.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={DoorOpen}
          title="TCK 243 · izinsiz girmek"
          desc="Bir bilişim sistemine izinsiz girmek ya da orada kalmak. Hiçbir şeye dokunmasan da suçtur."
          accent="#f87171"
          delay={0.1}
        />
        <FeatureCard
          icon={Ban}
          title="TCK 244 · bozmak, silmek"
          desc="Sistemi çalışmaz hâle getirmek; verileri bozmak, silmek ya da değiştirmek."
          accent="#fbbf24"
          delay={0.2}
        />
        <FeatureCard
          icon={CreditCard}
          title="TCK 245 · kart kötüye kullanımı"
          desc="Başkasının banka ya da kredi kartını izinsiz kullanmak."
          accent="#a78bfa"
          delay={0.3}
        />
      </div>
      <AskLine>&ldquo;Sadece baktım, bir şey yapmadım&rdquo; geçerli bir savunma olur mu?</AskLine>
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

  /* ───── 10. Rapor ───── */
  () => (
    <SlideShell>
      <Mid>
        <Eyebrow>5. aşama · raporlama</Eyebrow>
        <H2 className="md:!text-4xl">Asıl ürün rapordur</H2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          <Note icon={FileText} color="#34d399" label="İyi bir rapor üç şey söyler">
            <Bullets
              color="#34d399"
              items={[
                "Ne bulundu? (sade bir dille)",
                "Ne kadar tehlikeli? (düşük, orta, yüksek)",
                "Nasıl kapatılır? (çözüm önerisi)",
              ]}
            />
          </Note>
          <Reveal
            accent="#fbbf24"
            question="İki bulgu var. A: Yemek listesi sayfası bazen hata veriyor. B: Öğrenci bilgilerine şifresiz ulaşılabiliyor. Önce hangisi kapatılır?"
            answer="B. Kişisel veri açıkta; zararı çok daha büyük. Rapor bulguları bu yüzden önem sırasına dizer."
          />
        </div>
        <AskLine>Rapor yazılmasaydı yapılan test kurumun ne işine yarardı?</AskLine>
      </Mid>
    </SlideShell>
  ),

  /* ───── 11. Rapor sonrası ───── */
  () => (
    <SlideShell>
      <Eyebrow>Savunan taraf · rapordan sonra</Eyebrow>
      <H2>Rapor gelince savunanın işi başlar</H2>
      <Sub className="mt-3 max-w-4xl">
        Araç muayenesi gibi: eksik çıkar, tamir ettirirsin, yeniden muayeneye girersin.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={Wrench}
          title="1 · Kapat"
          desc="En tehlikeli açıktan başla: güncelle, ayarı düzelt, gereksiz olanı kaldır."
          accent="#06b6d4"
          delay={0.1}
        />
        <FeatureCard
          icon={ClipboardCheck}
          title="2 · Yeniden test ettir"
          desc="Kapattım demek yetmez; gerçekten kapandığını uzman doğrular."
          accent="#fbbf24"
          delay={0.2}
        />
        <FeatureCard
          icon={RefreshCw}
          title="3 · Düzenli tekrarla"
          desc="Sistem değişir, yeni açıklar çıkar. Test bir kez yapılıp bırakılmaz."
          accent="#34d399"
          delay={0.3}
        />
      </div>
      <AskLine>Açığı kapattık. Yeniden test ettirmek neden gerekli?</AskLine>
    </SlideShell>
  ),

  /* ───── 12. Sınıfta deneyelim ───── */
  () => (
    <SlideShell>
      <Mid>
        <Eyebrow>Sınıfta deneyelim · 10 dakika · 3–4 kişilik grup</Eyebrow>
        <H2 className="md:!text-4xl">Laboratuvarın kapı-pencere kontrolü</H2>
        <Sub className="mt-2 !text-base">
          Yalnız gözle bakıyoruz: hiçbir cihaza, hesaba ya da dosyaya dokunmak yok.
        </Sub>
        <div className="mt-4">
          <Checklist
            steps={[
              "İzin ve kapsam: hocadan izin al. Sınır: yalnız bu sınıf, yalnız gözlem.",
              "Keşif: 5 dakika dolaş. Açık kalmış oturum, kilitsiz ekran var mı?",
              "Zafiyet bulma: şifre yazılı not, sahipsiz USB bellek, açık dolap gördün mü?",
              "Rapor: 3 bulgu yaz; her birinin yanına bir çözüm önerisi ekle.",
              "Sunum: grubun en önemli bulgusunu sınıfa oku.",
            ]}
          />
        </div>
        <AskLine>Gruplarda en çok hangi bulgu çıktı? Kapatması en kolay olan hangisi?</AskLine>
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
      <Eyebrow>Özet · 9. hafta</Eyebrow>
      <H2>
        Aklında kalsın: <span className="sgbh-shimmer-soft">3 şey</span>
      </H2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={DoorOpen}
          title="1 · İzinli denetim"
          desc="Sızma testi, kurumun kendi isteğiyle yaptırdığı kapı-pencere kontrolüdür."
          accent="#06b6d4"
          delay={0.1}
        />
        <FeatureCard
          icon={ListChecks}
          title="2 · Beş aşama"
          desc="Kapsam ve izin, keşif, zafiyet bulma, doğrulama, raporlama."
          accent="#fbbf24"
          delay={0.2}
        />
        <FeatureCard
          icon={Scale}
          title="3 · İzin yoksa suç"
          desc="Yazılı izin ve kapsam olmadan yapılan her deneme TCK 243–245 kapsamına girebilir."
          accent="#f87171"
          delay={0.3}
        />
      </div>
      <div className="mt-6">
        <Note icon={Cloud} color="#a78bfa" label="Gelecek hafta">
          Dosyalarımız başkasının binasında, yani bulutta duruyorsa güvenlik kimin işi?
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
          BVA 2205 · 9. Hafta · Sızma Testi: İzinli Güvenlik Denetimi
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
