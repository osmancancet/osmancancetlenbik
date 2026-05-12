"use client";

import { useEffect, useState } from "react";

export function FakeBankClient() {
  const [tc, setTc] = useState("");
  const [pw, setPw] = useState("");
  const [phase, setPhase] = useState<"login" | "reveal">("login");
  const [keystrokes, setKeystrokes] = useState<string[]>([]);

  // log each keystroke (length only, never actual chars saved) to make the reveal visceral
  useEffect(() => {
    if (phase !== "login") return;
    if (tc.length === 0 && pw.length === 0) return;
    setKeystrokes((prev) => [
      ...prev,
      `tc:${tc.length} pw:${pw.length} t:${Date.now() % 100000}`,
    ]);
  }, [tc, pw, phase]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPhase("reveal");
  };

  if (phase === "reveal") {
    return <RevealView tcLen={tc.length} pwLen={pw.length} />;
  }

  return (
    <div
      className="min-h-dvh bg-gradient-to-b from-[#0a2a4a] to-[#0e3a66] text-white font-sans flex flex-col"
      style={{
        paddingTop: "max(1.5rem, env(safe-area-inset-top))",
        paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* fake bank header */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded bg-yellow-400 text-[#0a2a4a] flex items-center justify-center font-black">
            B
          </div>
          <div>
            <div className="font-bold text-lg leading-tight">Bankam</div>
            <div className="text-[10px] text-white/60 tracking-widest">
              MOBİL ŞUBE
            </div>
          </div>
        </div>
        <div className="text-[10px] text-white/50">🔒 SSL</div>
      </div>

      <form
        onSubmit={onSubmit}
        className="flex-1 px-5 py-8 flex flex-col gap-5"
      >
        <h1 className="text-xl font-bold">Hesabınızı doğrulayın</h1>
        <p className="text-white/80 text-sm">
          Şüpheli işlem tespit edildi. Hesabınız geçici olarak kilitlenmiştir.
          Doğrulama için TC kimlik ve internet bankacılık şifrenizi girin.
        </p>

        <label className="block">
          <div className="text-xs text-white/70 mb-1.5">TC Kimlik No</div>
          <input
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={11}
            value={tc}
            onChange={(e) => setTc(e.target.value.replace(/\D/g, ""))}
            placeholder="11 haneli kimlik"
            className="w-full rounded-lg bg-white text-zinc-900 px-4 py-3 text-base outline-none placeholder-zinc-400 font-mono tabular-nums"
            autoComplete="off"
          />
        </label>

        <label className="block">
          <div className="text-xs text-white/70 mb-1.5">
            İnternet Bankacılığı Şifresi
          </div>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Şifre"
            className="w-full rounded-lg bg-white text-zinc-900 px-4 py-3 text-base outline-none placeholder-zinc-400 font-mono"
            autoComplete="off"
          />
        </label>

        <button
          type="submit"
          disabled={tc.length < 4 || pw.length < 3}
          className="mt-2 w-full bg-yellow-400 text-[#0a2a4a] font-bold py-4 rounded-xl text-lg shadow-lg disabled:opacity-50 active:scale-[0.98]"
        >
          Hesabımı Doğrula
        </button>

        {keystrokes.length > 0 && (
          <div className="mt-3 text-[10px] text-white/40 font-mono tracking-wider">
            {keystrokes.length} tuş kayıtlandı…
          </div>
        )}

        <div className="mt-auto text-center text-[10px] text-white/40 tracking-widest">
          bankam-guvenli-giris.co
        </div>
      </form>
    </div>
  );
}

function RevealView({ tcLen, pwLen }: { tcLen: number; pwLen: number }) {
  return (
    <div
      className="min-h-dvh bg-black text-white flex flex-col font-sans"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      <div className="px-5 py-4 border-b border-rose-500/40 bg-rose-500/15">
        <div className="font-mono text-[10px] tracking-[0.4em] text-rose-300 mb-1">
          MCBÜKAF · İNTERAKTİF GÜVENLİK
        </div>
        <div className="text-3xl font-bold text-rose-200 leading-tight">
          {pwLen > 0 ? "Şifreni gönderdin." : "Az kalsın gönderiyordun."}
        </div>
      </div>

      <div className="flex-1 px-5 py-6">
        {pwLen > 0 ? (
          <>
            <p className="text-zinc-200 text-lg mb-5">
              Şu an gerçek bir saldırı sahnesinde olsaydık,{" "}
              <strong className="text-rose-300">{tcLen} haneli TC</strong> ve{" "}
              <strong className="text-rose-300">{pwLen} karakter şifren</strong>{" "}
              attacker'ın eline geçmiş olurdu.
            </p>
            <p className="text-zinc-300 mb-5">
              <em>Hiçbir veriyi kaydetmedik.</em> Ama sahne kurmak için input
              karakter sayısı yeterli — bu örnekte sadece kaç tuş bastığını
              biliyoruz. Gerçek saldırgan her karakteri biliyor olurdu.
            </p>
          </>
        ) : (
          <p className="text-zinc-200 text-lg mb-5">
            "Hesabımı Doğrula" demeden önce durdun. <strong>İyi yaptın.</strong>
          </p>
        )}

        <div className="font-mono text-[10px] tracking-[0.4em] text-rose-400 mt-8 mb-3">
          NEDEN BU SAHTE BİR SAYFAYDI
        </div>
        <ul className="space-y-3 text-zinc-100">
          <li className="rounded-xl border border-rose-400/30 bg-rose-500/5 p-4">
            <div className="font-mono text-[10px] tracking-[0.3em] text-rose-300 mb-1">
              DOMAIN
            </div>
            <div className="font-mono text-rose-100 break-all">
              bankam-guvenli-giris.co
            </div>
            <p className="text-sm text-zinc-300 mt-1">
              Hiçbir banka tire ve .co kullanmaz. Gerçek bankaların domain'i
              kendi adıyla başlar ve .com.tr ile biter.
            </p>
          </li>
          <li className="rounded-xl border border-rose-400/30 bg-rose-500/5 p-4">
            <div className="font-mono text-[10px] tracking-[0.3em] text-rose-300 mb-1">
              SOL ANAHTAR / 'SSL'
            </div>
            <p className="text-sm text-zinc-300">
              Yeşil kilit ikonu güvenlik değildir; sadece bağlantının şifreli
              olduğunu söyler. Saldırganın sayfası da SSL alabilir.
            </p>
          </li>
          <li className="rounded-xl border border-rose-400/30 bg-rose-500/5 p-4">
            <div className="font-mono text-[10px] tracking-[0.3em] text-rose-300 mb-1">
              ŞİFRE TALEBİ
            </div>
            <p className="text-sm text-zinc-300">
              Hiçbir banka linkten veya QR'dan şifrenin tamamını istemez.
              SMS/email içinde "şifrenizi doğrulayın" — tuzak.
            </p>
          </li>
        </ul>

        <div className="mt-8 rounded-2xl border-2 border-emerald-400 bg-emerald-400/10 p-5">
          <div className="font-mono text-[10px] tracking-[0.4em] text-emerald-300 mb-2">
            BU GECE
          </div>
          <ul className="text-emerald-100 text-base space-y-2">
            <li>✓ Banka uygulamasına SADECE app store'dan kurulu uygulamayla gir.</li>
            <li>✓ E-posta/SMS'teki banka linkine asla tıklama.</li>
            <li>✓ Şüphede: 444-* numarayı sen ara, "doğrula" deme.</li>
          </ul>
        </div>

        <p className="mt-8 text-center font-mono text-[10px] tracking-widest text-zinc-600">
          OSMANCANCETLENBIK.COM · MCBÜKAF 2026
        </p>
      </div>
    </div>
  );
}
