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
  Database,
  Layers,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  X,
  Sparkles,
  Zap,
  Target,
  Lightbulb,
  Users,
  Brain,
  HardDrive,
  Network,
  Box,
  Package,
  Settings,
  Terminal,
  GitCompareArrows,
  MapPin,
  Building2,
  Workflow,
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

/* Üç sağlayıcının marka kartı (kapak ve özet için) */
function ProviderCard({
  name,
  tag,
  color,
  founded,
  hq,
  delay = 0,
}: {
  name: string;
  tag: string;
  color: string;
  founded: string;
  hq: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bvbb-card rounded-xl p-5"
      style={{ borderColor: `${color}55` }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-11 h-11 rounded-lg flex items-center justify-center"
          style={{ background: `${color}22`, border: `1px solid ${color}66` }}
        >
          <Cloud className="w-5 h-5" style={{ color }} />
        </div>
        <div className="text-left">
          <div className="text-base font-bold text-white">{name}</div>
          <div className="text-[10px] text-gray-400">{tag}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div className="bvbb-card rounded p-2">
          <div className="text-gray-500 uppercase tracking-wider text-[9px]">Halka açılış</div>
          <div className="text-white font-semibold mt-0.5">{founded}</div>
        </div>
        <div className="bvbb-card rounded p-2">
          <div className="text-gray-500 uppercase tracking-wider text-[9px]">Merkez</div>
          <div className="text-white font-semibold mt-0.5">{hq}</div>
        </div>
      </div>
    </motion.div>
  );
}

/* Komut satırı (CLI) mockup — sağlayıcı bazlı renkli prompt */
function CLIWindow({
  title,
  tone,
  children,
}: {
  title: string;
  tone: "aws" | "azure" | "gcp";
  children: ReactNode;
}) {
  const toneColor =
    tone === "aws" ? "#ff9900" : tone === "azure" ? "#50abf1" : "#34a853";
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
          style={{ background: "#0d1117", color: toneColor }}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>{title}</span>
        </div>
      </div>
      <div className="bvbb-terminal">{children}</div>
    </motion.div>
  );
}

/* Bölge / Kullanılabilirlik Alanı diyagramı */
function RegionDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bvbb-card rounded-xl p-6"
    >
      <svg viewBox="0 0 640 230" className="w-full h-56">
        {/* Region kutusu */}
        <rect x="20" y="20" width="600" height="190" rx="10" fill="#0f172a" stroke="#2563eb55" />
        <text x="38" y="44" fontSize="13" fill="#93c5fd" fontWeight="700">
          Region · eu-central-1 (Frankfurt)
        </text>

        {/* 3 Availability Zone */}
        {[0, 1, 2].map((i) => {
          const x = 50 + i * 195;
          return (
            <g key={i}>
              <rect x={x} y="64" width="170" height="128" rx="8" fill="#1e293b" stroke="#64748b55" />
              <text x={x + 14} y="86" fontSize="11" fill="#cbd5e1" fontWeight="600">
                AZ {String.fromCharCode(97 + i)}
              </text>
              {/* sunucu blokları */}
              {[0, 1].map((j) => (
                <g key={j}>
                  <rect x={x + 14} y={100 + j * 38} width="142" height="28" rx="4" fill="#334155" stroke="#475569" />
                  <circle cx={x + 26} cy={114 + j * 38} r="3" fill={j === 0 ? "#22c55e" : "#60a5fa"} />
                  <text x={x + 38} y={118 + j * 38} fontSize="9" fill="#94a3b8">
                    {j === 0 ? "EC2 / VM" : "replica"}
                  </text>
                </g>
              ))}
            </g>
          );
        })}

        {/* AZ'ler arası düşük gecikmeli bağlantı */}
        <path d="M 220 128 L 245 128" stroke="#22d3ee" strokeWidth="2" strokeDasharray="4 3" />
        <path d="M 415 128 L 440 128" stroke="#22d3ee" strokeWidth="2" strokeDasharray="4 3" />
      </svg>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-400">
        <div className="flex items-start gap-2">
          <Check className="w-4 h-4 text-[#22c55e] mt-0.5 flex-shrink-0" />
          <span>
            Bir <span className="bvbb-token">Region</span> = bağımsız güç ve ağ altyapısına
            sahip, fiziksel olarak ayrı 2+ veri merkezinden (AZ) oluşan coğrafi alan.
          </span>
        </div>
        <div className="flex items-start gap-2">
          <Check className="w-4 h-4 text-[#60a5fa] mt-0.5 flex-shrink-0" />
          <span>
            Kopyaları farklı AZ&apos;lere yayarak tek bir veri merkezi çökse bile hizmet
            ayakta kalır — yüksek erişilebilirlik (HA) bu sayede kurulur.
          </span>
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
        <Eyebrow>BVA 2103 · 5. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="bvbb-shimmer">Başlıca Bulut</span>
          <br />
          <span className="text-white">Platformları</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Pazarın büyük üçlüsü: AWS, Azure ve GCP. Servis adlarını,
          mimari kavramlarını ve büyük veri yetkinliklerini karşılaştırıyoruz.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {[
            { name: "AWS", tag: "Amazon Web Services", color: "#ff9900" },
            { name: "Azure", tag: "Microsoft Azure", color: "#0078d4" },
            { name: "GCP", tag: "Google Cloud Platform", color: "#4285f4" },
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
                <Cloud className="w-5 h-5" style={{ color: p.color }} />
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
      <Eyebrow>Köprü · 4. haftadan 5. haftaya</Eyebrow>
      <H2>AWS&apos;i tanıdık; şimdi üçünü yan yana koyuyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta AWS temellerini (EC2, S3, IAM) çalıştık. Bu hafta aynı
        kavramların Azure ve GCP karşılıklarını öğrenip, bir projeye hangi
        platformun neden seçildiğini değerlendirebilecek hale geliyoruz.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bvbb-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#60a5fa]">
            <Check className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Geride bıraktığımız</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#60a5fa] flex-shrink-0" />Bulut nedir, hizmet ve dağıtım modelleri (IaaS/PaaS/SaaS).</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#60a5fa] flex-shrink-0" />AWS konsolu, EC2 sanal sunucu ve S3 nesne deposu.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#60a5fa] flex-shrink-0" />IAM ile kimlik ve en az yetki ilkesi.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="bvbb-card-sky rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#67e8f9]">
            <Target className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu haftanın hedefi</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22d3ee] flex-shrink-0" />Üç platformun pazardaki yeri ve kapsamı.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22d3ee] flex-shrink-0" />Compute / Storage / Database servis adlarını eşleştirme.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22d3ee] flex-shrink-0" />Region/AZ kavramı + büyük veri servisleri kıyası.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3 · DERSİN AKIŞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: Tanışma → Eşleştirme → Büyük veri</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce her sağlayıcının kim olduğunu ve neyle öne çıktığını görürüz; sonra
        temel servisleri yan yana eşleştiririz; en sonda büyük veri / analitik
        yetkinliklerini karşılaştırırız.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Üç Sağlayıcı", items: ["Pazar payı ve konum", "Güçlü oldukları alanlar", "Bölge altyapısı"], icon: Cloud, accent: "#ff9900" },
          { range: "02", title: "Servis Eşleştirme", items: ["Compute · Storage · DB", "Adlandırma farkları", "CLI komutları"], icon: GitCompareArrows, accent: "#0078d4" },
          { range: "03", title: "Büyük Veri", items: ["Veri ambarı & göl", "Yönetilen Spark/Hadoop", "Akış ve ML servisleri"], icon: Database, accent: "#4285f4" },
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

  /* ─────────────────  4 · BÖLÜM 1 · ÜÇ SAĞLAYICI  ───────────────── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Büyük Üçlü"
      subtitle="AWS, Azure ve GCP — kim, ne zaman, hangi güçlü yanıyla pazara hâkim oldu?"
      bgGradient="linear-gradient(135deg, #ff9900 0%, #ec7211 100%)"
      shadow="0 20px 60px -10px rgba(255, 153, 0, 0.5)"
      icon={<Cloud className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  5 · ÜÇ SAĞLAYICI TANITIM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Tanışma · sağlayıcı profilleri</Eyebrow>
      <H2>Üç sağlayıcı, üç köken</H2>
      <Sub className="mt-3 max-w-3xl">
        Her platform farklı bir kurumsal mirastan geliyor; bu miras, güçlü
        oldukları alanları doğrudan etkiliyor.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <ProviderCard
          name="Amazon Web Services"
          tag="AWS · pazar lideri"
          color="#ff9900"
          founded="2006"
          hq="Seattle, ABD"
          delay={0.0}
        />
        <ProviderCard
          name="Microsoft Azure"
          tag="Kurumsal & hibrit"
          color="#0078d4"
          founded="2010"
          hq="Redmond, ABD"
          delay={0.12}
        />
        <ProviderCard
          name="Google Cloud Platform"
          tag="Veri & yapay zeka"
          color="#4285f4"
          founded="2008"
          hq="Mountain View, ABD"
          delay={0.24}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <FeatureCard
          icon={Layers}
          title="AWS · en geniş katalog"
          desc="200'ü aşkın servisle en olgun ve geniş ekosistem; ilk girenin avantajı ve büyük topluluk."
          delay={0.0}
          accent="#ff9900"
        />
        <FeatureCard
          icon={Building2}
          title="Azure · kurumsal entegrasyon"
          desc="Windows Server, Active Directory ve Office 365 dünyasıyla sıkı uyum; güçlü hibrit (Arc) desteği."
          delay={0.1}
          accent="#0078d4"
        />
        <FeatureCard
          icon={Brain}
          title="GCP · veri ve ML"
          desc="BigQuery, Kubernetes (kökeni Google) ve Vertex AI ile veri analitiği ve makine öğrenmesinde öne çıkar."
          delay={0.2}
          accent="#4285f4"
        />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  6 · PAZAR PAYI BAR CHART  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Pazar Payı · IaaS+PaaS</Eyebrow>
      <H2>Büyük üçlü ve diğerleri</H2>
      <Sub className="mt-3 max-w-3xl">
        Synergy Research Group&apos;un dönemsel raporlarına göre küresel bulut
        altyapı pazarının yaklaşık üçte ikisi ilk üç sağlayıcıda toplanmış
        durumda. Oranlar dönemden döneme bir miktar değişir.
      </Sub>

      <div className="mt-10 space-y-5">
        {[
          { name: "AWS", value: 31, color: "#ff9900", barClass: "bvbb-bar-aws", note: "Lider" },
          { name: "Microsoft Azure", value: 24, color: "#0078d4", barClass: "bvbb-bar-azure", note: "İkinci · büyüyor" },
          { name: "Google Cloud", value: 11, color: "#4285f4", barClass: "bvbb-bar-gcp", note: "Üçüncü" },
          { name: "Diğer (Alibaba, IBM, Oracle…)", value: 34, color: "#94a3b8", barClass: "bvbb-bar-other", note: "Toplam" },
        ].map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">{p.name}</span>
                <span className="text-[10px] text-gray-500 font-mono">{p.note}</span>
              </div>
              <span className="text-lg font-bold" style={{ color: p.color }}>%{p.value}</span>
            </div>
            <div className="h-6 bg-white/5 rounded-md overflow-hidden border border-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${p.value * 2.5}%` }}
                transition={{ duration: 1, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className={`h-full ${p.barClass}`}
                style={{ maxWidth: "100%" }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="mt-8 text-[11px] text-gray-500 text-center font-mono"
      >
        Kaynak · Synergy Research Group (yaklaşık değerler) · Bar genişlikleri görselleştirme için ölçeklenmiştir.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  7 · REGION & AZ DİYAGRAMI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Ortak kavram · küresel altyapı</Eyebrow>
      <H2 className="mb-2">Region ve Availability Zone</H2>
      <Sub className="max-w-3xl mb-6">
        Üç sağlayıcı da dünyayı <span className="text-white">Region</span>&apos;lara,
        her Region&apos;ı birden çok <span className="text-white">Availability
        Zone</span>&apos;a böler. Doğru bölge seçimi gecikmeyi, maliyeti ve veri
        ikametgâhı (data residency) gerekliliklerini belirler.
      </Sub>
      <RegionDiagram />
    </SlideShell>
  ),

  /* ─────────────────  8 · BÖLÜM 2 · SERVİS EŞLEŞTİRME  ───────────────── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Servisleri Eşleştir"
      subtitle="Aynı işi yapan servislerin AWS, Azure ve GCP'deki üç farklı adı — bir kez öğren, her yerde tanı."
      bgGradient="linear-gradient(135deg, #0078d4 0%, #2563eb 100%)"
      shadow="0 20px 60px -10px rgba(0, 120, 212, 0.55)"
      icon={<GitCompareArrows className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  9 · SERVİS EŞLEŞTİRME TABLOSU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Rosetta taşı · çekirdek servisler</Eyebrow>
      <H2>Aynı kavram, üç farklı isim</H2>
      <Sub className="mt-3 max-w-3xl">
        Bir platformu bilen, bu eşleştirmeyle diğerlerine hızla geçer. Soldaki
        genel kavramı aklında tut, sağdaki marka adları ezberi azaltır.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-7 bvbb-card rounded-xl overflow-hidden"
      >
        <table className="bvbb-cmp">
          <thead>
            <tr>
              <th>Kavram</th>
              <th><span className="bvbb-aws-brand">AWS</span></th>
              <th><span className="bvbb-azure-brand">Azure</span></th>
              <th><span className="bvbb-gcp-brand">GCP</span></th>
            </tr>
          </thead>
          <tbody>
            {[
              { k: "Sanal sunucu (IaaS)", a: "EC2", z: "Virtual Machines", g: "Compute Engine" },
              { k: "Nesne depolama", a: "S3", z: "Blob Storage", g: "Cloud Storage" },
              { k: "Sunucusuz fonksiyon", a: "Lambda", z: "Functions", g: "Cloud Functions" },
              { k: "Yönetilen ilişkisel DB", a: "RDS", z: "Azure SQL Database", g: "Cloud SQL" },
              { k: "Yönetilen Kubernetes", a: "EKS", z: "AKS", g: "GKE" },
              { k: "Kimlik & erişim", a: "IAM", z: "Entra ID / RBAC", g: "Cloud IAM" },
            ].map((row, i) => (
              <motion.tr
                key={row.k}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.07 }}
              >
                <td className="font-medium text-white">{row.k}</td>
                <td className="font-mono text-[#ffb84d]">{row.a}</td>
                <td className="font-mono text-[#50abf1]">{row.z}</td>
                <td className="font-mono text-[#6fa8f5]">{row.g}</td>
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
        <span className="bvbb-token">Not</span> Servisler birebir aynı değildir;
        kotalar, fiyatlandırma ve özellikler farklılık gösterir — eşleştirme bir
        başlangıç haritasıdır.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  10 · CLI KARŞILAŞTIRMA  ───────────────── */
  () => (
    <SlideShell bgPattern={false}>
      <Eyebrow>Komut satırı · aynı iş, üç sözdizimi</Eyebrow>
      <H2 className="mb-2">Bir sanal sunucuyu üç farklı CLI ile başlatmak</H2>
      <Sub className="max-w-3xl mb-6">
        Her sağlayıcının kendi CLI&apos;ı var: <span className="font-mono text-[#ffb84d]">aws</span>,{" "}
        <span className="font-mono text-[#50abf1]">az</span> ve{" "}
        <span className="font-mono text-[#6fa8f5]">gcloud</span>. Komutlar benzer
        kavramları farklı bayraklarla ifade eder.
      </Sub>

      <CLIWindow title="bash — üç sağlayıcı, tek görev: VM oluştur" tone="aws">
        <div>
          <span className="bvbb-term-prompt">aws</span>{" "}
          <span className="bvbb-term-cmd">ec2 run-instances</span>{" "}
          <span className="bvbb-term-key">--image-id</span> ami-0abc{" "}
          <span className="bvbb-term-key">--instance-type</span> t3.micro
        </div>
        <div className="bvbb-term-dim">  → AWS · EC2 örneği başlatır (Region varsayılan profile bağlı)</div>
        <div className="mt-2">
          <span className="bvbb-term-prompt-az">az</span>{" "}
          <span className="bvbb-term-cmd">vm create</span>{" "}
          <span className="bvbb-term-key">--resource-group</span> bva-rg{" "}
          <span className="bvbb-term-key">--name</span> vm1{" "}
          <span className="bvbb-term-key">--image</span> Ubuntu2204
        </div>
        <div className="bvbb-term-dim">  → Azure · sanal makineyi bir Resource Group içinde oluşturur</div>
        <div className="mt-2">
          <span className="bvbb-term-prompt-gcp">gcloud</span>{" "}
          <span className="bvbb-term-cmd">compute instances create</span> vm1{" "}
          <span className="bvbb-term-key">--machine-type</span> e2-micro{" "}
          <span className="bvbb-term-key">--zone</span> europe-west3-a
        </div>
        <div className="bvbb-term-dim">  → GCP · Compute Engine örneğini belirtilen zone&apos;da kurar</div>
        <div className="mt-3 bvbb-term-warn">
          # Ortak fikir: imaj + makine tipi + konum. Farklı olan sadece kelimeler.
        </div>
      </CLIWindow>
    </SlideShell>
  ),

  /* ─────────────────  11 · AYIRT EDİCİ GÜÇLER  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Karşılaştırma · ne zaman hangisi?</Eyebrow>
      <H2>Üçü de yeterli; seçim bağlama göre</H2>
      <Sub className="mt-3 max-w-3xl">
        &quot;En iyi bulut&quot; diye mutlak bir cevap yok. Mevcut yetenekler,
        kurumsal yatırım ve iş yükü tipi kararı belirler.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-7">
        {[
          {
            n: "AWS",
            color: "#ff9900",
            icon: Layers,
            pro: "En geniş servis kataloğu, olgun belgeler, büyük topluluk",
            con: "Çokluk karmaşaya yol açabilir; isimlendirme dağınık",
            pick: "Geniş ölçek, çok çeşitli servis ihtiyacı",
          },
          {
            n: "Azure",
            color: "#0078d4",
            icon: Building2,
            pro: "Microsoft ekosistemi & hibrit (on-prem + bulut) güçlü",
            con: "Bazı servisler bölgesel olarak geç yaygınlaşır",
            pick: "Windows/AD ağırlıklı kurumlar, hibrit senaryo",
          },
          {
            n: "GCP",
            color: "#4285f4",
            icon: Brain,
            pro: "Veri analitiği (BigQuery) ve ML/Kubernetes liderliği",
            con: "Katalog görece dar, kurumsal erişim daha yeni",
            pick: "Veri/ML ağırlıklı, konteyner-yerli projeler",
          },
        ].map((d, i) => (
          <motion.div
            key={d.n}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
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
              <div className="text-base font-bold text-white">{d.n}</div>
            </div>
            <div className="bvbb-heat-high rounded p-2 text-xs mb-2">
              <div className="flex items-center gap-1 font-semibold text-[10px] uppercase tracking-wider">
                <Check className="w-3 h-3" /> Güçlü yan
              </div>
              <div className="mt-1">{d.pro}</div>
            </div>
            <div className="bvbb-heat-low rounded p-2 text-xs mb-2">
              <div className="flex items-center gap-1 font-semibold text-[10px] uppercase tracking-wider">
                <X className="w-3 h-3" /> Dikkat
              </div>
              <div className="mt-1">{d.con}</div>
            </div>
            <div className="text-[11px] text-gray-400 border-t border-white/5 pt-2">
              <span className="bvbb-token">Seç</span> {d.pick}
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  12 · BÖLÜM 3 · BÜYÜK VERİ  ───────────────── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Büyük Veri Servisleri"
      subtitle="Dersimizin asıl konusu: her platformun veri ambarı, veri gölü, yönetilen Spark ve ML araçları."
      bgGradient="linear-gradient(135deg, #4285f4 0%, #34a853 100%)"
      shadow="0 20px 60px -10px rgba(66, 133, 244, 0.55)"
      icon={<Database className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  13 · BÜYÜK VERİ SERVİS TABLOSU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Analitik yığını · eşleştirme</Eyebrow>
      <H2>Büyük veri için karşılıklar</H2>
      <Sub className="mt-3 max-w-3xl">
        İlerleyen haftalarda Hadoop ve Spark çalışacağız. Bunları bulutta hangi
        yönetilen servislerin sağladığını şimdiden tanıyalım.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-7 bvbb-card rounded-xl overflow-hidden"
      >
        <table className="bvbb-cmp">
          <thead>
            <tr>
              <th>İş yükü</th>
              <th><span className="bvbb-aws-brand">AWS</span></th>
              <th><span className="bvbb-azure-brand">Azure</span></th>
              <th><span className="bvbb-gcp-brand">GCP</span></th>
            </tr>
          </thead>
          <tbody>
            {[
              { k: "Veri ambarı (DWH)", a: "Redshift", z: "Synapse Analytics", g: "BigQuery" },
              { k: "Yönetilen Hadoop/Spark", a: "EMR", z: "HDInsight", g: "Dataproc" },
              { k: "Veri gölü depolama", a: "S3 + Lake Formation", z: "Data Lake Storage Gen2", g: "Cloud Storage" },
              { k: "Akış / mesajlaşma", a: "Kinesis", z: "Event Hubs", g: "Pub/Sub" },
              { k: "ETL / veri akışı", a: "Glue", z: "Data Factory", g: "Dataflow" },
              { k: "Makine öğrenmesi", a: "SageMaker", z: "Azure ML", g: "Vertex AI" },
            ].map((row, i) => (
              <motion.tr
                key={row.k}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.07 }}
              >
                <td className="font-medium text-white">{row.k}</td>
                <td className="font-mono text-[#ffb84d]">{row.a}</td>
                <td className="font-mono text-[#50abf1]">{row.z}</td>
                <td className="font-mono text-[#6fa8f5]">{row.g}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-4 bvbb-card rounded-xl p-4 flex items-start gap-3"
      >
        <Lightbulb className="w-5 h-5 text-[#60a5fa] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-300">
          <span className="bvbb-token">Trend</span> EMR, HDInsight ve Dataproc;
          açık kaynak Apache Spark&apos;ı bulutta kurma/yönetme yükünü üstlenir —
          sen küme yapılandırmasını seçersin, sağlayıcı altyapıyı işletir.
        </p>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  14 · BÜYÜK VERİ NEDEN BULUTTA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bağlam · neden bulutta büyük veri?</Eyebrow>
      <H2>
        Üçü de aynı vaadi verir: <span className="bvbb-shimmer-sky">esneklik</span>
      </H2>
      <Sub className="mt-3 max-w-3xl">
        Platform farklı olsa da büyük veri için bulutu çekici kılan ilkeler
        ortaktır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <FeatureCard
          icon={HardDrive}
          title="Petabayt ölçeğinde depolama"
          desc="S3, Blob ve Cloud Storage; ucuz, dayanıklı nesne deposuyla veri gölünün temelini oluşturur."
          delay={0.0}
          accent="#22c55e"
        />
        <FeatureCard
          icon={Zap}
          title="Talebe göre hesaplama"
          desc="İş bittiğinde kümeyi kapat; analiz için sadece kullandığın dakikayı öde — sabit küme maliyeti yok."
          delay={0.1}
          accent="#2563eb"
        />
        <FeatureCard
          icon={Workflow}
          title="Yönetilen servisler"
          desc="Spark/Hadoop kurulumuyla değil, sorgu ve modelle uğraşırsın; yama ve ölçek sağlayıcının işi."
          delay={0.2}
          accent="#a855f7"
        />
        <FeatureCard
          icon={Network}
          title="Entegre yığın"
          desc="Depolama, işleme, akış ve ML aynı platformda; IAM ve ağ ile uçtan uca tek yerden yönetilir."
          delay={0.3}
          accent="#f59e0b"
        />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  15 · UYGULAMALI · BU HAFTA YAPILACAKLAR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı görev</Eyebrow>
      <H2>İki bulutta birer hesap, bir karşılaştırma</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta AWS hesabını açtınız. Bu hafta ikinci bir sağlayıcının
        ücretsiz katmanını deneyimleyip iki konsolu karşılaştıracaksınız.
      </Sub>

      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            n: 1,
            t: "İkinci sağlayıcıyı seç",
            d: "Azure for Students ya da GCP Free Tier'dan birinde hesap aç (kredi/öğrenci kotası yeterli).",
            icon: Cloud,
            color: "#0078d4",
          },
          {
            n: 2,
            t: "Bir nesne deposu oluştur",
            d: "Azure'da Blob container, GCP'de Cloud Storage bucket aç; bir dosya yükle ve erişimi test et.",
            icon: HardDrive,
            color: "#22c55e",
          },
          {
            n: 3,
            t: "CLI'ı kur ve bağlan",
            d: "az login veya gcloud init çalıştır; tek komutla depolama içeriğini listele (az storage / gcloud storage ls).",
            icon: Terminal,
            color: "#4285f4",
          },
          {
            n: 4,
            t: "Eşleştirme tablonu doldur",
            d: "AWS S3 ile seçtiğin servisi 5 satırda karşılaştır: ad, region kavramı, fiyat birimi, konsol, CLI komutu.",
            icon: GitCompareArrows,
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
        <span className="bvbb-token">İpucu</span> Ücretsiz katman bittiğinde
        ücretlendirmeyi önlemek için kullanmadığın kaynakları sil; faturalama
        uyarısı kur.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  16 · SIRADAKİ HAFTA + KAPANIŞ  ───────────────── */
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
          <Box className="w-12 h-12 text-white" />
        </motion.div>

        <Eyebrow>5. hafta tamamlandı · sıradaki: Sanallaştırma</Eyebrow>
        <H1>
          <span className="bvbb-shimmer">Sanallaştırma</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bulutun motoru sanallaştırmadır. Hafta 6&apos;da hipervizörler, sanal
          makineler ve kaynak paylaşımının nasıl çalıştığını açıyoruz.
        </Sub>

        <div className="mt-9 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <FeatureCard
            icon={Server}
            title="Hipervizör"
            desc="Tip-1 (bare-metal) ve Tip-2 ayrımı; tek donanım, çok sanal makine."
            delay={0.1}
            accent="#2563eb"
          />
          <FeatureCard
            icon={Package}
            title="VM yaşam döngüsü"
            desc="Şablon, anlık görüntü (snapshot) ve taşıma (migration) kavramları."
            delay={0.2}
            accent="#a855f7"
          />
          <FeatureCard
            icon={Settings}
            title="Kaynak paylaşımı"
            desc="vCPU, bellek ve depolamanın çoklu kiracıya nasıl bölündüğü."
            delay={0.3}
            accent="#22c55e"
          />
        </div>

        <div className="mt-9 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
          <div className="bvbb-card rounded-xl p-5">
            <Users className="w-5 h-5 text-[#60a5fa] mb-3" />
            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-1">Ders saati</div>
            <div className="text-white font-semibold">Çarşamba</div>
            <div className="text-sm text-gray-400">09:55 — 12:30 · Derslik 7</div>
          </div>
          <div className="bvbb-card rounded-xl p-5">
            <Target className="w-5 h-5 text-[#a855f7] mb-3" />
            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">İkinci hesap</div>
            <div className="text-sm text-gray-400">Azure ya da GCP açık</div>
          </div>
          <div className="bvbb-card rounded-xl p-5">
            <Briefcase className="w-5 h-5 text-[#22c55e] mb-3" />
            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">Eşleştirme tablosu</div>
            <div className="text-sm text-gray-400">5 satır karşılaştırma</div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-10 text-[11px] font-mono text-gray-600 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>BVA 2103 · Büyük Veri İçin Bulut Bilişim · Güz 2026</span>
          <MapPin className="w-3.5 h-3.5" />
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
          BVA 2103 · 5. Hafta · AWS · Azure · GCP
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
