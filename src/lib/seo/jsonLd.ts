import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";
import { services, categoryCopy } from "@/data/services";
import type { Locale } from "@/lib/i18n";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: profile.name,
    alternateName: "Osman Can Cetlenbik",
    jobTitle: profile.title,
    description: profile.tagline,
    email: profile.email,
    url: siteUrl,
    image: `${siteUrl}/profile.png`,
    sameAs: [profile.socials.github, profile.socials.linkedin],
    worksFor: {
      "@type": "CollegeOrUniversity",
      name: profile.institution,
      department: profile.department,
    },
    knowsAbout: profile.expertise,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Manisa",
      addressCountry: "TR",
    },
  };
}

export function articleJsonLd(args: {
  title: string;
  description: string;
  url: string;
  datePublished: Date;
  dateModified: Date;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.title,
    description: args.description,
    url: args.url,
    datePublished: args.datePublished.toISOString(),
    dateModified: args.dateModified.toISOString(),
    image: args.image,
    author: {
      "@type": "Person",
      name: profile.name,
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: profile.name,
    },
  };
}

export function courseJsonLd(args: {
  title: string;
  description: string;
  url: string;
  program: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: args.title,
    description: args.description,
    url: args.url,
    provider: {
      "@type": "CollegeOrUniversity",
      name: profile.institution,
    },
    educationalCredentialAwarded: args.program,
  };
}

export function bookJsonLd(args: {
  title: string;
  description: string;
  url: string;
  image: string;
  isbn: string;
  publisher: string;
  pages: number;
  year: string;
  /** Satış sayfaları — Google kitabı bu sayfalarla ilişkilendirir. */
  storeUrls: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: args.title,
    description: args.description,
    url: args.url,
    image: args.image,
    isbn: args.isbn,
    numberOfPages: args.pages,
    datePublished: args.year,
    bookFormat: "https://schema.org/Paperback",
    inLanguage: "tr",
    author: {
      "@type": "Person",
      name: profile.name,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: args.publisher,
    },
    workExample: args.storeUrls.map((u) => ({
      "@type": "Book",
      isbn: args.isbn,
      bookFormat: "https://schema.org/Paperback",
      potentialAction: {
        "@type": "ReadAction",
        target: u,
      },
    })),
  };
}

export function eventJsonLd(args: {
  title: string;
  description: string;
  url: string;
  startDate: Date;
  location: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: args.title,
    description: args.description,
    url: args.url,
    startDate: args.startDate.toISOString(),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: args.location,
    },
    performer: {
      "@type": "Person",
      name: profile.name,
    },
  };
}

export function jsonLdScript(data: object) {
  return {
    __html: JSON.stringify(data),
  };
}

/* ─── Kurumsal / hizmet yapısal verisi ────────────────────────────────
   Google zengin sonuçları ve üretken arama motorları (GEO) için: kim,
   ne yapıyor, nerede, hangi hizmetlerle — makine okunur biçimde. */

/** Site genelinde tek sefer basılır — arama kutusu ve site kimliği. */
export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: profile.name,
    inLanguage: ["tr-TR", "en", "de", "ar"],
    description: profile.tagline,
    publisher: { "@id": `${siteUrl}/#person` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/yazilarim?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

const SERVICE_CATALOG_NAME: Record<Locale, string> = {
  tr: "Hizmetler",
  en: "Services",
  de: "Leistungen",
  ar: "الخدمات",
};

const SERVICE_ENTITY: Record<Locale, { name: string; description: string }> = {
  tr: {
    name: "Osman Can Çetlenbik — Siber Güvenlik ve Yazılım Geliştirme",
    description:
      "Web ve mobil sızma testi, mobil ve web uygulama geliştirme, veri & yapay zekâ çözümleri ve kurumsal siber güvenlik eğitimi.",
  },
  en: {
    name: "Osman Can Çetlenbik — Cyber Security & Software Development",
    description:
      "Web and mobile penetration testing, mobile and web application development, data & AI solutions, and corporate cyber security training.",
  },
  de: {
    name: "Osman Can Çetlenbik — Cybersicherheit & Softwareentwicklung",
    description:
      "Penetrationstests für Web und Mobil, App- und Webentwicklung, Daten- und KI-Lösungen sowie Cybersicherheitsschulungen für Unternehmen.",
  },
  ar: {
    name: "عثمان جان تشتلنبيك — الأمن السيبراني وتطوير البرمجيات",
    description:
      "اختبار اختراق للويب والهاتف، وتطوير تطبيقات الهاتف والويب، وحلول البيانات والذكاء الاصطناعي، وتدريب الشركات على الأمن السيبراني.",
  },
};

/** Her dilin hizmet sayfası yolu — JSON-LD ve derin bağlantılar için. */
export const servicesPath: Record<Locale, string> = {
  tr: "/hizmetler",
  en: "/en/services",
  de: "/de/leistungen",
  ar: "/ar/services",
};

/** Hizmet veren tüzel kişilik — "yakınımdaki sızma testi" tipi sorgular için. */
export function professionalServiceJsonLd(locale: Locale = "tr") {
  const entity = SERVICE_ENTITY[locale];
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#service`,
    name: entity.name,
    description: entity.description,
    url: `${siteUrl}${servicesPath[locale]}`,
    image: `${siteUrl}/profile.png`,
    email: profile.email,
    founder: { "@id": `${siteUrl}/#person` },
    provider: { "@id": `${siteUrl}/#person` },
    areaServed: [
      { "@type": "Country", name: "Türkiye" },
      { "@type": "Country", name: "Turkey" },
    ],
    availableLanguage: ["tr", "en", "de", "ar"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Manisa",
      addressRegion: "Manisa",
      addressCountry: "TR",
    },
    knowsAbout: profile.expertise,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: SERVICE_CATALOG_NAME[locale],
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.copy[locale].title,
          description: s.copy[locale].summary,
          serviceType: categoryCopy[s.category][locale].label,
          url: `${siteUrl}${servicesPath[locale]}#${s.slug}`,
          provider: { "@id": `${siteUrl}/#person` },
          areaServed: { "@type": "Country", name: "Türkiye" },
        },
      })),
    },
  };
}

export function faqJsonLd(items: ReadonlyArray<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

/** Kırıntı yolu — Google sonuç listesinde URL yerine hiyerarşi gösterir. */
export function breadcrumbJsonLd(
  trail: ReadonlyArray<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${siteUrl}${t.path === "/" ? "" : t.path}`,
    })),
  };
}
