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
  ShieldAlert,
  ShieldCheck,
  Lock,
  Scale,
  Search,
  Image as ImageIcon,
  Mic,
  Video,
  MessageSquare,
  Users,
  Copyright,
  GraduationCap,
  Smartphone,
  BookOpen,
  UserCheck,
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

/* Örnek sohbet: kendinden emin ama uydurma içeren cevap */
function HalluChat() {
  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-5 items-stretch">
      <div className="uyz-window-chrome">
        <div
          className="uyz-window-bar px-4 py-2 text-[11px] font-mono uppercase tracking-wider"
          style={{ color: ACCENT_SOFT }}
        >
          Örnek sohbet (temsilî)
        </div>
        <div className="p-4 flex flex-col gap-3" style={{ background: "#0a0414" }}>
          <div className="flex justify-end">
            <div className="uyz-bubble-user px-4 py-2.5 text-sm max-w-[85%]">
              Manisa&apos;nın tarihi hakkında iki kitap öner.
            </div>
          </div>
          <div className="flex justify-start">
            <div className="uyz-bubble-ai px-4 py-3 text-sm max-w-[92%] leading-relaxed">
              Elbette! İşte iki güvenilir kaynak:
              <br />
              1. &ldquo;Manisa Tarihi Üzerine Notlar&rdquo;, A. Yılmaz
              <br />
              2. &ldquo;Spil&apos;in Gölgesinde Bir Şehir&rdquo;, M. Kaya
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Reveal question="Tahmin et: Bu kitaplar gerçekten var mı?" tone="bad">
          Bu örnekte ikisi de uydurma. Adlar inandırıcı, cümle kendinden emin, ama böyle kitaplar
          yok. Buna halüsinasyon (uydurma) denir.
        </Reveal>
        <div className="uyz-card rounded-xl p-4 text-sm text-gray-300 leading-relaxed">
          <span className="text-white font-semibold">Neden olur?</span> Model bilgiyi bir yerden
          okumaz; sıradaki kelimeyi tahmin eder. Bilmediğinde de akıcı bir cümle kurar.
        </div>
      </div>
    </div>
  );
}

/* Oyna-gör: kimlikli istem ↔ temizlenmiş istem */
function CleanToggle() {
  const [clean, setClean] = useState(false);
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <button
          type="button"
          aria-pressed={!clean}
          onClick={() => setClean(false)}
          className={`uyz-chip ${!clean ? "uyz-chip-on" : ""}`}
        >
          <ShieldAlert className="w-4 h-4" /> Kimlikli istem
        </button>
        <button
          type="button"
          aria-pressed={clean}
          onClick={() => setClean(true)}
          className={`uyz-chip ${clean ? "uyz-chip-on" : ""}`}
        >
          <ShieldCheck className="w-4 h-4" /> Temizlenmiş istem
        </button>
        <span className="ml-2">
          <TapHint>ikisi arasında geç</TapHint>
        </span>
      </div>
      <motion.div
        key={clean ? "temiz" : "kimlikli"}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`${clean ? "uyz-flag-good" : "uyz-flag-bad"} rounded-xl p-5 min-h-[150px]`}
      >
        {clean ? (
          <>
            <p className="font-mono text-sm text-gray-100 leading-relaxed">
              Bir öğrencinin burs başvurusu için dilekçe yaz. Ad, T.C. kimlik no ve adres yerlerini{" "}
              <span className="text-emerald-300 font-semibold">[boş]</span> bırak; ben sonra
              dolduracağım.
            </p>
            <p className="mt-3 text-sm text-emerald-300">
              Aynı dilekçe çıkar. Kimlik bilgilerin sende kalır.
            </p>
          </>
        ) : (
          <>
            <p className="font-mono text-sm text-gray-100 leading-relaxed">
              Adım <span className="text-red-300 font-semibold">Ayşe Yılmaz</span>, T.C. kimlik
              numaram <span className="text-red-300 font-semibold">123 456 789 01</span>, adresim{" "}
              <span className="text-red-300 font-semibold">Lale Sokak No 5, Manisa</span>. Burs
              başvurusu için dilekçe yaz.
            </p>
            <p className="mt-3 text-sm text-red-300">
              Üç kişisel bilgi, artık başka bir şirketin bilgisayarında. (Bilgiler örnektir.)
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}

/* ============================================================
   SINAV VE OYUN VERİLERİ
   ============================================================ */

const YAZ_YAZMA = ["Yazarım", "Yazmam"];

const QUIZ_TELEFON: QuizItem[] = [
  {
    q: "Annenin sesiyle arayan biri ağlıyor: “Kaza yaptım, hemen şu hesaba para gönder.” Ne yaparsın?",
    options: [
      "Hemen parayı gönderirim",
      "Kapatır, annemi bildiğim numaradan kendim ararım",
      "Emin olsun diye kimlik bilgilerimi veririm",
      "Aynı numaraya mesaj atıp hesap numarasını isterim",
    ],
    correct: 1,
    why: "Ses taklit edilebilir. Acele ettiren aramada kapat ve bildiğin numaradan kendin ara.",
  },
];

const QUIZ_YAZAR_MISIN: QuizItem[] = [
  {
    q: "Anlamadığım ders konusunu açıklamasını isterim.",
    options: YAZ_YAZMA,
    correct: 0,
    why: "İçinde kişisel bilgi yok; rahatça yazabilirsin.",
  },
  {
    q: "T.C. kimlik numaramı ve ev adresimi yazıp dilekçe isterim.",
    options: YAZ_YAZMA,
    correct: 1,
    why: "Bu yerleri boş bıraktır, dilekçe gelince kendin doldur.",
  },
  {
    q: "Arkadaşımın tahlil sonucunun fotoğrafını yükleyip yorumlatırım.",
    options: YAZ_YAZMA,
    correct: 1,
    why: "Sağlık verisi, üstelik başkasının. İzni olmadan paylaşamazsın.",
  },
  {
    q: "Staj yaptığım şirketin müşteri listesini yükleyip düzenletirim.",
    options: YAZ_YAZMA,
    correct: 1,
    why: "Şirket belgesi şirkete aittir; izinsiz yüklemek başını derde sokar.",
  },
  {
    q: "Evdeki malzemeleri yazıp yemek tarifi isterim.",
    options: YAZ_YAZMA,
    correct: 0,
    why: "Kimseyi tanıtan bir bilgi yok; sorun değil.",
  },
];

const QUIZ_SON: QuizItem[] = [
  {
    q: "YZ sana bir kanun maddesi numarası verdi. Ne yaparsın?",
    options: [
      "Aynen ödeve yazarım",
      "Resmî kaynaktan kontrol ederim",
      "“Emin misin?” derim, evet derse yazarım",
      "Cümlesi düzgünse doğrudur, yazarım",
    ],
    correct: 1,
    why: "YZ madde numarası uydurabilir; “emin misin” sorusuna da yanlış cevap verebilir.",
  },
  {
    q: "Hangisini YZ’ye yazmak sakıncalıdır?",
    options: [
      "Ders konusuyla ilgili bir soru",
      "Arkadaşının T.C. kimlik numarası",
      "Bir yemek tarifi isteği",
      "Kendi yazdığın bir paragraf",
    ],
    correct: 1,
    why: "Kimlik numarası kişisel veridir, üstelik başkasına ait.",
  },
  {
    q: "YZ dedektörü “bu metni YZ yazmış” dedi. Bu ne demek?",
    options: [
      "Metni kesinlikle YZ yazmıştır",
      "Yalnızca bir tahmindir; tek başına kanıt olmaz",
      "Yazan kişi kopya çekmiştir",
      "Dedektörler hiç yanılmaz",
    ],
    correct: 1,
    why: "Dedektörler insan yazısına da YZ diyebilir; sonuçları kesin değildir.",
  },
];

const DOGRULA_STEPS: Step[] = [
  {
    icon: MessageSquare,
    title: "Kaynağını sor",
    desc: "“Bunu nereden biliyorsun?” de. Kaynak gösteremiyorsa şüphelen.",
  },
  {
    icon: Search,
    title: "Başka yerden bak",
    desc: "Resmî site, ders kitabı ya da güvendiğin bir haber kaynağı aynı şeyi söylüyor mu?",
  },
  {
    icon: UserCheck,
    title: "Önemliyse bilene sor",
    desc: "Sağlık, para ve hukuk konusunda son sözü doktor, hoca ya da uzman söyler.",
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
        <Eyebrow>BVA 1203 · 12. Hafta</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.04]"
        >
          <span className="uyz-shimmer">YZ&apos;yi Güvenli ve</span>
          <br />
          <span className="uyz-shimmer">Dürüst Kullanmak</span>
        </motion.h1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Araçları kullanmayı öğrendik. Bu hafta onlara ne kadar güveneceğimizi konuşuyoruz.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto text-left">
          <FeatureCard
            icon={Search}
            title="Doğrula"
            desc="YZ uydurabilir, görüntü ve ses sahte olabilir. Kontrol et."
            delay={0.4}
            accent="#a855f7"
          />
          <FeatureCard
            icon={Lock}
            title="Koru"
            desc="Kimlik, sağlık ve şirket bilgisi YZ'ye yazılmaz."
            delay={0.55}
            accent="#f59e0b"
          />
          <FeatureCard
            icon={Scale}
            title="Dürüst ol"
            desc="Ödevde YZ kullandıysan söyle. Başkasının emeğine saygı göster."
            delay={0.7}
            accent="#22c55e"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-6 text-[11px] font-mono text-gray-600 uppercase tracking-widest"
        >
          Müfredat konusu: Etik, güvenlik ve yanıltıcı içerikler · Per 15:20 – 17:00 · Amfi 1
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  2 · KÖPRÜ + EL KALDIR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 11. haftadan 12. haftaya</Eyebrow>
      <H2>Üretmeyi öğrendik; şimdi dikkatli kullanmayı</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta görsel, ses ve video ürettik. Aynı araçlar insanı kandırmak için de
        kullanılabilir. Bugün üç soru soracağız.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {[
          { icon: Search, q: "Bu cevap doğru mu?", accent: "#a855f7" },
          { icon: Lock, q: "Bunu YZ’ye yazmalı mıyım?", accent: "#f59e0b" },
          { icon: Scale, q: "Bu işi ben mi yaptım?", accent: "#22c55e" },
        ].map((c, i) => (
          <motion.div
            key={c.q}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
            className="uyz-card rounded-xl p-5 flex items-center gap-4"
          >
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `${c.accent}1f`, border: `1px solid ${c.accent}55` }}
            >
              <c.icon className="w-5 h-5" style={{ color: c.accent }} />
            </div>
            <h3 className="text-lg font-semibold text-white leading-snug">{c.q}</h3>
          </motion.div>
        ))}
      </div>
      <div className="max-w-4xl mx-auto mt-4">
        <Reveal question="El kaldır: Kaçınız YZ’nin yanlış bir şey söylediğini fark etti?">
          Fark edenler: nasıl anladınız? Hiç fark etmediysen büyük olasılıkla hiç kontrol
          etmedin. Bugünün ilk konusu bu.
        </Reveal>
      </div>
      <AskLine>Elleri say, bir iki kişiye &ldquo;ne yanlıştı?&rdquo; diye sor, sonra karta tıkla.</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  3 · HALÜSİNASYON  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Doğrula · halüsinasyon</Eyebrow>
      <H2>YZ emin konuşur ama bazen uydurur</H2>
      <Sub className="mt-3 mb-5 max-w-3xl">
        Yol sorduğun biri bilmediği hâlde &ldquo;bilmiyorum&rdquo; demeyip tarif eder ya; YZ de
        bunu yapar.
      </Sub>
      <HalluChat />
      <AskLine>Bu cevabın neresinden şüphelenirdin?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  4 · DOĞRULAMA ADIMLARI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Adım adım · doğrulama alışkanlığı</Eyebrow>
      <H2>Önemli bilgiyi üç adımda doğrula</H2>
      <Sub className="mt-3 mb-5 max-w-3xl">
        YZ en çok şunlarda yanılır: sayı, tarih, isim, kanun maddesi, kaynak adı.
      </Sub>
      <Stepper steps={DOGRULA_STEPS} />
      <AskLine>En son hangi bilgiyi kontrol etmeden birine anlattın ya da paylaştın?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  5 · DEEPFAKE  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Doğrula · deepfake</Eyebrow>
      <H2>Gördüğün ve duyduğun sahte olabilir</H2>
      <Sub className="mt-3 max-w-3xl">
        Deepfake (derin sahte): YZ ile üretilmiş, gerçek gibi duran sahte video, ses ya da
        fotoğraf.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={Video}
          title="Sahte video"
          desc="Tanınan biri, hiç söylemediği bir şeyi söylüyormuş gibi gösterilir."
          delay={0.15}
          accent="#ef4444"
        />
        <FeatureCard
          icon={Mic}
          title="Taklit ses"
          desc="Kısa bir ses kaydından kişinin sesi kopyalanır. Telefon dolandırıcılığında kullanılır."
          delay={0.3}
          accent="#f59e0b"
        />
        <FeatureCard
          icon={ImageIcon}
          title="Sahte fotoğraf"
          desc="Hiç yaşanmamış bir olayın fotoğrafı üretilir, haber gibi paylaşılır."
          delay={0.45}
          accent="#a855f7"
        />
      </div>
      <AskLine>Sahte olduğunu sonradan öğrendiğin bir video ya da fotoğraf oldu mu?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  6 · SENARYO SINAVI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Mini sınav · sahte ses araması</Eyebrow>
      <H2 className="mb-6">Telefonda annenin sesi para istiyor</H2>
      <Quiz items={QUIZ_TELEFON} />
      <AskLine>Tıklamadan önce: sen olsan ilk ne yapardın?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  7 · AİLE GÜVENLİK KELİMESİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Korunma · aile güvenlik kelimesi</Eyebrow>
      <H2>Aile güvenlik kelimesi sahte sesi bozar</H2>
      <Sub className="mt-3 max-w-3xl">
        Ailenin parolası gibi düşün: sesi taklit eden kişi bu kelimeyi bilemez.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <NumCard
          n={1}
          title="Ailece bir kelime seçin"
          desc="Yalnızca sizin bildiğiniz, tahmin edilmesi zor bir kelime."
          delay={0.1}
        />
        <NumCard
          n={2}
          title="Hiçbir yere yazmayın"
          desc="Mesajla gönderme, sosyal medyada paylaşma, YZ'ye yazma."
          delay={0.2}
        />
        <NumCard
          n={3}
          title="Acil aramada kelimeyi sorun"
          desc="Para ya da acil yardım isteyen kişi kelimeyi bilmiyorsa kapatın."
          delay={0.3}
        />
      </div>
      <AskLine>Bu akşam evde bu kelimeyi belirler misin?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  8 · BUNU YZ'YE YAZAR MISIN?  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Oyun · yazarım / yazmam</Eyebrow>
      <H2 className="mb-6">Bunu YZ&apos;ye yazar mısın?</H2>
      <Quiz items={QUIZ_YAZAR_MISIN} />
      <AskLine>Yazarım diyenler, yazmam diyenler el kaldırsın; sonra tıkla.</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  9 · KİMLİĞİ SİL, SORUNU YAZ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Oyna-gör · kişisel veri</Eyebrow>
      <H2>Kimliği sil, sorunu yaz</H2>
      <Sub className="mt-3 mb-5 max-w-3xl">
        KVKK (Kişisel Verilerin Korunması Kanunu), seni tanıtan bilgileri korur. Yazdığın her şey
        aracı yapan şirkete gider.
      </Sub>
      <CleanToggle />
      <AskLine>Temizlenmiş istemde hangi bilgiler eksildi? Dilekçe bundan zarar gördü mü?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  10 · TELİF  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Dürüst ol · telif</Eyebrow>
      <H2>YZ üretti diye her şey serbest değil</H2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <FeatureCard
          icon={Copyright}
          title="Kopyalatma"
          desc="Tanınan bir karakteri, marka logosunu ya da bir sanatçının tarzını aynen istemek sorun çıkarabilir."
          delay={0.15}
        />
        <FeatureCard
          icon={Users}
          title="Başkasının işini yükleme"
          desc="Bir başkasının fotoğrafını ya da yazısını izinsiz yükleyip değiştirtme."
          delay={0.3}
          accent="#f59e0b"
        />
        <FeatureCard
          icon={BookOpen}
          title="Para kazanacaksan oku"
          desc="Çıktıyı satacak ya da işte kullanacaksan aracın kullanım koşullarına bak."
          delay={0.45}
          accent="#22c55e"
        />
      </div>
      <div className="max-w-4xl mx-auto mt-4">
        <Reveal question="Tahmin et: YZ ile ürettiğin görselin sahibi kim?">
          Net bir cevap yok. Kurallar ülkeden ülkeye değişiyor ve hâlâ tartışılıyor. En güvenlisi:
          YZ ile ürettiğini açıkça söyle.
        </Reveal>
      </div>
      <AskLine>Karta tıklamadan önce sınıfın tahminini al: sen mi, araç mı, hiç kimse mi?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  11 · ÖNYARGI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Tahmin et · önyargı</Eyebrow>
      <H2>YZ okuduklarının aynasıdır</H2>
      <Sub className="mt-3 max-w-3xl">
        Hep aynı mahalleden haber alan biri gibi: ne gördüyse onu tekrar eder. Buna önyargı
        diyoruz.
      </Sub>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Reveal question="İstem: “Bir mühendis çiz.” Sence resimde kim var?">
          Çoğu zaman bir erkek. Çünkü modelin öğrendiği resimlerde mühendisler çoğunlukla erkekti.
        </Reveal>
        <Reveal question="İstem: “Bir hemşire çiz.” Peki bu kez?">
          Çoğu zaman bir kadın. Model dünyayı değil, gördüğü örnekleri yansıtır.
        </Reveal>
        <Reveal question="Peki sen ne yapabilirsin?" tone="good">
          İsteme açıkça yaz: &ldquo;kadın bir mühendis&rdquo;. Çıktıda hep aynı tip varsa sorgula.
        </Reveal>
      </div>
      <AskLine>Her kartta önce tahmin al. Bu durum iş başvurusunda kime zarar verir?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  12 · ÖDEVDE YZ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Dürüst ol · ödevde YZ</Eyebrow>
      <H2>Yardım almak başka, yaptırmak başka</H2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
        <Reveal question="Anlamadığım konuyu YZ’ye anlattırdım, ödevi kendim yazdım." tone="good">
          Uygun. YZ’yi öğrenmek için kullandın; iş senin.
        </Reveal>
        <Reveal question="Ödevi YZ’ye yazdırdım, adımı yazıp teslim ettim." tone="bad">
          Uygun değil. Başkasının yaptığı işi kendi işin gibi sunmak olur.
        </Reveal>
        <Reveal question="Kendi yazdığım metnin yazım hatalarını düzelttirdim." tone="good">
          Çoğu derste uygun. Yine de kullandığını belirt.
        </Reveal>
        <Reveal question="YZ’nin verdiği kaynakları kontrol etmeden kaynakçaya yazdım." tone="bad">
          Uygun değil. Kaynak uydurma olabilir; sorumlusu sen olursun.
        </Reveal>
      </div>
      <div className="max-w-4xl mx-auto mt-4 uyz-card rounded-lg px-4 py-3 text-sm text-gray-300 flex items-start gap-3">
        <GraduationCap className="w-5 h-5 shrink-0" style={{ color: ACCENT_SOFT }} />
        <span>
          <span className="text-white font-semibold">Örnek beyan:</span> &ldquo;Bu ödevde konuyu
          anlamak için YZ asistanı kullandım; metni kendim yazdım.&rdquo; Kural dersten derse
          değişir; emin değilsen hocana sor.
        </span>
      </div>
      <AskLine>Her durum için: uygun mu, değil mi? Karar verin, sonra tıkla.</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  13 · YZ DEDEKTÖRLERİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Tahmin et · YZ dedektörleri</Eyebrow>
      <H2>YZ dedektörleri kesin kanıt değildir</H2>
      <Sub className="mt-3 max-w-3xl">
        YZ dedektörü: bir metni YZ&apos;nin yazıp yazmadığını tahmin etmeye çalışan araç.
      </Sub>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Reveal question="Dedektör “bu metnin çoğunu YZ yazmış” dedi. Kesin mi?" tone="bad">
          Hayır, yalnızca bir tahmin. İnsanın yazdığına YZ diyebilir, YZ&apos;nin yazdığını da
          kaçırabilir.
        </Reveal>
        <Reveal question="Kendi yazdığın ödeve “YZ yazmış” denirse ne yaparsın?" tone="good">
          Taslaklarını ve notlarını göster, konuyu sözlü anlat. Çalışırken taslaklarını saklamak
          iyi bir alışkanlık.
        </Reveal>
      </div>
      <AskLine>Yalnızca dedektör sonucuna bakıp birini suçlamak adil olur mu?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  14 · SINIFTA DENEYELİM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sınıfta deneyelim · 10 dakika · telefonla</Eyebrow>
      <H2>YZ&apos;yi uydururken yakala</H2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <NumCard
          n={1}
          title="Bildiğin konuyu sor"
          desc="Mahallen, lisen ya da tuttuğun takım hakkında ayrıntılı bir soru sor."
          delay={0.1}
        />
        <NumCard
          n={2}
          title="Yanlışı ara"
          desc="Cevapta yanlış ya da uydurma bir ayrıntı var mı? Sen biliyorsun."
          delay={0.2}
        />
        <NumCard
          n={3}
          title="Kaynağını sor"
          desc="“Emin misin? Kaynağın ne?” diye yaz. Cevabı değişti mi?"
          delay={0.3}
        />
        <NumCard
          n={4}
          title="Yanındakine göster"
          desc="Bulduğun yanlışı anlat. Bulamadıysan daha ayrıntılı bir soru dene."
          delay={0.4}
        />
      </div>
      <div className="mt-5 uyz-card rounded-lg px-4 py-3 text-sm text-gray-400 flex items-center gap-3">
        <Smartphone className="w-4 h-4 shrink-0" style={{ color: ACCENT_SOFT }} />
        <span>
          Herhangi bir ücretsiz asistan olur. Soruna adını, adresini ya da başka kişisel bilgi
          yazma.
        </span>
      </div>
      <AskLine>Kim bir yanlış yakaladı? Asistan &ldquo;emin misin&rdquo; deyince ne dedi?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  15 · KENDİNİ DENE  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kendini dene · 3 soru</Eyebrow>
      <H2 className="mb-6">Bugünden aklında ne kaldı?</H2>
      <Quiz items={QUIZ_SON} />
    </SlideShell>
  ),

  /* ─────────────────  16 · AKLINDA KALSIN + KÖPRÜ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>12. hafta özeti</Eyebrow>
      <H2>
        <span className="uyz-shimmer">Aklında kalsın: 3 şey</span>
      </H2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <NumCard
          n={1}
          title="Önce doğrula"
          desc="YZ emin konuşur ama uydurabilir. Ses ve görüntü de sahte olabilir."
          delay={0.1}
        />
        <NumCard
          n={2}
          title="Kimliği sil, sorunu yaz"
          desc="Kimlik, sağlık ve şirket bilgisi YZ'ye yazılmaz."
          delay={0.2}
        />
        <NumCard
          n={3}
          title="Kullandıysan söyle"
          desc="YZ yardımcındır; işin sahibi ve sorumlusu sensin."
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
          <span className="text-white font-semibold">Gelecek hafta:</span> Model her şeyi bilmez.
          Ona kendi kaynağını (PDF, ders notu) verip nasıl çalıştıracağını göreceğiz.
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
          BVA 1203 · 12. Hafta · YZ’yi Güvenli ve Dürüst Kullanmak
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
