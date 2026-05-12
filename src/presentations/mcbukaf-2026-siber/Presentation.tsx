"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "qrcode";
import {
  passwordEntropy,
  crackTime,
  strengthLabel,
  isLeaked,
} from "@/lib/passwordStrength";
import {
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  KeyRound,
  Brain,
  Radio,
  Skull,
  CheckCircle2,
  Phone,
  Fingerprint,
  Sparkles,
  Zap,
  RefreshCw,
} from "lucide-react";
import "./styles.css";

/* ================================================================
   TYPES
   ================================================================ */
interface Slide {
  id: string;
  section?: string;
  render: (ctx: SlideCtx) => ReactNode;
}

type AudioCue = "boot" | "stinger" | "alarm" | "heartbeat" | "soft" | "reveal";

type SlideCtx = {
  isActive: boolean;
  origin: string;
};

/* ================================================================
   AUDIO ENGINE — procedural Web Audio
   ================================================================ */
type AudioApi = {
  unlocked: boolean;
  muted: boolean;
  unlock: () => Promise<void>;
  toggleMute: () => void;
  cue: (c: AudioCue) => void;
  narrate: (lines: NarrationLine[], opts?: NarrationOpts) => void;
  stopNarration: () => void;
  phoneRing: (opts?: { rings?: number; volume?: number }) => () => void;
  radioCrackle: (opts?: { volume?: number }) => () => void;
};

type NarrationLine = { text: string; delayMs?: number };
type NarrationOpts = { rate?: number; pitch?: number; volume?: number };


// audio devre dışı — sunum tamamen sessiz; tüm cue'lar no-op
function useAudioEngine(): AudioApi {
  const noop = () => {};
  const noopStop = () => () => {};
  return {
    unlocked: true,
    muted: true,
    unlock: async () => {},
    toggleMute: noop,
    cue: noop,
    narrate: noop,
    stopNarration: noop,
    phoneRing: noopStop,
    radioCrackle: noopStop,
  };
}

/* ================================================================
   HOOKS
   ================================================================ */
function useCountUp(target: number, duration = 1500, delay = 0, active = true) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const t = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const e = 1 - Math.pow(1 - p, 3);
        setV(target * e);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [target, duration, delay, active]);
  return v;
}

function useTypewriter(lines: string[], speed = 28, active = true) {
  const [out, setOut] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!active) {
      setOut([]);
      setDone(false);
      return;
    }
    let line = 0;
    let char = 0;
    const acc: string[] = [];
    const id = setInterval(() => {
      if (line >= lines.length) {
        clearInterval(id);
        setDone(true);
        return;
      }
      if (char === 0) acc[line] = "";
      acc[line] = lines[line].slice(0, char + 1);
      char++;
      if (char > lines[line].length) {
        line++;
        char = 0;
      }
      setOut([...acc]);
    }, speed);
    return () => clearInterval(id);
  }, [active, lines, speed]);
  return { out, done };
}

/* ================================================================
   VISUAL PRIMITIVES
   ================================================================ */
function MatrixRain({ density = 1 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const chars =
      "アイウエオカキクケコサシスセソタチツテト0123456789ABCDEF<>/{}[];:$#@!";
    const fontSize = 18;
    let cols: { y: number; speed: number }[] = [];

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const colCount = Math.max(
        16,
        Math.floor((w / fontSize) * Math.max(0.6, density)),
      );
      cols = Array.from({ length: colCount }, () => ({
        y: Math.random() * h,
        speed: 0.6 + Math.random() * 1.2,
      }));
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    let raf = 0;
    let frame = 0;
    const draw = () => {
      frame++;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (frame % 2 === 0) {
        ctx.fillStyle = "rgba(2, 5, 10, 0.09)";
        ctx.fillRect(0, 0, w, h);
        ctx.font = `bold ${fontSize}px ui-monospace, monospace`;
        const xStep = w / cols.length;
        for (let i = 0; i < cols.length; i++) {
          const ch = chars[Math.floor(Math.random() * chars.length)];
          const x = i * xStep;
          const y = cols[i].y;
          ctx.fillStyle = "rgba(0, 255, 136, 0.32)";
          ctx.fillText(ch, x, y);
          ctx.fillStyle = "rgba(34, 211, 238, 0.08)";
          ctx.fillText(
            chars[Math.floor(Math.random() * chars.length)],
            x,
            y - fontSize * 2,
          );
          cols[i].y += fontSize * cols[i].speed;
          if (cols[i].y > h + fontSize * 2 && Math.random() > 0.972) {
            cols[i].y = -fontSize * (Math.random() * 8);
            cols[i].speed = 0.6 + Math.random() * 1.2;
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [density]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <canvas ref={ref} className="block" />
      <div className="absolute inset-0 mcb-hex" />
      <div className="absolute inset-0 mcb-scan" />
      <div className="absolute inset-0 mcb-vignette" />
    </div>
  );
}

function Glitch({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={`mcb-glitch ${className}`} data-text={text}>
      {text}
    </span>
  );
}

/* ================================================================
   QR CODE
   ================================================================ */
function QR({
  url,
  size = 240,
  glow = true,
}: {
  url: string;
  size?: number;
  glow?: boolean;
}) {
  const isAbsolute = url.startsWith("http://") || url.startsWith("https://");
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    if (!isAbsolute) {
      setSrc("");
      return;
    }
    let cancelled = false;
    QRCode.toDataURL(url, {
      width: size * 2,
      margin: 2,
      errorCorrectionLevel: "Q",
      color: { dark: "#000000", light: "#ffffff" },
    })
      .then((d) => {
        if (!cancelled) setSrc(d);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [url, size, isAbsolute]);

  return (
    <div
      className={`relative inline-block bg-white p-4 rounded-2xl ${glow ? "mcb-halo" : ""}`}
      style={{
        boxShadow:
          "0 0 0 1px rgba(0,255,136,0.55), 0 0 40px rgba(0,255,136,0.22)",
      }}
    >
      {src ? (
        <img
          src={src}
          alt="QR kod"
          width={size}
          height={size}
          className="block"
          style={{ width: size, height: size, imageRendering: "pixelated" }}
        />
      ) : (
        <div
          style={{ width: size, height: size }}
          className="flex flex-col items-center justify-center gap-2 text-zinc-500 mcb-mono text-xs"
        >
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span>{isAbsolute ? "hazırlanıyor" : "bağlantı bekleniyor"}</span>
        </div>
      )}
    </div>
  );
}

/* ================================================================
   LIVE POLL
   ================================================================ */
type PollData = {
  slug: string;
  question: string;
  options: { id: string; label: string; emoji?: string }[];
  counts: Record<string, number>;
  total: number;
  closed: boolean;
};

function useLivePoll(slug: string, active: boolean, intervalMs = 1500) {
  const [data, setData] = useState<PollData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    const fetchOnce = async () => {
      try {
        const r = await fetch(`/api/polls/${slug}`, { cache: "no-store" });
        if (!r.ok) throw new Error(String(r.status));
        const j = (await r.json()) as PollData;
        if (!cancelled) {
          setData(j);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) setError(String(e));
      }
    };
    fetchOnce();
    const id = setInterval(fetchOnce, intervalMs);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [slug, active, intervalMs]);

  return { data, error };
}

function LivePoll({
  slug,
  origin,
  isActive,
  accent = "#00ff88",
}: {
  slug: string;
  origin: string;
  isActive: boolean;
  accent?: string;
}) {
  const { data } = useLivePoll(slug, isActive, 1500);
  const prevTotalRef = useRef(0);
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    if (!data) return;
    if (data.total > prevTotalRef.current && prevTotalRef.current > 0) {
      setPulseKey((k) => k + 1);
    }
    prevTotalRef.current = data.total;
  }, [data]);

  const max = data
    ? Math.max(1, ...Object.values(data.counts), 1)
    : 1;
  const url = `${origin}/poll/${slug}`;

  return (
    <div className="grid md:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center w-full max-w-[1400px] mx-auto text-left">
      <div className="min-w-0">
        <motion.div
          key={pulseKey}
          initial={{ opacity: 0.5, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="mcb-mono text-xs tracking-[0.4em] text-emerald-400/80 mb-3"
        >
          CANLI ANKET · {data?.total ?? 0} OY
        </motion.div>
        {data ? (
          <>
            <h2 className="text-3xl sm:text-5xl font-bold leading-tight mb-8 text-white">
              {data.question}
            </h2>
            <div className="space-y-4">
              {data.options.map((o) => {
                const c = data.counts[o.id] ?? 0;
                const pct = data.total ? (c / data.total) * 100 : 0;
                const wpct = (c / max) * 100;
                return (
                  <div key={o.id} className="relative">
                    <div className="flex items-center gap-3 mb-1.5">
                      {o.emoji && (
                        <span className="text-2xl shrink-0">{o.emoji}</span>
                      )}
                      <span className="text-lg sm:text-xl text-zinc-200 flex-1 min-w-0">
                        {o.label}
                      </span>
                      <span
                        className="mcb-mono text-xl sm:text-2xl font-bold tabular-nums"
                        style={{ color: accent }}
                      >
                        {c}
                        <span className="text-zinc-500 text-sm ml-2">
                          ({pct.toFixed(0)}%)
                        </span>
                      </span>
                    </div>
                    <div className="h-3 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${accent}55, ${accent})`,
                          boxShadow: `0 0 12px ${accent}66`,
                        }}
                        initial={false}
                        animate={{ width: `${wpct}%` }}
                        transition={{ type: "spring", stiffness: 80, damping: 18 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="h-12 sm:h-16 w-3/4 bg-zinc-900/80 rounded-md mb-8 animate-pulse" />
            <div className="space-y-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div
                    className="h-6 bg-zinc-900/60 rounded animate-pulse"
                    style={{ width: `${60 + ((i * 13) % 30)}%` }}
                  />
                  <div className="h-3 bg-zinc-900/80 rounded-full" />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col items-center gap-3 shrink-0">
        <QR url={url} size={220} />
        <div className="text-center">
          <div className="mcb-mono text-[11px] tracking-[0.3em] text-zinc-400 uppercase mb-1">
            Telefonunla tara
          </div>
          <div className="mcb-mono text-xs text-emerald-400/90 break-all max-w-[220px]">
            /poll/{slug}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   PASSWORD CRACKER (interactive — sahnede + telefonda QR)
   ================================================================ */
function PasswordCracker({
  isActive,
  origin,
}: {
  isActive: boolean;
  origin: string;
}) {
  const [pw, setPw] = useState("");
  const [reveal, setReveal] = useState(false);
  const [flashKey, setFlashKey] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isActive) inputRef.current?.focus();
  }, [isActive]);

  const bits = useMemo(() => passwordEntropy(pw), [pw]);
  const strength = useMemo(() => strengthLabel(bits), [bits]);
  const time = useMemo(() => crackTime(bits), [bits]);
  const leaked = useMemo(() => isLeaked(pw), [pw]);
  const meterPct = Math.min(100, (bits / 100) * 100);
  const flashColor = leaked ? "#f43f5e" : bits >= 80 ? "#00ff88" : "#fb923c";

  const onReveal = () => {
    setReveal(true);
    setFlashKey((k) => k + 1);
  };

  const testUrl = `${origin}/mcbukaf/sifre-test`;

  return (
    <div className="relative grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-start w-full max-w-[1600px] mx-auto text-left">
      <AnimatePresence>
        {reveal && (
          <motion.div
            key={flashKey}
            initial={{ opacity: 0.55 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="pointer-events-none fixed inset-0 z-[60]"
            style={{
              background: `radial-gradient(ellipse at center, ${flashColor}55 0%, ${flashColor}00 60%)`,
            }}
          />
        )}
      </AnimatePresence>
      <div className="min-w-0">
        <div className="mcb-mono mcb-tag text-emerald-400/85 mb-4">
          ŞİFRE KIRMA SİMÜLATÖRÜ · CANLI
        </div>
        <h2 className="mcb-h2 font-bold mb-8 text-white">
          Şifreni yaz, gerçeği gör.
        </h2>

        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            autoComplete="off"
            spellCheck={false}
            value={pw}
            onChange={(e) => {
              setPw(e.target.value);
              setReveal(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") onReveal();
            }}
            placeholder="örn. ankara06"
            className="w-full mcb-mono bg-zinc-950/80 border-2 border-zinc-800 focus:border-emerald-400 outline-none rounded-2xl px-7 py-7 text-white placeholder-zinc-700 transition-colors"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 4.5rem)",
              boxShadow: pw
                ? `0 0 35px ${strength.color}33, inset 0 0 22px ${strength.color}10`
                : undefined,
            }}
          />
          <button
            onClick={onReveal}
            disabled={!pw}
            className="absolute right-4 top-1/2 -translate-y-1/2 px-5 py-3 rounded-xl bg-emerald-400 text-black font-semibold hover:bg-emerald-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors mcb-mono mcb-meta tracking-wider"
          >
            KIR →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-7">
          <div className="rounded-xl border border-zinc-800 bg-black/40 p-5 min-w-0">
            <div className="mcb-mono mcb-tag text-zinc-500 mb-2">ENTROPİ</div>
            <div
              className="mcb-mono font-bold tabular-nums"
              style={{
                color: strength.color,
                fontSize: "clamp(1.75rem, 2.8vw, 2.75rem)",
                lineHeight: 1.05,
              }}
            >
              {bits.toFixed(1)}{" "}
              <span className="text-zinc-500" style={{ fontSize: "0.5em" }}>
                bit
              </span>
            </div>
            <div className="mt-3 h-2 bg-zinc-900 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: strength.color }}
                initial={false}
                animate={{ width: `${meterPct}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
              />
            </div>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-black/40 p-5 min-w-0">
            <div className="mcb-mono mcb-tag text-zinc-500 mb-2">
              KIRMA SÜRESİ
            </div>
            <div
              className="mcb-mono font-bold break-words"
              style={{
                color: strength.color,
                fontSize: "clamp(1.4rem, 2.2vw, 2.25rem)",
                lineHeight: 1.1,
              }}
            >
              {pw ? time : "—"}
            </div>
            <div className="mt-3 mcb-mono mcb-meta text-zinc-600">
              offline GPU · ~10¹¹/sn
            </div>
          </div>
          <div
            className="rounded-xl border-2 p-5 min-w-0"
            style={{
              borderColor: strength.color,
              background: `${strength.color}11`,
            }}
          >
            <div className="mcb-mono mcb-tag text-zinc-500 mb-2">
              DEĞERLENDİRME
            </div>
            <div
              className="mcb-mono font-black"
              style={{
                color: strength.color,
                fontSize: "clamp(1.75rem, 2.8vw, 2.75rem)",
                lineHeight: 1.05,
              }}
            >
              {strength.label}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {reveal && pw && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className={`mt-7 rounded-2xl p-7 border-2 ${
                leaked ? "mcb-stripes" : ""
              }`}
              style={{
                borderColor: leaked ? "#f43f5e" : strength.color,
                background: leaked
                  ? "rgba(244,63,94,0.18)"
                  : "rgba(0,255,136,0.06)",
              }}
            >
              {leaked ? (
                <div className="flex items-start gap-5">
                  <Skull
                    className="text-rose-400 shrink-0"
                    style={{ width: "clamp(3rem,5vw,5rem)", height: "clamp(3rem,5vw,5rem)" }}
                  />
                  <div>
                    <div className="mcb-mono mcb-tag text-rose-400 mb-2">
                      PWNED · LEAK DB
                    </div>
                    <div className="mcb-h3 font-bold text-rose-100 mb-2">
                      Bu şifre milyonlarca sızıntıda var.
                    </div>
                    <p className="mcb-body text-rose-200/85">
                      Saldırgan deneme yapmadan listesinde buldu.
                    </p>
                  </div>
                </div>
              ) : bits >= 80 ? (
                <div className="flex items-start gap-5">
                  <ShieldCheck
                    className="shrink-0"
                    style={{
                      color: strength.color,
                      width: "clamp(3rem,5vw,5rem)",
                      height: "clamp(3rem,5vw,5rem)",
                    }}
                  />
                  <div>
                    <div
                      className="mcb-mono mcb-tag mb-2"
                      style={{ color: strength.color }}
                    >
                      SAĞLAM
                    </div>
                    <div className="mcb-h3 font-bold text-emerald-100">
                      Bu şifre saldırganı yorar.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-5">
                  <AlertTriangle
                    className="shrink-0"
                    style={{
                      color: strength.color,
                      width: "clamp(3rem,5vw,5rem)",
                      height: "clamp(3rem,5vw,5rem)",
                    }}
                  />
                  <div>
                    <div
                      className="mcb-mono mcb-tag mb-2"
                      style={{ color: strength.color }}
                    >
                      YETERSİZ
                    </div>
                    <div className="mcb-h3 font-bold text-white">
                      Modern bir GPU bunu “{time}”da kırar.
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-5 mcb-mono mcb-meta text-zinc-600">
          Not: Hiçbir yere gönderilmez — tamamen tarayıcında çalışır.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 shrink-0">
        <div className="mcb-mono mcb-tag text-emerald-400/85 text-center">
          KENDİ ŞİFRENİ TELEFONDA TEST ET
        </div>
        <QR url={testUrl} size={260} />
        <div className="text-center">
          <div className="mcb-mono mcb-meta text-emerald-400/90 break-all max-w-[260px]">
            /mcbukaf/sifre-test
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SLIDE PRIMITIVES
   ================================================================ */
function Centered({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center h-full px-6 sm:px-12 text-center ${className}`}
    >
      {children}
    </div>
  );
}

function FullCenter({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center h-full w-full px-6 sm:px-12 ${className}`}
    >
      {children}
    </div>
  );
}

function SectionTitle({
  number,
  title,
  subtitle,
  color = "#00ff88",
  Icon,
}: {
  number: string;
  title: string;
  subtitle: string;
  color?: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}) {
  return (
    <Centered>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 mcb-ring"
          style={{
            borderColor: `${color}25`,
            width: "min(80vmin, 1100px)",
            height: "min(80vmin, 1100px)",
          }}
        />
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 140, damping: 14 }}
          className="mb-9 rounded-3xl"
          style={{
            background: `${color}15`,
            border: `1px solid ${color}55`,
            boxShadow: `0 0 70px ${color}33`,
            padding: "clamp(1.25rem, 2vw, 2.25rem)",
          }}
        >
          <Icon
            style={{
              width: "clamp(4rem, 7vw, 9rem)",
              height: "clamp(4rem, 7vw, 9rem)",
              color,
            }}
          />
        </motion.div>
        <div
          className="mcb-mono mcb-tag mb-5 opacity-85"
          style={{ color }}
        >
          BÖLÜM {number}
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mcb-h1 font-black tracking-tight"
          style={{
            color,
            textShadow: `0 0 30px ${color}66, 0 0 100px ${color}22`,
          }}
        >
          {title}
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="h-[4px] my-9 rounded-full"
          style={{
            width: "min(40vw, 640px)",
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            boxShadow: `0 0 22px ${color}88`,
          }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mcb-lead text-zinc-200 max-w-[90vw]"
        >
          {subtitle}
        </motion.p>
      </div>
    </Centered>
  );
}

function StatNumber({
  value,
  unit,
  label,
  color,
  delay = 0,
  active,
}: {
  value: number;
  unit: string;
  label: string;
  color: string;
  delay?: number;
  active: boolean;
}) {
  const v = useCountUp(value, 1800, delay * 1000, active);
  const formatted =
    value >= 1_000_000_000
      ? (v / 1_000_000_000).toFixed(1) + " mlyr"
      : value >= 1_000_000
        ? (v / 1_000_000).toFixed(1) + " mln"
        : value >= 1_000
          ? (v / 1_000).toFixed(1) + " bin"
          : v.toFixed(value % 1 === 0 ? 0 : 2);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 90 }}
      className="text-center"
    >
      <div
        className="mcb-mono mcb-stat font-black mcb-stat-shadow tabular-nums"
        style={{ color }}
      >
        {formatted}
        <span className="mcb-stat-unit ml-3 opacity-70">{unit}</span>
      </div>
      <p className="mcb-body text-zinc-200 max-w-[16ch] mx-auto mt-5">
        {label}
      </p>
    </motion.div>
  );
}

/* ================================================================
   SCENARIO BLOCKS
   ================================================================ */
function MockSMS({
  from,
  body,
  highlights = [],
}: {
  from: string;
  body: string;
  highlights?: { text: string; note: string }[];
}) {
  type Part = string | { key: string; text: string; note: string };
  let parts: Part[] = [body];
  highlights.forEach((h) => {
    const next: Part[] = [];
    for (const p of parts) {
      if (typeof p !== "string") {
        next.push(p);
        continue;
      }
      const idx = p.indexOf(h.text);
      if (idx === -1) {
        next.push(p);
        continue;
      }
      next.push(p.slice(0, idx));
      next.push({ key: h.text, text: h.text, note: h.note });
      next.push(p.slice(idx + h.text.length));
    }
    parts = next;
  });
  const rendered: ReactNode[] = parts.map((p, i) =>
    typeof p === "string" ? (
      <span key={i}>{p}</span>
    ) : (
      <span
        key={`hl-${i}-${p.key}`}
        className="bg-rose-500/30 text-rose-200 border-b-2 border-rose-400 px-1 mx-0.5 rounded"
        title={p.note}
      >
        {p.text}
      </span>
    ),
  );
  return (
    <div className="max-w-md w-full">
      <div className="rounded-2xl bg-zinc-900 border border-zinc-700 overflow-hidden shadow-2xl">
        <div className="bg-zinc-800 px-5 py-4 border-b border-zinc-700">
          <div className="text-zinc-300 mcb-meta">{from}</div>
          <div className="text-zinc-500 mcb-meta mcb-mono">şimdi · SMS</div>
        </div>
        <div className="p-6 text-zinc-100 mcb-lead leading-relaxed">
          {rendered}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SLIDE DEFINITIONS
   ================================================================ */
function ColdOpen({ isActive }: { isActive: boolean }) {
  const lines = useMemo(
    () => [
      "$ ./baglan --etkinlik mcbukaf-2026",
      "[TAMAM] Sistem açılıyor ............................ HAZIR",
      "[TAMAM] Modül yükleniyor: son_kullanıcı_zafiyetleri  HAZIR",
      "[ UYARI ] 1.2 milyar parola karanlık ağda bulundu.",
      "[TAMAM] Salon dinleyici listesi yükleniyor .......... HAZIR",
      "",
      "> Şifrene gerçekten güveniyor musun?",
      "",
    ],
    [],
  );
  const { out, done } = useTypewriter(lines, 22, isActive);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      <MatrixRain density={0.6} />
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <pre className="mcb-mono text-emerald-400 mcb-body max-w-[90vw] whitespace-pre-wrap">
          {out.map((l, i) => (
            <div
              key={i}
              className={
                l.startsWith("[ UYARI ]")
                  ? "text-rose-400"
                  : l.startsWith("[TAMAM]")
                    ? "text-emerald-300"
                    : l.startsWith(">")
                      ? "text-cyan-300 mcb-h2 mt-6"
                      : ""
              }
            >
              {l}
              {i === out.length - 1 && !done && (
                <span className="mcb-cursor" />
              )}
            </div>
          ))}
          {done && (
            <span className="text-cyan-300 mcb-h2 mcb-cursor" />
          )}
        </pre>
      </div>
    </div>
  );
}

function TitleSlide() {
  return (
    <div className="relative w-full h-full">
      <MatrixRain density={0.85} />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
          className="mb-8 relative"
        >
          <div
            className="absolute inset-0 rounded-full mcb-ring"
            style={{
              boxShadow: "0 0 100px 20px rgba(0,255,136,0.32)",
            }}
          />
          <ShieldAlert
            className="relative"
            style={{
              width: "clamp(7rem, 13vw, 16rem)",
              height: "clamp(7rem, 13vw, 16rem)",
              color: "#00ff88",
              filter: "drop-shadow(0 0 24px rgba(0,255,136,0.6))",
            }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mcb-mono mcb-tag text-emerald-400/80 mb-5"
        >
          MCBÜKAF · 2026
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mcb-mega font-black text-white mb-5"
          style={{
            textShadow:
              "0 0 40px rgba(0,255,136,0.5), 0 0 100px rgba(0,255,136,0.25)",
          }}
        >
          <Glitch text="İNTERAKTİF SİBER GÜVENLİK" />
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mcb-h3 text-zinc-200 max-w-[90vw] mb-12 font-light"
        >
          Son Kullanıcı Zafiyetleri ve Sosyal Mühendislik
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mcb-lead text-zinc-100"
        >
          Öğr. Gör.{" "}
          <span className="font-bold text-white">Osman Can ÇETLENBİK</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-5 mcb-mono mcb-meta tracking-widest text-zinc-400"
        >
          Manisa CBÜ · Ümit Doğay Arınç KM Amfi 1 · 13 Mayıs 2026
        </motion.div>
      </div>
    </div>
  );
}

function QRBaitSlide({
  origin,
  path,
  brandTag,
  brandColor,
  headline,
  subheadline,
  ctaTone,
}: {
  origin: string;
  path: string;
  brandTag: string;
  brandColor: string;
  headline: string;
  subheadline: string;
  ctaTone: "warm" | "alert" | "neutral";
}) {
  const url = `${origin}${path}`;
  const ctaBg =
    ctaTone === "warm"
      ? "from-orange-400 to-rose-500"
      : ctaTone === "alert"
        ? "from-rose-500 to-rose-700"
        : "from-emerald-400 to-cyan-500";
  return (
    <FullCenter>
      <div className="w-full max-w-[1500px] grid lg:grid-cols-[1fr_auto] gap-12 items-center">
        <div className="min-w-0">
          <div className="mcb-mono mcb-tag mb-4" style={{ color: brandColor }}>
            <span className="inline-flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  background: brandColor,
                  animation: "mcb-blink 1.2s infinite",
                  boxShadow: `0 0 14px ${brandColor}99`,
                }}
              />
              {brandTag}
            </span>
          </div>
          <h2 className="mcb-h1 font-black text-white max-w-[16ch] leading-[1.05] mb-6">
            {headline}
          </h2>
          <p className="mcb-lead text-zinc-200 max-w-[22ch] mb-8">
            {subheadline}
          </p>
          <div
            className={`inline-flex items-center gap-2 rounded-2xl px-7 py-4 mcb-h3 font-bold text-white bg-gradient-to-r ${ctaBg}`}
            style={{ boxShadow: `0 0 40px ${brandColor}44` }}
          >
            <span>Telefonla tara →</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <QR url={url} size={420} />
          <div className="mcb-mono mcb-meta text-zinc-400 tracking-widest break-all max-w-[420px] text-center">
            {url.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    </FullCenter>
  );
}

function QRTuzakExplain() {
  const flags = [
    { tag: "DOMAIN", body: "turktelekom-kampanya-mcbukaf.co — .co + tire + ek kelimeler = uydurma." },
    { tag: "ACILİYET", body: "‘SON 4 SAAT’ — yapay kıtlık." },
    { tag: "ÖDÜL", body: "‘1.000 TL bedava’ — bedava yemde değil, oltadasın." },
    { tag: "GÖRSEL TAKLİT", body: "Logo + kurumsal renk Canva'da 1 dakikada yapılır." },
    { tag: "YETKİSİZ QR", body: "Afişte/sergi yanında QR — üzerine yapıştırılmış olabilir." },
  ];
  return (
    <FullCenter>
      <div className="w-full max-w-[1500px]">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mcb-mono mcb-tag text-rose-400 mb-3 text-center"
        >
          QUISHING · QR PHISHING
        </motion.div>
        <h2 className="mcb-h2 font-bold text-white mb-3 text-center">
          Telefonuna ne yansıdı?
        </h2>
        <p className="mcb-lead text-zinc-200 mb-8 text-center max-w-[60ch] mx-auto">
          O sayfanın bir sonraki adımı{" "}
          <span className="text-rose-300 font-semibold">
            kimlik, telefon ve banka kartı
          </span>{" "}
          istemekti. Gerçek bir saldırı olsaydı, hepsi karşı tarafta olurdu.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {flags.map((f, i) => (
            <motion.div
              key={f.tag}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="rounded-2xl border border-rose-400/30 bg-rose-500/5 p-5 min-w-0"
            >
              <div className="mcb-mono mcb-tag text-rose-300 mb-2">
                {String(i + 1).padStart(2, "0")} · {f.tag}
              </div>
              <p className="mcb-body text-zinc-100">{f.body}</p>
            </motion.div>
          ))}
        </div>
        <p className="mt-8 text-center mcb-lead text-emerald-300">
          ✓ Bilmediğin QR'a tıklama. Tıkladıysan adres çubuğunu oku.
        </p>
      </div>
    </FullCenter>
  );
}

function CihazIzExplain() {
  const leaks = [
    { tag: "IP + KONUM", body: "Şehrini ve ISS sağlayıcını verir; reklam ağları için yeterli." },
    { tag: "CİHAZ MARKASI", body: "iPhone 15 Pro mu Samsung A54 mü — hedefli kampanyada gümrük + paywall ayarlanır." },
    { tag: "PIL / BAĞLANTI", body: "Pil seviyesi + Wi-Fi/4G durumu = anlık konum doğrulaması." },
    { tag: "SAAT DİLİMİ", body: "Avrupa/Istanbul = iş saatleri saldırı zamanlaması." },
    { tag: "DİL / EKRAN", body: "Türkçe + 6.7'' = Türk kullanıcı + mobil arayüz şablonu seç." },
    { tag: "ÇEREZ / REFERER", body: "Hangi siteden geldin? Reklam ağı seni siteler arası takip eder." },
  ];
  return (
    <FullCenter>
      <div className="w-full max-w-[1500px]">
        <div className="mcb-mono mcb-tag text-cyan-400/85 mb-3 text-center">
          PARMAK İZİ · QR'A TIKLADIĞIN ANDA
        </div>
        <h2 className="mcb-h2 font-bold text-white mb-3 text-center">
          Sayfayı açtın. Hiçbir şey yazmadın.
        </h2>
        <p className="mcb-lead text-zinc-200 mb-8 text-center max-w-[60ch] mx-auto">
          Yine de tarayıcın bir <strong>profil</strong> oluşturdu. Reklam ağları
          bunu 100+ sitede senin "izin" diye okur.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {leaks.map((l, i) => (
            <motion.div
              key={l.tag}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i }}
              className="rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-5 min-w-0"
            >
              <div className="mcb-mono mcb-tag text-cyan-300 mb-2">{l.tag}</div>
              <p className="mcb-body text-zinc-100">{l.body}</p>
            </motion.div>
          ))}
        </div>
        <p className="mt-8 text-center mcb-lead text-emerald-300">
          ✓ Tarayıcı reklam izleyicilerini engelle (Brave, uBlock Origin).
        </p>
      </div>
    </FullCenter>
  );
}

function SahteBankaExplain() {
  return (
    <FullCenter>
      <div className="w-full max-w-[1500px]">
        <div className="mcb-mono mcb-tag text-rose-400 mb-3 text-center">
          SAHTE BANKA TUZAĞI · KESİT ANALİZ
        </div>
        <h2 className="mcb-h2 font-bold text-white mb-8 text-center max-w-[20ch] mx-auto">
          Form çalışıyor. SSL var. Yine de tuzak.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              tag: "DOMAIN ANATOMİSİ",
              bad: "bankam-guvenli-giris.co",
              fix: "Gerçek bankaların domain'i kendi adıyla başlar ve .com.tr ile biter.",
            },
            {
              tag: "SSL ≠ GÜVENLİK",
              bad: "🔒 yeşil kilit",
              fix: "Sadece şifreli bağlantı. Saldırgan da bunu kolay alır.",
            },
            {
              tag: "ŞİFRE TALEBİ",
              bad: "İnternet bankacılık şifresini sayfada iste",
              fix: "Hiçbir banka link / QR üzerinden şifre tamamını istemez.",
            },
            {
              tag: "ACİL DOĞRULAMA",
              bad: "‘Hesap kilitlendi, doğrulayın’",
              fix: "Hesabın gerçekten kilitlendiyse uygulamadan görürsün — link gelmez.",
            },
            {
              tag: "GÖRSEL TAKLİT",
              bad: "Kurumsal renkler + logo",
              fix: "Sahte sayfa açmak bir saatlik iş. Görsel doğrulama yetmez.",
            },
            {
              tag: "TC + ŞİFRE BERABER",
              bad: "Tek formda iki kritik veri",
              fix: "Banka ekranları çok adımlı, kademeli onaylar — tek seferlik değil.",
            },
          ].map((it, i) => (
            <motion.div
              key={it.tag}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i }}
              className="rounded-2xl border border-rose-400/30 bg-rose-500/5 p-5 min-w-0"
            >
              <div className="mcb-mono mcb-tag text-rose-300 mb-2">
                {it.tag}
              </div>
              <div className="mcb-mono mcb-meta text-rose-100/90 mb-2 break-all">
                ✗ {it.bad}
              </div>
              <p className="mcb-body text-zinc-100">{it.fix}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </FullCenter>
  );
}

function PhishingEmailRain({ active }: { active: boolean }) {
  // 12 falling email envelopes — pure CSS-anim feel via framer-motion
  const items = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        x: 5 + (i * 7.3) % 90,
        delay: (i * 0.4) % 5,
        duration: 6 + (i % 4) * 1.5,
        size: 28 + (i % 3) * 10,
      })),
    [],
  );
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {items.map((it, i) => (
        <motion.div
          key={i}
          initial={{ y: -80, opacity: 0 }}
          animate={
            active
              ? { y: ["-10%", "110%"], opacity: [0, 0.55, 0.55, 0] }
              : { opacity: 0 }
          }
          transition={{
            repeat: Infinity,
            duration: it.duration,
            delay: it.delay,
            ease: "linear",
            times: [0, 0.1, 0.9, 1],
          }}
          className="absolute"
          style={{ left: `${it.x}%`, fontSize: it.size }}
        >
          <span className="text-rose-400/70">✉</span>
        </motion.div>
      ))}
    </div>
  );
}

function HookStat({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-full">
      <PhishingEmailRain active={isActive} />
      <Centered>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mcb-mono mcb-tag text-rose-400 mb-4 relative z-10"
        >
          <span className="inline-flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full bg-rose-400"
              style={{
                animation: "mcb-blink 1s infinite",
                boxShadow: "0 0 12px rgba(244,63,94,0.8)",
              }}
            />
            SON 24 SAATTE · KÜRESEL
          </span>
        </motion.div>
        <h2 className="mcb-h2 text-white mb-14 max-w-[80vw] relative z-10">
          Bu konuşmayı dinlerken bile saldırı durmuyor.
        </h2>
        <div className="flex flex-wrap items-start justify-center gap-12 sm:gap-24 relative z-10">
          <StatNumber
            value={3.4}
            unit="mlyr"
            label="günlük oltalama e-postası"
            color="#f43f5e"
            delay={0.2}
            active={isActive}
          />
          <StatNumber
            value={39}
            unit="sn"
            label="iki saldırı arası süre"
            color="#fbbf24"
            delay={0.7}
            active={isActive}
          />
          <StatNumber
            value={4.88}
            unit="M$"
            label="ortalama veri ihlali maliyeti"
            color="#22d3ee"
            delay={1.2}
            active={isActive}
          />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ delay: 2.4 }}
          className="mt-16 mcb-meta text-zinc-500 mcb-mono relative z-10"
        >
          IBM Cost of a Data Breach 2024 · Maryland Univ. · Statista
        </motion.p>
      </Centered>
    </div>
  );
}

function MitnickQuote() {
  const quote =
    "Sosyal mühendislik, dünyanın en güvenli sistemini bile bypass eder. Çünkü insan değişmez.";
  const words = quote.split(" ");
  return (
    <Centered>
      {/* pulse ring backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1.6, opacity: [0, 0.35, 0] }}
            transition={{
              repeat: Infinity,
              duration: 5,
              delay: i * 1.5,
              ease: "easeOut",
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
            style={{
              borderColor: "rgba(34,211,238,0.35)",
              width: "min(60vmin,720px)",
              height: "min(60vmin,720px)",
            }}
          />
        ))}
      </div>
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 140 }}
        className="mb-10 relative z-10"
      >
        <Brain
          style={{
            width: "clamp(5rem, 8vw, 9rem)",
            height: "clamp(5rem, 8vw, 9rem)",
            color: "#22d3ee",
            filter: "drop-shadow(0 0 24px rgba(34,211,238,0.6))",
          }}
        />
      </motion.div>
      <blockquote className="mcb-h1 font-light italic text-zinc-100 max-w-[85vw] leading-tight relative z-10">
        <span className="text-cyan-400/80">“</span>
        {words.map((w, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
            className="inline-block mr-[0.25em]"
          >
            {w}
          </motion.span>
        ))}
        <span className="text-cyan-400/80">”</span>
      </blockquote>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 + words.length * 0.08 + 0.4 }}
        className="mt-12 mcb-lead text-zinc-400 mcb-mono tracking-widest relative z-10"
      >
        — Kevin Mitnick
      </motion.p>
    </Centered>
  );
}

function RealStory({ isActive }: { isActive: boolean }) {
  const dialogue = useMemo(
    () => [
      {
        text: "Hanımefendi, bankadan arıyoruz.",
        delay: 1.4,
      },
      {
        text: "Hesabınızdan şüpheli bir işlem yapıldı.",
        delay: 2.8,
      },
      {
        text: "Doğrulamak için size bir kod göndereceğiz…",
        delay: 4.4,
      },
    ],
    [],
  );

  // 7-minute timer fill (visual only, fast)
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!isActive) {
      setProgress(0);
      return;
    }
    const start = performance.now();
    const dur = 7000; // visual 7s instead of 7 dk
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const t = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, 5800);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [isActive]);

  // Bank balance dramatic drop after timer hits 100%
  const [drained, setDrained] = useState(false);
  useEffect(() => {
    if (!isActive) {
      setDrained(false);
      return;
    }
    const t = setTimeout(() => setDrained(true), 13200);
    return () => clearTimeout(t);
  }, [isActive]);

  const initialBalance = 47820;
  const balance = drained ? 0 : initialBalance;
  const animatedBalance = useCountUp(balance, 1100, 0, isActive);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <MatrixRain density={0.35} />
      {/* dramatic red flash at the moment of drain */}
      <AnimatePresence>
        {drained && (
          <motion.div
            initial={{ opacity: 0.55 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(244,63,94,0.5) 0%, rgba(244,63,94,0) 65%)",
            }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex items-center justify-center h-full px-6 sm:px-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center w-full max-w-[1500px]">
          {/* dialog column */}
          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isActive ? { opacity: 1 } : { opacity: 0 }}
              className="mcb-mono mcb-tag text-rose-400 mb-4"
            >
              <span className="inline-flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full bg-rose-400"
                  style={{
                    animation: "mcb-blink 1s infinite",
                    boxShadow: "0 0 12px rgba(244,63,94,0.8)",
                  }}
                />
                CANLI · GERÇEK SENARYO
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mcb-h1 font-black text-white mb-6"
            >
              Annemi aradılar.
            </motion.h2>
            <div className="space-y-3 mb-8">
              {dialogue.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0 }}
                  transition={{ delay: d.delay, duration: 0.5 }}
                  className="rounded-xl bg-zinc-900/70 border border-rose-400/25 p-4"
                >
                  <div className="mcb-mono mcb-tag text-rose-400/80 mb-1">
                    BANKA · 0212-***-**-**
                  </div>
                  <p className="mcb-lead text-zinc-100">"{d.text}"</p>
                </motion.div>
              ))}
            </div>

            {/* timer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isActive ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 5.8 }}
              className="mb-7"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="mcb-mono mcb-tag text-amber-400">
                  TELEFONDA GEÇEN SÜRE
                </span>
                <span className="mcb-mono mcb-meta text-zinc-300 tabular-nums">
                  {Math.floor(progress * 7)} dk {Math.floor((progress * 7 * 60) % 60)} sn
                </span>
              </div>
              <div className="h-3 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                <motion.div
                  className="h-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #fbbf24, #f97316, #f43f5e)",
                    boxShadow: "0 0 12px rgba(244,63,94,0.6)",
                    width: `${progress * 100}%`,
                  }}
                />
              </div>
            </motion.div>

            {/* outcome statements */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={
                isActive && drained
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 10 }
              }
              transition={{ duration: 0.6 }}
              className="space-y-2"
            >
              <p className="mcb-h3 text-zinc-100">Annem onayladı.</p>
              <p className="mcb-h3 text-rose-300 font-bold">
                Sabah: hesap boştu.
              </p>
            </motion.div>
          </div>

          {/* Mock bank app card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={
              isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }
            }
            transition={{ delay: 0.3, duration: 0.6 }}
            className="rounded-3xl border border-zinc-700 bg-gradient-to-br from-zinc-900 to-zinc-950 p-7 shadow-2xl"
            style={{
              width: "min(420px, 85vw)",
              boxShadow: drained
                ? "0 0 80px rgba(244,63,94,0.45)"
                : "0 0 40px rgba(0,0,0,0.6)",
              borderColor: drained
                ? "rgba(244,63,94,0.5)"
                : "rgba(63,63,70,0.8)",
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="mcb-mono text-xs tracking-[0.3em] text-zinc-500 mb-1">
                  BANKAM · MOBİL
                </div>
                <div className="text-zinc-300 text-base">Vadesiz Hesap</div>
              </div>
              <div
                className="w-9 h-9 rounded-full"
                style={{
                  background: drained
                    ? "linear-gradient(135deg, #f43f5e, #be123c)"
                    : "linear-gradient(135deg, #06b6d4, #0891b2)",
                }}
              />
            </div>
            <div className="mcb-mono text-zinc-500 text-xs tracking-[0.3em] mb-2">
              BAKİYE
            </div>
            <motion.div
              animate={drained ? { scale: [1, 1.05, 1] } : { scale: 1 }}
              transition={{ duration: 0.6 }}
              className="font-bold tabular-nums leading-none"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                color: drained ? "#f43f5e" : "#fafafa",
                textShadow: drained
                  ? "0 0 25px rgba(244,63,94,0.6)"
                  : "none",
              }}
            >
              ₺{Math.round(animatedBalance).toLocaleString("tr-TR")}
            </motion.div>
            <AnimatePresence>
              {drained && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 rounded-xl bg-rose-500/15 border border-rose-400/40 p-3"
                >
                  <div className="mcb-mono text-[10px] tracking-[0.3em] text-rose-300 mb-1">
                    SON İŞLEM
                  </div>
                  <div className="flex justify-between text-rose-100">
                    <span>EFT · 03:14</span>
                    <span className="mcb-mono">−₺47.820,00</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* footer punchline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isActive && drained ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-16 left-0 right-0 z-10 text-center px-6"
      >
        <p className="mcb-h2 text-emerald-400 font-bold">
          Saldırgan tek bir satır kod yazmadı. Sadece konuştu.
        </p>
      </motion.div>
    </div>
  );
}

function SMSScene({
  showHighlights,
  origin,
  isActive,
}: {
  showHighlights: boolean;
  origin: string;
  isActive: boolean;
}) {
  const highlights = showHighlights
    ? [
        { text: "ptt-tr.co", note: "Sahte alan adı (gerçek: ptt.gov.tr)" },
        { text: "10 dk içinde", note: "Aciliyet duygusu" },
        { text: "0532...", note: "Tanımadığın numara" },
      ]
    : [];
  return (
    <div className="grid md:grid-cols-[auto_1fr] gap-12 items-center w-full max-w-[1400px] px-6">
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="flex justify-center"
      >
        <MockSMS
          from="0532 *** ** **"
          body="Kargonuz teslim edilemedi. 10 dk içinde ücret yatırın: ptt-tr.co/x9k. Aksi halde iade edilecek."
          highlights={highlights}
        />
      </motion.div>
      {showHighlights ? (
        <div>
          <div className="mcb-mono mcb-tag text-rose-400 mb-4">
            KIRMIZI BAYRAKLAR
          </div>
          <h2 className="mcb-h2 font-bold text-white mb-7">
            3 işaret. Üçü birden mi? Sil.
          </h2>
          <ul className="space-y-5 text-zinc-100 mcb-body">
            <li className="flex items-start gap-4">
              <span className="mcb-mono text-rose-400 shrink-0">01</span>
              <span>
                <strong>Sahte domain.</strong> Gerçek PTT:{" "}
                <span className="mcb-mono text-emerald-400">ptt.gov.tr</span>.
                Buradaki:{" "}
                <span className="mcb-mono text-rose-400">ptt-tr.co</span>.
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="mcb-mono text-rose-400 shrink-0">02</span>
              <span>
                <strong>Aciliyet.</strong> “10 dakika” diyen her mesaj seni
                düşünmeden tıklatmak ister.
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="mcb-mono text-rose-400 shrink-0">03</span>
              <span>
                <strong>Kısa link / yabancı TLD.</strong> .co, .ru, .top, .xyz
                — hızlı kayıt, ucuz, takip kolay değil.
              </span>
            </li>
          </ul>
          <p className="mt-7 mcb-h3 text-emerald-300">
            ✓ Doğrusu: tıklama. Tarayıcıdan ptt.gov.tr'yi sen aç.
          </p>
        </div>
      ) : (
        <LivePoll
          slug="mcb-2-sms-trap"
          origin={origin}
          isActive={isActive}
          accent="#fbbf24"
        />
      )}
    </div>
  );
}

function PasswordStats({ isActive }: { isActive: boolean }) {
  const items = [
    { rank: 1, pw: "123456", count: "1.2M" },
    { rank: 2, pw: "şifre123", count: "780K" },
    { rank: 3, pw: "qwerty", count: "615K" },
    { rank: 4, pw: "ankara06", count: "402K" },
    { rank: 5, pw: "iloveyou", count: "388K" },
    { rank: 6, pw: "fenerbahce1907", count: "291K" },
    { rank: 7, pw: "galatasaray", count: "274K" },
  ];
  return (
    <Centered>
      <div className="mcb-mono mcb-tag text-rose-400 mb-4">
        TÜRKİYE · SIZINTI ARŞİVLERİ
      </div>
      <h2 className="mcb-h2 font-bold mb-10 text-white">
        En çok kullanılan şifreler.
      </h2>
      <div className="space-y-3 w-full max-w-[1100px]">
        {items.map((it, i) => (
          <motion.div
            key={it.pw}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isActive ? 1 : 0, x: 0 }}
            transition={{ delay: 0.08 * i }}
            className="grid grid-cols-[80px_1fr_auto] items-center gap-5 p-5 rounded-xl border border-zinc-800 bg-black/40"
          >
            <span className="mcb-mono mcb-h3 text-zinc-600 tabular-nums">
              #{it.rank}
            </span>
            <span className="mcb-mono mcb-h3 text-rose-300">{it.pw}</span>
            <span className="mcb-mono mcb-meta text-zinc-400 tabular-nums">
              {it.count} hesap
            </span>
          </motion.div>
        ))}
      </div>
      <p className="mt-10 mcb-lead text-zinc-300 max-w-3xl">
        Hepsi 1 saniyeden kısa sürede kırılır.
      </p>
    </Centered>
  );
}

function PassphraseFormula() {
  return (
    <Centered>
      <Sparkles
        className="text-emerald-400 mb-7"
        style={{
          width: "clamp(3.5rem, 5vw, 5.5rem)",
          height: "clamp(3.5rem, 5vw, 5.5rem)",
        }}
      />
      <h2 className="mcb-h2 font-bold mb-10 text-white max-w-[88vw]">
        Yeni formül: <span className="text-emerald-400">cümle</span>, kelime
        değil.
      </h2>
      <div className="space-y-6 w-full max-w-[1100px]">
        <div className="rounded-2xl p-7 border border-rose-500/40 bg-rose-500/5 mcb-stripes">
          <div className="mcb-mono mcb-tag text-rose-300 mb-3">ESKİ</div>
          <div className="mcb-mono mcb-h2 text-rose-100">Ankara2024!</div>
          <div className="mcb-mono mcb-meta text-rose-300 mt-3">
            ~33 bit · saniyeler içinde kırılır
          </div>
        </div>
        <div className="rounded-2xl p-7 border-2 border-emerald-400 bg-emerald-400/10">
          <div className="mcb-mono mcb-tag text-emerald-300 mb-3">YENİ</div>
          <div className="mcb-mono mcb-h2 text-emerald-100 break-all">
            kahve-yeşil-bisiklet-portal-2026
          </div>
          <div className="mcb-mono mcb-meta text-emerald-300 mt-3">
            ~110 bit · trilyon yıl gerekir
          </div>
        </div>
      </div>
      <p className="mt-10 mcb-lead text-zinc-200 max-w-[80vw]">
        Hatırlanması kolay, kırılması imkansız. Bitwarden / 1Password bunu
        senin için üretir.
      </p>
    </Centered>
  );
}

function TwoFAExplainer() {
  return (
    <Centered>
      <h2 className="mcb-h2 font-bold mb-12 text-white max-w-[90vw]">
        İki Adımlı Doğrulama: üç katmanlı kalkan.
      </h2>
      <div className="grid sm:grid-cols-3 gap-6 w-full max-w-[1400px]">
        {[
          {
            icon: Brain,
            title: "BİLDİĞİN",
            body: "Şifre, PIN.",
            color: "#22d3ee",
          },
          {
            icon: Phone,
            title: "SAHİP OLDUĞUN",
            body: "Telefon, donanım anahtarı.",
            color: "#00ff88",
          },
          {
            icon: Fingerprint,
            title: "SEN OLDUĞUN",
            body: "Yüz, parmak izi.",
            color: "#fbbf24",
          },
        ].map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * i }}
            className="rounded-2xl p-8 border bg-black/40"
            style={{
              borderColor: `${c.color}55`,
              boxShadow: `0 0 35px ${c.color}22`,
            }}
          >
            <c.icon
              className="mb-5"
              style={{
                width: "clamp(3.5rem, 5vw, 5rem)",
                height: "clamp(3.5rem, 5vw, 5rem)",
                color: c.color,
              }}
            />
            <div className="mcb-mono mcb-tag mb-3" style={{ color: c.color }}>
              {c.title}
            </div>
            <p className="mcb-lead text-zinc-100 text-left">{c.body}</p>
          </motion.div>
        ))}
      </div>
      <p className="mt-12 mcb-lead text-zinc-200 max-w-[80vw]">
        Kombinasyon = saldırının %99'unu durdurur. Microsoft 2024.
      </p>
    </Centered>
  );
}

function PhishingTechniqueCard({
  label,
  bad,
  good,
  note,
  cardDelay,
}: {
  label: string;
  bad: string;
  good: string;
  note: string;
  cardDelay: number;
}) {
  // Animate the bad URL typing in, then briefly highlight the diff
  const [phase, setPhase] = useState<"hidden" | "typing" | "highlight" | "done">(
    "hidden",
  );
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let raf: ReturnType<typeof setTimeout>;
    raf = setTimeout(() => {
      setPhase("typing");
      let i = 0;
      const typeNext = () => {
        i++;
        setTyped(bad.slice(0, i));
        if (i < bad.length) {
          raf = setTimeout(typeNext, 35);
        } else {
          raf = setTimeout(() => setPhase("highlight"), 400);
          raf = setTimeout(() => setPhase("done"), 1500);
        }
      };
      typeNext();
    }, cardDelay * 1000);
    return () => clearTimeout(raf);
  }, [bad, cardDelay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: cardDelay }}
      className="rounded-2xl border border-zinc-800 bg-black/40 p-7 min-w-0"
    >
      <div className="mcb-mono mcb-tag text-amber-400 mb-4">{label}</div>
      <div className="space-y-3">
        <div className="relative mcb-mono mcb-h3 break-all min-h-[1.4em]">
          <span className="text-rose-300">✗ </span>
          <motion.span
            animate={
              phase === "highlight"
                ? { color: ["#fca5a5", "#fef08a", "#fca5a5"] }
                : {}
            }
            transition={{ duration: 0.4, repeat: 2 }}
            className="text-rose-300"
          >
            {typed}
          </motion.span>
          {phase === "typing" && (
            <span className="text-rose-300 animate-pulse">▌</span>
          )}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={
            phase === "done" ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }
          }
          transition={{ duration: 0.4 }}
          className="mcb-mono mcb-h3 text-emerald-300 break-all"
        >
          ✓ {good}
        </motion.div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={phase === "done" ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4 mcb-body text-zinc-300"
      >
        {note}
      </motion.p>
    </motion.div>
  );
}

function PhishingTechniques() {
  const items = [
    {
      label: "IDN HOMOGRAPH",
      bad: "gооgle.com",
      good: "google.com",
      note: "Kiril 'о' Latin 'o'na benzer, gözle ayrılmaz.",
    },
    {
      label: "SUBDOMAIN TRICK",
      bad: "google.com.security-update.xyz",
      good: "google.com",
      note: "Asıl domain en sondaki .xyz — google sadece subdomain.",
    },
    {
      label: "TYPOSQUAT",
      bad: "amaz0n.com",
      good: "amazon.com",
      note: "0 yerine o, l yerine 1.",
    },
    {
      label: "COMBOSQUAT",
      bad: "facebook-login-secure.com",
      good: "facebook.com",
      note: "Tanıdık kelime + 'secure', 'login', 'verify'.",
    },
  ];
  return (
    <FullCenter>
      <div className="text-center mb-2">
        <h2 className="mcb-h2 font-bold text-white">Phishing'in 4 numarası.</h2>
      </div>
      <p className="mcb-lead text-zinc-300 mb-10 text-center max-w-[80vw]">
        Hepsi seni tanıdık bir şeye baktığına ikna eder.
      </p>
      <div className="grid md:grid-cols-2 gap-5 w-full max-w-[1400px]">
        {items.map((it, i) => (
          <PhishingTechniqueCard
            key={it.label}
            label={it.label}
            bad={it.bad}
            good={it.good}
            note={it.note}
            cardDelay={0.4 + i * 0.5}
          />
        ))}
      </div>
    </FullCenter>
  );
}

function OsintSlide() {
  const items = [
    {
      tag: "INSTAGRAM HİKAYE",
      bad: "‘Hafta sonu Bodrum’ etiketi",
      reveal: "Saldırgan: ‘ev boş, fiziksel hırsızlık fırsatı’",
    },
    {
      tag: "BİNİŞ KARTI FOTOĞRAFI",
      bad: "Bagaj etiketi + barkod",
      reveal: "Rezervasyon kodu (PNR) → uçuşunu iptal eder, kart bilgini alır",
    },
    {
      tag: "DOĞUM GÜNÜ KUTLAMASI",
      bad: "Etiketleyen herkes + tam tarih",
      reveal: "Şifre tahmini, kimlik soruları (anne kızlık), sahte arama",
    },
    {
      tag: "LINKEDIN KARİYER",
      bad: "Şirket + departman + yönetici adı",
      reveal: "Spear phishing için kusursuz şablon",
    },
    {
      tag: "GOOGLE STREET VIEW",
      bad: "Adresini paylaşıyorsun mu? Aslında paylaşıyorsun.",
      reveal: "Kapı şifresine kadar gözlemlenebilir",
    },
    {
      tag: "STRAVA / KOŞU",
      bad: "Heatmap: aynı saatte aynı park",
      reveal: "Fiziksel takip rutini",
    },
  ];
  return (
    <FullCenter>
      <div className="w-full max-w-[1500px]">
        <div className="mcb-mono mcb-tag text-rose-400/85 mb-3 text-center">
          OSINT · DİJİTAL AYAK İZİ
        </div>
        <h2 className="mcb-h2 font-bold text-white mb-8 text-center">
          Saldırgan, sosyal medyandan başlar.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <motion.div
              key={it.tag}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * i }}
              className="rounded-2xl border border-rose-400/25 bg-rose-500/5 p-5 min-w-0"
            >
              <div className="mcb-mono mcb-tag text-rose-300 mb-2">
                {it.tag}
              </div>
              <div className="mcb-body text-zinc-100 mb-3">{it.bad}</div>
              <div className="mcb-mono mcb-tag text-rose-400/80 mb-1">
                SALDIRGAN GÖRÜR
              </div>
              <p className="mcb-body text-rose-100/85">{it.reveal}</p>
            </motion.div>
          ))}
        </div>
        <p className="mcb-lead text-center text-emerald-300 mt-8">
          Konumunu o an paylaşma. QR'lı yaka kartını sansürle. Anne kızlık sorusunu doğum yeri yap.
        </p>
      </div>
    </FullCenter>
  );
}

function PhysicalAttacks() {
  const cases = [
    {
      icon: "🔌",
      tag: "USB DROP",
      title: "Otoparkta ‘Maaş Listesi’",
      body: "Buluntu USB. Takan kişi ‘ne var?’ diye merak eder. Cihaz aslında klavye gibi davranır, 0.4 saniyede komut çalıştırır.",
      defense: "Buluntu USB'yi takmak = saldırıyı evine davet etmek.",
    },
    {
      icon: "📡",
      tag: "SAHTE Wi-Fi",
      title: "‘Free_Guest_WiFi’",
      body: "Kafede / havalimanında sahte AP. Bağlandıktan sonra HTTPS bile MITM proxy ile clear-text. Banka, e-posta, kurumsal — hepsi.",
      defense: "Halka açık Wi-Fi yerine hücresel veri. Mecbursan VPN.",
    },
    {
      icon: "🚪",
      tag: "KUYRUK TAKİBİ",
      title: "Kahve dolu ellerle giriyor",
      body: "Saldırgan elinde laptop ve kahve. Sen kapıyı tutuyorsun. Profesyonel nezaket güvenlikten önemli değildir.",
      defense: "Tek kişi — tek kart. Şüphede güvenliğe yönlendir.",
    },
    {
      icon: "🍪",
      tag: "OMUZ SÖRFÜ (Shoulder Surfing)",
      title: "Otobüste şifre yazıyorsun",
      body: "Yanındaki gözle takip eder, sonra hesabına bağlanır. PIN'i avcunla kapatmak hâlâ en güçlü 2FA biçimi.",
      defense: "Ekran filtresi + parmaklarınla siper.",
    },
  ];
  return (
    <FullCenter>
      <div className="w-full max-w-[1500px]">
        <div className="mcb-mono mcb-tag text-amber-400/85 mb-3 text-center">
          FİZİKSEL SOSYAL MÜHENDİSLİK
        </div>
        <h2 className="mcb-h2 font-bold text-white mb-8 text-center">
          Saldırgan ekrandan değil, kapıdan girer.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cases.map((c, i) => (
            <motion.div
              key={c.tag}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.07 * i }}
              className="rounded-2xl border border-amber-400/30 bg-amber-400/5 p-6 flex gap-5 min-w-0"
            >
              <div
                className="shrink-0"
                style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}
              >
                {c.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="mcb-mono mcb-tag text-amber-300 mb-2">
                  {c.tag}
                </div>
                <div
                  className="text-white font-bold leading-tight mb-2"
                  style={{ fontSize: "clamp(1.4rem, 2.2vw, 2.25rem)" }}
                >
                  {c.title}
                </div>
                <p className="mcb-body text-zinc-200 mb-3">{c.body}</p>
                <div className="mcb-mono mcb-tag text-emerald-300 mb-1">
                  SAVUNMA
                </div>
                <p className="mcb-body text-emerald-100/90">{c.defense}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </FullCenter>
  );
}

function RansomwareSlide() {
  return (
    <Centered>
      <Skull
        className="text-rose-400 mb-6"
        style={{
          width: "clamp(4rem, 6vw, 6rem)",
          height: "clamp(4rem, 6vw, 6rem)",
          filter: "drop-shadow(0 0 25px rgba(244,63,94,0.6))",
        }}
      />
      <div className="mcb-mono mcb-tag text-rose-400 mb-4">
        FİDYE YAZILIMI · RANSOMWARE
      </div>
      <h2 className="mcb-h1 font-black text-white max-w-[90vw] mb-7">
        Tüm dosyaların kilitli.
        <br />
        <span className="text-rose-400 mcb-stat-shadow">72 saat</span>
        <span className="mcb-h1"> · </span>
        <span className="text-rose-400 mcb-stat-shadow">2 BTC</span>
      </h2>
      <p className="mcb-lead text-zinc-200 max-w-[80vw] mb-10">
        Tek bir tıklamadan sonra tezler, hasta kayıtları, müşteri verisi —
        hepsi şifreli. Ödesen bile %35'i geri dönmez.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-[1300px] text-left">
        <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-400/10 p-7">
          <div className="mcb-mono mcb-tag text-emerald-300 mb-3">3</div>
          <div className="mcb-h3 text-white font-bold leading-tight mb-2">
            Üç kopya
          </div>
          <p className="mcb-body text-zinc-100">Aynı dosyanın 3 kopyası.</p>
        </div>
        <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-400/10 p-7">
          <div className="mcb-mono mcb-tag text-emerald-300 mb-3">2</div>
          <div className="mcb-h3 text-white font-bold leading-tight mb-2">
            İki ortam
          </div>
          <p className="mcb-body text-zinc-100">
            Farklı medyada (HDD + bulut).
          </p>
        </div>
        <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-400/10 p-7">
          <div className="mcb-mono mcb-tag text-emerald-300 mb-3">1</div>
          <div className="mcb-h3 text-white font-bold leading-tight mb-2">
            Bir off-site
          </div>
          <p className="mcb-body text-zinc-100">
            En az biri evden / kurumdan uzakta, offline.
          </p>
        </div>
      </div>
      <p className="mcb-lead text-emerald-300 mt-8">
        ✓ 3-2-1 kuralı tek başına sağlık sektöründe %70'i kurtarır.
      </p>
    </Centered>
  );
}

function AuthorityScamSlide({ isActive }: { isActive: boolean }) {
  const dialogue = useMemo(
    () => [
      {
        speaker: "Komiser Ahmet · 0212-***-**-**",
        text: "Alo, hanımefendi. Ben emniyet müdürlüğünden Komiser Ahmet Yılmaz.",
        delay: 1.2,
      },
      {
        speaker: "Komiser Ahmet",
        text: "Şahsınız üzerine açılmış bir MASAK soruşturması var. Hesabınızdan şüpheli işlem tespit edildi.",
        delay: 2.6,
      },
      {
        speaker: "Komiser Ahmet",
        text: "Şu an Cumhuriyet Savcısı bey hatta. Lütfen bekleyin.",
        delay: 4.2,
      },
      {
        speaker: "‘Savcı’",
        text: "Konuşma gizlidir. Banka, aile, kimseyle paylaşmayın.",
        delay: 5.6,
      },
    ],
    [],
  );
  return (
    <FullCenter>
      <div className="w-full max-w-[1500px]">
        {/* Cinematic header — animated incoming call */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative flex items-center justify-center mb-5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={
                  isActive
                    ? { scale: [0.6, 1.6], opacity: [0.6, 0] }
                    : { scale: 0.6, opacity: 0 }
                }
                transition={{
                  repeat: Infinity,
                  duration: 2.4,
                  delay: i * 0.8,
                  ease: "easeOut",
                }}
                className="absolute rounded-full border-2 border-rose-400"
                style={{
                  width: "clamp(8rem, 12vw, 14rem)",
                  height: "clamp(8rem, 12vw, 14rem)",
                }}
              />
            ))}
            <motion.div
              animate={
                isActive
                  ? { rotate: [-8, 8, -8] }
                  : { rotate: 0 }
              }
              transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
              className="relative rounded-full bg-rose-500/15 border-2 border-rose-400 flex items-center justify-center"
              style={{
                width: "clamp(6rem, 8vw, 9rem)",
                height: "clamp(6rem, 8vw, 9rem)",
                boxShadow: "0 0 50px rgba(244,63,94,0.55)",
              }}
            >
              <Phone
                className="text-rose-300"
                style={{
                  width: "clamp(3rem, 4vw, 4.5rem)",
                  height: "clamp(3rem, 4vw, 4.5rem)",
                }}
              />
            </motion.div>
          </div>
          <div className="mcb-mono mcb-tag text-rose-400">
            <span className="inline-flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"
                style={{ boxShadow: "0 0 12px rgba(244,63,94,0.8)" }}
              />
              GELEN ARAMA · OTORİTE TUZAĞI
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-5">
          {/* Animated dialogue thread */}
          <div className="rounded-2xl border border-rose-400/35 bg-gradient-to-br from-rose-500/5 to-rose-500/10 p-6 min-w-0">
            <div className="mcb-mono mcb-tag text-rose-300 mb-4">
              KONUŞMA · CANLI
            </div>
            <div className="space-y-4">
              {dialogue.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
                  transition={{ delay: d.delay, duration: 0.5 }}
                  className="rounded-xl bg-zinc-900/70 border border-rose-400/20 p-4"
                >
                  <div className="mcb-mono mcb-tag text-rose-400/80 mb-1">
                    {d.speaker}
                  </div>
                  <p className="mcb-body text-zinc-100">{d.text}</p>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isActive ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: dialogue[dialogue.length - 1].delay + 1.2 }}
                className="flex items-center gap-2 text-rose-300 mcb-body italic pl-1 pt-1"
              >
                <span className="inline-flex gap-1">
                  <span
                    className="w-2 h-2 bg-rose-300 rounded-full"
                    style={{ animation: "mcb-blink 1s infinite" }}
                  />
                  <span
                    className="w-2 h-2 bg-rose-300 rounded-full"
                    style={{ animation: "mcb-blink 1s infinite 0.2s" }}
                  />
                  <span
                    className="w-2 h-2 bg-rose-300 rounded-full"
                    style={{ animation: "mcb-blink 1s infinite 0.4s" }}
                  />
                </span>
                konuşmaya devam ediyor…
              </motion.div>
            </div>
          </div>

          {/* Defense panel */}
          <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-400/10 p-6 min-w-0">
            <div className="mcb-mono mcb-tag text-emerald-300 mb-4">
              GERÇEK · BÖYLE KORUNUR
            </div>
            <ul className="space-y-3 text-zinc-100 mcb-body">
              <li>
                ✓ <strong>Devlet</strong> telefonda altın/para istemez.
              </li>
              <li>
                ✓ Savcılık SMS atmaz, "gizli soruşturma" diye konuşmaz.
              </li>
              <li>
                ✓ Şüphede: <strong>kapat, 155'i kendin ara</strong>.
              </li>
              <li>
                ✓ Yaşlılarına şu cümleyi öğret: "Hiçbir kuruma kuryeyle para
                gitmez."
              </li>
            </ul>
          </div>
        </div>
      </div>
    </FullCenter>
  );
}

function AcademicScams() {
  const cases = [
    {
      tag: "SAHTE KONFERANS",
      title: "Barcelona'da bir hayal",
      body: "Konferans daveti gelir, kayıt parası alınır, otel rezerve edilmiş gibi yapılır. Salonun adresi bile yoktur. SCOPUS taranıyor iddiası ile bilim insanı tuzağa düşürülür.",
      defense: "Konferansı SCOPUS / WoS'tan elle teyit et. Profesyonel komite yoksa şüphe et.",
    },
    {
      tag: "PREDATORY JOURNAL",
      title: "‘48 saatte yayın’ vaadi",
      body: "Açık erişim adı altında düşük kaliteli derginin saldırgan e-postası: hızlı kabul + 850 USD APC. CV'ne sahte bir parlak ekleme uğruna paranı alıp gider.",
      defense: "Beall's list, DOAJ, Think.Check.Submit. Editör kurulu kim? IF tutarlı mı?",
    },
    {
      tag: "SPEAR PHISHING",
      title: "Üniversite mail kopyası",
      body: "Hedef sensin: ‘rektorluk-belge.tr’ alan adından ‘yıllık beyan formunuz’ konulu mail. ORCID + üniversite şifren tek formda istenir.",
      defense: "Sıfır güven. Dosyayı/linki tarayıcıdan elle aç. Üst yazı + footer tutarsızlığını kontrol et.",
    },
  ];
  return (
    <FullCenter>
      <div className="w-full max-w-[1500px]">
        <div className="mcb-mono mcb-tag text-cyan-400/85 mb-3 text-center">
          AKADEMİSYENE ÖZEL TUZAKLAR
        </div>
        <h2 className="mcb-h2 font-bold text-white mb-8 text-center">
          Senin diplomanı bilen, senin tuzağını da kurar.
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {cases.map((c, i) => (
            <motion.div
              key={c.tag}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="rounded-2xl border border-cyan-400/35 bg-cyan-400/5 p-6 min-w-0"
              style={{ boxShadow: "0 0 25px rgba(34,211,238,0.12)" }}
            >
              <div className="mcb-mono mcb-tag text-cyan-300 mb-3">
                {c.tag}
              </div>
              <div
                className="text-white font-bold leading-tight mb-3"
                style={{
                  fontSize: "clamp(1.5rem, 2.4vw, 2.5rem)",
                  lineHeight: 1.15,
                }}
              >
                {c.title}
              </div>
              <p className="mcb-body text-zinc-200 mb-4">{c.body}</p>
              <div className="mcb-mono mcb-tag text-emerald-300 mb-1">
                SAVUNMA
              </div>
              <p className="mcb-body text-emerald-100/90">{c.defense}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </FullCenter>
  );
}

function EverydayScams() {
  const cases = [
    {
      emoji: "🚗",
      tag: "SAZAN SARMALI",
      title: "Araç alım-satımı",
      body: "Para 'akrabaya' yatırıldı, ruhsat sahibinin hesabına değil — noterde ortalık karışır.",
      defense: "Para, sadece ruhsat sahibi adına gider. Üçüncü kişi varsa dur.",
    },
    {
      emoji: "🏠",
      tag: "EMLAK",
      title: "‘IBAN değişti’ mailı",
      body: "Tapu için son ödeme arifesi. Sözde avukattan IBAN güncellemesi gelir. 1.5M TL sahte hesaba.",
      defense: "Finansal değişiklik geldiğinde sesli teyit + avukat ofisinden geri arama.",
    },
    {
      emoji: "📦",
      tag: "KARGO SMS",
      title: "24 TL ödeme, 24.500 TL onay",
      body: "Kargocum.co.tr/abc123 → 24 TL gümrük der. SMS onayında tutar 24.500 TL'dir.",
      defense: "Onay kodu mesajındaki tutarı her zaman oku. Linke tıklamak zaten hata.",
    },
    {
      emoji: "📈",
      tag: "DEEPFAKE YATIRIM",
      title: "Ünlü ekonomistin reklamı",
      body: "Sosyal medyada CNBC kalitesinde reklam. Ünlü ile ‘canlı röportaj’ (deepfake). Panel 7 günde paranı 2x yapıyor — 8. gün hesap kayboluyor.",
      defense: "SPK lisansı + bağımsız platformdan alıntı kontrol et. Sürpriz dönüş yok.",
    },
  ];
  return (
    <FullCenter>
      <div className="w-full max-w-[1500px]">
        <div className="mcb-mono mcb-tag text-amber-400/85 mb-3 text-center">
          GÜNDELİK · HERKESE OLABİLİR
        </div>
        <h2 className="mcb-h2 font-bold text-white mb-8 text-center">
          Tek bir kötü gün, tek bir tıklama.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cases.map((c, i) => (
            <motion.div
              key={c.tag}
              initial={{ opacity: 0, x: i % 2 ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 * i }}
              className="rounded-2xl border border-amber-400/30 bg-amber-400/5 p-6 flex gap-5 min-w-0"
            >
              <div
                className="shrink-0 flex items-start"
                style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}
              >
                {c.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <div className="mcb-mono mcb-tag text-amber-300 mb-2">
                  {c.tag}
                </div>
                <div
                  className="text-white font-bold leading-tight mb-2"
                  style={{ fontSize: "clamp(1.4rem, 2.2vw, 2.25rem)" }}
                >
                  {c.title}
                </div>
                <p className="mcb-body text-zinc-200 mb-3">{c.body}</p>
                <div className="mcb-mono mcb-tag text-emerald-300 mb-1">
                  SAVUNMA
                </div>
                <p className="mcb-body text-emerald-100/90">{c.defense}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </FullCenter>
  );
}

function DeepfakeSlide() {
  return (
    <Centered>
      <Radio
        className="text-rose-400 mb-6"
        style={{
          width: "clamp(4rem, 6vw, 6rem)",
          height: "clamp(4rem, 6vw, 6rem)",
          filter: "drop-shadow(0 0 25px rgba(244,63,94,0.6))",
        }}
      />
      <div className="mcb-mono mcb-tag text-rose-400 mb-4">
        2024 · HONG KONG
      </div>
      <h2 className="mcb-h1 font-black text-white max-w-[90vw] mb-7">
        Bir CFO'nun sesiyle{" "}
        <span className="text-rose-400 mcb-stat-shadow">25M $</span> çalındı.
      </h2>
      <p className="mcb-lead text-zinc-200 max-w-[80vw] mb-10">
        Çalışan, bir Zoom'a katıldı. Karşısında üst yönetimden 7 kişi vardı.{" "}
        <strong>Hepsi deepfake'di.</strong>
      </p>
      <div className="grid sm:grid-cols-3 gap-5 w-full max-w-[1300px] text-left">
        <div className="rounded-2xl border border-rose-400/40 bg-rose-500/5 p-7">
          <div className="mcb-mono mcb-tag text-rose-300 mb-3">
            SES KLONLAMA
          </div>
          <p className="mcb-body text-zinc-100">3 sn ses örneği yeterli.</p>
        </div>
        <div className="rounded-2xl border border-rose-400/40 bg-rose-500/5 p-7">
          <div className="mcb-mono mcb-tag text-rose-300 mb-3">
            VİDEO DEEPFAKE
          </div>
          <p className="mcb-body text-zinc-100">Tek bir Instagram fotoğrafı.</p>
        </div>
        <div className="rounded-2xl border border-emerald-400/40 bg-emerald-400/5 p-7">
          <div className="mcb-mono mcb-tag text-emerald-300 mb-3">SAVUNMA</div>
          <p className="mcb-body text-zinc-100">
            Aile içi <strong>code word</strong>. Para isteyen aramada sor.
          </p>
        </div>
      </div>
    </Centered>
  );
}

function AIAttacks2026() {
  return (
    <Centered>
      <Zap
        className="text-amber-400 mb-6"
        style={{
          width: "clamp(4rem, 6vw, 6rem)",
          height: "clamp(4rem, 6vw, 6rem)",
        }}
      />
      <div className="mcb-mono mcb-tag text-amber-400 mb-4">
        2026 · YAPAY ZEKÂ DESTEKLİ SALDIRILAR
      </div>
      <h2 className="mcb-h2 font-bold text-white max-w-[88vw] mb-12">
        Saldırgan bir senaryoyu artık 2 saniyede üretiyor.
      </h2>
      <div className="grid sm:grid-cols-2 gap-5 w-full max-w-[1300px]">
        {[
          {
            title: "GPT-grade phishing",
            body: "Türkçe yazım hatasız, yerel argo, doğru tonlama. 'Yabancı dil hatası' artık ipucu değil.",
          },
          {
            title: "Polimorfik malware",
            body: "AI her hedef için kodu yeniden yazar — antivirüs imzası tutmaz.",
          },
          {
            title: "Bot ağları",
            body: "Binlerce sahte profil, gerçek insan ritminde mesaj atar.",
          },
          {
            title: "Sıfır gün exploit'i",
            body: "Otomatik fuzzing → açık → istismar. Saatler içinde.",
          },
        ].map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, x: i % 2 ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i }}
            className="rounded-2xl border border-amber-400/30 bg-amber-400/5 p-7 text-left"
          >
            <div className="mcb-mono mcb-tag text-amber-300 mb-3">
              {it.title}
            </div>
            <p className="mcb-lead text-zinc-100">{it.body}</p>
          </motion.div>
        ))}
      </div>
    </Centered>
  );
}

function QuizReveal() {
  const cards = [
    {
      ok: true,
      email: "no-reply@accounts.google.com",
      note: "Google'ın gerçek bildirim adresi.",
    },
    {
      ok: false,
      email: "destek@goog1e-security.com",
      note: "1 = l. Üstelik 'security' paniği tetikler.",
      isAnswer: true,
    },
    {
      ok: true,
      email: "kampanya@trendyol.com",
      note: "Spam olabilir ama phishing değil.",
    },
    {
      ok: true,
      email: "noreply@github.com",
      note: "GitHub'ın resmî bildirimi.",
    },
  ];
  return (
    <Centered>
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 12 }}
        className="mb-6"
      >
        <CheckCircle2
          className="text-emerald-400"
          style={{
            width: "clamp(3.5rem, 5vw, 5.5rem)",
            height: "clamp(3.5rem, 5vw, 5.5rem)",
            filter: "drop-shadow(0 0 25px rgba(0,255,136,0.6))",
          }}
        />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mcb-h2 font-bold text-white mb-5 max-w-[90vw]"
      >
        Doğru cevap:{" "}
        <span className="text-emerald-400 mcb-mono">
          B · goog1e-security.com
        </span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mcb-lead text-zinc-300 max-w-[80vw] mb-10"
      >
        L harfi yerine 1 (bir) rakamı. Klasik typosquat.
      </motion.p>
      <div className="grid sm:grid-cols-2 gap-4 w-full max-w-[1300px] text-left">
        {cards.map((it, i) => (
          <motion.div
            key={it.email}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: 0.6 + i * 0.18,
              type: "spring",
              stiffness: 140,
              damping: 16,
            }}
            className={`relative rounded-2xl border-2 p-6 min-w-0 ${
              it.ok
                ? "border-emerald-400/40 bg-emerald-400/5"
                : "border-rose-400 bg-rose-500/15"
            }`}
            style={
              it.isAnswer
                ? { boxShadow: "0 0 35px rgba(244,63,94,0.45)" }
                : undefined
            }
          >
            {/* Animated badge */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.85 + i * 0.18,
                type: "spring",
                stiffness: 220,
                damping: 12,
              }}
              className={`absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold ${
                it.ok
                  ? "bg-emerald-400 text-black"
                  : "bg-rose-500 text-white"
              }`}
              style={{
                boxShadow: it.ok
                  ? "0 0 18px rgba(0,255,136,0.5)"
                  : "0 0 18px rgba(244,63,94,0.7)",
              }}
            >
              {it.ok ? "✓" : "✗"}
            </motion.div>

            <div
              className={`mcb-mono mcb-h3 break-all ${
                it.ok ? "text-emerald-200" : "text-rose-200"
              }`}
            >
              {it.email}
            </div>
            <p className="mcb-body text-zinc-300 mt-2">{it.note}</p>

            {it.isAnswer && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6 }}
                className="mt-3 mcb-mono mcb-tag text-rose-300"
              >
                ↑ TUZAK
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </Centered>
  );
}

function Checklist({ isActive }: { isActive: boolean }) {
  const items = [
    "Tüm hesaplara 2FA aç (SMS değil, Authenticator app).",
    "Şifre yöneticisi kur (Bitwarden ücretsiz, 5 dakika).",
    "Tekrar kullanılan şifreleri hemen değiştir.",
    "Telefondaki tanımadığın uygulamaları sil.",
    "Aile için bir 'code word' belirle.",
    "Sosyal medyada 'doğum tarihi, şehir, anne kızlık' bilgilerini gizle.",
    "haveibeenpwned.com'da e-postanı kontrol et.",
  ];
  // sequential check stagger: each item gets checked 0.7s after previous
  const stagger = 0.55;
  const baseDelay = 0.4;

  return (
    <Centered>
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 160 }}
        className="mb-5"
      >
        <ShieldCheck
          className="text-emerald-400"
          style={{
            width: "clamp(3.5rem, 5vw, 5.5rem)",
            height: "clamp(3.5rem, 5vw, 5.5rem)",
            filter: "drop-shadow(0 0 20px rgba(0,255,136,0.5))",
          }}
        />
      </motion.div>
      <div className="mcb-mono mcb-tag text-emerald-400 mb-4">BU GECE</div>
      <h2 className="mcb-h2 font-bold text-white mb-10">
        7 dakika. 7 madde. 7 kat güvenli.
      </h2>
      <div className="space-y-3 w-full max-w-[1200px]">
        {items.map((t, i) => {
          const itemDelay = baseDelay + i * stagger;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={
                isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
              }
              transition={{ delay: itemDelay, duration: 0.45 }}
              className="flex items-center gap-5 p-5 rounded-xl border border-emerald-400/25 bg-emerald-400/5 relative overflow-hidden"
            >
              {/* sweep line that goes across when checked */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={isActive ? { x: "100%" } : { x: "-100%" }}
                transition={{ delay: itemDelay + 0.15, duration: 0.7 }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(0,255,136,0.18), transparent)",
                }}
              />
              <motion.span
                initial={{ scale: 0, rotate: -90 }}
                animate={
                  isActive
                    ? { scale: 1, rotate: 0 }
                    : { scale: 0, rotate: -90 }
                }
                transition={{
                  delay: itemDelay + 0.4,
                  type: "spring",
                  stiffness: 220,
                  damping: 14,
                }}
                className="rounded-lg bg-emerald-400 text-black mcb-mono font-black flex items-center justify-center shrink-0 relative z-10"
                style={{
                  width: "clamp(2.5rem, 4vw, 4rem)",
                  height: "clamp(2.5rem, 4vw, 4rem)",
                  fontSize: "clamp(1.25rem, 2vw, 2rem)",
                  boxShadow: "0 0 14px rgba(0,255,136,0.4)",
                }}
              >
                ✓
              </motion.span>
              <motion.span
                initial={{ opacity: 0.5 }}
                animate={isActive ? { opacity: 1 } : { opacity: 0.5 }}
                transition={{ delay: itemDelay + 0.45 }}
                className="mcb-lead text-zinc-100 text-left relative z-10"
              >
                {t}
              </motion.span>
            </motion.div>
          );
        })}
      </div>
      {/* tally */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={
          isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }
        }
        transition={{
          delay: baseDelay + items.length * stagger + 0.2,
          type: "spring",
          stiffness: 180,
        }}
        className="mt-9 mcb-mono mcb-tag text-emerald-400 flex items-center gap-3"
      >
        <span
          className="w-3 h-3 rounded-full bg-emerald-400"
          style={{ boxShadow: "0 0 16px rgba(0,255,136,0.7)" }}
        />
        <span>{items.length} / {items.length} TAMAMLANDI</span>
      </motion.div>
    </Centered>
  );
}

function Manifesto() {
  const line1 = "Saldırgan saatte bir saldırır.".split(" ");
  const line2 = "Sen bir ömür savunursun.".split(" ");
  return (
    <div className="relative w-full h-full">
      <MatrixRain density={0.7} />
      {/* concentric pulse rings backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 2.0, opacity: [0, 0.4, 0] }}
            transition={{
              repeat: Infinity,
              duration: 6,
              delay: i * 1.4,
              ease: "easeOut",
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
            style={{
              borderColor: "rgba(0,255,136,0.45)",
              width: "min(35vmin,420px)",
              height: "min(35vmin,420px)",
            }}
          />
        ))}
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
          <ShieldCheck
            className="text-emerald-400 mb-10"
            style={{
              width: "clamp(6rem, 11vw, 13rem)",
              height: "clamp(6rem, 11vw, 13rem)",
              filter: "drop-shadow(0 0 40px rgba(0,255,136,0.7))",
            }}
          />
        </motion.div>
        <h2
          className="mcb-h1 font-black text-white max-w-[90vw] leading-tight"
          style={{ textShadow: "0 0 35px rgba(0,255,136,0.4)" }}
        >
          {line1.map((w, i) => (
            <motion.span
              key={`a-${i}`}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.4 + i * 0.12, duration: 0.6 }}
              className="inline-block mr-[0.25em]"
            >
              {w}
            </motion.span>
          ))}
          <br />
          {line2.map((w, i) => (
            <motion.span
              key={`b-${i}`}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.4 + line1.length * 0.12 + 0.4 + i * 0.14,
                type: "spring",
                stiffness: 180,
                damping: 14,
              }}
              className="inline-block mr-[0.25em] text-emerald-200"
              style={{ textShadow: "0 0 30px rgba(0,255,136,0.5)" }}
            >
              {w}
            </motion.span>
          ))}
        </h2>
        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay:
              0.4 +
              line1.length * 0.12 +
              0.4 +
              line2.length * 0.14 +
              0.4,
            duration: 0.6,
          }}
          className="mt-14 mcb-h2 text-emerald-300"
        >
          <Glitch text="Sen savunmanın ilk hattısın." />
        </motion.p>
      </div>
    </div>
  );
}

function ThanksSlide() {
  return (
    <div className="relative w-full h-full">
      <MatrixRain density={0.45} />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mcb-mono mcb-tag text-emerald-400/85 mb-5"
        >
          SORU · CEVAP · TEŞEKKÜR
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mcb-h1 font-black text-white mb-5"
          style={{
            textShadow:
              "0 0 30px rgba(0,255,136,0.4), 0 0 90px rgba(0,255,136,0.18)",
          }}
        >
          Teşekkürler.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mcb-lead text-zinc-200 max-w-[80vw] mb-12"
        >
          Sorularınız?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full max-w-[1400px]"
        >
          {[
            { tag: "WEB", handle: "osmancancetlenbik.com" },
            { tag: "INSTAGRAM", handle: "@osmancancetlenbik" },
            { tag: "LINKEDIN", handle: "in/osmancancetlenbik" },
          ].map((s, i) => (
            <motion.div
              key={s.tag}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="rounded-2xl border border-emerald-400/30 bg-emerald-400/5 px-6 py-5 text-center min-w-0"
              style={{ boxShadow: "0 0 30px rgba(0,255,136,0.12)" }}
            >
              <div className="mcb-mono mcb-tag text-emerald-400/85 mb-2">
                {s.tag}
              </div>
              <div
                className="mcb-mono text-emerald-100 break-words"
                style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.85rem)" }}
              >
                {s.handle}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-12 mcb-lead text-zinc-100"
        >
          Öğr. Gör.{" "}
          <span className="font-bold text-white">Osman Can ÇETLENBİK</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-3 mcb-mono mcb-meta tracking-widest text-zinc-500"
        >
          Manisa CBÜ · Teknik Bilimler MYO
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-10 mcb-mono mcb-meta text-zinc-600 tracking-widest"
        >
          MCBÜKAF · 13.05.2026 · ÜMİT DOĞAY ARINÇ KM AMFİ 1
        </motion.div>
      </div>
    </div>
  );
}

/* ================================================================
   SLIDE LIST
   ================================================================ */
const SLIDES: Slide[] = [
  {
    id: "cold-open",
    section: "OPEN",
    render: ({ isActive }) => <ColdOpen isActive={isActive} />,
  },
  {
    id: "title",
    section: "OPEN",
    render: () => <TitleSlide />,
  },
  {
    id: "qr-tuzak-bait",
    section: "BÖLÜM 01 · İLK TUZAK",
    render: ({ origin }) => (
      <QRBaitSlide
        origin={origin}
        path="/mcbukaf/qr-tuzak"
        brandTag="MCBÜKAF · KAMPANYA"
        brandColor="#fb923c"
        headline="1.000 TL bedava internet."
        subheadline="Sadece son adım kaldı. QR'ı tara, ödülünü al."
        ctaTone="warm"
      />
    ),
  },
  {
    id: "qr-tuzak-explain",
    section: "BÖLÜM 01 · İLK TUZAK",
    render: () => <QRTuzakExplain />,
  },
  {
    id: "hook-stat",
    section: "BÖLÜM 02 · MANZARA",
    render: ({ isActive }) => <HookStat isActive={isActive} />,
  },
  {
    id: "section-soc-eng",
    section: "BÖLÜM 03 · İNSAN HACK'İ",
    render: () => (
      <SectionTitle
        number="03"
        title="SOSYAL MÜHENDİSLİK"
        subtitle="Saldırının %98'i bir konuşmayla başlar."
        color="#22d3ee"
        Icon={Brain}
      />
    ),
  },
  {
    id: "mitnick",
    section: "BÖLÜM 03 · İNSAN HACK'İ",
    render: () => <MitnickQuote />,
  },
  {
    id: "real-story",
    section: "BÖLÜM 03 · İNSAN HACK'İ",
    render: ({ isActive }) => (
      <RealStory isActive={isActive} />
    ),
  },
  {
    id: "authority-scam",
    section: "BÖLÜM 03 · İNSAN HACK'İ",
    render: ({ isActive }) => (
      <AuthorityScamSlide isActive={isActive} />
    ),
  },
  {
    id: "osint",
    section: "BÖLÜM 03 · İNSAN HACK'İ",
    render: () => <OsintSlide />,
  },
  {
    id: "poll-2",
    section: "BÖLÜM 03 · İNSAN HACK'İ",
    render: ({ origin, isActive }) => (
      <FullCenter>
        <SMSScene
          showHighlights={false}
          origin={origin}
          isActive={isActive}
        />
      </FullCenter>
    ),
  },
  {
    id: "poll-2-reveal",
    section: "BÖLÜM 03 · İNSAN HACK'İ",
    render: ({ origin, isActive }) => (
      <FullCenter>
        <SMSScene
          showHighlights
          origin={origin}
          isActive={isActive}
        />
      </FullCenter>
    ),
  },
  {
    id: "section-passwords",
    section: "BÖLÜM 04 · ŞİFRELER",
    render: () => (
      <SectionTitle
        number="04"
        title="ŞİFRELER"
        subtitle="Bir kelimenin arkasında durmak yetmez."
        color="#fbbf24"
        Icon={KeyRound}
      />
    ),
  },
  {
    id: "password-stats",
    section: "BÖLÜM 04 · ŞİFRELER",
    render: ({ isActive }) => <PasswordStats isActive={isActive} />,
  },
  {
    id: "password-cracker",
    section: "BÖLÜM 04 · ŞİFRELER",
    render: ({ isActive, origin }) => (
      <FullCenter>
        <PasswordCracker isActive={isActive} origin={origin} />
      </FullCenter>
    ),
  },
  {
    id: "passphrase",
    section: "BÖLÜM 04 · ŞİFRELER",
    render: () => <PassphraseFormula />,
  },
  {
    id: "twofa",
    section: "BÖLÜM 04 · ŞİFRELER",
    render: () => <TwoFAExplainer />,
  },
  {
    id: "poll-3",
    section: "BÖLÜM 04 · ŞİFRELER",
    render: ({ origin, isActive }) => (
      <FullCenter>
        <LivePoll
          slug="mcb-3-2fa"
          origin={origin}
          isActive={isActive}
          accent="#22d3ee"
        />
      </FullCenter>
    ),
  },
  {
    id: "section-modern-threats",
    section: "BÖLÜM 05 · 2026 TEHDİTLERİ",
    render: () => (
      <SectionTitle
        number="05"
        title="MODERN TEHDİTLER"
        subtitle="AI saldırgana da çalışıyor."
        color="#f43f5e"
        Icon={ShieldAlert}
      />
    ),
  },
  {
    id: "phishing-tech",
    section: "BÖLÜM 05 · 2026 TEHDİTLERİ",
    render: () => <PhishingTechniques />,
  },
  {
    id: "cihaz-iz-bait",
    section: "BÖLÜM 05 · 2026 TEHDİTLERİ",
    render: ({ origin }) => (
      <QRBaitSlide
        origin={origin}
        path="/mcbukaf/cihaz-iz"
        brandTag="DENEY · CİHAZ İZİ"
        brandColor="#22d3ee"
        headline="Sadece sayfayı aç. Yazma."
        subheadline="QR'ı tara, telefonun anında ne söylüyor gör."
        ctaTone="neutral"
      />
    ),
  },
  {
    id: "cihaz-iz-explain",
    section: "BÖLÜM 05 · 2026 TEHDİTLERİ",
    render: () => <CihazIzExplain />,
  },
  {
    id: "sahte-banka-bait",
    section: "BÖLÜM 05 · 2026 TEHDİTLERİ",
    render: ({ origin }) => (
      <QRBaitSlide
        origin={origin}
        path="/mcbukaf/sahte-banka"
        brandTag="BANKAM · MOBİL ŞUBE"
        brandColor="#f43f5e"
        headline="Hesabınızı doğrulayın."
        subheadline="Şüpheli işlem tespit edildi. QR'ı tara, giriş yap."
        ctaTone="alert"
      />
    ),
  },
  {
    id: "sahte-banka-explain",
    section: "BÖLÜM 05 · 2026 TEHDİTLERİ",
    render: () => <SahteBankaExplain />,
  },
  {
    id: "academic-scams",
    section: "BÖLÜM 05 · 2026 TEHDİTLERİ",
    render: () => <AcademicScams />,
  },
  {
    id: "everyday-scams",
    section: "BÖLÜM 05 · 2026 TEHDİTLERİ",
    render: () => <EverydayScams />,
  },
  {
    id: "physical-attacks",
    section: "BÖLÜM 05 · 2026 TEHDİTLERİ",
    render: () => <PhysicalAttacks />,
  },
  {
    id: "ransomware",
    section: "BÖLÜM 05 · 2026 TEHDİTLERİ",
    render: () => <RansomwareSlide />,
  },
  {
    id: "deepfake",
    section: "BÖLÜM 05 · 2026 TEHDİTLERİ",
    render: () => <DeepfakeSlide />,
  },
  {
    id: "ai-2026",
    section: "BÖLÜM 05 · 2026 TEHDİTLERİ",
    render: () => <AIAttacks2026 />,
  },
  {
    id: "poll-4",
    section: "BÖLÜM 05 · 2026 TEHDİTLERİ",
    render: ({ origin, isActive }) => (
      <FullCenter>
        <LivePoll
          slug="mcb-4-quiz"
          origin={origin}
          isActive={isActive}
          accent="#f43f5e"
        />
      </FullCenter>
    ),
  },
  {
    id: "quiz-reveal",
    section: "BÖLÜM 05 · 2026 TEHDİTLERİ",
    render: () => <QuizReveal />,
  },
  {
    id: "checklist",
    section: "BÖLÜM 06 · BU GECE",
    render: ({ isActive }) => <Checklist isActive={isActive} />,
  },
  {
    id: "manifesto",
    section: "KAPANIŞ",
    render: ({ isActive }) => (
      <Manifesto />
    ),
  },
  {
    id: "thanks",
    section: "KAPANIŞ",
    render: () => <ThanksSlide />,
  },
];

/* ================================================================
   DECK SHELL
   ================================================================ */
export default function Presentation() {
  const [idx, setIdx] = useState(0);
  const [origin, setOrigin] = useState("");
  // ses devre dışı
  const swipeStart = useRef<number | null>(null);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const go = useCallback(
    (delta: number) => {
      setIdx((i) => Math.max(0, Math.min(SLIDES.length - 1, i + delta)));
    },
    [],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "Home") {
        setIdx(0);
      } else if (e.key === "End") {
        setIdx(SLIDES.length - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const cur = SLIDES[idx];

  const onTouchStart = (e: React.TouchEvent) => {
    swipeStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (swipeStart.current === null) return;
    const dx = e.changedTouches[0].clientX - swipeStart.current;
    if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
    swipeStart.current = null;
  };

  return (
    <div
      className="mcb-deck relative w-full h-screen bg-[#02050a] text-white overflow-hidden select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-40 bg-zinc-900/80">
        <motion.div
          className="h-full bg-emerald-400"
          style={{ boxShadow: "0 0 10px rgba(0,255,136,0.55)" }}
          initial={false}
          animate={{ width: `${((idx + 1) / SLIDES.length) * 100}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
        />
      </div>

      {/* HUD top */}
      <div className="absolute top-4 left-5 z-30 flex items-center gap-3 mcb-mono text-sm tracking-widest text-emerald-400/80">
        <span className="mcb-tick">●</span>
        <span>{cur.section}</span>
      </div>
      <div className="absolute top-4 right-20 z-30 mcb-mono text-sm tracking-widest text-zinc-400 tabular-nums">
        {String(idx + 1).padStart(2, "0")} / {SLIDES.length}
      </div>

      {/* slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={cur.id}
          initial={{ opacity: 0, scale: 0.985, filter: "blur(6px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.01, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {cur.render({ isActive: true, origin })}
        </motion.div>
      </AnimatePresence>

      {/* nav arrows */}
      <button
        onClick={() => go(-1)}
        disabled={idx === 0}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full border border-white/15 bg-black/50 backdrop-blur text-white/70 hover:text-white hover:border-emerald-400/50 disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
        aria-label="Önceki"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>
      <button
        onClick={() => go(1)}
        disabled={idx === SLIDES.length - 1}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full border border-white/15 bg-black/50 backdrop-blur text-white/70 hover:text-white hover:border-emerald-400/50 disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
        aria-label="Sonraki"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* slide nav dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setIdx(i)}
            className={`h-2 rounded-full transition-all ${
              i === idx
                ? "bg-emerald-400 w-8"
                : "bg-white/20 hover:bg-white/40 w-2"
            }`}
            aria-label={`Slayt ${i + 1}`}
          />
        ))}
      </div>

      {/* keyboard hint (low-key) */}
      <div className="absolute bottom-4 left-5 z-30 mcb-mono text-xs tracking-widest text-zinc-600 hidden sm:block">
        ← · →
      </div>
    </div>
  );
}

