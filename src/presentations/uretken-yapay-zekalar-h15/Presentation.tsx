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
  Sparkles,
  FlaskConical,
  Factory,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  Cpu,
  Dna,
  Pill,
  Atom,
  Boxes,
  Wrench,
  Code2,
  ShieldCheck,
  Database,
  GitBranch,
  Layers,
  Calendar,
  ListChecks,
  Rocket,
  Network,
  Microscope,
  Gauge,
  ScrollText,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import "./styles.css";

/* ============================================================
   PRIMITIVES
   ============================================================ */

const ACCENT = "#a855f7";
const ACCENT_SOFT = "#c084fc";

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
        <div className="absolute inset-0 uyz-grid-bg pointer-events-none" />
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
      className="inline-flex items-center gap-3 mb-6 text-xs font-mono uppercase tracking-[0.25em]"
      style={{ color: ACCENT_SOFT }}
    >
      <span className="w-8 h-px" style={{ background: ACCENT_SOFT }} />
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
  accent = ACCENT,
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
      className="uyz-card uyz-card-hover rounded-xl p-6 transition-all"
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
        style={{
          background: `${accent}1f`,
          border: `1px solid ${accent}55`,
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
          className="inline-flex w-32 h-32 rounded-3xl items-center justify-center mb-8 uyz-pulse"
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

function TerminalWindow({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="uyz-window-chrome w-full"
    >
      <div className="uyz-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-mono flex-1 max-w-md mx-auto text-center justify-center"
          style={{ background: "#0d0314", color: ACCENT_SOFT }}
        >
          <span className="w-5 h-5 rounded-sm uyz-ai-tile flex items-center justify-center text-[11px]">
            <Code2 className="w-3 h-3" />
          </span>
          <span>{title}</span>
        </div>
      </div>
      <div className="uyz-terminal">{children}</div>
    </motion.div>
  );
}

function PipelineDiagram() {
  const stages = [
    { icon: ScrollText, title: "Hedef tanımı", desc: "İstenen özellik / kısıt seti (ör. bağlanma afinitesi, ağırlık).", accent: "#a855f7" },
    { icon: Sparkles, title: "Üretken model", desc: "Aday molekül / tasarım üretir (VAE, diffusion, dil modeli).", accent: "#ec4899" },
    { icon: Gauge, title: "Skorlama & simülasyon", desc: "Fizik tabanlı simülasyon ve tahmin modeli adayları sıralar.", accent: "#3b82f6" },
    { icon: FlaskConical, title: "Lab doğrulaması", desc: "En iyi adaylar gerçek deneyle sınanır, sonuç geri beslenir.", accent: "#22c55e" },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
      {stages.map((s, i) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 + i * 0.18 }}
          className="relative uyz-pipe-node rounded-2xl p-5"
        >
          <div
            className="absolute -top-3 left-5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold"
            style={{ background: s.accent, color: "#fff", boxShadow: `0 0 18px ${s.accent}55` }}
          >
            {String(i + 1).padStart(2, "0")}
          </div>
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 mt-2"
            style={{ background: `${s.accent}1f`, border: `1px solid ${s.accent}55` }}
          >
            <s.icon className="w-5 h-5" style={{ color: s.accent }} />
          </div>
          <h3 className="text-base font-semibold text-white mb-1.5">{s.title}</h3>
          <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
          {i < stages.length - 1 && (
            <div
              className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full items-center justify-center"
              style={{ background: "#0a0414", border: "1px solid rgba(168,85,247,0.3)" }}
            >
              <ChevronRight className="w-4 h-4" style={{ color: ACCENT_SOFT }} />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ─────────────────  1 · KAPAK  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 1203 · 15. Hafta · Güz Dönemi</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.04]"
        >
          <span className="uyz-shimmer">Ar-Ge &amp; Endüstride</span>
          <br />
          <span className="uyz-shimmer">Üretken Yapay Zekâ</span>
        </motion.h1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Sohbet kutusundan laboratuvara ve fabrikaya: üretken modeller bilim
          ve üretim süreçlerini nasıl hızlandırıyor?
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={Microscope}
            title="Ar-Ge"
            desc="İlaç ve malzeme keşfinde aday tarama, tasarım ve hipotez üretimi."
            delay={0.3}
            accent="#a855f7"
          />
          <FeatureCard
            icon={Factory}
            title="Endüstri"
            desc="Üretim, kalite, bakım ve tasarımda üretken modellerin kullanımı."
            delay={0.45}
            accent="#ec4899"
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Sorumluluk"
            desc="Doğrulama, güvenlik, telif ve insan denetimi olmadan kullanım eksik."
            delay={0.6}
            accent="#22c55e"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-10 inline-flex items-center gap-2 text-[11px] font-mono text-gray-500 uppercase tracking-widest"
        >
          <Calendar className="w-3.5 h-3.5" />
          MCBÜ MYO · Perşembe 15:20 – 17:00 · Amfi 1
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  2 · KÖPRÜ / HEDEF  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · Dönemin son dersi</Eyebrow>
      <H2>Temellerden uygulamaya</H2>
      <Sub className="mt-3 max-w-3xl">
        Dönem boyunca üretken modellerin nasıl çalıştığını (token, olasılık,
        eğitim), hangi modaliteleri ürettiğini ve sınırlarını (halüsinasyon,
        önyargı, telif) gördük. Bu son haftada bu bilgiyi gerçek bir bağlama
        oturtuyoruz: bilimsel araştırma ve sanayi.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="uyz-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3" style={{ color: ACCENT_SOFT }}>
            <ListChecks className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Daha önce öğrendik</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />Model üretir, sınıflandırmaz — yeni örnek doğurur.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />Çıktı &quot;olası&quot;dır; doğruluk garanti değil.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />Metin, görsel, ses, video, kod için ayrı model aileleri.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="uyz-card-violet rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3" style={{ color: ACCENT_SOFT }}>
            <Rocket className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu hafta hedef</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />Üretken modellerin Ar-Ge döngüsündeki yerini kavramak.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />Sanayide somut kullanım alanlarını sınıflandırmak.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />Hangi işlerde insan doğrulamasının zorunlu olduğunu görmek.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3 · BÖLÜM 1 DIVIDER  ───────────────── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="Ar-Ge: Bilimi Hızlandırmak"
      subtitle="İlaç, malzeme ve mühendislik tasarımında üretken modeller aday üretip arama uzayını daraltır — ama deney hâlâ son sözü söyler."
      bgGradient="linear-gradient(135deg, #a855f7 0%, #6d28d9 100%)"
      shadow="0 0 80px rgba(168, 85, 247, 0.55)"
      icon={<FlaskConical className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  4 · AR-GE DÖNGÜSÜ (PIPELINE)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Ar-Ge · döngü</Eyebrow>
      <H2 className="mb-2">Üret, skorla, doğrula, tekrar et</H2>
      <Sub className="max-w-3xl mb-8">
        Üretken YZ bilimsel keşfi sıfırdan yapmaz; klasik döngüyü hızlandırır.
        Model milyonlarca aday üretir, hesaplama bunları sıralar, lab yalnızca
        en umut verici birkaçını test eder. Sonuç tekrar modele beslenir.
      </Sub>
      <PipelineDiagram />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="mt-6 text-center text-xs text-gray-500"
      >
        Kritik nokta: model adayları <span className="text-white">önerir</span>,
        deney ise <span className="text-white">kanıtlar</span>. Doğrulama olmadan çıktı yalnızca hipotezdir.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  5 · UYGULAMA ALANLARI KARTLARI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Ar-Ge · uygulama alanları</Eyebrow>
      <H2>Dört alanda somut katkı</H2>
      <Sub className="mt-3 mb-10 max-w-3xl">
        Üretken modeller her bilim dalında farklı bir &quot;dil&quot; konuşur:
        molekül dizisi, kristal yapısı, protein katlanması ya da kaynak kodu.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FeatureCard
          icon={Pill}
          title="İlaç keşfi"
          desc="Hedef proteine bağlanabilecek aday moleküller üretmek ve sentezlenebilirliğe göre elemek."
          delay={0.15}
          accent="#a855f7"
        />
        <FeatureCard
          icon={Atom}
          title="Malzeme bilimi"
          desc="İstenen iletkenlik veya dayanım için yeni kristal/alaşım yapıları önermek."
          delay={0.3}
          accent="#ec4899"
        />
        <FeatureCard
          icon={Dna}
          title="Biyoteknoloji"
          desc="Protein dizisi tasarımı ve yapı tahmini; enzim ve antikor mühendisliği."
          delay={0.45}
          accent="#3b82f6"
        />
        <FeatureCard
          icon={Code2}
          title="Mühendislik & yazılım"
          desc="Simülasyon kodu, test üretimi ve parametre keşfi ile deneme döngüsünü kısaltmak."
          delay={0.6}
          accent="#22c55e"
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-8 uyz-card rounded-xl p-5 flex items-center gap-4"
      >
        <Network className="w-8 h-8 shrink-0" style={{ color: ACCENT_SOFT }} />
        <div className="text-sm text-gray-400">
          <span className="text-white font-semibold">Ortak fikir:</span>{" "}
          Arama uzayı çok büyük olduğunda, modelin işi en olası bölgeyi
          işaret edip insan ile makinenin denemesi gereken aday sayısını düşürmektir.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  6 · KOD/TERMINAL MOCKUP  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Ar-Ge · örnek akış</Eyebrow>
      <H2 className="mb-2">Bir molekül üretim oturumu</H2>
      <Sub className="max-w-3xl mb-6">
        Aşağıda basitleştirilmiş bir Python akışı var: üretken model SMILES
        formatında aday moleküller üretiyor, bir skorlama fonksiyonu bunları
        sıralıyor. Gerçek hayatta bu çıktı laboratuvarda doğrulanmadan ilaç sayılmaz.
      </Sub>
      <TerminalWindow title="arge@lab:~ — molekul_uret.py">
        <div>
          <span className="uyz-term-prompt">arge@lab</span>
          <span className="uyz-term-dim">:~$</span>{" "}
          <span className="uyz-term-cmd">python molekul_uret.py --hedef COX-2 --aday 5000</span>
        </div>
        <div className="uyz-term-dim">[ info ] üretken model yükleniyor (mol-generator v3) ...</div>
        <div className="uyz-term-dim">[ info ] 5000 aday üretildi · geçersiz yapılar elendi: 412</div>
        <div className="mt-1"><span className="uyz-term-warn">SKOR   SMILES                         SENTEZLENEBİLİRLİK</span></div>
        <div><span className="uyz-term-ok">0.94</span>{"   "}<span className="uyz-term-key">CC(=O)Oc1ccccc1C(=O)O</span>{"        "}<span className="uyz-term-ok">yüksek</span></div>
        <div><span className="uyz-term-ok">0.91</span>{"   "}<span className="uyz-term-key">COc1ccc(cc1)C(=O)Nc2ccccc2</span>{"   "}<span className="uyz-term-warn">orta</span></div>
        <div><span className="uyz-term-warn">0.88</span>{"   "}<span className="uyz-term-key">Cn1cnc2c1c(=O)n(C)c(=O)n2C</span>{"   "}<span className="uyz-term-err">düşük (zor sentez)</span></div>
        <div className="uyz-term-dim mt-1">[ done ] ilk 25 aday `adaylar.csv` dosyasına yazıldı.</div>
        <div className="mt-2">
          <span className="uyz-term-prompt">arge@lab</span>
          <span className="uyz-term-dim">:~$</span>{" "}
          <span className="uyz-term-cmd"># sıradaki adım: lab sentezi + bağlanma testi</span>
        </div>
        <div className="mt-1">
          <span className="uyz-term-prompt">arge@lab</span>
          <span className="uyz-term-dim">:~$</span>{" "}
          <span className="uyz-term-cmd">_</span>
          <span className="animate-pulse">█</span>
        </div>
      </TerminalWindow>
    </SlideShell>
  ),

  /* ─────────────────  7 · BÖLÜM 2 DIVIDER  ───────────────── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Endüstride Üretken YZ"
      subtitle="Tasarımdan üretime, kalite kontrolünden bakıma: üretken modeller fabrikanın hangi adımına nasıl giriyor?"
      bgGradient="linear-gradient(135deg, #ec4899 0%, #9d174d 100%)"
      shadow="0 0 80px rgba(236, 72, 153, 0.5)"
      icon={<Factory className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  8 · ENDÜSTRİ TABLOSU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Endüstri · kullanım haritası</Eyebrow>
      <H2 className="mb-2">Hangi adımda, hangi model?</H2>
      <Sub className="max-w-3xl mb-6">
        Üretken YZ tek bir araç değil; üretim hattının farklı adımlarında farklı
        bir görev üstlenir. Her satırda insan denetiminin neden gerekli olduğuna dikkat.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="uyz-card rounded-xl p-1"
      >
        <table className="uyz-tbl">
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Adım</th>
              <th style={{ width: "34%" }}>Üretken YZ ne yapar?</th>
              <th>Neden insan denetimi gerekir?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Tasarım</td>
              <td>Üretken tasarım (generative design): ağırlık ve dayanım kısıtlarına göre parça geometrisi önerir.</td>
              <td>Önerilen geometri üretilebilir ve güvenli mi? Mühendis onaylar.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Belgeleme</td>
              <td>Teknik şartname, kullanım kılavuzu ve rapor taslaklarını hızlı üretir.</td>
              <td>Halüsinasyon riski — değerler ve adımlar doğrulanmalı.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Kalite kontrol</td>
              <td>Sentetik kusurlu görsel üretip görüntü modellerini eğitir (veri artırma).</td>
              <td>Sentetik veri gerçek dağılımı yansıtmazsa model yanılır.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Yazılım & otomasyon</td>
              <td>PLC/test kodu, betik ve entegrasyon parçaları üretir.</td>
              <td>Üretilen kod test edilmeden hatta uygulanmaz.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Müşteri & bakım</td>
              <td>Arıza kayıtlarını özetler, bakım talimatı ve yanıt taslağı üretir.</td>
              <td>Yanlış talimat güvenlik riski; teknisyen son kararı verir.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  9 · ÜRETKEN TASARIM KARŞILAŞTIRMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Endüstri · üretken tasarım</Eyebrow>
      <H2>Klasik CAD vs üretken tasarım</H2>
      <Sub className="mt-3 mb-10 max-w-3xl">
        Klasik tasarımda mühendis parçayı çizer. Üretken tasarımda mühendis
        kısıtları (yük, malzeme, ağırlık) tanımlar; model yüzlerce alternatif üretir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="uyz-card rounded-2xl p-7"
        >
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "#3b82f622", border: "1px solid #3b82f655" }}
            >
              <Wrench className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Klasik (insan çizer)</h3>
          </div>
          <div className="space-y-2 text-sm">
            {[
              "Mühendis geometriyi elle modeller",
              "Bir veya birkaç tasarım denenir",
              "Sezgi ve deneyime dayanır",
              "Sonuç öngörülebilir, ama dar",
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-300">
                <Check className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="uyz-card-violet rounded-2xl p-7"
          style={{ boxShadow: "0 0 40px rgba(168,85,247,0.2)" }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: `${ACCENT}22`, border: `1px solid ${ACCENT}66` }}
            >
              <Boxes className="w-6 h-6" style={{ color: ACCENT_SOFT }} />
            </div>
            <h3 className="text-xl font-semibold text-white">Üretken (model üretir)</h3>
          </div>
          <div className="space-y-2 text-sm">
            {[
              "Mühendis kısıtları tanımlar, çizmez",
              "Yüzlerce alternatif otomatik üretilir",
              "Simülasyonla en iyiler süzülür",
              "Beklenmedik, hafif geometriler çıkabilir",
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-300">
                <Sparkles className="w-4 h-4 shrink-0" style={{ color: ACCENT_SOFT }} />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-6 text-center text-sm text-gray-500"
      >
        İkisi rakip değil: model <span className="text-white">seçenek üretir</span>,
        mühendis <span className="text-white">karar verir</span> ve doğrular.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  10 · ENTEGRASYON · DIGITAL TWIN / MLOPS  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Endüstri · entegrasyon</Eyebrow>
      <H2 className="mb-2">Modeli üretime sokmak ayrı bir iş</H2>
      <Sub className="max-w-3xl mb-8">
        Çalışan bir üretken model demo değildir; bir sisteme bağlanması,
        izlenmesi ve güncellenmesi gerekir. Endüstride üç bileşen öne çıkar.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
        {[
          {
            icon: Database,
            title: "Veri & geri besleme",
            desc: "Hat sensörleri ve kayıtlar modeli güncel tutar; veri kalitesi çıktının kalitesini belirler.",
            accent: "#a855f7",
          },
          {
            icon: GitBranch,
            title: "MLOps & sürümleme",
            desc: "Model, prompt ve kurallar sürümlenir; geri alma (rollback) mümkün olmalı.",
            accent: "#ec4899",
          },
          {
            icon: Workflow,
            title: "Dijital ikiz / simülasyon",
            desc: "Üretken çıktı önce sanal ortamda denenir, ancak sonra fiziksel hatta uygulanır.",
            accent: "#3b82f6",
          },
        ].map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
            className="uyz-card rounded-2xl p-6"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ background: `${c.accent}1f`, border: `1px solid ${c.accent}55` }}
            >
              <c.icon className="w-6 h-6" style={{ color: c.accent }} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{c.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{c.desc}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-6 text-center text-xs text-gray-500"
      >
        Üretken model üretim hattının yalnızca bir parçasıdır; veri, izleme ve
        güvenlik olmadan tek başına değer üretmez.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  11 · BÖLÜM 3 DIVIDER · RİSK  ───────────────── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Sınırlar, Riskler, Sorumluluk"
      subtitle="Ar-Ge ve sanayide üretken YZ büyük fırsat sunar; ama doğrulama, güvenlik ve hukuk olmadan kullanmak maliyetli hatalara yol açar."
      bgGradient="linear-gradient(135deg, #f59e0b 0%, #b45309 100%)"
      shadow="0 0 80px rgba(245, 158, 11, 0.55)"
      icon={<AlertTriangle className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  12 · RİSK KARTLARI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Risk · dikkat edilmesi gerekenler</Eyebrow>
      <H2>Endüstride dört temel risk</H2>
      <Sub className="mt-3 mb-10 max-w-3xl">
        Üretken çıktı bir öneridir; ürün, ilaç ya da güvenlik kararı değildir.
        Bu dört risk her ciddi kullanımda gözetilmelidir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[
          {
            icon: AlertTriangle,
            title: "Halüsinasyon",
            desc: "Model var olmayan bir değeri, kaynağı veya prosedürü emin bir dille üretebilir. Kritik veriler ikinci kaynaktan doğrulanmalı.",
            accent: "#f59e0b",
          },
          {
            icon: ShieldCheck,
            title: "Güvenlik & gizlilik",
            desc: "Ticari sır içeren veriyi dışarıdaki bir modele göndermek sızıntı riskidir. Hassas veride yerel/izole modeller tercih edilir.",
            accent: "#a855f7",
          },
          {
            icon: ScrollText,
            title: "Telif & sorumluluk",
            desc: "Üretilen tasarım/kod başka eserlerden beslenmiş olabilir; kim üretti, kim sorumlu sorusu hukuken nettir olmalı.",
            accent: "#ec4899",
          },
          {
            icon: Gauge,
            title: "Veri kayması (drift)",
            desc: "Üretim koşulları değiştikçe model eskir; düzenli izlenmeyen bir model sessizce yanlış öneri vermeye başlar.",
            accent: "#3b82f6",
          },
        ].map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
            className="uyz-card rounded-xl p-6 flex items-start gap-4"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `${r.accent}1f`, border: `1px solid ${r.accent}55` }}
            >
              <r.icon className="w-6 h-6" style={{ color: r.accent }} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white mb-1.5">{r.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{r.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  13 · UYGULAMALI ALIŞTIRMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı alıştırma</Eyebrow>
      <H2>Bir sektör için kullanım senaryosu tasarla</H2>
      <Sub className="mt-3 max-w-3xl">
        Bireysel ya da ikili çalışın. Bir endüstri/Ar-Ge alanı seçin ve üretken
        YZ&apos;yi sorumlu biçimde kullanan kısa bir senaryo yazın. Sonraki teslime hazırlanın.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Factory, title: "1 · Alan seç", desc: "İlaç, otomotiv, tekstil, enerji gibi bir sektör belirle ve çözeceğin somut problemi yaz.", accent: "#a855f7" },
          { icon: Sparkles, title: "2 · Modeli konumlandır", desc: "Üretken model hangi adımda devreye girecek? Girdi ve beklenen çıktıyı tanımla.", accent: "#ec4899" },
          { icon: ShieldCheck, title: "3 · Doğrulama ekle", desc: "Çıktının doğru/güvenli olduğunu kim, nasıl kontrol edecek? İnsan denetim adımını yaz.", accent: "#22c55e" },
          { icon: ScrollText, title: "4 · Riski belirt", desc: "Halüsinasyon, gizlilik, telif veya drift risklerinden en az birini ve önlemini açıkla.", accent: "#f59e0b" },
        ].map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="uyz-card uyz-card-hover rounded-xl p-5 flex items-start gap-4"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `${t.accent}1f`, border: `1px solid ${t.accent}55` }}
            >
              <t.icon className="w-5 h-5" style={{ color: t.accent }} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white mb-1">{t.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{t.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 uyz-card rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <Layers className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />
        <span>
          Teslim: <span className="text-white">tek sayfa (yarım slayt)</span> — alan, akış,
          doğrulama ve risk. Gerçekçi olsun; abartılı vaat değil, uygulanabilir bir senaryo bekleniyor.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  14 · ÖZET  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Özet · dönemin kapanışı</Eyebrow>
      <H2>Üç cümlede bu hafta</H2>
      <Sub className="mt-3 mb-8 max-w-3xl">
        Ar-Ge ve sanayide üretken YZ&apos;nin nereye oturduğunu gördük. Akılda
        kalması gereken üç ilke:
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Cpu, title: "Hızlandırıcı", desc: "Model arama uzayını daraltır ve aday üretir; sıfırdan keşfetmez, mevcut döngüyü hızlandırır.", accent: "#a855f7" },
          { icon: FlaskConical, title: "Doğrulama şart", desc: "Lab deneyi, simülasyon ve test olmadan çıktı yalnızca hipotezdir — ürün veya ilaç değildir.", accent: "#ec4899" },
          { icon: ShieldCheck, title: "İnsan sorumlu", desc: "Güvenlik, telif, gizlilik ve son karar insandadır; model bir araçtır, karar verici değil.", accent: "#22c55e" },
        ].map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
            className="uyz-card rounded-2xl p-6"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ background: `${c.accent}1f`, border: `1px solid ${c.accent}55` }}
            >
              <c.icon className="w-6 h-6" style={{ color: c.accent }} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{c.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  15 · KAPANIŞ / TEŞEKKÜRLER  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-3xl items-center justify-center mb-8 uyz-pulse"
          style={{
            background: "linear-gradient(135deg, #a855f7, #6d28d9)",
            boxShadow: "0 0 60px rgba(168,85,247,0.5)",
          }}
        >
          <Rocket className="w-12 h-12 text-white" />
        </motion.div>

        <Eyebrow>Hafta 15 · Dönem sonu</Eyebrow>
        <H1>
          <span className="uyz-shimmer">Teşekkürler.</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Temellerden Ar-Ge ve sanayiye kadar geldik. Bundan sonrası proje
          teslimi ve final değerlendirmesi.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="uyz-card rounded-xl p-5 text-left"
          >
            <ListChecks className="w-5 h-5 mb-2" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1">
              Teslim
            </div>
            <div className="text-white text-sm">Kullanım senaryosu · tek sayfa</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="uyz-card rounded-xl p-5 text-left"
          >
            <Calendar className="w-5 h-5 mb-2" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1">
              Sıradaki
            </div>
            <div className="text-white text-sm">Final proje sunumları</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="uyz-card rounded-xl p-5 text-left"
          >
            <ShieldCheck className="w-5 h-5 mb-2" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1">
              İlke
            </div>
            <div className="text-white text-sm">Üret · doğrula · sorumlu ol</div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-10 text-[11px] font-mono text-gray-600 uppercase tracking-widest"
        >
          BVA 1203 · Üretken Yapay Zekalar · MCBÜ Manisa Meslek Yüksekokulu
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
            background: "linear-gradient(90deg, #a855f7, #c084fc, #a855f7)",
            boxShadow: "0 0 16px rgba(168,85,247,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div style={{ color: "rgba(192,132,252,0.7)" }}>
          BVA 1203 · 15. Hafta · Ar-Ge &amp; Endüstri
        </div>
        <div className="flex items-center gap-3">
          <div style={{ color: "rgba(192,132,252,0.5)" }}>
            <span style={{ color: ACCENT_SOFT }}>
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
            className="p-1.5 text-gray-500 transition-colors"
            style={{ color: "#6b7280" }}
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
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
          style={{ color: current === 0 ? undefined : "#9ca3af" }}
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
                  ? "w-5"
                  : "w-1.5 bg-white/15 hover:bg-white/40"
              }`}
              style={
                i === current
                  ? {
                      background: ACCENT,
                      boxShadow: "0 0 10px rgba(168,85,247,0.6)",
                    }
                  : undefined
              }
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
