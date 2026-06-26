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
  Globe,
  Layers,
  Users,
  Building2,
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
  Lock,
  HardDrive,
  Network,
  Workflow,
  Terminal,
  Scale,
  GitBranch,
  ListChecks,
  ArrowRight,
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

function DeploymentModelDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bvbb-card rounded-xl p-6"
    >
      <svg viewBox="0 0 720 240" className="w-full h-56">
        <defs>
          <linearGradient id="bvbbPub" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="bvbbPriv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        {/* PRIVATE side (kurum içi) */}
        <rect x="20" y="30" width="220" height="180" rx="10" fill="#a855f714" stroke="#a855f755" />
        <text x="130" y="52" textAnchor="middle" fontSize="12" fill="#c4b5fd" fontWeight="700">
          PRIVATE — Kurum
        </text>
        <rect x="50" y="70" width="70" height="50" rx="5" fill="url(#bvbbPriv)" opacity="0.85" />
        <text x="85" y="100" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="700">Veri Merkezi</text>
        <rect x="140" y="70" width="70" height="50" rx="5" fill="#1e293b" stroke="#a855f766" />
        <text x="175" y="92" textAnchor="middle" fontSize="9" fill="#c4b5fd">Hassas</text>
        <text x="175" y="105" textAnchor="middle" fontSize="9" fill="#c4b5fd">veri</text>
        <rect x="50" y="135" width="160" height="46" rx="5" fill="#1e293b" stroke="#a855f744" />
        <text x="130" y="162" textAnchor="middle" fontSize="9" fill="#94a3b8">Firewall · İç ekip yönetir</text>

        {/* HYBRID köprüsü */}
        <g stroke="#22c55e" strokeWidth="2" fill="none" strokeDasharray="5 4">
          <path d="M 240 120 L 480 120" />
        </g>
        <rect x="320" y="100" width="80" height="40" rx="20" fill="#22c55e1c" stroke="#22c55e66" />
        <text x="360" y="124" textAnchor="middle" fontSize="10" fill="#86efac" fontWeight="700">HYBRID</text>

        {/* PUBLIC side (sağlayıcı) */}
        <rect x="480" y="30" width="220" height="180" rx="10" fill="#2563eb14" stroke="#2563eb55" />
        <text x="590" y="52" textAnchor="middle" fontSize="12" fill="#93c5fd" fontWeight="700">
          PUBLIC — Sağlayıcı
        </text>
        <path
          d="M 540 110 C 525 110 518 95 533 88 C 533 70 562 67 572 82 C 583 67 614 70 619 88
             C 640 84 654 102 640 116 C 648 130 626 138 608 130 L 552 130 C 530 134 520 120 540 110 Z"
          fill="url(#bvbbPub)"
          opacity="0.92"
        />
        <rect x="540" y="95" width="26" height="16" rx="3" fill="#fff" opacity="0.85" />
        <text x="553" y="107" textAnchor="middle" fontSize="8" fill="#1e3a8a" fontWeight="700">EC2</text>
        <rect x="572" y="95" width="22" height="16" rx="3" fill="#fff" opacity="0.85" />
        <text x="583" y="107" textAnchor="middle" fontSize="8" fill="#1e3a8a" fontWeight="700">S3</text>
        <rect x="600" y="95" width="34" height="16" rx="3" fill="#fff" opacity="0.85" />
        <text x="617" y="107" textAnchor="middle" fontSize="8" fill="#1e3a8a" fontWeight="700">Spark</text>
        <text x="590" y="170" textAnchor="middle" fontSize="9" fill="#94a3b8">Esnek ölçek · OpEx</text>

        {/* COMMUNITY altta küçük */}
        <text x="360" y="200" textAnchor="middle" fontSize="9" fill="#fbbf24">
          COMMUNITY = ortak ihtiyaçlı kurumların paylaştığı private bulut
        </text>
      </svg>
      <div className="mt-2 text-[11px] text-gray-500 text-center">
        Hybrid, private ile public arasında güvenli bir köprü kurar; veri sınıfına
        göre iş yükünü doğru tarafa yerleştirir.
      </div>
    </motion.div>
  );
}

function DeploymentTerminal() {
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
          <span>admin@mcbu:~ — hybrid kurulum</span>
        </div>
      </div>
      <div className="bvbb-terminal">
        <div>
          <span className="bvbb-term-prompt">admin@mcbu</span>
          <span className="bvbb-term-dim">:~$</span>{" "}
          <span className="bvbb-term-cmd"># 1) Public tarafta veri gölü kovası</span>
        </div>
        <div>
          <span className="bvbb-term-prompt">admin@mcbu</span>
          <span className="bvbb-term-dim">:~$</span>{" "}
          <span className="bvbb-term-cmd">aws s3 mb s3://mcbu-datalake --region eu-central-1</span>
        </div>
        <div className="bvbb-term-ok">make_bucket: mcbu-datalake</div>

        <div className="mt-2">
          <span className="bvbb-term-prompt">admin@mcbu</span>
          <span className="bvbb-term-dim">:~$</span>{" "}
          <span className="bvbb-term-cmd"># 2) Hassas veri private (on-prem) kalsın</span>
        </div>
        <div>
          <span className="bvbb-term-prompt">admin@mcbu</span>
          <span className="bvbb-term-dim">:~$</span>{" "}
          <span className="bvbb-term-cmd">kubectl get nodes --context onprem-private</span>
        </div>
        <div className="bvbb-term-dim">NAME            STATUS   ROLES    AGE</div>
        <div className="bvbb-term-dim">priv-master-1   Ready    control  120d</div>
        <div className="bvbb-term-dim">priv-worker-1   Ready    worker   120d</div>

        <div className="mt-2">
          <span className="bvbb-term-prompt">admin@mcbu</span>
          <span className="bvbb-term-dim">:~$</span>{" "}
          <span className="bvbb-term-cmd"># 3) İki tarafı VPN ile köprüle (hybrid)</span>
        </div>
        <div>
          <span className="bvbb-term-prompt">admin@mcbu</span>
          <span className="bvbb-term-dim">:~$</span>{" "}
          <span className="bvbb-term-cmd">aws ec2 describe-vpn-connections --query &quot;VpnConnections[].State&quot;</span>
        </div>
        <div>
          <span className="bvbb-term-warn">[</span>{" "}
          <span className="bvbb-term-ok">&quot;available&quot;</span>{" "}
          <span className="bvbb-term-warn">]</span>{" "}
          <span className="bvbb-term-dim"># tünel ayakta — hybrid hazır</span>
        </div>
        <div className="mt-2">
          <span className="bvbb-term-prompt">admin@mcbu</span>
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
        <Eyebrow>BVA 2103 · 4. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="bvbb-shimmer">Bulut Dağıtım</span>
          <br />
          <span className="text-white">Modelleri</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Public, Private, Hybrid ve Community. Bulutu kimin sahiplendiği ve kimin
          kullandığı, büyük veri mimarinizin maliyetini, güvenliğini ve hızını belirler.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            { name: "Public", tag: "Herkese açık", color: "#2563eb", icon: Globe },
            { name: "Private", tag: "Tek kuruma özel", color: "#a855f7", icon: Lock },
            { name: "Hybrid", tag: "İkisinin köprüsü", color: "#22c55e", icon: Workflow },
            { name: "Community", tag: "Ortak topluluk", color: "#f59e0b", icon: Users },
          ].map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              className="bvbb-card rounded-xl p-4 flex flex-col items-center gap-2"
              style={{ borderColor: `${p.color}55` }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${p.color}22`, border: `1px solid ${p.color}66` }}
              >
                <p.icon className="w-5 h-5" style={{ color: p.color }} />
              </div>
              <div className="text-sm font-bold text-white">{p.name}</div>
              <div className="text-[10px] text-gray-400">{p.tag}</div>
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
      <Eyebrow>Köprü · 3. haftadan 4. haftaya</Eyebrow>
      <H2>Hizmet modelini öğrendik; sıra dağıtım modelinde</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta &ldquo;ne tükettiğimizi&rdquo; konuştuk: IaaS, PaaS, SaaS. Bu hafta
        ayrı bir soruyu yanıtlıyoruz: bu hizmet &ldquo;nerede ve kimin için&rdquo; çalışıyor?
        İki eksen birbirinden bağımsızdır — örneğin IaaS hem public hem private kurulabilir.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-9">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bvbb-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#60a5fa]">
            <Layers className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Hizmet modeli (H3)</span>
          </div>
          <p className="text-sm text-gray-300 mb-3">
            Sorduğu soru: <span className="text-white">Yığının hangi katmanını ben yönetirim?</span>
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#60a5fa] flex-shrink-0" />IaaS · PaaS · SaaS</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#60a5fa] flex-shrink-0" />Soyutlama vs kontrol dengesi</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="bvbb-card-sky rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#7dd3fc]">
            <Cloud className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Dağıtım modeli (H4)</span>
          </div>
          <p className="text-sm text-gray-300 mb-3">
            Sorduğu soru: <span className="text-white">Altyapı kime ait, kim erişebilir?</span>
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#7dd3fc] flex-shrink-0" />Public · Private · Hybrid · Community</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#7dd3fc] flex-shrink-0" />Mülkiyet · konum · paylaşım sınırı</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3 · BU HAFTANIN HEDEFİ / AKIŞ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu haftanın hedefi</Eyebrow>
      <H2>Üç durakta dağıtım modelleri</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce tanımlar ve dört modelin temel ayrımı; sonra her birinin avantaj/maliyet
        dengesi ve büyük veriye etkisi; en son hangi yükü nereye koyacağımıza karar verip
        küçük bir uygulama yapıyoruz.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            range: "01",
            title: "Tanımlar & Ayrım",
            items: ["NIST dört dağıtım modeli", "Public · Private", "Hybrid · Community"],
            icon: Cloud,
            accent: "#2563eb",
          },
          {
            range: "02",
            title: "Karar & Maliyet",
            items: ["Avantaj/dezavantaj", "CapEx vs OpEx", "Büyük veriye etkisi"],
            icon: Scale,
            accent: "#a855f7",
          },
          {
            range: "03",
            title: "Uygulama",
            items: ["İş yükü yerleştirme", "Hybrid mimari", "Mini senaryo"],
            icon: Workflow,
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

  /* ─────────────────  4 · BÖLÜM 1 · TANIMLAR  ───────────────── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Dört Model, Tek Soru"
      subtitle="Altyapı kime ait ve kim erişebilir? NIST SP 800-145 bulutu dört dağıtım modeline ayırır."
      bgGradient="linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)"
      shadow="0 20px 60px -10px rgba(37, 99, 235, 0.6)"
      icon={<Cloud className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  5 · DÖRT MODEL KARTLARI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>4 Dağıtım Modeli</Eyebrow>
      <H2>Public · Private · Hybrid · Community</H2>
      <Sub className="mt-3 max-w-3xl">
        &ldquo;Altyapı kime ait, kim erişebilir?&rdquo; sorusunun cevabı dağıtım modelini
        belirler. Dördü de NIST&apos;in resmi tanımında yer alır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-7">
        {[
          {
            n: "Public Cloud",
            icon: Globe,
            color: "#2563eb",
            ex: "AWS · Azure · GCP",
            who: "Açık erişim — çoklu kiracı (multi-tenant)",
            pro: "Düşük başlangıç maliyeti, anında ölçek",
            con: "Veri konumu/uyum kontrolü daha az",
          },
          {
            n: "Private Cloud",
            icon: Lock,
            color: "#a855f7",
            ex: "VMware vCloud · OpenStack",
            who: "Tek kuruma özel — tek kiracı (single-tenant)",
            pro: "Tam kontrol, sıkı güvenlik ve uyum",
            con: "Yüksek CapEx, iç ekip ve bakım yükü",
          },
          {
            n: "Hybrid Cloud",
            icon: Workflow,
            color: "#22c55e",
            ex: "AWS Outposts · Azure Arc",
            who: "Private + public, veri taşınabilir köprüyle bağlı",
            pro: "Kritik veri içeride, taşma yükü dışarıda",
            con: "Entegrasyon ve ağ karmaşıklığı",
          },
          {
            n: "Community Cloud",
            icon: Users,
            color: "#f59e0b",
            ex: "GovCloud · sağlık/üniversite birlikleri",
            who: "Ortak ihtiyaçlı birkaç kurumun paylaştığı bulut",
            pro: "Ortak uyum gereği, maliyet paylaşımı",
            con: "Sınırlı esneklik, üyelik yönetimi zor",
          },
        ].map((d, i) => (
          <motion.div
            key={d.n}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bvbb-card rounded-xl p-5"
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
            </div>
            <div className="text-xs text-gray-400 mb-2">{d.who}</div>
            <div className="grid grid-cols-2 gap-2 text-xs mt-2">
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

  /* ─────────────────  6 · KARŞILAŞTIRMA TABLOSU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Karşılaştırma · 5 eksen</Eyebrow>
      <H2>Aynı boyutlar, dört farklı cevap</H2>
      <Sub className="mt-3 max-w-3xl">
        Modelleri yan yana koyunca seçimin neye dayandığı netleşir: mülkiyet, kiracılık,
        maliyet, kontrol ve tipik kullanım.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-7 bvbb-card rounded-xl overflow-hidden"
      >
        <table className="bvbb-tbl">
          <thead>
            <tr>
              <th style={{ width: "16%" }}>Boyut</th>
              <th>
                <Globe className="inline w-4 h-4 mr-1.5 -mt-0.5 text-[#60a5fa]" />
                Public
              </th>
              <th>
                <Lock className="inline w-4 h-4 mr-1.5 -mt-0.5 text-[#c084fc]" />
                Private
              </th>
              <th>
                <Workflow className="inline w-4 h-4 mr-1.5 -mt-0.5 text-[#4ade80]" />
                Hybrid
              </th>
              <th>
                <Users className="inline w-4 h-4 mr-1.5 -mt-0.5 text-[#fbbf24]" />
                Community
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                k: "Mülkiyet",
                pu: "Sağlayıcı",
                pr: "Tek kurum",
                hy: "Karma",
                co: "Birlik / konsorsiyum",
              },
              {
                k: "Kiracılık",
                pu: "Çoklu (multi-tenant)",
                pr: "Tek (single-tenant)",
                hy: "Karma",
                co: "Sınırlı çoklu",
              },
              {
                k: "Maliyet",
                pu: "OpEx · en düşük giriş",
                pr: "CapEx · yüksek",
                hy: "Karma",
                co: "Paylaşılan",
              },
              {
                k: "Kontrol / uyum",
                pu: "Orta",
                pr: "En yüksek",
                hy: "Esnek",
                co: "Ortak kurallar",
              },
              {
                k: "Tipik kullanım",
                pu: "Startup · web · analitik",
                pr: "Banka · savunma · sağlık",
                hy: "Geçiş · taşma yükü",
                co: "Kamu · üniversite",
              },
            ].map((row, i) => (
              <motion.tr
                key={row.k}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.07 }}
              >
                <td className="text-white font-medium">{row.k}</td>
                <td>{row.pu}</td>
                <td>{row.pr}</td>
                <td>{row.hy}</td>
                <td>{row.co}</td>
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
        <span className="bvbb-token">Not</span> Community, teknik olarak çok kiracılı bir
        private buluttur; farkı kiracıların ortak bir uyum/amaç paylaşmasıdır.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  7 · GÖRSEL DİYAGRAM  ───────────────── */
  () => (
    <SlideShell bgPattern={false}>
      <Eyebrow>Görsel · modeller bir arada</Eyebrow>
      <H2 className="mb-2">Private, public ve aradaki köprü</H2>
      <Sub className="max-w-3xl mb-6">
        Solda kurumun kendi veri merkezi (private), sağda sağlayıcının esnek havuzu
        (public). Hybrid bu ikisini güvenli bir tünelle birleştirir; community ise
        paylaşılan bir private&apos;tır.
      </Sub>
      <DeploymentModelDiagram />
    </SlideShell>
  ),

  /* ─────────────────  8 · BÖLÜM 2 · KARAR & MALİYET  ───────────────── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Karar ve Maliyet"
      subtitle="Hangi model ne zaman? Maliyet modeli, uyum baskısı ve büyük veri iş yükünün şekli kararı belirler."
      bgGradient="linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)"
      shadow="0 20px 60px -10px rgba(124, 58, 237, 0.6)"
      icon={<Scale className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  9 · NE ZAMAN HANGİSİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Karar rehberi</Eyebrow>
      <H2>Ne zaman hangi modeli seçersin?</H2>
      <Sub className="mt-3 max-w-3xl">
        Tek bir &ldquo;doğru&rdquo; model yok; ihtiyacın yapısına göre seçilir. Dört tipik
        durum:
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <FeatureCard
          icon={Globe}
          title="Public seç"
          desc="Değişken/öngörülemez trafik, hızlı başlangıç, sınırlı bütçe ve düşük uyum baskısı varsa. Çoğu büyük veri analitiği buradan başlar."
          delay={0.0}
          accent="#2563eb"
        />
        <FeatureCard
          icon={Lock}
          title="Private seç"
          desc="Veri yurt içinde/kurumda kalmak zorundaysa (KVKK, regülasyon), iş yükü sabit ve öngörülebilirse — uzun vadede CapEx amorti olabilir."
          delay={0.1}
          accent="#a855f7"
        />
        <FeatureCard
          icon={Workflow}
          title="Hybrid seç"
          desc="Hassas veri içeride kalsın ama hesaplama zirvelerinde public&apos;e taş (cloud bursting). Buluta kademeli geçişte de doğal yol."
          delay={0.2}
          accent="#22c55e"
        />
        <FeatureCard
          icon={Users}
          title="Community seç"
          desc="Aynı sektörden kurumlar ortak uyum/standart paylaşıyorsa (kamu, sağlık, üniversiteler) ve maliyeti bölüşmek mantıklıysa."
          delay={0.3}
          accent="#f59e0b"
        />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  10 · CAPEX vs OPEX  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Maliyet modeli</Eyebrow>
      <H2>CapEx vs OpEx — dağıtım modelinin parası</H2>
      <Sub className="mt-3 max-w-3xl">
        Public ağırlıklı OpEx (kullandıkça öde), private ağırlıklı CapEx (önden yatırım).
        Hybrid ikisini dengeler. Karar, sadece teknik değil finansal bir tercihtir.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bvbb-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#c084fc]">
            <Building2 className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Private · CapEx</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#c084fc] flex-shrink-0" />Sunucu/depolama önden satın alınır.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#c084fc] flex-shrink-0" />Sabit kapasite — zirvelerde yetmez, boşta israf.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#c084fc] flex-shrink-0" />Sabit yükte birim maliyet zamanla düşebilir.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="bvbb-card-sky rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#7dd3fc]">
            <Cloud className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Public · OpEx</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#7dd3fc] flex-shrink-0" />Saat/istek/GB başına faturalama.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#7dd3fc] flex-shrink-0" />Önden yatırım yok; talebe göre büyür/küçülür.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#7dd3fc] flex-shrink-0" />Yüksek ve sürekli yükte fatura kabarabilir.</li>
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 bvbb-card rounded-xl p-4 flex items-start gap-3"
      >
        <Lightbulb className="w-5 h-5 text-[#60a5fa] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-300">
          <span className="bvbb-token">Pratik</span> Kıyaslamayı &ldquo;3 yıllık toplam
          sahip olma maliyeti (TCO)&rdquo; üzerinden yap; sadece ilk yılın peşin bedeli
          yanıltıcıdır.
        </p>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  11 · BÜYÜK VERİYE ETKİSİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Dağıtım modeli · büyük veriye etkisi</Eyebrow>
      <H2>Model, veri mimarini nasıl şekillendirir?</H2>
      <Sub className="mt-3 max-w-3xl">
        Aynı Spark işi farklı dağıtım modellerinde farklı davranır. Petabayt ölçeğinde
        seçim, performans kadar veri yerelliği ve uyum demektir.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={Zap}
          title="Esnek küme (public)"
          desc="EMR/Dataproc ile yüzlerce düğümlü Spark kümesini dakikada aç, iş bitince kapat. Zirve yükü için ideal, boşta para yok."
          delay={0.0}
          accent="#2563eb"
        />
        <FeatureCard
          icon={HardDrive}
          title="Veri yerelliği (private)"
          desc="Veri kurum içinde kalır; düşük gecikme ve veri yerelliği. Yasal olarak dışarı çıkamayan veriler için çoğu zaman tek seçenek."
          delay={0.1}
          accent="#a855f7"
        />
        <FeatureCard
          icon={Network}
          title="Veri yerçekimi (hybrid)"
          desc="Veri büyüdükçe taşıması pahalılaşır (data gravity). Hassas veri içeride kalıp, hesaplamayı yanına çekmek hybrid&apos;in özüdür."
          delay={0.2}
          accent="#22c55e"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 text-[11px] text-gray-500 text-center"
      >
        <span className="bvbb-token">Dikkat</span> Public&apos;te en sinsi kalem çıkış
        (egress) ücretidir — büyük veriyi buluttan geri çekmek depolamaktan pahalı olabilir.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  12 · BÖLÜM 3 · UYGULAMA  ───────────────── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Uygulama: İş Yükünü Yerleştir"
      subtitle="Veri sınıfına göre hangi parçayı public&apos;e, hangisini private&apos;a koyarız? Hybrid bir mimariyi adım adım kuralım."
      bgGradient="linear-gradient(135deg, #0ea5e9 0%, #22d3ee 100%)"
      shadow="0 20px 60px -10px rgba(14, 165, 233, 0.6)"
      icon={<Workflow className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  13 · HYBRID TERMINAL  ───────────────── */
  () => (
    <SlideShell bgPattern={false}>
      <Eyebrow>Canlı · hybrid kurulum</Eyebrow>
      <H2 className="mb-2">Hassas veri içeride, hesaplama dışarıda</H2>
      <Sub className="max-w-3xl mb-6">
        Tipik bir hybrid akış: veri gölü public&apos;te, kişisel/hassas kayıtlar
        private&apos;ta, ikisi VPN tüneliyle bağlı. Komutlar gerçek araçlarla (AWS CLI,
        kubectl) örneklenmiştir.
      </Sub>
      <DeploymentTerminal />
    </SlideShell>
  ),

  /* ─────────────────  14 · İŞ YÜKÜ YERLEŞTİRME · MİNİ SENARYO  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı alıştırma</Eyebrow>
      <H2>Senaryo: bir hastanenin veri platformu</H2>
      <Sub className="mt-3 max-w-3xl">
        Her iş yükünü doğru kutuya yerleştir. Kuralı basit: hasta kimliği taşıyan veri
        private kalır; anonim/toplu analitik public&apos;e taşınabilir.
      </Sub>

      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            t: "Hasta kayıtları (kimlik + tanı)",
            model: "Private",
            color: "#a855f7",
            why: "Kişisel sağlık verisi — yasal olarak kurum içinde kalmalı.",
            icon: Lock,
          },
          {
            t: "Anonimleştirilmiş analitik & ML eğitimi",
            model: "Public",
            color: "#2563eb",
            why: "Kimlik içermez; esnek GPU kümesinde ucuza ve hızlı eğitilir.",
            icon: Globe,
          },
          {
            t: "Yedekleme & felaket kurtarma",
            model: "Hybrid",
            color: "#22c55e",
            why: "Birincil kopya içeride, şifreli ikinci kopya public&apos;te.",
            icon: Workflow,
          },
          {
            t: "Hastaneler arası ortak araştırma havuzu",
            model: "Community",
            color: "#f59e0b",
            why: "Birden çok hastane aynı uyum kurallarıyla paylaşır.",
            icon: Users,
          },
        ].map((item, i) => (
          <motion.div
            key={item.t}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="bvbb-card bvbb-card-hover rounded-xl p-5 flex items-start gap-4 transition-all"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${item.color}1f`, border: `1px solid ${item.color}55` }}
            >
              <item.icon className="w-5 h-5" style={{ color: item.color }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="text-sm font-semibold text-white">{item.t}</div>
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded flex-shrink-0"
                  style={{ background: `${item.color}1c`, color: item.color, border: `1px solid ${item.color}55` }}
                >
                  {item.model}
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{item.why}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-5 bvbb-card rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3"
      >
        <ListChecks className="w-4 h-4 text-[#60a5fa] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Ödev:</span> Kendi seçtiğin bir kurum (banka, okul,
          e-ticaret) için en az 4 iş yükü listele, her birini bir dağıtım modeline ata ve
          tek cümleyle gerekçelendir.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  15 · SIRADAKİ HAFTA + KAPANIŞ  ───────────────── */
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
          <GitBranch className="w-12 h-12 text-white" />
        </motion.div>

        <Eyebrow>4. hafta tamam · sıradaki: AWS &amp; Azure pratiği</Eyebrow>
        <H1>
          <span className="bvbb-shimmer-sky">Modelden Uygulamaya</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta &ldquo;nerede çalışsın?&rdquo; sorusunu yanıtladık. Hafta 5&apos;te seçtiğimiz
          public modeli sahaya indiriyoruz: bir bölge/zone seçimi, VPC ve ilk yönetilen
          servislerle elimizi kirletiyoruz.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-9 max-w-3xl mx-auto">
          <div className="bvbb-card rounded-xl p-5 text-left">
            <Target className="w-5 h-5 text-[#60a5fa] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Özet</div>
            <div className="text-white font-semibold">4 dağıtım modeli</div>
            <div className="text-sm text-gray-400">public · private · hybrid · community</div>
          </div>
          <div className="bvbb-card rounded-xl p-5 text-left">
            <Server className="w-5 h-5 text-[#a855f7] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">AWS Free Tier hesabı</div>
            <div className="text-sm text-gray-400">aktif ve giriş yapılmış olsun</div>
          </div>
          <div className="bvbb-card rounded-xl p-5 text-left">
            <Database className="w-5 h-5 text-[#22c55e] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">İş yükü yerleştirme</div>
            <div className="text-sm text-gray-400">4 yük + gerekçe</div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-9 text-xs font-mono text-gray-600 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>BVA 2103 · Büyük Veri İçin Bulut Bilişim · Güz 2026</span>
          <ArrowRight className="w-3.5 h-3.5" />
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
          BVA 2103 · 4. Hafta · Dağıtım Modelleri
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
