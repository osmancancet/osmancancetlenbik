# 2209-A Ön Kontrol

**TÜBİTAK 2209-A başvuru metnini, TYBS'ye girmeden önce bilgi notundaki kurallara göre tarayıcıda kontrol eden ücretsiz araç.**

| | |
| --- | --- |
| Durum | v1.1 sitede: `arac/2209a-on-kontrol` dalı (§10a) · tek dosyalık v1.1 kopyası: `docs/araclar/on-kontrol-2209a/v1.1-artifact.html` |
| Hazırlayan | Öğr. Gör. Osman Can Çetlenbik · osmancancetlenbik.com |
| Adres | **https://osmancancetlenbik.com/araclar/2209a-on-kontrol** |
| Son güncelleme | 12 Ekim 2026 |
| Kural kaynağı | 2209-A 2026 Başvuru İçeriği Bilgi Notu, 2026 Çağrı Duyurusu |
| Kritik tarih | **11 Kasım 2026, 17.30**: 2209-A 2026 son başvuru · 23 Kasım 2026: kurum e-imzası |

> Bu dosya projenin tek doğruluk kaynağıdır. Kural, kapsam ya da arayüz değişirse önce burası güncellenir.

---

## İçindekiler

1. [Neden bu araç](#1-neden-bu-araç)
2. [Ürün ilkeleri](#2-ürün-ilkeleri)
3. [Kullanıcılar ve senaryolar](#3-kullanıcılar-ve-senaryolar)
4. [Kapsam ve sürümler](#4-kapsam-ve-sürümler)
5. [Kural kaynağı: bilgi notundan kurala](#5-kural-kaynağı-bilgi-notundan-kurala)
6. [Kontrol kataloğu](#6-kontrol-kataloğu)
7. [Sözlükler ve ayrıştırma](#7-sözlükler-ve-ayrıştırma)
8. [Arayüz](#8-arayüz)
9. [Gizlilik ve veri](#9-gizlilik-ve-veri)
10. [Teknik mimari](#10-teknik-mimari)
11. [Klasör yapısı](#11-klasör-yapısı)
12. [Geliştirme ortamı (VS Code)](#12-geliştirme-ortamı-vs-code)
13. [Test planı](#13-test-planı)
14. [Yayın ve adres](#14-yayın-ve-adres)
15. [Ölçüm](#15-ölçüm)
16. [LinkedIn lansman planı](#16-linkedin-lansman-planı)
17. [Yol haritası](#17-yol-haritası)
18. [Kabul kriterleri](#18-kabul-kriterleri)
19. [Riskler](#19-riskler)
20. [Açık sorular](#20-açık-sorular)
21. [Kaynaklar](#21-kaynaklar)

---

## 1. Neden bu araç

- **Zamanlama:** 2209-A 2026 çağrısı 7 Ekim 2026'da açıldı; son başvuru 11 Kasım 2026, 17.30. Aynı anda binlerce öğrenci ve danışman hoca metin yazıyor. 2023-1. çağrıda 188 üniversiteden 9.334 başvuru yapılmıştı.
- **Boşluk:** Pazar taramasında 2209-A ya da başka bir TÜBİTAK formatını bilen, Türkçe çalışan bir kontrol aracı bulunamadı. Mevcut destekler tek seferlik eğitimler ve genel sohbet botlarına yazılan istemlerden ibaret.
- **Sık hatalar mekanik:** Katkı toplamının 100 olmaması, literatür taramasının iş adımı yapılması, atıf yapılmamış kaynak, eksik DOI, karakter sınırının altında kalan bölüm. Bunların hepsi kodla, kesin olarak yakalanabilir.
- **Paylaşılabilirlik:** Danışman hocalar aracı öğrencilerine gönderir, öğrenciler de raporu hocalarına. Bu döngü LinkedIn'de doğal yayılım sağlar.

---

## 2. Ürün ilkeleri

1. **Metin tarayıcıdan çıkmaz.** Hiçbir başvuru metni sunucuya, analitiğe ya da üçüncü tarafa gönderilmez. Bu, ürünün ana vaadidir; ihlal eden özellik yapılmaz.
2. **Kontrol eder, yazmaz.** Araç metin üretmez ve yeniden yazmaz. Neyin eksik olduğunu ve neden önemli olduğunu söyler.
3. **Her kural bir kaynağa dayanır.** Her kontrol, bilgi notundaki bir maddeye ya da açıkça "sezgisel" etiketli bir iyi uygulamaya bağlanır (§5).
4. **Kural ihlali ile tavsiye ayrılır.** "Düzelt" yalnızca bilgi notunda yazan kurallar içindir. Sezgisel tespitler "Gözden geçir" ya da "İpucu" olur.
5. **Yanlış alarmdan kaçınılır.** Emin olunmayan tespitte dil yumuşatılır ("görünen", "olası") ve seviye düşürülür.
6. **Resmî değildir.** TÜBİTAK adı yalnızca programı tanımlamak için kullanılır. Logo, renk ya da arayüz taklidi yapılmaz. Her sayfada "resmî araç değildir" notu bulunur.
7. **Önce çalışan, sonra güzel.** Her sürüm ilk açılışta örnek bir başvuruyla gelir ve ne yaptığını ilk ekranda gösterir.

---

## 3. Kullanıcılar ve senaryolar

| Kişi | Ne ister | Araçtaki karşılığı |
| --- | --- | --- |
| **2209-A öğrencisi** | Başvurunun kurallara uygun ve eksiksiz olması | Canlı kontrol listesi, sayaçlar, takvim ızgarası |
| **Danışman hoca** | Öğrencilerin taslaklarını hızlıca görmek | Öğrencinin kopyalayıp gönderdiği metin rapor |
| **TTO / proje ofisi** | Kurumdaki başvuruların kalitesini artırmak | Eğitimlerde gösterilecek ücretsiz araç |
| **LinkedIn'deki akademisyen** | Faydalı bir şeyi paylaşmak, öneri yazmak | Tek bağlantı, tek ekran, geri bildirim formu |

**Ana senaryolar**

1. Öğrenci sayfayı açar, örnek başvuruyu ve bulguları görür. "Formu temizle" deyip kendi metnini bölüm bölüm yapıştırır.
2. Yazdıkça sayaçlar ve kontrol listesi güncellenir. Bir bulguya tıklayınca ilgili alana gider.
3. İş adımlarını tabloya girer; ay ızgarasında takvimini görür. Katkı toplamı ve süre hataları anında işaretlenir.
4. "Raporu kopyala" ile sonucu danışmanına WhatsApp ya da e-postayla gönderir.
5. Ertesi gün aynı tarayıcıdan döner; taslağı kaldığı yerden yüklenir.

---

## 4. Kapsam ve sürümler

### v1 (tamamlandı)

Tek dosyalık HTML, `docs/araclar/on-kontrol-2209a/v1-artifact.html`. Tüm kontroller, takvim ızgarası, rapor kopyalama, geri sayım ve yerel taslak saklama çalışıyor.

### v1.1: Lansman sürümü (hedef 14 Ekim 2026)

- [x] Aracın osmancancetlenbik.com Next.js projesine `/araclar/2209a-on-kontrol` yolu olarak eklenmesi (§10). Davranış v1 ile birebir aynı kalır.
- [x] Aynı yolda "Ne kontrol ediliyor?" ve gizlilik bölümleri (arama motorları ve güven için)
- [x] `/araclar` listesine eklenmesi; atıf denetleyici, kaynakça biçimlendirici ve anonimleştiriciye çapraz bağlantılar
- [x] Kurallar ve sözlüklerin ayrı veri dosyalarına alınması (`lib/rules/`)
- [x] Birim testleri ve örnek başvuru setleri (§13)
- [x] Sitenin mevcut Open Graph altyapısıyla paylaşım görseli ve meta etiketleri (§14)
- [x] Gizlilik dostu, metin içermeyen sayfa ve olay ölçümü (§15)
- [x] Geri bildirim bağlantısı (sitenin iletişim sayfası ya da kısa bir form)
- [x] Türkçe karakterli dosya adıyla "Raporu .txt indir"

### v1.2: Geri bildirim sürümü (lansmandan 1 hafta sonra)

- [ ] LinkedIn ve geri bildirim formundan gelen en sık 3 isteğin eklenmesi
- [ ] Risk yönetimi için tablo girişi (risk · B planı · ilgili iş adımı)
- [ ] Yöntem ile takvim ilişkisi: yöntemde geçen işlerin takvimde karşılığı var mı (sezgisel, İpucu)
- [x] Yazdırılabilir rapor görünümü (`@media print`)

### v2 (2209-A son başvurudan sonra)

- [ ] Program seçici: 2209-B, 1001, 1002, 3501. Her program kendi kural dosyasıyla gelir.
- [ ] 1001 için .docx yükleme ve tarayıcıda ayrıştırma (sayfa, yazı tipi, bölüm). Dosya yine sunucuya gitmez.
- [ ] Kaynakça DOI doğrulaması (Crossref). Ağa çıkan tek özellik olacağı için açık onayla ve yalnızca DOI listesi gönderilerek çalışır.

### Kapsam dışı

- Metin üretme, yeniden yazma, "projeni yazayım" türü özellikler
- Hesap, giriş, sunucuda saklama
- TYBS'ye otomatik veri girişi ya da TYBS'den veri çekme

---

## 5. Kural kaynağı: bilgi notundan kurala

Aşağıdaki maddeler [2209-A Başvuru İçeriği Bilgi Notu (2026)](https://tubitak.gov.tr/sites/default/files/2026-10/2209-A_Basvuru_Icerigi_Bilgi_Notu.pdf) belgesinden alındı. Kontrol kimlikleri §6'daki katalogla eşleşir.

| Bilgi notundaki madde | Kontrol | Tür |
| --- | --- | --- |
| Özet en az 25, en fazla 450 kelime | `len-ozet` | Kural |
| 1.1 Konunun önemi ve bilimsel nitelik en az 350 karakter | `len-bilimsel` | Kural |
| 1.1 literatüre atıfla açıklanır | `cite-11` | Kural (sezgisel tespit) |
| 1.2 Amaç ve hedefler en az 350 karakter | `len-amac` | Kural |
| 1.2 hedefler açık, ölçülebilir, gerçekçi ve ulaşılabilir | `tip-amac-sayi` | İpucu |
| 2. Yöntem en az 350 karakter | `len-yontem` | Kural |
| Yöntem; tasarım, değişkenler, istatistiksel yöntemleri içerir | `tip-yontem-kelime` | İpucu |
| 3.1 En az bir iş adımı eklenmelidir | `wp-any` | Kural |
| 3.1 Proje süresi en fazla 12 aydır | `wp-time` | Kural |
| 3.1 Literatür taraması, sonuç raporu hazırlama, sonuçların paylaşımı ve malzeme alımı ayrı iş adımı olarak gösterilmez | `wp-forbidden` | Kural (sezgisel tespit) |
| 3.1 Başarı ölçütleri ölçülebilir ve izlenebilir olmalıdır | `wp-crit`, `wp-vague`, `tip-olcut-sayi` | Kural + sezgisel |
| 3.1 Başarı ölçütlerine verilen katkı değerlerinin toplamı 100 olmalıdır | `wp-sum` | Kural |
| 3.2 Riskler ve B planları belirtilir | `fill-risk`, `tip-b-plani` | Kural + İpucu |
| 3.3 Kullanılacak altyapı ve ekipman belirtilir | `fill-olanak` | Kural |
| 4. Çıktılar ölçülebilir, gerçekçi hedeflere dayandırılır | `fill-etki` | Kural |
| Listedeki tüm kaynaklara başvuru metninde atıf yapılmalıdır | `refs-match` | Kural (sezgisel tespit) |
| DOI numarası bulunan kaynakların sonuna DOI eklenmesi zorunludur | `refs-doi` | Kural (sezgisel tespit) |

Bilgi notunda olmayan, iyi uygulamaya dayanan kontroller:

| İyi uygulama | Kontrol | Gerekçe |
| --- | --- | --- |
| Genel, içi boş yöntem ifadeleri | `generic` | Hakem raporlarında en sık eleştirilerden biri |
| Metinde kişisel veri olmaması | `pii` | KVKK; başvuru metni birçok kişi tarafından okunur |
| Karakter sınırına çok yakın olmama | `tip-sinir-yakin` | TYBS sayımı farklı olabilir |

**Değişiklik günlüğü:** 12 Ekim 2026: `wp-forbidden` rapor deseni `rapor\p{L}*` olarak genişletildi. Eski desen "Sonuç raporunun hazırlanması" ve "Proje raporlarının yazımı" gibi yaygın yazımları kaçırıyordu. `ornek-hatali` sonucu değişmedi (12/18).

**Kural güncelleme süreci:** Yeni çağrı ya da bilgi notu yayımlandığında belge baştan sona okunur, bu tablo güncellenir, ardından `lib/rules/2209a-2026.ts` ve testler değiştirilir. Kural dosyası `dogrulamaTarihi` alanı taşır ve sayfada gösterilir.

---

## 6. Kontrol kataloğu

**Seviyeler**

| Seviye | Arayüzde | Ne zaman | Puana sayılır |
| --- | --- | --- | --- |
| `bad` | Düzelt (kırmızı) | Bilgi notundaki bir kurala aykırı | Evet |
| `warn` | Gözden geçir (turuncu) | Puan kaybettirmesi muhtemel ya da sezgisel tespit | Evet |
| `tip` | İpucu (gri) | İyileştirme önerisi | Hayır |

**Puan:** `geçen kural sayısı / uygulanabilir kural sayısı` olarak hesaplanır. Bir kural, verisi yoksa uygulanamaz sayılır. Örneğin iş adımı yokken `wp-sum` uygulanamaz. Bu durumda `wp-any` zaten başarısızdır.

### Puana sayılan kurallar (18)

| Kimlik | Bölüm | Seviye | Mantık | Mesaj örneği |
| --- | --- | --- | --- | --- |
| `len-ozet` | Özet | bad | Boşsa ya da kelime sayısı 25'ten az ya da 450'den fazlaysa | "Özet 512 kelime; en fazla 450 olmalı." |
| `len-bilimsel` | 1.1 | bad | Boşsa ya da karakter sayısı 350'den azsa | "1.1 Bilimsel nitelik 312 karakter; en az 350 olmalı." |
| `len-amac` | 1.2 | bad | Aynı, 350 karakter | |
| `len-yontem` | 2 | bad | Aynı, 350 karakter | |
| `wp-any` | 3.1 | bad | İş adımı sayısı 0 | "Çalışma takviminde iş adımı yok." |
| `wp-time` | 3.1 | bad | Her iş adımı için: ay boş; bitiş < başlangıç; başlangıç < 1 ya da bitiş > 12 | "İA2: 10–14. aylar; proje süresi en fazla 12 ay." |
| `wp-sum` | 3.1 | bad | Katkı toplamı ile 100 arasındaki fark ≥ 0,01 | "Katkı değerlerinin toplamı 90; 100 olmalı." |
| `wp-forbidden` | 3.1 | bad | İş adımı adı yasak iş sözlüğüyle eşleşirse (§7) | "İA1 'Literatür taraması': literatür taraması ayrı iş adımı olarak gösterilmez." |
| `wp-crit` | 3.1 | bad | Başarı ölçütü boş olan iş adımı | "İA3 için başarı ölçütü yazılmamış." |
| `wp-vague` | 3.1 | warn | Başarı ölçütü belirsiz ölçüt sözlüğüyle eşleşirse | "İA3 başarı ölçütü ölçülebilir değil: 'Başarıyla tamamlanması'." |
| `fill-risk` | 3.2 | warn | Boş | "3.2 Risk yönetimi boş." |
| `fill-olanak` | 3.3 | warn | Boş | |
| `fill-etki` | 4 | warn | Boş | |
| `cite-11` | 1.1 | warn | 1.1 doluysa ve içinde tanınabilir atıf yoksa | "1.1 bölümünde tanınabilir bir atıf yok." |
| `refs-match` | Kaynakça | warn | Sayısal atıf varsa numara eşleşmesi, yoksa soyadı–yıl eşleşmesi; atıfsız kaynak ya da kaynakçada olmayan atıf | "Metinde atıf yapılmamış görünen kaynaklar: 3. satır." |
| `refs-doi` | Kaynakça | warn | DOI içermeyen kaynak satırları | "4 kaynaktan 1 tanesinde DOI yok: 3. satır." |
| `generic` | Tüm metin bölümleri | warn | Genel ifade sözlüğüyle eşleşme | "2. Yöntem: 'uygun istatistik yöntemleri ile'." |
| `pii` | Tüm metin bölümleri | bad | Geçerli TC kimlik no, cep telefonu ya da e-posta | "Olası TC kimlik numarası (10\*\*\*\*\*\*\*46)." |

### İpuçları (puana sayılmaz)

| Kimlik | Koşul |
| --- | --- |
| `tip-sinir-yakin` | 1.1, 1.2 ya da 2. bölüm 350–384 karakter arasında |
| `tip-amac-sayi` | 1.2 dolu ve hiç rakam içermiyor |
| `tip-yontem-kelime` | 2. Yöntem dolu ve yöntem sözlüğündeki hiçbir kelimeyi içermiyor |
| `tip-b-plani` | 3.2 dolu ve "B plan" ifadesi geçmiyor |
| `tip-olcut-sayi` | Başarı ölçütü dolu, belirsiz değil ama rakam içermiyor |

### Mesaj yazım kuralları

- Ne olduğunu ve ne yapılacağını söyle: önce `msg` (durum), sonra `hint` (ne yapmalı).
- Sayıları her zaman ver: "312 karakter; en az 350 olmalı. 38 karakter eksik."
- Kişisel veriyi asla tam gösterme: ilk 2 ve son 2 karakter, ortası yıldız.
- Sezgisel tespitlerde "görünen", "olası" gibi yumuşatıcılar kullan.

---

## 7. Sözlükler ve ayrıştırma

Tüm eşleştirmeler `toLocaleLowerCase("tr-TR")` ile küçük harfe çevrilmiş metin üzerinde yapılır. Desenler küçük harfle yazılır ve `u` bayrağı taşır.

### Yasak iş adımları (`wp-forbidden`)

```ts
[/literatür (taraması|araştırması|incelemesi|çalışması|derlemesi)/u, "literatür taraması"],
[/(sonuç |proje |final |ara )?rapor\p{L}* (yazım|hazırlan)\p{L}*|raporlama/u, "sonuç raporu hazırlama"],
[/sonuçların (paylaşıl|paylaşım|yaygınlaştırıl|sunul)\p{L}*|yaygınlaştırma/u, "sonuçların paylaşımı"],
[/(malzeme|ekipman|cihaz|sarf) (alım|temin|satın)\p{L}*|satın alma/u, "malzeme alımı"],
```

### Belirsiz başarı ölçütleri (`wp-vague`)

```ts
/başarı(yla|lı( bir şekilde)?) (tamamlan|gerçekleştiril|sonuçlan)\p{L}*/u,
/^(iş adımının |iş paketinin |çalışmanın )?(tamamlanması|bitmesi|bitirilmesi|tamamlandı)\.?$/u,
/olumlu sonuç/u,
/hedef(ler)?e ulaşıl\p{L}*/u,
/istenilen (düzey|seviye|sonuç)/u,
/^%?\s*100\s*%?$/u,
```

### Genel ifadeler (`generic`)

| Desen | Öneri |
| --- | --- |
| `standart (yöntem\|teknik\|prosedür\|analiz)\p{L}* (kullanıl\|uygulan\|yapıl)\p{L}*` | Hangi yöntemin, hangi parametrelerle ve neden seçildiğini yaz. |
| `uygun (bir )?(istatistik(sel)? )?(yöntem\|analiz\|teknik\|test)\p{L}* (ile\|kullanılarak\|yapılacak\|uygulanacak)` | "Uygun" yerine yöntemin adını ve seçim gerekçesini yaz. |
| `gerekli (analiz\|çalışma\|işlem\|test)\p{L}* (yapılacak\|gerçekleştirilecek)\p{L}*` | Hangi analizlerin yapılacağını tek tek yaz. |
| `literatürde(ki)? (yer alan\|bulunan\|mevcut) yöntem\p{L}*` | Yöntemin adını, kaynağını ve projeye nasıl uyarlanacağını yaz. |
| `en (son\|güncel\|yeni) teknoloji\p{L}* (kullanıl\|ile)\p{L}*` | Kullanılacak teknolojiyi adıyla belirt. |
| `(çeşitli\|bazı) (yöntem\|analiz\|teknik\|test)ler\p{L}*` | Yöntemleri tek tek adıyla yaz. |

### Yöntem sözlüğü (`tip-yontem-kelime`)

```ts
/tasarım|değişken|örneklem|istatisti|analiz|model|deney|ölçek|anket|veri seti|katılımcı/u
```

### Sayım

| Ölçü | Tanım |
| --- | --- |
| Kelime | `/\S+/g` eşleşme sayısı |
| Karakter | Baştaki ve sondaki boşluklar kırpıldıktan sonra Unicode kod noktası sayısı (`[...metin].length`); aradaki boşluklar dahil |

TYBS'nin boşlukları sayıp saymadığı teyit edilmedi (§20). Bu yüzden 350–384 aralığında ipucu verilir.

### Atıf ayrıştırma

| Biçim | Örnek | Desen özeti |
| --- | --- | --- |
| Parantez içi soyadı–yıl | `(Yılmaz, 2022; Demir vd., 2023)` | Parantez içi `;` ile bölünür. Her parça: Büyük harfle başlayan soyadı + isteğe bağlı `ve / vd. / et al. / & / and` + ikinci soyadı + yıl |
| Anlatı biçimi | `Kaya ve Arslan (2024)` | Soyadı + isteğe bağlı `vd.` + `(yıl)`. İki yazarlıda ikinci soyadı yakalanır. |
| Sayısal | `[1]`, `[1, 3]`, `[2–5]` | Köşeli parantez içi sayı, virgül ve aralık |

**Eşleştirme:**

- Sayısal atıf varsa numaralar kaynakça satır sırasıyla eşleştirilir.
- Yoksa her kaynak satırında soyadı (Türkçe küçük harfle) ve yıl birlikte aranır.
- Kaynakça satırlarının başındaki `1.`, `1)` ve `[1]` numaraları silinir.

**DOI deseni:** `/10\.\d{4,9}\/[^\s"<>]+/i`

### Kişisel veri

| Tür | Desen | Ek doğrulama |
| --- | --- | --- |
| TC kimlik no | `(?<!\d)[1-9]\d{10}(?!\d)` | Sağlama algoritması: 10. hane = ((1+3+5+7+9. haneler) × 7 − (2+4+6+8. haneler)) mod 10; 11. hane = ilk 10 hanenin toplamı mod 10 |
| Cep telefonu | `(?<!\d)(?:\+90[\s-]?\|0)?5\d{2}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}(?!\d)` | — |
| E-posta | `[\w.+-]+@[\w-]+(?:\.[\w-]+)+` | — |

---

## 8. Arayüz

### Yerleşim

- **Masaüstü (> 920 px):** Solda form, sağda 380 px genişliğinde yapışkan kontrol paneli.
- **Mobil:** Kontrol paneli formun üstüne geçer. Bulgu listesi kendi içinde kaydırılır (en fazla 46vh).
- **Sıra:** Form bölümleri TYBS adım sırasını izler: Özet → 1.1 → 1.2 → 2 → 3.1 → 3.2 → 3.3 → 4 → Kaynakça.

### Bileşenler

| Bileşen | Davranış |
| --- | --- |
| Geri sayım | 11 Kasım 2026 17.30 (UTC+3) için "N gün M saat kaldı"; dakikada bir güncellenir; süre dolunca "Süre doldu" |
| Bildirim şeridi | Örnek yüklüyken "örnek, bilerek bırakılmış hatalar var"; kullanıcı verisindeyse "taslak yalnızca bu tarayıcıda" |
| Metin alanı + sayaç | Sınırı olan bölümde rozet: gri (boş), kırmızı (eksik/fazla), yeşil (uygun) |
| İş adımı tablosu | Ad, başlangıç ayı, bitiş ayı, başarı ölçütü, katkı %. Satır ekle/sil. Mobilde yatay kaydırma. |
| Takvim ızgarası | 12 sütun; her iş adımı bir çubuk; hatalı aralık kırmızı |
| Katkı toplamı rozeti | "90 / 100": 100 ise yeşil, değilse kırmızı |
| Kontrol paneli | "12/18 kural tamam" + kural başına bir hücrelik ölçer + seviye sayıları |
| Bulgu kartı | Seviye şeridi, bölüm etiketi, mesaj, öneri. Tıklanınca ilgili alana kaydırır, vurgular, odaklar. |
| Raporu kopyala | Düz metin rapor; panoya yazamazsa gizli metin alanıyla yedek kopyalama; durum mesajı |
| Formu temizle | İki adımlı onay: ilk tıklamada "Silmek için tekrar tıkla", 3,5 sn sonra eski hâline döner |

### Durumlar

| Durum | Ne görünür |
| --- | --- |
| İlk ziyaret | Örnek başvuru: 2 düzelt, 4 gözden geçir, 1 ipucu |
| Kayıtlı taslak var | Kullanıcının taslağı yüklenir |
| Boş form | Tüm uzunluk kuralları "boş" bulgusu verir; puan düşüktür |
| Tüm kurallar tamam | Yeşil "Bilgi notundaki kuralların hepsi tamam görünüyor. Son kontrol için TYBS önizlemesine bak." |

### Görsel dil

- **Yazı tipleri:** Başlıklar Schibsted Grotesk, metin Atkinson Hyperlegible Next, sayılar IBM Plex Mono. Hepsi `next/font/google` ile derlemede projeye gömülür ve sistem yazı tipi yedekleri tanımlanır. Next.js sürümünde Atkinson Hyperlegible Next yoksa Atkinson Hyperlegible kullanılır.
- **Renk:** Mavi-gri nötrler ve mürekkep mavisi vurgu. Durum renkleri (kırmızı, turuncu, yeşil) vurgudan ayrı tutulur.
- **Tema:** Açık ve koyu tema; tüm renkler CSS değişkeni olarak tanımlanır.
- **TÜBİTAK görsel kimliği kullanılmaz.**

### Marka ve logo

| Dosya | Ne | Nerede kullanılır |
| --- | --- | --- |
| `brand/oc-mark.svg` | Kişisel monogram: iç içe geçmiş O ve Ç, koyu lacivert zemin | Afiş, sunum, sosyal medya |
| `brand/oc-lockup.svg` | Monogram + "Osman Can Çetlenbik · Öğretim Görevlisi" | Sunum, afiş, LinkedIn kapak görseli |
| `brand/on-kontrol-mark.svg` | Araç simgesi: iki takvim çubuğu ve onay işareti | Paylaşım görseli (`opengraph-image.tsx`), sunum |

Sitede kişisel monogram yerine profil fotoğrafı (`public/profile.png`) kullanılır. Monogram ve araç simgesi dosyaları ayrı paylaşım işleri için bu klasörün `brand/` alt klasöründe durur.

### Erişilebilirlik

- Her alanın `label`'ı var. Bulgu listesi `aria-live="polite"`.
- Klavye odak halkası görünür. `prefers-reduced-motion` desteklenir.
- Renk tek başına anlam taşımaz: her bulguda seviye adı yazılı.
- Büyük harfli etiketler için kapsayıcıda `lang="tr"` bulunur; "İ" doğru görünür.

---

## 9. Gizlilik ve veri

- **Sunucu yok.** Sayfa statiktir. Kontrollerin hepsi tarayıcıda çalışır.
- **Yerel taslak:**
  - `localStorage` anahtarı `on-kontrol-2209a-v1`; içeriği `{ text: {...}, wp: [...] }`.
  - Örnek başvuru kaydedilmez. Her okuma ve yazma `try/catch` içinde yapılır; depolama kapalıysa sayfa yine çalışır.
- **Analitik metin görmez:** Yalnızca sayfa görüntüleme ve §15'teki adsız olaylar ölçülür. Olaylarda metin, uzunluk ya da bölüm içeriği bulunmaz.
- **Çerez yok.** Çerez kullanmayan bir analitik aracı seçilir; böylece çerez onay penceresine gerek kalmaz.
- **Altbilgi metni:** "Metnin hiçbir sunucuya gönderilmez. Taslağın yalnızca bu tarayıcıda saklanır."
- **v2 notu:** DOI doğrulaması eklendiğinde ağa yalnızca DOI listesi gider. Bu, kullanıcı düğmeye bastığında ve bir açıklamayla olur.

---

## 10. Teknik mimari

**Karar: Araç, osmancancetlenbik.com Next.js projesine yeni bir sayfa olarak eklenir.**

```
https://osmancancetlenbik.com/araclar/2209a-on-kontrol
```

### Neden kişisel site

- **İsim ve güven:** Kişisel sitede yayınlamak, LinkedIn'deki görünürlüğü doğrudan ada ve unvana bağlar. Akademisyen kimliği aracın güvenilirliğini artırır ve "resmî TÜBİTAK aracı" sanılma riskini azaltır.
- **Hazır kitle:** Site `/araclar` altında 15 akademik araçla zaten bir araç merkezi. 2209-A Ön Kontrol bunlara eklenir, ziyaretçiler araçlar arasında gezer.
- **Arama motoru:** Bağlantılar ve görünürlük tek alan adında birikir.
- **Yeni altyapı gerekmez:** Barındırma, alan adı, Open Graph uç noktası (`/api/og`) ve tasarım hazır.
- **İleriye dönük:** Araç ileride bağımsız bir ürüne dönüşürse yeni alan adına 301 yönlendirmesiyle taşınabilir.

### Uyum kuralları

- **Mevcut düzen esas alınır:** Bu README'deki yol ve klasör adları önerinin kendisidir. Sitenin `src/` kullanımı, stil sistemi (Tailwind ya da CSS Modules), bileşen kütüphanesi ve diğer araçların klasör düzeni bunlardan önce gelir.
- **Tasarım:** Görünüm sitenin tasarım sistemine uyar. v1'in renk değişkenleri yalnızca sitede karşılığı yoksa kullanılır.
- **Gizlilik vaadi:**
  - Araç tamamen istemci bileşenidir (`"use client"`).
  - Bu araç için API route, Server Action ya da sunucuya veri gönderen kod yazılmaz.
  - Sitedeki diğer sunucu özellikleri (`/api/og`, görsel optimizasyonu) bu vaadi etkilemez; başvuru metni hiçbir isteğe girmez.
- **Analitik:** Sitede analitik varsa, araç sayfasında metin içeren hiçbir olay ya da otomatik form izleme çalışmamalıdır (§15).

### Katmanlar

```
┌──────────────────────────────────────────────────────────┐
│ app/araclar/2209a-on-kontrol/page.tsx                     │
│   sunucu bileşeni: başlık, açıklama, metadata, SSS        │
│   └─ <OnKontrol2209A />  ("use client")                   │
└───────────────┬──────────────────────────────────────────┘
                │
┌───────────────▼──────────────────────────────────────────┐
│ components/araclar/on-kontrol-2209a/  (istemci)            │
│   OnKontrol2209A · SectionField · WorkPackageTable · Gantt │
│   ReportPanel · FindingCard · Countdown · CopyReport       │
│   hooks: useDraft (localStorage) · useEvaluation           │
└───────────────┬──────────────────────────────────────────┘
                │ evaluate(state, rules)
┌───────────────▼──────────────────────────────────────────┐
│ lib/araclar/on-kontrol-2209a/engine/  (saf TypeScript)     │
│   evaluate · checks/* · text · citations · pii · report    │
├───────────────────────────────────────────────────────────┤
│ lib/araclar/on-kontrol-2209a/rules/  (veri)                │
│   2209a-2026.ts · dictionaries.ts                          │
└───────────────────────────────────────────────────────────┘
```

**Kurallar**

- `engine/` React'e, DOM'a, `localStorage`'a ya da tarayıcı API'lerine dokunmaz; Vitest ile Node'da test edilir.
- `rules/` yalnızca veri içerir. Yeni program (1001, 2209-B) eklemek, yeni bir kural dosyası ve gerekirse yeni kontrol fonksiyonu demektir.
- **Durum:** `OnKontrol2209A` bileşeninde `useReducer` ile tutulur.
- **Değerlendirme:**
  - Sayaçlar ve takvim her tuşta anında güncellenir.
  - `evaluate` sonucu `useDeferredValue` ile hesaplanır; yazarken arayüz takılmaz.
- **Kayıt ve hidrasyon:**
  - `useDraft` taslağı `localStorage`'a 300 ms gecikmeyle (debounce) yazar.
  - Taslak ilk çizimde değil, `useEffect` içinde okunur. Böylece sunucu HTML'i ile istemci HTML'i farklılaşmaz.
  - İlk çizimde örnek başvuru gösterilir; kayıtlı taslak varsa hemen ardından o yüklenir.
- **Geri sayım:** Kalan süre de yalnızca istemcide, `useEffect` içinde hesaplanır.
- **Statik sayfa:** Sayfa statik olarak üretilir (`export const dynamic = "force-static"`). Sunucuda istek başına çalışan kod yoktur.

### Tipler

```ts
// lib/araclar/on-kontrol-2209a/engine/types.ts
export type Severity = "bad" | "warn" | "tip";
export type SectionKey =
  | "ozet" | "bilimsel" | "amac" | "yontem" | "takvim"
  | "risk" | "olanak" | "etki" | "kaynak";

export interface WorkPackage {
  name: string;
  start: number | "";
  end: number | "";
  crit: string;
  pct: number | "";
}

export interface DraftState {
  text: Record<Exclude<SectionKey, "takvim">, string>;
  wp: WorkPackage[];
}

export interface Issue {
  msg: string;
  hint?: string;
  sec?: SectionKey;
}

export interface RuleResult {
  applies: boolean;
  issues: Issue[];
}

export interface Rule {
  id: string;
  sec: SectionKey | null;
  sev: Exclude<Severity, "tip">;
  title: string;
  source?: string; // bilgi notundaki madde
  run(state: DraftState, rules: ProgramRules): RuleResult;
}

export interface ProgramRules {
  program: "2209a";
  version: "2026";
  verifiedOn: string; // "2026-10-12"
  deadline: string;   // "2026-11-11T17:30:00+03:00"
  sources: { name: string; url: string }[];
  limits: Partial<Record<SectionKey, { unit: "kelime" | "karakter"; min?: number; max?: number }>>;
  maxMonths: number;  // 12
  contributionTotal: number; // 100
}

export interface Evaluation {
  results: { rule: Rule; pass: boolean; applies: boolean; issues: Issue[] }[];
  tips: Issue[];
  score: { passed: number; applicable: number };
}
```

### Ana fonksiyon

```ts
// lib/araclar/on-kontrol-2209a/engine/evaluate.ts
export function evaluate(state: DraftState, rules: ProgramRules): Evaluation;
```

Saf ve deterministik bir fonksiyondur: aynı girdi her zaman aynı çıktıyı verir. Rapor metni (`formatReport(evaluation)`) de ayrı bir saf fonksiyondur.

---

## 10a. Sitedeki uygulama

Araç sitenin düzenine uyarlandı. README'deki yol önerileri yerine sitenin `src/` yapısı kullanılır:

| Ne | Nerede |
| --- | --- |
| Sayfa (statik, `ToolShell` içinde, `wide`) | `src/app/araclar/2209a-on-kontrol/page.tsx` |
| Paylaşım görseli | `src/app/araclar/2209a-on-kontrol/opengraph-image.tsx` |
| Katalog ve SSS metinleri | `src/app/araclar/2209a-on-kontrol/content.ts` |
| İstemci bileşenleri | `src/components/araclar/on-kontrol-2209a/` |
| Saf kontrol motoru ve kurallar | `src/lib/araclar/on-kontrol-2209a/` |
| Araç listesi kaydı | `src/data/tools.ts` (simge `ClipboardCheck`) |
| Testler | `tests/araclar/on-kontrol-2209a/` |

- **Tasarım:** Renkler `tokens.module.css` içinde sitenin değişkenlerinden (`--bg`, `--fg`, `--accent`, `--border-strong`) türetilir; site teması değişirse araç da değişir. Yalnızca "Düzelt" ve "Gözden geçir" renkleri araca özgüdür. Yazı tipi sitenin Geist ailesidir.
- **Hazırlayan kartı:** `Hazirlayan.tsx`; fotoğraf `public/profile.png`, ad, unvan, kurum ve LinkedIn `src/data/profile.ts`'ten gelir.
- **Güvenlik başlığı:** `next.config.ts` üretimde yalnızca bu sayfaya `connect-src 'self'` içeren bir CSP ekler. Sayfa dışarıya veri gönderemez; Vercel Analytics aynı kökten çalıştığı için etkilenmez.
- **Kısa bağlantı:** `/2209` → `/araclar/2209a-on-kontrol` (308, `aliasRedirects`).
- **Analitik:** `analytics.ts`, Vercel Analytics `track()` ile `2209a_` önekli olaylar gönderir. Parametreler kapalı kümelerdir; metin geçemez.
- **Yapılandırılmış veri:** `WebApplication` (yazar: Öğretim Görevlisi Osman Can Çetlenbik) ve `FAQPage`.

```bash
npm install
npm run dev            # http://localhost:3000/araclar/2209a-on-kontrol
npm run typecheck && npm test
npx playwright install chromium && npm run e2e
```

---

## 11. Klasör yapısı

Sitenin mevcut deposuna eklenecek dosyalar (sitenin düzeni farklıysa ona uyarlanır):

```
osmancancetlenbik.com/  (mevcut Next.js deposu)
├── app/
│   └── araclar/
│       ├── page.tsx                       ← mevcut liste: yeni araç kartı eklenir
│       └── 2209a-on-kontrol/
│           ├── page.tsx                   ← sunucu bileşeni: başlık, açıklama, SSS, <OnKontrol2209A />
│           └── opengraph-image.tsx        ← ya da mevcut /api/og kullanılır (§14)
├── components/
│   └── araclar/
│       └── on-kontrol-2209a/
│           ├── OnKontrol2209A.tsx         ← "use client"; durum, değerlendirme, düzen
│           ├── SectionField.tsx
│           ├── WorkPackageTable.tsx
│           ├── Gantt.tsx
│           ├── ReportPanel.tsx
│           ├── FindingCard.tsx
│           ├── Countdown.tsx
│           ├── CopyReport.tsx
│           ├── ClearButton.tsx
│           └── hooks/
│               ├── useDraft.ts
│               └── useEvaluation.ts
├── lib/
│   └── araclar/
│       └── on-kontrol-2209a/
│           ├── rules/
│           │   ├── 2209a-2026.ts
│           │   └── dictionaries.ts
│           ├── engine/
│           │   ├── types.ts
│           │   ├── evaluate.ts
│           │   ├── text.ts
│           │   ├── citations.ts
│           │   ├── pii.ts
│           │   ├── report.ts
│           │   └── checks/
│           │       ├── lengths.ts
│           │       ├── workPackages.ts
│           │       ├── sections.ts
│           │       ├── references.ts
│           │       ├── language.ts
│           │       └── tips.ts
│           └── sample.ts
├── tests/
│   └── araclar/
│       └── on-kontrol-2209a/
│           ├── fixtures/
│           │   ├── ornek-hatali.json      ← beklenen: 12/18
│           │   ├── ornek-temiz.json       ← beklenen: 18/18
│           │   └── bos.json
│           ├── evaluate.test.ts
│           ├── dictionaries.test.ts
│           ├── citations.test.ts
│           ├── pii.test.ts
│           └── e2e.spec.ts
└── docs/
    └── araclar/
        └── on-kontrol-2209a/
            ├── README.md                  ← bu dosya
            └── v1-artifact.html           ← çalışan v1; davranış referansı
```

---

## 12. Geliştirme ortamı (VS Code)

### Kurulum

Mevcut site deposunda çalışılır; yeni proje kurulmaz.

```bash
cd osmancancetlenbik.com
git checkout -b arac/2209a-on-kontrol
pnpm add -D vitest @playwright/test       # depoda yoksa (npm/yarn kullanılıyorsa ona göre)
pnpm exec playwright install chromium
pnpm dev                                   # http://localhost:3000/araclar/2209a-on-kontrol
```

Bu README ve `v1-artifact.html` dosyasını `docs/araclar/on-kontrol-2209a/` altına, `CLAUDE.md` içeriğini deponun mevcut `CLAUDE.md` dosyasına bir bölüm olarak ekle.

### Eklenecek betikler (depoda yoksa)

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "e2e": "playwright test"
  }
}
```

### `vitest.config.ts` (depoda yoksa)

```ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname) } },
  test: { include: ["tests/**/*.test.ts"], environment: "node" },
});
```

### Önerilen VS Code eklentileri

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "vitest.explorer",
    "ms-playwright.playwright",
    "streetsidesoftware.code-spell-checker",
    "streetsidesoftware.code-spell-checker-turkish"
  ]
}
```

### Taşıma sırası (v1 → v1.1)

1. Sitedeki mevcut bir aracı (ör. `/araclar/atif-denetleyici`) aç; sayfa düzenini, stil yaklaşımını ve bileşen kullanımını örnek al.
2. Sözlükleri ve sınırları `lib/araclar/on-kontrol-2209a/rules/` altına al.
3. Kontrolleri `engine/checks/` altına saf fonksiyonlar olarak taşı. Her biri için önce testi yaz.
4. `ornek-hatali.json` ile v1'in verdiği sonucun (12/18; 2 düzelt, 4 gözden geçir, 1 ipucu) birebir aynı olduğunu doğrula.
5. Arayüzü bileşenlere böl ve sitenin tasarım sistemiyle giydir.
6. Sayfayı `/araclar` listesine ve menüye ekle. İlgili araçlara bağlantı ver: atıf denetleyici, kaynakça biçimlendirici, anonimleştirici.
7. Önizleme dağıtımında v1 ile yan yana karşılaştır, ağ sekmesinde metin içeren istek olmadığını doğrula.

---

## 13. Test planı

| Katman | Araç | Kapsam |
| --- | --- | --- |
| Sözlükler | Vitest | Her desen için en az 2 "yakalar" ve 2 "yakalamaz" örneği; Türkçe büyük harf varyasyonları ("LİTERATÜR TARAMASI") |
| Kontroller | Vitest | Her kural için geçen, kalan ve uygulanamaz durumları |
| Değerlendirme | Vitest | `ornek-hatali` → 12/18, `ornek-temiz` → 18/18, `bos` → yalnızca uygulanabilir kurallar |
| Atıf | Vitest | Parantez içi, anlatı, sayısal, aralıklı (`[2–5]`), karışık biçimler |
| Kişisel veri | Vitest | Geçerli ve geçersiz TC kimlik no, farklı telefon yazımları, maskeleme |
| Rapor | Vitest | `formatReport` çıktısının anlık görüntü (snapshot) testi |
| Uçtan uca | Playwright (yerel geliştirme sunucusu ya da önizleme dağıtımı) | Sayfa açılır → örnek görünür → temizle → metin yaz → puan değişir → bulguya tıkla → ilgili alana odaklanır → kopyala |
| Elle | Kontrol listesi | Gerçek bir 2209-A taslağını TYBS önizlemesiyle karşılaştır; karakter sayımı farkını not et |

**Son çalıştırma (12 Ekim 2026):** Vitest 104/104, Playwright 16/16 (masaüstü + telefon). Uçtan uca testler ayrıca şunları doğrular: metin içeren istek yok, localStorage kapalıyken hata yok, 400 px'te yatay kaydırma yok, `/2209` yönlendirmesi çalışıyor.

**Yanlış alarm bütçesi:** Gönüllü öğrencilerden alınan 10 gerçek taslakta "Düzelt" seviyesinde yanlış alarm 0, "Gözden geçir" seviyesinde en fazla 1 olmalı. Taslaklar izinle ve yalnızca yerelde kullanılır, depoya eklenmez.

---

## 14. Yayın ve adres

### Adres

```
https://osmancancetlenbik.com/araclar/2209a-on-kontrol
```

- Slug, sitedeki diğer araçlarla aynı biçimde: küçük harf, Türkçe karakter yok, kelimeler tireyle ayrılmış.
- Kısa paylaşım bağlantısı istenirse `osmancancetlenbik.com/2209` → `/araclar/2209a-on-kontrol` yönlendirmesi eklenir (`next.config` `redirects`, 308). Afiş, sunum ve WhatsApp mesajlarında kısa bağlantı kullanılır.

### Yayın

- Site nasıl yayınlanıyorsa araç da öyle yayınlanır. Ayrı barındırma gerekmez.
- Dal → önizleme → kontrol → ana dala birleştirme.

### Paylaşım önizlemesi (LinkedIn için kritik)

```ts
// app/araclar/2209a-on-kontrol/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "2209-A Ön Kontrol",
  description:
    "2209-A başvuru metnini TYBS'ye girmeden önce bilgi notundaki kurallara göre kontrol et. Ücretsiz, metin tarayıcıdan çıkmaz.",
  alternates: { canonical: "/araclar/2209a-on-kontrol" },
  openGraph: {
    title: "2209-A Ön Kontrol",
    description: "Katkı toplamı, 12 ay sınırı, iş adımları, atıf ve DOI kontrolü. Ücretsiz, tarayıcıda çalışır.",
    type: "website",
    locale: "tr_TR",
    url: "/araclar/2209a-on-kontrol",
  },
  twitter: { card: "summary_large_image" },
};
```

- Paylaşım görseli için sitenin mevcut `/api/og` uç noktası kullanılır. Gerekirse bu araca özel bir şablon eklenir.
- Görselde araç adı, "12/18 kural tamam" paneli, son başvuru tarihi ve site adı yer alır.
- Yayından sonra LinkedIn Post Inspector ile önizleme kontrol edilir.

## 15. Ölçüm

Sitede kullanılan analitik aracı kullanılır. Analitik çerezsiz ve adsız olmalı (ör. Vercel Web Analytics, Plausible ya da Umami). Araç olayları tek bir yardımcı fonksiyondan gönderilir; bu fonksiyon metin içeren hiçbir parametre kabul etmez. Oturum kaydı ya da otomatik form izleme yapan araçlar bu sayfada kapatılır. **Metin, kelime sayısı ya da bölüm içeriği asla gönderilmez.**

| Olay | Ne zaman | Özellik |
| --- | --- | --- |
| `sayfa_gorundu` | Yükleme | Yönlendiren kaynak (LinkedIn, WhatsApp, doğrudan) |
| `ornek_temizlendi` | "Formu temizle" onaylandı | — |
| `ilk_duzenleme` | Oturumdaki ilk kullanıcı girişi | — |
| `rapor_kopyalandi` | Kopyalama başarılı | Puan aralığı: `0-6`, `7-12`, `13-17`, `18` |
| `bulguya_tiklandi` | Bulgu kartı tıklandı | Kural kimliği |

**Hedefler (11 Kasım'a kadar)**

| Ölçüt | Hedef |
| --- | --- |
| Tekil ziyaretçi | 3.000 |
| Formu temizleyip kendi metnini giren ziyaretçi oranı | %35 |
| Rapor kopyalama | 500 |
| LinkedIn gönderisinde yorum | 50 |
| Geri bildirim formunda öneri | 30 |

Hedefler tahmindir; ilk haftanın verisine göre güncellenir.

---

## 16. LinkedIn lansman planı

### Zamanlama

- **Lansman:** Salı ya da çarşamba, 09.00–10.00 arası.
- Hedef 13–14 Ekim 2026. Son başvuruya yaklaşık 4 hafta kalırken.

### Lansman gönderisi

> 2209-A için son başvuru 11 Kasım. Öğrenci taslaklarında hep aynı hataları görüyoruz: katkı toplamı 100 değil, "literatür taraması" iş adımı yapılmış, kaynakçada atıf yapılmamış kaynak var, DOI eksik.
>
> Bunun için ücretsiz bir ön kontrol aracı hazırladım. Metni yapıştırıyorsunuz, araç TÜBİTAK'ın 2026 bilgi notundaki kurallara göre anında kontrol ediyor:
> • Özet 25–450 kelime, ana bölümler en az 350 karakter
> • Çalışma takvimi en fazla 12 ay, katkı toplamı 100
> • Ayrı iş adımı olamayacak işler
> • Atıf–kaynakça eşleşmesi ve DOI
> • Metinde unutulmuş kişisel veri
>
> Metniniz hiçbir sunucuya gitmiyor, tarayıcınızda çalışıyor. Resmî TÜBİTAK aracı değil; son kontrolü TYBS önizlemesinde yapın.
>
> Bağlantı ilk yorumda. Danışmanı olduğunuz öğrencilerle paylaşırsanız sevinirim. Hangi kontrolü eklememi istersiniz?

**Görsel:** Aracın ekran görüntüsü ya da 15–20 saniyelik ekran kaydı. Kayıtta örnek yüklenir, katkı toplamı 90'dan 100'e çekilir ve puan artar.

**İlk yorum:** `osmancancetlenbik.com/2209` kısa bağlantısı ve tek cümle: "Örnek başvuruyla açılıyor; 'Formu temizle' deyip kendi metninizi yapıştırabilirsiniz."

### Takip içerikleri (haftada 2)

| Tarih | Konu | Biçim |
| --- | --- | --- |
| 16 Ekim | Bilgi notuna göre ayrı iş adımı olamayan 4 iş | Karusel |
| 20 Ekim | İlk hafta: kaç kontrol yapıldı, en sık hangi hata çıktı (adsız, toplu) | Veri kartı |
| 23 Ekim | Ölçülebilir başarı ölçütü nasıl yazılır: 5 kötü ve 5 iyi örnek | Karusel |
| 27 Ekim | Gelen önerilerle eklenen yeni kontroller | Kısa video |
| 30 Ekim | Kaynakçada DOI ve atıf: en sık 3 hata | Karusel |
| 3 Kasım | Son 8 gün: kontrol listesi | Tek görsel |
| 10 Kasım | Son gün hatırlatması ve canlı soru-cevap | Etkinlik |
| 13 Kasım | Sonuç: toplam kullanım, öğrenilenler, sıradaki program (1001?) | Yazı |

### Kurallar

- Her gönderide bir somut sayı ve bilgi notuna bir gönderme olsun.
- Yorumlara ilk 2 saat içinde yanıt ver. Öneriyi ekledikten sonra öneriyi yapanı etiketle (izniyle).
- "TÜBİTAK onaylı" gibi bir ifade asla kullanılmaz.

---

## 17. Yol haritası

| Tarih | Kilometre taşı |
| --- | --- |
| 12 Ekim 2026 | v1 çalışıyor; proje dosyası hazır |
| 13 Ekim | Siteye taşıma (`/araclar/2209a-on-kontrol`), testler, `ornek-hatali` 12/18 doğrulaması |
| 14 Ekim | Paylaşım görseli, kısa bağlantı, araçlar listesine ekleme; **lansman** |
| 21 Ekim | v1.2: geri bildirimden ilk 3 istek, risk tablosu |
| 28 Ekim | Yöntem–takvim ilişkisi ipucu, yazdırılabilir rapor |
| 11 Kasım, 17.30 | 2209-A son başvuru; kullanım raporu |
| Kasım–Aralık | v2: program seçici, 1001 kural dosyası, .docx ayrıştırma |

---

## 18. Kabul kriterleri

v1.1 yayına çıkmadan önce:

- [x] `pnpm typecheck`, `pnpm test` ve `pnpm e2e` geçiyor
- [x] Site derlemesi hatasız; araç sayfası statik üretiliyor (derleme çıktısında ○ ya da ● işaretli)
- [ ] Tarayıcı konsolunda hidrasyon uyarısı yok
- [x] `ornek-hatali` sonucu v1 ile birebir aynı: 12/18; 2 düzelt, 4 gözden geçir, 1 ipucu
- [x] Ağ sekmesinde metin içeren hiçbir istek yok (elle ve Playwright ile doğrulandı)
- [x] 400 px genişlikte yatay kaydırma yok (tablo kendi kabında kayar)
- [ ] Açık ve koyu temada tüm metinler okunur
- [ ] Klavyeyle tüm akış tamamlanabiliyor
- [x] `localStorage` kapalıyken sayfa hatasız çalışıyor
- [x] Altbilgide "resmî araç değildir" notu, kaynak bağlantıları ve doğrulama tarihi var
- [ ] LinkedIn Post Inspector'da başlık, açıklama ve görsel doğru görünüyor
- [ ] Lighthouse: Performans ≥ 95, Erişilebilirlik ≥ 95

---

## 19. Riskler

| Risk | Etki | Önlem |
| --- | --- | --- |
| Yanlış alarm | Güven kaybı, olumsuz yorum | "Düzelt" yalnızca bilgi notu kurallarında; sezgisel tespitlerde yumuşak dil; yanlış alarm bütçesi (§13) |
| TYBS karakter sayımı farklı | Sınırda kalan öğrenci yanılır | 350–384 aralığında ipucu; altbilgide açık not |
| Bilgi notu çağrı içinde güncellenir | Kurallar eskir | Haftalık kontrol; sayfada doğrulama tarihi |
| "TÜBİTAK aracı" sanılması | İtibar ve hukuki risk | Kişisel sitede yayın; resmî olmadığı notu; TÜBİTAK görsel kimliği yok |
| Kişisel veri endişesi | Kullanımın düşmesi | Sunucusuz mimari; metin göndermeyen analitik; açık gizlilik notu |
| Lansman ilgisinin hızla düşmesi | Düşük kullanım | Haftada 2 takip içeriği; geri bildirimle görünür güncellemeler |

---

## 20. Açık sorular

| Soru | Neden önemli | Nasıl çözülür |
| --- | --- | --- |
| TYBS karakter sayımı boşlukları içeriyor mu? | Sınır kontrolünün doğruluğu | Test taslağı girip TYBS sayacıyla karşılaştır |
| 3.2 Risk yönetimi tablosunun sütunları neler? | v1.2 risk tablosu | TYBS ekranına bak |
| 3.2, 3.3 ve 4. bölümlerin TYBS'de alt sınırı var mı? | `fill-*` kurallarının seviyesi | TYBS ekranına bak |
| Bilgi notunda geçen "bibliyografik veri düzenlemesine ilişkin duyuru" hangi biçimi istiyor? | Kaynakça kontrolü | Duyuruyu bul ve oku |
| Sitede analitik var mı, form izliyor mu? | Gizlilik vaadi | Analitik ayarlarını kontrol et |

---

## 21. Kaynaklar

- [2209-A Başvuru İçeriği Bilgi Notu (2026)](https://tubitak.gov.tr/sites/default/files/2026-10/2209-A_Basvuru_Icerigi_Bilgi_Notu.pdf)
- [2209-A 2026 Yılı Çağrı Duyurusu](https://tubitak.gov.tr/sites/default/files/2026-10/2209-A_2026_Yili_Cagri_Duyurusu.pdf)
- [2209-A başvuru sayfası](https://www.tubitak.gov.tr/tr/burslar/lisans/burs-programlari/2209-a/icerik-basvuru-formlari)
- [TÜBİTAK Üretken Yapay Zekâ Rehberi (Eylül 2025)](https://tubitak.gov.tr/sites/default/files/2025-09/UYZ_Rehberi-v02.pdf)
- [2023-1. çağrı başvuru sayıları (TÜBİTAK haberi)](https://tubitak.gov.tr/tr/haber/bakan-kacirdan-tubitak-burs-ve-destek-programlari-aciklamasi)
