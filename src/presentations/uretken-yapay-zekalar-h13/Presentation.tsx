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
  Brain,
  Search,
  FileText,
  BookOpen,
  BookX,
  Globe,
  Link2,
  Headphones,
  Target,
  ListChecks,
  ShieldCheck,
  MessageSquare,
  ScrollText,
  Upload,
  Calendar,
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

/* Kapalı kitap / açık kitap: kaynak verilince cevap nasıl değişir? */
function SourceToggle() {
  const [withSource, setWithSource] = useState(false);
  return (
    <div className={`grid grid-cols-1 md:grid-cols-5 gap-5 items-stretch ${SAFE}`}>
      <div className="md:col-span-2 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setWithSource(false)}
          className={`uyz-chip justify-center ${!withSource ? "uyz-chip-on" : ""}`}
        >
          <BookX className="w-4 h-4" />
          Kapalı kitap: kaynak yok
        </button>
        <button
          type="button"
          onClick={() => setWithSource(true)}
          className={`uyz-chip justify-center ${withSource ? "uyz-chip-on" : ""}`}
        >
          <BookOpen className="w-4 h-4" />
          Açık kitap: ders notu yüklendi
        </button>
        <div className="mt-1 text-center">
          <TapHint>ikisi arasında geçiş yap</TapHint>
        </div>
        <div className="uyz-card rounded-xl p-4 text-sm text-gray-400 leading-relaxed mt-auto">
          {withSource
            ? "Model önce nottaki ilgili yeri buluyor, sonra ona bakarak yazıyor. Bu çalışma biçiminin teknik adı RAG: “önce kaynakta bul, sonra cevapla”."
            : "Model yalnızca aklında kalanla konuşuyor. Senin dersinin notunu hiç görmedi; bu yüzden ya genel konuşur ya da tahmin yürütür."}
        </div>
      </div>

      <div className="md:col-span-3 uyz-window-chrome p-5 flex flex-col gap-3">
        <div className="self-end uyz-bubble-user px-4 py-3 text-base max-w-[85%]">
          Bizim derste vize yüzde kaç etkiliyor?
        </div>
        <motion.div
          key={withSource ? "acik" : "kapali"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="self-start uyz-bubble-ai px-4 py-3 text-base max-w-[90%] leading-relaxed"
        >
          <span className="uyz-sample-tag">Örnek cevap</span>
          <br />
          {withSource ? (
            <>
              Yüklediğin ders izlencesine göre vize <span className="text-white font-semibold">%40</span>,
              final <span className="text-white font-semibold">%60</span> etkiliyor.
              <span
                className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono"
                style={{ background: "rgba(34,197,94,0.15)", color: "#4ade80" }}
              >
                <FileText className="w-3 h-3" /> izlence.pdf · sayfa 2
              </span>
            </>
          ) : (
            <>
              Üniversitelerde vize genellikle <span className="text-white font-semibold">%30 ile %50</span>{" "}
              arasında etkiler. Sizin dersinizde büyük ihtimalle %40&apos;tır.
              <span
                className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono"
                style={{ background: "rgba(245,158,11,0.15)", color: "#fbbf24" }}
              >
                kaynak yok · tahmin
              </span>
            </>
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
        <Eyebrow>BVA 1203 · 13. Hafta</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]"
        >
          <span className="uyz-shimmer">Bilgiyle Çalışan YZ</span>
        </motion.h1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Araştırma ve belge araçları: yapay zekâya kaynağı sen verirsin, o da
          kaynağa bakarak cevap verir.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-4xl mx-auto">
          <FeatureCard
            icon={FileText}
            title="Dosya yükle, soru sor"
            desc="PDF, ders notu, NotebookLM."
            delay={0.3}
          />
          <FeatureCard
            icon={Globe}
            title="Web'de arat"
            desc="Arama yapan asistanlar, Perplexity."
            delay={0.4}
            accent="#3b82f6"
          />
          <FeatureCard
            icon={Link2}
            title="Kaynağı kontrol et"
            desc="Bağlantıyı aç, cümleyi bul."
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
          Müfredat konusu: Yapay zekâda bilgi gösterimi
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  2 · GEÇEN HAFTADAN KÖPRÜ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Geçen haftadan bugüne</Eyebrow>
      <H2>Geçen hafta &ldquo;uydurabilir&rdquo; dedik; bugün çaresine bakıyoruz</H2>
      <Sub className="mt-4 mb-8 max-w-3xl">
        Yapay zekâ bilmediği yerde boşluğu tahminle doldurur. En iyi çare: ona
        bakacağı kaynağı vermek.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={ShieldCheck}
          title="12. hafta"
          desc="Uydurma (halüsinasyon) var; her cevabı doğrula."
          delay={0.2}
          accent="#f59e0b"
        />
        <FeatureCard
          icon={BookOpen}
          title="Bugün"
          desc="Kaynağı önüne koy: dosya, not defteri, web araması."
          delay={0.3}
        />
        <FeatureCard
          icon={Target}
          title="Dersin sonunda"
          desc="Kendi ders notundan sınav hazırlatıp kaynağını kontrol edebileceksin."
          delay={0.4}
          accent="#22c55e"
        />
      </div>
      <Ask>Geçen hafta bir YZ cevabını doğrulayan oldu mu? Nasıl doğruladın?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  3 · MODEL HER ŞEYİ BİLMEZ (tahmin et)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sorun · tahmin et</Eyebrow>
      <H2>Model çok okumuştur ama her şeyi bilmez</H2>
      <Sub className="mt-4 mb-7 max-w-3xl">
        Aşağıdaki soruları kaynak vermeden sorsak ne olur? Önce tahmin edin,
        sonra karta tıklayın.
      </Sub>
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${SAFE}`}>
        <Reveal
          q="“Bizim dersin final tarihi ne zaman?”"
          a="Bilemez. Okulun duyurusunu hiç görmedi. Senin dosyaların ve okulunun iç bilgisi onda yok."
          delay={0.2}
        />
        <Reveal
          q="“Dün akşamki maç kaç kaç bitti?”"
          a="Tek başına bilemez. Modelin bilgisi belli bir tarihte kesilir; sonrasını ancak web'de arama yaparsa öğrenir."
          delay={0.3}
        />
        <Reveal
          q="“Bu PDF'in 7. sayfasında ne yazıyor?”"
          a="PDF'i yüklemediysen göremez. Yine de bir şeyler yazabilir; işte uydurma tam burada çıkar."
          delay={0.4}
        />
      </div>
      <Ask>Bu üç sorunun ortak noktası ne? Model neyi görmüyor?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  4 · AÇIK KİTAP SINAVI (oyna-gör)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Benzetme · oyna-gör</Eyebrow>
      <H2>Kaynak vermek, sınava açık kitapla girmek gibidir</H2>
      <Sub className="mt-4 mb-7 max-w-3xl">
        Aynı soru, iki durum. Düğmeyi değiştir, cevabın nasıl değiştiğine bak.
      </Sub>
      <SourceToggle />
      <Ask>İki cevap da aynı sayıyı söyledi. O zaman fark ne? Hangisine güvenirsin?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  5 · ARKA PLANDA NE OLUYOR (adım adım)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Nasıl çalışır · adım adım</Eyebrow>
      <H2>Önce kaynakta bulur, sonra cevabı yazar</H2>
      <Sub className="mt-4 mb-7 max-w-3xl">
        Kütüphanecide de böyledir: soruyu duyar, doğru rafa gider, sayfayı açar,
        sonra sana anlatır.
      </Sub>
      <Stepper
        steps={[
          {
            icon: MessageSquare,
            title: "Sen soruyu sorarsın",
            desc: "“Vize yüzde kaç etkiliyor?”",
          },
          {
            icon: Search,
            title: "İlgili yeri arar",
            desc: "Yüklediğin dosyada ya da web'de soruyla ilgili bölümü bulur.",
          },
          {
            icon: FileText,
            title: "O bölümü önüne koyar",
            desc: "Bulduğu paragraf, sorunla birlikte modele verilir.",
          },
          {
            icon: Link2,
            title: "Bakarak cevap yazar",
            desc: "Cevabın yanına nereden aldığını da ekler.",
          },
        ]}
      />
      <Ask>İkinci adımda yanlış sayfayı bulursa cevap nasıl olur?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  6 · DOSYA YÜKLE, SORU SOR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Araç 1 · sohbet asistanına dosya ver</Eyebrow>
      <H2>Ders notunu yükle, notun üzerinden konuş</H2>
      <Sub className="mt-4 mb-8 max-w-3xl">
        ChatGPT, Claude ve Gemini gibi asistanlarda ataş simgesiyle PDF, Word ya
        da fotoğraf ekleyebilirsin. Ücretsiz planda dosya sayısı sınırlı olabilir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={ScrollText}
          title="Özetlet"
          desc="“Bu notu 5 maddede özetle.”"
          delay={0.2}
        />
        <FeatureCard
          icon={MessageSquare}
          title="Soru sor"
          desc="“Bu nota göre halüsinasyon ne demek? Sayfasını da söyle.”"
          delay={0.3}
          accent="#3b82f6"
        />
        <FeatureCard
          icon={ListChecks}
          title="Sınav hazırlat"
          desc="“Bu nottan 5 test sorusu yaz, cevapları sonda ver.”"
          delay={0.4}
          accent="#22c55e"
        />
      </div>
      <Ask>Asistana hangi dosyayı yüklemezdin? (Geçen haftayı hatırla: kişisel veri.)</Ask>
    </SlideShell>
  ),

  /* ─────────────────  7 · NOTEBOOKLM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Araç 2 · NotebookLM</Eyebrow>
      <H2>NotebookLM yalnızca senin verdiğin kaynaklardan konuşur</H2>
      <Sub className="mt-4 mb-8 max-w-3xl">
        Google&apos;ın not defteri aracı. Bir derse ait bütün kaynakları tek
        deftere koyarsın; o da cevabını bu kaynaklara dayandırır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Upload}
          title="Kaynak ekle"
          desc="PDF, web sayfası bağlantısı, video bağlantısı, kendi yazdığın not."
          delay={0.2}
        />
        <FeatureCard
          icon={Link2}
          title="Numaralı atıf"
          desc="Her cümlenin yanında küçük bir numara çıkar; tıklayınca kaynaktaki yeri gösterir."
          delay={0.3}
          accent="#22c55e"
        />
        <FeatureCard
          icon={Headphones}
          title="Sesli özet"
          desc="Kaynaklarını iki kişinin sohbeti gibi anlatan bir ses kaydı üretir; yolda dinlersin."
          delay={0.4}
          accent="#ec4899"
        />
      </div>
      <Ask>Sesli özeti hangi ders için dinlemek isterdin? Neden?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  8 · MİNİ SINAV (orta)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Mini sınav · dersin ortası</Eyebrow>
      <H2 className="mb-7">Buraya kadar anlaştık mı?</H2>
      <Quiz
        items={[
          {
            q: "Asistana ders notunu yükleyip soru sormak neye benzer?",
            options: [
              "Kapalı kitap sınavına",
              "Açık kitap sınavına",
              "Kopya çekmeye",
              "Ezber yapmaya",
            ],
            correct: 1,
            why: "Model cevabı aklından değil, önüne koyduğun kaynağa bakarak yazar.",
          },
        ]}
      />
      <Ask>Açık kitap sınavında da yanlış yapılır mı? Nasıl?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  9 · WEB ARAMASI YAPAN ASİSTANLAR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Araç 3 · web araması</Eyebrow>
      <H2>Güncel bilgi için asistan önce web&apos;de arama yapar</H2>
      <Sub className="mt-4 mb-8 max-w-3xl">
        Sen arama motorunda on sayfa açarsın; o senin yerine açar, okur ve
        bağlantılarıyla birlikte özetler.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Globe}
          title="Sohbet asistanlarında arama"
          desc="ChatGPT, Gemini, Claude ve Copilot gerektiğinde web'de arama yapabilir."
          delay={0.2}
          accent="#3b82f6"
        />
        <FeatureCard
          icon={Search}
          title="Perplexity"
          desc="Baştan arama için tasarlanmış bir asistan: her cevabın altında kaynak listesi durur."
          delay={0.3}
        />
        <FeatureCard
          icon={Calendar}
          title="Ne zaman lazım?"
          desc="Haber, duyuru, başvuru koşulu, güncel ürün bilgisi gibi “bugünkü” sorularda."
          delay={0.4}
          accent="#22c55e"
        />
      </div>
      <Ask>Arama motoruyla bu asistanların farkı ne? Hangisi daha hızlı, hangisi daha riskli?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  10 · DERİN ARAŞTIRMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Araç 4 · derin araştırma (deep research)</Eyebrow>
      <H2>Derin araştırma modu, ödev hazırlayan bir stajyer gibi çalışır</H2>
      <Sub className="mt-4 mb-7 max-w-3xl">
        Tek aramayla yetinmez: dakikalarca çalışır, onlarca sayfa okur, sonunda
        kaynaklı bir rapor yazar.
      </Sub>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${SAFE}`}>
        <Reveal
          q="Ne zaman kullanırım?"
          a="Geniş bir konuyu toparlarken: “Türkiye'de veri analisti iş ilanlarında hangi beceriler isteniyor?” gibi çok kaynaklı sorularda."
          hint="tıkla, gör"
          delay={0.2}
        />
        <Reveal
          q="Ne zaman gerekmez?"
          a="Kısa ve net sorularda. “Final ne zaman?” için dakikalarca beklemeye gerek yok; normal arama yeter."
          hint="tıkla, gör"
          delay={0.3}
        />
        <Reveal
          q="Nelere dikkat ederim?"
          a="Uzun rapor ikna edici görünür ama o da yanılabilir. Önemli sayıları ve iddiaları kaynağından kontrol et."
          hint="tıkla, gör"
          delay={0.4}
        />
        <Reveal
          q="Herkes kullanabilir mi?"
          a="Birçok asistanda var, ama ücretsiz planda kullanım hakkı az ya da kapalı olabilir. Güncel durumu uygulamadan kontrol et."
          hint="tıkla, gör"
          delay={0.5}
        />
      </div>
      <Ask>Bu modu hangi ödevinde kullanırdın? Raporu aynen teslim eder miydin?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  11 · HANGİ ARAÇ? (eşleştirme oyunu)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Oyun · hangi iş için hangi araç?</Eyebrow>
      <H2 className="mb-7">Durumu oku, doğru aracı seç</H2>
      <Quiz
        items={[
          {
            q: "Yarın sınav var. Elimde hocanın 40 sayfalık PDF notu var; sorular ve kısa özet istiyorum.",
            options: [
              "Dosyayı asistana ya da NotebookLM'e yükle",
              "Derin araştırma başlat",
              "Kaynak vermeden sor",
              "Web'de arat",
            ],
            correct: 0,
            why: "Kaynak belli ve elinde. Dosyayı ver, cevap o nottan gelsin.",
          },
          {
            q: "KYK burs başvuruları bu yıl ne zaman başlıyor?",
            options: [
              "Kaynak vermeden sor",
              "Web araması yapan asistan",
              "Eski ders notunu yükle",
              "Sesli özet dinle",
            ],
            correct: 1,
            why: "Güncel bir duyuru bu. Web'de aratıp resmî sayfanın bağlantısını açıp kontrol edersin.",
          },
          {
            q: "Bir dönem boyunca aynı dersin 6 farklı kaynağıyla çalışacağım.",
            options: [
              "Her seferinde yeniden yükle",
              "Derin araştırma",
              "NotebookLM'de tek defter aç",
              "Arama motoru",
            ],
            correct: 2,
            why: "Kaynaklar bir kez deftere eklenir; her soru hepsinin üzerinden cevaplanır.",
          },
          {
            q: "“Türkiye'de e-ticarette YZ kullanımı” üzerine 2 sayfalık ödev hazırlayacağım; nereden başlayacağımı bilmiyorum.",
            options: [
              "Kaynak vermeden sor",
              "Tek PDF yükle",
              "Sesli sohbet",
              "Derin araştırma, sonra kaynakları tek tek aç",
            ],
            correct: 3,
            why: "Geniş, çok kaynaklı bir konu. Rapor başlangıç noktasıdır; kaynakları açıp okumak sana kalır.",
          },
        ]}
      />
      <Ask>Seçmeden önce el kaldırın: A mı, B mi, C mi, D mi?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  12 · KAYNAK KONTROLÜ (doğru / yanlış)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kaynak kontrolü · doğru mu, yanlış mı?</Eyebrow>
      <H2 className="mb-7">Kaynak göstermesi, doğru söylediği anlamına gelmez</H2>
      <Judge
        labels={["Doğru", "Yanlış"]}
        items={[
          {
            text: "“Cevabın altında bağlantı varsa bilgi kesin doğrudur.”",
            answer: 1,
            why: "Yanlış. Bağlantı açılmayabilir ya da sayfada o cümle hiç geçmeyebilir. Aç ve bak.",
          },
          {
            text: "“Önemli bir bilgiyi kullanmadan önce bağlantıyı açıp cümleyi kaynakta aramalıyım.”",
            answer: 0,
            why: "Doğru. Üç soru sor: Bağlantı açılıyor mu? Cümle orada var mı? Site güvenilir mi?",
          },
          {
            text: "“Kendi PDF'imi yüklediysem model artık hiç hata yapmaz.”",
            answer: 1,
            why: "Yanlış. Hata azalır ama bitmez: yanlış sayfaya bakabilir ya da notta olmayanı ekleyebilir.",
          },
          {
            text: "“Resmî kurum sayfası, kimin yazdığı belli olmayan bir blogdan daha güvenilir kaynaktır.”",
            answer: 0,
            why: "Doğru. Kaynağın kim olduğu önemli: resmî site, ders kitabı, bilinen kurum önce gelir.",
          },
        ]}
      />
      <Ask>Bir bağlantının güvenilir olduğunu nereden anlarsın?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  13 · SINIFTA DENEYELİM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sınıfta deneyelim · 10 dakika · telefonla</Eyebrow>
      <H2>Kendi ders notundan sınav hazırlat, kaynağını kontrol et</H2>
      <Sub className="mt-4 mb-6 max-w-3xl">
        İkişerli çalışın. Yaptığınız adımı birlikte işaretleyelim.
      </Sub>
      <TaskList
        steps={[
          {
            title: "Bir ders notu seç",
            desc: "Herhangi bir dersin PDF'i ya da defterinin fotoğrafı. İçinde kişisel bilgi olmasın.",
          },
          {
            title: "Asistana ya da NotebookLM'e yükle",
            desc: "Ücretsiz hesabın yeterli. Dosya yüklenmiyorsa metni kopyalayıp yapıştır.",
          },
          {
            title: "Sınavı iste",
            desc: "“Bu nottan 5 test sorusu hazırla. Her cevabın notta nerede geçtiğini yaz.”",
          },
          {
            title: "Bir cevabı kaynağından kontrol et",
            desc: "Gösterdiği yeri notta bul. Gerçekten orada mı? Yanındaki arkadaşına göster.",
          },
        ]}
      />
      <Ask>Kimin sorularından biri yanlış ya da notta olmayan bir şey çıktı?</Ask>
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
            q: "Model senin okulunun duyurusunu neden bilmez?",
            options: [
              "Türkçe bilmediği için",
              "O bilgiyi hiç görmediği için",
              "Ücretsiz sürüm olduğu için",
              "Soruyu yanlış sorduğun için",
            ],
            correct: 1,
            why: "Model yalnızca eğitimde gördüğünü ve senin önüne koyduğunu bilir.",
          },
          {
            q: "NotebookLM'i diğer sohbet asistanlarından ayıran en belirgin özellik hangisi?",
            options: [
              "Görsel üretmesi",
              "Kod yazması",
              "Cevabı senin eklediğin kaynaklara dayandırması",
              "İnternetsiz çalışması",
            ],
            correct: 2,
            why: "Kaynakları sen seçersin; cevaplar numaralı atıflarla o kaynaklara bağlanır.",
          },
          {
            q: "Asistan bir sayı verip altına bağlantı koydu. İlk işin ne olmalı?",
            options: [
              "Sayıyı ödeve yazmak",
              "Aynı soruyu tekrar sormak",
              "Asistana “emin misin?” demek",
              "Bağlantıyı açıp sayıyı sayfada bulmak",
            ],
            correct: 3,
            why: "Kaynak gösterilmesi yetmez; kaynağın gerçekten bunu söylediğini sen görmelisin.",
          },
        ]}
      />
    </SlideShell>
  ),

  /* ─────────────────  15 · AKLINDA KALSIN + GELECEK HAFTA  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>13. hafta tamamlandı</Eyebrow>
        <H1>
          <span className="uyz-shimmer">Aklında kalsın: 3 şey</span>
        </H1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-5xl mx-auto">
          <FeatureCard
            icon={Brain}
            title="1 · Model her şeyi bilmez"
            desc="Senin dosyanı ve bugünün haberini ancak sen verirsen görür."
            delay={0.2}
          />
          <FeatureCard
            icon={BookOpen}
            title="2 · Kaynak ver"
            desc="Dosya yükle, NotebookLM kullan ya da web'de arat: açık kitap sınavı."
            delay={0.3}
            accent="#3b82f6"
          />
          <FeatureCard
            icon={Link2}
            title="3 · Kaynağı aç, bak"
            desc="Atıf güven verir ama kanıt değildir. Önemli bilgiyi kaynağında gör."
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
            <span className="text-white font-semibold">Gelecek hafta:</span> kaynağı her
            seferinde yeniden yüklemek yerine kendi asistanını bir kez kuracağız ve
            tablolarla çalışırken YZ&apos;den yardım alacağız.
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
          BVA 1203 · 13. Hafta · Araştırma ve Belge Araçları
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
