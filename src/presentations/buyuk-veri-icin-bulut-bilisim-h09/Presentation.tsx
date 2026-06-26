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
  HardDrive,
  Network,
  Layers,
  Layers3,
  Cpu,
  Boxes,
  GitBranch,
  Workflow,
  Terminal,
  Settings,
  Activity,
  Shield,
  Copy,
  FileStack,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  Sparkles,
  Zap,
  Target,
  Brain,
  Calendar,
  ListChecks,
  Cloud,
  AlertTriangle,
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

function TerminalWindow({
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
          style={{ background: "#0d1117", color: "#93c5fd" }}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>{title}</span>
        </div>
      </div>
      <div className="bvbb-terminal">{children}</div>
    </motion.div>
  );
}

function HDFSReplicationDiagram() {
  /* Aynı dosyanın blokları üç DataNode'a, replikasyon faktörü 3 ile dağıtılır */
  const nodes = [
    { name: "DataNode 1", blocks: ["B1", "B2", "B4"], rack: "Rack A" },
    { name: "DataNode 2", blocks: ["B1", "B3", "B4"], rack: "Rack A" },
    { name: "DataNode 3", blocks: ["B2", "B3", "B4"], rack: "Rack B" },
  ];
  const blockColor: Record<string, string> = {
    B1: "#2563eb",
    B2: "#0ea5e9",
    B3: "#a855f7",
    B4: "#22c55e",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6 items-start"
    >
      {/* NameNode tarafı */}
      <div className="bvbb-card-sky rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Server className="w-5 h-5 text-[#60a5fa]" />
          <div className="text-sm font-semibold text-white">NameNode</div>
          <span className="ml-auto text-[9px] text-sky-300/80 font-mono">MASTER</span>
        </div>
        <div className="text-[11px] text-gray-400 mb-3">
          Yalnızca üst veriyi (metadata) tutar — hangi blok nerede?
        </div>
        <div className="space-y-1.5 font-mono text-[10px]">
          {[
            { f: "/veri/log.csv", b: "B1 B2" },
            { f: "/veri/satis.parquet", b: "B3 B4" },
          ].map((m) => (
            <div
              key={m.f}
              className="rounded px-2 py-1.5 bg-black/30 border border-white/10"
            >
              <div className="text-[#93c5fd]">{m.f}</div>
              <div className="text-gray-500">bloklar → {m.b}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-[10px] text-gray-500">
          Blok boyutu: <span className="bvbb-token">128 MB</span> · Replikasyon:{" "}
          <span className="bvbb-token">3</span>
        </div>
      </div>

      {/* DataNode'lar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {nodes.map((n, i) => (
          <motion.div
            key={n.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.12 }}
            className="bvbb-card rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <HardDrive className="w-4 h-4 text-gray-300" />
              <div className="text-xs font-semibold text-white">{n.name}</div>
            </div>
            <div className="grid grid-cols-3 gap-1.5 mb-3">
              {n.blocks.map((b) => (
                <div
                  key={b}
                  className="rounded text-center text-[10px] font-mono font-bold py-2"
                  style={{
                    background: `${blockColor[b]}22`,
                    color: blockColor[b],
                    border: `1px solid ${blockColor[b]}66`,
                  }}
                >
                  {b}
                </div>
              ))}
            </div>
            <div className="text-[9px] font-mono text-gray-500 flex items-center gap-1">
              <Network className="w-3 h-3" /> {n.rack}
            </div>
          </motion.div>
        ))}
        <div className="sm:col-span-3 text-[11px] text-gray-500 flex items-start gap-2 mt-1">
          <Copy className="w-4 h-4 text-[#60a5fa] flex-shrink-0 mt-0.5" />
          <span>
            Her blok 3 kopya. Rack-aware yerleşim: en az bir kopya farklı rafta
            tutulur — tek raf gitse bile veri yaşar.
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function MapReduceFlow() {
  const stages = [
    { name: "Input Split", icon: FileStack, color: "#2563eb", desc: "Dosya 128 MB&apos;lık bloklara/parçalara bölünür" },
    { name: "Map", icon: Cpu, color: "#0ea5e9", desc: "Her parça (k, v) çiftlerine dönüşür — veriye yakın çalışır" },
    { name: "Shuffle & Sort", icon: Workflow, color: "#a855f7", desc: "Aynı anahtarlar aynı reducer&apos;a gruplanır" },
    { name: "Reduce", icon: Boxes, color: "#22c55e", desc: "Anahtar başına değerler birleştirilir (toplam, sayım…)" },
    { name: "Output", icon: HardDrive, color: "#f59e0b", desc: "Sonuç tekrar HDFS&apos;e yazılır" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-3"
    >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-stretch">
        {stages.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="bvbb-card rounded-xl p-4 flex flex-col relative"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center mb-2"
              style={{ background: `${s.color}22`, border: `1px solid ${s.color}66` }}
            >
              <s.icon className="w-4 h-4" style={{ color: s.color }} />
            </div>
            <div className="text-sm font-semibold text-white mb-1">{s.name}</div>
            <div
              className="text-[11px] text-gray-400 leading-snug flex-1"
              dangerouslySetInnerHTML={{ __html: s.desc }}
            />
            {i < stages.length - 1 && (
              <ArrowRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 z-10" />
            )}
          </motion.div>
        ))}
      </div>
      <div className="bvbb-card rounded-lg px-4 py-3 font-mono text-[11px] text-gray-300">
        <span className="text-[#93c5fd]">WordCount örneği:</span>{" "}
        Map → (&quot;bulut&quot;, 1), (&quot;veri&quot;, 1), (&quot;bulut&quot;, 1) ·
        Shuffle → (&quot;bulut&quot;, [1,1]) · Reduce →{" "}
        <span className="text-[#86efac]">(&quot;bulut&quot;, 2)</span>
      </div>
    </motion.div>
  );
}

function HadoopArchitecture() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bvbb-card rounded-xl p-6"
    >
      {/* Master katmanı */}
      <div className="text-[10px] font-mono uppercase tracking-widest text-[#60a5fa] mb-2">
        Master Düğümü
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        <div className="bvbb-card-sky rounded-lg p-3 flex items-center gap-3">
          <Server className="w-5 h-5 text-[#60a5fa]" />
          <div>
            <div className="text-sm font-semibold text-white">NameNode</div>
            <div className="text-[11px] text-gray-400">HDFS metadata + ad alanı</div>
          </div>
        </div>
        <div className="bvbb-card-sky rounded-lg p-3 flex items-center gap-3">
          <Settings className="w-5 h-5 text-[#0ea5e9]" />
          <div>
            <div className="text-sm font-semibold text-white">ResourceManager</div>
            <div className="text-[11px] text-gray-400">YARN — küme kaynağı dağıtır</div>
          </div>
        </div>
      </div>

      {/* Bağlantı çizgisi */}
      <div className="flex justify-center mb-5">
        <div className="w-px h-6 bg-gradient-to-b from-[#60a5fa]/60 to-transparent" />
      </div>

      {/* Worker katmanı */}
      <div className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">
        Worker Düğümleri (yatay ölçeklenir)
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="bvbb-card rounded-lg p-3">
            <div className="text-[11px] font-mono text-gray-500 mb-2">node-{i + 1}</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <HardDrive className="w-3.5 h-3.5 text-[#22c55e]" /> DataNode
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <Cpu className="w-3.5 h-3.5 text-[#a855f7]" /> NodeManager
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-[11px] text-gray-500 flex items-start gap-2">
        <Activity className="w-4 h-4 text-[#60a5fa] flex-shrink-0 mt-0.5" />
        <span>
          DataNode &amp; NodeManager aynı makinede yaşar — bu sayede hesaplama
          veriye taşınır (data locality), veri ağda dolaştırılmaz.
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
        <Eyebrow>BVA 2103 · 9. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="bvbb-shimmer">Hadoop</span>
          <br />
          <span className="text-white">Mimarisi ve Bileşenleri</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Tek sunucuya sığmayan veriyi sıradan makinelerden oluşan bir kümeye
          yayan açık kaynak çatı. HDFS, YARN ve MapReduce ile tanışıyoruz.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {[
            { name: "HDFS", tag: "Dağıtık dosya sistemi", color: "#2563eb", icon: HardDrive },
            { name: "YARN", tag: "Kaynak yönetimi", color: "#0ea5e9", icon: Settings },
            { name: "MapReduce", tag: "Dağıtık işleme", color: "#a855f7", icon: Workflow },
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

  /* ─────────────────  2 · KÖPRÜ / HEDEF  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · Vizeden 9. haftaya</Eyebrow>
      <H2>Buluttaki altyapıyı kurduk; şimdi üstünde veri işliyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        İlk haftalarda IaaS/PaaS, sanallaştırma ve konteynerlerle esnek kaynakları
        konuştuk. Bu hafta o kaynakların üstüne büyük veri dünyasının temelini
        kuran çatıyı yerleştiriyoruz: Hadoop.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bvbb-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#93c5fd]">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Sorun</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#2563eb] flex-shrink-0" />Veri tek diske/sunucuya sığmıyor (terabayt–petabayt).</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#2563eb] flex-shrink-0" />Tek makinede işlemek günler sürüyor.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#2563eb] flex-shrink-0" />Pahalı sunucu çökerse veri kaybolur.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="bvbb-card-sky rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#60a5fa]">
            <Check className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Hadoop&apos;un cevabı</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#60a5fa] flex-shrink-0" />Veriyi çok sayıda ucuz makineye böl (HDFS).</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#60a5fa] flex-shrink-0" />Hesaplamayı veriye götür, paralel çalıştır (MapReduce).</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#60a5fa] flex-shrink-0" />Her bloğu çoğalt — bir makine ölse veri yaşar.</li>
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 text-[11px] text-gray-500 text-center"
      >
        <span className="bvbb-token">Bu hafta</span> Hadoop&apos;un üç çekirdek
        bileşeni — HDFS, YARN, MapReduce — ve nasıl birlikte çalıştıkları.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  3 · DERSİN AKIŞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: depolama → kaynak → işleme</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce veriyi nereye koyduğumuza (HDFS), sonra kümeyi kimin yönettiğine
        (YARN), en sonda da veriyi nasıl işlediğimize (MapReduce) bakacağız.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "HDFS", items: ["NameNode & DataNode", "Blok ve replikasyon", "Veri yerelliği (locality)"], icon: HardDrive, accent: "#2563eb" },
          { range: "02", title: "YARN", items: ["ResourceManager", "NodeManager", "ApplicationMaster & Container"], icon: Settings, accent: "#0ea5e9" },
          { range: "03", title: "MapReduce", items: ["Map / Shuffle / Reduce", "WordCount örneği", "Ekosistem (Hive, Spark…)"], icon: Workflow, accent: "#a855f7" },
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

  /* ─────────────────  4 · HADOOP NEDİR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Tanım · Apache Hadoop</Eyebrow>
      <H2>
        Hadoop <span className="bvbb-shimmer-sky">nedir?</span>
      </H2>
      <Sub className="mt-3 max-w-3xl">
        Sıradan donanımdan (commodity hardware) oluşan kümeler üzerinde büyük veri
        kümelerini dağıtık olarak depolayıp işleyen açık kaynaklı bir çatıdır.
        Google&apos;ın GFS ve MapReduce makalelerinden ilham alır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <FeatureCard
          icon={Boxes}
          title="Dağıtık"
          desc="İş, onlarca/binlerce düğüme yayılır; veri ve hesaplama paralel çalışır."
          delay={0.0}
          accent="#2563eb"
        />
        <FeatureCard
          icon={Shield}
          title="Hataya dayanıklı"
          desc="Donanım arızası kural sayılır. Replikasyon sayesinde bir düğüm düşse de iş sürer."
          delay={0.1}
          accent="#22c55e"
        />
        <FeatureCard
          icon={Network}
          title="Yatay ölçeklenir"
          desc="Daha güçlü tek makine değil — kümeye yeni ucuz düğüm ekleyerek büyürsün."
          delay={0.2}
          accent="#0ea5e9"
        />
        <FeatureCard
          icon={Database}
          title="Veri yerelliği"
          desc="Veriyi işlemciye taşımak yerine kodu veriye gönderir; ağ trafiği azalır."
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
        <Cloud className="w-5 h-5 text-[#60a5fa] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-300">
          <span className="bvbb-token">Bulutta</span> AWS EMR, Azure HDInsight ve
          Google Dataproc, Hadoop kümesini dakikalar içinde yönetilen bir hizmet
          olarak sunar — kurulumu sen üstlenmezsin.
        </p>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  5 · ÇEKİRDEK BİLEŞENLER TABLOSU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Genel bakış · 4 çekirdek modül</Eyebrow>
      <H2>Hadoop&apos;u oluşturan parçalar</H2>
      <Sub className="mt-3 max-w-3xl">
        Klasik Hadoop dört modülden oluşur. Sonraki slaytlarda HDFS, YARN ve
        MapReduce&apos;u tek tek açacağız.
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
              <th style={{ width: "20%" }}>Modül</th>
              <th style={{ width: "22%" }}>Görevi</th>
              <th>Açıklama</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">HDFS</td>
              <td><span className="font-mono text-[#93c5fd]">Depolama</span></td>
              <td>Hadoop Distributed File System — veriyi bloklara bölüp düğümlere dağıtır ve çoğaltır.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">YARN</td>
              <td><span className="font-mono text-[#93c5fd]">Kaynak yönetimi</span></td>
              <td>Yet Another Resource Negotiator — CPU/RAM&apos;i işlere paylaştırır, kümenin işletim sistemi gibidir.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">MapReduce</td>
              <td><span className="font-mono text-[#93c5fd]">İşleme</span></td>
              <td>Veriyi paralel işleyen programlama modeli — map ve reduce aşamaları.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Hadoop Common</td>
              <td><span className="font-mono text-[#93c5fd]">Ortak kütüphane</span></td>
              <td>Diğer modüllerin paylaştığı yardımcı araçlar, dosya sistemi soyutlamaları ve Java kütüphaneleri.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-4 text-[11px] text-gray-500 text-center"
      >
        <span className="bvbb-token">Not</span> YARN, Hadoop 2 ile geldi; öncesinde
        kaynak yönetimi de doğrudan MapReduce&apos;un içindeydi.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  6 · MİMARİ DİYAGRAM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Master · Worker mimarisi</Eyebrow>
      <H2 className="mb-2">Kümenin kuş bakışı görünümü</H2>
      <Sub className="max-w-3xl mb-6">
        Hadoop bir master/worker kümesidir. Master&apos;da yönetim daemon&apos;ları
        (NameNode, ResourceManager), worker&apos;larda ise veri ve hesaplama
        daemon&apos;ları (DataNode, NodeManager) koşar.
      </Sub>
      <HadoopArchitecture />
    </SlideShell>
  ),

  /* ─────────────────  7 · BÖLÜM 1 · HDFS  ───────────────── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="HDFS — Dağıtık Depolama"
      subtitle="Veriyi büyük bloklara bölüp düğümlere dağıtan ve çoğaltan dosya sistemi. Tüm büyük veri işlemenin altındaki katman."
      bgGradient="linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)"
      shadow="0 20px 60px -10px rgba(37, 99, 235, 0.6)"
      icon={<HardDrive className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  8 · HDFS NameNode/DataNode  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>HDFS · iki tür düğüm</Eyebrow>
      <H2>NameNode beyin, DataNode kas</H2>
      <Sub className="mt-3 max-w-3xl">
        HDFS&apos;te sorumluluk ikiye ayrılır: bir tarafta üst veriyi tutan tek bir
        usta düğüm, diğer tarafta gerçek blokları saklayan çok sayıda işçi düğüm.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bvbb-card-sky rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "#2563eb22", border: "1px solid #2563eb66" }}>
              <Server className="w-5 h-5 text-[#60a5fa]" />
            </div>
            <div>
              <div className="text-base font-bold text-white">NameNode (Master)</div>
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Tek aktif</div>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#60a5fa] flex-shrink-0" />Dosya ad alanını ve dizin ağacını tutar.</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#60a5fa] flex-shrink-0" />Hangi bloğun hangi DataNode&apos;da olduğunu bilir.</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#60a5fa] flex-shrink-0" />Veriyi kendisi saklamaz — yalnızca metadata.</li>
            <li className="flex gap-2"><AlertTriangle className="w-4 h-4 mt-0.5 text-[#f59e0b] flex-shrink-0" />Tek hata noktası riski → Standby NameNode ile HA.</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="bvbb-card rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "#22c55e22", border: "1px solid #22c55e66" }}>
              <HardDrive className="w-5 h-5 text-[#22c55e]" />
            </div>
            <div>
              <div className="text-base font-bold text-white">DataNode (Worker)</div>
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Çok sayıda</div>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Gerçek veri bloklarını diskte saklar.</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Okuma/yazma isteklerini doğrudan istemciyle yapar.</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Periyodik <span className="font-mono text-[#86efac]">heartbeat</span> ile &quot;ben ayaktayım&quot; der.</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Cevap vermezse NameNode bloklarını başka yere kopyalar.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  9 · HDFS BLOK & REPLİKASYON DİYAGRAM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>HDFS · blok ve replikasyon</Eyebrow>
      <H2 className="mb-2">Bir dosya, çok blok, çok kopya</H2>
      <Sub className="max-w-3xl mb-6">
        HDFS dosyaları büyük bloklara (varsayılan 128 MB) böler ve her bloğu birden
        çok düğüme (varsayılan 3 kopya) yazar. Büyük blok = az metadata + az disk
        arama; replikasyon = dayanıklılık.
      </Sub>
      <HDFSReplicationDiagram />
    </SlideShell>
  ),

  /* ─────────────────  10 · HDFS TERMİNAL  ───────────────── */
  () => (
    <SlideShell bgPattern={false}>
      <Eyebrow>Canlı çıktı · hdfs dfs</Eyebrow>
      <H2 className="mb-2">Komut satırında HDFS</H2>
      <Sub className="max-w-3xl mb-6">
        HDFS&apos;e dosya yüklemek Linux&apos;a çok benzer. Aşağıda yerel bir CSV&apos;yi
        kümeye atıp blok dağılımını ve replikasyonu inceliyoruz.
      </Sub>
      <TerminalWindow title="ocet@hadoop-master:~ — hdfs dfs">
        <div>
          <span className="bvbb-term-prompt">ocet@hadoop-master</span>
          <span className="bvbb-term-dim">:~$</span>{" "}
          <span className="bvbb-term-cmd">hdfs dfs -mkdir -p /veri/ham</span>
        </div>
        <div>
          <span className="bvbb-term-prompt">ocet@hadoop-master</span>
          <span className="bvbb-term-dim">:~$</span>{" "}
          <span className="bvbb-term-cmd">hdfs dfs -put satislar.csv /veri/ham/</span>
        </div>
        <div>
          <span className="bvbb-term-prompt">ocet@hadoop-master</span>
          <span className="bvbb-term-dim">:~$</span>{" "}
          <span className="bvbb-term-cmd">hdfs dfs -ls -h /veri/ham</span>
        </div>
        <div className="bvbb-term-dim">Found 1 items</div>
        <div className="bvbb-term-ok">-rw-r--r--   3 ocet supergroup   612.4 M /veri/ham/satislar.csv</div>
        <div className="bvbb-term-dim mt-1">
          <span className="bvbb-term-warn">↑</span> baştaki <span className="bvbb-term-ip">3</span> = replikasyon faktörü
        </div>
        <div className="mt-1">
          <span className="bvbb-term-prompt">ocet@hadoop-master</span>
          <span className="bvbb-term-dim">:~$</span>{" "}
          <span className="bvbb-term-cmd">hdfs fsck /veri/ham/satislar.csv -files -blocks</span>
        </div>
        <div className="bvbb-term-dim">/veri/ham/satislar.csv 642293760 bytes, 5 block(s):</div>
        <div className="bvbb-term-ok">Status: HEALTHY · Avg block replication: 3.0 · Corrupt blocks: 0</div>
        <div className="mt-2">
          <span className="bvbb-term-prompt">ocet@hadoop-master</span>
          <span className="bvbb-term-dim">:~$</span>{" "}
          <span className="bvbb-term-cmd">_</span>
          <span className="animate-pulse">█</span>
        </div>
      </TerminalWindow>
    </SlideShell>
  ),

  /* ─────────────────  11 · BÖLÜM 2 · YARN  ───────────────── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="YARN — Kaynak Yönetimi"
      subtitle="Kümenin CPU ve belleğini işlere paylaştıran katman. Hadoop&apos;u tek bir işleme motorundan genel amaçlı bir platforma dönüştürdü."
      bgGradient="linear-gradient(135deg, #0ea5e9 0%, #22d3ee 100%)"
      shadow="0 20px 60px -10px rgba(14, 165, 233, 0.6)"
      icon={<Settings className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  12 · YARN BİLEŞENLERİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>YARN · roller</Eyebrow>
      <H2>Kümenin trafik polisi</H2>
      <Sub className="mt-3 max-w-3xl">
        YARN, &quot;hangi iş, hangi makinede, ne kadar kaynakla çalışsın?&quot;
        sorusunu yanıtlar. Dört temel bileşeni vardır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          {
            n: "ResourceManager",
            icon: Settings,
            color: "#0ea5e9",
            role: "Master",
            d: "Küme genelindeki tüm kaynağı tahsis eder. Scheduler ve ApplicationsManager olarak ikiye ayrılır.",
          },
          {
            n: "NodeManager",
            icon: Cpu,
            color: "#22c55e",
            role: "Her worker&apos;da",
            d: "Kendi düğümündeki container&apos;ları başlatır/izler, kaynak kullanımını ResourceManager&apos;a raporlar.",
          },
          {
            n: "ApplicationMaster",
            icon: GitBranch,
            color: "#a855f7",
            role: "Her iş için 1",
            d: "Bir uygulamanın yaşam döngüsünü yönetir; ResourceManager&apos;dan container ister, görevleri dağıtır.",
          },
          {
            n: "Container",
            icon: Boxes,
            color: "#f59e0b",
            role: "Çalışma birimi",
            d: "Belirli CPU + RAM ayrılmış izole çalışma ortamı. Asıl görev (map/reduce task) burada koşar.",
          },
        ].map((c, i) => (
          <motion.div
            key={c.n}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bvbb-card rounded-xl p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${c.color}22`, border: `1px solid ${c.color}66` }}
              >
                <c.icon className="w-5 h-5" style={{ color: c.color }} />
              </div>
              <div>
                <div className="text-base font-bold text-white">{c.n}</div>
                <div
                  className="text-[10px] font-mono text-gray-500 uppercase tracking-wider"
                  dangerouslySetInnerHTML={{ __html: c.role }}
                />
              </div>
            </div>
            <p
              className="text-sm text-gray-400 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: c.d }}
            />
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  13 · YARN İŞ AKIŞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>YARN · bir iş nasıl çalışır?</Eyebrow>
      <H2>İstemciden sonuca: 5 adım</H2>
      <Sub className="mt-3 max-w-3xl">
        Bir işi gönderdiğinde YARN perde arkasında şu sırayı işletir:
      </Sub>

      <div className="mt-8 space-y-3">
        {[
          { n: 1, t: "İş gönderimi", d: "İstemci işi ResourceManager&apos;a yollar (örn. yarn jar ... ).", color: "#2563eb" },
          { n: 2, t: "ApplicationMaster başlat", d: "ResourceManager bir düğümde iş için bir AM container&apos;ı ayağa kaldırır.", color: "#0ea5e9" },
          { n: 3, t: "Kaynak pazarlığı", d: "AM, görevler için ResourceManager&apos;dan container ister (CPU/RAM).", color: "#a855f7" },
          { n: 4, t: "Görev yürütme", d: "NodeManager&apos;lar container&apos;ları başlatır; map/reduce görevleri verinin yakınında koşar.", color: "#22c55e" },
          { n: 5, t: "İzleme & bitiş", d: "AM ilerlemeyi izler; iş bitince kaynakları serbest bırakır, sonuç HDFS&apos;e yazılır.", color: "#f59e0b" },
        ].map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="bvbb-card rounded-xl p-4 flex items-center gap-4"
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{ background: `${s.color}22`, color: s.color, border: `1px solid ${s.color}66` }}
            >
              {s.n}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-white">{s.t}</div>
              <div
                className="text-[13px] text-gray-400"
                dangerouslySetInnerHTML={{ __html: s.d }}
              />
            </div>
            {i < 4 && <ArrowRight className="w-4 h-4 text-gray-600 flex-shrink-0 rotate-90 md:rotate-0" />}
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  14 · BÖLÜM 3 · MAPREDUCE  ───────────────── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="MapReduce — Dağıtık İşleme"
      subtitle="Büyük veriyi paralel işlemenin klasik programlama modeli. Karmaşık işi iki basit adıma indirger: map ve reduce."
      bgGradient="linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)"
      shadow="0 20px 60px -10px rgba(124, 58, 237, 0.6)"
      icon={<Workflow className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  15 · MAPREDUCE AKIŞ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>MapReduce · veri akışı</Eyebrow>
      <H2 className="mb-2">Map → Shuffle → Reduce</H2>
      <Sub className="max-w-3xl mb-6">
        Veri parçalara bölünür, her parça paralel işlenir (map), sonuçlar anahtara
        göre gruplanır (shuffle) ve birleştirilir (reduce). Aşağıda klasik
        WordCount örneğiyle:
      </Sub>
      <MapReduceFlow />
    </SlideShell>
  ),

  /* ─────────────────  16 · BATCH vs SONRAKİ NESİL  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>MapReduce · güçlü ama yavaş</Eyebrow>
      <H2>Neden Spark gibi araçlar doğdu?</H2>
      <Sub className="mt-3 max-w-3xl">
        MapReduce sağlam ve hataya dayanıklıdır, ama her aşamada ara sonucu diske
        (HDFS&apos;e) yazar. Bu yüzden iteratif işlerde yavaş kalır.
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
              <th style={{ width: "26%" }}>Boyut</th>
              <th style={{ width: "37%" }}>MapReduce</th>
              <th>Apache Spark (10. hafta)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Ara veri</td>
              <td className="text-[#fca5a5]">Her adımda diske yazılır</td>
              <td className="text-[#86efac]">Mümkün olduğunca bellekte (in-memory)</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">İteratif işler</td>
              <td className="text-[#fca5a5]">Yavaş (ML, graf algoritmaları)</td>
              <td className="text-[#86efac]">Çok daha hızlı</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Programlama</td>
              <td>Java ağırlıklı, çok kod (boilerplate)</td>
              <td>Scala/Python/SQL, kısa ve okunaklı</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Ortak nokta</td>
              <td colSpan={2}>İkisi de HDFS üzerinde çalışır ve YARN tarafından zamanlanabilir.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-4 text-[11px] text-gray-500 text-center"
      >
        <span className="bvbb-token">Not</span> Spark, MapReduce&apos;un yerine değil
        çoğu zaman HDFS + YARN ile birlikte üstüne kurulur — Hadoop ekosisteminin
        bir parçasıdır.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  17 · EKOSİSTEM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Hadoop ekosistemi</Eyebrow>
      <H2>Çekirdeğin etrafındaki araçlar</H2>
      <Sub className="mt-3 max-w-3xl">
        Çıplak MapReduce yazmak yerine çoğu ekip daha yüksek seviyeli araçlar
        kullanır. Hepsi HDFS&apos;teki veriyi YARN üzerinde işler.
      </Sub>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {[
          { n: "Hive", icon: Database, color: "#2563eb", d: "HDFS verisini SQL benzeri sorgularla sorgula (HiveQL)." },
          { n: "Spark", icon: Zap, color: "#f59e0b", d: "Bellek içi hızlı işleme; batch, akış ve ML bir arada." },
          { n: "HBase", icon: Layers3, color: "#ef4444", d: "HDFS üstünde dağıtık NoSQL — anlık okuma/yazma." },
          { n: "Pig", icon: Workflow, color: "#a855f7", d: "Veri akışı dili (Pig Latin) ile dönüşüm boru hatları." },
          { n: "Sqoop", icon: ArrowRight, color: "#0ea5e9", d: "İlişkisel veritabanı ↔ HDFS arası toplu veri aktarımı." },
          { n: "Oozie", icon: Calendar, color: "#22c55e", d: "İşleri zamanlayan ve zincirleyen iş akışı planlayıcısı." },
        ].map((t, i) => (
          <FeatureCard
            key={t.n}
            icon={t.icon}
            title={t.n}
            desc={t.d}
            accent={t.color}
            delay={i * 0.08}
          />
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  18 · UYGULAMALI LAB  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
      <H2>Bulutta tek düğümlü Hadoop + WordCount</H2>
      <Sub className="mt-3 max-w-3xl">
        EMR/Dataproc kurmak zorunda değilsiniz; tek bir EC2/VM üzerinde pseudo-dağıtık
        Hadoop kurup dört adımı tamamlayın ve çıktının ekran görüntüsünü getirin.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          {
            icon: Cloud,
            title: "Düğümü hazırla",
            d: "Bir Linux VM&apos;de (örn. t3.medium) Java kurun, Hadoop&apos;u indirip pseudo-distributed modda başlatın.",
            color: "#0ea5e9",
          },
          {
            icon: HardDrive,
            title: "HDFS&apos;e veri yükle",
            d: "hdfs dfs -mkdir /giris ve hdfs dfs -put metin.txt /giris ile bir metin dosyası atın.",
            color: "#2563eb",
          },
          {
            icon: Workflow,
            title: "WordCount çalıştır",
            d: "hadoop-mapreduce-examples jar&apos;ı ile wordcount&apos;u /giris üzerinde koşturun.",
            color: "#a855f7",
          },
          {
            icon: ListChecks,
            title: "Sonucu raporla",
            d: "hdfs dfs -cat /cikis/part-r-00000 ile kelime sayımını görün; ekran görüntüsü + 3 cümle yorum.",
            color: "#22c55e",
          },
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
              style={{ background: `${t.color}18`, border: `1px solid ${t.color}55` }}
            >
              <t.icon className="w-5 h-5" style={{ color: t.color }} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-[10px] text-gray-500 font-mono">{i + 1}</span>
                <h3
                  className="text-base font-semibold text-white"
                  dangerouslySetInnerHTML={{ __html: t.title }}
                />
              </div>
              <p
                className="text-sm text-gray-400 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t.d }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-5 text-[11px] text-gray-500 text-center"
      >
        <span className="bvbb-token">İpucu</span> Tek makinede bile NameNode
        (:9870) ve YARN (:8088) web arayüzlerini açıp blokları ve işi izleyin.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  19 · SIRADAKİ HAFTA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Hafta 10 önizleme</Eyebrow>
      <H2>HDFS &amp; MapReduce&apos;a derinlemesine</H2>
      <Sub className="mt-3 max-w-3xl">
        Bu hafta mimariyi kurduk; gelecek hafta HDFS&apos;in okuma/yazma yolunu ve
        MapReduce iş yazımını ayrıntılandırıp Apache Spark&apos;a köprü kuracağız.
      </Sub>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={FileStack}
          title="HDFS okuma/yazma yolu"
          desc="İstemci–NameNode–DataNode arası akış; pipeline replikasyon ve tutarlılık."
          delay={0.0}
          accent="#2563eb"
        />
        <FeatureCard
          icon={Cpu}
          title="MapReduce iş yazımı"
          desc="Mapper/Reducer sınıfları, combiner ve partitioner ile pratik örnekler."
          delay={0.1}
          accent="#a855f7"
        />
        <FeatureCard
          icon={Zap}
          title="Spark&apos;a geçiş"
          desc="RDD ve bellek içi işleme — neden ve ne zaman MapReduce&apos;tan hızlı?"
          delay={0.2}
          accent="#f59e0b"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 bvbb-card rounded-xl p-5 flex items-center gap-4"
      >
        <Brain className="w-6 h-6 text-[#60a5fa]" />
        <div className="flex-1">
          <div className="text-sm font-semibold text-white">Hazırlık</div>
          <div className="text-xs text-gray-400 mt-0.5">
            Lab&apos;ı tamamlayıp WordCount çıktısını getirin · Apache Hadoop
            dokümantasyonu &quot;HDFS Architecture&quot; bölümünü okuyun.
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
          <Layers className="w-12 h-12 text-white" />
        </motion.div>

        <Eyebrow>Hafta 9 · Özet</Eyebrow>
        <H1>
          <span className="bvbb-shimmer">Böl · Çoğalt · Paralelle</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          HDFS veriyi bloklara bölüp çoğaltır, YARN kaynağı paylaştırır, MapReduce
          işi paralelleştirir. Üçü birlikte büyük veriyi sıradan donanımda işler.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {[
            { icon: Calendar, label: "Ders saati", value: "Çarşamba 09:55 — 12:30" },
            { icon: Target, label: "Bu hafta teslim", value: "Tek düğümlü WordCount" },
            { icon: Sparkles, label: "Sıradaki", value: "HDFS & MapReduce derin" },
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
          BVA 2103 · 9. Hafta · Hadoop Mimarisi
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
