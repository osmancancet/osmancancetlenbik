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
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Hash,
  MessageSquare,
  Cpu,
  Code2,
  Layers,
  Network,
  ArrowRight,
  ArrowLeftRight,
  ArrowDownUp,
  Calendar,
  ListChecks,
  Search,
  Tags,
  Languages,
  FileText,
  Database,
  Wand2,
  Terminal,
  GitBranch,
  Boxes,
  Gauge,
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

/* Pencereli mockup başlığı (kod / demo) */
function WindowChrome({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
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
          {icon}
          <span>{title}</span>
        </div>
      </div>
      {children}
    </motion.div>
  );
}

/* Maskeli dil modeli — bir tokenı maskele, model doldursun */
function MaskedFill({
  candidates,
}: {
  candidates: Array<{ token: string; prob: number; highlight?: boolean }>;
}) {
  const max = Math.max(...candidates.map((c) => c.prob));
  return (
    <div className="space-y-3">
      {candidates.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
          className="flex items-center gap-4"
        >
          <div
            className={`w-28 text-right font-mono text-sm ${
              c.highlight ? "text-white font-semibold" : "text-gray-400"
            }`}
          >
            {c.token}
          </div>
          <div className="uyz-bar-track">
            <motion.div
              className="uyz-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${(c.prob / max) * 100}%` }}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={
                c.highlight
                  ? undefined
                  : { background: "linear-gradient(90deg, #6b21a8, #a855f7)", opacity: 0.6 }
              }
            />
          </div>
          <div
            className={`w-16 font-mono text-sm ${
              c.highlight ? "text-violet-300 font-semibold" : "text-gray-500"
            }`}
          >
            {c.prob}%
          </div>
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
        <Eyebrow>BVA 1203 · 9. Hafta</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.02]"
        >
          <span className="uyz-shimmer">Büyük Dil</span>
          <br />
          <span className="uyz-shimmer">Modelleri</span>
        </motion.h1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          GPT, BERT ve T5 — Transformer&apos;ı temel alan üç farklı mimari aile.
          <br />
          <span className="text-gray-500 text-base">
            Aynı bloktan üç farklı dil yeteneği nasıl doğuyor?
          </span>
        </Sub>

        <div className="grid grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="uyz-card rounded-xl p-5 text-center"
          >
            <div
              className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#a855f7,#6d28d9)" }}
            >
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div className="text-white font-semibold text-sm">GPT</div>
            <div className="text-[10px] text-gray-500 font-mono mt-1">decoder-only</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="uyz-card rounded-xl p-5 text-center"
          >
            <div
              className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#3b82f6,#1e40af)" }}
            >
              <Search className="w-6 h-6 text-white" />
            </div>
            <div className="text-white font-semibold text-sm">BERT</div>
            <div className="text-[10px] text-gray-500 font-mono mt-1">encoder-only</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="uyz-card rounded-xl p-5 text-center"
          >
            <div
              className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#22c55e,#15803d)" }}
            >
              <ArrowLeftRight className="w-6 h-6 text-white" />
            </div>
            <div className="text-white font-semibold text-sm">T5</div>
            <div className="text-[10px] text-gray-500 font-mono mt-1">encoder-decoder</div>
          </motion.div>
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
      <Eyebrow>Köprü · 8. haftadan 9. haftaya</Eyebrow>
      <H2>Bloku kurduk; şimdi onu büyütüyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        8. hafta RNN&apos;den Transformer&apos;a geçtik: dikkat (attention) mekanizmasını,
        encoder ve decoder bloklarını gördük. Bu hafta o aynı blokları milyarlarca
        parametreye ve devasa metin yığınlarına ölçekleyip ortaya çıkan üç aileyi inceliyoruz.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="uyz-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3" style={{ color: ACCENT_SOFT }}>
            <Network className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Geçen hafta elimizde</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />Self-attention: her token diğerlerine bakar.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />Encoder bloku · decoder bloku.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />Pozisyon bilgisi ve çok başlı dikkat.</li>
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
            <Sparkles className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu haftanın hedefi</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />Encoder / decoder seçiminin neyi değiştirdiğini görmek.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />GPT, BERT ve T5&apos;in ön eğitim hedeflerini ayırt etmek.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />Hangi görev için hangi ailenin uygun olduğunu bilmek.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3 · DERSİN AKIŞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: mimari → üç aile → kullanım</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce &ldquo;büyük dil modeli&rdquo; ne demek ve hangi mimari seçenekleri var; sonra
        GPT, BERT ve T5&apos;i tek tek; en sonda bu modelleri pratikte nasıl kullandığımızı.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            range: "01",
            title: "LLM &amp; Mimari",
            items: ["LLM nedir, neden &ldquo;büyük&rdquo;", "Ön eğitim hedefleri", "Encoder / decoder seçimi"],
            icon: Layers,
            accent: "#a855f7",
          },
          {
            range: "02",
            title: "Üç Aile",
            items: ["GPT — decoder-only", "BERT — encoder-only", "T5 — encoder-decoder"],
            icon: Boxes,
            accent: "#ec4899",
          },
          {
            range: "03",
            title: "Kullanım",
            items: ["Ön eğitim → ince ayar", "Transformers kütüphanesi", "Hangi model hangi görev"],
            icon: Wand2,
            accent: "#22c55e",
          },
        ].map((g, i) => (
          <motion.div
            key={g.range}
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
                <div
                  className="text-lg font-semibold text-white"
                  dangerouslySetInnerHTML={{ __html: g.title }}
                />
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-400">
              {g.items.map((it) => (
                <li key={it} className="flex items-start gap-2">
                  <ChevronRight className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: g.accent }} />
                  <span dangerouslySetInnerHTML={{ __html: it }} />
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  4 · DIVIDER 1/3  ───────────────── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="LLM ve Mimari"
      subtitle="Büyük dil modeli, devasa metinle ön eğitilmiş bir Transformer&apos;dır. Önce &ldquo;büyük&rdquo; ne demek ve hangi mimari seçenekleri olduğunu netleştirelim."
      bgGradient="linear-gradient(135deg, #a855f7 0%, #6d28d9 100%)"
      shadow="0 0 80px rgba(168, 85, 247, 0.55)"
      icon={<Layers className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  5 · LLM NEDEN BÜYÜK  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kavram · ne demek &ldquo;büyük&rdquo;?</Eyebrow>
      <H2 className="mb-2">Üç şey büyür: veri, parametre, bağlam</H2>
      <Sub className="max-w-3xl mb-8">
        Bir dil modelini &ldquo;büyük&rdquo; yapan tek bir sayı yok. Genelde üç eksenin birden
        ölçeklenmesidir: ne kadar metin gördüğü, kaç ayarlanabilir ağırlığı olduğu ve
        bir seferde kaç token&apos;a bakabildiği.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: Database,
            t: "Eğitim verisi",
            d: "İnternet metni, kitaplar, kod depoları. Yüz milyarlarca token mertebesinde.",
            tag: "yüz milyarlarca token",
            accent: "#a855f7",
          },
          {
            icon: Cpu,
            t: "Parametre sayısı",
            d: "Modelin öğrenilen ağırlıkları. Erken örnek BERT-base ~110M; GPT-3 mertebesi milyarlarca.",
            tag: "milyon → milyar",
            accent: "#ec4899",
          },
          {
            icon: Gauge,
            t: "Bağlam penceresi",
            d: "Bir seferde dikkate alınabilen token sayısı. Büyüdükçe daha uzun metni bütün olarak işler.",
            tag: "context window",
            accent: "#22c55e",
          },
        ].map((c, i) => (
          <motion.div
            key={c.t}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="uyz-card rounded-xl p-6"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ background: `${c.accent}18`, border: `1px solid ${c.accent}55` }}
            >
              <c.icon className="w-6 h-6" style={{ color: c.accent }} />
            </div>
            <div className="text-lg font-semibold text-white mb-2">{c.t}</div>
            <p className="text-sm text-gray-400 leading-relaxed mb-3">{c.d}</p>
            <div
              className="text-[10px] font-mono px-2 py-1 rounded inline-block"
              style={{ background: `${c.accent}15`, color: c.accent }}
            >
              {c.tag}
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-6 text-center text-xs text-gray-500"
      >
        Parametre rakamları modele ve sürüme göre değişir — buradaki değerler
        <span className="text-white"> büyüklük mertebesi</span> olarak alınmalı.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  6 · ÖN EĞİTİM HEDEFLERİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Mimari · ön eğitim hedefi</Eyebrow>
      <H2 className="mb-2">Aynı veriyle üç farklı &ldquo;oyun&rdquo;</H2>
      <Sub className="max-w-3xl mb-8">
        Üç ailenin temel farkı, ön eğitimde modele oynatılan tahmin oyunudur. Hedef
        değişince mimari ve yetenek de değişir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="uyz-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <ArrowRight className="w-5 h-5" style={{ color: ACCENT_SOFT }} />
            <span className="text-sm font-semibold text-white">Sonraki token (GPT)</span>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Sadece sola bakar, bir sonraki kelimeyi tahmin eder. Üretim (generation) için doğal.
          </p>
          <div
            className="rounded-lg p-3 font-mono text-[12px] text-gray-200"
            style={{ background: "#0d0314", border: "1px solid rgba(168,85,247,0.2)" }}
          >
            Bir varmış bir{" "}
            <span style={{ color: ACCENT_SOFT }}>[ ? ]</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="uyz-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <Hash className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-semibold text-white">Maskeli token (BERT)</span>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Cümlenin ortasını maskeler, iki yandaki bağlamla doldurur. Anlama (understanding) için güçlü.
          </p>
          <div
            className="rounded-lg p-3 font-mono text-[12px] text-gray-200"
            style={{ background: "#0d0314", border: "1px solid rgba(59,130,246,0.25)" }}
          >
            Manisa&apos;da <span className="text-blue-400">[MASK]</span> macunu meşhurdur
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="uyz-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <ArrowLeftRight className="w-5 h-5 text-green-400" />
            <span className="text-sm font-semibold text-white">Span doldurma (T5)</span>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Metinden parça çıkarır, çıkarılanı yeniden üretir. Her görevi metinden metine çevirir.
          </p>
          <div
            className="rounded-lg p-3 font-mono text-[12px] text-gray-200"
            style={{ background: "#0d0314", border: "1px solid rgba(34,197,94,0.25)" }}
          >
            Spil Dağı <span className="text-green-400">&lt;X&gt;</span> şehrindedir
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-6 text-center text-sm text-gray-500"
      >
        Tek cümleyle: <span className="text-white">sola bak · iki yana bak · parçayı geri üret</span>.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  7 · ENCODER / DECODER  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Mimari · blok seçimi</Eyebrow>
      <H2 className="mb-2">Encoder mı, decoder mı, ikisi de mi?</H2>
      <Sub className="max-w-3xl mb-8">
        Transformer&apos;ın iki yarısından hangisini kullandığın, modelin metni nasıl
        &ldquo;gördüğünü&rdquo; belirler. Üç ailenin kök ayrımı burada.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {
            icon: Search,
            name: "Encoder-only",
            model: "BERT",
            attn: "Çift yönlü (bidirectional)",
            good: "Sınıflandırma, etiketleme, arama",
            note: "Tüm cümleyi aynı anda görür; metin üretmez.",
            accent: "#3b82f6",
          },
          {
            icon: MessageSquare,
            name: "Decoder-only",
            model: "GPT",
            attn: "Tek yönlü (causal / soldan)",
            good: "Metin üretimi, sohbet, kod",
            note: "Geleceği göremez; bu yüzden üretebilir.",
            accent: "#a855f7",
          },
          {
            icon: ArrowLeftRight,
            name: "Encoder-Decoder",
            model: "T5",
            attn: "Encoder çift yön + decoder tek yön",
            good: "Çeviri, özetleme, dönüştürme",
            note: "Girdiyi anlar, çıktıyı ayrı üretir.",
            accent: "#22c55e",
          },
        ].map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="uyz-card rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ background: `${m.accent}18`, border: `1px solid ${m.accent}55` }}
              >
                <m.icon className="w-6 h-6" style={{ color: m.accent }} />
              </div>
              <span
                className="text-xs font-mono font-bold px-2.5 py-1 rounded"
                style={{ background: `${m.accent}1f`, color: m.accent }}
              >
                {m.model}
              </span>
            </div>
            <div className="text-base font-semibold text-white mb-3">{m.name}</div>
            <div className="space-y-2 text-[13px]">
              <div className="flex items-start gap-2 text-gray-300">
                <ArrowDownUp className="w-4 h-4 mt-0.5 shrink-0" style={{ color: m.accent }} />
                <span>{m.attn}</span>
              </div>
              <div className="flex items-start gap-2 text-gray-300">
                <ListChecks className="w-4 h-4 mt-0.5 shrink-0" style={{ color: m.accent }} />
                <span>{m.good}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 border-t border-white/5 pt-3 mt-3">{m.note}</p>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  8 · DIVIDER 2/3  ───────────────── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Üç Aile"
      subtitle="Aynı Transformer bloğundan doğan üç farklı yaklaşım: GPT üretir, BERT anlar, T5 dönüştürür. Şimdi tek tek inceliyoruz."
      bgGradient="linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%)"
      shadow="0 0 80px rgba(109, 40, 217, 0.6)"
      icon={<Boxes className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  9 · GPT  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Aile · 1/3 · GPT</Eyebrow>
      <H2 className="mb-2">GPT: soldan sağa üreten model</H2>
      <Sub className="max-w-3xl mb-7">
        GPT (Generative Pre-trained Transformer), yalnızca decoder bloklarından oluşur.
        Sonraki token&apos;ı tahmin ederek metni kelime kelime üretir; ChatGPT&apos;nin de altındaki ailedir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          {[
            { icon: ArrowRight, t: "Mimari", d: "Decoder-only · causal (maskeli) dikkat." },
            { icon: MessageSquare, t: "Güçlü olduğu işler", d: "Sohbet, yazı yazma, kod üretme, özetleme." },
            { icon: Wand2, t: "Kullanım biçimi", d: "Çoğunlukla prompt ile; ince ayar gerektirmeden örnek vererek (few-shot)." },
          ].map((r, i) => (
            <motion.div
              key={r.t}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="uyz-card rounded-xl p-4 flex items-start gap-3"
            >
              <r.icon className="w-5 h-5 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />
              <div>
                <div className="text-sm font-semibold text-white">{r.t}</div>
                <div className="text-sm text-gray-400">{r.d}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="uyz-card rounded-xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: ACCENT_SOFT }}>
            Sonraki token tahmini
          </div>
          <div
            className="rounded-lg p-3 mb-4 font-mono text-base text-white"
            style={{ background: "#0d0314", border: "1px solid rgba(168,85,247,0.25)" }}
          >
            &ldquo;Manisa, Ege Bölgesi&apos;nde bir{" "}
            <span className="uyz-blank">______</span>&rdquo;
          </div>
          <MaskedFill
            candidates={[
              { token: "şehirdir", prob: 81, highlight: true },
              { token: "ildir", prob: 11 },
              { token: "ilçedir", prob: 5 },
              { token: "köydür", prob: 1 },
            ]}
          />
          <div className="mt-4 pt-3 border-t border-white/5 text-xs text-gray-500">
            Model her adımda en olası token&apos;ı seçer, çıktıyı geri girdiye ekler ve devam eder.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  10 · BERT  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Aile · 2/3 · BERT</Eyebrow>
      <H2 className="mb-2">BERT: iki yana bakan anlamlandırıcı</H2>
      <Sub className="max-w-3xl mb-7">
        BERT (Bidirectional Encoder Representations from Transformers) yalnızca encoder kullanır.
        Maskelenmiş token&apos;ı, solundaki ve sağındaki bağlama aynı anda bakarak tahmin eder.
        Metin üretmez; metni <span className="text-white">anlamak</span> için tasarlanmıştır.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="uyz-card rounded-xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-wider mb-3 text-blue-300">
            Maskeli dil modeli (MLM)
          </div>
          <div
            className="rounded-lg p-3 mb-4 font-mono text-[15px] text-white leading-relaxed"
            style={{ background: "#0d0314", border: "1px solid rgba(59,130,246,0.25)" }}
          >
            Spil Dağı, <span className="text-blue-400">[MASK]</span> ilinin sınırları içindedir.
          </div>
          <MaskedFill
            candidates={[
              { token: "Manisa", prob: 88, highlight: true },
              { token: "İzmir", prob: 7 },
              { token: "Aydın", prob: 3 },
              { token: "Muğla", prob: 1 },
            ]}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="space-y-3"
        >
          {[
            { icon: Tags, t: "Sınıflandırma", d: "Duygu analizi, spam tespiti, konu etiketleme." },
            { icon: Search, t: "Arama & eşleştirme", d: "Cümleleri anlam vektörüne çevirip benzerlik bulma." },
            { icon: FileText, t: "Belirteç görevleri", d: "Adlandırılmış varlık tanıma (NER), soru-cevap için cevap aralığı bulma." },
          ].map((r, i) => (
            <motion.div
              key={r.t}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + i * 0.1 }}
              className="uyz-card rounded-xl p-4 flex items-start gap-3"
            >
              <r.icon className="w-5 h-5 mt-0.5 shrink-0 text-blue-400" />
              <div>
                <div className="text-sm font-semibold text-white">{r.t}</div>
                <div className="text-sm text-gray-400">{r.d}</div>
              </div>
            </motion.div>
          ))}
          <div className="text-xs text-gray-500 pl-1">
            BERT genelde küçük bir başlık (head) eklenip <span className="text-white">ince ayarla</span> kullanılır.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  11 · T5  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Aile · 3/3 · T5</Eyebrow>
      <H2 className="mb-2">T5: her görev &ldquo;metinden metine&rdquo;</H2>
      <Sub className="max-w-3xl mb-7">
        T5 (Text-to-Text Transfer Transformer) encoder ve decoder&apos;ı birlikte kullanır.
        Asıl fikri: çeviri de, özetleme de, sınıflandırma da girdi metni → çıktı metni
        olarak ifade edilir. Görevi bir önek (prefix) belirtir.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6 }}
        className="uyz-card rounded-xl p-1"
      >
        <table className="uyz-tbl">
          <thead>
            <tr>
              <th style={{ width: "30%" }}>Görev</th>
              <th style={{ width: "40%" }}>Girdi (önek + metin)</th>
              <th>Çıktı (metin)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Çeviri</td>
              <td><span className="font-mono text-green-400">translate English to German:</span> good night</td>
              <td className="font-mono">gute Nacht</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Özetleme</td>
              <td><span className="font-mono text-green-400">summarize:</span> uzun ders metni...</td>
              <td className="font-mono">kısa özet...</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Duygu analizi</td>
              <td><span className="font-mono text-green-400">sst2 sentence:</span> film harikaydı</td>
              <td className="font-mono">positive</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Benzerlik</td>
              <td><span className="font-mono text-green-400">stsb sentence1:</span> ... <span className="font-mono text-green-400">sentence2:</span> ...</td>
              <td className="font-mono">3.8</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-5 uyz-card rounded-xl p-4 flex items-start gap-3"
      >
        <Languages className="w-6 h-6 shrink-0 mt-0.5 text-green-400" />
        <div className="text-sm text-gray-400">
          <span className="text-white font-semibold">Neden pratik:</span>{" "}
          Tek model, tek format. Çıktı her zaman metin olduğu için yeni bir görev eklemek,
          yeni bir önek tanımlamaktan ibaret.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  12 · KARŞILAŞTIRMA TABLOSU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Özet · yan yana</Eyebrow>
      <H2 className="mb-2">GPT vs BERT vs T5</H2>
      <Sub className="max-w-3xl mb-7">
        Üç aileyi tek tabloda toparlayalım. Doğru aileyi seçmek, görevini doğru
        tanımlamakla başlar.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6 }}
        className="uyz-card rounded-xl p-1"
      >
        <table className="uyz-tbl">
          <thead>
            <tr>
              <th style={{ width: "22%" }}>Özellik</th>
              <th><span className="text-violet-300">GPT</span></th>
              <th><span className="text-blue-300">BERT</span></th>
              <th><span className="text-green-300">T5</span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Mimari</td>
              <td>Decoder-only</td>
              <td>Encoder-only</td>
              <td>Encoder-Decoder</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Dikkat yönü</td>
              <td>Tek yönlü (causal)</td>
              <td>Çift yönlü</td>
              <td>Karışık</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Ön eğitim hedefi</td>
              <td>Sonraki token</td>
              <td>Maskeli token (MLM)</td>
              <td>Span doldurma</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">En iyi olduğu iş</td>
              <td>Üretim · sohbet</td>
              <td>Anlama · sınıflandırma</td>
              <td>Dönüştürme · çeviri</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Çıktı türü</td>
              <td>Serbest metin</td>
              <td>Etiket / vektör</td>
              <td>Metin</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-5 text-center text-sm text-gray-500"
      >
        Pratik kural: <span className="text-white">üret</span> diyorsan GPT,{" "}
        <span className="text-white">anla/etiketle</span> diyorsan BERT,{" "}
        <span className="text-white">çevir/dönüştür</span> diyorsan T5.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  13 · DIVIDER 3/3  ───────────────── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Pratikte Kullanım"
      subtitle="Bu modelleri sıfırdan eğitmiyoruz — hazır ön eğitilmiş ağırlıkları alıp kendi görevimize uyarlıyoruz. İnce ayar ve birkaç satır kod."
      bgGradient="linear-gradient(135deg, #f59e0b 0%, #b45309 100%)"
      shadow="0 0 80px rgba(245, 158, 11, 0.55)"
      icon={<Wand2 className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  14 · ÖN EĞİTİM → İNCE AYAR + KOD  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kullanım · ön eğitim → ince ayar</Eyebrow>
      <H2 className="mb-2">Hazır modeli al, kendi görevine uyarla</H2>
      <Sub className="max-w-3xl mb-6">
        Ön eğitim pahalıdır ve bir kez yapılır. Geri kalanımız, paylaşılan ağırlıkları
        indirip ince ayar (fine-tuning) ya da doğrudan kullanırız. Aşağıda Hugging Face
        Transformers ile bir BERT modelini birkaç satırda çağırmak.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
        <div className="md:col-span-2 space-y-3">
          {[
            { icon: Database, n: "01", t: "Ön eğitim", d: "Devasa metinle bir kez; ağırlıklar paylaşılır.", accent: "#a855f7" },
            { icon: GitBranch, n: "02", t: "İnce ayar", d: "Küçük etiketli veriyle kendi görevine uyarlama.", accent: "#ec4899" },
            { icon: Wand2, n: "03", t: "Çıkarım", d: "Modeli üretimde kullan; tahmin al.", accent: "#22c55e" },
          ].map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.12 }}
              className="uyz-card rounded-xl p-4 flex items-start gap-3"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `${s.accent}18`, border: `1px solid ${s.accent}55` }}
              >
                <s.icon className="w-5 h-5" style={{ color: s.accent }} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono" style={{ color: s.accent }}>{s.n}</span>
                  <span className="text-sm font-semibold text-white">{s.t}</span>
                </div>
                <div className="text-sm text-gray-400">{s.d}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="md:col-span-3">
          <WindowChrome
            title="python · transformers"
            icon={<Terminal className="w-3.5 h-3.5" />}
          >
            <div className="uyz-code">
              <div><span className="uyz-code-com"># Hazır ön eğitilmiş modeli boru hattıyla yükle</span></div>
              <div><span className="uyz-code-kw">from</span> transformers <span className="uyz-code-kw">import</span> <span className="uyz-code-fn">pipeline</span></div>
              <div>&nbsp;</div>
              <div>fill = <span className="uyz-code-fn">pipeline</span>(</div>
              <div>&nbsp;&nbsp;<span className="uyz-code-str">&quot;fill-mask&quot;</span>,</div>
              <div>&nbsp;&nbsp;model=<span className="uyz-code-str">&quot;bert-base-multilingual-cased&quot;</span>,</div>
              <div>)</div>
              <div>&nbsp;</div>
              <div>out = fill(<span className="uyz-code-str">&quot;Manisa, Ege [MASK] bir ildir.&quot;</span>)</div>
              <div><span className="uyz-code-fn">print</span>(out[<span className="uyz-code-num">0</span>][<span className="uyz-code-str">&quot;token_str&quot;</span>])</div>
              <div>&nbsp;</div>
              <div><span className="uyz-code-com"># →</span> <span className="uyz-code-out">Bölgesi&apos;nde</span></div>
            </div>
          </WindowChrome>
          <div className="mt-3 text-[11px] text-gray-500 font-mono text-center">
            Aynı API ile GPT için <span className="text-violet-300">text-generation</span>, T5 için{" "}
            <span className="text-green-300">text2text-generation</span> kullanılır.
          </div>
        </div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  15 · UYGULAMALI LAB  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
      <H2>Üç aileyi kendi elinle çağır</H2>
      <Sub className="mt-3 max-w-3xl">
        Lab, Google Colab veya yerel bir Python ortamında. Amaç model eğitmek değil;
        aynı görevi üç farklı aileyle deneyip farkı gözlemlemek. Sonraki derse not
        ve ekran görüntüsüyle gel.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Terminal, title: "Ortamı kur", desc: "pip install transformers torch — Colab&apos;da hazır gelir. İlk pipeline çağrısıyla bir model indir.", accent: "#a855f7" },
          { icon: Search, title: "BERT ile maske doldur", desc: "fill-mask boru hattıyla 3 Türkçe cümlede [MASK] doldur; ilk 3 tahmini not et.", accent: "#3b82f6" },
          { icon: MessageSquare, title: "GPT ile metin üret", desc: "text-generation ile aynı başlangıç cümlesini iki farklı temperature ile üret; farkı yaz.", accent: "#ec4899" },
          { icon: Languages, title: "T5 ile özetle/çevir", desc: "text2text-generation ile bir paragrafı summarize: önekiyle özetle; çıktıyı kaydet.", accent: "#22c55e" },
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
        className="mt-6 text-center text-xs text-gray-500"
      >
        İlk model indirmesi birkaç yüz MB olabilir — Colab kullanırsan internet ve disk derdi olmaz.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  16 · SONRAKİ HAFTA + KAPANIŞ  ───────────────── */
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
          <Wand2 className="w-12 h-12 text-white" />
        </motion.div>

        <Eyebrow>9. hafta tamamlandı · sıradaki: Prompt Mühendisliği</Eyebrow>
        <H1>
          <span className="uyz-shimmer">Modeli tanıdık · şimdi konuşturacağız</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta GPT, BERT ve T5&apos;in nasıl çalıştığını gördük. Hafta 10&apos;da bu
          modellerden en iyi cevabı almanın yolunu açıyoruz: prompt mühendisliği —
          rol verme, örnekle yönlendirme (few-shot) ve adım adım düşündürme.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="uyz-card rounded-xl p-5">
            <Calendar className="w-5 h-5 mb-3" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Ders saati</div>
            <div className="text-white font-semibold">Perşembe</div>
            <div className="text-sm text-gray-400">15:20 – 17:00 · Amfi 1</div>
          </div>
          <div className="uyz-card rounded-xl p-5">
            <Brain className="w-5 h-5 mb-3" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">Lab çıktıları</div>
            <div className="text-sm text-gray-400">3 ailenin notlarıyla gel</div>
          </div>
          <div className="uyz-card rounded-xl p-5">
            <Code2 className="w-5 h-5 mb-3" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Sonraki konu</div>
            <div className="text-white font-semibold">Prompt mühendisliği</div>
            <div className="text-sm text-gray-400">few-shot · zincirleme düşünme</div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
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
          BVA 1203 · 9. Hafta · Büyük Dil Modelleri (GPT · BERT · T5)
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
