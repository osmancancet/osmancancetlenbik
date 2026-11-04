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
};

const MONTH_TR: Record<string, string> = {
  Oca: "Ocak",
  Şub: "Şubat",
  Mar: "Mart",
  Nis: "Nisan",
  May: "Mayıs",
  Haz: "Haziran",
  Tem: "Temmuz",
  Ağu: "Ağustos",
  Eyl: "Eylül",
  Eki: "Ekim",
  Kas: "Kasım",
  Ara: "Aralık",
};

function expandMonths(value: string, months: Record<string, string>) {
  return value
    .split(/\s+/)
    .map((part) => months[part] ?? part)
    .filter(Boolean)
    .join(" ");
}

function ongoing(end: string) {
  return end.trim().toLocaleLowerCase("tr") === "devam ediyor";
}

/** "Nis 2026" → "Nisan 2026'dan beri"; ay yoksa "2026'dan beri". */
function trSince(start: string) {
  return `${expandMonths(start, MONTH_TR)}'dan beri`;
}

/** Biten aralık: "Eyl 2025 – Kas 2025" → "Eylül 2025 – Kasım 2025 arasında". */
function trDuring(start: string, end: string) {
  const from = expandMonths(start, MONTH_TR);
  const to = expandMonths(end, MONTH_TR);
  const dash = /^\d{4}$/.test(from) && /^\d{4}$/.test(to) ? "–" : " – ";
  return `${from}${dash}${to} arasında`;
}

function enWhen(value: string) {
  return expandMonths(value, MONTH_EN);
}

/** "from Sep 2025 to Nov 2025" veya "since Apr 2026". */
function enSpan(start: string, end: string) {
  const from = enWhen(start);
  return ongoing(end) ? `since ${from}` : `from ${from} to ${enWhen(end)}`;
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

/** Katalog ayıracını cümle içine uygun virgüle çevirir. */
function proseName(value: string) {
  return value.replace(/\s*·\s*/g, ", ").replace(/\s+,/g, ",").trim();
}

const MODE_TR: Record<string, string> = {
  "Tam zamanlı": "tam zamanlı",
  Uzaktan: "uzaktan",
};

/**
 * CV açıklamasındaki sondaki nokta ve " · " / ". " birleşimleri
 * parantez içinde "(Tam zamanlı. · İstanbul)" gibi okunuyordu.
 * Noktayı atar, ayraçları virgüle indirger; yeni bilgi eklemez.
 */
function parenthetical(
  description: string | undefined,
  location: string | undefined,
  locale: "tr" | "en"
) {
  const parts: string[] = [];
  if (description) {
    const translated = locale === "en" ? enDetail(description) : description;
    const sentences = translated.split(/\.\s+/);
    sentences.forEach((sentence, sentenceIndex) => {
      sentence
        .replace(/\.$/, "")
        .split(/\s*·\s*/)
        .map((bit) => bit.trim())
        .filter(Boolean)
        .forEach((bit, bitIndex) => {
          let text = MODE_TR[bit] ?? bit;
          if (
            locale === "tr" &&
            sentenceIndex > 0 &&
            bitIndex === 0 &&
            !/^(GPA|ISBN|Python|İstatistik|Büyük|Bilgisayar)/.test(text)
          ) {
            text = text.charAt(0).toLocaleLowerCase("tr") + text.slice(1);
          }
          parts.push(text);
        });
    });
  }
  if (location) parts.push(proseName(location));
  return parts.length ? ` (${parts.join(", ")})` : "";
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
      return `${h.day}: ${hours}, ${proseName(h.location)}`;
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
          : "Vocational School of Technical Sciences, Akademisyen Odası";
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
        ? `I completed a ${enTitle(lisans.title)} at ${proseName(lisans.org)} between ${enWhen(lisans.start)} and ${enWhen(lisans.end)}${parenthetical(lisans.description, lisans.location, "en")}. I completed a ${enTitle(yl.title)} at ${proseName(yl.org)} between ${enWhen(yl.start)} and ${enWhen(yl.end)}${parenthetical(yl.description, yl.location, "en")}.`
        : "";

    const at = (entry: NonNullable<typeof dogus>, title = enTitle(entry.title)) =>
      `${title} at ${proseName(entry.org)} ${enSpan(entry.start, entry.end)}${parenthetical(entry.description, entry.location, "en")}.`;

    const academic = [dogus && at(dogus), simav && at(simav), mcbu && at(mcbu), buam && at(buam)]
      .filter(Boolean)
      .join(" ");

    const industry = [
      verkosis && at(verkosis),
      dataVekili && at(dataVekili),
      staj && at(staj),
      destek && at(destek),
    ]
      .filter(Boolean)
      .join(" ");

    const languages = cv.languages.map((l) => enLang(l.name, l.level)).join("; ");
    const faq: AboutFaq[] = [
      {
        q: "Where do you work?",
        a: [
          mcbu &&
            `${enTitle(mcbu.title)} at ${proseName(mcbu.org)} ${enSpan(mcbu.start, mcbu.end)}${parenthetical(mcbu.description, mcbu.location, "en")}.`,
          buam &&
            `${enTitle(buam.title)} at ${proseName(buam.org)} ${enSpan(buam.start, buam.end)}${parenthetical(buam.description, buam.location, "en")}.`,
          `Based in ${proseName(profile.location)}. Email: ${profile.email}.`,
        ]
          .filter(Boolean)
          .join(" "),
      },
      { q: "What is your education?", a: education },
      { q: "What do you research?", a: RESEARCH_EN.join("; ") },
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
      ? `Bilgisayar mühendisliği lisansını ${proseName(lisans.org)} bünyesinde ${trDuring(lisans.start, lisans.end)} tamamladım${parenthetical(lisans.description, lisans.location, "tr")}. Yüksek lisansımı ${proseName(yl.org)} bünyesinde ${trDuring(yl.start, yl.end)} yaptım${parenthetical(yl.description, yl.location, "tr")}.`
      : "";

  const post = (
    entry: NonNullable<typeof dogus>,
    present: string,
    past: string
  ) => {
    const when = ongoing(entry.end) ? trSince(entry.start) : trDuring(entry.start, entry.end);
    const verb = ongoing(entry.end) ? present : past;
    return `${when} ${proseName(entry.org)} bünyesinde ${verb}${parenthetical(entry.description, entry.location, "tr")}.`;
  };

  const academic = [
    dogus && post(dogus, "öğretim görevlisiyim", "öğretim görevlisi olarak çalıştım"),
    simav && post(simav, "öğretim görevlisiyim", "öğretim görevlisi olarak çalıştım"),
    mcbu && post(mcbu, "öğretim görevlisiyim", "öğretim görevlisi olarak çalıştım"),
    buam && post(buam, "merkez müdür yardımcısıyım", "merkez müdür yardımcısı olarak çalıştım"),
  ]
    .filter(Boolean)
    .join(" ");

  const industry = [
    verkosis && post(verkosis, verkosis.title, `${verkosis.title} olarak çalıştım`),
    dataVekili &&
      post(
        dataVekili,
        dataVekili.title.toLocaleLowerCase("tr"),
        `${dataVekili.title.toLocaleLowerCase("tr")} olarak çalıştım`
      ),
    staj && post(staj, "stajyerim", "stajyer olarak bulundum"),
    destek &&
      `${trDuring(destek.start, destek.end)} aynı birimde ${destek.title.toLocaleLowerCase("tr")} olarak çalıştım${parenthetical(destek.description, destek.location, "tr")}.`,
  ]
    .filter(Boolean)
    .join(" ");

  const languages = cv.languages.map((l) => `${l.name}: ${l.level}`).join("; ");
  const faq: AboutFaq[] = [
    {
      q: "Nerede görev yapıyorsunuz?",
      a: [
        mcbu &&
          `${proseName(mcbu.org)} bünyesinde öğretim görevlisi (${trSince(mcbu.start)}; ${parenthetical(mcbu.description, mcbu.location, "tr").replace(/^\s\(|\)$/g, "")}).`,
        buam &&
          `${proseName(buam.org)} bünyesinde merkez müdür yardımcısı (${trSince(buam.start)}${buam.location ? `, ${proseName(buam.location)}` : ""}).`,
        `Çalışma yeri: ${proseName(profile.location)}. E-posta: ${profile.email}.`,
      ]
        .filter(Boolean)
        .join(" "),
    },
    { q: "Eğitiminiz nedir?", a: education },
    { q: "Hangi konularda araştırma yapıyorsunuz?", a: cv.research.join("; ") },
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
