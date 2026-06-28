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
  HardHat,
  Shield,
  ShieldCheck,
  Glasses,
  Headphones,
  Hand,
  Footprints,
  Wind,
  Layers,
  ArrowDown,
  AlertTriangle,
  Ban,
  Flame,
  Skull,
  CheckCircle2,
  XCircle,
  Check,
  X,
  Eye,
  Activity,
  Droplet,
  ClipboardCheck,
  ListChecks,
  Target,
  Calendar,
  Globe,
  Users,
  GraduationCap,
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
   TOPIC-SPECIFIC MOCKUPS — Kişisel Emniyet / KKD
   ============================================================ */

/* KKD giydirilmiş işçi diyagramı — baştan ayağa koruyucu donanım */
function PPEMannequin() {
  const parts: Array<{
    icon: LucideIcon;
    label: string;
    risk: string;
    color: string;
    side: "left" | "right";
    top: string;
  }> = [
    { icon: HardHat, label: "Baret", risk: "Düşen cisim · çarpma", color: "#f59e0b", side: "left", top: "2%" },
    { icon: Glasses, label: "Koruyucu gözlük", risk: "Kıvılcım · toz · sıçrama", color: "#06b6d4", side: "right", top: "14%" },
    { icon: Headphones, label: "Kulaklık / kulak tıkacı", risk: "Yüksek gürültü (&gt;85 dB)", color: "#a855f7", side: "left", top: "24%" },
    { icon: Wind, label: "Solunum maskesi", risk: "Toz · gaz · buhar", color: "#22c55e", side: "right", top: "34%" },
    { icon: Hand, label: "İş eldiveni", risk: "Kesik · kimyasal · sıcak", color: "#fbbf24", side: "left", top: "52%" },
    { icon: Footprints, label: "Çelik burunlu ayakkabı", risk: "Ezilme · delinme · kayma", color: "#ef4444", side: "right", top: "76%" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto"
      style={{ width: 520, height: 420 }}
    >
      {/* gövde silüeti */}
      <div
        className="isg-body absolute left-1/2 -translate-x-1/2"
        style={{ width: 120, height: 340, top: 20 }}
      >
        {/* baş */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{ width: 56, height: 56, top: -34, background: "linear-gradient(180deg,#4b5563,#374151)" }}
        />
        {/* baret tepesi */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-t-full"
          style={{ width: 70, height: 32, top: -52, background: "linear-gradient(180deg,#fbbf24,#d97706)" }}
        />
      </div>
      {/* etiketler */}
      {parts.map((p, i) => {
        const Icon = p.icon;
        return (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, x: p.side === "left" ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="absolute"
            style={{
              top: p.top,
              [p.side]: 0,
              width: 200,
            }}
          >
            <div
              className={`flex items-center gap-2 ${p.side === "right" ? "flex-row-reverse text-right" : ""}`}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `${p.color}22`, border: `1px solid ${p.color}55` }}
              >
                <Icon className="w-5 h-5" style={{ color: p.color }} />
              </div>
              <div>
                <div className="text-[12px] font-semibold text-white">{p.label}</div>
                <div
                  className="text-[9px] text-gray-500"
                  dangerouslySetInnerHTML={{ __html: p.risk }}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* Kontrol hiyerarşisi piramidi — en etkiliden en aza */
function ControlPyramid() {
  const levels: Array<{
    t: string;
    d: string;
    color: string;
    width: number;
    eff: string;
  }> = [
    { t: "1. Ortadan kaldırma (Elimination)", d: "Tehlikeyi tamamen yok et — riskli işlemi kaldır.", color: "#22c55e", width: 100, eff: "En etkili" },
    { t: "2. İkame (Substitution)", d: "Tehlikeli maddeyi/işlemi daha az tehlikeliyle değiştir.", color: "#84cc16", width: 86, eff: "Yüksek" },
    { t: "3. Mühendislik önlemleri", d: "Havalandırma, koruyucu kapak, otomasyon, izolasyon.", color: "#fbbf24", width: 72, eff: "Orta-yüksek" },
    { t: "4. İdari önlemler", d: "Prosedür, vardiya rotasyonu, eğitim, uyarı levhaları.", color: "#f59e0b", width: 58, eff: "Orta" },
    { t: "5. KKD (Kişisel koruyucu donanım)", d: "Baret, eldiven, maske — en son ve en zayıf savunma.", color: "#ef4444", width: 44, eff: "En az etkili" },
  ];
  return (
    <div className="flex flex-col items-center gap-2">
      {levels.map((l, i) => (
        <motion.div
          key={l.t}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.12 }}
          className="rounded-lg px-4 py-3 flex items-center justify-between"
          style={{
            width: `${l.width}%`,
            background: `${l.color}12`,
            border: `1px solid ${l.color}50`,
          }}
        >
          <div className="text-left">
            <div className="text-sm font-semibold text-white">{l.t}</div>
            <div className="text-[11px] text-gray-400">{l.d}</div>
          </div>
          <span
            className="text-[10px] font-mono px-2 py-1 rounded shrink-0 ml-3"
            style={{ background: `${l.color}22`, color: l.color }}
          >
            {l.eff}
          </span>
        </motion.div>
      ))}
      <div className="text-[11px] text-gray-500 mt-1 font-mono">
        Yukarıdan aşağı: etkinlik azalır · KKD asla ilk değil, son savunmadır.
      </div>
    </div>
  );
}

/* Güvenlik işaretleri — renk/şekil kodlaması */
function SafetySigns() {
  const signs: Array<{
    icon: LucideIcon;
    label: string;
    kind: string;
    bg: string;
    border: string;
    iconColor: string;
  }> = [
    { icon: Ban, label: "Yasaklayıcı", kind: "Yuvarlak · kırmızı çapraz", bg: "rgba(220,38,38,0.12)", border: "#dc2626", iconColor: "#f87171" },
    { icon: AlertTriangle, label: "Uyarı", kind: "Üçgen · sarı zemin", bg: "rgba(245,158,11,0.14)", border: "#f59e0b", iconColor: "#fbbf24" },
    { icon: ShieldCheck, label: "Zorunluluk", kind: "Yuvarlak · mavi zemin", bg: "rgba(37,99,235,0.14)", border: "#2563eb", iconColor: "#60a5fa" },
    { icon: CheckCircle2, label: "Acil çıkış / ilk yardım", kind: "Kare · yeşil zemin", bg: "rgba(34,197,94,0.14)", border: "#22c55e", iconColor: "#4ade80" },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {signs.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="isg-sign"
            style={{ background: s.bg, borderColor: s.border }}
          >
            <Icon className="w-9 h-9 mb-2" style={{ color: s.iconColor }} />
            <div className="text-sm font-bold text-white">{s.label}</div>
            <div className="text-[10px] text-gray-400 mt-1">{s.kind}</div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ============================================================
   SLIDES — HAFTA 5 · Kişisel emniyet sağlama — I
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ─────────────────  AÇILIŞ  ───────────────── */

  // 1 — Kapak
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 1109 · 5. Hafta · Kişisel Emniyet</Eyebrow>
        <H1 className="isg-shimmer">
          Kişisel Emniyet
          <br />
          Sağlama — I
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Önce tehlikeyi tanı, sonra doğru korunmayı seç. Bu hafta:
          kişisel koruyucu donanım, kontrol hiyerarşisi ve güvenlik işaretleri.
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
              <HardHat className="w-5 h-5" style={{ color: "#fbbf24" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">KKD</div>
              <div className="text-[10px] text-gray-500">Baret · eldiven · gözlük</div>
            </div>
          </div>
          <div className="isg-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(34,197,94,0.18)" }}
            >
              <Layers className="w-5 h-5" style={{ color: "#4ade80" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Kontrol Hiyerarşisi</div>
              <div className="text-[10px] text-gray-500">Önce kaynak, en son KKD</div>
            </div>
          </div>
          <div className="isg-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(37,99,235,0.18)" }}
            >
              <AlertTriangle className="w-5 h-5" style={{ color: "#60a5fa" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">İşaret &amp; Levha</div>
              <div className="text-[10px] text-gray-500">Renk · şekil kodlaması</div>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 2 — Geçen haftadan köprü / bu haftanın hedefi
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 4. haftadan 5. haftaya</Eyebrow>
      <H2>Tehlikeyi tanıdık; şimdi kendimizi nasıl koruyacağız?</H2>
      <Sub className="mt-3 max-w-3xl">
        Önceki hafta iş ortamındaki tehlike kaynaklarını (mekanik, fiziksel,
        kimyasal) sınıflandırdık. Bu hafta bireysel savunmaya geçiyoruz: tehlikeye
        maruz kalan çalışanı doğru donanım ve doğru davranışla nasıl emniyete alırız.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="isg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fbbf24]">
            <Eye className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Geçen hafta</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />Tehlike vs risk ayrımı</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />İş ortamı tehlike kaynakları</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />Maruziyet ve etkilenme yolları</li>
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
            <span className="text-xs font-mono uppercase tracking-widest">Bu haftanın hedefi</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#fbbf24] shrink-0" />KKD türlerini ve doğru seçimini öğrenmek</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#fbbf24] shrink-0" />Kontrol önlemleri hiyerarşisini kavramak</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#fbbf24] shrink-0" />Güvenlik işaretlerini okuyabilmek</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 3 — Dersin akışı (3 durak)
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: korunma hiyerarşisi → KKD → işaretler</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce hangi önlemin önce geldiğini öğreniyoruz; sonra son savunma hattı
        olan KKD&apos;yi baştan ayağa inceliyoruz; en son iş yerindeki güvenlik
        işaretlerini okumayı çözüyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Kontrol Hiyerarşisi", items: ["Ortadan kaldırma & ikame", "Mühendislik & idari önlem", "KKD neden en son?"], icon: Layers, accent: "#22c55e" },
          { range: "02", title: "Kişisel Koruyucu Donanım", items: ["Baş, göz, kulak, solunum", "El ve ayak koruması", "Doğru seçim & bakım"], icon: HardHat, accent: "#f59e0b" },
          { range: "03", title: "Güvenlik İşaretleri", items: ["Yasak · uyarı · zorunluluk", "Renk & şekil kodlaması", "Levhaların okunması"], icon: AlertTriangle, accent: "#2563eb" },
        ].map((g, i) => (
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
                  <ChevronRight className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: g.accent }} />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  1. KONTROL HİYERARŞİSİ  ───────────────── */

  // 4 — Section: Kontrol hiyerarşisi
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Kontrol Hiyerarşisi"
      subtitle="Korunmada bir sıra vardır. KKD ilk değil, son akla gelmelidir — çünkü tehlikeyi kaynağında durdurmak her zaman daha güvenlidir."
      bgGradient="linear-gradient(135deg, #22c55e, #15803d)"
      shadow="0 20px 60px -10px rgba(34, 197, 94, 0.6)"
      icon={<Layers className="w-16 h-16 text-white" />}
    />
  ),

  // 5 — Kontrol piramidi
  () => (
    <SlideShell>
      <Eyebrow>5 Basamak</Eyebrow>
      <H2 className="mb-2">Önlem hiyerarşisi · en etkiliden en zayıfa</H2>
      <Sub className="max-w-3xl mb-6">
        Uluslararası İSG uygulamalarında kabul gören sıralama: tehlikeyi önce
        kaynağında kontrol et, en son çareyi çalışanın üzerine giydir.
      </Sub>
      <ControlPyramid />
    </SlideShell>
  ),

  // 6 — Neden KKD en son? — örnekler
  () => (
    <SlideShell>
      <Eyebrow>Mantık</Eyebrow>
      <H2 className="mb-10">Neden KKD en son savunma?</H2>
      <div className="grid md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Skull}
          title="Tehlike yine oradadır"
          desc="KKD tehlikeyi yok etmez; yalnızca çalışan ile tehlike arasına bir bariyer koyar. Bariyer aşılırsa korunma biter."
          accent="#ef4444"
          delay={0.1}
        />
        <FeatureCard
          icon={XCircle}
          title="İnsan hatasına açık"
          desc="Yanlış takılan, eski, hasarlı veya hiç takılmayan KKD korumaz. Etkinliği tamamen kullanıcıya bağlıdır."
          accent="#f59e0b"
          delay={0.2}
        />
        <FeatureCard
          icon={Activity}
          title="Konfor ve süre sınırı"
          desc="Maske, kulaklık, eldiven uzun sürede yorar; çalışan çıkarma eğilimine girer. Mühendislik önlemi sürekli çalışır."
          accent="#06b6d4"
          delay={0.3}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 isg-card-green rounded-xl p-5"
      >
        <div className="text-sm text-gray-200">
          <span className="text-[#4ade80] font-semibold">Örnek:</span> Gürültülü bir
          tezgahta önce makineyi izole et veya sessiz modelle değiştir (mühendislik);
          mümkün değilse vardiyayı kısalt (idari); ancak bunlar yetmezse kulak
          koruyucu (KKD) devreye girer. KKD diğerlerinin yerine değil, üstüne eklenir.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  2. KKD  ───────────────── */

  // 7 — Section: KKD
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Kişisel Koruyucu Donanım"
      subtitle="Baştan ayağa: her vücut bölgesi için ayrı bir tehlike, ayrı bir koruyucu. Doğru ekipmanı doğru riske eşlemek esastır."
      bgGradient="linear-gradient(135deg, #f59e0b, #b45309)"
      shadow="0 20px 60px -10px rgba(245, 158, 11, 0.6)"
      icon={<HardHat className="w-16 h-16 text-white" />}
    />
  ),

  // 8 — KKD diyagramı (baştan ayağa)
  () => (
    <SlideShell>
      <Eyebrow>Baştan Ayağa</Eyebrow>
      <H2 className="mb-6">Vücut bölgesine göre koruyucu</H2>
      <PPEMannequin />
    </SlideShell>
  ),

  // 9 — KKD eşleştirme tablosu (risk → donanım → standart)
  () => (
    <SlideShell>
      <Eyebrow>Eşleştirme</Eyebrow>
      <H2 className="mb-2">Risk → doğru donanım</H2>
      <Sub className="max-w-3xl mb-6">
        KKD seçimi rastgele değildir; tehlikeye ve maruziyet düzeyine göre yapılır.
        Yanlış sınıf bir eldiven, koruyormuş yanılgısı yarattığı için risksizden daha
        tehlikelidir.
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
              <th style={{ width: "26%" }}>Tehlike</th>
              <th style={{ width: "30%" }}>Koruyucu donanım</th>
              <th>Dikkat edilecek nokta</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Düşen / çarpan cisim</td>
              <td>Baret (sınıf G/E), çelik burunlu ayakkabı</td>
              <td>Baret ömrü dolduysa (çatlak, darbe) değiştir.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Toz · kıvılcım · sıçrama</td>
              <td>Koruyucu gözlük / yüz siperi</td>
              <td>Yan korumalı model; buğu önleyici kaplama.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Yüksek gürültü</td>
              <td>Kulak tıkacı veya kulaklık</td>
              <td>Genel kural: gürültü artarsa koruma gerekir.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Toz · gaz · buhar</td>
              <td>Filtreli/yarım yüz maske, gerekirse tam yüz</td>
              <td>Filtre tipi gaza özgüdür; süresi dolunca değişir.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Kesik · kimyasal · sıcak</td>
              <td>İş eldiveni (kesilme/kimyasal sınıfına göre)</td>
              <td>Tek tip eldiven her işe uymaz; sınıfına bak.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  // 10 — KKD doğru kullanım: yapılır / yapılmaz
  () => (
    <SlideShell>
      <Eyebrow>Pratik</Eyebrow>
      <H2 className="mb-10">KKD&apos;de yapılır vs yapılmaz</H2>
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
              "Kullanmadan önce hasar/çatlak kontrolü yap",
              "Bedenine uygun, doğru oturan modeli seç",
              "İşe uygun sınıfta donanım seç (etikete bak)",
              "Kullanım sonrası temizle ve kuru yerde sakla",
              "Filtre / ömrü dolan parçayı zamanında değiştir",
              "Çalışana doğru takma eğitimi ver",
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
              "Hasarlı / son kullanma tarihi geçmiş donanım takma",
              "Başkasının kişisel maskesini paylaşma",
              "Konfor için maskeyi/gözlüğü iş sırasında çıkarma",
              "Yanlış sınıf eldivenle kimyasala dokunma",
              "Bareti ters veya gevşek takma",
              "KKD&apos;yi diğer önlemlerin yerine koyma",
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

  // 11 — Kişisel hijyen & basit emniyet alışkanlıkları
  () => (
    <SlideShell>
      <Eyebrow>Bireysel Tedbir</Eyebrow>
      <H2 className="mb-10">Hijyen ve günlük emniyet alışkanlıkları</H2>
      <div className="grid md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Droplet}
          title="El hijyeni"
          desc="Kimyasal/biyolojik temas sonrası elleri uygun şekilde yıka; eldiven hijyenin yerini tutmaz. Yemekten önce mutlaka temizle."
          accent="#06b6d4"
          delay={0.1}
        />
        <FeatureCard
          icon={Flame}
          title="Kıyafet ve takı"
          desc="Dönen makinede bol kıyafet, kravat, yüzük, kolye takılma riskidir. Saçı topla, gevşek parçaları sabitle."
          accent="#ef4444"
          delay={0.2}
        />
        <FeatureCard
          icon={Wind}
          title="Çalışma ortamı"
          desc="Yeterli havalandırma, düzenli zemin, kayma/takılma yapacak engellerin kaldırılması temel kişisel emniyettir."
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
        <div className="text-sm text-gray-200">
          <span className="text-[#fbbf24] font-semibold">İlke:</span> Kişisel emniyet
          sadece pahalı ekipmanla değil, basit davranışlarla sağlanır — doğru kıyafet,
          temiz eller, derli toplu bir çalışma alanı. Donanımdan önce alışkanlık gelir.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  3. GÜVENLİK İŞARETLERİ  ───────────────── */

  // 12 — Section: Güvenlik işaretleri
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Güvenlik İşaretleri"
      subtitle="İş yerindeki levhalar bir dil konuşur. Renk ve şekil, sözcüğe gerek kalmadan ne yapman ya da yapmaman gerektiğini söyler."
      bgGradient="linear-gradient(135deg, #2563eb, #1e3a8a)"
      shadow="0 20px 60px -10px rgba(37, 99, 235, 0.6)"
      icon={<AlertTriangle className="w-16 h-16 text-white" />}
    />
  ),

  // 13 — İşaret türleri (renk/şekil)
  () => (
    <SlideShell>
      <Eyebrow>Dört Aile</Eyebrow>
      <H2 className="mb-2">İşaretler renk ve şekille konuşur</H2>
      <Sub className="max-w-3xl mb-8">
        Sağlık ve güvenlik işaretleri yönetmeliğine göre işaretler dört temel
        gruba ayrılır. Rengini ve şeklini bilen kişi, yazıyı okumadan anlamını çözer.
      </Sub>
      <SafetySigns />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 isg-card rounded-xl p-4 text-center"
      >
        <div className="text-xs text-gray-300">
          <span className="text-[#60a5fa] font-mono">İPUCU:</span>{" "}
          <span className="text-[#f87171] font-semibold">Kırmızı</span> = dur/yasak,{" "}
          <span className="text-[#fbbf24] font-semibold">Sarı</span> = dikkat/uyarı,{" "}
          <span className="text-[#60a5fa] font-semibold">Mavi</span> = zorunluluk,{" "}
          <span className="text-[#4ade80] font-semibold">Yeşil</span> = güvenli durum / çıkış.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 14 — İşaretleri okuma — örnek levhalar tablosu
  () => (
    <SlideShell>
      <Eyebrow>Sahada Okuma</Eyebrow>
      <H2 className="mb-2">Levhayı gör, davranışı bil</H2>
      <Sub className="max-w-3xl mb-6">
        İşaret yalnızca duvarda asılı bir resim değildir; bir talimattır. Aşağıdaki
        örnekler iş yerinde en sık karşılaşılan işaretlerdir.
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
              <th style={{ width: "22%" }}>Tür</th>
              <th style={{ width: "38%" }}>Örnek levha</th>
              <th>Senden beklenen davranış</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="isg-ppe-pill" style={{ color: "#f87171", borderColor: "#dc2626" }}>Yasak</span></td>
              <td>&quot;Sigara içilmez&quot; · &quot;Yetkisiz giremez&quot;</td>
              <td>Belirtilen eylemi kesinlikle yapma.</td>
            </tr>
            <tr>
              <td><span className="isg-ppe-pill" style={{ color: "#fbbf24", borderColor: "#f59e0b" }}>Uyarı</span></td>
              <td>&quot;Dikkat yüksek gerilim&quot; · &quot;Kaygan zemin&quot;</td>
              <td>Tehlikeye karşı tetikte ol, yavaşla.</td>
            </tr>
            <tr>
              <td><span className="isg-ppe-pill" style={{ color: "#60a5fa", borderColor: "#2563eb" }}>Zorunluluk</span></td>
              <td>&quot;Baret tak&quot; · &quot;Koruyucu gözlük zorunlu&quot;</td>
              <td>Belirtilen KKD&apos;yi mutlaka kullan.</td>
            </tr>
            <tr>
              <td><span className="isg-ppe-pill" style={{ color: "#4ade80", borderColor: "#22c55e" }}>Acil/İlk yardım</span></td>
              <td>&quot;Acil çıkış&quot; · &quot;İlk yardım dolabı&quot;</td>
              <td>Yerini önceden öğren; acil durumda kullan.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  // 15 — Uygulamalı / alıştırma slaytı
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı görev</Eyebrow>
      <H2>Kendi çevreni bir İSG gözüyle tara</H2>
      <Sub className="mt-3 max-w-3xl">
        Bu hafta okuduklarını sahaya taşı. Aşağıdaki dört adımı kendi çalışma/ev/atölye
        ortamında uygula ve sonraki derse kısa bir gözlem notuyla gel.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: ListChecks, title: "KKD envanteri çıkar", desc: "Çevrendeki işlerde hangi KKD gerekiyor, hangisi mevcut? Bir liste yap, eksikleri işaretle.", accent: "#f59e0b" },
          { icon: AlertTriangle, title: "Üç işaret fotoğrafla", desc: "Çevrende gördüğün üç güvenlik levhasını bul; türünü (yasak/uyarı/zorunluluk/acil) yaz.", accent: "#2563eb" },
          { icon: Layers, title: "Bir riski hiyerarşiye yerleştir", desc: "Bir tehlike seç; ortadan kaldırmadan KKD&apos;ye 5 basamağın her birinde ne yapılabileceğini yaz.", accent: "#22c55e" },
          { icon: ClipboardCheck, title: "Tek sayfalık özet", desc: "Risk → uygun KKD eşleşmesini 5 satırda tablolaştır. Yazılı yoklamada bu tablo işine yarar.", accent: "#a855f7" },
        ].map((t, i) => (
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
            <li>Sıra: <span className="isg-token">Kaynak &gt; ortam &gt; KKD</span></li>
            <li>KKD: <span className="isg-token">son savunma</span>, ilk değil</li>
            <li>İşaret: <span className="isg-token">renk + şekil = anlam</span></li>
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
            <li>Donanımı <span className="text-[#fbbf24] font-semibold">riske göre</span> seç</li>
            <li>Hasarlıyı <span className="text-[#fbbf24] font-semibold">kullanma</span></li>
            <li>Levhayı <span className="text-[#fbbf24] font-semibold">talimat</span> say</li>
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
          <span className="text-[#f59e0b] font-semibold">Kişisel emniyet:</span> Doğru
          önlem sırası, doğru donanım ve işaretleri okuyabilme yetkinliğinin toplamıdır.
          Haftaya bunun üzerine inşa edeceğiz.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 17 — Sıradaki hafta önizleme + kapanış
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
        <Eyebrow>5. hafta tamamlandı · sıradaki: Kişisel emniyet — II</Eyebrow>
        <H1 className="isg-shimmer">Korunmayı Derinleştir</H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta temel KKD ve işaretleri kurduk. 6. haftada özel ortamlara
          geçiyoruz: yüksekte çalışma, düşme önleme, kapalı alan ve özel KKD seçimi.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto">
          <FeatureCard
            icon={Shield}
            title="Yüksekte çalışma"
            desc="Emniyet kemeri, paraşüt tipi donanım, yaşam hattı."
            accent="#f59e0b"
            delay={0.1}
          />
          <FeatureCard
            icon={Wind}
            title="Kapalı alan"
            desc="Oksijen ölçümü, havalandırma, giriş izni prosedürü."
            accent="#22c55e"
            delay={0.2}
          />
          <FeatureCard
            icon={Hand}
            title="Özel KKD seçimi"
            desc="Kimyasal, ısı ve elektrik için özel sınıf donanım."
            accent="#06b6d4"
            delay={0.3}
          />
        </div>
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
          Önce kaynakta önle — KKD en son savunmadır.
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
          BVA 1109 · 5. Hafta · Kişisel Emniyet Sağlama
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
