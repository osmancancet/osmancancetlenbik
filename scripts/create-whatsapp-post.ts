/**
 * Replace previous post with a broad-appeal WhatsApp settings guide.
 * Run: DATABASE_URL=... npx tsx scripts/create-whatsapp-post.ts
 */
import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

const OLD_SLUG = "dvwa-sql-injection-burp-suite-lab";
const NEW_SLUG = "whatsapp-gizli-ayarlar-2026";

const TITLE =
  "WhatsApp'ta görmediğiniz 8 ayar — 2026 versiyonu";

const EXCERPT =
  "Türkiye'de 65 milyondan fazla insan WhatsApp kullanıyor ama büyük çoğunluğu uygulamanın sadece %20'sini biliyor. 2026'da gelen yeni özelliklerle birlikte, profili gizlemekten Meta AI ile sohbet özetlemeye kadar, herkesin işine yarayacak 8 ayarı tek tek anlattım.";

const CONTENT = `WhatsApp, Türkiye'de en çok kullanılan uygulama. We Are Social'ın Ocak 2026 raporuna göre 18 yaş üstü 65 milyondan fazla insan günlük olarak açıyor. Ama tuhaf bir şey var: çoğumuz uygulamanın sadece *yazma + arama* fonksiyonlarını kullanıyoruz. Geri kalan onlarca ayar, Ayarlar menüsünün içinde sessizce duruyor.

Bu yazıda, 2026'nın en son sürümünde gerçekten işe yarayan 8 ayarı tek tek göstereceğim. Hepsi telefonunuzu, mesajlaşmanızı ve gizliliğinizi kontrol etmenizi sağlıyor. Yarısı ücretsiz yeni özellik, yarısı yıllardır oradaymış ama farkına varmadığınız.

## 1. "En son görülme" ve "online" durumunu istediğiniz kişilere gösterin

Karşı tarafa son ne zaman çevrimiçi olduğunuzu söylemek istemediğiniz biri var mı? WhatsApp 2023'ten beri bunu kişi bazında ayarlamanıza izin veriyor — ama 2025 güncellemesiyle artık **"online görünürlüğünü"** ayrıca kapatabiliyorsunuz.

**Yol:** Ayarlar → Gizlilik → En son görülme ve çevrimiçi → "Herkes" yerine **"Belirli kişiler hariç"** seçeneğini açın, eklemek istediğiniz kişileri seçin.

İpucu: "En son görülme" kapalıysa karşı taraf da sizinkini göremez. Yani kapatma kararı çift yönlüdür.

## 2. Profil fotoğrafınızı yabancılardan saklayın

Yabancı bir numara size mesaj attığında — örneğin bir kargocu, bir kurum, ya da bilmediğiniz biri — profil fotoğrafınızı görebilir. Bu, kimliğinizin pahalı bir parçası: birçok dolandırıcılık fotoğraf üzerinden başlar.

**Yol:** Ayarlar → Gizlilik → Profil Fotoğrafı → **"Kişilerim"** seçin. Yabancılar artık varsayılan gri silueti görecek.

Aynı ekrandan "Hakkında" ve "Durum" bölümlerini de "Kişilerim" yapın. Bunlar daha az önemli görünür ama biriken bilgiyle birlikte sizinle ilgili bir profil oluşur.

## 3. Mesajları otomatik olarak kayboldur

2026 itibarıyla bu özellik **varsayılan olarak** kapalı geliyor — açtığınızda 24 saat, 7 gün veya 90 gün sonra mesajlar kendiliğinden silinir. Hem sizin tarafınızdan hem karşıdaki kişiden.

**Yol:** Ayarlar → Gizlilik → Süreli mesajlar (Default Message Timer) → 24 saat / 7 gün / 90 gün arasından birini seçin.

Kullanmanın iki güzel sebebi: telefonunuz birinin eline geçerse geçmiş yazışmalar tamamen orada değil; ve telefonunuzun depolama alanı bin sohbet birikmesinden zarar görmüyor.

Tek dezavantaj: önemli bilgileri (adres, tarif, banka iban) ayrıca not almak gerekiyor.

## 4. Sohbet yedeğini şifreleyin (sadece WhatsApp varsayılan yapmaz)

WhatsApp mesajları cihazlar arasında uçtan uca şifrelidir — Meta bile okuyamaz. Ama yedeğinizi (iCloud'a veya Google Drive'a) varsayılan olarak **şifresiz** yedekler. Yani buluttaki yedeğinizi ele geçiren biri (Apple/Google hesabınız çalınırsa veya bir mahkeme kararıyla) tüm yazışmalarınızı okuyabilir.

**Yol:** Ayarlar → Sohbetler → Sohbet yedeği → Uçtan uca şifreli yedek → **Aç**.

Uygulamanız 64 haneli bir şifre oluşturur veya parola belirlemenize izin verir. Bu şifreyi kaybederseniz **yedeğinize asla ulaşamazsınız** — yani parola yöneticinize kaydedin. Ama bir kez ayarlandığında, yedek artık Meta'nın bile açamayacağı bir kasada.

## 5. Sesli notları metne çevirin (yeni)

Aralık 2024'te global olarak gelen ve şubat 2026'da Türkçeyi tam olarak destekleyen özellik: gelen sesli notu dokunuşla yazıya çevirebiliyorsunuz. Toplantıdaysanız, ya da uzun bir sesli notla karşılaştığınızda hayat kurtarıyor.

**Yol:** Sesli notun üstüne uzun basın → **"Sese metne dönüştür"** seçeneği çıkar.

Bunu kullanmak için **Ayarlar → Sohbetler → Sesli Mesaj Yazıya Dönüştürme**'yi açmanız gerekir (varsayılan olarak kapalı). İlk açılışta küçük bir dil paketi indirilir.

İşlem cihaz üzerinde yapılır, sesiniz Meta sunucularına gitmez. Yani gizlilik açısından da güvenli.

## 6. Meta AI ile sohbet özeti (yeni, Türkiye sürümü)

Mart 2026'da Meta AI Türkiye'de aktif edildi. Uzun bir grup sohbetine geri döndüğünüzde — "tatil planı" grubunda 200 mesaj birikmiş gibi — sohbet başlığındaki AI ikonuna dokunup "**Bu sohbeti özetle**" diyebilirsiniz. 3-5 saniyede ana noktalar çıkıyor.

**Yol:** Sohbeti açın → üstteki mavi yıldız ikonu (Meta AI) → "Özet ver" yazın veya hazır komutlardan birini seçin.

Dikkat edilecek nokta: özetleme için mesajlar Meta'nın AI sunucularına gönderilir. Hassas konuşmalarda kullanmayın. Tatil planlaması, ortak alışveriş listesi, doğum günü planı için ideal.

## 7. Kanal abone olun (haber + ünlüler için sessiz akış)

Eylül 2023'te gelen ama Türkiye'de 2025'te popülerleşen **Kanallar** özelliği, takip eden ama mesaj yazmadığınız tek yönlü haberleşme. Spor kulübü, gazete, ünlü, müzisyen — abone olursunuz, anlık haberleri görürsünüz.

**Yol:** Güncellemeler sekmesi → Kanallar → **"+"** → Tara → İlgilendiklerinize abone olun.

WhatsApp'taki başka sohbetlerden ayrı bir sekmede tutulur, bildirimleri kontrol edebilirsiniz. Twitter'a tepkili olmayan birçok kişi için iyi bir alternatif. Politika için fazla kullanmayın — algoritması yok, sadece kronolojik akış. Bu güzel ama dezenformasyon süzgeci de yok.

## 8. Toplulukları (Communities) ailenizle kurun

Birden fazla grup yönetiyorsanız — örneğin "Aile Sohbeti", "Aile Tatil Planı", "Aile Doğum Günleri" — bunları tek bir Topluluk altında toplayabilirsiniz. Tek bir duyuru kanalı + alt grupların hepsine birden mesaj.

**Yol:** Sohbetler ekranı → sağ üst menü → **Yeni topluluk**.

100'e kadar üyenin olduğu küçük gruplarda mantıklı. Mahalle gruplarınızda, eski sınıf arkadaşlarınızla, kooperatif yöneticiliği yapıyorsanız çok işe yarıyor. Tek bir yerden tüm ailenizle ulaşmayı sağlar.

## Ek 5 dakikalık temizlik

Bu sekiz ayarı yaptıktan sonra, opsiyonel olarak şunları da yapın:

- **Bildirimleri grupla bazlı sessize alın:** Çok aktif olduğu için açık tutamadığınız grupları engellemeyin, sadece sessize alın. Sohbete uzun basın → bildirim sembolü.
- **Yer paylaşımı bittiğinde kapatın:** Birine canlı konumunuzu paylaştıysanız, "Paylaşımı durdur" demeyi unutmayın. Aksi takdirde 8 saate kadar paylaşılmaya devam eder.
- **Spam mesajları işaretleyin:** Bilinmeyen göndericiden bir mesaj geldiğinde "Spam olarak işaretle ve engelle" seçin. Bu, hem sizin telefonunuzu hem WhatsApp'ın spam veritabanını koruyor.

WhatsApp'ı yıllardır kullanan herkesin yapacağı en hızlı toparlanma bu. 15 dakika ayırın, sonra çayınızı için.`;

async function main() {
  // Delete old post if exists
  const old = await prisma.post.findUnique({ where: { slug: OLD_SLUG } });
  if (old) {
    await prisma.post.delete({ where: { slug: OLD_SLUG } });
    console.log(`✗ Deleted old post: ${OLD_SLUG}`);
  }

  // Upsert new post
  const existing = await prisma.post.findUnique({ where: { slug: NEW_SLUG } });
  if (existing) {
    const updated = await prisma.post.update({
      where: { slug: NEW_SLUG },
      data: { title: TITLE, excerpt: EXCERPT, content: CONTENT, published: true },
    });
    console.log("✓ Updated:", updated.id, updated.slug);
  } else {
    const created = await prisma.post.create({
      data: {
        slug: NEW_SLUG,
        title: TITLE,
        excerpt: EXCERPT,
        content: CONTENT,
        published: true,
      },
    });
    console.log("✓ Created:", created.id, created.slug);
  }
  console.log(`  View at /yazilarim/${NEW_SLUG}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
