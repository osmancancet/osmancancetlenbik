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
  AlertTriangle,
  Briefcase,
  Users,
  Brain,
  Target,
  Lightbulb,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Quote,
  Check,
  X,
  Sparkles,
  Zap,
  CheckCircle2,
  XCircle,
  Plus,
  Calendar,
  Hash,
  Globe,
  GraduationCap,
  Heart,
  HeartPulse,
  Phone,
  Activity,
  ShieldAlert,
  HelpCircle,
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
        <div className="absolute inset-0 isg-grid-bg pointer-events-none" />
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
      className="inline-flex items-center gap-3 mb-6 text-xs font-mono uppercase tracking-[0.25em] text-[#f59e0b]"
    >
      <span className="w-8 h-px bg-[#f59e0b]" />
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
  accent = "#f59e0b",
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
      className="isg-card isg-card-hover rounded-xl p-6 transition-all"
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
  accent = "#f59e0b",
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
      className="isg-card rounded-xl p-5"
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

function QuoteSlide({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <SlideShell>
      <div className="text-center max-w-4xl mx-auto">
        <Quote className="w-16 h-16 text-[#f59e0b]/40 mx-auto mb-8" />
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
          <div className="text-lg font-semibold text-[#f59e0b]">{author}</div>
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
          className="inline-flex w-32 h-32 rounded-3xl items-center justify-center mb-8 isg-pulse"
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
   TOPIC-SPECIFIC MOCKUPS
   ============================================================ */

function EmergencyCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="isg-phone-frame mx-auto"
      style={{ width: 280 }}
    >
      <div className="isg-phone-screen px-5 pt-3 pb-6">
        {/* status bar */}
        <div className="flex items-center justify-between text-[10px] font-mono text-white/80 mb-6">
          <span>14:27</span>
          <div className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-white" />
            <span className="w-1 h-1 rounded-full bg-white" />
            <span className="w-1 h-1 rounded-full bg-white" />
            <span className="ml-2">88%</span>
          </div>
        </div>
        <div className="text-center">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/70 mb-1">
            Acil Çağrı
          </div>
          <div className="text-[11px] text-white/60 mb-4">Konum: Manisa · Yunusemre</div>
          <motion.div
            className="text-[120px] font-black leading-none mb-2"
            style={{ fontFamily: "Helvetica Neue, sans-serif" }}
            initial={{ scale: 0.7 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            112
          </motion.div>
          <div className="text-[11px] text-white/70 font-mono">Aranıyor… 00:02</div>
        </div>
        <div className="mt-7 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center isg-dial-pulse">
            <Phone className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[10px] text-white/70">
          <div>Sessize Al</div>
          <div>Tuş Takımı</div>
          <div>Hoparlör</div>
        </div>
      </div>
    </motion.div>
  );
}

function FirstAidKit() {
  const items: Array<{ label: string; sub: string }> = [
    { label: "Steril gazlı bez", sub: "5 paket" },
    { label: "Üçgen sargı", sub: "2 adet" },
    { label: "Antiseptik solüsyon", sub: "Batikon 100ml" },
    { label: "Makas + cımbız", sub: "Paslanmaz" },
    { label: "Tek kullanımlık eldiven", sub: "Lateks · 4 çift" },
    { label: "Dijital termometre", sub: "Pilli" },
    { label: "Yapışkan bant", sub: "Mikropor 2.5cm" },
    { label: "Yakıcı pamuk", sub: "50 gr" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="grid md:grid-cols-[260px_1fr] gap-8 items-center"
    >
      {/* SVG-styled kit box */}
      <div className="relative mx-auto" style={{ width: 240 }}>
        <div className="isg-kit-handle mx-auto" style={{ width: 80, height: 16 }} />
        <div className="isg-kit-box relative" style={{ width: 240, height: 180 }}>
          {/* horizontal arm */}
          <div
            className="isg-kit-cross absolute"
            style={{
              top: "50%",
              left: "50%",
              width: 90,
              height: 24,
              transform: "translate(-50%, -50%)",
            }}
          />
          {/* vertical arm */}
          <div
            className="isg-kit-cross absolute"
            style={{
              top: "50%",
              left: "50%",
              width: 24,
              height: 90,
              transform: "translate(-50%, -50%)",
            }}
          />
          {/* clasp */}
          <div
            className="absolute"
            style={{
              top: "50%",
              left: 6,
              width: 6,
              height: 28,
              background: "#9ca3af",
              borderRadius: 2,
              transform: "translateY(-50%)",
            }}
          />
          <div
            className="absolute"
            style={{
              top: "50%",
              right: 6,
              width: 6,
              height: 28,
              background: "#9ca3af",
              borderRadius: 2,
              transform: "translateY(-50%)",
            }}
          />
        </div>
        <div className="text-center text-[10px] text-gray-500 mt-3 font-mono uppercase tracking-wider">
          İlk Yardım Çantası
        </div>
      </div>
      {/* labelled items grid */}
      <div className="grid grid-cols-2 gap-2">
        {items.map((it, i) => (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.06 }}
            className="isg-kit-item"
          >
            <div className="font-semibold">{it.label}</div>
            <div className="text-[9px] text-gray-500 mt-0.5">{it.sub}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ABCStep({
  letter,
  title,
  subtitle,
  steps,
  delay = 0,
  accent = "#f59e0b",
}: {
  letter: string;
  title: string;
  subtitle: string;
  steps: string[];
  delay?: number;
  accent?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="isg-card rounded-2xl p-6 flex flex-col"
    >
      <div
        className="isg-abc-tile w-20 h-20 flex items-center justify-center text-5xl mb-4 mx-auto"
        style={{
          background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
          boxShadow: `0 12px 30px -10px ${accent}99`,
        }}
      >
        {letter}
      </div>
      <div className="text-center">
        <div className="text-xl font-bold text-white">{title}</div>
        <div className="text-xs text-gray-400 mb-4">{subtitle}</div>
      </div>
      <ul className="space-y-2">
        {steps.map((s) => (
          <li key={s} className="flex items-start gap-2 text-[12px] text-gray-300">
            <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: accent }} />
            <span>{s}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ─────────────────  AÇILIŞ  ───────────────── */

  // 1 — Cover
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 1109 · 1. Hafta · İlk Yardıma Giriş</Eyebrow>
        <H1 className="isg-shimmer">
          İş Sağlığı
          <br />
          ve Güvenliği
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Önce can güvenliği — sonra her şey
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 flex items-center justify-center gap-6 flex-wrap"
        >
          <div className="isg-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-md flex items-center justify-center text-xl isg-cross-tile">
              +
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">İlk Yardım</div>
              <div className="text-[10px] text-gray-500">Hayat kurtaran 4 dakika</div>
            </div>
          </div>
          <div className="isg-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(245,158,11,0.18)" }}
            >
              <ShieldAlert className="w-5 h-5" style={{ color: "#fbbf24" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Kişisel Koruyucu</div>
              <div className="text-[10px] text-gray-500">Baret · eldiven · gözlük</div>
            </div>
          </div>
          <div className="isg-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(59,130,246,0.18)" }}
            >
              <Briefcase className="w-5 h-5" style={{ color: "#60a5fa" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Mevzuat</div>
              <div className="text-[10px] text-gray-500">6331 sayılı İSG Kanunu</div>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 2 — 15 hafta haritası
  () => (
    <SlideShell>
      <Eyebrow>Bu Dönem</Eyebrow>
      <H2 className="mb-8">15 hafta · İSG yol haritası</H2>
      <div className="grid md:grid-cols-3 gap-3 text-sm">
        {[
          { w: "01-02", t: "İlk yardım eğitimi I-II", a: true },
          { w: "03", t: "Kişisel emniyet, sağlık ve hijyen", a: false },
          { w: "04", t: "İş ortamı tehlikeleri", a: false },
          { w: "05", t: "Kimyasal & biyolojik riskler", a: false },
          { w: "06", t: "Yangın güvenliği & tahliye", a: false },
          { w: "07", t: "Elektrik & makine güvenliği", a: false },
          { w: "08", t: "Ara sınav", a: false },
          { w: "09", t: "Ergonomi & duruş bozuklukları", a: false },
          { w: "10", t: "Kişisel koruyucu donanım", a: false },
          { w: "11", t: "Stres, mobbing, psikososyal risk", a: false },
          { w: "12", t: "6331 sayılı İSG Kanunu", a: false },
          { w: "13", t: "Risk değerlendirmesi", a: false },
          { w: "14", t: "İş kazaları — vakalar", a: false },
          { w: "15", t: "Genel tekrar + final", a: false },
        ].map((h, i) => (
          <motion.div
            key={h.w}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.03 }}
            className={`rounded-lg px-3 py-2 flex items-center gap-3 ${
              h.a ? "isg-card-amber" : "isg-card"
            }`}
          >
            <span
              className={`text-[10px] font-mono px-2 py-1 rounded ${
                h.a
                  ? "bg-[#f59e0b] text-black font-bold"
                  : "bg-white/5 text-gray-500"
              }`}
            >
              {h.w}
            </span>
            <span className={h.a ? "text-white font-medium" : "text-gray-400"}>
              {h.t}
            </span>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 isg-card-amber rounded-xl p-4 text-center"
      >
        <div className="text-sm text-gray-300">
          Bu hafta:{" "}
          <span className="text-[#f59e0b] font-semibold">İlk yardım eğitimi — I</span>{" "}
          · temel ilkeler, ABC algoritması ve ilk yardım çantası.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 3 — Stats
  () => (
    <SlideShell>
      <Eyebrow>Rakamlarla İSG</Eyebrow>
      <H2 className="mb-12">Türkiye&apos;de iş kazaları gerçeği</H2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={AlertTriangle}
          value="1.5M"
          label="Türkiye&apos;de yıllık iş kazası"
          source="SGK İstatistik, 2023"
          accent="#f59e0b"
        />
        <StatCard
          icon={ShieldAlert}
          value="1.500+"
          label="İş kazası kaynaklı ölüm / yıl"
          source="İSİG Meclisi, 2023"
          delay={0.1}
          accent="#dc2626"
        />
        <StatCard
          icon={CheckCircle2}
          value="%85"
          label="Önlenebilir kaza oranı"
          source="ILO küresel ortalama"
          delay={0.2}
          accent="#22c55e"
        />
        <StatCard
          icon={Brain}
          value="4 dk"
          label="Beyin oksijensiz kalma sınırı"
          source="Resüsitasyon Konseyi"
          delay={0.3}
          accent="#a855f7"
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 isg-card rounded-xl p-5 text-center"
      >
        <div className="text-sm text-gray-300">
          Her gün ortalama{" "}
          <span className="text-[#f59e0b] font-semibold">4 işçi</span> ölüyor —{" "}
          <span className="text-[#22c55e] font-semibold">85&apos;i basit önlemlerle</span>{" "}
          önlenebilirdi. İlk yardım bilen biri olmak, fark yaratmak demektir.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 4 — Quote
  () => (
    <QuoteSlide
      quote="İlk yardım, hayat ile ölüm arasındaki köprüdür."
      author="Türk Kızılay"
      role="İlk Yardım Eğitim Merkezi · İlke kitapçığı"
    />
  ),

  /* ─────────────────  1. İLK YARDIM  ───────────────── */

  // 5 — Section: İlk Yardım
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="İlk Yardım"
      subtitle="Tanım, amaçlar ve temel ilkeler"
      bgGradient="linear-gradient(135deg, #f59e0b, #b45309)"
      shadow="0 20px 60px -10px rgba(245, 158, 11, 0.6)"
      icon={<AlertTriangle className="w-16 h-16 text-white" />}
    />
  ),

  // 6 — İlk yardım nedir? + 4 amacı
  () => (
    <SlideShell>
      <Eyebrow>Tanım</Eyebrow>
      <H2 className="mb-6">İlk yardım nedir?</H2>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="isg-card-amber rounded-xl p-5 mb-8"
      >
        <div className="text-base text-gray-200 leading-relaxed">
          Herhangi bir kaza ya da hastalık durumunda, sağlık görevlilerinin yardımı
          sağlanıncaya kadar; hayatın kurtarılması ya da durumun kötüye gitmesini
          önlemek amacıyla{" "}
          <span className="text-[#fbbf24] font-semibold">olay yerinde</span>,{" "}
          <span className="text-[#fbbf24] font-semibold">tıbbi araç gereç aranmaksızın</span>,{" "}
          mevcut araç ve gereçlerle yapılan ilaçsız uygulamalardır.
        </div>
        <div className="text-[10px] text-gray-500 mt-3 font-mono">
          Sağlık Bakanlığı · İlk Yardım Yönetmeliği, Madde 4
        </div>
      </motion.div>
      <div className="grid md:grid-cols-4 gap-3">
        {[
          {
            icon: HeartPulse,
            t: "Hayat kurtarmak",
            d: "Solunum ve dolaşımı sürdürmek",
          },
          {
            icon: ShieldAlert,
            t: "Kötüleşmeyi önlemek",
            d: "Durumun ağırlaşmasını engellemek",
          },
          {
            icon: Sparkles,
            t: "İyileşmeyi kolaylaştırmak",
            d: "Tıbbi tedaviye en iyi şartlarla teslim",
          },
          {
            icon: Heart,
            t: "Ağrıyı azaltmak",
            d: "Psikolojik destek + konfor sağlamak",
          },
        ].map((a, i) => {
          const Icon = a.icon;
          return (
            <motion.div
              key={a.t}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="isg-card rounded-xl p-4"
            >
              <Icon className="w-6 h-6 text-[#f59e0b] mb-2" />
              <div className="text-sm font-semibold text-white mb-1">{a.t}</div>
              <div className="text-[11px] text-gray-400">{a.d}</div>
            </motion.div>
          );
        })}
      </div>
    </SlideShell>
  ),

  // 7 — Temel ilkeler (5 madde)
  () => (
    <SlideShell>
      <Eyebrow>Temel İlkeler</Eyebrow>
      <H2 className="mb-10">İlk yardımcının 5 altın kuralı</H2>
      <div className="grid md:grid-cols-3 gap-4">
        <FeatureCard
          icon={ShieldAlert}
          title="1. Kendi güvenliğini sağla"
          desc="Trafiği kes, ortamı kontrol et, yangın/elektrik varsa uzaklaş. Sen yaralanırsan kimseyi kurtaramazsın."
          accent="#dc2626"
          delay={0.1}
        />
        <FeatureCard
          icon={Brain}
          title="2. Sakin ol, paniği bırak"
          desc="Derin nefes al. Sakin bir ilk yardımcı, çevresine güven verir; yaralı da sakinleşir."
          accent="#f59e0b"
          delay={0.2}
        />
        <FeatureCard
          icon={Activity}
          title="3. Hızlıca değerlendir"
          desc="Yaralı sayısı, bilinç, solunum, kanama — 30 saniyede genel tablo çıkar."
          accent="#3b82f6"
          delay={0.3}
        />
        <FeatureCard
          icon={XCircle}
          title="4. Gereksiz hareket ettirme"
          desc="Omurga zedelenmiş olabilir. Sadece hayati tehlike varsa (yangın, çökme) taşı."
          accent="#a855f7"
          delay={0.4}
        />
        <FeatureCard
          icon={Phone}
          title="5. 112'yi mutlaka ara"
          desc="Konum, kaza türü, yaralı sayısı, bilinç durumu — bilgi ver. Telefonu sen kapatma."
          accent="#22c55e"
          delay={0.5}
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="isg-card-amber rounded-xl p-6 flex flex-col justify-center"
        >
          <Lightbulb className="w-6 h-6 text-[#fbbf24] mb-3" />
          <div className="text-sm font-semibold text-white mb-2">
            Hatırla: 5K Kuralı
          </div>
          <div className="text-[12px] text-gray-300 leading-relaxed">
            <span className="isg-token">K</span>endin · {" "}
            <span className="isg-token">K</span>azazede ·{" "}
            <span className="isg-token">K</span>aza yeri ·{" "}
            <span className="isg-token">K</span>onum ·{" "}
            <span className="isg-token">K</span>onuş 112
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 8 — EmergencyCard mockup
  () => (
    <SlideShell>
      <Eyebrow>Acil Çağrı</Eyebrow>
      <H2 className="mb-8">112 — tek numara, tüm acil servisler</H2>
      <div className="grid md:grid-cols-[280px_1fr] gap-10 items-center">
        <EmergencyCard />
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="isg-card rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Hash className="w-4 h-4 text-[#f59e0b]" />
              <span className="text-sm font-semibold text-white">Ne söylenmeli?</span>
            </div>
            <ul className="text-[12px] text-gray-300 space-y-1.5">
              <li>· <span className="text-[#fbbf24]">Konum:</span> il, ilçe, sokak / km</li>
              <li>· <span className="text-[#fbbf24]">Kaza türü:</span> trafik, düşme, yanık, kalp…</li>
              <li>· <span className="text-[#fbbf24]">Yaralı sayısı + bilinç durumu</span></li>
              <li>· <span className="text-[#fbbf24]">Adın + telefonun</span></li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.65 }}
            className="isg-card-red rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-4 h-4 text-red-400" />
              <span className="text-sm font-semibold text-white">Sakın yapma</span>
            </div>
            <div className="text-[12px] text-red-200">
              Telefonu sen kapatma — operatör sana &ldquo;kapatabilirsiniz&rdquo;
              diyene kadar hatta kal.
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="isg-card-green rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="text-sm font-semibold text-white">Bilgi: 112</span>
            </div>
            <div className="text-[12px] text-green-200">
              2018&apos;den beri tüm acil hatlar (110, 155, 156, 177) tek
              numarada birleşti: <span className="font-mono font-bold">112</span> —
              ücretsiz, kontörsüz, her telefon.
            </div>
          </motion.div>
        </div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  2. ABC ALGORİTMASI  ───────────────── */

  // 9 — Section: ABC
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="ABC Algoritması"
      subtitle="Hava yolu · Solunum · Dolaşım — hayat sırasıyla"
      bgGradient="linear-gradient(135deg, #dc2626, #7f1d1d)"
      shadow="0 20px 60px -10px rgba(220, 38, 38, 0.6)"
      icon={<HeartPulse className="w-16 h-16 text-white" />}
    />
  ),

  // 10 — ABC three columns
  () => (
    <SlideShell>
      <Eyebrow>Hayat Kurtarma Sırası</Eyebrow>
      <H2 className="mb-8">A &middot; B &middot; C</H2>
      <div className="grid md:grid-cols-3 gap-5">
        <ABCStep
          letter="A"
          title="Airway"
          subtitle="Hava Yolu"
          steps={[
            "Ağız içini kontrol et — yabancı cisim var mı?",
            "Baş geri, çene yukarı pozisyonu (head-tilt)",
            "Bilinçsiz hastada dilin geriye kaçışını engelle",
            "Boyun travması şüphesinde sadece çene itme",
          ]}
          accent="#dc2626"
          delay={0.15}
        />
        <ABCStep
          letter="B"
          title="Breathing"
          subtitle="Solunum"
          steps={[
            "Bak — göğüs iniş çıkışı var mı? (5 sn)",
            "Dinle — burnuna kulağını yaklaştır",
            "Hisset — yanağında nefes sıcaklığı",
            "Yoksa: 2 kurtarıcı nefes ver",
          ]}
          accent="#f59e0b"
          delay={0.3}
        />
        <ABCStep
          letter="C"
          title="Circulation"
          subtitle="Dolaşım"
          steps={[
            "Şah damarından nabız kontrolü (10 sn)",
            "Nabız yoksa: göğüs basısı başlat",
            "30 bası + 2 nefes ritmi",
            "Dakikada 100-120 bası hızı",
          ]}
          accent="#22c55e"
          delay={0.45}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 isg-card-red rounded-xl p-4 text-center"
      >
        <div className="text-sm text-gray-200">
          <span className="text-red-300 font-semibold">Hatırla:</span> Beyin 4
          dakika sonra hasar görmeye başlar. CPR&apos;ye 1 dakikada başlamak,
          hayatta kalma şansını <span className="text-[#fbbf24] font-bold">%70</span>
          {" "}artırır.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 11 — Bilinç kontrolü + AVPU
  () => (
    <SlideShell>
      <Eyebrow>İlk Adım</Eyebrow>
      <H2 className="mb-10">Bilinç kontrolü · AVPU skalası</H2>
      <div className="grid md:grid-cols-[1.1fr_1fr] gap-8">
        <div className="space-y-3">
          <div className="text-sm text-gray-400 mb-3 font-mono uppercase tracking-wider">
            Adım adım uyaran ver
          </div>
          {[
            {
              n: 1,
              t: "Ses ver",
              d: "&ldquo;İyi misiniz? Beni duyuyor musunuz?&rdquo;",
              icon: HelpCircle,
            },
            {
              n: 2,
              t: "Omuzdan hafifçe sars",
              d: "Boyun varsa sallama — sadece omuz",
              icon: Activity,
            },
            {
              n: 3,
              t: "Ağrılı uyaran",
              d: "Kulak memesini sık veya tırnak yatağına bastır",
              icon: Zap,
            },
            {
              n: 4,
              t: "Tepki yoksa: 112 + CPR",
              d: "Süreyi başlat, çevreden yardım iste",
              icon: Phone,
            },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="isg-card rounded-lg p-3 flex items-start gap-3"
              >
                <div className="w-7 h-7 rounded-full bg-[#f59e0b] text-black text-xs font-bold flex items-center justify-center shrink-0">
                  {s.n}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[#fbbf24]" />
                    <div className="text-sm font-semibold text-white">{s.t}</div>
                  </div>
                  <div
                    className="text-[12px] text-gray-400 mt-0.5"
                    dangerouslySetInnerHTML={{ __html: s.d }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="isg-card-amber rounded-2xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-wider text-[#fbbf24] mb-1">
            AVPU Skalası
          </div>
          <div className="text-2xl font-bold text-white mb-5">
            Bilinç düzeyi 4 kademe
          </div>
          <div className="space-y-3">
            {[
              {
                k: "A",
                t: "Alert",
                d: "Uyanık · gözleri açık · konuşuyor",
                c: "#22c55e",
              },
              {
                k: "V",
                t: "Verbal",
                d: "Sese yanıt veriyor (göz açma, ses)",
                c: "#fbbf24",
              },
              {
                k: "P",
                t: "Pain",
                d: "Sadece ağrılı uyarana yanıt",
                c: "#f97316",
              },
              {
                k: "U",
                t: "Unresponsive",
                d: "Hiçbir uyarana yanıt yok — kritik",
                c: "#dc2626",
              },
            ].map((r) => (
              <div key={r.k} className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-lg shrink-0"
                  style={{ background: `${r.c}25`, color: r.c, border: `1px solid ${r.c}55` }}
                >
                  {r.k}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">{r.t}</div>
                  <div className="text-[11px] text-gray-400">{r.d}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3. İLK YARDIM ÇANTASI  ───────────────── */

  // 12 — Section: İlk Yardım Çantası
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="İlk Yardım Çantası"
      subtitle="Evde, arabada, iş yerinde — bulundurması zorunlu"
      bgGradient="linear-gradient(135deg, #22c55e, #15803d)"
      shadow="0 20px 60px -10px rgba(34, 197, 94, 0.6)"
      icon={<Briefcase className="w-16 h-16 text-white" />}
    />
  ),

  // 13 — FirstAidKit mockup
  () => (
    <SlideShell>
      <Eyebrow>İçerik</Eyebrow>
      <H2 className="mb-8">Çantanda ne olmalı?</H2>
      <FirstAidKit />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-8 isg-card rounded-xl p-4 text-center"
      >
        <div className="text-xs text-gray-300">
          <span className="text-[#f59e0b] font-mono">YASAL:</span> Karayolları Trafik
          Yönetmeliği — her araçta ilk yardım çantası bulundurulması{" "}
          <span className="text-[#fbbf24] font-semibold">zorunludur</span>. İşyerlerinde
          de 6331 sayılı Kanun gereği bulunur.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 14 — Yapılır / yapılmaz
  () => (
    <SlideShell>
      <Eyebrow>Pratik</Eyebrow>
      <H2 className="mb-10">Yapılır vs Yapılmaz</H2>
      <div className="grid md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="isg-do p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-6 h-6 text-green-400" />
            <span className="text-lg font-bold text-white">Yapılır</span>
          </div>
          <ul className="space-y-2.5 text-[13px]">
            {[
              "112'yi hemen ara — konumu net ver",
              "Yaralıyı açık havaya çıkar (mümkünse)",
              "Sıcak tut — battaniye / ceket örtbas",
              "Bilinçsiz hastayı yan yatır (koma pozisyonu)",
              "Kanayan yere baskı uygula",
              "Yanan yere 20 dk soğuk su tut",
              "Konuş, sakinleştir, yalnız bırakma",
            ].map((d) => (
              <li key={d} className="flex items-start gap-2 text-green-100">
                <Check className="w-3.5 h-3.5 text-green-400 mt-1 shrink-0" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="isg-dont p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <XCircle className="w-6 h-6 text-red-400" />
            <span className="text-lg font-bold text-white">Yapılmaz</span>
          </div>
          <ul className="space-y-2.5 text-[13px]">
            {[
              "Bilinçsiz / kusan kişiye su, ilaç verme",
              "Alkol, kolonya, içki ile &ldquo;ayıltma&rdquo;",
              "Yaralıyı gereksiz yere taşıma / sürükleme",
              "Yanığa diş macunu, yoğurt, salça sürme",
              "Saplı cismi (bıçak, demir) çıkarma",
              "Burun kanamasında başı geriye yatırma",
              "Trafik kazasında kaskı zorla çıkarma",
            ].map((d) => (
              <li key={d} className="flex items-start gap-2 text-red-100">
                <X className="w-3.5 h-3.5 text-red-400 mt-1 shrink-0" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 15 — Mit vs Gerçek
  () => (
    <SlideShell>
      <Eyebrow>Mit Avcılığı</Eyebrow>
      <H2 className="mb-10">Halk inanışı vs Bilim</H2>
      <div className="space-y-3">
        {[
          {
            m: "Boğulan kişiye hemen su iç dedir.",
            f: "ASLA içme verme — kusup hava yolunu tıkayabilir. Sırta tokat / Heimlich.",
          },
          {
            m: "Bayılana kolonya kokla, alkol içir; ayıltır.",
            f: "Yan yatır, hava yolunu aç, 112 ara. Ağızdan hiçbir şey verme.",
          },
          {
            m: "Yanığa diş macunu / yoğurt sür, serinletir.",
            f: "20 dakika oda sıcaklığında akar su. Krem, macun YASAK — enfeksiyon riski.",
          },
          {
            m: "Burun kanaması varsa kafayı arkaya yatır.",
            f: "Öne eğ, burun kanatlarını 10 dk sıkıştır. Geriye yatınca kana boğulur.",
          },
          {
            m: "Kalp krizinde aspirin çiğnetilmez, tehlikeli.",
            f: "Bilinci açıksa, alerji yoksa 300 mg aspirin ÇİĞNET — ölümü azaltır (AHA).",
          },
        ].map((r, i) => (
          <motion.div
            key={r.m}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="grid md:grid-cols-2 gap-2"
          >
            <div className="isg-myth rounded-r-md px-4 py-3 text-[13px]">
              <span className="text-[10px] uppercase tracking-wider font-bold text-red-300 mr-2">
                MİT
              </span>
              {r.m}
            </div>
            <div className="isg-fact rounded-r-md px-4 py-3 text-[13px]">
              <span className="text-[10px] uppercase tracking-wider font-bold text-green-300 mr-2">
                GERÇEK
              </span>
              {r.f}
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  // 16 — Bu hafta yapılacaklar checklist
  () => (
    <SlideShell>
      <Eyebrow>Senin İçin</Eyebrow>
      <H2 className="mb-10">Bu hafta yapılacaklar</H2>
      <div className="grid md:grid-cols-2 gap-3">
        {[
          {
            t: "İlk yardım çantanı incele",
            d: "Evdeki / arabadaki çantayı aç, eksikleri listele, son kullanma tarihlerini kontrol et.",
          },
          {
            t: "112 rehberini ezberle",
            d: "Adın, konumun, kaza türü, yaralı sayısı — 30 saniyede söyleyebilmelisin.",
          },
          {
            t: "ABC algoritmasını ezbere bil",
            d: "Airway → Breathing → Circulation. Her birinde ne yapılır? Yazılı yoklamada çıkacak.",
          },
          {
            t: "Aile bireyleriyle prova",
            d: "Bilinç kontrolünden 112'ye kadar canlandırma yapın. Konuşmak öğrenmektir.",
          },
          {
            t: "AVPU skalasını ezberle",
            d: "Alert · Verbal · Pain · Unresponsive — vize sorusu adayı.",
          },
          {
            t: "Bir ilk yardım videosu izle",
            d: "Türk Kızılay YouTube kanalı — &ldquo;Temel İlk Yardım&rdquo; (15 dk).",
          },
        ].map((c, i) => (
          <motion.div
            key={c.t}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.08 }}
            className="isg-check-row"
          >
            <div className="w-6 h-6 rounded border-2 border-[#f59e0b]/50 flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 text-[#f59e0b]" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-white">{c.t}</div>
              <div className="text-[11px] text-gray-400 mt-0.5">{c.d}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  // 17 — Sıradaki hafta preview
  () => (
    <SlideShell>
      <Eyebrow>Önümüzdeki Hafta</Eyebrow>
      <H2 className="mb-4">Hafta 2 · İlk yardım eğitimi — II</H2>
      <Sub className="mb-10 max-w-2xl">
        ABC üzerine inşa ediyoruz — kanama, yanık, kırık, zehirlenme, boğulma:
        gerçek senaryolar ve uygulama.
      </Sub>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            icon: Activity,
            t: "Temel Yaşam Desteği",
            d: "CPR uygulaması, göğüs basısı tekniği, AED kullanımı",
          },
          {
            icon: AlertTriangle,
            t: "Kanama & Şok",
            d: "Direkt baskı, turnike, şok pozisyonu, sıvı kaybı",
          },
          {
            icon: Zap,
            t: "Yanık & Elektrik",
            d: "Yanık dereceleri, soğutma, elektrik çarpmasına müdahale",
          },
          {
            icon: HeartPulse,
            t: "Kalp Krizi & İnme",
            d: "FAST testi (yüz, kol, konuşma, zaman) — erken tanı",
          },
          {
            icon: ShieldAlert,
            t: "Kırık & Çıkık",
            d: "Atelle sabitleme, soğuk uygulama, hareketsizleştirme",
          },
          {
            icon: HelpCircle,
            t: "Boğulma & Zehirlenme",
            d: "Heimlich manevrası, gıda/kimyasal zehirlenme",
          },
        ].map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.t}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.07 }}
              className="isg-card rounded-xl p-4"
            >
              <Icon className="w-5 h-5 text-[#f59e0b] mb-2" />
              <div className="text-sm font-semibold text-white mb-1">{p.t}</div>
              <div className="text-[11px] text-gray-400">{p.d}</div>
            </motion.div>
          );
        })}
      </div>
    </SlideShell>
  ),

  // 18 — Quote slogan
  () => (
    <QuoteSlide
      quote="Tıp eğitimi olmayan birinin yaptığı yanlış ilk yardım, hiç yapılmamış ilk yardımdan daha tehlikelidir."
      author="İlk Yardım Etiği · Anonim"
      role="Bu yüzden öğreniyoruz — &ldquo;sanırım biliyorum&rdquo; ölüm getirir."
    />
  ),

  // 19 — Özet
  () => (
    <SlideShell>
      <Eyebrow>Özet</Eyebrow>
      <H2 className="mb-10">Bu hafta neyi unutmamalısın?</H2>
      <div className="grid md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="isg-card-amber rounded-xl p-5"
        >
          <Target className="w-6 h-6 text-[#fbbf24] mb-3" />
          <div className="text-base font-semibold text-white mb-3">
            Üç şeyi ezbere bil
          </div>
          <ol className="space-y-2 text-[13px] text-gray-200 list-decimal list-inside">
            <li>Acil numara: <span className="isg-token">112</span></li>
            <li>Algoritma: <span className="isg-token">A · B · C</span></li>
            <li>Süre: <span className="isg-token">4 dakika</span> (beyin oksijensiz sınırı)</li>
          </ol>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="isg-card-amber rounded-xl p-5"
        >
          <GraduationCap className="w-6 h-6 text-[#fbbf24] mb-3" />
          <div className="text-base font-semibold text-white mb-3">
            Üç tutumu içselleştir
          </div>
          <ol className="space-y-2 text-[13px] text-gray-200 list-decimal list-inside">
            <li>Önce <span className="text-[#fbbf24] font-semibold">kendi güvenliğin</span></li>
            <li>Bilmediğini <span className="text-[#fbbf24] font-semibold">yapma</span></li>
            <li>Hep <span className="text-[#fbbf24] font-semibold">112&apos;yi ara</span> — beklemeden</li>
          </ol>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 isg-card rounded-xl p-5 text-center"
      >
        <div className="text-sm text-gray-300">
          <span className="text-[#f59e0b] font-semibold">İSG eğitimi:</span> Hem
          kendi hayatını, hem etrafındakileri kurtarma yetkinliğidir. Sadece sınav
          değil — yaşam becerisi.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 20 — Teşekkürler + iletişim
  () => (
    <SlideShell bgPattern={false}>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-3xl items-center justify-center mb-8"
          style={{
            background: "linear-gradient(135deg, #f59e0b, #b45309)",
            boxShadow: "0 20px 60px -10px rgba(245, 158, 11, 0.6)",
          }}
        >
          <Heart className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>Hafta 1 Tamamlandı</Eyebrow>
        <H1 className="isg-shimmer">Teşekkürler</H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Sorularınız varsa şimdi — kalanı haftaya forumda devam ederiz.
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 grid md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          <div className="isg-card rounded-xl p-4">
            <Calendar className="w-5 h-5 text-[#f59e0b] mb-2 mx-auto" />
            <div className="text-xs text-gray-400">Ders günü</div>
            <div className="text-sm font-semibold text-white mt-1">
              Perşembe · 13:30 — 15:10
            </div>
          </div>
          <div className="isg-card rounded-xl p-4">
            <Globe className="w-5 h-5 text-[#f59e0b] mb-2 mx-auto" />
            <div className="text-xs text-gray-400">Derslik</div>
            <div className="text-sm font-semibold text-white mt-1">
              MCBÜ MYO · Amfi 1
            </div>
          </div>
          <div className="isg-card rounded-xl p-4">
            <Users className="w-5 h-5 text-[#f59e0b] mb-2 mx-auto" />
            <div className="text-xs text-gray-400">Kod</div>
            <div className="text-sm font-semibold text-white mt-1">
              BVA 1109 · 2 AKTS
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-10 text-[11px] text-gray-600 font-mono"
        >
          Önce can güvenliği — sonra her şey.
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
            background: "linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b)",
            boxShadow: "0 0 16px rgba(245,158,11,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#f59e0b]/70">
          BVA 1109 · 1. Hafta · İlk Yardıma Giriş
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[#f59e0b]/50">
            <span className="text-[#f59e0b]">
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
            className="p-1.5 text-gray-500 hover:text-[#f59e0b] transition-colors"
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
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#f59e0b] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
                  ? "w-5 bg-[#f59e0b]"
                  : "w-1.5 bg-white/15 hover:bg-white/40"
              }`}
              style={
                i === current
                  ? { boxShadow: "0 0 10px rgba(245,158,11,0.6)" }
                  : undefined
              }
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#f59e0b] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
