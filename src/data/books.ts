/**
 * Kitaplar.
 *
 * Satış linkleri elle doğrulandı (bkz. her mağazanın yanındaki not).
 * Yeni bir satış noktası eklerken `stores` dizisine bir satır eklemek yeterli —
 * sayfa otomatik olarak listeler.
 *
 * FİYAT NOTU: mağaza fiyatları sürekli değişiyor, bu yüzden sayfada tek tek
 * gösterilmiyor. Yalnızca yayınevinin etiket fiyatı (`listPrice`) referans
 * olarak duruyor.
 */

export type BookStore = {
  name: string;
  url: string;
};

export type BookHighlight = {
  /** lucide-react ikon adı — components/sections/BookDetail.tsx'te eşleniyor. */
  icon: string;
  label: string;
};

/**
 * Basın kiti — /kitaplar/<slug>/basin-kiti adresinde yayınlanır.
 *
 * GİZLİ SAYFA: navbar'da, sitemap'te ve site içi aramada yok; sayfa
 * `robots: { index: false, follow: false }` ile arama motorlarına kapalı.
 * Yalnızca linki bilen ulaşır. Amaç gazeteciye tek link göndermek.
 */
export type BookPressKit = {
  /** Habere doğrudan yapıştırılabilecek kısa tanıtım. */
  shortPitch: string;
  /** Uzun basın metni. */
  longPitch: string[];
  /** Kitabın hangi açılardan haber olabileceği — muhabire fikir verir. */
  angles: { title: string; text: string }[];
  /** Basın bültenlerinde kullanılacak yazar tanıtımı. */
  authorBio: string;
  /** public/ altına konulacak örnek bölüm PDF'i. Dosya eklenmeden verilmemeli. */
  sampleChapterUrl?: string;
};

export type Book = {
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  cover: string;
  coverAlt: string;
  publisher: string;
  isbn: string;
  pages: number;
  year: string;
  edition: string;
  dimensions: string;
  paper: string;
  listPrice: string;
  /** Kart ve meta açıklaması için tek cümlelik özet. */
  excerpt: string;
  /** Kitap sayfasındaki tanıtım paragrafları. */
  description: string[];
  /** Kapaktaki sekiz konu başlığı. */
  highlights: BookHighlight[];
  /** Künye satırı olarak gösterilen kısa vurgular. */
  keyFacts: string[];
  stores: BookStore[];
  featured?: boolean;
  pressKit?: BookPressKit;
};

export const books: Book[] = [
  {
    slug: "tikla-ma",
    title: "Tıkla(ma)",
    subtitle: "İnsan Zihnini Hackleme Sanatı",
    tagline: "Düşünmeden tıklama, çünkü sen hedefsin.",
    cover: "/kitaplar/tikla-ma-kapak.jpg",
    coverAlt:
      "Tıkla(ma) — İnsan Zihnini Hackleme Sanatı kitabının kapağı: sahte polis çağrısı gösteren bir telefon, karanlık bir odada bilgisayar başındaki kapüşonlu figür ve beyaz maske.",
    publisher: "Kodlab Yayın Dağıtım",
    isbn: "9786256677418",
    pages: 136,
    year: "2026",
    edition: "1. Baskı",
    dimensions: "15 × 21 cm",
    paper: "1. Hamur",
    listPrice: "275,00 ₺",
    excerpt:
      "Saldırganlar sistemleri değil insanları hackliyor. 30 gerçekçi vaka üzerinden sosyal mühendisliğin psikolojisi, tekniği ve savunması.",
    description: [
      "Siber saldırıların çoğu bir yazılım açığından değil, bir insan kararından başlıyor. Korku, aciliyet, merak ve güven — saldırganın gerçekte kullandığı araçlar bunlar. Bu kitap, o araçların nasıl işlediğini anlatıyor.",
      "Otuz farklı gerçekçi vaka üzerinden ilerliyoruz: sahte polis ve banka aramaları, patron kimliğine bürünen kurumsal e-postalar, otoparkta bırakılmış zehirli USB bellekler, sahte Wi-Fi ağları, sesli klonlama ve deepfake reklamları, kargo ve alışveriş tuzakları, fidye yazılımları, sahte teknik destek, kimlik hırsızlığı ve SIM kart saldırıları, kötü niyetli QR kodlar ve sahte uygulamalar.",
      "Her vaka üç katmanda çözülüyor: saldırı senaryosunun kendisi, arkasındaki psikolojik mekanizma ve uygulanabilir bir savunma protokolü. Amaç korkutmak değil, tanıdık geldiğinde durup düşünmeyi sağlayan refleksi kazandırmak.",
      "Bölümlerdeki QR kodlar okuru interaktif simülasyonlara götürüyor: saldırıyı okumakla kalmıyor, güvenli bir ortamda bizzat deneyimliyorsunuz.",
    ],
    highlights: [
      { icon: "Phone", label: "Telefon Dolandırıcılığı" },
      { icon: "Mail", label: "Sahte E-posta Tuzakları" },
      { icon: "Usb", label: "Zehirli USB & Fiziksel Saldırılar" },
      { icon: "AudioLines", label: "Sesli Klonlama & Deepfake" },
      { icon: "QrCode", label: "QR Kod & Sahte Uygulamalar" },
      { icon: "CreditCard", label: "Kimlik Hırsızlığı & IBAN Tuzakları" },
      { icon: "ShieldCheck", label: "Savunma Protokolleri" },
      { icon: "Gamepad2", label: "İnteraktif Simülasyonlar" },
    ],
    keyFacts: [
      "30 gerçekçi vaka",
      "Psikolojik ve teknik analiz",
      "Savunma protokolleri",
      "QR kodlarla interaktif simülasyon",
    ],
    /**
     * Tümü tek tek açılıp ISBN 9786256677418 ile doğrulandı.
     * Sayfada Türkçe alfabeye göre sıralanıyor (bkz. BookDetail.tsx) —
     * hiçbir mağaza öne çıkarılmıyor, buradaki sıra önemsiz.
     */
    stores: [
      {
        name: "D&R",
        url: "https://www.dr.com.tr/kitap/tiklama-insan-zihnini-hackleme-sanati/osman-can-cetlenbik/egitim-ve-sinav-kitaplari/bilgisayar-kitaplari/diger/urunno=0002236596001",
      },
      {
        name: "Ekin Kitap",
        url: "https://www.ekinkitap.com/tikla-ma-insan-zihnini-hackleme-sanati",
      },
      {
        name: "Hepsiburada",
        url: "https://www.hepsiburada.com/tikla-ma-insan-zihnini-hackleme-sanati-pm-HBC0000GUJ0JQ",
      },
      {
        name: "İstanbul Kitapçısı",
        url: "https://www.istanbulkitapcisi.com/tiklama-insan-zihnini-hackleme-sanati",
      },
      {
        name: "Kitapova",
        url: "https://www.kitapova.com/tikla-ma-insan-zihnini-hackleme-sanati",
      },
      {
        name: "Kitapseç",
        url: "https://www.kitapsec.com/Products/Tiklama-Insan-Zihnini-Hackleme-Sanati-Kodlab-Yayin-Dagitim-946459.html",
      },
      {
        name: "Kitapsepeti",
        url: "https://www.kitapsepeti.com/tiklama-insan-zihnini-hackleme-sanati",
      },
      {
        name: "Kodlab",
        url: "https://www.kodlab.com/ana-sayfa/719-Alo-Ben-Polis-9786256677418.html",
      },
      {
        name: "Nadir Kitap",
        url: "https://www.nadirkitap.com/tikla-ma-insan-zihnini-hackleme-sanati-osman-can-cetlenbik-kodlab-yayin-dagitim-kitap48204369.html",
      },
      {
        name: "Şehadet Kitap",
        url: "https://www.sehadetkitap.com/urun/tikla-ma-insan-zihnini-hackleme-sanati",
      },
      {
        // Sorgu parametreleri bilerek korundu: `merchantId` teklifi yayınevinin
        // kendi mağazasına sabitliyor. Trendyol otomatik isteklere 403 döndürdüğü
        // için sadeleştirilmiş bir URL'in çalıştığı doğrulanamadı.
        name: "Trendyol",
        url: "https://www.trendyol.com/pd/kodlab-yayin-dagitim/tikla-ma-insan-zihnini-hackleme-sanati-9786256677418-p-1177231535?boutiqueId=61&merchantId=115133&filterOverPriceListings=false&sav=true",
      },
    ],
    featured: true,

    pressKit: {
      shortPitch:
        "Öğr. Gör. Osman Can Çetlenbik'in kaleme aldığı “Tıkla(ma) — İnsan Zihnini Hackleme Sanatı”, siber dolandırıcılığın teknik değil psikolojik yönünü ele alıyor. Kodlab Yayınları'ndan çıkan kitap, sahte kurum aramalarından ses klonlamaya, zehirli USB belleklerden kötü niyetli QR kodlara kadar 30 gerçekçi vakayı inceliyor; her bölümdeki QR kodlar okuru güvenli bir ortamda saldırıyı bizzat deneyimlediği interaktif simülasyonlara yönlendiriyor.",

      longPitch: [
        "Siber saldırıların büyük kısmı bir yazılım açığından değil, bir insan kararından başlıyor. Saldırgan güvenlik duvarını aşmaya uğraşmak yerine korku, aciliyet, merak ve güven duygularını kullanarak doğrudan karşısındaki kişiye yöneliyor. Bu da hedef olmak için teknolojiden anlamanın gerekmediği anlamına geliyor.",
        "Manisa Celal Bayar Üniversitesi öğretim görevlisi Osman Can Çetlenbik'in yazdığı “Tıkla(ma) — İnsan Zihnini Hackleme Sanatı”, bu tabloyu 30 gerçekçi vaka üzerinden anlatıyor. Kitap; sahte kurum ve banka aramalarını, patron kimliğine bürünen kurumsal e-postaları, otoparkta unutulmuş USB bellekleri, sahte Wi-Fi ağlarını, ses klonlama ve deepfake reklamlarını, kargo ve alışveriş tuzaklarını, fidye yazılımlarını, kimlik hırsızlığını, SIM kart saldırılarını ve kötü niyetli QR kodları kapsıyor.",
        "Her vaka üç katmanda ele alınıyor: saldırının nasıl kurgulandığı, arkasında hangi psikolojik mekanizmanın çalıştığı ve karşılaşıldığında ne yapılması gerektiği. Kitabın ayırt edici yanı ise bölümlerdeki QR kodlar. Bu kodlar okuru interaktif simülasyonlara götürüyor; okuyucu saldırıyı yalnızca okumakla kalmıyor, kontrollü bir ortamda deneyimliyor. Yazar bu tercihi, farkındalık içeriklerinin bilinen zayıflığına — okunan bilginin karar anında refleks hâline gelmemesine — bir yanıt olarak açıklıyor.",
        "136 sayfalık kitap, hiçbir teknik altyapı gerektirmeyecek şekilde yazıldı; ailesini korumak isteyen bir ebeveyn, ilk kez kurumsal e-posta kullanan bir çalışan ve alana yeni giren bir öğrenci için aynı şekilde okunabiliyor.",
      ],

      angles: [
        {
          title: "Telefon dolandırıcılığı ve yaşlıların hedef alınması",
          text: "Tüketici ve asayiş masaları için: sahte kurum aramalarının senaryosu, mağdurun neden ikna olduğu ve ailelerin uygulayabileceği somut korunma adımları.",
        },
        {
          title: "Ses klonlama ve deepfake dolandırıcılığı",
          text: "Yapay zekâ ile kopyalanan bir sesin telefonda nasıl kullanıldığı ve buna karşı geliştirilebilecek doğrulama refleksleri — güncel ve görsel açıdan güçlü bir konu.",
        },
        {
          title: "Kitaptaki QR kodlarla saldırıyı deneyimleme",
          text: "Teknoloji basını için: okurun kitaptaki QR kodu okutup güvenli bir ortamda saldırının hedefi olduğu interaktif simülasyon yaklaşımı.",
        },
        {
          title: "Kurumsal e-posta sahtekârlığı",
          text: "Ekonomi ve iş dünyası masaları için: patron veya muhasebe kimliğine bürünen e-postaların şirketlere maliyeti ve önlenebilir noktaları.",
        },
      ],

      authorBio:
        "Osman Can Çetlenbik, Manisa Celal Bayar Üniversitesi Teknik Bilimler Meslek Yüksekokulu'nda öğretim görevlisidir. Büyük veri analitiği, yapay zekâ, web ve mobil programlama ile IoT güvenliği alanlarında dersler vermekte; oltalama saldırıları ve bilgi güvenliği konularında uluslararası bildiri ve makaleler yayımlamaktadır.",
    },
  },
];

export function getBook(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}

export const featuredBook = books.find((b) => b.featured) ?? books[0];
