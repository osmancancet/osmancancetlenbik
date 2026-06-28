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
  Brain,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  X,
  Zap,
  Image as ImageIcon,
  Layers,
  Code2,
  ShieldCheck,
  Scale,
  Calendar,
  ListChecks,
  Rocket,
  Network,
  Eye,
  Dice5,
  Repeat,
  Target,
  Cpu,
  GitCompare,
  TrendingDown,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import "./styles.css";

/* ============================================================
   PRIMITIVES  (h01 ile birebir aynı)
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
   KONUYA ÖZGÜ MOCKUP'LAR
   ============================================================ */

/* Üretici ↔ Ayırt edici çekişme diyagramı */
function AdversarialDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="uyz-card rounded-2xl p-7"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-5 items-center">
        {/* Üretici */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="uyz-node p-5"
        >
          <div className="flex items-center gap-2 mb-2">
            <Wand2 className="w-5 h-5" style={{ color: ACCENT_SOFT }} />
            <span className="text-white font-semibold text-sm">Üretici · G</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Rastgele gürültü <span className="font-mono text-violet-300">z</span> alır,
            sahte bir örnek <span className="font-mono text-violet-300">G(z)</span> üretir.
          </p>
          <div className="mt-3 text-[10px] font-mono px-2 py-1 rounded inline-block"
            style={{ background: `${ACCENT}1f`, color: ACCENT_SOFT }}>
            amaç: D&apos;yi kandırmak
          </div>
        </motion.div>

        {/* Orta · çekişme oku */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.55 }}
          className="flex flex-col items-center gap-2 px-2"
        >
          <GitCompare className="w-7 h-7" style={{ color: "#f472b6" }} />
          <div className="text-[10px] font-mono uppercase tracking-widest text-pink-300 text-center">
            karşıt<br />amaç
          </div>
        </motion.div>

        {/* Ayırt edici */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45 }}
          className="uyz-node p-5"
          style={{ borderColor: "rgba(96,165,250,0.4)" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-5 h-5 text-blue-400" />
            <span className="text-white font-semibold text-sm">Ayırt Edici · D</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Bir örneğin gerçek mi yoksa <span className="font-mono text-blue-300">G(z)</span> mi
            olduğuna karar verir: <span className="font-mono text-blue-300">0 – 1</span> olasılığı döner.
          </p>
          <div className="mt-3 text-[10px] font-mono px-2 py-1 rounded inline-block"
            style={{ background: "#3b82f61f", color: "#93c5fd" }}>
            amaç: sahteyi yakalamak
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 pt-5 border-t border-white/5 text-sm text-gray-400 flex items-center gap-3"
      >
        <Repeat className="w-5 h-5 shrink-0" style={{ color: ACCENT_SOFT }} />
        <span>
          İki ağ aynı anda eğitilir: G daha iyi taklit ettikçe D zorlanır,
          D keskinleştikçe G daha çok çabalar. Bu <span className="text-white">çekişme</span>,
          adını da buradan alır.
        </span>
      </motion.div>
    </motion.div>
  );
}

/* Üreticinin gürültüden veriye giden boru hattı */
function GeneratorPipeline() {
  const steps = [
    { label: "z ~ N(0,1)", note: "rastgele gürültü vektörü", color: "#a855f7" },
    { label: "Tam bağlı + ConvT", note: "yukarı örnekleme katmanları", color: "#ec4899" },
    { label: "G(z)", note: "sahte örnek (ör. 64×64 görsel)", color: "#3b82f6" },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-3 items-center">
      {steps.map((s, i) => (
        <div key={s.label} className="contents">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.25 }}
            className="uyz-card rounded-xl p-5 text-center"
          >
            <div
              className="font-mono text-sm font-semibold mb-1"
              style={{ color: s.color }}
            >
              {s.label}
            </div>
            <div className="text-[11px] text-gray-500">{s.note}</div>
          </motion.div>
          {i < steps.length - 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 + i * 0.25 }}
              className="hidden md:flex justify-center"
            >
              <ChevronRight className="w-6 h-6" style={{ color: ACCENT_SOFT }} />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

/* Kayıp eğrisi mockup'ı — denge etrafında salınım */
function LossChart() {
  const gPath = "M0,70 C40,50 70,90 110,60 C150,35 190,80 230,58 C270,45 300,72 330,55";
  const dPath = "M0,55 C40,75 70,40 110,65 C150,88 190,48 230,68 C270,80 300,52 330,66";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="uyz-window-chrome w-full max-w-3xl mx-auto"
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
          <TrendingDown className="w-3.5 h-3.5" />
          <span>training_log.png — G / D kaybı (epoch)</span>
        </div>
      </div>
      <div className="p-6" style={{ background: "#0a0414" }}>
        <div className="relative rounded-lg uyz-loss-grid p-2" style={{ height: 180, border: "1px solid rgba(168,85,247,0.18)" }}>
          <svg viewBox="0 0 330 120" preserveAspectRatio="none" className="w-full h-full">
            <motion.path
              d={gPath}
              fill="none"
              stroke="#a855f7"
              strokeWidth="2.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, delay: 0.4 }}
            />
            <motion.path
              d={dPath}
              fill="none"
              stroke="#60a5fa"
              strokeWidth="2.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, delay: 0.6 }}
            />
          </svg>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4 text-[11px] font-mono">
          <span className="flex items-center gap-2 text-violet-300">
            <span className="w-4 h-0.5 inline-block" style={{ background: "#a855f7" }} /> G kaybı
          </span>
          <span className="flex items-center gap-2 text-blue-300">
            <span className="w-4 h-0.5 inline-block" style={{ background: "#60a5fa" }} /> D kaybı
          </span>
        </div>
      </div>
      <div className="uyz-warn-row px-5 py-3 flex items-center gap-2 text-xs">
        <AlertTriangle className="w-4 h-4" />
        <span>
          GAN&apos;da kayıp eğrileri sürekli düşmez — sağlıklı eğitimde bir denge
          etrafında salınır. &quot;Düz inen&quot; bir eğri çoğu zaman çöküş işaretidir.
        </span>
      </div>
    </motion.div>
  );
}

/* ============================================================
   SLIDES — Hafta 4 · GAN: temel yapı ve eğitim süreci
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ───── 1 · KAPAK ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 1203 · 4. Hafta</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.02]"
        >
          <span className="uyz-shimmer">Üretken Çekişmeli</span>
          <br />
          <span className="uyz-shimmer">Ağlar &middot; GAN</span>
        </motion.h1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Birbiriyle yarışan iki ağ: biri sahte üretir, biri yakalamaya çalışır.
          <br />
          <span className="text-gray-500 text-base">
            Bu hafta GAN&apos;ın temel yapısını ve eğitim sürecini çözeceğiz.
          </span>
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={Wand2}
            title="Üretici (G)"
            desc="Gürültüden veri uydurur; amacı ayırt ediciyi kandırmak."
            delay={0.3}
            accent="#a855f7"
          />
          <FeatureCard
            icon={Eye}
            title="Ayırt Edici (D)"
            desc="Gerçek mi sahte mi karar verir; amacı sahteyi yakalamak."
            delay={0.45}
            accent="#3b82f6"
          />
          <FeatureCard
            icon={Repeat}
            title="Çekişmeli Eğitim"
            desc="İkisi sırayla güncellenir, bir denge noktasında buluşur."
            delay={0.6}
            accent="#ec4899"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-10 text-[11px] font-mono text-gray-600 uppercase tracking-widest"
        >
          MCBÜ MYO · BVA 1203 · Per 15:20 – 17:00 · Amfi 1
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ───── 2 · GEÇEN HAFTADAN KÖPRÜ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 3. haftadan 4. haftaya</Eyebrow>
      <H2>Autoencoder kodladı, GAN şimdi yarışacak.</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta veriyi sıkıştırıp geri kuran Autoencoder ve VAE&apos;yi gördük: tek ağ,
        bir &quot;yeniden kurma&quot; hedefi. Bu hafta yaklaşım değişiyor — tek bir kayıp
        fonksiyonu yerine, birbirine karşı çalışan iki ağ koyuyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="uyz-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3" style={{ color: ACCENT_SOFT }}>
            <Layers className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Geçen hafta · VAE</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />Kodlayıcı → gizli uzay → kod çözücü.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />Hedef: girdiyi olabildiğince iyi geri kurmak.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />Çıktılar genelde bulanık olmaya eğilimli.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="uyz-card-violet rounded-xl p-6"
          style={{ boxShadow: "0 0 40px rgba(168,85,247,0.18)" }}
        >
          <div className="flex items-center gap-2 mb-3" style={{ color: ACCENT_SOFT }}>
            <Zap className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu hafta · GAN</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />İki ağ: üretici (G) ve ayırt edici (D).</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />Hedef: gerçekçi, keskin örnekler üretmek.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />Sabit kayıp yok; iki rakip arası bir oyun.</li>
          </ul>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 text-center text-sm text-gray-500"
      >
        Bu haftanın hedefi: bir GAN&apos;ın <span className="text-white">parçalarını</span>,{" "}
        <span className="text-white">amaç fonksiyonunu</span> ve{" "}
        <span className="text-white">eğitim döngüsünü</span> uçtan uca anlamak.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 3 · DERSİN AKIŞI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: yapı → eğitim → sorunlar</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce iki ağı ve aralarındaki oyunu kuruyoruz; sonra eğitim döngüsünün adımlarını
        ve amaç fonksiyonunu açıyoruz; en son pratikte karşılaşılan sorunları ve bir mini labı
        konuşuyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Temel Yapı", items: ["Üretici & ayırt edici", "Gürültüden örneğe", "Çekişme sezgisi"], icon: Network, accent: "#a855f7" },
          { range: "02", title: "Eğitim Süreci", items: ["Minimax amaç fonksiyonu", "İki adımlı döngü", "Denge (Nash) noktası"], icon: Repeat, accent: "#ec4899" },
          { range: "03", title: "Sorunlar & Lab", items: ["Mod çöküşü", "Kararsız eğitim", "PyTorch mini lab"], icon: AlertTriangle, accent: "#3b82f6" },
        ].map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="uyz-card rounded-xl p-6"
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

  /* ───── 4 · BÖLÜM 1 ───── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="Temel Yapı"
      subtitle="Bir GAN&apos;ı iki ağ ve aralarındaki çekişme tanımlar. Önce kim ne yapıyor, neden yarışıyorlar — buradan başlayalım."
      bgGradient="linear-gradient(135deg, #a855f7 0%, #6d28d9 100%)"
      shadow="0 0 80px rgba(168, 85, 247, 0.55)"
      icon={<Network className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 5 · SAHTECİ–DEDEKTİF BENZETMESİ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Sezgi</Eyebrow>
      <H2>Sahteci ile dedektif.</H2>
      <Sub className="mt-3 mb-10">
        GAN&apos;ı en kolay anlatan benzetme: sahte para basan bir kalpazan ve onu yakalamaya
        çalışan bir dedektif. İkisi de birbiriyle yarışarak ustalaşır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="uyz-card-violet rounded-2xl p-7"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: `${ACCENT}22`, border: `1px solid ${ACCENT}66` }}>
              <Wand2 className="w-6 h-6" style={{ color: ACCENT_SOFT }} />
            </div>
            <h3 className="text-xl font-semibold text-white">Kalpazan = Üretici (G)</h3>
          </div>
          <p className="text-sm text-gray-400 mb-5 leading-relaxed">
            Hiç gerçek para görmeden, dedektifin tepkisine bakarak <span className="text-white">sahte üretmeyi</span> öğrenir.
            Yakalandıkça tekniğini düzeltir.
          </p>
          <div className="space-y-2 text-sm">
            {[
              "Girdi: rastgele gürültü",
              "Çıktı: sahte örnek G(z)",
              "Geri bildirim: D ne dedi?",
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-300">
                <ChevronRight className="w-4 h-4 shrink-0" style={{ color: ACCENT_SOFT }} />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="uyz-card rounded-2xl p-7"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "#3b82f622", border: "1px solid #3b82f655" }}>
              <Eye className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Dedektif = Ayırt Edici (D)</h3>
          </div>
          <p className="text-sm text-gray-400 mb-5 leading-relaxed">
            Hem gerçek hem sahte örnekler görür, her birine <span className="text-white">&quot;gerçek olma olasılığı&quot;</span> verir.
            Hata yaptıkça gözü keskinleşir.
          </p>
          <div className="space-y-2 text-sm">
            {[
              "Girdi: gerçek veya sahte örnek",
              "Çıktı: 0 (sahte) – 1 (gerçek)",
              "Geri bildirim: doğru mu bildim?",
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-300">
                <ChevronRight className="w-4 h-4 shrink-0 text-blue-400" />
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
        Denge: kalpazan o kadar iyi olur ki dedektif artık <span className="text-white">yazı-tura</span> atmaktan
        farksız hale gelir — yani %50 doğruluk.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 6 · ÇEKİŞME DİYAGRAMI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Mimari · G ve D</Eyebrow>
      <H2 className="mb-2">İki ağ, karşıt amaçlar.</H2>
      <Sub className="max-w-3xl mb-6">
        GAN&apos;ı 2014&apos;te Ian Goodfellow ve arkadaşları önerdi. Çekirdek fikir basit:
        bir ağ üretir, diğer ağ yargılar; ikisi aynı veriyle ama zıt hedeflerle eğitilir.
      </Sub>
      <AdversarialDiagram />
    </SlideShell>
  ),

  /* ───── 7 · ÜRETİCİ BORU HATTI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Üretici · içeride ne var?</Eyebrow>
      <H2 className="mb-2">Gürültüden örneğe.</H2>
      <Sub className="max-w-3xl mb-8">
        Üretici, küçük bir rastgele vektörü adım adım büyüterek tam boyutlu bir örneğe dönüştürür.
        Görsel GAN&apos;larında bu, transpoze evrişim (ConvTranspose) katmanlarıyla yapılan
        bir yukarı örnekleme zinciridir.
      </Sub>
      <GeneratorPipeline />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        className="mt-8 uyz-card rounded-xl p-5 flex items-start gap-3 max-w-4xl mx-auto"
      >
        <Dice5 className="w-6 h-6 shrink-0 mt-0.5" style={{ color: ACCENT_SOFT }} />
        <div className="text-sm text-gray-400">
          <span className="text-white font-semibold">Gizli vektör z neden önemli?</span>{" "}
          z&apos;deki küçük değişiklikler çıktıda anlamlı değişimlere karşılık gelir. Bu yüzden
          GAN&apos;lar, <span className="text-white">z uzayında gezinerek</span> yeni varyasyonlar üretebilir.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 8 · BÖLÜM 2 ───── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Eğitim Süreci"
      subtitle="İki ağ nasıl birlikte öğrenir? Amaç fonksiyonu nedir, döngüde hangi adım önce gelir? Şimdi mekanizmaya iniyoruz."
      bgGradient="linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%)"
      shadow="0 0 80px rgba(109, 40, 217, 0.6)"
      icon={<Repeat className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 9 · MINIMAX AMACI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Amaç fonksiyonu</Eyebrow>
      <H2 className="mb-2">Bir minimax oyunu.</H2>
      <Sub className="max-w-3xl mb-8">
        GAN&apos;ın eğitimi tek bir değer fonksiyonu üzerinde tanımlanır: D bunu
        <span className="text-white"> büyütmeye</span>, G ise <span className="text-white">küçültmeye</span> çalışır.
        Aynı denklemi iki taraf ters yönden çeker.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="uyz-card rounded-2xl p-7 max-w-4xl mx-auto"
      >
        <div className="uyz-code text-center text-base md:text-lg">
          <span className="uyz-code-key">min</span>
          <sub className="text-gray-500">G</sub>{" "}
          <span className="uyz-code-key">max</span>
          <sub className="text-gray-500">D</sub>{" "}
          V(D,G) ={" "}
          <span className="text-violet-300">E</span>
          <sub className="text-gray-500">x∼p(veri)</sub>[ log D(x) ]{" "}
          +{" "}
          <span className="text-violet-300">E</span>
          <sub className="text-gray-500">z∼p(z)</sub>[ log( 1 &minus; D(G(z)) ) ]
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="rounded-lg p-4" style={{ background: "#0d0314", border: "1px solid rgba(96,165,250,0.25)" }}>
            <div className="flex items-center gap-2 mb-2 text-blue-300 text-xs font-mono uppercase tracking-wider">
              <Eye className="w-4 h-4" /> D ne ister?
            </div>
            <p className="text-sm text-gray-400">
              Gerçeklere <span className="font-mono text-blue-300">D(x)≈1</span>, sahtelere{" "}
              <span className="font-mono text-blue-300">D(G(z))≈0</span> demek — yani V&apos;yi büyütmek.
            </p>
          </div>
          <div className="rounded-lg p-4" style={{ background: "#0d0314", border: "1px solid rgba(168,85,247,0.25)" }}>
            <div className="flex items-center gap-2 mb-2 text-violet-300 text-xs font-mono uppercase tracking-wider">
              <Wand2 className="w-4 h-4" /> G ne ister?
            </div>
            <p className="text-sm text-gray-400">
              D&apos;yi kandırıp <span className="font-mono text-violet-300">D(G(z))≈1</span> yaptırmak —
              yani ikinci terimi, dolayısıyla V&apos;yi küçültmek.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-5 text-center text-xs text-gray-500 font-mono"
      >
        Pratikte G için çoğunlukla <span className="text-violet-300">&minus;log D(G(z))</span> (non-saturating)
        kaybı kullanılır; başlangıçta daha güçlü gradyan verir.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 10 · EĞİTİM DÖNGÜSÜ ───── */
  () => (
    <SlideShell>
      <Eyebrow>Eğitim döngüsü · iki adım</Eyebrow>
      <H2 className="mb-2">Önce D, sonra G — her iterasyonda.</H2>
      <Sub className="max-w-3xl mb-8">
        Bir GAN tek bir geri yayılımla eğitilmez; her adımda iki ayrı güncelleme yapılır.
        Birinde D&apos;nin ağırlıkları, diğerinde G&apos;nin ağırlıkları güncellenir.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative uyz-card rounded-2xl p-6"
        >
          <div className="absolute -top-3 left-6 px-3 py-1 rounded-full text-[10px] font-mono font-bold"
            style={{ background: "#3b82f6", color: "#fff", boxShadow: "0 0 20px #3b82f655" }}>
            ADIM 1
          </div>
          <div className="flex items-center gap-2 mb-3 mt-2">
            <Eye className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Ayırt ediciyi güncelle</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex gap-2"><span className="text-blue-400">·</span>Gerçek örnekleri ver, D(x)→1 hedefle.</li>
            <li className="flex gap-2"><span className="text-blue-400">·</span>G&apos;den sahte üret, D(G(z))→0 hedefle.</li>
            <li className="flex gap-2"><span className="text-blue-400">·</span>D&apos;nin kaybını geri yay; <span className="text-white">yalnız D&apos;yi</span> güncelle.</li>
            <li className="flex gap-2"><span className="text-blue-400">·</span>G&apos;nin ağırlıkları bu adımda <span className="text-white">dondurulur</span>.</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="relative uyz-card-violet rounded-2xl p-6"
        >
          <div className="absolute -top-3 left-6 px-3 py-1 rounded-full text-[10px] font-mono font-bold"
            style={{ background: ACCENT, color: "#fff", boxShadow: "0 0 20px rgba(168,85,247,0.45)" }}>
            ADIM 2
          </div>
          <div className="flex items-center gap-2 mb-3 mt-2">
            <Wand2 className="w-5 h-5" style={{ color: ACCENT_SOFT }} />
            <h3 className="text-lg font-semibold text-white">Üreticiyi güncelle</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex gap-2"><span style={{ color: ACCENT_SOFT }}>·</span>Yeni sahteler üret, D&apos;den geçir.</li>
            <li className="flex gap-2"><span style={{ color: ACCENT_SOFT }}>·</span>Bu kez D(G(z))→1 hedefle (D&apos;yi kandır).</li>
            <li className="flex gap-2"><span style={{ color: ACCENT_SOFT }}>·</span>Gradyan D üzerinden G&apos;ye akar; <span className="text-white">yalnız G&apos;yi</span> güncelle.</li>
            <li className="flex gap-2"><span style={{ color: ACCENT_SOFT }}>·</span>D&apos;nin ağırlıkları bu adımda <span className="text-white">dondurulur</span>.</li>
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-center text-sm text-gray-500"
      >
        Bu iki adım, tüm veri üzerinde <span className="text-white">epoch&apos;lar boyunca</span> tekrar eder.
        Denge bozulursa bir taraf diğerini ezer.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 11 · KOD MOCKUP (PyTorch döngüsü) ───── */
  () => (
    <SlideShell>
      <Eyebrow>Kod · PyTorch eğitim döngüsü</Eyebrow>
      <H2 className="mb-2">Aynı mantık, beş satır çekirdek.</H2>
      <Sub className="max-w-3xl mb-6">
        Aşağıda bir iterasyonun sadeleştirilmiş hâli. İki ayrı optimizatör (
        <span className="font-mono text-violet-300">opt_d</span>,{" "}
        <span className="font-mono text-violet-300">opt_g</span>) ve iki ayrı geri yayılıma dikkat.
      </Sub>

      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="uyz-window-chrome w-full max-w-4xl mx-auto"
      >
        <div className="uyz-window-bar flex items-center gap-2 px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <div className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-mono flex-1 max-w-md mx-auto text-center justify-center"
            style={{ background: "#0d0314", color: ACCENT_SOFT }}>
            <Code2 className="w-3.5 h-3.5" />
            <span>train_gan.py — bir iterasyon</span>
          </div>
        </div>
        <div className="uyz-code rounded-none border-0 text-[12.5px]">
          <div><span className="uyz-code-comment"># 1) Ayırt ediciyi eğit</span></div>
          <div>z = torch.randn(batch, z_dim)</div>
          <div>fake = G(z).detach()<span className="uyz-code-comment">  # G&apos;ye gradyan akmasın</span></div>
          <div>loss_d = bce(D(real), <span className="uyz-code-num">1</span>) + bce(D(fake), <span className="uyz-code-num">0</span>)</div>
          <div>opt_d.zero_grad(); loss_d.backward(); opt_d.step()</div>
          <div className="text-gray-700">&nbsp;</div>
          <div><span className="uyz-code-comment"># 2) Üreticiyi eğit</span></div>
          <div>z = torch.randn(batch, z_dim)</div>
          <div>loss_g = bce(D(G(z)), <span className="uyz-code-num">1</span>)<span className="uyz-code-comment">  # D&apos;yi &quot;gerçek&quot; demeye zorla</span></div>
          <div>opt_g.zero_grad(); loss_g.backward(); opt_g.step()</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-5 text-center text-xs text-gray-500 font-mono"
      >
        <span className="text-violet-300">.detach()</span> kritik: D eğitilirken sahte örnek üzerinden
        G&apos;nin ağırlıklarının yanlışlıkla güncellenmesini engeller.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 12 · DENGE / NASH ───── */
  () => (
    <SlideShell>
      <Eyebrow>Eğitim · ne zaman biter?</Eyebrow>
      <H2 className="mb-2">Hedef: yakalanamaz sahte.</H2>
      <Sub className="max-w-3xl mb-6">
        Teorik denge noktasında üreticinin dağılımı gerçek veri dağılımına eşitlenir
        <span className="font-mono text-violet-300"> (p_G = p_veri)</span> ve ayırt edici her örnek için
        <span className="font-mono text-violet-300"> 0.5</span> der — yani tahmin etmekten başka şansı kalmaz.
      </Sub>
      <LossChart />
    </SlideShell>
  ),

  /* ───── 13 · BÖLÜM 3 ───── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Sorunlar & Lab"
      subtitle="GAN&apos;lar güçlü ama eğitmesi zordur. Sık karşılaşılan iki sorunu, çözüm yaklaşımlarını ve bu haftanın labını görelim."
      bgGradient="linear-gradient(135deg, #f59e0b 0%, #b45309 100%)"
      shadow="0 0 80px rgba(245, 158, 11, 0.55)"
      icon={<AlertTriangle className="w-16 h-16 text-white" />}
    />
  ),

  /* ───── 14 · MOD ÇÖKÜŞÜ & KARARSIZLIK ───── */
  () => (
    <SlideShell>
      <Eyebrow>Sık görülen sorunlar</Eyebrow>
      <H2 className="mb-2">Eğitim neden bozulur?</H2>
      <Sub className="max-w-3xl mb-8">
        İki ağ aynı anda öğrendiği için denge hassastır. En sık üç sorun ve pratikte
        denenen çözümler:
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="uyz-card rounded-xl p-1"
      >
        <table className="uyz-tbl">
          <thead>
            <tr>
              <th style={{ width: "22%" }}>Sorun</th>
              <th style={{ width: "40%" }}>Belirti</th>
              <th>Yaygın çözüm</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Mod çöküşü<br /><span className="font-mono text-[11px] text-gray-500">mode collapse</span></td>
              <td>G yalnızca birkaç örneği tekrar tekrar üretir; çeşitlilik kaybolur.</td>
              <td>Mini-batch discrimination, unrolled GAN, farklı kayıp (WGAN).</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Kaybolan gradyan<br /><span className="font-mono text-[11px] text-gray-500">vanishing gradient</span></td>
              <td>D çok güçlenince G&apos;ye anlamlı gradyan akmaz, G öğrenemez.</td>
              <td>Non-saturating kayıp, D&apos;yi fazla eğitmemek, WGAN-GP.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Kararsız eğitim<br /><span className="font-mono text-[11px] text-gray-500">instability</span></td>
              <td>Kayıplar salınır veya patlar; çıktılar bir iyi bir kötü olur.</td>
              <td>Düşük öğrenme oranı, spektral normalizasyon, dengeli kapasite.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-5 text-center text-xs text-gray-500"
      >
        Bu yüzden mimari seçimi (DCGAN), normalizasyon ve kayıp fonksiyonu GAN&apos;da
        en az ağ tasarımı kadar önemlidir.
      </motion.div>
    </SlideShell>
  ),

  /* ───── 15 · GAN VARYANTLARI ───── */
  () => (
    <SlideShell>
      <Eyebrow>Aile · kısa harita</Eyebrow>
      <H2 className="mb-2">Tek GAN değil, bir aile.</H2>
      <Sub className="max-w-3xl mb-8">
        2014&apos;ten sonra temel fikir korunarak birçok varyant türedi. Bu hafta temeli
        kurduk; ileride bunların bazılarına değineceğiz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FeatureCard
          icon={ImageIcon}
          title="DCGAN"
          desc="Evrişimli (conv) katmanlarla görsel üretimi kararlı hâle getiren temel mimari."
          accent="#a855f7"
          delay={0.1}
        />
        <FeatureCard
          icon={Scale}
          title="WGAN / WGAN-GP"
          desc="Wasserstein mesafesiyle daha kararlı eğitim; mod çöküşünü azaltmaya yardımcı."
          accent="#ec4899"
          delay={0.2}
        />
        <FeatureCard
          icon={Target}
          title="Conditional GAN"
          desc="Etiket koşuluyla üretim: &quot;5 rakamı üret&quot; gibi yönlendirilebilir çıktı."
          accent="#3b82f6"
          delay={0.3}
        />
        <FeatureCard
          icon={GitCompare}
          title="CycleGAN"
          desc="Eşli veri olmadan stil çevirisi: ata zebra, yaza kış dönüşümleri."
          accent="#22c55e"
          delay={0.4}
        />
      </div>
    </SlideShell>
  ),

  /* ───── 16 · UYGULAMALI LAB ───── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
      <H2>MNIST üzerinde küçük bir GAN.</H2>
      <Sub className="mt-3 max-w-3xl">
        Hazır iskelet üzerinden çalışacağız: amaç sıfırdan model yazmak değil, eğitim
        döngüsünü ve çöküş belirtilerini <span className="text-white">gözlemlemek</span>.
        Sonraki derse çıktıları getir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Cpu, title: "İskeleti çalıştır", desc: "Verilen notebook ile MNIST üzerinde basit bir GAN&apos;ı birkaç epoch eğit (Colab GPU yeterli).", accent: "#a855f7" },
          { icon: ImageIcon, title: "Örnek ızgarası kaydet", desc: "Her 5 epoch&apos;ta G(z) ile 8×8 örnek ızgarası üret; rakamların netleşmesini izle.", accent: "#3b82f6" },
          { icon: TrendingDown, title: "Kayıpları çiz", desc: "G ve D kayıplarını aynı grafikte çiz; sürekli düşüş mü, salınım mı olduğunu yorumla.", accent: "#ec4899" },
          { icon: ListChecks, title: "Bir çöküş tespit et", desc: "Çıktılar tek-iki rakama saplanırsa not al; öğrenme oranını düşürüp tekrar dene.", accent: "#22c55e" },
        ].map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="uyz-card uyz-card-hover rounded-xl p-5 flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `${t.accent}18`, border: `1px solid ${t.accent}55` }}>
              <t.icon className="w-5 h-5" style={{ color: t.accent }} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-[10px] text-gray-500 font-mono">{i + 1}</span>
                <h3 className="text-base font-semibold text-white">{t.title}</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{t.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 uyz-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3 max-w-4xl"
      >
        <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />
        <span>
          <span className="text-white">İpucu:</span> İlk denemende mükemmel rakam beklemiyoruz.
          Önemli olan eğitim döngüsünü kurmak ve <span className="text-white">davranışı okumayı</span> öğrenmek.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ───── 17 · SIRADAKİ HAFTA + KAPANIŞ ───── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8 uyz-pulse"
          style={{ background: "linear-gradient(135deg, #a855f7, #6d28d9)", boxShadow: "0 0 60px rgba(168,85,247,0.5)" }}
        >
          <Rocket className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>4. hafta tamamlandı · sıradaki: Diffusion Modeller</Eyebrow>
        <H1>
          <span className="uyz-shimmer">Gürültüden Görüntüye</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          GAN&apos;da iki ağ yarıştı. Hafta 5&apos;te tek bir ağın adım adım gürültü ekleyip
          sonra geri temizleyerek nasıl üretim yaptığını — diffusion mantığını — göreceğiz.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-4xl mx-auto">
          <FeatureCard icon={Sparkles} title="İleri süreç" desc="Veriye kademeli gürültü ekleme." accent="#a855f7" delay={0.1} />
          <FeatureCard icon={Brain} title="Geri süreç" desc="Gürültüyü adım adım çözüp örnek üretme." accent="#ec4899" delay={0.2} />
          <FeatureCard icon={GitCompare} title="GAN ile fark" desc="Tek ağ, kararlı eğitim, çok adımlı örnekleme." accent="#3b82f6" delay={0.3} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="uyz-card rounded-xl p-5">
            <Calendar className="w-5 h-5 mb-3" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Ders saati</div>
            <div className="text-white font-semibold">Perşembe</div>
            <div className="text-sm text-gray-400">15:20 — 17:00 · Amfi 1</div>
          </div>
          <div className="uyz-card rounded-xl p-5">
            <Target className="w-5 h-5 mb-3" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">GAN labı</div>
            <div className="text-sm text-gray-400">örnek ızgarası + kayıp grafiği</div>
          </div>
          <div className="uyz-card rounded-xl p-5">
            <Check className="w-5 h-5 mb-3" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Bu hafta özet</div>
            <div className="text-white font-semibold">G ve D çekişmesi</div>
            <div className="text-sm text-gray-400">minimax + iki adımlı döngü</div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 text-[11px] font-mono text-gray-600 uppercase tracking-widest flex items-center justify-center gap-2"
        >
          <X className="w-3.5 h-3.5" />
          <span>BVA 1203 · Üretken Yapay Zekalar · MCBÜ Manisa Meslek Yüksekokulu</span>
        </motion.div>
      </div>
    </SlideShell>
  ),
];

const TOTAL = slides.length;

/* ============================================================
   PRESENTATION ROOT  (h01 ile birebir aynı)
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
          BVA 1203 · 4. Hafta · GAN: Temel Yapı ve Eğitim
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
