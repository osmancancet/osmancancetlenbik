export type ProjectCategory = "mobil" | "web" | "veri" | "oyun" | "kit";

export type Project = {
  name: string;
  description: string;
  url: string;
  live?: string;
  tags: string[];
  category: ProjectCategory;
  featured?: boolean;
};

export const categoryLabels: Record<ProjectCategory, string> = {
  mobil: "Mobil",
  web: "Web",
  veri: "Veri & Yapay Zekâ",
  oyun: "Oyun",
  kit: "Üretim Kiti",
};

export const projects: Project[] = [
  // ─── Öne çıkanlar ───────────────────────────────────────────────
  {
    name: "Akadema",
    description:
      "Eğitim, özel ders ve koçluk platformu. Tek kod tabanından web, iOS ve Android; ekranların büyük kısmı paylaşılıyor, backend uçtan uca tip güvenli.",
    url: "https://github.com/osmancancet/ders-platform",
    tags: ["Next.js", "Expo", "tRPC", "Prisma"],
    category: "mobil",
    featured: true,
  },
  {
    name: "Paratik",
    description:
      "Fişi fotoğrafla, harcaman kendiliğinden girsin. OCR cihazın üzerinde çalışır — iOS'ta Apple Vision — veri telefondan çıkmaz.",
    url: "https://github.com/osmancancet/harcamatakip",
    tags: ["Expo", "OCR", "Çevrimdışı"],
    category: "mobil",
    featured: true,
  },
  {
    name: "GeoRush",
    description:
      "Neon kareyi zıplatarak engellerden kaçtığın hyper-casual sonsuz koşu oyunu. Zorlaşan seviyeler, coin ekonomisi ve skin dükkânı.",
    url: "https://github.com/osmancancet/georush",
    tags: ["Expo", "React Native", "TypeScript"],
    category: "oyun",
    featured: true,
  },
  {
    name: "TIKLA(MA)!",
    description:
      "Sosyal mühendislik farkındalığı için interaktif simülasyon platformu. Aynı adlı kitabın dijital eşlikçisi.",
    url: "https://github.com/osmancancet/tiklama",
    live: "https://hackleme-sanati.vercel.app",
    tags: ["Next.js", "Siber Güvenlik", "İnteraktif"],
    category: "web",
    featured: true,
  },

  // ─── Mobil ──────────────────────────────────────────────────────
  {
    name: "Sweeply",
    description:
      "Galerini sağa-sola kaydırarak temizle. Sil/Tut kararını kategori kategori ver, çöpü toplu boşalt.",
    url: "https://github.com/osmancancet/sweeply-build",
    tags: ["Expo", "React Native", "i18n"],
    category: "mobil",
  },

  // ─── Web ────────────────────────────────────────────────────────
  {
    name: "BiKareBırak",
    description:
      "Dijital düğün asistanı. Davetiye, galeri ve QR ile misafirlerden fotoğraf toplama.",
    url: "https://github.com/osmancancet/bikarebirak",
    live: "https://bikarebirak.vercel.app",
    tags: ["Next.js", "Firebase"],
    category: "web",
  },
  {
    name: "Lua Coffee",
    description:
      "Kahve dükkânı tanıtım sitesi ve QR okutarak katılınan fotoğraf yarışması.",
    url: "https://github.com/osmancancet/luacoffee",
    live: "https://luacoffee.vercel.app",
    tags: ["Next.js", "Supabase"],
    category: "web",
  },
  {
    name: "Dijital Enderun",
    description:
      "İnteraktif eğitim ve farkındalık platformu; animasyonlu öğrenme akışları.",
    url: "https://github.com/osmancancet/dijitalenderun",
    live: "https://dijitalenderun.vercel.app",
    tags: ["Next.js", "React 19", "Framer Motion"],
    category: "web",
  },
  {
    name: "Soma Umut Metal",
    description:
      "Hurda ve metal geri dönüşüm firması için kurumsal site; WhatsApp üzerinden teklif akışı.",
    url: "https://github.com/osmancancet/soma-umut-metal",
    live: "https://soma-umut-metal.vercel.app",
    tags: ["Next.js", "Tailwind", "SEO"],
    category: "web",
  },
  {
    name: "PatiVet",
    description:
      "Veteriner klinikleri için SaaS yönetim sistemi. Randevu, hasta kaydı, tıbbi geçmiş; rol bazlı yetki ve AES-256 şifreleme.",
    url: "https://github.com/osmancancet/pativet",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    category: "web",
  },
  {
    name: "BilgeBulut",
    description:
      "Çok kiracılı okul yönetim SaaS'ı. DDD mimarisi, JWT kimlik doğrulama.",
    url: "https://github.com/osmancancet/bilgebulut",
    tags: ["NestJS", "Prisma", "DDD"],
    category: "web",
  },

  // ─── Veri & Yapay Zekâ ──────────────────────────────────────────
  {
    name: "Anadolu Medeniyetleri",
    description:
      "Tarihî kaynakları ve arkeolojik alanları interaktif haritada derleyen; arkeolojik tahmin modellemesiyle buluntu potansiyeli üreten akademik araştırma aracı.",
    url: "https://github.com/osmancancet/googlealtin",
    tags: ["Harita", "Modelleme", "Akademik"],
    category: "veri",
  },
  {
    name: "Swift Algo X",
    description:
      "BIST hisseleri için sinyal üretimi ve backtest botu. Yayınlanan metodolojinin Python'da yeniden inşası — emir göndermez, karar destek amaçlıdır.",
    url: "https://github.com/osmancancet/switfalgo",
    tags: ["Python", "Backtest", "BIST"],
    category: "veri",
  },
  {
    name: "BIST Analiz",
    description:
      "Borsa İstanbul hisseleri için teknik analiz ve sinyal üreten analiz platformu.",
    url: "https://github.com/osmancancet/bist-analiz",
    tags: ["Next.js", "Finans", "Recharts"],
    category: "veri",
  },
  {
    name: "Crypto Trading Engine",
    description:
      "Sekiz teknik analiz stratejisinin konsensüsüyle karar veren kripto alım-satım botu.",
    url: "https://github.com/osmancancet/crypto-trading-engine",
    tags: ["Python", "FastAPI", "CCXT"],
    category: "veri",
  },
  {
    name: "Lidera El İşleri",
    description:
      "Amatör el işi fotoğraflarını profesyonel ürün görseline çeviren, başlık ve hashtag üreten içerik hattı. Tamamen yerel çalışır, API ücreti yok.",
    url: "https://github.com/osmancancet/lideraelisleri",
    tags: ["Python", "Görüntü İşleme", "Otomasyon"],
    category: "veri",
  },
  {
    name: "Linyit Müşteri Bulucu",
    description:
      "Google Haritalar üzerinden linyit tüketen işletmeleri bulup iletişim bilgilerini Excel'e yazan potansiyel müşteri tarayıcısı.",
    url: "https://github.com/osmancancet/linyit-musteri-bulucu",
    tags: ["Python", "Veri Toplama", "Excel"],
    category: "veri",
  },

  // ─── Oyun ───────────────────────────────────────────────────────
  {
    name: "MiniMart 3D",
    description:
      "Unity ile geliştirilen 3B market işletme simülasyonu.",
    url: "https://github.com/osmancancet/unity-minimart-3d-pro-v3",
    tags: ["Unity", "C#", "3D"],
    category: "oyun",
  },

  // ─── Üretim kitleri ─────────────────────────────────────────────
  {
    name: "Oyun Fabrikası",
    description:
      "Hyper-casual oyunları seri üretmek için yeniden kullanılabilir başlangıç kiti; ortak motor, araçlar ve yayın runbook'u.",
    url: "https://github.com/osmancancet/game-factory",
    tags: ["Kit", "Expo", "Runbook"],
    category: "kit",
  },
  {
    name: "App Fabrikası",
    description:
      "Çevrimdışı öncelikli, sıfır altyapı maliyetli Expo uygulama üretim deseni ve mağazaya çıkış runbook'u.",
    url: "https://github.com/osmancancet/app-factory",
    tags: ["Kit", "Expo", "Yayın"],
    category: "kit",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
