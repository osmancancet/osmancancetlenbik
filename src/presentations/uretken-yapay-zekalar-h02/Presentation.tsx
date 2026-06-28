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
  Dices,
  Percent,
  Divide,
  Sigma,
  Network,
  GitBranch,
  ArrowRight,
  Calendar,
  Code2,
  Terminal,
  ListChecks,
  BarChart3,
  FlaskConical,
  BookOpen,
  Target,
  Stethoscope,
  CheckCircle2,
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

function StatCard({
  icon: Icon,
  value,
  label,
  source,
  delay = 0,
  accent = ACCENT,
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
      className="uyz-card rounded-xl p-5"
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

/* Probability distribution as horizontal bars */
function ProbabilityBars({
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
            className={`w-36 text-right font-mono text-sm ${
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

/* A labelled formula block, terminal-style */
function FormulaBlock({
  title,
  lines,
}: {
  title: string;
  lines: Array<{ code: string; note?: string }>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
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
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-semibold flex-1 max-w-md mx-auto text-center justify-center"
          style={{ background: "#0d0314", color: ACCENT_SOFT }}
        >
          <Sigma className="w-3.5 h-3.5" />
          <span>{title}</span>
        </div>
      </div>
      <div className="p-6 space-y-3" style={{ background: "#0a0414" }}>
        {lines.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.18 }}
            className="flex flex-col gap-1"
          >
            <code className="font-mono text-base md:text-lg text-violet-200">{l.code}</code>
            {l.note && (
              <span className="text-xs text-gray-500 pl-1">{l.note}</span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* Python REPL-style terminal */
function PyTerminal({
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
      <div className="p-5 font-mono text-[13px] leading-relaxed" style={{ background: "#0a0414" }}>
        {children}
      </div>
    </motion.div>
  );
}

/* Markov state node */
function StateNode({ label }: { label: string }) {
  return <span className="uyz-state text-sm">{label}</span>;
}

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ─────────────────  1 · KAPAK  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 1203 · 2. Hafta</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.02]"
        >
          <span className="uyz-shimmer">Olasılıksal</span>
          <br />
          <span className="uyz-shimmer">Temeller</span>
        </motion.h1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Üretken modellerin altındaki matematik: olasılık, Bayes teoremi ve
          Markov zincirleri.
          <br />
          <span className="text-gray-500 text-base">
            &ldquo;Sonraki kelime ne olmalı?&rdquo; sorusunun cevabı bu hafta sayılarla geliyor.
          </span>
        </Sub>

        <div className="grid grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={Percent}
            title="Olasılık"
            desc="Koşullu olasılık, çarpım ve toplam kuralı — modelin dili."
            delay={0.4}
            accent="#a855f7"
          />
          <FeatureCard
            icon={Brain}
            title="Bayes Teoremi"
            desc="Yeni kanıt geldikçe inancı güncelleme makinesi."
            delay={0.55}
            accent="#ec4899"
          />
          <FeatureCard
            icon={Network}
            title="Markov Zinciri"
            desc="&ldquo;Sonraki durum yalnızca şu ankine bağlı.&rdquo;"
            delay={0.7}
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
      <Eyebrow>Köprü · 1. haftadan 2. haftaya</Eyebrow>
      <H2>Geçen hafta &ldquo;olası kelime&rdquo; dedik. Olasılık tam olarak nedir?</H2>
      <Sub className="mt-3 mb-10 max-w-3xl">
        1. haftada bir LLM&apos;in her adımda &ldquo;bundan sonra hangi kelime en
        olası?&rdquo; sorusunu cevapladığını gördük. Bu hafta o cümlenin
        altındaki matematiği netleştiriyoruz.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="uyz-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4 text-gray-400">
            <BookOpen className="w-5 h-5" style={{ color: ACCENT_SOFT }} />
            <span className="text-xs font-mono uppercase tracking-widest">1. haftada kalan</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />Token: model harf değil, parça görür.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />Her token için bir olasılık dağılımı hesaplanır.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />Sıcaklık (temperature) bu dağılımdan seçimi etkiler.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="uyz-card-violet rounded-2xl p-6"
          style={{ boxShadow: "0 0 40px rgba(168,85,247,0.18)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5" style={{ color: ACCENT_SOFT }} />
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: ACCENT_SOFT }}>Bu haftanın hedefi</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />Koşullu olasılığı ve P(sonraki | önceki) gösterimini okumak.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />Bayes teoremiyle &ldquo;kanıt geldikçe inanç güncelleme&rdquo;.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />Markov zinciriyle ilk üretken modeli (bigram) kurmak.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  3 · DERSİN AKIŞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: olasılık → Bayes → Markov</H2>
      <Sub className="mt-3 mb-10 max-w-3xl">
        Önce olasılığın dilini kuruyoruz; sonra inancı güncelleyen Bayes
        teoremini; en son durumdan duruma geçişi modelleyen Markov zincirlerini.
        Sonunda küçük bir Python labı.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { range: "01", title: "Olasılığın Dili", items: ["Olasılık, örnek uzay", "Koşullu olasılık", "Çarpım & toplam kuralı"], icon: Percent, accent: "#a855f7" },
          { range: "02", title: "Bayes Teoremi", items: ["Önsav (prior) ↔ sonsav (posterior)", "Olabilirlik (likelihood)", "Kanıtla inanç güncelleme"], icon: Brain, accent: "#ec4899" },
          { range: "03", title: "Markov Zincirleri", items: ["Durum ve geçiş", "Geçiş matrisi", "Bigram dil modeli"], icon: Network, accent: "#3b82f6" },
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

  /* ─────────────────  4 · BÖLÜM 1 / 3  ───────────────── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="Olasılığın Dili"
      subtitle="Üretken model olasılık dağılımı üretir. O dağılımı okuyamadan modelin çıktısını da yorumlayamayız."
      bgGradient="linear-gradient(135deg, #a855f7 0%, #6d28d9 100%)"
      shadow="0 0 80px rgba(168, 85, 247, 0.55)"
      icon={<Dices className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  5 · OLASILIK TEMEL  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Temel · olasılık nedir?</Eyebrow>
      <H2>Olasılık: 0 ile 1 arasında bir inanç ölçüsü</H2>
      <Sub className="mt-3 mb-8 max-w-3xl">
        Bir olayın olabilirliği <span className="uyz-formula">P(A)</span> ile
        gösterilir; 0 (imkânsız) ile 1 (kesin) arasındadır. Tüm sonuçların
        olasılıkları toplamı 1&apos;dir.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="uyz-card rounded-2xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-wider mb-4" style={{ color: ACCENT_SOFT }}>
            Örnek · adil zar
          </div>
          <p className="text-sm text-gray-400 mb-4 leading-relaxed">
            Bir zarda 6 eşit olası sonuç var. Çift gelme olayı{" "}
            <span className="text-white">A = &#123;2, 4, 6&#125;</span>.
          </p>
          <div className="uyz-code rounded-xl p-4 text-base text-violet-200">
            P(A) = |A| / |S| = 3 / 6 = 0.5
          </div>
          <div className="mt-4 text-xs text-gray-500">
            |A| = uygun sonuç sayısı · |S| = tüm sonuçların sayısı (örnek uzay).
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="space-y-3"
        >
          {[
            { icon: Sigma, t: "Normalleşme", d: "Tüm olasılıkların toplamı 1'dir: Σ P(xᵢ) = 1." },
            { icon: Divide, t: "Bağımsızlık", d: "A ve B bağımsızsa P(A ∩ B) = P(A) · P(B)." },
            { icon: Percent, t: "Tümleyen", d: "Bir olayın olmaması: P(Aᶜ) = 1 − P(A)." },
          ].map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.45 + i * 0.12 }}
              className="uyz-card rounded-xl p-4 flex items-start gap-3"
            >
              <r.icon className="w-5 h-5 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />
              <div>
                <div className="text-sm font-semibold text-white">{r.t}</div>
                <div className="text-sm text-gray-400 font-mono">{r.d}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  6 · KOŞULLU OLASILIK  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Üretken modelin kalbi · koşullu olasılık</Eyebrow>
      <H2 className="mb-2">P(sonraki | önceki)</H2>
      <Sub className="max-w-3xl mb-8">
        Üretken model, baştan sona bir cümleyi koşullu olasılıkların çarpımı
        olarak üretir. &ldquo;Önceki kelimeler verildiğinde sonraki ne?&rdquo;
        sorusu, formülde dikey çizginin sağındaki kısımdır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <FormulaBlock
          title="Koşullu olasılık · zincir kuralı"
          lines={[
            { code: "P(A | B) = P(A ∩ B) / P(B)", note: "B gerçekleştiğinde A'nın olasılığı." },
            { code: "P(w₁ w₂ w₃) =", note: "Bir cümlenin olasılığı, zincir kuralıyla açılır:" },
            { code: "P(w₁) · P(w₂|w₁) · P(w₃|w₁ w₂)", note: "Her kelime, kendinden öncekilere koşullanır." },
          ]}
        />

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="uyz-card rounded-2xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-wider mb-4" style={{ color: ACCENT_SOFT }}>
            &ldquo;Bir varmış, bir ___&rdquo; için P(sonraki | önceki)
          </div>
          <ProbabilityBars
            candidates={[
              { token: "yokmuş", prob: 89, highlight: true },
              { token: "tekti", prob: 5 },
              { token: "sokak", prob: 2 },
              { token: "zaman", prob: 1 },
            ]}
          />
          <div className="mt-5 pt-4 border-t border-white/5 text-xs text-gray-500 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" style={{ color: ACCENT_SOFT }} />
            Bu dağılım, bir önceki bağlama koşullanmış P(w | bağlam) değeridir.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  7 · BÖLÜM 2 / 3  ───────────────── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Bayes Teoremi"
      subtitle="Kanıt geldikçe inancı tersine çevirip güncelleyen denklem. Sınıflandırmadan tanılamaya, modern YZ'nin her yerinde."
      bgGradient="linear-gradient(135deg, #ec4899 0%, #be185d 100%)"
      shadow="0 0 80px rgba(236, 72, 153, 0.5)"
      icon={<Brain className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  8 · BAYES FORMÜLÜ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bayes · formülü çözmek</Eyebrow>
      <H2 className="mb-2">Önsavı, kanıtla sonsava çevir</H2>
      <Sub className="max-w-3xl mb-8">
        Bayes teoremi <span className="uyz-formula">P(neden | kanıt)</span>{" "}
        değerini, ters yöndeki <span className="uyz-formula">P(kanıt | neden)</span>{" "}
        cinsinden hesaplamayı sağlar. Dört terimin her birinin bir adı vardır.
      </Sub>

      <FormulaBlock
        title="Bayes teoremi"
        lines={[
          { code: "P(H | E) = P(E | H) · P(H) / P(E)", note: "H = hipotez (neden) · E = kanıt (evidence)" },
          { code: "P(H)      → önsav (prior)", note: "Kanıttan önceki inancımız." },
          { code: "P(E | H)  → olabilirlik (likelihood)", note: "H doğruysa bu kanıtı görme şansı." },
          { code: "P(H | E)  → sonsav (posterior)", note: "Kanıttan sonra güncellenmiş inanç." },
        ]}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="mt-6 uyz-card rounded-xl p-5 flex items-start gap-3 max-w-4xl"
      >
        <GitBranch className="w-6 h-6 shrink-0 mt-0.5" style={{ color: ACCENT_SOFT }} />
        <div className="text-sm text-gray-400">
          <span className="text-white font-semibold">Sezgi:</span> sonsav,
          önsav ile olabilirliğin çarpımıyla orantılıdır. Yani başlangıç inancı
          ne kadar güçlüyse, onu değiştirmek için o kadar güçlü kanıt gerekir.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  9 · BAYES SAYISAL ÖRNEK  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bayes · sayısal örnek</Eyebrow>
      <H2 className="mb-2">Pozitif test, hasta olduğun anlamına gelmez</H2>
      <Sub className="max-w-3xl mb-6">
        Nadir bir hastalık (önsav %1), testin doğruluğu %99 olsa bile, pozitif
        çıkan birinin gerçekten hasta olma olasılığı şaşırtıcı derecede düşük
        olabilir. Sayılarla görelim.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
        <div className="md:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="uyz-card rounded-xl p-1"
          >
            <table className="uyz-tbl">
              <thead>
                <tr>
                  <th>Terim</th>
                  <th>Değer</th>
                  <th>Anlamı</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-white font-semibold">P(Hasta)</td>
                  <td className="font-mono text-violet-300">0.01</td>
                  <td>Önsav — toplumda hastalığın görülme sıklığı.</td>
                </tr>
                <tr>
                  <td className="text-white font-semibold">P(+ | Hasta)</td>
                  <td className="font-mono text-violet-300">0.99</td>
                  <td>Duyarlılık — hastaysa testin pozitif çıkması.</td>
                </tr>
                <tr>
                  <td className="text-white font-semibold">P(+ | Sağlam)</td>
                  <td className="font-mono text-violet-300">0.01</td>
                  <td>Yanlış alarm — sağlamken pozitif çıkması.</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:col-span-2"
        >
          <div className="uyz-code rounded-xl p-5 text-sm text-violet-200 space-y-2">
            <div className="text-[11px] font-mono uppercase tracking-wider text-gray-500">Hesap</div>
            <div>P(+) = 0.99·0.01</div>
            <div className="pl-8">+ 0.01·0.99</div>
            <div className="pl-8">= 0.0198</div>
            <div className="pt-2 border-t border-white/10">
              P(Hasta | +)
            </div>
            <div className="pl-2">= 0.99·0.01 / 0.0198</div>
            <div className="text-2xl font-bold text-white pt-1">≈ 0.50</div>
          </div>
          <div className="mt-3 text-xs text-gray-500 flex items-start gap-2">
            <Stethoscope className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />
            Pozitif çıkana rağmen hasta olma şansı yalnızca %50 — çünkü önsav çok düşük.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  10 · BAYES NEREDE  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bayes · üretken YZ&apos;de nerede?</Eyebrow>
      <H2>Aynı denklem, dört farklı yerde</H2>
      <Sub className="mt-3 mb-10 max-w-3xl">
        Bayes&apos;çi düşünce, basit sınıflandırıcılardan modern üretken
        modellere kadar uzanır. Birkaç somut örnek:
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FeatureCard
          icon={ListChecks}
          title="Naive Bayes ile spam"
          desc="P(spam | kelimeler) ∝ P(kelimeler | spam) · P(spam). Basit ama klasik metin sınıflandırıcı."
          delay={0.1}
          accent="#a855f7"
        />
        <FeatureCard
          icon={BarChart3}
          title="Üretken vs ayırt edici"
          desc="Üretken modeller P(veri) dağılımını öğrenir; ayırt ediciler doğrudan P(etiket | veri)'yi."
          delay={0.2}
          accent="#ec4899"
        />
        <FeatureCard
          icon={Brain}
          title="Bayes çıkarımı"
          desc="Belirsizliği olasılık dağılımıyla temsil etme — difüzyon modellerinin matematiksel arka planında da yatar."
          delay={0.3}
          accent="#3b82f6"
        />
        <FeatureCard
          icon={Target}
          title="Karar verme"
          desc="Yeni kanıt geldikçe sonsavı güncelleyip en olası açıklamayı seçmek; aktif öğrenmenin temeli."
          delay={0.4}
          accent="#22c55e"
        />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  11 · BÖLÜM 3 / 3  ───────────────── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Markov Zincirleri"
      subtitle="Hafızası bir adımlık bir dünya: sonraki durum yalnızca şu ankine bağlıdır. İlk üretken dil modelimiz buradan doğacak."
      bgGradient="linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)"
      shadow="0 0 80px rgba(59, 130, 246, 0.5)"
      icon={<Network className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  12 · MARKOV ÖZELLİĞİ + DİYAGRAM  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Markov · durum ve geçiş</Eyebrow>
      <H2 className="mb-2">Geleceği sadece şimdi belirler</H2>
      <Sub className="max-w-3xl mb-8">
        Markov özelliği: bir sonraki durumun olasılığı, geçmişin tamamına değil
        yalnızca <span className="text-white">şimdiki duruma</span> bağlıdır.
        <span className="uyz-formula ml-2">P(sₜ₊₁ | sₜ, …, s₀) = P(sₜ₊₁ | sₜ)</span>
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="uyz-card rounded-2xl p-8"
      >
        <div className="text-xs font-mono uppercase tracking-wider mb-6 text-center" style={{ color: ACCENT_SOFT }}>
          Hava durumu zinciri · iki durum
        </div>
        <div className="flex items-center justify-center gap-6 flex-wrap">
          <div className="flex flex-col items-center gap-2">
            <StateNode label="Güneş" />
            <span className="text-[11px] font-mono text-gray-500">döngü 0.8</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="flex items-center gap-1 text-gray-400">
              <ArrowRight className="w-5 h-5" style={{ color: ACCENT_SOFT }} />
              <span className="text-[11px] font-mono">0.2</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <span className="text-[11px] font-mono">0.4</span>
              <ArrowRight className="w-5 h-5 rotate-180" style={{ color: ACCENT_SOFT }} />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <StateNode label="Yağmur" />
            <span className="text-[11px] font-mono text-gray-500">döngü 0.6</span>
          </div>
        </div>
        <div className="mt-6 text-center text-sm text-gray-500">
          Bugün güneşliyse, yarın %80 yine güneşli, %20 yağmurlu. Dünkü hava
          önemli değil — bilgi tek adımlık.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  13 · GEÇİŞ MATRİSİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Markov · geçiş matrisi</Eyebrow>
      <H2 className="mb-2">Zincir, bir tablo olarak</H2>
      <Sub className="max-w-3xl mb-8">
        Her satır bir durumdan çıkan olasılıkları taşır ve toplamı 1&apos;dir.
        Aşağıda yukarıdaki hava zincirinin geçiş matrisi var.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="uyz-card rounded-2xl p-5"
        >
          <table className="uyz-matrix">
            <thead>
              <tr>
                <th>P(satır→sütun)</th>
                <th>Güneş</th>
                <th>Yağmur</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Güneş</th>
                <td className="uyz-cell-hot">0.8</td>
                <td>0.2</td>
              </tr>
              <tr>
                <th>Yağmur</th>
                <td>0.4</td>
                <td className="uyz-cell-hot">0.6</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-4 text-xs text-gray-500">
            Her satırın toplamı: 0.8 + 0.2 = 1 · 0.4 + 0.6 = 1.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="space-y-3"
        >
          <div className="uyz-card rounded-xl p-4 flex items-start gap-3">
            <Sigma className="w-5 h-5 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />
            <div className="text-sm text-gray-400">
              <span className="text-white font-semibold">Satır = dağılım.</span>{" "}
              Bir durumdan gidilebilecek tüm yerlerin olasılıkları.
            </div>
          </div>
          <div className="uyz-card rounded-xl p-4 flex items-start gap-3">
            <ArrowRight className="w-5 h-5 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />
            <div className="text-sm text-gray-400">
              <span className="text-white font-semibold">n adım sonrası</span>{" "}
              için matris kendisiyle çarpılır (Pⁿ); kararlı dağılıma yaklaşır.
            </div>
          </div>
          <div className="uyz-card rounded-xl p-4 flex items-start gap-3">
            <Code2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />
            <div className="text-sm text-gray-400">
              Kelimeleri durum yaparsak bu matris bir{" "}
              <span className="text-white">bigram dil modeline</span> dönüşür.
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  14 · BIGRAM PYTHON  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>İlk üretken model · bigram</Eyebrow>
      <H2 className="mb-2">Markov zincirinden metin üreten 12 satır</H2>
      <Sub className="max-w-3xl mb-6">
        Kelimeleri durum kabul edersek, &ldquo;hangi kelimeden sonra hangisi
        geliyor&rdquo; sayımları bir geçiş matrisidir. Bu, GPT&apos;nin en sade
        atası: bigram dil modeli.
      </Sub>

      <PyTerminal title="python · bigram.py">
        <div className="text-gray-500"># Eğitim metni → ikili (bigram) sayımları</div>
        <div><span className="text-violet-300">import</span> random, collections</div>
        <div className="mt-2"><span className="text-violet-300">def</span>{" "}
          <span className="text-pink-300">egit</span>(metin):</div>
        <div className="pl-6">kelimeler = metin.split()</div>
        <div className="pl-6">model = collections.defaultdict(list)</div>
        <div className="pl-6"><span className="text-violet-300">for</span> a, b{" "}
          <span className="text-violet-300">in</span> zip(kelimeler, kelimeler[<span className="text-amber-300">1</span>:]):</div>
        <div className="pl-12">model[a].append(b)  <span className="text-gray-600"># a'dan sonra b geldi</span></div>
        <div className="pl-6"><span className="text-violet-300">return</span> model</div>
        <div className="mt-2"><span className="text-violet-300">def</span>{" "}
          <span className="text-pink-300">uret</span>(model, basla, n=<span className="text-amber-300">8</span>):</div>
        <div className="pl-6">w, cikti = basla, [basla]</div>
        <div className="pl-6"><span className="text-violet-300">for</span> _{" "}
          <span className="text-violet-300">in</span> range(n):</div>
        <div className="pl-12">w = random.choice(model[w])  <span className="text-gray-600"># olasılıkla seç</span></div>
        <div className="pl-12">cikti.append(w)</div>
        <div className="pl-6"><span className="text-violet-300">return</span> <span className="text-emerald-300">&quot; &quot;</span>.join(cikti)</div>
        <div className="mt-3">
          <span className="text-gray-500">&gt;&gt;&gt; </span>
          uret(egit(metin), <span className="text-emerald-300">&quot;bir&quot;</span>)
        </div>
        <div className="text-emerald-300">&apos;bir varmış bir zamanlar küçük bir köyde&apos;</div>
      </PyTerminal>
    </SlideShell>
  ),

  /* ─────────────────  15 · BU HAFTA LAB  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı lab</Eyebrow>
      <H2>Kendi bigram üreticini yaz</H2>
      <Sub className="mt-3 mb-8 max-w-3xl">
        Bu hafta teoriyi koda dökeceğiz. Sonraki derse bu dört adımı yapmış ve
        çıktını getirmiş gelmen bekleniyor.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: FlaskConical, title: "Bir metin seç", desc: "Türkçe bir masal ya da şarkı sözü gibi 200+ kelimelik bir metni bir .txt dosyasına koy.", accent: "#a855f7" },
          { icon: Code2, title: "Bigram modelini eğit", desc: "Slayttaki egit() fonksiyonuyla her kelimeden sonra gelenleri say; geçiş tablosunu oluştur.", accent: "#ec4899" },
          { icon: Sparkles, title: "Metin üret", desc: "Bir başlangıç kelimesinden uret() ile 10-15 kelimelik cümleler üretip çıktıyı gözlemle.", accent: "#3b82f6" },
          { icon: ListChecks, title: "Gözlemini yaz", desc: "Üretilen metin neden bazen anlamsız? Daha büyük bağlam (trigram) ne kazandırırdı? 3 cümlede not al.", accent: "#22c55e" },
        ].map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-6 uyz-card rounded-lg px-4 py-3 text-xs text-gray-400 flex items-start gap-3 max-w-4xl"
      >
        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_SOFT }} />
        <span>
          <span className="text-white">İpucu:</span> Çok küçük metinde model
          ezber yapar (girdiyi aynen tekrarlar). Daha çeşitli çıktı için metni
          büyüt; bu, eğitim verisi miktarının önemini birinci elden gösterir.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  16 · SIRADAKİ HAFTA + KAPANIŞ  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8 uyz-pulse"
          style={{ background: "linear-gradient(135deg,#a855f7,#6d28d9)", boxShadow: "0 0 60px rgba(168,85,247,0.5)" }}
        >
          <Network className="w-12 h-12 text-white" />
        </motion.div>

        <Eyebrow>2. hafta tamamlandı · sıradaki: Sinir Ağları 101</Eyebrow>
        <H1>
          <span className="uyz-shimmer">Sayımdan öğrenmeye</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Bu hafta olasılıkları elle saydık. Hafta 3&apos;te bu olasılıkları{" "}
          <span className="text-white">öğrenen</span> yapıya geçiyoruz: yapay
          sinir ağları — nöron, ağırlık ve geri yayılım.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="uyz-card rounded-xl p-5">
            <Calendar className="w-5 h-5 mb-3" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Ders saati</div>
            <div className="text-white font-semibold">Perşembe</div>
            <div className="text-sm text-gray-400">15:20 — 17:00</div>
          </div>
          <div className="uyz-card rounded-xl p-5">
            <Target className="w-5 h-5 mb-3" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">Python kurulu dizüstü</div>
            <div className="text-sm text-gray-400">bigram labını getir</div>
          </div>
          <div className="uyz-card rounded-xl p-5">
            <BookOpen className="w-5 h-5 mb-3" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Önceden bak</div>
            <div className="text-white font-semibold">3blue1brown</div>
            <div className="text-sm text-gray-400">&ldquo;Neural networks&rdquo; bölüm 1</div>
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
          BVA 1203 · 2. Hafta · Olasılıksal Temeller
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
