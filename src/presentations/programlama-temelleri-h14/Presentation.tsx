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
  Eye,
  RotateCcw,
  EyeOff,
  Scissors,
  PenLine,
  Search,
  ArrowUpDown,
  Repeat,
  type LucideIcon,
} from "lucide-react";
import { CodeEditor } from "../_shared/code/CodeEditor";
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
        <div className="absolute inset-0 prog-grid-bg pointer-events-none" />
      )}
      {/* max-w-4xl: tıklanabilir öğeler kenar geçiş alanlarının (%12) dışında kalsın */}
      <div className="relative z-10 w-full max-w-4xl">{children}</div>
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-3 mb-4 text-xs font-mono uppercase tracking-[0.25em] text-[#5fa8e0]"
    >
      <span className="w-8 h-px bg-[#5fa8e0]" />
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
      className={`text-2xl md:text-4xl font-semibold tracking-tight leading-tight text-white ${className}`}
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
      className={`text-base md:text-lg text-gray-400 leading-relaxed ${className}`}
    >
      {children}
    </motion.p>
  );
}

/* ---- Ortak etkileşim parçaları ------------------------------ */

/** Slayt altındaki soluk "Sınıfa sor" satırı. */
function Ask({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="mt-5 text-sm text-gray-500"
    >
      <span className="font-mono text-[11px] uppercase tracking-widest text-[#5fa8e0]/70 mr-2">
        Sınıfa sor:
      </span>
      {children}
    </motion.div>
  );
}

/** Tahmin et → tıkla göster. Tekrar tıklayınca kapanır. */
function Reveal({
  label = "Cevabı görmek için tıkla",
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      className={`w-full text-left rounded-xl px-5 py-4 transition-all cursor-pointer ${
        open ? "prog-card" : "prog-card-yellow"
      }`}
    >
      {open ? (
        <span className="block text-base text-gray-200 leading-relaxed">{children}</span>
      ) : (
        <span className="flex items-center gap-3 text-[#ffd43b] font-semibold">
          <Eye className="w-5 h-5 flex-shrink-0" />
          {label}
        </span>
      )}
    </button>
  );
}

/** Mini sınav: şıkka tıkla; doğru yeşil, yanlış kırmızı, altında açıklama. */
function Quiz({
  question,
  options,
  correct,
  why,
}: {
  question: ReactNode;
  options: string[];
  correct: number;
  why: string;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <div>
      <div className="text-lg text-white font-semibold mb-3 leading-snug">{question}</div>
      <div className="grid gap-2">
        {options.map((o, i) => {
          let cls = "prog-card prog-card-hover text-gray-200";
          if (picked !== null) {
            if (i === correct) cls = "border border-[#4ec9b0] bg-[#4ec9b0]/15 text-[#86efac]";
            else if (i === picked) cls = "border border-[#f87171] bg-[#f87171]/15 text-[#fca5a5]";
            else cls = "prog-card text-gray-500";
          }
          return (
            <button
              key={o}
              type="button"
              onClick={() => setPicked(i)}
              className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-left text-base transition-all cursor-pointer ${cls}`}
            >
              <span className="font-mono text-xs opacity-70">{"ABCD"[i]}</span>
              <span className="flex-1">{o}</span>
              {picked !== null && i === correct && <Check className="w-4 h-4" />}
              {picked === i && i !== correct && <X className="w-4 h-4" />}
            </button>
          );
        })}
      </div>
      <div className="mt-3 min-h-[2.75rem] text-sm text-gray-300 leading-relaxed">
        {picked === null ? (
          <span className="text-gray-500">Bir şıkka tıkla.</span>
        ) : (
          <>
            <span className={picked === correct ? "text-[#86efac] font-semibold" : "text-[#fca5a5] font-semibold"}>
              {picked === correct ? "Doğru. " : "Olmadı. "}
            </span>
            {why}{" "}
            <button
              type="button"
              onClick={() => setPicked(null)}
              className="underline text-gray-500 hover:text-gray-300 cursor-pointer"
            >
              Sıfırla
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/** Çalıştırılmayan, yalnızca gösterilen kısa kod; `active` satırı vurgular. */
function CodeView({ code, active }: { code: string; active?: number }) {
  return (
    <div
      className="prog-editor rounded-lg py-3 border border-[#2d2d2d] overflow-hidden"
      style={{ fontSize: 15 }}
    >
      {code.split("\n").map((ln, i) => (
        <div
          key={i}
          className="px-4 whitespace-pre"
          style={
            i === active
              ? { background: "rgba(255,212,59,0.14)", boxShadow: "inset 3px 0 0 #ffd43b" }
              : undefined
          }
        >
          {ln || " "}
        </div>
      ))}
    </div>
  );
}

/** Seçenek çipi (oyna-gör slaytları). */
function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all cursor-pointer ${
        active
          ? "bg-[#ffd43b]/15 border-[#ffd43b] text-[#ffd43b]"
          : "border-[#3776ab]/40 text-gray-300 hover:border-[#5fa8e0]"
      }`}
    >
      {children}
    </button>
  );
}

/** Adım adım ilerleyen gösterimlerin düğmeleri. */
function StepNav({
  step,
  total,
  onStep,
  nextLabel = "İleri",
}: {
  step: number;
  total: number;
  onStep: (n: number) => void;
  nextLabel?: string;
}) {
  const atEnd = step >= total - 1;
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onStep(Math.min(step + 1, total - 1))}
        disabled={atEnd}
        className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#3776ab] text-white text-sm font-semibold disabled:opacity-30 cursor-pointer disabled:cursor-default"
      >
        {nextLabel} <ChevronRight className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => onStep(0)}
        disabled={step === 0}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#3776ab]/40 text-gray-300 text-sm disabled:opacity-30 cursor-pointer disabled:cursor-default"
      >
        <RotateCcw className="w-4 h-4" /> Baştan
      </button>
      <span className="text-xs font-mono text-gray-500">
        Adım {step + 1} / {total} · tıkla
      </span>
    </div>
  );
}

/* ---- Bu haftaya özel parçalar -------------------------------- */

function InfoCard({
  icon: Icon,
  title,
  desc,
  accent = "#3776ab",
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  accent?: string;
}) {
  return (
    <div className="prog-card rounded-xl p-5">
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
        style={{ background: `${accent}1f`, border: `1px solid ${accent}55` }}
      >
        <Icon className="w-5 h-5" style={{ color: accent }} />
      </div>
      <h3 className="text-base font-semibold text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}

/** Slayt 3 — doğrusal arama: kutuları baştan tek tek aç. */
const KARISIK = [23, 7, 41, 15, 62, 34, 9, 50];

function DogrusalDemo() {
  const [hedef, setHedef] = useState(62);
  const [acik, setAcik] = useState(0);
  const yer = KARISIK.indexOf(hedef);
  const sonAdim = yer >= 0 ? yer + 1 : KARISIK.length;
  const bitti = acik >= sonAdim;
  let mesaj = `${hedef} sayısını arıyoruz. Kutular kapalı; baştan başlayacağız.`;
  if (acik > 0 && !bitti) mesaj = `${acik} kutu açtık, ${hedef} henüz çıkmadı. Devam.`;
  if (bitti && yer >= 0) mesaj = `Bulduk: ${acik} kutu açmamız gerekti.`;
  if (bitti && yer < 0) mesaj = `${KARISIK.length} kutunun hepsini açtık: ${hedef} listede yok.`;
  return (
    <div className="mt-5">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-gray-500 mr-2">Aranan · tıkla</span>
        {[62, 23, 99].map((h) => (
          <Chip
            key={h}
            active={hedef === h}
            onClick={() => {
              setHedef(h);
              setAcik(0);
            }}
          >
            {h}
          </Chip>
        ))}
      </div>
      <div className="grid grid-cols-8 gap-2">
        {KARISIK.map((v, i) => {
          const acildi = i < acik;
          const bulundu = acildi && v === hedef;
          return (
            <div
              key={i}
              className={`prog-array-cell rounded-lg h-16 flex items-center justify-center text-2xl font-bold ${
                bulundu ? "prog-array-cell-sorted" : i === acik - 1 ? "prog-array-cell-active" : ""
              }`}
            >
              {acildi ? v : "?"}
            </div>
          );
        })}
      </div>
      <div className="mt-3 min-h-[1.75rem] text-base text-gray-200">{mesaj}</div>
      <div className="mt-3">
        <StepNav step={acik} total={sonAdim + 1} onStep={setAcik} nextLabel="Sıradaki kutuyu aç" />
      </div>
    </div>
  );
}

/** Slayt 5 — ikili arama: ortaya bak, yarıyı at. */
const SIRALI = [3, 8, 12, 17, 21, 26, 30, 35, 41, 48, 53, 59, 64, 72, 80];

type IkiliDurum = { sol: number; sag: number; orta: number; bulundu: boolean; mesaj: string };

function ikiliAdimlar(hedef: number): IkiliDurum[] {
  let sol = 0;
  let sag = SIRALI.length - 1;
  const liste: IkiliDurum[] = [
    { sol, sag, orta: -1, bulundu: false, mesaj: `${hedef} sayısını arıyoruz. Liste sıralı; tam ortadan başlayacağız.` },
  ];
  while (sol <= sag) {
    const orta = Math.floor((sol + sag) / 2);
    const v = SIRALI[orta];
    if (v === hedef) {
      liste.push({ sol, sag, orta, bulundu: true, mesaj: `Ortadaki ${v}. Bulduk!` });
      break;
    }
    if (v < hedef) {
      sol = orta + 1;
      liste.push({ sol, sag, orta, bulundu: false, mesaj: `Ortadaki ${v}. Aradığımız daha büyük: sol yarıyı at.` });
    } else {
      sag = orta - 1;
      liste.push({ sol, sag, orta, bulundu: false, mesaj: `Ortadaki ${v}. Aradığımız daha küçük: sağ yarıyı at.` });
    }
  }
  if (!liste[liste.length - 1].bulundu) {
    liste[liste.length - 1].mesaj += " Bakacak kutu kalmadı: listede yok.";
  }
  return liste;
}

function IkiliDemo() {
  const [hedef, setHedef] = useState(64);
  const [adim, setAdim] = useState(0);
  const adimlar = ikiliAdimlar(hedef);
  const d = adimlar[adim];
  const bitti = adim === adimlar.length - 1;
  const yer = SIRALI.indexOf(hedef);
  return (
    <div className="mt-5">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-gray-500 mr-2">Aranan · tıkla</span>
        {[64, 12, 50].map((h) => (
          <Chip
            key={h}
            active={hedef === h}
            onClick={() => {
              setHedef(h);
              setAdim(0);
            }}
          >
            {h}
          </Chip>
        ))}
      </div>
      <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${SIRALI.length}, minmax(0, 1fr))` }}>
        {SIRALI.map((v, i) => {
          const atildi = i < d.sol || i > d.sag;
          let cls = "";
          if (i === d.orta) cls = d.bulundu ? "prog-array-cell-sorted" : "prog-array-cell-active";
          return (
            <div
              key={v}
              className={`prog-array-cell rounded-md h-14 flex items-center justify-center text-lg font-bold transition-opacity ${cls}`}
              style={{ opacity: atildi && i !== d.orta ? 0.2 : 1 }}
            >
              {v}
            </div>
          );
        })}
      </div>
      <div className="mt-3 min-h-[3.25rem] text-base text-gray-200">
        {d.mesaj}
        {bitti && (
          <span className="block text-sm text-gray-400">
            {adim} kez baktık. Baştan tek tek baksaydık {yer >= 0 ? yer + 1 : SIRALI.length} kez bakardık.
          </span>
        )}
      </div>
      <div className="mt-2">
        <StepNav step={adim} total={adimlar.length} onStep={setAdim} nextLabel="Ortaya bak" />
      </div>
    </div>
  );
}

/** Slayt 7 — kabarcık sıralama: her tıkta bir karşılaştırma. */
type KabarcikDurum = { dizi: number[]; cift: number; sabit: number; mesaj: string };

function kabarcikAdimlar(baslangic: number[]): KabarcikDurum[] {
  const d = [...baslangic];
  const n = d.length;
  const liste: KabarcikDurum[] = [
    { dizi: [...d], cift: -1, sabit: n, mesaj: "Karışık liste. Soldan başlayıp yan yana ikililere bakacağız." },
  ];
  for (let tur = 0; tur < n - 1; tur++) {
    for (let i = 0; i < n - 1 - tur; i++) {
      const a = d[i];
      const b = d[i + 1];
      let mesaj = `${a} ile ${b}: sıra doğru, dokunma.`;
      if (a > b) {
        d[i] = b;
        d[i + 1] = a;
        mesaj = `${a} ile ${b}: soldaki büyük, yer değiştir.`;
      }
      const turBitti = i === n - 2 - tur;
      if (turBitti) mesaj += ` Tur ${tur + 1} bitti: ${d[n - 1 - tur]} yerine oturdu.`;
      liste.push({ dizi: [...d], cift: i, sabit: turBitti ? n - 1 - tur : n - tur, mesaj });
    }
  }
  const son = liste[liste.length - 1];
  son.sabit = 0;
  son.mesaj += " Liste sıralandı.";
  return liste;
}

const KABARCIK = kabarcikAdimlar([5, 3, 8, 1, 4]);

function KabarcikDemo() {
  const [adim, setAdim] = useState(0);
  const d = KABARCIK[adim];
  return (
    <div className="mt-5">
      <div className="flex items-end justify-center gap-3 h-36">
        {d.dizi.map((v, i) => {
          const sabit = i >= d.sabit;
          const secili = !sabit && (i === d.cift || i === d.cift + 1) && d.cift >= 0;
          return (
            <motion.div
              key={v}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className={`prog-array-cell rounded-lg w-20 flex items-end justify-center pb-2 text-2xl font-bold ${
                sabit ? "prog-array-cell-sorted" : secili ? "prog-array-cell-active" : ""
              }`}
              style={{ height: 40 + v * 12 }}
            >
              {v}
            </motion.div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-center gap-5 text-xs text-gray-500">
        <span><span className="text-[#ffd43b]">Sarı:</span> şu an bakılan ikili</span>
        <span><span className="text-[#86efac]">Yeşil:</span> yerine oturdu</span>
      </div>
      <div className="mt-3 min-h-[1.75rem] text-base text-gray-200 text-center">{d.mesaj}</div>
      <div className="mt-3 flex justify-center">
        <StepNav step={adim} total={KABARCIK.length} onStep={setAdim} nextLabel="Sonraki ikili" />
      </div>
    </div>
  );
}

/** Slayt 9 — matruşka: her bebeğin içinden bir küçüğü çıkar. */
const BEBEK_RENK = ["#4ec9b0", "#5fa8e0", "#ffd43b", "#f472b6"];

function Bebek({ n, enIc }: { n: number; enIc: number }) {
  const renk = BEBEK_RENK[n];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-2xl px-4 py-2.5"
      style={{ border: `2px solid ${renk}`, background: `${renk}14` }}
    >
      <div className="flex flex-wrap items-baseline gap-x-3">
        <span className="font-mono text-sm font-bold" style={{ color: renk }}>
          geri_say({n})
        </span>
        <span className="text-sm text-gray-300">
          {n === 0
            ? "En küçük bebek: “Kalkış!” yazar ve durur."
            : `Ekrana ${n} yazar, sonra içindeki bebeği açar.`}
        </span>
      </div>
      {n > enIc && (
        <div className="mt-2">
          <Bebek n={n - 1} enIc={enIc} />
        </div>
      )}
    </motion.div>
  );
}

function MatruskaDemo() {
  const [adim, setAdim] = useState(0);
  const ekran = ["3", "2", "1", "Kalkış!"].slice(0, adim + 1);
  return (
    <div className="mt-5">
      <div className="grid grid-cols-[1fr_180px] gap-4 items-start">
        <div className="min-h-[15rem]">
          <Bebek n={3} enIc={3 - adim} />
        </div>
        <div className="prog-terminal rounded-lg p-4 border border-[#2d2d2d] min-h-[9rem]" style={{ fontSize: 15 }}>
          <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Ekran</div>
          {ekran.map((s) => (
            <div key={s}>{s}</div>
          ))}
        </div>
      </div>
      <div className="mt-3">
        <StepNav step={adim} total={4} onStep={setAdim} nextLabel="İçindeki bebeği aç" />
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
        <Eyebrow>BVA 1101 · 14. Hafta</Eyebrow>
        <H1>
          <span className="prog-shimmer">Ara, bul, sırala</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Listede aradığını bulmak, listeyi sıraya dizmek ve kendini çağıran fonksiyon.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 mt-12 max-w-2xl mx-auto"
        >
          {[
            { name: "Arama", tag: "rehber, sözlük", color: "#3776ab" },
            { name: "Sıralama", tag: "boy sırası", color: "#ffd43b" },
            { name: "Özyineleme", tag: "matruşka", color: "#4ec9b0" },
          ].map((l) => (
            <div key={l.name} className="prog-card rounded-xl p-4" style={{ borderColor: `${l.color}55` }}>
              <div className="text-white font-semibold text-sm mb-1">{l.name}</div>
              <div className="font-mono text-xs" style={{ color: l.color }}>
                {l.tag}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-10 text-[11px] font-mono text-gray-600 uppercase tracking-[0.3em]"
        >
          Programlama Temelleri · MCBÜ Manisa Teknik Bilimler MYO
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  2 · SORUN / OYLAMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sorun · sınıf oylaması</Eyebrow>
      <H2>Rehberde 500 kişi var: Zeynep&apos;i nasıl bulursun?</H2>
      <Sub className="mt-3">Arama çubuğu yok. İki yoldan birini seç ve el kaldır.</Sub>
      <div className="grid grid-cols-2 gap-4 mt-5">
        <div className="prog-card rounded-xl p-5">
          <div className="text-[#5fa8e0] font-mono text-sm mb-1">A yolu</div>
          <div className="text-white text-lg font-semibold">En baştan başlarım, tek tek bakarım.</div>
        </div>
        <div className="prog-card rounded-xl p-5">
          <div className="text-[#ffd43b] font-mono text-sm mb-1">B yolu</div>
          <div className="text-white text-lg font-semibold">Ortalardan açarım, Z&apos;ye doğru atlarım.</div>
        </div>
      </div>
      <div className="mt-4">
        <Reveal label="Oylama bitti mi? Yorumu görmek için tıkla">
          İkisi de bugünün konusu. A yolu <span className="text-white font-semibold">doğrusal arama</span>,
          B yolu <span className="text-white font-semibold">ikili arama</span>. B çok daha az bakışla bulur
          ama bir şartı var: rehber sıralı olmalı.
        </Reveal>
      </div>
      <Ask>Rehberdeki adlar karışık yazılmış olsaydı B yolu işe yarar mıydı?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  3 · DOĞRUSAL ARAMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Arama · adım adım</Eyebrow>
      <H2>Doğrusal arama: baştan başla, tek tek bak</H2>
      <Sub className="mt-3">Sıralı olmayan bir çekmecede anahtar aramak gibi: hepsine sırayla bakarsın.</Sub>
      <DogrusalDemo />
      <Ask>Aradığımız sayı en sondaysa ya da hiç yoksa kaç kutu açarız?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  4 · DOĞRUSAL ARAMA KODU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Canlı kod · önce tahmin et, sonra çalıştır</Eyebrow>
      <H2 className="mb-4">Aynı işi Python&apos;a yaptıralım</H2>
      <CodeEditor
        title="dogrusal_arama.py"
        tabs={["dogrusal_arama.py"]}
        activeTab="dogrusal_arama.py"
        code={`notlar = [70, 45, 90, 60, 85]
aranan = 90

for sira in range(len(notlar)):
    if notlar[sira] == aranan:
        print("Bulundu, sıra:", sira)`}
      />
      <Ask>aranan = 100 yapıp çalıştırırsak ekranda ne görürüz? Neden?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  5 · İKİLİ ARAMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Arama · adım adım</Eyebrow>
      <H2>İkili arama: sözlükte ortadan aç, yarısını at</H2>
      <Sub className="mt-3">
        Sözlükte kelime ararken ortadan açarsın; kelimen daha gerideyse ön yarıya hiç bakmazsın.
      </Sub>
      <IkiliDemo />
      <Ask>Liste karışık olsaydı &ldquo;sol yarıyı at&rdquo; diyebilir miydik?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  6 · MİNİ SINAV  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Mini sınav · şıkka tıkla</Eyebrow>
      <H2>Aklımdan 1 ile 100 arasında bir sayı tuttum</H2>
      <div className="grid grid-cols-2 gap-5 mt-6 items-start">
        <Quiz
          question="Her tahminde yalnızca “büyük” ya da “küçük” diyeceğim. İlk tahminin ne olmalı?"
          options={["1", "50", "100", "Fark etmez"]}
          correct={1}
          why="50 dersen cevabım ne olursa olsun sayıların yarısı elenir."
        />
        <div className="space-y-3">
          <div className="prog-card-yellow rounded-xl px-5 py-4 text-base text-gray-200">
            <span className="text-[#ffd43b] font-semibold">Tek şart:</span> ikili arama yalnızca sıralı
            listede çalışır.
          </div>
          <div className="prog-card rounded-xl px-5 py-4 text-sm text-gray-300">
            Liste karışıksa önce sıralarız. Sıradaki konu tam olarak bu.
          </div>
        </div>
      </div>
      <Ask>1&apos;den başlayıp birer birer sayarsan en kötü ihtimalle kaç tahmin gerekir?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  7 · KABARCIK SIRALAMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sıralama · adım adım</Eyebrow>
      <H2>Kabarcık sıralama: yan yana ikiliye bak, yanlışsa yer değiştir</H2>
      <Sub className="mt-3">
        Beden dersinde boy sırası gibi: yanındaki senden kısaysa yer değiştirirsiniz.
      </Sub>
      <KabarcikDemo />
      <Ask>İlk tur bitince hangi sayı yerine oturdu? Neden hep en büyüğü?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  8 · KABARCIK KODU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Canlı kod · önce tahmin et, sonra çalıştır</Eyebrow>
      <H2 className="mb-4">Az önce elle yaptığımızı Python tur tur yapsın</H2>
      <CodeEditor
        title="kabarcik.py"
        tabs={["kabarcik.py"]}
        activeTab="kabarcik.py"
        code={`sayilar = [5, 3, 8, 1, 4]

for tur in range(len(sayilar) - 1):
    for i in range(len(sayilar) - 1):
        if sayilar[i] > sayilar[i + 1]:
            sayilar[i], sayilar[i + 1] = sayilar[i + 1], sayilar[i]
    print("Tur", tur + 1, ":", sayilar)`}
      />
      <Ask>
        Son turda liste değişti mi? Günlük işte hazır olan sayilar.sort() kullanılır; biz mantığını
        görmek için elle yazdık.
      </Ask>
    </SlideShell>
  ),

  /* ─────────────────  9 · ÖZYİNELEME: MATRUŞKA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Özyineleme · adım adım</Eyebrow>
      <H2>Özyineleme: matruşka gibi, her bebeğin içinden bir küçüğü çıkar</H2>
      <Sub className="mt-3">
        Özyineleme (recursion): bir fonksiyonun işin küçüğünü yine kendisine yaptırması.
      </Sub>
      <MatruskaDemo />
      <Ask>En küçük bebek neden açılmıyor? Açılsaydı ne olurdu?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  10 · GERİ SAYIM KODU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Canlı kod · önce tahmin et, sonra çalıştır</Eyebrow>
      <H2 className="mb-4">Geri sayım: kendini çağıran fonksiyon</H2>
      <CodeEditor
        title="geri_say.py"
        tabs={["geri_say.py"]}
        activeTab="geri_say.py"
        code={`def geri_say(n):
    if n == 0:
        print("Kalkış!")
    else:
        print(n)
        geri_say(n - 1)

geri_say(3)`}
      />
      <Ask>Son satırı geri_say(5) yaparsak ekrana kaç satır yazılır?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  11 · DURMA KOŞULU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Dikkat · önce tahmin et</Eyebrow>
      <H2>Durma koşulu olmazsa matruşka hiç bitmez</H2>
      <Sub className="mt-3">
        Durma koşulu: fonksiyonun kendini artık çağırmadığı yer. Aşağıdaki kodda if satırını sildik.
      </Sub>
      <div className="grid grid-cols-2 gap-4 mt-5 items-start">
        <CodeView code={`def geri_say(n):\n    print(n)\n    geri_say(n - 1)\n\ngeri_say(3)`} active={2} />
        <Reveal label="Bu kod ne yapar? Tahmin et, sonra tıkla">
          3, 2, 1, 0, -1, -2… diye durmadan iner. Python bir süre sonra programı keser ve{" "}
          <span className="text-[#fca5a5] font-semibold">RecursionError</span> (çok fazla iç içe çağrı)
          hatası verir.
        </Reveal>
      </div>
      <Ask>Bir önceki slayttaki kodda en küçük bebek hangi satırdı?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  12 · SINIFTA DENEYELİM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sınıfta deneyelim · 5–10 dakika</Eyebrow>
      <H2>Sayı tahmin oyunu: ikili aramayı sen oyna</H2>
      <div className="grid grid-cols-3 gap-4 mt-5">
        <InfoCard icon={EyeOff} title="1 · Sayı tut" desc="Yanındaki arkadaşın 1 ile 100 arasında bir sayı tutsun, kâğıda yazsın." accent="#3776ab" />
        <InfoCard icon={Scissors} title="2 · Hep ortayı söyle" desc="Sen ortadaki sayıyı söyle; o yalnızca büyük, küçük ya da bildin desin." accent="#ffd43b" />
        <InfoCard icon={PenLine} title="3 · Tahminleri say" desc="Kaç tahminde bulduğunu yaz. Sonra rolleri değiştirin." accent="#4ec9b0" />
      </div>
      <div className="mt-4">
        <Reveal label="En çok kaç tahmin yeter? Sınıfça tahmin edin, sonra tıkla">
          <span className="text-white font-semibold">7 tahmin her zaman yeter.</span> Her tahminde
          olasılıkların yarısı gider: 100, 50, 25, 13, 7, 4, 2, 1.
        </Reveal>
      </div>
      <Ask>En az tahminle bulan kim? Hangi yolu izledi?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  13 · KENDİNİ DENE  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kendini dene · iki soru</Eyebrow>
      <H2>Bugünü iki soruda toplayalım</H2>
      <div className="grid grid-cols-2 gap-6 mt-6 items-start">
        <Quiz
          question="İkili arama hangi listede çalışır?"
          options={["Her listede", "Yalnızca sıralı listede", "Yalnızca kısa listede", "Yalnızca karışık listede"]}
          correct={1}
          why="Yarıyı atabilmek için aradığımızın hangi yanda kaldığını bilmeliyiz; bunu sıra söyler."
        />
        <Quiz
          question="Kendini çağıran fonksiyonda durma koşulunu unuttun. Ne olur?"
          options={["Hiç çalışmaz", "Bir kez çalışıp durur", "Durmadan kendini çağırır, sonunda hata verir", "Liste sıralanır"]}
          correct={2}
          why="En küçük bebek yoksa matruşka bitmez; Python sonunda RecursionError verir."
        />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  14 · AKLINDA KALSIN  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Aklında kalsın · 3 şey</Eyebrow>
      <H2>Bugünden cebine koyacağın üç şey</H2>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <InfoCard
          icon={Search}
          title="1 · İki arama yolu"
          desc="Doğrusal: tek tek bak. İkili: ortadan böl; ama liste sıralı olmalı."
          accent="#3776ab"
        />
        <InfoCard
          icon={ArrowUpDown}
          title="2 · Kabarcık sıralama"
          desc="Yan yana ikiliye bak, yanlışsa yer değiştir; her turda en büyük sona gider."
          accent="#ffd43b"
        />
        <InfoCard
          icon={Repeat}
          title="3 · Özyineleme"
          desc="Fonksiyon kendini çağırır; durma koşulu olmazsa bitmez."
          accent="#4ec9b0"
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 prog-card-yellow rounded-xl px-5 py-4 text-base text-gray-200"
      >
        <span className="text-[#ffd43b] font-semibold">Gelecek hafta:</span> listelerimizi dosyaya
        kaydedeceğiz ki program kapanınca kaybolmasın; ardından dönemi birlikte tekrar edeceğiz.
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
            background: "linear-gradient(90deg, #3776ab, #5fa8e0, #ffd43b)",
            boxShadow: "0 0 16px rgba(55,118,171,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#5fa8e0]/70">
          BVA 1101 · 14. Hafta · Arama, Sıralama, Özyineleme
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[#5fa8e0]/50">
            <span className="text-[#5fa8e0]">
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
            className="p-1.5 text-gray-500 hover:text-[#5fa8e0] transition-colors"
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
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#5fa8e0] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
                  ? "w-5 bg-[#5fa8e0]"
                  : "w-1.5 bg-white/15 hover:bg-white/40"
              }`}
              style={
                i === current
                  ? { boxShadow: "0 0 10px rgba(95,168,224,0.7)" }
                  : undefined
              }
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#5fa8e0] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
