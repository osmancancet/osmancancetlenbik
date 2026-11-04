import type { Metadata } from "next";
import Image from "next/image";
import { seoMeta } from "@/lib/seo/metadata";
import { absoluteUrl } from "@/lib/site";
import { jsonLdScript, mobileApplicationJsonLd } from "@/lib/seo/jsonLd";
import { PageShell } from "@/components/layout/PageShell";
import { MailAction } from "@/components/MailAction";
import { profile } from "@/data/profile";

/**
 * App Store kampanya belirteci. Repoda bir Apple provider token (pt) yok;
 * yalnızca ct ekleniyor.
 */
const APP_STORE =
  "https://apps.apple.com/tr/app/id6789215821?ct=osmancancetlenbik-sesu";
const GOOGLE_PLAY =
  "https://play.google.com/store/apps/details?id=com.osmancancetlenbik.sesu";
const PRODUCT_SITE = "https://osmancancet.github.io/sesu-web/";
const INSTAGRAM = "https://www.instagram.com/sesu.app/";

const TITLE =
  "Sesu: Ücretsiz Dil ve Konuşma Terapisi Uygulaması – Artikülasyon, Kekemelik, Afazi";
const DESCRIPTION =
  "Dil ve konuşma terapistleri için ücretsiz, reklamsız ve çevrimdışı uygulama. 20 Türkçe ses, 2.767 etkinlik, PDF ilerleme raporu. Artikülasyon, kekemelik, afazi.";

export const metadata: Metadata = {
  ...seoMeta({
    path: "/sesu",
    title: TITLE,
    description: DESCRIPTION,
    image: "/sesu/og",
    keywords: [
      "Sesu",
      "dil ve konuşma terapisi",
      "artikülasyon",
      "kekemelik",
      "afazi",
      "konuşma terapisi uygulaması",
    ],
  }),
  title: { absolute: TITLE },
  other: {
    "apple-itunes-app": "app-id=6789215821",
  },
};

const moduller = [
  {
    ad: "Artikülasyon",
    metin: "20 hedef Türkçe ses. Sıra: izole ses, hece, sözcük, cümle.",
  },
  {
    ad: "Kekemelik",
    metin: "Van Riper kekemelik modifikasyonu ve akıcılık şekillendirme.",
  },
  {
    ad: "Afazi",
    metin: "Yetişkinler için afazi modülü.",
  },
  {
    ad: "Sosyal iletişim",
    metin: "Otizm ve sosyal iletişim modülü.",
  },
];

const ozellikler = [
  "2.767 etkinlik, tamamı çevrimdışı",
  "PDF ilerleme raporu ve haftalık özet",
  "Günlük plan, yıldızlar, seriler ve rozetler",
  "Ücretsiz, reklamsız; abonelik ve uygulama içi satın alma yok",
];

const adimlar = [
  {
    baslik: "Hedefi terapist seçer",
    metin: "Hangi sesle başlanacağı, kekemelik, afazi ya da sosyal iletişim çalışması seansta belirlenir.",
  },
  {
    baslik: "Seans arasında evde tekrar",
    metin: "Aile, günlük plandaki etkinliği evde açar. İnternet gerekmez.",
  },
  {
    baslik: "Kaydı birlikte dinlersiniz",
    metin: "Doğru, yakın ya da henüz değil kararını terapist veya veli verir.",
  },
  {
    baslik: "Rapor bir sonraki seansa gelir",
    metin: "PDF ilerleme raporu ve haftalık özet seansa taşınır.",
  },
];

function Magazalar() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={APP_STORE}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      >
        {/* Resmi rozet; yeniden kodlanmasın diye next/image kullanılmıyor. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/sesu/app-store-tr.svg"
          alt="App Store'dan indirin"
          width={182}
          height={48}
          className="h-12 w-auto"
        />
      </a>
      <a
        href={GOOGLE_PLAY}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/sesu/google-play-tr.png"
          alt="Google Play'den indirin"
          width={124}
          height={48}
          className="h-12 w-auto"
        />
      </a>
    </div>
  );
}

export default function SesuPage() {
  return (
    <PageShell
      eyebrow="Mobil uygulama"
      title="Sesu: Dil ve Konuşma Terapisi"
      subtitle="Dil ve konuşma terapistlerinin seans arasında verdiği ev ödevini, her gün tekrar edilebilen Türkçe bir pratiğe dönüştürür. Aileler aynı uygulamayı evde kullanır."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          mobileApplicationJsonLd({
            name: "Sesu: Dil ve Konuşma Terapisi",
            description: DESCRIPTION,
            url: absoluteUrl("/sesu"),
            image: absoluteUrl("/sesu/sesu-icon.png"),
            operatingSystem: "iOS, Android",
            applicationCategory: "HealthApplication",
            inLanguage: "tr",
            downloadUrl: [APP_STORE, GOOGLE_PLAY],
          }),
        )}
      />

      <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-8 md:p-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start">
          <Image
            src="/sesu/sesu-icon.png"
            alt="Sesu uygulama simgesi"
            width={96}
            height={96}
            className="rounded-[22px]"
            priority
          />
          <div className="min-w-0 flex-1">
            <p className="text-2xl font-semibold text-[var(--fg)]">Sesu</p>
            <p className="mt-1 text-[var(--fg-muted)]">
              Ücretsiz · Reklamsız · Çevrimdışı
            </p>
            <p className="mt-4 max-w-2xl text-[var(--fg)] leading-relaxed">
              iPhone, iPad ve Android için.{" "}
              <strong>Sesu terapiyi destekler, yerine geçmez.</strong>
            </p>
            <div className="mt-6">
              <Magazalar />
            </div>
            <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <a
                href={PRODUCT_SITE}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                Ürün sitesi
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                Instagram: @sesu.app
              </a>
            </p>
          </div>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {ozellikler.map((o) => (
            <li key={o} className="flex gap-3 text-[var(--fg)]">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
              <span>{o}</span>
            </li>
          ))}
        </ul>
      </div>

      <section className="mt-14" aria-labelledby="moduller-baslik">
        <h2
          id="moduller-baslik"
          className="text-2xl font-semibold tracking-tight text-[var(--fg)]"
        >
          Çalışma alanları
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {moduller.map((m) => (
            <article key={m.ad} className="card rounded-lg p-6">
              <h3 className="font-medium text-[var(--fg)]">{m.ad}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">
                {m.metin}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="terapistler-baslik">
        <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-2">
          Terapistler için
        </div>
        <h2
          id="terapistler-baslik"
          className="text-2xl md:text-3xl font-semibold tracking-tight text-[var(--fg)]"
        >
          Seans arası ev ödevi
        </h2>
        <p className="mt-4 max-w-3xl text-[var(--fg-muted)] leading-relaxed">
          Uygulama seansın yerini almaz. Terapist hedefi koyar; aile seans
          arasında tekrar eder; karar ve rapor bir sonraki seansa döner.
        </p>

        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {adimlar.map((a, i) => (
            <li key={a.baslik} className="card rounded-lg p-6">
              <div className="font-mono text-xs text-[var(--accent)]">
                0{i + 1}
              </div>
              <h3 className="mt-2 font-medium text-[var(--fg)]">{a.baslik}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">
                {a.metin}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <article className="card rounded-lg p-6">
            <h3 className="font-medium text-[var(--fg)]">Klinik karar</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">
              Klinik karar terapistte ve velidedir. Sesu otomatik puan
              üretmez; doğru, yakın ya da henüz değil ayrımını siz yaparsınız.
            </p>
          </article>
          <article className="card rounded-lg p-6">
            <h3 className="font-medium text-[var(--fg)]">KVKK</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">
              Hesap yok. Ses kayıtları cihazda kalır, sunucuya gitmez.
              Uygulamada reklam ve analitik SDK yoktur.
            </p>
          </article>
        </div>
      </section>

      <section className="mt-16 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-8 md:p-10">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--fg)]">
          Geri bildirim
        </h2>
        <p className="mt-3 max-w-2xl text-[var(--fg-muted)] leading-relaxed">
          Bir modül, bir ses ya da rapordaki bir ayrıntı için yazın.
        </p>
        <div className="mt-6">
          <MailAction
            email={profile.email}
            subject="Sesu — geri bildirim"
            label={profile.email}
            variant="primary"
          />
        </div>
        <div className="mt-8">
          <Magazalar />
        </div>
      </section>
    </PageShell>
  );
}
