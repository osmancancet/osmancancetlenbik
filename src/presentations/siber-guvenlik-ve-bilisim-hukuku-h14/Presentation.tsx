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
  ShieldCheck,
  Scale,
  Globe,
  Lock,
  FileSignature,
  KeyRound,
  BookOpen,
  XCircle,
  CheckCircle2,
  Calendar,
  Hand,
  MousePointerClick,
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
          className="inline-flex w-32 h-32 rounded-3xl items-center justify-center mb-8 sgbh-pulse"
          style={{ background: bgGradient, boxShadow: shadow }}
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
   ETKİLEŞİM BİLEŞENLERİ
   ============================================================ */

const BTN_CLASS =
  "inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold text-white transition-all hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed";
const BTN_STYLE = { background: "linear-gradient(135deg,#06b6d4,#0e7490)" };

/* Hocanın sınıfa yönelteceği tek soru */
function AskLine({ children }: { children: ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="mt-6 text-sm text-gray-500"
    >
      <span className="font-mono uppercase tracking-widest text-[11px] text-[#06b6d4]/70 mr-2">
        Sınıfa sor:
      </span>
      {children}
    </motion.p>
  );
}

function TapHint({ children = "tıkla" }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-[#67e8f9]/80">
      <MousePointerClick className="w-3.5 h-3.5" />
      {children}
    </span>
  );
}

/* Tahmin et → tıkla göster */
function RevealCard({
  title,
  children,
  hint = "tahmin et, sonra tıkla",
  accent = "#06b6d4",
  icon: Icon,
}: {
  title: string;
  children: ReactNode;
  hint?: string;
  accent?: string;
  icon?: LucideIcon;
}) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      aria-expanded={open}
      className="sgbh-card sgbh-card-hover rounded-xl p-5 text-left w-full h-full transition-all cursor-pointer"
      style={open ? { borderColor: `${accent}90` } : undefined}
    >
      <div className="flex items-start gap-4">
        {Icon && (
          <div
            className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: `${accent}18`, border: `1px solid ${accent}55` }}
          >
            <Icon className="w-5 h-5" style={{ color: accent }} />
          </div>
        )}
        <div className="flex-1">
          <div className="text-lg font-semibold text-white leading-snug">{title}</div>
          {open ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-base text-gray-300 leading-relaxed"
            >
              {children}
            </motion.div>
          ) : (
            <div className="mt-3">
              <TapHint>{hint}</TapHint>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

/* Sınıf oylaması / el kaldır */
function Poll({ question, children }: { question: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="max-w-3xl mx-auto sgbh-card rounded-2xl p-6 text-center">
      <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#fbbf24] mb-4">
        <Hand className="w-4 h-4" />
        El kaldır
      </div>
      <div className="text-2xl md:text-3xl font-semibold text-white leading-snug">{question}</div>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-lg text-gray-300 leading-relaxed"
        >
          {children}
        </motion.div>
      )}
      <div className="mt-6">
        <button type="button" onClick={() => setOpen((o) => !o)} className={BTN_CLASS} style={BTN_STYLE}>
          <MousePointerClick className="w-5 h-5" />
          {open ? "Yorumu gizle" : "Elleri saydık; tıkla, yorumu gör"}
        </button>
      </div>
    </div>
  );
}

/* Mini sınav: doğru yeşil, yanlış kırmızı */
type QuizItem = { q: string; options: string[]; correct: number; explain: string };

function Quiz({ item }: { item: QuizItem }) {
  const [picked, setPicked] = useState<number[]>([]);
  const solved = picked.includes(item.correct);
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-xl font-semibold text-white leading-snug mb-4">{item.q}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {item.options.map((o, i) => {
          const chosen = picked.includes(i);
          const cls = !chosen
            ? "border-white/15 text-gray-200 hover:border-[#06b6d4]/60"
            : i === item.correct
              ? "border-emerald-400 bg-emerald-500/20 text-emerald-100"
              : "border-red-400 bg-red-500/20 text-red-100";
          return (
            <button
              key={o}
              type="button"
              onClick={() => setPicked((p) => (p.includes(i) ? p : [...p, i]))}
              className={`flex items-start gap-3 text-left px-5 py-3 rounded-xl border bg-white/[0.02] text-base transition-all ${cls}`}
            >
              <span className="font-mono text-sm mt-0.5 opacity-70">{"ABCD"[i]}</span>
              <span>{o}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 min-h-[3rem] text-base leading-relaxed">
        {solved ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-300">
            {item.explain}
          </motion.div>
        ) : picked.length > 0 ? (
          <div className="text-red-300">Bu değil. Bir daha düşün.</div>
        ) : (
          <TapHint>bir şıkka tıkla</TapHint>
        )}
      </div>
    </div>
  );
}

/* Kendini dene: art arda sorular */
function QuizSet({ items }: { items: QuizItem[] }) {
  const [idx, setIdx] = useState(0);
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-xs font-mono uppercase tracking-widest text-[#67e8f9] mb-3">
        Soru {idx + 1} / {items.length}
      </div>
      <Quiz key={idx} item={items[idx]} />
      <div className="mt-2 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => setIdx((i) => Math.max(i - 1, 0))}
          disabled={idx === 0}
          className={BTN_CLASS}
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          Önceki soru
        </button>
        <button
          type="button"
          onClick={() => setIdx((i) => Math.min(i + 1, items.length - 1))}
          disabled={idx === items.length - 1}
          className={BTN_CLASS}
          style={BTN_STYLE}
        >
          Sonraki soru
        </button>
      </div>
    </div>
  );
}

/* Sınıf etkinliği: adımları tıklayarak işaretle */
function Checklist({ items }: { items: Array<{ title: string; text: string }> }) {
  const [done, setDone] = useState<number[]>([]);
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((it, i) => {
          const ok = done.includes(i);
          return (
            <button
              key={it.title}
              type="button"
              onClick={() => setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]))}
              aria-pressed={ok}
              className={`flex items-start gap-4 text-left rounded-xl p-5 border transition-all ${
                ok ? "border-emerald-400/70 bg-emerald-500/10" : "sgbh-card sgbh-card-hover"
              }`}
            >
              <span
                className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-mono text-sm border ${
                  ok ? "border-emerald-400 text-emerald-300" : "border-gray-600 text-gray-400"
                }`}
              >
                {ok ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
              </span>
              <span>
                <span className="block text-lg font-semibold text-white leading-snug">{it.title}</span>
                <span className="block mt-1 text-sm text-gray-400 leading-relaxed">{it.text}</span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-center gap-4">
        <TapHint>biten adıma tıkla</TapHint>
        <span className="text-xs font-mono text-gray-500">
          {done.length} / {items.length} adım tamam
        </span>
      </div>
    </div>
  );
}

/* Oyna-gör: her satıra doğru etiketi seç */
type SortItem = { text: string; correct: number; explain: string };

function ChipSort({ items, labels }: { items: SortItem[]; labels: string[] }) {
  const [picks, setPicks] = useState<Record<number, number>>({});
  return (
    <div className="max-w-4xl mx-auto space-y-2">
      {items.map((it, i) => {
        const p = picks[i];
        const ok = p === it.correct;
        return (
          <div key={it.text} className="sgbh-card rounded-xl px-5 py-2.5">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div className="flex-1 text-base text-gray-100 leading-snug">{it.text}</div>
              <div className="flex gap-2 flex-shrink-0">
                {labels.map((l, li) => {
                  const cls =
                    p !== li
                      ? "border-white/15 text-gray-300 hover:border-[#06b6d4]/60"
                      : ok
                        ? "border-emerald-400 bg-emerald-500/20 text-emerald-200"
                        : "border-red-400 bg-red-500/20 text-red-200";
                  return (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setPicks((s) => ({ ...s, [i]: li }))}
                      className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${cls}`}
                    >
                      {l}
                    </button>
                  );
                })}
              </div>
            </div>
            {p !== undefined && (
              <div className={`mt-2 text-sm leading-relaxed ${ok ? "text-emerald-300" : "text-red-300"}`}>
                {ok ? it.explain : "Bu değil. Bir daha düşün."}
              </div>
            )}
          </div>
        );
      })}
      <div className="text-center">
        <TapHint>her satır için bir etikete tıkla</TapHint>
      </div>
    </div>
  );
}

/* ============================================================
   HAFTAYA ÖZEL BİLEŞENLER
   ============================================================ */

const H2_SM = "md:text-4xl!";

type Vaka = {
  story: string;
  options: [string, string];
  correct: number;
  verdict: string;
  law: string;
  lawText: string;
  result: string;
};

/* Vaka: önce sınıf oylar, sonra "hangi kanun" ve "sonucu ne" kartları açılır */
function VakaKarti({ v }: { v: Vaka }) {
  const [vote, setVote] = useState<number | null>(null);
  const [showLaw, setShowLaw] = useState(false);
  const [showResult, setShowResult] = useState(false);
  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col gap-3">
        <div className="sgbh-card rounded-xl p-5 text-base md:text-lg text-gray-100 leading-relaxed">
          {v.story}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {v.options.map((o, i) => {
            const cls =
              vote === null
                ? "border-white/20 text-gray-100 hover:border-[#06b6d4]/70"
                : i === v.correct
                  ? "border-emerald-400 bg-emerald-500/20 text-emerald-100"
                  : i === vote
                    ? "border-red-400 bg-red-500/20 text-red-100"
                    : "border-white/10 text-gray-500";
            return (
              <button
                key={o}
                type="button"
                onClick={() => setVote(i)}
                className={`px-4 py-3 rounded-xl border bg-white/[0.02] text-base font-semibold transition-all ${cls}`}
              >
                {o}
              </button>
            );
          })}
        </div>
        <div className="min-h-[4.5rem] text-base leading-relaxed">
          {vote === null ? (
            <TapHint>sınıf oylasın, çoğunluğun dediğine tıkla</TapHint>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-300">
              {v.verdict}
            </motion.div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setShowLaw((s) => !s)}
          aria-expanded={showLaw}
          className="sgbh-card sgbh-card-hover rounded-xl p-4 text-left transition-all"
          style={showLaw ? { borderColor: "rgba(167,139,250,0.7)" } : undefined}
        >
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#c4b5fd]">
            <BookOpen className="w-4 h-4" />
            Hangi kanun?
          </div>
          {showLaw ? (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mt-2 text-lg font-semibold text-white leading-snug">{v.law}</div>
              <p className="mt-1 text-sm text-gray-300 leading-relaxed">{v.lawText}</p>
            </motion.div>
          ) : (
            <div className="mt-2">
              <TapHint>tahmin et, sonra tıkla</TapHint>
            </div>
          )}
        </button>
        <button
          type="button"
          onClick={() => setShowResult((s) => !s)}
          aria-expanded={showResult}
          className="sgbh-card sgbh-card-hover rounded-xl p-4 text-left transition-all"
          style={showResult ? { borderColor: "rgba(251,191,36,0.7)" } : undefined}
        >
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#fbbf24]">
            <Scale className="w-4 h-4" />
            Sonucu ne?
          </div>
          {showResult ? (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-gray-200 leading-relaxed"
            >
              {v.result}
            </motion.p>
          ) : (
            <div className="mt-2">
              <TapHint>tahmin et, sonra tıkla</TapHint>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

/* Oyna-gör: aynı işlem, izin var / izin yok */
function IzinToggle() {
  const [izin, setIzin] = useState<boolean | null>(null);
  const data = izin
    ? {
        title: "Sonuç: meslek (izinli güvenlik denetimi)",
        color: "#34d399",
        items: [
          "Sistemin sahibi yazılı izin verdi.",
          "Neye bakılacağı (kapsam) önceden belli.",
          "Bulduğunu yalnızca sistemin sahibine raporlarsın.",
        ],
      }
    : {
        title: "Sonuç: izinsiz erişim (TCK 243 gündeme gelir)",
        color: "#f87171",
        items: [
          "“İyi niyetliydim, açığı haber verecektim” demek yetmez.",
          "Kapsam yok; nerede duracağın belli değil.",
          "Doğru yol: sisteme girmeden, fark ettiğini sahibine bildirmek.",
        ],
      };
  return (
    <div className="max-w-4xl mx-auto">
      <div className="sgbh-card rounded-xl px-5 py-4 text-lg text-gray-100 text-center">
        İşlem: Bir şirketin internet sitesinde güvenlik açığı arıyorsun.
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setIzin(true)}
          aria-pressed={izin === true}
          className={`px-5 py-4 rounded-xl border text-lg font-semibold transition-all ${
            izin === true
              ? "border-emerald-400 bg-emerald-500/20 text-emerald-100"
              : "border-white/20 text-gray-200 hover:border-emerald-400/60"
          }`}
        >
          Yazılı izin var
        </button>
        <button
          type="button"
          onClick={() => setIzin(false)}
          aria-pressed={izin === false}
          className={`px-5 py-4 rounded-xl border text-lg font-semibold transition-all ${
            izin === false
              ? "border-red-400 bg-red-500/20 text-red-100"
              : "border-white/20 text-gray-200 hover:border-red-400/60"
          }`}
        >
          İzin yok
        </button>
      </div>
      <div className="mt-4 min-h-[11rem]">
        {izin === null ? (
          <div className="text-center pt-6">
            <TapHint>bir düğmeye tıkla, sonucu gör</TapHint>
          </div>
        ) : (
          <motion.div
            key={String(izin)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl p-5 border"
            style={{ borderColor: `${data.color}80`, background: `${data.color}12` }}
          >
            <div className="flex items-center gap-2 text-xl font-semibold" style={{ color: data.color }}>
              {izin ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
              {data.title}
            </div>
            <ul className="mt-3 space-y-1.5 text-base text-gray-200">
              {data.items.map((it) => (
                <li key={it} className="flex gap-2">
                  <ChevronRight className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: data.color }} />
                  {it}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   İÇERİK VERİSİ
   ============================================================ */

const VAKA_243: Vaka = {
  story:
    "Ece, arkadaşı Mert’in Instagram şifresini tahmin etti (doğum tarihiydi) ve hesabına girdi. Hiçbir şeyi değiştirmedi; baktı ve çıktı.",
  options: ["Suç", "Suç değil"],
  correct: 0,
  verdict: "Suç. “Sadece baktım” ya da “şaka yaptım” demek durumu değiştirmez; izinsiz girmek yeterlidir.",
  law: "TCK 243 · Bilişim sistemine girme",
  lawText: "Bir bilişim sistemine izinsiz girmek ya da orada kalmaya devam etmek suçtur.",
  result:
    "Hapis ya da adli para cezası öngörülür. Mesajları da okuduysa haberleşmenin gizliliğini ihlal ayrıca gündeme gelir.",
};

const VAKA_244: Vaka = {
  story:
    "Bir çalışan işten çıkarılınca sinirlendi. Hâlâ açık olan hesabıyla şirketin ortak klasöründeki müşteri dosyalarını sildi.",
  options: ["Suç", "Suç değil"],
  correct: 0,
  verdict: "Suç. Hesabın hâlâ açık olması, verileri silme ya da bozma hakkı vermez.",
  law: "TCK 244 · Sistemi engelleme, bozma, verileri yok etme",
  lawText: "Bir sistemin çalışmasını engellemek ya da bozmak; verileri silmek, değiştirmek, erişilmez kılmak suçtur.",
  result:
    "Hapis cezası öngörülür; yalnızca girmeye (243) göre daha ağırdır. Şirket ayrıca zararı için tazminat isteyebilir.",
};

const VAKA_245: Vaka = {
  story:
    "Kaan yolda bir banka kartı buldu. Marketten temassız ödemeyle iki kez alışveriş yaptı. “Zaten küçük tutarlar” diye düşündü.",
  options: ["Suç", "Suç değil"],
  correct: 0,
  verdict: "Suç. Tutarın küçük olması fark etmez; kart başkasına ait ve sahibinin izni yok.",
  law: "TCK 245 · Banka veya kredi kartlarının kötüye kullanılması",
  lawText:
    "Başkasının kartını ya da kart bilgilerini izinsiz kullanıp yarar sağlamak suçtur. Başkasının kart bilgisiyle internetten alışveriş de buraya girer.",
  result: "Hapis ve adli para cezası öngörülür. Doğru davranış: kartı bankaya teslim etmek.",
};

const VAKA_5651: Vaka = {
  story:
    "Bir kafe müşterilerine ücretsiz Wi-Fi veriyor. Bir müşteri bu ağdan birine tehdit mesajları gönderdi. Polis bağlantı kayıtlarını istedi; kafe hiç kayıt tutmamış.",
  options: ["Kafe de sorumlu", "Kafe sorumlu değil"],
  correct: 0,
  verdict: "Kafe de sorumlu. Tehdidi gönderen ayrıca yargılanır; ama kafe kayıt tutma yükümlülüğünü yerine getirmemiş.",
  law: "5651 sayılı Kanun · İnternet yayınları",
  lawText:
    "İnternette kimin neden sorumlu olduğunu belirler. Kafe, otel, okul gibi toplu internet kullandıran yerler erişim kayıtlarını tutmak zorundadır.",
  result:
    "Yükümlülüğe uymayan işletmeye idari para cezası verilebilir. Kayıt olmayınca asıl sorumluyu bulmak da zorlaşır.",
};

const VAKA_RIZA: Vaka = {
  story:
    "Bir spor salonu üyelik formunda telefon numaranı aldı. Bir ay sonra hiç tanımadığın bir firma “salon üyelerine özel indirim” diye seni aradı.",
  options: ["Hukuka aykırı", "Sorun yok, numarayı ben verdim"],
  correct: 0,
  verdict: "Hukuka aykırı. Numarayı üyelik için verdin; başka firmaya aktarılması için ayrıca açık rızan gerekirdi.",
  law: "KVKK (6698) · Kişisel veri ve açık rıza",
  lawText:
    "Kişisel veri: seni tanıtan her bilgi (ad, telefon, kimlik numarası, fotoğraf). Açık rıza: belirli bir konu için, bilgilendirildikten sonra, özgürce verdiğin onay.",
  result:
    "Önce salona yazılı başvurursun. Sonuç alamazsan Kişisel Verileri Koruma Kurulu’na şikâyet edersin; Kurul idari para cezası verebilir.",
};

const VAKA_IHLAL: Vaka = {
  story:
    "Bir alışveriş sitesinin müşteri listesi (ad, adres, telefon) internete sızdı. Şirket “duyulursa müşteri kaçar” diyerek kimseye haber vermedi.",
  options: ["Bildirmek zorunda", "Kendi kararı"],
  correct: 0,
  verdict: "Bildirmek zorunda. Şirket susarsa müşteriler kendini koruyamaz.",
  law: "KVKK (6698) · Veri güvenliği ve ihlal bildirimi",
  lawText:
    "Veriyi toplayan şirket onu korumak zorundadır. Sızıntı olursa en kısa sürede Kurul’a (uygulamada 72 saat içinde) ve verisi sızan kişilere bildirir.",
  result:
    "Bildirmeyen ya da önlem almayan şirkete idari para cezası verilebilir. Sen de parolanı değiştirir, sahte aramalara karşı dikkatli olursun.",
};

const VAKA_5070: Vaka = {
  story:
    "Ayşe bir internet aboneliği sözleşmesini e-imzasıyla imzaladı. İki ay sonra “Ben kâğıda imza atmadım, bu sözleşme geçersiz” dedi.",
  options: ["Ayşe haklı", "Ayşe haksız"],
  correct: 1,
  verdict: "Haksız. Güvenli elektronik imza, elle atılan imzayla aynı hukuki sonucu doğurur.",
  law: "5070 sayılı Kanun · Elektronik imza",
  lawText:
    "Güvenli e-imza, yetkili bir kuruluştan alınan sertifikayla atılır; kimin imzaladığını ve belgenin değişmediğini gösterir. İmzanın taranmış resmi e-imza değildir.",
  result:
    "Sözleşme geçerlidir ve Ayşe’yi bağlar. İstisna: kanunun resmî şekil aradığı bazı işlemler (örneğin tapu devri) e-imzayla yapılamaz.",
};

const MADDE_SORT: SortItem[] = [
  {
    text: "Kardeşinin e-posta hesabına şifresini deneyerek girdi.",
    correct: 0,
    explain: "243: izinsiz girdi, başka bir şey yapmadı.",
  },
  {
    text: "Okulun not sistemine girip kendi notunu değiştirdi.",
    correct: 1,
    explain: "244: girmekle kalmadı, veriyi değiştirdi.",
  },
  {
    text: "Başkasının kart bilgileriyle internetten oyun satın aldı.",
    correct: 2,
    explain: "245: başkasının kartını izinsiz kullanıp yarar sağladı.",
  },
  {
    text: "Bir siteye aşırı istek gönderip çalışmasını durdurdu.",
    correct: 1,
    explain: "244: sistemin çalışmasını engelledi.",
  },
];

const FINAL_QUIZ: QuizItem[] = [
  {
    q: "Arkadaşının hesabına şifresini tahmin ederek girdin ama hiçbir şeye dokunmadın. Durum nedir?",
    options: [
      "Suç değil, zarar vermedim",
      "Suçtur; izinsiz girmek yeterlidir",
      "Yalnızca KVKK’yı ilgilendirir",
      "Arkadaşım olduğu için sorun olmaz",
    ],
    correct: 1,
    explain: "TCK 243: bir bilişim sistemine izinsiz girmek tek başına suçtur.",
  },
  {
    q: "Bir şirketten müşteri verileri sızdı. Şirket ne yapmalı?",
    options: [
      "Duyulmaması için beklemeli",
      "Yalnızca sosyal medyadan özür dilemeli",
      "En kısa sürede Kurul’a ve verisi sızan kişilere bildirmeli",
      "Siteyi kapatıp yeni bir site açmalı",
    ],
    correct: 2,
    explain: "KVKK: veri sorumlusu ihlali en kısa sürede Kurul’a ve ilgili kişilere bildirir.",
  },
  {
    q: "Güvenli elektronik imza ile ilgili hangisi doğrudur?",
    options: [
      "İmzanın taranmış resmidir",
      "Elle atılan imzayla aynı hukuki sonucu doğurur",
      "Yalnızca devlet kurumları kullanabilir",
      "Hukuken hiçbir geçerliliği yoktur",
    ],
    correct: 1,
    explain: "5070 sayılı Kanun: güvenli e-imza, elle atılan imzayla aynı hukuki sonucu doğurur.",
  },
];

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ───── 1. Kapak ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2205 · 14. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="sgbh-shimmer">Bilişim Hukuku</span>
          <br />
          <span className="text-white/90 text-4xl md:text-5xl">Hangi tıklama suçtur?</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Yedi kısa vaka, dört kanun: önce sen karar ver, sonra kanunun ne dediğine bakalım.
        </Sub>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 max-w-4xl mx-auto text-left">
          <FeatureCard icon={Lock} title="TCK 243–245" desc="Bilişim suçları" delay={0.3} accent="#f87171" />
          <FeatureCard icon={Globe} title="5651" desc="İnternette sorumluluk" delay={0.4} accent="#06b6d4" />
          <FeatureCard icon={KeyRound} title="KVKK" desc="Kişisel verilerin korunması" delay={0.5} accent="#a78bfa" />
          <FeatureCard icon={FileSignature} title="5070" desc="Elektronik imza" delay={0.6} accent="#34d399" />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-6 inline-flex items-center gap-2 text-xs font-mono text-gray-500"
        >
          <Calendar className="w-3.5 h-3.5" />
          Çarşamba 13:30 — 17:00 · Farkındalık amaçlıdır, hukuki danışmanlık değildir
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. Sorun + sınıf oylaması ───── */
  () => (
    <SlideShell>
      <Eyebrow>Geçen haftalardan bu haftaya</Eyebrow>
      <H2 className={H2_SM}>Tekniği öğrendik; şimdi sınırı çizen kuralları öğreniyoruz</H2>
      <div className="mt-8">
        <Poll question="Kaçınız bir arkadaşının telefonuna ya da hesabına ondan habersiz baktı?">
          Çoğumuz bunu masum bir merak sayarız. Hukuk öyle bakmaz: izin yoksa, şaka da olsa,
          sorun başlar. Bugün yedi kısa vakayla sınırı birlikte çizeceğiz.
        </Poll>
      </div>
      <AskLine>Sence &ldquo;sadece baktım&rdquo; demek insanı kurtarır mı?</AskLine>
    </SlideShell>
  ),

  /* ───── 3. Benzetme + dört kanunun haritası ───── */
  () => (
    <SlideShell>
      <Eyebrow>Benzetme · mahalle ve kuralları</Eyebrow>
      <H2 className={H2_SM}>İnternet de bir mahalle: kurallarını dört kanun çizer</H2>
      <Sub className="mt-3 max-w-4xl text-base md:text-lg">
        Kapısı kilitli olmayan eve girmek de izinsiz girmektir. İnternette de &ldquo;şifresi kolaydı&rdquo;
        bir mazeret değildir. Hangi soruya hangi kanun cevap verir?
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5 max-w-4xl mx-auto">
        <RevealCard title="Biri hesabıma izinsiz girdi. Suç mu?" icon={Lock} accent="#f87171">
          <span className="text-white font-semibold">TCK 243–245.</span> Türk Ceza Kanunu&apos;nun bilişim
          suçları: izinsiz girmek, bozmak, kartı kötüye kullanmak.
        </RevealCard>
        <RevealCard title="İnternette kim neden sorumlu?" icon={Globe} accent="#06b6d4">
          <span className="text-white font-semibold">5651 sayılı Kanun.</span> İçeriği yazan, siteyi
          barındıran ve interneti sağlayanın sorumlulukları.
        </RevealCard>
        <RevealCard title="Telefon numaramı kim, ne için kullanabilir?" icon={KeyRound} accent="#a78bfa">
          <span className="text-white font-semibold">KVKK (6698).</span> Kişisel Verilerin Korunması Kanunu.
        </RevealCard>
        <RevealCard title="Ekrandan atılan imza geçerli mi?" icon={FileSignature} accent="#34d399">
          <span className="text-white font-semibold">5070 sayılı Kanun.</span> Elektronik İmza Kanunu.
        </RevealCard>
      </div>
      <AskLine>Bu dört sorudan hangisi senin ya da bir yakınının başına geldi?</AskLine>
    </SlideShell>
  ),

  /* ───── 4. Vaka 1 — TCK 243 ───── */
  () => (
    <SlideShell>
      <Eyebrow>Vaka 1 · izinsiz giriş</Eyebrow>
      <H2 className={H2_SM}>Arkadaşının Instagram şifresini tahmin edip girdi. Suç mu?</H2>
      <div className="mt-6">
        <VakaKarti v={VAKA_243} />
      </div>
      <AskLine>Hiçbir şeye dokunmamış olması durumu değiştirir mi?</AskLine>
    </SlideShell>
  ),

  /* ───── 5. Vaka 2 — TCK 244 ───── */
  () => (
    <SlideShell>
      <Eyebrow>Vaka 2 · veriyi silmek, bozmak</Eyebrow>
      <H2 className={H2_SM}>İşten ayrılırken şirketin dosyalarını sildi. Suç mu?</H2>
      <div className="mt-6">
        <VakaKarti v={VAKA_244} />
      </div>
      <AskLine>Hesabı hâlâ açıktı. Bu bir izin sayılır mı?</AskLine>
    </SlideShell>
  ),

  /* ───── 6. Vaka 3 — TCK 245 ───── */
  () => (
    <SlideShell>
      <Eyebrow>Vaka 3 · başkasının kartı</Eyebrow>
      <H2 className={H2_SM}>Bulduğu kartla temassız alışveriş yaptı. Suç mu?</H2>
      <div className="mt-6">
        <VakaKarti v={VAKA_245} />
      </div>
      <AskLine>Tutar küçük olunca suç olmaktan çıkar mı?</AskLine>
    </SlideShell>
  ),

  /* ───── 7. İzin çizgisi ───── */
  () => (
    <SlideShell>
      <Eyebrow>Sınır çizgisi · niyet değil, izin</Eyebrow>
      <H2 className={H2_SM}>Aynı işlem: izin varsa meslek, izin yoksa suç</H2>
      <div className="mt-6">
        <IzinToggle />
      </div>
      <AskLine>Okulun sitesinde bir açık fark etsen doğru yol ne olurdu?</AskLine>
    </SlideShell>
  ),

  /* ───── 8. Ara soru: hangi madde ───── */
  () => (
    <SlideShell>
      <Eyebrow>Ara soru · girmek, bozmak, kart</Eyebrow>
      <H2 className={H2_SM}>Hangi olay hangi maddeye girer?</H2>
      <div className="mt-6">
        <ChipSort items={MADDE_SORT} labels={["TCK 243", "TCK 244", "TCK 245"]} />
      </div>
      <AskLine>243 ile 244&apos;ü birbirinden ayıran şey ne?</AskLine>
    </SlideShell>
  ),

  /* ───── 9. Bölüm — internet, veri, imza ───── */
  () => (
    <SectionDivider
      num="02"
      total="02"
      title="İnternet, Veri, İmza"
      subtitle="Ceza kanunundan çıkıyoruz: internette sorumluluk (5651), kişisel verilerin korunması (KVKK) ve elektronik imza (5070)."
      bgGradient="linear-gradient(135deg,#a78bfa,#5b21b6)"
      shadow="0 30px 80px -20px rgba(167,139,250,0.6)"
      icon={<Scale className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 10. Vaka 4 — 5651 ───── */
  () => (
    <SlideShell>
      <Eyebrow>Vaka 4 · internette sorumluluk</Eyebrow>
      <H2 className={H2_SM}>Kafenin Wi-Fi ağından tehdit mesajı gönderildi. Kafe sorumlu mu?</H2>
      <div className="mt-6">
        <VakaKarti v={VAKA_5651} />
      </div>
      <AskLine>Okulun Wi-Fi ağına neden kendi kullanıcı adınla giriyorsun?</AskLine>
    </SlideShell>
  ),

  /* ───── 11. Vaka 5 — KVKK açık rıza ───── */
  () => (
    <SlideShell>
      <Eyebrow>Vaka 5 · kişisel veri ve açık rıza</Eyebrow>
      <H2 className={H2_SM}>Spor salonu numaranı başka bir firmaya verdi. Verebilir mi?</H2>
      <div className="mt-6">
        <VakaKarti v={VAKA_RIZA} />
      </div>
      <AskLine>En son hangi &ldquo;kabul ediyorum&rdquo; kutusunu okumadan işaretledin?</AskLine>
    </SlideShell>
  ),

  /* ───── 12. Vaka 6 — KVKK veri ihlali ───── */
  () => (
    <SlideShell>
      <Eyebrow>Vaka 6 · veri ihlali bildirimi</Eyebrow>
      <H2 className={H2_SM}>Müşteri listesi sızdı, şirket sustu. Susabilir mi?</H2>
      <div className="mt-6">
        <VakaKarti v={VAKA_IHLAL} />
      </div>
      <AskLine>Verilerinin sızdığını öğrensen ilk üç işin ne olurdu?</AskLine>
    </SlideShell>
  ),

  /* ───── 13. Vaka 7 — 5070 e-imza ───── */
  () => (
    <SlideShell>
      <Eyebrow>Vaka 7 · elektronik imza</Eyebrow>
      <H2 className={H2_SM}>&ldquo;Kâğıda imza atmadım, sözleşme geçersiz.&rdquo; Haklı mı?</H2>
      <div className="mt-6">
        <VakaKarti v={VAKA_5070} />
      </div>
      <AskLine>E-imzanı ve şifresini başkasına verirsen atılan imza kimin sayılır?</AskLine>
    </SlideShell>
  ),

  /* ───── 14. Sınıfta deneyelim ───── */
  () => (
    <SlideShell>
      <Eyebrow>Sınıfta deneyelim · 10 dakika · telefonla</Eyebrow>
      <H2 className={H2_SM}>Bu uygulama senden hangi veriyi istiyor?</H2>
      <div className="mt-6">
        <Checklist
          items={[
            { title: "Bir uygulama seç", text: "Sık kullandığın bir alışveriş, yemek ya da oyun uygulaması." },
            { title: "Aydınlatma metnini bul", text: "Ayarlar ya da üyelik ekranında “KVKK”, “Gizlilik” ya da “Aydınlatma Metni” başlığını ara." },
            { title: "Üç şeyi not et", text: "Hangi verilerini topluyor? Ne amaçla? Kimlerle paylaşıyor?" },
            { title: "Yan arkadaşınla karşılaştır", text: "Sana gereksiz gelen bir veri var mı? Açık rıza ayrı bir kutuyla mı isteniyor?" },
          ]}
        />
      </div>
      <AskLine>Bu metni üye olurken kaçınız okumuştu?</AskLine>
    </SlideShell>
  ),

  /* ───── 15. Kendini dene ───── */
  () => (
    <SlideShell>
      <Eyebrow>Kendini dene · 3 soru</Eyebrow>
      <H2 className={H2_SM}>Bugün ne öğrendik?</H2>
      <div className="mt-6">
        <QuizSet items={FINAL_QUIZ} />
      </div>
      <AskLine>Hangi soruda sınıf ikiye bölündü? Neden?</AskLine>
    </SlideShell>
  ),

  /* ───── 16. Aklında kalsın + köprü ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-5"
          style={{ background: "linear-gradient(135deg,#a78bfa,#5b21b6)", boxShadow: "0 30px 80px -20px rgba(167,139,250,0.6)" }}
        >
          <ShieldCheck className="w-8 h-8 text-white" />
        </motion.div>
        <Eyebrow>14. hafta tamamlandı</Eyebrow>
        <H2>
          <span className="sgbh-shimmer-soft">Aklında kalsın: 3 şey</span>
        </H2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-left">
          <FeatureCard
            icon={Lock}
            title="1 · İzin yoksa girme"
            desc="Şifreyi bilmen ya da tahmin etmen izin değildir. İzinsiz girmek, bozmak, kartı kullanmak suçtur (TCK 243–245)."
            accent="#f87171"
            delay={0.1}
          />
          <FeatureCard
            icon={KeyRound}
            title="2 · Kişisel veri sahibinindir"
            desc="Veri hangi amaçla alındıysa onun için kullanılır; sızarsa bildirilir (KVKK)."
            accent="#a78bfa"
            delay={0.2}
          />
          <FeatureCard
            icon={FileSignature}
            title="3 · İnternette kayıt ve imza kalır"
            desc="Toplu internet veren yer kayıt tutar (5651); e-imzan seni bağlar (5070)."
            accent="#34d399"
            delay={0.3}
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 inline-flex items-center gap-3 sgbh-card rounded-xl px-5 py-3 text-base text-gray-200"
        >
          <ChevronRight className="w-5 h-5 text-[#06b6d4] flex-shrink-0" />
          <span>
            <span className="text-white font-semibold">Gelecek hafta:</span> Final. Güvenlik denetimi raporunu nasıl yazar, nasıl sunarsın?
          </span>
        </motion.div>
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
          BVA 2205 · 14. Hafta · Türk Bilişim Hukuku Özeti
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
