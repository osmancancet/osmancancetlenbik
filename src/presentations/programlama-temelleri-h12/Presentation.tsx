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
  MousePointerClick,
  RotateCcw,
  Hand,
  Quote,
  Scissors,
  WandSparkles,
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
      className={`text-3xl md:text-4xl font-semibold tracking-tight text-white ${className}`}
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
  accent = "#3776ab",
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
      className="prog-card prog-card-hover rounded-xl p-6 transition-all"
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
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-base text-gray-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

/* ---- Anlatım yardımcıları ------------------------------------ */

/** Hocanın sınıfa yönelteceği tek soru (slaydın altında, soluk). */
function Ask({ children }: { children: ReactNode }) {
  return (
    <div className="mt-5 text-sm text-gray-500">
      <span className="font-mono uppercase tracking-widest text-[11px] text-[#5fa8e0]/70 mr-2">
        Sınıfa sor:
      </span>
      {children}
    </div>
  );
}

/** Standart içerik slaydı: üst etiket + cümle başlık + içerik + "Sınıfa sor". */
function Frame({
  eyebrow,
  title,
  ask,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  ask: string;
  children: ReactNode;
}) {
  return (
    <SlideShell>
      <Eyebrow>{eyebrow}</Eyebrow>
      <H2>{title}</H2>
      {/* Dar orta sütun: tıklanabilir öğeler kenar geçiş alanlarının (%12) dışında kalır. */}
      <div className="mt-6 max-w-4xl mx-auto">{children}</div>
      <Ask>{ask}</Ask>
    </SlideShell>
  );
}

/** Büyük, belirgin düğme. Tıklamadan sonra odağı bırakır; böylece boşluk
 *  tuşu düğmeyi yeniden tetiklemez, yalnızca slaydı ilerletir. */
function Btn({
  onClick,
  children,
  active = false,
  disabled = false,
  mono = false,
}: {
  onClick: () => void;
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  mono?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={(e) => {
        onClick();
        e.currentTarget.blur();
      }}
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-base border transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
        mono ? "font-mono" : "font-semibold"
      }`}
      style={
        active
          ? { background: "rgba(255,212,59,0.18)", borderColor: "#ffd43b", color: "#ffe169" }
          : { background: "rgba(55,118,171,0.14)", borderColor: "rgba(95,168,224,0.5)", color: "#e5e7eb" }
      }
    >
      {children}
    </button>
  );
}

/** Tahmin et → tıkla göster. */
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
      onClick={(e) => {
        setOpen((o) => !o);
        e.currentTarget.blur();
      }}
      className="w-full text-left rounded-xl p-5 prog-card prog-card-hover transition-all"
      style={open ? { borderColor: "rgba(134,239,172,0.55)" } : { borderStyle: "dashed" }}
    >
      {open ? (
        <div className="text-lg text-gray-200 leading-relaxed">{children}</div>
      ) : (
        <div className="flex items-center gap-3 text-[#ffd43b]">
          <MousePointerClick className="w-5 h-5 shrink-0" />
          <span className="text-lg font-semibold">{label}</span>
        </div>
      )}
    </button>
  );
}

/** Mini sınav: şıkka tıkla; doğru yeşil, yanlış kırmızı, altında açıklama. */
function Quiz({
  q,
  code,
  options,
  correct,
  why,
}: {
  q: string;
  code?: string;
  options: string[];
  correct: number;
  why: string;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <div className="prog-card rounded-xl p-5">
      <div className="text-lg text-white font-semibold">{q}</div>
      {code && (
        <pre className="prog-editor rounded-lg px-4 py-2 mt-3 text-[15px] whitespace-pre-wrap">
          {code}
        </pre>
      )}
      <div className="grid grid-cols-2 gap-2 mt-4">
        {options.map((o, i) => {
          const shown = picked !== null && (i === picked || i === correct);
          const ok = i === correct;
          return (
            <button
              key={o}
              type="button"
              onClick={(e) => {
                setPicked(i);
                e.currentTarget.blur();
              }}
              className="text-left rounded-lg px-4 py-3 text-base font-mono border transition-colors"
              style={
                shown
                  ? {
                      background: ok ? "rgba(134,239,172,0.14)" : "rgba(252,165,165,0.14)",
                      borderColor: ok ? "#86efac" : "#fca5a5",
                      color: ok ? "#86efac" : "#fca5a5",
                    }
                  : { borderColor: "rgba(95,168,224,0.4)", color: "#e5e7eb" }
              }
            >
              <span className="text-gray-500 mr-3">{"ABCD"[i]}</span>
              {o}
            </button>
          );
        })}
      </div>
      <div className="mt-3 text-base min-h-[3rem] text-gray-300">
        {picked === null ? (
          <span className="text-gray-600">Bir şıkka tıkla.</span>
        ) : (
          <>
            <span className={picked === correct ? "text-[#86efac]" : "text-[#fca5a5]"}>
              {picked === correct ? "Doğru. " : "Olmadı. "}
            </span>
            {why}
          </>
        )}
      </div>
    </div>
  );
}

/** Adım adım kod izleme: İleri/Geri ile satır satır, değişkenler yanında. */
type TraceStep = { line: number; vars: string; note: string; hi?: number };

function Trace({
  code,
  steps,
  render,
}: {
  code: string[];
  steps: TraceStep[];
  render?: (hi: number | undefined) => ReactNode;
}) {
  const [i, setI] = useState(0);
  const s = steps[i];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
      <div className="prog-editor rounded-xl p-4 text-[16px]">
        {code.map((l, n) => (
          <div
            key={n}
            className="px-2 rounded whitespace-pre"
            style={
              n === s.line
                ? { background: "rgba(255,212,59,0.16)", color: "#ffe169" }
                : undefined
            }
          >
            {l || " "}
          </div>
        ))}
      </div>
      <div className="prog-card rounded-xl p-5 flex flex-col">
        {render && <div className="mb-4">{render(s.hi)}</div>}
        <div className="font-mono text-lg text-[#9cdcfe]">{s.vars}</div>
        <div className="text-base text-gray-300 mt-2 flex-1">{s.note}</div>
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <Btn onClick={() => setI((v) => Math.max(v - 1, 0))} disabled={i === 0}>
            Geri
          </Btn>
          <Btn
            onClick={() => setI((v) => Math.min(v + 1, steps.length - 1))}
            disabled={i === steps.length - 1}
            active={i < steps.length - 1}
          >
            İleri
          </Btn>
          <Btn onClick={() => setI(0)} disabled={i === 0}>
            <RotateCcw className="w-4 h-4" />
            Baştan
          </Btn>
          <span className="ml-auto font-mono text-sm text-gray-500">
            Adım {i + 1} / {steps.length}
          </span>
        </div>
      </div>
    </div>
  );
}

/** Önce tahmin et, sonra çalıştır: solda gerçek Python çalıştırıcısı. */
function PredictRun({
  file,
  code,
  question,
  answer,
  note,
}: {
  file: string;
  code: string;
  question: string;
  answer: string[];
  note: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-start">
      <div className="md:col-span-3">
        <CodeEditor
          title={`${file} — Visual Studio Code`}
          tabs={[file]}
          activeTab={file}
          code={code}
        />
      </div>
      <div className="md:col-span-2 space-y-3">
        <div className="prog-card-yellow rounded-xl p-4">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#ffd43b] mb-1">
            1 · Önce tahmin et
          </div>
          <div className="text-lg text-white">{question}</div>
        </div>
        <Reveal label="2 · Tahminler tamam mı? Çıktıyı göster">
          <div className="font-mono text-[#86efac]">
            {answer.map((l, n) => (
              <div key={n}>{l}</div>
            ))}
          </div>
          <div className="text-base text-gray-400 mt-2">{note}</div>
        </Reveal>
        <div className="text-base text-gray-400 px-1">
          3 · Şimdi <span className="text-white font-semibold">Çalıştır</span>&apos;a bas,
          tahminle karşılaştır.
        </div>
      </div>
    </div>
  );
}

/** Sınıfta deneyelim: solda tıklayıp işaretlenen adımlar, sağda çalıştırıcı. */
function Activity({
  file,
  code,
  steps,
}: {
  file: string;
  code: string;
  steps: string[];
}) {
  const [done, setDone] = useState<number[]>([]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-start">
      <div className="md:col-span-2 space-y-2">
        {steps.map((t, i) => {
          const ok = done.includes(i);
          return (
            <button
              key={t}
              type="button"
              onClick={(e) => {
                setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]));
                e.currentTarget.blur();
              }}
              className="w-full flex items-center gap-3 text-left rounded-lg px-4 py-3 border transition-colors"
              style={
                ok
                  ? { background: "rgba(134,239,172,0.12)", borderColor: "#86efac", color: "#86efac" }
                  : { background: "rgba(55,118,171,0.08)", borderColor: "rgba(95,168,224,0.4)", color: "#e5e7eb" }
              }
            >
              <span className="w-7 h-7 shrink-0 rounded-full border border-current flex items-center justify-center font-mono text-sm">
                {ok ? <Check className="w-4 h-4" /> : i + 1}
              </span>
              <span className="text-base">{t}</span>
            </button>
          );
        })}
        <div className="text-xs text-gray-600 px-1">Biten adıma tıkla, işaretlensin.</div>
      </div>
      <div className="md:col-span-3">
        <CodeEditor
          title={`${file} — Visual Studio Code`}
          tabs={[file]}
          activeTab={file}
          code={code}
        />
      </div>
    </div>
  );
}

/** Kapak slaydı. */
function Cover({
  week,
  title,
  second,
  sub,
  tags,
}: {
  week: string;
  title: string;
  second: string;
  sub: string;
  tags: { tag: string; name: string; desc: string; color: string }[];
}) {
  return (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 1101 · {week}</Eyebrow>
        <H1>
          <span className="prog-shimmer">{title}</span>
          <br />
          <span className="text-white/90">{second}</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">{sub}</Sub>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto"
        >
          {tags.map((l) => (
            <div
              key={l.name}
              className="prog-card rounded-xl p-5"
              style={{ borderColor: `${l.color}55` }}
            >
              <div
                className="h-10 px-3 rounded-lg mx-auto mb-3 inline-flex items-center justify-center text-sm font-mono font-bold"
                style={{ background: `${l.color}22`, color: l.color, border: `1px solid ${l.color}66` }}
              >
                {l.tag}
              </div>
              <div className="text-white font-semibold">{l.name}</div>
              <div className="text-sm text-gray-500 mt-1">{l.desc}</div>
            </div>
          ))}
        </motion.div>
        <div className="mt-10 text-[11px] font-mono text-gray-600 uppercase tracking-[0.3em]">
          Programlama Temelleri · MCBÜ Manisa Teknik Bilimler MYO
        </div>
      </div>
    </SlideShell>
  );
}

/** Kapanış: "Aklında kalsın: 3 şey" + gelecek haftaya köprü. */
function Closing({
  items,
  bridge,
}: {
  items: { icon: LucideIcon; title: string; desc: string; accent: string }[];
  bridge: string;
}) {
  return (
    <SlideShell>
      <Eyebrow>Özet</Eyebrow>
      <H2>Aklında kalsın: 3 şey</H2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {items.map((it, i) => (
          <FeatureCard
            key={it.title}
            icon={it.icon}
            title={it.title}
            desc={it.desc}
            accent={it.accent}
            delay={0.1 + i * 0.1}
          />
        ))}
      </div>
      <div className="prog-card-yellow rounded-xl px-6 py-4 mt-6 text-lg text-gray-200">
        <span className="font-mono uppercase tracking-widest text-xs text-[#ffd43b] mr-3">
          Gelecek hafta
        </span>
        {bridge}
      </div>
    </SlideShell>
  );
}

/** Numaralı kutu sırası: her kutunun altında indeksi yazar. */
function Cells({
  items,
  hi = [],
  dim = [],
  onPick,
  size = "w-16 h-16 text-lg",
}: {
  items: string[];
  hi?: number[];
  dim?: number[];
  onPick?: (i: number) => void;
  size?: string;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {items.map((v, i) => {
        const box = `${size} rounded-lg font-mono font-semibold flex items-center justify-center border transition-all`;
        const style = hi.includes(i)
          ? {
              background: "linear-gradient(180deg, #3776ab, #2c5d88)",
              borderColor: "#5fa8e0",
              color: "#ffffff",
              boxShadow: "0 0 18px -2px rgba(95,168,224,0.6)",
            }
          : {
              background: "#111827",
              borderColor: "rgba(55,118,171,0.45)",
              color: dim.includes(i) ? "#4b5563" : "#ffffff",
            };
        return (
          <div key={i} className="flex flex-col items-center gap-1">
            {onPick ? (
              <button
                type="button"
                onClick={(e) => {
                  onPick(i);
                  e.currentTarget.blur();
                }}
                className={`${box} cursor-pointer hover:border-[#ffd43b]`}
                style={style}
              >
                {v}
              </button>
            ) : (
              <div className={box} style={style}>
                {v}
              </div>
            )}
            <div className="font-mono text-xs text-[#5fa8e0]">[{i}]</div>
          </div>
        );
      })}
    </div>
  );
}

/* ============================================================
   H12 ETKİLEŞİMLİ BİLEŞENLER
   ============================================================ */

/** Harf kutuları: harfe tıkla, baştan ve sondan numarasını gör. */
function CharStrip() {
  const metin = "Spil Dağı";
  const harfler = metin.split("");
  const [i, setI] = useState<number | null>(null);
  return (
    <div className="prog-flow-bg p-6">
      <div className="font-mono text-base text-[#9cdcfe] mb-4 text-center">
        metin = &quot;{metin}&quot;
      </div>
      <Cells
        items={harfler.map((h) => (h === " " ? "␣" : h))}
        hi={i === null ? [] : [i]}
        onPick={setI}
        size="w-14 h-14 text-xl"
      />
      <div className="mt-5 text-center min-h-[4rem]">
        {i === null ? (
          <span className="text-lg text-[#ffd43b]">Bir harfe tıkla.</span>
        ) : (
          <>
            <div className="font-mono text-xl">
              <span className="text-[#9cdcfe]">metin[{i}]</span>
              <span className="text-gray-500"> → </span>
              <span className="text-[#ce9178]">&quot;{harfler[i]}&quot;</span>
              {harfler[i] === " " && (
                <span className="text-gray-400 font-sans text-base"> · boşluk da bir karakterdir</span>
              )}
            </div>
            <div className="text-base text-gray-400 mt-1">
              Sondan sayarsan aynı harf:{" "}
              <span className="font-mono text-[#ffe169]">metin[{i - harfler.length}]</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/** Dilimleme: başlangıç ve bitişi kaydır; kesilen parça anında görünür. */
function SliceLab() {
  const kelime = "programlama";
  const harfler = kelime.split("");
  const [bas, setBas] = useState(0);
  const [bit, setBit] = useState(3);
  const secili = harfler.map((_, i) => i).filter((i) => i >= bas && i < bit);
  return (
    <div className="prog-flow-bg p-6">
      <Cells
        items={harfler}
        hi={secili}
        dim={harfler.map((_, i) => i).filter((i) => !secili.includes(i))}
        size="w-12 h-12 text-lg"
      />
      <div className="mt-5 grid grid-cols-2 gap-6 max-w-2xl mx-auto">
        {[
          { ad: "Başlangıç", deger: bas, ayarla: setBas },
          { ad: "Bitiş", deger: bit, ayarla: setBit },
        ].map((k) => (
          <label key={k.ad} className="flex items-center gap-3 text-lg text-gray-300">
            <span className="w-24">{k.ad}</span>
            <input
              type="range"
              min={0}
              max={harfler.length}
              value={k.deger}
              onChange={(e) => k.ayarla(Number(e.target.value))}
              onPointerUp={(e) => e.currentTarget.blur()}
              className="flex-1 h-3 accent-[#ffd43b] cursor-pointer"
            />
            <span className="font-mono text-2xl text-[#ffe169] w-8">{k.deger}</span>
          </label>
        ))}
      </div>
      <div className="mt-4 text-center font-mono text-xl">
        <span className="text-[#9cdcfe]">
          kelime[{bas}:{bit}]
        </span>
        <span className="text-gray-500"> → </span>
        <span className="text-[#86efac]">&quot;{kelime.slice(bas, bit)}&quot;</span>
      </div>
      <div className="mt-1 text-center text-base text-gray-400">
        {bit > bas
          ? `${bit - bas} harf alındı. ${bit} numaralı harf dahil değil.`
          : "Bitiş başlangıçtan büyük değilse boş metin gelir."}
      </div>
    </div>
  );
}

/** Metot dene: düğmeye bas, aynı metnin yeni hâlini gör. */
function MethodLab() {
  const araclar = [
    { kod: ".upper()", sonuc: "  MERHABA DÜNYA  ", ne: "Hepsini büyük harf yapar." },
    { kod: ".lower()", sonuc: "  merhaba dünya  ", ne: "Hepsini küçük harf yapar." },
    { kod: ".title()", sonuc: "  Merhaba Dünya  ", ne: "Her kelimenin ilk harfini büyütür." },
    { kod: ".strip()", sonuc: "merhaba Dünya", ne: "Baştaki ve sondaki boşlukları atar." },
    {
      kod: '.replace("Dünya", "Manisa")',
      sonuc: "  merhaba Manisa  ",
      ne: "Bir parçayı başka bir parçayla değiştirir.",
    },
  ];
  const [sec, setSec] = useState<number | null>(null);
  const kutu = "prog-editor rounded-lg px-4 py-2 text-[20px] whitespace-pre";
  return (
    <div className="prog-flow-bg p-6">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {araclar.map((a, i) => (
          <Btn key={a.kod} mono active={sec === i} onClick={() => setSec(i)}>
            {a.kod}
          </Btn>
        ))}
        <Btn onClick={() => setSec(null)} disabled={sec === null}>
          <RotateCcw className="w-4 h-4" />
          Sıfırla
        </Btn>
      </div>
      <div className="mt-5 grid grid-cols-[7rem_1fr] gap-x-4 gap-y-3 items-center max-w-2xl mx-auto">
        <div className="text-base text-gray-400 text-right">mesaj</div>
        <div className={kutu}>
          <span className="text-[#ce9178]">&quot;{"  merhaba Dünya  "}&quot;</span>
        </div>
        <div className="text-base text-gray-400 text-right">sonuç</div>
        <div className={kutu}>
          {sec === null ? (
            <span className="text-[#ffd43b] font-sans text-lg">Bir araç seç.</span>
          ) : (
            <span className="text-[#86efac]">&quot;{araclar[sec].sonuc}&quot;</span>
          )}
        </div>
      </div>
      <div className="mt-3 text-center text-base text-gray-300 min-h-[1.5rem]">
        {sec !== null && araclar[sec].ne}
      </div>
    </div>
  );
}

/** f-string: ad ve notu seç, cümle anında dolar; f'yi kaldırınca ne olduğunu gör. */
function FStringLab() {
  const adlar = ["Ayşe", "Mehmet", "Zeynep"];
  const puanlar = [45, 70, 95];
  const [ad, setAd] = useState(adlar[0]);
  const [puan, setPuan] = useState(puanlar[1]);
  const [fVar, setFVar] = useState(true);
  return (
    <div className="prog-flow-bg p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-12 text-base text-gray-400">ad</span>
          {adlar.map((a) => (
            <Btn key={a} active={ad === a} onClick={() => setAd(a)}>
              {a}
            </Btn>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-12 text-base text-gray-400">puan</span>
          {puanlar.map((p) => (
            <Btn key={p} mono active={puan === p} onClick={() => setPuan(p)}>
              {p}
            </Btn>
          ))}
        </div>
        <Btn active={!fVar} onClick={() => setFVar((v) => !v)}>
          {fVar ? "Baştaki f harfini sil" : "f harfini geri koy"}
        </Btn>
      </div>
      <div>
        <pre className="prog-editor rounded-lg px-4 py-3 text-[16px] whitespace-pre-wrap">
          {`ad = "${ad}"\npuan = ${puan}\nprint(${fVar ? "f" : ""}"Merhaba {ad}, notun {puan}.")`}
        </pre>
        <div className="text-[11px] font-mono uppercase tracking-widest text-gray-500 mt-4 mb-1">
          Ekran çıktısı
        </div>
        <div className="prog-editor rounded-lg px-4 py-3 text-[18px]">
          <span className={fVar ? "text-[#86efac]" : "text-[#fca5a5]"}>
            {fVar ? `Merhaba ${ad}, notun ${puan}.` : "Merhaba {ad}, notun {puan}."}
          </span>
        </div>
        <div className="mt-2 text-base text-gray-400 min-h-[1.5rem]">
          {!fVar && "f olmayınca süslü parantezler düz yazı sayılır."}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* 1 · KAPAK */
  () => (
    <Cover
      week="12. Hafta"
      title="Metinler"
      second="Harf harf çalışmak"
      sub="İsim, mesaj, kullanıcı adı: tırnak içindeki her şey metindir (string). Bugün metni kesiyor, düzenliyor, cümleye yerleştiriyoruz."
      tags={[
        { tag: '"..."', name: "Harflere ulaş", desc: "Numara ve dilim", color: "#3776ab" },
        { tag: ".upper()", name: "Düzenle", desc: "Hazır araçlar", color: "#5fa8e0" },
        { tag: 'f"..."', name: "Cümle kur", desc: "Boşluk doldur", color: "#ffd43b" },
      ]}
    />
  ),

  /* 2 · SORUN */
  () => (
    <Frame
      eyebrow="Sorun · el kaldır"
      title="&quot;5&quot; + &quot;5&quot; kaç eder?"
      ask="input() ile aldığımız yaş neden toplanmıyordu, hatırlayan var mı?"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-4">
          <pre className="prog-editor rounded-xl px-5 py-4 text-[20px]">{`print(5 + 5)
print("5" + "5")`}</pre>
          <div className="prog-card-yellow rounded-xl p-5">
            <div className="flex items-center gap-2 text-[#ffd43b] mb-1">
              <Hand className="w-5 h-5" />
              <span className="text-xs font-mono uppercase tracking-widest">El kaldır</span>
            </div>
            <div className="text-lg text-white">
              İkinci satır için: 10 diyenler? 55 diyenler? Hata diyenler?
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <Reveal label="Oylar sayıldı mı? Tıkla, göster">
            <div className="font-mono text-[#86efac]">
              <div>10</div>
              <div>55</div>
            </div>
            <div className="mt-2">
              Tırnak içindeki her şey <span className="text-white font-semibold">metindir</span>,
              sayı değildir. Metinlerde + işareti toplamaz, yan yana yapıştırır.
            </div>
          </Reveal>
          <div className="prog-card rounded-xl px-5 py-4 text-base text-gray-300">
            Metnin programlamadaki adı: <span className="text-white font-semibold">string</span>{" "}
            (karakter dizisi).
          </div>
        </div>
      </div>
    </Frame>
  ),

  /* 3 · BENZETME */
  () => (
    <Frame
      eyebrow="Benzetme · harf kutuları"
      title="Metin, yan yana dizilmiş numaralı harf kutularıdır"
      ask="Bu metinde kaç kutu var? Boşluğu saydın mı?"
    >
      <CharStrip />
    </Frame>
  ),

  /* 4 · KOD 1 */
  () => (
    <Frame
      eyebrow="Kod · önce tahmin et"
      title="İlk harf, son harf ve uzunluk"
      ask="Kendi adının uzunluğu kaç? Son harfinin indeksi kaç?"
    >
      <PredictRun
        file="sehir.py"
        code={`sehir = "Manisa"
print(sehir[0])
print(sehir[-1])
print(len(sehir))`}
        question="Üç satır çıkacak. Sırayla ne yazar?"
        answer={["M", "a", "6"]}
        note="Listedeki kuralların aynısı: 0'dan başlar, -1 son harftir, len uzunluğu verir."
      />
    </Frame>
  ),

  /* 5 · DİLİMLEME */
  () => (
    <Frame
      eyebrow="Dene gör · ekmek dilimler gibi"
      title="Dilimleme: metinden istediğin parçayı kesip almak"
      ask="&ldquo;gram&rdquo; parçasını almak için hangi iki sayı gerekir?"
    >
      <SliceLab />
    </Frame>
  ),

  /* 6 · TUZAK · MİNİ SINAV */
  () => (
    <Frame
      eyebrow="Klasik tuzak · mini sınav"
      title="Bitiş numarasındaki harf dilime dahil değildir"
      ask="İlk dört harfi almak için ne yazarız?"
    >
      <div className="max-w-3xl mx-auto">
        <Quiz
          q="Bu kod ekrana ne yazar?"
          code={`sehir = "Manisa"
print(sehir[0:3])`}
          options={["Mani", "Man", "ani", "Ma"]}
          correct={1}
          why="0, 1 ve 2 numaralı harfler alınır; 3 numaralı harf dahil değildir. Üç harf: Man."
        />
      </div>
    </Frame>
  ),

  /* 7 · DEĞİŞMEZLİK */
  () => (
    <Frame
      eyebrow="Klasik tuzak · tahmin et"
      title="Metnin tek harfi değiştirilemez; yeni bir metin üretilir"
      ask="Listede notlar[0] = 100 yazabiliyorduk. Fark ne?"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
        <div>
          <pre className="prog-editor rounded-xl px-5 py-4 text-[20px]">{`sehir = "Manisa"
sehir[0] = "K"`}</pre>
          <div className="text-base text-gray-400 mt-3">
            Amaç: Manisa&apos;yı Kanisa yapmak. Bu kod çalışır mı?
          </div>
        </div>
        <div className="space-y-4">
          <Reveal label="Çalışır diyenler? Tıkla, göster">
            <div className="font-mono text-[#fca5a5] text-base">TypeError</div>
            Çalışmaz. Python, bir metnin içindeki harfi yerinde değiştirmeye izin vermez.
          </Reveal>
          <Reveal label="Peki nasıl yaparız? Tıkla">
            <div className="font-mono text-[#86efac]">yeni = &quot;K&quot; + sehir[1:]</div>
            Eski metinden parça alıp <span className="text-white font-semibold">yeni</span> bir
            metin kurarız: Kanisa.
          </Reveal>
        </div>
      </div>
    </Frame>
  ),

  /* 8 · METOTLAR */
  () => (
    <Frame
      eyebrow="Dene gör · hazır araçlar"
      title="Metnin hazır araçları var: büyüt, küçült, temizle, değiştir"
      ask="Bir sitede e-posta yazarken hangisi işe yarar, neden?"
    >
      <MethodLab />
    </Frame>
  ),

  /* 9 · KOD 2 */
  () => (
    <Frame
      eyebrow="Kod · önce tahmin et"
      title="Mesajı düzenleyelim; asıl mesaja ne oluyor?"
      ask="Değişikliği kalıcı yapmak için ne yazmamız gerekir?"
    >
      <PredictRun
        file="mesaj.py"
        code={`mesaj = "merhaba dünya"
print(mesaj.upper())
print(mesaj.replace("dünya", "Manisa"))
print(mesaj)`}
        question="Üç satır çıkacak. En çok üçüncü satıra dikkat: ne yazar?"
        answer={["MERHABA DÜNYA", "merhaba Manisa", "merhaba dünya"]}
        note="Araçlar yeni metin verir; mesaj değişmedi. Saklamak için: mesaj = mesaj.upper()."
      />
    </Frame>
  ),

  /* 10 · ADIM ADIM HARF SAYMA */
  () => (
    <Frame
      eyebrow="Adım adım"
      title="Metin de liste gibi for ile harf harf gezilir"
      ask="Geçen haftaki hangi kalıbın aynısı bu?"
    >
      <Trace
        code={[
          'kelime = "manisa"',
          "sayac = 0",
          "for harf in kelime:",
          '    if harf == "a":',
          "        sayac = sayac + 1",
          "print(sayac)",
        ]}
        steps={[
          { line: 1, vars: "sayac = 0", note: "Sayaç 0'dan başlıyor." },
          { line: 3, vars: 'harf = "m" · sayac = 0', note: "m, a değil. Sayaç aynı kalır.", hi: 0 },
          { line: 3, vars: 'harf = "a" · sayac = 0', note: "Bu harf a. Şart tuttu.", hi: 1 },
          { line: 4, vars: 'harf = "a" · sayac = 1', note: "Sayaç 1 oldu.", hi: 1 },
          { line: 3, vars: 'harf = "n" · sayac = 1', note: "n, a değil.", hi: 2 },
          { line: 3, vars: 'harf = "i" · sayac = 1', note: "i, a değil.", hi: 3 },
          { line: 3, vars: 'harf = "s" · sayac = 1', note: "s, a değil.", hi: 4 },
          { line: 3, vars: 'harf = "a" · sayac = 1', note: "Yine a. Şart tuttu.", hi: 5 },
          { line: 4, vars: 'harf = "a" · sayac = 2', note: "Sayaç 2 oldu.", hi: 5 },
          { line: 5, vars: "sayac = 2", note: "Harfler bitti. Ekrana 2 yazılır." },
        ]}
        render={(hi) => (
          <Cells
            items={"manisa".split("")}
            hi={hi === undefined ? [] : [hi]}
            size="w-12 h-12 text-lg"
          />
        )}
      />
    </Frame>
  ),

  /* 11 · F-STRING */
  () => (
    <Frame
      eyebrow="Dene gör · boşluk doldurma"
      title="f-string: cümledeki boşluğa değişkeni yerleştirir"
      ask="Davetiyedeki &ldquo;Sayın ......&rdquo; boşluğuna benziyor mu?"
    >
      <FStringLab />
    </Frame>
  ),

  /* 12 · SINIFTA DENEYELİM */
  () => (
    <Frame
      eyebrow="Sınıfta deneyelim · 10 dakika"
      title="Adından ve soyadından kullanıcı adı üret"
      ask="Senin kullanıcı adın ne çıktı? Yanındakiyle aynı olan var mı?"
    >
      <Activity
        file="kullanici.py"
        code={`ad = "Zeynep"
soyad = "Kaya"
print(ad[0:3])`}
        steps={[
          "Kendi adını ve soyadını yaz, çalıştır.",
          "Adın ilk 3, soyadın ilk 2 harfini + ile birleştir.",
          "Sonucu lower() ile küçük harfe çevir.",
          "f-string ile yazdır: Kullanıcı adın: ...",
        ]}
      />
    </Frame>
  ),

  /* 13 · KENDİNİ DENE */
  () => (
    <Frame
      eyebrow="Kendini dene"
      title="İki soru: uzunluk ve f-string"
      ask="İlk soruda 6 diyenler neyi saymayı unuttu?"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Quiz
          q="Ekrana ne yazar?"
          code={`print(len("Ali Can"))`}
          options={["6", "7", "2", "8"]}
          correct={1}
          why="Altı harf ve bir boşluk. Boşluk da bir karakterdir: 7."
        />
        <Quiz
          q="Ekrana ne yazar?"
          code={`ad = "Ece"
print(f"Selam {ad}!")`}
          options={["Selam {ad}!", "Selam ad!", "Selam Ece!", "Hata verir"]}
          correct={2}
          why="Baştaki f sayesinde {ad} yerine değişkenin değeri yazılır."
        />
      </div>
    </Frame>
  ),

  /* 14 · ÖZET + KÖPRÜ */
  () => (
    <Closing
      items={[
        {
          icon: Quote,
          title: "Tırnak içi metindir",
          desc: "Harfler listedeki gibi 0'dan numaralanır. Boşluk da bir karakterdir.",
          accent: "#3776ab",
        },
        {
          icon: Scissors,
          title: "Dilimde bitiş dahil değil",
          desc: "metin[0:3] üç harf verir: 0, 1 ve 2 numaralı harfler.",
          accent: "#ffd43b",
        },
        {
          icon: WandSparkles,
          title: "Araçlar yeni metin verir",
          desc: "upper, strip, replace asıl metni değiştirmez. f-string değişkeni cümleye koyar.",
          accent: "#86efac",
        },
      ]}
      bridge="len(), upper() gibi hazır araçları kullandık. Sırada kendi aracımızı yazmak var: fonksiyonlar."
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
            background: "linear-gradient(90deg, #3776ab, #5fa8e0, #ffd43b)",
            boxShadow: "0 0 16px rgba(55,118,171,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#5fa8e0]/70">
          BVA 1101 · 12. Hafta · Metinler (String)
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
