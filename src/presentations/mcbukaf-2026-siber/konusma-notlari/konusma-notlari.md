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

Bu döküman, **33 slaytlık** "İnteraktif Siber Güvenlik" sunumunun her slaydı için **ne söyleyeceğin** ve **ne yapacağına** dair konuşmacı kılavuzudur. Süre tahmini: **35–45 dakika**.

**Klavye kısayolları:**

- `→` / `Boşluk` / `Enter` → ileri
- `←` → geri
- `1–7` → bölümler arası atlama (1: Açılış, 2: Oltalama, 3: Şifreler, 4: Sosyal Müh., 5: 2026 Tehditleri, 6: Korunma, 7: Kapanış)
- `F` → tam ekran

**İnteraktif anlar:** canlı şifre deneyi (slayt 10), QR phishing tuzağı (slayt 25–26), şifre kırma animasyonu, deepfake video, fidye yazılımı geri sayımı.

---

## BÖLÜM 1 · AÇILIŞ

### Slayt 1 · Kapak

> "Merhaba, ben Osman Can Çetlenbik. Manisa Celal Bayar Üniversitesi Teknik Bilimler Meslek Yüksekokulu'nda öğretim görevlisiyim. Bugün sizinle bir şey **yapacağız** — sadece anlatmayacağım. Telefonlarınızı yakınınızda tutun, çünkü bu sunum sizin de katılımınızla işliyor."

**Yapılacak:** Salonu selamla, samimi başla. 30 saniye.

---

### Slayt 2 · Hook · "Tablo karanlık"

> "Türkiye'de günde 11 milyondan fazla zararlı erişim talebi engelleniyor — bunu USOM açıklıyor. Mart 2025'te TurkNet'in 2,8 milyon abone verisi, üstelik şirketin CEO'sunun erişim bilgileri dahil sızdırıldı. 'Savcılık' adıyla arayan bir çete tek operasyonda 50 milyon TL dolandırdı, 85 kişi gözaltına alındı. Dünyada deepfake sayısı 2 yılda **9 katına** çıktı. Bu dört rakamın hiçbiri abartı değil — hepsinin kaynağı açık."

**Yapılacak:** Her sayıyı söylerken kart belirginleşir, biraz duraksa. Audience'ı sallamak için 45 saniye yeterli.

---

### Slayt 3 · TR Sızıntı Zaman Çizelgesi

> "Hiçbir kurum 'bizden bir şey çalınmadı' diyemiyor artık. 2022'de 108 milyon vatandaş iddiası, bakan kısmen onayladı. 2024 USOM raporu, 2025'te TurkNet, Antalya otellerine ransomware, **16 milyar parolalık** dump (tarihte en büyük), 3,3 milyon mültecinin verileri, 2026'da Baydöner ve Şikayetvar. Bu liste her ay büyüyor."

**Yapılacak:** Audience'a 5 saniye bırak, ekrana bakmalarına izin ver — sayılar sokucu.

---

## BÖLÜM 2 · OLTALAMA SALDIRILARI

### Slayt 4 · Bölüm 01 başlık

> "Saldırganın en yaygın silahı: oltalama. Bir mesaj, bir link, bir saniyelik düşüncesizlik. Önce türlerine bakalım."

---

### Slayt 5 · Oltalama Türleri (6 kart)

> "Altı temel tip var. SMS'le geleni 'Smishing' diyoruz — Türkiye'nin en yaygını. E-posta klasik 'Phishing'. Telefonla arayıp ses ile dolandırma 'Vishing'. QR kod üzerinden 'Quishing' — sahte QR. Sadece sana özel hazırlanmış 'Spear Phishing' — akademisyenler ve muhasebeciler hedef. Patronu taklit edip finansa para istemek 'Whaling'. Her birine birer örnek göstereceğim — hepsi animasyonlu, hepsi gerçek vakalardan."

**Yapılacak:** Kartlar sırayla parlar, her birini 5 saniye anlat. Toplam 60 saniye.

---

### Slayt 6 · Sahte SMS'in Anatomisi

> "Bir kargo SMS'i geldiğini düşünün. Dört kontrol noktası var. **Birinci:** gönderici. PTT, MNG, ARAS kişisel numaradan SMS atmaz — kısa, büyük harfli kurumsal kimlikten gelir. **İkinci:** link. ptt-tr-kargo.com gibi sahte alan adı, gerçeği ptt.gov.tr. bit.ly kısaltıcısı: nereye gittiğini gizler — resmi kurum kısaltıcı kullanmaz. **Üçüncü:** aciliyet kalıbı. 24 saat içinde, derhal — bu cümleyi gördüğün an dur. **Dördüncü:** bilgi talebi. TC, kart, SMS kodu, 3D Secure — hiçbiri SMS linkinden istenmez."

**Yapılacak:** Slayt 4 ipucu otomatik sırayla açılıyor (her 1.5 saniyede bir). Sen her açılınca onun üzerine konuş — 30 saniye/ipucu.

---

### Slayt 7 · Güncel Vakalar

> "Üç somut vaka. **TurkNet Mart 2025:** Şirket önce 244 bin abone sızdı dedi — gerçek 2,8 milyon. CEO'nun erişim bilgileri bile dump'taydı. Şirketler yalan söylüyor. **İstanbul-İzmir savcılık çetesi 2025:** 20 ilde operasyon, 85 gözaltı, 50 milyon TL vurgun. 'Adınız terör örgütüne karıştı' repliği bu çetenin standart başlangıcı. **Haziran 2025'te 16 milyar parolanın yer aldığı dump:** Türk devlet portallarının kayıtları Apple, Google, Facebook ile yan yana listedeydi. Tek bir tekrar kullanılan parola = bütün hesapların anahtarı."

---

## BÖLÜM 3 · ŞİFRELER

### Slayt 8 · Bölüm 02 · "Tek şifre = domino"

> "Birinden çalınırsa hepsi düşer. Birkaç rakam: '123456' kırılma süresi 0,001 saniye. Kullanıcıların %83'ü aynı şifreyi birden çok yerde kullanıyor. Türkiye'de ortalama şifre uzunluğu sekiz karakter. 12 karışık karakter ise saldırgan için 3.000 yıl."

---

### Slayt 9 · TR'de En Çok Kullanılan Şifreler

> "Türkiye 2024–2025 listesi. Birinci '123456', sonra '123456789', 'password', 'qwerty', '111111' — hepsi 1 saniyenin altında kırılıyor. Altıncı ve yedinci sıra: 'fenerbahce' ve 'galatasaray'. Sonra 'ankara1453'. Listedeki herkesin şifresi var mı? Bu liste her yıl güncellenir ve hep aynıdır."

**Yapılacak:** Audience'a 5 saniye sus — listeyi okusunlar. Birkaç kişinin yüzünde 'eyvah' ifadesi göreceksin.

---

### Slayt 10 · Şifre Kırma Animasyonu

> "Beş örnek şifreyi sırayla saldırgana veriyoruz. **'123456'** — anında kırıldı. **'ankara06'** — 0,3 saniye, yarım nefes. **'Kalem42!'** — yedi dakika, bir kahve molası. **12 karışık karakter** — 3.000 yıl, saldırgan vazgeçer. **Cümle şifre** — 'Manisa-uzumleri-2026!' — sonsuz, kırılmaz. Fark ettiniz mi? Uzunluk + farklı karakter = bambaşka bir oyun."

**Yapılacak:** Animasyon ~30 saniye, kendi başına oynar. Sen her ekran değişiminde tek cümle söyle.

---

### Slayt 11 · CANLI DENEY · Telefonunla Şifre Test Et

> "Şimdi sıra sende. QR'ı tarat, kendi kullandığın bir şifreyi yaz — endişelenme, **gerçek şifre ekrana yansımıyor** — sadece uzunluğu, gücü ve sızıntıda olup olmadığı yansıyor. 'Sonucu ekrana yansıt' butonuna bas. Bekleyelim."

**Yapılacak:** İlk testin gelmesini bekle (10–20 saniye). Boşluğa basınca **reveal fazı** açılır — salondaki şifrelerin parmak izleri akmaya başlar. "İşte bunlar sizin şifreleriniz — gerçek phishing sayfası şifrenin **kendisini** de alır" de.

---

### Slayt 12 · "Şifrenizi tanımadığınız bir sayfaya verdiniz."

> "Az önceki sayfaya güvendiniz. Ben sadece parmak izini aldım. Yarın sahte bir bankamatik sayfası, sahte bir Garanti girişi olsa — şifrenin **tam halini** alırdı. Bu ders bedavaya geldi."

---

### Slayt 13 · Cümle-Şifre + 2FA

> "Sol taraf yapmayın listesi: aynı parola her sitede, doğum tarihi, takım adı, sticky note. SMS 2FA tek başına güvenli değil — SIM swap saldırısı 5 dakikada hesabına girer. Sağ taraf yapılması gerekenler: 'Manisa-uzumleri-2026!' gibi cümle-şifre. Her hesaba farklı parola → bunu hatırlamak imkânsız, **şifre yöneticisi** kullan: 1Password, Bitwarden veya Apple/Google parolaları. Authenticator uygulaması. Kritik hesaplarda passkey veya donanım anahtarı."

---

## BÖLÜM 4 · SOSYAL MÜHENDİSLİK

### Slayt 14 · Bölüm 02 başlık

> "Güvenlik duvarı geçilemiyorsa, kullanıcı ikna edilir. İnsanlar hacklenmez — ikna edilir."

---

### Slayt 15 · Saldırganın 5 Silahı

> "Beş silah var, hepsi her dolandırıcılıkta vardır. **Aciliyet:** 'şimdi yapmazsan kaybedeceksin'. **Otorite:** savcı, polis, banka müdürü, BTK. **Korku:** hesabın kapanacak, suç işledin. **Ödül:** 'iPhone kazandın'. **Güven:** 'tanıdığım, akraban'. Bir mesajda iki silah varsa: durun. Üç silah varsa: ihbar."

---

### Slayt 16 · WhatsApp · İş Teklifi Tuzağı

> "WhatsApp'ta gelen bir mesaj canlandı. 'TikTok ajansından arıyoruz, kampanyamızda yer almak ister misin?', 'günlük 800–2500 TL kazanırsın, sadece beğeni atacaksın', 'ilk göreve başlamak için: bit.ly/...'. Sen 'tmm bakayım' diyorsun — beş saniye sonra 'tebrikler 250 TL kazandın! çekmek için 5.000 TL teminat'. **İşte tam burada hesabın çalınıyor.** Linke tıkladığın an WhatsApp QR girişin saldırgana geçti, **347 arkadaşın şu anda aynı mesajı senden alıyor.** Tek tıklama, bütün ağ."

**Yapılacak:** Mesajlar sırayla yazılır (~10 saniye), sonra otomatik kırmızı reveal. Sen reveal'a kadar sus.

---

### Slayt 17 · Vishing · Sahte Savcılık Araması

> "Telefon çalıyor: Ankara Cumhuriyet Başsavcılığı. Açıyoruz. 'İyi günler, ben Komiser Yılmaz' — **OTORİTE** silahı. 'Adınıza açılmış bir soruşturma var, hesabınızdan terör örgütüne para transferi yapılmış' — **KORKU**. '15 dakika içinde ifade alamazsak gözaltı kararı' — **ACİLİYET**. 'Bu görüşme gizli, kimseyle paylaşamazsınız' — **İZOLASYON**. 'Tüm paranızı emanet hesabına aktarın, ATM'ye gidin, ben telefonda kalıyorum' — **VURGUN**. Beş silah, beş cümle. Devlet asla telefonda para istemez. Kapat — banka ve aile numaralarını **kendin** ara."

---

### Slayt 18 · Predatory Dergi

> "Akademisyenler dinliyor — sıra sizde. Mail kutusu: 'editor@ijar-publishing.net' — 'manuscript ACCEPTED'. 18 saatte hakem onayı — bu süre hakem değil, kredi kartı bekleme süresi. RIIF 8,4 'impact factor' — Web of Science'da böyle bir şey yok, uydurma. '349 dolar yayın ücreti'. Ödeyenin makalesi **akademik özgeçmişe sayılmaz**, ÜAK reddeder. Kontrol kanalı: DOAJ, Beall's List, ULAKBİM TR-Dizin."

---

### Slayt 19 · Sahte Konferans Davetiyesi

> "Aynı kalıp konferans için. 'Distinguished Professor, ICAS-2026 Bangkok keynote speaker olarak seçildiniz, 12.000 araştırmacı arasından.' 695 dolar kayıt. Vampir konferans — gerçek konferanslar 'random keynote' daveti yollamaz. Bangkok / Dubai / Roma odalı konferansların çoğu paid-talk fabrikası, ÜAK saymaz. Kontrol: think.checksubmit.org, WikiCFP."

---

### Slayt 20 · YÖK Burs Bildirimi

> "Öğrenciler için: 'bilgi@yok-burs2026.gov-tr.com' — 'yok-burs2026.**gov-tr.com**'. Gerçek resmi alan yok.gov.tr veya kyk.gov.tr. 'Aylık 5.800 TL burs onaylandı, 49,90 TL doğrulama hizmet bedeli.' YÖK / KYK burs doğrulaması için ücret istemez. Tek kanal: e-Devlet, KYK uygulaması, 444 1 962."

---

### Slayt 21 · Hangisi Gerçek Dergi?

> "İki dergi yan yana. Solda 'International Journal of Advanced Research' IJAR Publishing Ltd, Mauritius merkezli, RIIF 8,4, 18 saat hakem, 349 dolar APC. Sağda 'IEEE Transactions on Information Forensics and Security' Web of Science Q1, 6,8 IF, 3–6 ay hakem, açık erişim opsiyonel. Hangisi gerçek? Üçüncü saniyede kırmızı çarpılar parlar, beşinci saniyede stamp düşer. **Gerçek dergi:** tanınır yayıncı, tanınır indeks, aylar süren çift-kör hakem, şeffaf ücret. **Predatory:** uydurma indeks adı, saatler içinde 'kabul', peşin yayın ücreti."

---

### Slayt 22 · CEO Vurgunu · Whaling

> "Şirketin muhasebe çalışanına gelen mail. 'Sevgili Ahmet, bugün öğleden önce 38.500 TL transfer halletmen lazım. Avukatla görüşmedeyim, telefonda erişimim yok. Sadece sana güveniyorum. Kimseyle paylaşma.' İmza CEO. Bu kalıba Whaling diyoruz. **Acil + Gizli + Nakit** üçü birden — telefonla yöneticiyi DOĞRULA. Hong Kong'da Arup şirketi 2024'te bu yolla 25,6 milyon dolar kaybetti."

---

### Slayt 23 · Altın Kural

> "Bu cümle hayat kurtarır: **Devlet asla telefonda para, altın veya şifre istemez.** Bu cümleyi öğretin — annenize, babaanenize, çocuğunuza. 60 yaş üstü ve 18-24 yaş ayrı demez — herkes düşüyor."

---

## BÖLÜM 5 · 2026 TEHDİTLERİ

### Slayt 24 · Deepfake · "Bu Morgan Freeman değil"

> "Şimdi videoyu izleyelim. ... [video oynar] ... Evet, bu Morgan Freeman **değildi**. Yapay zekâ. Hong Kong'da Arup şirketinin bir çalışanı CFO ve yöneticilerle video konferansa katıldı — odadaki **herkes deepfake'ti** — 15 transferde 25,6 milyon dolar gitti. Türkiye'de MİT, Cumhurbaşkanı'nın ses klonunu kullanan kişiyi yakaladı. Nasıl anlarsın? Üç ipucu var: **göz** kırpma anormal, **dudak senkronu** sert ünsüzlerde milisaniyelik kayar, **ton ve nefes** klonlanmış seste eksiktir."

**Yapılacak:** Video başlat. ~2 dakika oynat. Sonra 3 ipucu üzerine konuş.

---

### Slayt 25 · Canlı Saldırı Haritası

> "İşte şu an Türkiye haritası. Her saniye bir şehir yanıyor — Phishing, Ransomware, DDoS, Brute-Force, Deepfake, SMS-Phish. Sağda canlı log. USOM verisi günde 11 milyon engelleme — bu görüntü, bu ekran, gerçeği temsil ediyor. Saldırı dinmiyor."

**Yapılacak:** 30 saniye saldırıları say. Sayaç ve log akmaya devam ediyor.

---

### Slayt 26 · QR Phishing · Bait (CANLI)

> "Sıra geldi en sevdiğim deneye. Telefonunu çıkar, QR'ı tarat. **'Değerlendirme ve Hediye Çekilişi'** — kısa anketi doldur, sürpriz hediye çekilişine katıl. Hemen tarat."

**Yapılacak:** 30–60 saniye bekle. Sayaç gerçek zamanlı artar. "X kişi katıldı" yazısını göster, "tarayan herkes anketi açtığını sanıyor — bir saniye sonra ne göreceğini göstereyim" de, sonra boşluğa bas.

---

### Slayt 27 · QR Phishing · Reveal

> "İşte sayı: **[X] kişi sahte bir QR'a güvendi.** Aslında anket falan yoktu. Tarayan herkes 'VERİLERİNİZ ALINIYOR' kırmızı ekranıyla karşılaştı — telefonunda gerçek cihaz bilgilerinizin alındığını gördünüz. Demoydu, hiçbir şey çalmadık. **Ama gerçek bir saldırgan QR'ı taradığın an bunu yapabilirdi.** QR = link. Tıklamadan önce nereye gittiğini kontrol et."

---

### Slayt 28 · Ransomware Geri Sayım

> "Şu ekrana bakın. CryptoLock-26 fidye yazılımı — verilerinizi şifreledi. Geri almak için 0.05 Bitcoin ödemeniz gerek — bugünkü kurda yaklaşık 50.000 dolar. Geri sayım bittiğinde fiyat **iki katı** olur. Yedeğiniz var mı? Yoksa fidye ödemek tek seçenek gibi görünür. 3-2-1 yedek kuralı: 3 kopya, 2 farklı medya, 1 fiziksel olarak ayrı yerde. Her hafta otomatik."

**Yapılacak:** Sayaç doğal akışında devam ediyor, paniği büyütüyor.

---

## BÖLÜM 6 · KORUNMA

### Slayt 29 · Bölüm 03 başlık

> "Şimdi savunmaya geçiyoruz. Bugün, salondan çıkmadan uygulayabileceğin adımlar."

---

### Slayt 30 · 5 Dakikada 5 Adım

> "Beş adım, beş dakika. **Bir:** Şifre yöneticisi kur — 1Password, Bitwarden veya Apple/Google parolaları, ücretsiz başla. **İki:** Banka, e-posta ve sosyal medyaya authenticator-tabanlı 2FA aç. **Üç:** Telefon ve bilgisayar güncellemelerini otomatik bırak — yamalar canını kurtarır. **Dört:** Haftada bir, ayrı bir diskte ya da bulutta yedek al — 3-2-1 kuralı. **Beş:** 3 saniye dur. Linke tıklamadan, mesajı kontrol et."

---

### Slayt 31 · 3 Saniye Kuralı (cinematic)

> "Şimdi şu sahte SMS'e bakın. Sayaç 3-2-1 sayıyor. **Dur. Bak.** Saniye sıfırlanırken üç işaret parlıyor: kişisel numara, yanlış alan adı, aciliyet baskısı. İşte bu kadar — 3 saniye + 3 işaret = kapatılan link. **TIKLAMA.** Bu sahnedeki kırmızı damga senin yapman gereken şey."

---

## BÖLÜM 7 · KAPANIŞ

### Slayt 32 · Manifesto

> "Son söz. **En zayıf halka değiliz, en güçlü farkındalığız.** Saldırgan yazılımı geçemez — kullanıcıyı ikna eder. O kullanıcıyı bilinçli yaparsak — saldırganın en güçlü silahı elinde kalır. Burada öğrendikleriniz sizinle, ailenizle, üniversite arkadaşınızla paylaşıldığı sürece, **biz kazanıyoruz**."

---

### Slayt 33 · Teşekkürler · QR'lar

> "Bağlantıda kalmak isterseniz — soldaki LinkedIn, ortadaki Instagram, sağdaki web sitesi. Sorularınızı her zaman dinlerim. Beni dinlediğiniz için teşekkürler — sahnenizde olmak güzeldi."

**Yapılacak:** Soru-cevap için 5–10 dakika ayır. Mikrofonu salona ver.

---

# Genel İpuçları

1. **Tempoya dikkat:** Otomatik açılan slaytlar 1.5–2.5 saniye aralıkla parça parça açılır. Erken konuşma — slayt yetişene kadar bekle, sonra söyle.
2. **İnteraktif anlar:** Slayt 11 (canlı şifre), 26-27 (QR phishing). Bu ikisinde audience'a 30-60 saniye bırak. Acele ettirme.
3. **Süre yönetimi:** Hedef 35-40 dk + 5-10 dk Q&A. Hızlı geçen bölüm: 4-5-7 (sayılar). Yavaş geçen: 16-17 (animasyonlar otomatik).
4. **Mimikler:** Slayt 9 ve 11'de audience'a doğrudan bak — bu içerik onları çok rahatsız edecek, yüzlerini izle, bir-iki şaka yap.
5. **Soru-Cevap sık gelen sorular:**
   - "Authenticator hangi uygulama?" → "Google Authenticator, Microsoft Authenticator, Authy — üçü de iyi, hiç biri SMS değil."
   - "Şifre yöneticisi güvenli mi?" → "Master parolayı sen tutuyorsun, dosyalar şifreli. Kullanmadığında kayıp daha büyük."
   - "Deepfake nasıl anlarım?" → "Üç ipucu (slayt 24). Şüphelendiğin an: telefonu kapat, **kendi numarasından** geri ara."

---

*Notlar: Sunum 2026-05-12'de hazırlandı. Tüm rakamlar doğrulanmış kaynaklara dayanır (USOM, t24.com.tr, Cumhuriyet, Buffalo Üniversitesi, AA). Slayt sayısı veya akışı değişirse buradaki numaralandırma da güncellenmelidir.*
