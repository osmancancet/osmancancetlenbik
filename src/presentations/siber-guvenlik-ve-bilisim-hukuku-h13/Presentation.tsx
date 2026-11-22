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
  ShieldAlert,
  Fingerprint,
  Globe,
  Link2,
  Hash,
  Clock,
  CloudRain,
  Car,
  Megaphone,
  Users,
  Building2,
  Brain,
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
   İÇERİK VERİSİ
   ============================================================ */

const H2_SM = "md:text-4xl!";

const VBI_STEPS: Step[] = [
  {
    title: "Veri",
    text: "Ham kayıt. Tek başına bir şey söylemez.",
    example: "Gece 03.00’te 500 hatalı giriş denemesi var.",
    accent: "#67e8f9",
  },
  {
    title: "Bilgi",
    text: "Veriyi düzenler, anlam veririz.",
    example: "Denemelerin hepsi aynı adresten geliyor ve öğrenci hesaplarını hedefliyor.",
    accent: "#fbbf24",
  },
  {
    title: "İstihbarat",
    text: "Bağlam ekleriz: şimdi ne yapmalıyız?",
    example: "Bu adres başka kurumlara da saldırmış. Adresi engelle, öğrencilere parola uyarısı gönder.",
    accent: "#34d399",
  },
];

const VBI_SORT: SortItem[] = [
  {
    text: "Güvenlik duvarı kaydı: 203.0.113.7 adresinden bağlantı isteği geldi.",
    correct: 0,
    explain: "Veri: tek bir ham kayıt, henüz yorum yok.",
  },
  {
    text: "Bu hafta sahte e-postalar geçen haftanın iki katına çıktı.",
    correct: 1,
    explain: "Bilgi: kayıtlar sayılıp karşılaştırılmış; ama ne yapacağımızı söylemiyor.",
  },
  {
    text: "Sahte burs duyurusu e-postası üniversiteleri hedefliyor; öğrencileri bugün uyaralım.",
    correct: 2,
    explain: "İstihbarat: kimi hedeflediği ve ne yapılacağı belli.",
  },
  {
    text: "Sunucuda saat 02.14’te bir dosya değişti.",
    correct: 0,
    explain: "Veri: yalnızca ne olduğunu söylüyor; neden ve kim belli değil.",
  },
];

const IOC_QUIZ: QuizItem = {
  q: "Hangisi bir uzlaşma göstergesi (saldırı izi) değildir?",
  options: [
    "Bilinen zararlı bir dosyanın özet değeri",
    "Saldırıda kullanılan sahte alan adı",
    "Şirketin yeni açtığı şubenin adresi",
    "Gece yarısı yabancı bir ülkeden yönetici girişi",
  ],
  correct: 2,
  explain:
    "Şube adresi sıradan bir kurum bilgisidir, saldırı izi değildir. Diğer üçü sistemde ya da kayıtlarda görülen izlerdir.",
};

const SOURCE_SORT: SortItem[] = [
  {
    text: "USOM’un resmî sitesindeki güvenlik bildirimi",
    correct: 0,
    explain: "Resmî, tarihi ve sorumlusu belli bir kaynak.",
  },
  {
    text: "WhatsApp grubunda dolaşan “bu numaradan gelen aramayı açmayın” mesajı",
    correct: 1,
    explain: "Kimin, ne zaman yazdığı belli değil. Resmî bir kaynaktan kontrol et.",
  },
  {
    text: "Kullandığın programın üreticisinin kendi sitesindeki güncelleme duyurusu",
    correct: 0,
    explain: "Ürünü yapan firma kendi sitesinden duyuruyor.",
  },
  {
    text: "Sosyal medyada tarihsiz, kaynaksız bir ekran görüntüsü",
    correct: 1,
    explain: "Eski ya da uydurma olabilir; paylaşmadan önce doğrula.",
  },
];

const FINAL_QUIZ: QuizItem[] = [
  {
    q: "Aşağıdakilerden hangisi istihbarattır?",
    options: [
      "Sunucuya gece 100 istek geldi.",
      "İstekler geçen haftaya göre arttı.",
      "Artış bilinen bir saldırı dalgasıyla uyuşuyor; bu adresleri bugün engelleyelim.",
      "Sunucunun adı WEB-01’dir.",
    ],
    correct: 2,
    explain: "İstihbarat, bağlamı ve yapılacak işi birlikte verir.",
  },
  {
    q: "Türkiye’de ülke genelinde siber güvenlik uyarıları yayınlayan merkez hangisidir?",
    options: ["USOM", "KVKK", "TCK", "SIEM"],
    correct: 0,
    explain: "USOM: Ulusal Siber Olaylara Müdahale Merkezi. Kurumların kendi ekibine ise SOME denir.",
  },
  {
    q: "Kaynağı belli olmayan bir güvenlik uyarısı aldın. İlk işin ne olmalı?",
    options: [
      "Hemen herkese iletmek",
      "Resmî bir kaynaktan doğrulamak",
      "Uyarıdaki bağlantıya tıklayıp bakmak",
      "Görmezden gelmek",
    ],
    correct: 1,
    explain: "Önce doğrula, sonra paylaş. Doğrulanmamış uyarı gereksiz paniğe yol açar.",
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
        <Eyebrow>BVA 2205 · 13. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="sgbh-shimmer">Tehdit İstihbaratı</span>
          <br />
          <span className="text-white/90 text-4xl md:text-5xl">Tehlike gelmeden haberdar ol</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Hava durumuna bakıp şemsiye alır gibi: siber tehlikeyi önceden öğren,
          önlemini önceden al.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto text-left">
          <FeatureCard
            icon={Brain}
            title="Veri → bilgi → istihbarat"
            desc="Ham kayıt nasıl işe yarar bir habere dönüşür?"
            delay={0.3}
            accent="#06b6d4"
          />
          <FeatureCard
            icon={Fingerprint}
            title="Saldırının izleri"
            desc="Uzlaşma göstergesi (IOC) nedir, neye benzer?"
            delay={0.45}
            accent="#fbbf24"
          />
          <FeatureCard
            icon={Megaphone}
            title="Paylaşım"
            desc="USOM ve SOME: uyarıyı kim yayar, kim alır?"
            delay={0.6}
            accent="#34d399"
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 inline-flex items-center gap-2 text-xs font-mono text-gray-500"
        >
          <Calendar className="w-3.5 h-3.5" />
          Çarşamba 13:30 — 17:00 · Savunma ve farkındalık
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. Köprü + sınıf oylaması ───── */
  () => (
    <SlideShell>
      <Eyebrow>Geçen haftadan bu haftaya</Eyebrow>
      <H2 className={H2_SM}>Olaya müdahale ettik; peki gelmeden haber alabilir miydik?</H2>
      <div className="mt-8">
        <Poll question="Kaçınız sabah evden çıkmadan hava durumuna ya da yol durumuna bakıyor?">
          Bakıyoruz, çünkü tehlikeyi önceden bilmek ucuz, sonradan öğrenmek pahalı.
          Kurumlar da aynısını siber tehlikeler için yapar. Bunun adı{" "}
          <span className="text-white font-semibold">tehdit istihbaratı</span>.
        </Poll>
      </div>
      <AskLine>Yağmuru önceden bilmek sana ne kazandırıyor?</AskLine>
    </SlideShell>
  ),

  /* ───── 3. Benzetme ───── */
  () => (
    <SlideShell>
      <Eyebrow>Benzetme · hava durumu ve trafik haberi</Eyebrow>
      <H2 className={H2_SM}>Tehdit istihbaratı, siber dünyanın hava durumu ve trafik haberidir</H2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={CloudRain}
          title="Hava durumu"
          desc="Yağmur geliyor → şemsiyeni al."
          delay={0.15}
          accent="#67e8f9"
        />
        <FeatureCard
          icon={Car}
          title="Trafik haberi"
          desc="Köprüde kaza var → başka yoldan git."
          delay={0.3}
          accent="#fbbf24"
        />
        <FeatureCard
          icon={ShieldAlert}
          title="Tehdit istihbaratı"
          desc="Sahte kargo mesajı dolaşıyor → herkesi uyar, adresi engelle."
          delay={0.45}
          accent="#34d399"
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 sgbh-card rounded-xl px-5 py-4 text-lg text-gray-200 max-w-4xl"
      >
        <span className="text-[#67e8f9] font-semibold">Tanım:</span> Tehdit istihbaratı
        (threat intelligence), bir tehlike hakkında zamanında gelen ve karar vermeye yarayan bilgidir.
      </motion.div>
      <AskLine>Son zamanlarda telefonuna gelen hangi sahte mesaj herkese geliyordu?</AskLine>
    </SlideShell>
  ),

  /* ───── 4. Veri → bilgi → istihbarat (adım adım) ───── */
  () => (
    <SlideShell>
      <Eyebrow>Üç basamak</Eyebrow>
      <H2 className={H2_SM}>Ham kayıt tek başına haber değildir: veri → bilgi → istihbarat</H2>
      <Sub className="mt-3 max-w-4xl text-base md:text-lg">
        Termometre 2 derece gösteriyor (veri) → hava soğuyor (bilgi) → yarın yollar
        buzlanacak, erken çık (istihbarat).
      </Sub>
      <div className="mt-6">
        <Stepper steps={VBI_STEPS} />
      </div>
      <AskLine>Üçüncü adımı öncekilerden ayıran şey ne?</AskLine>
    </SlideShell>
  ),

  /* ───── 5. Oyna-gör: veri mi, bilgi mi, istihbarat mı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Sıra sizde</Eyebrow>
      <H2 className={H2_SM}>Sen karar ver: veri mi, bilgi mi, istihbarat mı?</H2>
      <div className="mt-6">
        <ChipSort items={VBI_SORT} labels={["Veri", "Bilgi", "İstihbarat"]} />
      </div>
      <AskLine>Bir bilgiyi istihbarata çevirmek için hangi soruyu sormalıyız?</AskLine>
    </SlideShell>
  ),

  /* ───── 6. Bölüm — Saldırının izleri ───── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Saldırının İzleri"
      subtitle="Hırsız kapıda ayak izi bırakır; saldırgan da sistemde iz bırakır. Bu izleri tanırsak bir sonrakini erken yakalarız."
      bgGradient="linear-gradient(135deg,#fbbf24,#b45309)"
      shadow="0 30px 80px -20px rgba(251,191,36,0.5)"
      icon={<Fingerprint className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 7. IOC örnekleri (tahmin et → tıkla) ───── */
  () => (
    <SlideShell>
      <Eyebrow>Uzlaşma göstergesi · IOC</Eyebrow>
      <H2 className={H2_SM}>Saldırı geride iz bırakır: uzlaşma göstergesi (IOC)</H2>
      <Sub className="mt-3 max-w-4xl text-base md:text-lg">
        IOC (Indicator of Compromise): bir sisteme girildiğini gösteren iz. Bu dört izi nerede görürdün?
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5 max-w-4xl mx-auto">
        <RevealCard title="Şüpheli internet adresi (IP)" icon={Globe} accent="#06b6d4">
          Sürekli hatalı giriş deneyen bir adres. Giriş kayıtlarında görülür; adres engellenir.
        </RevealCard>
        <RevealCard title="Sahte alan adı" icon={Link2} accent="#fbbf24">
          Bankanın adresine benzeyen ama bir harfi farklı adres. Mesajlardaki bağlantılarda görülür.
        </RevealCard>
        <RevealCard title="Zararlı dosyanın özeti (hash)" icon={Hash} accent="#a78bfa">
          Her dosyanın parmak izi gibi bir özet değeri vardır. Antivirüs, bilinen zararlıyı bu değerle tanır.
        </RevealCard>
        <RevealCard title="Olağandışı davranış" icon={Clock} accent="#f87171">
          Gece 03.00’te, hiç gitmediğin bir ülkeden hesabına giriş. Giriş kayıtlarında ve uyarı e-postalarında görülür.
        </RevealCard>
      </div>
      <AskLine>Instagram ya da e-posta sana hiç &ldquo;yeni cihazdan giriş yapıldı&rdquo; uyarısı gönderdi mi?</AskLine>
    </SlideShell>
  ),

  /* ───── 8. Ara soru ───── */
  () => (
    <SlideShell>
      <Eyebrow>Ara soru</Eyebrow>
      <H2 className={H2_SM}>İzleri tanıyor muyuz?</H2>
      <div className="mt-8">
        <Quiz item={IOC_QUIZ} />
      </div>
      <AskLine>Diğer üç izi hangi kayıtta arardın?</AskLine>
    </SlideShell>
  ),

  /* ───── 9. Kaynak güvenilirliği ───── */
  () => (
    <SlideShell>
      <Eyebrow>Kaynak güvenilirliği</Eyebrow>
      <H2 className={H2_SM}>Her habere inanma: önce kaynağına bak</H2>
      <Sub className="mt-3 max-w-4xl text-base md:text-lg">
        Üç soru sor: Kim söylüyor? Ne zaman söylemiş? Başka bir kaynak doğruluyor mu?
      </Sub>
      <div className="mt-5">
        <ChipSort items={SOURCE_SORT} labels={["Güvenilir", "Önce doğrula"]} />
      </div>
      <AskLine>Yanlış bir uyarıya inanıp harekete geçmenin zararı ne olabilir?</AskLine>
    </SlideShell>
  ),

  /* ───── 10. Paylaşım: USOM, SOME ───── */
  () => (
    <SlideShell>
      <Eyebrow>Paylaşım</Eyebrow>
      <H2 className={H2_SM}>Tek başına savunma olmaz: uyarıyı paylaş</H2>
      <Sub className="mt-3 max-w-4xl text-base md:text-lg">
        Mahallenin WhatsApp grubuna &ldquo;sokağa hırsız girdi&rdquo; yazan komşu herkesi korur.
        Kurumlar arasında bunu yapan yapılar var.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <FeatureCard
          icon={Megaphone}
          title="USOM"
          desc="Ulusal Siber Olaylara Müdahale Merkezi. Ülke genelinde uyarı yayınlar, zararlı bağlantıların listesini tutar."
          delay={0.15}
          accent="#06b6d4"
        />
        <FeatureCard
          icon={Building2}
          title="SOME"
          desc="Siber Olaylara Müdahale Ekibi. Kurumun kendi ekibidir: uyarıyı alır, önlemi uygular, gördüğü olayı bildirir."
          delay={0.3}
          accent="#fbbf24"
        />
        <FeatureCard
          icon={Users}
          title="Sen"
          desc="Şüpheli e-postayı silip geçme; bilgi işlem birimine haber ver. İlk uyarı çoğu zaman kullanıcıdan gelir."
          delay={0.45}
          accent="#34d399"
        />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-5 text-sm text-gray-500 max-w-4xl"
      >
        Not: Kurumlar bu bilgiyi bilgisayarların okuyabileceği ortak biçimlerle (STIX/TAXII) ve saldırgan
        davranışlarını sınıflayan ortak bir sözlükle (MITRE ATT&amp;CK) de paylaşır. Adını duyman yeterli.
      </motion.p>
      <AskLine>Okulda şüpheli bir e-posta alsan kime haber verirdin?</AskLine>
    </SlideShell>
  ),

  /* ───── 11. Bir uyarı geldi: kim ne yapar ───── */
  () => (
    <SlideShell>
      <Eyebrow>İstihbarattan eyleme</Eyebrow>
      <H2 className={H2_SM}>Bir uyarı geldi: kim ne yapar?</H2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-5 sgbh-card-warn rounded-xl px-5 py-4 text-lg text-gray-100 max-w-4xl mx-auto flex items-start gap-3"
      >
        <AlertTriangle className="w-6 h-6 text-[#f87171] flex-shrink-0 mt-0.5" />
        <span>
          Uyarı: Sahte kargo takip mesajı yayılıyor. Mesajdaki bağlantı sahte bir ödeme sayfasına gidiyor.
        </span>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 max-w-4xl mx-auto">
        <RevealCard title="Bilgi işlem ekibi" accent="#06b6d4">
          Sahte adresi engeller. Kayıtlara bakar: bu adrese giden olmuş mu?
        </RevealCard>
        <RevealCard title="Çalışan ya da öğrenci" accent="#34d399">
          Bağlantıya tıklamaz, mesajı bilgi işleme bildirir, arkadaşlarını uyarır.
        </RevealCard>
        <RevealCard title="Yönetici" accent="#fbbf24">
          Karar verir: herkese duyuru yapılır, gerekirse farkındalık eğitimi planlanır.
        </RevealCard>
      </div>
      <AskLine>Uyarı geldi ama kimse bir şey yapmadı. Bu istihbarat işe yaradı mı?</AskLine>
    </SlideShell>
  ),

  /* ───── 12. Sınıfta deneyelim ───── */
  () => (
    <SlideShell>
      <Eyebrow>Sınıfta deneyelim · 10 dakika · ikişerli · telefonla</Eyebrow>
      <H2 className={H2_SM}>USOM&apos;da bugün hangi uyarı var?</H2>
      <div className="mt-6">
        <Checklist
          items={[
            { title: "usom.gov.tr adresini aç", text: "Adresi elle yaz; arama sonucundaki reklam bağlantılarına tıklama." },
            { title: "Bir güvenlik bildirimi seç", text: "Başlığını ve tarihini not et." },
            { title: "Üç soruya cevap ver", text: "Hangi ürün ya da konu? Kimi etkiler? Ne yapmamız öneriliyor?" },
            { title: "Sınıfla paylaş", text: "Bir cümleyle anlat: bu veri mi, bilgi mi, istihbarat mı?" },
          ]}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 sgbh-card-warn rounded-lg px-4 py-3 text-sm text-gray-200 flex items-start gap-3 max-w-4xl mx-auto"
      >
        <AlertTriangle className="w-4 h-4 text-[#f87171] mt-0.5 flex-shrink-0" />
        <span>
          Sitedeki zararlı bağlantı listesindeki adresleri açma. O liste engellemek için tutulur, ziyaret etmek için değil.
        </span>
      </motion.div>
      <AskLine>Seçtiğin uyarı bu okuldaki birini etkiler mi?</AskLine>
    </SlideShell>
  ),

  /* ───── 13. Kendini dene ───── */
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

  /* ───── 14. Aklında kalsın + köprü ───── */
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
        <Eyebrow>13. hafta tamamlandı</Eyebrow>
        <H2>
          <span className="sgbh-shimmer-soft">Aklında kalsın: 3 şey</span>
        </H2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-left">
          <FeatureCard
            icon={Brain}
            title="1 · İstihbarat, harekete geçiren bilgidir"
            desc="Veri ham kayıttır. İstihbarat “şimdi ne yapmalıyız” sorusunu cevaplar."
            accent="#06b6d4"
            delay={0.1}
          />
          <FeatureCard
            icon={Fingerprint}
            title="2 · Saldırı iz bırakır"
            desc="Şüpheli adres, sahte alan adı, dosya özeti, olağandışı giriş: bunlar uzlaşma göstergesidir (IOC)."
            accent="#fbbf24"
            delay={0.2}
          />
          <FeatureCard
            icon={Megaphone}
            title="3 · Doğrula, sonra paylaş"
            desc="Önce kaynağa bak, sonra haber ver. USOM ülkeyi, SOME kurumu uyarır."
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
            <span className="text-white font-semibold">Gelecek hafta:</span> İzinsiz girişin hukuktaki karşılığı ne? Hangi tıklama suçtur?
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
          BVA 2205 · 13. Hafta · Tehdit İstihbaratı
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
