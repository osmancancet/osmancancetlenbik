/**
 * Seed 8 BVA courses for 2026-2027 Güz dönemi.
 *
 * Run:   npx tsx scripts/seed-bva-2026-guz.ts
 *
 * Kaynak: MCBÜ Manisa Teknik Bilimler MYO — Büyük Veri Analistliği 2024
 * Öğretim Planı Ders İçerikleri PDF. BVA 2205 ve BVA 2245 PDF'te detaylı
 * bulunmadığı için makul taslak hafta planları kullanıldı (revize edilebilir).
 *
 * Idempotent: aynı slug varsa silip yeniden oluşturur.
 */
import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

type WeekRow = { weekNumber: number; topic: string };
type CourseSeed = {
  slug: string;
  code: string;
  title: string;
  type: string;
  ulusalKredi: number;
  akts: number;
  haftalikSaat: string;
  donem: string;
  schedule: string;
  shortDesc: string;
  amac: string;
  kisaIcerik: string;
  ogrenmeCiktilari: string[];
  kaynaklar: string[];
  weeks: WeekRow[];
};

const SEMESTER = "2026-2027 Güz";
const INSTRUCTOR = "Öğr. Gör. Osman Can Çetlenbik";

const STANDARD_WEEK_8: WeekRow = { weekNumber: 8, topic: "Ara Sınav" };

function buildSyllabus(c: CourseSeed): string {
  return `
**Ders Kodu:** ${c.code}  ·  **Aktivite Türü:** ${c.type}  ·  **Dönem:** ${c.donem}  ·  **Dil:** Türkçe
**Ulusal Kredi:** ${c.ulusalKredi}  ·  **AKTS:** ${c.akts}  ·  **Haftalık Saat:** ${c.haftalikSaat}  ·  **Ön Koşul:** Yok

## Dersin Amacı

${c.amac}

## Dersin Kısa İçeriği

${c.kisaIcerik}

## Öğrenme Çıktıları

${c.ogrenmeCiktilari.map((c, i) => `${i + 1}. ${c}`).join("\n")}

## Değerlendirme

Vize **%40**  ·  Final **%60**

## Kaynaklar

${c.kaynaklar.map((k) => `- ${k}`).join("\n")}

## Ders Sorumlusu

${INSTRUCTOR}  ·  Tanıtım formu: 25.03.2025
`.trim();
}

/* ════════════════════════════════════════════════════════════
   8 DERS — kaynaklar PDF'ten (1101, 1109, 1203, 2103, 2105, 2107) +
   makul taslak (2205, 2245)
   ════════════════════════════════════════════════════════════ */

const COURSES: CourseSeed[] = [
  /* ──────── 1. BVA 1101 — Programlama Temelleri ──────── */
  {
    slug: "programlama-temelleri",
    code: "BVA 1101",
    title: "Programlama Temelleri",
    type: "Zorunlu",
    ulusalKredi: 3,
    akts: 5,
    haftalikSaat: "3+0",
    donem: "1 (Güz)",
    schedule: "Perşembe · 09:55–12:30 · Amfi 1",
    shortDesc:
      "Algoritma, akış diyagramı, değişken/operatör, kontrol-döngü yapıları, diziler, fonksiyonlar, dosya işlemleri.",
    amac: "Programlamanın temel kavramlarını öğretmek; algoritma ve akış diyagramı geliştirme becerisi kazandırmak; bir problemi program geliştirerek bilgisayar ortamında çözebilme, mevcut bir programdaki olası hataları anlayabilme ve giderme, dosyalama işlemlerini kullanarak verileri saklama yetkinliği kazandırmak.",
    kisaIcerik:
      "Bilgisayar programlama ile ilgili genel kavramlar, sistem analizi, algoritma kavramı, akış diyagramları, algoritmalar ve akış diyagramlarının nasıl oluşturulacağı, programlama dili özellikleri, girdi-çıktı operasyonları, değişken kavramı ve tipleri, operatörler, karar yapıları ve döngü yapıları, diziler, fonksiyonlar, alt program kavramları, hata yakalama, yazılımların test edilmesi, dosya işlemleri konuları uygulamalı olarak öğretilecektir.",
    ogrenmeCiktilari: [
      "Programlama temel kavramlarını bilir.",
      "Algoritma türlerini bilir ve algoritma oluşturabilir.",
      "Akış diyagramını bilir ve akış diyagramı ile program oluşturabilir.",
      "Veri tiplerini ve operatörleri bilir.",
      "Giriş/Çıkış komutlarını bilir ve kullanabilir.",
      "Hata takibi yapabilir ve hata yakalama kodu yazabilir.",
      "Dosyalama işlemlerini gerçekleştirebilir.",
    ],
    kaynaklar: [
      "Eğitmenin ders notları",
      "Tekdal, Mehmet. *Kodlamaya Yeni Başlayanlar İçin Temel Programlama*.",
      "MEGEP — *Programlama Temelleri Ders Kitabı*.",
    ],
    weeks: [
      { weekNumber: 1, topic: "Programlama ile ilgili temel kavramlar" },
      { weekNumber: 2, topic: "Algoritmalar, algoritma türleri, algoritma oluşturma" },
      { weekNumber: 3, topic: "Akış diyagramları, kullanılan semboller, akış diyagramı oluşturma" },
      { weekNumber: 4, topic: "Veri türleri, operatör çeşitleri, giriş-çıkış işlemleri" },
      { weekNumber: 5, topic: "Karar ve kontrol yapıları" },
      { weekNumber: 6, topic: "Döngü yapıları" },
      { weekNumber: 7, topic: "Karar ve döngü yapıları kullanarak problem çözme" },
      STANDARD_WEEK_8,
      { weekNumber: 9, topic: "Dizi tanımı ve tek boyutlu dizi tanımlamaları" },
      { weekNumber: 10, topic: "Çok boyutlu diziler ve matris kullanımı" },
      { weekNumber: 11, topic: "Dizi kullanarak problem çözme" },
      { weekNumber: 12, topic: "Metin (string), karakter katarı işlemleri" },
      { weekNumber: 13, topic: "Fonksiyon tanımı, çağrımı ve alt program kullanımı" },
      { weekNumber: 14, topic: "Sıralama ve arama algoritmaları, rekürsif fonksiyon kullanımı" },
      { weekNumber: 15, topic: "Dosyalama işlemleri" },
    ],
  },

  /* ──────── 2. BVA 1109 — İş Sağlığı ve Güvenliği ──────── */
  {
    slug: "is-sagligi-ve-guvenligi",
    code: "BVA 1109",
    title: "İş Sağlığı ve Güvenliği",
    type: "Zorunlu",
    ulusalKredi: 2,
    akts: 3,
    haftalikSaat: "2+0",
    donem: "1 (Güz)",
    schedule: "Perşembe · 13:30–15:10 · Amfi 1",
    shortDesc:
      "İş güvenliği kavramı, ilk yardım, kişisel koruyucular, çalışma emniyeti, mevzuat.",
    amac:
      "Öğrenciye iş güvenliğini sağlamak için gerekli olan yeterlilikleri kazandırmak; iş kazaları ve meslek hastalıkları konusunda farkındalık geliştirmek.",
    kisaIcerik:
      "İş güvenliği kavramı ve temel ilkeleri, makinelerle ilgili önlemler, ilk yardım, kişisel koruyucular, elektrik ile ilgili önlemler, iş güvenliği mevzuatı.",
    ogrenmeCiktilari: [
      "İlk yardım tedbirlerini alabilmek.",
      "Çalışma emniyetini sağlayabilmek.",
      "İş güvenliği mevzuatına uygun tedbirleri alabilmek.",
      "İş kazaları ve meslek hastalıkları hakkında bilgi sahibi olmak.",
    ],
    kaynaklar: [
      "Eğitmenin ders notları",
      "Demirbilek, Turgay. (2019). *Temel İş Sağlığı ve Güvenliği Bilgisi*. Seçkin Yayıncılık.",
      "Kaya, Deniz. (2021). *İş Sağlığı ve Güvenliği*. Nobel Akademik Yayıncılık.",
      "Goetsch, D. L. (2018). *Occupational Safety and Health for Technologists, Engineers, and Managers* (9th ed.). Pearson Education.",
    ],
    weeks: [
      { weekNumber: 1, topic: "İlk yardım eğitimi — I" },
      { weekNumber: 2, topic: "İlk yardım eğitimi — II" },
      { weekNumber: 3, topic: "İlk yardım malzemeleri — I" },
      { weekNumber: 4, topic: "İlk yardım malzemeleri — II" },
      { weekNumber: 5, topic: "Kişisel emniyet sağlama — I" },
      { weekNumber: 6, topic: "Kişisel emniyet sağlama — II" },
      { weekNumber: 7, topic: "Kişisel emniyet sağlama — III" },
      STANDARD_WEEK_8,
      { weekNumber: 9, topic: "Çalışanların emniyetini sağlama" },
      { weekNumber: 10, topic: "İş ortamı güvenliğini sağlama — I" },
      { weekNumber: 11, topic: "İş ortamı güvenliğini sağlama — II" },
      { weekNumber: 12, topic: "İş güvenliği mevzuatı — I" },
      { weekNumber: 13, topic: "İş güvenliği mevzuatı — II" },
      { weekNumber: 14, topic: "İş güvenliği mevzuatı — III" },
      { weekNumber: 15, topic: "Genel tekrar" },
    ],
  },

  /* ──────── 3. BVA 1203 — Üretken Yapay Zekalar ──────── */
  {
    slug: "uretken-yapay-zekalar",
    code: "BVA 1203",
    title: "Üretken Yapay Zekalar",
    type: "Seçmeli",
    ulusalKredi: 2,
    akts: 3,
    haftalikSaat: "2+0",
    donem: "1 (Güz)",
    schedule: "Perşembe · 15:20–17:00 · Amfi 1",
    shortDesc:
      "Üretken yapay zekâ teknikleri: GAN, VAE, Transformer, LLM, multimodal modeller; etik.",
    amac:
      "Üretken yapay zekâ tekniklerini, özellikle üretken yapay sinir ağlarını, dil modellerini ve ilgili uygulama alanlarını teorik ve uygulamalı olarak tanıtmak; öğrencilerin güncel üretken yapay zekâ modellerini anlayacak, eğitecek ve farklı kullanım senaryolarında değerlendirecek yetkinliğe ulaşmasını sağlamak.",
    kisaIcerik:
      "En kısa yol problemleri, yapay zekâ metotları: yapay sinir ağları, uzman sistemler, bulanık mantık. Üretken modeller: Autoencoder, VAE, GAN; Transformer mimarisi; LLM ve metin üretimi; multimodal modeller; etik ve güvenlik.",
    ogrenmeCiktilari: [
      "Yapay zekâ yöntemlerini uygulayabilmek.",
      "Yapay sinir ağlarını kullanabilmek.",
      "Teknolojiyi günlük yaşantısıyla bütünleştirebilmek.",
    ],
    kaynaklar: [
      "Eğitmenin ders notları",
      "Tiryaki, F. (2023). *Yapay Zekâ ve Derin Öğrenme: Teori, Algoritmalar ve Uygulamalar*. Papatya Yayıncılık.",
      "Yıldız, Ö. (2022). *Derin Öğrenme ile Görüntü ve Metin Üretimi: GAN ve VAE Uygulamaları*. Seçkin Yayıncılık.",
      "Goodfellow, I., Bengio, Y., & Courville, A. (2016). *Deep Learning*. MIT Press.",
    ],
    weeks: [
      { weekNumber: 1, topic: "Giriş: üretken yapay zekâya genel bakış" },
      { weekNumber: 2, topic: "Olasılıksal modeller ve temeller (Bayes teoremi, Markov zincirleri)" },
      { weekNumber: 3, topic: "Otomatik kodlayıcılar (Autoencoders) ve varyasyonel otomatik kodlayıcılar (VAE)" },
      { weekNumber: 4, topic: "Üretken çekişmeli ağlar (GANs): temel yapı ve eğitim süreci" },
      { weekNumber: 5, topic: "GAN türleri" },
      { weekNumber: 6, topic: "Uygulamalı GAN eğitimi: görüntü üretimi" },
      { weekNumber: 7, topic: "Dönüştürücüler (Transformers) ve kendine dikkat (Self-Attention) mekanizması" },
      STANDARD_WEEK_8,
      { weekNumber: 9, topic: "Büyük dil modelleri (LLM): GPT, BERT, T5" },
      { weekNumber: 10, topic: "Metin üretimi ve doğal dil işleme uygulamaları" },
      { weekNumber: 11, topic: "Görüntüden metne ve metinden görüntüye: multimodal modeller (DALL·E, CLIP)" },
      { weekNumber: 12, topic: "Etik, güvenlik ve yanıltıcı içerikler" },
      { weekNumber: 13, topic: "Yapay zekâda bilgi gösterimi" },
      { weekNumber: 14, topic: "Yapay zekâ dilleri ve bilgi tabanı oluşturma" },
      { weekNumber: 15, topic: "Üretken yapay zekâların Ar-Ge ve endüstriyel uygulamaları" },
    ],
  },

  /* ──────── 4. BVA 2103 — Büyük Veri için Bulut Bilişim ──────── */
  {
    slug: "buyuk-veri-icin-bulut-bilisim",
    code: "BVA 2103",
    title: "Büyük Veri İçin Bulut Bilişim",
    type: "Zorunlu",
    ulusalKredi: 4,
    akts: 4,
    haftalikSaat: "3+0",
    donem: "3 (Güz)",
    schedule: "Çarşamba · 09:55–12:30 · Derslik 7",
    shortDesc:
      "Bulut altyapısı, IaaS/PaaS/SaaS, AWS/Azure/GCP, Hadoop, Spark, bulutta analitik ve ML.",
    amac:
      "Bulut bilişim platformları ve bulut altyapısı hakkında bilgi sahibi olmak; büyük veri işleme çerçevelerini bulutta etkin kullanabilmek.",
    kisaIcerik:
      "Bulut altyapısı, bulutta veri depolama ve yönetimi, büyük veri işleme çerçeveleri, bulutta veri analitiği ve makine öğrenimi, güvenlik ve gizlilik düşünceleri.",
    ogrenmeCiktilari: [
      "Büyük veri temellerinde uzmanlık.",
      "Bulut altyapısını tanıma.",
      "Veri depolama ve yönetiminde beceri kazanma.",
      "Büyük veri işleme çerçevelerinde uzmanlık.",
    ],
    kaynaklar: [
      "Eğitmenin ders notları",
      "Gülbahar, Y., & Kalelioğlu, F. (2017). *Bulut Bilişim*. Pegem Akademi Yayıncılık.",
      "Yıldız, B. (2021). *Büyük Veri ve Bulut Bilişim: Kavramlar, Mimariler ve Uygulamalar*. Papatya Yayıncılık.",
      "Marinescu, D. C. (2017). *Cloud Computing: Theory and Practice* (2nd ed.). Morgan Kaufmann.",
    ],
    weeks: [
      { weekNumber: 1, topic: "Bulut bilişime giriş" },
      { weekNumber: 2, topic: "Büyük veri kavramlarının genel bakışı" },
      { weekNumber: 3, topic: "Bulut hizmet modelleri: IaaS, PaaS, SaaS" },
      { weekNumber: 4, topic: "Bulut dağıtım modelleri (public, private, hybrid, community)" },
      { weekNumber: 5, topic: "Başlıca bulut bilişim platformları: AWS, Azure, GCP" },
      { weekNumber: 6, topic: "Büyük veri için bulut depolama çözümleri" },
      { weekNumber: 7, topic: "Dağıtılmış hesaplama çerçevelerine giriş" },
      STANDARD_WEEK_8,
      { weekNumber: 9, topic: "Hadoop: mimarisi ve bileşenleri" },
      { weekNumber: 10, topic: "Hadoop MapReduce programlama" },
      { weekNumber: 11, topic: "Spark: tanıtım ve temel kavramlar" },
      { weekNumber: 12, topic: "Spark RDD'leri (dayanıklı dağıtılmış veri kümeleri)" },
      { weekNumber: 13, topic: "Bulutta veri analitiği" },
      { weekNumber: 14, topic: "Bulutta makine öğrenimi" },
      { weekNumber: 15, topic: "Bulut bilişimde güvenlik ve gizlilik" },
    ],
  },

  /* ──────── 5. BVA 2105 — Sosyal Ağ Analizi ──────── */
  {
    slug: "sosyal-ag-analizi",
    code: "BVA 2105",
    title: "Sosyal Ağ Analizi",
    type: "Zorunlu",
    ulusalKredi: 2,
    akts: 2,
    haftalikSaat: "2+0",
    donem: "3 (Güz)",
    schedule: "Cuma · 09:55–11:35 · Derslik 7",
    shortDesc:
      "Ağ merkezilik ölçüleri, görselleştirme, ERGM, topluluk tespiti, yayılım, ağ etiği.",
    amac:
      "Veri toplama ve ağ analizi konularında uzmanlaşmak; sosyal ağ dinamiklerini anlayıp ağ temelli analiz teknikleri uygulayabilmek.",
    kisaIcerik:
      "Ağ teorisi, ağ verisi toplama, ağ analiz teknikleri, sosyal ağ dinamikleri, ağ temelli müdahaleler.",
    ogrenmeCiktilari: [
      "Ağ analiz tekniklerinde yeterlilik.",
      "Veri toplama becerileri.",
      "Ağ analizinde yeterlilik.",
      "Sosyal ağ dinamiklerini anlama.",
      "Ağ temelli müdahalelerde yetkinlik.",
    ],
    kaynaklar: [
      "Eğitmenin ders notları",
      "Kadushin, C. (2015). *Sosyal Ağların Analizi: Sosyal Ağ Teorisi ve Uygulamaları* (Çev. S. Aksoy). Siyasal Kitabevi.",
      "Akbaş, M. F. (2020). *Sosyal Ağ Analizi: Kavramsal ve Uygulamalı Yaklaşım*. Gazi Kitabevi.",
      "Wasserman, S., & Faust, K. (1994). *Social Network Analysis: Methods and Applications*. Cambridge University Press.",
    ],
    weeks: [
      { weekNumber: 1, topic: "Ağ merkezilik ölçüleri (degree, betweenness, closeness, eigenvector)" },
      { weekNumber: 2, topic: "Ağ görselleştirme teknikleri" },
      { weekNumber: 3, topic: "Sosyal ağ veri toplama yöntemleri" },
      { weekNumber: 4, topic: "Üstel rastgele graf modelleri (ERGM)" },
      { weekNumber: 5, topic: "Topluluk tespit algoritmaları (Louvain, Girvan-Newman)" },
      { weekNumber: 6, topic: "Aktör odaklı modeller" },
      { weekNumber: 7, topic: "Boylamsal ağ analizi" },
      STANDARD_WEEK_8,
      { weekNumber: 9, topic: "Çok seviyeli ağ analizi" },
      { weekNumber: 10, topic: "Ağ dinamikleri ve evrim" },
      { weekNumber: 11, topic: "Ağlarda etki ve yayılım (information cascades, SIR/SIS)" },
      { weekNumber: 12, topic: "Ağın dayanıklılığı ve esnekliği (network resilience)" },
      { weekNumber: 13, topic: "Ağ örnekleme teknikleri" },
      { weekNumber: 14, topic: "Ağ temelli makine öğrenimi (graph embeddings, GNN)" },
      { weekNumber: 15, topic: "Ağ etik ve gizlilik sorunları" },
    ],
  },

  /* ──────── 6. BVA 2107 — Veri Görselleştirme ──────── */
  {
    slug: "veri-gorsellestirme",
    code: "BVA 2107",
    title: "Veri Görselleştirme",
    type: "Zorunlu",
    ulusalKredi: 3,
    akts: 5,
    haftalikSaat: "2+1",
    donem: "3 (Güz)",
    schedule: "Cuma · 11:45–15:10 · EnerjiSA Bil. Lab 1",
    shortDesc:
      "Görselleştirme ilkeleri, renk teorisi, grafik türleri, etkileşimli görselleştirme, dashboard tasarımı.",
    amac:
      "Veri türlerine göre tasarım ve görselleştirme teknikleri hakkında bilgi sahibi olmak; etkili ve net görsel hikâyeler oluşturabilmek.",
    kisaIcerik:
      "Veri türleri ve kaynakları, veri temizleme ve hazırlama, görselleştirme ilkeleri, temel görselleştirme teknikleri, gösterge tablosu tasarımları.",
    ogrenmeCiktilari: [
      "Görselleştirme araçlarında yeterlilik.",
      "Görselleştirme ilkelerini anlama.",
      "Temel ve gelişmiş görselleştirme oluşturma becerisi.",
      "Veri hazırlama becerileri.",
    ],
    kaynaklar: [
      "Eğitmenin ders notları",
      "Öztürk, Ö. (2021). *Veri Görselleştirme: Kavramlar, Yöntemler ve Uygulamalar*. Seçkin Yayıncılık.",
      "Yıldırım, S. (2019). *R ile Veri Görselleştirme: Uygulamalı Anlatım*. Kodlab Yayıncılık.",
      "Cairo, A. (2019). *How Charts Lie: Getting Smarter About Visual Information*. W. W. Norton & Company.",
    ],
    weeks: [
      { weekNumber: 1, topic: "Veri görselleştirmenin önemi ve temel ilkeleri" },
      { weekNumber: 2, topic: "Popüler veri görselleştirme araçlarına giriş" },
      { weekNumber: 3, topic: "Görselleştirme yazılımlarına genel bakış (Tableau, Power BI, Plotly, Seaborn)" },
      { weekNumber: 4, topic: "Veri türleri (kategorik, sayısal, zaman serisi, coğrafi)" },
      { weekNumber: 5, topic: "Görselleştirme projeleri için veri kaynaklarını bulma, erişme, temizleme, hazırlama" },
      { weekNumber: 6, topic: "Görsel algı ve biliş" },
      { weekNumber: 7, topic: "Renk teorisi ve renk seçimi; veri türüne uygun grafik seçimi" },
      STANDARD_WEEK_8,
      { weekNumber: 9, topic: "Çok değişkenli görselleştirme teknikleri" },
      { weekNumber: 10, topic: "Çubuk grafikler, çizgi grafikler, dağılım grafikleri oluşturma" },
      { weekNumber: 11, topic: "Pasta ve halka grafikleri tasarlama; ne zaman kullanılmamalı?" },
      { weekNumber: 12, topic: "Görselleştirmeleri netlik ve etkililik için özelleştirme" },
      { weekNumber: 13, topic: "Isı haritaları ve ağaç haritaları (heatmap, treemap) oluşturma" },
      { weekNumber: 14, topic: "Etkileşimli görselleştirmelere ve araçlara giriş (Plotly, D3)" },
      { weekNumber: 15, topic: "Gösterge paneli (dashboard) tasarım ilkeleri" },
    ],
  },

  /* ──────── 7. BVA 2205 — Siber Güvenlik ve Bilişim Hukuku
              (PDF'te detay yok — makul taslak) ──────── */
  {
    slug: "siber-guvenlik-ve-bilisim-hukuku",
    code: "BVA 2205",
    title: "Siber Güvenlik ve Bilişim Hukuku",
    type: "Seçmeli",
    ulusalKredi: 4,
    akts: 5,
    haftalikSaat: "2+2",
    donem: "3 (Güz)",
    schedule: "Çarşamba · 13:30–17:00 · Teknik Resim Çizim 2",
    shortDesc:
      "Siber güvenlik temelleri, OWASP Top 10, KVKK, 5651 sayılı Kanun, dijital delil, etik.",
    amac:
      "Öğrenciye temel siber güvenlik kavramlarını ve Türk bilişim hukuku düzenlemelerini (özellikle KVKK ve 5651 sayılı Kanun) tanıtarak güvenli ve hukuka uygun yazılım/veri uygulamaları geliştirme yetkinliği kazandırmak.",
    kisaIcerik:
      "Siber güvenlik temel kavramları; tehdit modelleri ve saldırı türleri; ağ ve uygulama güvenliği; kimlik doğrulama ve yetkilendirme; kriptografi temelleri; OWASP Top 10; sosyal mühendislik; Türk bilişim hukuku — Anayasa, TCK, 5651 sayılı Kanun, 6698 sayılı KVKK; veri ihlali bildirimi; dijital delil ve adli bilişim; meslek etiği.",
    ogrenmeCiktilari: [
      "Temel siber güvenlik kavram ve tehditlerini tanımlayabilmek.",
      "KVKK ve 5651 sayılı Kanun'un kapsamını ve veri sorumlusu yükümlülüklerini açıklayabilmek.",
      "OWASP Top 10 zafiyetlerini tespit edip basit düzeyde önleyebilmek.",
      "Veri ihlali durumunda yapılması gereken hukuki süreçleri sıralayabilmek.",
      "Dijital delil toplama ilkelerini ve adli bilişim sürecini açıklayabilmek.",
    ],
    kaynaklar: [
      "Eğitmenin ders notları",
      "Karagülmez, A. (2022). *Bilişim Suçları ve Soruşturma–Kovuşturma Evreleri*. Seçkin Yayıncılık.",
      "Akdağ, H. (2023). *Kişisel Verilerin Korunması Hukuku (KVKK Uygulamaları)*. Adalet Yayınevi.",
      "Stallings, W. (2020). *Computer Security: Principles and Practice* (4th ed.). Pearson.",
      "OWASP Foundation — *OWASP Top 10* (2021).",
      "KVKK Kurumu rehberleri — kvkk.gov.tr",
    ],
    weeks: [
      { weekNumber: 1, topic: "Siber güvenliğe giriş; CIA üçlüsü (gizlilik–bütünlük–erişilebilirlik)" },
      { weekNumber: 2, topic: "Tehdit modelleri ve saldırı türleri (malware, phishing, ransomware, DDoS)" },
      { weekNumber: 3, topic: "Ağ güvenliği temelleri: firewall, IDS/IPS, VPN, TLS" },
      { weekNumber: 4, topic: "Kimlik doğrulama, yetkilendirme, parola politikaları, MFA" },
      { weekNumber: 5, topic: "Kriptografi temelleri: simetrik/asimetrik şifreleme, hash, PKI" },
      { weekNumber: 6, topic: "OWASP Top 10 — uygulama güvenliği (SQLi, XSS, CSRF, IDOR)" },
      { weekNumber: 7, topic: "Sosyal mühendislik ve son kullanıcı zafiyetleri" },
      STANDARD_WEEK_8,
      { weekNumber: 9, topic: "Türk bilişim hukukuna giriş: Anayasa, TCK ve bilişim suçları" },
      { weekNumber: 10, topic: "5651 sayılı İnternet Kanunu — erişim engeli, içerik sorumluluğu" },
      { weekNumber: 11, topic: "6698 sayılı KVKK — kapsam, ilkeler, veri sorumlusu yükümlülükleri" },
      { weekNumber: 12, topic: "KVKK — VERBİS kayıt, açık rıza, aydınlatma yükümlülüğü" },
      { weekNumber: 13, topic: "Veri ihlali bildirimi, idari para cezaları, denetim örnek vakaları" },
      { weekNumber: 14, topic: "Dijital delil toplama, adli bilişim süreci (chain of custody)" },
      { weekNumber: 15, topic: "Mesleki etik, sorumlu açıklama (responsible disclosure), genel tekrar" },
    ],
  },

  /* ──────── 8. BVA 2245 — Kullanıcı Arayüzü Tasarımı
              (PDF'te detay yok — makul taslak) ──────── */
  {
    slug: "kullanici-arayuzu-tasarimi",
    code: "BVA 2245",
    title: "Kullanıcı Arayüzü Tasarımı",
    type: "Seçmeli",
    ulusalKredi: 2,
    akts: 3,
    haftalikSaat: "2+0",
    donem: "3 (Güz)",
    schedule: "Cuma · 15:20–17:00 · EnerjiSA Bil. Lab 1",
    shortDesc:
      "UI/UX ilkeleri, kullanıcı araştırması, wireframe, prototip, Figma, tasarım sistemleri, erişilebilirlik.",
    amac:
      "Öğrenciye kullanıcı arayüzü tasarımının temel ilkelerini, kullanıcı deneyimi (UX) süreçlerini ve modern tasarım araçlarını (özellikle Figma) tanıtmak; basit prototipler üretebilme yetkinliği kazandırmak.",
    kisaIcerik:
      "İnsan–bilgisayar etkileşimi temelleri; UI vs UX; kullanıcı araştırması ve persona; bilişsel ilkeler ve Gestalt; tipografi, renk, ızgara; wireframe ve mockup; prototipleme; Figma; tasarım sistemleri; erişilebilirlik (WCAG); kullanılabilirlik testi.",
    ogrenmeCiktilari: [
      "UI ve UX kavramlarını birbirinden ayırt edip ilişkilendirebilmek.",
      "Kullanıcı araştırması yapıp persona ve user journey çıkarabilmek.",
      "Figma ile wireframe ve interaktif prototip oluşturabilmek.",
      "Renk, tipografi, kontrast ve hizalama ilkelerini uygulayabilmek.",
      "WCAG erişilebilirlik gereksinimlerini tasarıma yansıtabilmek.",
    ],
    kaynaklar: [
      "Eğitmenin ders notları",
      "Norman, D. A. (2013). *Gündelik Şeylerin Tasarımı* (Çev.). Yapı Kredi Yayınları.",
      "Krug, S. (2014). *Don't Make Me Think, Revisited* (3rd ed.). New Riders.",
      "Cooper, A., Reimann, R., Cronin, D., & Noessel, C. (2014). *About Face: The Essentials of Interaction Design* (4th ed.). Wiley.",
      "Material Design 3 ve Apple HIG belgeleri.",
    ],
    weeks: [
      { weekNumber: 1, topic: "UI ve UX tasarımına giriş; insan–bilgisayar etkileşimi (HCI)" },
      { weekNumber: 2, topic: "Kullanıcı araştırması: anket, görüşme, gözlem" },
      { weekNumber: 3, topic: "Persona, user journey ve empathy map oluşturma" },
      { weekNumber: 4, topic: "Bilgi mimarisi ve sitemap; kullanıcı akışları (user flow)" },
      { weekNumber: 5, topic: "Görsel algı ilkeleri (Gestalt) ve bilişsel yük" },
      { weekNumber: 6, topic: "Tipografi, hiyerarşi, ızgara sistemleri" },
      { weekNumber: 7, topic: "Renk teorisi, palet seçimi, kontrast (WCAG)" },
      STANDARD_WEEK_8,
      { weekNumber: 9, topic: "Wireframe ve mockup ile prototipleme — düşük çözünürlük" },
      { weekNumber: 10, topic: "Figma ile UI tasarımı — bileşenler, auto-layout, variants" },
      { weekNumber: 11, topic: "Figma — interaktif prototip, smart animate, geçişler" },
      { weekNumber: 12, topic: "Tasarım sistemleri (Material, HIG, Tailwind UI); component library" },
      { weekNumber: 13, topic: "Erişilebilirlik (WCAG 2.2): alt text, kontrast, klavye navigasyonu" },
      { weekNumber: 14, topic: "Kullanılabilirlik testi (usability testing) ve heuristic değerlendirme" },
      { weekNumber: 15, topic: "Final proje sunumu ve kritik" },
    ],
  },
];

/* ════════════════════════════════════════════════════════════
   MAIN — Idempotent seed
   ════════════════════════════════════════════════════════════ */

async function main() {
  console.log(`Seeding ${COURSES.length} courses for ${SEMESTER}...\n`);

  for (const c of COURSES) {
    const existing = await prisma.course.findUnique({ where: { slug: c.slug } });
    if (existing) {
      console.log(`  · "${c.slug}" exists — deleting and recreating`);
      await prisma.course.delete({ where: { slug: c.slug } });
    }

    const course = await prisma.course.create({
      data: {
        slug: c.slug,
        title: c.title,
        program: "Büyük Veri Analistliği",
        type: c.type,
        semester: SEMESTER,
        credits: c.ulusalKredi,
        schedule: c.schedule,
        description: `${c.code} · ${c.shortDesc}`,
        syllabus: buildSyllabus(c),
      },
    });

    for (const w of c.weeks) {
      await prisma.courseWeek.create({
        data: {
          courseId: course.id,
          weekNumber: w.weekNumber,
          topic: w.topic,
        },
      });
    }

    console.log(`✓ ${c.code} — ${c.title} (${c.weeks.length} hafta)  /dersler/${c.slug}`);
  }

  console.log(`\nDone. ${COURSES.length} courses seeded. View at /dersler`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
