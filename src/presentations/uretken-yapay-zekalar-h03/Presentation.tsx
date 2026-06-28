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
  Layers,
  Network,
  ArrowRight,
  ArrowLeft,
  Minimize,
  Boxes,
  Dices,
  GitBranch,
  Image as ImageIcon,
  Gauge,
  Filter,
  Wand2,
  Calendar,
  Target,
  ListChecks,
  Code2,
  Terminal,
  Database,
  Shuffle,
  Compass,
  CheckCircle2,
  XCircle,
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

/* Encoder → darboğaz → Decoder şeması */
function AutoencoderDiagram({
  latentLabel = "z",
  latentDim = "2",
  noisy = false,
}: {
  latentLabel?: string;
  latentDim?: string;
  noisy?: boolean;
}) {
  const encoder = [6, 4, 3];
  const decoder = [3, 4, 6];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="uyz-card rounded-2xl p-6"
    >
      <div className="flex items-center justify-center gap-3 md:gap-4">
        {/* Girdi */}
        <div className="text-center">
          <div className="uyz-ae-block w-16 md:w-20 h-32 text-[11px] text-gray-300">
            x
            <span className="text-[9px] text-gray-500 mt-1">girdi</span>
          </div>
          <div className="text-[10px] text-gray-500 mt-2 font-mono">784 boyut</div>
        </div>

        <ArrowRight className="w-5 h-5 uyz-flow-arrow" />

        {/* Encoder */}
        <div className="text-center">
          <div className="flex items-end gap-1.5 justify-center h-32">
            {encoder.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scaleY: 0.4 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.12 }}
                className="w-4 md:w-5 rounded-md"
                style={{
                  height: `${h * 16}px`,
                  background: "linear-gradient(180deg,#a855f7,#6d28d9)",
                  opacity: 0.55,
                }}
              />
            ))}
          </div>
          <div className="text-[10px] mt-2 font-mono" style={{ color: ACCENT_SOFT }}>
            Encoder
          </div>
        </div>

        <ArrowRight className="w-5 h-5 uyz-flow-arrow" />

        {/* Darboğaz / latent */}
        <div className="text-center">
          <div className="uyz-ae-block uyz-latent w-20 md:w-24 h-20 text-sm font-bold">
            {latentLabel}
            {noisy ? (
              <span className="text-[9px] font-normal mt-1 opacity-90">μ, σ → örnekle</span>
            ) : (
              <span className="text-[9px] font-normal mt-1 opacity-90">darboğaz</span>
            )}
          </div>
          <div className="text-[10px] mt-2 font-mono" style={{ color: ACCENT_SOFT }}>
            latent · {latentDim} boyut
          </div>
        </div>

        <ArrowRight className="w-5 h-5 uyz-flow-arrow" />

        {/* Decoder */}
        <div className="text-center">
          <div className="flex items-end gap-1.5 justify-center h-32">
            {decoder.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scaleY: 0.4 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.12 }}
                className="w-4 md:w-5 rounded-md"
                style={{
                  height: `${h * 16}px`,
                  background: "linear-gradient(180deg,#ec4899,#9d174d)",
                  opacity: 0.55,
                }}
              />
            ))}
          </div>
          <div className="text-[10px] mt-2 font-mono text-pink-300">Decoder</div>
        </div>

        <ArrowRight className="w-5 h-5 uyz-flow-arrow" />

        {/* Çıktı */}
        <div className="text-center">
          <div className="uyz-ae-block w-16 md:w-20 h-32 text-[11px] text-gray-300" style={{ borderColor: "rgba(236,72,153,0.3)" }}>
            x&#770;
            <span className="text-[9px] text-gray-500 mt-1">yeniden inşa</span>
          </div>
          <div className="text-[10px] text-gray-500 mt-2 font-mono">784 boyut</div>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-white/5 text-center text-[11px] text-gray-500">
        {noisy ? (
          <>
            Kayıp = yeniden inşa hatası{" "}
            <span className="text-gray-300">‖x − x&#770;‖²</span> + KL ıraksaması{" "}
            <span style={{ color: ACCENT_SOFT }}>D&#8342;&#8343;(q(z|x) ‖ p(z))</span>
          </>
        ) : (
          <>
            Amaç: çıktıyı girdiye olabildiğince yaklaştırmak —{" "}
            <span className="text-gray-300">kayıp = ‖x − x&#770;‖²</span>
          </>
        )}
      </div>
    </motion.div>
  );
}

/* Basit kod penceresi */
function CodeWindow({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
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
      <div className="uyz-code p-5 overflow-x-auto">{children}</div>
    </motion.div>
  );
}

/* Latent uzay ızgarası — VAE'nin pürüzsüz interpolasyonu */
function LatentGrid() {
  const cells = Array.from({ length: 49 });
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="uyz-card rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4 text-[11px] font-mono text-gray-500">
        <span className="flex items-center gap-1.5" style={{ color: ACCENT_SOFT }}>
          <Compass className="w-3.5 h-3.5" /> z&#8321; ekseni
        </span>
        <span>2B latent uzay · her hücre = decoder(z)</span>
      </div>
      <div className="grid grid-cols-7 gap-1.5 max-w-md mx-auto">
        {cells.map((_, i) => {
          const row = Math.floor(i / 7);
          const col = i % 7;
          const hue = 250 + col * 6;
          const light = 30 + row * 5;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.012 }}
              className="aspect-square rounded-md flex items-center justify-center text-[10px] font-mono text-white/70"
              style={{
                background: `hsl(${hue} 60% ${light}%)`,
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {(col + row) % 3 === 0 ? "8" : (col + row) % 3 === 1 ? "3" : "6"}
            </motion.div>
          );
        })}
      </div>
      <div className="mt-4 text-center text-[11px] text-gray-500">
        Komşu noktalar benzer çıktılar üretir — uzayda yürüdükçe rakam{" "}
        <span className="text-gray-300">yumuşakça dönüşür</span>. İşte üretkenliğin sırrı bu.
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
        <Eyebrow>BVA 1203 · 3. Hafta</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.02]"
        >
          <span className="uyz-shimmer">Otomatik Kodlayıcılar</span>
          <br />
          <span className="text-white/90 text-5xl md:text-7xl">ve VAE</span>
        </motion.h1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Veriyi sıkıştırıp geri kuran ağlar — ve onları{" "}
          <span className="text-white">gerçek üretken modellere</span> dönüştüren küçük bir fikir.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={Minimize}
            title="Autoencoder"
            desc="Encoder + darboğaz + decoder. Veriyi kendi kendine yeniden inşa etmeyi öğrenir."
            delay={0.35}
            accent="#a855f7"
          />
          <FeatureCard
            icon={Compass}
            title="Latent Uzay"
            desc="Sıkıştırılmış temsil. Verinin özünü taşıyan az boyutlu &ldquo;harita&rdquo;."
            delay={0.5}
            accent="#ec4899"
          />
          <FeatureCard
            icon={Dices}
            title="VAE"
            desc="Latent uzayı olasılıksal yapıp örnekleyerek yeni veri üreten model."
            delay={0.65}
            accent="#3b82f6"
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
      <Eyebrow>Köprü · 2. haftadan 3. haftaya</Eyebrow>
      <H2>Sinir ağlarını kurduk; şimdi ilk üretken mimarimiz</H2>
      <Sub className="mt-3 max-w-3xl">
        Hafta 2&apos;de bir nöronu, ileri besleme ve geri yayılımı konuştuk: ağ, bir kaybı
        küçülterek girdiden çıktıya bir fonksiyon öğrenir. Bu hafta o makineyi alıp{" "}
        <span className="text-white">veriyi kendine yeniden ürettiren</span> ilk üretken mimariye çeviriyoruz.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            icon: Network,
            tag: "Elimizde olan",
            t: "İleri besleme + geri yayılım",
            d: "Katmanlar, ağırlıklar, kayıp fonksiyonu ve gradyan inişi.",
            accent: "#a855f7",
          },
          {
            icon: Minimize,
            tag: "Bu hafta eklenen",
            t: "Darboğaz fikri",
            d: "Ağı, çıktıyı girdiye eşitlemeye zorla — ama ortadan dar bir geçit koy.",
            accent: "#ec4899",
          },
          {
            icon: Sparkles,
            tag: "Vardığımız yer",
            t: "Yeni örnek üretmek",
            d: "Latent uzaydan örnek çek, decoder&apos;a ver, daha önce var olmayan veriyi al.",
            accent: "#3b82f6",
          },
        ].map((c, i) => (
          <motion.div
            key={c.t}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.13 }}
            className="uyz-card rounded-xl p-6"
          >
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center mb-3"
              style={{ background: `${c.accent}1f`, border: `1px solid ${c.accent}55` }}
            >
              <c.icon className="w-5 h-5" style={{ color: c.accent }} />
            </div>
            <div className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: c.accent }}>
              {c.tag}
            </div>
            <div className="text-base font-semibold text-white mb-1.5">{c.t}</div>
            <p className="text-sm text-gray-400 leading-relaxed">{c.d}</p>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3 · DERSİN AKIŞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: sıkıştır → temsil et → üret</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce sıradan otomatik kodlayıcıyı kuruyoruz; sonra latent uzayın ne işe yaradığını
        görüyoruz; en sonunda VAE ile o uzayı örneklenebilir hâle getirip yeni veri üretiyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            range: "01",
            title: "Autoencoder",
            items: ["Encoder / darboğaz / decoder", "Yeniden inşa kaybı", "Boyut indirgeme & gürültü temizleme"],
            icon: Minimize,
            accent: "#a855f7",
          },
          {
            range: "02",
            title: "Latent Uzay",
            items: ["Sıkıştırılmış temsil", "Sıradan AE neden üretemez?", "Boşluklar ve süreksizlik sorunu"],
            icon: Compass,
            accent: "#ec4899",
          },
          {
            range: "03",
            title: "VAE",
            items: ["μ, σ ve örnekleme", "Reparametrization & KL", "Latent uzaydan üretim"],
            icon: Dices,
            accent: "#3b82f6",
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
                <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: g.accent }}>
                  Durak {g.range}
                </div>
                <div className="text-lg font-semibold text-white">{g.title}</div>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-400">
              {g.items.map((it) => (
                <li key={it} className="flex items-start gap-2">
                  <ChevronRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: g.accent }} />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  4 · BÖLÜM 1  ───────────────── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="Otomatik Kodlayıcı"
      subtitle="Bir ağı, çıktısını girdisine eşitlemeye zorla — ama ortaya dar bir geçit koy. Ağ, veriyi sıkıştırmayı kendi kendine öğrenir."
      bgGradient="linear-gradient(135deg, #a855f7 0%, #6d28d9 100%)"
      shadow="0 0 80px rgba(168, 85, 247, 0.55)"
      icon={<Minimize className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  5 · AE ANATOMİSİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Autoencoder · anatomi</Eyebrow>
      <H2 className="mb-2">Sıkıştır, sakla, geri kur</H2>
      <Sub className="max-w-3xl mb-6">
        Encoder girdiyi az boyutlu bir koda (darboğaz) indirger; decoder bu koddan girdiyi
        yeniden kurmaya çalışır. Etiket gerekmez — verinin kendisi hem girdi hem hedeftir
        (öz-denetimli, self-supervised).
      </Sub>
      <AutoencoderDiagram latentLabel="z" latentDim="2" />
    </SlideShell>
  ),

  /* ─────────────────  6 · NEDEN DARBOĞAZ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Autoencoder · darboğazın anlamı</Eyebrow>
      <H2>Neden ortayı daraltıyoruz?</H2>
      <Sub className="mt-3 max-w-3xl">
        Darboğaz olmasaydı ağ veriyi olduğu gibi kopyalardı (kimlik fonksiyonu) ve hiçbir şey
        öğrenmezdi. Az boyutlu geçit, ağı verinin <span className="text-white">en önemli yapısını</span> seçmeye zorlar.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="uyz-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-red-300">
            <XCircle className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Darboğaz yoksa</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" />Ağ veriyi ezberler, birebir kopyalar.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" />Hiçbir genelleme öğrenilmez.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" />Latent temsil işe yaramaz.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="uyz-card-violet rounded-2xl p-6"
          style={{ boxShadow: "0 0 40px rgba(168,85,247,0.18)" }}
        >
          <div className="flex items-center gap-2 mb-3" style={{ color: ACCENT_SOFT }}>
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Darboğaz varsa</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT_SOFT }} />Ağ, veriyi sığdırmak için özünü çıkarır.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT_SOFT }} />Gürültü atılır, önemli yapı tutulur.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT_SOFT }} />Latent kod anlamlı bir temsile dönüşür.</li>
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-6 uyz-card rounded-xl p-4 flex items-start gap-3 max-w-4xl"
      >
        <Gauge className="w-5 h-5 shrink-0 mt-0.5" style={{ color: ACCENT_SOFT }} />
        <div className="text-sm text-gray-400">
          <span className="text-white">Sezgi:</span> Bir fotoğrafı bir arkadaşına telefonda tarif
          ettiğini düşün. Her pikseli okuyamazsın; &ldquo;mavi gökyüzü, ortada bir ev, solda bir
          ağaç&rdquo; dersin. Encoder tam da bunu yapar; decoder tarifinden resmi yeniden çizer.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  7 · AE KULLANIM ALANLARI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Autoencoder · ne işe yarar</Eyebrow>
      <H2>Üretmeden önce: dört klasik kullanım</H2>
      <Sub className="mt-3 mb-8 max-w-3xl">
        Sıradan bir AE tek başına iyi bir üretken model değildir — ama temsil öğrenmenin pek çok
        pratik işinde sektörde hâlâ kullanılır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FeatureCard
          icon={Minimize}
          title="Boyut indirgeme"
          desc="PCA'nın doğrusal olmayan kuzeni; yüksek boyutlu veriyi az boyuta sıkıştırır."
          delay={0.15}
          accent="#a855f7"
        />
        <FeatureCard
          icon={Filter}
          title="Gürültü temizleme"
          desc="Denoising AE: girdiye gürültü ekle, temizini hedefle. Ağ bozulmayı onarmayı öğrenir."
          delay={0.3}
          accent="#ec4899"
        />
        <FeatureCard
          icon={AlertTriangle}
          title="Anomali tespiti"
          desc="Yeniden inşa hatası yüksekse girdi &ldquo;tanıdık&rdquo; değildir — dolandırıcılık/arıza yakalama."
          delay={0.45}
          accent="#3b82f6"
        />
        <FeatureCard
          icon={Database}
          title="Ön-eğitim / temsil"
          desc="Etiketsiz veriden öğrenilen latent kod, sonraki sınıflandırma işlerine girdi olur."
          delay={0.6}
          accent="#22c55e"
        />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  8 · AE KOD  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Autoencoder · minimal kod</Eyebrow>
      <H2 className="mb-2">PyTorch ile bir AE iskeleti</H2>
      <Sub className="max-w-3xl mb-6">
        İki küçük ağ ve tek bir kayıp. 28&#215;28 piksellik bir görüntü (784 boyut) iki boyuta
        iniyor, sonra geri çıkıyor. Dikkat: encoder ve decoder simetrik.
      </Sub>
      <CodeWindow title="autoencoder.py — PyTorch">
        <pre className="whitespace-pre">
{`import torch.nn as nn

class Autoencoder(nn.Module):
    def __init__(self):
        super().__init__()
        self.encoder = nn.Sequential(
            nn.Linear(784, 128), nn.ReLU(),
            nn.Linear(128, 2),          # darbogaz: 2 boyut
        )
        self.decoder = nn.Sequential(
            nn.Linear(2, 128), nn.ReLU(),
            nn.Linear(128, 784), nn.Sigmoid(),
        )

    def forward(self, x):
        z = self.encoder(x)             # x -> latent kod
        return self.decoder(z)          # latent kod -> x_hat

loss_fn = nn.MSELoss()                  # yeniden insa hatasi`}
        </pre>
      </CodeWindow>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-4 text-[11px] text-gray-500 font-mono"
      >
        Tek hedef: <span style={{ color: ACCENT_SOFT }}>loss = MSE(x, decoder(encoder(x)))</span> — etiket yok, veri kendi öğretmeni.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  9 · BÖLÜM 2  ───────────────── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Latent Uzay"
      subtitle="Darboğazdaki o az boyutlu kod aslında bir harita. Ama sıradan AE'de bu harita delik deşik — ve bu yüzden ondan iyi yeni örnek üretilemez."
      bgGradient="linear-gradient(135deg, #ec4899 0%, #9d174d 100%)"
      shadow="0 0 80px rgba(236, 72, 153, 0.5)"
      icon={<Compass className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  10 · SIRADAN AE NEDEN ÜRETEMEZ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Latent uzay · sorun</Eyebrow>
      <H2 className="mb-2">Sıradan AE neden üretken değildir?</H2>
      <Sub className="max-w-3xl mb-6">
        Eğitimden sonra rastgele bir z seçip decoder&apos;a verirsek genelde anlamsız çıktı alırız.
        Çünkü AE, latent uzayı düzenli olmaya zorlamaz: eğitim noktaları dağınık adacıklara
        yerleşir, aralarda <span className="text-white">tanımsız boşluklar</span> kalır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="uyz-card rounded-2xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-widest mb-4 text-red-300 flex items-center gap-2">
            <Shuffle className="w-4 h-4" /> Sıradan AE latent uzayı
          </div>
          <div
            className="relative rounded-xl h-56"
            style={{ background: "#0d0314", border: "1px solid rgba(236,72,153,0.2)" }}
          >
            {[
              [18, 22], [24, 30], [70, 18], [78, 26], [40, 70], [46, 78], [82, 72], [14, 80],
            ].map(([x, y], i) => (
              <span
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{ left: `${x}%`, top: `${y}%`, background: "#f472b6", boxShadow: "0 0 10px rgba(236,72,153,0.6)" }}
              />
            ))}
            <span
              className="absolute flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-bold text-white"
              style={{ left: "52%", top: "44%", background: "rgba(248,113,113,0.85)", border: "1px solid #fff" }}
            >
              ?
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-3">
            Adacıklar arasındaki <span className="text-red-300">?</span> noktası eğitimde hiç görülmedi → çöp çıktı.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="uyz-card-violet rounded-2xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: ACCENT_SOFT }}>
            <Sparkles className="w-4 h-4" /> İstediğimiz: sürekli ve dolu uzay
          </div>
          <div
            className="relative rounded-xl h-56 overflow-hidden"
            style={{ background: "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.35), rgba(13,3,20,1) 70%)", border: "1px solid rgba(168,85,247,0.3)" }}
          >
            {Array.from({ length: 40 }).map((_, i) => {
              const a = (i / 40) * Math.PI * 2;
              const r = 14 + (i % 5) * 7;
              const x = 50 + Math.cos(a) * r;
              const y = 50 + Math.sin(a) * r;
              return (
                <span
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{ left: `${x}%`, top: `${y}%`, background: "#c084fc", opacity: 0.7 }}
                />
              );
            })}
          </div>
          <p className="text-[11px] text-gray-500 mt-3">
            Noktalar merkeze toplanır, boşluk kalmaz → <span style={{ color: ACCENT_SOFT }}>her z anlamlı</span> bir örnek verir.
          </p>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  11 · BÖLÜM 3  ───────────────── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Varyasyonel AE (VAE)"
      subtitle="Çözüm: encoder tek bir nokta değil, bir olasılık dağılımı (μ, σ) üretsin; o dağılımdan örnek çekelim. Böylece latent uzay düzenli ve örneklenebilir olur."
      bgGradient="linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)"
      shadow="0 0 80px rgba(59, 130, 246, 0.5)"
      icon={<Dices className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  12 · VAE FARKI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>VAE · temel fikir</Eyebrow>
      <H2 className="mb-2">Tek nokta yerine bir dağılım</H2>
      <Sub className="max-w-3xl mb-6">
        VAE&apos;de encoder her girdi için bir ortalama <span className="text-white">μ</span> ve bir standart
        sapma <span className="text-white">σ</span> üretir. Latent kod z bu dağılımdan örneklenir.
        İki ek baskıyla uzay düzgün kalır: yeniden inşa kaybı + KL ıraksaması.
      </Sub>
      <AutoencoderDiagram latentLabel="z ~ N(μ,σ)" latentDim="μ, σ" noisy />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="uyz-card rounded-xl p-4 flex items-start gap-3">
          <ImageIcon className="w-5 h-5 shrink-0 mt-0.5" style={{ color: ACCENT_SOFT }} />
          <div className="text-sm text-gray-400">
            <span className="text-white">Yeniden inşa kaybı:</span> çıktı girdiye benzesin — model
            bilgiyi kaybetmesin.
          </div>
        </div>
        <div className="uyz-card rounded-xl p-4 flex items-start gap-3">
          <Compass className="w-5 h-5 shrink-0 mt-0.5" style={{ color: ACCENT_SOFT }} />
          <div className="text-sm text-gray-400">
            <span className="text-white">KL ıraksaması:</span> her dağılımı standart normale
            <span className="font-mono"> N(0,1)</span> yaklaştırsın — uzay merkezde toplansın, boşluk kalmasın.
          </div>
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  13 · REPARAMETRIZATION  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>VAE · eğitimin püf noktası</Eyebrow>
      <H2 className="mb-2">Reparametrization trick</H2>
      <Sub className="max-w-3xl mb-6">
        Sorun: rastgele örnekleme türevlenemez, geri yayılım kırılır. Çözüm: rastgeleliği dışarı
        taşı. Gürültüyü ayrı bir <span className="font-mono text-white">ε</span> olarak çek, sonra
        z&apos;yi deterministik bir formülle kur.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="uyz-card rounded-2xl p-6 text-center"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-4">Formül</div>
          <div
            className="rounded-xl px-6 py-5 font-mono text-xl md:text-2xl text-white"
            style={{ background: "#0d0314", border: "1px solid rgba(168,85,247,0.3)" }}
          >
            z = μ + σ <span style={{ color: ACCENT_SOFT }}>&#8857;</span> ε
          </div>
          <div className="mt-4 text-sm text-gray-400">
            <span className="font-mono text-white">ε ~ N(0,1)</span> — sabit, türevlenmeyen gürültü kaynağı.
            μ ve σ ise ağın <span className="text-white">öğrenilebilir</span> çıktıları.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-3"
        >
          {[
            { icon: Dices, t: "ε dışarıdan gelir", d: "Rastgelelik artık ağın yolunda değil; gradyan μ ve σ üzerinden temiz akar." },
            { icon: GitBranch, t: "Geri yayılım çalışır", d: "z, μ ve σ&apos;nın türevlenebilir bir fonksiyonu olduğu için ağ uçtan uca eğitilebilir." },
            { icon: Wand2, t: "Üretimde ε rastgele", d: "Eğitim biter; yeni örnek için ε&apos;yi N(0,1)&apos;den çekip decoder&apos;a veririz." },
          ].map((c, i) => (
            <div key={c.t} className="uyz-card rounded-xl p-4 flex items-start gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `${ACCENT}1f`, border: `1px solid ${ACCENT}55` }}
              >
                <c.icon className="w-4 h-4" style={{ color: ACCENT_SOFT }} />
              </div>
              <div>
                <div className="text-sm font-semibold text-white mb-0.5">{i + 1}. {c.t}</div>
                <p className="text-[13px] text-gray-400 leading-relaxed">{c.d}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  14 · LATENT UZAYDA YÜRÜMEK  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>VAE · sonuç</Eyebrow>
      <H2 className="mb-2">Latent uzayda yürümek = pürüzsüz üretim</H2>
      <Sub className="max-w-3xl mb-6">
        VAE&apos;nin düzenli uzayında iki nokta arasında ilerledikçe çıktı yumuşakça değişir.
        Aşağıda 2 boyutlu bir latent ızgaranın her noktasında decoder&apos;ın ürettiği rakamı
        görüyoruz — soldan sağa, yukarıdan aşağıya kademeli geçişler.
      </Sub>
      <LatentGrid />
    </SlideShell>
  ),

  /* ─────────────────  15 · AE vs VAE TABLO  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Karşılaştırma</Eyebrow>
      <H2>Autoencoder mı, VAE mi?</H2>
      <Sub className="mt-3 max-w-3xl">
        İkisi de encoder&#8211;decoder yapısı kullanır; ayrım latent uzayın nasıl kurulduğunda ve
        ne için kullanıldığında.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 uyz-card rounded-xl p-1"
      >
        <table className="uyz-tbl">
          <thead>
            <tr>
              <th style={{ width: "22%" }}>Özellik</th>
              <th style={{ width: "39%" }}>Autoencoder (AE)</th>
              <th>Varyasyonel AE (VAE)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Latent kod</td>
              <td>Tek bir nokta (deterministik vektör).</td>
              <td>Bir dağılım: ortalama μ ve sapma σ.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Kayıp</td>
              <td>Yalnız yeniden inşa hatası (MSE/BCE).</td>
              <td>Yeniden inşa + KL ıraksaması.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Latent uzay</td>
              <td>Düzensiz, boşluklu — örneklemeye uygun değil.</td>
              <td>Sürekli ve merkezde toplu — örneklenebilir.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Yeni örnek üretimi</td>
              <td><span className="font-mono text-red-300">Zayıf</span> · rastgele z genelde çöp verir.</td>
              <td><span className="font-mono text-green-300">İyi</span> · z ~ N(0,1) çekip decoder&apos;a ver.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Tipik kullanım</td>
              <td>Sıkıştırma, gürültü temizleme, anomali.</td>
              <td>Üretim, interpolasyon, temsil öğrenme.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  16 · UYGULAMALI LAB  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı alıştırma</Eyebrow>
      <H2>MNIST üzerinde bir VAE eğit</H2>
      <Sub className="mt-3 max-w-3xl">
        Google Colab (ücretsiz GPU) yeter. Hazır bir VAE not defterini çalıştırıp dört adımı
        gözlemle; sonraki derse ekran görüntülerinle gel.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Boxes, title: "MNIST'i yükle", desc: "torchvision ile 28×28 el yazısı rakamları indir; 0–1 aralığına ölçekle.", accent: "#a855f7" },
          { icon: Code2, title: "VAE'yi eğit", desc: "Encoder μ/σ üretsin, reparametrization ile z'yi kur. Kayıp = MSE + KL. 10 epoch koştur.", accent: "#ec4899" },
          { icon: Dices, title: "Yeni rakam üret", desc: "z ~ N(0,1) örnekle, yalnız decoder'a ver. Daha önce var olmayan rakamlar çiz.", accent: "#3b82f6" },
          { icon: Compass, title: "Latent uzayı tara", desc: "z₁ ve z₂'yi −2…+2 arası gez, ızgarayı çiz; rakamların yumuşak dönüşümünü gözlemle.", accent: "#22c55e" },
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
        <ListChecks className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT_SOFT }} />
        <span>
          <span className="text-white">Teslim:</span> üretilen rakamlardan bir ızgara ve latent
          tarama görseli. Alıştırma not değerlendirmesine girmiyor ama hafta 4&apos;teki GAN
          karşılaştırması için temel oluşturacak.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  17 · SIRADAKİ HAFTA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Önümüzdeki hafta</Eyebrow>
      <H2>Hafta 4 · GAN Mimarileri</H2>
      <Sub className="mt-3 mb-10 max-w-3xl">
        VAE örnekleri bazen bulanık çıkar. Bir sonraki hafta keskin görseller üreten farklı bir
        fikre geçiyoruz: iki ağın <span className="text-white">birbiriyle yarıştığı</span> üretken çekişmeli ağlar.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="uyz-card-violet rounded-2xl p-7"
          style={{ boxShadow: "0 0 40px rgba(168,85,247,0.2)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs font-mono uppercase tracking-wider" style={{ color: ACCENT_SOFT }}>
              Konular
            </div>
          </div>
          <ul className="space-y-3 text-sm">
            {[
              { icon: Wand2, t: "Üretici (Generator) ağ" },
              { icon: Target, t: "Ayırt edici (Discriminator) ağ" },
              { icon: GitBranch, t: "Çekişmeli (adversarial) eğitim" },
              { icon: AlertTriangle, t: "Mod çökmesi ve eğitim kararsızlığı" },
              { icon: Code2, t: "Mini lab · basit bir GAN eğit" },
            ].map((c, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-300">
                <c.icon className="w-4 h-4 shrink-0" style={{ color: ACCENT_SOFT }} />
                <span>{c.t}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="space-y-4"
        >
          <div className="uyz-card rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <ListChecks className="w-4 h-4" style={{ color: ACCENT_SOFT }} />
              <div className="text-sm font-semibold text-white">Önceden bakılabilir</div>
            </div>
            <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside">
              <li>VAE ile GAN örneklerinin keskinlik farkı</li>
              <li>&ldquo;This Person Does Not Exist&rdquo; örneği</li>
              <li>Bu haftanın latent uzay sezgisini tekrar et</li>
            </ul>
          </div>

          <div className="uyz-card rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <ArrowLeft className="w-4 h-4" style={{ color: ACCENT_SOFT }} />
              <div className="text-sm font-semibold text-white">Getirilecek</div>
            </div>
            <p className="text-sm text-gray-400">
              Bu hafta eğittiğin VAE&apos;nin ürettiği rakam ızgarası — hafta 4&apos;ün başında GAN
              çıktısıyla yan yana koyacağız.
            </p>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  18 · KAPANIŞ  ───────────────── */
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
          <Layers className="w-12 h-12 text-white" />
        </motion.div>

        <Eyebrow>Hafta 3 · Bitiş</Eyebrow>
        <H1>
          <span className="uyz-shimmer">Sıkıştır, sonra üret.</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bugün ilk üretken mimarimizi kurduk: AE veriyi sıkıştırdı, VAE o sıkıştırmayı{" "}
          <span className="text-white">örneklenebilir</span> hâle getirip yeni veri ürettirdi.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-4xl mx-auto text-left">
          <div className="uyz-card rounded-xl p-5">
            <Minimize className="w-5 h-5 mb-3" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Akılda kalsın · 1</div>
            <div className="text-white font-semibold">Darboğaz öğretir</div>
            <div className="text-sm text-gray-400">Sıkıştırma, veriyi özüne indirger.</div>
          </div>
          <div className="uyz-card rounded-xl p-5">
            <Dices className="w-5 h-5 mb-3" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Akılda kalsın · 2</div>
            <div className="text-white font-semibold">Dağılım üretir</div>
            <div className="text-sm text-gray-400">μ, σ + örnekleme = düzenli latent uzay.</div>
          </div>
          <div className="uyz-card rounded-xl p-5">
            <Compass className="w-5 h-5 mb-3" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Akılda kalsın · 3</div>
            <div className="text-white font-semibold">Uzay pürüzsüz</div>
            <div className="text-sm text-gray-400">z&apos;de yürümek çıktıyı yumuşakça dönüştürür.</div>
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
          BVA 1203 · 3. Hafta · Autoencoder &amp; VAE
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
