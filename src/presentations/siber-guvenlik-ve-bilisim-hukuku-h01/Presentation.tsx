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
  Lock,
  Key,
  KeyRound,
  Scale,
  Eye,
  EyeOff,
  BookOpen,
  Briefcase,
  Globe,
  Users,
  Brain,
  Target,
  Lightbulb,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  X,
  Sparkles,
  Zap,
  Hash,
  Calendar,
  Search,
  Database,
  Server,
  Mail,
  Skull,
  Fingerprint,
  FileLock,
  DollarSign,
  Clock,
  XCircle,
  Gavel,
  Network,
  Bug,
  Cpu,
  Wifi,
  Crosshair,
  Code,
  HardDrive,
  GitFork,
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
        <div className="absolute inset-0 sgbh-grid-bg pointer-events-none" />
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
      className="inline-flex items-center gap-3 mb-6 text-xs font-mono uppercase tracking-[0.25em] text-[#06b6d4]"
    >
      <span className="w-8 h-px bg-[#06b6d4]" />
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
  accent = "#06b6d4",
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
      className="sgbh-card sgbh-card-hover rounded-xl p-6 transition-all"
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
        style={{
          background: `${accent}15`,
          border: `1px solid ${accent}40`,
        }}
      >
        <Icon className="w-6 h-6" style={{ color: accent }} />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
  source,
  delay = 0,
  accent = "#06b6d4",
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  source?: string;
  delay?: number;
  accent?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className="sgbh-card rounded-xl p-5"
    >
      <Icon className="w-6 h-6 mb-3" style={{ color: accent }} />
      <div className="text-3xl md:text-4xl font-bold text-white">{value}</div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
      {source && (
        <div className="text-[9px] text-gray-600 mt-2 font-mono">{source}</div>
      )}
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
          className="inline-flex w-32 h-32 rounded-3xl items-center justify-center mb-8 sgbh-pulse"
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
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="sgbh-window-chrome w-full"
    >
      <div className="sgbh-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-mono flex-1 max-w-md mx-auto text-center justify-center"
          style={{ background: "#0d0d0d", color: "#67e8f9" }}
        >
          <span className="w-5 h-5 rounded-sm flex items-center justify-center text-[11px]" style={{ background: "linear-gradient(135deg,#06b6d4,#0891b2)", color: "white" }}>$_</span>
          <span>{title}</span>
        </div>
      </div>
      <div className="sgbh-terminal">{children}</div>
    </motion.div>
  );
}

function CIATriangle() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-2xl mx-auto"
    >
      <svg
        viewBox="0 0 600 540"
        className="w-full h-auto"
      >
        <defs>
          <linearGradient id="ciaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
          <radialGradient id="ciaCenter" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="rgba(6,182,212,0.35)" />
            <stop offset="100%" stopColor="rgba(6,182,212,0)" />
          </radialGradient>
        </defs>
        {/* Glow background */}
        <circle cx="300" cy="320" r="200" fill="url(#ciaCenter)" />
        {/* Triangle */}
        <motion.polygon
          points="300,60 540,470 60,470"
          fill="rgba(6,182,212,0.05)"
          stroke="url(#ciaGrad)"
          strokeWidth="3"
          className="sgbh-cia-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        {/* Center label */}
        <text
          x="300"
          y="310"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="22"
          fontWeight="600"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          Bilgi Güvenliği
        </text>
        <text
          x="300"
          y="338"
          textAnchor="middle"
          fill="#67e8f9"
          fontSize="11"
          fontFamily="ui-monospace, Menlo, monospace"
          letterSpacing="4"
        >
          INFORMATION SECURITY
        </text>

        {/* Vertex C */}
        <motion.g
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <circle cx="300" cy="60" r="36" fill="#0a0a0a" stroke="#06b6d4" strokeWidth="2.5" className="sgbh-cia-vertex" />
          <text x="300" y="70" textAnchor="middle" fill="#67e8f9" fontSize="32" fontWeight="700">C</text>
          <text x="300" y="20" textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="600">Confidentiality</text>
          <text x="300" y="38" textAnchor="middle" fill="#9ca3af" fontSize="12">Gizlilik</text>
        </motion.g>

        {/* Vertex I */}
        <motion.g
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <circle cx="540" cy="470" r="36" fill="#0a0a0a" stroke="#06b6d4" strokeWidth="2.5" className="sgbh-cia-vertex" />
          <text x="540" y="480" textAnchor="middle" fill="#67e8f9" fontSize="32" fontWeight="700">I</text>
          <text x="540" y="520" textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="600">Integrity</text>
          <text x="540" y="538" textAnchor="middle" fill="#9ca3af" fontSize="12">Bütünlük</text>
        </motion.g>

        {/* Vertex A */}
        <motion.g
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <circle cx="60" cy="470" r="36" fill="#0a0a0a" stroke="#06b6d4" strokeWidth="2.5" className="sgbh-cia-vertex" />
          <text x="60" y="480" textAnchor="middle" fill="#67e8f9" fontSize="32" fontWeight="700">A</text>
          <text x="60" y="520" textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="600">Availability</text>
          <text x="60" y="538" textAnchor="middle" fill="#9ca3af" fontSize="12">Erişilebilirlik</text>
        </motion.g>
      </svg>
    </motion.div>
  );
}

function PhishingMail() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="sgbh-window-chrome w-full max-w-3xl mx-auto"
    >
      <div className="sgbh-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] flex-1 max-w-md mx-auto text-center justify-center font-mono"
          style={{ background: "#0d0d0d", color: "#67e8f9" }}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Gelen Kutusu — 1 yeni e-posta</span>
        </div>
      </div>
      <div className="sgbh-mail">
        <div className="sgbh-mail-headerrow">
          <div className="flex items-baseline">
            <span className="text-gray-500 w-20">Kimden:</span>
            <span className="text-gray-900 font-medium">Manlsabank Destek &lt;destek@manlsabank.com&gt;</span>
            <span className="sgbh-mail-flag">typo · I yerine L</span>
          </div>
          <div className="flex items-baseline mt-1">
            <span className="text-gray-500 w-20">Kime:</span>
            <span className="text-gray-900">siz@kurumsal.tr</span>
          </div>
          <div className="flex items-baseline mt-1">
            <span className="text-gray-500 w-20">Konu:</span>
            <span className="text-gray-900 font-semibold">Hesabınız KILITLENDI — 24 saat içinde doğrulayın</span>
            <span className="sgbh-mail-flag">aciliyet baskısı</span>
          </div>
          <div className="flex items-baseline mt-1">
            <span className="text-gray-500 w-20">Tarih:</span>
            <span className="text-gray-700">25 Haziran 2026, 03:47 (gece)</span>
            <span className="sgbh-mail-flag">tuhaf saat</span>
          </div>
        </div>
        <div className="px-6 py-5 text-sm leading-relaxed text-gray-800">
          <p className="mb-3">Sayın <span className="bg-yellow-100">müşteriimiz</span>,<span className="sgbh-mail-flag">yazım hatası</span></p>
          <p className="mb-3">
            Hesabınızda olağan dışı bir giriş tespit edilmiştir. Güvenliğiniz için hesabınız <strong>geçici olarak kilitlenmiştir</strong>. Hesabınızı tekrar aktif etmek için aşağıdaki linke tıklayarak T.C. kimlik numaranız ve şifrenizi doğrulayın:
          </p>
          <p className="mb-3">
            <a className="sgbh-mail-link">https://manlsabank-guvenlik.tr-login.xyz/dogrula?ref=8821</a>
            <span className="sgbh-mail-flag">sahte alan adı</span>
          </p>
          <p className="mb-3 text-red-700 font-semibold">
            UYARI: 24 saat içinde doğrulama yapılmazsa hesabınız KALICI olarak kapatılacaktır.
            <span className="sgbh-mail-flag">korkutma</span>
          </p>
          <p className="text-xs text-gray-500 mt-4 border-t pt-3">
            Manlsabank Müşteri Hizmetleri · Bu otomatik bir mesajdır, lütfen yanıtlamayınız.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function TerminalNmap() {
  return (
    <TerminalWindow title="kali@pentest:~ — nmap">
      <div>
        <span className="sgbh-term-prompt">kali@pentest</span>
        <span className="sgbh-term-dim">:~$</span>{" "}
        <span className="sgbh-term-cmd">nmap -sV -p- target.example.com</span>
      </div>
      <div className="sgbh-term-dim">Starting Nmap 7.94 ( https://nmap.org )</div>
      <div className="sgbh-term-dim">Nmap scan report for target.example.com (<span className="sgbh-term-ip">203.0.113.42</span>)</div>
      <div className="sgbh-term-dim">Host is up (0.022s latency).</div>
      <div className="sgbh-term-dim">Not shown: 65530 closed tcp ports</div>
      <div className="mt-1">
        <span className="sgbh-term-warn">PORT      STATE  SERVICE  VERSION</span>
      </div>
      <div>
        <span className="sgbh-term-ok">22/tcp    open   ssh</span>{" "}
        <span className="sgbh-term-dim">OpenSSH 7.4 (protocol 2.0)</span>
      </div>
      <div>
        <span className="sgbh-term-ok">80/tcp    open   http</span>{" "}
        <span className="sgbh-term-dim">Apache httpd 2.4.6</span>
      </div>
      <div>
        <span className="sgbh-term-ok">443/tcp   open   https</span>{" "}
        <span className="sgbh-term-dim">Apache httpd 2.4.6 (SSL/TLS)</span>
      </div>
      <div>
        <span className="sgbh-term-err">3306/tcp  open   mysql</span>{" "}
        <span className="sgbh-term-err">MySQL 5.5.60 (eski sürüm — CVE riski!)</span>
      </div>
      <div>
        <span className="sgbh-term-err">21/tcp    open   ftp</span>{" "}
        <span className="sgbh-term-err">vsftpd 2.3.4 (BACKDOOR bilinen sürüm)</span>
      </div>
      <div className="sgbh-term-dim mt-1">Service detection performed. 5 services, 3 with known vulnerabilities.</div>
      <div className="mt-2">
        <span className="sgbh-term-prompt">kali@pentest</span>
        <span className="sgbh-term-dim">:~$</span>{" "}
        <span className="sgbh-term-cmd">_</span>
        <span className="animate-pulse">█</span>
      </div>
    </TerminalWindow>
  );
}

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ───── 1. Kapak ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2205 · 1. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="sgbh-shimmer">Siber Güvenlik</span>
          <br />
          <span className="text-white/90">ve Bilişim Hukuku</span>
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Saldırgan düşün, savunan ol, hukuka uygun çalış.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={Shield}
            title="Güvenlik"
            desc="CIA üçlüsü, savunma katmanları, kriptografi temelleri."
            delay={0.3}
            accent="#06b6d4"
          />
          <FeatureCard
            icon={Crosshair}
            title="Saldırı Anatomisi"
            desc="OWASP Top 10, tehdit aktörleri, sızma zinciri, gerçek vakalar."
            delay={0.45}
            accent="#f87171"
          />
          <FeatureCard
            icon={Scale}
            title="Hukuk · kısa"
            desc="KVKK, 5651, TCK 243-245 — teknik insanın bilmesi gereken minimum."
            delay={0.6}
            accent="#a78bfa"
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 inline-flex items-center gap-2 text-xs font-mono text-gray-500"
        >
          <Calendar className="w-3.5 h-3.5" />
          Çarşamba 13:30 — 17:00 · Teknik Resim Çizim 2
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. Dönem Haritası ───── */
  () => (
    <SlideShell>
      <Eyebrow>Dönem Haritası</Eyebrow>
      <H2>15 hafta · 3 katman</H2>
      <Sub className="mt-3 max-w-3xl">
        Teknik temeller → saldırı ve savunma → hukuki çerçeve. Her hafta hem bir
        kavram hem bir gerçek dünya vakası işliyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "H1 — H5", title: "Temeller", items: ["CIA üçlüsü", "Tehdit modelleri", "Kriptografi 101", "OWASP Top 10", "Ağ güvenliği"] , icon: Shield, accent: "#06b6d4" },
          { range: "H6 — H10", title: "Saldırı & Savunma", items: ["Phishing & sosyal mühendislik", "Malware aileleri", "Ransomware", "Sızma testi etiği", "SIEM & olay müdahale"], icon: Target, accent: "#f87171" },
          { range: "H11 — H15", title: "Hukuk & Vaka", items: ["KVKK · 5651 · TCK 243-245 özet", "Dijital delil zinciri", "Bug bounty & sorumlu açıklama", "Kapsamlı vaka analizleri", "Final projesi"], icon: Scale, accent: "#a78bfa" },
        ].map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="sgbh-card rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${g.accent}18`, border: `1px solid ${g.accent}55` }}
              >
                <g.icon className="w-5 h-5" style={{ color: g.accent }} />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: g.accent }}>{g.range}</div>
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

  /* ───── 3. İstatistikler ───── */
  () => (
    <SlideShell>
      <Eyebrow>Neden önemli?</Eyebrow>
      <H2>Siber risk · 2023-2024 verileri</H2>
      <Sub className="mt-3 max-w-3xl">
        Saldırı yüzeyi her yıl büyüyor; maliyetler ise ekonomik krizleri aşıyor.
        Birkaç çarpıcı rakam:
      </Sub>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        <StatCard
          icon={DollarSign}
          value="$4.45M"
          label="Bir veri ihlalinin küresel ortalama maliyeti"
          source="IBM Cost of a Data Breach 2023"
          delay={0.1}
          accent="#06b6d4"
        />
        <StatCard
          icon={Clock}
          value="39 sn"
          label="Küresel ortalama bir siber saldırı sıklığı (internet bağlı cihaz)"
          source="Univ. of Maryland · Clark School"
          delay={0.2}
          accent="#fbbf24"
        />
        <StatCard
          icon={Briefcase}
          value="47%"
          label="Siber saldırıların hedefi olan KOBİ oranı"
          source="Verizon DBIR 2023"
          delay={0.3}
          accent="#f87171"
        />
        <StatCard
          icon={Gavel}
          value="₺50M+"
          label="KVKK 2024 idari para cezası rekoru (tek ihlal)"
          source="KVKK · 2024 kararları"
          delay={0.4}
          accent="#a78bfa"
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-8 text-xs text-gray-500 max-w-3xl"
      >
        Not: Rakamlar yıllık raporlardan derlendi; kesin değerler kaynaklar arasında ±%10 oynayabilir.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 4. Bölüm 1 — CIA ───── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="CIA Üçlüsü"
      subtitle="Bilgi güvenliğinin üç sütunu: gizlilik, bütünlük, erişilebilirlik."
      bgGradient="linear-gradient(135deg,#06b6d4,#0e7490)"
      shadow="0 30px 80px -20px rgba(6,182,212,0.6)"
      icon={<Shield className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 6. CIA Triangle Mockup ───── */
  () => (
    <SlideShell>
      <Eyebrow>Klasik model · 1975'ten beri</Eyebrow>
      <H2 className="mb-2">CIA Üçgeni</H2>
      <Sub className="max-w-3xl mb-6">
        Üç köşesi birbirini dengeler: birini güçlendirmek genelde diğerini zayıflatır.
        Güvenlik kararları bu üçgenin neresinde durduğunla başlar.
      </Sub>
      <CIATriangle />
    </SlideShell>
  ),

  /* ───── 7. Confidentiality ───── */
  () => (
    <SlideShell>
      <Eyebrow>C · Confidentiality</Eyebrow>
      <H2><span className="text-[#67e8f9]">Gizlilik</span> · kim erişebilir?</H2>
      <Sub className="mt-3 max-w-3xl">
        Bilgiye sadece yetkili kişilerin ulaşmasını garanti eder. İhlal edilirse:
        kişisel veri sızar, ticari sır rakibe geçer, devlet sırrı düşmana ulaşır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-widest text-[#06b6d4] mb-3 font-mono">Günlük örnekler</div>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-3"><Lock className="w-4 h-4 mt-0.5 text-[#06b6d4]" /><span>Hastanın tıbbi kayıtlarına yalnızca doktoru erişir.</span></li>
            <li className="flex gap-3"><KeyRound className="w-4 h-4 mt-0.5 text-[#06b6d4]" /><span>Parolanın hash'i veritabanında saklanır, açık metin değil.</span></li>
            <li className="flex gap-3"><FileLock className="w-4 h-4 mt-0.5 text-[#06b6d4]" /><span>Diplomatik telgraf uçtan uca şifrelenir.</span></li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-widest text-[#06b6d4] mb-3 font-mono">Savunma kontrolleri</div>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-3"><Check className="w-4 h-4 mt-0.5 text-[#34d399]" /><span>Erişim kontrolü (RBAC / ABAC), MFA</span></li>
            <li className="flex gap-3"><Check className="w-4 h-4 mt-0.5 text-[#34d399]" /><span>Simetrik &amp; asimetrik şifreleme (AES-256, RSA, ECC)</span></li>
            <li className="flex gap-3"><Check className="w-4 h-4 mt-0.5 text-[#34d399]" /><span>Veri sınıflandırma &amp; DLP (sızıntı önleme)</span></li>
            <li className="flex gap-3"><Check className="w-4 h-4 mt-0.5 text-[#34d399]" /><span>Fiziksel güvenlik (data center erişimi)</span></li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 8. Integrity ───── */
  () => (
    <SlideShell>
      <Eyebrow>I · Integrity</Eyebrow>
      <H2><span className="text-[#c4b5fd]">Bütünlük</span> · veri değiştirilmedi mi?</H2>
      <Sub className="mt-3 max-w-3xl">
        Verinin oluşturulduğu hâliyle, yetkisiz değişikliğe uğramadan kaldığını
        garanti eder. İhlali çoğu zaman gizlilik ihlalinden daha tehlikelidir
        çünkü <span className="text-white">fark edilmez</span>.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-widest text-[#a78bfa] mb-3 font-mono">Günlük örnekler</div>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-3"><Database className="w-4 h-4 mt-0.5 text-[#a78bfa]" /><span>Banka bakiyesinin transfer sırasında değiştirilmemesi.</span></li>
            <li className="flex gap-3"><Hash className="w-4 h-4 mt-0.5 text-[#a78bfa]" /><span>İndirilen ISO dosyasının SHA-256 değeri sitedekiyle eşleşmesi.</span></li>
            <li className="flex gap-3"><Fingerprint className="w-4 h-4 mt-0.5 text-[#a78bfa]" /><span>Elektronik oy kayıtlarının sonradan değiştirilememesi.</span></li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-widest text-[#a78bfa] mb-3 font-mono">Savunma kontrolleri</div>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-3"><Check className="w-4 h-4 mt-0.5 text-[#34d399]" /><span>Kriptografik hash (SHA-256, SHA-3)</span></li>
            <li className="flex gap-3"><Check className="w-4 h-4 mt-0.5 text-[#34d399]" /><span>Dijital imza (PKI, e-imza, kayıtlı e-posta)</span></li>
            <li className="flex gap-3"><Check className="w-4 h-4 mt-0.5 text-[#34d399]" /><span>Sürüm kontrolü &amp; değişmez (immutable) loglar</span></li>
            <li className="flex gap-3"><Check className="w-4 h-4 mt-0.5 text-[#34d399]" /><span>Veritabanı transaction &amp; checksum</span></li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 9. Availability ───── */
  () => (
    <SlideShell>
      <Eyebrow>A · Availability</Eyebrow>
      <H2><span className="text-[#86efac]">Erişilebilirlik</span> · gerektiğinde orada mı?</H2>
      <Sub className="mt-3 max-w-3xl">
        Bilginin ve hizmetin yetkili kullanıcılar için <span className="text-white">zamanında</span>
        ve <span className="text-white">çalışır</span> hâlde bulunmasıdır.
        Saldırı şart değil — bir kablo, bir kötü güncelleme, bir DNS yanlış yapılandırması da yeter.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-widest text-[#22c55e] mb-3 font-mono">Tehdit ve örnekler</div>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-3"><Zap className="w-4 h-4 mt-0.5 text-[#86efac]" /><span>DDoS: e-devlet'in seçim akşamı kilitlenmesi.</span></li>
            <li className="flex gap-3"><Server className="w-4 h-4 mt-0.5 text-[#86efac]" /><span>Donanım arızası: tek sunucudaki SSD'nin patlaması.</span></li>
            <li className="flex gap-3"><Bug className="w-4 h-4 mt-0.5 text-[#86efac]" /><span>Ransomware: dosyaların şifrelenip kilitlenmesi.</span></li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-widest text-[#22c55e] mb-3 font-mono">Savunma kontrolleri</div>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-3"><Check className="w-4 h-4 mt-0.5 text-[#34d399]" /><span>3-2-1 yedekleme kuralı (3 kopya, 2 ortam, 1 offsite)</span></li>
            <li className="flex gap-3"><Check className="w-4 h-4 mt-0.5 text-[#34d399]" /><span>Yük dengeleme &amp; otomatik ölçeklenme</span></li>
            <li className="flex gap-3"><Check className="w-4 h-4 mt-0.5 text-[#34d399]" /><span>CDN &amp; anti-DDoS (Cloudflare, AWS Shield)</span></li>
            <li className="flex gap-3"><Check className="w-4 h-4 mt-0.5 text-[#34d399]" /><span>Felaket kurtarma planı (DRP) &amp; RTO/RPO hedefleri</span></li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 10. CIA İhlal Tablosu ───── */
  () => (
    <SlideShell>
      <Eyebrow>Vaka eşleştirme</Eyebrow>
      <H2>Gerçek ihlaller, ihlal edilen sütun</H2>
      <Sub className="mt-3 max-w-3xl">
        Aynı olay birden fazla sütunu vurabilir; tablo en baskın olanı gösteriyor.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-8 sgbh-card rounded-xl p-1"
      >
        <table className="sgbh-tbl">
          <thead>
            <tr>
              <th style={{ width: "26%" }}>Vaka</th>
              <th style={{ width: "20%" }}>İhlal edilen ilke</th>
              <th>Ne oldu?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="font-semibold text-white">Equifax</div>
                <div className="text-[11px] text-gray-500 font-mono">2017 · ABD</div>
              </td>
              <td><span className="sgbh-pill sgbh-pill-c">Confidentiality</span></td>
              <td>147 milyon kişinin SSN, doğum tarihi ve adresi sızdı. Apache Struts'taki yamalanmamış CVE-2017-5638 zafiyeti istismar edildi.</td>
            </tr>
            <tr>
              <td>
                <div className="font-semibold text-white">Stuxnet</div>
                <div className="text-[11px] text-gray-500 font-mono">2010 · İran</div>
              </td>
              <td><span className="sgbh-pill sgbh-pill-i">Integrity</span></td>
              <td>Natanz'daki uranyum santrifüjlerinin PLC kodu sessizce değiştirildi; operatör ekranı normal görünürken cihazlar yıprandı.</td>
            </tr>
            <tr>
              <td>
                <div className="font-semibold text-white">GitHub DDoS</div>
                <div className="text-[11px] text-gray-500 font-mono">2018 · Global</div>
              </td>
              <td><span className="sgbh-pill sgbh-pill-a">Availability</span></td>
              <td>1.35 Tbps Memcached amplifikasyon saldırısı — o tarihteki rekor. GitHub Akamai Prolexic ile 10 dakikada toparlandı.</td>
            </tr>
            <tr>
              <td>
                <div className="font-semibold text-white">SolarWinds</div>
                <div className="text-[11px] text-gray-500 font-mono">2020 · ABD</div>
              </td>
              <td><span className="sgbh-pill sgbh-pill-i">Integrity</span> + <span className="sgbh-pill sgbh-pill-c">Conf.</span></td>
              <td>Orion güncellemesine arka kapı eklendi; 18.000 kurum &quot;güvenilir&quot; imzalı bir trojan kurdu. Tedarik zinciri saldırısı.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 11. Bölüm 2 — Saldırgan Düşün ───── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Saldırı & Savunma"
      subtitle="Saldırganı tanı, zafiyetleri haritala, savunmanı katmanlı kur. Kriptografi, OWASP Top 10 ve defense-in-depth."
      bgGradient="linear-gradient(135deg,#ef4444,#7f1d1d)"
      shadow="0 30px 80px -20px rgba(239,68,68,0.55)"
      icon={<Crosshair className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 12. Tehdit Aktörleri ───── */
  () => (
    <SlideShell>
      <Eyebrow>Aktörler · motivasyon · yetkinlik</Eyebrow>
      <H2>Saldırganı tanı, savunmanı buna göre kur</H2>
      <Sub className="mt-3 max-w-3xl">
        Hepsi seni hedefliyor ama farklı sebeplerle, farklı kaynaklarla. Düşman
        haritası olmadan kontrol seçilemez.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={Skull}
          title="Script Kiddie"
          desc="Hazır araç indirip dener; düşük yetkinlik, yüksek gürültü. Hedef rastgele — tarama yapar, açık bulursa girer."
          accent="#94a3b8"
          delay={0.1}
        />
        <FeatureCard
          icon={Globe}
          title="Hacktivist"
          desc="Siyasi/ideolojik motive (Anonymous tarzı). DDoS, web tahrifi, sızdırma. Kaynak orta, mesaj büyük."
          accent="#f59e0b"
          delay={0.18}
        />
        <FeatureCard
          icon={Briefcase}
          title="Kurumsal Casus"
          desc="Rakip firma adına ticari sır peşinde. Hedefli phishing, içeriden adam. Para ve zaman var."
          accent="#06b6d4"
          delay={0.26}
        />
        <FeatureCard
          icon={Cpu}
          title="APT (Devlet Destekli)"
          desc="Aylar süren sızma, 0-day kullanır. APT28, Lazarus, Equation Group. Hedef: kritik altyapı, savunma sanayi."
          accent="#ef4444"
          delay={0.34}
        />
        <FeatureCard
          icon={Users}
          title="Insider"
          desc="Çalışan ya da eski çalışan. Yetkisini kötüye kullanır. En sinsi tehdit — zaten içeride."
          accent="#a78bfa"
          delay={0.42}
        />
        <FeatureCard
          icon={Bug}
          title="Siber Suçlu"
          desc="Para odaklı; ransomware, banka trojan'ı, kart kopyalama. Karanlık pazarda hizmet alıp satar."
          accent="#34d399"
          delay={0.5}
        />
      </div>
    </SlideShell>
  ),

  /* ───── 13. PhishingMail ───── */
  () => (
    <SlideShell>
      <Eyebrow>Sosyal mühendislik · canlı örnek</Eyebrow>
      <H2 className="mb-2">Bu e-posta neden sahte?</H2>
      <Sub className="max-w-3xl mb-6">
        Saldırı çoğu zaman koddan değil duygudan başlar: korku, aciliyet, otorite.
        Aşağıda dört kırmızı bayrak işaretli.
      </Sub>
      <PhishingMail />
    </SlideShell>
  ),

  /* ───── 14. Terminal nmap ───── */
  () => (
    <SlideShell>
      <Eyebrow>Keşif aşaması · port taraması</Eyebrow>
      <H2 className="mb-2">Saldırgan ilk dakika ne görüyor?</H2>
      <Sub className="max-w-3xl mb-6">
        <span className="text-white">nmap</span> ile servis ve sürüm tespiti yapılır.
        Eski sürümler ünlü CVE'lerle eşleşir; saldırı zinciri buradan başlar.
        Bu örnekteki <span className="text-red-400 font-mono">vsftpd 2.3.4</span> bilinen bir arka kapıya sahiptir.
      </Sub>
      <TerminalNmap />
    </SlideShell>
  ),

  /* ───── 15. OWASP Top 10 (2021) ───── */
  () => (
    <SlideShell>
      <Eyebrow>Web zafiyet endüstrisinin haritası</Eyebrow>
      <H2 className="mb-2">OWASP Top 10 · 2021</H2>
      <Sub className="max-w-3xl mb-6">
        Open Web Application Security Project'in dört yılda bir güncellediği
        listesi; web uygulamalarındaki en kritik 10 risk. Bir geliştirici sınavı,
        bir CTF görevi, bir pentest raporu — bu listeden çıkmaz.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-2.5"
      >
        {[
          { code: "A01", title: "Broken Access Control", desc: "Yetki kontrolü atlatma — yatay/dikey hak yükseltme." },
          { code: "A02", title: "Cryptographic Failures", desc: "Zayıf şifre, açık metin parola, eski TLS, yanlış anahtar yönetimi." },
          { code: "A03", title: "Injection (SQLi · NoSQLi)", desc: "Kullanıcı girdisi sorguya doğrudan yapışır; veritabanı çalar." },
          { code: "A04", title: "Insecure Design", desc: "Tasarımdan gelen kusur; tehdit modelleme eksikliği." },
          { code: "A05", title: "Security Misconfiguration", desc: "Varsayılan parola, açık debug, S3 bucket public." },
          { code: "A06", title: "Vulnerable Components", desc: "Yamalanmamış kütüphane (log4shell, Struts, jQuery 1.x)." },
          { code: "A07", title: "Auth & Session Failures", desc: "Brute force koruması yok, JWT 'none' alg, çerez güvensiz." },
          { code: "A08", title: "Software & Data Integrity", desc: "İmzasız güncelleme, tedarik zinciri (SolarWinds, xz-utils)." },
          { code: "A09", title: "Logging & Monitoring", desc: "Olay yok, alarm yok — saldırgan haftalarca dolaşır." },
          { code: "A10", title: "Server-Side Request Forgery", desc: "Sunucu, saldırganın istediği iç adrese istek atar (metadata, k8s)." },
        ].map((item, i) => (
          <motion.div
            key={item.code}
            initial={{ opacity: 0, x: i % 2 === 0 ? -12 : 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.04 }}
            className="sgbh-card rounded-lg px-4 py-3 flex items-start gap-3"
          >
            <span
              className="text-[10px] font-mono font-bold px-2 py-1 rounded flex-shrink-0"
              style={{ background: "#06b6d415", color: "#67e8f9", border: "1px solid #06b6d440" }}
            >
              {item.code}
            </span>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white leading-tight">{item.title}</div>
              <div className="text-[11px] text-gray-400 leading-snug mt-0.5">{item.desc}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SlideShell>
  ),

  /* ───── 16. Savunma Derinliği ───── */
  () => (
    <SlideShell>
      <Eyebrow>Defense in Depth · katmanlı savunma</Eyebrow>
      <H2 className="mb-2">Tek bir kapı yok, 5 halka var</H2>
      <Sub className="max-w-3xl mb-6">
        Saldırgan bir katmanı geçerse diğeri durdurur. Klasik askeri doktrin
        siber dünyaya uyarlanmış hâli — her halka kendi kontrollerine sahip.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-6">
        {[
          { num: "01", layer: "Fiziksel", color: "#06b6d4", icon: HardDrive, controls: ["Kart-okuyucu", "CCTV", "Mantrap", "Kafes rack"] },
          { num: "02", layer: "Ağ", color: "#22d3ee", icon: Network, controls: ["Firewall", "IDS/IPS", "VLAN", "VPN · ZTNA"] },
          { num: "03", layer: "Host", color: "#67e8f9", icon: Cpu, controls: ["EDR · antivirüs", "Sertleştirme", "Yama yönetimi", "Disk şifreleme"] },
          { num: "04", layer: "Uygulama", color: "#fbbf24", icon: Code, controls: ["WAF", "SAST/DAST", "Input validation", "RBAC"] },
          { num: "05", layer: "Veri", color: "#a78bfa", icon: Database, controls: ["AES-256", "DLP", "Tokenization", "Yedek + DR"] },
        ].map((l, i) => (
          <motion.div
            key={l.layer}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="sgbh-card rounded-xl p-4 flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color: l.color }}>{l.num}</span>
              <l.icon className="w-5 h-5" style={{ color: l.color }} />
            </div>
            <div className="text-base font-semibold text-white mb-3">{l.layer}</div>
            <ul className="space-y-1.5 text-[11px] text-gray-400">
              {l.controls.map((c) => (
                <li key={c} className="flex items-start gap-1.5">
                  <span className="mt-0.5" style={{ color: l.color }}>·</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 sgbh-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3 max-w-3xl"
      >
        <Lightbulb className="w-4 h-4 text-[#fbbf24] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Pratik:</span> Bir saldırı senaryosunu (örn. ransomware) çiz ve bu 5 katmanın
          her birinde durdurabilecek 1 kontrolü işaretle. Hangisi senin kurumda eksik?
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 17. Kriptografi 101 ───── */
  () => (
    <SlideShell>
      <Eyebrow>Kriptografi · 3 temel araç</Eyebrow>
      <H2 className="mb-2">Şifrele · Özetle · İmzala</H2>
      <Sub className="max-w-3xl mb-6">
        Hemen her güvenlik kontrolü bu üç primitiften birini kullanıyor.
        Karıştırılınca büyük açıklar çıkar — &quot;parolayı şifreleyelim&quot; cümlesi yanlıştır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="sgbh-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <Key className="w-5 h-5 text-[#06b6d4]" />
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#06b6d4]">Simetrik</div>
          </div>
          <h3 className="text-base font-semibold text-white mb-2">Tek anahtar</h3>
          <p className="text-xs text-gray-400 mb-3 leading-relaxed">
            Aynı anahtarla şifrele ve çöz. Hızlı, büyük veri için ideal — ama anahtarın karşı tarafa nasıl gideceği problem.
          </p>
          <div className="font-mono text-[10px] bg-black/40 rounded p-2.5 border border-white/5 space-y-1">
            <div className="text-gray-500">// AES-256-GCM</div>
            <div><span className="text-[#67e8f9]">plaintext</span> + <span className="text-[#fbbf24]">key</span> → <span className="text-[#a78bfa]">ciphertext</span></div>
            <div className="text-gray-500">Örnek: AES, ChaCha20</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="sgbh-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <GitFork className="w-5 h-5 text-[#a78bfa]" />
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#a78bfa]">Asimetrik</div>
          </div>
          <h3 className="text-base font-semibold text-white mb-2">Anahtar çifti</h3>
          <p className="text-xs text-gray-400 mb-3 leading-relaxed">
            Public + private. Public ile şifrelenen sadece private ile açılır. Yavaş ama anahtar dağıtım sorununu çözer.
          </p>
          <div className="font-mono text-[10px] bg-black/40 rounded p-2.5 border border-white/5 space-y-1">
            <div className="text-gray-500">// RSA-2048 / Ed25519</div>
            <div><span className="text-[#67e8f9]">msg</span> + <span className="text-[#fbbf24]">pub_key</span> → <span className="text-[#a78bfa]">cipher</span></div>
            <div><span className="text-[#a78bfa]">cipher</span> + <span className="text-[#f87171]">priv_key</span> → <span className="text-[#67e8f9]">msg</span></div>
            <div className="text-gray-500">TLS handshake'in temeli</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <Hash className="w-5 h-5 text-[#34d399]" />
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#34d399]">Hash</div>
          </div>
          <h3 className="text-base font-semibold text-white mb-2">Tek yön özet</h3>
          <p className="text-xs text-gray-400 mb-3 leading-relaxed">
            Girdiden sabit uzunlukta parmak izi üretir; geri dönüşü matematiksel olarak imkansız. Bütünlük + parola depolama.
          </p>
          <div className="font-mono text-[10px] bg-black/40 rounded p-2.5 border border-white/5 space-y-1">
            <div className="text-gray-500">// SHA-256</div>
            <div><span className="text-[#67e8f9]">&quot;Merhaba&quot;</span></div>
            <div className="text-gray-500">↓ sha256</div>
            <div className="text-[#34d399] break-all">7f3a8e1c...d92b</div>
            <div className="text-gray-500">Parolada: bcrypt/argon2id</div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 sgbh-card rounded-lg px-5 py-4 max-w-4xl"
      >
        <div className="text-[10px] font-mono uppercase tracking-widest text-[#fbbf24] mb-2">Dijital İmza · 3'ü birden kullanır</div>
        <div className="flex items-center gap-2 text-xs text-gray-300 flex-wrap">
          <span className="font-mono px-2 py-1 rounded bg-black/40">hash(belge)</span>
          <ChevronRight className="w-3 h-3 text-gray-600" />
          <span className="font-mono px-2 py-1 rounded bg-black/40">priv_key ile şifrele</span>
          <ChevronRight className="w-3 h-3 text-gray-600" />
          <span className="font-mono px-2 py-1 rounded bg-black/40">imza</span>
          <span className="text-gray-500 mx-2">·</span>
          <span className="font-mono px-2 py-1 rounded bg-black/40">karşı taraf pub_key ile çözer</span>
          <ChevronRight className="w-3 h-3 text-gray-600" />
          <span className="text-[#34d399]">hash eşleşirse: gerçek &amp; değişmemiş</span>
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 18. Yaygın Saldırı Türleri Tablosu ───── */
  () => (
    <SlideShell>
      <Eyebrow>Saldırı kataloğu · 5 klasik</Eyebrow>
      <H2>Ne yapar · örnek vaka · nasıl durdurursun</H2>
      <Sub className="mt-3 max-w-3xl">
        Her birinin altında yüzlerce alt-varyant var; bunlar tanımayı gereken
        çekirdek kategoriler. Bir röportajda &quot;ransomware nasıl çalışır&quot; sorulursa
        ezbere değil mantığa dayalı cevap ver.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 sgbh-card rounded-xl p-1"
      >
        <table className="sgbh-tbl">
          <thead>
            <tr>
              <th style={{ width: "18%" }}>Saldırı</th>
              <th style={{ width: "30%" }}>Ne yapar?</th>
              <th style={{ width: "27%" }}>Örnek vaka</th>
              <th>Temel savunma</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="font-semibold text-white">DDoS</div>
                <div className="text-[11px] text-gray-500 font-mono">availability</div>
              </td>
              <td>Sunucuya kapasitenin üstünde istek gönderip hizmeti çökertir.</td>
              <td>Dyn DNS · 2016 — Mirai botnet, Twitter/Netflix saatlerce erişilemez.</td>
              <td>CDN + anti-DDoS (Cloudflare, AWS Shield), rate-limit, anycast.</td>
            </tr>
            <tr>
              <td>
                <div className="font-semibold text-white">Ransomware</div>
                <div className="text-[11px] text-gray-500 font-mono">availability + extortion</div>
              </td>
              <td>Dosyaları şifreler, anahtar için kripto fidye ister; çift gasp: sızdırma tehdidi.</td>
              <td>Colonial Pipeline · 2021 — ABD doğu yakası akaryakıt krizi, $4.4M fidye.</td>
              <td>3-2-1 yedek (offline), EDR, segmentasyon, makro engelleme.</td>
            </tr>
            <tr>
              <td>
                <div className="font-semibold text-white">MITM</div>
                <div className="text-[11px] text-gray-500 font-mono">confidentiality + integrity</div>
              </td>
              <td>İki taraf arasına girip trafiği dinler ya da değiştirir.</td>
              <td>Halka açık WiFi'da sahte hotspot — banka oturumu çalınması.</td>
              <td>TLS + HSTS, sertifika pinning, VPN, açık WiFi'da banking yok.</td>
            </tr>
            <tr>
              <td>
                <div className="font-semibold text-white">SQL Injection</div>
                <div className="text-[11px] text-gray-500 font-mono">injection · A03</div>
              </td>
              <td><span className="font-mono text-[11px]">&apos; OR &apos;1&apos;=&apos;1</span> gibi girdi sorguya yapışır; veritabanı çalınır.</td>
              <td>TalkTalk · 2015 — 4M müşteri kaydı sızdı, £400K ceza, 17 yaşındaki çocuk fail.</td>
              <td>Parameterized query / prepared statement, ORM, WAF, en az yetki.</td>
            </tr>
            <tr>
              <td>
                <div className="font-semibold text-white">Zero-day</div>
                <div className="text-[11px] text-gray-500 font-mono">unknown CVE</div>
              </td>
              <td>Henüz yaması olmayan zafiyetin istismarı — savunmasında öncesi yok.</td>
              <td>Log4Shell · 2021 — JNDI lookup ile RCE, internetin yarısı yamasız kaldı.</td>
              <td>Defense-in-depth, SBOM takibi, hızlı yama disiplini, sıfır-güven ağ.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 19. Bölüm 3 — Hukuk (kısa) ───── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Türk Bilişim Hukuku · kısa"
      subtitle="Bildiğin saldırıyı yapmak suçtur, izinli yapmak meslektir. Sınırı kanun çizer — bu hafta sadece haritası."
      bgGradient="linear-gradient(135deg,#a78bfa,#5b21b6)"
      shadow="0 30px 80px -20px rgba(167,139,250,0.55)"
      icon={<Scale className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 16. Mevzuat ───── */
  () => (
    <SlideShell>
      <Eyebrow>Ana mevzuat · üç sütun</Eyebrow>
      <H2>Bilmen gereken üç kanun</H2>
      <Sub className="mt-3 max-w-3xl">
        Türkiye'de bilişim alanında çalışan her teknik insanın temas ettiği üç
        yasa. Hepsi sınavda da, sahada da çıkar.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Scale className="w-6 h-6 text-[#a78bfa]" />
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#a78bfa]">6698 / 2016</div>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">KVKK</h3>
          <p className="text-sm text-gray-400 mb-3">Kişisel Verilerin Korunması Kanunu.</p>
          <ul className="text-xs text-gray-400 space-y-1.5">
            <li>· Kişisel veriyi tanımlar ve işleme şartlarını sayar.</li>
            <li>· VERBİS kaydı zorunlu.</li>
            <li>· Aydınlatma + açık rıza ikilisi.</li>
            <li>· İhlal bildirimi: 72 saat.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Network className="w-6 h-6 text-[#06b6d4]" />
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#06b6d4]">5651 / 2007</div>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">İnternet Kanunu</h3>
          <p className="text-sm text-gray-400 mb-3">İnternet ortamında yapılan yayınların düzenlenmesi.</p>
          <ul className="text-xs text-gray-400 space-y-1.5">
            <li>· İçerik, yer, erişim sağlayıcı tanımları.</li>
            <li>· Hotline ve URL bazlı erişim engeli.</li>
            <li>· Log saklama yükümlülüğü (2 yıl).</li>
            <li>· BTK &amp; sulh ceza hakimliği yetkili.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Gavel className="w-6 h-6 text-[#f87171]" />
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#f87171]">TCK 243-245</div>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Bilişim Suçları</h3>
          <p className="text-sm text-gray-400 mb-3">Türk Ceza Kanunu — Onuncu Bölüm.</p>
          <ul className="text-xs text-gray-400 space-y-1.5">
            <li>· 243: Sisteme hukuka aykırı giriş (1-3 yıl).</li>
            <li>· 244: Sistemi engelleme, bozma, veriyi yok etme.</li>
            <li>· 245: Banka/kredi kartının kötüye kullanılması.</li>
            <li>· Hapis cezası seçenekleri ağırdır.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 21. Bu Hafta Yapılacaklar ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · pratik görevler</Eyebrow>
      <H2>Bir saatte 4 adım — kendi güvenliğin</H2>
      <Sub className="mt-3 max-w-3xl">
        Teorik anlatmadan önce kendi profilini gözden geçir. Bir sonraki derse
        bu dördünü yapmış gelmen bekleniyor.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          {
            icon: BookOpen,
            title: "kvkk.gov.tr rehberlerine göz at",
            desc: "&quot;Aydınlatma Yükümlülüğü Rehberi&quot; ve &quot;Veri İhlali Bildirimi&quot; rehberlerinin 1. bölümlerini oku.",
            accent: "#a78bfa",
          },
          {
            icon: Search,
            title: "haveibeenpwned.com'da kendi e-postanı sorgula",
            desc: "Sızdığı veri ihlallerini öğren. Bir tane bile çıkıyorsa o servisteki parolanı bugün değiştir.",
            accent: "#06b6d4",
          },
          {
            icon: KeyRound,
            title: "Parola yöneticisi kur",
            desc: "Bitwarden / 1Password / KeePassXC — birini seç, tek bir güçlü ana parola belirle, tarayıcıya entegre et.",
            accent: "#34d399",
          },
          {
            icon: ShieldCheck,
            title: "MFA'yı aktif et",
            desc: "Mail, banka, sosyal medya — TOTP uygulaması (Authy, Aegis) ile ikinci faktörü açık tut. SMS son tercih.",
            accent: "#fbbf24",
          },
        ].map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="sgbh-card sgbh-card-hover rounded-xl p-5 flex items-start gap-4"
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
                <h3 className="text-base font-semibold text-white">{t.title}</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.desc }} />
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 19. Sıradaki Hafta ───── */
  () => (
    <SlideShell>
      <Eyebrow>Hafta 2 · önizleme</Eyebrow>
      <H2 className="mb-3">
        <span className="sgbh-shimmer-soft">Tehdit modelleri</span>
        <br />
        ve saldırı türleri
      </H2>
      <Sub className="max-w-3xl">
        Önümüzdeki hafta &quot;saldırgan düşün&quot;ün ikinci yarısı:
        STRIDE/DREAD ile sistemini modelle, malware ailelerini tanı, oltalamanın bilim haline gelmiş hâlini gör.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10">
        <FeatureCard icon={Bug} title="Malware" desc="Virüs, trojan, worm, rootkit; tespit ve karantina." accent="#06b6d4" delay={0.1} />
        <FeatureCard icon={Mail} title="Phishing" desc="Spear / whaling / vishing; göz ile filtre nasıl?" accent="#fbbf24" delay={0.18} />
        <FeatureCard icon={Lock} title="Ransomware" desc="Şifreleme ekonomisi, çift gasp, ödeme dilemması." accent="#f87171" delay={0.26} />
        <FeatureCard icon={Wifi} title="DDoS" desc="Volumetrik, protocol, application katman saldırıları." accent="#34d399" delay={0.34} />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-10 inline-flex items-center gap-3 text-sm text-gray-400 sgbh-card rounded-lg px-4 py-3"
      >
        <Sparkles className="w-4 h-4 text-[#06b6d4]" />
        Hazırlık: OWASP Top 10 (2021) listesine bir göz at — slogan düzeyinde bilmek yeterli.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 20. Teşekkürler ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8"
          style={{
            background: "linear-gradient(135deg,#06b6d4,#0e7490)",
            boxShadow: "0 30px 80px -20px rgba(6,182,212,0.6)",
          }}
        >
          <ShieldCheck className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>Hafta 1 tamamlandı</Eyebrow>
        <H1>
          <span className="sgbh-shimmer">Teşekkürler</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Sorular, projeler, &quot;bu da hack mi&quot; vakaları — bekliyorum.
          Bir sonraki ders aynı yer, aynı saat.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto text-left">
          <div className="sgbh-card rounded-xl p-5">
            <Calendar className="w-5 h-5 text-[#06b6d4] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Ders saati</div>
            <div className="text-white font-semibold">Çarşamba</div>
            <div className="text-sm text-gray-400">13:30 — 17:00</div>
          </div>
          <div className="sgbh-card rounded-xl p-5">
            <Target className="w-5 h-5 text-[#a78bfa] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Derslik</div>
            <div className="text-white font-semibold">Teknik Resim</div>
            <div className="text-sm text-gray-400">Çizim 2</div>
          </div>
          <div className="sgbh-card rounded-xl p-5">
            <Brain className="w-5 h-5 text-[#34d399] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Ofis saati</div>
            <div className="text-white font-semibold">Randevu ile</div>
            <div className="text-sm text-gray-400">e-posta üzerinden</div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 text-xs font-mono text-gray-600 flex items-center justify-center gap-2"
        >
          <XCircle className="w-3.5 h-3.5" />
          <span>İzinsiz test yapmayın · etik {">"} merak</span>
          <span className="mx-3 text-gray-700">·</span>
          <EyeOff className="w-3.5 h-3.5" />
          <span>Sızdırılmış veriyi indirmek de suçtur</span>
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
            background: "linear-gradient(90deg, #06b6d4, #67e8f9, #06b6d4)",
            boxShadow: "0 0 16px rgba(6,182,212,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#06b6d4]/70">
          BVA 2205 · 1. Hafta · Siber Güvenliğe Giriş
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[#06b6d4]/50">
            <span className="text-[#06b6d4]">
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
            className="p-1.5 text-gray-500 hover:text-[#06b6d4] transition-colors"
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
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#06b6d4] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
                  ? "w-5 bg-[#06b6d4]"
                  : "w-1.5 bg-white/15 hover:bg-white/40"
              }`}
              style={
                i === current
                  ? { boxShadow: "0 0 10px rgba(6,182,212,0.6)" }
                  : undefined
              }
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#06b6d4] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
