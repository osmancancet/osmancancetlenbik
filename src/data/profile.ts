import type { Locale } from "@/lib/i18n";

export const profile = {
  name: "Osman Can Çetlenbik",
  title: "Öğretim Görevlisi · Büyük Veri Analistliği",
  institution:
    "Manisa Celal Bayar Üniversitesi · Teknik Bilimler Meslek Yüksekokulu",
  department: "İstatistik Bölümü · Büyük Veri Analistliği Programı",
  tagline:
    "Büyük veri, yapay zekâ ve yazılım geliştirme alanlarında öğreten ve üreten bir akademisyen.",
  bio: "Manisa Celal Bayar Üniversitesi Teknik Bilimler Meslek Yüksekokulu, İstatistik Bölümü, Büyük Veri Analistliği Programı'nda öğretim görevlisiyim. Büyük veri analitiği, yapay zekâ, web ve mobil programlama, IoT güvenliği ve açık kaynak sistemler üzerine dersler veriyor; akademik çalışmalar yürütüyorum. Üretmeyi, öğrenmeyi ve öğretmeyi seviyorum.",
  location: "Manisa · Türkiye",
  email: "osman.cetlenbik@cbu.edu.tr",
  website: "https://www.osmancancetlenbik.com",
  socials: {
    github: "https://github.com/osmancancet",
    linkedin: "https://linkedin.com/in/osmancancetlenbik",
    /** Tarayıcıda açılan Gmail yazma ekranı. Düz `mailto:` bağlantısı,
     *  e-posta istemcisi tanımlı olmayan cihazlarda hiçbir şey yapmadığı için
     *  arayüzde `<MailAction>` kullanılıyor; bu alan yalnızca dışa verilen
     *  bağlantılar (JSON-LD, paylaşım) için duruyor. */
    email:
      "https://mail.google.com/mail/?view=cm&fs=1&to=osman.cetlenbik@cbu.edu.tr",
  },
  expertise: [
    "Siber Güvenlik",
    "Doğal Dil İşleme",
    "Makine Öğrenmesi",
    "Açıklanabilir Yapay Zekâ",
    "IoT Güvenliği",
    "Veri Bilimi",
  ],
  stats: [
    { label: "Verdiği Dersler", value: 7, suffix: "" },
    { label: "Akademik Yayın", value: 5, suffix: "" },
    { label: "GitHub Projesi", value: 6, suffix: "+" },
    { label: "Yıl Deneyim", value: 8, suffix: "+" },
  ] as ReadonlyArray<{ label: string; value: number; suffix: string }>,
};

/** Sayfa metinlerinin dört dilli karşılığı. Türkçe alanlar `profile` üzerinde
 *  kalır; burada tek bir haritada toplanır ki bileşenler `profileI18n[locale]`
 *  diyebilsin. */
export type ProfileCopy = {
  title: string;
  institution: string;
  department: string;
  tagline: string;
  bio: string;
  location: string;
  expertise: readonly string[];
  statLabels: readonly string[];
};

export const profileI18n: Record<Locale, ProfileCopy> = {
  tr: {
    title: profile.title,
    institution: profile.institution,
    department: profile.department,
    tagline: profile.tagline,
    bio: profile.bio,
    location: profile.location,
    expertise: profile.expertise,
    statLabels: profile.stats.map((s) => s.label),
  },
  en: {
    title: "Lecturer · Big Data Analytics",
    institution:
      "Manisa Celal Bayar University · Vocational School of Technical Sciences",
    department: "Department of Statistics · Big Data Analytics Programme",
    tagline:
      "An academic who teaches and builds across big data, artificial intelligence and software engineering.",
    bio: "I am a lecturer in the Big Data Analytics Programme at the Department of Statistics, Vocational School of Technical Sciences, Manisa Celal Bayar University. I teach big data analytics, artificial intelligence, web and mobile programming, IoT security and open-source systems, and I run academic research alongside consulting work. Building, learning and teaching are the three things I keep coming back to.",
    location: "Manisa · Türkiye",
    expertise: [
      "Cyber Security",
      "Natural Language Processing",
      "Machine Learning",
      "Explainable AI",
      "IoT Security",
      "Data Science",
    ],
    statLabels: [
      "Courses Taught",
      "Academic Publications",
      "GitHub Projects",
      "Years of Experience",
    ],
  },
  de: {
    title: "Dozent · Big Data Analytics",
    institution:
      "Manisa Celal Bayar Universität · Berufsfachhochschule für Technische Wissenschaften",
    department: "Fachbereich Statistik · Studiengang Big Data Analytics",
    tagline:
      "Ein Akademiker, der in den Bereichen Big Data, künstliche Intelligenz und Softwareentwicklung lehrt und baut.",
    bio: "Ich bin Dozent im Studiengang Big Data Analytics am Fachbereich Statistik der Berufsfachhochschule für Technische Wissenschaften der Manisa Celal Bayar Universität. Ich unterrichte Big-Data-Analytik, künstliche Intelligenz, Web- und Mobilprogrammierung, IoT-Sicherheit und Open-Source-Systeme und verbinde akademische Forschung mit Beratungsprojekten. Bauen, Lernen und Lehren sind die drei Dinge, zu denen ich immer wieder zurückkehre.",
    location: "Manisa · Türkei",
    expertise: [
      "Cybersicherheit",
      "Sprachverarbeitung",
      "Maschinelles Lernen",
      "Erklärbare KI",
      "IoT-Sicherheit",
      "Data Science",
    ],
    statLabels: [
      "Gelehrte Kurse",
      "Wissenschaftliche Publikationen",
      "GitHub-Projekte",
      "Jahre Erfahrung",
    ],
  },
  ar: {
    title: "محاضر · تحليلات البيانات الضخمة",
    institution:
      "جامعة مانيسا جلال بايار · كلية العلوم التقنية المهنية",
    department: "قسم الإحصاء · برنامج تحليلات البيانات الضخمة",
    tagline:
      "أكاديمي يُدرّس ويبني في مجالات البيانات الضخمة والذكاء الاصطناعي وهندسة البرمجيات.",
    bio: "أعمل محاضرًا في برنامج تحليلات البيانات الضخمة بقسم الإحصاء في كلية العلوم التقنية المهنية بجامعة مانيسا جلال بايار. أُدرّس تحليلات البيانات الضخمة والذكاء الاصطناعي وبرمجة الويب والهاتف وأمن إنترنت الأشياء والأنظمة مفتوحة المصدر، وأجمع بين البحث الأكاديمي والعمل الاستشاري. البناء والتعلّم والتعليم ثلاثة أمور أعود إليها دائمًا.",
    location: "مانيسا · تركيا",
    expertise: [
      "الأمن السيبراني",
      "معالجة اللغات الطبيعية",
      "تعلّم الآلة",
      "الذكاء الاصطناعي القابل للتفسير",
      "أمن إنترنت الأشياء",
      "علم البيانات",
    ],
    statLabels: [
      "المقررات المُدرَّسة",
      "المنشورات الأكاديمية",
      "مشاريع GitHub",
      "سنوات الخبرة",
    ],
  },
};

/** Kısa yol — footer gibi yalnızca sloganı gösteren yerler için. */
export const profileTaglines: Record<Locale, string> = {
  tr: profileI18n.tr.tagline,
  en: profileI18n.en.tagline,
  de: profileI18n.de.tagline,
  ar: profileI18n.ar.tagline,
};
