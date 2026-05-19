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
  Target,
  Layers,
  Palette,
  Sparkles,
  Mic,
  Share2,
  Users,
  Eye,
  Type,
  Image as ImageIcon,
  ListChecks,
  Clock,
  MessageSquare,
  Award,
  BookOpen,
  PenTool,
  Play,
  QrCode,
  Download,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Quote,
  Check,
  X,
  Wand2,
  AlertTriangle,
  Zap,
  Lightbulb,
  Brain,
  CheckCircle2,
  XCircle,
  FileText,
  Film,
  Smile,
  Headphones,
  Hash,
  Globe,
  Briefcase,
  TrendingUp,
  Layout as LayoutIcon,
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
        <div className="absolute inset-0 sd-grid-bg pointer-events-none" />
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
      className="inline-flex items-center gap-3 mb-6 text-xs font-mono uppercase tracking-[0.25em] text-[#ee7e42]"
    >
      <span className="w-8 h-px bg-[#ee7e42]" />
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
  accent = "#d04423",
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
      className="sd-card sd-card-hover rounded-xl p-6 transition-all"
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
  accent = "#d04423",
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
      className="sd-card rounded-xl p-5"
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
        <Quote className="w-16 h-16 text-[#ee7e42]/40 mx-auto mb-8" />
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
          <div className="text-lg font-semibold text-[#ee7e42]">{author}</div>
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
          className="inline-flex w-32 h-32 rounded-3xl items-center justify-center mb-8 sd-pulse"
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

function PowerPointMockup({
  title,
  children,
  activeTab = "Tasarım",
}: {
  title: string;
  children: ReactNode;
  activeTab?: string;
}) {
  const tabs = ["Dosya", "Giriş", "Ekle", "Tasarım", "Geçişler", "Animasyonlar", "Slayt Gösterisi"];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="sd-window-chrome w-full"
    >
      <div className="sd-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-semibold flex-1 max-w-md mx-auto text-center justify-center"
          style={{ background: "#0d0d0d", color: "#fed7aa" }}
        >
          <span className="w-5 h-5 rounded-sm sd-p-tile flex items-center justify-center text-[11px]">P</span>
          <span>{title}</span>
        </div>
      </div>
      <div className="sd-ribbon">
        <div className="flex gap-0 px-3 pt-2">
          {tabs.map((t) => (
            <div
              key={t}
              className={`sd-ribbon-tab ${t === activeTab ? "sd-ribbon-tab-active" : ""}`}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
      <div className="p-6 bg-[#1f1f1f]">{children}</div>
    </motion.div>
  );
}

function StepBadge({ n, color = "#d04423" }: { n: number | string; color?: string }) {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
      style={{
        background: `${color}20`,
        border: `1.5px solid ${color}`,
        color,
      }}
    >
      {n}
    </div>
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
        <Eyebrow>13. Hafta · BVA 1108 — Bilgi Teknolojileri</Eyebrow>
        <H1 className="sd-shimmer">
          Sunum Dosyası
          <br />
          Hazırlama
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Sıfırdan slayta: strateji, yapı, tasarım, hareket, sunma ve paylaşım —
          uçtan uca pratik akış.
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 flex items-center justify-center gap-6 flex-wrap"
        >
          <div className="sd-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-md flex items-center justify-center text-lg sd-p-tile">
              P
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">PowerPoint</div>
              <div className="text-[10px] text-gray-500">Endüstri standardı</div>
            </div>
          </div>
          <div className="sd-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-md flex items-center justify-center text-lg sd-k-tile">
              C
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Canva</div>
              <div className="text-[10px] text-gray-500">Şablonlu hız</div>
            </div>
          </div>
          <div className="sd-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-md flex items-center justify-center text-lg sd-g-tile">
              G
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Gamma · AI</div>
              <div className="text-[10px] text-gray-500">Promptla üret</div>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 2 — Why this matters (kötü slayt vs iyi slayt)
  () => (
    <SlideShell>
      <Eyebrow>Neden Önemli?</Eyebrow>
      <H2 className="mb-8">İki slayt, iki dünya</H2>
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <XCircle className="w-5 h-5 text-red-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-red-400">
              Kötü Slayt
            </span>
          </div>
          <div className="sd-slide-mock sd-slide-mock-bad p-4">
            <div className="text-[10px] font-bold mb-1 text-gray-700">
              KONUM AVANTAJLARI VE STRATEJİK YAKLAŞIM
            </div>
            <ul className="text-[7px] text-gray-700 list-disc pl-3 space-y-0.5 leading-tight">
              <li>İlk olarak coğrafi konumumuzun avantajını belirtmek isteriz</li>
              <li>İkinci olarak demografik yapı bizim için fırsat sunuyor</li>
              <li>Üçüncü olarak rekabet analizi yapıldı ve sonuçlar olumlu</li>
              <li>Dördüncü olarak finansal modelleme tamamlandı</li>
              <li>Beşinci olarak pazarlama stratejisi şu şekildedir</li>
              <li>Altıncı olarak operasyon planı 3 fazda uygulanacaktır</li>
              <li>Yedinci olarak riskleri minimize etmek için tedbirler alındı</li>
              <li>Sekizinci olarak ekip yapımız bu işe uygun olarak şekillendi</li>
            </ul>
          </div>
          <div className="mt-3 text-xs text-gray-500">
            <span className="text-red-400">×</span> 8 madde · 6pt font · başlık
            cümle değil rapor · görsel yok
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
              İyi Slayt
            </span>
          </div>
          <div className="sd-slide-mock sd-slide-mock-good p-6 flex flex-col justify-center">
            <div className="text-[10px] uppercase tracking-widest text-orange-300 mb-2">
              Konum
            </div>
            <div className="text-2xl font-bold leading-tight">
              3 saatte
              <br />
              <span className="text-orange-300">40 milyon</span> kişi
            </div>
            <div className="text-[9px] text-slate-400 mt-3">
              İstanbul–Ankara hattı · 2025
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-500">
            <span className="text-emerald-400">✓</span> Bir fikir · büyük tipo ·
            anlamlı sayı · konuşmacıya alan
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 3 — The 6-step framework
  () => (
    <SlideShell>
      <Eyebrow>Yol Haritası</Eyebrow>
      <H2 className="mb-10">6 adımlık sunum hazırlama akışı</H2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { i: 1, icon: Target, t: "Strateji", d: "Kim · Niye · Ne kadar" },
          { i: 2, icon: Layers, t: "Yapı", d: "Storyboard · akış" },
          { i: 3, icon: Palette, t: "Tasarım", d: "Tipo · renk · görsel" },
          { i: 4, icon: Sparkles, t: "Hareket", d: "Geçiş · animasyon" },
          { i: 5, icon: Mic, t: "Sunma", d: "Prova · presenter view" },
          { i: 6, icon: Share2, t: "Paylaşım", d: "Export · QR · cloud" },
        ].map((s, idx) => (
          <motion.div
            key={s.i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + idx * 0.08, duration: 0.45 }}
            className="sd-card sd-card-hover rounded-xl p-5 flex items-start gap-3"
          >
            <StepBadge n={s.i} />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <s.icon className="w-4 h-4 text-[#ee7e42]" />
                <div className="text-base font-semibold text-white">{s.t}</div>
              </div>
              <div className="text-xs text-gray-400">{s.d}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-10 sd-card-orange rounded-xl p-5 text-center"
      >
        <div className="text-sm text-gray-300">
          Slayta dokunmadan önce <span className="text-[#ee7e42] font-semibold">3 adımın</span> bitmiş
          olması gerekir. Tasarım dördüncü adımdır, birincisi değil.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 4 — Quote (Garr Reynolds)
  () => (
    <QuoteSlide
      quote="Slaytlarınız sizin yerinize konuşamaz. Slaytlar görsel destektir, kopya kağıdı değil."
      author="Garr Reynolds"
      role="Presentation Zen yazarı · sunum tasarım uzmanı"
    />
  ),

  /* ─────────────────  1. STRATEJİ  ───────────────── */

  // 5 — Section: Strateji
  () => (
    <SectionDivider
      num="1"
      total="6"
      title="Strateji"
      subtitle="Slayta başlamadan önce: kim için, niye, ne kadar sürede?"
      bgGradient="linear-gradient(135deg, #d04423, #b7472a)"
      shadow="0 20px 60px -10px rgba(208, 68, 35, 0.6)"
      icon={<Target className="w-16 h-16 text-white" />}
    />
  ),

  // 6 — Dinleyici analizi (5W1H)
  () => (
    <SlideShell>
      <Eyebrow>Hedef Kitle</Eyebrow>
      <H2 className="mb-8">Slaytı yazmadan önce 6 soru</H2>
      <div className="grid md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Users}
          title="KİM?"
          desc="Yaş, meslek, ön bilgi seviyesi. Mühendisle CEO'ya aynı slaytı gösteremezsin."
          delay={0.1}
        />
        <FeatureCard
          icon={Brain}
          title="NEDEN?"
          desc="Bilsinler diye mi, ikna olsunlar diye mi, harekete geçsinler diye mi?"
          delay={0.2}
        />
        <FeatureCard
          icon={Lightbulb}
          title="NE BİLİYORLAR?"
          desc="Var olan bilgiye köprü kur — temelden başlama, üzerine ekle."
          delay={0.3}
        />
        <FeatureCard
          icon={Clock}
          title="NE KADAR?"
          desc="5 dk mı 50 dk mı? Süre slayt sayısını ve derinliği belirler."
          delay={0.4}
        />
        <FeatureCard
          icon={Globe}
          title="NEREDE?"
          desc="Yakın küçük oda · büyük salon · Zoom — her biri farklı tipo ve görsel ister."
          delay={0.5}
        />
        <FeatureCard
          icon={Award}
          title="NE BEKLENİYOR?"
          desc="Karar mı, onay mı, geri bildirim mi? Çıktıya göre çağrı (call-to-action) hazırla."
          delay={0.6}
        />
      </div>
    </SlideShell>
  ),

  // 7 — Sunum türü / hedef belirleme
  () => (
    <SlideShell>
      <Eyebrow>Sunum Türü</Eyebrow>
      <H2 className="mb-8">Hedef, tasarımı belirler</H2>
      <div className="space-y-3">
        {[
          {
            t: "Bilgilendirme",
            d: "Yeni kavram öğret · veri özetle · durum güncelle",
            ex: "Staj sunumu · proje raporu · ders anlatımı",
            c: "#3b82f6",
            i: BookOpen,
          },
          {
            t: "İkna",
            d: "Karar aldırt · onay al · destek topla",
            ex: "Pitch deck · bütçe talebi · tez savunması",
            c: "#d04423",
            i: TrendingUp,
          },
          {
            t: "Eğitim",
            d: "Beceri kazandır · uygulama yaptır",
            ex: "Bu sunum gibi · workshop · kurs",
            c: "#10b981",
            i: PenTool,
          },
          {
            t: "İlham",
            d: "Duygu uyandır · vizyon paylaş",
            ex: "TED talk · kapanış konuşması · keynote",
            c: "#a855f7",
            i: Sparkles,
          },
        ].map((row, idx) => (
          <motion.div
            key={row.t}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + idx * 0.1 }}
            className="sd-card rounded-xl p-4 flex items-center gap-5"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${row.c}20`, border: `1px solid ${row.c}50` }}
            >
              <row.i className="w-5 h-5" style={{ color: row.c }} />
            </div>
            <div className="flex-1">
              <div className="text-lg font-semibold text-white">{row.t}</div>
              <div className="text-xs text-gray-400 mt-0.5">{row.d}</div>
            </div>
            <div className="text-xs text-gray-500 italic max-w-xs text-right hidden md:block">
              {row.ex}
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  // 8 — 10-20-30 kuralı
  () => (
    <SlideShell>
      <Eyebrow>Guy Kawasaki Kuralı</Eyebrow>
      <H2 className="mb-10">10 · 20 · 30 kuralı</H2>
      <div className="grid grid-cols-3 gap-6">
        {[
          { n: "10", l: "slayt", d: "İdeal pitch için maksimum slayt sayısı", c: "#d04423" },
          { n: "20", l: "dakika", d: "Konuşma süresi — dikkat süresi bu kadar", c: "#ee7e42" },
          { n: "30", l: "punto", d: "Minimum yazı tipi boyutu — okunabilirlik şartı", c: "#f59e0b" },
        ].map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.55 }}
            className="sd-card-orange rounded-2xl p-8 text-center"
          >
            <div
              className="text-8xl font-black"
              style={{
                background: `linear-gradient(135deg, ${s.c}, #ffffff)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {s.n}
            </div>
            <div className="text-sm uppercase tracking-widest text-[#ee7e42] mt-2 font-semibold">
              {s.l}
            </div>
            <div className="text-xs text-gray-400 mt-4 leading-relaxed">
              {s.d}
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
        className="mt-10 sd-card rounded-xl p-5 text-center"
      >
        <div className="text-sm text-gray-300">
          Kuralı katı uygulama — <span className="text-[#ee7e42] font-semibold">prensip</span> olarak
          tut. Çok satırlı, küçük puntolu slayt görürsen büyük ihtimal yanlış yoldasın.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  2. YAPI  ───────────────── */

  // 9 — Section: Yapı
  () => (
    <SectionDivider
      num="2"
      total="6"
      title="Yapı"
      subtitle="Storyboard ile slayt sırası, üç perde mantığı, bir slayt = bir fikir"
      bgGradient="linear-gradient(135deg, #ee7e42, #d04423)"
      shadow="0 20px 60px -10px rgba(238, 126, 66, 0.6)"
      icon={<Layers className="w-16 h-16 text-white" />}
    />
  ),

  // 10 — Storyboard (sticky notes)
  () => (
    <SlideShell>
      <Eyebrow>Önce Kağıt, Sonra Slayt</Eyebrow>
      <H2 className="mb-8">Storyboard — slayt sırasını post-it'le kur</H2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
        {[
          { t: "Hook", d: "şaşırtıcı veri", c: "" },
          { t: "Sorun", d: "neden burada?", c: "sd-sticky-pink" },
          { t: "Veri", d: "kanıt", c: "sd-sticky-blue" },
          { t: "Çözüm", d: "ana fikir", c: "sd-sticky-green" },
          { t: "Demo", d: "göster", c: "" },
          { t: "CTA", d: "ne yapsınlar?", c: "sd-sticky-pink" },
        ].map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
            className={`sd-sticky ${s.c}`}
          >
            <div className="font-bold text-base">{s.t}</div>
            <div className="text-xs mt-1 opacity-80">{s.d}</div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
        className="grid md:grid-cols-2 gap-4"
      >
        <div className="sd-card-orange rounded-xl p-5">
          <div className="text-sm font-semibold text-white mb-1">Neden kağıt?</div>
          <div className="text-xs text-gray-400 leading-relaxed">
            Yazılım açar açmaz şablon dayatır, font seçtirir, renk seçtirir —
            hikâyeyi unutursun. Önce sırayı belirle, sonra PowerPoint'i aç.
          </div>
        </div>
        <div className="sd-card-green rounded-xl p-5">
          <div className="text-sm font-semibold text-white mb-1">5 dakika kuralı</div>
          <div className="text-xs text-gray-400 leading-relaxed">
            Hikâyeni 5 dakikada bir arkadaşına anlatamıyorsan, slayta dökünce de
            anlatamazsın. Önce sözlü prova.
          </div>
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 11 — Three-act structure
  () => (
    <SlideShell>
      <Eyebrow>Üç Perde</Eyebrow>
      <H2 className="mb-10">Her sunumun aynı omurgası</H2>
      <div className="space-y-4">
        {[
          {
            n: "I",
            t: "Açılış · %20",
            d: "Hook → konu → niye dinlemeli? → harita (ne anlatacaksın)",
            ex: "İlk 30 sn dikkat kaybedersen, slayt 12'de kazanamazsın.",
            c: "#d04423",
          },
          {
            n: "II",
            t: "Gelişme · %65",
            d: "Ana fikir → kanıt → örnek → karşı argüman → cevap. 2–4 alt başlık.",
            ex: "Her alt başlık için: ne, niye, nasıl, örnek.",
            c: "#ee7e42",
          },
          {
            n: "III",
            t: "Sonuç · %15",
            d: "Özet → 1 cümlelik mesaj → harekete çağrı → soru",
            ex: "Son slayt 'Sorular?' değil — özet + kalıcı cümle olsun.",
            c: "#f59e0b",
          },
        ].map((p, i) => (
          <motion.div
            key={p.n}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.15 }}
            className="sd-card rounded-xl p-5 flex items-center gap-5"
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${p.c}, ${p.c}aa)`,
                color: "white",
                boxShadow: `0 8px 24px -8px ${p.c}`,
              }}
            >
              {p.n}
            </div>
            <div className="flex-1">
              <div className="text-lg font-semibold text-white">{p.t}</div>
              <div className="text-sm text-gray-400 mt-1">{p.d}</div>
              <div className="text-xs text-gray-500 mt-2 italic">{p.ex}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  // 12 — Bir slayt bir fikir
  () => (
    <SlideShell>
      <Eyebrow>Lessig Yöntemi</Eyebrow>
      <H2 className="mb-8">Bir slayt = bir fikir</H2>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="sd-slide-mock sd-slide-mock-good p-10 flex flex-col items-center justify-center text-center">
            <div className="text-7xl font-black text-orange-300">%73</div>
            <div className="text-sm text-slate-300 mt-3">
              dinleyici 10 dk sonra konuyu hatırlamıyor
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-3 text-center">
            Tek görsel + tek sayı + tek cümle = sinema sahnesi gibi akar
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-3"
        >
          <div className="text-base text-gray-300 leading-relaxed">
            Lawrence Lessig (Harvard) — slaytları yedek not olarak değil, görsel
            ritm olarak kullandı. Konuşmasında her 15 saniyede 1 slayt.
          </div>
          <div className="sd-card-orange rounded-lg p-4">
            <div className="text-xs uppercase tracking-wider text-[#ee7e42] mb-2 font-semibold">
              Pratik kural
            </div>
            <div className="text-sm text-gray-300">
              Slayt yapımı bitince her birini 3 saniye bakıp anlat. Anlamadığın
              veya 3 fikir gördüğün slayt → ikiye böl.
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3. TASARIM  ───────────────── */

  // 13 — Section: Tasarım
  () => (
    <SectionDivider
      num="3"
      total="6"
      title="Tasarım"
      subtitle="Tipografi, renk, hizalama, görsel — slaytın görsel dili"
      bgGradient="linear-gradient(135deg, #a855f7, #d04423)"
      shadow="0 20px 60px -10px rgba(168, 85, 247, 0.5)"
      icon={<Palette className="w-16 h-16 text-white" />}
    />
  ),

  // 14 — Typography
  () => (
    <SlideShell>
      <Eyebrow>Tipografi</Eyebrow>
      <H2 className="mb-8">Yazı, slaytın sesidir</H2>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="sd-card rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-wider text-[#ee7e42] mb-3 font-semibold">
            Sans-serif · ekran
          </div>
          <div className="sd-font-sans text-4xl text-white mb-2">Aa Bb</div>
          <div className="sd-font-sans text-sm text-gray-300 leading-relaxed">
            Inter, Helvetica, Calibri, Segoe UI — projeksiyonda net okunur.
            <strong className="text-white"> Varsayılan tercih.</strong>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="sd-card rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-wider text-[#ee7e42] mb-3 font-semibold">
            Serif · klasik / akademik
          </div>
          <div className="sd-font-serif text-4xl text-white mb-2">Aa Bb</div>
          <div className="sd-font-serif text-sm text-gray-300 leading-relaxed">
            Georgia, Times, Merriweather — tez, edebiyat, hukuk sunumlarında.
            Küçük ekranda yorucu.
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        {[
          { l: "Başlık", v: "≥ 36pt" },
          { l: "Alt başlık", v: "≥ 24pt" },
          { l: "Gövde", v: "≥ 18pt" },
          { l: "Yazı tipi sayısı", v: "≤ 2" },
        ].map((s) => (
          <div key={s.l} className="sd-card-orange rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-[#ee7e42]">{s.v}</div>
            <div className="text-[10px] uppercase tracking-wider text-gray-400 mt-1">
              {s.l}
            </div>
          </div>
        ))}
      </motion.div>
    </SlideShell>
  ),

  // 15 — Color & contrast
  () => (
    <SlideShell>
      <Eyebrow>Renk · Kontrast</Eyebrow>
      <H2 className="mb-8">3 renkten fazlasına ihtiyacın yok</H2>
      <div className="grid md:grid-cols-3 gap-5 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="sd-card rounded-xl p-5"
        >
          <div className="sd-swatch mb-3" style={{ background: "#0f172a" }} />
          <div className="text-sm font-semibold text-white">Arka plan</div>
          <div className="text-xs text-gray-400 mt-1">
            Koyu (#0f172a) veya saf beyaz. Gri renkli arka plan = kontrast
            ölür.
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="sd-card rounded-xl p-5"
        >
          <div className="sd-swatch mb-3" style={{ background: "#f1f5f9" }} />
          <div className="text-sm font-semibold text-white">Metin</div>
          <div className="text-xs text-gray-400 mt-1">
            Saf beyaz veya saf siyah değil — gözü yorar. #f1f5f9 / #1f2937
            tercih et.
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="sd-card rounded-xl p-5"
        >
          <div className="sd-swatch mb-3" style={{ background: "#d04423" }} />
          <div className="text-sm font-semibold text-white">Vurgu</div>
          <div className="text-xs text-gray-400 mt-1">
            Tek bir vurgu rengi. Önemli rakam, başlık, CTA → sadece bu renk.
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="grid md:grid-cols-2 gap-4"
      >
        <div className="sd-card-orange rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#ee7e42] flex-shrink-0 mt-0.5" />
          <div className="text-xs text-gray-300 leading-relaxed">
            <strong className="text-white">WCAG AA:</strong> metin/arka plan
            kontrast oranı ≥ 4.5:1. Sarı zemin sarı yazı sınıfta olmaz.
          </div>
        </div>
        <div className="sd-card-green rounded-xl p-4 flex items-start gap-3">
          <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-gray-300 leading-relaxed">
            <strong className="text-white">Paleti hazır al:</strong>{" "}
            coolors.co, color.adobe.com, Tailwind palette — uydurma renk
            karıştırma.
          </div>
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 16 — Layout & whitespace
  () => (
    <SlideShell>
      <Eyebrow>Hizalama · Boşluk</Eyebrow>
      <H2 className="mb-8">Boşluk yokluğu değildir — tasarımdır</H2>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-xs uppercase tracking-wider text-red-400 mb-2 font-semibold">
            × Karmaşa
          </div>
          <div className="sd-slide-mock sd-slide-mock-bad p-3 text-[8px] relative">
            <div className="absolute top-2 left-2 bg-blue-200 px-1">Logo</div>
            <div className="absolute top-2 right-2 text-gray-700 text-right">
              13.05.2026
              <br />
              v3.2 FINAL
            </div>
            <div className="absolute top-8 left-2 right-2 text-center font-bold text-[10px]">
              ÜRÜN YOL HARİTASI VE STRATEJİK İLERLEME
            </div>
            <div className="absolute top-16 left-2 right-2 text-[7px] leading-tight">
              <ul className="list-disc pl-3 space-y-0">
                <li>Q1: kullanıcı araştırması, persona, journey</li>
                <li>Q2: MVP geliştirme, alpha test, KPI tanımı</li>
                <li>Q3: beta launch, kullanıcı geri bildirimi</li>
                <li>Q4: ölçek, optimizasyon, B2B kanal</li>
              </ul>
            </div>
            <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[6px]">
              <span>www.firma.com</span>
              <span>info@firma.com</span>
              <span>Sayfa 7</span>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="text-xs uppercase tracking-wider text-emerald-400 mb-2 font-semibold">
            ✓ Nefes alan
          </div>
          <div className="sd-slide-mock sd-slide-mock-good p-8 flex flex-col justify-center">
            <div className="text-[10px] uppercase tracking-widest text-orange-300 mb-3">
              Q2 hedef
            </div>
            <div className="text-3xl font-bold leading-tight">
              MVP'yi
              <br />
              <span className="text-orange-300">100 kişiye</span> aç
            </div>
            <div className="text-[10px] text-slate-400 mt-4">
              Alpha test · Mayıs
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="mt-6 grid grid-cols-3 gap-3 text-center"
      >
        {[
          { v: "%40+", l: "Slaytın beyaz alan oranı" },
          { v: "Sola", l: "Varsayılan hizalama (orta dikkati dağıtır)" },
          { v: "8 / 16", l: "Tutarlı boşluk birimi (px)" },
        ].map((s) => (
          <div key={s.l} className="sd-card rounded-lg p-3">
            <div className="text-xl font-bold text-[#ee7e42]">{s.v}</div>
            <div className="text-[10px] text-gray-400 mt-1">{s.l}</div>
          </div>
        ))}
      </motion.div>
    </SlideShell>
  ),

  // 17 — Görseller & ikonlar
  () => (
    <SlideShell>
      <Eyebrow>Görsel · İkon</Eyebrow>
      <H2 className="mb-8">Bir görsel, bin kelime — doğru görselse</H2>
      <div className="grid md:grid-cols-2 gap-5 mb-6">
        <FeatureCard
          icon={ImageIcon}
          title="Yüksek çözünürlük"
          desc="Minimum 1920×1080. Bulanık görsel = profesyonelliği öldürür."
          accent="#d04423"
          delay={0.1}
        />
        <FeatureCard
          icon={LayoutIcon}
          title="Tam kenar (full bleed)"
          desc="Görsel slaytın tamamını kaplasın — küçük kutu içine sokma."
          accent="#ee7e42"
          delay={0.2}
        />
        <FeatureCard
          icon={Hash}
          title="Tek ikon stili"
          desc="Outline ya da fill — karıştırma. Lucide, Heroicons, Phosphor: birini seç."
          accent="#f59e0b"
          delay={0.3}
        />
        <FeatureCard
          icon={Briefcase}
          title="Telif"
          desc="Unsplash, Pexels, Pixabay (ücretsiz) · Adobe Stock (lisanslı). Google Images = riskli."
          accent="#a855f7"
          delay={0.4}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="sd-card-orange rounded-xl p-4 flex items-start gap-3"
      >
        <Wand2 className="w-5 h-5 text-[#ee7e42] flex-shrink-0 mt-0.5" />
        <div className="text-xs text-gray-300 leading-relaxed">
          <strong className="text-white">2026 ipucu:</strong> Stok fotoğraf yerine
          AI üretici (DALL·E, Midjourney, Adobe Firefly) — markaya özel görsel,
          telif derdi yok. Üretirken &ldquo;cinematic, soft lighting, 16:9&rdquo;
          ekle.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  4. HAREKET  ───────────────── */

  // 18 — Section: Hareket
  () => (
    <SectionDivider
      num="4"
      total="6"
      title="Hareket"
      subtitle="Geçişler, animasyonlar, PowerPoint Designer — niyetli kullanım"
      bgGradient="linear-gradient(135deg, #06b6d4, #a855f7)"
      shadow="0 20px 60px -10px rgba(6, 182, 212, 0.5)"
      icon={<Sparkles className="w-16 h-16 text-white" />}
    />
  ),

  // 19 — Transitions
  () => (
    <SlideShell>
      <Eyebrow>Geçişler</Eyebrow>
      <H2 className="mb-8">Slayt geçişi: göstermelik değil, anlam</H2>
      <PowerPointMockup title="Sunum1.pptx" activeTab="Geçişler">
        <div className="grid grid-cols-5 gap-2 text-[10px]">
          {[
            { n: "Yok", g: "#1f1f1f", ok: "neutral" },
            { n: "Belir", g: "linear-gradient(135deg, #2a2a2a, #3a3a3a)", ok: "good" },
            { n: "Sil", g: "linear-gradient(135deg, #3a3a3a, #4a4a4a)", ok: "good" },
            { n: "Morph", g: "linear-gradient(135deg, #d04423, #ee7e42)", ok: "great" },
            { n: "Çevir", g: "linear-gradient(135deg, #4a4a4a, #5a5a5a)", ok: "bad" },
          ].map((t, i) => (
            <motion.div
              key={t.n}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="rounded p-3 text-center"
              style={{ background: t.g }}
            >
              <div className="aspect-video bg-white/10 rounded mb-2 flex items-center justify-center text-white/50">
                □
              </div>
              <div className="text-white font-semibold">{t.n}</div>
              <div
                className="text-[8px] mt-1"
                style={{
                  color:
                    t.ok === "great"
                      ? "#86efac"
                      : t.ok === "good"
                        ? "#fde68a"
                        : t.ok === "bad"
                          ? "#fca5a5"
                          : "#9ca3af",
                }}
              >
                {t.ok === "great"
                  ? "★ ideal"
                  : t.ok === "good"
                    ? "ok"
                    : t.ok === "bad"
                      ? "× kullanma"
                      : "—"}
              </div>
            </motion.div>
          ))}
        </div>
      </PowerPointMockup>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
        className="mt-6 sd-card-orange rounded-xl p-4 text-sm text-gray-300"
      >
        <strong className="text-[#ee7e42]">Kural:</strong> Tüm slaytlarda{" "}
        <span className="font-semibold text-white">aynı</span> geçiş kullan
        (Belir, Sil veya Morph). Slayttan slayta farklı geçiş = sirk.
      </motion.div>
    </SlideShell>
  ),

  // 20 — Animations
  () => (
    <SlideShell>
      <Eyebrow>Animasyon</Eyebrow>
      <H2 className="mb-8">Hareket bir araçtır, süs değil</H2>
      <div className="grid md:grid-cols-2 gap-5 mb-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="sd-card-green rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <Check className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-semibold text-white">
              İyi animasyon kullanımı
            </span>
          </div>
          <ul className="text-xs text-gray-300 space-y-2">
            <li>
              <strong className="text-emerald-400">Sıralı açıklama:</strong>{" "}
              maddeler tek tek belirir, konuşmaya senkron
            </li>
            <li>
              <strong className="text-emerald-400">Vurgu:</strong> tek bir
              kelimeyi büyüt, renklendir
            </li>
            <li>
              <strong className="text-emerald-400">Karşılaştırma:</strong>{" "}
              önce/sonra geçişi
            </li>
            <li>
              <strong className="text-emerald-400">Süreç:</strong> akış oku
              ilerlesin
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="sd-card rounded-xl p-5"
          style={{ borderColor: "rgba(220, 38, 38, 0.3)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <X className="w-5 h-5 text-red-400" />
            <span className="text-sm font-semibold text-white">
              Yapma — kategorik
            </span>
          </div>
          <ul className="text-xs text-gray-300 space-y-2">
            <li>
              <strong className="text-red-400">Zıplayan / dönen:</strong> ağırbaşlı
              sunumu komediye çevirir
            </li>
            <li>
              <strong className="text-red-400">Her objeye animasyon:</strong>{" "}
              dikkat dağılır
            </li>
            <li>
              <strong className="text-red-400">Yavaş animasyon:</strong> 0.5 sn
              üstü = sıkıcı
            </li>
            <li>
              <strong className="text-red-400">Otomatik döngü:</strong>{" "}
              dinleyici yerine slaydı izler
            </li>
          </ul>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="sd-timeline flex items-center gap-3"
      >
        <Play className="w-4 h-4 text-[#d04423]" />
        <div className="flex-1">
          <div className="text-[10px] text-gray-500 mb-1 font-mono">
            ÖRNEK ZAMAN ÇİZELGESİ · sıralı belirme
          </div>
          <div className="grid grid-cols-4 gap-1">
            <div className="sd-timeline-bar" style={{ opacity: 1 }} />
            <div className="sd-timeline-bar" style={{ opacity: 0.7 }} />
            <div className="sd-timeline-bar" style={{ opacity: 0.4 }} />
            <div className="sd-timeline-bar" style={{ opacity: 0.2 }} />
          </div>
        </div>
        <div className="text-[10px] text-gray-500 font-mono">0.3 sn × 4 madde</div>
      </motion.div>
    </SlideShell>
  ),

  // 21 — PowerPoint Designer / AI
  () => (
    <SlideShell>
      <Eyebrow>AI Yardımcılar</Eyebrow>
      <H2 className="mb-8">2026'da tek başına çizmiyorsun</H2>
      <div className="grid md:grid-cols-3 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="sd-card sd-card-hover rounded-xl p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg sd-p-tile flex items-center justify-center font-black">
              P
            </div>
            <div className="text-base font-semibold text-white">
              Designer
            </div>
          </div>
          <div className="text-xs text-gray-400 mb-3 leading-relaxed">
            PowerPoint sağ panelde otomatik layout önerir. Resim ekle, görsel
            yerleşim tasarımları öner.
          </div>
          <div className="text-[10px] text-[#ee7e42] font-mono">
            Tasarım › Tasarım Fikirleri
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="sd-card sd-card-hover rounded-xl p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg sd-g-tile flex items-center justify-center font-black">
              G
            </div>
            <div className="text-base font-semibold text-white">
              Gamma AI
            </div>
          </div>
          <div className="text-xs text-gray-400 mb-3 leading-relaxed">
            Prompt yaz, 30 saniyede komple sunum. &ldquo;BVA staj sunumu, 12
            slayt, finans odaklı&rdquo; → hazır.
          </div>
          <div className="text-[10px] text-[#ee7e42] font-mono">
            gamma.app · prompt-to-deck
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="sd-card sd-card-hover rounded-xl p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg sd-k-tile flex items-center justify-center font-black">
              C
            </div>
            <div className="text-base font-semibold text-white">
              Canva Magic
            </div>
          </div>
          <div className="text-xs text-gray-400 mb-3 leading-relaxed">
            Magic Design — konu yaz, şablon + içerik üret. Marka kit yükle,
            tutarlı çıktı.
          </div>
          <div className="text-[10px] text-[#ee7e42] font-mono">
            canva.com · Magic Design
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 sd-card-orange rounded-xl p-4 flex items-start gap-3"
      >
        <Zap className="w-5 h-5 text-[#ee7e42] flex-shrink-0 mt-0.5" />
        <div className="text-xs text-gray-300 leading-relaxed">
          <strong className="text-white">Altın kural:</strong> AI 0 → %70'i hızlı
          getirir. Son %30 (hikaye, vurgu, doğruluk, marka) hâlâ senin işin.
          Üretilen slaytları olduğu gibi sunma — düzenle.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  5. SUNMA  ───────────────── */

  // 22 — Section: Sunma
  () => (
    <SectionDivider
      num="5"
      total="6"
      title="Sunma"
      subtitle="Speaker view, prova, beden dili — slayt yarısı, sen yarısı"
      bgGradient="linear-gradient(135deg, #10b981, #06b6d4)"
      shadow="0 20px 60px -10px rgba(16, 185, 129, 0.5)"
      icon={<Mic className="w-16 h-16 text-white" />}
    />
  ),

  // 23 — Speaker notes / Presenter view
  () => (
    <SlideShell>
      <Eyebrow>Sunucu Görünümü</Eyebrow>
      <H2 className="mb-8">Presenter View — gizli süper güç</H2>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="sd-window-chrome p-3 mb-5"
      >
        <div className="grid grid-cols-3 gap-3 text-[10px]">
          <div className="col-span-2 sd-slide-mock sd-slide-mock-good p-4 flex flex-col justify-center">
            <div className="text-orange-300 text-[8px] uppercase tracking-widest">
              Slayt 5 / 32
            </div>
            <div className="text-2xl font-bold mt-2">Hedef Kitle</div>
            <div className="text-xs text-slate-400 mt-1">6 soruyla başla</div>
          </div>
          <div className="space-y-2">
            <div className="bg-slate-800/60 rounded p-2 text-slate-300">
              <div className="text-[8px] text-emerald-300 mb-1">SONRAKİ</div>
              <div className="text-[10px]">Sunum türü</div>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded p-2 text-amber-200">
              <div className="text-[8px] text-amber-300 mb-1">NOTLAR</div>
              <div className="text-[9px] leading-tight">
                Burada Demingʼi an. 2 örnek hazır: pizza pitch, tez savunma.
              </div>
            </div>
            <div className="bg-slate-800/60 rounded p-2 text-slate-300 flex items-center gap-1">
              <Clock className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] font-mono">04:32 / 20:00</span>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="sd-card rounded-xl p-4"
        >
          <div className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#ee7e42]" /> Ne görür?
          </div>
          <div className="text-xs text-gray-400 leading-relaxed">
            Mevcut slayt · sıradaki slayt · notların · süre sayacı · sayfa numarası.
            Dinleyici sadece slaytı görür.
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="sd-card rounded-xl p-4"
        >
          <div className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#ee7e42]" /> Nasıl açılır?
          </div>
          <div className="text-xs text-gray-400 leading-relaxed">
            PowerPoint: Slayt Gösterisi › <span className="font-mono">Alt+F5</span>.
            Mac Keynote: otomatik. Zoom: &ldquo;İkinci ekrana sun&rdquo;.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 24 — Prova teknikleri
  () => (
    <SlideShell>
      <Eyebrow>Prova</Eyebrow>
      <H2 className="mb-8">Ezber değil, akıcılık</H2>
      <div className="space-y-3">
        {[
          {
            n: 1,
            t: "Sesli oku — slaytları çevir",
            d: "İlk turda her slayta ne diyeceğini sesli söyle. Bocaladığın yerleri işaretle.",
            i: MessageSquare,
            c: "#d04423",
          },
          {
            n: 2,
            t: "Telefonla ses kaydet, dinle",
            d: "Kendi sesini duymak garip ama 1 turda %50 düzeltirsin. &ldquo;Hım, şey, yani&rdquo; sayar.",
            i: Headphones,
            c: "#ee7e42",
          },
          {
            n: 3,
            t: "Süre tut — 3 kez",
            d: "Hedef sürenin %90'ında bitir. Sahnede %10 yavaşlarsın (heyecan, soru).",
            i: Clock,
            c: "#f59e0b",
          },
          {
            n: 4,
            t: "Bir arkadaşa anlat",
            d: "Yüzlerden geri bildirim. Sıkıldığı yer = atılacak slayt.",
            i: Users,
            c: "#10b981",
          },
          {
            n: 5,
            t: "Presenter Coach (PowerPoint)",
            d: "Slayt Gösterisi › Coach ile sun → AI hızını, &ldquo;hım&rdquo;ları, kelime tekrarını ölçer.",
            i: Brain,
            c: "#06b6d4",
          },
        ].map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="sd-card rounded-xl p-4 flex items-center gap-4"
          >
            <StepBadge n={s.n} color={s.c} />
            <s.i className="w-5 h-5 flex-shrink-0" style={{ color: s.c }} />
            <div className="flex-1">
              <div className="text-base font-semibold text-white">{s.t}</div>
              <div className="text-xs text-gray-400 mt-0.5">{s.d}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  // 25 — Beden dili & sahne
  () => (
    <SlideShell>
      <Eyebrow>Sahne</Eyebrow>
      <H2 className="mb-10">Slaytın yarısı, sen yarısı</H2>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          {[
            { t: "Göz teması", d: "3–5 sn aynı kişiye, sonra başka. Salona böl: sol-orta-sağ." },
            { t: "Eller dışarıda", d: "Cebe sokma, arkaya bağlama, yumruk yapma. Avuçlar görünsün — güven sinyali." },
            { t: "Pozisyon değişimi", d: "Bölüm geçişinde yer değiştir. Aynı yerde donmak = monoton." },
          ].map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="sd-card rounded-lg p-3"
            >
              <div className="text-sm font-semibold text-white">{s.t}</div>
              <div className="text-xs text-gray-400 mt-1">{s.d}</div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          {[
            { t: "Ses tonu", d: "Tek ton = uyutur. Önemli cümlede ses alçal — dinleyici öne eğilir." },
            { t: "Sessizlik", d: "Anahtar cümleden sonra 2 sn dur. Sözden değil, susmadan vurur." },
            { t: "Slayta dönme", d: "Slayta dönüp okuma. Sırtın dinleyiciye = saygısızlık." },
          ].map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="sd-card rounded-lg p-3"
            >
              <div className="text-sm font-semibold text-white">{s.t}</div>
              <div className="text-xs text-gray-400 mt-1">{s.d}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
        className="mt-6 sd-card-orange rounded-xl p-4 flex items-center gap-3"
      >
        <Smile className="w-5 h-5 text-[#ee7e42] flex-shrink-0" />
        <div className="text-xs text-gray-300">
          İlk 30 saniyede{" "}
          <span className="text-[#ee7e42] font-semibold">gülümse</span>. Salondaki
          gerginlik yarıya iner — hem seninki hem onlarınki.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  6. PAYLAŞIM  ───────────────── */

  // 26 — Section: Paylaşım
  () => (
    <SectionDivider
      num="6"
      total="6"
      title="Paylaşım"
      subtitle="Export, erişilebilirlik, QR ve bulut — sunum bitince başlıyor"
      bgGradient="linear-gradient(135deg, #3b82f6, #10b981)"
      shadow="0 20px 60px -10px rgba(59, 130, 246, 0.5)"
      icon={<Share2 className="w-16 h-16 text-white" />}
    />
  ),

  // 27 — Export formatları
  () => (
    <SlideShell>
      <Eyebrow>Export</Eyebrow>
      <H2 className="mb-8">Bir sunum, dört format</H2>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          {
            f: ".PPTX",
            t: "Düzenlenebilir",
            d: "Aslı. Geliştirmek isteyenle paylaş — orijinal animasyon ve notlar.",
            ic: FileText,
            c: "#d04423",
          },
          {
            f: ".PDF",
            t: "Salt okunur · evrensel",
            d: "E-posta eki, ders dosyası, basılı kopya. Notlu / 4-up sayfa seçeneği var.",
            ic: Download,
            c: "#ee7e42",
          },
          {
            f: ".MP4",
            t: "Video kaydı + ses",
            d: "Sunucu yokken kullanılır. Slayt Gösterisi › Kaydet › Video Olarak Dışa Aktar.",
            ic: Film,
            c: "#a855f7",
          },
          {
            f: "Web link",
            t: "Bulut paylaşım",
            d: "OneDrive / Google Slides / Gamma — link gönder, tarayıcıda açılsın.",
            ic: Globe,
            c: "#06b6d4",
          },
        ].map((row, i) => (
          <motion.div
            key={row.f}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="sd-card sd-card-hover rounded-xl p-5 flex items-start gap-4"
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: `${row.c}20`,
                border: `1px solid ${row.c}50`,
              }}
            >
              <row.ic className="w-6 h-6" style={{ color: row.c }} />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-1">
                <span
                  className="text-base font-bold font-mono"
                  style={{ color: row.c }}
                >
                  {row.f}
                </span>
                <span className="text-sm font-semibold text-white">
                  {row.t}
                </span>
              </div>
              <div className="text-xs text-gray-400 leading-relaxed">
                {row.d}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  // 28 — Erişilebilirlik
  () => (
    <SlideShell>
      <Eyebrow>Erişilebilirlik</Eyebrow>
      <H2 className="mb-8">Herkes okuyabilsin diye</H2>
      <div className="grid md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="sd-card rounded-xl p-5"
        >
          <div className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#ee7e42]" />
            Görme engelli okuyucular için
          </div>
          <ul className="text-xs text-gray-300 space-y-2">
            <li>
              <strong className="text-white">Alt metin:</strong> her resme sağ
              tıkla › Alt Metin Ekle. Ekran okuyucu okur.
            </li>
            <li>
              <strong className="text-white">Okuma sırası:</strong> Düzen › Okuma
              Sırası — slayt sıraları net olsun.
            </li>
            <li>
              <strong className="text-white">Renkle değil etiketle:</strong>{" "}
              &ldquo;kırmızı kısım&rdquo; demek yerine etiket koy.
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="sd-card rounded-xl p-5"
        >
          <div className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Hash className="w-4 h-4 text-[#ee7e42]" />
            Salondaki herkes için
          </div>
          <ul className="text-xs text-gray-300 space-y-2">
            <li>
              <strong className="text-white">Yüksek kontrast:</strong> projeksiyon
              soluk olur — koyu zemin + açık yazı.
            </li>
            <li>
              <strong className="text-white">Büyük tipo:</strong> arka sıradaki
              da okuyabilsin → 24pt minimum.
            </li>
            <li>
              <strong className="text-white">Altyazı (live caption):</strong>{" "}
              PowerPoint Slayt Gösterisi › Altyazılar — gerçek zamanlı.
            </li>
          </ul>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 sd-card-orange rounded-xl p-4 flex items-start gap-3"
      >
        <CheckCircle2 className="w-5 h-5 text-[#ee7e42] flex-shrink-0 mt-0.5" />
        <div className="text-xs text-gray-300 leading-relaxed">
          <strong className="text-white">Erişilebilirlik Denetçisi:</strong>{" "}
          Dosya › Bilgi › Sorunları Denetle › Erişilebilirliği Denetle — eksik
          alt metin, düşük kontrast, başlık eksik slaytları listeler.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 29 — QR & cloud paylaşım
  () => (
    <SlideShell>
      <Eyebrow>Anlık Paylaşım</Eyebrow>
      <H2 className="mb-8">QR kod = link yazdırmadan eline ver</H2>
      <div className="grid md:grid-cols-3 gap-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="sd-card-orange rounded-xl p-6 text-center"
        >
          <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center">
            <QrCode className="w-24 h-24 text-[#d04423]" />
          </div>
          <div className="text-sm font-semibold text-white">Son slaytta QR</div>
          <div className="text-xs text-gray-400 mt-2">
            Slaytları indirme · feedback formu · referanslar
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="sd-card rounded-xl p-5"
        >
          <div className="text-xs uppercase tracking-wider text-[#ee7e42] mb-2 font-semibold">
            Bulut seçenekleri
          </div>
          <ul className="text-xs text-gray-300 space-y-2">
            <li>
              <strong className="text-white">OneDrive:</strong> Office 365 ile
              hazır gelir
            </li>
            <li>
              <strong className="text-white">Google Drive:</strong> Slides linki
              + yorum izni
            </li>
            <li>
              <strong className="text-white">Gamma:</strong> sunum + analytics
              (kim ne kadar baktı)
            </li>
            <li>
              <strong className="text-white">SlideShare:</strong> SEO + portfolio
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="sd-card rounded-xl p-5"
        >
          <div className="text-xs uppercase tracking-wider text-[#ee7e42] mb-2 font-semibold">
            QR nasıl üretilir
          </div>
          <ul className="text-xs text-gray-300 space-y-2">
            <li>
              <strong className="text-white">qr-code-generator.com</strong> —
              ücretsiz, logo + renk
            </li>
            <li>
              <strong className="text-white">PowerPoint eklentisi:</strong>{" "}
              Insert › QR Code
            </li>
            <li>
              <strong className="text-white">İpucu:</strong> bit.ly ile kısalt,
              QR daha sade çıkar
            </li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  KAPANIŞ  ───────────────── */

  // 30 — Yedi ölümcül günah
  () => (
    <SlideShell>
      <Eyebrow>Anti-Pattern</Eyebrow>
      <H2 className="mb-8">Sunumun yedi ölümcül günahı</H2>
      <div className="grid md:grid-cols-2 gap-3">
        {[
          { t: "Slaytı okumak", d: "Dinleyici 5x daha hızlı okur. Geride kalan sensin." },
          { t: "8+ maddeli liste", d: "Cognitive load patlar — kimse hatırlamaz." },
          { t: "Clipart / WordArt", d: "1995 estetiği. 2026'da yapma." },
          { t: "Karşıt renkli zemin", d: "Sarı-mor, kırmızı-yeşil → gözden okur, beyinden okumaz." },
          { t: "&ldquo;Sorular?&rdquo; final slaytı", d: "Boş slayt = boş soru. Özet + CTA bırak." },
          { t: "Şablon mezarlığı", d: "PowerPoint hazır şablon — herkes kullanır, kişiliksizdir." },
          { t: "Saat kontrol etmeden prova", d: "Sahnede 30 dk sunum 50 dk olur — felakettir." },
        ].map((g, i) => (
          <motion.div
            key={g.t}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 + i * 0.06 }}
            className="sd-card rounded-lg p-3 flex items-start gap-3"
            style={{ borderColor: "rgba(220, 38, 38, 0.25)" }}
          >
            <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-white">{g.t}</div>
              <div className="text-xs text-gray-400 mt-0.5">{g.d}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  // 31 — 12 maddelik checklist
  () => (
    <SlideShell>
      <Eyebrow>Son Kontrol</Eyebrow>
      <H2 className="mb-8">Sunmadan önce — 12 madde</H2>
      <div className="grid md:grid-cols-2 gap-2">
        {[
          "Dinleyici, süre, hedef yazılı mı?",
          "Storyboard 3 perdeye oturuyor mu?",
          "Her slayt tek bir fikir mi anlatıyor?",
          "Font boyutu ≥ 24pt mı? (gövde)",
          "Kontrast oranı ≥ 4.5:1 mi?",
          "Vurgu rengi sadece 1 mi?",
          "Görseller 1920×1080 üstü mü?",
          "Geçişler tek tip + sade mi?",
          "Speaker notes hazır mı?",
          "Bir kez sesli prova yapıldı mı?",
          "Süre %90 hedef altında mı?",
          "Yedek (USB + bulut + PDF) var mı?",
        ].map((q, i) => (
          <motion.div
            key={q}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 + i * 0.04 }}
            className="sd-check-row"
          >
            <div
              className="w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5"
              style={{ borderColor: "#d04423", background: "transparent" }}
            />
            <div className="text-sm text-gray-200">{q}</div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-center text-xs text-gray-500"
      >
        12 / 12 ✓ ise sunabilirsin. 1 bile eksikse sunma — düzelt, sonra.
      </motion.div>
    </SlideShell>
  ),

  // 32 — Teşekkürler / kapanış
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-3xl items-center justify-center mb-8 sd-pulse"
          style={{
            background: "linear-gradient(135deg, #d04423, #ee7e42)",
            boxShadow: "0 20px 60px -10px rgba(208, 68, 35, 0.6)",
          }}
        >
          <PresentationIcon className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>13. Hafta · Final</Eyebrow>
        <H1 className="sd-shimmer">İyi sunumlar!</H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Slayt bir araç, sen mesajsın. Strateji → yapı → tasarım → hareket →
          sunma → paylaşım. Sıra hep aynı.
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto"
        >
          {[
            { t: "Presentation Zen", a: "Garr Reynolds" },
            { t: "Slide:ology", a: "Nancy Duarte" },
            { t: "Resonate", a: "Nancy Duarte" },
            { t: "TED Talks", a: "Chris Anderson" },
          ].map((b) => (
            <div key={b.t} className="sd-card rounded-lg p-3 text-left">
              <div className="text-xs font-semibold text-white">{b.t}</div>
              <div className="text-[10px] text-gray-500 mt-0.5">{b.a}</div>
            </div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10 text-xs text-gray-600 font-mono"
        >
          BVA 1108 · Bilgi Teknolojileri · Öğr. Gör. Osman Can Çetlenbik
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
            background: "linear-gradient(90deg, #d04423, #ee7e42, #d04423)",
            boxShadow: "0 0 16px rgba(208,68,35,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#ee7e42]/70">
          BVA 1108 · 13. Hafta · Sunum Dosyası Hazırlama
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[#ee7e42]/50">
            <span className="text-[#ee7e42]">
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
            className="p-1.5 text-gray-500 hover:text-[#ee7e42] transition-colors"
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
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#ee7e42] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
                  ? "w-5 bg-[#ee7e42]"
                  : "w-1.5 bg-white/15 hover:bg-white/40"
              }`}
              style={
                i === current
                  ? { boxShadow: "0 0 10px rgba(238,126,66,0.6)" }
                  : undefined
              }
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#ee7e42] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
