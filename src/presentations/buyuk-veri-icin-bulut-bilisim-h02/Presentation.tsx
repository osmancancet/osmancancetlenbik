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
  Database,
  Server,
  Cloud,
  Gauge,
  Shapes,
  ShieldCheck,
  Gem,
  Layers,
  Layers3,
  Network,
  HardDrive,
  Cpu,
  Activity,
  Boxes,
  FileText,
  FileJson,
  Image,
  Table2,
  Smartphone,
  Globe,
  Radio,
  ShoppingCart,
  CreditCard,
  Filter,
  GitBranch,
  BarChart3,
  Brain,
  Terminal,
  Code,
  Check,
  X,
  Target,
  Lightbulb,
  ListChecks,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Sparkles,
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

function DataSourceTile({
  icon: Icon,
  name,
  desc,
  color,
  delay = 0,
}: {
  icon: LucideIcon;
  name: string;
  desc: string;
  color: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bvbb-card bvbb-card-hover rounded-xl p-5 flex flex-col"
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
        style={{ background: `${color}25`, border: `1px solid ${color}66` }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div className="text-base font-semibold text-white">{name}</div>
      <div className="text-xs text-gray-400 mt-1">{desc}</div>
    </motion.div>
  );
}

/* Yapılandırılmış → Yarı → Yapılandırılmamış akış diyagramı */
function DataPipelineDiagram() {
  const stages = [
    {
      icon: Boxes,
      title: "Toplama",
      sub: "Sensör · log · API · clickstream",
      color: "#2563eb",
    },
    {
      icon: Filter,
      title: "Saklama",
      sub: "Data Lake · S3 · HDFS",
      color: "#0ea5e9",
    },
    {
      icon: GitBranch,
      title: "İşleme",
      sub: "Batch (Spark) · Stream (Kafka)",
      color: "#a855f7",
    },
    {
      icon: BarChart3,
      title: "Analiz",
      sub: "SQL · BI · ML modelleri",
      color: "#22c55e",
    },
    {
      icon: Brain,
      title: "Değer",
      sub: "Öngörü · karar · ürün",
      color: "#f59e0b",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-9 gap-2 items-stretch"
    >
      {stages.map((s, i) => (
        <div key={s.title} className="contents">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="md:col-span-1 bvbb-card rounded-xl p-4 flex flex-col items-center text-center"
            style={{ borderColor: `${s.color}55` }}
          >
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center mb-2"
              style={{ background: `${s.color}22`, border: `1px solid ${s.color}66` }}
            >
              <s.icon className="w-5 h-5" style={{ color: s.color }} />
            </div>
            <div className="text-sm font-semibold text-white">{s.title}</div>
            <div className="text-[10px] text-gray-400 mt-1 leading-snug">{s.sub}</div>
          </motion.div>
          {i < stages.length - 1 && (
            <div className="hidden md:flex md:col-span-1 items-center justify-center">
              <ChevronRight className="w-6 h-6 text-[#60a5fa]/60" />
            </div>
          )}
        </div>
      ))}
    </motion.div>
  );
}

/* Spark/PySpark kod & terminal mockup */
function SparkTerminalMock() {
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
          <span>pyspark — count yapısal olmayan log</span>
        </div>
      </div>
      <div className="bvbb-terminal">
        <div>
          <span className="bvbb-term-prompt">student@cluster</span>
          <span className="bvbb-term-dim">:~$</span>{" "}
          <span className="bvbb-term-cmd">pyspark --master local[4]</span>
        </div>
        <div className="bvbb-term-dim">Using Python 3.11 · Spark 3.5.1</div>
        <div className="bvbb-term-dim">SparkSession available as &apos;spark&apos;.</div>
        <div className="mt-2">
          <span className="bvbb-term-key">&gt;&gt;&gt;</span>{" "}
          <span className="bvbb-term-cmd">
            logs = spark.read.text(<span className="bvbb-term-str">&quot;s3://veri-2026/access/*.log&quot;</span>)
          </span>
        </div>
        <div>
          <span className="bvbb-term-key">&gt;&gt;&gt;</span>{" "}
          <span className="bvbb-term-cmd">
            logs.filter(logs.value.contains(<span className="bvbb-term-str">&quot;ERROR&quot;</span>)).count()
          </span>
        </div>
        <div className="bvbb-term-dim mt-1">
          [Stage 2:&gt; (38 + 4) / 64]
        </div>
        <div>
          <span className="bvbb-term-ok">res0: 1_284_507</span>{" "}
          <span className="bvbb-term-dim"># 64 partition, ~3.2 GB log paralel tarandı</span>
        </div>
        <div className="mt-2">
          <span className="bvbb-term-key">&gt;&gt;&gt;</span>{" "}
          <span className="bvbb-term-cmd">
            logs.count()
          </span>{" "}
          <span className="bvbb-term-dim"># toplam satır</span>
        </div>
        <div>
          <span className="bvbb-term-ok">res1: 41_902_336</span>
        </div>
        <div className="mt-2">
          <span className="bvbb-term-key">&gt;&gt;&gt;</span>{" "}
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
        <Eyebrow>BVA 2103 · 2. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="bvbb-shimmer">Büyük Veri</span>
          <br />
          <span className="text-white">Kavramlarına Genel Bakış</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          &quot;Büyük veri&quot; tam olarak ne demek? Bu hafta tanımı, 5V modelini,
          veri tiplerini ve klasik araçların neden yetmediğini netleştiriyoruz.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {[
            { name: "5V Modeli", tag: "Tanım çerçevesi", color: "#2563eb", icon: Layers3 },
            { name: "Veri Tipleri", tag: "Yapılı · yarı · yapısız", color: "#a855f7", icon: Shapes },
            { name: "Değer Zinciri", tag: "Ham veri → karar", color: "#22c55e", icon: GitBranch },
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
      <Eyebrow>Köprü · 1. haftadan 2. haftaya</Eyebrow>
      <H2>Altyapıyı kurduk; şimdi üzerinde çalışacağımız veriyi tanıyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta bulutun ne olduğunu, hizmet ve dağıtım modellerini gördük.
        Bu hafta o bulutun neden var olduğuna bakıyoruz: klasik bir veritabanına
        sığmayan, hızlı akan ve düzensiz veri.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bvbb-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#60a5fa]">
            <Cloud className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Geçen hafta · bildiğimiz</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#2563eb] flex-shrink-0" />Bulut = on-demand, ölçeklenebilir kaynak.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#2563eb] flex-shrink-0" />IaaS · PaaS · SaaS katmanları.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#2563eb] flex-shrink-0" />S3, EC2, RDS gibi temel hizmetler.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="bvbb-card-sky rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#7dd3fc]">
            <Database className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu hafta · soracağımız</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#0ea5e9] flex-shrink-0" />Bir veri ne zaman &quot;büyük veri&quot; olur?</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#0ea5e9] flex-shrink-0" />Veri hangi tiplerde, nereden gelir?</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#0ea5e9] flex-shrink-0" />Tek bir MySQL neden çuvallar?</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3 · BÜYÜK VERİ NEDİR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Tanım</Eyebrow>
      <H2>
        &quot;Büyük veri&quot; bir <span className="bvbb-shimmer-sky">boyut</span> değil, bir <span className="bvbb-shimmer-sky">durum</span>dur
      </H2>
      <Sub className="mt-3 max-w-3xl">
        Büyük veri; hacim, hız veya çeşitliliği yüzünden geleneksel veritabanı ve
        tek-makine araçlarıyla makul sürede saklanamayan, işlenemeyen ve
        analiz edilemeyen veri kümeleridir. Sınır mutlak değildir — araca göre değişir.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={HardDrive}
          title="Tek makineye sığmaz"
          desc="Veri, tek bir sunucunun disk/RAM kapasitesini aşar; dağıtık depolama gerekir (HDFS, S3)."
          delay={0.0}
          accent="#2563eb"
        />
        <FeatureCard
          icon={Cpu}
          title="Tek çekirdek yetmez"
          desc="İşleme tek bir CPU'da makul sürede bitmez; paralel/dağıtık hesaplama şart olur (Spark)."
          delay={0.1}
          accent="#a855f7"
        />
        <FeatureCard
          icon={Activity}
          title="Klasik şema dar gelir"
          desc="Veri sürekli akar ve düzensizdir; sabit tablo şeması her zaman uymaz, esneklik gerekir."
          delay={0.2}
          accent="#22c55e"
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
          <span className="bvbb-token">Pratik kural</span> Bir iş yükü, &quot;tek makinede
          akşama kadar bitmiyorsa&quot; veya &quot;tek diske sığmıyorsa&quot; pratikte büyük veri
          problemine dönüşmüştür.
        </p>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  4 · BÖLÜM 1 · 5V MODELİ  ───────────────── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="5V Modeli"
      subtitle="Volume, Velocity, Variety, Veracity, Value — büyük veriyi tanımlayan beş eksen ve her birinin getirdiği teknik sorun."
      bgGradient="linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)"
      shadow="0 20px 60px -10px rgba(37, 99, 235, 0.6)"
      icon={<Layers3 className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  5 · 5V KARTLARI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>5V · büyük verinin beş ekseni</Eyebrow>
      <H2>Volume · Velocity · Variety · Veracity · Value</H2>
      <Sub className="mt-3 max-w-3xl">
        3V (Volume, Velocity, Variety) klasik tanımdı; sonradan veri kalitesi
        (Veracity) ve iş değeri (Value) eklenerek 5V oldu.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={Database}
          title="Volume · Hacim"
          desc="Verinin büyüklüğü — GB değil TB, PB ölçeği. Çözüm: dağıtık depolama ve bölümleme (partition)."
          delay={0.0}
          accent="#2563eb"
        />
        <FeatureCard
          icon={Gauge}
          title="Velocity · Hız"
          desc="Verinin üretilme/işlenme hızı. Batch yetmediğinde stream işleme (Kafka, Flink) devreye girer."
          delay={0.1}
          accent="#0ea5e9"
        />
        <FeatureCard
          icon={Shapes}
          title="Variety · Çeşitlilik"
          desc="Yapılı tablo + JSON + log + görüntü + ses. Tek şema yetmez; şema-okuma (schema-on-read) yaklaşımı."
          delay={0.2}
          accent="#a855f7"
        />
        <FeatureCard
          icon={ShieldCheck}
          title="Veracity · Doğruluk"
          desc="Verinin güvenilirliği, eksik/gürültülü kayıtlar. Temizleme ve doğrulama olmadan analiz yanıltır."
          delay={0.3}
          accent="#f59e0b"
        />
        <FeatureCard
          icon={Gem}
          title="Value · Değer"
          desc="Asıl amaç: ham veriden iş kararı, öngörü veya ürün üretmek. Değer üretmeyen veri sadece maliyettir."
          delay={0.4}
          accent="#22c55e"
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bvbb-card-sky rounded-xl p-6 flex flex-col justify-center"
        >
          <Sparkles className="w-6 h-6 text-[#60a5fa] mb-3" />
          <div className="text-white font-semibold text-base mb-1">3V → 5V</div>
          <div className="text-xs text-gray-400">
            İlk üç V veriyi tanımlar; son iki V onu işe yarar kılar.
            Bir kaynak çoğu zaman birden fazla V&apos;de zorlar.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  6 · ÖLÇEK TABLOSU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Volume · ölçek sezgisi</Eyebrow>
      <H2>Byte&apos;tan Petabyte&apos;a</H2>
      <Sub className="mt-3 max-w-3xl">
        &quot;Büyük&quot; görelidir; ama ölçek merdivenini bilmek hangi araca ihtiyaç
        olduğunu kestirmeyi kolaylaştırır. Her basamak bir öncekinin ~1000 katıdır.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 bvbb-card rounded-xl overflow-hidden"
      >
        <table className="bvbb-tbl">
          <thead>
            <tr>
              <th style={{ width: "16%" }}>Birim</th>
              <th style={{ width: "22%" }}>Yaklaşık karşılık</th>
              <th style={{ width: "28%" }}>Tipik örnek</th>
              <th>Uygun araç (kabaca)</th>
            </tr>
          </thead>
          <tbody>
            {[
              { u: "MB", a: "10⁶ byte", e: "Bir fotoğraf, kısa bir CSV", t: "Excel · Pandas (tek makine)" },
              { u: "GB", a: "10⁹ byte", e: "Bir film, orta bir veritabanı", t: "PostgreSQL · tek sunucu" },
              { u: "TB", a: "10¹² byte", e: "Yıllık kurumsal log arşivi", t: "Kolonsal DB · Spark başlar" },
              { u: "PB", a: "10¹⁵ byte", e: "Büyük platform kullanıcı verisi", t: "Hadoop/Spark · Data Lake" },
              { u: "EB", a: "10¹⁸ byte", e: "Küresel servis ölçeği", t: "Çok bölgeli dağıtık sistemler" },
            ].map((row, i) => (
              <motion.tr
                key={row.u}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <td className="font-mono font-bold text-[#93c5fd]">{row.u}</td>
                <td className="font-mono text-gray-400">{row.a}</td>
                <td className="text-gray-300">{row.e}</td>
                <td className="text-[#93c5fd]">{row.t}</td>
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
        <span className="bvbb-token">Not</span> Sınırlar kesin değildir; aynı 1 TB
        veri basit bir filtreyle Pandas&apos;ta, karmaşık bir birleştirmeyle Spark
        gerektirebilir.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  7 · VELOCITY · BATCH vs STREAM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Velocity · işleme modeli</Eyebrow>
      <H2>Batch vs Stream</H2>
      <Sub className="mt-3 max-w-3xl">
        Verinin hızı, onu nasıl işleyeceğini belirler. Toplu (batch) işleme
        biriken veriyi periyodik işler; akış (stream) işleme veri geldikçe işler.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bvbb-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#60a5fa]">
            <Layers className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Batch · toplu</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Veri birikir, planlı çalışır (örn. her gece).</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Yüksek hacimde verimli, basit.</li>
            <li className="flex gap-2"><X className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Sonuç gecikmeli (saatler).</li>
            <li className="flex gap-2 text-gray-500"><ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />Araç: Spark batch · MapReduce</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="bvbb-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#7dd3fc]">
            <Radio className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Stream · akış</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Veri geldikçe anında işlenir.</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Düşük gecikme (saniye-altı).</li>
            <li className="flex gap-2"><X className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Kurulumu ve hata yönetimi daha karmaşık.</li>
            <li className="flex gap-2 text-gray-500"><ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />Araç: Kafka · Spark Streaming · Flink</li>
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-5 text-[11px] text-gray-500 text-center"
      >
        Örnek: Dolandırıcılık tespiti stream ister (anlık); aylık satış raporu
        batch ile yeter.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  8 · BÖLÜM 2 · VERİ TİPLERİ & KAYNAKLAR  ───────────────── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Veri Tipleri ve Kaynakları"
      subtitle="Yapılandırılmış, yarı-yapılandırılmış, yapılandırılmamış — ve bu verinin nereden, ne hızda aktığı."
      bgGradient="linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)"
      shadow="0 20px 60px -10px rgba(124, 58, 237, 0.6)"
      icon={<Shapes className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  9 · ÜÇ VERİ TİPİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Variety · üç temel tip</Eyebrow>
      <H2>Yapılandırılmış · Yarı · Yapılandırılmamış</H2>
      <Sub className="mt-3 max-w-3xl">
        Büyük verinin tahmini olarak büyük çoğunluğu yapılandırılmamış veridir
        (metin, görüntü, ses). Tipi bilmek, doğru depo ve aracı seçmeni sağlar.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[
          {
            tier: "Yapılandırılmış",
            sub: "Structured",
            color: "#2563eb",
            icon: Table2,
            desc: "Sabit şema, satır/sütun. Sorgulaması kolay.",
            ex: ["İlişkisel tablo (SQL)", "Sensör ölçümleri", "Banka işlem kaydı"],
            store: "RDBMS · Data Warehouse",
          },
          {
            tier: "Yarı-yapılandırılmış",
            sub: "Semi-structured",
            color: "#a855f7",
            icon: FileJson,
            desc: "Şema esnek, etiketli/iç içe yapı.",
            ex: ["JSON · XML", "Log satırları", "E-posta başlıkları"],
            store: "NoSQL (MongoDB) · Data Lake",
          },
          {
            tier: "Yapılandırılmamış",
            sub: "Unstructured",
            color: "#22c55e",
            icon: Image,
            desc: "Şemasız ham içerik; önce işlenmeli.",
            ex: ["Metin · sosyal medya", "Görüntü · video", "Ses kaydı"],
            store: "Object Storage (S3) · Data Lake",
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
            <p className="text-xs text-gray-400 mb-3">{m.desc}</p>

            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Örnekler</div>
            <ul className="space-y-1 mb-3">
              {m.ex.map((e) => (
                <li key={e} className="text-xs text-gray-300 flex items-center gap-1.5">
                  <Check className="w-3 h-3 flex-shrink-0" style={{ color: m.color }} />
                  {e}
                </li>
              ))}
            </ul>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Tipik depo</div>
            <div className="text-xs font-medium" style={{ color: m.color }}>{m.store}</div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  10 · VERİ KAYNAKLARI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Veri nereden geliyor?</Eyebrow>
      <H2>Modern veri kaynakları</H2>
      <Sub className="mt-3 max-w-3xl">
        Büyük veri tek bir yerden değil, sürekli üreten çok sayıda kaynaktan
        akar. Her kaynak farklı bir tipte ve hızda veri getirir.
      </Sub>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        <DataSourceTile
          icon={Smartphone}
          name="Mobil & uygulama"
          desc="Clickstream, oturum olayları, konum verisi."
          color="#2563eb"
          delay={0.0}
        />
        <DataSourceTile
          icon={Radio}
          name="IoT & sensör"
          desc="Sürekli telemetri; yüksek hız, küçük paket."
          color="#0ea5e9"
          delay={0.08}
        />
        <DataSourceTile
          icon={Globe}
          name="Web & sosyal medya"
          desc="Metin, görüntü, etkileşim; yapılandırılmamış."
          color="#a855f7"
          delay={0.16}
        />
        <DataSourceTile
          icon={ShoppingCart}
          name="E-ticaret & işlem"
          desc="Sipariş, sepet, stok; yapılandırılmış akış."
          color="#22c55e"
          delay={0.24}
        />
        <DataSourceTile
          icon={CreditCard}
          name="Finans & ödeme"
          desc="İşlem akışı; doğruluk ve gecikme kritik."
          color="#f59e0b"
          delay={0.32}
        />
        <DataSourceTile
          icon={FileText}
          name="Sistem logları"
          desc="Sunucu/uygulama logu; yarı-yapılandırılmış."
          color="#ef4444"
          delay={0.40}
        />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  11 · BÖLÜM 3 · DEĞER ZİNCİRİ  ───────────────── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Değer Zinciri ve Ekosistem"
      subtitle="Ham veriden iş değerine: toplama → saklama → işleme → analiz; ve klasik araçların neden bu zinciri taşıyamadığı."
      bgGradient="linear-gradient(135deg, #0ea5e9 0%, #22d3ee 100%)"
      shadow="0 20px 60px -10px rgba(14, 165, 233, 0.6)"
      icon={<GitBranch className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  12 · VERİ DEĞER ZİNCİRİ DİYAGRAMI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Veri değer zinciri (data pipeline)</Eyebrow>
      <H2>Ham veriden değere beş adım</H2>
      <Sub className="mt-3 max-w-3xl">
        Büyük veri tek bir araç değil, bir hattır. Her aşama bir öncekinin
        çıktısını alır; bulut, bu hattın her adımı için yönetilen bir hizmet sunar.
      </Sub>
      <div className="mt-10">
        <DataPipelineDiagram />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-8 text-[11px] text-gray-500 text-center font-mono"
      >
        Toplama → Saklama → İşleme → Analiz → Değer · Bu hattı önümüzdeki haftalarda tek tek kuracağız.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  13 · KLASİK vs BÜYÜK VERİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Karşılaştırma · neden yeni araçlar?</Eyebrow>
      <H2>Klasik veri işleme vs Büyük veri</H2>
      <Sub className="mt-3 max-w-3xl">
        Tek bir güçlü sunucuyu büyütmek (scale-up) bir noktada para ve fizik
        sınırına çarpar; büyük veri yatay ölçeklemeye (scale-out) dayanır.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 bvbb-card rounded-xl overflow-hidden"
      >
        <table className="bvbb-tbl">
          <thead>
            <tr>
              <th style={{ width: "24%" }}>Boyut</th>
              <th style={{ width: "38%" }}>
                <Server className="inline w-4 h-4 mr-1.5 -mt-0.5" />
                Klasik (tek makine)
              </th>
              <th>
                <Boxes className="inline w-4 h-4 mr-1.5 -mt-0.5 text-[#60a5fa]" />
                Büyük veri (dağıtık)
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              { k: "Ölçekleme", op: "Scale-up: daha güçlü tek sunucu", cl: "Scale-out: çok sayıda ucuz düğüm" },
              { k: "Depolama", op: "Tek disk / tek DB", cl: "Dağıtık dosya sistemi (HDFS, S3)" },
              { k: "İşleme", op: "Tek süreç, dikey sınır", cl: "Paralel görevler (Spark, MapReduce)" },
              { k: "Şema", op: "Schema-on-write (önce tanımla)", cl: "Schema-on-read (okurken yorumla)" },
              { k: "Hata toleransı", op: "Sunucu ölürse iş durur", cl: "Replikasyon + yeniden deneme" },
            ].map((row, i) => (
              <motion.tr
                key={row.k}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <td className="font-medium text-white">{row.k}</td>
                <td className="text-gray-400">{row.op}</td>
                <td className="text-[#93c5fd]">{row.cl}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  14 · SPARK TERMINAL MOCKUP  ───────────────── */
  () => (
    <SlideShell bgPattern={false}>
      <Eyebrow>Somut örnek · paralel işleme</Eyebrow>
      <H2 className="text-center md:text-left">41 milyon satırı saniyelerde saymak</H2>
      <Sub className="mt-3 max-w-3xl">
        Aşağıda PySpark, ~3 GB&apos;lık logu 64 parçaya bölüp 4 çekirdekte paralel
        tarıyor. Aynı işi tek bir Python döngüsüyle yapmak çok daha uzun sürerdi —
        büyük verinin fikri tam olarak budur.
      </Sub>
      <div className="mt-7">
        <SparkTerminalMock />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  15 · VAKA ÇALIŞMALARI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Value · gerçek dünyada</Eyebrow>
      <H2>Büyük veri ne işe yarıyor?</H2>
      <Sub className="mt-3 max-w-3xl">
        5V&apos;nin son harfi Value; teknik zinciri değer üreten kararlara
        bağlar. Tanıdık örnekler:
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <FeatureCard
          icon={Brain}
          title="Öneri sistemleri"
          desc="İzleme/satın alma geçmişinden kişiselleştirilmiş öneri — video, müzik, ürün platformlarının çekirdeği."
          delay={0.0}
          accent="#a855f7"
        />
        <FeatureCard
          icon={ShieldCheck}
          title="Dolandırıcılık tespiti"
          desc="Anlık işlem akışında anormal davranışı yakalama; düşük gecikme şart (stream işleme)."
          delay={0.1}
          accent="#ef4444"
        />
        <FeatureCard
          icon={Gauge}
          title="Talep & rota tahmini"
          desc="Konum ve talep verisiyle gerçek zamanlı fiyatlama ve yönlendirme (ulaşım, lojistik)."
          delay={0.2}
          accent="#0ea5e9"
        />
        <FeatureCard
          icon={Activity}
          title="Kestirimci bakım"
          desc="Sensör telemetrisinden arıza tahmini; makine bozulmadan önce müdahale (endüstri, enerji)."
          delay={0.3}
          accent="#22c55e"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 text-[11px] text-gray-500 text-center"
      >
        Ortak nokta: hepsi çok sayıda kaynaktan akan veriyi bulutta toplayıp
        modelliyor.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  16 · UYGULAMALI · BU HAFTA YAPILACAKLAR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Hafta 2 · uygulamalı görev</Eyebrow>
      <H2>Bir veri setini 5V ile sınıflandır</H2>
      <Sub className="mt-3 max-w-3xl">
        Açık bir veri seti seç (örn. data.gov.tr veya Kaggle&apos;dan herkese açık
        bir set) ve aşağıdaki dört adımı kısa bir rapora yaz.
      </Sub>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            n: 1,
            t: "Veri setini seç ve indir",
            d: "Tercihen birden çok tip içeren bir set (örn. CSV + metin yorum alanı).",
            icon: Database,
            color: "#2563eb",
          },
          {
            n: 2,
            t: "Tipini belirle",
            d: "Yapılandırılmış / yarı / yapılandırılmamış mı? Sütun ve örnek satırlarla gerekçelendir.",
            icon: Shapes,
            color: "#a855f7",
          },
          {
            n: 3,
            t: "5V üzerinden değerlendir",
            d: "Volume, Velocity, Variety, Veracity, Value eksenlerinde 1-2 cümle ile konumlandır.",
            icon: Layers3,
            color: "#0ea5e9",
          },
          {
            n: 4,
            t: "Uygun araç öner",
            d: "Pandas mı, yoksa Spark/Data Lake mı? Neden? Ölçek tablosuna referans ver.",
            icon: ListChecks,
            color: "#22c55e",
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
              <input
                type="checkbox"
                className="w-5 h-5 accent-[#2563eb] rounded"
              />
              <span className="text-[10px] font-mono text-gray-500">#{item.n}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <item.icon className="w-4 h-4" style={{ color: item.color }} />
                <div className="text-base font-semibold text-white">{item.t}</div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{item.d}</p>
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
        <span className="bvbb-token">İpucu</span> İndirdiğin seti geçen hafta
        oluşturduğun S3 bucket&apos;ına yüklersen, sonraki haftalarda bulutta işleyebilirsin.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  17 · KOD ÖZETİ · 3 TİP TEK BAKIŞTA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Tek bakışta · üç tip, üç format</Eyebrow>
      <H2 className="mb-2">Aynı kayıt, üç farklı biçimde</H2>
      <Sub className="max-w-3xl mb-6">
        Bir kullanıcının &quot;giriş yaptı&quot; olayı; yapılandırılmış tablo
        satırı, yarı-yapılandırılmış JSON ve yapılandırılmamış log satırı olarak
        nasıl görünür?
      </Sub>

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
            <Code className="w-3 h-3" />
            <span>login_event · üç biçim</span>
          </div>
        </div>
        <div className="bvbb-terminal">
          <div className="bvbb-term-warn"># 1) Yapılandırılmış — SQL tablosu satırı</div>
          <div>
            <span className="bvbb-term-key">user_id</span> | <span className="bvbb-term-key">event</span> | <span className="bvbb-term-key">ts</span>
          </div>
          <div className="bvbb-term-dim">1042 | login | 2026-06-26 09:14:02</div>
          <div className="mt-3 bvbb-term-warn"># 2) Yarı-yapılandırılmış — JSON</div>
          <div>
            <span className="bvbb-term-dim">{"{"}</span> <span className="bvbb-term-key">&quot;user_id&quot;</span>: <span className="bvbb-term-ok">1042</span>,{" "}
            <span className="bvbb-term-key">&quot;event&quot;</span>: <span className="bvbb-term-str">&quot;login&quot;</span>,{" "}
            <span className="bvbb-term-key">&quot;ts&quot;</span>: <span className="bvbb-term-str">&quot;2026-06-26T09:14:02Z&quot;</span> <span className="bvbb-term-dim">{"}"}</span>
          </div>
          <div className="mt-3 bvbb-term-warn"># 3) Yapılandırılmamış — ham log satırı</div>
          <div className="bvbb-term-dim">
            2026-06-26 09:14:02 INFO auth: user 1042 logged in from 10.0.3.51 (ua: Chrome/126)
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 text-[11px] text-gray-500 text-center"
      >
        Aynı bilgi; soldan sağa şema gevşer, esneklik artar ama sorgulamak zorlaşır.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  18 · SIRADAKİ HAFTA + KAPANIŞ  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8"
          style={{
            background: "linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)",
            boxShadow: "0 20px 60px -10px rgba(37,99,235,0.6)",
          }}
        >
          <Layers3 className="w-12 h-12 text-white" />
        </motion.div>

        <Eyebrow>2. hafta tamamlandı · sıradaki: Hizmet Modelleri</Eyebrow>
        <H1>
          <span className="bvbb-shimmer">IaaS · PaaS · SaaS</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Büyük verinin ne olduğunu ve neden buluta ihtiyaç duyduğunu gördük.
          Hafta 3&apos;te bulut hizmet modellerini derinleştirip, bu zinciri hangi
          katmanda kuracağımıza karar veriyoruz.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto">
          <FeatureCard
            icon={Layers}
            title="Üç katman"
            desc="Altyapı, platform, yazılım — kim neyi yönetir?"
            accent="#2563eb"
            delay={0.1}
          />
          <FeatureCard
            icon={Network}
            title="Sorumluluk paylaşımı"
            desc="Shared responsibility: senin ve sağlayıcının payı."
            accent="#a855f7"
            delay={0.2}
          />
          <FeatureCard
            icon={Target}
            title="Doğru seçim"
            desc="Hangi büyük veri işine hangi katman uygun?"
            accent="#22c55e"
            delay={0.3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="bvbb-card rounded-xl p-5">
            <Calendar className="w-5 h-5 text-[#60a5fa] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Ders saati</div>
            <div className="text-white font-semibold">Çarşamba</div>
            <div className="text-sm text-gray-400">09:55 — 12:30</div>
          </div>
          <div className="bvbb-card rounded-xl p-5">
            <Target className="w-5 h-5 text-[#a855f7] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">Veri seti + S3</div>
            <div className="text-sm text-gray-400">indirip yükleyerek gel</div>
          </div>
          <div className="bvbb-card rounded-xl p-5">
            <ListChecks className="w-5 h-5 text-[#22c55e] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">5V raporu</div>
            <div className="text-sm text-gray-400">4 adım + araç önerisi</div>
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
          BVA 2103 · 2. Hafta · Büyük Veri Kavramları
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
