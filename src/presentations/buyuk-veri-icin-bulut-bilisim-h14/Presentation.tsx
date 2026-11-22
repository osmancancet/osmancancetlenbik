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
  MousePointerClick,
  RotateCcw,
  Brain,
  Mail,
  Database,
  GraduationCap,
  FlaskConical,
  Rocket,
  Flame,
  Wallet,
  Wrench,
  Sparkles,
  Smartphone,
  Wifi,
  Shield,
  ChefHat,
  Cloud,
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
        <div className="absolute inset-0 bvbb-grid-bg pointer-events-none" />
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
      className="inline-flex items-center gap-3 mb-6 text-xs font-mono uppercase tracking-[0.25em] text-[#60a5fa]"
    >
      <span className="w-8 h-px bg-[#60a5fa]" />
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
  accent = "#2563eb",
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
      className="bvbb-card bvbb-card-hover rounded-xl p-6 transition-all"
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

function SectionDivider({
  num,
  total,
  title,
  subtitle,
  bgGradient,
  shadow,
  icon,
}: {
  num: string;
  total: string;
  title: string;
  subtitle: string;
  bgGradient: string;
  shadow: string;
  icon: ReactNode;
}) {
  return (
    <SlideShell bgPattern={false}>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex w-32 h-32 rounded-3xl items-center justify-center mb-8 bvbb-pulse"
          style={{
            background: bgGradient,
            boxShadow: shadow,
          }}
        >
          {icon}
        </motion.div>
        <Eyebrow>
          Bölüm {num} / {total}
        </Eyebrow>
        <H1>{title}</H1>
        <Sub className="mt-6 max-w-2xl mx-auto">{subtitle}</Sub>
      </div>
    </SlideShell>
  );
}

/* ============================================================
   ETKİLEŞİM PARÇALARI
   ============================================================ */

const BTN =
  "inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base font-semibold text-white bg-[#2563eb] hover:bg-[#1d4ed8] transition-colors";

/* Tıklanabilir öğeler ortada kalsın: ekranın sol/sağ %12'si slayt geçişine ayrılmıştır */
function Stage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-4xl ${className}`}>{children}</div>;
}

/* Hocanın sınıfa yönelteceği tek soru */
function AskLine({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="mt-6 text-sm text-gray-500"
    >
      <span className="mr-2 font-mono text-[11px] uppercase tracking-widest text-[#60a5fa]/70">
        Sınıfa sor:
      </span>
      {children}
    </motion.div>
  );
}

function TapHint({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-[#60a5fa]">
      <MousePointerClick className="w-3.5 h-3.5" />
      {children}
    </span>
  );
}

/* Tahmin et → tıkla göster */
function Reveal({
  question,
  answer,
  hint = "Cevap için tıkla",
}: {
  question: ReactNode;
  answer: ReactNode;
  hint?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      className={`block w-full text-left rounded-xl p-5 transition-all ${
        open ? "bvbb-card-sky" : "bvbb-card bvbb-card-hover"
      }`}
    >
      <span className="block text-lg font-semibold text-white leading-snug">{question}</span>
      {open ? (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 block text-base text-gray-200 leading-relaxed"
        >
          {answer}
        </motion.span>
      ) : (
        <span className="mt-3 block">
          <TapHint>{hint}</TapHint>
        </span>
      )}
    </button>
  );
}

/* Mini sınav: şıkka tıkla, doğru yeşil / yanlış kırmızı, tek cümle açıklama */
type QuizItem = { q: string; options: string[]; correct: number; why: string };

function Quiz({ items, doneText }: { items: QuizItem[]; doneText?: string }) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const item = items[idx];
  const many = items.length > 1;

  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (i === item.correct) setScore((s) => s + 1);
  }
  function advance() {
    if (idx === items.length - 1) {
      setDone(true);
    } else {
      setIdx(idx + 1);
      setPicked(null);
    }
  }
  function restart() {
    setIdx(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bvbb-card-sky rounded-xl p-8 text-center"
      >
        <div className="text-5xl font-bold text-white">
          {score} / {items.length}
        </div>
        <div className="mt-3 text-lg text-gray-300">
          {doneText ?? "Yanlış yaptığın soruyu birlikte bir daha konuşalım."}
        </div>
        <button type="button" onClick={restart} className={`${BTN} mt-6`}>
          <RotateCcw className="w-4 h-4" />
          Baştan
        </button>
      </motion.div>
    );
  }

  return (
    <div>
      {many && (
        <div className="mb-3 font-mono text-xs uppercase tracking-widest text-gray-500">
          Soru {idx + 1} / {items.length}
        </div>
      )}
      <div className="text-xl md:text-2xl font-semibold text-white leading-snug">{item.q}</div>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
        {item.options.map((o, i) => {
          const right = picked !== null && i === item.correct;
          const wrong = picked === i && i !== item.correct;
          const color = right ? "#22c55e" : wrong ? "#ef4444" : "#2563eb";
          return (
            <button
              type="button"
              key={o}
              onClick={() => pick(i)}
              disabled={picked !== null}
              className="flex items-center gap-3 rounded-xl px-5 py-4 text-left text-base md:text-lg text-white transition-all disabled:cursor-default"
              style={{
                background: right || wrong ? `${color}26` : "rgba(37,99,235,0.07)",
                border: `2px solid ${right || wrong ? color : "rgba(37,99,235,0.3)"}`,
                opacity: picked !== null && !right && !wrong ? 0.45 : 1,
              }}
            >
              <span
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold"
                style={{ background: `${color}33`, color: right || wrong ? color : "#93c5fd" }}
              >
                {right ? <Check className="w-4 h-4" /> : wrong ? <X className="w-4 h-4" /> : "ABCD"[i]}
              </span>
              <span>{o}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 min-h-[84px]">
        {picked === null ? (
          <TapHint>Sınıf karar versin, sonra şıkka tıkla</TapHint>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-between gap-4"
          >
            <p className="max-w-2xl text-base text-gray-200 leading-relaxed">
              <span
                className="mr-2 font-semibold"
                style={{ color: picked === item.correct ? "#4ade80" : "#f87171" }}
              >
                {picked === item.correct ? "Doğru." : "Tam değil."}
              </span>
              {item.why}
            </p>
            {many && (
              <button type="button" onClick={advance} className={BTN}>
                {idx === items.length - 1 ? "Sonucu gör" : "Sonraki soru"}
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* Adım adım ilerleyen şema: "İleri" ile adımlar tek tek açılır */
type Step = { icon: LucideIcon; title: string; text: string; color: string };

function Stepper({ steps }: { steps: Step[] }) {
  const [shown, setShown] = useState(1);
  const all = shown >= steps.length;
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {steps.map((s, i) =>
          i < shown ? (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bvbb-card rounded-xl p-4 min-h-[170px]"
              style={{ borderColor: `${s.color}66` }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: `${s.color}22`, border: `1px solid ${s.color}66` }}
                >
                  <s.icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <span className="font-mono text-xs" style={{ color: s.color }}>
                  {i + 1}. adım
                </span>
              </div>
              <div className="text-lg font-semibold text-white">{s.title}</div>
              <div className="mt-1 text-sm text-gray-400 leading-relaxed">{s.text}</div>
            </motion.div>
          ) : (
            <div
              key={s.title}
              className="flex min-h-[170px] items-center justify-center rounded-xl border border-dashed border-white/10 text-4xl font-bold text-white/10"
            >
              {i + 1}
            </div>
          ),
        )}
      </div>
      <div className="mt-5 flex justify-center">
        <button type="button" onClick={() => setShown(all ? 1 : shown + 1)} className={BTN}>
          {all ? (
            <>
              <RotateCcw className="w-4 h-4" />
              Baştan
            </>
          ) : (
            <>
              İleri: {shown + 1}. adım
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/* Seçenek çipleri (oyna-gör slaytlarında) */
function Chips({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: number;
  onChange: (i: number) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {options.map((o, i) => (
        <button
          type="button"
          key={o}
          onClick={() => onChange(i)}
          className="rounded-full px-5 py-2.5 text-base font-semibold transition-all"
          style={{
            background: i === value ? "#2563eb" : "rgba(37,99,235,0.08)",
            border: `2px solid ${i === value ? "#60a5fa" : "rgba(37,99,235,0.3)"}`,
            color: i === value ? "#ffffff" : "#93c5fd",
          }}
        >
          {o}
        </button>
      ))}
      <TapHint>tıkla, değiştir</TapHint>
    </div>
  );
}

/* Sınıfta deneyelim: numaralı adımlar */
function TrySteps({ steps }: { steps: string[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {steps.map((s, i) => (
        <motion.div
          key={s}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + i * 0.1 }}
          className="bvbb-card rounded-xl p-4 flex items-start gap-3"
        >
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-sm font-bold text-white">
            {i + 1}
          </span>
          <span className="text-base text-gray-200 leading-relaxed">{s}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* Aklında kalsın: 3 şey */
function ThreeThings({ items }: { items: string[] }) {
  return (
    <div className="space-y-3">
      {items.map((t, i) => (
        <motion.div
          key={t}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 + i * 0.15 }}
          className="bvbb-card rounded-xl p-5 flex items-center gap-4"
        >
          <span className="text-4xl font-bold text-[#60a5fa]">{i + 1}</span>
          <span className="text-lg md:text-xl text-white leading-snug">{t}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* İki kartlı benzetme karşılaştırması */
function Versus({
  left,
  right,
}: {
  left: { icon: LucideIcon; tag: string; title: string; items: string[] };
  right: { icon: LucideIcon; tag: string; title: string; items: string[] };
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {[left, right].map((c, i) => (
        <motion.div
          key={c.title}
          initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 + i * 0.15 }}
          className={`${i === 0 ? "bvbb-card" : "bvbb-card-sky"} rounded-xl p-6`}
        >
          <div
            className="flex items-center gap-2 mb-2"
            style={{ color: i === 0 ? "#93c5fd" : "#67e8f9" }}
          >
            <c.icon className="w-5 h-5" />
            <span className="font-mono text-xs uppercase tracking-widest">{c.tag}</span>
          </div>
          <div className="text-xl font-semibold text-white mb-3">{c.title}</div>
          <ul className="space-y-2 text-base text-gray-300">
            {c.items.map((it) => (
              <li key={it} className="flex gap-2">
                <ChevronRight
                  className="w-4 h-4 mt-1 flex-shrink-0"
                  style={{ color: i === 0 ? "#2563eb" : "#06b6d4" }}
                />
                {it}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}

/* Kapak altındaki üç anahtar kelime */
function CoverChips({ items }: { items: { name: string; icon: LucideIcon; color: string }[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
    >
      {items.map((p) => (
        <div
          key={p.name}
          className="bvbb-card rounded-xl p-4 flex items-center gap-3"
          style={{ borderColor: `${p.color}55` }}
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: `${p.color}22`, border: `1px solid ${p.color}66` }}
          >
            <p.icon className="w-5 h-5" style={{ color: p.color }} />
          </div>
          <div className="text-left text-sm font-bold text-white">{p.name}</div>
        </div>
      ))}
    </motion.div>
  );
}

function CoverFooter() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.1 }}
      className="mt-10 text-[11px] font-mono text-gray-600"
    >
      Öğr. Gör. Osman Can Çetlenbik · MCBÜ Manisa Teknik Bilimler MYO · Büyük Veri Analistliği
    </motion.div>
  );
}

/* ============================================================
   14. HAFTAYA ÖZEL OYNA-GÖR BİLEŞENİ
   ============================================================ */

/* Spam filtresi: gösterilen örnek arttıkça yeni mesajlardaki tahmin düzelir */
function TrainPlay() {
  const [level, setLevel] = useState(0);
  const mesajlar = [
    { text: "Tebrikler! Bedava tatil kazandınız, hemen tıklayın", spam: true, guess: [true, true, true] },
    { text: "Yarınki sınav saat 10’da, B-204’te", spam: false, guess: [false, false, false] },
    { text: "Hesabınız kapatılacak, şifrenizi bu bağlantıdan girin", spam: true, guess: [false, true, true] },
    { text: "Kantinde bedava çay var, gelsene", spam: false, guess: [true, true, false] },
  ];
  const notlar = [
    "Az örnek gördü: “bedava” kelimesini ezberledi, şifre isteyen mesajı hiç tanımıyor.",
    "Daha çok örnek gördü: şifre tuzağını öğrendi ama arkadaş mesajına hâlâ takılıyor.",
    "Çok ve çeşitli örnek gördü: kelimeye değil mesajın bütününe bakıyor. Yine de gerçek hayatta ara sıra yanılır.",
  ];
  const dogru = mesajlar.filter((m) => m.guess[level] === m.spam).length;
  return (
    <Stage>
      <Chips options={["Az örnek göster", "Daha çok örnek", "Çok ve çeşitli örnek"]} value={level} onChange={setLevel} />
      <div className="mt-4 space-y-2">
        {mesajlar.map((m) => {
          const g = m.guess[level];
          const ok = g === m.spam;
          return (
            <div key={m.text} className="bvbb-card rounded-lg px-4 py-2.5 flex items-center gap-3">
              <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <span className="flex-1 text-base text-gray-200">{m.text}</span>
              <motion.span
                key={`${level}-${g}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold"
                style={{
                  background: ok ? "rgba(34,197,94,0.18)" : "rgba(239,68,68,0.18)",
                  color: ok ? "#4ade80" : "#f87171",
                }}
              >
                {ok ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                Model: {g ? "spam" : "normal"}
              </motion.span>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center gap-4">
        <div className="text-3xl font-bold text-white whitespace-nowrap">
          {dogru} / 4 <span className="text-base font-medium text-gray-400">doğru</span>
        </div>
        <p className="text-base text-gray-300 leading-snug">{notlar[level]}</p>
      </div>
    </Stage>
  );
}

/* ============================================================
   SLAYTLAR
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ─────────────────  1 · KAPAK  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2103 · 14. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="bvbb-shimmer">Bulutta</span>
          <br />
          <span className="text-white">Makine Öğrenimi</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bilgisayara kural yazmıyoruz, örnek gösteriyoruz. Bulut da bunun için mutfağını kiralıyor.
        </Sub>
        <CoverChips
          items={[
            { name: "Örneklerden öğrenme", icon: Brain, color: "#a855f7" },
            { name: "Hazır YZ servisleri", icon: Sparkles, color: "#2563eb" },
            { name: "Kendi modelini eğitme", icon: GraduationCap, color: "#22c55e" },
          ]}
        />
        <CoverFooter />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  2 · EL KALDIR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>El kaldır</Eyebrow>
      <H2>Bugün makine öğrenimiyle kaç kez karşılaştın?</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta veriye soru sorduk. Bu hafta bilgisayar veriden kendisi bir şey öğreniyor.
      </Sub>
      <Stage className="mt-6 space-y-3">
        <Reveal
          question="Kaçınız bugün hiç makine öğrenimi kullanmadığını düşünüyor?"
          hint="Eller kalktıktan sonra tıkla"
          answer="Büyük ihtimalle hepiniz kullandınız: telefonun yüzünü tanıyıp açıldı, klavye sıradaki kelimeyi önerdi, e-postan spam’i ayırdı, video uygulaman sıradaki videoyu seçti."
        />
        <Reveal
          question="Bunların ortak noktası ne?"
          answer="Hiçbirinde programcı kuralları tek tek yazmadı. Sistem, çok sayıda örneğe bakarak kendi kendine öğrendi."
        />
      </Stage>
      <AskLine>Bu örneklerden hangisi seni en çok şaşırtıyor, hangisi bazen yanılıyor?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  3 · KURAL vs ÖRNEK  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Benzetme</Eyebrow>
      <H2>Kural yazmak yerine örnek gösteririz</H2>
      <Sub className="mt-3 max-w-3xl">
        Küçük bir çocuğa kediyi tarif etmezsin; kedi gösterirsin. Makine öğrenimi (machine learning) de böyle çalışır.
      </Sub>
      <div className="mt-6">
        <Versus
          left={{
            icon: Wrench,
            tag: "Klasik program",
            title: "Kuralı sen yazarsın",
            items: [
              "“İçinde bedava geçiyorsa spam’dir”",
              "Her yeni durum için yeni kural gerekir",
              "Kural az ve netse iyi çalışır",
            ],
          }}
          right={{
            icon: Brain,
            tag: "Makine öğrenimi",
            title: "Kuralı örneklerden kendi çıkarır",
            items: [
              "Binlerce “spam” ve “normal” e-posta gösterirsin",
              "Ortak özellikleri kendisi bulur",
              "Ne kadar iyi örnek, o kadar iyi tahmin",
            ],
          }}
        />
      </div>
      <AskLine>Kediyi yalnız kurallarla tarif etmeyi dener misin? Nerede tıkanıyorsun?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  4 · SPAM FİLTRESİ OYNA-GÖR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Oyna-gör · spam filtresi</Eyebrow>
      <H2>Örnek arttıkça tahmin düzelir</H2>
      <div className="mt-5">
        <TrainPlay />
      </div>
      <AskLine>Az örnekle eğitilen model “bedava çay” mesajına neden spam dedi?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  5 · DÖRT ADIM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Adım adım · ikinci el araba fiyatı</Eyebrow>
      <H2>Öğrenme dört adımda olur</H2>
      <Sub className="mt-3 max-w-3xl">
        Model: örneklerden çıkarılan tahmin makinesi. Eğitim: modele örnek gösterme işi.
      </Sub>
      <Stage className="mt-5">
        <Stepper
          steps={[
            { icon: Database, title: "Örnek topla", text: "Eski ilanlar: marka, yaş, kilometre ve satış fiyatı.", color: "#06b6d4" },
            { icon: GraduationCap, title: "Eğit", text: "Model ilanlara bakar, fiyatı neyin etkilediğini bulur.", color: "#a855f7" },
            { icon: FlaskConical, title: "Dene", text: "Hiç görmediği ilanlarla sınanır: tahmini tutuyor mu?", color: "#f59e0b" },
            { icon: Rocket, title: "Kullan", text: "Yeni bir ilan gelir, model fiyat tahmini verir.", color: "#22c55e" },
          ]}
        />
      </Stage>
      <AskLine>Modeli neden daha önce hiç görmediği ilanlarla deniyoruz?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  6 · SAYI MI ETİKET Mİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Tahmin et · tıkla göster</Eyebrow>
      <H2>Sayı mı tahmin ediyor, etiket mi seçiyor?</H2>
      <Sub className="mt-3 max-w-3xl">
        Modeller en çok iki iş yapar: bir sayı tahmin eder ya da hazır etiketlerden birini seçer.
      </Sub>
      <Stage className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
        <Reveal
          question="Bu evin kirası ne kadar olur?"
          hint="Tahmin et, tıkla"
          answer="Sayı tahmini. Cevap bir miktardır; araba fiyatı örneğiyle aynı tür."
        />
        <Reveal
          question="Bu fotoğraftaki kedi mi, köpek mi?"
          hint="Tahmin et, tıkla"
          answer="Etiket seçme (sınıflandırma). Cevap hazır seçeneklerden biridir."
        />
        <Reveal
          question="Bu e-posta spam mi?"
          hint="Tahmin et, tıkla"
          answer="Etiket seçme. İki etiket var: spam ya da normal."
        />
      </Stage>
      <AskLine>Sen de bir örnek söyle: sayı tahmini mi, etiket seçme mi?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  7 · ARA SORU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Ara soru</Eyebrow>
      <Stage>
        <Quiz
          items={[
            {
              q: "Bir spam filtresi hangi mesajın spam olduğunu nereden öğrenir?",
              options: [
                "Programcının yazdığı uzun bir kelime listesinden",
                "Daha önce “spam” ve “normal” diye işaretlenmiş örnek e-postalardan",
                "İnternetin hızından",
                "E-postanın gönderildiği saatten",
              ],
              correct: 1,
              why: "Makine öğrenimi işaretlenmiş örneklerden öğrenir; senin “spam olarak işaretle” tıklaman da bir örnektir.",
            },
          ]}
        />
      </Stage>
    </SlideShell>
  ),

  /* ─────────────────  8 · BÖLÜM  ───────────────── */
  () => (
    <SectionDivider
      num="2"
      total="2"
      title="Peki bulut bu işin neresinde?"
      subtitle="Öğrenmek çok örnek ve güçlü bilgisayar ister. İkisini de satın almak yerine kiralayabilirsin."
      bgGradient="linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)"
      shadow="0 20px 60px -10px rgba(37, 99, 235, 0.55)"
      icon={<Cloud className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  9 · HAZIR MUTFAK  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Benzetme</Eyebrow>
      <H2>Bulut, hazır mutfak kiralamak gibidir</H2>
      <Sub className="mt-3 max-w-3xl">
        Yılda birkaç kez büyük yemek yapacaksan restoran mutfağı satın almazsın; saatliğine kiralarsın.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <FeatureCard
          icon={Flame}
          title="Güçlü ocak"
          desc="Eğitim çok işlem ister. Bulut, evdeki bilgisayarın yapamayacağı kadar güçlü makineleri verir."
          accent="#f59e0b"
        />
        <FeatureCard
          icon={Wallet}
          title="Kullandığın kadar öde"
          desc="Eğitim bitince makineyi kapatırsın. Boşta bekleyen pahalı bilgisayarın olmaz."
          delay={0.1}
          accent="#22c55e"
        />
        <FeatureCard
          icon={ChefHat}
          title="Hazır alet ve tarif"
          desc="Verin zaten bulutta durur; eğitim araçları ve hazır modeller de aynı yerdedir."
          delay={0.2}
          accent="#a855f7"
        />
      </div>
      <AskLine>Yılda bir kez düğün yemeği yapmak için mutfak satın alır mıydın?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  10 · İKİ YOL  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>İki yol</Eyebrow>
      <H2>Hazır servisi kullan ya da kendi modelini eğit</H2>
      <div className="mt-6">
        <Versus
          left={{
            icon: Sparkles,
            tag: "Hazır YZ servisi · hazır yemek",
            title: "Başkasının eğittiği modeli kullanırsın",
            items: [
              "Görüntü tanıma, çeviri, konuşmayı yazıya dökme",
              "Veri toplamadan, eğitmeden hemen çalışır",
              "Herkesin ortak işleri için uygundur",
            ],
          }}
          right={{
            icon: GraduationCap,
            tag: "Kendi modelin · kendi tarifin",
            title: "Kendi verinle sen eğitirsin",
            items: [
              "Yalnız senin işine özel bir soru varsa",
              "Kendi örneklerini toplaman gerekir",
              "Daha çok emek ister, sana özel sonuç verir",
            ],
          }}
        />
      </div>
      <AskLine>Hangisi daha hızlı başlar, hangisi yalnız senin işini bilir?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  11 · HAZIR MI KENDİ Mİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Birlikte karar verelim</Eyebrow>
      <Stage>
        <Quiz
          doneText="İş herkesin işiyse hazır servis; cevap yalnız senin verinde saklıysa kendi modelin."
          items={[
            {
              q: "Restoran menüsünün fotoğrafındaki yazıyı Türkçeye çevirmek istiyorsun.",
              options: ["Hazır YZ servisi", "Kendi modelini eğit"],
              correct: 0,
              why: "Yazı okuma ve çeviri herkesin ortak işi; hazır servis bunu zaten iyi yapıyor.",
            },
            {
              q: "Kendi fabrikanda üretilen parçaların hatalı olanlarını fotoğraftan ayırmak istiyorsun.",
              options: ["Hazır YZ servisi", "Kendi modelini eğit"],
              correct: 1,
              why: "Senin parçanı ve senin hatanı yalnız senin fotoğrafların anlatır; kendi örneklerinle eğitmen gerekir.",
            },
            {
              q: "Bir saatlik toplantı ses kaydını yazıya dökmek istiyorsun.",
              options: ["Hazır YZ servisi", "Kendi modelini eğit"],
              correct: 0,
              why: "Konuşmayı yazıya dökmek hazır servislerin en yaygın işlerinden biridir.",
            },
            {
              q: "Kendi marketinin gelecek hafta kaç ekmek satacağını tahmin etmek istiyorsun.",
              options: ["Hazır YZ servisi", "Kendi modelini eğit"],
              correct: 1,
              why: "Cevap senin geçmiş satış kayıtlarında saklı; model o kayıtlarla eğitilir.",
            },
          ]}
        />
      </Stage>
      <AskLine>Tıklamadan önce: bu işte senin kendi verin gerekli mi?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  12 · SINIFTA DENEYELİM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sınıfta deneyelim · 10 dakika · telefonla</Eyebrow>
      <H2>Hazır bir YZ servisini sına</H2>
      <div className="mt-6">
        <TrySteps
          steps={[
            "Telefonundaki çeviri uygulamasını aç ve kamera ile çeviriyi seç.",
            "Sınıftaki İngilizce bir yazıya tut: kitap kapağı, etiket, klavye tuşu.",
            "Klavyedeki mikrofona bas, bir cümle söyle; yazıya doğru döktü mü?",
            "Not al: nerede yanıldı? Sence neden yanıldı?",
          ]}
        />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-gray-400">
        <span className="flex items-center gap-2">
          <Wifi className="w-4 h-4 text-[#60a5fa]" />
          İnternet gerekir, kurulum gerekmez.
        </span>
        <span className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-[#60a5fa]" />
          Çeviri uygulaması olmayan yanındakiyle çalışır.
        </span>
      </div>
      <AskLine>Bu çeviri telefonda mı yapıldı, buluttaki bir serviste mi? Nereden anlarız?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  13 · KENDİNİ DENE  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kendini dene · 3 soru</Eyebrow>
      <Stage>
        <Quiz
          doneText="Takıldığın soru varsa o slayda birlikte geri dönelim."
          items={[
            {
              q: "Makine öğrenimini en iyi hangisi anlatır?",
              options: [
                "Programcı bütün kuralları tek tek yazar",
                "Bilgisayar çok sayıda örneğe bakarak kuralı kendi çıkarır",
                "Bilgisayar internetten hazır cevap kopyalar",
                "Bilgisayar rastgele tahmin yapar",
              ],
              correct: 1,
              why: "Kural yazmak yerine örnek gösteririz; model ortak özellikleri kendisi bulur.",
            },
            {
              q: "Bulut, model eğitirken en çok ne sağlar?",
              options: [
                "Güçlü bilgisayarı satın almadan kiralamayı",
                "Modelin hiç yanılmamasını",
                "Veri toplamaya gerek kalmamasını",
                "İnternetsiz çalışmayı",
              ],
              correct: 0,
              why: "Hazır mutfak gibi: güçlü makineyi işin süresince kiralar, bitince kapatırsın.",
            },
            {
              q: "Bir fotoğraftaki yazıyı okutmak istiyorsun. İlk hangisini denersin?",
              options: [
                "Sıfırdan kendi modelimi eğitirim",
                "Hazır bir YZ servisini kullanırım",
                "Yazıyı elle kural yazarak okuturum",
                "Bu iş bulutta yapılamaz",
              ],
              correct: 1,
              why: "Yazı okuma herkesin ortak işi; hazır servis varken sıfırdan eğitmek gereksiz emek olur.",
            },
          ]}
        />
      </Stage>
    </SlideShell>
  ),

  /* ─────────────────  14 · ÖZET + KÖPRÜ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Aklında kalsın: 3 şey</Eyebrow>
      <div className="mt-2 max-w-4xl">
        <ThreeThings
          items={[
            "Makine öğrenimi kural yazmak değil, örnek göstermektir; örnek iyiyse tahmin iyi olur.",
            "Bulut bu iş için kiralık mutfaktır: güçlü makine, kullandığın kadar ödeme.",
            "Ortak işlerde hazır YZ servisi yeter; sana özel soruda kendi verinle model eğitirsin.",
          ]}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 bvbb-card-sky rounded-xl p-5 max-w-4xl flex items-center gap-3"
      >
        <Shield className="w-6 h-6 text-[#67e8f9] flex-shrink-0" />
        <span className="text-base md:text-lg text-gray-200">
          Haftaya: bu kadar veri ve model bulutta duruyor. Onu kim, nasıl koruyor? Konu bulutta güvenlik ve gizlilik.
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
            background: "linear-gradient(90deg, #2563eb, #60a5fa, #2563eb)",
            boxShadow: "0 0 16px rgba(37,99,235,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#60a5fa]/80">
          BVA 2103 · 14. Hafta · Bulutta Makine Öğrenimi
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[#60a5fa]/60">
            <span className="text-[#60a5fa]">
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
            className="p-1.5 text-gray-500 hover:text-[#60a5fa] transition-colors"
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
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#60a5fa] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
                  ? "w-5 bg-[#60a5fa]"
                  : "w-1.5 bg-white/15 hover:bg-white/40"
              }`}
              style={
                i === current
                  ? { boxShadow: "0 0 10px rgba(96,165,250,0.6)" }
                  : undefined
              }
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#60a5fa] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
