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
  ShieldAlert,
  Lock,
  Unlock,
  Tag,
  ClipboardCheck,
  ClipboardList,
  Cog,
  Flame,
  Wind,
  Ban,
  Eye,
  HardHat,
  DoorOpen,
  Activity,
  Layers,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  X,
  CheckCircle2,
  XCircle,
  Target,
  GraduationCap,
  Calendar,
  Globe,
  Users,
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

// Güvenlik işareti karosu (ISO 7010 renk/şekil mantığı)
function SafetySign({
  shape,
  cls,
  glyph,
  label,
  sub,
  delay = 0,
}: {
  shape: "circle" | "triangle" | "square";
  cls: string;
  glyph: ReactNode;
  label: string;
  sub: string;
  delay?: number;
}) {
  const radius =
    shape === "circle" ? "9999px" : shape === "triangle" ? "16px" : "12px";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="isg-card rounded-xl p-4 flex flex-col items-center text-center"
    >
      <div
        className={`isg-sign ${cls} w-16 h-16 mb-3`}
        style={{ borderRadius: radius }}
      >
        {glyph}
      </div>
      <div className="text-sm font-semibold text-white">{label}</div>
      <div className="text-[11px] text-gray-400 mt-0.5">{sub}</div>
    </motion.div>
  );
}

// LOTO — Kilitle / Etiketle akışı
function LotoFlow() {
  const steps = [
    { n: 1, t: "Hazırlık", d: "İşi durdur, etkilenecek enerjileri belirle (elektrik, basınç, kinetik)." },
    { n: 2, t: "Kapat", d: "Makineyi normal prosedürle durdur; ana şalter/vana ile enerjiyi kes." },
    { n: 3, t: "İzole et", d: "Şalteri aç, vanayı kapat, fişi çek — enerji kaynağını fiziksel ayır." },
    { n: 4, t: "Kilitle (Lock)", d: "Her çalışanın kendi asma kilidini izolasyon noktasına tak." },
    { n: 5, t: "Etiketle (Tag)", d: "Kim, neden, ne zaman bilgisini içeren uyarı etiketini as." },
    { n: 6, t: "Doğrula", d: "Çalıştırma denemesi yap; artık enerjiyi boşalt; sıfır enerjiyi ölç." },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="grid md:grid-cols-[240px_1fr] gap-8 items-center"
    >
      {/* Asma kilit + etiket çizimi */}
      <div className="relative mx-auto" style={{ width: 220 }}>
        <div className="flex items-center justify-center gap-4">
          <div
            className="flex items-center justify-center"
            style={{ width: 92, height: 110 }}
          >
            <Lock className="w-20 h-20 text-[#f59e0b]" strokeWidth={1.4} />
          </div>
          <div className="isg-loto-tag px-3 py-3" style={{ width: 96 }}>
            <div className="text-[9px] uppercase tracking-wider font-bold">
              Tehlike
            </div>
            <div className="text-[10px] mt-1 leading-snug">
              Çalışmayın
              <br />
              Bakım var
            </div>
            <div className="mt-2 border-t border-[#a16207]/50 pt-1 text-[8px]">
              Ad: A. Demir
              <br />
              Saat: 09:15
            </div>
          </div>
        </div>
        <div className="text-center text-[10px] text-gray-500 mt-3 font-mono uppercase tracking-wider">
          Kilitle &amp; Etiketle (LOTO)
        </div>
      </div>
      {/* Adımlar */}
      <div className="grid sm:grid-cols-2 gap-2.5">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.08 }}
            className="isg-card rounded-lg p-3 flex items-start gap-3"
          >
            <div className="w-7 h-7 rounded-full bg-[#f59e0b] text-black text-xs font-bold flex items-center justify-center shrink-0">
              {s.n}
            </div>
            <div>
              <div className="text-sm font-semibold text-white">{s.t}</div>
              <div className="text-[11px] text-gray-400 mt-0.5">{s.d}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Çalışma izni (permit-to-work) formu mockup
function PermitForm() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="isg-window-chrome w-full max-w-3xl mx-auto"
    >
      <div className="isg-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-mono flex-1 max-w-md mx-auto text-center justify-center"
          style={{ background: "#0d0d0d", color: "#fbbf24" }}
        >
          <ClipboardCheck className="w-3.5 h-3.5" />
          <span>Sıcak İş İzni — Form No: SİİF-2026-0418</span>
        </div>
      </div>
      <div className="isg-terminal">
        <div>
          <span className="isg-term-dim">İş tanımı :</span>{" "}
          <span className="isg-term-cmd">Depo çatısı — kaynakla onarım (sıcak iş)</span>
        </div>
        <div>
          <span className="isg-term-dim">Konum     :</span>{" "}
          <span className="isg-term-cmd">B Blok · Sevkiyat alanı · Kuzey çatı</span>
        </div>
        <div>
          <span className="isg-term-dim">Geçerlilik:</span>{" "}
          <span className="isg-term-warn">09:00 — 12:00 (yalnız bu pencere)</span>
        </div>
        <div className="mt-2 isg-term-dim">── Ön koşullar ──────────────────────────</div>
        <div><span className="isg-term-ok">[x]</span> Yanıcı malzeme 11 m yarıçapta uzaklaştırıldı</div>
        <div><span className="isg-term-ok">[x]</span> Yangın söndürücü + yangın gözcüsü hazır</div>
        <div><span className="isg-term-ok">[x]</span> Ortam gaz ölçümü yapıldı (LEL &lt; %10)</div>
        <div><span className="isg-term-err">[ ]</span> Havalandırma teyidi <span className="isg-term-err">bekliyor</span></div>
        <div className="mt-2 isg-term-dim">── Onay ─────────────────────────────────</div>
        <div>
          <span className="isg-term-dim">İş veren  :</span>{" "}
          <span className="isg-term-ok">M. Kaya ✔</span>
          <span className="isg-term-dim ml-6">İSG uzmanı:</span>{" "}
          <span className="isg-term-ok">E. Şahin ✔</span>
        </div>
        <div className="mt-1 isg-term-warn">
          ! İzin verilmeden iş BAŞLAMAZ. Son kutu kapanınca çalışma onaylanır.
        </div>
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
        <Eyebrow>BVA 1109 · 11. Hafta · İş Ortamı Güvenliği — II</Eyebrow>
        <H1 className="isg-shimmer">
          İş Ortamı
          <br />
          Güvenliğini Sağlama — II
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Güvenlik işaretleri, enerji izolasyonu (LOTO), çalışma izni ve makine
          koruyucuları — tehlikeyi kaynağında kontrol etmek.
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
              <ShieldAlert className="w-5 h-5" style={{ color: "#fbbf24" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Güvenlik İşaretleri</div>
              <div className="text-[10px] text-gray-500">ISO 7010 · 4 renk kodu</div>
            </div>
          </div>
          <div className="isg-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(59,130,246,0.18)" }}
            >
              <Lock className="w-5 h-5" style={{ color: "#60a5fa" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">LOTO</div>
              <div className="text-[10px] text-gray-500">Kilitle · Etiketle</div>
            </div>
          </div>
          <div className="isg-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(34,197,94,0.18)" }}
            >
              <Cog className="w-5 h-5" style={{ color: "#4ade80" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Makine Koruyucuları</div>
              <div className="text-[10px] text-gray-500">Siper · sensör · acil stop</div>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 2 — Geçen haftadan köprü + bu haftanın hedefi
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 10. haftadan 11. haftaya</Eyebrow>
      <H2>Önce &quot;ne giyeceğiz&quot;i konuştuk; şimdi &quot;ortamı nasıl güvene alırız&quot;</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta kişisel koruyucu donanım (KKD) ile bireyi koruduk. KKD önlem
        hiyerarşisinin en son halkasıdır. Bu hafta hiyerarşinin daha üst halkalarına
        çıkıyoruz: işaretleme, enerji izolasyonu ve makinenin kendisini güvenli hale getirme.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="isg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fbbf24]">
            <HardHat className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">10. hafta — KKD</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />Baret, gözlük, eldiven, kulaklık seçimi</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />Bireyi koruyan son savunma hattı</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />Tehlike hâlâ ortamda var, sadece kişi korunuyor</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="isg-card-amber rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fbbf24]">
            <Target className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">11. hafta — bu hafta</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />Güvenlik işaretleriyle tehlikeyi görünür kılmak</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />Enerjiyi kaynağında kesmek ve kilitlemek</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />Riskli işi yazılı izinle yönetmek; makineyi koruyucuyla güvenli kılmak</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 3 — Önlem hiyerarşisi (bağlam)
  () => (
    <SlideShell>
      <Eyebrow>Çerçeve · önlem hiyerarşisi</Eyebrow>
      <H2 className="mb-2">Tehlikeyi nereden kontrol ederiz?</H2>
      <Sub className="max-w-3xl mb-6">
        En etkili önlem yukarıdadır: tehlikeyi tamamen ortadan kaldırmak. En aşağı
        indikçe önlem zayıflar. Bu haftanın konuları (işaretleme, LOTO, koruyucu)
        çoğunlukla &quot;mühendislik&quot; ve &quot;idari&quot; basamaklarda yer alır.
      </Sub>
      <div className="space-y-2.5 max-w-3xl mx-auto">
        {[
          { t: "Ortadan kaldırma (Elimination)", d: "Tehlikeyi tümüyle yok et — en güçlü önlem", color: "#22c55e", w: "100%" },
          { t: "İkame (Substitution)", d: "Tehlikeliyi daha az tehlikeliyle değiştir", color: "#84cc16", w: "84%" },
          { t: "Mühendislik önlemleri", d: "Makine koruyucusu, izolasyon, havalandırma", color: "#f59e0b", w: "68%" },
          { t: "İdari önlemler", d: "İşaretleme, prosedür, çalışma izni, eğitim", color: "#f97316", w: "52%" },
          { t: "KKD", d: "Kişisel koruyucu donanım — en son halka", color: "#dc2626", w: "36%" },
        ].map((l, i) => (
          <motion.div
            key={l.t}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="rounded-lg px-4 py-3 flex items-center justify-between"
            style={{
              width: l.w,
              marginLeft: "auto",
              marginRight: "auto",
              background: `${l.color}12`,
              border: `1px solid ${l.color}45`,
            }}
          >
            <span className="text-white font-semibold text-sm">{l.t}</span>
            <span className="text-[11px] text-gray-400 hidden md:inline">{l.d}</span>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-[11px] text-gray-500 text-center font-mono"
      >
        Bu hafta odak: mühendislik + idari basamaklar.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  1. GÜVENLİK İŞARETLERİ  ───────────────── */

  // 4 — Bölüm 1
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Güvenlik İşaretleri"
      subtitle="Renk ve şekil bir dildir: kırmızı yasaklar, sarı uyarır, mavi emreder, yeşil yol gösterir."
      bgGradient="linear-gradient(135deg, #f59e0b, #b45309)"
      shadow="0 20px 60px -10px rgba(245, 158, 11, 0.6)"
      icon={<ShieldAlert className="w-16 h-16 text-white" />}
    />
  ),

  // 5 — İşaret tipleri (renk/şekil kodu)
  () => (
    <SlideShell>
      <Eyebrow>ISO 7010 · 4 temel kategori</Eyebrow>
      <H2 className="mb-2">İşareti okumayı öğren</H2>
      <Sub className="max-w-3xl mb-8">
        Standartlaşmış işaretlerde anlam önce renk ve şekille verilir; piktogram detayı
        sonra gelir. Aşağıdaki dört kategori ile yangın işaretleri çoğu iş yerinin temelidir.
      </Sub>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <SafetySign
          shape="circle"
          cls="isg-sign-prohibition"
          glyph={<Ban className="w-8 h-8" />}
          label="Yasaklayıcı"
          sub="Kırmızı daire · çapraz"
          delay={0.1}
        />
        <SafetySign
          shape="triangle"
          cls="isg-sign-warning"
          glyph={<AlertTriangle className="w-8 h-8" />}
          label="Uyarı"
          sub="Sarı üçgen · siyah"
          delay={0.2}
        />
        <SafetySign
          shape="circle"
          cls="isg-sign-mandatory"
          glyph={<HardHat className="w-8 h-8" />}
          label="Emredici"
          sub="Mavi daire · zorunlu"
          delay={0.3}
        />
        <SafetySign
          shape="square"
          cls="isg-sign-safe"
          glyph={<DoorOpen className="w-8 h-8" />}
          label="Acil çıkış / İlk yardım"
          sub="Yeşil kare"
          delay={0.4}
        />
        <SafetySign
          shape="square"
          cls="isg-sign-fire"
          glyph={<Flame className="w-8 h-8" />}
          label="Yangın ekipmanı"
          sub="Kırmızı kare"
          delay={0.5}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 isg-card rounded-xl p-4 text-center"
      >
        <div className="text-sm text-gray-300">
          <span className="text-[#f59e0b] font-semibold">Kural:</span> İşaret tehlikeyi
          ortadan kaldırmaz, yalnızca bildirir. İşaretleme, mühendislik önlemlerinin
          yerine değil, onları <span className="text-[#fbbf24] font-semibold">tamamlamak</span> için kullanılır.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 6 — Renk-anlam tablosu
  () => (
    <SlideShell>
      <Eyebrow>Renk kodu · referans</Eyebrow>
      <H2>Renk neyi söyler?</H2>
      <Sub className="mt-3 max-w-3xl">
        Sahada işareti bir saniyede çözmek için önce rengine bakılır. Bu tablo, güvenlik
        ve sağlık işaretleri yönetmeliğindeki temel renk-anlam eşleşmesidir.
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
              <th style={{ width: "14%" }}>Renk</th>
              <th style={{ width: "20%" }}>Anlam</th>
              <th style={{ width: "33%" }}>Örnek</th>
              <th>Şekil</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="font-semibold" style={{ color: "#f87171" }}>Kırmızı</span></td>
              <td>Yasak · dur · yangın</td>
              <td>Sigara içilmez, yangın söndürücü konumu</td>
              <td>Daire (yasak) / kare (yangın)</td>
            </tr>
            <tr>
              <td><span className="font-semibold" style={{ color: "#facc15" }}>Sarı</span></td>
              <td>Uyarı · dikkat · tehlike</td>
              <td>Yüksek gerilim, kaygan zemin, forklift geçişi</td>
              <td>Üçgen (siyah kenar)</td>
            </tr>
            <tr>
              <td><span className="font-semibold" style={{ color: "#60a5fa" }}>Mavi</span></td>
              <td>Zorunluluk · emir</td>
              <td>Baret tak, koruyucu gözlük kullan</td>
              <td>Daire (mavi zemin)</td>
            </tr>
            <tr>
              <td><span className="font-semibold" style={{ color: "#4ade80" }}>Yeşil</span></td>
              <td>Güvenlik · acil durum · ilk yardım</td>
              <td>Acil çıkış yönü, toplanma alanı, ilk yardım dolabı</td>
              <td>Kare / dikdörtgen</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  2. ENERJİ İZOLASYONU (LOTO) + İZİN  ───────────────── */

  // 7 — Bölüm 2
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Enerji İzolasyonu & Çalışma İzni"
      subtitle="Bakım yapılan makine beklenmedik şekilde çalışırsa öldürür. LOTO ve çalışma izni bunu engeller."
      bgGradient="linear-gradient(135deg, #2563eb, #1e3a8a)"
      shadow="0 20px 60px -10px rgba(37, 99, 235, 0.6)"
      icon={<Lock className="w-16 h-16 text-white" />}
    />
  ),

  // 8 — Tehlikeli enerji türleri
  () => (
    <SlideShell>
      <Eyebrow>Neden LOTO?</Eyebrow>
      <H2 className="mb-2">Bir makinede kaç tür enerji saklı?</H2>
      <Sub className="max-w-3xl mb-8">
        Şalteri kapatmak yetmez. Makine kapalıyken de saklı (artık) enerji vardır:
        yay gerilimi, basınçlı hava, yükseltilmiş yük, kondansatörde elektrik. Hepsi
        izole edilip boşaltılmadan iş güvenli değildir.
      </Sub>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { icon: Activity, t: "Elektrik", d: "Ana şalter + kondansatör boşaltma", accent: "#f59e0b" },
          { icon: Wind, t: "Basınç (pnömatik/hidrolik)", d: "Vana kapat, hattı boşalt", accent: "#06b6d4" },
          { icon: Cog, t: "Kinetik / mekanik", d: "Dönen parça tam dursun", accent: "#a855f7" },
          { icon: Layers, t: "Potansiyel (yükseltilmiş yük)", d: "Yükü indir veya destekle", accent: "#22c55e" },
          { icon: Flame, t: "Termal", d: "Yüzey soğusun, buhar kesilsin", accent: "#dc2626" },
          { icon: AlertTriangle, t: "Yay / gerilmiş enerji", d: "Yayı serbest bırak/sabitle", accent: "#fbbf24" },
        ].map((e, i) => {
          const Icon = e.icon;
          return (
            <motion.div
              key={e.t}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="isg-card rounded-xl p-4"
            >
              <Icon className="w-6 h-6 mb-2" style={{ color: e.accent }} />
              <div className="text-sm font-semibold text-white mb-1">{e.t}</div>
              <div className="text-[11px] text-gray-400">{e.d}</div>
            </motion.div>
          );
        })}
      </div>
    </SlideShell>
  ),

  // 9 — LOTO akışı (mockup)
  () => (
    <SlideShell>
      <Eyebrow>LOTO · adım adım</Eyebrow>
      <H2 className="mb-2">Kilitle &amp; Etiketle — 6 adım</H2>
      <Sub className="max-w-3xl mb-6">
        Her çalışan kendi kilidini takar; kilit yalnız onu takan kişi tarafından açılır.
        Böylece &quot;başkası enerjiyi geri verir&quot; senaryosu fiziksel olarak imkânsız hale gelir.
      </Sub>
      <LotoFlow />
    </SlideShell>
  ),

  // 10 — Çalışma izni (permit) mockup
  () => (
    <SlideShell>
      <Eyebrow>Çalışma izni · sıcak iş örneği</Eyebrow>
      <H2 className="mb-2">Yüksek riskli iş yazılı izinle başlar</H2>
      <Sub className="max-w-3xl mb-6">
        Sıcak iş, kapalı alan, yüksekte çalışma gibi işler çalışma izni (permit-to-work)
        gerektirir. İzin; ön koşulları, geçerlilik penceresini ve yetkili onaylarını
        tek belgede toplar. Tüm kutular kapanmadan iş başlamaz.
      </Sub>
      <PermitForm />
    </SlideShell>
  ),

  // 11 — Kapalı alan / sıcak iş hızlı referans tablosu
  () => (
    <SlideShell>
      <Eyebrow>İzin gerektiren işler</Eyebrow>
      <H2>Hangi iş, hangi kritik kontrol?</H2>
      <Sub className="mt-3 max-w-3xl">
        Her riskli iş türünün kendine özgü &quot;olmazsa olmaz&quot; kontrolü vardır. Çalışma izni
        bu kontrolü iş başlamadan zorunlu kılar.
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
              <th style={{ width: "24%" }}>İş türü</th>
              <th style={{ width: "38%" }}>Başlıca tehlike</th>
              <th>Kritik kontrol</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Sıcak iş (kaynak/taşlama)</td>
              <td>Yangın, kıvılcım, sıçrama</td>
              <td>Yanıcı uzaklaştırma + yangın gözcüsü + gaz ölçümü</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Kapalı/dar alan</td>
              <td>Oksijen azlığı, zehirli/patlayıcı gaz</td>
              <td>Gaz ölçümü + havalandırma + gözcü + kurtarma planı</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Yüksekte çalışma</td>
              <td>Düşme</td>
              <td>Toplu koruma (korkuluk) önce; sonra paraşüt tipi emniyet kemeri</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Elektrik bakımı</td>
              <td>Elektrik çarpması, ark</td>
              <td>LOTO + gerilim yokluğu testi + yalıtkan ekipman</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Kazı çalışması</td>
              <td>Göçük, gömülü hat</td>
              <td>Şevlendirme/iksa + altyapı haritası + giriş kontrolü</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  3. MAKİNE GÜVENLİĞİ & DÜZEN  ───────────────── */

  // 12 — Bölüm 3
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Makine Koruyucuları & Düzen"
      subtitle="Tehlikeli bölgeyle insan arasına bir engel koy; iş yerini düzenli tut. En sessiz kazalar dağınıktan çıkar."
      bgGradient="linear-gradient(135deg, #22c55e, #15803d)"
      shadow="0 20px 60px -10px rgba(34, 197, 94, 0.6)"
      icon={<Cog className="w-16 h-16 text-white" />}
    />
  ),

  // 13 — Makine koruyucu tipleri
  () => (
    <SlideShell>
      <Eyebrow>Makine koruyucuları</Eyebrow>
      <H2 className="mb-10">Tehlikeli bölgeye eli sokmadan çalışmak</H2>
      <div className="grid md:grid-cols-3 gap-4">
        <FeatureCard
          icon={ShieldAlert}
          title="Sabit siper (fixed guard)"
          desc="Dönen/kesen parçayı kapatan, alet olmadan sökülemeyen fiziksel engel. En basit ve en güvenilir koruyucu."
          accent="#22c55e"
          delay={0.1}
        />
        <FeatureCard
          icon={Unlock}
          title="Kilitlemeli koruyucu (interlock)"
          desc="Kapak açılınca makine otomatik durur; kapanmadan çalışmaz. Sık erişim gereken yerlerde kullanılır."
          accent="#06b6d4"
          delay={0.2}
        />
        <FeatureCard
          icon={Eye}
          title="Işık bariyeri (light curtain)"
          desc="Tehlike bölgesine el/kol girince ışık demeti kesilir, makine anında durur. Pres ve robot hücrelerinde yaygın."
          accent="#a855f7"
          delay={0.3}
        />
        <FeatureCard
          icon={XCircle}
          title="Acil durdurma (E-stop)"
          desc="Kolay ulaşılır kırmızı buton; basınca tüm hareket durur. Kilitli kalır, bilinçli sıfırlama gerekir."
          accent="#dc2626"
          delay={0.4}
        />
        <FeatureCard
          icon={Cog}
          title="İki el kumandası"
          desc="Makine ancak iki buton aynı anda basılınca çalışır; eller butonda olduğu için tehlike bölgesinde olamaz."
          accent="#f59e0b"
          delay={0.5}
        />
        <FeatureCard
          icon={HardHat}
          title="KKD (tamamlayıcı)"
          desc="Koruyucular yeterli değilse gözlük, eldiven, yüz siperi eklenir — ama asla tek başına çözüm değildir."
          accent="#f97316"
          delay={0.6}
        />
      </div>
    </SlideShell>
  ),

  // 14 — Düzen & temizlik (5S) — yapılır / yapılmaz
  () => (
    <SlideShell>
      <Eyebrow>Düzen &amp; temizlik · 5S mantığı</Eyebrow>
      <H2 className="mb-10">Güvenli ortam = düzenli ortam</H2>
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
              "Yürüme yollarını ve acil çıkışları açık tut",
              "Kabloları toplayıp kanala al, takılmayı önle",
              "Dökülen sıvıyı hemen temizle, işaretle",
              "Yangın söndürücü önünü boş bırak",
              "Aleti kullanınca yerine kaldır (her şeyin yeri belli)",
              "Atığı türüne göre ayrı kaplarda topla",
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
              "Geçit ve merdivene malzeme istifleme",
              "Makine koruyucusunu &quot;hızlı olsun&quot; diye sökme",
              "Acil stop / pano önünü kutuyla kapatma",
              "Yağ-su birikintisini &quot;sonra&quot; deyip bırakma",
              "Yanıcı atığı üretim alanında biriktirme",
              "Bozuk ekipmanı etiketsiz kullanımda tutma",
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

  // 15 — Uygulamalı: bu hafta saha turu / kontrol listesi
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı görev</Eyebrow>
      <H2>Bir alanın güvenlik turunu yap</H2>
      <Sub className="mt-3 max-w-3xl">
        Atölye, laboratuvar veya bir iş yeri alanını seç; aşağıdaki dört adımı uygula ve
        kısa bir bulgu raporu hazırla (fotoğraf + 3 cümle açıklama).
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: ShieldAlert, title: "İşaretleri denetle", desc: "Eksik/yanlış/soluk güvenlik işaretlerini listele; renk-anlam doğru mu?", accent: "#f59e0b" },
          { icon: Lock, title: "Bir makine için LOTO planı çıkar", desc: "Enerji türlerini ve izolasyon noktalarını yaz; kilit nereye takılır?", accent: "#60a5fa" },
          { icon: ClipboardList, title: "Bir çalışma izni taslağı doldur", desc: "Sıcak iş veya kapalı alan için ön koşul kutularını ve onayları belirle.", accent: "#a855f7" },
          { icon: Cog, title: "Koruyucu & düzen kontrolü", desc: "Sökülmüş koruyucu, kapalı çıkış, takılma riski var mı? Bulguyu fotoğrafla.", accent: "#22c55e" },
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
                  <span className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-[10px] text-gray-500 font-mono">{i + 1}</span>
                  <h3 className="text-base font-semibold text-white">{t.title}</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{t.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 isg-card-red rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
        <span>
          <span className="text-white">Güvenlik önce:</span> Tur sırasında hiçbir makineyi
          çalıştırma, koruyucu sökme veya enerji kesme. Yalnızca gözlem ve kayıt — fiili
          müdahale yetkili personelin işidir.
        </span>
      </motion.div>
    </SlideShell>
  ),

  // 16 — Özet
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
            <li>Renk kodu: <span className="isg-token">kırmızı yasak · sarı uyarı · mavi emir · yeşil güvenlik</span></li>
            <li>LOTO: <span className="isg-token">izole et · kilitle · etiketle · doğrula</span></li>
            <li>Riskli iş <span className="isg-token">yazılı izinle</span> başlar</li>
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
            Üç ilkeyi içselleştir
          </div>
          <ol className="space-y-2 text-[13px] text-gray-200 list-decimal list-inside">
            <li>Tehlikeyi önce <span className="text-[#fbbf24] font-semibold">kaynağında</span> kontrol et</li>
            <li>İşaret/KKD önlemin <span className="text-[#fbbf24] font-semibold">yerine değil tamamı</span></li>
            <li>Koruyucuyu sökme — <span className="text-[#fbbf24] font-semibold">düzen güvenliktir</span></li>
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
          <span className="text-[#f59e0b] font-semibold">Anahtar fikir:</span> Güvenli iş
          ortamı bireyin dikkatine değil, ortamın kendisine yerleştirilmiş kontrollere dayanır.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 17 — Sıradaki hafta + kapanış
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
          <ClipboardCheck className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>11. hafta tamamlandı · sıradaki: 12. hafta</Eyebrow>
        <H1 className="isg-shimmer">İSG Mevzuatı &amp; Sorumluluklar</H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta sahadaki kontrolleri konuştuk. 12. haftada bunların hukuki çerçevesini
          açıyoruz: 6331 sayılı İSG Kanunu, işveren/çalışan yükümlülükleri ve risk değerlendirmesi.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="isg-card rounded-xl p-5">
            <Tag className="w-5 h-5 text-[#f59e0b] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Kanun</div>
            <div className="text-white font-semibold">6331 sayılı İSG</div>
            <div className="text-sm text-gray-400">temel çerçeve</div>
          </div>
          <div className="isg-card rounded-xl p-5">
            <Users className="w-5 h-5 text-[#a855f7] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Sorumluluk</div>
            <div className="text-white font-semibold">İşveren · çalışan</div>
            <div className="text-sm text-gray-400">karşılıklı yükümlülük</div>
          </div>
          <div className="isg-card rounded-xl p-5">
            <ClipboardList className="w-5 h-5 text-[#22c55e] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">Saha turu raporu</div>
            <div className="text-sm text-gray-400">bu haftanın görevi</div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-10 flex items-center justify-center gap-6 flex-wrap text-[11px] text-gray-600 font-mono"
        >
          <span className="inline-flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> BVA 1109 · 2 AKTS</span>
          <span className="inline-flex items-center gap-2"><Globe className="w-3.5 h-3.5" /> MCBÜ MYO</span>
          <span>Önce can güvenliği — sonra her şey.</span>
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
          BVA 1109 · 11. Hafta · İş Ortamı Güvenliği — II
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
