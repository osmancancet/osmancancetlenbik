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
  ShieldCheck,
  Radar,
  Crosshair,
  Network,
  Hash,
  Fingerprint,
  Globe,
  Bug,
  Eye,
  Search,
  Layers,
  Database,
  FileText,
  Award,
  Scale,
  AlertTriangle,
  CheckCircle2,
  Brain,
  Target,
  Calendar,
  Sparkles,
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
        style={{ background: `${accent}15`, border: `1px solid ${accent}40` }}
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
          className="inline-flex w-32 h-32 rounded-3xl items-center justify-center mb-8 sgbh-pulse"
          style={{ background: bgGradient, boxShadow: shadow }}
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
          <span
            className="w-5 h-5 rounded-sm flex items-center justify-center text-[11px]"
            style={{ background: "linear-gradient(135deg,#06b6d4,#0891b2)", color: "white" }}
          >
            $_
          </span>
          <span>{title}</span>
        </div>
      </div>
      <div className="sgbh-terminal">{children}</div>
    </motion.div>
  );
}

/* MITRE ATT&CK Enterprise — örnek taktik sütunları (basitleştirilmiş) */
function AttckMatrix() {
  const columns: Array<{
    tactic: string;
    code: string;
    techniques: Array<{ name: string; hit?: boolean }>;
  }> = [
    {
      tactic: "Initial Access",
      code: "TA0001",
      techniques: [
        { name: "T1566 · Phishing", hit: true },
        { name: "T1190 · Exploit Public App" },
        { name: "T1078 · Valid Accounts" },
      ],
    },
    {
      tactic: "Execution",
      code: "TA0002",
      techniques: [
        { name: "T1059 · Command/Script", hit: true },
        { name: "T1204 · User Execution" },
      ],
    },
    {
      tactic: "Persistence",
      code: "TA0003",
      techniques: [
        { name: "T1547 · Boot/Logon Autostart" },
        { name: "T1053 · Scheduled Task", hit: true },
      ],
    },
    {
      tactic: "Privilege Esc.",
      code: "TA0004",
      techniques: [
        { name: "T1068 · Exploit for Priv Esc" },
        { name: "T1055 · Process Injection" },
      ],
    },
    {
      tactic: "Exfiltration",
      code: "TA0010",
      techniques: [
        { name: "T1041 · Exfil over C2", hit: true },
        { name: "T1567 · Exfil to Web Svc" },
      ],
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="grid grid-cols-2 md:grid-cols-5 gap-2.5"
    >
      {columns.map((col, i) => (
        <motion.div
          key={col.code}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + i * 0.08 }}
          className="flex flex-col gap-2"
        >
          <div className="text-center">
            <div className="text-[11px] font-semibold text-white leading-tight">{col.tactic}</div>
            <div className="text-[9px] font-mono text-[#06b6d4]/70">{col.code}</div>
          </div>
          <div className="flex flex-col gap-1.5">
            {col.techniques.map((t) => (
              <div
                key={t.name}
                className={`sgbh-attck-cell ${t.hit ? "sgbh-attck-cell-hit" : ""}`}
              >
                {t.name}
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* IOC olgunluğu — Pyramid of Pain (David Bianco) */
function PyramidOfPain() {
  const levels: Array<{
    label: string;
    pain: string;
    width: string;
    color: string;
    note: string;
  }> = [
    { label: "Hash değerleri", pain: "Önemsiz", width: "46%", color: "#475569", note: "1 bit değişir, hash değişir" },
    { label: "IP adresleri", pain: "Kolay", width: "58%", color: "#0891b2", note: "Yeni IP/VPS dakikalar içinde" },
    { label: "Alan adları", pain: "Basit", width: "70%", color: "#06b6d4", note: "Yeni domain kaydı ucuz" },
    { label: "Ağ / Host eserleri", pain: "Can sıkıcı", width: "82%", color: "#fbbf24", note: "Araç yeniden yapılandırılmalı" },
    { label: "Araçlar (Tools)", pain: "Zorlayıcı", width: "92%", color: "#f97316", note: "Yeni araç geliştirmek pahalı" },
    { label: "TTP'ler", pain: "Sert", width: "100%", color: "#ef4444", note: "Davranışı değiştirmek en zoru" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex flex-col items-center gap-2 mt-2"
    >
      {levels.map((l, i) => (
        <motion.div
          key={l.label}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + i * 0.1 }}
          className="rounded-lg px-4 py-2.5 flex items-center justify-between"
          style={{
            width: l.width,
            background: `${l.color}1f`,
            border: `1px solid ${l.color}66`,
          }}
        >
          <span className="text-sm font-semibold text-white">{l.label}</span>
          <span className="flex items-center gap-3">
            <span className="hidden md:inline text-[10px] text-gray-400">{l.note}</span>
            <span
              className="text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider"
              style={{ background: `${l.color}33`, color: l.color }}
            >
              {l.pain}
            </span>
          </span>
        </motion.div>
      ))}
      <div className="text-[11px] text-gray-500 font-mono mt-2">
        Aşağıdan yukarı: savunmacının engellemesi saldırgana giderek daha &quot;acı&quot; verir.
      </div>
    </motion.div>
  );
}

/* HackerOne tarzı zafiyet raporu mockup */
function BountyReport() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
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
          <Bug className="w-3.5 h-3.5" />
          <span>hackerone.com — Rapor #1842­093</span>
        </div>
      </div>
      <div className="sgbh-report">
        <div className="sgbh-report-headerrow">
          <div className="flex items-center justify-between">
            <span className="text-gray-900 font-semibold text-sm">
              Reflected XSS · /search parametresi
            </span>
            <span className="sgbh-report-sev sgbh-report-sev-high">High · CVSS 7.4</span>
          </div>
          <div className="flex items-center gap-4 mt-1.5 text-[11px] text-gray-500">
            <span>Durum: <span className="text-gray-800 font-medium">Triaged</span></span>
            <span>Program: acme-corp</span>
            <span>Ödül: <span className="text-gray-800 font-medium">$750</span></span>
          </div>
        </div>
        <div className="px-6 py-5 text-sm leading-relaxed text-gray-800">
          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">Özet</div>
          <p className="mb-3">
            <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-[12px]">q</span>{" "}
            parametresi yanıt sayfasına kodlanmadan yansıtılıyor. Hazırlanmış bir bağlantı
            kurbanın tarayıcısında saldırgan JavaScript&apos;i çalıştırır.
          </p>
          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">Üretme adımı (PoC)</div>
          <div className="font-mono text-[12px] bg-gray-900 text-gray-100 rounded p-3 mb-3 break-all">
            https://app.acme-corp.com/search?q=&lt;script&gt;alert(document.domain)&lt;/script&gt;
          </div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">Etki</div>
          <p className="mb-1">
            Oturum çerezi çalınabilir, kullanıcı adına işlem yapılabilir (hesap ele geçirme).
          </p>
          <p className="text-[11px] text-gray-500 mt-3 border-t pt-3">
            Çözüm önerisi: çıktı kodlaması (context-aware output encoding) + CSP başlığı.
            Kapsam (scope) dahilinde, üretim verisine dokunulmadı.
          </p>
        </div>
      </div>
    </motion.div>
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
        <Eyebrow>BVA 2205 · 13. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="sgbh-shimmer">Tehdit İstihbaratı</span>
          <br />
          <span className="text-white/90">ATT&amp;CK · IOC · Bug Bounty</span>
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Saldırganı verisinden tanı, davranışını haritala, ekosistemin gücünü
          savunmaya çevir.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={Crosshair}
            title="MITRE ATT&amp;CK"
            desc="Saldırgan taktik ve tekniklerinin ortak dili; tehdit haritalama."
            delay={0.3}
            accent="#06b6d4"
          />
          <FeatureCard
            icon={Fingerprint}
            title="IOC&apos;lar"
            desc="Uzlaşma göstergeleri: hash, IP, domain — ve TTP&apos;lerle farkı."
            delay={0.45}
            accent="#fbbf24"
          />
          <FeatureCard
            icon={Bug}
            title="Bug Bounty"
            desc="HackerOne &amp; Bugcrowd; sorumlu açıklama ve hukuki çerçeve."
            delay={0.6}
            accent="#34d399"
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 inline-flex items-center gap-2 text-xs font-mono text-gray-500"
        >
          <Calendar className="w-3.5 h-3.5" />
          Çarşamba 13:30 — 17:00 · Tehdit istihbaratı uygulaması
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. Geçen hafta → bu hafta köprüsü ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · olay müdahalesinden istihbarata</Eyebrow>
      <H2>Bir saldırıyı durdurduk; şimdi onu &quot;tanımlıyoruz&quot;</H2>
      <Sub className="mt-3 max-w-3xl">
        Önceki haftalarda log topladık, SIEM ile olay yakaladık ve müdahale ettik. Tek bir
        olayı kapatmak yetmez: aynı saldırgan geri gelir. Tehdit istihbaratı, gördüğümüz
        izleri bilinen aktörlere ve davranışlara bağlayarak bir sonraki adımı önceden kapatır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#67e8f9]">
            <Eye className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Reaktif · olaya tepki</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Alarm geldi, ne olduğunu inceledim.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Zararlıyı karantinaya aldım, sistemi temizledim.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Olayı kapattım — ama &quot;kim, neden, sırada ne&quot; belirsiz.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <Radar className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">İstihbarat odaklı · proaktif</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Bu IOC&apos;lar hangi bilinen kampanyaya ait?</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />ATT&amp;CK&apos;te aktörün bir sonraki tekniği ne?</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Tespiti baştan kurarım; saldırgan gelmeden hazırım.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 3. Bu dersin akışı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: davranış → gösterge → ekosistem</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce saldırganın davranışını ortak bir dile (ATT&amp;CK) oturtuyoruz; sonra elimizdeki
        teknik izleri (IOC) bu dile bağlıyoruz; en son bu istihbaratı üreten ve besleyen
        bug bounty ekosistemini ve hukuki sınırlarını ele alıyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "MITRE ATT&CK", items: ["Taktik vs teknik vs prosedür", "Enterprise matrisi", "Aktör haritalama (APT)"], icon: Crosshair, accent: "#06b6d4" },
          { range: "02", title: "IOC'lar", items: ["Atomik / hesaplı / davranışsal", "Pyramid of Pain", "Paylaşım: STIX/TAXII, MISP"], icon: Fingerprint, accent: "#fbbf24" },
          { range: "03", title: "Bug Bounty", items: ["HackerOne & Bugcrowd", "Sorumlu açıklama (CVD)", "Hukuki çerçeve & safe harbor"], icon: Bug, accent: "#34d399" },
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

  /* ───── 4. Bölüm 1 — ATT&CK ───── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="MITRE ATT&CK"
      subtitle="Saldırganın ne yaptığını anlatan ortak sözlük. &quot;Kötü adam girdi&quot; değil; hangi taktik, hangi teknik, hangi prosedür."
      bgGradient="linear-gradient(135deg,#06b6d4,#0e7490)"
      shadow="0 30px 80px -20px rgba(6,182,212,0.6)"
      icon={<Crosshair className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 5. Tehdit istihbaratı nedir / katmanları ───── */
  () => (
    <SlideShell>
      <Eyebrow>Tehdit istihbaratı · üç katman</Eyebrow>
      <H2 className="mb-2">Aynı veri, üç farklı okuyucu</H2>
      <Sub className="max-w-3xl mb-6">
        Tehdit istihbaratı (Cyber Threat Intelligence) ham veriyi, eyleme dönüştürülebilir
        bilgiye çevirme sürecidir. Kime sunulduğuna göre üç katmana ayrılır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { tier: "Stratejik", who: "Yönetim · CISO", color: "#a78bfa", icon: Brain, what: "Eğilimler, aktör motivasyonu, risk. Teknik değil; bütçe ve politika kararı için." },
          { tier: "Operasyonel", who: "SOC ekibi · IR", color: "#06b6d4", icon: Radar, what: "Aktörün kampanyaları, TTP&apos;leri. Bir sonraki hamleyi öngörmek için ATT&apos;CK eşlemesi." },
          { tier: "Taktik", who: "Analist · sensör", color: "#34d399", icon: Fingerprint, what: "IOC&apos;lar: hash, IP, domain. Doğrudan firewall/SIEM kuralına dökülür, kısa ömürlü." },
        ].map((t, i) => (
          <motion.div
            key={t.tier}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="sgbh-card rounded-xl p-6"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ background: `${t.color}18`, border: `1px solid ${t.color}55` }}
            >
              <t.icon className="w-6 h-6" style={{ color: t.color }} />
            </div>
            <div className="text-lg font-bold mb-1" style={{ color: t.color }}>{t.tier}</div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-gray-500 mb-3">{t.who}</div>
            <p className="text-sm text-gray-300 leading-relaxed">{t.what}</p>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 6. Taktik / Teknik / Prosedür ───── */
  () => (
    <SlideShell>
      <Eyebrow>ATT&amp;CK · sözlüğün anatomisi</Eyebrow>
      <H2>Taktik · Teknik · Prosedür (TTP)</H2>
      <Sub className="mt-3 max-w-3xl">
        ATT&amp;CK üç soruyu ayırır: <span className="text-white">neden</span> (taktik),
        <span className="text-white"> nasıl</span> (teknik), <span className="text-white">tam olarak nasıl</span> (prosedür).
        Bu ayrım, soyut savunmayı somut tespit kuralına çevirir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#06b6d4] mb-2">Taktik · Tactic</div>
          <h3 className="text-lg font-semibold text-white mb-2">Saldırganın amacı</h3>
          <p className="text-sm text-gray-400 mb-3">&quot;Neden&quot; bu adımı atıyor? 14 sütun: Initial Access, Persistence, Exfiltration...</p>
          <div className="font-mono text-[11px] bg-black/40 rounded p-2.5 border border-white/5 text-[#67e8f9]">TA0001 · Initial Access</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#fbbf24] mb-2">Teknik · Technique</div>
          <h3 className="text-lg font-semibold text-white mb-2">Amaca ulaşma yolu</h3>
          <p className="text-sm text-gray-400 mb-3">&quot;Nasıl&quot;? Her tekniğin bir ID&apos;si ve alt teknikleri vardır.</p>
          <div className="font-mono text-[11px] bg-black/40 rounded p-2.5 border border-white/5 text-[#fbbf24]">T1566.001 · Spearphishing Attachment</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#34d399] mb-2">Prosedür · Procedure</div>
          <h3 className="text-lg font-semibold text-white mb-2">Aktöre özgü uygulama</h3>
          <p className="text-sm text-gray-400 mb-3">Belirli bir grubun o tekniği tam olarak gerçekleştirme şekli.</p>
          <div className="font-mono text-[11px] bg-black/40 rounded p-2.5 border border-white/5 text-[#86efac]">Makro içeren .docx + PowerShell indirici</div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 sgbh-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3 max-w-4xl"
      >
        <Layers className="w-4 h-4 text-[#06b6d4] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Hatırlatma:</span> Hash veya IP engellemek saldırgana ucuza gelir;
          TTP&apos;sini tespit etmek ise davranışını değiştirmeye zorlar. Pyramid of Pain&apos;in özü budur.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 7. ATT&CK Matrisi mockup ───── */
  () => (
    <SlideShell>
      <Eyebrow>ATT&amp;CK Enterprise · matris</Eyebrow>
      <H2 className="mb-2">Saldırıyı sütun sütun haritala</H2>
      <Sub className="max-w-3xl mb-6">
        Her sütun bir taktik (amaç), her hücre o amaca ulaştıran bir tekniktir. Bir olayda
        gözlemlenen teknikler işaretlenince saldırının &quot;hikâyesi&quot; soldan sağa okunur.
        Aşağıda kırmızı hücreler örnek bir kampanyada gözlemlenenleri gösterir.
      </Sub>
      <AttckMatrix />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-6 text-[11px] text-gray-500 font-mono"
      >
        Tam matris 14 taktik ve 200&apos;den fazla teknik içerir · görselleştirme aracı: ATT&amp;CK Navigator.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 8. ATT&CK ne işe yarar (kullanım) ───── */
  () => (
    <SlideShell>
      <Eyebrow>ATT&amp;CK · pratik kullanım</Eyebrow>
      <H2>Tek çerçeve, dört iş</H2>
      <Sub className="mt-3 max-w-3xl">
        ATT&amp;CK yalnızca bir sözlük değil; savunma, kırmızı takım ve raporlamayı aynı dilde
        konuşturan operasyonel bir araçtır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <FeatureCard
          icon={Eye}
          title="Tespit boşluğu analizi"
          desc="Hangi tekniklere karşı sensörümüz var, hangisi kör nokta? Navigator&apos;da ısı haritası çıkarılır."
          accent="#06b6d4"
          delay={0.1}
        />
        <FeatureCard
          icon={Crosshair}
          title="Kırmızı takım & emülasyon"
          desc="Gerçek bir aktörün TTP&apos;leri taklit edilerek savunma test edilir (adversary emulation)."
          accent="#f87171"
          delay={0.18}
        />
        <FeatureCard
          icon={Radar}
          title="Tehdit avı (threat hunting)"
          desc="Alarm beklemeden, belirli tekniklerin izleri proaktif aranır; hipotez ATT&apos;CK&apos;ten gelir."
          accent="#fbbf24"
          delay={0.26}
        />
        <FeatureCard
          icon={FileText}
          title="Ortak raporlama dili"
          desc="Vendor raporları ve IR ekipleri aynı T-kodlarıyla konuşur; karşılaştırma mümkün olur."
          accent="#34d399"
          delay={0.34}
        />
      </div>
    </SlideShell>
  ),

  /* ───── 9. Bölüm 2 — IOC ───── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="IOC'lar — Uzlaşma Göstergeleri"
      subtitle="Bir ihlalin geride bıraktığı parmak izleri. Ama hepsi eşit değerde değil; bazıları saldırganı zorlar, bazıları onu hiç rahatsız etmez."
      bgGradient="linear-gradient(135deg,#f59e0b,#b45309)"
      shadow="0 30px 80px -20px rgba(245,158,11,0.55)"
      icon={<Fingerprint className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 10. IOC türleri tablosu ───── */
  () => (
    <SlideShell>
      <Eyebrow>IOC · gösterge türleri</Eyebrow>
      <H2>Atomik · Hesaplı · Davranışsal</H2>
      <Sub className="mt-3 max-w-3xl">
        Indicator of Compromise: bir sistemin ele geçirildiğine işaret eden gözlemlenebilir
        veri. Üç sınıfa ayrılır; yukarı çıktıkça saldırgana maliyeti artar.
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
              <th style={{ width: "20%" }}>Sınıf</th>
              <th style={{ width: "34%" }}>Örnekler</th>
              <th style={{ width: "20%" }}>Ömür</th>
              <th>Savunma değeri</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="font-semibold text-white">Atomik</div>
                <div className="text-[11px] text-gray-500 font-mono">tek parça veri</div>
              </td>
              <td><span className="font-mono text-[11px]">IP 198.51.100.7 · evil-domain.xyz · zararlı e-posta adresi</span></td>
              <td><span className="sgbh-pill sgbh-pill-a">Kısa</span></td>
              <td>Hızlı engellenir ama saldırgan kolayca yenisini üretir.</td>
            </tr>
            <tr>
              <td>
                <div className="font-semibold text-white">Hesaplı</div>
                <div className="text-[11px] text-gray-500 font-mono">türetilmiş</div>
              </td>
              <td><span className="font-mono text-[11px]">SHA-256 dosya hash&apos;i · regex imzası · YARA kuralı</span></td>
              <td><span className="sgbh-pill sgbh-pill-c">Orta</span></td>
              <td>Belirli örneği yakalar; tek bit değişince hash kayar.</td>
            </tr>
            <tr>
              <td>
                <div className="font-semibold text-white">Davranışsal</div>
                <div className="text-[11px] text-gray-500 font-mono">TTP / IOA</div>
              </td>
              <td><span className="font-mono text-[11px]">&quot;Word&apos;ün PowerShell başlatması&quot; · olağandışı C2 trafiği</span></td>
              <td><span className="sgbh-pill sgbh-pill-i">Uzun</span></td>
              <td>En kıymetlisi: aktörün yöntemini hedefler, kolay değişmez.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-[11px] text-gray-500"
      >
        Ayrım: IOC geçmişe bakar (&quot;ele geçirildi mi?&quot;); IOA — Indicator of Attack — saldırı sürerken davranışı yakalar.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 11. Pyramid of Pain ───── */
  () => (
    <SlideShell>
      <Eyebrow>Pyramid of Pain · David Bianco</Eyebrow>
      <H2 className="mb-2">Hangi göstergeyi engellersen saldırgan ne kadar acı çeker?</H2>
      <Sub className="max-w-3xl mb-4">
        Aşağıdaki gösterge ne kadar yukarıdaysa, onu kör etmen saldırganı o kadar zorlar.
        Hash engellemek dakikalık iş; TTP&apos;sini tespit etmek aylarca yatırımını boşa çıkarır.
      </Sub>
      <PyramidOfPain />
    </SlideShell>
  ),

  /* ───── 12. IOC sorgulama terminal ───── */
  () => (
    <SlideShell>
      <Eyebrow>Canlı · bir IOC&apos;yu zenginleştir</Eyebrow>
      <H2 className="mb-2">Şüpheli hash ile ne yapılır?</H2>
      <Sub className="max-w-3xl mb-6">
        Bir analist eline geçen göstergeyi açık kaynak ve ticari beslemelerle &quot;zenginleştirir&quot;
        (enrichment): bu dosya bilinen bir zararlıya mı ait, hangi kampanyaya bağlı?
        Aşağıdaki çıktı temsilîdir.
      </Sub>
      <TerminalWindow title="analyst@soc:~ — threat intel lookup">
        <div>
          <span className="sgbh-term-prompt">analyst@soc</span>
          <span className="sgbh-term-dim">:~$</span>{" "}
          <span className="sgbh-term-cmd">sha256sum invoice_2026.docm</span>
        </div>
        <div className="sgbh-term-dim break-all">3f1a...c9e2  invoice_2026.docm</div>
        <div className="mt-2">
          <span className="sgbh-term-prompt">analyst@soc</span>
          <span className="sgbh-term-dim">:~$</span>{" "}
          <span className="sgbh-term-cmd">ioc-lookup --hash 3f1a...c9e2</span>
        </div>
        <div className="sgbh-term-dim">[*] Açık kaynak beslemeleri sorgulanıyor...</div>
        <div><span className="sgbh-term-err">[!] Verdict: MALICIOUS</span>{" "}<span className="sgbh-term-dim">(52 / 70 motor)</span></div>
        <div><span className="sgbh-term-warn">    Family   :</span>{" "}<span className="sgbh-term-dim">Emotet downloader (örnek)</span></div>
        <div><span className="sgbh-term-warn">    ATT&amp;CK   :</span>{" "}<span className="sgbh-term-ip">T1566.001 → T1059.001 → T1041</span></div>
        <div><span className="sgbh-term-warn">    First seen:</span>{" "}<span className="sgbh-term-dim">2026-06-18</span></div>
        <div><span className="sgbh-term-warn">    C2 host  :</span>{" "}<span className="sgbh-term-ip">198.51.100.7</span>{" "}<span className="sgbh-term-err">(engellenmeli)</span></div>
        <div className="sgbh-term-dim mt-1">[+] 3 ilişkili IOC MISP olayına eklendi.</div>
        <div className="mt-2">
          <span className="sgbh-term-prompt">analyst@soc</span>
          <span className="sgbh-term-dim">:~$</span>{" "}
          <span className="sgbh-term-cmd">_</span>
          <span className="animate-pulse">█</span>
        </div>
      </TerminalWindow>
    </SlideShell>
  ),

  /* ───── 13. İstihbarat paylaşımı (STIX/TAXII, MISP) ───── */
  () => (
    <SlideShell>
      <Eyebrow>Paylaşım · tek başına savunma yoktur</Eyebrow>
      <H2>İstihbaratı makine okuyacak biçimde paylaş</H2>
      <Sub className="mt-3 max-w-3xl">
        Bir kurumun gördüğü saldırı, diğerinin erken uyarısıdır. Bunun için göstergeler
        standart, otomatik işlenebilir formatlarda paylaşılır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <FeatureCard
          icon={FileText}
          title="STIX"
          desc="Structured Threat Information eXpression: tehdidi (aktör, gösterge, ilişki) tanımlayan ortak JSON şeması."
          accent="#06b6d4"
          delay={0.1}
        />
        <FeatureCard
          icon={Network}
          title="TAXII"
          desc="STIX verisini taşıyan iletim protokolü; abone ol-yayınla mantığıyla beslemeleri otomatik çeker."
          accent="#fbbf24"
          delay={0.18}
        />
        <FeatureCard
          icon={Database}
          title="MISP"
          desc="Açık kaynak tehdit paylaşım platformu; topluluklar olayları ve IOC&apos;leri karşılıklı paylaşır, korelasyon yapar."
          accent="#34d399"
          delay={0.26}
        />
        <FeatureCard
          icon={Globe}
          title="Sektörel ISAC / CERT"
          desc="Bankacılık, enerji gibi sektörlerin paylaşım merkezleri; Türkiye&apos;de USOM/CERT ulusal koordinasyonu yürütür."
          accent="#a78bfa"
          delay={0.34}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 sgbh-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3 max-w-4xl"
      >
        <Scale className="w-4 h-4 text-[#a78bfa] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Hukuk notu:</span> Paylaşılan göstergeler kişisel veri içerebilir (örn. IP).
          Paylaşımda TLP (Traffic Light Protocol) etiketleri ve KVKK&apos;ya uygunluk gözetilmelidir.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 14. Bölüm 3 — Bug Bounty ───── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Bug Bounty Ekosistemi"
      subtitle="Dünya çapında binlerce araştırmacının zafiyetleri yasal, ödüllü ve kontrollü biçimde bulup bildirdiği kitle kaynaklı güvenlik modeli."
      bgGradient="linear-gradient(135deg,#22c55e,#15803d)"
      shadow="0 30px 80px -20px rgba(34,197,94,0.55)"
      icon={<Bug className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 15. Bug bounty nasıl çalışır + platformlar ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bug bounty · model ve oyuncular</Eyebrow>
      <H2>Kurum açar, araştırmacı bulur, platform aracılık eder</H2>
      <Sub className="mt-3 max-w-3xl">
        Kurum bir &quot;program&quot; tanımlar: kapsam (scope), kurallar ve ödül tablosu. Araştırmacılar
        bu sınırlar içinde zafiyet arar; geçerli bulgular önem derecesine göre ödüllendirilir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#34d399]">
            <Award className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">İki büyük platform</span>
          </div>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-3"><Bug className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" /><span><span className="text-white font-semibold">HackerOne</span> — geniş program portföyü, triyaj ekibi, itibar (reputation) puanı.</span></li>
            <li className="flex gap-3"><Bug className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" /><span><span className="text-white font-semibold">Bugcrowd</span> — kalabalık kaynaklı testler, VRT önem sınıflandırması, yönetilen programlar.</span></li>
            <li className="flex gap-3"><ShieldCheck className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" /><span>Her ikisi de kapsam, kurallar ve ödülü standartlaştırarak hukuki riski azaltır.</span></li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#06b6d4]">
            <Layers className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Akış · 5 adım</span>
          </div>
          <ol className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-3"><span className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-[10px] text-gray-500 font-mono flex-shrink-0">1</span>Kapsamı oku — hangi alan adı/uygulama dahil?</li>
            <li className="flex gap-3"><span className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-[10px] text-gray-500 font-mono flex-shrink-0">2</span>Zafiyeti bul ve doğrula (PoC üret).</li>
            <li className="flex gap-3"><span className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-[10px] text-gray-500 font-mono flex-shrink-0">3</span>Net, tekrarlanabilir rapor yaz.</li>
            <li className="flex gap-3"><span className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-[10px] text-gray-500 font-mono flex-shrink-0">4</span>Triyaj: geçerlilik ve önem doğrulanır.</li>
            <li className="flex gap-3"><span className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-[10px] text-gray-500 font-mono flex-shrink-0">5</span>Düzeltme + ödül; çoğu zaman CVE.</li>
          </ol>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 16. Zafiyet raporu mockup ───── */
  () => (
    <SlideShell>
      <Eyebrow>İyi bir rapor neye benzer?</Eyebrow>
      <H2 className="mb-2">Bulgudan ödüle: net rapor kazandırır</H2>
      <Sub className="max-w-3xl mb-6">
        Triyaj ekibi sadece zafiyeti değil, raporun kalitesini de değerlendirir. Özet, tekrarlanabilir
        adım (PoC) ve etki üçlüsü olmadan geçerli bir bulgu bile reddedilebilir.
      </Sub>
      <BountyReport />
    </SlideShell>
  ),

  /* ───── 17. Sorumlu açıklama & hukuki çerçeve ───── */
  () => (
    <SlideShell>
      <Eyebrow>Sorumlu açıklama · hukukun sınırı</Eyebrow>
      <H2>Aynı eylem: izinle araştırma, izinsiz suç</H2>
      <Sub className="mt-3 max-w-3xl">
        Bir sistemde zafiyet aramak teknik olarak &quot;sisteme erişim&quot;tir. İzin ve kapsam olmadan
        bu, TCK 243-245 kapsamında suç sayılır. Bug bounty&apos;nin değeri tam da bu izni
        kurallı ve yasal kılmasıdır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#34d399]">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Yasal · sorumlu</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Yayımlanmış kapsam ve kurallara uy.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Veriyi sızdırma; kanıtı asgari düzeyde topla.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Önce satıcıya bildir; düzeltme süresi tanı (CVD).</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />&quot;Safe harbor&quot; maddesi varsa yasal koruma sağlar.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card-warn rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#f87171]">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Yasadışı · sınırı aşan</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Kapsam dışı sistemi test etmek.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Gerçek kullanıcı verisini indirmek/yaymak.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Zafiyeti gizleyip şantaj (extortion) yapmak.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />İzinsiz açıklama (full disclosure) ile riske atmak.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 18. Bu hafta · uygulamalı görev ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı görev</Eyebrow>
      <H2>Bir saldırıyı ATT&amp;CK&apos;e oturt, IOC&apos;sini çıkar</H2>
      <Sub className="mt-3 max-w-3xl">
        Tamamı kamuya açık kaynak ve sanal makine üzerinde; gerçek bir sisteme dokunulmaz.
        Bir sonraki derse bu dört adımı yapmış ve kısa bir not getirmiş gelmen bekleniyor.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: FileText, title: "Bir tehdit raporu seç", desc: "Kamuya açık bir vendor/CERT raporu al; saldırının özetini 3 cümlede çıkar.", accent: "#06b6d4" },
          { icon: Crosshair, title: "ATT&apos;CK&apos;e eşle", desc: "Rapordaki adımları taktik/teknik (T-kodu) olarak işaretle; Navigator katmanı oluştur.", accent: "#fbbf24" },
          { icon: Fingerprint, title: "IOC&apos;leri sınıflandır", desc: "Rapordaki hash/IP/domain&apos;leri atomik-hesaplı-davranışsal olarak ayır; Pyramid&apos;de yerleştir.", accent: "#34d399" },
          { icon: Bug, title: "Bir bug bounty kapsamı oku", desc: "HackerOne/Bugcrowd&apos;da herkese açık bir programın policy + scope sayfasını incele; izin sınırını not et.", accent: "#a78bfa" },
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
        className="mt-6 sgbh-card-warn rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <AlertTriangle className="w-4 h-4 text-[#f87171] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Sınır:</span> Yalnızca kapsam içi, izinli sistemlerde. Kapsam dışı bir hedefi
          test etmek &quot;araştırma&quot; değil, TCK 243-245 kapsamında suçtur.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 19. Sıradaki hafta önizleme + kapanış ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8"
          style={{ background: "linear-gradient(135deg,#06b6d4,#0e7490)", boxShadow: "0 30px 80px -20px rgba(6,182,212,0.6)" }}
        >
          <ShieldCheck className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>13. hafta tamamlandı · sıradaki: Dijital Adli Bilişim</Eyebrow>
        <H1>
          <span className="sgbh-shimmer-soft">İz sürmekten kanıta</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta saldırganın izlerini istihbarata çevirdik. Hafta 14&apos;te aynı izleri
          mahkemede geçerli <span className="text-white">delile</span> dönüştürüyoruz: olay yeri
          imajı, hash doğrulaması ve kesintisiz delil zinciri (chain of custody).
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
          <FeatureCard icon={Search} title="Delil toplama" desc="Disk/bellek imajı; uçucu veriden başla." accent="#06b6d4" delay={0.1} />
          <FeatureCard icon={Hash} title="Bütünlük" desc="Hash ile delilin değişmediğini kanıtla." accent="#34d399" delay={0.18} />
          <FeatureCard icon={Layers} title="Delil zinciri" desc="Kim, ne zaman, neye dokundu — kesintisiz kayıt." accent="#a78bfa" delay={0.26} />
          <FeatureCard icon={Scale} title="Hukuki kabul" desc="CMK çerçevesinde delilin mahkemede geçerliliği." accent="#fbbf24" delay={0.34} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="sgbh-card rounded-xl p-5">
            <Calendar className="w-5 h-5 text-[#06b6d4] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Ders saati</div>
            <div className="text-white font-semibold">Çarşamba</div>
            <div className="text-sm text-gray-400">13:30 — 17:00</div>
          </div>
          <div className="sgbh-card rounded-xl p-5">
            <Target className="w-5 h-5 text-[#a78bfa] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">ATT&amp;CK katmanı</div>
            <div className="text-sm text-gray-400">görevi tamamlanmış getir</div>
          </div>
          <div className="sgbh-card rounded-xl p-5">
            <Brain className="w-5 h-5 text-[#34d399] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">Kısa not</div>
            <div className="text-sm text-gray-400">eşleme + IOC sınıfı</div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 text-xs font-mono text-gray-600 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>İzinsiz test/erişim yok · yalnızca kapsam içi, yasal araştırma</span>
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
          BVA 2205 · 13. Hafta · Tehdit İstihbaratı
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
