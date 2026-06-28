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
  BookOpen,
  ShieldCheck,
  ShieldAlert,
  Users,
  UserCheck,
  ClipboardList,
  ClipboardCheck,
  Gavel,
  Landmark,
  AlertTriangle,
  Ban,
  CheckCircle2,
  XCircle,
  Check,
  Calendar,
  Globe,
  Hash,
  Stethoscope,
  HardHat,
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

/* Resmî Gazete / yönetmelik belgesi mockup */
function GazetteDoc() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="isg-gazette mx-auto"
      style={{ width: 360 }}
    >
      <div className="isg-gazette-head">
        <div className="text-[10px] tracking-[0.3em] opacity-90">
          T.C. RESMÎ GAZETE
        </div>
        <div className="text-[15px] font-bold leading-tight mt-1">
          İş Sağlığı ve Güvenliği Risk Değerlendirmesi Yönetmeliği
        </div>
        <div className="text-[10px] mt-1 opacity-90">
          Sayı: 28512 &middot; Çalışma ve Sosyal Güvenlik Bakanlığı
        </div>
      </div>
      <div className="isg-gazette-body relative">
        <div className="text-[11px] font-semibold text-[#7f1d1d]">
          BİRİNCİ BÖLÜM
        </div>
        <div className="text-[11px] text-gray-700">
          Amaç, Kapsam, Dayanak ve Tanımlar
        </div>
        <hr className="isg-gazette-rule" />
        <div className="text-[10.5px] leading-relaxed text-gray-800">
          <span className="font-semibold">MADDE 1 &mdash;</span> (1) Bu
          Yönetmeliğin amacı, işyerlerinde iş sağlığı ve güvenliği yönünden
          yapılacak risk değerlendirmesinin usul ve esaslarını düzenlemektir.
        </div>
        <div className="text-[10.5px] leading-relaxed text-gray-800 mt-2">
          <span className="font-semibold">MADDE 5 &mdash;</span> (1) Risk
          değerlendirmesi, işveren&apos;in oluşturduğu bir ekip tarafından
          gerçekleştirilir.
        </div>
        <hr className="isg-gazette-rule" />
        <div className="text-[10px] text-gray-500 italic">
          Dayanak: 6331 sayılı İş Sağlığı ve Güvenliği Kanunu, Madde 10 ve 30.
        </div>
        <div
          className="isg-stamp absolute"
          style={{ right: 14, bottom: 12, padding: "6px 12px", fontSize: 11 }}
        >
          Yürürlükte
        </div>
      </div>
    </motion.div>
  );
}

/* Yükümlülük zaman çizelgesi — kaza bildirimi */
function ReportTimeline() {
  const items: Array<{ t: string; label: string; detail: string; accent: string }> = [
    {
      t: "0. gün",
      label: "İş kazası meydana gelir",
      detail: "İşveren olay yerinde ilk müdahale ve kayıt altına alma sürecini başlatır.",
      accent: "#dc2626",
    },
    {
      t: "3 iş günü",
      label: "SGK'ya bildirim",
      detail: "İş kazası, kazadan sonraki 3 iş günü içinde SGK'ya elektronik ortamda bildirilir.",
      accent: "#f59e0b",
    },
    {
      t: "Sürekli",
      label: "Kayıt ve istatistik",
      detail: "İşveren tüm iş kazası ve meslek hastalıklarının kaydını tutar, raporlar düzenler.",
      accent: "#22c55e",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="isg-card rounded-xl p-6 max-w-4xl mx-auto"
    >
      <div className="space-y-4">
        {items.map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.18 }}
            className="flex items-start gap-4"
          >
            <div
              className="w-20 shrink-0 text-center rounded-lg py-2 font-mono text-[11px] font-bold"
              style={{
                background: `${s.accent}18`,
                color: s.accent,
                border: `1px solid ${s.accent}55`,
              }}
            >
              {s.t}
            </div>
            <div className="flex-1 rounded-lg px-4 py-3 isg-card">
              <div className="text-sm font-semibold text-white">{s.label}</div>
              <div className="text-[12px] text-gray-400 mt-0.5">{s.detail}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-5 text-[11px] text-gray-500 font-mono">
        Dayanak: 6331 sayılı Kanun Madde 14 &middot; süreler ilgili mevzuata göre uygulanır.
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
        <Eyebrow>BVA 1109 · 13. Hafta · İş Güvenliği Mevzuatı</Eyebrow>
        <H1 className="isg-shimmer">
          İş Güvenliği
          <br />
          Mevzuatı — II
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Kanundan uygulamaya: yönetmelikler, görevlendirmeler, risk değerlendirmesi,
          denetim ve idari yaptırımlar.
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
              <div className="text-sm font-semibold text-white">6331 sayılı Kanun</div>
              <div className="text-[10px] text-gray-500">Çatı düzenleme</div>
            </div>
          </div>
          <div className="isg-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(59,130,246,0.18)" }}
            >
              <FileText className="w-5 h-5" style={{ color: "#60a5fa" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Yönetmelikler</div>
              <div className="text-[10px] text-gray-500">İkincil mevzuat</div>
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
              <div className="text-sm font-semibold text-white">Denetim</div>
              <div className="text-[10px] text-gray-500">İdari yaptırımlar</div>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 2 — Geçen haftadan köprü
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 12. haftadan 13. haftaya</Eyebrow>
      <H2>Geçen hafta kanunu kurduk; bu hafta kanunu uyguluyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        12. haftada 6331 sayılı İş Sağlığı ve Güvenliği Kanunu&apos;nun amacını, kapsamını
        ve temel ilkelerini gördük. Kanun bir çatıdır; günlük uygulama ise ona bağlı
        yönetmelikler, tebliğler ve görevlendirmelerle yürür. Bu hafta o uygulama
        katmanını açıyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="isg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fbbf24]">
            <BookOpen className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Geçen hafta (Mevzuat — I)
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />6331 sayılı Kanun&apos;un amacı ve kapsamı</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />İşveren ve çalışan tanımları</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />Temel yükümlülük ve genel ilkeler</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="isg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <ClipboardCheck className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Bu hafta (Mevzuat — II)
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] shrink-0" />Kanuna bağlı yönetmelikler ve hiyerarşi</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] shrink-0" />İSG profesyonelleri ve görevlendirme</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] shrink-0" />Risk değerlendirmesi, kurullar, denetim ve yaptırımlar</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 3 — Bu dersin akışı (3 durak)
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: ikincil mevzuat → görevlendirme → denetim</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce kanunun altındaki düzenlemeleri ve mevzuat hiyerarşisini tanıyoruz; sonra
        işyerinde kimin neyi yapmakla yükümlü olduğunu; en son uyulmadığında devreye giren
        denetim ve idari yaptırımları görüyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            range: "01",
            title: "İkincil Mevzuat",
            items: ["Mevzuat hiyerarşisi", "Temel yönetmelikler", "Tehlike sınıfları"],
            icon: FileText,
            accent: "#f59e0b",
          },
          {
            range: "02",
            title: "Görevlendirme & Kurul",
            items: ["İş güvenliği uzmanı & işyeri hekimi", "Risk değerlendirme ekibi", "İSG kurulu"],
            icon: Users,
            accent: "#3b82f6",
          },
          {
            range: "03",
            title: "Denetim & Yaptırım",
            items: ["Bakanlık denetimi", "İdari para cezaları", "İşin durdurulması"],
            icon: Gavel,
            accent: "#dc2626",
          },
        ].map((g, i) => {
          const Icon = g.icon;
          return (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="isg-card rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `${g.accent}18`, border: `1px solid ${g.accent}55` }}
                >
                  <Icon className="w-5 h-5" style={{ color: g.accent }} />
                </div>
                <div>
                  <div
                    className="text-[10px] font-mono uppercase tracking-widest"
                    style={{ color: g.accent }}
                  >
                    Durak {g.range}
                  </div>
                  <div className="text-lg font-semibold text-white">{g.title}</div>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-400">
                {g.items.map((it) => (
                  <li key={it} className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: g.accent }} />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  1. İKİNCİL MEVZUAT  ───────────────── */

  // 4 — Section: İkincil Mevzuat
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="İkincil Mevzuat"
      subtitle="6331 sayılı Kanun bir çatıdır. Günlük uygulama, ona dayanılarak çıkarılan yönetmelik ve tebliğlerle yürür."
      bgGradient="linear-gradient(135deg, #f59e0b, #b45309)"
      shadow="0 20px 60px -10px rgba(245, 158, 11, 0.6)"
      icon={<FileText className="w-16 h-16 text-white" />}
    />
  ),

  // 5 — Mevzuat hiyerarşisi (piramit)
  () => (
    <SlideShell>
      <Eyebrow>Hukuk Hiyerarşisi</Eyebrow>
      <H2 className="mb-2">Mevzuat piramidi: yukarıdan aşağıya bağlayıcılık</H2>
      <Sub className="max-w-3xl mb-8">
        Alt basamaktaki bir düzenleme, üstündekine aykırı olamaz. İSG mevzuatını okurken
        bir hükmün hangi basamakta olduğunu bilmek, onun ne kadar &quot;esnek&quot; olduğunu
        anlamanı sağlar.
      </Sub>
      <div className="space-y-2.5 max-w-3xl mx-auto">
        {[
          { lv: "Anayasa", d: "Çalışanın sağlıklı ve güvenli ortamda çalışma hakkının temeli", c: "#dc2626", w: "100%" },
          { lv: "Kanun — 6331 sayılı İSG Kanunu", d: "İSG&apos;nin çatı düzenlemesi; temel yükümlülükler burada", c: "#f59e0b", w: "84%" },
          { lv: "Yönetmelik", d: "Risk değerlendirmesi, görevlendirme, eğitim usulleri… uygulama detayı", c: "#3b82f6", w: "66%" },
          { lv: "Tebliğ & Genelge", d: "Tehlike sınıfı listesi gibi teknik ve güncellenebilir ekler", c: "#22c55e", w: "48%" },
        ].map((r, i) => (
          <motion.div
            key={r.lv}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.12 }}
            className="mx-auto rounded-lg px-5 py-3"
            style={{
              width: r.w,
              background: `${r.c}12`,
              border: `1px solid ${r.c}45`,
            }}
          >
            <div className="text-sm font-semibold text-white">{r.lv}</div>
            <div className="text-[12px] text-gray-400 mt-0.5">{r.d}</div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-[11px] text-gray-500 font-mono text-center"
      >
        Yönetmelik ve tebliğler T.C. Resmî Gazete&apos;de yayımlanarak yürürlüğe girer.
      </motion.div>
    </SlideShell>
  ),

  // 6 — Temel yönetmelikler tablosu
  () => (
    <SlideShell>
      <Eyebrow>6331&apos;e bağlı düzenlemeler</Eyebrow>
      <H2>Bilmen gereken temel yönetmelikler</H2>
      <Sub className="mt-3 max-w-3xl">
        Kanun &quot;ne&quot; yapılacağını söyler; yönetmelikler &quot;nasıl&quot; yapılacağını
        düzenler. En sık atıf yapılan dördü:
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
              <th style={{ width: "34%" }}>Yönetmelik</th>
              <th style={{ width: "26%" }}>Neyi düzenler?</th>
              <th>İşverene yüklediği temel görev</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Risk Değerlendirmesi Yönetmeliği</td>
              <td>Risklerin nasıl belirlenip değerlendirileceği</td>
              <td>Tehlikeleri tespit et, ölç, önlem planla ve belgeyi güncel tut.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">İş Güvenliği Uzmanlarının Görevleri Yönetmeliği</td>
              <td>Uzmanın görev, yetki ve çalışma süreleri</td>
              <td>Tehlike sınıfına uygun belgeye sahip uzman görevlendir.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">İSG Hizmetleri Yönetmeliği</td>
              <td>İşyeri hekimi ve İSG hizmetlerinin sunumu</td>
              <td>Sağlık gözetimi ve işyeri hekimliği hizmetini sağla.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">İSG Kurulları Yönetmeliği</td>
              <td>Kurulun oluşumu ve toplanma usulü</td>
              <td>Şartlar oluştuğunda kurulu kur, düzenli topla, karar al.</td>
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
        İsimler güncel mevzuata göre değişebilir; yürürlükteki metni Resmî Gazete / mevzuat.gov.tr üzerinden doğrula.
      </motion.div>
    </SlideShell>
  ),

  // 7 — Tehlike sınıfları
  () => (
    <SlideShell>
      <Eyebrow>Tehlike Sınıfları</Eyebrow>
      <H2 className="mb-2">Her işyeri eşit riskli değildir</H2>
      <Sub className="max-w-3xl mb-8">
        İşyerleri yapılan işin niteliğine göre üç tehlike sınıfına ayrılır. Sınıf;
        görevlendirilecek uzmanın belgesini, çalışma süresini ve eğitim sıklığını belirler.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            cls: "Az Tehlikeli",
            color: "#22c55e",
            icon: ShieldCheck,
            ex: "Büro, ticaret, danışmanlık, çoğu hizmet işi",
            note: "Görece düşük risk; yine de risk değerlendirmesi zorunludur.",
          },
          {
            cls: "Tehlikeli",
            color: "#f59e0b",
            icon: ShieldAlert,
            ex: "Gıda üretimi, metal işleme, depolama, lojistik",
            note: "Orta düzey risk; daha sık gözetim ve eğitim gerekir.",
          },
          {
            cls: "Çok Tehlikeli",
            color: "#dc2626",
            icon: AlertTriangle,
            ex: "Maden, inşaat, kimya, ağır sanayi",
            note: "En yüksek risk; en deneyimli uzman ve en sıkı denetim.",
          },
        ].map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.cls}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.12 }}
              className="isg-card rounded-xl p-6"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ background: `${p.color}18`, border: `1px solid ${p.color}55` }}
              >
                <Icon className="w-6 h-6" style={{ color: p.color }} />
              </div>
              <div className="text-lg font-bold mb-1" style={{ color: p.color }}>
                {p.cls}
              </div>
              <p className="text-sm text-gray-300 mb-3">{p.ex}</p>
              <p className="text-xs text-gray-500 border-t border-white/5 pt-3">{p.note}</p>
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
        Sınıflandırma, &quot;İş Sağlığı ve Güvenliğine İlişkin İşyeri Tehlike Sınıfları Tebliği&quot; eki listeye göre yapılır.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  2. GÖREVLENDİRME & KURUL  ───────────────── */

  // 8 — Section: Görevlendirme & Kurul
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Görevlendirme & Kurul"
      subtitle="Mevzuat kâğıt üstünde değil, görevlilerle hayata geçer: uzman, hekim, ekip ve kurul."
      bgGradient="linear-gradient(135deg, #3b82f6, #1d4ed8)"
      shadow="0 20px 60px -10px rgba(59, 130, 246, 0.6)"
      icon={<Users className="w-16 h-16 text-white" />}
    />
  ),

  // 9 — İSG profesyonelleri (uzman + hekim + DSP)
  () => (
    <SlideShell>
      <Eyebrow>İSG Profesyonelleri</Eyebrow>
      <H2 className="mb-10">İşveren kimlerle çalışmak zorunda?</H2>
      <div className="grid md:grid-cols-3 gap-4">
        <FeatureCard
          icon={HardHat}
          title="İş Güvenliği Uzmanı"
          desc="Bakanlıkça belgelendirilmiş (A, B, C sınıfı) uzman. Riskleri değerlendirir, önlem önerir, çalışanları bilgilendirir."
          accent="#f59e0b"
          delay={0.1}
        />
        <FeatureCard
          icon={Stethoscope}
          title="İşyeri Hekimi"
          desc="Sağlık gözetiminden sorumludur: işe giriş ve periyodik muayene, meslek hastalığı takibi, sağlık eğitimi."
          accent="#3b82f6"
          delay={0.2}
        />
        <FeatureCard
          icon={UserCheck}
          title="Diğer Sağlık Personeli"
          desc="Belirli işyerlerinde hekime yardımcı olan, ilk yardım ve kayıt süreçlerini destekleyen belgeli personel."
          accent="#22c55e"
          delay={0.3}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 isg-card-amber rounded-xl p-5"
      >
        <div className="text-sm text-gray-200 leading-relaxed">
          <span className="text-[#fbbf24] font-semibold">Önemli:</span> İşveren bu
          hizmeti kendi bünyesinde (görevlendirme) ya da dışarıdan{" "}
          <span className="text-white font-semibold">OSGB</span> (Ortak Sağlık ve Güvenlik
          Birimi) aracılığıyla alabilir. Hizmeti almak{" "}
          <span className="text-white font-semibold">tercih değil, yükümlülüktür</span>;
          uzmanın görevlendirilmemesi başlı başına bir ihlaldir.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 10 — Risk değerlendirmesi + Gazette mockup
  () => (
    <SlideShell>
      <Eyebrow>Risk Değerlendirmesi Yönetmeliği</Eyebrow>
      <H2 className="mb-8">Mevzuatın kalbi: yazılı risk değerlendirmesi</H2>
      <div className="grid md:grid-cols-[360px_1fr] gap-10 items-center">
        <GazetteDoc />
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="isg-card rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Hash className="w-4 h-4 text-[#f59e0b]" />
              <span className="text-sm font-semibold text-white">Dört temel adım</span>
            </div>
            <ul className="text-[12px] text-gray-300 space-y-1.5">
              <li>· <span className="text-[#fbbf24]">Tehlikeleri tanımla</span> — kimyasal, fiziksel, ergonomik…</li>
              <li>· <span className="text-[#fbbf24]">Riskleri analiz et</span> — olasılık × şiddet</li>
              <li>· <span className="text-[#fbbf24]">Önlem belirle</span> — kaynakta kontrol önceliği</li>
              <li>· <span className="text-[#fbbf24]">İzle ve güncelle</span> — değişiklikte yenile</li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.65 }}
            className="isg-card-green rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="text-sm font-semibold text-white">Kim hazırlar?</span>
            </div>
            <div className="text-[12px] text-green-200">
              İşverenin oluşturduğu ekip: işveren/vekili, iş güvenliği uzmanı, işyeri hekimi
              ve çalışan temsilcisi birlikte yürütür. Tek kişilik bir formalite değildir.
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="isg-card-red rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-4 h-4 text-red-400" />
              <span className="text-sm font-semibold text-white">Sık hata</span>
            </div>
            <div className="text-[12px] text-red-200">
              Bir kez yapıp rafa kaldırmak. Yeni makine, yeni süreç ya da iş kazası
              sonrasında değerlendirme yenilenmelidir.
            </div>
          </motion.div>
        </div>
      </div>
    </SlideShell>
  ),

  // 11 — İSG Kurulu
  () => (
    <SlideShell>
      <Eyebrow>İSG Kurulu</Eyebrow>
      <H2 className="mb-2">Karar masası: kim oturur, ne konuşulur?</H2>
      <Sub className="max-w-3xl mb-8">
        Belirli büyüklükteki işyerlerinde İş Sağlığı ve Güvenliği Kurulu kurulması
        zorunludur. Kurul, işyerinin İSG politikasını belirleyen ortak akıldır.
      </Sub>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="isg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4 text-[#fbbf24]">
            <Users className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Kim oturur?</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />İşveren veya vekili (başkan)</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />İş güvenliği uzmanı</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />İşyeri hekimi</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />İnsan kaynakları / personel sorumlusu</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />Çalışan temsilcisi(leri)</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />Varsa: sivil savunma / formen / usta başı</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="isg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4 text-[#86efac]">
            <ClipboardList className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Ne konuşulur?</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] shrink-0" />Risk değerlendirme bulguları ve önlemler</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] shrink-0" />Yaşanan kaza ve ramak kala olayları</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] shrink-0" />Eğitim ve tatbikat planları</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] shrink-0" />Yıllık çalışma planı ve değerlendirme</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] shrink-0" />Kararlar tutanağa bağlanır ve takip edilir</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3. DENETİM & YAPTIRIM  ───────────────── */

  // 12 — Section: Denetim & Yaptırım
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Denetim & Yaptırım"
      subtitle="Yükümlülüklere uyulmadığında devreye giren mekanizma: devlet denetimi ve idari yaptırımlar."
      bgGradient="linear-gradient(135deg, #dc2626, #7f1d1d)"
      shadow="0 20px 60px -10px rgba(220, 38, 38, 0.6)"
      icon={<Gavel className="w-16 h-16 text-white" />}
    />
  ),

  // 13 — Denetim ve yükümlülükler (kaza bildirimi timeline)
  () => (
    <SlideShell>
      <Eyebrow>Bildirim Yükümlülüğü</Eyebrow>
      <H2 className="mb-2">İş kazası olduğunda saat işlemeye başlar</H2>
      <Sub className="max-w-3xl mb-6">
        Mevzuat sadece önlemeyi değil, olay sonrası bildirimi de düzenler. İş kazası
        ve meslek hastalığı bildirimi yasal bir yükümlülüktür; gecikmesi ayrıca yaptırıma tabidir.
      </Sub>
      <ReportTimeline />
    </SlideShell>
  ),

  // 14 — İdari para cezaları / yaptırım kademeleri
  () => (
    <SlideShell>
      <Eyebrow>İdari Yaptırımlar</Eyebrow>
      <H2 className="mb-2">İhlalin bedeli: kademeli yaptırımlar</H2>
      <Sub className="max-w-3xl mb-8">
        6331 sayılı Kanun, her yükümlülük için ayrı idari para cezası öngörür. Ciddi ve
        yakın tehlike durumunda yaptırım, para cezasının da ötesine geçer.
      </Sub>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            icon: FileText,
            color: "#f59e0b",
            t: "İdari para cezası",
            d: "Her bir yükümlülük ihlali için ayrı ceza. Tutarlar her yıl yeniden değerleme oranıyla güncellenir.",
          },
          {
            icon: Ban,
            color: "#dc2626",
            t: "İşin durdurulması",
            d: "Hayati tehlike tespit edilirse işin veya işyerinin ilgili bölümünün faaliyeti durdurulabilir.",
          },
          {
            icon: Landmark,
            color: "#a855f7",
            t: "Diğer hukuki sonuçlar",
            d: "Ağır ihmal ve ölümlü kazalarda idari yaptırıma ek olarak hukuki ve cezai sorumluluk gündeme gelebilir.",
          },
        ].map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.t}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.12 }}
              className="isg-card rounded-xl p-6"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ background: `${p.color}18`, border: `1px solid ${p.color}55` }}
              >
                <Icon className="w-6 h-6" style={{ color: p.color }} />
              </div>
              <div className="text-base font-bold text-white mb-2">{p.t}</div>
              <p className="text-sm text-gray-400 leading-relaxed">{p.d}</p>
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
        Ceza tutarları her yıl değiştiği için bu derste kesin rakam yerine yaptırım türleri üzerinde duruyoruz.
      </motion.div>
    </SlideShell>
  ),

  // 15 — Çalışanın hakları ve yükümlülükleri
  () => (
    <SlideShell>
      <Eyebrow>İki Taraflı Sorumluluk</Eyebrow>
      <H2 className="mb-10">Mevzuat yalnız işvereni değil, çalışanı da bağlar</H2>
      <div className="grid md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="isg-do p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-6 h-6 text-green-400" />
            <span className="text-lg font-bold text-white">Çalışanın hakları</span>
          </div>
          <ul className="space-y-2.5 text-[13px]">
            {[
              "Ücretsiz İSG eğitimi alma",
              "Ciddi ve yakın tehlikede çalışmaktan kaçınma",
              "Kurula / temsilci aracılığıyla görüş bildirme",
              "Sağlık gözetimi (periyodik muayene) hakkı",
              "Eksik önlemi yetkiliye ve denetime bildirme",
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
            <ClipboardList className="w-6 h-6 text-red-300" />
            <span className="text-lg font-bold text-white">Çalışanın yükümlülükleri</span>
          </div>
          <ul className="space-y-2.5 text-[13px]">
            {[
              "Eğitime katılmak ve kurallara uymak",
              "Kişisel koruyucu donanımı doğru kullanmak",
              "Makineyi ve donanımı kurallara göre çalıştırmak",
              "Tehlike / arıza fark edince derhal bildirmek",
              "İşbirliği yapmak — önlemleri etkisiz kılmamak",
            ].map((d) => (
              <li key={d} className="flex items-start gap-2 text-red-100">
                <ChevronRight className="w-3.5 h-3.5 text-red-300 mt-1 shrink-0" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 16 — Uygulamalı / alıştırma slaytı
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulama</Eyebrow>
      <H2>Mevzuatı sahaya indir: dört adımlık ödev</H2>
      <Sub className="mt-3 max-w-3xl">
        Bir sonraki derse aşağıdaki dördünü yapmış gelmen bekleniyor. Kaynak olarak yalnızca
        yürürlükteki resmî metni (mevzuat.gov.tr) kullan.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          {
            icon: BookOpen,
            title: "Tehlike sınıfını belirle",
            desc: "Tanıdığın bir işyeri seç (ör. market, atölye). Tebliğ ekine göre tehlike sınıfını bul ve gerekçesini yaz.",
            accent: "#f59e0b",
          },
          {
            icon: ClipboardCheck,
            title: "Mini risk değerlendirmesi",
            desc: "Seçtiğin işyeri için 3 tehlike + 3 önlem içeren basit bir tablo hazırla (tehlike / olasılık / önlem).",
            accent: "#22c55e",
          },
          {
            icon: Users,
            title: "Görevlendirmeyi listele",
            desc: "Bu işyerinde hangi İSG profesyonelleri zorunlu? Uzman, hekim, kurul gerekli mi — kısaca açıkla.",
            accent: "#3b82f6",
          },
          {
            icon: Gavel,
            title: "Bir yaptırım örneği bul",
            desc: "6331 sayılı Kanun&apos;dan bir ihlal türü seç; karşılığındaki idari yaptırımın türünü (para cezası / durdurma) yaz.",
            accent: "#dc2626",
          },
        ].map((t, i) => {
          const Icon = t.icon;
          return (
            <motion.div
              key={t.title}
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
                  <h3 className="text-base font-semibold text-white">{t.title}</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{t.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SlideShell>
  ),

  // 17 — Özet
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
          <Scale className="w-6 h-6 text-[#fbbf24] mb-3" />
          <div className="text-base font-semibold text-white mb-3">
            Üç kavramı bağla
          </div>
          <ol className="space-y-2 text-[13px] text-gray-200 list-decimal list-inside">
            <li>Çatı: <span className="isg-token">6331 sayılı Kanun</span></li>
            <li>Uygulama: <span className="isg-token">Yönetmelik &amp; Tebliğ</span></li>
            <li>Belge: <span className="isg-token">Risk Değerlendirmesi</span></li>
          </ol>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="isg-card-amber rounded-xl p-5"
        >
          <ShieldCheck className="w-6 h-6 text-[#fbbf24] mb-3" />
          <div className="text-base font-semibold text-white mb-3">
            Üç gerçeği içselleştir
          </div>
          <ol className="space-y-2 text-[13px] text-gray-200 list-decimal list-inside">
            <li>Hizmet almak <span className="text-[#fbbf24] font-semibold">tercih değil yükümlülük</span></li>
            <li>Sorumluluk <span className="text-[#fbbf24] font-semibold">çift taraflı</span> (işveren + çalışan)</li>
            <li>İhlalin karşılığı <span className="text-[#fbbf24] font-semibold">idari yaptırım</span></li>
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
          <span className="text-[#f59e0b] font-semibold">Anahtar fikir:</span> Mevzuat,
          kazaları önlemeyi bir &quot;iyi niyet&quot; olmaktan çıkarıp ölçülebilir,
          denetlenebilir ve yaptırıma bağlı bir görev haline getirir.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 18 — Sıradaki hafta + kapanış
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
        <Eyebrow>13. Hafta tamamlandı · sıradaki: İş kazaları — vakalar</Eyebrow>
        <H1 className="isg-shimmer">Mevzuattan Sahaya</H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta kuralları öğrendik. Gelecek hafta o kuralların ihmal edildiği gerçek
          iş kazası vakalarını inceleyip, hangi yükümlülüğün atlandığını birlikte çözeceğiz.
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 grid md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          <div className="isg-card rounded-xl p-4">
            <Calendar className="w-5 h-5 text-[#f59e0b] mb-2 mx-auto" />
            <div className="text-xs text-gray-400">Gelecek hafta</div>
            <div className="text-sm font-semibold text-white mt-1">
              Hafta 14 · İş kazaları — vakalar
            </div>
          </div>
          <div className="isg-card rounded-xl p-4">
            <Globe className="w-5 h-5 text-[#f59e0b] mb-2 mx-auto" />
            <div className="text-xs text-gray-400">Kaynak</div>
            <div className="text-sm font-semibold text-white mt-1">
              mevzuat.gov.tr · Resmî Gazete
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
          Kanun yazılır, yönetmelik uygular, denetim doğrular.
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
          BVA 1109 · 13. Hafta · İş Güvenliği Mevzuatı — II
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
