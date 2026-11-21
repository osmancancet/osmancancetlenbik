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
  Server,
  HardDrive,
  Copy,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  X,
  Cloud,
  MousePointerClick,
  HelpCircle,
  RotateCcw,
  Power,
  Scissors,
  Share2,
  Search,
  Calculator,
  FileText,
  Archive,
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

/* ============================================================
   ETKİLEŞİM BİLEŞENLERİ
   ============================================================ */

const DUGME =
  "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-base font-semibold text-white bg-[#2563eb] hover:bg-[#1d4ed8] transition-colors disabled:opacity-30 disabled:cursor-not-allowed";
const DUGME_IKINCIL =
  "inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-base text-gray-300 border border-white/15 hover:border-[#60a5fa] hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed";
const CIP = (secili: boolean) =>
  `px-5 py-2.5 rounded-full text-base font-semibold border transition-colors ${
    secili
      ? "bg-[#2563eb] border-[#60a5fa] text-white"
      : "border-white/15 text-gray-300 hover:border-[#60a5fa]"
  }`;
function TikIpucu({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#60a5fa]/80">
      <MousePointerClick className="w-3.5 h-3.5" />
      {children}
    </span>
  );
}

/* İçerik slaydı kabuğu: etiket + cümle başlık + ortada içerik + "Sınıfa sor" satırı */
function Slayt({
  etiket,
  baslik,
  alt,
  soru,
  children,
}: {
  etiket: string;
  baslik: ReactNode;
  alt?: ReactNode;
  soru?: string;
  children: ReactNode;
}) {
  return (
    <SlideShell>
      <Eyebrow>{etiket}</Eyebrow>
      <H2>{baslik}</H2>
      {alt && <Sub className="mt-3 max-w-4xl">{alt}</Sub>}
      <div className="mt-6 max-w-4xl mx-auto">{children}</div>
      {soru && (
        <div className="mt-5 max-w-4xl mx-auto flex items-center gap-2 text-sm text-gray-500">
          <HelpCircle className="w-4 h-4 flex-shrink-0" />
          <span>
            <span className="font-semibold text-gray-400">Sınıfa sor:</span> {soru}
          </span>
        </div>
      )}
    </SlideShell>
  );
}

function Kapak({
  hafta,
  vurgu,
  satir,
  alt,
  cipler,
}: {
  hafta: string;
  vurgu: string;
  satir: string;
  alt: string;
  cipler: Array<{ ad: string; etiket: string; icon: LucideIcon; renk: string }>;
}) {
  return (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2103 · {hafta} · Güz Dönemi</Eyebrow>
        <H1>
          <span className="bvbb-shimmer">{vurgu}</span>
          <br />
          <span className="text-white">{satir}</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">{alt}</Sub>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {cipler.map((p) => (
            <div
              key={p.ad}
              className="bvbb-card rounded-xl p-4 flex items-center gap-3"
              style={{ borderColor: `${p.renk}55` }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${p.renk}22`, border: `1px solid ${p.renk}66` }}
              >
                <p.icon className="w-5 h-5" style={{ color: p.renk }} />
              </div>
              <div className="text-left">
                <div className="text-base font-bold text-white">{p.ad}</div>
                <div className="text-xs text-gray-400">{p.etiket}</div>
              </div>
            </div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-10 text-[11px] font-mono text-gray-600"
        >
          Öğr. Gör. Osman Can Çetlenbik · MCBÜ Manisa Teknik Bilimler MYO · Büyük Veri Analistliği
        </motion.div>
      </div>
    </SlideShell>
  );
}

/* Tahmin et → tıkla göster */
function TahminKarti({ soru, cevap }: { soru: string; cevap: string }) {
  const [acik, setAcik] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setAcik((a) => !a)}
      aria-expanded={acik}
      className="bvbb-card bvbb-card-hover rounded-xl p-5 text-left w-full min-h-[150px] flex flex-col transition-all cursor-pointer"
    >
      <span className="text-lg font-semibold text-white leading-snug">{soru}</span>
      {acik ? (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 block text-base text-[#93c5fd] leading-snug"
        >
          {cevap}
        </motion.span>
      ) : (
        <span className="mt-3 block">
          <TikIpucu>Tıkla, cevabı gör</TikIpucu>
        </span>
      )}
    </button>
  );
}

type Soru = { soru: string; siklar: string[]; dogru: number; aciklama: string };

/* Mini sınav: doğru şık yeşil, yanlış şık kırmızı olur; doğruyu bulunca açıklama çıkar */
function MiniSinav({ s }: { s: Soru }) {
  const [secilen, setSecilen] = useState<number[]>([]);
  const bildi = secilen.includes(s.dogru);
  return (
    <div>
      <div className="text-xl font-semibold text-white mb-4 leading-snug">{s.soru}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {s.siklar.map((sik, i) => {
          const tiklandi = secilen.includes(i);
          const dogru = i === s.dogru;
          const stil = !tiklandi
            ? "border-white/15 text-gray-200 hover:border-[#60a5fa]"
            : dogru
              ? "border-green-500 bg-green-500/15 text-green-200"
              : "border-red-500 bg-red-500/15 text-red-200";
          return (
            <button
              key={sik}
              type="button"
              disabled={bildi}
              onClick={() => setSecilen((o) => (o.includes(i) ? o : [...o, i]))}
              className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-base transition-colors ${stil}`}
            >
              <span className="font-mono text-sm opacity-70">{"ABCD"[i]}</span>
              <span className="flex-1">{sik}</span>
              {tiklandi &&
                (dogru ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />)}
            </button>
          );
        })}
      </div>
      <div className="mt-4 min-h-[56px] flex items-start justify-between gap-4">
        <div className="text-base leading-snug">
          {bildi ? (
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="block text-green-300"
            >
              Doğru. {s.aciklama}
            </motion.span>
          ) : secilen.length > 0 ? (
            <span className="text-red-300">Olmadı. Bir daha düşün, başka şıkka tıkla.</span>
          ) : (
            <TikIpucu>Bir şıkka tıkla</TikIpucu>
          )}
        </div>
        {secilen.length > 0 && (
          <button
            type="button"
            onClick={() => setSecilen([])}
            className="flex-shrink-0 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Sıfırla
          </button>
        )}
      </div>
    </div>
  );
}

function KendiniDene({ sorular }: { sorular: Soru[] }) {
  const [no, setNo] = useState(0);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-mono text-[#60a5fa]">
          Soru {no + 1} / {sorular.length}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            className={DUGME_IKINCIL}
            disabled={no === 0}
            onClick={() => setNo((n) => n - 1)}
          >
            Önceki soru
          </button>
          <button
            type="button"
            className={DUGME}
            disabled={no === sorular.length - 1}
            onClick={() => setNo((n) => n + 1)}
          >
            Sonraki soru <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <MiniSinav key={no} s={sorular[no]} />
    </div>
  );
}

type IkiliMadde = { metin: string; dogru: 0 | 1; aciklama: string };

/* Her satır için iki düğmeden biri seçilir; doğruysa yeşil, yanlışsa kırmızı */
function IkiSecenek({
  etiketler,
  maddeler,
}: {
  etiketler: [string, string];
  maddeler: IkiliMadde[];
}) {
  const [cevap, setCevap] = useState<Record<number, number>>({});
  return (
    <div>
      <div className="space-y-2.5">
        {maddeler.map((m, i) => {
          const c = cevap[i];
          const verildi = c !== undefined;
          const bildi = c === m.dogru;
          return (
            <div
              key={m.metin}
              className="bvbb-card rounded-lg px-4 py-2.5 flex items-center gap-3"
            >
              <div className="flex-1">
                <div className="text-base text-white leading-snug">{m.metin}</div>
                {verildi && (
                  <div
                    className={`text-sm mt-0.5 leading-snug ${
                      bildi ? "text-green-300" : "text-red-300"
                    }`}
                  >
                    {bildi ? "Doğru. " : "Olmadı. "}
                    {m.aciklama}
                  </div>
                )}
              </div>
              {etiketler.map((e, k) => {
                const stil =
                  c !== k
                    ? "border-white/15 text-gray-300 hover:border-[#60a5fa]"
                    : k === m.dogru
                      ? "border-green-500 bg-green-500/15 text-green-200"
                      : "border-red-500 bg-red-500/15 text-red-200";
                return (
                  <button
                    key={e}
                    type="button"
                    onClick={() => setCevap((o) => ({ ...o, [i]: k }))}
                    className={`w-28 flex-shrink-0 rounded-lg border px-2 py-2 text-sm font-semibold transition-colors ${stil}`}
                  >
                    {e}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <TikIpucu>Her satırda bir düğmeye tıkla</TikIpucu>
        <button
          type="button"
          onClick={() => setCevap({})}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-white transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> Sıfırla
        </button>
      </div>
    </div>
  );
}

type Adim = { baslik: string; metin: string };

/* "İleri" ile adım adım açılan liste */
function AdimAdim({ adimlar }: { adimlar: Adim[] }) {
  const [n, setN] = useState(1);
  return (
    <div>
      <div className="space-y-2.5">
        {adimlar.map((a, i) =>
          i < n ? (
            <motion.div
              key={a.baslik}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              className="bvbb-card rounded-lg px-4 py-2.5 flex items-center gap-4"
            >
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white bg-[#2563eb] flex-shrink-0">
                {i + 1}
              </span>
              <div>
                <div className="text-base font-semibold text-white leading-snug">
                  {a.baslik}
                </div>
                <div className="text-sm text-gray-400 leading-snug">{a.metin}</div>
              </div>
            </motion.div>
          ) : (
            <div
              key={a.baslik}
              className="rounded-lg px-4 py-2.5 border border-dashed border-white/10 flex items-center gap-4 text-sm text-gray-600"
            >
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border border-white/10 flex-shrink-0">
                {i + 1}
              </span>
              Sıradaki adım için &ldquo;İleri&rdquo;ye tıkla
            </div>
          ),
        )}
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          className={DUGME}
          disabled={n >= adimlar.length}
          onClick={() => setN((x) => Math.min(x + 1, adimlar.length))}
        >
          İleri <ArrowRight className="w-4 h-4" />
        </button>
        <button type="button" className={DUGME_IKINCIL} onClick={() => setN(1)}>
          <RotateCcw className="w-4 h-4" /> Baştan
        </button>
        <span className="text-sm text-gray-500">
          Adım {n} / {adimlar.length}
        </span>
      </div>
    </div>
  );
}

/* Kapanış: "Aklında kalsın: 3 şey" + gelecek haftaya köprü */
function UcSey({ maddeler, kopru }: { maddeler: [string, string, string]; kopru: string }) {
  return (
    <SlideShell>
      <Eyebrow>Özet</Eyebrow>
      <H2>Aklında kalsın: 3 şey</H2>
      <div className="mt-8 max-w-4xl mx-auto space-y-3">
        {maddeler.map((m, i) => (
          <motion.div
            key={m}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.15 }}
            className="bvbb-card rounded-xl px-5 py-4 flex items-center gap-4"
          >
            <span className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-white bg-[#2563eb] flex-shrink-0">
              {i + 1}
            </span>
            <span className="text-lg text-gray-100 leading-snug">{m}</span>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bvbb-card-sky rounded-xl px-5 py-4 flex items-center gap-3 text-base text-sky-200"
        >
          <ArrowRight className="w-5 h-5 flex-shrink-0" />
          <span>
            <span className="font-semibold">Gelecek hafta:</span> {kopru}
          </span>
        </motion.div>
      </div>
    </SlideShell>
  );
}

/* ============================================================
   9. HAFTA — HADOOP'A ÖZEL ETKİLEŞİMLER
   ============================================================ */

const PARCA_RENK = ["#2563eb", "#0ea5e9", "#a855f7", "#22c55e"];
const PARCA_AD = ["P1", "P2", "P3", "P4"];
const BILGISAYARLAR = [0, 1, 2, 3];

/* i. parçanın kopyaları, i. bilgisayardan başlayıp sırayla yerleşir */
function bilgisayardakiParcalar(bilgisayar: number, kopya: number): number[] {
  return [0, 1, 2, 3].filter((parca) => (bilgisayar - parca + 4) % 4 < kopya);
}

function ParcaKutusu({ parca }: { parca: number }) {
  return (
    <span
      className="rounded px-2 py-1 text-sm font-mono font-bold"
      style={{
        background: `${PARCA_RENK[parca]}22`,
        color: PARCA_RENK[parca],
        border: `1px solid ${PARCA_RENK[parca]}66`,
      }}
    >
      {PARCA_AD[parca]}
    </span>
  );
}

/* Slayt 5 — dosya adım adım kümeye yerleşir */
function DosyaYerlestir() {
  const [adim, setAdim] = useState(0);
  const aciklama = [
    "Elimizde tek, çok büyük bir dosya var: marketin 10 yıllık kasa fişleri.",
    "Hadoop dosyayı eşit parçalara böler. Bu parçalara blok denir.",
    "Parçalar farklı bilgisayarlara dağıtılır. Artık tek diske sığması gerekmiyor.",
    "Her parçanın 3 kopyası tutulur. Kopyalar hep farklı bilgisayarlara konur.",
  ];
  const kopya = adim === 3 ? 3 : adim === 2 ? 1 : 0;
  return (
    <div>
      <div className="flex items-center gap-3">
        <FileText className="w-6 h-6 text-gray-400 flex-shrink-0" />
        <div className="flex-1 h-11 rounded-lg overflow-hidden flex border border-white/15">
          {adim === 0 ? (
            <div className="flex-1 flex items-center justify-center text-base font-mono text-gray-300 bg-white/5">
              fisler.csv (tek parça)
            </div>
          ) : (
            [0, 1, 2, 3].map((p) => (
              <motion.div
                key={p}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: p * 0.1 }}
                className="flex-1 flex items-center justify-center text-base font-mono font-bold border-r border-black/40 last:border-r-0"
                style={{ background: `${PARCA_RENK[p]}33`, color: PARCA_RENK[p] }}
              >
                {PARCA_AD[p]}
              </motion.div>
            ))
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3">
        {BILGISAYARLAR.map((b) => (
          <div key={b} className="bvbb-card rounded-xl p-3 min-h-[96px]">
            <div className="flex items-center gap-2 text-sm font-semibold text-white mb-2">
              <Server className="w-4 h-4 text-gray-400" /> Bilgisayar {b + 1}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {bilgisayardakiParcalar(b, kopya).map((p) => (
                <ParcaKutusu key={`${adim}-${p}`} parca={p} />
              ))}
              {kopya === 0 && <span className="text-sm text-gray-600">boş</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 min-h-[52px] text-lg text-gray-100 leading-snug">
        <span className="font-mono text-sm text-[#60a5fa] mr-2">{adim + 1} / 4</span>
        {aciklama[adim]}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className={DUGME}
          disabled={adim === 3}
          onClick={() => setAdim((a) => Math.min(a + 1, 3))}
        >
          İleri <ArrowRight className="w-4 h-4" />
        </button>
        <button type="button" className={DUGME_IKINCIL} onClick={() => setAdim(0)}>
          <RotateCcw className="w-4 h-4" /> Baştan
        </button>
      </div>
    </div>
  );
}

/* Slayt 6 — bilgisayarı kapat, dosya hâlâ tamam mı? */
function BozulmaOyunu() {
  const [kopya, setKopya] = useState(3);
  const [kapali, setKapali] = useState<boolean[]>([false, false, false, false]);
  const ayaktaKopya = [0, 1, 2, 3].map(
    (parca) =>
      BILGISAYARLAR.filter(
        (b) => !kapali[b] && bilgisayardakiParcalar(b, kopya).includes(parca),
      ).length,
  );
  const kayip = [0, 1, 2, 3].filter((p) => ayaktaKopya[p] === 0);
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-base text-gray-300">Her parçadan kaç kopya olsun?</span>
        {[1, 2, 3].map((k) => (
          <button key={k} type="button" className={CIP(kopya === k)} onClick={() => setKopya(k)}>
            {k}
          </button>
        ))}
        <button
          type="button"
          className={`${DUGME_IKINCIL} ml-auto`}
          onClick={() => setKapali([false, false, false, false])}
        >
          <RotateCcw className="w-4 h-4" /> Hepsini aç
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {BILGISAYARLAR.map((b) => (
          <button
            key={b}
            type="button"
            aria-pressed={kapali[b]}
            onClick={() => setKapali((o) => o.map((v, i) => (i === b ? !v : v)))}
            className={`rounded-xl p-3 min-h-[104px] text-left border transition-all ${
              kapali[b]
                ? "border-red-500/60 bg-red-500/10"
                : "bvbb-card bvbb-card-hover"
            }`}
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-white mb-2">
              <Power className={`w-4 h-4 ${kapali[b] ? "text-red-400" : "text-green-400"}`} />
              Bilgisayar {b + 1}
            </div>
            {kapali[b] ? (
              <div className="text-sm text-red-300">Bozuldu</div>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {bilgisayardakiParcalar(b, kopya).map((p) => (
                  <ParcaKutusu key={p} parca={p} />
                ))}
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-3">
        <TikIpucu>Bir bilgisayara tıkla: bozulsun ya da geri gelsin</TikIpucu>
      </div>

      <div
        className={`mt-3 rounded-xl px-5 py-3 text-lg font-semibold border ${
          kayip.length === 0
            ? "border-green-500/50 bg-green-500/10 text-green-200"
            : "border-red-500/50 bg-red-500/10 text-red-200"
        }`}
      >
        {kayip.length === 0
          ? "Dosya tamam: her parçanın en az bir kopyası ayakta."
          : `Dosya eksik: ${kayip.map((p) => PARCA_AD[p]).join(", ")} parçasının hiç kopyası kalmadı.`}
      </div>
    </div>
  );
}

/* Slayt 9 — veriyi mi taşıyalım, programı mı gönderelim? */
function TasimaSecimi() {
  const [secim, setSecim] = useState(0);
  const durum = [
    {
      baslik: "Bütün veri tek bilgisayara taşınır",
      metin:
        "Dev dosyanın tamamı ağdan geçer. Yol tıkanır, saatler sürer, tek bilgisayar da yetişemez.",
      hiz: "22%",
      etiket: "Yavaş",
      renk: "#ef4444",
    },
    {
      baslik: "Küçük program verinin yanına gider",
      metin:
        "Her bilgisayar kendi elindeki parçayı işler, yalnızca küçük sonucu geri yollar.",
      hiz: "92%",
      etiket: "Hızlı",
      renk: "#22c55e",
    },
  ][secim];
  return (
    <div>
      <div className="flex items-center gap-3">
        <button type="button" className={CIP(secim === 0)} onClick={() => setSecim(0)}>
          Veriyi programa taşı
        </button>
        <button type="button" className={CIP(secim === 1)} onClick={() => setSecim(1)}>
          Programı veriye gönder
        </button>
        <TikIpucu>İkisini de dene</TikIpucu>
      </div>
      <div className="mt-4 bvbb-card rounded-xl p-5">
        <div className="text-xl font-semibold text-white">{durum.baslik}</div>
        <div className="mt-2 text-base text-gray-300 leading-snug">{durum.metin}</div>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 h-4 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              animate={{ width: durum.hiz, backgroundColor: durum.renk }}
              transition={{ duration: 0.6 }}
            />
          </div>
          <span className="w-16 text-base font-semibold" style={{ color: durum.renk }}>
            {durum.etiket}
          </span>
        </div>
      </div>
      <div className="mt-3 text-base text-gray-400 leading-snug">
        Hadoop ikinci yolu seçer. Hangi işi hangi bilgisayarın yapacağına karar veren görevlinin
        adı <span className="bvbb-token">YARN</span>&apos;dır.
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
    <Kapak
      hafta="9. Hafta"
      vurgu="Hadoop"
      satir="Böl, dağıt, kopyala"
      alt="Tek bilgisayara sığmayan büyük dosyayı parçalara bölen, birçok bilgisayara dağıtan ve her parçanın kopyasını tutan sistem."
      cipler={[
        { ad: "Böl", etiket: "Dosya parçalara ayrılır", icon: Scissors, renk: "#2563eb" },
        { ad: "Dağıt", etiket: "Parçalar bilgisayarlara gider", icon: Share2, renk: "#0ea5e9" },
        { ad: "Kopyala", etiket: "Her parçanın yedeği olur", icon: Copy, renk: "#a855f7" },
      ]}
    />
  ),

  /* ─────────────────  2 · SORUN (TAHMİN ET)  ───────────────── */
  () => (
    <Slayt
      etiket="Sorun"
      baslik="Dosya tek bilgisayara sığmazsa ne yaparız?"
      alt="Bir market zincirinin 10 yıllık kasa fişleri tek bir dosyada. Dosya o kadar büyük ki hiçbir diske sığmıyor."
      soru="Telefonunun hafızası dolunca sen ne yapıyorsun?"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TahminKarti
          soru="Daha büyük bir disk alsak?"
          cevap="Bir yere kadar. Dev diskler çok pahalıdır ve veri büyüdükçe o da dolar."
        />
        <TahminKarti
          soru="O tek disk bozulursa?"
          cevap="Her şey gider. Tek kopya demek, tek arızada bütün veriyi kaybetmek demek."
        />
        <TahminKarti
          soru="Peki daha akıllıca yol ne?"
          cevap="Dosyayı parçalara böl, sıradan bilgisayarlara dağıt, her parçanın kopyasını tut."
        />
      </div>
    </Slayt>
  ),

  /* ─────────────────  3 · BENZETME  ───────────────── */
  () => (
    <Slayt
      etiket="Benzetme"
      baslik="Hadoop, ders notunu paylaştırmak gibidir"
      alt="300 sayfalık notu tek kişi taşımasın: parçalara ayır, arkadaşlara dağıt, her parçanın fotokopisini çektir."
      soru="Notun tek kopyası sende olsaydı ve kaybetseydin ne olurdu?"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Scissors}
          title="Böl"
          desc="Kalın not birkaç parçaya ayrılır. Hiç kimse hepsini tek başına taşımaz."
        />
        <FeatureCard
          icon={Share2}
          title="Dağıt"
          desc="Her parça başka bir arkadaşa verilir. Hadoop'ta arkadaşlar sıradan bilgisayarlardır."
          delay={0.1}
          accent="#0ea5e9"
        />
        <FeatureCard
          icon={Copy}
          title="Kopyala"
          desc="Her parçanın fotokopisi başkasında da durur. Biri gelmese bile not eksik kalmaz."
          delay={0.2}
          accent="#a855f7"
        />
      </div>
    </Slayt>
  ),

  /* ─────────────────  4 · İKİ İŞ  ───────────────── */
  () => (
    <Slayt
      etiket="Kavram"
      baslik="Hadoop'un iki işi var: saklamak ve işlemek"
      alt="Birlikte çalışan bu bilgisayar grubuna küme (cluster) denir. Hadoop, kümeyi tek bir büyük bilgisayar gibi kullanmamızı sağlar."
      soru="Sence önce saklamak mı gelir, işlemek mi? Neden?"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FeatureCard
          icon={HardDrive}
          title="Saklar: HDFS"
          desc="Hadoop'un dosya sistemi. Dosyayı böler, dağıtır, kopyalar. Bugünün konusu bu."
        />
        <FeatureCard
          icon={Calculator}
          title="İşler: MapReduce"
          desc="Dağıtılmış parçalar üzerinde sayma, toplama gibi işleri yapar. Gelecek haftanın konusu."
          delay={0.1}
          accent="#a855f7"
        />
      </div>
    </Slayt>
  ),

  /* ─────────────────  5 · ADIM ADIM YERLEŞTİRME  ───────────────── */
  () => (
    <Slayt
      etiket="Adım adım"
      baslik="Bir dosya kümeye adım adım yerleşir"
      soru="Aynı parçanın iki kopyası neden aynı bilgisayara konmaz?"
    >
      <DosyaYerlestir />
    </Slayt>
  ),

  /* ─────────────────  6 · OYNA-GÖR: BOZULMA  ───────────────── */
  () => (
    <Slayt
      etiket="Oyna, gör"
      baslik="Bir bilgisayar bozulursa veri kaybolur mu?"
      soru="3 kopya varken kaç bilgisayarı kapatırsak dosya eksik kalır? Önce tahmin edin."
    >
      <BozulmaOyunu />
    </Slayt>
  ),

  /* ─────────────────  7 · REHBER VE DEPOLAR  ───────────────── */
  () => (
    <Slayt
      etiket="Kavram"
      baslik="Kümede bir rehber, çok sayıda depo var"
      alt="Kütüphane gibi düşün: katalog kitabın hangi rafta olduğunu söyler, kitabın kendisi rafta durur."
      soru="Kütüphanede aradığın kitabın yerini nereden öğrenirsin?"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Search}
          title="Rehber: NameNode"
          desc="Hangi parça hangi bilgisayarda, listesini tutar. Verinin kendisini tutmaz."
        />
        <FeatureCard
          icon={Archive}
          title="Depo: DataNode"
          desc="Parçaları gerçekten saklayan bilgisayarlar. Kümede bunlardan çok sayıda bulunur."
          delay={0.1}
          accent="#0ea5e9"
        />
        <TahminKarti
          soru="Rehber bozulursa ne olur?"
          cevap="Parçalar yerinde durur ama hiçbirini bulamayız. Bu yüzden rehberin de yedeği tutulur."
        />
      </div>
    </Slayt>
  ),

  /* ─────────────────  8 · MİNİ SINAV  ───────────────── */
  () => (
    <Slayt
      etiket="Hızlı yoklama"
      baslik="Buraya kadar anlaştık mı?"
      soru="Tıklamadan önce el kaldıralım: kim hangi şıkkı seçiyor?"
    >
      <MiniSinav
        s={{
          soru: "Bir dosyanın parçalarının hangi bilgisayarlarda durduğunu kim bilir?",
          siklar: [
            "Rehber (NameNode)",
            "Depolardan herhangi biri (DataNode)",
            "Dosyayı yükleyen kişi",
            "Hiç kimse, her seferinde aranır",
          ],
          dogru: 0,
          aciklama:
            "Rehber, parça–bilgisayar listesini tutar; depolar yalnızca kendi ellerindeki parçaları bilir.",
        }}
      />
    </Slayt>
  ),

  /* ─────────────────  9 · VERİ YERELLİĞİ  ───────────────── */
  () => (
    <Slayt
      etiket="Oyna, gör"
      baslik="Veriyi taşıma, programı gönder"
      soru="40 sınıfın sınav kâğıdını tek odaya taşımak mı kolay, her sınıfta kendi kâğıtlarını saymak mı?"
    >
      <TasimaSecimi />
    </Slayt>
  ),

  /* ─────────────────  10 · BULUTTA HAZIR  ───────────────── */
  () => (
    <Slayt
      etiket="Nerede karşıma çıkar?"
      baslik="Hadoop'u biz kurmayız; bulutta hazır gelir"
      alt="Küme kurmak uzmanlık ister. Bulut sağlayıcılar birkaç tıkla hazır küme verir; iş bitince kapatırsın."
      soru="Kendi kümeni kurmak yerine hazır hizmet almanın bedeli ne olabilir?"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Cloud}
          title="AWS: EMR"
          desc="Amazon'un hazır küme hizmeti. Verisini çoğunlukla S3 depolamasında tutar."
          accent="#ff9900"
        />
        <FeatureCard
          icon={Cloud}
          title="Azure: HDInsight"
          desc="Microsoft'un hazır küme hizmeti. Aynı fikir, farklı sağlayıcı."
          delay={0.1}
          accent="#0078d4"
        />
        <FeatureCard
          icon={Cloud}
          title="Google Cloud: Dataproc"
          desc="Google'ın hazır küme hizmeti. Kümeyi dakikalar içinde açıp kapatabilirsin."
          delay={0.2}
          accent="#4285f4"
        />
      </div>
    </Slayt>
  ),

  /* ─────────────────  11 · DOĞRU / YANLIŞ  ───────────────── */
  () => (
    <Slayt
      etiket="Sınıf oylaması"
      baslik="Doğru mu, yanlış mı? Önce el kaldırın"
      soru="Yanlış dediğin cümleyi doğru hâle nasıl getirirsin?"
    >
      <IkiSecenek
        etiketler={["Doğru", "Yanlış"]}
        maddeler={[
          {
            metin: "Hadoop çalışmak için çok pahalı, özel bilgisayarlar ister.",
            dogru: 1,
            aciklama: "Sıradan bilgisayarlardan oluşan bir kümeyle çalışır.",
          },
          {
            metin: "Kümeye bilgisayar ekledikçe saklama kapasitesi artar.",
            dogru: 0,
            aciklama: "Yer bitince daha büyük disk aranmaz, kümeye yeni bilgisayar eklenir.",
          },
          {
            metin: "Rehber (NameNode) dosyaların kendisini saklar.",
            dogru: 1,
            aciklama: "Rehber yalnızca listeyi tutar; parçalar depolarda (DataNode) durur.",
          },
          {
            metin: "Bir depo bozulsa bile dosya okunabilir.",
            dogru: 0,
            aciklama: "Parçaların kopyaları başka bilgisayarlarda durduğu için dosya tamamdır.",
          },
        ]}
      />
    </Slayt>
  ),

  /* ─────────────────  12 · SINIFTA DENEYELİM  ───────────────── */
  () => (
    <Slayt
      etiket="Sınıfta deneyelim · 8–10 dk"
      baslik="Sınıf bir Hadoop kümesi olsun"
      soru="Rehber olmasaydı parçaları nasıl bulurduk?"
    >
      <AdimAdim
        adimlar={[
          {
            baslik: "Parçaları hazırla",
            metin: "12 küçük kâğıda P1, P2, P3, P4 yaz; her parçadan 3 tane olsun.",
          },
          {
            baslik: "Dağıt ve rehber seç",
            metin: "Kâğıtlar 12 arkadaşa verilir. Bir kişi rehber olur, kimde ne olduğunu tahtaya yazar.",
          },
          {
            baslik: "Bilgisayar boz",
            metin: "Hoca rastgele 2 kişiye “bozuldun” der; onlar kâğıdını ters çevirir.",
          },
          {
            baslik: "Dosyayı topla",
            metin: "Rehber listeye bakar: P1–P4 hâlâ bulunuyor mu? Kaç kişi bozulunca dosya eksilir?",
          },
        ]}
      />
    </Slayt>
  ),

  /* ─────────────────  13 · KENDİNİ DENE  ───────────────── */
  () => (
    <Slayt
      etiket="Kendini dene"
      baslik="Üç soruda bugünün dersi"
      soru="Yanlış şıklar neden yanlış? Birini seçip açıklayın."
    >
      <KendiniDene
        sorular={[
          {
            soru: "Hadoop'u tek cümleyle en iyi hangisi anlatır?",
            siklar: [
              "Büyük dosyayı bölüp dağıtan ve kopyasını tutan sistem",
              "Çok hızlı tek bir süper bilgisayar",
              "Bir bulut sağlayıcının adı",
              "Dosyaları sıkıştırıp küçülten program",
            ],
            dogru: 0,
            aciklama: "Böl, dağıt, kopyala: Hadoop'un özeti bu üç kelime.",
          },
          {
            soru: "Hadoop her parçadan neden birden fazla kopya tutar?",
            siklar: [
              "Diskleri doldurmak için",
              "Bir bilgisayar bozulunca veri kaybolmasın diye",
              "Dosyalar daha küçük görünsün diye",
              "İnternet olmadan çalışabilmek için",
            ],
            dogru: 1,
            aciklama: "Bir bilgisayar bozulsa bile aynı parçanın kopyası başka bilgisayarda durur.",
          },
          {
            soru: "“Programı veriye gönder” fikri neden hızlıdır?",
            siklar: [
              "Program veriden daha önemli olduğu için",
              "Veri hiç okunmadığı için",
              "Küçük programı yollamak, dev veriyi ağda taşımaktan kolay olduğu için",
              "Bilgisayarlar sırayla çalıştığı için",
            ],
            dogru: 2,
            aciklama: "Her bilgisayar kendi parçasını yerinde işler; ağdan yalnızca küçük sonuçlar geçer.",
          },
        ]}
      />
    </Slayt>
  ),

  /* ─────────────────  14 · AKLINDA KALSIN  ───────────────── */
  () => (
    <UcSey
      maddeler={[
        "Hadoop büyük dosyayı parçalara böler, birçok bilgisayara dağıtır ve kopyasını tutar.",
        "Rehber (NameNode) parçaların yerini bilir; depolar (DataNode) parçaları saklar.",
        "Veri taşınmaz, program verinin yanına gider; bulutta hazır küme olarak kullanılır.",
      ]}
      kopru="Dağıttığımız bu parçaların içindekileri nasıl sayarız? MapReduce ile sınıfta seçim sayımı yapacağız."
    />
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
          BVA 2103 · 9. Hafta · Hadoop Mimarisi
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
