import type { Metadata } from "next";
import Image from "next/image";
import { canonicalOnly } from "@/lib/seo/metadata";
import { PageShell } from "@/components/layout/PageShell";

const APP_STORE = "https://apps.apple.com/tr/app/sesu/id6789215821";
const GOOGLE_PLAY = "https://play.google.com/store/apps/details?id=com.osmancancetlenbik.sesu";
const INSTAGRAM = "https://www.instagram.com/sesu.app/";

export const metadata: Metadata = {
  title: "Sesu — Dil ve Konuşma Terapisi Egzersizleri",
  description:
    "Türkçe dil ve konuşma terapisi egzersizleri. Ücretsiz, reklamsız, internetsiz. App Store ve Google Play'de.",
  alternates: canonicalOnly("/sesu"),
};

const ozellikler = [
  "Terapide izlenen sıra: izole ses → hece → sözcük → cümle",
  "2.700'den fazla etkinlik: artikülasyon, akıcılık, dil, dikkat ve daha fazlası",
  "Puanı uygulama değil siz verirsiniz: kaydet, birlikte dinle, işaretle",
  "Günlük plan, yıldızlar, seriler ve rozetlerle düzenli pratik",
  "Ses kayıtları cihazda kalır, hiçbir sunucuya gönderilmez",
];

function MagazaDugmesi({ href, ust, alt }: { href: string; ust: string; alt: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 min-w-[220px] rounded-2xl bg-[var(--fg)] text-[var(--bg)] px-6 py-4 hover:opacity-90 transition-opacity"
    >
      <span className="block text-xs opacity-80">{ust}</span>
      <span className="block text-xl font-semibold">{alt}</span>
    </a>
  );
}

export default function SesuPage() {
  return (
    <PageShell
      eyebrow="Mobil uygulama"
      title="Sesu: Dil ve Konuşma"
      subtitle="Terapistin seans dışında verdiği çalışmayı evde her gün düzenli bir pratiğe dönüştüren Türkçe egzersiz uygulaması."
    >
      <div className="max-w-3xl rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-8 md:p-10">
        <div className="flex items-center gap-5">
          <Image
            src="/sesu/sesu-icon.jpg"
            alt="Sesu uygulama simgesi"
            width={88}
            height={88}
            className="rounded-[22px]"
            priority
          />
          <div>
            <p className="text-2xl font-semibold text-[var(--fg)]">Sesu</p>
            <p className="text-[var(--fg-muted)]">Ücretsiz · Reklamsız · İnternetsiz</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <MagazaDugmesi href={APP_STORE} ust="iPhone ve iPad için" alt="App Store" />
          <MagazaDugmesi href={GOOGLE_PLAY} ust="Android için" alt="Google Play" />
        </div>

        <ul className="mt-10 space-y-3">
          {ozellikler.map((o) => (
            <li key={o} className="flex gap-3 text-[var(--fg)]">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
              <span>{o}</span>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm text-[var(--fg-muted)]">
          Abonelik, uygulama içi satın alma ve hesap yok. Hangi sesten başlanacağına terapistiniz karar verir;
          Sesu evdeki tekrarları kolaylaştırır. <strong>Sesu terapiyi destekler, yerine geçmez.</strong>
        </p>
        <p className="mt-4 text-sm">
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">
            Instagram: @sesu.app
          </a>
        </p>
      </div>
    </PageShell>
  );
}
