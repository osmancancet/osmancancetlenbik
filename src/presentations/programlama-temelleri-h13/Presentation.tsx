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
  ArrowRight,
  Coffee,
  ShoppingCart,
  Percent,
  Receipt,
  PenLine,
  PhoneCall,
  CornerDownLeft,
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

/** Slayt 3 — içecek otomatı: girdiyi değiştir, çıktıyı gör. */
function OtomatDemo() {
  const [icecek, setIcecek] = useState("çay");
  const [seker, setSeker] = useState(1);
  const bardak = `${seker === 0 ? "şekersiz" : `${seker} şekerli`} ${icecek}`;
  return (
    <div className="mt-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono uppercase tracking-widest text-gray-500 w-20">İçecek</span>
        {["çay", "kahve", "salep"].map((i) => (
          <Chip key={i} active={icecek === i} onClick={() => setIcecek(i)}>
            {i}
          </Chip>
        ))}
        <span className="text-xs font-mono uppercase tracking-widest text-gray-500 w-16 ml-6">Şeker</span>
        {[0, 1, 2].map((s) => (
          <Chip key={s} active={seker === s} onClick={() => setSeker(s)}>
            {s}
          </Chip>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-3 mt-5">
        <div className="prog-card rounded-xl p-4 text-center">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#5fa8e0] mb-1">Girdi</div>
          <div className="text-white font-semibold">{icecek} · {seker} şeker</div>
          <div className="text-xs text-gray-500 mt-1">sen verirsin</div>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-500" />
        <div className="prog-card-yellow rounded-xl p-4 text-center">
          <Coffee className="w-6 h-6 text-[#ffd43b] mx-auto mb-1" />
          <div className="font-mono text-sm text-[#ffd43b]">icecek_hazirla</div>
          <div className="text-xs text-gray-500 mt-1">içini bilmen gerekmez</div>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-500" />
        <div className="prog-card rounded-xl p-4 text-center" style={{ borderColor: "#4ec9b0" }}>
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#4ec9b0] mb-1">Çıktı</div>
          <motion.div
            key={bardak}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white font-semibold"
          >
            {bardak}
          </motion.div>
          <div className="text-xs text-gray-500 mt-1">sana geri gelir</div>
        </div>
      </div>

      <div className="mt-4">
        <CodeView code={`bardak = icecek_hazirla("${icecek}", ${seker})`} />
      </div>
    </div>
  );
}

/** Slayt 4 — tanım ve çağrı: Python hangi satırda, ekranda ne var? */
const IZ_KODU = `def selamla():
    print("Merhaba!")

selamla()
selamla()
print("Bitti")`;

const IZ_ADIMLARI: Array<{ satir: number; ekran: string[]; not: string }> = [
  { satir: 0, ekran: [], not: "Python tarifi okur ve aklına yazar. Henüz hiçbir şey çalışmadı." },
  { satir: 3, ekran: [], not: "selamla() yazdık: Python tarife gider." },
  { satir: 1, ekran: ["Merhaba!"], not: "Tarifin içi çalışır, sonra kaldığı yere döner." },
  { satir: 4, ekran: ["Merhaba!"], not: "İkinci çağrı: aynı tarif bir daha kullanılır." },
  { satir: 1, ekran: ["Merhaba!", "Merhaba!"], not: "Kodu yeniden yazmadık, yalnızca adını söyledik." },
  { satir: 5, ekran: ["Merhaba!", "Merhaba!", "Bitti"], not: "Bir kez yazdık, iki kez kullandık." },
];

function TanimCagriIzi() {
  const [adim, setAdim] = useState(0);
  const a = IZ_ADIMLARI[adim];
  return (
    <div className="mt-5">
      <div className="grid grid-cols-2 gap-4">
        <CodeView code={IZ_KODU} active={a.satir} />
        <div className="prog-terminal rounded-lg p-4 border border-[#2d2d2d]" style={{ fontSize: 15 }}>
          <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Ekran</div>
          {a.ekran.length === 0 ? (
            <div className="text-gray-600">(henüz boş)</div>
          ) : (
            a.ekran.map((s, i) => <div key={i}>{s}</div>)
          )}
        </div>
      </div>
      <div className="mt-3 min-h-[1.75rem] text-base text-gray-200">{a.not}</div>
      <div className="mt-3">
        <StepNav step={adim} total={IZ_ADIMLARI.length} onStep={setAdim} />
      </div>
    </div>
  );
}

/** Slayt 5 — parametre: ismi değiştir, çıktı değişsin. */
function ParametreDemo() {
  const [ad, setAd] = useState("Elif");
  return (
    <div className="mt-5">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-gray-500 mr-2">
          Kime selam verelim? · tıkla
        </span>
        {["Elif", "Mert", "Zeynep"].map((n) => (
          <Chip key={n} active={ad === n} onClick={() => setAd(n)}>
            {n}
          </Chip>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <CodeView code={`def selamla(ad):\n    print("Merhaba", ad)\n\nselamla("${ad}")`} active={3} />
        <div className="prog-terminal rounded-lg p-4 border border-[#2d2d2d]" style={{ fontSize: 15 }}>
          <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Ekran</div>
          <motion.div key={ad} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Merhaba {ad}
          </motion.div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="prog-card rounded-xl px-4 py-3 text-sm text-gray-300">
          <span className="text-white font-semibold">Parametre:</span> tanımdaki boş kutu. Burada{" "}
          <span className="font-mono text-[#9cdcfe]">ad</span>.
        </div>
        <div className="prog-card rounded-xl px-4 py-3 text-sm text-gray-300">
          <span className="text-white font-semibold">Argüman:</span> çağırırken kutuya koyduğun değer. Burada{" "}
          <span className="font-mono text-[#ce9178]">&quot;{ad}&quot;</span>.
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
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 1101 · 13. Hafta</Eyebrow>
        <H1>
          <span className="prog-shimmer">Fonksiyonlar</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bir kez yaz, istediğin kadar kullan.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 mt-12 max-w-2xl mx-auto"
        >
          {[
            { name: "Tarifi yaz", tag: "def", color: "#3776ab" },
            { name: "Adıyla çağır", tag: "( )", color: "#ffd43b" },
            { name: "Sonucu geri al", tag: "return", color: "#4ec9b0" },
          ].map((l) => (
            <div key={l.name} className="prog-card rounded-xl p-4" style={{ borderColor: `${l.color}55` }}>
              <div className="font-mono font-bold text-sm mb-1" style={{ color: l.color }}>
                {l.tag}
              </div>
              <div className="text-white text-sm">{l.name}</div>
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

  /* ─────────────────  2 · SORUN  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sorun · önce tahmin et</Eyebrow>
      <H2>Aynı kodu üçüncü kez yazıyorsan bir şey yanlış gidiyor</H2>
      <Sub className="mt-3">
        Üç öğrencinin ortalamasını hesapladık. Sonra haber geldi: ağırlıklar 0.4 ve 0.6 değil, 0.5 ve 0.5 olacak.
      </Sub>
      <div className="mt-5">
        <CodeView
          code={`print(60 * 0.4 + 80 * 0.6)\nprint(40 * 0.4 + 90 * 0.6)\nprint(75 * 0.4 + 55 * 0.6)`}
        />
      </div>
      <div className="mt-4">
        <Reveal label="Kaç satırı düzeltmen gerekir? Tahmin et, sonra tıkla">
          Üç satırın üçünü de. Hesap programın 30 yerinde geçseydi 30 yeri düzeltirdin; birini unutursan
          hata orada kalır. <span className="text-white font-semibold">Fonksiyonla hesabı tek yerde
          yazarsın, tek yerde düzeltirsin.</span>
        </Reveal>
      </div>
      <Ask>Kaçınız bu dönem aynı kodu kopyalayıp başka yere yapıştırdı? El kaldırın.</Ask>
    </SlideShell>
  ),

  /* ─────────────────  3 · BENZETME: OTOMAT  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Benzetme · oyna, gör</Eyebrow>
      <H2>Fonksiyon bir içecek otomatı gibidir</H2>
      <Sub className="mt-3">
        Seçimini verirsin, makine işini yapar, bardağı sana geri verir. Seçimi değiştir, çıktıya bak.
      </Sub>
      <OtomatDemo />
      <Ask>Çay almak için otomatın içinde ne olduğunu bilmen gerekiyor mu?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  4 · TANIM VE ÇAĞRI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kavram · adım adım izle</Eyebrow>
      <H2>def ile tarifi yazarsın, adıyla çağırırsın</H2>
      <Sub className="mt-3">
        Tarif defterde durur; yemek ancak pişirince olur. Fonksiyon da çağırınca çalışır.
      </Sub>
      <TanimCagriIzi />
      <Ask>Son üç satırı silsek ekranda ne görürdük?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  5 · PARAMETRE  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kavram · oyna, gör</Eyebrow>
      <H2>Parametre, fonksiyona verdiğin malzemedir</H2>
      <ParametreDemo />
      <Ask>selamla() yazıp parantezin içini boş bırakırsak ne olur?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  6 · RETURN  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kavram · önce tahmin et</Eyebrow>
      <H2>return, sonucu sana geri verir</H2>
      <Sub className="mt-3">
        Otomat bardağı eline verir; sen onu içersin ya da arkadaşına götürürsün. return de böyledir.
      </Sub>
      <div className="grid grid-cols-2 gap-4 mt-5 items-start">
        <CodeView code={`def topla(a, b):\n    return a + b\n\nsonuc = topla(3, 4)\nprint(sonuc * 2)`} />
        <div className="space-y-3">
          <Reveal label="Ekrana ne yazar? Tahmin et, sonra tıkla">
            <span className="text-white font-semibold">14.</span> topla(3, 4) yerine 7 gelir, sonuc
            kutusuna konur, sonra 2 ile çarpılır.
          </Reveal>
          <div className="prog-card rounded-xl px-4 py-3 text-sm text-gray-300">
            <span className="text-white font-semibold">print</span> yalnızca ekrana yazar.{" "}
            <span className="text-white font-semibold">return</span> değeri sana verir; saklarsın, yeniden
            kullanırsın.
          </div>
        </div>
      </div>
      <Ask>Otomat bardağı vermek yerine yalnızca ekranında &ldquo;çay hazır&rdquo; yazsaydı ne olurdu?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  7 · MİNİ SINAV  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Mini sınav · şıkka tıkla</Eyebrow>
      <H2>Bu kod ekrana ne yazar?</H2>
      <div className="grid grid-cols-2 gap-5 mt-6 items-start">
        <CodeView code={`def iki_kat(sayi):\n    return sayi * 2\n\nprint(iki_kat(5) + 1)`} />
        <Quiz
          question="Önce sınıfça oylayın, sonra tıklayın."
          options={["10", "11", "12", "Hata verir"]}
          correct={1}
          why="iki_kat(5) yerine 10 gelir; 10 + 1 = 11."
        />
      </div>
      <Ask>return yerine print yazsaydık + 1 işlemi yapılabilir miydi?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  8 · CANLI KOD  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Canlı kod · önce tahmin et, sonra çalıştır</Eyebrow>
      <H2 className="mb-4">Not ortalaması artık tek bir tarif</H2>
      <CodeEditor
        title="ortalama.py"
        tabs={["ortalama.py"]}
        activeTab="ortalama.py"
        code={`def ortalama(vize, final):
    sonuc = vize * 0.4 + final * 0.6
    return sonuc

print(ortalama(60, 80))
print(ortalama(40, 90))`}
      />
      <Ask>Ağırlıkları 0.5 ve 0.5 yapmak için şimdi kaç satırı değiştiririz? Değiştirip çalıştıralım.</Ask>
    </SlideShell>
  ),

  /* ─────────────────  9 · YEREL DEĞİŞKEN  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Dikkat · önce tahmin et</Eyebrow>
      <H2>Fonksiyonun içindeki değişken dışarıdan görünmez</H2>
      <Sub className="mt-3">
        Otomatın içindeki bardağı dışarıdan alamazsın; ancak makine verirse eline geçer.
      </Sub>
      <div className="grid grid-cols-2 gap-4 mt-5 items-start">
        <CodeView
          code={`def ortalama(vize, final):\n    sonuc = vize * 0.4 + final * 0.6\n    return sonuc\n\nortalama(60, 80)\nprint(sonuc)`}
          active={5}
        />
        <Reveal label="Son satır ne yapar? Tahmin et, sonra tıkla">
          <span className="text-[#fca5a5] font-semibold">Hata verir: NameError</span> (böyle bir ad yok).
          sonuc fonksiyonun içinde doğdu, fonksiyon bitince silindi. Doğrusu:{" "}
          <span className="font-mono text-[#9cdcfe]">notum = ortalama(60, 80)</span> yazıp{" "}
          <span className="font-mono text-[#9cdcfe]">print(notum)</span> demek.
        </Reveal>
      </div>
      <Ask>Fonksiyonun bulduğu sonucu dışarıda kullanmak için hangi iki şeye ihtiyacımız var?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  10 · PARÇALARA BÖL  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kullanım · kantin fişi</Eyebrow>
      <H2>Büyük işi küçük tariflere böl</H2>
      <Sub className="mt-3">
        Kantinde fiş kesmek üç küçük iştir. Her işe bir fonksiyon, her fonksiyona işini anlatan bir ad.
      </Sub>
      <div className="grid grid-cols-3 gap-4 mt-5">
        <InfoCard icon={ShoppingCart} title="ara_toplam(sepet)" desc="Sepetteki fiyatları toplar." accent="#3776ab" />
        <InfoCard icon={Percent} title="indirim_uygula(tutar)" desc="Öğrenci indirimini düşer." accent="#ffd43b" />
        <InfoCard icon={Receipt} title="fis_yaz(tutar)" desc="Sonucu ekrana yazar." accent="#4ec9b0" />
      </div>
      <div className="mt-4">
        <CodeView code={`tutar = ara_toplam(sepet)\ntutar = indirim_uygula(tutar)\nfis_yaz(tutar)`} />
      </div>
      <Ask>İndirim oranı değişirse bu üç fonksiyondan hangisini açıp düzeltirsin?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  11 · SINIFTA DENEYELİM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sınıfta deneyelim · 5–10 dakika</Eyebrow>
      <H2 className="mb-2">gecti_mi fonksiyonunu sen tamamla</H2>
      <Sub className="mb-4">
        Puan 50 ve üstüyse &ldquo;Geçti&rdquo;, değilse &ldquo;Kaldı&rdquo; dönsün. Yaz, Çalıştır&apos;a bas.
      </Sub>
      <CodeEditor
        title="gecti_mi.py"
        tabs={["gecti_mi.py"]}
        activeTab="gecti_mi.py"
        mode="exercise"
        code={`def gecti_mi(puan):
    return "?"

print(gecti_mi(70))
print(gecti_mi(35))`}
        expectedOutput={`Geçti\nKaldı`}
        hints={[
          "Fonksiyonun içine bir if yaz: if puan >= 50:",
          "if'in altında return \"Geçti\", else'in altında return \"Kaldı\" olsun.",
        ]}
        solution={`def gecti_mi(puan):
    if puan >= 50:
        return "Geçti"
    else:
        return "Kaldı"

print(gecti_mi(70))
print(gecti_mi(35))`}
      />
      <Ask>Geçme sınırı 60 olursa kaç yeri değiştirmen gerekir?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  12 · KENDİNİ DENE  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kendini dene · iki soru</Eyebrow>
      <H2>Bugünü iki soruda toplayalım</H2>
      <div className="grid grid-cols-2 gap-6 mt-6 items-start">
        <Quiz
          question="Bir fonksiyonu tanımladın ama hiç çağırmadın. Ne olur?"
          options={["Bir kez çalışır", "Hiç çalışmaz", "Hata verir", "Durmadan çalışır"]}
          correct={1}
          why="Tanım yalnızca tarifi yazar; çalışması için adını yazıp çağırman gerekir."
        />
        <Quiz
          question="Fonksiyonun bulduğu sonucu sonra kullanmak istiyorsun. Hangisi gerekir?"
          options={["print", "return", "input", "for"]}
          correct={1}
          why="return değeri geri verir; print yalnızca ekrana yazar."
        />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  13 · AKLINDA KALSIN  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Aklında kalsın · 3 şey</Eyebrow>
      <H2>Bugünden cebine koyacağın üç şey</H2>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <InfoCard
          icon={PenLine}
          title="1 · def tarifi yazar"
          desc="Tanımlamak çalıştırmak değildir; fonksiyon çağırınca çalışır."
          accent="#3776ab"
        />
        <InfoCard
          icon={PhoneCall}
          title="2 · Parantez malzemeyi taşır"
          desc="Çağırırken verdiğin değer, tanımdaki kutuya yerleşir."
          accent="#ffd43b"
        />
        <InfoCard
          icon={CornerDownLeft}
          title="3 · return geri verir"
          desc="print ekrana yazar, return sonucu sana verir."
          accent="#4ec9b0"
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 prog-card-yellow rounded-xl px-5 py-4 text-base text-gray-200"
      >
        <span className="text-[#ffd43b] font-semibold">Gelecek hafta:</span> bir listede aradığımızı
        bulmayı ve listeyi sıraya dizmeyi öğreneceğiz; bugün yazdığımız fonksiyonlar işimize yarayacak.
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
          BVA 1101 · 13. Hafta · Fonksiyonlar
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
