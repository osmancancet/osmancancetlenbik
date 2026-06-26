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
  Search,
  Activity,
  FlaskConical,
  Layers,
  Server,
  Laptop,
  ArrowRight,
  AlertTriangle,
  Lock,
  Unlock,
  Eye,
  Filter,
  Terminal,
  ListChecks,
  Network,
  Crosshair,
  Wifi,
  Hash,
  Key,
  Fingerprint,
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

function TCPHandshake() {
  const steps = [
    {
      n: 1,
      dir: "right" as const,
      flag: "SYN",
      detail: "Seq=0 · İstemci bağlantı açmak istiyorum diyor",
      color: "#06b6d4",
    },
    {
      n: 2,
      dir: "left" as const,
      flag: "SYN-ACK",
      detail: "Seq=0, Ack=1 · Sunucu kabul ediyor ve kendi senkronunu yolluyor",
      color: "#a78bfa",
    },
    {
      n: 3,
      dir: "right" as const,
      flag: "ACK",
      detail: "Ack=1 · İstemci onaylıyor — bağlantı ESTABLISHED",
      color: "#34d399",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="sgbh-card rounded-xl p-6 max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-between mb-6 text-xs font-mono uppercase tracking-widest text-gray-400">
        <span className="flex items-center gap-2 text-[#67e8f9]">
          <Laptop className="w-4 h-4" /> İstemci
        </span>
        <span className="flex items-center gap-2 text-[#c4b5fd]">
          Sunucu <Server className="w-4 h-4" />
        </span>
      </div>
      <div className="space-y-4">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, x: s.dir === "right" ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.25 }}
            className="flex items-center gap-4"
          >
            <span className="w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center text-[10px] text-gray-400 font-mono flex-shrink-0">
              {s.n}
            </span>
            <div
              className="flex-1 rounded-lg px-4 py-3 flex items-center gap-3"
              style={{ background: `${s.color}12`, border: `1px solid ${s.color}40` }}
            >
              <ArrowRight
                className={`w-5 h-5 flex-shrink-0 ${s.dir === "left" ? "rotate-180" : ""}`}
                style={{ color: s.color }}
              />
              <span
                className="font-mono text-sm font-bold px-2 py-0.5 rounded"
                style={{ background: `${s.color}22`, color: s.color }}
              >
                {s.flag}
              </span>
              <span className="text-sm text-gray-300">{s.detail}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-5 text-[11px] text-gray-500 font-mono">
        Wireshark&apos;ta filtre: <span className="text-[#67e8f9]">tcp.flags.syn==1</span> · üç paketi yan yana görürsün.
      </div>
    </motion.div>
  );
}

function WiresharkWindow() {
  const rows = [
    { no: 1, time: "0.000", src: "192.168.1.20", dst: "192.168.1.1", proto: "DNS", len: 74, info: "Standard query A example.com", cls: "sgbh-ws-dns" },
    { no: 2, time: "0.014", src: "192.168.1.1", dst: "192.168.1.20", proto: "DNS", len: 90, info: "Standard query response A 93.184.x.x", cls: "sgbh-ws-dns" },
    { no: 3, time: "0.021", src: "192.168.1.20", dst: "93.184.x.x", proto: "TCP", len: 66, info: "49620 → 80 [SYN] Seq=0", cls: "sgbh-ws-tcp" },
    { no: 4, time: "0.038", src: "93.184.x.x", dst: "192.168.1.20", proto: "TCP", len: 66, info: "80 → 49620 [SYN, ACK] Seq=0 Ack=1", cls: "sgbh-ws-tcp" },
    { no: 5, time: "0.039", src: "192.168.1.20", dst: "93.184.x.x", proto: "TCP", len: 54, info: "49620 → 80 [ACK] Ack=1", cls: "sgbh-ws-tcp" },
    { no: 6, time: "0.040", src: "192.168.1.20", dst: "93.184.x.x", proto: "HTTP", len: 412, info: "POST /login HTTP/1.1  (application/x-www-form-urlencoded)", cls: "sgbh-ws-http sgbh-ws-sel" },
    { no: 7, time: "0.071", src: "93.184.x.x", dst: "192.168.1.20", proto: "HTTP", len: 333, info: "HTTP/1.1 302 Found  (text/html)", cls: "sgbh-ws-http" },
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
          <Activity className="w-3.5 h-3.5" />
          <span>Wireshark — eth0 · display filter: http</span>
        </div>
      </div>
      <table className="sgbh-ws">
        <thead>
          <tr>
            <th style={{ width: "5%" }}>No.</th>
            <th style={{ width: "9%" }}>Time</th>
            <th style={{ width: "20%" }}>Source</th>
            <th style={{ width: "20%" }}>Destination</th>
            <th style={{ width: "9%" }}>Proto</th>
            <th style={{ width: "7%" }}>Len</th>
            <th>Info</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.no} className={r.cls}>
              <td className="text-gray-500">{r.no}</td>
              <td className="text-gray-500">{r.time}</td>
              <td style={{ color: "#a78bfa" }}>{r.src}</td>
              <td style={{ color: "#a78bfa" }}>{r.dst}</td>
              <td className="font-bold text-white">{r.proto}</td>
              <td className="text-gray-400">{r.len}</td>
              <td className="text-gray-300">{r.info}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-4 py-2 text-[10px] font-mono text-gray-500 border-t border-white/5">
        Seçili: #6 · Renkler protokole göre · 1-2 DNS çözümleme · 3-5 TCP el sıkışma · 6-7 HTTP isteği
      </div>
    </motion.div>
  );
}

function FollowStream() {
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
          <Unlock className="w-3.5 h-3.5 text-red-400" />
          <span>Follow TCP Stream — tcp.stream eq 0 (HTTP · şifresiz)</span>
        </div>
      </div>
      <div className="sgbh-stream">
        <div className="sgbh-stream-req">POST /login HTTP/1.1</div>
        <div className="sgbh-stream-req">Host: portal.kurum-ornek.tr</div>
        <div className="sgbh-stream-req">Content-Type: application/x-www-form-urlencoded</div>
        <div className="sgbh-stream-req">Content-Length: 41</div>
        <div className="text-gray-600">&nbsp;</div>
        <div className="sgbh-stream-req">
          kullanici=<span className="sgbh-stream-leak">a.yilmaz</span>&amp;parola=
          <span className="sgbh-stream-leak">Yaz2026!sifre</span>
        </div>
        <div className="text-gray-600 my-1">────────────────────────────</div>
        <div className="sgbh-stream-res">HTTP/1.1 302 Found</div>
        <div className="sgbh-stream-res">Location: /panel</div>
        <div className="sgbh-stream-res">Set-Cookie: session=8f2a...d41; Path=/</div>
      </div>
      <div className="px-4 py-3 text-[11px] text-gray-400 border-t border-white/5 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
        <span>
          HTTP olduğu için kullanıcı adı, parola ve oturum çerezi <span className="text-white">açık metin</span>.
          Aynı ağdaki bir saldırgan bunu pasifçe okur. Çözüm tek kelime: <span className="text-[#67e8f9]">HTTPS (TLS)</span>.
        </span>
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
        <Eyebrow>BVA 2205 · 2. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="sgbh-shimmer">Ağ Trafiği Analizi</span>
          <br />
          <span className="text-white/90">Wireshark &amp; Nmap</span>
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Paketi gör, portu tara, trafiği oku. Bu hafta saldırı zincirinin ilk adımı: keşif.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={Layers}
            title="TCP/IP &amp; Paket"
            desc="Paket nasıl oluşur, TCP üç-yönlü el sıkışma nasıl çalışır."
            delay={0.3}
            accent="#06b6d4"
          />
          <FeatureCard
            icon={Search}
            title="Nmap · Keşif"
            desc="Açık port ve servis tespiti, tarama türleri, sürüm parmak izi."
            delay={0.45}
            accent="#fbbf24"
          />
          <FeatureCard
            icon={Activity}
            title="Wireshark · Analiz"
            desc="Paket yakalama, filtreler, oturum takibi ve şifresiz trafik riski."
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
          Çarşamba 13:30 — 17:00 · Uygulamalı lab (Kali Linux + Wireshark)
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. Geçen hafta → bu hafta ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 1. haftadan 2. haftaya</Eyebrow>
      <H2>Önce ne savunduğumuzu konuştuk; şimdi neyi gözlemlediğimizi</H2>
      <Sub className="mt-3 max-w-3xl">
        1. hafta CIA üçlüsünü ve katmanlı savunmayı kurduk. Bir saldırgan da bir savunmacı da aynı
        yerden başlar: ağı dinlemek ve haritalamak. Bu hafta o iki temel aracı elimize alıyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#67e8f9]">
            <Crosshair className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Saldırgan tarafı</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Hedefte hangi servisler açık? (Nmap)</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Trafik şifresiz mi, ne sızıyor? (Wireshark)</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Eski sürüm = bilinen CVE = giriş noktası.</li>
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
            <span className="text-xs font-mono uppercase tracking-widest">Savunmacı tarafı</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Kendi yüzeyimi ben tarayıp gereksiz portu kapatırım.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Trafiği izleyip anormal davranışı yakalarım.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Aynı araç; niyet ve izin farkı meslekle suçu ayırır.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 3. Dersin akışı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: paketin dili → keşif → analiz</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce paketin nasıl oluştuğunu görüyoruz; sonra Nmap ile dışarıdan haritalıyoruz; en son
        Wireshark ile içeride akan trafiği okuyoruz. Sonunda küçük bir uygulamalı lab.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "TCP/IP & Paket", items: ["Katmanlar ve kapsülleme", "Paket başlıkları", "TCP üç-yönlü el sıkışma"], icon: Layers, accent: "#06b6d4" },
          { range: "02", title: "Nmap — Keşif", items: ["Tarama türleri (-sS, -sV, -p-)", "Port durumları", "Servis & sürüm tespiti"], icon: Search, accent: "#fbbf24" },
          { range: "03", title: "Wireshark — Analiz", items: ["Paket yakalama", "Capture vs display filtre", "Oturum takibi & şifreli trafik"], icon: Activity, accent: "#34d399" },
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

  /* ───── 4. Bölüm 1 — TCP/IP ───── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="Paketin Dili: TCP/IP"
      subtitle="Her şey paketle taşınır. Paketin nasıl katman katman oluştuğunu görmeden Nmap çıktısını da Wireshark satırını da okuyamayız."
      bgGradient="linear-gradient(135deg,#06b6d4,#0e7490)"
      shadow="0 30px 80px -20px rgba(6,182,212,0.6)"
      icon={<Layers className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 5. TCP/IP katmanları & kapsülleme ───── */
  () => (
    <SlideShell>
      <Eyebrow>TCP/IP · 4 katman</Eyebrow>
      <H2 className="mb-2">Bir paket nasıl giyinir?</H2>
      <Sub className="max-w-3xl mb-6">
        Veri her katmanda bir başlık &quot;giyer&quot;: buna kapsülleme (encapsulation) denir.
        Wireshark bu katmanları aşağıdan yukarı çözer; Nmap ise çoğunlukla Taşıma katmanıyla (TCP/UDP) ilgilenir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2.5"
        >
          {[
            { layer: "Uygulama", proto: "HTTP · DNS · TLS · SSH", color: "#34d399" },
            { layer: "Taşıma", proto: "TCP · UDP (port + güvenilirlik)", color: "#06b6d4" },
            { layer: "İnternet", proto: "IP (kaynak/hedef adres, yönlendirme)", color: "#a78bfa" },
            { layer: "Ağ Erişimi", proto: "Ethernet · Wi-Fi (MAC adresleri)", color: "#fbbf24" },
          ].map((l, i) => (
            <motion.div
              key={l.layer}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.1 }}
              className="rounded-lg px-4 py-3 flex items-center justify-between"
              style={{ background: `${l.color}10`, border: `1px solid ${l.color}40`, marginLeft: `${i * 16}px` }}
            >
              <span className="text-white font-semibold text-sm">{l.layer}</span>
              <span className="font-mono text-[11px]" style={{ color: l.color }}>{l.proto}</span>
            </motion.div>
          ))}
          <div className="text-[11px] text-gray-500 mt-2 pl-1">
            Aşağı indikçe başlık eklenir (gönderim) · yukarı çıktıkça soyulur (alım).
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-[#06b6d4] mb-4">Kapsülleme — bir HTTP isteği</div>
          <div className="space-y-2 font-mono text-[11px]">
            <div className="rounded p-2" style={{ background: "#fbbf2410", border: "1px solid #fbbf2440" }}>
              <span className="text-[#fbbf24]">[ Ethernet ]</span>
              <span className="rounded p-2 inline-block mt-1 w-full" style={{ background: "#a78bfa10" }}>
                <span className="text-[#a78bfa]">[ IP ]</span>
                <span className="rounded p-2 inline-block mt-1 w-full" style={{ background: "#06b6d410" }}>
                  <span className="text-[#67e8f9]">[ TCP :80 ]</span>
                  <span className="rounded p-2 inline-block mt-1 w-full" style={{ background: "#34d39915" }}>
                    <span className="text-[#86efac]">[ HTTP: GET /index.html ]</span>
                  </span>
                </span>
              </span>
            </div>
          </div>
          <div className="text-[11px] text-gray-500 mt-3">
            En içteki gerçek veri; dış katmanlar onu doğru adrese ulaştıran zarflar.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 6. TCP el sıkışma ───── */
  () => (
    <SlideShell>
      <Eyebrow>TCP · bağlantı kurma</Eyebrow>
      <H2 className="mb-2">Üç-yönlü el sıkışma (3-way handshake)</H2>
      <Sub className="max-w-3xl mb-6">
        Her TCP bağlantısı bu üç paketle başlar. Nmap&apos;in port &quot;open&quot; demesi de,
        Wireshark&apos;ta bir oturumun başlangıcını bulman da bu üç adıma dayanır.
      </Sub>
      <TCPHandshake />
    </SlideShell>
  ),

  /* ───── 7. Bölüm 2 — Nmap ───── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Nmap — Port & Servis Keşfi"
      subtitle="Hedefte hangi kapılar açık, ardında hangi servis, hangi sürüm? Ağ haritasını çıkaran sektör standardı araç."
      bgGradient="linear-gradient(135deg,#f59e0b,#b45309)"
      shadow="0 30px 80px -20px rgba(245,158,11,0.55)"
      icon={<Search className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 8. Nmap tarama türleri ───── */
  () => (
    <SlideShell>
      <Eyebrow>Nmap · sık kullanılan bayraklar</Eyebrow>
      <H2>Doğru tarama, doğru bilgi</H2>
      <Sub className="mt-3 max-w-3xl">
        Tek bir &quot;nmap&quot; komutu yok; ne öğrenmek istediğine göre bayrak seçersin.
        En sık kullanılan altısı:
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
              <th style={{ width: "16%" }}>Bayrak</th>
              <th style={{ width: "30%" }}>Ne yapar?</th>
              <th>Ne zaman kullanırsın?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="font-mono text-[#67e8f9]">-sS</span></td>
              <td>SYN (yarı-açık) tarama — el sıkışmayı tamamlamaz.</td>
              <td>Hızlı ve görece sessiz varsayılan TCP taraması (root gerekir).</td>
            </tr>
            <tr>
              <td><span className="font-mono text-[#67e8f9]">-sT</span></td>
              <td>Tam TCP connect taraması — el sıkışmayı tamamlar.</td>
              <td>Yetki yoksa; loglarda daha görünür.</td>
            </tr>
            <tr>
              <td><span className="font-mono text-[#67e8f9]">-sU</span></td>
              <td>UDP portlarını tarar (DNS, SNMP, DHCP).</td>
              <td>TCP dışı servisleri kaçırmamak için; yavaştır.</td>
            </tr>
            <tr>
              <td><span className="font-mono text-[#67e8f9]">-sV</span></td>
              <td>Servis ve sürüm tespiti (banner okuma).</td>
              <td>&quot;Açık&quot; yetmez, &quot;hangi sürüm&quot; lazımsa — CVE eşleştirme.</td>
            </tr>
            <tr>
              <td><span className="font-mono text-[#67e8f9]">-O</span></td>
              <td>İşletim sistemi parmak izi tahmini.</td>
              <td>Hedefin Windows mı Linux mı olduğunu kestirmek için.</td>
            </tr>
            <tr>
              <td><span className="font-mono text-[#67e8f9]">-p-</span></td>
              <td>Tüm 65.535 TCP portunu tarar (varsayılan 1.000 değil).</td>
              <td>Sıra dışı portta gizlenmiş servisi bulmak için.</td>
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
        <span className="text-[#fbbf24]">-A</span> = -sV + -O + script + traceroute (hepsi bir arada, gürültülü).
      </motion.div>
    </SlideShell>
  ),

  /* ───── 9. Port durumları ───── */
  () => (
    <SlideShell>
      <Eyebrow>Nmap · çıktıyı okumak</Eyebrow>
      <H2 className="mb-2">Bir port üç şey söyleyebilir</H2>
      <Sub className="max-w-3xl mb-8">
        Nmap her port için bir &quot;state&quot; döner. Bu üç durumu karıştırmak, raporun da
        savunma kararının da yanlış çıkmasına yol açar.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { state: "open", color: "#34d399", icon: Unlock, what: "Bir servis dinliyor ve cevap veriyor.", mean: "Saldırı yüzeyi burada. İncelenecek ilk yer." },
          { state: "closed", color: "#fbbf24", icon: Lock, what: "Port ulaşılabilir ama dinleyen servis yok (RST döner).", mean: "Şu an risk yok; ama makine ayakta." },
          { state: "filtered", color: "#f87171", icon: Shield, what: "Cevap yok — araya güvenlik duvarı giriyor.", mean: "Açık mı kapalı mı belirsiz; firewall var demektir." },
        ].map((p, i) => (
          <motion.div
            key={p.state}
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
            <div className="font-mono text-lg font-bold mb-2" style={{ color: p.color }}>{p.state}</div>
            <p className="text-sm text-gray-300 mb-3">{p.what}</p>
            <p className="text-xs text-gray-500 border-t border-white/5 pt-3">{p.mean}</p>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 10. Nmap terminal ───── */
  () => (
    <SlideShell>
      <Eyebrow>Canlı çıktı · nmap -sV</Eyebrow>
      <H2 className="mb-2">Saldırgan ilk dakika ne görüyor?</H2>
      <Sub className="max-w-3xl mb-6">
        Sürüm tespitiyle açık portlar ünlü zafiyetlerle eşleşir. Aşağıdaki çıktıda
        <span className="text-red-400 font-mono"> vsftpd 2.3.4</span> bilinen bir arka kapıya,
        eski <span className="text-red-400 font-mono">MySQL 5.5</span> ise birçok CVE&apos;ye sahip.
      </Sub>
      <TerminalWindow title="kali@pentest:~ — nmap -sV">
        <div>
          <span className="sgbh-term-prompt">kali@pentest</span>
          <span className="sgbh-term-dim">:~$</span>{" "}
          <span className="sgbh-term-cmd">sudo nmap -sS -sV -p- 192.168.56.101</span>
        </div>
        <div className="sgbh-term-dim">Starting Nmap 7.94 ( https://nmap.org )</div>
        <div className="sgbh-term-dim">Nmap scan report for <span className="sgbh-term-ip">192.168.56.101</span></div>
        <div className="sgbh-term-dim">Host is up (0.00041s latency).</div>
        <div className="mt-1"><span className="sgbh-term-warn">PORT      STATE  SERVICE   VERSION</span></div>
        <div><span className="sgbh-term-err">21/tcp    open   ftp</span>{" "}<span className="sgbh-term-err">vsftpd 2.3.4 (bilinen arka kapı)</span></div>
        <div><span className="sgbh-term-ok">22/tcp    open   ssh</span>{" "}<span className="sgbh-term-dim">OpenSSH 7.4 (protocol 2.0)</span></div>
        <div><span className="sgbh-term-ok">80/tcp    open   http</span>{" "}<span className="sgbh-term-dim">Apache httpd 2.4.6</span></div>
        <div><span className="sgbh-term-err">3306/tcp  open   mysql</span>{" "}<span className="sgbh-term-err">MySQL 5.5.60 (eski — CVE riski)</span></div>
        <div className="sgbh-term-dim mt-1">Service detection performed. 4 services, 2 with known issues.</div>
        <div className="mt-2">
          <span className="sgbh-term-prompt">kali@pentest</span>
          <span className="sgbh-term-dim">:~$</span>{" "}
          <span className="sgbh-term-cmd">_</span>
          <span className="animate-pulse">█</span>
        </div>
      </TerminalWindow>
    </SlideShell>
  ),

  /* ───── 11. Bölüm 3 — Wireshark ───── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Wireshark — Yakala & Analiz Et"
      subtitle="Nmap dışarıdan haritalar; Wireshark içeride akan her paketi gösterir. Sorun teşhisinin de, trafik analizinin de mikroskobu."
      bgGradient="linear-gradient(135deg,#22c55e,#15803d)"
      shadow="0 30px 80px -20px rgba(34,197,94,0.55)"
      icon={<Activity className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 12. Wireshark arayüzü ───── */
  () => (
    <SlideShell>
      <Eyebrow>Wireshark · paket listesi</Eyebrow>
      <H2 className="mb-2">Yakalanan trafik satır satır</H2>
      <Sub className="max-w-3xl mb-6">
        Üst panel paket listesi, alt paneller seçili paketin katmanlarını ve ham baytlarını gösterir.
        Renkler protokole göre — bir oturumu gözle takip etmeyi kolaylaştırır.
      </Sub>
      <WiresharkWindow />
    </SlideShell>
  ),

  /* ───── 13. Filtreler ───── */
  () => (
    <SlideShell>
      <Eyebrow>Wireshark · filtreler</Eyebrow>
      <H2>İki tür filtre — karıştırma</H2>
      <Sub className="mt-3 max-w-3xl">
        <span className="text-white">Capture filter</span> yakalarken neyi diske yazacağını seçer (BPF sözdizimi).
        <span className="text-white"> Display filter</span> yakalanmışın içinde arama yapar (Wireshark sözdizimi). İkisi farklı dil.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fbbf24]">
            <Eye className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Capture filter (BPF)</span>
          </div>
          <div className="space-y-2 font-mono text-[11px]">
            <div className="bg-black/40 rounded px-3 py-2 text-gray-300"><span className="text-[#fbbf24]">host</span> 192.168.56.101</div>
            <div className="bg-black/40 rounded px-3 py-2 text-gray-300"><span className="text-[#fbbf24]">tcp port</span> 80</div>
            <div className="bg-black/40 rounded px-3 py-2 text-gray-300"><span className="text-[#fbbf24]">net</span> 10.0.0.0/8</div>
          </div>
          <div className="text-[11px] text-gray-500 mt-3">Yakalama başlamadan ayarlanır; gürültüyü baştan keser.</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3 text-[#06b6d4]">
            <Filter className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Display filter</span>
          </div>
          <div className="space-y-2 font-mono text-[11px]">
            <div className="bg-black/40 rounded px-3 py-2 text-gray-300"><span className="text-[#67e8f9]">http</span></div>
            <div className="bg-black/40 rounded px-3 py-2 text-gray-300"><span className="text-[#67e8f9]">ip.addr</span> == 192.168.56.101</div>
            <div className="bg-black/40 rounded px-3 py-2 text-gray-300"><span className="text-[#67e8f9]">tcp.flags.syn</span> == 1 &amp;&amp; <span className="text-[#67e8f9]">tcp.flags.ack</span> == 0</div>
            <div className="bg-black/40 rounded px-3 py-2 text-gray-300"><span className="text-[#67e8f9]">http.request.method</span> == &quot;POST&quot;</div>
          </div>
          <div className="text-[11px] text-gray-500 mt-3">Yakalanmış trafikte anında daraltma; en çok burayı kullanırsın.</div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 14. Follow stream — açık metin sızıntı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Follow TCP Stream · güvenlik dersi</Eyebrow>
      <H2 className="mb-2">Şifresiz trafik neden tehlikeli?</H2>
      <Sub className="max-w-3xl mb-6">
        Bir oturumun tüm paketlerini birleştirip okumaya &quot;stream takibi&quot; denir.
        HTTP (şifresiz) bir girişte parola düpedüz görünür — aynı ağdaki saldırgan hiçbir şey kırmadan okur.
      </Sub>
      <FollowStream />
    </SlideShell>
  ),

  /* ───── 15. Protokol & risk tablosu ───── */
  () => (
    <SlideShell>
      <Eyebrow>Protokol seçimi · risk</Eyebrow>
      <H2>Şifresiz olanı, şifreli kardeşiyle değiştir</H2>
      <Sub className="mt-3 max-w-3xl">
        Wireshark&apos;ta bunları açık metin görürsen bu bir bulgudur. Soldakini sahada görmek
        istemezsin; sağdaki standart olmalı.
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
              <th style={{ width: "22%" }}>İş</th>
              <th style={{ width: "26%" }}>Şifresiz (riskli)</th>
              <th style={{ width: "26%" }}>Şifreli (tercih)</th>
              <th>Wireshark&apos;ta ne görürsün?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Web</td>
              <td><span className="font-mono text-[#f87171]">HTTP :80</span></td>
              <td><span className="font-mono text-[#86efac]">HTTPS :443 (TLS)</span></td>
              <td>HTTP&apos;de gövde okunur; HTTPS&apos;te yalnız şifreli baytlar.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Dosya transferi</td>
              <td><span className="font-mono text-[#f87171]">FTP :21</span></td>
              <td><span className="font-mono text-[#86efac]">SFTP / FTPS :22</span></td>
              <td>FTP&apos;de USER/PASS açık metin görünür.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Uzak terminal</td>
              <td><span className="font-mono text-[#f87171]">Telnet :23</span></td>
              <td><span className="font-mono text-[#86efac]">SSH :22</span></td>
              <td>Telnet&apos;te her tuş vuruşu pakette okunur.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">İsim çözümleme</td>
              <td><span className="font-mono text-[#f87171]">DNS :53 (UDP)</span></td>
              <td><span className="font-mono text-[#86efac]">DoH / DoT</span></td>
              <td>Klasik DNS&apos;te kimin nereye gittiği görünür.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 16. Uygulamalı lab ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
      <H2>Kendi sanal makinende dört adım</H2>
      <Sub className="mt-3 max-w-3xl">
        Lab tamamen kendi izole ağında (Kali + bir hedef VM, host-only ağ). Sonraki derse bu
        dördünü yapmış ve ekran görüntüsünü almış gelmen bekleniyor.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Terminal, title: "Hedef VM&apos;ini Nmap ile tara", desc: "sudo nmap -sV -p- ile açık portları ve sürümleri listele. Çıktıyı kaydet.", accent: "#fbbf24" },
          { icon: Activity, title: "Wireshark ile yakala", desc: "eth0/host-only arayüzünde yakalamayı başlat; hedefe bir ping ve bir HTTP isteği at.", accent: "#34d399" },
          { icon: Filter, title: "Bir display filter yaz", desc: "Önce http, sonra tcp.flags.syn==1 filtresini uygula; el sıkışmayı bul.", accent: "#06b6d4" },
          { icon: ListChecks, title: "Bir bulgu raporla", desc: "Şifresiz bir alan (örn. HTTP gövdesi) yakala, ekran görüntüsüyle 3 cümlede açıkla.", accent: "#a78bfa" },
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
          <span className="text-white">Yalnızca kendi laboratuvarında.</span> Sana ait olmayan bir ağı veya sistemi
          izinsiz taramak/dinlemek TCK 243-245 kapsamında suçtur. İzin = sınırı çizen tek şey.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 17. Savunan tarafı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Savunan tarafı · aynı araçlar</Eyebrow>
      <H2>Saldırgan tarar, savunmacı görür</H2>
      <Sub className="mt-3 max-w-3xl">
        Bu hafta öğrendiğin her teknik, savunma tarafında doğrudan karşılık bulur. Aynı paketler,
        ters yönden okunur.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <FeatureCard
          icon={Eye}
          title="Tarama tespiti"
          desc="IDS/IPS (Snort, Suricata) kısa sürede çok porta giden SYN&apos;leri port-scan olarak yakalar ve alarm üretir."
          accent="#06b6d4"
          delay={0.1}
        />
        <FeatureCard
          icon={Network}
          title="Yüzey küçültme"
          desc="Kendi ağını düzenli tara; gereksiz açık portu kapat, eski servis sürümünü yamalı sürümle değiştir."
          accent="#fbbf24"
          delay={0.2}
        />
        <FeatureCard
          icon={Lock}
          title="Şifreli protokol"
          desc="HTTP→HTTPS, Telnet→SSH, FTP→SFTP. Pasif dinleme yapan saldırgana okunacak açık metin bırakma."
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
        <Wifi className="w-4 h-4 text-[#06b6d4] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Not:</span> Anahtarlamalı (switch) ağda Wireshark sadece kendi trafiğini görür.
          Saldırganın tümünü görmesi için port-mirroring, ARP spoofing veya açık Wi-Fi gibi ek bir koşul gerekir — bunu 5. haftada açacağız.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 18. Hafta 3 önizleme + kapanış ───── */
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
        <Eyebrow>2. hafta tamamlandı · sıradaki: Kriptografi 101</Eyebrow>
        <H1>
          <span className="sgbh-shimmer-soft">Şifrele · Özetle · İmzala</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta &quot;HTTPS kullan&quot; dedik. Hafta 3&apos;te o HTTPS&apos;in altındaki matematiği açıyoruz:
          simetrik/asimetrik şifreleme, hash ve dijital imza — OpenSSL ile pratik.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
          <FeatureCard icon={Key} title="Şifreleme" desc="Simetrik (AES) ve asimetrik (RSA) — fark nerede?" accent="#06b6d4" delay={0.1} />
          <FeatureCard icon={Hash} title="Hash" desc="SHA-256, parola depolama (bcrypt/argon2)." accent="#34d399" delay={0.18} />
          <FeatureCard icon={Fingerprint} title="Dijital imza" desc="Bütünlük + kimlik doğrulama; TLS&apos;in temeli." accent="#a78bfa" delay={0.26} />
          <FeatureCard icon={FlaskConical} title="OpenSSL" desc="Komut satırında uçtan uca pratik." accent="#fbbf24" delay={0.34} />
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
            <div className="text-white font-semibold">Kali + hedef VM</div>
            <div className="text-sm text-gray-400">labı kurulu getir</div>
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
          <span>İzinsiz tarama/dinleme yok · yalnızca kendi labın</span>
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
          BVA 2205 · 2. Hafta · Ağ Trafiği Analizi
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
