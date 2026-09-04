"use client";

import { useEffect, useState } from "react";
import { Apple, Check, Download, Monitor, WifiOff } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Araçlar sayfasındaki macOS / Windows indirme bölümü.
 *
 * İki ayrı yol sunuluyor:
 *  1. "Uygulama olarak kur" — tarayıcının kurulum kipi. Araçlar kendi
 *     penceresinde açılır, görev çubuğuna/Dock'a iner, internetsiz çalışır.
 *  2. "Kısayol indir" — işletim sisteminin kendi kısayol dosyası
 *     (.webloc / .url). Klasik indirme bekleyen kullanıcı için.
 *
 * İmzalı .dmg/.exe bilerek yok: kod imzalama sertifikası olmadan her iki
 * sistem de "geliştirici doğrulanamadı" uyarısı veriyor ve akademisyen
 * kitlesinde bu güveni doğrudan zedeliyor.
 */

type InstallEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function PlatformDownload() {
  const [deferred, setDeferred] = useState<InstallEvent | null>(null);
  const [kurulu, setKurulu] = useState(false);
  const [platform, setPlatform] = useState<"mac" | "win" | null>(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    const ua = navigator.userAgent;
    setPlatform(/Mac|iPhone|iPad/.test(ua) ? "mac" : /Win/.test(ua) ? "win" : null);
    if (window.matchMedia("(display-mode: standalone)").matches) setKurulu(true);

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as InstallEvent);
    };
    const onInstalled = () => {
      setKurulu(true);
      setDeferred(null);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  async function kur() {
    if (!deferred) return;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    if (outcome === "accepted") setKurulu(true);
    setDeferred(null);
  }

  function Kutu({
    p,
    baslik,
    Icon,
    adimlar,
    dosya,
  }: {
    p: "mac" | "win";
    baslik: string;
    Icon: LucideIcon;
    adimlar: string[];
    dosya: string;
  }) {
    const benim = platform === p;
    return (
      <div
        className={`card rounded-lg p-6 h-full flex flex-col ${
          benim ? "border-[var(--accent)]/50 bg-[var(--accent-soft)]" : ""
        }`}
      >
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <Icon className="w-5 h-5 text-[var(--accent)]" />
            <span className="text-[var(--fg)] font-semibold text-lg">
              {baslik}
            </span>
          </div>
          {benim && (
            <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-[var(--accent-soft)] text-[var(--accent)]">
              Sisteminiz
            </span>
          )}
        </div>

        <ol className="space-y-2 text-sm text-[var(--fg-muted)] leading-relaxed flex-1 mb-5">
          {adimlar.map((a, i) => (
            <li key={a} className="flex gap-3">
              <span className="font-mono text-[11px] text-[var(--accent)] shrink-0 pt-0.5">
                {i + 1}
              </span>
              <span>{a}</span>
            </li>
          ))}
        </ol>

        <div className="flex flex-wrap items-center gap-3">
          {kurulu ? (
            <span className="inline-flex items-center gap-2 text-sm text-[var(--accent)]">
              <Check className="w-4 h-4" />
              Kurulu
            </span>
          ) : deferred && benim ? (
            <button
              onClick={kur}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-[var(--bg)] text-sm font-semibold rounded-md hover:opacity-90 transition-opacity"
            >
              <Download className="w-4 h-4" />
              Uygulama olarak kur
            </button>
          ) : null}

          <a
            href={`/araclar/kisayol/${dosya}`}
            download
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-[var(--border-strong)] text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
          >
            <Download className="w-4 h-4" />
            Masaüstü kısayolu indir
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-4">
        <Download className="w-3 h-3" />
        Bilgisayarınıza indirin
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Kutu
          p="mac"
          baslik="macOS"
          Icon={Apple}
          adimlar={[
            "Bu sayfayı Chrome ya da Edge ile açın.",
            "Menü → “Yayınla, kaydet ve paylaş” → “Uygulama olarak yükle”.",
            "Safari kullanıyorsanız: Paylaş → “Dock’a Ekle”.",
          ]}
          dosya="macos"
        />
        <Kutu
          p="win"
          baslik="Windows"
          Icon={Monitor}
          adimlar={[
            "Bu sayfayı Chrome ya da Edge ile açın.",
            "Adres çubuğunun sağındaki kur simgesine tıklayın.",
            "Görünmüyorsa: Menü → “Uygulamalar” → “Bu siteyi uygulama olarak yükle”.",
          ]}
          dosya="windows"
        />
      </div>

      <p className="mt-4 text-sm text-[var(--fg-subtle)] leading-relaxed flex items-start gap-2">
        <WifiOff className="w-4 h-4 shrink-0 mt-0.5" />
        <span>
          Kurulum ücretsiz ve “geliştirici doğrulanamadı” uyarısı çıkmıyor —
          indirilen bir program değil, tarayıcının uygulama kipi. Kurulduktan
          sonra araçlar kendi penceresinde açılıyor, internet olmadan da
          çalışıyor ve güncellemeler kendiliğinden geliyor.
        </span>
      </p>
    </div>
  );
}
