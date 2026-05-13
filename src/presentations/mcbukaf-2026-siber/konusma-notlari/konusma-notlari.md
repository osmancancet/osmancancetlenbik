---
title: "İnteraktif Siber Güvenlik — Konuşma Notları"
subtitle: "MCBÜKAF '26 · Manisa Celal Bayar Üniversitesi"
author: "Öğr. Gör. Osman Can Çetlenbik"
date: "Mayıs 2026"
toc: true
toc-depth: 2
documentclass: article
geometry: margin=2cm
fontsize: 11pt
mainfont: "Helvetica Neue"
monofont: "Menlo"
---

# Sunum Hakkında

Bu döküman, 43 slaytlık "İnteraktif Siber Güvenlik" sunumunun her slaydı için açıklayıcı bir konuşmacı kılavuzudur. Notlar; ne söyleyeceğini, neden söylemen gerektiğini ve hangi anda audience'a süre bırakacağını anlatır. Süre tahmini 45–55 dakika sunum + 5–10 dakika soru-cevap.

**Klavye kısayolları:** Sağ ok / Boşluk / Enter ile ileri, Sol ok ile geri gidersin. 1'den 7'ye kadar olan rakam tuşlarıyla bölümler arasında atlayabilirsin (1: Açılış, 2: Oltalama, 3: Şifreler, 4: Sosyal Mühendislik, 5: 2026 Tehditleri, 6: Korunma, 7: Kapanış). F tuşu tam ekran açar.

**İnteraktif anlar:** Canlı şifre deneyi (slayt 13), QR phishing tuzağı (34–35), şifre kırma animasyonu (12), deepfake video (27), ransomware geri sayımı (36), karar senaryosu (41). Bu slaytlarda audience'a yeterli zaman bırakman çok önemli — slayt seninle değil seyircinle konuşuyor.

---

## BÖLÜM 1 · AÇILIŞ

### Slayt 1 · Kapak

Audience'a sıcak bir karşılama yap, kim olduğunu kısa kes. Sunum baştan sona "yapacağız, sadece anlatmayacağız" şeklinde geçecek; bunu önden bildirmek tonu kuruyor. Şöyle bir giriş işe yarar:

> "Herkese merhaba, ben Osman Can Çetlenbik. Manisa Celal Bayar Üniversitesi Teknik Bilimler Meslek Yüksekokulu'nda öğretim görevlisiyim. Sıradan bir sunum değil bu — bu salonda 50 dakika boyunca size siber güvenliği **anlatmayacağım**, sizinle birlikte **yapacağız**. Telefonlarınızı yakınınızda tutun, birkaç ekranda QR çıkacak; benim için katılımınız bu sunumun en önemli kısmı. Bittiğinde, eve giderken üç beş alışkanlık değişmiş olacak — söz veriyorum."

Bu aşamada 30 saniye yeterli. Salonu görmek için göz teması kur, kapağın üzerinde fazla durma.

---

### Slayt 2 · Hook · "Tablo karanlık"

Bu slayt sunumun ilk şok dozudur. Dört rakam birer birer büyür ve yanar; her birini sırayla anlat, sayıların kaynağını mutlaka belirt çünkü "abartı" izlenimi vermek istemiyoruz.

> "Şu rakamlara birlikte bakalım. Türkiye'de günde 11 milyondan fazla zararlı erişim talebi engelleniyor — bunu USOM açıklıyor, devlet kaynağı. Yani siz uyurken bile saldırganlar kapımızı çalıyor. Mart 2025'te TurkNet 2,8 milyon abonesinin verisi sızdırıldı; şirket başlangıçta '244 bin etkilendi' dedi, sonra dump açıldı — CEO'nun erişim bilgileri bile içindeydi. 2025'te 'Cumhuriyet Başsavcılığı' adıyla arayan tek bir çete 20 ilde operasyona uğradı, 85 gözaltı, 50 milyon TL vurgun. Ve dünyada deepfake sayısı sadece iki yılda 9 katına çıktı, Buffalo Üniversitesi araştırması. Bu dört rakamın hiçbiri tahmin değil — hepsinin altında belge var."

Her sayıyı söylerken 2-3 saniye dur, audience'ın sayıyı görmesi için. Toplam 45 saniye-1 dakika.

---

### Slayt 3 · TR Sızıntı Zaman Çizelgesi

Az önce verdiğin TurkNet rakamı bir noktanın hikâyesiydi — bu slayt bütün manzarayı gösteriyor. Yatay zaman çizgisinde yedi büyük olay var, 2022'den 2026'ya. Tek tek isim vermek yerine genel bir tablo çiz.

> "Bir bakın bu çizgiye. 2022'de '108 milyon vatandaşın verileri sızdırıldı' iddiası ortaya atıldı, Ulaştırma Bakanı 'pandemi döneminde bazı veriler sızdı' diyerek kısmen onayladı. 2024 USOM raporu 215 binin üzerinde saldırı bildirimi içeriyordu. 2025 Mart'ta TurkNet — az önce konuştuğumuz vaka. Mayıs'ta Antalya otellerine ransomware dalgası. Haziran'da tarihin en büyük credential dump'ı: 16 milyar parola, Türk devlet portalları Apple ve Google ile yan yana listedeydi. 2025 boyunca 3,3 milyon mültecinin verisi açığa çıktı. 2026'nın ilk çeyreğinde Baydöner ve Şikayetvar. Liste her ay büyüyor. **Hiçbir kurum 'bizden hiçbir şey çalınmadı' diyemiyor artık.**"

Slaytın altına dur, 5 saniye sus — sayıların etkisi yerleşsin.

---

## BÖLÜM 2 · OLTALAMA SALDIRILARI

### Slayt 4 · Bölüm 01 başlık

Bu kısa bir geçiş slaydı. Audience'ı oltalama dünyasına davet et.

> "Saldırganın elindeki en yaygın silah, en ucuz silah, en başarılı silah: **oltalama**. Bir mesaj, bir link, bir saniyelik düşüncesizlik. Önce çeşitlerine bakacağız, sonra örnekler. Çünkü oltalamayı tanımak için adlandırmamız lazım."

---

### Slayt 5 · Oltalama Türleri (6 kart)

Altı kart sırayla parlıyor. Her birini kısaca tanıt — çok ayrıntıya girme, sonraki slaytlarda her birini canlandıracağız.

> "Altı temel tip var ve hepsiyle muhtemelen karşılaştınız. **Smishing** — SMS yoluyla yapılan oltalama, Türkiye'de en yaygın versiyon. Kargo bekliyorsun, banka uyarısı bekliyorsun, e-Devlet'ten bir mesaj umuyorsun; saldırgan da bunu biliyor. **Phishing** — klasik e-posta versiyonu, hâlâ en çok kurban veren tür. **Vishing** — telefonla arama, ses üzerinden ikna, 'Komiser Yılmaz arıyor'. **Quishing** — restoran menüsünden sahte park ödemesine kadar her yere yapışan QR kodu. **Spear Phishing** — adına özel hazırlanmış, akademisyenleri ve muhasebeci çalışanları en çok vuran tür. **Whaling** — şirketin patronunu, müdürünü taklit edip finansa para istemek. Şimdi sırayla her birine bir örnek göstereceğim — animasyonlu, hepsi gerçek vakalardan alınmış."

Her kart için 5 saniye konuş, toplam 1 dakika.

---

### Slayt 6 · Sahte SMS'in Anatomisi

Bu slayt otomatik açılan dört ipucu ile akıyor. Sen yorum eklemek için duraklayacaksın. Slayt 4 katmanı 1,5'er saniyede açıyor.

> "Bir kargo SMS'i geldiğini düşünün. Şu mesaj nasıl yakalanır? Dört kontrol noktası var, sırayla bakalım. **Birinci:** gönderici. PTT'nin, MNG'nin, Aras'ın size kişisel cep numarasından SMS göndereceğine inanır mısınız? Gönderemez. Gerçek kurumsal SMS kısa, büyük harfli kod gibi gelir. **İkinci:** link. 'ptt-tr-kargo.com' — bakın bu gerçek değil. PTT'nin gerçek alan adı ptt.gov.tr. bit.ly veya tinyurl gibi kısaltıcılar nereye gittiğini gizler; resmi bir kurum size hiç kısaltıcıyla link yollamaz. **Üçüncü:** aciliyet kalıbı. '24 saat içinde', 'derhal', 'hemen' — bu kelimeler her zaman kırmızı bayraktır. Saldırgan düşünmeniz için zaman bırakmak istemez. **Dördüncü:** bilgi talebi. TC kimlik, kart numarası, SMS doğrulama kodu, 3D Secure onayı — devlet ve banka **hiçbir zaman** size SMS linki üzerinden bunları sormaz. Bu dört ipucundan sadece biri varsa: bir kez daha bakın. İkisi varsa: tıklamayın. Üçü varsa: doğrudan USOM'a ihbar edin."

Her ipucu açılırken üstüne konuş, slayt seninle senkronize akar.

---

### Slayt 7 · Güncel Vakalar

Üç somut vaka — soyut konuşmaktan kaçıp gerçek isimler veriyoruz. Audience daha çok TurkNet'i veya Savcılık çetesini tanıyacak.

> "Şimdi soyuttan somuta gelelim. Üç vaka, hepsi Türkiye'den, hepsi 2025. **Birincisi TurkNet, Mart 2025.** Şirket önce 'sadece 244 bin abone' diye basın açıklaması yaptı. Sızdırılan dump açıldığında gördük ki rakam 2 milyon 800 bin — 11 kat fazla. Ve dump'ın içinde CEO Cem Çelebiler'in sistem erişim bilgileri vardı. **Şirketler yalan söylüyor, ona alışmamız lazım.** **İkincisi İstanbul-İzmir 'Savcılık' çetesi, 2025.** İstanbul Emniyeti Siber Suçlar birimi 20 ilde eşzamanlı operasyon yaptı: 85 gözaltı, 66 tutuklama, 50 milyon TL'lik vurgun. Repliği klasikti: 'Adınız terör örgütüne karıştı, soruşturma açıldı, gözaltı kararı var.' Bu kalıbı bilmek gerek. **Üçüncüsü 16 milyar parolalık dump, Haziran 2025.** Tarihin en büyüğü. Türk devlet portallarının kayıtları Apple, Google, Facebook ile aynı listede. Bunun anlamı şu: bir sitede sızıntıya uğrayan tekrar kullanılmış bir parola, ötekinin de anahtarıdır. Domino."

---

### Slayt 8 · AI ile Oltalama · 2026 Tehdidi

Bu yeni eklenen slayt 2026'nın değişimini anlatıyor. Eski yöntem ile yeni yöntem yan yana — solda 2020 versiyonu (bozuk Türkçe), sağda 2026 versiyonu (kusursuz AI).

> "Eskiden phishing'i bozuk Türkçeden anlardık. Şu solda 2020 versiyonu: 'Sevgili müsteri, yüksek lisans bursu için tebrikler, lütfeb buraya tıklayınız' — 'lütfen' yazmaya çalışmış, 'lütfeb' olmuş, imza yok, URL hacimsiz. Bu tür mailler kolay yakalanırdı. Şimdi sağdakine bakın — aynı tuzak, ama 2026 versiyonu. 'Sayın Ahmet Yılmaz, Manisa Celal Bayar Üniversitesi 2026/2027 dönemi için tarafınıza Yüksek Lisans Bursu tahsis edilmiştir.' Mükemmel Türkçe. Resmi imza. Hatta üniversitenin ismi doğru — çünkü ChatGPT veya benzeri bir araç bunu **5 saniyede** üretiyor. Üstelik sosyal medyandan ismin, bölümün, hatta tez hocanın adı çekiliyor, e-posta sana özel hazırlanıyor. **Eski ipuçlarımız işlemez oldu.** Yazımına bakma — **isteğine bak.** YÖK size mail yollayıp burs için link tıklayıp IBAN ister mi? Hayır. Resmi kurumun resmi kanalı vardır: e-Devlet, KYK uygulaması, telefon. Mail değil."

Audience'a sağdaki kartı okumaları için 10 saniye bırak.

---

### Slayt 9 · Hangisi Phishing? (Quiz)

İlk audience testi. 4 e-posta var, 4 saniye sonra cevaplar açılıyor. Sus, izle.

> "Sıra sende. Şu dört e-postaya bak. Hangisi sahte? Dördünden birini değil — birden fazlasını da seçebilirsin. 4 saniyen var, içinden seç ... [4 sn sus, audience gözleriyle quiz çözer] ... Şimdi cevaplar açılıyor. **Birincisi 'no-reply@instagram.com' — GERÇEK.** Alan adı doğru, içerik tipik bir giriş bildirimi. Bu e-posta gelirse 'beğenmediyseniz şu butona basın' diyebilir. **İkincisi 'destek@garanti-bbva-onay.com' — SAHTE.** Garanti'nin gerçek alan adı garantibbva.com.tr. '-onay.com' bir saldırgan ekidir. Üstelik 'ACİL — 24 saat içinde' deyimi de kırmızı bayrak. **Üçüncüsü 'bilgi@yok.gov.tr' — GERÇEK.** Resmi .gov.tr alanı, akademik takvim bildirimi gibi olağan içerik. **Dördüncüsü 'ceo@turknet-finans-acil.com' — SAHTE.** Gerçek TurkNet alanı turknet.com.tr, '-finans-acil' uydurma. 'Bugün halletmen gereken transfer, gizli' — bu kelime kombinasyonu Whaling kalıbı. Genel kural: **alan adının kök kısmı her zaman en sağdadır.** 'destek@garanti-bbva-onay.com' okurken sağdan başla: '.com' önce, sonra 'onay'. Yani gerçek alan 'onay.com', 'garanti-bbva' onun alt-domaini gibi gözüküyor."

4 saniye düşünme süresinde sus — bu kıymetli bir an. Reveal'dan sonra 30 saniye açıkla.

---

## BÖLÜM 3 · ŞİFRELER

### Slayt 10 · Bölüm 02 · "Tek şifre = domino"

Şifreler bölümü stat kartlarıyla açılıyor. Dört rakam var.

> "Şimdi sebebini konuşalım: niye şifre bu kadar önemli. Çünkü tek şifre bir hesabı değil, bütün dijital hayatı tehdit ediyor — domino düşer. Birkaç rakam: '123456' parolasını saldırgan **0,001 saniyede** kırıyor. Kullanıcıların yüzde 83'ü aynı şifreyi birden çok yerde kullanıyor — yani bir sitede sızdı mı, hepsi sızmış oluyor. Türkiye'de ortalama şifre uzunluğu 8 karakter; bu çok az. Aynı şifreyi 12 karaktere çıkarıp karışık küme kullansak — küçük harf, büyük harf, rakam, sembol — saldırganın kırma süresi 3.000 yıla çıkıyor. **Sekiz karakter ile 12 karakter arasında dünya farkı var.**"

---

### Slayt 11 · TR'de En Çok Kullanılan Şifreler

8 satırlık liste açılıyor: gerçek Türkiye top 8.

> "Türkiye 2024–2025 listesi. NordPass ve diğer parola güvenliği şirketleri bunu her yıl yayınlar. Birinci sırada **'123456'** — kırılma süresi bir saniyenin altında. İkinci **'123456789'** — aynı. Üçüncü **'password'**, dördüncü **'qwerty'**, beşinci **'111111'** — hepsi 'çok zayıf' kategorisinde. Şimdi altıncıya bakın: **'fenerbahce'**. Yedinci: **'galatasaray'**. Sekizinci: **'ankara1453'**. Türkiye'de en çok kullanılan ilk 10 şifrenin en az dördü kültürümüze ait. Saldırganın sözlüğünün başında bu kelimeler yazıyor. Liste her yıl güncellenir, içerik hep aynıdır. Soruyorum: bu listede sizin şifreniz var mı?"

5 saniye sus. Salonda mutlaka 'eyvah' ifadesi göreceksin. Bir kişiyle göz temasıyla şaka yap: "Bakış kaçırıyorsun — değiştireceksin değil mi?"

---

### Slayt 12 · Şifre Kırma Animasyonu

5 örnek şifre sırayla brute-force atılır, ekranda canlı kırma animasyonu var. Her bir şifre yaklaşık 6 saniye sürer, toplam 30 saniye.

> "Beş örnek şifreyi sırayla saldırgana veriyoruz. Yanda 'brute-force ilerleme' barı var, ekranda saldırganın denediği karakterler akıyor. **Birinci '123456'** — kırıldı, **'anında'** — 0,001 saniyenin altında. **İkinci 'ankara06'** — şehir adı artı plaka kodu, sözlük saldırısıyla **0,3 saniye**. **Üçüncü 'Kalem42!'** — sekiz karakter, karışık küme; **yedi dakika**, bir kahve molası. **Dördüncü 12 karışık karakter** — saldırganın hesabı **3.000 yıl**. **Vazgeçer.** **Beşinci, cümle şifre 'Manisa-uzumleri-2026!'** — uzunluk artar, karakter çeşitliliği artar; saldırgan için **sonsuz**. Üstelik bu şifreyi hatırlamak çok kolay. Yine fark ettiniz mi? Uzunluk + farklı karakter kümeleri = bambaşka bir oyun."

Animasyon kendi başına oynar. Sen her ekran değişiminde tek cümle söyle, beraber akın.

---

### Slayt 13 · CANLI DENEY · Telefonunla Şifre Test Et

Sunumun en interaktif anlarından biri. Audience telefonunu çıkarır, QR'ı tarar, kendi kullandığı bir şifreyi yazar. Şifre **sunucuya gitmez** — sadece uzunluk, entropi, kırılma süresi ekrana yansır.

> "Şimdi sıra sende. Telefonunu çıkar, QR'ı tara. Karşına bir ekran çıkacak — 'Şifre Testi' diyor. Lütfen kendi kullandığın bir şifreyi yaz. Endişelenme: **gerçek şifre bize hiç gelmiyor.** Sadece kaç karakter, ne kadar karışık, kırılma süresi ne — bunları hesaplıyoruz. Bilinen sızıntılardaysa onu da gösteriyoruz. 'Sonucu Ekrana Yansıt' butonuna bas. Birkaç dakika bekleyelim, salondaki şifreler ekrana akacak."

Bekle. 10-30 saniye içinde ilk testler gelmeye başlar. Sayaç artar. Yeterli sayıda test geldiğinde (5-10 kişi), boşluk tuşuna basıp **reveal fazı**na geç:

> "Bakın bunlar şu an siz olarak gönderdiğiniz şifrelerin parmak izleri. Kalınlık, uzunluk, renk — hepsi şifrenin gücünü gösteriyor. Bazıları kırmızı: kırılma süresi 1 saniyenin altında. Yeşilller: sağlam. Şu an buradayız çünkü ben sadece **parmak izini** istedim. Yarın sahte bir Garanti girişi olsa, şifrenin **tam halini** alırdı. **Bu ders bedavaya geldi.**"

Bu bölümde acele etme — 60-90 saniye. Audience canlı sonucu gördükçe sunuma dahil oluyor.

---

### Slayt 14 · "Şifrenizi tanımadığınız bir sayfaya verdiniz."

Slayt tek satırlık vurgu cümlesi. Önceki sayfayı tekrar tetikle.

> "Şu cümleyi bir saniye düşünün. Sizi tanımıyorum, şu salonun büyük çoğunluğu beni de tanımıyor. Ama az önce hepiniz benim sayfama şifrenizi yazdınız. Bir QR taradınız diye. Ben sadece parmak izini aldım, ama gerçek bir saldırgan şifrenin kendisini alırdı. **İşte phishing budur.**"

10 saniye duraksa.

---

### Slayt 15 · Cümle-Şifre + 2FA

Çözüm slaydı — iki sütun, Yapmayın / Yapın.

> "Şimdi çözüm. Sol taraf yapmamanız gerekenler. Aynı parolayı her sitede kullanmak — her sızıntı domino. Doğum tarihi, ad-soyad, takım adı — saldırganın sözlüğünde. Monitör kenarında sticky note — temizlikçi de görür, kameralı toplantıda da. SMS 2FA tek başına — SIM swap saldırısıyla 5 dakikada hesabınıza girerler, anlatacağım. Sağ taraf yapmanız gerekenler. **Cümle-şifre kullan:** 'Manisa-üzümleri-2026-tatlı!' — hem uzun, hem hatırlanır, hem güçlü. **Her hesaba farklı parola** — hatırlamak imkânsız, o yüzden **şifre yöneticisi kullan.** 1Password, Bitwarden, Apple/Google Parolaları — hepsi ücretsiz başlıyor. **Authenticator uygulaması** — Google Authenticator, Microsoft Authenticator, Authy. SMS değil, bu uygulamalar. **Kritik hesaplarda passkey veya donanım anahtarı** — YubiKey gibi."

---

## BÖLÜM 4 · SOSYAL MÜHENDİSLİK

### Slayt 16 · Bölüm 02 başlık

> "Şimdi konunun en insani kısmı. Güvenlik duvarını saldırgan geçemiyorsa ne yapar? **Kullanıcıyı ikna eder.** İnsanlar hacklenmez — ikna edilir. Sosyal mühendislik bunun adı."

---

### Slayt 17 · Saldırganın 5 Silahı

> "Saldırganın elinde beş silah var ve hepsi her dolandırıcılıkta bulunur. Sadece sırası ve yoğunluğu değişir. **Birinci, aciliyet:** 'Şimdi yapmazsan kaybedeceksin' — kararı düşünmeden vermen için zaman bırakmaz. **İkinci, otorite:** savcı, polis, banka müdürü, BTK, müdür. Audience tartışmasız bir figürün gücünü kullanır. **Üçüncü, korku:** 'Hesabın kapanacak, suç işledin, kazaya karıştın' — beynin mantıktan duyguya kayar. **Dördüncü, ödül:** 'iPhone kazandın, kargo ücreti yatır.' Açgözlülüğe oynar. **Beşinci, güven:** 'Tanıdığım, akraban, eski sınıf arkadaşın' — ilişkinin kalkanını taklit eder. Şimdi şu cümleyi yazın bir yere: **bir mesajda iki silah varsa: durun. Üçü varsa: ihbar.** Bu dört saniye sizi kurtarır."

---

### Slayt 18 · Crypto / Yatırım Dolandırıcılığı

Türkiye'nin en derin yarası bu konu. Sayılar ağır.

> "Türkiye'nin en pahalı dersi: hızlı para vaadi. Şu dört rakama bakın. **Thodex:** 24 milyar TL, 400.000 mağdur, kurucu yurt dışına kaçtı, hâlâ tartışmalı. Sıradan bir kripto borsasıydı, bir gün siteyi kapattı. **Çiftlik Bank:** 5 milyar TL, 132.000 mağdur — klasik Ponzi şeması, yeni gelen para eski yatırımcıya 'kazanç' diye veriliyordu, sürdürülemezdi. **Deepfake yatırım reklamı artışı yüzde 430:** Acun Ilıcalı, ünlü oyuncular, profesörler yapay zekâ ile taklit ediliyor; sosyal medyada 'günde 5000 TL kazanın' diye reklam çıkıyor. **Türkiye'de tahminen 20 milyon kişi** yatırım dolandırıcılığına maruz kaldı. Genel kural çok basit: hızlı kazanç vaat ediyorsa, kayıptır. Tanıdığınız biri 'şu siteyi takip et, ben kazanıyorum' diyorsa, **muhtemelen o da düşmüş**, sadece şuan farkında değil."

Audience saygılı kalmaya dikkat — bu konuda mağdur tanıyan çok olabilir.

---

### Slayt 19 · WhatsApp · İş Teklifi Tuzağı

İlk tam animasyonlu sim. WhatsApp UI canlı oynar. Mesajlar 1,7 saniyede yazılır.

> "Şu ekrana bakın. WhatsApp'ta bilmediğin bir numaradan mesaj geliyor. Sırayla okuyacak. 'Merhaba, TikTok ajansından arıyoruz, kampanyamızda yer almak ister misiniz?' İlginç. 'Günde 800–2500 TL kazanırsınız, sadece beğeni atacaksınız.' Aklın 'denesem mi' diyor. 'İlk göreve başlamak için: bit.ly/gorev-2026' Sen yazıyorsun: 'tmm bakayım.' Beş saniye sonra dönüş: 'Tebrikler — 250 TL kazandın! Çekmek için 5.000 TL teminat gerekiyor.' **İşte tam burada hesabın çalınıyor.** Linke tıkladığın an WhatsApp QR girişin saldırgana geçti. Bilmediğin: rehberindeki 347 kişi şu anda aynı mesajı senden alıyor. Tek tıklama, bütün ağ. **İş veren para istemez — öder.** Bunu unutma."

Mesajlar oynarken sus, sadece son revealdan sonra konuş.

---

### Slayt 20 · Vishing · Sahte Savcılık Araması

Telefon araması arayüzü canlı oynuyor. Beş silah teker teker çıkıyor.

> "Şimdi telefon çalıyor — açıyoruz. 'İyi günler, ben Ankara Cumhuriyet Başsavcılığı'ndan Komiser Yılmaz.' Buraya kadar **otorite** silahı kullanıldı. 'Adınıza açılmış bir soruşturma var. Hesabınızdan terör örgütüne para transferi yapılmış.' **Korku** silahı. '15 dakika içinde ifadenizi alamazsak gözaltı kararı çıkacak.' **Aciliyet** silahı. 'Konuşmamız gizli — aileniz, banka çalışanı, kimseyle paylaşamazsınız, soruşturma sırrı.' **İzolasyon** silahı; mağdur tek başına bırakılır, aklını sorabileceği kimse yoktur. 'Şimdi tüm paranızı emanet hesabına aktaracaksınız. Sonra geri yatırılacak. ATM'ye gidin, ben telefonda kalıyorum.' **Vurgun** silahı. Beş silah, beş cümle, ortalama 3-5 dakika konuşma. Üstelik istatistikler gösteriyor ki bu kalıba sadece yaşlılar değil, üniversite mezunları, hatta finans çalışanları bile düşüyor. Çünkü panik düşünmeyi öldürür. **Kural:** Devlet asla telefonda para istemez. Kapatın. Telefonun ekranındaki numarayı değil, **bankanın 444'lü resmi numarasını** kendin ara."

---

### Slayt 21 · Predatory Dergi

Akademisyen audience'ı için. AcademicEmailSim ile mail kutusu canlanır.

> "Akademisyenler dinliyor. Bu sahne hepiniz için tanıdık olacak. Mail kutusuna geliyor: 'editor@ijar-publishing.net'. Konu: 'Your Manuscript IJAR-2026-44293 — ACCEPTED'. Açıyorsunuz. 'Manuscript accepted. Peer review completed in 18 hours. Impact Factor RIIF: 8.4.' Şimdi bir dakika düşünelim. **18 saatte hakem onayı** diye bir şey yok — gerçek dergilerde hakem süreci 3-6 aydır, bazen daha uzun. Bu 18 saat hakem değil, sizin **kredi kartı bekleme süresi**. **RIIF, GIF, IIIF** gibi 'impact factor' uydurmaları — gerçek Web of Science veya Scopus indeksleri bunlar değil. Sahte değerlendirme sistemleri. **349 dolar Article Processing Charge** istiyor. Ödediğiniz an makale 'yayımlandı' — ama akademik özgeçmişe sayılmaz, kimse atıf yapmaz, ÜAK reddeder. **Kontrol etmeniz gereken kanallar:** DOAJ (Directory of Open Access Journals), Cabells Journalytics, ULAKBİM TR-Dizin. Beall's listesi defunct olsa da arşivi referans niteliğinde."

---

### Slayt 22 · Sahte Konferans Davetiyesi

Aynı kalıbın konferans versiyonu.

> "Aynı kalıbın konferans versiyonu. Şimdi mail geliyor: 'secretariat@icas-bangkok-2026.com'. Konu: 'KEYNOTE INVITATION'. Açıyorsunuz: 'Dear Distinguished Professor, we are honored to invite you as KEYNOTE SPEAKER at the 16th International Conference on Advanced Studies, Bangkok. Selected from 12,000 researchers based on your outstanding contributions.' Şimdi tekrar bir dakika. **Gerçek konferanslar 'random keynote' daveti yollamaz.** Komiteler keynote'ları yıllar öncesinden, akademik prestij ve ağ üzerinden seçer. **'12.000 araştırmacı arasından seçildiniz'** uydurma — saldırgan e-posta listesini satın alıyor, herkese aynı şablonu yolluyor. **695 dolar kayıt ücreti**, üstelik 'konaklama dahil keynote speaker'a' — gerçek vakıflarla anlaşmalı konferanslar bunu yapar mı? Yapmaz. **Bangkok, Dubai, Roma odalı** konferansların çoğu paid-talk fabrikası: ödüyorsunuz, sahnede 15 dakika konuşuyorsunuz, makale 'proceedings'e' giriyor, ÜAK akademik teşvike saymıyor. Kontrol: think.checksubmit.org, WikiCFP, ilgili akademik derneğin resmi sayfası."

---

### Slayt 23 · YÖK Burs Bildirimi

Öğrenci hedefli akademik phishing.

> "Bu öğrenciler için. Mail geliyor: 'bilgi@yok-burs2026.gov-tr.com'. Konu: '2026/2027 Lisans Bursu Hesabınıza Yatırılacak'. Açıyorsunuz: 'Aylık 5.800 TL tutarındaki burs ödemeniz onaylandı. IBAN'ınızı doğrulamanız için 49,90 TL hizmet bedeli.' Şimdi alan adını okuyalım: **'yok-burs2026.gov-tr.com'** — peki gerçek YÖK alanı ne? **'yok.gov.tr'** veya **'kyk.gov.tr'**. 'gov-tr.com' uydurma bir alan. Saldırgan '.gov.tr' resmi uzantısını taklit ediyor ama .com sonuna eklemiş, üstelik 'gov' ile 'tr' arasına tire koymuş. **Birinci kural:** YÖK ve KYK burs doğrulaması için **ücret istemez.** 'Hizmet bedeli, doğrulama ücreti, dosya açma' diye bir şey yok. Gerçek kanallar: e-Devlet, KYK uygulaması, 444 1 962."

---

### Slayt 24 · Hangisi Gerçek Dergi?

İki kart yan yana — IJAR (sahte) vs IEEE (gerçek). 2,4 saniyede kırmızı/yeşil işaretler, 4,8 saniyede stamp.

> "Şimdi karşılaştırma. Solda 'International Journal of Advanced Research', IJAR Publishing Ltd, Mauritius merkezli, etki RIIF 8.4, hakem 18 saat, 349 dolar ücret. Sağda 'IEEE Transactions on Information Forensics and Security', IEEE Piscataway NJ, JCR Q1 — Impact Factor 6.8 Web of Science, hakem 3-6 ay, açık erişim opsiyonel. Hangisi gerçek? ... Bakın işaretler beliriyor. Predatory tarafta her şey kırmızı X: 'RIIF sahte impact factor', '18 saatte hakem onayı', 'Mauritius/Nijerya merkezli', '349 dolar baskısı'. Gerçek tarafta her şey yeşil ✓: 'Web of Science indeksli', 'Çift-kör hakem 3-6 ay', 'IEEE Society yayını', 'Açık erişim ek ödeme isteğe bağlı'. Şu özet kutusunu hatırlayın: **gerçek dergi:** tanınır yayıncı (IEEE, Springer, Elsevier), tanınır indeks (Web of Science, Scopus), aylar süren çift-kör hakem, şeffaf ücret politikası. **Predatory:** uydurma indeks adı (RIIF, IIIF), saatler içinde 'kabul', peşin yayın ücreti, yayıncı adı internette neredeyse hiç geçmiyor."

---

### Slayt 25 · CEO Vurgunu · Whaling

Whaling — şirket muhasebe çalışanına gelen CEO maili.

> "Şimdi şirket çalışanları için. Sen muhasebe departmanındasın, mail geliyor — gönderici 'celebiler.cem@turknet-ofis.com', CEO'nun adıyla. 'Sevgili Ahmet, bugün öğleden önce halletmemiz gereken bir transfer var. Yeni iş anlaşmamız için tedarikçimize 38.500 TL avans göndermen gerek. Avukatla görüşmedeyim, telefonda erişimim yok. Konu kimseyle paylaşılmasın, sadece sana güveniyorum.' İmza CEO. Bu kalıba **Whaling** diyoruz — büyük balık avlama. Üç sinyal var ve hepsi bir arada: **Acil** — bugün öğleden önce. **Gizli** — kimseyle paylaşma. **Nakit** — hemen transfer. Bu üçlü her zaman kırmızı bayraktır. Çözüm tek cümle: **telefonla yöneticiyi DOĞRULA.** Olabilecek en kötü şey, CEO'nun 'evet doğru, transferi yap' demesi. Hong Kong'da Arup adlı İngiliz mühendislik devi 2024'te bu yolla 25,6 milyon dolar kaybetti — çalışan deepfake video konferansa katıldı, odadaki herkes sahteydi."

---

### Slayt 26 · Altın Kural

Tek cümle vurgu slaydı.

> "Bu cümle hayat kurtarır. Lütfen bir yere yazın, telefonunuza kaydedin, ailenize öğretin. **Devlet asla telefonda para, altın veya şifre istemez.** Annenize, babaanenize, çocuğunuza tekrarlayın. 60+ yaş risk altında olduğu kadar 18-24 yaş da düşüyor — kimse bağışık değil, hatta üniversite mezunları, hatta finans çalışanları."

---

## BÖLÜM 5 · 2026 TEHDİTLERİ

### Slayt 27 · Deepfake · "Bu Morgan Freeman değil"

Video gömülü. ~1 dakika 49 saniye. Sen sus, sadece görmelerini bekle.

> "Şimdi bir video izleyelim. Bu Morgan Freeman gibi bakıyor, Morgan Freeman gibi konuşuyor. İzleyelim ... [video oynar] ... Evet, bu Morgan Freeman değildi. Bütünüyle yapay zekâ. Bu teknoloji 2022'de internet üzerine sızdı, 2023'te kalitesi insan ayırt edemez seviyeye çıktı. Konkre vakalar: Hong Kong'da Arup şirketi çalışanı CFO ve yöneticilerle video konferansa katıldı — odadaki herkes deepfake'ti, 15 transferde 25,6 milyon dolar gitti. Türkiye'de 2025'te MİT, Cumhurbaşkanı'nın ses klonunu kullanarak iş insanlarını arayan kişiyi tespit etti, yakaladı. Nasıl anlarsınız? Üç ipucu: **birincisi göz** — kırpma anormal, makine ritminde, bakışlar yapay biçimde sabit. **İkincisi dudak senkronu** — ses ile dudak hareketi sert ünsüzlerde (P, M, B) milisaniyelik kayar. **Üçüncüsü ton ve nefes** — klonlanmış seste nefes ve duraksamalar eksiktir, cümleler fazla pürüzsüz. Tanıdık ses, video, mesaj sana para istiyorsa — telefonu kapat, **kendi numarasından** geri ara. Önceden belirlenmiş bir 'aile parolası' işe yarar."

Video oynarken sus. Bittikten sonra 3 ipucu üzerine konuş.

---

### Slayt 28 · Canlı Saldırı Haritası

SVG radar görselleştirme — TR şehirleri, dönen sweep beam, rastgele saldırı pulse'ları.

> "Şu an Türkiye haritası. Her saniye bir şehir yanıyor — Phishing, Ransomware, DDoS, Brute-Force, Deepfake, SMS-Phishing. Sağda canlı log akıyor, son 7 saldırı görünüyor. USOM verisi günde 11 milyon engelleme yapıyor. **Bu görüntü, bu ekran, gerçeği temsil ediyor.** Saldırı dinmiyor. Bilgisayarınız, telefonunuz, hesabınız siz uyurken bile saldırı altında — ama bunu görmüyorsunuz, çünkü işletim sistemi ve servis sağlayıcı arkada engelliyor. O engelleme tabakası bir gün açık gelirse, ne yaparız? Şimdi sırasıyla yedi yeni tehdide bakacağız."

30 saniye saldırıları göster, sus, audience seyreder.

---

### Slayt 29 · Wi-Fi Tuzağı · Evil Twin

Animasyonlu telefon ekranı: Wi-Fi listesi → bağlandı → kırmızı leak ekranı.

> "Kafede oturuyorsun, Wi-Fi listesini açıyorsun. 'Cafe_Manisa_Free' var, şifresiz, sinyal güçlü, bağlanıyorsun. Ama bu cafe değil, **saldırganın yanı başınızdaki dizüstüsünden yayın yapan sahte hotspot**. Adı kafenin adına benzer şekilde uydurulmuş — buna 'Evil Twin' diyoruz. Bağlandığın anda tüm internet trafiğin onun ağına akıyor. Şu ekrana bakın: Instagram giriş POST'u — kullanıcı adı, şifre. Garanti girişi — TC, şifre. WhatsApp QR token'ı — oturumun çalınması. **Şifresiz Wi-Fi = sniffing.** Koruma üç adım: **birincisi şifresiz Wi-Fi'ya hiç bağlanma.** Eduroam, kafenin şifreli ağı, kendi mobil verin — bunlar var. **İkincisi VPN kullan** — public Wi-Fi'da şart. ProtonVPN ücretsiz versiyon iyi başlangıç, Mullvad ileri kullanıcı, NordVPN yaygın. 'Bedava VPN' uygulamalarına dikkat — kendileri saldırgan olabilir. **Üçüncüsü tarayıcıda HTTPS kilidi gör** — adres çubuğunda kilit yoksa, hiçbir bilgini bırakma."

---

### Slayt 30 · SIM Swap · Numaranın Çalınması

> "Bu saldırı son birkaç yılda Türkiye'de patladı. Saldırgan operatöre gidiyor — sahte kimlikle, bazen rüşvetle çalışana — diyor ki 'telefonum çalındı, yeni SIM lazım'. Operatör çalışanı kimlik kontrolü yapmıyorsa veya yanlış kimlikle ikna oluyorsa, 5 dakika sonra senin numaran saldırganın telefonunda. Şimdi sırayla domino düşüyor: SMS ile gelen 2FA kodları artık onun telefonuna gidiyor. Banka uygulamanın şifre sıfırlama kodu — ona. Instagram'ın doğrulama SMS'i — ona. E-postanın kurtarma kodu — ona. **2FA'nız SMS üzerinden ise, SIM swap saldırısıyla 5 dakikada uçar.** Koruma üç adım: **birinci** telefonunuzun Ayarlar menüsünden **SIM PIN aç**. SIM kart başka bir telefona takıldığında PIN sorar. **İkinci** operatör hesabınıza **çağrı şifresi** koy — operatör çağrı merkeziyle konuşmadan önce sözlü şifre sorulur. **Üçüncü ve en önemli:** SMS 2FA bırakın, **authenticator uygulaması** kullanın. Google Authenticator, Microsoft Authenticator, Authy. Kodlar telefonunuzda üretilir, SIM kart taşımaz."

---

### Slayt 31 · IoT Cihaz Güvenliği

> "Evinizdeki akıllı cihazlar — sandığınızdan büyük bir güvenlik tehdidi. **Akıllı kamera, bebek monitörü:** varsayılan şifre değiştirilmediyse, Shodan adlı arama motorundan binlerce TR kamerası canlı izlenebiliyor. Yatak odasına yerleştirdiğiniz IP kamera, internete açık IP'siyle Google'da arandığında karşınıza çıkıyor. **Akıllı asistan (Alexa, Google Home):** sürekli ses dinler, 'okay Google' dedikten sonrasını buluta gönderir, ama bazen yanlış anlar — özel konuşmalar bile kayda geçer. Yatak odasına, banyo yakınına koymayın. **Akıllı TV ve saat:** gereksiz uygulamaları silin, mikrofon izinlerini kapatın, firmware güncel olsun. Akıllı saatin sağlık verileri (kalp ritmi, uyku, lokasyon) izlemeye değer. **2016 Mirai botnet:** zayıf IoT şifreleriyle 600.000 cihazı ele geçirdi, DDoS saldırılarıyla yarı interneti çökertti — Netflix, Twitter, GitHub erişilemez hale geldi. Sebep tek bir şey: kullanıcılar IoT cihazlarındaki varsayılan şifreleri değiştirmemişti."

---

### Slayt 32 · USB / Donanım Tuzakları

> "Üç hardware tuzağı. **Birinci, yerde bulduğun USB'yi takma.** Bu klasik bir saldırı: 'Rubber Ducky' adlı cihaz dışarıdan sıradan bir USB belleğe benziyor, ama içinde mini bir bilgisayar var. Takıldığı an klavye olarak tanımlanıyor, 3 saniyede komutlar çalıştırıyor: arka kapı yüklüyor, dosyalar dışarı sızdırıyor, hesabı dışa açıyor. 2010'da İran nükleer santrallerini ele geçiren Stuxnet bu yolla yayıldı — fiziksel olarak USB ile içeri sokuldu. **İkinci, sahte şarj kabloları.** 'O.MG cable' adlı bir aparat var: dışarıdan iPhone şarj kablosuyla aynı görünüyor, ama içinde Wi-Fi'lı mini bilgisayar var. Telefonu klavye olarak kontrol ediyor, uzaktan komut çalıştırıyor. Apple Store'da satılan kablolardan ayırt etmek neredeyse imkânsız. **Sadece güvendiğiniz kabloyu kullanın.** **Üçüncü, public USB charging stations — juice jacking.** Havalimanı, kafe, alışveriş merkezi USB charging portları riskli. Şarj eden porttan veri de akabilir, hatta saldırgan zararlı yazılım kurabilir. **Çözüm basit:** kendi adaptörünüzle prize takın, USB porta değil. Ya da 'USB data blocker' adı verilen küçük aparatlar var, sadece güç geçiriyor, veri geçirmiyor."

---

### Slayt 33 · Malvertising · Sahte Reklam Tıklatma

> "Bu sinsi bir saldırı. Google'da 'Photoshop bedava indir' aradığını düşünün. İlk sonuç **REKLAM** olabilir — küçük 'Ad' ya da 'Reklam' yazıyor. Saldırgan sahte siteye Google'a ücret ödüyor, organik sonuçların üzerinde gösterilmesini sağlıyor. Tıklayıp 'photoshop_setup.exe' indiriyorsun. Açıldığında gerçek Photoshop kurulum ekranı görüntüleniyor — ama arkada **trojan** kuruluyor: **RedLine, Vidar** gibi bilgi hırsızı zararlılar. Tarayıcı kayıtlı şifreler, banka uygulaması oturum çerezleri, kripto cüzdan adresleri saldırgana akıyor. Buna **malvertising** diyoruz, 'malicious advertising'in kısaltması. Koruma: **uBlock Origin** veya benzeri reklam engelleyici kullanın — reklamların büyük çoğunluğunu görmezsiniz, ekstra olarak güvenlikte. **Resmi siteyi her zaman elle yazın** — 'adobe.com'u arama sonucundan değil, doğrudan adres çubuğuna. Yazılım indireceğiniz zaman VirusTotal sitesine dosyayı yüklüp 70+ antivirüsten taratın."

---

### Slayt 34 · QR Phishing · Anket (CANLI)

İkinci büyük interaktif moment.

> "Şimdi en sevdiğim deneyi yapacağız. Şu ekrana bakın: 'Değerlendirme ve Çekiliş — kısa anketi doldur, sürpriz hediye çekilişine katıl.' Bu güzel bir teklif. Telefonunuzu çıkarın, QR'ı tarayın. Bekleyeceğim, acele etmeyin. Tarayan herkes anketi açtığını sanıyor. Sayaç güncelleniyor, görüyor musunuz? 'X kişi katıldı, son: Y saniye önce.' Tamam, bir-iki dakika daha bekleyelim."

60-90 saniye bekle. Sayaç artar. Yeterli sayıda kişi (10+) taradığında boşluğa bas.

---

### Slayt 35 · QR Phishing · Reveal

> "İşte sayı: **kişi sahte bir QR'a güvendi.** Aslında anket falan yoktu. Tarayan herkes 'VERİLERİNİZ ALINIYOR' kırmızı ekranıyla karşılaştı. Telefonlarında 'cihaz tespit edildi, IP çözümleniyor, kişi listesi taranıyor, parolalar yedekleniyor' satırlarını gördünüz. Endişelenmeyin: bu bir demoydu, hiçbir şey çalmadık — sadece cihaz/tarayıcı/dil/saat dilimi okudum, hepsini yalnızca size gösterdim. Ama bir gerçek saldırgan QR'ı taradığın an bunların **çoğunu** yapabilirdi. Konum, kullandığın uygulamalar, izin verdiğin sayfalardaki oturum tokenları — eline geçen ekran üzerinden ciddi rakam. **QR = link.** Tıklamadan önce nereye gittiğini kontrol et. Bu sahnedeki QR güvenliydi — bir sonraki saldırgan bu kadar nazik olmayabilir."

---

### Slayt 36 · Ransomware Geri Sayım

> "Şimdi başka bir tehdidi sahneliyoruz. CryptoLock-26 fidye yazılımı verilerinizi şifreledi. Tüm dosyalarınız AES-256 ile kilitli — geri almak için 0.05 Bitcoin ödemeniz gerek. Bugünkü kurda yaklaşık 50.000 dolar, 1,5 milyon TL civarı. Geri sayım sayacı 5 dakikadan başlıyor. Süre bittiğinde fiyat **iki katına** çıkıyor — alelacele ödetmek için. Şimdi soru: **yedeğiniz var mı?** Yoksa fidye ödemek tek seçenek gibi görünüyor. Yedek varsa: hard diski formatla, son yedeği geri yükle, fidyeyi öderken gülümse. Yedeklemenin **3-2-1 kuralı** var: **3** kopya tutun (orijinal + 2 yedek), **2** farklı medya kullanın (örneğin dış disk + bulut), **1** kopya fiziksel olarak ayrı yerde olsun. Otomatik olarak haftada bir çalışsın — Mac'te Time Machine, Windows'ta File History."

Geri sayım kendi başına akar, audience'a sus.

---

## BÖLÜM 6 · KORUNMA

### Slayt 37 · Bölüm 03 başlık

> "Hücum kısmını bitirdik. Şimdi savunmaya geçiyoruz. Burada anlatacağım her şey, salondan çıkmadan **bugün** uygulayabileceğiniz adımlar."

---

### Slayt 38 · 5 Dakikada 5 Adım

> "Beş adım, beş dakika, hayat boyu fark. **Birinci adım: şifre yöneticisi kurun.** 1Password aylık 3 dolar, Bitwarden ücretsiz, Apple Parolaları ve Google Parolaları işletim sistemine entegre — ücretsiz. Bugün indirin, ana şifrenizi belirleyin, mevcut şifrelerinizi içeri taşıyın. **İkinci: banka, e-posta ve sosyal medyaya authenticator-tabanlı 2FA açın.** SMS olmasın — uygulama. Google Authenticator, Microsoft Authenticator, Authy. **Üçüncü: telefon ve bilgisayar güncellemelerini otomatik bırakın.** İşletim sistemi güncellemeleri can sıkıcı görünür ama kritik güvenlik yamaları içerir — saldırgan o yamaların kapamadığı eski hatalardan girer. **Dördüncü: haftada bir yedek alın.** 3-2-1 kuralı, az önce konuştuk. **Beşinci: 3 saniye dur. Linke tıklamadan, mesajı kontrol et.** Şimdi bu son adımı animasyonlu göstereceğim."

---

### Slayt 39 · 3 Saniye Kuralı (cinematic)

3 saniye sayaç + sahte SMS + suspicious marker'lar parlıyor.

> "Şu sahte SMS'e bakın: 'PTT KARGO: Gönderiniz gümrükte bekliyor. 24 saat içinde 24,90 TL ödenmezse iade edilecektir. hxxps://ptt-tr-kargo.com/ode'. Sayaç 3-2-1 sayıyor — DUR, BAK, DÜŞÜN. Saniye sıfırlanırken üç işaret parlıyor: **kişisel numara** (+90 555 0X XX XX, gerçek PTT bu numaradan SMS atmaz), **yanlış alan adı** (ptt-tr-kargo.com değil, gerçeği ptt.gov.tr), **aciliyet baskısı** (24 saat içinde, klasik kırmızı bayrak). 3 saniye + 3 işaret = kapatılan link. **TIKLAMA.** İşte buradaki kırmızı damga, ekranda gördüğünüz, yapmanız gereken şey: ekranı kapatın, mesajı silin."

---

### Slayt 40 · "Hesabım Çalındı — Şimdi Ne Yapacağım?"

Çok pratik bir slayt — audience'a fotoğraf çekmelerini öner.

> "Şimdi başınıza gelirse diye — ve gelme ihtimali var, hepimiz risk altındayız — bir kurtarma eylem planı. Bu slaytı telefonunuza kaydetmenizi tavsiye ederim, fotoğraf çekin, beş adım yazılı: **Birinci: hala erişiminiz varsa, şifreyi DEĞİŞTİRİN ve tüm aktif oturumları kapatın.** Instagram'da Settings → Security → Sessions, Gmail'de hesap güvenliği. Saldırganın oturum tokenı varsa zarar veriyor olabilir. **İkinci: 2FA'yı açın, kurtarma kodlarını yazın, kurtarma e-posta ve telefonunu kontrol edin.** Saldırgan bunları değiştirmiş olabilir — hesabı geri alamayacağınız bir tuzak. **Üçüncü: bankaya bağlı hesapsa, banka 24/7 hattını ARAYIN.** İşlem itirazı açın, kartı bloke ettirin. Banka kurtarma sürecini biliyor. **Dördüncü: domino önle.** Aynı şifreyi kullandığınız diğer hesapları acilen değiştirin — e-posta, sosyal medya, e-Devlet. Saldırgan bir kez giriş yaptıysa, listeyi denemiştir. **Beşinci: ihbar.** USOM (usom.gov.tr) çevrimiçi ihbar formu, KVKK (eDevlet üzerinden veri ihlali bildirimi), Cumhuriyet Başsavcılığı suç duyurusu, BTK 444 1 588. Şimdi fotoğraf çekin, 30 saniye veriyorum."

30 saniye sus, audience telefonlarıyla fotoğraf çeksin.

---

### Slayt 41 · Sen Ne Yaparsın? (Karar Senaryosu)

Son test. Audience'a 4 saniye düşünme süresi.

> "Son test — sen ne yaparsın? Senaryo: Instagram'dan gelen mail diyor ki 'hesabınızda şüpheli giriş tespit edildi, 1 saat içinde doğrulamazsanız hesap kalıcı silinecek'. Mailin sonunda 'Hesabımı Doğrula' butonu var. Sen ne yaparsın? Üç seçenek. 4 saniyen var, kararını içinden ver. ... Tamam, cevaplar açılıyor. **Doğru cevap B**: linke tıklamadan Instagram uygulamasından kontrol ederim. Bu **doğru kanal** — resmi uygulama veya doğrudan instagram.com adresine elle giriş. Mailin içindeki linke güvenmeden bilgiyi başka yerden doğrulamak. **A yanlış** — aciliyet baskısına kapılıyorsun, saldırganın istediği bu. Hesap kalıcı silinmez, '1 saat' uydurma deadline. **C yanlış** — linke tıklamak bile zararlı; bazı linkler sadece tıklamayla bilgi sızdırıyor (referer header'ı, oturum tokenı), bazıları zararlı JavaScript çalıştırıyor. **Genel kural:** mail içindeki linke hiçbir zaman güvenme. Doğru kanal her zaman resmi uygulama veya elle yazılmış URL."

---

## BÖLÜM 7 · KAPANIŞ

### Slayt 42 · Manifesto

> "Son söz, slayt çok sade. **En zayıf halka değiliz, en güçlü farkındalığız.** Saldırgan yazılımı geçemez — kullanıcıyı ikna eder. Bu sunum boyunca gördük ki teknik koruma sınırlı; saldırı her zaman insandan girer. Ama o insanı bilinçli yaparsak — saldırganın en güçlü silahı elinde kalır. Bu salondan çıkacak farkındalık, sizinle aileniz, üniversite arkadaşlarınız, iş arkadaşlarınızla paylaşıldığı sürece, **biz kazanıyoruz**. Bir kişi daha az kandırılır, bir hesap daha kalır, bir aile daha mağdur olmaz."

---

### Slayt 43 · Teşekkürler · QR'lar

> "Bağlantıda kalmak isterseniz — soldaki QR LinkedIn, ortadaki Instagram, sağdaki kişisel web sitem osmancancetlenbik.com. Sunum kaynakları, slaytlar, vakaların orijinal linkleri — hepsi sitemde var. Sorularınızı her zaman dinlerim, mail, LinkedIn DM, Instagram DM — fark etmez. Beni dinlediğiniz için teşekkür ederim. Şimdi soru-cevap için 10 dakika ayırıyorum — mikrofon sizde."

Mikrofonu salona ver. Aynı soru 2 kere geliyorsa "az önce şuna değinmiştim" diye sayfaya geri dönebilirsin.

---

# Genel İpuçları

## Tempo Yönetimi

Otomatik açılan slaytlar (phishing-anatomy, journal-recognition, decision-scenario, ai-phishing, phishing-quiz) 1,5–4 saniye aralıkla parça parça açılır. Erken konuşma; slayt yetişene kadar bekle, sonra söyle. Sunum boyunca slayt akışı seni takip eder, sen slaytı bekleyen olmalısın.

İnteraktif anlar: Slayt 13 (canlı şifre testi), 34–35 (QR phishing tuzağı), 40 (eylem planı fotoğraflama), 41 (karar senaryosu). Bu dört noktada audience'a 30–60 saniye bırak, acele ettirme. Sunum interaktif olduğu için bu sürelerden tasarruf etmeye çalışma — onlar değer üretiyor.

Süre yönetimi: hedef 45–55 dakika sunum + 5–10 dakika soru-cevap. Hızlı geçen bölümler: 4–5–7 (sayı slaytları), 26 (altın kural). Yavaş geçen bölümler: 19–20 (animasyonlu sim'ler), 27 (deepfake video).

## Mimikler ve Salon İlişkisi

Slayt 11 ve 13'te audience'a doğrudan bak — bu içerik rahatsız edici, yüzlerini izle, bir-iki şaka yap. "Bakışını kaçırıyorsun değil mi?" gibi.

Slayt 9 (quiz) ve 41 (karar) audience'ı düşünmeye zorlar — 4 saniyenin geçmesini sus ve sabırla bekle, kıvranmalarına izin ver. Mizah ile karışık tonda kal.

Slayt 18 (crypto) Türkiye'de duygusal bir konu — Thodex mağdurları çok, salondaki birinin akrabası mağdur olmuş olabilir. Saygılı bir tonla konuş, "düştü" yerine "düşürüldü" kullan.

## Soru-Cevap için Hazır Cevaplar

"Authenticator hangi uygulama?" → Google Authenticator, Microsoft Authenticator, Authy — üçü de iyi, hiçbiri SMS değil. iOS'ta Apple'ın yerleşik 2FA özelliği de güvenli.

"Şifre yöneticisi güvenli mi?" → Master parolayı sen tutuyorsun, dosyalar uçtan uca şifreli. Bitwarden açık kaynak, kodları incelenmiş. Kullanmadığında kayıp daha büyük — her sitede aynı şifre durumu.

"Deepfake nasıl anlarım?" → Üç ipucu (slayt 27): göz, dudak senkronu, ton. Şüphelendiğin an: telefonu kapat, kişiyi **kendi numarasından** geri ara. Önceden belirlenmiş bir 'aile parolası' işe yarar — "doğum günümde ne aldık" gibi.

"VPN şart mı?" → Halka açık Wi-Fi'da evet, mutlaka. Evdeyken artı bir kat güvenlik, çoğu için gereksiz. Banka işlemi yaparken evdeyken bile açmak iyi alışkanlık.

"Hangi VPN?" → ProtonVPN (ücretsiz versiyon iyi başlangıç), Mullvad (anonim ödeme, en gizli), NordVPN (yaygın, hızlı). Bedava VPN uygulamalarına dikkat — kendileri saldırgan olabilir, "bedava" oldukları için kullanıcı verisini satıyorlar.

"Banka hesabımdan para çekildi, ne yapayım?" → Hemen bankayı 24/7 hattan arayın, işlem itirazı açın, kartı blokeye alın. Çoğu banka 24 saat içinde itirazda para iadesi yapar. Sonra Cumhuriyet Başsavcılığı'na suç duyurusu, BTK'ya bildirim.

"Çocuklarımın siber güvenliğini nasıl sağlarım?" → Aile dijital sözleşmesi yapın, ekran zamanı sınırı koyun, sosyal medya hesaplarını gizli tutun, lokasyon paylaşımını kapatın, yabancılarla mesajlaşma kuralı belirleyin. Pano olarak kullanmadan kontrol etmek değil, çocukla birlikte oturup konuşmak işliyor.

---

*Notlar: Sunum 2026-05-12'de hazırlandı. Tüm rakamlar doğrulanmış kaynaklara dayanır (USOM, t24.com.tr, Cumhuriyet Gazetesi, Anadolu Ajansı, Buffalo Üniversitesi). 43 slayt — slayt sayısı veya akışı değişirse buradaki numaralandırma da güncellenmelidir.*
