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
  User,
  UserCircle2,
  Heart,
  Brain,
  Eye,
  Ear,
  MessageSquare,
  Quote,
  Target,
  Map as MapIcon,
  Route,
  Footprints,
  Smile,
  Frown,
  Meh,
  Search,
  ClipboardList,
  Lightbulb,
  Compass,
  Layers,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Calendar,
  Briefcase,
  GraduationCap,
  Sparkles,
  Hash,
  Globe,
  TrendingUp,
  PenTool,
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
        <div className="absolute inset-0 katas-grid-bg pointer-events-none" />
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
      className="inline-flex items-center gap-3 mb-6 text-xs font-mono uppercase tracking-[0.25em] text-[#ec4899]"
    >
      <span className="w-8 h-px bg-[#ec4899]" />
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
  accent = "#ec4899",
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
      className="katas-card katas-card-hover rounded-xl p-6 transition-all"
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
          className="inline-flex w-32 h-32 rounded-3xl items-center justify-center mb-8 katas-pulse"
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

/* Figma çerçeveli pencere (persona kartı için) */
function FigmaFrameMockup({
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
      className="katas-window-chrome w-full"
    >
      <div className="katas-window-bar flex items-center gap-2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex items-center gap-2 ml-3 px-3 py-1 rounded text-[11px] font-semibold flex-1 max-w-md mx-auto text-center justify-center"
          style={{ background: "#0d0d0d", color: "#f9a8d4" }}
        >
          <span className="w-5 h-5 rounded-sm katas-f-tile flex items-center justify-center text-[11px]">F</span>
          <span>{title}</span>
        </div>
      </div>
      <div className="p-0">{children}</div>
    </motion.div>
  );
}

/* Persona kartı — Figma frame içinde */
function PersonaCardMockup() {
  return (
    <FigmaFrameMockup title="persona-elif.fig — Kullanıcı Personası">
      <div className="bg-[#1e1e1e] p-6">
        <div className="bg-white rounded-xl overflow-hidden max-w-3xl mx-auto shadow-2xl">
          {/* üst şerit */}
          <div
            className="px-6 py-4 flex items-center gap-4"
            style={{ background: "linear-gradient(135deg, #ec4899, #be185d)" }}
          >
            <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/60 flex items-center justify-center">
              <UserCircle2 className="w-10 h-10 text-white" />
            </div>
            <div className="text-white">
              <div className="text-xl font-black">Elif Demir</div>
              <div className="text-[11px] opacity-90">
                28 · Pazarlama Uzmanı · İstanbul · &quot;Verimli Elif&quot;
              </div>
            </div>
            <div className="ml-auto text-right text-white/90 text-[11px] font-mono">
              Teknoloji: ●●●●○
              <br />
              Sabır: ●●○○○
            </div>
          </div>
          {/* gövde */}
          <div className="grid grid-cols-2 gap-px bg-pink-100">
            <div className="bg-white p-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-pink-600 mb-2">
                Hedefler
              </div>
              <ul className="text-[11px] text-gray-700 space-y-1.5">
                <li className="flex gap-1.5">
                  <Target className="w-3 h-3 mt-0.5 text-pink-500 flex-shrink-0" />
                  Raporları 10 dakikada hazırlamak
                </li>
                <li className="flex gap-1.5">
                  <Target className="w-3 h-3 mt-0.5 text-pink-500 flex-shrink-0" />
                  Mobilden hızlıca onay vermek
                </li>
              </ul>
            </div>
            <div className="bg-white p-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-pink-600 mb-2">
                Engeller (Pain Points)
              </div>
              <ul className="text-[11px] text-gray-700 space-y-1.5">
                <li className="flex gap-1.5">
                  <AlertTriangle className="w-3 h-3 mt-0.5 text-red-500 flex-shrink-0" />
                  Çok adımlı, karmaşık formlar
                </li>
                <li className="flex gap-1.5">
                  <AlertTriangle className="w-3 h-3 mt-0.5 text-red-500 flex-shrink-0" />
                  Mobilde okunmayan küçük yazılar
                </li>
              </ul>
            </div>
            <div className="bg-white p-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-pink-600 mb-2">
                Davranış
              </div>
              <p className="text-[11px] text-gray-700 leading-relaxed">
                Günde 6+ saat ekran başında. İşlerin %70&apos;ini telefondan
                yapıyor. Yeni araç öğrenmeye zamanı yok.
              </p>
            </div>
            <div className="bg-white p-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-pink-600 mb-2">
                Söylediği söz
              </div>
              <p className="text-[11px] text-gray-800 italic leading-relaxed">
                &quot;Bana üç tık fazla geliyorsa, başka bir uygulamaya
                geçerim.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </FigmaFrameMockup>
  );
}

/* Empathy map — 4 çeyrek + ortada kullanıcı */
function EmpathyMapMockup() {
  const quads: Array<{
    icon: LucideIcon;
    label: string;
    items: string[];
  }> = [
    {
      icon: Brain,
      label: "DÜŞÜNÜR & HİSSEDER",
      items: [
        "“Bu işi zamanında bitirebilecek miyim?”",
        "Hata yapma kaygısı, acele etme hissi",
      ],
    },
    {
      icon: Ear,
      label: "DUYAR",
      items: [
        "Yöneticisi: “Rapor bugün lazım.”",
        "Meslektaşları başka araçları öneriyor",
      ],
    },
    {
      icon: Eye,
      label: "GÖRÜR",
      items: [
        "Kalabalık bir arayüz, çok sayıda buton",
        "Rakip uygulamaların sade ekranları",
      ],
    },
    {
      icon: MessageSquare,
      label: "SÖYLER & YAPAR",
      items: [
        "“Hızlı bir çözüm arıyorum.”",
        "Yarım kalan adımları atlayıp deniyor",
      ],
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative max-w-5xl mx-auto"
    >
      <div className="grid grid-cols-2 gap-4">
        {quads.map((q, i) => (
          <motion.div
            key={q.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.1 }}
            className="katas-quad"
          >
            <div className="flex items-center gap-2 mb-3">
              <q.icon className="w-4 h-4 text-pink-400" />
              <span className="katas-quad-label">{q.label}</span>
            </div>
            <ul className="space-y-1.5 text-sm text-gray-300">
              {q.items.map((it) => (
                <li key={it} className="flex gap-2">
                  <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-pink-500/70 flex-shrink-0" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      {/* ortada kullanıcı rozeti */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div
          className="w-20 h-20 rounded-full flex flex-col items-center justify-center text-white shadow-lg"
          style={{
            background: "linear-gradient(135deg, #ec4899, #be185d)",
            boxShadow: "0 0 30px rgba(236,72,153,0.5)",
          }}
        >
          <User className="w-7 h-7" />
          <span className="text-[9px] font-bold mt-0.5">Elif</span>
        </div>
      </div>
    </motion.div>
  );
}

/* User journey — aşamalar + duygu eğrisi */
function JourneyCurveMockup() {
  const stages = [
    { stage: "Farkındalık", emoji: "neutral", y: 50, label: "Reklamı görür", touch: "Sosyal medya" },
    { stage: "Değerlendirme", emoji: "happy", y: 28, label: "Karşılaştırır", touch: "Web sitesi" },
    { stage: "Kayıt", emoji: "sad", y: 72, label: "Uzun form ile boğuşur", touch: "Kayıt ekranı" },
    { stage: "İlk kullanım", emoji: "neutral", y: 48, label: "Arayüzü keşfeder", touch: "Onboarding" },
    { stage: "Geri dönüş", emoji: "happy", y: 24, label: "Alışkanlık kazanır", touch: "Bildirim" },
  ];

  const W = 760;
  const H = 220;
  const pad = 60;
  const step = (W - pad * 2) / (stages.length - 1);
  const points = stages.map((s, i) => {
    const { y: rawY, ...rest } = s;
    return {
      ...rest,
      x: pad + i * step,
      y: (rawY / 100) * (H - 60) + 30,
    };
  });
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  function EmojiFor({ kind }: { kind: string }) {
    if (kind === "happy") return <Smile className="w-5 h-5 text-emerald-400" />;
    if (kind === "sad") return <Frown className="w-5 h-5 text-red-400" />;
    return <Meh className="w-5 h-5 text-amber-400" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="katas-card rounded-xl p-6 max-w-5xl mx-auto"
    >
      {/* aşama başlıkları */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {stages.map((s) => (
          <div key={s.stage} className="text-center">
            <div className="text-xs font-bold text-white">{s.stage}</div>
            <div className="text-[10px] text-pink-300 font-mono mt-0.5">{s.touch}</div>
          </div>
        ))}
      </div>

      {/* duygu eğrisi */}
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        <line x1={pad} y1={(H - 60) * 0.5 + 30} x2={W - pad} y2={(H - 60) * 0.5 + 30}
          stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
        <motion.path
          d={path}
          fill="none"
          stroke="#ec4899"
          strokeWidth={3}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={7} fill="#0a0a0a" stroke="#ec4899" strokeWidth={2}
              className="katas-emotion-dot" />
            <text x={p.x} y={p.y - 16} textAnchor="middle" fontSize="9" fill="#9ca3af">
              {p.label}
            </text>
          </g>
        ))}
        {/* dip uyarısı */}
        <text x={points[2].x} y={points[2].y + 24} textAnchor="middle" fontSize="9" fill="#f87171" fontWeight="700">
          ⚠ Acı noktası
        </text>
      </svg>

      {/* duygu ikonları */}
      <div className="grid grid-cols-5 gap-2 mt-3">
        {stages.map((s) => (
          <div key={s.stage} className="flex justify-center">
            <EmojiFor kind={s.emoji} />
          </div>
        ))}
      </div>
      <div className="mt-4 text-[11px] text-gray-500 text-center">
        Eğrinin dibe vurduğu yer (Kayıt) — en yüksek terk riski. Tasarım önceliği burası.
      </div>
    </motion.div>
  );
}

/* ============================================================
   SLIDES
   ============================================================ */

const slides: Array<(active: boolean) => ReactNode> = [
  /* ─────────────────  01 · KAPAK  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 2245 · 3. Hafta · Kullanıcı Modelleme</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-8xl font-bold tracking-tight leading-[1] mb-6"
        >
          <span className="katas-shimmer">Persona, Journey</span>
          <br />
          <span className="text-white">&amp; Empathy Map</span>
        </motion.h1>
        <Sub className="mt-6 max-w-3xl mx-auto">
          Veriyi insana çeviriyoruz. Kullanıcıyı bir kişi gibi tanımla, yolculuğunu
          çiz, dünyasını gözünden gör.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 grid grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          <FeatureCard
            icon={UserCircle2}
            title="Persona"
            desc="Araştırma verisini temsil eden kurgusal ama gerçekçi kullanıcı."
            delay={0.6}
          />
          <FeatureCard
            icon={Route}
            title="User Journey"
            desc="Kullanıcının hedefe giderken yaşadığı adım adım deneyim."
            delay={0.75}
            accent="#a855f7"
          />
          <FeatureCard
            icon={Heart}
            title="Empathy Map"
            desc="Kullanıcının ne düşündüğü, gördüğü, duyduğu ve yaptığı."
            delay={0.9}
            accent="#3b82f6"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-10 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/5 text-xs text-pink-300 font-mono"
        >
          <Calendar className="w-3 h-3" />
          Cuma · 15:20 — 17:00 · Uygulamalı oturum (Figma)
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  02 · KÖPRÜ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 2. haftadan 3. haftaya</Eyebrow>
      <H2>Veri topladık; şimdi onu bir insana dönüştürüyoruz</H2>
      <Sub className="mt-3 mb-8 max-w-3xl">
        Geçen hafta kullanıcı araştırması yaptık: görüşme, anket, gözlem. Elimizde
        ham notlar var. Bu hafta o notları takımın günlük olarak kullanabileceği üç
        somut tasarım aracına çeviriyoruz.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="katas-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-pink-300">
            <ClipboardList className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Geçen hafta · ham veri</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-pink-400 flex-shrink-0" />12 görüşme notu, 80 anket cevabı</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-pink-400 flex-shrink-0" />Dağınık alıntılar ve gözlemler</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-pink-400 flex-shrink-0" />Henüz takımla paylaşılamayan bilgi</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="katas-card-rose rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-pink-300">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu hafta · sentez</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-pink-400 flex-shrink-0" />Persona: kime tasarlıyoruz?</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-pink-400 flex-shrink-0" />Journey: nerede zorlanıyor?</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-pink-400 flex-shrink-0" />Empathy map: ne hissediyor?</li>
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 katas-card rounded-xl p-5 flex items-start gap-3 max-w-4xl"
      >
        <Lightbulb className="w-5 h-5 text-pink-300 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-gray-300 leading-relaxed">
          Üçü de <strong className="text-pink-300">sentez (synthesis)</strong> araçlarıdır:
          araştırma verisini takımın paylaştığı, üzerinde karar verilebilen bir
          forma dönüştürürler. Üçü de veriye dayanmalı — uydurmaya değil.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  03 · BU DERSİN AKIŞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: kim → yolculuk → empati</H2>
      <Sub className="mt-3 mb-10 max-w-3xl">
        Önce kullanıcıyı bir kişi olarak tanımlıyoruz; sonra o kişinin hedefe giden
        yolunu çiziyoruz; en son onun iç dünyasına empatiyle bakıyoruz. Sonunda
        kısa bir uygulama.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { range: "01", title: "Persona", items: ["Persona nedir, ne değildir", "Bir personanın anatomisi", "Veriden persona üretmek"], icon: UserCircle2, accent: "#ec4899" },
          { range: "02", title: "User Journey", items: ["Aşamalar ve temas noktaları", "Duygu eğrisi", "Acı noktası (pain point) tespiti"], icon: Route, accent: "#a855f7" },
          { range: "03", title: "Empathy Map", items: ["Dört çeyrek (söyler/düşünür...)", "Personayla ilişkisi", "Içgörüye dönüştürme"], icon: Heart, accent: "#3b82f6" },
        ].map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="katas-card rounded-xl p-6"
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

  /* ─────────────────  04 · DIVIDER 1/3  ───────────────── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Persona"
      subtitle="“Herkes için” tasarlamak, kimse için tasarlamaktır. Persona, somut bir kişiye odaklanmamızı sağlar."
      bgGradient="linear-gradient(135deg, #ec4899 0%, #be185d 100%)"
      shadow="0 0 60px rgba(236, 72, 153, 0.5)"
      icon={<UserCircle2 className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  05 · PERSONA NEDİR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Persona · tanım</Eyebrow>
      <H2 className="mb-2">Persona nedir?</H2>
      <Sub className="max-w-3xl mb-8">
        Persona; gerçek araştırma verisine dayanan, bir kullanıcı grubunu temsil
        eden <strong className="text-pink-300">kurgusal ama gerçekçi</strong> bir
        karakterdir. Tasarım kararlarında &quot;kim için?&quot; sorusunu somutlaştırır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="katas-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-emerald-300">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Persona ÖYLEDİR</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />Araştırma verisinden türetilir</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />Hedef, davranış ve engelleri vardır</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />Takımın paylaştığı ortak bir referanstır</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />Karar verdirir: &quot;Elif bunu kullanır mıydı?&quot;</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="katas-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-red-300">
            <XCircle className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Persona DEĞİLDİR</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-red-400 flex-shrink-0" />Hayal gücüyle uydurulan bir karakter</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-red-400 flex-shrink-0" />Gerçek tek bir kişinin kopyası</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-red-400 flex-shrink-0" />Sadece demografi listesi (yaş, cinsiyet)</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-red-400 flex-shrink-0" />Pazarlama hedef kitlesiyle aynı şey</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  06 · PERSONANIN ANATOMİSİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Persona · anatomi</Eyebrow>
      <H2>Bir personanın yapı taşları</H2>
      <Sub className="mt-3 mb-8 max-w-3xl">
        İyi bir persona kartı standart bölümlerden oluşur. Demografi sadece
        başlangıçtır; asıl değer hedefler, davranış ve engellerdedir.
      </Sub>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={User}
          title="Kimlik & demografi"
          desc="İsim, yaş, meslek, bağlam. Personayı hatırlanır ve insani kılar."
          delay={0}
        />
        <FeatureCard
          icon={Target}
          title="Hedefler"
          desc="Kullanıcı ürünle ne başarmak istiyor? Tasarımın asıl pusulası."
          delay={0.1}
          accent="#a855f7"
        />
        <FeatureCard
          icon={AlertTriangle}
          title="Engeller (pain points)"
          desc="Onu yavaşlatan, sinirlendiren, vazgeçiren şeyler."
          delay={0.2}
          accent="#f87171"
        />
        <FeatureCard
          icon={Brain}
          title="Davranış & motivasyon"
          desc="Nasıl davranıyor, neyle motive oluyor? Teknoloji yatkınlığı."
          delay={0.3}
          accent="#3b82f6"
        />
        <FeatureCard
          icon={Quote}
          title="Temsil eden söz"
          desc="Personayı tek cümlede özetleyen, akılda kalan bir alıntı."
          delay={0.4}
          accent="#10b981"
        />
        <FeatureCard
          icon={Briefcase}
          title="Senaryo / bağlam"
          desc="Ürünü hangi ortamda, hangi cihazla, hangi anda kullanıyor?"
          delay={0.5}
          accent="#f59e0b"
        />
      </div>
    </SlideShell>
  ),

  /* ─────────────────  07 · PERSONA KARTI MOCKUP  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Persona · gerçek örnek</Eyebrow>
      <H2 className="mb-2">Persona kartı: &quot;Verimli Elif&quot;</H2>
      <Sub className="mb-6 max-w-3xl">
        Bütün parçaları bir araya getiren tek sayfalık kart. Takımdaki herkes
        masasında bunu görür ve aynı kişiyi düşünür.
      </Sub>
      <PersonaCardMockup />
    </SlideShell>
  ),

  /* ─────────────────  08 · DIVIDER 2/3  ───────────────── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="User Journey"
      subtitle="Persona kim olduğunu söyler; journey o kişinin hedefe giderken neler yaşadığını gösterir."
      bgGradient="linear-gradient(135deg, #a855f7 0%, #ec4899 100%)"
      shadow="0 0 60px rgba(168, 85, 247, 0.5)"
      icon={<Route className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  09 · JOURNEY BİLEŞENLERİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>User Journey · bileşenler</Eyebrow>
      <H2>Bir yolculuk haritası neyden oluşur?</H2>
      <Sub className="mt-3 mb-8 max-w-3xl">
        Journey map yatay bir zaman çizgisidir. Satırlar her aşamada ne olduğunu
        farklı katmanlarda anlatır.
      </Sub>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <FeatureCard
          icon={Footprints}
          title="Aşamalar"
          desc="Farkındalık → değerlendirme → kullanım → geri dönüş gibi safhalar."
          delay={0}
        />
        <FeatureCard
          icon={Compass}
          title="Temas noktaları"
          desc="Kullanıcının ürünle karşılaştığı her an: reklam, ekran, e-posta."
          delay={0.1}
          accent="#a855f7"
        />
        <FeatureCard
          icon={Heart}
          title="Duygu eğrisi"
          desc="Her aşamadaki memnuniyet/hayal kırıklığı düzeyi — inişli çıkışlı çizgi."
          delay={0.2}
          accent="#3b82f6"
        />
        <FeatureCard
          icon={Lightbulb}
          title="Fırsatlar"
          desc="Acı noktalarının karşısına yazılan iyileştirme fikirleri."
          delay={0.3}
          accent="#f59e0b"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 katas-card rounded-xl p-5 flex items-start gap-3 max-w-4xl"
      >
        <TrendingUp className="w-5 h-5 text-pink-300 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-gray-300 leading-relaxed">
          Asıl değer, duygu eğrisinin <strong className="text-pink-300">dibe vurduğu</strong>
          {" "}anı görmektir. O an, kullanıcının ürünü terk etme olasılığının en yüksek
          olduğu yerdir — yani tasarım önceliğinin ilk adayı.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  10 · JOURNEY DUYGU EĞRİSİ MOCKUP  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>User Journey · canlı örnek</Eyebrow>
      <H2 className="mb-2">Elif&apos;in yolculuğu ve duygu eğrisi</H2>
      <Sub className="max-w-3xl mb-6">
        Aynı persona, beş aşamalık bir yolculukta. Çizgi nerede aşağı düşüyorsa,
        deneyim orada kötüleşiyor demektir.
      </Sub>
      <JourneyCurveMockup />
    </SlideShell>
  ),

  /* ─────────────────  11 · JOURNEY TABLOSU  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>User Journey · tablo biçimi</Eyebrow>
      <H2>Aynı yolculuk, çalışılabilir tablo olarak</H2>
      <Sub className="mt-3 max-w-3xl">
        Pratikte journey çoğu zaman bir tabloya dökülür: her satır bir katman, her
        sütun bir aşama. Acı noktası ve fırsat satırları en kritik olanlardır.
      </Sub>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 katas-card rounded-xl p-1"
      >
        <table className="katas-tbl">
          <thead>
            <tr>
              <th style={{ width: "16%" }}>Katman</th>
              <th style={{ width: "21%" }}>Farkındalık</th>
              <th style={{ width: "21%" }}>Kayıt</th>
              <th>İlk kullanım</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Eylem</td>
              <td>Reklamı görür, siteye girer</td>
              <td>Hesap açar, formu doldurur</td>
              <td>İlk raporunu hazırlamaya çalışır</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Temas noktası</td>
              <td><span className="font-mono text-pink-300">Sosyal medya</span></td>
              <td><span className="font-mono text-pink-300">Kayıt ekranı</span></td>
              <td><span className="font-mono text-pink-300">Onboarding</span></td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Düşünce</td>
              <td>&quot;Belki işime yarar.&quot;</td>
              <td>&quot;Bu form neden bu kadar uzun?&quot;</td>
              <td>&quot;Tamam, mantığı çözmeye başladım.&quot;</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Duygu</td>
              <td><span className="text-amber-300">Nötr / meraklı</span></td>
              <td><span className="text-red-300">Sinirli (acı noktası)</span></td>
              <td><span className="text-emerald-300">Rahatlamış</span></td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Fırsat</td>
              <td>Net değer vaadi göster</td>
              <td>Formu adımlara böl, sosyal giriş ekle</td>
              <td>İlk başarı anını kutla (boş durum + ipucu)</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  12 · DIVIDER 3/3  ───────────────── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Empathy Map"
      subtitle="Journey ne yaptığını gösterir; empathy map o anda kullanıcının kafasının içinde ne olduğunu yakalar."
      bgGradient="linear-gradient(135deg, #f472b6 0%, #a855f7 100%)"
      shadow="0 0 60px rgba(244, 114, 182, 0.5)"
      icon={<Heart className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  13 · EMPATHY MAP MOCKUP  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Empathy Map · dört çeyrek</Eyebrow>
      <H2 className="mb-2">Kullanıcının dünyasını dört pencereden gör</H2>
      <Sub className="max-w-3xl mb-6">
        Empati haritası kullanıcıyı ortaya koyar ve etrafını dört soruyla doldurur:
        ne <strong className="text-pink-300">düşünür/hisseder</strong>, ne
        {" "}<strong className="text-pink-300">duyar</strong>, ne
        {" "}<strong className="text-pink-300">görür</strong>, ne
        {" "}<strong className="text-pink-300">söyler/yapar</strong>.
      </Sub>
      <EmpathyMapMockup />
    </SlideShell>
  ),

  /* ─────────────────  14 · ÜÇ ARAÇ NASIL BAĞLANIR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sentez · üç araç bir arada</Eyebrow>
      <H2>Persona, journey ve empathy map nasıl birbirine bağlanır?</H2>
      <Sub className="mt-3 mb-8 max-w-3xl">
        Üçü ayrı belgeler değil, aynı kullanıcının üç farklı görünümüdür. Biri
        diğerini besler; birlikte içgörüye (insight) dönüşürler.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: UserCircle2, t: "Persona", d: "KİM? Tasarladığımız kişi. Diğer iki aracın öznesi.", accent: "#ec4899" },
          { icon: Route, t: "Journey", d: "NE OLUYOR? Personanın hedefe giderken yaşadığı süreç.", accent: "#a855f7" },
          { icon: Heart, t: "Empathy Map", d: "NEDEN? Belirli bir anda personanın iç dünyası.", accent: "#3b82f6" },
        ].map((c, i) => (
          <motion.div
            key={c.t}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
            className="katas-card rounded-xl p-6 text-center"
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
              style={{ background: `${c.accent}18`, border: `1px solid ${c.accent}55` }}
            >
              <c.icon className="w-7 h-7" style={{ color: c.accent }} />
            </div>
            <div className="text-lg font-bold text-white mb-2">{c.t}</div>
            <div className="text-sm text-gray-400 leading-relaxed">{c.d}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 katas-card-rose rounded-xl p-5 flex items-center justify-center gap-3 text-sm text-gray-200 max-w-4xl mx-auto"
      >
        <UserCircle2 className="w-5 h-5 text-pink-300 flex-shrink-0" />
        <ChevronRight className="w-4 h-4 text-pink-400" />
        <Route className="w-5 h-5 text-purple-300 flex-shrink-0" />
        <ChevronRight className="w-4 h-4 text-pink-400" />
        <Heart className="w-5 h-5 text-blue-300 flex-shrink-0" />
        <ChevronRight className="w-4 h-4 text-pink-400" />
        <Lightbulb className="w-5 h-5 text-amber-300 flex-shrink-0" />
        <span className="font-semibold text-white">İçgörü &amp; tasarım kararı</span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  15 · UYGULAMA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · uygulamalı görev</Eyebrow>
      <H2>Kendi personanı ve haritalarını üret</H2>
      <Sub className="mt-3 mb-8 max-w-3xl">
        Geçen haftaki araştırma verinizi (yoksa hazır sağlanan görüşme notlarını)
        kullanarak Figma&apos;da dört adımı tamamlayın. Sonraki derse hazır gelin.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: Search, title: "Veriyi grupla", desc: "Görüşme notlarındaki tekrar eden hedef ve şikayetleri Figma'da yapışkan notlarla kümele.", accent: "#ec4899" },
          { icon: UserCircle2, title: "Bir persona kartı çiz", desc: "İsim, hedef, engel, davranış ve temsil eden bir söz içeren tek sayfalık kart oluştur.", accent: "#a855f7" },
          { icon: Route, title: "5 aşamalı journey", desc: "Personanın hedefe giderken geçtiği 5 aşamayı, temas noktaları ve duygu eğrisiyle çiz.", accent: "#3b82f6" },
          { icon: Heart, title: "Empathy map doldur", desc: "Dört çeyreği (düşünür, duyar, görür, söyler/yapar) en az ikişer maddeyle doldur.", accent: "#10b981" },
        ].map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="katas-card katas-card-hover rounded-xl p-5 flex items-start gap-4"
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
        className="mt-6 katas-card rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <AlertTriangle className="w-4 h-4 text-pink-300 mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Altın kural:</span> Her madde bir veriye
          dayanmalı. &quot;Bence böyledir&quot; değil, &quot;görüşmede şunu
          söyledi&quot;. Veri yoksa, varsayım olduğunu işaretle.
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
          className="inline-flex w-24 h-24 rounded-2xl items-center justify-center mb-8"
          style={{ background: "linear-gradient(135deg, #ec4899, #be185d)", boxShadow: "0 0 60px rgba(236,72,153,0.5)" }}
        >
          <MapIcon className="w-12 h-12 text-white" />
        </motion.div>
        <Eyebrow>3. hafta tamamlandı · sıradaki: Bilgi Mimarisi</Eyebrow>
        <H1>
          <span className="katas-shimmer">İçeriği düzenle, akışı kur</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Kullanıcıyı tanıdık. Hafta 4&apos;te o kullanıcının kafasındaki düzeni
          ekrana taşıyoruz: bilgi mimarisi, kart gruplama (card sorting), site
          haritası ve gezinme yapısı.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
          <FeatureCard icon={Layers} title="Bilgi mimarisi" desc="İçeriği mantıklı gruplara ayırma ve hiyerarşi kurma." accent="#ec4899" delay={0.1} />
          <FeatureCard icon={ClipboardList} title="Card sorting" desc="Kullanıcının zihinsel modeline göre menü oluşturma." accent="#a855f7" delay={0.18} />
          <FeatureCard icon={Compass} title="Site haritası" desc="Sayfalar arası ilişkiyi gösteren genel plan." accent="#3b82f6" delay={0.26} />
          <FeatureCard icon={PenTool} title="Gezinme" desc="Menü, sekme ve bağlantılarla yön bulma." accent="#f59e0b" delay={0.34} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto text-left">
          <div className="katas-card rounded-xl p-5">
            <Calendar className="w-5 h-5 text-[#ec4899] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Ders saati</div>
            <div className="text-white font-semibold">Cuma</div>
            <div className="text-sm text-gray-400">15:20 — 17:00</div>
          </div>
          <div className="katas-card rounded-xl p-5">
            <Target className="w-5 h-5 text-[#a855f7] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Hazırlık</div>
            <div className="text-white font-semibold">Figma + persona</div>
            <div className="text-sm text-gray-400">bu haftanın çıktısını getir</div>
          </div>
          <div className="katas-card rounded-xl p-5">
            <Brain className="w-5 h-5 text-[#3b82f6] mb-3" />
            <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Teslim</div>
            <div className="text-white font-semibold">Persona + journey + map</div>
            <div className="text-sm text-gray-400">3 çıktı, tek Figma dosyası</div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 flex items-center justify-center gap-3 text-xs text-gray-500 font-mono"
        >
          <Globe className="w-3 h-3" />
          <span>BVA 2245 · Kullanıcı Arayüzü Tasarımı · 2026 Bahar · Hafta 03</span>
          <Hash className="w-3 h-3" />
          <GraduationCap className="w-3 h-3" />
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
            background: "linear-gradient(90deg, #ec4899, #f472b6, #ec4899)",
            boxShadow: "0 0 16px rgba(236,72,153,0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 text-[10px] font-mono uppercase tracking-wider">
        <div className="text-[#ec4899]/70">
          BVA 2245 · 3. Hafta · Persona &amp; Journey
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[#ec4899]/50">
            <span className="text-[#ec4899]">
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
            className="p-1.5 text-gray-500 hover:text-[#ec4899] transition-colors"
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
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#ec4899] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
                  ? "w-5 bg-[#ec4899]"
                  : "w-1.5 bg-white/15 hover:bg-white/40"
              }`}
              style={
                i === current
                  ? { boxShadow: "0 0 10px rgba(236,72,153,0.6)" }
                  : undefined
              }
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[#ec4899] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
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
