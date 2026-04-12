import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    email: profile.email,
    url: siteUrl,
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
