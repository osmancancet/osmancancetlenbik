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
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  X,
  Zap,
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
  HelpCircle,
  Droplet,
  Flame,
  Bone,
  Wind,
  FlaskConical,
  Clock,
  Hand,
  Smile,
  MessageSquare,
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

/* CPR ritim monitörü — 30 bası : 2 nefes, 100-120/dk */
function CprMonitor() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="isg-monitor w-full max-w-3xl mx-auto"
    >
      <div className="flex items-center justify-between px-5 py-3 border-b border-green-500/20 text-[11px] font-mono uppercase tracking-widest text-green-300/80">
        <span className="flex items-center gap-2">
          <Activity className="w-4 h-4" /> CPR Metronomu
        </span>
        <span className="text-green-400/60">SpO&#8322; — · NIBP — · simülasyon</span>
      </div>
      <div className="px-5 pt-4">
        <svg viewBox="0 0 600 120" className="w-full h-24">
          <polyline
            className="isg-ecg-line"
            points="0,60 60,60 90,60 100,20 110,100 120,60 180,60 210,60 220,20 230,100 240,60 300,60 330,60 340,20 350,100 360,60 420,60 450,60 460,20 470,100 480,60 540,60 600,60"
          />
        </svg>
      </div>
      <div className="grid grid-cols-3 divide-x divide-green-500/15 border-t border-green-500/15">
        <div className="px-5 py-4 text-center">
          <div className="text-[10px] font-mono uppercase tracking-widest text-green-400/60">
            Hız
          </div>
          <div className="text-3xl font-black text-green-300 mt-1">
            100&#8211;120
          </div>
          <div className="text-[10px] text-gray-500 mt-0.5">bası / dakika</div>
        </div>
        <div className="px-5 py-4 text-center">
          <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400/70">
            Oran
          </div>
          <div className="flex items-baseline justify-center gap-1 mt-1">
            <span className="text-3xl font-black text-amber-300">30</span>
            <span className="text-lg text-gray-500">:</span>
            <span className="text-3xl font-black text-amber-300">2</span>
          </div>
          <div className="text-[10px] text-gray-500 mt-0.5">bası : nefes</div>
        </div>
        <div className="px-5 py-4 text-center">
          <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400/70">
            Derinlik
          </div>
          <div className="text-3xl font-black text-cyan-200 mt-1">5&#8211;6</div>
          <div className="text-[10px] text-gray-500 mt-0.5">cm (yetişkin)</div>
        </div>
      </div>
      <div className="px-5 py-3 border-t border-green-500/15 text-[11px] text-gray-400 flex items-start gap-2">
        <HeartPulse className="w-4 h-4 text-green-400 mt-0.5 shrink-0 isg-beat" />
        <span>
          Tempoyu tutturmak için &quot;Stayin&apos; Alive&quot; şarkısının ritmi
          referans alınabilir (&#8776;103 vuruş/dk). Her bası sonrası göğsün tam
          geri yükselmesine izin ver.
        </span>
      </div>
    </motion.div>
  );
}

/* Yanan kolu 20 dk akar su altında soğutma — basit mockup */
function BurnCoolMock() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="isg-card-amber rounded-2xl p-6 max-w-sm mx-auto text-center"
    >
      <div className="relative mx-auto mb-4" style={{ width: 150, height: 150 }}>
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 rounded-b-md"
          style={{ width: 30, height: 30, background: "#9ca3af" }}
        />
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 -translate-x-1/2 rounded-full"
            style={{ width: 4, background: "#38bdf8" }}
            initial={{ height: 0, top: 28, opacity: 0 }}
            animate={{ height: 70, top: 30, opacity: [0, 1, 0] }}
            transition={{ duration: 1, delay: 0.4 + i * 0.18, repeat: Infinity }}
          />
        ))}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-2 rounded-2xl"
          style={{
            width: 90,
            height: 60,
            background: "linear-gradient(180deg,#fbbf24,#b45309)",
            boxShadow: "0 8px 20px -6px rgba(245,158,11,0.6)",
          }}
        />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 text-[10px] text-gray-300 font-mono">
          yanık bölge
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 text-amber-200">
        <Clock className="w-5 h-5" />
        <span className="text-2xl font-black">20 dakika</span>
      </div>
      <div className="text-[12px] text-gray-300 mt-2 leading-relaxed">
        Oda sıcaklığında <span className="text-amber-300">akar su</span> altında
        soğut. Buz, diş macunu, yoğurt veya yağ <span className="text-red-300">YOK</span>.
      </div>
    </motion.div>
  );
}

/* Adımlı algoritma kartı (kanama, kırık, boğulma…) */
function StepCard({
  icon: Icon,
  title,
  subtitle,
  steps,
  accent = "#f59e0b",
  delay = 0,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  steps: string[];
  accent?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="isg-card rounded-2xl p-6 flex flex-col"
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${accent}18`, border: `1px solid ${accent}55` }}
        >
          <Icon className="w-6 h-6" style={{ color: accent }} />
        </div>
        <div>
          <div className="text-lg font-bold text-white">{title}</div>
          <div className="text-[11px] text-gray-400">{subtitle}</div>
        </div>
      </div>
      <ol className="space-y-2.5">
        {steps.map((s, i) => (
          <li key={s} className="flex items-start gap-3 text-[12px] text-gray-300">
            <span
              className="isg-step-num w-5 h-5 flex items-center justify-center text-[10px] shrink-0"
              style={{ marginTop: 1 }}
            >
              {i + 1}
            </span>
            <span>{s}</span>
          </li>
        ))}
      </ol>
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
        <Eyebrow>BVA 1109 · 2. Hafta · İlk Yardım Eğitimi II</Eyebrow>
        <H1 className="isg-shimmer">
          Acil Müdahale
          <br />
          ve İlk Yardım — II
        </H1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Kanama, yanık, kırık, boğulma ve kalp krizi — gerçek senaryolarda doğru
          ilk yardım
        </Sub>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 flex items-center justify-center gap-6 flex-wrap"
        >
          <div className="isg-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(34,197,94,0.18)" }}
            >
              <HeartPulse className="w-5 h-5" style={{ color: "#4ade80" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Temel Yaşam Desteği</div>
              <div className="text-[10px] text-gray-500">CPR · 30:2 · AED</div>
            </div>
          </div>
          <div className="isg-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(220,38,38,0.18)" }}
            >
              <Droplet className="w-5 h-5" style={{ color: "#f87171" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Kanama &amp; Şok</div>
              <div className="text-[10px] text-gray-500">Baskı · turnike · pozisyon</div>
            </div>
          </div>
          <div className="isg-card rounded-xl px-6 py-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: "rgba(245,158,11,0.18)" }}
            >
              <Flame className="w-5 h-5" style={{ color: "#fbbf24" }} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Yanık &amp; Kırık</div>
              <div className="text-[10px] text-gray-500">Soğutma · atelleme</div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 inline-flex items-center gap-2 text-xs font-mono text-gray-500"
        >
          <Calendar className="w-3.5 h-3.5" />
          Perşembe · 13:30 — 15:10 · Maket ve uygulamalı çalışma
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 2 — Geçen haftadan köprü
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 1. haftadan 2. haftaya</Eyebrow>
      <H2>Temeli kurduk; şimdi senaryolara iniyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta ilk yardımın tanımını, 5 altın kuralı, 112 çağrısını ve ABC
        algoritmasını öğrendik. Bu hafta ABC&apos;nin üzerine inşa ediyoruz:
        bilinci ve solunumu olmayan kişide ne yaparız, kanama ve yanıkta nasıl
        müdahale ederiz?
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="isg-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-amber-300">
            <GraduationCap className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Geçen hafta öğrendiklerin
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />
              İlk yardımın tanımı ve 4 temel amacı
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />
              5 altın kural ve 112&apos;yi doğru arama
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-[#f59e0b] shrink-0" />
              ABC: Hava yolu · Solunum · Dolaşım
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="isg-card-amber rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-green-300">
            <Target className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">
              Bu haftanın hedefi
            </span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-green-400 shrink-0" />
              Solunumu durmuş kişide CPR ve AED uygulamak
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-green-400 shrink-0" />
              Kanama, yanık, kırık ve şokta doğru müdahale
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-4 h-4 mt-0.5 text-green-400 shrink-0" />
              Boğulma, zehirlenme, kalp krizi ve inmeyi tanımak
            </li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 3 — Dersin akışı
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç bölüm: yaşam desteği → travma → acil tablolar</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce hayatın doğrudan tehlikede olduğu durdurulmuş kalp/solunum; sonra
        kaza yaralanmaları (kanama, yanık, kırık); en sonda hızlı tanı isteyen
        tıbbi acil tablolar.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          {
            range: "01",
            title: "Temel Yaşam Desteği",
            items: ["Bilinç & solunum değerlendirme", "CPR — 30:2 göğüs basısı", "AED ile şok uygulama"],
            icon: HeartPulse,
            accent: "#22c55e",
          },
          {
            range: "02",
            title: "Travma & Yaralanma",
            items: ["Dış kanama ve şok", "Yanık dereceleri & soğutma", "Kırık · çıkık · burkulma"],
            icon: Droplet,
            accent: "#dc2626",
          },
          {
            range: "03",
            title: "Acil Tıbbi Tablolar",
            items: ["Boğulma — Heimlich", "Zehirlenmeler", "Kalp krizi & inme — FAST"],
            icon: ShieldAlert,
            accent: "#f59e0b",
          },
        ].map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="isg-card rounded-xl p-6"
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
                  Bölüm {g.range}
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

  /* ─────────────────  1. TEMEL YAŞAM DESTEĞİ  ───────────────── */

  // 4 — Section: TYD
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Temel Yaşam Desteği"
      subtitle="Kalbi ve solunumu durmuş kişide hayata köprü: CPR ve AED"
      bgGradient="linear-gradient(135deg, #22c55e, #15803d)"
      shadow="0 20px 60px -10px rgba(34, 197, 94, 0.6)"
      icon={<HeartPulse className="w-16 h-16 text-white" />}
    />
  ),

  // 5 — TYD karar zinciri
  () => (
    <SlideShell>
      <Eyebrow>Karar zinciri</Eyebrow>
      <H2 className="mb-2">Bilincine bak → solunumuna bak → CPR</H2>
      <Sub className="max-w-3xl mb-6">
        Temel Yaşam Desteği, ABC&apos;nin saha uygulamasıdır. Her adımda bir karar
        verirsin; tepki ya da solunum yoksa hemen bir alttaki adıma geçersin.
      </Sub>
      <div className="space-y-3 max-w-4xl">
        {[
          {
            n: 1,
            t: "Güvenlik & bilinç",
            d: "Ortam güvenli mi? Omuzdan dürt, &quot;İyi misiniz?&quot; diye seslen.",
            yes: "Tepki var → yan yatır, izle, 112",
            accent: "#f59e0b",
            icon: HelpCircle,
          },
          {
            n: 2,
            t: "112 + yardım çağır",
            d: "Tepki yoksa hemen 112; mümkünse bir AED istet.",
            yes: "Çevreden birine görev ver",
            accent: "#3b82f6",
            icon: Phone,
          },
          {
            n: 3,
            t: "Hava yolunu aç & solunuma bak",
            d: "Baş geri-çene yukarı; 10 sn boyunca bak-dinle-hisset.",
            yes: "Normal soluyor → derlenme pozisyonu",
            accent: "#a855f7",
            icon: Wind,
          },
          {
            n: 4,
            t: "Solunum yoksa: CPR başlat",
            d: "30 göğüs basısı + 2 kurtarıcı nefes; AED gelince tak.",
            yes: "112 / ekip gelene dek ara verme",
            accent: "#22c55e",
            icon: HeartPulse,
          },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="isg-card rounded-xl p-4 flex items-center gap-4"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-black"
                style={{ background: `${s.accent}20`, color: s.accent, border: `1px solid ${s.accent}55` }}
              >
                {s.n}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" style={{ color: s.accent }} />
                  <span className="text-sm font-semibold text-white">{s.t}</span>
                </div>
                <div
                  className="text-[12px] text-gray-400 mt-0.5"
                  dangerouslySetInnerHTML={{ __html: s.d }}
                />
              </div>
              <div className="hidden md:flex items-center gap-2 text-[11px] text-green-300 shrink-0 max-w-[230px]">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>{s.yes}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SlideShell>
  ),

  // 6 — CPR metronom mockup
  () => (
    <SlideShell>
      <Eyebrow>Kalp masajı · tempo</Eyebrow>
      <H2 className="mb-2">CPR: 30 bası, 2 nefes, durmadan</H2>
      <Sub className="max-w-3xl mb-6">
        Yetişkinde göğüs kemiğinin alt yarısına, iki el üst üste, dirsekler düz.
        Tempo ve derinlik kanı dolaştıran şeydir — yavaş ya da yüzeysel bası işe
        yaramaz.
      </Sub>
      <CprMonitor />
    </SlideShell>
  ),

  // 7 — AED adımları
  () => (
    <SlideShell>
      <Eyebrow>Otomatik Eksternal Defibrilatör</Eyebrow>
      <H2 className="mb-8">AED: cihaz seni yönlendirir</H2>
      <div className="grid md:grid-cols-[1fr_300px] gap-8 items-start">
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              n: 1,
              t: "Cihazı aç",
              d: "Kapağı açınca sesli komutlar başlar — söylediğini yap.",
              icon: Zap,
            },
            {
              n: 2,
              t: "Pedleri yapıştır",
              d: "Şemaya göre: biri sağ köprücük altı, biri sol koltuk altı.",
              icon: Activity,
            },
            {
              n: 3,
              t: "Analiz: kimse dokunmasın",
              d: "Cihaz ritmi okurken hastadan herkes elini çeker.",
              icon: Hand,
            },
            {
              n: 4,
              t: "Şok + hemen CPR",
              d: "&quot;Şok ver&quot; derse butona bas; ardından CPR&apos;ye devam.",
              icon: HeartPulse,
            },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="isg-card rounded-xl p-4"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="isg-step-num w-6 h-6 flex items-center justify-center text-xs">
                    {s.n}
                  </span>
                  <Icon className="w-4 h-4 text-amber-300" />
                  <span className="text-sm font-semibold text-white">{s.t}</span>
                </div>
                <div
                  className="text-[12px] text-gray-400 mt-1"
                  dangerouslySetInnerHTML={{ __html: s.d }}
                />
              </motion.div>
            );
          })}
        </div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="isg-card-green rounded-2xl p-5"
        >
          <CheckCircle2 className="w-6 h-6 text-green-400 mb-3" />
          <div className="text-sm font-semibold text-white mb-2">
            Bilmen yeterli, gerisi otomatik
          </div>
          <div className="text-[12px] text-gray-300 leading-relaxed">
            AED yalnızca gereken ritimde şok verir; kalbi atan birine yanlışlıkla
            şok uygulamaz. Bu yüzden eğitimsiz kişi de güvenle kullanabilir.
            Havalimanı, AVM ve birçok iş yerinde bulunur.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  2. TRAVMA & YARALANMA  ───────────────── */

  // 8 — Section: Travma
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Travma &amp; Yaralanma"
      subtitle="Kanama, yanık, kırık — iş kazalarında en sık karşılaşılan tablolar"
      bgGradient="linear-gradient(135deg, #dc2626, #7f1d1d)"
      shadow="0 20px 60px -10px rgba(220, 38, 38, 0.6)"
      icon={<Droplet className="w-16 h-16 text-white" />}
    />
  ),

  // 9 — Kanama & şok
  () => (
    <SlideShell>
      <Eyebrow>Dış kanama</Eyebrow>
      <H2 className="mb-8">Kanamayı durdur, şoku tanı</H2>
      <div className="grid md:grid-cols-2 gap-5">
        <StepCard
          icon={Droplet}
          title="Kanamayı durdur"
          subtitle="Sırayla yukarı çık"
          steps={[
            "Yaraya temiz bezle doğrudan baskı uygula",
            "Mümkünse yaralı uzvu kalp seviyesinin üstüne kaldır",
            "Kan bezden geçerse üstüne ekle, çıkarma",
            "Durmuyorsa basınç noktasına bas; son çare turnike",
          ]}
          accent="#dc2626"
          delay={0.15}
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="isg-card-red rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="text-lg font-bold text-white">Şok belirtileri</span>
          </div>
          <ul className="space-y-2 text-[13px] text-gray-300 mb-4">
            <li>· Soluk, soğuk, nemli (terli) cilt</li>
            <li>· Hızlı ve zayıf nabız, hızlı solunum</li>
            <li>· Huzursuzluk, baş dönmesi, bilinç bulanıklığı</li>
            <li>· Susuzluk hissi, dudaklarda morarma</li>
          </ul>
          <div className="border-t border-red-500/20 pt-3">
            <div className="text-xs font-semibold text-red-300 mb-1">
              Şok pozisyonu
            </div>
            <div className="text-[12px] text-gray-300">
              Hastayı sırtüstü yatır, bacaklarını yaklaşık 30 cm kaldır, üstünü
              ört (sıcak tut). Ağızdan bir şey verme. 112&apos;yi ara.
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 isg-card rounded-xl p-4 text-center"
      >
        <div className="text-[13px] text-gray-300">
          <span className="text-[#f59e0b] font-semibold">Turnike:</span> Yalnızca
          baskıyla durmayan, hayatı tehdit eden uzuv kanamasında. Yaranın 5&#8211;7
          cm üstüne, eklem üzerine değil; uygulanma saatini mutlaka not et.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 10 — Yanık dereceleri tablosu + soğutma mockup
  () => (
    <SlideShell>
      <Eyebrow>Yanıklar</Eyebrow>
      <H2 className="mb-6">Yanık derecesi ve ilk müdahale</H2>
      <div className="grid md:grid-cols-[1fr_320px] gap-6 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="isg-card rounded-xl p-1"
        >
          <table className="isg-tbl">
            <thead>
              <tr>
                <th style={{ width: "22%" }}>Derece</th>
                <th style={{ width: "40%" }}>Belirti</th>
                <th>İlk yardım</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="flex items-center gap-2 text-white font-semibold">
                    <span className="isg-degree-dot" style={{ background: "#fca5a5" }} />
                    1. derece
                  </span>
                </td>
                <td>Kızarıklık, hafif ağrı (güneş yanığı gibi)</td>
                <td>20 dk akar su; gevşek pansuman, nemlendirici</td>
              </tr>
              <tr>
                <td>
                  <span className="flex items-center gap-2 text-white font-semibold">
                    <span className="isg-degree-dot" style={{ background: "#f59e0b" }} />
                    2. derece
                  </span>
                </td>
                <td>İçi su dolu kabarcıklar (bül), şiddetli ağrı</td>
                <td>20 dk soğut; kabarcığı PATLATMA; steril örtü</td>
              </tr>
              <tr>
                <td>
                  <span className="flex items-center gap-2 text-white font-semibold">
                    <span className="isg-degree-dot" style={{ background: "#7f1d1d" }} />
                    3. derece
                  </span>
                </td>
                <td>Deri kömürleşmiş/beyaz, ağrı az olabilir (sinir hasarı)</td>
                <td>Yapışan giysiyi çıkarma; örtüp acil 112</td>
              </tr>
            </tbody>
          </table>
          <div className="text-[11px] text-gray-500 px-3 py-2">
            El, yüz, eklem, genital bölge yanıkları ve geniş yüzeyli yanıklar
            küçük olsa da hastaneye sevk gerektirir.
          </div>
        </motion.div>
        <BurnCoolMock />
      </div>
    </SlideShell>
  ),

  // 11 — Kırık, çıkık, burkulma
  () => (
    <SlideShell>
      <Eyebrow>Kemik & eklem yaralanmaları</Eyebrow>
      <H2 className="mb-8">Kırık · çıkık · burkulma</H2>
      <div className="grid md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Bone}
          title="Kırık"
          desc="Kemik bütünlüğü bozulmuştur. Şekil bozukluğu, şişlik, hareketle artan ağrı; açık kırıkta kemik görünebilir."
          accent="#dc2626"
          delay={0.1}
        />
        <FeatureCard
          icon={Activity}
          title="Çıkık"
          desc="Eklem yüzeyleri ayrılmıştır. Eklem kilitli, hareket edemez, belirgin şekil bozukluğu vardır."
          accent="#f59e0b"
          delay={0.2}
        />
        <FeatureCard
          icon={ShieldAlert}
          title="Burkulma"
          desc="Eklem bağları zorlanmış/yırtılmıştır. Şişlik ve morarma olur ama kemik yerindedir."
          accent="#3b82f6"
          delay={0.3}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="mt-6 isg-card-amber rounded-xl p-5"
      >
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-5 h-5 text-amber-300" />
          <span className="text-sm font-semibold text-white">
            Hepsinde ortak kural: RICE
          </span>
        </div>
        <div className="grid sm:grid-cols-4 gap-3 text-[12px]">
          {[
            { k: "R", t: "Rest", d: "Hareketsiz bırak, sabitle" },
            { k: "I", t: "Ice", d: "Beze sarılı buz, 20 dk" },
            { k: "C", t: "Compression", d: "Elastik bandajla bas" },
            { k: "E", t: "Elevation", d: "Uzvu kalp seviyesi üstüne" },
          ].map((r) => (
            <div key={r.k} className="isg-card rounded-lg p-3">
              <div className="flex items-baseline gap-2">
                <span className="isg-token">{r.k}</span>
                <span className="text-white font-semibold text-sm">{r.t}</span>
              </div>
              <div className="text-gray-400 mt-1">{r.d}</div>
            </div>
          ))}
        </div>
        <div className="text-[11px] text-gray-400 mt-3">
          Kırık şüphesinde uzvu bulduğun pozisyonda atelle/destekle sabitle;
          düzeltmeye çalışma. Açık kırıkta yaraya bastırmadan steril örtü kapat.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  3. ACİL TIBBİ TABLOLAR  ───────────────── */

  // 12 — Section: Acil tablolar
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Acil Tıbbi Tablolar"
      subtitle="Boğulma, zehirlenme, kalp krizi ve inme — hızlı tanı hayat kurtarır"
      bgGradient="linear-gradient(135deg, #f59e0b, #b45309)"
      shadow="0 20px 60px -10px rgba(245, 158, 11, 0.6)"
      icon={<ShieldAlert className="w-16 h-16 text-white" />}
    />
  ),

  // 13 — Boğulma (Heimlich) & zehirlenme
  () => (
    <SlideShell>
      <Eyebrow>Tıkanma & zehirlenme</Eyebrow>
      <H2 className="mb-8">Hava yolu tıkanması ve zehirlenmeler</H2>
      <div className="grid md:grid-cols-2 gap-5">
        <StepCard
          icon={Wind}
          title="Boğulma — Heimlich"
          subtitle="Bilinci açık, öksüremiyor"
          steps={[
            "Öksürebiliyorsa karışma — öksürmeye teşvik et",
            "Tıkalıysa: arkasına geç, iki kürek kemiği arasına 5 sırt darbesi",
            "Düzelmezse: göbek üstünden 5 kez içeri-yukarı bası (Heimlich)",
            "Bilinç kapanırsa yere yatır ve CPR&apos;ye başla, 112",
          ]}
          accent="#3b82f6"
          delay={0.15}
        />
        <StepCard
          icon={FlaskConical}
          title="Zehirlenme"
          subtitle="Solunum · sindirim · cilt yoluyla"
          steps={[
            "Kişiyi kaynaktan/gazlı ortamdan güvenli alana çıkar",
            "184 Zehir Danışma ve 112&apos;yi ara; maddeyi/ambalajı sakla",
            "Sen söylemeden kusturma; asit/baz ve petrolde kesinlikle kusturma yok",
            "Bilinç kapalıysa yan yatır, hava yolunu açık tut",
          ]}
          accent="#a855f7"
          delay={0.3}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 isg-card rounded-xl p-4 text-center"
      >
        <div className="text-[13px] text-gray-300">
          <span className="text-[#f59e0b] font-semibold">İş yerinde:</span> Kapalı
          alanda biriken gaz (CO, metan) zehirlenmesinde kurtarıcı önce kendi
          güvenliğini düşünmeli — tek başına gazlı ortama girme.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 14 — Kalp krizi & inme (FAST)
  () => (
    <SlideShell>
      <Eyebrow>Kalp krizi & inme</Eyebrow>
      <H2 className="mb-6">İnmeyi tanı: FAST testi</H2>
      <Sub className="max-w-3xl mb-6">
        İnmede her dakika beyin hücresi kaybıdır. Belirtilerden birini bile
        görürsen 112&apos;yi ara ve belirtinin başlama saatini söyle.
      </Sub>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { k: "F", t: "Face — Yüz", d: "Gülümsemesini iste; ağzın bir kenarı düşük mü?", icon: Smile, c: "#f59e0b" },
          { k: "A", t: "Arm — Kol", d: "İki kolunu kaldırsın; biri düşüyor mu, güçsüz mü?", icon: Hand, c: "#3b82f6" },
          { k: "S", t: "Speech — Konuşma", d: "Basit cümle kursun; peltek/anlamsız mı?", icon: MessageSquare, c: "#a855f7" },
          { k: "T", t: "Time — Zaman", d: "Biri bile varsa hemen 112; başlama saatini ver.", icon: Clock, c: "#22c55e" },
        ].map((r, i) => {
          const Icon = r.icon;
          return (
            <motion.div
              key={r.k}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="isg-card rounded-xl p-5 text-center"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center font-black text-2xl mx-auto mb-3"
                style={{ background: `${r.c}20`, color: r.c, border: `1px solid ${r.c}55` }}
              >
                {r.k}
              </div>
              <Icon className="w-5 h-5 mx-auto mb-2" style={{ color: r.c }} />
              <div className="text-sm font-semibold text-white">{r.t}</div>
              <div className="text-[11px] text-gray-400 mt-1">{r.d}</div>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 isg-card-red rounded-xl p-4"
      >
        <div className="text-[13px] text-gray-200">
          <span className="text-red-300 font-semibold">Kalp krizi:</span> Göğüste
          baskı/sıkışma, sol kola-çeneye yayılan ağrı, soğuk ter, nefes darlığı.
          Kişiyi yarı oturt, sıkan giysiyi gevşet, 112&apos;yi ara. Bilinci açık ve
          alerjisi yoksa çiğnemesi için aspirin verilebilir; karar 112 ile.
        </div>
      </motion.div>
    </SlideShell>
  ),

  // 15 — Yapılır / yapılmaz (bu haftaya özel)
  () => (
    <SlideShell>
      <Eyebrow>Pratik özet</Eyebrow>
      <H2 className="mb-8">Yapılır vs Yapılmaz</H2>
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
              "Solunum yoksa kesintisiz CPR (30:2), AED gelince tak",
              "Kanayan yere doğrudan, sürekli baskı uygula",
              "Yanığı 20 dk oda sıcaklığında akar suyla soğut",
              "Kırık uzvu bulduğun pozisyonda atelle sabitle",
              "Şokta bacakları kaldır, üstünü ört, 112 ara",
              "Bilinçsiz hastayı yan (derlenme) pozisyonuna al",
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
              "Yanık kabarcığını patlatma, krem/macun/yağ sürme",
              "Saplanmış cismi (demir, bıçak) yerinden çıkarma",
              "Kırığı &quot;yerine oturtmaya&quot; çalışma",
              "Bilinci kapalı kişiye ağızdan su/ilaç verme",
              "Asit-baz veya petrol zehirlenmesinde kusturma",
              "Turnikeyi gevşetip sıkma; saatini yazmayı unutma",
            ].map((d) => (
              <li key={d} className="flex items-start gap-2 text-red-100">
                <X className="w-3.5 h-3.5 text-red-400 mt-1 shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: d }} />
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  // 16 — Uygulamalı çalışma
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı çalışma</Eyebrow>
      <H2>Maket üzerinde dört istasyon</H2>
      <Sub className="mt-3 max-w-3xl">
        Çalışma, eğitim maketi ve eğitmen gözetiminde yapılır. Gerçek kişide
        prova yapılmaz. Sonraki derse aşağıdaki dördünü uygulamış gelmen
        bekleniyor.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: HeartPulse, title: "CPR maketi", desc: "30:2 oranında 2 dakika kesintisiz bası-nefes; tempoyu metronomla tut.", accent: "#22c55e" },
          { icon: Zap, title: "AED simülasyonu", desc: "Eğitim AED&apos;sinde ped yerleşimi ve &quot;dokunmayın-şok&quot; komutlarını uygula.", accent: "#fbbf24" },
          { icon: Droplet, title: "Bası & atel", desc: "Kanama maketinde baskı uygula; kola üçgen sargı ve atelle sabitleme yap.", accent: "#dc2626" },
          { icon: Wind, title: "Heimlich provası", desc: "Sırt darbesi ve karın itme tekniğini eğitmen eşliğinde tekrar et.", accent: "#3b82f6" },
        ].map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="isg-card isg-card-hover rounded-xl p-5 flex items-start gap-4"
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
        className="mt-6 isg-card-amber rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <AlertTriangle className="w-4 h-4 text-amber-300 mt-0.5 shrink-0" />
        <span>
          <span className="text-white">Sertifikalı yetki:</span> Resmî ilk yardımcı
          sertifikası, Sağlık Bakanlığı onaylı merkezlerin uygulamalı eğitimiyle
          alınır. Bu ders farkındalık ve temel beceri kazandırır.
        </span>
      </motion.div>
    </SlideShell>
  ),

  // 17 — Sıradaki hafta + kapanış
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8"
          style={{
            background: "linear-gradient(135deg,#f59e0b,#b45309)",
            boxShadow: "0 20px 60px -10px rgba(245,158,11,0.6)",
          }}
        >
          <Heart className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>2. hafta tamamlandı · sıradaki: Hafta 3</Eyebrow>
        <H1 className="isg-shimmer">Kişisel Emniyet ve Hijyen</H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          İlk yardımdan korunmaya geçiyoruz: iş yerinde kişisel emniyet, sağlık ve
          hijyen kuralları, kişisel koruyucu donanıma giriş.
        </Sub>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <FeatureCard
            icon={ShieldAlert}
            title="Kişisel emniyet"
            desc="Çalışma ortamında temel emniyet davranışları ve riskten kaçınma."
            accent="#f59e0b"
            delay={0.1}
          />
          <FeatureCard
            icon={Activity}
            title="Sağlık & hijyen"
            desc="El hijyeni, bulaş yolları ve iş yeri sağlık kuralları."
            accent="#22c55e"
            delay={0.2}
          />
          <FeatureCard
            icon={Briefcase}
            title="KKD&apos;ye giriş"
            desc="Eldiven, maske, gözlük ve baretin ne zaman, neden gerektiği."
            accent="#3b82f6"
            delay={0.3}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 grid md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          <div className="isg-card rounded-xl p-4">
            <Calendar className="w-5 h-5 text-[#f59e0b] mb-2 mx-auto" />
            <div className="text-xs text-gray-400">Ders günü</div>
            <div className="text-sm font-semibold text-white mt-1">
              Perşembe · 13:30 — 15:10
            </div>
          </div>
          <div className="isg-card rounded-xl p-4">
            <Globe className="w-5 h-5 text-[#f59e0b] mb-2 mx-auto" />
            <div className="text-xs text-gray-400">Derslik</div>
            <div className="text-sm font-semibold text-white mt-1">
              MCBÜ MYO · Amfi 1
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
          <Brain className="w-3.5 h-3.5" />
          <span>Doğru ilk yardım öğrenilir; &quot;sanırım biliyorum&quot; yetmez.</span>
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
            background: "linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b)",
            boxShadow: "0 0 16px rgba(245,158,11,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#f59e0b]/70">
          BVA 1109 · 2. Hafta · İlk Yardım II
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
