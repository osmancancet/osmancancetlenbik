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
  Shield,
  ShieldCheck,
  Lock,
  Unlock,
  Key,
  Building2,
  DoorOpen,
  Upload,
  Globe,
  Download,
  Copy,
  Clock,
  User,
  FileCheck,
  Smartphone,
  MapPin,
  GraduationCap,
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
   15. HAFTAYA ÖZEL OYNA-GÖR BİLEŞENLERİ
   ============================================================ */

/* En az yetki: role göre hangi kapılar açılır? */
function RolePlay() {
  const [role, setRole] = useState(0);
  const kapilar = ["Raporları gör", "Veri yükle", "Veri sil", "Kullanıcı ekle"];
  const roller = [
    { izin: [true, false, false, false], not: "Stajyer yalnız rapora bakar. Hata yapsa bile silebileceği bir şey yoktur.", iyi: true },
    { izin: [true, true, false, false], not: "Analist veri yükler ve rapor alır; silme ve kullanıcı işleri onun işi değildir.", iyi: true },
    { izin: [true, true, true, true], not: "Yönetici her kapıyı açar. Bu yüzden bu hesap az kişide olur ve en sıkı korunur.", iyi: true },
    { izin: [true, true, true, true], not: "Kolay ama tehlikeli: tek bir yanlış tıklama ya da çalınan tek bir şifre her şeyi götürür.", iyi: false },
  ];
  const r = roller[role];
  return (
    <Stage>
      <Chips
        options={["Stajyer", "Veri analisti", "Sistem yöneticisi", "Herkese tam yetki"]}
        value={role}
        onChange={setRole}
      />
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        {kapilar.map((k, i) => {
          const acik = r.izin[i];
          const color = !acik ? "#6b7280" : r.iyi ? "#22c55e" : "#ef4444";
          return (
            <motion.div
              key={k}
              animate={{ borderColor: `${color}88` }}
              className="rounded-xl border-2 p-4 text-center"
              style={{ background: `${color}14` }}
            >
              {acik ? (
                <Unlock className="w-8 h-8 mx-auto" style={{ color }} />
              ) : (
                <Lock className="w-8 h-8 mx-auto" style={{ color }} />
              )}
              <div className="mt-2 text-base font-semibold text-white">{k}</div>
              <div className="text-sm" style={{ color }}>
                {acik ? "açık" : "kilitli"}
              </div>
            </motion.div>
          );
        })}
      </div>
      <p className="mt-4 text-base md:text-lg text-gray-200 leading-relaxed">{r.not}</p>
    </Stage>
  );
}

/* Şifreleme: dosya çalınırsa hırsız ne görür? */
function EncryptPlay() {
  const [on, setOn] = useState(0);
  return (
    <Stage>
      <Chips options={["Şifreleme kapalı", "Şifreleme açık"]} value={on} onChange={setOn} />
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bvbb-card rounded-xl p-5">
          <div className="font-mono text-xs uppercase tracking-widest text-gray-500">Depodaki dosya</div>
          <div className="mt-3 space-y-1 text-lg text-gray-200">
            <div>Öğrenci: Ayşe Yılmaz</div>
            <div>Vize notu: 85</div>
            <div>Telefon: 0555 000 00 00</div>
          </div>
        </div>
        <motion.div
          key={on}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl border-2 p-5"
          style={{
            borderColor: on ? "#22c55e88" : "#ef444488",
            background: on ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)",
          }}
        >
          <div
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: on ? "#4ade80" : "#f87171" }}
          >
            Dosyayı çalan kişinin gördüğü
          </div>
          {on ? (
            <div className="mt-3 space-y-1 font-mono text-lg text-gray-400 break-all">
              <div>x9F#kQ2vL0pZr7Tn</div>
              <div>Aa81$mW3eYcB</div>
              <div>h5Rz0Qd7uJ2sKx4P</div>
            </div>
          ) : (
            <div className="mt-3 space-y-1 text-lg text-gray-200">
              <div>Öğrenci: Ayşe Yılmaz</div>
              <div>Vize notu: 85</div>
              <div>Telefon: 0555 000 00 00</div>
            </div>
          )}
        </motion.div>
      </div>
      <p className="mt-4 text-base md:text-lg text-gray-200 leading-relaxed">
        {on
          ? "Anahtar olmadan anlamsız karakterler. Veri iki yerde şifrelenir: depoda dururken ve internette yol alırken."
          : "Dosya olduğu gibi okunur. Çalan kişi her şeyi görür."}
      </p>
    </Stage>
  );
}

/* ============================================================
   SLAYTLAR
   ============================================================ */

const KIM = ["Sağlayıcı (ev sahibi)", "Biz, müşteri (kiracı)"];

const slides: Array<(active: boolean) => ReactNode> = [
  /* ─────────────────  1 · KAPAK  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2103 · 15. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="bvbb-shimmer">Bulutta</span>
          <br />
          <span className="text-white">Güvenlik ve Gizlilik</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Veri bulutta duruyor. Onu kim koruyor, sana hangi iş düşüyor? Sonunda dönemi birlikte tekrar ediyoruz.
        </Sub>
        <CoverChips
          items={[
            { name: "Kim sorumlu?", icon: Shield, color: "#2563eb" },
            { name: "Yetki, şifreleme, yedek", icon: Key, color: "#22c55e" },
            { name: "KVKK ve verinin konumu", icon: MapPin, color: "#f59e0b" },
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
      <H2>Bulutta en büyük açık çoğu zaman insandır</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta veriyi ve modeli buluta koyduk. Bu hafta soru şu: onları kim koruyor?
      </Sub>
      <Stage className="mt-6 space-y-3">
        <Reveal
          question="Kaçınız aynı şifreyi birden fazla hesapta kullanıyor?"
          hint="Eller kalktıktan sonra tıkla"
          answer="Bir sitedeki şifre sızarsa aynı şifreyi kullandığın bütün hesaplar açılır. Bulut hesapları da çoğu zaman böyle ele geçer."
        />
        <Reveal
          question="Buluttaki veri sızıntıları en çok nereden çıkar: usta bir saldırıdan mı, basit bir hatadan mı?"
          answer="Çoğu zaman basit hatadan: zayıf şifre, herkese fazla yetki, açık unutulan bir ayar. Bugünkü konuların hepsi bu hataları önlemek için."
        />
      </Stage>
      <AskLine>En önemli hesabının şifresini en son ne zaman değiştirdin?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  3 · PAYLAŞILAN SORUMLULUK  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Paylaşılan sorumluluk modeli</Eyebrow>
      <H2>Ev sahibi binayı, kiracı kapısını korur</H2>
      <div className="mt-8">
        <Versus
          left={{
            icon: Building2,
            tag: "Bulut sağlayıcı · ev sahibi",
            title: "Binanın kendisini korur",
            items: [
              "Veri merkezinin kapısı, kamerası, bekçisi",
              "Bilgisayarlar, diskler, kablolar",
              "Elektrik, soğutma ve altyapı",
            ],
          }}
          right={{
            icon: DoorOpen,
            tag: "Sen, müşteri · kiracı",
            title: "Kendi dairenin kapısını korursun",
            items: [
              "Şifreler ve kimin girebileceği",
              "Dosyaların açık mı, kapalı mı olduğu",
              "Verinin kendisi ve yedeği",
            ],
          }}
        />
      </div>
      <AskLine>Kapıyı açık bırakıp çıktın ve ev soyuldu. Suç ev sahibinde mi?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  4 · KİM SORUMLU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kim sorumlu? · 5 olay</Eyebrow>
      <Stage>
        <Quiz
          doneText="Bina sağlayıcının, kapı ve içerideki eşya senin. Ayar, şifre ve yetki hataları hep kiracıya yazar."
          items={[
            {
              q: "Veri merkezine gece hırsız girdi ve bir sunucuyu söktü.",
              options: KIM,
              correct: 0,
              why: "Binanın fiziksel güvenliği ev sahibinin, yani sağlayıcının işidir.",
            },
            {
              q: "Bir çalışanın bulut hesabı şifresi “123456” idi ve hesap ele geçirildi.",
              options: KIM,
              correct: 1,
              why: "Şifreyi kiracı seçer; zayıf şifre dairenin kapısını açık bırakmaktır.",
            },
            {
              q: "Müşteri listesinin durduğu depolama kovası “herkese açık” ayarlanmıştı.",
              options: KIM,
              correct: 1,
              why: "Kovayı kimin görebileceğini müşteri ayarlar; sağlayıcı bu ayarı senin yerine düzeltmez.",
            },
            {
              q: "Sunucudaki disk eskidi ve bozuldu.",
              options: KIM,
              correct: 0,
              why: "Donanımı sağlayıcı değiştirir. Ama verinin yedeğini almak yine senin işindir.",
            },
            {
              q: "Stajyere yönetici yetkisi verildi; yanlışlıkla bir veritabanını sildi.",
              options: KIM,
              correct: 1,
              why: "Kime hangi yetkinin verileceğine müşteri karar verir.",
            },
          ]}
        />
      </Stage>
      <AskLine>Tıklamadan önce: bu olay binada mı oldu, dairenin içinde mi?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  5 · EN AZ YETKİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Oyna-gör · en az yetki</Eyebrow>
      <H2>Herkese işine yetecek kadar anahtar ver</H2>
      <Sub className="mt-3 max-w-3xl">
        Kimlik ve erişim yönetimi (IAM): bulutta kimin hangi kapıyı açabileceğini belirleyen ayarlar.
      </Sub>
      <div className="mt-5">
        <RolePlay />
      </div>
      <AskLine>Apartman görevlisine neden her dairenin anahtarını vermiyoruz?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  6 · ARA SORU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Ara soru</Eyebrow>
      <Stage>
        <Quiz
          items={[
            {
              q: "Şifren bir şekilde çalındı. Hesabını yine de hangisi korur?",
              options: [
                "Şifreyi bir kâğıda yazıp ekrana yapıştırmak",
                "İki adımlı doğrulama: şifreden sonra telefona gelen kod",
                "Aynı şifreyi bütün hesaplarda kullanmak",
                "Hesaba daha seyrek girmek",
              ],
              correct: 1,
              why: "İki adımlı doğrulamada şifreyi bilen kişi telefonun olmadan içeri giremez.",
            },
          ]}
        />
      </Stage>
    </SlideShell>
  ),

  /* ─────────────────  7 · ŞİFRELEME  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Oyna-gör · şifreleme</Eyebrow>
      <H2>Şifreleme, veriyi kilitli kasaya koymaktır</H2>
      <div className="mt-5">
        <EncryptPlay />
      </div>
      <AskLine>Tarayıcıda adresin yanındaki kilit simgesi sana ne anlatıyor?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  8 · AÇIK KOVA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Adım adım · en sık yapılan hata</Eyebrow>
      <H2>Açık bırakılan kova nasıl sızıntıya döner?</H2>
      <Sub className="mt-3 max-w-3xl">
        Kova (bucket): bulutta dosyaların konduğu klasör. Yeni kova kapalı gelir; hata onu elle açınca başlar.
      </Sub>
      <Stage className="mt-5">
        <Stepper
          steps={[
            { icon: Upload, title: "Yükle", text: "Müşteri listesini kovaya yüklersin.", color: "#06b6d4" },
            { icon: Globe, title: "Herkese aç", text: "Arkadaşın kolay görsün diye “herkese açık” yaparsın.", color: "#f59e0b" },
            { icon: Download, title: "Sızıntı", text: "Adresi bulan herkes dosyayı indirir. Şifre sormaz.", color: "#ef4444" },
            { icon: Lock, title: "Doğrusu", text: "Kova kapalı kalır; yalnız gereken kişiye izin verilir.", color: "#22c55e" },
          ]}
        />
      </Stage>
      <AskLine>Bulut diskinde “bağlantıya sahip herkes” diye paylaştığın bir dosya var mı?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  9 · YEDEK  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Yedekleme</Eyebrow>
      <H2>Yedeğin yoksa verin de yok sayılır</H2>
      <Stage className="mt-6">
        <Reveal
          question="Telefonun bugün kaybolsa fotoğraflarına ne olur?"
          hint="Tahmin et, sonra tıkla"
          answer="Yedek açıksa yeni telefona geri gelir, kapalıysa gider. Bulutta da silinen ya da bozulan veri ancak yedekten döner."
        />
      </Stage>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <FeatureCard icon={Copy} title="Başka yerde kopya" desc="Yedek, asıl veriyle aynı yerde durmaz." accent="#06b6d4" />
        <FeatureCard icon={Clock} title="Otomatik" desc="Elle alınan yedek unutulur; zamanlanmış olsun." delay={0.1} accent="#22c55e" />
        <FeatureCard icon={RotateCcw} title="Geri yüklemeyi dene" desc="Hiç denenmemiş yedeğe güvenilmez." delay={0.2} accent="#f59e0b" />
      </div>
      <AskLine>Telefonun bugün kaybolsa neyi geri getiremezdin?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  10 · KVKK  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Gizlilik</Eyebrow>
      <H2>KVKK: kişisel veri sahibinindir</H2>
      <Sub className="mt-3 max-w-3xl">
        KVKK (Kişisel Verilerin Korunması Kanunu): bir insanı tanıtan bilgilerin nasıl toplanıp saklanacağını belirler.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <FeatureCard
          icon={User}
          title="Kişisel veri nedir?"
          desc="Ad, telefon, adres, sağlık bilgisi, fotoğraf: seni tanıtan her bilgi."
          accent="#06b6d4"
        />
        <FeatureCard
          icon={FileCheck}
          title="Amacını söyle, azını topla"
          desc="Veriyi ne için aldığını açıkça söylersin; işine yaramayanı hiç istemezsin."
          delay={0.1}
          accent="#22c55e"
        />
        <FeatureCard
          icon={ShieldCheck}
          title="Korumak senin görevin"
          desc="Veriyi toplayan kurum onu korumak zorundadır; buluta koymak sorumluluğu devretmez."
          delay={0.2}
          accent="#f59e0b"
        />
      </div>
      <AskLine>Bir uygulama senden işiyle ilgisi olmayan hangi bilgiyi istedi?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  11 · VERİNİN KONUMU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Verinin konumu</Eyebrow>
      <H2>Verin hangi ülkede duruyor?</H2>
      <Sub className="mt-3 max-w-3xl">
        Bulutta veriyi koyacağın bölgeyi (region: veri merkezlerinin bulunduğu yer) sen seçersin.
      </Sub>
      <Stage className="mt-6 space-y-3">
        <Reveal
          question="Bir hastane, hasta kayıtlarını dilediği ülkedeki veri merkezine koyabilir mi?"
          hint="Tahmin et, sonra tıkla"
          answer="Dilediği gibi koyamaz. KVKK kişisel verinin yurt dışına aktarılmasını şartlara bağlar. Bu yüzden bölge seçimi yalnız teknik değil, hukuki bir karardır."
        />
        <Reveal
          question="Bölge seçerken başka neye bakılır?"
          answer="Yakınlığa. Veri kullanıcıya ne kadar yakınsa uygulama o kadar hızlı açılır."
        />
      </Stage>
      <AskLine>Telefonundaki fotoğrafların yedeği şu an hangi ülkede olabilir?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  12 · SINIFTA DENEYELİM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sınıfta deneyelim · 10 dakika · telefonla</Eyebrow>
      <H2>Kendi hesabının güvenlik kontrolünü yap</H2>
      <div className="mt-6">
        <TrySteps
          steps={[
            "E-posta hesabının ayarlarında “Güvenlik” bölümünü aç.",
            "İki adımlı doğrulama açık mı? Hangi cihazlar oturum açmış görünüyor?",
            "Bulut diskinde paylaştığın bir dosyayı aç: “bağlantıya sahip herkes” mi?",
            "Bir şeyi düzelt ve ne yaptığını yanındakine anlat.",
          ]}
        />
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
        <Smartphone className="w-4 h-4 text-[#60a5fa]" />
        Kurulum gerekmez. Kimse şifresini ya da ekranını göstermek zorunda değil.
      </div>
      <AskLine>Bugün hesabında neyi düzelttin?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  13 · KENDİNİ DENE  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kendini dene · bu hafta · 3 soru</Eyebrow>
      <Stage>
        <Quiz
          doneText="Takıldığın soru varsa o slayda birlikte geri dönelim."
          items={[
            {
              q: "Paylaşılan sorumluluk modelinde müşterinin işi hangisidir?",
              options: [
                "Veri merkezinin kapısını korumak",
                "Bozulan diskleri değiştirmek",
                "Kimin hangi veriye erişeceğini ayarlamak",
                "Binanın elektriğini sağlamak",
              ],
              correct: 2,
              why: "Bina sağlayıcınındır; şifre, yetki ve ayarlar kiracının, yani müşterinindir.",
            },
            {
              q: "“En az yetki” ne demektir?",
              options: [
                "Herkese yönetici yetkisi vermek",
                "Herkese yalnız işine yetecek kadar yetki vermek",
                "Kimseye hiç yetki vermemek",
                "Yetkileri yılda bir kez dağıtmak",
              ],
              correct: 1,
              why: "Yetki ne kadar azsa bir hata ya da çalınan şifre o kadar az zarar verir.",
            },
            {
              q: "Şifrelenmiş bir dosya çalınırsa ne olur?",
              options: [
                "Çalan kişi her şeyi okur",
                "Dosya kendiliğinden silinir",
                "Anahtar olmadan anlamsız karakterler görünür",
                "Sağlayıcı dosyayı geri getirir",
              ],
              correct: 2,
              why: "Şifreleme çalınmayı engellemez ama çalınan veriyi okunmaz kılar.",
            },
          ]}
        />
      </Stage>
    </SlideShell>
  ),

  /* ─────────────────  14 · ÖZET  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Aklında kalsın: 3 şey</Eyebrow>
      <div className="mt-2 max-w-4xl">
        <ThreeThings
          items={[
            "Ev sahibi binayı, kiracı kapısını korur: şifre, yetki ve ayarlar senin sorumluluğun.",
            "Az yetki ver, iki adımlı doğrulamayı aç, veriyi şifrele, yedeğini al, kovayı açık bırakma.",
            "Kişisel veri sahibinindir; KVKK gereği nerede durduğunu ve kimin gördüğünü bilmek zorundasın.",
          ]}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 bvbb-card-sky rounded-xl p-5 max-w-4xl flex items-center gap-3"
      >
        <GraduationCap className="w-6 h-6 text-[#67e8f9] flex-shrink-0" />
        <span className="text-base md:text-lg text-gray-200">
          Bu son haftaydı. Şimdi dönemi baştan sona birlikte tekrar ediyoruz; sırada final var.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  15 · BÖLÜM: DÖNEM TEKRARI  ───────────────── */
  () => (
    <SectionDivider
      num="2"
      total="2"
      title="Dönemi toparlayalım"
      subtitle="Bulutun temelleri ve hizmet modelleri, depolama, Hadoop ile Spark, analitik, makine öğrenimi ve güvenlik: altı soruda bütün dönem."
      bgGradient="linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)"
      shadow="0 20px 60px -10px rgba(37, 99, 235, 0.55)"
      icon={<GraduationCap className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  16 · DÖNEM TEKRARI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kendini dene · dönemin tamamı · 6 soru</Eyebrow>
      <Stage>
        <Quiz
          doneText="Dönem bitti. Yanlış yaptığın sorunun haftasını finalden önce bir kez daha aç. Finalde başarılar."
          items={[
            {
              q: "Bulut bilişim en kısa hâliyle nedir?",
              options: [
                "Kendi sunucunu satın alıp odana kurmak",
                "Bilgisayar gücünü ve depolamayı internet üzerinden kiralamak",
                "Dosyaları USB bellekte taşımak",
                "İnternetsiz çalışan programlar",
              ],
              correct: 1,
              why: "Satın almak yerine kiralarsın, kullandığın kadar ödersin.",
            },
            {
              q: "Tarayıcıdan açıp kullandığın hazır e-posta uygulaması hangi hizmet modelidir?",
              options: [
                "IaaS: altyapı kiralarsın",
                "PaaS: geliştirme ortamı kiralarsın",
                "SaaS: hazır yazılımı kullanırsın",
                "Hiçbiri",
              ],
              correct: 2,
              why: "Kurulum ve sunucu derdi yok; hazır yazılımı kullanıyorsun, bu SaaS’tır.",
            },
            {
              q: "Bir banka bulutu yalnız kendisi kullanıyor, dışarıya kapalı. Bu hangi dağıtım modelidir?",
              options: ["Genel bulut", "Özel bulut", "Hibrit bulut", "Topluluk bulutu"],
              correct: 1,
              why: "Tek bir kuruma ayrılan bulut özel buluttur.",
            },
            {
              q: "Hadoop ve Spark hangi sorunu çözer?",
              options: [
                "Tek bilgisayara sığmayan veriyi birçok bilgisayara bölüp işlemeyi",
                "Şifrelerin unutulmasını",
                "İnternetin yavaşlamasını",
                "Ekran kartının ısınmasını",
              ],
              correct: 0,
              why: "Büyük veriyi böl, dağıt, kopyala; iş birçok makinede aynı anda yapılır.",
            },
            {
              q: "Veri gölü ile veri ambarının farkı hangisidir?",
              options: [
                "Göl küçük, ambar büyük veriler içindir",
                "Göl ham verinin atıldığı depodur, ambar düzenli tablolardır",
                "Göl ücretlidir, ambar ücretsizdir",
                "Aralarında fark yoktur",
              ],
              correct: 1,
              why: "Depo ile raflı market: biri her şeyi alır, diğeri düzenlenmiş veriyi sunar.",
            },
            {
              q: "Herkese açık bırakılan bir depolama kovasından veri sızdı. Sorumlu kim?",
              options: [
                "Bulut sağlayıcı",
                "Kovayı ayarlayan müşteri",
                "İnternet servis sağlayıcısı",
                "Hiç kimse",
              ],
              correct: 1,
              why: "Ev sahibi binayı, kiracı kapısını korur; ayar müşterinindir.",
            },
          ]}
        />
      </Stage>
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
          BVA 2103 · 15. Hafta · Bulutta Güvenlik ve Gizlilik
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
