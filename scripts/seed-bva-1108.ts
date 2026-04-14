/**
 * Seed BVA 1108 — Bilgi Teknolojileri course with full syllabus + 15 weeks + week 9 slides.
 * Run with: npx tsx scripts/seed-bva-1108.ts
 */
import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

const SYLLABUS = `
**Ders Kodu:** BVA 1108  ·  **Aktivite Türü:** Zorunlu  ·  **Dönem:** 2  ·  **Dil:** Türkçe
**Ulusal Kredi:** 3  ·  **AKTS:** 4  ·  **Haftalık Saat:** 3  ·  **Ön Koşul:** Yok

## Dersin Amacı

Bilgi teknolojileri hakkında temel bilgiler verilmesi, işletim sistemi ve ofis programlarının kullanım becerilerinin artırılması.

## Dersin Kısa İçeriği

Bilgiye ulaşma yöntem ve tekniklerinin incelenmesi ve bunların kullanım becerisinin kazanılması, programlama dilleri ile güncel yazılım uygulamaları.

## Öğrenme Çıktıları

1. Bilgi teknolojisinin temel kavramlarını tanımak
2. Temel seviyede bilgisayar donanımlarını öğrenmek
3. En az bir işletim sistemini etkin kullanabilmek
4. İnternet araçlarını kullanabilmek

## Değerlendirme

Vize **%40**  ·  Final **%60**

## Kaynaklar

- Eğitmenin ders notları
- Yavuz, Mahir. (2018). *Bilgi Teknolojileri ve Uygulamaları*. Seçkin Yayıncılık
- Turan, Hüseyin. (2020). *Bilgi Teknolojileri ve Sistemleri*. Nobel Akademik Yayıncılık
- Laudon, K. C. & Laudon, J. P. (2020). *Management Information Systems: Managing the Digital Firm* (16th ed.). Pearson Education

## Ders Sorumlusu

Öğr. Gör. Nur Erdem  ·  Tanıtım formu: 25.03.2025
`.trim();

const WEEKS: { weekNumber: number; topic: string }[] = [
  { weekNumber: 1, topic: "Bilişim teknolojilerine giriş" },
  { weekNumber: 2, topic: "Bilişim teknoloji araçları" },
  { weekNumber: 3, topic: "Temel bilgisayar donanımları" },
  { weekNumber: 4, topic: "Temel bilgisayar yazılımları" },
  { weekNumber: 5, topic: "Donanım ve yazılım uygulamaları" },
  { weekNumber: 6, topic: "İşletim sistemi" },
  { weekNumber: 7, topic: "Programlama dili" },
  { weekNumber: 8, topic: "Ara Sınav" },
  { weekNumber: 9, topic: "Ofis programlarının tanıtılması" },
  { weekNumber: 10, topic: "Kelime işlem programı" },
  { weekNumber: 11, topic: "Denklem editörü, çizim ve grafik oluşturma" },
  { weekNumber: 12, topic: "Tablolarla çalışma" },
  { weekNumber: 13, topic: "Sunum dosyası hazırlama" },
  { weekNumber: 14, topic: "İnternet ortamı" },
  { weekNumber: 15, topic: "Sosyal ağlar" },
];

const WEEK_9_SLIDES = `
# 9. Hafta — Ofis Programları

## Sunum Hazırlama Araçları

Bu hafta üç aracı işleyeceğiz:

1. **Microsoft PowerPoint** — klasik standart
2. **Canva** — şablon odaklı tasarım
3. **Gamma App** — yapay zekâ destekli

---

# Bölüm 1 — Microsoft PowerPoint

Ofis paketinin sunum aracı. Üniversitelerde, şirketlerde ve seminerlerde en yaygın kullanılan format.

---

## PowerPoint Açılış

- Microsoft 365 hesabıyla giriş
- "Yeni → Boş Sunum" veya hazır şablon seç
- Üst şerit (ribbon): Giriş · Ekle · Tasarım · Geçişler · Animasyonlar · Slayt Gösterisi · Görünüm

---

## Slayt Ekleme & Düzenleme

- **Yeni Slayt:** Giriş → Yeni Slayt
- **Düzen seç:** Başlık, İçerik, İki İçerik, Karşılaştırma, Boş
- **Metin kutusu:** Ekle → Metin Kutusu
- **Resim:** Ekle → Resimler → Bu Cihaz / Stok / Çevrimiçi
- **Şekil:** Ekle → Şekiller → daire, ok, bağlantı çizgisi
- **Tablo / Grafik:** Ekle → Tablo / Grafik

---

## Tasarım

- **Tema:** Tasarım sekmesinden hazır temalar
- **Tasarımcı (Designer):** Slayt içeriğini ekleyince otomatik düzen önerileri
- **Renk paleti:** Tasarım → Çeşitlemeler
- **Yazı tipi setleri:** profesyonel sunum için 2 fontu geçme

---

## Geçişler & Animasyon

- **Geçişler:** Slaytlar arası animasyon (Solma, Kayma, Push)
- **Animasyonlar:** Slayt içi öğe animasyonu (Beliriş, Vurgu, Çıkış)
- **Animasyon Bölmesi:** Sıra ve süre kontrolü
- ⚠️ Az kullanın — fazla animasyon dikkat dağıtır

---

## Video Sunum Kaydı

Sunumu video olarak kaydetmek için:

\`\`\`
Slayt Gösterisi → Slayt Gösterisini Kaydet
\`\`\`

- **Webcam + mikrofon** açılır
- Her slayt için ses kaydı + isteğe bağlı kamera görüntüsü
- Kalem/işaretçi çizimleri kayda dahil
- Bittiğinde: **Dosya → Dışa Aktar → Video Oluştur**
- Çıktı: \`.mp4\` (Ultra HD / Full HD / HD)

---

## Dosya Türleri

- \`.pptx\` — düzenlenebilir orijinal
- \`.pdf\` — paylaşım için (Dosya → Dışa Aktar → PDF)
- \`.mp4\` — video sunum
- \`.pptm\` — makro içeren
- \`.potx\` — şablon

---

# Bölüm 2 — Canva

Tarayıcı tabanlı, **şablon odaklı** tasarım aracı. Sunum, sosyal medya görseli, broşür, CV — hepsini yapar.

→ canva.com

---

## Canva Avantajları

- ✓ Yüklemeye gerek yok (web tabanlı)
- ✓ 250.000+ ücretsiz şablon
- ✓ Stok görsel, video, müzik kütüphanesi
- ✓ Marka kiti (renk, font, logo bir kez ayarla)
- ✓ Takım çalışması (real-time)
- ⚠️ Bazı premium öğeler ücretli — eğitim hesabıyla bedava

---

## Sunum Oluşturma

1. **Sunumlar** kategorisine tıkla
2. **Şablon seç** veya boş başla
3. Sol menü:
   - **Şablonlar:** kategoriye göre
   - **Öğeler:** şekil, sticker, çerçeve
   - **Metin:** font kombinasyonları
   - **Markalama:** renk paletini ayarla
4. Sürükle-bırak ile düzenle

---

## Canva Animasyon ve Paylaşım

- **Animasyon:** seçili öğeye → Animate → Fade, Pan, Pop, Tumble
- **Geçiş:** slayt → Animate → tüm slayta uygulanır
- **Paylaşım:**
  - Link ile paylaş (Görüntüleme / Yorum / Düzenleme)
  - PDF, PNG, MP4 indir
  - Sunum modu (Present)
- **Embed:** \`<iframe>\` ile web sitesine göm

---

# Bölüm 3 — Gamma App

**Yapay zekâ ile sunum üreten** modern araç. Tek bir prompt ile dakikalar içinde tam bir sunum.

→ gamma.app

---

## Gamma Avantajları

- ✓ AI ile **otomatik içerik + tasarım**
- ✓ Sunum, doküman, web sayfası — üçü bir arada
- ✓ Markdown gibi yaz, görsel olarak göster
- ✓ Otomatik görsel ekleme
- ✓ Anında dil değişikliği
- ⚠️ Free planda 400 kredi/ay (yaklaşık 10-15 sunum)

---

## Sunum Oluşturma

1. Gamma'ya giriş yap (Google ile bedava)
2. **+ Create New** → "Generate"
3. Format seç: **Presentation**
4. Tema seç (10+ hazır)
5. Prompt yaz:
   \`\`\`
   "Yapay zekanın eğitimde kullanımı"
   konulu 10 slaytlık akademik sunum
   \`\`\`
6. AI 30 saniyede sunumu üretir
7. Slaytları düzenle, görselleri değiştir

---

## Prompt İpuçları (Gamma)

- **Konu + hedef kitle** belirt: *"Lise öğrencileri için yapay zekâ"*
- **Slayt sayısı** ver: *"15 slaytlık"*
- **Ton:** *"Eğlenceli, görsel ağırlıklı"* veya *"Akademik, kaynak göstererek"*
- **Bölüm yapısı:** *"Giriş, 3 ana başlık, sonuç"*

---

## Gamma Paylaşım

- **Sunum Modu:** tam ekran
- **Paylaşılabilir link** (görüntüleme veya düzenleme)
- **PDF / PowerPoint export**
- **Web olarak yayınla:** kendi domain'inde gibi gözükür

---

# Karşılaştırma

| Özellik | PowerPoint | Canva | Gamma |
|---|---|---|---|
| Tarz | Klasik | Şablon | AI |
| Kurulum | Yükleme | Web | Web |
| Şablon | Sınırlı | 250K+ | 10+ |
| AI | Designer | Magic Studio | Tüm flow |
| Video kayıt | ✓ | ✗ | ✗ |
| Embed | ✗ | ✓ | ✓ |
| Maliyet | Lisans | Free + Pro | Free + Pro |

---

# Hangi Aracı Ne Zaman?

- **PowerPoint:** akademik sunum, kurumsal raporlar, video sunum kaydı
- **Canva:** sosyal medya, görsel ağırlıklı poster + sunumlar, marka tutarlılığı
- **Gamma:** hızlı taslak, brainstorming, AI destekli içerik üretimi

---

# Bu Hafta Yapılacaklar

1. PowerPoint'te 5 slaytlık bir sunum hazırla, video kaydı al → \`.mp4\`
2. Canva'da aynı konuyu şablonla yeniden tasarla
3. Gamma'da prompt ile aynı konuyu üret
4. Üçünü karşılaştır → blog post olarak yaz

---

# Teşekkürler

Sorularınız için: Çarşamba 09:55 - 12:30
`.trim();

async function main() {
  const slug = "bilgi-teknolojileri";

  const existing = await prisma.course.findUnique({ where: { slug } });
  if (existing) {
    console.log(`Course "${slug}" already exists. Deleting and recreating...`);
    await prisma.course.delete({ where: { slug } });
  }

  const course = await prisma.course.create({
    data: {
      slug,
      title: "Bilgi Teknolojileri",
      program: "Büyük Veri Analistliği",
      type: "Zorunlu",
      semester: "2025-2026 Bahar",
      credits: 3,
      schedule: "Çarşamba · 09:55–12:30",
      description:
        "BVA 1108 · Bilgi teknolojilerinin temel kavramları, donanım, yazılım, işletim sistemleri ve ofis programlarının kullanımı.",
      syllabus: SYLLABUS,
    },
  });
  console.log("✓ Course created:", course.id, course.slug);

  for (const w of WEEKS) {
    const slides = w.weekNumber === 9 ? WEEK_9_SLIDES : null;
    await prisma.courseWeek.create({
      data: {
        courseId: course.id,
        weekNumber: w.weekNumber,
        topic: w.topic,
        slides,
      },
    });
  }
  console.log(`✓ ${WEEKS.length} weeks added (week 9 has slides)`);

  console.log("\nDone. View at /dersler/bilgi-teknolojileri");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
