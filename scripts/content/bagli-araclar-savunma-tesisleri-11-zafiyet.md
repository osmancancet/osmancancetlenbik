**Eylül 2026'da Norveç ordusunun kiraladığı araçlar, askerlerin kimin aracına bindiğini, nereye gittiğini ve kapı şifrelerini kendiliğinden kaydetti. Birkaç hafta sonra ASELSAN, ROKETSAN, HAVELSAN ve TEI'nin yabancı elektrikli araçları kampüslerine almadığı açıklandı. Bu yazı, iki haberin arkasındaki teknolojiyi 11 zafiyet sınıfı, 33 kaynak ve dikkate alınabilecek önerilerle ele alıyor.**

> Bir tesise giren en büyük bağlı cihaz artık bir telefon değil, bir otomobildir. Telefonu kapıda bıraktırıyoruz; otomobil ise kameraları, modemi ve başkasının yazılımıyla içeri giriyor.

### Bir bakışta: 7 çarpıcı rakam

- **200+** elektronik sensör: Norveç Ulusal Güvenlik Otoritesi'ne (NSM) göre modern bir araçta bulunabilecek sensör sayısı.
- **800.000** elektrikli aracın verisi tek bir yanlış yapılandırılmış bulut deposundan açığa çıktı (VW/Cariad, 2024).
- **30 saniye:** Araştırmacıların yalnızca plaka numarasıyla bir Kia'nın kilidini açıp konumunu izlemesine yetti (2024).
- **3 saniyede bir:** FTC'ye göre GM, sürücülerin konumunu bu sıklıkla kaydedip satılan bir veriye dönüştürdü.
- **%84:** Mozilla'nın incelediği 25 otomobil markasından kişisel veriyi üçüncü taraflarla paylaşabilenlerin oranı.
- **100 dolar:** Lastik basınç sensörlerinden araçları kameradsız izlemeye yeten alıcının yaklaşık maliyeti (2026).
- **2027:** ABD'nin Çin ve Rusya bağlantılı araç yazılımlarını yasakladığı model yılı.

**Bu yazıda:** bağlı aracın veri yolu · araca kimlerin erişebildiği · belgelenmiş 11 zafiyet · bir savunma tesisi için altı senaryo · dünyadaki yasaklar · Türkiye'deki durum · kurumlar ve bireyler için öneriler · sık sorulan sorular.

## Özet

Modern bir otomobil; kameraları, uydu konumlama alıcısı, kendi SIM kartı ve uzaktan güncellenen yazılımıyla bir tesise giren en büyük bağlı cihazdır. Bu çalışma, bağlı araçların hassas tesisler için oluşturduğu riskleri on bir zafiyet sınıfında toplar ve her birini kamuya açık, belgelenmiş bir olayla örnekler. Bağlı araç güvenliğine dair temel bulgu şudur: Risk aracın menşeinden çok, verinin nereye gittiği ve yazılımın kimin kontrolünde olduğuyla belirlenir. Bu nedenle çalışma, marka yerine yeteneğe dayalı bir giriş politikası, kiralama ve filo sözleşmelerinde veri maddeleri ve tesis içinde araç ile telefon arasında kesin bir ayrım önerir.

**Anahtar kelimeler:** bağlı araç, telematik, OTA, TCU, veri egemenliği, kritik altyapı, savunma sanayii, UNECE R155

**Yöntem:** Çalışma kamuya açık kaynaklara dayanır: haber ajansları, resmi kurum açıklamaları, hakemli konferans bildirileri ve güvenlik araştırmacılarının sorumlu ifşa raporları. Her olgu en az bir açılmış kaynakla doğrulanmıştır; belgelenmiş olaylardan yapılan çıkarımlar metinde "çıkarım" ya da "yazarın değerlendirmesi" olarak işaretlenmiştir. Hiçbir araç üzerinde özgün test yapılmamıştır.

## 1. Giriş: Askerler kendi araçlarında kayda alındığında

Ekim 2026'nın ilk iki haftasında iki haber aynı soruyu gündeme taşıdı.

Norveç Silahlı Kuvvetleri, 14-18 Eylül 2026'da Oslo ve çevresinde yaklaşık 5.000 askerle Hovedstad ("Başkent") tatbikatını yaptı. Kiralanan araçlar arasında en az iki Deepal (Changan) elektrikli araç vardı; kiralama şirketi Hertz Norveç, Volvo Cars üzerinden Çin'in Geely grubuna bağlı. Dagens Næringsliv'in haberine göre askerler, araçlarda kimin binip indiğini, nereye gidildiğini, nerede ne kadar beklendiğini ve kapı giriş kodlarının tuşlanışını gösteren video kayıtları buldu. Kayıtlar silindi. Verinin araç dışına çıkıp çıkmadığı bilinmiyor.

Aynı günlerde TUSAŞ Motor Sanayii (TEI) Genel Müdürü Mahmut Faruk Akşit, ASELSAN, ROKETSAN, HAVELSAN ve TEI'nin yabancı elektrikli araçları kampüslerine almadığını açıkladı. Gerekçesi; sensör ve kameraların alanı haritalayabilmesi, yazılım ve kontrolün Türk tarafında olmaması ve savaş zamanında riskin artmasıydı.

Bu iki olay birlikte şu soruyu sordurur: Bir tesise giren araç neleri algılar, bunları nerede saklar, kime gönderir ve kim onu uzaktan değiştirebilir? Bu çalışma bu soruya teknik açıdan cevap arar. Belgelenmiş olaylar ile genel teknik çıkarımlar metinde ayrı tutulmuştur.

## 2. Bağlı araç nedir, verileriniz nereye gider?

Bugünün otomobili, onlarca elektronik kontrol ünitesinin (ECU) bir araç içi ağ üzerinden konuştuğu tekerlekli bir bilgisayar ağıdır. Norveç Ulusal Güvenlik Otoritesi NSM, Risiko 2025 raporunda modern bir aracın 200'den fazla elektronik sensör içerebileceğini belirtiyor.

Veri dört katmandan geçer:

1. **Algılama:** kameralar, radar, ultrasonik sensörler, GNSS, mikrofon ve lastik basınç sensörleri (TPMS).
2. **Araç içi ağ:** CAN veriyolu ve araç içi Ethernet. Ağ geçidi, kritik sürüş fonksiyonlarını bilgi-eğlence sisteminden ayırmak için vardır.
3. **Bağlantı:** telematik kontrol ünitesi (TCU, hücresel modem ve eSIM), Wi-Fi, Bluetooth ve şarj iletişimi.
4. **Arka uç:** üretici bulutu, mobil uygulama API'leri, bayi ve servis portalları, OTA sunucuları ve veriyi satın alan üçüncü taraflar.

![Bağlı bir araçta sensörlerden üretici bulutuna uzanan veri yolu şeması](/yazilarim/otoparktaki-casus/mimari.svg)

Vurgulanan TCU, verinin çıktığı ve yazılımın girdiği ortak kapıdır. Araç bu kapıdan sürücünün telefonundan bağımsız olarak, kendi hattıyla buluta bağlanır. Bu yüzden tesis kapısında telefonlara uygulanan kontrol, araca kendiliğinden uygulanmış olmaz.

### Kamera ve modem artık opsiyon değil, yasal zorunluluk

Bağlantıyı ve kabin kamerasını araca yalnızca üreticiler değil, trafik güvenliği mevzuatı da getiriyor. Bu, "kamerasız, modemsiz araç seçelim" stratejisinin giderek imkânsızlaşması demektir.

- **eCall:** AB, 31 Mart 2018'den itibaren tüm yeni otomobil ve hafif ticari araç modellerinde kaza anında 112'yi otomatik arayan sistemi zorunlu kıldı. Sistem konum ve hücresel bağlantı içerir; düzenleme kazadan önce izlemeyi yasaklar ([Ptolemus](https://www.ptolemus.com/insight/ecall-to-be-mandatory-on-new-car-models-from-31-march-2018/)). Yani her yeni aracın bir modemi vardır; soru, o modemin eCall dışında ne için kullanıldığıdır.
- **Sürücüye bakan kamera:** AB Genel Güvenlik Yönetmeliği'nin ikinci aşaması 7 Temmuz 2026'da yürürlüğe girdi. Yeni üretilen otomobil ve hafif ticari araçlarda, sürücünün bakışını ve baş pozisyonunu izleyen bir dikkat dağınıklığı uyarı sistemi artık zorunlu ([The Next Web](https://thenextweb.com/news/eu-vehicle-safety-rules-gsr-phase-two)).

> Sonuç: Gelecekte hassas tesise girecek her yeni araçta bir kabin kamerası ve bir modem olacak. Politika "bu özellik var mı?" sorusundan "bu özellik doğrulanabilir şekilde kapatılabiliyor mu?" sorusuna taşınmalıdır.

## 3. Araç verinize kimler erişebilir? Tehdit modeli

Hassas bir tesis için tehdit tek bir "hacker" değil; araç verisine meşru ya da gayrimeşru yoldan ulaşabilen dört farklı aktör vardır. Her birinin erişim yolu ve onu durduracak önlem farklıdır.

| Aktör | Erişim yolu | Tesis için anlamı |
| --- | --- | --- |
| Üretici ve tedarikçiler | Telemetri, bulut hesapları, OTA güncellemeleri, uzaktan teşhis | Verinin nereye gittiğini ve yazılımın ne zaman değişeceğini üretici belirler. |
| Devletler (hukuki zorlama) | Üreticinin tabi olduğu ülkenin istihbarat ve veri yasaları | Veri, üretici istemese bile yasal talep yoluyla devlete geçebilir. |
| Ticari üçüncü taraflar | Veri satışı, veri aracıları, sigorta ve reklam ortakları | Konum ve sürüş verisi kontrol dışı çoğaltılır ve satın alınabilir hale gelir. |
| Siber saldırganlar ve yakın mesafe aktörleri | Bulut/API açıkları, Bluetooth, radyo sinyalleri, fiziksel erişim | Hedefli izleme, kayıt çalma ya da aracın işlevlerine müdahale. |

Korunacak varlıklar da üç grupta toplanır: **yer bilgisi** (tesisin iç yerleşimi, giriş noktaları, kamera ve nöbetçi konumları), **insan bilgisi** (kimin, ne zaman, kiminle geldiği; personelin ev adresleri ve rutinleri) ve **işlem bilgisi** (giriş kodları, tatbikat ve sevkiyat düzenleri). Norveç olayında üçü de aynı kayıtta yer aldı.

## 4. Bağlı araçların 11 kritik zafiyeti

On bir sınıfın her biri kamuya açık en az bir olay ya da araştırmayla belgelenmiştir; çoğu üreticiler tarafından kapatılmıştır, ancak her biri aynı mimarinin tekrar eden bir zayıf noktasını gösterir.

| # | Sınıf | Risk altındaki | Belgelenmiş örnek |
| --- | --- | --- | --- |
| Z1 | Pasif sensör kaydı | Tesis görüntüsü, kişiler, kodlar | Norveç Hovedstad tatbikatı, 2026 |
| Z2 | Konum ve hareket verisi | Rutinler, adresler | GM/OnStar, FTC kararı, 2025-2026 |
| Z3 | Telefon eşleşmesi kalıntısı | Rehber, arama geçmişi | Polonya'nın eşleşme yasağı, 2026 |
| Z4 | Hücresel modem (TCU) | Uzaktan erişim | Jeep Uconnect, 2015; Pwn2Own 2024 |
| Z5 | Bulut, API ve portallar | Filonun tamamı | Kia 2024, Subaru 2025, Cariad 2024 |
| Z6 | OTA ve uzaktan kontrol | Aracın işlevi | Ruter/Yutong otobüs testi, 2025 |
| Z7 | Kısa menzil kablosuz | Bilgi-eğlence, kimlik | PerfektBlue 2025, TPMS izleme 2026 |
| Z8 | Araç içi ağ (CAN) | Kilit, immobilizer | Far üzerinden CAN enjeksiyonu, 2023 |
| Z9 | Sensör aldatma | Sürüş kararı | Regulus GNSS, Keen Lab, 2019 |
| Z10 | Şarj altyapısı | Şarj sürekliliği | Brokenwire, 2022 |
| Z11 | Hukuki erişim ve veri egemenliği | Tüm veri | Çin Ulusal İstihbarat Kanunu, 2017 |

### Z1. Pasif sensör kaydı

Sürüş destek sistemleri ve park kameraları çevreyi sürekli görür; bazı araçların nöbet (sentry) ve kaza kaydı modları bu görüntüyü diske yazar. Norveç'te kiralık Deepal araçları kimin binip indiğini, nerede ne kadar beklendiğini ve kapı kodlarının tuşlanışını kaydetti; askerler bunu tesadüfen fark etti ([VG](https://www.vg.no/nyheter/i/311JwL/kinesiskeide-leiebiler-filmet-hemmelig-forsvarsoevelse)). Kaydın yalnızca araçta kalması da güvence değildir: Reuters, Tesla çalışanlarının 2019-2022 arasında müşteri araçlarının kaydettiği kişisel görüntüleri kendi aralarında paylaştığını ortaya koydu ([Reuters / Khaleej Times](https://www.khaleejtimes.com/world/we-could-see-their-kids-tesla-workers-shared-sensitive-images-recorded-by-customer-cars)). Bu da görüntülerin bir kısmının üreticiye ulaştığını gösterir.

### Z2. Konum ve hareket verisi

GNSS kayıtları tek başına bir tesisin adresini değil, giriş saatlerini, vardiya düzenini ve personelin evini ortaya çıkarır. ABD Federal Ticaret Komisyonu'na (FTC) göre GM ve OnStar, milyonlarca aracın konum ve sürüş verisini her üç saniyede bir, rıza almadan toplayıp satın alan şirketler aracılığıyla sigortacılara ulaştırdı; Ocak 2026'da kesinleşen kararla GM'ye beş yıllık satış yasağı getirildi ([BleepingComputer](https://bleepingcomputer.com/news/security/ftc-bans-general-motors-from-selling-drivers-location-data-for-five-years)). Mozilla'nın 2023'te incelediği 25 markanın %84'ü kişisel veriyi üçüncü taraflarla paylaşabiliyor, %76'sı satabiliyordu ([Carscoops](https://www.carscoops.com/2023/09/the-automotive-industry-is-the-worst-consumer-product-sector-for-data-privacy-study-claims/)).

### Z3. Telefon eşleşmesi kalıntısı

Bluetooth, Apple CarPlay ya da Android Auto ile eşleşen telefon; rehberini, arama geçmişini ve bazen mesajlarını bilgi-eğlence sistemine aktarır. Kiralık ve filo araçlarında bu veri bir sonraki kullanıcıya ya da servis personeline kalır (genel teknik bilgi, bu çalışmada ayrıca test edilmedi). Polonya Genelkurmayı Şubat 2026'da personelin hizmet telefonlarını Çin üretimi araçların bilgi-eğlence sistemlerine bağlamasını yasakladı ([Notes from Poland](https://notesfrompoland.com/2026/02/19/poland-bans-chinese-cars-from-military-bases-and-personnel-from-connecting-phones-to-them/)).

### Z4. Hücresel modem (TCU)

TCU aracın internete açılan kapısıdır ve kendi SIM'i vardır. 2015'te Charlie Miller ve Chris Valasek, Jeep Cherokee'nin Uconnect sisteminde hücresel ağa açık kalmış bir port üzerinden aracın direksiyonuna, frenine ve şanzımanına kilometrelerce uzaktan müdahale etti; FCA 1,4 milyon aracı geri çağırdı ([Dark Reading](https://www.darkreading.com/cyber-risk/jeep-hack-0day-an-exposed-port)). 2024'teki ilk Pwn2Own Automotive yarışmasında Synacktiv ekibi Tesla'nın modemini üç açıklık zinciriyle ele geçirdi ([ZDI](https://www.thezdi.com/blog/2024/1/24/pwn2own-automotive-2024-day-one-results)).

### Z5. Bulut, API ve portallar

En ölçeklenebilir zafiyet araçta değil, üreticinin sunucularındadır: tek bir açık filonun tamamını etkiler.

- **Kia (2024):** Araştırmacılar bir web portalındaki açık sayesinde yalnızca plaka numarasıyla, yaklaşık 30 saniyede 2013 sonrası üretilmiş Kia araçlarının kilidini açabiliyor, motorunu çalıştırabiliyor ve konumunu izleyebiliyordu ([Security Affairs](https://securityaffairs.com/168966/hacking/hacking-kia-cars-made-after-2013.html)).
- **Subaru (2025):** Çalışan portalındaki bir açıkla bir aracın en az bir yıllık konum geçmişi, park yeri hassasiyetinde alınabildi ([TechRadar](https://www.techradar.com/vehicle-tech/hackers-expose-serious-subaru-security-flaws-that-allow-them-to-remotely-start-cars)).
- **VW / Cariad (2024):** Yanlış yapılandırılmış bir bulut deposu 800.000 elektrikli aracın verisini açığa çıkardı; 466.000'inde konum günlük rutini çıkaracak kadar hassastı. Listede Hamburg polisinin elektrikli filosu ve istihbarat çalışanı olduğu düşünülen kişiler vardı ([Electrek](https://electrek.co/2024/12/30/massive-data-leak-at-volkswagen-exposes-800000-ev-drivers/)).

Bu üç olayın üçü de Batıl ya da Japon/Kore üreticilerine aittir. Risk ülkeye değil mimariye bağlıdır.

### Z6. OTA güncellemeleri ve uzaktan kontrol

OTA, güvenlik yamalarını hızla dağıtmanın en iyi yoludur; ama aynı kanal, imza anahtarını tutan tarafın aracın davranışını tesise girdikten sonra değiştirebilmesi demektir. Oslo'nun toplu taşıma işletmecisi Ruter, sinyalleri kesmek için bir madende yaptığı testte, Çin üretimi Yutong otobüslerinin batarya ve güç kontrol sistemine üreticinin mobil ağ üzerinden erişebildiğini ve otobüslerin teorik olarak durdurulabileceğini buldu. Karşılaştırılan Hollanda yapımı VDL otobüslerinde OTA yeteneği yoktu ([AP / The Week](https://www.theweek.in/wire-updates/international/2025/11/05/fes29-norway-china-electric-buses.html)). Akşit'in "savaş zamanı" vurgusu bu sınıfa denk gelir.

### Z7. Kısa menzilli kablosuz arayüzler

- **Bluetooth:** PerfektBlue olarak adlandırılan dört açık, OpenSynergy BlueSDK yığını üzerinden Mercedes-Benz, Volkswagen ve Škoda araçlarının bilgi-eğlence sisteminde kod çalıştırmayı, konumu izlemeyi ve ses kaydetmeyi mümkün kıldı. Saldırı yakın mesafe ve eşleşme gerektiriyor; yamalar Eylül 2024'te dağıtıldı ([The Hacker News](https://thehackernews.com/2025/07/perfektblue-bluetooth-vulnerabilities.html)).
- **Lastik basınç sensörleri (TPMS):** IMDEA Networks, tanesi yaklaşık 100 dolarlık alıcılarla 10 haftada 20.000'den fazla aracın TPMS sinyalini topladı. Sensörler benzersiz kimliklerini şifresiz yayınlıyor ve 50 metreden uzağa ulaşıyor; bu, bir aracın tesise kaç kez girdiğinin kameradsız izlenebilmesi demek ([IMDEA Networks](https://networks.imdea.org/your-cars-tire-sensors-could-be-used-to-track-you/)).

### Z8. Araç içi ağ (CAN)

CAN veriyolundaki mesajlar çoğu araçta kimlik doğrulaması taşımaz. Ken Tindell ve Ian Tabor, bir Toyota RAV4'ün hırsızların farını söküp kablolardan CAN'e ulaşarak ve akıllı anahtar mesajlarını taklit ederek çalındığını gösterdi. Tindell'in ifadesiyle alıcılar bu mesajlara "doğrudan güveniyor" ([The Register](https://www.theregister.com/2023/04/06/can_injection_attack_car_theft)). Hassas tesis açısından anlamı: otoparkta fiziksel erişim, araca ve dolayısıyla bağlı sistemlerine geçiş demektir.

### Z9. Sensör aldatma

Araçlar sensörlerine güvenerek karar verir. Regulus Cyber 2019'da sahte GNSS sinyaliyle Navigate on Autopilot modundaki bir Tesla Model 3'ü otoyoldan erken çıkmaya yönlendirdiğini açıkladı; Tesla bu iddiayı yanıltıcı buldu ([Claims Journal](https://www.claimsjournal.com/news/national/2019/06/19/291550.htm)). Tencent Keen Lab aynı yıl yola yapıştırılan küçük etiketlerle Autopilot'u karşı şeride yönlendirebildi ([Schneier on Security](https://www.schneier.com/blog/archives/2019/04/adversarial_mac.html)). GNSS karıştırma ve aldatmanın çatışma bölgelerinde yaygınlaşması, bu sınıfı savunma tesislerinin çevresi için somut hale getirir (çıkarım).

### Z10. Şarj altyapısı

Elektrikli araç, şarj sırasında istasyonla veri alışverişi yapar. Oxford Üniversitesi ve armasuisse araştırmacılarının Brokenwire saldırısı, 1 W'tan düşük güçle ve 47 metreye kadar mesafeden CCS hızlı şarj oturumlarını kesebildi; test edilen sekiz araç ve 20 şarj cihazının hepsi etkilendi ([NDSS](https://www.ndss-symposium.org/ndss-paper/brokenwire-wireless-disruption-of-ccs-electric-vehicle-charging)). Pwn2Own 2024'te beş farklı ev ve ticari şarj cihazı da hedef alındı ([ZDI](https://www.thezdi.com/blog/2024/1/24/pwn2own-automotive-2024-day-one-results)). Elektrikli bir filoya geçen askeri birim için şarj, yeni bir lojistik zayıf noktadır.

### Z11. Hukuki erişim ve veri egemenliği

Teknik olarak kusursuz bir sistem bile üreticinin tabi olduğu hukuk kadar güvenlidir. Çin'in 2017 tarihli Ulusal İstihbarat Kanunu'nun 7. maddesi, tüm kuruluş ve vatandaşların ulusal istihbarat çalışmalarını "desteklemesini, yardım etmesini ve onlarla işbirliği yapmasını" öngörür ([China Law Translate](https://www.chinalawtranslate.com/en/national-intelligence-law-of-the-p-r-c-2017/)). Volvo Cars, Norveç olayında Geely ile yasal dayanak olmadan veri paylaşılamayacağını söyledi; sorun tam da "yasal dayanak"ın hangi ülkenin hukukuna göre tanımlandığıdır. Mozilla'ya göre incelenen markaların yarısından fazlası da kolluk taleplerinde mahkeme kararı olmadan veri paylaşabiliyordu; yani bu sınıf yalnızca Çin'e özgü değildir.

### Risk matrisi: Hangi zafiyet önce ele alınmalı?

![Bağlı araçların 11 zafiyet sınıfını olasılık ve etkiye göre gösteren risk matrisi](/yazilarim/otoparktaki-casus/risk-matrisi.svg)

Sağ üstteki dört sınıf (pasif kayıt, konum, bulut/API ve hukuki erişim) bugün, barış zamanında gerçekleşen ve tesis dışında olduğu için tespit edilmesi en zor risklerdir; öncelik bunlarda. Sol üstteki modem ve OTA riskleri barışta düşük olasılıklıdır, ancak kriz anında olasılıkları hızla artar; bunlar için kriz planı gerekir. Bu değerlendirme yazarın nitel yorumudur, ölçüme dayalı değildir.

## 5. Bir savunma tesisinde neler yaşanabilir? Altı senaryo

Aşağıdaki senaryolar önceki bölümdeki belgelenmiş yeteneklerin bir tesise uygulanmasıdır; olayların kendisi değil, çıkarımdır. Her biri tek bir aracın değil, zaman içinde biriken çok sayıda aracın verisiyle güçlenir.

1. **Tesis haritalama (Z1, Z2):** Kampüse giren araçların çevre kameraları ve park sensörleri bina yerleşimini, giriş kapılarını, güvenlik kamerası ve nöbetçi noktalarını kaydeder. Akşit'in "alanı haritalayabilir" uyarısı budur.
2. **Örüntü analizi (Z2, Z7):** Konum kayıtları vardiya saatlerini, test ve teslimat günlerini, olağanüstü yoğunluğu gösterir. Bir tatbikat öncesi otoparktaki doluluk artışı tek başına bir istihbarat işaretidir.
3. **Personel profili (Z2, Z3, Z5):** Araç hem tesise hem eve gider. Eşleşen telefonlar kişi ağlarını ekler. Bu, kritik personelin kimliğini ve adresini tespit etmeye yeter.
4. **Erişim bilgisi yakalama (Z1):** Norveç'te görüldüğü gibi kabin ya da çevre kamerası, tuşlu kapı ve bariyer kodlarını kaydedebilir.
5. **Savaş zamanı müdahale (Z4, Z6, Z10):** Uzaktan güncellenebilen ya da güç sistemine erişilebilen araçlar kriz anında devre dışı bırakılabilir; bir filonun aynı anda durması lojistik bir saldırıdır. Akşit'in savaş simülasyonlarında yapay zekânın otomobilleri füze gibi kullandığı uyarısı bu senaryonun uç halidir.
6. **Kiralık ve paylaşımlı araçlar (tüm sınıflar):** Kurum aracı ayarlarını bilir; kiralık araç bilmez. Norveç olayı bir kiralama çerçeve sözleşmesinden doğdu ve birlik başka araç olmadığı için kayıt yapan araçları kullanmaya devam etti.

## 6. Dünya nasıl tepki veriyor? Yasaklar ve düzenlemeler

Farklı rejimler aynı sonuca vardı: hassas alanlarda bağlı araç, bir siber güvenlik meselesi olduğu kadar bir egemenlik meselesidir. Kararlar en yeniden eskiye sıralıdır.

| Tarih | Ülke / kurum | Karar | Kaynak |
| --- | --- | --- | --- |
| Ekim 2026 | Türkiye: ASELSAN, ROKETSAN, HAVELSAN, TEI | Yabancı elektrikli araçlar kampüse alınmıyor, yerli araçlara izin var | [TRT Haber](https://www.trthaber.com/haber/savunma/tusas-motor-sanayii-genel-muduru-aksit-yabanci-elektrikli-arabalari-kampusun-icine-sokmuyoruz-959795.html) |
| Eylül 2026 | Norveç Silahlı Kuvvetleri | Belirli ülkelerin araçlarına genel yasak yok; tehdit değerlendirmesine göre önlem | [VG](https://www.vg.no/nyheter/i/311JwL/kinesiskeide-leiebiler-filmet-hemmelig-forsvarsoevelse) |
| Şubat 2026 | Polonya Genelkurmayı | Çin üretimi araçlar korunan askeri tesislere giremez; personel telefonlarını bu araçlara bağlayamaz; diğer araçlar kayıt özellikleri kapalıysa girebilir | [Notes from Poland](https://notesfrompoland.com/2026/02/19/poland-bans-chinese-cars-from-military-bases-and-personnel-from-connecting-phones-to-them/) |
| Ocak 2026 | ABD FTC | GM'ye konum verisi satışında 5 yıl yasak, 20 yıl açık rıza zorunluluğu | [BleepingComputer](https://bleepingcomputer.com/news/security/ftc-bans-general-motors-from-selling-drivers-location-data-for-five-years) |
| Kasım 2025 | İsrail Savunma Kuvvetleri | Subaylara verilen yaklaşık 700 Chery aracı geri toplanıyor; Çin araçları zaten üslere giremiyordu | [Israel Hayom](https://www.israelhayom.com/2025/11/02/idf-orders-removal-of-chinese-cars-over-espionage-fears) |
| Ocak 2025 | ABD Ticaret Bakanlığı (BIS) | Çin ve Rusya bağlantılı bağlantı ve otonom sürüş yazılımları 2027, donanımları 2030 model yılından itibaren yasak | [BIS](https://www.bis.gov/press-release/commerce-finalizes-rule-secure-connected-vehicle-supply-chains-foreign-adversary-threats) |
| Temmuz 2024 | AB (UNECE R155 / R156) | Tüm yeni araçlarda siber güvenlik ve yazılım güncelleme yönetim sistemi zorunlu | [INCIBE-CERT](https://www.incibe.es/index.php/en/incibe-cert/blog/new-2024-cybersecurity-regulations-vehicles) |
| Ekim 2021 | Çin (CAC) | Askeri bölgelerdeki araç ve insan akışı verisi "önemli veri"; yurt içinde saklanmalı | [FPF](https://fpf.org/blog/update-chinas-car-privacy-and-security-regulation-is-effective-on-october-1-2021/) |
| Mart 2021 | Çin Halk Kurtuluş Ordusu | Tesla araçları askeri tesis ve lojmanların dışında park etmeli | [Al Jazeera](https://www.aljazeera.com/amp/economy/2021/3/19/chinas-military-bans-tesla-cars-on-camera-sensor-spy-concerns) |

**R155/R156'nın sınırı.** Bu düzenlemeler üreticinin siber riskleri yönettiğini ve güncellemeleri güvenli dağıttığını denetler. Verinin hangi ülkede tutulduğunu, imza anahtarının kimde olduğunu ya da hangi devletin talep hakkı olduğunu düzenlemez (kapsamdan çıkarım). Bir araç tip onayını geçip yine de bir savunma tesisi için uygun olmayabilir.

**Dikkat çekici simetri.** Çin'in kendi ordusu için 2021'de aldığı önlemle bugün ABD, İsrail, Polonya ve Türk savunma şirketlerinin önlemleri aynı mantığa dayanır: kontrolü başkasında olan bağlı araç, hassas alana girmez.

## 7. Türkiye için ne anlama geliyor?

Türkiye'de otoparklar hızla bağlı ve elektrikli araçlarla doluyor; buna karşılık hassas tesislere araç kabulünü düzenleyen ulusal, kamuya açık bir standart bulunmuyor (yazarın tespiti). TEI'nin açıklaması bu boşluğu kurum düzeyinde dolduran ilk görünür adımdır.

**Pazar hızla değişiyor.** ODMD verilerine göre 2025'in ilk yarısında Türkiye'de 84.956 tam elektrikli otomobil satıldı; bu, bir önceki yılın aynı dönemine göre yüzde 138 artış demek. Liste başında Togg (17.101), Tesla (12.320) ve BYD (10.401) vardı ([AA / Politikam](https://www.politikam.com/togg-2025e-damgasini-vurdu-tesla-ve-bydyi-geride-birakti-toggun-en-cok-satilan-modelleri-hangileri-oldu)). Bu araçların sahipleri arasında savunma sanayii, enerji ve kamu kurumları çalışanları da var; yani risk yalnızca kurum filosunda değil, personelin özel aracındadır.

**Hukuki zemin iki parçalı.**

- **KVKK:** Araçtan toplanan konum ve kabin verisi kişisel veridir. 7499 sayılı Kanun'la değişen 9. madde, 1 Haziran 2024'ten itibaren yurt dışına aktarımı yeterlilik kararına, Kurul'un ilan ettiği standart sözleşmelere ya da bağlayıcı şirket kurallarına bağladı ([Erdem & Erdem](https://www.erdem-erdem.av.tr/bilgi-bankasi/kisisel-verilerin-korunmasi-kanununda-neler-degisti)). Ancak KVKK bireyin mahremiyetini korur; bir tesisin bina yerleşimi ya da nöbetçi düzeni kişisel veri değildir ve bu kanunla korunmaz (çıkarım).
- **Siber Güvenlik Kanunu:** 19 Mart 2025'te Resmî Gazete'de yayımlanan 7545 sayılı Kanun, kritik altyapıların siber güvenliği için Siber Güvenlik Başkanlığı'nı yetkili kıldı ([Alomaliye](https://www.alomaliye.com/2025/03/19/7545-sayili-siber-guvenlik-kanunu/)). Hassas tesislere araç kabulüne dair bir rehberin bu çatı altında hazırlanması doğal bir adım olur (yazarın önerisi).

**"Yerli" ayrımı doğru ama tek başına yeterli değil.** TEI'nin yerli araçlara izin vermesinin gerekçesi, yazılım ve kontrolün yurt içinde olmasıdır. Bu doğru bir ilkedir; ancak modem, bilgi-eğlence yazılımı, harita servisi ve bulut altyapısı gibi bileşenler küresel tedarikçilerden gelebilir. Kurumlar yerli araç için de veri akış haritası ve bileşen listesi istemelidir (çıkarım).

> Türkiye'nin sorusu "yabancı araç girsin mi?" ile sınırlı kalmamalı: "Hangi araç, hangi yetenekle, hangi bölgeye girsin?" sorusu ulusal bir standarda dönüşmeli.

## 8. Nasıl korunulur? Kurumlar ve bireyler için öneriler

En etkili önlem, araçları marka ya da menşeye göre değil, sahip oldukları yeteneğe ve bu yeteneğin kimin kontrolünde olduğuna göre sınıflandırmaktır. Polonya'nın "kayıt özellikleri kapalıysa girebilir" kuralı bu yaklaşımın iyi bir örneğidir.

Aşağıdaki öneriler, kamuya açık kaynaklardan ve diğer ülkelerin uygulamalarından derlenmiş bir tartışma zemini sunar. Kurumların kendi güvenlik birimlerinin, tesislerine özgü risk değerlendirmesinin yerini tutmaz; TEI ve diğer savunma şirketlerinin aldığı kararlar bu önerilerin çoğunun zaten uygulamada olduğunu gösteriyor.

### Savunma sanayii ve kritik altyapı tesisleri için

1. **Bölgeleme:** Tesisi en az üç bölgeye ayırın: dış otopark (tüm araçlar), iç alan (yalnızca onaylı araçlar), hassas alan (araç yok ya da özel donanımlı kurum araçları). Personel taşıması iç alanda kurum servisleriyle yapılsın.
2. **Yeteneğe dayalı giriş politikası:** Her araç modeli için kamera kaydı, nöbet modu, hücresel modem, OTA ve uzaktan komutların kapatılıp kapatılamadığını ve bunun nasıl doğrulandığını listeleyen bir onay envanteri tutun.
3. **Yerli araçta da doğrulama:** "Yerli" olmak yazılımın ve bulutun yurt içinde olduğu anlamına otomatik olarak gelmez; tedarikçi bileşenleri (modem, bilgi-eğlence, harita servisi) ayrıca sorgulanmalıdır.
4. **Kapı ve kod hijyeni:** Tuşlu kodları kartlı, biyometrik ya da tek kullanımlık yöntemlerle değiştirin; kod girilen noktaları araç kameralarının görebileceği açılardan uzak tutun.
5. **RF görünürlük:** Tesis çevresinde hücresel, Bluetooth ve TPMS yayınlarını izleyen pasif sensörlerle hangi araçların içeride "konuştuğunu" görün.
6. **Olay müdahale planı:** Norveç'teki gibi bir kayıt bulunduğunda aracı karantinaya alma, belleği adli inceleme için imajlama ve ancak sonra silme adımlarını tanımlayın. Silmek, verinin dışarı gidip gitmediği sorusunu cevapsız bırakır.

### Filo ve kiralama sözleşmeleri için

- Teslimde kamera kaydı, nöbet modu ve telematik paylaşımının kapalı olduğu belgelensin.
- İadede bilgi-eğlence sistemi sıfırlansın ve silme kanıtı verilsin.
- Araç verisinin hangi ülkede, hangi bulutta tutulduğu ve hangi üçüncü taraflara aktarıldığı sözleşmeye yazılsın.
- Tedarikçinin nihai ortaklık yapısı (Norveç'teki Hertz, Volvo, Geely zinciri gibi) ihale aşamasında sorgulansın.
- Tatbikat ve hassas görevler için alternatif araç havuzu hazır tutulsun.

### Personel ve bireyler için

- Kurumsal telefonu hiçbir araca eşleştirmeyin; kişisel telefonda da kiralık araca rehber ve mesaj erişimi vermeyin.
- Aracınızın uygulamasında konum geçmişi, sürüş analizi ve veri paylaşım izinlerini gözden geçirin; kullanmadığınızı kapatın.
- Hassas bir tesise giderken nöbet ve kaza kaydı modlarını kapatın.

### Politika yapıcılar ve üreticiler için

- Kamu ihalelerinde araç için de bir "yazılım malzeme listesi" (SBOM) ve veri akış haritası isteyin.
- Hassas alan için tek tuşla tüm kayıt ve bağlantıları kapatan, doğrulanabilir bir "güvenli bölge modu" standardı tartışılsın.
- OTA güncellemelerinin filo sahibince onaylanmadan uygulanmaması seçeneği sunulsun; Ruter bu yönde gelen sinyalleri geciktirip inceleme yoluna gitti.
- TPMS gibi şifresiz yayın yapan bileşenler siber güvenlik düzenlemelerinin kapsamına alınsın.

## 9. Sonuç: Araç artık bir uç noktadır

Norveç tatbikatında kanıtlanan şey bir casusluk operasyonu değil, araçların kimseye sorulmadan kayıt yapabildiğidir. Bu, yeterince ciddi bir bulgudur: kontrol edemediğiniz bir kayıt, kontrol edemediğiniz bir sızıntı riskidir.

Bağlı araç artık bir uç nokta (endpoint) cihazıdır ve bir dizüstü bilgisayar ya da telefon gibi yönetilmelidir. Sorulacak soru "bu araç hangi ülkenin?" değil; "bu araç neyi algılıyor, nereye gönderiyor ve kim onu uzaktan değiştirebilir?" olmalıdır. Akşit'in özetlediği gibi, yazılım sizdeyse şifreyi değiştirirsiniz; başkasındaysa o istediğini yapar.

## Sık sorulan sorular

### Elektrikli araçlar benzinli araçlardan daha mı riskli?

Risk motor tipinden değil bağlantıdan gelir. Modern benzinli araçlarda da modem, kamera ve OTA bulunur. Elektrikli araçlar ise genellikle daha yazılım merkezlidir, daha fazla sensör taşır ve şarj altyapısıyla ek bir veri yolu açar.

### Sorun yalnızca Çin üretimi araçlarda mı?

Hayır. Kia, Subaru, Volkswagen ve GM olaylarının hiçbiri Çin menşeli değildir. Çin'e özgü olan, üreticinin tabi olduğu istihbarat kanunu nedeniyle hukuki erişim riskidir. Çin de aynı gerekçeyle 2021'de Tesla'ları askeri alanlarından çıkarmıştır.

### Norveç'teki araçlar görüntüleri Çin'e gönderdi mi?

Bilinmiyor. Kanıtlanan, araçlarda video kaydı olduğu ve kayıtların silindiğidir. Verinin araç dışına çıkıp çıkmadığı kamuya açık kaynaklarda doğrulanmamıştır.

### Aracımın kamerasını ya da modemini kapatabilir miyim?

Çoğu araçta nöbet ve kayıt modları ile veri paylaşım izinleri ayarlardan kapatılabilir. Modemin tamamen kapatılması ise genellikle mümkün değildir; AB'de eCall nedeniyle tüm yeni modellerde bulunur. Kapatmanın gerçekten işe yaradığını doğrulamak kurum düzeyinde test gerektirir.

### UNECE R155 sertifikalı bir araç güvenli midir?

R155, üreticinin siber riskleri yönettiğini gösterir. Verinin hangi ülkede tutulduğunu ya da güncellemeyi kimin gönderebileceğini düzenlemez. Sertifika gereklidir ama hassas tesis için yeterli değildir.

### Bir kurum ilk olarak ne yapmalı?

Üç adımla başlayın: hassas alanları araç trafiğinden ayırın, kurumsal telefonların araçlarla eşleşmesini yasaklayın ve kiralama ile filo sözleşmelerine veri maddesi ekleyin. Ayrıntılar 8. bölümde yer alıyor.

### Bireysel kullanıcı olarak endişelenmeli miyim?

Savunma tesisinde çalışmıyor olsanız bile konum geçmişiniz, ev adresiniz ve rutinleriniz araç verisinde bulunur. Uygulamadaki veri paylaşım izinlerini gözden geçirmek ve kiralık araçtan inerken telefon eşleşmesini silmek iyi bir başlangıçtır.

## Terimler sözlüğü

| Terim | Açıklama |
| --- | --- |
| Bağlı araç | İnternete, üretici bulutuna ya da başka cihazlara bağlanabilen araç |
| CAN veriyolu | Araç içindeki kontrol ünitelerinin haberleştiği, çoğu zaman kimlik doğrulaması olmayan ağ |
| ECU | Elektronik kontrol ünitesi; fren, motor, batarya gibi işlevleri yöneten bilgisayar |
| eCall | Kaza anında acil çağrı merkezini otomatik arayan, AB'de zorunlu sistem |
| eSIM | Araca gömülü, sökülemeyen SIM kart |
| GNSS | GPS, Galileo gibi uydu konumlama sistemlerinin genel adı |
| IVI | Bilgi-eğlence sistemi; ekran, navigasyon, telefon bağlantısı |
| OTA | Kablosuz (over-the-air) yazılım güncellemesi |
| R155 / R156 | BM'nin araç siber güvenliği ve yazılım güncelleme yönetimi düzenlemeleri |
| Nöbet (sentry) modu | Park halindeyken çevreyi izleyip kaydeden kamera modu |
| TCU | Telematik kontrol ünitesi; aracın hücresel modemi |
| TPMS | Lastik basıncı izleme sistemi; kablosuz sinyal yayan sensörler |

## Yazar hakkında

**Osman Can Çetlenbik**, Manisa Celal Bayar Üniversitesi Teknik Bilimler Meslek Yüksekokulu Büyük Veri Analistliği Programı'nda öğretim görevlisi ve üniversitenin Bilgisayar Uygulama ve Araştırma Merkezi müdür yardımcısıdır. Bilgisayar mühendisliği lisansını Süleyman Demirel Üniversitesi'nde, yüksek lisansını Isparta Uygulamalı Bilimler Üniversitesi'nde tamamladı. Oltalama tespiti, sosyal mühendislik ve IoT güvenliği üzerine çalışıyor; Türkçe oltalama e-postaları için geliştirdiği TurkPhish v2 derlemi ve akıllı şebekelerde sahte veri enjeksiyonu saldırılarının tespiti üzerine 2026'da yayımlanmış makaleleri bulunuyor. "TIKLA(MA): İnsan Zihnini Hackleme Sanatı" kitabının yazarıdır ve kurumlara sızma testi ile siber güvenlik eğitimi vermektedir. ([AVESİS](https://avesis.mcbu.edu.tr/osman.cetlenbik))

*Bu yazının İngilizce sürümü: [The Spy in the Parking Lot](/yazilarim/connected-cars-defense-sites-11-vulnerabilities)*

## Kaynaklar

Tüm kaynaklar 12 Ekim 2026 itibarıyla açılıp okunmuştur. Dagens Næringsliv'in ilk haberi abonelikli olduğu için içeriği VG ve Norway News üzerinden doğrulandı.

1. TRT Haber / AA, [TUSAŞ Motor Sanayii Genel Müdürü Akşit: Yabancı elektrikli arabaları kampüsün içine sokmuyoruz](https://www.trthaber.com/haber/savunma/tusas-motor-sanayii-genel-muduru-aksit-yabanci-elektrikli-arabalari-kampusun-icine-sokmuyoruz-959795.html), 11 Ekim 2026.
2. TRT Haber / AA, [Norveç'teki askeri tatbikatta kiralık araçların hassas bilgileri kaydettiği ileri sürüldü](https://www.trthaber.com/haber/dunya/norvecteki-askeri-tatbikatta-kiralik-araclarin-hassas-bilgileri-kaydettigi-ileri-suruldu-959933.html), 12 Ekim 2026.
3. VG, [Kinesisk-eide leiebiler filmet hemmelig forsvarsøvelse](https://www.vg.no/nyheter/i/311JwL/kinesiskeide-leiebiler-filmet-hemmelig-forsvarsoevelse), Ekim 2026.
4. Norway News, [Chinese-owned rental cars recorded Norwegian military drill](https://norwaynews.com/chinese-owned-rental-cars-recorded-norwegian-military-drill/), 12 Ekim 2026.
5. Dagens Næringsliv, [Kinesisk-eide leiebiler filmet hemmelig øvelse](https://www.dn.no/forsvar-og-sikkerhet/kinesisk-eide-leiebiler-filmet-hemmelig-ovelse-lagret-video-av-soldater-og-koder/2-1-2050958) (abonelikli).
6. Militarnyi, [Chinese cars in Norway stored military exercise footage and access codes](https://militarnyi.com/en/news/chinese-cars-in-norway-stored-military-exercise-footage-and-access-codes/) (NSM Risiko 2025 ve kiralama sözleşmesi ayrıntıları).
7. AP / The Week, [Norway transport firm steps up controls after tests show Chinese-made buses can be halted remotely](https://www.theweek.in/wire-updates/international/2025/11/05/fes29-norway-china-electric-buses.html), 5 Kasım 2025.
8. U.S. Bureau of Industry and Security, [Commerce finalizes rule to secure connected vehicle supply chains](https://www.bis.gov/press-release/commerce-finalizes-rule-secure-connected-vehicle-supply-chains-foreign-adversary-threats), 14 Ocak 2025.
9. Notes from Poland, [Poland bans Chinese cars from military bases and personnel from connecting phones to them](https://notesfrompoland.com/2026/02/19/poland-bans-chinese-cars-from-military-bases-and-personnel-from-connecting-phones-to-them/), 19 Şubat 2026.
10. Israel Hayom, [IDF orders removal of Chinese cars over espionage fears](https://www.israelhayom.com/2025/11/02/idf-orders-removal-of-chinese-cars-over-espionage-fears), 2 Kasım 2025.
11. Al Jazeera / Bloomberg, [China's military bans Tesla cars on camera, sensor spy concerns](https://www.aljazeera.com/amp/economy/2021/3/19/chinas-military-bans-tesla-cars-on-camera-sensor-spy-concerns), 19 Mart 2021.
12. Future of Privacy Forum, [China's car privacy and security regulation is effective on October 1, 2021](https://fpf.org/blog/update-chinas-car-privacy-and-security-regulation-is-effective-on-october-1-2021/).
13. China Law Translate, [National Intelligence Law of the P.R.C. (2017)](https://www.chinalawtranslate.com/en/national-intelligence-law-of-the-p-r-c-2017/).
14. INCIBE-CERT, [New 2024 cybersecurity regulations for vehicles](https://www.incibe.es/index.php/en/incibe-cert/blog/new-2024-cybersecurity-regulations-vehicles), 13 Haziran 2024.
15. BleepingComputer, [FTC bans General Motors from selling drivers' location data for five years](https://bleepingcomputer.com/news/security/ftc-bans-general-motors-from-selling-drivers-location-data-for-five-years), 15 Ocak 2026.
16. Carscoops, [Mozilla: the automotive industry is the worst consumer product sector for data privacy](https://www.carscoops.com/2023/09/the-automotive-industry-is-the-worst-consumer-product-sector-for-data-privacy-study-claims/), Eylül 2023.
17. Reuters / Khaleej Times, [Tesla workers shared sensitive images recorded by customer cars](https://www.khaleejtimes.com/world/we-could-see-their-kids-tesla-workers-shared-sensitive-images-recorded-by-customer-cars), 7 Nisan 2023.
18. Dark Reading, [Jeep hack 0day: an exposed port](https://www.darkreading.com/cyber-risk/jeep-hack-0day-an-exposed-port), 6 Ağustos 2015.
19. Zero Day Initiative, [Pwn2Own Automotive 2024 day one results](https://www.thezdi.com/blog/2024/1/24/pwn2own-automotive-2024-day-one-results), 24 Ocak 2024.
20. Security Affairs, [Hacking Kia cars made after 2013 using just their license plate](https://securityaffairs.com/168966/hacking/hacking-kia-cars-made-after-2013.html), 26 Eylül 2024.
21. TechRadar, [Hackers expose serious Subaru security flaws](https://www.techradar.com/vehicle-tech/hackers-expose-serious-subaru-security-flaws-that-allow-them-to-remotely-start-cars), 27 Ocak 2025.
22. Electrek, [Massive data leak at Volkswagen exposes 800,000 EV drivers](https://electrek.co/2024/12/30/massive-data-leak-at-volkswagen-exposes-800000-ev-drivers/), 30 Aralık 2024.
23. The Hacker News, [PerfektBlue Bluetooth vulnerabilities](https://thehackernews.com/2025/07/perfektblue-bluetooth-vulnerabilities.html), 11 Temmuz 2025.
24. IMDEA Networks, [Your car's tire sensors could be used to track you](https://networks.imdea.org/your-cars-tire-sensors-could-be-used-to-track-you/), 25 Şubat 2026.
25. The Register, [CAN injection attack used to steal cars](https://www.theregister.com/2023/04/06/can_injection_attack_car_theft), 6 Nisan 2023.
26. Claims Journal, [Tesla Model 3 GPS spoofing test by Regulus Cyber](https://www.claimsjournal.com/news/national/2019/06/19/291550.htm), 19 Haziran 2019.
27. Schneier on Security, [Adversarial machine learning against Tesla's Autopilot](https://www.schneier.com/blog/archives/2019/04/adversarial_mac.html), Nisan 2019.
28. NDSS Symposium, [Brokenwire: Wireless disruption of CCS electric vehicle charging](https://www.ndss-symposium.org/ndss-paper/brokenwire-wireless-disruption-of-ccs-electric-vehicle-charging), 2023.

**Yayın sürümünde eklenen kaynaklar**

- Ptolemus, [eCall to be mandatory on new car models from 31 March 2018](https://www.ptolemus.com/insight/ecall-to-be-mandatory-on-new-car-models-from-31-march-2018/).
- The Next Web, [Every new EU car now needs a camera that watches the driver](https://thenextweb.com/news/eu-vehicle-safety-rules-gsr-phase-two), 9 Temmuz 2026.
- AA / Politikam, [TOGG 2025'e damgasını vurdu](https://www.politikam.com/togg-2025e-damgasini-vurdu-tesla-ve-bydyi-geride-birakti-toggun-en-cok-satilan-modelleri-hangileri-oldu), 6 Temmuz 2025.
- Erdem & Erdem, [Kişisel Verilerin Korunması Kanunu'nda neler değişti?](https://www.erdem-erdem.av.tr/bilgi-bankasi/kisisel-verilerin-korunmasi-kanununda-neler-degisti)
- Alomaliye, [7545 sayılı Siber Güvenlik Kanunu](https://www.alomaliye.com/2025/03/19/7545-sayili-siber-guvenlik-kanunu/), 19 Mart 2025.
