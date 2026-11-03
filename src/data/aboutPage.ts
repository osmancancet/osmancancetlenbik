import { books } from "@/data/books";
import { cv } from "@/data/cv";
import { officeHours } from "@/data/officeHours";
import { profile } from "@/data/profile";
import { publications } from "@/data/publications";

/**
 * Hakkımda sayfasının uzun metni. Cümleler yalnızca bu depodaki kayıtlardan
 * kurulur (profile, cv, publications, books, officeHours). Yeni unvan, tarih
 * veya kurum eklenmez; İngilizce metin aynı kayıtların çevirisidir.
 */

export type AboutFaq = { q: string; a: string };

export type AboutExtra = {
  paragraphs: string[];
  researchTitle: string;
  research: readonly string[];
  publicationsTitle: string;
  publications: { title: string; detail: string }[];
  book: string | null;
  languages: string;
  expertise: string;
  skillGroups: { category: string; items: string }[];
  stats: string;
  faqTitle: string;
  faq: AboutFaq[];
};

const RESEARCH_EN = [
  "Cyber security (phishing detection, IoT security, social engineering)",
  "Natural language processing (transformer-based models — RoBERTa)",
  "Machine learning and explainable artificial intelligence (XAI)",
  "Financial data science (prediction models for cryptocurrency markets)",
] as const;

const SKILL_CATEGORY_EN: Record<string, string> = {
  "Programlama Dilleri": "Programming languages",
  "Yapay Zekâ & Veri": "AI and data",
  "Web & Backend": "Web and backend",
  "Altyapı & Araçlar": "Infrastructure and tools",
};

const MONTH_EN: Record<string, string> = {
  Oca: "Jan",
  Şub: "Feb",
  Mar: "Mar",
  Nis: "Apr",
  May: "May",
  Haz: "Jun",
  Tem: "Jul",
  Ağu: "Aug",
  Eyl: "Sep",
  Eki: "Oct",
  Kas: "Nov",
  Ara: "Dec",
  Devam: "present",
  ediyor: "",
};

function enWhen(value: string) {
  return value
    .split(/\s+/)
    .map((part) => MONTH_EN[part] ?? part)
    .filter(Boolean)
    .join(" ")
    .replace(/\s+–\s+/g, " – ");
}

function enDetail(description?: string) {
  if (!description) return "";
  return description
    .replaceAll("Yüksek Onur", "high honor")
    .replaceAll("Tam zamanlı", "full-time")
    .replaceAll("Uzaktan", "remote")
    .replaceAll(
      "Makine öğrenimi ve veri analizi odaklı yazılım geliştirme.",
      "software development focused on machine learning and data analysis."
    )
    .replaceAll(
      "Python tabanlı geliştirme, bilgi güvenliği uygulamaları.",
      "Python development and information-security applications."
    )
    .replaceAll(
      "İstatistik Bölümü · Büyük Veri Analistliği Programı.",
      "Department of Statistics · Big Data Analytics Programme."
    );
}

function enTitle(title: string) {
  switch (title) {
    case "Öğretim Görevlisi":
      return "Lecturer";
    case "Merkez Müdür Yardımcısı":
      return "Deputy director";
    case "Bilgisayar Mühendisi":
      return "Computer engineer";
    case "Teknik Destek (Yarı Zamanlı)":
      return "Part-time technical support";
    case "Stajyer":
      return "Intern";
    case "Software Engineer":
      return "Software engineer";
    case "Yüksek Lisans · Bilgisayar Mühendisliği":
      return "master's degree in computer engineering";
    case "Lisans · Bilgisayar Mühendisliği":
      return "bachelor's degree in computer engineering";
    default:
      return title;
  }
}

function enLang(name: string, level: string) {
  const n = name === "Türkçe" ? "Turkish" : name === "İngilizce" ? "English" : name;
  const l = level.replace("Anadil", "native").replace("İleri", "advanced");
  return `${n} — ${l}`;
}

function findExp(match: (org: string, title: string) => boolean) {
  return cv.experience.find((e) => match(e.org, e.title));
}

const book = books.find((b) => b.slug === "tikla-ma");
const articleCount = publications.filter((p) => p.type === "Makale").length;
const paperCount = publications.filter((p) => p.type === "Bildiri").length;
const [courseStat, publicationStat, projectStat, yearStat] = profile.stats;

function statPair(value: number, suffix: string) {
  return `${value}${suffix}`;
}

const publicationItems = publications.map((p) => ({
  title: p.title,
  detail: `${p.venue} · ${p.year} · ${p.type}`,
}));

const publicationItemsEn = publications.map((p) => ({
  title: p.title,
  detail: `${p.venue} · ${p.year} · ${p.type === "Makale" ? "article" : "conference paper"}`,
}));

function officeTr() {
  return officeHours
    .map((h) => {
      const hours = h.end ? `${h.start}–${h.end}` : h.start;
      return `${h.day}: ${hours}, ${h.location}`;
    })
    .join("; ");
}

function officeEn() {
  return officeHours
    .map((h) => {
      const day =
        h.day === "Pazartesi" ? "Monday" : h.day === "Çarşamba" ? "Wednesday" : "Online";
      const hours = h.end ? `${h.start}–${h.end}` : "by appointment";
      const where =
        h.day === "Çevrim içi"
          ? "contact by email"
          : "Vocational School of Technical Sciences · Akademisyen Odası";
      return `${day}: ${hours}, ${where}`;
    })
    .join("; ");
}

function build(locale: "tr" | "en"): AboutExtra {
  const mcbu = findExp(
    (org, title) => title === "Öğretim Görevlisi" && org.includes("Teknik Bilimler MYO")
  );
  const simav = findExp((org) => org.includes("Simav"));
  const dogus = findExp((org) => org.includes("Doğuş"));
  const buam = findExp((org) => org.includes("BUAM"));
  const verkosis = findExp((org) => org.includes("Verkosis"));
  const dataVekili = findExp((org) => org.includes("Data Vekili"));
  const staj = findExp((_, title) => title === "Stajyer");
  const destek = findExp(
    (org, title) => title.startsWith("Teknik Destek") && org.includes("Bilgi İşlem")
  );
  const lisans = cv.education.find((e) => e.title.startsWith("Lisans ·"));
  const yl = cv.education.find((e) => e.title.startsWith("Yüksek Lisans"));

  const bookTr = book
    ? `${book.year} yılında ${book.publisher} etiketiyle ${book.title} — ${book.subtitle} yayımlandı (${book.edition}, ${book.pages} sayfa, ISBN ${book.isbn}). ${book.excerpt}`
    : null;
  const bookEn = book
    ? `In ${book.year}, ${book.publisher} published ${book.title} — ${book.subtitle} (${book.edition.replace("1. Baskı", "1st edition")}, ${book.pages} pages, ISBN ${book.isbn}). Attackers hack people, not systems. The book covers the psychology, technique and defence of social engineering across 30 realistic cases.`
    : null;

  if (locale === "en") {
    const education =
      lisans && yl
        ? `I completed a ${enTitle(lisans.title)} at ${lisans.org} between ${enWhen(lisans.start)} and ${enWhen(lisans.end)} (${enDetail(lisans.description)}${lisans.location ? `, ${lisans.location}` : ""}). I completed a ${enTitle(yl.title)} at ${yl.org} between ${enWhen(yl.start)} and ${enWhen(yl.end)} (${enDetail(yl.description)}${yl.location ? `, ${yl.location}` : ""}).`
        : "";

    const academic = [
      dogus &&
        `${enTitle(dogus.title)} at ${dogus.org}, ${enWhen(dogus.start)} – ${enWhen(dogus.end)} (${[enDetail(dogus.description), dogus.location].filter(Boolean).join(" · ")}).`,
      simav &&
        `${enTitle(simav.title)} at ${simav.org}, ${enWhen(simav.start)} – ${enWhen(simav.end)}${simav.location ? `, ${simav.location}` : ""}.`,
      mcbu &&
        `${enTitle(mcbu.title)} at ${mcbu.org} since ${enWhen(mcbu.start)} (${[enDetail(mcbu.description), mcbu.location].filter(Boolean).join(" · ")}).`,
      buam &&
        `${enTitle(buam.title)} of ${buam.org} since ${enWhen(buam.start)}${buam.location ? `, ${buam.location}` : ""}.`,
    ]
      .filter(Boolean)
      .join(" ");

    const industry = [
      verkosis &&
        `${enTitle(verkosis.title)} at ${verkosis.org}, ${enWhen(verkosis.start)} – ${enWhen(verkosis.end)} (${[enDetail(verkosis.description), verkosis.location].filter(Boolean).join(" · ")}).`,
      dataVekili &&
        `${enTitle(dataVekili.title)} at ${dataVekili.org}, ${enWhen(dataVekili.start)} – ${enWhen(dataVekili.end)} (${enDetail(dataVekili.description)}).`,
      staj &&
        `${enTitle(staj.title)} at ${staj.org}, ${enWhen(staj.start)} – ${enWhen(staj.end)}${staj.location ? `, ${staj.location}` : ""}.`,
      destek &&
        `${enTitle(destek.title)} at ${destek.org}, ${enWhen(destek.start)} – ${enWhen(destek.end)}${destek.location ? `, ${destek.location}` : ""}.`,
    ]
      .filter(Boolean)
      .join(" ");

    const languages = cv.languages.map((l) => enLang(l.name, l.level)).join("; ");
    const faq: AboutFaq[] = [
      {
        q: "Where do you work?",
        a: [
          mcbu &&
            `${enTitle(mcbu.title)} at ${mcbu.org} (${enWhen(mcbu.start)} – ${enWhen(mcbu.end)}; ${[enDetail(mcbu.description), mcbu.location].filter(Boolean).join(" · ")}).`,
          buam &&
            `${enTitle(buam.title)} of ${buam.org} (${enWhen(buam.start)} – ${enWhen(buam.end)}${buam.location ? `, ${buam.location}` : ""}).`,
          `Based in ${profile.location}. Email: ${profile.email}.`,
        ]
          .filter(Boolean)
          .join(" "),
      },
      { q: "What is your education?", a: education },
      { q: "What do you research?", a: RESEARCH_EN.join(" ") },
      { q: "Have you published a book?", a: bookEn ?? "" },
      {
        q: "Which languages do you speak, and when are office hours?",
        a: `${languages}. Office hours: ${officeEn()}.`,
      },
    ].filter((item) => item.a.length > 0);

    return {
      paragraphs: [education, academic, industry].filter(Boolean),
      researchTitle: "Research",
      research: RESEARCH_EN,
      publicationsTitle: "Publications",
      publications: publicationItemsEn,
      book: bookEn,
      languages: `${languages}.`,
      expertise:
        "The tags below are the fields named on this site. The CV lists the same topics as research areas, and the tools come from the skill groups recorded there.",
      skillGroups: cv.skills.map((g) => ({
        category: SKILL_CATEGORY_EN[g.category] ?? g.category,
        items: g.items.join(", "),
      })),
      stats: `The figures on this page are the profile summary: ${statPair(courseStat.value, courseStat.suffix)} courses taught, ${statPair(publicationStat.value, publicationStat.suffix)} academic publications, ${statPair(projectStat.value, projectStat.suffix)} GitHub projects and ${statPair(yearStat.value, yearStat.suffix)} years of experience. Of the publications recorded in the site data, ${articleCount} are articles and ${paperCount} are conference papers.`,
      faqTitle: "Frequently asked questions",
      faq,
    };
  }

  const education =
    lisans && yl
      ? `Bilgisayar mühendisliği lisansını ${lisans.org} bünyesinde ${lisans.start}–${lisans.end} arasında tamamladım (${lisans.description}${lisans.location ? `, ${lisans.location}` : ""}). Yüksek lisansımı ${yl.org} bünyesinde ${yl.start} – ${yl.end} arasında yaptım (${yl.description}${yl.location ? `, ${yl.location}` : ""}).`
      : "";

  const academic = [
    dogus &&
      `${dogus.start} – ${dogus.end} arasında ${dogus.org} bünyesinde ${dogus.title.toLocaleLowerCase("tr")} olarak çalıştım (${[dogus.description, dogus.location].filter(Boolean).join(" · ")}).`,
    simav &&
      `${simav.start} – ${simav.end} arasında ${simav.org} bünyesinde ${simav.title.toLocaleLowerCase("tr")} olarak görev yaptım${simav.location ? ` (${simav.location})` : ""}.`,
    mcbu &&
      `${mcbu.start} tarihinden beri ${mcbu.org} bünyesinde öğretim görevlisiyim (${[mcbu.description, mcbu.location].filter(Boolean).join(" · ")}).`,
    buam &&
      `${buam.start} tarihinden beri ${buam.org} bünyesinde merkez müdür yardımcısıyım${buam.location ? ` (${buam.location})` : ""}.`,
  ]
    .filter(Boolean)
    .join(" ");

  const industry = [
    verkosis &&
      `${verkosis.start} – ${verkosis.end} arasında ${verkosis.org} bünyesinde ${verkosis.title} olarak çalıştım (${[verkosis.description, verkosis.location].filter(Boolean).join(" · ")}).`,
    dataVekili &&
      `${dataVekili.start} – ${dataVekili.end} arasında ${dataVekili.org} bünyesinde ${dataVekili.title.toLocaleLowerCase("tr")} olarak çalıştım (${dataVekili.description}).`,
    staj &&
      `${staj.start} – ${staj.end} arasında ${staj.org} bünyesinde stajyer olarak bulundum${staj.location ? ` (${staj.location})` : ""}.`,
    destek &&
      `${destek.start} – ${destek.end} arasında aynı birimde ${destek.title.toLocaleLowerCase("tr")} olarak çalıştım${destek.location ? ` (${destek.location})` : ""}.`,
  ]
    .filter(Boolean)
    .join(" ");

  const languages = cv.languages.map((l) => `${l.name}: ${l.level}`).join("; ");
  const faq: AboutFaq[] = [
    {
      q: "Nerede görev yapıyorsunuz?",
      a: [
        mcbu &&
          `${mcbu.org} bünyesinde öğretim görevlisi (${mcbu.start} – ${mcbu.end}; ${[mcbu.description, mcbu.location].filter(Boolean).join(" · ")}).`,
        buam &&
          `${buam.org} bünyesinde merkez müdür yardımcısı (${buam.start} – ${buam.end}${buam.location ? `, ${buam.location}` : ""}).`,
        `Çalışma yeri: ${profile.location}. E-posta: ${profile.email}.`,
      ]
        .filter(Boolean)
        .join(" "),
    },
    { q: "Eğitiminiz nedir?", a: education },
    { q: "Hangi konularda araştırma yapıyorsunuz?", a: cv.research.join(" ") },
    { q: "Yayımlanmış bir kitabınız var mı?", a: bookTr ?? "" },
    {
      q: "Hangi dilleri biliyorsunuz ve ofis saatleri nedir?",
      a: `${languages}. Ofis saatleri: ${officeTr()}.`,
    },
  ].filter((item) => item.a.length > 0);

  return {
    paragraphs: [education, academic, industry].filter(Boolean),
    researchTitle: "Araştırma",
    research: cv.research,
    publicationsTitle: "Yayınlar",
    publications: publicationItems,
    book: bookTr,
    languages: `${languages}.`,
    expertise:
      "Aşağıdaki etiketler sitede yazan uzmanlık alanlarıdır. Özgeçmişte aynı başlıklar araştırma konuları olarak durur; araçlar da orada kayıtlı beceri gruplarından gelir.",
    skillGroups: cv.skills.map((g) => ({
      category: g.category,
      items: g.items.join(", "),
    })),
    stats: `Bu sayfadaki sayılar profil özetidir: ${statPair(courseStat.value, courseStat.suffix)} ders, ${statPair(publicationStat.value, publicationStat.suffix)} akademik yayın, ${statPair(projectStat.value, projectStat.suffix)} GitHub projesi ve ${statPair(yearStat.value, yearStat.suffix)} yıl deneyim. Sitede kayıtlı yayınların ${articleCount} tanesi makale, ${paperCount} tanesi konferans bildirisidir.`,
    faqTitle: "Sık sorulan sorular",
    faq,
  };
}

export function aboutExtra(locale: string): AboutExtra | null {
  if (locale !== "tr" && locale !== "en") return null;
  return build(locale);
}
