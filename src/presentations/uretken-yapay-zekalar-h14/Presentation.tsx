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
  Sparkles,
  Bot,
  PenLine,
  Table2,
  BookOpen,
  Upload,
  FlaskConical,
  Calculator,
  BarChart3,
  Code2,
  MessageSquare,
  Wrench,
  ShieldCheck,
  Plus,
  HelpCircle,
  MousePointerClick,
  RotateCcw,
  Check,
  X,
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

const ACCENT = "#a855f7";
const ACCENT_SOFT = "#c084fc";

/* Tıklanabilir öğeler bu genişlikte tutulur: 1280 px ekranda bile
   kenardaki slayt geçiş alanlarının (%12 sol/sağ) dışında kalır. */
const SAFE = "max-w-[60rem] mx-auto";

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
        <div className="absolute inset-0 uyz-grid-bg pointer-events-none" />
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
      className="inline-flex items-center gap-3 mb-6 text-xs font-mono uppercase tracking-[0.25em]"
      style={{ color: ACCENT_SOFT }}
    >
      <span className="w-8 h-px" style={{ background: ACCENT_SOFT }} />
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
      className={`text-3xl md:text-[2.6rem] md:leading-tight font-semibold tracking-tight text-white ${className}`}
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
  accent = ACCENT,
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
      className="uyz-card uyz-card-hover rounded-xl p-6 transition-all text-left"
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
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm md:text-base text-gray-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

/* ============================================================
   ETKİLEŞİM BİLEŞENLERİ
   ============================================================ */

/* Hocanın sınıfa yönelteceği tek soru — her içerik slaydının altında */
function Ask({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="mt-6 flex items-start gap-2 text-sm text-gray-500"
    >
      <HelpCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
      <span>
        <span
          className="font-mono uppercase tracking-wider text-[11px] mr-1"
          style={{ color: "rgba(192,132,252,0.7)" }}
        >
          Sınıfa sor:
        </span>
        {children}
      </span>
    </motion.div>
  );
}

function TapHint({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider"
      style={{ color: ACCENT_SOFT }}
    >
      <MousePointerClick className="w-3.5 h-3.5" />
      {children}
    </span>
  );
}

/* Tahmin et → tıkla göster */
function Reveal({
  q,
  a,
  hint = "tıkla, cevabı gör",
  delay = 0,
}: {
  q: string;
  a: string;
  hint?: string;
  delay?: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <motion.button
      type="button"
      onClick={() => setOpen((o) => !o)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className={`uyz-tap rounded-xl p-5 text-left w-full ${open ? "uyz-tap-open" : ""}`}
    >
      <div className="text-base md:text-lg font-semibold text-white leading-snug">{q}</div>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-sm md:text-base text-gray-300 leading-relaxed"
        >
          {a}
        </motion.div>
      ) : (
        <div className="mt-3">
          <TapHint>{hint}</TapHint>
        </div>
      )}
    </motion.button>
  );
}

/* Mini sınav: şıkka tıkla, doğru yeşil / yanlış kırmızı + tek cümle açıklama */
type QuizItem = { q: string; options: string[]; correct: number; why: string };

function Quiz({ items }: { items: QuizItem[] }) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const item = items[idx];
  const done = picked !== null;
  const last = idx === items.length - 1;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="uyz-card rounded-2xl p-6 md:p-7">
        {items.length > 1 && (
          <div className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-3">
            Soru {idx + 1} / {items.length}
          </div>
        )}
        <div className="text-xl md:text-2xl font-semibold text-white mb-5 leading-snug">
          {item.q}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {item.options.map((o, i) => {
            const state = !done
              ? ""
              : i === item.correct
              ? "uyz-opt-ok"
              : i === picked
              ? "uyz-opt-bad"
              : "uyz-opt-dim";
            return (
              <button
                type="button"
                key={o}
                onClick={() => {
                  if (!done) setPicked(i);
                }}
                className={`uyz-opt ${state}`}
              >
                <span className="uyz-opt-letter">{"ABCD"[i]}</span>
                <span className="flex-1">{o}</span>
                {done && i === item.correct && <Check className="w-5 h-5 flex-shrink-0" />}
                {done && i === picked && i !== item.correct && (
                  <X className="w-5 h-5 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
        <div className="mt-5 min-h-[3rem] flex items-center justify-between gap-4">
          {done ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm md:text-base text-gray-300 leading-relaxed"
              >
                <span
                  className="font-semibold mr-1"
                  style={{ color: picked === item.correct ? "#4ade80" : "#f87171" }}
                >
                  {picked === item.correct ? "Doğru." : "Olmadı."}
                </span>
                {item.why}
              </motion.div>
              {items.length > 1 && (
                <button
                  type="button"
                  className="uyz-btn flex-shrink-0"
                  onClick={() => {
                    setIdx(last ? 0 : idx + 1);
                    setPicked(null);
                  }}
                >
                  {last ? "Baştan" : "Sonraki soru"}
                  {last ? <RotateCcw className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              )}
            </>
          ) : (
            <TapHint>sınıf karar versin, sonra şıkka tıkla</TapHint>
          )}
        </div>
      </div>
    </div>
  );
}

/* Adım adım ilerleyen şema */
type Step = { icon: LucideIcon; title: string; desc: string };

const STEP_COLS: Record<number, string> = {
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
};

function Stepper({ steps }: { steps: Step[] }) {
  const [shown, setShown] = useState(1);
  const all = shown >= steps.length;
  return (
    <div className={SAFE}>
      <div className={`grid grid-cols-1 ${STEP_COLS[steps.length] ?? "md:grid-cols-4"} gap-3`}>
        {steps.map((s, i) => {
          const visible = i < shown;
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              className={`rounded-xl p-5 transition-all duration-500 ${
                visible ? "uyz-card-violet" : "uyz-step-hidden"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-mono font-bold"
                  style={{
                    background: visible ? `${ACCENT}33` : "rgba(255,255,255,0.05)",
                    color: visible ? ACCENT_SOFT : "#4b5563",
                  }}
                >
                  {i + 1}
                </span>
                {visible && <Icon className="w-5 h-5" style={{ color: ACCENT_SOFT }} />}
              </div>
              {visible ? (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="text-base md:text-lg font-semibold text-white mb-1.5 leading-snug">
                    {s.title}
                  </div>
                  <div className="text-sm text-gray-400 leading-relaxed">{s.desc}</div>
                </motion.div>
              ) : (
                <div className="text-3xl font-bold text-gray-700">?</div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          type="button"
          className="uyz-btn"
          onClick={() => setShown(all ? 1 : shown + 1)}
        >
          {all ? "Baştan" : `İleri: ${shown + 1}. adım`}
          {all ? <RotateCcw className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
        {!all && <TapHint>önce sınıf tahmin etsin</TapHint>}
      </div>
    </div>
  );
}

/* İki seçenekli karar kartları (doğru/yanlış, evet/hayır…) */
type JudgeItem = { text: string; answer: 0 | 1; why: string };

function Judge({ items, labels }: { items: JudgeItem[]; labels: [string, string] }) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const item = items[idx];
  const done = picked !== null;
  const last = idx === items.length - 1;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="uyz-card rounded-2xl p-6 md:p-8 text-center">
        <div className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-4">
          Kart {idx + 1} / {items.length}
        </div>
        <div className="text-xl md:text-2xl font-semibold text-white leading-snug min-h-[4.5rem] flex items-center justify-center">
          {item.text}
        </div>
        <div className="grid grid-cols-2 gap-3 mt-5 max-w-xl mx-auto">
          {labels.map((l, i) => {
            const state = !done
              ? ""
              : i === item.answer
              ? "uyz-opt-ok"
              : i === picked
              ? "uyz-opt-bad"
              : "uyz-opt-dim";
            return (
              <button
                type="button"
                key={l}
                onClick={() => {
                  if (!done) setPicked(i);
                }}
                className={`uyz-opt justify-center font-semibold ${state}`}
              >
                {l}
              </button>
            );
          })}
        </div>
        <div className="mt-5 min-h-[4.5rem] flex flex-col items-center justify-center gap-3">
          {done ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm md:text-base text-gray-300 leading-relaxed"
              >
                {item.why}
              </motion.div>
              <button
                type="button"
                className="uyz-btn"
                onClick={() => {
                  setIdx(last ? 0 : idx + 1);
                  setPicked(null);
                }}
              >
                {last ? "Baştan" : "Sıradaki kart"}
                {last ? <RotateCcw className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            </>
          ) : (
            <TapHint>el kaldırarak oylayın, sonra tıkla</TapHint>
          )}
        </div>
      </div>
    </div>
  );
}

/* Sınıf etkinliği: adımlar yapıldıkça tıklanıp işaretlenir */
function TaskList({ steps }: { steps: { title: string; desc: string }[] }) {
  const [done, setDone] = useState<number[]>([]);
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${SAFE}`}>
      {steps.map((s, i) => {
        const on = done.includes(i);
        return (
          <button
            type="button"
            key={s.title}
            onClick={() =>
              setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]))
            }
            className={`uyz-tap rounded-xl p-4 text-left flex items-start gap-4 ${
              on ? "uyz-tap-done" : ""
            }`}
          >
            <span
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-mono font-bold"
              style={{
                background: on ? "rgba(34,197,94,0.2)" : `${ACCENT}26`,
                color: on ? "#4ade80" : ACCENT_SOFT,
              }}
            >
              {on ? <Check className="w-5 h-5" /> : i + 1}
            </span>
            <span>
              <span className="block text-base md:text-lg font-semibold text-white leading-snug">
                {s.title}
              </span>
              <span className="block text-sm text-gray-400 leading-relaxed mt-0.5">{s.desc}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ============================================================
   HAFTAYA ÖZEL BİLEŞENLER
   ============================================================ */

/* Talimat kurucu: parçaları aç/kapa, örnek cevabın nasıl değiştiğini gör */
const INSTRUCTION_PARTS = [
  { key: "rol", label: "Rol", line: "Sen BVA 1203 dersinin çalışma arkadaşısın." },
  { key: "kitle", label: "Hedef kitle", line: "1. sınıf öğrencisine anlat; günlük hayattan örnek ver." },
  { key: "kaynak", label: "Kaynak", line: "Yalnızca yüklediğim ders notlarından cevap ver." },
  { key: "uslup", label: "Üslup", line: "Kısa yaz; sonunda bana bir soru sor." },
] as const;

type PartKey = (typeof INSTRUCTION_PARTS)[number]["key"];

function InstructionBuilder() {
  const [on, setOn] = useState<Record<PartKey, boolean>>({
    rol: false,
    kitle: false,
    kaynak: false,
    uslup: false,
  });
  const count = INSTRUCTION_PARTS.filter((p) => on[p.key]).length;

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 ${SAFE}`}>
      <div>
        <div className="flex flex-wrap gap-2 mb-3">
          {INSTRUCTION_PARTS.map((p) => (
            <button
              type="button"
              key={p.key}
              onClick={() => setOn((s) => ({ ...s, [p.key]: !s[p.key] }))}
              className={`uyz-chip ${on[p.key] ? "uyz-chip-on" : ""}`}
            >
              {on[p.key] ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {p.label}
            </button>
          ))}
        </div>
        <TapHint>parçaları tek tek aç</TapHint>
        <div className="uyz-card rounded-xl p-4 mt-3 min-h-[9.5rem]">
          <div className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">
            Asistanın talimatı
          </div>
          {count === 0 ? (
            <div className="text-base text-gray-600">(boş: talimat yok)</div>
          ) : (
            INSTRUCTION_PARTS.filter((p) => on[p.key]).map((p) => (
              <motion.div
                key={p.key}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-base text-gray-200 leading-relaxed"
              >
                {p.line}
              </motion.div>
            ))
          )}
        </div>
      </div>

      <div className="uyz-window-chrome p-5 flex flex-col gap-3">
        <div className="self-end uyz-bubble-user px-4 py-3 text-base">
          Halüsinasyon ne demek?
        </div>
        <motion.div
          key={INSTRUCTION_PARTS.map((p) => (on[p.key] ? "1" : "0")).join("")}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="self-start uyz-bubble-ai px-4 py-3 text-base leading-relaxed"
        >
          <span className="uyz-sample-tag">Örnek cevap</span>
          <br />
          {on.rol && "Dersimizde şöyle geçiyor: "}
          {on.kitle
            ? "YZ'nin bilmediği bir şeyi biliyormuş gibi uydurmasıdır. Yolu bilmediği hâlde tarif eden biri gibi düşün."
            : "Halüsinasyon, büyük dil modellerinin eğitim verisinde karşılığı bulunmayan içeriği yüksek güvenle üretmesi olgusudur."}
          {on.kaynak && " (Kaynak: 12. hafta notu.)"}
          {on.uslup && " Sence böyle bir cevabı nasıl fark ederiz?"}
        </motion.div>
      </div>
    </div>
  );
}

/* Tabloyu yükle, soruyu sor: kantin satış tablosu */
const SALES = [
  { day: "Pazartesi", n: 42 },
  { day: "Salı", n: 38 },
  { day: "Çarşamba", n: 55 },
  { day: "Perşembe", n: 47 },
  { day: "Cuma", n: 61 },
];

const TABLE_QUESTIONS = [
  {
    label: "Özetle",
    ask: "Bu tabloyu iki cümleyle özetle.",
    answer:
      "Beş günde toplam 243 tost satılmış; günde ortalama yaklaşık 49. Çarşamba ve Cuma öne çıkıyor.",
  },
  {
    label: "En iyi gün?",
    ask: "En çok ve en az satış hangi gün?",
    answer: "En çok satış Cuma günü: 61 tost. En az satış Salı günü: 38 tost.",
  },
  {
    label: "Grafik çiz",
    ask: "Bu tablodan sütun grafik çiz.",
    answer: "",
  },
  {
    label: "Neden böyle?",
    ask: "Cuma günü neden daha çok satılmış?",
    answer:
      "Bunu tablodan bilemem; tabloda yalnızca sayılar var. Tahmin yürütebilirim ama nedenini sen bilirsin: o gün okul kalabalık mıydı?",
  },
];

function TableDemo() {
  const [q, setQ] = useState(0);
  const cur = TABLE_QUESTIONS[q];
  return (
    <div className={`grid grid-cols-1 md:grid-cols-5 gap-5 ${SAFE}`}>
      <div className="md:col-span-2 uyz-card rounded-xl p-4">
        <div className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">
          kantin.xlsx · satılan tost
        </div>
        <table className="w-full text-base">
          <tbody>
            {SALES.map((r) => (
              <tr key={r.day} className="border-b border-white/5 last:border-0">
                <td className="py-1.5 text-gray-300">{r.day}</td>
                <td className="py-1.5 text-right font-mono text-white">{r.n}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:col-span-3">
        <div className="flex flex-wrap gap-2 mb-3">
          {TABLE_QUESTIONS.map((t, i) => (
            <button
              type="button"
              key={t.label}
              onClick={() => setQ(i)}
              className={`uyz-chip ${q === i ? "uyz-chip-on" : ""}`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="uyz-window-chrome p-4 flex flex-col gap-3 min-h-[13.5rem]">
          <div className="self-end uyz-bubble-user px-4 py-2.5 text-base">{cur.ask}</div>
          <motion.div
            key={q}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="self-start uyz-bubble-ai px-4 py-3 text-base leading-relaxed w-full"
          >
            <span className="uyz-sample-tag">Örnek cevap</span>
            {cur.answer ? (
              <div>{cur.answer}</div>
            ) : (
              <div className="flex items-end gap-3 h-24 mt-1">
                {SALES.map((r, i) => (
                  <div key={r.day} className="flex-1 flex flex-col items-center justify-end h-full">
                    <span className="text-xs font-mono text-gray-300 mb-1">{r.n}</span>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.round(r.n * 0.85)}px` }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className="w-full rounded-t"
                      style={{ background: `linear-gradient(180deg, ${ACCENT_SOFT}, ${ACCENT})` }}
                    />
                    <span className="text-[11px] text-gray-500 mt-1">{r.day.slice(0, 3)}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ─────────────────  1 · KAPAK  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 1203 · 14. Hafta</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]"
        >
          <span className="uyz-shimmer">Kendi Asistanını Kur</span>
        </motion.h1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bir kez talimat ver, hep senin istediğin gibi çalışsın. Ardından
          tablolarla uğraşırken YZ&apos;den nasıl yardım alınır, ona bakıyoruz.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-4xl mx-auto">
          <FeatureCard
            icon={Bot}
            title="Özel asistan"
            desc="GPT'ler, Gem'ler, Projeler."
            delay={0.3}
          />
          <FeatureCard
            icon={PenLine}
            title="Talimat yazmak"
            desc="Rol, hedef kitle, kaynak, üslup."
            delay={0.4}
            accent="#3b82f6"
          />
          <FeatureCard
            icon={Table2}
            title="Veri işinde YZ"
            desc="Formül, tablo yorumu, grafik, kod."
            delay={0.5}
            accent="#22c55e"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8 text-[11px] font-mono text-gray-600 uppercase tracking-widest"
        >
          Müfredat konusu: YZ dilleri ve bilgi tabanı oluşturma
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  2 · GEÇEN HAFTADAN KÖPRÜ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Geçen haftadan bugüne</Eyebrow>
      <H2>Geçen hafta kaynak verdik; bugün asistanı bir kez kuruyoruz</H2>
      <Sub className="mt-4 mb-8 max-w-3xl">
        Dosyayı yükleyip soru sormayı öğrendik. Ama her yeni sohbette dosyayı ve
        isteğimizi baştan vermek zorunda kaldık.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={BookOpen}
          title="13. hafta"
          desc="Kaynak ver, açık kitap gibi çalışsın; kaynağı kontrol et."
          delay={0.2}
          accent="#f59e0b"
        />
        <FeatureCard
          icon={Bot}
          title="Bugün · 1. yarı"
          desc="Talimatı ve dosyaları bir kez ver: kendi asistanın hazır dursun."
          delay={0.3}
        />
        <FeatureCard
          icon={Table2}
          title="Bugün · 2. yarı"
          desc="Veri analisti adayının araç kutusu: tablo, grafik ve kodda YZ."
          delay={0.4}
          accent="#22c55e"
        />
      </div>
      <Ask>Geçen haftaki etkinlikte hangi dosyayı yükledin? Aynı dosyayı kaç kez yükledin?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  3 · SORUN (el kaldır)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sorun · el kaldır</Eyebrow>
      <H2>Her sohbette aynı şeyi baştan anlatmak yorucu</H2>
      <Sub className="mt-4 mb-7 max-w-3xl">
        İşe yeni başlayan stajyere her sabah işi baştan anlatmazsın; bir kez
        görev tanımı verirsin.
      </Sub>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${SAFE}`}>
        <Reveal
          q="Kaçınız her sohbete “ben 1. sınıf öğrencisiyim, basit anlat” diye başlıyor?"
          a="Bunu her seferinde yazmak yerine bir kez talimat olarak kaydedebilirsin. Asistan her sohbete bunu bilerek başlar."
          hint="eller kalksın, sonra tıkla"
          delay={0.2}
        />
        <Reveal
          q="Kaçınız aynı ders notunu aynı asistana birden çok kez yükledi?"
          a="Dosyayı asistanın “bilgi” bölümüne bir kez koyarsın. O dersle ilgili her soruda oradan bakar."
          hint="eller kalksın, sonra tıkla"
          delay={0.3}
        />
      </div>
      <Ask>Asistana her seferinde yeniden yazdığın cümle hangisi?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  4 · ÜÇ ARAÇTA ÖZEL ASİSTAN  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kavram · özel asistan</Eyebrow>
      <H2>Üç asistanda da aynı fikir var, yalnızca adı farklı</H2>
      <Sub className="mt-4 mb-8 max-w-3xl">
        Özel asistan: talimatı ve dosyaları önceden verilmiş, tek bir işe
        ayarlanmış sohbet. Ücretsiz planda oluşturma sınırlı ya da kapalı olabilir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Sparkles}
          title="ChatGPT · GPT'ler"
          desc="Talimat ve bilgi dosyasıyla kendi GPT'ni kurar, bağlantıyla paylaşırsın."
          delay={0.2}
          accent="#10a37f"
        />
        <FeatureCard
          icon={Sparkles}
          title="Gemini · Gem'ler"
          desc="Bir görev için talimat verilmiş, kaydedilmiş özel Gemini."
          delay={0.3}
          accent="#4285f4"
        />
        <FeatureCard
          icon={Sparkles}
          title="Claude · Projeler"
          desc="Bir işin dosyaları ve talimatı tek çalışma alanında durur; sohbetler orada açılır."
          delay={0.4}
          accent="#d97757"
        />
      </div>
      <Ask>Bu üç addan hangisini daha önce duydun ya da gördün?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  5 · ÜÇ ADIMDA KURULUM (adım adım)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Nasıl kurulur · adım adım</Eyebrow>
      <H2>Özel asistan üç adımda kurulur</H2>
      <Sub className="mt-4 mb-7 max-w-3xl">
        Hangi aracı seçersen seç sıra aynıdır. Önce tahmin edin, sonra açalım.
      </Sub>
      <Stepper
        steps={[
          {
            icon: PenLine,
            title: "Talimatı yaz",
            desc: "Görev tanımı: kimsin, kime anlatıyorsun, nasıl konuşacaksın, neyi yapmayacaksın.",
          },
          {
            icon: Upload,
            title: "Bilgi dosyasını yükle",
            desc: "Ders notu, izlence, soru bankası. Stajyerin masasına bıraktığın klasör gibi.",
          },
          {
            icon: FlaskConical,
            title: "Test et, düzelt",
            desc: "Üç dört soru sor. Beğenmediğin cevap için talimata bir satır ekle, yeniden dene.",
          },
        ]}
      />
      <Ask>Üçüncü adımı atlayıp asistanı hemen arkadaşına gönderirsen ne olabilir?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  6 · TALİMAT KURUCU (oyna-gör)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Oyna-gör · talimat kurucu</Eyebrow>
      <H2>Talimatı değiştir, cevabın değiştiğini gör</H2>
      <Sub className="mt-4 mb-6 max-w-3xl">
        Soru hep aynı. Talimata parça ekledikçe asistanın cevabı sana göre
        şekilleniyor.
      </Sub>
      <InstructionBuilder />
      <Ask>Hangi parça cevabı en çok değiştirdi? Sen beşinci olarak ne eklerdin?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  7 · MİNİ SINAV (orta)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Mini sınav · dersin ortası</Eyebrow>
      <H2 className="mb-7">Hangi talimat daha iyi bir ders asistanı çıkarır?</H2>
      <Quiz
        items={[
          {
            q: "Biri “Programlama Temelleri” dersi için asistan kuruyor. Hangi talimatı yazmalı?",
            options: [
              "“Bana yardım et.”",
              "“Çok zeki bir yapay zekâsın, her şeyi bil.”",
              "“1. sınıf öğrencisine Python'ı adım adım anlat; ödevi benim yerime yazma, ipucu ver.”",
              "“Kısa cevap ver.”",
            ],
            correct: 2,
            why: "Kime, neyi, nasıl anlatacağını ve neyi yapmayacağını söylüyor. Diğerleri belirsiz.",
          },
        ]}
      />
      <Ask>İyi talimatı iyi yapan ne? Geçen haftalardaki istem formülünü hatırlayan var mı?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  8 · VERİ İŞİNDE YZ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>İkinci yarı · veri analisti adayının araç kutusu</Eyebrow>
      <H2>Veri işinde YZ dört yerde yardım eder</H2>
      <Sub className="mt-4 mb-8 max-w-3xl">
        Bölümünüzün işi tablolarla çalışmak. YZ burada işi senin yerine yapmaz;
        takıldığın yerde hızlandırır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FeatureCard
          icon={Calculator}
          title="Formül yazdırma"
          desc="İstediğini Türkçe söyle, formülü o kursun."
          delay={0.2}
        />
        <FeatureCard
          icon={Table2}
          title="Tabloyu yorumlatma"
          desc="Dosyayı yükle: özet, en yüksek, en düşük."
          delay={0.3}
          accent="#3b82f6"
        />
        <FeatureCard
          icon={BarChart3}
          title="Grafik çizdirme"
          desc="“Bundan sütun grafik çiz” demen yeter."
          delay={0.4}
          accent="#22c55e"
        />
        <FeatureCard
          icon={Code2}
          title="Kod yazdırma"
          desc="Python ya da SQL kodunu yazar ve açıklar."
          delay={0.5}
          accent="#ec4899"
        />
      </div>
      <Ask>Excel ya da Google Sheets&apos;te en son nerede takıldın?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  9 · FORMÜL YAZDIRMA (tahmin et)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Tabloda YZ · tahmin et</Eyebrow>
      <H2>Ne istediğini Türkçe söyle, formülü o yazsın</H2>
      <Sub className="mt-4 mb-7 max-w-3xl">
        Excel ve Google Sheets&apos;te formül adını ezberlemen gerekmez. İsteği
        açık yaz: hangi sütun, ne hesaplanacak.
      </Sub>
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${SAFE}`}>
        <Reveal
          q="“B sütununda 34 öğrencinin notu var. Ortalamayı bul.”"
          a="=ORTALAMA(B2:B35) — B2'den B35'e kadar olan notların ortalamasını alır."
          hint="tıkla, formülü gör"
          delay={0.2}
        />
        <Reveal
          q="“Not 50 ve üstüyse Geçti, değilse Kaldı yazsın.”"
          a="=EĞER(B2>=50;&quot;Geçti&quot;;&quot;Kaldı&quot;) — koşul doğruysa ilkini, değilse ikincisini yazar."
          hint="tıkla, formülü gör"
          delay={0.3}
        />
        <Reveal
          q="“C sütununda kaç kişi Geçti yazıyor?”"
          a="=EĞERSAY(C2:C35;&quot;Geçti&quot;) — C sütununda “Geçti” yazan hücreleri sayar."
          hint="tıkla, formülü gör"
          delay={0.4}
        />
      </div>
      <Ask>Formülü açmadan önce: bunu sen nasıl yazardın? Adını bilen var mı?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  10 · TABLOYU YÜKLE, SORU SOR (oyna-gör)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Tabloda YZ · oyna-gör</Eyebrow>
      <H2>Tabloyu yükle, sorunu konuşur gibi sor</H2>
      <Sub className="mt-4 mb-6 max-w-3xl">
        Okul kantininin bir haftalık tost satışı. Soruyu değiştir, cevabı gör.
      </Sub>
      <TableDemo />
      <Ask>Toplamı birlikte elle toplayalım: 243 doğru mu? Dördüncü soruda asistan neden cevap veremedi?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  11 · KOD YAZDIRMA VE AÇIKLATMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kodda YZ</Eyebrow>
      <H2>Kodu o yazsın, ne yaptığını sen anla</H2>
      <Sub className="mt-4 mb-8 max-w-3xl">
        Python ya da SQL gibi dillerde YZ üç işte yardım eder. Burada kod
        göstermiyoruz; önemli olan ondan ne isteyeceğini bilmek.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Code2}
          title="Yazdır"
          desc="“Bu tablodaki notların ortalamasını bulan Python kodu yaz.”"
          delay={0.2}
        />
        <FeatureCard
          icon={MessageSquare}
          title="Açıklat"
          desc="“Bu kodu satır satır, yeni başlayan birine anlatır gibi açıkla.”"
          delay={0.3}
          accent="#3b82f6"
        />
        <FeatureCard
          icon={Wrench}
          title="Hatayı buldur"
          desc="Hata mesajını yapıştır: “Bu ne demek, nasıl düzeltirim?”"
          delay={0.4}
          accent="#22c55e"
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-5 uyz-card rounded-lg px-5 py-3 text-sm md:text-base text-gray-400"
      >
        <span className="text-white font-semibold">Kod asistanları:</span> GitHub Copilot,
        Cursor ve Claude Code, programcının yanında oturup kod öneren ve yazan yardımcılardır.
      </motion.div>
      <Ask>Ne yaptığını anlamadığın bir kodu ödev diye teslim eder misin? Sorulursa ne dersin?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  12 · DOĞRU MU YANLIŞ MI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Dikkat · doğru mu, yanlış mı?</Eyebrow>
      <H2 className="mb-7">YZ hızlıdır, ama kontrol sende</H2>
      <Judge
        labels={["Doğru", "Yanlış"]}
        items={[
          {
            text: "“YZ'nin yazdığı formül her zaman doğru çalışır.”",
            answer: 1,
            why: "Yanlış. Sütunu ya da aralığı karıştırabilir. İki üç satırı elle hesaplayıp karşılaştır.",
          },
          {
            text: "“Şirketin müşteri listesini ücretsiz bir asistana yükleyip analiz ettirmek sorun olmaz.”",
            answer: 1,
            why: "Yanlış. İçinde kişisel veri var. 12. haftayı hatırla: izin yoksa yüklenmez, önce kimlikler silinir.",
          },
          {
            text: "“Sonucu küçük bir örnekle elle kontrol etmek iyi bir alışkanlıktır.”",
            answer: 0,
            why: "Doğru. Beş satırlık bir tabloda toplamı kendin bul; asistanın sonucuyla aynı mı bak.",
          },
          {
            text: "“Tabloda olmayan bir bilgiyi asistan tablodan çıkaramaz.”",
            answer: 0,
            why: "Doğru. Sayının nedenini tablo söylemez. Asistan tahmin yürütür; nedeni bilen sensin.",
          },
        ]}
      />
      <Ask>Asistanın bulduğu bir toplamı en hızlı nasıl kontrol edersin?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  13 · SINIFTA DENEYELİM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sınıfta deneyelim · 10 dakika · telefon ya da kâğıt</Eyebrow>
      <H2>&ldquo;Ders asistanım&rdquo;ın talimatını yaz</H2>
      <Sub className="mt-4 mb-6 max-w-3xl">
        Özel asistan oluşturamıyorsan sorun değil: talimatı sohbetin en başına
        yapıştırmak da aynı işi görür.
      </Sub>
      <TaskList
        steps={[
          {
            title: "Bir ders seç",
            desc: "Zorlandığın bir ders olsun. Asistanına bir de ad koy.",
          },
          {
            title: "Talimatı dört satırda yaz",
            desc: "Sen kimsin? · Kime anlatıyorsun? · Nasıl anlat? · Neyi yapma?",
          },
          {
            title: "Dene: talimatlı ve talimatsız",
            desc: "Aynı soruyu iki ayrı sohbette sor: biri talimatla başlasın, diğeri boş.",
          },
          {
            title: "Kıyasla, bir satır ekle",
            desc: "Hangi cevap daha işine yaradı? Eksik kalan yer için talimata bir satır ekle.",
          },
        ]}
      />
      <Ask>Kim talimatını sınıfa okumak ister? En iyi &ldquo;neyi yapma&rdquo; satırı kimde?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  14 · KENDİNİ DENE  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kendini dene · 3 soru</Eyebrow>
      <H2 className="mb-7">Bugünü üç soruda toparlayalım</H2>
      <Quiz
        items={[
          {
            q: "Özel asistan kurarken doğru sıra hangisi?",
            options: [
              "Talimat yaz → bilgi dosyası yükle → test et",
              "Test et → paylaş → talimat yaz",
              "Dosya yükle → paylaş → test et",
              "Paylaş → talimat yaz → dosya yükle",
            ],
            correct: 0,
            why: "Önce görev tanımı, sonra kaynak, en son deneme ve düzeltme.",
          },
          {
            q: "Asistandan Excel formülü isterken en işe yarar istek hangisi?",
            options: [
              "“Formül yaz.”",
              "“Excel'i anlat.”",
              "“Tabloma bak.”",
              "“B2 ile B35 arasındaki notların ortalamasını veren formülü yaz.”",
            ],
            correct: 3,
            why: "Hangi hücreler ve ne hesaplanacağı açık. Belirsiz istek belirsiz formül getirir.",
          },
          {
            q: "Asistan tablondan “toplam 243” dedi. Ne yaparsın?",
            options: [
              "Rapora aynen yazarım",
              "Birkaç satırı elle toplayıp kontrol ederim",
              "Aynı soruyu beş kez sorarım",
              "Başka bir asistana geçerim",
            ],
            correct: 1,
            why: "Hızlı bir elle kontrol, yanlış sayıyla rapor vermekten korur.",
          },
        ]}
      />
    </SlideShell>
  ),

  /* ─────────────────  15 · AKLINDA KALSIN + GELECEK HAFTA  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>14. hafta tamamlandı</Eyebrow>
        <H1>
          <span className="uyz-shimmer">Aklında kalsın: 3 şey</span>
        </H1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-5xl mx-auto">
          <FeatureCard
            icon={Bot}
            title="1 · Bir kez kur"
            desc="Talimat + bilgi dosyası + test: asistan her sohbete hazır başlar."
            delay={0.2}
          />
          <FeatureCard
            icon={PenLine}
            title="2 · Talimat = görev tanımı"
            desc="Kimsin, kime anlatıyorsun, nasıl anlatacaksın, neyi yapmayacaksın."
            delay={0.3}
            accent="#3b82f6"
          />
          <FeatureCard
            icon={ShieldCheck}
            title="3 · Veride kontrol sende"
            desc="Formülü, toplamı, kodu küçük bir örnekle elle doğrula."
            delay={0.4}
            accent="#22c55e"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 uyz-card rounded-xl px-6 py-4 max-w-3xl mx-auto flex items-center gap-4 text-left"
        >
          <Sparkles className="w-6 h-6 flex-shrink-0" style={{ color: ACCENT_SOFT }} />
          <div className="text-base text-gray-300 leading-relaxed">
            <span className="text-white font-semibold">Gelecek hafta:</span> son dersimiz.
            YZ iş hayatında nerede kullanılıyor, &ldquo;ajan&rdquo; ne demek, ve dönemin
            bütün araçlarını tek haritada topluyoruz.
          </div>
        </motion.div>

        <div className="mt-8 text-[11px] font-mono text-gray-600 uppercase tracking-widest">
          BVA 1203 · Üretken Yapay Zekâlar · MCBÜ Manisa Teknik Bilimler MYO
        </div>
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
            background: "linear-gradient(90deg, #a855f7, #c084fc, #a855f7)",
            boxShadow: "0 0 16px rgba(168,85,247,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div style={{ color: "rgba(192,132,252,0.7)" }}>
          BVA 1203 · 14. Hafta · Kendi Asistanını Kur
        </div>
        <div className="flex items-center gap-3">
          <div style={{ color: "rgba(192,132,252,0.5)" }}>
            <span style={{ color: ACCENT_SOFT }}>
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
            className="p-1.5 text-gray-500 transition-colors"
            style={{ color: "#6b7280" }}
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
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
          style={{ color: current === 0 ? undefined : "#9ca3af" }}
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
                  ? "w-5"
                  : "w-1.5 bg-white/15 hover:bg-white/40"
              }`}
              style={
                i === current
                  ? {
                      background: ACCENT,
                      boxShadow: "0 0 10px rgba(168,85,247,0.6)",
                    }
                  : undefined
              }
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
