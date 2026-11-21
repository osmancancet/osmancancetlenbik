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
  X,
  RotateCcw,
  MousePointerClick,
  Hand,
  ArrowRight,
  ThumbsDown,
  ThumbsUp,
  CircleHelp,
  ListOrdered,
  Quote,
  Eye,
  ListChecks,
  ShieldCheck,
  FileText,
  Mail,
  Languages,
  Briefcase,
  GraduationCap,
  Sparkles,
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
   10. HAFTA BİLEŞENLERİ
   ============================================================ */

/* Slayt 2 — el kaldır oylaması */
const POLL = [
  {
    q: "Kaçınız asistandan “işe yaramaz” bir cevap aldı?",
    note: "Çoğu zaman sorun asistanda değil, soruda. Bugün soruyu düzeltmeyi öğreniyoruz.",
  },
  {
    q: "Kaçınız isteğini tek cümleyle yazıp gönderiyor?",
    note: "Asistan seni tanımıyor. Durumunu sen anlatmazsan boşlukları tahminle doldurur.",
  },
  {
    q: "Kaçınız ilk cevabı beğenmeyince sohbeti kapattı?",
    note: "İlk cevap taslaktır. “Şurayı değiştir” demek çoğu zaman yeter.",
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

/* Slayt 4 — kötü istem / iyi istem düğmesi */
const COMPARE = {
  bad: {
    prompt: "Bana büyük veriyi anlat.",
    answer: [
      "Büyük veri; hacim, hız ve çeşitlilik bakımından geleneksel yöntemlerle işlenmesi güç olan veri kümelerini ifade eden bir kavramdır. Kavramın kökeni dağıtık sistemler alanındaki gelişmelere dayanmakta olup… (uzun bir yazı böyle devam eder)",
    ],
    verdict: "Yanlış değil, ama uzun ve ağır. Kime yazdığını bilmediği için ansiklopedi gibi yazdı.",
  },
  good: {
    prompt:
      "Liseyi yeni bitirmiş birine büyük veriyi market alışverişi örneğiyle, 3 kısa maddede anlat.",
    answer: [
      "1. Markette her fiş bir kayıttır; yüzlerce mağazada her gün milyonlarca fiş birikir.",
      "2. Bu kadar kaydı tek bir bilgisayar ya da Excel dosyası taşıyamaz; buna büyük veri denir.",
      "3. Market bu kayıtlara bakarak hangi ürünü ne zaman rafa koyacağına karar verir.",
    ],
    verdict: "Kime (okuyucu), nasıl (örnek) ve ne kadar (3 madde) olduğunu söyledik; cevap ona göre geldi.",
  },
};

function BadGoodToggle() {
  const [mode, setMode] = useState<"bad" | "good">("bad");
  const c = COMPARE[mode];
  const color = mode === "bad" ? RED : GREEN;
  return (
    <div className="max-w-4xl mx-auto mt-5">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setMode("bad")}
          className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-base font-semibold cursor-pointer transition-all"
          style={{
            border: `1px solid ${mode === "bad" ? RED : "rgba(255,255,255,0.18)"}`,
            background: mode === "bad" ? "rgba(248,113,113,0.16)" : "transparent",
            color: mode === "bad" ? "#ffffff" : "#9ca3af",
          }}
        >
          <ThumbsDown className="w-4 h-4" /> Kötü istem
        </button>
        <button
          type="button"
          onClick={() => setMode("good")}
          className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-base font-semibold cursor-pointer transition-all"
          style={{
            border: `1px solid ${mode === "good" ? GREEN : "rgba(255,255,255,0.18)"}`,
            background: mode === "good" ? "rgba(74,222,128,0.16)" : "transparent",
            color: mode === "good" ? "#ffffff" : "#9ca3af",
          }}
        >
          <ThumbsUp className="w-4 h-4" /> İyi istem
        </button>
        <TapHint>Düğmeye tıkla, cevabı izle</TapHint>
      </div>

      <motion.div
        key={mode}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mt-4 min-h-[250px]"
      >
        <div className="flex justify-end">
          <div className="uyz-bubble-user px-5 py-3 text-base max-w-2xl">{c.prompt}</div>
        </div>
        <div className="flex justify-start mt-3">
          <div className="uyz-bubble-ai px-5 py-3 text-base max-w-2xl">
            <div className="text-[11px] font-mono uppercase tracking-widest text-gray-500 mb-1">
              Örnek cevap (temsilî)
            </div>
            {c.answer.map((line) => (
              <div key={line} className="leading-relaxed">
                {line}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 text-base" style={{ color }}>
          {c.verdict}
        </div>
      </motion.div>
    </div>
  );
}

/* Formülün parçaları — slayt 5 (tanıtım) ve slayt 6 (istem kurucu) ortak kullanır */
type PartId = "rol" | "baglam" | "gorev" | "bicim" | "ornek" | "kisit";

const PARTS: Array<{
  id: PartId;
  name: string;
  ask: string;
  what: string;
  text: string;
  color: string;
}> = [
  {
    id: "rol",
    name: "Rol",
    ask: "Kim gibi cevap versin?",
    what: "Asistana bir kimlik verirsin; üslubu ve bakış açısı ona göre değişir.",
    text: "Deneyimli bir insan kaynakları uzmanı gibi davran.",
    color: "#c084fc",
  },
  {
    id: "baglam",
    name: "Bağlam",
    ask: "Durum ne, ben kimim?",
    what: "Asistan seni tanımıyor. Kim olduğunu ve durumu yazmazsan boşlukları tahminle doldurur.",
    text: "Büyük Veri Analistliği 1. sınıf öğrencisiyim. Manisa’da bir firmada yaz stajı arıyorum. Excel ve temel Python biliyorum.",
    color: "#60a5fa",
  },
  {
    id: "gorev",
    name: "Görev",
    ask: "Tam olarak ne yapsın?",
    what: "Tek ve net bir iş söyle: yaz, özetle, çevir, karşılaştır, sınav yap.",
    text: "Staj başvurusu için bir e-posta yaz.",
    color: "#e5e7eb",
  },
  {
    id: "bicim",
    name: "Biçim",
    ask: "Cevap nasıl görünsün?",
    what: "Uzunluk, madde sayısı, tablo, başlık: istediğin şekli söylersen o şekilde gelir.",
    text: "Konu satırı olsun; tek kısa paragraf yaz.",
    color: GREEN,
  },
  {
    id: "ornek",
    name: "Örnek",
    ask: "Neye benzesin?",
    what: "Tarif etmek yerine göster: beğendiğin bir cümleyi ya da eski bir metni yapıştır.",
    text: "Üslup şuna benzesin: “Merhaba, iyi çalışmalar dilerim.”",
    color: "#f472b6",
  },
  {
    id: "kisit",
    name: "Kısıt",
    ask: "Ne yapmasın?",
    what: "İstemediğin şeyi de yaz: uzun cümle, abartı, uydurma bilgi.",
    text: "Abartılı övgü kullanma; bilmediğin bilgiyi uydurma.",
    color: AMBER,
  },
];

/* Slayt 5 — parçaya tıkla, anlamını gör */
function FormulaParts() {
  const [sel, setSel] = useState<number | null>(null);
  const p = sel === null ? null : PARTS[sel];
  return (
    <div className="max-w-4xl mx-auto mt-6">
      <div className="flex flex-wrap items-center gap-2">
        {PARTS.map((part, i) => (
          <div key={part.id} className="flex items-center gap-2">
            {i > 0 && <span className="text-2xl text-gray-600">+</span>}
            <button
              type="button"
              onClick={() => setSel(sel === i ? null : i)}
              className="rounded-xl px-5 py-3 text-xl font-bold cursor-pointer transition-all"
              style={{
                color: part.color,
                border: `2px solid ${sel === i ? part.color : `${part.color}55`}`,
                background: sel === i ? `${part.color}26` : `${part.color}0d`,
              }}
            >
              {part.name}
            </button>
          </div>
        ))}
      </div>
      <div className="mt-5 min-h-[190px]">
        {p ? (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="uyz-card rounded-xl p-6"
            style={{ borderColor: `${p.color}66` }}
          >
            <div className="text-2xl font-semibold" style={{ color: p.color }}>
              {p.ask}
            </div>
            <div className="text-lg text-gray-300 mt-2">{p.what}</div>
            <div className="mt-4 text-base text-white">
              <span className="text-xs font-mono uppercase tracking-widest text-gray-500 mr-2">
                Örnek cümle
              </span>
              {p.text}
            </div>
          </motion.div>
        ) : (
          <div className="uyz-card rounded-xl p-6 flex flex-col gap-2">
            <TapHint>Bir parçaya tıkla</TapHint>
            <div className="text-lg text-gray-400">
              Her parça asistanın bir sorusuna cevap verir. Hepsini her seferinde yazmak
              zorunda değilsin; ama cevap kötüyse eksik parçaya bak.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* Slayt 6 — İSTEM KURUCU: parçaları aç/kapa, örnek cevabın iyileşmesini izle */
type BuilderState = Record<PartId, boolean>;

const BUILDER_OFF: BuilderState = {
  rol: false,
  baglam: false,
  gorev: true,
  bicim: false,
  ornek: false,
  kisit: false,
};
const BUILDER_ON: BuilderState = {
  rol: true,
  baglam: true,
  gorev: true,
  bicim: true,
  ornek: true,
  kisit: true,
};

const VERDICTS = [
  "Herkese gönderilebilecek, boşluklu bir kalıp. Asistan seni tanımıyor.",
  "Bir parça eklendi; cevap kıpırdadı ama hâlâ genel.",
  "Gelişiyor. Eksik parçalara bak: hangi satır hâlâ zayıf?",
  "İyi bir taslak olmaya başladı.",
  "Neredeyse hazır; bir parça daha var.",
  "Gönderilmeye yakın bir taslak. Yine de oku, adını yaz, düzelt.",
];

type OutLine = { text: string; from?: PartId; weak?: boolean };

function buildAnswer(on: BuilderState): OutLine[] {
  const lines: OutLine[] = [];
  if (on.bicim) lines.push({ text: "Konu: Yaz stajı başvurusu", from: "bicim" });
  lines.push(
    on.ornek
      ? { text: "Merhaba, iyi çalışmalar dilerim.", from: "ornek" }
      : { text: "Sayın Yetkili," }
  );
  lines.push(
    on.baglam
      ? {
          text: "Büyük Veri Analistliği 1. sınıf öğrencisiyim; bu yaz firmanızın veri biriminde staj yapmak istiyorum. Excel ve temel Python biliyorum.",
          from: "baglam",
        }
      : {
          text: "Ben [bölüm] öğrencisiyim ve [şirket adı] bünyesinde staj yapmak istiyorum. Çalışkan ve öğrenmeye açık biriyim.",
          weak: true,
        }
  );
  if (!on.kisit) {
    lines.push({
      text: "Şirketinizin sektördeki öncü konumu ve eşsiz vizyonu beni her zaman derinden etkilemiştir.",
      weak: true,
    });
  }
  if (on.rol) {
    lines.push({
      text: "Staj boyunca veri temizleme ve raporlama işlerinde ekibinize destek olabilirim.",
      from: "rol",
    });
  }
  lines.push(
    on.bicim
      ? { text: "Uygun görürseniz özgeçmişimi iletebilirim.", from: "bicim" }
      : {
          text: "Başvurumun tarafınızca değerlendirilmesini rica eder, şimdiden çok teşekkür eder, çalışmalarınızda başarılar dilerim.",
          weak: true,
        }
  );
  lines.push({ text: "Saygılarımla, [Ad Soyad]" });
  return lines;
}

function PromptBuilder() {
  const [on, setOn] = useState<BuilderState>(BUILDER_OFF);
  const score = PARTS.filter((p) => p.id !== "gorev" && on[p.id]).length;
  const answer = buildAnswer(on);
  const colorOf = (id: PartId) => PARTS.find((p) => p.id === id)?.color ?? "#e5e7eb";

  return (
    <div className="max-w-4xl mx-auto mt-4">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {PARTS.map((p) => {
          const locked = p.id === "gorev";
          const active = on[p.id];
          return (
            <button
              key={p.id}
              type="button"
              disabled={locked}
              onClick={() => setOn({ ...on, [p.id]: !active })}
              className="rounded-xl px-2 py-2 text-center cursor-pointer disabled:cursor-default transition-all"
              style={{
                border: `2px solid ${active ? p.color : "rgba(255,255,255,0.14)"}`,
                background: active ? `${p.color}22` : "rgba(255,255,255,0.03)",
              }}
            >
              <div
                className="text-lg font-bold leading-tight"
                style={{ color: active ? p.color : "#6b7280" }}
              >
                {p.name}
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-gray-500">
                {locked ? "hep açık" : active ? "açık" : "kapalı · tıkla"}
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        <div className="uyz-card rounded-xl p-4 min-h-[290px]">
          <div className="text-[11px] font-mono uppercase tracking-widest text-gray-500 mb-2">
            Senin istemin
          </div>
          <div className="space-y-1.5">
            {PARTS.filter((p) => on[p.id]).map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="text-[13px] leading-snug"
                style={{ color: p.color }}
              >
                <span className="font-mono text-[10px] uppercase tracking-wider opacity-70 mr-1.5">
                  {p.name}
                </span>
                {p.text}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="uyz-bubble-ai p-4 min-h-[290px]">
          <div className="text-[11px] font-mono uppercase tracking-widest text-gray-500 mb-2">
            Örnek cevap (temsilî)
          </div>
          <div className="space-y-1.5">
            {answer.map((l) => (
              <motion.div
                key={l.text}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="text-[13px] leading-snug ps-2"
                style={{
                  borderInlineStart: `3px solid ${
                    l.from ? colorOf(l.from) : l.weak ? "rgba(248,113,113,0.6)" : "transparent"
                  }`,
                  color: l.weak ? "#9ca3af" : "#f3f4f6",
                  fontStyle: l.weak ? "italic" : "normal",
                }}
              >
                {l.text}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-4">
        <div className="flex items-center gap-1.5 shrink-0">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="w-3.5 h-3.5 rounded-full transition-all"
              style={{ background: i < score ? ACCENT : "rgba(255,255,255,0.12)" }}
            />
          ))}
        </div>
        <div className="flex-1 text-sm text-gray-300">{VERDICTS[score]}</div>
        <ActionButton onClick={() => setOn(BUILDER_ON)}>
          <Sparkles className="w-4 h-4" /> Hepsini aç
        </ActionButton>
        <ActionButton ghost onClick={() => setOn(BUILDER_OFF)}>
          <RotateCcw className="w-4 h-4" /> Sıfırla
        </ActionButton>
      </div>
    </div>
  );
}

/* Slayt 8 — yineleme: üç turluk sohbet */
const TURNS = [
  {
    you: "Arkadaşlarıma sunum için davet mesajı yaz.",
    ai: "Değerli arkadaşlar, perşembe günü gerçekleştireceğimiz sunuma katılımınızı önemle rica ederiz. Sunumda büyük veri kavramı ele alınacaktır.",
    note: "İlk cevap: doğru ama fazla resmî. Sohbeti kapatma, ne istediğini söyle.",
  },
  {
    you: "Çok resmî oldu. WhatsApp grubuna yazar gibi, samimi yaz.",
    ai: "Selam millet! Perşembe günü sunumumuz var, konu büyük veri. Gelirseniz çok seviniriz, sorularınızı da bekliyoruz.",
    note: "Üslup düzeldi. Şimdi eksik bilgiyi ekletelim.",
  },
  {
    you: "Güzel. Saat 14.00 ve Amfi 1 bilgisini ekle, iki cümleyi geçmesin.",
    ai: "Selam millet! Perşembe 14.00’te Amfi 1’de büyük veri sunumumuz var. Gelin, sorularınızı da getirin!",
    note: "Üç turda istediğimiz mesaja ulaştık. Baştan yazmadık, yalnız düzelttirdik.",
  },
];

function IterationChat() {
  const [turn, setTurn] = useState(0);
  const t = TURNS[turn];
  return (
    <div className="max-w-4xl mx-auto mt-5">
      <div className="flex items-center gap-2 mb-3">
        {TURNS.map((x, i) => (
          <span
            key={x.you}
            className="h-1.5 rounded-full transition-all"
            style={{
              width: i === turn ? 40 : 20,
              background: i <= turn ? ACCENT : "rgba(255,255,255,0.12)",
            }}
          />
        ))}
        <span className="text-xs font-mono text-gray-500 ml-2">
          Tur {turn + 1} / {TURNS.length}
        </span>
      </div>
      <motion.div
        key={turn}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="min-h-[200px]"
      >
        <div className="flex justify-end">
          <div className="uyz-bubble-user px-5 py-3 text-base max-w-2xl">{t.you}</div>
        </div>
        <div className="flex justify-start mt-3">
          <div className="uyz-bubble-ai px-5 py-3 text-base max-w-2xl">
            <div className="text-[11px] font-mono uppercase tracking-widest text-gray-500 mb-1">
              Örnek cevap (temsilî)
            </div>
            {t.ai}
          </div>
        </div>
        <div className="mt-3 text-base" style={{ color: ACCENT_SOFT }}>
          {t.note}
        </div>
      </motion.div>
      <div className="mt-3 flex items-center gap-4">
        {turn < TURNS.length - 1 ? (
          <ActionButton onClick={() => setTurn(turn + 1)}>
            Sonraki tur <ArrowRight className="w-4 h-4" />
          </ActionButton>
        ) : (
          <ActionButton ghost onClick={() => setTurn(0)}>
            <RotateCcw className="w-4 h-4" /> Baştan
          </ActionButton>
        )}
        {turn === 0 && <TapHint>Önce sınıf söylesin: ne eksik?</TapHint>}
      </div>
    </div>
  );
}

/* Slayt 9 — üç teknik */
const TECHNIQUES: Array<{ icon: LucideIcon; name: string; when: string; say: string; color: string }> = [
  {
    icon: CircleHelp,
    name: "Bana soru sor",
    when: "Ne yazacağını bilmediğinde: eksik bilgiyi asistan senden ister.",
    say: "“Başlamadan önce bilmen gerekenleri bana sor.”",
    color: "#60a5fa",
  },
  {
    icon: ListOrdered,
    name: "Adım adım düşün",
    when: "Hesap, plan ve karar işlerinde: acele etmez, hata azalır.",
    say: "“Önce adım adım düşün, sonra cevabı ver.”",
    color: "#c084fc",
  },
  {
    icon: Quote,
    name: "Örnek ver",
    when: "Üslubu tarif edemediğinde: bir iki örnek göster, benzerini yazsın.",
    say: "“Şu iki örnekteki gibi yaz: …”",
    color: "#f472b6",
  },
];

function TechniqueCards() {
  const [open, setOpen] = useState<boolean[]>([false, false, false]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-6">
      {TECHNIQUES.map((t, i) => (
        <button
          key={t.name}
          type="button"
          onClick={() => setOpen(open.map((v, j) => (j === i ? !v : v)))}
          className="uyz-card uyz-card-hover rounded-xl p-5 text-left cursor-pointer transition-all min-h-[230px] flex flex-col"
        >
          <div
            className="w-11 h-11 rounded-lg flex items-center justify-center mb-3"
            style={{ background: `${t.color}1f`, border: `1px solid ${t.color}55` }}
          >
            <t.icon className="w-5 h-5" style={{ color: t.color }} />
          </div>
          <div className="text-xl font-semibold text-white">{t.name}</div>
          <div className="text-sm text-gray-400 leading-relaxed mt-1">{t.when}</div>
          <div className="mt-3">
            {open[i] ? (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-base font-medium"
                style={{ color: t.color }}
              >
                {t.say}
              </motion.div>
            ) : (
              <TapHint>İsteme ne eklerdin? Tıkla</TapHint>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}

/* Slayt 10 — günlük işler için şablonlar */
const TEMPLATES: Array<{ icon: LucideIcon; name: string; text: string; tip: string }> = [
  {
    icon: FileText,
    name: "Özet",
    text: "Aşağıdaki metni [lise öğrencisi] için [5 madde] hâlinde özetle. Önemli isim ve tarihleri koru. Metin: [buraya yapıştır]",
    tip: "Kime ve kaç madde olduğunu söylemezsen özet de uzun gelir.",
  },
  {
    icon: Mail,
    name: "E-posta · dilekçe",
    text: "[Öğrenci işlerine] resmî bir dilekçe yaz. Durum: [mazeret sınavına girmek istiyorum, raporum var]. Kısa ve saygılı olsun; bilmediğin yeri boş bırak.",
    tip: "Adını, numaranı ve tarihi sonradan kendin eklersin.",
  },
  {
    icon: Languages,
    name: "Çeviri",
    text: "Bu metni [İngilizceye] çevir. Okuyacak kişi: [staj başvurumu değerlendiren yönetici]. Resmî ama doğal olsun. Metin: [buraya yapıştır]",
    tip: "Okuyanı söylersen kelime kelime değil, anlamı çevirir.",
  },
  {
    icon: Briefcase,
    name: "CV · ön yazı",
    text: "Bir işe alım uzmanı gibi davran. Aşağıdaki bilgilerimle [veri analisti stajı] için ön yazı taslağı yaz. Yalnız verdiğim bilgileri kullan. Bilgilerim: [buraya yaz]",
    tip: "“Yalnız verdiğim bilgileri kullan” demezsen sana olmayan beceri ekleyebilir.",
  },
  {
    icon: GraduationCap,
    name: "Ders çalışma",
    text: "[Veri tabanı] dersindeki [birincil anahtar] konusunu hiç bilmeyen birine anlatır gibi anlat. Sonra bana 5 soruluk sınav yap; cevaplarımı tek tek kontrol et.",
    tip: "Önce anlattır, sonra kendini sınat: konuyu gerçekten öğrenmenin yolu.",
  },
];

function TemplatePicker() {
  const [sel, setSel] = useState(0);
  const t = TEMPLATES[sel];
  const pieces = t.text.split(/(\[[^\]]+\])/);
  return (
    <div className="max-w-4xl mx-auto mt-5">
      <div className="flex flex-wrap gap-2">
        {TEMPLATES.map((x, i) => (
          <button
            key={x.name}
            type="button"
            onClick={() => setSel(i)}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-base font-semibold cursor-pointer transition-all"
            style={{
              border: `1px solid ${i === sel ? ACCENT : "rgba(255,255,255,0.16)"}`,
              background: i === sel ? "rgba(168,85,247,0.22)" : "rgba(255,255,255,0.03)",
              color: i === sel ? "#ffffff" : "#9ca3af",
            }}
          >
            <x.icon className="w-4 h-4" />
            {x.name}
          </button>
        ))}
      </div>
      <motion.div
        key={sel}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="uyz-card-violet rounded-xl p-6 mt-4 min-h-[190px]"
      >
        <div className="text-[11px] font-mono uppercase tracking-widest text-gray-500 mb-2">
          Şablon · köşeli parantezleri kendine göre doldur
        </div>
        <div className="text-xl text-white leading-relaxed">
          {pieces.map((piece, i) =>
            piece.startsWith("[") ? (
              <span key={i} className="font-semibold" style={{ color: AMBER }}>
                {piece}
              </span>
            ) : (
              <span key={i}>{piece}</span>
            )
          )}
        </div>
        <div className="text-base text-gray-400 mt-3">{t.tip}</div>
      </motion.div>
      <div className="mt-2">
        <TapHint>İşi seç, şablon değişsin</TapHint>
      </div>
    </div>
  );
}

/* Slayt 12 — bu cümle formülün hangi parçası? */
const CLASSIFY: Array<{ text: string; answer: string }> = [
  { text: "Cevabı tablo hâlinde ver.", answer: "Biçim" },
  { text: "Bir lise öğretmeni gibi anlat.", answer: "Rol" },
  { text: "Yarın veri tabanı sınavım var ve konuyu hiç çalışmadım.", answer: "Bağlam" },
  { text: "Sorular şuna benzesin: “Birincil anahtar nedir?”", answer: "Örnek" },
  { text: "Bana 5 soruluk bir deneme sınavı hazırla.", answer: "Görev" },
];
const CLASSIFY_OPTIONS = ["Rol", "Bağlam", "Görev", "Biçim", "Örnek"];

function ClassifyGame() {
  const [idx, setIdx] = useState(0);
  const [wrong, setWrong] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const item = CLASSIFY[idx];
  const isLast = idx === CLASSIFY.length - 1;

  function pick(opt: string) {
    if (solved) return;
    if (opt === item.answer) setSolved(true);
    else if (!wrong.includes(opt)) setWrong([...wrong, opt]);
  }

  function go(to: number) {
    setIdx(to);
    setWrong([]);
    setSolved(false);
  }

  return (
    <div className="max-w-4xl mx-auto mt-5">
      <div className="text-xs font-mono text-gray-500 mb-2">
        Cümle {idx + 1} / {CLASSIFY.length}
      </div>
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="uyz-card-violet rounded-xl px-6 py-6 text-2xl md:text-3xl text-white text-center min-h-[120px] flex items-center justify-center"
      >
        {item.text}
      </motion.div>
      <div className="grid grid-cols-5 gap-3 mt-4">
        {CLASSIFY_OPTIONS.map((opt) => {
          const ok = solved && opt === item.answer;
          const bad = wrong.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              disabled={solved || bad}
              onClick={() => pick(opt)}
              className="rounded-xl py-3.5 text-xl font-bold cursor-pointer disabled:cursor-default transition-all"
              style={{
                color: ok ? GREEN : bad ? RED : "#ffffff",
                border: `2px solid ${ok ? GREEN : bad ? RED : "rgba(168,85,247,0.35)"}`,
                background: ok
                  ? "rgba(74,222,128,0.14)"
                  : bad
                  ? "rgba(248,113,113,0.12)"
                  : "rgba(168,85,247,0.07)",
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
      <div className="mt-4 min-h-[48px] flex items-center gap-4">
        {solved ? (
          <>
            <p className="flex-1 text-base text-gray-300">
              <span className="font-semibold" style={{ color: GREEN }}>
                Doğru: {item.answer}.{" "}
              </span>
              {isLast && "Beş cümleyi alt alta yazarsan eksiksiz bir istem olur."}
            </p>
            {isLast ? (
              <ActionButton ghost onClick={() => go(0)}>
                <RotateCcw className="w-4 h-4" /> Baştan
              </ActionButton>
            ) : (
              <ActionButton onClick={() => go(idx + 1)}>
                Sonraki cümle <ArrowRight className="w-4 h-4" />
              </ActionButton>
            )}
          </>
        ) : wrong.length > 0 ? (
          <span className="text-base" style={{ color: RED }}>
            Bu değil, bir daha dene.
          </span>
        ) : (
          <TapHint>Sınıf söylesin, parçaya tıkla</TapHint>
        )}
      </div>
    </div>
  );
}

/* Sınavlar */
const MID_QUIZ: QuizItem[] = [
  {
    q: "Hangi istem daha işe yarar bir cevap getirir?",
    options: [
      "CV yaz.",
      "Çok güzel bir CV yaz lütfen.",
      "1. sınıf öğrencisiyim; staj için tek sayfalık CV taslağı yaz, başlıkları madde madde ver.",
      "CV, staj, acil.",
    ],
    correct: 2,
    why: "Kim olduğunu (bağlam), ne istediğini (görev) ve nasıl görüneceğini (biçim) söyleyen tek şık bu.",
  },
];

const END_QUIZ: QuizItem[] = [
  {
    q: "“Bana bir yazı yaz.” isteminin en büyük eksiği nedir?",
    options: [
      "Teşekkür edilmemiş",
      "Konu, okuyucu ve uzunluk belli değil",
      "İngilizce yazılmamış",
      "Çok kısa olduğu için asistan cevap vermez",
    ],
    correct: 1,
    why: "Bağlam ve görev belirsiz: ne hakkında, kime, ne kadar? Asistan bunları tahmin etmek zorunda kalır.",
  },
  {
    q: "“Cevabı 3 madde hâlinde ver.” cümlesi formülün hangi parçasıdır?",
    options: ["Rol", "Bağlam", "Biçim", "Örnek"],
    correct: 2,
    why: "Cevabın nasıl görüneceğini söylüyor: uzunluk, madde, tablo gibi istekler biçimdir.",
  },
  {
    q: "İlk cevap istediğin gibi olmadı. En doğru hamle hangisi?",
    options: [
      "Aynı istemi tekrar tekrar göndermek",
      "Sohbeti kapatıp vazgeçmek",
      "Neyi değiştirmesini istediğini söyleyip düzelttirmek",
      "Cevabı okumadan kullanmak",
    ],
    correct: 2,
    why: "İlk cevap taslaktır; “daha kısa”, “daha samimi”, “şunu ekle” diyerek birkaç turda iyileştirirsin.",
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
        <Eyebrow>BVA 1203 · 10. Hafta</Eyebrow>
        <H1>
          <span className="uyz-shimmer">İyi Prompt (İstem)</span>
          <br />
          <span className="uyz-shimmer">Nasıl Yazılır?</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Aynı asistan, aynı konu: soruyu iyi soran çok daha iyi cevap alır.
        </Sub>

        <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
          {PARTS.slice(0, 5).map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
              className="flex items-center gap-2"
            >
              {i > 0 && <span className="text-xl text-gray-600">+</span>}
              <span
                className="rounded-full px-5 py-2 text-base font-semibold"
                style={{
                  color: p.color,
                  border: `1px solid ${p.color}66`,
                  background: `${p.color}14`,
                }}
              >
                {p.name}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-8 text-sm text-gray-500"
        >
          Müfredat konusu: Metin üretimi ve doğal dil işleme (DDİ) uygulamaları
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
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
      <Eyebrow>Köprü · 9. haftadan 10. haftaya</Eyebrow>
      <H2 className={TITLE}>Asistanlarla tanıştık; şimdi onlara doğru soruyu soracağız</H2>
      <Sub className="mt-3 max-w-4xl">
        Geçen hafta aynı soruyu iki asistana sorduk. Bu hafta asistanı değil, soruyu
        değiştiriyoruz.
      </Sub>
      <HandPoll />
    </SlideShell>
  ),

  /* ─────────────────  3 · KANTİN BENZETMESİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Benzetme · kantin siparişi</Eyebrow>
      <H2 className={TITLE}>Kantinde &ldquo;bir şeyler ver&rdquo; dersen ne gelir?</H2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-7">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="uyz-card rounded-xl p-6"
          style={{ borderColor: "rgba(248,113,113,0.4)" }}
        >
          <div className="flex items-center gap-2 mb-3" style={{ color: RED }}>
            <ThumbsDown className="w-5 h-5" />
            <span className="text-sm font-mono uppercase tracking-widest">Belirsiz sipariş</span>
          </div>
          <div className="text-2xl text-white font-semibold">&ldquo;Bir şeyler ver.&rdquo;</div>
          <div className="text-base text-gray-400 mt-2">
            Ne gelirse o. Belki simit, belki sevmediğin bir şey. Kantinci suçlu değil.
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="uyz-card rounded-xl p-6"
          style={{ borderColor: "rgba(74,222,128,0.4)" }}
        >
          <div className="flex items-center gap-2 mb-3" style={{ color: GREEN }}>
            <ThumbsUp className="w-5 h-5" />
            <span className="text-sm font-mono uppercase tracking-widest">Net sipariş</span>
          </div>
          <div className="text-2xl text-white font-semibold">
            &ldquo;Kaşarlı tost, az pişmiş, yanında ayran.&rdquo;
          </div>
          <div className="text-base text-gray-400 mt-2">
            İstediğin gelir. Çünkü neyi, nasıl ve neyle istediğini söyledin.
          </div>
        </motion.div>
      </div>
      <Sub className="mt-6 max-w-4xl">
        Asistana yazdığın bu siparişe <strong className="text-white">istem</strong> (prompt:
        yapay zekâya verdiğin yazılı talimat) denir.
      </Sub>
      <AskLine>En son hangi isteğin yanlış anlaşıldı? Neyi söylememiştin?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  4 · KÖTÜ / İYİ İSTEM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Karşılaştır · aynı konu, iki istem</Eyebrow>
      <H2 className={TITLE}>İstem değişince cevap da değişir</H2>
      <BadGoodToggle />
      <AskLine>İyi istemde fazladan hangi üç şeyi söyledik?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  5 · FORMÜL  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kavram · istemin parçaları</Eyebrow>
      <H2 className={TITLE}>İyi istem beş parçadan oluşur, gerekirse bir kısıt eklenir</H2>
      <FormulaParts />
      <AskLine>Bu parçalardan hangisini bugüne kadar hiç yazmadın?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  6 · İSTEM KURUCU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>İstem kurucu · parçaları aç, cevabı izle</Eyebrow>
      <H2 className={TITLE}>Her parça cevabı biraz daha sana özel yapar</H2>
      <PromptBuilder />
      <AskLine>Hangi parçayı açınca cevap en çok değişti?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  7 · ARA SINAV  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Hızlı soru</Eyebrow>
      <H2 className={`${TITLE} mb-6`}>Buraya kadar anlaştık mı?</H2>
      <Quiz items={MID_QUIZ} />
    </SlideShell>
  ),

  /* ─────────────────  8 · YİNELEME  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Teknik · yineleme</Eyebrow>
      <H2 className={TITLE}>İlk cevap taslaktır: beğenmediysen ne istediğini söyle</H2>
      <IterationChat />
      <AskLine>Bu cevabı daha iyi yapmak için sen ne yazardın?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  9 · ÜÇ TEKNİK  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Teknik · üç küçük cümle</Eyebrow>
      <H2 className={TITLE}>İstemin sonuna eklenen üç cümle cevabı güçlendirir</H2>
      <TechniqueCards />
      <AskLine>Bu üçünden hangisini bu akşam bir ödevinde denersin?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  10 · ŞABLONLAR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Günlük işler · hazır şablonlar</Eyebrow>
      <H2 className={TITLE}>Her gün yaptığın metin işleri için hazır istemler</H2>
      <TemplatePicker />
      <AskLine>Bu hafta hangi işin için bunlardan birini kullanabilirsin?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  11 · KONTROL  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Dikkat · son okuma senin</Eyebrow>
      <H2 className={TITLE}>İyi istem bile kontrolün yerini tutmaz</H2>
      <Sub className="mt-3 max-w-4xl">
        Terzi ne kadar iyi olursa olsun provaya gidersin. Asistanın yazdığı metnin altında senin
        adın var.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-7">
        <FeatureCard
          icon={Eye}
          title="Oku, sonra gönder"
          desc="Köşeli parantezli boşluk, yanlış isim ya da sana ait olmayan bir beceri kalmış olabilir."
          delay={0.2}
        />
        <FeatureCard
          icon={ListChecks}
          title="İsim, sayı, tarih doğrula"
          desc="Geçen haftadan hatırla: asistan emin bir dille uydurabilir."
          delay={0.35}
          accent={AMBER}
        />
        <FeatureCard
          icon={ShieldCheck}
          title="Kişisel bilgini yazma"
          desc="T.C. kimlik numarası, şifre, sağlık bilgisi isteme girmez. Ayrıntısı 12. haftada."
          delay={0.5}
          accent="#60a5fa"
        />
      </div>
      <AskLine>Okumadan gönderip sonradan pişman olduğun bir mesaj oldu mu?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  12 · SINIFLANDIRMA OYUNU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Oyun · parçayı bul</Eyebrow>
      <H2 className={TITLE}>Bu cümle formülün hangi parçası?</H2>
      <ClassifyGame />
    </SlideShell>
  ),

  /* ─────────────────  13 · SINIFTA DENEYELİM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sınıfta deneyelim · 10 dakika · telefonla</Eyebrow>
      <H2 className={`${TITLE} mb-5`}>Aynı iş için kötü ve iyi istem yaz, cevapları kıyasla</H2>
      <Stepper
        steps={[
          {
            title: "Bir iş seç",
            body: "Özet, dilekçe, çeviri ya da ders çalışma: gerçekten ihtiyacın olan bir işi seç.",
          },
          {
            title: "Önce kötü istemi yaz",
            body: "Tek cümleyle iste (“dilekçe yaz” gibi). Cevabın ekran görüntüsünü al.",
          },
          {
            title: "Yeni sohbette iyi istemi yaz",
            body: "Rol + Bağlam + Görev + Biçim + Örnek. Ücretsiz plan yeter.",
          },
          {
            title: "Kıyasla ve bir tur düzelttir",
            body: "İki cevabı yan yana koy. Sonra “daha kısa” ya da “daha sade” diyerek bir tur daha iste.",
          },
        ]}
        doneNote="Süre başladı: 10 dakika."
      />
      <AskLine>Senin isteminde en çok fark yaratan parça hangisiydi?</AskLine>
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
            t: "Formülü hatırla",
            d: "Rol + Bağlam + Görev + Biçim + Örnek. Cevap kötüyse eksik parçaya bak.",
          },
          {
            t: "İlk cevap taslaktır",
            d: "Sohbeti kapatma; neyi değiştirmesini istediğini söyle, birkaç turda düzelttir.",
          },
          {
            t: "Son okuma senin",
            d: "Göndermeden önce oku, doğrula; kişisel bilgini isteme yazma.",
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
        <ChevronRight className="w-5 h-5 shrink-0" style={{ color: ACCENT_SOFT }} />
        Gelecek hafta: yazının ötesine geçiyoruz; görsel, ses ve video üreten araçlar.
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
          BVA 1203 · 10. Hafta · İyi İstem (Prompt) Yazmak
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
