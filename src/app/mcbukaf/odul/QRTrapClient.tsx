"use client";

import { useEffect, useState } from "react";
import { Gift, Lock, MessageSquare } from "lucide-react";

export function QRTrapClient() {
  const [phase, setPhase] = useState<"sms" | "bait" | "loading" | "reveal">(
    "sms",
  );
  const [progress, setProgress] = useState(0);
  const [glitch, setGlitch] = useState(false);

  // When user "claims" the prize, run a fake loader, then reveal w/ glitch
  const handleClaim = () => {
    setPhase("loading");
    const start = performance.now();
    const dur = 1800;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setProgress(p * 100);
      if (p < 1) raf = requestAnimationFrame(tick);
      else
        setTimeout(() => {
          setGlitch(true);
          setTimeout(() => {
            setPhase("reveal");
            setGlitch(false);
          }, 320);
        }, 220);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  };

  // SMS önizlemesinden bait'e otomatik geçiş (1.5s)
  useEffect(() => {
    if (phase !== "sms") return;
    const t = setTimeout(() => setPhase("bait"), 1500);
    return () => clearTimeout(t);
  }, [phase]);

  // Auto-trigger after 4s if user hesitates (still gets the reveal)
  useEffect(() => {
    if (phase !== "bait") return;
    const t = setTimeout(handleClaim, 4500);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "sms") return <SMSPreview />;
  if (phase === "reveal") return <RevealView />;

  return (
    <div
      className={`min-h-dvh bg-white text-zinc-900 flex flex-col font-sans ${
        glitch ? "qrt-glitch" : ""
      }`}
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Fake brand banner */}
      <div className="bg-blue-600 text-white py-3 px-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-white/20 flex items-center justify-center font-bold text-xs">
            TT
          </div>
          <span className="font-semibold tracking-wide text-sm">
            Türk Telekom · Kampanya
          </span>
        </div>
        <span className="text-[10px] bg-yellow-400 text-zinc-900 px-2 py-0.5 rounded font-bold">
          SON 4 SAAT
        </span>
      </div>

      {/* "SMS'den geldin" rozeti — seyirciye anlatım sinyali */}
      <div className="px-5 pt-2">
        <div className="inline-flex items-center gap-1.5 text-[10px] text-zinc-500 bg-zinc-100 border border-zinc-200 rounded-full px-2 py-1">
          <span>📱</span>
          <span>SMS bağlantısından geldin</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold mb-3 text-zinc-900">
          Tebrikler!
        </h1>
        <p className="text-zinc-700 text-lg mb-2 max-w-sm">
          MCBÜKAF katılımcılarına özel:
        </p>
        <div className="my-4 text-5xl font-black text-blue-700 leading-none">
          1.000 TL
        </div>
        <p className="text-zinc-700 text-lg mb-8 max-w-sm">
          bedava internet kazandınız. Sadece son bir adım kaldı.
        </p>

        <button
          onClick={handleClaim}
          disabled={phase !== "bait"}
          className="w-full max-w-xs bg-green-500 hover:bg-green-600 active:scale-[0.98] text-white font-bold py-4 rounded-xl text-lg shadow-lg disabled:opacity-70 transition-all"
        >
          {phase === "loading" ? "Doğrulanıyor…" : "Ödülü Al"}
        </button>

        {phase === "loading" && (
          <div className="mt-6 w-full max-w-xs">
            <div className="h-2 bg-zinc-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-[width] duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 text-xs text-zinc-500 tabular-nums">
              Hesabınız doğrulanıyor… {Math.round(progress)}%
            </div>
          </div>
        )}

        <div className="mt-10 flex items-center gap-3 text-xs text-zinc-500">
          <span>🔒</span>
          <span>Güvenli bağlantı · SSL</span>
        </div>
        <div className="mt-2 text-[10px] text-zinc-400">
          turktelekom-kampanya-mcbukaf.co
        </div>
      </div>
    </div>
  );
}

function RevealView() {
  const redFlags = [
    {
      tag: "DOMAIN",
      value: "turktelekom-kampanya-mcbukaf.co",
      bad: "Gerçek: turktelekom.com.tr. '.co' + tire + ek kelimeler — uydurma alan.",
    },
    {
      tag: "ACILİYET",
      value: "‘SON 4 SAAT’",
      bad: "Hızlı karar verdirmek için yapay kıtlık.",
    },
    {
      tag: "ÖDÜL",
      value: "1.000 TL bedava",
      bad: "Bedava yemde değil, oltadasın. Hiç kimse sebepsiz para vermez.",
    },
    {
      tag: "GÖRSEL TAKLİT",
      value: "TT logosu + kurumsal renk",
      bad: "Marka mavisi ve logo 1 dakikada Canva'da yapılır.",
    },
    {
      tag: "QR YETKİSİZ",
      value: "Bilmediğin bir sergi/afiş",
      bad: "QR kim koymuş? Üstüne yapıştırılmış olabilir.",
    },
  ];
  return (
    <div
      className="min-h-dvh bg-black text-white flex flex-col font-sans"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      <div className="px-5 py-4 border-b border-rose-500/40 bg-rose-500/10">
        <div className="font-mono text-[10px] tracking-[0.4em] text-rose-300 mb-1">
          MCBÜKAF · İNTERAKTİF GÜVENLİK
        </div>
        <div className="text-2xl font-bold text-rose-200">
          Bu bir tuzaktı. Kandın.
        </div>
      </div>

      <div className="flex-1 px-5 py-6">
        <p className="text-zinc-200 text-lg leading-relaxed mb-5">
          Eğer bu gerçek bir saldırı olsaydı, sayfanın bir sonraki adımı{" "}
          <strong className="text-rose-300">
            T.C. kimlik, telefon ve banka kartı bilgileri
          </strong>{" "}
          istemekti.
        </p>
        <p className="text-zinc-300 mb-5">
          Sahne arkasında <em>hiçbir veri</em> almadık — sadece bu sayfayı
          gösterdik. Ama saldırgan alırdı.
        </p>

        <div className="font-mono text-[10px] tracking-[0.4em] text-rose-400 mt-8 mb-3">
          5 KIRMIZI BAYRAK
        </div>
        <div className="space-y-3">
          {redFlags.map((f, i) => (
            <div
              key={f.tag}
              className="rounded-xl border border-rose-400/30 bg-rose-500/5 p-4"
            >
              <div className="flex items-baseline justify-between mb-1">
                <span className="font-mono text-[10px] tracking-[0.3em] text-rose-300">
                  {String(i + 1).padStart(2, "0")} · {f.tag}
                </span>
              </div>
              <div className="font-mono text-sm text-rose-100 mb-1 break-all">
                {f.value}
              </div>
              <p className="text-sm text-zinc-300">{f.bad}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border-2 border-emerald-400 bg-emerald-400/10 p-5">
          <div className="font-mono text-[10px] tracking-[0.4em] text-emerald-300 mb-2">
            BUNDAN SONRA
          </div>
          <ul className="text-emerald-100 text-base space-y-2">
            <li>✓ Bilmediğin QR'a tıklama.</li>
            <li>✓ Tıkladıysan adres çubuğunu kontrol et.</li>
            <li>✓ İndirme/izin istiyorsa hemen geri dön.</li>
            <li>✓ "Bedava" yazıyorsa neredeyse her zaman bedel vardır.</li>
          </ul>
        </div>

        <p className="mt-8 text-center font-mono text-[10px] tracking-widest text-zinc-600">
          OSMANCANCETLENBIK.COM · MCBÜKAF 2026
        </p>
      </div>
    </div>
  );
}

function SMSPreview() {
  return (
    <div
      className="min-h-dvh bg-black text-white flex flex-col items-center px-5 font-sans qrt-fade-in"
      style={{
        paddingTop: "max(3rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      <style>{`
        @keyframes qrtFadeIn {
          0% { opacity: 0; transform: translateY(-8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .qrt-fade-in { animation: qrtFadeIn .35s ease-out both; }
        @keyframes qrtGlitch {
          0%, 100% { transform: translate(0, 0); filter: hue-rotate(0deg); }
          20% { transform: translate(-3px, 1px); filter: hue-rotate(15deg); }
          40% { transform: translate(2px, -2px) skewX(1.5deg); filter: hue-rotate(-12deg) contrast(1.2); }
          60% { transform: translate(-2px, 2px); filter: hue-rotate(8deg); }
          80% { transform: translate(1px, -1px) skewX(-1deg); filter: hue-rotate(-6deg) contrast(1.1); }
        }
        .qrt-glitch { animation: qrtGlitch .32s steps(2) both; }
      `}</style>
      <div className="text-zinc-500 text-[11px] tracking-widest mb-1">
        15:42
      </div>
      <div className="text-zinc-400 text-[10px] tracking-[0.4em] mb-6">
        BİLDİRİM · MESAJLAR
      </div>
      <div className="w-full max-w-sm bg-zinc-900 rounded-2xl p-4 shadow-2xl shadow-blue-500/10 border border-zinc-800">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center font-bold text-[10px]">
            TT
          </div>
          <div className="font-semibold text-sm">Türk Telekom</div>
          <div className="ml-auto text-[10px] text-zinc-500">şimdi</div>
        </div>
        <div className="text-sm text-zinc-200 leading-snug">
          Tebrikler! MCBÜKAF katılımcılarına özel{" "}
          <span className="font-bold text-white">1.000 TL bedava internet</span>
          {" "}kampanyasını kazandınız. Ödülünüzü almak için:
        </div>
        <div className="mt-2 text-xs text-blue-400 break-all">
          turktelekom-kampanya-mcbukaf.co/odul
        </div>
      </div>
      <div className="mt-6 text-zinc-500 text-xs tracking-wider">
        ↓ açılıyor
      </div>
    </div>
  );
}
