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
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  MessageSquare,
  BookOpen,
  Brain,
  CircleHelp,
  Check,
  X,
  RotateCcw,
  MousePointerClick,
  Hand,
  Gift,
  Crown,
  CalendarOff,
  Smartphone,
  Globe,
  TriangleAlert,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import "./styles.css";

/* ============================================================
   PRIMITIVES
   ============================================================ */

const ACCENT = "#a855f7";
const ACCENT_SOFT = "#c084fc";

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
      className="uyz-card uyz-card-hover rounded-xl p-6 transition-all"
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
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

/* ============================================================
   ETKİLEŞİM YARDIMCILARI
   ============================================================ */

const GREEN = "#4ade80";
const RED = "#f87171";
const AMBER = "#fbbf24";

/* Cümle gibi uzun başlıklar için H2 boyutu (tek satıra yakın kalsın) */
const TITLE = "md:text-4xl!";

/* Hocanın sınıfa yönelteceği tek soru — her içerik slaydının altında */
function AskLine({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mt-5 text-sm text-gray-500"
    >
      <span
        className="font-mono text-[11px] uppercase tracking-widest mr-2"
        style={{ color: "rgba(192,132,252,0.65)" }}
      >
        Sınıfa sor:
      </span>
      {children}
    </motion.div>
  );
}

function TapHint({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest"
      style={{ color: ACCENT_SOFT }}
    >
      <MousePointerClick className="w-3.5 h-3.5" />
      {children}
    </span>
  );
}

function ActionButton({
  onClick,
  children,
  ghost = false,
}: {
  onClick: () => void;
  children: ReactNode;
  ghost?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-base font-semibold transition-all cursor-pointer"
      style={
        ghost
          ? { border: "1px solid rgba(255,255,255,0.18)", color: "#9ca3af" }
          : {
              background: "linear-gradient(135deg,#a855f7,#7c3aed)",
              color: "#ffffff",
              boxShadow: "0 8px 24px -8px rgba(168,85,247,0.6)",
            }
      }
    >
      {children}
    </button>
  );
}

/* Mini sınav: şıkka tıkla → doğru yeşil, yanlış kırmızı, tek cümle açıklama */
type QuizItem = { q: string; options: string[]; correct: number; why: string };

function Quiz({ items }: { items: QuizItem[] }) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const item = items[idx];
  const answered = picked !== null;
  const isLast = idx === items.length - 1;

  return (
    <div className="max-w-4xl mx-auto">
      {items.length > 1 && (
        <div className="text-xs font-mono text-gray-500 mb-2">
          Soru {idx + 1} / {items.length}
        </div>
      )}
      <div className="text-xl md:text-2xl text-white font-semibold mb-4">{item.q}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {item.options.map((opt, i) => {
          const isCorrect = i === item.correct;
          const isPicked = i === picked;
          let border = "rgba(168,85,247,0.3)";
          let bg = "rgba(168,85,247,0.06)";
          if (answered && isCorrect) {
            border = GREEN;
            bg = "rgba(74,222,128,0.14)";
          } else if (answered && isPicked) {
            border = RED;
            bg = "rgba(248,113,113,0.14)";
          }
          return (
            <button
              key={opt}
              type="button"
              disabled={answered}
              onClick={() => setPicked(i)}
              className="text-left rounded-xl px-5 py-3.5 text-base md:text-lg text-gray-100 transition-all flex items-center gap-3 cursor-pointer disabled:cursor-default"
              style={{ border: `1px solid ${border}`, background: bg }}
            >
              <span className="font-mono text-sm text-gray-500">{"ABCD"[i]}</span>
              <span className="flex-1">{opt}</span>
              {answered && isCorrect && <Check className="w-5 h-5 shrink-0" style={{ color: GREEN }} />}
              {answered && isPicked && !isCorrect && <X className="w-5 h-5 shrink-0" style={{ color: RED }} />}
            </button>
          );
        })}
      </div>
      <div className="mt-4 min-h-[76px]">
        {answered ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <p className="flex-1 text-base text-gray-300">
              <span style={{ color: picked === item.correct ? GREEN : RED }} className="font-semibold">
                {picked === item.correct ? "Doğru. " : "Olmadı. "}
              </span>
              {item.why}
            </p>
            {items.length > 1 && !isLast && (
              <ActionButton
                onClick={() => {
                  setIdx(idx + 1);
                  setPicked(null);
                }}
              >
                Sonraki soru <ArrowRight className="w-4 h-4" />
              </ActionButton>
            )}
            {(items.length === 1 || isLast) && (
              <ActionButton
                ghost
                onClick={() => {
                  setIdx(0);
                  setPicked(null);
                }}
              >
                <RotateCcw className="w-4 h-4" /> Baştan
              </ActionButton>
            )}
          </motion.div>
        ) : (
          <TapHint>Sınıf karar versin, sonra şıkka tıkla</TapHint>
        )}
      </div>
    </div>
  );
}

/* Adım adım açılan yönerge */
function Stepper({
  steps,
  doneNote,
}: {
  steps: Array<{ title: string; body: string }>;
  doneNote: string;
}) {
  const [shown, setShown] = useState(1);
  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-2.5">
        {steps.slice(0, shown).map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="uyz-card rounded-xl px-5 py-3 flex items-start gap-4"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
              style={{ background: "linear-gradient(135deg,#a855f7,#6d28d9)" }}
            >
              {i + 1}
            </div>
            <div>
              <div className="text-base font-semibold text-white">{s.title}</div>
              <div className="text-sm text-gray-400 leading-relaxed">{s.body}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-4">
        {shown < steps.length ? (
          <ActionButton onClick={() => setShown(shown + 1)}>
            Sonraki adım ({shown}/{steps.length}) <ArrowRight className="w-4 h-4" />
          </ActionButton>
        ) : (
          <div className="text-base" style={{ color: ACCENT_SOFT }}>
            {doneNote}
          </div>
        )}
        {shown > 1 && (
          <ActionButton ghost onClick={() => setShown(1)}>
            <RotateCcw className="w-4 h-4" /> Baştan
          </ActionButton>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   9. HAFTA BİLEŞENLERİ
   ============================================================ */

/* Slayt 2 — el kaldır oylaması */
const POLL = [
  {
    q: "Kaçınız bu hafta bir yapay zekâ asistanına soru sordu?",
    note: "Çoğumuz kullanıyoruz; ama nasıl çalıştığını bilen az. Bugün kaputun altına kısaca bakacağız.",
  },
  {
    q: "Kaçınız ChatGPT dışında bir asistan denedi?",
    note: "Tek seçenek o değil. Bugün en az sekiz asistanın adını ve kimin yaptığını öğreneceğiz.",
  },
  {
    q: "Kaçınız asistandan yanlış bir cevap aldı?",
    note: "Bu bir arıza değil, çalışma biçiminin sonucu. Dersin sonunda nedenini söyleyebileceksin.",
  },
];

function HandPoll() {
  const [open, setOpen] = useState<boolean[]>([false, false, false]);
  return (
    <div className="max-w-4xl mx-auto space-y-3 mt-6">
      {POLL.map((p, i) => (
        <button
          key={p.q}
          type="button"
          onClick={() => setOpen(open.map((v, j) => (j === i ? !v : v)))}
          className="w-full text-left uyz-card uyz-card-hover rounded-xl px-5 py-3.5 flex items-start gap-4 cursor-pointer transition-all"
        >
          <Hand className="w-6 h-6 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />
          <div className="flex-1">
            <div className="text-lg text-white font-semibold">{p.q}</div>
            {open[i] ? (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-base text-gray-300 mt-1"
              >
                {p.note}
              </motion.div>
            ) : (
              <div className="mt-1">
                <TapHint>Eller kalksın, sonra tıkla</TapHint>
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}

/* Slayt 3 — klavye önerisiyle cümle kur */
const KEY_STEPS = [
  ["güzel", "sıcak", "soğuk"],
  ["ama", "ve", "çünkü"],
  ["ben", "biz", "herkes"],
  ["kantine", "derse", "eve"],
  ["gidiyorum", "gidiyoruz", "gidiyor"],
];

function KeyboardGame() {
  const [words, setWords] = useState<string[]>([]);
  const done = words.length >= KEY_STEPS.length;
  return (
    <div className="uyz-card-violet rounded-2xl p-6 max-w-3xl mx-auto mt-6">
      <div className="text-2xl md:text-3xl leading-snug min-h-[84px]">
        <span className="text-gray-300">Bugün hava çok</span>{" "}
        {words.map((w, i) => (
          <motion.span
            key={`${i}-${w}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-semibold"
            style={{ color: ACCENT_SOFT }}
          >
            {w}{" "}
          </motion.span>
        ))}
        {!done && <span className="uyz-blank">&nbsp;</span>}
      </div>
      {done ? (
        <div className="mt-4 flex items-center gap-4">
          <p className="flex-1 text-base text-gray-300">
            Cümleyi öneriler kurdu. Klavye yalnız son birkaç kelimeye bakar; sohbet asistanı
            aynı işi bütün konuşmaya bakarak yapar.
          </p>
          <ActionButton ghost onClick={() => setWords([])}>
            <RotateCcw className="w-4 h-4" /> Baştan
          </ActionButton>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {KEY_STEPS[words.length].map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => setWords([...words, w])}
                className="rounded-xl py-3.5 text-xl text-white font-medium cursor-pointer transition-all hover:brightness-125"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.14)",
                }}
              >
                {w}
              </button>
            ))}
          </div>
          <div className="mt-3">
            <TapHint>Klavyenin önerisine tıkla</TapHint>
          </div>
        </>
      )}
    </div>
  );
}

/* Slayt 4 — sıradaki kelimeyi tahmin et */
const GUESSES = [
  { word: "çay", label: "çok olası", width: 94, top: true },
  { word: "süt", label: "olası", width: 34, top: false },
  { word: "kahve", label: "olası", width: 26, top: false },
  { word: "benzin", label: "neredeyse hiç", width: 2, top: false },
];

function NextWordGuess() {
  const [shown, setShown] = useState(false);
  return (
    <div className="uyz-card-violet rounded-2xl p-6 max-w-3xl mx-auto mt-6">
      <div className="text-2xl md:text-3xl text-white leading-snug">
        Türkiye&apos;de kahvaltıda en çok
        <span className="uyz-blank">{shown ? "çay" : " "}</span>
        içilir.
      </div>
      <div className="mt-5 min-h-[150px]">
        {shown ? (
          <div className="space-y-2.5">
            {GUESSES.map((g, i) => (
              <div key={g.word} className="flex items-center gap-4">
                <div
                  className={`w-20 text-right font-mono text-base ${
                    g.top ? "text-white font-semibold" : "text-gray-400"
                  }`}
                >
                  {g.word}
                </div>
                <div className="uyz-bar-track">
                  <motion.div
                    className="uyz-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${g.width}%` }}
                    transition={{ duration: 0.7, delay: i * 0.12 }}
                    style={g.top ? undefined : { opacity: 0.55 }}
                  />
                </div>
                <div className="w-32 text-sm text-gray-400">{g.label}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-start gap-3">
            <ActionButton onClick={() => setShown(true)}>
              <Sparkles className="w-4 h-4" /> Modelin tahminini göster
            </ActionButton>
            <TapHint>Önce sınıf tahmin etsin</TapHint>
          </div>
        )}
      </div>
      {shown && (
        <div className="flex items-center gap-4">
          <p className="flex-1 text-sm text-gray-400">
            Model en olası kelimeyi yazar, sonra bir sonrakine geçer. Uzun cevaplar da böyle
            kelime kelime oluşur.
          </p>
          <ActionButton ghost onClick={() => setShown(false)}>
            <RotateCcw className="w-4 h-4" /> Gizle
          </ActionButton>
        </div>
      )}
    </div>
  );
}

/* Slayt 7 — dört büyük asistan */
const BIG_FOUR = [
  {
    name: "ChatGPT",
    brand: "uyz-brand-openai",
    maker: "OpenAI",
    strong: "En yaygın bilinen asistan; yazı, soru-cevap, görsel gibi pek çok işi tek yerde yapar.",
  },
  {
    name: "Claude",
    brand: "uyz-brand-anthropic",
    maker: "Anthropic",
    strong: "Uzun metinleri okuma, düzgün yazı yazma ve kod işlerinde güçlü olarak bilinir.",
  },
  {
    name: "Gemini",
    brand: "uyz-brand-google",
    maker: "Google",
    strong: "Google hesabınla gelir; Arama, Gmail ve Dokümanlar ile birlikte çalışır.",
  },
  {
    name: "Copilot",
    brand: "uyz-brand-microsoft",
    maker: "Microsoft",
    strong: "Windows ve Office (Word, Excel) içine yerleşik olarak karşına çıkar.",
  },
];

function AssistantCards() {
  const [open, setOpen] = useState<boolean[]>([false, false, false, false]);
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mt-6">
      {BIG_FOUR.map((a, i) => (
        <button
          key={a.name}
          type="button"
          onClick={() => setOpen(open.map((v, j) => (j === i ? !v : v)))}
          className="uyz-card uyz-card-hover rounded-xl p-4 text-left cursor-pointer transition-all min-h-[210px] flex flex-col"
        >
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${a.brand}`}
          >
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div className="text-xl font-bold text-white">{a.name}</div>
          {open[i] ? (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-sm font-mono mt-1" style={{ color: ACCENT_SOFT }}>
                {a.maker}
              </div>
              <div className="text-sm text-gray-300 leading-relaxed mt-2">{a.strong}</div>
            </motion.div>
          ) : (
            <div className="mt-2 flex flex-col gap-2">
              <div className="text-sm text-gray-500">Kim yapıyor?</div>
              <TapHint>Tahmin et, tıkla</TapHint>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}

/* Slayt 8 — ipucunu asistanla eşleştir */
const MATCH = [
  { clue: "X (eski adıyla Twitter) içinden kullanılır", name: "Grok", maker: "xAI" },
  { clue: "Çin merkezli bir şirketin asistanı", name: "DeepSeek", maker: "DeepSeek" },
  { clue: "Fransa’dan çıkan, Avrupa’nın bilinen asistanı", name: "Le Chat", maker: "Mistral AI" },
  { clue: "Instagram ve WhatsApp’ın sahibi şirketten", name: "Meta AI", maker: "Meta" },
];
const MATCH_NAMES = ["Meta AI", "Grok", "Le Chat", "DeepSeek"];

function MatchGame() {
  const [sel, setSel] = useState<number | null>(null);
  const [done, setDone] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string | null>(null);
  const allDone = done.length === MATCH.length;

  function pickName(n: string) {
    if (sel === null) return;
    if (MATCH[sel].name === n) {
      setDone([...done, n]);
      setSel(null);
      setWrong(null);
    } else {
      setWrong(n);
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-5">
      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-5">
        <div className="space-y-2.5">
          {MATCH.map((m, i) => {
            const ok = done.includes(m.name);
            const active = sel === i;
            return (
              <button
                key={m.name}
                type="button"
                disabled={ok}
                onClick={() => {
                  setSel(i);
                  setWrong(null);
                }}
                className="w-full text-left rounded-xl px-4 py-3 text-base text-gray-100 cursor-pointer disabled:cursor-default transition-all flex items-center gap-3"
                style={{
                  border: `1px solid ${ok ? GREEN : active ? ACCENT : "rgba(168,85,247,0.25)"}`,
                  background: ok
                    ? "rgba(74,222,128,0.12)"
                    : active
                    ? "rgba(168,85,247,0.2)"
                    : "rgba(168,85,247,0.05)",
                }}
              >
                <span className="flex-1">{m.clue}</span>
                {ok && (
                  <span className="font-semibold text-sm shrink-0" style={{ color: GREEN }}>
                    {m.name} · {m.maker}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-2.5">
          {MATCH_NAMES.map((n) => {
            const ok = done.includes(n);
            const bad = wrong === n;
            return (
              <button
                key={n}
                type="button"
                disabled={ok}
                onClick={() => pickName(n)}
                className="rounded-xl px-4 py-3 text-lg font-semibold cursor-pointer disabled:cursor-default transition-all"
                style={{
                  color: ok ? "rgba(255,255,255,0.3)" : "#ffffff",
                  border: `1px solid ${bad ? RED : "rgba(255,255,255,0.15)"}`,
                  background: bad ? "rgba(248,113,113,0.16)" : "rgba(255,255,255,0.06)",
                }}
              >
                {n}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-3 min-h-[44px] flex items-center gap-4">
        {allDone ? (
          <>
            <p className="flex-1 text-base text-gray-300">
              Hepsi aynı fikre dayanır: arkada sıradaki kelimeyi tahmin eden büyük bir dil modeli
              var.
            </p>
            <ActionButton
              ghost
              onClick={() => {
                setDone([]);
                setSel(null);
                setWrong(null);
              }}
            >
              <RotateCcw className="w-4 h-4" /> Baştan
            </ActionButton>
          </>
        ) : wrong ? (
          <span className="text-base" style={{ color: RED }}>
            Bu değil, bir daha dene.
          </span>
        ) : (
          <TapHint>{sel === null ? "Önce bir ipucuna tıkla" : "Şimdi asistanın adına tıkla"}</TapHint>
        )}
      </div>
    </div>
  );
}

/* Slayt 10 — iyi yapar mı, dikkat mi? */
const TASKS = [
  { task: "Uzun bir metni özetlemek", good: true, note: "Elindeki metinle çalışır; en güçlü olduğu iş." },
  { task: "Bugünkü döviz kurunu söylemek", good: false, note: "İnternete bakmıyorsa bilemez; eski bilgi verebilir." },
  { task: "Bir konuyu basitçe anlatmak", good: true, note: "“Lise öğrencisine anlatır gibi” dersen daha da iyi." },
  { task: "Dün akşamki maçın skoru", good: false, note: "Bilgisi bir tarihte durur; dün olanı öğrenmemiştir." },
  { task: "E-posta taslağı yazmak", good: true, note: "Hızlı taslak çıkarır; son okumayı sen yaparsın." },
  { task: "Kaynak ve kitap adı vermek", good: false, note: "Var olmayan kaynak uydurabilir; mutlaka kontrol et." },
];

function TaskCards() {
  const [open, setOpen] = useState<boolean[]>(TASKS.map(() => false));
  return (
    <div className="max-w-4xl mx-auto mt-5">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {TASKS.map((t, i) => {
          const color = t.good ? GREEN : AMBER;
          return (
            <button
              key={t.task}
              type="button"
              onClick={() => setOpen(open.map((v, j) => (j === i ? !v : v)))}
              className="rounded-xl p-4 text-left cursor-pointer transition-all min-h-[118px]"
              style={{
                border: `1px solid ${open[i] ? color : "rgba(168,85,247,0.25)"}`,
                background: open[i] ? `${color}14` : "rgba(168,85,247,0.05)",
              }}
            >
              <div className="text-base font-semibold text-white">{t.task}</div>
              {open[i] ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="text-sm font-semibold mt-1.5" style={{ color }}>
                    {t.good ? "İyi yapar" : "Dikkat et"}
                  </div>
                  <div className="text-sm text-gray-300 leading-snug mt-0.5">{t.note}</div>
                </motion.div>
              ) : (
                <div className="mt-2">
                  <TapHint>İyi mi, dikkat mi?</TapHint>
                </div>
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-3">
        <ActionButton ghost onClick={() => setOpen(TASKS.map(() => false))}>
          <RotateCcw className="w-4 h-4" /> Kartları kapat
        </ActionButton>
      </div>
    </div>
  );
}

/* Slayt 12 — uydurma (halüsinasyon) örneği */
function HallucinationDemo() {
  const [shown, setShown] = useState(false);
  return (
    <div className="max-w-3xl mx-auto mt-5">
      <div className="flex justify-end">
        <div className="uyz-bubble-user px-5 py-3 text-base max-w-xl">
          “Gediz’in Sessiz Kuşları” romanını kim yazdı, hangi ödülü aldı?
        </div>
      </div>
      <div className="flex justify-start mt-3">
        <div className="uyz-bubble-ai px-5 py-3 text-base max-w-xl">
          <div className="text-[11px] font-mono uppercase tracking-widest text-gray-500 mb-1">
            Örnek cevap (temsilî)
          </div>
          Bu roman, tanınmış bir Ege yazarının en bilinen eseridir. Yayımlandığı yıl büyük ilgi
          görmüş ve önemli bir roman ödülü kazanmıştır.
        </div>
      </div>
      <div className="mt-4 min-h-[92px]">
        {shown ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl px-5 py-3 flex items-start gap-3"
            style={{ border: `1px solid ${AMBER}66`, background: "rgba(245,158,11,0.1)" }}
          >
            <TriangleAlert className="w-6 h-6 shrink-0 mt-0.5" style={{ color: AMBER }} />
            <div className="flex-1 text-base text-gray-200">
              Böyle bir roman yok; adını biz uydurduk. Model “bilmiyorum” demek yerine kulağa
              doğru gelen cümleler kurdu. Buna <strong>halüsinasyon (uydurma)</strong> denir.
            </div>
            <ActionButton ghost onClick={() => setShown(false)}>
              <RotateCcw className="w-4 h-4" /> Gizle
            </ActionButton>
          </motion.div>
        ) : (
          <div className="flex items-center gap-4">
            <ActionButton onClick={() => setShown(true)}>Gerçeği göster</ActionButton>
            <TapHint>Önce sınıf yorum yapsın</TapHint>
          </div>
        )}
      </div>
    </div>
  );
}

/* Sınavlar */
const MID_QUIZ: QuizItem[] = [
  {
    q: "Bir sohbet asistanı cevabını nasıl üretir?",
    options: [
      "Hazır cevap listesinden birini seçer",
      "Sıradaki kelimeyi tahmin ederek, kelime kelime yazar",
      "İnternetteki ilk sonucu kopyalar",
      "Arka planda bir insan yazar",
    ],
    correct: 1,
    why: "Model, okuduğu çok sayıda metinden öğrendiği kalıplarla sıradaki kelimeyi tahmin eder; cevabı o anda üretir.",
  },
];

const END_QUIZ: QuizItem[] = [
  {
    q: "Claude adlı asistanı hangi şirket geliştiriyor?",
    options: ["Google", "Microsoft", "Anthropic", "OpenAI"],
    correct: 2,
    why: "ChatGPT OpenAI’nin, Gemini Google’ın, Copilot Microsoft’un, Claude ise Anthropic’in asistanıdır.",
  },
  {
    q: "Asistan dün akşamki maçın skorunu yanlış söyledi. En olası neden hangisi?",
    options: [
      "Soru çok kısaydı",
      "Bilgisi bir tarihte duruyor ve internete bakmadı",
      "Telefonun şarjı azdı",
      "Ücretsiz plan yanlış cevap verir",
    ],
    correct: 1,
    why: "Modelin bilgisi eğitildiği tarihte kalır; güncel olaylar için internete bakabilen bir asistan gerekir.",
  },
  {
    q: "Asistan, var olmayan bir kitabı gerçekmiş gibi anlattı. Buna ne denir?",
    options: ["Bilgi kesim tarihi", "Halüsinasyon (uydurma)", "Ücretli plan", "Kelime önerisi"],
    correct: 1,
    why: "Model emin bir dille yanlış bilgi üretebilir; bu yüzden isim, sayı ve tarihleri başka kaynaktan doğrularız.",
  },
];

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ─────────────────  1 · KAPAK  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 1203 · 9. Hafta</Eyebrow>
        <H1>
          <span className="uyz-shimmer">Sohbet Eden</span>
          <br />
          <span className="uyz-shimmer">Yapay Zekâlar</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          ChatGPT, Claude, Gemini ve diğerleri: kim bunlar, nasıl çalışır, nerede yanılır?
        </Sub>

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {["ChatGPT", "Claude", "Gemini", "Copilot"].map((n, i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
              className="uyz-card rounded-full px-5 py-2 text-base text-white font-semibold flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" style={{ color: ACCENT_SOFT }} />
              {n}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8 text-sm text-gray-500"
        >
          Müfredat konusu: Büyük dil modelleri
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-3 text-[11px] font-mono text-gray-600 uppercase tracking-widest"
        >
          MCBÜ MYO · BVA 1203 · Per 15:20 – 17:00 · Amfi 1
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  2 · KÖPRÜ + OYLAMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · vizeden bugüne</Eyebrow>
      <H2 className={TITLE}>Nasıl ortaya çıktıklarını gördük; artık kullanmayı öğreniyoruz</H2>
      <Sub className="mt-3 max-w-4xl">
        Vizeye kadar modellerin nereden geldiğini konuştuk. Bundan sonra formül yok: araçları
        tanıyacak, deneyecek ve doğru kullanacağız.
      </Sub>
      <HandPoll />
    </SlideShell>
  ),

  /* ─────────────────  3 · KLAVYE BENZETMESİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Benzetme · telefon klavyesi</Eyebrow>
      <H2 className={TITLE}>Telefonunun klavyesi de sıradaki kelimeyi tahmin ediyor</H2>
      <Sub className="mt-3 max-w-4xl">
        Mesaj yazarken klavyenin üstünde üç öneri çıkar. Hiç yazmadan, yalnız önerilere basarak
        bir cümle kuralım.
      </Sub>
      <KeyboardGame />
      <AskLine>Klavyen bugüne kadar sana en saçma hangi kelimeyi önerdi?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  4 · SIRADAKİ KELİME  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kavram · büyük dil modeli</Eyebrow>
      <H2 className={TITLE}>Dil modeli sıradaki kelimeyi tahmin eder</H2>
      <Sub className="mt-3 max-w-4xl">
        Sohbet asistanlarının arkasında bir <strong className="text-white">büyük dil modeli</strong>{" "}
        (LLM: çok fazla metin okuyarak eğitilmiş tahmin programı) vardır.
      </Sub>
      <NextWordGuess />
      <AskLine>Boşluğa siz ne yazardınız? Neden herkes aynı kelimeyi söyledi?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  5 · ÇOK OKUMUŞ ARKADAŞ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Benzetme · çok okumuş arkadaş</Eyebrow>
      <H2 className={TITLE}>Çok okumuş ama her şeyi bilmeyen bir arkadaş gibi</H2>
      <Sub className="mt-3 max-w-4xl">
        Kütüphanedeki kitapların çoğunu okumuş birini düşün. Her konuda konuşabilir, ama her
        söylediği doğru olmak zorunda değil.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={BookOpen}
          title="Çok okudu"
          desc="Kitaplar, haberler, web sayfaları: bir insanın ömründe okuyamayacağı kadar metin."
          delay={0.2}
        />
        <FeatureCard
          icon={Brain}
          title="Ezberlemedi, kalıp öğrendi"
          desc="Metinleri saklamaz; kelimelerin birbirini nasıl izlediğini öğrenir."
          delay={0.35}
          accent="#60a5fa"
        />
        <FeatureCard
          icon={CircleHelp}
          title="Her şeyi bilmez"
          desc="Okumadığı, yeni olan ya da sana özel bilgileri bilemez; bazen tahmin yürütür."
          delay={0.5}
          accent={AMBER}
        />
      </div>
      <AskLine>Çok kitap okuyan bir arkadaşın her konuda haklı mıdır?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  6 · ARA SINAV  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Hızlı soru</Eyebrow>
      <H2 className={`${TITLE} mb-6`}>Buraya kadar anlaştık mı?</H2>
      <Quiz items={MID_QUIZ} />
    </SlideShell>
  ),

  /* ─────────────────  7 · DÖRT BÜYÜK ASİSTAN  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Araçlar · en çok duyacağın dört isim</Eyebrow>
      <H2 className={TITLE}>Dört büyük asistan: kim yapıyor, neyle öne çıkıyor?</H2>
      <AssistantCards />
      <AskLine>Telefonunda bunlardan hangisi var? Hangisini hiç duymadın?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  8 · DİĞER ASİSTANLAR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Araçlar · liste bununla bitmiyor</Eyebrow>
      <H2 className={TITLE}>Başka asistanlar da var: ipucunu asistanla eşleştir</H2>
      <MatchGame />
      <AskLine>Bunlardan adını bugün ilk kez duyduğun hangisi?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  9 · ÜCRETSİZ / ÜCRETLİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kullanım · plan farkı</Eyebrow>
      <H2 className={TITLE}>Ücretsiz plan derse yeter; ücretli plan daha fazlasını verir</H2>
      <Sub className="mt-3 max-w-4xl">
        Otobüs kartı gibi düşün: ücretsiz planda günlük biniş hakkın sınırlı, ücretli planda
        daha çok.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-7">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="uyz-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3" style={{ color: GREEN }}>
            <Gift className="w-5 h-5" />
            <span className="text-sm font-mono uppercase tracking-widest">Ücretsiz plan</span>
          </div>
          <ul className="space-y-2 text-base text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-1 shrink-0" style={{ color: GREEN }} />Günlük kullanım sınırı vardır.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-1 shrink-0" style={{ color: GREEN }} />Bazı özellikler kapalı ya da kısıtlı olabilir.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-1 shrink-0" style={{ color: GREEN }} />Bu dersteki bütün etkinliklere yeter.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="uyz-card-violet rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3" style={{ color: ACCENT_SOFT }}>
            <Crown className="w-5 h-5" />
            <span className="text-sm font-mono uppercase tracking-widest">Ücretli plan</span>
          </div>
          <ul className="space-y-2 text-base text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-1 shrink-0" style={{ color: ACCENT_SOFT }} />Daha yüksek kullanım hakkı verir.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-1 shrink-0" style={{ color: ACCENT_SOFT }} />Daha gelişmiş modeller ve ek özellikler açılır.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-1 shrink-0" style={{ color: ACCENT_SOFT }} />Her gün yoğun kullanan için anlamlıdır.</li>
          </ul>
        </motion.div>
      </div>
      <AskLine>Ücretsiz planda &ldquo;sınırına ulaştın&rdquo; uyarısı gören oldu mu?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  10 · YAPAR / DİKKAT  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sınırlar · tahmin et, tıkla</Eyebrow>
      <H2 className={TITLE}>Neyi iyi yapar, nerede dikkat etmek gerekir?</H2>
      <TaskCards />
      <AskLine>Bu işi asistana verip sonucu hiç kontrol etmeden kullanır mıydın?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  11 · BİLGİ KESİM TARİHİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sınırlar · bilgi kesim tarihi</Eyebrow>
      <H2 className={TITLE}>Modelin bilgisi bir tarihte durur</H2>
      <Sub className="mt-3 max-w-4xl">
        Aylarca telefonsuz kalıp dönen bir arkadaş gibi: gitmeden öncesini iyi bilir, sonrasını
        ona sen anlatmalısın. Bu tarihe <strong className="text-white">bilgi kesim tarihi</strong>{" "}
        denir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-7">
        <FeatureCard
          icon={CalendarOff}
          title="Sonrasını bilmez"
          desc="Dünkü maç, bugünkü kur, yeni çıkan telefon: eğitiminden sonra olanlar yoktur."
          delay={0.2}
          accent={AMBER}
        />
        <FeatureCard
          icon={Globe}
          title="İnternete bakabilen asistanlar var"
          desc="Bazı asistanlar web’de arama yapıp güncel bilgi getirir; yanında kaynak gösterir."
          delay={0.35}
          accent="#60a5fa"
        />
        <FeatureCard
          icon={Smartphone}
          title="Güncel konuda kaynağa bak"
          desc="Cevapta kaynak bağlantısı yoksa, güncel bilgiyi kendin doğrula."
          delay={0.5}
        />
      </div>
      <AskLine>Dün olan bir olayı asistana sorsan sence ne cevap verir?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  12 · HALÜSİNASYON  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sınırlar · uydurma</Eyebrow>
      <H2 className={TITLE}>Bazen emin bir sesle uydurur</H2>
      <Sub className="mt-3 max-w-4xl">
        Sınavda bilmediği soruya boş bırakmak yerine bir şeyler yazan öğrenci gibi.
      </Sub>
      <HallucinationDemo />
      <AskLine>Bu cevapta sizi şüphelendiren bir şey var mı?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  13 · SINIFTA DENEYELİM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sınıfta deneyelim · 10 dakika · telefonla</Eyebrow>
      <H2 className={`${TITLE} mb-5`}>Aynı soruyu iki asistana sor, cevapları karşılaştır</H2>
      <Stepper
        steps={[
          {
            title: "İki asistan aç",
            body: "Telefonunda iki farklı asistanı aç (uygulama ya da tarayıcı). Ücretsiz plan yeter; giriş isteyebilir.",
          },
          {
            title: "İkisine de aynı soruyu yaz",
            body: "“Manisa’da bir günde gezilecek 3 yer öner, her birinin nedenini bir cümleyle yaz.”",
          },
          {
            title: "Cevapları karşılaştır",
            body: "Hangisi daha kısa, hangisi daha anlaşılır? Bildiğin bir yanlış ya da uydurma yer var mı?",
          },
          {
            title: "Yanındakine göster",
            body: "Sıra arkadaşınla ekranları yan yana koy; iki dakika sonra birkaç kişi sınıfa anlatsın.",
          },
        ]}
        doneNote="Süre başladı: 10 dakika."
      />
      <AskLine>İki cevap arasındaki en büyük fark neydi?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  14 · KENDİNİ DENE  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kendini dene · 3 soru</Eyebrow>
      <H2 className={`${TITLE} mb-6`}>Bugünden aklında ne kaldı?</H2>
      <Quiz items={END_QUIZ} />
    </SlideShell>
  ),

  /* ─────────────────  15 · AKLINDA KALSIN  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Özet</Eyebrow>
      <H2>Aklında kalsın: 3 şey</H2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[
          {
            t: "Tahmin eder, bilmez",
            d: "Sohbet asistanı sıradaki kelimeyi tahmin ederek yazar; her cümlesi doğru olmak zorunda değil.",
          },
          {
            t: "Tek asistan yok",
            d: "ChatGPT, Claude, Gemini, Copilot ve diğerleri. Aynı soruya farklı cevap verebilirler.",
          },
          {
            t: "Kontrol sende",
            d: "Bilgisi bir tarihte durur, bazen uydurur. İsim, sayı ve tarihleri doğrula.",
          },
        ].map((x, i) => (
          <motion.div
            key={x.t}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
            className="uyz-card-violet rounded-xl p-6"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-white mb-3"
              style={{ background: "linear-gradient(135deg,#a855f7,#6d28d9)" }}
            >
              {i + 1}
            </div>
            <div className="text-xl font-semibold text-white mb-2">{x.t}</div>
            <div className="text-base text-gray-300 leading-relaxed">{x.d}</div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-7 flex items-center gap-3 text-lg text-gray-300"
      >
        <ArrowRight className="w-5 h-5 shrink-0" style={{ color: ACCENT_SOFT }} />
        Gelecek hafta: aynı asistandan çok daha iyi cevap almanın yolu, yani iyi istem (prompt)
        yazmak.
      </motion.div>
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
          BVA 1203 · 9. Hafta · Sohbet Eden Yapay Zekâlar
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
