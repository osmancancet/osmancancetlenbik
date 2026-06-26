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
  HardDrive,
  Server,
  Layers,
  Box,
  Boxes,
  FileText,
  Archive,
  Snowflake,
  Folder,
  Lock,
  Key,
  Tag,
  GitBranch,
  Activity,
  Gauge,
  Thermometer,
  Network,
  Terminal,
  Code,
  Check,
  X,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Sparkles,
  Calendar,
  Target,
  Brain,
  AlertTriangle,
  Shield,
  Warehouse,
  Waves,
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

function StorageTypeCard({
  icon: Icon,
  kind,
  name,
  desc,
  best,
  color,
  delay = 0,
}: {
  icon: LucideIcon;
  kind: string;
  name: string;
  desc: string;
  best: string;
  color: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bvbb-card bvbb-card-hover rounded-xl p-6 flex flex-col"
      style={{ borderColor: `${color}44` }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-11 h-11 rounded-lg flex items-center justify-center"
          style={{ background: `${color}22`, border: `1px solid ${color}66` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
            {kind}
          </div>
          <div className="text-base font-bold text-white">{name}</div>
        </div>
      </div>
      <p className="text-sm text-gray-400 leading-relaxed flex-1">{desc}</p>
      <div
        className="mt-3 text-[11px] rounded px-3 py-2"
        style={{ background: `${color}14`, color, border: `1px solid ${color}33` }}
      >
        En uygun · {best}
      </div>
    </motion.div>
  );
}

function ObjectAnatomy() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-6"
    >
      {/* Anatomy diagram */}
      <div className="bvbb-card rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4 text-[#60a5fa]">
          <Box className="w-5 h-5" />
          <span className="text-xs font-mono uppercase tracking-widest">
            Bir nesne (object) neyden oluşur?
          </span>
        </div>
        <div className="space-y-3">
          <div
            className="rounded-lg p-4"
            style={{ background: "#2563eb14", border: "1px solid #2563eb44" }}
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <FileText className="w-4 h-4 text-[#60a5fa]" /> Veri (data)
            </div>
            <div className="text-[11px] text-gray-400 mt-1 font-mono">
              olcumler-2026-06.parquet · 412 MB · ham bayt dizisi
            </div>
          </div>
          <div
            className="rounded-lg p-4"
            style={{ background: "#a855f714", border: "1px solid #a855f744" }}
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Tag className="w-4 h-4 text-[#c084fc]" /> Metadata + etiketler
            </div>
            <div className="text-[11px] text-gray-400 mt-1 font-mono">
              Content-Type · proje=iot · ortam=prod · sahip=ocet
            </div>
          </div>
          <div
            className="rounded-lg p-4"
            style={{ background: "#22c55e14", border: "1px solid #22c55e44" }}
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Key className="w-4 h-4 text-[#4ade80]" /> Anahtar (key) + ID
            </div>
            <div className="text-[11px] text-gray-400 mt-1 font-mono">
              iot/2026/06/olcumler-2026-06.parquet · ETag · sürüm
            </div>
          </div>
        </div>
      </div>

      {/* Flat namespace */}
      <div className="bvbb-card-sky rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4 text-sky-300">
          <Boxes className="w-5 h-5" />
          <span className="text-xs font-mono uppercase tracking-widest">
            Düz isim alanı (flat namespace)
          </span>
        </div>
        <div className="font-mono text-[12px] space-y-1.5 text-gray-300">
          <div className="text-[#60a5fa]">s3://mcbu-veri-golu/</div>
          <div className="pl-3">iot/2026/06/olcumler-2026-06.parquet</div>
          <div className="pl-3">iot/2026/06/olcumler-2026-07.parquet</div>
          <div className="pl-3">loglar/web/2026-06-26.json.gz</div>
          <div className="pl-3">ham/goruntu/kamera-01.jpg</div>
        </div>
        <div className="text-[11px] text-gray-400 mt-4 leading-relaxed">
          Nesne deposunda gerçek klasör <span className="text-white">yoktur</span>;
          anahtardaki &quot;/&quot; sadece bir önek (prefix). Milyarlarca nesne tek
          bir düz alanda yan yana durur.
        </div>
      </div>
    </motion.div>
  );
}

function StorageClassThermometer() {
  const tiers = [
    {
      name: "Hot / Standard",
      icon: Thermometer,
      color: "#ef4444",
      access: "Anında · milisaniye",
      price: "En yüksek depolama, en düşük erişim ücreti",
      use: "Sık okunan aktif veri, dashboard kaynakları",
    },
    {
      name: "Cool / Infrequent",
      icon: Gauge,
      color: "#f59e0b",
      access: "Anında · biraz erişim ücreti",
      price: "Daha ucuz depolama, erişimde ek ücret",
      use: "Aylık raporlar, son 90 gün yedekleri",
    },
    {
      name: "Cold",
      icon: Snowflake,
      color: "#0ea5e9",
      access: "Dakikalar · düşük depolama",
      price: "Çok ucuz depolama, erişim gecikmeli",
      use: "Nadiren açılan arşivler, uyumluluk kopyaları",
    },
    {
      name: "Archive / Glacier Deep",
      icon: Archive,
      color: "#64748b",
      access: "Saatler (restore gerekir)",
      price: "En ucuz depolama, en yüksek geri yükleme süresi",
      use: "Yıllarca saklanan yasal/arşiv verisi",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-3"
    >
      {tiers.map((t, i) => (
        <motion.div
          key={t.name}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 + i * 0.1 }}
          className="bvbb-card rounded-xl p-4 grid grid-cols-1 md:grid-cols-[200px_1fr_1fr] gap-3 items-center"
          style={{ borderColor: `${t.color}40` }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: `${t.color}22`, border: `1px solid ${t.color}66` }}
            >
              <t.icon className="w-4 h-4" style={{ color: t.color }} />
            </div>
            <span className="text-sm font-semibold text-white">{t.name}</span>
          </div>
          <div className="text-xs text-gray-400">
            <span className="text-gray-500">Erişim: </span>
            {t.access}
            <div className="text-[11px] text-gray-500 mt-0.5">{t.price}</div>
          </div>
          <div className="text-xs" style={{ color: t.color }}>
            {t.use}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function CliWindow({ title, children }: { title: string; children: ReactNode }) {
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
          style={{ background: "#0d1117", color: "#93c5fd" }}
        >
          <Terminal className="w-3 h-3" />
          <span>{title}</span>
        </div>
      </div>
      <div className="bvbb-terminal">{children}</div>
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
        <Eyebrow>BVA 2103 · 6. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="bvbb-shimmer">Büyük Veri İçin</span>
          <br />
          <span className="text-white">Bulut Depolama Çözümleri</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Nesne deposundan veri gölüne: petabaytlarca veriyi nereye, hangi
          maliyetle ve nasıl güvenli koyarız? Bu hafta depolamanın katmanlarını
          açıyoruz.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={Box}
            title="Nesne Deposu"
            desc="S3, GCS, Azure Blob — büyük verinin temel deposu nasıl çalışır?"
            delay={0.3}
            accent="#2563eb"
          />
          <FeatureCard
            icon={Thermometer}
            title="Depolama Sınıfları"
            desc="Hot, cool, cold, archive — erişim sıklığına göre maliyet optimizasyonu."
            delay={0.45}
            accent="#f59e0b"
          />
          <FeatureCard
            icon={Waves}
            title="Veri Gölü &amp; DWH"
            desc="Data lake, warehouse ve lakehouse mimarileri arasındaki fark."
            delay={0.6}
            accent="#22c55e"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 inline-flex items-center gap-2 text-xs font-mono text-gray-500"
        >
          <Calendar className="w-3.5 h-3.5" />
          Çarşamba 09:55 — 12:30 · Öğr. Gör. Osman Can Çetlenbik · MCBÜ MYO
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  2 · KÖPRÜ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 5. haftadan 6. haftaya</Eyebrow>
      <H2>Sağlayıcıları seçtik; şimdi veriyi nereye koyacağımıza karar veriyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Önceki haftalarda AWS, Azure ve GCP hesaplarını açtık, hizmet
        modellerini (IaaS/PaaS/SaaS) öğrendik. Büyük veri işleme yapmadan önce
        cevaplamamız gereken soru sabit: o veri fiziksel olarak nerede duracak?
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bvbb-card rounded-xl p-6"
        >
          <Check className="w-6 h-6 text-[#4ade80] mb-3" />
          <div className="text-sm font-semibold text-white mb-1">Bildiklerimiz</div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Bulut sağlayıcıları, bölge (region) ve erişilebilirlik bölgesi
            (availability zone) kavramları, temel konsol kullanımı.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
          className="bvbb-card-sky rounded-xl p-6"
        >
          <Target className="w-6 h-6 text-[#60a5fa] mb-3" />
          <div className="text-sm font-semibold text-white mb-1">Bu haftanın hedefi</div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Doğru depolama türünü ve sınıfını seçebilmek; veri gölü ile veri
            ambarını ayırt edebilmek; maliyeti tahmin edebilmek.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.44 }}
          className="bvbb-card rounded-xl p-6"
        >
          <ChevronRight className="w-6 h-6 text-[#c084fc] mb-3" />
          <div className="text-sm font-semibold text-white mb-1">Sonrası</div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Bu depodaki veriyi Hadoop ve Spark ile işlemeye geçeceğiz —
            depolama, hesaplamanın altyapısıdır.
          </p>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3 · DERSİN AKIŞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: depolama türleri → sınıflar &amp; maliyet → mimari</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce nesne/blok/dosya ayrımını netleştiriyoruz; sonra erişim sınıfları ve
        yaşam döngüsüyle maliyeti yönetiyoruz; en son veri gölü mimarisini
        kuruyoruz. Sonunda kısa bir uygulamalı lab.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            range: "01",
            title: "Depolama Türleri",
            items: ["Nesne, blok, dosya", "Nesne anatomisi", "Düz isim alanı &amp; önek"],
            icon: Box,
            accent: "#2563eb",
          },
          {
            range: "02",
            title: "Sınıflar &amp; Maliyet",
            items: ["Hot · cool · cold · archive", "Yaşam döngüsü kuralları", "Dayanıklılık vs kullanılabilirlik"],
            icon: Thermometer,
            accent: "#f59e0b",
          },
          {
            range: "03",
            title: "Veri Gölü Mimarisi",
            items: ["Data lake vs warehouse", "Lakehouse yaklaşımı", "Bölümleme &amp; format"],
            icon: Waves,
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
                <div className="text-lg font-semibold text-white" dangerouslySetInnerHTML={{ __html: g.title }} />
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-400">
              {g.items.map((it) => (
                <li key={it} className="flex items-start gap-2">
                  <ChevronRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: g.accent }} />
                  <span dangerouslySetInnerHTML={{ __html: it }} />
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
      title="Depolama Türleri"
      subtitle="Nesne, blok ve dosya depolama — üç farklı soyutlama, üç farklı kullanım. Büyük veri için neden nesne deposu hâkim?"
      bgGradient="linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)"
      shadow="0 20px 60px -10px rgba(37, 99, 235, 0.6)"
      icon={<Box className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  5 · NESNE / BLOK / DOSYA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Üç temel soyutlama</Eyebrow>
      <H2>Nesne · Blok · Dosya</H2>
      <Sub className="mt-3 max-w-3xl">
        Bulutta veriyi saklamanın üç yolu vardır. Hangisini seçtiğin performansı,
        ölçeklenebilirliği ve maliyeti doğrudan belirler.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <StorageTypeCard
          icon={Box}
          kind="Object Storage"
          name="Nesne Deposu"
          desc="Veri + metadata + benzersiz anahtar olarak saklanır. HTTP API ile erişilir, neredeyse sınırsız ölçeklenir."
          best="Büyük veri, yedek, medya, veri gölü"
          color="#2563eb"
          delay={0.0}
        />
        <StorageTypeCard
          icon={HardDrive}
          kind="Block Storage"
          name="Blok Deposu"
          desc="Disk gibi davranır; sabit boyutlu bloklara bölünür. Bir sanal sunucuya bağlanır (mount edilir)."
          best="Veritabanı diski, işletim sistemi, düşük gecikme"
          color="#a855f7"
          delay={0.1}
        />
        <StorageTypeCard
          icon={Folder}
          kind="File Storage"
          name="Dosya Deposu"
          desc="Klasik dizin/dosya hiyerarşisi (NFS/SMB). Birden çok makine aynı paylaşımı ağ üzerinden kullanır."
          best="Paylaşımlı dosya sistemi, eski uygulamalar"
          color="#22c55e"
          delay={0.2}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 bvbb-card rounded-xl p-4 flex items-start gap-3"
      >
        <Sparkles className="w-5 h-5 text-[#60a5fa] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-300">
          <span className="bvbb-token">Neden nesne?</span> Büyük veri iş yüklerinde
          değişmez (immutable), yatay ölçeklenen ve metadata ile zenginleştirilebilen
          nesne deposu hâkimdir — bir bloğa &quot;yaz&quot; yerine bütün dosyayı
          &quot;koy/al&quot; modeli işler.
        </p>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  6 · NESNE ANATOMİSİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Object Storage · iç yapı</Eyebrow>
      <H2 className="mb-2">Bir nesne neyden oluşur?</H2>
      <Sub className="max-w-3xl mb-6">
        Nesne deposunda klasör yoktur; her şey bir kova (bucket) içinde düz bir
        isim alanında durur. Bir nesne üç parçadan oluşur ve anahtardaki
        &quot;/&quot; sadece görsel bir öneködür.
      </Sub>
      <ObjectAnatomy />
    </SlideShell>
  ),

  /* ─────────────────  7 · SAĞLAYICI KARŞILAŞTIRMA TABLOSU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Aynı kavram · üç sağlayıcı</Eyebrow>
      <H2>Nesne deposu — AWS vs Azure vs GCP</H2>
      <Sub className="mt-3 max-w-3xl">
        Üç büyük sağlayıcı da aynı işi yapar; terminoloji ve ayrıntılar değişir.
        Bir konsepti öğrendiğinde diğerine taşıman kolaydır.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 bvbb-card rounded-xl p-1"
      >
        <table className="bvbb-tbl">
          <thead>
            <tr>
              <th style={{ width: "22%" }}>Kavram</th>
              <th>
                <span className="bvbb-aws-brand font-bold">AWS</span>
              </th>
              <th>
                <span className="bvbb-azure-brand font-bold">Azure</span>
              </th>
              <th>
                <span className="bvbb-gcp-brand font-bold">Google Cloud</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-medium">Nesne servisi</td>
              <td>Amazon S3</td>
              <td>Blob Storage</td>
              <td>Cloud Storage (GCS)</td>
            </tr>
            <tr>
              <td className="text-white font-medium">Konteyner</td>
              <td>Bucket</td>
              <td>Container</td>
              <td>Bucket</td>
            </tr>
            <tr>
              <td className="text-white font-medium">Sıcak sınıf</td>
              <td>S3 Standard</td>
              <td>Hot tier</td>
              <td>Standard</td>
            </tr>
            <tr>
              <td className="text-white font-medium">Arşiv sınıfı</td>
              <td>Glacier · Deep Archive</td>
              <td>Archive tier</td>
              <td>Archive</td>
            </tr>
            <tr>
              <td className="text-white font-medium">URI şeması</td>
              <td><span className="font-mono text-[#93c5fd]">s3://kova/anahtar</span></td>
              <td><span className="font-mono text-[#93c5fd]">https://hesap.blob.core.windows.net/...</span></td>
              <td><span className="font-mono text-[#93c5fd]">gs://kova/anahtar</span></td>
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
        <span className="bvbb-token">Not</span> Üçü de S3 ile uyumlu (S3-compatible)
        API desteğine sahip araçlarla konuşabilir; bu da geçişi kolaylaştırır.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  8 · CLI MOCKUP  ───────────────── */
  () => (
    <SlideShell bgPattern={false}>
      <Eyebrow>Canlı çıktı · aws s3</Eyebrow>
      <H2 className="mb-2">Komut satırından bir kova ile çalışmak</H2>
      <Sub className="max-w-3xl mb-6">
        Konsol güzel ama tekrarlanabilir iş için komut satırı (CLI) şarttır.
        Bir kova oluştur, veri yükle, listele ve sınıfını gör.
      </Sub>
      <CliWindow title="ocet@mcbu:~ — aws s3 / s3api">
        <div>
          <span className="bvbb-term-prompt">ocet@mcbu</span>
          <span className="bvbb-term-dim">:~$</span>{" "}
          <span className="bvbb-term-cmd">aws s3 mb s3://mcbu-veri-golu --region eu-central-1</span>
        </div>
        <div className="bvbb-term-ok">make_bucket: mcbu-veri-golu</div>
        <div className="mt-1">
          <span className="bvbb-term-prompt">ocet@mcbu</span>
          <span className="bvbb-term-dim">:~$</span>{" "}
          <span className="bvbb-term-cmd">aws s3 cp olcumler.parquet s3://mcbu-veri-golu/iot/2026/06/</span>
        </div>
        <div className="bvbb-term-dim">upload: ./olcumler.parquet to s3://mcbu-veri-golu/iot/2026/06/olcumler.parquet</div>
        <div className="mt-1">
          <span className="bvbb-term-prompt">ocet@mcbu</span>
          <span className="bvbb-term-dim">:~$</span>{" "}
          <span className="bvbb-term-cmd">aws s3 ls s3://mcbu-veri-golu/iot/2026/06/ --human-readable</span>
        </div>
        <div className="bvbb-term-dim">2026-06-26 10:14:02  <span className="bvbb-term-key">412.6 MiB</span>  olcumler.parquet</div>
        <div className="mt-1">
          <span className="bvbb-term-prompt">ocet@mcbu</span>
          <span className="bvbb-term-dim">:~$</span>{" "}
          <span className="bvbb-term-cmd">aws s3 cp logs.json.gz s3://mcbu-veri-golu/loglar/ --storage-class STANDARD_IA</span>
        </div>
        <div className="bvbb-term-warn">upload (STANDARD_IA): seyrek erişim sınıfı seçildi · depolama daha ucuz, erişim ücretli</div>
        <div className="mt-2">
          <span className="bvbb-term-prompt">ocet@mcbu</span>
          <span className="bvbb-term-dim">:~$</span>{" "}
          <span className="bvbb-term-cmd">_</span>
          <span className="animate-pulse">█</span>
        </div>
      </CliWindow>
    </SlideShell>
  ),

  /* ─────────────────  9 · BÖLÜM 2  ───────────────── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Sınıflar &amp; Maliyet"
      subtitle="Aynı kova, farklı fiyat. Veriyi erişim sıklığına göre katmanlara koyup yaşam döngüsü kurallarıyla maliyeti otomatik yönetmek."
      bgGradient="linear-gradient(135deg, #f59e0b 0%, #b45309 100%)"
      shadow="0 20px 60px -10px rgba(245, 158, 11, 0.55)"
      icon={<Thermometer className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  10 · DEPOLAMA SINIFLARI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Depolama sınıfları · sıcaklık skalası</Eyebrow>
      <H2 className="mb-2">Sıcaktan arşive: erişim sıklığı fiyatı belirler</H2>
      <Sub className="max-w-3xl mb-6">
        Genel kural: depolama ne kadar ucuzsa erişim o kadar yavaş/pahalıdır.
        Sık okunan veriyi sıcakta, yılda bir açılanı arşivde tutarsın. Rakamlar
        sağlayıcı ve bölgeye göre değişir.
      </Sub>
      <StorageClassThermometer />
    </SlideShell>
  ),

  /* ─────────────────  11 · YAŞAM DÖNGÜSÜ KURALI (JSON)  ───────────────── */
  () => (
    <SlideShell bgPattern={false}>
      <Eyebrow>Lifecycle policy · otomatik geçiş</Eyebrow>
      <H2 className="mb-2">Veriyi elle değil, kuralla taşı</H2>
      <Sub className="max-w-3xl mb-6">
        Yaşam döngüsü (lifecycle) kuralı, bir nesne belirli bir yaşa ulaştığında
        onu daha ucuz sınıfa otomatik taşır ya da siler. Aşağıdaki kural logları
        kademeli olarak ucuzlatır.
      </Sub>
      <CliWindow title="lifecycle.json — S3 Lifecycle Configuration">
        <div className="bvbb-term-dim">{"{"}</div>
        <div className="pl-4"><span className="bvbb-term-key">&quot;Rules&quot;</span>: [{"{"}</div>
        <div className="pl-8"><span className="bvbb-term-key">&quot;ID&quot;</span>: <span className="bvbb-term-str">&quot;log-kademeli-arsiv&quot;</span>,</div>
        <div className="pl-8"><span className="bvbb-term-key">&quot;Filter&quot;</span>: {"{"} <span className="bvbb-term-key">&quot;Prefix&quot;</span>: <span className="bvbb-term-str">&quot;loglar/&quot;</span> {"}"},</div>
        <div className="pl-8"><span className="bvbb-term-key">&quot;Status&quot;</span>: <span className="bvbb-term-str">&quot;Enabled&quot;</span>,</div>
        <div className="pl-8"><span className="bvbb-term-key">&quot;Transitions&quot;</span>: [</div>
        <div className="pl-12">{"{"} <span className="bvbb-term-key">&quot;Days&quot;</span>: <span className="bvbb-term-warn">30</span>, <span className="bvbb-term-key">&quot;StorageClass&quot;</span>: <span className="bvbb-term-str">&quot;STANDARD_IA&quot;</span> {"}"},</div>
        <div className="pl-12">{"{"} <span className="bvbb-term-key">&quot;Days&quot;</span>: <span className="bvbb-term-warn">90</span>, <span className="bvbb-term-key">&quot;StorageClass&quot;</span>: <span className="bvbb-term-str">&quot;GLACIER&quot;</span> {"}"}</div>
        <div className="pl-8">],</div>
        <div className="pl-8"><span className="bvbb-term-key">&quot;Expiration&quot;</span>: {"{"} <span className="bvbb-term-key">&quot;Days&quot;</span>: <span className="bvbb-term-err">365</span> {"}"}</div>
        <div className="pl-4">{"}"}]</div>
        <div className="bvbb-term-dim">{"}"}</div>
        <div className="mt-3 text-gray-400">
          <span className="bvbb-term-ok">// </span>
          0-30 gün Standard · 30-90 gün IA · 90-365 gün Glacier · 365. günde sil
        </div>
      </CliWindow>
    </SlideShell>
  ),

  /* ─────────────────  12 · DAYANIKLILIK vs KULLANILABİLİRLİK  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>İki kavram · sık karıştırılır</Eyebrow>
      <H2>Dayanıklılık (durability) ≠ Kullanılabilirlik (availability)</H2>
      <Sub className="mt-3 max-w-3xl">
        Bulut depolama SLA&apos;larında bu iki sayıyı görürsün. İkisi farklı
        şeyleri ölçer; karıştırmak yanlış mimari kararına yol açar.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bvbb-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#4ade80]">
            <Shield className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Dayanıklılık</span>
          </div>
          <div className="text-3xl font-bold text-white mb-2">
            %99.999999999
            <span className="text-sm text-gray-500 ml-2">(11 dokuz)</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Verinin <span className="text-white">kaybolma</span> olasılığının ne
            kadar düşük olduğu. Sağlayıcı veriyi birden çok tesise kopyalar; bir
            disk hatta bir veri merkezi çökse bile veri kaybolmaz.
          </p>
          <div className="text-[11px] text-gray-500 mt-3">
            Soru: &quot;Verim güvende mi?&quot;
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="bvbb-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#60a5fa]">
            <Activity className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Kullanılabilirlik</span>
          </div>
          <div className="text-3xl font-bold text-white mb-2">
            ~%99.9
            <span className="text-sm text-gray-500 ml-2">(sınıfa göre)</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Veriye <span className="text-white">o an erişebilme</span> olasılığı.
            Veri sağlam olsa bile geçici bir kesinti sırasında okunamayabilir.
            Arşiv sınıflarında bu sayı daha düşüktür.
          </p>
          <div className="text-[11px] text-gray-500 mt-3">
            Soru: &quot;Verime şu an ulaşabiliyor muyum?&quot;
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-5 text-center text-[11px] text-gray-500"
      >
        Benzetme: bankadaki paran <span className="text-gray-300">dayanıklıdır</span>
        {" "}(kaybolmaz) ama ATM bozuksa o an <span className="text-gray-300">erişilemez</span> olabilir.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  13 · BÖLÜM 3  ───────────────── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Veri Gölü Mimarisi"
      subtitle="Data lake, data warehouse ve lakehouse. Ham veriyi nereye dökeriz, sorgulanabilir hâle nasıl getiririz?"
      bgGradient="linear-gradient(135deg, #22c55e 0%, #15803d 100%)"
      shadow="0 20px 60px -10px rgba(34, 197, 94, 0.55)"
      icon={<Waves className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  14 · LAKE vs WAREHOUSE vs LAKEHOUSE  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Üç mimari · aynı amaç, farklı yol</Eyebrow>
      <H2>Veri Gölü · Veri Ambarı · Lakehouse</H2>
      <Sub className="mt-3 max-w-3xl">
        Hepsi büyük veriyi saklar ama yapılandırma anına, şemaya ve maliyete
        farklı yaklaşır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[
          {
            n: "Data Lake",
            icon: Waves,
            color: "#2563eb",
            schema: "Schema-on-read (okurken)",
            data: "Ham · yapılandırılmamış dahil",
            store: "Nesne deposu (S3/GCS/Blob)",
            pro: "Ucuz, her formatı alır, esnek",
            con: "Yönetilmezse &quot;veri bataklığı&quot; olur",
          },
          {
            n: "Data Warehouse",
            icon: Warehouse,
            color: "#a855f7",
            schema: "Schema-on-write (yazarken)",
            data: "Temizlenmiş · yapılandırılmış",
            store: "Redshift · BigQuery · Synapse",
            pro: "Hızlı SQL, tutarlı, raporlamaya ideal",
            con: "Daha pahalı, önce ETL gerekir",
          },
          {
            n: "Lakehouse",
            icon: Layers,
            color: "#22c55e",
            schema: "Gölün üzerine tablo katmanı",
            data: "Ham + tablo (ACID) bir arada",
            store: "Delta · Iceberg · Hudi",
            pro: "Gölün ucuzluğu + ambarın düzeni",
            con: "Görece yeni, araç olgunluğu değişken",
          },
        ].map((m, i) => (
          <motion.div
            key={m.n}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="bvbb-card rounded-xl p-5"
            style={{ borderColor: `${m.color}55` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${m.color}22`, border: `1px solid ${m.color}66` }}
              >
                <m.icon className="w-5 h-5" style={{ color: m.color }} />
              </div>
              <div className="text-base font-bold text-white">{m.n}</div>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-gray-500">Şema: </span>
                <span className="text-gray-300">{m.schema}</span>
              </div>
              <div>
                <span className="text-gray-500">Veri: </span>
                <span className="text-gray-300">{m.data}</span>
              </div>
              <div>
                <span className="text-gray-500">Nerede: </span>
                <span className="text-gray-300">{m.store}</span>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2 text-xs">
              <div className="bvbb-heat-high rounded p-2 flex items-start gap-1.5">
                <Check className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span>{m.pro}</span>
              </div>
              <div className="bvbb-heat-low rounded p-2 flex items-start gap-1.5">
                <X className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: m.con }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  15 · BÖLÜMLEME & FORMAT  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Performans &amp; maliyet için iki karar</Eyebrow>
      <H2>Bölümleme (partitioning) ve dosya formatı</H2>
      <Sub className="mt-3 max-w-3xl">
        Veri gölünde aynı veriyi yanlış düzenlersen sorgular hem yavaş hem pahalı
        olur. İki temel iyi uygulama her şeyi değiştirir.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bvbb-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#60a5fa]">
            <GitBranch className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bölümleme</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-3">
            Veriyi anahtar öneklerine göre klasörlere ayırırsın; sorgu sadece
            ilgili önekleri okur (partition pruning).
          </p>
          <div className="font-mono text-[11px] space-y-1 text-gray-300 bg-black/30 rounded p-3">
            <div className="text-[#93c5fd]">satislar/</div>
            <div className="pl-2">yil=2026/ay=06/gun=26/...</div>
            <div className="pl-2">yil=2026/ay=06/gun=25/...</div>
          </div>
          <div className="text-[11px] text-[#4ade80] mt-3">
            WHERE yil=2026 AND ay=06 → sadece o klasör taranır, diğerleri atlanır.
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="bvbb-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fbbf24]">
            <Code className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Dosya formatı</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-3">
            Sütunlu (columnar) ve sıkıştırılmış formatlar büyük veride satır
            tabanlı CSV/JSON&apos;dan çok daha verimlidir.
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between bg-black/30 rounded px-3 py-2">
              <span className="font-mono text-[#f87171]">CSV / JSON</span>
              <span className="text-gray-500">satır bazlı · büyük · yavaş</span>
            </div>
            <div className="flex items-center justify-between bg-black/30 rounded px-3 py-2">
              <span className="font-mono text-[#4ade80]">Parquet / ORC</span>
              <span className="text-gray-500">sütun bazlı · sıkışık · hızlı</span>
            </div>
          </div>
          <div className="text-[11px] text-[#fbbf24] mt-3">
            Sütunlu format yalnızca gereken sütunları okur; tarama maliyetini düşürür.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  16 · UYGULAMALI LAB  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
      <H2>Kendi veri gölünü kur — dört adım</H2>
      <Sub className="mt-3 max-w-3xl">
        Free Tier hesabınla, sıfıra yakın maliyetle yapacaksın. Sonraki derse bu
        dördünü tamamlamış ve ekran görüntüsü almış gelmen bekleniyor.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          {
            icon: Box,
            title: "Bir kova oluştur",
            desc: "aws s3 mb s3://kullanici-veri-golu (globally unique isim); region eu-central-1.",
            accent: "#2563eb",
          },
          {
            icon: GitBranch,
            title: "Bölümlü önekle veri yükle",
            desc: "Bir CSV&apos;yi yil=2026/ay=06/ önekiyle yükle; ikinci dosyayı farklı aya koy.",
            accent: "#22c55e",
          },
          {
            icon: Thermometer,
            title: "Bir lifecycle kuralı tanımla",
            desc: "30 gün sonra STANDARD_IA, 90 gün sonra Glacier&apos;a geçişi konsoldan ekle.",
            accent: "#f59e0b",
          },
          {
            icon: Lock,
            title: "Erişimi kilitle",
            desc: "Block Public Access açık olduğunu doğrula; objeyi presigned URL ile geçici paylaş.",
            accent: "#a855f7",
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
              style={{ background: `${t.accent}18`, border: `1px solid ${t.accent}55` }}
            >
              <t.icon className="w-5 h-5" style={{ color: t.accent }} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-[10px] text-gray-500 font-mono">
                  {i + 1}
                </span>
                <h3 className="text-base font-semibold text-white">{t.title}</h3>
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
        className="mt-6 bvbb-card rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <AlertTriangle className="w-4 h-4 text-[#fbbf24] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Maliyet uyarısı:</span> Kovayı asla herkese
          açık (public) bırakma ve lab sonunda gereksiz nesneleri sil. Bir billing
          alert tanımlamak iyi bir alışkanlıktır.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  17 · SIRADAKİ HAFTA + KAPANIŞ  ───────────────── */
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
          <Network className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>6. hafta tamamlandı · sıradaki: Veriyi İşlemek</Eyebrow>
        <H1>
          <span className="bvbb-shimmer-sky">Depoladık · Şimdi İşleyeceğiz</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Veri gölümüz hazır. Gelecek hafta bu depodaki ham veriyi dağıtık olarak
          işlemeye geçiyoruz: Hadoop ekosistemi, HDFS ve veriyi paralel okuma.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto">
          <FeatureCard
            icon={Server}
            title="HDFS"
            desc="Dağıtık dosya sistemi — veriyi bloklara bölüp düğümlere yayma."
            accent="#2563eb"
            delay={0.1}
          />
          <FeatureCard
            icon={Database}
            title="Depo → Hesaplama"
            desc="Bulut deposundaki veriyi işleme motoruna bağlama."
            accent="#a855f7"
            delay={0.2}
          />
          <FeatureCard
            icon={Brain}
            title="Hazırlık"
            desc="Lab kovanı kurulu getir; örnek veri kümesi göl içinde dursun."
            accent="#22c55e"
            delay={0.3}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-10 text-[11px] font-mono text-gray-600"
        >
          BVA 2103 · Büyük Veri İçin Bulut Bilişim · Güz 2026 · Öğr. Gör. Osman Can Çetlenbik
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
          BVA 2103 · 6. Hafta · Bulut Depolama Çözümleri
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
