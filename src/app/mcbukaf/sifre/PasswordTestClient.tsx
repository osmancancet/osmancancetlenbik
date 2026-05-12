"use client";

import { useMemo, useState } from "react";
import {
  passwordEntropy,
  crackTime,
  crackSeconds,
  strengthLabel,
  isLeaked,
} from "@/lib/passwordStrength";

type SendState = "idle" | "sending" | "sent" | "error";

export function PasswordTestClient() {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [sendState, setSendState] = useState<SendState>("idle");

  const bits = useMemo(() => passwordEntropy(pw), [pw]);
  const strength = useMemo(() => strengthLabel(bits), [bits]);
  const time = useMemo(() => crackTime(bits), [bits]);
  const leaked = useMemo(() => isLeaked(pw), [pw]);
  const meterPct = Math.min(100, (bits / 100) * 100);

  async function submitToScreen() {
    if (!pw || sendState === "sending") return;
    setSendState("sending");
    try {
      const r = await fetch("/api/mcbukaf/sifre-canli", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          session: "default",
          length: pw.length,
          entropy: Number(bits.toFixed(2)),
          crackSec: Math.min(1e29, crackSeconds(bits)),
          strength: strength.label,
          leaked,
        }),
      });
      if (!r.ok) throw new Error("send failed");
      setSendState("sent");
      setTimeout(() => setSendState("idle"), 4000);
    } catch {
      setSendState("error");
      setTimeout(() => setSendState("idle"), 3000);
    }
  }

  return (
    <div
      className="min-h-dvh bg-black text-white font-sans flex flex-col"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
        paddingLeft: "max(1.25rem, env(safe-area-inset-left))",
        paddingRight: "max(1.25rem, env(safe-area-inset-right))",
      }}
    >
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(0,255,136,0.08), transparent 60%)",
        }}
      />

      <div className="relative z-10 w-full max-w-md mx-auto flex-1 flex flex-col">
        <div className="text-center mb-2 font-mono text-[11px] tracking-[0.4em] text-emerald-400/80">
          MCBÜKAF · ŞİFRE TESTİ
        </div>
        <h1 className="text-3xl font-bold text-center leading-snug mb-2">
          Şifreni yaz, gerçeği gör.
        </h1>
        <p className="text-center text-zinc-400 text-sm mb-7">
          Hesaplama tarayıcında yapılır. İstersen sonucu (yalnız uzunluk + güç) salondaki ekrana yansıtabilirsin.
        </p>

        <div className="relative">
          <input
            type={show ? "text" : "password"}
            autoComplete="off"
            spellCheck={false}
            inputMode="text"
            autoCorrect="off"
            autoCapitalize="off"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="örn. ankara06"
            className="w-full font-mono bg-zinc-950 border-2 border-zinc-800 focus:border-emerald-400 outline-none rounded-2xl px-5 py-5 text-2xl text-white placeholder-zinc-700 transition-colors"
            style={{
              boxShadow: pw
                ? `0 0 25px ${strength.color}33, inset 0 0 18px ${strength.color}10`
                : undefined,
            }}
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg border border-zinc-800 text-zinc-400 text-xs font-mono active:bg-zinc-900"
            aria-label={show ? "Gizle" : "Göster"}
          >
            {show ? "GİZLE" : "GÖSTER"}
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-zinc-800 bg-black/40 p-4">
            <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 mb-1">
              ENTROPİ
            </div>
            <div
              className="font-mono text-2xl font-bold tabular-nums"
              style={{ color: strength.color }}
            >
              {bits.toFixed(1)}{" "}
              <span className="text-xs text-zinc-500">bit</span>
            </div>
            <div className="mt-2 h-1.5 bg-zinc-900 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${meterPct}%`, background: strength.color }}
              />
            </div>
          </div>
          <div
            className="rounded-xl border-2 p-4"
            style={{
              borderColor: strength.color,
              background: `${strength.color}11`,
            }}
          >
            <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 mb-1">
              SEVİYE
            </div>
            <div
              className="font-mono text-xl font-black"
              style={{ color: strength.color }}
            >
              {strength.label}
            </div>
          </div>
        </div>

        <div className="mt-3 rounded-xl border border-zinc-800 bg-black/40 p-4">
          <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 mb-1">
            KIRMA SÜRESİ (offline GPU · 10¹¹/sn)
          </div>
          <div
            className="font-mono text-xl font-bold leading-tight"
            style={{ color: strength.color }}
          >
            {pw ? time : "—"}
          </div>
        </div>

        {pw && leaked && (
          <div className="mt-4 rounded-xl border-2 border-rose-400 bg-rose-500/15 p-4">
            <div className="font-mono text-[10px] tracking-[0.3em] text-rose-300 mb-1">
              PWNED · LEAK DB
            </div>
            <div className="text-rose-100 text-lg font-bold leading-snug">
              Bu şifre milyonlarca sızıntıda var.
            </div>
            <p className="text-rose-200/80 text-sm mt-1">
              Saldırgan deneme yapmadan listesinde buldu.
            </p>
          </div>
        )}

        {pw && !leaked && bits >= 80 && (
          <div className="mt-4 rounded-xl border-2 border-emerald-400 bg-emerald-400/10 p-4">
            <div className="font-mono text-[10px] tracking-[0.3em] text-emerald-300 mb-1">
              SAĞLAM
            </div>
            <div className="text-emerald-100 text-lg font-bold leading-snug">
              Bu şifreyi kıracak makineyi beklemekten yorulurlar.
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={submitToScreen}
          disabled={!pw || sendState === "sending" || sendState === "sent"}
          className="mt-6 w-full rounded-2xl px-5 py-4 font-mono text-base font-bold tracking-wider transition-all disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            background: sendState === "sent"
              ? "rgba(0, 255, 136, 0.18)"
              : sendState === "error"
                ? "rgba(244, 63, 94, 0.18)"
                : "linear-gradient(135deg, #00ff88 0%, #22d3ee 100%)",
            color: sendState === "sent" ? "#00ff88" : sendState === "error" ? "#fda4af" : "#02050a",
            border: sendState === "sent" ? "2px solid #00ff88" : sendState === "error" ? "2px solid #f43f5e" : "none",
            boxShadow: pw && sendState === "idle" ? "0 0 28px rgba(0,255,136,0.35)" : undefined,
          }}
        >
          {sendState === "sending" && "GÖNDERİLİYOR…"}
          {sendState === "sent" && "✓ EKRANA YANSITILDI"}
          {sendState === "error" && "HATA — TEKRAR DENE"}
          {sendState === "idle" && "SONUCU EKRANA YANSIT"}
        </button>

        <p className="mt-3 text-center text-[11px] tracking-wider font-mono text-zinc-600 leading-relaxed px-2">
          Yansıtılan veri: uzunluk, entropi, güç etiketi, sızıntı durumu.<br />
          Şifrenin <span className="text-zinc-500">kendisi</span> gönderilmez.
        </p>

        <p className="mt-6 text-center text-[11px] tracking-widest font-mono text-zinc-600">
          OSMANCANCETLENBIK.COM
        </p>
      </div>
    </div>
  );
}
