import type { LocaleServiceDict } from "./types";

export const tr: LocaleServiceDict = {
  categories: {
    guvenlik: {
      label: "Siber Güvenlik & Sızma Testi",
      blurb: "Uygulamalarınızı saldırganın gördüğü yerden test ediyorum: bulgular kanıtlı, riskler önceliklendirilmiş, çözümler uygulanabilir.",
    },
    gelistirme: {
      label: "Yazılım Geliştirme",
      blurb: "Mobil ve web tarafında tek kod tabanından üretim kalitesinde ürünler — güvenlik en baştan tasarıma dahil.",
    },
    veri: {
      label: "Veri & Yapay Zekâ",
      blurb: "Veriyi karar verilebilir hale getiren modeller, panolar ve otomasyonlar.",
    },
    egitim: {
      label: "Eğitim & Danışmanlık",
      blurb: "Kurum içi eğitim, farkındalık programları ve teknik danışmanlık.",
    },
  },
  services: {
    "web-sizma-testi": {
      title: "Web Sızma Testi",
      summary:
        "Web uygulamanızı ve API'lerinizi OWASP Top 10 başta olmak üzere gerçek saldırı senaryolarıyla test ediyorum: kimlik doğrulama atlatma, yetki yükseltme, SQL injection, XSS, SSRF, iş mantığı açıkları ve oturum yönetimi hataları.",
      deliverables: [
        "Kapsam ve kural mutabakatı (black-box / grey-box / white-box)",
        "Kanıtlı bulgu raporu — CVSS skoru ve yeniden üretim adımları",
        "Yönetici özeti + teknik ek",
        "Düzeltme sonrası ücretsiz doğrulama testi",
      ],
    },
    "mobil-sizma-testi": {
      title: "Mobil Uygulama Sızma Testi",
      summary:
        "iOS ve Android uygulamalarında OWASP MASVS/MASTG kapsamında statik ve dinamik analiz: tersine mühendislik direnci, güvensiz veri saklama, sertifika sabitleme, kök/jailbreak tespiti ve arka uç iletişimi.",
      deliverables: [
        "APK / IPA statik analizi ve tersine mühendislik değerlendirmesi",
        "Çalışma zamanı analizi (Frida, trafik araya girme)",
        "Yerel veri saklama ve anahtar yönetimi incelemesi",
        "MASVS seviyesine göre uyum tablosu",
      ],
    },
    "ag-altyapi-sizma-testi": {
      title: "Ağ ve Altyapı Sızma Testi",
      summary:
        "Dış ve iç ağ yüzeyinizin haritasını çıkarıp zayıf noktaları istismar ediyorum: açık servisler, varsayılan kimlik bilgileri, yamalanmamış sistemler, Active Directory yanlış yapılandırmaları ve kablosuz ağ güvenliği.",
      deliverables: [
        "Dış yüzey keşfi ve saldırı yüzeyi haritası",
        "İç ağ yanal hareket ve yetki yükseltme senaryoları",
        "Active Directory sertleştirme önerileri",
        "Kablosuz ağ (Wi-Fi) güvenlik değerlendirmesi",
      ],
    },
    "sosyal-muhendislik-simulasyonu": {
      title: "Sosyal Mühendislik & Phishing Simülasyonu",
      summary:
        "İnsan katmanını ölçüyorum. Kuruma özel senaryolarla kontrollü phishing, QR tuzağı ve telefon (vishing) simülasyonları düzenliyor; sonuçları bölüm bazında raporlayıp eğitimle kapatıyorum.",
      deliverables: [
        "Kuruma özel senaryo tasarımı ve yasal onay süreci",
        "Tıklanma, veri girme ve raporlama oranı metrikleri",
        "Departman kırılımlı risk haritası",
        "Simülasyon sonrası farkındalık oturumu",
      ],
    },
    "iot-guvenlik-testi": {
      title: "IoT ve Gömülü Cihaz Güvenlik Testi",
      summary:
        "Akademik çalışma alanım olan IoT güvenliğini sahaya taşıyorum: firmware çıkarma ve analiz, donanım arayüzleri (UART/JTAG), MQTT ve BLE protokol güvenliği, cihaz–bulut iletişimi.",
      deliverables: [
        "Firmware çıkarma, dosya sistemi ve gömülü sır analizi",
        "Donanım arayüzü (UART / JTAG / SPI) değerlendirmesi",
        "Protokol güvenliği (MQTT, CoAP, BLE) testi",
        "Cihaz–bulut kimlik doğrulama incelemesi",
      ],
    },
    "kaynak-kod-guvenlik-incelemesi": {
      title: "Kaynak Kod Güvenlik İncelemesi",
      summary:
        "Kodun içinden bakarak tarayıcıların kaçırdığı hataları buluyorum: yetkilendirme mantığı, kriptografi kullanımı, gizli anahtar sızıntıları, bağımlılık zinciri riskleri ve CI/CD boru hattı güvenliği.",
      deliverables: [
        "Manuel kod incelemesi + SAST bulgularının elenmesi",
        "Bağımlılık ve tedarik zinciri risk raporu",
        "Güvenli kodlama rehberi (takıma özel)",
        "CI/CD boru hattına güvenlik kontrolleri eklenmesi",
      ],
    },
    "mobil-uygulama-gelistirme": {
      title: "Mobil Uygulama Geliştirme",
      summary:
        "React Native ve Expo ile tek kod tabanından iOS ve Android uygulamaları. Fikirden App Store ve Google Play yayınına kadar tüm süreç — çevrimdışı çalışma, cihaz üzerinde yapay zekâ ve mağaza yayın süreçleri dahil.",
      deliverables: [
        "Ürün keşfi, akış tasarımı ve teknik mimari",
        "iOS + Android tek kod tabanı (React Native / Expo)",
        "App Store ve Google Play yayın süreci yönetimi",
        "Analitik, çökme takibi ve sürüm sonrası bakım",
      ],
    },
    "web-uygulamasi-gelistirme": {
      title: "Web Uygulaması & Kurumsal Site Geliştirme",
      summary:
        "Next.js ve TypeScript ile hızlı, erişilebilir ve arama motoruna hazır web uygulamaları. Kurumsal tanıtım sitesinden panel ve iç platformlara kadar; Core Web Vitals ve SEO en baştan planlanır.",
      deliverables: [
        "Tasarımdan üretime tam yığın geliştirme (Next.js + TypeScript)",
        "Yönetim paneli / içerik yönetimi",
        "Core Web Vitals ve erişilebilirlik optimizasyonu",
        "Vercel dağıtımı, alan adı ve izleme kurulumu",
      ],
    },
    "api-backend-gelistirme": {
      title: "API & Backend Geliştirme",
      summary:
        "Uçtan uca tip güvenli, ölçeklenebilir ve güvenli arka uçlar. Kimlik doğrulama, yetkilendirme, hız sınırlama ve denetim kaydı gibi güvenlik gereksinimleri varsayılan olarak gelir.",
      deliverables: [
        "REST / tRPC API tasarımı ve dokümantasyonu",
        "PostgreSQL veri modeli ve Prisma şeması",
        "Kimlik doğrulama, rol tabanlı yetkilendirme, hız sınırlama",
        "Yük testi ve izleme (logging / alerting)",
      ],
    },
    "seo-geo-optimizasyonu": {
      title: "Teknik SEO & GEO Optimizasyonu",
      summary:
        "Sitenizin hem Google'da hem de ChatGPT, Gemini ve Perplexity gibi üretken arama motorlarında (GEO) bulunmasını sağlıyorum: teknik denetim, yapısal veri, kanonik/hreflang düzeni ve içerik mimarisi.",
      deliverables: [
        "Search Console tabanlı teknik denetim ve hata kapatma",
        "Schema.org yapısal veri (JSON-LD) kurulumu",
        "Kanonik, hreflang, site haritası ve robots düzenlemesi",
        "GEO: llms.txt, yapay zekâ tarayıcı politikası ve içerik yapısı",
      ],
    },
    "veri-analitigi-yapay-zeka": {
      title: "Veri Analitiği & Yapay Zekâ Çözümleri",
      summary:
        "Makine öğrenmesi, doğal dil işleme ve açıklanabilir yapay zekâ (XAI) projeleri. Modelin doğruluğu kadar neden öyle karar verdiği de raporlanır — kurumsal kullanımda asıl fark burada.",
      deliverables: [
        "Veri keşfi, temizleme ve öznitelik mühendisliği",
        "Model geliştirme, doğrulama ve kıyaslama",
        "Açıklanabilirlik raporu (SHAP / LIME)",
        "Üretime alma ve model izleme",
      ],
    },
    "veri-gorsellestirme-panolar": {
      title: "Veri Görselleştirme & Yönetim Panoları",
      summary:
        "Dağınık veriyi tek bir karar ekranında toplayan panolar. Hangi metriğin izleneceğinden görsel dile kadar, okunabilirliği önceleyen bir tasarımla.",
      deliverables: [
        "Metrik seti ve KPI tanımlarının belirlenmesi",
        "Veri boru hattı ve otomatik yenileme",
        "Etkileşimli pano (web tabanlı)",
        "Otomatik periyodik rapor gönderimi",
      ],
    },
    "kurumsal-siber-guvenlik-egitimi": {
      title: "Kurumsal Siber Güvenlik Eğitimi",
      summary:
        "Sekiz yılı aşkın eğitim deneyimiyle, teknik olmayan ekiplere de anlaşılır gelen farkındalık programları. Canlı demolar ve gerçek vakalar üzerinden ilerler — slayt okuması değil.",
      deliverables: [
        "Kuruma göre uyarlanmış müfredat",
        "Canlı saldırı demoları (phishing, QR tuzağı, şifre kırma)",
        "Ölçme–değerlendirme ve katılım sertifikası",
        "Eğitim sonrası ölçüm için simülasyon kampanyası",
      ],
    },
    "teknik-danismanlik": {
      title: "Teknik Danışmanlık & Akademik İş Birliği",
      summary:
        "Ürün mimarisi, güvenlik yol haritası, teknoloji seçimi ve ekip mentorluğu. Ayrıca üniversite–sanayi iş birliği, ortak yayın ve proje başvurularında akademik destek.",
      deliverables: [
        "Mimari ve güvenlik yol haritası çıkarımı",
        "Teknoloji seçimi ve satın alma değerlendirmesi",
        "Ekip mentorluğu ve kod inceleme kültürü kurulumu",
        "Akademik iş birliği, ortak yayın ve proje başvurusu desteği",
      ],
    },
  },
  faq: [
    {
      q: "Sızma testi ile güvenlik açığı taraması arasındaki fark nedir?",
      a: "Güvenlik açığı taraması otomatik araçlarla bilinen zafiyetleri listeler ve çok sayıda yanlış pozitif üretir. Sızma testinde ise bulguları elle doğrular, istismar edilebilirliğini kanıtlar ve zincirleme saldırı senaryolarını gösteririm. Rapordaki her bulgu yeniden üretilebilir adımlarla gelir.",
    },
    {
      q: "Bir web sızma testi ne kadar sürer?",
      a: "Kapsama bağlı olarak tipik bir kurumsal web uygulaması 5–10 iş günü sürer. Kapsam belirleme görüşmesinden sonra net bir süre ve fiyat teklifi paylaşırım. Düzeltmeler tamamlandıktan sonraki doğrulama testi ücretsizdir.",
    },
    {
      q: "Test sırasında sistemlerimiz zarar görür mü?",
      a: "Hayır. Testler önceden yazılı olarak mutabık kalınan kapsam ve kurallar çerçevesinde yürütülür; hizmet kesintisine yol açabilecek yıkıcı teknikler yalnızca açık izinle ve tercihen test ortamında uygulanır. Çalışma saatleri ve bilgilendirme kanalları baştan belirlenir.",
    },
    {
      q: "Mobil uygulama geliştirmede iOS ve Android için ayrı ücret alıyor musunuz?",
      a: "Hayır. React Native / Expo ile tek kod tabanından iki platforma birden çıkıyoruz; ekranların büyük bölümü paylaşıldığı için maliyet iki ayrı yerel uygulamanın oldukça altında kalır. Platforma özel gereksinimler ayrıca değerlendirilir.",
    },
    {
      q: "Uzaktan mı çalışıyorsunuz, yerinde hizmet de veriyor musunuz?",
      a: "Sızma testleri ve geliştirme işleri uzaktan yürütülebilir. Kurumsal eğitimler, farkındalık atölyeleri ve iç ağ testleri için Manisa, İzmir ve çevre illerde yerinde çalışıyorum; diğer şehirler için de planlama yapılabilir.",
    },
    {
      q: "Bir proje için nasıl teklif alabilirim?",
      a: "İletişim sayfasındaki formu doldurmanız yeterli. İhtiyacınızı, kapsamı ve varsa zaman kısıtınızı yazın; genellikle iki iş günü içinde kapsam görüşmesi için dönüş yapıyorum.",
    },
  ],
};
