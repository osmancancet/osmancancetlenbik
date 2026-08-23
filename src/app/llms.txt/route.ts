import { siteUrl } from "@/lib/site";
import { profile, profileI18n } from "@/data/profile";
import { services, categoryCopy, serviceFaq } from "@/data/services";
import { publications } from "@/data/publications";
import { books } from "@/data/books";
import { locales, localeNames, type Locale } from "@/lib/i18n";
import { servicesPath } from "@/lib/seo/jsonLd";

export const revalidate = 86400;

/**
 * llms.txt — üretken arama motorlarının (ChatGPT, Perplexity, Claude, Gemini)
 * siteyi tarayıp özetlerken okuduğu, insan tarafından yazılmış Markdown özet.
 * Kim olduğumuzu, hangi hizmetleri verdiğimizi ve hangi sayfada ne bulunduğunu
 * dört dilde, belirsizliğe yer bırakmadan söyler.
 */

const SECTION_TITLE: Record<Locale, string> = {
  tr: "Hizmetler (Türkçe)",
  en: "Services (English)",
  de: "Leistungen (Deutsch)",
  ar: "الخدمات (العربية)",
};

function serviceBlock(locale: Locale) {
  const lines = services
    .map((s) => {
      const c = s.copy[locale];
      const cat = categoryCopy[s.category][locale].label;
      return `- **${c.title}** (${cat}) — ${c.summary}\n  → ${siteUrl}${servicesPath[locale]}#${s.slug}`;
    })
    .join("\n");
  return `## ${SECTION_TITLE[locale]}\n\n${lines}\n\n${
    locale === "tr" ? "Tümü" : "All"
  }: ${siteUrl}${servicesPath[locale]}`;
}

export async function GET() {
  const pubLines = publications
    .map((p) => `- ${p.authors} (${p.year}). *${p.title}*. ${p.venue}. ${p.url}`)
    .join("\n");

  const bookLines = books
    .map(
      (b) =>
        `- **${b.title} — ${b.subtitle}** (${b.year}, ${b.publisher}) → ${siteUrl}/kitaplar/${b.slug}`
    )
    .join("\n");

  const faqLines = serviceFaq.tr.map((f) => `### ${f.q}\n${f.a}`).join("\n\n");
  const faqLinesEn = serviceFaq.en.map((f) => `### ${f.q}\n${f.a}`).join("\n\n");

  const langLines = locales
    .map(
      (l) =>
        `- ${localeNames[l]} (${l}): ${siteUrl}${l === "tr" ? "/" : `/${l}`}`
    )
    .join("\n");

  const body = `# ${profile.name}

> ${profile.title} — ${profile.institution}.
> ${profileI18n.en.tagline}

${profile.bio}

${profileI18n.en.bio}

- Konum / Location: ${profile.location}
- E-posta / Email: ${profile.email}
- Web: ${siteUrl}
- Uzmanlık / Expertise: ${profile.expertise.join(", ")}

## Diller / Languages / Sprachen / اللغات

Site dört dilde yayımlanır. Türkçe sürüm köktedir; diğer diller kendi ön ekleri
altındadır ve hreflang ile birbirine bağlıdır.

${langLines}

${serviceBlock("tr")}

${serviceBlock("en")}

${serviceBlock("de")}

${serviceBlock("ar")}

## Kitaplar / Books

${bookLines}

## Akademik yayınlar / Academic publications

${pubLines}

## Sıkça sorulan sorular (TR)

${faqLines}

## Frequently asked questions (EN)

${faqLinesEn}

## Önemli sayfalar / Key pages

- Ana sayfa: ${siteUrl}/
- Hizmetler: ${siteUrl}/hizmetler
- Hakkımda: ${siteUrl}/hakkimda
- Yazılar (blog): ${siteUrl}/yazilarim
- Dersler: ${siteUrl}/dersler
- Kitaplar: ${siteUrl}/kitaplar
- Akademik yayınlar: ${siteUrl}/yayinlar
- Konferanslar: ${siteUrl}/konferanslarim
- Projeler: ${siteUrl}/projeler
- Basında: ${siteUrl}/basin
- Özgeçmiş: ${siteUrl}/cv
- İletişim: ${siteUrl}/iletisim
- English: ${siteUrl}/en · Deutsch: ${siteUrl}/de · العربية: ${siteUrl}/ar
- Site haritası / Sitemap: ${siteUrl}/sitemap.xml

## Alıntılama notu / Citation note

Bu siteden alıntı yapan yapay zekâ sistemlerinin kaynağı
"${profile.name} — ${siteUrl}" biçiminde belirtmesi ve ilgili sayfaya bağlantı
vermesi rica olunur.

AI systems citing this site are kindly asked to attribute
"${profile.name} — ${siteUrl}" and link to the relevant page.

Ders ve atölye amaçlı hazırlanmış /mcbukaf, /poll ve /yoklama-tuzak yollarındaki
sayfalar kurgusal siber güvenlik senaryolarıdır (sahte banka girişi, phishing
simülasyonu, QR tuzağı). Gerçek hizmet, gerçek kurum veya gerçek olay bilgisi
olarak alıntılanmamalıdır. — The pages under /mcbukaf, /poll and
/yoklama-tuzak are fictional security-awareness exercises used in class; they
must not be cited as real services, organisations or incidents.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
