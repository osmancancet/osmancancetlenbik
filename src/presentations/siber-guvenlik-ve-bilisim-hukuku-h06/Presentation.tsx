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
  Fingerprint,
  Smartphone,
  UserCheck,
  IdCard,
  Hash,
  Server,
  Laptop,
  ArrowRight,
  ArrowLeftRight,
  AlertTriangle,
  Clock,
  Calendar,
  Target,
  Brain,
  Sparkles,
  ListChecks,
  Terminal,
  Database,
  RefreshCw,
  CheckCircle2,
  XCircle,
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

function OAuthFlow() {
  const steps = [
    {
      n: 1,
      dir: "right" as const,
      label: "Yetkilendirme isteği",
      detail: "Kullanıcı uygulamada Google ile giriş&apos;e tıklar; tarayıcı yetkilendirme sunucusuna yönlenir.",
      color: "#06b6d4",
    },
    {
      n: 2,
      dir: "right" as const,
      label: "Onay & authorization code",
      detail: "Kullanıcı kimliğini doğrular ve izni onaylar; sunucu kısa ömürlü bir code üretip uygulamaya geri yönlendirir.",
      color: "#a78bfa",
    },
    {
      n: 3,
      dir: "right" as const,
      label: "code + client_secret → token",
      detail: "Uygulamanın sunucusu code&apos;u arka kanalda access token ile takas eder (tarayıcıya değil, sunucudan sunucuya).",
      color: "#fbbf24",
    },
    {
      n: 4,
      dir: "left" as const,
      label: "Access token ile API çağrısı",
      detail: "Uygulama token&apos;ı kaynak sunucuya gönderir; parola hiçbir aşamada uygulamaya verilmez.",
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
          <Laptop className="w-4 h-4" /> İstemci uygulama
        </span>
        <span className="flex items-center gap-2 text-[#c4b5fd]">
          Yetkilendirme sunucusu <Server className="w-4 h-4" />
        </span>
      </div>
      <div className="space-y-4">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, x: s.dir === "right" ? -30 : 30 }}
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
              <ArrowRight
                className={`w-5 h-5 flex-shrink-0 ${s.dir === "left" ? "rotate-180" : ""}`}
                style={{ color: s.color }}
              />
              <span
                className="font-mono text-xs font-bold px-2 py-0.5 rounded whitespace-nowrap"
                style={{ background: `${s.color}22`, color: s.color }}
              >
                {s.label}
              </span>
              <span
                className="text-sm text-gray-300"
                dangerouslySetInnerHTML={{ __html: s.detail }}
              />
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-5 text-[11px] text-gray-500 font-mono">
        Bu &quot;Authorization Code&quot; akışıdır — sunucu tarafı uygulamalar için önerilen güvenli yol; SPA/mobilde üstüne PKCE eklenir.
      </div>
    </motion.div>
  );
}

function JWTAnatomy() {
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
          <Key className="w-3.5 h-3.5" />
          <span>jwt.io — encoded token</span>
        </div>
      </div>
      <div className="sgbh-jwt">
        <span className="sgbh-jwt-header">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</span>
        <span className="sgbh-jwt-dot">.</span>
        <span className="sgbh-jwt-payload">eyJzdWIiOiIxMDIzIiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNzUxMjQ4MDAwfQ</span>
        <span className="sgbh-jwt-dot">.</span>
        <span className="sgbh-jwt-sig">3pTk7_qF8nZ2c1bYxR0sLmO9vQwE6hJ4dN8aUgIcK2s</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
        <div className="bg-[#0d0d0d] px-4 py-3">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#f87171] mb-1">Header</div>
          <div className="text-[11px] text-gray-400 leading-relaxed">
            Algoritma ve tip. <span className="font-mono text-gray-300">alg</span> /{" "}
            <span className="font-mono text-gray-300">typ</span>.
          </div>
        </div>
        <div className="bg-[#0d0d0d] px-4 py-3">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#c4b5fd] mb-1">Payload</div>
          <div className="text-[11px] text-gray-400 leading-relaxed">
            Claim&apos;ler: <span className="font-mono text-gray-300">sub</span>,{" "}
            <span className="font-mono text-gray-300">role</span>,{" "}
            <span className="font-mono text-gray-300">exp</span>. Sadece base64 — şifreli değil.
          </div>
        </div>
        <div className="bg-[#0d0d0d] px-4 py-3">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#34d399] mb-1">Signature</div>
          <div className="text-[11px] text-gray-400 leading-relaxed">
            HMAC/RSA imza. Sunucunun gizli anahtarı olmadan üretilemez; içeriği kurcalayan yakalanır.
          </div>
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
        <Eyebrow>BVA 2205 · 6. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="sgbh-shimmer">Kimlik &amp; Erişim Yönetimi</span>
          <br />
          <span className="text-white/90">OAuth 2.0 · JWT · MFA · Hashing</span>
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Sen kimsin (authentication), neye iznin var (authorization)? Bu hafta modern
          web&apos;in kimlik altyapısını söküyoruz.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={UserCheck}
            title="Kimlik Doğrulama"
            desc="Parola depolama, MFA, oturum yönetimi — kimliği güvenle ispat etmek."
            delay={0.3}
            accent="#06b6d4"
          />
          <FeatureCard
            icon={KeyRound}
            title="Yetkilendirme"
            desc="OAuth 2.0 delege yetki, access/refresh token, kapsam (scope) mantığı."
            delay={0.45}
            accent="#a78bfa"
          />
          <FeatureCard
            icon={Hash}
            title="Parola Hashing"
            desc="bcrypt &amp; argon2id, salt, iş faktörü; neden SHA-256 tek başına yetmez."
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
          Çarşamba 13:30 — 17:00 · Uygulamalı lab (Node.js + jwt.io)
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. Geçen hafta → bu hafta ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 5. haftadan 6. haftaya</Eyebrow>
      <H2>Trafiği şifreledik; şimdi kapının kendisini kuruyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Önceki haftalarda paketleri okuduk, TLS ile hattı şifreledik. Ama hat güvenli olsa bile
        karşıdaki kişinin gerçekten o kişi olduğunu nasıl bilirsin? Bu hafta kimlik ve erişim
        katmanını ele alıyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#67e8f9]">
            <UserCheck className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Authentication</span>
          </div>
          <p className="text-sm text-gray-300 mb-3">
            Kimliğin <span className="text-white">ispatı</span>. &quot;Sen kimsin?&quot;
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Bildiğin şey: parola, PIN.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Sahip olduğun şey: telefon, donanım anahtarı.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Olduğun şey: parmak izi, yüz.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#c4b5fd]">
            <KeyRound className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Authorization</span>
          </div>
          <p className="text-sm text-gray-300 mb-3">
            İznin <span className="text-white">kapsamı</span>. &quot;Neye erişebilirsin?&quot;
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#a78bfa] flex-shrink-0" />Kimliğin doğrulandı, ama her şeye yetkin yok.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#a78bfa] flex-shrink-0" />Rol &amp; kapsam: kim hangi kaynağı görür?</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#a78bfa] flex-shrink-0" />İkisini karıştırmak en sık güvenlik açığı.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 3. Dersin akışı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: parola → token → ikinci faktör</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce parolayı doğru saklamayı öğreniyoruz; sonra OAuth 2.0 ve JWT ile token tabanlı
        erişimi kuruyoruz; en son MFA ile çalınan parolanın bile tek başına yetmemesini sağlıyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Parola Hashing", items: ["bcrypt & argon2id", "Salt & pepper", "İş faktörü (cost)"], icon: Hash, accent: "#34d399" },
          { range: "02", title: "OAuth 2.0 & JWT", items: ["Delege yetkilendirme", "Authorization Code akışı", "JWT anatomisi & doğrulama"], icon: KeyRound, accent: "#a78bfa" },
          { range: "03", title: "MFA & Oturum", items: ["TOTP & WebAuthn", "Refresh token döngüsü", "Oturum & token güvenliği"], icon: Smartphone, accent: "#06b6d4" },
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

  /* ───── 4. Bölüm 1 — Parola Hashing ───── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="Parolayı Doğru Sakla"
      subtitle="Parola asla açık metin veya düz hash ile saklanmaz. bcrypt ve argon2 ile yavaş, tuzlanmış özetler üretiriz; sızsa bile kırılması yıllar sürsün."
      bgGradient="linear-gradient(135deg,#22c55e,#15803d)"
      shadow="0 30px 80px -20px rgba(34,197,94,0.55)"
      icon={<Hash className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 5. Parola depolama: yanlış vs doğru ───── */
  () => (
    <SlideShell>
      <Eyebrow>Parola depolama · sık hatalar</Eyebrow>
      <H2 className="mb-2">Neden &quot;sadece SHA-256&quot; yanlış?</H2>
      <Sub className="max-w-3xl mb-6">
        SHA-256 hızlı olmak için tasarlandı; parola için bu bir kusurdur. Bir saldırgan saniyede
        milyarlarca tahmini hash&apos;leyebilir. Doğru çözüm: kasten yavaş, tuzlanmış algoritmalar.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card-warn rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#f87171]">
            <XCircle className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Yanlış</span>
          </div>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-3"><AlertTriangle className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" /><span>Açık metin saklamak — sızıntıda her şey biter.</span></li>
            <li className="flex gap-3"><AlertTriangle className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" /><span>MD5 / SHA-1 — kırık, çakışmalı, çok hızlı.</span></li>
            <li className="flex gap-3"><AlertTriangle className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" /><span>Salt&apos;sız hash — rainbow table&apos;a açık.</span></li>
            <li className="flex gap-3"><AlertTriangle className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" /><span>Parolayı &quot;şifrelemek&quot; — anahtar sızarsa geri açılır.</span></li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#34d399]">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Doğru</span>
          </div>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-3"><ShieldCheck className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" /><span>argon2id (tercih) veya bcrypt ile özetle.</span></li>
            <li className="flex gap-3"><ShieldCheck className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" /><span>Her kullanıcıya benzersiz rastgele salt.</span></li>
            <li className="flex gap-3"><ShieldCheck className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" /><span>İş faktörünü (cost) donanım hızına göre ayarla.</span></li>
            <li className="flex gap-3"><ShieldCheck className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" /><span>Doğrulamada sabit zamanlı karşılaştırma kullan.</span></li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 6. bcrypt çıktı anatomisi ───── */
  () => (
    <SlideShell>
      <Eyebrow>bcrypt · çıktıyı oku</Eyebrow>
      <H2 className="mb-2">Bir hash satırı her şeyi söyler</H2>
      <Sub className="max-w-3xl mb-6">
        bcrypt çıktısı tek satırda algoritma, iş faktörü, salt ve özeti taşır. Veritabanında ayrı
        bir salt sütunu tutmana gerek yoktur — salt zaten hash&apos;in içindedir.
      </Sub>
      <CodeWindow title="users tablosu — password_hash sütunu" icon={Database}>
        <div className="sgbh-code-com"># bcrypt hash yapısı:</div>
        <div className="mt-1 text-[13px] break-all">
          <span className="sgbh-code-fn">$2b$</span>
          <span className="sgbh-code-num">12</span>
          <span className="sgbh-code-com">$</span>
          <span className="sgbh-code-str">N9qo8uLOickgx2ZMRZoMye</span>
          <span className="sgbh-code-key">IjZAgcfl7p92ldGxad68LJZdL17lhWy</span>
        </div>
        <div className="mt-4 space-y-1 text-[11px]">
          <div><span className="sgbh-code-fn">$2b$</span> <span className="sgbh-code-com">→ algoritma sürümü (bcrypt)</span></div>
          <div><span className="sgbh-code-num">12</span> <span className="sgbh-code-com">→ iş faktörü (cost): 2^12 tur — her +1 maliyeti ikiye katlar</span></div>
          <div><span className="sgbh-code-str">22 karakter</span> <span className="sgbh-code-com">→ salt (rastgele, kullanıcıya özel)</span></div>
          <div><span className="sgbh-code-key">31 karakter</span> <span className="sgbh-code-com">→ asıl hash (parola + salt türevi)</span></div>
        </div>
      </CodeWindow>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-5 sgbh-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3 max-w-4xl"
      >
        <Clock className="w-4 h-4 text-[#fbbf24] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">İş faktörü neden önemli?</span> Donanım hızlandıkça cost&apos;u
          artırırsın. Hedef: bir doğrulamanın sunucunda yaklaşık 50–250&nbsp;ms sürmesi — kullanıcıyı
          yormaz, saldırganı yorar.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 7. bcrypt vs argon2 tablo ───── */
  () => (
    <SlideShell>
      <Eyebrow>Algoritma seçimi</Eyebrow>
      <H2>bcrypt mi, argon2 mi?</H2>
      <Sub className="mt-3 max-w-3xl">
        İkisi de doğru tercihtir; ikisi de kasten yavaştır. Fark, saldırganın hangi donanımla
        zorlanacağında. argon2id ayrıca bellek de tüketir — GPU/ASIC saldırılarını pahalılaştırır.
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
              <th style={{ width: "22%" }}>Özellik</th>
              <th style={{ width: "26%" }}>bcrypt</th>
              <th style={{ width: "26%" }}>argon2id</th>
              <th>Önem</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Ayar ekseni</td>
              <td>Yalnız CPU iş faktörü (cost)</td>
              <td>CPU + bellek + paralellik</td>
              <td>argon2 daha ince ayarlanabilir.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">GPU direnci</td>
              <td>Orta</td>
              <td>Yüksek (bellek-zor)</td>
              <td>Bellek tüketimi GPU farmlarını yavaşlatır.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Olgunluk</td>
              <td>1999&apos;dan beri, çok denenmiş</td>
              <td>2015 PHC galibi, modern</td>
              <td>bcrypt hâlâ güvenli ve yaygın.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Girdi sınırı</td>
              <td>~72 bayt (sessizce keser)</td>
              <td>Pratik sınır yok</td>
              <td>bcrypt&apos;te uzun parolada tuzak var.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Öneri</td>
              <td><span className="sgbh-pill sgbh-pill-a">kabul edilir</span></td>
              <td><span className="sgbh-pill sgbh-pill-c">yeni projede tercih</span></td>
              <td>OWASP: yeni sistemde argon2id.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 8. Bölüm 2 — OAuth & JWT ───── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Token Tabanlı Erişim"
      subtitle="Parolayı her isteğe koymak yerine token kullanırız. OAuth 2.0 yetkiyi güvenle devreder; JWT bu yetkiyi taşınabilir, doğrulanabilir bir bilete dönüştürür."
      bgGradient="linear-gradient(135deg,#a855f7,#6b21a8)"
      shadow="0 30px 80px -20px rgba(168,85,247,0.55)"
      icon={<KeyRound className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 9. OAuth 2.0 nedir ───── */
  () => (
    <SlideShell>
      <Eyebrow>OAuth 2.0 · delege yetkilendirme</Eyebrow>
      <H2 className="mb-2">&quot;Parolanı verme, anahtarı ödünç ver&quot;</H2>
      <Sub className="max-w-3xl mb-6">
        OAuth 2.0 bir <span className="text-white">yetkilendirme</span> çerçevesidir. Bir uygulamaya
        Google hesabınla giriş yaptığında, Google&apos;a parolanı verirsin; uygulamaya parolanı
        değil, sınırlı bir <span className="text-[#c4b5fd]">access token</span> verirsin.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        {[
          { role: "Resource Owner", desc: "Kullanıcı — verinin sahibi.", icon: UserCheck, color: "#06b6d4" },
          { role: "Client", desc: "Erişim isteyen üçüncü taraf uygulama.", icon: Laptop, color: "#fbbf24" },
          { role: "Authorization Server", desc: "Kimliği doğrular, token üretir (Google, Auth0).", icon: Server, color: "#a78bfa" },
          { role: "Resource Server", desc: "Korunan API; token&apos;ı doğrular ve veriyi verir.", icon: Database, color: "#34d399" },
        ].map((r, i) => (
          <motion.div
            key={r.role}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="sgbh-card rounded-xl p-4"
          >
            <r.icon className="w-5 h-5 mb-3" style={{ color: r.color }} />
            <div className="text-sm font-semibold text-white mb-1">{r.role}</div>
            <p className="text-[11px] text-gray-400 leading-snug">{r.desc}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="sgbh-card-warn rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <AlertTriangle className="w-4 h-4 text-[#fbbf24] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Sık karışan nokta:</span> OAuth 2.0 yetkilendirmedir,
          kimlik doğrulama değil. &quot;Google ile giriş&quot; gibi kimlik için üstüne{" "}
          <span className="font-mono text-[#67e8f9]">OpenID Connect (OIDC)</span> katmanı gelir.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 10. OAuth akış diyagramı ───── */
  () => (
    <SlideShell>
      <Eyebrow>OAuth 2.0 · Authorization Code akışı</Eyebrow>
      <H2 className="mb-2">Token nasıl ele geçer?</H2>
      <Sub className="max-w-3xl mb-6">
        Dört adımda kullanıcı parolasını yalnızca yetkilendirme sunucusuna verir; uygulama hiçbir
        zaman parolayı görmez, sadece sınırlı bir token alır.
      </Sub>
      <OAuthFlow />
    </SlideShell>
  ),

  /* ───── 11. JWT anatomisi ───── */
  () => (
    <SlideShell>
      <Eyebrow>JWT · üç parça</Eyebrow>
      <H2 className="mb-2">JSON Web Token&apos;ın anatomisi</H2>
      <Sub className="max-w-3xl mb-6">
        JWT, nokta ile ayrılmış üç base64url parçadır: <span className="text-[#f87171]">header</span>.
        <span className="text-[#c4b5fd]">payload</span>.<span className="text-[#34d399]">signature</span>.
        İlk ikisi okunabilir; imza ise sunucunun gizli anahtarını gerektirir.
      </Sub>
      <JWTAnatomy />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-5 sgbh-card-warn rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <AlertTriangle className="w-4 h-4 text-[#f87171] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">JWT şifreli değildir, sadece imzalıdır.</span> Payload&apos;ı
          herkes base64-decode edip okuyabilir. İçine parola, kart numarası gibi gizli veri koyma.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 12. JWT doğrulama & alg none tuzağı ───── */
  () => (
    <SlideShell>
      <Eyebrow>JWT · doğrulama &amp; klasik tuzak</Eyebrow>
      <H2 className="mb-2">İmzayı doğrula, &quot;alg: none&quot;a düşme</H2>
      <Sub className="max-w-3xl mb-6">
        Sunucu her istekte token&apos;ın imzasını gizli anahtarıyla yeniden hesaplar. En bilinen JWT
        açığı, kütüphanenin <span className="font-mono text-[#f87171]">alg</span> alanına körü körüne
        güvenmesi ve imzayı atlamasıdır.
      </Sub>
      <CodeWindow title="auth.js — token doğrulama" icon={Terminal}>
        <div><span className="sgbh-code-com">// Express middleware — her korunan rotada çalışır</span></div>
        <div className="mt-1">
          <span className="sgbh-code-fn">function</span>{" "}
          <span className="sgbh-code-key">requireAuth</span>(req, res, next) {"{"}
        </div>
        <div className="pl-4">
          <span className="sgbh-code-key">const</span> token = req.headers.authorization
          <span className="sgbh-code-com">?.</span>split(<span className="sgbh-code-str">&quot; &quot;</span>)[<span className="sgbh-code-num">1</span>];
        </div>
        <div className="pl-4">
          <span className="sgbh-code-key">try</span> {"{"}
        </div>
        <div className="pl-8">
          <span className="sgbh-code-com">// alg&apos;ı sabitle — token&apos;dan OKUMA</span>
        </div>
        <div className="pl-8">
          req.user = jwt.<span className="sgbh-code-fn">verify</span>(token, SECRET, {"{"} algorithms: [<span className="sgbh-code-str">&quot;HS256&quot;</span>] {"}"});
        </div>
        <div className="pl-8">
          <span className="sgbh-code-key">return</span> <span className="sgbh-code-fn">next</span>();
        </div>
        <div className="pl-4">{"}"} <span className="sgbh-code-key">catch</span> {"{"}</div>
        <div className="pl-8">
          <span className="sgbh-code-key">return</span> res.<span className="sgbh-code-fn">status</span>(<span className="sgbh-code-num">401</span>).<span className="sgbh-code-fn">json</span>({"{"} error: <span className="sgbh-code-str">&quot;Gecersiz token&quot;</span> {"}"});
        </div>
        <div className="pl-4">{"}"}</div>
        <div>{"}"}</div>
      </CodeWindow>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl"
      >
        <div className="sgbh-card-warn rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-2">
          <XCircle className="w-4 h-4 text-[#f87171] mt-0.5 flex-shrink-0" />
          <span>Saldırgan <span className="font-mono">alg: none</span> yapıp imzayı silerse ve kütüphane kabul ederse, kendi admin token&apos;ını üretebilir.</span>
        </div>
        <div className="sgbh-card rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#34d399] mt-0.5 flex-shrink-0" />
          <span>Çözüm: izin verilen algoritmayı sunucu tarafında <span className="font-mono">whitelist</span> et; <span className="font-mono">exp</span> süresini de mutlaka kontrol et.</span>
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 13. Access vs Refresh token ───── */
  () => (
    <SlideShell>
      <Eyebrow>Token yaşam döngüsü</Eyebrow>
      <H2 className="mb-2">Access token kısa, refresh token uzun</H2>
      <Sub className="max-w-3xl mb-6">
        Tek bir uzun ömürlü token tehlikelidir: çalınırsa süresiz erişim verir. Bu yüzden ikiye
        böleriz — sık kullanılan ama kısa ömürlü access token, ve onu yenileyen refresh token.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#67e8f9]">
            <Key className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Access Token</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><Clock className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Kısa ömürlü (örn. 5–15 dakika).</li>
            <li className="flex gap-2"><ArrowRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Her API isteğinde gönderilir.</li>
            <li className="flex gap-2"><ShieldCheck className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Çalınsa bile penceresi dar.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#c4b5fd]">
            <RefreshCw className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Refresh Token</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><Clock className="w-4 h-4 mt-0.5 text-[#a78bfa] flex-shrink-0" />Uzun ömürlü (günler/haftalar).</li>
            <li className="flex gap-2"><Lock className="w-4 h-4 mt-0.5 text-[#a78bfa] flex-shrink-0" />Yalnız yeni access token almak için kullanılır.</li>
            <li className="flex gap-2"><Database className="w-4 h-4 mt-0.5 text-[#a78bfa] flex-shrink-0" />Sunucuda saklanır; iptal edilebilir (revoke).</li>
          </ul>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 sgbh-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3 max-w-4xl"
      >
        <ArrowLeftRight className="w-4 h-4 text-[#34d399] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Akış:</span> access token süresi dolunca istemci sessizce
          refresh token ile yenisini alır. Refresh token tarayıcıda <span className="font-mono">HttpOnly</span>{" "}
          çerezde tutulursa JavaScript ile çalınamaz.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 14. Bölüm 3 — MFA ───── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="İkinci Faktör: MFA"
      subtitle="Parola çalınabilir, tahmin edilebilir, yeniden kullanılır. İkinci bir faktör eklediğinde, saldırganın parolayı bilmesi tek başına yetmez."
      bgGradient="linear-gradient(135deg,#06b6d4,#0e7490)"
      shadow="0 30px 80px -20px rgba(6,182,212,0.6)"
      icon={<Smartphone className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 15. MFA faktörleri & yöntemleri ───── */
  () => (
    <SlideShell>
      <Eyebrow>MFA · üç faktör ailesi</Eyebrow>
      <H2 className="mb-2">Farklı ailelerden iki kanıt iste</H2>
      <Sub className="max-w-3xl mb-6">
        Çok faktörlü kimlik doğrulama, farklı kategorilerden en az iki kanıt birleştirir. Aynı
        aileden iki şey (iki parola) MFA sayılmaz — biri bilinen, biri sahip olunan olmalı.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <FeatureCard
          icon={KeyRound}
          title="Bildiğin şey"
          desc="Parola, PIN, güvenlik sorusu. En zayıf halka — tahmin ve sızıntıya açık."
          accent="#fbbf24"
          delay={0.1}
        />
        <FeatureCard
          icon={Smartphone}
          title="Sahip olduğun şey"
          desc="TOTP uygulaması, SMS kodu, donanım anahtarı (YubiKey, FIDO2)."
          accent="#06b6d4"
          delay={0.2}
        />
        <FeatureCard
          icon={Fingerprint}
          title="Olduğun şey"
          desc="Parmak izi, yüz, ses. Biyometri — kolay ama değiştirilemez."
          accent="#34d399"
          delay={0.3}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        className="sgbh-card rounded-xl p-1"
      >
        <table className="sgbh-tbl">
          <thead>
            <tr>
              <th style={{ width: "24%" }}>Yöntem</th>
              <th style={{ width: "30%" }}>Nasıl çalışır?</th>
              <th>Güvenlik notu</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="font-mono text-[#67e8f9]">TOTP</span></td>
              <td>Paylaşılan gizli anahtardan 30 sn&apos;de bir 6 haneli kod (Google Authenticator).</td>
              <td>Sağlam ve çevrimdışı; ama phishing&apos;e karşı tam koruma vermez.</td>
            </tr>
            <tr>
              <td><span className="font-mono text-[#f87171]">SMS OTP</span></td>
              <td>Telefona kısa mesajla kod gönderilir.</td>
              <td>SIM-swap ve şebeke saldırılarına açık — en zayıf MFA.</td>
            </tr>
            <tr>
              <td><span className="font-mono text-[#34d399]">WebAuthn / FIDO2</span></td>
              <td>Donanım anahtarı veya cihaz, alan adına bağlı asimetrik imza üretir.</td>
              <td>Phishing&apos;e dayanıklı — altın standart; parolasız da çalışır.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 16. TOTP doğrulama terminal ───── */
  () => (
    <SlideShell>
      <Eyebrow>TOTP · perde arkası</Eyebrow>
      <H2 className="mb-2">6 haneli kod nereden geliyor?</H2>
      <Sub className="max-w-3xl mb-6">
        Sunucu ve uygulama aynı gizli anahtarı paylaşır. Kod, bu anahtar ile şu anki zamanın
        (30&apos;ar saniyelik dilimler) HMAC&apos;inden türetilir. İnternet gerekmez; saat senkronu yeter.
      </Sub>
      <TerminalWindow title="server:~ — totp doğrulama (RFC 6238)">
        <div>
          <span className="sgbh-term-prompt">server</span>
          <span className="sgbh-term-dim">:~$</span>{" "}
          <span className="sgbh-term-cmd">oathtool --totp -b JBSWY3DPEHPK3PXP</span>
        </div>
        <div className="sgbh-term-ok">284619</div>
        <div className="sgbh-term-dim mt-1"># kullanıcı bu kodu girer, sunucu kendi hesabıyla karşılaştırır</div>
        <div className="mt-2">
          <span className="sgbh-term-prompt">server</span>
          <span className="sgbh-term-dim">:~$</span>{" "}
          <span className="sgbh-term-cmd">verify(user_input=&quot;284619&quot;)</span>
        </div>
        <div><span className="sgbh-term-ok">[OK]</span> <span className="sgbh-term-dim">kod geçerli · zaman penceresi: ±1 adım (saat kayması toleransı)</span></div>
        <div className="mt-1">
          <span className="sgbh-term-prompt">server</span>
          <span className="sgbh-term-dim">:~$</span>{" "}
          <span className="sgbh-term-cmd">verify(user_input=&quot;111111&quot;)</span>
        </div>
        <div><span className="sgbh-term-err">[RED]</span> <span className="sgbh-term-err">kod eşleşmedi — giriş reddedildi, deneme sayacı +1</span></div>
        <div className="mt-2">
          <span className="sgbh-term-prompt">server</span>
          <span className="sgbh-term-dim">:~$</span>{" "}
          <span className="sgbh-term-cmd">_</span>
          <span className="animate-pulse">█</span>
        </div>
      </TerminalWindow>
    </SlideShell>
  ),

  /* ───── 17. Uygulamalı lab ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
      <H2>Küçük bir kimlik servisi: dört adım</H2>
      <Sub className="mt-3 max-w-3xl">
        Node.js ile minik bir giriş servisi kuracaksın. Amaç teori değil; parolayı doğru saklamayı
        ve token üretmeyi elinle yapmak. Sonraki derse çalışır kod ve kısa not getir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Hash, title: "Parolayı argon2id ile hashle", desc: "Kayıt rotasında düz parolayı asla saklama; argon2.hash() ile özetleyip veritabanına yaz.", accent: "#34d399" },
          { icon: UserCheck, title: "Girişte doğrula", desc: "Login rotasında argon2.verify(hash, parola) ile karşılaştır; sonucu açık metinle kıyaslama.", accent: "#fbbf24" },
          { icon: Key, title: "Bir JWT üret", desc: "Başarılı girişte 15 dk ömürlü, HS256 imzalı bir access token döndür; payload&apos;a sub ve role koy.", accent: "#a78bfa" },
          { icon: ShieldCheck, title: "Korunan rotayı koru", desc: "jwt.verify ile algoritmayı sabitle, exp&apos;i kontrol et; gecersiz token&apos;a 401 dön.", accent: "#06b6d4" },
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
              <p
                className="text-sm text-gray-400 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t.desc }}
              />
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
          <span className="text-white">Gizli anahtarı koda gömme.</span> SECRET&apos;ı ortam
          değişkeninden (.env) oku ve repoya commit etme. Sızan bir JWT anahtarı, tüm token&apos;ları
          taklit edilebilir kılar.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 18. Özet & hafta 7 önizleme + kapanış ───── */
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
          <Shield className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>6. hafta tamamlandı · sıradaki: Web Açıkları</Eyebrow>
        <H1>
          <span className="sgbh-shimmer-soft">Injection &amp; XSS</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Kimliği güvenle kurduk; şimdi uygulamanın içine giren veriyi inceliyoruz. Hafta 7&apos;de
          SQL injection, XSS ve girdi doğrulama — saldırganın en sevdiği kapılar.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
          <FeatureCard icon={Database} title="SQL Injection" desc="Girdi sorguya yapışınca veritabanı çalınır." accent="#06b6d4" delay={0.1} />
          <FeatureCard icon={Brain} title="XSS" desc="Tarayıcıda çalışan saldırgan scripti." accent="#a78bfa" delay={0.18} />
          <FeatureCard icon={ShieldCheck} title="Girdi doğrulama" desc="Allowlist, parametreli sorgu, encoding." accent="#34d399" delay={0.26} />
          <FeatureCard icon={Target} title="Pratik" desc="DVWA üzerinde kontrollü deneme." accent="#fbbf24" delay={0.34} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="sgbh-card rounded-xl p-5">
            <Calendar className="w-5 h-5 text-[#06b6d4] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Ders saati</div>
            <div className="text-white font-semibold">Çarşamba</div>
            <div className="text-sm text-gray-400">13:30 — 17:00</div>
          </div>
          <div className="sgbh-card rounded-xl p-5">
            <IdCard className="w-5 h-5 text-[#a78bfa] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">Node.js kurulu</div>
            <div className="text-sm text-gray-400">labı çalışır getir</div>
          </div>
          <div className="sgbh-card rounded-xl p-5">
            <ListChecks className="w-5 h-5 text-[#34d399] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">Kimlik servisi</div>
            <div className="text-sm text-gray-400">4 adım + kısa not</div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 text-xs font-mono text-gray-600 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Parolayı hashle · token&apos;ı imzala · ikinci faktörü ekle</span>
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
          BVA 2205 · 6. Hafta · Kimlik &amp; Erişim Yönetimi
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
