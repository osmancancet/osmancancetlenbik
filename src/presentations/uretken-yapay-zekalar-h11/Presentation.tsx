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
  Check,
  X,
  MousePointerClick,
  RotateCcw,
  ArrowRight,
  AlertTriangle,
  Image as ImageIcon,
  Mic,
  Video,
  Music,
  MessageSquare,
  Palette,
  Wand2,
  Camera,
  LayoutTemplate,
  Smartphone,
  Search,
  PenLine,
  Clapperboard,
  RefreshCw,
  Scissors,
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
   ETKİLEŞİM BİLEŞENLERİ
   ============================================================ */

/* Hocanın sınıfa yönelteceği tek soru — her içerik slaydının altında */
function AskLine({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="mt-5 text-sm text-gray-500"
    >
      <span
        className="font-mono text-[11px] uppercase tracking-wider mr-2"
        style={{ color: "rgba(192,132,252,0.7)" }}
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
      className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider"
      style={{ color: ACCENT_SOFT }}
    >
      <MousePointerClick className="w-3.5 h-3.5" />
      {children}
    </span>
  );
}

/* Tahmin et → tıkla göster kartı */
function Reveal({
  question,
  tone = "neutral",
  children,
}: {
  question: ReactNode;
  tone?: "neutral" | "good" | "bad";
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const openCls =
    tone === "good" ? "uyz-flag-good" : tone === "bad" ? "uyz-flag-bad" : "uyz-card-violet";
  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      aria-expanded={open}
      className={`${open ? openCls : "uyz-card uyz-tap"} w-full h-full text-left rounded-xl p-5 transition-all cursor-pointer`}
    >
      <span className="block text-base font-semibold text-white leading-snug">{question}</span>
      {open ? (
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="block mt-3 text-sm text-gray-200 leading-relaxed"
        >
          {children}
        </motion.span>
      ) : (
        <span className="block mt-3">
          <TapHint>cevap için tıkla</TapHint>
        </span>
      )}
    </button>
  );
}

/* Mini sınav — şıkka tıkla: doğru yeşil, yanlış kırmızı, tek cümle açıklama */
type QuizItem = { q: string; options: string[]; correct: number; why: string };

function Quiz({ items, cols = 2 }: { items: QuizItem[]; cols?: 2 | 3 }) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const item = items[idx];
  const answered = picked !== null;
  const last = idx === items.length - 1;
  return (
    <div className="max-w-4xl mx-auto uyz-card rounded-2xl p-6">
      {items.length > 1 && (
        <div className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-2">
          Soru {idx + 1} / {items.length}
        </div>
      )}
      <div className="text-xl md:text-2xl font-semibold text-white leading-snug mb-4">{item.q}</div>
      <div className={`grid grid-cols-1 gap-3 ${cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
        {item.options.map((o, i) => {
          const isCorrect = i === item.correct;
          const cls = !answered
            ? "uyz-card uyz-tap cursor-pointer"
            : isCorrect
              ? "uyz-flag-good"
              : i === picked
                ? "uyz-flag-bad"
                : "uyz-card opacity-40";
          return (
            <button
              key={o}
              type="button"
              disabled={answered}
              onClick={() => setPicked(i)}
              className={`${cls} rounded-xl px-4 py-3 text-left text-base text-white flex items-center gap-3 transition-all`}
            >
              <span className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-xs font-mono shrink-0">
                {answered && isCorrect ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : answered && i === picked ? (
                  <X className="w-4 h-4 text-red-400" />
                ) : (
                  String.fromCharCode(65 + i)
                )}
              </span>
              <span className="leading-snug">{o}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 min-h-[52px] flex items-center justify-between gap-4">
        {answered ? (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-gray-200 leading-relaxed"
          >
            <span
              className={`font-semibold ${picked === item.correct ? "text-emerald-400" : "text-red-400"}`}
            >
              {picked === item.correct ? "Doğru. " : "Doğrusu yeşil olan. "}
            </span>
            {item.why}
          </motion.p>
        ) : (
          <TapHint>sınıfa sor, sonra bir şıkka tıkla</TapHint>
        )}
        {answered && (
          <button
            type="button"
            className="uyz-btn shrink-0"
            onClick={() => {
              setIdx(last ? 0 : idx + 1);
              setPicked(null);
            }}
          >
            {last ? (
              <>
                <RotateCcw className="w-4 h-4" /> Baştan
              </>
            ) : (
              <>
                Sonraki soru <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

/* Adım adım ilerleyen şema — "İleri" ile adımlar tek tek açılır */
type Step = { icon: LucideIcon; title: string; desc: string };

function Stepper({ steps }: { steps: Step[] }) {
  const [shown, setShown] = useState(1);
  const done = shown >= steps.length;
  return (
    <div className="max-w-4xl mx-auto">
      <div
        className={`grid grid-cols-1 gap-3 ${steps.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}
      >
        {steps.map((s, i) => {
          const visible = i < shown;
          return (
            <div
              key={s.title}
              className={`rounded-xl p-4 min-h-[160px] transition-all ${
                visible ? "uyz-card-violet" : "uyz-card opacity-40"
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono text-white"
                  style={{ background: visible ? ACCENT : "rgba(255,255,255,0.08)" }}
                >
                  {i + 1}
                </span>
                {visible && <s.icon className="w-5 h-5" style={{ color: ACCENT_SOFT }} />}
              </div>
              {visible ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-base font-semibold text-white mb-1.5 leading-snug">{s.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{s.desc}</p>
                </motion.div>
              ) : (
                <div className="text-3xl font-mono text-gray-600">?</div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          className="uyz-btn"
          onClick={() => setShown(done ? 1 : shown + 1)}
        >
          {done ? (
            <>
              <RotateCcw className="w-4 h-4" /> Baştan
            </>
          ) : (
            <>
              İleri: {shown + 1}. adım <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/* Numaralı kısa kart — özet ve etkinlik slaytlarında */
function NumCard({ n, title, desc, delay = 0 }: { n: number; title: string; desc: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className="uyz-card rounded-xl p-5"
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-mono font-bold text-white mb-3"
        style={{ background: ACCENT }}
      >
        {n}
      </div>
      <h3 className="text-base font-semibold text-white mb-1.5 leading-snug">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

/* ============================================================
   HAFTAYA ÖZEL BİLEŞENLER
   ============================================================ */

/* Oyna-gör: istem parçalarını aç/kapa, istem metni ve temsilî çizim değişsin */
const PARTS = [
  { id: "stil", label: "Stil", text: "suluboya tarzında" },
  { id: "isik", label: "Işık", text: "gün batımı ışığında" },
  { id: "kadraj", label: "Kadraj", text: "yakın çekim" },
  { id: "oran", label: "Oran", text: "yatay (16:9)" },
] as const;

type PartId = (typeof PARTS)[number]["id"];

function PromptBuilder() {
  const [on, setOn] = useState<Record<PartId, boolean>>({
    stil: false,
    isik: false,
    kadraj: false,
    oran: false,
  });
  const toggle = (id: PartId) => setOn((p) => ({ ...p, [id]: !p[id] }));
  const tea = on.stil ? "#fca5a5" : "#b45309";
  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="uyz-chip uyz-chip-on" style={{ cursor: "default" }}>
            <Check className="w-4 h-4" /> Konu
          </span>
          {PARTS.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={on[p.id]}
              onClick={() => toggle(p.id)}
              className={`uyz-chip ${on[p.id] ? "uyz-chip-on" : ""}`}
            >
              {on[p.id] ? <Check className="w-4 h-4" /> : <span className="w-4 text-center">+</span>}
              {p.label}
            </button>
          ))}
        </div>
        <div
          className="rounded-lg p-4 font-mono text-sm leading-relaxed min-h-[112px]"
          style={{ background: "#0d0314", border: "1px solid rgba(168,85,247,0.2)" }}
        >
          <span style={{ color: ACCENT_SOFT }}>&gt; </span>
          <span className="text-white">masada ince belli bardakta çay</span>
          {PARTS.filter((p) => on[p.id]).map((p) => (
            <span key={p.id} style={{ color: ACCENT_SOFT }}>
              , {p.text}
            </span>
          ))}
        </div>
        <div className="mt-3">
          <TapHint>parçalara tıkla, resmi izle</TapHint>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-center h-[236px]">
          <motion.div
            animate={{ width: on.oran ? 400 : 230, height: on.oran ? 225 : 230 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-xl overflow-hidden"
            style={{
              background: on.isik
                ? "linear-gradient(180deg, #fb923c 0%, #f472b6 60%, #7c2d12 100%)"
                : "linear-gradient(180deg, #3f3f46 0%, #27272a 100%)",
              border: "1px solid rgba(168,85,247,0.4)",
            }}
          >
            <div
              className="absolute left-0 right-0 bottom-0 h-[18%]"
              style={{ background: on.isik ? "#7c2d12" : "#52525b" }}
            />
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" aria-hidden="true">
              <defs>
                <filter id="uyz-suluboya">
                  <feGaussianBlur stdDeviation="1.8" />
                </filter>
              </defs>
              <g
                transform={on.kadraj ? "translate(100 125) scale(1.7) translate(-100 -125)" : undefined}
                filter={on.stil ? "url(#uyz-suluboya)" : undefined}
                opacity={on.stil ? 0.85 : 1}
              >
                {on.isik && <circle cx="158" cy="62" r="20" fill="#fde68a" />}
                <ellipse cx="100" cy="166" rx="36" ry="7" fill={on.stil ? "#c4b5fd" : "#e5e7eb"} />
                <path
                  d="M82 82 Q76 110 88 124 Q98 138 86 162 L114 162 Q102 138 112 124 Q124 110 118 82 Z"
                  fill={tea}
                  stroke={on.stil ? "none" : "#f5f5f4"}
                  strokeWidth="2"
                />
                <path d="M82 82 L118 82" stroke="#f5f5f4" strokeWidth="2" />
              </g>
            </svg>
          </motion.div>
        </div>
        <div className="mt-2 text-center text-[11px] text-gray-500">
          Temsilî çizim; gerçek bir aracın çıktısı değildir.
        </div>
      </div>
    </div>
  );
}

/* Oyna-gör: fotoğraf türünü seç, soru ve örnek cevabı gör */
const PHOTO_CASES = [
  {
    id: "tablo",
    label: "Tablo fotoğrafı",
    lines: ["Ali ...... 70", "Elif ..... 85", "Can ...... 60"],
    lineCls: "font-mono not-italic",
    ask: "Bu tabloda en yüksek notu kim almış?",
    answer: "En yüksek not 85 ile Elif’te. Tabloda üç kişi var: Ali 70, Elif 85, Can 60.",
    check: "Rakamları tabloyla karşılaştır; benzer rakamlar karışabilir.",
  },
  {
    id: "elyazisi",
    label: "El yazısı not",
    lines: ["Perşembe 15.20", "Amfi 1", "sunum taslağını getir"],
    lineCls: "font-serif italic",
    ask: "Bu notu yazıya çevir.",
    answer: "“Perşembe 15.20, Amfi 1. Sunum taslağını getir.”",
    check: "Okunaksız kelimeyi tahmin eder; isim ve saatlere tekrar bak.",
  },
  {
    id: "etiket",
    label: "Ürün etiketi",
    lines: ["İÇİNDEKİLER", "buğday unu, şeker,", "bitkisel yağ, tuz"],
    lineCls: "font-sans not-italic uppercase tracking-wide",
    ask: "Bu etikette ne yazıyor, sade anlat.",
    answer: "İçinde buğday unu, şeker, bitkisel yağ ve tuz var. Buğday unu olduğu için gluten içerir.",
    check: "Alerji ya da sağlık söz konusuysa etiketi kendin de oku.",
  },
] as const;

function PhotoAsk() {
  const [sel, setSel] = useState(0);
  const c = PHOTO_CASES[sel];
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {PHOTO_CASES.map((p, i) => (
          <button
            key={p.id}
            type="button"
            aria-pressed={i === sel}
            onClick={() => setSel(i)}
            className={`uyz-chip ${i === sel ? "uyz-chip-on" : ""}`}
          >
            <Camera className="w-4 h-4" />
            {p.label}
          </button>
        ))}
        <span className="ml-2">
          <TapHint>fotoğraf seç</TapHint>
        </span>
      </div>
      <motion.div
        key={c.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-5 items-center"
      >
        <div
          className="rounded-lg p-4 h-[150px] flex flex-col justify-center gap-1.5 text-sm text-zinc-800"
          style={{ background: "#f5f5f4", transform: "rotate(-2deg)", boxShadow: "0 12px 30px rgba(0,0,0,0.5)" }}
        >
          {c.lines.map((l) => (
            <div key={l} className={c.lineCls}>
              {l}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="flex justify-end">
            <div className="uyz-bubble-user px-4 py-2.5 text-sm max-w-[85%]">{c.ask}</div>
          </div>
          <div className="flex justify-start">
            <div className="uyz-bubble-ai px-4 py-2.5 text-sm max-w-[90%]">
              <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">
                Örnek cevap (temsilî)
              </div>
              {c.answer}
            </div>
          </div>
          <div className="uyz-flag-bad rounded-lg px-4 py-2 text-sm text-gray-200 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span>
              <span className="font-semibold text-white">Kontrol et:</span> {c.check}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ============================================================
   SINAV VE OYUN VERİLERİ
   ============================================================ */

const TOOL_TYPES = [
  "Görsel üreten araç",
  "Fotoğrafı okuyan asistan",
  "Ses ve müzik aracı",
  "Video aracı",
  "Sunum aracı",
];

const QUIZ_ISTEM: QuizItem[] = [
  {
    q: "Kantin için afiş görseli istiyorsun. Hangi istem en iyi sonucu verir?",
    options: [
      "Güzel bir afiş yap",
      "Kantin afişi, çok güzel olsun",
      "Tost ve çay olan kantin afişi, çizgi film tarzı, canlı renkler, dikey",
    ],
    correct: 2,
    why: "Konu, stil ve oran belli; araç tahmin yürütmek zorunda kalmaz.",
  },
];

const QUIZ_ARAC: QuizItem[] = [
  {
    q: "Kantin için indirim afişine bir resim lazım.",
    options: TOOL_TYPES,
    correct: 0,
    why: "Resim üretmek görsel aracının işi: ChatGPT, Gemini, Canva gibi.",
  },
  {
    q: "Tahtadaki notun fotoğrafını yazıya çevirmek istiyorsun.",
    options: TOOL_TYPES,
    correct: 1,
    why: "Fotoğrafı sohbet asistanına yükleyip “yazıya çevir” demen yeter.",
  },
  {
    q: "Hazırladığın videoya anlatıcı sesi eklemek istiyorsun.",
    options: TOOL_TYPES,
    correct: 2,
    why: "Yazıyı sese çeviren araçlar bunun için var; örnek: ElevenLabs.",
  },
  {
    q: "Ürün tanıtımı için birkaç saniyelik hareketli bir klip lazım.",
    options: TOOL_TYPES,
    correct: 3,
    why: "Hareketli görüntü video aracının işi: Sora, Veo, Runway, Kling gibi.",
  },
  {
    q: "Yarınki ödev sunumunun ilk taslağını çıkarmak istiyorsun.",
    options: TOOL_TYPES,
    correct: 4,
    why: "Gamma ya da Canva konudan slayt taslağı çıkarır; içeriği sen düzeltirsin.",
  },
];

const QUIZ_SON: QuizItem[] = [
  {
    q: "Görsel isteminde “gün batımı ışığında” sözü hangi parçadır?",
    options: ["Konu", "Stil", "Işık", "Oran"],
    correct: 2,
    why: "Sahnenin nasıl aydınlandığını söyler; resmin havasını değiştirir.",
  },
  {
    q: "Asistan, not fotoğrafını yazıya çevirdi. Sıradaki işin ne?",
    options: [
      "Hemen arkadaşlara göndermek",
      "Rakam ve isimleri asıl notla karşılaştırmak",
      "Fotoğrafı silmek",
      "Aynı fotoğrafı tekrar yüklemek",
    ],
    correct: 1,
    why: "YZ yazıyı yanlış okuyabilir; en çok rakam ve özel isimlerde hata yapar.",
  },
  {
    q: "Kusursuz görünen, şaşırtıcı bir fotoğraf gördün. İlk neye bakarsın?",
    options: [
      "Beğeni sayısına",
      "Fotoğrafın renklerine",
      "Kaynağına: kim, nerede paylaşmış?",
      "Yorumlara",
    ],
    correct: 2,
    why: "Yeni araçlar hata bırakmıyor; en sağlam ipucu görselin kaynağıdır.",
  },
];

const VIDEO_STEPS: Step[] = [
  {
    icon: PenLine,
    title: "Sahneyi yaz",
    desc: "Ne oluyor, nerede, kamera nasıl hareket ediyor?",
  },
  {
    icon: Clapperboard,
    title: "Araç klibi üretir",
    desc: "Çoğu zaman birkaç saniyelik kısa bir klip çıkar; biraz beklersin.",
  },
  {
    icon: RefreshCw,
    title: "Tarifi düzelt",
    desc: "İlk klip taslaktır. Olmayan yeri söyle, yeniden üret.",
  },
  {
    icon: Scissors,
    title: "Klipleri birleştir",
    desc: "Uzun video, kısa kliplerin arka arkaya eklenmesiyle olur.",
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
        <Eyebrow>BVA 1203 · 11. Hafta</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.04]"
        >
          <span className="uyz-shimmer">Görsel, Ses ve Video</span>
          <br />
          <span className="uyz-shimmer">Üreten Araçlar</span>
        </motion.h1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Geçen hafta yazıyla istedik, yazı aldık. Bu hafta yazıyla isteyip resim, ses ve video alıyoruz.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto text-left">
          <FeatureCard
            icon={ImageIcon}
            title="Görsel"
            desc="Tarif et, araç çizsin. Fotoğraf yükle, araç okusun."
            delay={0.4}
            accent="#a855f7"
          />
          <FeatureCard
            icon={Mic}
            title="Ses ve müzik"
            desc="Yazıyı seslendir, kısa bir şarkı üret, sesli sohbet et."
            delay={0.55}
            accent="#ec4899"
          />
          <FeatureCard
            icon={Video}
            title="Video ve sunum"
            desc="Kısa klip ve sunum taslağı dakikalar içinde hazır."
            delay={0.7}
            accent="#3b82f6"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-6 text-[11px] font-mono text-gray-600 uppercase tracking-widest"
        >
          Müfredat konusu: Görüntüden metne, metinden görüntüye · Per 15:20 – 17:00 · Amfi 1
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  2 · KÖPRÜ + EL KALDIR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 10. haftadan 11. haftaya</Eyebrow>
      <H2>Geçen hafta yazı yazdırdık, bu hafta resim</H2>
      <Sub className="mt-3 max-w-3xl">
        İyi istem (prompt) yazmayı öğrendik. Aynı beceri görsel, ses ve videoda da işe yarar. Önce
        el kaldıralım.
      </Sub>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Reveal question="Kaçınız YZ ile bir görsel üretti?">
          Ürettiysen bugün daha iyisini üreteceksin. Üretmediysen dersin sonunda ilkini üretmiş
          olacaksın.
        </Reveal>
        <Reveal question="Kaçınız bir fotoğraf çekip YZ’ye soru sordu?">
          Tablo, el yazısı, etiket: asistanlar fotoğrafı okuyabiliyor. Birazdan deneyeceğiz.
        </Reveal>
        <Reveal question="Kaçınız YZ sesiyle anlatılan bir video izledi?">
          Büyük olasılıkla çoğunuz. Kısa videolardaki anlatıcı sesleri sık sık YZ ile üretiliyor.
        </Reveal>
      </div>
      <AskLine>Kartlardaki soruları sırayla sor, elleri say, sonra karta tıkla.</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  3 · BENZETME  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Benzetme · ressama sipariş</Eyebrow>
      <H2>Görsel üretmek, ressama sipariş vermektir</H2>
      <Sub className="mt-3 max-w-3xl">
        Ressam aklını okuyamaz. &ldquo;Güzel bir resim yap&rdquo; dersen kafasına göre çizer.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={PenLine}
          title="Sen tarif edersin"
          desc="Ne olsun, nasıl görünsün? Bu tarife görsel istemi diyoruz."
          delay={0.15}
        />
        <FeatureCard
          icon={Palette}
          title="Araç çizer"
          desc="Tarifine uyan yeni bir resim üretir. Hazır bir resmi bulup getirmez."
          delay={0.3}
          accent="#ec4899"
        />
        <FeatureCard
          icon={RefreshCw}
          title="Beğenmezsen düzeltirsin"
          desc="İlk sonuç taslaktır. Tarifi değiştir, yeniden iste."
          delay={0.45}
          accent="#3b82f6"
        />
      </div>
      <AskLine>Bir ressama yalnızca &ldquo;güzel bir resim yap&rdquo; desen sence ne çizer?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  4 · GÖRSEL ARAÇLARI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Araçlar · görsel üretimi</Eyebrow>
      <H2>Görsel araçları üç yerde karşına çıkar</H2>
      <Sub className="mt-3 max-w-3xl">
        Hepsinin mantığı aynı: tarifi yaz, görseli al. Ücretsiz planlarda günlük sınır olur.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={MessageSquare}
          title="Sohbet asistanının içinde"
          desc="ChatGPT ve Gemini: sohbet ederken “şunu çiz” demen yeter. Başlamak için en kolayı."
          delay={0.15}
        />
        <FeatureCard
          icon={Wand2}
          title="Görsele özel araçlar"
          desc="Midjourney, Ideogram, Leonardo: yalnızca görsel üretir. Ideogram görsele yazı eklemede iyidir."
          delay={0.3}
          accent="#ec4899"
        />
        <FeatureCard
          icon={LayoutTemplate}
          title="Tasarım programının içinde"
          desc="Canva ve Adobe Firefly: afiş ya da gönderi hazırlarken görseli orada üretirsin."
          delay={0.45}
          accent="#3b82f6"
        />
      </div>
      <AskLine>Bu araçlardan hangisi şu an telefonunda var?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  5 · İSTEM KURUCU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Oyna-gör · istem kurucu</Eyebrow>
      <H2>Görsel istemi beş parçadan oluşur</H2>
      <Sub className="mt-3 mb-6 max-w-3xl">
        Konu + stil + ışık + kadraj (ne kadar yakından) + oran (yatay mı dikey mi).
      </Sub>
      <PromptBuilder />
      <AskLine>Hangi parçayı eklemek resmi en çok değiştirdi?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  6 · MİNİ SINAV  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Mini sınav · iyi istem</Eyebrow>
      <H2 className="mb-6">Hangi istem daha iyi afiş çıkarır?</H2>
      <Quiz items={QUIZ_ISTEM} cols={3} />
      <AskLine>Tıklamadan önce: hangi şık, neden?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  7 · GÖRSELİ ANLAYAN YZ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Oyna-gör · fotoğraf yükle, sor</Eyebrow>
      <H2>YZ fotoğrafa bakıp soruna cevap verir</H2>
      <Sub className="mt-3 mb-5 max-w-3xl">
        Sohbet asistanına fotoğraf yükle, altına sorunu yaz. Çizmenin tersi: bu kez o okuyor.
      </Sub>
      <PhotoAsk />
      <AskLine>En son neyin fotoğrafını çektin? YZ&apos;ye onunla ilgili ne sorardın?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  8 · SES VE MÜZİK  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Araçlar · ses ve müzik</Eyebrow>
      <H2>Yazıdan ses ve müzik de üretilir</H2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <FeatureCard
          icon={Mic}
          title="Seslendirme"
          desc="Yazdığın metni insan sesi gibi okur. Örnek araç: ElevenLabs."
          delay={0.15}
        />
        <FeatureCard
          icon={Music}
          title="Müzik"
          desc="“Hareketli bir doğum günü şarkısı” yazarsın, kısa bir şarkı çıkar. Örnek araç: Suno."
          delay={0.3}
          accent="#ec4899"
        />
        <FeatureCard
          icon={MessageSquare}
          title="Sesli sohbet"
          desc="Asistanla yazmadan, konuşarak sohbet edersin. Dil pratiği için işe yarar."
          delay={0.45}
          accent="#3b82f6"
        />
      </div>
      <div className="max-w-4xl mx-auto mt-4">
        <Reveal question="Tahmin et: Birinin sesini taklit etmek için saatlerce kayıt gerekir mi?" tone="bad">
          Hayır. Kısa bir ses kaydı bile yetebiliyor. Bu yüzden başkasının sesini izinsiz
          kullanmak ciddi bir sorun; gelecek hafta bunu konuşacağız.
        </Reveal>
      </div>
      <AskLine>Karta tıklamadan önce sınıfın tahminini al.</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  9 · VİDEO  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Adım adım · video</Eyebrow>
      <H2>Video araçları kısa klip üretir</H2>
      <Sub className="mt-3 mb-5 max-w-3xl">
        Sora, Veo, Runway, Kling: sahneyi yazarsın, klip gelir. Ücretsiz kullanım çoğunda çok
        sınırlıdır.
      </Sub>
      <Stepper steps={VIDEO_STEPS} />
      <AskLine>Bu yolla neyin tanıtım videosunu yapmak isterdin?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  10 · SUNUM VE TASARIM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Araçlar · sunum ve tasarım</Eyebrow>
      <H2>Sunumun ilk taslağını YZ çıkarır</H2>
      <Sub className="mt-3 max-w-3xl">
        Boş sayfayla başlamak zordur. Araç taslağı verir, işi sen bitirirsin.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={LayoutTemplate}
          title="Gamma"
          desc="Konuyu yazarsın, başlıkları ve slaytları olan bir sunum taslağı çıkarır."
          delay={0.15}
        />
        <FeatureCard
          icon={Palette}
          title="Canva"
          desc="Hazır şablon seçersin; metni ve görseli içindeki YZ ile üretirsin."
          delay={0.3}
          accent="#ec4899"
        />
        <FeatureCard
          icon={Search}
          title="Senin işin"
          desc="Bilgileri kontrol et, fazlalığı at, kendi cümlelerinle düzelt."
          delay={0.45}
          accent="#22c55e"
        />
      </div>
      <AskLine>YZ&apos;nin hazırladığı sunumu hiç değiştirmeden sunar mısın? Neden?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  11 · HANGİ ARAÇ? OYUNU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Oyun · hangi iş için hangi araç?</Eyebrow>
      <H2 className="mb-6">İşe göre doğru araç türünü seç</H2>
      <Quiz items={QUIZ_ARAC} cols={3} />
      <AskLine>Her görevde önce sınıf karar versin, sonra tıkla.</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  12 · GERÇEK Mİ, YZ Mİ?  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Tahmin et · gerçek mi, YZ mi?</Eyebrow>
      <H2>Sahte görselde önce kaynağa bak</H2>
      <Sub className="mt-3 max-w-3xl">
        Üç fotoğraf tarifi. Her biri için karar ver: gerçek mi, YZ üretimi mi?
      </Sub>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Reveal question="Düğün fotoğrafı: gelinin elinde altı parmak, arkadaki tabelada anlamsız harfler." tone="bad">
          Şüpheli. El ve yazı hataları YZ görsellerinde sık görülen ipuçlarıdır.
        </Reveal>
        <Reveal question="Ünlü bir futbolcunun olay fotoğrafı: yalnızca adı duyulmamış bir hesapta var." tone="bad">
          Şüpheli. Görüntü düzgün olsa da kaynağı yok. Hiçbir haber sitesinde yoksa inanma.
        </Reveal>
        <Reveal question="Bir manzara fotoğrafı: ne kadar bakarsan bak hiçbir hata göremiyorsun.">
          Bilemezsin. Yeni araçlar hata bırakmıyor. Gözüne değil kaynağa güven.
        </Reveal>
      </div>
      <AskLine>Her kart için: gerçek diyenler, YZ diyenler el kaldırsın.</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  13 · SINIFTA DENEYELİM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sınıfta deneyelim · 10 dakika · telefonla</Eyebrow>
      <H2>10 dakikada bir afiş görseli üret</H2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <NumCard
          n={1}
          title="Asistanı aç"
          desc="ChatGPT ya da Gemini. Hesabın yoksa yanındakiyle çalış."
          delay={0.1}
        />
        <NumCard
          n={2}
          title="Beş parçalı istem yaz"
          desc="Konu: MYO bahar şenliği afişi. Stil, ışık, kadraj ve oranı sen seç."
          delay={0.2}
        />
        <NumCard
          n={3}
          title="Üret ve karşılaştır"
          desc="Sonucu yanındakine göster. Kimin görseli tarifine daha çok uydu?"
          delay={0.3}
        />
        <NumCard
          n={4}
          title="Tek parçayı değiştir"
          desc="Yalnızca stili değiştir, yeniden üret. Ne değişti?"
          delay={0.4}
        />
      </div>
      <div className="mt-5 uyz-card rounded-lg px-4 py-3 text-sm text-gray-400 flex items-center gap-3">
        <Smartphone className="w-4 h-4 shrink-0" style={{ color: ACCENT_SOFT }} />
        <span>
          Ücretsiz planda günlük görsel sınırı olabilir. Sınırın dolduysa istemini yaz, arkadaşının
          telefonunda dene.
        </span>
      </div>
      <AskLine>Kimin görseli tarifine en çok benzedi? İstemini okusun.</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  14 · KENDİNİ DENE  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kendini dene · 3 soru</Eyebrow>
      <H2 className="mb-6">Bugünden aklında ne kaldı?</H2>
      <Quiz items={QUIZ_SON} />
    </SlideShell>
  ),

  /* ─────────────────  15 · AKLINDA KALSIN + KÖPRÜ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>11. hafta özeti</Eyebrow>
      <H2>
        <span className="uyz-shimmer">Aklında kalsın: 3 şey</span>
      </H2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <NumCard
          n={1}
          title="Net tarif, isabetli görsel"
          desc="Konu, stil, ışık, kadraj, oran. Parça ekledikçe sonuç istediğine yaklaşır."
          delay={0.1}
        />
        <NumCard
          n={2}
          title="İşe göre araç seç"
          desc="Görsel, ses, video, sunum: her işin aracı ayrı. İlk sonuç her zaman taslaktır."
          delay={0.2}
        />
        <NumCard
          n={3}
          title="Göze değil kaynağa güven"
          desc="YZ fotoğrafı yanlış okuyabilir, sahte görsel gerçek gibi durabilir. Kontrol et."
          delay={0.3}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-6 uyz-card rounded-lg px-5 py-4 text-base text-gray-300 flex items-center gap-3"
      >
        <Sparkles className="w-5 h-5 shrink-0" style={{ color: ACCENT_SOFT }} />
        <span>
          <span className="text-white font-semibold">Gelecek hafta:</span> Bu araçlar kandırmak için
          de kullanılabiliyor. YZ&apos;yi güvenli ve dürüst kullanmayı konuşacağız.
        </span>
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
          BVA 1203 · 11. Hafta · Görsel, Ses ve Video Üreten Araçlar
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
