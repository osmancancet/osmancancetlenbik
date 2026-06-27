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
  Eye,
  Activity,
  Bell,
  BellRing,
  Server,
  Database,
  Layers,
  Filter,
  Search,
  Network,
  Terminal,
  ListChecks,
  GitBranch,
  Workflow,
  FileText,
  AlertTriangle,
  Siren,
  Gauge,
  LayoutDashboard,
  Clock,
  Calendar,
  Target,
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

function CodeWindow({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
}) {
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
          <Icon className="w-3.5 h-3.5" />
          <span>{title}</span>
        </div>
      </div>
      <div className="sgbh-code">{children}</div>
    </motion.div>
  );
}

/* SOC pipeline: kaynak → toplama → normalize → kural → alarm → pano */
function SiemPipeline() {
  const stages = [
    { icon: Server, label: "Kaynaklar", sub: "Sunucu · uç · ağ · bulut", color: "#06b6d4" },
    { icon: Layers, label: "Toplama", sub: "Agent · syslog · API", color: "#22d3ee" },
    { icon: Filter, label: "Ayrıştırma", sub: "Decoder · normalize", color: "#67e8f9" },
    { icon: ListChecks, label: "Kural", sub: "Eşleştir · seviye ata", color: "#fbbf24" },
    { icon: BellRing, label: "Alarm", sub: "Olay üret · ilet", color: "#f87171" },
    { icon: LayoutDashboard, label: "Pano", sub: "Görselleştir · ara", color: "#a78bfa" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full"
    >
      <div className="flex flex-col md:flex-row items-stretch gap-2">
        {stages.map((s, i) => (
          <div key={s.label} className="flex items-center gap-2 flex-1">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.12 }}
              className="sgbh-card rounded-xl p-4 flex-1 text-center"
            >
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center mx-auto mb-3"
                style={{ background: `${s.color}18`, border: `1px solid ${s.color}55` }}
              >
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <div className="text-sm font-semibold text-white">{s.label}</div>
              <div className="text-[10px] text-gray-500 mt-1 font-mono leading-tight">{s.sub}</div>
            </motion.div>
            {i < stages.length - 1 && (
              <ChevronRight className="w-5 h-5 text-gray-600 flex-shrink-0 hidden md:block" />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* Wazuh kural eşleşme akışı: ham log → decoder → rule → alert */
function RuleMatchFlow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="sgbh-card rounded-xl p-6 w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-stretch">
        <div className="rounded-lg p-4" style={{ background: "#06b6d410", border: "1px solid #06b6d440" }}>
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#67e8f9] mb-2">1 · Ham log</div>
          <div className="font-mono text-[10.5px] text-gray-300 break-words leading-snug">
            Aug 14 09:21:03 web01 sshd[2210]: Failed password for invalid user admin from 203.0.113.7 port 51122
          </div>
        </div>
        <div className="rounded-lg p-4" style={{ background: "#67e8f910", border: "1px solid #67e8f940" }}>
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#67e8f9] mb-2">2 · Decoder</div>
          <div className="font-mono text-[10.5px] text-gray-300 leading-snug space-y-1">
            <div><span className="text-[#a78bfa]">program</span>: sshd</div>
            <div><span className="text-[#a78bfa]">srcip</span>: 203.0.113.7</div>
            <div><span className="text-[#a78bfa]">user</span>: admin</div>
          </div>
        </div>
        <div className="rounded-lg p-4" style={{ background: "#fbbf2410", border: "1px solid #fbbf2440" }}>
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#fcd34d] mb-2">3 · Kural</div>
          <div className="font-mono text-[10.5px] text-gray-300 leading-snug space-y-1">
            <div>id <span className="text-[#fcd34d]">5710</span></div>
            <div>&quot;sshd: invalid user&quot;</div>
            <div>level <span className="text-[#fdba74]">5</span></div>
          </div>
        </div>
        <div className="rounded-lg p-4" style={{ background: "#f8717112", border: "1px solid #f8717145" }}>
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#fca5a5] mb-2">4 · Alarm</div>
          <div className="font-mono text-[10.5px] text-gray-300 leading-snug space-y-1">
            <div className="flex items-center gap-1.5">
              <Siren className="w-3.5 h-3.5 text-[#f87171]" />
              <span>olay üretildi</span>
            </div>
            <div>panoya + e-postaya</div>
          </div>
        </div>
      </div>
      <div className="mt-4 text-[11px] text-gray-500 font-mono flex items-center gap-2">
        <ChevronRight className="w-3.5 h-3.5 text-[#06b6d4]" />
        Tek tek 5710 bilgi seviyesidir; aynı IP&apos;den kısa sürede çok tekrar ise kural 5712 (level 10) ile
        <span className="text-[#fca5a5]"> brute-force</span> olarak yükseltilir.
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
        <Eyebrow>BVA 2205 · 11. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="sgbh-shimmer">SOC &amp; SIEM</span>
          <br />
          <span className="text-white/90">Wazuh ile Olay İzleme</span>
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Logu topla, kuralla eşleştir, alarmı pano üzerinden gör. Dağınık kayıtları tek bir izleme merkezine taşıyoruz.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={Layers}
            title="Log Toplama"
            desc="Agent, syslog ve dosya kaynaklarından merkezi log akışı."
            delay={0.3}
            accent="#06b6d4"
          />
          <FeatureCard
            icon={ListChecks}
            title="Alarm Kuralları"
            desc="Decoder ve kurallarla olayları sınıflandır, seviye ata."
            delay={0.45}
            accent="#fbbf24"
          />
          <FeatureCard
            icon={LayoutDashboard}
            title="Dashboard"
            desc="OpenSearch tabanlı panoda ara, filtrele, görselleştir."
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
          Çarşamba 13:30 — 17:00 · Uygulamalı lab (Wazuh tek-düğüm kurulum)
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. Köprü: geçen hafta → bu hafta ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 10. haftadan 11. haftaya</Eyebrow>
      <H2>Olayı tek tek gördük; şimdi her şeyi tek yerden izliyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta olay müdahalesinin (incident response) adımlarını konuştuk. Ama bir saldırıyı yakalamak için
        önce onu <span className="text-white">görmek</span> gerekir. Tek sunucudaki log dosyasına tek tek bakmak ölçeklenmez.
        SOC&apos;un kalbi olan SIEM tam burada devreye girer.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card-warn rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fca5a5]">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">SIEM&apos;siz dünya</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Loglar 40 farklı sunucuda dağınık duruyor.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Saldırgan ortalama haftalarca fark edilmeden kalabiliyor.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Olay olunca log&apos;a bakmaya gidersin; çoğu zaten dönmüş (rotate) olur.</li>
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
            <span className="text-xs font-mono uppercase tracking-widest">SIEM ile</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Tüm loglar tek merkezde, aranabilir ve saklanabilir.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Kurallar şüpheli olayı otomatik işaretler ve alarm üretir.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Pano üzerinden saldırıyı dakikalar içinde görürsün.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 3. Bu dersin akışı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: SOC kavramı → log &amp; kural → pano</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce SOC ve SIEM&apos;in ne olduğunu netleştiriyoruz; sonra Wazuh&apos;u kurup log topluyor ve kural
        yazıyoruz; en sonunda dashboard üzerinde alarmları okuyoruz. Kapanışta küçük bir uygulamalı lab.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "SOC & SIEM Kavramı", items: ["SOC nedir, kim çalışır?", "SIEM mimarisi ve veri akışı", "Wazuh bileşenleri"], icon: Shield, accent: "#06b6d4" },
          { range: "02", title: "Log & Kural", items: ["Wazuh kurulumu", "Agent ile log toplama", "Decoder & alarm kuralları"], icon: ListChecks, accent: "#fbbf24" },
          { range: "03", title: "Dashboard", items: ["OpenSearch arayüzü", "Filtre & arama (DQL)", "Görselleştirme & olay üçgeni"], icon: LayoutDashboard, accent: "#a78bfa" },
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

  /* ───── 4. Bölüm 1 ───── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="SOC & SIEM Nedir?"
      subtitle="SOC kurumun izleme merkezidir; SIEM ise o merkezin gözüdür. Önce kavramları ve veri akışını oturtuyoruz."
      bgGradient="linear-gradient(135deg,#06b6d4,#0e7490)"
      shadow="0 30px 80px -20px rgba(6,182,212,0.6)"
      icon={<Eye className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 5. SOC nedir + roller ───── */
  () => (
    <SlideShell>
      <Eyebrow>SOC · Security Operations Center</Eyebrow>
      <H2 className="mb-2">İzleyen, tespit eden, müdahale eden ekip</H2>
      <Sub className="max-w-3xl mb-6">
        SOC; insan, süreç ve teknolojiden oluşan bir güvenlik izleme merkezidir. Genellikle üç seviyeli
        bir analist hiyerarşisiyle çalışır — alarm önce L1&apos;e düşer, gerektikçe yukarı tırmanır (escalation).
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { tier: "L1", role: "Triage Analisti", desc: "Gelen alarmları ilk inceler, yanlış pozitifi eler, gerçek olayı L2&apos;ye yükseltir.", color: "#06b6d4", icon: Bell },
          { tier: "L2", role: "Olay Müdahale", desc: "Derin analiz yapar, kapsamı belirler, sınırlama (containment) adımlarını yürütür.", color: "#fbbf24", icon: Search },
          { tier: "L3", role: "Threat Hunter", desc: "Henüz alarm üretmemiş tehdidi proaktif arar; yeni kurallar ve tespit içeriği yazar.", color: "#a78bfa", icon: Target },
        ].map((t, i) => (
          <motion.div
            key={t.tier}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="sgbh-card rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className="font-mono text-sm font-bold px-2.5 py-1 rounded"
                style={{ background: `${t.color}1a`, color: t.color, border: `1px solid ${t.color}55` }}
              >
                {t.tier}
              </span>
              <t.icon className="w-5 h-5" style={{ color: t.color }} />
            </div>
            <div className="text-base font-semibold text-white mb-2">{t.role}</div>
            <p className="text-sm text-gray-400 leading-relaxed">{t.desc}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 sgbh-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3 max-w-4xl"
      >
        <Gauge className="w-4 h-4 text-[#06b6d4] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">İki temel metrik:</span> MTTD (ortalama tespit süresi) ve MTTR (ortalama müdahale süresi).
          SOC&apos;un işi bu ikisini olabildiğince küçültmektir.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 6. SIEM nedir + 4 görev ───── */
  () => (
    <SlideShell>
      <Eyebrow>SIEM · Security Information and Event Management</Eyebrow>
      <H2 className="mb-2">SOC&apos;un dört işini tek platformda toplar</H2>
      <Sub className="max-w-3xl mb-6">
        SIEM; dağınık log&apos;ları merkezde toplayan, normalize eden, kurallarla ilişkilendiren ve görselleştiren
        yazılım katmanıdır. Dört temel yeteneği vardır:
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: Layers, title: "Toplama (Collection)", desc: "Sunucu, uç nokta, ağ cihazı ve buluttan log&apos;ları tek noktaya taşır. Agent veya syslog ile.", accent: "#06b6d4" },
          { icon: Filter, title: "Normalleştirme (Parsing)", desc: "Her kaynağın farklı formatını ortak alanlara çevirir: srcip, user, action... Böylece aranabilir olur.", accent: "#22d3ee" },
          { icon: GitBranch, title: "İlişkilendirme (Correlation)", desc: "Tekil olayları kurallarla birleştirir. 5 başarısız + 1 başarılı giriş = olası brute-force.", accent: "#fbbf24" },
          { icon: LayoutDashboard, title: "Görselleştirme & Alarm", desc: "Panolar, aramalar ve eşik aşılınca tetiklenen bildirimler. İnsanın okuyabileceği hâle getirir.", accent: "#a78bfa" },
        ].map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="sgbh-card rounded-xl p-5 flex items-start gap-4"
          >
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${c.accent}18`, border: `1px solid ${c.accent}55` }}
            >
              <c.icon className="w-5 h-5" style={{ color: c.accent }} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white mb-1">{c.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{c.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 7. SIEM veri akışı (pipeline) ───── */
  () => (
    <SlideShell>
      <Eyebrow>SIEM · uçtan uca veri akışı</Eyebrow>
      <H2 className="mb-2">Bir log&apos;un yolculuğu</H2>
      <Sub className="max-w-3xl mb-8">
        Ham bir log&apos;un kaynaktan panoya kadar geçtiği altı durak. Wazuh bu zincirin tamamını sağlayan
        açık kaynak bir platformdur — her durağı somut bir bileşenle karşılar.
      </Sub>
      <SiemPipeline />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-8 sgbh-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3 max-w-4xl mx-auto"
      >
        <Workflow className="w-4 h-4 text-[#06b6d4] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Eşleştirme:</span> toplama &amp; ayrıştırma → Wazuh agent + manager;
          kural &amp; alarm → Wazuh kural motoru; saklama &amp; pano → indexer (OpenSearch) + dashboard.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 8. Wazuh mimari bileşenleri ───── */
  () => (
    <SlideShell>
      <Eyebrow>Wazuh · üç ana bileşen</Eyebrow>
      <H2 className="mb-2">Agent · Manager · Indexer + Dashboard</H2>
      <Sub className="max-w-3xl mb-6">
        Wazuh açık kaynaklı bir SIEM/XDR platformudur. Tek-düğüm kurulumda hepsi aynı sunucuda durabilir;
        üretimde indexer ayrı düğümlere dağıtılır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: Network, title: "Wazuh Agent", port: "→ 1514/udp · 1515/tcp",
            color: "#06b6d4",
            items: ["İzlenecek her makineye kurulur", "Log toplar, FIM &amp; rootkit kontrolü yapar", "Veriyi manager&apos;a şifreli yollar"],
          },
          {
            icon: Server, title: "Wazuh Manager", port: "decoder + rule motoru",
            color: "#fbbf24",
            items: ["Gelen log&apos;ları ayrıştırır (decoder)", "Kurallarla eşleştirir, seviye atar", "Alarm üretir, indexer&apos;a iletir"],
          },
          {
            icon: Database, title: "Indexer + Dashboard", port: "OpenSearch tabanlı",
            color: "#a78bfa",
            items: ["Alarmları saklar &amp; indeksler", "Arama ve görselleştirme sunar", "Web panosu (varsayılan 443/tcp)"],
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
            <h3 className="text-lg font-semibold text-white">{c.title}</h3>
            <div className="text-[10px] font-mono mb-3 mt-1" style={{ color: c.color }}>{c.port}</div>
            <ul className="space-y-2 text-sm text-gray-400">
              {c.items.map((it) => (
                <li key={it} className="flex items-start gap-2">
                  <ChevronRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: c.color }} />
                  <span dangerouslySetInnerHTML={{ __html: it }} />
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 9. Bölüm 2 ───── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Kurulum, Log Toplama & Kurallar"
      subtitle="Wazuh&apos;u ayağa kaldır, bir agent bağla, log akıt ve şüpheli olayları yakalayan kuralları oku."
      bgGradient="linear-gradient(135deg,#f59e0b,#b45309)"
      shadow="0 30px 80px -20px rgba(245,158,11,0.55)"
      icon={<ListChecks className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 10. Kurulum — terminal ───── */
  () => (
    <SlideShell>
      <Eyebrow>Kurulum · tek-düğüm (all-in-one)</Eyebrow>
      <H2 className="mb-2">Dört komutla Wazuh ayakta</H2>
      <Sub className="max-w-3xl mb-6">
        Resmî kurulum betiği indexer, manager ve dashboard&apos;u tek sunucuya kurar. Lab için en hızlı yol budur;
        sürüm numarasını her zaman resmî dokümandan doğrula.
      </Sub>
      <TerminalWindow title="root@wazuh-lab:~ — wazuh-install.sh">
        <div>
          <span className="sgbh-term-prompt">root@wazuh-lab</span>
          <span className="sgbh-term-dim">:~#</span>{" "}
          <span className="sgbh-term-cmd">curl -sO https://packages.wazuh.com/4.x/wazuh-install.sh</span>
        </div>
        <div>
          <span className="sgbh-term-prompt">root@wazuh-lab</span>
          <span className="sgbh-term-dim">:~#</span>{" "}
          <span className="sgbh-term-cmd">sudo bash wazuh-install.sh -a</span>
          <span className="sgbh-term-dim"> # all-in-one kurulum</span>
        </div>
        <div className="sgbh-term-dim">INFO: Starting Wazuh installation assistant...</div>
        <div className="sgbh-term-ok">INFO: Wazuh indexer installation finished.</div>
        <div className="sgbh-term-ok">INFO: Wazuh manager installation finished.</div>
        <div className="sgbh-term-ok">INFO: Wazuh dashboard installation finished.</div>
        <div className="sgbh-term-warn">INFO: You can access the web interface https://&lt;wazuh-ip&gt;</div>
        <div className="sgbh-term-dim">      User: admin    Password: &lt;kurulumda üretilen parola&gt;</div>
        <div className="mt-1">
          <span className="sgbh-term-prompt">root@wazuh-lab</span>
          <span className="sgbh-term-dim">:~#</span>{" "}
          <span className="sgbh-term-cmd">systemctl status wazuh-manager</span>
        </div>
        <div className="sgbh-term-ok">● wazuh-manager.service — active (running)</div>
        <div className="mt-2">
          <span className="sgbh-term-prompt">root@wazuh-lab</span>
          <span className="sgbh-term-dim">:~#</span>{" "}
          <span className="sgbh-term-cmd">_</span>
          <span className="animate-pulse">█</span>
        </div>
      </TerminalWindow>
    </SlideShell>
  ),

  /* ───── 11. Log toplama — agent ───── */
  () => (
    <SlideShell>
      <Eyebrow>Log toplama · agent bağlama</Eyebrow>
      <H2 className="mb-2">İzlenecek makineyi manager&apos;a kaydet</H2>
      <Sub className="max-w-3xl mb-6">
        Agent kurulduktan sonra <span className="font-mono text-[#67e8f9]">ossec.conf</span> içinde manager IP&apos;si
        ve toplanacak log dosyaları tanımlanır. Aşağıda bir Linux uç noktasındaki yapılandırma parçası:
      </Sub>
      <CodeWindow title="agent · /var/ossec/etc/ossec.conf" icon={FileText}>
        <div><span className="sgbh-code-cmt">&lt;!-- Manager bağlantısı --&gt;</span></div>
        <div><span className="sgbh-code-tag">&lt;client&gt;</span></div>
        <div>{"  "}<span className="sgbh-code-tag">&lt;server&gt;</span></div>
        <div>{"    "}<span className="sgbh-code-tag">&lt;address&gt;</span><span className="sgbh-code-str">192.168.56.10</span><span className="sgbh-code-tag">&lt;/address&gt;</span></div>
        <div>{"    "}<span className="sgbh-code-tag">&lt;port&gt;</span><span className="sgbh-code-val">1514</span><span className="sgbh-code-tag">&lt;/port&gt;</span></div>
        <div>{"  "}<span className="sgbh-code-tag">&lt;/server&gt;</span></div>
        <div><span className="sgbh-code-tag">&lt;/client&gt;</span></div>
        <div className="mt-2"><span className="sgbh-code-cmt">&lt;!-- Toplanacak log dosyaları --&gt;</span></div>
        <div><span className="sgbh-code-tag">&lt;localfile&gt;</span></div>
        <div>{"  "}<span className="sgbh-code-tag">&lt;log_format&gt;</span><span className="sgbh-code-val">syslog</span><span className="sgbh-code-tag">&lt;/log_format&gt;</span></div>
        <div>{"  "}<span className="sgbh-code-tag">&lt;location&gt;</span><span className="sgbh-code-str">/var/log/auth.log</span><span className="sgbh-code-tag">&lt;/location&gt;</span></div>
        <div><span className="sgbh-code-tag">&lt;/localfile&gt;</span></div>
        <div className="mt-2"><span className="sgbh-code-tag">&lt;localfile&gt;</span></div>
        <div>{"  "}<span className="sgbh-code-tag">&lt;log_format&gt;</span><span className="sgbh-code-val">apache</span><span className="sgbh-code-tag">&lt;/log_format&gt;</span></div>
        <div>{"  "}<span className="sgbh-code-tag">&lt;location&gt;</span><span className="sgbh-code-str">/var/log/apache2/access.log</span><span className="sgbh-code-tag">&lt;/location&gt;</span></div>
        <div><span className="sgbh-code-tag">&lt;/localfile&gt;</span></div>
      </CodeWindow>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-4 text-[11px] text-gray-500 font-mono flex items-center gap-2"
      >
        <Terminal className="w-3.5 h-3.5 text-[#06b6d4]" />
        Kayıt için manager&apos;da: <span className="text-[#67e8f9]">/var/ossec/bin/manage_agents</span> · agent tarafında anahtar girilir, servis yeniden başlatılır.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 12. Alarm kuralı — XML ───── */
  () => (
    <SlideShell>
      <Eyebrow>Alarm kuralları · kural anatomisi</Eyebrow>
      <H2 className="mb-2">Bir kural neyi, ne zaman, hangi seviyede yakalar?</H2>
      <Sub className="max-w-3xl mb-6">
        Wazuh kuralları XML ile tanımlanır. Her kuralın bir <span className="font-mono text-[#67e8f9]">id</span>,
        bir <span className="font-mono text-[#67e8f9]">level</span> (0-15 önem) ve bir eşleşme koşulu vardır.
        Aşağıda kendi yazdığımız bir özel kural:
      </Sub>
      <CodeWindow title="manager · /var/ossec/etc/rules/local_rules.xml" icon={ListChecks}>
        <div><span className="sgbh-code-cmt">&lt;!-- Aynı IP&apos;den 6+ başarısız SSH girişi (zaman penceresi içinde) --&gt;</span></div>
        <div><span className="sgbh-code-tag">&lt;group</span> <span className="sgbh-code-attr">name</span>=<span className="sgbh-code-str">&quot;sshd,authentication&quot;</span><span className="sgbh-code-tag">&gt;</span></div>
        <div>{"  "}<span className="sgbh-code-tag">&lt;rule</span> <span className="sgbh-code-attr">id</span>=<span className="sgbh-code-str">&quot;100100&quot;</span> <span className="sgbh-code-attr">level</span>=<span className="sgbh-code-str">&quot;10&quot;</span> <span className="sgbh-code-attr">frequency</span>=<span className="sgbh-code-str">&quot;6&quot;</span> <span className="sgbh-code-attr">timeframe</span>=<span className="sgbh-code-str">&quot;120&quot;</span><span className="sgbh-code-tag">&gt;</span></div>
        <div>{"    "}<span className="sgbh-code-tag">&lt;if_matched_sid&gt;</span><span className="sgbh-code-val">5710</span><span className="sgbh-code-tag">&lt;/if_matched_sid&gt;</span>{"  "}<span className="sgbh-code-cmt">&lt;!-- base kural --&gt;</span></div>
        <div>{"    "}<span className="sgbh-code-tag">&lt;same_source_ip /&gt;</span></div>
        <div>{"    "}<span className="sgbh-code-tag">&lt;description&gt;</span><span className="sgbh-code-key">SSH brute-force: ayni IP&apos;den tekrarli basarisiz giris</span><span className="sgbh-code-tag">&lt;/description&gt;</span></div>
        <div>{"    "}<span className="sgbh-code-tag">&lt;mitre&gt;</span></div>
        <div>{"      "}<span className="sgbh-code-tag">&lt;id&gt;</span><span className="sgbh-code-val">T1110</span><span className="sgbh-code-tag">&lt;/id&gt;</span>{"  "}<span className="sgbh-code-cmt">&lt;!-- Brute Force --&gt;</span></div>
        <div>{"    "}<span className="sgbh-code-tag">&lt;/mitre&gt;</span></div>
        <div>{"  "}<span className="sgbh-code-tag">&lt;/rule&gt;</span></div>
        <div><span className="sgbh-code-tag">&lt;/group&gt;</span></div>
      </CodeWindow>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-4 text-[11px] text-gray-500 font-mono flex items-center gap-2"
      >
        <ChevronRight className="w-3.5 h-3.5 text-[#fbbf24]" />
        <span className="text-[#fcd34d]">frequency</span> + <span className="text-[#fcd34d]">timeframe</span> = eşik mantığı: 120 sn içinde 6 eşleşme olursa tek bir yüksek-seviye alarm üretilir.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 13. Kural eşleşme akışı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Decoder → Kural → Alarm</Eyebrow>
      <H2 className="mb-2">Ham log nasıl alarma dönüşür?</H2>
      <Sub className="max-w-3xl mb-6">
        Manager her log&apos;u önce decoder ile alanlara ayırır, sonra kurallarla eşleştirir. Eşleşen kuralın
        seviyesi alarmın önemini belirler. İşte tek bir SSH satırının dört adımda alarma dönüşmesi:
      </Sub>
      <RuleMatchFlow />
    </SlideShell>
  ),

  /* ───── 14. Önem seviyeleri tablosu ───── */
  () => (
    <SlideShell>
      <Eyebrow>Kural seviyeleri · 0-15 ölçeği</Eyebrow>
      <H2>Her alarm aynı aciliyette değil</H2>
      <Sub className="mt-3 max-w-3xl">
        Wazuh kural seviyeleri 0 (yok say) ile 15 (en kritik) arasındadır. Seviye, alarmın panoda nasıl
        renklendiğini ve hangi bildirimi tetikleyeceğini belirler. Aşağıda tipik bir eşleştirme:
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
              <th style={{ width: "14%" }}>Seviye</th>
              <th style={{ width: "22%" }}>Sınıf</th>
              <th style={{ width: "32%" }}>Örnek olay</th>
              <th>Tipik aksiyon</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="sgbh-sev sgbh-sev-low">0-3</span></td>
              <td className="text-white font-semibold">Bilgilendirme</td>
              <td>Başarılı giriş, servis yeniden başlatma.</td>
              <td>Sadece kaydet; alarm üretme.</td>
            </tr>
            <tr>
              <td><span className="sgbh-sev sgbh-sev-med">4-7</span></td>
              <td className="text-white font-semibold">Düşük / Orta</td>
              <td>Tekil başarısız giriş, bilinen tarama imzası.</td>
              <td>Panoda işaretle; trend olarak izle.</td>
            </tr>
            <tr>
              <td><span className="sgbh-sev sgbh-sev-high">8-11</span></td>
              <td className="text-white font-semibold">Yüksek</td>
              <td>Brute-force eşiği, dosya bütünlüğü (FIM) değişimi.</td>
              <td>L1&apos;e alarm; inceleme başlat.</td>
            </tr>
            <tr>
              <td><span className="sgbh-sev sgbh-sev-crit">12-15</span></td>
              <td className="text-white font-semibold">Kritik</td>
              <td>Rootkit tespiti, başarılı saldırı sonrası komut çalıştırma.</td>
              <td>Anında bildirim; olay müdahalesi.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-[11px] text-gray-500 max-w-3xl"
      >
        Not: Seviye eşikleri kurum politikasına göre ayarlanır; tablodaki aralıklar yaygın bir başlangıç önerisidir.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 15. Bölüm 3 ───── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Dashboard — Alarmları Okumak"
      subtitle="Toplanan log ve üretilen alarmlar OpenSearch tabanlı panoda görünür. Aramak, filtrelemek ve görselleştirmek SOC&apos;un günlük işidir."
      bgGradient="linear-gradient(135deg,#a855f7,#6b21a8)"
      shadow="0 30px 80px -20px rgba(168,85,247,0.55)"
      icon={<LayoutDashboard className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 16. Dashboard mockup — alarm akışı + sayaçlar ───── */
  () => {
    const tiles = [
      { label: "Toplam alarm (24s)", value: "12.480", color: "#06b6d4" },
      { label: "Kritik (lvl 12+)", value: "7", color: "#f87171" },
      { label: "Aktif agent", value: "23 / 24", color: "#34d399" },
      { label: "FIM değişimi", value: "41", color: "#a78bfa" },
    ];
    const rows = [
      { time: "09:21:07", agent: "web01", rule: "100100", lvl: "10", sev: "high" as const, desc: "SSH brute-force: 203.0.113.7" },
      { time: "09:20:55", agent: "web01", rule: "5710", lvl: "5", sev: "med" as const, desc: "sshd: invalid user admin" },
      { time: "09:18:02", agent: "db02", rule: "550", lvl: "7", sev: "med" as const, desc: "Integrity checksum changed: /etc/passwd" },
      { time: "09:15:44", agent: "fw-edge", rule: "100210", lvl: "12", sev: "crit" as const, desc: "Possible web shell upload tespit edildi" },
      { time: "09:12:31", agent: "app03", rule: "5715", lvl: "3", sev: "low" as const, desc: "sshd: authentication success (a.yilmaz)" },
    ];
    return (
      <SlideShell>
        <Eyebrow>Wazuh Dashboard · canlı görünüm</Eyebrow>
        <H2 className="mb-2">Pano: sayaçlar üstte, alarm akışı altta</H2>
        <Sub className="max-w-3xl mb-6">
          SOC analisti güne bu ekranla başlar: özet sayaçlar durumu özetler, alarm akışı en yeniden eskiye
          sıralanır. Bir satıra tıklayınca ham log ve decoder alanları açılır.
        </Sub>
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
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
              <Activity className="w-3.5 h-3.5" />
              <span>Wazuh — Threat Hunting · son 24 saat</span>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {tiles.map((t) => (
                <div key={t.label} className="sgbh-tile">
                  <div className="text-2xl font-bold" style={{ color: t.color }}>{t.value}</div>
                  <div className="text-[10px] text-gray-400 mt-1 leading-tight">{t.label}</div>
                </div>
              ))}
            </div>
            <table className="sgbh-logtbl">
              <thead>
                <tr>
                  <th style={{ width: "12%" }}>Zaman</th>
                  <th style={{ width: "12%" }}>Agent</th>
                  <th style={{ width: "10%" }}>Kural</th>
                  <th style={{ width: "9%" }}>Seviye</th>
                  <th>Açıklama</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.time}>
                    <td className="text-gray-500">{r.time}</td>
                    <td style={{ color: "#a78bfa" }}>{r.agent}</td>
                    <td className="text-gray-400">{r.rule}</td>
                    <td>
                      <span className={`sgbh-sev sgbh-sev-${r.sev}`}>{r.lvl}</span>
                    </td>
                    <td className="text-gray-300" style={{ whiteSpace: "normal" }}>{r.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </SlideShell>
    );
  },

  /* ───── 17. DQL arama + örnek bar ───── */
  () => (
    <SlideShell>
      <Eyebrow>Pano · arama &amp; filtreleme</Eyebrow>
      <H2 className="mb-2">Gürültüden olaya: doğru sorgu</H2>
      <Sub className="max-w-3xl mb-6">
        On binlerce alarmı insan tek tek okuyamaz. Dashboard&apos;ta alan-bazlı sorgu (DQL) ile saniyeler içinde
        daralırsın. Solda tipik sorgular, sağda en çok alarm üreten ilk kaynaklar:
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3 text-[#06b6d4]">
            <Search className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Örnek sorgular (DQL)</span>
          </div>
          <div className="space-y-2 font-mono text-[11px]">
            <div className="bg-black/40 rounded px-3 py-2 text-gray-300"><span className="text-[#67e8f9]">rule.level</span> &gt;= 10</div>
            <div className="bg-black/40 rounded px-3 py-2 text-gray-300"><span className="text-[#67e8f9]">agent.name</span> : &quot;web01&quot;</div>
            <div className="bg-black/40 rounded px-3 py-2 text-gray-300"><span className="text-[#67e8f9]">data.srcip</span> : &quot;203.0.113.7&quot;</div>
            <div className="bg-black/40 rounded px-3 py-2 text-gray-300"><span className="text-[#67e8f9]">rule.mitre.id</span> : &quot;T1110&quot; <span className="text-gray-500">and</span> <span className="text-[#67e8f9]">rule.level</span> &gt;= 8</div>
          </div>
          <div className="text-[11px] text-gray-500 mt-3">Zaman aralığını da daralt; çoğu yanlış pozitif belirli bir agent veya IP&apos;de toplanır.</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-4 text-[#a78bfa]">
            <Gauge className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">En çok alarm üreten ilk 5 kural</span>
          </div>
          <div className="space-y-3">
            {[
              { name: "5710 · sshd invalid user", pct: 92, color: "#f87171" },
              { name: "100100 · SSH brute-force", pct: 64, color: "#fdba74" },
              { name: "550 · FIM checksum changed", pct: 48, color: "#a78bfa" },
              { name: "31151 · web tarama imzası", pct: 33, color: "#fbbf24" },
              { name: "5715 · giriş başarılı", pct: 18, color: "#34d399" },
            ].map((b, i) => (
              <motion.div
                key={b.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.08 }}
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-gray-300 font-mono">{b.name}</span>
                  <span className="text-gray-500 font-mono">{b.pct}%</span>
                </div>
                <div className="sgbh-bar-track">
                  <motion.div
                    className="sgbh-bar-fill"
                    style={{ background: b.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${b.pct}%` }}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.6 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-[11px] text-gray-500 mt-4">Oranlar göreceli — örnek bir dağılımdır; gerçek değerler ortama göre değişir.</div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 18. Uygulamalı lab ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
      <H2>Kendi Wazuh&apos;unu kur, bir saldırıyı yakala</H2>
      <Sub className="mt-3 max-w-3xl">
        Lab tamamen kendi izole ağında (Wazuh sunucu VM + bir Linux agent VM, host-only ağ). Sonraki derse bu
        dört adımı yapmış ve dashboard ekran görüntüsünü almış gelmen bekleniyor.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Server, title: "Wazuh&apos;u tek-düğüm kur", desc: "wazuh-install.sh -a ile kur; panoya admin olarak giriş yap.", accent: "#06b6d4" },
          { icon: Network, title: "Bir agent bağla", desc: "Linux VM&apos;e agent kur, ossec.conf&apos;ta manager IP&apos;sini ver, agent&apos;ı Aktif gör.", accent: "#fbbf24" },
          { icon: Siren, title: "Bir saldırı üret", desc: "Agent&apos;a kasıtlı 6+ kez yanlış SSH parolasıyla bağlanmayı dene.", accent: "#f87171" },
          { icon: ListChecks, title: "Alarmı dashboard&apos;ta bul", desc: "rule.level >= 8 sorgusuyla brute-force alarmını bul, ekran görüntüsünü al.", accent: "#a78bfa" },
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
          <span className="text-white">Yalnızca kendi laboratuvarında.</span> Saldırı simülasyonunu yalnızca sana ait,
          izole VM&apos;ler üzerinde yap. Sana ait olmayan bir sisteme erişim denemesi TCK 243-244 kapsamında suçtur.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 19. Hafta 12 önizleme + kapanış ───── */
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
        <Eyebrow>11. hafta tamamlandı · sıradaki: Dijital Delil &amp; Adli Bilişim</Eyebrow>
        <H1>
          <span className="sgbh-shimmer-soft">Alarmdan Delile</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta SIEM ile alarmı yakaladık. Hafta 12&apos;de o alarmın arkasındaki olayı hukuken geçerli biçimde
          belgeliyoruz: delil zinciri (chain of custody), imaj alma ve log&apos;un mahkemedeki değeri.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
          <FeatureCard icon={FileText} title="Delil zinciri" desc="Chain of custody — kim, ne zaman, neyi elledi?" accent="#06b6d4" delay={0.1} />
          <FeatureCard icon={Database} title="İmaj alma" desc="Bit-bit kopya, hash ile doğrulama (write-blocker)." accent="#34d399" delay={0.18} />
          <FeatureCard icon={Activity} title="Log&apos;un değeri" desc="SIEM kaydı delil olarak ne ifade eder, ne etmez?" accent="#a78bfa" delay={0.26} />
          <FeatureCard icon={Brain} title="Zaman çizgisi" desc="Olayı saniye saniye yeniden kurmak (timeline)." accent="#fbbf24" delay={0.34} />
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
            <div className="text-white font-semibold">Wazuh lab&apos;ı kurulu</div>
            <div className="text-sm text-gray-400">agent bağlı getir</div>
          </div>
          <div className="sgbh-card rounded-xl p-5">
            <Clock className="w-5 h-5 text-[#34d399] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">Lab raporu</div>
            <div className="text-sm text-gray-400">4 adım + pano görüntüsü</div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 text-xs font-mono text-gray-600 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>İzinsiz erişim/saldırı yok · yalnızca kendi izole labın</span>
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
          BVA 2205 · 11. Hafta · SOC &amp; SIEM (Wazuh)
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
