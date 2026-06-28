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
  Check,
  X,
  Sparkles,
  Flame,
  CheckCircle2,
  XCircle,
  Calendar,
  Globe,
  GraduationCap,
  Heart,
  HeartPulse,
  Phone,
  Activity,
  ShieldAlert,
  ShieldCheck,
  HardHat,
  FlaskConical,
  Scale,
  ClipboardList,
  Map,
  BookOpen,
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

function QuizCard() {
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
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] flex-1 max-w-md mx-auto text-center justify-center font-mono"
          style={{ background: "#0d0d0d", color: "#fbbf24" }}
        >
          <ClipboardList className="w-3.5 h-3.5" />
          <span>Final örnek sorusu · konu: İlk Yardım</span>
        </div>
      </div>
      <div className="isg-quiz">
        <div className="isg-quiz-q mb-3">
          Soru 1) Bilinci kapalı, soluk alıp veren bir kazazedeye ilk yardımcı
          olarak ilk uygulanması gereken pozisyon hangisidir?
        </div>
        <div className="space-y-1.5">
          <div className="isg-quiz-opt">
            <span className="isg-quiz-dim">A)</span> Şok pozisyonu (bacaklar
            yukarı)
          </div>
          <div className="isg-quiz-correct">
            <span className="isg-quiz-dim">B)</span> Koma (yan yatış)
            pozisyonu &nbsp;✓
          </div>
          <div className="isg-quiz-opt">
            <span className="isg-quiz-dim">C)</span> Sırtüstü düz yatış
          </div>
          <div className="isg-quiz-opt">
            <span className="isg-quiz-dim">D)</span> Oturur pozisyon
          </div>
        </div>
        <div className="isg-quiz-dim mt-4 text-[11px]">
          Açıklama: Soluğu olan bilinçsiz kişide amaç hava yolunu açık tutmak ve
          kusmukla boğulmayı engellemektir; bu yüzden yan yatış (koma) pozisyonu
          uygulanır.
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
        <Eyebrow>BVA 1109 · 15. Hafta · Genel Tekrar</Eyebrow>
        <H1 className="isg-shimmer">
          Dönemin
          <br />
          Genel Tekrarı
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          14 haftalık İSG bilgisini tek oturumda toparlıyoruz — finale hazırlık
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
              <div className="text-[10px] text-gray-500">ABC · 112 · koma pozisyonu</div>
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
              <div className="text-sm font-semibold text-white">Tehlike &amp; Risk</div>
              <div className="text-[10px] text-gray-500">Kimyasal · fiziksel · ergonomik</div>
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

  // 2 — Dönem haritası: nereden geldik
  () => (
    <SlideShell>
      <Eyebrow>Geriye Bakış</Eyebrow>
      <H2 className="mb-8">15 hafta · nereden geçtik?</H2>
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
          { w: "10", t: "Kişisel koruyucu donanım", a: false },
          { w: "11", t: "Stres, mobbing, psikososyal risk", a: false },
          { w: "12", t: "6331 sayılı İSG Kanunu", a: false },
          { w: "13", t: "Risk değerlendirmesi", a: false },
          { w: "14", t: "İş kazaları — vakalar", a: false },
          { w: "15", t: "Genel tekrar + final", a: true },
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
          Bugün:{" "}
          <span className="text-[#f59e0b] font-semibold">Genel tekrar</span> ·
          dört ana eksen — ilk yardım, tehlike/risk, koruma &amp; acil durum,
          mevzuat &amp; risk değerlendirmesi.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 3 — Bu derste 4 eksen (akış)
  () => (
    <SlideShell>
      <Eyebrow>Bu Tekrarın Akışı</Eyebrow>
      <H2 className="mb-3">Dört eksende toparlama</H2>
      <Sub className="max-w-3xl mb-8">
        Dönem boyunca işlenen konuları finalde çıkması en olası dört eksen
        altında topluyoruz. Her eksen kendi bölüm ayıracıyla başlar.
      </Sub>
      <div className="grid md:grid-cols-4 gap-4">
        {[
          {
            n: "01",
            icon: HeartPulse,
            t: "İlk Yardım",
            d: "ABC · 112 · koma ve şok pozisyonu",
            accent: "#dc2626",
          },
          {
            n: "02",
            icon: AlertTriangle,
            t: "Tehlike & Risk",
            d: "Fiziksel, kimyasal, biyolojik, ergonomik, psikososyal",
            accent: "#f59e0b",
          },
          {
            n: "03",
            icon: HardHat,
            t: "Koruma & Acil",
            d: "KKD, yangın sınıfları, tahliye, elektrik",
            accent: "#3b82f6",
          },
          {
            n: "04",
            icon: Scale,
            t: "Mevzuat & Risk Değ.",
            d: "6331 sayılı Kanun, taraf yükümlülükleri, 5x5 matris",
            accent: "#22c55e",
          },
        ].map((g, i) => {
          const Icon = g.icon;
          return (
            <motion.div
              key={g.t}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="isg-card rounded-xl p-5"
            >
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center mb-3"
                style={{ background: `${g.accent}18`, border: `1px solid ${g.accent}55` }}
              >
                <Icon className="w-5 h-5" style={{ color: g.accent }} />
              </div>
              <div className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: g.accent }}>
                Eksen {g.n}
              </div>
              <div className="text-base font-semibold text-white mb-1">{g.t}</div>
              <div className="text-[11px] text-gray-400 leading-relaxed">{g.d}</div>
            </motion.div>
          );
        })}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  1. İLK YARDIM  ───────────────── */

  // 4 — Section: İlk Yardım
  () => (
    <SectionDivider
      num="1"
      total="4"
      title="İlk Yardım"
      subtitle="ABC algoritması, acil çağrı ve pozisyonlar — hayat kurtaran temel"
      bgGradient="linear-gradient(135deg, #dc2626, #7f1d1d)"
      shadow="0 20px 60px -10px rgba(220, 38, 38, 0.6)"
      icon={<HeartPulse className="w-16 h-16 text-white" />}
    />
  ),

  // 5 — ABC üç sütun (tekrar)
  () => (
    <SlideShell>
      <Eyebrow>Çekirdek Bilgi</Eyebrow>
      <H2 className="mb-8">ABC algoritması · tek bakışta</H2>
      <div className="grid md:grid-cols-3 gap-5">
        <ABCStep
          letter="A"
          title="Airway"
          subtitle="Hava Yolu"
          steps={[
            "Ağız içini kontrol et — yabancı cisim",
            "Baş geri, çene yukarı (head-tilt)",
            "Boyun travmasında sadece çene itme",
          ]}
          accent="#dc2626"
          delay={0.15}
        />
        <ABCStep
          letter="B"
          title="Breathing"
          subtitle="Solunum"
          steps={[
            "Bak — göğüs iniş çıkışı (10 sn)",
            "Dinle — nefes sesi",
            "Hisset — yanağında hava",
          ]}
          accent="#f59e0b"
          delay={0.3}
        />
        <ABCStep
          letter="C"
          title="Circulation"
          subtitle="Dolaşım"
          steps={[
            "Solunum yoksa: göğüs basısı başlat",
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
          <span className="text-red-300 font-semibold">Sınav notu:</span> Beyin
          oksijensiz yaklaşık <span className="text-[#fbbf24] font-bold">4 dakika</span>
          {" "}sonra kalıcı hasar görmeye başlar; bu yüzden temel yaşam desteği
          gecikmeden başlatılmalıdır.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 6 — Pozisyonlar: koma vs şok + 112
  () => (
    <SlideShell>
      <Eyebrow>Sık Karıştırılanlar</Eyebrow>
      <H2 className="mb-8">Koma pozisyonu mu, şok pozisyonu mu?</H2>
      <div className="grid md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="isg-card-amber rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-5 h-5 text-[#fbbf24]" />
            <span className="text-base font-semibold text-white">Koma (yan yatış)</span>
          </div>
          <div className="text-[13px] text-gray-300 leading-relaxed mb-3">
            Bilinci kapalı <span className="text-[#fbbf24]">ama soluğu olan</span>
            {" "}kazazedeye uygulanır. Amaç: hava yolunu açık tutmak, kusmukla
            boğulmayı engellemek.
          </div>
          <div className="text-[11px] text-gray-500 font-mono">
            Ne zaman: bilinç yok + solunum var
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="isg-card-red rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <HeartPulse className="w-5 h-5 text-red-400" />
            <span className="text-base font-semibold text-white">Şok pozisyonu</span>
          </div>
          <div className="text-[13px] text-gray-300 leading-relaxed mb-3">
            Bilinci açık, kanama/sıvı kaybı olan kazazedede ayaklar
            <span className="text-red-300"> yaklaşık 30 cm kaldırılır</span>;
            hayati organlara kan akışı desteklenir.
          </div>
          <div className="text-[11px] text-gray-500 font-mono">
            Ne zaman: şok belirtileri (soluk, soğuk, hızlı nabız)
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 isg-card rounded-xl p-4 flex items-center gap-3"
      >
        <Phone className="w-5 h-5 text-[#f59e0b] shrink-0" />
        <div className="text-sm text-gray-300">
          Her iki durumda da <span className="text-[#fbbf24] font-mono font-bold">112</span>
          {" "}aranır; konum, kaza türü, yaralı sayısı ve bilinç durumu bildirilir.
          Operatör söyleyene kadar telefon kapatılmaz.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  2. TEHLİKE & RİSK  ───────────────── */

  // 7 — Section: Tehlike & Risk
  () => (
    <SectionDivider
      num="2"
      total="4"
      title="Tehlike &amp; Risk"
      subtitle="İş ortamındaki tehlike türleri ve tehlike ile riskin farkı"
      bgGradient="linear-gradient(135deg, #f59e0b, #b45309)"
      shadow="0 20px 60px -10px rgba(245, 158, 11, 0.6)"
      icon={<AlertTriangle className="w-16 h-16 text-white" />}
    />
  ),

  // 8 — Tehlike vs Risk kavramı
  () => (
    <SlideShell>
      <Eyebrow>Temel Ayrım</Eyebrow>
      <H2 className="mb-3">Tehlike ile risk aynı şey değildir</H2>
      <Sub className="max-w-3xl mb-8">
        Finalde en çok karıştırılan iki kavram. Tanımları net ayır; çoğu soru bu
        ayrım üzerine kurulur.
      </Sub>
      <div className="grid md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="isg-card rounded-xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-[#f59e0b] mb-2">
            Tehlike (Hazard)
          </div>
          <div className="text-base text-gray-200 leading-relaxed mb-3">
            Zarar verme <span className="text-[#fbbf24]">potansiyeli</span> olan
            kaynak, durum ya da işlem. Henüz olmuş bir şey değil — var olan bir
            kaynaktır.
          </div>
          <div className="text-[12px] text-gray-400">
            Örnek: yerdeki ıslak zemin, açıktaki dönen makine, etiketsiz kimyasal.
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="isg-card-amber rounded-xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-[#fbbf24] mb-2">
            Risk
          </div>
          <div className="text-base text-gray-200 leading-relaxed mb-3">
            Tehlikenin zarara yol açma{" "}
            <span className="text-[#fbbf24]">olasılığı</span> ile{" "}
            <span className="text-[#fbbf24]">şiddetinin</span> birleşimi.
          </div>
          <div className="isg-card rounded-lg px-3 py-2 text-center font-mono text-sm text-white">
            Risk = Olasılık × Şiddet
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 9 — Tehlike türleri tablosu
  () => (
    <SlideShell>
      <Eyebrow>Sınıflandırma</Eyebrow>
      <H2 className="mb-2">İş ortamı tehlike türleri</H2>
      <Sub className="max-w-3xl mb-6">
        Bir tehlikeyi doğru sınıflandırmak, doğru önlemi seçmenin ilk adımıdır.
        Beş ana grup:
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
              <th style={{ width: "20%" }}>Tür</th>
              <th style={{ width: "44%" }}>Örnek tehlikeler</th>
              <th>Tipik önlem</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Fiziksel</td>
              <td>Gürültü, titreşim, aşırı sıcak/soğuk, aydınlatma, radyasyon</td>
              <td>Kulaklık, izolasyon, ortam ölçümü</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Kimyasal</td>
              <td>Toz, gaz, buhar, çözücü, asit/baz, etiketsiz madde</td>
              <td>Havalandırma, GBF okuma, maske/eldiven</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Biyolojik</td>
              <td>Bakteri, virüs, mantar, parazit (sağlık, atık, tarım)</td>
              <td>Aşı, hijyen, kişisel koruyucu donanım</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Ergonomik</td>
              <td>Tekrarlı hareket, ağır kaldırma, yanlış duruş, ekran başı</td>
              <td>Çalışma istasyonu düzeni, mola, eğitim</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Psikososyal</td>
              <td>Stres, mobbing, vardiya yükü, iş-yaşam dengesizliği</td>
              <td>İş yükü planı, destek, açık iletişim</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  3. KORUMA & ACİL DURUM  ───────────────── */

  // 10 — Section: Koruma & Acil Durum
  () => (
    <SectionDivider
      num="3"
      total="4"
      title="Koruma &amp; Acil Durum"
      subtitle="Kişisel koruyucu donanım, yangın sınıfları ve tahliye"
      bgGradient="linear-gradient(135deg, #3b82f6, #1e40af)"
      shadow="0 20px 60px -10px rgba(59, 130, 246, 0.6)"
      icon={<HardHat className="w-16 h-16 text-white" />}
    />
  ),

  // 11 — KKD: önlem hiyerarşisi + örnekler
  () => (
    <SlideShell>
      <Eyebrow>Korunma Sırası</Eyebrow>
      <H2 className="mb-2">Önlem hiyerarşisi · KKD en son gelir</H2>
      <Sub className="max-w-3xl mb-8">
        Kişisel koruyucu donanım (KKD) önemlidir ama{" "}
        <span className="text-white">son savunma hattıdır</span>. Önce tehlike
        kaynağında çözülmeye çalışılır.
      </Sub>
      <div className="grid md:grid-cols-5 gap-3">
        {[
          { n: 1, t: "Yok etme", d: "Tehlikeyi tümden kaldır", c: "#22c55e" },
          { n: 2, t: "İkame", d: "Daha az tehlikeliyle değiştir", c: "#84cc16" },
          { n: 3, t: "Mühendislik", d: "Koruma, havalandırma, izolasyon", c: "#f59e0b" },
          { n: 4, t: "İdari önlem", d: "Eğitim, prosedür, uyarı, mola", c: "#f97316" },
          { n: 5, t: "KKD", d: "Baret, eldiven, maske, gözlük", c: "#dc2626" },
        ].map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="isg-card rounded-xl p-4 text-center"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-bold mx-auto mb-2"
              style={{ background: `${s.c}22`, color: s.c, border: `1px solid ${s.c}55` }}
            >
              {s.n}
            </div>
            <div className="text-sm font-semibold text-white mb-1">{s.t}</div>
            <div className="text-[11px] text-gray-400">{s.d}</div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 isg-card rounded-xl p-4 flex items-start gap-3"
      >
        <HardHat className="w-5 h-5 text-[#f59e0b] mt-0.5 shrink-0" />
        <div className="text-sm text-gray-300">
          Üstten alta etkinlik azalır: yukarıdaki önlem tehlikeyi kaynağında
          çözer, KKD yalnızca çalışanı tehlikeyle temas anında korur. İşveren KKD&apos;yi
          <span className="text-white"> ücretsiz sağlamak</span> ve kullanımını
          denetlemekle yükümlüdür.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 12 — Yangın sınıfları + söndürücü
  () => (
    <SlideShell>
      <Eyebrow>Yangın Güvenliği</Eyebrow>
      <H2 className="mb-2">Yangın sınıfları ve doğru söndürücü</H2>
      <Sub className="max-w-3xl mb-6">
        Yanlış söndürücü, yangını büyütebilir — özellikle elektrik ve yağ
        yangınlarında. Sınıfı tanı, söndürücüyü ona göre seç.
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
              <th style={{ width: "12%" }}>Sınıf</th>
              <th style={{ width: "38%" }}>Yanan madde</th>
              <th>Uygun söndürme</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-mono text-[#fbbf24] font-bold">A</td>
              <td>Katı (ahşap, kâğıt, kumaş, plastik)</td>
              <td>Su, köpük, ABC kuru kimyevi toz</td>
            </tr>
            <tr>
              <td className="font-mono text-[#fbbf24] font-bold">B</td>
              <td>Yanıcı sıvı (benzin, boya, çözücü)</td>
              <td>Köpük, CO₂, kuru kimyevi toz</td>
            </tr>
            <tr>
              <td className="font-mono text-[#fbbf24] font-bold">C</td>
              <td>Yanıcı gaz (LPG, doğalgaz)</td>
              <td>Önce gazı kes; kuru kimyevi toz</td>
            </tr>
            <tr>
              <td className="font-mono text-[#fbbf24] font-bold">D</td>
              <td>Yanıcı metal (magnezyum, alüminyum tozu)</td>
              <td>Özel D tipi toz (su KULLANMA)</td>
            </tr>
            <tr>
              <td className="font-mono text-[#fbbf24] font-bold">F / K</td>
              <td>Bitkisel/hayvansal yağ (mutfak)</td>
              <td>Islak kimyevi (köpürtme); asla su</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 isg-card-red rounded-lg px-4 py-3 text-[12px] text-red-100 flex items-start gap-3"
      >
        <Flame className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
        <span>
          Elektrik kaynaklı yangında <span className="text-white">su kullanma</span> —
          önce mümkünse enerjiyi kes, sonra CO₂ veya kuru kimyevi toz uygula.
        </span>
      </motion.div>
    </SlideShell>
  ),

  // 13 — Tahliye & acil durum adımları
  () => (
    <SlideShell>
      <Eyebrow>Acil Durum</Eyebrow>
      <H2 className="mb-10">Tahliye anında doğru davranış</H2>
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
              "Alarmı duyunca işi bırak, sakin ol",
              "Bilinen en yakın acil çıkışı kullan",
              "Dumanda eğilerek, alçak hava katmanından ilerle",
              "Toplanma alanına git, orada bekle",
              "Görevlinin (yangın söndürme ekibi) talimatına uy",
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
              "Yangında asansör kullanma",
              "Eşya toplamak için geri dönme",
              "Panikle koşup başkalarını ezme / itme",
              "Sıcak kapı kolunu kontrol etmeden açma",
              "Toplanma alanından izinsiz ayrılma",
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

  /* ─────────────────  4. MEVZUAT & RİSK DEĞERLENDİRMESİ  ───────────────── */

  // 14 — Section: Mevzuat
  () => (
    <SectionDivider
      num="4"
      total="4"
      title="Mevzuat &amp; Risk Değerlendirmesi"
      subtitle="6331 sayılı İSG Kanunu, taraf yükümlülükleri ve 5x5 risk matrisi"
      bgGradient="linear-gradient(135deg, #22c55e, #15803d)"
      shadow="0 20px 60px -10px rgba(34, 197, 94, 0.6)"
      icon={<Scale className="w-16 h-16 text-white" />}
    />
  ),

  // 15 — 6331: işveren vs çalışan yükümlülükleri
  () => (
    <SlideShell>
      <Eyebrow>6331 Sayılı Kanun</Eyebrow>
      <H2 className="mb-8">İşveren ve çalışan yükümlülükleri</H2>
      <div className="grid md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="isg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#fbbf24]">
            <Briefcase className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">İşveren</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />Risk değerlendirmesi yaptırmak</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />Gerekli önlemleri almak, KKD&apos;yi ücretsiz sağlamak</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />İSG eğitimi vermek (işe başlarken ve düzenli)</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />İş kazası/meslek hastalığını kayıt ve bildirim</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />Sağlık gözetimi yaptırmak</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="isg-card-green rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <Users className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Çalışan</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] shrink-0" />Kurallara ve talimatlara uymak</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] shrink-0" />KKD&apos;yi doğru kullanmak ve korumak</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] shrink-0" />Tehlikeyi/eksikliği amirine bildirmek</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] shrink-0" />Eğitim ve sağlık gözetimine katılmak</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#22c55e] shrink-0" />Ekipmanı amacı dışında kullanmamak</li>
          </ul>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-5 isg-card rounded-lg px-4 py-3 text-[12px] text-gray-400 flex items-start gap-3"
      >
        <ShieldCheck className="w-4 h-4 text-[#22c55e] mt-0.5 shrink-0" />
        <span>
          İlke: İSG sorumluluğu önce işverende olsa da, güvenli çalışma ortak bir
          sorumluluktur. Çalışanın bildirim yapması, önlemenin önemli bir
          parçasıdır.
        </span>
      </motion.div>
    </SlideShell>
  ),

  // 16 — 5x5 risk matrisi
  () => (
    <SlideShell>
      <Eyebrow>Risk Değerlendirmesi</Eyebrow>
      <H2 className="mb-2">5x5 risk matrisi · olasılık × şiddet</H2>
      <Sub className="max-w-3xl mb-6">
        Her tehlike için olasılık ve şiddet 1-5 arası puanlanır; çarpımları risk
        skorunu verir. Skor yükseldikçe önceliğin artar.
      </Sub>
      <div className="grid md:grid-cols-[1.3fr_1fr] gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="isg-card rounded-xl p-4"
        >
          <div className="text-[10px] font-mono text-gray-500 mb-2 text-center uppercase tracking-widest">
            Şiddet (→) · Olasılık (↓)
          </div>
          <div className="grid grid-cols-6 gap-1.5">
            <div />
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={`h${s}`} className="text-center text-[11px] font-mono text-gray-400">
                {s}
              </div>
            ))}
            {[1, 2, 3, 4, 5].map((o) => (
              <RowMatrix key={`r${o}`} o={o} />
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          {[
            { c: "#22c55e", t: "1 – 4 · Düşük", d: "Mevcut önlemler izlenir" },
            { c: "#fbbf24", t: "5 – 9 · Orta", d: "Planlı önlemle azalt" },
            { c: "#f97316", t: "10 – 16 · Yüksek", d: "Kısa sürede aksiyon al" },
            { c: "#dc2626", t: "17 – 25 · Çok yüksek", d: "Acil; iş durdurulabilir" },
          ].map((r) => (
            <div key={r.t} className="flex items-center gap-3">
              <span
                className="w-5 h-5 rounded shrink-0"
                style={{ background: r.c }}
              />
              <div>
                <div className="text-sm font-semibold text-white">{r.t}</div>
                <div className="text-[11px] text-gray-400">{r.d}</div>
              </div>
            </div>
          ))}
          <div className="text-[11px] text-gray-500 font-mono pt-2 border-t border-white/5">
            Risk skoru = Olasılık × Şiddet (1-25)
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  SINAV HAZIRLIK & KAPANIŞ  ───────────────── */

  // 17 — Örnek soru kartı
  () => (
    <SlideShell>
      <Eyebrow>Final · Soru Tipi</Eyebrow>
      <H2 className="mb-2">Soru nasıl gelir?</H2>
      <Sub className="max-w-3xl mb-6">
        Final çoğunlukla kavram tanımı, doğru uygulama ve sınıflandırma ölçer.
        Aşağıdaki gibi tek doğru cevaplı sorular gelir.
      </Sub>
      <QuizCard />
    </SlideShell>
  ),

  // 18 — Final hazırlık checklist
  () => (
    <SlideShell>
      <Eyebrow>Senin İçin</Eyebrow>
      <H2 className="mb-10">Final öncesi yapılacaklar</H2>
      <div className="grid md:grid-cols-2 gap-3">
        {[
          {
            t: "ABC ve pozisyonları ezbere bil",
            d: "Airway-Breathing-Circulation; koma ve şok pozisyonu hangi durumda — sık çıkar.",
          },
          {
            t: "Tehlike vs risk tanımını ayır",
            d: "Risk = Olasılık × Şiddet. İki kavramı örnekle açıklayabilmelisin.",
          },
          {
            t: "Tehlike türlerini sınıflandır",
            d: "Fiziksel, kimyasal, biyolojik, ergonomik, psikososyal — her birine bir örnek.",
          },
          {
            t: "Yangın sınıflarını ve söndürücüyü eşle",
            d: "A-B-C-D-F sınıfı + doğru söndürücü. Elektrik ve yağ yangınında ne YAPILMAZ?",
          },
          {
            t: "Önlem hiyerarşisini sırala",
            d: "Yok etme → ikame → mühendislik → idari → KKD. KKD neden son sırada?",
          },
          {
            t: "6331 yükümlülüklerini ayır",
            d: "İşveren ve çalışanın yükümlülükleri ayrı ayrı sorulabilir.",
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

  // 19 — Hatırlanacak rakamlar / anahtar değerler
  () => (
    <SlideShell>
      <Eyebrow>Akılda Kalsın</Eyebrow>
      <H2 className="mb-12">Tek bakışta anahtar değerler</H2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={Phone}
          value="112"
          label="Tek acil çağrı numarası"
          accent="#dc2626"
        />
        <StatCard
          icon={Brain}
          value="4 dk"
          label="Beyin oksijensiz kalma sınırı"
          delay={0.1}
          accent="#a855f7"
        />
        <StatCard
          icon={HeartPulse}
          value="30:2"
          label="Göğüs basısı : kurtarıcı nefes"
          delay={0.2}
          accent="#22c55e"
        />
        <StatCard
          icon={Scale}
          value="6331"
          label="İSG Kanunu sayısı"
          delay={0.3}
          accent="#f59e0b"
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 isg-card rounded-xl p-5 text-center"
      >
        <div className="text-sm text-gray-300">
          Bu dört değer dönemin omurgasıdır: acil çağrı{" "}
          <span className="isg-token">112</span>, müdahale penceresi{" "}
          <span className="isg-token">4 dk</span>, CPR oranı{" "}
          <span className="isg-token">30:2</span> ve dayanak{" "}
          <span className="isg-token">6331</span>.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 20 — Final bilgisi + kapanış
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
          <GraduationCap className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>Sıradaki · Final Sınavı</Eyebrow>
        <H1 className="isg-shimmer">Başarılar</H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Dönem boyu işlediğimiz dört eksen finalin de iskeleti. Tekrar et,
          örneklerle pekiştir, sakin gir.
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 grid md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          <div className="isg-card rounded-xl p-4">
            <BookOpen className="w-5 h-5 text-[#f59e0b] mb-2 mx-auto" />
            <div className="text-xs text-gray-400">Kapsam</div>
            <div className="text-sm font-semibold text-white mt-1">
              1 – 14. haftalar
            </div>
          </div>
          <div className="isg-card rounded-xl p-4">
            <Map className="w-5 h-5 text-[#f59e0b] mb-2 mx-auto" />
            <div className="text-xs text-gray-400">Odak</div>
            <div className="text-sm font-semibold text-white mt-1">
              Tanım · uygulama · sınıflandırma
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
          className="mt-10 text-[11px] text-gray-600 font-mono flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <Lightbulb className="w-3.5 h-3.5" />
          <Target className="w-3.5 h-3.5" />
          <Heart className="w-3.5 h-3.5" />
          <Globe className="w-3.5 h-3.5" />
          <Calendar className="w-3.5 h-3.5" />
          <FlaskConical className="w-3.5 h-3.5" />
          <span>Önce can güvenliği — sonra her şey.</span>
        </motion.div>
      </div>
    </SlideShell>
  ),
];

/* ── 5x5 matris satırı ── */
function RowMatrix({ o }: { o: number }) {
  function color(score: number): string {
    if (score <= 4) return "#22c55e";
    if (score <= 9) return "#fbbf24";
    if (score <= 16) return "#f97316";
    return "#dc2626";
  }
  return (
    <>
      <div className="text-center text-[11px] font-mono text-gray-400 flex items-center justify-center">
        {o}
      </div>
      {[1, 2, 3, 4, 5].map((s) => {
        const score = o * s;
        const c = color(score);
        return (
          <div
            key={`${o}-${s}`}
            className="h-8 rounded flex items-center justify-center text-[11px] font-mono font-bold"
            style={{ background: `${c}30`, color: c, border: `1px solid ${c}55` }}
          >
            {score}
          </div>
        );
      })}
    </>
  );
}

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
          BVA 1109 · 15. Hafta · Genel Tekrar
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
