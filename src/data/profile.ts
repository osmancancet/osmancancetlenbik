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
  email: "osmancancetlenbik@gmail.com",
  website: "https://www.osmancancetlenbik.com",
  socials: {
    github: "https://github.com/osmancancet",
    linkedin: "https://linkedin.com/in/osmancancetlenbik",
    email: "mailto:osmancancetlenbik@gmail.com",
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
