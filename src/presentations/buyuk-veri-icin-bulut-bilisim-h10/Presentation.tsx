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
  Cpu,
  Database,
  Layers,
  FileText,
  Split,
  Shuffle,
  Combine,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  X,
  Sparkles,
  Zap,
  Lightbulb,
  HardDrive,
  Network,
  Server,
  Code,
  Terminal,
  ListChecks,
  Workflow,
  GitMerge,
  Hash,
  Boxes,
  AlertTriangle,
  Brain,
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

function SectionDivider({
  num,
  total,
  title,
  subtitle,
  bgGradient,
  shadow,
  icon,
}: {
  num: string;
  total: string;
  title: string;
  subtitle: string;
  bgGradient: string;
  shadow: string;
  icon: ReactNode;
}) {
  return (
    <SlideShell bgPattern={false}>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex w-32 h-32 rounded-3xl items-center justify-center mb-8 bvbb-pulse"
          style={{
            background: bgGradient,
            boxShadow: shadow,
          }}
        >
          {icon}
        </motion.div>
        <Eyebrow>
          Bölüm {num} / {total}
        </Eyebrow>
        <H1>{title}</H1>
        <Sub className="mt-6 max-w-2xl mx-auto">{subtitle}</Sub>
      </div>
    </SlideShell>
  );
}

/* ============================================================
   TOPIC-SPECIFIC MOCKUPS
   ============================================================ */

/* Kod / terminal penceresi (macOS chrome) */
function CodeWindow({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bvbb-window-chrome w-full"
    >
      <div className="bvbb-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-mono flex-1 max-w-md mx-auto text-center justify-center"
          style={{ background: "#0d1117", color: "#94a3b8" }}
        >
          <Terminal className="w-3 h-3" />
          <span>{title}</span>
        </div>
      </div>
      <div className="bvbb-code-body">{children}</div>
    </motion.div>
  );
}

/* WordCount veri akışı: input -> split -> map -> shuffle -> reduce -> output */
function WordCountDataflow() {
  const cols = [
    {
      stage: "Girdi (split)",
      badge: "INPUT",
      color: "#94a3b8",
      rows: ["the cat sat", "the dog ran", "the cat ran"],
    },
    {
      stage: "Map çıktısı",
      badge: "MAP",
      color: "#22c55e",
      rows: ["the,1  cat,1  sat,1", "the,1  dog,1  ran,1", "the,1  cat,1  ran,1"],
    },
    {
      stage: "Shuffle & Sort",
      badge: "SHUFFLE",
      color: "#f59e0b",
      rows: ["cat → [1,1]", "the → [1,1,1]", "ran → [1,1]  dog → [1]  sat → [1]"],
    },
    {
      stage: "Reduce çıktısı",
      badge: "REDUCE",
      color: "#2563eb",
      rows: ["cat 2", "the 3", "ran 2   dog 1   sat 1"],
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-4 gap-3"
    >
      {cols.map((c, i) => (
        <motion.div
          key={c.stage}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 + i * 0.15 }}
          className="bvbb-card rounded-xl p-4 relative"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold text-white">{c.stage}</span>
            <span
              className="text-[9px] font-mono px-1.5 py-0.5 rounded"
              style={{ background: `${c.color}22`, color: c.color }}
            >
              {c.badge}
            </span>
          </div>
          <div className="space-y-2">
            {c.rows.map((r, ri) => (
              <div
                key={ri}
                className="font-mono text-[10.5px] rounded px-2 py-1.5 text-gray-300"
                style={{ background: `${c.color}10`, border: `1px solid ${c.color}33` }}
              >
                {r}
              </div>
            ))}
          </div>
          {i < cols.length - 1 && (
            <ArrowRight className="hidden md:block absolute top-1/2 -right-3.5 w-5 h-5 text-gray-600 -translate-y-1/2 z-10" />
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

/* YARN üzerinde bir MapReduce job'ın çalışma topolojisi */
function YarnJobDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bvbb-card rounded-xl p-6"
    >
      <svg viewBox="0 0 720 300" className="w-full h-72">
        <defs>
          <marker id="arrowH" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#64748b" />
          </marker>
        </defs>

        {/* Client */}
        <g>
          <rect x="20" y="125" width="110" height="50" rx="8" fill="#1e293b" stroke="#475569" />
          <text x="75" y="148" textAnchor="middle" fontSize="12" fill="#e2e8f0" fontWeight="700">Client</text>
          <text x="75" y="164" textAnchor="middle" fontSize="9" fill="#94a3b8">job gönderir</text>
        </g>

        {/* ResourceManager */}
        <g>
          <rect x="200" y="115" width="150" height="70" rx="8" fill="#1e3a8a" stroke="#3b82f6" />
          <text x="275" y="142" textAnchor="middle" fontSize="12" fill="#dbeafe" fontWeight="700">ResourceManager</text>
          <text x="275" y="160" textAnchor="middle" fontSize="9" fill="#93c5fd">YARN · küme planlayıcı</text>
        </g>

        {/* NodeManager 1 */}
        <g>
          <rect x="430" y="30" width="260" height="100" rx="8" fill="#0f172a" stroke="#334155" />
          <text x="445" y="50" fontSize="10" fill="#cbd5e1" fontWeight="700">NodeManager · worker-01</text>
          <rect x="445" y="60" width="110" height="26" rx="4" fill="#14532d" stroke="#22c55e" />
          <text x="500" y="77" textAnchor="middle" fontSize="9.5" fill="#86efac">Map Task</text>
          <rect x="565" y="60" width="110" height="26" rx="4" fill="#1e3a5f" stroke="#3b82f6" />
          <text x="620" y="77" textAnchor="middle" fontSize="9.5" fill="#93c5fd">AppMaster</text>
          <rect x="445" y="94" width="230" height="24" rx="4" fill="#1f2937" stroke="#475569" />
          <text x="560" y="110" textAnchor="middle" fontSize="9" fill="#94a3b8">HDFS DataNode (yerel blok)</text>
        </g>

        {/* NodeManager 2 */}
        <g>
          <rect x="430" y="170" width="260" height="100" rx="8" fill="#0f172a" stroke="#334155" />
          <text x="445" y="190" fontSize="10" fill="#cbd5e1" fontWeight="700">NodeManager · worker-02</text>
          <rect x="445" y="200" width="110" height="26" rx="4" fill="#14532d" stroke="#22c55e" />
          <text x="500" y="217" textAnchor="middle" fontSize="9.5" fill="#86efac">Map Task</text>
          <rect x="565" y="200" width="110" height="26" rx="4" fill="#3b2f12" stroke="#f59e0b" />
          <text x="620" y="217" textAnchor="middle" fontSize="9.5" fill="#fcd34d">Reduce Task</text>
          <rect x="445" y="234" width="230" height="24" rx="4" fill="#1f2937" stroke="#475569" />
          <text x="560" y="250" textAnchor="middle" fontSize="9" fill="#94a3b8">HDFS DataNode (yerel blok)</text>
        </g>

        {/* Bağlantılar */}
        <line x1="130" y1="150" x2="198" y2="150" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowH)" />
        <line x1="350" y1="135" x2="428" y2="80" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowH)" />
        <line x1="350" y1="165" x2="428" y2="220" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowH)" />
      </svg>
      <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2 text-[10px]">
        <div className="bvbb-stage-map rounded px-2 py-1 text-center">Map task → veriye yakın çalışır</div>
        <div className="bvbb-stage-shuffle rounded px-2 py-1 text-center">Ara veri ağ üzerinden taşınır</div>
        <div className="bvbb-stage-reduce rounded px-2 py-1 text-center">Reduce task → toplama yapar</div>
      </div>
    </motion.div>
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
        <Eyebrow>BVA 2103 · 10. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="bvbb-shimmer">Hadoop MapReduce</span>
          <br />
          <span className="text-white">Programlama</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Veriyi taşımak yerine kodu veriye götüren paralel hesaplama modeli.
          Map &rarr; Shuffle &rarr; Reduce ile petabaytlık dosyaları kümeye dağıtarak
          işliyoruz.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {[
            { name: "Map", tag: "Eşle: (k,v) üret", color: "#22c55e", icon: Split },
            { name: "Shuffle", tag: "Grupla & sırala", color: "#f59e0b", icon: Shuffle },
            { name: "Reduce", tag: "İndirge: topla", color: "#2563eb", icon: Combine },
          ].map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              className="bvbb-card rounded-xl p-4 flex items-center gap-3"
              style={{ borderColor: `${p.color}55` }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${p.color}22`, border: `1px solid ${p.color}66` }}
              >
                <p.icon className="w-5 h-5" style={{ color: p.color }} />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white">{p.name}</div>
                <div className="text-[10px] text-gray-400">{p.tag}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-10 text-[11px] font-mono text-gray-600"
        >
          Öğr. Gör. Osman Can Çetlenbik · MCBÜ MYO · Bilgisayar Programcılığı
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  2 · GEÇEN HAFTADAN KÖPRÜ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 9. haftadan 10. haftaya</Eyebrow>
      <H2>HDFS veriyi sakladı; şimdi onu işleyeceğiz</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta Hadoop ekosistemini ve HDFS&apos;in büyük dosyaları bloklara bölüp
        küme düğümlerine dağıtarak sakladığını gördük. Bu hafta soru şu: bu dağıtık
        veriyi tek bir makineye indirmeden nasıl işleriz?
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bvbb-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#93c5fd]">
            <HardDrive className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Geçen hafta · HDFS</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#60a5fa] flex-shrink-0" />Dosya 128 MB&apos;lık bloklara bölünür.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#60a5fa] flex-shrink-0" />Her blok 3 kopya halinde düğümlere yayılır.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#60a5fa] flex-shrink-0" />NameNode metadata, DataNode bloğu tutar.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="bvbb-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <Cpu className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu hafta · MapReduce</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />İşleme, verinin durduğu düğümde başlar.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Map ve Reduce iki temel fonksiyonu yazarız.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Hadoop paralelliği, hata toleransını üstlenir.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3 · BU DERSİN HEDEFİ / AKIŞ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: model → kod → küme</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce MapReduce&apos;ün düşünce modelini kuruyoruz; sonra gerçek bir
        WordCount programını satır satır yazıyoruz; en son işin YARN üzerinde
        kümede nasıl koştuğunu ve nasıl optimize edileceğini görüyoruz.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Programlama Modeli", items: ["Anahtar-değer çiftleri", "Map · Shuffle · Reduce", "Veri yerelliği ilkesi"], icon: Workflow, accent: "#22c55e" },
          { range: "02", title: "WordCount Kodu", items: ["Mapper sınıfı", "Reducer sınıfı", "Driver & çalıştırma"], icon: Code, accent: "#f59e0b" },
          { range: "03", title: "Küme & Optimizasyon", items: ["YARN üzerinde job", "Combiner & partitioner", "Sık hatalar"], icon: Server, accent: "#2563eb" },
        ].map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="bvbb-card rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${g.accent}18`, border: `1px solid ${g.accent}55` }}
              >
                <g.icon className="w-5 h-5" style={{ color: g.accent }} />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: g.accent }}>Durak {g.range}</div>
                <div className="text-lg font-semibold text-white">{g.title}</div>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-400">
              {g.items.map((it) => (
                <li key={it} className="flex items-start gap-2">
                  <ChevronRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: g.accent }} />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  4 · BÖLÜM 1 · PROGRAMLAMA MODELİ  ───────────────── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="MapReduce Programlama Modeli"
      subtitle="Veriyi merkeze taşıma; kodu veriye taşı. Her şey anahtar-değer çiftleriyle ifade edilir — model bundan ibarettir."
      bgGradient="linear-gradient(135deg, #16a34a 0%, #22c55e 100%)"
      shadow="0 20px 60px -10px rgba(34, 197, 94, 0.6)"
      icon={<Workflow className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  5 · TEMEL FİKİR · VERİ YERELLİĞİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Temel fikir</Eyebrow>
      <H2>
        Kodu veriye götür, <span className="bvbb-shimmer-sky">veriyi koda değil</span>
      </H2>
      <Sub className="mt-3 max-w-3xl">
        Terabaytlarca veriyi ağ üzerinden tek bir hesaplama düğümüne çekmek
        pahalıdır. MapReduce küçük olan kodu, verinin zaten durduğu düğüme yollar.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={Network}
          title="Veri yerelliği (data locality)"
          desc="Map görevi, işleyeceği HDFS bloğunun bulunduğu düğümde başlatılır — ağ trafiği en aza iner."
          delay={0.0}
          accent="#22c55e"
        />
        <FeatureCard
          icon={Boxes}
          title="Otomatik paralellik"
          desc="Her blok için ayrı bir map görevi açılır; yüzlerce görev aynı anda farklı düğümlerde koşar."
          delay={0.1}
          accent="#2563eb"
        />
        <FeatureCard
          icon={Zap}
          title="Hata toleransı"
          desc="Bir görev çöken düğümde başarısız olursa Hadoop onu başka düğümde otomatik yeniden çalıştırır."
          delay={0.2}
          accent="#a855f7"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 bvbb-card rounded-xl p-4 flex items-start gap-3"
      >
        <Lightbulb className="w-5 h-5 text-[#60a5fa] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-300">
          <span className="bvbb-token">Sonuç</span> Programcı yalnızca iki fonksiyon
          yazar; dağıtım, sıralama, kopyalama ve yeniden deneme işlerini çatı
          (framework) üstlenir.
        </p>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  6 · ÜÇ AŞAMA · KEY-VALUE  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Veri tipi · her şey (anahtar, değer)</Eyebrow>
      <H2>Üç aşama, tek veri tipi</H2>
      <Sub className="mt-3 max-w-3xl">
        MapReduce&apos;te her aşamanın girdisi ve çıktısı bir anahtar-değer çifti
        listesidir. Aşamalar arasındaki dönüşümü ezberlemek modeli anlamanın anahtarıdır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[
          {
            tier: "Map",
            sub: "Eşle",
            color: "#22c55e",
            icon: Split,
            io: "(k1, v1) → list(k2, v2)",
            desc: "Her girdi kaydını bağımsızca işler ve ara çiftler üretir. Filtreleme ve dönüştürme burada yapılır.",
          },
          {
            tier: "Shuffle & Sort",
            sub: "Grupla",
            color: "#f59e0b",
            icon: Shuffle,
            io: "k2 → list(v2)",
            desc: "Çatının otomatik yaptığı adım: aynı anahtarlı tüm değerleri tek listede toplar ve anahtara göre sıralar.",
          },
          {
            tier: "Reduce",
            sub: "İndirge",
            color: "#2563eb",
            icon: Combine,
            io: "(k2, list(v2)) → list(k3, v3)",
            desc: "Bir anahtara ait değer listesini tek bir sonuca indirger: toplam, sayım, ortalama, en büyük vb.",
          },
        ].map((m, i) => (
          <motion.div
            key={m.tier}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bvbb-card rounded-xl p-5"
            style={{ borderColor: `${m.color}55` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${m.color}25`, border: `1px solid ${m.color}66` }}
              >
                <m.icon className="w-5 h-5" style={{ color: m.color }} />
              </div>
              <div>
                <div className="text-base font-bold text-white">{m.tier}</div>
                <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">{m.sub}</div>
              </div>
            </div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Tip imzası</div>
            <div
              className="font-mono text-[11px] rounded px-2 py-1.5 mb-3"
              style={{ background: `${m.color}12`, color: m.color, border: `1px solid ${m.color}33` }}
            >
              {m.io}
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">{m.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-5 text-center text-[11px] text-gray-500"
      >
        Shuffle aşamasını sen yazmazsın — ama maliyetini (ağ trafiği) hep aklında tut.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  7 · WORDCOUNT VERİ AKIŞI (diyagram)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Klasik örnek · WordCount</Eyebrow>
      <H2 className="mb-2">Üç satır metin, baştan sona akış</H2>
      <Sub className="max-w-3xl mb-6">
        MapReduce&apos;ün &quot;merhaba dünya&quot;sı: bir metindeki kelimeleri saymak.
        Girdiden çıktıya her aşamada verinin nasıl dönüştüğünü izleyelim.
      </Sub>
      <WordCountDataflow />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-5 text-[11px] text-gray-500 text-center"
      >
        <span className="bvbb-token">Dikkat</span> Map çıktısındaki her kelime için
        değer her zaman <span className="font-mono text-gray-300">1</span>&apos;dir; gerçek sayım Reduce&apos;te toplanarak çıkar.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  8 · BÖLÜM 2 · KOD  ───────────────── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="WordCount&apos;u Koda Dökmek"
      subtitle="Modeli anladık; şimdi Java ile Mapper, Reducer ve Driver sınıflarını yazıp gerçek bir Hadoop programı kuruyoruz."
      bgGradient="linear-gradient(135deg, #d97706 0%, #f59e0b 100%)"
      shadow="0 20px 60px -10px rgba(245, 158, 11, 0.55)"
      icon={<Code className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  9 · MAPPER SINIFI (kod)  ───────────────── */
  () => (
    <SlideShell bgPattern={false}>
      <Eyebrow>Kod · TokenizerMapper</Eyebrow>
      <H2 className="mb-2">Mapper: satırı kelimelere böl</H2>
      <Sub className="max-w-3xl mb-6">
        <span className="font-mono text-[#93c5fd]">map()</span> her metin satırı için bir kez çağrılır.
        Satırı kelimelere ayırır ve her kelime için <span className="font-mono text-gray-300">(kelime, 1)</span> çifti yazar.
      </Sub>
      <CodeWindow title="TokenizerMapper.java">
        <div><span className="bvbb-code-kw">public class</span> <span className="bvbb-code-fn">TokenizerMapper</span></div>
        <div>{"    "}<span className="bvbb-code-kw">extends</span> Mapper&lt;Object, Text, Text, IntWritable&gt; {"{"}</div>
        <div>{" "}</div>
        <div>{"  "}<span className="bvbb-code-kw">private final static</span> IntWritable one = <span className="bvbb-code-kw">new</span> <span className="bvbb-code-fn">IntWritable</span>(<span className="bvbb-code-num">1</span>);</div>
        <div>{"  "}<span className="bvbb-code-kw">private</span> Text word = <span className="bvbb-code-kw">new</span> <span className="bvbb-code-fn">Text</span>();</div>
        <div>{" "}</div>
        <div>{"  "}<span className="bvbb-code-com">// her girdi satırı için bir kez çağrılır</span></div>
        <div>{"  "}<span className="bvbb-code-kw">public void</span> <span className="bvbb-code-fn">map</span>(Object key, Text value, Context context)</div>
        <div>{"      "}<span className="bvbb-code-kw">throws</span> IOException, InterruptedException {"{"}</div>
        <div>{"    "}StringTokenizer itr = <span className="bvbb-code-kw">new</span> <span className="bvbb-code-fn">StringTokenizer</span>(value.<span className="bvbb-code-fn">toString</span>());</div>
        <div>{"    "}<span className="bvbb-code-kw">while</span> (itr.<span className="bvbb-code-fn">hasMoreTokens</span>()) {"{"}</div>
        <div>{"      "}word.<span className="bvbb-code-fn">set</span>(itr.<span className="bvbb-code-fn">nextToken</span>());</div>
        <div>{"      "}context.<span className="bvbb-code-fn">write</span>(word, one);  <span className="bvbb-code-com">// (kelime, 1)</span></div>
        <div>{"    "}{"}"}</div>
        <div>{"  "}{"}"}</div>
        <div>{"}"}</div>
      </CodeWindow>
    </SlideShell>
  ),

  /* ─────────────────  10 · REDUCER SINIFI (kod)  ───────────────── */
  () => (
    <SlideShell bgPattern={false}>
      <Eyebrow>Kod · IntSumReducer</Eyebrow>
      <H2 className="mb-2">Reducer: aynı kelimenin 1&apos;lerini topla</H2>
      <Sub className="max-w-3xl mb-6">
        <span className="font-mono text-[#93c5fd]">reduce()</span> her benzersiz kelime için bir kez çağrılır;
        Shuffle&apos;ın hazırladığı değer listesini (örn. <span className="font-mono text-gray-300">[1,1,1]</span>) toplayıp sonucu yazar.
      </Sub>
      <CodeWindow title="IntSumReducer.java">
        <div><span className="bvbb-code-kw">public class</span> <span className="bvbb-code-fn">IntSumReducer</span></div>
        <div>{"    "}<span className="bvbb-code-kw">extends</span> Reducer&lt;Text, IntWritable, Text, IntWritable&gt; {"{"}</div>
        <div>{" "}</div>
        <div>{"  "}<span className="bvbb-code-kw">private</span> IntWritable result = <span className="bvbb-code-kw">new</span> <span className="bvbb-code-fn">IntWritable</span>();</div>
        <div>{" "}</div>
        <div>{"  "}<span className="bvbb-code-com">// her benzersiz anahtar (kelime) için bir kez çağrılır</span></div>
        <div>{"  "}<span className="bvbb-code-kw">public void</span> <span className="bvbb-code-fn">reduce</span>(Text key, Iterable&lt;IntWritable&gt; values,</div>
        <div>{"      "}Context context) <span className="bvbb-code-kw">throws</span> IOException, InterruptedException {"{"}</div>
        <div>{"    "}<span className="bvbb-code-kw">int</span> sum = <span className="bvbb-code-num">0</span>;</div>
        <div>{"    "}<span className="bvbb-code-kw">for</span> (IntWritable val : values) {"{"}</div>
        <div>{"      "}sum += val.<span className="bvbb-code-fn">get</span>();  <span className="bvbb-code-com">// 1 + 1 + 1 ...</span></div>
        <div>{"    "}{"}"}</div>
        <div>{"    "}result.<span className="bvbb-code-fn">set</span>(sum);</div>
        <div>{"    "}context.<span className="bvbb-code-fn">write</span>(key, result);  <span className="bvbb-code-com">// (kelime, toplam)</span></div>
        <div>{"  "}{"}"}</div>
        <div>{"}"}</div>
      </CodeWindow>
    </SlideShell>
  ),

  /* ─────────────────  11 · DRIVER + ÇALIŞTIRMA (kod/terminal)  ───────────────── */
  () => (
    <SlideShell bgPattern={false}>
      <Eyebrow>Kod · Driver &amp; çalıştırma</Eyebrow>
      <H2 className="mb-2">Job&apos;ı kur, paketle, kümede çalıştır</H2>
      <Sub className="max-w-3xl mb-6">
        Driver, Mapper/Reducer&apos;ı bir Job nesnesine bağlar ve girdi/çıktı
        yollarını tanımlar. Sonra <span className="font-mono text-gray-300">hadoop jar</span> komutu işi kümeye gönderir.
      </Sub>
      <CodeWindow title="WordCount.java — main()  +  terminal">
        <div>{"  "}Configuration conf = <span className="bvbb-code-kw">new</span> <span className="bvbb-code-fn">Configuration</span>();</div>
        <div>{"  "}Job job = Job.<span className="bvbb-code-fn">getInstance</span>(conf, <span className="bvbb-code-str">&quot;word count&quot;</span>);</div>
        <div>{"  "}job.<span className="bvbb-code-fn">setJarByClass</span>(WordCount.<span className="bvbb-code-kw">class</span>);</div>
        <div>{"  "}job.<span className="bvbb-code-fn">setMapperClass</span>(TokenizerMapper.<span className="bvbb-code-kw">class</span>);</div>
        <div>{"  "}job.<span className="bvbb-code-fn">setCombinerClass</span>(IntSumReducer.<span className="bvbb-code-kw">class</span>);  <span className="bvbb-code-com">// yerel ön-toplama</span></div>
        <div>{"  "}job.<span className="bvbb-code-fn">setReducerClass</span>(IntSumReducer.<span className="bvbb-code-kw">class</span>);</div>
        <div>{"  "}job.<span className="bvbb-code-fn">setOutputKeyClass</span>(Text.<span className="bvbb-code-kw">class</span>);</div>
        <div>{"  "}job.<span className="bvbb-code-fn">setOutputValueClass</span>(IntWritable.<span className="bvbb-code-kw">class</span>);</div>
        <div>{"  "}FileInputFormat.<span className="bvbb-code-fn">addInputPath</span>(job, <span className="bvbb-code-kw">new</span> <span className="bvbb-code-fn">Path</span>(args[<span className="bvbb-code-num">0</span>]));</div>
        <div>{"  "}FileOutputFormat.<span className="bvbb-code-fn">setOutputPath</span>(job, <span className="bvbb-code-kw">new</span> <span className="bvbb-code-fn">Path</span>(args[<span className="bvbb-code-num">1</span>]));</div>
        <div>{"  "}System.<span className="bvbb-code-fn">exit</span>(job.<span className="bvbb-code-fn">waitForCompletion</span>(<span className="bvbb-code-kw">true</span>) ? <span className="bvbb-code-num">0</span> : <span className="bvbb-code-num">1</span>);</div>
        <div className="bvbb-code-com mt-2">──────────────────────────────────────</div>
        <div><span className="bvbb-code-prompt">student@cluster</span>:~$ <span className="bvbb-code-out">hadoop jar wc.jar WordCount /veri/kitap.txt /cikti</span></div>
        <div className="bvbb-code-out">map 0% reduce 0%  ...  map 100% reduce 100%</div>
        <div className="bvbb-code-out">Job job_1729_0007 completed successfully</div>
        <div><span className="bvbb-code-prompt">student@cluster</span>:~$ <span className="bvbb-code-out">hdfs dfs -cat /cikti/part-r-00000</span></div>
        <div className="bvbb-code-out">bulut   42</div>
        <div className="bvbb-code-out">veri    87</div>
      </CodeWindow>
    </SlideShell>
  ),

  /* ─────────────────  12 · BÖLÜM 3 · KÜME & OPTİMİZASYON  ───────────────── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Küme Üzerinde Çalışma"
      subtitle="İş YARN&apos;a gider, görevler düğümlere dağılır. Combiner, partitioner ve doğru görev sayısı performansı belirler."
      bgGradient="linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)"
      shadow="0 20px 60px -10px rgba(37, 99, 235, 0.6)"
      icon={<Server className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  13 · YARN ÜZERİNDE JOB (diyagram)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Yürütme · YARN topolojisi</Eyebrow>
      <H2 className="mb-2">Bir job kümede nasıl koşar?</H2>
      <Sub className="max-w-3xl mb-6">
        Client işi ResourceManager&apos;a gönderir; o da görevleri verinin durduğu
        düğümlerdeki NodeManager&apos;lara dağıtır. ApplicationMaster tek bir işin
        yaşam döngüsünü yönetir.
      </Sub>
      <YarnJobDiagram />
    </SlideShell>
  ),

  /* ─────────────────  14 · COMBINER & PARTITIONER (karşılaştırma)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>İki kritik ayar</Eyebrow>
      <H2>Combiner ve Partitioner</H2>
      <Sub className="mt-3 max-w-3xl">
        İkisi de Shuffle aşamasının etrafında çalışır: biri ağ trafiğini azaltır,
        diğeri hangi anahtarın hangi reducer&apos;a gideceğini belirler.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bvbb-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <GitMerge className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Combiner · &quot;mini reducer&quot;</span>
          </div>
          <p className="text-sm text-gray-300 mb-3">
            Map çıktısını, henüz ağdan geçmeden o düğümde yerel olarak ön-toplar.
            WordCount&apos;ta <span className="font-mono text-gray-300">(the,1)(the,1)(the,1)</span> yerine
            tek <span className="font-mono text-gray-300">(the,3)</span> gönderilir.
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bvbb-heat-high rounded p-2">
              <div className="font-semibold text-[10px] uppercase tracking-wider flex items-center gap-1"><Check className="w-3 h-3" /> Kazanç</div>
              <div className="mt-1">Çok daha az ağ trafiği</div>
            </div>
            <div className="bvbb-heat-mid rounded p-2">
              <div className="font-semibold text-[10px] uppercase tracking-wider flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Koşul</div>
              <div className="mt-1">İşlem değişmeli &amp; birleşmeli olmalı</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="bvbb-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#93c5fd]">
            <Hash className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Partitioner · anahtar yönlendirme</span>
          </div>
          <p className="text-sm text-gray-300 mb-3">
            Her ara anahtarı hangi reducer&apos;ın işleyeceğine karar verir.
            Varsayılan: <span className="font-mono text-gray-300">hash(key) % R</span>. Böylece aynı anahtar her zaman aynı reducer&apos;a düşer.
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bvbb-heat-high rounded p-2">
              <div className="font-semibold text-[10px] uppercase tracking-wider flex items-center gap-1"><Check className="w-3 h-3" /> Amaç</div>
              <div className="mt-1">Dengeli yük dağılımı</div>
            </div>
            <div className="bvbb-heat-low rounded p-2">
              <div className="font-semibold text-[10px] uppercase tracking-wider flex items-center gap-1"><X className="w-3 h-3" /> Risk</div>
              <div className="mt-1">Çarpık anahtar = yavaş reducer</div>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  15 · SIK YAPILAN HATALAR (tablo)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sahadan · sık hatalar</Eyebrow>
      <H2>MapReduce&apos;te tökezlenen yerler</H2>
      <Sub className="mt-3 max-w-3xl">
        İlk programlarda en çok karşılaşılan beş tuzak ve doğru yaklaşım.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-7 bvbb-card rounded-xl overflow-hidden"
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#1e293b] text-gray-300">
              <th className="text-left px-4 py-3 font-semibold">Belirti</th>
              <th className="text-left px-4 py-3 font-semibold">
                <X className="inline w-4 h-4 mr-1.5 -mt-0.5 text-red-400" />
                Yanlış
              </th>
              <th className="text-left px-4 py-3 font-semibold">
                <Check className="inline w-4 h-4 mr-1.5 -mt-0.5 text-[#34d399]" />
                Doğru
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {[
              {
                k: "Çıktı klasörü hatası",
                op: "Var olan /cikti dizinine yazmaya çalışmak",
                cl: "Her çalıştırmadan önce çıktı yolunu boş/yeni seç",
              },
              {
                k: "Combiner toplamı bozuyor",
                op: "Ortalama gibi birleşmez işlemi combiner&apos;a vermek",
                cl: "Yalnızca toplam/sayım/min-maks gibi işlemlerde kullan",
              },
              {
                k: "Tek reducer darboğazı",
                op: "Tüm anahtarların tek reducer&apos;a düşmesi",
                cl: "Reducer sayısını artır, partitioner ile dağıt",
              },
              {
                k: "Bellek taşması (OOM)",
                op: "reduce() içinde tüm değerleri listeye biriktirmek",
                cl: "Iterable üzerinde tek geçişte akıtarak işle",
              },
              {
                k: "Yazılabilir tip uyuşmazlığı",
                op: "String/int kullanmak",
                cl: "Text, IntWritable, LongWritable kullan",
              },
            ].map((row, i) => (
              <motion.tr
                key={row.k}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="border-t border-white/5"
              >
                <td className="px-4 py-3 font-medium text-white">{row.k}</td>
                <td className="px-4 py-3 text-gray-400">{row.op}</td>
                <td className="px-4 py-3 text-[#93c5fd]">{row.cl}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  16 · UYGULAMALI LAB  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
      <H2>Kendi MapReduce işini çalıştır</H2>
      <Sub className="mt-3 max-w-3xl">
        Lab tek düğümlü bir Hadoop kurulumunda (pseudo-distributed) yapılır.
        Sonraki derse dört adımı tamamlayıp çıktının ekran görüntüsünü almış gelmen beklenir.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: FileText, title: "Veriyi HDFS&apos;e yükle", desc: "hdfs dfs -put kitap.txt /veri ile bir metin dosyasını dağıtık dosya sistemine koy.", accent: "#22c55e" },
          { icon: Code, title: "WordCount&apos;u derle &amp; paketle", desc: "Mapper, Reducer ve Driver&apos;ı derleyip wc.jar olarak paketle.", accent: "#f59e0b" },
          { icon: Terminal, title: "Job&apos;ı çalıştır", desc: "hadoop jar wc.jar WordCount /veri /cikti ile işi başlat; map/reduce yüzdesini izle.", accent: "#2563eb" },
          { icon: ListChecks, title: "En sık 5 kelimeyi raporla", desc: "part-r-00000 çıktısını oku; ikinci bir MapReduce ile (veya sort) en sık 5 kelimeyi çıkar.", accent: "#a855f7" },
        ].map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="bvbb-card bvbb-card-hover rounded-xl p-5 flex items-start gap-4"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${t.accent}18`, border: `1px solid ${t.accent}55` }}
            >
              <t.icon className="w-5 h-5" style={{ color: t.accent }} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-[10px] text-gray-500 font-mono">{i + 1}</span>
                <h3 className="text-base font-semibold text-white" dangerouslySetInnerHTML={{ __html: t.title }} />
              </div>
              <p className="text-sm text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.desc }} />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 text-[11px] text-gray-500 text-center"
      >
        <span className="bvbb-token">İpucu</span> Önce çok küçük bir dosyayla dene;
        çalıştığını gördükten sonra büyük girdiye geç — hata ayıklamak çok kolaylaşır.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  17 · SIRADAKİ HAFTA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Hafta 11 Önizleme</Eyebrow>
      <H2>
        MapReduce&apos;ten <span className="bvbb-shimmer-sky">Apache Spark</span>&apos;a
      </H2>
      <Sub className="mt-3 max-w-3xl">
        MapReduce her aşamada ara sonucu diske yazar; bu çok iterasyonlu işlerde
        yavaştır. Spark veriyi bellekte tutarak aynı modeli onlarca kat hızlandırır.
        Gelecek hafta bu geçişi konuşacağız.
      </Sub>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Zap}
          title="Bellek içi işleme"
          desc="RDD ve DataFrame ile ara veriyi diske yazmadan bellekte tutarak büyük hız kazanımı."
          delay={0.0}
          accent="#f59e0b"
        />
        <FeatureCard
          icon={Layers}
          title="DAG yürütücü"
          desc="Tek tek map/reduce yerine işlemleri bir yönlü çizge olarak planlayıp optimize eder."
          delay={0.1}
          accent="#2563eb"
        />
        <FeatureCard
          icon={Brain}
          title="Zengin API"
          desc="SQL, MLlib, Streaming — tek motorda toplu ve akan veri ile makine öğrenmesi."
          delay={0.2}
          accent="#22c55e"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 bvbb-card rounded-xl p-5 flex items-center gap-4"
      >
        <Database className="w-6 h-6 text-[#60a5fa]" />
        <div className="flex-1">
          <div className="text-sm font-semibold text-white">Hazırlık</div>
          <div className="text-xs text-gray-400 mt-0.5">
            Bu haftanın WordCount çıktısını yanında getir — aynı problemi Spark ile
            çözüp satır sayısını karşılaştıracağız.
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-500" />
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  18 · KAPANIŞ  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex w-24 h-24 rounded-3xl items-center justify-center mb-8"
          style={{
            background: "linear-gradient(135deg, #16a34a 0%, #2563eb 100%)",
            boxShadow: "0 20px 60px -10px rgba(37,99,235,0.6)",
          }}
        >
          <Cpu className="w-12 h-12 text-white" />
        </motion.div>

        <Eyebrow>Hafta 10 · Özet</Eyebrow>
        <H1>
          <span className="bvbb-shimmer">Map · Shuffle · Reduce</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          İki fonksiyon yazdık, kümeye gönderdik, çatı gerisini halletti.
          Sorular için derslik 7&apos;de buluşuyoruz.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {[
            { icon: Split, label: "Map", value: "Satırı (k,v) çiftlerine eşle" },
            { icon: Shuffle, label: "Shuffle", value: "Çatı anahtara göre grupla/sırala" },
            { icon: Combine, label: "Reduce", value: "Değer listesini sonuca indirge" },
          ].map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="bvbb-card rounded-xl p-4 text-left"
            >
              <c.icon className="w-5 h-5 text-[#60a5fa] mb-2" />
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">{c.label}</div>
              <div className="text-sm font-semibold text-white mt-1">{c.value}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-10 text-[11px] font-mono text-gray-600 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>BVA 2103 · Büyük Veri İçin Bulut Bilişim · Güz 2026</span>
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

      <div className="absolute bottom-3 right-8 text-[9px] font-mono text-gray-700 z-50 hidden md:flex items-center gap-2">
        <Keyboard className="w-3 h-3" />
        <span>← → · F · Esc</span>
      </div>
    </div>
  );
}
