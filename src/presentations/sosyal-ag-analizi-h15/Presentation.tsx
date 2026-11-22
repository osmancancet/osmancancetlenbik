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
  Eye,
  Scale,
  Users,
  Link2,
  HelpCircle,
  IdCard,
  ShieldAlert,
  Hand,
  FileText,
  Database,
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
   KONU BİLEŞENLERİ — AĞLARDA ETİK VE GİZLİLİK
   ============================================================ */

const TAKIPLER: Array<{ hesap: string; baslik: string; tahmin: string; hassas?: boolean }> = [
  {
    hesap: "Manisa MYO öğrenci topluluğu",
    baslik: "Okulu",
    tahmin: "Büyük ihtimalle Manisa MYO öğrencisi.",
  },
  {
    hesap: "Akhisar haber sayfası",
    baslik: "Yaşadığı yer",
    tahmin: "Akhisar ya da çevresinde yaşıyor olabilir.",
  },
  {
    hesap: "Bir voleybol kulübü",
    baslik: "İlgi alanı",
    tahmin: "Voleybolla ilgileniyor.",
  },
  {
    hesap: "Diyabet destek grubu",
    baslik: "Sağlık durumu",
    tahmin: "Kendisinde ya da yakınında diyabet olabilir.",
    hassas: true,
  },
  {
    hesap: "Bir partinin gençlik kolu",
    baslik: "Siyasi görüşü",
    tahmin: "O partiye yakın olabilir.",
    hassas: true,
  },
  {
    hesap: "Bebek bakımı sayfası",
    baslik: "Aile durumu",
    tahmin: "Bebek bekliyor ya da küçük çocuğu olabilir.",
  },
];

/** Takip listesinden çıkarım: hesapları aç/kapa, tahminler anında değişsin. */
function TakipLab() {
  const [sec, setSec] = useState<number[]>([]);
  const degistir = (i: number) =>
    setSec(sec.includes(i) ? sec.filter((s) => s !== i) : [...sec, i]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="saa-card rounded-xl p-4">
        <div className="saa-hint mb-3">
          <MousePointerClick className="w-3.5 h-3.5" />
          Bu kişi kimleri takip ediyor? Tıkla
        </div>
        <div className="grid grid-cols-1 gap-2">
          {TAKIPLER.map((t, i) => (
            <button
              key={t.hesap}
              type="button"
              onClick={() => degistir(i)}
              className={`saa-btn-ghost py-1.5! ${sec.includes(i) ? "saa-chip-on" : ""}`}
            >
              {t.hesap}
            </button>
          ))}
        </div>
      </div>
      <div className="saa-card-teal rounded-xl p-4 flex flex-col gap-2 text-sm">
        <div className="text-base text-white font-semibold">
          Yabancı birinin tahminleri ({sec.length})
        </div>
        {sec.length === 0 ? (
          <p className="text-gray-400 leading-relaxed">
            Henüz hiçbir şey bilinmiyor. Soldan takip edilen hesapları ekle.
          </p>
        ) : (
          TAKIPLER.map((t, i) =>
            sec.includes(i) ? (
              <motion.div
                key={t.hesap}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                className={`rounded-lg px-3 py-1.5 ${t.hassas ? "saa-no" : "saa-card"}`}
              >
                <span className="text-white font-semibold">{t.baslik}: </span>
                <span className="text-gray-200">{t.tahmin}</span>
                {t.hassas && (
                  <span className="ml-2 text-[10px] uppercase tracking-wider text-red-300">
                    hassas
                  </span>
                )}
              </motion.div>
            ) : null,
          )
        )}
        <div className="mt-auto pt-2 flex items-center justify-between gap-3">
          <span className="text-xs text-gray-400">
            Bunlar tahmindir; yanlış da olabilir.
          </span>
          <button
            type="button"
            className="saa-btn-ghost py-1.5!"
            onClick={() => setSec([])}
          >
            <RotateCcw className="w-4 h-4" />
            Sıfırla
          </button>
        </div>
      </div>
    </div>
  );
}

/** İsimleri silinmiş 8 kişilik ağ. Kod → konum. */
const DAIRELER: Array<{ kod: string; x: number; y: number }> = [
  { kod: "K4", x: 360, y: 50 },
  { kod: "K7", x: 200, y: 105 },
  { kod: "K2", x: 190, y: 245 },
  { kod: "K5", x: 360, y: 175 },
  { kod: "K1", x: 500, y: 260 },
  { kod: "K8", x: 520, y: 95 },
  { kod: "K3", x: 630, y: 180 },
  { kod: "K6", x: 670, y: 295 },
];

const CIZGILER: Array<[number, number]> = [
  [3, 0], [3, 1], [3, 2], [3, 4], [3, 5], [1, 2], [4, 6], [5, 6], [6, 7],
];

const ELIF = 3;
const ONUR = 0;

function arkadasSayisi(i: number): number {
  return CIZGILER.filter(([a, b]) => a === i || b === i).length;
}

/** Anonim ağdan kimlik bulma: iki ipucu ile doğru daireye tıkla. */
function KimlikLab() {
  const [asama, setAsama] = useState(0);
  const [yanlis, setYanlis] = useState<number | null>(null);
  const tikla = (i: number) => {
    if (asama >= 2) return;
    const hedef = asama === 0 ? ELIF : ONUR;
    if (i === hedef) {
      setAsama(asama + 1);
      setYanlis(null);
    } else {
      setYanlis(i);
    }
  };
  const ad = (i: number) =>
    i === ELIF && asama >= 1 ? "Elif" : i === ONUR && asama >= 2 ? "Onur" : "";
  const ipucu =
    asama === 0
      ? "İpucu 1: Elif sınıfın en çok arkadaşı olan kişisi; 5 arkadaşı var. Hangi daire Elif?"
      : asama === 1
      ? "K5 = Elif. İpucu 2: Onur'un tek arkadaşı var, o da Elif. Onur hangi daire?"
      : "İsim yoktu ama iki küçük bilgi yetti: K5 = Elif, K4 = Onur.";
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-stretch">
      <div className="md:col-span-3 saa-card rounded-xl p-2 flex items-center">
        <svg viewBox="0 0 720 345" className="w-full h-auto">
          {CIZGILER.map(([a, b]) => (
            <line
              key={`${a}-${b}`}
              x1={DAIRELER[a].x}
              y1={DAIRELER[a].y}
              x2={DAIRELER[b].x}
              y2={DAIRELER[b].y}
              stroke="#4b5563"
              strokeWidth={2}
            />
          ))}
          {DAIRELER.map((d, i) => {
            const bulundu = ad(i) !== "";
            const hata = yanlis === i;
            return (
              <g key={d.kod} onClick={() => tikla(i)} className="saa-node-click">
                <circle
                  cx={d.x}
                  cy={d.y}
                  r={22}
                  fill={bulundu ? "#5eead4" : hata ? "#7f1d1d" : "#111827"}
                  stroke={bulundu ? "#ffffff" : hata ? "#f87171" : "#2dd4bf"}
                  strokeWidth={2.5}
                />
                <text
                  x={d.x}
                  y={d.y + 5}
                  textAnchor="middle"
                  fontSize={14}
                  fontWeight={700}
                  fill={bulundu ? "#042f2e" : "#e5e7eb"}
                >
                  {d.kod}
                </text>
                {bulundu && (
                  <text
                    x={d.x}
                    y={d.y + 42}
                    textAnchor="middle"
                    fontSize={15}
                    fontWeight={700}
                    fill="#5eead4"
                    stroke="#050807"
                    strokeWidth={4}
                    paintOrder="stroke"
                  >
                    {ad(i)}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      <div className="md:col-span-2 saa-card-teal rounded-xl p-4 flex flex-col gap-3 text-sm text-gray-300">
        <div className="saa-hint">
          <MousePointerClick className="w-3.5 h-3.5" />
          Tahmin et, daireye tıkla
        </div>
        <p className="text-base text-white leading-relaxed">{ipucu}</p>
        {yanlis !== null && asama < 2 && (
          <p className="text-red-300 leading-relaxed">
            {DAIRELER[yanlis].kod} dairesinin {arkadasSayisi(yanlis)} arkadaşı
            var; ipucuna uymuyor. Çizgileri say, tekrar dene.
          </p>
        )}
        {asama === 2 && (
          <p className="leading-relaxed">
            Ağın şekli parmak izi gibidir. Dışarıdan bilinen küçük bir bilgi,
            isimsiz ağda kişiyi ele verebilir.
          </p>
        )}
        <button
          type="button"
          className="saa-btn-ghost mt-auto"
          onClick={() => {
            setAsama(0);
            setYanlis(null);
          }}
        >
          <RotateCcw className="w-4 h-4" />
          Sıfırla
        </button>
      </div>
    </div>
  );
}

type Hukum = "dogru" | "bagli" | "yanlis";

const HUKUMLER: Array<{ id: Hukum; ad: string }> = [
  { id: "dogru", ad: "Doğru" },
  { id: "bagli", ad: "Duruma bağlı" },
  { id: "yanlis", ad: "Yanlış" },
];

const VAKALAR: Array<{ olay: string; cevap: Hukum; neden: string }> = [
  {
    olay: "Dönem projen için sınıf arkadaşlarının takip listelerini, onlara sormadan tek tek kaydettin.",
    cevap: "yanlis",
    neden: "İzin yok; arkadaşların verilerinin ne için kullanılacağını bilmiyor. Doğrusu: sor, amacını anlat, isim yerine numara kullan.",
  },
  {
    olay: "Sınıfta gönüllü bir anket yaptın: herkes kiminle çalışmak istediğini kendi yazdı. İsim yerine numara kullandın, sonucu yalnızca derste gösterdin.",
    cevap: "dogru",
    neden: "Herkes bilerek katıldı, yalnızca gereken bilgi alındı, isimler gizlendi ve veri söylenen amaç dışında kullanılmadı.",
  },
  {
    olay: "Herkese açık hesaplardan, bir etiket altında kimin kimi etiketlediğini programla topladın.",
    cevap: "bagli",
    neden: "Açık olması serbest demek değildir. Platform kuralları ne diyor? İsimler tutuluyor mu? Resmî bir yol ya da hazır açık veri varsa önce o kullanılır.",
  },
  {
    olay: "İsimleri silinmiş bir ağda, merak edip bir arkadaşının hangi daire olduğunu buldun ve grupta paylaştın.",
    cevap: "yanlis",
    neden: "Kimliği gizlenmiş birini bilerek açığa çıkardın ve yaydın. Yapabiliyor olman, yapmanın doğru olduğunu göstermez.",
  },
];

/** Vaka kartları: vaka seç, sınıf oylasın, gerekçe açılsın. */
function VakaLab() {
  const [no, setNo] = useState(0);
  const [oy, setOy] = useState<Record<number, Hukum>>({});
  const v = VAKALAR[no];
  const secim = oy[no];
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {VAKALAR.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setNo(i)}
            className={`saa-btn-ghost py-1.5! ${i === no ? "saa-chip-on" : ""}`}
          >
            Vaka {i + 1}
            {oy[i] && <Check className="w-4 h-4" />}
          </button>
        ))}
        <button
          type="button"
          className="saa-btn-ghost py-1.5! ml-auto"
          onClick={() => {
            setOy({});
            setNo(0);
          }}
        >
          <RotateCcw className="w-4 h-4" />
          Sıfırla
        </button>
      </div>
      <div className="saa-card-teal rounded-xl px-5 py-4 mt-3 text-lg text-white leading-snug min-h-[92px]">
        {v.olay}
      </div>
      <div className="grid grid-cols-3 gap-3 mt-3">
        {HUKUMLER.map((h) => {
          const durum = !secim
            ? "saa-card saa-card-hover cursor-pointer"
            : h.id === v.cevap
            ? "saa-ok"
            : h.id === secim
            ? "saa-no"
            : "saa-card opacity-50";
          return (
            <button
              key={h.id}
              type="button"
              disabled={Boolean(secim)}
              onClick={() => setOy({ ...oy, [no]: h.id })}
              className={`rounded-xl px-4 py-3 text-base font-semibold text-white transition-all ${durum}`}
            >
              {h.ad}
            </button>
          );
        })}
      </div>
      <div className="mt-3 min-h-[72px] text-sm leading-relaxed">
        {secim ? (
          <motion.div
            key={no}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gray-200"
          >
            <span className="text-[#5eead4] font-semibold">Neden? </span>
            {v.neden}
          </motion.div>
        ) : (
          <span className="saa-hint">
            <MousePointerClick className="w-3.5 h-3.5" />
            Sınıf oylasın: bunu yapmak doğru mu? Sonra tıkla
          </span>
        )}
      </div>
    </div>
  );
}

const ARA_SINAV: Soru[] = [
  {
    soru: "Hesabın gizli ama takip ettiklerin görünüyor: bir MYO topluluğu, bir ilçe haber sayfası, bir voleybol kulübü. Yabancı biri ne tahmin edebilir?",
    siklar: [
      "Okulunu, yaşadığın yeri ve ilgi alanını",
      "Hiçbir şey; hesap gizli",
      "Yalnızca şifreni",
      "Yalnızca doğum gününü",
    ],
    dogru: 0,
    aciklama:
      "Paylaşım görünmese de takip listesi okul, yer ve ilgi alanı hakkında güçlü ipuçları verir.",
  },
];

const HAFTA_SINAV: Soru[] = [
  {
    soru: "Bir arkadaşlık ağından isimleri sildin. Bu neden tek başına yetmez?",
    siklar: [
      "Silinen isimler kendiliğinden geri gelir",
      "Ağın şekli ve dışarıdan bilinen küçük bilgilerle kişiler bulunabilir",
      "İsimsiz ağ bilgisayarda açılmaz",
      "Yeter; isim yoksa kimse bulunamaz",
    ],
    dogru: 1,
    aciklama:
      "“5 arkadaşı olan tek kişi” gibi bir bilgi, isimsiz ağda o kişiyi göstermeye yeter.",
  },
  {
    soru: "Açık rıza nedir?",
    siklar: [
      "Hesabın herkese açık olması",
      "Verinin internette bulunabilmesi",
      "Arkadaşının senin yerine “olur” demesi",
      "Kişinin, verisinin ne için kullanılacağını bilerek kendi isteğiyle verdiği onay",
    ],
    dogru: 3,
    aciklama:
      "Açık rızada kişi neye “evet” dediğini bilir ve bunu kendi isteğiyle söyler.",
  },
  {
    soru: "Herkese açık profillerden programla toplu veri toplamak (veri kazıma) için hangisi doğrudur?",
    siklar: [
      "Açıksa her şey serbesttir",
      "Kimse fark etmezse sorun olmaz",
      "Açık olması serbest demek değildir; platform kuralları ve KVKK geçerlidir",
      "Yalnızca gece yapılırsa serbesttir",
    ],
    dogru: 2,
    aciklama:
      "Açık profildeki bilgi de kişisel veridir; platformun kuralları ve kanun yine geçerlidir.",
  },
];

const DONEM_SINAV: Soru[] = [
  {
    soru: "Bir ağda en çok bağlantısı olan kişiyi bulmak istiyorsun. Hangi ölçüye bakarsın?",
    siklar: [
      "Derece merkeziliği",
      "Ağdaki toplam kişi sayısı",
      "Topluluk sayısı",
      "Düğümlerin rengi",
    ],
    dogru: 0,
    aciklama: "Derece, bir kişinin kaç bağlantısı olduğunu sayar.",
  },
  {
    soru: "Kendi içinde sıkı, dışarıyla az bağlantılı arkadaş gruplarını bulmaya ne denir?",
    siklar: [
      "Örnekleme",
      "Topluluk tespiti",
      "Bağlantı tahmini",
      "Anonimleştirme",
    ],
    dogru: 1,
    aciklama: "Topluluk tespiti, ağdaki sıkı grupları ortaya çıkarır.",
  },
  {
    soru: "Aynı kişilerin WhatsApp, Instagram ve sınıf bağlantılarını ayrı ayrı gösteren ağa ne denir?",
    siklar: [
      "Rastgele ağ",
      "Anonim ağ",
      "Çok katmanlı ağ",
      "Örnek ağ",
    ],
    dogru: 2,
    aciklama: "Her ilişki türü bir katmandır; kişiler aynı, bağlantılar farklıdır.",
  },
  {
    soru: "Bir ağdan en çok bağlantılı birkaç kişi çıkarılırsa ne olur?",
    siklar: [
      "Hiçbir şey değişmez",
      "Ağ büyür",
      "Herkes birbirine bağlanır",
      "Ağ hızla parçalara ayrılabilir",
    ],
    dogru: 3,
    aciklama:
      "Çok bağlantılı kişiler ağı bir arada tutar; onlar gidince ağ dağılabilir.",
  },
  {
    soru: "Kartopu örneklemesi nasıl ilerler?",
    siklar: [
      "Listeden kura çekerek",
      "Bir kişiden başlayıp arkadaştan arkadaşa genişleyerek",
      "Yalnızca en popüler kişileri alarak",
      "Ağın tamamını indirerek",
    ],
    dogru: 1,
    aciklama: "Kartopu bir kişiden başlar ve dalga dalga arkadaşları ekler.",
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
        <Eyebrow>BVA 2105 · 15. Hafta — Sosyal Ağ Analizi</Eyebrow>
        <H1 className="saa-shimmer">
          Ağlarda Etik
          <br />
          ve Gizlilik
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Yapabiliyor olmak, yapmanın doğru olduğu anlamına gelmez.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto text-left">
          <FeatureCard
            icon={Eye}
            title="Listen ne anlatıyor?"
            desc="Takip listesinden çıkan tahminler."
            accent="#14b8a6"
            delay={0.3}
          />
          <FeatureCard
            icon={IdCard}
            title="İsimsiz ağda kimlik"
            desc="İsimleri silmek neden yetmez?"
            accent="#0d9488"
            delay={0.45}
          />
          <FeatureCard
            icon={Scale}
            title="İzin ve KVKK"
            desc="Bunu yapmak doğru mu?"
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
      ust="Sorun · gizli hesap yeter mi?"
      baslik="Hesabın gizli olsa bile arkadaşların seni anlatır"
      alt="Eski söz: &ldquo;Bana arkadaşını söyle, sana kim olduğunu söyleyeyim.&rdquo; Ağlarda bu söz gerçekten işler."
      sor="Takip listeni kimler görebiliyor, biliyor musun?"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Reveal
          soru="Kaçınızın hesabı gizli? Gizli hesap sizi tamamen korur mu?"
          cevap="Paylaşımların gizlenir ama kimlerle bağlı olduğun çoğu zaman görünür kalır. Bağlantılar da bilgi taşır."
          ipucu="El kaldırın, sonra tıkla"
        />
        <Reveal
          soru="Sınıftaki herkes aynı okul sayfasını takip ediyor. Dışarıdan bakan ne anlar?"
          cevap="Hiçbiriniz yazmasanız da hangi okulda okuduğunuzu anlar. Tek tek küçük bilgiler birleşince büyük resim çıkar."
        />
      </div>
    </Icerik>
  ),

  // 3 — Takip listesinden çıkarım (oyna-gör)
  () => (
    <Icerik
      ust="Oyna-gör · takip listesi"
      baslik="Takip listesi, hiç paylaşım yapmadan çok şey söyler"
      sor="Bu tahminlerden hangisinin bilinmesi seni rahatsız ederdi?"
    >
      <TakipLab />
    </Icerik>
  ),

  // 4 — Kavram: ağ neden farklı?
  () => (
    <Icerik
      ust="Kavram · ağ verisi neden özel?"
      baslik="Sen söylemesen de ağın söyler"
      sor="Arkadaşının paylaştığı bir fotoğraf senin hakkında ne söyleyebilir?"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Users}
          title="Arkadaşlar benzer"
          desc="Aynı okul, aynı şehir, benzer zevkler. Çevren bilinirse sen de tahmin edilirsin."
          delay={0.1}
        />
        <FeatureCard
          icon={Link2}
          title="Bağlantı iki kişiliktir"
          desc="Sen arkadaşlığını gizlesen de karşı taraf gösterebilir. Karar yalnız sende değildir."
          accent="#0d9488"
          delay={0.25}
        />
        <FeatureCard
          icon={HelpCircle}
          title="Tahmin de bir bilgidir"
          desc="Doğru çıkarsa gizlin açığa çıkar; yanlış çıkarsa hakkında yanlış bir etiket dolaşır."
          accent="#5eead4"
          delay={0.4}
        />
      </div>
    </Icerik>
  ),

  // 5 — Mini sınav (ortada)
  () => (
    <Icerik ust="Mini sınav · durup düşünelim" baslik="Yabancı biri ne tahmin eder?">
      <Quiz sorular={ARA_SINAV} />
    </Icerik>
  ),

  // 6 — Anonim ağdan kimlik bulma (tahmin et → tıkla)
  () => (
    <Icerik
      ust="Anonimleştirme · isimleri silip kimliği gizlemek"
      baslik="İsimleri silmek yetmez: ağın şekli parmak izi gibidir"
      sor="İsimsiz bir sınıf ağında kendini bulabilir miydin? Hangi bilgiyle?"
    >
      <KimlikLab />
    </Icerik>
  ),

  // 7 — İzin ve açık rıza (tahmin et → tıkla göster)
  () => (
    <Icerik
      ust="İzin · bu izin sayılır mı?"
      baslik="Herkese açık olması, izin verildiği anlamına gelmez"
      alt="Kapısı açık bir ev düşün: açık olması, içeri girip fotoğraf çekebileceğin anlamına gelmez."
      sor="Senden en son ne için izin istendi? Okuyup mu kabul ettin?"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Reveal
          soru="“Hesabı herkese açık, demek ki verisini alabilirim.”"
          cevap="Sayılmaz. Açık olmak, senin çalışmana “evet” demek değildir."
          ipucu="Sayılır mı? Tıkla"
        />
        <Reveal
          soru="“Kırk sayfalık sözleşmenin sonundaki kutuyu işaretlemişti.”"
          cevap="Zayıf bir izin. Kişi neye “evet” dediğini anlamadıysa bilerek verilmiş bir onay olmaz."
          ipucu="Sayılır mı? Tıkla"
        />
        <Reveal
          soru="“Ne için kullanacağımı anlattım, kendi isteğiyle kabul etti.”"
          cevap="Sayılır. Ne için istendiğini biliyor ve kendi isteğiyle onaylıyor. Buna açık rıza denir."
          ipucu="Sayılır mı? Tıkla"
        />
      </div>
    </Icerik>
  ),

  // 8 — KVKK
  () => (
    <Icerik
      ust="Kanun · KVKK (Kişisel Verilerin Korunması Kanunu)"
      baslik="KVKK, seni tanıtan bilgileri koruyan kanundur"
      sor="Arkadaş listen kişisel veri midir? Neden?"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={IdCard}
          title="Kişisel veri"
          desc="Seni tanıtan her bilgi: adın, numaran, fotoğrafın, arkadaş listen."
          delay={0.1}
        />
        <FeatureCard
          icon={ShieldAlert}
          title="Hassas veri"
          desc="Sağlık, din, siyasi görüş gibi bilgiler daha sıkı korunur. Kanundaki adı: özel nitelikli kişisel veri."
          accent="#0d9488"
          delay={0.25}
        />
        <FeatureCard
          icon={Hand}
          title="Senin hakların"
          desc="Hakkında hangi verinin tutulduğunu öğrenebilir, düzeltilmesini ve silinmesini isteyebilirsin."
          accent="#5eead4"
          delay={0.4}
        />
      </div>
    </Icerik>
  ),

  // 9 — Veri kazıma sınırları
  () => (
    <Icerik
      ust="Veri kazıma · sayfalardaki veriyi programla toplamak"
      baslik="Veri kazıma mümkündür ama her zaman serbest değildir"
      sor="Bir proje için ağ verisi gerekirse ilk nereye bakarsın?"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={FileText}
          title="Platformun kuralları"
          desc="Çoğu platform, izinsiz toplu veri toplamayı kullanım şartlarında yasaklar."
          delay={0.1}
        />
        <FeatureCard
          icon={Scale}
          title="Kanun yine geçerli"
          desc="Açık profildeki bilgi de kişisel veridir. Toplayan kişi KVKK'ya uymak zorundadır."
          accent="#0d9488"
          delay={0.25}
        />
        <FeatureCard
          icon={Database}
          title="Güvenli yol"
          desc="Önce hazır açık veri setlerine ve platformun resmî veri yoluna bak. Az veri al, isimleri tutma."
          accent="#5eead4"
          delay={0.4}
        />
      </div>
    </Icerik>
  ),

  // 10 — Vaka kartları
  () => (
    <Icerik
      ust="Vaka kartları · sınıf oylaması"
      baslik="Bunu yapmak doğru mu?"
      sor="Yanlış bulduğumuz vakayı doğru hâle nasıl getirirdin?"
    >
      <VakaLab />
    </Icerik>
  ),

  // 11 — Dört soru (adım adım)
  () => (
    <Icerik
      ust="Karar · kısa kontrol listesi"
      baslik="Veriye dokunmadan önce kendine dört soru sor"
      sor="Bu dört sorudan en çok hangisini atlıyoruz?"
    >
      <Stepper
        adimlar={[
          {
            baslik: "İzin var mı?",
            metin: "Verisi olan kişi, ne için kullanılacağını biliyor ve kabul ediyor mu?",
          },
          {
            baslik: "Gerekli mi?",
            metin: "Aynı işi daha az veriyle ya da isim olmadan yapabilir miyim?",
          },
          {
            baslik: "Kime zarar verebilir?",
            metin: "Sonuç birini zor durumda bırakır mı? Hassas bir şeyi açığa çıkarır mı?",
          },
          {
            baslik: "Nasıl saklayıp paylaşacağım?",
            metin: "Veriyi kimler görecek? Sonucu isimsiz ve toplu hâlde gösterebilir miyim?",
          },
        ]}
      />
    </Icerik>
  ),

  // 12 — Sınıfta deneyelim (adım adım)
  () => (
    <Icerik
      ust="Sınıfta deneyelim · 10 dakika"
      baslik="Takip listen seni ne kadar anlatıyor?"
      sor="Listenden çıkan hangi tahmin seni şaşırttı?"
    >
      <Stepper
        adimlar={[
          {
            baslik: "Listeni aç",
            metin: "Telefonunda takip ettiğin hesaplara bak. İçlerinden 10 tanesini seç.",
          },
          {
            baslik: "Yabancı gözüyle bak",
            metin: "Bir kâğıda yaz: seni tanımayan biri bu listeden hakkında hangi 3 şeyi tahmin eder?",
          },
          {
            baslik: "Sınıfça sayalım",
            metin: "Kaç kişide okul çıktı? Kaç kişide şehir? El kaldıralım. Paylaşmak gönüllüdür.",
          },
          {
            baslik: "Ayarını kontrol et",
            metin: "Gizlilik ayarlarından takip listeni kimlerin görebildiğine bak. İstersen değiştir.",
          },
        ]}
      />
    </Icerik>
  ),

  // 13 — Kendini dene: bu hafta
  () => (
    <Icerik ust="Kendini dene · bu hafta (3 soru)" baslik="Etik ve gizlilikten ne kaldı?">
      <Quiz sorular={HAFTA_SINAV} />
    </Icerik>
  ),

  // 14 — Kendini dene: dönem tekrarı
  () => (
    <Icerik ust="Kendini dene · dönem tekrarı (5 soru)" baslik="Dönemin tamamından beş soru">
      <Quiz sorular={DONEM_SINAV} />
    </Icerik>
  ),

  // 15 — Aklında kalsın + kapanış
  () => (
    <Icerik ust="Özet · 15. hafta" baslik="Aklında kalsın: 3 şey">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          "Bağlantıların da bilgi taşır: takip listesi, paylaşım yapmasan bile seni anlatır.",
          "İsimleri silmek yetmez. Ağın şekli ve küçük bir yan bilgi kişiyi ele verebilir.",
          "Önce sor: izin var mı, gerekli mi, kime zarar verir? Açık olması serbest demek değildir.",
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
          <span className="text-[#5eead4] font-semibold">Sırada final var:</span>{" "}
          dönem tekrarındaki soruları bir kez de kendi başına çöz; takıldığın
          haftanın sunumuna geri dön.
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
          BVA 2105 · 15. Hafta · Ağlarda Etik ve Gizlilik
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
