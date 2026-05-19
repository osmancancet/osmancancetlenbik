"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";

function useQrDataUrl(text: string, size = 640) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(text, {
      width: size,
      margin: 2,
      errorCorrectionLevel: "H",
      color: { dark: "#000000", light: "#ffffffff" },
    })
      .then((url) => {
        if (!cancelled) setDataUrl(url);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [text, size]);
  return dataUrl;
}

function formatClock(seconds: number) {
  const m = Math.max(0, Math.floor(seconds / 60));
  const s = Math.max(0, seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function YoklamaClient() {
  const [origin, setOrigin] = useState("https://www.osmancancetlenbik.com");
  useEffect(() => {
    if (typeof window !== "undefined") setOrigin(window.location.origin);
  }, []);

  const trapUrl = `${origin}/yoklama-tuzak/exfil`;
  const qrDataUrl = useQrDataUrl(trapUrl, 720);

  const [secondsLeft, setSecondsLeft] = useState(12 * 60 + 6);
  const [paused, setPaused] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [isFs, setIsFs] = useState(false);
  const [tab, setTab] = useState<"katilimci" | "cihaz" | "konum">("katilimci");
  const fsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => window.clearInterval(t);
  }, [paused]);

  useEffect(() => {
    function onFs() {
      setIsFs(Boolean(document.fullscreenElement));
    }
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const toggleFs = useCallback(() => {
    const el = fsRef.current ?? document.documentElement;
    if (!document.fullscreenElement) el.requestFullscreen?.();
    else document.exitFullscreen?.();
  }, []);

  const benzersizKod = useMemo(() => "YK-7K3M4N", []);
  const maskedKod = showCode ? benzersizKod : "•".repeat(benzersizKod.length);

  const copyCode = useCallback(() => {
    navigator.clipboard?.writeText(benzersizKod).catch(() => {});
  }, [benzersizKod]);

  if (isFs) {
    return (
      <div
        ref={fsRef}
        className="fixed inset-0 bg-black flex items-center justify-center"
        onDoubleClick={toggleFs}
      >
        <div className="relative bg-[#0d0d10] border border-zinc-800 rounded-3xl p-10 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)]">
          <button
            onClick={toggleFs}
            aria-label="Tam ekrandan çık"
            className="absolute top-4 right-4 p-2 text-zinc-600 hover:text-white transition opacity-30 hover:opacity-100"
          >
            <MinimizeIcon />
          </button>
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="Yoklama QR"
              className="w-[min(80vh,80vw)] h-[min(80vh,80vw)] rounded-xl"
            />
          ) : (
            <div className="w-[min(80vh,80vw)] h-[min(80vh,80vw)] rounded-xl bg-zinc-900 flex items-center justify-center">
              <span className="text-zinc-700 text-sm font-mono">yükleniyor…</span>
            </div>
          )}
          <div className="mt-6 flex items-center justify-between text-zinc-500 text-sm font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Canlı yoklama · BVA 1108-1</span>
            </div>
            <div className="text-zinc-400">
              <span className="text-emerald-400 text-xl font-bold">
                {formatClock(secondsLeft)}
              </span>
              <span className="ml-2 text-xs">kalan süre</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 right-8 text-[10px] font-mono text-zinc-700">
          Tam ekrandan çıkmak için Esc · F · sağ üst köşe
        </div>
      </div>
    );
  }

  return (
    <div ref={fsRef} className="min-h-[100dvh] bg-[#0a0a0c] text-zinc-100">
      {/* TOP BAR */}
      <header className="border-b border-zinc-900 bg-[#08080a]">
        <div className="px-6 py-3 flex items-center gap-4">
          <button className="text-zinc-500 hover:text-zinc-300 text-xs flex items-center gap-1.5">
            <ChevronLeft /> Anasayfaya Dön
          </button>
          <div className="flex-1 flex items-center gap-2">
            <button className="p-1 text-zinc-600 hover:text-zinc-300">
              <ChevronLeft />
            </button>
            <h1 className="text-lg font-bold tracking-tight">
              Bilgi Teknolojileri
            </h1>
            <button className="p-1 text-zinc-600 hover:text-zinc-300">
              <ChevronRight />
            </button>
          </div>
        </div>
        <div className="px-6 pb-3 flex items-center gap-3 text-xs">
          <span className="text-zinc-500 font-mono uppercase tracking-wider">
            BVA 1108-1
          </span>
          <span className="text-zinc-700">|</span>
          <span className="text-zinc-400">Çarşamba 09:55 - 10:40</span>
          <span className="ml-2 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">
            3 Ders Saati
          </span>
        </div>
      </header>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-0">
        {/* CENTER COLUMN */}
        <div className="border-r border-zinc-900 p-6">
          {/* TIMER ROW */}
          <div className="flex items-center justify-center gap-4 mb-5">
            <button
              onClick={() => setSecondsLeft((s) => Math.max(0, s - 60))}
              className="px-4 py-1.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30 text-sm font-semibold hover:bg-rose-500/25 transition flex items-center gap-1.5"
            >
              <MinusIcon /> 1 dk
            </button>
            <div className="text-5xl font-black font-mono tabular-nums text-white tracking-tight px-4">
              {formatClock(secondsLeft)}
            </div>
            <button
              onClick={() => setSecondsLeft((s) => s + 60)}
              className="px-4 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-sm font-semibold hover:bg-emerald-500/25 transition flex items-center gap-1.5"
            >
              <PlusIcon /> 1 dk
            </button>
          </div>

          {/* ACTION ROW */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPaused((p) => !p)}
                className="px-4 py-2 rounded-md bg-amber-500/90 hover:bg-amber-500 text-zinc-900 text-sm font-semibold transition flex items-center gap-2"
              >
                <PauseIcon /> {paused ? "Devam" : "Duraklat"}
              </button>
              <button className="px-4 py-2 rounded-md bg-rose-500/90 hover:bg-rose-500 text-white text-sm font-semibold transition flex items-center gap-2">
                <StopIcon /> Yoklamayı Bitir
              </button>
            </div>

            {/* BENZERSIZ KOD */}
            <div className="bg-[#0d0d10] border border-zinc-800 rounded-lg px-3 py-2 flex items-center gap-3">
              <div>
                <div className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">
                  Benzersiz Kod
                </div>
                <div className="text-sm font-mono text-zinc-100 tracking-wider">
                  {maskedKod}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <IconBtn onClick={() => setShowCode((v) => !v)} label="Göster/Gizle">
                  {showCode ? <EyeOffIcon /> : <EyeIcon />}
                </IconBtn>
                <IconBtn onClick={toggleFs} label="Tam ekran">
                  <MaximizeIcon />
                </IconBtn>
                <IconBtn onClick={copyCode} label="Kopyala">
                  <CopyIcon />
                </IconBtn>
                <IconBtn onClick={() => {}} label="Yenile">
                  <RefreshIcon />
                </IconBtn>
              </div>
            </div>
          </div>

          {/* QR CARD */}
          <div className="bg-[#0d0d10] border border-zinc-800 rounded-2xl p-6 relative max-w-2xl mx-auto">
            <button
              onClick={toggleFs}
              aria-label="Tam ekran"
              className="absolute top-3 right-3 p-2 text-zinc-600 hover:text-zinc-200 transition rounded-md hover:bg-white/5"
            >
              <MaximizeIcon />
            </button>
            <div className="aspect-square bg-white rounded-xl overflow-hidden flex items-center justify-center">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="Yoklama QR"
                  className="w-full h-full"
                />
              ) : (
                <span className="text-zinc-400 text-sm font-mono">QR yükleniyor…</span>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="bg-[#08080a] p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <UsersIcon className="w-4 h-4 text-zinc-500" />
              <span className="text-sm font-semibold text-zinc-200">
                Katılımcılar
              </span>
              <span className="text-xs text-zinc-500 font-mono">0</span>
            </div>
            <button className="text-[11px] font-mono uppercase tracking-wider text-sky-400 hover:text-sky-300 flex items-center gap-1 px-2 py-1 rounded border border-sky-500/30 hover:border-sky-500/60 transition">
              + Manuel Katılımcı Ekle
            </button>
          </div>

          <div className="flex gap-1 mb-5 border-b border-zinc-800">
            {[
              { id: "katilimci" as const, label: "Katılımcılar" },
              { id: "cihaz" as const, label: "Cihaz Analizi" },
              { id: "konum" as const, label: "Konum Analizi" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-3 py-2 text-xs transition border-b-2 -mb-px ${
                  tab === t.id
                    ? "text-white border-sky-400"
                    : "text-zinc-500 border-transparent hover:text-zinc-300"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center text-center py-20">
            <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
              <UsersIcon className="w-6 h-6 text-zinc-600" />
            </div>
            <div className="text-sm font-semibold text-zinc-300 mb-1">
              İmza Bekleniyor
            </div>
            <div className="text-xs text-zinc-500 max-w-[200px] leading-relaxed">
              Öğrenciler QR kodunu okuttuğunda imzalar burada listelenecek
            </div>
            <div className="mt-4 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-zinc-700 animate-pulse" />
              <span className="w-1 h-1 rounded-full bg-zinc-700 animate-pulse [animation-delay:200ms]" />
              <span className="w-1 h-1 rounded-full bg-zinc-700 animate-pulse [animation-delay:400ms]" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function IconBtn({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="p-1.5 rounded text-zinc-500 hover:text-zinc-200 hover:bg-white/5 transition"
    >
      {children}
    </button>
  );
}

/* ─────────── inline SVG icons (keep bundle small) ─────────── */

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function MinusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="w-3.5 h-3.5">
      <path d="M5 12h14" strokeLinecap="round" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="w-3.5 h-3.5">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}
function StopIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <rect x="5" y="5" width="14" height="14" rx="2" />
    </svg>
  );
}
function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-11-8-11-8a19.79 19.79 0 015.06-5.94M9.9 4.24A10.94 10.94 0 0112 4c7 0 11 8 11 8a19.79 19.79 0 01-4.06 5.06M1 1l22 22" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function MaximizeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="M3 9V3h6M21 9V3h-6M3 15v6h6M21 15v6h-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function MinimizeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M9 3v6H3M15 3v6h6M9 21v-6H3M15 21v-6h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}
function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="M23 4v6h-6M1 20v-6h6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function UsersIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
