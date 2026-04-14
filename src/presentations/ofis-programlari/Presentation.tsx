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
  Presentation as PresentationIcon,
  Sparkles,
  Palette,
  Video,
  Zap,
  Check,
  X,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Layers,
  Mouse,
  Keyboard,
  Wand2,
  Image as ImageIcon,
  FileText,
  Download,
  Share2,
  Lightbulb,
  Target,
  Users,
  Clock,
  Brain,
  Code,
  PlayCircle,
  Quote,
  TrendingUp,
  Globe,
  Award,
  GraduationCap,
  Briefcase,
  DollarSign,
  History,
  AlertTriangle,
  CheckCircle2,
  XCircle,
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
        <div className="absolute inset-0 ofis-grid-bg pointer-events-none" />
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
      className="inline-flex items-center gap-3 mb-6 text-xs font-mono uppercase tracking-[0.25em] text-[#00ff41]"
    >
      <span className="w-8 h-px bg-[#00ff41]" />
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
  accent = "#00ff41",
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
      className="ofis-card ofis-card-hover rounded-xl p-6 transition-all"
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
        style={{
          background: `${accent}15`,
          border: `1px solid ${accent}40`,
        }}
      >
        <Icon className="w-6 h-6" style={{ color: accent }} />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
  source,
  delay = 0,
  accent = "#00ff41",
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  source?: string;
  delay?: number;
  accent?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className="ofis-card rounded-xl p-5"
    >
      <Icon className="w-6 h-6 mb-3" style={{ color: accent }} />
      <div className="text-3xl md:text-4xl font-bold text-white">{value}</div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
      {source && (
        <div className="text-[9px] text-gray-600 mt-2 font-mono">{source}</div>
      )}
    </motion.div>
  );
}

function BrowserMockup({
  url,
  children,
  accent = "#00ff41",
}: {
  url: string;
  children: ReactNode;
  accent?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="ofis-window-chrome w-full"
    >
      <div className="ofis-window-bar flex items-center gap-2 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="ml-3 px-3 py-1 rounded text-[11px] font-mono flex-1 max-w-md mx-auto text-center"
          style={{ background: "#0d0d0d", color: accent }}
        >
          {url}
        </div>
      </div>
      <div className="p-6">{children}</div>
    </motion.div>
  );
}

function QuoteSlide({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <SlideShell>
      <div className="text-center max-w-4xl mx-auto">
        <Quote className="w-16 h-16 text-[#00ff41]/40 mx-auto mb-8" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-light text-white leading-snug"
        >
          &ldquo;{quote}&rdquo;
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10"
        >
          <div className="text-lg font-semibold text-[#00ff41]">{author}</div>
          <div className="text-sm text-gray-500 mt-1">{role}</div>
        </motion.div>
      </div>
    </SlideShell>
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
          className="inline-flex w-32 h-32 rounded-3xl items-center justify-center mb-8 ofis-pulse"
          style={{
            background: bgGradient,
            boxShadow: shadow,
          }}
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
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ─────────────────  1. AÇILIŞ  ───────────────── */

  // 1 — Cover
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>9. Hafta · BVA 1108 — Bilgi Teknolojileri</Eyebrow>
        <H1 className="ofis-shimmer">
          Sunum Hazırlama
          <br />
          Araçları
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          PowerPoint&apos;ten yapay zekâya — modern sunum hazırlama dünyası
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 flex items-center justify-center gap-6 flex-wrap"
        >
          <div className="ofis-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center font-bold text-xl"
              style={{ background: "rgba(210,71,38,0.15)", color: "#d24726" }}
            >
              P
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">PowerPoint</div>
              <div className="text-[10px] text-gray-500">650M+ kullanıcı</div>
            </div>
          </div>
          <div className="ofis-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(0,196,204,0.15)" }}
            >
              <Palette className="w-5 h-5" style={{ color: "#00c4cc" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Canva</div>
              <div className="text-[10px] text-gray-500">220M kullanıcı</div>
            </div>
          </div>
          <div className="ofis-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(168,85,247,0.15)" }}
            >
              <Wand2 className="w-5 h-5" style={{ color: "#a855f7" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Gamma App</div>
              <div className="text-[10px] text-gray-500">AI üretimi</div>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 2 — Big Numbers (Why presentations matter)
  () => (
    <SlideShell>
      <Eyebrow>Neden Önemli?</Eyebrow>
      <H2 className="mb-12">Sunum becerisi 21. yüzyılın temel yetkinliği</H2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={Globe}
          value="30 mlr"
          label="Canva ile şimdiye kadar üretilen tasarım"
          source="Canva, 2025"
        />
        <StatCard
          icon={Users}
          value="650 M+"
          label="PowerPoint aktif kullanıcı"
          source="Microsoft, 2025"
          delay={0.1}
        />
        <StatCard
          icon={TrendingUp}
          value="1 mlr"
          label="Canva üzerinde üretilen sunum"
          source="Canva, 2025"
          delay={0.2}
        />
        <StatCard
          icon={Brain}
          value="30 sn"
          label="Gamma ile sunum üretim süresi"
          source="Gamma 3.0, 2025"
          delay={0.3}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 ofis-card rounded-xl p-5 text-center"
      >
        <div className="text-sm text-gray-300">
          İş başvurusunda <span className="text-[#00ff41] font-semibold">81%</span> insan kaynakları yöneticisi,
          adayın sunum becerisini iş tecrübesi kadar önemsiyor.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 3 — Quote: Steve Jobs
  () => (
    <QuoteSlide
      quote="Basitlik nihai gelişmişliktir. Karmaşıklığa ulaşmak için çok çalışırsın, ama gerçek ödül onun ötesine geçmektir."
      author="Steve Jobs"
      role="Apple kurucusu · Sunum efsanesi"
    />
  ),

  // 4 — Garr Reynolds Presentation Zen
  () => (
    <SlideShell>
      <Eyebrow>Tasarım Felsefesi</Eyebrow>
      <H2 className="mb-12">Presentation Zen — 3 Temel İlke</H2>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            n: "01",
            t: "Restraint",
            tr: "Kısıtla",
            d: "Sadece gerekli olanı koy. Slaytın hedefi ne ise sadece ona hizmet et.",
          },
          {
            n: "02",
            t: "Reduce",
            tr: "Azalt",
            d: "Bir kez bittiğinde bile, geri dön ve hala silebileceğin şey var mı bak.",
          },
          {
            n: "03",
            t: "Emphasize",
            tr: "Vurgula",
            d: "Asıl mesajı ön plana çıkar. Geri kalanı sus pas geri çekilsin.",
          },
        ].map((p, i) => (
          <motion.div
            key={p.n}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.15 }}
            className="ofis-card rounded-2xl p-8"
          >
            <div className="text-5xl font-mono font-bold text-[#00ff41]/30 mb-4">
              {p.n}
            </div>
            <div className="text-2xl font-bold text-white mb-1">{p.tr}</div>
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-4">
              {p.t}
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{p.d}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 text-center text-xs text-gray-600 font-mono">
        — Garr Reynolds, &ldquo;Presentation Zen&rdquo; (2008) · 1M+ baskı
      </div>
    </SlideShell>
  ),

  /* ─────────────────  2. POWERPOINT  ───────────────── */

  // 5 — Section: PowerPoint
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Microsoft PowerPoint"
      subtitle="1987'den beri kurumsal sunum dünyasının standartı. 38 yıllık miras."
      bgGradient="linear-gradient(135deg, #d24726, #b8351e)"
      shadow="0 20px 60px -10px rgba(210, 71, 38, 0.5)"
      icon={<span className="text-7xl font-black text-white">P</span>}
    />
  ),

  // 6 — PowerPoint history & numbers
  () => (
    <SlideShell>
      <Eyebrow>Rakamlarla PowerPoint</Eyebrow>
      <H2 className="mb-12">Bir endüstri standartı</H2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={History}
          value="1987"
          label="İlk sürüm yılı (Macintosh)"
          accent="#d24726"
        />
        <StatCard
          icon={Users}
          value="650 M+"
          label="Aylık aktif kullanıcı"
          source="Microsoft, 2025"
          delay={0.1}
          accent="#d24726"
        />
        <StatCard
          icon={Globe}
          value="71%"
          label="ABD pazarı (en yüksek)"
          source="6sense, 2025"
          delay={0.2}
          accent="#d24726"
        />
        <StatCard
          icon={Briefcase}
          value="56K+"
          label="Şirket kullanıcısı (2025)"
          source="enlyft.com"
          delay={0.3}
          accent="#d24726"
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 grid md:grid-cols-3 gap-4"
      >
        <div className="ofis-card rounded-lg p-4 text-center">
          <GraduationCap className="w-5 h-5 text-[#d24726] mx-auto mb-2" />
          <div className="text-xs text-gray-400">Eğitim</div>
        </div>
        <div className="ofis-card rounded-lg p-4 text-center">
          <Briefcase className="w-5 h-5 text-[#d24726] mx-auto mb-2" />
          <div className="text-xs text-gray-400">Kurumsal</div>
        </div>
        <div className="ofis-card rounded-lg p-4 text-center">
          <Brain className="w-5 h-5 text-[#d24726] mx-auto mb-2" />
          <div className="text-xs text-gray-400">Araştırma</div>
        </div>
      </motion.div>
      <div className="mt-6 text-center text-xs text-gray-600">
        En yaygın 3 sektör — Microsoft endüstri raporu
      </div>
    </SlideShell>
  ),

  // 7 — PowerPoint Şerit Mockup
  () => (
    <SlideShell>
      <Eyebrow>Arayüz</Eyebrow>
      <H2 className="mb-8">Şerit (Ribbon) Yapısı</H2>
      <BrowserMockup url="PowerPoint - Sunu1.pptx" accent="#d24726">
        <div className="space-y-3">
          <div className="flex gap-2 flex-wrap">
            {["Giriş", "Ekle", "Tasarım", "Geçişler", "Animasyonlar", "Slayt Gösterisi", "Görünüm"].map(
              (tab, i) => (
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className={`px-3 py-1.5 text-xs rounded ${
                    i === 0
                      ? "bg-[#d24726] text-white font-semibold"
                      : "bg-white/5 text-gray-400 border border-white/10"
                  }`}
                >
                  {tab}
                </motion.div>
              )
            )}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-[180px_1fr] gap-4 mt-6"
          >
            <div className="space-y-2">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className={`aspect-[16/9] rounded border ${
                    n === 1
                      ? "border-[#d24726] bg-[#d24726]/10"
                      : "border-white/10 bg-white/5"
                  } flex items-center justify-center text-[10px] text-gray-500 font-mono`}
                >
                  {String(n).padStart(2, "0")}
                </div>
              ))}
            </div>
            <div className="aspect-[16/9] rounded-lg bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 flex flex-col items-center justify-center text-center p-8">
              <div className="text-3xl font-bold text-white mb-3">Başlık Buraya</div>
              <div className="text-sm text-gray-500">Alt başlık veya açıklama</div>
            </div>
          </motion.div>
        </div>
      </BrowserMockup>
    </SlideShell>
  ),

  // 8 — PowerPoint features grid
  () => (
    <SlideShell>
      <Eyebrow>PowerPoint Özellikleri</Eyebrow>
      <H2 className="mb-12">Klasiklerin asla vazgeçmediği güç</H2>
      <div className="grid md:grid-cols-3 gap-5">
        <FeatureCard
          icon={Layers}
          title="Slayt + Şerit"
          desc="Tanıdık şerit (ribbon) arayüzü, sezgisel düzen seçici, hızlı kısayollar"
          delay={0.1}
          accent="#d24726"
        />
        <FeatureCard
          icon={Sparkles}
          title="Designer (AI)"
          desc="İçerik ekledikçe yapay zekâ destekli düzen önerileri otomatik gelir"
          delay={0.2}
          accent="#d24726"
        />
        <FeatureCard
          icon={Video}
          title="Video Kayıt"
          desc="Slayt anlatımını mikrofon + webcam ile direkt video olarak kaydet"
          delay={0.3}
          accent="#d24726"
        />
        <FeatureCard
          icon={Code}
          title="VBA & Makro"
          desc="İhtiyaca özel otomasyonlar yazılabilir, formül ve veri entegrasyonu"
          delay={0.4}
          accent="#d24726"
        />
        <FeatureCard
          icon={Share2}
          title="Bulut Senkron"
          desc="OneDrive üzerinden gerçek zamanlı işbirliği, sürüm geçmişi"
          delay={0.5}
          accent="#d24726"
        />
        <FeatureCard
          icon={Download}
          title="Çoklu Format"
          desc="PPTX, PDF, MP4, PNG, GIF — tek tıkla farklı formatlara dışa aktar"
          delay={0.6}
          accent="#d24726"
        />
      </div>
    </SlideShell>
  ),

  // 9 — PowerPoint pricing
  () => (
    <SlideShell>
      <Eyebrow>Fiyatlandırma</Eyebrow>
      <H2 className="mb-12">PowerPoint Edinme Yolları</H2>
      <div className="grid md:grid-cols-3 gap-5">
        {[
          {
            n: "Ücretsiz",
            p: "₺0",
            sub: "PowerPoint Web",
            d: "Tarayıcı tabanlı, sınırlı özellikler, OneDrive entegrasyonu",
            features: [
              "Online düzenleme",
              "Temel şablonlar",
              "Cloud kaydetme",
              "Designer yok",
            ],
          },
          {
            n: "Microsoft 365 Personal",
            p: "$9.99/ay",
            sub: "Bireysel",
            d: "PowerPoint + Word + Excel + Outlook + 1TB OneDrive",
            features: [
              "Tam masaüstü",
              "AI Designer",
              "Video kayıt",
              "1 kullanıcı",
            ],
            highlight: true,
          },
          {
            n: "Üniversite",
            p: "₺0",
            sub: "Öğrenci e-postası ile",
            d: "okul.edu.tr uzantılı e-postan varsa Microsoft 365 ücretsiz",
            features: [
              "Tam Microsoft 365",
              "5 cihaz",
              "1TB depolama",
              "Mezun olana kadar",
            ],
          },
        ].map((plan, i) => (
          <motion.div
            key={plan.n}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className={`ofis-card rounded-2xl p-6 ${
              plan.highlight ? "ring-2 ring-[#d24726]/40" : ""
            }`}
          >
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">
              {plan.sub}
            </div>
            <div className="text-lg font-semibold text-white mb-1">{plan.n}</div>
            <div
              className="text-3xl font-bold mb-4"
              style={{ color: "#d24726" }}
            >
              {plan.p}
            </div>
            <p className="text-xs text-gray-400 mb-4">{plan.d}</p>
            <ul className="space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-gray-300">
                  <Check className="w-3 h-3 text-[#d24726] shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 text-center text-xs text-[#00ff41]">
        💡 İpucu: MCBÜ öğrencisi olarak Microsoft 365 ücretsiz alabilirsin
      </div>
    </SlideShell>
  ),

  // 10 — Video Recording highlight
  () => (
    <SlideShell>
      <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <div>
          <Eyebrow>Süper Güç</Eyebrow>
          <H2>
            Video Sunum
            <br />
            <span className="text-[#d24726]">Kaydı</span>
          </H2>
          <Sub className="mt-6">
            Slaytları anlatırken video olarak kaydet. Mikrofon, webcam ve
            kalem çizimleriyle birlikte. YouTube, e-öğrenme veya uzaktan
            ders için ideal.
          </Sub>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 ofis-card rounded-lg p-4 font-mono text-sm"
          >
            <div className="text-[#00ff41]">$ Slayt Gösterisi</div>
            <div className="text-gray-400 ml-3">→ Slayt Gösterisini Kaydet</div>
            <div className="text-gray-500 ml-6 mt-2">
              → Dosya → Dışa Aktar → Video Oluştur
            </div>
            <div className="text-[#d24726] ml-9 mt-2">⚐ output.mp4 (Full HD)</div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          <div className="aspect-video rounded-2xl bg-gradient-to-br from-[#d24726]/20 to-black border border-[#d24726]/40 flex items-center justify-center relative overflow-hidden">
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle, rgba(210,71,38,0.2), transparent 70%)",
              }}
            />
            <PlayCircle className="w-24 h-24 text-[#d24726] relative z-10" />
            <div className="absolute top-3 left-3 flex items-center gap-2 px-2 py-1 rounded bg-red-500/80 text-white text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              REC
            </div>
            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#d24726]">
              00:14:32
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 11 — Real PowerPoint use cases
  () => (
    <SlideShell>
      <Eyebrow>Gerçek Dünya Örnekleri</Eyebrow>
      <H2 className="mb-12">PowerPoint nerelerde çıkıyor karşımıza?</H2>
      <div className="grid md:grid-cols-2 gap-5">
        {[
          {
            icon: GraduationCap,
            t: "Akademik Sunum",
            d: "Bitirme tezi savunması, konferans bildirileri, ders sunumları",
            ex: "TÜBİTAK proje sunumları",
          },
          {
            icon: Briefcase,
            t: "Kurumsal Toplantı",
            d: "Çeyreklik raporlar, proje güncellemeleri, satış sunumları",
            ex: "McKinsey, Deloitte, BCG raporları",
          },
          {
            icon: Award,
            t: "Yatırımcı Sunumu",
            d: "Startup pitch deck'leri, IPO road show'lar",
            ex: "Y Combinator demo day",
          },
          {
            icon: Users,
            t: "Eğitim & Workshop",
            d: "Şirket içi eğitimler, online kurslar, webinar'lar",
            ex: "Coursera, Udemy ders materyalleri",
          },
        ].map((u, i) => {
          const Icon = u.icon;
          return (
            <motion.div
              key={u.t}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="ofis-card rounded-xl p-5 flex gap-4"
            >
              <div className="w-12 h-12 rounded-lg bg-[#d24726]/10 border border-[#d24726]/30 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-[#d24726]" />
              </div>
              <div>
                <div className="text-base font-semibold text-white">{u.t}</div>
                <div className="text-sm text-gray-400 mt-1">{u.d}</div>
                <div className="text-[10px] text-[#d24726] mt-2 font-mono uppercase tracking-wider">
                  ↳ {u.ex}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SlideShell>
  ),

  // 12 — Export formats
  () => (
    <SlideShell>
      <Eyebrow>Dışa Aktar</Eyebrow>
      <H2 className="mb-12">Hangi Format Ne İçin?</H2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { ext: ".pptx", desc: "Düzenlenebilir orijinal", color: "#d24726" },
          { ext: ".pdf", desc: "Paylaşım ve baskı", color: "#ef4444" },
          { ext: ".mp4", desc: "Video sunum", color: "#00ff41" },
          { ext: ".png", desc: "Slayt görselleri", color: "#3b82f6" },
        ].map((f, i) => (
          <motion.div
            key={f.ext}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="ofis-card rounded-2xl p-6 text-center"
            style={{ borderColor: `${f.color}40` }}
          >
            <FileText
              className="w-10 h-10 mx-auto mb-4"
              style={{ color: f.color }}
            />
            <div
              className="text-2xl font-mono font-bold mb-2"
              style={{ color: f.color }}
            >
              {f.ext}
            </div>
            <div className="text-xs text-gray-400">{f.desc}</div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 ofis-card rounded-xl p-5 text-center"
      >
        <div className="text-sm text-gray-300">
          <span className="text-[#00ff41] font-mono">PRO TIP:</span> .pdf
          paylaşımda her zaman daha güvenli — alıcının PowerPoint'i olmasa
          bile açar, fontlar bozulmaz, görüntü tutarlıdır.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 13 — PowerPoint shortcuts
  () => (
    <SlideShell>
      <Eyebrow>Klavye Kısayolları</Eyebrow>
      <H2 className="mb-12">PowerPoint için olmazsa olmazlar</H2>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { keys: ["F5"], desc: "Sunumu baştan başlat" },
          { keys: ["Shift", "F5"], desc: "Aktif slayttan başlat" },
          { keys: ["Esc"], desc: "Sunumdan çık" },
          { keys: ["B"], desc: "Ekranı karart (siyah)" },
          { keys: ["W"], desc: "Ekranı beyazlat" },
          { keys: ["Ctrl", "M"], desc: "Yeni slayt ekle" },
          { keys: ["Ctrl", "D"], desc: "Slayt çoğalt" },
          { keys: ["Ctrl", "K"], desc: "Köprü (link) ekle" },
          { keys: ["F12"], desc: "Farklı kaydet" },
          { keys: ["Ctrl", "Shift", "C"], desc: "Biçim kopyala" },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 + i * 0.04 }}
            className="ofis-card rounded-lg px-5 py-3 flex items-center justify-between"
            style={{ borderColor: "rgba(210,71,38,0.2)" }}
          >
            <div className="text-sm text-gray-300">{s.desc}</div>
            <div className="flex items-center gap-1.5">
              {s.keys.map((k) => (
                <kbd
                  key={k}
                  className="px-2 py-0.5 text-[10px] font-mono bg-[#d24726]/10 border border-[#d24726]/30 rounded text-[#d24726] min-w-7 text-center"
                >
                  {k}
                </kbd>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3. CANVA  ───────────────── */

  // 14 — Section: Canva
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Canva"
      subtitle="2013'te kurulan Avustralya merkezli tasarım devi. 220 milyon kullanıcıya ulaştı."
      bgGradient="linear-gradient(135deg, #00c4cc, #7d2ae8)"
      shadow="0 20px 60px -10px rgba(0, 196, 204, 0.5)"
      icon={<Palette className="w-16 h-16 text-white" />}
    />
  ),

  // 15 — Canva by numbers
  () => (
    <SlideShell>
      <Eyebrow>Rakamlarla Canva</Eyebrow>
      <H2 className="mb-12">Demokratik tasarımın gücü</H2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          value="220 M"
          label="Toplam kullanıcı"
          source="Canva, 2025"
          accent="#00c4cc"
        />
        <StatCard
          icon={Layers}
          value="610 K"
          label="Hazır şablon"
          source="Canva, 2025"
          delay={0.1}
          accent="#00c4cc"
        />
        <StatCard
          icon={ImageIcon}
          value="100 M"
          label="Stok görsel/video"
          source="Canva, 2025"
          delay={0.2}
          accent="#00c4cc"
        />
        <StatCard
          icon={TrendingUp}
          value="30 mlr"
          label="Toplam üretilen tasarım"
          source="2012'den beri"
          delay={0.3}
          accent="#00c4cc"
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 grid md:grid-cols-2 gap-4"
      >
        <div className="ofis-card rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-[#00c4cc]">1 milyar+</div>
          <div className="text-xs text-gray-400 mt-1">
            Canva ile üretilen sunum
          </div>
        </div>
        <div className="ofis-card rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-[#00c4cc]">70%</div>
          <div className="text-xs text-gray-400 mt-1">
            Kullanıcı işle ilgili tasarım yapıyor
          </div>
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 16 — Canva strengths
  () => (
    <SlideShell>
      <Eyebrow>Güçlü Yanlar</Eyebrow>
      <H2 className="mb-12">Tasarımcı olmadan tasarla</H2>
      <div className="grid md:grid-cols-2 gap-5">
        {[
          {
            icon: Layers,
            t: "610.000+ Şablon",
            d: "Sunum, sosyal medya, poster, broşür, CV, davetiye — her şey hazır",
          },
          {
            icon: ImageIcon,
            t: "100M+ Stok Kütüphane",
            d: "Ücretsiz görsel, video, müzik, ikon, çizim — telifsiz",
          },
          {
            icon: Mouse,
            t: "Sürükle-Bırak",
            d: "Sıfır kod, sıfır kurulum, sıfır öğrenme eğrisi — 5 dakikada başla",
          },
          {
            icon: Users,
            t: "Real-time Takım",
            d: "Aynı anda çalışan ekip, yorum, görev atama, sürüm geçmişi",
          },
          {
            icon: Wand2,
            t: "Magic Studio (AI)",
            d: "Magic Design, Magic Write, görsel oluşturma — 2025'te yenilendi",
          },
          {
            icon: Globe,
            t: "Web Tabanlı",
            d: "Tarayıcıdan çalışır, kurulum yok, her cihazdan erişim",
          },
        ].map((f, i) => (
          <FeatureCard
            key={f.t}
            icon={f.icon}
            title={f.t}
            desc={f.d}
            delay={0.1 + i * 0.08}
            accent="#00c4cc"
          />
        ))}
      </div>
    </SlideShell>
  ),

  // 17 — Canva workflow
  (active) => (
    <SlideShell>
      <Eyebrow>Workflow</Eyebrow>
      <H2 className="mb-12">5 Adımda Sunum</H2>
      <div className="space-y-3">
        {[
          { n: "01", t: "canva.com", d: "Tarayıcıdan giriş yap, Google ile bedava hesap aç" },
          { n: "02", t: "Sunumlar", d: "Üst menüden 'Sunumlar' kategorisini seç (16:9 veya 4:3)" },
          { n: "03", t: "Şablon", d: "Hazır şablon seç veya boş başla — 30.000+ sunum şablonu" },
          { n: "04", t: "Düzenle", d: "Sürükle-bırak ile metni, görseli, rengi değiştir — Magic ile renk paleti" },
          { n: "05", t: "Paylaş", d: "Link, PDF, PNG, MP4 olarak indir veya gerçek zamanlı sun" },
        ].map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, x: -20 }}
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            className="ofis-card rounded-xl p-5 flex items-center gap-6"
            style={{ borderColor: "rgba(0,196,204,0.25)" }}
          >
            <div
              className="text-3xl font-mono font-bold w-16 shrink-0"
              style={{ color: "#00c4cc" }}
            >
              {s.n}
            </div>
            <div className="flex-1">
              <div className="text-lg font-semibold text-white">{s.t}</div>
              <div className="text-sm text-gray-400 mt-0.5">{s.d}</div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  // 18 — Canva mockup
  () => (
    <SlideShell>
      <Eyebrow>Şablon Galerisi</Eyebrow>
      <H2 className="mb-8">610.000+ profesyonel tasarım — bir tıkla</H2>
      <BrowserMockup url="canva.com/templates/presentations" accent="#00c4cc">
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              className="aspect-[3/4] rounded border border-white/10 relative overflow-hidden"
              style={{
                background: `linear-gradient(${135 + i * 20}deg, #00c4cc${
                  i % 2 ? "30" : "50"
                }, #7d2ae8${i % 2 ? "50" : "30"})`,
              }}
            >
              <div className="absolute bottom-2 left-2 right-2">
                <div className="h-1.5 bg-white/40 rounded mb-1" />
                <div className="h-1 bg-white/20 rounded w-2/3" />
              </div>
            </motion.div>
          ))}
        </div>
      </BrowserMockup>
    </SlideShell>
  ),

  // 19 — Canva pricing
  () => (
    <SlideShell>
      <Eyebrow>Fiyatlandırma</Eyebrow>
      <H2 className="mb-12">Canva Planları</H2>
      <div className="grid md:grid-cols-3 gap-5">
        {[
          {
            n: "Free",
            p: "$0",
            sub: "Sonsuza kadar ücretsiz",
            features: [
              "250.000+ ücretsiz şablon",
              "5 GB cloud storage",
              "Temel AI özellikleri",
              "Sınırlı premium öğeler",
            ],
          },
          {
            n: "Canva Pro",
            p: "$15/ay",
            sub: "Bireysel ya da ekip",
            features: [
              "100M+ premium öğe",
              "1 TB storage",
              "Magic Studio (tam AI)",
              "Marka kiti & şablonlar",
              "Background remover",
            ],
            highlight: true,
          },
          {
            n: "Canva for Education",
            p: "$0",
            sub: "Öğretmen + öğrenci için",
            features: [
              "Tam Pro özellikler",
              "Sınırsız storage",
              "Sınıf işbirliği araçları",
              ".edu e-postası gerekli",
            ],
          },
        ].map((plan, i) => (
          <motion.div
            key={plan.n}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className={`ofis-card rounded-2xl p-6 ${
              plan.highlight ? "ring-2 ring-[#00c4cc]/40" : ""
            }`}
          >
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">
              {plan.sub}
            </div>
            <div className="text-lg font-semibold text-white mb-1">{plan.n}</div>
            <div
              className="text-3xl font-bold mb-4"
              style={{ color: "#00c4cc" }}
            >
              {plan.p}
            </div>
            <ul className="space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-gray-300">
                  <Check className="w-3 h-3 text-[#00c4cc] shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 text-center text-xs text-[#00c4cc]">
        💡 .edu uzantılı e-posta ile öğrenciler tam Pro'yu ücretsiz kullanabilir
      </div>
    </SlideShell>
  ),

  // 20 — Canva sharing
  () => (
    <SlideShell>
      <Eyebrow>Paylaşım & Yayınlama</Eyebrow>
      <H2 className="mb-12">Sınırsız çıktı seçeneği</H2>
      <div className="grid md:grid-cols-3 gap-5">
        <FeatureCard
          icon={Share2}
          title="Link ile Paylaş"
          desc="Görüntüleme / Yorum / Düzenleme yetkilerini ayarla — anlık paylaşım"
          delay={0.1}
          accent="#00c4cc"
        />
        <FeatureCard
          icon={Download}
          title="İndir"
          desc="PNG, JPG, PDF (Standard/Print), MP4, GIF, SVG — çoklu format desteği"
          delay={0.2}
          accent="#00c4cc"
        />
        <FeatureCard
          icon={Code}
          title="Web'e Göm"
          desc="iframe kodu ile blog veya web sitenize entegre et — embed link"
          delay={0.3}
          accent="#00c4cc"
        />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  4. GAMMA APP  ───────────────── */

  // 21 — Section: Gamma
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Gamma App"
      subtitle="Yapay zekâ destekli sunum üreticisi. Eylül 2025'te Gamma 3.0 Agent ile devrim yaptı."
      bgGradient="linear-gradient(135deg, #a855f7, #7c3aed)"
      shadow="0 20px 60px -10px rgba(168, 85, 247, 0.5)"
      icon={<Wand2 className="w-16 h-16 text-white" />}
    />
  ),

  // 22 — Gamma magic
  () => (
    <SlideShell>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <Eyebrow>AI ile Sunum</Eyebrow>
          <H2>
            Promptu yaz,
            <br />
            <span style={{ color: "#a855f7" }}>sunum hazır.</span>
          </H2>
          <Sub className="mt-6">
            &ldquo;10 slaytlık yapay zekâ etiği sunumu&rdquo; yaz — Gamma 30
            saniye içinde içerik, görsel ve düzeni hazırlar. Sonra istediğin
            yeri düzenlersin.
          </Sub>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="ofis-card rounded-2xl p-6 font-mono text-sm space-y-3"
          style={{ borderColor: "rgba(168,85,247,0.3)" }}
        >
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <Sparkles className="w-3 h-3" /> Prompt
          </div>
          <div
            className="rounded p-3 text-white leading-relaxed"
            style={{ background: "rgba(168,85,247,0.1)" }}
          >
            Yapay zekânın eğitimde kullanımı konulu, lise öğrencileri için
            12 slaytlık akademik sunum. Giriş, 4 ana başlık ve sonuç olsun.
          </div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, delay: 0.8 }}
            className="h-2 rounded"
            style={{ background: "linear-gradient(90deg, #a855f7, #ec4899)" }}
          />
          <div
            className="text-xs flex items-center gap-2"
            style={{ color: "#a855f7" }}
          >
            <Check className="w-3 h-3" /> 12 slayt · 28 saniyede oluşturuldu
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 23 — Gamma 3.0 features
  () => (
    <SlideShell>
      <Eyebrow>Eylül 2025 — Gamma 3.0</Eyebrow>
      <H2 className="mb-12">AI destekli sunum üretiminin geleceği</H2>
      <div className="grid md:grid-cols-3 gap-5">
        <FeatureCard
          icon={Wand2}
          title="Otomatik İçerik"
          desc="Konuyu yaz, AI metin + başlık + alt başlık hepsini üretsin"
          delay={0.1}
          accent="#a855f7"
        />
        <FeatureCard
          icon={Brain}
          title="Gamma Agent"
          desc="Web'de araştırma yapar, kaynakları tarar, gerçek verilerle slayt üretir"
          delay={0.2}
          accent="#a855f7"
        />
        <FeatureCard
          icon={ImageIcon}
          title="AI Görsel"
          desc="İçeriğe uygun görseller AI ile üretilir veya stoktan seçilir"
          delay={0.3}
          accent="#a855f7"
        />
        <FeatureCard
          icon={Layers}
          title="3-in-1"
          desc="Sunum, doküman ve web sayfası — aynı içerikten üçü de"
          delay={0.4}
          accent="#a855f7"
        />
        <FeatureCard
          icon={Palette}
          title="Anlık Restyle"
          desc="Tek tıkla tüm tasarımı yeniden stillendir — temalar"
          delay={0.5}
          accent="#a855f7"
        />
        <FeatureCard
          icon={Share2}
          title="Web'de Yayınla"
          desc="PDF/PPTX export + paylaşılabilir web link, analytics"
          delay={0.6}
          accent="#a855f7"
        />
      </div>
    </SlideShell>
  ),

  // 24 — Real Gamma prompt examples
  () => (
    <SlideShell>
      <Eyebrow>Gerçek Prompt Örnekleri</Eyebrow>
      <H2 className="mb-12">Gamma'ya ne yazılır?</H2>
      <div className="space-y-3">
        {[
          {
            cat: "Akademik",
            prompt:
              "Büyük veri analizinin sağlıkta kullanımı, 10 slaytlık akademik sunum, kaynak göstererek",
          },
          {
            cat: "Startup",
            prompt:
              "Mobil bankacılık uygulaması için 6 slaytlık yatırımcı pitch deck — sorun, çözüm, pazar, model, takım, talep",
          },
          {
            cat: "Eğitim",
            prompt:
              "Lise öğrencilerine yönelik küresel ısınma sunumu, görsel ağırlıklı, 8 slayt, eğlenceli ton",
          },
          {
            cat: "Pazarlama",
            prompt:
              "Yeni ürün lansmanı için sosyal medya kampanya planı sunumu, modern, mor tema",
          },
        ].map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="ofis-card rounded-xl p-5 flex items-start gap-4"
            style={{ borderColor: "rgba(168,85,247,0.2)" }}
          >
            <div className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-[#a855f7]/15 text-[#a855f7] font-mono shrink-0">
              {p.cat}
            </div>
            <div className="text-sm text-gray-300 italic">&ldquo;{p.prompt}&rdquo;</div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  // 25 — Prompt tips
  () => (
    <SlideShell>
      <Eyebrow>Pro İpucu</Eyebrow>
      <H2 className="mb-12">İyi Bir Prompt Nasıl Yazılır?</H2>
      <div className="grid md:grid-cols-2 gap-5">
        {[
          {
            icon: Target,
            t: "Hedef Kitleyi Belirt",
            d: '"Lise öğrencileri için" veya "akademik konferans için"',
          },
          {
            icon: Layers,
            t: "Slayt Sayısını Söyle",
            d: '"15 slaytlık" — kısa için 8, detaylı için 20',
          },
          {
            icon: Lightbulb,
            t: "Tonu Belirt",
            d: '"Eğlenceli, görsel ağırlıklı" veya "akademik, kaynaklı"',
          },
          {
            icon: Layers,
            t: "Yapı Öner",
            d: '"Giriş, 3 ana başlık, sonuç" — bölümleri sayısal ver',
          },
          {
            icon: Palette,
            t: "Stil Seç",
            d: '"Modern, minimalist" veya "kurumsal, mavi tonlar"',
          },
          {
            icon: FileText,
            t: "Kaynak İste",
            d: '"Her slayta kaynak ekle" — Gamma 3.0 Agent web\'i tarar',
          },
        ].map((tip, i) => (
          <FeatureCard
            key={tip.t}
            icon={tip.icon}
            title={tip.t}
            desc={tip.d}
            delay={0.1 + i * 0.08}
            accent="#a855f7"
          />
        ))}
      </div>
    </SlideShell>
  ),

  // 26 — Gamma pricing
  () => (
    <SlideShell>
      <Eyebrow>Fiyatlandırma</Eyebrow>
      <H2 className="mb-12">Gamma Planları</H2>
      <div className="grid md:grid-cols-3 gap-5">
        {[
          {
            n: "Free",
            p: "$0",
            sub: "Hesap ücretsiz",
            features: [
              "400 AI kredisi",
              "Sınırlı export",
              '"Made with Gamma" filigranı',
              "Kart bilgisi gerekmez",
            ],
          },
          {
            n: "Plus",
            p: "$8/ay",
            sub: "Bireysel kullanıcı",
            features: [
              "Sınırsız AI üretimi",
              "Filigran yok",
              "PPTX/PDF export",
              "Daha fazla tema",
            ],
            highlight: true,
          },
          {
            n: "Pro",
            p: "$15/ay",
            sub: "Profesyonel & ekip",
            features: [
              "Custom branding",
              "Analytics",
              "API erişimi",
              "Öncelikli destek",
            ],
          },
        ].map((plan, i) => (
          <motion.div
            key={plan.n}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className={`ofis-card rounded-2xl p-6 ${
              plan.highlight ? "ring-2 ring-[#a855f7]/40" : ""
            }`}
          >
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">
              {plan.sub}
            </div>
            <div className="text-lg font-semibold text-white mb-1">{plan.n}</div>
            <div
              className="text-3xl font-bold mb-4"
              style={{ color: "#a855f7" }}
            >
              {plan.p}
            </div>
            <ul className="space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-gray-300">
                  <Check className="w-3 h-3 text-[#a855f7] shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 text-center text-xs text-[#a855f7]">
        💡 400 ücretsiz kredi yaklaşık 10-15 sunum demek — başlamak için yeterli
      </div>
    </SlideShell>
  ),

  // 27 — Gamma use cases
  () => (
    <SlideShell>
      <Eyebrow>Gerçek Dünya Kullanımı</Eyebrow>
      <H2 className="mb-12">Gamma kimler için?</H2>
      <div className="grid md:grid-cols-2 gap-5">
        {[
          {
            icon: TrendingUp,
            t: "Startup Kurucuları",
            d: "Yatırımcı pitch deck'leri için 30 dakika yerine 30 saniye",
          },
          {
            icon: GraduationCap,
            t: "Eğitmenler",
            d: "Ders materyalleri, online kurs slaytları — toplu üretim",
          },
          {
            icon: Briefcase,
            t: "Danışmanlar",
            d: "Müşteri proposal'ları, rapor sunumları — markaya uygun temalar",
          },
          {
            icon: Award,
            t: "Pazarlamacılar",
            d: "Kampanya konseptleri, marka kitapları, ürün lansmanı",
          },
        ].map((u, i) => {
          const Icon = u.icon;
          return (
            <motion.div
              key={u.t}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="ofis-card rounded-xl p-5 flex gap-4"
              style={{ borderColor: "rgba(168,85,247,0.2)" }}
            >
              <div className="w-12 h-12 rounded-lg bg-[#a855f7]/10 border border-[#a855f7]/30 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-[#a855f7]" />
              </div>
              <div>
                <div className="text-base font-semibold text-white">{u.t}</div>
                <div className="text-sm text-gray-400 mt-1">{u.d}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  5. KARŞILAŞTIRMA  ───────────────── */

  // 28 — Comparison Table
  (active) => (
    <SlideShell>
      <Eyebrow>Karşılaştırma</Eyebrow>
      <H2 className="mb-10">Hangisi Hangi Konuda Güçlü?</H2>
      <div className="ofis-card rounded-2xl overflow-hidden">
        <div className="grid grid-cols-4 gap-px bg-white/5">
          <div className="bg-black p-4 text-xs text-gray-500 uppercase tracking-wider">
            Özellik
          </div>
          <div className="bg-black p-4 text-center">
            <div className="text-xs font-bold" style={{ color: "#d24726" }}>
              POWERPOINT
            </div>
          </div>
          <div className="bg-black p-4 text-center">
            <div className="text-xs font-bold" style={{ color: "#00c4cc" }}>
              CANVA
            </div>
          </div>
          <div className="bg-black p-4 text-center">
            <div className="text-xs font-bold" style={{ color: "#a855f7" }}>
              GAMMA
            </div>
          </div>

          {[
            { f: "Şablon Sayısı", v: [40, 95, 30] },
            { f: "Kullanım Kolaylığı", v: [70, 85, 95] },
            { f: "AI Desteği", v: [55, 75, 100] },
            { f: "Video Kayıt", v: [100, 0, 0] },
            { f: "Web Paylaşım", v: [30, 90, 100] },
            { f: "Çevrimdışı Çalışma", v: [100, 30, 0] },
            { f: "Maliyet (free)", v: [50, 80, 70] },
          ].map((row) => (
            <div key={row.f} className="contents">
              <div className="bg-black p-3 text-sm text-gray-300">{row.f}</div>
              {row.v.map((val, idx) => {
                const colors = ["#d24726", "#00c4cc", "#a855f7"];
                return (
                  <div key={idx} className="bg-black p-3 flex items-center gap-2">
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={active ? { width: `${val}%` } : { width: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-full rounded-full"
                        style={{ background: colors[idx] }}
                      />
                    </div>
                    <div
                      className="text-xs font-mono w-8 text-right"
                      style={{ color: colors[idx] }}
                    >
                      {val}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  ),

  // 29 — Pricing comparison
  () => (
    <SlideShell>
      <Eyebrow>Fiyat Karşılaştırması</Eyebrow>
      <H2 className="mb-12">Cüzdana etkisi</H2>
      <div className="grid md:grid-cols-3 gap-5">
        <div className="ofis-card rounded-2xl p-6 ofis-slot-pp-bg border">
          <div className="text-3xl font-bold ofis-slot-pp">P</div>
          <div className="text-sm text-gray-400 mt-1 mb-4">PowerPoint</div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Web</span>
              <span className="ofis-slot-pp font-mono">$0</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Personal</span>
              <span className="ofis-slot-pp font-mono">$9.99/ay</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Family</span>
              <span className="ofis-slot-pp font-mono">$12.99/ay</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Business</span>
              <span className="ofis-slot-pp font-mono">$22/ay</span>
            </div>
            <div className="flex justify-between text-xs pt-2 mt-2 border-t border-white/5">
              <span className="text-[#00ff41]">Öğrenci (.edu)</span>
              <span className="text-[#00ff41] font-mono">FREE</span>
            </div>
          </div>
        </div>
        <div className="ofis-card rounded-2xl p-6 ofis-slot-canva-bg border">
          <Palette className="w-8 h-8 ofis-slot-canva" />
          <div className="text-sm text-gray-400 mt-1 mb-4">Canva</div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Free</span>
              <span className="ofis-slot-canva font-mono">$0</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Pro (1 kişi)</span>
              <span className="ofis-slot-canva font-mono">$15/ay</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Pro (5 kişi)</span>
              <span className="ofis-slot-canva font-mono">$30/ay</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Enterprise</span>
              <span className="ofis-slot-canva font-mono">Custom</span>
            </div>
            <div className="flex justify-between text-xs pt-2 mt-2 border-t border-white/5">
              <span className="text-[#00ff41]">Education</span>
              <span className="text-[#00ff41] font-mono">FREE</span>
            </div>
          </div>
        </div>
        <div className="ofis-card rounded-2xl p-6 ofis-slot-gamma-bg border">
          <Wand2 className="w-8 h-8 ofis-slot-gamma" />
          <div className="text-sm text-gray-400 mt-1 mb-4">Gamma</div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Free</span>
              <span className="ofis-slot-gamma font-mono">$0 (400 kr)</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Plus</span>
              <span className="ofis-slot-gamma font-mono">$8/ay</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Pro</span>
              <span className="ofis-slot-gamma font-mono">$15/ay</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Business</span>
              <span className="ofis-slot-gamma font-mono">$25/ay</span>
            </div>
            <div className="flex justify-between text-xs pt-2 mt-2 border-t border-white/5">
              <span className="text-gray-500">Education</span>
              <span className="text-gray-500 font-mono">—</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center text-xs text-gray-500 font-mono">
        Güncel fiyatlandırma · Nisan 2026
      </div>
    </SlideShell>
  ),

  // 30 — When to use what
  () => (
    <SlideShell>
      <Eyebrow>Karar Rehberi</Eyebrow>
      <H2 className="mb-12">Hangi Aracı Ne Zaman?</H2>
      <div className="grid md:grid-cols-3 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl p-6 ofis-slot-pp-bg border"
        >
          <div className="text-3xl font-bold ofis-slot-pp mb-3">P</div>
          <div className="text-lg font-semibold text-white mb-3">PowerPoint</div>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 ofis-slot-pp shrink-0 mt-0.5" />
              Akademik tez savunması
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 ofis-slot-pp shrink-0 mt-0.5" />
              Kurumsal raporlar
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 ofis-slot-pp shrink-0 mt-0.5" />
              Video sunum kaydı
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 ofis-slot-pp shrink-0 mt-0.5" />
              Çevrimdışı çalışma
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 ofis-slot-pp shrink-0 mt-0.5" />
              Excel/Word entegrasyonu
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-2xl p-6 ofis-slot-canva-bg border"
        >
          <Palette className="w-8 h-8 ofis-slot-canva mb-3" />
          <div className="text-lg font-semibold text-white mb-3">Canva</div>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 ofis-slot-canva shrink-0 mt-0.5" />
              Sosyal medya görselleri
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 ofis-slot-canva shrink-0 mt-0.5" />
              Görsel ağırlıklı sunum
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 ofis-slot-canva shrink-0 mt-0.5" />
              Marka tutarlılığı
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 ofis-slot-canva shrink-0 mt-0.5" />
              Takım çalışması
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 ofis-slot-canva shrink-0 mt-0.5" />
              Şablonla hızlı başlangıç
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl p-6 ofis-slot-gamma-bg border"
        >
          <Wand2 className="w-8 h-8 ofis-slot-gamma mb-3" />
          <div className="text-lg font-semibold text-white mb-3">Gamma</div>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 ofis-slot-gamma shrink-0 mt-0.5" />
              Hızlı taslak çıkarma
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 ofis-slot-gamma shrink-0 mt-0.5" />
              Brainstorming
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 ofis-slot-gamma shrink-0 mt-0.5" />
              AI içerik üretimi
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 ofis-slot-gamma shrink-0 mt-0.5" />
              Web yayını + analytics
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 ofis-slot-gamma shrink-0 mt-0.5" />
              Pitch deck taslağı
            </li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  6. TASARIM TEMELLERİ  ───────────────── */

  // 31 — 6 design rules
  () => (
    <SlideShell>
      <Eyebrow>Genel Kurallar</Eyebrow>
      <H2 className="mb-12">İyi Sunum Tasarımının 6 Kuralı</H2>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { n: "1", t: "Az kelime, çok görsel", d: "Slayt bir poster, bir makale değil" },
          { n: "2", t: "6×6 kuralı", d: "En fazla 6 satır, satırda 6 kelime" },
          { n: "3", t: "Tek mesaj / slayt", d: "Bir slayt = bir fikir" },
          { n: "4", t: "Tutarlı tipografi", d: "En fazla 2 font, hiyerarşik boyut" },
          { n: "5", t: "Büyük font", d: "24pt altına inme — son sıradan okunabilsin" },
          { n: "6", t: "Animasyon az", d: "Vurgu için kullan, gösteriş için değil" },
        ].map((r, i) => (
          <motion.div
            key={r.n}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.07 }}
            className="ofis-card rounded-xl p-5 flex items-center gap-5"
          >
            <div className="w-12 h-12 rounded-lg bg-[#00ff41]/10 border border-[#00ff41]/30 flex items-center justify-center text-2xl font-bold text-[#00ff41] shrink-0">
              {r.n}
            </div>
            <div>
              <div className="text-base font-semibold text-white">{r.t}</div>
              <div className="text-sm text-gray-400">{r.d}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  // 32 — Bad vs Good slides
  () => (
    <SlideShell>
      <Eyebrow>Yan Yana Karşılaştırma</Eyebrow>
      <H2 className="mb-12">Kötü slayt vs İyi slayt</H2>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 text-red-400 text-sm font-mono uppercase tracking-wider">
            <XCircle className="w-4 h-4" />
            Kötü
          </div>
          <div className="aspect-video bg-white rounded p-4 text-black text-[10px] leading-tight space-y-1 overflow-hidden">
            <div className="font-bold text-sm">Yapay Zekânın Eğitimde Kullanımı ve Gelecek Etkileri Üzerine Detaylı Analiz</div>
            <div className="text-[8px]">
              Yapay zeka teknolojileri son yıllarda eğitim alanında önemli
              gelişmeler kaydetmiştir. Özellikle kişiselleştirilmiş öğrenme,
              akıllı tutorların kullanımı, otomatik notlandırma sistemleri ve
              içerik üretimi alanlarında devrim yaratmaktadır. ChatGPT, Khanmigo
              ve Duolingo Max gibi araçlar öğrenci deneyimini dönüştürürken,
              öğretmenlerin de iş yükünü azaltmaktadır. Bu sunumda yapay zekanın
              eğitimde nasıl kullanıldığını, faydalarını, risklerini ve gelecek
              perspektifini detaylı şekilde inceleyeceğiz. Ayrıca somut örnekler
              ve istatistiklerle konuyu destekleyeceğiz...
            </div>
          </div>
          <ul className="text-xs text-red-400 space-y-1 mt-3">
            <li>• Çok küçük font</li>
            <li>• Wall of text</li>
            <li>• Görsel yok</li>
            <li>• Başlık çok uzun</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 text-[#00ff41] text-sm font-mono uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            İyi
          </div>
          <div className="aspect-video bg-black rounded p-6 text-white border border-[#00ff41]/30 flex flex-col justify-center">
            <div className="text-[#00ff41] text-[9px] font-mono uppercase tracking-wider mb-2">
              Yapay Zekâ
            </div>
            <div className="text-2xl font-bold mb-3">Eğitimi Dönüştürüyor</div>
            <div className="text-3xl font-bold text-[#00ff41]">+47%</div>
            <div className="text-[10px] text-gray-400 mt-1">Öğrenme verimliliğinde artış</div>
          </div>
          <ul className="text-xs text-[#00ff41] space-y-1 mt-3">
            <li>• Tek mesaj, tek istatistik</li>
            <li>• Büyük font, yüksek kontrast</li>
            <li>• Boş alan + odak</li>
            <li>• Görsel hiyerarşi</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 33 — Color & Typography
  () => (
    <SlideShell>
      <Eyebrow>Görsel Detaylar</Eyebrow>
      <H2 className="mb-12">Renk & Tipografi</H2>
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-xs uppercase tracking-wider text-[#00ff41] mb-4">
            Renk Paleti — 3 renk yeter
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { c: "#00ff41", n: "Primary" },
              { c: "#0a0a0a", n: "BG" },
              { c: "#e8ffee", n: "Text" },
            ].map((c) => (
              <div key={c.n} className="text-center">
                <div
                  className="aspect-square rounded-lg mb-2 border border-white/10"
                  style={{ background: c.c }}
                />
                <div className="text-[10px] font-mono text-gray-500">{c.c}</div>
                <div className="text-xs text-gray-400">{c.n}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-[10px] text-gray-500 text-center">
            60% nötr · 30% ana · 10% vurgu kuralı
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-xs uppercase tracking-wider text-[#00ff41] mb-4">
            Tipografi Hiyerarşisi
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-3xl font-bold text-white">Başlık</div>
              <div className="text-[10px] font-mono text-gray-500">36-48pt · bold</div>
            </div>
            <div>
              <div className="text-xl font-semibold text-gray-300">Alt Başlık</div>
              <div className="text-[10px] font-mono text-gray-500">20-24pt · semibold</div>
            </div>
            <div>
              <div className="text-base text-gray-400">Gövde metni — okunabilir</div>
              <div className="text-[10px] font-mono text-gray-500">14-18pt · regular</div>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 34 — Common Mistakes
  () => (
    <SlideShell>
      <Eyebrow>Yaygın Hatalar</Eyebrow>
      <H2 className="mb-12">Yapma!</H2>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          {
            t: "Slaytı okuma",
            d: "Slaytın yazısını birebir okursan dinleyici sıkılır",
          },
          {
            t: "Wall of text",
            d: "Tek slayta paragraf paragraf metin yığma",
          },
          {
            t: "Default tema",
            d: "PowerPoint'in 1990'lardan kalma temalarını kullanma",
          },
          {
            t: "12pt font",
            d: "Son sıra okumuyor — 24pt altına inme",
          },
          {
            t: "Aşırı animasyon",
            d: "Her şey uçuşan-dönen sirk gösterisi değil",
          },
          {
            t: "Düşük kalite görsel",
            d: "Pikselli, bulanık ya da kötü stoklar — hemen fark edilir",
          },
          {
            t: "Tutarsız hizalama",
            d: "Slaytlar arası hareket eden başlıklar göz yorar",
          },
          {
            t: "Yazım hataları",
            d: "Tek typo bile profesyonelliği bitirir",
          },
        ].map((m, i) => (
          <motion.div
            key={m.t}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="ofis-card rounded-lg p-4 flex gap-3"
            style={{ borderColor: "rgba(239,68,68,0.2)" }}
          >
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-white">{m.t}</div>
              <div className="text-xs text-gray-400 mt-0.5">{m.d}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  // 35 — Quote: Reynolds
  () => (
    <QuoteSlide
      quote="Bir slayt projektör için değil, dinleyicinin gözleri için tasarlanır. Asıl hikayeyi siz anlatırsınız, slaytlar ise sözlerinize görsel bir destektir."
      author="Garr Reynolds"
      role="Presentation Zen yazarı"
    />
  ),

  /* ─────────────────  7. KAYNAKLAR & ÖDEV  ───────────────── */

  // 36 — Free resources
  () => (
    <SlideShell>
      <Eyebrow>Ücretsiz Kaynaklar</Eyebrow>
      <H2 className="mb-12">Profesyonel sunum için bedava cephanelik</H2>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          {
            cat: "Stok Görsel",
            link: "unsplash.com",
            desc: "5M+ ücretsiz, telifsiz fotoğraf",
            color: "#00ff41",
          },
          {
            cat: "Stok Görsel",
            link: "pexels.com",
            desc: "Ücretsiz fotoğraf + video, tic. kullanım",
            color: "#00ff41",
          },
          {
            cat: "Font",
            link: "fonts.google.com",
            desc: "1500+ ücretsiz Google Font",
            color: "#3b82f6",
          },
          {
            cat: "İkon",
            link: "lucide.dev",
            desc: "Bu sunumda kullanılan ikonlar — hepsi ücretsiz",
            color: "#3b82f6",
          },
          {
            cat: "Renk",
            link: "coolors.co",
            desc: "Renk paleti üretici, milyonlarca palet",
            color: "#a855f7",
          },
          {
            cat: "İllüstrasyon",
            link: "undraw.co",
            desc: "Açık kaynak, renkli SVG illüstrasyonlar",
            color: "#a855f7",
          },
          {
            cat: "Veri Görselleştirme",
            link: "datawrapper.de",
            desc: "Etkileşimli grafikler, ücretsiz tier",
            color: "#00c4cc",
          },
          {
            cat: "Grafik Tasarım",
            link: "figma.com",
            desc: "Pro tasarımcıların aracı — eğitimde ücretsiz",
            color: "#00c4cc",
          },
        ].map((r, i) => (
          <motion.div
            key={r.cat + r.link}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 + i * 0.05 }}
            className="ofis-card rounded-lg p-4 flex items-center gap-4"
          >
            <div
              className="w-1.5 h-12 rounded-full"
              style={{ background: r.color }}
            />
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-wider text-gray-500">
                {r.cat}
              </div>
              <div
                className="text-sm font-mono font-semibold"
                style={{ color: r.color }}
              >
                {r.link}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">{r.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  // 37 — Homework
  () => (
    <SlideShell>
      <Eyebrow>Bu Hafta</Eyebrow>
      <H2 className="mb-12">Yapılacaklar</H2>
      <div className="grid md:grid-cols-2 gap-5">
        {[
          {
            n: "01",
            t: "PowerPoint",
            d: "5 slaytlık bir sunum hazırla, anlatımını video olarak kaydet. .mp4 olarak çıktı al.",
            color: "#d24726",
          },
          {
            n: "02",
            t: "Canva",
            d: "Aynı konuyu Canva'da hazır bir şablonla yeniden tasarla. PNG ve PDF olarak indir.",
            color: "#00c4cc",
          },
          {
            n: "03",
            t: "Gamma",
            d: "Aynı konuyu Gamma'ya prompt olarak ver, AI ile üret. 5 dakikada bitirmeyi hedefle.",
            color: "#a855f7",
          },
          {
            n: "04",
            t: "Karşılaştır",
            d: "Üç sonucu kıyasla. Hangisi en hızlıydı? Hangisi en güzel? Bir blog yazısı yaz.",
            color: "#00ff41",
          },
        ].map((task, i) => (
          <motion.div
            key={task.n}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="ofis-card rounded-2xl p-6"
            style={{ borderColor: `${task.color}30` }}
          >
            <div
              className="text-3xl font-mono font-bold mb-3"
              style={{ color: task.color }}
            >
              {task.n}
            </div>
            <div className="text-xl font-semibold text-white mb-2">{task.t}</div>
            <div className="text-sm text-gray-400 leading-relaxed">{task.d}</div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  // 38 — Thanks / Closing
  () => (
    <SlideShell bgPattern={false}>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-20 h-20 rounded-full items-center justify-center mb-8"
          style={{
            background: "rgba(0,255,65,0.1)",
            border: "2px solid rgba(0,255,65,0.4)",
          }}
        >
          <Sparkles className="w-10 h-10 text-[#00ff41]" />
        </motion.div>
        <H1 className="ofis-shimmer">Teşekkürler</H1>
        <Sub className="mt-8 max-w-xl mx-auto">
          Sorularınız için sınıf saatinde — Çarşamba 09:55–12:30
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 inline-flex items-center gap-3 px-6 py-3 rounded-full ofis-card"
        >
          <PresentationIcon className="w-4 h-4 text-[#00ff41]" />
          <span className="text-sm text-gray-300">
            BVA 1108 · Bilgi Teknolojileri · 9. Hafta
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-10 text-[10px] text-gray-600 font-mono"
        >
          Kaynaklar: Microsoft (2025), Canva (2025), Gamma (2025), Garr
          Reynolds — Presentation Zen
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
      {/* Top progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/5 z-50">
        <motion.div
          className="h-full"
          style={{
            background: "linear-gradient(90deg, #00ff41, #4dff80, #00ff41)",
            boxShadow: "0 0 16px rgba(0,255,65,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#00ff41]/70">
          BVA 1108 · 9. Hafta · Ofis Programları
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[#00ff41]/50">
            <span className="text-[#00ff41]">
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
            className="p-1.5 text-gray-500 hover:text-[#00ff41] transition-colors"
            aria-label="Tam ekran"
          >
            {isFs ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Slide content */}
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

      {/* Click navigation zones */}
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

      {/* Bottom navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-40 px-8 py-4 flex items-center justify-between border-t border-white/5 bg-black/60 backdrop-blur">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#00ff41] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
                  ? "w-5 bg-[#00ff41]"
                  : "w-1.5 bg-white/15 hover:bg-white/40"
              }`}
              style={
                i === current
                  ? { boxShadow: "0 0 10px rgba(0,255,65,0.6)" }
                  : undefined
              }
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#00ff41] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        >
          Sonraki
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Keyboard hint */}
      <div className="absolute bottom-3 right-8 text-[9px] font-mono text-gray-700 z-50 hidden md:flex items-center gap-2">
        <Keyboard className="w-3 h-3" />
        <span>← → · F · Esc</span>
      </div>
    </div>
  );
}
