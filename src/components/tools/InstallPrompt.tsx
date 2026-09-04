"use client";

import { useEffect, useState } from "react";
import { Download, Check, X } from "lucide-react";

/**
 * "Masaüstüne kur" düğmesi ve çevrimdışı önbelleğin kaydı.
 *
 * Chrome ve Edge, kurulabilir bir sayfada `beforeinstallprompt` olayını
 * fırlatıyor; onu yakalayıp kendi düğmemize bağlıyoruz. Safari bu olayı
 * desteklemiyor, orada kullanıcıya "Paylaş → Dock'a Ekle" yolunu tarif
 * ediyoruz — sessizce kaybolmasındansa açık yönerge iyidir.
 */

type InstallEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function InstallPrompt() {
  const [deferred, setDeferred] = useState<InstallEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [showSafariHint, setShowSafariHint] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Kayıt başarısız olursa araçlar yine çalışır, sadece çevrimdışı olmaz.
      });
    }

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as InstallEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
    };

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);

    // Zaten uygulama olarak açıldıysa düğmeyi gösterme.
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setInstalled(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed) {
    return (
      <p className="inline-flex items-center gap-2 text-sm text-[var(--accent)]">
        <Check className="w-4 h-4" />
        Uygulama olarak kurulu — internetsiz de çalışır.
      </p>
    );
  }

  if (deferred) {
    return (
      <button
        onClick={async () => {
          await deferred.prompt();
          const { outcome } = await deferred.userChoice;
          if (outcome === "accepted") setInstalled(true);
          setDeferred(null);
        }}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-[var(--bg)] text-sm font-semibold rounded-md hover:opacity-90 transition-opacity"
      >
        <Download className="w-4 h-4" />
        Masaüstüne kur
      </button>
    );
  }

  return (
    <div>
      <button
        onClick={() => setShowSafariHint((v) => !v)}
        className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--border-strong)] text-sm text-[var(--fg-muted)] rounded-md hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
      >
        <Download className="w-4 h-4" />
        Nasıl kurulur?
      </button>

      {showSafariHint && (
        <div className="mt-3 card rounded-lg p-5 max-w-xl relative">
          <button
            onClick={() => setShowSafariHint(false)}
            aria-label="Kapat"
            className="absolute top-3 end-3 text-[var(--fg-subtle)] hover:text-[var(--fg)]"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="space-y-3 text-sm text-[var(--fg-muted)] leading-relaxed pe-6">
            <div>
              <strong className="text-[var(--fg)]">
                Windows · Chrome veya Edge
              </strong>
              <br />
              Adres çubuğunun sağındaki kur simgesine tıklayın, ya da menüden
              “Uygulamalar → Bu siteyi uygulama olarak yükle”.
            </div>
            <div>
              <strong className="text-[var(--fg)]">macOS · Chrome veya Edge</strong>
              <br />
              Menü → “Yayınla, kaydet ve paylaş → Uygulama olarak yükle”.
            </div>
            <div>
              <strong className="text-[var(--fg)]">macOS · Safari</strong>
              <br />
              Paylaş düğmesi → “Dock&apos;a Ekle”.
            </div>
            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href="/araclar/kisayol/macos"
                download
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[var(--border-strong)] text-xs text-[var(--fg-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
              >
                <Download className="w-3 h-3" />
                macOS kısayolu
              </a>
              <a
                href="/araclar/kisayol/windows"
                download
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[var(--border-strong)] text-xs text-[var(--fg-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
              >
                <Download className="w-3 h-3" />
                Windows kısayolu
              </a>
            </div>
            <div className="pt-1 text-[var(--fg-subtle)] text-xs">
              Kurulduktan sonra araçlar kendi penceresinde açılır ve internet
              olmadan da çalışır.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
