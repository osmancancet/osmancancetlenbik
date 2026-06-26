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
  Globe,
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
  BarChart3,
  Search,
  HardDrive,
  Box,
  Package,
  Filter,
  Code,
  Terminal,
  Workflow,
  GitBranch,
  Gauge,
  DollarSign,
  Table,
  LineChart,
  Calendar,
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

/* Bulut analitik mimarisi: ingest → store → process → serve */
function AnalyticsPipeline() {
  const stages = [
    {
      icon: Workflow,
      title: "Ingest",
      label: "Veri toplama",
      color: "#06b6d4",
      ex: "Kinesis · Pub/Sub · Event Hubs",
    },
    {
      icon: HardDrive,
      title: "Store",
      label: "Veri gölü",
      color: "#22c55e",
      ex: "S3 · GCS · ADLS (Parquet)",
    },
    {
      icon: Filter,
      title: "Process",
      label: "Dönüştürme & sorgu",
      color: "#a855f7",
      ex: "Spark · Athena · BigQuery",
    },
    {
      icon: LineChart,
      title: "Serve",
      label: "Görselleştirme",
      color: "#f59e0b",
      ex: "QuickSight · Looker · Power BI",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-7 gap-3 items-stretch"
    >
      {stages.map((s, i) => (
        <div key={s.title} className="contents">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="md:col-span-1 bvbb-flow-node rounded-xl p-4 flex flex-col"
            style={{ borderColor: `${s.color}55` }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
              style={{ background: `${s.color}22`, border: `1px solid ${s.color}66` }}
            >
              <s.icon className="w-5 h-5" style={{ color: s.color }} />
            </div>
            <div className="text-sm font-bold text-white">{s.title}</div>
            <div className="text-[11px] text-gray-400 mb-2">{s.label}</div>
            <div className="text-[10px] font-mono text-gray-500 mt-auto leading-relaxed">
              {s.ex}
            </div>
          </motion.div>
          {i < stages.length - 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.15 }}
              className="hidden md:flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5 text-[#60a5fa]" />
            </motion.div>
          )}
        </div>
      ))}
    </motion.div>
  );
}

/* Athena / serverless SQL sorgu konsolu mockup */
function QueryConsoleMock() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bvbb-window-chrome w-full"
    >
      {/* OS-level window bar */}
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
          <Globe className="w-3 h-3" />
          <span>console.aws.amazon.com/athena · Query editor</span>
        </div>
      </div>

      {/* SQL editor */}
      <div className="bvbb-query-body">
        <div>
          <span className="bvbb-sql-com">-- S3 üzerindeki ham loglardan en çok satan 5 ürün</span>
        </div>
        <div>
          <span className="bvbb-sql-kw">SELECT</span> urun_adi,{" "}
          <span className="bvbb-sql-fn">SUM</span>(adet){" "}
          <span className="bvbb-sql-kw">AS</span> toplam_adet
        </div>
        <div>
          <span className="bvbb-sql-kw">FROM</span>{" "}
          <span className="bvbb-sql-tbl">satislar</span>
        </div>
        <div>
          <span className="bvbb-sql-kw">WHERE</span> yil ={" "}
          <span className="bvbb-sql-num">2026</span>{" "}
          <span className="bvbb-sql-kw">AND</span> bolge ={" "}
          <span className="bvbb-sql-str">&apos;Ege&apos;</span>
        </div>
        <div>
          <span className="bvbb-sql-kw">GROUP BY</span> urun_adi
        </div>
        <div>
          <span className="bvbb-sql-kw">ORDER BY</span> toplam_adet{" "}
          <span className="bvbb-sql-kw">DESC</span>
        </div>
        <div>
          <span className="bvbb-sql-kw">LIMIT</span>{" "}
          <span className="bvbb-sql-num">5</span>;
        </div>
      </div>

      {/* Run bar */}
      <div
        className="flex items-center gap-3 px-4 py-2 text-[11px]"
        style={{ background: "#161b22", borderTop: "1px solid #30363d", color: "#8b949e" }}
      >
        <span
          className="px-3 py-1 rounded font-semibold"
          style={{ background: "#2563eb", color: "#fff" }}
        >
          ▶ Run
        </span>
        <span className="text-green-400">● Succeeded</span>
        <span>Süre: 1.8 sn</span>
        <span>Taranan veri: 0.42 GB</span>
        <span className="ml-auto text-[#fbbf24]">Tahmini ücret ≈ $0.0021</span>
      </div>

      {/* Result grid */}
      <table className="bvbb-grid">
        <thead>
          <tr>
            <th style={{ width: "8%" }}>#</th>
            <th>urun_adi</th>
            <th style={{ width: "25%" }}>toplam_adet</th>
          </tr>
        </thead>
        <tbody>
          {[
            { i: 1, n: "Zeytinyağı 1L", v: "12.840" },
            { i: 2, n: "Kuru İncir 500g", v: "9.512" },
            { i: 3, n: "Üzüm Pekmezi", v: "7.305" },
            { i: 4, n: "Tahin 350g", v: "6.118" },
            { i: 5, n: "Lavanta Sabunu", v: "4.977" },
          ].map((r) => (
            <tr key={r.i}>
              <td className="text-gray-500">{r.i}</td>
              <td className="text-white">{r.n}</td>
              <td className="text-[#7ee787]">{r.v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

/* CSV vs Parquet kolonsal depolama karşılaştırması */
function StorageFormatDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Row-based CSV */}
      <div className="bvbb-card rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Table className="w-5 h-5 text-gray-300" />
          <div className="text-sm font-semibold text-white">CSV — satır tabanlı</div>
          <span className="ml-auto text-[10px] text-gray-500 font-mono">ROW STORE</span>
        </div>
        <div className="space-y-1.5 font-mono text-[11px]">
          {[
            "1, Ali, Manisa, 1200",
            "2, Ayşe, İzmir, 1850",
            "3, Veli, Aydın, 940",
          ].map((row) => (
            <div
              key={row}
              className="rounded px-3 py-1.5 text-gray-300"
              style={{ background: "rgba(148,163,184,0.08)", border: "1px solid rgba(148,163,184,0.18)" }}
            >
              {row}
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-[10px]">
          <div className="bvbb-heat-low rounded px-2 py-1 text-center">Tüm satır okunur</div>
          <div className="bvbb-heat-mid rounded px-2 py-1 text-center">Zayıf sıkıştırma</div>
        </div>
      </div>

      {/* Columnar Parquet */}
      <div className="bvbb-card-sky rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-5 h-5 text-sky-300" />
          <div className="text-sm font-semibold text-white">Parquet — kolon tabanlı</div>
          <span className="ml-auto text-[10px] text-sky-300/80 font-mono">COLUMN STORE</span>
        </div>
        <div className="space-y-1.5 font-mono text-[11px]">
          {[
            { c: "id", v: "[1, 2, 3]", color: "#60a5fa" },
            { c: "ad", v: "[Ali, Ayşe, Veli]", color: "#22c55e" },
            { c: "sehir", v: "[Manisa, İzmir, Aydın]", color: "#a855f7" },
            { c: "tutar", v: "[1200, 1850, 940]", color: "#f59e0b" },
          ].map((col) => (
            <div
              key={col.c}
              className="rounded px-3 py-1.5 flex items-center gap-2"
              style={{ background: `${col.color}12`, border: `1px solid ${col.color}40` }}
            >
              <span style={{ color: col.color }}>{col.c}:</span>
              <span className="text-gray-300">{col.v}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-[10px]">
          <div className="bvbb-heat-high rounded px-2 py-1 text-center">Sadece gereken kolon</div>
          <div className="bvbb-heat-high rounded px-2 py-1 text-center">Güçlü sıkıştırma</div>
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
        <Eyebrow>BVA 2103 · 13. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="bvbb-shimmer">Bulutta</span>
          <br />
          <span className="text-white">Veri Analitiği</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Ham veriyi karara dönüştürmek. Veri gölü, sunucusuz sorgu motorları
          ve analitik hattı — terabaytları SQL ile sorgulamaya hoş geldiniz.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {[
            { name: "Data Lake", tag: "S3 · GCS · ADLS", color: "#22c55e", icon: HardDrive },
            { name: "Sorgu Motoru", tag: "Athena · BigQuery", color: "#2563eb", icon: Search },
            { name: "BI & Görsel", tag: "QuickSight · Looker", color: "#f59e0b", icon: BarChart3 },
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

  /* ─────────────────  2 · KÖPRÜ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 12. haftadan 13. haftaya</Eyebrow>
      <H2>Veriyi sakladık; şimdi ondan anlam çıkarıyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta NoSQL ve veri ambarı (DWH) ile büyük veriyi nereye
        koyacağımızı konuştuk. Veri durduğu yerde değer üretmez — bu hafta o
        veriyi sorgulayıp görselleştiren bulut analitik hattını kuruyoruz.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bvbb-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#93c5fd]">
            <Database className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Geçen hafta · Depolama</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#2563eb] flex-shrink-0" />NoSQL: doküman, anahtar-değer, kolon ailesi</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#2563eb] flex-shrink-0" />Veri ambarı: şema-on-write, yapılandırılmış</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#2563eb] flex-shrink-0" />Veri durur, ama henüz sorgulanmaz</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="bvbb-card-sky rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#67e8f9]">
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu hafta · Analitik</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Veri gölü ve lakehouse mimarisi</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Sunucusuz sorgu: doğrudan S3 üzerinde SQL</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Toplu (batch) vs akış (stream) analitik</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3 · DERSİN AKIŞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: veri gölü → sorgu → karar</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce ham veriyi nereye koyduğumuza ve hangi formatla sakladığımıza
        bakıyoruz; sonra onu sunucusuz motorlarla sorguluyoruz; en son
        görselleştirip iş kararına bağlıyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            range: "01",
            title: "Veri Gölü & Lakehouse",
            items: ["Lake vs Warehouse", "Şema-on-read", "Parquet kolonsal format"],
            icon: HardDrive,
            accent: "#22c55e",
          },
          {
            range: "02",
            title: "Sunucusuz Sorgu",
            items: ["Athena · BigQuery · Synapse", "S3 üzerinde SQL", "Taranan veriye göre ücret"],
            icon: Search,
            accent: "#2563eb",
          },
          {
            range: "03",
            title: "Batch vs Stream",
            items: ["Spark toplu işleme", "Kinesis / Pub/Sub akışı", "Görselleştirme & BI"],
            icon: Workflow,
            accent: "#a855f7",
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

  /* ─────────────────  4 · ANALİTİK HATTI  ───────────────── */
  () => (
    <SlideShell bgPattern={false}>
      <Eyebrow>Genel bakış · uçtan uca</Eyebrow>
      <H2>Bulut analitik hattı</H2>
      <Sub className="mt-3 max-w-3xl">
        Her bulut analitiği aynı dört adımı izler: veriyi topla, ucuza sakla,
        ölçeklenebilir biçimde işle, sonucu insana göster. Tüm dersi bu hat
        üzerinden okuyacağız.
      </Sub>
      <div className="mt-8">
        <AnalyticsPipeline />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-[11px] text-gray-500 text-center"
      >
        <span className="bvbb-token">Not</span> Her adım ayrı bir bulut hizmetidir;
        sağlayıcı bunları yönetir, sen yalnızca veriyi ve sorguyu getirirsin.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  5 · BÖLÜM 1  ───────────────── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Veri Gölü & Lakehouse"
      subtitle="Veriyi işlemeden önce nereye, hangi formatta koyduğumuz analitik performansını ve maliyeti doğrudan belirler."
      bgGradient="linear-gradient(135deg, #16a34a 0%, #22c55e 100%)"
      shadow="0 20px 60px -10px rgba(34, 197, 94, 0.55)"
      icon={<HardDrive className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  6 · LAKE vs WAREHOUSE  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Karşılaştırma · iki yaklaşım</Eyebrow>
      <H2>Veri gölü vs Veri ambarı</H2>
      <Sub className="mt-3 max-w-3xl">
        İkisi de büyük veriyi tutar ama felsefeleri zıttır: göl &quot;önce at,
        sonra anlamlandır&quot;; ambar &quot;önce şekle sok, sonra yükle&quot;.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-8 bvbb-card rounded-xl overflow-hidden"
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#1e293b] text-gray-300">
              <th className="text-left px-4 py-3 font-semibold">Boyut</th>
              <th className="text-left px-4 py-3 font-semibold">
                <HardDrive className="inline w-4 h-4 mr-1.5 -mt-0.5 text-[#22c55e]" />
                Veri Gölü (Lake)
              </th>
              <th className="text-left px-4 py-3 font-semibold">
                <Database className="inline w-4 h-4 mr-1.5 -mt-0.5 text-[#60a5fa]" />
                Veri Ambarı (DWH)
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {[
              {
                k: "Şema",
                lake: "Şema-on-read (okurken çözülür)",
                dwh: "Şema-on-write (yazmadan tanımlı)",
              },
              {
                k: "Veri türü",
                lake: "Ham · yapılandırılmış + yarı + yapısız",
                dwh: "Temizlenmiş · yapılandırılmış",
              },
              {
                k: "Format",
                lake: "Parquet, JSON, CSV, görüntü, log",
                dwh: "İlişkisel tablolar (kolonsal motor)",
              },
              {
                k: "Maliyet",
                lake: "Çok ucuz nesne deposu (GB başı düşük)",
                dwh: "Daha pahalı, optimize hesaplama",
              },
              {
                k: "Tipik kullanıcı",
                lake: "Veri bilimci, mühendis (keşif)",
                dwh: "Analist, BI (raporlama)",
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
                <td className="px-4 py-3 text-[#86efac]">{row.lake}</td>
                <td className="px-4 py-3 text-[#93c5fd]">{row.dwh}</td>
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
        <span className="bvbb-token">Lakehouse</span> İkisinin birleşimi:
        gölün ucuzluğu + ambarın ACID işlem ve şema güvencesi (Delta Lake,
        Apache Iceberg, BigLake).
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  7 · DOSYA FORMATI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Depolama formatı · neden önemli?</Eyebrow>
      <H2>CSV vs Parquet</H2>
      <Sub className="mt-3 max-w-3xl">
        Analitikte sorgu çoğunlukla birkaç kolona bakar. Satır tabanlı CSV her
        satırı baştan sona okur; kolon tabanlı Parquet sadece gereken kolonu
        getirir — daha az veri taranır, daha az ücret.
      </Sub>
      <div className="mt-8">
        <StorageFormatDiagram />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-5 text-[11px] text-gray-500 text-center"
      >
        <span className="bvbb-token">Pratik</span> Sunucusuz sorgu motorları
        taranan veri üzerinden ücretlendirir; CSV&apos;yi Parquet&apos;e çevirmek
        hem sorguyu hızlandırır hem faturayı küçültür.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  8 · BÖLÜM 2  ───────────────── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Sunucusuz Sorgu"
      subtitle="Küme kurmadan, sunucu yönetmeden doğrudan veri gölü üzerinde SQL çalıştırmak. Sadece sorgu yaz, sadece taradığın veriye öde."
      bgGradient="linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)"
      shadow="0 20px 60px -10px rgba(37, 99, 235, 0.6)"
      icon={<Search className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  9 · 3 SAĞLAYICI MOTORU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Üç sağlayıcı · aynı fikir</Eyebrow>
      <H2>Sunucusuz analitik servisleri</H2>
      <Sub className="mt-3 max-w-3xl">
        Üç büyük bulut da &quot;küme yok, sadece sorgu&quot; modelini sunar.
        Arayüz farklı, mantık aynı: depodaki dosyaya SQL ile bak.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[
          {
            brand: "AWS",
            name: "Amazon Athena",
            icon: Cloud,
            color: "#ff9900",
            engine: "Presto / Trino tabanlı",
            note: "S3 üzerinde doğrudan SQL; Glue Data Catalog ile şema.",
          },
          {
            brand: "GCP",
            name: "BigQuery",
            icon: Cloud,
            color: "#4285f4",
            engine: "Dremel tabanlı",
            note: "Petabayt ölçeğinde sorgu; depolama ve hesaplama ayrık.",
          },
          {
            brand: "Azure",
            name: "Synapse Serverless",
            icon: Cloud,
            color: "#0078d4",
            engine: "Polaris / T-SQL",
            note: "ADLS üzerindeki Parquet/CSV'yi T-SQL ile sorgular.",
          },
        ].map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bvbb-card bvbb-card-hover rounded-xl p-5"
            style={{ borderColor: `${s.color}55` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${s.color}22`, border: `1px solid ${s.color}66` }}
              >
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <span
                className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded"
                style={{ background: `${s.color}1a`, color: s.color }}
              >
                {s.brand}
              </span>
            </div>
            <div className="text-base font-bold text-white">{s.name}</div>
            <div className="text-[11px] font-mono text-gray-500 mt-0.5">{s.engine}</div>
            <p className="text-xs text-gray-400 mt-3 leading-relaxed">{s.note}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-5 text-center text-[11px] text-gray-500"
      >
        Ortak fikir: depolama (veri gölü) ile hesaplama (sorgu motoru) ayrılır —
        kullanılmadığında hesaplama için ücret ödenmez.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  10 · ATHENA SORGU KONSOLU  ───────────────── */
  () => (
    <SlideShell bgPattern={false}>
      <Eyebrow>Canlı örnek · Athena Query Editor</Eyebrow>
      <H2 className="text-center md:text-left">S3&apos;teki veriye doğrudan SQL</H2>
      <Sub className="mt-3 max-w-3xl">
        Hiç sunucu açmadan, S3&apos;teki ham satış loglarını sorguluyoruz.
        Dikkat: çalışma süresi, taranan veri miktarı ve tahmini ücret birlikte raporlanır.
      </Sub>
      <div className="mt-6">
        <QueryConsoleMock />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  11 · MALİYET MODELİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sunucusuz · maliyet mantığı</Eyebrow>
      <H2 className="mb-2">Faturayı taranan veri belirler</H2>
      <Sub className="max-w-3xl mb-8">
        Sunucusuz sorguda çoğu sağlayıcı taranan veri miktarına göre ücret alır.
        Aynı sorguyu üç şekilde yazıp ne kadar veri taradığına bakalım.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: "SELECT *",
            color: "#f87171",
            icon: X,
            scan: "Tüm tablo",
            tag: "En pahalı",
            desc: "Bütün kolonlar + bütün bölümler taranır. Gerekmedikçe asla kullanma.",
          },
          {
            title: "Kolon seç",
            color: "#fbbf24",
            icon: Filter,
            scan: "Sadece gereken kolonlar",
            tag: "Orta",
            desc: "Parquet'te yalnız seçili kolon okunur — taranan veri düşer.",
          },
          {
            title: "Kolon + bölüm (partition)",
            color: "#34d399",
            icon: Check,
            scan: "Kolon ∩ ilgili bölüm",
            tag: "En ucuz",
            desc: "WHERE yil=2026 ile yalnız o bölümün dosyaları taranır (partition pruning).",
          },
        ].map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="bvbb-card rounded-xl p-6"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ background: `${p.color}18`, border: `1px solid ${p.color}55` }}
            >
              <p.icon className="w-6 h-6" style={{ color: p.color }} />
            </div>
            <div className="font-mono text-base font-bold mb-1 text-white">{p.title}</div>
            <div className="text-xs font-semibold mb-2" style={{ color: p.color }}>
              {p.tag} · {p.scan}
            </div>
            <p className="text-xs text-gray-400 border-t border-white/5 pt-3 leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-5 text-[11px] text-gray-500 text-center"
      >
        <span className="bvbb-token">Kural</span> Veriyi bölümle (partition),
        kolonsal formatta sakla, sadece gereken kolonu seç — üçü birlikte faturayı katlarca düşürür.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  12 · BÖLÜM 3  ───────────────── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Batch & Stream"
      subtitle="Veri ya birikip toplu işlenir (batch) ya da geldiği anda işlenir (stream). Bulut her ikisi için ayrı, yönetilen servisler sunar."
      bgGradient="linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)"
      shadow="0 20px 60px -10px rgba(124, 58, 237, 0.6)"
      icon={<Workflow className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  13 · BATCH vs STREAM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>İki işleme modeli</Eyebrow>
      <H2>Toplu işleme vs Akış işleme</H2>
      <Sub className="mt-3 max-w-3xl">
        &quot;Sonuca ne kadar hızlı ihtiyacım var?&quot; sorusu modeli belirler.
        Gece çalışan bir rapor batch&apos;tir; dolandırıcılık uyarısı stream&apos;dir.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          {
            n: "Batch (Toplu)",
            icon: Package,
            color: "#2563eb",
            ex: "Spark · EMR · Dataproc · Glue",
            when: "Gecelik raporlar, ETL, model eğitimi",
            lat: "Dakikalar–saatler",
            pro: "Büyük hacim için verimli, ucuz",
            con: "Sonuç gecikmeli; gerçek zamanlı değil",
          },
          {
            n: "Stream (Akış)",
            icon: Zap,
            color: "#a855f7",
            ex: "Kinesis · Pub/Sub · Flink · Spark Streaming",
            when: "Canlı pano, anomali/dolandırıcılık tespiti",
            lat: "Milisaniye–saniye",
            pro: "Anlık karar, taze veri",
            con: "Daha karmaşık, durum (state) yönetimi gerekir",
          },
        ].map((d, i) => (
          <motion.div
            key={d.n}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bvbb-card rounded-xl p-5"
            style={{ borderColor: `${d.color}55` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${d.color}22`, border: `1px solid ${d.color}66` }}
              >
                <d.icon className="w-5 h-5" style={{ color: d.color }} />
              </div>
              <div>
                <div className="text-base font-bold text-white">{d.n}</div>
                <div className="text-[10px] text-gray-500 font-mono">{d.ex}</div>
              </div>
              <span className="ml-auto flex items-center gap-1 text-[10px] font-mono text-gray-400">
                <Gauge className="w-3.5 h-3.5" /> {d.lat}
              </span>
            </div>
            <div className="text-xs text-gray-300 mb-3">
              <span className="text-gray-500">Tipik kullanım: </span>{d.when}
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bvbb-heat-high rounded p-2">
                <div className="flex items-center gap-1 font-semibold text-[10px] uppercase tracking-wider">
                  <Check className="w-3 h-3" /> Avantaj
                </div>
                <div className="mt-1">{d.pro}</div>
              </div>
              <div className="bvbb-heat-low rounded p-2">
                <div className="flex items-center gap-1 font-semibold text-[10px] uppercase tracking-wider">
                  <X className="w-3 h-3" /> Dezavantaj
                </div>
                <div className="mt-1">{d.con}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  14 · SPARK ETL TERMINAL  ───────────────── */
  () => (
    <SlideShell bgPattern={false}>
      <Eyebrow>Canlı çıktı · PySpark ETL işi</Eyebrow>
      <H2 className="text-center md:text-left">CSV&apos;yi Parquet&apos;e dönüştür</H2>
      <Sub className="mt-3 max-w-3xl">
        Tipik bir toplu işleme adımı: ham CSV&apos;yi oku, temizle, bölümle ve
        kolonsal Parquet olarak veri gölüne yaz. Sonraki sorgular bu çıktıyı kullanır.
      </Sub>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bvbb-window-chrome w-full mt-6"
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
            <span>emr@cluster:~ — spark-submit etl.py</span>
          </div>
        </div>
        <div className="bvbb-query-body">
          <div><span className="bvbb-sql-com"># PySpark — ham logları temizle ve Parquet olarak yaz</span></div>
          <div>df = spark.<span className="bvbb-sql-fn">read</span>.<span className="bvbb-sql-fn">option</span>(<span className="bvbb-sql-str">&quot;header&quot;</span>, <span className="bvbb-sql-str">&quot;true&quot;</span>) \</div>
          <div className="pl-6">.<span className="bvbb-sql-fn">csv</span>(<span className="bvbb-sql-str">&quot;s3://veri-golu/ham/satislar/&quot;</span>)</div>
          <div className="mt-1">temiz = df.<span className="bvbb-sql-fn">dropna</span>().<span className="bvbb-sql-fn">withColumn</span>(<span className="bvbb-sql-str">&quot;yil&quot;</span>, <span className="bvbb-sql-fn">year</span>(<span className="bvbb-sql-str">&quot;tarih&quot;</span>))</div>
          <div className="mt-1">temiz.<span className="bvbb-sql-fn">write</span>.<span className="bvbb-sql-fn">partitionBy</span>(<span className="bvbb-sql-str">&quot;yil&quot;</span>, <span className="bvbb-sql-str">&quot;bolge&quot;</span>) \</div>
          <div className="pl-6">.<span className="bvbb-sql-fn">parquet</span>(<span className="bvbb-sql-str">&quot;s3://veri-golu/islenmis/satislar/&quot;</span>)</div>
          <div className="mt-3" style={{ color: "#8b949e" }}>24/06 11:02 INFO DAGScheduler: Job 0 finished, took 38.4 s</div>
          <div style={{ color: "#7ee787" }}>✔ 4.812.005 satır okundu · 11.940 hatalı satır atıldı</div>
          <div style={{ color: "#7ee787" }}>✔ 6 bölüm (yil×bolge) · 1.2 GB → 184 MB Parquet (sıkıştırma ~6.5x)</div>
          <div className="mt-2">
            <span style={{ color: "#7ee787" }}>emr@cluster</span>
            <span style={{ color: "#8b949e" }}>:~$</span>{" "}
            <span style={{ color: "#c9d1d9" }}>_</span>
            <span className="animate-pulse">█</span>
          </div>
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  15 · UYGULAMALI LAB  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
      <H2>Veri gölünde dört adımda analitik</H2>
      <Sub className="mt-3 max-w-3xl">
        Free Tier hesabınla, S3&apos;e bir veri seti yükleyip Athena ile
        sorgulayacaksın. Sonraki derse çıktıların ekran görüntüsüyle gelmen bekleniyor.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          {
            n: 1,
            t: "S3'e veri seti yükle",
            d: "Açık bir CSV (örn. belediye/ulaşım verisi) indir, s3://<bucket>/ham/ altına koy.",
            icon: HardDrive,
            color: "#22c55e",
          },
          {
            n: 2,
            t: "Glue ile tablo tanımla",
            d: "Crawler çalıştır ya da CREATE EXTERNAL TABLE ile şemayı Athena'ya tanıt.",
            icon: Box,
            color: "#2563eb",
          },
          {
            n: 3,
            t: "Athena'da sorgula",
            d: "GROUP BY / ORDER BY ile bir özet çıkar; taranan veri ve süreyi not al.",
            icon: Search,
            color: "#a855f7",
          },
          {
            n: 4,
            t: "Parquet'e çevir, tekrar sorgula",
            d: "CTAS (CREATE TABLE AS) ile Parquet üret; taranan veri farkını karşılaştır.",
            icon: Filter,
            color: "#f59e0b",
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
        <span className="bvbb-token">İpucu</span> Sorguyu küçük tut: önce LIMIT
        ile dene, doğru çalıştığından emin olunca tam veride çalıştır — Free Tier kotanı koru.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  16 · GÖRSELLEŞTİRME & BI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Son adım · veriden karara</Eyebrow>
      <H2>
        Sorgu sonucu <span className="bvbb-shimmer-sky">panoya</span> dönüşür
      </H2>
      <Sub className="mt-3 max-w-3xl">
        Analitik hattının çıktısı bir sayı yığını değil, bir karardır.
        BI araçları sorgu sonucunu yöneticinin anlayacağı görsele çevirir.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={BarChart3}
          title="BI panoları"
          desc="QuickSight, Looker Studio, Power BI — sorgu sonucunu interaktif grafik ve panolara bağlar."
          delay={0.0}
          accent="#f59e0b"
        />
        <FeatureCard
          icon={Code}
          title="Notebook & SQL"
          desc="Jupyter, Databricks, BigQuery konsolu — keşifsel analiz ve tekrar üretilebilir sorgular."
          delay={0.1}
          accent="#2563eb"
        />
        <FeatureCard
          icon={Brain}
          title="Karar & aksiyon"
          desc="Stok planı, kampanya hedefi, kapasite tahmini — veriden çıkan somut iş kararı."
          delay={0.2}
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
          <span className="bvbb-token">Özet</span> Topla → ucuza sakla → sunucusuz
          sorgula → görselleştir. Bulut, bu zincirin her halkasını yönetilen bir
          servise indirger; sen mimariye ve soruya odaklanırsın.
        </p>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  17 · SIRADAKİ HAFTA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Hafta 14 Önizleme</Eyebrow>
      <H2>Güvenlik &amp; maliyet yönetimi</H2>
      <Sub className="mt-3 max-w-3xl">
        Analitik hattımız çalışıyor — ama bu verinin korunması ve faturanın
        kontrol altında tutulması gerekiyor. Gelecek hafta bulutta güvenlik ve
        maliyet optimizasyonunu işliyoruz.
      </Sub>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={GitBranch}
          title="Erişim & izolasyon"
          desc="IAM rolleri, en az yetki, bucket politikaları ve veri şifreleme (at-rest / in-transit)."
          delay={0.0}
          accent="#2563eb"
        />
        <FeatureCard
          icon={DollarSign}
          title="Maliyet izleme"
          desc="Cost Explorer, bütçe uyarıları, taranan veri kotaları ve depolama yaşam döngüsü kuralları."
          delay={0.1}
          accent="#22c55e"
        />
        <FeatureCard
          icon={Gauge}
          title="Optimizasyon"
          desc="Spot/Reserved kapasite, Free Tier sınırları, gereksiz kaynakların kapatılması."
          delay={0.2}
          accent="#a855f7"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 bvbb-card rounded-xl p-5 flex items-center gap-4"
      >
        <Calendar className="w-6 h-6 text-[#60a5fa]" />
        <div className="flex-1">
          <div className="text-sm font-semibold text-white">Hazırlık</div>
          <div className="text-xs text-gray-400 mt-0.5">
            Bu haftanın lab çıktısını yanında getir · AWS faturanı (MTD cost)
            ve Cost Explorer ekranını bir kez aç ve incele.
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
            background: "linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)",
            boxShadow: "0 20px 60px -10px rgba(37,99,235,0.6)",
          }}
        >
          <BarChart3 className="w-12 h-12 text-white" />
        </motion.div>

        <Eyebrow>Hafta 13 · Son</Eyebrow>
        <H1>
          <span className="bvbb-shimmer">Teşekkürler!</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Ham veriyi karara dönüştürdük. Sorular için derslik 7&apos;de
          buluşuyoruz — lab çıktılarınızı getirmeyi unutmayın.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {[
            { icon: Calendar, label: "Ders saati", value: "Çarşamba 09:55 — 12:30" },
            { icon: Target, label: "Teslim", value: "Athena lab raporu · 4 adım" },
            { icon: Globe, label: "Ders yöneticisi", value: "Öğr. Gör. Osman Can Çetlenbik" },
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
          BVA 2103 · 13. Hafta · Bulutta Veri Analitiği
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
