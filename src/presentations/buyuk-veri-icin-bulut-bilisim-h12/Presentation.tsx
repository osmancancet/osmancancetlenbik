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
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  X,
  MousePointerClick,
  HelpCircle,
  RotateCcw,
  Flame,
  Scissors,
  Share2,
  ClipboardList,
  Repeat,
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
   12. HAFTA — RDD'YE ÖZEL ETKİLEŞİMLER
   ============================================================ */

const ON_IKI = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

/* Slayt 4 — listeyi kaç parçaya bölelim? */
function ParcaBol() {
  const [n, setN] = useState(3);
  const boy = ON_IKI.length / n;
  const parcalar = Array.from({ length: n }, (_, i) => ON_IKI.slice(i * boy, (i + 1) * boy));
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="text-base text-gray-300">Kaç parça olsun?</span>
        {[2, 3, 4].map((k) => (
          <button key={k} type="button" className={CIP(n === k)} onClick={() => setN(k)}>
            {k}
          </button>
        ))}
        <TikIpucu>Sayıyı değiştir</TikIpucu>
      </div>
      <div className="mt-4 bvbb-window-chrome px-4 py-3 font-mono text-[15px] text-gray-200">
        sayilar = sc.parallelize([1, 2, 3, ..., 12], <span className="text-[#fbbf24]">{n}</span>)
      </div>
      <div className="mt-4 grid gap-3" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
        {parcalar.map((p, i) => (
          <motion.div
            key={`${n}-${i}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bvbb-card rounded-xl p-3"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-white mb-2">
              <Server className="w-4 h-4 text-gray-400" /> Parça {i + 1}
            </div>
            <div className="font-mono text-base text-[#93c5fd]">[{p.join(", ")}]</div>
            <div className="mt-1 text-xs text-gray-500">Bilgisayar {i + 1}&apos;de durur</div>
          </motion.div>
        ))}
      </div>
      <div className="mt-3 text-base text-gray-300 leading-snug">
        12 sayı {n} parçaya bölündü. Her parça ayrı bir bilgisayarda, diğerleriyle aynı anda işlenir.
      </div>
    </div>
  );
}

const KAYNAK_PARCALAR = [
  [1, 2],
  [3, 4],
  [5, 6],
];

/* Slayt 6 — bir parçayı kaybet, tarifle yeniden üret */
function YenidenUret() {
  const [kayip, setKayip] = useState<number | null>(null);
  const [onarilan, setOnarilan] = useState<number | null>(null);
  return (
    <div>
      <div className="bvbb-card-sky rounded-lg px-4 py-2.5 text-base text-sky-100">
        <span className="font-semibold">Tarif:</span> kaynak listeyi oku → her sayıyı 10 ile çarp
      </div>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {KAYNAK_PARCALAR.map((p, i) => {
          const yok = kayip === i;
          return (
            <button
              key={i}
              type="button"
              disabled={kayip !== null}
              onClick={() => {
                setKayip(i);
                setOnarilan(null);
              }}
              className={`rounded-xl p-3 min-h-[104px] text-left border transition-all ${
                yok
                  ? "border-red-500/60 bg-red-500/10"
                  : onarilan === i
                    ? "border-green-500/60 bg-green-500/10"
                    : "bvbb-card bvbb-card-hover"
              }`}
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-white mb-2">
                <Server className="w-4 h-4 text-gray-400" /> Parça {i + 1}
              </div>
              {yok ? (
                <div className="text-base text-red-300">Bilgisayar bozuldu, parça kayboldu</div>
              ) : (
                <>
                  <div className="font-mono text-sm text-gray-500">kaynak [{p.join(", ")}]</div>
                  <div className="font-mono text-lg text-[#93c5fd]">
                    [{p.map((x) => x * 10).join(", ")}]
                  </div>
                </>
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          className={DUGME}
          disabled={kayip === null}
          onClick={() => {
            setOnarilan(kayip);
            setKayip(null);
          }}
        >
          <Repeat className="w-4 h-4" /> Tarifi yeniden uygula
        </button>
        <button
          type="button"
          className={DUGME_IKINCIL}
          onClick={() => {
            setKayip(null);
            setOnarilan(null);
          }}
        >
          <RotateCcw className="w-4 h-4" /> Sıfırla
        </button>
        {kayip === null && onarilan === null && (
          <TikIpucu>Bir parçaya tıkla: kaybolsun</TikIpucu>
        )}
      </div>
      <div className="mt-3 min-h-[52px] text-lg leading-snug">
        {kayip !== null ? (
          <span className="text-red-200">
            Parça {kayip + 1} gitti. Yedeği yok ama tarif duruyor. Düğmeye tıkla.
          </span>
        ) : onarilan !== null ? (
          <span className="text-green-200">
            Yalnızca Parça {onarilan + 1} yeniden hesaplandı. Diğer parçalara dokunulmadı.
          </span>
        ) : (
          <span className="text-gray-400">Üç parça da yerinde.</span>
        )}
      </div>
    </div>
  );
}

/* Slayt 12 — cache açık/kapalı: tarif kaç kez baştan çalışıyor? */
function CacheOyunu() {
  const [cache, setCache] = useState(false);
  const [istek, setIstek] = useState(0);
  const [hesap, setHesap] = useState(0);
  const sec = (deger: boolean) => {
    setCache(deger);
    setIstek(0);
    setHesap(0);
  };
  return (
    <div>
      <div className="flex items-center gap-3">
        <button type="button" className={CIP(!cache)} onClick={() => sec(false)}>
          cache kapalı
        </button>
        <button type="button" className={CIP(cache)} onClick={() => sec(true)}>
          cache açık
        </button>
        <button
          type="button"
          className={`${DUGME} ml-auto`}
          onClick={() => {
            setIstek((x) => x + 1);
            if (!cache || hesap === 0) setHesap((x) => x + 1);
          }}
        >
          <Flame className="w-4 h-4" /> Sonuç iste (count)
        </button>
      </div>
      <div className="mt-4 bvbb-window-chrome px-4 py-3 font-mono text-[15px] text-gray-200">
        gecenler = notlar.filter(lambda n: n &gt;= 50)
        {cache && <span className="text-[#fbbf24]">.cache()</span>}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bvbb-card rounded-xl p-4 text-center">
          <div className="text-5xl font-bold text-white">{istek}</div>
          <div className="mt-1 text-base text-gray-400">kez sonuç istendi</div>
        </div>
        <div
          className={`rounded-xl p-4 text-center border ${
            cache ? "border-green-500/50 bg-green-500/10" : "border-amber-500/50 bg-amber-500/10"
          }`}
        >
          <div className="text-5xl font-bold text-white">{hesap}</div>
          <div className="mt-1 text-base text-gray-300">kez tarif baştan çalıştı</div>
        </div>
      </div>
      <div className="mt-3 text-base text-gray-300 leading-snug">
        {cache
          ? "cache açık: ilk istekte hesaplanır ve bellekte saklanır; sonraki istekler hazır sonucu kullanır."
          : "cache kapalı: her istekte tarif en baştan çalışır. Düğmeye birkaç kez tıkla, sonra cache'i aç."}
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
      hafta="12. Hafta"
      vurgu="Spark RDD"
      satir="Bölünmüş, dayanıklı liste"
      alt="Parçalara bölünüp kümeye dağıtılan ve bir parçası kaybolursa yeniden üretilebilen veri listesi."
      cipler={[
        { ad: "Parçalı", etiket: "Liste bölümlere ayrılır", icon: Scissors, renk: "#2563eb" },
        { ad: "Dağıtık", etiket: "Parçalar farklı bilgisayarda", icon: Share2, renk: "#0ea5e9" },
        { ad: "Dayanıklı", etiket: "Kaybolan parça geri gelir", icon: Repeat, renk: "#22c55e" },
      ]}
    />
  ),

  /* ─────────────────  2 · GEÇEN HAFTAYA BAĞ (TAHMİN ET)  ───────────────── */
  () => (
    <Slayt
      etiket="Sorun"
      baslik="Geçen hafta oluşturduğumuz liste neydi?"
      alt="sc.parallelize([3, 8, 12, 5, 20]) yazmıştık. Ortaya çıkan şey sıradan bir Python listesi değildi."
      soru="Bir Python listesi tek bilgisayara sığmayacak kadar büyürse ne olur?"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TahminKarti
          soru="Python listesinden farkı ne?"
          cevap="Python listesi tek bilgisayarda durur. Bu liste parçalara bölünüp kümeye dağıtılır."
        />
        <TahminKarti
          soru="Bir parçası kaybolursa?"
          cevap="Spark o parçanın nasıl elde edildiğini bilir; tarifi yeniden uygulayıp parçayı geri getirir."
        />
        <TahminKarti
          soru="Bu listenin adı ne?"
          cevap="RDD (Resilient Distributed Dataset): dayanıklı, dağıtık veri kümesi."
        />
      </div>
    </Slayt>
  ),

  /* ─────────────────  3 · BENZETME  ───────────────── */
  () => (
    <Slayt
      etiket="Benzetme"
      baslik="RDD, sıralara paylaştırılmış liste gibidir"
      alt="120 kişilik yoklama listesini tek kişi okumasın diye 4 parçaya böldük ve 4 sıraya verdik."
      soru="Listeyi tek kişi okusaydı ne kadar sürerdi? Bir sıra kâğıdını kaybederse ne yaparız?"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Scissors}
          title="Parçalıdır"
          desc="Liste bölümlere ayrılır. Her bölüme parça (partition) denir."
        />
        <FeatureCard
          icon={Share2}
          title="Dağıtıktır"
          desc="Parçalar kümedeki farklı bilgisayarlarda durur ve aynı anda işlenir."
          delay={0.1}
          accent="#0ea5e9"
        />
        <FeatureCard
          icon={Repeat}
          title="Yeniden üretilir"
          desc="Bir parça kaybolursa Spark onu tarife bakarak yeniden hesaplar."
          delay={0.2}
          accent="#22c55e"
        />
      </div>
    </Slayt>
  ),

  /* ─────────────────  4 · PARÇALARA BÖL  ───────────────── */
  () => (
    <Slayt
      etiket="Oyna, gör"
      baslik="Listeyi kaç parçaya bölelim?"
      soru="Parça sayısı artınca ne kazanırız? Bilgisayar sayısından fazla parça işe yarar mı?"
    >
      <ParcaBol />
    </Slayt>
  ),

  /* ─────────────────  5 · DEĞİŞMEZLİK  ───────────────── */
  () => (
    <Slayt
      etiket="Adım adım"
      baslik="RDD değişmez; her işlem yenisini üretir"
      alt="Fotokopi gibi: asıl kâğıda yazmazsın, yeni bir kâğıt çıkarırsın."
      soru="Asıl liste her işlemde değişseydi ne sorun çıkardı?"
    >
      <AdimAdim
        adimlar={[
          {
            baslik: "sayilar → [1, 2, 3, 4, 5, 6]",
            metin: "İlk RDD. Buna bir daha dokunulmayacak.",
          },
          {
            baslik: "ciftler = sayilar.filter(çift olanlar) → [2, 4, 6]",
            metin: "Yeni bir RDD çıktı. sayilar olduğu gibi duruyor.",
          },
          {
            baslik: "onKati = ciftler.map(10 ile çarp) → [20, 40, 60]",
            metin: "Yine yeni bir RDD. Öncekiler silinmedi, değişmedi.",
          },
          {
            baslik: "Neden böyle?",
            metin: "Asıl veri hiç değişmediği için, kaybolan parça aynı adımlarla yeniden üretilebilir.",
          },
        ]}
      />
    </Slayt>
  ),

  /* ─────────────────  6 · YENİDEN ÜRET  ───────────────── */
  () => (
    <Slayt
      etiket="Oyna, gör"
      baslik="Kaybolan parça tariften yeniden üretilir"
      soru="Diğer iki parça neden yeniden hesaplanmadı?"
    >
      <YenidenUret />
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
          soru: "Bir RDD'nin parçası kaybolunca Spark ne yapar?",
          siklar: [
            "Bütün işi en baştan başlatır",
            "O parçayı tariften yeniden hesaplar",
            "Hata verip durur",
            "Parçayı boş bırakıp devam eder",
          ],
          dogru: 1,
          aciklama: "Spark her RDD'nin nasıl elde edildiğini bilir; yalnızca eksik parçayı yeniden üretir.",
        }}
      />
    </Slayt>
  ),

  /* ─────────────────  8 · DÖNÜŞÜM / EYLEM  ───────────────── */
  () => (
    <Slayt
      etiket="Kavram"
      baslik="Dönüşüm tarif yazar, eylem pişirir"
      alt="Spark, sonuç istenene kadar hesap yapmaz. Bu bekleme huyuna tembel çalışma (lazy evaluation) denir."
      soru="Tarif bitmeden ocağı yakar mısın?"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={ClipboardList}
          title="Dönüşüm (transformation)"
          desc="map, filter, flatMap. Yeni bir RDD tarif eder; hesap hemen yapılmaz."
          accent="#0ea5e9"
        />
        <FeatureCard
          icon={Flame}
          title="Eylem (action)"
          desc="count, collect, take. Sonuç ister; Spark tarifin tamamını o anda çalıştırır."
          delay={0.1}
          accent="#f59e0b"
        />
        <TahminKarti
          soru="Spark neden hemen hesaplamıyor?"
          cevap="Tarifin tamamını görünce gereksiz işi atlar. Yalnızca ilk 3 kayıt istenirse hepsini işlemez."
        />
      </div>
    </Slayt>
  ),

  /* ─────────────────  9 · TARİF Mİ PİŞİRME Mİ  ───────────────── */
  () => (
    <Slayt
      etiket="Sınıf oylaması"
      baslik="Bu işlem tarif mi, pişirme mi?"
      soru="Yanlış bildiğin hangisiydi? Neden öyle düşündün?"
    >
      <IkiSecenek
        etiketler={["Tarif", "Pişirme"]}
        maddeler={[
          {
            metin: "map: her elemanı değiştir",
            dogru: 0,
            aciklama: "map bir dönüşümdür; yeni RDD tarif eder, hesap yapmaz.",
          },
          {
            metin: "count: kaç eleman var, söyle",
            dogru: 1,
            aciklama: "count bir eylemdir; sayıyı bulmak için tarif çalışır.",
          },
          {
            metin: "filter: koşula uyanları seç",
            dogru: 0,
            aciklama: "filter bir dönüşümdür; yalnızca tarife bir adım ekler.",
          },
          {
            metin: "collect: sonucu bana getir",
            dogru: 1,
            aciklama: "collect bir eylemdir; sonucu getirmek için her şey çalışır.",
          },
        ]}
      />
    </Slayt>
  ),

  /* ─────────────────  10 · NOTLAR ÖRNEĞİ  ───────────────── */
  () => (
    <Slayt
      etiket="Kod"
      baslik="Notlar örneği: 4 satırda tarif ve pişirme"
      soru="3. ve 4. satırda tarif toplam kaç kez çalıştı?"
    >
      <KodSatirlari
        cikti="4 ve [80, 62, 95, 71]"
        satirlar={[
          {
            kod: "notlar = sc.parallelize([45, 80, 62, 30, 95, 71])",
            tur: "tarif",
            aciklama: "Altı sınav notundan bir RDD oluşturur. Liste parçalara bölünür.",
          },
          {
            kod: "gecenler = notlar.filter(lambda n: n >= 50)",
            tur: "tarif",
            aciklama:
              "Tarife yazar: 50 ve üstünü seç. Hesap yok; notlar RDD'si de olduğu gibi duruyor.",
          },
          {
            kod: "print(gecenler.count())",
            tur: "pisir",
            aciklama: "İlk eylem: tarif çalışır, geçenler sayılır. Ekrana 4 yazar.",
          },
          {
            kod: "print(gecenler.collect())",
            tur: "pisir",
            aciklama: "İkinci eylem: tarif bir kez daha baştan çalışır ve geçen notların listesini getirir.",
          },
        ]}
      />
    </Slayt>
  ),

  /* ─────────────────  11 · KELİME SAYMA  ───────────────── */
  () => (
    <Slayt
      etiket="Kod"
      baslik="Kelime sayma, RDD ile 5 satır"
      soru="10. haftadaki map, shuffle ve reduce adımları hangi satırlarda?"
    >
      <KodSatirlari
        cikti="[('bulut', 3), ('veri', 4), ('büyük', 2)]"
        satirlar={[
          {
            kod: 'satirlar = sc.textFile("metin.txt")',
            tur: "tarif",
            aciklama: "Dosyadan bir RDD tarif eder; her satır bir eleman olur.",
          },
          {
            kod: "kelimeler = satirlar.flatMap(lambda satir: satir.split())",
            tur: "tarif",
            aciklama: "Her satırı kelimelere böler. Yeni RDD: kelimelerin listesi.",
          },
          {
            kod: "ciftler = kelimeler.map(lambda kelime: (kelime, 1))",
            tur: "tarif",
            aciklama: "Her kelimenin yanına 1 yazar. MapReduce'taki map adımı.",
          },
          {
            kod: "sayim = ciftler.reduceByKey(lambda a, b: a + b)",
            tur: "tarif",
            aciklama:
              "Aynı kelimenin 1'lerini toplar. Adında reduce geçse de bu da bir dönüşümdür; hâlâ hesap yok.",
          },
          {
            kod: "print(sayim.collect())",
            tur: "pisir",
            aciklama: "Tek eylem bu satır. Dört adımlık tarifin tamamı şimdi çalışır. Kelime sırası değişebilir.",
          },
        ]}
      />
    </Slayt>
  ),

  /* ─────────────────  12 · CACHE  ───────────────── */
  () => (
    <Slayt
      etiket="Oyna, gör"
      baslik="Çok kullanacaksan bellekte tut"
      soru="Her bardak için çayı yeniden demler misin, yoksa demlikte hazır mı tutarsın?"
    >
      <CacheOyunu />
    </Slayt>
  ),

  /* ─────────────────  13 · SINIFTA DENEYELİM  ───────────────── */
  () => (
    <Slayt
      etiket="Sınıfta deneyelim · 10 dk"
      baslik="Kendi notlarınla bir RDD kur"
      soru="Yazdığın satırlardan hangisi tarif, hangisi pişirme?"
    >
      <AdimAdim
        adimlar={[
          {
            baslik: "Colab'ı aç, Spark'ı başlat",
            metin: "Geçen haftaki gibi: !pip install pyspark, sonra SparkContext ile sc oluştur.",
          },
          {
            baslik: "Kendi notlarını yaz",
            metin: "Sınıftan 8 not topla, listeye yaz ve sc.parallelize ile RDD yap.",
          },
          {
            baslik: "Geçenleri say",
            metin: "filter ile 50 ve üstünü seç, count ile say. Elle saydığınla aynı mı?",
          },
          {
            baslik: "Bir adım ekle",
            metin: "Geçen notlara map ile 5 puan ekle, collect ile göster. Asıl liste değişti mi?",
          },
        ]}
      />
    </Slayt>
  ),

  /* ─────────────────  14 · KENDİNİ DENE  ───────────────── */
  () => (
    <Slayt
      etiket="Kendini dene"
      baslik="Üç soruda bugünün dersi"
      soru="Yanlış şıklar neden yanlış? Birini seçip açıklayın."
    >
      <KendiniDene
        sorular={[
          {
            soru: "RDD'yi en iyi hangisi anlatır?",
            siklar: [
              "Parçalara bölünmüş, kaybolursa yeniden üretilebilen veri listesi",
              "Tek bilgisayarda duran sıradan bir Python listesi",
              "Bir bulut depolama hizmeti",
              "Spark'ın kurulum dosyası",
            ],
            dogru: 0,
            aciklama: "Parçalı, dağıtık ve dayanıklı: RDD'nin üç özelliği.",
          },
          {
            soru: "gecenler = notlar.filter(...) çalışınca notlar RDD'sine ne olur?",
            siklar: [
              "Kalan notlar silinir",
              "notlar ile gecenler birleşir",
              "Hiçbir şey; RDD değişmez, yeni bir RDD tarif edilir",
              "notlar diske yazılır",
            ],
            dogru: 2,
            aciklama: "RDD değişmez. Her dönüşüm eskisine dokunmadan yeni bir RDD tarif eder.",
          },
          {
            soru: "Aynı RDD'den art arda üç sonuç isteyeceksen ne yaparsın?",
            siklar: [
              "Üç kez parallelize yazarım",
              "cache ile bellekte tutarım",
              "Kümeyi kapatıp açarım",
              "collect yerine filter kullanırım",
            ],
            dogru: 1,
            aciklama: "cache ilk hesaplanan sonucu bellekte tutar; sonraki eylemler tarifi baştan çalıştırmaz.",
          },
        ]}
      />
    </Slayt>
  ),

  /* ─────────────────  15 · AKLINDA KALSIN  ───────────────── */
  () => (
    <UcSey
      maddeler={[
        "RDD, parçalara bölünüp kümeye dağıtılmış bir veri listesidir.",
        "RDD değişmez; bir parçası kaybolursa Spark onu tariften yeniden üretir.",
        "Dönüşümler (map, filter) tarif yazar, eylemler (count, collect) pişirir; sık kullanılan RDD cache ile bellekte tutulur.",
      ]}
      kopru="Öğrendiğimiz araçları bir araya getiriyoruz: bulutta veri analitiği."
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
          BVA 2103 · 12. Hafta · Spark RDD&apos;leri
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
