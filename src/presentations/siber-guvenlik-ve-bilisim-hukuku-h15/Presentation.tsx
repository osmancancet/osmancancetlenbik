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
  Shield,
  FileText,
  Search,
  Gauge,
  Wrench,
  Mic,
  Award,
  Scale,
  Crosshair,
  Clock,
  AlertTriangle,
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

/* Adım adım ilerleyen şema */
type Step = { title: string; text: string; example: string; accent: string };

function Stepper({ steps }: { steps: Step[] }) {
  const [n, setN] = useState(1);
  const atEnd = n >= steps.length;
  return (
    <div className="max-w-4xl mx-auto">
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
      >
        {steps.map((s, i) =>
          i < n ? (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="sgbh-card rounded-xl p-4"
              style={{ borderColor: `${s.accent}70` }}
            >
              <div className="text-[11px] font-mono uppercase tracking-widest mb-2" style={{ color: s.accent }}>
                Adım {i + 1}
              </div>
              <div className="text-xl font-semibold text-white leading-snug">{s.title}</div>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">{s.text}</p>
              <p className="mt-3 text-sm text-gray-200 leading-relaxed border-l-2 pl-3" style={{ borderColor: s.accent }}>
                {s.example}
              </p>
            </motion.div>
          ) : (
            <div
              key={s.title}
              className="rounded-xl p-5 border border-dashed border-white/15 flex items-center justify-center min-h-[10rem] text-4xl font-mono text-white/20"
            >
              {i + 1}
            </div>
          ),
        )}
      </div>
      <div className="mt-5 flex justify-center">
        <button
          type="button"
          onClick={() => setN((v) => (v >= steps.length ? 1 : v + 1))}
          className={BTN_CLASS}
          style={BTN_STYLE}
        >
          <MousePointerClick className="w-5 h-5" />
          {atEnd ? "Baştan göster" : "İleri: sonraki adımı aç"}
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   HAFTAYA ÖZEL BİLEŞENLER
   ============================================================ */

const H2_SM = "md:text-4xl!";

/* Oyna-gör: iki soruya göre risk düzeyi */
function RiskPlay() {
  const [kolay, setKolay] = useState(false);
  const [zarar, setZarar] = useState(false);
  const sonuc =
    kolay && zarar
      ? { level: "Yüksek", color: "#f87171", ex: "Modem parolası admin / admin: herkes dener, giren tüm ağı yönetir." }
      : kolay
        ? { level: "Orta", color: "#fbbf24", ex: "Misafir Wi-Fi parolası herkesçe biliniyor; ama o ağda önemli bir cihaz yok." }
        : zarar
          ? { level: "Orta", color: "#fbbf24", ex: "Telefon güncellenmemiş: açık var, ama kullanmak uzmanlık ve fırsat ister." }
          : { level: "Düşük", color: "#34d399", ex: "Wi-Fi ağının adında soyadın yazıyor: tek başına zarar vermez." };
  const chip = (on: boolean) =>
    `px-5 py-3 rounded-xl border text-base font-semibold transition-all ${
      on ? "border-[#06b6d4] bg-[#06b6d4]/20 text-white" : "border-white/15 text-gray-400 hover:border-[#06b6d4]/60"
    }`;
  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
      <div className="sgbh-card rounded-xl p-5 space-y-5">
        <div>
          <div className="text-lg font-semibold text-white mb-2">1 · Gerçekleşmesi ne kadar kolay?</div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setKolay(false)} aria-pressed={!kolay} className={chip(!kolay)}>
              Zor
            </button>
            <button type="button" onClick={() => setKolay(true)} aria-pressed={kolay} className={chip(kolay)}>
              Kolay
            </button>
          </div>
        </div>
        <div>
          <div className="text-lg font-semibold text-white mb-2">2 · Olursa zararı ne kadar?</div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setZarar(false)} aria-pressed={!zarar} className={chip(!zarar)}>
              Az
            </button>
            <button type="button" onClick={() => setZarar(true)} aria-pressed={zarar} className={chip(zarar)}>
              Çok
            </button>
          </div>
        </div>
        <TapHint>seçenekleri değiştir, sonucu izle</TapHint>
      </div>
      <motion.div
        key={sonuc.level + sonuc.ex}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-xl p-6 border flex flex-col justify-center"
        style={{ borderColor: `${sonuc.color}80`, background: `${sonuc.color}12` }}
      >
        <div className="text-xs font-mono uppercase tracking-widest text-gray-400">Risk düzeyi</div>
        <div className="text-5xl font-bold mt-1" style={{ color: sonuc.color }}>
          {sonuc.level}
        </div>
        <p className="mt-4 text-base text-gray-200 leading-relaxed">Örnek: {sonuc.ex}</p>
      </motion.div>
    </div>
  );
}

/* Oyna-gör: kötü yazım ↔ iyi yazım */
function GoodBad() {
  const [iyi, setIyi] = useState(false);
  const rows = iyi
    ? [
        ["Ne bulundu?", "Ev modeminin yönetici paneline fabrika parolasıyla (admin / admin) girilebiliyor."],
        ["Risk düzeyi", "Yüksek: ağa bağlanan herkes modem ayarlarını değiştirebilir."],
        ["Öneri", "Yönetici parolasını en az 12 karakterli yeni bir parolayla değiştir."],
      ]
    : [
        ["Ne bulundu?", "Ağ güvensiz."],
        ["Risk düzeyi", "Çok tehlikeli!!!"],
        ["Öneri", "Güvenlik artırılmalı."],
      ];
  const color = iyi ? "#34d399" : "#f87171";
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setIyi(false)}
          aria-pressed={!iyi}
          className={`px-5 py-3 rounded-xl border text-lg font-semibold transition-all ${
            !iyi ? "border-red-400 bg-red-500/20 text-red-100" : "border-white/15 text-gray-400 hover:border-red-400/60"
          }`}
        >
          Kötü yazım
        </button>
        <button
          type="button"
          onClick={() => setIyi(true)}
          aria-pressed={iyi}
          className={`px-5 py-3 rounded-xl border text-lg font-semibold transition-all ${
            iyi ? "border-emerald-400 bg-emerald-500/20 text-emerald-100" : "border-white/15 text-gray-400 hover:border-emerald-400/60"
          }`}
        >
          İyi yazım
        </button>
      </div>
      <motion.div
        key={String(iyi)}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 rounded-xl border p-5 space-y-3"
        style={{ borderColor: `${color}70`, background: `${color}0d` }}
      >
        {rows.map(([k, v]) => (
          <div key={k} className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4">
            <div className="md:w-36 flex-shrink-0 text-xs font-mono uppercase tracking-widest" style={{ color }}>
              {k}
            </div>
            <div className="text-lg text-gray-100 leading-snug">{v}</div>
          </div>
        ))}
        <div className="pt-2 border-t border-white/10 text-sm text-gray-400">
          {iyi
            ? "Yer belli, gerekçe var, öneri bugün yapılabilir."
            : "Neresi? Neden tehlikeli? Kim, ne yapacak? Belli değil."}
        </div>
      </motion.div>
      <div className="mt-3 text-center">
        <TapHint>iki düğme arasında geç, farkı gör</TapHint>
      </div>
    </div>
  );
}

/* Tıklamalı zaman şeridi: 10 dakikalık sunum */
const TALK: Array<{ t: string; min: number; d: string; icon: LucideIcon; color: string }> = [
  { t: "Bağlam", min: 1, d: "Neye baktın, izni kimden aldın? Tek cümleyle söyle.", icon: Search, color: "#06b6d4" },
  { t: "Genel durum", min: 2, d: "Kaç bulgu var, kaçı yüksek riskli? Bulgular tablosunu göster.", icon: Gauge, color: "#67e8f9" },
  { t: "En önemli 3 bulgu", min: 4, d: "Her biri için: ne buldun, neden önemli, ne öneriyorsun. Kanıtını göster.", icon: AlertTriangle, color: "#f87171" },
  { t: "Öneriler", min: 2, d: "İlk yapılacak işler: kim, ne zaman yapacak?", icon: Wrench, color: "#34d399" },
  { t: "Soru", min: 1, d: "Hazır ol: “Kapsam dışında ne kaldı?” sorusu gelebilir.", icon: Mic, color: "#a78bfa" },
];

function TalkTimeline() {
  const [sel, setSel] = useState(0);
  const s = TALK[sel];
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex gap-2">
        {TALK.map((p, i) => (
          <button
            key={p.t}
            type="button"
            onClick={() => setSel(i)}
            aria-pressed={sel === i}
            className="rounded-xl border px-3 py-3 text-left transition-all min-w-0"
            style={{
              flexGrow: p.min + 1,
              flexBasis: 0,
              borderColor: sel === i ? p.color : "rgba(255,255,255,0.15)",
              background: sel === i ? `${p.color}22` : "rgba(255,255,255,0.02)",
            }}
          >
            <div className="text-xs font-mono" style={{ color: p.color }}>
              {p.min} dk
            </div>
            <div className="text-sm md:text-base font-semibold text-white leading-tight mt-1">{p.t}</div>
          </button>
        ))}
      </div>
      <motion.div
        key={sel}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 sgbh-card rounded-xl p-5 flex items-start gap-4"
        style={{ borderColor: `${s.color}70` }}
      >
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${s.color}18`, border: `1px solid ${s.color}55` }}
        >
          <s.icon className="w-6 h-6" style={{ color: s.color }} />
        </div>
        <div>
          <div className="text-xl font-semibold text-white">
            {s.t} · {s.min} dakika
          </div>
          <p className="mt-1 text-lg text-gray-300 leading-relaxed">{s.d}</p>
        </div>
      </motion.div>
      <div className="mt-3 flex items-center justify-between gap-4">
        <TapHint>parçalara sırayla tıkla</TapHint>
        <span className="text-sm text-gray-400 flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#06b6d4]" />
          Provanı süre tutarak yap; en önemli bulguyu sona bırakma.
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   İÇERİK VERİSİ
   ============================================================ */

const RAPOR_STEPS: Step[] = [
  {
    title: "Özet",
    text: "Yöneticinin okuyacağı 3–4 cümle.",
    example: "Ev ağımı inceledim; 5 bulgunun 1’i yüksek riskli.",
    accent: "#67e8f9",
  },
  {
    title: "Kapsam ve izin",
    text: "Neye baktın, izni kimden aldın?",
    example: "Yalnızca kendi modemim ve telefonum; cihazlar bana ait.",
    accent: "#a78bfa",
  },
  {
    title: "Bulgular tablosu",
    text: "Her satır bir bulgu.",
    example: "Ne bulundu · risk düzeyi · öneri",
    accent: "#fbbf24",
  },
  {
    title: "Sonuç",
    text: "Genel durum ve ilk işler.",
    example: "İlk iş: modem parolasını değiştirmek.",
    accent: "#34d399",
  },
];

const BULGU_SORT: SortItem[] = [
  {
    text: "Modemin yönetici parolası fabrika ayarında (admin / admin).",
    correct: 0,
    explain: "Yüksek. Öneri: Parolayı uzun, tahmin edilmesi zor bir parolayla değiştir.",
  },
  {
    text: "Telefonda üç aydır güncelleme yapılmamış.",
    correct: 1,
    explain: "Orta. Öneri: Güncellemeleri kur, otomatik güncellemeyi aç.",
  },
  {
    text: "Wi-Fi ağının adı ev sahibinin adını ve soyadını gösteriyor.",
    correct: 2,
    explain: "Düşük. Öneri: Ağ adını kişisel bilgi içermeyen bir adla değiştir.",
  },
];

const ONERI_QUIZ: QuizItem = {
  q: "Hangisi iyi yazılmış bir öneridir?",
  options: [
    "Daha dikkatli olunmalı.",
    "Güvenlik seviyesi yükseltilmeli.",
    "E-posta hesabında iki adımlı doğrulamayı aç.",
    "Gerekli önlemler alınmalı.",
  ],
  correct: 2,
  explain: "İyi öneri somuttur: okuyan kişi ne yapacağını bilir ve bugün yapabilir.",
};

const SUNUM_SORT: SortItem[] = [
  {
    text: "Bütün bulguları tek tek, sırayla okurum.",
    correct: 1,
    explain: "Yanlış. Süre yetmez: en önemli üç bulguyu anlat, kalanını tabloda göster.",
  },
  {
    text: "Her bulgu için kanıt gösteririm (ekran görüntüsü gibi).",
    correct: 0,
    explain: "Doğru. Kanıt bulgunun gerçek olduğunu gösterir. Parola gibi gizli bilgileri karart.",
  },
  {
    text: "Dinleyiciyi korkutursam beni daha ciddiye alır.",
    correct: 1,
    explain: "Yanlış. Panik değil plan bırak: her bulgunun yanında önerisi olsun.",
  },
  {
    text: "Bilmediğim soru gelirse “bilmiyorum, araştırıp dönerim” derim.",
    correct: 0,
    explain: "Doğru. Uydurmak güveni bitirir; dürüst cevap güven kazandırır.",
  },
];

const DONEM_QUIZ: QuizItem[] = [
  {
    q: "Raporda bir bulguyu yazarken hangisi mutlaka bulunmalıdır?",
    options: [
      "Kullandığın tüm araçların listesi",
      "Ne bulundu, risk düzeyi ve öneri",
      "Konunun uzun tarihçesi",
      "Dinleyiciyi korkutacak bir başlık",
    ],
    correct: 1,
    explain: "Bulgu satırı üç soruya cevap verir: ne bulundu, ne kadar riskli, ne yapmalı.",
  },
  {
    q: "Güvenlik denetimine başlamadan önce ilk iş nedir?",
    options: [
      "En güçlü aracı indirmek",
      "Sistemin sahibinden yazılı izin almak ve kapsamı belirlemek",
      "Sosyal medyada duyurmak",
      "Önce denemek, sonra izin istemek",
    ],
    correct: 1,
    explain: "İzin yoksa yapılan iş denetim değil, izinsiz erişimdir (TCK 243).",
  },
  {
    q: "Bir hastanenin sistemi fidye yazılımı yüzünden çalışmıyor. Güvenliğin hangi temel ilkesi en başta zarar gördü?",
    options: ["Gizlilik", "Bütünlük", "Erişilebilirlik", "Hiçbiri"],
    correct: 2,
    explain: "Erişilebilirlik: sistem ihtiyaç anında kullanılamıyor.",
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
        <Eyebrow>BVA 2205 · 15. Hafta · Final · Güz Dönemi</Eyebrow>
        <H1>
          <span className="sgbh-shimmer">Final</span>
          <br />
          <span className="text-white/90 text-4xl md:text-5xl">Raporunu yaz, 10 dakikada anlat</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Güvenlik denetimi raporu üç soruya cevap verir: ne buldun, ne kadar riskli, ne öneriyorsun?
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto text-left">
          <FeatureCard icon={FileText} title="Rapor" desc="Dört bölümlük basit şablon." delay={0.3} accent="#06b6d4" />
          <FeatureCard icon={Mic} title="Sunum" desc="10 dakikalık akış ve ipuçları." delay={0.45} accent="#a78bfa" />
          <FeatureCard icon={Award} title="Değerlendirme" desc="Ölçütler ve dönem tekrarı." delay={0.6} accent="#34d399" />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 inline-flex items-center gap-2 text-xs font-mono text-gray-500"
        >
          <Calendar className="w-3.5 h-3.5" />
          Çarşamba 13:30 — 17:00 · Final hazırlığı ve dönem kapanışı
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. Sorun + sınıf oylaması ───── */
  () => (
    <SlideShell>
      <Eyebrow>Neden rapor?</Eyebrow>
      <H2 className={H2_SM}>Bulmak işin yarısı; anlatamazsan kimse düzeltmez</H2>
      <div className="mt-8">
        <Poll question="Kaçınız doktordan ya da ustadan çıkıp “ne dedi, anlamadım” dedi?">
          Anlamadığın şeyi uygulayamazsın. Güvenlik raporu da böyledir: okuyan kişi
          ne yapacağını anlamazsa açık kapanmaz.
        </Poll>
      </div>
      <AskLine>Anlamadığın bir tavsiyeyi hiç uyguladın mı?</AskLine>
    </SlideShell>
  ),

  /* ───── 3. Benzetme: araç muayene raporu ───── */
  () => (
    <SlideShell>
      <Eyebrow>Benzetme · araç muayenesi</Eyebrow>
      <H2 className={H2_SM}>Güvenlik raporu, araç muayene raporu gibidir</H2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={Search}
          title="Ne bulundu?"
          desc="Muayene: “Sol arka lastik aşınmış.” Rapor: “Modem parolası fabrika ayarında.”"
          delay={0.15}
          accent="#06b6d4"
        />
        <FeatureCard
          icon={Gauge}
          title="Ne kadar tehlikeli?"
          desc="Muayene: ağır kusur, hafif kusur. Rapor: yüksek, orta, düşük risk."
          delay={0.3}
          accent="#fbbf24"
        />
        <FeatureCard
          icon={Wrench}
          title="Ne yapmalı?"
          desc="Muayene: “Lastiği değiştir.” Rapor: “Parolayı değiştir.”"
          delay={0.45}
          accent="#34d399"
        />
      </div>
      <AskLine>Muayene raporunda yalnızca &ldquo;araç kötü&rdquo; yazsaydı ne yapardın?</AskLine>
    </SlideShell>
  ),

  /* ───── 4. Rapor şablonu (adım adım) ───── */
  () => (
    <SlideShell>
      <Eyebrow>Rapor şablonu</Eyebrow>
      <H2 className={H2_SM}>Raporun dört bölümü var: sırayla yaz</H2>
      <div className="mt-6">
        <Stepper steps={RAPOR_STEPS} />
      </div>
      <AskLine>Raporu okuyan kişi tek bir bölüme bakacak olsa hangisine bakar?</AskLine>
    </SlideShell>
  ),

  /* ───── 5. Bulgular tablosu + risk tahmini ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bulgular tablosu · ne bulundu, risk düzeyi, öneri</Eyebrow>
      <H2 className={H2_SM}>Her bulgu bir satır: önce riski sen tahmin et</H2>
      <div className="mt-6">
        <ChipSort items={BULGU_SORT} labels={["Yüksek", "Orta", "Düşük"]} />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-3 text-sm text-gray-500 max-w-4xl mx-auto"
      >
        Risk düzeyi tartışılabilir; raporda önemli olan gerekçeni bir cümleyle yazman.
      </motion.p>
      <AskLine>Bu sıralamayı değiştirmek istesen hangi gerekçeyi yazardın?</AskLine>
    </SlideShell>
  ),

  /* ───── 6. Risk düzeyi nasıl belirlenir ───── */
  () => (
    <SlideShell>
      <Eyebrow>Risk düzeyi</Eyebrow>
      <H2 className={H2_SM}>Riski iki soru belirler: ne kadar kolay, ne kadar zararlı?</H2>
      <div className="mt-6">
        <RiskPlay />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-3 text-sm text-gray-500 max-w-4xl mx-auto"
      >
        Not: Sektörde bunun puanlı bir ölçeği de kullanılır (CVSS). Finalde üç düzey yeterli.
      </motion.p>
      <AskLine>Kendi telefonundaki en riskli ayar sence hangisi?</AskLine>
    </SlideShell>
  ),

  /* ───── 7. İyi / kötü bulgu yazımı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bulgu yazımı</Eyebrow>
      <H2 className={H2_SM}>Aynı bulgu iki şekilde yazılır: hangisi düzeltilir?</H2>
      <div className="mt-6">
        <GoodBad />
      </div>
      <AskLine>İyi yazımda olup kötü yazımda olmayan üç şey ne?</AskLine>
    </SlideShell>
  ),

  /* ───── 8. Ara soru ───── */
  () => (
    <SlideShell>
      <Eyebrow>Ara soru</Eyebrow>
      <H2 className={H2_SM}>Öneri yazmayı deneyelim</H2>
      <div className="mt-8">
        <Quiz item={ONERI_QUIZ} />
      </div>
      <AskLine>Diğer üç öneriyi nasıl düzeltirdin?</AskLine>
    </SlideShell>
  ),

  /* ───── 9. Bölüm — Sunum günü ───── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Sunum Günü"
      subtitle="Raporu yazdın; şimdi 10 dakikada anlatacaksın. Amaç korkutmak değil, ne yapılacağını göstermek."
      bgGradient="linear-gradient(135deg,#a78bfa,#5b21b6)"
      shadow="0 30px 80px -20px rgba(167,139,250,0.6)"
      icon={<Mic className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 10. 10 dakikalık akış ───── */
  () => (
    <SlideShell>
      <Eyebrow>Sunum · 10 dakikalık akış</Eyebrow>
      <H2 className={H2_SM}>10 dakikayı beşe böl: her parçanın işi ayrı</H2>
      <div className="mt-6">
        <TalkTimeline />
      </div>
      <AskLine>En çok süre hangi parçaya ayrılmış? Neden?</AskLine>
    </SlideShell>
  ),

  /* ───── 11. Sunum ipuçları: doğru / yanlış ───── */
  () => (
    <SlideShell>
      <Eyebrow>Sunum ipuçları</Eyebrow>
      <H2 className={H2_SM}>Sunumda bunu yapar mısın: doğru mu, yanlış mı?</H2>
      <div className="mt-6">
        <ChipSort items={SUNUM_SORT} labels={["Doğru", "Yanlış"]} />
      </div>
      <AskLine>Sunumda en çok hangisinden çekiniyorsun?</AskLine>
    </SlideShell>
  ),

  /* ───── 12. Değerlendirme ölçütleri ───── */
  () => (
    <SlideShell>
      <Eyebrow>Final · değerlendirme ölçütleri</Eyebrow>
      <H2 className={H2_SM}>Notun neye göre verilecek?</H2>
      <Sub className="mt-3 max-w-4xl text-base md:text-lg">
        Rapor ve sunum birlikte değerlendirilir. Çok bulgu bulmak tek başına yetmez; anlatım ve etik de puanlanır.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-5 sgbh-card rounded-xl p-1"
      >
        <table className="sgbh-tbl" style={{ fontSize: 15 }}>
          <thead>
            <tr>
              <th style={{ width: "24%" }}>Ölçüt</th>
              <th style={{ width: "12%" }}>Ağırlık</th>
              <th>Aranan</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Teknik doğruluk", "%30", "Bulgular gerçek ve tekrar gösterilebilir; risk düzeyi makul."],
              ["Rapor kalitesi", "%25", "Dört bölüm tam; bulgular açık ve kanıtlı; öneriler uygulanabilir."],
              ["Sunum", "%20", "Süre yönetimi, akış, sorulara cevap, anlaşılır dil."],
              ["Kapsam ve yöntem", "%15", "Belirlenen kapsamın dışına çıkmamak; adımların izlenebilir olması."],
              ["Etik ve hukuk", "%10", "İzin, veri gizliliği, bulguyu yalnızca sahibine bildirmek."],
            ].map(([k, w, d]) => (
              <tr key={k}>
                <td className="text-white font-semibold">{k}</td>
                <td>
                  <span className="font-mono text-[#67e8f9]">{w}</span>
                </td>
                <td>{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
      <AskLine>En çok puan hangi ölçütte? Bu sana ne söylüyor?</AskLine>
    </SlideShell>
  ),

  /* ───── 13. Sınıfta deneyelim ───── */
  () => (
    <SlideShell>
      <Eyebrow>Sınıfta deneyelim · 10 dakika · telefonla</Eyebrow>
      <H2 className={H2_SM}>Bir bulgu satırı yaz, arkadaşın okusun</H2>
      <div className="mt-6">
        <Checklist
          items={[
            { title: "Kendi telefonunda bir ayarı kontrol et", text: "Ekran kilidi, son güncelleme tarihi ya da bir hesabında iki adımlı doğrulama." },
            { title: "Bir bulgu satırı yaz", text: "Ne bulundu · risk düzeyi (gerekçesiyle) · öneri." },
            { title: "Yan arkadaşınla değiş", text: "O yalnızca yazdığını okusun; sen açıklama yapma." },
            { title: "Tek soru sor", text: "“Ne yapman gerektiğini anladın mı?” Anlamadıysa satırı yeniden yaz." },
          ]}
        />
      </div>
      <AskLine>Arkadaşın satırı okuyunca ne yapacağını anladı mı?</AskLine>
    </SlideShell>
  ),

  /* ───── 14. Dönem tekrarı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Dönem tekrarı · 15 hafta</Eyebrow>
      <H2 className={H2_SM}>Dönem tek karede: üç katman öğrendik</H2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6 max-w-4xl mx-auto">
        <RevealCard title="Temeller: güvenliğin dili" icon={Shield} accent="#06b6d4" hint="neler vardı? tıkla">
          Gizlilik, bütünlük, erişilebilirlik; ağ trafiği; şifreleme ve özet.
        </RevealCard>
        <RevealCard title="Saldırıyı tanı, savunmayı kur" icon={Crosshair} accent="#f87171" hint="neler vardı? tıkla">
          Web açıkları, sosyal mühendislik, zararlı yazılım; izinli denetim, bulut, izleme ve olay müdahalesi.
        </RevealCard>
        <RevealCard title="Hukuk ve etik: sınırı çiz" icon={Scale} accent="#a78bfa" hint="neler vardı? tıkla">
          TCK 243–245, 5651, KVKK, 5070; izin, kapsam, bulguyu sahibine bildirmek.
        </RevealCard>
      </div>
      <AskLine>Final raporunda bu üç katmanın her biri nerede karşına çıkıyor?</AskLine>
    </SlideShell>
  ),

  /* ───── 15. Kendini dene: dönem tekrarı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Kendini dene · dönem tekrarı · 3 soru</Eyebrow>
      <H2 className={H2_SM}>Finalden önce son kontrol</H2>
      <div className="mt-6">
        <QuizSet items={DONEM_QUIZ} />
      </div>
      <AskLine>Hangi soruda sınıf ikiye bölündü? Neden?</AskLine>
    </SlideShell>
  ),

  /* ───── 16. Aklında kalsın + kapanış ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-5"
          style={{ background: "linear-gradient(135deg,#06b6d4,#0e7490)", boxShadow: "0 30px 80px -20px rgba(6,182,212,0.6)" }}
        >
          <ShieldCheck className="w-8 h-8 text-white" />
        </motion.div>
        <Eyebrow>Dönem tamamlandı · 15 / 15</Eyebrow>
        <H2>
          <span className="sgbh-shimmer-soft">Aklında kalsın: 3 şey</span>
        </H2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-left">
          <FeatureCard
            icon={Scale}
            title="1 · Önce izin ve kapsam"
            desc="İzin almadan hiçbir sisteme bakma; raporun ikinci bölümü bunu gösterir."
            accent="#a78bfa"
            delay={0.1}
          />
          <FeatureCard
            icon={FileText}
            title="2 · Bulgu üç şey söyler"
            desc="Ne bulundu, ne kadar riskli, ne yapmalı. Okuyan kişi bugün uygulayabilmeli."
            accent="#06b6d4"
            delay={0.2}
          />
          <FeatureCard
            icon={Mic}
            title="3 · Panik değil plan bırak"
            desc="10 dakikada en önemli üç bulguyu anlat; her birinin yanında önerisi olsun."
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
            <span className="text-white font-semibold">Sırada:</span> Final sunumları. Raporunu tamamla, provanı süre tutarak yap.
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
          BVA 2205 · 15. Hafta · Final Rapor &amp; Sunum
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
