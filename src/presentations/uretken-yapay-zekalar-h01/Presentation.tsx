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
  Quote,
  Check,
  Wand2,
  Zap,
  Hash,
  Globe,
  GraduationCap,
  Target,
  Lightbulb,
  Users,
  Briefcase,
  BarChart3,
  TrendingUp,
  Database,
  MessageSquare,
  Edit3,
  Palette,
  Bot,
  Cpu,
  Image as ImageIcon,
  Layout,
  Code2,
  Music,
  Video,
  Film,
  ShieldAlert,
  Scale,
  BookOpen,
  Calendar,
  ListChecks,
  Rocket,
  Network,
  Layers,
  Eye,
  Mic,
  Pencil,
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

function QuoteSlide({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <SlideShell>
      <div className="text-center max-w-4xl mx-auto">
        <Quote className="w-16 h-16 mx-auto mb-8" style={{ color: `${ACCENT}66` }} />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-light text-white leading-snug"
        >
          &ldquo;{quote}&rdquo;
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10"
        >
          <div className="text-lg font-semibold" style={{ color: ACCENT_SOFT }}>{author}</div>
          <div className="text-sm text-gray-500 mt-1">{role}</div>
        </motion.div>
      </div>
    </SlideShell>
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

function PromptDemo({
  title = "ChatGPT-5 · Manisa Demo",
  userMessage,
  aiHeader,
  bullets,
  warning,
  showTyping = false,
}: {
  title?: string;
  userMessage: string;
  aiHeader?: string;
  bullets?: string[];
  warning?: string;
  showTyping?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
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
          <span className="w-5 h-5 rounded-sm uyz-ai-tile flex items-center justify-center text-[11px]">
            <Sparkles className="w-3 h-3" />
          </span>
          <span>{title}</span>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-4 min-h-[280px]" style={{ background: "#0a0414" }}>
        {/* User bubble — right */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex justify-end"
        >
          <div className="uyz-bubble-user px-5 py-3 max-w-[70%] text-sm">
            {userMessage}
          </div>
        </motion.div>

        {/* AI bubble — left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="flex justify-start"
        >
          <div className="uyz-bubble-ai px-5 py-4 max-w-[80%] text-sm space-y-2">
            {aiHeader && (
              <div className="text-xs font-mono uppercase tracking-wider" style={{ color: ACCENT_SOFT }}>
                {aiHeader}
              </div>
            )}
            {showTyping && (
              <div className="flex items-center gap-1.5 py-1">
                <span className="uyz-typing-dot" />
                <span className="uyz-typing-dot" />
                <span className="uyz-typing-dot" />
              </div>
            )}
            {bullets && (
              <ul className="space-y-2 text-gray-200">
                {bullets.map((b, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 1.0 + i * 0.25 }}
                    className="flex gap-2"
                  >
                    <span className="text-violet-400 font-semibold">{i + 1}.</span>
                    <span>{b}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      </div>

      {warning && (
        <div className="uyz-warn-row px-5 py-3 flex items-center gap-2 text-xs">
          <AlertTriangle className="w-4 h-4" />
          <span>{warning}</span>
        </div>
      )}
    </motion.div>
  );
}

function TokenBox({
  tokens,
}: {
  tokens: Array<{ text: string; tone: 1 | 2 | 3 | 4 | 5 }>;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 justify-center">
      {tokens.map((t, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 + i * 0.15 }}
          className={`uyz-token uyz-token-${t.tone}`}
        >
          {t.text}
        </motion.span>
      ))}
    </div>
  );
}

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
            className={`w-32 text-right font-mono text-sm ${
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
  /* ─────────────────  1 · COVER  ───────────────── */
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>BVA 1203 · 1. Hafta</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.02]"
        >
          <span className="uyz-shimmer">Üretken Yapay</span>
          <br />
          <span className="uyz-shimmer">Zekalar</span>
        </motion.h1>
        <Sub className="mt-8 max-w-2xl mx-auto">
          Promptla üreten, yorumlayan, yaratan makineler.
          <br />
          <span className="text-gray-500 text-base">Bir dönem boyunca makinelerin nasıl &ldquo;hayal kurduğunu&rdquo; öğreneceğiz.</span>
        </Sub>

        <div className="grid grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="uyz-card rounded-xl p-5 text-center"
          >
            <div className="w-12 h-12 rounded-xl mx-auto mb-3 uyz-brand-openai flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="text-white font-semibold text-sm">ChatGPT</div>
            <div className="text-[10px] text-gray-500 font-mono mt-1">OpenAI</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="uyz-card rounded-xl p-5 text-center"
          >
            <div className="w-12 h-12 rounded-xl mx-auto mb-3 uyz-brand-anthropic flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="text-white font-semibold text-sm">Claude</div>
            <div className="text-[10px] text-gray-500 font-mono mt-1">Anthropic</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="uyz-card rounded-xl p-5 text-center"
          >
            <div className="w-12 h-12 rounded-xl mx-auto mb-3 uyz-brand-google flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="text-white font-semibold text-sm">Gemini</div>
            <div className="text-[10px] text-gray-500 font-mono mt-1">Google</div>
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

  /* ─────────────────  2 · 15 HAFTA HARİTASI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>BVA 1203 · Dönem Haritası</Eyebrow>
      <H2>Bu dönem ne öğreneceğiz?</H2>
      <Sub className="mt-3 mb-8">
        15 haftada üretken yapay zekânın temellerinden, üretken modellerin
        mimarisine ve etik tartışmalara kadar uçtan uca bir yolculuk.
      </Sub>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
        {[
          { n: 1, t: "Giriş & Genel Bakış", icon: Sparkles, here: true },
          { n: 2, t: "Olasılık & Temeller", icon: BarChart3 },
          { n: 3, t: "Sinir Ağları 101", icon: Network },
          { n: 4, t: "Autoencoder & VAE", icon: Layers },
          { n: 5, t: "GAN Mimarileri", icon: Zap },
          { n: 6, t: "Diffusion Modeller", icon: Wand2 },
          { n: 7, t: "Ara Sınav", icon: GraduationCap },
          { n: 8, t: "RNN → Transformer", icon: Cpu },
          { n: 9, t: "Büyük Dil Modelleri", icon: MessageSquare },
          { n: 10, t: "Prompt Mühendisliği", icon: Edit3 },
          { n: 11, t: "Görsel Üretim", icon: ImageIcon },
          { n: 12, t: "Ses & Müzik", icon: Music },
          { n: 13, t: "Video Üretimi", icon: Video },
          { n: 14, t: "Etik · Telif · Bias", icon: Scale },
          { n: 15, t: "Final Proje", icon: Rocket },
        ].map((w, i) => (
          <motion.div
            key={w.n}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.05 + i * 0.04 }}
            className={`rounded-lg p-3 text-center ${
              w.here ? "uyz-card-violet" : "uyz-card"
            }`}
            style={
              w.here
                ? { boxShadow: "0 0 24px rgba(168,85,247,0.35)" }
                : undefined
            }
          >
            <div
              className="text-[9px] font-mono uppercase mb-1"
              style={{ color: w.here ? "#fff" : "#6b7280" }}
            >
              Hafta {String(w.n).padStart(2, "0")}
            </div>
            <w.icon
              className="w-5 h-5 mx-auto mb-1.5"
              style={{ color: w.here ? "#fff" : ACCENT_SOFT, opacity: w.here ? 1 : 0.7 }}
            />
            <div
              className={`text-[11px] leading-tight ${
                w.here ? "text-white font-semibold" : "text-gray-400"
              }`}
            >
              {w.t}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-6 text-center text-xs text-gray-500"
      >
        Bugün buradayız <span style={{ color: ACCENT_SOFT }}>●</span> — temelleri konuşacağız, başka hiçbir şey beklenmiyor.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  3 · STATS  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Neden şimdi konuşuyoruz?</Eyebrow>
      <H2>Üretken YZ rakamlarla.</H2>
      <Sub className="mt-3 mb-10">
        Bir dönem önce &ldquo;teknoloji haberi&rdquo; idi — bugün okula, işe, sanata
        sızmış durumda. Birkaç sayı bunu özetliyor.
      </Sub>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          value="100M"
          label="ChatGPT'nin yalnızca 2 ayda ulaştığı kullanıcı sayısı"
          source="UBS / Reuters, 2023"
          delay={0.1}
        />
        <StatCard
          icon={Database}
          value="175B"
          label="GPT-3 modelinin parametre sayısı"
          source="OpenAI, 2020"
          delay={0.2}
        />
        <StatCard
          icon={Film}
          value="9 ay"
          label="Sora duyurusundan kamuya açık kullanıma kadar geçen süre"
          source="OpenAI, 2024"
          delay={0.3}
        />
        <StatCard
          icon={TrendingUp}
          value="$200B"
          label="2030 üretken YZ pazar büyüklüğü tahmini"
          source="Bloomberg Intelligence, 2024"
          delay={0.4}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-8 text-center text-sm text-gray-500"
      >
        Tek ortak nokta: <span className="text-white">hız</span>. Geçmişin
        on yıllarına sığan değişim, şimdi aylara sığıyor.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  4 · QUOTE  ───────────────── */
  () => (
    <QuoteSlide
      quote="Yapay zekâ yeni elektriktir. Tıpkı elektriğin 100 yıl önce neredeyse her endüstriyi dönüştürmesi gibi, yapay zekâ da bunu yapacak."
      author="Andrew Ng"
      role="Stanford · Coursera kurucu ortağı"
    />
  ),

  /* ─────────────────  5 · DIVIDER 1/3  ───────────────── */
  () => (
    <SectionDivider
      num="01"
      total="03"
      title="Nedir?"
      subtitle="Önce kavramı netleştirelim: üretken YZ, sınıflandıran YZ'den ne ile ayrılır, neyi üretebilir?"
      bgGradient="linear-gradient(135deg, #a855f7 0%, #6d28d9 100%)"
      shadow="0 0 80px rgba(168, 85, 247, 0.55)"
      icon={<Sparkles className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  6 · GELENEKSEL vs ÜRETKEN  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Kavram</Eyebrow>
      <H2>Geleneksel YZ vs Üretken YZ</H2>
      <Sub className="mt-3 mb-10">
        Her ikisi de &ldquo;yapay zekâ&rdquo; başlığı altında ama yaptıkları iş
        birbirinden çok farklı.
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
              style={{ background: "#3b82f622", border: "1px solid #3b82f655" }}
            >
              <Target className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Geleneksel (Ayırt edici)</h3>
          </div>
          <p className="text-sm text-gray-400 mb-5 leading-relaxed">
            Veri içinden <span className="text-white">örüntü tanıyıp etiketler</span>.
            Karar verir, sınıflar, tahmin eder.
          </p>
          <div className="space-y-2 text-sm">
            {[
              "Spam / spam değil",
              "Kedi / köpek görseli",
              "Hastalık var / yok",
              "Bu müşteri kredi alır mı?",
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-300">
                <Check className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="uyz-card-violet rounded-2xl p-7"
          style={{ boxShadow: "0 0 40px rgba(168,85,247,0.2)" }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: `${ACCENT}22`, border: `1px solid ${ACCENT}66` }}
            >
              <Wand2 className="w-6 h-6" style={{ color: ACCENT_SOFT }} />
            </div>
            <h3 className="text-xl font-semibold text-white">Üretken</h3>
          </div>
          <p className="text-sm text-gray-400 mb-5 leading-relaxed">
            Veriden öğrendiklerinden <span className="text-white">yeni örnekler üretir</span>.
            Yazar, çizer, besteler, kod döker.
          </p>
          <div className="space-y-2 text-sm">
            {[
              "Bir blog yazısı oluştur",
              "Açıklamadan görsel üret",
              "Senaryodan video üret",
              "Sesi başka bir sese çevir",
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-300">
                <Sparkles className="w-4 h-4 shrink-0" style={{ color: ACCENT_SOFT }} />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-6 text-center text-sm text-gray-500"
      >
        Tek cümleyle: <span className="text-white">&ldquo;Bu nedir?&rdquo;</span> sorusu yerine
        <span className="text-white"> &ldquo;Bunu üretebilir misin?&rdquo;</span> sorusu sorulur.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  7 · MODALİTELER  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Ne üretiyor?</Eyebrow>
      <H2>Dört modalite, dört dil.</H2>
      <Sub className="mt-3 mb-10">
        Üretken YZ tek bir &ldquo;şey&rdquo; üretmiyor — metinden videoya,
        her duyu için farklı bir model ailesi var.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FeatureCard
          icon={MessageSquare}
          title="Metin"
          desc="LLM'ler hikâye, kod, özet, e-posta üretir. Örnek: ChatGPT, Claude, Gemini."
          delay={0.15}
          accent="#a855f7"
        />
        <FeatureCard
          icon={ImageIcon}
          title="Görsel"
          desc="Diffusion modeller cümleden görüntü üretir. Örnek: Midjourney, DALL·E 3, Stable Diffusion."
          delay={0.3}
          accent="#ec4899"
        />
        <FeatureCard
          icon={Music}
          title="Ses"
          desc="Konuşma sentezi ve müzik üretimi. Örnek: ElevenLabs, Suno, Udio."
          delay={0.45}
          accent="#3b82f6"
        />
        <FeatureCard
          icon={Video}
          title="Video"
          desc="Cümleden hareketli görüntü üretir. Örnek: Sora, Runway Gen-3, Veo."
          delay={0.6}
          accent="#22c55e"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-8 uyz-card rounded-xl p-5 flex items-center gap-4"
      >
        <Layers className="w-8 h-8 shrink-0" style={{ color: ACCENT_SOFT }} />
        <div className="text-sm text-gray-400">
          <span className="text-white font-semibold">Çok modlu (multimodal):</span>{" "}
          Bir model artık aynı anda hem metin hem görsel anlayabiliyor, hatta
          ses dinleyip cevap verebiliyor. GPT-5, Claude Opus 4.5, Gemini 3 bunun örnekleri.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  8 · PROMPT DEMO  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Demo · Metinden Metne</Eyebrow>
      <H2>Bir prompt, bir cevap.</H2>
      <Sub className="mt-3 mb-8">
        Üretken YZ ile etkileşimin %90'ı bu — yazıyorsun, modeli bekliyorsun,
        cevabı süzgeçten geçiriyorsun.
      </Sub>

      <PromptDemo
        title="ChatGPT-5 · Manisa Demo"
        userMessage="Manisa hakkında 3 ilginç bilgi yaz."
        aiHeader="Yanıt"
        showTyping={true}
        bullets={[
          "Mesir Macunu, 1539'da Sultan Hafsa Sultan için hazırlandı ve hâlâ her nisan ayında Sultan Camii'nden halka saçılır.",
          "Spil Dağı'ndaki &ldquo;Ağlayan Kaya&rdquo; (Niobe), mitolojide çocukları için ağlayan bir annenin taş kesilmiş hâlidir.",
          "Manisa Üzümü (Sultaniye), Türkiye'nin çekirdeksiz üzüm ihracatının yaklaşık %75'ini karşılar.",
        ]}
        warning="Bu cevabı doğrula — modeller emin görünür ama yanılabilir."
      />
    </SlideShell>
  ),

  /* ─────────────────  9 · TEXT-TO-IMAGE DEMO  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Demo · Metinden Görüntüye</Eyebrow>
      <H2>Bir cümleden görsel.</H2>
      <Sub className="mt-3 mb-8">
        Sol tarafta yazıyorsun. Sağ tarafta — saniyeler içinde — daha önce
        var olmayan bir görüntü ortaya çıkıyor.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="uyz-card rounded-2xl p-6 flex flex-col"
        >
          <div className="flex items-center gap-2 mb-4">
            <Pencil className="w-5 h-5" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs font-mono uppercase tracking-wider text-gray-500">
              Prompt
            </div>
          </div>
          <div
            className="rounded-lg p-4 font-mono text-sm text-gray-200 leading-relaxed flex-1"
            style={{ background: "#0d0314", border: "1px solid rgba(168,85,247,0.2)" }}
          >
            <span style={{ color: ACCENT_SOFT }}>&gt;</span> Mor gökyüzü altında
            futuristik bir Manisa şehri, Spil Dağı arka planda, sinematik
            aydınlatma, geniş açı, 35mm film grain.
          </div>
          <div className="mt-4 flex gap-2 text-[10px] font-mono">
            <span
              className="px-2 py-1 rounded"
              style={{ background: `${ACCENT}22`, color: ACCENT_SOFT }}
            >
              model: midjourney v7
            </span>
            <span
              className="px-2 py-1 rounded"
              style={{ background: "#ffffff10", color: "#9ca3af" }}
            >
              ar: 16:9
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="rounded-2xl uyz-ai-canvas relative min-h-[280px] flex items-end"
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
            <div className="text-xs font-mono opacity-70 uppercase tracking-wider">
              Çıktı · 1280×720
            </div>
            <div className="text-sm opacity-80 mt-1">
              Daha önce kimsenin görmediği bir Manisa.
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  10 · DIVIDER 2/3  ───────────────── */
  () => (
    <SectionDivider
      num="02"
      total="03"
      title="Nasıl Çalışır?"
      subtitle="Sihir yok — token, olasılık ve devasa veri var. Şimdi kaputu kaldırıyoruz."
      bgGradient="linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%)"
      shadow="0 0 80px rgba(109, 40, 217, 0.6)"
      icon={<Brain className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  11 · TOKEN  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Temel kavram · 1/3</Eyebrow>
      <H2>Model harf değil, token görür.</H2>
      <Sub className="mt-3 mb-10">
        LLM'ler yazıyı küçük parçalara — &ldquo;token&rdquo;lara — böler. Bir
        token bazen bir kelime, bazen bir hece, bazen bir noktalama olabilir.
      </Sub>

      <div className="space-y-8">
        <div className="text-center">
          <div className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-3">
            Sen yazdın
          </div>
          <div
            className="inline-block px-6 py-3 rounded-xl font-mono text-2xl text-white"
            style={{ background: "#0d0314", border: "1px solid rgba(168,85,247,0.25)" }}
          >
            &ldquo;Merhaba Dünya, üretken yapay zekâya hoş geldin!&rdquo;
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center text-gray-600"
        >
          <span className="text-3xl">↓</span>
        </motion.div>

        <div className="text-center">
          <div className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: ACCENT_SOFT }}>
            Model bunu görüyor
          </div>
          <TokenBox
            tokens={[
              { text: "Merhaba", tone: 1 },
              { text: "Dün", tone: 2 },
              { text: "ya", tone: 3 },
              { text: ",", tone: 4 },
              { text: "üret", tone: 5 },
              { text: "ken", tone: 1 },
              { text: "yapay", tone: 2 },
              { text: "zek", tone: 3 },
              { text: "â", tone: 4 },
              { text: "ya", tone: 3 },
              { text: "hoş", tone: 5 },
              { text: "geldin", tone: 1 },
              { text: "!", tone: 2 },
            ]}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.8 }}
          className="uyz-card rounded-xl p-4 max-w-3xl mx-auto flex items-center gap-3"
        >
          <Hash className="w-5 h-5 shrink-0" style={{ color: ACCENT_SOFT }} />
          <div className="text-sm text-gray-400">
            Türkçe sözcükler İngilizce'den daha çok token'a bölünür — bu yüzden
            Türkçe ile aynı işi yapmak <span className="text-white">bazen 2-3 kat daha pahalı</span> olur.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  12 · OLASILIK DANSI  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Temel kavram · 2/3</Eyebrow>
      <H2>Bir LLM aslında bir kumarbaz.</H2>
      <Sub className="mt-3 mb-10">
        Her token üretirken &ldquo;bundan sonra hangi kelime en olası?&rdquo;
        sorusunu cevaplar. Cümleyi kelime kelime bahse girerek tamamlar.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-3">
            Modelin gördüğü
          </div>
          <div
            className="rounded-xl p-6 text-2xl md:text-3xl text-white leading-relaxed"
            style={{ background: "#0d0314", border: "1px solid rgba(168,85,247,0.25)" }}
          >
            &ldquo;Bir varmış, bir{" "}
            <span className="uyz-blank">________</span>
            &rdquo;
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Model sözlüğündeki <span className="text-white">~100.000 olası token</span>{" "}
            için bir olasılık hesaplar. En yüksek 4'ü:
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="uyz-card rounded-xl p-6"
        >
          <div className="text-xs font-mono uppercase tracking-wider mb-4" style={{ color: ACCENT_SOFT }}>
            Tahminler
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
            Sıcaklık (temperature) düşükse hep en olası kelime seçilir;
            yüksekse modelin &ldquo;hayalgücü&rdquo; artar.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  13 · PIPELINE  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Temel kavram · 3/3</Eyebrow>
      <H2>Veri → Eğitim → Çıkarım.</H2>
      <Sub className="mt-3 mb-10">
        Bir LLM'in hayatı üç aşamadan ibaret. Birinde milyarlarca cümle
        görür, birinde milyarlarca kez tahmin yapıp düzeltilir, birinde de
        sana cevap verir.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
        {[
          {
            n: "01",
            icon: Database,
            title: "Eğitim Verisi",
            desc: "İnternetin büyük kısmı, kitaplar, kod depoları, makaleler. Yüzlerce milyar token.",
            stat: "~15 TB metin",
            accent: "#a855f7",
          },
          {
            n: "02",
            icon: Cpu,
            title: "Eğitim (Pre-training)",
            desc: "Model haftalarca binlerce GPU üzerinde &ldquo;sonraki token'ı tahmin et&rdquo; oyunu oynar.",
            stat: "haftalar · milyon $",
            accent: "#ec4899",
          },
          {
            n: "03",
            icon: MessageSquare,
            title: "Çıkarım (Inference)",
            desc: "Sen yazıyorsun, model cevap veriyor. Eğitim biter, kullanım başlar.",
            stat: "milisaniyeler",
            accent: "#22c55e",
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
              style={{
                background: step.accent,
                color: "#fff",
                boxShadow: `0 0 20px ${step.accent}55`,
              }}
            >
              {step.n}
            </div>
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 mt-2"
              style={{
                background: `${step.accent}1f`,
                border: `1px solid ${step.accent}55`,
              }}
            >
              <step.icon className="w-6 h-6" style={{ color: step.accent }} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">{step.desc}</p>
            <div
              className="text-[10px] font-mono px-2 py-1 rounded inline-block"
              style={{ background: `${step.accent}15`, color: step.accent }}
            >
              {step.stat}
            </div>

            {i < 2 && (
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
        Eğitim bittikten sonra model <span className="text-white">öğrenmeye devam etmez</span> —
        bilgisi belirli bir tarihte donar (knowledge cutoff).
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  14 · DIVIDER 3/3  ───────────────── */
  () => (
    <SectionDivider
      num="03"
      total="03"
      title="Sınırlar ve Etik"
      subtitle="Üretken YZ büyülü değil — yanılabilir, önyargılı olabilir, başkalarının emeğinden beslenmiş olabilir."
      bgGradient="linear-gradient(135deg, #f59e0b 0%, #b45309 100%)"
      shadow="0 0 80px rgba(245, 158, 11, 0.55)"
      icon={<AlertTriangle className="w-16 h-16 text-white" />}
    />
  ),

  /* ─────────────────  15 · HALÜSİNASYON  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sınır · 1/3</Eyebrow>
      <H2>Halüsinasyon: emin görünen yalan.</H2>
      <Sub className="mt-3 mb-8">
        Model, gerçek olmayan bir bilgiyi <span className="text-white">aynı özgüvenle</span>{" "}
        söyleyebilir. Çünkü temel görevi &ldquo;doğru&rdquo; değil, &ldquo;olası&rdquo; cümle üretmek.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
        <div className="md:col-span-3">
          <PromptDemo
            title="ChatGPT · Yanlış Örnek"
            userMessage="Atatürk'ün YouTube kanalı var mıydı?"
            aiHeader="Yanıt (HATALI)"
            bullets={[
              "Evet, Mustafa Kemal Atatürk'ün resmî YouTube kanalı vardı; nutuklarının orijinal kayıtlarını paylaşırdı ve 1937'de 1 milyon aboneye ulaştı.",
            ]}
            warning="Halüsinasyon — Atatürk 1938'de vefat etti, YouTube 2005'te kuruldu."
          />
        </div>

        <div className="md:col-span-2 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="uyz-card rounded-xl p-4"
          >
            <div className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: ACCENT_SOFT }}>
              Neden olur?
            </div>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex gap-2">
                <span style={{ color: ACCENT_SOFT }}>·</span>
                Model, eksik bilgi yerine en &ldquo;olası&rdquo; cümleyi üretir.
              </li>
              <li className="flex gap-2">
                <span style={{ color: ACCENT_SOFT }}>·</span>
                Eğitim verisinde olmayan konuyu &ldquo;uydurarak&rdquo; doldurur.
              </li>
              <li className="flex gap-2">
                <span style={{ color: ACCENT_SOFT }}>·</span>
                Cevap vermemek yerine cevap vermeyi öğrenmiştir.
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="rounded-xl p-4"
            style={{
              background: "rgba(245, 158, 11, 0.08)",
              border: "1px solid rgba(245, 158, 11, 0.25)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <div className="text-xs font-mono uppercase tracking-wider text-amber-400">
                Kural
              </div>
            </div>
            <div className="text-sm text-gray-300">
              Önemli her bilgi — tarih, isim, alıntı, sayı — <span className="text-white">ikinci bir kaynaktan</span> doğrulanmalı.
            </div>
          </motion.div>
        </div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  16 · BIAS  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sınır · 2/3</Eyebrow>
      <H2>Önyargı: model, verisinin aynasıdır.</H2>
      <Sub className="mt-3 mb-10">
        Eğitim verisi internetten geliyor — internet de tarafsız değil.
        Model, gördüğü orantısızlıkları aynen yansıtır, hatta bazen abartır.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="uyz-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Pencil className="w-4 h-4" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs font-mono uppercase tracking-wider text-gray-500">
              Prompt
            </div>
          </div>
          <div
            className="rounded-lg p-4 font-mono text-base text-gray-200"
            style={{ background: "#0d0314", border: "1px solid rgba(168,85,247,0.2)" }}
          >
            &ldquo;Bir doktor ile bir hemşirenin fotoğrafı.&rdquo;
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div
              className="rounded-xl p-4 text-center"
              style={{ background: "#0d0314", border: "1px solid #ffffff10" }}
            >
              <div className="w-14 h-14 mx-auto mb-2 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#3b82f6,#1e40af)" }}>
                <Users className="w-7 h-7 text-white" />
              </div>
              <div className="text-xs text-white font-semibold">Doktor</div>
              <div className="text-[10px] text-gray-500 mt-1">%87 erkek olarak üretildi</div>
            </div>
            <div
              className="rounded-xl p-4 text-center"
              style={{ background: "#0d0314", border: "1px solid #ffffff10" }}
            >
              <div className="w-14 h-14 mx-auto mb-2 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#ec4899,#be185d)" }}>
                <Users className="w-7 h-7 text-white" />
              </div>
              <div className="text-xs text-white font-semibold">Hemşire</div>
              <div className="text-[10px] text-gray-500 mt-1">%93 kadın olarak üretildi</div>
            </div>
          </div>
          <div className="mt-3 text-[10px] text-gray-600 font-mono text-center">
            Bloomberg analizi · Stable Diffusion, 5000 görsel · 2023
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-4"
        >
          <div className="uyz-card rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4" style={{ color: ACCENT_SOFT }} />
              <div className="text-sm font-semibold text-white">Dil önyargısı</div>
            </div>
            <p className="text-sm text-gray-400">
              Eğitim verisinin yaklaşık <span className="text-white">%50'si İngilizce</span>.
              Türkçe %1'in altında. Bu yüzden bazı modeller Türkçe'de tutuk,
              İngilizce'de akıcı.
            </p>
          </div>

          <div className="uyz-card rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4" style={{ color: ACCENT_SOFT }} />
              <div className="text-sm font-semibold text-white">Temsil eksikliği</div>
            </div>
            <p className="text-sm text-gray-400">
              &ldquo;Bilim insanı&rdquo; aramasında çoğunlukla beyaz, erkek, yaşlı
              karakterler üretilir — çünkü internetteki tarihsel görsel veri öyle.
            </p>
          </div>

          <div className="uyz-card rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4" style={{ color: ACCENT_SOFT }} />
              <div className="text-sm font-semibold text-white">Sonuç</div>
            </div>
            <p className="text-sm text-gray-400">
              Bias görünmez bir filtredir. Üretken çıktıları{" "}
              <span className="text-white">eleştirel okumak</span> bizim sorumluluğumuz.
            </p>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  17 · TELİF  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Sınır · 3/3</Eyebrow>
      <H2>Telif: kim üretti, kimin verisinden?</H2>
      <Sub className="mt-3 mb-10">
        Üretken YZ modelleri, çoğunlukla izin alınmadan toplanan veriyle
        eğitildi. Bu, üç farklı meslek grubunu doğrudan ilgilendiriyor.
      </Sub>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="uyz-card rounded-2xl p-6"
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
            style={{ background: "#ec489922", border: "1px solid #ec489955" }}
          >
            <Palette className="w-6 h-6 text-pink-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Sanatçılar</h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-3">
            Eserleri, stil &ldquo;taklit ettir&rdquo; istemlerinin yakıtı oldu.
          </p>
          <div
            className="text-[11px] p-2.5 rounded font-mono"
            style={{ background: "#0d0314", color: "#f472b6" }}
          >
            Dava: Getty Images vs Stability AI, 2023
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="uyz-card rounded-2xl p-6"
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
            style={{ background: "#3b82f622", border: "1px solid #3b82f655" }}
          >
            <Briefcase className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Gazeteciler</h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-3">
            Makaleler, modelin &ldquo;güncel olay&rdquo; bilgisinin kaynağı oldu;
            ücretsiz olarak.
          </p>
          <div
            className="text-[11px] p-2.5 rounded font-mono"
            style={{ background: "#0d0314", color: "#60a5fa" }}
          >
            Dava: NYT vs OpenAI, 2023
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="uyz-card rounded-2xl p-6"
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
            style={{ background: "#22c55e22", border: "1px solid #22c55e55" }}
          >
            <BookOpen className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Akademisyenler</h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-3">
            Açık erişim makaleler &ldquo;hak ediyor&rdquo; mu yoksa
            &ldquo;sömürülüyor&rdquo; mu — tartışma sürüyor.
          </p>
          <div
            className="text-[11px] p-2.5 rounded font-mono"
            style={{ background: "#0d0314", color: "#4ade80" }}
          >
            Tartışma: Books3 dataset, 2023
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-8 uyz-card rounded-xl p-5 flex items-start gap-3"
      >
        <Scale className="w-6 h-6 shrink-0 mt-0.5" style={{ color: ACCENT_SOFT }} />
        <div className="text-sm text-gray-400">
          <span className="text-white font-semibold">Bizim tarafımızdan:</span>{" "}
          Çıktıyı &ldquo;benim&rdquo; diye sahiplenmeden önce, kaynağı ne kadar
          dönüştürdüğümüzü ve kime borçlu olduğumuzu sormak — sadece etik değil,
          yakında <span className="text-white">yasal bir zorunluluk</span>.
        </div>
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  18 · BU HAFTA YAPILACAKLAR  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Bu hafta</Eyebrow>
      <H2>Bu hafta evde yapılacaklar.</H2>
      <Sub className="mt-3 mb-10">
        Teoriyi parmak ucunda hissetmenin tek yolu denemek. Önümüzdeki hafta
        derste birbirimize göstereceğiz.
      </Sub>

      <div className="space-y-3 max-w-3xl mx-auto">
        {[
          {
            icon: Sparkles,
            title: "Üç hesap aç",
            desc: "ChatGPT (chat.openai.com), Claude (claude.ai) ve Gemini (gemini.google.com) — hepsi ücretsiz başlangıç planı sunuyor.",
          },
          {
            icon: MessageSquare,
            title: "Aynı 3 prompt'u her üçünde dene",
            desc: "Örnek: &ldquo;Manisa için 1 günlük gezi planı&rdquo;, &ldquo;500 kelimelik bir kısa öykü&rdquo;, &ldquo;Bir Python tek satırlık kod örneği&rdquo;.",
          },
          {
            icon: BarChart3,
            title: "Cevapları karşılaştır",
            desc: "Hangi model daha akıcı? Hangisi daha doğru? Hangisi Türkçe'de daha iyi? 3-4 cümlelik bir not al.",
          },
          {
            icon: ShieldAlert,
            title: "Bir halüsinasyon örneği yakala",
            desc: "Modeli özellikle bilmediği bir konuda sıkıştır — emin görünen ama yanlış bir cevap bul, ekran görüntüsü al.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.12 }}
            className="uyz-card uyz-card-hover rounded-xl p-5 flex items-start gap-4"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{
                background: `${ACCENT}1f`,
                border: `1px solid ${ACCENT}55`,
              }}
            >
              <item.icon className="w-5 h-5" style={{ color: ACCENT_SOFT }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="w-5 h-5 rounded border border-gray-600 flex items-center justify-center text-[10px]">
                  {i + 1}
                </span>
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed pl-8">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-8 text-center text-xs text-gray-500"
      >
        Yapılacaklar değerlendirmeye girmiyor — ama hafta 2'deki tartışma için{" "}
        <span className="text-white">sahiden faydalı olacak</span>.
      </motion.div>
    </SlideShell>
  ),

  /* ─────────────────  19 · SIRADAKİ HAFTA  ───────────────── */
  () => (
    <SlideShell>
      <Eyebrow>Önümüzdeki hafta</Eyebrow>
      <H2>Hafta 2 · Olasılıksal Temeller</H2>
      <Sub className="mt-3 mb-10">
        Üretken modellerin altındaki matematiksel sezgi: olasılık, koşullu
        olasılık, Bayes, Markov zincirleri.
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
              { icon: BarChart3, t: "Olasılık ve koşullu olasılık" },
              { icon: Brain, t: "Bayes teoremi · ön sav, sonra sav" },
              { icon: Network, t: "Markov zincirleri · &ldquo;sonraki adım&rdquo; sezgisi" },
              { icon: Sparkles, t: "İlk üretken model: Bigram dil modeli" },
              { icon: Code2, t: "Mini lab · Python ile bigram oluştur" },
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
              <li>3blue1brown · &ldquo;Bayes theorem&rdquo; videosu</li>
              <li>StatQuest · Markov chain (10 dk)</li>
              <li>Lise düzeyi olasılık tekrarı</li>
            </ul>
          </div>

          <div className="uyz-card rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4" style={{ color: ACCENT_SOFT }} />
              <div className="text-sm font-semibold text-white">Getirilecek</div>
            </div>
            <p className="text-sm text-gray-400">
              Bu haftadan kalan halüsinasyon örnekleri — hafta 2'nin başında
              ortak panoya işleyeceğiz.
            </p>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  ),

  /* ─────────────────  20 · TEŞEKKÜRLER  ───────────────── */
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

        <Eyebrow>Hafta 1 · Bitiş</Eyebrow>
        <H1>
          <span className="uyz-shimmer">Teşekkürler.</span>
        </H1>
        <Sub className="mt-6 max-w-2xl mx-auto">
          Soru, itiraz, &ldquo;bu nasıl çalışıyor?&rdquo; — hepsi bekliyorum.
        </Sub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="uyz-card rounded-xl p-5"
          >
            <Calendar className="w-5 h-5 mb-2" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1">
              Ders saati
            </div>
            <div className="text-white text-sm">Perşembe · 15:20 – 17:00</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="uyz-card rounded-xl p-5"
          >
            <Layout className="w-5 h-5 mb-2" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1">
              Sınıf
            </div>
            <div className="text-white text-sm">Amfi 1 · MCBÜ MYO</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="uyz-card rounded-xl p-5"
          >
            <Mic className="w-5 h-5 mb-2" style={{ color: ACCENT_SOFT }} />
            <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1">
              Ofis saatleri
            </div>
            <div className="text-white text-sm">Per 17:00 – 18:00</div>
          </motion.div>
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
          BVA 1203 · 1. Hafta · Üretken Yapay Zekâya Giriş
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
