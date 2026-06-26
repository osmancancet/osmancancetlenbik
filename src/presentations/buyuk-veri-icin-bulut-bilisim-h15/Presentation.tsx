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
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Unlock,
  Key,
  KeyRound,
  Eye,
  EyeOff,
  UserCheck,
  Users,
  Database,
  HardDrive,
  Network,
  Globe,
  Terminal,
  FileWarning,
  AlertTriangle,
  Check,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Fingerprint,
  ScrollText,
  Building2,
  FlaskConical,
  Calendar,
  Target,
  Layers,
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

/* Paylaşılan sorumluluk modeli — sağlayıcı vs müşteri */
function SharedResponsibilityDiagram() {
  const layers = [
    { name: "Veri ve sınıflandırma", who: "customer" as const },
    { name: "Kimlik ve erişim yönetimi (IAM)", who: "customer" as const },
    { name: "Uygulama ve istemci tarafı şifreleme", who: "customer" as const },
    { name: "İşletim sistemi, ağ ve güvenlik duvarı yapılandırması", who: "mixed" as const },
    { name: "Sanallaştırma / hipervizör", who: "provider" as const },
    { name: "Fiziksel ana bilgisayar ve depolama", who: "provider" as const },
    { name: "Veri merkezi, bölge ve fiziksel güvenlik", who: "provider" as const },
  ];
  const palette = {
    customer: { bg: "#2563eb", label: "Müşteri" },
    provider: { bg: "#22c55e", label: "Sağlayıcı" },
    mixed: { bg: "#f59e0b", label: "Paylaşılan" },
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bvbb-card rounded-xl p-6"
    >
      <div className="flex items-center gap-4 mb-5 text-[11px] font-mono">
        {(["customer", "mixed", "provider"] as const).map((k) => (
          <span key={k} className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-sm"
              style={{ background: palette[k].bg }}
            />
            <span className="text-gray-300">{palette[k].label}</span>
          </span>
        ))}
        <span className="ml-auto text-gray-500 uppercase tracking-widest">
          IN / OF the cloud
        </span>
      </div>
      <div className="space-y-2">
        {layers.map((l, i) => {
          const p = palette[l.who];
          return (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.07 }}
              className="rounded-lg px-4 py-2.5 flex items-center justify-between"
              style={{ background: `${p.bg}14`, border: `1px solid ${p.bg}45` }}
            >
              <span className="text-sm text-gray-200">{l.name}</span>
              <span
                className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded"
                style={{ background: `${p.bg}26`, color: p.bg }}
              >
                {p.label}
              </span>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-4 text-[11px] text-gray-500">
        <span className="bvbb-token">Kural</span> Sağlayıcı <em>bulutun</em>{" "}
        güvenliğinden, müşteri <em>buluttaki</em> verinin güvenliğinden
        sorumludur. IaaS&apos;te müşteri payı artar, SaaS&apos;te azalır.
      </div>
    </motion.div>
  );
}

/* AWS IAM policy JSON mockup (least privilege) */
function IamPolicyMock() {
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
          <KeyRound className="w-3 h-3" />
          <span>iam-policy · s3-read-only-veriseti.json</span>
        </div>
      </div>
      <div className="bvbb-terminal">
        <div>
          <span className="bvbb-json-num">{"{"}</span>
        </div>
        <div>{"  "}<span className="bvbb-json-key">&quot;Version&quot;</span>: <span className="bvbb-json-str">&quot;2012-10-17&quot;</span>,</div>
        <div>{"  "}<span className="bvbb-json-key">&quot;Statement&quot;</span>: [</div>
        <div>{"    "}<span className="bvbb-json-num">{"{"}</span></div>
        <div>{"      "}<span className="bvbb-json-key">&quot;Sid&quot;</span>: <span className="bvbb-json-str">&quot;SadeceOkumaErisimi&quot;</span>,</div>
        <div>{"      "}<span className="bvbb-json-key">&quot;Effect&quot;</span>: <span className="bvbb-json-allow">&quot;Allow&quot;</span>,</div>
        <div>{"      "}<span className="bvbb-json-key">&quot;Action&quot;</span>: [<span className="bvbb-json-str">&quot;s3:GetObject&quot;</span>, <span className="bvbb-json-str">&quot;s3:ListBucket&quot;</span>],</div>
        <div>{"      "}<span className="bvbb-json-key">&quot;Resource&quot;</span>: [</div>
        <div>{"        "}<span className="bvbb-json-str">&quot;arn:aws:s3:::mcbu-veriseti&quot;</span>,</div>
        <div>{"        "}<span className="bvbb-json-str">&quot;arn:aws:s3:::mcbu-veriseti/*&quot;</span></div>
        <div>{"      "}],</div>
        <div>{"      "}<span className="bvbb-json-key">&quot;Condition&quot;</span>: {"{"}</div>
        <div>{"        "}<span className="bvbb-json-key">&quot;Bool&quot;</span>: {"{"} <span className="bvbb-json-str">&quot;aws:SecureTransport&quot;</span>: <span className="bvbb-json-str">&quot;true&quot;</span> {"}"}</div>
        <div>{"      "}{"}"}</div>
        <div>{"    "}<span className="bvbb-json-num">{"}"}</span></div>
        <div>{"  "}]</div>
        <div>
          <span className="bvbb-json-num">{"}"}</span>
        </div>
      </div>
      <div className="px-4 py-3 text-[11px] text-gray-400 border-t border-white/5 flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-[#22c55e] mt-0.5 flex-shrink-0" />
        <span>
          En az yetki: yalnızca tek bir bucket&apos;ta okuma izni; üstelik{" "}
          <span className="text-[#67e8f9] font-mono">aws:SecureTransport</span>{" "}
          koşuluyla yalnızca HTTPS üzerinden. <span className="text-white">*</span>{" "}
          (her şeye izin) yerine her zaman dar kapsam yazılır.
        </span>
      </div>
    </motion.div>
  );
}

/* Şifreleme: at-rest vs in-transit terminal mockup */
function EncryptionTerminalMock() {
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
          style={{ background: "#0d1117", color: "#67e8f9" }}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>ocet@cloud:~ — aws s3 + kms</span>
        </div>
      </div>
      <div className="bvbb-terminal">
        <div>
          <span className="bvbb-term-prompt">ocet@cloud</span>
          <span className="bvbb-term-dim">:~$</span>{" "}
          <span className="bvbb-term-cmd">aws s3 cp veriseti.parquet s3://mcbu-veriseti/ \</span>
        </div>
        <div>
          {"    "}
          <span className="bvbb-term-cmd">--sse aws:kms --sse-kms-key-id alias/veri-anahtari</span>
        </div>
        <div className="bvbb-term-ok">upload: ./veriseti.parquet → s3://mcbu-veriseti/veriseti.parquet</div>
        <div className="bvbb-term-dim">ServerSideEncryption: aws:kms (durağan veri şifreli — AES-256)</div>
        <div className="mt-2">
          <span className="bvbb-term-prompt">ocet@cloud</span>
          <span className="bvbb-term-dim">:~$</span>{" "}
          <span className="bvbb-term-cmd">curl -svo /dev/null https://mcbu-veriseti.s3.eu-central-1.amazonaws.com/ 2&gt;&amp;1 | grep TLS</span>
        </div>
        <div className="bvbb-term-ok">* SSL connection using TLSv1.3 / TLS_AES_256_GCM_SHA384</div>
        <div className="bvbb-term-dim">(aktarımdaki veri şifreli — TLS 1.3)</div>
        <div className="mt-2">
          <span className="bvbb-term-prompt">ocet@cloud</span>
          <span className="bvbb-term-dim">:~$</span>{" "}
          <span className="bvbb-term-cmd">aws s3api get-public-access-block --bucket mcbu-veriseti</span>
        </div>
        <div className="bvbb-term-warn">&quot;BlockPublicAcls&quot;: true, &quot;IgnorePublicAcls&quot;: true,</div>
        <div className="bvbb-term-warn">&quot;BlockPublicPolicy&quot;: true, &quot;RestrictPublicBuckets&quot;: true</div>
        <div className="bvbb-term-dim">(bucket herkese açık değil — sızıntıların 1 numaralı sebebi kapatıldı)</div>
        <div className="mt-2">
          <span className="bvbb-term-prompt">ocet@cloud</span>
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
        <Eyebrow>BVA 2103 · 15. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="bvbb-shimmer">Bulut Bilişimde</span>
          <br />
          <span className="text-white">Güvenlik &amp; Gizlilik</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Veri bulutta yaşıyor; peki onu kim, neye karşı, nasıl koruyor? Paylaşılan
          sorumluluktan şifrelemeye, IAM&apos;den KVKK/GDPR&apos;a güvenliğin
          temelleri.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {[
            { name: "Erişim", tag: "IAM · MFA · least privilege", color: "#2563eb", icon: Key },
            { name: "Şifreleme", tag: "at-rest · in-transit · KMS", color: "#22c55e", icon: Lock },
            { name: "Uyumluluk", tag: "KVKK · GDPR · ISO 27001", color: "#a855f7", icon: ScrollText },
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
      <Eyebrow>Köprü · 14. haftadan 15. haftaya</Eyebrow>
      <H2>Önce veriyi taşıdık ve işledik; şimdi onu koruyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Dönem boyunca veriyi buluta taşıdık, HDFS&apos;te tuttuk, Spark ile işledik
        ve ML modelleri kurduk. Tüm bu yığını bir arada tutan tek bir soru kaldı:
        bu veri ve hizmetler nasıl güvende kalacak?
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
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#2563eb] flex-shrink-0" />Veriyi S3/HDFS üzerinde depoladık.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#2563eb] flex-shrink-0" />Spark/MapReduce ile dağıtık işledik.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#2563eb] flex-shrink-0" />Bulutta model eğittik ve dağıttık.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="bvbb-card-warn rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#f87171]">
            <ShieldAlert className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu hafta cevaplayacağımız</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Bu veriye kim, hangi yetkiyle erişebilmeli?</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Çalınırsa okunabilir mi (şifreli mi)?</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Kişisel veriyse hangi yasalar geçerli?</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3 · DERSİN AKIŞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: sorumluluk → koruma → uyumluluk</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce kimin neyden sorumlu olduğunu netleştiriyoruz; sonra erişim ve
        şifreleme ile veriyi teknik olarak koruyoruz; en son yasal/gizlilik
        çerçevesine bakıyoruz. Sonunda küçük bir uygulamalı sertleştirme görevi.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Tehdit & Sorumluluk", items: ["Bulut tehdit yüzeyi", "Paylaşılan sorumluluk modeli", "CIA üçlüsü bulutta"], icon: Shield, accent: "#2563eb" },
          { range: "02", title: "Erişim & Şifreleme", items: ["IAM, MFA, least privilege", "At-rest / in-transit şifreleme", "Anahtar yönetimi (KMS)"], icon: Lock, accent: "#22c55e" },
          { range: "03", title: "Gizlilik & Uyumluluk", items: ["KVKK · GDPR", "Veri yerleşimi (residency)", "ISO 27001 · denetim/loglama"], icon: ScrollText, accent: "#a855f7" },
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
      title="Tehdit ve Sorumluluk"
      subtitle="Bulutta hangi varlıklar risk altında, kim neyden sorumlu? Önce zemini netleştiriyoruz."
      bgGradient="linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)"
      shadow="0 20px 60px -10px rgba(37, 99, 235, 0.6)"
      icon={<Shield className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  5 · CIA ÜÇLÜSÜ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Güvenliğin temel ekseni</Eyebrow>
      <H2>CIA üçlüsü — bulutta da geçerli</H2>
      <Sub className="mt-3 max-w-3xl">
        Her güvenlik kararı bu üç hedeften en az birine hizmet eder. Bulutta hedef
        aynı, sadece sorumluluk paylaşılır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={EyeOff}
          title="Gizlilik (Confidentiality)"
          desc="Veriye yalnızca yetkili kişiler erişsin. Araçlar: şifreleme, IAM, en az yetki, ağ izolasyonu (VPC)."
          delay={0.0}
          accent="#2563eb"
        />
        <FeatureCard
          icon={Fingerprint}
          title="Bütünlük (Integrity)"
          desc="Veri izinsiz değiştirilmesin. Araçlar: hash/checksum, sürümleme (S3 versioning), imzalı loglar."
          delay={0.1}
          accent="#22c55e"
        />
        <FeatureCard
          icon={Network}
          title="Erişilebilirlik (Availability)"
          desc="Hizmet ihtiyaç anında ayakta olsun. Araçlar: çoklu AZ, yedekleme, DDoS koruması, otomatik ölçek."
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
        <Layers className="w-5 h-5 text-[#60a5fa] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-300">
          <span className="bvbb-token">Denge</span> Üç hedef çoğu zaman birbiriyle
          gerilir: aşırı kısıtlama erişilebilirliği düşürür, aşırı açıklık gizliliği
          bozar. Güvenlik = bu dengeyi riske göre ayarlamaktır.
        </p>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  6 · TEHDİT YÜZEYİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bulut tehdit yüzeyi</Eyebrow>
      <H2>En sık karşılaşılan bulut riskleri</H2>
      <Sub className="mt-3 max-w-3xl">
        Bulut ihlallerinin büyük çoğunluğu sıfır-gün açığından değil,{" "}
        <span className="text-white">yanlış yapılandırmadan</span> kaynaklanır —
        yani önlenebilir hatalardan.
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
              <th style={{ width: "26%" }}>Risk</th>
              <th style={{ width: "40%" }}>Tipik örnek</th>
              <th>Temel önlem</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                k: "Yanlış yapılandırma",
                e: "Herkese açık (public) S3 bucket; açık güvenlik grubu (0.0.0.0/0)",
                m: "Block Public Access · IaC taraması · varsayılan kapalı",
              },
              {
                k: "Sızdırılmış kimlik bilgisi",
                e: "Koda gömülü access key, GitHub&apos;a push edilen .env",
                m: "Gizli yöneticisi (Secrets Manager) · kısa ömürlü rol · MFA",
              },
              {
                k: "Aşırı geniş yetki",
                e: "Her kullanıcıya Administrator / s3:* verilmesi",
                m: "En az yetki ilkesi · rol bazlı erişim (RBAC)",
              },
              {
                k: "Şifresiz veri",
                e: "Durağan veya aktarımdaki verinin açık metin tutulması",
                m: "At-rest (KMS) + in-transit (TLS) zorunlu kılma",
              },
              {
                k: "İzleme eksikliği",
                e: "Loglama kapalı; ihlal aylar sonra fark edilir",
                m: "CloudTrail/denetim logları · alarm · merkezi SIEM",
              },
            ].map((row, i) => (
              <motion.tr
                key={row.k}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <td className="font-medium text-white">{row.k}</td>
                <td className="text-gray-400" dangerouslySetInnerHTML={{ __html: row.e }} />
                <td className="text-[#93c5fd]">{row.m}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  7 · PAYLAŞILAN SORUMLULUK  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Paylaşılan sorumluluk modeli</Eyebrow>
      <H2 className="mb-2">&quot;Bulut güvende&quot; demek &quot;sen güvendesin&quot; demek değil</H2>
      <Sub className="max-w-3xl mb-6">
        Sağlayıcı altyapıyı korur; ama yapılandırma, erişim ve verinin kendisi sana
        aittir. İhlallerin çoğu müşteri tarafındaki bu katmanlarda olur.
      </Sub>
      <SharedResponsibilityDiagram />
    </SlideShell>
  ),

  /* ─────────────────  8 · BÖLÜM 2  ───────────────── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Erişim ve Şifreleme"
      subtitle="Kim girer, ne okur? Veriyi hem erişim kontrolüyle hem de şifreleme ile iki kat koruyoruz."
      bgGradient="linear-gradient(135deg, #16a34a 0%, #22c55e 100%)"
      shadow="0 20px 60px -10px rgba(34, 197, 94, 0.55)"
      icon={<Lock className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  9 · IAM TEMELLERİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kimlik &amp; erişim yönetimi · IAM</Eyebrow>
      <H2>Doğru kişi, doğru kaynak, doğru izin</H2>
      <Sub className="mt-3 max-w-3xl">
        IAM dört kavram üzerine kuruludur. Hepsinin ortak ilkesi:{" "}
        <span className="text-white">varsayılan reddet, gerektiği kadarını aç.</span>
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <FeatureCard
          icon={UserCheck}
          title="Kullanıcı &amp; Grup"
          desc="Gerçek kişi/uygulama kimlikleri; ortak ihtiyaçlar gruplarda toplanır, izin gruba bir kez verilir."
          delay={0.0}
          accent="#2563eb"
        />
        <FeatureCard
          icon={Users}
          title="Rol (Role)"
          desc="Kalıcı anahtar yerine kısa ömürlü, devredilebilir kimlik. EC2/Lambda kaynakları rolle yetkilenir."
          delay={0.1}
          accent="#22c55e"
        />
        <FeatureCard
          icon={ScrollText}
          title="Politika (Policy)"
          desc="JSON ile yazılı izin kuralı: Effect (Allow/Deny), Action, Resource, Condition. En özgül olan kazanır."
          delay={0.2}
          accent="#a855f7"
        />
        <FeatureCard
          icon={Fingerprint}
          title="MFA"
          desc="Parola + ikinci faktör (TOTP/donanım anahtarı). Çalınan parolayı tek başına işe yaramaz hale getirir."
          delay={0.3}
          accent="#f59e0b"
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-5 text-[11px] text-gray-500 text-center"
      >
        <span className="bvbb-token">İlke</span> Least Privilege — bir kimliğe
        görevini yapması için <em>gereken en az</em> yetki verilir, fazlası değil.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  10 · IAM POLICY JSON  ───────────────── */
  () => (
    <SlideShell bgPattern={false}>
      <Eyebrow>Örnek · en az yetki politikası</Eyebrow>
      <H2 className="mb-2">Bir IAM politikası neye benzer?</H2>
      <Sub className="max-w-3xl mb-6">
        Aşağıdaki politika, bir kullanıcıya tek bir bucket&apos;ta yalnızca okuma
        izni verir — hem kaynağı hem de yöntemi (HTTPS) sıkı kapsar.
      </Sub>
      <IamPolicyMock />
    </SlideShell>
  ),

  /* ─────────────────  11 · ŞİFRELEME · AT-REST vs IN-TRANSIT  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Şifreleme · iki hâl</Eyebrow>
      <H2>Durağan veri vs aktarımdaki veri</H2>
      <Sub className="mt-3 max-w-3xl">
        Veri ya bir diskte durur ya da ağ üzerinde akar. İkisi farklı tehditlere
        açıktır ve farklı şekilde şifrelenir — ikisi de gereklidir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bvbb-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#60a5fa]">
            <HardDrive className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">At-rest · durağan</span>
          </div>
          <p className="text-sm text-gray-300 mb-3">
            Disk veya nesne deposundaki veri. Tehdit: disk/snapshot çalınması,
            yetkisiz kopya.
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Algoritma: genelde AES-256.</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />S3 SSE-KMS, EBS şifreleme, RDS encryption.</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Anahtar bulut KMS&apos;te tutulur ve rotate edilir.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="bvbb-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#34d399]">
            <Globe className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">In-transit · aktarımdaki</span>
          </div>
          <p className="text-sm text-gray-300 mb-3">
            Ağ üzerinde akan veri (istemci↔bulut, hizmet↔hizmet). Tehdit: pasif
            dinleme, ortadaki adam (MITM).
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Protokol: TLS 1.2/1.3 (HTTPS).</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Sertifikalar (ACM), HSTS, modern şifre takımları.</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#22c55e] flex-shrink-0" />Politikayla zorla: yalnızca SecureTransport.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  12 · ŞİFRELEME TERMİNALİ  ───────────────── */
  () => (
    <SlideShell bgPattern={false}>
      <Eyebrow>Canlı çıktı · şifreleme &amp; sertleştirme</Eyebrow>
      <H2 className="mb-2">Komut satırında üç temel koruma</H2>
      <Sub className="max-w-3xl mb-6">
        Verinin durağanken (KMS) ve aktarılırken (TLS) şifreli olması, bucket&apos;ın
        ise herkese kapalı olması — üçü bir aradayken &quot;güvenli temel&quot; sağlanır.
      </Sub>
      <EncryptionTerminalMock />
    </SlideShell>
  ),

  /* ─────────────────  13 · BÖLÜM 3  ───────────────── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Gizlilik ve Uyumluluk"
      subtitle="Teknik koruma yetmez; kişisel veride hangi yasa, hangi sorumluluk ve hangi denetim geçerli?"
      bgGradient="linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)"
      shadow="0 20px 60px -10px rgba(124, 58, 237, 0.6)"
      icon={<ScrollText className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  14 · KVKK vs GDPR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kişisel veri · yasal çerçeve</Eyebrow>
      <H2>KVKK ve GDPR — temel ilkeler</H2>
      <Sub className="mt-3 max-w-3xl">
        Büyük veri çoğu zaman kişisel veri içerir. Türkiye&apos;de KVKK (6698),
        AB&apos;de GDPR bu veriyi düzenler; ikisi de büyük ölçüde örtüşür.
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
              <th style={{ width: "26%" }}>Konu</th>
              <th style={{ width: "37%" }}>KVKK (Türkiye · 6698)</th>
              <th>GDPR (AB · 2016/679)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">İşleme şartı</td>
              <td>Açık rıza veya kanuni sebep</td>
              <td>Rıza, sözleşme, meşru menfaat vb.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">İlgili kişi hakları</td>
              <td>Bilgi, düzeltme, silme, itiraz</td>
              <td>Erişim, taşınabilirlik, unutulma hakkı</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Yurt dışına aktarım</td>
              <td>Yeterli koruma / taahhütname şartı</td>
              <td>Yeterlilik kararı / SCC gerekir</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">İhlal bildirimi</td>
              <td>Kurula en kısa sürede bildirim</td>
              <td>72 saat içinde denetim otoritesine</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Denetim otoritesi</td>
              <td>KVKK Kurumu (KVKK / Kurul)</td>
              <td>İlgili ülkenin Veri Koruma Otoritesi</td>
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
        <span className="bvbb-token">Not</span> İdari para cezaları yüksektir;
        yine de asıl maliyet itibar kaybı ve güven erozyonudur. Tablo özet amaçlıdır,
        yasal danışmanlık yerine geçmez.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  15 · VERİ YERLEŞİMİ & GİZLİLİK TEKNİKLERİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Gizliliği teknikle desteklemek</Eyebrow>
      <H2>Veri yerleşimi ve gizlilik teknikleri</H2>
      <Sub className="mt-3 max-w-3xl">
        Uyumluluk yalnızca belge işi değildir; mimaride somut karşılığı vardır. Üç
        anahtar pratik:
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={Building2}
          title="Veri yerleşimi (residency)"
          desc="Bölge (region) seçimiyle verinin hangi ülkede tutulacağını belirle. Kişisel veri için yerel/AB bölgesi tercih edilir."
          delay={0.0}
          accent="#2563eb"
        />
        <FeatureCard
          icon={EyeOff}
          title="Maskeleme &amp; anonimleştirme"
          desc="Analiz için kimlik gerekmiyorsa kaldır: anonimleştirme (geri döndürülemez) veya takma adlaştırma (pseudonymisation)."
          delay={0.1}
          accent="#22c55e"
        />
        <FeatureCard
          icon={Eye}
          title="Veri minimizasyonu"
          desc="Yalnızca amaç için gereken veriyi topla ve sakla. Toplamadığın veri sızdırılamaz; en güvenli veri var olmayandır."
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
        <FileWarning className="w-5 h-5 text-[#f59e0b] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-300">
          <span className="bvbb-token">Dikkat</span> &quot;Anonim&quot; sandığımız
          veri, başka kümelerle birleştirilince yeniden kimliklendirilebilir
          (re-identification). Gerçek anonimleştirme zordur; şüphedeyse kişisel veri
          gibi davran.
        </p>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  16 · GÜVENLİK KONTROLLERİ ÖZETİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Katmanlı savunma · özet</Eyebrow>
      <H2>Bir bulut iş yükünü sertleştiren kontroller</H2>
      <Sub className="mt-3 max-w-3xl">
        Tek bir önlem yeterli değildir; katmanlar üst üste binince bir katmanın
        aşılması felakete dönüşmez (defense in depth).
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Key, t: "Kimlik", d: "MFA zorunlu, kök hesabı kilitli, kısa ömürlü roller, least privilege.", c: "#2563eb" },
          { icon: Lock, t: "Şifreleme", d: "At-rest (KMS) + in-transit (TLS) her yerde; anahtar rotasyonu açık.", c: "#22c55e" },
          { icon: Network, t: "Ağ", d: "VPC izolasyonu, özel alt ağlar, güvenlik grupları dar, public erişim kapalı.", c: "#a855f7" },
          { icon: ScrollText, t: "İzleme", d: "Denetim logları (CloudTrail), alarmlar, merkezi log, düzenli yapılandırma taraması.", c: "#f59e0b" },
        ].map((it, i) => (
          <motion.div
            key={it.t}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="bvbb-card bvbb-card-hover rounded-xl p-5 flex items-start gap-4"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${it.c}18`, border: `1px solid ${it.c}55` }}
            >
              <it.icon className="w-5 h-5" style={{ color: it.c }} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white mb-1">{it.t}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{it.d}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  17 · UYGULAMALI GÖREV  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı sertleştirme</Eyebrow>
      <H2>Kendi bucket&apos;ını dört adımda güvenli hâle getir</H2>
      <Sub className="mt-3 max-w-3xl">
        1. haftada açtığın S3 bucket ve hesabın üzerinde çalış. Sonraki derse bu
        dördünü yapmış ve ekran görüntüsünü almış gelmen bekleniyor.
      </Sub>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            n: 1,
            t: "Kök hesaba MFA ekle",
            d: "IAM → kök kullanıcı için TOTP (Authenticator) etkinleştir; günlük iş için ayrı IAM kullanıcısı kullan.",
            icon: Fingerprint,
            color: "#2563eb",
          },
          {
            n: 2,
            t: "Block Public Access&apos;i doğrula",
            d: "S3 bucket → Permissions → dört seçeneğin de açık (engelli) olduğunu kontrol et.",
            icon: ShieldCheck,
            color: "#22c55e",
          },
          {
            n: 3,
            t: "Şifrelemeyi aç",
            d: "Default encryption olarak SSE-KMS seç; bir dosya yükleyip ServerSideEncryption alanını gör.",
            icon: Lock,
            color: "#a855f7",
          },
          {
            n: 4,
            t: "En az yetki politikası yaz",
            d: "Tek bucket&apos;a sadece s3:GetObject veren bir IAM politikası oluştur; Administrator vermekten kaçın.",
            icon: KeyRound,
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
        className="mt-5 bvbb-card-warn rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl mx-auto"
      >
        <AlertTriangle className="w-4 h-4 text-[#f87171] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Yalnızca kendi hesabında.</span> Erişim
          anahtarlarını asla kodla birlikte paylaşma; iş bitince gereksiz
          kullanıcı/anahtarı sil ve faturalama uyarısının açık olduğundan emin ol.
        </span>
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
          <ShieldCheck className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>15. hafta tamamlandı · sıradaki: Final &amp; proje</Eyebrow>
        <H1>
          <span className="bvbb-shimmer">Güvenli buluta hazırız</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Erişimi sınırladık, veriyi şifreledik, gizliliği yasal çerçeveye oturttuk.
          Önümüzdeki hafta dönem projelerini bu güvenlik kontrolleriyle birlikte
          sunacak ve genel tekrar yapacağız.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="bvbb-card rounded-xl p-5">
            <Calendar className="w-5 h-5 text-[#60a5fa] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Ders saati</div>
            <div className="text-white font-semibold">Çarşamba</div>
            <div className="text-sm text-gray-400">09:55 — 12:30 · Derslik 7</div>
          </div>
          <div className="bvbb-card rounded-xl p-5">
            <Target className="w-5 h-5 text-[#a855f7] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">Proje + güvenlik</div>
            <div className="text-sm text-gray-400">MFA · şifreleme · IAM uygula</div>
          </div>
          <div className="bvbb-card rounded-xl p-5">
            <FlaskConical className="w-5 h-5 text-[#22c55e] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">Sertleştirme raporu</div>
            <div className="text-sm text-gray-400">4 adım + ekran görüntüsü</div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-10 text-[11px] font-mono text-gray-600 flex items-center justify-center gap-2"
        >
          <Unlock className="w-3.5 h-3.5" />
          <span>BVA 2103 · Büyük Veri İçin Bulut Bilişim · Güz 2026</span>
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
          BVA 2103 · 15. Hafta · Güvenlik &amp; Gizlilik
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
