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
  Zap,
  Database,
  HardDrive,
  Server,
  Cpu,
  MemoryStick,
  Network,
  Layers,
  Layers3,
  GitBranch,
  Workflow,
  Code,
  Terminal,
  Gauge,
  Boxes,
  Brain,
  BarChart3,
  Activity,
  Sparkles,
  Check,
  X,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Lightbulb,
  Repeat,
  ListChecks,
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

function SparkClusterDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bvbb-card rounded-xl p-6"
    >
      <svg viewBox="0 0 640 320" className="w-full h-72">
        <defs>
          <linearGradient id="bvbbDriverGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="bvbbExecGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        {/* Driver (üst) */}
        <rect x="240" y="20" width="160" height="64" rx="10" fill="url(#bvbbDriverGrad)" />
        <text x="320" y="46" textAnchor="middle" fontSize="15" fill="#fff" fontWeight="700">
          Driver
        </text>
        <text x="320" y="66" textAnchor="middle" fontSize="11" fill="#dbeafe">
          SparkContext · DAG · zamanlayıcı
        </text>

        {/* Cluster Manager (orta) */}
        <rect x="220" y="118" width="200" height="44" rx="8" fill="#1e293b" stroke="#475569" />
        <text x="320" y="138" textAnchor="middle" fontSize="12" fill="#cbd5e1" fontWeight="600">
          Cluster Manager
        </text>
        <text x="320" y="153" textAnchor="middle" fontSize="10" fill="#64748b">
          YARN · Kubernetes · Standalone
        </text>

        {/* Driver → Cluster Manager bağlantı */}
        <line x1="320" y1="84" x2="320" y2="118" stroke="#3b82f6" strokeWidth="2" />

        {/* Executors (alt) */}
        {[0, 1, 2].map((i) => {
          const x = 60 + i * 200;
          return (
            <g key={i}>
              <line x1="320" y1="162" x2={x + 70} y2="210" stroke="#475569" strokeWidth="1.5" />
              <rect x={x} y="210" width="140" height="86" rx="9" fill="url(#bvbbExecGrad)" opacity="0.16" stroke="#f59e0b" />
              <text x={x + 70} y="232" textAnchor="middle" fontSize="13" fill="#fbbf24" fontWeight="700">
                Executor {i + 1}
              </text>
              {/* Görevler (tasks) */}
              {[0, 1, 2].map((t) => (
                <rect
                  key={t}
                  x={x + 14 + t * 40}
                  y="246"
                  width="32"
                  height="20"
                  rx="3"
                  fill="#f59e0b"
                  opacity="0.7"
                />
              ))}
              <text x={x + 70} y="284" textAnchor="middle" fontSize="9" fill="#fcd34d">
                3 task · RAM cache
              </text>
            </g>
          );
        })}
      </svg>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-[11px] text-gray-400">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm" style={{ background: "#2563eb" }} /> Driver — işi planlar
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm" style={{ background: "#1e293b", border: "1px solid #475569" }} /> Manager — kaynak dağıtır
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm" style={{ background: "#f59e0b" }} /> Executor — görevleri çalıştırır
        </span>
      </div>
    </motion.div>
  );
}

function SparkShellMock() {
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
          style={{ background: "#0a0e14", color: "#fbbf24" }}
        >
          <Terminal className="w-3 h-3" />
          <span>pyspark — Python 3.11 · Spark 3.5</span>
        </div>
      </div>
      <div className="bvbb-terminal">
        <div>
          <span className="bvbb-term-prompt">student@emr</span>
          <span className="bvbb-term-dim">:~$</span>{" "}
          <span className="bvbb-term-cmd">pyspark</span>
        </div>
        <div className="bvbb-term-dim">Welcome to</div>
        <div className="bvbb-term-spark">      ____              __</div>
        <div className="bvbb-term-spark">     / __/__  ___ _____/ /__</div>
        <div className="bvbb-term-spark">    _\ \/ _ \/ _ `/ __/  &apos;_/</div>
        <div className="bvbb-term-spark">   /__ / .__/\_,_/_/ /_/\_\   version 3.5.1</div>
        <div className="bvbb-term-dim">SparkSession available as &apos;spark&apos;.</div>
        <div className="mt-2">
          <span className="bvbb-term-prompt">&gt;&gt;&gt;</span>{" "}
          <span className="bvbb-term-cmd">
            df = spark.read.csv(&quot;s3://veri/satislar.csv&quot;, header=True)
          </span>
        </div>
        <div>
          <span className="bvbb-term-prompt">&gt;&gt;&gt;</span>{" "}
          <span className="bvbb-term-cmd">
            df.filter(df.tutar &gt; 100).groupBy(&quot;sehir&quot;).count().show()
          </span>
        </div>
        <div className="bvbb-term-dim mt-1">+----------+-----+</div>
        <div className="bvbb-term-dim">|     sehir|count|</div>
        <div className="bvbb-term-dim">+----------+-----+</div>
        <div><span className="bvbb-term-ok">|    Manisa| 4120|</span></div>
        <div><span className="bvbb-term-ok">|     Izmir| 9874|</span></div>
        <div><span className="bvbb-term-ok">|    Ankara| 7533|</span></div>
        <div className="bvbb-term-dim">+----------+-----+</div>
        <div className="mt-2">
          <span className="bvbb-term-prompt">&gt;&gt;&gt;</span>{" "}
          <span className="bvbb-term-cmd">_</span>
          <span className="animate-pulse">█</span>
        </div>
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
        <Eyebrow>BVA 2103 · 11. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="bvbb-shimmer">Apache Spark</span>
          <br />
          <span className="text-white">Tanıtım ve Temel Kavramlar</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Diskten okuyan MapReduce&apos;dan, belleğin hızıyla çalışan dağıtık
          işleme motoruna geçiyoruz. RDD, DAG ve in-memory hesaplama ile tanışın.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {[
            { name: "Bellek-içi", tag: "RAM&apos;de işleme", color: "#f59e0b", icon: MemoryStick },
            { name: "DAG motoru", tag: "Akıllı planlama", color: "#2563eb", icon: GitBranch },
            { name: "Birleşik API", tag: "SQL · ML · Stream", color: "#22c55e", icon: Layers3 },
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
                <div className="text-[10px] text-gray-400" dangerouslySetInnerHTML={{ __html: p.tag }} />
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
      <Eyebrow>Köprü · 10. haftadan 11. haftaya</Eyebrow>
      <H2>MapReduce&apos;u öğrendik; şimdi sınırlarını aşıyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta HDFS&apos;te veri sakladık ve MapReduce ile dağıtık işledik.
        İyi çalıştı ama her adım sonucunu diske yazıyordu. İteratif algoritmalar
        bu yüzden çok yavaştı. Spark tam da bu sorunu çözmek için doğdu.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bvbb-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-gray-300">
            <HardDrive className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">MapReduce — disk odaklı</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-400">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />Her Map/Reduce adımı ara sonucu HDFS&apos;e yazar.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />Her iterasyon yeniden diskten okur — yüksek I/O.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />Sadece Map ve Reduce; karmaşık akış zahmetli.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="bvbb-card-sky rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fbbf24]">
            <Zap className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Spark — bellek odaklı</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#60a5fa] flex-shrink-0" />Ara sonuçları bellekte tutar (cache), tekrar okur.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#60a5fa] flex-shrink-0" />İteratif ML ve grafik algoritmalarında çok hızlı.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#60a5fa] flex-shrink-0" />Zengin operatör seti + SQL, ML, akış tek motorda.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3 · BU DERSİN AKIŞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: neden Spark → nasıl çalışır → ne yazılır</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce Spark&apos;ın ne olduğunu ve MapReduce&apos;a göre farkını görüyoruz;
        sonra mimarisini ve RDD/DAG çekirdeğini açıyoruz; en son DataFrame API ve
        ekosistemi ile kod yazmaya başlıyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Spark Nedir?", items: ["Doğuşu ve amacı", "Bellek-içi avantajı", "MapReduce karşılaştırması"], icon: Zap, accent: "#f59e0b" },
          { range: "02", title: "Mimari & Çekirdek", items: ["Driver · Executor · Manager", "RDD ve değişmezlik", "DAG ve tembel değerlendirme"], icon: Workflow, accent: "#2563eb" },
          { range: "03", title: "API & Ekosistem", items: ["DataFrame & Spark SQL", "Transformation vs Action", "MLlib · Streaming · GraphX"], icon: Boxes, accent: "#22c55e" },
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

  /* ─────────────────  4 · BÖLÜM 1 · SPARK NEDİR  ───────────────── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Apache Spark Nedir?"
      subtitle="Açık kaynaklı, dağıtık, genel amaçlı bir büyük veri işleme motoru. Doğuşu, amacı ve neden bu kadar hızlı olduğu."
      bgGradient="linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)"
      shadow="0 20px 60px -10px rgba(245, 158, 11, 0.6)"
      icon={<Zap className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  5 · SPARK NEDİR DETAY  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Tanım · UC Berkeley AMPLab, 2009</Eyebrow>
      <H2>Tek motor, dört iş yükü</H2>
      <Sub className="mt-3 max-w-3xl">
        Spark; toplu işleme, etkileşimli sorgu, gerçek zamanlı akış ve makine
        öğrenmesini aynı çekirdek üzerinde birleştirir. Bu yüzden &quot;birleşik
        analitik motoru&quot; olarak anılır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <FeatureCard
          icon={MemoryStick}
          title="Bellek-içi hesaplama"
          desc="Veriyi mümkün oldukça RAM&apos;de tutar; tekrarlı erişimde diske inmeden çalışır."
          delay={0.0}
          accent="#f59e0b"
        />
        <FeatureCard
          icon={Layers}
          title="Birleşik yığın"
          desc="Spark SQL, MLlib, Structured Streaming ve GraphX aynı çekirdeği paylaşır."
          delay={0.1}
          accent="#2563eb"
        />
        <FeatureCard
          icon={Code}
          title="Çok dilli API"
          desc="Scala, Python (PySpark), Java ve R ile aynı işi yazabilirsin."
          delay={0.2}
          accent="#22c55e"
        />
        <FeatureCard
          icon={Network}
          title="Her yerde çalışır"
          desc="HDFS, S3, Cassandra üzerinden okur; YARN, Kubernetes veya standalone üzerinde koşar."
          delay={0.3}
          accent="#a855f7"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 bvbb-card rounded-xl p-4 flex items-start gap-3"
      >
        <Lightbulb className="w-5 h-5 text-[#60a5fa] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-300">
          <span className="bvbb-token">Not</span> Spark bir depolama sistemi
          değildir. Veriyi HDFS, S3 gibi katmanlardan okur; kendisi yalnızca
          işleme (compute) motorudur.
        </p>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  6 · MAPREDUCE vs SPARK TABLO  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Karşılaştırma · MapReduce vs Spark</Eyebrow>
      <H2>Aynı işi, farklı hızlarda</H2>
      <Sub className="mt-3 max-w-3xl">
        İkisi de dağıtık işleme yapar; temel fark ara verinin nerede tutulduğu ve
        programlama modelinin ne kadar zengin olduğudur.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 bvbb-card rounded-xl p-1 overflow-hidden"
      >
        <table className="bvbb-tbl">
          <thead>
            <tr>
              <th style={{ width: "24%" }}>Boyut</th>
              <th style={{ width: "38%" }}>
                <HardDrive className="inline w-4 h-4 mr-1.5 -mt-0.5" />
                Hadoop MapReduce
              </th>
              <th>
                <Zap className="inline w-4 h-4 mr-1.5 -mt-0.5 text-[#fbbf24]" />
                Apache Spark
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              { k: "Ara veri", op: "Her adımda diske (HDFS) yazılır", cl: "Mümkünse bellekte (RAM) tutulur" },
              { k: "İteratif iş", op: "Her tur yeniden diskten okur", cl: "Veriyi cache&apos;leyip tekrar kullanır" },
              { k: "Programlama modeli", op: "Yalnızca Map ve Reduce", cl: "Zengin operatörler + SQL, ML, akış" },
              { k: "Etkileşim", op: "Toplu (batch) iş, kabuk yok", cl: "spark-shell / pyspark ile etkileşimli" },
              { k: "Tipik hız", op: "Disk I/O baskın, referans nokta", cl: "İteratif yükte belirgin biçimde daha hızlı" },
            ].map((row, i) => (
              <motion.tr
                key={row.k}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <td className="font-medium text-white">{row.k}</td>
                <td className="text-gray-400" dangerouslySetInnerHTML={{ __html: row.op }} />
                <td className="text-[#93c5fd]" dangerouslySetInnerHTML={{ __html: row.cl }} />
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-4 text-[11px] text-gray-500 text-center"
      >
        <span className="bvbb-token">Dikkat</span> &quot;Spark 100 kat hızlı&quot;
        ifadesi belirli iteratif kıyaslamalara aittir; gerçek hız iş yüküne,
        belleğe ve veri boyutuna göre değişir.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  7 · DİSK vs BELLEK GÖRSEL  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Görsel · neden daha hızlı?</Eyebrow>
      <H2>İteratif bir iş: diske yazmak vs bellekte tutmak</H2>
      <Sub className="mt-3 max-w-3xl">
        Aynı veriyi üç tur işleyen bir algoritma düşün. MapReduce her tur diske
        gidip gelir; Spark ilk turdan sonra veriyi bellekte tutar.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bvbb-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4 text-gray-300">
            <HardDrive className="w-5 h-5" />
            <span className="text-sm font-semibold">MapReduce · her tur diske</span>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((t) => (
              <div key={t} className="flex items-center gap-2 text-[11px] font-mono">
                <span className="text-gray-500">Tur {t}</span>
                <span className="px-2 py-1 rounded bg-white/5 text-gray-400">disk oku</span>
                <ArrowRight className="w-3 h-3 text-gray-600" />
                <span className="px-2 py-1 rounded bg-white/5 text-gray-300">işle</span>
                <ArrowRight className="w-3 h-3 text-gray-600" />
                <span className="px-2 py-1 rounded bvbb-heat-low">diske yaz</span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-[11px] text-gray-500">
            Her tur 2 disk erişimi · toplam 6 yavaş I/O işlemi.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="bvbb-card-sky rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4 text-[#fbbf24]">
            <MemoryStick className="w-5 h-5" />
            <span className="text-sm font-semibold text-white">Spark · bellekte tut</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[11px] font-mono">
              <span className="text-gray-500">Tur 1</span>
              <span className="px-2 py-1 rounded bg-white/5 text-gray-400">disk oku</span>
              <ArrowRight className="w-3 h-3 text-gray-600" />
              <span className="px-2 py-1 rounded bg-white/5 text-gray-300">işle</span>
              <ArrowRight className="w-3 h-3 text-gray-600" />
              <span className="px-2 py-1 rounded bvbb-heat-high">cache (RAM)</span>
            </div>
            {[2, 3].map((t) => (
              <div key={t} className="flex items-center gap-2 text-[11px] font-mono">
                <span className="text-gray-500">Tur {t}</span>
                <span className="px-2 py-1 rounded bvbb-heat-high">RAM oku</span>
                <ArrowRight className="w-3 h-3 text-gray-600" />
                <span className="px-2 py-1 rounded bg-white/5 text-gray-300">işle</span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-[11px] text-gray-400">
            Yalnızca 1 disk okuması; sonraki turlar bellekten — çok daha az I/O.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  8 · BÖLÜM 2 · MİMARİ  ───────────────── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Mimari ve Çekirdek Kavramlar"
      subtitle="Driver, executor ve cluster manager nasıl konuşur? RDD, DAG ve tembel değerlendirme Spark&apos;ın kalbidir."
      bgGradient="linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)"
      shadow="0 20px 60px -10px rgba(37, 99, 235, 0.6)"
      icon={<Workflow className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  9 · CLUSTER MİMARİSİ DİYAGRAM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Çalışma zamanı mimarisi</Eyebrow>
      <H2 className="mb-2">Bir Spark uygulaması kimlerden oluşur?</H2>
      <Sub className="max-w-3xl mb-6">
        Driver işi planlar ve görevleri dağıtır; cluster manager kaynak ayırır;
        executor&apos;lar görevleri paralel çalıştırıp sonucu driver&apos;a döner.
      </Sub>
      <SparkClusterDiagram />
    </SlideShell>
  ),

  /* ─────────────────  10 · BİLEŞENLER  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bileşenlerin görevleri</Eyebrow>
      <H2>Kim ne yapar?</H2>
      <Sub className="mt-3 max-w-3xl">
        Spark uygulamasını yönetenleri tek tek tanıyalım — log okurken ve hata
        ayıklarken bu roller hayat kurtarır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={Brain}
          title="Driver"
          desc="main() fonksiyonun çalıştığı süreç. SparkContext&apos;i oluşturur, DAG kurar, görevleri zamanlar."
          delay={0.0}
          accent="#2563eb"
        />
        <FeatureCard
          icon={Server}
          title="Cluster Manager"
          desc="Kaynak tahsis eder. YARN, Kubernetes veya Standalone olabilir; executor&apos;ları başlatır."
          delay={0.1}
          accent="#a855f7"
        />
        <FeatureCard
          icon={Cpu}
          title="Executor"
          desc="Worker düğümlerde çalışan JVM süreçleri. Görevleri (task) işler, veriyi bellekte cache&apos;ler."
          delay={0.2}
          accent="#f59e0b"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 bvbb-card rounded-xl p-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-gray-300"
      >
        <span className="font-mono text-[#60a5fa]">Job</span>
        <ArrowRight className="w-4 h-4 text-gray-600" />
        <span className="font-mono text-[#60a5fa]">Stage</span>
        <ArrowRight className="w-4 h-4 text-gray-600" />
        <span className="font-mono text-[#60a5fa]">Task</span>
        <span className="text-gray-500 ml-2">·</span>
        <span className="text-gray-400">Bir action bir job&apos;ı, shuffle bir stage&apos;i, her partition bir task&apos;ı doğurur.</span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  11 · RDD KAVRAMI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Çekirdek soyutlama · RDD</Eyebrow>
      <H2>Resilient Distributed Dataset</H2>
      <Sub className="mt-3 max-w-3xl">
        RDD; küme genelinde bölümlenmiş (partitioned), değişmez ve hataya
        dayanıklı bir veri koleksiyonudur. Spark&apos;ın en temel yapı taşıdır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <FeatureCard
          icon={Boxes}
          title="Resilient (dayanıklı)"
          desc="Bir partition kaybolursa lineage (soy ağacı) sayesinde yeniden hesaplanır — replikasyona gerek kalmaz."
          delay={0.0}
          accent="#22c55e"
        />
        <FeatureCard
          icon={Network}
          title="Distributed (dağıtık)"
          desc="Veri partition&apos;lara bölünüp küme düğümlerine yayılır; her partition paralel işlenir."
          delay={0.1}
          accent="#2563eb"
        />
        <FeatureCard
          icon={Database}
          title="Dataset (veri kümesi)"
          desc="Diziler, satırlar, anahtar-değer çiftleri gibi öğelerden oluşan bir koleksiyon."
          delay={0.2}
          accent="#a855f7"
        />
        <FeatureCard
          icon={Repeat}
          title="Immutable (değişmez)"
          desc="RDD&apos;ler değiştirilemez; her transformation yeni bir RDD üretir. Bu, paralelliği güvenli kılar."
          delay={0.3}
          accent="#f59e0b"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 text-[11px] text-gray-500 text-center"
      >
        <span className="bvbb-token">Bugün</span> RDD düşük seviyeli temeldir;
        günlük kullanımda çoğunlukla onun üzerine kurulu DataFrame API&apos;sini
        tercih ederiz (Bölüm 3).
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  12 · TRANSFORMATION vs ACTION + DAG  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Tembel değerlendirme · DAG</Eyebrow>
      <H2 className="mb-2">Transformation vs Action</H2>
      <Sub className="max-w-3xl mb-6">
        Transformation&apos;lar tembeldir: hemen çalışmaz, yalnızca bir plan (DAG)
        kurar. Asıl hesaplama ancak bir action çağrıldığında tetiklenir.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bvbb-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3 text-[#60a5fa]">
            <GitBranch className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Transformation (tembel)</span>
          </div>
          <div className="space-y-2 font-mono text-[11px]">
            <div className="bg-black/40 rounded px-3 py-2 text-gray-300"><span className="text-[#60a5fa]">map</span>(fn)</div>
            <div className="bg-black/40 rounded px-3 py-2 text-gray-300"><span className="text-[#60a5fa]">filter</span>(koşul)</div>
            <div className="bg-black/40 rounded px-3 py-2 text-gray-300"><span className="text-[#60a5fa]">flatMap</span>(fn)</div>
            <div className="bg-black/40 rounded px-3 py-2 text-gray-300"><span className="text-[#60a5fa]">groupByKey</span>() · <span className="text-[#60a5fa]">join</span>()</div>
          </div>
          <div className="text-[11px] text-gray-500 mt-3">Yeni bir RDD/DataFrame döndürür; henüz hiçbir şey hesaplanmaz.</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="bvbb-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fbbf24]">
            <Zap className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Action (tetikler)</span>
          </div>
          <div className="space-y-2 font-mono text-[11px]">
            <div className="bg-black/40 rounded px-3 py-2 text-gray-300"><span className="text-[#fbbf24]">collect</span>()</div>
            <div className="bg-black/40 rounded px-3 py-2 text-gray-300"><span className="text-[#fbbf24]">count</span>()</div>
            <div className="bg-black/40 rounded px-3 py-2 text-gray-300"><span className="text-[#fbbf24]">take</span>(n) · <span className="text-[#fbbf24]">first</span>()</div>
            <div className="bg-black/40 rounded px-3 py-2 text-gray-300"><span className="text-[#fbbf24]">saveAsTextFile</span>(yol)</div>
          </div>
          <div className="text-[11px] text-gray-500 mt-3">Bir sonuç döndürür veya diske yazar; DAG&apos;ı çalıştırır.</div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-5 bvbb-card-sky rounded-lg px-4 py-3 text-[11px] text-gray-300 flex items-center gap-2 justify-center font-mono"
      >
        <span className="text-[#60a5fa]">read</span>
        <ArrowRight className="w-3 h-3 text-gray-600" />
        <span className="text-[#60a5fa]">filter</span>
        <ArrowRight className="w-3 h-3 text-gray-600" />
        <span className="text-[#60a5fa]">map</span>
        <ArrowRight className="w-3 h-3 text-gray-600" />
        <span className="text-[#fbbf24]">count()</span>
        <span className="text-gray-500 ml-1">← burada DAG çalışır</span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  13 · BÖLÜM 3 · API & EKOSİSTEM  ───────────────── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="API ve Ekosistem"
      subtitle="DataFrame ve Spark SQL ile yüksek seviyeli kod; MLlib, Structured Streaming ve GraphX ile tek motor, çok yetenek."
      bgGradient="linear-gradient(135deg, #22c55e 0%, #15803d 100%)"
      shadow="0 20px 60px -10px rgba(34, 197, 94, 0.55)"
      icon={<Boxes className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  14 · EKOSİSTEM KATMANLARI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Birleşik yığın</Eyebrow>
      <H2>Tek çekirdek, dört kütüphane</H2>
      <Sub className="mt-3 max-w-3xl">
        Hepsi aynı Spark Core üzerine kuruludur; bu yüzden SQL sorgusunun çıktısını
        doğrudan bir ML modeline besleyebilirsin — tek dilde, tek motorda.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <FeatureCard
          icon={BarChart3}
          title="Spark SQL & DataFrame"
          desc="Yapılandırılmış veriyi SQL veya DataFrame API ile sorgula; Catalyst iyileştirici planı optimize eder."
          delay={0.0}
          accent="#2563eb"
        />
        <FeatureCard
          icon={Brain}
          title="MLlib"
          desc="Dağıtık makine öğrenmesi: sınıflandırma, regresyon, kümeleme ve öneri algoritmaları."
          delay={0.1}
          accent="#a855f7"
        />
        <FeatureCard
          icon={Activity}
          title="Structured Streaming"
          desc="Gerçek zamanlı veriyi, toplu işlemeyle aynı API ile sürekli akış olarak işle."
          delay={0.2}
          accent="#f59e0b"
        />
        <FeatureCard
          icon={GitBranch}
          title="GraphX"
          desc="Sosyal ağ, yol haritası gibi grafik yapılarında PageRank vb. dağıtık grafik hesaplaması."
          delay={0.3}
          accent="#22c55e"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 bvbb-card rounded-xl p-3 flex items-center justify-center gap-2 text-[11px] font-mono text-gray-400"
      >
        <Layers className="w-4 h-4 text-[#60a5fa]" />
        <span className="text-white">Spark Core</span>
        <span className="text-gray-600">·</span>
        <span>RDD · DAG · zamanlayıcı · bellek yönetimi</span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  15 · PYSPARK SHELL MOCKUP  ───────────────── */
  () => (
    <SlideShell bgPattern={false}>
      <Eyebrow>Canlı çıktı · pyspark</Eyebrow>
      <H2 className="mb-2">DataFrame ile ilk sorgu</H2>
      <Sub className="max-w-3xl mb-6">
        S3&apos;teki bir CSV&apos;yi okuyup filtreliyor, şehre göre gruplayıp
        sayıyoruz. read tembeldir; asıl iş <span className="font-mono text-[#fbbf24]">show()</span> action&apos;ında çalışır.
      </Sub>
      <SparkShellMock />
    </SlideShell>
  ),

  /* ─────────────────  16 · UYGULAMALI LAB  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
      <H2>Bulutta ilk Spark işin</H2>
      <Sub className="mt-3 max-w-3xl">
        AWS EMR (Elastic MapReduce) üzerinde küçük bir küme açıp PySpark ile bir
        veri kümesini işleyeceksin. Sonraki derse çıktının ekran görüntüsüyle gel.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          {
            n: 1,
            t: "EMR kümesi başlat",
            d: "AWS konsolundan tek master + 2 worker&apos;lı küçük bir EMR kümesi aç (Spark uygulaması seçili).",
            icon: Server,
            color: "#f59e0b",
          },
          {
            n: 2,
            t: "Veriyi S3&apos;e yükle",
            d: "Örnek bir CSV (örn. satislar.csv) bucket&apos;a koy; spark.read.csv ile DataFrame&apos;e oku.",
            icon: Database,
            color: "#22c55e",
          },
          {
            n: 3,
            t: "filter + groupBy uygula",
            d: "Bir koşulla filtrele, bir alana göre grupla ve count() ile sonucu show() ettir.",
            icon: Code,
            color: "#2563eb",
          },
          {
            n: 4,
            t: "Spark UI&apos;ı incele",
            d: "4040 portundaki Spark UI&apos;da job, stage ve task ayrımını ve DAG görselini gözlemle.",
            icon: Gauge,
            color: "#a855f7",
          },
        ].map((item, i) => (
          <motion.label
            key={item.n}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className="bvbb-card bvbb-card-hover rounded-xl p-5 flex gap-4 cursor-pointer transition-all"
          >
            <div className="flex flex-col items-center gap-2">
              <input type="checkbox" className="w-5 h-5 accent-[#2563eb] rounded" />
              <span className="text-[10px] font-mono text-gray-500">#{item.n}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <item.icon className="w-4 h-4" style={{ color: item.color }} />
                <div className="text-base font-semibold text-white" dangerouslySetInnerHTML={{ __html: item.t }} />
              </div>
              <p className="text-xs text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.d }} />
            </div>
          </motion.label>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-5 text-[11px] text-gray-500 text-center"
      >
        <span className="bvbb-token">İpucu</span> İşin bitince kümeyi
        sonlandır (terminate) — boşta duran EMR kümesi saatlik ücret yazar.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  17 · NE ÖĞRENDİK · ÖZET  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu haftanın özeti</Eyebrow>
      <H2>Üç cümlede Spark</H2>
      <Sub className="mt-3 max-w-3xl">
        Bugünün anahtar kavramlarını derli toplu hatırlayalım.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[
          { icon: MemoryStick, t: "Bellek-içi motor", d: "Spark ara veriyi RAM&apos;de tutarak iteratif işleri MapReduce&apos;a göre hızlandırır.", color: "#f59e0b" },
          { icon: Boxes, t: "RDD & DAG", d: "Değişmez, dağıtık RDD&apos;ler ve tembel değerlendirilen DAG, çekirdeği oluşturur.", color: "#2563eb" },
          { icon: Layers, t: "Birleşik API", d: "DataFrame, SQL, MLlib, Streaming ve GraphX aynı motoru paylaşır.", color: "#22c55e" },
        ].map((c, i) => (
          <motion.div
            key={c.t}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="bvbb-card rounded-xl p-6"
          >
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center mb-3"
              style={{ background: `${c.color}1f`, border: `1px solid ${c.color}55` }}
            >
              <c.icon className="w-5 h-5" style={{ color: c.color }} />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Check className="w-4 h-4" style={{ color: c.color }} />
              <h3 className="text-base font-semibold text-white">{c.t}</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: c.d }} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 bvbb-card rounded-xl p-4 flex items-start gap-3"
      >
        <X className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-300">
          <span className="bvbb-token">Karıştırma</span> Spark bir depolama veya
          küme yöneticisi değildir; veriyi başkasından okur, başka bir manager
          üzerinde koşar. O yalnızca işleme motorudur.
        </p>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  18 · SIRADAKİ HAFTA + KAPANIŞ  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex w-24 h-24 rounded-3xl items-center justify-center mb-8"
          style={{
            background: "linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)",
            boxShadow: "0 20px 60px -10px rgba(37,99,235,0.6)",
          }}
        >
          <Database className="w-12 h-12 text-white" />
        </motion.div>

        <Eyebrow>11. hafta tamamlandı · sıradaki: NoSQL &amp; Veri Ambarı</Eyebrow>
        <H1>
          <span className="bvbb-shimmer-sky">NoSQL &amp; DWH</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Spark veriyi işliyor; peki nereye yazıyoruz? Hafta 12&apos;de NoSQL
          veritabanları (anahtar-değer, doküman, sütun) ile bulut veri ambarlarını
          ve ne zaman hangisini seçeceğimizi konuşacağız.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="bvbb-card rounded-xl p-5">
            <ListChecks className="w-5 h-5 text-[#60a5fa] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">EMR labı</div>
            <div className="text-sm text-gray-400">PySpark çıktısı + ekran görüntüsü</div>
          </div>
          <div className="bvbb-card rounded-xl p-5">
            <Sparkles className="w-5 h-5 text-[#a855f7] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Okuma</div>
            <div className="text-white font-semibold">Spark belgeleri</div>
            <div className="text-sm text-gray-400">Quick Start · DataFrame bölümü</div>
          </div>
          <div className="bvbb-card rounded-xl p-5">
            <Database className="w-5 h-5 text-[#22c55e] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Sonraki konu</div>
            <div className="text-white font-semibold">NoSQL &amp; DWH</div>
            <div className="text-sm text-gray-400">CAP teoremi · BigQuery · Redshift</div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-10 text-[11px] font-mono text-gray-600"
        >
          BVA 2103 · Büyük Veri İçin Bulut Bilişim · Güz 2026
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

      <div className="absolute bottom-3 right-8 text-[9px] font-mono text-gray-700 z-50 hidden md:flex items-center gap-2">
        <Keyboard className="w-3 h-3" />
        <span>← → · F · Esc</span>
      </div>
    </div>
  );
}
