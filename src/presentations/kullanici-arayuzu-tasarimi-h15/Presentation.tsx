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
  Presentation as PresentationIcon,
  Trophy,
  Eye,
  Sparkles,
  Target,
  Lightbulb,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Keyboard,
  Check,
  Clock,
  Users,
  GraduationCap,
  Briefcase,
  Hash,
  Globe,
  Frame,
  Square,
  Type,
  PenTool,
  MousePointer2,
  Hand,
  Play,
  MessageSquare,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Mic,
  ListChecks,
  FileText,
  Accessibility,
  Smartphone,
  Star,
  ThumbsUp,
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

/* ============================================================
   TOPIC-SPECIFIC MOCKUPS — Final sunum & kritik
   ============================================================ */

/* Sunum süresi/akış zaman çizelgesi: 8 dakikalık sunum nasıl dağıtılır? */
function PitchTimeline() {
  const segments = [
    { label: "Problem & kullanıcı", min: "0–1 dk", color: "#ec4899", icon: Target },
    { label: "Araştırma & persona", min: "1–2 dk", color: "#a855f7", icon: Users },
    { label: "Canlı demo (prototip)", min: "2–5 dk", color: "#3b82f6", icon: Play },
    { label: "Tasarım kararları", min: "5–7 dk", color: "#10b981", icon: PenTool },
    { label: "Sonuç & sorular", min: "7–8 dk", color: "#f59e0b", icon: MessageSquare },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="katas-card rounded-xl p-6 max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-between mb-5 text-xs font-mono uppercase tracking-widest text-gray-400">
        <span className="flex items-center gap-2 text-[#f9a8d4]">
          <Clock className="w-4 h-4" /> Toplam 8 dakika
        </span>
        <span className="text-gray-500">demo en uzun blok</span>
      </div>
      {/* orantılı bar */}
      <div className="flex w-full h-3 rounded-full overflow-hidden mb-6">
        {[12, 12, 38, 25, 13].map((w, i) => (
          <motion.div
            key={i}
            initial={{ width: 0 }}
            animate={{ width: `${w}%` }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
            style={{ background: segments[i].color }}
          />
        ))}
      </div>
      <div className="space-y-3">
        {segments.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="flex items-center gap-4"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${s.color}18`, border: `1px solid ${s.color}55` }}
            >
              <s.icon className="w-4 h-4" style={{ color: s.color }} />
            </div>
            <span className="text-sm text-white font-medium flex-1">{s.label}</span>
            <span className="font-mono text-xs" style={{ color: s.color }}>{s.min}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* Final demo ekranı — Figma prototip oynatıcı çerçevesi */
function PrototypePlayerMockup() {
  return (
    <FigmaFrameMockup title="final-proje.fig — Prototype · Present">
      <div className="flex h-[440px] bg-[#1e1e1e]">
        {/* Sol: akış / flows */}
        <div className="katas-figma-panel w-[190px] flex flex-col border-r border-black/30">
          <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-gray-500 font-semibold border-b border-black/30">
            Flows
          </div>
          <div className="p-2 space-y-0.5 text-[10px]">
            <div className="katas-figma-row katas-figma-row-active">
              <Play className="w-3 h-3" />
              <span className="font-semibold">Onboarding akışı</span>
            </div>
            <div className="katas-figma-row pl-5">
              <Square className="w-3 h-3 text-gray-400" />
              <span>01 · Karşılama</span>
            </div>
            <div className="katas-figma-row pl-5">
              <Square className="w-3 h-3 text-gray-400" />
              <span>02 · Kayıt</span>
            </div>
            <div className="katas-figma-row pl-5">
              <Square className="w-3 h-3 text-gray-400" />
              <span>03 · Ana ekran</span>
            </div>
            <div className="katas-figma-divider" />
            <div className="katas-figma-row">
              <Frame className="w-3 h-3 text-purple-400" />
              <span className="font-semibold">Satın alma akışı</span>
            </div>
            <div className="katas-figma-row pl-5">
              <Square className="w-3 h-3 text-gray-400" />
              <span>04 · Sepet</span>
            </div>
            <div className="katas-figma-row pl-5">
              <Square className="w-3 h-3 text-gray-400" />
              <span>05 · Ödeme</span>
            </div>
            <div className="katas-figma-row pl-5">
              <Square className="w-3 h-3 text-gray-400" />
              <span>06 · Onay</span>
            </div>
          </div>
        </div>
        {/* Orta: canlı demo cihazı */}
        <div className="flex-1 katas-figma-canvas flex items-center justify-center relative">
          <div className="absolute top-2 left-2 text-[9px] text-gray-500 font-mono">
            Presentation mode — R ile baştan
          </div>
          <div className="absolute top-2 right-2 text-[9px] text-pink-400 font-mono flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" /> Canlı
          </div>
          <div className="katas-phone w-[190px] h-[380px] p-2">
            <div className="katas-phone-screen w-full h-full flex flex-col">
              <div className="px-3 py-2">
                <div className="text-[13px] font-bold text-gray-900">Sipariş onayı</div>
                <div className="text-[9px] text-gray-500">2 dakikada teslim</div>
              </div>
              <div className="mx-3 my-2 p-3 rounded-lg" style={{ background: "linear-gradient(135deg, #ec4899, #be185d)" }}>
                <div className="text-[9px] text-white/80">Toplam</div>
                <div className="text-[16px] font-bold text-white mt-0.5">₺248,00</div>
              </div>
              <div className="px-3 space-y-1.5">
                {["Adres seç", "Ödeme yöntemi", "Kupon uygula"].map((r, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 px-2 bg-white rounded shadow-sm">
                    <span className="text-[9px] text-gray-800 font-medium">{r}</span>
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                  </div>
                ))}
              </div>
              <div className="mt-auto p-3">
                <div className="text-center py-2 rounded-lg text-[10px] font-bold text-white" style={{ background: "#111" }}>
                  Siparişi tamamla
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-3 left-3 flex gap-1.5">
            {[MousePointer2, Frame, Play, Hand].map((Ic, i) => (
              <div key={i} className={`w-7 h-7 rounded flex items-center justify-center ${i === 2 ? "bg-pink-500" : "bg-[#2c2c2c]"}`}>
                <Ic className="w-3.5 h-3.5 text-white" />
              </div>
            ))}
          </div>
        </div>
        {/* Sağ: etkileşim detayı */}
        <div className="katas-figma-panel w-[200px] flex flex-col border-l border-black/30">
          <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-gray-500 font-semibold border-b border-black/30">
            Interaction
          </div>
          <div className="p-3 space-y-3 text-[10px]">
            <div>
              <div className="text-gray-500 mb-1">Trigger</div>
              <div className="bg-[#1a1a1a] px-2 py-1 rounded text-gray-300">On tap</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Action</div>
              <div className="bg-pink-500/20 text-pink-300 px-2 py-1.5 rounded flex items-center justify-between">
                <span>Navigate to · 06</span>
                <Check className="w-3 h-3" />
              </div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Animation</div>
              <div className="bg-[#1a1a1a] px-2 py-1 rounded text-gray-300">Smart animate · 300ms</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Easing</div>
              <div className="bg-[#1a1a1a] px-2 py-1 rounded text-gray-300">Ease out</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Overflow</div>
              <div className="bg-[#1a1a1a] px-2 py-1 rounded text-gray-300">Scroll · vertical</div>
            </div>
          </div>
        </div>
      </div>
    </FigmaFrameMockup>
  );
}

/* Kötü vs iyi sunum slaytı — aynı içerik, farklı sunum kalitesi */
function BadVsGoodSlideUI() {
  return (
    <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto">
      {/* Kötü slayt */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="katas-card rounded-xl overflow-hidden"
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border-b border-red-500/30">
          <XCircle className="w-4 h-4 text-red-400" />
          <span className="text-xs font-mono uppercase text-red-300">Kötü slayt · metin duvarı</span>
        </div>
        <div className="bg-white p-5 h-[300px] overflow-hidden">
          <div className="text-[11px] font-bold text-gray-800 mb-2">Projemiz Hakkında Detaylı Bilgilendirme ve Kapsamlı Açıklama</div>
          <div className="space-y-1 text-[8px] text-gray-600 leading-snug">
            {Array.from({ length: 11 }).map((_, i) => (
              <div key={i}>
                • Bu maddede projemizin çok önemli bir özelliğini uzun uzun anlatıyoruz ve ekranda okumak zorunda kalıyorsunuz...
              </div>
            ))}
          </div>
        </div>
        <div className="px-4 py-3 text-[11px] text-gray-400 border-t border-white/5 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
          <span>Dinleyici slaytı okur, seni dinlemez. Küçük yazı, düşük kontrast, görsel yok.</span>
        </div>
      </motion.div>

      {/* İyi slayt */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="katas-card rounded-xl overflow-hidden"
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border-b border-emerald-500/30">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono uppercase text-emerald-300">İyi slayt · tek mesaj</span>
        </div>
        <div className="bg-gradient-to-b from-pink-50 to-white p-6 h-[300px] flex flex-col justify-center items-center text-center">
          <div className="text-[10px] font-mono uppercase tracking-widest text-pink-500 mb-3">Önce / Sonra</div>
          <div className="text-2xl font-black text-gray-900 leading-tight mb-2">
            Ödeme 5 adımdan<br />2 adıma indi
          </div>
          <div className="flex items-center gap-3 mt-3">
            <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-500 text-[11px] font-bold line-through">5 adım</span>
            <ChevronRight className="w-4 h-4 text-pink-500" />
            <span className="px-3 py-1 rounded-full bg-pink-500 text-white text-[11px] font-bold">2 adım</span>
          </div>
        </div>
        <div className="px-4 py-3 text-[11px] text-gray-400 border-t border-white/5 flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
          <span>Bir slayt = bir fikir. Büyük yazı, yüksek kontrast, somut sonuç.</span>
        </div>
      </motion.div>
    </div>
  );
}

/* Kritik konuşma balonu kartı */
function CritiqueBubble({
  icon: Icon,
  label,
  example,
  good,
  delay = 0,
}: {
  icon: LucideIcon;
  label: string;
  example: string;
  good: boolean;
  delay?: number;
}) {
  const accent = good ? "#10b981" : "#f87171";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="katas-critique-bubble p-5"
    >
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: `${accent}18`, border: `1px solid ${accent}55` }}
        >
          <Icon className="w-4 h-4" style={{ color: accent }} />
        </div>
        <span className="text-xs font-mono uppercase tracking-widest" style={{ color: accent }}>
          {label}
        </span>
      </div>
      <p className="text-sm text-gray-200 leading-relaxed italic">&ldquo;{example}&rdquo;</p>
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
        <Eyebrow>BVA 2245 · 15. Hafta · Final &amp; Kritik</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-8xl font-bold tracking-tight leading-[1] mb-6"
        >
          <span className="katas-shimmer">Final Proje</span>
          <br />
          <span className="text-white">Sunumu &amp; Kritiği</span>
        </motion.h1>
        <Sub className="mt-6 max-w-3xl mx-auto">
          Dönem boyu yaptığın işi sunmak da bir tasarımdır. Bu hafta projeni
          anlatmayı, demoyu yönetmeyi ve eleştiriyi okumayı öğreniyoruz.
        </Sub>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 grid grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {[
            { icon: PresentationIcon, name: "Sun", desc: "Hikâyeyi kur, demoyu göster", accent: "#ec4899" },
            { icon: MessageSquare, name: "Eleştir", desc: "Yapıcı kritik ver ve al", accent: "#a855f7" },
            { icon: Trophy, name: "Teslim Et", desc: "Rubric’e göre değerlendirme", accent: "#f59e0b" },
          ].map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="katas-card rounded-xl p-5"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg"
                style={{ background: `${t.accent}1f`, border: `1px solid ${t.accent}55` }}
              >
                <t.icon className="w-7 h-7" style={{ color: t.accent }} />
              </div>
              <div className="text-sm font-bold text-white">{t.name}</div>
              <div className="text-[10px] text-gray-500 mt-1">{t.desc}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-10 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/5 text-xs text-pink-300 font-mono"
        >
          <Sparkles className="w-3 h-3" />
          15. hafta · dönemin kapanışı
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  02 · KÖPRÜ + BU HAFTANIN HEDEFİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Köprü · 14. haftadan 15. haftaya</Eyebrow>
      <H2>14 hafta tasarladık; bu hafta savunuyoruz</H2>
      <Sub className="mt-3 max-w-3xl">
        Geçen hafta tasarım sistemini ve teslim dosyasını derledik. Artık ortada
        çalışan bir prototip var. Bu hafta onu jüriye ve sınıfa anlatmayı,
        eleştiriyi yapıcı biçimde vermeyi ve almayı çalışıyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="katas-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#f9a8d4]">
            <Check className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Elimizde olan</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ec4899] flex-shrink-0" />Persona, senaryo ve kullanıcı akışı.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ec4899] flex-shrink-0" />High-fidelity ekranlar ve bileşen kütüphanesi.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#ec4899] flex-shrink-0" />Tıklanabilir Figma prototipi.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="katas-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-[#c4b5fd]">
            <Target className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Bu haftanın hedefi</span>
          </div>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#a855f7] flex-shrink-0" />8 dakikalık net bir sunum kurgulamak.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#a855f7] flex-shrink-0" />Prototipi canlı, akıcı biçimde göstermek.</li>
            <li className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 text-[#a855f7] flex-shrink-0" />Kritiği yapıcı verip savunmasız almak.</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  03 · DERSİN AKIŞI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu dersin akışı</Eyebrow>
      <H2>Üç durak: anlat → eleştir → değerlendir</H2>
      <Sub className="mt-3 max-w-3xl">
        Önce sunumu kurguluyoruz; sonra kritik kültürünü konuşuyoruz; en sonda
        teslim ölçütlerini ve final laboratuvarını ele alıyoruz.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { range: "01", title: "Sunum & Demo", items: ["Sunum yapısı (story arc)", "Slayt tasarımı", "Canlı prototip demosu"], icon: PresentationIcon, accent: "#ec4899" },
          { range: "02", title: "Kritik Kültürü", items: ["Yapıcı geri bildirim", "Kritiği savunmadan alma", "Akran değerlendirmesi"], icon: MessageSquare, accent: "#a855f7" },
          { range: "03", title: "Teslim & Final", items: ["Değerlendirme rubric’i", "Teslim çıktıları", "Final lab adımları"], icon: Trophy, accent: "#f59e0b" },
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

  /* ─────────────────  04 · BÖLÜM 1 — SUNUM  ───────────────── */
  () => (
    <SectionDivider
      num="1"
      total="3"
      title="Sunum &amp; Demo"
      subtitle="İyi bir tasarımı kötü anlatırsan kaybedersin. Sunum, projenin son arayüzüdür: izleyici senin akışını kullanır."
      bgGradient="linear-gradient(135deg, #ec4899 0%, #be185d 100%)"
      shadow="0 0 60px rgba(236, 72, 153, 0.5)"
      icon={<PresentationIcon className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  05 · SUNUM YAPISI (STORY ARC)  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sunum yapısı · story arc</Eyebrow>
      <H2>Özellik değil, hikâye anlat</H2>
      <Sub className="mt-3 mb-8 max-w-3xl">
        İzleyici önce neden umursaması gerektiğini bilmek ister. Klasik kurgu:
        problemden başla, çözümü göster, sonuçla bitir.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <FeatureCard
          icon={Target}
          title="1 · Bağlam &amp; problem"
          desc="Kullanıcı kim, hangi gerçek sorunu yaşıyor? Bir cümlelik net problem ifadesiyle aç."
          accent="#ec4899"
          delay={0}
        />
        <FeatureCard
          icon={Play}
          title="2 · Çözüm &amp; demo"
          desc="Prototipi göstererek anlat. Anlatımın bel kemiği canlı demodur, ekran görüntüsü değil."
          accent="#a855f7"
          delay={0.1}
        />
        <FeatureCard
          icon={ThumbsUp}
          title="3 · Sonuç &amp; karar"
          desc="Hangi tasarım kararını neden verdin, neyi ölçtün, sırada ne var? Güçlü bir kapanışla bitir."
          accent="#10b981"
          delay={0.2}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="katas-card-rose rounded-xl p-5 flex items-start gap-3 max-w-4xl"
      >
        <Lightbulb className="w-5 h-5 text-pink-300 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-gray-300 leading-relaxed">
          Açılış cümlesini ezberle: <strong className="text-pink-300">&ldquo;[Kullanıcı], [durumda],
          [sorunu] yaşıyor; biz bunu [çözümle] çözüyoruz.&rdquo;</strong> İlk 20 saniyede dikkati
          kazanırsın ya da kaybedersin.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  06 · 8 DAKİKALIK ZAMAN PLANI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Zaman yönetimi · 8 dakika</Eyebrow>
      <H2 className="mb-2">Süreyi tasarla, doğaçlama bırakma</H2>
      <Sub className="max-w-3xl mb-6">
        En sık yapılan hata: ilk slaytlarda zaman harcayıp demoyu yetiştirememek.
        Süreyi bloklara bölersen, demo için yeterli alan kalır.
      </Sub>
      <PitchTimeline />
    </SlideShell>
  ),

  /* ─────────────────  07 · KÖTÜ vs İYİ SLAYT  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Slayt tasarımı · karşılaştırma</Eyebrow>
      <H2 className="mb-2">Slayt sahne dekorudur, senaryo değil</H2>
      <Sub className="mb-6 max-w-3xl">
        Slayt seni desteklemeli, senin yerine konuşmamalı. Aynı bilgi iki
        biçimde: solda metin duvarı, sağda tek net mesaj.
      </Sub>
      <BadVsGoodSlideUI />
    </SlideShell>
  ),

  /* ─────────────────  08 · CANLI DEMO  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Canlı demo · Figma Present</Eyebrow>
      <H2 className="mb-2">Prototipi anlatımın kalbine koy</H2>
      <Sub className="max-w-3xl mb-6">
        Figma&apos;da <span className="font-mono text-pink-300">Present</span> moduyla
        akışı baştan oynat; <span className="font-mono text-pink-300">R</span> tuşu başa
        döndürür. Demo öncesi dosyayı bir kez çevrimdışı test et — internet kesilirse
        diye ekran kaydını da yedek tut.
      </Sub>
      <PrototypePlayerMockup />
    </SlideShell>
  ),

  /* ─────────────────  09 · DEMO KONTROL LİSTESİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Demo · sahne öncesi kontrol</Eyebrow>
      <H2>Demo çökmesin diye 6 madde</H2>
      <Sub className="mt-3 mb-8 max-w-3xl">
        Canlı demo riskini en aza indirmek elinde. Sunumdan önce bu altısını teker
        teker doğrula.
      </Sub>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { i: Play, t: "Akışı baştan dene", d: "Tıkladığın her hotspot çalışıyor mu? Ölü buton bırakma." },
          { i: Smartphone, t: "Doğru cihaz boyutu", d: "Prototip cihaz çerçevesi sunum ekranına sığıyor mu?" },
          { i: FileText, t: "Yedek ekran kaydı", d: "İnternet/uygulama çökerse oynatacağın 60 sn’lik video hazır." },
          { i: Eye, t: "Yakınlık & kontrast", d: "Arkadaki kişi de okuyabiliyor mu? Zoom’u önceden ayarla." },
          { i: MousePointer2, t: "İmleç görünür", d: "Demoda nereye tıkladığın izleyiciye belli olsun." },
          { i: Clock, t: "Demo süresi", d: "Demo 3 dakikayı geçmesin; sadece ana akışı göster." },
        ].map((c, i) => (
          <motion.div
            key={c.t}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="katas-card katas-card-hover rounded-xl p-5"
          >
            <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-3 bg-pink-500/15 border border-pink-500/40">
              <c.i className="w-5 h-5 text-pink-400" />
            </div>
            <div className="text-base font-semibold text-white mb-1">{c.t}</div>
            <div className="text-sm text-gray-400 leading-relaxed">{c.d}</div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  10 · BÖLÜM 2 — KRİTİK  ───────────────── */
  () => (
    <SectionDivider
      num="2"
      total="3"
      title="Kritik Kültürü"
      subtitle="Eleştiri tasarımcının en hızlı öğrenme aracıdır. Önemli olan eleştiriyi kişisel almamak ve yapıcı vermektir."
      bgGradient="linear-gradient(135deg, #a855f7 0%, #ec4899 100%)"
      shadow="0 0 60px rgba(168, 85, 247, 0.5)"
      icon={<MessageSquare className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  11 · YAPICI vs YIKICI KRİTİK  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Geri bildirim · ifade biçimi</Eyebrow>
      <H2 className="mb-2">Aynı sorun, iki farklı söyleyiş</H2>
      <Sub className="max-w-3xl mb-8">
        Yıkıcı kritik kişiyi hedef alır ve yön vermez; yapıcı kritik gözleme
        dayanır, somuttur ve bir öneri içerir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
        <CritiqueBubble
          icon={XCircle}
          label="Yıkıcı · kaçın"
          example="Bu ekran kötü olmuş, hiç beğenmedim."
          good={false}
          delay={0}
        />
        <CritiqueBubble
          icon={CheckCircle2}
          label="Yapıcı · tercih et"
          example="Ödeme butonunu sayfanın altında geç fark ettim; sabit bir alt çubuğa alırsan ilk bakışta görünür olur."
          good
          delay={0.15}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 katas-card rounded-xl p-5 max-w-4xl mx-auto"
      >
        <div className="text-xs font-mono uppercase tracking-widest text-pink-300 mb-2">Formül</div>
        <div className="text-sm text-gray-200 leading-relaxed">
          <strong className="text-white">Gözlem</strong> (ne gördüm) +
          <strong className="text-white"> etki</strong> (kullanıcıya ne yapar) +
          <strong className="text-white"> öneri</strong> (ne denenebilir). Üçü bir arada
          olursa geri bildirim eyleme dönüşür.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  12 · KRİTİĞİ ALMAK  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sunulan tarafı · kritiği almak</Eyebrow>
      <H2>Savunma değil, not al</H2>
      <Sub className="mt-3 mb-8 max-w-3xl">
        Kritik anında ilk dürtü açıklamak ve savunmaktır. Daha iyi bir yol var:
        dinle, not al, sorularla netleştir.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Mic}
          title="Önce dinle"
          desc="Sözünü kesme, hemen savunmaya geçme. Geri bildirim bitene kadar yalnızca dinle."
          accent="#ec4899"
          delay={0}
        />
        <FeatureCard
          icon={ListChecks}
          title="Not al, gruplandır"
          desc="Tüm yorumları yaz. Tekrar eden geri bildirim en yüksek öncelikli sinyaldir."
          accent="#a855f7"
          delay={0.1}
        />
        <FeatureCard
          icon={MessageSquare}
          title="Netleştirici soru sor"
          desc="“Hangi adımda takıldın?” gibi sorularla yorumu eyleme çevrilebilir hale getir."
          accent="#10b981"
          delay={0.2}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 katas-card-rose rounded-lg px-4 py-3 text-sm text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <Lightbulb className="w-4 h-4 text-pink-300 mt-0.5 flex-shrink-0" />
        <span>
          Her geri bildirimi uygulamak zorunda değilsin. Görevin onu
          <span className="text-white"> anlamak</span>; hangisini hayata geçireceğine
          kullanıcı verisi ve hedeflerine göre sen karar verirsin.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  13 · BÖLÜM 3 — TESLİM & FİNAL  ───────────────── */
  () => (
    <SectionDivider
      num="3"
      total="3"
      title="Teslim &amp; Değerlendirme"
      subtitle="Notun nereden geliyor? Şeffaf bir rubric ve net teslim çıktıları, sürprizi ortadan kaldırır."
      bgGradient="linear-gradient(135deg, #f472b6 0%, #a855f7 100%)"
      shadow="0 0 60px rgba(244, 114, 182, 0.5)"
      icon={<Trophy className="w-14 h-14 text-white" />}
    />
  ),

  /* ─────────────────  14 · DEĞERLENDİRME RUBRIC’İ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Final proje · değerlendirme ölçütleri</Eyebrow>
      <H2>Notun beş başlıkta dağılır</H2>
      <Sub className="mt-3 max-w-3xl">
        Aşağıdaki ağırlıklar derse özeldir; ayrıntılar ödev yönergesinde. Her
        başlık için kendine puan verip eksiğini önceden gör.
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
              <th style={{ width: "26%" }}>Ölçüt</th>
              <th style={{ width: "12%" }}>Ağırlık</th>
              <th>Ne aranıyor?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white font-semibold">Kullanıcı odağı</td>
              <td><span className="font-mono text-[#f9a8d4]">%20</span></td>
              <td>Persona, gerçek bir problem ve onu çözen net senaryo.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Tasarım kalitesi</td>
              <td><span className="font-mono text-[#f9a8d4]">%25</span></td>
              <td>Hiyerarşi, tipografi, renk, tutarlı bileşen sistemi.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Prototip &amp; etkileşim</td>
              <td><span className="font-mono text-[#f9a8d4]">%20</span></td>
              <td>Akışın baştan sona tıklanabilir ve mantıklı olması.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Erişilebilirlik</td>
              <td><span className="font-mono text-[#f9a8d4]">%15</span></td>
              <td>Yeterli kontrast (WCAG AA), dokunma hedefi, alt metin.</td>
            </tr>
            <tr>
              <td className="text-white font-semibold">Sunum &amp; savunma</td>
              <td><span className="font-mono text-[#f9a8d4]">%20</span></td>
              <td>Net anlatım, süreye uyum, soruları karşılayabilme.</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-[11px] text-gray-500 font-mono"
      >
        Ağırlıklar örnek bir dağılımdır · kesin değerler ders yönergesindeki rubric’te.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  15 · TESLİM ÇIKTILARI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Teslim paketi · ne yükleniyor?</Eyebrow>
      <H2>Dört çıktı, tek klasör</H2>
      <Sub className="mt-3 mb-8 max-w-3xl">
        Sunum günü dört çıktının da hazır olması gerekiyor. Eksik teslim, ölçütün
        ilgili başlığından puan kaybettirir.
      </Sub>
      <div className="grid grid-cols-2 gap-4">
        {[
          { i: Frame, t: "Figma dosyası (paylaşım linki)", d: "Görüntüleme izni açık; ekranlar, bileşen kütüphanesi ve prototip aynı dosyada.", tag: "link" },
          { i: Play, t: "Tıklanabilir prototip", d: "Ana akış baştan sona oynatılabilir; en az bir alternatif/yan akış içerir.", tag: "demo" },
          { i: FileText, t: "Kısa süreç dökümanı (PDF)", d: "Problem, persona, araştırma özeti ve tasarım kararları 2–3 sayfada.", tag: "pdf" },
          { i: Type, t: "Sunum slaytları", d: "8 dakikalık anlatımın slaytları; son slaytta proje linki ve ekip.", tag: "slides" },
        ].map((task, i) => (
          <motion.div
            key={task.t}
            initial={{ opacity: 0, x: i % 2 === 0 ? -10 : 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="katas-card katas-card-hover rounded-xl p-5 flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center bg-pink-500/15 border border-pink-500/40">
              <task.i className="w-6 h-6 text-pink-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1 gap-2">
                <div className="text-base font-semibold text-white">{task.t}</div>
                <div className="text-[10px] font-mono text-pink-300 bg-pink-500/10 px-2 py-0.5 rounded">
                  {task.tag}
                </div>
              </div>
              <div className="text-sm text-gray-400 leading-relaxed">{task.d}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  ),

  /* ─────────────────  16 · FİNAL LAB · BU HAFTA YAPILACAK  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta · final lab (uygulamalı)</Eyebrow>
      <H2>Sunum gününe hazırlık: dört adım</H2>
      <Sub className="mt-3 max-w-3xl">
        Bu hafta yeni tasarım yapmıyoruz; var olanı sunulabilir hale getiriyoruz.
        Aşağıdaki dördünü tamamlayıp prova yapmış gelmen bekleniyor.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Accessibility, title: "Erişilebilirlik geçişi yap", desc: "Tüm metin/arka plan kontrastını WCAG AA (≥ 4.5:1) için kontrol et; dokunma hedefleri en az 44×44 px olsun.", accent: "#ec4899" },
          { icon: Play, title: "Prototip akışını kilitle", desc: "Ana akışı baştan sona tıklayarak dene; ölü buton ve kopuk geçiş bırakma.", accent: "#a855f7" },
          { icon: Type, title: "8 slaytlık sunum kur", desc: "Problem → demo → sonuç yapısında, her slayt tek mesaj; açılış cümleni yaz.", accent: "#10b981" },
          { icon: Mic, title: "Süreli prova yap", desc: "Telefonu kronometreye al, baştan sona 8 dakikada anlat; demo 3 dk’yı geçmesin.", accent: "#f59e0b" },
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
        className="mt-6 katas-card-rose rounded-lg px-4 py-3 text-xs text-gray-300 flex items-start gap-3 max-w-4xl"
      >
        <AlertTriangle className="w-4 h-4 text-pink-300 mt-0.5 flex-shrink-0" />
        <span>
          <span className="text-white">Prova şart.</span> En sık not kaybı sebebi süreyi
          aşmak veya demoda takılmaktır; ikisi de yalnızca provayla çözülür.
        </span>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  17 · AKRAN DEĞERLENDİRMESİ  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sunum günü · akran değerlendirmesi</Eyebrow>
      <H2>Arkadaşını da puanlayacaksın</H2>
      <Sub className="mt-3 mb-8 max-w-3xl">
        Her sunum sonrası kısa bir akran kartı dolduracaksın. Amaç not vermek değil,
        yapıcı kritik pratiği kazanmak.
      </Sub>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={Star}
          title="1 güçlü yön"
          desc="Bu projede en iyi çalışan şey neydi? Somut ol — “renkler güzel” değil, “durum mesajları çok net”."
          accent="#ec4899"
          delay={0}
        />
        <FeatureCard
          icon={Target}
          title="1 geliştirilebilir nokta"
          desc="Gözlem + etki + öneri formülüyle tek bir iyileştirme yaz."
          accent="#a855f7"
          delay={0.1}
        />
        <FeatureCard
          icon={MessageSquare}
          title="1 soru"
          desc="Merak ettiğin bir tasarım kararını sor; tasarımcıyı düşündüren soru en değerli geri bildirimdir."
          accent="#10b981"
          delay={0.2}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-center text-sm text-gray-500 max-w-2xl mx-auto"
      >
        Kural: kişiyi değil işi konuş. &ldquo;Sen&rdquo; yerine &ldquo;ekran&rdquo;, &ldquo;akış&rdquo;, &ldquo;buton&rdquo; de.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  18 · KAPANIŞ + SIRADAKİ ADIM  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex w-24 h-24 rounded-3xl bg-gradient-to-br from-pink-500 to-rose-700 items-center justify-center mb-8 shadow-2xl shadow-pink-500/40"
        >
          <Trophy className="w-12 h-12 text-white" />
        </motion.div>

        <Eyebrow>15. hafta tamamlandı · dönem kapanışı</Eyebrow>
        <H1 className="mb-4">
          <span className="katas-shimmer">Ekrandan deneyime</span>
        </H1>
        <Sub className="max-w-2xl mx-auto mb-10">
          Bir yılda araştırmadan wireframe’e, bileşen sisteminden tıklanabilir
          prototipe geldik. Bu hafta onu savunuyorsun — ve portföyüne ilk gerçek
          vaka çalışmanı ekliyorsun.
        </Sub>

        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { i: Clock, l: "Sunum oturumu", v: "Cuma · 15:20 — 17:00" },
            { i: GraduationCap, l: "Konum", v: "EnerjiSA Bil. Lab 1" },
            { i: Briefcase, l: "Ders kodu", v: "BVA 2245" },
          ].map((info, i) => (
            <motion.div
              key={info.l}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="katas-card rounded-xl p-5"
            >
              <info.i className="w-5 h-5 text-pink-400 mb-3 mx-auto" />
              <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1">
                {info.l}
              </div>
              <div className="text-sm font-semibold text-white">{info.v}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10 flex items-center justify-center gap-3 text-xs text-gray-500 font-mono"
        >
          <Globe className="w-3 h-3" />
          <span>BVA 2245 · Kullanıcı Arayüzü Tasarımı · Hafta 15 · Final</span>
          <Hash className="w-3 h-3" />
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
          BVA 2245 · 15. Hafta · Final Proje Sunumu &amp; Kritik
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
