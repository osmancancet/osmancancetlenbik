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
  Laptop,
  Activity,
  ScrollText,
  Eye,
  Bell,
  Bug,
  Skull,
  FileSearch,
  Binary,
  Hash,
  Terminal,
  Layers,
  GitBranch,
  Network,
  AlertTriangle,
  Cpu,
  Database,
  Calendar,
  Target,
  Brain,
  Sparkles,
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

/* Saldırı zinciri: dosya çalışmasından kalıcılık + C2'ye ─ EDR'ın gözlediği davranış zinciri */
function KillChain() {
  const steps = [
    {
      n: 1,
      icon: FileSearch,
      stage: "Teslimat",
      detail: "fatura.pdf.exe e-postayla gelir, kullanıcı çift tıklar.",
      color: "#06b6d4",
    },
    {
      n: 2,
      icon: Terminal,
      stage: "Çalıştırma",
      detail: "winword.exe → cmd.exe → powershell.exe süreç ağacı doğar.",
      color: "#fbbf24",
    },
    {
      n: 3,
      icon: GitBranch,
      stage: "Kalıcılık",
      detail: "Registry Run anahtarı veya zamanlanmış görev eklenir.",
      color: "#f87171",
    },
    {
      n: 4,
      icon: Network,
      stage: "C2 iletişimi",
      detail: "Bilinmeyen bir IP'ye 443/tcp üzerinden çıkış (beacon).",
      color: "#a78bfa",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="sgbh-card rounded-xl p-6 max-w-4xl mx-auto"
    >
      <div className="space-y-4">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.2 }}
            className="flex items-center gap-4"
          >
            <span className="w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center text-[10px] text-gray-400 font-mono flex-shrink-0">
              {s.n}
            </span>
            <div
              className="flex-1 rounded-lg px-4 py-3 flex items-center gap-3"
              style={{ background: `${s.color}12`, border: `1px solid ${s.color}40` }}
            >
              <s.icon className="w-5 h-5 flex-shrink-0" style={{ color: s.color }} />
              <span
                className="font-mono text-sm font-bold px-2 py-0.5 rounded"
                style={{ background: `${s.color}22`, color: s.color }}
              >
                {s.stage}
              </span>
              <span className="text-sm text-gray-300">{s.detail}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-5 text-[11px] text-gray-500 font-mono">
        EDR tek tek adıma değil, bu <span className="text-[#67e8f9]">zincirin tamamına</span> bakar:
        Office&apos;ten PowerShell&apos;e + ardından bilinmeyen C2&apos;ye = yüksek güven uyarısı.
      </div>
    </motion.div>
  );
}

/* Sysmon olay günlüğü (Event Viewer / EVTX benzeri görünüm) */
function SysmonWindow() {
  const rows = [
    { id: 1, eid: "1", evt: "Process Create", img: "C:\\...\\winword.exe", parent: "explorer.exe", cls: "sgbh-evt-norm" },
    { id: 2, eid: "11", evt: "File Create", img: "C:\\Users\\...\\Temp\\fatura.pdf.exe", parent: "winword.exe", cls: "sgbh-evt-susp" },
    { id: 3, eid: "1", evt: "Process Create", img: "C:\\...\\cmd.exe", parent: "winword.exe", cls: "sgbh-evt-susp" },
    { id: 4, eid: "1", evt: "Process Create", img: "C:\\...\\powershell.exe -enc JABz...", parent: "cmd.exe", cls: "sgbh-evt-mal sgbh-evt-sel" },
    { id: 5, eid: "13", evt: "Registry Set", img: "HKCU\\...\\Run\\Updater", parent: "powershell.exe", cls: "sgbh-evt-mal" },
    { id: 6, eid: "3", evt: "Network Connect", img: "203.0.113.77 : 443", parent: "powershell.exe", cls: "sgbh-evt-mal" },
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
          <span>Event Viewer — Microsoft-Windows-Sysmon/Operational</span>
        </div>
      </div>
      <table className="sgbh-evt">
        <thead>
          <tr>
            <th style={{ width: "6%" }}>No.</th>
            <th style={{ width: "8%" }}>Event ID</th>
            <th style={{ width: "22%" }}>Olay</th>
            <th style={{ width: "34%" }}>Image / Hedef</th>
            <th>Üst süreç</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className={r.cls}>
              <td className="text-gray-500">{r.id}</td>
              <td className="font-bold text-white">{r.eid}</td>
              <td className="text-gray-300">{r.evt}</td>
              <td style={{ color: "#a78bfa" }}>{r.img}</td>
              <td className="text-gray-400">{r.parent}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-4 py-2 text-[10px] font-mono text-gray-500 border-t border-white/5">
        Seçili: #4 · Event ID 1 süreç, 3 ağ, 11 dosya, 13 registry · Renk = şüphe seviyesi
      </div>
    </motion.div>
  );
}

/* EDR uyarı detay paneli */
function EdrAlert() {
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
          <Bell className="w-3.5 h-3.5 text-red-400" />
          <span>EDR Konsolu — Uyarı #A-2026-0719</span>
        </div>
      </div>
      <div className="sgbh-alert">
        <div>
          <span className="sgbh-alert-key">severity </span>:{" "}
          <span className="sgbh-alert-bad">CRITICAL</span>
        </div>
        <div>
          <span className="sgbh-alert-key">technique</span>:{" "}
          <span className="sgbh-alert-val">T1059.001 — PowerShell (MITRE ATT&amp;CK)</span>
        </div>
        <div>
          <span className="sgbh-alert-key">host     </span>:{" "}
          <span className="sgbh-alert-val">PC-MUHASEBE-04</span>
        </div>
        <div>
          <span className="sgbh-alert-key">user     </span>:{" "}
          <span className="sgbh-alert-val">kurum\a.yilmaz</span>
        </div>
        <div className="text-gray-600 my-1">────────────────────────────</div>
        <div>
          <span className="sgbh-alert-key">behavior </span>:{" "}
          <span className="sgbh-alert-val">winword.exe</span> →{" "}
          <span className="sgbh-alert-val">cmd.exe</span> →{" "}
          <span className="sgbh-alert-bad">powershell -enc</span>
        </div>
        <div>
          <span className="sgbh-alert-key">network  </span>:{" "}
          <span className="sgbh-alert-bad">203.0.113.77:443</span>{" "}
          <span className="text-gray-500">(itibar: bilinmeyen)</span>
        </div>
        <div>
          <span className="sgbh-alert-key">sha256   </span>:{" "}
          <span className="text-[#fbbf24]">9f2b...c14e</span>{" "}
          <span className="text-gray-500">(VT: 47/72)</span>
        </div>
        <div className="text-gray-600 my-1">────────────────────────────</div>
        <div>
          <span className="sgbh-alert-key">action   </span>:{" "}
          <span className="text-[#86efac]">[ İzole et ]</span>{" "}
          <span className="text-[#86efac]">[ Süreci sonlandır ]</span>{" "}
          <span className="text-gray-500">[ Yok say ]</span>
        </div>
      </div>
      <div className="px-4 py-3 text-[11px] text-gray-400 border-t border-white/5 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
        <span>
          Tek bir imza değil; <span className="text-white">davranış + ağ + dosya itibarı</span> birleşip
          yüksek güvenli uyarı üretti. Analist tek tıkla makineyi ağdan izole edebilir.
        </span>
      </div>
    </motion.div>
  );
}

/* Statik analiz terminali — strings & hash */
function StaticAnalysisTerminal() {
  return (
    <TerminalWindow title="analyst@rehber-vm:~ — statik analiz">
      <div>
        <span className="sgbh-term-prompt">analyst@rehber-vm</span>
        <span className="sgbh-term-dim">:~$</span>{" "}
        <span className="sgbh-term-cmd">sha256sum ornek.bin</span>
      </div>
      <div className="sgbh-term-warn break-all">9f2b1d8e...c14e  ornek.bin</div>
      <div className="mt-2">
        <span className="sgbh-term-prompt">analyst@rehber-vm</span>
        <span className="sgbh-term-dim">:~$</span>{" "}
        <span className="sgbh-term-cmd">file ornek.bin</span>
      </div>
      <div className="sgbh-term-dim">ornek.bin: PE32 executable (GUI) Intel 80386, for MS Windows</div>
      <div className="mt-2">
        <span className="sgbh-term-prompt">analyst@rehber-vm</span>
        <span className="sgbh-term-dim">:~$</span>{" "}
        <span className="sgbh-term-cmd">strings -n 8 ornek.bin | grep -Ei &apos;http|reg|cmd&apos;</span>
      </div>
      <div className="sgbh-term-err">http://203.0.113.77/gate.php</div>
      <div className="sgbh-term-err">powershell -enc JABzAD0A...</div>
      <div className="sgbh-term-err">Software\\Microsoft\\Windows\\CurrentVersion\\Run</div>
      <div className="sgbh-term-dim">cmd.exe /c schtasks /create /tn Updater</div>
      <div className="mt-2">
        <span className="sgbh-term-prompt">analyst@rehber-vm</span>
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
        <Eyebrow>BVA 2205 · 7. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="sgbh-shimmer">Endpoint Güvenliği</span>
          <br />
          <span className="text-white/90">ve Malware Analizi</span>
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Uç noktada ne çalıştı, ne yazdı, nereye bağlandı? Sysmon ile görür,
          EDR ile yakalar, statik analizle anlarız.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={ScrollText}
            title="Sysmon · Görünürlük"
            desc="Süreç, ağ, dosya ve registry olaylarını ayrıntılı kayda alan telemetri."
            delay={0.3}
            accent="#06b6d4"
          />
          <FeatureCard
            icon={ShieldAlert}
            title="EDR · Mantık"
            desc="İmza değil davranış: süreç ağacını izleyip anomaliyi uyarıya çevirir."
            delay={0.45}
            accent="#fbbf24"
          />
          <FeatureCard
            icon={FileSearch}
            title="Statik Analiz"
            desc="Dosyayı çalıştırmadan hash, string, PE başlığı ve import&apos;lara bakmak."
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
          Çarşamba 13:30 — 17:00 · Uygulamalı lab (Windows VM + Sysmon + REMnux)
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. Geçen hafta → bu hafta köprü ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · ağdan uç noktaya</Eyebrow>
      <H2>Ağı dinledik; şimdi saldırının indiği makineye iniyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Önceki haftalarda saldırıyı ağ üzerinden gördük. Ama saldırgan eninde sonunda bir
        <span className="text-white"> uç noktaya</span> (laptop, sunucu) iner ve orada kod çalıştırır.
        Bu hafta o makinede ne olduğunu görmenin ve şüpheli bir dosyayı incelemenin temellerini kuruyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#67e8f9]">
            <Network className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Ağ görünürlüğü</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Paketi, portu, oturumu görür.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Şifreli trafikte içerik görünmez olur.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Makinenin içinde ne çalıştığını bilmez.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <Laptop className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Uç nokta görünürlüğü</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Hangi süreç hangi süreci başlattı?</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Şifreli çıkışı bile süreç düzeyinde yakalar.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Dosya, registry, kalıcılık izleri burada görünür.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 3. Dersin akışı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: görünürlük → tespit mantığı → dosyayı çözmek</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce uç noktada veri toplayan Sysmon&apos;u kuruyoruz; sonra EDR&apos;ın bu veriyi nasıl uyarıya
        çevirdiğini görüyoruz; en son şüpheli bir dosyayı çalıştırmadan incelemeyi öğreniyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Endpoint & Sysmon", items: ["Endpoint güvenliği nedir", "Telemetri & Event ID&apos;ler", "Süreç ağacı izleme"], icon: ScrollText, accent: "#06b6d4" },
          { range: "02", title: "EDR Mantığı", items: ["İmza vs davranış", "MITRE ATT&CK eşleme", "Uyarı & otomatik müdahale"], icon: ShieldAlert, accent: "#fbbf24" },
          { range: "03", title: "Statik Analiz", items: ["Hash & VirusTotal", "strings & IOC çıkarma", "PE başlığı & import tablosu"], icon: FileSearch, accent: "#34d399" },
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

  /* ───── 4. Bölüm 1 — Endpoint & Sysmon ───── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="Uç Nokta Görünürlüğü: Sysmon"
      subtitle="Göremediğin şeyi savunamazsın. Sysmon, Windows&apos;ta olup biteni saldırgandan çok daha ayrıntılı kayda alan ücretsiz bir telemetri aracıdır."
      bgGradient="linear-gradient(135deg,#06b6d4,#0e7490)"
      shadow="0 30px 80px -20px rgba(6,182,212,0.6)"
      icon={<ScrollText className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 5. Endpoint güvenliği nedir ───── */
  () => (
    <SlideShell>
      <Eyebrow>Kavram · uç nokta katmanı</Eyebrow>
      <H2 className="mb-2">Antivirüsten EDR&apos;a: üç kuşak</H2>
      <Sub className="max-w-3xl mb-6">
        Uç nokta (endpoint) güvenliği, kullanıcı cihazlarını koruyan kontroller bütünüdür.
        Yıllar içinde &quot;dosyaya bak&quot;tan &quot;davranışa bak&quot;a evrildi.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: Shield,
            title: "Klasik Antivirüs (AV)",
            tag: "İmza tabanlı",
            desc: "Bilinen zararlının hash/parmak izini eşleştirir. Yeni veya değiştirilmiş zararlıyı (0-day, polimorfik) kaçırır.",
            color: "#94a3b8",
          },
          {
            icon: ShieldCheck,
            title: "Yeni Nesil AV (NGAV)",
            tag: "Sezgisel + ML",
            desc: "Dosya özelliklerini ve davranış kalıplarını makine öğrenmesiyle puanlar. İmza olmadan da şüpheliyi yakalayabilir.",
            color: "#06b6d4",
          },
          {
            icon: ShieldAlert,
            title: "EDR / XDR",
            tag: "Davranış + müdahale",
            desc: "Sürekli telemetri toplar, süreç zincirini izler, uyarı üretir ve makineyi izole edip süreci sonlandırabilir.",
            color: "#fbbf24",
          },
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
            <div className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: c.color }}>{c.tag}</div>
            <h3 className="text-base font-semibold text-white mb-2">{c.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{c.desc}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 sgbh-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3 max-w-4xl"
      >
        <Brain className="w-4 h-4 text-[#06b6d4] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Anahtar fikir:</span> Kuşaklar birbirini iptal etmez, katmanlanır.
          Modern bir EDR içinde hâlâ imza ve ML bileşeni vardır; üstüne davranış ve müdahale eklenir.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 6. Sysmon Event ID tablosu ───── */
  () => (
    <SlideShell>
      <Eyebrow>Sysmon · sık kullanılan Event ID&apos;ler</Eyebrow>
      <H2>Hangi olay, ne anlatır?</H2>
      <Sub className="mt-3 max-w-3xl">
        Sysmon yapılandırma dosyasıyla (config XML) hangi olayların kaydedileceğini seçersin.
        Bir avcı (threat hunter) için en kıymetli birkaç Event ID:
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
              <th style={{ width: "12%" }}>Event ID</th>
              <th style={{ width: "28%" }}>Olay</th>
              <th>Neden önemli?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="font-mono text-[#67e8f9]">1</span></td>
              <td>Process Create</td>
              <td>Komut satırı + üst süreç dahil. Süreç ağacını kurmanın temeli (Office&apos;ten PowerShell gibi).</td>
            </tr>
            <tr>
              <td><span className="font-mono text-[#67e8f9]">3</span></td>
              <td>Network Connection</td>
              <td>Hangi sürecin hangi IP/porta bağlandığı. C2 trafiğini sürece bağlar.</td>
            </tr>
            <tr>
              <td><span className="font-mono text-[#67e8f9]">7</span></td>
              <td>Image Loaded (DLL)</td>
              <td>İmzasız/şüpheli DLL yüklemeleri; DLL side-loading tespitinde kullanılır.</td>
            </tr>
            <tr>
              <td><span className="font-mono text-[#67e8f9]">11</span></td>
              <td>File Create</td>
              <td>Diske düşen yeni dosyalar; dropper&apos;ın bıraktığı yükü yakalar.</td>
            </tr>
            <tr>
              <td><span className="font-mono text-[#67e8f9]">13</span></td>
              <td>Registry Value Set</td>
              <td>Run anahtarı gibi kalıcılık (persistence) izleri burada görünür.</td>
            </tr>
            <tr>
              <td><span className="font-mono text-[#67e8f9]">22</span></td>
              <td>DNS Query</td>
              <td>Hangi sürecin hangi alan adını çözdüğü; alan-adı tabanlı C2&apos;yi açığa çıkarır.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-[11px] text-gray-500 font-mono"
      >
        Kayıtlar <span className="text-[#fbbf24]">Microsoft-Windows-Sysmon/Operational</span> günlüğüne yazılır; SIEM&apos;e iletilebilir.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 7. Sysmon canlı görünüm ───── */
  () => (
    <SlideShell>
      <Eyebrow>Sysmon · canlı olay akışı</Eyebrow>
      <H2 className="mb-2">Aynı saldırı, telemetride satır satır</H2>
      <Sub className="max-w-3xl mb-6">
        Aşağıda zararlı bir Office ekinin açılışından C2 bağlantısına kadar olan zincir Sysmon olaylarıyla
        görünüyor. Tek başına her satır masum olabilir; <span className="text-white">birlikte</span> bir saldırı anlatır.
      </Sub>
      <SysmonWindow />
    </SlideShell>
  ),

  /* ───── 8. Bölüm 2 — EDR Mantığı ───── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="EDR Mantığı: İmzadan Davranışa"
      subtitle="EDR tek bir dosyaya değil, olaylar arasındaki ilişkiye bakar. Office&apos;ten doğan bir PowerShell ardından bilinmeyen bir IP&apos;ye çıkarsa, hiçbiri tek başına zararlı görünmese de zincir alarmı tetikler."
      bgGradient="linear-gradient(135deg,#f59e0b,#b45309)"
      shadow="0 30px 80px -20px rgba(245,158,11,0.55)"
      icon={<ShieldAlert className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 9. İmza vs davranış ───── */
  () => (
    <SlideShell>
      <Eyebrow>İki tespit yaklaşımı</Eyebrow>
      <H2>İmza neyi kaçırır, davranış neyi yakalar?</H2>
      <Sub className="mt-3 max-w-3xl">
        İmza tabanlı tespit hızlı ve kesindir ama yalnızca daha önce görülmüş zararlıyı bulur.
        Davranış tabanlı tespit, &quot;ne yaptığına&quot; bakar; bu yüzden hiç görülmemiş zararlıyı da yakalayabilir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#94a3b8]">
            <Hash className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">İmza tabanlı</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Hızlı, düşük yanlış-pozitif, az kaynak.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />0-day ve polimorfik zararlıyı kaçırır.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Tek bayt değişince hash kaçar.</li>
          </ul>
          <div className="mt-3 font-mono text-[10px] bg-black/40 rounded p-2.5 border border-white/5 text-gray-400">
            if sha256(dosya) in <span className="text-[#f87171]">kara_liste</span>: engelle
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fbbf24]">
            <Activity className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Davranış tabanlı</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Bilinmeyen zararlıyı da yakalayabilir.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Dosyasız (fileless) saldırıyı görür.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Daha çok yanlış-pozitif, daha çok ayar ister.</li>
          </ul>
          <div className="mt-3 font-mono text-[10px] bg-black/40 rounded p-2.5 border border-white/5 text-gray-400">
            if <span className="text-[#fbbf24]">winword</span> spawns <span className="text-[#fbbf24]">powershell -enc</span>: uyar
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 10. EDR uyarı paneli ───── */
  () => (
    <SlideShell>
      <Eyebrow>EDR konsolu · tek bir uyarı</Eyebrow>
      <H2 className="mb-2">Telemetri uyarıya nasıl dönüşür?</H2>
      <Sub className="max-w-3xl mb-6">
        EDR, Sysmon&apos;a benzer telemetriyi sürekli toplar; şüpheli zinciri bir
        <span className="text-white"> MITRE ATT&amp;CK</span> tekniğine eşler ve analiste eyleme hazır bir uyarı sunar.
      </Sub>
      <EdrAlert />
    </SlideShell>
  ),

  /* ───── 11. Saldırı zinciri (kill chain) ───── */
  () => (
    <SlideShell>
      <Eyebrow>Davranış zinciri · neden bütüne bakılır</Eyebrow>
      <H2 className="mb-2">Tek adım masum, zincir suçlu</H2>
      <Sub className="max-w-3xl mb-6">
        Bir zararlının uç noktadaki tipik yolculuğu. EDR&apos;ın gücü, bu adımları birbirine
        <span className="text-white"> bağlamasıdır</span> — ayrı ayrı görmezse alarm üretmez.
      </Sub>
      <KillChain />
    </SlideShell>
  ),

  /* ───── 12. Bölüm 3 — Statik Analiz ───── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Statik Analizin Temelleri"
      subtitle="Şüpheli dosyayı çalıştırmadan inceleriz: hash ile itibarını sorgular, string&apos;lerle niyetini, PE başlığı ve import tablosuyla yeteneklerini okuruz."
      bgGradient="linear-gradient(135deg,#22c55e,#15803d)"
      shadow="0 30px 80px -20px rgba(34,197,94,0.55)"
      icon={<FileSearch className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 13. Statik vs dinamik ───── */
  () => (
    <SlideShell>
      <Eyebrow>İki analiz türü</Eyebrow>
      <H2>Çalıştırmadan bak, sonra kontrollü çalıştır</H2>
      <Sub className="mt-3 max-w-3xl">
        Malware analizinin iki ana kolu vardır. Bu hafta güvenli ve hızlı olan
        <span className="text-white"> statik</span> analize odaklanıyoruz; dinamik analiz sandbox ve ileri tersine mühendislik gerektirir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#34d399]">
            <FileSearch className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Statik analiz</span>
          </div>
          <p className="text-sm text-gray-400 mb-3">Dosya çalıştırılmaz; içeriği incelenir.</p>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Hash, string, PE başlığı, import&apos;lar.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Güvenli ve hızlı; ilk triyaj için ideal.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Şifreli/paketlenmiş (packed) örnek gizlenebilir.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#a78bfa]">
            <Cpu className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Dinamik analiz</span>
          </div>
          <p className="text-sm text-gray-400 mb-3">Dosya izole sandbox&apos;ta çalıştırılır.</p>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Gerçek davranışı (ağ, dosya, registry) görür.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Packer&apos;ı kendi açtığı için niyeti ortaya çıkar.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />İzole ortam şart; bazı zararlı sandbox&apos;ı fark eder.</li>
          </ul>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 sgbh-card-warn rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <AlertTriangle className="w-4 h-4 text-[#f87171] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Kural:</span> Canlı zararlıyı asla günlük makinende açma.
          İnternetten yalıtılmış, anlık görüntü (snapshot) alınmış bir analiz VM&apos;i kullan.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 14. Statik analiz adımları ───── */
  () => (
    <SlideShell>
      <Eyebrow>Statik triyaj · dört temel sinyal</Eyebrow>
      <H2>Çalıştırmadan dört soru sor</H2>
      <Sub className="mt-3 max-w-3xl">
        Şüpheli bir dosyayı eline aldığında, çalıştırmadan önce bu dört sinyale bakmak çoğu zaman
        ilk kararı vermene yeter.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Hash, title: "1 · Hash & İtibar", desc: "SHA-256 al, VirusTotal gibi servislerde sorgula. Bilinen zararlıysa iş büyük ölçüde biter.", accent: "#06b6d4" },
          { icon: Binary, title: "2 · Dosya türü & başlık", desc: "file komutu / PE başlığı: gerçekten ne? fatura.pdf aslında bir PE32 çalıştırılabilir mi?", accent: "#fbbf24" },
          { icon: ScrollText, title: "3 · String&apos;ler & IOC", desc: "strings: gömülü URL, IP, alan adı, registry yolu, komut. Bunlar uzlaşma göstergesidir (IOC).", accent: "#34d399" },
          { icon: Layers, title: "4 · Import tablosu", desc: "Hangi API&apos;ler çağrılıyor? CreateRemoteThread, WinHttpOpen gibi import&apos;lar niyeti ele verir.", accent: "#a78bfa" },
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

  /* ───── 15. Statik analiz terminal ───── */
  () => (
    <SlideShell>
      <Eyebrow>Canlı çıktı · strings &amp; hash</Eyebrow>
      <H2 className="mb-2">Bir örnek, çalıştırmadan konuşuyor</H2>
      <Sub className="max-w-3xl mb-6">
        Sadece <span className="font-mono text-white">file</span>, <span className="font-mono text-white">sha256sum</span> ve
        <span className="font-mono text-white"> strings</span> ile bile bu dosyanın bir C2 adresi, bir kalıcılık anahtarı ve
        kodlanmış bir PowerShell komutu taşıdığını görüyoruz.
      </Sub>
      <StaticAnalysisTerminal />
    </SlideShell>
  ),

  /* ───── 16. Uygulamalı lab ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
      <H2>Kendi analiz makinende dört adım</H2>
      <Sub className="mt-3 max-w-3xl">
        Lab tamamen izole bir Windows VM ve bir analiz ortamında (REMnux/Kali) yürütülür. Sonraki derse
        bu dördünü yapmış ve ekran görüntülerini almış gelmen bekleniyor.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: ScrollText, title: "Sysmon kur & olay üret", desc: "Sysmon&apos;u bir config ile kur; bir cmd → powershell başlat, Event ID 1 ve 3 satırlarını bul.", accent: "#06b6d4" },
          { icon: Eye, title: "Süreç ağacını çıkar", desc: "Event Viewer&apos;da üst-alt süreç ilişkisini izleyerek 3 adımlık bir zincir çiz.", accent: "#fbbf24" },
          { icon: Hash, title: "Bir örneği hash&apos;le & sorgula", desc: "Verilen zararsız test dosyasının (örn. EICAR) SHA-256&apos;sını al ve itibar servisinde sorgula.", accent: "#34d399" },
          { icon: ListChecks, title: "IOC listesi çıkar", desc: "strings çıktısından URL/IP/registry yollarını topla, 3 IOC&apos;yi kısa bir not olarak yaz.", accent: "#a78bfa" },
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
        <Skull className="w-4 h-4 text-[#f87171] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Yalnızca izole laboratuvarında ve zararsız örneklerle.</span> Canlı zararlıyı
          internete bağlı bir makinede çalıştırmak hem kendi sistemini hem başkalarını riske atar; izin ve yalıtım şarttır.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 17. Savunan tarafı / özet ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bütünü birleştir</Eyebrow>
      <H2>Görünürlük → tespit → karar</H2>
      <Sub className="mt-3 max-w-3xl">
        Bu haftanın üç durağı tek bir savunma akışının parçaları: önce ne olduğunu gör, sonra
        anormali yakala, en son şüpheli dosyayı çözüp karar ver.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={ScrollText}
          title="Topla (Sysmon)"
          desc="Süreç, ağ, dosya ve registry telemetrisi olmadan ne avlanır ne soruşturulur. Önce görünürlük."
          accent="#06b6d4"
          delay={0.1}
        />
        <FeatureCard
          icon={ShieldAlert}
          title="Tespit et (EDR)"
          desc="Davranış zincirini MITRE ATT&CK&apos;e eşleyip eyleme hazır uyarı üret; gerekirse makineyi izole et."
          accent="#fbbf24"
          delay={0.2}
        />
        <FeatureCard
          icon={FileSearch}
          title="Çöz (Statik analiz)"
          desc="Şüpheli dosyayı çalıştırmadan hash, string ve import&apos;larla triyaj et; IOC çıkar ve paylaş."
          accent="#34d399"
          delay={0.3}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 sgbh-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3 max-w-4xl"
      >
        <Database className="w-4 h-4 text-[#06b6d4] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Not:</span> Tek bir uç nokta aracı güvenliği tamamlamaz; bu telemetri
          merkezi bir SIEM&apos;e akıp olay müdahale (incident response) süreciyle birleştiğinde değer kazanır — bunu ilerleyen haftalarda açacağız.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 18. Hafta 8 önizleme + kapanış ───── */
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
        <Eyebrow>7. hafta tamamlandı · sıradaki: Olay Müdahale &amp; SIEM</Eyebrow>
        <H1>
          <span className="sgbh-shimmer-soft">Uyarıdan Müdahaleye</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta uç noktada uyarıyı ürettik. Hafta 8&apos;de bu uyarıların merkezi bir SIEM&apos;de
          toplanmasını ve bir olayın tespit→sınırlama→temizleme adımlarıyla nasıl yönetildiğini işleyeceğiz.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
          <FeatureCard icon={Database} title="SIEM" desc="Logları merkezde topla, ilişkilendir, ara." accent="#06b6d4" delay={0.1} />
          <FeatureCard icon={Bell} title="Korelasyon" desc="Çok kaynaktan gelen sinyali tek olaya bağla." accent="#fbbf24" delay={0.18} />
          <FeatureCard icon={Target} title="Triyaj" desc="Gerçek uyarıyı gürültüden ayır, önceliklendir." accent="#a78bfa" delay={0.26} />
          <FeatureCard icon={Bug} title="Müdahale" desc="Sınırla, temizle, dersleri çıkar (IR döngüsü)." accent="#34d399" delay={0.34} />
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
            <div className="text-white font-semibold">Sysmon&apos;lu VM</div>
            <div className="text-sm text-gray-400">olay üreten labı getir</div>
          </div>
          <div className="sgbh-card rounded-xl p-5">
            <Brain className="w-5 h-5 text-[#34d399] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">Lab raporu</div>
            <div className="text-sm text-gray-400">süreç ağacı + 3 IOC</div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 text-xs font-mono text-gray-600 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Canlı zararlı yok · yalnızca izole lab ve zararsız örnek</span>
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
          BVA 2205 · 7. Hafta · Endpoint Güvenliği &amp; Malware Analizi
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
