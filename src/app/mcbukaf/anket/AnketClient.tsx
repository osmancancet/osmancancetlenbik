"use client";

import { useEffect, useState } from "react";

// ← Gerçek Google Forms / Typeform URL'sini buraya yaz; boş bırakırsan stub görünür.
const REAL_FORM_URL = "";

export function AnketClient() {
  const [hitSent, setHitSent] = useState(false);

  useEffect(() => {
    fetch("/api/mcbukaf/qr-tuzak", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ session: "anket" }),
      keepalive: true,
    })
      .catch(() => {})
      .finally(() => setHitSent(true));
  }, []);

  useEffect(() => {
    if (!hitSent || !REAL_FORM_URL) return;
    const t = window.setTimeout(() => {
      window.location.replace(REAL_FORM_URL);
    }, 600);
    return () => window.clearTimeout(t);
  }, [hitSent]);

  if (REAL_FORM_URL) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-zinc-950 px-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-400 mb-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.4" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-zinc-100 mb-1">Anket yönlendiriliyor…</h1>
          <p className="text-zinc-400 text-sm">Birkaç saniye içinde forma aktarılacaksınız.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-black text-white px-5 py-10 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full text-center">
        <div className="relative mb-5">
          <div className="absolute inset-0 rounded-full bg-amber-400/30 blur-2xl" />
          <div
            className="relative w-20 h-20 rounded-full bg-amber-400 inline-flex items-center justify-center"
            style={{ boxShadow: "0 0 50px rgba(251,191,36,0.5)" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.4" className="w-11 h-11">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
              />
            </svg>
          </div>
        </div>

        <p className="text-amber-300 font-mono tracking-[0.3em] text-xs mb-2 uppercase">çekiliş + değerlendirme</p>
        <h1
          className="text-3xl font-black mb-3 leading-tight"
          style={{ color: "#fbbf24", textShadow: "0 0 22px rgba(251,191,36,0.5)" }}
        >
          MCBÜKAF &apos;26 Anketi
        </h1>
        <p className="text-zinc-300 text-base mb-6 leading-snug">
          Anketimiz çok yakında burada olacak — katılımın için teşekkürler.
        </p>

        <div className="w-full bg-zinc-900/80 border border-amber-400/30 rounded-2xl p-5 text-left space-y-3 mb-5">
          <p className="text-sm text-zinc-300 leading-snug">
            <strong className="text-amber-300">Bağlantıda kalmak</strong> için kapanış slaytındaki LinkedIn, Instagram veya Web QR&apos;larını tara.
          </p>
          <p className="text-sm text-zinc-300 leading-snug">
            Yorum ve önerini doğrudan{" "}
            <a href="mailto:osmancancetlenbik@gmail.com" className="text-emerald-400 underline">
              e-posta
            </a>{" "}
            olarak da gönderebilirsin.
          </p>
        </div>

        <p className="text-zinc-500 text-xs">MCBÜKAF &apos;26 · /mcbukaf/anket</p>
      </div>
    </div>
  );
}
