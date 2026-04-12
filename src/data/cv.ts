export type CVEntry = {
  title: string;
  org: string;
  start: string;
  end: string;
  description?: string;
  location?: string;
};

export type CVPublication = {
  title: string;
  venue: string;
  year: string;
};

export type CVData = {
  summary: string;
  research: string[];
  education: CVEntry[];
  experience: CVEntry[];
  publications: CVPublication[];
  awards: { title: string; org: string; year: string }[];
  skills: { category: string; items: string[] }[];
  languages: { name: string; level: string }[];
};

export const cv: CVData = {
  summary:
    "Bilgisayar mühendisi ve öğretim görevlisi. Hem endüstri (yazılım mühendisliği, makine öğrenmesi, veri analizi) hem de akademi tarafında çalıştı. Şu anda siber güvenlik, doğal dil işleme, makine öğrenmesi ve açıklanabilir yapay zekâ alanlarında akademik araştırmalar yürütüyor; çalışmaları uluslararası konferans ve dergilerde yayımlanıyor.",

  research: [
    "Siber Güvenlik (Phishing tespiti, IoT güvenliği, sosyal mühendislik)",
    "Doğal Dil İşleme (Transformer tabanlı modeller — RoBERTa)",
    "Makine Öğrenmesi & Açıklanabilir Yapay Zekâ (XAI)",
    "Finansal Veri Bilimi (Kripto para piyasaları için tahmin modelleri)",
  ],

  education: [
    {
      title: "Yüksek Lisans · Bilgisayar Mühendisliği",
      org: "Isparta Uygulamalı Bilimler Üniversitesi",
      start: "Şub 2023",
      end: "Şub 2025",
      description: "GPA: 3.93 / 4.00 — Yüksek Onur",
      location: "Isparta",
    },
    {
      title: "Lisans · Bilgisayar Mühendisliği",
      org: "Süleyman Demirel Üniversitesi",
      start: "2018",
      end: "2022",
      description: "GPA: 2.98 / 4.00",
      location: "Isparta",
    },
  ],

  experience: [
    {
      title: "Öğretim Görevlisi",
      org: "Manisa Celal Bayar Üniversitesi · Teknik Bilimler MYO",
      start: "Nis 2026",
      end: "Devam ediyor",
      description:
        "İstatistik Bölümü · Büyük Veri Analistliği Programı.",
      location: "Manisa",
    },
    {
      title: "Öğretim Görevlisi",
      org: "Kütahya Dumlupınar Üniversitesi · Simav MYO",
      start: "Ara 2025",
      end: "Nis 2026",
      location: "Simav, Kütahya",
    },
    {
      title: "Öğretim Görevlisi",
      org: "Doğuş Üniversitesi",
      start: "Eyl 2025",
      end: "Kas 2025",
      description: "Tam zamanlı.",
      location: "İstanbul",
    },
    {
      title: "Software Engineer",
      org: "Verkosis Bilgi Teknolojileri",
      start: "Şub 2024",
      end: "Oca 2025",
      description:
        "Tam zamanlı · Uzaktan. Makine öğrenimi ve veri analizi odaklı yazılım geliştirme.",
      location: "Isparta",
    },
    {
      title: "Bilgisayar Mühendisi",
      org: "Data Vekili",
      start: "Şub 2023",
      end: "Haz 2023",
      description:
        "Tam zamanlı · Uzaktan. Python tabanlı geliştirme, bilgi güvenliği uygulamaları.",
    },
    {
      title: "Teknik Destek (Yarı Zamanlı)",
      org: "Süleyman Demirel Üniversitesi · Bilgi İşlem Daire Başkanlığı",
      start: "Eki 2021",
      end: "Ara 2021",
      location: "Isparta",
    },
    {
      title: "Stajyer",
      org: "Süleyman Demirel Üniversitesi · Bilgi İşlem Daire Başkanlığı",
      start: "Eyl 2021",
      end: "Eki 2021",
      location: "Isparta",
    },
  ],

  publications: [
    {
      title:
        "Using Explainable Artificial Intelligence in Buy and Sell Signals in the Cryptocurrency Market",
      venue: "ICCAR 2025 — 4th Int. Conference on Contemporary Academic Research",
      year: "2025",
    },
    {
      title: "IoT Security and Software Testing",
      venue: "Yalvaç Akademi Dergisi, Cilt 9 — DOI: 10.57120/yalvac.1437571",
      year: "2024",
    },
    {
      title:
        "Hybrid Approaches to Price Prediction in Cryptocurrency Markets: Machine Learning and Technical Analysis",
      venue: "ICEANS 2024 — 5th Int. Conference on Engineering and Applied Natural Sciences",
      year: "2024",
    },
    {
      title: "Classification of Phishing Attacks Using the RoBERTa Model",
      venue: "ICIAS 2024 — 4th Int. Conference on Innovative Academic Studies",
      year: "2024",
    },
    {
      title:
        "Examining the Results of Phishing Attacks in a Sample Attack Simulation",
      venue: "ICIAS 2022 — 1st Int. Conference on Innovative Academic Studies",
      year: "2022",
    },
  ],

  awards: [
    {
      title: "Yüksek Lisans · Yüksek Onur (GPA 3.93)",
      org: "Isparta Uygulamalı Bilimler Üniversitesi",
      year: "2025",
    },
  ],

  skills: [
    {
      category: "Programlama Dilleri",
      items: ["Python", "TypeScript", "JavaScript", "Go", "C#"],
    },
    {
      category: "Yapay Zekâ & Veri",
      items: [
        "PyTorch",
        "Hugging Face Transformers",
        "scikit-learn",
        "Pandas",
        "NumPy",
      ],
    },
    {
      category: "Web & Backend",
      items: ["Next.js", "React", "Node.js", "Prisma", "PostgreSQL"],
    },
    {
      category: "Altyapı & Araçlar",
      items: ["Docker", "Linux", "Git", "Vercel", "REST APIs"],
    },
  ],

  languages: [
    { name: "Türkçe", level: "Anadil" },
    { name: "İngilizce", level: "İleri (B2/C1)" },
  ],
};
