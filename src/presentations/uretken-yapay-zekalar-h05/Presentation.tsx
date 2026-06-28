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
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Image as ImageIcon,
  Layers,
  Network,
  ArrowRight,
  ArrowLeftRight,
  Repeat,
  Sliders,
  Tags,
  Map as MapIcon,
  Code2,
  Terminal,
  Calendar,
  Target,
  ListChecks,
  Brain,
  Shuffle,
  Wand2,
  Scale,
  GitCompare,
  Palette,
  Cpu,
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

/* Kod penceresi — bir kütüphane/komut mockup'ı */
function CodeWindow({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
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
          <Terminal className="w-3.5 h-3.5" />
          <span>{title}</span>
        </div>
      </div>
      <div className="uyz-code-body">{children}</div>
    </motion.div>
  );
}

/* GAN temel akış diyagramı: gürültü → Üretici → sahte / gerçek → Ayırt edici */
function GanFlow() {
  const nodes = [
    { icon: Shuffle, label: "z · gürültü", sub: "rastgele vektör", color: "#a855f7" },
    { icon: Wand2, label: "Üretici (G)", sub: "sahte örnek üretir", color: "#ec4899" },
    { icon: ImageIcon, label: "Örnek", sub: "sahte ya da gerçek", color: "#3b82f6" },
    { icon: Scale, label: "Ayırt edici (D)", sub: "gerçek mi sahte mi?", color: "#22c55e" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="uyz-card rounded-2xl p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-center">
        {nodes.map((n, i) => (
          <div key={n.label} className="md:col-span-2 flex items-center gap-3">
            <div className="uyz-arch-node flex-1" style={{ borderColor: `${n.color}55` }}>
              <div
                className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center"
                style={{ background: `${n.color}1f`, border: `1px solid ${n.color}55` }}
              >
                <n.icon className="w-5 h-5" style={{ color: n.color }} />
              </div>
              <div className="text-white text-sm font-semibold">{n.label}</div>
              <div className="text-[11px] text-gray-500 mt-0.5">{n.sub}</div>
            </div>
            {i < nodes.length - 1 && (
              <ArrowRight
                className="w-5 h-5 shrink-0 hidden md:block"
                style={{ color: ACCENT_SOFT }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-5 pt-4 border-t border-white/5 text-xs text-gray-500 flex items-center gap-2">
        <Repeat className="w-3.5 h-3.5" style={{ color: ACCENT_SOFT }} />
        İki ağ karşılıklı yarışır: G aldatmaya, D yakalamaya çalışır. Bu yarış
        dengelendiğinde G&apos;nin ürettiği örnekler gerçekçi olur.
      </div>
    </motion.div>
  );
}

/* Basit karşılaştırma tablosu */
function CompareTable({
  head,
  rows,
}: {
  head: string[];
  rows: ReactNode[][];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="uyz-card rounded-xl p-1 overflow-hidden"
    >
      <table className="uyz-tbl">
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri}>
              {r.map((c, ci) => (
                <td key={ci}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
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
        <Eyebrow>BVA 1203 · 5. Hafta</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.02]"
        >
          <span className="uyz-shimmer">GAN Türleri</span>
        </motion.h1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Tek bir GAN değil, bir aile. DCGAN&apos;den StyleGAN&apos;e — her varyant
          farklı bir problemi çözmek için doğdu.
          <br />
          <span className="text-gray-500 text-base">
            Bu hafta üretici ağların nasıl uzmanlaştığını ve geliştiğini görüyoruz.
          </span>
        </Sub>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
          <FeatureCard
            icon={Layers}
            title="DCGAN"
            desc="Evrişimli katmanlarla görüntü üretiminin temel mimarisi."
            delay={0.3}
            accent="#a855f7"
          />
          <FeatureCard
            icon={Tags}
            title="cGAN / Pix2Pix"
            desc="Etiket ya da girdi görseliyle koşullu, yönlendirilmiş üretim."
            delay={0.42}
            accent="#ec4899"
          />
          <FeatureCard
            icon={ArrowLeftRight}
            title="CycleGAN"
            desc="Eşleşmemiş veriyle alan-alana çeviri (at → zebra)."
            delay={0.54}
            accent="#3b82f6"
          />
          <FeatureCard
            icon={Sliders}
            title="StyleGAN"
            desc="Stil kontrolü ve foto-gerçekçi yüksek çözünürlük."
            delay={0.66}
            accent="#22c55e"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-10 inline-flex items-center gap-2 text-[11px] font-mono text-gray-600 uppercase tracking-widest"
        >
          <Calendar className="w-3.5 h-3.5" />
          MCBÜ MYO · BVA 1203 · Per 15:20 – 17:00 · Amfi 1
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  2 · GEÇEN HAFTADAN KÖPRÜ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 4. haftadan 5. haftaya</Eyebrow>
      <H2>Önce GAN&apos;ı kurduk; şimdi aileyi tanıyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta üretici-ayırt edici (generator-discriminator) ikilisinin temel
        GAN&apos;ını ve VAE ile farkını gördük. Temel GAN&apos;ın bilinen sorunları var:
        eğitim kararsız, çıktı kontrolsüz, çözünürlük düşük. Bu hafta bu sorunları
        çözen GAN türlerini tek tek ele alıyoruz.
      </Sub>

      <div className="mt-8">
        <GanFlow />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3"
      >
        {[
          { icon: AlertTriangle, t: "Kararsız eğitim", d: "Mode collapse — G hep aynı örneği üretir.", c: "#f59e0b" },
          { icon: Target, t: "Kontrolsüz çıktı", d: "Hangi sınıfı üreteceğini söyleyemezsin.", c: "#ec4899" },
          { icon: ImageIcon, t: "Düşük çözünürlük", d: "İlk GAN&apos;lar 64×64 ötesine zor çıkardı.", c: "#3b82f6" },
        ].map((p, i) => (
          <div key={i} className="uyz-card rounded-xl p-4 flex items-start gap-3">
            <p.icon className="w-5 h-5 shrink-0 mt-0.5" style={{ color: p.c }} />
            <div>
              <div className="text-sm font-semibold text-white">{p.t}</div>
              <div className="text-xs text-gray-400 mt-0.5">{p.d}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  3 · DERSİN AKIŞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: temel mimari → koşullu üretim → stil &amp; kalite</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce evrişimli temel mimari (DCGAN); sonra çıktıyı yönlendiren koşullu
        türler (cGAN, Pix2Pix, CycleGAN); en son kararlılık ve foto-gerçekçilik
        (WGAN, StyleGAN). Sonunda küçük bir uygulamalı alıştırma.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            range: "01",
            title: "Temel Mimari",
            items: ["DCGAN: evrişimli katmanlar", "Üretici / ayırt edici tasarımı", "Neden tam bağlı değil?"],
            icon: Layers,
            accent: "#a855f7",
          },
          {
            range: "02",
            title: "Koşullu Üretim",
            items: ["cGAN: etiketle yönlendirme", "Pix2Pix: eşleşmiş çeviri", "CycleGAN: eşleşmemiş çeviri"],
            icon: Tags,
            accent: "#ec4899",
          },
          {
            range: "03",
            title: "Kararlılık &amp; Stil",
            items: ["WGAN: daha stabil kayıp", "StyleGAN: stil kontrolü", "Latent uzay enterpolasyonu"],
            icon: Sliders,
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
                <div
                  className="text-lg font-semibold text-white"
                  dangerouslySetInnerHTML={{ __html: g.title }}
                />
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-400">
              {g.items.map((it) => (
                <li key={it} className="flex items-start gap-2">
                  <ChevronRight
                    className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
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

  /* ─────────────────  4 · BÖLÜM 1 · DCGAN  ───────────────── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="DCGAN — Temel Mimari"
      subtitle="Tam bağlı katmanları evrişimli (convolutional) katmanlarla değiştiren ilk kararlı görüntü GAN'ı. Bugünkü görsel üretiminin atası."
      bgGradient="linear-gradient(135deg, #a855f7 0%, #6d28d9 100%)"
      shadow="0 0 80px rgba(168, 85, 247, 0.55)"
      icon={<Layers className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  5 · DCGAN MİMARİSİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>DCGAN · mimari</Eyebrow>
      <H2 className="mb-2">Üretici: gürültüden görüntüye</H2>
      <Sub className="max-w-3xl mb-6">
        DCGAN üreticisi küçük bir gürültü vektörünü, ters-evrişim (transposed
        convolution) katmanlarıyla adım adım büyüterek bir görüntüye dönüştürür.
        Ayırt edici ise normal evrişimle görüntüyü küçültüp tek bir karara indirir.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="uyz-card rounded-xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: ACCENT_SOFT }}>
            Üretici (G) · yukarı örnekleme
          </div>
          <div className="space-y-2">
            {[
              { l: "z (100)", w: 28, c: "#a855f7" },
              { l: "4×4×512", w: 40, c: "#c084fc" },
              { l: "8×8×256", w: 56, c: "#ec4899" },
              { l: "16×16×128", w: 74, c: "#3b82f6" },
              { l: "64×64×3 görüntü", w: 100, c: "#22c55e" },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, scaleX: 0.6 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                style={{ originX: 0 }}
                className="flex items-center gap-3"
              >
                <div
                  className="rounded h-8 flex items-center px-3 font-mono text-[11px] text-white"
                  style={{ width: `${s.w}%`, background: `${s.c}33`, border: `1px solid ${s.c}66` }}
                >
                  {s.l}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-[11px] text-gray-500 mt-3">
            Her adımda boyut iki katına çıkar, kanal sayısı yarıya iner.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="uyz-card rounded-xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: ACCENT_SOFT }}>
            DCGAN tasarım kuralları
          </div>
          <ul className="space-y-3 text-sm text-gray-300">
            {[
              "Pooling yerine adımlı (strided) evrişim kullan.",
              "Her katmanda batch normalization uygula.",
              "Tam bağlı (dense) gizli katmanları kaldır.",
              "G&apos;de ReLU, çıkışta tanh; D&apos;de LeakyReLU kullan.",
            ].map((t, i) => (
              <li key={i} className="flex gap-2">
                <span style={{ color: ACCENT_SOFT }}>·</span>
                <span dangerouslySetInnerHTML={{ __html: t }} />
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-white/5 text-[11px] text-gray-500 flex items-start gap-2">
            <Network className="w-4 h-4 shrink-0 mt-0.5" style={{ color: ACCENT_SOFT }} />
            Bu kurallar (Radford ve ark., 2015) eğitimi belirgin biçimde
            kararlı hale getirdi ve sonraki tüm görüntü GAN&apos;larına temel oldu.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  6 · BÖLÜM 2 · KOŞULLU ÜRETİM  ───────────────── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Koşullu Üretim"
      subtitle="Temel GAN rastgele üretir; ne çıkacağını söyleyemezsin. cGAN, Pix2Pix ve CycleGAN ile üretime bir 'koşul' ekliyoruz."
      bgGradient="linear-gradient(135deg, #ec4899 0%, #9d174d 100%)"
      shadow="0 0 80px rgba(236, 72, 153, 0.55)"
      icon={<Tags className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  7 · cGAN  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Koşullu GAN · cGAN</Eyebrow>
      <H2 className="mb-2">Üretime bir etiket ekle</H2>
      <Sub className="max-w-3xl mb-8">
        cGAN, hem üreticiye hem ayırt ediciye ek bir koşul (örneğin sınıf etiketi)
        verir. Artık &quot;rastgele bir rakam&quot; değil, &quot;rakam 7&quot;
        üretebilirsin. Koşul, üretimi yönlendiren bir anahtardır.
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
              style={{ background: "#6b728022", border: "1px solid #6b728055" }}
            >
              <Shuffle className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Temel GAN</h3>
          </div>
          <p className="text-sm text-gray-400 mb-4 leading-relaxed">
            Girdi: yalnızca gürültü <span className="font-mono text-gray-300">z</span>.
          </p>
          <div
            className="rounded-lg p-4 font-mono text-sm text-gray-300"
            style={{ background: "#0d0314", border: "1px solid rgba(168,85,247,0.2)" }}
          >
            G(<span style={{ color: ACCENT_SOFT }}>z</span>) → rastgele bir örnek
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Hangi sınıf çıkacağı kontrol edilemez.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="uyz-card-violet rounded-2xl p-7"
          style={{ boxShadow: "0 0 40px rgba(236,72,153,0.18)" }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "#ec489922", border: "1px solid #ec489966" }}
            >
              <Tags className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Koşullu GAN (cGAN)</h3>
          </div>
          <p className="text-sm text-gray-400 mb-4 leading-relaxed">
            Girdi: gürültü <span className="font-mono text-gray-300">z</span> +
            koşul <span className="font-mono text-gray-300">y</span> (etiket).
          </p>
          <div
            className="rounded-lg p-4 font-mono text-sm text-gray-300"
            style={{ background: "#0d0314", border: "1px solid rgba(236,72,153,0.3)" }}
          >
            G(<span style={{ color: ACCENT_SOFT }}>z</span>,{" "}
            <span className="text-pink-400">y=7</span>) → rakam 7 görseli
          </div>
          <p className="text-xs text-gray-500 mt-3">
            D ise &quot;bu görsel gerçek mi <span className="text-white">ve</span>{" "}
            etiketiyle uyumlu mu?&quot; sorusunu cevaplar.
          </p>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  8 · Pix2Pix — KOD MOCKUP  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Pix2Pix · görüntüden görüntüye</Eyebrow>
      <H2 className="mb-2">Eşleşmiş çeviri: girdi → hedef</H2>
      <Sub className="max-w-3xl mb-6">
        Pix2Pix, koşulu bir görüntü olarak alır: kenar çizimi → fotoğraf, gündüz →
        gece, harita → uydu. Eğitim için <span className="text-white">eşleşmiş</span>{" "}
        (girdi, hedef) çiftleri gerekir. Aşağıda PyTorch&apos;ta üretici çağrısının
        sadeleştirilmiş hali var.
      </Sub>

      <CodeWindow title="python · pix2pix_infer.py">
        <div><span className="uyz-code-com"># Eşleşmiş çeviri: kenar haritası → gerçekçi fotoğraf</span></div>
        <div><span className="uyz-code-kw">import</span> torch</div>
        <div><span className="uyz-code-kw">from</span> models <span className="uyz-code-kw">import</span> <span className="uyz-code-cls">Pix2PixGenerator</span></div>
        <div>&nbsp;</div>
        <div>generator = <span className="uyz-code-cls">Pix2PixGenerator</span>().<span className="uyz-code-fn">eval</span>()</div>
        <div>generator.<span className="uyz-code-fn">load_state_dict</span>(torch.<span className="uyz-code-fn">load</span>(<span className="uyz-code-str">&quot;edges2photo.pth&quot;</span>))</div>
        <div>&nbsp;</div>
        <div><span className="uyz-code-com"># Girdi: kenar çizimi (1, 3, 256, 256)</span></div>
        <div>edge = <span className="uyz-code-fn">load_image</span>(<span className="uyz-code-str">&quot;canta_eskiz.png&quot;</span>)</div>
        <div>&nbsp;</div>
        <div><span className="uyz-code-kw">with</span> torch.<span className="uyz-code-fn">no_grad</span>():</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;photo = generator(edge)  <span className="uyz-code-com"># → fotoğraf gibi çıktı</span></div>
        <div>&nbsp;</div>
        <div><span className="uyz-code-fn">save_image</span>(photo, <span className="uyz-code-str">&quot;canta_render.png&quot;</span>)</div>
      </CodeWindow>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-[11px] text-gray-500 font-mono flex items-center gap-2"
      >
        <Code2 className="w-3.5 h-3.5" style={{ color: ACCENT_SOFT }} />
        Pix2Pix bir U-Net üretici + PatchGAN ayırt edici kullanır; kayıp = GAN
        kaybı + L1 (piksel) kaybı.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  9 · CycleGAN  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>CycleGAN · eşleşmemiş çeviri</Eyebrow>
      <H2 className="mb-2">Eşleşmiş veri yoksa: döngü tutarlılığı</H2>
      <Sub className="max-w-3xl mb-6">
        Gerçek hayatta &quot;aynı atın zebra hali&quot; gibi eşleşmiş çiftler çoğu
        zaman yoktur. CycleGAN iki üretici kullanır: A→B ve B→A. Bir görüntü gidip
        geri döndüğünde aslına benzemeli — buna <span className="text-white">döngü tutarlılığı
        (cycle consistency)</span> denir.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="uyz-card rounded-2xl p-7 max-w-4xl mx-auto"
      >
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
          <div className="uyz-arch-node px-5" style={{ borderColor: "#3b82f655" }}>
            <ImageIcon className="w-5 h-5 mx-auto mb-1 text-blue-400" />
            <div className="text-white font-semibold">At (A)</div>
          </div>
          <div className="flex flex-col items-center">
            <ArrowRight className="w-5 h-5" style={{ color: ACCENT_SOFT }} />
            <span className="text-[10px] font-mono text-gray-500">G: A→B</span>
          </div>
          <div className="uyz-arch-node px-5" style={{ borderColor: "#ec489955" }}>
            <ImageIcon className="w-5 h-5 mx-auto mb-1 text-pink-400" />
            <div className="text-white font-semibold">Zebra (B)</div>
          </div>
          <div className="flex flex-col items-center">
            <ArrowRight className="w-5 h-5" style={{ color: ACCENT_SOFT }} />
            <span className="text-[10px] font-mono text-gray-500">F: B→A</span>
          </div>
          <div className="uyz-arch-node px-5" style={{ borderColor: "#22c55e55" }}>
            <ImageIcon className="w-5 h-5 mx-auto mb-1 text-green-400" />
            <div className="text-white font-semibold">At&apos; (yeniden)</div>
          </div>
        </div>
        <div className="mt-5 pt-4 border-t border-white/5 text-xs text-gray-400 flex items-center gap-2 justify-center text-center">
          <Repeat className="w-4 h-4 shrink-0" style={{ color: ACCENT_SOFT }} />
          Kayıp: F(G(A)) ≈ A olmalı. Bu kısıt, modeli içeriği korurken yalnızca
          stili (deseni) değiştirmeye zorlar.
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-5 text-[11px] text-gray-500 text-center"
      >
        Tipik kullanımlar: yaz ↔ kış, fotoğraf ↔ tablo, elma ↔ portakal — hepsi
        eşleşmemiş koleksiyonlarla.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  10 · cGAN/Pix2Pix/CycleGAN TABLO  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Koşullu türler · karşılaştırma</Eyebrow>
      <H2 className="mb-2">Hangi koşul, hangi veri?</H2>
      <Sub className="max-w-3xl mb-6">
        Üçü de &quot;koşullu&quot; ama koşulun türü ve gereken veri farklı. Doğru
        aracı veri durumuna göre seçersin.
      </Sub>

      <CompareTable
        head={["Tür", "Koşul", "Gereken veri", "Tipik örnek"]}
        rows={[
          [
            <span key="t" className="font-mono text-pink-400">cGAN</span>,
            "Sınıf etiketi (y)",
            "Etiketli örnekler",
            "MNIST&apos;te belirli bir rakamı üret",
          ],
          [
            <span key="t" className="font-mono text-pink-400">Pix2Pix</span>,
            "Girdi görüntüsü",
            <span key="d">Eşleşmiş (girdi, hedef) çiftleri</span>,
            "Kenar çizimi → fotoğraf",
          ],
          [
            <span key="t" className="font-mono text-pink-400">CycleGAN</span>,
            "Hedef alan (domain)",
            <span key="d"><span className="text-white">Eşleşmemiş</span> iki koleksiyon</span>,
            "At ↔ zebra, yaz ↔ kış",
          ],
        ]}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-[11px] text-gray-500 font-mono flex items-center gap-2"
      >
        <GitCompare className="w-3.5 h-3.5" style={{ color: ACCENT_SOFT }} />
        Kural: eşleşmiş veri varsa Pix2Pix daha keskin sonuç verir; yoksa CycleGAN
        tek seçenektir.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  11 · BÖLÜM 3 · KARARLILIK & STİL  ───────────────── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Kararlılık &amp; Stil"
      subtitle="GAN eğitimi nam salmış zorlukta. WGAN kaybı daha stabil hale getirir; StyleGAN ise stil kontrolü ve foto-gerçekçilik getirir."
      bgGradient="linear-gradient(135deg, #22c55e 0%, #15803d 100%)"
      shadow="0 0 80px rgba(34, 197, 94, 0.5)"
      icon={<Sliders className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  12 · WGAN  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>WGAN · daha stabil eğitim</Eyebrow>
      <H2 className="mb-2">Kayıp fonksiyonunu değiştir, eğitim rahatlasın</H2>
      <Sub className="max-w-3xl mb-6">
        Klasik GAN&apos;ın en büyük derdi mode collapse ve dengesiz gradyanlar.
        WGAN, ayırt ediciyi bir &quot;eleştirmen&quot;e (critic) çevirip Wasserstein
        mesafesini kullanır; bu, eğitime daha anlamlı bir sinyal verir.
      </Sub>

      <CompareTable
        head={["Konu", "Klasik GAN", "WGAN / WGAN-GP"]}
        rows={[
          [
            "Çıktı katmanı",
            <span key="a">Sigmoid (0–1 olasılık)</span>,
            <span key="b">Lineer (gerçek değer skoru)</span>,
          ],
          [
            "D&apos;nin rolü",
            "Sınıflandırıcı (gerçek/sahte)",
            <span key="b">Eleştirmen (kalite skoru verir)</span>,
          ],
          [
            "Kayıp sinyali",
            "Sıklıkla doygunlaşır / kaybolur",
            <span key="b" className="text-white">Daha pürüzsüz, eğitimle ilişkili</span>,
          ],
          [
            "Kararlılık kısıtı",
            "—",
            <span key="b">Gradyan cezası (WGAN-GP)</span>,
          ],
        ]}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-5 uyz-card rounded-xl p-4 flex items-start gap-3 max-w-4xl"
      >
        <Scale className="w-5 h-5 shrink-0 mt-0.5" style={{ color: ACCENT_SOFT }} />
        <div className="text-sm text-gray-400">
          Pratikte WGAN-GP&apos;nin kayıp eğrisi, üretim kalitesiyle daha tutarlı
          azalır — yani &quot;kayıp düşüyor&quot; demek genelde &quot;çıktı
          iyileşiyor&quot; demektir. Klasik GAN&apos;da bu ilişki çok daha zayıftır.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  13 · StyleGAN  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>StyleGAN · stil kontrolü</Eyebrow>
      <H2 className="mb-2">Latent uzayı, kontrol ettiğin bir panele çevir</H2>
      <Sub className="max-w-3xl mb-6">
        StyleGAN, gürültüyü doğrudan görüntüye sokmaz; önce bir eşleme ağıyla
        ayrıştırılmış bir <span className="font-mono text-gray-300">w</span> uzayına
        çevirir ve stili her katmana ayrı ayrı enjekte eder. Sonuç: foto-gerçekçi
        yüksek çözünürlük ve katman bazında kontrol.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="uyz-card rounded-xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: ACCENT_SOFT }}>
            Akış
          </div>
          <div className="space-y-2.5">
            {[
              { icon: Shuffle, l: "z · gürültü", c: "#a855f7" },
              { icon: MapIcon, l: "Eşleme ağı → w (stil)", c: "#ec4899" },
              { icon: Layers, l: "Her katmana stil enjeksiyonu", c: "#3b82f6" },
              { icon: ImageIcon, l: "1024×1024 görüntü", c: "#22c55e" },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.12 }}
                className="flex items-center gap-3 rounded-lg px-3 py-2"
                style={{ background: `${s.c}12`, border: `1px solid ${s.c}40` }}
              >
                <s.icon className="w-5 h-5 shrink-0" style={{ color: s.c }} />
                <span className="text-sm text-gray-200">{s.l}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="space-y-4"
        >
          <div className="uyz-card rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Sliders className="w-4 h-4" style={{ color: ACCENT_SOFT }} />
              <div className="text-sm font-semibold text-white">Kaba → ince stil</div>
            </div>
            <p className="text-sm text-gray-400">
              Erken katmanlar duruş ve yüz şekli gibi kaba özellikleri; geç katmanlar
              renk ve doku gibi ince ayrıntıları kontrol eder.
            </p>
          </div>
          <div className="uyz-card rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Palette className="w-4 h-4" style={{ color: ACCENT_SOFT }} />
              <div className="text-sm font-semibold text-white">Stil karıştırma</div>
            </div>
            <p className="text-sm text-gray-400">
              İki farklı w vektörünü farklı katmanlarda kullanarak bir yüzün
              duruşunu birinden, rengini diğerinden alabilirsin.
            </p>
          </div>
          <div className="uyz-card rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <div className="text-sm font-semibold text-white">Sorumlu kullanım</div>
            </div>
            <p className="text-sm text-gray-400">
              StyleGAN, var olmayan ama gerçekçi yüzler üretebilir (deepfake riski).
              Çıktıların izinsiz kimlik üretiminde kullanılmaması gerekir.
            </p>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  14 · GENEL KARŞILAŞTIRMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Toparlama · tüm aile</Eyebrow>
      <H2 className="mb-2">GAN türleri tek bakışta</H2>
      <Sub className="max-w-3xl mb-6">
        Her varyant temel GAN&apos;ın bir sınırını aştı. Bir problemle
        karşılaştığında bu tablo, nereden başlayacağını söyler.
      </Sub>

      <CompareTable
        head={["GAN türü", "Getirdiği yenilik", "Çözdüğü sorun", "Yıl"]}
        rows={[
          [
            <span key="t" className="font-mono" style={{ color: ACCENT_SOFT }}>DCGAN</span>,
            "Evrişimli mimari + tasarım kuralları",
            "Kararsız eğitim, düşük kalite",
            <span key="y" className="font-mono">2015</span>,
          ],
          [
            <span key="t" className="font-mono" style={{ color: ACCENT_SOFT }}>cGAN</span>,
            "Etiketle koşullama",
            "Kontrolsüz çıktı",
            <span key="y" className="font-mono">2014</span>,
          ],
          [
            <span key="t" className="font-mono" style={{ color: ACCENT_SOFT }}>Pix2Pix</span>,
            "Görüntüden görüntüye (eşleşmiş)",
            "Yapılandırılmış çeviri yokluğu",
            <span key="y" className="font-mono">2017</span>,
          ],
          [
            <span key="t" className="font-mono" style={{ color: ACCENT_SOFT }}>CycleGAN</span>,
            "Döngü tutarlılığı (eşleşmemiş)",
            "Eşleşmiş veri zorunluluğu",
            <span key="y" className="font-mono">2017</span>,
          ],
          [
            <span key="t" className="font-mono" style={{ color: ACCENT_SOFT }}>WGAN</span>,
            "Wasserstein kaybı + critic",
            "Mode collapse, anlamsız kayıp",
            <span key="y" className="font-mono">2017</span>,
          ],
          [
            <span key="t" className="font-mono" style={{ color: ACCENT_SOFT }}>StyleGAN</span>,
            "Stil enjeksiyonu, w uzayı",
            "Kontrol &amp; foto-gerçekçilik",
            <span key="y" className="font-mono">2019</span>,
          ],
        ]}
      />
    </SlideShell>
  ),

  /* ─────────────────  15 · UYGULAMALI ALIŞTIRMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı alıştırma</Eyebrow>
      <H2>Bir GAN türünü tanı ve eşleştir</H2>
      <Sub className="mt-3 max-w-3xl">
        Eğitim gerektirmez; amaç türleri tanımak. Sonraki derse bu dört adımı yapıp
        kısa bir not getirmen bekleniyor.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          {
            icon: ImageIcon,
            title: "Üç çıktı topla",
            desc: "CycleGAN (at↔zebra), Pix2Pix (kenar→fotoğraf) ve bir StyleGAN yüzü için birer örnek görsel bul (resmi proje sayfalarından).",
            accent: "#a855f7",
          },
          {
            icon: GitCompare,
            title: "Türü gerekçesiyle eşleştir",
            desc: "Her görsel için &quot;bu hangi GAN türü ve neden?&quot; sorusunu bir cümleyle yanıtla.",
            accent: "#ec4899",
          },
          {
            icon: Cpu,
            title: "Hazır bir demo çalıştır",
            desc: "thispersondoesnotexist.com (StyleGAN) sayfasını birkaç kez yenile; ürettiği yüzlerdeki kusurları (kulak, arka plan) not et.",
            accent: "#3b82f6",
          },
          {
            icon: ListChecks,
            title: "Tek paragraf yaz",
            desc: "&quot;Elimde eşleşmemiş veri olsaydı hangi türü seçerdim?&quot; sorusunu 3-4 cümlede yanıtla.",
            accent: "#22c55e",
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
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
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
              <p
                className="text-sm text-gray-400 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t.desc }}
              />
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
        <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Etik hatırlatma:</span> GAN üretimi yüzleri
          gerçek kişilermiş gibi paylaşmak yanıltıcıdır. Üretilen içerikleri
          &quot;sentetik&quot; olarak işaretle.
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
          <Sparkles className="w-12 h-12 text-white" />
        </motion.div>

        <Eyebrow>5. hafta tamamlandı · sıradaki: Diffusion Modeller</Eyebrow>
        <H1>
          <span className="uyz-shimmer">Gürültüden Görüntüye</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          GAN&apos;lar görüntü üretiminin ilk büyük dalgasıydı. Hafta 6&apos;da bugün
          Midjourney ve Stable Diffusion&apos;ın temelindeki diffusion modellerine
          geçiyoruz: gürültü ekle, sonra adım adım geri çöz.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
          <FeatureCard
            icon={Shuffle}
            title="İleri süreç"
            desc="Görüntüye adım adım gürültü ekleme."
            accent="#a855f7"
            delay={0.1}
          />
          <FeatureCard
            icon={Repeat}
            title="Geri süreç"
            desc="Gürültüyü tahmin edip kademeli temizleme."
            accent="#ec4899"
            delay={0.18}
          />
          <FeatureCard
            icon={Brain}
            title="U-Net + zaman"
            desc="Her adımda gürültüyü kestiren ağ."
            accent="#3b82f6"
            delay={0.26}
          />
          <FeatureCard
            icon={GitCompare}
            title="GAN vs Diffusion"
            desc="Kararlılık ve kalite karşılaştırması."
            accent="#22c55e"
            delay={0.34}
          />
        </div>

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
            <Target className="w-5 h-5 mb-3" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">
              Hazırlık
            </div>
            <div className="text-white font-semibold">GAN türleri tablosu</div>
            <div className="text-sm text-gray-400">tekrar et</div>
          </div>
          <div className="uyz-card rounded-xl p-5">
            <ListChecks className="w-5 h-5 mb-3" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">
              Getirilecek
            </div>
            <div className="text-white font-semibold">Alıştırma notu</div>
            <div className="text-sm text-gray-400">4 adım + eşleştirme</div>
          </div>
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
          BVA 1203 · 5. Hafta · GAN Türleri
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
