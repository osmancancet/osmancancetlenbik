"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ComponentType,
  type SVGProps,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "qrcode";
import {
  AlertOctagon,
  BookOpen,
  Brain,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Crown,
  Drama,
  Fish,
  GraduationCap,
  Gift,
  HardDrive,
  Handshake,
  Inbox,
  KeyRound,
  Lock,
  Mail,
  MessageSquare,
  Phone,
  QrCode,
  Target,
  RefreshCw,
  Shield,
  ShieldAlert,
  Skull,
  Smartphone,
  Swords,
  X as XIcon,
} from "lucide-react";
import "./styles.css";

type IconType = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string; strokeWidth?: number | string }>;

/* ================================================================
   TYPES
   ================================================================ */
type SlideCtx = { isActive: boolean; consumeAdvance: (fn: () => boolean) => void };

interface Slide {
  id: string;
  section?: string;
  content: ReactNode | ((ctx: SlideCtx) => ReactNode);
}

/* ================================================================
   HOOKS
   ================================================================ */
function useCountUp(target: string, duration = 1500, delay = 0) {
  const [display, setDisplay] = useState(target);
  const started = useRef(false);
  useEffect(() => {
    const match = target.match(/([^\d]*?)([\d,.]+)(.*)/);
    if (!match) { setDisplay(target); return; }
    const [, prefix, numStr, suffix] = match;
    const num = parseFloat(numStr.replace(",", "."));
    if (isNaN(num)) { setDisplay(target); return; }
    const t = setTimeout(() => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const e = 1 - Math.pow(1 - p, 3);
        const v = num * e;
        const f = numStr.includes(",") || numStr.includes(".")
          ? v.toFixed(1).replace(".", numStr.includes(",") ? "," : ".")
          : Math.round(v).toString();
        setDisplay(`${prefix}${f}${suffix}`);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [target, duration, delay]);
  return display;
}

/* ================================================================
   MATRIX RAIN
   ================================================================ */
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const chars = "アカサタナハマヤラワ0123456789ABCDEF<>/{}[];:$#@!";
    const fontSize = 16;
    let columns: number[] = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const cols = Math.floor(canvas.width / fontSize);
      columns = Array.from({ length: cols }, () => Math.floor(Math.random() * -50));
    };
    resize();
    window.addEventListener("resize", resize);
    let frame = 0;
    let raf = 0;
    const draw = () => {
      frame++;
      if (frame % 2 !== 0) { raf = requestAnimationFrame(draw); return; }
      ctx.fillStyle = "rgba(2, 5, 10, 0.09)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < columns.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const y = columns[i] * fontSize;
        ctx.fillStyle = "rgba(0, 255, 136, 0.26)";
        ctx.font = `bold ${fontSize}px monospace`;
        ctx.fillText(ch, i * fontSize, y);
        ctx.fillStyle = "rgba(0, 255, 136, 0.08)";
        ctx.font = `${fontSize}px monospace`;
        const trailCh = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(trailCh, i * fontSize, y - fontSize * 2);
        if (y > canvas.height && Math.random() > 0.975) columns[i] = 0;
        columns[i]++;
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 mcb-hex" />
      <div className="absolute inset-0 mcb-scan" />
      <div className="absolute inset-0 mcb-vignette" />
    </div>
  );
}

/* ================================================================
   PRIMITIVES
   ================================================================ */
function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  return <span className={`mcb-glitch ${className}`} data-text={text}>{text}</span>;
}

function LogoMark({ height = "clamp(2.75rem, 6vmin, 5rem)", glow = "rgba(0,255,136,0.4)" }: { height?: string; glow?: string }) {
  return (
    <div
      className="relative shrink-0"
      style={{
        height,
        aspectRatio: "734 / 176",
        filter: `drop-shadow(0 0 18px ${glow})`,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logomcbukaf.png"
        alt="MCBÜKAF '26 · MCBÜ Teknik Bilimler MYO"
        className="w-full h-full object-contain"
        draggable={false}
      />
    </div>
  );
}

/* ── Tekrarlayan ikon kutusu · ölçü + renk + stroke uniform ─── */
function IconBadge({ icon: I, size = "clamp(3.5rem, 9vmin, 6rem)", color = "#00ff88", strokeWidth = 1.4 }: {
  icon: IconType;
  size?: string;
  color?: string;
  strokeWidth?: number;
}) {
  return (
    <div
      className="inline-flex items-center justify-center"
      style={{
        width: size,
        height: size,
        color,
        filter: `drop-shadow(0 0 18px ${color}55)`,
      }}
    >
      <I width="100%" height="100%" strokeWidth={strokeWidth} />
    </div>
  );
}

function SectionTitle({ icon, number, title, subtitle, color = "#00ff88" }: {
  icon: IconType;
  number?: string;
  title: string;
  subtitle: string;
  color?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 sm:px-10 relative overflow-hidden">
      <motion.div className="absolute inset-0 z-0" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 3 }}
        style={{ background: `radial-gradient(circle at 50% 50%, ${color}10 0%, transparent 50%)` }} />
      <motion.div className="absolute rounded-full border z-0"
        style={{ borderColor: `${color}20`, width: "min(500px, 65vmin)", height: "min(500px, 65vmin)" }}
        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} />
      <div className="relative z-10 flex flex-col items-center max-w-full">
        {number && (
          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="mcb-tag mcb-mono mb-3" style={{ color: `${color}cc` }}>
            BÖLÜM · {number}
          </motion.p>
        )}
        <motion.div initial={{ scale: 0, rotate: -12 }} animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
          style={{ marginBottom: "clamp(1rem, 3vh, 2rem)" }}>
          <IconBadge icon={icon} color={color} />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
          className="mcb-h1 font-black tracking-tight mb-4" style={{ color, textShadow: `0 0 20px ${color}60, 0 0 60px ${color}25` }}>
          <GlitchText text={title} />
        </motion.h1>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-[3px] mb-5 rounded-full" style={{ width: "min(15rem, 50vw)", background: `linear-gradient(90deg, transparent, ${color}, transparent)`, boxShadow: `0 0 15px ${color}40` }} />
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="mcb-lead text-gray-300 max-w-4xl">{subtitle}</motion.p>
      </div>
    </div>
  );
}

const ACCENT_COLORS = {
  emerald: "#00ff88",
  rose: "#f43f5e",
  cyan: "#22d3ee",
  amber: "#fbbf24",
} as const;
type AccentKey = keyof typeof ACCENT_COLORS;

function BulletSlide({ title, icon, items, accent = "emerald" }: {
  title: string;
  icon: IconType;
  items: { icon: IconType; text: string }[];
  accent?: AccentKey;
}) {
  const accentColor = ACCENT_COLORS[accent];
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 sm:px-10 md:px-20 overflow-y-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center gap-3 sm:gap-5 mb-5 sm:mb-8 flex-wrap">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
          <IconBadge icon={icon} color={accentColor} size="clamp(2.5rem, 6vmin, 4rem)" />
        </motion.div>
        <h2 className="mcb-h2 font-bold text-center">{title}</h2>
      </motion.div>
      <div className="space-y-2.5 sm:space-y-4 w-full max-w-6xl">
        {items.map((item, i) => {
          const ItemIcon = item.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 * (i + 1), type: "spring", stiffness: 80 }}
              className="flex items-start gap-3 sm:gap-5 border-l-4 bg-white/[0.03] backdrop-blur-sm rounded-r-xl pl-4 sm:pl-7 pr-3 py-3 sm:py-4"
              style={{ borderColor: accentColor }}>
              <div className="shrink-0 inline-flex items-center justify-center mt-0.5"
                style={{
                  width: "clamp(1.75rem, 3.6vmin, 2.4rem)",
                  height: "clamp(1.75rem, 3.6vmin, 2.4rem)",
                  color: accentColor,
                }}>
                <ItemIcon width="100%" height="100%" strokeWidth={1.6} />
              </div>
              <p className="mcb-body text-gray-200">{item.text}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function AnimatedStat({ value, label, color, delay }: { value: string; label: string; color: string; delay: number }) {
  const animated = useCountUp(value, 1400, delay * 1000);
  const len = value.length;
  const fontSize =
    len > 7 ? "clamp(2.25rem, 5.2vw, 5.5rem)"
    : len > 4 ? "clamp(2.5rem, 6vw, 6.5rem)"
    : "clamp(2.75rem, 7vw, 7.5rem)";
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col items-center justify-center text-center rounded-2xl bg-white/[0.025] backdrop-blur-sm overflow-hidden"
      style={{
        padding: "clamp(1rem, 2.6vmin, 2.25rem) clamp(0.75rem, 2vmin, 1.75rem)",
        border: `1px solid ${color}30`,
        boxShadow: `0 0 28px ${color}18, inset 0 0 40px ${color}08`,
        minHeight: "clamp(10rem, 22vmin, 16rem)",
      }}
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: delay + 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 h-[2px] origin-left"
        style={{ width: "100%", background: `linear-gradient(90deg, transparent, ${color}, transparent)`, boxShadow: `0 0 12px ${color}` }}
      />
      <p
        className="font-black mcb-mono tabular-nums leading-none whitespace-nowrap"
        style={{
          fontSize,
          letterSpacing: "-0.025em",
          color,
          textShadow: `0 0 26px ${color}55, 0 0 70px ${color}25`,
          marginBottom: "clamp(0.65rem, 1.6vmin, 1.25rem)",
        }}
      >
        {animated}
      </p>
      <p className="mcb-meta text-gray-300 max-w-[18ch] mx-auto leading-snug">{label}</p>
    </motion.div>
  );
}

function StatSlide({ title, eyebrow, stats }: { title: string; eyebrow?: string; stats: { value: string; label: string; color: string }[] }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 sm:px-10 md:px-16">
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mcb-tag mcb-mono text-emerald-400/70 mb-2 sm:mb-3"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mcb-h2 font-black text-center text-white"
        style={{
          marginBottom: "clamp(1.25rem, 4vh, 3rem)",
          textShadow: "0 0 22px rgba(255,255,255,0.12)",
        }}
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="h-[2px] rounded-full mb-6 sm:mb-10"
        style={{
          width: "min(18rem, 40vw)",
          background: "linear-gradient(90deg, transparent, rgba(0,255,136,0.7), transparent)",
        }}
      />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 w-full max-w-5xl"
        style={{ gap: "clamp(0.9rem, 2.2vmin, 1.5rem)" }}
      >
        {stats.map((s, i) => (
          <AnimatedStat key={i} value={s.value} label={s.label} color={s.color} delay={0.15 + 0.15 * i} />
        ))}
      </div>
    </div>
  );
}

function QuoteSlide({ quote, author, icon, color = "#00ff88" }: {
  quote: string;
  author: string;
  icon: IconType;
  color?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 sm:px-16 md:px-24 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
        style={{ marginBottom: "clamp(1.25rem, 3.5vh, 2.5rem)" }}>
        <IconBadge icon={icon} color={color} size="clamp(3rem, 7.5vmin, 5rem)" />
      </motion.div>
      <motion.blockquote initial={{ opacity: 0, y: 30, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.3, duration: 0.7 }}
        className="mcb-h3 font-light italic text-gray-200 max-w-5xl"
        style={{ textShadow: `0 0 30px ${color}1f` }}>&ldquo;{quote}&rdquo;</motion.blockquote>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        className="mcb-lead text-gray-500" style={{ marginTop: "clamp(1.5rem, 4vh, 2.5rem)" }}>— {author}</motion.p>
    </div>
  );
}

function BigTextSlide({ text, subtext, color = "#00ff88" }: { text: string; subtext?: string; color?: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 sm:px-16 md:px-24 text-center">
      <motion.h1 initial={{ opacity: 0, scale: 0.7, filter: "blur(12px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ type: "spring", stiffness: 80, damping: 12 }}
        className="mcb-h1 font-black max-w-6xl" style={{ color, textShadow: `0 0 22px ${color}55, 0 0 60px ${color}25` }}>{text}</motion.h1>
      {subtext && (
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="mcb-lead text-gray-400 max-w-4xl" style={{ marginTop: "clamp(1.25rem, 3vh, 2.5rem)" }}>{subtext}</motion.p>
      )}
    </div>
  );
}

function TwoColumnSlide({ title, icon, left, right }: {
  title: string;
  icon: IconType;
  left: { title: string; items: string[]; color?: string };
  right: { title: string; items: string[]; color?: string };
}) {
  const lc = left.color ?? "#f43f5e";
  const rc = right.color ?? "#00ff88";
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 sm:px-10 md:px-20 overflow-y-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center gap-3 sm:gap-5 mb-5 sm:mb-8 flex-wrap text-center">
        <IconBadge icon={icon} color="#22d3ee" size="clamp(2.25rem, 5.5vmin, 3.6rem)" />
        <h2 className="mcb-h2 font-bold text-center">{title}</h2>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-6xl">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="rounded-xl pl-4 sm:pl-7 pr-3 py-4 sm:py-5 bg-white/[0.03] backdrop-blur-sm border-l-4"
          style={{ borderColor: lc, boxShadow: `0 0 18px ${lc}25` }}>
          <h3 className="mcb-h3 font-bold mb-3 sm:mb-4" style={{ color: lc }}>{left.title}</h3>
          <ul className="space-y-2.5 sm:space-y-3">
            {left.items.map((item, i) => (
              <li key={i} className="mcb-body text-gray-300 flex items-start gap-2 sm:gap-3">
                <XIcon className="shrink-0 mt-1" style={{ color: lc, width: "1.1em", height: "1.1em" }} strokeWidth={2.2} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
          className="rounded-xl pl-4 sm:pl-7 pr-3 py-4 sm:py-5 bg-white/[0.03] backdrop-blur-sm border-l-4"
          style={{ borderColor: rc, boxShadow: `0 0 18px ${rc}25` }}>
          <h3 className="mcb-h3 font-bold mb-3 sm:mb-4" style={{ color: rc }}>{right.title}</h3>
          <ul className="space-y-2.5 sm:space-y-3">
            {right.items.map((item, i) => (
              <li key={i} className="mcb-body text-gray-300 flex items-start gap-2 sm:gap-3">
                <Check className="shrink-0 mt-1" style={{ color: rc, width: "1.1em", height: "1.1em" }} strokeWidth={2.4} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

/* ================================================================
   CLICK REVEAL — slayt içi katmanları tıkla / Enter / Sağ ok ile aç
   ================================================================ */
function ClickReveal({ title, icon, layers, ctx, accent = "#00ff88", stepMs = 1500 }: {
  title: string;
  icon: IconType;
  layers: { label: string; body: ReactNode }[];
  ctx: SlideCtx;
  accent?: string;
  stepMs?: number;
}) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!ctx.isActive) { setShown(0); return; }
    setShown(0);
    let i = 0;
    const reveal = () => {
      i += 1;
      setShown(i);
      if (i < layers.length) timer = window.setTimeout(reveal, stepMs);
    };
    let timer = window.setTimeout(reveal, 300);
    return () => window.clearTimeout(timer);
  }, [ctx.isActive, layers.length, stepMs]);

  return (
    <div className="flex flex-col items-center justify-start h-full px-4 sm:px-10 md:px-16 pt-3 sm:pt-4 overflow-y-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-5 flex-wrap text-center">
        <IconBadge icon={icon} color={accent} size="clamp(2.25rem, 5.5vmin, 3.6rem)" />
        <h2 className="mcb-h2 font-bold text-center">{title}</h2>
      </motion.div>

      <div className="w-full max-w-5xl space-y-2.5 sm:space-y-3 flex-1">
        <AnimatePresence initial={false}>
          {layers.slice(0, shown).map((layer, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 110, damping: 14 }}
              className="rounded-xl bg-black/40 border backdrop-blur-sm overflow-hidden"
              style={{ borderColor: `${accent}40`, boxShadow: `0 0 18px ${accent}20` }}>
              <div className="px-3 sm:px-5 py-1.5 mcb-tag uppercase mcb-mono"
                style={{ background: `${accent}18`, color: accent }}>{layer.label}</div>
              <div className="px-3 sm:px-6 py-3 sm:py-4 mcb-body text-gray-100">{layer.body}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ================================================================
   COUNTDOWN TIMER — ransomware sahnesi
   ================================================================ */
function CountdownTimer({ seconds = 300, ctx }: { seconds?: number; ctx: SlideCtx }) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    if (!ctx.isActive) { setLeft(seconds); return; }
    const iv = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(iv);
  }, [ctx.isActive, seconds]);

  const mins = Math.floor(left / 60);
  const secs = left % 60;
  const expired = left === 0;
  const timeStr = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 sm:px-10 text-center relative overflow-hidden">
      {expired && (
        <motion.div className="absolute inset-0 mcb-stripes"
          initial={{ opacity: 0 }} animate={{ opacity: [0.2, 0.7, 0.2] }} transition={{ repeat: Infinity, duration: 0.9 }} />
      )}
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 120 }}
        style={{ marginBottom: "clamp(0.75rem, 2vh, 1.5rem)" }}>
        <IconBadge
          icon={expired ? Skull : Lock}
          color={expired ? "#ef4444" : "#fbbf24"}
          size="clamp(3rem, 8vmin, 5rem)"
          strokeWidth={1.5}
        />
      </motion.div>
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="mcb-h3 font-black mb-2 sm:mb-3 max-w-5xl"
        style={{ color: expired ? "#ef4444" : "#fbbf24",
          textShadow: expired ? "0 0 30px rgba(239,68,68,0.7)" : "0 0 18px rgba(251,191,36,0.4)" }}>
        {expired ? "VERİLERİNİZ ŞİFRELENDİ" : "FİDYE YAZILIMI · CryptoLock-26"}
      </motion.h2>
      <p className="mcb-lead text-gray-300 max-w-3xl" style={{ marginBottom: "clamp(1rem, 3vh, 2rem)" }}>
        {expired
          ? "Tüm dosyalarınız AES-256 ile şifrelendi. Geri dönüş yok."
          : "Bilgisayarınızdaki tüm dosyalar şifrelendi. Geri almak için 0.05 BTC ödeyin."}
      </p>
      <motion.div className="mcb-mono font-black tracking-wider tabular-nums"
        animate={expired ? { scale: [1, 1.06, 1], color: ["#ef4444", "#fff", "#ef4444"] } : {}}
        transition={expired ? { repeat: Infinity, duration: 0.8 } : {}}
        style={{
          fontSize: "clamp(3.5rem, 13vw, 11rem)",
          color: "#ef4444",
          textShadow: "0 0 30px rgba(239,68,68,0.6), 0 0 80px rgba(239,68,68,0.3)",
          lineHeight: 1,
        }}>
        {timeStr}
      </motion.div>
      <p className="mcb-meta text-gray-500 max-w-3xl px-2" style={{ marginTop: "clamp(1rem, 3vh, 2rem)" }}>
        {expired
          ? "Ders: Yedek almıyorsanız fidye ödemek tek seçenek gibi görünür. Yedek alın — her hafta, ayrı diskte, ayrı bulutta."
          : "Geri sayım bittiğinde fiyat ikiye katlanır. Yedeğiniz var mı?"}
      </p>
    </div>
  );
}


/* ================================================================
   PASSWORD CRACK SIM — auto brute-force animasyonu
   ================================================================ */
const CRACK_PASSWORDS = [
  { pw: "123456",            time: "<0,001 sn", detail: "Türkiye'de #1 şifre",        color: "#ef4444", weak: true,  maxProg: 100 },
  { pw: "ankara06",          time: "0,3 sn",    detail: "Şehir + plaka kodu",          color: "#f97316", weak: true,  maxProg: 100 },
  { pw: "Kalem42!",          time: "7 dakika",  detail: "8 karışık karakter",           color: "#fbbf24", weak: true,  maxProg: 100 },
  { pw: "Tr#n85_kL!m2",      time: "3.000 yıl", detail: "12 karışık · saldırgan vazgeçer", color: "#22d3ee", weak: false, maxProg: 12 },
  { pw: "Manisa-uzumleri-2026!", time: "∞",     detail: "Cümle-şifre · kırılmaz",        color: "#00ff88", weak: false, maxProg: 4 },
];

const CRACK_CHARS = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%&";

function PasswordCrackSim({ ctx }: { ctx: SlideCtx }) {
  const [idx, setIdx] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"idle" | "cracking" | "result">("idle");
  const [masked, setMasked] = useState("");

  useEffect(() => {
    if (!ctx.isActive) { setIdx(-1); setProgress(0); setPhase("idle"); setMasked(""); return; }
    const t = setTimeout(() => setIdx(0), 700);
    return () => clearTimeout(t);
  }, [ctx.isActive]);

  useEffect(() => {
    if (idx < 0 || idx >= CRACK_PASSWORDS.length) return;
    setPhase("cracking");
    setProgress(0);
    setMasked("*".repeat(CRACK_PASSWORDS[idx].pw.length));
  }, [idx]);

  useEffect(() => {
    if (phase !== "cracking" || idx < 0) return;
    const cur = CRACK_PASSWORDS[idx];
    const speed = cur.weak ? 32 : 70;
    const iv = setInterval(() => {
      setProgress((p) => {
        if (p >= cur.maxProg) {
          clearInterval(iv);
          setPhase("result");
          if (cur.weak) setMasked(cur.pw);
          window.setTimeout(() => {
            setIdx((i) => (i < CRACK_PASSWORDS.length - 1 ? i + 1 : i));
          }, 2400);
          return cur.maxProg;
        }
        return p + 1;
      });
    }, speed);
    return () => clearInterval(iv);
  }, [phase, idx]);

  useEffect(() => {
    if (phase !== "cracking" || idx < 0) return;
    const len = CRACK_PASSWORDS[idx].pw.length;
    const iv = setInterval(() => {
      setMasked(
        Array.from({ length: len }, () => CRACK_CHARS[Math.floor(Math.random() * CRACK_CHARS.length)]).join(""),
      );
    }, 55);
    return () => clearInterval(iv);
  }, [phase, idx]);

  if (idx < 0) return <div className="flex flex-col h-full" />;
  const cur = CRACK_PASSWORDS[idx];

  return (
    <div className="flex flex-col h-full px-4 sm:px-10 md:px-14 pt-1 pb-2 items-center justify-center overflow-hidden">
      <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
        className="mcb-tag mcb-mono text-rose-400/85 mb-1">
        BRUTE-FORCE · CANLI SİMÜLASYON
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="mcb-h3 font-black text-center mb-4 sm:mb-5">
        Şifrene kaç saniye dayanır?
      </motion.h2>

      <div className="w-full max-w-3xl rounded-2xl bg-black/70 border backdrop-blur-sm overflow-hidden"
        style={{
          borderColor: `${cur.color}50`,
          boxShadow: `0 0 32px ${cur.color}25, inset 0 0 30px ${cur.color}08`,
        }}>
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-black/40">
          <span className="mcb-mono text-[10px] sm:text-xs uppercase tracking-widest" style={{ color: cur.color }}>
            HEDEF #{idx + 1}/{CRACK_PASSWORDS.length} · {cur.detail}
          </span>
          <span className="mcb-mono text-[10px] sm:text-xs tabular-nums" style={{ color: cur.color }}>
            {Math.min(progress, cur.maxProg)}%
          </span>
        </div>

        <div className="px-5 sm:px-8 py-6 sm:py-8 bg-black">
          <motion.p key={masked}
            className="font-black mcb-mono tracking-widest text-center break-all"
            style={{
              color: phase === "result" && cur.weak ? "#ef4444" : cur.color,
              fontSize: "clamp(1.5rem, 4.5vw, 3.5rem)",
              textShadow: `0 0 18px ${cur.color}55`,
              letterSpacing: "0.05em",
            }}>
            {masked}
          </motion.p>
        </div>

        <div className="px-5 sm:px-8 py-4">
          <div className="w-full bg-zinc-900 rounded-full h-2.5 overflow-hidden border border-white/5">
            <motion.div
              className="h-full rounded-full transition-all"
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1 }}
              style={{
                background:
                  phase === "result" && cur.weak
                    ? "linear-gradient(90deg, #ef4444, #f97316)"
                    : `linear-gradient(90deg, ${cur.color}, ${cur.color}dd)`,
                boxShadow: `0 0 12px ${cur.color}80`,
              }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {phase === "result" && (
            <motion.div key={`r-${idx}`}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              className="px-5 sm:px-8 pb-5 pt-1 text-center border-t border-white/5">
              <p className="mcb-meta text-gray-500 mb-1">Kırılma süresi</p>
              <p className="font-black mcb-mono"
                style={{
                  color: cur.color,
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  textShadow: `0 0 22px ${cur.color}70`,
                }}>
                {cur.time}
              </p>
              <p className="mcb-meta mt-1" style={{ color: cur.weak ? "#ef4444" : "#00ff88" }}>
                {cur.weak ? "KIRILDI" : "SALDIRGAN VAZGEÇER"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 mt-4">
        {CRACK_PASSWORDS.map((p, i) => (
          <motion.span
            key={i}
            className="w-2.5 h-2.5 rounded-full transition-all"
            animate={{ scale: i === idx ? [1, 1.4, 1] : 1 }}
            transition={i === idx ? { repeat: Infinity, duration: 1 } : {}}
            style={{
              background: i < idx ? (CRACK_PASSWORDS[i].weak ? "#ef4444" : "#00ff88") : i === idx ? p.color : "#374151",
              boxShadow: i === idx ? `0 0 10px ${p.color}` : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   COMMON PASSWORDS LEADERBOARD
   ================================================================ */
function CommonPasswordsSlide() {
  const list: { rank: number; pw: string; crack: string; pct: number; color: string; tag: string }[] = [
    { rank: 1, pw: "123456",      crack: "<1 sn",  pct: 100, color: "#ef4444", tag: "ÇOK ZAYIF" },
    { rank: 2, pw: "123456789",   crack: "<1 sn",  pct: 100, color: "#ef4444", tag: "ÇOK ZAYIF" },
    { rank: 3, pw: "password",    crack: "<1 sn",  pct: 100, color: "#ef4444", tag: "ÇOK ZAYIF" },
    { rank: 4, pw: "qwerty",      crack: "<1 sn",  pct: 100, color: "#ef4444", tag: "ÇOK ZAYIF" },
    { rank: 5, pw: "111111",      crack: "<1 sn",  pct: 100, color: "#ef4444", tag: "ÇOK ZAYIF" },
    { rank: 6, pw: "fenerbahce",  crack: "5 sn",   pct: 92,  color: "#fb923c", tag: "ZAYIF" },
    { rank: 7, pw: "galatasaray", crack: "8 sn",   pct: 88,  color: "#fb923c", tag: "ZAYIF" },
    { rank: 8, pw: "ankara1453",  crack: "3 dk",   pct: 70,  color: "#fbbf24", tag: "ZAYIF" },
  ];
  return (
    <div className="flex flex-col h-full px-3 sm:px-10 md:px-16 pt-1 pb-2 overflow-hidden">
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mcb-tag mcb-mono text-rose-400/85 text-center mt-1"
      >
        TÜRKİYE 2024–2025 · EN ÇOK KULLANILAN ŞİFRELER
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mcb-h2 font-black text-center mt-2 mb-1"
      >
        Listede senin şifren var mı?
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="h-[2px] rounded-full mx-auto mb-3 sm:mb-4"
        style={{
          width: "min(14rem, 38vw)",
          background: "linear-gradient(90deg, transparent, rgba(244,63,94,0.7), transparent)",
        }}
      />
      <div className="w-full max-w-4xl mx-auto flex-1 min-h-0 flex flex-col justify-center gap-1.5 sm:gap-2">
        {list.map((row, i) => (
          <motion.div
            key={row.rank}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.06 * i + 0.35, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 sm:gap-4 rounded-lg bg-black/45 border backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-2.5"
            style={{
              borderColor: `${row.color}40`,
              boxShadow: `0 0 14px ${row.color}18`,
            }}
          >
            <span
              className="mcb-mono font-bold tabular-nums shrink-0 text-right"
              style={{
                color: `${row.color}cc`,
                fontSize: "clamp(0.85rem, 1.4vw, 1.15rem)",
                width: "clamp(2.25rem, 4vw, 3rem)",
              }}
            >
              #{row.rank.toString().padStart(2, "0")}
            </span>
            <span
              className="mcb-mono font-bold tracking-wider truncate"
              style={{
                color: row.color,
                fontSize: "clamp(1.05rem, 2.4vw, 1.85rem)",
                textShadow: `0 0 14px ${row.color}50`,
                flex: "0 1 18ch",
                minWidth: 0,
              }}
            >
              {row.pw}
            </span>
            <div className="flex-1 min-w-0 hidden sm:block">
              <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${row.pct}%` }}
                  transition={{ delay: 0.06 * i + 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full"
                  style={{ background: row.color, boxShadow: `0 0 8px ${row.color}` }}
                />
              </div>
            </div>
            <span
              className="mcb-mono tabular-nums shrink-0 text-right font-bold"
              style={{
                color: row.color,
                fontSize: "clamp(0.85rem, 1.5vw, 1.2rem)",
                minWidth: "clamp(2.75rem, 5vw, 4rem)",
              }}
            >
              {row.crack}
            </span>
            <span
              className="mcb-mono uppercase tracking-widest font-bold shrink-0 px-1.5 sm:px-2 py-0.5 rounded hidden md:inline-block"
              style={{
                color: row.color,
                background: `${row.color}18`,
                border: `1px solid ${row.color}40`,
                fontSize: "clamp(0.6rem, 0.85vw, 0.75rem)",
                minWidth: "5.5rem",
                textAlign: "center",
              }}
            >
              {row.tag}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   LIVE PASSWORD EXPERIMENT — QR + canlı feed (wow reveal)
   ================================================================ */
type Drop = {
  id: string;
  length: number;
  entropy: number;
  crackSec: number;
  strength: string;
  leaked: boolean;
  createdAt: string;
};

const STRENGTH_COLOR: Record<string, string> = {
  "ÇOK ZAYIF": "#f43f5e",
  "ZAYIF": "#fb923c",
  "ORTA": "#fbbf24",
  "İYİ": "#22d3ee",
  "MÜKEMMEL": "#00ff88",
};

function fmtCrack(sec: number): string {
  if (sec < 1) return "<1 sn";
  if (sec < 60) return `${Math.round(sec)} sn`;
  const m = sec / 60;
  if (m < 60) return `${Math.round(m)} dk`;
  const h = m / 60;
  if (h < 24) return `${Math.round(h)} sa`;
  const d = h / 24;
  if (d < 365) return `${Math.round(d)} gün`;
  const y = d / 365;
  if (y < 1e3) return `${Math.round(y)} yıl`;
  if (y < 1e6) return `${(y / 1e3).toFixed(1)}K yıl`;
  if (y < 1e9) return `${(y / 1e6).toFixed(1)}M yıl`;
  return "∞";
}

function relTime(iso: string): string {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 5) return "şimdi";
  if (s < 60) return `${s} sn önce`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} dk önce`;
  return `${Math.floor(m / 60)} sa önce`;
}

function useQrDataUrl(text: string, size = 720) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!text) return;
    let cancelled = false;
    QRCode.toDataURL(text, {
      width: size,
      margin: 2,
      errorCorrectionLevel: "H",
      color: { dark: "#02050a", light: "#ffffffff" },
    })
      .then((url) => { if (!cancelled) setDataUrl(url); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [text, size]);
  return dataUrl;
}

function useLiveDrops(active: boolean, intervalMs = 1500) {
  const [drops, setDrops] = useState<Drop[]>([]);
  const [dist, setDist] = useState<Record<string, number>>({});
  const [leakedCount, setLeakedCount] = useState(0);
  const [, force] = useState(0);

  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    let timer: number | undefined;

    const tick = async () => {
      try {
        const r = await fetch(`/api/mcbukaf/sifre-canli?session=default&min=120`, {
          cache: "no-store",
        });
        if (!r.ok) throw new Error();
        const data = await r.json();
        if (cancelled) return;
        setDrops(data.drops ?? []);
        setDist(data.dist ?? {});
        setLeakedCount(data.leakedCount ?? 0);
      } catch {
        /* keep prior */
      } finally {
        if (!cancelled) timer = window.setTimeout(tick, intervalMs);
      }
    };
    tick();

    // ticker to update "şimdi/sn önce" labels
    const refresh = window.setInterval(() => force((x) => x + 1), 5000);

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
      window.clearInterval(refresh);
    };
  }, [active, intervalMs]);

  return { drops, dist, leakedCount };
}

function DropRow({ drop, fresh }: { drop: Drop; fresh: boolean }) {
  const color = STRENGTH_COLOR[drop.strength] ?? "#22d3ee";
  const dots = "•".repeat(Math.min(drop.length, 24));
  const entropyPct = Math.min(100, (drop.entropy / 100) * 100);
  return (
    <motion.div
      layout
      initial={fresh ? { opacity: 0, x: 30, scale: 0.96 } : { opacity: 0 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className="rounded-lg bg-black/55 border backdrop-blur-sm overflow-hidden"
      style={{
        borderColor: drop.leaked ? "#f43f5e80" : `${color}40`,
        boxShadow: fresh
          ? `0 0 24px ${color}50, 0 0 60px ${color}25`
          : `0 0 10px ${color}18`,
      }}
    >
      <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5">
        <div className="flex flex-col items-start min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="mcb-mono font-bold text-white tabular-nums text-base sm:text-lg tracking-wider truncate"
              style={{ color }}>{dots}</span>
            <span className="mcb-mono text-[10px] sm:text-xs text-gray-500 shrink-0">{drop.length} krk</span>
          </div>
          <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${entropyPct}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full"
              style={{ background: color, boxShadow: `0 0 10px ${color}90` }}
            />
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="mcb-mono font-bold text-[10px] sm:text-xs tracking-widest" style={{ color }}>
            {drop.strength}
          </div>
          <div className="mcb-mono text-[10px] sm:text-xs text-gray-400 tabular-nums">
            kırılır: <span style={{ color }}>{fmtCrack(drop.crackSec)}</span>
          </div>
        </div>
        {drop.leaked && (
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mcb-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-1.5 sm:px-2 py-0.5 rounded shrink-0"
            style={{ background: "#f43f5e25", color: "#fda4af", border: "1px solid #f43f5e60" }}
          >
            SIZINTI
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function LivePasswordExperiment({ ctx }: { ctx: SlideCtx }) {
  const [phase, setPhase] = useState<0 | 1>(0);
  const phaseRef = useRef(0);

  useEffect(() => { phaseRef.current = phase; }, [phase]);

  useEffect(() => {
    if (!ctx.isActive) {
      phaseRef.current = 0;
      setPhase(0);
      return;
    }
    ctx.consumeAdvance(() => {
      if (phaseRef.current === 0) {
        phaseRef.current = 1;
        setPhase(1);
        return true;
      }
      return false;
    });
  }, [ctx]);

  const [origin, setOrigin] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") setOrigin(window.location.origin);
  }, []);

  const targetUrl = origin ? `${origin}/mcbukaf/sifre` : "";
  const qrDataUrl = useQrDataUrl(targetUrl, 720);

  const { drops, dist, leakedCount } = useLiveDrops(ctx.isActive);

  const lastIdRef = useRef<string | null>(null);
  const freshIds = useRef<Set<string>>(new Set());
  useEffect(() => {
    if (drops.length === 0) return;
    const newest = drops[0].id;
    if (newest !== lastIdRef.current) {
      const prev = lastIdRef.current;
      lastIdRef.current = newest;
      if (prev !== null) {
        freshIds.current.add(newest);
        window.setTimeout(() => freshIds.current.delete(newest), 4500);
      }
    }
  }, [drops]);

  const total = drops.length;
  const weakish = (dist["ZAYIF"] ?? 0) + (dist["ÇOK ZAYIF"] ?? 0);
  const strong = (dist["İYİ"] ?? 0) + (dist["MÜKEMMEL"] ?? 0);
  const mid = dist["ORTA"] ?? 0;

  return (
    <div className="flex flex-col h-full px-3 sm:px-6 pt-1 pb-1 min-h-0">
      {/* Phase 0 — Invitation: big QR centered, subtle feed peek */}
      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div
            key="invite"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4 }}
            className="flex-1 flex flex-col items-center justify-center min-h-0"
          >
            <motion.h2 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="mcb-h2 font-black text-center mb-1"
              style={{ color: "#00ff88", textShadow: "0 0 22px rgba(0,255,136,0.5)" }}>
              Sırada SEN varsın
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
              className="mcb-lead text-gray-300 text-center mb-4 sm:mb-6 max-w-3xl px-2">
              QR&apos;ı tarat · şifreni gir · &ldquo;Sonucu Ekrana Yansıt&rdquo;a bas
            </motion.p>

            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 130, damping: 14, delay: 0.15 }}
              className="relative rounded-2xl overflow-hidden mcb-glow-green"
              style={{
                width: "min(56vmin, 460px)",
                height: "min(56vmin, 460px)",
                background: "white",
                padding: "clamp(0.5rem, 1.5vmin, 1rem)",
              }}>
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="QR · /mcbukaf/sifre"
                  className="w-full h-full object-contain" />
              ) : (
                <div className="w-full h-full bg-zinc-200 animate-pulse" />
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="mt-4 sm:mt-5 flex flex-col items-center gap-1">
              <p className="mcb-mono text-emerald-400/70 text-xs sm:text-sm tracking-widest break-all px-2 text-center">
                {origin ? `${origin.replace(/^https?:\/\//, "")}/mcbukaf/sifre` : "—"}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.6 }}
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="mcb-mono text-[10px] sm:text-[11px] text-emerald-400/60 tracking-widest">
                  {total > 0
                    ? `${total} test alındı · son: ${relTime(drops[0].createdAt)}`
                    : "bağlı · ilk testin bekleniyor…"}
                </span>
              </div>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 mcb-mono text-[10px] sm:text-xs text-gray-500 select-none inline-flex items-center gap-1.5">
              <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4 }}
                className="inline-flex items-center" style={{ color: "#00ff88" }}>
                <ChevronRight strokeWidth={2.2} style={{ width: "1.1em", height: "1.1em" }} />
              </motion.span>
              boşluk / → · ekrana yansıt
            </motion.p>
          </motion.div>
        )}

        {/* Phase 1 — Reveal: feed dominates, QR small corner */}
        {phase === 1 && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex-1 flex flex-col min-h-0"
          >
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between gap-2 sm:gap-4 mb-2 sm:mb-3 px-1 flex-wrap">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.3 }}
                  className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-rose-500 shrink-0"
                  style={{ boxShadow: "0 0 10px #f43f5e" }} />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] mcb-mono text-rose-300 shrink-0">PARMAK İZLERİNİZ</span>
                <span className="mcb-mono text-[10px] sm:text-xs text-emerald-400/70 tabular-nums">
                  {total} test · {leakedCount} sızıntı
                </span>
              </div>
              {/* mini QR */}
              {qrDataUrl && (
                <div className="rounded-lg overflow-hidden border border-emerald-500/30 bg-white shrink-0"
                  style={{ width: "clamp(48px, 7vmin, 80px)", height: "clamp(48px, 7vmin, 80px)", padding: "2px" }}>
                  <img src={qrDataUrl} alt="QR" className="w-full h-full object-contain" />
                </div>
              )}
            </motion.div>

            {/* Distribution bar */}
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-2 rounded-full overflow-hidden bg-zinc-900/80 mb-2 sm:mb-3 origin-left flex">
              {total > 0 && (
                <>
                  {weakish > 0 && <div className="h-full" style={{ width: `${(weakish / total) * 100}%`, background: "linear-gradient(90deg, #f43f5e, #fb923c)" }} />}
                  {mid > 0 && <div className="h-full" style={{ width: `${(mid / total) * 100}%`, background: "#fbbf24" }} />}
                  {strong > 0 && <div className="h-full" style={{ width: `${(strong / total) * 100}%`, background: "linear-gradient(90deg, #22d3ee, #00ff88)" }} />}
                </>
              )}
            </motion.div>

            {/* Legend */}
            <div className="flex items-center gap-3 sm:gap-5 mb-2 sm:mb-3 mcb-mono text-[10px] sm:text-xs flex-wrap px-1">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-rose-500" /><span className="text-gray-300">ZAYIF {weakish}</span></span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-amber-400" /><span className="text-gray-300">ORTA {mid}</span></span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-emerald-400" /><span className="text-gray-300">GÜÇLÜ {strong}</span></span>
            </div>

            {/* Feed */}
            <div className="flex-1 min-h-0 overflow-y-auto pr-1">
              {total === 0 ? (
                <div className="h-full flex items-center justify-center text-center">
                  <p className="mcb-meta text-gray-500">İlk testin bekleniyor…</p>
                </div>
              ) : (
                <div className="space-y-1.5 sm:space-y-2">
                  <AnimatePresence initial={false}>
                    {drops.slice(0, 12).map((d) => (
                      <DropRow key={d.id} drop={d} fresh={freshIds.current.has(d.id)} />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================================================================
   DEEPFAKE SLIDE — video embed + vakalar + ipuçları
   ================================================================ */
function DeepfakeSlide() {
  return (
    <div className="flex flex-col h-full px-4 sm:px-8 md:px-12 pt-1 pb-2 min-h-0">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center gap-3 sm:gap-4 mb-2">
        <IconBadge icon={Drama} color="#a855f7" size="clamp(1.75rem, 4vmin, 2.5rem)" strokeWidth={1.6} />
        <h2 className="mcb-h3 font-bold text-center">Bu Morgan Freeman değil.</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full mx-auto rounded-2xl overflow-hidden border bg-black"
        style={{
          maxWidth: "min(58vh * 16 / 9, 100%)",
          aspectRatio: "16 / 9",
          borderColor: "rgba(168,85,247,0.4)",
          boxShadow: "0 0 32px rgba(168,85,247,0.25), inset 0 0 30px rgba(168,85,247,0.06)",
        }}
      >
        <iframe
          src="https://www.youtube-nocookie.com/embed/oxXpB9pSETo?rel=0&modestbranding=1"
          title="This is not Morgan Freeman — A Deepfake Singularity"
          className="w-full h-full block"
          allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="mcb-meta text-gray-400 text-center mt-2 sm:mt-3 max-w-4xl mx-auto px-2"
      >
        Hong Kong &middot; <span className="text-purple-300 font-bold">Arup 25,6 M$</span> · Türkiye &middot; <span className="text-purple-300 font-bold">MİT Erdoğan ses klonunu yakaladı</span>
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mt-3 sm:mt-4 w-full max-w-5xl mx-auto">
        {[
          { label: "Göz", text: "Göz kırpma anormal — ya hiç olmaz ya makine ritminde." },
          { label: "Dudak senkronu", text: "Sert ünsüzlerde milisaniyelik kayma — P, M, B." },
          { label: "Ton + nefes", text: "Klonlanmış seste nefes yok, duygu eğrisi düz." },
        ].map((tip, i) => (
          <motion.div
            key={tip.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-lg bg-black/45 border backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-2.5"
            style={{
              borderColor: "rgba(168,85,247,0.35)",
              boxShadow: "0 0 14px rgba(168,85,247,0.15)",
            }}
          >
            <p className="mcb-mono text-purple-300 text-xs uppercase tracking-widest font-bold mb-1">{tip.label}</p>
            <p className="mcb-meta text-gray-200 leading-snug">{tip.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


/* ================================================================
   QR PHISHING TRAP — bait + reveal slaytları
   ================================================================ */
function useQrTrapPoll(active: boolean, session: string = "default", intervalMs = 1500) {
  const [total, setTotal] = useState(0);
  const [lastAt, setLastAt] = useState<string | null>(null);
  const [, force] = useState(0);

  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    let timer: number | undefined;

    const tick = async () => {
      try {
        const r = await fetch(`/api/mcbukaf/qr-tuzak?session=${encodeURIComponent(session)}&min=120`, { cache: "no-store" });
        if (!r.ok) throw new Error();
        const data = await r.json();
        if (cancelled) return;
        setTotal(data.total ?? 0);
        setLastAt(data.hits?.[0]?.createdAt ?? null);
      } catch {
        /* keep prior */
      } finally {
        if (!cancelled) timer = window.setTimeout(tick, intervalMs);
      }
    };
    tick();

    const refresh = window.setInterval(() => force((x) => x + 1), 5000);
    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
      window.clearInterval(refresh);
    };
  }, [active, intervalMs, session]);

  return { total, lastAt };
}

function QrBaitSlide({ ctx }: { ctx: SlideCtx }) {
  const [origin, setOrigin] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") setOrigin(window.location.origin);
  }, []);
  const targetUrl = origin ? `${origin}/mcbukaf/qr-tuzak` : "";
  const qrDataUrl = useQrDataUrl(targetUrl, 720);
  const { total, lastAt } = useQrTrapPoll(ctx.isActive);

  return (
    <div className="flex flex-col h-full px-4 sm:px-8 pt-1 pb-2 min-h-0 items-center">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 sm:gap-3 mt-1 mb-2">
        <span className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500 shadow-lg shadow-emerald-500/40">
          <Check strokeWidth={3} className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </span>
        <span className="mcb-mono text-emerald-400 font-bold text-sm sm:text-base tracking-wide">
          Etkinlik Anketi
        </span>
      </motion.div>

      <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="mcb-h2 font-black text-center mb-1.5"
        style={{ color: "#00ff88", textShadow: "0 0 22px rgba(0,255,136,0.45)" }}>
        Bu sunum nasıl gidiyor?
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
        className="mcb-lead text-gray-300 text-center mb-4 sm:mb-5 max-w-3xl px-2">
        QR&apos;ı tarat · 30 saniyelik kısa anketi doldur
      </motion.p>

      <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 130, damping: 14, delay: 0.2 }}
        className="relative rounded-2xl overflow-hidden mcb-glow-green"
        style={{
          width: "min(50vmin, 420px)",
          height: "min(50vmin, 420px)",
          background: "white",
          padding: "clamp(0.5rem, 1.5vmin, 1rem)",
        }}>
        {qrDataUrl ? (
          <img src={qrDataUrl} alt="QR · /mcbukaf/qr-tuzak" className="w-full h-full object-contain" />
        ) : (
          <div className="w-full h-full bg-zinc-200 animate-pulse" />
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
        className="mt-4 flex flex-col items-center gap-1.5">
        <p className="mcb-mono text-emerald-400/70 text-xs sm:text-sm tracking-widest break-all px-2 text-center">
          {origin ? `${origin.replace(/^https?:\/\//, "")}/mcbukaf/qr-tuzak` : "—"}
        </p>
        <div className="flex items-center gap-2">
          <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.4 }}
            className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="mcb-mono text-[10px] sm:text-xs text-emerald-400/70 tracking-widest">
            {total > 0
              ? `${total} kişi katıldı${lastAt ? ` · son: ${relTime(lastAt)}` : ""}`
              : "anket aktif · ilk katılım bekleniyor…"}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function QrRevealSlide({ ctx }: { ctx: SlideCtx }) {
  const { total } = useQrTrapPoll(ctx.isActive);
  const animated = useCountUp(String(total), 1200, 200);

  return (
    <div className="flex flex-col h-full px-4 sm:px-10 md:px-16 items-center justify-center text-center overflow-hidden relative">
      <motion.div className="absolute inset-0 mcb-stripes z-0"
        initial={{ opacity: 0 }} animate={{ opacity: [0.08, 0.18, 0.08] }} transition={{ repeat: Infinity, duration: 3 }} />

      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="relative z-10 mcb-tag mcb-mono text-rose-400/85 mb-3">
        ANKET DİYE DUYURDUM — AMA…
      </motion.p>

      <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.15 }}
        className="relative z-10 font-black mcb-mono tabular-nums leading-none"
        style={{
          fontSize: "clamp(5rem, 18vw, 16rem)",
          color: "#f43f5e",
          textShadow: "0 0 40px rgba(244,63,94,0.6), 0 0 120px rgba(244,63,94,0.3)",
          letterSpacing: "-0.04em",
        }}>
        {animated}
      </motion.div>

      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="relative z-10 mcb-h3 font-bold text-white mt-3 mb-2 max-w-4xl">
        kişi sahte bir QR&apos;a güvendi.
      </motion.p>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
        className="relative z-10 mcb-lead text-gray-300 max-w-3xl px-2">
        QR &nbsp;=&nbsp; <span className="text-rose-300">link</span>. &nbsp;Tıklamadan önce nereye gittiğini kontrol et.
      </motion.p>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
        className="relative z-10 mt-5 sm:mt-7 mcb-mono text-emerald-400/60 text-xs sm:text-sm tracking-widest">
        Bu sefer öğretti — bir sonrakinde 2,8 milyon TurkNet abonesi gibi olabilirsin.
      </motion.div>
    </div>
  );
}

/* ================================================================
   WHATSAPP SCAM SIM — chat oynar, sonra hack reveal
   ================================================================ */
type ChatMsg = { from: "them" | "you"; text: string; time: string };

const WA_MESSAGES: ChatMsg[] = [
  { from: "them", text: "Merhaba! TikTok ajansından arıyoruz — kampanyamızda yer almak ister misin?", time: "14:23" },
  { from: "them", text: "Günlük 800–2500 ₺ kazanırsın · sadece beğeni atacaksın", time: "14:23" },
  { from: "them", text: "İlk göreve başlamak için: bit.ly/gorev-2026", time: "14:24" },
  { from: "you", text: "tmm bakayım", time: "14:25" },
  { from: "them", text: "Tebrikler — 250 ₺ kazandın! Çekmek için 5.000 ₺ teminat gerekiyor", time: "14:26" },
];

function WhatsAppScamSim({ ctx }: { ctx: SlideCtx }) {
  const [msgs, setMsgs] = useState(0);
  const [phase, setPhase] = useState<"chat" | "hack">("chat");

  useEffect(() => {
    if (!ctx.isActive) { setMsgs(0); setPhase("chat"); return; }
  }, [ctx.isActive]);

  useEffect(() => {
    if (!ctx.isActive) return;
    if (phase === "chat" && msgs < WA_MESSAGES.length) {
      const t = setTimeout(() => setMsgs((p) => p + 1), 1700);
      return () => clearTimeout(t);
    }
    if (phase === "chat" && msgs >= WA_MESSAGES.length) {
      const t = setTimeout(() => setPhase("hack"), 2200);
      return () => clearTimeout(t);
    }
  }, [phase, msgs, ctx.isActive]);

  return (
    <div className="flex flex-col h-full px-3 sm:px-8 pt-1 pb-2 items-center min-h-0">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 sm:gap-3 mt-1 mb-2">
        <IconBadge icon={Smartphone} color="#25d366" size="clamp(1.75rem, 4vmin, 2.5rem)" strokeWidth={1.8} />
        <h2 className="mcb-h3 font-bold text-center">WhatsApp · İş Teklifi Tuzağı</h2>
      </motion.div>

      <div className="flex-1 min-h-0 w-full max-w-md flex items-center justify-center">
        <AnimatePresence mode="wait">
          {phase === "chat" && (
            <motion.div key="chat"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}
              className="w-full bg-[#0b141a] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <div className="bg-[#1f2c34] px-3 sm:px-4 py-2.5 flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-600 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 sm:w-5 sm:h-5 text-white" strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <p className="text-white font-medium text-sm truncate">+91 98XX XXXX XX</p>
                  <p className="text-emerald-400 text-[11px]">online</p>
                </div>
              </div>
              <div className="p-3 sm:p-4 space-y-2 min-h-[300px] sm:min-h-[340px]">
                {WA_MESSAGES.slice(0, msgs).map((msg, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${msg.from === "them"
                      ? "bg-[#1f2c34] text-gray-100 mr-auto" : "bg-[#005c4b] text-white ml-auto"}`}>
                    <p className="leading-snug">{msg.text}</p>
                    <p className="text-[10px] text-gray-400 text-right mt-1 mcb-mono">{msg.time}</p>
                  </motion.div>
                ))}
                {msgs < WA_MESSAGES.length && (
                  <div className="bg-[#1f2c34] text-gray-400 text-xs rounded-xl px-3 py-2 w-20 mr-auto mcb-mono">
                    <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }}>
                      yazıyor…
                    </motion.span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {phase === "hack" && (
            <motion.div key="hack"
              initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 130, damping: 14 }}
              className="w-full rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(244,63,94,0.12), rgba(244,63,94,0.04))",
                border: "1px solid rgba(244,63,94,0.4)",
                boxShadow: "0 0 40px rgba(244,63,94,0.25), inset 0 0 30px rgba(244,63,94,0.06)",
              }}>
              <motion.div className="absolute inset-0 mcb-stripes opacity-30"
                animate={{ opacity: [0.15, 0.35, 0.15] }} transition={{ repeat: Infinity, duration: 2.2 }} />
              <motion.div className="relative z-10 inline-flex mb-3"
                animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>
                <IconBadge icon={AlertOctagon} color="#f43f5e" size="clamp(2.75rem, 6vmin, 4rem)" strokeWidth={1.6} />
              </motion.div>
              <p className="relative z-10 mcb-h3 font-black mb-2"
                style={{ color: "#f43f5e", textShadow: "0 0 22px rgba(244,63,94,0.55)" }}>
                Hesabın Çalındı
              </p>
              <p className="relative z-10 mcb-body text-gray-200 leading-snug max-w-md mx-auto">
                Linke tıkladığın an WhatsApp QR girişin saldırgana geçti.
                Rehberindeki <strong className="text-rose-300">347 kişi</strong> şu anda aynı mesajı senden alıyor.
              </p>
              <p className="relative z-10 mcb-mono text-rose-400/85 text-xs sm:text-sm tracking-widest mt-4 uppercase">
                Tek bir tıklama. Bütün ağ.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ================================================================
   VISHING SIM — sahte savcılık telefon araması
   ================================================================ */
const VISHING_SCRIPT = [
  { weapon: "OTORİTE",  text: "İyi günler, ben Ankara Cumhuriyet Başsavcılığı'ndan Komiser Yılmaz." },
  { weapon: "KORKU",    text: "Adınıza açılmış bir soruşturma var. Hesabınızdan terör örgütüne para transferi yapılmış." },
  { weapon: "ACİLİYET", text: "15 dakika içinde ifadenizi alamazsak gözaltı kararı çıkacak." },
  { weapon: "İZOLASYON",text: "Konuşmamız gizli — aileniz, banka çalışanı, kimseyle paylaşamazsınız." },
  { weapon: "VURGUN",   text: "Şimdi tüm paranızı 'emanet hesabına' aktaracaksınız. ATM'ye gidin, ben telefonda kalıyorum." },
];

function fmtDuration(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function VishingSim({ ctx }: { ctx: SlideCtx }) {
  const [phase, setPhase] = useState<"ringing" | "call" | "hack">("ringing");
  const [linesShown, setLinesShown] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!ctx.isActive) { setPhase("ringing"); setLinesShown(0); setDuration(0); return; }
    setPhase("ringing"); setLinesShown(0); setDuration(0);
    const t = window.setTimeout(() => setPhase("call"), 1600);
    return () => window.clearTimeout(t);
  }, [ctx.isActive]);

  useEffect(() => {
    if (phase !== "call") return;
    const iv = window.setInterval(() => setDuration((d) => d + 1), 1000);
    return () => window.clearInterval(iv);
  }, [phase]);

  useEffect(() => {
    if (phase !== "call") return;
    if (linesShown < VISHING_SCRIPT.length) {
      const t = window.setTimeout(() => setLinesShown((p) => p + 1), 1900);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setPhase("hack"), 2200);
    return () => window.clearTimeout(t);
  }, [phase, linesShown]);

  return (
    <div className="flex flex-col h-full px-3 sm:px-8 pt-1 pb-2 items-center min-h-0">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 sm:gap-3 mt-1 mb-2">
        <IconBadge icon={Phone} color="#f43f5e" size="clamp(1.75rem, 4vmin, 2.5rem)" strokeWidth={1.8} />
        <h2 className="mcb-h3 font-bold text-center">Vishing · Sahte Savcılık Araması</h2>
      </motion.div>

      <div className="flex-1 min-h-0 w-full max-w-md flex items-center justify-center">
        <AnimatePresence mode="wait">
          {phase === "ringing" && (
            <motion.div key="ringing"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="w-full rounded-3xl bg-gradient-to-b from-zinc-800 to-zinc-900 shadow-2xl overflow-hidden p-6 text-center"
              style={{ border: "1px solid rgba(244,63,94,0.4)" }}>
              <p className="text-xs mcb-mono text-rose-300/85 uppercase tracking-[0.3em] mb-6">gelen arama</p>
              <motion.div
                animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-rose-500/20 mb-4"
                style={{ boxShadow: "0 0 40px rgba(244,63,94,0.5)" }}>
                <Phone className="w-12 h-12 text-rose-400" strokeWidth={1.6} />
              </motion.div>
              <p className="text-xl font-bold text-white mb-1">Ankara Cumhuriyet Başsavcılığı</p>
              <p className="mcb-mono text-rose-300/70 text-sm">+90 312 0X XX XX · numara doğrulanmadı</p>
            </motion.div>
          )}

          {phase === "call" && (
            <motion.div key="call"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="w-full rounded-3xl bg-zinc-900/80 shadow-2xl overflow-hidden"
              style={{ border: "1px solid rgba(244,63,94,0.35)", boxShadow: "0 0 28px rgba(244,63,94,0.2)" }}>
              <div className="bg-zinc-800/60 border-b border-white/5 px-4 py-3 flex items-center gap-3">
                <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }}
                  className="w-2 h-2 rounded-full bg-rose-500"
                  style={{ boxShadow: "0 0 8px #f43f5e" }} />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">Ankara Cumhuriyet Başsavcılığı</p>
                  <p className="mcb-mono text-rose-300/70 text-[10px] tabular-nums">CANLI · {fmtDuration(duration)}</p>
                </div>
                <span className="mcb-mono text-emerald-400 text-[10px] tracking-widest">CANLI YAZIYA DÖKÜLÜYOR</span>
              </div>
              <div className="px-3 sm:px-4 py-3 sm:py-4 space-y-2 min-h-[18rem] sm:min-h-[20rem]">
                {VISHING_SCRIPT.slice(0, linesShown).map((line, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-xl bg-zinc-800/60 border border-white/5 px-3 py-2">
                    <p className="mcb-mono text-[9px] text-rose-300/80 uppercase tracking-widest font-bold mb-1">
                      silah · {line.weapon}
                    </p>
                    <p className="text-sm text-zinc-100 leading-snug">&ldquo;{line.text}&rdquo;</p>
                  </motion.div>
                ))}
                {linesShown < VISHING_SCRIPT.length && (
                  <div className="rounded-xl bg-zinc-800/40 px-3 py-2 w-24 mcb-mono text-xs text-gray-400">
                    <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }}>
                      konuşuyor…
                    </motion.span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {phase === "hack" && (
            <motion.div key="hack"
              initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 130, damping: 14 }}
              className="w-full rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(244,63,94,0.14), rgba(244,63,94,0.04))",
                border: "1px solid rgba(244,63,94,0.4)",
                boxShadow: "0 0 40px rgba(244,63,94,0.25), inset 0 0 30px rgba(244,63,94,0.06)",
              }}>
              <motion.div className="absolute inset-0 mcb-stripes opacity-25"
                animate={{ opacity: [0.15, 0.35, 0.15] }} transition={{ repeat: Infinity, duration: 2.4 }} />
              <motion.div className="relative z-10 inline-flex mb-3"
                animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 0.9 }}>
                <IconBadge icon={AlertOctagon} color="#f43f5e" size="clamp(2.75rem, 6vmin, 4rem)" strokeWidth={1.6} />
              </motion.div>
              <p className="relative z-10 mcb-h3 font-black mb-3"
                style={{ color: "#f43f5e", textShadow: "0 0 22px rgba(244,63,94,0.55)" }}>
                Devlet asla telefonda para istemez.
              </p>
              <p className="relative z-10 mcb-body text-gray-200 max-w-md mx-auto leading-snug">
                Bu kalıp 5 silahı arka arkaya kullanır: <strong className="text-rose-300">otorite → korku → aciliyet → izolasyon → vurgun</strong>.
              </p>
              <p className="relative z-10 mcb-mono text-rose-300/85 text-xs sm:text-sm tracking-widest mt-4 uppercase">
                Kapat · Aile / banka 444'ünü kendin ara · İhbar: 155
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ================================================================
   JOURNAL RECOGNITION TEST — hangisi gerçek hangisi predatory
   ================================================================ */
function JournalRecognitionSlide({ ctx }: { ctx: SlideCtx }) {
  const [phase, setPhase] = useState<"reveal-cards" | "show-marks" | "verdict">("reveal-cards");

  useEffect(() => {
    if (!ctx.isActive) { setPhase("reveal-cards"); return; }
    setPhase("reveal-cards");
    const t1 = window.setTimeout(() => setPhase("show-marks"), 2400);
    const t2 = window.setTimeout(() => setPhase("verdict"), 4800);
    return () => { window.clearTimeout(t1); window.clearTimeout(t2); };
  }, [ctx.isActive]);

  const showMarks = phase === "show-marks" || phase === "verdict";
  const showVerdict = phase === "verdict";

  return (
    <div className="flex flex-col h-full px-4 sm:px-10 md:px-14 pt-1 pb-2 items-center overflow-hidden">
      <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
        className="mcb-tag mcb-mono text-purple-300/85 mb-1">
        AKADEMİK PHISHING · TANIMA TESTİ
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
        className="mcb-h2 font-black text-center mb-4 sm:mb-5">
        Hangisi gerçek dergi?
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5 w-full max-w-5xl">
        {/* Card A — Predatory */}
        <JournalCard
          delay={0.15}
          predatory
          showMarks={showMarks}
          showVerdict={showVerdict}
          name="International Journal of Advanced Research (IJAR)"
          publisher="IJAR Publishing Ltd · Mauritius"
          impact="RIIF: 8.4*"
          review="18 saat"
          apc="$349 APC"
          tags={[
            { text: "RIIF (sahte impact factor)", bad: true },
            { text: "18 saatte hakem onayı", bad: true },
            { text: "Mauritius / Nijerya merkezli", bad: true },
            { text: "$349 yayın ücreti baskısı", bad: true },
          ]}
        />
        {/* Card B — Real */}
        <JournalCard
          delay={0.3}
          predatory={false}
          showMarks={showMarks}
          showVerdict={showVerdict}
          name="IEEE Transactions on Information Forensics and Security"
          publisher="IEEE · Piscataway, NJ"
          impact="JCR Q1 · IF: 6.8 (Web of Science)"
          review="3–6 ay"
          apc="Open access opsiyonel"
          tags={[
            { text: "Web of Science indeksli", bad: false },
            { text: "Çift-kör hakem · 3-6 ay", bad: false },
            { text: "IEEE Society yayını", bad: false },
            { text: "Açık erişim ek ödeme isteğe bağlı", bad: false },
          ]}
        />
      </div>
    </div>
  );
}

function JournalCard({ name, publisher, impact, review, apc, tags, predatory, showMarks, showVerdict, delay }: {
  name: string; publisher: string; impact: string; review: string; apc: string;
  tags: { text: string; bad: boolean }[];
  predatory: boolean; showMarks: boolean; showVerdict: boolean; delay: number;
}) {
  const color = predatory ? "#a855f7" : "#00ff88";
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl bg-black/55 border backdrop-blur-sm overflow-hidden flex flex-col"
      style={{
        borderColor: `${color}40`,
        boxShadow: `0 0 24px ${color}20, inset 0 0 30px ${color}06`,
      }}>
      {/* Verdict overlay */}
      <AnimatePresence>
        {showVerdict && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute top-3 right-3 z-10">
            <motion.div
              initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: -6 }}
              transition={{ type: "spring", stiffness: 150, damping: 12 }}
              className="mcb-mono font-black px-3 py-1 rounded-md text-xs sm:text-sm uppercase tracking-widest"
              style={{
                color: predatory ? "#f43f5e" : "#00ff88",
                border: `2.5px solid ${predatory ? "#f43f5e" : "#00ff88"}`,
                background: "rgba(0,0,0,0.7)",
                boxShadow: `0 0 18px ${predatory ? "rgba(244,63,94,0.6)" : "rgba(0,255,136,0.6)"}`,
              }}>
              {predatory ? "PREDATORY" : "GERÇEK"}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-4 sm:px-5 py-3 border-b border-white/8">
        <p className="font-bold text-white leading-snug" style={{ fontSize: "clamp(0.9rem, 1.65vmin, 1.15rem)" }}>{name}</p>
        <p className="mcb-mono text-[10px] sm:text-xs text-gray-400 mt-1">{publisher}</p>
      </div>
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 border-b border-white/8 mcb-mono">
        <Stat label="Etki" value={impact} />
        <Stat label="Hakem" value={review} />
        <Stat label="Ücret" value={apc} />
      </div>
      <div className="px-4 sm:px-5 py-3 flex-1 space-y-1.5">
        {tags.map((t, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={showMarks ? { opacity: 1, x: 0 } : { opacity: 0.3, x: -4 }}
            transition={{ delay: showMarks ? i * 0.12 : 0, duration: 0.35 }}
            className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="inline-flex w-4 h-4 sm:w-5 sm:h-5 rounded items-center justify-center shrink-0"
              style={{
                background: showMarks ? (t.bad ? "rgba(244,63,94,0.2)" : "rgba(0,255,136,0.18)") : "rgba(255,255,255,0.05)",
                border: showMarks ? `1px solid ${t.bad ? "#f43f5e" : "#00ff88"}` : "1px solid rgba(255,255,255,0.1)",
              }}>
              {showMarks && (t.bad
                ? <XIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-rose-400" strokeWidth={3} />
                : <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400" strokeWidth={3} />)}
            </span>
            <span className={showMarks ? (t.bad ? "text-rose-200" : "text-emerald-200") : "text-gray-500"}>
              {t.text}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-[9px] sm:text-[10px] uppercase text-gray-500 tracking-widest mb-0.5">{label}</p>
      <p className="text-[10px] sm:text-xs text-white font-bold leading-tight">{value}</p>
    </div>
  );
}

/* ================================================================
   ATTACK RADAR — canlı saldırı sahnesi (TR şehir hotspot'ları)
   ================================================================ */
const RADAR_CITIES: { name: string; x: number; y: number; weight: number }[] = [
  { name: "İstanbul", x: 30, y: 24, weight: 5 },
  { name: "Ankara",   x: 52, y: 38, weight: 4 },
  { name: "İzmir",    x: 18, y: 50, weight: 3 },
  { name: "Bursa",    x: 30, y: 32, weight: 3 },
  { name: "Antalya",  x: 36, y: 62, weight: 2 },
  { name: "Manisa",   x: 20, y: 47, weight: 2 },
  { name: "Adana",    x: 60, y: 58, weight: 2 },
  { name: "Konya",    x: 48, y: 50, weight: 2 },
  { name: "Trabzon",  x: 72, y: 26, weight: 1 },
  { name: "Gaziantep",x: 67, y: 56, weight: 2 },
  { name: "Erzurum",  x: 80, y: 32, weight: 1 },
  { name: "Diyarbakır",x: 75, y: 50, weight: 1 },
];

const ATTACK_TYPES = [
  { tag: "PHISHING",   color: "#f43f5e" },
  { tag: "RANSOMWARE", color: "#a855f7" },
  { tag: "DDoS",       color: "#fb923c" },
  { tag: "BRUTE-FORCE",color: "#22d3ee" },
  { tag: "DEEPFAKE",   color: "#ec4899" },
  { tag: "SMS-PHISH",  color: "#fbbf24" },
];

type RadarAttack = { id: number; city: string; type: typeof ATTACK_TYPES[number]; at: number; cx: number; cy: number };

function AttackRadarSlide({ ctx }: { ctx: SlideCtx }) {
  const [attacks, setAttacks] = useState<RadarAttack[]>([]);
  const [counter, setCounter] = useState(0);
  const idRef = useRef(0);

  useEffect(() => {
    if (!ctx.isActive) { setAttacks([]); setCounter(0); idRef.current = 0; return; }
    const weighted: typeof RADAR_CITIES = [];
    RADAR_CITIES.forEach((c) => { for (let i = 0; i < c.weight; i++) weighted.push(c); });

    const iv = window.setInterval(() => {
      const city = weighted[Math.floor(Math.random() * weighted.length)];
      const type = ATTACK_TYPES[Math.floor(Math.random() * ATTACK_TYPES.length)];
      idRef.current += 1;
      const att: RadarAttack = { id: idRef.current, city: city.name, type, at: Date.now(), cx: city.x, cy: city.y };
      setAttacks((prev) => [att, ...prev].slice(0, 7));
      setCounter((n) => n + 1);
    }, 600);
    return () => window.clearInterval(iv);
  }, [ctx.isActive]);

  return (
    <div className="flex flex-col h-full px-3 sm:px-8 pt-1 pb-2 min-h-0">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between gap-3 mt-1 mb-3 flex-wrap">
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.1 }}
            className="w-2.5 h-2.5 rounded-full bg-rose-500"
            style={{ boxShadow: "0 0 12px #f43f5e" }} />
          <span className="mcb-mono text-rose-300 text-[10px] sm:text-xs uppercase tracking-[0.3em]">CANLI SALDIRI · TÜRKİYE</span>
        </div>
        <div className="mcb-mono text-emerald-400/85 text-[10px] sm:text-xs tabular-nums">
          {counter.toString().padStart(4, "0")} olay · son 60 sn
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-3 sm:gap-5 flex-1 min-h-0">
        {/* Radar visualization */}
        <div className="relative rounded-2xl overflow-hidden bg-black/55 border border-emerald-500/20"
          style={{ boxShadow: "0 0 30px rgba(0,255,136,0.12), inset 0 0 60px rgba(0,255,136,0.04)" }}>
          <svg viewBox="0 0 100 80" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            {/* concentric radar rings */}
            {[10, 22, 34, 46].map((r, i) => (
              <motion.circle key={r} cx="48" cy="42" r={r}
                fill="none" stroke="rgba(0,255,136,0.18)" strokeWidth="0.15"
                animate={{ opacity: [0.15, 0.35, 0.15] }}
                transition={{ repeat: Infinity, duration: 3 + i * 0.3, ease: "easeInOut" }} />
            ))}
            {/* Crosshair */}
            <line x1="0" y1="42" x2="100" y2="42" stroke="rgba(0,255,136,0.1)" strokeWidth="0.1" />
            <line x1="48" y1="0" x2="48" y2="80" stroke="rgba(0,255,136,0.1)" strokeWidth="0.1" />
            {/* Sweep beam */}
            <motion.g animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              style={{ transformOrigin: "48px 42px" }}>
              <defs>
                <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(0,255,136,0.4)" />
                  <stop offset="100%" stopColor="rgba(0,255,136,0)" />
                </linearGradient>
              </defs>
              <path d="M 48 42 L 94 42 A 46 46 0 0 0 84 13 Z" fill="url(#sweep)" />
            </motion.g>
            {/* City dots */}
            {RADAR_CITIES.map((c) => (
              <g key={c.name}>
                <circle cx={c.x} cy={c.y} r="0.6"
                  fill="rgba(0,255,136,0.7)" />
                <text x={c.x} y={c.y - 1.5}
                  className="mcb-mono"
                  fontSize="1.5" fill="rgba(0,255,136,0.55)" textAnchor="middle"
                  style={{ pointerEvents: "none" }}>
                  {c.name}
                </text>
              </g>
            ))}
            {/* Attack pulses */}
            <AnimatePresence>
              {attacks.map((a) => (
                <motion.g key={a.id}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 2.4, ease: "easeOut" }}>
                  <motion.circle cx={a.cx} cy={a.cy}
                    initial={{ r: 0.5 }} animate={{ r: 4 }} transition={{ duration: 2.4, ease: "easeOut" }}
                    fill="none" stroke={a.type.color} strokeWidth="0.25" />
                  <motion.circle cx={a.cx} cy={a.cy}
                    initial={{ r: 0.4, opacity: 1 }} animate={{ r: 1.4, opacity: 0.7 }} transition={{ duration: 0.4 }}
                    fill={a.type.color} />
                </motion.g>
              ))}
            </AnimatePresence>
          </svg>
        </div>

        {/* Attack log feed */}
        <div className="rounded-2xl bg-black/60 border border-rose-500/30 backdrop-blur-sm overflow-hidden flex flex-col"
          style={{ boxShadow: "0 0 24px rgba(244,63,94,0.18)" }}>
          <div className="px-3 py-2 border-b border-white/10 bg-black/40">
            <span className="mcb-mono text-rose-300 text-[10px] uppercase tracking-widest font-bold">CANLI LOG</span>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto p-2 space-y-1.5">
            <AnimatePresence initial={false}>
              {attacks.map((a) => {
                const hh = new Date(a.at).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
                return (
                  <motion.div key={a.id}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ type: "spring", stiffness: 200, damping: 22 }}
                    className="flex items-center gap-2 rounded-md px-2.5 py-1.5"
                    style={{
                      background: `${a.type.color}12`,
                      border: `1px solid ${a.type.color}35`,
                    }}>
                    <span className="mcb-mono text-[9px] tabular-nums" style={{ color: `${a.type.color}aa` }}>{hh}</span>
                    <span className="mcb-mono font-bold text-[10px] uppercase tracking-widest" style={{ color: a.type.color }}>
                      {a.type.tag}
                    </span>
                    <span className="mcb-mono text-[10px] text-white/85 truncate ml-auto">{a.city}</span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   DATA LEAK TIMELINE — TR sızıntıları yatay timeline
   ================================================================ */
const LEAKS: { year: string; name: string; count: string; detail: string; color: string }[] = [
  { year: "2022", name: "108M TC İddiası",    count: "108M",  detail: "Bakan kısmen onayladı · pandemi dönemi sızıntısı",  color: "#fbbf24" },
  { year: "2024", name: "215K+ saldırı",      count: "215K",  detail: "USOM yıllık rapor · işletmecilerden bildirim",        color: "#f97316" },
  { year: "2025-03", name: "TurkNet",         count: "2.8M",  detail: "CEO dahil · TC + adres + pasaport · şirket önce 244K dedi", color: "#ef4444" },
  { year: "2025-05", name: "Antalya Otelleri", count: "—",     detail: "Turizm sektörü ransomware dalgası · BTK uyarısı",   color: "#22d3ee" },
  { year: "2025-06", name: "16 Milyar Parola",count: "16B",   detail: "Tarihin en büyük credential dump'ı · TR portalları dahil", color: "#a855f7" },
  { year: "2025",    name: "3.3M Mülteci",     count: "3.3M",  detail: "Kişisel veri + pasaport kopyaları",                   color: "#ec4899" },
  { year: "2026-Q1", name: "Baydöner",         count: "1.5M",  detail: "Müşteri kayıtları · şikayetvar 212K · ardı ardına",   color: "#00ff88" },
];

function DataLeakTimelineSlide() {
  return (
    <div className="flex flex-col h-full px-4 sm:px-10 md:px-14 pt-2 pb-3 overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center gap-2.5 sm:gap-3 mb-1">
        <IconBadge icon={HardDrive} color="#22d3ee" size="clamp(1.5rem, 3.4vmin, 2rem)" strokeWidth={1.6} />
        <h2 className="mcb-h3 font-bold text-center">TR Sızıntı Zaman Çizelgesi</h2>
      </motion.div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}
        className="mcb-meta text-gray-400 text-center mb-3">
        Hiçbir kurum &ldquo;hiçbir şey çalınmadı&rdquo; diyemiyor.
      </motion.p>

      <div className="flex-1 min-h-0 w-full max-w-6xl mx-auto flex items-center justify-center">
        <div className="w-full flex items-stretch gap-1 sm:gap-1.5 overflow-x-auto px-1">
          {LEAKS.map((leak, i) => {
            const above = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: above ? -12 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.13, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 min-w-[7.5rem] sm:min-w-[8.5rem] flex flex-col items-stretch"
              >
                {/* Above card slot */}
                <div className="h-[8.5rem] sm:h-[10rem] flex">
                  {above && <LeakCard leak={leak} />}
                </div>

                {/* Timeline dot row */}
                <div className="relative h-2.5 my-1 flex items-center justify-center">
                  {/* Line segment (extends to siblings) */}
                  <div
                    className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px]"
                    style={{
                      background: `linear-gradient(90deg, ${i === 0 ? "transparent" : "rgba(34,211,238,0.4)"}, ${leak.color}, ${i === LEAKS.length - 1 ? "transparent" : "rgba(34,211,238,0.4)"})`,
                    }}
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.25 + i * 0.13 + 0.2, type: "spring", stiffness: 200, damping: 12 }}
                    className="relative rounded-full"
                    style={{
                      width: "clamp(0.7rem, 1.4vmin, 1rem)",
                      height: "clamp(0.7rem, 1.4vmin, 1rem)",
                      background: leak.color,
                      boxShadow: `0 0 14px ${leak.color}, 0 0 28px ${leak.color}80`,
                      border: "2px solid #02050a",
                    }}
                  />
                </div>

                {/* Below card slot */}
                <div className="h-[8.5rem] sm:h-[10rem] flex">
                  {!above && <LeakCard leak={leak} />}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function LeakCard({ leak }: { leak: typeof LEAKS[number] }) {
  return (
    <div
      className="w-full rounded-lg bg-black/55 border backdrop-blur-sm overflow-hidden flex flex-col"
      style={{
        borderColor: `${leak.color}40`,
        boxShadow: `0 0 14px ${leak.color}25, inset 0 0 22px ${leak.color}08`,
        padding: "clamp(0.5rem, 1.3vmin, 0.8rem)",
      }}
    >
      <p
        className="mcb-mono text-[9px] sm:text-[10px] uppercase tracking-widest font-bold mb-0.5"
        style={{ color: leak.color }}
      >
        {leak.year}
      </p>
      <p
        className="font-black mcb-mono tabular-nums leading-none mb-1"
        style={{
          color: leak.color,
          fontSize: "clamp(1.05rem, 2.3vmin, 1.7rem)",
          textShadow: `0 0 12px ${leak.color}40`,
        }}
      >
        {leak.count}
      </p>
      <p className="font-bold text-white text-[10px] sm:text-xs mb-0.5 leading-tight">{leak.name}</p>
      <p className="mcb-meta text-gray-400 text-[9px] sm:text-[10px] leading-snug">{leak.detail}</p>
    </div>
  );
}

/* ================================================================
   THREE-SECOND RULE — cinematic countdown + sahte SMS demo
   ================================================================ */
function ThreeSecondRuleSlide({ ctx }: { ctx: SlideCtx }) {
  const [phase, setPhase] = useState<"counting" | "marked" | "saved">("counting");
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (!ctx.isActive) { setPhase("counting"); setCount(3); return; }
    setPhase("counting"); setCount(3);
    const iv = setInterval(() => {
      setCount((c) => {
        if (c <= 1) { clearInterval(iv); return 0; }
        return c - 1;
      });
    }, 950);
    const markT = window.setTimeout(() => setPhase("marked"), 3100);
    const saveT = window.setTimeout(() => setPhase("saved"), 5400);
    return () => { clearInterval(iv); window.clearTimeout(markT); window.clearTimeout(saveT); };
  }, [ctx.isActive]);

  const isCounting = phase === "counting";
  const showMarks = phase === "marked" || phase === "saved";
  const saved = phase === "saved";

  return (
    <div className="flex flex-col h-full px-4 sm:px-10 md:px-14 pt-1 pb-2 items-center justify-center overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
        className="mcb-tag mcb-mono text-emerald-400/85 mb-2">
        3 SANİYE KURALI
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-6 sm:gap-10 w-full max-w-5xl items-center">
        {/* Sahte SMS preview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl bg-zinc-900/70 backdrop-blur-sm overflow-hidden"
          style={{
            border: saved ? "1px solid rgba(0,255,136,0.5)" : "1px solid rgba(244,63,94,0.45)",
            boxShadow: saved ? "0 0 32px rgba(0,255,136,0.25)" : "0 0 32px rgba(244,63,94,0.22)",
          }}>
          <div className="bg-zinc-800/80 border-b border-zinc-700 px-4 py-2.5 flex items-center gap-2.5">
            <span className="inline-flex w-7 h-7 rounded-full bg-zinc-700 items-center justify-center">
              <MessageSquare className="w-3.5 h-3.5 text-zinc-400" strokeWidth={2} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="mcb-mono text-zinc-200 text-xs sm:text-sm truncate">
                {showMarks ? (
                  <>
                    <SpotMark active>+90 555 0X XX XX</SpotMark>
                  </>
                ) : "+90 555 0X XX XX"}
              </p>
              <p className="mcb-mono text-[10px] text-zinc-500">SMS · 14:23</p>
            </div>
          </div>
          <div className="px-4 sm:px-5 py-4 sm:py-5 text-sm sm:text-base text-zinc-100 leading-relaxed space-y-2">
            <p>
              PTT KARGO: Gönderiniz gümrükte bekliyor.{" "}
              {showMarks ? (
                <SpotMark active>24 saat içinde</SpotMark>
              ) : "24 saat içinde"}{" "}
              <strong>24,90 ₺</strong> ödenmezse iade edilecektir.
            </p>
            <p>
              {showMarks ? (
                <SpotMark active mono>hxxps://ptt-tr-kargo.com/ode</SpotMark>
              ) : <span className="mcb-mono text-emerald-400/85">hxxps://ptt-tr-kargo.com/ode</span>}
            </p>
          </div>

          {/* Decision overlay */}
          <AnimatePresence>
            {saved && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(244,63,94,0.18), rgba(244,63,94,0.04))",
                  backdropFilter: "blur(2px)",
                }}>
                <motion.div
                  initial={{ scale: 0, rotate: -15 }} animate={{ scale: 1, rotate: -8 }}
                  transition={{ type: "spring", stiffness: 130, damping: 12 }}
                  className="mcb-mono font-black px-5 py-2 rounded-md"
                  style={{
                    color: "#f43f5e",
                    border: "3px solid #f43f5e",
                    background: "rgba(0,0,0,0.7)",
                    fontSize: "clamp(1.3rem, 3vw, 2.2rem)",
                    boxShadow: "0 0 22px rgba(244,63,94,0.6)",
                  }}>
                  TIKLAMA
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Right: countdown + lesson */}
        <div className="flex flex-col items-center md:items-start">
          <AnimatePresence mode="wait">
            {isCounting && (
              <motion.div key={`cnt-${count}`}
                initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.6 }}
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
                className="font-black mcb-mono tabular-nums leading-none mb-3"
                style={{
                  fontSize: "clamp(5rem, 14vw, 11rem)",
                  color: "#00ff88",
                  textShadow: "0 0 40px rgba(0,255,136,0.6), 0 0 100px rgba(0,255,136,0.3)",
                }}>
                {count > 0 ? count : "0"}
              </motion.div>
            )}
            {showMarks && (
              <motion.div key="markedBlock"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-3 space-y-2 w-full">
                <MarkLine label="Kişisel numara" color="#f43f5e" />
                <MarkLine label="Yanlış alan adı" color="#fb923c" />
                <MarkLine label="Aciliyet baskısı" color="#fbbf24" />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.h2
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mcb-h3 font-black text-left md:text-left text-center max-w-sm"
            style={{
              color: saved ? "#00ff88" : "#fff",
              textShadow: saved ? "0 0 22px rgba(0,255,136,0.4)" : "none",
            }}>
            {saved ? "Yakaladın." : isCounting ? "Dur. Bak." : "İşaretleri gör."}
          </motion.h2>
          <p className="mcb-meta text-gray-400 mt-2 max-w-sm text-left md:text-left text-center">
            {saved
              ? "3 saniye + 3 ipucu = kapatılan link."
              : isCounting
                ? "Tıklamadan önce mesaja bir kez daha bak."
                : "Her oltalama mesajında bu üç işaret var."}
          </p>
        </div>
      </div>
    </div>
  );
}

function SpotMark({ children, active, mono }: { children: React.ReactNode; active: boolean; mono?: boolean }) {
  return (
    <motion.span
      animate={active ? { backgroundColor: "rgba(244,63,94,0.22)" } : { backgroundColor: "rgba(244,63,94,0)" }}
      transition={{ duration: 0.4 }}
      className={`rounded px-1 ${active ? "outline outline-1 outline-rose-400/70 text-rose-200" : ""} ${mono ? "mcb-mono" : ""}`}>
      {children}
    </motion.span>
  );
}

function MarkLine({ label, color }: { label: string; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 14 }}
      className="flex items-center gap-2.5">
      <span className="inline-flex w-5 h-5 rounded-full items-center justify-center shrink-0"
        style={{ background: `${color}25`, border: `1px solid ${color}` }}>
        <Check className="w-3 h-3" style={{ color }} strokeWidth={3} />
      </span>
      <span className="mcb-meta font-bold" style={{ color }}>{label}</span>
    </motion.div>
  );
}

/* ================================================================
   PHISHING TYPES — oltalama tür kataloğu
   ================================================================ */
function PhishingTypesSlide() {
  const types: { icon: IconType; name: string; sub: string; text: string; color: string }[] = [
    { icon: MessageSquare, name: "Smishing", sub: "SMS oltalama", text: "Kargo, banka, e-Devlet adına sahte mesaj — TR'de en yaygın varyant.", color: "#ef4444" },
    { icon: Mail, name: "Phishing", sub: "E-posta oltalama", text: "Sahte gönderici + sahte link · klasik &ldquo;şifrenizi sıfırlayın&rdquo;.", color: "#f97316" },
    { icon: Phone, name: "Vishing", sub: "Sesli oltalama", text: "Savcı, polis, BTK adına arama — 50 M ₺'lik çete bu yöntemle çalıştı.", color: "#fbbf24" },
    { icon: QrCode, name: "Quishing", sub: "QR oltalama", text: "Restoran menü, anket, sahte park ödemesi — taradığın siteyi okumadan.", color: "#22d3ee" },
    { icon: Target, name: "Spear Phishing", sub: "Hedefli", text: "İsim, pozisyon, proje detayıyla — akademisyen, muhasebe çalışanı vurulur.", color: "#a855f7" },
    { icon: Crown, name: "Whaling", sub: "CEO sahtekarlığı", text: "Patron sesi/maili klonlanır, finanstan acil havale istenir — Arup 25 M $.", color: "#ec4899" },
  ];

  return (
    <div className="flex flex-col h-full px-4 sm:px-10 md:px-16 pt-1 pb-2 overflow-y-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center gap-3 sm:gap-4 mt-1 mb-2 flex-wrap">
        <IconBadge icon={Fish} color="#f43f5e" size="clamp(2rem, 4.5vmin, 3rem)" strokeWidth={1.6} />
        <h2 className="mcb-h2 font-bold text-center">Oltalama Türleri</h2>
      </motion.div>
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="h-[2px] rounded-full mx-auto mb-4 sm:mb-6"
        style={{
          width: "min(14rem, 38vw)",
          background: "linear-gradient(90deg, transparent, rgba(244,63,94,0.7), transparent)",
        }} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full max-w-6xl mx-auto">
        {types.map((t, i) => {
          const Ico = t.icon;
          return (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.25 + i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl bg-white/[0.025] backdrop-blur-sm overflow-hidden relative"
              style={{
                border: `1px solid ${t.color}40`,
                boxShadow: `0 0 18px ${t.color}18, inset 0 0 30px ${t.color}06`,
                padding: "clamp(0.75rem, 1.8vmin, 1.25rem) clamp(0.85rem, 2vmin, 1.4rem)",
              }}
            >
              <div
                className="absolute top-0 left-0 h-[2px] origin-left"
                style={{
                  width: "100%",
                  background: `linear-gradient(90deg, transparent, ${t.color}, transparent)`,
                  boxShadow: `0 0 10px ${t.color}`,
                }}
              />
              <div className="flex items-center gap-2.5 sm:gap-3 mb-1.5 sm:mb-2">
                <div
                  className="inline-flex items-center justify-center shrink-0"
                  style={{ width: "clamp(1.5rem, 3.5vmin, 2.2rem)", height: "clamp(1.5rem, 3.5vmin, 2.2rem)", color: t.color }}
                >
                  <Ico width="100%" height="100%" strokeWidth={1.7} />
                </div>
                <div className="min-w-0">
                  <p className="font-black truncate" style={{ color: t.color, fontSize: "clamp(1rem, 2.1vmin, 1.5rem)", textShadow: `0 0 12px ${t.color}40` }}>
                    {t.name}
                  </p>
                  <p className="mcb-mono text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest truncate">{t.sub}</p>
                </div>
              </div>
              <p className="mcb-meta text-gray-200 leading-snug" dangerouslySetInnerHTML={{ __html: t.text }} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ================================================================
   ACADEMIC EMAIL SIM — animasyonlu akademik phishing
   ================================================================ */
type AcademicEmailConfig = {
  title: string;
  icon?: IconType;
  from: string;
  subject: string;
  preview: string;
  body: string[];
  highlight: (line: string) => boolean;
  payLabel: string;
  accent: string;
  accentRgb: string;
  accentText: string;
  hackHeadline: string;
  hackPoints: { lead: string; rest: string }[];
  hackFooter: string;
};

const PJ_CONFIG: AcademicEmailConfig = {
  title: "Akademik Phishing · Predatory Dergi",
  from: "editor@ijar-publishing.net",
  subject: "[ACCEPTED] Your Manuscript IJAR-2026-44293",
  preview: "We are pleased to inform you that your paper has been accepted…",
  body: [
    "Dear Esteemed Researcher,",
    "Manuscript ID: IJAR-2026-44293 — ACCEPTED.",
    "Peer review completed in 18 hours · Impact Factor (RIIF): 8.4*",
    "Article Processing Charge: $349 USD",
    "Click below to complete payment and proceed to publication.",
  ],
  highlight: (line) => line.startsWith("Article Processing"),
  payLabel: "Pay $349 & Publish →",
  accent: "#a855f7",
  accentRgb: "168,85,247",
  accentText: "text-purple-300",
  hackHeadline: "Predatory Dergi",
  hackPoints: [
    { lead: "18 saatte hakem onayı", rest: " diye bir şey yok. Bu süre hakem değil, kredi kartı bekleme süresi." },
    { lead: "RIIF / GIF / IIIF", rest: " uydurma 'impact factor'lar — Web of Science / Scopus değil." },
    { lead: "Ödeme yapan", rest: " akademik özgeçmişe sayılmaz, alan dışı atıf almaz, ÜAK reddeder." },
  ],
  hackFooter: "Kontrol et: DOAJ · Beall's List · ULAKBİM TR-Dizin",
};

const YOK_CONFIG: AcademicEmailConfig = {
  title: "Akademik Phishing · YÖK Burs Bildirimi",
  from: "bilgi@yok-burs2026.gov-tr.com",
  subject: "[ONAY] 2026/2027 Lisans Bursu Hesabınıza Yatırılacak",
  preview: "Aylık 5.800 ₺ tutarındaki burs ödemeniz onaylandı…",
  body: [
    "Sayın Öğrencimiz,",
    "2026/2027 dönemi için tarafınıza Yüksek Lisans / Lisans Bursu tahsis edilmiştir.",
    "Aylık tutar: 5.800 ₺ · IBAN'ınızı sistem üzerinde doğrulamanız gerekmektedir.",
    "Doğrulama Hizmet Bedeli: 49,90 ₺ (banka kesintisi, geri iade edilecektir).",
    "İşlemi 24 saat içinde tamamlamazsanız hak kaybı yaşarsınız.",
  ],
  highlight: (line) => line.startsWith("Doğrulama Hizmet"),
  payLabel: "IBAN'ı Doğrula · 49,90 ₺ →",
  accent: "#22d3ee",
  accentRgb: "34,211,238",
  accentText: "text-cyan-300",
  hackHeadline: "Sahte YÖK Bursu",
  hackPoints: [
    { lead: "YÖK / KYK", rest: " burs doğrulaması için ücret istemez — “hizmet bedeli” uydurma." },
    { lead: "Resmi alan adı", rest: " yok.gov.tr veya kyk.gov.tr — “.gov-tr.com” sahte alan adıdır." },
    { lead: "“24 saat içinde”", rest: " aciliyet kalıbı — saldırgan düşünmenize fırsat vermek istemez." },
  ],
  hackFooter: "Doğru kanal: e-Devlet · KYK uygulaması · 444 1 962",
};

const WHALING_CONFIG: AcademicEmailConfig = {
  title: "Phishing · CEO Vurgunu (Whaling)",
  icon: Crown,
  from: "celebiler.cem@turknet-ofis.com",
  subject: "[ACİL & GİZLİ] Bugün öğleden önce transfer · onayım sende",
  preview: "Ahmet, acil bir avans göndermen lazım, ben telefonda erişimde değilim…",
  body: [
    "Sevgili Ahmet,",
    "Bugün öğleden önce halletmemiz gereken bir transfer var.",
    "Yeni iş anlaşmamız için tedarikçimize 38.500 ₺ avans göndermen gerek.",
    "Avukatla görüşmedeyim, telefonda erişimim yok. Cumhurbaşkanlığı için dışarıdayım.",
    "IBAN ektedir. Konu kimseyle paylaşılmasın — sadece sana güveniyorum.",
  ],
  highlight: (line) => line.includes("38.500"),
  payLabel: "Transferi Onayla · 38.500 ₺ →",
  accent: "#f97316",
  accentRgb: "249,115,22",
  accentText: "text-orange-300",
  hackHeadline: "CEO Vurgunu (Whaling)",
  hackPoints: [
    { lead: "Yetkili (CEO/CFO)", rest: " e-postasının kaynağı kontrol edilmeli — alan adı genelde uydurma (-ofis.com, -direktor.com vb.)." },
    { lead: "“Sadece sana güveniyorum”", rest: " — manipülasyon kalıbı; gerçek yöneticiler süreç dışı talep yapmaz." },
    { lead: "Acil + Gizli + Nakit", rest: " — bu üçü bir aradaysa: telefonla yöneticiyi DOĞRULA." },
  ],
  hackFooter: "Hong Kong · Arup şirketi 2024'te bu yolla 25,6 milyon $ kaybetti.",
};

const CONF_CONFIG: AcademicEmailConfig = {
  title: "Akademik Phishing · Sahte Konferans Davetiyesi",
  from: "secretariat@icas-bangkok-2026.com",
  subject: "[KEYNOTE INVITATION] ICAS-2026 Bangkok · You are selected",
  preview: "We are honored to invite you as a keynote speaker for ICAS-2026…",
  body: [
    "Dear Distinguished Professor,",
    "We are honored to invite you as KEYNOTE SPEAKER at the 16th International Conference on Advanced Studies (ICAS-2026), Bangkok.",
    "Selected from 12,000 researchers based on your outstanding contributions.",
    "Registration Fee: $695 USD · Accommodation included for keynote speakers.",
    "Confirm participation within 48 hours.",
  ],
  highlight: (line) => line.startsWith("Registration Fee"),
  payLabel: "Confirm Keynote · $695 →",
  accent: "#ec4899",
  accentRgb: "236,72,153",
  accentText: "text-pink-300",
  hackHeadline: "Vampir Konferans",
  hackPoints: [
    { lead: "Gerçek konferanslar", rest: " 'random keynote' daveti yollamaz — seçim süreci hakem ve komite ile yürür." },
    { lead: "'12.000 araştırmacı arasından seçildiniz'", rest: " — uydurma; e-posta listesini satın alıp herkese aynı şablonu atıyorlar." },
    { lead: "Bangkok / Dubai / Roma", rest: " odalı konferansların çoğu paid-talk fabrikası, ÜAK akademik teşvike saymaz." },
  ],
  hackFooter: "Kontrol et: think.checksubmit.org · WikiCFP · resmi dernek sayfası",
};

function AcademicEmailSim({ ctx, config }: { ctx: SlideCtx; config: AcademicEmailConfig }) {
  const [phase, setPhase] = useState<"inbox" | "open" | "hack">("inbox");
  const [lines, setLines] = useState(0);

  useEffect(() => {
    if (!ctx.isActive) { setPhase("inbox"); setLines(0); return; }
    setPhase("inbox");
    setLines(0);
  }, [ctx.isActive]);

  useEffect(() => {
    if (!ctx.isActive) return;
    if (phase === "inbox") {
      const t = setTimeout(() => setPhase("open"), 1600);
      return () => clearTimeout(t);
    }
    if (phase === "open" && lines < config.body.length) {
      const t = setTimeout(() => setLines((p) => p + 1), 1100);
      return () => clearTimeout(t);
    }
    if (phase === "open" && lines >= config.body.length) {
      const t = setTimeout(() => setPhase("hack"), 2200);
      return () => clearTimeout(t);
    }
  }, [phase, lines, ctx.isActive, config.body.length]);

  return (
    <div className="flex flex-col h-full px-3 sm:px-8 pt-1 pb-2 items-center min-h-0">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 sm:gap-3 mt-1 mb-2">
        <IconBadge icon={config.icon ?? GraduationCap} color={config.accent} size="clamp(1.75rem, 4vmin, 2.5rem)" strokeWidth={1.8} />
        <h2 className="mcb-h3 font-bold text-center">{config.title}</h2>
      </motion.div>

      <div className="flex-1 min-h-0 w-full max-w-2xl flex items-center justify-center">
        <AnimatePresence mode="wait">
          {phase === "inbox" && (
            <motion.div key="inbox"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}
              className="w-full rounded-2xl bg-white shadow-2xl overflow-hidden border border-zinc-200">
              <div className="bg-zinc-50 border-b border-zinc-200 px-4 py-3 flex items-center gap-3">
                <Inbox className="w-5 h-5 text-zinc-500" strokeWidth={2} />
                <span className="text-zinc-700 font-medium text-sm">Gelen Kutusu</span>
                <span className="ml-auto inline-flex items-center justify-center text-[10px] font-bold w-5 h-5 rounded-full bg-rose-500 text-white">1</span>
              </div>
              <motion.div
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 120, damping: 14 }}
                className="px-4 py-3 border-b border-zinc-100 bg-blue-50/40">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="mcb-mono text-[11px] text-zinc-500 truncate">{config.from}</span>
                  <span className="mcb-mono text-[10px] text-zinc-400 ml-auto">şimdi</span>
                </div>
                <p className="text-sm font-bold text-zinc-900 truncate">{config.subject}</p>
                <p className="text-xs text-zinc-500 truncate mt-0.5">{config.preview}</p>
              </motion.div>
            </motion.div>
          )}

          {phase === "open" && (
            <motion.div key="open"
              initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="w-full rounded-2xl bg-white shadow-2xl overflow-hidden border border-zinc-200">
              <div className="bg-zinc-50 border-b border-zinc-200 px-4 py-2.5 flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-zinc-500 rotate-180" />
                <span className="text-zinc-600 text-xs">Gelen Kutusu</span>
              </div>
              <div className="px-4 sm:px-5 pt-3 pb-2 border-b border-zinc-100">
                <p className="text-base sm:text-lg font-bold text-zinc-900 leading-snug mb-1.5">
                  {config.subject}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                  <Mail className="w-3.5 h-3.5" strokeWidth={2} />
                  <span className="mcb-mono">{config.from}</span>
                </div>
              </div>
              <div className="px-4 sm:px-5 py-3 sm:py-4 space-y-2 text-sm text-zinc-800 min-h-[14rem] sm:min-h-[16rem]">
                {config.body.slice(0, lines).map((line, i) => (
                  <motion.p key={i}
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`leading-snug ${config.highlight(line) ? "font-bold text-rose-600 bg-rose-50 px-2.5 py-1.5 rounded-md border border-rose-200" : ""}`}>
                    {line}
                  </motion.p>
                ))}
                {lines >= config.body.length && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="pt-2">
                    <motion.div
                      animate={{ boxShadow: ["0 0 0 0 rgba(34,197,94,0.5)", "0 0 0 10px rgba(34,197,94,0)"] }}
                      transition={{ repeat: Infinity, duration: 1.4 }}
                      className="inline-block rounded-md">
                      <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm px-5 py-2.5 rounded-md shadow">
                        {config.payLabel}
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {phase === "hack" && (
            <motion.div key="hack"
              initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 130, damping: 14 }}
              className="w-full rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, rgba(${config.accentRgb},0.14), rgba(${config.accentRgb},0.04))`,
                border: `1px solid rgba(${config.accentRgb},0.4)`,
                boxShadow: `0 0 40px rgba(${config.accentRgb},0.25), inset 0 0 30px rgba(${config.accentRgb},0.06)`,
              }}>
              <motion.div className="absolute inset-0 mcb-stripes opacity-25"
                animate={{ opacity: [0.15, 0.3, 0.15] }} transition={{ repeat: Infinity, duration: 2.4 }} />

              <motion.div className="relative z-10 inline-flex mb-3"
                animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 0.9 }}>
                <IconBadge icon={AlertOctagon} color={config.accent} size="clamp(2.75rem, 6vmin, 4rem)" strokeWidth={1.6} />
              </motion.div>

              <p className="relative z-10 mcb-h3 font-black mb-3"
                style={{ color: config.accent, textShadow: `0 0 22px rgba(${config.accentRgb},0.55)` }}>
                {config.hackHeadline}
              </p>

              <div className="relative z-10 max-w-xl mx-auto space-y-2.5 text-left">
                {config.hackPoints.map((p, i) => (
                  <p key={i} className="mcb-body text-gray-200 leading-snug">
                    <strong className={config.accentText}>{p.lead}</strong>{p.rest}
                  </p>
                ))}
              </div>

              <p className={`relative z-10 mcb-mono ${config.accentText}/85 text-xs sm:text-sm tracking-widest mt-5 uppercase`}>
                {config.hackFooter}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ================================================================
   SOCIAL QR — kapanış öncesi takip linkleri
   ================================================================ */
const SOCIALS = [
  {
    key: "linkedin",
    url: "https://linkedin.com/in/osmancancetlenbik",
    label: "LinkedIn",
    handle: "/in/osmancancetlenbik",
    color: "#0a66c2",
    svg: (
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.86-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.86 3.36-1.86 3.59 0 4.26 2.37 4.26 5.45v6.3zM5.34 7.44a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.01H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    ),
  },
  {
    key: "instagram",
    url: "https://instagram.com/osmancancetlenbik",
    label: "Instagram",
    handle: "@osmancancetlenbik",
    color: "#e1306c",
    svg: (
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.77.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.39A5.9 5.9 0 0 0 .62 4.15C.33 4.9.13 5.77.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91a5.9 5.9 0 0 0 1.39 2.13 5.9 5.9 0 0 0 2.13 1.39c.76.3 1.63.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.39 5.9 5.9 0 0 0 1.39-2.13c.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.39-2.13A5.9 5.9 0 0 0 19.86.63C19.1.33 18.23.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 1 0 2.88 1.44 1.44 0 0 1 0-2.88z" />
    ),
  },
  {
    key: "website",
    url: "https://www.osmancancetlenbik.com",
    label: "Web",
    handle: "osmancancetlenbik.com",
    color: "#00ff88",
    svg: (
      <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm9.4 7.2h-3.4a18 18 0 0 0-1.6-4.2 9.7 9.7 0 0 1 5 4.2zM12 2.2c.9 0 2.4 1.4 3.4 5h-6.8c1-3.6 2.5-5 3.4-5zM2.6 14.4a9.8 9.8 0 0 1 0-4.8h3.9a25 25 0 0 0 0 4.8H2.6zm1 2.4h3.4a18 18 0 0 0 1.6 4.2 9.7 9.7 0 0 1-5-4.2zm3.4-9.6H3.6a9.7 9.7 0 0 1 5-4.2 18 18 0 0 0-1.6 4.2zM12 21.8c-.9 0-2.4-1.4-3.4-5h6.8c-1 3.6-2.5 5-3.4 5zm3.8-7.4H8.2a22 22 0 0 1 0-4.8h7.6a22 22 0 0 1 0 4.8zm.7 6.6a18 18 0 0 0 1.6-4.2h3.4a9.7 9.7 0 0 1-5 4.2zm2-6.6a25 25 0 0 0 0-4.8h3.9a9.8 9.8 0 0 1 0 4.8h-3.9z" />
    ),
  },
];

function SocialQrCard({ s, i }: { s: typeof SOCIALS[number]; i: number }) {
  const qrDataUrl = useQrDataUrl(s.url, 560);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.2 + i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center"
    >
      <motion.div
        animate={{ boxShadow: [`0 0 18px ${s.color}25`, `0 0 56px ${s.color}55`, `0 0 18px ${s.color}25`] }}
        transition={{ repeat: Infinity, duration: 2.8, delay: i * 0.25, ease: "easeInOut" }}
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "white",
          padding: "clamp(0.5rem, 1.5vmin, 1rem)",
          width: "clamp(10rem, 30vmin, 18rem)",
          height: "clamp(10rem, 30vmin, 18rem)",
        }}
      >
        {qrDataUrl ? (
          <img src={qrDataUrl} alt={s.label} className="w-full h-full object-contain" draggable={false} />
        ) : (
          <div className="w-full h-full bg-zinc-200 animate-pulse" />
        )}
      </motion.div>

      <div className="mt-3 sm:mt-4 flex items-center gap-2"
        style={{ filter: `drop-shadow(0 0 14px ${s.color}55)` }}>
        <svg viewBox="0 0 24 24" fill={s.color}
          style={{ width: "clamp(1.1rem, 2vmin, 1.6rem)", height: "clamp(1.1rem, 2vmin, 1.6rem)" }}>
          {s.svg}
        </svg>
        <span className="mcb-h3 font-bold" style={{ color: s.color, fontSize: "clamp(1.05rem, 2.2vmin, 1.6rem)" }}>
          {s.label}
        </span>
      </div>
      <p className="mcb-mono text-gray-400 mt-1 text-center px-2"
        style={{ fontSize: "clamp(0.7rem, 1.1vmin, 0.95rem)" }}>
        {s.handle}
      </p>
    </motion.div>
  );
}

/* ================================================================
   SECTIONS (HUD)
   ================================================================ */
const SECTIONS = [
  { name: "Açılış", start: 0 },
  { name: "Oltalama", start: 3 },
  { name: "Şifreler", start: 7 },
  { name: "Sosyal Müh.", start: 13 },
  { name: "2026 Tehditleri", start: 23 },
  { name: "Korunma", start: 28 },
  { name: "Kapanış", start: 31 },
];

/* ================================================================
   SLIDES
   ================================================================ */
const slides: Slide[] = [
  /* ── AÇILIŞ ── */
  { id: "cover", content: (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 sm:px-10 relative overflow-hidden">
      <motion.div
        className="absolute rounded-full z-0"
        style={{
          width: "min(720px, 88vmin)",
          height: "min(720px, 88vmin)",
          border: "1px solid rgba(0,255,136,0.08)",
        }}
        animate={{ scale: [0.9, 1.08, 0.9], opacity: [0.25, 0.55, 0.25] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full z-0"
        style={{
          width: "min(460px, 58vmin)",
          height: "min(460px, 58vmin)",
          border: "1px solid rgba(34,211,238,0.08)",
        }}
        animate={{ scale: [1.08, 0.9, 1.08], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
        style={{ marginBottom: "clamp(1.25rem, 4vh, 2.5rem)" }}
      >
        <LogoMark height="clamp(3.25rem, 7.5vmin, 6rem)" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="mcb-tag mcb-mono text-emerald-400/80 relative z-10"
        style={{ marginBottom: "clamp(0.75rem, 2vh, 1.25rem)" }}
      >
        MCBÜKAF · 2026
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mcb-h1 font-black relative z-10 max-w-6xl"
        style={{
          color: "#00ff88",
          textShadow: "0 0 32px rgba(0,255,136,0.55), 0 0 90px rgba(0,255,136,0.22)",
          letterSpacing: "-0.02em",
        }}
      >
        <GlitchText text="İnteraktif Siber Güvenlik" />
      </motion.h1>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 h-[2px] rounded-full"
        style={{
          width: "min(20rem, 45vw)",
          background: "linear-gradient(90deg, transparent, #00ff88, transparent)",
          boxShadow: "0 0 12px #00ff88",
          marginTop: "clamp(0.75rem, 2vh, 1.25rem)",
          marginBottom: "clamp(1rem, 3vh, 1.75rem)",
        }}
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mcb-lead text-gray-300 max-w-3xl relative z-10 px-2"
      >
        Son kullanıcı zafiyetleri ve sosyal mühendislik.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="relative z-10"
        style={{ marginTop: "clamp(2rem, 6vh, 3.5rem)" }}
      >
        <p className="mcb-body font-semibold text-white">Öğr. Gör. Osman Can Çetlenbik</p>
        <p className="mcb-meta text-gray-500 mt-1.5">Manisa Celal Bayar Üniversitesi · Teknik Bilimler MYO</p>
      </motion.div>
    </div>
  )},

  { id: "hook-stat", content: <StatSlide
    eyebrow="TÜRKİYE · 2024–2026"
    title="Tablo karanlık."
    stats={[
      { value: "11M+", label: "Günlük engellenen zararlı erişim · USOM", color: "#ef4444" },
      { value: "2.8M", label: "TurkNet sızıntısı — CEO dahil · Mart 2025", color: "#fbbf24" },
      { value: "50M ₺", label: "Tek 'Savcılık' çetesi vurgunu · 85 gözaltı", color: "#22d3ee" },
      { value: "%900", label: "Deepfake artışı 2023→2025 · Buffalo Üni.", color: "#a855f7" },
    ]} /> },

  { id: "data-leak-timeline", content: <DataLeakTimelineSlide /> },

  { id: "sec-oltalama", section: "Oltalama", content: <SectionTitle
    icon={Fish} number="01" title="Oltalama Saldırıları"
    subtitle="Bir mesaj. Bir link. Bir saniyelik düşüncesizlik."
    color="#f43f5e" /> },

  { id: "phishing-types", content: <PhishingTypesSlide /> },

  { id: "phishing-anatomy", content: (ctx) => (
    <ClickReveal
      ctx={ctx}
      icon={Mail}
      title="Sahte SMS'in Anatomisi"
      accent="#f43f5e"
      layers={[
        {
          label: "İpucu 1 · Gönderici",
          body: (
            <div>
              <p><span className="mcb-mono text-rose-400">+90 555 0X XX XX</span> — gerçek kargo firması SMS&apos;te kişisel numara kullanmaz.</p>
              <p className="mt-2 text-gray-400 mcb-meta">Gerçek gönderici adı kısa, okunaklı ve büyük harflerle: <span className="text-emerald-400">PTT, MNG, ARAS</span>.</p>
            </div>
          ),
        },
        {
          label: "İpucu 2 · Kısaltılmış / sahte link",
          body: (
            <div>
              <p><code className="mcb-mono text-rose-400">hxxps://ptt-tr-kargo<span className="text-amber-400">.</span>com</code> — gerçek alan adı <span className="text-emerald-400">ptt.gov.tr</span>.</p>
              <p className="mt-2 text-gray-400 mcb-meta">bit.ly, tinyurl gibi kısaltıcılar: nereye gittiğini gizler. Resmi kurum kısaltıcı kullanmaz.</p>
            </div>
          ),
        },
        {
          label: "İpucu 3 · Aciliyet kalıbı",
          body: (
            <div>
              <p>&quot;<span className="text-rose-300">24 saat içinde</span> ödeme yapılmazsa kargonuz iade edilecektir.&quot;</p>
              <p className="mt-2 text-gray-400 mcb-meta">Korku + zaman baskısı = düşünmeden tıklama. Bu kalıp her oltalamada vardır.</p>
            </div>
          ),
        },
        {
          label: "İpucu 4 · Bilgi / aksiyon talebi",
          body: (
            <div>
              <p>TC kimlik, kart bilgisi, SMS kodu, 3D Secure onayı — <span className="text-rose-300">hiçbiri</span> bir SMS linki üzerinden istenmez.</p>
              <p className="mt-2 text-gray-400 mcb-meta">Devlet ve banka <strong className="text-emerald-400">asla</strong> linkle parola veya kod istemez.</p>
            </div>
          ),
        },
      ]}
    />
  )},

  { id: "phishing-cases", content: <BulletSlide
    icon={BookOpen} title="Türkiye'den 2024–2026 Vakaları" accent="rose"
    items={[
      { icon: HardDrive, text: "TurkNet (Mart 2025): 2,8 milyon abone sızdı — TC, ev adresi, pasaport. Şirket önce \"244 bin\" dedi; dump'ta CEO'nun erişim bilgileri bile vardı." },
      { icon: Phone, text: "İstanbul-İzmir \"Savcılık\" çetesi (2025): \"Adınız terör örgütüne karıştı.\" 20 ilde operasyon, 85 gözaltı, ~50 milyon ₺ vurgun." },
      { icon: KeyRound, text: "16 milyar parola dump'ı (Haziran 2025): Türk devlet portalları Apple-Google-Facebook ile yan yana listede. Tek bir tekrar kullanılan parola = her hesabın anahtarı." },
    ]} /> },

  { id: "password-stats", section: "Şifreler", content: <StatSlide
    eyebrow="BÖLÜM 02 · ŞİFRELER"
    title="Tek şifre = domino"
    stats={[
    { value: "0,001 sn", label: "\"123456\" kırılma süresi", color: "#ef4444" },
    { value: "%83", label: "Kullanıcı şifresini tekrar kullanıyor", color: "#fbbf24" },
    { value: "8", label: "Ortalama TR şifre uzunluğu", color: "#22d3ee" },
    { value: "3.000 yıl", label: "12 karışık karakter (rastgele)", color: "#00ff88" },
  ]} /> },

  { id: "common-passwords", content: <CommonPasswordsSlide /> },

  { id: "password-crack", content: (ctx) => <PasswordCrackSim ctx={ctx} /> },

  { id: "live-sifre", content: (ctx) => <LivePasswordExperiment ctx={ctx} /> },

  { id: "sifre-reveal-lesson", content: <BigTextSlide
    text="Şifrenizi tanımadığınız bir sayfaya verdiniz."
    color="#f43f5e" /> },

  { id: "passphrase-2fa", content: <TwoColumnSlide
    icon={KeyRound} title="Daha İyisi: Cümle-Şifre + 2FA"
    left={{
      title: "Yapmayın",
      color: "#f43f5e",
      items: [
        "Aynı parolayı her sitede kullanmak",
        "Doğum tarihi, ad-soyad, takım adı",
        "Sticky note üzerinde monitör kenarında",
        "SMS 2FA'ya tek başına güvenmek (SIM swap)",
      ],
    }}
    right={{
      title: "Yapın",
      color: "#00ff88",
      items: [
        "Cümle-şifre: \"Manisa-üzümleri-2026-tatlı!\"",
        "Her hesaba farklı parola → şifre yöneticisi",
        "Authenticator app (Google / Microsoft / Authy)",
        "En kritik hesaplarda passkey / donanım anahtarı",
      ],
    }} /> },

  { id: "sec-soc", section: "Sosyal Müh.", content: <SectionTitle
    icon={Drama} number="02" title="Sosyal Mühendislik"
    subtitle="Güvenlik duvarı geçilemiyorsa, kullanıcı ikna edilir."
    color="#f43f5e" /> },

  { id: "weapons", content: <BulletSlide
    icon={Swords} title="Saldırganın 5 Silahı" accent="rose"
    items={[
      { icon: Clock, text: "Aciliyet — \"Şimdi yapmazsan kaybedeceksin.\"" },
      { icon: ShieldAlert, text: "Otorite — savcı, polis, banka müdürü, BTK." },
      { icon: AlertOctagon, text: "Korku — hesabın kapanacak, suç işledin, kazaya karıştın." },
      { icon: Gift, text: "Ödül — \"İPhone kazandın, kargo ücreti yatır.\"" },
      { icon: Handshake, text: "Güven — \"Tanıdığım, akraban, eski sınıf arkadaşın.\"" },
    ]} /> },

  { id: "whatsapp-scam", content: (ctx) => <WhatsAppScamSim ctx={ctx} /> },

  { id: "vishing-call", content: (ctx) => <VishingSim ctx={ctx} /> },

  { id: "predatory-journal", content: (ctx) => <AcademicEmailSim ctx={ctx} config={PJ_CONFIG} /> },

  { id: "fake-conference", content: (ctx) => <AcademicEmailSim ctx={ctx} config={CONF_CONFIG} /> },

  { id: "yok-burs", content: (ctx) => <AcademicEmailSim ctx={ctx} config={YOK_CONFIG} /> },

  { id: "journal-recognition", content: (ctx) => <JournalRecognitionSlide ctx={ctx} /> },

  { id: "whaling-ceo", content: (ctx) => <AcademicEmailSim ctx={ctx} config={WHALING_CONFIG} /> },

  { id: "golden-rule", content: <BigTextSlide
    text="Devlet asla telefonda para, altın veya şifre istemez."
    color="#f43f5e" /> },

  { id: "deepfake", section: "2026 Tehditleri", content: <DeepfakeSlide /> },

  { id: "attack-radar", content: (ctx) => <AttackRadarSlide ctx={ctx} /> },

  { id: "qr-bait", content: (ctx) => <QrBaitSlide ctx={ctx} /> },

  { id: "qr-reveal", content: (ctx) => <QrRevealSlide ctx={ctx} /> },

  { id: "ransomware", content: (ctx) => <CountdownTimer seconds={300} ctx={ctx} /> },

  { id: "sec-protect", section: "Korunma", content: <SectionTitle
    icon={Shield} number="03" title="Kendinizi Koruyun"
    subtitle="Bugün, salondan çıkmadan uygulayabileceğiniz adımlar."
    color="#00ff88" /> },

  { id: "five-steps", content: <BulletSlide
    icon={CheckCircle2} title="5 Dakikada 5 Adım" accent="emerald"
    items={[
      { icon: KeyRound, text: "Şifre yöneticisi kurun: 1Password, Bitwarden veya Apple/Google parolaları." },
      { icon: Smartphone, text: "Banka, e-posta ve sosyal medyaya authenticator-tabanlı 2FA açın." },
      { icon: RefreshCw, text: "Telefon ve bilgisayar güncellemelerini otomatik bırakın — yamalar canınızı kurtarır." },
      { icon: HardDrive, text: "Haftada bir, ayrı bir diskte ya da bulutta yedek alın (3-2-1 kuralı)." },
      { icon: Brain, text: "3 saniye dur. Linke tıklamadan, mesajı kontrol et." },
    ]} /> },

  { id: "three-second-rule", content: (ctx) => <ThreeSecondRuleSlide ctx={ctx} /> },

  /* ── KAPANIŞ ── */
  { id: "manifesto", content: <QuoteSlide
    icon={Shield}
    quote="En zayıf halka değiliz, en güçlü farkındalığız."
    author="MCBÜKAF '26" /> },

  { id: "thanks", content: (
    <div className="flex flex-col items-center justify-center h-full px-4 sm:px-10 md:px-16">
      <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 110, damping: 14 }}
        className="mb-2">
        <LogoMark height="clamp(2.25rem, 4.5vmin, 3.5rem)" />
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="mcb-h2 font-black mb-5 sm:mb-7"
        style={{ color: "#00ff88", textShadow: "0 0 28px rgba(0,255,136,0.5)" }}>
        <GlitchText text="Teşekkürler" />
      </motion.h1>

      <div className="grid grid-cols-3 gap-6 sm:gap-10 md:gap-14 w-full max-w-5xl place-items-center mb-4 sm:mb-6">
        {SOCIALS.map((s, i) => (
          <SocialQrCard key={s.key} s={s} i={i} />
        ))}
      </div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="mcb-meta text-gray-500 text-center px-2">
        Öğr. Gör. Osman Can Çetlenbik · MCBÜ Teknik Bilimler MYO
      </motion.p>
    </div>
  )},
];

/* ================================================================
   PRESENTATION ENGINE
   ================================================================ */
export default function Presentation() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = slides.length;

  const advanceHandlerRef = useRef<null | (() => boolean)>(null);
  const consumeAdvance = useCallback((fn: () => boolean) => {
    advanceHandlerRef.current = fn;
  }, []);

  const navigate = useCallback((target: number, dir: 1 | -1) => {
    advanceHandlerRef.current = null;
    setDirection(dir);
    setCurrent(target);
  }, []);

  const goNext = useCallback(() => {
    const h = advanceHandlerRef.current;
    if (h && h()) return;
    setCurrent((p) => {
      if (p >= total - 1) return p;
      advanceHandlerRef.current = null;
      setDirection(1);
      return p + 1;
    });
  }, [total]);

  const goPrev = useCallback(() => {
    setCurrent((p) => {
      if (p <= 0) return p;
      advanceHandlerRef.current = null;
      setDirection(-1);
      return p - 1;
    });
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown" || e.key === "Enter") {
        e.preventDefault(); goNext();
      }
      if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); goPrev(); }
      if (e.key === "Home") { e.preventDefault(); navigate(0, -1); }
      if (e.key === "End") { e.preventDefault(); navigate(total - 1, 1); }
      if (e.key === "f" || e.key === "F") {
        document.documentElement.requestFullscreen?.().catch(() => {});
      }
      const num = parseInt(e.key);
      if (!isNaN(num) && num >= 1 && num <= SECTIONS.length) {
        e.preventDefault();
        const target = SECTIONS[num - 1].start;
        navigate(target, target > current ? 1 : -1);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [goNext, goPrev, navigate, total, current]);

  const touchRef = useRef<{ x: number } | null>(null);

  const slide = slides[current];
  const sectionName = (() => {
    for (let i = SECTIONS.length - 1; i >= 0; i--) {
      if (current >= SECTIONS[i].start) return SECTIONS[i].name;
    }
    return "";
  })();
  const currentSectionIdx = (() => {
    for (let i = SECTIONS.length - 1; i >= 0; i--) {
      if (current >= SECTIONS[i].start) return i;
    }
    return 0;
  })();

  const slideContent = typeof slide.content === "function"
    ? slide.content({ isActive: true, consumeAdvance })
    : slide.content;

  return (
    <div className="mcb-deck h-[100dvh] w-screen flex items-center justify-center bg-black" suppressHydrationWarning
      onTouchStart={(e) => { touchRef.current = { x: e.touches[0].clientX }; }}
      onTouchEnd={(e) => {
        if (!touchRef.current) return;
        const dx = e.changedTouches[0].clientX - touchRef.current.x;
        if (Math.abs(dx) > 60) { dx > 0 ? goPrev() : goNext(); }
        touchRef.current = null;
      }}>
      <div className="relative w-full h-full max-w-[177.78dvh] max-h-[56.25vw] overflow-hidden select-none"
        style={{ background: "linear-gradient(135deg, #02050a 0%, #060a14 50%, #0a0f1e 100%)" }}>

        <MatrixRain />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3 gap-2">
          <span className="text-[10px] sm:text-xs mcb-mono text-emerald-400/70 uppercase tracking-wider truncate"
            style={{ textShadow: "0 0 8px rgba(0,255,136,0.3)" }}>{sectionName}</span>
          <span className="text-[10px] sm:text-xs mcb-mono text-emerald-400/40 shrink-0">{current + 1} / {total}</span>
        </div>

        {/* Progress bar */}
        <div className="absolute top-0 left-0 h-[3px] z-50 transition-all duration-500 ease-out"
          style={{
            width: `${((current + 1) / total) * 100}%`,
            background: "linear-gradient(90deg, #00ff88, #22d3ee, #00ff88)",
            boxShadow: "0 0 12px rgba(0,255,136,0.55), 0 0 30px rgba(0,255,136,0.25), 0 0 60px rgba(34,211,238,0.15)",
          }} />
        <motion.div className="absolute top-0 h-[6px] w-[6px] rounded-full z-50"
          animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1 }}
          style={{
            left: `${((current + 1) / total) * 100}%`,
            background: "#00ff88",
            boxShadow: "0 0 8px #00ff88, 0 0 20px #00ff88",
            transform: "translate(-50%, -25%)",
            transition: "left 0.5s ease-out",
          }} />

        {/* Slide content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id + current}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40, filter: "blur(8px) brightness(1.8)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px) brightness(1)" }}
            exit={{ opacity: 0, x: direction * -30, filter: "blur(4px) brightness(0.5)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full pt-10 sm:pt-12 pb-12 sm:pb-14"
          >
            {slideContent}
          </motion.div>
        </AnimatePresence>

        {/* Click navigation */}
        <button onClick={goPrev} disabled={current === 0}
          className="absolute left-0 top-0 bottom-0 w-1/6 z-40 cursor-pointer bg-transparent border-none opacity-0 hover:opacity-100 transition-opacity">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 text-4xl">‹</span>
        </button>
        <button onClick={goNext} disabled={current === total - 1}
          className="absolute right-0 top-0 bottom-0 w-1/6 z-40 cursor-pointer bg-transparent border-none opacity-0 hover:opacity-100 transition-opacity">
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 text-4xl">›</span>
        </button>

        {/* Bottom bar */}
        <div className="absolute bottom-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-t border-emerald-500/10">
          <div className="flex items-center justify-between gap-2 px-3 sm:px-6 py-1.5 sm:py-2.5">
            <span className="hidden md:block text-xs mcb-mono text-emerald-400/60 uppercase tracking-wider flex-1 min-w-0 truncate"
              style={{ textShadow: "0 0 6px rgba(0,255,136,0.3)" }}>{sectionName}</span>
            <div className="flex items-center gap-2 sm:gap-4 mx-auto md:mx-0">
              <button onClick={goPrev} disabled={current === 0}
                className="text-gray-500 hover:text-white text-xl border-none bg-transparent cursor-pointer disabled:opacity-20 transition-colors w-6 h-6 leading-none">‹</button>
              <div className="flex gap-1 sm:gap-1.5">
                {SECTIONS.map((sec, i) => (
                  <button key={i}
                    onClick={() => navigate(sec.start, sec.start > current ? 1 : -1)}
                    className={`h-1.5 sm:h-2 rounded-full border-none cursor-pointer transition-all duration-300 ${i === currentSectionIdx ? "bg-emerald-400 w-5 sm:w-6" : "bg-white/15 w-1.5 sm:w-2 hover:bg-white/40"}`}
                    style={i === currentSectionIdx ? { boxShadow: "0 0 8px rgba(0,255,136,0.6), 0 0 20px rgba(0,255,136,0.3)" } : undefined}
                    aria-label={sec.name}
                  />
                ))}
              </div>
              <button onClick={goNext} disabled={current === total - 1}
                className="text-gray-500 hover:text-white text-xl border-none bg-transparent cursor-pointer disabled:opacity-20 transition-colors w-6 h-6 leading-none">›</button>
            </div>
            <span className="hidden md:block text-xs mcb-mono text-gray-500 flex-1 text-right truncate">{current + 1} / {total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
