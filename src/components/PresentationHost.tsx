"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Keyboard, Radio, Timer, X } from "lucide-react";
import { getPresentation } from "@/presentations/registry";
import { useQrDataUrl } from "@/components/useQrDataUrl";

/**
 * Tüm sunumları saran kabuk.
 *
 * 119 sunum kendi klavye ve tam ekran kodunu ayrı ayrı taşıyor. Denetimde
 * çıkan üç sorun burada, tek yerde çözülüyor — 119 dosyaya dokunmadan:
 *
 *  1. Hiçbir sunum `Escape` dinlemiyordu, ama hepsinin köşesindeki ipucu
 *     şeridi "← → · F · Esc" yazıyordu. Escape artık gerçekten çıkarıyor.
 *  2. İçinde `<input>` olan sunumlarda öğrenci yazı yazarken boşluk tuşu
 *     slaytı atlıyor, "f" tam ekran açıyordu. Yakalama aşamasındaki
 *     dinleyici, yazı alanındayken gezinme tuşlarının sunuma ulaşmasını
 *     engelliyor.
 *  3. Sunum sırasında kronometre ve kısayol yardımı hiçbir sunumda yoktu.
 *
 * Ayrıca `?canli=KOD` ile açıldığında canlı ders katılım paneli geliyor:
 * ders anlatırken slaytın üstüne QR ve kod düşürüp öğrenciyi içine alıyor.
 */

/** Yazı alanındayken sunuma sızmaması gereken tuşlar. */
const NAV_KEYS = new Set([
  " ",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "PageUp",
  "PageDown",
  "Home",
  "End",
  "f",
  "F",
]);

function isTypingTarget(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    el.isContentEditable
  );
}

function formatClock(ms: number) {
  const total = Math.floor(ms / 1000);
  const m = String(Math.floor(total / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return `${m}:${s}`;
}

export function PresentationHost({
  slug,
  backHref,
}: {
  slug: string;
  backHref: string;
}) {
  const entry = getPresentation(slug);
  const search = useSearchParams();
  const liveCode = search.get("canli")?.toUpperCase() ?? null;
  /**
   * Yazdırma kipinde kabuk `position: fixed` OLMAMALI. Sabit konumlu bir
   * öğe yazdırılırken yalnızca ilk sayfaya basılıyor; 79 slaytlık sunum tek
   * sayfaya sıkışıyordu. Bu kipte üst çubuk ve kronometre de gereksiz.
   */
  const printMode = search.get("yazdir") === "1";

  const [helpOpen, setHelpOpen] = useState(false);
  const [liveOpen, setLiveOpen] = useState(false);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());

  // Yazı alanındayken gezinme tuşlarını sunuma iletme. Yakalama aşamasında
  // çalıştığı için sunumların kendi window dinleyicilerinden önce devreye
  // giriyor; varsayılan davranış (harfin yazılması) engellenmiyor.
  useEffect(() => {
    const guard = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target) && NAV_KEYS.has(e.key)) {
        e.stopPropagation();
      }
    };
    window.addEventListener("keydown", guard, true);
    return () => window.removeEventListener("keydown", guard, true);
  }, []);

  const toggleTimer = useCallback(() => {
    setStartedAt((v) => (v == null ? Date.now() : null));
  }, []);

  useEffect(() => {
    if (startedAt == null) return;
    const t = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(t);
  }, [startedAt]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;

      if (e.key === "Escape") {
        // Tam ekrandayken Escape'i tarayıcı zaten tam ekrandan çıkmak için
        // kullanıyor; sunumdan da çıkarsak iki şey aynı anda olur.
        if (document.fullscreenElement) return;
        if (helpOpen) return setHelpOpen(false);
        if (liveOpen) return setLiveOpen(false);
        return;
      }
      if (e.key === "?" || (e.key === "/" && e.shiftKey)) {
        e.preventDefault();
        setHelpOpen((v) => !v);
      } else if (e.key.toLowerCase() === "t") {
        toggleTimer();
      } else if (e.key.toLowerCase() === "l" && liveCode) {
        setLiveOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [helpOpen, liveOpen, liveCode, toggleTimer]);

  if (!entry) {
    return (
      <div className="fixed inset-0 z-[100] bg-[var(--bg)] flex items-center justify-center p-8 text-center">
        <div>
          <p className="text-[var(--fg-muted)] mb-4">
            <span className="font-mono text-[var(--accent)]">{slug}</span> adında
            bir sunum bulunamadı.
          </p>
          <Link
            href={backHref}
            className="text-sm text-[var(--accent)] hover:underline"
          >
            ← Geri dön
          </Link>
        </div>
      </div>
    );
  }

  const { Component } = entry;

  if (printMode) {
    return (
      <div className="bg-black">
        <Component />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-hidden">
      <Component />

      <div className="fixed top-3 right-3 z-[110] flex items-center gap-2">
        {startedAt != null && (
          <span className="px-2.5 h-9 flex items-center rounded-full bg-black/60 backdrop-blur border border-white/10 font-mono text-sm text-white/80 tabular-nums">
            {formatClock(now - startedAt)}
          </span>
        )}
        {liveCode && (
          <button
            onClick={() => setLiveOpen((v) => !v)}
            aria-label="Canlı katılım panelini aç"
            className="h-9 px-3 flex items-center gap-2 rounded-full bg-black/60 backdrop-blur border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-colors"
          >
            <Radio className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="font-mono text-xs tracking-widest">{liveCode}</span>
          </button>
        )}
        <button
          onClick={toggleTimer}
          aria-label={startedAt ? "Kronometreyi durdur" : "Kronometreyi başlat"}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-black/60 backdrop-blur border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-colors"
        >
          <Timer className="w-4 h-4" />
        </button>
        <button
          onClick={() => setHelpOpen(true)}
          aria-label="Klavye kısayolları"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-black/60 backdrop-blur border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-colors"
        >
          <Keyboard className="w-4 h-4" />
        </button>
        <Link
          href={backHref}
          aria-label="Sunumdan çık"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-black/60 backdrop-blur border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-colors"
        >
          <X className="w-4 h-4" />
        </Link>
      </div>

      {helpOpen && <HelpOverlay hasLive={!!liveCode} onClose={() => setHelpOpen(false)} />}
      {liveOpen && liveCode && (
        <LivePanel code={liveCode} onClose={() => setLiveOpen(false)} />
      )}
    </div>
  );
}

const SHORTCUTS: Array<[string, string]> = [
  ["→ · Boşluk · PageDown", "Sonraki slayt"],
  ["← · PageUp", "Önceki slayt"],
  ["Home · End", "İlk / son slayt"],
  ["F", "Tam ekran"],
  ["T", "Kronometre başlat / durdur"],
  ["?", "Bu yardım ekranı"],
  ["Esc", "Yardımı kapat · tam ekrandan çık"],
];

function HelpOverlay({
  hasLive,
  onClose,
}: {
  hasLive: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[130] bg-black/85 backdrop-blur-sm flex items-center justify-center p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Klavye kısayolları"
    >
      <div
        className="max-w-md w-full rounded-lg border border-white/15 bg-black/80 p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-white text-lg font-semibold mb-5 flex items-center gap-2">
          <Keyboard className="w-4 h-4 text-[var(--accent)]" />
          Klavye kısayolları
        </h2>
        <dl className="space-y-2.5">
          {[...SHORTCUTS, ...(hasLive ? ([["L", "Canlı katılım paneli"]] as Array<[string, string]>) : [])].map(
            ([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-6">
                <dt className="font-mono text-xs text-[var(--accent)] shrink-0">
                  {k}
                </dt>
                <dd className="text-sm text-white/70 text-end">{v}</dd>
              </div>
            )
          )}
        </dl>
        <button
          onClick={onClose}
          className="mt-6 w-full py-2 rounded border border-white/15 text-sm text-white/60 hover:text-white hover:border-white/30 transition-colors"
        >
          Kapat
        </button>
      </div>
    </div>
  );
}

/** Slaydın üstüne düşen katılım paneli: kod, QR ve anlık katılımcı sayısı. */
function LivePanel({ code, onClose }: { code: string; onClose: () => void }) {
  const [origin, setOrigin] = useState("");
  const [state, setState] = useState<{
    title: string;
    participants: number;
    status: string;
  } | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => setOrigin(window.location.origin), []);
  const url = origin ? `${origin}/canli?kod=${code}` : "";
  const qr = useQrDataUrl(url, 600);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/live/${code}`, { cache: "no-store" });
      if (res.ok) setState(await res.json());
    };
    load();
    timer.current = setInterval(load, 3000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [code]);

  return (
    <div
      className="fixed inset-0 z-[130] bg-black/90 backdrop-blur-sm flex items-center justify-center p-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Canlı katılım"
    >
      <div className="text-center" onClick={(e) => e.stopPropagation()}>
        <p className="text-white/40 uppercase tracking-[0.3em] text-sm mb-6">
          Derse katılmak için
        </p>
        <div className="font-mono text-[9rem] leading-none text-[var(--accent)] tracking-[0.1em]">
          {code}
        </div>
        {qr && (
          <Image
            src={qr}
            alt="Katılım QR kodu"
            width={220}
            height={220}
            unoptimized
            className="mx-auto mt-8 rounded-lg"
          />
        )}
        <p className="mt-5 text-xl text-white/60">{origin}/canli</p>
        {state && (
          <p className="mt-6 text-lg text-white/40">
            {state.participants} kişi katıldı
          </p>
        )}
        <button
          onClick={onClose}
          className="mt-8 px-5 py-2 rounded border border-white/15 text-sm text-white/60 hover:text-white"
        >
          Kapat (L)
        </button>
      </div>
    </div>
  );
}
