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
  Target,
  Lightbulb,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  X,
  Sparkles,
  CheckCircle2,
  XCircle,
  Calendar,
  Globe,
  GraduationCap,
  ShieldAlert,
  ShieldCheck,
  HardHat,
  Layers,
  Flame,
  Zap,
  Volume2,
  Trash2,
  Eye,
  ClipboardList,
  Footprints,
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

/* Önlem hiyerarşisi — ters piramit (en etkili üstte) */
function ControlPyramid() {
  const levels: Array<{
    label: string;
    desc: string;
    color: string;
    width: number;
    icon: LucideIcon;
  }> = [
    {
      label: "1 · Ortadan kaldırma (Elimination)",
      desc: "Tehlikeyi tamamen yok et — en etkili önlem",
      color: "#16a34a",
      width: 100,
      icon: Trash2,
    },
    {
      label: "2 · İkame (Substitution)",
      desc: "Tehlikeliyi daha az tehlikeliyle değiştir",
      color: "#22c55e",
      width: 86,
      icon: Layers,
    },
    {
      label: "3 · Mühendislik önlemleri",
      desc: "Makine koruyucusu, havalandırma, izolasyon",
      color: "#f59e0b",
      width: 72,
      icon: ShieldCheck,
    },
    {
      label: "4 · İdari önlemler",
      desc: "Prosedür, eğitim, rotasyon, işaretleme",
      color: "#f97316",
      width: 58,
      icon: ClipboardList,
    },
    {
      label: "5 · Kişisel koruyucu donanım (KKD)",
      desc: "En son çare — diğerleri yetmediğinde",
      color: "#dc2626",
      width: 44,
      icon: HardHat,
    },
  ];
  return (
    <div className="flex flex-col items-center gap-2.5">
      {levels.map((l, i) => {
        const Icon = l.icon;
        return (
          <motion.div
            key={l.label}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.12 }}
            className="rounded-lg px-4 py-3 flex items-center gap-3"
            style={{
              width: `${l.width}%`,
              background: `${l.color}14`,
              border: `1px solid ${l.color}55`,
            }}
          >
            <div
              className="w-9 h-9 rounded-md flex items-center justify-center shrink-0"
              style={{ background: `${l.color}22` }}
            >
              <Icon className="w-5 h-5" style={{ color: l.color }} />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white">{l.label}</div>
              <div className="text-[11px] text-gray-400">{l.desc}</div>
            </div>
          </motion.div>
        );
      })}
      <div className="text-[11px] text-gray-500 mt-1 font-mono">
        Yukarıdan aşağıya etkinlik azalır · ILO / NIOSH önlem hiyerarşisi
      </div>
    </div>
  );
}

/* ISO 7010 işaret levhası rozeti */
function SafetySign({
  variant,
  glyph,
  caption,
}: {
  variant: "prohibition" | "warning" | "mandatory" | "safe";
  glyph: ReactNode;
  caption: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`isg-sign isg-sign-${variant}`}>{glyph}</div>
      <div className="text-[11px] text-gray-400 text-center leading-tight max-w-[120px]">
        {caption}
      </div>
    </div>
  );
}

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ─────────────────  AÇILIŞ  ───────────────── */

  // 1 — Kapak
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 1109 · 10. Hafta · İş Ortamı Güvenliği — I</Eyebrow>
        <H1 className="isg-shimmer">
          İş Ortamı
          <br />
          Güvenliğini Sağlama
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Tehlikeyi tanı, riski değerlendir, önce kaynağında önle.
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 flex items-center justify-center gap-6 flex-wrap"
        >
          <div className="isg-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(245,158,11,0.18)" }}
            >
              <AlertTriangle className="w-5 h-5" style={{ color: "#fbbf24" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Tehlike &amp; Risk</div>
              <div className="text-[10px] text-gray-500">Kavram farkı + 5 adım</div>
            </div>
          </div>
          <div className="isg-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(34,197,94,0.18)" }}
            >
              <ShieldCheck className="w-5 h-5" style={{ color: "#4ade80" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Önlem Hiyerarşisi</div>
              <div className="text-[10px] text-gray-500">Kaynaktan KKD&apos;ye</div>
            </div>
          </div>
          <div className="isg-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(59,130,246,0.18)" }}
            >
              <Eye className="w-5 h-5" style={{ color: "#60a5fa" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Güvenlik İşaretleri</div>
              <div className="text-[10px] text-gray-500">ISO 7010 · 4 renk</div>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 2 — Köprü + bu haftanın hedefi
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 9. haftadan 10. haftaya</Eyebrow>
      <H2>Bireyi korumaktan, ortamı güvenli kılmaya geçiyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Önceki haftalarda kişisel sağlık, hijyen ve bireyin korunmasına odaklandık.
        Bu hafta merceği genişletiyoruz: kazaların büyük kısmı kişiden değil, ortamdaki
        tanınmamış tehlikelerden doğar. Hedefimiz tehlikeyi sistemli biçimde görmek ve
        önlem hiyerarşisiyle azaltmak.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="isg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fbbf24]">
            <Users className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Şimdiye kadar
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />
              İlk yardım ve temel yaşam desteği
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />
              Kişisel emniyet, sağlık ve hijyen
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />
              Bireyin kendini koruma davranışları
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="isg-card-amber rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#4ade80]">
            <Target className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Bu haftanın hedefi
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] shrink-0" />
              Tehlike ile riski net biçimde ayırt etmek
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] shrink-0" />
              5 adımlı risk değerlendirmesini uygulamak
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] shrink-0" />
              Önlem hiyerarşisi ve güvenlik işaretlerini tanımak
            </li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 3 — Dönem haritası (Hafta 10 vurgulu)
  () => (
    <SlideShell>
      <Eyebrow>Bu Dönem</Eyebrow>
      <H2 className="mb-8">15 hafta · İSG yol haritası</H2>
      <div className="grid md:grid-cols-3 gap-3 text-sm">
        {[
          { w: "01-02", t: "İlk yardım eğitimi I-II", a: false },
          { w: "03", t: "Kişisel emniyet, sağlık ve hijyen", a: false },
          { w: "04", t: "İş ortamı tehlikeleri", a: false },
          { w: "05", t: "Kimyasal & biyolojik riskler", a: false },
          { w: "06", t: "Yangın güvenliği & tahliye", a: false },
          { w: "07", t: "Elektrik & makine güvenliği", a: false },
          { w: "08", t: "Ara sınav", a: false },
          { w: "09", t: "Ergonomi & duruş bozuklukları", a: false },
          { w: "10", t: "İş ortamı güvenliğini sağlama — I", a: true },
          { w: "11", t: "İş ortamı güvenliğini sağlama — II", a: false },
          { w: "12", t: "6331 sayılı İSG Kanunu", a: false },
          { w: "13", t: "Risk değerlendirmesi — uygulama", a: false },
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
          <span className="text-[#f59e0b] font-semibold">
            İş ortamı güvenliğini sağlama — I
          </span>{" "}
          · tehlike/risk ayrımı, risk değerlendirme ve önlem hiyerarşisi.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  1. TEHLİKE & RİSK  ───────────────── */

  // 4 — Section 1
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Tehlike, Risk ve Değerlendirme"
      subtitle="Önce kavramları doğru ayır; çünkü yanlış tanımlanan bir tehlike, eksik bir önleme yol açar."
      bgGradient="linear-gradient(135deg, #f59e0b, #b45309)"
      shadow="0 20px 60px -10px rgba(245, 158, 11, 0.6)"
      icon={<AlertTriangle className="w-16 h-16 text-white" />}
    />
  ),

  // 5 — Tehlike vs Risk
  () => (
    <SlideShell>
      <Eyebrow>Temel Kavramlar</Eyebrow>
      <H2 className="mb-2">Tehlike ile risk aynı şey değildir</H2>
      <Sub className="max-w-3xl mb-8">
        İSG mevzuatının (6331 sayılı Kanun, Madde 3) en sık karıştırılan iki tanımı.
        Tehlike bir kaynaktır; risk ise o kaynağın zarara dönüşme olasılığı ve şiddetidir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="isg-card-amber rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-6 h-6 text-[#fbbf24]" />
            <span className="text-lg font-bold text-white">Tehlike</span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            İş yerinde var olan ya da dışarıdan gelebilecek, çalışana zarar verme
            <span className="text-[#fbbf24] font-semibold"> potansiyeli</span> taşıyan kaynak.
          </p>
          <div className="text-[12px] text-gray-400 space-y-1.5">
            <div>· Zeminde dökülmüş yağ</div>
            <div>· Koruyucusu sökülmüş testere</div>
            <div>· Yüksekte korkuluksuz platform</div>
            <div>· Etiketsiz kimyasal bidonu</div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="isg-card-red rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert className="w-6 h-6 text-red-400" />
            <span className="text-lg font-bold text-white">Risk</span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            O tehlikeden bir zararın oluşma{" "}
            <span className="text-red-300 font-semibold">olasılığı</span> ile ortaya
            çıkacak zararın <span className="text-red-300 font-semibold">şiddetinin</span>{" "}
            birleşimi.
          </p>
          <div className="bg-black/40 rounded-lg px-4 py-3 font-mono text-[13px] text-center text-white">
            Risk = Olasılık <span className="text-[#fbbf24]">×</span> Şiddet
          </div>
          <div className="text-[11px] text-gray-400 mt-3">
            Aynı tehlike; ortama, sıklığa ve maruz kalan kişi sayısına göre farklı risk
            verir.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 6 — Risk değerlendirme 5 adım
  () => (
    <SlideShell>
      <Eyebrow>Yöntem</Eyebrow>
      <H2 className="mb-10">Risk değerlendirmesi · 5 adım</H2>
      <div className="grid md:grid-cols-5 gap-3">
        {[
          {
            n: "1",
            t: "Tehlikeleri tanı",
            d: "İş yerini gez, çalışana sor, kaza/ramak kala kayıtlarına bak.",
            icon: Eye,
          },
          {
            n: "2",
            t: "Kim, nasıl zarar görür?",
            d: "Etkilenecek kişileri ve zarar yollarını belirle.",
            icon: Users,
          },
          {
            n: "3",
            t: "Riski değerlendir",
            d: "Olasılık × şiddet ile derecelendir, önceliklendir.",
            icon: ClipboardList,
          },
          {
            n: "4",
            t: "Önlem al, kaydet",
            d: "Hiyerarşiye göre önlem seç ve yazılı hale getir.",
            icon: ShieldCheck,
          },
          {
            n: "5",
            t: "Gözden geçir",
            d: "Değişiklikte ve düzenli aralıkla yeniden değerlendir.",
            icon: Target,
          },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="isg-card rounded-xl p-4 flex flex-col"
            >
              <div className="w-9 h-9 rounded-full bg-[#f59e0b] text-black text-sm font-bold flex items-center justify-center mb-3">
                {s.n}
              </div>
              <Icon className="w-5 h-5 text-[#fbbf24] mb-2" />
              <div className="text-sm font-semibold text-white mb-1">{s.t}</div>
              <div className="text-[11px] text-gray-400 leading-relaxed">{s.d}</div>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 isg-card-amber rounded-xl p-4 text-center"
      >
        <div className="text-sm text-gray-300">
          <span className="text-[#f59e0b] font-semibold">Önemli:</span> Risk
          değerlendirmesi tek seferlik bir belge değil, sürekli dönen bir döngüdür —
          her yeni makine, malzeme veya süreçte yenilenir.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 7 — Risk matrisi (5x5)
  () => {
    const sevHeaders = ["Çok Hafif", "Hafif", "Orta", "Ciddi", "Çok Ciddi"];
    const probLabels = ["Çok Yüksek", "Yüksek", "Orta", "Düşük", "Çok Düşük"];
    // probWeight: 5..1 (top row = çok yüksek)
    const probWeights = [5, 4, 3, 2, 1];
    const sevWeights = [1, 2, 3, 4, 5];
    function cellColor(score: number): { bg: string; fg: string; label: string } {
      if (score >= 15) return { bg: "#dc2626", fg: "#fff", label: "Yüksek" };
      if (score >= 8) return { bg: "#f59e0b", fg: "#1f2937", label: "Orta" };
      return { bg: "#16a34a", fg: "#fff", label: "Düşük" };
    }
    return (
      <SlideShell>
        <Eyebrow>Araç · 5×5 Matris</Eyebrow>
        <H2 className="mb-2">Riski sayıya dök: olasılık × şiddet</H2>
        <Sub className="max-w-3xl mb-6">
          En yaygın yöntemlerden biri 5×5 matristir (L tipi). Her hücre olasılık ile
          şiddetin çarpımıdır; renk önceliği belirler.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-6 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="overflow-hidden rounded-xl isg-card p-3"
          >
            <div className="flex">
              <div className="w-28 shrink-0" />
              <div className="flex-1 text-center text-[10px] font-mono uppercase tracking-wider text-[#fbbf24] pb-2">
                Şiddet →
              </div>
            </div>
            <table className="w-full border-collapse text-center">
              <thead>
                <tr>
                  <th className="w-28 text-[10px] text-gray-500 font-mono p-1 text-right pr-2">
                    Olasılık ↓
                  </th>
                  {sevHeaders.map((h) => (
                    <th
                      key={h}
                      className="text-[10px] text-gray-400 font-medium p-1"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {probWeights.map((pw, ri) => (
                  <tr key={pw}>
                    <td className="text-[10px] text-gray-400 font-medium pr-2 text-right">
                      {probLabels[ri]}
                    </td>
                    {sevWeights.map((sw) => {
                      const score = pw * sw;
                      const c = cellColor(score);
                      return (
                        <td key={sw} className="p-1">
                          <div
                            className="rounded-md py-2 text-sm font-bold"
                            style={{ background: c.bg, color: c.fg }}
                          >
                            {score}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <div className="isg-card-red rounded-lg p-3">
              <div className="text-sm font-bold text-white">15 — 25 · Yüksek</div>
              <div className="text-[11px] text-gray-300">
                İş durdurulur, hemen önlem alınır.
              </div>
            </div>
            <div className="isg-card-amber rounded-lg p-3">
              <div className="text-sm font-bold text-white">8 — 12 · Orta</div>
              <div className="text-[11px] text-gray-300">
                Planlı sürede önlem; izlenir.
              </div>
            </div>
            <div className="isg-card-green rounded-lg p-3">
              <div className="text-sm font-bold text-white">1 — 6 · Düşük</div>
              <div className="text-[11px] text-gray-300">
                Kabul edilebilir; gözden geçirilir.
              </div>
            </div>
          </motion.div>
        </div>
      </SlideShell>
    );
  },

  /* ─────────────────  2. ÖNLEM HİYERARŞİSİ  ───────────────── */

  // 8 — Section 2
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Önlem Hiyerarşisi"
      subtitle="Riski en etkili yerde, yani kaynağında azalt. KKD her zaman son sıradadır — ilk değil."
      bgGradient="linear-gradient(135deg, #16a34a, #14532d)"
      shadow="0 20px 60px -10px rgba(34, 197, 94, 0.6)"
      icon={<ShieldCheck className="w-16 h-16 text-white" />}
    />
  ),

  // 9 — Önlem piramidi
  () => (
    <SlideShell>
      <Eyebrow>5 Kademe</Eyebrow>
      <H2 className="mb-2">Önce kaynak, en son KKD</H2>
      <Sub className="max-w-3xl mb-6">
        Aynı riske birden çok önlem uygulanabilir; ancak üst kademedekiler hatadan
        bağımsız olarak korur. KKD ise insanın doğru kullanmasına bağlıdır — bu yüzden
        en kırılgan, en son katmandır.
      </Sub>
      <ControlPyramid />
    </SlideShell>
  ),

  // 10 — KKD türleri (FeatureCard grid)
  () => (
    <SlideShell>
      <Eyebrow>Son Katman · KKD</Eyebrow>
      <H2 className="mb-10">Kişisel koruyucu donanım — vücut bölgesine göre</H2>
      <div className="grid md:grid-cols-3 gap-4">
        <FeatureCard
          icon={HardHat}
          title="Baş"
          desc="Baret / kask — düşen cisim ve çarpma. Şantiye ve depolarda zorunlu."
          accent="#f59e0b"
          delay={0.1}
        />
        <FeatureCard
          icon={Eye}
          title="Göz ve yüz"
          desc="Koruyucu gözlük, siperlik — kıvılcım, toz, kimyasal sıçraması."
          accent="#3b82f6"
          delay={0.2}
        />
        <FeatureCard
          icon={Volume2}
          title="Kulak"
          desc="Kulak tıkacı / manşonu — 85 dB üstü sürekli gürültüde işitme koruması."
          accent="#a855f7"
          delay={0.3}
        />
        <FeatureCard
          icon={ShieldCheck}
          title="Solunum"
          desc="Toz maskesi, yarım/tam yüz maskesi — toz, duman ve buhara karşı."
          accent="#22c55e"
          delay={0.4}
        />
        <FeatureCard
          icon={Briefcase}
          title="El ve gövde"
          desc="Kesilmez eldiven, önlük, reflektörlü yelek — temas ve görünürlük."
          accent="#ef4444"
          delay={0.5}
        />
        <FeatureCard
          icon={Footprints}
          title="Ayak"
          desc="Çelik burunlu iş ayakkabısı — ezilme, delinme ve kaymaya karşı."
          accent="#f97316"
          delay={0.6}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 isg-card rounded-xl p-4 text-center"
      >
        <div className="text-xs text-gray-300">
          <span className="text-[#f59e0b] font-mono">YASAL:</span> 6331 sayılı Kanun
          gereği KKD&apos;yi işveren <span className="text-[#fbbf24] font-semibold">ücretsiz</span>{" "}
          sağlar, çalışan ise kurallara uygun kullanmakla yükümlüdür.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 11 — Mühendislik önlemi örnekleri (tablo)
  () => (
    <SlideShell>
      <Eyebrow>Uygulama · Mühendislik Önlemleri</Eyebrow>
      <H2>Tehlikeyi insandan önce makinede durdur</H2>
      <Sub className="mt-3 max-w-3xl">
        Hiyerarşinin 3. kademesi en somut iş ortamı önlemleridir: tehlikeyi çalışandan
        fiziksel olarak ayırırlar.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 isg-card rounded-xl p-1"
      >
        <table className="isg-tbl">
          <thead>
            <tr>
              <th style={{ width: "26%" }}>Tehlike</th>
              <th style={{ width: "37%" }}>Mühendislik önlemi</th>
              <th>Nasıl korur?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Dönen / kesen makine</td>
              <td>Sabit veya kilitli koruyucu (guard), iki el kumandası</td>
              <td>El ile tehlikeli bölge arasına fiziksel engel koyar.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Toz ve zararlı buhar</td>
              <td>Yerel havalandırma / aspirasyon (LEV)</td>
              <td>Kirleticiyi kaynağında çeker, çalışana ulaşmadan toplar.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Gürültülü ekipman</td>
              <td>Ses yalıtım kabini, makineyi izole etme</td>
              <td>Gürültüyü kaynakta hapseder; maruziyeti düşürür.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Yüksekten düşme</td>
              <td>Korkuluk, kapak, toplu emniyet ağı</td>
              <td>Düşmeyi kişisel dikkatten bağımsız olarak engeller.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Elektrik teması</td>
              <td>Kaçak akım rölesi, topraklama, izolasyon</td>
              <td>Arızada akımı keser; çarpılmayı milisaniyede durdurur.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  3. İŞARETLER & DÜZEN  ───────────────── */

  // 12 — Section 3
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Güvenlik İşaretleri ve Düzen"
      subtitle="İyi bir iş ortamı, tehlikeyi sessizce anlatır: doğru renk, doğru şekil ve temiz bir zemin."
      bgGradient="linear-gradient(135deg, #2563eb, #1e3a8a)"
      shadow="0 20px 60px -10px rgba(37, 99, 235, 0.6)"
      icon={<Eye className="w-16 h-16 text-white" />}
    />
  ),

  // 13 — ISO 7010 işaret levhaları (renk/şekil)
  () => (
    <SlideShell>
      <Eyebrow>Görsel Dil · ISO 7010</Eyebrow>
      <H2 className="mb-2">Renk ve şekil bir anlam taşır</H2>
      <Sub className="max-w-3xl mb-8">
        Güvenlik işaretleri Sağlık ve Güvenlik İşaretleri Yönetmeliği ile standarttır.
        Şekli ve rengi, yazıyı okumadan önce uyarır.
      </Sub>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="isg-card rounded-xl p-5 flex flex-col items-center gap-4"
        >
          <SafetySign
            variant="prohibition"
            glyph={<X className="w-8 h-8 text-white" />}
            caption="Yasaklayıcı"
          />
          <div className="text-[11px] text-gray-400 text-center">
            Kırmızı daire + çapraz çizgi · &quot;Yapma&quot; (Sigara içilmez, girilmez)
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="isg-card rounded-xl p-5 flex flex-col items-center gap-4"
        >
          <SafetySign
            variant="warning"
            glyph={<AlertTriangle className="w-7 h-7 text-gray-900" />}
            caption="Uyarı"
          />
          <div className="text-[11px] text-gray-400 text-center">
            Sarı üçgen · &quot;Dikkat et&quot; (Kayan zemin, yüksek voltaj)
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="isg-card rounded-xl p-5 flex flex-col items-center gap-4"
        >
          <SafetySign
            variant="mandatory"
            glyph={<HardHat className="w-8 h-8 text-white" />}
            caption="Zorunluluk"
          />
          <div className="text-[11px] text-gray-400 text-center">
            Mavi daire · &quot;Yap&quot; (Baret tak, gözlük kullan)
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="isg-card rounded-xl p-5 flex flex-col items-center gap-4"
        >
          <SafetySign
            variant="safe"
            glyph={<CheckCircle2 className="w-8 h-8 text-white" />}
            caption="Acil çıkış / güvenli"
          />
          <div className="text-[11px] text-gray-400 text-center">
            Yeşil kare · &quot;Buraya&quot; (Acil çıkış, ilk yardım, toplanma)
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 14 — İş ortamı düzeni 5S
  () => (
    <SlideShell>
      <Eyebrow>Düzenli Ortam · 5S</Eyebrow>
      <H2 className="mb-2">Temiz ve düzenli ortam, kazayı azaltır</H2>
      <Sub className="max-w-3xl mb-8">
        Kayma, takılma ve düşme kazalarının büyük kısmı dağınık zeminden doğar. 5S
        yöntemi iş yerini sistemli biçimde düzenli tutar.
      </Sub>
      <div className="grid md:grid-cols-5 gap-3">
        {[
          {
            s: "1S",
            t: "Seiri · Ayıkla",
            d: "Gereksiz malzemeyi alandan uzaklaştır.",
          },
          {
            s: "2S",
            t: "Seiton · Düzenle",
            d: "Her şeye sabit yer; geçiş yolları açık.",
          },
          {
            s: "3S",
            t: "Seiso · Temizle",
            d: "Dökülen yağ/su hemen temizlenir.",
          },
          {
            s: "4S",
            t: "Seiketsu · Standartlaştır",
            d: "Kuralları görselleştir, herkese aynı.",
          },
          {
            s: "5S",
            t: "Shitsuke · Sürdür",
            d: "Denetle ve alışkanlık haline getir.",
          },
        ].map((x, i) => (
          <motion.div
            key={x.s}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="isg-card rounded-xl p-4 text-center"
          >
            <div className="w-12 h-12 rounded-lg bg-[#f59e0b]/15 border border-[#f59e0b]/40 text-[#fbbf24] font-bold flex items-center justify-center mx-auto mb-3">
              {x.s}
            </div>
            <div className="text-sm font-semibold text-white mb-1">{x.t}</div>
            <div className="text-[11px] text-gray-400 leading-relaxed">{x.d}</div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 isg-card rounded-xl p-4 text-center"
      >
        <div className="text-sm text-gray-300">
          <span className="text-[#f59e0b] font-semibold">İlke:</span> Geçiş yolları,
          yangın söndürücü önü ve elektrik panosu önü her zaman boş ve erişilebilir
          tutulur.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 15 — Yapılır / Yapılmaz
  () => (
    <SlideShell>
      <Eyebrow>Pratik</Eyebrow>
      <H2 className="mb-10">İş ortamında Yapılır vs Yapılmaz</H2>
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
              "Dökülen sıvıyı hemen temizle, ıslak zemini işaretle",
              "Makine koruyucusunu yerinde ve çalışır tut",
              "Bölgeye uygun KKD'yi tam ve doğru kullan",
              "Ramak kala olayını mutlaka bildir",
              "Geçiş yolları ve çıkışları açık tut",
              "Arızalı ekipmanı etiketle ve kilitle (LOTO)",
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
              "Koruyucuyu &quot;işi hızlandırmak için&quot; sökme",
              "Uyarı levhasını görmezden gelme veya kaldırma",
              "Yangın söndürücü/pano önünü malzemeyle kapatma",
              "KKD'yi &quot;kısa sürer&quot; diye takmama",
              "Tehlikeyi gördüğün halde sessiz kalma",
              "Yetkisiz olduğun makineyi çalıştırma",
            ].map((d) => (
              <li key={d} className="flex items-start gap-2 text-red-100">
                <X className="w-3.5 h-3.5 text-red-400 mt-1 shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: d }} />
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 16 — Uygulamalı: kendi alanını değerlendir
  () => (
    <SlideShell>
      <Eyebrow>Bu Hafta · Uygulama</Eyebrow>
      <H2>Kendi çalışma alanını değerlendir — 4 adım</H2>
      <Sub className="mt-3 max-w-3xl">
        Bir iş yeri, atölye, laboratuvar veya evdeki bir alanı seç. Bu hafta öğrendiğin
        yöntemle mini bir risk değerlendirmesi yap ve sonraki derse getir.
      </Sub>
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        {[
          {
            icon: Eye,
            t: "5 tehlike fotoğrafla",
            d: "Seçtiğin alanda en az 5 tehlike tespit et ve fotoğrafla (kayma, kesik, elektrik, düşme, kimyasal).",
            accent: "#fbbf24",
          },
          {
            icon: ClipboardList,
            t: "Matriste puanla",
            d: "Her tehlike için olasılık × şiddet ile 5×5 matriste bir skor ver.",
            accent: "#3b82f6",
          },
          {
            icon: ShieldCheck,
            t: "Önlem öner",
            d: "Her tehlikeye hiyerarşiden bir önlem yaz; mümkünse KKD'den daha üst kademeyi seç.",
            accent: "#22c55e",
          },
          {
            icon: Eye,
            t: "Eksik işareti bul",
            d: "Olması gerektiği halde bulunmayan bir güvenlik işaretini belirle ve hangi tip olması gerektiğini yaz.",
            accent: "#a855f7",
          },
        ].map((t, i) => {
          const Icon = t.icon;
          return (
            <motion.div
              key={t.t}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="isg-card isg-card-hover rounded-xl p-5 flex items-start gap-4"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `${t.accent}18`, border: `1px solid ${t.accent}55` }}
              >
                <Icon className="w-5 h-5" style={{ color: t.accent }} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-[10px] text-gray-500 font-mono">
                    {i + 1}
                  </span>
                  <h3 className="text-base font-semibold text-white">{t.t}</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{t.d}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 isg-card-amber rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <Lightbulb className="w-4 h-4 text-[#fbbf24] mt-0.5 shrink-0" />
        <span>
          <span className="text-white">İpucu:</span> Tehlikeyi giderirken önce
          &quot;Bu adımı tamamen kaldırabilir miyim?&quot; diye sor. Cevap evetse, en
          güçlü önlemi bulmuşsun demektir.
        </span>
      </motion.div>
    </SlideShell>
  ),

  // 17 — Sıradaki hafta + kapanış
  () => (
    <SlideShell>
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
          <ShieldCheck className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>10. hafta tamamlandı · sıradaki: İş ortamı güvenliği — II</Eyebrow>
        <H1 className="isg-shimmer">İş Ortamı Güvenliği — II</H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta tehlikeyi tanıdık ve önlemi sıraladık. Gelecek hafta özel tehlike
          türlerine iniyoruz: yangın, elektrik, yüksekte çalışma ve acil durum tahliyesi.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
          <FeatureCard
            icon={Flame}
            title="Yangın güvenliği"
            desc="Yangın üçgeni, söndürücü sınıfları, tahliye"
            accent="#dc2626"
            delay={0.1}
          />
          <FeatureCard
            icon={Zap}
            title="Elektrik güvenliği"
            desc="Kaçak akım, topraklama, güvenli çalışma"
            accent="#f59e0b"
            delay={0.2}
          />
          <FeatureCard
            icon={HardHat}
            title="Yüksekte çalışma"
            desc="Düşme önleme, emniyet kemeri, yaşam hattı"
            accent="#3b82f6"
            delay={0.3}
          />
          <FeatureCard
            icon={Sparkles}
            title="Acil durum planı"
            desc="Tahliye, toplanma yeri, tatbikat"
            accent="#22c55e"
            delay={0.4}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 grid md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          <div className="isg-card rounded-xl p-4">
            <Calendar className="w-5 h-5 text-[#f59e0b] mb-2 mx-auto" />
            <div className="text-xs text-gray-400">Hazırlık</div>
            <div className="text-sm font-semibold text-white mt-1">
              Mini risk değerlendirmesi
            </div>
          </div>
          <div className="isg-card rounded-xl p-4">
            <Globe className="w-5 h-5 text-[#f59e0b] mb-2 mx-auto" />
            <div className="text-xs text-gray-400">Teslim</div>
            <div className="text-sm font-semibold text-white mt-1">
              4 adımlık çalışma
            </div>
          </div>
          <div className="isg-card rounded-xl p-4">
            <GraduationCap className="w-5 h-5 text-[#f59e0b] mb-2 mx-auto" />
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
          Önce tehlikeyi kaynağında önle — KKD en son çaredir.
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
          BVA 1109 · 10. Hafta · İş Ortamı Güvenliği — I
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
