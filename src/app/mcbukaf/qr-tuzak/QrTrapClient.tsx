"use client";

import { useEffect, useState } from "react";

type Phase = "loading" | "reveal";

export function QrTrapClient() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetch("/api/mcbukaf/qr-tuzak", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ session: "default" }),
      keepalive: true,
    }).catch(() => {});
  }, []);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1800;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setProgress(p * 100);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setPhase("reveal");
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

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
              style={{ width: `${progress}%` }} />
          </div>
          <p className="text-zinc-400 text-xs font-mono tracking-wider">ANKET YÜKLENİYOR…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-black text-white px-5 py-10 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-rose-500/30 blur-2xl animate-pulse" />
          <div className="relative w-20 h-20 rounded-full bg-rose-500 inline-flex items-center justify-center"
            style={{ boxShadow: "0 0 60px rgba(244,63,94,0.7)" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.6" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.732 0 2.814-1.875 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
        </div>

        <p className="text-rose-400 font-mono tracking-[0.35em] text-xs mb-3 uppercase">tuzaktasın</p>
        <h1 className="text-4xl font-black mb-3 leading-tight"
          style={{ color: "#f43f5e", textShadow: "0 0 30px rgba(244,63,94,0.5)" }}>
          QR Phishing
        </h1>
        <p className="text-zinc-300 text-lg mb-8 leading-snug">
          Bu sayfa <strong>anket değildi</strong>. Saldırgan bir QR'a güvenip taradın.
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
          <p className="text-emerald-400/80 text-xs font-mono mt-2">MCBÜKAF &apos;26 · /mcbukaf/qr-tuzak</p>
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
