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
  FolderOpen,
  PenLine,
  Lock,
  Save,
  GraduationCap,
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

/** Slayt 3 — defter benzetmesi: üç adım sırayla açılır. */
const DEFTER_ADIMLARI: Array<{ icon: LucideIcon; baslik: string; defter: string; kod: string; renk: string }> = [
  { icon: FolderOpen, baslik: "1 · Aç", defter: "Defteri çantadan çıkar, sayfayı aç.", kod: `open("liste.txt", "r")`, renk: "#3776ab" },
  { icon: PenLine, baslik: "2 · Oku ya da yaz", defter: "Yazılanı oku ya da yeni satır yaz.", kod: `dosya.read()  /  dosya.write("...")`, renk: "#ffd43b" },
  { icon: Lock, baslik: "3 · Kapat", defter: "Defteri kapat, çantaya koy.", kod: `dosya.close()`, renk: "#4ec9b0" },
];

function DefterAdimlari() {
  const [adim, setAdim] = useState(0);
  return (
    <div className="mt-5">
      <div className="grid grid-cols-3 gap-4 min-h-[11rem]">
        {DEFTER_ADIMLARI.slice(0, adim + 1).map((a) => (
          <motion.div
            key={a.baslik}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="prog-card rounded-xl p-5"
            style={{ borderColor: `${a.renk}66` }}
          >
            <a.icon className="w-6 h-6 mb-2" style={{ color: a.renk }} />
            <div className="text-white font-semibold text-lg">{a.baslik}</div>
            <div className="text-sm text-gray-300 mt-1">{a.defter}</div>
            <div className="font-mono text-xs mt-3" style={{ color: a.renk }}>
              {a.kod}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-4">
        <StepNav step={adim} total={DEFTER_ADIMLARI.length} onStep={setAdim} nextLabel="Sonraki adım" />
      </div>
    </div>
  );
}

/** Slayt 4 — açma modu: çipi değiştir, dosyaya ne olduğunu gör. */
type Mod = "r" | "w" | "a";

const MODLAR: Record<Mod, { ad: string; islem: string; sonra: string[]; aciklama: string; renk: string }> = {
  r: {
    ad: "oku (read)",
    islem: `dosya.read()`,
    sonra: ["süt", "ekmek"],
    aciklama: "Dosyaya dokunmaz, yalnızca okur. Dosya yoksa hata verir.",
    renk: "#5fa8e0",
  },
  w: {
    ad: "yaz (write)",
    islem: `dosya.write("yumurta")`,
    sonra: ["yumurta"],
    aciklama: "Önce dosyanın içini siler, sonra baştan yazar. Eski satırlar gitti!",
    renk: "#f87171",
  },
  a: {
    ad: "ekle (append)",
    islem: `dosya.write("yumurta")`,
    sonra: ["süt", "ekmek", "yumurta"],
    aciklama: "Eskisine dokunmaz, yeni satırı sona ekler.",
    renk: "#4ec9b0",
  },
};

function DosyaKutusu({ baslik, satirlar, renk }: { baslik: string; satirlar: string[]; renk: string }) {
  return (
    <div className="prog-terminal rounded-lg p-4 border min-h-[8.5rem]" style={{ fontSize: 15, borderColor: renk }}>
      <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">{baslik}</div>
      {satirlar.map((s) => (
        <div key={s}>{s}</div>
      ))}
    </div>
  );
}

function ModDemo() {
  const [mod, setMod] = useState<Mod>("r");
  const m = MODLAR[mod];
  return (
    <div className="mt-5">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-gray-500 mr-2">Mod seç · tıkla</span>
        {(["r", "w", "a"] as Mod[]).map((k) => (
          <Chip key={k} active={mod === k} onClick={() => setMod(k)}>
            &quot;{k}&quot; · {MODLAR[k].ad}
          </Chip>
        ))}
      </div>
      <div className="grid grid-cols-[1fr_1.4fr_1fr] gap-4 items-start">
        <DosyaKutusu baslik="liste.txt · önce" satirlar={["süt", "ekmek"]} renk="#2d2d2d" />
        <div>
          <CodeView code={`with open("liste.txt", "${mod}") as dosya:\n    ${m.islem}`} active={0} />
          <motion.div
            key={mod}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 text-base text-gray-200"
          >
            {m.aciklama}
          </motion.div>
        </div>
        <DosyaKutusu baslik="liste.txt · sonra" satirlar={m.sonra} renk={m.renk} />
      </div>
    </div>
  );
}

/** Slayt 13 — dönem haritası: karta tıkla, hatırlatmayı gör. */
function HatirlaKart({
  baslik,
  hafta,
  hatirlatma,
  ornek,
  renk,
}: {
  baslik: string;
  hafta: string;
  hatirlatma: string;
  ornek: string;
  renk: string;
}) {
  const [acik, setAcik] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setAcik((a) => !a)}
      className="prog-card prog-card-hover rounded-xl p-5 text-left min-h-[8.5rem] cursor-pointer transition-all"
      style={{ borderColor: `${renk}66` }}
    >
      <span className="block text-[10px] font-mono uppercase tracking-widest" style={{ color: renk }}>
        {hafta}
      </span>
      <span className="block text-white font-semibold text-lg mt-1">{baslik}</span>
      {acik ? (
        <>
          <span className="block text-sm text-gray-300 mt-2">{hatirlatma}</span>
          <span className="block font-mono text-xs mt-2" style={{ color: renk }}>
            {ornek}
          </span>
        </>
      ) : (
        <span className="flex items-center gap-2 text-sm text-gray-500 mt-2">
          <Eye className="w-4 h-4" /> Önce sınıf anlatsın, sonra tıkla
        </span>
      )}
    </button>
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
        <Eyebrow>BVA 1101 · 15. Hafta</Eyebrow>
        <H1>
          <span className="prog-shimmer">Dosyalar</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Programın defteri: oku, yaz, ekle. Sonunda dönemi birlikte tekrar ediyoruz.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 mt-12 max-w-2xl mx-auto"
        >
          {[
            { name: "Oku", tag: `"r"`, color: "#3776ab" },
            { name: "Yaz", tag: `"w"`, color: "#ffd43b" },
            { name: "Ekle", tag: `"a"`, color: "#4ec9b0" },
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
      <H2>Programı kapatınca listen neden kayboluyor?</H2>
      <Sub className="mt-3">
        Dün yazdığın programa 20 arkadaşının adını tek tek girdin. Bugün programı yeniden açtın.
      </Sub>
      <div className="mt-5">
        <Reveal label="Liste duruyor mu? Tahmin et, sonra tıkla">
          Durmuyor, liste boş. Değişkenler bilgisayarın geçici belleğinde yaşar; program kapanınca
          silinir. <span className="text-white font-semibold">Tahtaya yazılan silinir, deftere yazılan
          kalır.</span> Dosya, programın defteridir.
        </Reveal>
      </div>
      <Ask>Telefonunu kapatıp açınca kaybolmayan neler var? Onlar nerede duruyor olabilir?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  3 · BENZETME: DEFTER  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Benzetme · adım adım</Eyebrow>
      <H2>Dosyayla çalışmak defterle çalışmak gibidir: aç, kullan, kapat</H2>
      <DefterAdimlari />
      <Ask>Defteri açmadan içine yazabilir misin? Peki kapatmayı unutursan?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  4 · MODLAR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kavram · oyna, gör</Eyebrow>
      <H2>open() iki şey sorar: hangi dosya, ne yapacaksın?</H2>
      <Sub className="mt-3">İkinci soru tek harfle cevaplanır. Harfi değiştir, dosyaya ne olduğuna bak.</Sub>
      <ModDemo />
      <Ask>Bu üç harften hangisi en tehlikeli? Neden?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  5 · WITH  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kavram · iki yazım</Eyebrow>
      <H2>with open: işin bitince dosyayı kendisi kapatır</H2>
      <Sub className="mt-3">
        Kendiliğinden kapanan kapı gibi: girintili kısım bitince Python dosyayı kapatır.
      </Sub>
      <div className="grid grid-cols-2 gap-4 mt-5 items-start">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#fca5a5] mb-2">Elle kapatma · unutulur</div>
          <CodeView code={`dosya = open("liste.txt", "r")\nprint(dosya.read())\ndosya.close()`} active={2} />
        </div>
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#86efac] mb-2">with · hep bunu kullan</div>
          <CodeView code={`with open("liste.txt", "r") as dosya:\n    print(dosya.read())`} active={0} />
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-4 prog-card-yellow rounded-xl px-5 py-3 text-base text-gray-200"
      >
        Dosyayı kapatmayı unutursan yazdıkların dosyaya geçmeyebilir.
      </motion.div>
      <Ask>Soldaki kodda close() satırını unutmak neden kolay?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  6 · OKUMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Canlı kod · önce tahmin et, sonra çalıştır</Eyebrow>
      <H2 className="mb-2">Okuma: dosyayı satır satır gez</H2>
      <Sub className="mb-4">alisveris.txt dosyasında alt alta üç satır var: süt, ekmek, yumurta.</Sub>
      <CodeEditor
        title="oku.py"
        tabs={["oku.py", "alisveris.txt"]}
        activeTab="oku.py"
        code={`with open("alisveris.txt", "r", encoding="utf-8") as dosya:
    for satir in dosya:
        print(satir.strip())`}
        setup={`with open("alisveris.txt", "w", encoding="utf-8") as _f:
    _f.write("süt\\nekmek\\nyumurta\\n")`}
      />
      <Ask>
        encoding=&quot;utf-8&quot; Türkçe harfler bozulmasın diye var. strip() satır sonundaki görünmez
        alt satır işaretini siler; silmesek çıktı nasıl görünürdü?
      </Ask>
    </SlideShell>
  ),

  /* ─────────────────  7 · YAZMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Canlı kod · önce tahmin et, sonra çalıştır</Eyebrow>
      <H2 className="mb-2">Yazma: &quot;w&quot; ile dosyayı baştan yaz</H2>
      <Sub className="mb-4">Önce yazıyoruz, sonra aynı dosyayı açıp okuyoruz. Satır sonuna \n koymak bize düşer.</Sub>
      <CodeEditor
        title="yaz.py"
        tabs={["yaz.py"]}
        activeTab="yaz.py"
        code={`with open("gunluk.txt", "w", encoding="utf-8") as dosya:
    dosya.write("Bugün dosyaları öğrendim.\\n")

with open("gunluk.txt", "r", encoding="utf-8") as dosya:
    print(dosya.read())`}
      />
      <Ask>Çalıştır&apos;a iki kez basarsak dosyada kaç satır olur? Deneyelim.</Ask>
    </SlideShell>
  ),

  /* ─────────────────  8 · EKLEME  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Canlı kod · önce tahmin et, sonra çalıştır</Eyebrow>
      <H2 className="mb-2">Ekleme: &quot;a&quot; ile sona satır ekle</H2>
      <Sub className="mb-4">gunluk.txt içinde şu an tek satır var: Pazartesi: dosyaları öğrendim.</Sub>
      <CodeEditor
        title="ekle.py"
        tabs={["ekle.py", "gunluk.txt"]}
        activeTab="ekle.py"
        code={`with open("gunluk.txt", "a", encoding="utf-8") as dosya:
    dosya.write("Salı: tekrar yaptım.\\n")

with open("gunluk.txt", "r", encoding="utf-8") as dosya:
    print(dosya.read())`}
        setup={`with open("gunluk.txt", "w", encoding="utf-8") as _f:
    _f.write("Pazartesi: dosyaları öğrendim.\\n")`}
      />
      <Ask>İlk satırdaki &quot;a&quot; yerine &quot;w&quot; yazarsak çıktıda ne kalır? Değiştirip çalıştıralım.</Ask>
    </SlideShell>
  ),

  /* ─────────────────  9 · MİNİ SINAV  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Mini sınav · şıkka tıkla</Eyebrow>
      <H2>İçi dolu bir dosyayı &quot;w&quot; ile açarsan ne olur?</H2>
      <div className="mt-6 max-w-2xl">
        <Quiz
          question="Önce sınıfça oylayın, sonra tıklayın."
          options={[
            "Yeni yazdıkların sona eklenir",
            "Eski içerik silinir, dosya baştan yazılır",
            "Python hata verir",
            "Dosyanın bir kopyası oluşur",
          ]}
          correct={1}
          why="“w” önce dosyayı boşaltır. Eskisini korumak istiyorsan “a” kullanırsın."
        />
      </div>
      <Ask>Her gün yeni satır eklenen bir günlük programında hangi modu seçerdin?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  10 · SIK HATA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Dikkat · önce tahmin et</Eyebrow>
      <H2>Olmayan dosyayı okumaya çalışırsan Python hata verir</H2>
      <Sub className="mt-3">Klasörde notlarim.txt diye bir dosya yok. Yine de şu kodu çalıştırdık:</Sub>
      <div className="grid grid-cols-2 gap-4 mt-5 items-start">
        <CodeView code={`with open("notlarim.txt", "r") as dosya:\n    print(dosya.read())`} active={0} />
        <Reveal label="Ne olur? Tahmin et, sonra tıkla">
          <span className="text-[#fca5a5] font-semibold">FileNotFoundError</span> (dosya bulunamadı).
          &quot;w&quot; ve &quot;a&quot; olmayan dosyayı kendisi oluşturur; &quot;r&quot; oluşturmaz.
        </Reveal>
      </div>
      <Ask>Bu hatayı görünce ilk neye bakarsın? (Dosya adı doğru mu, dosya programla aynı klasörde mi?)</Ask>
    </SlideShell>
  ),

  /* ─────────────────  11 · SINIFTA DENEYELİM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sınıfta deneyelim · 5–10 dakika</Eyebrow>
      <H2 className="mb-2">Arkadaş listeni dosyaya yaz, sonra geri oku</H2>
      <Sub className="mb-4">Yazma kısmı hazır. Sen dosyayı &quot;r&quot; ile aç, her satırı ekrana yazdır.</Sub>
      <CodeEditor
        title="arkadaslar.py"
        tabs={["arkadaslar.py"]}
        activeTab="arkadaslar.py"
        mode="exercise"
        code={`adlar = ["Elif", "Mert", "Zeynep"]

with open("arkadaslar.txt", "w", encoding="utf-8") as dosya:
    for ad in adlar:
        dosya.write(ad + "\\n")

# Buradan sonrasını sen yaz`}
        expectedOutput={`Elif\nMert\nZeynep`}
        hints={[
          "with open(\"arkadaslar.txt\", \"r\", encoding=\"utf-8\") as dosya: satırıyla başla.",
          "İçine for satir in dosya: yaz, onun altında print(satir.strip()) olsun.",
        ]}
        solution={`adlar = ["Elif", "Mert", "Zeynep"]

with open("arkadaslar.txt", "w", encoding="utf-8") as dosya:
    for ad in adlar:
        dosya.write(ad + "\\n")

with open("arkadaslar.txt", "r", encoding="utf-8") as dosya:
    for satir in dosya:
        print(satir.strip())`}
      />
      <Ask>Listeye dördüncü bir ad eklersek kodun başka bir yerini değiştirmemiz gerekir mi?</Ask>
    </SlideShell>
  ),

  /* ─────────────────  12 · AKLINDA KALSIN  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Aklında kalsın · 3 şey</Eyebrow>
      <H2>Dosyalardan cebine koyacağın üç şey</H2>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <InfoCard
          icon={Save}
          title="1 · Dosya kalıcıdır"
          desc="Değişken program kapanınca silinir; dosyaya yazdığın kalır."
          accent="#3776ab"
        />
        <InfoCard
          icon={PenLine}
          title="2 · Üç harf, üç iş"
          desc="r okur, w silip baştan yazar, a sona ekler."
          accent="#ffd43b"
        />
        <InfoCard
          icon={Lock}
          title="3 · Hep with open"
          desc="Girinti bitince dosya kendiliğinden kapanır."
          accent="#4ec9b0"
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 prog-card-yellow rounded-xl px-5 py-4 text-base text-gray-200"
      >
        <span className="text-[#ffd43b] font-semibold">Şimdi:</span> son konuyu da bitirdik. Kalan
        sürede dönemi dört başlıkta toparlayıp kendimizi deniyoruz.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  13 · DÖNEM HARİTASI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Dönem tekrarı · karta tıkla</Eyebrow>
      <H2>Dönem haritası: on beş hafta, dört büyük fikir</H2>
      <div className="grid grid-cols-2 gap-4 mt-5">
        <HatirlaKart
          hafta="Veriyi sakla"
          baslik="Değişken, liste, metin"
          hatirlatma="Değişken tek değeri, liste birçok değeri tutar; sıra numarası 0'dan başlar."
          ornek={`notlar = [70, 45, 90]  →  notlar[0] 70'tir`}
          renk="#3776ab"
        />
        <HatirlaKart
          hafta="Karar ver"
          baslik="Koşul: if, elif, else"
          hatirlatma="Koşul doğruysa bir yol, değilse başka yol çalışır."
          ornek={`if puan >= 50: print("Geçti")`}
          renk="#ffd43b"
        />
        <HatirlaKart
          hafta="Tekrar et"
          baslik="Döngü: for, while"
          hatirlatma="Aynı işi elle yazmak yerine Python'a tekrar ettiririz."
          ornek={`for i in range(3):  →  0, 1, 2`}
          renk="#4ec9b0"
        />
        <HatirlaKart
          hafta="Düzenle ve sakla"
          baslik="Fonksiyon ve dosya"
          hatirlatma="Fonksiyon kodu bir kez yazdırır; dosya veriyi kalıcı yapar."
          ornek={`def ... return   ·   with open(...)`}
          renk="#f472b6"
        />
      </div>
      <Ask>Bu dört başlıktan en çok hangisinde zorlandın? El kaldırarak oylayalım.</Ask>
    </SlideShell>
  ),

  /* ─────────────────  14 · KENDİNİ DENE 1  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kendini dene · döngü ve liste</Eyebrow>
      <H2>Dönem tekrarı: ilk iki soru</H2>
      <div className="grid grid-cols-2 gap-6 mt-6 items-start">
        <Quiz
          question={
            <>
              <span className="font-mono text-[#9cdcfe]">for i in range(3): print(i)</span> ekrana
              hangi sayıları yazar?
            </>
          }
          options={["1, 2, 3", "0, 1, 2", "0, 1, 2, 3", "Yalnızca 3"]}
          correct={1}
          why="range(3) saymaya 0'dan başlar ve 3'e gelmeden durur."
        />
        <Quiz
          question={
            <>
              <span className="font-mono text-[#9cdcfe]">sayilar = [4, 9, 2]</span> ise{" "}
              <span className="font-mono text-[#9cdcfe]">sayilar[1]</span> kaçtır?
            </>
          }
          options={["4", "9", "2", "Hata verir"]}
          correct={1}
          why="Sıra numarası 0'dan başlar: sayilar[0] 4, sayilar[1] 9'dur."
        />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  15 · KENDİNİ DENE 2  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kendini dene · koşul ve dosya</Eyebrow>
      <H2>Dönem tekrarı: son iki soru</H2>
      <div className="grid grid-cols-2 gap-6 mt-6 items-start">
        <div>
          <CodeView code={`puan = 45\nif puan >= 50:\n    print("Geçti")\nelse:\n    print("Kaldı")`} />
          <div className="mt-3">
            <Quiz
              question="Bu kod ekrana ne yazar?"
              options={["Geçti", "Kaldı", "45", "Hiçbir şey"]}
              correct={1}
              why="45, 50'den küçük; koşul yanlış olduğu için else kısmı çalışır."
            />
          </div>
        </div>
        <Quiz
          question="Program kapansa da kaybolmasın istediğin veriyi nereye yazarsın?"
          options={["Bir değişkene", "Bir listeye", "Bir dosyaya", "print ile ekrana"]}
          correct={2}
          why="Değişken ve liste program kapanınca silinir; dosya kalır."
        />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  16 · KAPANIŞ  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-20 h-20 rounded-2xl items-center justify-center mb-6 prog-glow-blue"
        >
          <GraduationCap className="w-10 h-10 text-white" />
        </motion.div>
        <div>
          <Eyebrow>Dönem bitti</Eyebrow>
        </div>
        <H2>Artık küçük bir programı baştan sona yazabilirsin</H2>
        <Sub className="mt-4 max-w-2xl mx-auto">
          Veriyi al, karar ver, tekrar et, fonksiyona böl, dosyaya kaydet. Bir dönemde öğrendiğimiz
          yol bu.
        </Sub>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 prog-card-yellow rounded-xl px-5 py-4 text-base text-gray-200 max-w-2xl mx-auto"
        >
          <span className="text-[#ffd43b] font-semibold">Sırada final var:</span> 9–15. hafta
          sunumlarındaki &ldquo;Kendini dene&rdquo; sorularını ve canlı kodları bir kez daha çöz.
        </motion.div>
      </div>
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
          BVA 1101 · 15. Hafta · Dosyalar ve Dönem Tekrarı
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
