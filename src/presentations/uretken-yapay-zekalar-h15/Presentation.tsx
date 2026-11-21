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
  Briefcase,
  Bot,
  MapIcon,
  GraduationCap,
  Wrench,
  MessageSquare,
  Target,
  ListChecks,
  ShieldCheck,
  FileText,
  Mail,
  Compass,
  PenLine,
  Search,
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

/* Çipe tıkla, iki kutulu açıklamayı gör (sektörler ve araç haritası) */
type ExploreItem = { label: string; left: string; right: string };

function ChipExplorer({
  items,
  leftTitle,
  rightTitle,
  emptyText,
}: {
  items: ExploreItem[];
  leftTitle: string;
  rightTitle: string;
  emptyText: string;
}) {
  const [sel, setSel] = useState<number | null>(null);
  const cur = sel === null ? null : items[sel];
  return (
    <div className={SAFE}>
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {items.map((it, i) => (
          <button
            type="button"
            key={it.label}
            onClick={() => setSel(i)}
            className={`uyz-chip ${sel === i ? "uyz-chip-on" : ""}`}
          >
            {it.label}
          </button>
        ))}
      </div>
      {cur ? (
        <motion.div
          key={cur.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="uyz-card-violet rounded-xl p-5 min-h-[8.5rem]">
            <div className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: ACCENT_SOFT }}>
              {leftTitle}
            </div>
            <div className="text-base md:text-lg text-gray-200 leading-relaxed">{cur.left}</div>
          </div>
          <div className="uyz-card rounded-xl p-5 min-h-[8.5rem]">
            <div className="text-xs font-mono uppercase tracking-widest mb-2 text-green-400">
              {rightTitle}
            </div>
            <div className="text-base md:text-lg text-gray-200 leading-relaxed">{cur.right}</div>
          </div>
        </motion.div>
      ) : (
        <div className="uyz-step-hidden rounded-xl p-5 min-h-[8.5rem] flex flex-col items-center justify-center gap-2 text-center">
          <TapHint>bir çipe tıkla</TapHint>
          <div className="text-base text-gray-500">{emptyText}</div>
        </div>
      )}
    </div>
  );
}

/* Asistan ↔ ajan: aynı görev, iki farklı davranış */
const AGENT_STEPS = [
  "Bilet sitesini açtı.",
  "Cuma akşamı Manisa → İstanbul seferlerini listeledi.",
  "Fiyatları ve kalkış saatlerini karşılaştırdı.",
  "“En uygun üç sefer bunlar. Hangisini alayım?” diye sana sordu.",
];

function AgentToggle() {
  const [agent, setAgent] = useState(false);
  return (
    <div className={`grid grid-cols-1 md:grid-cols-5 gap-5 items-stretch ${SAFE}`}>
      <div className="md:col-span-2 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setAgent(false)}
          className={`uyz-chip justify-center ${!agent ? "uyz-chip-on" : ""}`}
        >
          <MessageSquare className="w-4 h-4" />
          Asistan: tarif eder
        </button>
        <button
          type="button"
          onClick={() => setAgent(true)}
          className={`uyz-chip justify-center ${agent ? "uyz-chip-on" : ""}`}
        >
          <Bot className="w-4 h-4" />
          Ajan: işi yürütür
        </button>
        <div className="mt-1 text-center">
          <TapHint>ikisi arasında geçiş yap</TapHint>
        </div>
        <div className="uyz-card rounded-xl p-4 text-sm text-gray-400 leading-relaxed mt-auto">
          {agent
            ? "Taksi şoförü gibi: seni oraya götürür. Ama nereye gidileceğine ve paranın ödenmesine sen karar verirsin."
            : "Yol tarifi veren esnaf gibi: nasıl gidileceğini anlatır, yolu sen yürürsün."}
        </div>
      </div>

      <div className="md:col-span-3 uyz-window-chrome p-5 flex flex-col gap-3">
        <div className="self-end uyz-bubble-user px-4 py-3 text-base max-w-[90%]">
          Cuma akşamı Manisa&apos;dan İstanbul&apos;a en uygun otobüs biletini bul.
        </div>
        <motion.div
          key={agent ? "ajan" : "asistan"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="self-start uyz-bubble-ai px-4 py-3 text-base leading-relaxed w-full"
        >
          <span className="uyz-sample-tag">Örnek davranış</span>
          {agent ? (
            <div className="flex flex-col gap-1.5">
              {AGENT_STEPS.map((s, i) => (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.25 * i }}
                  className="flex items-start gap-2"
                >
                  <Check className="w-4 h-4 mt-1 flex-shrink-0 text-green-400" />
                  <span>{s}</span>
                </motion.div>
              ))}
            </div>
          ) : (
            <div>
              Bir bilet sitesine girip tarihi ve güzergâhı seçmelisin. Fiyatları
              karşılaştırırken kalkış saatine ve firmaya da bak. İstersen nelere
              dikkat edeceğini listeleyeyim.
            </div>
          )}
        </motion.div>
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
        <Eyebrow>BVA 1203 · 15. Hafta · Son ders</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]"
        >
          <span className="uyz-shimmer">İş Hayatında YZ ve Ajanlar</span>
        </motion.h1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          YZ işyerinde ne yapıyor, &ldquo;ajan&rdquo; ne demek, ve dönem boyunca
          tanıdığımız araçlar tek haritada.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-4xl mx-auto">
          <FeatureCard
            icon={Briefcase}
            title="Sektörlerde YZ"
            desc="Bankadan bağa: kim, ne için kullanıyor?"
            delay={0.3}
          />
          <FeatureCard
            icon={Bot}
            title="Ajanlar"
            desc="Tarif eden değil, işi yürüten YZ."
            delay={0.4}
            accent="#3b82f6"
          />
          <FeatureCard
            icon={MapIcon}
            title="Dönem özeti"
            desc="Araç haritası ve final öncesi tekrar."
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
          Müfredat konusu: Ar-Ge ve endüstriyel uygulamalar
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  2 · DÖNEMDEN KÖPRÜ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Geçen haftadan ve dönemden bugüne</Eyebrow>
      <H2>Dönem boyunca üç adım attık; bugün toparlıyoruz</H2>
      <Sub className="mt-4 mb-8 max-w-3xl">
        Geçen hafta kendi asistanını kurdun. Bugün aynı araçların işyerinde
        nasıl kullanıldığına bakıp dönemi kapatıyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={GraduationCap}
          title="Vizeye kadar"
          desc="Üretken YZ nedir, modeller nasıl ortaya çıktı?"
          delay={0.2}
          accent="#f59e0b"
        />
        <FeatureCard
          icon={Wrench}
          title="9–14. hafta"
          desc="Araçları kullandık: sohbet, istem, görsel, güvenlik, araştırma, kendi asistanın."
          delay={0.3}
        />
        <FeatureCard
          icon={Briefcase}
          title="Bugün"
          desc="İş hayatı, ajanlar ve hepsini bir araya getiren araç haritası."
          delay={0.4}
          accent="#22c55e"
        />
      </div>
      <Ask>Dönemden aklında en çok kalan araç hangisi? Neden o?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  3 · FARK ETMEDEN KULLANIYORSUN (tahmin et)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Günlük hayat · tahmin et</Eyebrow>
      <H2>YZ&apos;yi çoğu zaman fark etmeden kullanıyorsun</H2>
      <Sub className="mt-4 mb-6 max-w-3xl">
        Bunların hangisinde yapay zekâ var? Hangisi &ldquo;üretken&rdquo;? Önce
        tahmin, sonra tıkla.
      </Sub>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${SAFE}`}>
        <Reveal
          q="Banka uygulamasındaki sohbet penceresi"
          a="YZ var ve çoğu zaman üretken: sorunu anlar, cevabı o an yazar."
          delay={0.2}
        />
        <Reveal
          q="Alışveriş sitesindeki “senin için seçtiklerimiz”"
          a="YZ var ama üretken değil: geçmiş alışverişlerden tahmin yapıp ürün önerir."
          delay={0.3}
        />
        <Reveal
          q="E-postadaki “gereksiz” (spam) klasörü"
          a="YZ var ama üretken değil: gelen postayı “gereksiz / değil” diye ayırır."
          delay={0.4}
        />
        <Reveal
          q="Harita uygulamasındaki tahmini varış süresi"
          a="YZ var ama üretken değil: trafik verisinden süre tahmin eder."
          delay={0.5}
        />
      </div>
      <Ask>Bugün bunlardan hangisini kullandın? Üretken olanla olmayanın farkı ne?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  4 · SEKTÖR ÖRNEKLERİ (oyna-gör)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sektörler · oyna-gör</Eyebrow>
      <H2>Her sektörde YZ bir işi alır, karar insanda kalır</H2>
      <Sub className="mt-4 mb-6 max-w-3xl">
        Sınıf bir sektör seçsin. Açmadan önce tahmin edin: orada YZ ne iş yapıyor
        olabilir?
      </Sub>
      <ChipExplorer
        leftTitle="YZ ne yapıyor?"
        rightTitle="İnsanda kalan"
        emptyText="Hangi sektörü merak ediyorsunuz?"
        items={[
          {
            label: "Müşteri hizmetleri",
            left: "Banka ya da kargo uygulamasındaki sohbet asistanı sık sorulan soruları günün her saati cevaplar.",
            right: "Karmaşık şikâyet, özür dilemek, istisna yapmak. Asistan çözemeyince seni bir çalışana aktarır.",
          },
          {
            label: "E-ticaret",
            left: "Ürün açıklaması yazar, yüzlerce yorumu tek paragrafta özetler, sana uygun ürün önerir.",
            right: "Fiyat ve kampanya kararı, iade anlaşmazlıkları, açıklamanın doğru olduğunu kontrol etmek.",
          },
          {
            label: "Sağlık",
            left: "Doktorun konuşmasını yazıya döker, görüntüde dikkat edilmesi gereken bölgeyi işaretler.",
            right: "Teşhis ve tedavi kararı doktorundur. YZ burada yalnızca yardımcıdır.",
          },
          {
            label: "Eğitim",
            left: "Konuyu senin seviyene göre yeniden anlatır, deneme sorusu hazırlar, yazına geri bildirim verir.",
            right: "Neyin öğretileceği, not verme ve öğrenciyi tanımak öğretmenin işidir.",
          },
          {
            label: "Üretim",
            left: "Manisa'daki fabrikaları düşün: kamera hatalı ürünü yakalar, sistem makinenin arıza yapacağını önceden haber verir.",
            right: "Hattı durdurma kararı, bakım ve iş güvenliği insanların sorumluluğundadır.",
          },
          {
            label: "Finans",
            left: "Kartındaki alışılmadık işlemi fark edip uyarır, aylık harcamalarını özetler.",
            right: "Kredi kararı ve itirazların son sözü bir yetkilide olmalıdır; hesabı o verir.",
          },
          {
            label: "Tarım",
            left: "Bağdaki yaprağın fotoğrafından hastalık belirtisi arar, hava verisine göre sulama zamanı önerir.",
            right: "Tarlayı tanıyan çiftçidir. İlaçlama ve hasat kararını o verir.",
          },
        ]}
      />
      <Ask>Bu sektörlerden hangisinde çalışmak isterdin? Orada YZ&apos;ye hangi işi verirdin?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  5 · ASİSTAN ↔ AJAN (oyna-gör)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Yeni kavram · YZ ajanı (agent)</Eyebrow>
      <H2>Asistan tarif eder, ajan işi yürütür</H2>
      <Sub className="mt-4 mb-6 max-w-3xl">
        Ajan: verdiğin hedef için adımları kendi planlayıp araç kullanarak işi
        yürüten YZ. Aynı görev, iki davranış.
      </Sub>
      <AgentToggle />
      <Ask>Ajan sana sormadan bileti alsaydı ne olurdu? Son adımda neden soruyor?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  6 · AJAN DÖNGÜSÜ (adım adım)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Ajan nasıl çalışır · adım adım</Eyebrow>
      <H2>Ajan dört adımı kendi kendine tekrarlar</H2>
      <Sub className="mt-4 mb-7 max-w-3xl">
        Sen yalnızca hedefi söylersin. Arada her adım için ayrıca yazman gerekmez.
      </Sub>
      <Stepper
        steps={[
          {
            icon: Target,
            title: "Hedefi alır",
            desc: "“Cuma için en uygun bileti bul.”",
          },
          {
            icon: ListChecks,
            title: "Plan yapar",
            desc: "İşi küçük adımlara böler: ara, listele, karşılaştır.",
          },
          {
            icon: Wrench,
            title: "Araç kullanır",
            desc: "Web sitesini açar, dosya okur, tablo doldurur, e-posta taslağı yazar.",
          },
          {
            icon: ShieldCheck,
            title: "Kontrol eder, sana sorar",
            desc: "Sonuca bakar; eksikse başa döner. Para ve gönderme gibi işlerde onay ister.",
          },
        ]}
      />
      <Ask>Dördüncü adım olmasaydı ne olurdu? Hangi işlerde onay şart olmalı?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  7 · OTOMASYON ARAÇLARI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Otomasyon · Zapier, Make, n8n</Eyebrow>
      <H2>Otomasyon araçları &ldquo;şu olunca bunu yap&rdquo; zinciri kurar</H2>
      <Sub className="mt-4 mb-7 max-w-3xl">
        Domino taşları gibi: ilki devrilince gerisi kendiliğinden gelir. Zapier,
        Make ve n8n, uygulamaları kod yazmadan birbirine bağlar.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={FileText}
          title="1 · Tetikleyici"
          desc="Müşteri şikâyet formunu doldurur."
          delay={0.2}
          accent="#f59e0b"
        />
        <FeatureCard
          icon={Sparkles}
          title="2 · YZ adımı"
          desc="YZ şikâyeti tek cümlede özetler ve konusunu etiketler."
          delay={0.35}
        />
        <FeatureCard
          icon={Mail}
          title="3 · Sonuç"
          desc="Özet tabloya yazılır, ilgili kişiye e-posta gider."
          delay={0.5}
          accent="#22c55e"
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-5 uyz-card rounded-lg px-5 py-3 text-sm md:text-base text-gray-400"
      >
        <span className="text-white font-semibold">Dikkat:</span> zincir yanlış kurulursa
        hata da otomatik tekrarlanır. Önce birkaç örnekle dene, sonra çalıştır.
      </motion.div>
      <Ask>Sen her hafta tekrar ettiğin hangi işi böyle bir zincire bağlardın?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  8 · MİNİ SINAV (orta)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Mini sınav · dersin ortası</Eyebrow>
      <H2 className="mb-7">Hangisi ajan gibi davranıyor?</H2>
      <Quiz
        items={[
          {
            q: "Aşağıdakilerden hangisi bir YZ ajanının davranışıdır?",
            options: [
              "Sorduğun soruya bir paragraf cevap yazmak",
              "Otobüs saatlerini nasıl bulacağını anlatmak",
              "Yazındaki yazım hatalarının altını çizmek",
              "Siteyi açıp seferleri karşılaştırmak, sonra onayını istemek",
            ],
            correct: 3,
            why: "Ajan işi adım adım kendisi yürütür; diğerleri yalnızca cevap ya da öneri verir.",
          },
        ]}
      />
      <Ask>Bir ajana hangi işi asla tek başına bırakmazdın?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  9 · MESLEKLER DEĞİŞİYOR (karar kartları)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Meslekler · el kaldır</Eyebrow>
      <H2 className="mb-6">Meslek kaybolmuyor, içindeki işler değişiyor</H2>
      <Judge
        labels={["YZ hızlandırır", "İnsanda kalır"]}
        items={[
          {
            text: "Bir veri analistinin işi: dağınık tablodaki yazım hatalarını ve boş hücreleri toparlamak.",
            answer: 0,
            why: "YZ hızlandırır. Tekrarlayan, kuralı belli işler. Yine de sonucu birkaç satırda kontrol edersin.",
          },
          {
            text: "Toplantı notlarından rapor taslağı çıkarmak.",
            answer: 0,
            why: "YZ hızlandırır. İlk taslağı o yazar; düzeltmek ve son hâlini vermek sende.",
          },
          {
            text: "Müdüre hangi sorunun cevabının lazım olduğunu anlamak.",
            answer: 1,
            why: "İnsanda kalır. Doğru soruyu bulmak için işyerini ve insanları tanımak gerekir.",
          },
          {
            text: "“Bu rapordaki sayılar doğrudur” diye altına imza atmak.",
            answer: 1,
            why: "İnsanda kalır. Sorumluluk devredilmez: yanlış çıkarsa hesabı YZ değil sen verirsin.",
          },
        ]}
      />
      <Ask>Oylayın: bu işi YZ mi hızlandırır, yoksa insanda mı kalır?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  10 · YZ OKURYAZARLIĞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Veri analisti için YZ okuryazarlığı</Eyebrow>
      <H2>YZ okuryazarı analist dört şeyi iyi yapar</H2>
      <Sub className="mt-4 mb-8 max-w-3xl">
        İş ilanlarında aranan şey araç adı ezberlemek değil; bu dört alışkanlık.
        Hepsini bu dönem çalıştık.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FeatureCard
          icon={Compass}
          title="Doğru aracı seçer"
          desc="İşe göre araç: sohbet, görsel, araştırma, tablo."
          delay={0.2}
        />
        <FeatureCard
          icon={PenLine}
          title="İyi istem yazar"
          desc="Rol, bağlam, görev, biçim; ilk cevap taslaktır."
          delay={0.3}
          accent="#3b82f6"
        />
        <FeatureCard
          icon={Search}
          title="Çıktıyı doğrular"
          desc="Kaynağı açar, sayıyı elle kontrol eder."
          delay={0.4}
          accent="#22c55e"
        />
        <FeatureCard
          icon={ShieldCheck}
          title="Güvenli ve dürüst kullanır"
          desc="Kişisel veriyi yazmaz, YZ kullandığını söyler."
          delay={0.5}
          accent="#f59e0b"
        />
      </div>
      <Ask>Bu dördünden hangisinde kendini en iyi görüyorsun? Hangisi en zoru?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  11 · ARAÇ HARİTASI (oyna-gör)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Dönemin araç haritası · oyna-gör</Eyebrow>
      <H2>Hangi iş için hangi araç?</H2>
      <Sub className="mt-4 mb-6 max-w-3xl">
        Alet çantası gibi: vida için tornavida, çivi için çekiç. İşi seç; önce
        sınıf aracı söylesin, sonra açalım.
      </Sub>
      <ChipExplorer
        leftTitle="Araçlar"
        rightTitle="Unutma"
        emptyText="Bir iş seç; hangi aracı açardın?"
        items={[
          {
            label: "Metin yazma, özet",
            left: "ChatGPT, Claude, Gemini, Copilot. (9. ve 10. hafta)",
            right: "İyi istem: rol + bağlam + görev + biçim. İlk cevap taslaktır, üzerinden geç.",
          },
          {
            label: "Görsel",
            left: "ChatGPT ve Gemini'nin görsel üretimi, Midjourney, Adobe Firefly, Canva. (11. hafta)",
            right: "Görsel istemi: konu + stil + ışık + kadraj. Gerçek kişileri izinsiz kullanma.",
          },
          {
            label: "Ses, müzik, video",
            left: "ElevenLabs, Suno; Sora, Veo, Runway. (11. hafta)",
            right: "Başkasının sesini ve yüzünü taklit etmek hem etik hem hukuki sorundur.",
          },
          {
            label: "Sunum, tasarım",
            left: "Gamma, Canva. (11. hafta)",
            right: "İskeleti o çıkarır; içeriğin doğruluğu ve son hâli senin işin.",
          },
          {
            label: "Ders notuyla çalışma",
            left: "NotebookLM ya da asistana dosya yükleme. (13. hafta)",
            right: "Açık kitap sınavı: cevabın notta nerede geçtiğini sor, açıp bak.",
          },
          {
            label: "Güncel bilgi, araştırma",
            left: "Web araması yapan asistanlar, Perplexity, derin araştırma modu. (13. hafta)",
            right: "Bağlantı vermesi yetmez. Bağlantıyı aç, cümleyi kaynakta bul.",
          },
          {
            label: "Tablo ve kod",
            left: "Excel ve Google Sheets'te YZ, tablo yükleme; GitHub Copilot, Cursor, Claude Code. (14. hafta)",
            right: "Sonucu küçük bir örnekle elle kontrol et. Kişisel veri içeren tabloyu yükleme.",
          },
          {
            label: "Tekrarlayan iş",
            left: "Özel asistan (GPT, Gem, Proje); Zapier, Make, n8n; ajanlar. (14. ve 15. hafta)",
            right: "Önce küçük dene. Para, gönderme ve silme adımlarında onayı kendin ver.",
          },
        ]}
      />
      <Ask>Çipe basmadan önce: bu iş için telefonunda hangi uygulamayı açardın?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  12 · SINIFTA DENEYELİM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sınıfta deneyelim · 10 dakika · kâğıt ya da telefon notu</Eyebrow>
      <H2>Kendi araç kutunu çıkar</H2>
      <Sub className="mt-4 mb-6 max-w-3xl">
        Bu kâğıt sende kalsın: dersten sonra ilk başvuracağın liste olacak.
      </Sub>
      <TaskList
        steps={[
          {
            title: "Üç iş yaz",
            desc: "Önümüzdeki ay yapacağın işler: ödev, sunum, CV, staj başvurusu…",
          },
          {
            title: "Her işe bir araç seç",
            desc: "Haritaya bak. Ücretsiz kullanabildiğin bir araç olsun.",
          },
          {
            title: "“Nasıl doğrularım?” yaz",
            desc: "Her araç için tek cümle: çıktının doğru olduğunu nereden anlayacaksın?",
          },
          {
            title: "Yanındakiyle değiştir",
            desc: "O senin yerinde olsa hangi aracı seçerdi? Bir öneri yazsın.",
          },
        ]}
      />
      <Ask>Kimin kutusunda derste hiç konuşmadığımız bir araç var?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  13 · FİNAL ÖNCESİ TEKRAR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Final öncesi tekrar · 5 soru</Eyebrow>
      <H2 className="mb-7">Finale hazır mısın?</H2>
      <Quiz
        items={[
          {
            q: "Sohbet eden yapay zekâ cevabını temelde nasıl üretir?",
            options: [
              "İnternetteki hazır cevabı kopyalar",
              "Sıradaki kelimeyi tahmin ederek yazar",
              "Bir insana sorup aktarır",
              "Ezberlediği cümleleri sırayla okur",
            ],
            correct: 1,
            why: "Telefon klavyesindeki kelime tahmininin çok gelişmiş hâli gibi çalışır.",
          },
          {
            q: "İyi bir istemde (prompt) hangisi bulunur?",
            options: [
              "Rol, bağlam, görev ve istenen biçim",
              "Yalnızca tek kelimelik konu",
              "Mümkün olduğunca çok ünlem",
              "Asistanın sürüm numarası",
            ],
            correct: 0,
            why: "Kim olarak, hangi durumda, ne yapacağını ve nasıl sunacağını söylersin.",
          },
          {
            q: "“Halüsinasyon” ne demek?",
            options: [
              "Asistanın yavaş cevap vermesi",
              "Asistanın cevap vermeyi reddetmesi",
              "Asistanın emin bir dille uydurma bilgi vermesi",
              "Asistanın görsel üretmesi",
            ],
            correct: 2,
            why: "Bilmediği yerde boşluğu tahminle doldurur; bu yüzden önemli bilgiyi doğrularız.",
          },
          {
            q: "Hangisini bir YZ asistanına yazmamalısın?",
            options: [
              "Bir şiirin konusunu",
              "Ödev sorusunun metnini",
              "Yemek tarifini",
              "T.C. kimlik numaranı ve sağlık bilgini",
            ],
            correct: 3,
            why: "Kişisel veriler paylaşılmaz. Gerekirse kimliği sil, yalnızca sorunu yaz.",
          },
          {
            q: "Asistana ders notunu yükleyip soru sormak hangi benzetmeyle anlatılır?",
            options: [
              "Kapalı kitap sınavı",
              "Sözlü sınav",
              "Açık kitap sınavı",
              "Yazılı kopya",
            ],
            correct: 2,
            why: "Model aklından değil, önündeki kaynağa bakarak cevaplar.",
          },
        ]}
      />
    </SlideShell>
  ),

  /* ─────────────────  14 · AKLINDA KALSIN + KAPANIŞ  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>Dönem tamamlandı</Eyebrow>
        <H1>
          <span className="uyz-shimmer">Aklında kalsın: 3 şey</span>
        </H1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-5xl mx-auto">
          <FeatureCard
            icon={Compass}
            title="1 · İşe göre araç seç"
            desc="Araçlar değişir; “bu iş için hangisi?” sorusu kalır."
            delay={0.2}
          />
          <FeatureCard
            icon={Bot}
            title="2 · Ajan yürütür, sen onaylarsın"
            desc="İşi adım adım yapabilir. Karar ve sorumluluk yine sende."
            delay={0.3}
            accent="#3b82f6"
          />
          <FeatureCard
            icon={ShieldCheck}
            title="3 · Doğrula, dürüst kullan"
            desc="Kaynağı aç, sayıyı kontrol et, kişisel veriyi yazma, kullandığını söyle."
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
            <span className="text-white font-semibold">Sırada final var.</span> Çalışırken
            geçen hafta kurduğun ders asistanını ve bugünkü araç kutunu kullan. Emeğinize sağlık.
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
          BVA 1203 · 15. Hafta · İş Hayatında YZ ve Ajanlar
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
