"use client";

import { useEffect, useMemo, useState } from "react";

type Phase = "loading" | "stealing" | "reveal";

type Fingerprint = {
  device: string;
  os: string;
  browser: string;
  resolution: string;
  lang: string;
  tz: string;
};

function detectFingerprint(): Fingerprint {
  if (typeof window === "undefined") {
    return { device: "—", os: "—", browser: "—", resolution: "—", lang: "—", tz: "—" };
  }
  const ua = navigator.userAgent;
  let device = "Cihaz";
  if (/iPhone/.test(ua)) device = "iPhone";
  else if (/iPad/.test(ua)) device = "iPad";
  else if (/Android/.test(ua)) device = "Android Telefon";
  else if (/Macintosh/.test(ua)) device = "Mac";
  else if (/Windows/.test(ua)) device = "Windows PC";
  else if (/Linux/.test(ua)) device = "Linux";

  let os = "Bilinmiyor";
  const osMatch = ua.match(/(?:iPhone OS|CPU OS|Android|Mac OS X|Windows NT) ([\d_.]+)/);
  if (osMatch) os = osMatch[0].replace(/_/g, ".");

  let browser = "Bilinmiyor";
  if (/Edg\//.test(ua)) browser = "Edge";
  else if (/Chrome\//.test(ua)) browser = "Chrome";
  else if (/Firefox\//.test(ua)) browser = "Firefox";
  else if (/Safari\//.test(ua)) browser = "Safari";

  return {
    device,
    os,
    browser,
    resolution: `${window.screen.width}×${window.screen.height}`,
    lang: navigator.language,
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

export function QrTrapClient() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [loadProgress, setLoadProgress] = useState(0);
  const [revealedLines, setRevealedLines] = useState(0);
  const [stealPct, setStealPct] = useState(0);
  const [fp, setFp] = useState<Fingerprint | null>(null);

  useEffect(() => {
    fetch("/api/mcbukaf/qr-tuzak", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ session: "default" }),
      keepalive: true,
    }).catch(() => {});

    setFp(detectFingerprint());
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;
    let raf = 0;
    const start = performance.now();
    const duration = 1300;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setLoadProgress(p * 100);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setPhase("stealing");
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const stealLines = useMemo(() => {
    if (!fp) return [];
    return [
      { tag: "OK", text: `Cihaz tespit edildi: ${fp.device}` },
      { tag: "OK", text: `İşletim sistemi: ${fp.os}` },
      { tag: "OK", text: `Tarayıcı: ${fp.browser} · ${fp.resolution}` },
      { tag: "OK", text: `Dil: ${fp.lang} · Saat dilimi: ${fp.tz}` },
      { tag: "..", text: "Yaklaşık konum çözümleniyor…" },
      { tag: "OK", text: "Konum: Manisa, Türkiye (≈ 80 m)" },
      { tag: "..", text: "Kişi listesi taranıyor… 247 kayıt bulundu" },
      { tag: "..", text: "WhatsApp oturum tokenı çekiliyor…" },
      { tag: "..", text: "Banka uygulaması algılandı: 3 hesap" },
      { tag: "..", text: "Kamera ve mikrofon erişimi etkinleştiriliyor…" },
      { tag: "!!", text: "PAROLALAR YEDEKLENİYOR…" },
    ];
  }, [fp]);

  useEffect(() => {
    if (phase !== "stealing") return;
    setRevealedLines(0);
    setStealPct(0);

    let cancelled = false;
    let i = 0;
    const advance = () => {
      if (cancelled) return;
      i += 1;
      setRevealedLines(i);
      setStealPct(Math.min(100, (i / stealLines.length) * 100));
      if (i < stealLines.length) {
        window.setTimeout(advance, 480);
      } else {
        window.setTimeout(() => { if (!cancelled) setPhase("reveal"); }, 1400);
      }
    };
    const startTimer = window.setTimeout(advance, 250);
    return () => { cancelled = true; window.clearTimeout(startTimer); };
  }, [phase, stealLines.length]);

  if (phase === "loading") {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-zinc-50 px-6">
        <div className="w-full max-w-md text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500 mb-5 shadow-lg shadow-emerald-500/30">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 mb-1.5">Etkinlik Anketi</h1>
          <p className="text-zinc-500 text-sm mb-8">MCBÜKAF &apos;26 — sunum hakkında 30 sn</p>
          <div className="w-full h-2 bg-zinc-200 rounded-full overflow-hidden mb-3">
            <div className="h-full bg-emerald-500 transition-[width] duration-100 ease-linear"
              style={{ width: `${loadProgress}%` }} />
          </div>
          <p className="text-zinc-400 text-xs font-mono tracking-wider">ANKET YÜKLENİYOR…</p>
        </div>
      </div>
    );
  }

  if (phase === "stealing") {
    return (
      <div className="min-h-[100dvh] bg-black text-white px-4 py-6 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(45deg, rgba(244,63,94,0.06) 0, rgba(244,63,94,0.06) 12px, transparent 12px, transparent 24px)",
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
        <div className="relative max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="inline-flex w-3 h-3 rounded-full bg-rose-500"
              style={{ animation: "pulse 0.8s ease-in-out infinite", boxShadow: "0 0 12px #f43f5e" }}
            />
            <span className="font-mono text-rose-400 text-xs uppercase tracking-[0.35em]">
              cihaz_erişimi
            </span>
          </div>

          <h1
            className="text-3xl font-black mb-2 leading-tight"
            style={{ color: "#f43f5e", textShadow: "0 0 24px rgba(244,63,94,0.65)" }}
          >
            VERİLERİNİZ
            <br />
            ALINIYOR
          </h1>
          <p className="text-rose-300/80 text-xs font-mono mb-5 tracking-wider">
            ssl-tunneled · /exfil/qr-2026
          </p>

          <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden mb-5 border border-rose-500/30">
            <div
              className="h-full transition-[width] duration-200 ease-out"
              style={{
                width: `${stealPct}%`,
                background: "linear-gradient(90deg, #f43f5e, #f97316)",
                boxShadow: "0 0 12px rgba(244,63,94,0.6)",
              }}
            />
          </div>

          <div className="bg-zinc-950/80 border border-rose-500/25 rounded-xl p-3 font-mono text-[12px] leading-relaxed min-h-[18rem]">
            {stealLines.slice(0, revealedLines).map((line, i) => {
              const tagColor =
                line.tag === "OK"
                  ? "text-emerald-400"
                  : line.tag === "!!"
                  ? "text-rose-400 font-bold"
                  : "text-amber-400";
              return (
                <div
                  key={i}
                  className="flex items-start gap-2 mb-1.5"
                  style={{ animation: "fadeIn 0.2s ease-out" }}
                >
                  <span className={`shrink-0 ${tagColor}`}>[{line.tag}]</span>
                  <span className={line.tag === "!!" ? "text-rose-300" : "text-zinc-200"}>
                    {line.text}
                  </span>
                </div>
              );
            })}
            {revealedLines < stealLines.length && (
              <div className="text-zinc-500 mt-1">
                <span
                  className="inline-block w-2 h-3 bg-rose-400 ml-1"
                  style={{ animation: "pulse 0.7s steps(2) infinite" }}
                />
              </div>
            )}
          </div>
        </div>
        <style jsx global>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateX(-4px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-black text-white px-5 py-10 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-rose-500/30 blur-2xl animate-pulse" />
          <div
            className="relative w-20 h-20 rounded-full bg-rose-500 inline-flex items-center justify-center"
            style={{ boxShadow: "0 0 60px rgba(244,63,94,0.7)" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.6" className="w-12 h-12">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.732 0 2.814-1.875 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
        </div>

        <p className="text-emerald-400 font-mono tracking-[0.35em] text-xs mb-3 uppercase">
          rahat ol — demo
        </p>
        <h1
          className="text-4xl font-black mb-3 leading-tight"
          style={{ color: "#f43f5e", textShadow: "0 0 30px rgba(244,63,94,0.5)" }}
        >
          Hiçbir şey çalmadık.
        </h1>
        <p className="text-zinc-300 text-lg mb-2 leading-snug">
          Ama gerçek bir saldırgan QR&apos;ı taradığın an bunların <strong>çoğunu</strong> yapabilirdi.
        </p>
        <p className="text-zinc-400 text-sm mb-8 leading-snug">
          Cihazın, tarayıcın, konumun ve dilin gerçekten okundu — yalnızca seninle paylaşmadık.
        </p>

        <div className="w-full bg-zinc-900/80 border border-rose-500/30 rounded-2xl p-5 text-left space-y-4 mb-6">
          <Lesson title="QR = link">
            Tarayınca açılan adresi <strong>okuyun</strong>. Bilmediğiniz alan adı = durun.
          </Lesson>
          <Lesson title="Acelesi yok">
            &quot;Hediye&quot;, &quot;çekiliş&quot;, &quot;anket&quot; — saldırgan baskı kurar. 3 saniye düşünün.
          </Lesson>
          <Lesson title="Şifre / kart bilgisi istiyorsa">
            Tarayıp gittiğiniz sayfa giriş, ödeme veya 3D Secure istiyorsa: <strong>kapatın</strong>.
          </Lesson>
        </div>

        <div className="border-t border-zinc-800 pt-5 w-full">
          <p className="text-zinc-500 text-xs">
            İyi haber: bu sahnedeki QR güvenliydi. Sonraki saldırgan bu kadar nazik olmayabilir.
          </p>
          <p className="text-emerald-400/80 text-xs font-mono mt-2">
            MCBÜKAF &apos;26 · /mcbukaf/qr-tuzak
          </p>
        </div>
      </div>
    </div>
  );
}

function Lesson({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-rose-500/60 pl-3.5">
      <p className="font-bold text-white text-sm mb-1">{title}</p>
      <p className="text-zinc-400 text-sm leading-snug">{children}</p>
    </div>
  );
}
