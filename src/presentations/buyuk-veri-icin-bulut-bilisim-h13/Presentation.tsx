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
  Smartphone,
  HelpCircle,
  Database,
  BarChart3,
  ShoppingCart,
  HardDrive,
  Search,
  Warehouse,
  Waves,
  Table,
  Users,
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
   13. HAFTAYA ÖZEL OYNA-GÖR BİLEŞENLERİ
   ============================================================ */

const SATIS = [
  { sehir: "Manisa", toplam: 4200 },
  { sehir: "İzmir", toplam: 3100 },
  { sehir: "Aydın", toplam: 1800 },
  { sehir: "Uşak", toplam: 900 },
];

/* CSV mi Parquet mi: aynı soruda hangi hücreler okunur? */
function FormatPlay() {
  const [mode, setMode] = useState(0);
  const cols = ["tarih", "sehir", "urun", "tutar"];
  const rows = [
    ["3 Mart", "Manisa", "Çay", "40"],
    ["3 Mart", "İzmir", "Tost", "90"],
    ["4 Mart", "Manisa", "Simit", "25"],
    ["4 Mart", "Aydın", "Çay", "40"],
    ["5 Mart", "İzmir", "Ayran", "30"],
  ];
  const parquet = mode === 1;
  return (
    <Stage>
      <Chips options={["CSV ile oku", "Parquet ile oku"]} value={mode} onChange={setMode} />
      <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-5 items-center">
        <div className="md:col-span-3 bvbb-card rounded-xl p-4">
          <div className="grid grid-cols-4 gap-1.5 text-center text-sm">
            {cols.map((c) => (
              <div key={c} className="font-mono text-xs uppercase text-gray-500 pb-1">
                {c}
              </div>
            ))}
            {rows.map((r, ri) =>
              r.map((cell, ci) => {
                const read = !parquet || ci === 3;
                return (
                  <motion.div
                    key={`${ri}-${ci}`}
                    animate={{
                      backgroundColor: read ? "rgba(245,158,11,0.28)" : "rgba(255,255,255,0.03)",
                      color: read ? "#fde68a" : "#6b7280",
                    }}
                    className="rounded-md py-1.5"
                  >
                    {cell}
                  </motion.div>
                );
              }),
            )}
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="text-sm text-gray-400">Soru: toplam tutar ne kadar?</div>
          <div className="mt-2 text-4xl font-bold text-white">
            {parquet ? "5" : "20"}
            <span className="text-xl font-medium text-gray-400"> / 20 hücre okundu</span>
          </div>
          <p className="mt-3 text-base text-gray-300 leading-relaxed">
            {parquet
              ? "Parquet veriyi sütun sütun saklar. Yalnız “tutar” sütununu açar, gerisine dokunmaz."
              : "CSV veriyi satır satır saklar. Tek sütun gerekse bile bütün satırları baştan sona okur."}
          </p>
        </div>
      </div>
    </Stage>
  );
}

/* Sorgu başına ödeme: sorgu değişince taranan veri ve fatura değişir */
function CostPlay() {
  const [pick, setPick] = useState(0);
  const options = [
    {
      sql: "SELECT * FROM satislar;",
      pct: 100,
      level: "Çok",
      note: "Bütün tabloyu tarar. Taksimetre en uzun yoldan gider.",
    },
    {
      sql: "SELECT sehir, tutar FROM satislar;",
      pct: 40,
      level: "Orta",
      note: "Yalnız iki sütunu tarar. Gerekmeyen sütunlara para ödemezsin.",
    },
    {
      sql: "SELECT sehir, tutar FROM satislar WHERE ay = 'Mart';",
      pct: 10,
      level: "Az",
      note: "İki sütun ve yalnız Mart klasörü. En kısa yol, en küçük fatura.",
    },
  ];
  const o = options[pick];
  const color = pick === 0 ? "#ef4444" : pick === 1 ? "#f59e0b" : "#22c55e";
  return (
    <Stage>
      <Chips
        options={["Her şeyi getir", "Yalnız 2 sütun", "2 sütun + yalnız bu ay"]}
        value={pick}
        onChange={setPick}
      />
      <div className="mt-4 bvbb-query-body rounded-xl" style={{ fontSize: 18 }}>
        {o.sql}
      </div>
      <div className="mt-4 bvbb-card rounded-xl p-5">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>Taranan veri (fatura da buna göre)</span>
          <span className="text-xl font-bold" style={{ color }}>
            {o.level}
          </span>
        </div>
        <div className="mt-3 h-6 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            animate={{ width: `${o.pct}%`, backgroundColor: color }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="mt-3 text-base text-gray-200">{o.note}</p>
      </div>
      <div className="mt-2 text-xs text-gray-600">
        Temsili gösterim: veri Parquet biçiminde ve aylara göre klasörlenmiş kabul edildi.
      </div>
    </Stage>
  );
}

/* Aynı sonuç: tablo mu, grafik mi? */
function TableChartPlay() {
  const [mode, setMode] = useState(0);
  const max = SATIS[0].toplam;
  const karisik = [SATIS[2], SATIS[0], SATIS[3], SATIS[1]];
  return (
    <Stage>
      <Chips options={["Tablo olarak göster", "Grafik olarak göster"]} value={mode} onChange={setMode} />
      <div className="mt-4 bvbb-card rounded-xl p-5 min-h-[220px]">
        {mode === 0 ? (
          <div className="grid grid-cols-2 gap-y-2 text-lg">
            <div className="font-mono text-xs uppercase text-gray-500">sehir</div>
            <div className="font-mono text-xs uppercase text-gray-500">toplam</div>
            {karisik.map((s) => (
              <div key={s.sehir} className="contents">
                <div className="text-gray-200">{s.sehir}</div>
                <div className="text-gray-200">{s.toplam}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {karisik.map((s) => (
              <div key={s.sehir} className="flex items-center gap-3">
                <div className="w-20 text-base text-gray-200">{s.sehir}</div>
                <div className="flex-1 h-7 rounded bg-white/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded"
                    initial={{ width: 0 }}
                    animate={{ width: `${(s.toplam / max) * 100}%` }}
                    transition={{ duration: 0.6 }}
                    style={{ background: "linear-gradient(90deg, #2563eb, #60a5fa)" }}
                  />
                </div>
                <div className="w-14 text-right text-sm text-gray-400">{s.toplam}</div>
              </div>
            ))}
          </div>
        )}
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
        <Eyebrow>BVA 2103 · 13. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="bvbb-shimmer">Bulutta</span>
          <br />
          <span className="text-white">Veri Analitiği</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Veriyi biriktirdik. Bugün ona soru sormayı ve cevabını almayı öğreniyoruz.
        </Sub>
        <CoverChips
          items={[
            { name: "Veri gölü ve ambarı", icon: HardDrive, color: "#22c55e" },
            { name: "Sunucusuz sorgu", icon: Search, color: "#2563eb" },
            { name: "Grafik ve pano", icon: BarChart3, color: "#f59e0b" },
          ]}
        />
        <CoverFooter />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  2 · SORUN / EL KALDIR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>El kaldır</Eyebrow>
      <H2>Telefonun seni zaten analiz ediyor</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen haftalarda büyük veriyi Hadoop ve Spark ile işledik. Şimdi o veriye soru soruyoruz.
      </Sub>
      <Stage className="mt-6 space-y-3">
        <Reveal
          question="Kaçınız geçen hafta en çok hangi uygulamada vakit geçirdiğini biliyor?"
          hint="Eller kalktıktan sonra tıkla"
          answer="Telefonun biliyor. Her açtığın uygulamayı kaydediyor (veri), sonra “en çok hangisi?” diye soruyor (sorgu) ve sana grafik gösteriyor (rapor). Bu üçü birlikte analitiktir."
        />
        <Reveal
          question="Aynı işi milyonlarca müşterisi olan bir market zinciri nerede yapar?"
          answer="Bulutta. Veri tek bilgisayara sığmaz; saklamayı da sorgulamayı da kiralık bulut hizmetleri yapar. Bugünün konusu bu."
        />
      </Stage>
      <AskLine>Ekran süresi raporu olmasa kendinle ilgili neyi fark etmezdin?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  3 · ANALİTİK NEDİR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kavram</Eyebrow>
      <H2>Analitik, veriye soru sorup cevap almaktır</H2>
      <Sub className="mt-3 max-w-3xl">
        Veri analitiği (data analytics): elindeki kayıtlara bakıp karar vermeye yarayan cevabı bulmak.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={HelpCircle}
          title="1. Soru"
          desc="Kantinde en çok ne satılıyor? Hangi saatte kuyruk oluyor?"
          accent="#06b6d4"
        />
        <FeatureCard
          icon={Database}
          title="2. Veri"
          desc="Kasadan çıkan her fiş bir kayıttır. Cevap bu kayıtların içinde durur."
          delay={0.1}
          accent="#22c55e"
        />
        <FeatureCard
          icon={BarChart3}
          title="3. Cevap"
          desc="Öğlen tost bitiyor. Karar: öğlene daha çok tost hazırla."
          delay={0.2}
          accent="#f59e0b"
        />
      </div>
      <AskLine>Kantinci sen olsan veriye ilk hangi soruyu sorardın?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  4 · VERİNİN YOLCULUĞU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Adım adım</Eyebrow>
      <H2>Verinin yolculuğu dört duraktan geçer</H2>
      <Stage className="mt-8">
        <Stepper
          steps={[
            { icon: ShoppingCart, title: "Topla", text: "Kasada her satış bir kayıt olur.", color: "#06b6d4" },
            { icon: HardDrive, title: "Sakla", text: "Kayıtlar bulutta ucuz bir depoya konur.", color: "#22c55e" },
            { icon: Search, title: "Sorgula", text: "Depodaki veriye soru sorulur.", color: "#a855f7" },
            { icon: BarChart3, title: "Göster", text: "Cevap grafik olur, müdür karar verir.", color: "#f59e0b" },
          ]}
        />
      </Stage>
      <AskLine>Market fişi bu dört durağın hangisinde doğar, hangisinde işe yarar?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  5 · GÖL vs AMBAR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Benzetme</Eyebrow>
      <H2>Veri gölü depodur, veri ambarı raflı market</H2>
      <div className="mt-8">
        <Versus
          left={{
            icon: Waves,
            tag: "Veri gölü (data lake)",
            title: "Her şeyin atıldığı büyük depo",
            items: [
              "Veri ham hâliyle, olduğu gibi girer",
              "Fotoğraf, kayıt dosyası, tablo: hepsi olur",
              "Saklaması ucuz, aradığını bulmak emek ister",
            ],
          }}
          right={{
            icon: Warehouse,
            tag: "Veri ambarı (data warehouse)",
            title: "Rafları düzenli market",
            items: [
              "Veri temizlenip tablolara dizilir",
              "Her ürünün rafı ve etiketi bellidir",
              "Soruya cevap hızlıdır, hazırlamak emek ister",
            ],
          }}
        />
      </div>
      <AskLine>Aradığın bir şeyi depoda mı daha çabuk bulursun, markette mi? Neden?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  6 · GÖLE Mİ AMBARA MI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Birlikte karar verelim</Eyebrow>
      <Stage>
        <Quiz
          doneText="Ham ve karışık olan göle, temiz ve hazır olan ambara gider."
          items={[
            {
              q: "Mağazadaki güvenlik kameralarının kayıtları nereye konur?",
              options: ["Veri gölü (depo)", "Veri ambarı (raflı market)"],
              correct: 0,
              why: "Video ham ve büyük bir dosyadır, tabloya dizilmez; ucuz depoda durur.",
            },
            {
              q: "Müdürün her sabah baktığı, şehir şehir düzenlenmiş satış tablosu nereye konur?",
              options: ["Veri gölü (depo)", "Veri ambarı (raflı market)"],
              correct: 1,
              why: "Temiz, sütunları belli ve sık sorulan veri ambarın işidir.",
            },
            {
              q: "Uygulamanın tuttuğu ham kayıt dosyaları (log) nereye konur?",
              options: ["Veri gölü (depo)", "Veri ambarı (raflı market)"],
              correct: 0,
              why: "Ne işe yarayacağı henüz belli olmayan ham veri önce göle atılır.",
            },
            {
              q: "Temizlenmiş, tekrarları silinmiş müşteri listesi nereye konur?",
              options: ["Veri gölü (depo)", "Veri ambarı (raflı market)"],
              correct: 1,
              why: "Düzenlenmiş ve sorguya hazır veri raftadır, yani ambarda.",
            },
          ]}
        />
      </Stage>
      <AskLine>Şıkka tıklamadan önce: neden öyle düşündün?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  7 · CSV vs PARQUET  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Oyna-gör · dosya biçimi</Eyebrow>
      <H2>CSV her şeyi okur, Parquet yalnız gerekeni</H2>
      <div className="mt-6">
        <FormatPlay />
      </div>
      <AskLine>Hangi soruda bütün sütunlara ihtiyaç duyarsın, hangisinde tek sütun yeter?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  8 · BÖLÜM  ───────────────── */
  () => (
    <SectionDivider
      num="2"
      total="2"
      title="Sakladık, şimdi soralım"
      subtitle="Veri depoda duruyor. Sıra ona soru sormakta, faturayı küçük tutmakta ve cevabı grafiğe çevirmekte."
      bgGradient="linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)"
      shadow="0 20px 60px -10px rgba(37, 99, 235, 0.55)"
      icon={<Search className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  9 · SUNUCUSUZ SORGU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sunucusuz sorgu (serverless)</Eyebrow>
      <H2>Sunucu kurmadan soruyu yaz, cevabı al</H2>
      <Sub className="mt-3 max-w-3xl">
        Araba almak yerine taksiye binmek gibi: bilgisayarı sağlayıcı çalıştırır, sen yalnız soruyu yazarsın.
      </Sub>
      <Stage className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        <div className="bvbb-query-body rounded-xl" style={{ fontSize: 16 }}>
          <div>
            <span className="bvbb-sql-kw">SELECT</span> sehir, <span className="bvbb-sql-fn">SUM</span>(tutar){" "}
            <span className="bvbb-sql-kw">AS</span> toplam
          </div>
          <div>
            <span className="bvbb-sql-kw">FROM</span> <span className="bvbb-sql-tbl">satislar</span>
          </div>
          <div>
            <span className="bvbb-sql-kw">GROUP BY</span> sehir
          </div>
          <div>
            <span className="bvbb-sql-kw">ORDER BY</span> toplam <span className="bvbb-sql-kw">DESC</span>;
          </div>
        </div>
        <Reveal
          question="Bu sorgu çalışınca ne görürüz?"
          hint="Tahmin et, sonra tıkla"
          answer={
            <>
              Her şehrin toplam satışı, büyükten küçüğe:
              {SATIS.map((s) => (
                <span key={s.sehir} className="mt-1 flex justify-between font-mono text-sm">
                  <span>{s.sehir}</span>
                  <span>{s.toplam}</span>
                </span>
              ))}
            </>
          }
        />
      </Stage>
      <AskLine>Bu dört satır Türkçe olarak hangi soruyu soruyor?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  10 · SORGU BAŞINA ÖDEME  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Oyna-gör · maliyet</Eyebrow>
      <H2>Sorgu başına ödersin: taranan veri kadar</H2>
      <div className="mt-5">
        <CostPlay />
      </div>
      <AskLine>Her sorguda SELECT * yazmak neden pahalı bir alışkanlık?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  11 · ARA SORU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Ara soru</Eyebrow>
      <Stage>
        <Quiz
          items={[
            {
              q: "Sunucusuz sorgu servisinde ay sonu faturası kabardı. Hangisi faturayı düşürür?",
              options: [
                "Her sorguda SELECT * yazmak",
                "Yalnız gereken sütunları ve tarihleri sorgulamak",
                "Sorguyu daha hızlı yazmak",
                "Sonucu tablo yerine grafik göstermek",
              ],
              correct: 1,
              why: "Fatura taranan veriye bağlıdır; ne kadar az veri taratırsan o kadar az ödersin.",
            },
          ]}
        />
      </Stage>
    </SlideShell>
  ),

  /* ─────────────────  12 · TABLO → GRAFİK  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Oyna-gör · gösterme</Eyebrow>
      <H2>Sonuç tabloda kalmaz, grafiğe döner</H2>
      <Sub className="mt-3 max-w-3xl">
        Pano (dashboard): sorgu sonuçlarını grafik olarak tek ekranda toplayan sayfa.
      </Sub>
      <div className="mt-5">
        <TableChartPlay />
      </div>
      <AskLine>En çok satan şehri hangisinde daha çabuk buldun: tabloda mı, grafikte mi?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  13 · SINIFTA DENEYELİM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sınıfta deneyelim · 10 dakika · telefonla</Eyebrow>
      <H2>Telefonundaki analitik raporunu oku</H2>
      <div className="mt-6">
        <TrySteps
          steps={[
            "Ayarlar’ı aç: iPhone’da “Ekran Süresi”, Android’de “Dijital Denge”.",
            "Bu hafta en çok kullandığın 3 uygulamayı ve sürelerini deftere yaz.",
            "Yanındakiyle karşılaştır: aynı uygulamalar mı, sıralama aynı mı?",
            "Birlikte yazın: bu rapor için hangi veri toplandı, hangi soru soruldu?",
          ]}
        />
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
        <Smartphone className="w-4 h-4 text-[#60a5fa]" />
        Kurulum ve hesap gerekmez. Telefonu olmayan yanındakiyle çalışır.
        <Users className="w-4 h-4 text-[#60a5fa] ml-2" />
        İkişerli gruplar.
      </div>
      <AskLine>Bu rapordaki grafik, bugünkü dört durağın hangisi?</AskLine>
    </SlideShell>
  ),

  /* ─────────────────  14 · KENDİNİ DENE  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kendini dene · 3 soru</Eyebrow>
      <Stage>
        <Quiz
          doneText="Takıldığın soru varsa o slayda birlikte geri dönelim."
          items={[
            {
              q: "Her şeyin ham hâliyle atıldığı ucuz depoya ne diyoruz?",
              options: ["Veri ambarı", "Veri gölü", "Pano", "Sorgu"],
              correct: 1,
              why: "Veri gölü ham veriyi olduğu gibi saklar; ambar ise düzenli tablolardır.",
            },
            {
              q: "Yalnız “tutar” sütununun toplamı lazım. Hangisi daha az veri okur?",
              options: ["CSV dosyası", "Parquet dosyası", "İkisi de aynı", "Dosyanın adına bağlı"],
              correct: 1,
              why: "Parquet sütun sütun saklar, yalnız istenen sütunu açar.",
            },
            {
              q: "Sunucusuz sorgu servisinde fatura en çok neye bağlıdır?",
              options: [
                "Sorgunun kaç satır yazıldığına",
                "Sorgunun taradığı veri miktarına",
                "Kaç kişinin sonuca baktığına",
                "Günün saatine",
              ],
              correct: 1,
              why: "Sorgu başına ödersin; taksimetre taranan veriyle birlikte yazar.",
            },
          ]}
        />
      </Stage>
    </SlideShell>
  ),

  /* ─────────────────  15 · ÖZET + KÖPRÜ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Aklında kalsın: 3 şey</Eyebrow>
      <div className="mt-2 max-w-4xl">
        <ThreeThings
          items={[
            "Veri gölü her şeyin atıldığı depodur, veri ambarı raflı market.",
            "Parquet yalnız gereken sütunu okur; daha az veri, daha küçük fatura.",
            "Sunucusuz sorguda taranan veri kadar ödersin; cevap grafiğe dönünce karar olur.",
          ]}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 bvbb-card-sky rounded-xl p-5 max-w-4xl flex items-center gap-3"
      >
        <Table className="w-6 h-6 text-[#67e8f9] flex-shrink-0" />
        <span className="text-base md:text-lg text-gray-200">
          Haftaya: veriye soru sormakla yetinmeyip bilgisayara veriden öğrenmeyi öğretiyoruz. Konu bulutta makine
          öğrenimi.
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
          BVA 2103 · 13. Hafta · Bulutta Veri Analitiği
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
