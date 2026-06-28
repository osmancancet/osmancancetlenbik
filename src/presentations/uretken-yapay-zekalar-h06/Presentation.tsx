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
  Zap,
  Image as ImageIcon,
  Code2,
  Cpu,
  Database,
  Layers,
  Network,
  Target,
  Shuffle,
  Scale,
  TrendingDown,
  Terminal,
  Gauge,
  Settings2,
  ListChecks,
  Eye,
  RefreshCw,
  Dices,
  ShieldAlert,
  Calendar,
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

/* Generator ↔ Discriminator adversarial loop */
function GanLoop() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="uyz-card rounded-2xl p-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Latent z */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <div
            className="w-16 h-16 mx-auto rounded-xl flex items-center justify-center mb-2"
            style={{ background: "#3b82f622", border: "1px solid #3b82f655" }}
          >
            <Dices className="w-7 h-7 text-blue-400" />
          </div>
          <div className="text-sm font-semibold text-white">Gürültü z</div>
          <div className="text-[11px] text-gray-500 font-mono">
            z &#8764; N(0, I) · 100 boyut
          </div>
        </motion.div>

        {/* Generator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45 }}
          className="uyz-node p-5 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <Sparkles className="w-5 h-5" style={{ color: ACCENT_SOFT }} />
            <span className="text-white font-semibold">Üretici (G)</span>
          </div>
          <div className="text-[11px] text-gray-400">
            z &rarr; sahte görüntü G(z)
          </div>
          <div className="mt-2 text-[10px] font-mono" style={{ color: ACCENT_SOFT }}>
            amaç: D&apos;yi kandırmak
          </div>
        </motion.div>

        {/* Discriminator */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="uyz-node p-5 text-center"
          style={{ borderColor: "rgba(236,72,153,0.4)" }}
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <Eye className="w-5 h-5 text-pink-400" />
            <span className="text-white font-semibold">Ayırt Edici (D)</span>
          </div>
          <div className="text-[11px] text-gray-400">
            görüntü &rarr; gerçek / sahte
          </div>
          <div className="mt-2 text-[10px] font-mono text-pink-300">
            amaç: sahteyi yakalamak
          </div>
        </motion.div>
      </div>

      {/* Feedback row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 flex items-center justify-center gap-3 text-xs text-gray-400"
      >
        <RefreshCw className="w-4 h-4" style={{ color: ACCENT_SOFT }} />
        <span>
          D&apos;nin verdiği geri bildirim (gradyan), G&apos;yi bir sonraki turda
          daha gerçekçi üretmeye iter. İki ağ sırayla güncellenir.
        </span>
      </motion.div>

      {/* Real data branch */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.95 }}
        className="mt-3 flex items-center justify-center gap-3 text-xs text-gray-500"
      >
        <Database className="w-4 h-4 text-green-400" />
        <span>
          D&apos;ye ayrıca eğitim setinden{" "}
          <span className="text-white">gerçek görüntüler</span> de gösterilir — iki
          sınıfı ayırmayı böyle öğrenir.
        </span>
      </motion.div>
    </motion.div>
  );
}

/* Training script terminal-style code block */
function CodeWindow({
  title,
  lines,
}: {
  title: string;
  lines: ReactNode[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
          <Code2 className="w-3.5 h-3.5" />
          <span>{title}</span>
        </div>
      </div>
      <div className="uyz-code p-5" style={{ borderRadius: 0, border: "none" }}>
        {lines.map((ln, i) => (
          <div key={i} className="flex gap-4">
            <span className="text-gray-700 select-none w-5 text-right">
              {i + 1}
            </span>
            <span className="flex-1 whitespace-pre-wrap">{ln}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* Loss-curve plot: D and G loss over steps */
function LossCurve() {
  // Two illustrative polylines on a 0..100 x 0..100 viewBox.
  const dLoss = "0,82 12,60 24,52 36,48 48,46 60,45 72,46 84,45 100,46";
  const gLoss = "0,20 12,38 24,46 36,49 48,52 60,50 72,53 84,51 100,52";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="uyz-plot p-5 w-full"
    >
      <div className="flex items-center justify-between mb-3 text-[11px] font-mono">
        <span className="text-gray-400 uppercase tracking-wider">
          Kayıp / adım
        </span>
        <span className="flex items-center gap-4">
          <span className="flex items-center gap-1.5" style={{ color: ACCENT_SOFT }}>
            <span className="w-3 h-0.5 inline-block" style={{ background: ACCENT_SOFT }} />
            D kaybı
          </span>
          <span className="flex items-center gap-1.5 text-green-400">
            <span className="w-3 h-0.5 inline-block bg-green-400" />
            G kaybı
          </span>
        </span>
      </div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-48">
        <motion.polyline
          points={dLoss}
          fill="none"
          stroke={ACCENT_SOFT}
          strokeWidth="1.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 0.4 }}
        />
        <motion.polyline
          points={gLoss}
          fill="none"
          stroke="#4ade80"
          strokeWidth="1.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 0.6 }}
        />
      </svg>
      <div className="mt-3 text-[11px] text-gray-500">
        Sağlıklı bir eğitimde iki kayıp belirli bir bant içinde{" "}
        <span className="text-white">dengeye</span> oturur. Birinin sürekli sıfıra
        gidip diğerinin patlaması dengesizlik işaretidir.
      </div>
    </motion.div>
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
        <Eyebrow>BVA 1203 · 6. Hafta</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]"
        >
          <span className="uyz-shimmer">Uygulamalı GAN Eğitimi</span>
          <br />
          <span className="text-white/90">Görüntü Üretimi</span>
        </motion.h1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          İki ağı birbirine karşı eğitip yoktan görüntü ürettiriyoruz.
          <br />
          <span className="text-gray-500 text-base">
            Bu hafta teoriyi koda döküyoruz: DCGAN ile bir eğitim döngüsü kurup
            örnek üretiyoruz.
          </span>
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={Shuffle}
            title="İki Ağ, Bir Oyun"
            desc="Üretici (G) ve ayırt edici (D), sıfır toplamlı bir oyunda karşı karşıya."
            delay={0.3}
            accent="#a855f7"
          />
          <FeatureCard
            icon={Cpu}
            title="DCGAN Mimarisi"
            desc="Konvolüsyon ve ters konvolüsyon katmanlarıyla görüntüye özel GAN."
            delay={0.45}
            accent="#ec4899"
          />
          <FeatureCard
            icon={Terminal}
            title="Eğitim Döngüsü"
            desc="PyTorch ile adım adım: kayıp, optimizasyon, örnek kaydetme."
            delay={0.6}
            accent="#22c55e"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-10 text-[11px] font-mono text-gray-600 uppercase tracking-widest"
        >
          MCBÜ MYO · BVA 1203 · Per 15:20 – 17:00 · Uygulamalı (Colab / PyTorch)
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  2 · GEÇEN HAFTADAN KÖPRÜ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 5. haftadan 6. haftaya</Eyebrow>
      <H2>Mimariyi gördük; şimdi gerçekten eğitiyoruz.</H2>
      <Sub className="mt-3 max-w-3xl">
        5. hafta GAN&apos;ın iki bileşenini ve düşman (adversarial) fikrini
        kâğıt üzerinde kurduk. Bu hafta aynı fikri çalışan bir eğitim
        döngüsüne çeviriyoruz ve gerçek örnek görüntüler üretiyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="uyz-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3" style={{ color: ACCENT_SOFT }}>
            <Brain className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Geçen hafta (teori)
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
              Üretici vs ayırt edici: minimax oyunu.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
              Gürültü vektöründen (z) görüntüye eşleme.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
              Nash dengesi sezgisi ve kayıp fonksiyonu.
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="uyz-card-violet rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-green-300">
            <Terminal className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Bu hafta (uygulama)
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 shrink-0 text-green-400" />
              DCGAN&apos;ın G ve D ağlarını kodla kuralım.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 shrink-0 text-green-400" />
              Eğitim döngüsünü adım adım çalıştıralım.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 shrink-0 text-green-400" />
              Kayıp eğrilerini okuyup örnek görüntü üretelim.
            </li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3 · BU DERSİN AKIŞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: döngü &rarr; mimari &rarr; eğitim</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce düşman döngüsünü hatırlayıp netleştiriyoruz; sonra görüntüye uygun
        DCGAN mimarisini kuruyoruz; en son eğitim döngüsünü çalıştırıp çıktıyı
        değerlendiriyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            range: "01",
            title: "Düşman Döngüsü",
            items: ["G ve D rolleri", "Kayıp fonksiyonu", "Sırayla güncelleme"],
            icon: Shuffle,
            accent: "#a855f7",
          },
          {
            range: "02",
            title: "DCGAN Mimarisi",
            items: ["Ters konvolüsyon (G)", "Strided konvolüsyon (D)", "BatchNorm + LeakyReLU"],
            icon: Layers,
            accent: "#ec4899",
          },
          {
            range: "03",
            title: "Eğitim & Çıktı",
            items: ["PyTorch döngüsü", "Kayıp eğrisi okuma", "Örnek görüntü kaydetme"],
            icon: Terminal,
            accent: "#22c55e",
          },
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
                  <ChevronRight
                    className="w-3.5 h-3.5 mt-0.5 shrink-0"
                    style={{ color: g.accent }}
                  />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  4 · BÖLÜM 1 (DİVİDER)  ───────────────── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="Düşman Döngüsü"
      subtitle="İki ağı birbirine karşı koşan bir kovalamaca. Önce kim kimi neyle besliyor, onu netleştirelim."
      bgGradient="linear-gradient(135deg, #a855f7 0%, #6d28d9 100%)"
      shadow="0 0 80px rgba(168, 85, 247, 0.55)"
      icon={<Shuffle className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  5 · GAN DÖNGÜSÜ DİYAGRAMI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Mimari · genel görünüm</Eyebrow>
      <H2 className="mb-2">Üretici üretir, ayırt edici yargılar</H2>
      <Sub className="max-w-3xl mb-6">
        Üretici rastgele gürültüden sahte görüntü üretir; ayırt edici bunu
        gerçek örneklerden ayırmaya çalışır. İkisi birbirini eğitir — biri
        iyileşince diğeri de zorlanır.
      </Sub>
      <GanLoop />
    </SlideShell>
  ),

  /* ─────────────────  6 · KAYIP / GÜNCELLEME SIRASI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Eğitim mantığı · bir adım</Eyebrow>
      <H2 className="mb-2">Bir eğitim adımı iki yarıdan oluşur</H2>
      <Sub className="max-w-3xl mb-8">
        Her minibatch&apos;te önce ayırt ediciyi, sonra üreticiyi güncelleriz.
        Sıra önemlidir: önce yargıç keskinleşir, sonra sahteci ona göre
        ayarlanır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="uyz-card rounded-2xl p-7"
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: "#ec489922", border: "1px solid #ec489955" }}
            >
              <Eye className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">1. Ayırt ediciyi eğit</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 shrink-0 text-pink-400" />
              Gerçek görüntülere &quot;gerçek&quot; (1) etiketini ver.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 shrink-0 text-pink-400" />
              G(z) sahtelerine &quot;sahte&quot; (0) etiketini ver.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 shrink-0 text-pink-400" />
              İkisindeki hatayı topla, D&apos;nin ağırlıklarını güncelle.
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="uyz-card-violet rounded-2xl p-7"
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: `${ACCENT}22`, border: `1px solid ${ACCENT}66` }}
            >
              <Sparkles className="w-6 h-6" style={{ color: ACCENT_SOFT }} />
            </div>
            <h3 className="text-lg font-semibold text-white">2. Üreticiyi eğit</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />
              Yeni gürültü z üret, G(z) sahtelerini D&apos;ye sok.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />
              Bu kez sahteleri &quot;gerçek&quot; (1) gibi etiketle.
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />
              D&apos;yi kandırma hatasıyla yalnızca G&apos;yi güncelle.
            </li>
          </ul>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 text-center text-sm text-gray-500"
      >
        Üreticiyi güncellerken D&apos;nin ağırlıkları{" "}
        <span className="text-white">dondurulur</span> — yoksa yargıç sahteciye
        yardım etmiş olur.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  7 · BÖLÜM 2 (DİVİDER)  ───────────────── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="DCGAN Mimarisi"
      subtitle="Görüntü için tasarlanmış GAN: katman katman konvolüsyon. Mimari kuralları olan, kararlı eğitilen ilk GAN ailesi."
      bgGradient="linear-gradient(135deg, #db2777 0%, #9d174d 100%)"
      shadow="0 0 80px rgba(219, 39, 119, 0.55)"
      icon={<Layers className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  8 · G ve D KATMANLARI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>DCGAN · iki ağ</Eyebrow>
      <H2 className="mb-2">Biri büyütür, diğeri küçültür</H2>
      <Sub className="max-w-3xl mb-8">
        Üretici, küçük bir vektörü ters konvolüsyonlarla bir görüntüye{" "}
        <span className="text-white">açar</span>. Ayırt edici, görüntüyü strided
        konvolüsyonlarla tek bir skora <span className="text-white">indirger</span>.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="uyz-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4" style={{ color: ACCENT_SOFT }}>
            <Sparkles className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Üretici (G) · yukarı örnekleme
            </span>
          </div>
          <div className="space-y-2 font-mono text-[11px]">
            {[
              "z (100) → reshape 100×1×1",
              "ConvTranspose2d → 512×4×4",
              "ConvTranspose2d → 256×8×8",
              "ConvTranspose2d → 128×16×16",
              "ConvTranspose2d → 3×64×64",
              "Tanh → [-1, 1] görüntü",
            ].map((l, i) => (
              <div
                key={i}
                className="rounded px-3 py-1.5 text-gray-300"
                style={{ background: "#0d0314", border: "1px solid rgba(168,85,247,0.18)" }}
              >
                {l}
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="uyz-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4 text-pink-300">
            <Eye className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Ayırt Edici (D) · aşağı örnekleme
            </span>
          </div>
          <div className="space-y-2 font-mono text-[11px]">
            {[
              "3×64×64 görüntü girişi",
              "Conv2d (stride 2) → 64×32×32",
              "Conv2d (stride 2) → 128×16×16",
              "Conv2d (stride 2) → 256×8×8",
              "Conv2d → 1×1×1 skor",
              "Sigmoid → gerçeklik olasılığı",
            ].map((l, i) => (
              <div
                key={i}
                className="rounded px-3 py-1.5 text-gray-300"
                style={{ background: "#0d0314", border: "1px solid rgba(236,72,153,0.18)" }}
              >
                {l}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  9 · MİMARİ KURALLAR TABLOSU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>DCGAN · pratik kurallar</Eyebrow>
      <H2>Kararlı eğitim için yerleşik reçeteler</H2>
      <Sub className="mt-3 max-w-3xl">
        DCGAN makalesinin (Radford ve ark., 2015) önerdiği birkaç tasarım
        kuralı, eğitimi kayda değer ölçüde kararlı hale getirir. En sık
        kullanılanlar:
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 uyz-card rounded-xl overflow-hidden"
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left" style={{ background: "#150a20" }}>
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider" style={{ color: ACCENT_SOFT, width: "26%" }}>
                Tasarım kuralı
              </th>
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider" style={{ color: ACCENT_SOFT, width: "32%" }}>
                Neden
              </th>
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider" style={{ color: ACCENT_SOFT }}>
                Nasıl uygulanır
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {[
              ["Pooling yerine strided conv", "Ağ örnekleme oranını kendi öğrensin", "D&apos;de stride 2, G&apos;de ConvTranspose"],
              ["Batch Normalization", "Gradyan akışını dengeler, çökmeyi azaltır", "G ve D&apos;nin ara katmanlarında"],
              ["LeakyReLU (D)", "Negatif gradyanı tümden kesmemek", "eğim 0.2 ile"],
              ["Tanh çıkışı (G)", "Görüntüyü [-1, 1] aralığına oturtmak", "veri de aynı aralığa normalize edilir"],
              ["Adam, lr 0.0002", "GAN için ampirik olarak kararlı", "betas = (0.5, 0.999)"],
            ].map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "" : "bg-white/[0.02]"}>
                <td className="px-4 py-3 text-white font-medium">{row[0]}</td>
                <td className="px-4 py-3">{row[1]}</td>
                <td className="px-4 py-3 font-mono text-[12px]" style={{ color: ACCENT_SOFT }}>
                  {row[2]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  10 · BÖLÜM 3 (DİVİDER)  ───────────────── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Eğitim Döngüsü"
      subtitle="Artık kodu yazıp çalıştırıyoruz. Kayıpları okuyup, sık karşılaşılan tuzaklardan kaçınıp örnek üretiyoruz."
      bgGradient="linear-gradient(135deg, #16a34a 0%, #14532d 100%)"
      shadow="0 0 80px rgba(34, 197, 94, 0.5)"
      icon={<Terminal className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  11 · EĞİTİM DÖNGÜSÜ KODU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>PyTorch · eğitim döngüsü</Eyebrow>
      <H2 className="mb-2">Bir epoch&apos;un kalbi</H2>
      <Sub className="max-w-3xl mb-6">
        Tek bir minibatch için iki güncelleme: önce ayırt edici, sonra üretici.
        Aşağıdaki çekirdek döngü, gördüğümüz iki-yarı mantığının doğrudan
        karşılığıdır.
      </Sub>
      <CodeWindow
        title="train_dcgan.py — döngü çekirdeği"
        lines={[
          <>
            <span className="uyz-code-kw">for</span> real, _{" "}
            <span className="uyz-code-kw">in</span> loader:
          </>,
          <>{"    "}<span className="uyz-code-cm"># 1) Ayırt ediciyi eğit</span></>,
          <>{"    "}D.<span className="uyz-code-fn">zero_grad</span>()</>,
          <>{"    "}out_real = D(real)</>,
          <>{"    "}loss_real = <span className="uyz-code-fn">bce</span>(out_real, <span className="uyz-code-num">1</span>)</>,
          <>{"    "}z = torch.<span className="uyz-code-fn">randn</span>(bs, <span className="uyz-code-num">100</span>, <span className="uyz-code-num">1</span>, <span className="uyz-code-num">1</span>)</>,
          <>{"    "}fake = G(z)</>,
          <>{"    "}loss_fake = <span className="uyz-code-fn">bce</span>(D(fake.<span className="uyz-code-fn">detach</span>()), <span className="uyz-code-num">0</span>)</>,
          <>{"    "}(loss_real + loss_fake).<span className="uyz-code-fn">backward</span>(); optD.<span className="uyz-code-fn">step</span>()</>,
          <>{"    "}<span className="uyz-code-cm"># 2) Üreticiyi eğit (sahteyi gerçek say)</span></>,
          <>{"    "}G.<span className="uyz-code-fn">zero_grad</span>()</>,
          <>{"    "}loss_g = <span className="uyz-code-fn">bce</span>(D(fake), <span className="uyz-code-num">1</span>)</>,
          <>{"    "}loss_g.<span className="uyz-code-fn">backward</span>(); optG.<span className="uyz-code-fn">step</span>()</>,
        ]}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-[12px] text-gray-500 font-mono flex items-center gap-2"
      >
        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
        <span>
          <span className="text-amber-400">detach()</span> kritik: D adımında
          G&apos;ye gradyan akmasını engeller.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  12 · KAYIP EĞRİSİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>İzleme · kayıp eğrileri</Eyebrow>
      <H2 className="mb-2">İki kayıp da düşmüyor — ve bu normal</H2>
      <Sub className="max-w-3xl mb-6">
        Sınıflandırmadan farklı olarak GAN&apos;da kayıplar sıfıra inmez. Sağlıklı
        eğitimde D ve G kayıpları bir denge bandında salınır. Asıl ölçüt sayı
        değil, <span className="text-white">üretilen örneklerin kalitesidir</span>.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
        <div className="md:col-span-3">
          <LossCurve />
        </div>
        <div className="md:col-span-2 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="uyz-card rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2" style={{ color: ACCENT_SOFT }}>
              <Gauge className="w-4 h-4" />
              <div className="text-xs font-mono uppercase tracking-wider">
                Sağlıklı işaretler
              </div>
            </div>
            <ul className="text-sm text-gray-300 space-y-1.5">
              <li>D ve G kayıpları yakın bir bantta dolaşır.</li>
              <li>Örnekler epoch&apos;lar boyunca netleşir.</li>
              <li>D(gerçek) ve D(sahte) skorları &#8776; 0.5&apos;e yaklaşır.</li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="rounded-xl p-4"
            style={{
              background: "rgba(245, 158, 11, 0.08)",
              border: "1px solid rgba(245, 158, 11, 0.25)",
            }}
          >
            <div className="flex items-center gap-2 mb-2 text-amber-400">
              <TrendingDown className="w-4 h-4" />
              <div className="text-xs font-mono uppercase tracking-wider">
                Tehlike işaretleri
              </div>
            </div>
            <div className="text-sm text-gray-300">
              D kaybı çabucak 0&apos;a iner ve G kaybı patlarsa: ayırt edici çok
              güçlenmiş, G&apos;ye anlamlı gradyan kalmamıştır.
            </div>
          </motion.div>
        </div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  13 · SIK TUZAKLAR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sık karşılaşılan sorunlar</Eyebrow>
      <H2>Üç klasik tuzak ve pratik çözümü</H2>
      <Sub className="mt-3 max-w-3xl">
        GAN eğitimi kötü şöhretiyle nazlıdır. Bu üç sorunla neredeyse herkes
        karşılaşır; isimlerini ve ilk müdahaleyi bilmek zaman kazandırır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[
          {
            icon: RefreshCw,
            title: "Mode collapse",
            what: "Üretici hep aynı birkaç görüntüyü üretir, çeşitlilik kaybolur.",
            fix: "Mini-batch farkındalığı, etiket yumuşatma, öğrenme oranını düşürmek.",
            accent: "#ec4899",
          },
          {
            icon: Scale,
            title: "Dengesizlik",
            what: "D, G&apos;den çok hızlı öğrenir; G&apos;ye anlamlı gradyan kalmaz.",
            fix: "G&apos;yi adım başına birden çok kez güncellemek, kapasiteyi eşitlemek.",
            accent: "#f59e0b",
          },
          {
            icon: Target,
            title: "Yakınsamama",
            what: "Kayıplar sürekli salınır, örnekler bir türlü netleşmez.",
            fix: "DCGAN reçetesine sadık kalmak, BatchNorm ve doğru lr kullanmak.",
            accent: "#a855f7",
          },
        ].map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="uyz-card rounded-xl p-6"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ background: `${p.accent}18`, border: `1px solid ${p.accent}55` }}
            >
              <p.icon className="w-6 h-6" style={{ color: p.accent }} />
            </div>
            <div className="font-semibold text-white mb-2">{p.title}</div>
            <p className="text-sm text-gray-300 mb-3">{p.what}</p>
            <p className="text-xs text-gray-500 border-t border-white/5 pt-3">
              <span style={{ color: p.accent }}>Çözüm: </span>
              {p.fix}
            </p>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  14 · ÜRETİLEN ÖRNEKLER  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Çıktı · örnek ızgarası</Eyebrow>
      <H2 className="mb-2">Sabit gürültüyle ilerlemeyi izlemek</H2>
      <Sub className="max-w-3xl mb-6">
        Her epoch sonunda <span className="text-white">aynı</span> gürültü
        vektörlerinden örnek üretip kaydederiz. Böylece aynı &quot;tohumun&quot;
        zamanla nasıl netleştiğini yan yana görürüz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { ep: "Epoch 1", note: "Renkli gürültü; yapı yok.", blur: 7 },
          { ep: "Epoch 10", note: "Kaba şekiller belirir.", blur: 3 },
          { ep: "Epoch 40", note: "Tanınabilir, tutarlı görüntüler.", blur: 0 },
        ].map((s, i) => (
          <motion.div
            key={s.ep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.15 }}
            className="uyz-card rounded-2xl p-4"
          >
            <div
              className="rounded-xl uyz-ai-canvas relative min-h-[170px]"
              style={{ filter: `blur(${s.blur}px)` }}
            />
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-white">{s.ep}</span>
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded"
                style={{ background: `${ACCENT}22`, color: ACCENT_SOFT }}
              >
                fixed z
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{s.note}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-center text-xs text-gray-500"
      >
        Görseller temsilîdir · gerçek çıktı veri setine ve eğitim süresine bağlıdır.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  15 · UYGULAMALI LAB  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
      <H2>Colab&apos;da kendi DCGAN&apos;ını eğit</H2>
      <Sub className="mt-3 max-w-3xl">
        Hazır not defteri şablonu üzerinden çalışacağız (GPU çalışma zamanı).
        Sonraki derse aşağıdaki dördünü tamamlamış ve örnek ızgaranı almış
        gelmen bekleniyor.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          {
            icon: Database,
            title: "Veri setini yükle",
            desc: "MNIST veya Fashion-MNIST&apos;i 64×64&apos;e ölçekle, [-1, 1] aralığına normalize et.",
            accent: "#22c55e",
          },
          {
            icon: Settings2,
            title: "G ve D&apos;yi kur",
            desc: "DCGAN reçetesiyle iki ağı tanımla; Adam (lr 0.0002, betas 0.5/0.999) seç.",
            accent: "#ec4899",
          },
          {
            icon: Terminal,
            title: "30+ epoch eğit",
            desc: "İki-yarı döngüyü çalıştır; her epoch&apos;ta sabit z&apos;den örnek kaydet.",
            accent: "#a855f7",
          },
          {
            icon: ListChecks,
            title: "Kayıp eğrisini raporla",
            desc: "D ve G kayıplarını çiz; mode collapse gördüysen 2-3 cümleyle açıkla.",
            accent: "#3b82f6",
          },
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
              style={{ background: `${t.accent}18`, border: `1px solid ${t.accent}55` }}
            >
              <t.icon className="w-5 h-5" style={{ color: t.accent }} />
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
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
        style={{
          background: "rgba(245, 158, 11, 0.08)",
          border: "1px solid rgba(245, 158, 11, 0.25)",
        }}
      >
        <ShieldAlert className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
        <span>
          <span className="text-white">İpucu:</span> CPU&apos;da eğitim çok yavaştır.
          Colab&apos;da <span className="text-white">Runtime &rarr; Change runtime type
          &rarr; GPU</span> seçmeyi unutma; küçük veri setiyle başla.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  16 · SONRAKİ HAFTA + KAPANIŞ  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8 uyz-pulse"
          style={{
            background: "linear-gradient(135deg, #a855f7, #6d28d9)",
            boxShadow: "0 0 60px rgba(168,85,247,0.5)",
          }}
        >
          <ImageIcon className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>6. hafta tamamlandı · sıradaki: Ara Sınav</Eyebrow>
        <H1>
          <span className="uyz-shimmer">Eğit · İzle · Üret</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta düşman döngüsünü koda döküp ilk görüntülerimizi ürettik.
          7. hafta ara sınav; ardından dikkatimizi diffusion modellere ve daha
          modern görüntü üreticilerine çevireceğiz.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="uyz-card rounded-xl p-5">
            <Calendar className="w-5 h-5 mb-3" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">
              Ders saati
            </div>
            <div className="text-white font-semibold">Perşembe</div>
            <div className="text-sm text-gray-400">15:20 — 17:00</div>
          </div>
          <div className="uyz-card rounded-xl p-5">
            <Cpu className="w-5 h-5 mb-3" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">
              Hazırlık
            </div>
            <div className="text-white font-semibold">Colab + GPU</div>
            <div className="text-sm text-gray-400">not defterini çalıştırılır getir</div>
          </div>
          <div className="uyz-card rounded-xl p-5">
            <Network className="w-5 h-5 mb-3" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">
              Teslim
            </div>
            <div className="text-white font-semibold">Örnek ızgarası</div>
            <div className="text-sm text-gray-400">+ kayıp eğrisi grafiği</div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 text-xs font-mono text-gray-600 flex items-center justify-center gap-2"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>BVA 1203 · Üretken Yapay Zekalar · MCBÜ Manisa Meslek Yüksekokulu</span>
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
          BVA 1203 · 6. Hafta · Uygulamalı GAN Eğitimi
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
