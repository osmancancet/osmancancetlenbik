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
  Lock,
  Unlock,
  Key,
  KeyRound,
  GitFork,
  Hash,
  Fingerprint,
  FileSignature,
  FlaskConical,
  Terminal,
  ArrowRight,
  ArrowLeftRight,
  Gauge,
  Server,
  Laptop,
  Calendar,
  Target,
  Brain,
  AlertTriangle,
  Check,
  X,
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

/* Hibrit (TLS tarzı) şifreleme: asimetrik ile simetrik anahtarı taşı, simetrik ile veriyi şifrele */
function HybridFlow() {
  const steps = [
    {
      n: 1,
      icon: GitFork,
      color: "#a78bfa",
      title: "Asimetrik el sıkışma",
      detail:
        "İstemci, sunucunun açık anahtarıyla (public key) rastgele bir oturum anahtarını şifreleyip yollar.",
    },
    {
      n: 2,
      icon: KeyRound,
      color: "#fbbf24",
      title: "Oturum anahtarı paylaşıldı",
      detail:
        "Sunucu kendi gizli anahtarıyla (private key) çözer. Artık iki taraf da aynı simetrik anahtara sahip.",
    },
    {
      n: 3,
      icon: Key,
      color: "#06b6d4",
      title: "Simetrik veri akışı",
      detail:
        "Tüm trafik bundan sonra hızlı simetrik şifreyle (AES-256-GCM) gider. Asimetrik sadece anahtar taşıma içindi.",
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
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.22 }}
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
                className="font-mono text-xs font-bold px-2 py-0.5 rounded flex-shrink-0"
                style={{ background: `${s.color}22`, color: s.color }}
              >
                {s.title}
              </span>
              <span className="text-sm text-gray-300">{s.detail}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-5 text-[11px] text-gray-500 font-mono">
        TLS&apos;in özü: yavaş asimetrik &quot;anahtar taşır&quot;, hızlı simetrik &quot;veri taşır&quot;. İkisi birlikte = hibrit.
      </div>
    </motion.div>
  );
}

/* Çığ etkisi (avalanche): tek karakter değişince özet baştan sona değişir */
function AvalancheBox() {
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
          <Hash className="w-3.5 h-3.5" />
          <span>SHA-256 · çığ etkisi (avalanche)</span>
        </div>
      </div>
      <div className="sgbh-terminal space-y-3">
        <div>
          <div className="sgbh-term-dim">girdi:</div>
          <div className="sgbh-term-cmd">&quot;Merhaba dunya&quot;</div>
          <div className="sgbh-term-dim mt-1">sha256:</div>
          <div className="sgbh-digest">
            8f2c1a7e4b9d0c63a15e8f72d4b6c091e3a7f2d8c5b1e9a04f6d2c83b7e1a59c
          </div>
        </div>
        <div className="text-gray-600">────────────────────────────</div>
        <div>
          <div className="sgbh-term-dim">
            girdi (tek harf büyük: <span className="text-[#fbbf24]">D</span>unya):
          </div>
          <div className="sgbh-term-cmd">
            &quot;Merhaba <span className="text-[#fbbf24]">D</span>unya&quot;
          </div>
          <div className="sgbh-term-dim mt-1">sha256:</div>
          <div className="sgbh-digest-diff">
            3b9f6e02d7a4c819f5e2b0a8c6d3917e4f1a8b2c9d0e7f6a3b5c1d8e2f4a90b7
          </div>
        </div>
        <div className="text-[11px] text-gray-500 pt-1 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-[#fbbf24] mt-0.5 flex-shrink-0" />
          <span>
            Tek bir bit değişti, özet baştan sona değişti. Bu yüzden hash, bütünlük kanıtı olarak güvenilirdir —
            küçük bir oynama bile fark edilir. (Çıktılar gösterim amaçlı; gerçek değerleri kendin{" "}
            <span className="text-[#67e8f9] font-mono">sha256sum</span> ile üret.)
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* Dijital imza akışı: imzalama (gizli anahtar) ve doğrulama (açık anahtar) */
function SignatureFlow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto"
    >
      {/* İmzalama */}
      <div className="sgbh-card rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4 text-[#f87171]">
          <FileSignature className="w-5 h-5" />
          <span className="text-xs font-mono uppercase tracking-widest">
            Gönderen · İmzalama
          </span>
        </div>
        <div className="space-y-2 text-sm">
          <div className="rounded-lg px-3 py-2 bg-black/40 text-gray-300 flex items-center gap-2">
            <span className="font-mono text-[11px] text-gray-500">1</span>
            <span>Belgenin <span className="text-[#34d399] font-mono">hash</span>&apos;i alınır</span>
          </div>
          <div className="flex justify-center text-gray-600">
            <ArrowRight className="w-4 h-4 rotate-90" />
          </div>
          <div className="rounded-lg px-3 py-2 bg-black/40 text-gray-300 flex items-center gap-2">
            <span className="font-mono text-[11px] text-gray-500">2</span>
            <span>
              Hash, gönderenin <span className="sgbh-key-priv">private key</span> ile şifrelenir
            </span>
          </div>
          <div className="flex justify-center text-gray-600">
            <ArrowRight className="w-4 h-4 rotate-90" />
          </div>
          <div className="rounded-lg px-3 py-2 text-[#67e8f9] flex items-center gap-2" style={{ background: "rgba(6,182,212,0.10)", border: "1px solid rgba(6,182,212,0.3)" }}>
            <span className="font-mono text-[11px] text-gray-500">3</span>
            <span>Sonuç = <span className="font-semibold">dijital imza</span> (belgeye eklenir)</span>
          </div>
        </div>
      </div>

      {/* Doğrulama */}
      <div className="sgbh-card rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4 text-[#34d399]">
          <ShieldCheck className="w-5 h-5" />
          <span className="text-xs font-mono uppercase tracking-widest">
            Alıcı · Doğrulama
          </span>
        </div>
        <div className="space-y-2 text-sm">
          <div className="rounded-lg px-3 py-2 bg-black/40 text-gray-300 flex items-center gap-2">
            <span className="font-mono text-[11px] text-gray-500">1</span>
            <span>
              İmza, gönderenin <span className="sgbh-key-pub">public key</span> ile çözülür → hash A
            </span>
          </div>
          <div className="flex justify-center text-gray-600">
            <ArrowRight className="w-4 h-4 rotate-90" />
          </div>
          <div className="rounded-lg px-3 py-2 bg-black/40 text-gray-300 flex items-center gap-2">
            <span className="font-mono text-[11px] text-gray-500">2</span>
            <span>Alıcı belgenin hash&apos;ini yeniden hesaplar → hash B</span>
          </div>
          <div className="flex justify-center text-gray-600">
            <ArrowRight className="w-4 h-4 rotate-90" />
          </div>
          <div className="rounded-lg px-3 py-2 text-[#86efac] flex items-center gap-2" style={{ background: "rgba(34,197,94,0.10)", border: "1px solid rgba(34,197,94,0.3)" }}>
            <Check className="w-4 h-4 flex-shrink-0" />
            <span>hash A == hash B → kaynak gerçek &amp; belge değişmemiş</span>
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
        <Eyebrow>BVA 2205 · 3. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="sgbh-shimmer">Kriptografi 101</span>
          <br />
          <span className="text-white/90">Şifrele · Özetle · İmzala</span>
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          HTTPS&apos;in, e-imzanın ve parola depolamanın altındaki matematik. Üç primitif, doğru yerde doğru araç.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
          <FeatureCard
            icon={Key}
            title="Şifreleme"
            desc="Simetrik (AES) ve asimetrik (RSA · ECC) — gizlilik için."
            delay={0.3}
            accent="#06b6d4"
          />
          <FeatureCard
            icon={Hash}
            title="Hash"
            desc="SHA-256, çığ etkisi, parola depolama — bütünlük için."
            delay={0.42}
            accent="#34d399"
          />
          <FeatureCard
            icon={Fingerprint}
            title="Dijital İmza"
            desc="Bütünlük + kimlik doğrulama; e-imzanın temeli."
            delay={0.54}
            accent="#a78bfa"
          />
          <FeatureCard
            icon={FlaskConical}
            title="OpenSSL"
            desc="Komut satırında uçtan uca uygulamalı pratik."
            delay={0.66}
            accent="#fbbf24"
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 inline-flex items-center gap-2 text-xs font-mono text-gray-500"
        >
          <Calendar className="w-3.5 h-3.5" />
          Çarşamba 13:30 — 17:00 · Uygulamalı lab (OpenSSL · Linux/WSL)
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. Köprü ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 2. haftadan 3. haftaya</Eyebrow>
      <H2>Geçen hafta &quot;HTTPS kullan&quot; dedik; bu hafta nedenini açıyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        2. haftada Wireshark&apos;ta açık metin parolaların nasıl okunduğunu gördük ve çözümün TLS olduğunu söyledik.
        Şimdi o TLS&apos;in altındaki üç kriptografik aracı tek tek açıyoruz: şifreleme, hash ve dijital imza.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#f87171]">
            <Unlock className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Geçen hafta gördüğümüz sorun</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />HTTP&apos;de parola, çerez ve veri açık metin akıyordu.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Aynı ağdaki bir saldırgan hiçbir şey kırmadan okuyabiliyordu.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />İndirilen bir dosyanın değiştirilip değiştirilmediğini bilemiyorduk.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#34d399]">
            <Lock className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu haftanın hedefi</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Gizlilik: şifreleme ile veriyi okunamaz yap.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Bütünlük: hash ile değişiklik olduğunu anla.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Kimlik: dijital imza ile gönderenin gerçek olduğunu kanıtla.</li>
          </ul>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 sgbh-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3 max-w-4xl"
      >
        <AlertTriangle className="w-4 h-4 text-[#fbbf24] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Dikkat:</span> &quot;Şifreleme&quot;, &quot;hash&quot; ve &quot;encoding&quot; (Base64) aynı şey değildir.
          Base64 geri çevrilebilir ve gizlilik sağlamaz — sadece veriyi taşınabilir hale getirir.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 3. Dersin akışı ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: şifrele → özetle → imzala</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce gizliliği sağlayan şifrelemeyi, sonra bütünlüğü sağlayan hash&apos;i, en son ikisini birleştiren
        dijital imzayı işliyoruz. Sonunda OpenSSL ile her üçünü de elle yapacağız.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Şifreleme", items: ["Simetrik (AES, ChaCha20)", "Asimetrik (RSA, ECC)", "Hibrit model (TLS)"], icon: Key, accent: "#06b6d4" },
          { range: "02", title: "Hash & Bütünlük", items: ["Tek yönlülük & çığ etkisi", "SHA-256, SHA-3", "Parola depolama (bcrypt/argon2)"], icon: Hash, accent: "#34d399" },
          { range: "03", title: "Dijital İmza", items: ["İmzalama & doğrulama", "PKI ve sertifikalar", "E-imza / TLS bağlantısı"], icon: Fingerprint, accent: "#a78bfa" },
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

  /* ───── 4. Bölüm 1 — Şifreleme ───── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="Şifreleme: Gizlilik"
      subtitle="Veriyi yetkisiz gözlere okunamaz yapmak. Tek anahtarlı (simetrik) ve çift anahtarlı (asimetrik) iki temel yaklaşım."
      bgGradient="linear-gradient(135deg,#06b6d4,#0e7490)"
      shadow="0 30px 80px -20px rgba(6,182,212,0.6)"
      icon={<Key className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 5. Simetrik vs Asimetrik ───── */
  () => (
    <SlideShell>
      <Eyebrow>İki yaklaşım · aynı amaç</Eyebrow>
      <H2 className="mb-2">Simetrik vs Asimetrik</H2>
      <Sub className="max-w-3xl mb-6">
        Simetrik hızlı ama anahtarı karşı tarafa güvenle ulaştırmak sorun. Asimetrik bu sorunu çözer ama yavaştır.
        Gerçek dünya ikisini birlikte kullanır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <Key className="w-5 h-5 text-[#06b6d4]" />
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#06b6d4]">Simetrik · tek anahtar</div>
          </div>
          <p className="text-sm text-gray-300 mb-4">
            Şifreleyen ve çözen <span className="text-white">aynı anahtarı</span> kullanır. Büyük veri için ideal.
          </p>
          <div className="font-mono text-[11px] bg-black/40 rounded p-3 border border-white/5 space-y-1 mb-4">
            <div className="text-gray-500">// AES-256-GCM</div>
            <div><span className="text-[#67e8f9]">plaintext</span> + <span className="sgbh-key-pub">key</span> → <span className="text-[#a78bfa]">ciphertext</span></div>
            <div><span className="text-[#a78bfa]">ciphertext</span> + <span className="sgbh-key-pub">key</span> → <span className="text-[#67e8f9]">plaintext</span></div>
          </div>
          <ul className="space-y-2 text-xs text-gray-400">
            <li className="flex gap-2"><Check className="w-4 h-4 text-[#34d399] flex-shrink-0" />Çok hızlı, donanım hızlandırması var (AES-NI).</li>
            <li className="flex gap-2"><X className="w-4 h-4 text-[#f87171] flex-shrink-0" />Anahtar dağıtım sorunu: karşı tarafa nasıl ulaşacak?</li>
          </ul>
          <div className="text-[11px] text-gray-500 mt-3 font-mono">Örnek: AES, ChaCha20, 3DES (eski)</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <GitFork className="w-5 h-5 text-[#a78bfa]" />
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#a78bfa]">Asimetrik · anahtar çifti</div>
          </div>
          <p className="text-sm text-gray-300 mb-4">
            Açık (public) ve gizli (private) anahtar çifti. Biriyle şifrelenen yalnız diğeriyle açılır.
          </p>
          <div className="font-mono text-[11px] bg-black/40 rounded p-3 border border-white/5 space-y-1 mb-4">
            <div className="text-gray-500">// RSA-2048 / Ed25519</div>
            <div><span className="text-[#67e8f9]">msg</span> + <span className="sgbh-key-pub">public</span> → <span className="text-[#a78bfa]">cipher</span></div>
            <div><span className="text-[#a78bfa]">cipher</span> + <span className="sgbh-key-priv">private</span> → <span className="text-[#67e8f9]">msg</span></div>
          </div>
          <ul className="space-y-2 text-xs text-gray-400">
            <li className="flex gap-2"><Check className="w-4 h-4 text-[#34d399] flex-shrink-0" />Anahtar dağıtım sorununu çözer; public&apos;i herkese verebilirsin.</li>
            <li className="flex gap-2"><X className="w-4 h-4 text-[#f87171] flex-shrink-0" />Yavaş; büyük veriyi doğrudan şifrelemek için kullanılmaz.</li>
          </ul>
          <div className="text-[11px] text-gray-500 mt-3 font-mono">Örnek: RSA, ECC (Ed25519), Diffie-Hellman</div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 6. Hibrit akış ───── */
  () => (
    <SlideShell>
      <Eyebrow>Hibrit şifreleme · TLS&apos;in özü</Eyebrow>
      <H2 className="mb-2">İkisini neden birlikte kullanırız?</H2>
      <Sub className="max-w-3xl mb-6">
        HTTPS bağlantısı kurulurken yavaş asimetrik kripto yalnızca bir oturum anahtarını güvenle taşımak için kullanılır;
        ardından tüm trafik hızlı simetrik şifreyle akar. Her iki dünyanın en iyisi.
      </Sub>
      <HybridFlow />
    </SlideShell>
  ),

  /* ───── 7. Algoritma tablosu ───── */
  () => (
    <SlideShell>
      <Eyebrow>Algoritma seçimi · 2026 için makul varsayılanlar</Eyebrow>
      <H2>Hangi algoritma, hangi boyut, ne zaman?</H2>
      <Sub className="mt-3 max-w-3xl">
        &quot;Şifreleme kullandık&quot; yetmez; eski algoritma kullanmak şifrelememekten daha tehlikeli olabilir
        çünkü sahte güven verir. Genel kabul gören seçimler:
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
              <th style={{ width: "20%" }}>Amaç</th>
              <th style={{ width: "26%" }}>Önerilen</th>
              <th style={{ width: "26%" }}>Kaçın / eski</th>
              <th>Not</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Simetrik şifreleme</td>
              <td><span className="font-mono text-[#86efac]">AES-256-GCM · ChaCha20</span></td>
              <td><span className="font-mono text-[#f87171]">DES · 3DES · RC4</span></td>
              <td>GCM aynı anda bütünlük de sağlar (AEAD).</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Asimetrik şifreleme</td>
              <td><span className="font-mono text-[#86efac]">RSA-3072+ · ECC (Ed25519)</span></td>
              <td><span className="font-mono text-[#f87171]">RSA-1024</span></td>
              <td>ECC, küçük anahtarla yüksek güvenlik verir.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Hash (bütünlük)</td>
              <td><span className="font-mono text-[#86efac]">SHA-256 · SHA-3</span></td>
              <td><span className="font-mono text-[#f87171]">MD5 · SHA-1</span></td>
              <td>MD5/SHA-1 için çakışma üretilebiliyor — kullanma.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Parola depolama</td>
              <td><span className="font-mono text-[#86efac]">argon2id · bcrypt · scrypt</span></td>
              <td><span className="font-mono text-[#f87171]">düz SHA-256 · MD5</span></td>
              <td>Yavaş ve tuzlu (salt) olmalı; hız burada düşmandır.</td>
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
        Not: Anahtar boyutu önerileri zamanla değişir; kurumlar için NIST ve BSI gibi kaynakların güncel kılavuzları esas alınmalı.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 8. Bölüm 2 — Hash ───── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Hash: Bütünlük"
      subtitle="Girdiden geri döndürülemez sabit uzunlukta bir parmak izi. Veri değişti mi sorusunun cevabı."
      bgGradient="linear-gradient(135deg,#22c55e,#15803d)"
      shadow="0 30px 80px -20px rgba(34,197,94,0.55)"
      icon={<Hash className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 9. Hash özellikleri + terminal ───── */
  () => (
    <SlideShell>
      <Eyebrow>Kriptografik hash · 4 özellik</Eyebrow>
      <H2 className="mb-2">İyi bir özet fonksiyonu ne yapar?</H2>
      <Sub className="max-w-3xl mb-6">
        Hash şifreleme değildir: anahtar yok ve <span className="text-white">geri dönüşü yok</span>.
        Amaç gizlemek değil, parmak izi üretmek. Dört temel özelliği:
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          {[
            { t: "Tek yönlü", d: "Özetten girdiyi geri hesaplayamazsın (preimage direnci).", icon: Lock, c: "#06b6d4" },
            { t: "Deterministik", d: "Aynı girdi her zaman aynı özeti verir.", icon: Hash, c: "#34d399" },
            { t: "Çığ etkisi", d: "Girdideki 1 bit değişince özet tamamen değişir.", icon: Sparkles, c: "#fbbf24" },
            { t: "Çakışma direnci", d: "Aynı özeti veren iki farklı girdi pratikte bulunamaz.", icon: ShieldCheck, c: "#a78bfa" },
          ].map((p, i) => (
            <motion.div
              key={p.t}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.1 }}
              className="sgbh-card rounded-lg px-4 py-3 flex items-start gap-3"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${p.c}18`, border: `1px solid ${p.c}50` }}
              >
                <p.icon className="w-5 h-5" style={{ color: p.c }} />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{p.t}</div>
                <div className="text-xs text-gray-400">{p.d}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <TerminalWindow title="user@linux:~ — sha256sum">
          <div>
            <span className="sgbh-term-prompt">user@linux</span>
            <span className="sgbh-term-dim">:~$</span>{" "}
            <span className="sgbh-term-cmd">echo -n &quot;Merhaba dunya&quot; | sha256sum</span>
          </div>
          <div className="sgbh-digest break-all">8f2c1a7e4b9d0c63a15e8f72d4b6c091e3a7f2d8c5b1e9a04f6d2c83b7e1a59c</div>
          <div className="mt-2">
            <span className="sgbh-term-prompt">user@linux</span>
            <span className="sgbh-term-dim">:~$</span>{" "}
            <span className="sgbh-term-cmd">sha256sum ubuntu-24.04.iso</span>
          </div>
          <div className="sgbh-term-dim break-all">e3b0c442...&lt;64 hex karakter&gt;  ubuntu-24.04.iso</div>
          <div className="sgbh-term-dim mt-1">// indirme sayfasındaki değerle karşılaştır → eşleşirse dosya bozulmamış</div>
          <div className="mt-2">
            <span className="sgbh-term-prompt">user@linux</span>
            <span className="sgbh-term-dim">:~$</span>{" "}
            <span className="sgbh-term-cmd">_</span>
            <span className="animate-pulse">█</span>
          </div>
        </TerminalWindow>
      </div>
    </SlideShell>
  ),

  /* ───── 10. Avalanche / çığ etkisi ───── */
  () => (
    <SlideShell>
      <Eyebrow>Çığ etkisi · canlı örnek</Eyebrow>
      <H2 className="mb-2">Tek harf değişti, özet baştan sona değişti</H2>
      <Sub className="max-w-3xl mb-6">
        Bu davranış, hash&apos;i bütünlük kanıtı yapan şeydir. Bir saldırgan belgeyi en ufak değiştirse bile özet
        tutmaz; sahtekarlık anında ortaya çıkar.
      </Sub>
      <AvalancheBox />
    </SlideShell>
  ),

  /* ───── 11. Parola depolama ───── */
  () => (
    <SlideShell>
      <Eyebrow>Pratik uygulama · parola depolama</Eyebrow>
      <H2 className="mb-2">Parola asla &quot;şifrelenmez&quot; — hash&apos;lenir</H2>
      <Sub className="max-w-3xl mb-6">
        Veritabanı sızsa bile parolaların geri çözülememesi gerekir. Bu yüzden parolayı <span className="text-white">şifrelemeyiz</span>
        (geri döner), <span className="text-white">yavaş ve tuzlu bir hash</span> ile saklarız.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card-warn rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#f87171]">
            <X className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Yanlış</span>
          </div>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-3"><X className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Parolayı açık metin tutmak.</li>
            <li className="flex gap-3"><X className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Parolayı AES ile şifrelemek (anahtar sızarsa hepsi açılır).</li>
            <li className="flex gap-3"><X className="w-4 h-4 mt-0.5 text-[#f87171] flex-shrink-0" />Düz <span className="font-mono">MD5</span>/<span className="font-mono">SHA-256</span> — tuzsuz, çok hızlı, GPU ile saniyede milyarlar denenir.</li>
          </ul>
          <div className="font-mono text-[10px] bg-black/40 rounded p-2.5 mt-4 border border-white/5">
            <span className="text-gray-500">// kırılabilir</span><br />
            md5(&quot;Yaz2026!&quot;) → <span className="sgbh-digest-diff">e99a18c4...</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#34d399]">
            <Check className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Doğru</span>
          </div>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-3"><Check className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" /><span className="font-mono">argon2id</span> / <span className="font-mono">bcrypt</span> / <span className="font-mono">scrypt</span> kullan.</li>
            <li className="flex gap-3"><Check className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Her parolaya benzersiz <span className="text-white">salt</span> ekle (rainbow table&apos;ı kırar).</li>
            <li className="flex gap-3"><Check className="w-4 h-4 mt-0.5 text-[#34d399] flex-shrink-0" />Yavaşlık özelliktir: maliyet parametresiyle kaba kuvveti pahalı yap.</li>
          </ul>
          <div className="font-mono text-[10px] bg-black/40 rounded p-2.5 mt-4 border border-white/5">
            <span className="text-gray-500">// bcrypt (salt gömülü)</span><br />
            <span className="sgbh-digest break-all">$2b$12$Kx7...salt...hashedvalue</span>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 12. Bölüm 3 — Dijital İmza ───── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Dijital İmza"
      subtitle="Hash + asimetrik kriptografi birlikte. Belgenin değişmediğini (bütünlük) ve gerçekten kimden geldiğini (kimlik) kanıtlar."
      bgGradient="linear-gradient(135deg,#a78bfa,#5b21b6)"
      shadow="0 30px 80px -20px rgba(167,139,250,0.55)"
      icon={<Fingerprint className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 13. İmza akışı ───── */
  () => (
    <SlideShell>
      <Eyebrow>İmzalama &amp; doğrulama · adım adım</Eyebrow>
      <H2 className="mb-2">Anahtarlar tersten kullanılır</H2>
      <Sub className="max-w-3xl mb-6">
        Şifrelemede public ile şifreler, private ile açarsın. İmzada <span className="text-white">tam tersi</span>:
        gönderen private ile imzalar, herkes public ile doğrular. Böylece imzayı yalnız anahtar sahibi atabilir.
      </Sub>
      <SignatureFlow />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-6 sgbh-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3 max-w-4xl mx-auto"
      >
        <ArrowLeftRight className="w-4 h-4 text-[#a78bfa] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Bağlantı:</span> Bir TLS sertifikası tam olarak budur — sunucunun public key&apos;i,
          güvenilir bir Sertifika Otoritesi (CA) tarafından dijital imzalanmıştır. Tarayıcın bu imzayı doğrular.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 14. OpenSSL uygulamalı lab ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı OpenSSL labı</Eyebrow>
      <H2 className="mb-2">Komut satırında üç primitifi de elle yap</H2>
      <Sub className="max-w-3xl mb-5">
        Aşağıdaki komutları kendi makinende (Linux / macOS / WSL) çalıştır. Çıktıları kaydet; sonraki derse
        getir. Komutlar gerçektir, sırasıyla çalışır.
      </Sub>
      <TerminalWindow title="user@linux:~ — openssl">
        <div className="sgbh-term-dim"># 1) Hash — bir dosyanın SHA-256 özeti</div>
        <div>
          <span className="sgbh-term-prompt">user@linux</span><span className="sgbh-term-dim">:~$</span>{" "}
          <span className="sgbh-term-cmd">openssl dgst -sha256 belge.txt</span>
        </div>
        <div className="sgbh-term-dim">SHA2-256(belge.txt)= <span className="sgbh-digest">9b74c9...e1</span></div>

        <div className="sgbh-term-dim mt-3"># 2) Simetrik şifreleme — AES-256 (parola sorar)</div>
        <div>
          <span className="sgbh-term-prompt">user@linux</span><span className="sgbh-term-dim">:~$</span>{" "}
          <span className="sgbh-term-cmd">openssl enc -aes-256-cbc -pbkdf2 -in belge.txt -out belge.enc</span>
        </div>
        <div>
          <span className="sgbh-term-prompt">user@linux</span><span className="sgbh-term-dim">:~$</span>{" "}
          <span className="sgbh-term-cmd">openssl enc -d -aes-256-cbc -pbkdf2 -in belge.enc -out cozulen.txt</span>
        </div>

        <div className="sgbh-term-dim mt-3"># 3) Asimetrik — anahtar çifti üret</div>
        <div>
          <span className="sgbh-term-prompt">user@linux</span><span className="sgbh-term-dim">:~$</span>{" "}
          <span className="sgbh-term-cmd">openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:3072 -out ozel.pem</span>
        </div>
        <div>
          <span className="sgbh-term-prompt">user@linux</span><span className="sgbh-term-dim">:~$</span>{" "}
          <span className="sgbh-term-cmd">openssl rsa -in ozel.pem -pubout -out acik.pem</span>
        </div>

        <div className="sgbh-term-dim mt-3"># 4) Dijital imza — özel anahtarla imzala, açık anahtarla doğrula</div>
        <div>
          <span className="sgbh-term-prompt">user@linux</span><span className="sgbh-term-dim">:~$</span>{" "}
          <span className="sgbh-term-cmd">openssl dgst -sha256 -sign ozel.pem -out belge.sig belge.txt</span>
        </div>
        <div>
          <span className="sgbh-term-prompt">user@linux</span><span className="sgbh-term-dim">:~$</span>{" "}
          <span className="sgbh-term-cmd">openssl dgst -sha256 -verify acik.pem -signature belge.sig belge.txt</span>
        </div>
        <div className="sgbh-term-ok">Verified OK</div>
        <div className="mt-1">
          <span className="sgbh-term-prompt">user@linux</span><span className="sgbh-term-dim">:~$</span>{" "}
          <span className="sgbh-term-cmd">_</span><span className="animate-pulse">█</span>
        </div>
      </TerminalWindow>
    </SlideShell>
  ),

  /* ───── 15. Teslim görevleri ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · teslim edilecekler</Eyebrow>
      <H2>Dört çıktı, bir ekran görüntüsü</H2>
      <Sub className="mt-3 max-w-3xl">
        Yukarıdaki dört adımı tamamla ve her birinin çıktısını belgelendir. Sonraki derse bunları getir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Hash, title: "Bir dosyanın SHA-256&apos;sını üret", desc: "Dosyada tek karakter değiştir, özetin tamamen değiştiğini iki çıktıyla göster.", accent: "#34d399" },
          { icon: Lock, title: "Bir dosyayı AES-256 ile şifrele ve çöz", desc: "Şifreli (.enc) ve çözülen dosyanın orijinalle aynı olduğunu doğrula.", accent: "#06b6d4" },
          { icon: GitFork, title: "RSA anahtar çifti üret", desc: "ozel.pem ve acik.pem dosyalarını oluştur; özel anahtarı kimseyle paylaşma.", accent: "#a78bfa" },
          { icon: Fingerprint, title: "Belgeyi imzala ve doğrula", desc: "&quot;Verified OK&quot; çıktısını al; sonra dosyayı bozup doğrulamanın başarısız olduğunu gör.", accent: "#fbbf24" },
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
          <span className="text-white">Anahtar hijyeni:</span> Özel anahtar (private key) bir parola gibidir — repoya,
          e-postaya veya sohbete asla koyma. Sızması, üzerine kurulan tüm güveni geçersiz kılar.
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
          style={{ background: "linear-gradient(135deg,#06b6d4,#0e7490)", boxShadow: "0 30px 80px -20px rgba(6,182,212,0.6)" }}
        >
          <ShieldCheck className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>3. hafta tamamlandı · sıradaki: OWASP Top 10</Eyebrow>
        <H1>
          <span className="sgbh-shimmer-soft">Web Uygulama Güvenliği</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta gizlilik, bütünlük ve kimliği kriptografiyle kurduk. Hafta 4&apos;te bu kontroller nerede
          kırılıyor: OWASP Top 10 ile injection, erişim kontrolü ve kriptografik hataları inceliyoruz.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
          <FeatureCard icon={Target} title="Injection" desc="SQLi ve komut enjeksiyonu — A03." accent="#f87171" delay={0.1} />
          <FeatureCard icon={Lock} title="Access Control" desc="Yetki atlatma; en sık görülen risk — A01." accent="#06b6d4" delay={0.18} />
          <FeatureCard icon={KeyRound} title="Crypto Failures" desc="Bu haftanın yanlış uygulanmış hali — A02." accent="#a78bfa" delay={0.26} />
          <FeatureCard icon={ListChecks} title="Pratik" desc="Zafiyetli bir uygulamada canlı gösterim." accent="#34d399" delay={0.34} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="sgbh-card rounded-xl p-5">
            <Calendar className="w-5 h-5 text-[#06b6d4] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Ders saati</div>
            <div className="text-white font-semibold">Çarşamba</div>
            <div className="text-sm text-gray-400">13:30 — 17:00</div>
          </div>
          <div className="sgbh-card rounded-xl p-5">
            <Terminal className="w-5 h-5 text-[#a78bfa] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">OpenSSL kurulu</div>
            <div className="text-sm text-gray-400">lab çıktılarıyla gel</div>
          </div>
          <div className="sgbh-card rounded-xl p-5">
            <Brain className="w-5 h-5 text-[#34d399] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">OpenSSL raporu</div>
            <div className="text-sm text-gray-400">4 çıktı + ekran görüntüsü</div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 text-xs font-mono text-gray-600 flex items-center justify-center gap-2"
        >
          <Gauge className="w-3.5 h-3.5" />
          <span>Doğru algoritma · güncel anahtar boyutu · özel anahtarı koru</span>
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
          BVA 2205 · 3. Hafta · Kriptografi 101
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
