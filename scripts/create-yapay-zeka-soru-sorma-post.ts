/**
 * Add a new blog post: choosing the right AI + the art of asking good questions.
 * Additive — does not touch the existing DVWA post.
 * Run: DATABASE_URL=... npx tsx scripts/create-yapay-zeka-soru-sorma-post.ts
 */
import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

const SLUG = "hangi-yapay-zeka-ve-dogru-soru-sorma";

const TITLE =
  "Hangi yapay zekâ hangi işte iyi — ve ondan 10 kat daha iyi cevabı nasıl alırsın";

const EXCERPT =
  "ChatGPT, Claude, Gemini, Grok, Perplexity… Hepsi aynı değil. 2026 ortasında hangi araç hangi işte parlıyor, ve aynı modelden 10 kat daha iyi cevap çıkaran 7 soru sorma yöntemi — örneklerle.";

const CONTENT = `İnsanların yapay zekâ ile yaptığı en sık hata şu: "bana büyük veri hakkında bir şey yaz" deyip çıkan üç paragrafı olduğu gibi almak. Metin teknik olarak yanlış değildir — ama hiçbir şey de söylemez. Herkesin yazabileceği, kimsenin okumayacağı türden.

Oysa işin sırrı tam orada. Sorun yapay zekânın "az bilmesi" değil — **senin az sorman.** Aynı modele doğru soruyu sorduğunda, sıradan bir özet ile gerçek bir uzman analizi arasındaki farkı görürsün. Üstelik bunun için ne kod bilmen ne de para ödemen gerekiyor; sadece nasıl konuşacağını bilmen yeterli.

Bu yazı iki şeyi anlatıyor: önce **hangi yapay zekânın hangi işte iyi olduğunu** (çünkü hepsi aynı değil), sonra **hangisini kullanırsan kullan, ondan en iyi cevabı çıkaran yöntemleri.**

## Önce şunu netleştirelim: "yapay zekâ" tek bir şey değil

2023'te herkes "ChatGPT" diyordu, sanki tek bir araç varmış gibi. 2026 ortasında durum çok değişti. Artık her birinin güçlü ve zayıf yanları olan bir avuç ciddi araç var — ve doğru işi doğru araca vermek, çoğu zaman daha iyi bir prompt yazmaktan bile önemli.

İşte günlük hayatta karşılaşacağın başlıcaları ve gerçekten iyi oldukları yer:

| Araç | En iyi olduğu yer | Ne zaman seç |
| --- | --- | --- |
| **ChatGPT** (OpenAI) | Genel amaçlı her iş, görsel üretme, sesli konuşma, fikir üretme | "Tek araçla başlayayım" diyorsan; en geniş özellik seti |
| **Claude** (Anthropic) | Uzun metin yazma, kod, uzun belge analizi, dikkatli/nüanslı düşünme | Bir raporu, sözleşmeyi, uzun yazıyı baştan sona okutup işleteceksen |
| **Gemini** (Google) | Google ekosistemiyle entegrasyon (Arama, Gmail, Docs, YouTube), çok büyük belgeler | Günceli kaynaktan teyit etmen ya da Google dosyalarınla çalışman gerekiyorsa |
| **Grok** (xAI) | Anlık gündem, X/Twitter üzerinden canlı veri | "Şu an ne konuşuluyor" türü, dakikası dakikasına güncel sorular |
| **Perplexity** | Kaynaklı araştırma — her cümlenin altına linkini koyar | Akademik/araştırma işi; "nereden buldun" diye soramayacağın bir cevap istemiyorsan |

Bunların yanında **uzmanlaşmış** araçlar da var: görsel için Midjourney ve DALL·E, müzik için Suno, video için Sora ve Veo, kodu doğrudan editöründe yazman için GitHub Copilot ve Cursor. Yani "bir resim çizdireceğim" diye ChatGPT'yi zorlamak yerine, o işin ustasına gitmek çoğu zaman daha iyi sonuç verir.

Pratik kural: **metin, analiz ve kod için bir sohbet asistanı (ChatGPT/Claude/Gemini); araştırma için Perplexity; üretim (görsel/ses/video) için uzman araç.** İkisini birden iyi yapanı aramak yerine, işi parçalara böl.

> Bir notla: bu liste 2026 ortasının fotoğrafı. Bu alan o kadar hızlı ki, altı ay sonra sıralama değişebilir. O yüzden "hangisi en iyi" sorusuna takılma — "bu iş için hangisi" diye sor.

## Asıl mesele: doğru soru sorma sanatı

Hangi aracı seçersen seç, çıktının kalitesini belirleyen tek şey var: **ne sorduğun.** Aynı yapay zekâ, kötü bir soruya vasat, iyi bir soruya muhteşem cevap verir. İşte her gün kullandığım, işe yaradığını defalarca gördüğüm yöntemler.

### 1. Rol ver

Yapay zekâya kim olduğunu söyle. Bağlam, tonu ve derinliği baştan ayarlar.

- ❌ "Bütçe nasıl yapılır?"
- ✅ "Sen 20 yıllık bir mali müşavirsin. Yeni açılmış küçük bir kafenin sahibine, aylık bütçesini nasıl kuracağını sade bir dille anlat."

### 2. Bağlam ver — kim için, ne amaçla

Yapay zekâ senin kafandakini göremez. Hedef kitleyi ve amacı söyle.

- ❌ "Yapay zekâyı anlat."
- ✅ "Hiç teknik bilgisi olmayan 60 yaşındaki anneme yapay zekânın ne olduğunu, telefon örneği üzerinden, 4 cümleyle anlat."

### 3. Formatı belirt

Cevabın nasıl gelmesini istediğini söylemezsen, rastgele gelir.

- ❌ "Avantaj ve dezavantajları neler?"
- ✅ "Avantajları ve dezavantajları iki sütunlu bir tablo halinde, her biri en fazla 5 madde olacak şekilde ver."

### 4. Adım adım düşünmesini iste

Karmaşık bir işte "önce planla, sonra yaz" demek sonucu belirgin biçimde iyileştirir. Yapay zekâ bir sonraki kelimeyi tahmin ederek çalışır; ona düşünecek alan açtığında daha az hata yapar.

- ❌ "Bu problemi çöz."
- ✅ "Bu problemi çözmeden önce, adım adım nasıl yaklaşacağını anlat. Sonra çözümü yaz."

### 5. Örnek ver (en güçlü silah)

İstediğin tarzı tarif etmek yerine, bir örnek göster. Yapay zekâ örnekten taklit etmekte ustadır.

- ❌ "Bana ürün için slogan yaz."
- ✅ "Şu tarzda 5 slogan yaz: kısa, esprili, en fazla 4 kelime. Örnek ton: 'Kahven hazır, bahanen yok.'"

### 6. "Şunu yapma" yerine "şunu yap" de

Olumsuz talimatlar zayıf çalışır. Ne *istemediğini* değil, ne *istediğini* söyle.

- ❌ "Çok uzun yazma, sıkıcı olmasın."
- ✅ "En fazla 3 cümle yaz. Birinci cümlede sonucu söyle, gerisi destek olsun."

### 7. İlk cevap taslaktır — düzelt

En büyük hata: ilk çıkan cevabı kabul etmek. İyi sonuç, sohbetin ikinci-üçüncü turunda gelir.

- "Bu iyi ama ikinci paragraf çok genel, somut bir örnekle değiştir."
- "Tonu biraz daha samimi yap, sanki bir arkadaşıma anlatıyormuşum gibi."

## Ve en önemlisi: doğrula

Yapay zekâ kendinden **çok emin görünür** — ama emin görünmesi haklı olduğu anlamına gelmez. Bilmediği bir şeyi uydurabilir; buna teknik dilde "halüsinasyon" deniyor ve modelin bir hatası değil, çalışma biçiminin doğal bir sonucu. Bir tarih, bir rakam, bir kaynak verdiğinde — özellikle önemliyse — kontrol et. "Bu bilgiyi nereden aldın, kaynağı ne?" diye sormak, çoğu zaman uydurmayı ortaya çıkarır.

Şunu unutma: **Yapay zekâ ile üretmek, üreticilik değildir. Üretici, doğru soruyu soran, çıkan cevabı değerlendiren, hatasını görüp düzeltendir.** Hazır cevabı kopyalayan değil.

Bu yedi yöntemi bir hafta dene. Aynı araçla, aynı işten ne kadar farklı bir sonuç çıktığını göreceksin. Çünkü fark her zaman modelde değil — soruda.

---

*Eklemek istediğin bir yöntem ya da takıldığın bir nokta olursa yaz — konuşalım.*`;

async function main() {
  const existing = await prisma.post.findUnique({ where: { slug: SLUG } });
  if (existing) {
    const updated = await prisma.post.update({
      where: { slug: SLUG },
      data: { title: TITLE, excerpt: EXCERPT, content: CONTENT, published: true },
    });
    console.log("✓ Updated:", updated.id, updated.slug);
  } else {
    const created = await prisma.post.create({
      data: {
        slug: SLUG,
        title: TITLE,
        excerpt: EXCERPT,
        content: CONTENT,
        published: true,
      },
    });
    console.log("✓ Created:", created.id, created.slug);
  }
  console.log(`  View at /yazilarim/${SLUG}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
