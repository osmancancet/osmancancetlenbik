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
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  X,
  Target,
  MousePointerClick,
  HelpCircle,
  RotateCcw,
  Users,
  Timer,
  Calculator,
  Shuffle,
  FileText,
  Plus,
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
   10. HAFTA — MAPREDUCE'A ÖZEL ETKİLEŞİMLER
   ============================================================ */

const KELIME_RENK: Record<string, string> = {
  bulut: "#0ea5e9",
  veri: "#22c55e",
  büyük: "#a855f7",
  elma: "#ef4444",
  armut: "#22c55e",
  muz: "#f59e0b",
};

function Cift({ kelime, deger = "1" }: { kelime: string; deger?: string }) {
  const renk = KELIME_RENK[kelime] ?? "#60a5fa";
  return (
    <span
      className="rounded px-2 py-1 text-sm font-mono font-semibold whitespace-nowrap"
      style={{ background: `${renk}22`, color: renk, border: `1px solid ${renk}66` }}
    >
      ({kelime}, {deger})
    </span>
  );
}

const SATIRLAR = ["bulut veri bulut", "veri büyük veri", "bulut büyük veri"];
const SAYILACAK = ["bulut", "veri", "büyük"];
const TUM_KELIMELER = SATIRLAR.flatMap((s) => s.split(" "));

/* Slayt 5 — kelime sayma canlandırması: Girdi → Böl → Map → Shuffle → Reduce */
function KelimeSayma() {
  const [adim, setAdim] = useState(0);
  const adimlar = [
    { ad: "Girdi", metin: "Elimizde üç satırlık bir metin var. Hangi kelime kaç kez geçiyor?" },
    { ad: "Böl", metin: "Her satır ayrı bir bilgisayara verilir. Herkes yalnızca kendi satırına bakar." },
    { ad: "Map", metin: "Her bilgisayar gördüğü her kelime için (kelime, 1) yazar. Henüz toplama yok." },
    { ad: "Shuffle", metin: "Aynı kelimenin çiftleri aynı kutuda buluşur. Seçimdeki “aynı aday aynı masaya”." },
    { ad: "Reduce", metin: "Her kutudaki 1'ler toplanır. Sonuç: her kelime ve kaç kez geçtiği." },
  ];
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        {adimlar.map((a, i) => (
          <button key={a.ad} type="button" className={CIP(i === adim)} onClick={() => setAdim(i)}>
            {i + 1}. {a.ad}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 min-h-[132px]">
        {adim === 0 && (
          <div className="col-span-3 bvbb-card rounded-xl p-4 font-mono text-lg text-gray-200 leading-relaxed">
            {SATIRLAR.map((s) => (
              <div key={s}>{s}</div>
            ))}
          </div>
        )}
        {(adim === 1 || adim === 2) &&
          SATIRLAR.map((s, i) => (
            <motion.div
              key={`${adim}-${s}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              className="bvbb-card rounded-xl p-3"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-white mb-2">
                <Server className="w-4 h-4 text-gray-400" /> Bilgisayar {i + 1}
              </div>
              {adim === 1 ? (
                <div className="font-mono text-base text-gray-200">{s}</div>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {s.split(" ").map((k, j) => (
                    <Cift key={`${k}-${j}`} kelime={k} />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        {(adim === 3 || adim === 4) &&
          SAYILACAK.map((k, i) => {
            const adet = TUM_KELIMELER.filter((x) => x === k).length;
            return (
              <motion.div
                key={`${adim}-${k}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                className="bvbb-card rounded-xl p-3"
              >
                <div className="text-sm font-semibold text-white mb-2">
                  &ldquo;{k}&rdquo; kutusu
                </div>
                {adim === 3 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {Array.from({ length: adet }).map((_, j) => (
                      <Cift key={j} kelime={k} />
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Cift kelime={k} deger={String(adet)} />
                    <span className="text-sm text-gray-400">
                      {Array.from({ length: adet }).fill("1").join(" + ")} = {adet}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
      </div>

      <div className="mt-3 min-h-[52px] text-lg text-gray-100 leading-snug">{adimlar[adim].metin}</div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className={DUGME_IKINCIL}
          disabled={adim === 0}
          onClick={() => setAdim((a) => Math.max(a - 1, 0))}
        >
          Geri
        </button>
        <button
          type="button"
          className={DUGME}
          disabled={adim === adimlar.length - 1}
          onClick={() => setAdim((a) => Math.min(a + 1, adimlar.length - 1))}
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

/* Slayt 6 — kelime ekle, map ve reduce çıktısını anında gör */
function KelimeEkle() {
  const meyveler = ["elma", "armut", "muz"];
  const [liste, setListe] = useState<string[]>(["elma", "muz", "elma"]);
  const dolu = liste.length >= 10;
  return (
    <div>
      <div className="flex items-center gap-3">
        {meyveler.map((m) => (
          <button
            key={m}
            type="button"
            className={DUGME}
            disabled={dolu}
            onClick={() => setListe((o) => (o.length >= 10 ? o : [...o, m]))}
          >
            <Plus className="w-4 h-4" /> {m}
          </button>
        ))}
        <button type="button" className={DUGME_IKINCIL} onClick={() => setListe([])}>
          <RotateCcw className="w-4 h-4" /> Temizle
        </button>
        <TikIpucu>{dolu ? "Liste doldu, temizle" : "Kelime ekle"}</TikIpucu>
      </div>

      <div className="mt-4 bvbb-card rounded-xl p-4 space-y-3">
        <div className="flex items-start gap-3">
          <span className="w-20 flex-shrink-0 text-sm font-semibold text-gray-400 pt-1">Girdi</span>
          <span className="font-mono text-lg text-gray-100 min-h-[28px]">
            {liste.length > 0 ? liste.join(" ") : "(boş)"}
          </span>
        </div>
        <div className="flex items-start gap-3">
          <span className="w-20 flex-shrink-0 text-sm font-semibold text-gray-400 pt-1">Map</span>
          <span className="flex flex-wrap gap-1.5 min-h-[66px] content-start">
            {liste.map((k, i) => (
              <Cift key={`${k}-${i}`} kelime={k} />
            ))}
          </span>
        </div>
        <div className="flex items-start gap-3">
          <span className="w-20 flex-shrink-0 text-sm font-semibold text-gray-400 pt-1">Reduce</span>
          <span className="flex flex-wrap gap-1.5 min-h-[30px]">
            {meyveler
              .filter((m) => liste.includes(m))
              .map((m) => (
                <Cift key={m} kelime={m} deger={String(liste.filter((x) => x === m).length)} />
              ))}
          </span>
        </div>
      </div>
    </div>
  );
}

/* Slayt 8 — bilgisayar sayısı arttıkça sayım kısalır (temsilî) */
function ParalelOyun() {
  const secenekler = [
    { n: 1, sure: "100%", metin: "Tek bilgisayar bütün sayfaları sırayla sayar. En uzun süre bu." },
    { n: 2, sure: "56%", metin: "İş ikiye bölünür, iki bilgisayar aynı anda sayar. Süre yarıya yaklaşır." },
    { n: 4, sure: "33%", metin: "Dört bilgisayar aynı anda sayar. Süre iyice kısalır." },
    {
      n: 8,
      sure: "21%",
      metin: "Sekiz bilgisayar: daha da kısa. Ama işi dağıtmak ve sonuçları toplamak da zaman alır.",
    },
  ];
  const [secim, setSecim] = useState(0);
  const s = secenekler[secim];
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="text-base text-gray-300">Kaç bilgisayar saysın?</span>
        {secenekler.map((o, i) => (
          <button key={o.n} type="button" className={CIP(i === secim)} onClick={() => setSecim(i)}>
            {o.n}
          </button>
        ))}
        <TikIpucu>Sayıyı değiştir</TikIpucu>
      </div>
      <div className="mt-4 bvbb-card rounded-xl p-5">
        <div className="flex flex-wrap gap-2 min-h-[36px]">
          {Array.from({ length: s.n }).map((_, i) => (
            <motion.span
              key={`${s.n}-${i}`}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#2563eb]/20 border border-[#2563eb]/50"
            >
              <Server className="w-4 h-4 text-[#60a5fa]" />
            </motion.span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3">
          <span className="w-28 text-sm font-semibold text-gray-400">Sayım süresi</span>
          <div className="flex-1 h-4 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-[#60a5fa]"
              animate={{ width: s.sure }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </div>
        <div className="mt-4 text-lg text-gray-100 leading-snug min-h-[52px]">{s.metin}</div>
      </div>
      <div className="mt-2 text-sm text-gray-500">Çubuk temsilîdir; gerçek süre işe ve kümeye göre değişir.</div>
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
      hafta="10. Hafta"
      vurgu="MapReduce"
      satir="Böl, say, topla"
      alt="Büyük bir sayım işini birçok bilgisayara paylaştırmanın yolu. Sınıfta seçim sayar gibi: herkes kendi destesini sayar, sonra toplanır."
      cipler={[
        { ad: "Map", etiket: "Herkes kendi parçasını işler", icon: Users, renk: "#0ea5e9" },
        { ad: "Shuffle", etiket: "Aynılar bir araya gelir", icon: Shuffle, renk: "#a855f7" },
        { ad: "Reduce", etiket: "Her grup toplanır", icon: Calculator, renk: "#22c55e" },
      ]}
    />
  ),

  /* ─────────────────  2 · SORUN (TAHMİN ET)  ───────────────── */
  () => (
    <Slayt
      etiket="Sorun"
      baslik="Kalın bir kitapta kelimeyi tek başına sayar mısın?"
      alt="Geçen hafta dosyayı parçalara bölüp kümeye dağıttık. Şimdi o parçaların içinde bir şey saymak istiyoruz."
      soru="Bu işi sınıfça yapsak aramızda nasıl paylaşırdık?"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TahminKarti
          soru="1000 sayfalık kitapta “veri” kelimesini tek kişi sayarsa?"
          cevap="Saatler sürer; yorulunca hata da yapar. Tek bilgisayar için de durum aynıdır."
        />
        <TahminKarti
          soru="Kitabı 40 kişiye paylaştırırsak?"
          cevap="Herkese az sayfa düşer ve herkes aynı anda sayar. İş dakikalara iner."
        />
        <TahminKarti
          soru="Geriye hangi iş kalır?"
          cevap="40 ayrı sonucu birleştirmek. MapReduce, bu paylaş–say–birleştir düzeninin adıdır."
        />
      </div>
    </Slayt>
  ),

  /* ─────────────────  3 · BENZETME  ───────────────── */
  () => (
    <Slayt
      etiket="Benzetme"
      baslik="MapReduce, sınıfta seçim sayımı gibidir"
      alt="Sınıf başkanlığı seçimi yaptık. Sandıktan çıkan pusulalar sıralara deste deste dağıtıldı."
      soru="Bütün pusulaları tek kişi sayarsa ne ters gidebilir?"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Users}
          title="1. Herkes kendi destesini sayar"
          desc="Kimse başkasının destesine bakmaz. Bu adımın adı map (eşle)."
          accent="#0ea5e9"
        />
        <FeatureCard
          icon={Shuffle}
          title="2. Aynı aday aynı masaya"
          desc="Aynı adaya ait pusulalar bir araya getirilir. Bu adımın adı shuffle (grupla)."
          delay={0.1}
          accent="#a855f7"
        />
        <FeatureCard
          icon={Calculator}
          title="3. Her masa toplamını söyler"
          desc="Masadaki pusulalar toplanır, sonuç tahtaya yazılır. Bu adımın adı reduce (topla)."
          delay={0.2}
          accent="#22c55e"
        />
      </div>
    </Slayt>
  ),

  /* ─────────────────  4 · ANAHTAR–DEĞER  ───────────────── */
  () => (
    <Slayt
      etiket="Kavram"
      baslik="Her şey bir etiket ve bir sayıdır"
      alt="MapReduce'ta bilgi hep ikili hâlde dolaşır: (etiket, sayı). Bilgisayarcılar buna (anahtar, değer) çifti der."
      soru="Markette en çok satılan ürünü sayıyor olsaydık etiket ne olurdu?"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Target}
          title="Etiket: anahtar (key)"
          desc="Neyi saydığımızı söyler: bir kelime, bir adayın adı, bir ürün."
        />
        <FeatureCard
          icon={Plus}
          title="Sayı: değer (value)"
          desc="O an gördüğümüz adet. Kelime sayarken hep 1 yazarız: (veri, 1)."
          delay={0.1}
          accent="#22c55e"
        />
        <TahminKarti
          soru="Üzerinde “Ayşe” yazan pusula için çift ne olur?"
          cevap="(Ayşe, 1). Üç pusula görürsek üç ayrı (Ayşe, 1) yazarız; toplamak sonraki adımın işi."
        />
      </div>
    </Slayt>
  ),

  /* ─────────────────  5 · KELİME SAYMA CANLANDIRMASI  ───────────────── */
  () => (
    <Slayt
      etiket="Adım adım"
      baslik="Kelime sayma adım adım ilerler"
      soru="İleri'ye basmadan önce: bir sonraki adımda ekranda ne göreceğiz?"
    >
      <KelimeSayma />
    </Slayt>
  ),

  /* ─────────────────  6 · OYNA-GÖR: KELİME EKLE  ───────────────── */
  () => (
    <Slayt
      etiket="Oyna, gör"
      baslik="Kelime ekle, sayımı izle"
      soru="Üç kez “elma” eklersem map kaç çift üretir, reduce ne yazar?"
    >
      <KelimeEkle />
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
          soru: "Aynı kelimeye ait çiftleri bir araya getiren adım hangisidir?",
          siklar: ["Map", "Shuffle", "Reduce", "Böl"],
          dogru: 1,
          aciklama:
            "Shuffle, aynı etiketli çiftleri aynı kutuda toplar; seçimdeki “aynı aday aynı masaya” adımıdır.",
        }}
      />
    </Slayt>
  ),

  /* ─────────────────  8 · PARALEL ÇALIŞMA  ───────────────── */
  () => (
    <Slayt
      etiket="Oyna, gör"
      baslik="Bilgisayar çoğaldıkça sayım kısalır"
      soru="Bilgisayar sayısını iki katına çıkarınca süre neden tam yarıya inmez?"
    >
      <ParalelOyun />
    </Slayt>
  ),

  /* ─────────────────  9 · HATA OLURSA  ───────────────── */
  () => (
    <Slayt
      etiket="Kavram"
      baslik="Biri yarıda kalırsa sayım bozulmaz"
      alt="Sayım görevlilerinden biri hastalanıp çıkarsa seçim iptal olmaz; yalnızca onun destesi yeniden sayılır."
      soru="Hastalanan görevlinin destesine ne olur?"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Repeat}
          title="Görev yeniden verilir"
          desc="Bir bilgisayar yarıda kalırsa onun parçası başka bir bilgisayara verilir."
        />
        <FeatureCard
          icon={Check}
          title="Baştan başlanmaz"
          desc="Diğer bilgisayarların saydıkları geçerli kalır. Yalnızca eksik parça yeniden sayılır."
          delay={0.1}
          accent="#22c55e"
        />
        <TahminKarti
          soru="Bunu mümkün kılan ne?"
          cevap="Geçen haftaki kopyalar. Parçanın kopyası başka bilgisayarda durduğu için orada yeniden sayılır."
        />
      </div>
    </Slayt>
  ),

  /* ─────────────────  10 · ZAYIF YAN  ───────────────── */
  () => (
    <Slayt
      etiket="Sınırlar"
      baslik="MapReduce sağlamdır ama yavaştır"
      alt="Fikir bugün de geçerli. Ancak yeni işlerin çoğu artık aynı fikri daha hızlı uygulayan araçlarla yazılıyor."
      soru="Ders çalışırken her sayfadan sonra defteri dolaba kaldırsaydın ne olurdu?"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={HardDrive}
          title="Her adımda diske yazar"
          desc="Ara sonuçlar bellekte tutulmaz, diske yazılıp geri okunur. Disk yavaş olduğu için süre uzar."
          accent="#ef4444"
        />
        <FeatureCard
          icon={Timer}
          title="Küçük işte bile hazırlığı uzun"
          desc="Üç satırlık dosya için bile işi dağıtmak ve toplamak zaman alır."
          delay={0.1}
          accent="#f59e0b"
        />
        <FeatureCard
          icon={FileText}
          title="Kodu uzundur"
          desc="Klasik MapReduce programı Java ile yazılır ve basit bir sayım bile onlarca satır tutar."
          delay={0.2}
          accent="#a855f7"
        />
      </div>
    </Slayt>
  ),

  /* ─────────────────  11 · PYSPARK ÖN İZLEME  ───────────────── */
  () => (
    <Slayt
      etiket="Kod · ön izleme"
      baslik="Aynı sayım Python ile 5 satır"
      soru="Hangi satır map adımı, hangi satır reduce adımı?"
    >
      <KodSatirlari
        cikti="[('bulut', 3), ('veri', 4), ('büyük', 2)]"
        satirlar={[
          {
            kod: 'satirlar = sc.textFile("metin.txt")',
            aciklama:
              "Dosyayı açar; her satır bir eleman olur. sc, Spark'a bağlantımızın adı. Ayrıntısı gelecek hafta.",
          },
          {
            kod: "kelimeler = satirlar.flatMap(lambda satir: satir.split())",
            aciklama:
              "Her satırı boşluklardan kelimelere böler. lambda, tek satırlık küçük bir tarif demek.",
          },
          {
            kod: "ciftler = kelimeler.map(lambda kelime: (kelime, 1))",
            aciklama: "Map adımı: her kelimenin yanına 1 yazar. Sonuç (kelime, 1) çiftleridir.",
          },
          {
            kod: "sayim = ciftler.reduceByKey(lambda a, b: a + b)",
            aciklama:
              "Shuffle ve reduce birlikte: aynı kelimenin 1'lerini bir araya getirir ve toplar.",
          },
          {
            kod: "print(sayim.collect())",
            aciklama: "Sonucu ister ve ekrana yazar. Kelimelerin sırası her çalıştırmada değişebilir.",
          },
        ]}
      />
    </Slayt>
  ),

  /* ─────────────────  12 · SINIFTA DENEYELİM  ───────────────── */
  () => (
    <Slayt
      etiket="Sınıfta deneyelim · 8–10 dk"
      baslik="Kâğıtla kelime sayalım"
      soru="Hangi adım en çok zaman aldı? Neden?"
    >
      <AdimAdim
        adimlar={[
          {
            baslik: "Böl",
            metin: "Hoca kısa bir paragrafı cümle cümle sıralara dağıtır. Her sıra bir bilgisayardır.",
          },
          {
            baslik: "Map",
            metin: "Herkes cümlesindeki her kelimeyi ayrı bir küçük kâğıda yazar. Saymak yok, yalnızca yaz.",
          },
          {
            baslik: "Shuffle",
            metin: "Kâğıtlar toplanır; aynı kelimeyi taşıyanlar aynı masaya konur.",
          },
          {
            baslik: "Reduce",
            metin: "Her masanın başına bir kişi geçer, kâğıtları sayar ve toplamı tahtaya yazar.",
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
            soru: "Map adımı “veri veri bulut” satırı için ne üretir?",
            siklar: [
              "(veri, 2), (bulut, 1)",
              "(veri, 1), (veri, 1), (bulut, 1)",
              "Yalnızca 3 sayısını",
              "(bulut, veri)",
            ],
            dogru: 1,
            aciklama: "Map toplamaz; gördüğü her kelime için ayrı bir (kelime, 1) yazar.",
          },
          {
            soru: "Reduce adımı ne yapar?",
            siklar: [
              "Dosyayı parçalara böler",
              "Kelimeleri alfabeye göre sıralar",
              "Aynı etikete ait sayıları toplar",
              "Parçaların kopyasını çıkarır",
            ],
            dogru: 2,
            aciklama: "Reduce, aynı kutuya düşen değerleri tek bir sonuca indirir: (veri, 4) gibi.",
          },
          {
            soru: "MapReduce neden yavaş kalabilir?",
            siklar: [
              "Ara sonuçları her adımda diske yazdığı için",
              "Yalnızca tek bilgisayarda çalıştığı için",
              "Kelime saymaktan başka iş yapamadığı için",
              "Kopya tutmadığı için",
            ],
            dogru: 0,
            aciklama: "Diske yazıp geri okumak, bellekte tutmaktan çok daha yavaştır.",
          },
        ]}
      />
    </Slayt>
  ),

  /* ─────────────────  14 · AKLINDA KALSIN  ───────────────── */
  () => (
    <UcSey
      maddeler={[
        "MapReduce üç adımdır: map (etiketle), shuffle (grupla), reduce (topla).",
        "Bilgi hep (etiket, sayı) çifti olarak dolaşır: (kelime, 1) gibi.",
        "İş birçok bilgisayarda aynı anda yürür; sağlamdır ama diske yazdığı için yavaştır.",
      ]}
      kopru="Aynı sayımı bellekte, çok daha hızlı yapan araçla tanışacağız: Apache Spark."
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
          BVA 2103 · 10. Hafta · Hadoop MapReduce
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
