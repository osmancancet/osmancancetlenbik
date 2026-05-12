"use client";

import { useEffect, useState } from "react";

type ClientInfo = {
  screen: string;
  viewport: string;
  dpr: number;
  cores: number;
  memory: string;
  touch: boolean;
  timezone: string;
  battery: string;
  connection: string;
  platform: string;
  cookieEnabled: boolean;
  doNotTrack: string;
  online: boolean;
  referrer: string;
};

function detectBrowser(ua: string): string {
  if (/Edg\//.test(ua)) return "Edge";
  if (/OPR\//.test(ua)) return "Opera";
  if (/Chrome\//.test(ua) && !/Edg\//.test(ua)) return "Chrome";
  if (/Firefox\//.test(ua)) return "Firefox";
  if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return "Safari";
  return "Bilinmiyor";
}

function detectOS(ua: string): string {
  if (/iPhone|iPad|iPod/.test(ua)) return "iOS";
  if (/Android/.test(ua)) return "Android";
  if (/Mac OS/.test(ua)) return "macOS";
  if (/Windows/.test(ua)) return "Windows";
  if (/Linux/.test(ua)) return "Linux";
  return "Bilinmiyor";
}

function detectDevice(ua: string): string {
  if (/iPhone/.test(ua)) return "iPhone";
  if (/iPad/.test(ua)) return "iPad";
  if (/Android/.test(ua)) {
    const m = ua.match(/Android.*?;\s*([^)]+?)\)/);
    return m?.[1] ?? "Android cihaz";
  }
  return "—";
}

export function DeviceFingerprintClient({
  ip,
  userAgent,
  acceptLang,
}: {
  ip: string;
  userAgent: string;
  acceptLang: string;
}) {
  const [phase, setPhase] = useState<"lure" | "scan" | "done">("lure");
  const [client, setClient] = useState<ClientInfo | null>(null);
  const [lureCountdown, setLureCountdown] = useState(6);

  // Lure fazında 6sn geri sayım; bitince otomatik scan başlat (seyircinin tıklamama ihtimaline karşı)
  useEffect(() => {
    if (phase !== "lure") return;
    if (lureCountdown <= 0) {
      setPhase("scan");
      return;
    }
    const t = setTimeout(() => setLureCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, lureCountdown]);

  useEffect(() => {
    if (phase !== "scan") return;
    if (typeof window === "undefined") return;
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { effectiveType?: string; downlink?: number };
      doNotTrack?: string;
    };

    const info: ClientInfo = {
      screen: `${window.screen.width} × ${window.screen.height}`,
      viewport: `${window.innerWidth} × ${window.innerHeight}`,
      dpr: window.devicePixelRatio,
      cores: navigator.hardwareConcurrency || 0,
      memory: nav.deviceMemory ? `${nav.deviceMemory} GB` : "—",
      touch: "ontouchstart" in window,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      battery: "—",
      connection: nav.connection?.effectiveType
        ? `${nav.connection.effectiveType.toUpperCase()}${nav.connection.downlink ? ` · ${nav.connection.downlink} Mbps` : ""}`
        : "—",
      platform: navigator.platform || "—",
      cookieEnabled: navigator.cookieEnabled,
      doNotTrack: nav.doNotTrack === "1" ? "açık" : "kapalı",
      online: navigator.onLine,
      referrer: document.referrer || "—",
    };

    // attempt battery
    const navWithBattery = navigator as Navigator & {
      getBattery?: () => Promise<{
        level: number;
        charging: boolean;
      }>;
    };
    navWithBattery.getBattery?.().then((b) => {
      setClient((prev) => ({
        ...(prev ?? info),
        battery: `${Math.round(b.level * 100)}%${b.charging ? " · şarjda" : ""}`,
      }));
    });

    setClient(info);
    const t = setTimeout(() => setPhase("done"), 1800);
    return () => clearTimeout(t);
  }, [phase]);

  const browser = detectBrowser(userAgent);
  const os = detectOS(userAgent);
  const device = detectDevice(userAgent);

  const rows: { label: string; value: string }[] = [
    { label: "IP adresi", value: ip },
    { label: "Cihaz", value: device },
    { label: "İşletim sistemi", value: os },
    { label: "Tarayıcı", value: browser },
    { label: "Ekran", value: client?.screen ?? "—" },
    { label: "Görüntü çözünürlüğü", value: client?.viewport ?? "—" },
    { label: "Piksel yoğunluğu", value: client ? `${client.dpr}x` : "—" },
    { label: "CPU çekirdeği", value: client?.cores ? String(client.cores) : "—" },
    { label: "RAM tahmini", value: client?.memory ?? "—" },
    { label: "Dokunmatik", value: client?.touch ? "evet" : "hayır" },
    { label: "Saat dilimi", value: client?.timezone ?? "—" },
    { label: "Pil", value: client?.battery ?? "—" },
    { label: "Bağlantı", value: client?.connection ?? "—" },
    { label: "Dil (Accept-Language)", value: acceptLang.split(",")[0] || "—" },
    { label: "Çerez aktif", value: client?.cookieEnabled ? "evet" : "hayır" },
    { label: "Çevrimiçi", value: client?.online ? "evet" : "hayır" },
  ];

  if (phase === "lure") {
    return (
      <div
        className="min-h-dvh bg-gradient-to-b from-[#06121f] to-[#0a1a2e] text-white flex flex-col font-sans"
        style={{
          paddingTop: "max(1.5rem, env(safe-area-inset-top))",
          paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
        }}
      >
        {/* fake brand bar */}
        <div className="px-5 py-3 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center font-black text-[#06121f]">
              ⚡
            </div>
            <div>
              <div className="font-bold text-sm leading-tight">
                NetSpeed · TR
              </div>
              <div className="text-[10px] text-white/50 tracking-wider">
                BAĞLANTI KALİTE ARAÇLARI
              </div>
            </div>
          </div>
          <div className="text-[10px] text-white/50">🔒 SSL</div>
        </div>

        <div className="flex-1 px-6 flex flex-col items-center justify-center text-center">
          <div className="text-cyan-400 font-mono text-[10px] tracking-[0.4em] mb-3">
            HIZLI BAĞLANTI TESTİ
          </div>
          <h1 className="text-3xl font-bold mb-3 leading-tight">
            İnternet hızını
            <br />
            <span className="text-cyan-300">2 saniyede</span> öğren.
          </h1>
          <p className="text-white/70 text-sm mb-8 max-w-xs leading-relaxed">
            En yakın sunucuyu seçip cihazına uygun ölçüm yapacağız. Test
            sırasında cihaz ve bağlantı bilgilerine erişim verilir.
          </p>

          {/* fake speedometer dial */}
          <div className="relative w-44 h-44 mb-8">
            <div className="absolute inset-0 rounded-full border-[6px] border-white/10" />
            <div
              className="absolute inset-0 rounded-full border-[6px] border-cyan-400/60"
              style={{
                clipPath:
                  "polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%, 50% 50%)",
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-[10px] text-white/50 tracking-widest mb-1">
                Mbps
              </div>
              <div className="text-4xl font-black text-cyan-300 tabular-nums">
                ---
              </div>
            </div>
          </div>

          <button
            onClick={() => setPhase("scan")}
            className="w-full max-w-xs bg-gradient-to-b from-cyan-400 to-cyan-500 text-[#06121f] font-bold py-4 rounded-xl text-base shadow-lg shadow-cyan-500/30 active:scale-[0.98] transition-transform"
          >
            TESTİ BAŞLAT
          </button>

          <div className="mt-4 text-[10px] text-white/40 tracking-widest">
            otomatik başlama: {lureCountdown}s
          </div>
        </div>

        <div className="mt-auto px-5 pb-2 text-center text-[10px] text-white/30 tracking-widest">
          netspeed-tr.co · v2.4
        </div>
      </div>
    );
  }

  if (phase === "scan") {
    return (
      <div
        className="min-h-dvh bg-black text-white flex flex-col items-center justify-center px-6 font-mono"
        style={{
          paddingTop: "max(2rem, env(safe-area-inset-top))",
          paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
        }}
      >
        <div className="text-emerald-400 text-xs tracking-[0.4em] mb-6">
          CİHAZ TARANIYOR…
        </div>
        <div className="space-y-2 text-sm">
          <ScanLine text="$ probe.user-agent" delay={0} />
          <ScanLine text="$ probe.screen" delay={150} />
          <ScanLine text="$ probe.timezone" delay={300} />
          <ScanLine text="$ probe.battery" delay={450} />
          <ScanLine text="$ probe.ip → resolve" delay={600} />
          <ScanLine text="$ done" delay={1000} ok />
        </div>
      </div>
    );
  }

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
        <div className="text-2xl font-bold text-rose-200 leading-tight">
          Tek tıkladın.
          <br />
          Saldırgan profil çıkardı:
        </div>
      </div>

      <div className="flex-1 px-5 py-6">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 divide-y divide-zinc-900">
          {rows.map((r) => (
            <div
              key={r.label}
              className="px-4 py-3 flex items-center justify-between gap-3"
            >
              <span className="text-zinc-400 text-sm">{r.label}</span>
              <span className="font-mono text-emerald-300 text-sm text-right break-all max-w-[55%]">
                {r.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-7 rounded-2xl border-2 border-emerald-400 bg-emerald-400/10 p-5">
          <div className="font-mono text-[10px] tracking-[0.4em] text-emerald-300 mb-2">
            BU NE DEMEK?
          </div>
          <ul className="text-emerald-100 text-base space-y-2">
            <li>
              ✓ Hiç şifre yazmadın — yine de profilin oluştu.
            </li>
            <li>✓ Reklam ağları bu izle seni 100+ sitede takip eder.</li>
            <li>
              ✓ Hedefli phishing için yeterli: marka, model, dil, saat dilimi.
            </li>
          </ul>
        </div>

        <p className="mt-8 text-center font-mono text-[10px] tracking-widest text-zinc-600">
          OSMANCANCETLENBIK.COM · MCBÜKAF 2026
        </p>
      </div>
    </div>
  );
}

function ScanLine({
  text,
  delay,
  ok,
}: {
  text: string;
  delay: number;
  ok?: boolean;
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  if (!show) return null;
  return (
    <div className={ok ? "text-emerald-300" : "text-emerald-400/70"}>
      {text}
      {ok ? " ✓" : ""}
    </div>
  );
}
