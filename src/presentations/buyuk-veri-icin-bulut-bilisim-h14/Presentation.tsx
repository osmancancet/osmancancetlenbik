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
  Brain,
  Cloud,
  Database,
  Cpu,
  Server,
  Workflow,
  Boxes,
  Rocket,
  Gauge,
  Layers,
  Target,
  Sparkles,
  Code,
  Terminal,
  Table,
  Activity,
  Wand2,
  GitBranch,
  CheckCircle2,
  AlertTriangle,
  DollarSign,
  ListChecks,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
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

function MLPipeline() {
  const steps = [
    { icon: Database, label: "Veri", sub: "S3 / GCS / Blob", color: "#22c55e" },
    { icon: Wand2, label: "Hazırlık", sub: "Temizle · öznitelik", color: "#0ea5e9" },
    { icon: Cpu, label: "Eğitim", sub: "GPU küme", color: "#a855f7" },
    { icon: Gauge, label: "Değerlendirme", sub: "Metrikler", color: "#f59e0b" },
    { icon: Rocket, label: "Dağıtım", sub: "Endpoint", color: "#2563eb" },
    { icon: Activity, label: "İzleme", sub: "Drift · log", color: "#ef4444" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bvbb-card rounded-xl p-6"
    >
      <div className="flex flex-col md:flex-row items-stretch gap-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="flex items-center gap-3 flex-1"
          >
            <div className="flex-1 rounded-lg p-3 text-center bvbb-card">
              <div
                className="w-10 h-10 mx-auto rounded-lg flex items-center justify-center mb-2"
                style={{ background: `${s.color}22`, border: `1px solid ${s.color}66` }}
              >
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <div className="text-xs font-semibold text-white">{s.label}</div>
              <div className="text-[10px] text-gray-500 font-mono mt-0.5">{s.sub}</div>
            </div>
            {i < steps.length - 1 && (
              <ChevronRight className="w-5 h-5 text-gray-600 flex-shrink-0 hidden md:block" />
            )}
          </motion.div>
        ))}
      </div>
      <div className="mt-4 text-[11px] text-gray-500 text-center font-mono">
        Bulut ML akışı tek seferlik değil — &quot;İzleme&quot; adımı veriyi tekrar besler:
        sürekli bir döngü (MLOps).
      </div>
    </motion.div>
  );
}

function SageMakerStudioMock() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bvbb-window-chrome w-full"
    >
      {/* Window bar */}
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
          <Brain className="w-3 h-3" />
          <span>SageMaker Studio · train.ipynb</span>
        </div>
      </div>

      {/* Notebook body */}
      <div className="bvbb-terminal">
        <div className="text-[#6b7280]"># [1] Kütüphaneler &amp; SageMaker oturumu</div>
        <div>
          <span className="text-[#a855f7]">import</span>{" "}
          <span className="text-[#c9d1d9]">sagemaker, boto3</span>
        </div>
        <div>
          <span className="text-[#c9d1d9]">sess</span> ={" "}
          <span className="text-[#60a5fa]">sagemaker</span>.Session()
        </div>
        <div className="mt-2 text-[#6b7280]"># [2] S3&apos;teki eğitim verisini bağla</div>
        <div>
          <span className="text-[#c9d1d9]">train</span> ={" "}
          <span className="text-[#34d399]">&quot;s3://mcbu-ml/veri/train.csv&quot;</span>
        </div>
        <div className="mt-2 text-[#6b7280]"># [3] XGBoost tahmincisini tanımla (yönetilen kapsayıcı)</div>
        <div>
          <span className="text-[#c9d1d9]">est</span> = Estimator(image, role,
        </div>
        <div className="pl-6">
          instance_type=<span className="text-[#34d399]">&quot;ml.m5.large&quot;</span>,
          instance_count=<span className="text-[#a5b4fc]">1</span>)
        </div>
        <div className="mt-2">
          <span className="text-[#c9d1d9]">est</span>.fit(
          {"{"}<span className="text-[#34d399]">&quot;train&quot;</span>: train{"}"})
        </div>
        <div className="mt-2 text-[#34d399]">
          2026-06-26 09:58:14 Training - Downloading the training image...
        </div>
        <div className="text-[#34d399]">[0]&#9;train-rmse:0.41207&#9;valid-rmse:0.44910</div>
        <div className="text-[#34d399]">[24]&#9;train-rmse:0.18803&#9;valid-rmse:0.21744</div>
        <div className="text-[#fbbf24]">
          Training seconds: 96 · Billable seconds: 96
        </div>
        <div className="mt-2 text-[#6b7280]"># [4] Tek satırla gerçek-zamanlı endpoint aç</div>
        <div>
          <span className="text-[#c9d1d9]">pred</span> = est.deploy(
          instance_type=<span className="text-[#34d399]">&quot;ml.t2.medium&quot;</span>)
        </div>
        <div>
          <span className="text-[#60a5fa]">---&gt;</span> Endpoint{" "}
          <span className="text-[#a5b4fc]">xgb-mcbu-2026</span> InService{" "}
          <span className="animate-pulse">█</span>
        </div>
      </div>
    </motion.div>
  );
}

function ConfusionMatrix() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bvbb-card rounded-xl p-6"
    >
      <div className="text-xs font-mono uppercase tracking-widest text-[#60a5fa] mb-4">
        Karmaşıklık matrisi · ikili sınıflandırma
      </div>
      <div className="grid grid-cols-[auto_1fr_1fr] gap-2 text-center text-sm">
        <div />
        <div className="text-[11px] text-gray-400 font-mono py-1">Tahmin: Pozitif</div>
        <div className="text-[11px] text-gray-400 font-mono py-1">Tahmin: Negatif</div>

        <div className="text-[11px] text-gray-400 font-mono flex items-center justify-end pr-2">
          Gerçek: Poz.
        </div>
        <div className="bvbb-cm-tp rounded-lg p-4">
          <div className="text-2xl font-bold">86</div>
          <div className="text-[10px] mt-1">TP · doğru pozitif</div>
        </div>
        <div className="bvbb-cm-fn rounded-lg p-4">
          <div className="text-2xl font-bold">14</div>
          <div className="text-[10px] mt-1">FN · kaçırılan</div>
        </div>

        <div className="text-[11px] text-gray-400 font-mono flex items-center justify-end pr-2">
          Gerçek: Neg.
        </div>
        <div className="bvbb-cm-fp rounded-lg p-4">
          <div className="text-2xl font-bold">9</div>
          <div className="text-[10px] mt-1">FP · yanlış alarm</div>
        </div>
        <div className="bvbb-cm-tn rounded-lg p-4">
          <div className="text-2xl font-bold">891</div>
          <div className="text-[10px] mt-1">TN · doğru negatif</div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3 text-center">
        <div className="bvbb-card-sky rounded-lg p-3">
          <div className="text-[10px] text-gray-400 uppercase tracking-wider">Doğruluk</div>
          <div className="text-lg font-bold text-white">%97.7</div>
        </div>
        <div className="bvbb-card-sky rounded-lg p-3">
          <div className="text-[10px] text-gray-400 uppercase tracking-wider">Kesinlik</div>
          <div className="text-lg font-bold text-white">%90.5</div>
        </div>
        <div className="bvbb-card-sky rounded-lg p-3">
          <div className="text-[10px] text-gray-400 uppercase tracking-wider">Duyarlılık</div>
          <div className="text-lg font-bold text-white">%86.0</div>
        </div>
      </div>
      <div className="mt-4 text-[11px] text-gray-500">
        <span className="bvbb-token">Dikkat</span> Dengesiz veride yalnız doğruluğa bakma:
        991 negatife hep &quot;negatif&quot; demek de %90+ doğruluk verir ama hiçbir pozitifi
        yakalamaz. Kesinlik ve duyarlılık dengesi önemlidir.
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
        <Eyebrow>BVA 2103 · 14. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="bvbb-shimmer">Bulutta</span>
          <br />
          <span className="text-white">Makine Öğrenimi</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Modeli kendi bilgisayarında değil bulutta eğit, dağıt ve izle. SageMaker,
          Vertex AI ve Azure ML ile uçtan uca yönetilen ML akışı.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {[
            { name: "SageMaker", tag: "AWS", color: "#ff9900", icon: Brain },
            { name: "Vertex AI", tag: "Google Cloud", color: "#4285f4", icon: Brain },
            { name: "Azure ML", tag: "Microsoft", color: "#0078d4", icon: Brain },
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
      <Eyebrow>Köprü · 13. haftadan 14. haftaya</Eyebrow>
      <H2>Veriyi depoladık ve sorguladık; şimdi ondan tahmin üretiyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Önceki haftalarda HDFS, Spark ve NoSQL ile büyük veriyi sakladık ve işledik.
        Bu hafta o veriyi bir adım öteye taşıyoruz: bulutun yönetilen ML servisleriyle
        model eğitip canlı tahmin servisine dönüştürüyoruz.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bvbb-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#60a5fa]">
            <Database className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Şimdiye kadar</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#2563eb] flex-shrink-0" />Veri göllerinde (S3 / GCS) ham veri saklandı.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#2563eb] flex-shrink-0" />Spark ile dönüştürme ve toplulaştırma yapıldı.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#2563eb] flex-shrink-0" />Veri ambarında raporlar üretildi.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="bvbb-card-sky rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#67e8f9]">
            <Brain className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu hafta</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#0ea5e9] flex-shrink-0" />Aynı veriyle bulutta model eğitiyoruz.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#0ea5e9] flex-shrink-0" />Modeli bir API endpoint&apos;e dağıtıyoruz.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#0ea5e9] flex-shrink-0" />Performansı izleyip maliyeti kontrol ediyoruz.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3 · DERSİN AKIŞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: neden bulut → seviyeler → uçtan uca akış</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce ML&apos;i neden buluta taşıdığımızı konuşuyoruz; sonra hazır API&apos;den
        özel eğitime uzanan soyutlama seviyelerini; en son tek bir model akışını baştan
        sona izliyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Neden Bulutta ML?", items: ["Hesap & GPU sorunu", "Yönetilen servisler", "Ölçek ve maliyet"], icon: Cloud, accent: "#2563eb" },
          { range: "02", title: "Soyutlama Seviyeleri", items: ["Hazır AI API", "AutoML", "Yönetilen eğitim"], icon: Layers, accent: "#a855f7" },
          { range: "03", title: "Uçtan Uca Akış", items: ["Veri → eğitim → dağıtım", "Metrik & değerlendirme", "İzleme & MLOps"], icon: Workflow, accent: "#0ea5e9" },
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

  /* ─────────────────  4 · BÖLÜM 1  ───────────────── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Neden Bulutta ML?"
      subtitle="Kişisel bilgisayarın eğitemediği modeli, donanım kiralayıp dakikada eğitmek. Yönetilen servislerin çözdüğü temel sorun."
      bgGradient="linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)"
      shadow="0 20px 60px -10px rgba(37, 99, 235, 0.6)"
      icon={<Cloud className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  5 · YEREL vs BULUT  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Karşılaştırma · yerel vs bulut</Eyebrow>
      <H2>Dizüstü bilgisayar bir yere kadar</H2>
      <Sub className="mt-3 max-w-3xl">
        Küçük bir veri setiyle deney yaparken yerel makine yeterlidir. Büyük veride ve
        GPU gerektiren modellerde duvara çarparsın.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-8 bvbb-card rounded-xl overflow-hidden"
      >
        <table className="bvbb-tbl">
          <thead>
            <tr>
              <th style={{ width: "26%" }}>Boyut</th>
              <th style={{ width: "37%" }}>
                <Cpu className="inline w-4 h-4 mr-1.5 -mt-0.5" />
                Yerel makine
              </th>
              <th>
                <Cloud className="inline w-4 h-4 mr-1.5 -mt-0.5 text-[#60a5fa]" />
                Bulutta ML
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              { k: "GPU erişimi", op: "Pahalı, tek kart, sınırlı bellek", cl: "İstersen 8x A100/H100, saatlik kiralık" },
              { k: "Ölçek", op: "Tek makineye sığan kadar veri", cl: "Dağıtık eğitim, terabaytlarca veri" },
              { k: "Kurulum", op: "CUDA/sürücü/kütüphane çilesi", cl: "Hazır kapsayıcı (container) imajları" },
              { k: "Maliyet modeli", op: "Donanımı satın al (CapEx)", cl: "Saniye/saat bazlı kiralama (OpEx)" },
              { k: "Dağıtım", op: "Modeli sen sunucuya kur", cl: "Tek komutla yönetilen endpoint" },
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-4 text-[11px] text-gray-500 text-center"
      >
        <span className="bvbb-token">Not</span> Bulut her zaman zorunlu değildir —
        küçük deneyler ve öğrenme için yerel ortam hâlâ en hızlısıdır.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  6 · YÖNETİLEN SERVİSİN AVANTAJLARI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Yönetilen ML servisleri</Eyebrow>
      <H2>Sağlayıcı altyapıyı taşır, sen modele odaklanırsın</H2>
      <Sub className="mt-3 max-w-3xl">
        Bulut ML platformları, makine öğrenmesinin sıkıcı ama kritik altyapı işlerini
        üstlenir; senin işin veri ve model kalitesi olur.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <FeatureCard
          icon={Cpu}
          title="Esnek hesaplama"
          desc="CPU, GPU veya TPU düğümü dakikada başlar, iş bitince kapanır — yalnız kullandığın süreyi ödersin."
          delay={0.0}
          accent="#2563eb"
        />
        <FeatureCard
          icon={Boxes}
          title="Hazır ortamlar"
          desc="TensorFlow, PyTorch, XGBoost önceden kurulu kapsayıcılar; sürüm/sürücü çilesi yok."
          delay={0.1}
          accent="#a855f7"
        />
        <FeatureCard
          icon={Rocket}
          title="Tek tıkla dağıtım"
          desc="Eğitilen modeli ölçeklenen bir REST/gRPC endpoint&apos;e çevir; otomatik yük dengeleme dahil."
          delay={0.2}
          accent="#22c55e"
        />
        <FeatureCard
          icon={Activity}
          title="İzleme & yönetim"
          desc="Model sürümleme, veri kayması (drift) tespiti ve günlükler tek panelden takip edilir."
          delay={0.3}
          accent="#f59e0b"
        />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  7 · BÖLÜM 2  ───────────────── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Soyutlama Seviyeleri"
      subtitle="Hazır AI API'sinden AutoML'e, oradan tam kontrollü özel eğitime. Ne kadar kontrol istersen o kadar emek; doğru seviyeyi seçmek bir mühendislik kararıdır."
      bgGradient="linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)"
      shadow="0 20px 60px -10px rgba(124, 58, 237, 0.6)"
      icon={<Layers className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  8 · ÜÇ SEVİYE  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Üç seviye · kontrol vs kolaylık</Eyebrow>
      <H2>Hazır API · AutoML · Özel eğitim</H2>
      <Sub className="mt-3 max-w-3xl">
        Aşağı indikçe kontrol ve emek artar, ama her probleme en alt seviye gerekmez.
        Çoğu iş ihtiyacı üst iki seviyeyle çözülür.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[
          {
            tier: "Hazır AI API",
            sub: "Pre-trained services",
            color: "#22c55e",
            icon: Wand2,
            effort: "En düşük",
            you: ["Sadece API çağrısı", "Veri yok / az"],
            ex: ["Amazon Rekognition", "Google Vision API", "Azure Speech", "Amazon Translate"],
          },
          {
            tier: "AutoML",
            sub: "Otomatik model arama",
            color: "#2563eb",
            icon: Wand2,
            effort: "Orta",
            you: ["Etiketli veri sağla", "Hedef sütunu seç"],
            ex: ["SageMaker Autopilot", "Vertex AutoML", "Azure AutoML"],
          },
          {
            tier: "Özel eğitim",
            sub: "Custom training",
            color: "#a855f7",
            icon: Code,
            effort: "En yüksek",
            you: ["Kendi kodun", "Mimari & hiperparametre", "Veri hattı"],
            ex: ["SageMaker Training", "Vertex Custom", "Azure ML Jobs"],
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
            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Gereken emek</div>
            <div className="text-sm font-semibold mb-3" style={{ color: m.color }}>{m.effort}</div>

            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Senin işin</div>
            <div className="flex flex-wrap gap-1 mb-3">
              {m.you.map((y) => (
                <span key={y} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/10">
                  {y}
                </span>
              ))}
            </div>

            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Örnekler</div>
            <ul className="space-y-1">
              {m.ex.map((e) => (
                <li key={e} className="text-xs text-gray-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 flex-shrink-0" style={{ color: m.color }} />
                  {e}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-5 text-center text-[11px] text-gray-500"
      >
        Kural: Probleme önce en üst seviyeden yaklaş; ancak gerekiyorsa aşağı in.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  9 · HAZIR API ÖRNEĞİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Seviye 1 · hazır AI API</Eyebrow>
      <H2 className="mb-2">Görüntü etiketleme — tek HTTP çağrısı</H2>
      <Sub className="max-w-3xl mb-6">
        Hazır servisler için model eğitmezsin; bir görseli yollar, etiketleri alırsın.
        Aşağıda Amazon Rekognition&apos;a CLI ile bir çağrı ve dönen JSON yanıtı var.
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
            <span>bash · aws rekognition</span>
          </div>
        </div>
        <div className="bvbb-terminal">
          <div>
            <span className="bvbb-term-prompt">ocet@mcbu</span>
            <span className="bvbb-term-dim">:~$</span>{" "}
            <span className="bvbb-term-cmd">aws rekognition detect-labels \</span>
          </div>
          <div className="pl-6 bvbb-term-cmd">--image &apos;{"{"}&quot;S3Object&quot;:{"{"}&quot;Bucket&quot;:&quot;mcbu-ml&quot;,&quot;Name&quot;:&quot;kedi.jpg&quot;{"}"}{"}"}&apos; \</div>
          <div className="pl-6 bvbb-term-cmd">--max-labels 5</div>
          <div className="mt-2 bvbb-term-dim">{"{"} &quot;Labels&quot;: [</div>
          <div className="pl-4">
            <span className="bvbb-term-dim">{"{"} &quot;Name&quot;: </span>
            <span className="bvbb-term-ok">&quot;Cat&quot;</span>
            <span className="bvbb-term-dim">, &quot;Confidence&quot;: </span>
            <span className="bvbb-term-val">98.4</span>
            <span className="bvbb-term-dim"> {"}"},</span>
          </div>
          <div className="pl-4">
            <span className="bvbb-term-dim">{"{"} &quot;Name&quot;: </span>
            <span className="bvbb-term-ok">&quot;Pet&quot;</span>
            <span className="bvbb-term-dim">, &quot;Confidence&quot;: </span>
            <span className="bvbb-term-val">96.1</span>
            <span className="bvbb-term-dim"> {"}"},</span>
          </div>
          <div className="pl-4">
            <span className="bvbb-term-dim">{"{"} &quot;Name&quot;: </span>
            <span className="bvbb-term-ok">&quot;Animal&quot;</span>
            <span className="bvbb-term-dim">, &quot;Confidence&quot;: </span>
            <span className="bvbb-term-val">96.1</span>
            <span className="bvbb-term-dim"> {"}"} ]</span>
          </div>
          <div className="bvbb-term-dim">{"}"}</div>
          <div className="mt-2 bvbb-term-warn">
            # Eğitim yok · sunucu yok · faturalama çağrı (request) başına
          </div>
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  10 · BÖLÜM 3  ───────────────── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Uçtan Uca Akış"
      subtitle="Veriden canlı tahmine: hazırlık, eğitim, değerlendirme, dağıtım ve izleme. Bir modelin yaşam döngüsünü baştan sona izliyoruz."
      bgGradient="linear-gradient(135deg, #0ea5e9 0%, #22d3ee 100%)"
      shadow="0 20px 60px -10px rgba(14, 165, 233, 0.6)"
      icon={<Workflow className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  11 · ML PIPELINE DİYAGRAMI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>ML yaşam döngüsü</Eyebrow>
      <H2 className="mb-2">Altı adımlık bulut ML hattı</H2>
      <Sub className="max-w-3xl mb-6">
        Her bulut ML projesi aşağı yukarı bu altı adımdan geçer. Bulutun katkısı,
        her adımı ayrı bir yönetilen servisle desteklemesidir.
      </Sub>
      <MLPipeline />
    </SlideShell>
  ),

  /* ─────────────────  12 · SAGEMAKER NOTEBOOK MOCKUP  ───────────────── */
  () => (
    <SlideShell bgPattern={false}>
      <Eyebrow>Eğitim & dağıtım · canlı not defteri</Eyebrow>
      <H2 className="text-center md:text-left">SageMaker Studio&apos;da bir model</H2>
      <Sub className="mt-3 max-w-3xl">
        Veriyi S3&apos;ten bağla, yönetilen XGBoost kapsayıcısıyla eğit, tek satırla
        endpoint aç. Faturalandırma yalnızca eğitimin sürdüğü saniyeler kadar.
      </Sub>
      <div className="mt-6">
        <SageMakerStudioMock />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  13 · DEĞERLENDİRME / CONFUSION MATRIX  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Değerlendirme · model gerçekten iyi mi?</Eyebrow>
      <H2 className="mb-2">Doğruluk yetmez: kesinlik ve duyarlılık</H2>
      <Sub className="max-w-3xl mb-6">
        Model eğitmek kolay; doğru ölçmek zordur. Sınıflandırmada karmaşıklık matrisi,
        modelin nerede yanıldığını gösterir.
      </Sub>
      <ConfusionMatrix />
    </SlideShell>
  ),

  /* ─────────────────  14 · İZLEME / MLOps  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>İzleme · MLOps</Eyebrow>
      <H2>Model dağıtıldı, iş bitmedi</H2>
      <Sub className="mt-3 max-w-3xl">
        Üretimdeki model zamanla bozulur: gerçek dünya verisi eğitim verisinden uzaklaşır
        (veri kayması). Bulut servisleri bunu izlemek için araçlar sunar.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={Activity}
          title="Veri kayması (drift)"
          desc="Gelen verinin dağılımı eğitim verisinden saparsa alarm üretilir; modeli yeniden eğitme zamanıdır."
          delay={0.0}
          accent="#ef4444"
        />
        <FeatureCard
          icon={GitBranch}
          title="Sürümleme"
          desc="Her model bir sürümdür; kötü sürüme hızlıca geri dönülebilir (rollback). Model kayıt defteri tutar."
          delay={0.1}
          accent="#a855f7"
        />
        <FeatureCard
          icon={Gauge}
          title="Gecikme & yük"
          desc="Endpoint yanıt süresi ve istek hacmi izlenir; trafik artınca otomatik ölçeklenir."
          delay={0.2}
          accent="#22c55e"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 bvbb-card rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <Workflow className="w-4 h-4 text-[#60a5fa] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">MLOps</span> = ML + DevOps. Veri → eğitim → dağıtım →
          izleme → tekrar eğitim döngüsünü otomatikleştirme disiplinidir. Tek seferlik
          eğitim değil, sürdürülebilir bir sistemdir.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  15 · MALİYET  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Maliyet · dikkat edilecekler</Eyebrow>
      <H2>Bulutta ML&apos;in gizli faturası</H2>
      <Sub className="mt-3 max-w-3xl">
        GPU&apos;lar pahalıdır ve açık unutulan bir endpoint saatlerce fatura üretir.
        Öğrenci projelerinde maliyeti kontrol etmek için birkaç temel kural:
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: DollarSign, t: "Endpoint&apos;i kapat", d: "Gerçek-zamanlı endpoint sürekli faturalanır. Test bitince delete-endpoint çalıştır.", color: "#ef4444" },
          { icon: Cpu, t: "GPU&apos;yu yalnız eğitimde kullan", d: "Çıkarım (inference) çoğu zaman CPU ile yeterli; pahalı GPU&apos;yu eğitime sakla.", color: "#a855f7" },
          { icon: Boxes, t: "Spot / preemptible örnekler", d: "Kesintiye dayanıklı eğitimlerde indirimli kapasite kullan; maliyeti büyük ölçüde düşürür.", color: "#22c55e" },
          { icon: Target, t: "Bütçe alarmı kur", d: "Cost Explorer / Budgets ile eşik aşılınca e-posta al; sürpriz fatura olmasın.", color: "#f59e0b" },
        ].map((item, i) => (
          <motion.div
            key={item.t}
            initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className="bvbb-card bvbb-card-hover rounded-xl p-5 flex items-start gap-4 transition-all"
          >
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${item.color}1f`, border: `1px solid ${item.color}55` }}
            >
              <item.icon className="w-5 h-5" style={{ color: item.color }} />
            </div>
            <div>
              <div className="text-base font-semibold text-white mb-1" dangerouslySetInnerHTML={{ __html: item.t }} />
              <p className="text-sm text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.d }} />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-5 bvbb-card rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <AlertTriangle className="w-4 h-4 text-[#fbbf24] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">En sık hata:</span> Lab sonunda endpoint&apos;i ve
          notebook örneğini kapatmamak. Açık unutulan bir GPU örneği gece boyunca ciddi
          fatura üretebilir.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  16 · UYGULAMALI LAB  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
      <H2>Free Tier ile uçtan uca bir model</H2>
      <Sub className="mt-3 max-w-3xl">
        Küçük bir tablo veriyle (örn. açık bir sınıflandırma veri seti) baştan sona
        bir akış kuracaksın. Maliyeti düşük tutmak için küçük örnek tipleri yeterli.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Database, title: "Veriyi S3&apos;e yükle", desc: "train.csv ve test.csv dosyalarını bir bucket&apos;a koy; yolları not al.", accent: "#22c55e" },
          { icon: Brain, title: "AutoML ile eğit", desc: "SageMaker Autopilot / Vertex AutoML&apos;de hedef sütunu seç, eğitimi başlat.", accent: "#a855f7" },
          { icon: Gauge, title: "Metrikleri oku", desc: "Doğruluk, kesinlik ve duyarlılığa bak; karmaşıklık matrisini yorumla.", accent: "#f59e0b" },
          { icon: ListChecks, title: "Dağıt, dene, kapat", desc: "Endpoint aç, 2-3 örnek tahmin al, ekran görüntüsü çek ve endpoint&apos;i sil.", accent: "#2563eb" },
        ].map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="bvbb-card bvbb-card-hover rounded-xl p-5 flex items-start gap-4 transition-all"
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
        className="mt-5 text-[11px] text-gray-500 text-center"
      >
        <span className="bvbb-token">Teslim</span> Karmaşıklık matrisi ve bir tahmin
        ekran görüntüsü + 3 cümlelik yorum. Endpoint&apos;in silindiğini de göster.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  17 · ÖZET  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Toparlayalım</Eyebrow>
      <H2>
        Bu haftanın <span className="bvbb-shimmer-sky">üç çıkarımı</span>
      </H2>
      <Sub className="mt-3 max-w-3xl">
        Bulutta ML, modeli değil çevresindeki tüm altyapıyı kolaylaştırır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={Cloud}
          title="Donanım kira ile gelir"
          desc="GPU/TPU kurmadan, dakikada güçlü hesaplama; iş bitince kapanır ve faturalanmaz."
          delay={0.0}
          accent="#2563eb"
        />
        <FeatureCard
          icon={Layers}
          title="Doğru seviyeyi seç"
          desc="Hazır API çoğu işi çözer; AutoML hızlı sonuç verir; özel eğitim tam kontrol içindir."
          delay={0.1}
          accent="#a855f7"
        />
        <FeatureCard
          icon={Gauge}
          title="Ölç ve izle"
          desc="Doğruluk tek başına yanıltır; kesinlik/duyarlılık ve drift izleme şarttır."
          delay={0.2}
          accent="#0ea5e9"
        />
      </div>
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
          <Sparkles className="w-12 h-12 text-white" />
        </motion.div>

        <Eyebrow>14. hafta tamamlandı · sıradaki: Final projeleri</Eyebrow>
        <H1>
          <span className="bvbb-shimmer">Hepsini Birleştir</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Gelecek hafta tüm dönemi tek bir uçtan uca projede topluyoruz: veri gölünden
          modele, modelden canlı tahmine. Bu hafta kurduğun ML akışı projenin kalbi olacak.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="bvbb-card rounded-xl p-5">
            <Table className="w-5 h-5 text-[#60a5fa] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">Veri seti seç</div>
            <div className="text-sm text-gray-400">açık & küçük bir veri</div>
          </div>
          <div className="bvbb-card rounded-xl p-5">
            <Server className="w-5 h-5 text-[#a855f7] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Ortam</div>
            <div className="text-white font-semibold">Free Tier hesap</div>
            <div className="text-sm text-gray-400">bütçe alarmı kurulu</div>
          </div>
          <div className="bvbb-card rounded-xl p-5">
            <ListChecks className="w-5 h-5 text-[#22c55e] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">Lab raporu</div>
            <div className="text-sm text-gray-400">4 adım + ekran görüntüsü</div>
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
          BVA 2103 · 14. Hafta · Bulutta ML
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
