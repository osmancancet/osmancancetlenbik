export type Project = {
  name: string;
  description: string;
  url: string;
  tags: string[];
  accent: "purple" | "cyan" | "pink";
};

export const projects: Project[] = [
  {
    name: "pativet",
    description:
      "Veteriner klinikleri için modern SaaS yönetim sistemi. Randevu, hasta kaydı, tıbbi geçmiş.",
    url: "https://github.com/osmancancet/pativet",
    tags: ["Next.js", "Prisma", "SaaS"],
    accent: "purple",
  },
  {
    name: "bilgebulut",
    description:
      "Bulut tabanlı bilgi yönetimi ve doküman platformu. Yapay zekâ destekli arama.",
    url: "https://github.com/osmancancet/bilgebulut",
    tags: ["AI", "Cloud", "Search"],
    accent: "cyan",
  },
  {
    name: "crypto-trading-engine",
    description:
      "Kripto para borsaları için algoritmik alım-satım motoru. Backtest ve canlı trading.",
    url: "https://github.com/osmancancet/crypto-trading-engine",
    tags: ["Python", "Trading", "ML"],
    accent: "pink",
  },
  {
    name: "bist-analiz",
    description:
      "Borsa İstanbul hisseleri için teknik analiz ve sinyal üreten araç seti.",
    url: "https://github.com/osmancancet/bist-analiz",
    tags: ["Finans", "Analiz", "Veri"],
    accent: "purple",
  },
  {
    name: "dijitalenderun",
    description:
      "Dijital eğitim ve farkındalık projesi. İnteraktif öğrenme deneyimleri.",
    url: "https://github.com/osmancancet/dijitalenderun",
    tags: ["Eğitim", "Web", "İnteraktif"],
    accent: "cyan",
  },
  {
    name: "osmancancet",
    description:
      "GitHub profil README'i. Kişisel bio, öne çıkan çalışmalar ve istatistikler.",
    url: "https://github.com/osmancancet",
    tags: ["Profile", "Markdown"],
    accent: "pink",
  },
];
