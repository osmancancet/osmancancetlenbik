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
  Cloud,
  Database,
  Layers,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  X,
  Zap,
  Target,
  Lightbulb,
  HardDrive,
  Network,
  Boxes,
  Split,
  Filter,
  GitBranch,
  RefreshCw,
  Save,
  Cpu,
  Terminal,
  Workflow,
  ArrowRight,
  AlertTriangle,
  Repeat,
  Server,
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

function SparkShellWindow({
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
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
          style={{ background: "#0a0e16", color: "#60a5fa" }}
        >
          <Terminal className="w-3 h-3" />
          <span>{title}</span>
        </div>
      </div>
      <div className="bvbb-terminal">{children}</div>
    </motion.div>
  );
}

function LineageDiagram() {
  const stages = [
    { name: "textFile", label: "logs.txt → satırlar", kind: "kaynak", color: "#60a5fa", icon: HardDrive },
    { name: "filter", label: "ERROR içerenler", kind: "transformasyon", color: "#a855f7", icon: Filter },
    { name: "map", label: "satır → (tarih, 1)", kind: "transformasyon", color: "#a855f7", icon: Split },
    { name: "reduceByKey", label: "tarihe göre topla", kind: "transformasyon (shuffle)", color: "#f59e0b", icon: GitBranch },
    { name: "collect", label: "sonucu sürücüye getir", kind: "eylem", color: "#22c55e", icon: Target },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bvbb-card rounded-xl p-6"
    >
      <div className="flex flex-col md:flex-row md:items-stretch gap-3">
        {stages.map((s, i) => (
          <div key={s.name} className="flex-1 flex md:flex-col items-center gap-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.12 }}
              className="w-full rounded-lg p-3 text-center"
              style={{ background: `${s.color}14`, border: `1px solid ${s.color}55` }}
            >
              <s.icon className="w-5 h-5 mx-auto mb-2" style={{ color: s.color }} />
              <div className="font-mono text-sm font-bold text-white">{s.name}</div>
              <div className="text-[11px] text-gray-400 mt-1">{s.label}</div>
              <div
                className="mt-2 text-[9px] font-mono uppercase tracking-wider inline-block px-2 py-0.5 rounded"
                style={{ background: `${s.color}1f`, color: s.color }}
              >
                {s.kind}
              </div>
            </motion.div>
            {i < stages.length - 1 && (
              <ArrowRight
                className="w-5 h-5 text-gray-600 flex-shrink-0 rotate-90 md:rotate-0"
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-5 text-[11px] text-gray-500 flex items-start gap-2">
        <Lightbulb className="w-4 h-4 text-[#60a5fa] flex-shrink-0 mt-0.5" />
        <span>
          Soldan sağa zincire <span className="bvbb-token">lineage</span> (soyağacı)
          denir. Transformasyonlar tembeldir (lazy); hiçbir hesap <span className="text-white">collect</span> eylemi
          çağrılana kadar gerçekleşmez.
        </span>
      </div>
    </motion.div>
  );
}

function PartitionDiagram() {
  const parts = [
    { id: "P0", rows: ["sat-1", "sat-2", "sat-3"], node: "worker-01" },
    { id: "P1", rows: ["sat-4", "sat-5", "sat-6"], node: "worker-01" },
    { id: "P2", rows: ["sat-7", "sat-8", "sat-9"], node: "worker-02" },
    { id: "P3", rows: ["sat-10", "sat-11", "sat-12"], node: "worker-02" },
  ];
  const colors = ["#60a5fa", "#a855f7", "#22c55e", "#f59e0b"];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bvbb-card rounded-xl p-6"
    >
      <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-widest text-gray-400">
        <Boxes className="w-4 h-4 text-[#60a5fa]" />
        <span>RDD — 4 parça · 2 düğüme dağıtık</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {parts.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="rounded-lg p-3"
            style={{ background: `${colors[i]}12`, border: `1px solid ${colors[i]}55` }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-sm font-bold" style={{ color: colors[i] }}>
                {p.id}
              </span>
              <span className="text-[9px] font-mono text-gray-500 flex items-center gap-1">
                <Server className="w-3 h-3" /> {p.node}
              </span>
            </div>
            <div className="space-y-1">
              {p.rows.map((r) => (
                <div
                  key={r}
                  className="text-[11px] font-mono text-gray-300 bg-black/30 rounded px-2 py-0.5"
                >
                  {r}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-5 text-[11px] text-gray-500 flex items-start gap-2">
        <Cpu className="w-4 h-4 text-[#60a5fa] flex-shrink-0 mt-0.5" />
        <span>
          Her parça (partition) bir görev (task) olarak <span className="text-white">paralel</span> işlenir.
          Paralellik seviyesi kabaca parça sayısı kadardır — bu yüzden parça sayısı performansı doğrudan etkiler.
        </span>
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
        <Eyebrow>BVA 2103 · 12. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="bvbb-shimmer">Spark RDD&apos;leri</span>
          <br />
          <span className="text-white">Dayanıklı Dağıtık Veri Kümeleri</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Apache Spark&apos;ın çekirdeği: bellekte tutulan, parçalara bölünmüş ve
          kaybolduğunda kendini yeniden inşa edebilen dağıtık koleksiyonlar.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {[
            { name: "Resilient", tag: "Lineage ile kurtarma", color: "#22c55e", icon: RefreshCw },
            { name: "Distributed", tag: "Düğümlere parçalı", color: "#2563eb", icon: Network },
            { name: "Dataset", tag: "Değişmez koleksiyon", color: "#a855f7", icon: Database },
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
      <Eyebrow>Köprü · 11. haftadan 12. haftaya</Eyebrow>
      <H2>Spark&apos;ı tanıdık; şimdi onun veri yapısına iniyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta Apache Spark&apos;ın mimarisini (driver, executor, cluster
        manager) ve MapReduce&apos;a göre neden çok daha hızlı olduğunu gördük.
        Bu hafta &ldquo;hızlı&rdquo;yı mümkün kılan temel soyutlamayı açıyoruz: RDD.
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
            <span className="text-xs font-mono uppercase tracking-widest">MapReduce&apos;ta</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#60a5fa] flex-shrink-0" />Her adım ara sonucu diske yazar.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#60a5fa] flex-shrink-0" />Iteratif işler (ML, graf) çok yavaş.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#60a5fa] flex-shrink-0" />Disk I/O darboğaz oluşturur.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="bvbb-card-sky rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <Zap className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">RDD ile</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Ara veriler bellekte (RAM) tutulabilir.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Aynı veri tekrar tekrar diske okunmaz.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Lineage sayesinde diske yedek yazmadan dayanıklılık.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3 · DERSİN AKIŞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: RDD nedir → işlemler → dayanıklılık</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce RDD&apos;nin ne olduğunu ve özelliklerini tanımlıyoruz; sonra
        transformasyon/eylem ayrımını ve tembel değerlendirmeyi işliyoruz; en son
        lineage ile hata toleransına bakıp küçük bir uygulamalı lab yapıyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            range: "01",
            title: "RDD Nedir?",
            items: ["Tanım ve 3 temel özellik", "Parçalanma (partitioning)", "Değişmezlik (immutability)"],
            icon: Database,
            accent: "#60a5fa",
          },
          {
            range: "02",
            title: "İşlemler",
            items: ["Transformasyon vs eylem", "Tembel değerlendirme (lazy)", "map · filter · reduceByKey"],
            icon: Workflow,
            accent: "#a855f7",
          },
          {
            range: "03",
            title: "Dayanıklılık",
            items: ["Lineage (soyağacı)", "Hata toleransı", "persist / cache"],
            icon: RefreshCw,
            accent: "#22c55e",
          },
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
                <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: g.accent }}>
                  Durak {g.range}
                </div>
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

  /* ─────────────────  4 · BÖLÜM 1 · RDD NEDİR  ───────────────── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="RDD Nedir?"
      subtitle="Resilient Distributed Dataset — Spark&apos;ın en temel, değişmez ve parçalara bölünmüş dağıtık koleksiyonu."
      bgGradient="linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)"
      shadow="0 20px 60px -10px rgba(37, 99, 235, 0.6)"
      icon={<Database className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  5 · İSMİN AÇILIMI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>R · D · D — ismin üç sözü</Eyebrow>
      <H2>Her harf bir tasarım kararı</H2>
      <Sub className="mt-3 max-w-3xl">
        RDD&apos;nin adı tesadüf değil; üç kelime de Spark&apos;ın bir özelliğini
        tanımlar. Bu üçlüyü anlarsan geri kalan her şey üzerine oturur.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={RefreshCw}
          title="Resilient — Dayanıklı"
          desc="Bir parça kaybolursa (düğüm çökerse) Spark onu lineage kaydından yeniden hesaplar; veriyi kopyalamaya gerek yoktur."
          delay={0.0}
          accent="#22c55e"
        />
        <FeatureCard
          icon={Network}
          title="Distributed — Dağıtık"
          desc="Veri tek makineye sığmaz; parçalara bölünüp küme içindeki birden çok düğümün belleğine yayılır."
          delay={0.1}
          accent="#2563eb"
        />
        <FeatureCard
          icon={Database}
          title="Dataset — Veri Kümesi"
          desc="Üzerinde paralel işlem yapılabilen, kayıtlardan oluşan değişmez (immutable) bir koleksiyondur."
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
          <span className="bvbb-token">Tanım</span> RDD; küme üzerinde paralel
          işlenebilen, parçalara bölünmüş, hataya dayanıklı ve değişmez bir kayıt
          koleksiyonudur. Spark&apos;ın 2012&apos;deki orijinal akademik makalesinde
          tanıtılan çekirdek soyutlamadır.
        </p>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  6 · DEĞİŞMEZLİK  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Değişmezlik · immutability</Eyebrow>
      <H2>RDD&apos;yi değiştiremezsin — yenisini üretirsin</H2>
      <Sub className="mt-3 max-w-3xl">
        Bir RDD bir kez oluştuğunda içeriği asla değişmez. Her transformasyon,
        mevcut RDD&apos;den <span className="text-white">yeni</span> bir RDD türetir.
        Bu, paralel ve hataya dayanıklı çalışmayı güvenli kılan kuraldır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bvbb-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#22c55e]">
            <Check className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Neden işe yarar</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Aynı RDD&apos;yi birden çok görev güvenle paylaşır (kilit yok).</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Kaybolan parça baştan hesaplanabilir; eski hâl bozulmaz.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Sonuç tekrar üretilebilir (deterministik) olur.</li>
          </ul>
        </motion.div>
        <SparkShellWindow title="pyspark — değişmezlik">
          <div>
            <span className="bvbb-term-prompt">&gt;&gt;&gt;</span>{" "}
            <span className="bvbb-term-cmd">sayilar = sc.parallelize([1, 2, 3, 4])</span>
          </div>
          <div>
            <span className="bvbb-term-prompt">&gt;&gt;&gt;</span>{" "}
            <span className="bvbb-term-cmd">kareler = sayilar.map(lambda x: x * x)</span>
          </div>
          <div className="bvbb-term-dim">
            # sayilar DEĞİŞMEDİ; map yeni bir RDD döndürdü
          </div>
          <div>
            <span className="bvbb-term-prompt">&gt;&gt;&gt;</span>{" "}
            <span className="bvbb-term-cmd">sayilar.collect()</span>
          </div>
          <div className="bvbb-term-val">[1, 2, 3, 4]</div>
          <div>
            <span className="bvbb-term-prompt">&gt;&gt;&gt;</span>{" "}
            <span className="bvbb-term-cmd">kareler.collect()</span>
          </div>
          <div className="bvbb-term-val">[1, 4, 9, 16]</div>
          <div className="mt-1">
            <span className="bvbb-term-prompt">&gt;&gt;&gt;</span>{" "}
            <span className="bvbb-term-cmd">_</span>
            <span className="animate-pulse">█</span>
          </div>
        </SparkShellWindow>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  7 · PARÇALANMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Partitioning · parçalanma</Eyebrow>
      <H2 className="mb-2">Bir RDD aslında birçok parçadır</H2>
      <Sub className="max-w-3xl mb-6">
        RDD mantıksal olarak tek koleksiyon görünür; fiziksel olarak parçalara
        (partition) bölünür ve bu parçalar düğümlerin belleğine dağılır. Her
        parça ayrı bir görev olarak paralel işlenir.
      </Sub>
      <PartitionDiagram />
    </SlideShell>
  ),

  /* ─────────────────  8 · BÖLÜM 2 · İŞLEMLER  ───────────────── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Transformasyonlar &amp; Eylemler"
      subtitle="RDD üzerindeki tüm işlemler iki sınıfa ayrılır. Bu ayrım Spark&apos;ın tembel çalışma modelinin kalbidir."
      bgGradient="linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)"
      shadow="0 20px 60px -10px rgba(124, 58, 237, 0.6)"
      icon={<Workflow className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  9 · TRANSFORMASYON vs EYLEM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>İki tür işlem</Eyebrow>
      <H2>Transformasyon mı, eylem mi?</H2>
      <Sub className="mt-3 max-w-3xl">
        Transformasyon yeni bir RDD tarifi üretir ama hemen çalışmaz (tembel).
        Eylem ise hesabı tetikler ve bir sonuç (değer veya dosya) döndürür.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bvbb-card rounded-xl p-6"
          style={{ borderColor: "#a855f755" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: "#a855f725", border: "1px solid #a855f766" }}
            >
              <Workflow className="w-5 h-5" style={{ color: "#a855f7" }} />
            </div>
            <div>
              <div className="text-base font-bold text-white">Transformasyon</div>
              <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">RDD → RDD · tembel</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {["map", "filter", "flatMap", "distinct", "union", "reduceByKey", "groupByKey", "join"].map((op) => (
              <span
                key={op}
                className="text-[11px] font-mono px-2 py-1 rounded bg-white/5 text-[#c4b5fd] border border-white/10 text-center"
              >
                {op}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 border-t border-white/5 pt-3">
            Çağrıldığında sadece &ldquo;ne yapılacağını&rdquo; kaydeder; veriye dokunmaz.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="bvbb-card rounded-xl p-6"
          style={{ borderColor: "#22c55e55" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: "#22c55e25", border: "1px solid #22c55e66" }}
            >
              <Target className="w-5 h-5" style={{ color: "#22c55e" }} />
            </div>
            <div>
              <div className="text-base font-bold text-white">Eylem</div>
              <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">RDD → sonuç · hesabı tetikler</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {["collect", "count", "first", "take", "reduce", "saveAsTextFile", "foreach", "countByKey"].map((op) => (
              <span
                key={op}
                className="text-[11px] font-mono px-2 py-1 rounded bg-white/5 text-[#86efac] border border-white/10 text-center"
              >
                {op}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 border-t border-white/5 pt-3">
            Çağrıldığında biriken tüm transformasyonlar kümede gerçekten çalışır.
          </p>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  10 · TEMBEL DEĞERLENDİRME  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Lazy evaluation · tembel değerlendirme</Eyebrow>
      <H2 className="mb-2">Hesap, eylem çağrılana kadar başlamaz</H2>
      <Sub className="max-w-3xl mb-6">
        Transformasyonlar yalnızca bir plan oluşturur. Spark bu planı bir eylem
        gelene kadar saklar; sonra tümünü <span className="text-white">birlikte
        optimize ederek</span> tek seferde çalıştırır.
      </Sub>
      <SparkShellWindow title="spark-shell — lazy evaluation">
        <div>
          <span className="bvbb-term-prompt">scala&gt;</span>{" "}
          <span className="bvbb-term-cmd">val satirlar = sc.textFile(&quot;s3://veri/logs.txt&quot;)</span>
        </div>
        <div className="bvbb-term-dim"># henüz dosya OKUNMADI — sadece tarif</div>
        <div>
          <span className="bvbb-term-prompt">scala&gt;</span>{" "}
          <span className="bvbb-term-cmd">val hatalar = satirlar.filter(_.contains(&quot;ERROR&quot;))</span>
        </div>
        <div className="bvbb-term-dim"># filtre de tembel — hâlâ hiçbir şey çalışmadı</div>
        <div>
          <span className="bvbb-term-prompt">scala&gt;</span>{" "}
          <span className="bvbb-term-cmd">hatalar.count()</span>
        </div>
        <div className="bvbb-term-warn">[Stage 0:&gt; (0 + 4) / 4] ... çalışıyor</div>
        <div className="bvbb-term-ok">res0: Long = 1287</div>
        <div className="bvbb-term-dim"># count() bir EYLEM — işte şimdi tüm zincir çalıştı</div>
        <div className="mt-1">
          <span className="bvbb-term-prompt">scala&gt;</span>{" "}
          <span className="bvbb-term-cmd">_</span>
          <span className="animate-pulse">█</span>
        </div>
      </SparkShellWindow>
    </SlideShell>
  ),

  /* ─────────────────  11 · UÇTAN UCA ÖRNEK · WORD COUNT  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Klasik örnek · kelime sayımı</Eyebrow>
      <H2 className="mb-2">RDD ile &quot;Hello World&quot;: WordCount</H2>
      <Sub className="max-w-3xl mb-6">
        Büyük verinin klasik ilk programı. Beş satırlık zincir; sadece son satır
        (eylem) gerçek hesabı tetikler. Operatörlerin renklerine dikkat edin.
      </Sub>
      <SparkShellWindow title="pyspark — wordcount.py">
        <div>
          <span className="bvbb-term-dim"># 1) Kaynak: metin dosyasından RDD</span>
        </div>
        <div>
          <span className="bvbb-term-cmd">satirlar = sc.textFile(</span>
          <span className="bvbb-term-str">&quot;s3://veri/kitap.txt&quot;</span>
          <span className="bvbb-term-cmd">)</span>
        </div>
        <div className="mt-1">
          <span className="bvbb-term-dim"># 2) Satırı kelimelere böl (flatMap)</span>
        </div>
        <div>
          <span className="bvbb-term-cmd">kelimeler = satirlar.</span>
          <span className="bvbb-term-val">flatMap</span>
          <span className="bvbb-term-cmd">(lambda s: s.split())</span>
        </div>
        <div className="mt-1">
          <span className="bvbb-term-dim"># 3) Her kelimeyi (kelime, 1) yap</span>
        </div>
        <div>
          <span className="bvbb-term-cmd">ciftler = kelimeler.</span>
          <span className="bvbb-term-val">map</span>
          <span className="bvbb-term-cmd">(lambda k: (k, 1))</span>
        </div>
        <div className="mt-1">
          <span className="bvbb-term-dim"># 4) Anahtara göre topla (reduceByKey)</span>
        </div>
        <div>
          <span className="bvbb-term-cmd">sayim = ciftler.</span>
          <span className="bvbb-term-val">reduceByKey</span>
          <span className="bvbb-term-cmd">(lambda a, b: a + b)</span>
        </div>
        <div className="mt-1">
          <span className="bvbb-term-dim"># 5) EYLEM: ilk 3 sonucu getir → zincir burada çalışır</span>
        </div>
        <div>
          <span className="bvbb-term-cmd">print(sayim.</span>
          <span className="bvbb-term-ok">take</span>
          <span className="bvbb-term-cmd">(3))</span>
        </div>
        <div className="bvbb-term-val">[(&apos;veri&apos;, 412), (&apos;bulut&apos;, 187), (&apos;spark&apos;, 96)]</div>
      </SparkShellWindow>
    </SlideShell>
  ),

  /* ─────────────────  12 · BÖLÜM 3 · DAYANIKLILIK  ───────────────── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Dayanıklılık &amp; Lineage"
      subtitle="RDD&apos;deki &quot;R&quot; harfi: bir düğüm çökse bile veriyi kopyalamadan, soyağacından yeniden inşa ederek hataya dayanmak."
      bgGradient="linear-gradient(135deg, #16a34a 0%, #22c55e 100%)"
      shadow="0 20px 60px -10px rgba(34, 197, 94, 0.55)"
      icon={<RefreshCw className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  13 · LINEAGE DİYAGRAMI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Lineage · soyağacı (DAG)</Eyebrow>
      <H2 className="mb-2">Spark her RDD&apos;nin nereden geldiğini bilir</H2>
      <Sub className="max-w-3xl mb-6">
        Her transformasyon, çıktının hangi RDD&apos;den nasıl üretildiğini bir
        yönlü çevrimsiz çizgede (DAG) kaydeder. İşte bu kayda lineage denir.
      </Sub>
      <LineageDiagram />
    </SlideShell>
  ),

  /* ─────────────────  14 · HATA TOLERANSI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Hata toleransı · fault tolerance</Eyebrow>
      <H2>Bir düğüm çökerse ne olur?</H2>
      <Sub className="mt-3 max-w-3xl">
        Klasik sistemler veriyi kopyalayarak (replication) korur. RDD bunun
        yerine kaybolan parçayı lineage&apos;tan yeniden hesaplar — bellek ve ağ
        açısından çok daha ucuz bir kurtarma.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[
          {
            n: 1,
            t: "Düğüm çöker",
            d: "worker-02 düşer; üzerindeki P2 ve P3 parçaları bellekten kaybolur.",
            icon: AlertTriangle,
            color: "#f87171",
          },
          {
            n: 2,
            t: "Lineage okunur",
            d: "Spark, kaybolan parçaların hangi adımlardan üretildiğini soyağacından bulur.",
            icon: GitBranch,
            color: "#60a5fa",
          },
          {
            n: 3,
            t: "Yalnızca o parça yeniden hesaplanır",
            d: "Sağlam parçalara dokunulmaz; sadece eksikler başka düğümde yeniden üretilir.",
            icon: RefreshCw,
            color: "#22c55e",
          },
        ].map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="bvbb-card rounded-xl p-6"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ background: `${s.color}18`, border: `1px solid ${s.color}55` }}
            >
              <s.icon className="w-6 h-6" style={{ color: s.color }} />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-[10px] text-gray-500 font-mono">
                {s.n}
              </span>
              <div className="text-base font-semibold text-white">{s.t}</div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{s.d}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 text-[11px] text-gray-500 text-center"
      >
        <span className="bvbb-token">Not</span> Lineage zinciri çok uzarsa
        yeniden hesaplama pahalılaşır; bunu kırmak için <span className="text-white">checkpoint</span> kullanılır.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  15 · PERSIST / CACHE  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>persist · cache · depolama seviyeleri</Eyebrow>
      <H2>Aynı RDD&apos;yi çok kullanacaksan: önbelleğe al</H2>
      <Sub className="mt-3 max-w-3xl">
        Bir RDD birden çok eylemde kullanılacaksa her seferinde baştan
        hesaplanmasını önlemek için <span className="text-white">cache()</span> veya
        <span className="text-white"> persist()</span> ile bellekte tutarız.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 bvbb-card rounded-xl overflow-hidden"
      >
        <table className="bvbb-tbl">
          <thead>
            <tr>
              <th style={{ width: "26%" }}>Depolama seviyesi</th>
              <th style={{ width: "30%" }}>Nerede tutulur?</th>
              <th>Ne zaman?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="font-mono text-[#93c5fd]">MEMORY_ONLY</span></td>
              <td>Sadece RAM (cache() varsayılanı).</td>
              <td>Veri belleğe sığıyorsa; en hızlısı.</td>
            </tr>
            <tr>
              <td><span className="font-mono text-[#93c5fd]">MEMORY_AND_DISK</span></td>
              <td>RAM&apos;e sığmayan parçalar diske taşar.</td>
              <td>Veri belleğe tam sığmadığında.</td>
            </tr>
            <tr>
              <td><span className="font-mono text-[#93c5fd]">MEMORY_ONLY_SER</span></td>
              <td>RAM&apos;de serileştirilmiş (daha küçük yer).</td>
              <td>Bellek darsa, biraz CPU karşılığında.</td>
            </tr>
            <tr>
              <td><span className="font-mono text-[#93c5fd]">DISK_ONLY</span></td>
              <td>Sadece disk.</td>
              <td>Yeniden hesaplama çok pahalı ama RAM yoksa.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-[11px] text-gray-500 font-mono text-center"
      >
        <span className="text-[#60a5fa]">rdd.cache()</span> = <span className="text-[#60a5fa]">rdd.persist(StorageLevel.MEMORY_ONLY)</span> · iş bitince <span className="text-[#60a5fa]">unpersist()</span> ile boşalt.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  16 · RDD vs DataFrame  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bağlam · RDD nerede durur?</Eyebrow>
      <H2>RDD ne zaman, DataFrame ne zaman?</H2>
      <Sub className="mt-3 max-w-3xl">
        RDD Spark&apos;ın düşük seviyeli çekirdeğidir; bugün çoğu iş daha üst
        seviyeli DataFrame/Dataset API&apos;si ile yazılır. Ama ikisi de aynı
        motorun (RDD) üzerinde çalışır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bvbb-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#93c5fd]">
            <Layers className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">RDD — düşük seviye</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Yapılandırılmamış veride tam kontrol.</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Özel/karmaşık dönüşümler kolay.</li>
            <li className="flex gap-2"><X className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Otomatik sorgu optimizasyonu yok.</li>
            <li className="flex gap-2"><X className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Şema/tip güvenliği elle yönetilir.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="bvbb-card-sky rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <Database className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">DataFrame — üst seviye</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Sütun/şema; SQL benzeri sorgular.</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Catalyst optimizer ile otomatik hızlandırma.</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Yapılandırılmış veride çok daha kısa kod.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#60a5fa] flex-shrink-0" />Modern Spark işlerinin varsayılan tercihi.</li>
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-5 text-center text-[11px] text-gray-500"
      >
        Pratik kural: yapılandırılmış veride DataFrame; düşük seviye kontrol gerektiğinde RDD&apos;ye in.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  17 · UYGULAMALI LAB  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
      <H2>Kendi log dosyanda RDD pipeline&apos;ı</H2>
      <Sub className="mt-3 max-w-3xl">
        Bulutta (örn. EMR/Dataproc) ya da yerelde kurulu Spark üzerinde
        pyspark açıp aşağıdaki dört adımı yap; sonraki derse ekran görüntüsüyle gel.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          {
            icon: HardDrive,
            title: "Log dosyasından RDD oluştur",
            desc: "sc.textFile ile bir .log dosyasını oku; count() ile satır sayısını yazdır.",
            accent: "#60a5fa",
          },
          {
            icon: Filter,
            title: "ERROR satırlarını filtrele",
            desc: "filter(lambda s: \"ERROR\" in s) ile hata satırlarını ayıkla; kaç tane olduğunu say.",
            accent: "#a855f7",
          },
          {
            icon: GitBranch,
            title: "Saatlere göre grupla",
            desc: "map ile (saat, 1) çiftleri üret, reduceByKey ile saat başına hata sayısını çıkar.",
            accent: "#f59e0b",
          },
          {
            icon: Save,
            title: "Önbellekle ve kaydet",
            desc: "Filtrelenmiş RDD'yi cache() ile belleğe al, sonucu saveAsTextFile ile diske/S3'e yaz.",
            accent: "#22c55e",
          },
        ].map((t, i) => (
          <motion.label
            key={t.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.15 + i * 0.1 }}
            className="bvbb-card bvbb-card-hover rounded-xl p-5 flex gap-4 cursor-pointer transition-all"
          >
            <div className="flex flex-col items-center gap-2">
              <input type="checkbox" className="w-5 h-5 accent-[#2563eb] rounded" />
              <span className="text-[10px] font-mono text-gray-500">#{i + 1}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <t.icon className="w-4 h-4" style={{ color: t.accent }} />
                <div className="text-base font-semibold text-white">{t.title}</div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{t.desc}</p>
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
        <span className="bvbb-token">İpucu</span> Spark UI&apos;ı (4040 portu) aç;
        işin DAG&apos;ını ve oluşan stage/task sayısını gözlemle.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  18 · ÖZET  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu haftanın özeti</Eyebrow>
      <H2>Aklında kalsın</H2>
      <Sub className="mt-3 max-w-3xl">
        Dört cümleyle bu hafta öğrendiklerimiz — sınavda ve labda dönüp dolaşıp bunlara geleceğiz.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Database, t: "RDD = değişmez, parçalı, dağıtık koleksiyon", d: "Spark'ın çekirdek soyutlaması; bellekte tutulabilir.", color: "#2563eb" },
          { icon: Workflow, t: "Transformasyon tembel, eylem tetikleyici", d: "Plan birikir; eylem gelene kadar hiçbir şey çalışmaz.", color: "#a855f7" },
          { icon: GitBranch, t: "Lineage = yeniden inşa tarifi", d: "Kaybolan parça soyağacından yeniden hesaplanır.", color: "#22c55e" },
          { icon: RefreshCw, t: "cache/persist tekrar kullanımı hızlandırır", d: "Çok kullanılan RDD'yi belleğe al; baştan hesaplama yok.", color: "#f59e0b" },
        ].map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="bvbb-card rounded-xl p-5 flex items-start gap-4"
          >
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${s.color}18`, border: `1px solid ${s.color}55` }}
            >
              <s.icon className="w-5 h-5" style={{ color: s.color }} />
            </div>
            <div>
              <div className="text-base font-semibold text-white">{s.t}</div>
              <p className="text-sm text-gray-400 mt-1 leading-relaxed">{s.d}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  19 · SIRADAKİ HAFTA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Hafta 13 Önizleme</Eyebrow>
      <H2>Bulutta makine öğrenmesi</H2>
      <Sub className="mt-3 max-w-3xl">
        RDD ile veriyi paralel işlemeyi gördük. Önümüzdeki hafta bu altyapının
        üzerinde model eğitiyoruz: Spark MLlib ve bulut ML servisleri.
      </Sub>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Cpu}
          title="Spark MLlib"
          desc="RDD/DataFrame üzerinde ölçeklenebilir sınıflandırma, regresyon ve kümeleme."
          delay={0.0}
          accent="#2563eb"
        />
        <FeatureCard
          icon={Cloud}
          title="Yönetilen ML servisleri"
          desc="SageMaker, Vertex AI, Azure ML — eğitim, dağıtım ve izleme tek panelden."
          delay={0.1}
          accent="#a855f7"
        />
        <FeatureCard
          icon={Repeat}
          title="Pipeline mantığı"
          desc="Veri hazırlama → özellik çıkarımı → eğitim → değerlendirme zinciri."
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
        <ListChecks className="w-6 h-6 text-[#60a5fa]" />
        <div className="flex-1">
          <div className="text-sm font-semibold text-white">Hazırlık</div>
          <div className="text-xs text-gray-400 mt-0.5">
            Lab&apos;da ürettiğin filtrelenmiş RDD&apos;yi getir · Spark MLlib
            dokümantasyonunun &ldquo;Basic Statistics&rdquo; bölümüne göz at.
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-500" />
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  20 · KAPANIŞ  ───────────────── */
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
          <Zap className="w-12 h-12 text-white" />
        </motion.div>

        <Eyebrow>Hafta 12 · Son</Eyebrow>
        <H1>
          <span className="bvbb-shimmer">Teşekkürler!</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          RDD&apos;yi anladıysan Spark&apos;ın geri kalanı çok daha kolay gelecek.
          Sorular için derslik 7&apos;de buluşuyoruz.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {[
            { icon: Target, label: "Ders saati", value: "Çarşamba 09:55 — 12:30" },
            { icon: Server, label: "Konum", value: "Derslik 7 · MCBÜ MYO" },
            { icon: Cloud, label: "Ders yöneticisi", value: "Öğr. Gör. Osman Can Çetlenbik" },
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

      <div className="absolute bottom-3 right-8 text-[9px] font-mono text-gray-700 z-50 hidden md:flex items-center gap-2">
        <Keyboard className="w-3 h-3" />
        <span>← → · F · Esc</span>
      </div>
    </div>
  );
}
