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
  BookOpen,
  Gavel,
  FileText,
  ShieldAlert,
  Building2,
  HardHat,
  Users,
  ClipboardCheck,
  ClipboardList,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Check,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Calendar,
  Globe,
  Landmark,
  Layers,
  Stamp,
  Target,
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

/* Resmî Gazete tarzı kanun belgesi mockup */
function LawDocument() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="isg-doc mx-auto px-8 py-7"
      style={{ maxWidth: 560 }}
    >
      <div className="isg-doc-header flex items-center gap-4">
        <div className="isg-doc-seal text-lg">TC</div>
        <div className="flex-1">
          <div className="text-[10px] uppercase tracking-[0.2em] text-[#92400e]">
            T.C. Resmî Gazete
          </div>
          <div className="text-lg font-bold text-[#7c2d12] leading-tight">
            İş Sağlığı ve Güvenliği Kanunu
          </div>
          <div className="text-[11px] text-[#6b7280]">
            Kanun No. 6331 &middot; Kabul: 20/6/2012 &middot; Sayı: 28339
          </div>
        </div>
      </div>

      <div className="text-[11px] text-[#374151] leading-relaxed">
        <div className="font-bold text-[#7c2d12] mb-1">
          BİRİNCİ BÖLÜM &mdash; Amaç, Kapsam ve Tanımlar
        </div>
        <div className="isg-doc-article">
          <span className="font-bold">MADDE 1 &mdash; (1)</span> Bu Kanunun amacı;
          işyerlerinde iş sağlığı ve güvenliğinin sağlanması ve mevcut sağlık ve
          güvenlik şartlarının iyileştirilmesi için işveren ve çalışanların görev,
          yetki, sorumluluk, hak ve yükümlülüklerini düzenlemektir.
        </div>
        <div className="isg-doc-article">
          <span className="font-bold">MADDE 2 &mdash; (1)</span> Bu Kanun; kamu ve
          özel sektöre ait bütün işlere ve işyerlerine, bu işyerlerinin işverenleri
          ile işveren vekillerine, çırak ve stajyerler de dâhil tüm çalışanlarına
          faaliyet konularına bakılmaksızın uygulanır.
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-[10px] text-[#92400e]">
        <span className="font-mono">mevzuat.gov.tr</span>
        <span>Yürürlük: aşamalı (2012&ndash;2016)</span>
      </div>
    </motion.div>
  );
}

/* Mevzuat hiyerarşisi — piramit */
function MevzuatHierarchy() {
  const levels: Array<{
    label: string;
    sub: string;
    color: string;
    width: string;
  }> = [
    {
      label: "Anayasa (md. 17, 50, 56)",
      sub: "Yaşama hakkı, çalışma şartları, sağlıklı çevre",
      color: "#dc2626",
      width: "55%",
    },
    {
      label: "Uluslararası Sözleşmeler (ILO)",
      sub: "Onaylanan sözleşmeler kanun hükmündedir",
      color: "#a855f7",
      width: "68%",
    },
    {
      label: "6331 sayılı İSG Kanunu",
      sub: "İSG&apos;nin temel çerçeve kanunu",
      color: "#f59e0b",
      width: "82%",
    },
    {
      label: "Yönetmelikler &amp; Tebliğler",
      sub: "Risk değerlendirmesi, KKD, sağlık gözetimi…",
      color: "#22c55e",
      width: "100%",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-2"
    >
      {levels.map((l, i) => (
        <div key={l.label} className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.15 }}
            className="isg-hier"
            style={{
              width: l.width,
              background: `${l.color}12`,
              borderColor: `${l.color}55`,
            }}
          >
            <div
              className="text-sm font-semibold"
              style={{ color: l.color }}
              dangerouslySetInnerHTML={{ __html: l.label }}
            />
            <div
              className="text-[11px] text-gray-400 font-normal mt-0.5"
              dangerouslySetInnerHTML={{ __html: l.sub }}
            />
          </motion.div>
          {i < levels.length - 1 && (
            <div className="isg-hier-line" style={{ height: 12 }} />
          )}
        </div>
      ))}
      <div className="text-center text-[11px] text-gray-500 mt-3 font-mono">
        Üstteki norm alttakini bağlar &middot; yönetmelik kanuna aykırı olamaz
      </div>
    </motion.div>
  );
}

/* Sorumluluk kartı — işveren / çalışan */
function DutyColumn({
  icon: Icon,
  title,
  subtitle,
  duties,
  accent,
  delay = 0,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  duties: string[];
  accent: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="isg-card rounded-2xl p-6 flex flex-col"
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${accent}18`, border: `1px solid ${accent}55` }}
        >
          <Icon className="w-6 h-6" style={{ color: accent }} />
        </div>
        <div>
          <div className="text-lg font-bold text-white">{title}</div>
          <div className="text-[11px] text-gray-400">{subtitle}</div>
        </div>
      </div>
      <ul className="space-y-2">
        {duties.map((d) => (
          <li key={d} className="flex items-start gap-2 text-[12.5px] text-gray-300">
            <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: accent }} />
            <span>{d}</span>
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

  // 1 — Kapak
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 1109 &middot; 12. Hafta &middot; İş Güvenliği Mevzuatı</Eyebrow>
        <H1 className="isg-shimmer">
          İş Güvenliği
          <br />
          Mevzuatı &mdash; I
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          6331 sayılı İSG Kanunu: amaç, kapsam ve tarafların yükümlülükleri
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
              <Scale className="w-5 h-5" style={{ color: "#fbbf24" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">6331 Sayılı Kanun</div>
              <div className="text-[10px] text-gray-500">İSG&apos;nin çerçeve kanunu</div>
            </div>
          </div>
          <div className="isg-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(59,130,246,0.18)" }}
            >
              <Building2 className="w-5 h-5" style={{ color: "#60a5fa" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">İşveren Yükümlülüğü</div>
              <div className="text-[10px] text-gray-500">Madde 4 &middot; genel sorumluluk</div>
            </div>
          </div>
          <div className="isg-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(34,197,94,0.18)" }}
            >
              <HardHat className="w-5 h-5" style={{ color: "#4ade80" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Çalışan Hakkı</div>
              <div className="text-[10px] text-gray-500">Çalışmaktan kaçınma hakkı</div>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 2 — Geçen haftadan köprü + bu haftanın hedefi
  () => (
    <SlideShell>
      <Eyebrow>Köprü &middot; uygulamadan kurala</Eyebrow>
      <H2>Önce riski tanıdık; şimdi onu kimin, neye göre yöneteceğini öğreniyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Önceki haftalarda tehlike, risk ve korunma yollarını gördük. Bunların bir
        &quot;iyi niyet&quot; değil, yasal bir zorunluluk olduğunu belirleyen şey
        mevzuattır. Bu hafta İSG&apos;nin temel kanununu &mdash; 6331 &mdash; ve
        tarafların yükümlülüklerini ele alıyoruz.
      </Sub>
      <div className="grid md:grid-cols-3 gap-4 mt-10">
        <FeatureCard
          icon={BookOpen}
          title="Kanunun çerçevesi"
          desc="6331 neyi, kimi kapsar? Amaç ve temel tanımlar (Madde 1-3)."
          accent="#f59e0b"
          delay={0.1}
        />
        <FeatureCard
          icon={Users}
          title="Tarafların görevi"
          desc="İşverenin yükümlülükleri ve çalışanın hak ve sorumlulukları."
          accent="#3b82f6"
          delay={0.2}
        />
        <FeatureCard
          icon={Gavel}
          title="Yaptırım ve denetim"
          desc="Kurallara uyulmazsa ne olur? İdari para cezası ve durdurma."
          accent="#dc2626"
          delay={0.3}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 isg-card-amber rounded-xl p-4 text-center"
      >
        <div className="text-sm text-gray-300">
          Hedef: ders sonunda bir işyerinde &quot;kim, neyi, hangi maddeye göre
          yapmak zorunda?&quot; sorusuna kaynak göstererek cevap verebilmek.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 3 — Mevzuat neden var? / temel kavramlar
  () => (
    <SlideShell>
      <Eyebrow>Neden Mevzuat?</Eyebrow>
      <H2 className="mb-8">Mevzuat: ortak ve bağlayıcı asgari kural</H2>
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="isg-card-amber rounded-xl p-5"
        >
          <div className="text-base text-gray-200 leading-relaxed">
            İş güvenliği mevzuatı; can ve sağlığı korumak için işyerinde
            uyulması <span className="text-[#fbbf24] font-semibold">zorunlu</span>{" "}
            asgari kuralları belirleyen hukuk normlarının bütünüdür. Tarafların
            keyfine bırakılmaz; herkes için bağlayıcıdır.
          </div>
          <div className="text-[10px] text-gray-500 mt-3 font-mono">
            Kaynak: 6331 sayılı Kanun, Madde 1 (Amaç)
          </div>
        </motion.div>
        <div className="space-y-3">
          {[
            {
              icon: Target,
              t: "Önleyici yaklaşım",
              d: "Kaza olduktan sonra değil, oluşmadan önce tedbir alma esası.",
            },
            {
              icon: Scale,
              t: "Eşitlik",
              d: "Kamu-özel, küçük-büyük ayrımı yok; aynı asgari koruma herkese.",
            },
            {
              icon: ClipboardCheck,
              t: "İspat ve kayıt",
              d: "Eğitim, risk değerlendirmesi ve kaza bildirimi belgeyle yürür.",
            },
          ].map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.t}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.12 }}
                className="isg-card rounded-xl p-4 flex items-start gap-3"
              >
                <Icon className="w-5 h-5 text-[#f59e0b] mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-white">{c.t}</div>
                  <div className="text-[12px] text-gray-400 mt-0.5">{c.d}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  1. KANUN VE HİYERARŞİ  ───────────────── */

  // 4 — Bölüm 1
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="6331 ve Mevzuat Hiyerarşisi"
      subtitle="İSG kuralları nereden gelir, hangi norm hangisini bağlar?"
      bgGradient="linear-gradient(135deg, #f59e0b, #b45309)"
      shadow="0 20px 60px -10px rgba(245, 158, 11, 0.6)"
      icon={<Landmark className="w-16 h-16 text-white" />}
    />
  ),

  // 5 — Kanun belgesi mockup
  () => (
    <SlideShell>
      <Eyebrow>Temel Kaynak</Eyebrow>
      <H2 className="mb-6">6331 sayılı İş Sağlığı ve Güvenliği Kanunu</H2>
      <div className="grid md:grid-cols-[1fr_320px] gap-8 items-center">
        <LawDocument />
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="isg-card rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-[#f59e0b]" />
              <span className="text-sm font-semibold text-white">Neyi getirdi?</span>
            </div>
            <ul className="text-[12px] text-gray-300 space-y-1.5">
              <li>&middot; İlk kez tüm işyerlerini tek çatıda topladı</li>
              <li>&middot; Risk değerlendirmesini zorunlu kıldı</li>
              <li>&middot; İSG uzmanı / işyeri hekimi görevlendirmesi</li>
              <li>&middot; Önleyici (proaktif) yaklaşımı esas aldı</li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.65 }}
            className="isg-card-amber rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-[#fbbf24]" />
              <span className="text-sm font-semibold text-white">Kaynağı</span>
            </div>
            <div className="text-[12px] text-gray-300">
              Büyük ölçüde AB&apos;nin <span className="text-[#fbbf24]">89/391/EEC</span>{" "}
              çerçeve direktifi ve ILO sözleşmeleriyle uyumlu hazırlandı.
            </div>
          </motion.div>
        </div>
      </div>
    </SlideShell>
  ),

  // 6 — Mevzuat hiyerarşisi
  () => (
    <SlideShell>
      <Eyebrow>Normlar Hiyerarşisi</Eyebrow>
      <H2 className="mb-2">Kural nereden gelir?</H2>
      <Sub className="max-w-3xl mb-6">
        İSG kuralları tek bir kanundan ibaret değildir. Anayasadan yönetmeliğe doğru
        bir hiyerarşi vardır; alttaki üsttekine aykırı olamaz. 6331 bu zincirin
        merkezindeki <span className="text-[#fbbf24]">çerçeve kanundur</span>.
      </Sub>
      <MevzuatHierarchy />
    </SlideShell>
  ),

  // 7 — Temel tanımlar tablosu
  () => (
    <SlideShell>
      <Eyebrow>Madde 3 &middot; Tanımlar</Eyebrow>
      <H2>Önce dili öğren: temel kavramlar</H2>
      <Sub className="mt-3 max-w-3xl">
        Kanunun doğru uygulanması, terimlerin doğru anlaşılmasına bağlıdır.
        Karıştırılan dört temel kavram:
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
              <th style={{ width: "22%" }}>Kavram</th>
              <th style={{ width: "44%" }}>Tanım</th>
              <th>Örnek</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span className="font-semibold text-white">Tehlike</span>
              </td>
              <td>Zarar verme potansiyeli taşıyan kaynak, durum ya da işlem.</td>
              <td>Zeminde dökülmüş yağ; yüksekte korkuluksuz kenar.</td>
            </tr>
            <tr>
              <td>
                <span className="font-semibold text-white">Risk</span>
              </td>
              <td>
                Tehlikeden kaynaklanan zararın gerçekleşme{" "}
                <span className="text-[#fbbf24]">olasılığı</span> ile{" "}
                <span className="text-[#fbbf24]">şiddetinin</span> bileşimi.
              </td>
              <td>Yağa basıp düşme &middot; ağır yaralanma ihtimali.</td>
            </tr>
            <tr>
              <td>
                <span className="font-semibold text-white">Ramak kala</span>
              </td>
              <td>Zarara yol açabilecekken sonuçsuz atlatılan olay (near-miss).</td>
              <td>Düşen malzemenin kimseye isabet etmemesi.</td>
            </tr>
            <tr>
              <td>
                <span className="font-semibold text-white">İş kazası</span>
              </td>
              <td>
                İşin yürütümü sırasında meydana gelen, bedence/ruhça zarar veren olay.
              </td>
              <td>İş yerinde devrilen rafın işçiyi yaralaması.</td>
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
        Not: &quot;Tehlike&quot; kaynaktır, &quot;risk&quot; o kaynağın
        gerçekleşme ihtimalidir &mdash; sınavda en sık karıştırılan ayrım.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  2. TARAFLARIN YÜKÜMLÜLÜKLERİ  ───────────────── */

  // 8 — Bölüm 2
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Tarafların Yükümlülükleri"
      subtitle="İşveren ne yapmak zorunda, çalışanın hak ve görevleri neler?"
      bgGradient="linear-gradient(135deg, #3b82f6, #1d4ed8)"
      shadow="0 20px 60px -10px rgba(59, 130, 246, 0.6)"
      icon={<Users className="w-16 h-16 text-white" />}
    />
  ),

  // 9 — İşveren vs Çalışan iki sütun
  () => (
    <SlideShell>
      <Eyebrow>Madde 4 &amp; 19</Eyebrow>
      <H2 className="mb-8">İşveren yükümlülüğü &middot; Çalışan sorumluluğu</H2>
      <div className="grid md:grid-cols-2 gap-5">
        <DutyColumn
          icon={Building2}
          title="İşveren (Madde 4)"
          subtitle="Genel yükümlülük &mdash; sorumluluğun ağırlığı işverendedir"
          accent="#3b82f6"
          delay={0.15}
          duties={[
            "Mesleki riskleri önlemek, tedbir almak",
            "Risk değerlendirmesi yaptırmak",
            "İSG uzmanı / işyeri hekimi görevlendirmek",
            "Çalışanlara İSG eğitimi sağlamak",
            "KKD&apos;yi ücretsiz temin etmek",
            "Tedbir maliyetini çalışana yansıtmamak",
          ]}
        />
        <DutyColumn
          icon={HardHat}
          title="Çalışan (Madde 19)"
          subtitle="Kendi ve etkilediği kişilerin güvenliğine özen"
          accent="#22c55e"
          delay={0.3}
          duties={[
            "Verilen eğitime ve talimatlara uymak",
            "KKD&apos;yi kurallara uygun kullanmak",
            "Makine/ekipmanı doğru ve güvenli kullanmak",
            "Tehlikeyi ve eksikliği amirine bildirmek",
            "Koruyucu donanımı devre dışı bırakmamak",
            "İşbirliği yapmak, denetimlere katkı vermek",
          ]}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 isg-card-amber rounded-xl p-4 text-center"
      >
        <div className="text-sm text-gray-300">
          Önemli: Çalışanın yükümlülüğünü yerine getirmemesi, işverenin
          sorumluluğunu <span className="text-[#fbbf24] font-semibold">ortadan kaldırmaz</span>.
          Asıl yük işverendedir.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 10 — Çalışanın hakları
  () => (
    <SlideShell>
      <Eyebrow>Madde 13 &middot; Çalışanın Hakkı</Eyebrow>
      <H2 className="mb-2">Çalışmaktan kaçınma hakkı</H2>
      <Sub className="max-w-3xl mb-8">
        Ciddi ve yakın bir tehlike varsa çalışan, gerekli tedbir alınana kadar
        çalışmaktan kaçınabilir &mdash; bu yasal bir haktır, gerekçesiz işten çıkarma
        nedeni olamaz.
      </Sub>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            n: "1",
            icon: AlertTriangle,
            t: "Tehlikeyi bildir",
            d: "Çalışan, ciddi ve yakın tehlikeyi işverene/kurula iletir; talep eder.",
            c: "#f59e0b",
          },
          {
            n: "2",
            icon: ClipboardList,
            t: "Kurul karar verir",
            d: "İSG kurulu / işveren talebi değerlendirir ve yazılı karar verir.",
            c: "#3b82f6",
          },
          {
            n: "3",
            icon: ShieldAlert,
            t: "Tedbir alınana dek dur",
            d: "Gereken yapılmazsa çalışan, kaçınma hakkını kullanır; ücreti işler.",
            c: "#dc2626",
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
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ background: `${s.c}22`, color: s.c, border: `1px solid ${s.c}55` }}
                >
                  {s.n}
                </div>
                <Icon className="w-5 h-5" style={{ color: s.c }} />
              </div>
              <div className="text-base font-semibold text-white mb-1">{s.t}</div>
              <div className="text-[12px] text-gray-400 leading-relaxed">{s.d}</div>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 isg-card-green rounded-xl p-4 text-center"
      >
        <div className="text-sm text-green-100">
          Kaçınma süresince <span className="font-semibold">ücret ve hakları korunur</span>.
          Bu hak, &quot;işi yavaşlatma&quot; değil; can güvenliğini esas alan yasal bir
          güvencedir.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 11 — Risk değerlendirmesi yükümlülüğü
  () => (
    <SlideShell>
      <Eyebrow>Madde 10 &middot; Zorunluluk</Eyebrow>
      <H2 className="mb-2">Risk değerlendirmesi: kâğıt değil, yöntem</H2>
      <Sub className="max-w-3xl mb-6">
        6331 her işyerine, tehlike sınıfından bağımsız olarak risk değerlendirmesi
        yapma/yaptırma yükümlülüğü getirir. Beş adımlı bir döngüdür.
      </Sub>
      <div className="grid md:grid-cols-5 gap-3">
        {[
          { n: "1", t: "Tehlikeleri belirle", d: "Ortam, ekipman, çalışma yöntemi" },
          { n: "2", t: "Riskleri analiz et", d: "Olasılık × şiddet" },
          { n: "3", t: "Önlem kararla", d: "Kaynakta önle, KKD en son" },
          { n: "4", t: "Uygula & kaydet", d: "Belgele, sorumlu ata" },
          { n: "5", t: "İzle & güncelle", d: "Değişimde yenile" },
        ].map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="isg-card rounded-xl p-4 text-center"
          >
            <div className="w-9 h-9 rounded-full bg-[#f59e0b] text-black text-sm font-bold flex items-center justify-center mx-auto mb-3">
              {s.n}
            </div>
            <div className="text-[13px] font-semibold text-white mb-1">{s.t}</div>
            <div className="text-[11px] text-gray-400">{s.d}</div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 isg-card-amber rounded-xl p-4"
      >
        <div className="text-sm text-gray-300 flex items-start gap-3">
          <Layers className="w-5 h-5 text-[#fbbf24] mt-0.5 shrink-0" />
          <span>
            Önlem sırası <span className="text-[#fbbf24] font-semibold">hiyerarşiktir</span>:
            önce tehlikeyi kaynağında yok et, olmuyorsa toplu koruma uygula, kişisel
            koruyucu donanım (KKD) <span className="text-[#fbbf24]">en son</span> çaredir.
          </span>
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  3. YAPTIRIM VE DENETİM  ───────────────── */

  // 12 — Bölüm 3
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Yaptırım ve Denetim"
      subtitle="Kurala uyulmazsa ne olur? İdari ceza, durdurma ve sorumluluk"
      bgGradient="linear-gradient(135deg, #dc2626, #7f1d1d)"
      shadow="0 20px 60px -10px rgba(220, 38, 38, 0.6)"
      icon={<Gavel className="w-16 h-16 text-white" />}
    />
  ),

  // 13 — Yaptırım türleri
  () => (
    <SlideShell>
      <Eyebrow>Madde 25-26 &middot; Yaptırım</Eyebrow>
      <H2 className="mb-2">Uymamanın üç katmanlı bedeli</H2>
      <Sub className="max-w-3xl mb-8">
        İSG ihlalleri yalnızca para cezasıyla sınırlı değildir; idari, hukuki ve cezai
        sorumluluk birlikte doğabilir. Yaklaşık sırasıyla:
      </Sub>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            icon: Stamp,
            t: "İdari para cezası",
            d: "Her eksik yükümlülük için ayrı ayrı, her ay tekrarlanarak uygulanabilir (Madde 26).",
            tag: "İdari",
            c: "#f59e0b",
          },
          {
            icon: ShieldAlert,
            t: "İşin durdurulması",
            d: "Hayati tehlike varsa işyeri/bölüm, tehlike giderilene kadar mühürlenip durdurulur (Madde 25).",
            tag: "Önleyici",
            c: "#dc2626",
          },
          {
            icon: Scale,
            t: "Hukuki & cezai",
            d: "Ölümlü/yaralanmalı kazada tazminat davası ve taksirle yaralama/öldürme kapsamında cezai sorumluluk.",
            tag: "Yargı",
            c: "#a855f7",
          },
        ].map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.t}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.12 }}
              className="isg-penal"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center"
                  style={{ background: `${p.c}1f`, border: `1px solid ${p.c}55` }}
                >
                  <Icon className="w-5 h-5" style={{ color: p.c }} />
                </div>
                <span
                  className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded"
                  style={{ background: `${p.c}1f`, color: p.c }}
                >
                  {p.tag}
                </span>
              </div>
              <div className="text-base font-semibold text-white mb-1">{p.t}</div>
              <div className="text-[12px] text-gray-300 leading-relaxed">{p.d}</div>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 text-[11px] text-gray-500 font-mono text-center"
      >
        Ceza tutarları her yıl yeniden değerleme oranıyla güncellenir; güncel
        miktarlar için Çalışma ve Sosyal Güvenlik Bakanlığı tarifesine bakılmalıdır.
      </motion.div>
    </SlideShell>
  ),

  // 14 — Denetim & kaza bildirimi süreleri
  () => (
    <SlideShell>
      <Eyebrow>Denetim &amp; Bildirim</Eyebrow>
      <H2 className="mb-2">Kim denetler, ne zaman bildirilir?</H2>
      <Sub className="max-w-3xl mb-6">
        Devlet adına denetim yetkisi iş müfettişlerindedir. Kaza ve meslek hastalığı
        bildirimleri için yasal süreler vardır; geç bildirim ayrı bir ihlaldir.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="isg-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fbbf24]">
            <ClipboardCheck className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Denetim</span>
          </div>
          <ul className="space-y-2.5 text-[13px] text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />
              Çalışma ve Sosyal Güvenlik Bakanlığı iş müfettişleri yetkilidir.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />
              Habersiz denetim yapılabilir; belge ve uygulama birlikte kontrol edilir.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />
              Hayati tehlike görülürse iş derhal durdurulabilir.
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="isg-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3 text-[#60a5fa]">
            <ClipboardList className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Kaza Bildirimi</span>
          </div>
          <div className="space-y-2.5 text-[13px] text-gray-300">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span>İşverenden SGK&apos;ya iş kazası bildirimi</span>
              <span className="isg-token">3 iş günü</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span>Sağlık hizmeti sunucusundan SGK&apos;ya</span>
              <span className="isg-token">10 gün</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Meslek hastalığı öğrenildiğinde bildirim</span>
              <span className="isg-token">3 iş günü</span>
            </div>
          </div>
          <div className="text-[11px] text-gray-500 mt-3">
            Süreler iş günü esaslıdır; geç bildirim ayrı yaptırıma tabidir.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 15 — Mit / doğru-yanlış
  () => (
    <SlideShell>
      <Eyebrow>Sık Yapılan Hatalar</Eyebrow>
      <H2 className="mb-10">Yanlış inanış vs Mevzuat</H2>
      <div className="space-y-3">
        {[
          {
            m: "İSG sadece büyük fabrikaları bağlar.",
            f: "6331 tek çalışanı olan işyerini bile kapsar; kapsam istisnasızdır (Madde 2).",
          },
          {
            m: "KKD bedelini çalışan kendi karşılar.",
            f: "Koruyucu donanım ve tüm İSG tedbiri ücretsizdir; maliyet çalışana yansıtılamaz.",
          },
          {
            m: "Eğitim verdiysem işveren olarak sorumluluktan kurtulurum.",
            f: "Eğitim bir yükümlülüktür; ama tedbir alma ve gözetim sorumluluğu devam eder.",
          },
          {
            m: "Çalışan tehlikeli işi reddederse işten atılır.",
            f: "Ciddi/yakın tehlikede çalışmaktan kaçınma yasal haktır; gerekçe olamaz (Madde 13).",
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
                YANLIŞ
              </span>
              {r.m}
            </div>
            <div className="isg-fact rounded-r-md px-4 py-3 text-[13px]">
              <span className="text-[10px] uppercase tracking-wider font-bold text-green-300 mr-2">
                MEVZUAT
              </span>
              {r.f}
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  // 16 — Uygulamalı: mini vaka analizi
  () => (
    <SlideShell>
      <Eyebrow>Bu Hafta &middot; Uygulama</Eyebrow>
      <H2 className="mb-2">Mini vaka: kim, hangi maddeyi ihlal etti?</H2>
      <Sub className="max-w-3xl mb-6">
        Aşağıdaki senaryoyu okuyun; ihlalleri ilgili maddeyle eşleştirin. Sonraki
        derse kısa bir gerekçeyle gelin.
      </Sub>
      <div className="grid md:grid-cols-[1.1fr_1fr] gap-6">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="isg-card rounded-xl p-5"
        >
          <div className="text-xs font-mono uppercase tracking-wider text-[#fbbf24] mb-3">
            Senaryo
          </div>
          <p className="text-[13px] text-gray-300 leading-relaxed">
            Bir mobilya atölyesinde 6 işçi çalışıyor. Risk değerlendirmesi hiç
            yapılmamış; işçilere kulak ve göz koruyucu verilmemiş. Bir işçi, dönen
            testereye baret/gözlük olmadan müdahale ederken yaralanıyor. İşveren
            kazayı SGK&apos;ya bir hafta sonra bildiriyor.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="space-y-2.5"
        >
          {[
            { t: "Risk değerlendirmesi yok", a: "Madde 10" },
            { t: "KKD temin edilmemiş", a: "Madde 4 / KKD Yön." },
            { t: "Eğitim verilmemiş", a: "Madde 17" },
            { t: "Kaza geç bildirilmiş", a: "Madde 14 (3 iş günü)" },
          ].map((row, i) => (
            <motion.div
              key={row.t}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              className="isg-check-row"
            >
              <XCircle className="w-5 h-5 text-red-400 shrink-0" />
              <div className="flex-1 flex items-center justify-between gap-2">
                <span className="text-[13px] text-white">{row.t}</span>
                <span className="isg-token">{row.a}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-5 isg-card-amber rounded-lg px-4 py-3 text-[12px] text-gray-300 flex items-start gap-3"
      >
        <CheckCircle2 className="w-4 h-4 text-[#fbbf24] mt-0.5 shrink-0" />
        <span>
          Göreviniz: Her ihlal için &quot;sorumlu taraf + ilgili madde + alınması
          gereken tedbir&quot; biçiminde tek satır yazın. Kaynak: 6331 sayılı Kanun
          metni (mevzuat.gov.tr).
        </span>
      </motion.div>
    </SlideShell>
  ),

  // 17 — Sıradaki hafta önizleme + kapanış
  () => (
    <SlideShell>
      <Eyebrow>Önümüzdeki Hafta</Eyebrow>
      <H2 className="mb-4">Hafta 13 &middot; İş güvenliği mevzuatı &mdash; II</H2>
      <Sub className="mb-10 max-w-2xl">
        Çerçeveyi kurduk; gelecek hafta uygulamaya iniyoruz: İSG profesyonelleri,
        kurullar ve işyeri organizasyonunun yasal düzeni.
      </Sub>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            icon: ClipboardCheck,
            t: "İSG Profesyonelleri",
            d: "İş güvenliği uzmanı, işyeri hekimi ve OSGB&apos;lerin görev ve yetkileri",
          },
          {
            icon: Users,
            t: "İSG Kurulu",
            d: "50+ çalışanlı işyerlerinde kurul oluşumu, üyeler ve karar süreci",
          },
          {
            icon: Building2,
            t: "İşyeri Organizasyonu",
            d: "Tehlike sınıfları, çalışan temsilcisi ve destek elemanı görevlendirme",
          },
          {
            icon: BookOpen,
            t: "İlgili Yönetmelikler",
            d: "Risk değerlendirmesi, sağlık gözetimi ve eğitim yönetmelikleri",
          },
          {
            icon: FileText,
            t: "Belge ve Kayıtlar",
            d: "Tutulması zorunlu kayıtlar, saklama süreleri ve denetimde sunum",
          },
          {
            icon: Gavel,
            t: "Vaka Uygulaması",
            d: "Gerçek denetim raporları üzerinden madde-ihlal eşleştirme",
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

  // 18 — Özet + kapanış / iletişim
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
          <Scale className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>Hafta 12 Tamamlandı</Eyebrow>
        <H1 className="isg-shimmer">Özet</H1>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 grid md:grid-cols-3 gap-4 max-w-3xl mx-auto text-left"
        >
          <div className="isg-card-amber rounded-xl p-4">
            <BookOpen className="w-5 h-5 text-[#fbbf24] mb-2" />
            <div className="text-sm font-semibold text-white mb-1">Çerçeve</div>
            <div className="text-[12px] text-gray-300">
              6331, tüm işyerlerini kapsayan temel İSG kanunudur.
            </div>
          </div>
          <div className="isg-card-amber rounded-xl p-4">
            <Users className="w-5 h-5 text-[#fbbf24] mb-2" />
            <div className="text-sm font-semibold text-white mb-1">Taraflar</div>
            <div className="text-[12px] text-gray-300">
              Asıl sorumluluk işverende; çalışanın da görev ve hakları var.
            </div>
          </div>
          <div className="isg-card-amber rounded-xl p-4">
            <Gavel className="w-5 h-5 text-[#fbbf24] mb-2" />
            <div className="text-sm font-semibold text-white mb-1">Yaptırım</div>
            <div className="text-[12px] text-gray-300">
              İhlal; idari, hukuki ve cezai sorumluluk doğurabilir.
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 grid md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          <div className="isg-card rounded-xl p-4">
            <Calendar className="w-5 h-5 text-[#f59e0b] mb-2 mx-auto" />
            <div className="text-xs text-gray-400">Ders günü</div>
            <div className="text-sm font-semibold text-white mt-1">
              Perşembe &middot; 13:30 &mdash; 15:10
            </div>
          </div>
          <div className="isg-card rounded-xl p-4">
            <Globe className="w-5 h-5 text-[#f59e0b] mb-2 mx-auto" />
            <div className="text-xs text-gray-400">Kaynak</div>
            <div className="text-sm font-semibold text-white mt-1">
              mevzuat.gov.tr &middot; 6331
            </div>
          </div>
          <div className="isg-card rounded-xl p-4">
            <Users className="w-5 h-5 text-[#f59e0b] mb-2 mx-auto" />
            <div className="text-xs text-gray-400">Kod</div>
            <div className="text-sm font-semibold text-white mt-1">
              BVA 1109 &middot; 2 AKTS
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-8 text-[11px] text-gray-600 font-mono"
        >
          Mevzuat asgaridir; iyi uygulama her zaman daha fazlasını ister.
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
          BVA 1109 · 12. Hafta · İş Güvenliği Mevzuatı I
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
