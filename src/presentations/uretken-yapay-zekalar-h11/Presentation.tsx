"use client";

import {
  Fragment,
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
  Check,
  X,
  Wand2,
  Hash,
  Image as ImageIcon,
  Type,
  Code2,
  Search,
  Eye,
  Network,
  ArrowRight,
  ArrowLeftRight,
  ScanSearch,
  Calendar,
  Target,
  BookOpen,
  Gauge,
  Crop,
  Tags,
  Boxes,
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

/* CLIP benzerlik tablosu — bir görsele karşı birden çok metin */
function ClipMatch({
  rows,
}: {
  rows: Array<{ label: string; sim: number; best?: boolean }>;
}) {
  return (
    <div className="space-y-3">
      {rows.map((r, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
          className="flex items-center gap-4"
        >
          <div
            className={`w-56 text-right font-mono text-xs md:text-sm ${
              r.best ? "text-white font-semibold" : "text-gray-400"
            }`}
          >
            {r.label}
          </div>
          <div className="uyz-sim-track">
            <motion.div
              className={r.best ? "uyz-sim-fill" : "uyz-sim-fill-dim"}
              initial={{ width: 0 }}
              animate={{ width: `${r.sim}%` }}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div
            className={`w-14 font-mono text-sm ${
              r.best ? "text-violet-300 font-semibold" : "text-gray-500"
            }`}
          >
            {(r.sim / 100).toFixed(2)}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* DALL·E prompt → görüntü penceresi */
function DalleWindow({
  prompt,
  model = "dall-e-3",
  size = "1024×1024",
  note,
}: {
  prompt: string;
  model?: string;
  size?: string;
  note?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
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
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-semibold flex-1 max-w-md mx-auto text-center justify-center"
          style={{ background: "#0d0314", color: ACCENT_SOFT }}
        >
          <span className="w-5 h-5 rounded-sm uyz-ai-tile flex items-center justify-center text-[11px]">
            <Wand2 className="w-3 h-3" />
          </span>
          <span>DALL·E · Metinden Görüntüye</span>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch" style={{ background: "#0a0414" }}>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <Type className="w-4 h-4" style={{ color: ACCENT_SOFT }} />
            <div className="text-[11px] font-mono uppercase tracking-wider text-gray-500">
              Prompt (metin)
            </div>
          </div>
          <div
            className="rounded-lg p-4 font-mono text-sm text-gray-200 leading-relaxed flex-1"
            style={{ background: "#0d0314", border: "1px solid rgba(168,85,247,0.2)" }}
          >
            <span style={{ color: ACCENT_SOFT }}>&gt;</span> {prompt}
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-mono">
            <span className="px-2 py-1 rounded" style={{ background: `${ACCENT}22`, color: ACCENT_SOFT }}>
              model: {model}
            </span>
            <span className="px-2 py-1 rounded" style={{ background: "#ffffff10", color: "#9ca3af" }}>
              size: {size}
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="rounded-xl uyz-ai-canvas relative min-h-[230px] flex items-end"
          style={{ border: "1px solid rgba(168,85,247,0.3)" }}
        >
          <div
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono flex items-center gap-1.5"
            style={{
              background: "rgba(0,0,0,0.6)",
              color: ACCENT_SOFT,
              border: "1px solid rgba(168,85,247,0.4)",
              backdropFilter: "blur(6px)",
            }}
          >
            <Sparkles className="w-3 h-3" />
            AI üretti
          </div>
          <div className="relative z-10 p-5 text-white">
            <div className="text-[11px] font-mono opacity-70 uppercase tracking-wider">
              Çıktı · {size}
            </div>
            <div className="text-sm opacity-80 mt-1">{note}</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* Diffusion gürültü giderme adımları */
function DenoiseStrip() {
  const steps = [
    { cls: "uyz-noise-100", label: "t=1000", caption: "Saf gürültü" },
    { cls: "uyz-noise-66", label: "t=600", caption: "Kaba şekiller" },
    { cls: "uyz-noise-33", label: "t=200", caption: "Detaylar oturuyor" },
    { cls: "uyz-noise-0", label: "t=0", caption: "Temiz görüntü" },
  ];
  return (
    <div className="flex items-center gap-2 md:gap-4">
      {steps.map((s, i) => (
        <div key={s.label} className="flex items-center gap-2 md:gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.2 }}
            className="text-center"
          >
            <div className={`uyz-noise-tile ${s.cls} w-24 h-24 md:w-32 md:h-32`} />
            <div className="text-[11px] font-mono mt-2" style={{ color: ACCENT_SOFT }}>
              {s.label}
            </div>
            <div className="text-[10px] text-gray-500 mt-0.5">{s.caption}</div>
          </motion.div>
          {i < steps.length - 1 && (
            <ArrowRight className="w-5 h-5 shrink-0" style={{ color: "#4b5563" }} />
          )}
        </div>
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
        <Eyebrow>BVA 1203 · 11. Hafta</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.04]"
        >
          <span className="uyz-shimmer">Görüntüden Metne,</span>
          <br />
          <span className="uyz-shimmer">Metinden Görüntüye</span>
        </motion.h1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Multimodal modeller: DALL·E ve CLIP.
          <br />
          <span className="text-gray-500 text-base">
            İki ayrı dünyayı — pikselleri ve kelimeleri — aynı uzayda buluşturan modeller.
          </span>
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-4xl mx-auto">
          <FeatureCard
            icon={Type}
            title="Metin → Görüntü"
            desc="DALL·E gibi modeller bir cümleyi alıp daha önce var olmayan bir görsel üretir."
            delay={0.3}
            accent="#a855f7"
          />
          <FeatureCard
            icon={ScanSearch}
            title="Görüntü → Metin"
            desc="CLIP bir görseli ve bir metni karşılaştırır; hangi açıklama daha uygun, onu söyler."
            delay={0.45}
            accent="#ec4899"
          />
          <FeatureCard
            icon={Network}
            title="Ortak Gömme Uzayı"
            desc="Her iki modalite aynı vektör uzayında temsil edilir — köprü tam burada kurulur."
            delay={0.6}
            accent="#3b82f6"
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
      <Eyebrow>Köprü · 10. haftadan 11. haftaya</Eyebrow>
      <H2>Tek modaliteden çok modaliteye</H2>
      <Sub className="mt-3 max-w-3xl">
        Şimdiye kadar modeller tek bir &ldquo;dil&rdquo; konuşuyordu: ya metin (LLM) ya da
        görsel (diffusion). Bu hafta iki dünyayı birbirine bağlayan modelleri inceliyoruz.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="uyz-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-3" style={{ color: ACCENT_SOFT }}>
            <BookOpen className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bildiğimiz yer</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />Token, olasılık, sonraki kelime tahmini (LLM&apos;ler).</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />Gürültüden görsel üreten diffusion modelleri.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />Prompt mühendisliğinin temel prensipleri.</li>
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
            <Target className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu haftanın hedefi</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />&ldquo;Multimodal&rdquo; ne demek, neden önemli?</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />CLIP nasıl metin ve görseli aynı uzayda eşler?</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />DALL·E metinden görüntüyü nasıl üretir?</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />Bu modeller nerede kullanılır, sınırları nedir?</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3 · DIVIDER 1/3 — CLIP  ───────────────── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="CLIP — İki Dünyayı Eşle"
      subtitle="Bir görseli ve bir metni aynı uzaya yerleştirip &ldquo;ne kadar birbirine ait?&rdquo; sorusunu sayıyla cevaplayan model."
      bgGradient="linear-gradient(135deg, #a855f7 0%, #6d28d9 100%)"
      shadow="0 0 80px rgba(168, 85, 247, 0.55)"
      icon={<ScanSearch className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  4 · ORTAK GÖMME UZAYI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>CLIP · 1/3 · temel fikir</Eyebrow>
      <H2 className="mb-2">İki kodlayıcı, tek uzay</H2>
      <Sub className="max-w-3xl mb-8">
        CLIP&apos;in iki ayrı ağı vardır: biri görseli, diğeri metni bir vektöre (gömme) çevirir.
        Eğitimin amacı, <span className="text-white">eşleşen çift</span> birbirine yakın,
        eşleşmeyen çift uzak olsun diye bu iki vektörü aynı uzayda hizalamaktır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
        <div className="md:col-span-2 space-y-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="uyz-card rounded-xl p-4 flex items-center gap-3"
          >
            <ImageIcon className="w-6 h-6 shrink-0" style={{ color: "#ec4899" }} />
            <div className="text-sm text-gray-300">
              <span className="text-white font-semibold">Görüntü kodlayıcı</span>
              <div className="text-xs text-gray-500 font-mono">ViT / ResNet → 512 boyutlu vektör</div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="uyz-card rounded-xl p-4 flex items-center gap-3"
          >
            <Type className="w-6 h-6 shrink-0" style={{ color: "#a855f7" }} />
            <div className="text-sm text-gray-300">
              <span className="text-white font-semibold">Metin kodlayıcı</span>
              <div className="text-xs text-gray-500 font-mono">Transformer → 512 boyutlu vektör</div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="rounded-xl p-4 flex items-start gap-2"
            style={{ background: `${ACCENT}14`, border: `1px solid ${ACCENT}40` }}
          >
            <ArrowLeftRight className="w-5 h-5 shrink-0 mt-0.5" style={{ color: ACCENT_SOFT }} />
            <div className="text-sm text-gray-300">
              İki vektör aynı uzayda olduğu için <span className="text-white">kosinüs benzerliği</span> ile
              doğrudan karşılaştırılır.
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="md:col-span-3 uyz-embed-space h-72 relative"
        >
          {[
            { x: 30, y: 35, c: "#ec4899", label: "🐱 görsel" },
            { x: 38, y: 45, c: "#a855f7", label: "&ldquo;bir kedi&rdquo;" },
            { x: 72, y: 30, c: "#ec4899", label: "🚗 görsel" },
            { x: 78, y: 40, c: "#a855f7", label: "&ldquo;bir araba&rdquo;" },
            { x: 55, y: 75, c: "#3b82f6", label: "&ldquo;Spil Dağı&rdquo;" },
          ].map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.12 }}
              className="uyz-embed-dot flex items-center"
              style={{ left: `${d.x}%`, top: `${d.y}%`, width: 12, height: 12, background: d.c, color: d.c }}
            >
              <span
                className="ml-3 text-[10px] font-mono whitespace-nowrap text-gray-300"
                dangerouslySetInnerHTML={{ __html: d.label }}
              />
            </motion.div>
          ))}
          <div className="absolute bottom-2 left-3 text-[10px] font-mono text-gray-500">
            Ortak gömme uzayı (2B&apos;ye indirgenmiş gösterim)
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  5 · KONTRASTİF EĞİTİM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>CLIP · 2/3 · nasıl eğitilir</Eyebrow>
      <H2 className="mb-2">Kontrastif öğrenme: doğru çifti yakınlaştır</H2>
      <Sub className="max-w-3xl mb-8">
        CLIP, internetten toplanan <span className="text-white">(görsel, açıklama)</span> çiftleriyle eğitilir.
        Bir grupta N görsel ve N metin verilir; model, doğru eşleşmelerin benzerliğini artırırken
        yanlış eşleşmelerinkini düşürmeyi öğrenir. Hiç etiket (&ldquo;sınıf 7&rdquo;) gerekmez.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="uyz-card rounded-2xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-wider mb-4" style={{ color: ACCENT_SOFT }}>
            Benzerlik matrisi (4 çift)
          </div>
          <div className="grid grid-cols-5 gap-1.5 text-[11px] font-mono">
            <div />
            {["T1", "T2", "T3", "T4"].map((t) => (
              <div key={t} className="text-center text-gray-400">{t}</div>
            ))}
            {["G1", "G2", "G3", "G4"].map((g, r) => (
              <Fragment key={g}>
                <div className="text-gray-400 flex items-center">{g}</div>
                {[0, 1, 2, 3].map((c) => {
                  const diag = r === c;
                  return (
                    <div
                      key={`${r}-${c}`}
                      className="aspect-square rounded flex items-center justify-center"
                      style={{
                        background: diag ? `${ACCENT}55` : "#ffffff08",
                        border: diag ? `1px solid ${ACCENT}` : "1px solid #ffffff10",
                        color: diag ? "#fff" : "#6b7280",
                      }}
                    >
                      {diag ? "↑" : "↓"}
                    </div>
                  );
                })}
              </Fragment>
            ))}
          </div>
          <div className="text-xs text-gray-500 mt-4">
            Köşegen (Gi–Ti) = doğru çift → <span className="text-white">benzerliği yükselt</span>.
            Diğer her şey = yanlış çift → <span className="text-white">benzerliği düşür</span>.
          </div>
        </motion.div>

        <div className="space-y-4">
          <FeatureCard
            icon={Boxes}
            title="Ölçek = güç"
            desc="CLIP yüz milyonlarca (görsel, metin) çiftiyle eğitildi. Bu devasa, çeşitli veri sayesinde tek bir kategoriye sıkışmaz."
            delay={0.3}
            accent="#a855f7"
          />
          <FeatureCard
            icon={Gauge}
            title="Çıktı bir skor"
            desc="Eğitim bittiğinde model her (görsel, metin) ikilisine -1 ile 1 arası bir benzerlik verir. Yüksek skor = uyumlu."
            delay={0.45}
            accent="#ec4899"
          />
        </div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  6 · ZERO-SHOT SINIFLANDIRMA (DEMO)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>CLIP · 3/3 · uygulamada</Eyebrow>
      <H2 className="mb-2">Zero-shot: eğitmeden sınıflandır</H2>
      <Sub className="max-w-3xl mb-8">
        Tek bir görsel ver, birden çok aday metni karşılaştır — en yüksek benzerliğe sahip metin
        &ldquo;cevap&rdquo; olur. Modeli o kategoriler için ayrıca <span className="text-white">eğitmeye gerek yoktur</span>;
        buna sıfır-örnek (zero-shot) sınıflandırma denir.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-2"
        >
          <div className="uyz-ai-canvas rounded-xl h-56 relative flex items-end" style={{ border: "1px solid rgba(168,85,247,0.3)" }}>
            <div className="relative z-10 p-4 text-white">
              <div className="text-[11px] font-mono opacity-70 uppercase tracking-wider">Girdi görseli</div>
              <div className="text-sm opacity-80 mt-1">Spil Dağı manzarası (örnek)</div>
            </div>
          </div>
          <div className="mt-4 font-mono text-xs text-gray-500 leading-relaxed">
            <span style={{ color: ACCENT_SOFT }}>Adaylar:</span><br />
            &ldquo;bir dağ manzarası&rdquo;<br />
            &ldquo;bir şehir caddesi&rdquo;<br />
            &ldquo;bir tabak yemek&rdquo;<br />
            &ldquo;bir kedi&rdquo;
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="md:col-span-3 uyz-card rounded-2xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-wider mb-5" style={{ color: ACCENT_SOFT }}>
            Kosinüs benzerliği (görsel ↔ her metin)
          </div>
          <ClipMatch
            rows={[
              { label: "&ldquo;bir dağ manzarası&rdquo;", sim: 91, best: true },
              { label: "&ldquo;bir şehir caddesi&rdquo;", sim: 34 },
              { label: "&ldquo;bir tabak yemek&rdquo;", sim: 18 },
              { label: "&ldquo;bir kedi&rdquo;", sim: 12 },
            ]}
          />
          <div className="mt-5 pt-4 border-t border-white/5 text-xs text-gray-500 flex items-center gap-2">
            <Check className="w-3.5 h-3.5" style={{ color: ACCENT_SOFT }} />
            En yüksek skor seçilir. Skorlar softmax&apos;tan geçirilirse olasılığa dönüşür.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  7 · DIVIDER 2/3 — DALL·E  ───────────────── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="DALL·E — Metinden Görüntüye"
      subtitle="Bir cümleyi alıp, daha önce hiç var olmamış bir görseli adım adım gürültüden inşa eden üretken model."
      bgGradient="linear-gradient(135deg, #ec4899 0%, #be185d 100%)"
      shadow="0 0 80px rgba(236, 72, 153, 0.5)"
      icon={<Wand2 className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  8 · DALL·E DEMO  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>DALL·E · demo</Eyebrow>
      <H2 className="mb-2">Bir cümle, bir görsel</H2>
      <Sub className="max-w-3xl mb-6">
        Sol tarafta açıklama yazıyorsun; sağ tarafta saniyeler içinde, daha önce var olmayan
        bir görüntü ortaya çıkıyor. Prompt ne kadar somut olursa çıktı o kadar tahmin edilebilir.
      </Sub>
      <DalleWindow
        prompt="Mor gökyüzü altında, Spil Dağı eteğinde minik bir kütüphane; sıcak pencere ışığı, sulu boya tarzı, yumuşak gölgeler."
        model="dall-e-3"
        size="1024×1024"
        note="Açıklamadaki her öğe (mor gök, kütüphane, sulu boya) görselde izlenebilir."
      />
    </SlideShell>
  ),

  /* ─────────────────  9 · DIFFUSION — GÜRÜLTÜ GİDERME  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>DALL·E · nasıl çalışır · 1/2</Eyebrow>
      <H2 className="mb-2">Görsel, gürültüden geri kazanılır</H2>
      <Sub className="max-w-3xl mb-8">
        Modern DALL·E&apos;nin altında bir <span className="text-white">diffusion</span> süreci vardır.
        Eğitimde görsellere kademeli gürültü eklenir; model bunu <span className="text-white">tersine çevirmeyi</span> öğrenir.
        Üretimde saf gürültüyle başlar ve adım adım temizleyerek görseli ortaya çıkarır.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="uyz-card rounded-2xl p-6 flex justify-center"
      >
        <DenoiseStrip />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="mt-6 text-center text-sm text-gray-500"
      >
        Her adımda metin prompt&apos;u rehberlik eder — model &ldquo;hangi temizleme prompt&apos;a daha uygun?&rdquo;
        sorusunu sorar. Bu rehberin adı: <span className="text-white">CLIP yönlendirmesi</span>.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  10 · METİN → GÖRÜNTÜ HATTI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>DALL·E · nasıl çalışır · 2/2</Eyebrow>
      <H2 className="mb-2">Hattın bütünü: prompt&apos;tan piksele</H2>
      <Sub className="max-w-3xl mb-8">
        CLIP burada da işin içinde: prompt önce bir <span className="text-white">metin gömmesine</span> çevrilir,
        bu gömme diffusion sürecini yönlendirir. Yani CLIP yalnızca eşleştirmez, üretimi de hizalar.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
        {[
          {
            n: "01",
            icon: Type,
            title: "Prompt → metin gömmesi",
            desc: "Metin kodlayıcı (CLIP/Transformer) cümleyi bir vektöre çevirir. Anlam buraya sıkışır.",
            accent: "#a855f7",
          },
          {
            n: "02",
            icon: Wand2,
            title: "Gömme → diffusion",
            desc: "Model saf gürültüden başlar; her adımda metin gömmesine uyacak şekilde gürültüyü azaltır.",
            accent: "#ec4899",
          },
          {
            n: "03",
            icon: ImageIcon,
            title: "Çözücü → piksel",
            desc: "Gizli (latent) temsil, yüksek çözünürlüklü bir görüntüye açılır. Çıktı hazırdır.",
            accent: "#3b82f6",
          },
        ].map((step, i) => (
          <motion.div
            key={step.n}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.2 }}
            className="relative uyz-card rounded-2xl p-6"
          >
            <div
              className="absolute -top-3 left-6 px-3 py-1 rounded-full text-[10px] font-mono font-bold"
              style={{ background: step.accent, color: "#fff", boxShadow: `0 0 20px ${step.accent}55` }}
            >
              {step.n}
            </div>
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 mt-2"
              style={{ background: `${step.accent}1f`, border: `1px solid ${step.accent}55` }}
            >
              <step.icon className="w-6 h-6" style={{ color: step.accent }} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>

            {i < 2 && (
              <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full items-center justify-center" style={{ background: "#0a0414", border: "1px solid rgba(168,85,247,0.3)" }}>
                <ChevronRight className="w-4 h-4" style={{ color: ACCENT_SOFT }} />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  11 · CLIP vs DALL·E KARŞILAŞTIRMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Toparlama · iki yön</Eyebrow>
      <H2>CLIP anlar, DALL·E üretir</H2>
      <Sub className="mt-3 max-w-3xl">
        İkisi de metin ile görseli aynı uzayda buluşturur — ama farklı yöne akarlar.
        Aynı CLIP metin kodlayıcısı her iki modelde de köprü görevi görür.
      </Sub>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-6 uyz-card rounded-xl overflow-hidden"
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left" style={{ background: "#ffffff08" }}>
              <th className="px-5 py-3 text-gray-400 font-mono text-xs uppercase tracking-wider" style={{ width: "22%" }}>Özellik</th>
              <th className="px-5 py-3 font-mono text-xs uppercase tracking-wider" style={{ color: "#c084fc", width: "39%" }}>CLIP</th>
              <th className="px-5 py-3 font-mono text-xs uppercase tracking-wider" style={{ color: "#f472b6", width: "39%" }}>DALL·E</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {[
              ["Temel görev", "Görsel ve metni eşleştirir (skor)", "Metinden yeni görsel üretir"],
              ["Yön", "Görüntü ↔ metin (anlama)", "Metin → görüntü (üretim)"],
              ["Çıktı", "Bir benzerlik sayısı", "Bir piksel görseli"],
              ["Çekirdek yöntem", "Kontrastif öğrenme", "Diffusion + metin yönlendirme"],
              ["Tipik kullanım", "Arama, sınıflandırma, filtreleme", "Tasarım, illüstrasyon, taslak"],
            ].map((row, i) => (
              <tr key={i} style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <td className="px-5 py-3 text-white font-semibold">{row[0]}</td>
                <td className="px-5 py-3">{row[1]}</td>
                <td className="px-5 py-3">{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  12 · DIVIDER 3/3 — KULLANIM & SINIRLAR  ───────────────── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Kullanım Alanları ve Sınırlar"
      subtitle="Multimodal modeller nerede gerçekten işe yarıyor, nerede yanılıyor ve nelere dikkat etmeliyiz?"
      bgGradient="linear-gradient(135deg, #f59e0b 0%, #b45309 100%)"
      shadow="0 0 80px rgba(245, 158, 11, 0.55)"
      icon={<Boxes className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  13 · KULLANIM ALANLARI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Pratik · nerede kullanılır</Eyebrow>
      <H2>Multimodal modeller sahada</H2>
      <Sub className="mt-3 mb-8 max-w-3xl">
        CLIP ve DALL·E ailesi tek başına bir ürün değil; çoğu zaman daha büyük sistemlerin
        içinde bir parça olarak çalışırlar.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Search}
          title="Anlamsal görsel arama"
          desc="CLIP ile bir cümle yazıp eşleşen görselleri bulmak — etiket aramak yerine anlamla arama."
          delay={0.15}
          accent="#a855f7"
        />
        <FeatureCard
          icon={Tags}
          title="Otomatik etiketleme & moderasyon"
          desc="Bir görselin içeriğini metinle eşleştirip kategorize etmek veya uygunsuz içeriği filtrelemek."
          delay={0.3}
          accent="#3b82f6"
        />
        <FeatureCard
          icon={Wand2}
          title="Tasarım & taslak üretimi"
          desc="DALL·E ile konsept görsel, illüstrasyon, sunum görseli veya hızlı fikir taslağı üretmek."
          delay={0.45}
          accent="#ec4899"
        />
        <FeatureCard
          icon={Crop}
          title="Görsel düzenleme (inpainting)"
          desc="Bir görselin bir bölgesini maskeleyip prompt&apos;la yeniden üretmek — nesne ekleme/çıkarma."
          delay={0.6}
          accent="#22c55e"
        />
        <FeatureCard
          icon={Eye}
          title="Erişilebilirlik"
          desc="Görseli metne çevirip görme engelli kullanıcılar için açıklama (alt text) üretmek."
          delay={0.75}
          accent="#a855f7"
        />
        <FeatureCard
          icon={Code2}
          title="Veri seti süzme"
          desc="CLIP skoruyla, metin-görsel uyumu düşük eğitim örneklerini ayıklayıp veriyi temizlemek."
          delay={0.9}
          accent="#3b82f6"
        />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  14 · SINIRLAR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sınırlar · eleştirel bakış</Eyebrow>
      <H2>Güçlü ama kusursuz değil</H2>
      <Sub className="mt-3 mb-8 max-w-3xl">
        Bu modeller etkileyici sonuçlar verir; ama nasıl çalıştıklarını bildiğimizde
        nerede yanılacaklarını da kestirebiliriz.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[
          {
            icon: Hash,
            title: "Metin ve sayma zorluğu",
            desc: "Üretilen görsellerde yazılar çoğu zaman bozuk çıkar; &ldquo;tam 5 elma&rdquo; gibi sayı isteklerine güvenilmez.",
          },
          {
            icon: ScanSearch,
            title: "Kompozisyon karışması",
            desc: "&ldquo;Mavi küpün üstünde kırmızı top&rdquo; gibi ilişkilerde renk/nesne yerini şaşırabilir (binding problemi).",
          },
          {
            icon: AlertTriangle,
            title: "Bias ve temsil",
            desc: "Eğitim verisi internetten geldiği için meslek, cinsiyet, kültür önyargılarını yansıtır ve pekiştirebilir.",
          },
          {
            icon: BookOpen,
            title: "Telif ve veri kaynağı",
            desc: "Modeller izinsiz toplanmış görsellerle eğitilmiş olabilir; üretilen içeriğin telif durumu hâlâ tartışmalı.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
            className="uyz-card rounded-xl p-5 flex items-start gap-4"
          >
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.35)" }}
            >
              <item.icon className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-6 uyz-warn-row rounded-lg px-4 py-3 text-xs flex items-center gap-2"
      >
        <AlertTriangle className="w-4 h-4 shrink-0" />
        <span className="text-gray-300">
          Kural: üretilen görseli <span className="text-white">olduğu gibi yayımlamadan önce</span> içeriğini,
          metnini ve telif durumunu kontrol et.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  15 · UYGULAMALI MİNİ LAB  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı mini lab</Eyebrow>
      <H2>Dört adımda multimodal deneyim</H2>
      <Sub className="mt-3 max-w-3xl">
        Lab tamamen tarayıcı/ücretsiz araçlarla yapılabilir. Sonraki derse bu dördünü yapmış ve
        kısa bir not düşmüş gelmen bekleniyor.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          {
            icon: Wand2,
            title: "Aynı prompt, üç varyant",
            desc: "Bir metinden görsel üreten araçta tek prompt&apos;u çalıştır; üç farklı çıktı al ve farkları yaz.",
            accent: "#ec4899",
          },
          {
            icon: Crop,
            title: "Prompt&apos;u somutlaştır",
            desc: "Aynı sahneye stil, ışık ve açı ekle (&ldquo;sulu boya, sıcak ışık, geniş açı&rdquo;). Çıktının nasıl değiştiğini gözlemle.",
            accent: "#a855f7",
          },
          {
            icon: ScanSearch,
            title: "CLIP ile eşleştir",
            desc: "Bir görsele 3-4 aday açıklama yaz; bir CLIP demosunda hangisinin en yüksek skoru aldığını not et.",
            accent: "#3b82f6",
          },
          {
            icon: X,
            title: "Bir kusur yakala",
            desc: "Bilerek zor bir prompt dene (yazı, sayma veya nesne ilişkisi). Modelin nerede hata yaptığını kaydet.",
            accent: "#f59e0b",
          },
        ].map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
            className="uyz-card uyz-card-hover rounded-xl p-5 flex items-start gap-4"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `${t.accent}1f`, border: `1px solid ${t.accent}55` }}
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
    </SlideShell>
  ),

  /* ─────────────────  16 · SIRADAKİ HAFTA + KAPANIŞ  ───────────────── */
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
          <Sparkles className="w-12 h-12 text-white" />
        </motion.div>

        <Eyebrow>11. hafta tamamlandı · sıradaki: ses &amp; müzik üretimi</Eyebrow>
        <H1>
          <span className="uyz-shimmer">Köprü kuruldu.</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta metin ile görseli aynı uzayda buluşturduk. 12. haftada üçüncü modaliteye —
          sese — geçiyoruz: konuşma sentezi ve müzik üretimi.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto text-left">
          <div className="uyz-card rounded-xl p-5">
            <ScanSearch className="w-5 h-5 mb-2" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1">Akılda kalan</div>
            <div className="text-white text-sm">CLIP eşler, DALL·E üretir</div>
          </div>
          <div className="uyz-card rounded-xl p-5">
            <Network className="w-5 h-5 mb-2" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1">Anahtar fikir</div>
            <div className="text-white text-sm">Ortak gömme uzayı</div>
          </div>
          <div className="uyz-card rounded-xl p-5">
            <Calendar className="w-5 h-5 mb-2" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1">Hazırlık</div>
            <div className="text-white text-sm">Mini lab notların</div>
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
          BVA 1203 · 11. Hafta · Multimodal Modeller (DALL·E, CLIP)
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
