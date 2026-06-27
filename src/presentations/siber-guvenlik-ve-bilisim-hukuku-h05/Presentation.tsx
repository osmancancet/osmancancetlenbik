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
  Unlock,
  Key,
  UserX,
  Users,
  Server,
  Globe,
  ArrowRight,
  ArrowUpDown,
  AlertTriangle,
  Bug,
  Crosshair,
  Terminal,
  ListChecks,
  Filter,
  Repeat,
  Cloud,
  FileSearch,
  ScanLine,
  Layers,
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

/* Burp Suite tarzı, sol istek - sağ yanıt iki panelli HTTP penceresi */
function BurpWindow({
  toolLabel,
  request,
  response,
  footer,
  footerIcon,
}: {
  toolLabel: string;
  request: ReactNode;
  response: ReactNode;
  footer: ReactNode;
  footerIcon: ReactNode;
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
          <Crosshair className="w-3.5 h-3.5" />
          <span>{toolLabel}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="border-b md:border-b-0 md:border-r border-white/5">
          <div className="px-4 pt-3 pb-1 text-[10px] font-mono uppercase tracking-widest text-[#67e8f9]">
            Request
          </div>
          <div className="sgbh-http">{request}</div>
        </div>
        <div>
          <div className="px-4 pt-3 pb-1 text-[10px] font-mono uppercase tracking-widest text-[#86efac]">
            Response
          </div>
          <div className="sgbh-http">{response}</div>
        </div>
      </div>
      <div className="px-4 py-3 text-[11px] text-gray-400 border-t border-white/5 flex items-start gap-2">
        {footerIcon}
        <span>{footer}</span>
      </div>
    </motion.div>
  );
}

/* IDOR diyagramı: kullanıcı id'sini değiştirerek başkasının kaydını görme */
function IDORDiagram() {
  const rows = [
    {
      who: "Kendi hesabın",
      url: "GET /api/invoice/1001",
      result: "200 OK · senin faturan",
      ok: true,
    },
    {
      who: "id'yi 1 azalt",
      url: "GET /api/invoice/1000",
      result: "200 OK · BAŞKASININ faturası",
      ok: false,
    },
    {
      who: "id'yi büyüt",
      url: "GET /api/invoice/9999",
      result: "200 OK · tüm kayıtlar gezilebilir",
      ok: false,
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="sgbh-card rounded-xl p-6 max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-between mb-5 text-xs font-mono uppercase tracking-widest text-gray-400">
        <span className="flex items-center gap-2 text-[#67e8f9]">
          <Users className="w-4 h-4" /> İstek (URL&apos;deki nesne id&apos;si)
        </span>
        <span className="flex items-center gap-2 text-[#c4b5fd]">
          Sunucu cevabı <Server className="w-4 h-4" />
        </span>
      </div>
      <div className="space-y-3">
        {rows.map((r, i) => (
          <motion.div
            key={r.url}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.18 }}
            className="flex items-center gap-3"
          >
            <span
              className="text-[11px] font-mono px-2 py-1 rounded flex-shrink-0 w-32 text-center"
              style={{
                background: r.ok ? "#34d39915" : "#f8717115",
                color: r.ok ? "#86efac" : "#fca5a5",
                border: `1px solid ${r.ok ? "#34d39940" : "#f8717140"}`,
              }}
            >
              {r.who}
            </span>
            <span className="font-mono text-[12px] text-gray-200 flex-1 break-all">
              {r.url}
            </span>
            <ArrowRight className="w-4 h-4 text-gray-600 flex-shrink-0" />
            <span
              className="text-[11px] flex-1 text-right"
              style={{ color: r.ok ? "#86efac" : "#fca5a5" }}
            >
              {r.result}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="mt-5 text-[11px] text-gray-500 font-mono">
        Tek değişen: URL&apos;deki sayı. Sunucu &quot;bu kayıt sana mı ait?&quot; diye hiç sormuyor.
      </div>
    </motion.div>
  );
}

/* SSRF akış diyagramı: tarayıcı → savunmasız sunucu → iç kaynak */
function SSRFDiagram() {
  const nodes = [
    { icon: Globe, label: "Saldırgan", sub: "url=... parametresi", color: "#f87171" },
    { icon: Server, label: "Savunmasız Sunucu", sub: "isteği o yapıyor", color: "#fbbf24" },
    { icon: Cloud, label: "İç Kaynak", sub: "169.254.169.254 · admin paneli", color: "#a78bfa" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="sgbh-card rounded-xl p-8 max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-between gap-2">
        {nodes.map((n, i) => (
          <div key={n.label} className="flex items-center gap-2 flex-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.2 }}
              className="flex flex-col items-center text-center flex-1"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3"
                style={{ background: `${n.color}18`, border: `1px solid ${n.color}55` }}
              >
                <n.icon className="w-8 h-8" style={{ color: n.color }} />
              </div>
              <div className="text-sm font-semibold text-white">{n.label}</div>
              <div className="text-[11px] text-gray-500 font-mono mt-0.5">{n.sub}</div>
            </motion.div>
            {i < nodes.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.2 }}
                className="flex flex-col items-center flex-shrink-0"
              >
                <ArrowRight className="w-6 h-6 text-gray-600" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 text-[11px] text-gray-500 font-mono text-center">
        Saldırgan iç ağa erişemez; ama sunucuyu kendi adına istek atan bir <span className="text-[#a78bfa]">vekil</span> olarak kullanır.
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
        <Eyebrow>BVA 2205 · 5. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="sgbh-shimmer">OWASP Top 10 · Bölüm 2</span>
          <br />
          <span className="text-white/90">Access Control, IDOR &amp; SSRF</span>
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Yetki kontrolü neden listenin 1 numarası? Bu hafta üç kritik riski Burp Suite ile elimizle istismar ediyoruz.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={UserX}
            title="Broken Access Control"
            desc="Yatay ve dikey yetki yükseltme; OWASP 2021 listesinin 1 numarası (A01)."
            delay={0.3}
            accent="#06b6d4"
          />
          <FeatureCard
            icon={ArrowUpDown}
            title="IDOR"
            desc="Nesne referansını değiştirip başkasının verisine erişme — en sık görülen örnek."
            delay={0.45}
            accent="#fbbf24"
          />
          <FeatureCard
            icon={Cloud}
            title="SSRF"
            desc="Sunucuyu kandırıp iç ağa/metadata servisine istek attırma (A10)."
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
          Çarşamba 13:30 — 17:00 · Uygulamalı lab (Burp Suite + OWASP Juice Shop)
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. Geçen hafta → bu hafta ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 4. haftadan 5. haftaya</Eyebrow>
      <H2>Geçen hafta injection&apos;ı kırdık; bu hafta yetkiyi kıracağız</H2>
      <Sub className="mt-3 max-w-3xl">
        Bölüm 1&apos;de Injection ve Cryptographic Failures üzerinden &quot;girdiye güvenme&quot; ilkesini gördük.
        Bu hafta bir adım öteye geçiyoruz: girdi temiz olsa bile, sunucu &quot;bu işlemi yapmaya yetkin var mı?&quot;
        sorusunu sormazsa veri sızar. İşin merkezinde tek bir araç var: <span className="text-white">Burp Suite</span>.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#67e8f9]">
            <ListChecks className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bölüm 1&apos;de (Hafta 4)</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />A03 Injection: girdi sorguya yapışırsa veritabanı çalınır.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />A02 Cryptographic Failures: zayıf/yokluk şifreleme.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Ortak ders: istemciden gelen hiçbir şeye güvenme.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <Target className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu hafta (Hafta 5)</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />A01 Broken Access Control: yetki kontrolü neden 1 numara?</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />IDOR: nesne id&apos;sini değiştirip başkasının verisine erişme.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />SSRF: sunucuyu iç ağa istek atan bir vekile çevirme.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 3. Dersin akışı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: erişim kontrolü → IDOR → SSRF</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce yetki kontrolünün ne olduğunu ve nasıl kırıldığını tanımlıyoruz; sonra en somut örneği olan
        IDOR&apos;u Burp ile yakalıyoruz; en son sunucu tarafı istek sahteciliği SSRF&apos;e geçiyoruz. Sonunda
        izole bir hedefte uygulamalı lab.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Broken Access Control", items: ["Yatay vs dikey yetki yükseltme", "Yaygın zafiyet kalıpları", "Doğru savunma: sunucu tarafı kontrol"], icon: UserX, accent: "#06b6d4" },
          { range: "02", title: "IDOR + Burp", items: ["Nesne referansı zafiyeti", "Burp Proxy → Repeater akışı", "id manipülasyonuyla veri sızdırma"], icon: ArrowUpDown, accent: "#fbbf24" },
          { range: "03", title: "SSRF", items: ["Sunucuyu vekil yapma", "Bulut metadata servisi riski", "Allow-list ile savunma"], icon: Cloud, accent: "#a78bfa" },
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
                <div className="text-base font-semibold text-white">{g.title}</div>
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

  /* ───── 4. Burp Suite tanıtım ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu haftanın aracı · Burp Suite</Eyebrow>
      <H2 className="mb-2">Web saldırının &quot;Wireshark&quot;ı</H2>
      <Sub className="max-w-3xl mb-6">
        Burp Suite, tarayıcı ile sunucu arasına giren bir <span className="text-white">araya-giren-vekil (intercepting proxy)</span>dir.
        Her isteği durdurup okur, değiştirip tekrar gönderir. Bu hafta kullanacağımız üç modül:
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Filter}
          title="Proxy"
          desc="Tarayıcı trafiğini durdurur (intercept). İstekleri ham HTTP olarak görür ve elle düzenlersin."
          accent="#06b6d4"
          delay={0.15}
        />
        <FeatureCard
          icon={Repeat}
          title="Repeater"
          desc="Tek bir isteği tekrar tekrar, küçük değişikliklerle gönderir. IDOR denemesi için ideal modül."
          accent="#fbbf24"
          delay={0.25}
        />
        <FeatureCard
          icon={ScanLine}
          title="Intruder"
          desc="Bir parametreyi otomatik olarak yüzlerce değerle dener (id 1000→2000 gibi). Topluca tarama."
          accent="#a78bfa"
          delay={0.35}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 sgbh-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3 max-w-4xl"
      >
        <Sparkles className="w-4 h-4 text-[#06b6d4] mt-0.5 flex-shrink-0" />
        <span>
          Community Edition ücretsizdir ve bu üç modülü içerir. Trafiği görmek için tarayıcının Burp&apos;ün CA
          sertifikasına güvenmesi (HTTPS için) ve proxy&apos;nin <span className="font-mono text-[#67e8f9]">127.0.0.1:8080</span> ayarlanması gerekir.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 5. Bölüm 1 — Broken Access Control ───── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="Broken Access Control"
      subtitle="OWASP Top 10 (2021) listesinin 1 numarası. Test edilen uygulamaların büyük kısmında en az bir biçimine rastlanır — yetki kontrolü unutulan yerdir."
      bgGradient="linear-gradient(135deg,#06b6d4,#0e7490)"
      shadow="0 30px 80px -20px rgba(6,182,212,0.6)"
      icon={<UserX className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 6. Yatay vs dikey yetki yükseltme ───── */
  () => (
    <SlideShell>
      <Eyebrow>İki yön · iki tehdit</Eyebrow>
      <H2 className="mb-2">Yatay ve dikey yetki yükseltme</H2>
      <Sub className="max-w-3xl mb-8">
        Erişim kontrolü iki eksende kırılır: aynı seviyedeki başka birinin verisine geçmek (yatay),
        ya da daha yetkili bir role sıçramak (dikey). Burp&apos;te ikisini de test edersin.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#67e8f9]">
            <ArrowUpDown className="w-5 h-5 rotate-90" />
            <span className="text-xs font-mono uppercase tracking-widest">Yatay (horizontal)</span>
          </div>
          <p className="text-sm text-gray-300 mb-3">
            Aynı yetki seviyesindeki <span className="text-white">başka bir kullanıcının</span> verisine erişme.
            Rolün değişmez; sadece başkasının kaydına bakarsın.
          </p>
          <div className="font-mono text-[11px] bg-black/40 rounded p-3 border border-white/5 space-y-1 text-gray-300">
            <div>Kendi: <span className="text-[#86efac]">/profil?id=42</span></div>
            <div>Saldırı: <span className="text-[#fca5a5]">/profil?id=43</span> → komşunun verisi</div>
          </div>
          <p className="text-[11px] text-gray-500 mt-3">En sık karşılaşılan biçimi IDOR&apos;dur (sıradaki durak).</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#c4b5fd]">
            <ArrowUpDown className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Dikey (vertical)</span>
          </div>
          <p className="text-sm text-gray-300 mb-3">
            Normal kullanıcının <span className="text-white">daha yetkili bir role</span> sıçraması.
            Örn. standart kullanıcının admin işlevini çağırması.
          </p>
          <div className="font-mono text-[11px] bg-black/40 rounded p-3 border border-white/5 space-y-1 text-gray-300">
            <div>Menüde yok ama URL tahmin edilir:</div>
            <div className="text-[#fca5a5]">POST /admin/users/delete</div>
            <div className="text-gray-500">Sunucu rolü doğrulamazsa → çalışır</div>
          </div>
          <p className="text-[11px] text-gray-500 mt-3">&quot;Butonu gizlemek&quot; kontrol değildir; UI&apos;da yokluk koruma sağlamaz.</p>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 7. Yaygın zafiyet kalıpları tablosu ───── */
  () => (
    <SlideShell>
      <Eyebrow>Nerelerde kırılır?</Eyebrow>
      <H2>Erişim kontrolünün klasik tuzakları</H2>
      <Sub className="mt-3 max-w-3xl">
        Aynı hata farklı kılıklarda tekrar eder. Burp&apos;te bir isteği incelerken bu dört kalıbı ararsın.
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
              <th style={{ width: "26%" }}>Zafiyet kalıbı</th>
              <th style={{ width: "37%" }}>Ne yapılır?</th>
              <th>Neden çalışır?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">IDOR</td>
              <td>URL/gövdedeki nesne id&apos;si başka değere çevrilir.</td>
              <td>Sunucu kaydın sahibini doğrulamıyor.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Force browsing</td>
              <td>Menüde olmayan gizli yol elle yazılır (<span className="font-mono text-[#67e8f9]">/admin</span>).</td>
              <td>Yetki sadece linki gizleyerek &quot;sağlanmış&quot; sanılıyor.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Parametre kurcalama</td>
              <td><span className="font-mono text-[#67e8f9]">role=user</span> → <span className="font-mono text-[#fca5a5]">role=admin</span> yapılır.</td>
              <td>Yetki, istemciden gelen veriye dayandırılıyor.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Eksik metot kontrolü</td>
              <td>GET engelli ama <span className="font-mono text-[#67e8f9]">POST/PUT/DELETE</span> denenir.</td>
              <td>Kontrol yalnızca bir HTTP metoduna konmuş.</td>
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
        Altın kural: yetki kararı her zaman sunucuda, her istekte, oturum kimliğine göre verilir.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 8. Bölüm 2 — IDOR ───── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="IDOR + Burp Suite"
      subtitle="Insecure Direct Object Reference: erişim kontrolü kırıklığının en somut ve en yaygın biçimi. Şimdi Burp Repeater ile elimizle yakalıyoruz."
      bgGradient="linear-gradient(135deg,#f59e0b,#b45309)"
      shadow="0 30px 80px -20px rgba(245,158,11,0.55)"
      icon={<ArrowUpDown className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 9. IDOR nedir — diyagram ───── */
  () => (
    <SlideShell>
      <Eyebrow>IDOR · temel mantık</Eyebrow>
      <H2 className="mb-2">Tek değişen bir sayı, sızan tüm veriler</H2>
      <Sub className="max-w-3xl mb-6">
        Uygulama bir kaydı doğrudan tahmin edilebilir bir id ile gösteriyor ve &quot;bu id sana mı ait?&quot;
        kontrolünü yapmıyorsa, id&apos;yi değiştirmek yeterlidir.
      </Sub>
      <IDORDiagram />
    </SlideShell>
  ),

  /* ───── 10. Burp Repeater — IDOR canlı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Burp Repeater · canlı IDOR</Eyebrow>
      <H2 className="mb-2">İsteği yakala, id&apos;yi değiştir, tekrar gönder</H2>
      <Sub className="max-w-3xl mb-6">
        Solda Repeater&apos;da düzenlediğimiz istek, sağda sunucunun cevabı. Sadece <span className="text-[#fde68a]">id=1001</span>&apos;i
        <span className="text-[#fde68a]"> 1000</span> yaptık ve oturum çerezimiz kendi hesabımıza ait olmasına rağmen
        başka müşterinin faturası geldi.
      </Sub>
      <BurpWindow
        toolLabel="Burp Suite — Repeater · tab 1"
        request={
          <>
            <div>
              <span className="sgbh-http-method">GET</span> /api/invoice/
              <span className="sgbh-http-edit">1000</span> HTTP/1.1
            </div>
            <div className="sgbh-http-header">Host: shop.kurum-ornek.tr</div>
            <div className="sgbh-http-header">Cookie: session=a1b2c3...d9</div>
            <div className="sgbh-http-header">Accept: application/json</div>
            <div className="sgbh-http-divider">────────────────────</div>
            <div className="text-gray-500 text-[11px]">
              Not: oturum çerezi <span className="text-[#67e8f9]">kendi</span> hesabına ait;
              değiştirilen tek şey URL&apos;deki id.
            </div>
          </>
        }
        response={
          <>
            <div className="sgbh-http-res">HTTP/1.1 200 OK</div>
            <div className="sgbh-http-header">Content-Type: application/json</div>
            <div className="sgbh-http-divider">────────────────────</div>
            <div className="text-gray-300">{"{"}</div>
            <div className="text-gray-300 pl-3">
              &quot;invoiceId&quot;: <span className="sgbh-http-leak">1000</span>,
            </div>
            <div className="text-gray-300 pl-3">
              &quot;customer&quot;: <span className="sgbh-http-leak">&quot;Ayşe Demir&quot;</span>,
            </div>
            <div className="text-gray-300 pl-3">
              &quot;total&quot;: <span className="sgbh-http-leak">&quot;14.250 TL&quot;</span>
            </div>
            <div className="text-gray-300">{"}"}</div>
          </>
        }
        footerIcon={<AlertTriangle className="w-4 h-4 text-[#f87171] mt-0.5 flex-shrink-0" />}
        footer={
          <>
            <span className="text-white">200 OK</span> dönmesi zafiyetin kanıtıdır. Doğru davranış
            <span className="text-[#86efac]"> 403 Forbidden</span> olurdu: kayıt sana ait değil.
            Intruder ile id&apos;yi 1000&apos;den 2000&apos;e taratıp tüm faturalar çekilebilir.
          </>
        }
      />
    </SlideShell>
  ),

  /* ───── 11. IDOR savunması ───── */
  () => (
    <SlideShell>
      <Eyebrow>IDOR · doğru savunma</Eyebrow>
      <H2>id&apos;yi gizleme — sahipliği doğrula</H2>
      <Sub className="mt-3 max-w-3xl">
        Yaygın yanlış: &quot;tahmin edilmesin diye id&apos;yi rastgele yapalım.&quot; Bu gizliliktir, kontrol değil.
        Asıl çözüm her istekte sahiplik kontrolüdür.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card-warn rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fca5a5]">
            <Unlock className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Zayıf (yanlış güven)</span>
          </div>
          <div className="font-mono text-[11px] bg-black/40 rounded p-3 border border-white/5 space-y-1 text-gray-300">
            <div className="text-gray-500">// id ile getir, sahibini sorma</div>
            <div>invoice = db.find(<span className="text-[#fca5a5]">req.params.id</span>)</div>
            <div>return invoice</div>
          </div>
          <p className="text-[11px] text-gray-500 mt-3">Çerezdeki kullanıcı hiç kullanılmıyor → IDOR.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <Lock className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Sağlam (sahiplik kontrolü)</span>
          </div>
          <div className="font-mono text-[11px] bg-black/40 rounded p-3 border border-white/5 space-y-1 text-gray-300">
            <div className="text-gray-500">// oturumdaki kullanıcıyla eşleştir</div>
            <div>invoice = db.find(req.params.id)</div>
            <div><span className="text-[#67e8f9]">if</span> invoice.ownerId != <span className="text-[#86efac]">session.userId</span>:</div>
            <div className="pl-4 text-[#fca5a5]">return 403 Forbidden</div>
            <div>return invoice</div>
          </div>
          <p className="text-[11px] text-gray-500 mt-3">Kontrol her istekte, sunucuda, oturuma göre.</p>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 12. Bölüm 3 — SSRF ───── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Server-Side Request Forgery"
      subtitle="SSRF (A10): saldırgan sunucuyu kandırarak, normalde erişemeyeceği iç adreslere sunucunun adına istek attırır. Bulut ortamlarında özellikle tehlikeli."
      bgGradient="linear-gradient(135deg,#8b5cf6,#5b21b6)"
      shadow="0 30px 80px -20px rgba(139,92,246,0.55)"
      icon={<Cloud className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 13. SSRF nedir — diyagram ───── */
  () => (
    <SlideShell>
      <Eyebrow>SSRF · temel mantık</Eyebrow>
      <H2 className="mb-2">Sunucu, saldırganın postacısı olur</H2>
      <Sub className="max-w-3xl mb-6">
        Bir uygulama, kullanıcının verdiği URL&apos;ye sunucu tarafında istek atıyorsa (önizleme, web kancası,
        PDF üretimi, resim çekme), saldırgan bu URL&apos;yi iç bir adrese çevirebilir. İstek sunucudan çıktığı için
        güvenlik duvarını içeriden aşar.
      </Sub>
      <SSRFDiagram />
    </SlideShell>
  ),

  /* ───── 14. SSRF — bulut metadata istismarı ───── */
  () => (
    <SlideShell>
      <Eyebrow>SSRF · bulut metadata · canlı istek</Eyebrow>
      <H2 className="mb-2">169.254.169.254 — bulutun gizli kapısı</H2>
      <Sub className="max-w-3xl mb-6">
        Çoğu bulut sağlayıcıda sanal makineler, bu link-local adresten geçici kimlik bilgilerini okur.
        Sunucu dışarıdan gelen URL&apos;yi körlemesine isteklerse, saldırgan bu adresi hedefleyip kimlik bilgilerini sızdırabilir.
      </Sub>
      <BurpWindow
        toolLabel="Burp Suite — Repeater · SSRF denemesi"
        request={
          <>
            <div>
              <span className="sgbh-http-method">POST</span> /api/preview HTTP/1.1
            </div>
            <div className="sgbh-http-header">Host: app.kurum-ornek.tr</div>
            <div className="sgbh-http-header">Content-Type: application/json</div>
            <div className="sgbh-http-divider">────────────────────</div>
            <div className="text-gray-300">{"{"}</div>
            <div className="text-gray-300 pl-3">
              &quot;url&quot;: &quot;
              <span className="sgbh-http-edit">
                http://169.254.169.254/latest/meta-data/iam/security-credentials/
              </span>
              &quot;
            </div>
            <div className="text-gray-300">{"}"}</div>
          </>
        }
        response={
          <>
            <div className="sgbh-http-res">HTTP/1.1 200 OK</div>
            <div className="sgbh-http-divider">────────────────────</div>
            <div className="text-gray-300">{"{"}</div>
            <div className="text-gray-300 pl-3">
              &quot;AccessKeyId&quot;: <span className="sgbh-http-leak">&quot;ASIA...REDACTED&quot;</span>,
            </div>
            <div className="text-gray-300 pl-3">
              &quot;SecretAccessKey&quot;: <span className="sgbh-http-leak">&quot;wJal...REDACTED&quot;</span>,
            </div>
            <div className="text-gray-300 pl-3">
              &quot;Token&quot;: <span className="sgbh-http-leak">&quot;IQoJ...REDACTED&quot;</span>
            </div>
            <div className="text-gray-300">{"}"}</div>
          </>
        }
        footerIcon={<AlertTriangle className="w-4 h-4 text-[#f87171] mt-0.5 flex-shrink-0" />}
        footer={
          <>
            Sunucu, saldırganın verdiği iç adrese gitti ve geçici bulut anahtarlarını döndürdü.
            Bu anahtarlarla saldırgan artık <span className="text-white">bulut hesabında</span> hareket edebilir.
            Modern sürümlerde (örn. IMDSv2 zorunluluğu) bu erişim sıkılaştırılmıştır.
          </>
        }
      />
    </SlideShell>
  ),

  /* ───── 15. SSRF savunması ───── */
  () => (
    <SlideShell>
      <Eyebrow>SSRF · katmanlı savunma</Eyebrow>
      <H2>Kara liste yetmez — izin listesi (allow-list) şart</H2>
      <Sub className="mt-3 max-w-3xl">
        &quot;169.254... olanı engelle&quot; gibi kara listeler kolayca atlatılır (alternatif IP yazımı, DNS rebinding,
        yönlendirme). Savunma birkaç katman birden gerektirir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: ListChecks, title: "Allow-list ile kısıtla", desc: "Sunucu yalnızca önceden onaylı alan adlarına/IP&apos;lere istek atsın; geri kalan her şey reddedilsin.", accent: "#06b6d4" },
          { icon: Shield, title: "Metadata erişimini kapat", desc: "Link-local adrese (169.254.169.254) giden çıkışı ağ seviyesinde engelle; IMDSv2 token zorunluluğunu aç.", accent: "#a78bfa" },
          { icon: FileSearch, title: "Çözümlenen IP&apos;yi doğrula", desc: "URL&apos;deki host DNS ile çözülünce iç/özel ağ aralığına düşüyorsa isteği iptal et (DNS rebinding&apos;e karşı).", accent: "#fbbf24" },
          { icon: Lock, title: "Cevabı geri yansıtma", desc: "Çekilen içeriği kullanıcıya ham olarak döndürme; yönlendirmeleri (3xx) sunucu tarafında takip etme.", accent: "#34d399" },
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
              <h3 className="text-base font-semibold text-white mb-1">{t.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{t.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 16. Üç riski bir arada — özet tablo ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bölümü bağla</Eyebrow>
      <H2>Üç risk · tek satırda hatırla</H2>
      <Sub className="mt-3 max-w-3xl">
        Hepsinin kökü aynı: sunucu, istemciden gelen bir referansa veya hedefe güvenip yetki/sınır kontrolünü atlıyor.
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
              <th style={{ width: "20%" }}>Risk</th>
              <th style={{ width: "14%" }}>OWASP</th>
              <th style={{ width: "33%" }}>Saldırganın hamlesi</th>
              <th>Temel savunma</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="font-semibold text-white">Broken Access Control</div>
              </td>
              <td><span className="sgbh-pill sgbh-pill-c">A01</span></td>
              <td>Gizli yolu/parametreyi/metodu deneyerek yetki dışına çıkar.</td>
              <td>Her istekte sunucu tarafı yetki kararı; reddet-varsayılan.</td>
            </tr>
            <tr>
              <td>
                <div className="font-semibold text-white">IDOR</div>
                <div className="text-[11px] text-gray-500 font-mono">A01 alt türü</div>
              </td>
              <td><span className="sgbh-pill sgbh-pill-c">A01</span></td>
              <td>URL/gövdedeki nesne id&apos;sini değiştirip başkasının kaydına geçer.</td>
              <td>Kaydın sahibini oturumla eşleştir (sahiplik kontrolü).</td>
            </tr>
            <tr>
              <td>
                <div className="font-semibold text-white">SSRF</div>
              </td>
              <td><span className="sgbh-pill sgbh-pill-i">A10</span></td>
              <td>Sunucuya iç adrese (metadata, admin) istek attırır.</td>
              <td>Allow-list, metadata kapatma, çözülen IP&apos;yi doğrula.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 17. Uygulamalı lab ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
      <H2>OWASP Juice Shop + Burp ile dört adım</H2>
      <Sub className="mt-3 max-w-3xl">
        Lab tamamen izole, kasıtlı zafiyetli bir hedef üzerinde: <span className="text-white">OWASP Juice Shop</span>
        (kendi makinende Docker ile). Sonraki derse bu dördünü yapmış ve ekran görüntüsü almış gelmen bekleniyor.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Terminal, title: "Juice Shop'u ayağa kaldır", desc: "docker run -d -p 3000:3000 bkimminich/juice-shop ile çalıştır, tarayıcı proxy'sini Burp'e yönlendir.", accent: "#fbbf24" },
          { icon: Filter, title: "Bir isteği Repeater'a gönder", desc: "Sepet veya kullanıcı sayfasında bir API isteğini yakala, sağ tık → Send to Repeater.", accent: "#06b6d4" },
          { icon: ArrowUpDown, title: "IDOR dene", desc: "İstekteki nesne id'sini bir azalt/artır; 403 yerine 200 ve başka veri geliyorsa bulgu bu.", accent: "#a78bfa" },
          { icon: ListChecks, title: "Bir bulgu raporla", desc: "Ekran görüntüsüyle: hangi istek, ne değişti, beklenen vs gerçek cevap — 3 cümlede yaz.", accent: "#34d399" },
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
              <p className="text-sm text-gray-400 leading-relaxed">{t.desc}</p>
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
          <span className="text-white">Yalnızca kendi laboratuvarında.</span> Juice Shop kasıtlı olarak savunmasızdır
          ve eğitim içindir. Sana ait olmayan bir sistemde aynı denemeleri yapmak (izinsiz erişim/sistem engelleme)
          TCK 243-245 kapsamında suçtur — izin sınırı çizen tek şeydir.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 18. Hafta 6 önizleme + kapanış ───── */
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
        <Eyebrow>5. hafta tamamlandı · sıradaki: Kimlik Doğrulama &amp; Oturum Güvenliği</Eyebrow>
        <H1>
          <span className="sgbh-shimmer-soft">Auth &amp; Session</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta &quot;kayıt sana mı ait?&quot; sorusunu sorduk. Hafta 6&apos;da bir adım öncesine gidiyoruz:
          &quot;sen gerçekten sen misin?&quot; — parola saldırıları, oturum/çerez güvenliği ve JWT tuzakları.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
          <FeatureCard icon={Key} title="Parola saldırıları" desc="Brute force, credential stuffing, kuralsız oran sınırı." accent="#06b6d4" delay={0.1} />
          <FeatureCard icon={Layers} title="Oturum & çerez" desc="HttpOnly, Secure, SameSite; oturum sabitleme (fixation)." accent="#34d399" delay={0.18} />
          <FeatureCard icon={Bug} title="JWT tuzakları" desc="alg=none, zayıf imza anahtarı, doğrulama atlatma." accent="#a78bfa" delay={0.26} />
          <FeatureCard icon={ShieldCheck} title="Savunma" desc="MFA, güçlü hash (argon2id), oturum süresi yönetimi." accent="#fbbf24" delay={0.34} />
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
            <div className="text-white font-semibold">Burp + Juice Shop</div>
            <div className="text-sm text-gray-400">kurulu getir</div>
          </div>
          <div className="sgbh-card rounded-xl p-5">
            <Brain className="w-5 h-5 text-[#34d399] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">Lab raporu</div>
            <div className="text-sm text-gray-400">4 adım + ekran görüntüsü</div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 text-xs font-mono text-gray-600 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>İzinsiz erişim yok · yalnızca kendi labın</span>
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
          BVA 2205 · 5. Hafta · Access Control, IDOR &amp; SSRF
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
