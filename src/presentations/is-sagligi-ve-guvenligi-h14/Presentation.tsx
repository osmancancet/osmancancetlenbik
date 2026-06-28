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
  Scale,
  FileText,
  ShieldCheck,
  ShieldAlert,
  ClipboardCheck,
  ClipboardList,
  Gavel,
  Users,
  UserCog,
  Building2,
  AlertTriangle,
  Check,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Calendar,
  Globe,
  GraduationCap,
  Target,
  Lightbulb,
  BookOpen,
  Stamp,
  Banknote,
  Search,
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

/* Resmî Gazete / yönetmelik belge görseli */
function GazetteDoc() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="isg-gazette mx-auto"
      style={{ maxWidth: 420 }}
    >
      <div className="isg-gazette-head px-5 py-3">
        <div className="text-[10px] uppercase tracking-[0.3em]">
          T.C. Resmî Gazete
        </div>
        <div className="text-[15px] font-bold mt-0.5">
          İş Sağlığı ve Güvenliği Kanunu
        </div>
        <div className="text-[10px] opacity-80 mt-0.5">
          Kanun No. 6331 · Yürürlük: 30.06.2012
        </div>
      </div>
      <div className="px-5 py-4 space-y-3 text-[11px] leading-relaxed text-gray-700">
        <div className="isg-gazette-madde rounded-r px-3 py-2">
          <span className="font-bold text-[#b91c1c]">MADDE 4 —</span>{" "}
          İşveren, çalışanların işle ilgili sağlık ve güvenliğini sağlamakla
          yükümlüdür; risklerden korunma ilkelerini uygular.
        </div>
        <div className="isg-gazette-madde rounded-r px-3 py-2">
          <span className="font-bold text-[#b91c1c]">MADDE 10 —</span>{" "}
          İşveren risk değerlendirmesi yapar veya yaptırır; sonuçlara göre
          alınacak önlemleri belirler.
        </div>
        <div className="isg-gazette-rule" />
        <div className="text-[10px] text-gray-500 italic">
          … ilgili yönetmelikler bu Kanuna dayanılarak çıkarılır.
        </div>
      </div>
      <div className="flex items-center justify-end px-5 pb-4">
        <div className="isg-seal w-14 h-14 flex flex-col items-center justify-center text-center leading-tight">
          <Stamp className="w-4 h-4" />
          <span className="text-[7px] font-bold mt-0.5">RESMÎ</span>
        </div>
      </div>
    </motion.div>
  );
}

/* Risk değerlendirme matrisi (5x5) */
function RiskMatrix() {
  // 1 düşük → 25 yüksek; renk eşiklerine göre band
  const band = (v: number) => {
    if (v >= 15) return { bg: "#dc2626", fg: "#fff" }; // yüksek
    if (v >= 8) return { bg: "#f59e0b", fg: "#1a1a1a" }; // orta
    return { bg: "#22c55e", fg: "#06210f" }; // düşük/kabul edilebilir
  };
  const probs = [1, 2, 3, 4, 5]; // olasılık (sütun)
  const sevs = [5, 4, 3, 2, 1]; // şiddet (satır, yukarıdan aşağı azalan)
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="isg-card rounded-2xl p-5"
    >
      <div className="text-[11px] font-mono uppercase tracking-wider text-[#fbbf24] mb-3 text-center">
        Risk = Olasılık &times; Şiddet (5&times;5)
      </div>
      <div className="flex items-stretch gap-2">
        <div className="flex items-center">
          <span className="text-[10px] text-gray-500 -rotate-90 whitespace-nowrap">
            Şiddet &rarr;
          </span>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-5 gap-1.5">
            {sevs.map((s) =>
              probs.map((p) => {
                const v = s * p;
                const c = band(v);
                return (
                  <div
                    key={`${s}-${p}`}
                    className="rounded-md flex items-center justify-center text-[12px] font-bold"
                    style={{
                      background: c.bg,
                      color: c.fg,
                      aspectRatio: "1.6 / 1",
                    }}
                  >
                    {v}
                  </div>
                );
              })
            )}
          </div>
          <div className="text-[10px] text-gray-500 mt-2 text-center">
            Olasılık &rarr;
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 mt-4 text-[10px]">
        <span className="flex items-center gap-1.5 text-gray-300">
          <span className="w-3 h-3 rounded" style={{ background: "#22c55e" }} />
          Kabul edilebilir (1&ndash;6)
        </span>
        <span className="flex items-center gap-1.5 text-gray-300">
          <span className="w-3 h-3 rounded" style={{ background: "#f59e0b" }} />
          Dikkat / önlem (8&ndash;12)
        </span>
        <span className="flex items-center gap-1.5 text-gray-300">
          <span className="w-3 h-3 rounded" style={{ background: "#dc2626" }} />
          Tolere edilemez (15&ndash;25)
        </span>
      </div>
    </motion.div>
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
        <Eyebrow>BVA 1109 · 14. Hafta · Mevzuat III</Eyebrow>
        <H1 className="isg-shimmer">
          İş Güvenliği
          <br />
          Mevzuatı &mdash; III
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Risk değerlendirmesinden denetime: 6331 sayılı Kanun&apos;un sahadaki
          uygulaması, taraf yükümlülükleri ve idari yaptırımlar.
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
              <ClipboardCheck className="w-5 h-5" style={{ color: "#fbbf24" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Risk Değerlendirmesi</div>
              <div className="text-[10px] text-gray-500">Madde 10 · 5 adım</div>
            </div>
          </div>
          <div className="isg-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(59,130,246,0.18)" }}
            >
              <Users className="w-5 h-5" style={{ color: "#60a5fa" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Taraf Yükümlülükleri</div>
              <div className="text-[10px] text-gray-500">İşveren &amp; çalışan</div>
            </div>
          </div>
          <div className="isg-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(220,38,38,0.18)" }}
            >
              <Gavel className="w-5 h-5" style={{ color: "#f87171" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Denetim &amp; Ceza</div>
              <div className="text-[10px] text-gray-500">İdari yaptırımlar</div>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 2 — Geçen haftadan köprü / bu haftanın hedefi
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 13. haftadan 14. haftaya</Eyebrow>
      <H2>Kuralı öğrendik; şimdi kuralın nasıl uygulandığına bakıyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        12. ve 13. haftalarda 6331 sayılı Kanun&apos;un yapısını ve temel
        kavramlarını gördük. Bu hafta mevzuatın sahaya inen üç yüzünü işliyoruz:
        risk değerlendirme süreci, tarafların somut yükümlülükleri ve uyulmazsa
        devreye giren denetim &amp; ceza mekanizması.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="isg-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-2 text-[#fbbf24]">
            <BookOpen className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Hafta 12&ndash;13</span>
          </div>
          <p className="text-sm text-gray-300">
            6331 sayılı Kanun&apos;un amacı, kapsamı, temel tanımlar ve İSG
            örgütlenmesi (iş güvenliği uzmanı, işyeri hekimi, kurul).
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="isg-card-amber rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-2 text-[#fbbf24]">
            <Target className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu hafta · 14</span>
          </div>
          <p className="text-sm text-gray-200">
            Mevzuatın uygulaması: risk değerlendirmesi, hak ve yükümlülükler,
            denetim ve idari para cezaları.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="isg-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-2 text-[#86efac]">
            <GraduationCap className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Hafta 15</span>
          </div>
          <p className="text-sm text-gray-300">
            Genel tekrar ve finale hazırlık: tüm dönemin İSG bilgisini vaka
            örnekleriyle pekiştirme.
          </p>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 3 — Mevzuat hiyerarşisi
  () => (
    <SlideShell>
      <Eyebrow>Mevzuat Hiyerarşisi</Eyebrow>
      <H2 className="mb-2">İSG kuralları nereden gelir?</H2>
      <Sub className="max-w-3xl mb-6">
        Bir yönetmelik tek başına havada durmaz; üstündeki kanundan, o da
        Anayasa&apos;dan güç alır. Aşağıdaki sıra, bir hükmün hangi belgeye
        dayandığını ve çelişki hâlinde hangisinin üstün olduğunu belirler.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-2.5">
          {[
            { l: "Anayasa", d: "Madde 17 · 56 — yaşama hakkı, sağlıklı çevre", c: "#dc2626" },
            { l: "Uluslararası Sözleşme", d: "ILO 155 & 161 sayılı sözleşmeler", c: "#a855f7" },
            { l: "Kanun", d: "6331 sayılı İSG Kanunu (2012)", c: "#f59e0b" },
            { l: "Yönetmelik", d: "Risk Değerlendirmesi, KKD, Sağlık Gözetimi…", c: "#3b82f6" },
            { l: "Tebliğ & Genelge", d: "Uygulama ayrıntıları, sınır değerler", c: "#22c55e" },
          ].map((row, i) => (
            <motion.div
              key={row.l}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="rounded-lg px-4 py-3 flex items-center justify-between"
              style={{
                background: `${row.c}10`,
                border: `1px solid ${row.c}40`,
                marginLeft: `${i * 18}px`,
              }}
            >
              <span className="text-white font-semibold text-sm">{row.l}</span>
              <span className="font-mono text-[11px] text-right" style={{ color: row.c }}>
                {row.d}
              </span>
            </motion.div>
          ))}
          <div className="text-[11px] text-gray-500 mt-2 pl-1">
            Üstteki belge alttakini bağlar; alt belge üst belgeye aykırı olamaz.
          </div>
        </div>
        <GazetteDoc />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  1. RİSK DEĞERLENDİRMESİ  ───────────────── */

  // 4 — Section: Risk değerlendirmesi
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Risk Değerlendirmesi"
      subtitle="6331 Madde 10 ve ilgili yönetmelik — mevzuatın işyerine somut yansıdığı ilk yükümlülük."
      bgGradient="linear-gradient(135deg, #f59e0b, #b45309)"
      shadow="0 20px 60px -10px rgba(245, 158, 11, 0.6)"
      icon={<ClipboardCheck className="w-16 h-16 text-white" />}
    />
  ),

  // 5 — Tehlike vs Risk + 5 adım
  () => (
    <SlideShell>
      <Eyebrow>Temel Ayrım</Eyebrow>
      <H2 className="mb-6">Tehlike ile risk aynı şey değildir</H2>
      <div className="grid md:grid-cols-2 gap-5 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="isg-card-amber rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-[#fbbf24]" />
            <span className="text-sm font-semibold text-white">Tehlike (Hazard)</span>
          </div>
          <p className="text-[13px] text-gray-300">
            Zarar verme potansiyeli olan kaynak. Örnek:{" "}
            <span className="text-[#fbbf24]">zeminde dökülen yağ</span>, çıplak
            elektrik kablosu, açık dönen makine mili.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="isg-card-red rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            <span className="text-sm font-semibold text-white">Risk</span>
          </div>
          <p className="text-[13px] text-gray-300">
            O tehlikenin zarara dönüşme{" "}
            <span className="text-red-300">olasılığı ve şiddeti</span>. Örnek:
            yağda kayıp düşme olasılığı ve oluşacak yaralanmanın ağırlığı.
          </p>
        </motion.div>
      </div>
      <div className="text-sm text-gray-400 mb-3 font-mono uppercase tracking-wider">
        Risk değerlendirmesinin 5 adımı
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { n: 1, t: "Tehlikeleri tanı", d: "İşyerini gez, kaynakları listele", icon: Search },
          { n: 2, t: "Riskleri belirle", d: "Kim, nasıl zarar görür?", icon: AlertTriangle },
          { n: 3, t: "Riskleri derecelendir", d: "Olasılık × şiddet matrisi", icon: ClipboardList },
          { n: 4, t: "Önlem al", d: "Korunma hiyerarşisini uygula", icon: ShieldCheck },
          { n: 5, t: "İzle & gözden geçir", d: "Belirli sürelerde yenile", icon: CheckCircle2 },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="isg-card rounded-xl p-3"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-full bg-[#f59e0b] text-black text-xs font-bold flex items-center justify-center shrink-0">
                  {s.n}
                </span>
                <Icon className="w-4 h-4 text-[#fbbf24]" />
              </div>
              <div className="text-[13px] font-semibold text-white">{s.t}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">{s.d}</div>
            </motion.div>
          );
        })}
      </div>
    </SlideShell>
  ),

  // 6 — Risk matrisi mockup
  () => (
    <SlideShell>
      <Eyebrow>Adım 3 · Derecelendirme</Eyebrow>
      <H2 className="mb-2">Risk skoru nasıl hesaplanır?</H2>
      <Sub className="max-w-3xl mb-6">
        Yaygın yöntemde her tehlike için olasılık (1&ndash;5) ile şiddet
        (1&ndash;5) çarpılır. Çıkan skor, riskin kabul edilebilir mi yoksa acil
        önlem mi gerektirdiğini gösterir.
      </Sub>
      <div className="grid md:grid-cols-[1fr_1fr] gap-8 items-center">
        <RiskMatrix />
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="isg-card rounded-xl p-4"
          >
            <div className="text-sm font-semibold text-white mb-1">
              Örnek: yüksekte çalışma
            </div>
            <div className="text-[12px] text-gray-300">
              Olasılık 3 (orta) &times; Şiddet 5 (ölümcül) ={" "}
              <span className="isg-token">15</span> &rarr; tolere edilemez,
              çalışma durdurulur, KKD ve platform zorunlu.
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55 }}
            className="isg-card rounded-xl p-4"
          >
            <div className="text-sm font-semibold text-white mb-1">
              Korunma hiyerarşisi (öncelik sırası)
            </div>
            <div className="text-[12px] text-gray-300 leading-relaxed">
              1) Tehlikeyi ortadan kaldır &middot; 2) İkame et &middot; 3)
              Mühendislik önlemi &middot; 4) İdari önlem &middot; 5) En son: KKD.
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="isg-card-amber rounded-xl p-4"
          >
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#fbbf24]" />
              <span className="text-[12px] text-gray-200">
                KKD her zaman <span className="text-[#fbbf24] font-semibold">son</span> çaredir
                &mdash; önce kaynağı kontrol et.
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </SlideShell>
  ),

  // 7 — Tehlike sınıfı & yenileme süreleri tablosu
  () => (
    <SlideShell>
      <Eyebrow>Tehlike Sınıfı · Süreler</Eyebrow>
      <H2 className="mb-2">İşyeri tehlike sınıfı her şeyi belirler</H2>
      <Sub className="max-w-3xl mb-5">
        İşyerleri faaliyetlerine göre az tehlikeli, tehlikeli ve çok tehlikeli
        olarak sınıflanır. Bu sınıf; risk değerlendirmesinin yenilenme süresini
        ve İSG profesyoneli görevlendirme yükümlülüğünü doğrudan etkiler.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="isg-card rounded-xl p-1"
      >
        <table className="isg-tbl">
          <thead>
            <tr>
              <th style={{ width: "26%" }}>Tehlike Sınıfı</th>
              <th style={{ width: "30%" }}>Örnek Sektör</th>
              <th style={{ width: "22%" }}>Risk Değ. Yenileme</th>
              <th>Not</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span className="isg-law-badge px-2 py-0.5 text-[11px]">Az tehlikeli</span>
              </td>
              <td>Büro, perakende, eğitim</td>
              <td>En geç <span className="text-[#fbbf24] font-mono">6 yılda bir</span></td>
              <td>Düşük riskli ofis ortamları</td>
            </tr>
            <tr>
              <td>
                <span className="isg-law-badge px-2 py-0.5 text-[11px]">Tehlikeli</span>
              </td>
              <td>Gıda üretimi, metal işleme</td>
              <td>En geç <span className="text-[#fbbf24] font-mono">4 yılda bir</span></td>
              <td>Makine ve kimyasal yoğun</td>
            </tr>
            <tr>
              <td>
                <span className="isg-law-badge px-2 py-0.5 text-[11px]">Çok tehlikeli</span>
              </td>
              <td>İnşaat, maden, kimya</td>
              <td>En geç <span className="text-[#fbbf24] font-mono">2 yılda bir</span></td>
              <td>En sıkı gözetim ve süreler</td>
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
        Ayrıca iş kazası, meslek hastalığı veya çalışma koşullarında esaslı
        değişiklik olduğunda risk değerlendirmesi süresinden önce yenilenir.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  2. HAK & YÜKÜMLÜLÜKLER  ───────────────── */

  // 8 — Section: Taraf yükümlülükleri
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Hak &amp; Yükümlülükler"
      subtitle="İşveren neyle yükümlü, çalışanın hangi hakları ve sorumlulukları var? Mevzuat karşılıklı bir denge kurar."
      bgGradient="linear-gradient(135deg, #3b82f6, #1e40af)"
      shadow="0 20px 60px -10px rgba(59, 130, 246, 0.6)"
      icon={<Users className="w-16 h-16 text-white" />}
    />
  ),

  // 9 — İşveren yükümlülükleri (kartlar)
  () => (
    <SlideShell>
      <Eyebrow>İşveren · Madde 4&ndash;16</Eyebrow>
      <H2 className="mb-10">İşverenin temel yükümlülükleri</H2>
      <div className="grid md:grid-cols-3 gap-4">
        <FeatureCard
          icon={ClipboardCheck}
          title="Risk değerlendirmesi"
          desc="Riskleri değerlendirip önlemleri belirlemek ve kayıt altına almak (Md. 10)."
          accent="#f59e0b"
          delay={0.1}
        />
        <FeatureCard
          icon={UserCog}
          title="İSG hizmeti sağlamak"
          desc="İş güvenliği uzmanı, işyeri hekimi ve gerekli durumda kurul oluşturmak."
          accent="#3b82f6"
          delay={0.2}
        />
        <FeatureCard
          icon={GraduationCap}
          title="Eğitim vermek"
          desc="Çalışanlara işe başlarken ve periyodik İSG eğitimi sağlamak (Md. 17)."
          accent="#a855f7"
          delay={0.3}
        />
        <FeatureCard
          icon={ShieldAlert}
          title="Acil durum planı"
          desc="Yangın, tahliye, ilk yardım planları; tatbikat yapmak (Md. 11&ndash;12)."
          accent="#dc2626"
          delay={0.4}
        />
        <FeatureCard
          icon={CheckCircle2}
          title="Sağlık gözetimi"
          desc="İşe giriş ve periyodik sağlık muayenelerini yaptırmak (Md. 15)."
          accent="#22c55e"
          delay={0.5}
        />
        <FeatureCard
          icon={ClipboardList}
          title="Kayıt &amp; bildirim"
          desc="İş kazası ve meslek hastalıklarını SGK'ya süresinde bildirmek (Md. 14)."
          accent="#06b6d4"
          delay={0.6}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 isg-card-amber rounded-xl p-4 text-center"
      >
        <div className="text-sm text-gray-300">
          İlke: işveren İSG önlemlerinin maliyetini{" "}
          <span className="text-[#fbbf24] font-semibold">çalışana yansıtamaz</span>{" "}
          (Md. 4/3). KKD, eğitim ve sağlık gözetimi işveren tarafından ücretsiz sağlanır.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 10 — Çalışan hak & yükümlülükleri (iki sütun do/dont benzeri)
  () => (
    <SlideShell>
      <Eyebrow>Çalışan · Madde 18&ndash;19</Eyebrow>
      <H2 className="mb-8">Çalışanın hakları ve yükümlülükleri</H2>
      <div className="grid md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="isg-do p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-6 h-6 text-green-400" />
            <span className="text-lg font-bold text-white">Hakları</span>
          </div>
          <ul className="space-y-2.5 text-[13px]">
            {[
              "İSG eğitimi alma hakkı (ücretsiz, mesai içinde)",
              "Ciddi ve yakın tehlikede çalışmaktan kaçınma (Md. 13)",
              "Tehlike giderilmezse çalışmaktan kaçınıp ücretini alma",
              "İSG kurulu / temsilcisine başvurma",
              "Eksiklikleri Bakanlığa şikâyet etme — bundan dolayı işten çıkarılamama",
              "Periyodik sağlık muayenesi olma",
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
          className="isg-card rounded-lg p-5"
          style={{ border: "1px solid rgba(59,130,246,0.25)", background: "rgba(59,130,246,0.05)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <ClipboardCheck className="w-6 h-6 text-[#60a5fa]" />
            <span className="text-lg font-bold text-white">Yükümlülükleri</span>
          </div>
          <ul className="space-y-2.5 text-[13px]">
            {[
              "Kendi ve etkilediği kişilerin sağlığını gözetmek",
              "Makine, araç ve KKD'yi kurallara uygun kullanmak",
              "Koruyucu donanımı keyfî olarak çıkarmamak / bozmamak",
              "Tehlike ve eksiklikleri amirine / İSG personeline bildirmek",
              "Eğitim ve talimatlara uymak",
              "Sağlık muayenelerine katılmak",
            ].map((d) => (
              <li key={d} className="flex items-start gap-2 text-blue-100">
                <ChevronRight className="w-3.5 h-3.5 text-[#60a5fa] mt-1 shrink-0" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 11 — Çalışmaktan kaçınma hakkı (vurgu slaytı)
  () => (
    <SlideShell>
      <Eyebrow>Önemli Hak · Madde 13</Eyebrow>
      <H2 className="mb-2">Çalışmaktan kaçınma hakkı</H2>
      <Sub className="max-w-3xl mb-8">
        Çalışan, ciddi ve yakın bir tehlikeyle karşılaşırsa kuralları izleyerek
        işi durdurabilir. Bu, &quot;işi bırakma&quot; değil, mevzuatın tanıdığı
        bir korunma yoludur.
      </Sub>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            n: 1,
            t: "Kurula / işverene başvur",
            d: "Durumu İSG kuruluna veya işverene ilet, tehlikenin giderilmesini iste.",
            icon: ClipboardList,
          },
          {
            n: 2,
            t: "Karar verilir",
            d: "Talep değerlendirilir; gerekli tedbir alınana kadar çalışmaktan kaçınılabilir.",
            icon: ShieldCheck,
          },
          {
            n: 3,
            t: "Ücret korunur",
            d: "Bu süreçte çalışanın ücreti ve diğer hakları saklı kalır.",
            icon: Banknote,
          },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.12 }}
              className="isg-card rounded-xl p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-full bg-[#f59e0b] text-black font-bold flex items-center justify-center">
                  {s.n}
                </span>
                <Icon className="w-5 h-5 text-[#fbbf24]" />
              </div>
              <div className="text-base font-semibold text-white mb-1">{s.t}</div>
              <div className="text-[12px] text-gray-400">{s.d}</div>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 isg-card-red rounded-xl p-4 text-center"
      >
        <div className="text-sm text-gray-200">
          Hayati ve kaçınılmaz tehlikede çalışan, işyerini{" "}
          <span className="text-red-300 font-semibold">terk edebilir</span>; bu
          nedenle hakları kısıtlanamaz.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  3. DENETİM & YAPTIRIM  ───────────────── */

  // 12 — Section: Denetim & idari yaptırım
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Denetim &amp; Yaptırım"
      subtitle="Mevzuata uyulmadığında ne olur? Müfettiş denetimi, durdurma ve idari para cezaları."
      bgGradient="linear-gradient(135deg, #dc2626, #7f1d1d)"
      shadow="0 20px 60px -10px rgba(220, 38, 38, 0.6)"
      icon={<Gavel className="w-16 h-16 text-white" />}
    />
  ),

  // 13 — Denetim süreci + işin durdurulması
  () => (
    <SlideShell>
      <Eyebrow>Denetim · Madde 24&ndash;25</Eyebrow>
      <H2 className="mb-2">Müfettiş kapıyı çaldığında</H2>
      <Sub className="max-w-3xl mb-6">
        İSG denetimi, Çalışma ve Sosyal Güvenlik Bakanlığı iş müfettişlerince
        yapılır. Hayati tehlike tespit edilirse iş tamamen veya kısmen
        durdurulabilir.
      </Sub>
      <div className="grid md:grid-cols-4 gap-3">
        {[
          {
            n: 1,
            t: "Denetim",
            d: "Müfettiş işyerini inceler, belge ve kayıtları kontrol eder.",
            icon: Search,
            c: "#3b82f6",
          },
          {
            n: 2,
            t: "Tespit & rapor",
            d: "Eksiklikler tutanağa geçer; süre verilebilir.",
            icon: FileText,
            c: "#f59e0b",
          },
          {
            n: 3,
            t: "İşin durdurulması",
            d: "Hayati tehlikede iş kısmen/tamamen durdurulur (Md. 25).",
            icon: ShieldAlert,
            c: "#dc2626",
          },
          {
            n: 4,
            t: "İdari para cezası",
            d: "Aykırılık başına ceza uygulanır (Md. 26).",
            icon: Gavel,
            c: "#a855f7",
          },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="isg-card rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-7 h-7 rounded-full text-black text-xs font-bold flex items-center justify-center"
                  style={{ background: s.c }}
                >
                  {s.n}
                </span>
                <Icon className="w-4 h-4" style={{ color: s.c }} />
              </div>
              <div className="text-sm font-semibold text-white mb-1">{s.t}</div>
              <div className="text-[11px] text-gray-400">{s.d}</div>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 isg-card rounded-xl p-4 flex items-start gap-3"
      >
        <Building2 className="w-5 h-5 text-[#fbbf24] mt-0.5 shrink-0" />
        <div className="text-[13px] text-gray-300">
          İşin durdurulması kararına karşı işveren{" "}
          <span className="text-white">altı iş günü içinde</span> yetkili idare
          mahkemesine itiraz edebilir; eksiklik giderilince durdurma kaldırılır.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 14 — İdari para cezaları tablosu
  () => (
    <SlideShell>
      <Eyebrow>İdari Para Cezaları · Madde 26</Eyebrow>
      <H2 className="mb-2">Uymamanın bedeli</H2>
      <Sub className="max-w-3xl mb-5">
        Her yükümlülük ihlali için ayrı idari para cezası öngörülür ve bazı
        ihlallerde ceza her ay / her çalışan başına tekrarlanır. Tutarlar her
        yıl yeniden değerleme oranıyla güncellenir.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="isg-card rounded-xl p-1"
      >
        <table className="isg-tbl">
          <thead>
            <tr>
              <th style={{ width: "40%" }}>İhlal</th>
              <th style={{ width: "20%" }}>Dayanak</th>
              <th>Yaptırımın niteliği</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Risk değerlendirmesi yapmamak</td>
              <td><span className="isg-law-badge px-2 py-0.5 text-[11px]">Md. 10</span></td>
              <td>İdari para cezası &middot; sürerse <span className="isg-fine">aylık katlanır</span></td>
            </tr>
            <tr>
              <td>İSG uzmanı / işyeri hekimi görevlendirmemek</td>
              <td><span className="isg-law-badge px-2 py-0.5 text-[11px]">Md. 6</span></td>
              <td>Her kişi ve <span className="isg-fine">her ay</span> için ayrı ceza</td>
            </tr>
            <tr>
              <td>Çalışana İSG eğitimi vermemek</td>
              <td><span className="isg-law-badge px-2 py-0.5 text-[11px]">Md. 17</span></td>
              <td><span className="isg-fine">Her çalışan başına</span> ceza</td>
            </tr>
            <tr>
              <td>İş kazası / meslek hastalığını bildirmemek</td>
              <td><span className="isg-law-badge px-2 py-0.5 text-[11px]">Md. 14</span></td>
              <td>İdari para cezası</td>
            </tr>
            <tr>
              <td>Durdurulan işte çalışmaya devam etmek</td>
              <td><span className="isg-law-badge px-2 py-0.5 text-[11px]">Md. 25</span></td>
              <td>Ağır para cezası &middot; sorumluluk artar</td>
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
        Not: Güncel tutarlar için her yıl yayımlanan İSG idari para cezaları
        tablosuna bakılmalıdır; rakamlar yeniden değerlemeyle değişir.
      </motion.div>
    </SlideShell>
  ),

  // 15 — Uygulamalı / alıştırma slaytı
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulama</Eyebrow>
      <H2>Mini risk değerlendirmesi yap</H2>
      <Sub className="mt-3 max-w-3xl">
        Bir işyeri seç (kendi bölümün, atölye, kafe) ve aşağıdaki dört adımı
        tamamlayıp tek sayfalık bir risk değerlendirme taslağı getir.
      </Sub>
      <div className="grid md:grid-cols-2 gap-3 mt-8">
        {[
          {
            t: "3 tehlike belirle",
            d: "Seçtiğin işyerinde gözlemlediğin en az 3 tehlike kaynağını yaz (örn. ıslak zemin, kablo, gürültü).",
          },
          {
            t: "Riskleri puanla",
            d: "Her tehlike için olasılık (1–5) × şiddet (1–5) skorunu hesapla; bandını (yeşil/sarı/kırmızı) belirt.",
          },
          {
            t: "Önlem öner",
            d: "Korunma hiyerarşisine göre önlem yaz; KKD'yi yalnızca son çare olarak ekle.",
          },
          {
            t: "Mevzuata bağla",
            d: "Önerdiğin önlemi 6331'in hangi maddesiyle ilişkilendirdiğini bir cümleyle açıkla.",
          },
        ].map((c, i) => (
          <motion.div
            key={c.t}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="isg-check-row"
          >
            <div className="w-7 h-7 rounded-full border border-gray-600 flex items-center justify-center text-[11px] text-gray-400 font-mono shrink-0">
              {i + 1}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-white">{c.t}</div>
              <div className="text-[11px] text-gray-400 mt-0.5">{c.d}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-5 isg-card-amber rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <Scale className="w-4 h-4 text-[#fbbf24] mt-0.5 shrink-0" />
        <span>
          Amaç ceza ezberlemek değil; tehlikeyi görüp{" "}
          <span className="text-white">önlem &ndash; mevzuat</span> bağını kurabilmek.
          15. haftada bu taslakları finalde tartışacağız.
        </span>
      </motion.div>
    </SlideShell>
  ),

  // 16 — Sıradaki hafta önizleme + kapanış
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
          <ShieldCheck className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>14. Hafta tamamlandı · sıradaki: Genel tekrar &amp; final</Eyebrow>
        <H1 className="isg-shimmer">Mevzuattan Pratiğe</H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Risk değerlendirmesi, taraf yükümlülükleri ve denetim&ndash;ceza
          zincirini gördük. Hafta 15&apos;te tüm dönemi vaka örnekleriyle
          birleştirip finale hazırlanıyoruz.
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 grid md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          <div className="isg-card rounded-xl p-4">
            <ClipboardCheck className="w-5 h-5 text-[#f59e0b] mb-2 mx-auto" />
            <div className="text-xs text-gray-400">Ezberleme</div>
            <div className="text-sm font-semibold text-white mt-1">
              Risk = Olasılık × Şiddet
            </div>
          </div>
          <div className="isg-card rounded-xl p-4">
            <Scale className="w-5 h-5 text-[#f59e0b] mb-2 mx-auto" />
            <div className="text-xs text-gray-400">Hatırla</div>
            <div className="text-sm font-semibold text-white mt-1">
              6331 sayılı İSG Kanunu
            </div>
          </div>
          <div className="isg-card rounded-xl p-4">
            <Globe className="w-5 h-5 text-[#f59e0b] mb-2 mx-auto" />
            <div className="text-xs text-gray-400">Kaynak</div>
            <div className="text-sm font-semibold text-white mt-1">
              mevzuat.gov.tr
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 grid md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          <div className="isg-card rounded-xl p-4">
            <Calendar className="w-5 h-5 text-[#f59e0b] mb-2 mx-auto" />
            <div className="text-xs text-gray-400">Ders günü</div>
            <div className="text-sm font-semibold text-white mt-1">
              Perşembe · 13:30 — 15:10
            </div>
          </div>
          <div className="isg-card rounded-xl p-4">
            <XCircle className="w-5 h-5 text-[#f59e0b] mb-2 mx-auto" />
            <div className="text-xs text-gray-400">Getir</div>
            <div className="text-sm font-semibold text-white mt-1">
              Mini risk taslağı
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
          transition={{ delay: 0.95 }}
          className="mt-8 text-[11px] text-gray-600 font-mono"
        >
          Mevzuat bir formalite değil; önce çalışanın canını korur.
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
          BVA 1109 · 14. Hafta · İş Güvenliği Mevzuatı III
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
