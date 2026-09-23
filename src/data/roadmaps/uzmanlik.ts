import type { Roadmap } from "./types";
import { C, R } from "./resources";

/** Kıdemli roller için haritalar. */
export const uzmanlikRoadmaps: Roadmap[] = [
  {
    slug: "yazilim-mimarisi",
    title: "Yazılım Mimarisi",
    summary: "Tasarım desenleri, dağıtık sistemler, sistem tasarımı ve mimari kararlar.",
    description:
      "Kod düzeyinden sistem düzeyine: SOLID ve tasarım desenleri, alan odaklı tasarım, mikroservisler ve olay tabanlı mimari, ölçeklenebilirlik, kalite nitelikleri ve mimari karar kayıtları.",
    icon: "Building2",
    category: "uzmanlik",
    level: "İleri",
    duration: "12+ ay",
    roles: ["Yazılım mimarı", "Kıdemli / staff mühendis", "Çözüm mimarı"],
    prerequisites: ["backend", "bilgisayar-bilimi-temelleri"],
    related: ["devops", "bulut-bilisim", "teknik-liderlik"],
    tools: ["C4 modeli", "UML", "ADR", "Kafka", "Kubernetes"],
    stages: [
      {
        title: "Kod tasarımı",
        summary: "Değiştirilebilir kod.",
        topics: ["SOLID ilkeleri", "Tasarım desenleri (GoF)", "Temiz kod ve yeniden düzenleme", "Test edilebilir tasarım"],
        resources: [{ title: "Refactoring.Guru", provider: "Refactoring.Guru", url: "https://refactoring.guru", kind: "dokuman", free: true, lang: "tr" }],
      },
      {
        title: "Mimari stiller",
        summary: "Doğru yapıyı seçmek.",
        topics: ["Katmanlı ve hexagonal mimari", "Modüler monolit", "Mikroservisler", "Olay tabanlı mimari ve CQRS", "Sunucusuz mimari"],
      },
      {
        title: "Alan odaklı tasarım",
        summary: "Yazılımı işe hizalamak.",
        topics: ["Ortak dil (ubiquitous language)", "Sınırlı bağlam (bounded context)", "Aggregate ve entity", "Bağlam haritalama"],
      },
      {
        title: "Sistem tasarımı",
        summary: "Milyonlarca kullanıcı için.",
        topics: ["Ölçeklenebilirlik ve yük dengeleme", "Önbellek katmanları", "Veritabanı bölümleme ve replikasyon", "Tutarlılık modelleri", "Hız sınırlama, kuyruk, geri basınç"],
        resources: [
          { title: "System Design Primer", provider: "Donne Martin", url: "https://github.com/donnemartin/system-design-primer", kind: "dokuman", free: true, lang: "en" },
          R.ddia,
        ],
        project: "URL kısaltıcı, sohbet uygulaması ve haber akışı için yazılı sistem tasarımları.",
      },
      {
        title: "Kalite nitelikleri ve karar",
        summary: "Ödünleşimleri görünür kılmak.",
        topics: ["Performans, güvenilirlik, güvenlik, maliyet", "Mimari karar kayıtları (ADR)", "C4 ile dokümantasyon", "Well-Architected incelemeleri", "Teknik borç yönetimi"],
      },
    ],
    resources: [
      { title: "Martin Fowler — makaleler", provider: "martinfowler.com", url: "https://martinfowler.com", kind: "dokuman", free: true, lang: "en" },
      { title: "The Twelve-Factor App", provider: "12factor.net", url: "https://12factor.net/tr/", kind: "dokuman", free: true, lang: "tr" },
      { title: "AWS Well-Architected Framework", provider: "AWS", url: "https://aws.amazon.com/architecture/well-architected/", kind: "dokuman", free: true, lang: "en" },
      R.ddia,
      R.btk,
    ],
    certifications: [C.isaqb, C.awsSaa, C.togaf],
    keywords: ["yazılım mimarisi", "sistem tasarımı", "mikroservis", "tasarım desenleri", "software architect"],
  },
  {
    slug: "teknik-liderlik",
    title: "Teknik Liderlik",
    summary: "Kıdemli mühendislikten tech lead ve mühendislik yöneticiliğine geçiş.",
    description:
      "Ekip içinde teknik yön belirleme, kod inceleme kültürü, mentorluk, çevik süreçler, proje planlama, paydaş iletişimi, işe alım ve mühendislik metrikleri.",
    icon: "Users",
    category: "uzmanlik",
    level: "İleri",
    duration: "Sürekli",
    roles: ["Tech lead", "Mühendislik yöneticisi", "Staff mühendis"],
    prerequisites: ["yazilim-mimarisi"],
    related: ["yazilim-mimarisi", "devops"],
    tools: ["Jira / Linear", "RFC ve tasarım dokümanları", "DORA metrikleri"],
    stages: [
      {
        title: "Teknik yön",
        summary: "Ekibin nereye gittiği.",
        topics: ["RFC ve tasarım dokümanı yazma", "Kod inceleme kültürü", "Teknik borcu önceliklendirme", "Standartlar ve yönergeler"],
      },
      {
        title: "İnsanlar",
        summary: "Ekibi büyütmek.",
        topics: ["Birebir görüşmeler", "Mentorluk ve koçluk", "Geri bildirim verme", "İşe alım mülakatları", "Psikolojik güvenlik"],
      },
      {
        title: "Süreç ve teslimat",
        summary: "Öngörülebilir teslim.",
        topics: ["Scrum ve Kanban", "Tahminleme ve planlama", "DORA metrikleri", "Olay sonrası kültür"],
      },
      {
        title: "Paydaşlar",
        summary: "Ürün ve iş ile ortak dil.",
        topics: ["Ürün yöneticisiyle çalışma", "Teknik konuyu teknik olmayanlara anlatma", "Yol haritası müzakeresi", "Yazılı iletişim"],
      },
    ],
    resources: [
      { title: "StaffEng", provider: "Will Larson", url: "https://staffeng.com", kind: "dokuman", free: true, lang: "en" },
      R.btk,
    ],
    certifications: [],
    keywords: ["tech lead", "mühendislik yöneticisi", "teknik liderlik", "staff engineer"],
  },
];
