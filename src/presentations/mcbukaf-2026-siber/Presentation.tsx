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
  narrate: (lines: NarrationLine[], opts?: NarrationOpts) => void;
  stopNarration: () => void;
  phoneRing: (opts?: { rings?: number; volume?: number }) => () => void;
  radioCrackle: (opts?: { volume?: number }) => () => void;
};

type NarrationLine = { text: string; delayMs?: number };
type NarrationOpts = { rate?: number; pitch?: number; volume?: number };

function useAudioEngine(): AudioApi {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const droneRef = useRef<{ stop: () => void } | null>(null);
  const narrationRef = useRef<{ cancel: () => void } | null>(null);
  const mutedRef = useRef(false);
  const [unlocked, setUnlocked] = useState(false);
  const [muted, setMuted] = useState(false);
  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

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
      master.gain.value = 0.32;
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

    // soft, non-resonant low-pass for ambient pad feel
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 320;
    filter.Q.value = 0.6;
    filter.connect(droneGain);

    const o1 = ctx.createOscillator();
    o1.type = "sine";
    o1.frequency.value = 55;
    const o2 = ctx.createOscillator();
    o2.type = "sine";
    o2.frequency.value = 82.4;
    const og = ctx.createGain();
    og.gain.value = 0.5;
    o1.connect(og);
    o2.connect(og);
    og.connect(filter);
    o1.start();
    o2.start();

    droneGain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 6);
    droneRef.current = {
      stop: () => {
        const t = ctx.currentTime;
        droneGain.gain.cancelScheduledValues(t);
        droneGain.gain.setValueAtTime(droneGain.gain.value, t);
        droneGain.gain.linearRampToValueAtTime(0.0001, t + 0.6);
        setTimeout(() => {
          try {
            o1.stop();
            o2.stop();
          } catch {}
        }, 800);
      },
    };
  }, [ensure]);

  const unlock = useCallback(async () => {
    const ctx = ensure();
    if (!ctx) return;
    if (ctx.state === "suspended") await ctx.resume();
    setUnlocked(true);
    startDrone();
    // prime speechSynthesis (iOS Safari needs a gesture-tied first call)
    try {
      const synth = window.speechSynthesis;
      if (synth) {
        const u = new SpeechSynthesisUtterance(" ");
        u.volume = 0;
        u.lang = "tr-TR";
        synth.speak(u);
        // load voices
        synth.getVoices();
      }
    } catch {}
  }, [ensure, startDrone]);

  const toggleMute = useCallback(() => {
    const ctx = ensure();
    if (!ctx || !masterRef.current) return;
    setMuted((m) => {
      const next = !m;
      masterRef.current!.gain.linearRampToValueAtTime(
        next ? 0 : 0.32,
        ctx.currentTime + 0.2,
      );
      if (next) {
        try {
          window.speechSynthesis?.cancel();
        } catch {}
        narrationRef.current?.cancel();
        narrationRef.current = null;
      }
      return next;
    });
  }, [ensure]);

  const cue = useCallback(
    (c: AudioCue) => {
      const ctx = ensure();
      if (!ctx || !masterRef.current || !unlocked) return;
      const out = masterRef.current;
      const t = ctx.currentTime;

      // Smooth tone with slow attack, slow release — never clicks, never jolts
      const tone = (
        freq: number,
        dur: number,
        gain = 0.08,
        type: OscillatorType = "sine",
        attack = 0.04,
      ) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        // soft lowpass to take edge off
        const lp = ctx.createBiquadFilter();
        lp.type = "lowpass";
        lp.frequency.value = 4500;
        lp.Q.value = 0.6;
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(gain, t + attack);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        osc.connect(lp);
        lp.connect(g);
        g.connect(out);
        osc.start(t);
        osc.stop(t + dur + 0.1);
      };

      switch (c) {
        case "boot":
          // soft "click+tail" feel
          tone(660, 0.35, 0.06, "sine", 0.005);
          tone(990, 0.5, 0.04, "sine", 0.015);
          break;
        case "soft":
          // gentle high-air ping
          tone(1480, 0.4, 0.05, "sine", 0.02);
          break;
        case "stinger":
          // cinematic low impact, smooth — no harsh sawtooth
          tone(82, 1.2, 0.1, "sine", 0.01);
          tone(165, 1.0, 0.05, "sine", 0.04);
          tone(247, 0.8, 0.03, "sine", 0.06);
          break;
        case "alarm":
          // gentle two-tone alert; sine, not square
          tone(523, 0.28, 0.07, "sine", 0.01);
          setTimeout(() => tone(659, 0.32, 0.07, "sine", 0.01), 220);
          break;
        case "heartbeat":
          // soft pulse, low pad
          tone(78, 0.5, 0.09, "sine", 0.02);
          setTimeout(() => tone(78, 0.55, 0.07, "sine", 0.02), 380);
          break;
        case "reveal":
          // gentle bell + airy shimmer
          tone(1320, 0.7, 0.05, "sine", 0.02);
          tone(1760, 0.9, 0.035, "sine", 0.04);
          tone(2640, 1.1, 0.02, "sine", 0.08);
          break;
      }
    },
    [ensure, unlocked],
  );

  const stopNarration = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      window.speechSynthesis?.cancel();
    } catch {}
    narrationRef.current?.cancel();
    narrationRef.current = null;
  }, []);

  const narrate = useCallback(
    (lines: NarrationLine[], opts?: NarrationOpts) => {
      if (typeof window === "undefined") return;
      const synth = window.speechSynthesis;
      if (!synth || !unlocked || mutedRef.current) return;
      // cancel anything in flight
      try {
        synth.cancel();
      } catch {}
      narrationRef.current?.cancel();

      let cancelled = false;
      const findVoice = () => {
        const voices = synth.getVoices();
        return (
          voices.find((v) => v.lang === "tr-TR") ||
          voices.find((v) => v.lang.toLowerCase().startsWith("tr")) ||
          null
        );
      };
      const playOne = (i: number) => {
        if (cancelled || mutedRef.current || i >= lines.length) return;
        const line = lines[i];
        const delay = line.delayMs ?? 0;
        setTimeout(() => {
          if (cancelled || mutedRef.current) return;
          const u = new SpeechSynthesisUtterance(line.text);
          u.lang = "tr-TR";
          const v = findVoice();
          if (v) u.voice = v;
          u.rate = opts?.rate ?? 0.95;
          u.pitch = opts?.pitch ?? 0.9;
          u.volume = opts?.volume ?? 0.85;
          u.onend = () => playOne(i + 1);
          u.onerror = () => playOne(i + 1);
          try {
            synth.speak(u);
          } catch {}
        }, delay);
      };

      // Some browsers populate voices async; nudge then start
      const start = () => playOne(0);
      if (synth.getVoices().length === 0) {
        const onVoices = () => {
          synth.removeEventListener("voiceschanged", onVoices);
          start();
        };
        synth.addEventListener("voiceschanged", onVoices);
        // also start in 250ms in case event never fires
        setTimeout(start, 250);
      } else {
        start();
      }

      narrationRef.current = {
        cancel: () => {
          cancelled = true;
          try {
            synth.cancel();
          } catch {}
        },
      };
    },
    [unlocked],
  );

  const phoneRing = useCallback(
    (opts?: { rings?: number; volume?: number }) => {
      const ctx = ensure();
      if (!ctx || !masterRef.current || !unlocked) return () => {};
      const out = masterRef.current;
      const rings = opts?.rings ?? 2;
      const vol = opts?.volume ?? 0.06;
      const timeouts: ReturnType<typeof setTimeout>[] = [];
      let cancelled = false;

      const playRing = (offsetSec: number) => {
        if (cancelled) return;
        // Turkish ringback: dual-tone 440Hz + 480Hz, 1.5s on, 4s off
        const t = ctx.currentTime + offsetSec;
        const dur = 1.4;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(vol, t + 0.05);
        g.gain.linearRampToValueAtTime(vol, t + dur - 0.05);
        g.gain.linearRampToValueAtTime(0, t + dur);
        g.connect(out);
        const lp = ctx.createBiquadFilter();
        lp.type = "lowpass";
        lp.frequency.value = 1200;
        lp.connect(g);
        const o1 = ctx.createOscillator();
        o1.type = "sine";
        o1.frequency.value = 440;
        const o2 = ctx.createOscillator();
        o2.type = "sine";
        o2.frequency.value = 480;
        o1.connect(lp);
        o2.connect(lp);
        o1.start(t);
        o2.start(t);
        o1.stop(t + dur + 0.1);
        o2.stop(t + dur + 0.1);
      };

      for (let r = 0; r < rings; r++) {
        playRing(r * 5.4);
      }

      return () => {
        cancelled = true;
        timeouts.forEach(clearTimeout);
      };
    },
    [ensure, unlocked],
  );

  const radioCrackle = useCallback(
    (opts?: { volume?: number }) => {
      const ctx = ensure();
      if (!ctx || !masterRef.current || !unlocked) return () => {};
      const out = masterRef.current;
      const vol = opts?.volume ?? 0.025;
      let cancelled = false;
      let stopFn: (() => void) | null = null;

      // looped pink-noise pad — telsiz altyapı hissi
      const bufLen = ctx.sampleRate * 2;
      const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
      const data = buf.getChannelData(0);
      let last = 0;
      for (let i = 0; i < bufLen; i++) {
        const white = Math.random() * 2 - 1;
        last = (last + 0.02 * white) / 1.02;
        data[i] = last * 3.5;
      }
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.loop = true;
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 1800;
      bp.Q.value = 0.7;
      const g = ctx.createGain();
      g.gain.value = 0;
      g.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.6);
      src.connect(bp);
      bp.connect(g);
      g.connect(out);
      src.start();

      // occasional click bursts
      const burst = () => {
        if (cancelled) return;
        const t = ctx.currentTime;
        const cg = ctx.createGain();
        cg.gain.setValueAtTime(0, t);
        cg.gain.linearRampToValueAtTime(vol * 4, t + 0.005);
        cg.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
        const cb = ctx.createBuffer(
          1,
          ctx.sampleRate * 0.06,
          ctx.sampleRate,
        );
        const cd = cb.getChannelData(0);
        for (let i = 0; i < cd.length; i++) cd[i] = Math.random() * 2 - 1;
        const cs = ctx.createBufferSource();
        cs.buffer = cb;
        const cf = ctx.createBiquadFilter();
        cf.type = "highpass";
        cf.frequency.value = 1500;
        cs.connect(cf);
        cf.connect(cg);
        cg.connect(out);
        cs.start();
        setTimeout(burst, 1500 + Math.random() * 4000);
      };
      setTimeout(burst, 2000);

      stopFn = () => {
        cancelled = true;
        const t = ctx.currentTime;
        g.gain.cancelScheduledValues(t);
        g.gain.setValueAtTime(g.gain.value, t);
        g.gain.linearRampToValueAtTime(0.0001, t + 0.4);
        setTimeout(() => {
          try {
            src.stop();
          } catch {}
        }, 500);
      };
      return () => stopFn?.();
    },
    [ensure, unlocked],
  );

  useEffect(() => {
    return () => {
      droneRef.current?.stop();
      try {
        window.speechSynthesis?.cancel();
      } catch {}
      try {
        ctxRef.current?.close();
      } catch {}
    };
  }, []);

  return {
    unlocked,
    muted,
    unlock,
    toggleMute,
    cue,
    narrate,
    stopNarration,
    phoneRing,
    radioCrackle,
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
   PASSWORD CRACKER (interactive — sahnede + telefonda QR)
   ================================================================ */
function PasswordCracker({
  audio,
  isActive,
  origin,
}: {
  audio: AudioApi;
  isActive: boolean;
  origin: string;
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
  const leaked = useMemo(() => isLeaked(pw), [pw]);
  const meterPct = Math.min(100, (bits / 100) * 100);

  const onReveal = () => {
    setReveal(true);
    if (leaked) audio.cue("alarm");
    else if (bits >= 80) audio.cue("reveal");
    else audio.cue("stinger");
  };

  const testUrl = `${origin}/mcbukaf/sifre-test`;

  return (
    <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-start w-full max-w-[1600px] mx-auto text-left">
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

function QROnboarding({ origin }: { origin: string }) {
  const url = `${origin}/poll/mcb-1-attack-surface`;
  return (
    <div className="relative w-full h-full">
      <MatrixRain density={0.55} />
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center gap-7">
        <Wifi
          className="text-emerald-400"
          style={{
            width: "clamp(3.5rem, 5vw, 5.5rem)",
            height: "clamp(3.5rem, 5vw, 5.5rem)",
          }}
        />
        <h2 className="mcb-h1 font-black text-white">Telefonunu çıkar.</h2>
        <p className="mcb-lead text-zinc-200 max-w-[80vw]">
          QR'ı tara · butona bas · cevabın 2 saniyede ekrana düşsün.
        </p>
        <div className="my-4">
          <QR url={url} size={420} />
        </div>
        <div className="mcb-mono mcb-h3 text-emerald-400 tracking-widest break-all">
          {url.replace(/^https?:\/\//, "")}
        </div>
        <p className="mcb-mono mcb-meta text-zinc-500 tracking-widest mt-2">
          Wi-Fi ya da mobil veri yeterli.
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
        className="mcb-mono mcb-tag text-rose-400 mb-4"
      >
        SON 24 SAATTE · KÜRESEL
      </motion.div>
      <h2 className="mcb-h2 text-white mb-14 max-w-[80vw]">
        Bu konuşmayı dinlerken bile saldırı durmuyor.
      </h2>
      <div className="flex flex-wrap items-start justify-center gap-12 sm:gap-24">
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
          delay={0.5}
          active={isActive}
        />
        <StatNumber
          value={4.88}
          unit="M$"
          label="ortalama veri ihlali maliyeti"
          color="#22d3ee"
          delay={0.8}
          active={isActive}
        />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ delay: 2.0 }}
        className="mt-16 mcb-meta text-zinc-500 mcb-mono"
      >
        IBM Cost of a Data Breach 2024 · Maryland Univ. · Statista
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
          style={{
            width: "clamp(5rem, 8vw, 9rem)",
            height: "clamp(5rem, 8vw, 9rem)",
            color: "#22d3ee",
            filter: "drop-shadow(0 0 24px rgba(34,211,238,0.6))",
          }}
        />
      </motion.div>
      <motion.blockquote
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="mcb-h1 font-light italic text-zinc-100 max-w-[85vw] leading-tight"
      >
        “Sosyal mühendislik, dünyanın en güvenli sistemini bile bypass eder.
        Çünkü insan değişmez.”
      </motion.blockquote>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="mt-12 mcb-lead text-zinc-400 mcb-mono tracking-widest"
      >
        — Kevin Mitnick
      </motion.p>
    </Centered>
  );
}

function RealStory({
  isActive,
  audio,
}: {
  isActive: boolean;
  audio: AudioApi;
}) {
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

  useEffect(() => {
    if (!isActive || !audio.unlocked || audio.muted) return;
    audio.narrate(
      [
        { text: "Annemi aradılar.", delayMs: 800 },
        {
          text: "Hanımefendi, bankadan arıyoruz. Hesabınızdan şüpheli bir işlem yapıldı.",
          delayMs: 1500,
        },
        {
          text: "Doğrulamak için size bir kod göndereceğiz.",
          delayMs: 800,
        },
        { text: "Telefonda yedi dakika geçti.", delayMs: 1800 },
        { text: "Annem onayladı.", delayMs: 1100 },
        { text: "Sabah, hesap boştu.", delayMs: 1400 },
      ],
      { rate: 0.9, pitch: 0.95, volume: 0.85 },
    );
    return () => audio.stopNarration();
  }, [isActive, audio]);
  return (
    <div className="relative w-full h-full">
      <MatrixRain density={0.4} />
      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <pre className="mcb-mono mcb-h3 text-zinc-100 max-w-[88vw] leading-relaxed whitespace-pre-wrap">
          {out.map((l, i) => (
            <div
              key={i}
              className={
                l.startsWith(">")
                  ? "text-emerald-400 mt-3"
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
          <motion.div
            key={it.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="rounded-2xl border border-zinc-800 bg-black/40 p-7"
          >
            <div className="mcb-mono mcb-tag text-amber-400 mb-4">
              {it.label}
            </div>
            <div className="space-y-3">
              <div className="mcb-mono mcb-h3 text-rose-300 break-all">
                ✗ {it.bad}
              </div>
              <div className="mcb-mono mcb-h3 text-emerald-300 break-all">
                ✓ {it.good}
              </div>
            </div>
            <p className="mt-4 mcb-body text-zinc-300">{it.note}</p>
          </motion.div>
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

function AuthorityScamSlide({
  isActive,
  audio,
}: {
  isActive: boolean;
  audio: AudioApi;
}) {
  useEffect(() => {
    if (!isActive || !audio.unlocked || audio.muted) return;
    const stopRing = audio.phoneRing({ rings: 2, volume: 0.07 });
    const stopRadio = audio.radioCrackle({ volume: 0.025 });
    audio.narrate(
      [
        {
          text: "Alo, hanımefendi. Ben emniyet müdürlüğünden Komiser Ahmet Yılmaz.",
          delayMs: 2200,
        },
        {
          text: "Şahsınız üzerine açılmış bir MASAK soruşturması var. Hesabınızdan şüpheli işlem tespit edildi.",
          delayMs: 1400,
        },
        {
          text: "Şu an Cumhuriyet Savcısı bey hatta. Lütfen kapatmayın.",
          delayMs: 1600,
        },
        {
          text: "Konuşma gizlidir. Banka, aile, kimseyle paylaşmayın.",
          delayMs: 1500,
        },
      ],
      { rate: 0.92, pitch: 0.78, volume: 0.95 },
    );
    return () => {
      stopRing();
      stopRadio();
      audio.stopNarration();
    };
  }, [isActive, audio]);

  return (
    <Centered>
      <Phone
        className="text-rose-400 mb-6"
        style={{
          width: "clamp(4rem, 6vw, 6rem)",
          height: "clamp(4rem, 6vw, 6rem)",
        }}
      />
      <div className="mcb-mono mcb-tag text-rose-400 mb-4">
        OTORİTEYE İTAAT · TELEFON DOLANDIRICILIĞI
      </div>
      <h2 className="mcb-h2 font-bold text-white max-w-[90vw] mb-8">
        “Komiserim, ben Sibel Hanım…”
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full max-w-[1400px] text-left">
        <div className="rounded-2xl border border-rose-400/40 bg-rose-500/5 p-7">
          <div className="mcb-mono mcb-tag text-rose-300 mb-3">SENARYO</div>
          <ul className="space-y-3 text-zinc-100 mcb-body">
            <li>• Telsiz sesleri arka plan.</li>
            <li>
              • “MASAK soruşturması — adınız olaya karışmış, hesabınız
              dondurulacak.”
            </li>
            <li>• Bekleme sesi → “Cumhuriyet Savcısı bey hatta.”</li>
            <li>• Aciliyet + otorite + suçluluk hissi.</li>
            <li>• Talep: altın/parayı poşetle kuryeye ver.</li>
          </ul>
        </div>
        <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-400/10 p-7">
          <div className="mcb-mono mcb-tag text-emerald-300 mb-3">GERÇEK</div>
          <ul className="space-y-3 text-zinc-100 mcb-body">
            <li>
              • <strong>Devlet</strong> telefonda altın / para istemez.
            </li>
            <li>
              • Savcılık SMS atmaz, “gizli soruşturma” diye konuşmaz.
            </li>
            <li>
              • Şüphede: <strong>kapat, 155'i kendin ara</strong>.
            </li>
            <li>
              • Yaşlı yakınlarına bu cümleyi öğret: “Hiç bir kuruma kuryeyle
              para gitmez.”
            </li>
          </ul>
        </div>
      </div>
    </Centered>
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
  return (
    <Centered>
      <CheckCircle2
        className="text-emerald-400 mb-6"
        style={{
          width: "clamp(3.5rem, 5vw, 5.5rem)",
          height: "clamp(3.5rem, 5vw, 5.5rem)",
          filter: "drop-shadow(0 0 25px rgba(0,255,136,0.6))",
        }}
      />
      <h2 className="mcb-h2 font-bold text-white mb-5 max-w-[90vw]">
        Doğru cevap:{" "}
        <span className="text-emerald-400 mcb-mono">
          B · goog1e-security.com
        </span>
      </h2>
      <p className="mcb-lead text-zinc-300 max-w-[80vw] mb-10">
        L harfi yerine 1 (bir) rakamı. Klasik typosquat.
      </p>
      <div className="grid sm:grid-cols-2 gap-4 w-full max-w-[1300px] text-left">
        {[
          {
            ok: true,
            email: "no-reply@accounts.google.com",
            note: "Google'ın gerçek bildirim adresi.",
          },
          {
            ok: false,
            email: "destek@goog1e-security.com",
            note: "1 = l. Üstelik 'security' paniği tetikler.",
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
            className={`rounded-2xl border p-6 ${
              it.ok
                ? "border-emerald-400/40 bg-emerald-400/5"
                : "border-rose-400 bg-rose-500/15"
            }`}
          >
            <div
              className={`mcb-mono mcb-h3 break-all ${
                it.ok ? "text-emerald-200" : "text-rose-200"
              }`}
            >
              {it.ok ? "✓" : "✗"} {it.email}
            </div>
            <p className="mcb-body text-zinc-300 mt-2">{it.note}</p>
          </div>
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
  return (
    <Centered>
      <ShieldCheck
        className="text-emerald-400 mb-5"
        style={{
          width: "clamp(3.5rem, 5vw, 5.5rem)",
          height: "clamp(3.5rem, 5vw, 5.5rem)",
        }}
      />
      <div className="mcb-mono mcb-tag text-emerald-400 mb-4">BU GECE</div>
      <h2 className="mcb-h2 font-bold text-white mb-10">
        7 dakika. 7 madde. 7 kat güvenli.
      </h2>
      <div className="space-y-3 w-full max-w-[1200px]">
        {items.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isActive ? 1 : 0, x: 0 }}
            transition={{ delay: 0.1 * i }}
            className="flex items-center gap-5 p-5 rounded-xl border border-emerald-400/25 bg-emerald-400/5"
          >
            <span
              className="rounded-lg bg-emerald-400 text-black mcb-mono font-black flex items-center justify-center shrink-0"
              style={{
                width: "clamp(2.5rem, 4vw, 4rem)",
                height: "clamp(2.5rem, 4vw, 4rem)",
                fontSize: "clamp(1.25rem, 2vw, 2rem)",
              }}
            >
              {i + 1}
            </span>
            <span className="mcb-lead text-zinc-100 text-left">{t}</span>
          </motion.div>
        ))}
      </div>
    </Centered>
  );
}

function Manifesto({
  isActive,
  audio,
}: {
  isActive: boolean;
  audio: AudioApi;
}) {
  useEffect(() => {
    if (!isActive || !audio.unlocked || audio.muted) return;
    audio.narrate(
      [
        {
          text: "Saldırgan saatte bir saldırır. Sen bir ömür savunursun.",
          delayMs: 800,
        },
        { text: "Sen savunmanın ilk hattısın.", delayMs: 1400 },
      ],
      { rate: 0.92, pitch: 1.0, volume: 0.95 },
    );
    return () => audio.stopNarration();
  }, [isActive, audio]);
  return (
    <div className="relative w-full h-full">
      <MatrixRain density={0.65} />
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <ShieldCheck
            className="text-emerald-400 mb-10"
            style={{
              width: "clamp(6rem, 11vw, 13rem)",
              height: "clamp(6rem, 11vw, 13rem)",
              filter: "drop-shadow(0 0 35px rgba(0,255,136,0.7))",
            }}
          />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mcb-h1 font-black text-white max-w-[90vw] leading-tight"
          style={{ textShadow: "0 0 35px rgba(0,255,136,0.4)" }}
        >
          Saldırgan saatte bir saldırır.
          <br />
          Sen bir ömür savunursun.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-12 mcb-h2 text-emerald-300"
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
            { tag: "GITHUB", handle: "@osmancancet" },
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
    render: ({ isActive, audio }) => (
      <RealStory isActive={isActive} audio={audio} />
    ),
  },
  {
    id: "authority-scam",
    section: "BÖLÜM 03 · İNSAN HACK'İ",
    audio: "stinger",
    render: ({ isActive, audio }) => (
      <AuthorityScamSlide isActive={isActive} audio={audio} />
    ),
  },
  {
    id: "osint",
    section: "BÖLÜM 03 · İNSAN HACK'İ",
    audio: "soft",
    render: () => <OsintSlide />,
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
    render: ({ isActive, audio, origin }) => (
      <FullCenter>
        <PasswordCracker
          isActive={isActive}
          audio={audio}
          origin={origin}
        />
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
    id: "academic-scams",
    section: "BÖLÜM 05 · 2026 TEHDİTLERİ",
    audio: "soft",
    render: () => <AcademicScams />,
  },
  {
    id: "everyday-scams",
    section: "BÖLÜM 05 · 2026 TEHDİTLERİ",
    audio: "soft",
    render: () => <EverydayScams />,
  },
  {
    id: "physical-attacks",
    section: "BÖLÜM 05 · 2026 TEHDİTLERİ",
    audio: "soft",
    render: () => <PhysicalAttacks />,
  },
  {
    id: "ransomware",
    section: "BÖLÜM 05 · 2026 TEHDİTLERİ",
    audio: "alarm",
    render: () => <RansomwareSlide />,
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
    render: ({ isActive, audio }) => (
      <Manifesto isActive={isActive} audio={audio} />
    ),
  },
  {
    id: "thanks",
    section: "KAPANIŞ",
    audio: "soft",
    render: () => <ThanksSlide />,
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
    audio.stopNarration();
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
          {cur.render({ isActive: true, audio, origin })}
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

      {/* mute */}
      <button
        onClick={audio.toggleMute}
        className="absolute bottom-4 right-20 z-30 w-11 h-11 rounded-full border border-white/15 bg-black/50 backdrop-blur text-white/70 hover:text-white flex items-center justify-center transition-colors"
        aria-label={audio.muted ? "Sesi aç" : "Sesi kapat"}
        title="(M)"
      >
        {audio.muted ? (
          <VolumeX className="w-5 h-5" />
        ) : (
          <Volume2 className="w-5 h-5" />
        )}
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
        ← · → · M
      </div>
    </div>
  );
}

