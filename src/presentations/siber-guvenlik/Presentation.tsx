"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles.css";

/* ================================================================
   TYPES
   ================================================================ */
interface Slide {
  id: string;
  section?: string;
  content: React.ReactNode | ((isActive: boolean) => React.ReactNode);
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
   MATRIX RAIN BACKGROUND
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
    const draw = () => {
      frame++;
      if (frame % 2 !== 0) { requestAnimationFrame(draw); return; }
      ctx.fillStyle = "rgba(5, 5, 16, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < columns.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        // Brighter head character
        const y = columns[i] * fontSize;
        ctx.fillStyle = "rgba(0, 255, 65, 0.25)";
        ctx.font = `bold ${fontSize}px monospace`;
        ctx.fillText(ch, i * fontSize, y);
        // Dimmer trail
        ctx.fillStyle = "rgba(0, 255, 65, 0.08)";
        ctx.font = `${fontSize}px monospace`;
        const trailCh = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(trailCh, i * fontSize, y - fontSize * 2);
        if (y > canvas.height && Math.random() > 0.975) columns[i] = 0;
        columns[i]++;
      }
      requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
    return () => window.removeEventListener("resize", resize);
  }, []);
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Hex grid overlay */}
      <div className="absolute inset-0 hex-grid" />
      {/* Scanlines */}
      <div className="absolute inset-0 scanline-global" />
      {/* Vignette */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)" }} />
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32" style={{ background: "radial-gradient(circle at 0% 0%, rgba(0,255,65,0.08) 0%, transparent 70%)" }} />
      <div className="absolute top-0 right-0 w-32 h-32" style={{ background: "radial-gradient(circle at 100% 0%, rgba(14,165,233,0.08) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 w-32 h-32" style={{ background: "radial-gradient(circle at 0% 100%, rgba(14,165,233,0.06) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 right-0 w-32 h-32" style={{ background: "radial-gradient(circle at 100% 100%, rgba(0,255,65,0.06) 0%, transparent 70%)" }} />
    </div>
  );
}

/* ================================================================
   GLITCH TEXT
   ================================================================ */
function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  return <span className={`glitch-text ${className}`} data-text={text}>{text}</span>;
}

/* ================================================================
   REUSABLE SLIDE COMPONENTS
   ================================================================ */
function SectionTitle({ icon, title, subtitle, color = "#00ff41" }: { icon: string; title: string; subtitle: string; color?: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8 relative overflow-hidden">
      {/* Background radial pulse */}
      <motion.div className="absolute inset-0 z-0" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 3 }}
        style={{ background: `radial-gradient(circle at 50% 50%, ${color}08 0%, transparent 50%)` }} />
      {/* Animated ring */}
      <motion.div className="absolute w-[500px] h-[500px] rounded-full border z-0"
        style={{ borderColor: `${color}15` }}
        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} />
      <div className="relative z-10 flex flex-col items-center">
        <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 120, damping: 10 }}
          className="text-[6rem] mb-8" style={{ filter: `drop-shadow(0 0 20px ${color}40)` }}>{icon}</motion.div>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl sm:text-7xl font-black tracking-tight mb-5" style={{ color, textShadow: `0 0 20px ${color}50, 0 0 60px ${color}20` }}>
          <GlitchText text={title} />
        </motion.h1>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-[3px] w-60 mb-8 rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)`, boxShadow: `0 0 15px ${color}40` }} />
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="text-3xl text-gray-300 max-w-4xl">{subtitle}</motion.p>
      </div>
    </div>
  );
}

function BulletSlide({ title, icon, items, note }: { title: string; icon: string; items: { emoji: string; text: string }[]; note?: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-10 sm:px-20">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-5 mb-10">
        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="text-6xl">{icon}</motion.span>
        <h2 className="text-5xl sm:text-6xl font-bold text-center">{title}</h2>
      </motion.div>
      <div className="space-y-4 w-full max-w-6xl">
        {items.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 * (i + 1), type: "spring", stiffness: 80 }}
            className="flex items-start gap-5 border-l-4 border-emerald-500/50 bg-white/[0.03] backdrop-blur-sm rounded-r-xl pl-8 py-5 glow-border-green">
            <span className="text-4xl shrink-0">{item.emoji}</span>
            <p className="text-2xl text-gray-200 leading-relaxed">{item.text}</p>
          </motion.div>
        ))}
      </div>
      {note && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-8 text-lg text-gray-500 italic text-center max-w-4xl">{note}</motion.p>}
    </div>
  );
}

function AnimatedStat({ value, label, color, delay }: { value: string; label: string; color: string; delay: number }) {
  const animated = useCountUp(value, 1500, delay * 1000);
  return (
    <motion.div initial={{ opacity: 0, y: 40, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, type: "spring", stiffness: 100 }} className="text-center">
      <p className="text-8xl sm:text-9xl font-black font-mono mb-4" style={{ color, textShadow: `0 0 15px ${color}50, 0 0 40px ${color}20` }}>{animated}</p>
      <p className="text-2xl text-gray-400 max-w-[240px]">{label}</p>
    </motion.div>
  );
}

function StatSlide({ title, stats }: { title: string; stats: { value: string; label: string; color: string }[] }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-10 sm:px-20">
      <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl sm:text-7xl font-bold mb-20 text-center">{title}</motion.h2>
      <div className="flex flex-wrap items-start justify-center gap-14 sm:gap-24">
        {stats.map((s, i) => <AnimatedStat key={i} value={s.value} label={s.label} color={s.color} delay={0.25 * (i + 1)} />)}
      </div>
    </div>
  );
}

function QuoteSlide({ quote, author, emoji }: { quote: string; author: string; emoji: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-12 sm:px-24 text-center">
      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="text-7xl mb-10">{emoji}</motion.span>
      <motion.blockquote initial={{ opacity: 0, y: 30, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.3, duration: 0.7 }}
        className="text-4xl sm:text-6xl font-light italic text-gray-200 max-w-5xl leading-relaxed"
        style={{ textShadow: "0 0 30px rgba(0,255,65,0.1)" }}>&ldquo;{quote}&rdquo;</motion.blockquote>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-10 text-2xl text-gray-500">— {author}</motion.p>
    </div>
  );
}

function TwoColumnSlide({ title, icon, left, right }: { title: string; icon: string; left: { title: string; items: string[] }; right: { title: string; items: string[] } }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-10 sm:px-20">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-5 mb-10">
        <span className="text-6xl">{icon}</span>
        <h2 className="text-5xl sm:text-6xl font-bold text-center">{title}</h2>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-6xl">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="border-l-4 border-red-500 bg-white/[0.03] backdrop-blur-sm rounded-xl pl-8 py-6 glow-border-red">
          <h3 className="text-3xl font-bold text-red-400 mb-5">{left.title}</h3>
          <ul className="space-y-4">{left.items.map((item, i) => <li key={i} className="text-xl text-gray-300 flex items-start gap-3"><span className="text-red-400 mt-0.5">✕</span>{item}</li>)}</ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
          className="border-l-4 border-green-500 bg-white/[0.03] backdrop-blur-sm rounded-xl pl-8 py-6 glow-border-green">
          <h3 className="text-3xl font-bold text-green-400 mb-5">{right.title}</h3>
          <ul className="space-y-4">{right.items.map((item, i) => <li key={i} className="text-xl text-gray-300 flex items-start gap-3"><span className="text-green-400 mt-0.5">✓</span>{item}</li>)}</ul>
        </motion.div>
      </div>
    </div>
  );
}

function BigTextSlide({ text, subtext, color = "#00ff41" }: { text: string; subtext: string; color?: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-12 sm:px-24 text-center">
      <motion.h1 initial={{ opacity: 0, scale: 0.7, filter: "blur(12px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ type: "spring", stiffness: 80, damping: 12 }}
        className="text-6xl sm:text-8xl font-black max-w-6xl leading-tight" style={{ color, textShadow: `0 0 20px ${color}40, 0 0 60px ${color}15` }}>{text}</motion.h1>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
        className="mt-10 text-2xl sm:text-3xl text-gray-400 max-w-4xl leading-relaxed">{subtext}</motion.p>
    </div>
  );
}

/* ================================================================
   QUIZ (auto-reveal after 5s)
   ================================================================ */
function QuizSlide({ question, options, correctIndex, explanation, isActive }: { question: string; options: string[]; correctIndex: number; explanation: string; isActive: boolean }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    if (!isActive) { setSelected(null); setRevealed(false); return; }
    const t = setTimeout(() => { setSelected(correctIndex); setRevealed(true); }, 5000);
    return () => clearTimeout(t);
  }, [isActive, correctIndex]);
  return (
    <div className="flex flex-col items-center justify-center h-full px-8 sm:px-20 text-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-4 mb-6">
        <span className="text-5xl">🧩</span><h2 className="text-4xl sm:text-5xl font-bold">Sahte mi Gerçek mi?</h2>
      </motion.div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-2xl text-gray-200 mb-8">{question}</motion.p>
      <div className="space-y-3 mb-6 w-full max-w-4xl">
        {options.map((opt, i) => (
          <motion.button key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
            onClick={() => { setSelected(i); setRevealed(true); }} disabled={revealed}
            className={`w-full text-left px-6 py-4 rounded-xl border transition-all text-xl ${
              revealed ? i === correctIndex ? "bg-green-500/20 border-green-500 text-green-300"
                : i === selected ? "bg-red-500/20 border-red-500 text-red-300" : "bg-white/5 border-white/10 text-gray-500"
                : "bg-white/5 border-white/10 text-gray-200 hover:bg-white/10 cursor-pointer"}`}>
            <span className="font-bold mr-3">{String.fromCharCode(65 + i)})</span>{opt}
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {revealed && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-xl p-6 border max-w-4xl bg-green-900/20 border-green-500/30">
            <p className="font-bold text-xl text-green-400 mb-1">Doğru Cevap: {String.fromCharCode(65 + correctIndex)})</p>
            <p className="text-gray-300 text-lg">{explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================================================================
   AUTO-PLAY SIMULATIONS
   ================================================================ */
function AutoKargoSim({ isActive }: { isActive: boolean }) {
  const [phase, setPhase] = useState<"idle" | "sms" | "site" | "trap" | "lesson">("idle");
  useEffect(() => { if (isActive) setPhase("sms"); else setPhase("idle"); }, [isActive]);
  useEffect(() => {
    if (phase === "sms") { const t = setTimeout(() => setPhase("site"), 2500); return () => clearTimeout(t); }
    if (phase === "site") { const t = setTimeout(() => setPhase("trap"), 3000); return () => clearTimeout(t); }
    if (phase === "trap") { const t = setTimeout(() => setPhase("lesson"), 3500); return () => clearTimeout(t); }
  }, [phase]);
  if (phase === "idle") return null;
  return (
    <div className="flex flex-col items-center justify-center h-full px-8 text-center">
      <h2 className="text-3xl sm:text-5xl font-bold mb-8">📦 Sahte Kargo SMS Tuzağı</h2>
      <div className="w-full max-w-lg">
        <AnimatePresence mode="wait">
          {phase === "sms" && (
            <motion.div key="sms" initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0, x: -100 }}
              className="bg-gray-100 rounded-2xl p-6 text-gray-800 border-l-4 border-blue-500 shadow-2xl">
              <div className="flex items-center gap-3 mb-3"><span className="text-3xl animate-pulse">📦</span><p className="font-bold text-xl">MNG KARGO</p></div>
              <p className="text-lg text-gray-700 text-left">Kargonuz teslim edilemedi. 24 TL gümrük vergisini ödemek için tıklayınız...</p>
              <p className="text-blue-500 text-sm font-bold mt-2 text-left">hxxps://mng-kargo-odeme.com</p>
            </motion.div>
          )}
          {phase === "site" && (
            <motion.div key="site" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ opacity: 0, x: -100 }}
              className="bg-white rounded-2xl overflow-hidden shadow-2xl text-gray-800">
              <div className="bg-blue-900 p-4 text-white font-bold text-xl">MNG KARGO</div>
              <div className="p-6">
                <div className="bg-yellow-50 border border-yellow-300 p-3 rounded-lg mb-4 text-yellow-800 text-lg">⚠️ Teslimat başarısız</div>
                <div className="border rounded-lg p-4 bg-red-50 border-red-200 mb-4"><p className="text-sm text-red-500">Borç</p><p className="font-bold text-red-700 text-3xl">24.00 TL</p></div>
                <div className="bg-blue-600 text-white py-3 rounded-xl text-center font-bold text-xl">Ödeme Yap</div>
              </div>
            </motion.div>
          )}
          {phase === "trap" && (
            <motion.div key="trap" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
              className="bg-white rounded-2xl overflow-hidden shadow-2xl text-gray-800 p-6">
              <h3 className="font-bold text-xl mb-4 text-center border-b pb-3">3D Secure Doğrulama</h3>
              <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm text-gray-700 border border-gray-300">
                SMS: Kartınızla <motion.span animate={{ backgroundColor: ["#fef08a", "#fde047", "#fef08a"] }} transition={{ repeat: Infinity, duration: 0.5 }}
                  className="font-bold px-1 rounded">24,500.00 TL</motion.span> tutarındaki işlem için şifreniz: 192381
              </div>
            </motion.div>
          )}
          {phase === "lesson" && (
            <motion.div key="lesson" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-red-900/30 border border-red-500/30 rounded-2xl p-8">
              <p className="text-3xl font-bold text-red-400 mb-3">24.500 TL Dolandırıldınız!</p>
              <p className="text-xl text-gray-300">Sitede &quot;24 TL&quot; yazıyordu ama bankadan gelen SMS&apos;te &quot;24.500 TL&quot; çekilmek istendi.</p>
              <p className="text-lg text-yellow-400 font-bold mt-4">Ders: Onay SMS&apos;indeki TUTARI mutlaka okuyun!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function AutoPonziSim({ isActive }: { isActive: boolean }) {
  const [phase, setPhase] = useState<"idle" | "offer" | "earning" | "trap" | "lesson">("idle");
  const [balance, setBalance] = useState(0);
  useEffect(() => { if (isActive) { setPhase("offer"); setBalance(0); } else setPhase("idle"); }, [isActive]);
  useEffect(() => {
    if (phase === "offer") { const t = setTimeout(() => setPhase("earning"), 2500); return () => clearTimeout(t); }
    if (phase === "trap") { const t = setTimeout(() => setPhase("lesson"), 3500); return () => clearTimeout(t); }
  }, [phase]);
  useEffect(() => {
    if (phase === "earning" && balance < 250) { const t = setTimeout(() => setBalance(p => p + 50), 350); return () => clearTimeout(t); }
    if (phase === "earning" && balance >= 250) { const t = setTimeout(() => setPhase("trap"), 1000); return () => clearTimeout(t); }
  }, [phase, balance]);
  if (phase === "idle") return null;
  return (
    <div className="flex flex-col items-center justify-center h-full px-8 text-center">
      <h2 className="text-3xl sm:text-5xl font-bold mb-8">💰 Görev Dolandırıcılığı (Ponzi)</h2>
      <div className="w-full max-w-lg">
        <AnimatePresence mode="wait">
          {phase === "offer" && (
            <motion.div key="offer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="bg-green-900/20 border border-green-500/30 rounded-2xl p-8">
              <span className="text-5xl block mb-4">💬</span>
              <p className="text-xl text-gray-200 font-bold mb-2">WhatsApp Mesajı:</p>
              <p className="text-lg text-gray-300">&quot;YouTube videolarını beğenerek günlük 500-2000 TL kazanabilirsiniz!&quot;</p>
            </motion.div>
          )}
          {phase === "earning" && (
            <motion.div key="earning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="bg-gray-900 border border-gray-700 rounded-2xl p-8">
              <p className="text-gray-400 text-lg mb-2">Kazancınız</p>
              <motion.p className="text-6xl font-black text-green-400 font-mono mb-4" key={balance} initial={{ scale: 1.3 }} animate={{ scale: 1 }}>{balance} TL</motion.p>
              <div className="w-full bg-gray-800 rounded-full h-3"><motion.div className="bg-green-500 h-3 rounded-full" animate={{ width: `${(balance / 250) * 100}%` }} /></div>
            </motion.div>
          )}
          {phase === "trap" && (
            <motion.div key="trap" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="bg-yellow-900/20 border border-yellow-500/30 rounded-2xl p-8">
              <p className="text-yellow-400 text-2xl font-bold mb-3">250 TL Kazandınız!</p>
              <p className="text-xl text-gray-300">Çekmek için <strong className="text-red-400">20.000 TL teminat</strong> yatırmanız gerekiyor...</p>
            </motion.div>
          )}
          {phase === "lesson" && (
            <motion.div key="lesson" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-red-900/30 border border-red-500/30 rounded-2xl p-8">
              <p className="text-3xl font-bold text-red-400 mb-3">Klasik Ponzi Tuzağı!</p>
              <p className="text-xl text-gray-300 mb-2">İlk 250 TL &quot;olta yemi&quot;dir. Asıl hedef sizden 20.000 TL almak.</p>
              <p className="text-lg text-yellow-400 font-bold">İş veren para istemez, öder!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ================================================================
   AUTO-PLAY: PASSWORD CRACKER
   ================================================================ */
const CRACK_PASSWORDS = [
  { pass: "123456", time: "Anında", timeDetail: "0.001 saniye", label: "6 rakam", color: "#ef4444" },
  { pass: "ankara06", time: "0.3 saniye", timeDetail: "Yarım saniye bile değil", label: "8 harf+sayı", color: "#f97316" },
  { pass: "Kalem42!", time: "7 dakika", timeDetail: "Bir kahve molası kadar", label: "8 karışık", color: "#eab308" },
  { pass: "Tr#n85_kL!m2", time: "3.000 yıl", timeDetail: "Kırılamadı!", label: "12 karışık", color: "#22c55e" },
  { pass: "BenSimavdaYasiyorum!", time: "∞ Sonsuz", timeDetail: "Kırılması imkansız!", label: "Cümle şifre", color: "#10b981" },
];

function AutoPasswordCrack({ isActive }: { isActive: boolean }) {
  const [idx, setIdx] = useState(-1);
  const [cracking, setCracking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cracked, setCracked] = useState(false);
  const [masked, setMasked] = useState("");

  useEffect(() => {
    if (!isActive) { setIdx(-1); setCracking(false); setProgress(0); setCracked(false); return; }
    const t = setTimeout(() => setIdx(0), 1200);
    return () => clearTimeout(t);
  }, [isActive]);

  useEffect(() => {
    if (idx < 0 || idx >= CRACK_PASSWORDS.length) return;
    setCracking(true); setProgress(0); setCracked(false);
    setMasked("*".repeat(CRACK_PASSWORDS[idx].pass.length));
  }, [idx]);

  useEffect(() => {
    if (!cracking) return;
    const isWeak = idx < 3;
    const speed = isWeak ? 45 : 80;
    const maxProg = isWeak ? 100 : (idx === 3 ? 15 : 5);
    const iv = setInterval(() => {
      setProgress(p => {
        if (p >= maxProg) {
          clearInterval(iv);
          setCracking(false);
          setCracked(isWeak);
          if (isWeak) setMasked(CRACK_PASSWORDS[idx].pass);
          setTimeout(() => { if (idx < CRACK_PASSWORDS.length - 1) setIdx(i => i + 1); }, 4000);
          return maxProg;
        }
        return p + 1;
      });
    }, speed);
    return () => clearInterval(iv);
  }, [cracking, idx]);

  useEffect(() => {
    if (!cracking || idx < 0) return;
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%&";
    const iv = setInterval(() => {
      const len = CRACK_PASSWORDS[idx].pass.length;
      setMasked(Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join(""));
    }, 60);
    return () => clearInterval(iv);
  }, [cracking, idx]);

  if (!isActive || idx < 0) return null;
  const current = CRACK_PASSWORDS[idx];
  return (
    <div className="flex flex-col items-center justify-center h-full px-8 text-center">
      <h2 className="text-4xl sm:text-5xl font-bold mb-8">🔓 Şifreniz Ne Kadar Sürede Kırılır?</h2>
      <div className="w-full max-w-3xl">
        <div className="bg-black/80 border border-emerald-500/30 rounded-2xl p-8 font-mono shadow-2xl glow-border-green">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-500 text-base">Hedef şifre:</span>
            <span className="text-emerald-400/60 text-base font-bold">{current.label}</span>
          </div>
          {/* Password display */}
          <div className="bg-black rounded-xl px-6 py-5 mb-6 border border-gray-800">
            <motion.p key={masked} className="text-4xl sm:text-5xl font-bold tracking-widest text-center"
              style={{ color: cracked ? "#ef4444" : cracking ? "#00ff41" : "#6b7280",
                textShadow: cracking ? "0 0 10px rgba(0,255,65,0.4)" : cracked ? "0 0 10px rgba(239,68,68,0.4)" : "none" }}>
              {masked}
            </motion.p>
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-base mb-2">
              <span className="text-gray-400">Brute-force ilerleme</span>
              <span className="font-bold" style={{ color: current.color }}>
                {cracking ? `${Math.min(progress, 100)}%` : cracked ? "KIRILDI!" : `${progress}% — Durdu`}
              </span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-4">
              <motion.div className="h-4 rounded-full transition-all duration-100" animate={{ width: `${Math.min(progress, 100)}%` }}
                style={{ background: cracked ? "#ef4444" : idx >= 3 ? "#22c55e" : current.color,
                  boxShadow: cracking ? `0 0 10px ${current.color}60` : "none" }} />
            </div>
          </div>

          {/* BIG time result */}
          <AnimatePresence mode="wait">
            {!cracking && (
              <motion.div key={idx} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="pt-5 border-t border-gray-700 text-center">
                <p className="text-gray-500 text-base mb-2">Kırılma süresi</p>
                <p className="text-5xl sm:text-6xl font-black mb-2" style={{ color: current.color,
                  textShadow: `0 0 20px ${current.color}50` }}>{current.time}</p>
                <p className="text-xl" style={{ color: current.color + "99" }}>{current.timeDetail}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Status dots */}
        <div className="flex justify-center gap-4 mt-6">
          {CRACK_PASSWORDS.map((p, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <motion.div className="w-4 h-4 rounded-full" animate={{ scale: i === idx ? [1, 1.5, 1] : 1 }}
                transition={i === idx ? { repeat: Infinity, duration: 1 } : {}}
                style={{ background: i < idx ? (i < 3 ? "#ef4444" : "#22c55e") : i === idx ? current.color : "#374151",
                  boxShadow: i === idx ? `0 0 8px ${current.color}` : "none" }} />
              <span className="text-xs text-gray-600">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   AUTO-PLAY: WHATSAPP SCAM
   ================================================================ */
function AutoWhatsAppSim({ isActive }: { isActive: boolean }) {
  const [msgs, setMsgs] = useState(0);
  const [phase, setPhase] = useState<"idle" | "chat" | "hack" | "lesson">("idle");

  const MESSAGES = [
    { from: "them", text: "Merhaba! Google şirketinden arıyoruz 🌍", time: "14:23" },
    { from: "them", text: "Video beğenerek günlük 500-2000₺ kazanabilirsiniz! İlk görev ÜCRETSİZ", time: "14:23" },
    { from: "them", text: "İşte ilk göreviniz: Bu linke tıklayın 👉 bit.ly/gorev-kazan", time: "14:24" },
    { from: "you", text: "Tamam ilginç, bakayım", time: "14:25" },
    { from: "them", text: "Tebrikler! 250₺ kazandınız! 🎉 Çekmek için 5000₺ teminat yatırın", time: "14:26" },
  ];

  useEffect(() => {
    if (!isActive) { setPhase("idle"); setMsgs(0); return; }
    setPhase("chat"); setMsgs(0);
  }, [isActive]);

  useEffect(() => {
    if (phase === "chat" && msgs < MESSAGES.length) {
      const t = setTimeout(() => setMsgs(p => p + 1), 1500);
      return () => clearTimeout(t);
    }
    if (phase === "chat" && msgs >= MESSAGES.length) {
      const t = setTimeout(() => setPhase("hack"), 2000);
      return () => clearTimeout(t);
    }
    if (phase === "hack") {
      const t = setTimeout(() => setPhase("lesson"), 3000);
      return () => clearTimeout(t);
    }
  }, [phase, msgs]);

  if (phase === "idle") return null;
  return (
    <div className="flex flex-col items-center justify-center h-full px-8 text-center">
      <h2 className="text-4xl sm:text-5xl font-bold mb-8">💬 WhatsApp Dolandırıcılığı</h2>
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {phase === "chat" && (
            <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="bg-[#0b141a] rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
              {/* WhatsApp header */}
              <div className="bg-[#1f2c34] px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-lg">🌍</div>
                <div><p className="text-white font-medium text-sm">+91 98XX XXXX XX</p><p className="text-emerald-400 text-xs">online</p></div>
              </div>
              {/* Messages */}
              <div className="p-4 space-y-2 min-h-[280px]">
                {MESSAGES.slice(0, msgs).map((msg, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${msg.from === "them"
                      ? "bg-[#1f2c34] text-gray-200 mr-auto" : "bg-[#005c4b] text-white ml-auto"}`}>
                    <p>{msg.text}</p>
                    <p className="text-[10px] text-gray-500 text-right mt-1">{msg.time}</p>
                  </motion.div>
                ))}
                {msgs < MESSAGES.length && (
                  <div className="bg-[#1f2c34] text-gray-400 text-xs rounded-xl px-3 py-2 w-16 mr-auto">
                    <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }}>yazıyor...</motion.span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {phase === "hack" && (
            <motion.div key="hack" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="bg-red-900/30 border border-red-500/30 rounded-2xl p-8">
              <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6 }}
                className="text-6xl block mb-4">⚠️</motion.span>
              <p className="text-2xl font-bold text-red-400 mb-2">GhostPairing Saldırısı!</p>
              <p className="text-lg text-gray-300">Linke tıkladığınız an WhatsApp hesabınız ele geçirildi. Rehberinizdeki herkese aynı mesaj gönderiliyor...</p>
            </motion.div>
          )}

          {phase === "lesson" && (
            <motion.div key="lesson" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <p className="text-2xl font-bold text-emerald-400 mb-4">🛡️ Korunma</p>
              <div className="space-y-3 text-left">
                <p className="text-lg text-gray-300">🚫 Tanımadığınız numaralara yanıt vermeyin</p>
                <p className="text-lg text-gray-300">🔗 Bilinmeyen linklere asla tıklamayın</p>
                <p className="text-lg text-gray-300">📊 WhatsApp 2025&apos;te 6.8M dolandırıcı hesap kapattı</p>
                <p className="text-lg text-yellow-400 font-bold mt-2">İş veren para istemez — öder!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ================================================================
   SECTION DEFINITIONS (for navigation)
   ================================================================ */
const SECTIONS = [
  { name: "Açılış", start: 0 },
  { name: "Oltalama", start: 3 },
  { name: "Şifreler", start: 11 },
  { name: "Sosyal Müh.", start: 14 },
  { name: "Yapay Zeka", start: 18 },
  { name: "Bahis & Veri", start: 20 },
  { name: "Zorbalık", start: 25 },
  { name: "Korunma", start: 28 },
  { name: "Kapanış", start: 31 },
];

/* ================================================================
   ALL SLIDES (36 slides)
   ================================================================ */
const slides: Slide[] = [

  // ── AÇILIŞ ──
  { id: "cover", content: (
    <div className="flex flex-col items-center justify-center h-full text-center px-8 relative">
      {/* Animated rings behind title */}
      <motion.div className="absolute w-[600px] h-[600px] rounded-full border border-emerald-500/10"
        animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.2, 0.5, 0.2] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} />
      <motion.div className="absolute w-[400px] h-[400px] rounded-full border border-cyan-500/10"
        animate={{ scale: [1.1, 0.8, 1.1], opacity: [0.3, 0.5, 0.3] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} />
      <div className="relative z-10 flex flex-col items-center">
        <motion.div initial={{ opacity: 0, y: -30, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }} className="mb-4">
          <span className="text-lg font-mono text-emerald-400 uppercase tracking-[0.3em]" style={{ textShadow: "0 0 10px rgba(0,255,65,0.3)" }}>Simav Meslek Yüksekokulu</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl sm:text-8xl font-black tracking-tight mb-4">
          <span className="text-shimmer">Siber Güvenlik</span>
        </motion.h1>
        <motion.h1 initial={{ opacity: 0, y: 20, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-5xl sm:text-7xl font-black tracking-tight text-white mb-6">
          Farkındalık Etkinliği
        </motion.h1>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.7, duration: 0.8 }}
          className="h-[2px] w-40 mb-8 rounded-full" style={{ background: "linear-gradient(90deg, transparent, #00ff41, #0ea5e9, transparent)", boxShadow: "0 0 15px rgba(0,255,65,0.3)" }} />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
          className="text-xl text-gray-400 max-w-3xl mb-10">Oltalama · Şifre güvenliği · Sosyal mühendislik · Yapay zeka · Sanal bahis · Siber zorbalık</motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
          <p className="text-gray-300 text-xl font-bold">Öğr. Gör. Osman Can Çetlenbik</p>
          <p className="text-gray-500 text-base mt-1">Manisa Celal Bayar Üniversitesi — Teknik Bilimler MYO</p>
        </motion.div>
      </div>
    </div>
  )},

  { id: "stats", content: <StatSlide title="Türkiye'de Siber Tehditler — 2025/2026" stats={[
    { value: "1.2M+", label: "Saldırı girişimi / gün", color: "#ef4444" },
    { value: "%26", label: "Kullanıcılar tehdit altında", color: "#f59e0b" },
    { value: "49M", label: "Tek sızıntıda açığa çıkan kayıt", color: "#0ea5e9" },
    { value: "%900", label: "Deepfake artış oranı", color: "#a855f7" },
  ]} /> },

  { id: "quote-intro", content: <QuoteSlide emoji="🧠" quote="En güçlü güvenlik duvarı bile, içerideki biri kapıyı açarsa işe yaramaz." author="Sosyal Mühendislik Gerçeği" /> },

  // ── BÖLÜM 1: OLTALAMA ──
  { id: "sec-oltalama", section: "Oltalama", content: <SectionTitle icon="🎣" title="Oltalama Saldırıları" subtitle="Saldırganların en yaygın silahı: Sahte mesajlar" color="#ef4444" /> },

  { id: "phishing-types", content: <BulletSlide title="Oltalama Türleri" icon="📧" items={[
    { emoji: "📧", text: "E-posta: Sahte CEO, banka veya kargo — aciliyet ve korku yaratır" },
    { emoji: "📱", text: "Smishing (SMS): 'Kargonuz bekliyor' linki ile sahte ödeme sayfası" },
    { emoji: "🔗", text: "Typosquatting: garantibbva.com.tr yerine garanti-bbva-giris.com" },
    { emoji: "📞", text: "Vishing (Telefon): Sahte polis, savcı veya banka müdürü araması" },
  ]} /> },

  { id: "sahte-mesajlar", content: (
    <div className="flex flex-col items-center justify-center h-full px-8 sm:px-16 text-center">
      <h2 className="text-4xl sm:text-5xl font-bold mb-8">Sahte Mesaj Örnekleri</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-6xl">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl overflow-hidden shadow-2xl text-gray-800">
          <div className="bg-[#0078d4] text-white px-6 py-3 flex items-center gap-2 text-lg"><span>📧</span><strong>Outlook</strong></div>
          <div className="p-5 border-b border-gray-200">
            <p className="font-bold text-xl mb-1">Acil Ödeme Talimatı - GİZLİ</p>
            <p className="text-gray-600 text-base">Gönderen: <span className="text-red-500 font-mono">ceo@hoIding-onay.xyz</span></p>
          </div>
          <div className="p-5 text-lg leading-relaxed">450.000 TL gönderin. Muhasebeden kimseyle paylaşmayın. Beni sakın aramayın.</div>
          <div className="bg-red-50 px-5 py-3 text-red-500 text-sm">🚩 Sahte domain · Teyit engeli · Aşırı aciliyet</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="bg-gray-900 rounded-2xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-3"><span className="text-2xl animate-pulse">📦</span><p className="font-bold text-lg text-gray-300">MNG KARGO — Şimdi</p></div>
          <div className="bg-gray-800 rounded-xl p-4 text-gray-200 text-lg mb-3">Kargonuz gümrükte. 24.90 TL ödeyin: <span className="text-blue-400 text-sm">hxxps://mng-kargo-odeme.com</span></div>
          <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">🚩 Kargo firması SMS ile ödeme linki göndermez</div>
          <div className="mt-3 bg-green-900/30 border border-green-500/30 rounded-lg p-3 text-green-400 text-sm">✅ Gerçek: ptt.gov.tr</div>
        </motion.div>
      </div>
    </div>
  )},

  { id: "example-fake-bank", content: (
    <div className="flex flex-col items-center justify-center h-full px-8 sm:px-16 text-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-4 mb-8">
        <span className="text-5xl">🏦</span><h2 className="text-4xl sm:text-5xl font-bold">Sahte Banka Giriş Sayfası</h2>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-4xl text-gray-800">
        <div className="bg-gray-100 px-5 py-3 flex items-center gap-3 border-b">
          <div className="flex gap-1.5"><span className="w-3 h-3 rounded-full bg-red-400" /><span className="w-3 h-3 rounded-full bg-yellow-400" /><span className="w-3 h-3 rounded-full bg-green-400" /></div>
          <div className="flex-1 bg-white rounded-full px-4 py-2 text-lg border border-gray-300 flex items-center gap-2">
            <span className="text-green-600">🔒</span><span className="text-gray-500">garanti-bbva-</span><span className="text-red-600 font-bold">giris</span><span className="text-gray-500">.com/online</span>
          </div>
        </div>
        <div className="text-center py-8 px-6">
          <div className="w-16 h-16 bg-green-600 rounded-2xl mx-auto flex items-center justify-center text-3xl mb-3 shadow-lg">🏦</div>
          <h3 className="font-bold text-2xl text-gray-800 mb-1">Garanti BBVA</h3>
          <p className="text-gray-500 mb-5">İnternet Bankacılığı Giriş</p>
          <div className="max-w-xs mx-auto space-y-3">
            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-left text-gray-400">TC Kimlik No</div>
            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-left text-gray-400">Şifre</div>
            <div className="bg-green-600 text-white rounded-xl px-4 py-3 text-center font-bold">Giriş Yap</div>
          </div>
        </div>
        <div className="bg-red-50 border-t-2 border-red-200 px-6 py-4 flex items-center justify-between">
          <div className="text-red-500 text-base space-y-1">
            <p>🚩 garanti-bbva-<strong>giris</strong>.com → SAHTE</p>
            <p>🚩 SMS linki ile geldiniz</p>
          </div>
          <div className="bg-green-50 border border-green-300 rounded-xl px-4 py-3 text-center">
            <p className="text-green-700 font-bold">✅ Gerçek:</p>
            <p className="text-green-600 text-xl font-mono font-bold">garantibbva.com.tr</p>
          </div>
        </div>
      </motion.div>
    </div>
  )},

  { id: "qr-teaser", content: (
    <div className="flex flex-col items-center justify-center h-full px-8 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 100 }}
        className="text-[7rem] mb-8">📱</motion.div>
      <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="text-6xl sm:text-8xl font-black mb-6" style={{ color: "#00ff41", textShadow: "0 0 30px rgba(0,255,65,0.5)" }}>
        <GlitchText text="Canlı Deney" />
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        className="text-2xl sm:text-3xl text-gray-300 mb-4 max-w-2xl">Telefonlarınızı çıkarın.</motion.p>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        className="text-2xl sm:text-3xl text-yellow-400 font-bold">Bir sonraki ekrandaki QR kodu tarayın.</motion.p>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="mt-8 text-xl text-gray-500 italic">Bakalım ne olacak...</motion.p>
    </div>
  )},

  { id: "qr-fullscreen", content: (
    <div className="flex items-center justify-center h-full w-full">
      <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 12 }}>
        <motion.div
          animate={{ boxShadow: ["0 0 30px rgba(0,255,65,0.15)", "0 0 100px rgba(0,255,65,0.45)", "0 0 30px rgba(0,255,65,0.15)"] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="bg-white p-12 rounded-3xl">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=https://hackleme-sanati.vercel.app/bolum/qr-kod-tuzagi"
            alt="QR" className="w-[34rem] h-[34rem] sm:w-[40rem] sm:h-[40rem]" />
        </motion.div>
      </motion.div>
    </div>
  )},

  { id: "quiz-phishing", content: (isActive: boolean) => <QuizSlide isActive={isActive}
    question="Aşağıdaki e-posta adreslerinden hangisi SAHTE?"
    options={["destek@garanti.com.tr", "bilgi@turkiye.gov.tr", "guvenlik@garanti-bbva-destek.com", "noreply@ptt.gov.tr"]}
    correctIndex={2}
    explanation="garanti-bbva-destek.com gerçek Garanti adresi değil. Gerçeği: garantibbva.com.tr"
  /> },

  { id: "sim-kargo-auto", content: (isActive: boolean) => <AutoKargoSim isActive={isActive} /> },

  // ── BÖLÜM 2: ŞİFRE GÜVENLİĞİ ──
  { id: "sec-sifre", section: "Şifre Güvenliği", content: <SectionTitle icon="🔐" title="Şifre Güvenliği" subtitle="Tek şifre = Domino etkisi" color="#0ea5e9" /> },

  { id: "password-crack", content: (isActive: boolean) => <AutoPasswordCrack isActive={isActive} /> },

  { id: "2fa", content: <TwoColumnSlide title="İki Faktörlü Doğrulama (2FA)" icon="📲"
    left={{ title: "SMS ile 2FA (Riskli)", items: ["SIM Swap saldırısına açık", "SMS ele geçirilebilir", "Operatör sosyal mühendisliği", "Hiç yoktan iyidir ama..."] }}
    right={{ title: "Authenticator App (Güvenli)", items: ["Google/Microsoft Authenticator", "Kod cihazdan çıkmaz", "SIM Swap'a karşı bağışık", "30 saniyede değişen kod"] }}
  /> },

  // ── BÖLÜM 3: SOSYAL MÜHENDİSLİK ──
  { id: "sec-se", section: "Sosyal Mühendislik", content: <SectionTitle icon="🎭" title="Sosyal Mühendislik" subtitle="İnsanlar hacklenmiyor, ikna ediliyor" color="#ef4444" /> },

  { id: "se-weapons", content: <BulletSlide title="Saldırganın Silahları" icon="⚔️" items={[
    { emoji: "👮", text: "Otorite Baskısı: 'Ben komiserim, hesabınız terör soruşturmasında'" },
    { emoji: "⏰", text: "Aciliyet: 'Son 15 dakika! Hemen işlem yapın yoksa hesabınız kapanacak'" },
    { emoji: "😨", text: "Korku: 'Eşiniz tutuklanacak, derhal parayı poşete koyun'" },
    { emoji: "🤑", text: "Açgözlülük: 'Tebrikler! 50.000 TL kazandınız, sadece kart bilgisi lazım'" },
  ]} /> },

  { id: "golden-rule", content: <BigTextSlide text="Devlet asla telefonda para, altın veya şifre istemez." subtext="Bu cümleyi bir yere yazın. Ailenize öğretin. Hayat kurtarır." color="#ef4444" /> },

  { id: "phishing-cases", content: <BulletSlide title="Güncel Gerçek Örnekler" icon="📖" items={[
    { emoji: "📞", text: "Mart 2026, Gaziantep: Sahte savcı, 6 milyon TL değerinde altın ve mücevher aldı" },
    { emoji: "💰", text: "Aralık 2025, Sakarya: Sahte polis/savcı dolandırıcıları 3.5 milyon TL çekti" },
    { emoji: "🎙️", text: "2025: Deepfake ses klonlama %900 arttı — 3 saniyelik kayıtla ses birebir kopyalanıyor" },
    { emoji: "💾", text: "Şubat 2026: IDMerit sızıntısı — 49 milyon kişinin kimlik bilgileri açığa çıktı" },
  ]} /> },

  // ── BÖLÜM 4: YAPAY ZEKA TEHDİTLERİ ──
  { id: "sec-ai", section: "Yapay Zeka Tehditleri", content: <SectionTitle icon="🤖" title="Yapay Zeka Tehditleri" subtitle="Deepfake, ses klonlama ve akıllı dolandırıcılık" color="#a855f7" /> },

  { id: "whatsapp-fraud", content: (isActive: boolean) => <AutoWhatsAppSim isActive={isActive} /> },

  // ── BÖLÜM 5: BAHİS & VERİ PANELLERİ ──
  { id: "sec-bahis", section: "Bahis & Veri Panelleri", content: <SectionTitle icon="🎰" title="Sanal Bahis & Veri Panelleri" subtitle="'Kolay para' vaadi — pahalı ders" color="#f59e0b" /> },

  { id: "bahis-tuzak", content: <BulletSlide title="Yasadışı Bahis ve Kripto Tuzakları" icon="🚫" items={[
    { emoji: "📱", text: "Instagram/TikTok'ta 'garantili kupon', 'bedava bonus' — gençleri hedef alıyor" },
    { emoji: "💸", text: "Kazandığınızı çekemezsiniz — para hep sitede kalır. Mart 2026: 2.3 milyar TL'lik sahte yatırım vurgunu" },
    { emoji: "🏦", text: "IBAN kiralama: 500 TL komisyon için kara para aklama suçunun faili SİZ olursunuz" },
    { emoji: "⛓️", text: "2025: Tek bir bahis altyapısında 26 milyar TL ciro — kripto ile yurt dışına aktarıldı" },
  ]} /> },

  { id: "bahis-stats", content: <StatSlide title="Yasadışı Bahis — Gerçek Rakamlar" stats={[
    { value: "₺26M+", label: "Tek operasyonda tespit edilen ciro (milyar)", color: "#f59e0b" },
    { value: "%94", label: "Uzun vadede kaybeden", color: "#ef4444" },
    { value: "3-7yıl", label: "Hapis cezası (7258 SK)", color: "#a855f7" },
    { value: "%40", label: "Üniversitelilerde yaygınlık", color: "#0ea5e9" },
  ]} /> },

  { id: "veri-panel-merged", content: <BulletSlide title="Kişisel Veri Panelleri ve Kullanımı" icon="🖥️" items={[
    { emoji: "🔍", text: "TC, isim, adres, telefon, aile bilgileri — Telegram'da aylık abonelikle satılıyor" },
    { emoji: "💾", text: "2026: IDMerit sızıntısı 49M · Şikayetvar 212K · Baydöner 1.5M · TurkNet 2.8M kayıt sızdırıldı" },
    { emoji: "📞", text: "Bilgilerinizi bilen sahte polis/banka arar — biliyorsa 'gerçek' demek değil, panelden almış" },
    { emoji: "📱", text: "SIM Swap: TC bilgilerinizle operatörden yeni SIM çıkartılır, SMS doğrulamanız çalınır" },
  ]} note="e-Devlet'ten adınıza açılmış şirket/hat olup olmadığını düzenli kontrol edin" /> },

  { id: "sim-ponzi-auto", content: (isActive: boolean) => <AutoPonziSim isActive={isActive} /> },

  // ── BÖLÜM 6: SİBER ZORBALIK ──
  { id: "sec-bully", section: "Siber Zorbalık", content: <SectionTitle icon="💔" title="Siber Zorbalık" subtitle="Ekranın arkasında da gerçek insanlar var" color="#a855f7" /> },

  { id: "bully-stats", content: <StatSlide title="Siber Zorbalık — Türkiye" stats={[
    { value: "1/2", label: "Her 2 çocuktan biri zorbalık yapıyor (TÜBİTAK)", color: "#a855f7" },
    { value: "3/4", label: "Her 4 çocuktan 3'ü zorbalığa uğruyor", color: "#ef4444" },
    { value: "7/24", label: "Evde bile devam eder", color: "#f59e0b" },
    { value: "5+yıl", label: "Hapis cezası", color: "#0ea5e9" },
  ]} /> },

  { id: "bully-action", content: <TwoColumnSlide title="Siber Zorbalıkta Ne Yapmalı?" icon="🆘"
    left={{ title: "Mağdursanız", items: ["Ekran görüntüsü ALIN (delil)", "Engelle + platforma şikayet et", "ALO 182 (Siber Suç İhbar)", "Psikolojik destek almaktan çekinmeyin"] }}
    right={{ title: "Tanıksanız", items: ["Sessiz kalmayın — sessizlik onay demektir", "Mağdura destek olun", "Zorbalığı paylaşmayın/beğenmeyin", "Yetkiliye bildirin"] }}
  /> },

  // ── BÖLÜM 7: KENDİNİZİ KORUYUN ──
  { id: "sec-protect", section: "Kendinizi Koruyun", content: <SectionTitle icon="🛡️" title="Kendinizi Koruyun" subtitle="Bugün uygulayabileceğiniz adımlar" color="#22c55e" /> },

  { id: "wifi-simswap", content: <BulletSlide title="Wi-Fi ve SIM Swap Tehlikeleri" icon="📶" items={[
    { emoji: "☕", text: "Kafe/otel/havaalanı Wi-Fi'ına bağlanınca tüm trafiğiniz izlenebilir — Şeytani İkiz saldırısı" },
    { emoji: "🏦", text: "Halka açık ağda banka uygulaması = kredi kartı bilgilerinizi teslim etmek" },
    { emoji: "📲", text: "Telefon 'SIM kayıtlı değil' diyorsa — derhal operörünüzü farklı hattan arayın" },
    { emoji: "🛡️", text: "VPN kullanın · Hassas işlemleri mobil veriyle yapın · SMS yerine Authenticator kullanın" },
  ]} /> },

  { id: "device-check", content: (
    <div className="flex flex-col items-center justify-center h-full px-8 sm:px-16 text-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[5rem] mb-4">📱</motion.div>
      <h2 className="text-4xl sm:text-5xl font-black text-yellow-400 mb-6">ŞİMDİ TELEFONUNUZU KONTROL EDİN</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-5xl text-left">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-yellow-400 font-bold text-xl mb-3">📍 Konum Geçmişi</p>
          <p className="text-gray-300 text-lg"><strong>iPhone:</strong> Ayarlar → Gizlilik → Konum → Önemli Konumlar</p>
          <p className="text-gray-300 text-lg mt-1"><strong>Android:</strong> Google Maps → Zaman Tüneli</p>
          <p className="text-gray-500 text-base mt-3">Son 2 yılda gittiğiniz her yer kayıtlı.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-red-400 font-bold text-xl mb-3">🔍 Uygulama İzinleri</p>
          <p className="text-gray-300 text-lg">Fener uygulaması → Kamera, Mikrofon? 🚩</p>
          <p className="text-gray-300 text-lg mt-1">Hesap makinesi → Rehber, SMS? 🚩</p>
          <p className="text-gray-500 text-base mt-3">Ayarlar → Uygulamalar → İzinler</p>
        </motion.div>
      </div>
    </div>
  )},

  { id: "five-steps", content: <BulletSlide title="5 Dakikada 5 Adım" icon="✅" items={[
    { emoji: "1️⃣", text: "Tüm hesaplarınıza 2FA (Authenticator) açın — şimdi, bu akşam" },
    { emoji: "2️⃣", text: "Aynı şifreyi kullanan tüm hesapları değiştirin — şifre yöneticisi kurun" },
    { emoji: "3️⃣", text: "e-Devlet'e girin → adınıza açılmış şirket/hat var mı kontrol edin" },
    { emoji: "4️⃣", text: "Sosyal medya gizliliğinizi 'Private' yapın — konumunuzu kapatın" },
    { emoji: "5️⃣", text: "Ailenize bir güvenlik parolası belirleyin — telefonda para isteyene karşı" },
  ]} /> },

  { id: "three-second-rule", content: (
    <div className="flex flex-col items-center justify-center h-full px-8 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="text-[6rem] mb-6">⏱️</motion.div>
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="text-6xl sm:text-8xl font-black text-emerald-400 mb-6 leading-none">3 SANİYE KURALI</motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        className="text-2xl text-gray-300 max-w-3xl leading-relaxed">
        Bir link tıklamadan, bir bilgi vermeden önce<br /><strong className="text-white">3 saniye durun ve düşünün:</strong>
      </motion.p>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        className="mt-8 text-2xl sm:text-3xl text-yellow-400 italic font-bold max-w-4xl">
        &ldquo;Bu benim düşüncem mi, yoksa birisi bana bunu düşündürtüyor mu?&rdquo;
      </motion.p>
    </div>
  )},

  // ── KAPANIŞ ──
  { id: "closing", content: (
    <div className="flex flex-col items-center justify-center h-full px-8 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="text-[6rem] mb-6">🎓</motion.div>
      <motion.h1 initial={{ opacity: 0, y: 20, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        className="text-6xl sm:text-8xl font-black mb-4" style={{ textShadow: "0 0 30px rgba(0,255,65,0.3)" }}>Teşekkürler!</motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="text-3xl text-gray-400 mb-4">Sorularınız için hazırım.</motion.p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mb-10">
        <p className="text-gray-300 text-2xl font-bold">Öğr. Gör. Osman Can Çetlenbik</p>
        <p className="text-gray-500 text-xl mt-2">osmancancetlenbik@gmail.com</p>
      </motion.div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        className="text-2xl text-emerald-400 font-bold">Beni takip etmek için sonraki ekrandaki QR kodları tarayın.</motion.p>
    </div>
  )},

  { id: "closing-qr", content: (
    <div className="flex items-center justify-center h-full w-full px-6">
      <div className="flex flex-row items-start gap-16 sm:gap-24">
        {[
          { url: "https://linkedin.com/in/osmancancetlenbik", label: "💼 LinkedIn", color: "59,130,246" },
          { url: "https://instagram.com/osmancancetlenbik", label: "📸 Instagram", color: "236,72,153" },
        ].map((qr, i) => (
          <motion.div key={i} className="flex flex-col items-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.2, type: "spring" }}>
            <motion.div animate={{ boxShadow: [`0 0 20px rgba(${qr.color},0.15)`, `0 0 80px rgba(${qr.color},0.45)`, `0 0 20px rgba(${qr.color},0.15)`] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.3 }} className="bg-white p-10 rounded-3xl mb-5">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${qr.url}`} alt={qr.label} className="w-80 h-80 sm:w-96 sm:h-96" />
            </motion.div>
            <p className="text-4xl font-bold" style={{ color: `rgb(${qr.color})` }}>{qr.label}</p>
          </motion.div>
        ))}
      </div>
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

  const goNext = useCallback(() => { setDirection(1); setCurrent(p => Math.min(p + 1, total - 1)); }, [total]);
  const goPrev = useCallback(() => { setDirection(-1); setCurrent(p => Math.max(p - 1, 0)); }, []);

  // Keyboard
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") { e.preventDefault(); goNext(); }
      if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); goPrev(); }
      if (e.key === "Home") { e.preventDefault(); setDirection(-1); setCurrent(0); }
      if (e.key === "End") { e.preventDefault(); setDirection(1); setCurrent(total - 1); }
      if (e.key === "f") { document.documentElement.requestFullscreen?.().catch(() => {}); }
      // Section jump: 1-9
      const num = parseInt(e.key);
      if (num >= 1 && num <= SECTIONS.length) {
        e.preventDefault();
        const target = SECTIONS[num - 1].start;
        setDirection(target > current ? 1 : -1);
        setCurrent(target);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [goNext, goPrev, total, current]);

  // Touch/swipe
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

  const slideIdx = slides.indexOf(slide);
  const slideContent = typeof slide.content === "function"
    ? slide.content(slideIdx === current)
    : slide.content;

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black" suppressHydrationWarning
      onTouchStart={(e) => { touchRef.current = { x: e.touches[0].clientX }; }}
      onTouchEnd={(e) => {
        if (!touchRef.current) return;
        const dx = e.changedTouches[0].clientX - touchRef.current.x;
        if (Math.abs(dx) > 60) { dx > 0 ? goPrev() : goNext(); }
        touchRef.current = null;
      }}>
      <div className="relative w-full h-full max-w-[177.78vh] max-h-[56.25vw] overflow-hidden select-none"
        style={{ background: "linear-gradient(135deg, #050510 0%, #0a0a1a 50%, #0f0f20 100%)" }}>

        <MatrixRain />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3">
          <span className="text-sm font-mono text-emerald-400/70 uppercase tracking-wider" style={{ textShadow: "0 0 8px rgba(0,255,65,0.3)" }}>{sectionName}</span>
          <span className="text-sm font-mono text-emerald-400/40">{current + 1} / {total}</span>
        </div>

        {/* Progress bar */}
        <div className="absolute top-0 left-0 h-[3px] z-50 transition-all duration-500 ease-out"
          style={{
            width: `${((current + 1) / total) * 100}%`,
            background: "linear-gradient(90deg, #00ff41, #0ea5e9, #00ff41)",
            boxShadow: "0 0 12px rgba(0,255,65,0.6), 0 0 30px rgba(0,255,65,0.3), 0 0 60px rgba(14,165,233,0.15)"
          }} />
        {/* Progress bar glow dot at tip */}
        <motion.div className="absolute top-0 h-[6px] w-[6px] rounded-full z-50"
          animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1 }}
          style={{
            left: `${((current + 1) / total) * 100}%`,
            background: "#00ff41",
            boxShadow: "0 0 8px #00ff41, 0 0 20px #00ff41",
            transform: "translate(-50%, -25%)",
            transition: "left 0.5s ease-out"
          }} />

        {/* Slide content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id + current}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40, filter: "blur(8px) brightness(2)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px) brightness(1)" }}
            exit={{ opacity: 0, x: direction * -30, filter: "blur(4px) brightness(0.5)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full pt-14 pb-20"
          >
            {slideContent}
          </motion.div>
        </AnimatePresence>

        {/* Click navigation */}
        <button onClick={goPrev} className="absolute left-0 top-0 bottom-0 w-1/6 z-40 cursor-pointer bg-transparent border-none opacity-0 hover:opacity-100 transition-opacity" disabled={current === 0}>
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 text-4xl">‹</span>
        </button>
        <button onClick={goNext} className="absolute right-0 top-0 bottom-0 w-1/6 z-40 cursor-pointer bg-transparent border-none opacity-0 hover:opacity-100 transition-opacity" disabled={current === total - 1}>
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 text-4xl">›</span>
        </button>

        {/* Bottom navigation bar */}
        <div className="absolute bottom-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-t border-emerald-500/10">
          <div className="flex items-center justify-between px-6 py-2.5">
            <span className="text-xs font-mono text-emerald-400/60 uppercase tracking-wider min-w-[160px] neon-green" style={{ textShadow: "0 0 6px rgba(0,255,65,0.3)" }}>{sectionName}</span>
            <div className="flex items-center gap-4">
              <button onClick={goPrev} disabled={current === 0} className="text-gray-500 hover:text-white text-xl border-none bg-transparent cursor-pointer disabled:opacity-20 transition-colors">‹</button>
              <div className="flex gap-1.5">
                {SECTIONS.map((sec, i) => (
                  <button key={i} onClick={() => { setDirection(sec.start > current ? 1 : -1); setCurrent(sec.start); }}
                    className={`h-2 rounded-full border-none cursor-pointer transition-all duration-300 ${i === currentSectionIdx ? "bg-emerald-400 w-6" : "bg-white/15 w-2 hover:bg-white/40"}`}
                    style={i === currentSectionIdx ? { boxShadow: "0 0 8px rgba(0,255,65,0.6), 0 0 20px rgba(0,255,65,0.3)" } : undefined}
                  />
                ))}
              </div>
              <button onClick={goNext} disabled={current === total - 1} className="text-gray-500 hover:text-white text-xl border-none bg-transparent cursor-pointer disabled:opacity-20 transition-colors">›</button>
            </div>
            <span className="text-xs font-mono text-gray-500 min-w-[160px] text-right">{current + 1} / {total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
