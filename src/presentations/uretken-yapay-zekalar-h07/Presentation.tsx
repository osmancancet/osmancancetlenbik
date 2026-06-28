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
  Brain,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Network,
  Layers,
  Eye,
  Cpu,
  Hash,
  Database,
  ArrowRight,
  ArrowLeftRight,
  Workflow,
  Calculator,
  Boxes,
  GitBranch,
  Gauge,
  Terminal,
  ListChecks,
  Target,
  Calendar,
  Repeat,
  Zap,
  Scale,
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

/* Pencere başlıklı kod/diyagram kabuğu (h01 chrome'u ile aynı çerçeve) */
function WindowMock({
  title,
  icon: Icon = Terminal,
  children,
}: {
  title: string;
  icon?: LucideIcon;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
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
          <Icon className="w-3.5 h-3.5" />
          <span>{title}</span>
        </div>
      </div>
      {children}
    </motion.div>
  );
}

/* Self-attention bağlantı diyagramı: seçili kelime diğerlerine ne kadar bakıyor */
function AttentionLinks({
  words,
  focus,
  weights,
}: {
  words: string[];
  focus: number;
  weights: number[];
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {words.map((w, i) => {
        const isFocus = i === focus;
        const weight = weights[i];
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
            className="flex flex-col items-center gap-2"
          >
            <div className={`uyz-word ${isFocus ? "uyz-word-active" : ""}`}>{w}</div>
            {!isFocus && (
              <div className="flex flex-col items-center">
                <div
                  className="w-1.5 rounded-full"
                  style={{
                    height: `${8 + weight * 38}px`,
                    background: `rgba(168, 85, 247, ${0.25 + weight * 0.7})`,
                    boxShadow: weight > 0.5 ? "0 0 12px rgba(168,85,247,0.6)" : undefined,
                  }}
                />
                <span className="text-[10px] font-mono text-gray-500 mt-1">
                  {weight.toFixed(2)}
                </span>
              </div>
            )}
            {isFocus && (
              <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: ACCENT_SOFT }}>
                sorgu
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

/* Attention skor matrisi (heatmap) */
function AttentionMatrix({
  labels,
  matrix,
}: {
  labels: string[];
  matrix: number[][];
}) {
  const n = labels.length;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="uyz-card rounded-2xl p-6 inline-block"
    >
      <div
        className="grid gap-1.5"
        style={{ gridTemplateColumns: `auto repeat(${n}, minmax(0, 1fr))` }}
      >
        <div />
        {labels.map((l, i) => (
          <div key={`top-${i}`} className="uyz-attn-axis pb-1">
            {l}
          </div>
        ))}
        {matrix.map((row, r) => (
          <RowFrag key={`row-${r}`} label={labels[r]} row={row} rIndex={r} />
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3 text-[10px] font-mono text-gray-500">
        <span>düşük</span>
        <span className="flex-1 h-2 rounded-full" style={{ background: "linear-gradient(90deg, rgba(168,85,247,0.08), #a855f7)" }} />
        <span>yüksek dikkat ağırlığı</span>
      </div>
    </motion.div>
  );
}

function RowFrag({ label, row, rIndex }: { label: string; row: number[]; rIndex: number }) {
  return (
    <>
      <div className="uyz-attn-axis pr-2 justify-end">{label}</div>
      {row.map((v, c) => (
        <motion.div
          key={`cell-${rIndex}-${c}`}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 + (rIndex * row.length + c) * 0.02 }}
          className="uyz-attn-cell"
          style={{ background: `rgba(168, 85, 247, ${0.08 + v * 0.85})`, minWidth: 44 }}
        >
          {v.toFixed(2)}
        </motion.div>
      ))}
    </>
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
        <Eyebrow>BVA 1203 · 7. Hafta</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.02]"
        >
          <span className="uyz-shimmer">Dönüştürücüler</span>
          <br />
          <span className="text-white/90 text-4xl md:text-6xl">ve Kendine Dikkat</span>
        </motion.h1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Bugün tüm büyük dil modellerinin altındaki mimariyi açıyoruz:
          Transformer ve onun kalbi olan{" "}
          <span className="text-white">self-attention</span> mekanizması.
        </Sub>

        <div className="grid grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={Repeat}
            title="RNN&apos;den Köprü"
            desc="Diziyi sırayla işlemenin sınırları ve neden aşıldığı."
            delay={0.4}
            accent="#3b82f6"
          />
          <FeatureCard
            icon={Eye}
            title="Self-Attention"
            desc="Her token, dizideki diğer tüm tokenlara bakar."
            delay={0.55}
            accent="#a855f7"
          />
          <FeatureCard
            icon={Layers}
            title="Transformer Bloğu"
            desc="Çok başlı dikkat, konum kodlama ve katmanlar."
            delay={0.7}
            accent="#22c55e"
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

  /* ─────────────────  2 · GEÇEN HAFTADAN KÖPRÜ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · geçen haftadan bugüne</Eyebrow>
      <H2>Token ve olasılıktan, mimariye</H2>
      <Sub className="mt-3 max-w-3xl">
        Daha önce bir dil modelinin yazıyı tokenlara böldüğünü ve &ldquo;bir
        sonraki token&rdquo;ı olasılıkla tahmin ettiğini gördük. Bugünkü soru
        şu: <span className="text-white">model bu tahmini yaparken bağlamı
        nasıl kuruyor?</span> Yanıt, 2017&apos;de yayımlanan Transformer
        mimarisinde.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            icon: Hash,
            t: "Bildiğimiz",
            d: "Metin tokenlara bölünür ve model bir sonraki tokenı olasılıkla seçer.",
            accent: "#3b82f6",
          },
          {
            icon: Brain,
            t: "Eksik halka",
            d: "Bir tokenı tahmin ederken cümlenin geri kalanı nasıl hesaba katılıyor?",
            accent: "#a855f7",
          },
          {
            icon: Eye,
            t: "Bugünkü yanıt",
            d: "Self-attention: her token, ilgili diğer tokenlara ağırlıklı olarak &ldquo;bakar&rdquo;.",
            accent: "#22c55e",
          },
        ].map((c, i) => (
          <motion.div
            key={c.t}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
            className="uyz-card rounded-xl p-6"
          >
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center mb-3"
              style={{ background: `${c.accent}1f`, border: `1px solid ${c.accent}55` }}
            >
              <c.icon className="w-5 h-5" style={{ color: c.accent }} />
            </div>
            <div className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: c.accent }}>
              {c.t}
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">{c.d}</p>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3 · DERSİN AKIŞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: RNN&apos;in sınırı → dikkat → Transformer</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce neden yeni bir mimariye ihtiyaç duyulduğunu görüyoruz; sonra
        self-attention&apos;ı adım adım sökeceğiz; en sonunda parçaları bir
        Transformer bloğunda birleştirip küçük bir uygulama yapacağız.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            range: "01",
            title: "Neden Transformer?",
            items: ["RNN ve sıralı işlemenin darboğazı", "Uzun bağımlılık sorunu", "Paralelleştirme ihtiyacı"],
            icon: Repeat,
            accent: "#3b82f6",
          },
          {
            range: "02",
            title: "Self-Attention",
            items: ["Query · Key · Value", "Skor → softmax → ağırlık", "Çok başlı dikkat"],
            icon: Eye,
            accent: "#a855f7",
          },
          {
            range: "03",
            title: "Transformer Bloğu",
            items: ["Konum kodlama", "Katman yığını ve artık bağlantı", "Encoder · decoder"],
            icon: Layers,
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
      title="Neden Transformer?"
      subtitle="Transformer&apos;ı anlamak için önce çözdüğü problemi görmek gerek: diziyi sırayla işlemenin yarattığı darboğaz."
      bgGradient="linear-gradient(135deg, #2563eb 0%, #1e40af 100%)"
      shadow="0 0 80px rgba(37, 99, 235, 0.55)"
      icon={<Repeat className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  5 · RNN SINIRLARI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Eski yöntem · 1/2</Eyebrow>
      <H2>RNN: kelimeleri sırayla, tek tek</H2>
      <Sub className="mt-3 mb-8 max-w-3xl">
        Transformer öncesinde diziler çoğunlukla tekrarlayan sinir ağlarıyla
        (RNN/LSTM) işlenirdi. Bilgi, kelimeden kelimeye taşınan tek bir gizli
        durumda (hidden state) sıkıştırılırdı. Bu yaklaşımın iki temel sınırı
        var.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="uyz-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <ArrowRight className="w-5 h-5" style={{ color: ACCENT_SOFT }} />
            <div className="text-sm font-semibold text-white">Sıralı işleme</div>
          </div>
          <div className="flex items-center gap-2 flex-wrap mb-3">
            {["Spil", "Dağı", "Manisa'da", "yükselir"].map((w, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="uyz-word">{w}</span>
                {i < 3 && <ArrowRight className="w-4 h-4 text-gray-600" />}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Her adım bir öncekini beklediği için hesaplama{" "}
            <span className="text-white">paralelleştirilemez</span>. Uzun
            metinde eğitim yavaşlar; GPU&apos;lar boş bekler.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="uyz-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <GitBranch className="w-5 h-5" style={{ color: ACCENT_SOFT }} />
            <div className="text-sm font-semibold text-white">Uzun bağımlılık</div>
          </div>
          <div
            className="rounded-lg p-4 text-sm text-gray-200 leading-relaxed mb-3"
            style={{ background: "#0d0314", border: "1px solid rgba(168,85,247,0.2)" }}
          >
            &ldquo;Manisa&apos;da büyüyen, sonra İzmir&apos;e taşınan ve yıllarca
            orada yaşayan <span className="text-violet-300">o</span> ...&rdquo;
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            &ldquo;o&rdquo; kime işaret ediyor? Araya çok kelime girince RNN&apos;in
            tek gizli durumu erken bilgiyi <span className="text-white">unutur</span>{" "}
            (kaybolan gradyan problemi).
          </p>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  6 · TRANSFORMER ÇÖZÜMÜ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Yeni yöntem · 2/2</Eyebrow>
      <H2>Transformer: tüm diziyi aynı anda</H2>
      <Sub className="mt-3 mb-10 max-w-3xl">
        2017&apos;de &ldquo;Attention Is All You Need&rdquo; makalesiyle tanıtılan
        Transformer, tekrarı tamamen kaldırdı. Bütün tokenlar tek seferde
        işlenir ve her token diğerleriyle doğrudan ilişki kurar.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: Zap,
            title: "Paralel hesaplama",
            desc: "Tüm tokenlar aynı anda işlenir; GPU&apos;lar tam dolu çalışır, eğitim hızlanır.",
            accent: "#a855f7",
          },
          {
            icon: ArrowLeftRight,
            title: "Doğrudan erişim",
            desc: "İki token arasındaki mesafe ne olursa olsun ilişki tek adımda kurulur.",
            accent: "#ec4899",
          },
          {
            icon: Gauge,
            title: "Ölçeklenebilirlik",
            desc: "Daha çok katman ve veriyle büyütülebildiği için bugünkü dev modellerin temeli oldu.",
            accent: "#22c55e",
          },
        ].map((c, i) => (
          <FeatureCard
            key={c.title}
            icon={c.icon}
            title={c.title}
            desc={c.desc}
            accent={c.accent}
            delay={0.2 + i * 0.15}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-8 uyz-card rounded-xl p-5 flex items-center gap-4"
      >
        <Network className="w-8 h-8 shrink-0" style={{ color: ACCENT_SOFT }} />
        <div className="text-sm text-gray-400">
          <span className="text-white font-semibold">GPT, BERT, T5, LLaMA</span> —
          isimleri farklı olsa da hepsi aynı çekirdeği paylaşır: üst üste
          dizilmiş Transformer katmanları ve self-attention.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  7 · BÖLÜM 2  ───────────────── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Self-Attention"
      subtitle="Transformer&apos;ın kalbi. Her token, kendisi dahil dizideki tüm tokenlara &ldquo;ne kadar dikkat etmeliyim?&rdquo; diye sorar."
      bgGradient="linear-gradient(135deg, #a855f7 0%, #6d28d9 100%)"
      shadow="0 0 80px rgba(168, 85, 247, 0.55)"
      icon={<Eye className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  8 · SEZGİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sezgi · &ldquo;o&rdquo; kime bakıyor?</Eyebrow>
      <H2>Dikkat: hangi kelime hangisiyle ilgili?</H2>
      <Sub className="mt-3 mb-10 max-w-3xl">
        Bir tokenı anlamlandırmak için modelin cümlenin neresine bakması
        gerektiğini self-attention belirler. Aşağıda{" "}
        <span className="text-white">&ldquo;o&rdquo;</span> tokenı sorgu (query)
        olarak diğer kelimelere ne kadar dikkat veriyor:
      </Sub>

      <AttentionLinks
        words={["Kedi", "süt", "içti", "çünkü", "o", "açtı"]}
        focus={4}
        weights={[0.62, 0.18, 0.05, 0.02, 0, 0.13]}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="mt-10 uyz-card rounded-xl p-5 max-w-3xl mx-auto flex items-center gap-3"
      >
        <Eye className="w-5 h-5 shrink-0" style={{ color: ACCENT_SOFT }} />
        <div className="text-sm text-gray-400">
          &ldquo;o&rdquo; en yüksek ağırlığı{" "}
          <span className="text-white">&ldquo;Kedi&rdquo;</span> tokenına veriyor —
          model, zamiri öznesiyle ilişkilendirmeyi öğrenmiş. Bu ağırlıklar elle
          yazılmaz; <span className="text-white">eğitim sırasında</span> verilen
          milyarlarca cümleden çıkarılır.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  9 · Q · K · V  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Mekanizma · 1/3</Eyebrow>
      <H2>Query, Key, Value — üç vektör</H2>
      <Sub className="mt-3 mb-10 max-w-3xl">
        Her token, öğrenilen üç ağırlık matrisiyle üç vektöre dönüştürülür.
        Kütüphanede arama yapmaya benzer: ne aradığını, rafların etiketini ve
        rafın içeriğini düşün.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {
            sym: "Q",
            name: "Query (Sorgu)",
            desc: "Bu token ne arıyor? &ldquo;Benimle ilgili olan kelimeleri bul.&rdquo;",
            analogy: "Aradığın kitabın konusu",
            accent: "#a855f7",
          },
          {
            sym: "K",
            name: "Key (Anahtar)",
            desc: "Diğer tokenların etiketi. Query ile eşleşme skoru buradan çıkar.",
            analogy: "Rafların üzerindeki etiketler",
            accent: "#3b82f6",
          },
          {
            sym: "V",
            name: "Value (Değer)",
            desc: "Tokenın taşıdığı asıl içerik. Eşleşme yüksekse bu içerik aktarılır.",
            analogy: "Rafın içindeki kitabın kendisi",
            accent: "#22c55e",
          },
        ].map((v, i) => (
          <motion.div
            key={v.sym}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
            className="uyz-card rounded-2xl p-6"
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 text-2xl font-bold"
              style={{ background: `${v.accent}1f`, border: `1px solid ${v.accent}66`, color: v.accent }}
            >
              {v.sym}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{v.name}</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-3">{v.desc}</p>
            <div
              className="text-xs px-3 py-2 rounded-lg"
              style={{ background: `${v.accent}12`, color: v.accent }}
            >
              Benzetme: {v.analogy}
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  10 · HESAP ADIMLARI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Mekanizma · 2/3</Eyebrow>
      <H2>Skordan ağırlığa: dört adım</H2>
      <Sub className="mt-3 mb-8 max-w-3xl">
        Tek bir token için dikkat çıktısı dört işlemle hesaplanır. Formül kısa:{" "}
        <span className="font-mono text-violet-300">
          softmax(Q·K&#7488; / &radic;d&#8342;) · V
        </span>
        .
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
        {[
          {
            n: "01",
            icon: Calculator,
            title: "Skor",
            desc: "Query ile her Key&apos;in nokta çarpımı alınır. Benzerlik ne kadar yüksekse skor o kadar büyük.",
            accent: "#a855f7",
          },
          {
            n: "02",
            icon: Scale,
            title: "Ölçekle",
            desc: "Skorlar &radic;d&#8342;&apos;ye bölünür. Bu, büyük boyutlarda softmax&apos;ın aşırı keskinleşmesini önler.",
            accent: "#ec4899",
          },
          {
            n: "03",
            icon: Gauge,
            title: "Softmax",
            desc: "Skorlar 0–1 arası ağırlıklara çevrilir ve toplamları 1 olur. Artık &ldquo;dikkat dağılımı&rdquo;dır.",
            accent: "#3b82f6",
          },
          {
            n: "04",
            icon: Boxes,
            title: "Ağırlıklı toplam",
            desc: "Her Value, kendi ağırlığıyla çarpılıp toplanır. Sonuç: bağlamla zenginleşmiş yeni vektör.",
            accent: "#22c55e",
          },
        ].map((step, i) => (
          <motion.div
            key={step.n}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
            className="relative uyz-card rounded-2xl p-5"
          >
            <div
              className="absolute -top-3 left-5 px-3 py-1 rounded-full text-[10px] font-mono font-bold"
              style={{ background: step.accent, color: "#fff", boxShadow: `0 0 20px ${step.accent}55` }}
            >
              {step.n}
            </div>
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 mt-2"
              style={{ background: `${step.accent}1f`, border: `1px solid ${step.accent}55` }}
            >
              <step.icon className="w-5 h-5" style={{ color: step.accent }} />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">{step.title}</h3>
            <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>

            {i < 3 && (
              <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full items-center justify-center" style={{ background: "#0a0414", border: "1px solid rgba(168,85,247,0.3)" }}>
                <ChevronRight className="w-4 h-4" style={{ color: ACCENT_SOFT }} />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="mt-6 text-center text-xs text-gray-500"
      >
        Burada <span className="font-mono text-violet-300">d&#8342;</span> Key
        vektörlerinin boyutudur; ölçekleme bu yüzden &ldquo;ölçekli nokta
        çarpımı dikkati&rdquo; (scaled dot-product attention) adını verir.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  11 · ATTENTION MATRİSİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Mekanizma · görselleştirme</Eyebrow>
      <H2 className="mb-2">Tüm token çiftleri: dikkat matrisi</H2>
      <Sub className="max-w-3xl mb-8">
        Her token her tokena baktığı için skorlar bir kare matris oluşturur.
        Satır = sorgulayan token, sütun = bakılan token. Koyu hücre, yüksek
        dikkat ağırlığı demek.
      </Sub>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        <AttentionMatrix
          labels={["Kedi", "süt", "içti", "o"]}
          matrix={[
            [0.80, 0.10, 0.06, 0.04],
            [0.15, 0.70, 0.10, 0.05],
            [0.30, 0.25, 0.40, 0.05],
            [0.62, 0.12, 0.06, 0.20],
          ]}
        />
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-3 max-w-sm"
        >
          <div className="uyz-card rounded-xl p-4">
            <div className="text-sm font-semibold text-white mb-1">Köşegen güçlü</div>
            <p className="text-sm text-gray-400">
              Çoğu token kendine yüksek ağırlık verir — kendi anlamını korumak için.
            </p>
          </div>
          <div className="uyz-card rounded-xl p-4">
            <div className="text-sm font-semibold text-white mb-1">&ldquo;o&rdquo; → &ldquo;Kedi&rdquo;</div>
            <p className="text-sm text-gray-400">
              Son satırda en koyu hücre &ldquo;Kedi&rdquo; sütununda: zamir öznesine bağlanıyor.
            </p>
          </div>
          <div className="uyz-card rounded-xl p-4">
            <div className="text-sm font-semibold text-white mb-1">Her satır toplamı 1</div>
            <p className="text-sm text-gray-400">
              Softmax sayesinde her sorgunun dikkat dağılımı bir olasılık dağılımıdır.
            </p>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  12 · ÇOK BAŞLI DİKKAT  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Mekanizma · 3/3</Eyebrow>
      <H2>Çok başlı dikkat (Multi-Head)</H2>
      <Sub className="mt-3 mb-10 max-w-3xl">
        Tek bir dikkat işlemi tek bir ilişki türünü yakalar. Transformer bunu
        paralel birçok &ldquo;baş&rdquo; ile çalıştırır; her baş farklı bir
        ilişkiye odaklanır, sonra çıktılar birleştirilir.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { h: "Baş 1", focus: "Sözdizimi", desc: "Özne–yüklem, fiil çekimi gibi dilbilgisel bağlar.", accent: "#a855f7" },
          { h: "Baş 2", focus: "Zamir bağı", desc: "&ldquo;o&rdquo;, &ldquo;bu&rdquo; gibi zamirleri işaret ettikleri isme bağlar.", accent: "#ec4899" },
          { h: "Baş 3", focus: "Yakın bağlam", desc: "Komşu kelimeler ve yerel ifade kalıpları.", accent: "#3b82f6" },
          { h: "Baş 4", focus: "Uzak bağlam", desc: "Cümlenin başı ile sonu arasındaki uzun bağımlılıklar.", accent: "#22c55e" },
        ].map((b, i) => (
          <motion.div
            key={b.h}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
            className="uyz-card rounded-xl p-5"
          >
            <div className="text-[10px] font-mono uppercase tracking-widest mb-2" style={{ color: b.accent }}>
              {b.h}
            </div>
            <div className="text-base font-semibold text-white mb-2">{b.focus}</div>
            <p className="text-xs text-gray-400 leading-relaxed">{b.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-8 uyz-card rounded-xl p-5 flex items-center gap-4"
      >
        <Layers className="w-8 h-8 shrink-0" style={{ color: ACCENT_SOFT }} />
        <div className="text-sm text-gray-400">
          Pratikte bir katmanda <span className="text-white">8, 16 veya daha
          fazla baş</span> bulunur. Hepsinin çıktısı yan yana eklenip tek bir
          doğrusal katmandan geçirilerek birleştirilir. Başlar burada örnek
          amaçlıdır; gerçek başların rolleri kendiliğinden, eğitimle ortaya çıkar.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  13 · BÖLÜM 3  ───────────────── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Transformer Bloğu"
      subtitle="Self-attention tek başına yeterli değil. Onu konum bilgisi, ileri besleme katmanı ve artık bağlantılarla tam bir mimariye dönüştürüyoruz."
      bgGradient="linear-gradient(135deg, #16a34a 0%, #15803d 100%)"
      shadow="0 0 80px rgba(34, 197, 94, 0.55)"
      icon={<Layers className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  14 · KONUM KODLAMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Eksik parça · sıralama</Eyebrow>
      <H2>Konum kodlama: sıra neden gerekli?</H2>
      <Sub className="mt-3 mb-8 max-w-3xl">
        Self-attention tüm tokenlara aynı anda baktığı için doğal olarak{" "}
        <span className="text-white">sırayı bilmez</span>. &ldquo;Köpek kediyi
        kovaladı&rdquo; ile &ldquo;Kedi köpeği kovaladı&rdquo; arasındaki farkı
        kaybetmemek için her tokena konum bilgisi eklenir.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="uyz-card rounded-2xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: ACCENT_SOFT }}>
            Sırasız (sorun)
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {["Kedi", "köpeği", "kovaladı"].map((w, i) => (
              <span key={i} className="uyz-word">{w}</span>
            ))}
          </div>
          <p className="text-sm text-gray-400">
            Model için bu kelime kümesi, karıştırılmış hâliyle aynı görünür.
            Anlam kayar.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="uyz-card-violet rounded-2xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: ACCENT_SOFT }}>
            Konum eklenmiş (çözüm)
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {["Kedi", "köpeği", "kovaladı"].map((w, i) => (
              <span key={i} className="uyz-word flex-col leading-tight">
                <span>{w}</span>
                <span className="text-[9px] text-gray-500">poz {i}</span>
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-400">
            Her tokenın gömme vektörüne konuma özgü bir desen eklenir. Böylece
            &ldquo;0. sıradaki Kedi&rdquo; özne olarak ayırt edilir.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-6 text-center text-xs text-gray-500"
      >
        Konum kodlama sinüs–kosinüs desenleriyle sabit verilebilir ya da
        modelle birlikte öğrenilebilir; modern modeller genelde öğrenilen veya
        döndürmeli (RoPE) varyantları kullanır.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  15 · BLOK MİMARİSİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bir araya gelince</Eyebrow>
      <H2 className="mb-2">Bir Transformer katmanının iç yapısı</H2>
      <Sub className="max-w-3xl mb-6">
        Parçaları üst üste dizdiğimizde tek bir blok çıkar. Modeller bu bloktan
        onlarcasını üst üste yığar (örneğin küçük modellerde 12, büyük
        modellerde çok daha fazla katman).
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
        <div className="md:col-span-3">
          <WindowMock title="transformer_block · ileri geçiş" icon={Workflow}>
            <div className="p-5 space-y-2" style={{ background: "#0a0414" }}>
              {[
                { t: "Girdi: token gömme + konum kodlama", c: "#9ca3af" },
                { t: "↓", c: "#4b5563" },
                { t: "Çok başlı self-attention", c: "#c084fc" },
                { t: "+ Artık bağlantı  &  katman normalizasyonu", c: "#60a5fa" },
                { t: "↓", c: "#4b5563" },
                { t: "İleri besleme ağı (feed-forward)", c: "#4ade80" },
                { t: "+ Artık bağlantı  &  katman normalizasyonu", c: "#60a5fa" },
                { t: "↓", c: "#4b5563" },
                { t: "Çıktı: bağlamla zenginleşmiş vektörler", c: "#9ca3af" },
              ].map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.3 + i * 0.08 }}
                  className="font-mono text-[13px]"
                  style={{ color: row.c }}
                >
                  {row.t}
                </motion.div>
              ))}
            </div>
          </WindowMock>
        </div>

        <div className="md:col-span-2 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="uyz-card rounded-xl p-4"
          >
            <div className="text-sm font-semibold text-white mb-1">Artık bağlantı</div>
            <p className="text-sm text-gray-400">
              Girdi, alt katmanın çıktısına eklenir. Derin ağlarda bilgi ve
              gradyan akışını korur.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="uyz-card rounded-xl p-4"
          >
            <div className="text-sm font-semibold text-white mb-1">İleri besleme</div>
            <p className="text-sm text-gray-400">
              Her token, dikkatten sonra küçük bir sinir ağından bağımsız geçer;
              modelin &ldquo;işleme gücünü&rdquo; artırır.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="uyz-card rounded-xl p-4"
          >
            <div className="text-sm font-semibold text-white mb-1">Yığınla</div>
            <p className="text-sm text-gray-400">
              Aynı blok defalarca üst üste konur; her katman bir öncekinin
              çıktısını daha da soyutlar.
            </p>
          </motion.div>
        </div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  16 · ENCODER vs DECODER  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Mimari aileleri</Eyebrow>
      <H2>Encoder, decoder ve maskeli dikkat</H2>
      <Sub className="mt-3 max-w-3xl">
        Aynı yapı taşı, kullanılış biçimine göre farklı modelleri doğurur.
        Aradaki kilit fark, dikkatin <span className="text-white">geleceği
        görüp görememesi</span>.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 uyz-card rounded-xl p-1"
      >
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="text-gray-400 text-xs uppercase tracking-wider font-mono">
              <th className="p-3 font-medium">Tür</th>
              <th className="p-3 font-medium">Dikkat</th>
              <th className="p-3 font-medium">Tipik görev</th>
              <th className="p-3 font-medium">Örnek</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            <tr style={{ borderTop: "1px solid rgba(168,85,247,0.12)" }}>
              <td className="p-3 font-semibold text-white">Encoder</td>
              <td className="p-3">Çift yönlü — tüm tokenları görür</td>
              <td className="p-3">Sınıflandırma, anlama, gömme çıkarma</td>
              <td className="p-3 font-mono text-violet-300">BERT</td>
            </tr>
            <tr style={{ borderTop: "1px solid rgba(168,85,247,0.12)" }}>
              <td className="p-3 font-semibold text-white">Decoder</td>
              <td className="p-3">Maskeli — yalnız geçmişe bakar</td>
              <td className="p-3">Metin üretimi (sonraki token tahmini)</td>
              <td className="p-3 font-mono text-violet-300">GPT</td>
            </tr>
            <tr style={{ borderTop: "1px solid rgba(168,85,247,0.12)" }}>
              <td className="p-3 font-semibold text-white">Encoder–Decoder</td>
              <td className="p-3">Encoder çift yönlü + decoder maskeli</td>
              <td className="p-3">Çeviri, özetleme (diziden diziye)</td>
              <td className="p-3 font-mono text-violet-300">T5 · orijinal Transformer</td>
            </tr>
          </tbody>
        </table>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-5 text-[12px] text-gray-500 flex items-start gap-2 max-w-4xl"
      >
        <Eye className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT_SOFT }} />
        <span>
          <span className="text-white">Maskeli (causal) dikkat:</span> üretim
          yaparken model henüz yazmadığı kelimeye bakamaz; gelecek tokenların
          skorları &ndash;&infin; yapılır. Bu yüzden GPT bir cümleyi soldan sağa,
          token token kurar.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  17 · UYGULAMALI LAB  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı alıştırma</Eyebrow>
      <H2 className="mb-2">Dikkati kendi elinle hesapla</H2>
      <Sub className="max-w-3xl mb-6">
        Kısa bir Python alıştırması: küçük rastgele vektörlerle scaled
        dot-product attention&apos;ı kütüphanesiz hesapla ve çıkan ağırlık
        matrisini incele. Aşağıdaki iskeleti tamamlaman bekleniyor.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
        <div className="md:col-span-3">
          <WindowMock title="attention.py — scaled dot-product" icon={Terminal}>
            <pre className="uyz-code overflow-x-auto">
{`import numpy as np

def softmax(x):
    e = np.exp(x - x.max(axis=-1, keepdims=True))
    return e / e.sum(axis=-1, keepdims=True)

def attention(Q, K, V):
    d_k = Q.shape[-1]
    scores = Q @ K.T / np.sqrt(d_k)   # skor + ölçek
    weights = softmax(scores)         # dikkat dağılımı
    return weights @ V, weights       # çıktı + ağırlık

# 4 token, 8 boyut — rastgele örnek
np.random.seed(7)
Q = K = V = np.random.randn(4, 8)
out, w = attention(Q, K, V)
print(w.round(2))   # satır toplamı ≈ 1`}
            </pre>
          </WindowMock>
        </div>

        <div className="md:col-span-2 space-y-3">
          {[
            { icon: Calculator, t: "Çalıştır ve gözlemle", d: "w matrisinin her satırının toplamının yaklaşık 1 olduğunu doğrula." },
            { icon: Repeat, t: "Q ≠ K dene", d: "Q, K, V için farklı rastgele matrisler kullan; ağırlıklar nasıl değişiyor?" },
            { icon: Eye, t: "Maske ekle", d: "Üst üçgeni &ndash;∞ yaparak causal maske uygula; gelecek tokenların ağırlığı 0 olmalı." },
            { icon: ListChecks, t: "Raporla", d: "Çıktı matrisini ekran görüntüsüyle 3 cümlede yorumla." },
          ].map((t, i) => (
            <motion.div
              key={t.t}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.12 }}
              className="uyz-card uyz-card-hover rounded-xl p-4 flex items-start gap-3"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${ACCENT}1f`, border: `1px solid ${ACCENT}55` }}
              >
                <t.icon className="w-4 h-4" style={{ color: ACCENT_SOFT }} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-[10px] text-gray-500 font-mono">
                    {i + 1}
                  </span>
                  <h3 className="text-sm font-semibold text-white">{t.t}</h3>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{t.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  18 · ÖZET  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bugün ne öğrendik?</Eyebrow>
      <H2>Üç cümlede Transformer</H2>
      <Sub className="mt-3 max-w-3xl">
        Hafta 8&apos;e geçmeden önce bu üç fikir aklında kalsın — gerisi
        ayrıntı.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[
          {
            icon: Repeat,
            title: "Tekrar yerine paralel",
            desc: "Transformer, RNN&apos;in sıralı işlemesini bırakıp tüm diziyi aynı anda işler.",
            accent: "#3b82f6",
          },
          {
            icon: Eye,
            title: "Dikkat = ağırlıklı bağlam",
            desc: "Self-attention, Q·K skorlarını softmax ile ağırlığa çevirip Value&apos;ları toplar.",
            accent: "#a855f7",
          },
          {
            icon: Layers,
            title: "Blokları yığ",
            desc: "Konum kodlama, çok başlı dikkat ve ileri besleme bir blok kurar; bloklar üst üste dizilir.",
            accent: "#22c55e",
          },
        ].map((c, i) => (
          <FeatureCard
            key={c.title}
            icon={c.icon}
            title={c.title}
            desc={c.desc}
            accent={c.accent}
            delay={0.2 + i * 0.15}
          />
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  19 · SONRAKİ HAFTA + KAPANIŞ  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8"
          style={{
            background: "linear-gradient(135deg, #a855f7, #6d28d9)",
            boxShadow: "0 0 60px rgba(168,85,247,0.5)",
          }}
        >
          <Cpu className="w-12 h-12 text-white" />
        </motion.div>

        <Eyebrow>7. hafta tamam · sıradaki: Büyük Dil Modelleri</Eyebrow>
        <H1>
          <span className="uyz-shimmer">Transformer&apos;dan LLM&apos;e</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta yapı taşını kurduk. Hafta 8&apos;de bu blokları milyarlarca
          parametreyle ölçeklediğimizde ortaya çıkan büyük dil modellerini,
          ön eğitim ve ince ayar (fine-tuning) süreçlerini konuşacağız.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="uyz-card rounded-xl p-5">
            <Calendar className="w-5 h-5 mb-2" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Ders saati</div>
            <div className="text-white font-semibold">Perşembe</div>
            <div className="text-sm text-gray-400">15:20 – 17:00 · Amfi 1</div>
          </div>
          <div className="uyz-card rounded-xl p-5">
            <Target className="w-5 h-5 mb-2" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">Lab alıştırması</div>
            <div className="text-sm text-gray-400">attention.py&apos;yi tamamla</div>
          </div>
          <div className="uyz-card rounded-xl p-5">
            <Database className="w-5 h-5 mb-2" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Ön okuma</div>
            <div className="text-white font-semibold">Ön eğitim nedir?</div>
            <div className="text-sm text-gray-400">kısa bir kavram taraması</div>
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
          BVA 1203 · 7. Hafta · Dönüştürücüler &amp; Self-Attention
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
