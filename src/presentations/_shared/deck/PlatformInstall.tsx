"use client";

import { useEffect, useState } from "react";
import { Apple, Check, Download, Monitor } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * macOS ve Windows için ayrı kurulum kutuları.
 *
 * Neden iki ayrı yol sunuyoruz:
 *  1. "Uygulama olarak kur" — tarayıcının kurulum kipi. Araçlar kendi
 *     penceresinde açılıyor, Dock'a/görev çubuğuna iniyor, internetsiz
 *     çalışıyor. İmza gerekmiyor, uyarı çıkmıyor.
 *  2. "Kısayol indir" — işletim sisteminin kendi kısayol dosyası
 *     (.webloc / .url). Klasik "indir" bekleyen kullanıcı için.
 *
 * İmzalı .dmg/.exe bilerek sunulmuyor: sertifika olmadan her iki sistem de
 * "geliştirici doğrulanamadı" uyarısı veriyor ve akademisyen kitlesinde bu
 * güveni doğrudan zedeliyor.
 */

type InstallEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function PlatformInstall() {
  const [deferred, setDeferred] = useState<InstallEvent | null>(null);
  const [kurulu, setKurulu] = useState(false);
  const [platform, setPlatform] = useState<"mac" | "win" | null>(null);

  useEffect(() => {
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

  const kutu = (
    p: "mac" | "win",
    baslik: string,
    Icon: LucideIcon,
    adimlar: string[],
    dosya: string
  ) => {
    const benim = platform === p;
    return (
      <div
        className="ai-card p-6 h-full flex flex-col"
        style={
          benim
            ? {
                borderColor: "color-mix(in srgb, var(--deck-accent) 55%, transparent)",
                background: "color-mix(in srgb, var(--deck-accent) 6%, transparent)",
              }
            : undefined
        }
      >
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <Icon className="w-5 h-5" style={{ color: "var(--deck-accent)" }} />
            <span className="text-white font-semibold text-lg">{baslik}</span>
          </div>
          {benim && (
            <span
              className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded"
              style={{
                background: "color-mix(in srgb, var(--deck-accent) 18%, transparent)",
                color: "var(--deck-accent)",
              }}
            >
              Sizin sisteminiz
            </span>
          )}
        </div>

        <ol className="space-y-2 text-sm text-white/55 leading-relaxed flex-1 mb-5">
          {adimlar.map((a, i) => (
            <li key={a} className="flex gap-3">
              <span
                className="font-mono text-[11px] shrink-0 pt-0.5"
                style={{ color: "var(--deck-accent)" }}
              >
                {i + 1}
              </span>
              <span>{a}</span>
            </li>
          ))}
        </ol>

        <div className="hidden print:block">
          <div className="text-[12px] text-white/45 mb-1">
            Kısayol dosyası:
          </div>
          <div
            className="font-mono text-[13px]"
            style={{ color: "var(--deck-accent)" }}
          >
            osmancancetlenbik.com/araclar/kisayol/{dosya}
          </div>
        </div>

        <div className="print:hidden flex flex-wrap items-center gap-3">
          {kurulu ? (
            <span
              className="inline-flex items-center gap-2 text-sm"
              style={{ color: "var(--deck-accent)" }}
            >
              <Check className="w-4 h-4" />
              Kurulu
            </span>
          ) : deferred && benim ? (
            <button
              onClick={kur}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold"
              style={{ background: "var(--deck-accent)", color: "#000" }}
            >
              <Download className="w-4 h-4" />
              Uygulama olarak kur
            </button>
          ) : null}

          <a
            href={`/araclar/kisayol/${dosya}`}
            download
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm border border-white/20 text-white/65 hover:text-white hover:border-white/40 transition-colors"
          >
            <Download className="w-4 h-4" />
            Masaüstü kısayolu indir
          </a>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4">
        {kutu(
          "mac",
          "macOS",
          Apple,
          [
            "Chrome ya da Edge ile osmancancetlenbik.com/araclar adresini açın.",
            "Menü → “Yayınla, kaydet ve paylaş” → “Uygulama olarak yükle”.",
            "Safari kullanıyorsanız: Paylaş düğmesi → “Dock’a Ekle”.",
          ],
          "macos"
        )}
        {kutu(
          "win",
          "Windows",
          Monitor,
          [
            "Chrome ya da Edge ile osmancancetlenbik.com/araclar adresini açın.",
            "Adres çubuğunun sağındaki kur simgesine tıklayın.",
            "Görünmüyorsa: Menü → “Uygulamalar” → “Bu siteyi uygulama olarak yükle”.",
          ],
          "windows"
        )}
      </div>

      <p className="mt-5 text-sm text-white/40 leading-relaxed">
        Kurulum ücretsiz ve “geliştirici doğrulanamadı” uyarısı çıkmıyor, çünkü
        indirilen bir program değil — tarayıcının uygulama kipi. Kurulduktan
        sonra araçlar kendi penceresinde açılıyor, internet olmadan da
        çalışıyor ve güncellemeler kendiliğinden geliyor.
      </p>
    </div>
  );
}
