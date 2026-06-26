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
  Server,
  Cpu,
  Database,
  Layers,
  Network,
  Boxes,
  Split,
  Merge,
  GitBranch,
  HardDrive,
  Zap,
  Gauge,
  Workflow,
  Code,
  Terminal,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  ListChecks,
  Activity,
  Brain,
  Clock,
  ArrowRight,
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

/* Scale-up vs scale-out görseli */
function ScaleDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Scale-up */}
      <div className="bvbb-card rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Server className="w-5 h-5 text-gray-300" />
          <div className="text-sm font-semibold text-white">Dikey ölçekleme (scale-up)</div>
          <span className="ml-auto text-[10px] text-gray-500 font-mono">TEK GÜÇLÜ DÜĞÜM</span>
        </div>
        <svg viewBox="0 0 320 200" className="w-full h-44">
          {/* Single big server */}
          <rect x="120" y="30" width="80" height="140" rx="6" fill="#1e293b" stroke="#475569" />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <rect x="128" y={42 + i * 26} width="64" height="18" rx="2" fill="#334155" stroke="#64748b" />
              <circle cx={136} cy={51 + i * 26} r="2.5" fill="#22c55e" />
              <rect x={146} y={47 + i * 26} width="38" height="8" rx="1" fill="#0f172a" />
            </g>
          ))}
          {/* Growth arrow up */}
          <path d="M 80 150 L 80 50" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrUp)" />
          <defs>
            <marker id="arrUp" markerWidth="8" markerHeight="8" refX="4" refY="2" orient="auto">
              <path d="M0,4 L4,0 L8,4 Z" fill="#f59e0b" />
            </marker>
          </defs>
          <text x="60" y="100" fontSize="9" fill="#f59e0b" transform="rotate(-90 60 100)">
            daha çok RAM/CPU
          </text>
        </svg>
        <div className="mt-4 grid grid-cols-3 gap-2 text-[10px]">
          <div className="bvbb-heat-mid rounded px-2 py-1 text-center">Basit</div>
          <div className="bvbb-heat-low rounded px-2 py-1 text-center">Donanım limiti</div>
          <div className="bvbb-heat-low rounded px-2 py-1 text-center">Tek hata noktası</div>
        </div>
      </div>

      {/* Scale-out */}
      <div className="bvbb-card-sky rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Boxes className="w-5 h-5 text-sky-300" />
          <div className="text-sm font-semibold text-white">Yatay ölçekleme (scale-out)</div>
          <span className="ml-auto text-[10px] text-sky-300/80 font-mono">DÜĞÜM KÜMESİ</span>
        </div>
        <svg viewBox="0 0 320 200" className="w-full h-44">
          {/* Many small nodes */}
          {Array.from({ length: 8 }).map((_, i) => {
            const col = i % 4;
            const row = Math.floor(i / 4);
            const x = 30 + col * 70;
            const y = 50 + row * 70;
            return (
              <g key={i}>
                <rect x={x} y={y} width="50" height="44" rx="4" fill="#0c2a4a" stroke="#38bdf8" />
                <circle cx={x + 10} cy={y + 12} r="2.5" fill="#22c55e" />
                <rect x={x + 8} y={y + 22} width="34" height="6" rx="1" fill="#1e3a5f" />
                <rect x={x + 8} y={y + 32} width="24" height="6" rx="1" fill="#1e3a5f" />
              </g>
            );
          })}
          {/* Network mesh */}
          <g stroke="#38bdf8" strokeWidth="1" opacity="0.5" fill="none">
            <path d="M 80 72 L 100 72" />
            <path d="M 150 72 L 170 72" />
            <path d="M 220 72 L 240 72" />
            <path d="M 55 94 L 55 120" />
            <path d="M 125 94 L 125 120" />
            <path d="M 195 94 L 195 120" />
          </g>
        </svg>
        <div className="mt-4 grid grid-cols-3 gap-2 text-[10px]">
          <div className="bvbb-heat-high rounded px-2 py-1 text-center">Lineer büyüme</div>
          <div className="bvbb-heat-high rounded px-2 py-1 text-center">Hata toleransı</div>
          <div className="bvbb-heat-high rounded px-2 py-1 text-center">Ucuz donanım</div>
        </div>
      </div>
    </motion.div>
  );
}

/* MapReduce akış diyagramı */
function MapReduceFlow() {
  const stages = [
    { label: "Input", items: ["satır 1", "satır 2", "satır 3"], color: "#94a3b8", icon: Database },
    { label: "Split", items: ["blok A", "blok B", "blok C"], color: "#60a5fa", icon: Split },
    { label: "Map", items: ["(kelime, 1)", "(kelime, 1)", "(kelime, 1)"], color: "#22c55e", icon: Workflow },
    { label: "Shuffle", items: ["anahtara göre", "grupla", "sırala"], color: "#f59e0b", icon: GitBranch },
    { label: "Reduce", items: ["(kelime, top)", "(kelime, top)", ""], color: "#a855f7", icon: Merge },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bvbb-card rounded-xl p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-9 gap-2 items-stretch">
        {stages.map((s, i) => (
          <div key={s.label} className="contents">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.12 }}
              className="md:col-span-1 rounded-lg p-3 flex flex-col"
              style={{ background: `${s.color}14`, border: `1px solid ${s.color}40` }}
            >
              <div className="flex items-center gap-1.5 mb-2">
                <s.icon className="w-4 h-4" style={{ color: s.color }} />
                <span className="text-[11px] font-semibold" style={{ color: s.color }}>{s.label}</span>
              </div>
              <div className="space-y-1">
                {s.items.filter(Boolean).map((it, k) => (
                  <div key={k} className="text-[9px] font-mono text-gray-300 bg-black/30 rounded px-1.5 py-0.5">
                    {it}
                  </div>
                ))}
              </div>
            </motion.div>
            {i < stages.length - 1 && (
              <div className="hidden md:flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-gray-600" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-5 text-[11px] text-gray-500 font-mono text-center">
        Klasik &quot;WordCount&quot; örneği: girdi parçalanır, paralel haritalanır, anahtara göre toplanır.
      </div>
    </motion.div>
  );
}

/* Spark kod penceresi */
function SparkCodeWindow() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bvbb-window-chrome w-full max-w-3xl mx-auto"
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
          <span>wordcount.py — PySpark</span>
        </div>
      </div>
      <div className="bvbb-terminal">
        <div><span className="bvbb-term-key">from</span> pyspark.sql <span className="bvbb-term-key">import</span> SparkSession</div>
        <div className="text-gray-600">&nbsp;</div>
        <div>spark <span className="bvbb-term-dim">=</span> SparkSession.builder \</div>
        <div className="pl-8">.appName(<span className="bvbb-term-str">&quot;WordCount&quot;</span>).getOrCreate()</div>
        <div className="text-gray-600">&nbsp;</div>
        <div>metin <span className="bvbb-term-dim">=</span> spark.sparkContext.textFile(<span className="bvbb-term-str">&quot;s3://veri/kitap.txt&quot;</span>)</div>
        <div className="text-gray-600">&nbsp;</div>
        <div>sonuc <span className="bvbb-term-dim">=</span> (metin</div>
        <div className="pl-6">.flatMap(<span className="bvbb-term-key">lambda</span> s: s.split())</div>
        <div className="pl-6">.map(<span className="bvbb-term-key">lambda</span> k: (k, <span className="bvbb-term-num">1</span>))</div>
        <div className="pl-6">.reduceByKey(<span className="bvbb-term-key">lambda</span> a, b: a <span className="bvbb-term-dim">+</span> b))</div>
        <div className="text-gray-600">&nbsp;</div>
        <div>sonuc.saveAsTextFile(<span className="bvbb-term-str">&quot;s3://veri/cikti/&quot;</span>)</div>
        <div className="text-gray-600 mt-1"><span className="bvbb-term-dim"># 60+ satır Java MapReduce → 7 satır PySpark</span></div>
      </div>
    </motion.div>
  );
}

/* spark-submit terminal çıktısı */
function SparkSubmitTerminal() {
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
          <span>ocet@cluster:~ — spark-submit</span>
        </div>
      </div>
      <div className="bvbb-terminal">
        <div>
          <span className="bvbb-term-prompt">ocet@cluster</span>
          <span className="bvbb-term-dim">:~$</span>{" "}
          <span className="bvbb-term-cmd">spark-submit --master yarn --num-executors 4 wordcount.py</span>
        </div>
        <div className="bvbb-term-dim">INFO SparkContext: Running Spark version 3.5.1</div>
        <div className="bvbb-term-dim">INFO yarn.Client: Submitting application to ResourceManager</div>
        <div className="bvbb-term-dim">INFO DAGScheduler: Job 0 — 2 stages (map, reduce)</div>
        <div><span className="bvbb-term-warn">[Stage 0:&gt;          ] map  3/12 görev</span></div>
        <div><span className="bvbb-term-warn">[Stage 0:======&gt;    ] map  9/12 görev</span></div>
        <div><span className="bvbb-term-ok">[Stage 1:==========&gt;] reduce 4/4 görev tamam</span></div>
        <div className="bvbb-term-ip">INFO DAGScheduler: Job 0 finished, took 18.4 s</div>
        <div className="bvbb-term-dim">INFO Output written to s3://veri/cikti/ (4 part dosyası)</div>
        <div className="mt-2">
          <span className="bvbb-term-prompt">ocet@cluster</span>
          <span className="bvbb-term-dim">:~$</span>{" "}
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
        <Eyebrow>BVA 2103 · 7. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="bvbb-shimmer">Dağıtılmış Hesaplama</span>
          <br />
          <span className="text-white">Çerçevelerine Giriş</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Tek makineye sığmayan veriyi onlarca düğüme bölmek: MapReduce paradigması,
          Hadoop ekosistemi ve Apache Spark ile paralel veri işleme.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {[
            { name: "MapReduce", tag: "Programlama modeli", color: "#22c55e", icon: Workflow },
            { name: "Hadoop", tag: "HDFS + YARN", color: "#2563eb", icon: Boxes },
            { name: "Spark", tag: "Bellek-içi motor", color: "#f59e0b", icon: Zap },
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
      <Eyebrow>Köprü · 6. haftadan 7. haftaya</Eyebrow>
      <H2>Altyapı hazır — şimdi veriyi nasıl işleyeceğiz?</H2>
      <Sub className="mt-3 max-w-3xl">
        Önceki haftalarda bulut altyapısını, sanallaştırmayı ve konteynerleri kurduk. Artık
        elimizde yüzlerce ucuz düğüm var. Bu hafta soru değişiyor: tek bilgisayara sığmayan
        terabaytlık veriyi bu düğümlere nasıl bölüp paralel işleriz?
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bvbb-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#f87171]">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Tek makinenin duvarı</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />500 GB veri, 16 GB RAM&apos;e sığmaz.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Tek disk okuması saatler sürer.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Makine çökerse iş baştan başlar.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="bvbb-card-sky rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <Boxes className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Dağıtılmış çözüm</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Veriyi bloklara böl, düğümlere dağıt.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Her düğüm kendi parçasını paralel işler.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Bir düğüm çökerse görev yeniden atanır.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3 · DERSİN AKIŞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: ilke → MapReduce &amp; Hadoop → Spark</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce dağıtılmış hesaplamanın temel ilkelerini kuruyoruz; sonra MapReduce paradigması ve
        Hadoop ekosistemini görüyoruz; en son onların üstüne gelen Apache Spark ile bitiriyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            range: "01",
            title: "Temel İlkeler",
            items: ["Scale-up vs scale-out", "Veri yerelliği (data locality)", "Hata toleransı"],
            icon: Network,
            accent: "#2563eb",
          },
          {
            range: "02",
            title: "MapReduce & Hadoop",
            items: ["Map → Shuffle → Reduce", "HDFS blok depolama", "YARN kaynak yönetimi"],
            icon: Workflow,
            accent: "#22c55e",
          },
          {
            range: "03",
            title: "Apache Spark",
            items: ["RDD ve bellek-içi işleme", "DAG ve tembel değerlendirme", "PySpark ile pratik"],
            icon: Zap,
            accent: "#f59e0b",
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

  /* ─────────────────  4 · BÖLÜM 1 · TEMEL İLKELER  ───────────────── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Temel İlkeler"
      subtitle="Neden tek bilgisayar yetmez ve dağıtılmış bir çerçeveyi var eden üç fikir: ölçeklenme, veri yerelliği ve hata toleransı."
      bgGradient="linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)"
      shadow="0 20px 60px -10px rgba(37, 99, 235, 0.6)"
      icon={<Network className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  5 · DAĞITILMIŞ HESAPLAMA NEDİR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Tanım</Eyebrow>
      <H2>Dağıtılmış hesaplama nedir?</H2>
      <Sub className="mt-3 max-w-3xl">
        Tek bir problemi, ağ üzerinden haberleşen birden çok bilgisayara (düğüme) bölerek
        çözmektir. Bir çerçeve (framework), bu dağıtımın zor kısımlarını bizim yerimize halleder.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={Split}
          title="Böl ve dağıt"
          desc="Veri ve iş, otomatik olarak parçalara ayrılıp düğümlere paylaştırılır — programcı tek tek atama yapmaz."
          delay={0.0}
          accent="#2563eb"
        />
        <FeatureCard
          icon={Cpu}
          title="Paralel işle"
          desc="Her düğüm kendi parçasını aynı anda işler. 100 düğüm, ideal durumda işi yaklaşık 100 kat hızlandırır."
          delay={0.1}
          accent="#22c55e"
        />
        <FeatureCard
          icon={Merge}
          title="Topla ve birleştir"
          desc="Düğümlerden gelen kısmi sonuçlar tek bir nihai sonuçta birleştirilir; ara sonuçlar koordine edilir."
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
        <Layers className="w-5 h-5 text-[#60a5fa] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-300">
          <span className="bvbb-token">Çerçevenin işi</span> Görev zamanlama, veri taşıma, düğüm
          arızası ve yeniden deneme gibi dağıtık sistemin tüm karmaşıklığını soyutlamaktır. Sen
          yalnızca &quot;ne&quot; yapılacağını yazarsın, &quot;nerede/nasıl&quot; kısmını çerçeve çözer.
        </p>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  6 · SCALE-UP vs SCALE-OUT DİYAGRAM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Görsel Karşılaştırma</Eyebrow>
      <H2>Dikey vs yatay ölçekleme</H2>
      <Sub className="mt-3 max-w-3xl">
        Daha güçlü tek bir makine mi alalım, yoksa çok sayıda sıradan makineyi mi bir araya
        getirelim? Büyük veri çerçeveleri ikinci yolu, yatay ölçeklemeyi seçer.
      </Sub>
      <div className="mt-8">
        <ScaleDiagram />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  7 · VERİ YERELLİĞİ & HATA TOLERANSI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>İki temel ilke</Eyebrow>
      <H2>Veriyi taşıma, hesabı taşı</H2>
      <Sub className="mt-3 max-w-3xl">
        Dağıtılmış çerçeveleri verimli ve güvenilir kılan iki fikir. İkisini kavramadan
        MapReduce&apos;u da Spark&apos;ı da doğru kullanamayız.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bvbb-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#60a5fa]">
            <Activity className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Veri yerelliği</span>
          </div>
          <p className="text-sm text-gray-300 mb-3">
            Veri büyüktür, kod küçüktür. Onlarca GB&apos;ı ağ üzerinden taşımak yerine, küçük
            hesaplama kodunu verinin durduğu düğüme gönderirsin. Ağ trafiği ve gecikme dramatik düşer.
          </p>
          <div className="text-[11px] text-gray-500 font-mono bg-black/30 rounded px-3 py-2">
            &quot;Move computation to data, not data to computation.&quot;
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="bvbb-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#34d399]">
            <GitBranch className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Hata toleransı</span>
          </div>
          <p className="text-sm text-gray-300 mb-3">
            Yüzlerce ucuz makinede arıza kural, istisna değildir. Çerçeve bunu varsayar: veri
            birden çok kopyada (replikasyon) tutulur, çöken bir düğümün görevi sağlam bir düğüme
            yeniden atanır. Tüm iş baştan başlamaz.
          </p>
          <div className="text-[11px] text-gray-500 font-mono bg-black/30 rounded px-3 py-2">
            HDFS varsayılanı: her blok 3 kopya · Spark: kayıp parçayı soy ağacından (lineage) yeniden hesaplar
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  8 · BÖLÜM 2 · MAPREDUCE & HADOOP  ───────────────── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="MapReduce & Hadoop"
      subtitle="Büyük veri çağını başlatan programlama modeli ve onu açık kaynak dünyaya taşıyan ekosistem: HDFS, YARN ve MapReduce."
      bgGradient="linear-gradient(135deg, #16a34a 0%, #22c55e 100%)"
      shadow="0 20px 60px -10px rgba(34, 197, 94, 0.55)"
      icon={<Workflow className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  9 · MAPREDUCE AKIŞ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>MapReduce · programlama modeli</Eyebrow>
      <H2 className="mb-2">Map → Shuffle → Reduce</H2>
      <Sub className="max-w-3xl mb-6">
        Google&apos;ın 2004&apos;te tanıttığı bu model, her işi iki basit fonksiyona indirger:
        her parçayı bağımsız işleyen <span className="text-white">map</span> ve aynı anahtarlı
        sonuçları birleştiren <span className="text-white">reduce</span>. Aradaki shuffle adımını
        çerçeve yönetir.
      </Sub>
      <MapReduceFlow />
    </SlideShell>
  ),

  /* ─────────────────  10 · HADOOP EKOSİSTEMİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Apache Hadoop · üç temel bileşen</Eyebrow>
      <H2>Hadoop&apos;u oluşturan üç katman</H2>
      <Sub className="mt-3 max-w-3xl">
        Hadoop, MapReduce&apos;u açık kaynak olarak hayata geçiren ekosistemdir. Üç çekirdek
        parçası birlikte çalışır: depolama, kaynak yönetimi ve işleme.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={HardDrive}
          title="HDFS"
          desc="Dağıtılmış dosya sistemi. Dosyaları büyük bloklara (varsayılan 128 MB) böler, her bloğu 3 kopyada farklı düğümlerde saklar."
          delay={0.0}
          accent="#2563eb"
        />
        <FeatureCard
          icon={Gauge}
          title="YARN"
          desc="Kaynak yöneticisi (Yet Another Resource Negotiator). Kümedeki CPU/RAM&apos;i işlere paylaştırır, görevleri zamanlar."
          delay={0.1}
          accent="#a855f7"
        />
        <FeatureCard
          icon={Workflow}
          title="MapReduce"
          desc="İşleme motoru. Map ve Reduce aşamalarını kümeye dağıtır, ara sonuçları diske yazar — sağlam ama görece yavaş."
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
        <Database className="w-5 h-5 text-[#60a5fa] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-300">
          <span className="bvbb-token">Mimari</span> HDFS&apos;te bir <span className="text-white">NameNode</span>
          {" "}meta veriyi (hangi blok nerede) tutar; çok sayıda <span className="text-white">DataNode</span>
          {" "}gerçek blokları saklar. Bu ayrım, veri yerelliğini ve replikasyonu mümkün kılar.
        </p>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  11 · HDFS KOMUT TERMİNALİ  ───────────────── */
  () => (
    <SlideShell bgPattern={false}>
      <Eyebrow>Canlı çıktı · HDFS komut satırı</Eyebrow>
      <H2 className="mb-2">HDFS&apos;e dosya koymak nasıl görünür?</H2>
      <Sub className="max-w-3xl mb-6">
        HDFS, alıştığın Linux komutlarına benzer bir arayüz sunar. Aşağıda bir dosyayı yükleyip
        bloklara nasıl bölündüğünü ve kopyalandığını görüyoruz.
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
            <Terminal className="w-3 h-3" />
            <span>ocet@namenode:~ — hdfs dfs</span>
          </div>
        </div>
        <div className="bvbb-terminal">
          <div>
            <span className="bvbb-term-prompt">ocet@namenode</span>
            <span className="bvbb-term-dim">:~$</span>{" "}
            <span className="bvbb-term-cmd">hdfs dfs -put kitap.txt /veri/</span>
          </div>
          <div>
            <span className="bvbb-term-prompt">ocet@namenode</span>
            <span className="bvbb-term-dim">:~$</span>{" "}
            <span className="bvbb-term-cmd">hdfs dfs -ls /veri/</span>
          </div>
          <div className="bvbb-term-dim">Found 1 items</div>
          <div className="bvbb-term-dim">-rw-r--r--   <span className="bvbb-term-warn">3</span> ocet veri   <span className="bvbb-term-ip">312068608</span> /veri/kitap.txt</div>
          <div className="text-gray-600 mt-1"><span className="bvbb-term-dim"># 3 = replikasyon faktörü, 297 MB</span></div>
          <div className="mt-1">
            <span className="bvbb-term-prompt">ocet@namenode</span>
            <span className="bvbb-term-dim">:~$</span>{" "}
            <span className="bvbb-term-cmd">hdfs fsck /veri/kitap.txt -blocks</span>
          </div>
          <div className="bvbb-term-ok">Total blocks (validated):  3 (avg. block size 104022869 B)</div>
          <div className="bvbb-term-ok">Minimally replicated blocks:  3 (100.0 %)</div>
          <div className="bvbb-term-dim">Status: <span className="bvbb-term-ok">HEALTHY</span></div>
          <div className="mt-2">
            <span className="bvbb-term-prompt">ocet@namenode</span>
            <span className="bvbb-term-dim">:~$</span>{" "}
            <span className="bvbb-term-cmd">_</span>
            <span className="animate-pulse">█</span>
          </div>
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  12 · BÖLÜM 3 · APACHE SPARK  ───────────────── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Apache Spark"
      subtitle="MapReduce&apos;un diske yazma yükünü ortadan kaldıran bellek-içi (in-memory) motor: tipik iş yüklerinde çok daha hızlı ve çok daha sade kod."
      bgGradient="linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)"
      shadow="0 20px 60px -10px rgba(245, 158, 11, 0.55)"
      icon={<Zap className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  13 · NEDEN SPARK  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Spark · neden ortaya çıktı?</Eyebrow>
      <H2>MapReduce&apos;un darboğazı, Spark&apos;ın yanıtı</H2>
      <Sub className="mt-3 max-w-3xl">
        Klasik MapReduce her aşama arasında ara sonucu diske (HDFS) yazar. Çok adımlı işlerde
        (özellikle makine öğrenmesi) bu, sürekli disk okuma/yazma demektir. Spark ara sonuçları
        bellekte tutar.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <FeatureCard
          icon={Brain}
          title="RDD — esnek dağıtık veri kümesi"
          desc="Spark&apos;ın temel soyutlaması. Bölümlere ayrılmış, değişmez (immutable) bir koleksiyon; kayıp parça lineage&apos;den yeniden hesaplanır."
          delay={0.0}
          accent="#f59e0b"
        />
        <FeatureCard
          icon={Cloud}
          title="Bellek-içi işleme"
          desc="Ara sonuçlar RAM&apos;de kalır; tekrar tekrar okunan veride disk turlarını ortadan kaldırır — çok adımlı işlerde büyük hızlanma."
          delay={0.1}
          accent="#2563eb"
        />
        <FeatureCard
          icon={GitBranch}
          title="DAG & tembel değerlendirme"
          desc="Dönüşümler hemen çalışmaz; bir eylem (action) çağrılana dek Spark işin yönsüz çevrimsiz grafiğini (DAG) kurup en iyiler."
          delay={0.2}
          accent="#a855f7"
        />
        <FeatureCard
          icon={Layers}
          title="Tek motor, çok API"
          desc="Spark SQL, DataFrame, Streaming, MLlib aynı çekirdeği paylaşır. Hem toplu (batch) hem akış (stream) işleri tek çerçevede."
          delay={0.3}
          accent="#22c55e"
        />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  14 · WORDCOUNT KOD (Spark)  ───────────────── */
  () => (
    <SlideShell bgPattern={false}>
      <Eyebrow>Kod örneği · PySpark</Eyebrow>
      <H2 className="mb-2">Aynı WordCount, çok daha az satır</H2>
      <Sub className="max-w-3xl mb-6">
        Bölüm 2&apos;deki Map→Reduce akışının Spark&apos;taki karşılığı. Onlarca satırlık Java
        MapReduce şablonu, okunabilir birkaç satıra iner. Aynı paradigma, daha sade ifade.
      </Sub>
      <SparkCodeWindow />
    </SlideShell>
  ),

  /* ─────────────────  15 · SPARK-SUBMIT TERMİNAL  ───────────────── */
  () => (
    <SlideShell bgPattern={false}>
      <Eyebrow>Canlı çıktı · spark-submit</Eyebrow>
      <H2 className="mb-2">İş kümeye nasıl gönderilir?</H2>
      <Sub className="max-w-3xl mb-6">
        Yazdığın işi <span className="text-white">spark-submit</span> ile kümeye yollarsın. Spark
        işi aşamalara (stages) böler, görevleri (tasks) düğümlere dağıtır ve ilerlemeyi raporlar.
      </Sub>
      <SparkSubmitTerminal />
    </SlideShell>
  ),

  /* ─────────────────  16 · HADOOP vs SPARK TABLO  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Karşılaştırma</Eyebrow>
      <H2>Hadoop MapReduce vs Apache Spark</H2>
      <Sub className="mt-3 max-w-3xl">
        İkisi de dağıtılmış işleme çözer ama farklı dengeleri vardır. Spark, MapReduce&apos;u
        tamamen silmez — çoğu durumda onun üstüne, daha hızlı bir alternatif olarak gelir.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-8 bvbb-card rounded-xl p-1"
      >
        <table className="bvbb-tbl">
          <thead>
            <tr>
              <th style={{ width: "24%" }}>Boyut</th>
              <th style={{ width: "38%" }}>
                <Workflow className="inline w-4 h-4 mr-1.5 -mt-0.5 text-[#22c55e]" />
                Hadoop MapReduce
              </th>
              <th>
                <Zap className="inline w-4 h-4 mr-1.5 -mt-0.5 text-[#f59e0b]" />
                Apache Spark
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                k: "Ara veri",
                mr: "Her aşama arası diske (HDFS) yazılır",
                sp: "Bellekte (RAM) tutulur",
              },
              {
                k: "Hız",
                mr: "Sağlam ama disk turları yavaşlatır",
                sp: "Çok adımlı / yinelemeli işlerde belirgin daha hızlı",
              },
              {
                k: "Programlama",
                mr: "Map ve Reduce sınıfları, çok şablon kod",
                sp: "RDD/DataFrame API · Python, Scala, Java, R",
              },
              {
                k: "İş türü",
                mr: "Tek geçişli toplu (batch) işler",
                sp: "Batch + akış + SQL + ML tek motorda",
              },
              {
                k: "Bellek ihtiyacı",
                mr: "Düşük — diske dayanır",
                sp: "Yüksek — RAM&apos;e dayanır",
              },
            ].map((row, i) => (
              <motion.tr
                key={row.k}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <td className="font-medium text-white">{row.k}</td>
                <td className="text-gray-400">{row.mr}</td>
                <td className="text-[#fcd34d]">{row.sp}</td>
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
        <span className="bvbb-token">Not</span> Spark, HDFS ve YARN üzerinde de çalışabilir;
        depolama için sıklıkla Hadoop&apos;un dosya sistemini kullanmaya devam eder.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  17 · UYGULAMALI LAB  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
      <H2>Bulutta küçük bir Spark işi çalıştır</H2>
      <Sub className="mt-3 max-w-3xl">
        Tüm adımlar Free Tier ve yerel ortamla yapılabilir. Sonraki derse dört adımı tamamlamış
        ve <span className="text-white">spark-submit</span> çıktısının ekran görüntüsünü almış gelmen bekleniyor.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          {
            n: 1,
            t: "Spark&apos;ı yerelde kur",
            d: "pip install pyspark ile yerel (local[*]) modda Spark&apos;ı kur; tek makinede çok çekirdek simüle eder.",
            icon: Cpu,
            color: "#f59e0b",
          },
          {
            n: 2,
            t: "Bir metin dosyası hazırla",
            d: "Herhangi bir uzun .txt al (örn. açık kaynak bir kitap); bunu S3 bucket&apos;ına veya yerel klasöre koy.",
            icon: Database,
            color: "#2563eb",
          },
          {
            n: 3,
            t: "WordCount&apos;u çalıştır",
            d: "Slayttaki PySpark betiğini spark-submit ile çalıştır; çıktı part dosyalarını ve süreyi gözlemle.",
            icon: Terminal,
            color: "#22c55e",
          },
          {
            n: 4,
            t: "DAG&apos;ı incele",
            d: "Spark Web UI&apos;da (localhost:4040) Jobs ve Stages sekmelerini aç; map ve reduce aşamalarını gör.",
            icon: GitBranch,
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
                <div
                  className="text-base font-semibold text-white"
                  dangerouslySetInnerHTML={{ __html: item.t }}
                />
              </div>
              <p
                className="text-xs text-gray-400 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item.d }}
              />
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
        <span className="bvbb-token">İpucu</span> Gerçek bir küme istersen AWS EMR veya Google
        Dataproc birkaç tıkla yönetilen Spark/Hadoop kümesi açar — iş bitince kapat, maliyet sınırlı kalsın.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  18 · SIRADAKİ HAFTA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sıradaki hafta · önizleme</Eyebrow>
      <H2>Veri akışı &amp; gerçek zamanlı işleme</H2>
      <Sub className="mt-3 max-w-3xl">
        Bu hafta toplu (batch) veriyi işledik. Gelecek hafta veriyi durmadan akarken işlemeye
        bakacağız: olay tabanlı akışlar, pencereleme ve gerçek zamanlı pipeline&apos;lar.
      </Sub>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Activity}
          title="Stream vs Batch"
          desc="Sınırsız akan veri ile sınırlı toplu veri arasındaki temel fark ve ne zaman hangisi."
          delay={0.0}
          accent="#2563eb"
        />
        <FeatureCard
          icon={Workflow}
          title="Spark Structured Streaming"
          desc="Bu hafta öğrendiğimiz Spark motorunun akış verisine uzanan yüzü — aynı API."
          delay={0.1}
          accent="#f59e0b"
        />
        <FeatureCard
          icon={Clock}
          title="Pencereleme & gecikme"
          desc="Olay zamanı, pencere fonksiyonları ve geç gelen verinin (late data) yönetimi."
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
            Bu haftanın lab&apos;ını tamamla; PySpark kurulumunu derse hazır getir — akış örneklerini
            aynı ortamda deneyeceğiz.
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-500" />
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  19 · KAPANIŞ  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex w-24 h-24 rounded-3xl items-center justify-center mb-8"
          style={{
            background: "linear-gradient(135deg, #2563eb 0%, #f59e0b 100%)",
            boxShadow: "0 20px 60px -10px rgba(37,99,235,0.6)",
          }}
        >
          <Boxes className="w-12 h-12 text-white" />
        </motion.div>

        <Eyebrow>7. Hafta · Özet</Eyebrow>
        <H1>
          <span className="bvbb-shimmer">Böl, dağıt, birleştir</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Tek makineye sığmayan veriyi bir küme üzerinde paralel işlemeyi öğrendik: MapReduce
          paradigması, Hadoop&apos;un üç katmanı ve Spark&apos;ın bellek-içi hızı.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto text-left"
        >
          {[
            { icon: Network, label: "İlke", value: "Yatay ölçekle · veri yerelliği · hata toleransı" },
            { icon: Workflow, label: "Model", value: "Map → Shuffle → Reduce" },
            { icon: Zap, label: "Motor", value: "Hadoop (disk) ve Spark (bellek)" },
          ].map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="bvbb-card rounded-xl p-4"
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
          BVA 2103 · 7. Hafta · Dağıtılmış Hesaplama
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
