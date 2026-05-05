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
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Wifi,
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
  audio?: AudioCue;
  render: (ctx: SlideCtx) => ReactNode;
}

type AudioCue = "boot" | "stinger" | "alarm" | "heartbeat" | "soft" | "reveal";

type SlideCtx = {
  isActive: boolean;
  audio: AudioApi;
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
};

function useAudioEngine(): AudioApi {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const droneRef = useRef<{ stop: () => void } | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [muted, setMuted] = useState(false);

  const ensure = useCallback(() => {
    if (!ctxRef.current) {
      const Ctx =
        (window as unknown as { AudioContext?: typeof AudioContext })
          .AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctx) return null;
      const ctx = new Ctx();
      const master = ctx.createGain();
      master.gain.value = 0.6;
      master.connect(ctx.destination);
      ctxRef.current = ctx;
      masterRef.current = master;
    }
    return ctxRef.current;
  }, []);

  const startDrone = useCallback(() => {
    const ctx = ensure();
    if (!ctx || !masterRef.current) return;
    if (droneRef.current) return;

    const out = masterRef.current;
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.0;
    droneGain.connect(out);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 220;
    filter.Q.value = 4;
    filter.connect(droneGain);

    const o1 = ctx.createOscillator();
    o1.type = "sawtooth";
    o1.frequency.value = 55;
    const o2 = ctx.createOscillator();
    o2.type = "sine";
    o2.frequency.value = 82.4;
    const og = ctx.createGain();
    og.gain.value = 0.2;
    o1.connect(og);
    o2.connect(og);
    og.connect(filter);
    o1.start();
    o2.start();

    droneGain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 4);
    droneRef.current = {
      stop: () => {
        const t = ctx.currentTime;
        droneGain.gain.cancelScheduledValues(t);
        droneGain.gain.setValueAtTime(droneGain.gain.value, t);
        droneGain.gain.linearRampToValueAtTime(0.0001, t + 0.5);
        setTimeout(() => {
          try {
            o1.stop();
            o2.stop();
          } catch {}
        }, 700);
      },
    };
  }, [ensure]);

  const unlock = useCallback(async () => {
    const ctx = ensure();
    if (!ctx) return;
    if (ctx.state === "suspended") await ctx.resume();
    setUnlocked(true);
    startDrone();
  }, [ensure, startDrone]);

  const toggleMute = useCallback(() => {
    const ctx = ensure();
    if (!ctx || !masterRef.current) return;
    setMuted((m) => {
      const next = !m;
      masterRef.current!.gain.linearRampToValueAtTime(
        next ? 0 : 0.6,
        ctx.currentTime + 0.15,
      );
      return next;
    });
  }, [ensure]);

  const cue = useCallback(
    (c: AudioCue) => {
      const ctx = ensure();
      if (!ctx || !masterRef.current || !unlocked) return;
      const out = masterRef.current;
      const t = ctx.currentTime;

      const pingTone = (
        freq: number,
        dur: number,
        type: OscillatorType,
        gain = 0.25,
      ) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        g.gain.value = 0;
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(gain, t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        osc.connect(g);
        g.connect(out);
        osc.start(t);
        osc.stop(t + dur + 0.05);
      };

      const noiseBurst = (dur: number, filterFreq = 1500, gain = 0.18) => {
        const buf = ctx.createBuffer(
          1,
          ctx.sampleRate * dur,
          ctx.sampleRate,
        );
        const data = buf.getChannelData(0);
        for (let i = 0; i < data.length; i++)
          data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
        const src = ctx.createBufferSource();
        src.buffer = buf;
        const f = ctx.createBiquadFilter();
        f.type = "bandpass";
        f.frequency.value = filterFreq;
        const g = ctx.createGain();
        g.gain.value = gain;
        src.connect(f);
        f.connect(g);
        g.connect(out);
        src.start(t);
      };

      switch (c) {
        case "boot":
          pingTone(880, 0.18, "square", 0.2);
          break;
        case "soft":
          pingTone(1320, 0.12, "sine", 0.18);
          break;
        case "stinger":
          pingTone(120, 0.6, "sawtooth", 0.35);
          pingTone(240, 0.6, "sawtooth", 0.18);
          noiseBurst(0.6, 800);
          break;
        case "alarm":
          for (let i = 0; i < 3; i++) {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = "square";
            osc.frequency.value = i % 2 === 0 ? 440 : 660;
            g.gain.setValueAtTime(0, t + i * 0.18);
            g.gain.linearRampToValueAtTime(0.22, t + i * 0.18 + 0.02);
            g.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.18 + 0.16);
            osc.connect(g);
            g.connect(out);
            osc.start(t + i * 0.18);
            osc.stop(t + i * 0.18 + 0.18);
          }
          break;
        case "heartbeat":
          pingTone(60, 0.18, "sine", 0.5);
          setTimeout(() => pingTone(60, 0.22, "sine", 0.4), 220);
          break;
        case "reveal":
          noiseBurst(0.4, 6000, 0.1);
          pingTone(1760, 0.5, "triangle", 0.22);
          pingTone(2640, 0.5, "triangle", 0.14);
          break;
      }
    },
    [ensure, unlocked],
  );

  useEffect(() => {
    return () => {
      droneRef.current?.stop();
      try {
        ctxRef.current?.close();
      } catch {}
    };
  }, []);

  return { unlocked, muted, unlock, toggleMute, cue };
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
    const chars =
      "アイウエオカキクケコサシスセソタチツテト0123456789ABCDEF<>/{}[];:$#@!";
    const fontSize = 16;
    let cols: number[] = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const n = Math.floor((canvas.width / fontSize) * density);
      cols = Array.from({ length: n }, () =>
        Math.floor(Math.random() * -50),
      );
    };
    resize();
    window.addEventListener("resize", resize);
    let frame = 0;
    let raf = 0;
    const draw = () => {
      frame++;
      if (frame % 2 === 0) {
        ctx.fillStyle = "rgba(2, 5, 10, 0.085)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < cols.length; i++) {
          const ch = chars[Math.floor(Math.random() * chars.length)];
          const y = cols[i] * fontSize;
          ctx.fillStyle = "rgba(0, 255, 136, 0.3)";
          ctx.font = `bold ${fontSize}px ui-monospace, monospace`;
          ctx.fillText(ch, i * fontSize, y);
          ctx.fillStyle = "rgba(34, 211, 238, 0.06)";
          ctx.fillText(
            chars[Math.floor(Math.random() * chars.length)],
            i * fontSize,
            y - fontSize * 2,
          );
          if (y > canvas.height && Math.random() > 0.975) cols[i] = 0;
          cols[i]++;
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [density]);
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <canvas ref={ref} className="absolute inset-0 w-full h-full" />
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
  audio,
  accent = "#00ff88",
}: {
  slug: string;
  origin: string;
  isActive: boolean;
  audio: AudioApi;
  accent?: string;
}) {
  const { data } = useLivePoll(slug, isActive, 1500);
  const prevTotalRef = useRef(0);

  useEffect(() => {
    if (!data) return;
    if (data.total > prevTotalRef.current && prevTotalRef.current > 0) {
      audio.cue("soft");
    }
    prevTotalRef.current = data.total;
  }, [data, audio]);

  const max = data
    ? Math.max(1, ...Object.values(data.counts), 1)
    : 1;
  const url = `${origin}/poll/${slug}`;

  return (
    <div className="grid md:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center w-full max-w-[1400px] mx-auto text-left">
      <div className="min-w-0">
        <div className="mcb-mono text-xs tracking-[0.4em] text-emerald-400/80 mb-3">
          CANLI ANKET · {data?.total ?? 0} OY
        </div>
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
   PASSWORD CRACKER (interactive)
   ================================================================ */
const COMMON_LEAKED = new Set(
  [
    "123456",
    "123456789",
    "12345678",
    "qwerty",
    "password",
    "111111",
    "12345",
    "abc123",
    "iloveyou",
    "1234567",
    "1q2w3e4r",
    "admin",
    "letmein",
    "welcome",
    "monkey",
    "1234",
    "passw0rd",
    "qwerty123",
    "1q2w3e",
    "ankara",
    "ankara06",
    "istanbul",
    "istanbul34",
    "galatasaray",
    "fenerbahce",
    "besiktas",
    "trabzonspor",
    "turkiye",
    "turkey",
    "şifre",
    "sifre123",
    "sifre1234",
    "parola",
    "parola123",
    "merhaba",
    "ataturk",
    "atatürk1881",
    "1881",
    "1923",
    "ali123",
    "mehmet",
    "ayse",
    "ayşe",
    "fatma",
    "ahmet",
    "qwerty1",
    "123qwe",
    "asdfgh",
    "okul123",
    "test123",
    "deneme",
  ].map((s) => s.toLowerCase()),
);

function passwordEntropy(pw: string): number {
  if (!pw) return 0;
  let space = 0;
  if (/[a-z]/.test(pw)) space += 26;
  if (/[A-Z]/.test(pw)) space += 26;
  if (/[0-9]/.test(pw)) space += 10;
  if (/[^A-Za-z0-9]/.test(pw)) space += 33;
  if (space === 0) space = 26;
  return Math.log2(space) * pw.length;
}

function crackTime(bits: number): string {
  if (bits <= 0) return "anında";
  const guesses = Math.pow(2, bits) / 2;
  const rate = 1e11; // offline GPU
  const sec = guesses / rate;
  if (sec < 1) return "1 saniyeden kısa";
  if (sec < 60) return `${sec.toFixed(0)} saniye`;
  const min = sec / 60;
  if (min < 60) return `${min.toFixed(0)} dakika`;
  const hr = min / 60;
  if (hr < 24) return `${hr.toFixed(0)} saat`;
  const day = hr / 24;
  if (day < 365) return `${day.toFixed(0)} gün`;
  const yr = day / 365;
  if (yr < 1e3) return `${yr.toFixed(0)} yıl`;
  if (yr < 1e6) return `${(yr / 1e3).toFixed(1)} bin yıl`;
  if (yr < 1e9) return `${(yr / 1e6).toFixed(1)} milyon yıl`;
  if (yr < 1e12) return `${(yr / 1e9).toFixed(1)} milyar yıl`;
  return "evrenin yaşından uzun";
}

function strengthLabel(bits: number): {
  label: string;
  color: string;
  ring: string;
} {
  if (bits < 28) return { label: "ÇOK ZAYIF", color: "#f43f5e", ring: "#f43f5e" };
  if (bits < 36) return { label: "ZAYIF", color: "#fb923c", ring: "#fb923c" };
  if (bits < 60) return { label: "ORTA", color: "#fbbf24", ring: "#fbbf24" };
  if (bits < 80) return { label: "İYİ", color: "#22d3ee", ring: "#22d3ee" };
  return { label: "MÜKEMMEL", color: "#00ff88", ring: "#00ff88" };
}

function PasswordCracker({
  audio,
  isActive,
}: {
  audio: AudioApi;
  isActive: boolean;
}) {
  const [pw, setPw] = useState("");
  const [reveal, setReveal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isActive) inputRef.current?.focus();
  }, [isActive]);

  const bits = useMemo(() => passwordEntropy(pw), [pw]);
  const strength = useMemo(() => strengthLabel(bits), [bits]);
  const time = useMemo(() => crackTime(bits), [bits]);
  const isLeaked = useMemo(
    () => pw.length > 0 && COMMON_LEAKED.has(pw.toLowerCase()),
    [pw],
  );
  const meterPct = Math.min(100, (bits / 100) * 100);

  const onReveal = () => {
    setReveal(true);
    if (isLeaked) audio.cue("alarm");
    else if (bits >= 80) audio.cue("reveal");
    else audio.cue("stinger");
  };

  return (
    <div className="w-full max-w-5xl px-4">
      <div className="mcb-mono text-[11px] tracking-[0.4em] text-emerald-400/80 mb-3">
        ŞİFRE KIRMA SİMÜLATÖRÜ · CANLI
      </div>
      <h2 className="text-3xl sm:text-5xl font-bold mb-8 leading-tight text-white">
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
          className="w-full mcb-mono bg-zinc-950/80 border-2 border-zinc-800 focus:border-emerald-400 outline-none rounded-2xl px-6 py-5 text-2xl sm:text-4xl text-white placeholder-zinc-700 transition-colors"
          style={{
            boxShadow: pw
              ? `0 0 30px ${strength.color}33, inset 0 0 20px ${strength.color}10`
              : undefined,
          }}
        />
        <button
          onClick={onReveal}
          disabled={!pw}
          className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2.5 rounded-xl bg-emerald-400 text-black font-semibold hover:bg-emerald-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors mcb-mono text-sm tracking-wider"
        >
          KIR →
        </button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mt-6">
        <div className="rounded-xl border border-zinc-800 bg-black/40 p-5">
          <div className="mcb-mono text-[10px] tracking-[0.3em] text-zinc-500 mb-2">
            ENTROPİ
          </div>
          <div
            className="mcb-mono text-3xl font-bold tabular-nums"
            style={{ color: strength.color }}
          >
            {bits.toFixed(1)} <span className="text-base text-zinc-500">bit</span>
          </div>
          <div className="mt-3 h-1.5 bg-zinc-900 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: strength.color }}
              initial={false}
              animate={{ width: `${meterPct}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            />
          </div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-black/40 p-5">
          <div className="mcb-mono text-[10px] tracking-[0.3em] text-zinc-500 mb-2">
            KIRMA SÜRESİ (offline GPU)
          </div>
          <div
            className="mcb-mono text-2xl font-bold leading-tight"
            style={{ color: strength.color }}
          >
            {time}
          </div>
          <div className="mt-3 mcb-mono text-[10px] text-zinc-600">
            ~10¹¹ tahmin / saniye
          </div>
        </div>
        <div
          className="rounded-xl border-2 p-5"
          style={{
            borderColor: strength.color,
            background: `${strength.color}11`,
          }}
        >
          <div className="mcb-mono text-[10px] tracking-[0.3em] text-zinc-500 mb-2">
            DEĞERLENDİRME
          </div>
          <div
            className="mcb-mono text-2xl font-black leading-tight"
            style={{ color: strength.color }}
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
            className={`mt-6 rounded-xl p-6 border-2 ${
              isLeaked ? "mcb-stripes" : ""
            }`}
            style={{
              borderColor: isLeaked ? "#f43f5e" : strength.color,
              background: isLeaked
                ? "rgba(244,63,94,0.18)"
                : "rgba(0,255,136,0.06)",
            }}
          >
            {isLeaked ? (
              <div className="flex items-start gap-4">
                <Skull className="w-12 h-12 text-rose-400 shrink-0" />
                <div>
                  <div className="mcb-mono text-xs tracking-[0.3em] text-rose-400 mb-1">
                    PWNED · LEAK DB
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-rose-100 mb-2">
                    Bu şifre milyonlarca sızıntıda var.
                  </div>
                  <p className="text-rose-200/80">
                    Saldırgan deneme bile yapmadan listesinde buldu. Hesabın
                    halihazırda risk altında.
                  </p>
                </div>
              </div>
            ) : bits >= 80 ? (
              <div className="flex items-start gap-4">
                <ShieldCheck
                  className="w-12 h-12 shrink-0"
                  style={{ color: strength.color }}
                />
                <div>
                  <div
                    className="mcb-mono text-xs tracking-[0.3em] mb-1"
                    style={{ color: strength.color }}
                  >
                    SAĞLAM
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-100">
                    Bu şifre saldırganı kıracak makineyi beklemekten yorar.
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-4">
                <AlertTriangle
                  className="w-12 h-12 shrink-0"
                  style={{ color: strength.color }}
                />
                <div>
                  <div
                    className="mcb-mono text-xs tracking-[0.3em] mb-1"
                    style={{ color: strength.color }}
                  >
                    YETERSİZ
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    Modern bir GPU bunu “{time}”da kırar.
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-6 mcb-mono text-xs text-zinc-600">
        Not: Bu input hiçbir yere gönderilmez. Tüm hesap tamamen tarayıcında
        çalışır.
      </p>
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
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Centered>
      <div className="absolute inset-0 z-0 mcb-ring pointer-events-none">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full border-2"
          style={{ borderColor: `${color}22` }}
        />
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 140, damping: 14 }}
          className="mb-7 p-7 rounded-2xl"
          style={{
            background: `${color}15`,
            border: `1px solid ${color}55`,
            boxShadow: `0 0 60px ${color}30`,
          }}
        >
          <Icon className="w-16 h-16" />
        </motion.div>
        <div
          className="mcb-mono text-sm tracking-[0.6em] mb-4 opacity-80"
          style={{ color }}
        >
          BÖLÜM {number}
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl sm:text-7xl font-black tracking-tight"
          style={{
            color,
            textShadow: `0 0 25px ${color}55, 0 0 80px ${color}22`,
          }}
        >
          {title}
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="h-[3px] w-72 my-7 rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            boxShadow: `0 0 18px ${color}66`,
          }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-2xl sm:text-3xl text-zinc-300 max-w-3xl"
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
        className="mcb-mono text-7xl sm:text-9xl font-black mcb-stat-shadow tabular-nums"
        style={{ color }}
      >
        {formatted}
        <span className="text-3xl sm:text-5xl ml-2 opacity-70">{unit}</span>
      </div>
      <p className="text-lg sm:text-2xl text-zinc-300 max-w-[280px] mx-auto mt-3">
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
        <div className="bg-zinc-800 px-4 py-3 border-b border-zinc-700">
          <div className="text-zinc-300 text-sm">{from}</div>
          <div className="text-zinc-500 text-xs mcb-mono">
            şimdi · SMS
          </div>
        </div>
        <div className="p-4 text-zinc-100 text-base leading-relaxed">
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
      "$ ./session --start mcbukaf-2026",
      "[OK] Boot sequence  ............................. PASS",
      "[OK] Loading: kullanici_zafiyetleri.module       OK",
      "[!]  WARNING: 1.2B credentials detected on dark web.",
      "[OK] Initializing audience.exe ................... OK",
      "",
      "> Do you trust your password?",
      "",
    ],
    [],
  );
  const { out, done } = useTypewriter(lines, 22, isActive);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      <MatrixRain density={0.5} />
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <pre className="mcb-mono text-emerald-400 text-base sm:text-2xl leading-relaxed max-w-4xl whitespace-pre-wrap">
          {out.map((l, i) => (
            <div
              key={i}
              className={
                l.startsWith("[!]")
                  ? "text-rose-400"
                  : l.startsWith("[OK]")
                    ? "text-emerald-300"
                    : l.startsWith(">")
                      ? "text-cyan-300 text-2xl sm:text-4xl mt-4"
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
            <span className="text-cyan-300 text-2xl sm:text-4xl mcb-cursor" />
          )}
        </pre>
      </div>
    </div>
  );
}

function TitleSlide() {
  return (
    <div className="relative w-full h-full">
      <MatrixRain density={0.7} />
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
              boxShadow: "0 0 80px 12px rgba(0,255,136,0.3)",
            }}
          />
          <ShieldAlert
            className="w-28 h-28 sm:w-36 sm:h-36 relative"
            style={{
              color: "#00ff88",
              filter: "drop-shadow(0 0 20px rgba(0,255,136,0.6))",
            }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mcb-mono text-sm sm:text-base tracking-[0.6em] text-emerald-400/80 mb-4"
        >
          MCBÜKAF · 2026
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-5xl sm:text-8xl font-black tracking-tight text-white mb-3"
          style={{
            textShadow:
              "0 0 30px rgba(0,255,136,0.5), 0 0 80px rgba(0,255,136,0.2)",
          }}
        >
          <Glitch text="İNTERAKTİF SİBER GÜVENLİK" />
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-2xl sm:text-4xl text-zinc-300 max-w-4xl mb-10"
        >
          Son Kullanıcı Zafiyetleri ve Sosyal Mühendislik
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="text-xl sm:text-2xl text-zinc-200"
        >
          Öğr. Gör.{" "}
          <span className="font-bold text-white">Osman Can ÇETLENBİK</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-3 mcb-mono text-sm tracking-widest text-zinc-500"
        >
          Manisa CBÜ · Ümit Doğay Arınç KM Amfi 1 · 13 Mayıs 2026
        </motion.div>
      </div>
    </div>
  );
}

function QROnboarding({ origin }: { origin: string }) {
  const url = `${origin}/poll/mcb-1-attack-surface`;
  return (
    <div className="relative w-full h-full">
      <MatrixRain density={0.4} />
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center gap-6">
        <Wifi className="w-12 h-12 text-emerald-400" />
        <h2 className="text-4xl sm:text-6xl font-black text-white">
          Telefonunu çıkar.
        </h2>
        <p className="text-xl sm:text-2xl text-zinc-300 max-w-2xl">
          Bu QR'ı tara → bir butona bas → cevabın 2 saniyede ekrana düşsün.
        </p>
        <div className="my-6">
          <QR url={url} size={300} />
        </div>
        <div className="mcb-mono text-emerald-400 text-base sm:text-lg tracking-widest">
          {url.replace(/^https?:\/\//, "")}
        </div>
        <p className="mcb-mono text-zinc-500 text-xs tracking-widest mt-2">
          Wi-Fi ya da mobil veri yeterli. Tek dokunuş.
        </p>
      </div>
    </div>
  );
}

function HookStat({ isActive }: { isActive: boolean }) {
  return (
    <Centered>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mcb-mono text-xs tracking-[0.5em] text-rose-400 mb-3"
      >
        SON 24 SAATTE · KÜRESEL
      </motion.div>
      <h2 className="text-3xl sm:text-5xl text-white mb-16 max-w-3xl">
        Bu konuşmayı dinlerken bile saldırı durmuyor.
      </h2>
      <div className="flex flex-wrap items-start justify-center gap-12 sm:gap-20">
        <StatNumber
          value={3.4}
          unit="mlyr"
          label="günlük oltalama (phishing) e-postası"
          color="#f43f5e"
          delay={0.2}
          active={isActive}
        />
        <StatNumber
          value={39}
          unit="sn"
          label="bir saldırı arasındaki ortalama süre"
          color="#fbbf24"
          delay={0.5}
          active={isActive}
        />
        <StatNumber
          value={4.88}
          unit="M$"
          label="ortalama veri ihlali maliyeti (IBM 2024)"
          color="#22d3ee"
          delay={0.8}
          active={isActive}
        />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ delay: 2.0 }}
        className="mt-14 text-base text-zinc-500 mcb-mono"
      >
        kaynaklar: IBM Cost of a Data Breach 2024, Maryland Univ., Statista
      </motion.p>
    </Centered>
  );
}

function MitnickQuote() {
  return (
    <Centered>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring" }}
        className="mb-10"
      >
        <Brain
          className="w-20 h-20"
          style={{
            color: "#22d3ee",
            filter: "drop-shadow(0 0 20px rgba(34,211,238,0.6))",
          }}
        />
      </motion.div>
      <motion.blockquote
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="text-4xl sm:text-6xl font-light italic text-zinc-100 max-w-5xl leading-relaxed"
      >
        “Sosyal mühendislik, dünyanın en güvenli sistemini bile bypass eder.
        Çünkü insan değişmez.”
      </motion.blockquote>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="mt-12 text-2xl text-zinc-400 mcb-mono tracking-widest"
      >
        — Kevin Mitnick
      </motion.p>
    </Centered>
  );
}

function RealStory({ isActive }: { isActive: boolean }) {
  const lines = useMemo(
    () => [
      "Annemi aradılar.",
      "",
      "  ‘Hanımefendi, bankadan arıyoruz.’",
      "  ‘Hesabınızdan şüpheli bir işlem yapıldı.’",
      "  ‘Doğrulamak için size bir kod göndereceğiz…’",
      "",
      "Telefonda 7 dakika geçti.",
      "Annem onayladı.",
      "",
      "Sabah: hesap boştu.",
      "",
      "> Saldırgan tek bir satır kod yazmadı.",
      "> Sadece konuştu.",
    ],
    [],
  );
  const { out, done } = useTypewriter(lines, 24, isActive);
  return (
    <div className="relative w-full h-full">
      <MatrixRain density={0.3} />
      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <pre className="mcb-mono text-2xl sm:text-3xl text-zinc-100 max-w-4xl leading-relaxed whitespace-pre-wrap">
          {out.map((l, i) => (
            <div
              key={i}
              className={
                l.startsWith(">")
                  ? "text-emerald-400 text-2xl sm:text-3xl mt-2"
                  : l.startsWith("  ‘")
                    ? "text-rose-300"
                    : ""
              }
            >
              {l || " "}
            </div>
          ))}
          {!done && <span className="mcb-cursor" />}
        </pre>
      </div>
    </div>
  );
}

function SMSScene({
  showHighlights,
  origin,
  isActive,
  audio,
}: {
  showHighlights: boolean;
  origin: string;
  isActive: boolean;
  audio: AudioApi;
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
          <div className="mcb-mono text-xs tracking-[0.4em] text-rose-400 mb-3">
            KIRMIZI BAYRAKLAR
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
            3 işaret. Hepsini bir arada gördün mü? Kapat.
          </h2>
          <ul className="space-y-3 text-zinc-200 text-lg">
            <li className="flex items-start gap-3">
              <span className="mcb-mono text-rose-400">01</span>
              <span>
                <strong>Sahte domain.</strong> Gerçek PTT:{" "}
                <span className="mcb-mono text-emerald-400">ptt.gov.tr</span>.
                Buradaki: <span className="mcb-mono text-rose-400">ptt-tr.co</span>{" "}
                (10 saniyelik bir kayıt).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mcb-mono text-rose-400">02</span>
              <span>
                <strong>Aciliyet.</strong> “10 dakika” diyen her mesaj seni
                düşünmeden tıklatmak ister.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mcb-mono text-rose-400">03</span>
              <span>
                <strong>Kısa link / yabancı TLD.</strong> .co, .ru, .top, .xyz
                — hızlı kayıt, ucuz, takip kolay değil.
              </span>
            </li>
          </ul>
          <p className="mt-6 text-emerald-300 text-lg">
            ✓ Doğrusu: Linke <em>tıklama</em>. Tarayıcıdan ptt.gov.tr'yi sen aç.
          </p>
        </div>
      ) : (
        <LivePoll
          slug="mcb-2-sms-trap"
          origin={origin}
          isActive={isActive}
          audio={audio}
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
      <div className="mcb-mono text-xs tracking-[0.4em] text-rose-400 mb-3">
        TÜRKİYE · SIZINTI ARŞİVLERİ
      </div>
      <h2 className="text-3xl sm:text-5xl font-bold mb-10 text-white">
        En çok kullanılan şifreler.
      </h2>
      <div className="space-y-2 w-full max-w-3xl">
        {items.map((it, i) => (
          <motion.div
            key={it.pw}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isActive ? 1 : 0, x: 0 }}
            transition={{ delay: 0.08 * i }}
            className="grid grid-cols-[60px_1fr_auto] items-center gap-4 p-4 rounded-xl border border-zinc-800 bg-black/40"
          >
            <span className="mcb-mono text-2xl text-zinc-600 tabular-nums">
              #{it.rank}
            </span>
            <span className="mcb-mono text-2xl sm:text-3xl text-rose-300">
              {it.pw}
            </span>
            <span className="mcb-mono text-zinc-400 tabular-nums text-sm sm:text-base">
              {it.count} hesap
            </span>
          </motion.div>
        ))}
      </div>
      <p className="mt-8 text-zinc-400 text-base sm:text-lg max-w-2xl">
        Hepsi 1 saniyeden kısa sürede kırılır.
      </p>
    </Centered>
  );
}

function PassphraseFormula() {
  return (
    <Centered>
      <Sparkles className="w-14 h-14 text-emerald-400 mb-6" />
      <h2 className="text-3xl sm:text-5xl font-bold mb-10 text-white">
        Yeni formül: <span className="text-emerald-400">cümle</span>, kelime değil.
      </h2>
      <div className="space-y-5 w-full max-w-3xl">
        <div className="rounded-xl p-5 border border-rose-500/40 bg-rose-500/5 mcb-stripes">
          <div className="mcb-mono text-xs tracking-[0.3em] text-rose-300 mb-2">
            ESKİ
          </div>
          <div className="mcb-mono text-2xl text-rose-100">Ankara2024!</div>
          <div className="mcb-mono text-xs text-rose-300 mt-2">
            ~33 bit · saniyeler içinde kırılır
          </div>
        </div>
        <div className="rounded-xl p-5 border border-emerald-400 bg-emerald-400/10">
          <div className="mcb-mono text-xs tracking-[0.3em] text-emerald-300 mb-2">
            YENİ
          </div>
          <div className="mcb-mono text-2xl sm:text-3xl text-emerald-100">
            kahve-yeşil-bisiklet-portal-2026
          </div>
          <div className="mcb-mono text-xs text-emerald-300 mt-2">
            ~110 bit · trilyon yıl gerekir
          </div>
        </div>
      </div>
      <p className="mt-8 text-zinc-300 text-lg max-w-2xl">
        Hatırlanması kolay, kırılması imkansız. Bir şifre yöneticisi (Bitwarden,
        1Password) bunu zaten senin için üretir.
      </p>
    </Centered>
  );
}

function TwoFAExplainer() {
  return (
    <Centered>
      <h2 className="text-3xl sm:text-5xl font-bold mb-10 text-white max-w-4xl">
        İki Adımlı Doğrulama (2FA): üç katmanlı kalkan.
      </h2>
      <div className="grid sm:grid-cols-3 gap-5 w-full max-w-5xl">
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
            className="rounded-2xl p-6 border bg-black/40"
            style={{ borderColor: `${c.color}55`, boxShadow: `0 0 30px ${c.color}22` }}
          >
            <c.icon className="w-12 h-12 mb-4" style={{ color: c.color }} />
            <div className="mcb-mono text-xs tracking-[0.3em] mb-2" style={{ color: c.color }}>
              {c.title}
            </div>
            <p className="text-xl text-zinc-200">{c.body}</p>
          </motion.div>
        ))}
      </div>
      <p className="mt-10 text-zinc-300 text-lg max-w-3xl">
        Kombinasyon = saldırının %99'unu durdurur. Microsoft 2024 raporu.
      </p>
    </Centered>
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
      note: "0 yerine o, l yerine 1 vb.",
    },
    {
      label: "COMBOSQUAT",
      bad: "facebook-login-secure.com",
      good: "facebook.com",
      note: "Tanıdık kelime + 'secure', 'login', 'verify'.",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 sm:px-12 w-full">
      <h2 className="text-3xl sm:text-5xl font-bold text-white mb-2 text-center">
        Phishing'in 4 numarası.
      </h2>
      <p className="text-zinc-400 text-lg mb-10 text-center">
        Hepsi seni bilinen bir şeye baktığına ikna eder.
      </p>
      <div className="grid md:grid-cols-2 gap-4 w-full max-w-5xl">
        {items.map((it, i) => (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="rounded-xl border border-zinc-800 bg-black/40 p-5"
          >
            <div className="mcb-mono text-[10px] tracking-[0.3em] text-amber-400 mb-3">
              {it.label}
            </div>
            <div className="space-y-2">
              <div className="mcb-mono text-xl sm:text-2xl text-rose-300 break-all">
                ✗ {it.bad}
              </div>
              <div className="mcb-mono text-xl sm:text-2xl text-emerald-300 break-all">
                ✓ {it.good}
              </div>
            </div>
            <p className="mt-3 text-sm text-zinc-400">{it.note}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function DeepfakeSlide() {
  return (
    <Centered>
      <Radio
        className="w-16 h-16 text-rose-400 mb-6"
        style={{ filter: "drop-shadow(0 0 20px rgba(244,63,94,0.6))" }}
      />
      <div className="mcb-mono text-xs tracking-[0.5em] text-rose-400 mb-3">
        2024 · HONG KONG
      </div>
      <h2 className="text-3xl sm:text-6xl font-black text-white max-w-5xl mb-6">
        Bir CFO'nun sesiyle{" "}
        <span className="text-rose-400 mcb-stat-shadow">25 milyon $</span>{" "}
        çalındı.
      </h2>
      <p className="text-xl sm:text-2xl text-zinc-300 max-w-3xl mb-8">
        Şirket çalışanı bir Zoom toplantısına katıldı. Karşısında üst yönetimden
        7 kişi vardı. <strong>Hepsi deepfake'di.</strong>
      </p>
      <div className="grid sm:grid-cols-3 gap-4 w-full max-w-4xl text-left">
        <div className="rounded-xl border border-rose-400/40 bg-rose-500/5 p-5">
          <div className="mcb-mono text-[10px] tracking-[0.3em] text-rose-300 mb-2">
            SES KLONLAMA
          </div>
          <p className="text-zinc-200">3 saniyelik ses örneği yeterli.</p>
        </div>
        <div className="rounded-xl border border-rose-400/40 bg-rose-500/5 p-5">
          <div className="mcb-mono text-[10px] tracking-[0.3em] text-rose-300 mb-2">
            VİDEO DEEPFAKE
          </div>
          <p className="text-zinc-200">Tek bir Instagram fotoğrafı yeter.</p>
        </div>
        <div className="rounded-xl border border-emerald-400/40 bg-emerald-400/5 p-5">
          <div className="mcb-mono text-[10px] tracking-[0.3em] text-emerald-300 mb-2">
            SAVUNMA
          </div>
          <p className="text-zinc-200">
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
      <Zap className="w-16 h-16 text-amber-400 mb-6" />
      <div className="mcb-mono text-xs tracking-[0.5em] text-amber-400 mb-3">
        2026 · YAPAY ZEKÂ DESTEKLİ SALDIRILAR
      </div>
      <h2 className="text-3xl sm:text-5xl font-bold text-white max-w-4xl mb-10">
        Saldırgan artık bir senaryoyu 2 saniyede üretiyor.
      </h2>
      <div className="grid sm:grid-cols-2 gap-4 w-full max-w-4xl">
        {[
          {
            title: "GPT-grade phishing",
            body: "Türkçe yazım hatasız, yerel argo, tonlama doğru. 'Yabancı dil hatası' artık ipucu değil.",
          },
          {
            title: "Polimorfik malware",
            body: "AI her hedef için kodu yeniden yazar — antivirüs imzası tutmaz.",
          },
          {
            title: "Bot ağları",
            body: "Sosyal medyada binlerce sahte profil, gerçek insan ritminde mesaj atar.",
          },
          {
            title: "Sıfır gün exploit'i",
            body: "Otomatik fuzzing → açık → istismar. Saatler içinde, insan yokken.",
          },
        ].map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, x: i % 2 ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i }}
            className="rounded-xl border border-amber-400/30 bg-amber-400/5 p-5 text-left"
          >
            <div className="mcb-mono text-amber-300 text-sm tracking-wider mb-2">
              {it.title}
            </div>
            <p className="text-zinc-200">{it.body}</p>
          </motion.div>
        ))}
      </div>
    </Centered>
  );
}

function QuizReveal() {
  return (
    <Centered>
      <CheckCircle2
        className="w-14 h-14 text-emerald-400 mb-6"
        style={{ filter: "drop-shadow(0 0 20px rgba(0,255,136,0.5))" }}
      />
      <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
        Doğru cevap:{" "}
        <span className="text-emerald-400 mcb-mono">
          B · destek@goog1e-security.com
        </span>
      </h2>
      <p className="text-xl text-zinc-400 max-w-3xl mb-10">
        L harfi yerine 1 (bir) rakamı. Klasik typosquat.
      </p>
      <div className="grid sm:grid-cols-2 gap-3 w-full max-w-4xl text-left">
        {[
          {
            ok: true,
            email: "no-reply@accounts.google.com",
            note: "Google'ın gerçek bildirim adresi.",
          },
          {
            ok: false,
            email: "destek@goog1e-security.com",
            note: "1 = l. Üstelik 'security' kelimesi paniği tetikler.",
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
        ].map((it) => (
          <div
            key={it.email}
            className={`rounded-xl border p-4 ${
              it.ok
                ? "border-emerald-400/40 bg-emerald-400/5"
                : "border-rose-400 bg-rose-500/15"
            }`}
          >
            <div
              className={`mcb-mono text-base sm:text-lg break-all ${
                it.ok ? "text-emerald-200" : "text-rose-200"
              }`}
            >
              {it.ok ? "✓" : "✗"} {it.email}
            </div>
            <p className="text-sm text-zinc-400 mt-1">{it.note}</p>
          </div>
        ))}
      </div>
    </Centered>
  );
}

function Checklist({ isActive }: { isActive: boolean }) {
  const items = [
    "Tüm hesaplara 2FA aç (SMS değil, Authenticator app).",
    "Şifre yöneticisi kur (Bitwarden ücretsiz, %5 dakika).",
    "Tekrar kullanılan şifreleri hemen değiştir.",
    "Telefondaki tanımadığın uygulamaları sil.",
    "Aile için bir 'code word' belirle. Para istenen aramada sor.",
    "Sosyal medyada 'doğum tarihi, şehir, anne kızlık' bilgilerini gizle.",
    "haveibeenpwned.com'da e-postanı kontrol et.",
  ];
  return (
    <Centered>
      <ShieldCheck className="w-14 h-14 text-emerald-400 mb-4" />
      <div className="mcb-mono text-xs tracking-[0.5em] text-emerald-400 mb-3">
        BU GECE
      </div>
      <h2 className="text-3xl sm:text-5xl font-bold text-white mb-10">
        7 dakika. 7 madde. 7 kat güvenli.
      </h2>
      <div className="space-y-3 w-full max-w-3xl">
        {items.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isActive ? 1 : 0, x: 0 }}
            transition={{ delay: 0.1 * i }}
            className="flex items-center gap-4 p-3 rounded-lg border border-emerald-400/20 bg-emerald-400/5"
          >
            <span className="w-9 h-9 rounded-md bg-emerald-400 text-black mcb-mono font-bold flex items-center justify-center shrink-0">
              {i + 1}
            </span>
            <span className="text-lg sm:text-xl text-zinc-100 text-left">
              {t}
            </span>
          </motion.div>
        ))}
      </div>
    </Centered>
  );
}

function Manifesto() {
  return (
    <div className="relative w-full h-full">
      <MatrixRain density={0.5} />
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <ShieldCheck
            className="w-24 h-24 text-emerald-400 mb-8"
            style={{ filter: "drop-shadow(0 0 30px rgba(0,255,136,0.7))" }}
          />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-4xl sm:text-7xl font-black text-white max-w-5xl leading-tight"
          style={{ textShadow: "0 0 30px rgba(0,255,136,0.4)" }}
        >
          Saldırgan saatte bir saldırır. Sen bir ömür savunursun.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-10 text-2xl sm:text-4xl text-emerald-300"
        >
          <Glitch text="Sen savunmanın ilk hattısın." />
        </motion.p>
      </div>
    </div>
  );
}

function ThanksSlide({ origin }: { origin: string }) {
  return (
    <Centered>
      <div className="mcb-mono text-xs tracking-[0.5em] text-emerald-400 mb-3">
        SORU & CEVAP
      </div>
      <h2 className="text-4xl sm:text-6xl font-black text-white mb-3">
        Teşekkürler MCBÜKAF.
      </h2>
      <p className="text-xl sm:text-2xl text-zinc-400 mb-10">
        Sorunu yaz, ekrana düşür.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-10 mb-10">
        <QR url={`${origin}/iletisim`} size={220} />
        <div className="text-left max-w-md">
          <div className="mcb-mono text-emerald-300 text-base mb-2">
            osmancancetlenbik.com
          </div>
          <div className="text-zinc-400 mb-1 mcb-mono text-sm">
            Öğr. Gör. Osman Can Çetlenbik
          </div>
          <div className="text-zinc-400 mcb-mono text-sm">
            Manisa CBÜ · Teknik Bilimler MYO
          </div>
        </div>
      </div>
      <div className="mcb-mono text-xs tracking-widest text-zinc-600">
        MCBÜKAF · 13.05.2026 · ÜMİT DOĞAY ARINÇ KM AMFİ 1
      </div>
    </Centered>
  );
}

/* ================================================================
   SLIDE LIST
   ================================================================ */
const SLIDES: Slide[] = [
  {
    id: "cold-open",
    section: "OPEN",
    audio: "boot",
    render: ({ isActive }) => <ColdOpen isActive={isActive} />,
  },
  {
    id: "title",
    section: "OPEN",
    audio: "stinger",
    render: () => <TitleSlide />,
  },
  {
    id: "qr-onboarding",
    section: "BÖLÜM 01 · BAĞLAN",
    audio: "soft",
    render: ({ origin }) => <QROnboarding origin={origin} />,
  },
  {
    id: "poll-1",
    section: "BÖLÜM 01 · BAĞLAN",
    audio: "soft",
    render: ({ origin, isActive, audio }) => (
      <FullCenter>
        <LivePoll
          slug="mcb-1-attack-surface"
          origin={origin}
          isActive={isActive}
          audio={audio}
          accent="#00ff88"
        />
      </FullCenter>
    ),
  },
  {
    id: "hook-stat",
    section: "BÖLÜM 02 · MANZARA",
    audio: "stinger",
    render: ({ isActive }) => <HookStat isActive={isActive} />,
  },
  {
    id: "section-soc-eng",
    section: "BÖLÜM 03 · İNSAN HACK'İ",
    audio: "stinger",
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
    audio: "soft",
    render: () => <MitnickQuote />,
  },
  {
    id: "real-story",
    section: "BÖLÜM 03 · İNSAN HACK'İ",
    audio: "heartbeat",
    render: ({ isActive }) => <RealStory isActive={isActive} />,
  },
  {
    id: "poll-2",
    section: "BÖLÜM 03 · İNSAN HACK'İ",
    audio: "soft",
    render: ({ origin, isActive, audio }) => (
      <FullCenter>
        <SMSScene
          showHighlights={false}
          origin={origin}
          isActive={isActive}
          audio={audio}
        />
      </FullCenter>
    ),
  },
  {
    id: "poll-2-reveal",
    section: "BÖLÜM 03 · İNSAN HACK'İ",
    audio: "reveal",
    render: ({ origin, isActive, audio }) => (
      <FullCenter>
        <SMSScene
          showHighlights
          origin={origin}
          isActive={isActive}
          audio={audio}
        />
      </FullCenter>
    ),
  },
  {
    id: "section-passwords",
    section: "BÖLÜM 04 · ŞİFRELER",
    audio: "stinger",
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
    audio: "alarm",
    render: ({ isActive }) => <PasswordStats isActive={isActive} />,
  },
  {
    id: "password-cracker",
    section: "BÖLÜM 04 · ŞİFRELER",
    audio: "soft",
    render: ({ isActive, audio }) => (
      <FullCenter>
        <PasswordCracker isActive={isActive} audio={audio} />
      </FullCenter>
    ),
  },
  {
    id: "passphrase",
    section: "BÖLÜM 04 · ŞİFRELER",
    audio: "soft",
    render: () => <PassphraseFormula />,
  },
  {
    id: "twofa",
    section: "BÖLÜM 04 · ŞİFRELER",
    audio: "soft",
    render: () => <TwoFAExplainer />,
  },
  {
    id: "poll-3",
    section: "BÖLÜM 04 · ŞİFRELER",
    audio: "soft",
    render: ({ origin, isActive, audio }) => (
      <FullCenter>
        <LivePoll
          slug="mcb-3-2fa"
          origin={origin}
          isActive={isActive}
          audio={audio}
          accent="#22d3ee"
        />
      </FullCenter>
    ),
  },
  {
    id: "section-modern-threats",
    section: "BÖLÜM 05 · 2026 TEHDİTLERİ",
    audio: "stinger",
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
    audio: "soft",
    render: () => <PhishingTechniques />,
  },
  {
    id: "deepfake",
    section: "BÖLÜM 05 · 2026 TEHDİTLERİ",
    audio: "alarm",
    render: () => <DeepfakeSlide />,
  },
  {
    id: "ai-2026",
    section: "BÖLÜM 05 · 2026 TEHDİTLERİ",
    audio: "stinger",
    render: () => <AIAttacks2026 />,
  },
  {
    id: "poll-4",
    section: "BÖLÜM 05 · 2026 TEHDİTLERİ",
    audio: "soft",
    render: ({ origin, isActive, audio }) => (
      <FullCenter>
        <LivePoll
          slug="mcb-4-quiz"
          origin={origin}
          isActive={isActive}
          audio={audio}
          accent="#f43f5e"
        />
      </FullCenter>
    ),
  },
  {
    id: "quiz-reveal",
    section: "BÖLÜM 05 · 2026 TEHDİTLERİ",
    audio: "reveal",
    render: () => <QuizReveal />,
  },
  {
    id: "checklist",
    section: "BÖLÜM 06 · BU GECE",
    audio: "soft",
    render: ({ isActive }) => <Checklist isActive={isActive} />,
  },
  {
    id: "manifesto",
    section: "KAPANIŞ",
    audio: "stinger",
    render: () => <Manifesto />,
  },
  {
    id: "thanks",
    section: "KAPANIŞ",
    audio: "soft",
    render: ({ origin }) => <ThanksSlide origin={origin} />,
  },
];

/* ================================================================
   DECK SHELL
   ================================================================ */
export default function Presentation() {
  const [idx, setIdx] = useState(0);
  const [origin, setOrigin] = useState("");
  const audio = useAudioEngine();
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
      } else if (e.key === "m" || e.key === "M") {
        audio.toggleMute();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, audio]);

  const cur = SLIDES[idx];
  useEffect(() => {
    if (audio.unlocked && cur.audio) audio.cue(cur.audio);
  }, [idx, audio, cur.audio]);

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
      {/* unlock prompt */}
      <AnimatePresence>
        {!audio.unlocked && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => audio.unlock()}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/85 backdrop-blur"
          >
            <Volume2
              className="w-16 h-16 text-emerald-400 mb-6"
              style={{ filter: "drop-shadow(0 0 20px rgba(0,255,136,0.5))" }}
            />
            <div className="mcb-mono text-xs tracking-[0.5em] text-emerald-400 mb-3">
              SİNEMATİK MOD
            </div>
            <div className="text-3xl sm:text-5xl font-bold mb-2">
              Sesi açmak için dokun.
            </div>
            <div className="text-zinc-400 mt-3 mcb-mono text-sm">
              (M tuşu ile susturulabilir)
            </div>
          </motion.button>
        )}
      </AnimatePresence>

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
      <div className="absolute top-3 left-4 z-30 flex items-center gap-3 mcb-mono text-[11px] tracking-widest text-emerald-400/70">
        <span className="mcb-tick">●</span>
        <span>{cur.section}</span>
      </div>
      <div className="absolute top-3 right-16 z-30 mcb-mono text-[11px] tracking-widest text-zinc-500 tabular-nums">
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
          {cur.render({ isActive: true, audio, origin })}
        </motion.div>
      </AnimatePresence>

      {/* nav arrows */}
      <button
        onClick={() => go(-1)}
        disabled={idx === 0}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/10 bg-black/40 backdrop-blur text-white/60 hover:text-white hover:border-emerald-400/40 disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
        aria-label="Önceki"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => go(1)}
        disabled={idx === SLIDES.length - 1}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/10 bg-black/40 backdrop-blur text-white/60 hover:text-white hover:border-emerald-400/40 disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
        aria-label="Sonraki"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* mute */}
      <button
        onClick={audio.toggleMute}
        className="absolute bottom-3 right-16 z-30 w-9 h-9 rounded-full border border-white/10 bg-black/40 backdrop-blur text-white/60 hover:text-white flex items-center justify-center transition-colors"
        aria-label={audio.muted ? "Sesi aç" : "Sesi kapat"}
        title="(M)"
      >
        {audio.muted ? (
          <VolumeX className="w-4 h-4" />
        ) : (
          <Volume2 className="w-4 h-4" />
        )}
      </button>

      {/* slide nav dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setIdx(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === idx
                ? "bg-emerald-400 w-6"
                : "bg-white/15 hover:bg-white/30 w-1.5"
            }`}
            aria-label={`Slayt ${i + 1}`}
          />
        ))}
      </div>

      {/* keyboard hint (low-key) */}
      <div className="absolute bottom-3 left-4 z-30 mcb-mono text-[10px] tracking-widest text-zinc-600 hidden sm:block">
        ← / → · M
      </div>
    </div>
  );
}

