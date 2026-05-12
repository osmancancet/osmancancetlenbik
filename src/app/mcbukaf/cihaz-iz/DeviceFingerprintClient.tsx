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
  const [phase, setPhase] = useState<"scan" | "done">("scan");
  const [client, setClient] = useState<ClientInfo | null>(null);

  useEffect(() => {
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
  }, []);

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
          QR'A TIKLADIN · CİHAZIN KONUŞTU
        </div>
        <div className="text-2xl font-bold text-rose-200 leading-tight">
          Sadece sayfayı açtın.
          <br />
          Saldırgan şunları öğrendi:
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
