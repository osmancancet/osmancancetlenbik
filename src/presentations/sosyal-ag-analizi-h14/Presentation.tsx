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
  UserPlus,
  UserX,
  Sparkles,
  BookOpen,
  Search,
  Lightbulb,
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
   KONU BİLEŞENLERİ — AĞ TEMELLİ MAKİNE ÖĞRENİMİ
   ============================================================ */

type Kisi = { ad: string; x: number; y: number };

/** 10 kişilik küçük arkadaşlık ağı. */
const KISILER: Kisi[] = [
  { ad: "Ali", x: 150, y: 175 },
  { ad: "Ece", x: 285, y: 75 },
  { ad: "Mert", x: 300, y: 185 },
  { ad: "Su", x: 270, y: 290 },
  { ad: "Kerem", x: 440, y: 105 },
  { ad: "Derya", x: 425, y: 295 },
  { ad: "Naz", x: 570, y: 285 },
  { ad: "Can", x: 575, y: 80 },
  { ad: "Lale", x: 660, y: 185 },
  { ad: "Ozan", x: 60, y: 60 },
];

const BAGLAR: Array<[number, number]> = [
  [0, 1], [0, 2], [0, 3], [0, 9], [1, 2], [4, 1], [4, 2], [4, 7],
  [5, 3], [5, 6], [7, 8], [6, 8],
];

function komsular(i: number): number[] {
  return BAGLAR.filter(([a, b]) => a === i || b === i).map(([a, b]) =>
    a === i ? b : a,
  );
}

/** i ile j'nin ortak arkadaşları. */
function ortaklar(i: number, j: number): number[] {
  const kj = komsular(j);
  return komsular(i).filter((k) => kj.includes(k));
}

type Ton = "bos" | "arkadas" | "aday" | "ben";

const TONLAR: Record<Ton, { fill: string; stroke: string; yazi: string }> = {
  bos: { fill: "#111827", stroke: "#374151", yazi: "#9ca3af" },
  arkadas: { fill: "#134e4a", stroke: "#2dd4bf", yazi: "#ffffff" },
  aday: { fill: "#0d9488", stroke: "#5eead4", yazi: "#ffffff" },
  ben: { fill: "#5eead4", stroke: "#ffffff", yazi: "#042f2e" },
};

/** Bağlantı tahmini: kişiye tıkla, ortak arkadaş sayısına göre öneri sırası gelsin. */
function OrtakArkadasLab() {
  const [ben, setBen] = useState(0);
  const arkadaslar = komsular(ben);
  const adaylar = KISILER.map((_, i) => i)
    .filter((i) => i !== ben && !arkadaslar.includes(i))
    .map((i) => ({ i, ortak: ortaklar(ben, i) }))
    .filter((a) => a.ortak.length > 0)
    .sort((a, b) => b.ortak.length - a.ortak.length)
    .slice(0, 3);
  const sayi = (i: number) => adaylar.find((a) => a.i === i)?.ortak.length ?? 0;
  const ton = (i: number): Ton =>
    i === ben
      ? "ben"
      : arkadaslar.includes(i)
      ? "arkadas"
      : sayi(i) > 0
      ? "aday"
      : "bos";
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-stretch">
      <div className="md:col-span-3 saa-card rounded-xl p-2 flex items-center">
        <svg viewBox="0 0 720 345" className="w-full h-auto">
          {BAGLAR.map(([a, b]) => {
            const acik = a === ben || b === ben;
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
            return (
              <g key={k.ad} onClick={() => setBen(i)} className="saa-node-click">
                <circle
                  cx={k.x}
                  cy={k.y}
                  r={20}
                  fill={t.fill}
                  stroke={t.stroke}
                  strokeWidth={2.5}
                />
                {sayi(i) > 0 && (
                  <text
                    x={k.x}
                    y={k.y + 5}
                    textAnchor="middle"
                    fontSize={15}
                    fontWeight={700}
                    fill={t.yazi}
                  >
                    {sayi(i)}
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
      </div>
      <div className="md:col-span-2 saa-card-teal rounded-xl p-4 flex flex-col gap-3 text-sm text-gray-300">
        <div className="saa-hint">
          <MousePointerClick className="w-3.5 h-3.5" />
          Ağda bir kişiye tıkla
        </div>
        <div className="text-base text-white font-semibold">
          {KISILER[ben].ad} için &ldquo;tanıyor olabileceğin kişiler&rdquo;
        </div>
        {adaylar.length === 0 ? (
          <p className="leading-relaxed">
            Ortak arkadaşı olan kimse yok; bu ölçüyle önerecek kişi çıkmadı.
          </p>
        ) : (
          <div className="space-y-2">
            {adaylar.map((a, sira) => (
              <div
                key={a.i}
                className="saa-card rounded-lg px-3 py-2 flex items-center gap-3"
              >
                <div className="saa-tick w-7 h-7 flex items-center justify-center text-xs font-bold shrink-0">
                  {sira + 1}
                </div>
                <div className="min-w-0">
                  <div className="text-white font-semibold">
                    {KISILER[a.i].ad} · {a.ortak.length} ortak arkadaş
                  </div>
                  <div className="text-xs text-gray-400">
                    {a.ortak.map((o) => KISILER[o].ad).join(", ")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <p className="leading-relaxed text-xs text-gray-400 mt-auto">
          Dairedeki sayı ortak arkadaş sayısıdır. Ağda henüz olmayan bir
          arkadaşlığı böyle tahmin etmeye{" "}
          <span className="text-[#5eead4] font-semibold">bağlantı tahmini</span>{" "}
          denir.
        </p>
      </div>
    </div>
  );
}

type Karar = "gercek" | "supheli";

const HESAPLAR: Array<{
  ad: string;
  satirlar: Array<[string, string]>;
  dogru: Karar;
  neden: string;
}> = [
  {
    ad: "zeynep.arslan",
    satirlar: [
      ["Takip ettiği", "310"],
      ["Takipçisi", "295"],
      ["Çevresi", "çoğu birbirini tanıyor"],
    ],
    dogru: "gercek",
    neden: "Takip ve takipçi dengeli, arkadaşları da birbirine bağlı. Gerçek bir çevreye benziyor.",
  },
  {
    ad: "firsat_kampanya_9921",
    satirlar: [
      ["Takip ettiği", "4.900"],
      ["Takipçisi", "12"],
      ["Çevresi", "kimse birbirini tanımıyor"],
    ],
    dogru: "supheli",
    neden: "Binlerce kişiyi takip ediyor ama onu neredeyse kimse takip etmiyor. Takip ettikleri arasında da bağ yok.",
  },
  {
    ad: "mert.fotograf",
    satirlar: [
      ["Takip ettiği", "180"],
      ["Takipçisi", "21.000"],
      ["Çevresi", "takipçiler birbirini tanımıyor"],
    ],
    dogru: "gercek",
    neden: "Dengesiz ama ters yönde: çok kişi onu takip ediyor. Sevilen bir içerik hesabına benziyor. Tek sayıyla karar verilmez.",
  },
];

/** Düğüm sınıflandırma: sınıf karar verir, tıklayınca gerekçe açılır. */
function SahteHesapLab() {
  const [karar, setKarar] = useState<Record<number, Karar>>({});
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {HESAPLAR.map((h, i) => {
          const k = karar[i];
          const kutu = !k ? "saa-card" : k === h.dogru ? "saa-ok" : "saa-no";
          return (
            <div key={h.ad} className={`rounded-xl p-4 transition-all ${kutu}`}>
              <div className="font-mono text-sm text-[#5eead4] mb-2">@{h.ad}</div>
              <div className="space-y-1 text-sm">
                {h.satirlar.map(([etiket, deger]) => (
                  <div key={etiket} className="flex justify-between gap-3">
                    <span className="text-gray-500 shrink-0">{etiket}</span>
                    <span className="text-white font-semibold text-right">
                      {deger}
                    </span>
                  </div>
                ))}
              </div>
              {!k ? (
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <button
                    type="button"
                    className="saa-btn-ghost"
                    onClick={() => setKarar({ ...karar, [i]: "gercek" })}
                  >
                    Gerçek gibi
                  </button>
                  <button
                    type="button"
                    className="saa-btn-ghost"
                    onClick={() => setKarar({ ...karar, [i]: "supheli" })}
                  >
                    Şüpheli
                  </button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-sm text-gray-200 leading-relaxed"
                >
                  <span className="font-semibold text-white">
                    {h.dogru === "gercek" ? "Gerçek gibi. " : "Şüpheli. "}
                  </span>
                  {h.neden}
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="saa-hint">
          <MousePointerClick className="w-3.5 h-3.5" />
          Sınıf oylasın, sonra butona tıkla
        </span>
        <button
          type="button"
          className="saa-btn-ghost"
          onClick={() => setKarar({})}
        >
          <RotateCcw className="w-4 h-4" />
          Sıfırla
        </button>
      </div>
    </div>
  );
}

const ICERIKLER = [
  "Uzay filmi",
  "Komedi dizisi",
  "Korku filmi",
  "Futbol belgeseli",
  "Tarih belgeseli",
  "Yemek programı",
];

const IZLEYENLER: Array<{ ad: string; liste: number[] }> = [
  { ad: "Zeynep", liste: [0, 1, 2] },
  { ad: "Burak", liste: [3, 4, 5] },
  { ad: "Ece", liste: [1, 3, 5] },
];

/** Öneri sistemi: izlediklerini seç, sana en çok benzeyen kişiden öneri gelsin. */
function OneriLab() {
  const [sec, setSec] = useState<number[]>([]);
  const degistir = (i: number) =>
    setSec(sec.includes(i) ? sec.filter((s) => s !== i) : [...sec, i]);
  const puanlar = IZLEYENLER.map(
    (k) => k.liste.filter((i) => sec.includes(i)).length,
  );
  const enIyi = Math.max(...puanlar);
  const benzer = enIyi > 0 ? puanlar.indexOf(enIyi) : -1;
  const oneriler =
    benzer >= 0 ? IZLEYENLER[benzer].liste.filter((i) => !sec.includes(i)) : [];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="saa-card rounded-xl p-4">
        <div className="saa-hint mb-3">
          <MousePointerClick className="w-3.5 h-3.5" />
          Sen neleri izledin? Tıkla
        </div>
        <div className="grid grid-cols-2 gap-2">
          {ICERIKLER.map((ad, i) => (
            <button
              key={ad}
              type="button"
              onClick={() => degistir(i)}
              className={`saa-btn-ghost ${sec.includes(i) ? "saa-chip-on" : ""}`}
            >
              {ad}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="saa-btn-ghost mt-3 w-full"
          onClick={() => setSec([])}
        >
          <RotateCcw className="w-4 h-4" />
          Sıfırla
        </button>
      </div>
      <div className="saa-card-teal rounded-xl p-4 flex flex-col gap-2 text-sm">
        {IZLEYENLER.map((k, i) => (
          <div
            key={k.ad}
            className={`rounded-lg px-3 py-2 ${
              i === benzer ? "saa-ok" : "saa-card"
            }`}
          >
            <div className="flex justify-between text-white font-semibold">
              <span>{k.ad}</span>
              <span>{puanlar[i]} ortak</span>
            </div>
            <div className="text-xs text-gray-400">
              {k.liste.map((x) => ICERIKLER[x]).join(", ")}
            </div>
          </div>
        ))}
        <div className="mt-auto pt-2 text-base text-gray-200 leading-relaxed">
          {benzer < 0 ? (
            "Önce izlediklerini seç: sana en çok kim benziyor?"
          ) : oneriler.length === 0 ? (
            `${IZLEYENLER[benzer].ad} ile aynı şeyleri izlemişsin; önerecek yeni bir şey kalmadı.`
          ) : (
            <>
              <span className="text-[#5eead4] font-semibold">Sana öneri: </span>
              {oneriler.map((x) => ICERIKLER[x]).join(", ")}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function KodOrnegi() {
  return (
    <div className="saa-window-chrome w-full">
      <div className="saa-window-bar px-4 py-2 text-[11px] font-mono text-[#5eead4]">
        ortak_arkadas.py · networkx
      </div>
      <pre className="saa-code p-5 overflow-x-auto m-0">
        <code>
          <span className="saa-code-kw">import</span> networkx{" "}
          <span className="saa-code-kw">as</span> nx{"\n"}
          {"\n"}
          ag = nx.<span className="saa-code-fn">Graph</span>(){"   "}
          <span className="saa-code-cmt"># boş bir arkadaşlık ağı</span>
          {"\n"}
          ag.<span className="saa-code-fn">add_edges_from</span>([(
          <span className="saa-code-str">&quot;Ali&quot;</span>,{" "}
          <span className="saa-code-str">&quot;Ece&quot;</span>), (
          <span className="saa-code-str">&quot;Ali&quot;</span>,{" "}
          <span className="saa-code-str">&quot;Mert&quot;</span>), (
          <span className="saa-code-str">&quot;Ali&quot;</span>,{" "}
          <span className="saa-code-str">&quot;Su&quot;</span>),{"\n"}
          {"                   "}(
          <span className="saa-code-str">&quot;Kerem&quot;</span>,{" "}
          <span className="saa-code-str">&quot;Ece&quot;</span>), (
          <span className="saa-code-str">&quot;Kerem&quot;</span>,{" "}
          <span className="saa-code-str">&quot;Mert&quot;</span>), (
          <span className="saa-code-str">&quot;Derya&quot;</span>,{" "}
          <span className="saa-code-str">&quot;Su&quot;</span>)]){"\n"}
          {"\n"}
          <span className="saa-code-kw">for</span> aday{" "}
          <span className="saa-code-kw">in</span> [
          <span className="saa-code-str">&quot;Kerem&quot;</span>,{" "}
          <span className="saa-code-str">&quot;Derya&quot;</span>]:{"   "}
          <span className="saa-code-cmt"># Ali&apos;ye önerilebilecek kişiler</span>
          {"\n"}
          {"    "}ortak = <span className="saa-code-fn">list</span>(nx.
          <span className="saa-code-fn">common_neighbors</span>(ag,{" "}
          <span className="saa-code-str">&quot;Ali&quot;</span>, aday)){"\n"}
          {"    "}
          <span className="saa-code-fn">print</span>(aday,{" "}
          <span className="saa-code-fn">len</span>(ortak),{" "}
          <span className="saa-code-str">&quot;ortak arkadaş:&quot;</span>, ortak)
        </code>
      </pre>
    </div>
  );
}

const ARA_SINAV: Soru[] = [
  {
    soru: "Selin'in arkadaşları: Bora, İpek, Tuna. Yiğit bu üçünü de tanıyor; Gül yalnızca Tuna'yı tanıyor. Selin'e önce kim önerilir?",
    siklar: ["Yiğit", "Gül", "İkisi aynı sırada", "Hiçbiri önerilmez"],
    dogru: 0,
    aciklama:
      "Yiğit ile 3, Gül ile 1 ortak arkadaş var. Ortak arkadaşı çok olan listenin başına gelir.",
  },
];

const SON_SINAV: Soru[] = [
  {
    soru: "“Tanıyor olabileceğin kişiler” listesi hangi soruya cevap arar?",
    siklar: [
      "Bu iki kişi tanışıyor olabilir mi?",
      "Bu hesap sahte mi?",
      "Bu kişi hangi diziyi izlemeli?",
      "Ağda toplam kaç kişi var?",
    ],
    dogru: 0,
    aciklama:
      "Ağda henüz olmayan bir arkadaşlığı tahmin eder. Buna bağlantı tahmini demiştik.",
  },
  {
    soru: "Bir hesap 5.000 kişiyi takip ediyor, 10 takipçisi var ve takip ettikleri birbirini tanımıyor. Model ne der?",
    siklar: [
      "Kesinlikle gerçek",
      "Şüpheli: sahte hesaba benziyor",
      "Çok popüler bir hesap",
      "Bu bilgilerle hiçbir şey söylenemez",
    ],
    dogru: 1,
    aciklama:
      "Çok takip, az takipçi ve bağsız bir çevre sahte hesaplarda sık görülür. Yine de bu bir tahmindir.",
  },
  {
    soru: "Model bir hesaba “sahte” dedi. Bu ne anlama gelir?",
    siklar: [
      "Hesap kesinlikle sahtedir",
      "Hesap kesinlikle gerçektir",
      "Büyük ihtimalle sahtedir ama model yanılabilir",
      "Modelin bu konuda bir fikri yoktur",
    ],
    dogru: 2,
    aciklama: "Model örneklerden öğrenir ve tahmin eder; tahmin kesin bilgi değildir.",
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
        <Eyebrow>BVA 2105 · 14. Hafta — Sosyal Ağ Analizi</Eyebrow>
        <H1 className="saa-shimmer">
          Ağ Temelli
          <br />
          Makine Öğrenimi
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Uygulama seni tanımıyor; ama ağına bakıp tahmin yürütüyor.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto text-left">
          <FeatureCard
            icon={UserPlus}
            title="Tanıyor olabileceğin kişiler"
            desc="Bu iki kişi tanışıyor olabilir mi?"
            accent="#14b8a6"
            delay={0.3}
          />
          <FeatureCard
            icon={UserX}
            title="Bu hesap sahte mi?"
            desc="Hesabın ağdaki davranışına bakmak."
            accent="#0d9488"
            delay={0.45}
          />
          <FeatureCard
            icon={Sparkles}
            title="Sana özel öneriler"
            desc="Sana benzeyenler neyi sevdi?"
            accent="#5eead4"
            delay={0.6}
          />
        </div>
      </div>
    </SlideShell>
  ),

  // 2 — Sorun (sınıf oylaması / tıkla göster)
  () => (
    <Icerik
      ust="Sorun · uygulama nereden biliyor?"
      baslik="Uygulama, tanıdığın birini sana nasıl öneriyor?"
      alt="Kimseye &ldquo;ben bu kişiyi tanıyorum&rdquo; demedin. Yine de liste çoğu zaman tutuyor."
      sor="Sana en son kim önerildi? Gerçekten tanıyor muydun?"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Reveal
          soru="Kaçınıza “tanıyor olabileceğin kişiler” listesinde gerçekten tanıdığınız biri çıktı?"
          cevap="Çoğumuza çıkar. Demek ki uygulama rastgele önermiyor; elindeki bir bilgiye bakıyor."
          ipucu="El kaldırın, sonra tıkla"
        />
        <Reveal
          soru="Sence uygulama bunu nereden biliyor?"
          cevap="Arkadaşlık ağına bakıyor: kimler kiminle bağlı? Bugün bu ağdan nasıl tahmin çıkarıldığını göreceğiz."
        />
      </div>
    </Icerik>
  ),

  // 3 — Makine öğrenimi benzetmesi
  () => (
    <Icerik
      ust="Kavram · makine öğrenimi"
      baslik="Kuralı biz yazmayız, bilgisayar örneklerden çıkarır"
      alt="Küçük bir çocuk kediyi tariften öğrenmez; çok kedi görür ve tanımaya başlar. Makine öğrenimi de böyledir."
      sor="Sen bisiklete binmeyi kural okuyarak mı öğrendin, deneyerek mi?"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={BookOpen}
          title="1. Örnek göster"
          desc="Bilgisayara çok sayıda geçmiş örnek verilir: kimler arkadaş olmuş?"
          delay={0.1}
        />
        <FeatureCard
          icon={Search}
          title="2. Örüntüyü bulsun"
          desc="Tekrar eden düzeni fark eder: ortak arkadaşı çok olanlar genelde arkadaş."
          accent="#0d9488"
          delay={0.25}
        />
        <FeatureCard
          icon={Lightbulb}
          title="3. Yenisini tahmin etsin"
          desc="Daha önce görmediği iki kişi için tahmin yürütür."
          accent="#5eead4"
          delay={0.4}
        />
      </div>
    </Icerik>
  ),

  // 4 — Üç soru (tahmin et → tıkla göster)
  () => (
    <Icerik
      ust="Bugünün haritası · üç soru"
      baslik="Ağa bakan bilgisayara üç soru sorarız"
      sor="Bu üçünden hangisiyle bugün telefonunda karşılaştın?"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Reveal
          soru="1. Bu iki kişi tanışıyor olabilir mi?"
          cevap="Örnek: “tanıyor olabileceğin kişiler” listesi. Ağda henüz olmayan bir arkadaşlık tahmin edilir."
          ipucu="Nerede görüyoruz? Tıkla"
        />
        <Reveal
          soru="2. Bu hesap nasıl bir hesap?"
          cevap="Örnek: sahte ya da spam hesapların yakalanması. Hesap bir gruba konur: gerçek ya da şüpheli."
          ipucu="Nerede görüyoruz? Tıkla"
        />
        <Reveal
          soru="3. Bu kişiye ne önerelim?"
          cevap="Örnek: dizi, şarkı, ürün önerileri. Sana benzeyenlerin sevdiği şeyler önüne gelir."
          ipucu="Nerede görüyoruz? Tıkla"
        />
      </div>
    </Icerik>
  ),

  // 5 — Bağlantı tahmini (oyna-gör)
  () => (
    <Icerik
      ust="1. soru · bağlantı tahmini"
      baslik="Ortak arkadaşı çok olanlar büyük ihtimalle tanışır"
      sor="Ali'ye önce kimi önerirdin? Peki Ozan'a?"
    >
      <OrtakArkadasLab />
    </Icerik>
  ),

  // 6 — Mini sınav (ortada)
  () => (
    <Icerik ust="Mini sınav · ortak arkadaş say" baslik="Selin'e önce kimi önerirsin?">
      <Quiz sorular={ARA_SINAV} />
    </Icerik>
  ),

  // 7 — Düğüm sınıflandırma (oyna-gör)
  () => (
    <Icerik
      ust="2. soru · düğüm sınıflandırma (hesabı bir gruba koymak)"
      baslik="Bu hesap sahte mi? Ağdaki davranışına bakarız"
      sor="Yalnızca takipçi sayısına bakıp karar verebilir miyiz?"
    >
      <SahteHesapLab />
    </Icerik>
  ),

  // 8 — Nasıl öğrenir? (adım adım)
  () => (
    <Icerik
      ust="Perde arkası · nasıl öğreniyor?"
      baslik="Bilgisayar bunu etiketli örneklerden öğrenir"
      sor="Sahte hesabı yakalamak için bilgisayara hangi sayıları verirdin?"
    >
      <Stepper
        adimlar={[
          {
            baslik: "Bilinen örnekleri topla",
            metin: "Gerçek ya da sahte olduğu zaten bilinen çok sayıda hesap alınır.",
          },
          {
            baslik: "Her hesabı sayılarla özetle",
            metin: "Bilgisayar her kişiyi birkaç sayıyla özetler: takipçi, takip, ortak arkadaş sayısı gibi.",
          },
          {
            baslik: "Örüntüyü bulsun",
            metin: "Model, sahte hesapların sayılarının nasıl göründüğünü bu örneklerden çıkarır.",
          },
          {
            baslik: "Yeni hesabı tahmin etsin",
            metin: "Yeni bir hesaba “büyük ihtimalle sahte” der. Bu bir tahmindir, yanılabilir.",
          },
        ]}
      />
    </Icerik>
  ),

  // 9 — Öneri sistemi (oyna-gör)
  () => (
    <Icerik
      ust="3. soru · öneri sistemi"
      baslik="Sana benzeyen ne izlediyse sistem onu önerir"
      sor="Sana hep aynı tür şeyler mi öneriliyor? Neden olabilir?"
    >
      <OneriLab />
    </Icerik>
  ),

  // 10 — Sınırlar (tahmin et → tıkla göster)
  () => (
    <Icerik
      ust="Dikkat · sınırlar"
      baslik="Model yanılabilir: tahmin, kesin bilgi değildir"
      sor="Sana yanlış önerilen biri ya da bir şey oldu mu?"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Reveal
          soru="Ortak arkadaşınız çok ama hiç tanışmadınız."
          cevap="Aynı okuldasınız ama farklı sınıftasınız. Ortak arkadaş bir ipucudur, kanıt değil."
          ipucu="Nasıl olur? Tıkla"
        />
        <Reveal
          soru="Yeni açılmış gerçek bir hesap sahte sanıldı."
          cevap="Yeni hesabın takipçisi azdır; sayıları sahte hesaba benzeyebilir. Model yanlış alarm verebilir."
          ipucu="Nasıl olur? Tıkla"
        />
        <Reveal
          soru="Sana hep aynı tür şeyler öneriliyor."
          cevap="Sistem geçmişine bakar ve izlediklerine benzeyeni önerir. Yeni bir şey denemezsen çember daralır."
          ipucu="Nasıl olur? Tıkla"
        />
      </div>
    </Icerik>
  ),

  // 11 — Tek kısa networkx örneği
  () => (
    <Icerik
      ust="Python · tek kısa örnek"
      baslik="Python'da ortak arkadaş saymak birkaç satır sürer"
      sor="Çıktıda Kerem 2, Derya 1 çıkıyor. Ali'ye önce kim önerilir?"
    >
      <KodOrnegi />
    </Icerik>
  ),

  // 12 — Sınıfta deneyelim (adım adım)
  () => (
    <Icerik
      ust="Sınıfta deneyelim · 10 dakika"
      baslik="Kendi öneri listene bakalım"
      sor="Tanımadığın biri çıktıysa uygulama onu neden önermiş olabilir?"
    >
      <Stepper
        adimlar={[
          {
            baslik: "Listeyi aç",
            metin: "Telefonunda bir uygulamanın önerilen kişiler listesini aç. Hesabın yoksa yanındakiyle bak.",
          },
          {
            baslik: "İlk 3 öneriye bak",
            metin: "Her birinin altında kaç ortak arkadaş ya da takipçi yazıyor? Not al.",
          },
          {
            baslik: "Kaçını tanıyorsun?",
            metin: "Üçünden kaçını gerçekten tanıyorsun? El kaldıralım, tahtaya çetele tutalım.",
          },
          {
            baslik: "Yorumlayalım",
            metin: "Ortak arkadaşı çok olanlar mı daha çok tutmuş? İsim söylemek zorunda değilsin, sayı yeter.",
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
    <Icerik ust="Özet · 14. hafta" baslik="Aklında kalsın: 3 şey">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          "Makine öğrenimi kural ezberlemez; örneklerden örüntü çıkarır ve tahmin eder.",
          "Ağda üç soru sorarız: tanışıyorlar mı, bu hesap nasıl bir hesap, bu kişiye ne önerelim?",
          "Ortak arkadaş sayısı gibi basit bir ölçü bile iyi ipucu verir; ama tahmin kesin bilgi değildir.",
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
          Bu tahminler için verimizi kullanmak doğru mu? Ağlarda etik ve
          gizlilik.
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
          BVA 2105 · 14. Hafta · Ağ Temelli Makine Öğrenimi
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
