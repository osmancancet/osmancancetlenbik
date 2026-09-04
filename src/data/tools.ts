/**
 * Akademisyen araçları.
 *
 * Ortak ilke: işlem tarayıcıda yapılır, dosya sunucuya gitmez. Bu hem
 * gizlilik hem de kurulum kolaylığı sağlıyor — sayfa bir kez açıldıktan
 * sonra internetsiz de çalışıyor ve masaüstüne uygulama olarak kurulabiliyor.
 */

export type Tool = {
  slug: string;
  title: string;
  /** Kartta görünen tek cümlelik özet. */
  summary: string;
  /** Arama motoru açıklaması. */
  description: string;
  icon: string;
  /** Aracın çözdüğü somut sorun — kartta küçük punto. */
  problem: string;
  /** Dış servise istek gidiyor mu? Gizlilik rozeti bunu gösteriyor. */
  offline: boolean;
  keywords: string[];
};

export const tools: Tool[] = [
  {
    slug: "atif-denetleyici",
    title: "Atıf Denetleyici",
    summary:
      "Kaynakçanızdaki DOI'leri tek tek sorgulayıp gerçekten var olup olmadığını gösterir.",
    description:
      "Kaynakçanızı yapıştırın; her DOI CrossRef üzerinden sorgulanır, var olmayan ya da künyesi tutmayan kaynaklar işaretlenir. Yapay zekânın ürettiği uydurma atıfları yayına gitmeden yakalamak için.",
    icon: "FileSearch",
    problem: "Yapay zekâ var olmayan kaynak üretebiliyor.",
    offline: false,
    keywords: [
      "doi kontrol",
      "atıf doğrulama",
      "kaynakça denetimi",
      "sahte atıf",
      "crossref sorgulama",
    ],
  },
  {
    slug: "pdf-bolucu",
    title: "PDF Bölücü",
    summary:
      "Büyük PDF'i sayfa aralıklarına ya da eşit parçalara böler. Dosya bilgisayarınızdan çıkmaz.",
    description:
      "Büyük bir PDF'i sayfa aralığına göre ya da eşit parçalara bölün. Tüm işlem tarayıcıda yapılır, dosya hiçbir sunucuya yüklenmez.",
    icon: "Scissors",
    problem: "Yapay zekâ araçları 100 sayfadan büyük PDF'lerde görselleri okumuyor.",
    offline: true,
    keywords: [
      "pdf böl",
      "pdf ayır",
      "pdf sayfa çıkar",
      "büyük pdf küçültme",
      "pdf parçalama",
    ],
  },
  {
    slug: "anonimlestirici",
    title: "Anonimleştirici",
    summary:
      "Metindeki ad, e-posta, telefon, TC ve öğrenci numaralarını temizler.",
    description:
      "Bir belgeyi yapay zekâya ya da üçüncü tarafa vermeden önce kişisel verileri temizleyin: e-posta, telefon, TC kimlik, öğrenci numarası ve isimler. İşlem tarayıcıda yapılır.",
    icon: "EyeOff",
    problem: "Katılımcı ve öğrenci verisi araca girmeden temizlenmeli.",
    offline: true,
    keywords: [
      "kişisel veri temizleme",
      "anonimleştirme",
      "kvkk metin",
      "veri maskeleme",
      "tc kimlik gizleme",
    ],
  },
  {
    slug: "kaynakca-bicimlendirici",
    title: "Kaynakça Biçimlendirici",
    summary:
      "DOI listesinden APA, IEEE ve Vancouver biçiminde kaynakça üretir.",
    description:
      "DOI numaralarını yapıştırın; APA 7, IEEE ve Vancouver biçiminde hazır kaynakça alın. Künye bilgileri CrossRef'ten çekilir.",
    icon: "Quote",
    problem: "Her derginin kaynakça biçimi farklı ve elle çevirmek yorucu.",
    offline: false,
    keywords: [
      "apa kaynakça oluşturma",
      "ieee kaynakça",
      "vancouver kaynakça",
      "doi kaynakça çevirici",
      "kaynakça formatı",
    ],
  },
  {
    slug: "turkce-duzeltici",
    title: "Türkçe Karakter Düzeltici",
    summary:
      "Bozulmuş Türkçe metni onarır: “GÃ¶sterimler” gibi çıktıları düzeltir.",
    description:
      "Yanlış kodlama yüzünden bozulmuş Türkçe metni onarın. CSV, dışa aktarılan rapor ve eski veri dosyalarında sık görülen karakter bozulmalarını tek tıkla düzeltir.",
    icon: "Languages",
    problem: "Dışa aktarılan dosyalarda Türkçe harfler bozuk çıkıyor.",
    offline: true,
    keywords: [
      "türkçe karakter bozukluğu",
      "encoding düzeltme",
      "utf-8 bozuk metin",
      "csv türkçe karakter",
      "mojibake düzeltme",
    ],
  },
  {
    slug: "not-hesaplayici",
    title: "Not Hesaplayıcı",
    summary:
      "Ağırlıklı ortalama, harf notu dağılımı ve çan eğrisi hesaplar.",
    description:
      "Vize, final ve ödev ağırlıklarını girin; ağırlıklı ortalama, harf notu dağılımı ve isterseniz çan eğrisi uygulanmış sonuçları alın.",
    icon: "Calculator",
    problem: "Her dönem aynı hesabı elle kurmak zaman alıyor.",
    offline: true,
    keywords: [
      "ağırlıklı not hesaplama",
      "harf notu hesaplama",
      "çan eğrisi",
      "vize final ortalama",
      "not dağılımı",
    ],
  },
  {
    slug: "sinav-karistirici",
    title: "Sınav Karıştırıcı",
    summary:
      "Soru listesinden A/B/C formları üretir; soru ve şık sırasını karıştırır.",
    description:
      "Soruları yapıştırın; sıraları ve şıkları karıştırılmış birden çok sınav formu ile her formun cevap anahtarını alın.",
    icon: "Shuffle",
    problem: "Aynı sınavın farklı formlarını hazırlamak elle çok uzun sürüyor.",
    offline: true,
    keywords: [
      "sınav formu oluşturma",
      "soru karıştırma",
      "a b kitapçık",
      "cevap anahtarı",
      "şık karıştırma",
    ],
  },
];

export function getTool(slug: string) {
  return tools.find((t) => t.slug === slug);
}
