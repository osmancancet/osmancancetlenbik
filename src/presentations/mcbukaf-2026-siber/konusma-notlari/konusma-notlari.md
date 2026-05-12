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

# Sunum Notu

Bu döküman, **43 slaytlık** "İnteraktif Siber Güvenlik" sunumunun her slaydı için **ne söyleyeceğin** ve **ne yapacağına** dair konuşmacı kılavuzudur. Süre tahmini: **45–55 dakika**.

**Klavye kısayolları:**

- `→` / `Boşluk` / `Enter` → ileri
- `←` → geri
- `1–7` → bölümler arası atlama (1: Açılış, 2: Oltalama, 3: Şifreler, 4: Sosyal Müh., 5: 2026 Tehditleri, 6: Korunma, 7: Kapanış)
- `F` → tam ekran

**İnteraktif anlar:** canlı şifre deneyi (slayt 12), QR phishing tuzağı (slayt 33–34), şifre kırma animasyonu (11), deepfake video (26), fidye yazılımı geri sayımı (35), karar senaryosu (40).

---

## BÖLÜM 1 · AÇILIŞ

### Slayt 1 · Kapak

> "Merhaba, ben Osman Can Çetlenbik. Manisa Celal Bayar Üniversitesi Teknik Bilimler Meslek Yüksekokulu'nda öğretim görevlisiyim. Bugün sizinle bir şey **yapacağız** — sadece anlatmayacağım. Telefonlarınızı yakınınızda tutun, çünkü bu sunum sizin de katılımınızla işliyor."

**Yapılacak:** Salonu selamla, samimi başla. 30 saniye.

---

### Slayt 2 · Hook · "Tablo karanlık"

> "Türkiye'de günde 11 milyondan fazla zararlı erişim talebi engelleniyor — bunu USOM açıklıyor. Mart 2025'te TurkNet'in 2,8 milyon abone verisi, üstelik şirketin CEO'sunun erişim bilgileri dahil sızdırıldı. 'Savcılık' adıyla arayan bir çete tek operasyonda 50 milyon TL dolandırdı, 85 kişi gözaltına alındı. Dünyada deepfake sayısı 2 yılda **9 katına** çıktı. Bu dört rakamın hiçbiri abartı değil — hepsinin kaynağı açık."

**Yapılacak:** Her sayıyı söylerken kart belirginleşir, biraz duraksa. 45 saniye.

---

### Slayt 3 · TR Sızıntı Zaman Çizelgesi

> "Hiçbir kurum 'bizden bir şey çalınmadı' diyemiyor artık. 2022'de 108 milyon vatandaş iddiası, bakan kısmen onayladı. 2024 USOM raporu, 2025'te TurkNet, Antalya otellerine ransomware, **16 milyar parolalık** dump (tarihte en büyük), 3,3 milyon mültecinin verileri, 2026'da Baydöner ve Şikayetvar. Bu liste her ay büyüyor."

**Yapılacak:** Audience'a 5 saniye bırak, ekrana bakmalarına izin ver.

---

## BÖLÜM 2 · OLTALAMA SALDIRILARI

### Slayt 4 · Bölüm 01 başlık

> "Saldırganın en yaygın silahı: oltalama. Bir mesaj, bir link, bir saniyelik düşüncesizlik. Önce türlerine bakalım."

---

### Slayt 5 · Oltalama Türleri (6 kart)

> "Altı temel tip var. SMS'le geleni 'Smishing' diyoruz — Türkiye'nin en yaygını. E-posta klasik 'Phishing'. Telefonla arayıp ses ile dolandırma 'Vishing'. QR kod üzerinden 'Quishing' — sahte QR. Sadece sana özel hazırlanmış 'Spear Phishing' — akademisyenler ve muhasebeciler hedef. Patronu taklit edip finansa para istemek 'Whaling'. Her birine birer örnek göstereceğim — hepsi animasyonlu, hepsi gerçek vakalardan."

**Yapılacak:** Kartlar sırayla parlar, her birini 5 saniye anlat.

---

### Slayt 6 · Sahte SMS'in Anatomisi

> "Bir kargo SMS'i geldiğini düşünün. Dört kontrol noktası var. **Birinci:** gönderici. PTT, MNG, ARAS kişisel numaradan SMS atmaz. **İkinci:** link. ptt-tr-kargo.com gibi sahte alan adı, gerçeği ptt.gov.tr. **Üçüncü:** aciliyet kalıbı. 24 saat içinde, derhal — bu cümleyi gördüğün an dur. **Dördüncü:** bilgi talebi. TC, kart, SMS kodu, 3D Secure — hiçbiri SMS linkinden istenmez."

**Yapılacak:** Slayt 4 ipucu otomatik sırayla açılıyor (her 1.5 sn). Her açılınca üzerine konuş.

---

### Slayt 7 · Güncel Vakalar

> "Üç somut vaka. **TurkNet Mart 2025:** Şirket önce 244 bin abone sızdı dedi — gerçek 2,8 milyon. CEO'nun erişim bilgileri bile dump'taydı. **İstanbul-İzmir savcılık çetesi:** 20 ilde operasyon, 85 gözaltı, 50 milyon TL vurgun. **Haziran 2025'te 16 milyar parolalık dump:** Türk devlet portallarının kayıtları Apple, Google, Facebook ile yan yana listedeydi. Tek bir tekrar kullanılan parola = bütün hesapların anahtarı."

---

### Slayt 8 · AI ile Oltalama · 2026 Tehdidi (YENİ)

> "Eskiden phishing'i bozuk Türkçeden anlardık. 'Sevgili müsteri, yüksek lisans bursu için tebrikler, lütfeb buraya tıklayınız' — o gün geçti. Şimdi solda 2020 versiyonu, sağda 2026 versiyonu. **ChatGPT 5 saniyede kusursuz Türkçe üretiyor.** Üstelik sosyal medyandan toplanan veriyle e-posta **sana özel** hazırlanıyor — ismin, üniversiten, bölümün, hatta hocaların ismi. Artık yazımına değil, **isteğine** bak. Resmi kurum link tıklayıp şifre, IBAN ister mi? İstemez."

**Yapılacak:** İki kart yan yana, audience'a 10 saniye bırak. Sağdakini okusunlar.

---

### Slayt 9 · Hangisi Phishing? (Quiz) (YENİ)

> "Sıra sende. 4 e-posta var. Hangisi sahte? 4 saniyen var, içinden seç. ... Şimdi cevaplar açılıyor: 'no-reply@instagram.com' gerçek — alan adı doğru. 'destek@garanti-bbva-onay.com' sahte — Garanti'nin alan adı garantibbva.com.tr, '-onay.com' uydurma. 'bilgi@yok.gov.tr' gerçek — .gov.tr resmî. 'ceo@turknet-finans-acil.com' sahte — gerçek alan turknet.com.tr, 'finans-acil' eklentisi tipik whaling kalıbı. **Mantık:** alan adının kök kısmı her zaman sağda, '.com' veya '.gov.tr' hemen önce."

**Yapılacak:** İlk 4 sn audience'a sus, tahmin etsinler. Reveal sonrası 3 sn daha.

---

## BÖLÜM 3 · ŞİFRELER

### Slayt 10 · Bölüm 02 · "Tek şifre = domino"

> "Birinden çalınırsa hepsi düşer. Birkaç rakam: '123456' kırılma süresi 0,001 saniye. Kullanıcıların %83'ü aynı şifreyi birden çok yerde kullanıyor. Türkiye'de ortalama şifre uzunluğu sekiz karakter. 12 karışık karakter ise saldırgan için 3.000 yıl."

---

### Slayt 11 · TR'de En Çok Kullanılan Şifreler

> "Türkiye 2024–2025 listesi. Birinci '123456', sonra '123456789', 'password', 'qwerty', '111111' — hepsi 1 saniyenin altında. Altıncı ve yedinci sıra: 'fenerbahce' ve 'galatasaray'. Sonra 'ankara1453'. Listedeki herkesin şifresi var mı?"

**Yapılacak:** 5 saniye sus. Birkaç kişinin yüzünde 'eyvah' ifadesi göreceksin.

---

### Slayt 12 · Şifre Kırma Animasyonu

> "Beş örnek şifreyi sırayla saldırgana veriyoruz. **'123456'** — anında. **'ankara06'** — 0,3 saniye. **'Kalem42!'** — yedi dakika. **12 karışık karakter** — 3.000 yıl, saldırgan vazgeçer. **Cümle şifre** — 'Manisa-uzumleri-2026!' — sonsuz. Fark ettiniz mi? Uzunluk + farklı karakter = bambaşka bir oyun."

**Yapılacak:** Animasyon ~30 saniye, kendi başına oynar.

---

### Slayt 13 · CANLI DENEY · Telefonunla Şifre Test Et

> "Şimdi sıra sende. QR'ı tarat, kendi kullandığın bir şifreyi yaz — **gerçek şifre ekrana yansımıyor** — sadece uzunluğu, gücü ve sızıntıda olup olmadığı yansıyor. 'Sonucu ekrana yansıt' butonuna bas. Bekleyelim."

**Yapılacak:** İlk testin gelmesini bekle (10–20 sn). Boşluğa basınca **reveal fazı** açılır. "İşte bunlar sizin şifreleriniz — gerçek phishing sayfası şifrenin **kendisini** de alır."

---

### Slayt 14 · "Şifrenizi tanımadığınız bir sayfaya verdiniz."

> "Az önceki sayfaya güvendiniz. Ben sadece parmak izini aldım. Yarın sahte bir Garanti girişi olsa — şifrenin **tam halini** alırdı. Bu ders bedavaya geldi."

---

### Slayt 15 · Cümle-Şifre + 2FA

> "Sol taraf yapmayın: aynı parola, doğum tarihi, takım adı, monitör kenarında sticky note. SMS 2FA tek başına güvenli değil — SIM swap saldırısı 5 dakikada hesabına girer. Sağ taraf yapın: cümle-şifre. Her hesaba farklı parola → **şifre yöneticisi** kullan: 1Password, Bitwarden veya Apple/Google parolaları. Authenticator uygulaması. Kritik hesaplarda passkey."

---

## BÖLÜM 4 · SOSYAL MÜHENDİSLİK

### Slayt 16 · Bölüm 02 başlık

> "Güvenlik duvarı geçilemiyorsa, kullanıcı ikna edilir. İnsanlar hacklenmez — ikna edilir."

---

### Slayt 17 · Saldırganın 5 Silahı

> "Beş silah var, hepsi her dolandırıcılıkta vardır. **Aciliyet:** 'şimdi yapmazsan kaybedeceksin'. **Otorite:** savcı, polis, banka müdürü. **Korku:** hesabın kapanacak. **Ödül:** 'iPhone kazandın'. **Güven:** 'tanıdığım, akraban'. Bir mesajda iki silah varsa: dur. Üç silah varsa: ihbar."

---

### Slayt 18 · Crypto / Yatırım Dolandırıcılığı (YENİ)

> "Türkiye'nin en pahalı dersi: hızlı para vaadi. **Thodex:** 24 milyar TL, 400.000 mağdur — kurucu kaçtı, hâlâ yakalanmadı. **Çiftlik Bank:** 5 milyar TL, 132.000 mağdur — klasik Ponzi şeması. **2025'te deepfake yatırım reklamı artışı: %430** — Acun Ilıcalı, ünlü oyuncular, profesörler taklit edilip 'günde 5000 TL kazan' diye reklam çıkıyor. **Tahminen 20 milyon Türk** yatırım dolandırıcılığına maruz kaldı. Kural: hızlı kazan vaadi = kayıp."

**Yapılacak:** Her sayıyı vurgula. Audience çoğu Thodex ismini tanır.

---

### Slayt 19 · WhatsApp · İş Teklifi Tuzağı

> "WhatsApp'ta gelen bir mesaj canlanıyor. 'TikTok ajansından arıyoruz', 'günde 800–2500 TL', 'ilk göreve başlamak için: bit.ly/...'. Sen 'tmm bakayım' diyorsun — beş saniye sonra '250 TL kazandın! 5.000 TL teminat yatır'. **İşte tam burada hesabın çalınıyor.** Linke tıkladığın an WhatsApp QR girişin saldırgana geçti, **347 arkadaşın şu anda aynı mesajı senden alıyor.** Tek tıklama, bütün ağ."

**Yapılacak:** Mesajlar sırayla yazılır, sonra otomatik kırmızı reveal. Sen reveal'a kadar sus.

---

### Slayt 20 · Vishing · Sahte Savcılık Araması

> "Telefon çalıyor: Ankara Cumhuriyet Başsavcılığı. Açıyoruz. 'İyi günler, ben Komiser Yılmaz' — **OTORİTE**. 'Adınıza açılmış bir soruşturma var' — **KORKU**. '15 dakika içinde' — **ACİLİYET**. 'Bu görüşme gizli' — **İZOLASYON**. 'Tüm paranızı emanet hesabına aktarın' — **VURGUN**. Beş silah, beş cümle. Devlet asla telefonda para istemez. Kapat — banka ve aile numaralarını **kendin** ara."

---

### Slayt 21 · Predatory Dergi

> "Akademisyenler dinliyor. Mail kutusu: 'editor@ijar-publishing.net' — 'manuscript ACCEPTED'. 18 saatte hakem onayı — bu süre hakem değil, kredi kartı bekleme süresi. RIIF 8,4 'impact factor' — uydurma. 349 dolar yayın ücreti. Ödeyenin makalesi **akademik özgeçmişe sayılmaz**, ÜAK reddeder. Kontrol kanalı: DOAJ, Beall's List, ULAKBİM TR-Dizin."

---

### Slayt 22 · Sahte Konferans Davetiyesi

> "Aynı kalıp konferans için. 'Distinguished Professor, ICAS-2026 Bangkok keynote speaker olarak seçildiniz, 12.000 araştırmacı arasından.' 695 dolar kayıt. Vampir konferans — gerçek konferanslar 'random keynote' daveti yollamaz. Bangkok / Dubai / Roma odalı konferansların çoğu paid-talk fabrikası, ÜAK saymaz. Kontrol: think.checksubmit.org, WikiCFP."

---

### Slayt 23 · YÖK Burs Bildirimi

> "Öğrenciler için: 'bilgi@yok-burs2026.gov-tr.com' — 'yok-burs2026.**gov-tr.com**'. Gerçek resmi alan yok.gov.tr veya kyk.gov.tr. 'Aylık 5.800 TL burs, 49,90 TL doğrulama hizmet bedeli.' YÖK / KYK burs doğrulaması için **ücret istemez**. Tek kanal: e-Devlet, KYK uygulaması, 444 1 962."

---

### Slayt 24 · Hangisi Gerçek Dergi?

> "İki dergi yan yana. Solda 'International Journal of Advanced Research' Mauritius, RIIF 8,4, 18 saat hakem, 349 dolar APC. Sağda 'IEEE Transactions' Web of Science Q1, 6,8 IF, 3–6 ay hakem, açık erişim opsiyonel. Hangisi gerçek? ... **Gerçek dergi:** tanınır yayıncı, tanınır indeks, aylar süren çift-kör hakem, şeffaf ücret. **Predatory:** uydurma indeks, saatler içinde 'kabul', peşin ücret."

---

### Slayt 25 · CEO Vurgunu · Whaling

> "Şirket muhasebe çalışanına gelen mail. 'Sevgili Ahmet, bugün öğleden önce 38.500 TL transfer halletmen lazım. Sadece sana güveniyorum, kimseyle paylaşma.' İmza CEO. **Acil + Gizli + Nakit** üçü birden — telefonla yöneticiyi DOĞRULA. Hong Kong'da Arup 2024'te bu yolla **25,6 milyon dolar** kaybetti."

---

### Slayt 26 · Altın Kural

> "Bu cümle hayat kurtarır: **Devlet asla telefonda para, altın veya şifre istemez.** Bu cümleyi öğretin — annenize, babaanenize, çocuğunuza."

---

## BÖLÜM 5 · 2026 TEHDİTLERİ

### Slayt 27 · Deepfake · "Bu Morgan Freeman değil"

> "Şimdi videoyu izleyelim. ... [video oynar] ... Evet, bu Morgan Freeman **değildi**. Yapay zekâ. Hong Kong'da Arup şirketi video konferansta odadaki **herkes deepfake'ti** — 25,6 milyon dolar gitti. Türkiye'de MİT, Cumhurbaşkanı'nın ses klonunu yakaladı. Nasıl anlarsın? **Göz** kırpma anormal, **dudak senkronu** sert ünsüzlerde kayar, **ton ve nefes** klonlanmış seste eksiktir."

**Yapılacak:** Video başlat. ~2 dakika oynat. Sonra 3 ipucu üzerine konuş.

---

### Slayt 28 · Canlı Saldırı Haritası

> "İşte şu an Türkiye haritası. Her saniye bir şehir yanıyor — Phishing, Ransomware, DDoS, Brute-Force, Deepfake. Sağda canlı log. USOM verisi günde 11 milyon engelleme — bu görüntü gerçeği temsil ediyor."

**Yapılacak:** 30 saniye saldırıları göster.

---

### Slayt 29 · Wi-Fi Tuzağı · Evil Twin (YENİ)

> "Kafede oturuyorsun, Wi-Fi listesini açıyorsun. 'Cafe_Manisa_Free' var, şifresiz, sinyal güçlü — bağlanıyorsun. Ama bu cafe değil, **saldırganın telefonu**. Adı kafenin adına benzer şekilde uydurulmuş — evil twin saldırısı. Bağlandığın anda tüm trafik onun ağına akıyor — Instagram giriş, banka şifre, WhatsApp oturum tokenı — hepsi saldırgana düşüyor. **Koruma üç adım:** şifresiz Wi-Fi'ya bağlanma, VPN kullan, tarayıcıda https kilidini her zaman kontrol et."

**Yapılacak:** 3 fazlı animasyon — Wi-Fi listesi → bağlandın → kırmızı leak ekranı. Toplam ~6 sn.

---

### Slayt 30 · SIM Swap · Numaranın Çalınması (YENİ)

> "Saldırgan operatöre gidiyor — sahte kimlikle, hatta bazen rüşvetle çalışana. 'Telefonum çalındı, yeni SIM lazım.' 5 dakika sonra senin numaran onun telefonunda. SMS ile gelen 2FA kodları artık ona düşüyor — banka, e-posta, sosyal medya, hepsi domino düşüyor. **Koruma:** Ayarlar'dan SIM PIN aç. Operatör hesabına çağrı şifresi koy. SMS 2FA değil, **authenticator uygulaması** kullan."

---

### Slayt 31 · IoT Cihaz Güvenliği (YENİ)

> "Evindeki akıllı cihazlar saldırgan için açık kapı. **Akıllı kamera, bebek monitörü:** varsayılan şifre değiştirilmezse Shodan üzerinden binlerce TR kamerası canlı izlenebiliyor. **Akıllı asistan:** sürekli ses dinler, buluta gönderir — hassas konuşmaları yakınında etme. **Akıllı TV / saat:** gereksiz uygulamaları sil, mikrofon izinlerini kapat. **2016 Mirai botnet:** 600.000 zayıf-şifreli IoT cihazıyla yarı interneti çökertti. Şifreni değiştir, firmware güncel olsun."

---

### Slayt 32 · USB / Donanım Tuzakları (YENİ)

> "Üç hardware tuzağı. **Yerde bulduğun USB'yi takma** — Rubber Ducky 3 saniyede komut çalıştırır, hesabını dışa açar. Stuxnet 2010'da nükleer santralleri böyle ele geçirdi. **Sahte şarj kabloları (O.MG cable):** görünüşte sıradan, içinde WiFi mini-bilgisayar — telefonunu klavye olarak kontrol eder. **Public USB charging (juice jacking):** havalimanı, kafe USB portlarından şarj eden porttan veri de akar. Sadece kendi adaptörünle priza tak."

---

### Slayt 33 · Malvertising · Sahte Reklam Tıklatma (YENİ)

> "Google'da 'Photoshop bedava indir' arattığında ilk sonuç **REKLAM** olabilir. Saldırgan sahte siteye ücret ödüyor, en üste çıkıyor. İndirilen dosya gerçek Photoshop gibi açılır, arkada bilgisayarına trojan kurar — RedLine, Vidar — banka şifreleri ve tarayıcı oturumları çalınır. **Koruma:** uBlock Origin · resmi siteyi her zaman elle yaz (adobe.com), arama sonucundan tıklama · indirme öncesi VirusTotal'da tara."

---

### Slayt 34 · QR Phishing · Anket (CANLI)

> "Sıra geldi en sevdiğim deneye. Telefonunu çıkar, QR'ı tarat. **'Değerlendirme ve Çekiliş'** — kısa anketi doldur, sürpriz hediye çekilişine katıl. Hemen tarat."

**Yapılacak:** 30–60 saniye bekle. Sayaç gerçek zamanlı artar. "X kişi katıldı" yazısını göster, sonra boşluğa bas.

---

### Slayt 35 · QR Phishing · Reveal

> "İşte sayı: **[X] kişi sahte bir QR'a güvendi.** Aslında anket falan yoktu. Tarayan herkes 'VERİLERİNİZ ALINIYOR' kırmızı ekranıyla karşılaştı. Demoydu, hiçbir şey çalmadık. **Ama gerçek bir saldırgan QR'ı taradığın an bunu yapabilirdi.** QR = link. Tıklamadan önce nereye gittiğini kontrol et."

---

### Slayt 36 · Ransomware Geri Sayım

> "CryptoLock-26 fidye yazılımı — verilerinizi şifreledi. 0.05 Bitcoin ödeyin — yaklaşık 50.000 dolar. Geri sayım bittiğinde fiyat iki katı olur. Yedeğiniz var mı? **3-2-1 yedek kuralı:** 3 kopya, 2 farklı medya, 1 fiziksel olarak ayrı yerde. Her hafta otomatik."

---

## BÖLÜM 6 · KORUNMA

### Slayt 37 · Bölüm 03 başlık

> "Şimdi savunmaya geçiyoruz. Bugün, salondan çıkmadan uygulayabileceğin adımlar."

---

### Slayt 38 · 5 Dakikada 5 Adım

> "Beş adım, beş dakika. **Bir:** Şifre yöneticisi kur — 1Password, Bitwarden veya Apple/Google parolaları. **İki:** Banka, e-posta ve sosyal medyaya authenticator-tabanlı 2FA aç. **Üç:** Telefon ve bilgisayar güncellemelerini otomatik bırak. **Dört:** Haftada bir yedek al — 3-2-1 kuralı. **Beş:** 3 saniye dur. Linke tıklamadan, mesajı kontrol et."

---

### Slayt 39 · 3 Saniye Kuralı (cinematic)

> "Şu sahte SMS'e bakın. Sayaç 3-2-1 sayıyor. **Dur. Bak.** Saniye sıfırlanırken üç işaret parlıyor: kişisel numara, yanlış alan adı, aciliyet baskısı. 3 saniye + 3 işaret = kapatılan link. **TIKLAMA.**"

---

### Slayt 40 · "Hesabım Çalındı — Şimdi Ne Yapacağım?" (YENİ)

> "Bu slaytı telefonunuza kaydetmenizi öneririm — başınıza gelirse hayat kurtarır. **1. Hala erişiminiz varsa:** şifreyi DEĞİŞTİR, tüm aktif oturumları kapat (Settings → Security → Sessions). **2. 2FA'yı aç** (authenticator app), kurtarma kodlarını yaz, kurtarma e-postası/telefonu kontrol et — saldırgan değiştirmiş olabilir. **3. Banka/kart bağlıysa:** bankayı 24/7 hattan ARA, işlem itirazı aç, kartı blokeye al. **4. Domino önle:** aynı şifreyi kullandığınız diğer hesapları acilen değiştirin — e-posta, sosyal medya, eDevlet. **5. İhbar:** USOM (usom.gov.tr), KVKK (eDevlet üzerinden), Cumhuriyet Başsavcılığı suç duyurusu, BTK 444 1 588."

**Yapılacak:** Audience telefonlarına bu listeyi yazmak için 30 saniye iste. "Fotoğraf çekin" de.

---

### Slayt 41 · Sen Ne Yaparsın? (Karar Senaryosu) (YENİ)

> "Son test. Instagram'dan gelen mail: 'Hesabınızda şüpheli giriş, 1 saat içinde doğrulamazsanız hesap kalıcı silinecek.' Sonunda 'Hesabımı Doğrula' butonu. Sen ne yaparsın? Üç seçenek. 4 saniyen var, kararını ver. ... Tamam, doğru cevap **B**: linke tıklamadan Instagram uygulamasından kontrol ederim. **A** yanlış — aciliyet baskısına kapılıyorsun. **C** yanlış — linke tıklamak bile zararlı. Doğru kanal her zaman uygulama / resmi web sitesi, mail içindeki link değil."

**Yapılacak:** Audience'a 4 sn düşünmesi için sus. Sonra reveal'i konuş.

---

## BÖLÜM 7 · KAPANIŞ

### Slayt 42 · Manifesto

> "Son söz. **En zayıf halka değiliz, en güçlü farkındalığız.** Saldırgan yazılımı geçemez — kullanıcıyı ikna eder. O kullanıcıyı bilinçli yaparsak — saldırganın en güçlü silahı elinde kalır. Burada öğrendikleriniz sizinle, ailenizle, üniversite arkadaşınızla paylaşıldığı sürece, **biz kazanıyoruz**."

---

### Slayt 43 · Teşekkürler · QR'lar

> "Bağlantıda kalmak isterseniz — soldaki LinkedIn, ortadaki Instagram, sağdaki web sitesi. Sorularınızı her zaman dinlerim. Beni dinlediğiniz için teşekkürler — sahnenizde olmak güzeldi."

**Yapılacak:** Soru-cevap için 5–10 dakika ayır. Mikrofonu salona ver.

---

# Genel İpuçları

## Tempo Yönetimi

1. **Otomatik açılan slaytlar** (phishing-anatomy, journal-recognition, decision-scenario, ai-phishing) 1.5–4 saniye aralıkla parça parça açılır. Erken konuşma — slayt yetişene kadar bekle, sonra söyle.
2. **İnteraktif anlar:** Slayt 13 (canlı şifre), 34–35 (QR phishing). Bu ikisinde audience'a 30–60 saniye bırak. Acele ettirme.
3. **Süre yönetimi:** Hedef 45–55 dk + 5–10 dk Q&A. Hızlı geçen bölüm: 4–5–7 (sayılar). Yavaş geçen: 19–20 (animasyon sim'leri).

## Mimikler ve Salon İlişkisi

- Slayt 11 ve 13'te audience'a doğrudan bak — bu içerik onları çok rahatsız edecek, yüzlerini izle, bir-iki şaka yap.
- Slayt 9 (quiz) ve 41 (karar) audience'ı düşünmeye zorlar — 4 sn beklerken sus, kıvranmalarına izin ver.
- Slayt 18 (crypto) Türkiye'de duygusal bir mesele — Thodex mağdurlarına saygılı konuş.

## Soru-Cevap Sık Sorulanlar

- **"Authenticator hangi uygulama?"** → "Google Authenticator, Microsoft Authenticator, Authy — üçü de iyi, hiç biri SMS değil."
- **"Şifre yöneticisi güvenli mi?"** → "Master parolayı sen tutuyorsun, dosyalar şifreli. Kullanmadığında kayıp daha büyük."
- **"Deepfake nasıl anlarım?"** → "Üç ipucu (slayt 27). Şüphelendiğin an: telefonu kapat, **kendi numarasından** geri ara."
- **"VPN şart mı?"** → "Halka açık Wi-Fi'da evet. Evdeyken artı bir kat."
- **"Hangi VPN?"** → "ProtonVPN (ücretsiz iyi), Mullvad (anonim ödeme), NordVPN (yaygın). Bedava 'free VPN' uygulamalarına dikkat — kendileri saldırgan olabilir."

---

*Notlar: Sunum 2026-05-12'de hazırlandı. Tüm rakamlar doğrulanmış kaynaklara dayanır (USOM, t24.com.tr, Cumhuriyet, Buffalo Üniversitesi, AA). 43 slayt — slayt sayısı veya akışı değişirse buradaki numaralandırma da güncellenmelidir.*
