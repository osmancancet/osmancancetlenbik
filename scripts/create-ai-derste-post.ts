/**
 * Create blog post: "Sınıfta yapay zekâ: yasaklamak değil, açık konuşmak"
 * Run: DATABASE_URL=... npx tsx scripts/create-ai-derste-post.ts
 */
import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

const SLUG = "sinifta-yapay-zeka-yasaklamak-degil-acik-konusmak";

const TITLE = "Sınıfta yapay zekâ: yasaklamak değil, açık konuşmak";

const EXCERPT =
  "BVA 1108 dersinde bir öğrencim Excel ödevini ChatGPT'ye yaptırmıştı. TikTok'taki videoların %59'unun yapay zekâ üretimi olduğu bir dünyada hocaların seçimi açık: yasak mı, ehlîleştirmek mi?";

const CONTENT = `Geçen hafta BVA 1108'in son dersinde bir öğrencim Excel ödevini açtı. Formüller doğruydu, biçimlendirme temizdi. Sordum: "Hangi formülle yaptın bunu?" Bir saniye duraksadı. "ChatGPT'ye sordum hocam."

Cevabı çok düşünmedim. Çünkü doğru cevaptı.

Kapwing'in geçen gün yayımladığı bir araştırmaya göre TikTok'ta yeni kullanıcılara önerilen videoların **%59'u** — çocuk içeriklerinde rakam **%97'ye** çıkıyor — yapay zekâ tarafından üretiliyor. Bu birinin sektör söylentisi değil; halka açık bir akış üzerinden ölçüm. Yarın derste TikTok'a girip "AI tarafından üretildi" rozetli on tane videoyu arka arkaya gösterebilirim.

İşin bana ilginç gelen tarafı şu: öğrenciler bunu zaten biliyor. Bilmediğini sanan biz hocalardık.

## Yasak mı, ehlîleştirmek mi?

Birçok meslektaşımın kararı net: "ChatGPT yasak." Sınav esnasında telefon kapatma kuralı zaten vardı, ödevde de aynı katılığı uyguluyor. Bunu anlıyorum — ben de bir dönem ChatGPT ile yazılmış metinleri okurken irrite olmuştum. Ama altı ay sonra fark ettim ki sorun yapay zekânın **kendisi** değil, öğrencinin onunla **nasıl** konuştuğu.

Bu dönem BVA 2103 (Bulut Bilişim) dersinde şöyle bir kural koydum: ChatGPT'ye sormaktan tamamen serbestsiniz; ama sorduğunuz prompt'u da ödevin sonuna ekleyeceksiniz. Bu kuralın olduğu ilk hafta sınıfın yarısı promptlarını kopyaladı. Cevaplar çoğunlukla yüzeyseldi. İkinci hafta promptlar değişmeye başladı — daha spesifik, daha bağlamlı, *"şu Excel formülünü neden bu şekilde yazdın, alternatifleri var mı"* şeklinde. Üçüncü hafta artık çoğu öğrenci modelin hatalı cevabını işaretleyip altına kendi düzeltmesini yazıyordu.

Aynı araç. Üç hafta içinde bir tutamaçtan bir tezgâh aracına dönüştü.

## Üreten mi, tüketen mi olacaksın?

OpenAI geçen hafta ilk özel yapay zekâ işlemcisini — *Jalapeno*, Broadcom ile geliştirildi — duyurdu. SK Hynix, AI çiplerindeki büyüme sayesinde Samsung'u geçti; Güney Kore'nin 26 yıllık piyasa değeri liderliği el değiştirdi. Apple'ın iOS 27 betasında Siri'nin gizlice ChatGPT'ye yönlendirme yaptığı ortaya çıktı.

Yani yapay zekâ artık bir özellik değil, altyapı. Önümüzdeki birkaç yıl içinde yapacağımız her şeyin alt katmanında olacak. Bu sahnenin tek sorusu var: kim **üreten**, kim **tüketen** olacak.

BVA programındaki öğrencilerime bu yüzden ısrarla söylüyorum: ChatGPT ile bir şey üretmek üreticilik değildir. Sorguyu kendiniz yazdığınızda, çıktıyı kendiniz değerlendirdiğinizde, hatasını düzeltip uyarladığınızda *üreten* tarafa geçersiniz. Hazır prompt'u kopyalayıp çıktıyı sınıfa getirenler, daha şimdiden algoritmaya yem oluyor.

## Sınıftaki pratik karar

Manisa'da, küçük bir meslek yüksekokulunda derse giriyorum. Sınıfta belki 30 kişi var. Onların önündeki 40 yıllık kariyer çizgisini bu kararlar şekillendirecek. TikTok'taki %59 sayısı sadece bir başlangıç — önümüzdeki dönem %70'i geçerse, ki geçecek, bu içeriklerin arkasındaki prompt'u yazan kişi mi olacaksınız, yoksa o videoları izleyip 8 saniye sonra unutan kişi mi?

Yasak çözüm değil. Ehlîleştirmek çözüm. Ehlîleştirmek de derste açık açık konuşmaktan geçiyor.

Önümüzdeki hafta BVA 1203 (Üretken Yapay Zekalar) dersinin ilk haftası. Konu: *"Üretken yapay zekâya genel bakış"*. Sınıfa girdiğimde ilk sorum şu olacak:

> "Bu derse gelmeden önce ChatGPT'ye 'BVA 1203 nedir' diye sordunuz mu? Sorduğunuz cevabı şimdi paylaşın. Birlikte bakalım nesi doğru, nesi yanlış."

Belki sınıfın yarısı sormuştur. Belki tamamı. Hiç önemli değil. Önemli olan, o cevabı eleştiren, düzelten, üzerine inşa eden kişi olabilmek.

Gerisi otomasyona kalır.`;

async function main() {
  const existing = await prisma.post.findUnique({ where: { slug: SLUG } });
  if (existing) {
    console.log(`Post "${SLUG}" zaten var — güncelliyorum.`);
    const updated = await prisma.post.update({
      where: { slug: SLUG },
      data: { title: TITLE, excerpt: EXCERPT, content: CONTENT, published: true },
    });
    console.log("✓ Updated:", updated.id);
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
