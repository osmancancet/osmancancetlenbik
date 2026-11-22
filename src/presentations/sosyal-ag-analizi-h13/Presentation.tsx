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
  ArrowRight,
  Dice5,
  Snowflake,
  Footprints,
  Users,
  Filter,
  Target,
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
        <div className="absolute inset-0 saa-grid-bg pointer-events-none" />
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
      className="inline-flex items-center gap-3 mb-6 text-xs font-mono uppercase tracking-[0.25em] text-[#14b8a6]"
    >
      <span className="w-8 h-px bg-[#14b8a6]" />
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
  accent = "#14b8a6",
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
      className="saa-card saa-card-hover rounded-xl p-6 transition-all"
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
        style={{
          background: `${accent}18`,
          border: `1px solid ${accent}50`,
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
   ETKİLEŞİM BİLEŞENLERİ (ortak)
   ============================================================ */

/** Başlıkları 1280×720 ekrana sığdırmak için biraz küçültür. */
const BASLIK = "md:text-4xl!";

/** Slaydın altındaki soluk "Sınıfa sor" satırı. */
function Ask({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="mt-5 text-sm text-gray-500 text-center"
    >
      <span className="font-mono uppercase tracking-wider text-[11px] text-[#14b8a6]/70 mr-2">
        Sınıfa sor:
      </span>
      {children}
    </motion.div>
  );
}

/** Tahmin et → tıkla göster kartı. */
function Reveal({
  soru,
  cevap,
  ipucu = "Tahmin et, sonra tıkla",
}: {
  soru: string;
  cevap: string;
  ipucu?: string;
}) {
  const [acik, setAcik] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setAcik((a) => !a)}
      className={`rounded-xl p-5 text-left w-full h-full cursor-pointer transition-all ${
        acik ? "saa-card-teal" : "saa-card saa-card-hover"
      }`}
    >
      <div className="text-base font-semibold text-white leading-snug">{soru}</div>
      {acik ? (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-sm text-[#a7f3d0] leading-relaxed"
        >
          {cevap}
        </motion.div>
      ) : (
        <div className="mt-3 saa-hint">
          <MousePointerClick className="w-3.5 h-3.5" />
          {ipucu}
        </div>
      )}
    </button>
  );
}

type Soru = {
  soru: string;
  siklar: string[];
  dogru: number;
  aciklama: string;
};

/** Mini sınav: şıkka tıkla, doğru yeşil / yanlış kırmızı, tek cümle açıklama. */
function Quiz({ sorular }: { sorular: Soru[] }) {
  const [no, setNo] = useState(0);
  const [secim, setSecim] = useState<number | null>(null);
  const s = sorular[no];
  const sonSoru = no === sorular.length - 1;
  return (
    <div className="max-w-4xl mx-auto">
      {sorular.length > 1 && (
        <div className="text-xs font-mono text-gray-500 mb-2">
          Soru {no + 1} / {sorular.length}
        </div>
      )}
      <div className="saa-card-teal rounded-xl px-5 py-4 text-lg font-semibold text-white leading-snug">
        {s.soru}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
        {s.siklar.map((sik, i) => {
          const durum =
            secim === null
              ? "saa-card saa-card-hover cursor-pointer"
              : i === s.dogru
              ? "saa-ok"
              : i === secim
              ? "saa-no"
              : "saa-card opacity-50";
          return (
            <button
              key={sik}
              type="button"
              disabled={secim !== null}
              onClick={() => setSecim(i)}
              className={`rounded-xl px-4 py-3 text-left text-sm text-gray-100 flex items-center gap-3 transition-all ${durum}`}
            >
              <span className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 text-xs font-bold bg-[#14b8a6]/15 border border-[#14b8a6]/40 text-[#5eead4]">
                {secim !== null && i === s.dogru ? (
                  <Check className="w-4 h-4" />
                ) : secim === i ? (
                  <X className="w-4 h-4" />
                ) : (
                  "ABCD"[i]
                )}
              </span>
              <span>{sik}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-3 min-h-[64px] flex items-center justify-between gap-4">
        {secim === null ? (
          <div className="saa-hint">
            <MousePointerClick className="w-3.5 h-3.5" />
            Sınıf karar versin, sonra şıkka tıkla
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-gray-200 leading-relaxed"
          >
            <span
              className={
                secim === s.dogru
                  ? "text-emerald-400 font-semibold"
                  : "text-red-400 font-semibold"
              }
            >
              {secim === s.dogru ? "Doğru. " : "Olmadı. "}
            </span>
            {s.aciklama}
          </motion.div>
        )}
        {secim !== null && (
          <button
            type="button"
            className="saa-btn shrink-0"
            onClick={() => {
              setSecim(null);
              setNo(sonSoru ? 0 : no + 1);
            }}
          >
            {sonSoru ? (
              <>
                <RotateCcw className="w-4 h-4" />
                {sorular.length > 1 ? "Baştan" : "Tekrar sor"}
              </>
            ) : (
              <>
                Sonraki soru
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

/** Adım adım açılan süreç: "İleri" ile bir sonraki adım görünür. */
function Stepper({ adimlar }: { adimlar: Array<{ baslik: string; metin: string }> }) {
  const [n, setN] = useState(1);
  const bitti = n >= adimlar.length;
  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-2.5">
        {adimlar.map((a, i) => (
          <div
            key={a.baslik}
            className={`rounded-xl px-4 py-3 flex items-start gap-4 transition-all ${
              i < n ? "saa-card-teal" : "saa-card opacity-30"
            }`}
          >
            <div className="saa-tick w-8 h-8 flex items-center justify-center shrink-0 text-sm font-bold">
              {i + 1}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white">
                {i < n ? a.baslik : "Sıradaki adım"}
              </div>
              {i < n && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-gray-300 mt-0.5 leading-relaxed"
                >
                  {a.metin}
                </motion.div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          className="saa-btn"
          onClick={() => setN(bitti ? 1 : n + 1)}
        >
          {bitti ? (
            <>
              <RotateCcw className="w-4 h-4" />
              Baştan
            </>
          ) : (
            <>
              İleri: {n + 1}. adım
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
        <span className="text-xs font-mono text-gray-500">
          {n} / {adimlar.length}
        </span>
      </div>
    </div>
  );
}

/** İçerik slaydı kabuğu: üst etiket, cümle başlık, kısa alt metin, içerik, "Sınıfa sor". */
function Icerik({
  ust,
  baslik,
  alt,
  sor,
  children,
}: {
  ust: string;
  baslik: ReactNode;
  alt?: ReactNode;
  sor?: ReactNode;
  children: ReactNode;
}) {
  return (
    <SlideShell>
      <div className="max-w-4xl mx-auto">
        <Eyebrow>{ust}</Eyebrow>
        <H2 className={BASLIK}>{baslik}</H2>
        {alt && <Sub className="mt-3 md:text-lg!">{alt}</Sub>}
        <div className="mt-6">{children}</div>
        {sor && <Ask>{sor}</Ask>}
      </div>
    </SlideShell>
  );
}

/* ============================================================
   KONU BİLEŞENLERİ — AĞ ÖRNEKLEME (küçük arkadaşlık ağı)
   ============================================================ */

type Kisi = { ad: string; x: number; y: number };

/** 14 kişilik örnek ağ. Elif'in 7 arkadaşı var; Onur, Naz ve Umut'un birer. */
const KISILER: Kisi[] = [
  { ad: "Elif", x: 300, y: 170 },
  { ad: "Can", x: 170, y: 80 },
  { ad: "Zeynep", x: 300, y: 45 },
  { ad: "Mert", x: 430, y: 90 },
  { ad: "Ayşe", x: 160, y: 200 },
  { ad: "Burak", x: 210, y: 290 },
  { ad: "Deniz", x: 350, y: 290 },
  { ad: "Ece", x: 450, y: 210 },
  { ad: "Kaan", x: 570, y: 130 },
  { ad: "Selin", x: 610, y: 250 },
  { ad: "Umut", x: 660, y: 50 },
  { ad: "İrem", x: 500, y: 300 },
  { ad: "Onur", x: 60, y: 130 },
  { ad: "Naz", x: 60, y: 280 },
];

const BAGLAR: Array<[number, number]> = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
  [1, 2], [1, 12], [4, 13], [4, 5], [3, 8], [7, 8], [7, 9],
  [8, 10], [8, 9], [9, 11], [6, 11],
];

function komsular(i: number): number[] {
  return BAGLAR.filter(([a, b]) => a === i || b === i).map(([a, b]) =>
    a === i ? b : a,
  );
}

type Ton = "bos" | "secili" | "aktif";

const TONLAR: Record<Ton, { fill: string; stroke: string; yazi: string }> = {
  bos: { fill: "#111827", stroke: "#374151", yazi: "#9ca3af" },
  secili: { fill: "#0d9488", stroke: "#5eead4", yazi: "#ffffff" },
  aktif: { fill: "#5eead4", stroke: "#ffffff", yazi: "#042f2e" },
};

/** Ağı çizer; düğümlerin tonu, rozeti ve tıklanması dışarıdan verilir. */
function AgCizimi({
  ton,
  rozet,
  bagAcik,
  onSec,
}: {
  ton: (i: number) => Ton;
  rozet?: (i: number) => string;
  bagAcik: (a: number, b: number) => boolean;
  onSec?: (i: number) => void;
}) {
  return (
    <svg viewBox="0 0 720 345" className="w-full h-auto">
      {BAGLAR.map(([a, b]) => {
        const acik = bagAcik(a, b);
        return (
          <line
            key={`${a}-${b}`}
            x1={KISILER[a].x}
            y1={KISILER[a].y}
            x2={KISILER[b].x}
            y2={KISILER[b].y}
            stroke={acik ? "#5eead4" : "#374151"}
            strokeWidth={acik ? 3 : 1.5}
            strokeOpacity={acik ? 0.95 : 0.6}
          />
        );
      })}
      {KISILER.map((k, i) => {
        const t = TONLAR[ton(i)];
        const r = rozet ? rozet(i) : "";
        return (
          <g
            key={k.ad}
            onClick={onSec ? () => onSec(i) : undefined}
            className={onSec ? "saa-node-click" : undefined}
          >
            <circle
              cx={k.x}
              cy={k.y}
              r={20}
              fill={t.fill}
              stroke={t.stroke}
              strokeWidth={2.5}
            />
            {r && (
              <text
                x={k.x}
                y={k.y + 5}
                textAnchor="middle"
                fontSize={15}
                fontWeight={700}
                fill={t.yazi}
              >
                {r}
              </text>
            )}
            <text
              x={k.x}
              y={k.y + 38}
              textAnchor="middle"
              fontSize={14}
              fontWeight={600}
              fill={ton(i) === "bos" ? "#9ca3af" : "#ffffff"}
              stroke="#050807"
              strokeWidth={4}
              paintOrder="stroke"
            >
              {k.ad}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function LabDuzeni({ ag, children }: { ag: ReactNode; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-stretch">
      <div className="md:col-span-3 saa-card rounded-xl p-2 flex items-center">
        {ag}
      </div>
      <div className="md:col-span-2 saa-card-teal rounded-xl p-4 flex flex-col gap-3 text-sm text-gray-300">
        {children}
      </div>
    </div>
  );
}

function Sayi({ etiket, deger }: { etiket: string; deger: string }) {
  return (
    <div className="saa-card rounded-lg px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-gray-500">
        {etiket}
      </div>
      <div className="text-lg font-semibold text-white leading-tight">{deger}</div>
    </div>
  );
}

/** 1. yol — rastgele kişi seçme: "zar at", 5 kişi seçilsin. */
function RastgeleLab() {
  const [secili, setSecili] = useState<number[]>([]);
  const zarAt = () => {
    const havuz = KISILER.map((_, i) => i);
    const yeni: number[] = [];
    while (yeni.length < 5) {
      const sira = Math.floor(Math.random() * havuz.length);
      yeni.push(havuz.splice(sira, 1)[0]);
    }
    setSecili(yeni);
  };
  const icinde = (i: number) => secili.includes(i);
  const kalan = BAGLAR.filter(([a, b]) => icinde(a) && icinde(b)).length;
  return (
    <LabDuzeni
      ag={
        <AgCizimi
          ton={(i) => (icinde(i) ? "secili" : "bos")}
          bagAcik={(a, b) => icinde(a) && icinde(b)}
        />
      }
    >
      <div className="saa-hint">
        <MousePointerClick className="w-3.5 h-3.5" />
        Tıkla: kura çek
      </div>
      <button type="button" className="saa-btn" onClick={zarAt}>
        <Dice5 className="w-4 h-4" />
        Zar at: rastgele 5 kişi seç
      </button>
      <div className="grid grid-cols-2 gap-2">
        <Sayi etiket="Seçilen kişi" deger={`${secili.length} / 14`} />
        <Sayi etiket="Kalan bağlantı" deger={`${kalan} / 18`} />
      </div>
      <p className="leading-relaxed">
        {secili.length === 0
          ? "Önce tahmin edin: seçilen 5 kişi arasında kaç bağlantı kalır?"
          : kalan === 0
          ? "Seçilenlerin hiçbiri birbirine bağlı değil. Kişiler var ama ağın şekli kayboldu."
          : `18 bağlantıdan yalnızca ${kalan} tanesi örnekte kaldı. Birkaç kez daha zar at ve karşılaştır.`}
      </p>
      <button
        type="button"
        className="saa-btn-ghost mt-auto"
        onClick={() => setSecili([])}
      >
        <RotateCcw className="w-4 h-4" />
        Sıfırla
      </button>
    </LabDuzeni>
  );
}

/** 2. yol — kartopu: bir kişiye tıkla, dalga dalga büyüt. */
function KartopuLab() {
  const [dalga, setDalga] = useState<Record<number, number>>({});
  const icinde = (i: number) => dalga[i] !== undefined;
  const ornek = Object.keys(dalga).map(Number);
  const sonDalga = ornek.length ? Math.max(...ornek.map((i) => dalga[i])) : 0;
  const yeniler = Array.from(
    new Set(ornek.flatMap((i) => komsular(i)).filter((i) => !icinde(i))),
  );
  const buyut = () => {
    const sonraki = { ...dalga };
    yeniler.forEach((i) => {
      sonraki[i] = sonDalga + 1;
    });
    setDalga(sonraki);
  };
  return (
    <LabDuzeni
      ag={
        <AgCizimi
          ton={(i) => (!icinde(i) ? "bos" : dalga[i] === 0 ? "aktif" : "secili")}
          rozet={(i) => (icinde(i) ? String(dalga[i]) : "")}
          bagAcik={(a, b) => icinde(a) && icinde(b)}
          onSec={(i) => setDalga({ [i]: 0 })}
        />
      }
    >
      <div className="saa-hint">
        <MousePointerClick className="w-3.5 h-3.5" />
        Ağda bir kişiye tıkla: başlangıç o
      </div>
      <button
        type="button"
        className="saa-btn"
        disabled={ornek.length === 0 || yeniler.length === 0}
        onClick={buyut}
      >
        <Snowflake className="w-4 h-4" />
        Bir dalga daha: arkadaşlarını ekle
      </button>
      <div className="grid grid-cols-2 gap-2">
        <Sayi etiket="Dalga" deger={ornek.length ? String(sonDalga) : "-"} />
        <Sayi etiket="Örnekteki kişi" deger={`${ornek.length} / 14`} />
      </div>
      <p className="leading-relaxed">
        {ornek.length === 0
          ? "0 başlangıç kişisi, 1 onun arkadaşları, 2 arkadaşlarının arkadaşları."
          : yeniler.length === 0
          ? "Herkes örneğe girdi. Şimdi başka bir kişiden başla: kaç dalga sürdü?"
          : `Sıradaki dalgada ${yeniler.length} kişi daha girecek. Kartopu yuvarlandıkça büyüyor.`}
      </p>
      <button
        type="button"
        className="saa-btn-ghost mt-auto"
        onClick={() => setDalga({})}
      >
        <RotateCcw className="w-4 h-4" />
        Sıfırla
      </button>
    </LabDuzeni>
  );
}

type Yuruyus = { konum: number; ziyaret: number[]; adim: number };

const BASLANGIC = 12; // Onur

function yuruyusBasi(): Yuruyus {
  return {
    konum: BASLANGIC,
    ziyaret: KISILER.map((_, i) => (i === BASLANGIC ? 1 : 0)),
    adim: 0,
  };
}

/** 3. yol — rastgele yürüyüş: her adımda rastgele bir arkadaşa geç. */
function YuruyusLab() {
  const [d, setD] = useState<Yuruyus>(yuruyusBasi);
  const yuru = (kac: number) => {
    let konum = d.konum;
    const ziyaret = [...d.ziyaret];
    for (let k = 0; k < kac; k++) {
      const ks = komsular(konum);
      konum = ks[Math.floor(Math.random() * ks.length)];
      ziyaret[konum] += 1;
    }
    setD({ konum, ziyaret, adim: d.adim + kac });
  };
  const enCok = d.ziyaret.indexOf(Math.max(...d.ziyaret));
  return (
    <LabDuzeni
      ag={
        <AgCizimi
          ton={(i) =>
            i === d.konum ? "aktif" : d.ziyaret[i] > 0 ? "secili" : "bos"
          }
          rozet={(i) => (d.ziyaret[i] > 0 ? String(d.ziyaret[i]) : "")}
          bagAcik={() => false}
        />
      }
    >
      <div className="saa-hint">
        <MousePointerClick className="w-3.5 h-3.5" />
        Tıkla: gezgini yürüt
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button type="button" className="saa-btn" onClick={() => yuru(1)}>
          <Footprints className="w-4 h-4" />1 adım
        </button>
        <button type="button" className="saa-btn" onClick={() => yuru(10)}>
          <Footprints className="w-4 h-4" />
          10 adım
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Sayi etiket="Şu an" deger={KISILER[d.konum].ad} />
        <Sayi etiket="Toplam adım" deger={String(d.adim)} />
      </div>
      <p className="leading-relaxed">
        {d.adim < 20
          ? "Gezgin Onur'dan başlıyor. Dairedeki sayı, o kişiye kaç kez uğrandığını gösterir. 30-40 adım attır."
          : `En çok uğranan: ${KISILER[enCok].ad} (${d.ziyaret[enCok]} kez). Neden o?`}
      </p>
      <button
        type="button"
        className="saa-btn-ghost mt-auto"
        onClick={() => setD(yuruyusBasi())}
      >
        <RotateCcw className="w-4 h-4" />
        Sıfırla
      </button>
    </LabDuzeni>
  );
}

/** Popüler kişiye giden kapı çoktur: kişiye tıkla, kapılarını gör. */
function KapiLab() {
  const [sec, setSec] = useState(0);
  const [hepsi, setHepsi] = useState(false);
  const derece = komsular(sec).length;
  return (
    <LabDuzeni
      ag={
        <AgCizimi
          ton={(i) => (i === sec ? "aktif" : komsular(sec).includes(i) ? "secili" : "bos")}
          rozet={(i) => (hepsi || i === sec ? String(komsular(i).length) : "")}
          bagAcik={(a, b) => a === sec || b === sec}
          onSec={setSec}
        />
      }
    >
      <div className="saa-hint">
        <MousePointerClick className="w-3.5 h-3.5" />
        Ağda bir kişiye tıkla
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Sayi etiket="Seçilen kişi" deger={KISILER[sec].ad} />
        <Sayi etiket="Arkadaş = kapı" deger={String(derece)} />
      </div>
      <p className="leading-relaxed">
        {derece >= 4
          ? `Bu kişiye ${derece} ayrı arkadaştan ulaşılır. Kartopu da gezgin de onu kolayca bulur.`
          : derece === 1
          ? "Tek kapı var. O tek arkadaş örneğe girmezse bu kişi hiç görülmez."
          : `Yalnızca ${derece} kapı var. Örneğe girmesi, çok arkadaşı olana göre daha zor.`}
      </p>
      <button
        type="button"
        className="saa-btn-ghost mt-auto"
        onClick={() => setHepsi((h) => !h)}
      >
        {hepsi ? "Sayıları gizle" : "Herkesin kapı sayısını göster"}
      </button>
    </LabDuzeni>
  );
}

const YOLLAR = [
  {
    ad: "Rastgele kişi",
    nasil: "Listeden kura çeker gibi kişi seçersin.",
    iyi: "Herkesin şansı eşittir, kimse kayırılmaz.",
    dikkat: "Tam liste gerekir. Seçilenler çoğu zaman birbirini tanımaz, bağlantılar kaybolur.",
    ornek: "Okulun öğrenci listesinden 50 numara çekmek.",
  },
  {
    ad: "Kartopu",
    nasil: "Bir kişiden başlar, arkadaşlarını, sonra onların arkadaşlarını eklersin.",
    iyi: "Liste olmadan da çalışır. Ulaşması zor gruplara arkadaş üzerinden girersin.",
    dikkat: "Başladığın kişinin çevresinde kalırsın. Popüler kişiler hemen örneğe girer.",
    ornek: "Bir oyun topluluğunu tek bir oyuncudan başlayarak bulmak.",
  },
  {
    ad: "Rastgele yürüyüş",
    nasil: "Bir kişiden başlar, her adımda rastgele bir arkadaşına geçersin.",
    iyi: "Her adımda tek kişinin arkadaş listesi yeter. Çok büyük ağlarda pratiktir.",
    dikkat: "Çok arkadaşı olana daha sık uğrar, az arkadaşı olanı kaçırabilir.",
    ornek: "Bir hesaptan başlayıp takip listelerinde rastgele ilerlemek.",
  },
];

/** Üç yolu yan yana: çipe tıkla, kart değişsin. */
function YolSecici() {
  const [no, setNo] = useState(0);
  const y = YOLLAR[no];
  const satirlar: Array<[string, string]> = [
    ["Nasıl çalışır?", y.nasil],
    ["İyi yanı", y.iyi],
    ["Dikkat", y.dikkat],
    ["Örnek", y.ornek],
  ];
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        {YOLLAR.map((yol, i) => (
          <button
            key={yol.ad}
            type="button"
            onClick={() => setNo(i)}
            className={`saa-btn-ghost ${i === no ? "saa-chip-on" : ""}`}
          >
            {yol.ad}
          </button>
        ))}
        <span className="saa-hint">
          <MousePointerClick className="w-3.5 h-3.5" />
          Yola tıkla
        </span>
      </div>
      <motion.div
        key={y.ad}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="saa-card-teal rounded-xl p-5 mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
      >
        {satirlar.map(([etiket, metin]) => (
          <div key={etiket}>
            <div className="text-[11px] uppercase tracking-wider text-[#5eead4] mb-1">
              {etiket}
            </div>
            <div className="text-base text-gray-200 leading-relaxed">{metin}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function KodOrnegi() {
  return (
    <div className="saa-window-chrome w-full">
      <div className="saa-window-bar px-4 py-2 text-[11px] font-mono text-[#5eead4]">
        rastgele_ornek.py · networkx
      </div>
      <pre className="saa-code p-5 overflow-x-auto m-0">
        <code>
          <span className="saa-code-kw">import</span> networkx{" "}
          <span className="saa-code-kw">as</span> nx{"\n"}
          <span className="saa-code-kw">import</span> random{"\n"}
          {"\n"}
          ag = nx.<span className="saa-code-fn">karate_club_graph</span>(){"      "}
          <span className="saa-code-cmt"># 34 kişilik hazır ağ (evren)</span>
          {"\n"}
          kisiler = <span className="saa-code-fn">list</span>(ag.nodes()){"          "}
          <span className="saa-code-cmt"># herkesin listesi</span>
          {"\n"}
          {"\n"}
          secilen = random.<span className="saa-code-fn">sample</span>(kisiler,{" "}
          <span className="saa-code-num">8</span>){"   "}
          <span className="saa-code-cmt"># kura: rastgele 8 kişi</span>
          {"\n"}
          ornek = ag.<span className="saa-code-fn">subgraph</span>(secilen){"          "}
          <span className="saa-code-cmt"># yalnız onların ağı</span>
          {"\n"}
          {"\n"}
          <span className="saa-code-fn">print</span>(
          <span className="saa-code-str">&quot;Seçilenler:&quot;</span>, secilen){"\n"}
          <span className="saa-code-fn">print</span>(
          <span className="saa-code-str">&quot;Kalan bağlantı:&quot;</span>, ornek.
          <span className="saa-code-fn">number_of_edges</span>())
        </code>
      </pre>
    </div>
  );
}

const ARA_SINAV: Soru[] = [
  {
    soru: "Yoklama listesinden gözün kapalı 5 numara çektin. Bu hangi yol?",
    siklar: [
      "Rastgele kişi seçme",
      "Kartopu",
      "Rastgele yürüyüş",
      "Bu bir örnek sayılmaz",
    ],
    dogru: 0,
    aciklama:
      "Listeden kura çekiyorsun; kimsenin arkadaşına bakmıyorsun. Bu, rastgele kişi seçmedir.",
  },
];

const SON_SINAV: Soru[] = [
  {
    soru: "Evren ile örnek arasındaki fark nedir?",
    siklar: [
      "Evren ağın tamamıdır, örnek ondan seçtiğimiz parçadır",
      "Evren küçüktür, örnek büyüktür",
      "İkisi aynı şeydir",
      "Örnek yalnızca popüler kişilerden oluşur",
    ],
    dogru: 0,
    aciklama: "Evren hepsi, örnek ise bakmak için seçtiğimiz küçük parça.",
  },
  {
    soru: "Elinde liste yok, topluluktan yalnızca bir kişiyi tanıyorsun. Nasıl başlarsın?",
    siklar: [
      "Rastgele kişi seçerim",
      "Kartopu: o kişiden başlar, arkadaşlarına geçerim",
      "Bütün ağı bilgisayara indiririm",
      "Alfabetik listeden ilk 10 kişiyi alırım",
    ],
    dogru: 1,
    aciklama:
      "Liste olmadan kura çekilmez. Kartopu, tanıdığın kişiden başlayıp arkadaştan arkadaşa ilerler.",
  },
  {
    soru: "Kartopu ve rastgele yürüyüşte popüler kişiler örneğe neden daha kolay girer?",
    siklar: [
      "Adları alfabede önde olduğu için",
      "Hesapları daha eski olduğu için",
      "Çok arkadaşları olduğu için onlara giden yol çoktur",
      "Bilgisayar onları özellikle seçtiği için",
    ],
    dogru: 2,
    aciklama:
      "Her arkadaş bir kapıdır. Kapısı çok olana ulaşmak kolaydır; bu yüzden örnekte fazla görünürler.",
  },
];

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  // 1 — Kapak
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2105 · 13. Hafta — Sosyal Ağ Analizi</Eyebrow>
        <H1 className="saa-shimmer">
          Ağ Örnekleme
          <br />
          Teknikleri
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bütün Türkiye&apos;ye soramazsın. Peki kimi seçeceksin?
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto text-left">
          <FeatureCard
            icon={Dice5}
            title="Rastgele kişi"
            desc="Listeden kura çeker gibi seçmek."
            accent="#14b8a6"
            delay={0.3}
          />
          <FeatureCard
            icon={Snowflake}
            title="Kartopu"
            desc="Arkadaştan arkadaşa büyüyen örnek."
            accent="#0d9488"
            delay={0.45}
          />
          <FeatureCard
            icon={Footprints}
            title="Rastgele yürüyüş"
            desc="Her adımda bir arkadaşa geçen gezgin."
            accent="#5eead4"
            delay={0.6}
          />
        </div>
      </div>
    </SlideShell>
  ),

  // 2 — Sorun + benzetme (sınıf oylaması / tıkla göster)
  () => (
    <Icerik
      ust="Sorun · neden örnek alıyoruz?"
      baslik="Çorbanın tadına bakmak için tencereyi bitirmezsin"
      alt="Bir kaşık yeter, çünkü kaşıktaki çorba tenceredekine benzer. Ağlarda da aynısını yaparız."
      sor="Günlük hayatta başka nerede bir parçaya bakıp bütünü tahmin ediyoruz?"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Reveal
          soru="Kaçınız bir ankete katıldı? Sence bir seçim anketi kaç kişiye sorulur?"
          cevap="Milyonlarca seçmen var ama anketler genellikle birkaç bin kişiyle yapılır. Doğru seçilirse küçük grup büyük resmi gösterir."
          ipucu="El kaldırın, sonra tıkla"
        />
        <Reveal
          soru="Instagram'daki herkesin arkadaşlık ağını bilgisayarına indirebilir misin?"
          cevap="Hayır. Kullanıcı çok fazla, platform hepsini vermez, bilgisayarın da yetmez. Bu yüzden ağın bir parçasıyla çalışırız."
        />
      </div>
    </Icerik>
  ),

  // 3 — İki terim: evren ve örnek
  () => (
    <Icerik
      ust="Kavram · iki yeni kelime"
      baslik="Evren hepsi, örnek senin seçtiklerin"
      sor="Bu sınıf evrense, iyi bir örnek kimlerden oluşur?"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Users}
          title="Evren"
          desc="İlgilendiğin ağın tamamı. Örneğin okuldaki bütün öğrenciler ve arkadaşlıkları."
          delay={0.1}
        />
        <FeatureCard
          icon={Filter}
          title="Örnek"
          desc="Evrenden seçtiğin küçük parça. Örneğin 40 öğrenci ve aralarındaki arkadaşlıklar."
          accent="#0d9488"
          delay={0.25}
        />
        <FeatureCard
          icon={Target}
          title="İyi örnek"
          desc="Küçüktür ama bütüne benzer: içinde hem çok arkadaşı olan hem az arkadaşı olan vardır."
          accent="#5eead4"
          delay={0.4}
        />
      </div>
    </Icerik>
  ),

  // 4 — Taraflı örnek (tahmin et → tıkla göster)
  () => (
    <Icerik
      ust="Tahmin et · bu örnekte sorun ne?"
      baslik="Kimi seçtiğin, sonucu değiştirir"
      sor="Okulun en sevdiği diziyi bulmak için yalnız kendi arkadaşlarına sorsan ne çıkar?"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Reveal
          soru="Kantinde sıradaki ilk 10 kişiye sordun."
          cevap="Hep kantine gelenler çıktı. Yemeğini evden getiren ya da o saatte derste olan kimse yok."
        />
        <Reveal
          soru="Yalnızca kendi arkadaşlarına sordun."
          cevap="Arkadaşların sana benzer. Sonuç senin çevreni gösterir, okulun tamamını değil."
        />
        <Reveal
          soru="Yalnızca en çok takipçisi olan hesaplara baktın."
          cevap="Herkes çok takipçili sanılır. Oysa hesapların çoğunun az takipçisi vardır."
        />
      </div>
      <div className="mt-4 text-base text-gray-300 text-center">
        Örnek bir tarafa kayarsa buna{" "}
        <span className="text-[#5eead4] font-semibold">yanlılık</span> (bias:
        taraflı örnek) denir.
      </div>
    </Icerik>
  ),

  // 5 — 1. yol: rastgele kişi (oyna-gör)
  () => (
    <Icerik
      ust="1. yol · rastgele kişi seçme"
      baslik="Listeden kura çeker gibi rastgele kişi seçersin"
      sor="Seçilen 5 kişi birbirini tanıyor mu? Ağın şekli hâlâ görünüyor mu?"
    >
      <RastgeleLab />
    </Icerik>
  ),

  // 6 — 2. yol: kartopu (adım adım)
  () => (
    <Icerik
      ust="2. yol · kartopu"
      baslik="Kartopu, arkadaştan arkadaşa yuvarlanarak büyür"
      sor="Elif'ten başlamakla Onur'dan başlamak arasında ne fark var?"
    >
      <KartopuLab />
    </Icerik>
  ),

  // 7 — 3. yol: rastgele yürüyüş (oyna-gör)
  () => (
    <Icerik
      ust="3. yol · rastgele yürüyüş"
      baslik="Gezgin her adımda rastgele bir arkadaşa geçer"
      sor="Gezgin en çok kime uğradı? Onur'a neden az uğruyor?"
    >
      <YuruyusLab />
    </Icerik>
  ),

  // 8 — Mini sınav (ortada)
  () => (
    <Icerik ust="Mini sınav · durup düşünelim" baslik="Bu hangi yol?">
      <Quiz sorular={ARA_SINAV} />
    </Icerik>
  ),

  // 9 — Popüler kişiler neden daha çok girer? (oyna-gör)
  () => (
    <Icerik
      ust="Sezgi · popüler kişiler"
      baslik="Popüler kişiye giden kapı çoktur"
      sor="Örnekte hep popülerler olursa &ldquo;ortalama arkadaş sayısı&rdquo; olduğundan büyük mü çıkar, küçük mü?"
    >
      <KapiLab />
    </Icerik>
  ),

  // 10 — Üç yol yan yana (seçenek çipleri)
  () => (
    <Icerik
      ust="Toparlayalım · hangisi ne zaman?"
      baslik="Üç yolun da iyi yanı ve dikkat edilecek yanı var"
      sor="Okuldaki bir oyun topluluğunu bulmak için hangi yolu seçerdin?"
    >
      <YolSecici />
    </Icerik>
  ),

  // 11 — Tek kısa networkx örneği
  () => (
    <Icerik
      ust="Python · tek kısa örnek"
      baslik="Python'da rastgele örnek almak birkaç satır sürer"
      sor="Kodu iki kez çalıştırırsak aynı 8 kişi mi çıkar? Neden?"
    >
      <KodOrnegi />
    </Icerik>
  ),

  // 12 — Sınıfta deneyelim (adım adım)
  () => (
    <Icerik
      ust="Sınıfta deneyelim · 10 dakika"
      baslik="Sınıfın kartopu örneğini tahtada çıkaralım"
      sor="İki listede de çıkan var mı? Hiç çıkmayan kim, neden?"
    >
      <Stepper
        adimlar={[
          {
            baslik: "Başlangıç kişisi",
            metin: "Bir gönüllü adını tahtaya yazar. Kartopu ondan başlıyor.",
          },
          {
            baslik: "Birinci dalga",
            metin: "Gönüllü, sınıfta en çok konuştuğu 2 kişiyi söyler. Adları yazıp çizgiyle bağlarız.",
          },
          {
            baslik: "İkinci dalga",
            metin: "O iki kişi de ikişer kişi söyler. Tahtada küçük bir ağ oluştu.",
          },
          {
            baslik: "Rastgele liste ile karşılaştır",
            metin: "Yoklama listesinden telefonla rastgele 6 numara çekeriz. İki listeyi yan yana koyarız.",
          },
        ]}
      />
    </Icerik>
  ),

  // 13 — Kendini dene (3 soru)
  () => (
    <Icerik ust="Kendini dene · 3 soru" baslik="Bugün ne öğrendik, bakalım">
      <Quiz sorular={SON_SINAV} />
    </Icerik>
  ),

  // 14 — Aklında kalsın + köprü
  () => (
    <Icerik ust="Özet · 13. hafta" baslik="Aklında kalsın: 3 şey">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          "Ağın tamamına bakamayız. Küçük ama bütüne benzeyen bir örnek seçeriz.",
          "Üç yol var: rastgele kişi seçme, kartopu ve rastgele yürüyüş.",
          "Kimi nasıl seçtiğin sonucu değiştirir. Arkadaş üzerinden giden yollar popüler kişileri öne çıkarır.",
        ].map((metin, i) => (
          <motion.div
            key={metin}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * i }}
            className="saa-card rounded-xl p-5"
          >
            <div className="saa-tick w-9 h-9 flex items-center justify-center font-bold mb-3">
              {i + 1}
            </div>
            <div className="text-base text-gray-200 leading-relaxed">{metin}</div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-5 saa-card-teal rounded-xl px-5 py-4 flex items-center gap-3 text-base text-gray-200"
      >
        <ArrowRight className="w-5 h-5 text-[#5eead4] shrink-0" />
        <span>
          <span className="text-[#5eead4] font-semibold">Gelecek hafta:</span>{" "}
          Bilgisayar ağa bakıp &ldquo;bu iki kişi tanışıyor olabilir&rdquo;
          demeyi nasıl öğrenir?
        </span>
      </motion.div>
    </Icerik>
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
            background: "linear-gradient(90deg, #14b8a6, #5eead4, #14b8a6)",
            boxShadow: "0 0 16px rgba(20,184,166,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#14b8a6]/70">
          BVA 2105 · 13. Hafta · Ağ Örnekleme Teknikleri
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[#14b8a6]/50">
            <span className="text-[#14b8a6]">
              {String(current + 1).padStart(2, "0")}
            </span>
            <span className="mx-1">/</span>
            {String(TOTAL).padStart(2, "0")}
          </div>
          <button
            type="button"
            onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen?.();
              } else {
                document.exitFullscreen?.();
              }
            }}
            className="p-1.5 text-gray-500 hover:text-[#14b8a6] transition-colors"
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
        type="button"
        onClick={prev}
        disabled={current === 0}
        aria-label="Önceki slayt"
        className="absolute left-0 top-12 bottom-16 w-[12%] z-30 cursor-w-resize disabled:cursor-default opacity-0"
      />
      <button
        type="button"
        onClick={next}
        disabled={current === TOTAL - 1}
        aria-label="Sonraki slayt"
        className="absolute right-0 top-12 bottom-16 w-[12%] z-30 cursor-e-resize disabled:cursor-default opacity-0"
      />

      <div className="absolute bottom-0 left-0 right-0 z-40 px-8 py-4 flex items-center justify-between border-t border-white/5 bg-black/60 backdrop-blur">
        <button
          type="button"
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#14b8a6] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Önceki
        </button>
        <div className="flex items-center gap-1 max-w-[60%] overflow-hidden">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              aria-label={`Slayt ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === current
                  ? "w-5 bg-[#14b8a6]"
                  : "w-1.5 bg-white/15 hover:bg-white/40"
              }`}
              style={
                i === current
                  ? { boxShadow: "0 0 10px rgba(20,184,166,0.6)" }
                  : undefined
              }
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#14b8a6] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
