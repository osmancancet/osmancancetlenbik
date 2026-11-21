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
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  X,
  Zap,
  Brain,
  Cloud,
  MousePointerClick,
  HelpCircle,
  RotateCcw,
  ChefHat,
  Flame,
  Play,
  Table,
  Waves,
  Code2,
  Plus,
  Utensils,
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

type KodSatiri = { kod: string; aciklama: string; tur?: "tarif" | "pisir" };

/* Kod satır satır okunur: satıra ya da "Sonraki satır"a tıklayınca açıklaması görünür */
function KodSatirlari({ satirlar, cikti }: { satirlar: KodSatiri[]; cikti?: string }) {
  const [secili, setSecili] = useState(0);
  const son = satirlar.length - 1;
  return (
    <div>
      <div className="bvbb-window-chrome">
        <div className="py-2" style={{ background: "#0b1020" }}>
          {satirlar.map((satir, i) => (
            <button
              key={satir.kod}
              type="button"
              onClick={() => setSecili(i)}
              className={`w-full flex items-center gap-3 px-4 py-1.5 text-left font-mono text-[15px] transition-colors ${
                i === secili
                  ? "bg-[#2563eb]/25 text-white"
                  : "text-gray-400 hover:bg-white/5"
              }`}
            >
              <span className="w-5 text-right text-gray-600">{i + 1}</span>
              <span className="flex-1 whitespace-pre">{satir.kod}</span>
              {satir.tur && (
                <span
                  className={`text-[11px] uppercase tracking-wider px-2 py-0.5 rounded ${
                    satir.tur === "tarif"
                      ? "bg-sky-500/15 text-sky-300"
                      : "bg-amber-500/15 text-amber-300"
                  }`}
                >
                  {satir.tur === "tarif" ? "tarif" : "pişir"}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-3 bvbb-card rounded-lg px-4 py-3 min-h-[68px] text-base text-gray-200 leading-snug">
        <span className="font-mono text-sm text-[#60a5fa] mr-2">{secili + 1}. satır:</span>
        {satirlar[secili].aciklama}
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          className={DUGME}
          disabled={secili === son}
          onClick={() => setSecili((x) => Math.min(x + 1, son))}
        >
          Sonraki satır <ArrowRight className="w-4 h-4" />
        </button>
        <button type="button" className={DUGME_IKINCIL} onClick={() => setSecili(0)}>
          <RotateCcw className="w-4 h-4" /> Baştan
        </button>
        {cikti && secili === son ? (
          <span className="font-mono text-base text-green-300">Çıktı: {cikti}</span>
        ) : (
          <TikIpucu>Satıra da tıklayabilirsin</TikIpucu>
        )}
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
   11. HAFTA — SPARK'A ÖZEL ETKİLEŞİMLER
   ============================================================ */

/* Slayt 4 — disk ile bellek yarışı (temsilî) */
function Yaris() {
  const [kosu, setKosu] = useState(0);
  const [biten, setBiten] = useState<string[]>([]);
  const pistler = [
    {
      ad: "MapReduce",
      not: "Her adımda diske yaz, diskten geri oku",
      sure: 7,
      renk: "#f59e0b",
    },
    { ad: "Spark", not: "Ara sonuçlar bellekte durur", sure: 1.6, renk: "#22c55e" },
  ];
  return (
    <div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className={DUGME}
          onClick={() => {
            setBiten([]);
            setKosu((k) => k + 1);
          }}
        >
          <Play className="w-4 h-4" /> {kosu === 0 ? "Yarışı başlat" : "Yeniden yarıştır"}
        </button>
        <button
          type="button"
          className={DUGME_IKINCIL}
          onClick={() => {
            setBiten([]);
            setKosu(0);
          }}
        >
          <RotateCcw className="w-4 h-4" /> Sıfırla
        </button>
        <TikIpucu>Önce tahmin, sonra tıkla</TikIpucu>
      </div>

      <div className="mt-4 space-y-3">
        {pistler.map((p) => (
          <div key={p.ad} className="bvbb-card rounded-xl p-4">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-lg font-semibold text-white">{p.ad}</span>
              <span className="text-sm text-gray-400">{p.not}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-5 rounded-full bg-white/5 overflow-hidden">
                {kosu > 0 && (
                  <motion.div
                    key={kosu}
                    className="h-full rounded-full"
                    style={{ background: p.renk }}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: p.sure, ease: "linear" }}
                    onAnimationComplete={() =>
                      setBiten((o) => (o.includes(p.ad) ? o : [...o, p.ad]))
                    }
                  />
                )}
              </div>
              <span
                className="w-20 text-base font-semibold"
                style={{ color: biten.includes(p.ad) ? p.renk : "#6b7280" }}
              >
                {biten.includes(p.ad) ? "Bitti" : kosu > 0 ? "Çalışıyor" : "Bekliyor"}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 text-sm text-gray-500">
        Canlandırma temsilîdir: Spark&apos;ın ne kadar hızlı olacağı işe ve veriye göre değişir.
      </div>
    </div>
  );
}

const KAYITLAR = ["hata: disk doldu", "tamam", "hata: ağ koptu", "tamam", "tamam"];
type TarifAdimi = "sec" | "buyut";
const TARIF_ADI: Record<TarifAdimi, string> = {
  sec: "Yalnız “hata” ile başlayanları seç (filter)",
  buyut: "Hepsini büyük harfe çevir (map)",
};

function tarifiUygula(tarif: TarifAdimi[]): string[] {
  return tarif.reduce(
    (liste, adim) =>
      adim === "sec"
        ? liste.filter((x) => x.startsWith("hata"))
        : liste.map((x) => x.toLocaleUpperCase("tr-TR")),
    KAYITLAR,
  );
}

/* Slayt 8 — tarife adım yaz (dönüşüm), ocağı yak (eylem) */
function TarifOyunu() {
  const [tarif, setTarif] = useState<TarifAdimi[]>([]);
  const [sonuc, setSonuc] = useState<string | null>(null);
  const ekle = (adim: TarifAdimi) => {
    setTarif((o) => (o.length >= 3 ? o : [...o, adim]));
    setSonuc(null);
  };
  return (
    <div>
      <div className="font-mono text-sm text-gray-300 mb-3">
        <span className="text-gray-500">Veri (5 kayıt): </span>
        {KAYITLAR.join("  |  ")}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="w-36 text-sm font-semibold text-sky-300">Tarife yaz (dönüşüm)</span>
        <button type="button" className={DUGME_IKINCIL} onClick={() => ekle("sec")}>
          <Plus className="w-4 h-4" /> Hataları seç
        </button>
        <button type="button" className={DUGME_IKINCIL} onClick={() => ekle("buyut")}>
          <Plus className="w-4 h-4" /> Büyük harfe çevir
        </button>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="w-36 text-sm font-semibold text-amber-300">Pişir (eylem)</span>
        <button
          type="button"
          className={DUGME}
          onClick={() => setSonuc(`${tarifiUygula(tarif).length} kayıt`)}
        >
          <Flame className="w-4 h-4" /> Say (count)
        </button>
        <button
          type="button"
          className={DUGME}
          onClick={() => setSonuc(tarifiUygula(tarif).join("  |  "))}
        >
          <Flame className="w-4 h-4" /> Göster (collect)
        </button>
        <button
          type="button"
          className={DUGME_IKINCIL}
          onClick={() => {
            setTarif([]);
            setSonuc(null);
          }}
        >
          <RotateCcw className="w-4 h-4" /> Temizle
        </button>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="bvbb-card rounded-xl p-4 min-h-[128px]">
          <div className="text-sm font-semibold text-sky-300 mb-2">Tarif defteri</div>
          {tarif.length === 0 ? (
            <div className="text-base text-gray-500">Henüz adım yok. Veri olduğu gibi duruyor.</div>
          ) : (
            <ol className="space-y-1 text-base text-gray-100">
              {tarif.map((a, i) => (
                <li key={`${a}-${i}`}>
                  {i + 1}. {TARIF_ADI[a]}
                </li>
              ))}
            </ol>
          )}
        </div>
        <div
          className={`rounded-xl p-4 min-h-[128px] border ${
            sonuc === null ? "bvbb-card" : "border-amber-500/50 bg-amber-500/10"
          }`}
        >
          <div className="text-sm font-semibold text-amber-300 mb-2">Ocak</div>
          {sonuc === null ? (
            <div className="text-base text-gray-500">
              Ocak kapalı. Tarifte {tarif.length} adım var ama Spark henüz hiçbir şey hesaplamadı.
            </div>
          ) : (
            <motion.div
              key={sonuc}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-base text-amber-100 font-mono leading-snug"
            >
              Pişti: {sonuc === "" ? "(boş liste)" : sonuc}
            </motion.div>
          )}
        </div>
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
      hafta="11. Hafta"
      vurgu="Apache Spark"
      satir="Aynı iş, bellekte ve hızlı"
      alt="MapReduce'un yaptığı sayımı, ara sonuçları diske değil belleğe koyarak çok daha kısa sürede yapan araç."
      cipler={[
        { ad: "Bellekte", etiket: "Ara sonuç diske yazılmaz", icon: Zap, renk: "#f59e0b" },
        { ad: "Kısa kod", etiket: "Python ile birkaç satır", icon: Code2, renk: "#0ea5e9" },
        { ad: "Tarif ve pişirme", etiket: "Önce planla, sonra çalıştır", icon: ChefHat, renk: "#22c55e" },
      ]}
    />
  ),

  /* ─────────────────  2 · SORUN (TAHMİN ET)  ───────────────── */
  () => (
    <Slayt
      etiket="Sorun"
      baslik="MapReduce doğru sayıyor ama neden yavaş?"
      alt="Geçen hafta kelime saydık. Sonuç doğruydu ama küçük bir iş bile uzun sürüyordu."
      soru="Telefonda açık duran uygulamaya dönmek mi hızlı, onu baştan açmak mı?"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TahminKarti
          soru="MapReduce her adımın sonucunu nereye yazıyordu?"
          cevap="Diske. Sonraki adım da o sonucu diskten geri okuyordu."
        />
        <TahminKarti
          soru="Disk mi hızlıdır, bellek (RAM) mi?"
          cevap="Bellek çok daha hızlıdır. Elinin altındaki şeye ulaşmak, dolaptan çıkarmaktan kısa sürer."
        />
        <TahminKarti
          soru="Öyleyse çözüm ne olabilir?"
          cevap="Ara sonuçları diske yazmak yerine bellekte tutmak. Spark tam olarak bunu yapar."
        />
      </div>
    </Slayt>
  ),

  /* ─────────────────  3 · BENZETME  ───────────────── */
  () => (
    <Slayt
      etiket="Benzetme"
      baslik="Malzeme tezgâhtayken iş hızlı yürür"
      alt="Bir mutfak düşün. Yemek yaparken malzemeyi iki yerde tutabilirsin: kilerde ya da tezgâhta."
      soru="Her malzemeyi kullanıp kilere geri koysan yemek ne zaman biter?"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FeatureCard
          icon={Archive}
          title="Kiler: disk"
          desc="Yeri çoktur ama uzaktır. MapReduce her adımda malzemeyi kilere koyar, sonraki adımda geri getirir."
          accent="#f59e0b"
        />
        <FeatureCard
          icon={Utensils}
          title="Tezgâh: bellek (RAM)"
          desc="Yeri azdır ama elinin altındadır. Spark malzemeyi tezgâhta tutar, yemek bitince kaldırır."
          delay={0.1}
          accent="#22c55e"
        />
      </div>
    </Slayt>
  ),

  /* ─────────────────  4 · YARIŞ  ───────────────── */
  () => (
    <Slayt
      etiket="Oyna, gör"
      baslik="Yarışı başlat: disk mi, bellek mi?"
      soru="Tıklamadan önce: kim kazanır, neden?"
    >
      <Yaris />
    </Slayt>
  ),

  /* ─────────────────  5 · SPARK NEDİR  ───────────────── */
  () => (
    <Slayt
      etiket="Kavram"
      baslik="Spark, veriyi kümede ve bellekte işler"
      alt="Spark da birçok bilgisayarı birlikte kullanır. Farkı, ara sonuçları diske değil belleğe koymasıdır."
      soru="Her şeyi bellekte tutmak bu kadar iyiyse neden hâlâ disk kullanıyoruz?"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Zap}
          title="Bellekte çalışır"
          desc="Aynı veriyi tekrar tekrar işleyen işlerde fark en çok burada görülür."
          accent="#f59e0b"
        />
        <FeatureCard
          icon={Cloud}
          title="Veriyi olduğu yerden okur"
          desc="Hadoop'un deposundan (HDFS) ya da bulut depolamadan okuyabilir; kendi deposu yoktur."
          delay={0.1}
          accent="#0ea5e9"
        />
        <FeatureCard
          icon={Code2}
          title="Python ile yazılır"
          desc="Spark'ın Python arayüzüne PySpark denir. Bu derste yalnızca onu kullanacağız."
          delay={0.2}
          accent="#22c55e"
        />
      </div>
    </Slayt>
  ),

  /* ─────────────────  6 · ŞEF VE AŞÇILAR  ───────────────── */
  () => (
    <Slayt
      etiket="Adım adım"
      baslik="Spark'ta bir şef, birçok aşçı çalışır"
      alt="Şef: sürücü program (driver). Aşçılar: yürütücüler (executor), yani kümedeki bilgisayarlar."
      soru="Şef olmasaydı mutfakta ne olurdu?"
    >
      <AdimAdim
        adimlar={[
          { baslik: "Sen kodu yazarsın", metin: "Kod şefe, yani sürücü programa gider." },
          { baslik: "Şef işi böler", metin: "Veriyi ve işi parçalara ayırır, aşçılara dağıtır." },
          {
            baslik: "Aşçılar aynı anda çalışır",
            metin: "Her yürütücü kendi parçasını bellekte işler.",
          },
          {
            baslik: "Sonuç şefe döner",
            metin: "Şef parçaları birleştirir ve sonucu sana gösterir.",
          },
        ]}
      />
    </Slayt>
  ),

  /* ─────────────────  7 · MİNİ SINAV  ───────────────── */
  () => (
    <Slayt
      etiket="Hızlı yoklama"
      baslik="Buraya kadar anlaştık mı?"
      soru="Tıklamadan önce el kaldıralım: kim hangi şıkkı seçiyor?"
    >
      <MiniSinav
        s={{
          soru: "Spark'ı MapReduce'tan hızlı yapan asıl şey nedir?",
          siklar: [
            "Daha pahalı bilgisayarlar kullanması",
            "Ara sonuçları bellekte tutması",
            "Veriyi sıkıştırıp küçültmesi",
            "Tek bilgisayarda çalışması",
          ],
          dogru: 1,
          aciklama: "Diske yazıp geri okumak yerine ara sonuçları bellekte tutar; kazanç buradan gelir.",
        }}
      />
    </Slayt>
  ),

  /* ─────────────────  8 · TARİF / PİŞİRME  ───────────────── */
  () => (
    <Slayt
      etiket="Oyna, gör"
      baslik="Tarif yazmak başka, yemeği pişirmek başka"
      soru="Tarifi deftere yazınca karnın doyar mı? Spark için “pişirmek” ne demek?"
    >
      <TarifOyunu />
    </Slayt>
  ),

  /* ─────────────────  9 · İLK PYSPARK KODU  ───────────────── */
  () => (
    <Slayt
      etiket="Kod"
      baslik="İlk PySpark kodumuz yalnızca 4 satır"
      soru="Son satır olmasaydı Spark ne hesaplardı?"
    >
      <KodSatirlari
        cikti="[16, 24, 40]"
        satirlar={[
          {
            kod: "sayilar = sc.parallelize([3, 8, 12, 5, 20])",
            tur: "tarif",
            aciklama:
              "Python listesini Spark'a verir. sc, Spark'a bağlantımızın adıdır; liste parçalara bölünüp kümeye dağıtılır.",
          },
          {
            kod: "buyukler = sayilar.filter(lambda x: x > 6)",
            tur: "tarif",
            aciklama:
              "Tarife bir adım yazar: 6'dan büyük olanları seç. lambda, tek satırlık küçük bir kural demek. Henüz hesap yok.",
          },
          {
            kod: "ikiKati = buyukler.map(lambda x: x * 2)",
            tur: "tarif",
            aciklama: "Tarife bir adım daha: her sayıyı 2 ile çarp. Spark hâlâ hiçbir şey hesaplamadı.",
          },
          {
            kod: "print(ikiKati.collect())",
            tur: "pisir",
            aciklama:
              "Pişirme anı: collect sonucu ister. Spark tarifin tamamını şimdi çalıştırır: 8, 12, 20 seçilir ve ikiye katlanır.",
          },
        ]}
      />
    </Slayt>
  ),

  /* ─────────────────  10 · ALET ÇANTASI  ───────────────── */
  () => (
    <Slayt
      etiket="Nerede karşıma çıkar?"
      baslik="Spark tek alet değil, bir alet çantasıdır"
      alt="Aynı Spark ile farklı türde işler yapılır. Adlarını bilmen yeter; ayrıntıya bu derste girmiyoruz."
      soru="Bu üç aletten hangisini en çok merak ettin?"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Table}
          title="Tablolar: Spark SQL"
          desc="Veriyi tablo gibi görür, üzerinde SQL sorgusu yazarsın."
        />
        <FeatureCard
          icon={Waves}
          title="Akan veri: Streaming"
          desc="Sürekli gelen veriyi (sensör ölçümü, site tıklaması) geldikçe işler."
          delay={0.1}
          accent="#0ea5e9"
        />
        <FeatureCard
          icon={Brain}
          title="Makine öğrenmesi: MLlib"
          desc="Büyük veriyle model eğitmek için hazır araçlar sunar."
          delay={0.2}
          accent="#a855f7"
        />
      </div>
    </Slayt>
  ),

  /* ─────────────────  11 · SINIFTA DENEYELİM  ───────────────── */
  () => (
    <Slayt
      etiket="Sınıfta deneyelim · 10 dk"
      baslik="Colab'da ilk Spark kodunu çalıştır"
      soru="6 yerine 10 yazarsak çıktı ne olur? Önce tahmin edin."
    >
      <AdimAdim
        adimlar={[
          {
            baslik: "Colab'ı aç",
            metin: "colab.research.google.com adresine gir, Google hesabınla yeni bir not defteri aç.",
          },
          {
            baslik: "Spark'ı kur ve başlat",
            metin:
              "Hücreye yaz, çalıştır:  !pip install pyspark  ·  Sonra:  from pyspark import SparkContext  ve  sc = SparkContext()",
          },
          {
            baslik: "4 satırı yaz",
            metin: "Önceki slayttaki dört satırı yeni hücreye yaz ve çalıştır. Çıktı [16, 24, 40] mı?",
          },
          {
            baslik: "Değiştir, tahmin et",
            metin: "6 yerine 10 yaz. Çalıştırmadan önce çıktıyı tahmin et, sonra dene.",
          },
        ]}
      />
    </Slayt>
  ),

  /* ─────────────────  12 · MAPREDUCE Mİ SPARK MI  ───────────────── */
  () => (
    <Slayt
      etiket="Sınıf oylaması"
      baslik="Bu cümle kimi anlatıyor?"
      soru="Yanlış bildiğin cümleyi nasıl düzeltirdin?"
    >
      <IkiSecenek
        etiketler={["MapReduce", "Spark"]}
        maddeler={[
          {
            metin: "Ara sonuçları her adımda diske yazar.",
            dogru: 0,
            aciklama: "Bu MapReduce'tur; yavaşlığının nedeni de budur.",
          },
          {
            metin: "Ara sonuçları bellekte tutar.",
            dogru: 1,
            aciklama: "Bu Spark'tır; hızını buradan alır.",
          },
          {
            metin: "Sayım kodu Python ile birkaç satırda yazılır.",
            dogru: 1,
            aciklama: "Bu Spark'tır; PySpark ile birkaç satır yeter.",
          },
          {
            metin: "Aynı veriyi tekrar tekrar işleyen işlerde çok zaman kaybeder.",
            dogru: 0,
            aciklama: "Bu MapReduce'tur; her turda diske yazıp geri okur.",
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
            soru: "Hangisi bir eylemdir, yani yemeği pişirir?",
            siklar: ["filter", "map", "collect", "parallelize"],
            dogru: 2,
            aciklama: "collect sonucu ister; Spark tarifi o anda çalıştırır. Diğerleri tarife adım yazar.",
          },
          {
            soru: "sayilar.filter(...) satırı çalışınca Spark ne yapar?",
            siklar: [
              "Bütün veriyi hemen süzer",
              "Sonucu ekrana yazar",
              "Veriyi diske kaydeder",
              "Adımı tarife not eder, hesap yapmaz",
            ],
            dogru: 3,
            aciklama: "filter bir dönüşümdür; Spark bir eylem gelene kadar yalnızca planı tutar.",
          },
          {
            soru: "Spark'ta işi parçalara bölüp bilgisayarlara dağıtan kimdir?",
            siklar: [
              "Sürücü program (şef)",
              "Yürütücüler (aşçılar)",
              "HDFS",
              "Kodu yazan kişinin tarayıcısı",
            ],
            dogru: 0,
            aciklama: "Sürücü program planı yapar ve dağıtır; yürütücüler işi yapar.",
          },
        ]}
      />
    </Slayt>
  ),

  /* ─────────────────  14 · AKLINDA KALSIN  ───────────────── */
  () => (
    <UcSey
      maddeler={[
        "Spark, MapReduce'un yaptığı işi bellekte yapar; bu yüzden daha hızlıdır.",
        "Dönüşüm tarife adım yazar, eylem yemeği pişirir: eylem gelene kadar hesap yapılmaz.",
        "PySpark ile birkaç satır Python yeter; küme kurmadan Colab'da denenebilir.",
      ]}
      kopru="sc.parallelize ile oluşturduğumuz o listenin adı RDD. Nasıl bölünür, bir parçası kaybolursa nasıl geri gelir?"
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
          BVA 2103 · 11. Hafta · Apache Spark
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
