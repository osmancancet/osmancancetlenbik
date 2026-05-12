"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles.css";

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

function SectionTitle({ icon, title, subtitle, color = "#00ff88" }: { icon: string; title: string; subtitle: string; color?: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 sm:px-10 relative overflow-hidden">
      <motion.div className="absolute inset-0 z-0" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 3 }}
        style={{ background: `radial-gradient(circle at 50% 50%, ${color}10 0%, transparent 50%)` }} />
      <motion.div className="absolute rounded-full border z-0"
        style={{ borderColor: `${color}20`, width: "min(500px, 65vmin)", height: "min(500px, 65vmin)" }}
        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} />
      <div className="relative z-10 flex flex-col items-center max-w-full">
        <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 120, damping: 10 }}
          style={{ fontSize: "clamp(3.5rem, 9vw, 6rem)", filter: `drop-shadow(0 0 20px ${color}50)`, marginBottom: "clamp(1rem, 3vh, 2rem)" }}>{icon}</motion.div>
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

function BulletSlide({ title, icon, items, note, accent = "emerald" }: {
  title: string;
  icon: string;
  items: { emoji: string; text: string }[];
  note?: string;
  accent?: "emerald" | "rose" | "cyan" | "amber";
}) {
  const borderClr = {
    emerald: "border-emerald-500/60",
    rose: "border-rose-500/60",
    cyan: "border-cyan-500/60",
    amber: "border-amber-500/60",
  }[accent];
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 sm:px-10 md:px-20 overflow-y-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center gap-3 sm:gap-5 mb-5 sm:mb-8 flex-wrap">
        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
          style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}>{icon}</motion.span>
        <h2 className="mcb-h2 font-bold text-center">{title}</h2>
      </motion.div>
      <div className="space-y-2.5 sm:space-y-4 w-full max-w-6xl">
        {items.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 * (i + 1), type: "spring", stiffness: 80 }}
            className={`flex items-start gap-3 sm:gap-5 border-l-4 ${borderClr} bg-white/[0.03] backdrop-blur-sm rounded-r-xl pl-4 sm:pl-7 pr-3 py-3 sm:py-4`}>
            <span className="shrink-0" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)" }}>{item.emoji}</span>
            <p className="mcb-body text-gray-200">{item.text}</p>
          </motion.div>
        ))}
      </div>
      {note && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-6 mcb-meta text-gray-500 italic text-center max-w-4xl">{note}</motion.p>}
    </div>
  );
}

function AnimatedStat({ value, label, color, delay }: { value: string; label: string; color: string; delay: number }) {
  const animated = useCountUp(value, 1500, delay * 1000);
  return (
    <motion.div initial={{ opacity: 0, y: 40, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, type: "spring", stiffness: 100 }}
      className="text-center flex flex-col items-center" style={{ flex: "1 1 12rem", minWidth: 0, maxWidth: "16rem" }}>
      <p className="mcb-stat font-black mcb-mono mb-2 sm:mb-3 break-words"
        style={{ color, textShadow: `0 0 18px ${color}55, 0 0 45px ${color}25` }}>{animated}</p>
      <p className="mcb-meta text-gray-400">{label}</p>
    </motion.div>
  );
}

function StatSlide({ title, stats }: { title: string; stats: { value: string; label: string; color: string }[] }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 sm:px-10 md:px-16 overflow-y-auto">
      <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="mcb-h2 font-bold text-center" style={{ marginBottom: "clamp(1.5rem, 5vh, 4rem)" }}>{title}</motion.h2>
      <div className="flex flex-wrap items-start justify-center w-full max-w-6xl"
        style={{ gap: "clamp(1.25rem, 3.5vw, 4rem)" }}>
        {stats.map((s, i) => <AnimatedStat key={i} value={s.value} label={s.label} color={s.color} delay={0.25 * (i + 1)} />)}
      </div>
    </div>
  );
}

function QuoteSlide({ quote, author, emoji }: { quote: string; author: string; emoji: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 sm:px-16 md:px-24 text-center">
      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
        style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)", marginBottom: "clamp(1.25rem, 3.5vh, 2.5rem)" }}>{emoji}</motion.span>
      <motion.blockquote initial={{ opacity: 0, y: 30, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.3, duration: 0.7 }}
        className="mcb-h3 font-light italic text-gray-200 max-w-5xl"
        style={{ textShadow: "0 0 30px rgba(0,255,136,0.12)" }}>&ldquo;{quote}&rdquo;</motion.blockquote>
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
  icon: string;
  left: { title: string; items: string[]; color?: string };
  right: { title: string; items: string[]; color?: string };
}) {
  const lc = left.color ?? "#f43f5e";
  const rc = right.color ?? "#00ff88";
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 sm:px-10 md:px-20 overflow-y-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center gap-3 sm:gap-5 mb-5 sm:mb-8 flex-wrap text-center">
        <span style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}>{icon}</span>
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
                <span style={{ color: lc }} className="mt-0.5 shrink-0">✕</span><span>{item}</span>
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
                <span style={{ color: rc }} className="mt-0.5 shrink-0">✓</span><span>{item}</span>
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
function ClickReveal({ title, icon, layers, ctx, accent = "#00ff88", footer }: {
  title: string;
  icon: string;
  layers: { label: string; body: ReactNode }[];
  ctx: SlideCtx;
  accent?: string;
  footer?: ReactNode;
}) {
  const [shown, setShown] = useState(0);
  const shownRef = useRef(0);
  useEffect(() => { shownRef.current = shown; }, [shown]);

  const advance = useCallback(() => {
    if (shownRef.current >= layers.length) return false;
    shownRef.current += 1;
    setShown(shownRef.current);
    return true;
  }, [layers.length]);

  useEffect(() => {
    if (!ctx.isActive) {
      shownRef.current = 0;
      setShown(0);
      return;
    }
    ctx.consumeAdvance(advance);
  }, [ctx, advance]);

  const remaining = layers.length - shown;

  return (
    <div className="flex flex-col items-center justify-start h-full px-4 sm:px-10 md:px-16 pt-3 sm:pt-4 overflow-y-auto"
      onClick={() => { advance(); }}
      role="button"
      tabIndex={-1}
      style={{ cursor: shown < layers.length ? "pointer" : "default" }}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-5 flex-wrap text-center">
        <span style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)" }}>{icon}</span>
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

      <div className="mt-3 sm:mt-4 mb-1 flex items-center gap-2 sm:gap-3 mcb-meta mcb-mono text-gray-400 select-none text-center">
        {remaining > 0 ? (
          <>
            <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.4 }}
              style={{ color: accent }}>▶</motion.span>
            <span>tıkla / Enter / → · {remaining} ipucu daha</span>
          </>
        ) : (
          <span style={{ color: accent }}>✓ Tüm ipuçları açıldı — devam edin</span>
        )}
      </div>
      {footer && shown >= layers.length && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-1 mcb-meta text-gray-400 text-center max-w-3xl px-2">{footer}</motion.div>
      )}
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
        style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)", marginBottom: "clamp(0.75rem, 2vh, 1.5rem)" }}>{expired ? "💀" : "🔒"}</motion.div>
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
   LIVE EXPERIMENT — sunum içinde canlı deney rotalarını embed eder
   ================================================================ */
function LiveExperiment({ src, label, hint }: { src: string; label: string; hint?: string }) {
  const [key, setKey] = useState(0);
  return (
    <div className="flex flex-col h-full px-2 sm:px-3 pt-1 pb-1 min-h-0">
      <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2 px-1 sm:px-2 flex-wrap">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.3 }}
            className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-rose-500 shrink-0" style={{ boxShadow: "0 0 10px #f43f5e" }} />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] mcb-mono text-rose-300 shrink-0">CANLI DENEY</span>
          <span className="text-[10px] sm:text-xs mcb-mono text-emerald-400/80 truncate">{label}</span>
        </div>
        <button onClick={() => setKey((k) => k + 1)}
          className="text-[10px] sm:text-xs mcb-mono px-2 sm:px-3 py-1 sm:py-1.5 rounded-md border border-white/15 text-white/70 hover:text-white hover:border-white/40 bg-black/40 transition-colors cursor-pointer shrink-0">
          ↻ Yeniden Başlat
        </button>
      </div>
      <div className="flex-1 min-h-0 rounded-xl overflow-hidden border border-emerald-500/20 mcb-glow-green bg-black">
        <iframe key={key} src={src} title={label}
          className="w-full h-full block"
          sandbox="allow-scripts allow-forms allow-same-origin allow-popups" />
      </div>
      {hint && <p className="mt-1 text-center mcb-meta text-gray-500 px-2 line-clamp-2">{hint}</p>}
    </div>
  );
}

/* ================================================================
   SECTIONS (HUD)
   ================================================================ */
const SECTIONS = [
  { name: "Açılış", start: 0 },
  { name: "Oltalama", start: 3 },
  { name: "Şifreler", start: 6 },
  { name: "Sosyal Müh.", start: 10 },
  { name: "2026 Tehditleri", start: 14 },
  { name: "Korunma", start: 18 },
  { name: "Kapanış", start: 21 },
];

/* ================================================================
   SLIDES
   ================================================================ */
const slides: Slide[] = [
  /* ── AÇILIŞ ── */
  { id: "cover", content: (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 sm:px-8 relative overflow-hidden">
      <motion.div className="absolute rounded-full border border-emerald-500/10 z-0"
        style={{ width: "min(640px, 80vmin)", height: "min(640px, 80vmin)" }}
        animate={{ scale: [0.85, 1.1, 0.85], opacity: [0.2, 0.5, 0.2] }} transition={{ repeat: Infinity, duration: 5 }} />
      <motion.div className="absolute rounded-full border border-cyan-500/10 z-0"
        style={{ width: "min(420px, 55vmin)", height: "min(420px, 55vmin)" }}
        animate={{ scale: [1.1, 0.85, 1.1], opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 4 }} />
      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 100 }}
        className="relative z-10"
        style={{ fontSize: "clamp(3.5rem, 9vw, 6rem)", marginBottom: "clamp(0.75rem, 2.5vh, 1.5rem)", filter: "drop-shadow(0 0 18px rgba(0,255,136,0.5))" }}>🛡️</motion.span>
      <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }}
        className="mcb-h1 font-black mb-3 relative z-10 max-w-6xl"
        style={{ color: "#00ff88", textShadow: "0 0 28px rgba(0,255,136,0.5), 0 0 70px rgba(0,255,136,0.2)" }}>
        <GlitchText text="İnteraktif Siber Güvenlik" />
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        className="mcb-lead text-gray-300 max-w-3xl relative z-10 px-2">
        Son kullanıcı zafiyetleri ve sosyal mühendislik — sahnede canlı.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
        className="relative z-10" style={{ marginTop: "clamp(1.5rem, 4.5vh, 3rem)" }}>
        <p className="mcb-meta text-emerald-400/70 mcb-mono tracking-widest mb-2">MCBÜKAF · 2026</p>
        <p className="mcb-body text-gray-200">Öğr. Gör. Osman Can Çetlenbik</p>
        <p className="mcb-meta text-gray-500 mt-1">Manisa Celal Bayar Üniversitesi · Kırkağaç MYO</p>
      </motion.div>
    </div>
  )},

  { id: "hook-stat", content: <StatSlide title="Türkiye · 2025–2026" stats={[
    { value: "1.2M+", label: "Günlük saldırı girişimi (USOM)", color: "#ef4444" },
    { value: "%62", label: "Oltalama vakası artışı", color: "#fbbf24" },
    { value: "49M", label: "Tek sızıntıda açığa çıkan kayıt", color: "#22d3ee" },
    { value: "%900", label: "Deepfake artış oranı", color: "#a855f7" },
  ]} /> },

  { id: "quote-intro", content: <QuoteSlide emoji="🧠"
    quote="İnsanlar hacklenmez, ikna edilir."
    author="Sosyal Mühendislik Gerçeği" /> },

  /* ── BÖLÜM 01 · OLTALAMA ── */
  { id: "sec-oltalama", section: "Oltalama", content: <SectionTitle
    icon="🎣" title="Oltalama Saldırıları"
    subtitle="Bir mesaj. Bir link. Bir saniyelik düşüncesizlik."
    color="#f43f5e" /> },

  { id: "phishing-anatomy", content: (ctx) => (
    <ClickReveal
      ctx={ctx}
      icon="📩"
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
      footer="Bu dört ipucundan biri varsa: durun. İkisi varsa: tıklamayın. Üçü varsa: ihbar edin (USOM)."
    />
  )},

  { id: "phishing-cases", content: <BulletSlide
    icon="📖" title="Türkiye'den Güncel Vakalar" accent="rose"
    items={[
      { emoji: "📦", text: "Kargo gümrük SMS'i: 24,90 TL ödeme talebi → arkada 24.500 TL'lik 3D Secure onayı geliyor." },
      { emoji: "🏛️", text: "Sahte e-Devlet uyarısı: \"Ehliyetiniz iptal edilecek\" — kart ve kimlik bilgileriyle pişmanlık." },
      { emoji: "🏦", text: "Banka SMS'i: \"Hesabınızda şüpheli işlem\" → sahte giriş sayfası, parolanız saldırgana akar." },
    ]} /> },

  /* ── BÖLÜM 02 · ŞİFRELER ── */
  { id: "sec-sifre", section: "Şifreler", content: <SectionTitle
    icon="🔐" title="Şifre Güvenliği"
    subtitle="Tek şifre = domino. Birinden çalınırsa hepsi düşer."
    color="#22d3ee" /> },

  { id: "password-stats", content: <StatSlide title="Şifre Gerçekleri" stats={[
    { value: "0,001 sn", label: "\"123456\" kırılma süresi", color: "#ef4444" },
    { value: "%83", label: "Kullanıcı şifresini tekrar kullanıyor", color: "#fbbf24" },
    { value: "8", label: "Ortalama TR şifre uzunluğu", color: "#22d3ee" },
    { value: "3.000 yıl", label: "12 karışık karakter (rastgele)", color: "#00ff88" },
  ]} /> },

  { id: "live-sifre", content: <LiveExperiment
    src="/mcbukaf/sifre"
    label="/mcbukaf/sifre"
    hint="Salondan bir gönüllü kendi parolasını girsin (gerçek değil — örnek parola). Entropi ve sızıntı veritabanı sonucu canlı görünür." /> },

  { id: "passphrase-2fa", content: <TwoColumnSlide
    icon="🔑" title="Daha İyisi: Cümle-Şifre + 2FA"
    left={{
      title: "❌ Yapmayın",
      color: "#f43f5e",
      items: [
        "Aynı parolayı her sitede kullanmak",
        "Doğum tarihi, ad-soyad, takım adı",
        "Sticky note üzerinde monitör kenarında",
        "SMS 2FA'ya tek başına güvenmek (SIM swap)",
      ],
    }}
    right={{
      title: "✓ Yapın",
      color: "#00ff88",
      items: [
        "Cümle-şifre: \"Manisa-üzümleri-2026-tatlı!\"",
        "Her hesaba farklı parola → şifre yöneticisi",
        "Authenticator app (Google / Microsoft / Authy)",
        "En kritik hesaplarda passkey / donanım anahtarı",
      ],
    }} /> },

  /* ── BÖLÜM 03 · SOSYAL MÜHENDİSLİK ── */
  { id: "sec-soc", section: "Sosyal Müh.", content: <SectionTitle
    icon="🎭" title="Sosyal Mühendislik"
    subtitle="Güvenlik duvarı geçilemiyorsa, kullanıcı ikna edilir."
    color="#f43f5e" /> },

  { id: "weapons", content: <BulletSlide
    icon="⚔️" title="Saldırganın 5 Silahı" accent="rose"
    items={[
      { emoji: "⏰", text: "Aciliyet — \"Şimdi yapmazsan kaybedeceksin.\"" },
      { emoji: "👮", text: "Otorite — savcı, polis, banka müdürü, BTK." },
      { emoji: "😱", text: "Korku — hesabın kapanacak, suç işledin, kazaya karıştın." },
      { emoji: "🎁", text: "Ödül — \"İPhone kazandın, kargo ücreti yatır.\"" },
      { emoji: "🤝", text: "Güven — \"Tanıdığım, akraban, eski sınıf arkadaşın.\"" },
    ]} /> },

  { id: "scam-script", content: (ctx) => (
    <ClickReveal
      ctx={ctx}
      icon="📞"
      title="Telefon Dolandırıcılığı · Senaryo"
      accent="#f43f5e"
      layers={[
        {
          label: "Açılış · OTORİTE",
          body: <p>&quot;İyi günler, ben <strong className="text-rose-300">Ankara Cumhuriyet Başsavcılığı&apos;ndan</strong> Komiser Yılmaz. Adınıza açılmış bir soruşturma dosyası var.&quot;</p>,
        },
        {
          label: "Yükselme · KORKU",
          body: <p>&quot;Hesabınızdan terör örgütüne para transferi yapılmış. <strong className="text-rose-300">15 dakika içinde</strong> ifadenizi alamazsak gözaltı kararı çıkacak.&quot;</p>,
        },
        {
          label: "İzolasyon · GÜVEN",
          body: <p>&quot;Konuşmamız <strong className="text-rose-300">gizli</strong>. Aileniz, banka çalışanı, kimseyle paylaşamazsınız — soruşturma sırrı.&quot;</p>,
        },
        {
          label: "Vurgun · ACİLİYET",
          body: <p>&quot;Şimdi <strong className="text-rose-300">tüm paranızı emanet hesabına</strong> aktaracaksınız. Sonra geri yatırılacak. ATM'ye gidin, ben telefonda kalıyorum.&quot;</p>,
        },
      ]}
      footer="Her satırın yanındaki silahı görüyor musunuz? Bu kalıp 60+ yaş, 18–24 yaş ayrı demez."
    />
  )},

  { id: "golden-rule", content: <BigTextSlide
    text="Devlet asla telefonda para, altın veya şifre istemez."
    subtext="Bu cümleyi bir yere yazın. Ailenize öğretin. Hayat kurtarır."
    color="#f43f5e" /> },

  /* ── BÖLÜM 04 · 2026 TEHDİTLERİ ── */
  { id: "sec-2026", section: "2026 Tehditleri", content: <SectionTitle
    icon="🤖" title="2026'nın Yeni Tehditleri"
    subtitle="Deepfake, parmak izi, fidye yazılımı — sıra sizde."
    color="#a855f7" /> },

  { id: "deepfake", content: (ctx) => (
    <ClickReveal
      ctx={ctx}
      icon="🎭"
      title="Deepfake'i Nasıl Anlarsınız?"
      accent="#a855f7"
      layers={[
        {
          label: "İpucu 1 · Göz",
          body: <p>Göz kırpma <strong className="text-purple-300">anormal</strong> — ya hiç olmaz ya da makine ritminde. Bakışlar yapay biçimde sabit.</p>,
        },
        {
          label: "İpucu 2 · Dudak senkronu",
          body: <p>Ses ve dudak hareketi <strong className="text-purple-300">milisaniyelik</strong> kayar. &ldquo;P&rdquo;, &ldquo;M&rdquo;, &ldquo;B&rdquo; gibi sert ünsüzlerde fark belirgin.</p>,
        },
        {
          label: "İpucu 3 · Ton + nefes",
          body: <p>Klonlanmış seste <strong className="text-purple-300">nefes ve duraksamalar</strong> eksiktir. Cümleler fazla pürüzsüz, duygu eğrisi düz.</p>,
        },
      ]}
      footer="Aile bireyi sesiyle para isterse: telefonu kapatın, kendi numarasından geri arayın. Önceden belirlenmiş bir 'aile parolası' soru olarak çok işe yarar."
    />
  )},

  { id: "live-cihaz", content: <LiveExperiment
    src="/mcbukaf/cihaz"
    label="/mcbukaf/cihaz"
    hint="Bir site sizden 'izin' istemeden neleri görebilir? Salondan birkaç telefonla aynı linki açıp karşılaştırın." /> },

  { id: "ransomware", content: (ctx) => <CountdownTimer seconds={300} ctx={ctx} /> },

  /* ── BÖLÜM 05 · KORUNMA ── */
  { id: "sec-protect", section: "Korunma", content: <SectionTitle
    icon="🛡️" title="Kendinizi Koruyun"
    subtitle="Bugün, salondan çıkmadan uygulayabileceğiniz adımlar."
    color="#00ff88" /> },

  { id: "five-steps", content: <BulletSlide
    icon="✅" title="5 Dakikada 5 Adım" accent="emerald"
    items={[
      { emoji: "🔑", text: "Şifre yöneticisi kurun: 1Password, Bitwarden veya Apple/Google parolaları." },
      { emoji: "📲", text: "Banka, e-posta ve sosyal medyaya authenticator-tabanlı 2FA açın." },
      { emoji: "🔄", text: "Telefon ve bilgisayar güncellemelerini otomatik bırakın — yamalar canınızı kurtarır." },
      { emoji: "💾", text: "Haftada bir, ayrı bir diskte ya da bulutta yedek alın (3-2-1 kuralı)." },
      { emoji: "🤔", text: "3 saniye dur. Linke tıklamadan, mesajı kontrol et." },
    ]} /> },

  { id: "three-second-rule", content: <BigTextSlide
    text="3 saniye dur. Bir kez daha bak. Sonra tıkla."
    subtext="Bu üç saniye, son altı ayın en pahalı dersini önlemenize yeter."
    color="#00ff88" /> },

  /* ── KAPANIŞ ── */
  { id: "manifesto", content: <QuoteSlide
    emoji="🛡️"
    quote="En zayıf halka değiliz, en güçlü farkındalığız."
    author="MCBÜKAF '26" /> },

  { id: "thanks", content: (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 sm:px-8">
      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 110 }}
        style={{ fontSize: "clamp(3.5rem, 9vw, 6rem)", marginBottom: "clamp(0.75rem, 2.5vh, 1.5rem)" }}>🙏</motion.span>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="mcb-h1 font-black mb-4 sm:mb-6"
        style={{ color: "#00ff88", textShadow: "0 0 28px rgba(0,255,136,0.5)" }}>
        <GlitchText text="Teşekkürler" />
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="mcb-lead text-gray-300 max-w-3xl" style={{ marginBottom: "clamp(1.5rem, 4vh, 2.5rem)" }}>
        Soru, paylaşım ve geri bildirim için:
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
        className="mcb-body mcb-mono text-emerald-400 break-all px-2">
        osmancancetlenbik.com
      </motion.div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
        className="mt-3 mcb-meta text-gray-500 px-2">
        @osmancancetlenbik · MCBÜ Kırkağaç MYO
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
