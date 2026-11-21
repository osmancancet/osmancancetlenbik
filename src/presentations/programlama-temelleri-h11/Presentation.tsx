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
  Calculator,
  Trophy,
  Search,
  Filter,
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
   H11 ETKİLEŞİMLİ BİLEŞENLER
   ============================================================ */

/** Arama: aranan ismi seç; baştan kaç kutuya bakıldığını gör. */
function LinearSearch() {
  const sinif = ["Ali", "Ece", "Can", "Naz", "Efe"];
  const adaylar = ["Ali", "Can", "Efe", "Mert"];
  const [aranan, setAranan] = useState<string | null>(null);
  const yer = aranan === null ? -1 : sinif.indexOf(aranan);
  const bakilan = aranan === null ? 0 : yer === -1 ? sinif.length : yer + 1;
  return (
    <div className="prog-flow-bg p-6">
      <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
        <span className="text-base text-gray-400 mr-2">Aranan:</span>
        {adaylar.map((a) => (
          <Btn key={a} mono active={aranan === a} onClick={() => setAranan(a)}>
            &quot;{a}&quot;
          </Btn>
        ))}
        <Btn onClick={() => setAranan(null)} disabled={aranan === null}>
          <RotateCcw className="w-4 h-4" />
          Sıfırla
        </Btn>
      </div>
      <Cells
        items={sinif}
        size="w-24 h-16 text-lg"
        hi={yer >= 0 ? [yer] : []}
        dim={sinif.map((_, i) => i).filter((i) => i >= bakilan)}
      />
      <div className="mt-5 text-center text-lg min-h-[3.5rem]">
        {aranan === null && <span className="text-[#ffd43b]">Bir isim seç.</span>}
        {aranan !== null && yer >= 0 && (
          <>
            <div className="text-[#86efac]">
              Baştan başladık, {bakilan} kutuya baktık. İndeks {yer}&apos;de bulundu.
            </div>
            <div className="text-base text-gray-400">Bulunca durduk; soluk kutulara hiç bakmadık.</div>
          </>
        )}
        {aranan !== null && yer === -1 && (
          <>
            <div className="text-[#fca5a5]">5 kutunun hepsine baktık: listede yok.</div>
            <div className="text-base text-gray-400">
              &ldquo;Yok&rdquo; diyebilmek için sona kadar gitmek gerekir.
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/** Süzme: geçme notunu kaydır; şarta uyanlar yeni listeye geçer. */
function FilterSlider() {
  const notlar = [40, 75, 90, 55, 62, 30];
  const [baraj, setBaraj] = useState(60);
  const gecenler = notlar.filter((n) => n >= baraj);
  return (
    <div className="prog-flow-bg p-6">
      <Cells
        items={notlar.map(String)}
        hi={notlar.map((n, i) => (n >= baraj ? i : -1)).filter((i) => i >= 0)}
        dim={notlar.map((n, i) => (n < baraj ? i : -1)).filter((i) => i >= 0)}
      />
      <div className="mt-5 flex items-center justify-center gap-4">
        <span className="text-lg text-gray-300">Geçme notu:</span>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={baraj}
          onChange={(e) => setBaraj(Number(e.target.value))}
          onPointerUp={(e) => e.currentTarget.blur()}
          aria-label="Geçme notu"
          className="w-80 h-3 accent-[#ffd43b] cursor-pointer"
        />
        <span className="font-mono text-2xl text-[#ffe169] w-14">{baraj}</span>
        <Btn onClick={() => setBaraj(60)} disabled={baraj === 60}>
          <RotateCcw className="w-4 h-4" />
          60
        </Btn>
      </div>
      <div className="mt-4 text-center font-mono text-lg">
        <span className="text-gray-400">if n &gt;= {baraj}</span>
        <span className="text-gray-500"> → </span>
        <span className="text-[#9cdcfe]">gecenler</span>
        <span className="text-gray-500"> = </span>
        <span className="text-[#86efac]">[{gecenler.join(", ")}]</span>
      </div>
      <div className="mt-1 text-center text-base text-gray-400">
        {gecenler.length} kişi geçti. Asıl liste hiç değişmedi; geçenler yeni bir listede.
      </div>
    </div>
  );
}

const NOTLAR = ["40", "75", "90", "55"];

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* 1 · KAPAK */
  () => (
    <Cover
      week="11. Hafta"
      title="Listelerle"
      second="Problem çözme"
      sub="Listeyi tanıdık. Şimdi ona soru soruyoruz: ortalama kaç, en büyük hangisi, aradığım var mı, kimler geçti?"
      tags={[
        { tag: "+", name: "Topla ve say", desc: "Ortalama, adet", color: "#3776ab" },
        { tag: ">", name: "En büyüğü bul", desc: "Ara, karşılaştır", color: "#5fa8e0" },
        { tag: "if", name: "Süz", desc: "Şarta uyanı ayır", color: "#ffd43b" },
      ]}
    />
  ),

  /* 2 · SORUN */
  () => (
    <Frame
      eyebrow="Sorun · öğretmenin not defteri"
      title="Not listesine sorulan dört soru aynı yolla çözülür"
      ask="Bu soruları kâğıt üstünde, elle nasıl cevaplardın?"
    >
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: Calculator, soru: "Sınıf ortalaması kaç?" },
          { icon: Trophy, soru: "En yüksek not kaç?" },
          { icon: Search, soru: "100 alan biri var mı?" },
          { icon: Filter, soru: "Kimler geçti?" },
        ].map((k) => (
          <div key={k.soru} className="prog-card rounded-xl px-5 py-4 flex items-center gap-3">
            <k.icon className="w-6 h-6 text-[#5fa8e0] shrink-0" />
            <span className="text-lg text-white">{k.soru}</span>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Reveal label="Dördünün ortak noktası ne? Tıkla">
          Hepsinde listeyi <span className="text-white font-semibold">baştan sona gezeriz</span>,
          her elemana bir kez bakarız ve aklımızda tek bir şey tutarız: toplam, sayaç ya da en
          büyük.
        </Reveal>
      </div>
    </Frame>
  ),

  /* 3 · SAYMA · ADIM ADIM */
  () => (
    <Frame
      eyebrow="Kalıp 1 · adım adım"
      title="Saymak: şartı tutanı gördükçe sayacı bir artır"
      ask="Sayaç neden 0 ile başlıyor?"
    >
      <Trace
        code={[
          "notlar = [40, 75, 90, 55]",
          "gecen = 0",
          "for n in notlar:",
          "    if n >= 60:",
          "        gecen = gecen + 1",
          "print(gecen)",
        ]}
        steps={[
          { line: 1, vars: "gecen = 0", note: "Henüz kimseye bakmadık: sayaç 0." },
          { line: 3, vars: "n = 40 · gecen = 0", note: "40, 60'tan küçük. Sayaç aynı kalır.", hi: 0 },
          { line: 3, vars: "n = 75 · gecen = 0", note: "75, 60'tan büyük. Şart tuttu.", hi: 1 },
          { line: 4, vars: "n = 75 · gecen = 1", note: "Sayaç 1 oldu.", hi: 1 },
          { line: 3, vars: "n = 90 · gecen = 1", note: "90 da şartı tutuyor.", hi: 2 },
          { line: 4, vars: "n = 90 · gecen = 2", note: "Sayaç 2 oldu.", hi: 2 },
          { line: 3, vars: "n = 55 · gecen = 2", note: "55 şartı tutmuyor. Sayaç aynı kalır.", hi: 3 },
          { line: 5, vars: "gecen = 2", note: "Liste bitti. Ekrana 2 yazılır." },
        ]}
        render={(hi) => <Cells items={NOTLAR} hi={hi === undefined ? [] : [hi]} />}
      />
    </Frame>
  ),

  /* 4 · KOD · ORTALAMA */
  () => (
    <Frame
      eyebrow="Kod · önce tahmin et"
      title="Ortalama: önce hepsini topla, sonra eleman sayısına böl"
      ask="Listeye bir not daha eklersek kodda neyi değiştirmemiz gerekir?"
    >
      <PredictRun
        file="ortalama.py"
        code={`notlar = [40, 75, 90, 55]
toplam = 0
for n in notlar:
    toplam = toplam + n
ortalama = toplam / len(notlar)
print(ortalama)`}
        question="Toplam 260. Ekrana tam olarak ne yazılır?"
        answer={["65.0"]}
        note="260 / 4 = 65. Bölme sonucu ondalıklı yazılır: 65.0."
      />
    </Frame>
  ),

  /* 5 · EN BÜYÜK · ADIM ADIM */
  () => (
    <Frame
      eyebrow="Kalıp 2 · şampiyonluk kemeri"
      title="En büyüğü bulmak: daha büyüğü gelince kemer el değiştirir"
      ask="Kemer kaç kez el değiştirdi?"
    >
      <Trace
        code={[
          "notlar = [40, 75, 90, 55]",
          "en_buyuk = notlar[0]",
          "for n in notlar:",
          "    if n > en_buyuk:",
          "        en_buyuk = n",
          "print(en_buyuk)",
        ]}
        steps={[
          { line: 1, vars: "en_buyuk = 40", note: "Kemeri ilk gelene veriyoruz.", hi: 0 },
          { line: 3, vars: "n = 40 · en_buyuk = 40", note: "40, 40'tan büyük değil. Kemer yerinde.", hi: 0 },
          { line: 3, vars: "n = 75 · en_buyuk = 40", note: "75, 40'tan büyük.", hi: 1 },
          { line: 4, vars: "n = 75 · en_buyuk = 75", note: "Kemer 75'e geçti.", hi: 1 },
          { line: 3, vars: "n = 90 · en_buyuk = 75", note: "90, 75'ten büyük.", hi: 2 },
          { line: 4, vars: "n = 90 · en_buyuk = 90", note: "Kemer 90'a geçti.", hi: 2 },
          { line: 3, vars: "n = 55 · en_buyuk = 90", note: "55, 90'dan büyük değil. Kemer yerinde.", hi: 3 },
          { line: 5, vars: "en_buyuk = 90", note: "Liste bitti. Kemer kimdeyse en büyük o: 90." },
        ]}
        render={(hi) => <Cells items={NOTLAR} hi={hi === undefined ? [] : [hi]} />}
      />
    </Frame>
  ),

  /* 6 · KOD · EN BÜYÜK */
  () => (
    <Frame
      eyebrow="Kod · önce tahmin et"
      title="Sınıfın en uzun boyunu bulalım"
      ask="En kısayı bulmak için hangi tek işareti değiştiririz?"
    >
      <PredictRun
        file="en_uzun.py"
        code={`boylar = [165, 172, 180, 158]
en_uzun = boylar[0]
for b in boylar:
    if b > en_uzun:
        en_uzun = b
print(en_uzun)
print(max(boylar))`}
        question="İki satır çıkacak. İkisi aynı mı, farklı mı?"
        answer={["180", "180"]}
        note="max() hazır araçtır, aynı işi yapar. Biz içinde ne döndüğünü öğrendik."
      />
    </Frame>
  ),

  /* 7 · TUZAK · MİNİ SINAV */
  () => (
    <Frame
      eyebrow="Klasik tuzak · mini sınav"
      title="Yanlış başlangıç değeri yanlış sonuç verir"
      ask="Bu kodu tek satır değiştirerek nasıl düzeltiriz?"
    >
      <div className="max-w-3xl mx-auto">
        <Quiz
          q="Kış sıcaklıkları. Bu kod ekrana ne yazar?"
          code={`sicaklik = [-5, -2, -8]
en_buyuk = 0
for s in sicaklik:
    if s > en_buyuk:
        en_buyuk = s
print(en_buyuk)`}
          options={["-2", "0", "-8", "-5"]}
          correct={1}
          why="Hiçbir eksi sayı 0'dan büyük değil; listede olmayan 0 çıkar. Çözüm: en_buyuk = sicaklik[0]."
        />
      </div>
    </Frame>
  ),

  /* 8 · ARAMA */
  () => (
    <Frame
      eyebrow="Kalıp 3 · yoklama listesi"
      title="Aramak: baştan başlar, bulana kadar tek tek bakarız"
      ask="En şanssız durumda kaç kutuya bakarız?"
    >
      <LinearSearch />
    </Frame>
  ),

  /* 9 · KOD · ARAMA */
  () => (
    <Frame
      eyebrow="Kod · önce tahmin et"
      title="Can sınıfta mı, kaçıncı indekste?"
      ask="aranan = &quot;Mert&quot; olsaydı ekrana ne çıkardı?"
    >
      <PredictRun
        file="arama.py"
        code={`sinif = ["Ali", "Ece", "Can", "Naz"]
aranan = "Can"
for i in range(len(sinif)):
    if sinif[i] == aranan:
        print("Bulundu, indeks:", i)`}
        question="Sondaki sayı 2 mi, 3 mü?"
        answer={["Bulundu, indeks: 2"]}
        note="range(len(sinif)) sırayla 0, 1, 2, 3 verir. Can üçüncü kişi ama indeksi 2."
      />
    </Frame>
  ),

  /* 10 · SÜZME */
  () => (
    <Frame
      eyebrow="Kalıp 4 · süzgeç"
      title="Süzmek: şarta uyanları ayrı bir listeye almak"
      ask="Geçme notu 100 olursa yeni liste nasıl görünür?"
    >
      <FilterSlider />
    </Frame>
  ),

  /* 11 · KOD · SÜZME */
  () => (
    <Frame
      eyebrow="Kod · önce tahmin et"
      title="Geçenleri boş bir listeye tek tek ekleyelim"
      ask="gecenler = [] satırını silersek ne olur?"
    >
      <PredictRun
        file="gecenler.py"
        code={`notlar = [40, 75, 90, 55]
gecenler = []
for n in notlar:
    if n >= 60:
        gecenler.append(n)
print(gecenler)`}
        question="Yeni listede hangi notlar olur, hangi sırayla?"
        answer={["[75, 90]"]}
        note="Boş listeyle başladık; şartı tutan her not append ile sona eklendi."
      />
    </Frame>
  ),

  /* 12 · SINIFTA DENEYELİM */
  () => (
    <Frame
      eyebrow="Sınıfta deneyelim · 10 dakika"
      title="Beş notluk listeyle mini not analizi yap"
      ask="Hangi adımda takıldın? Hangi kalıbı kullandın?"
    >
      <Activity
        file="analiz.py"
        code={`notlar = [55, 80, 45, 95, 70]
toplam = 0
for n in notlar:
    toplam = toplam + n
print(toplam / len(notlar))`}
        steps={[
          "Çalıştır: ortalama kaç çıktı?",
          "En yüksek notu bulan döngüyü ekle.",
          "60 ve üstü kaç not var? Say, yazdır.",
          "Geçen notları yeni bir listeye topla.",
        ]}
      />
    </Frame>
  ),

  /* 13 · KENDİNİ DENE */
  () => (
    <Frame
      eyebrow="Kendini dene"
      title="İki soru: sayma ve süzme"
      ask="İlk soruda 13 diyenler hangi kalıpla karıştırdı?"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Quiz
          q="Ekrana ne yazar?"
          code={`sayilar = [3, 8, 5]
adet = 0
for s in sayilar:
    if s > 4:
        adet = adet + 1
print(adet)`}
          options={["1", "2", "3", "13"]}
          correct={1}
          why="4'ten büyük iki sayı var: 8 ve 5. Sayaç iki kez arttı."
        />
        <Quiz
          q="Boş listeyle başlayıp şarta uyanları append ile eklemek hangi kalıptır?"
          options={["Sayma", "Arama", "Süzme", "En büyük"]}
          correct={2}
          why="Süzmede sonuç bir sayı değil, yeni bir listedir."
        />
      </div>
    </Frame>
  ),

  /* 14 · ÖZET + KÖPRÜ */
  () => (
    <Closing
      items={[
        {
          icon: Calculator,
          title: "Gez ve aklında tut",
          desc: "Toplam ve sayaç 0'dan başlar; her elemanda güncellenir.",
          accent: "#3776ab",
        },
        {
          icon: Trophy,
          title: "Kemer ilk elemanda başlar",
          desc: "Daha büyüğünü görünce değiştir. Başlangıcı 0 yapma, ilk elemanı al.",
          accent: "#ffd43b",
        },
        {
          icon: Filter,
          title: "Süzmek = boş liste + if + append",
          desc: "Şarta uyanlar yeni listeye girer; asıl liste değişmez.",
          accent: "#86efac",
        },
      ]}
      bridge="Buraya kadar sayılarla uğraştık. Sırada isimler ve mesajlar var: metinlerle çalışacağız."
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
          BVA 1101 · 11. Hafta · Listelerle Problem Çözme
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
