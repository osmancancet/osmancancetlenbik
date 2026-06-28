import dynamic from "next/dynamic";
import type { ComponentType } from "react";

export type PresentationMeta = {
  slug: string;
  title: string;
  description?: string;
};

type Entry = {
  meta: PresentationMeta;
  Component: ComponentType;
};

/**
 * Yeni sunum eklemek için:
 *   1. src/presentations/<slug>/Presentation.tsx oluştur
 *   2. (varsa) src/presentations/<slug>/styles.css ekle ve component'te import et
 *   3. Buraya yeni bir entry ekle
 *   4. Admin'de konferans/dersi düzenleyip "Sunum" alanından bu slug'ı seç
 */
export const presentations: Record<string, Entry> = {
  "siber-guvenlik": {
    meta: {
      slug: "siber-guvenlik",
      title: "Siber Güvenlik Farkındalık Etkinliği",
      description:
        "37 slaytlık interaktif siber güvenlik farkındalık sunumu (Matrix Rain, glitch, otomatik simülasyonlar).",
    },
    Component: dynamic(() => import("./siber-guvenlik/Presentation"), {
      ssr: false,
    }),
  },
  "mcbukaf-2026-siber": {
    meta: {
      slug: "mcbukaf-2026-siber",
      title:
        "İnteraktif Siber Güvenlik: Son Kullanıcı Zafiyetleri ve Sosyal Mühendislik",
      description:
        "MCBÜKAF'26 için sıfırdan kurgulanmış 23 slaytlık sunum: tıkla-açıl oltalama anatomisi, sahnede canlı şifre kırıcı ve cihaz parmak izi deneyi, deepfake ipuçları ve 5 dakikalık ransomware geri sayımı.",
    },
    Component: dynamic(() => import("./mcbukaf-2026-siber/Presentation"), {
      ssr: false,
    }),
  },
  "ofis-programlari": {
    meta: {
      slug: "ofis-programlari",
      title: "Ofis Programları (PowerPoint · Canva · Gamma)",
      description:
        "BVA 1108 9. hafta — Sunum hazırlama araçları için 24 slaytlık görsel React sunum.",
    },
    Component: dynamic(() => import("./ofis-programlari/Presentation"), {
      ssr: false,
    }),
  },
  "kelime-islem": {
    meta: {
      slug: "kelime-islem",
      title: "Kelime İşlem Programı (Word · Google Docs · LibreOffice)",
      description:
        "BVA 1108 10. hafta — Microsoft Word ve alternatifleri için 35 slaytlık görsel React sunum.",
    },
    Component: dynamic(() => import("./kelime-islem/Presentation"), {
      ssr: false,
    }),
  },
  "denklem-cizim-grafik": {
    meta: {
      slug: "denklem-cizim-grafik",
      title: "Denklem · Çizim · Grafik",
      description:
        "BVA 1108 11. hafta — Word'ün üç görsel süper gücü (Equation Editor, Shapes/SmartArt, Charts) için 34 slaytlık React sunum.",
    },
    Component: dynamic(() => import("./denklem-cizim-grafik/Presentation"), {
      ssr: false,
    }),
  },
  "tablolarla-calisma": {
    meta: {
      slug: "tablolarla-calisma",
      title: "Tablolarla Çalışma (Excel · Sheets · Word)",
      description:
        "BVA 1108 12. hafta — Excel temelleri, formüller, pivot tablolar, Word tabloları ve alternatifler için 33 slaytlık React sunum.",
    },
    Component: dynamic(() => import("./tablolarla-calisma/Presentation"), {
      ssr: false,
    }),
  },
  "sunum-dosyasi": {
    meta: {
      slug: "sunum-dosyasi",
      title: "Sunum Dosyası Hazırlama (PowerPoint · Canva · Gamma)",
      description:
        "BVA 1108 13. hafta — Strateji, yapı, tasarım, hareket, sunma ve paylaşım. 32 slaytlık uçtan uca pratik React sunum.",
    },
    Component: dynamic(() => import("./sunum-dosyasi/Presentation"), {
      ssr: false,
    }),
  },
  "programlama-temelleri-h01": {
    meta: {
      slug: "programlama-temelleri-h01",
      title: "Programlama Temellerine Giriş (BVA 1101 · 1. Hafta)",
      description:
        "Algoritma, akış diyagramı, programlama dili kavramları + Code Editor / Flowchart mockup'larıyla 19 slaytlık açılış sunumu.",
    },
    Component: dynamic(() => import("./programlama-temelleri-h01/Presentation"), {
      ssr: false,
    }),
  },
  "is-sagligi-ve-guvenligi-h01": {
    meta: {
      slug: "is-sagligi-ve-guvenligi-h01",
      title: "İlk Yardıma Giriş (BVA 1109 · 1. Hafta)",
      description:
        "ABC algoritması, ilk yardım çantası, 112 acil çağrı mockup'ı ile 20 slaytlık iş sağlığı ve güvenliği açılışı.",
    },
    Component: dynamic(() => import("./is-sagligi-ve-guvenligi-h01/Presentation"), {
      ssr: false,
    }),
  },
  "uretken-yapay-zekalar-h01": {
    meta: {
      slug: "uretken-yapay-zekalar-h01",
      title: "Üretken Yapay Zekâya Genel Bakış (BVA 1203 · 1. Hafta)",
      description:
        "ChatGPT/Claude/Gemini, token & olasılık, prompt demo, halüsinasyon ve etik konularıyla 20 slaytlık açılış.",
    },
    Component: dynamic(() => import("./uretken-yapay-zekalar-h01/Presentation"), {
      ssr: false,
    }),
  },
  "buyuk-veri-icin-bulut-bilisim-h01": {
    meta: {
      slug: "buyuk-veri-icin-bulut-bilisim-h01",
      title: "Bulut Bilişime Giriş (BVA 2103 · 1. Hafta)",
      description:
        "IaaS/PaaS/SaaS, AWS/Azure/GCP, on-prem vs cloud karşılaştırma ve AWS console mockup ile 20 slaytlık açılış.",
    },
    Component: dynamic(() => import("./buyuk-veri-icin-bulut-bilisim-h01/Presentation"), {
      ssr: false,
    }),
  },
  "sosyal-ag-analizi-h01": {
    meta: {
      slug: "sosyal-ag-analizi-h01",
      title: "Ağ Merkezilik Ölçüleri (BVA 2105 · 1. Hafta)",
      description:
        "Degree, betweenness, closeness, eigenvector merkezilikleri + interaktif graf SVG'leri ile 20 slaytlık açılış.",
    },
    Component: dynamic(() => import("./sosyal-ag-analizi-h01/Presentation"), {
      ssr: false,
    }),
  },
  "veri-gorsellestirme-h01": {
    meta: {
      slug: "veri-gorsellestirme-h01",
      title: "Veri Görselleştirmeye Giriş (BVA 2107 · 1. Hafta)",
      description:
        "Anscombe quartet, Tufte ilkeleri, renk teorisi, grafik türleri galerisi ve Tableau dashboard mockup ile 20 slaytlık açılış.",
    },
    Component: dynamic(() => import("./veri-gorsellestirme-h01/Presentation"), {
      ssr: false,
    }),
  },
  "siber-guvenlik-ve-bilisim-hukuku-h01": {
    meta: {
      slug: "siber-guvenlik-ve-bilisim-hukuku-h01",
      title: "Siber Güvenliğe Giriş & CIA Üçlüsü (BVA 2205 · 1. Hafta)",
      description:
        "CIA üçlüsü, tehdit aktörleri, phishing & nmap mockup'ları, Türk bilişim hukuku temelleri ile 20 slaytlık açılış.",
    },
    Component: dynamic(() => import("./siber-guvenlik-ve-bilisim-hukuku-h01/Presentation"), {
      ssr: false,
    }),
  },
  "kullanici-arayuzu-tasarimi-h01": {
    meta: {
      slug: "kullanici-arayuzu-tasarimi-h01",
      title: "UI/UX Tasarımına Giriş (BVA 2245 · 1. Hafta)",
      description:
        "UI vs UX, HCI, Don Norman ilkeleri, Figma workspace mockup ve bad-vs-good UI karşılaştırmalarıyla 20 slaytlık açılış.",
    },
    Component: dynamic(() => import("./kullanici-arayuzu-tasarimi-h01/Presentation"), {
      ssr: false,
    }),
  },
  "siber-guvenlik-ve-bilisim-hukuku-h02": {
    meta: {
      slug: "siber-guvenlik-ve-bilisim-hukuku-h02",
      title: "Ağ Trafiği Analizi: Wireshark & Nmap (BVA 2205 · 2. Hafta)",
      description:
        "TCP/IP & paket anatomisi, üç-yönlü el sıkışma, Nmap tarama türleri ve port durumları, Wireshark paket listesi + Follow TCP Stream ile şifresiz trafik riski; uygulamalı lab adımları ile 18 slaytlık ders sunumu.",
    },
    Component: dynamic(() => import("./siber-guvenlik-ve-bilisim-hukuku-h02/Presentation"), {
      ssr: false,
    }),
  },
  "buyuk-veri-icin-bulut-bilisim-h02": {
    meta: {
      slug: "buyuk-veri-icin-bulut-bilisim-h02",
      title: "Büyük Veri Kavramlarına Genel Bakış (BVA 2103 · 2. Hafta)",
      description: "Büyük veri tanımı, 5V modeli (Volume/Velocity/Variety/Veracity/Value), byte-PB ölçek tablosu, batch vs stream, üç veri tipi ve modern kaynaklar, veri değer zinciri diyagramı, klasik vs dağıtık karşılaştırma tablosu, PySpark terminal ve üç-format kod mockup'ı, 5V sınıflandırma laboratuvarı ile 18 slaytlık ders sunumu.",
    },
    Component: dynamic(() => import("./buyuk-veri-icin-bulut-bilisim-h02/Presentation"), {
      ssr: false,
    }),
  },
  "buyuk-veri-icin-bulut-bilisim-h03": {
    meta: {
      slug: "buyuk-veri-icin-bulut-bilisim-h03",
      title: "Bulut Hizmet Modelleri: IaaS · PaaS · SaaS (BVA 2103 · 3. Hafta)",
      description: "BVA 2103 3. hafta için 18 slaytlık React sunum: bulut yığını ve paylaşılan sorumluluk modeli, IaaS/PaaS/SaaS karşılaştırması, AWS CLI ile sunucu başlatma, Heroku deploy ve bulut CRM mockup'ları, karşılaştırma tablosu ve senaryo tabanlı karar alıştırması.",
    },
    Component: dynamic(() => import("./buyuk-veri-icin-bulut-bilisim-h03/Presentation"), {
      ssr: false,
    }),
  },
  "buyuk-veri-icin-bulut-bilisim-h04": {
    meta: {
      slug: "buyuk-veri-icin-bulut-bilisim-h04",
      title: "Bulut Dağıtım Modelleri (BVA 2103 · 4. Hafta)",
      description: "Public, private, hybrid ve community bulut dağıtım modellerini karşılaştıran 15 slaytlık React sunum: NIST tanımları, 5 eksenli karşılaştırma tablosu, public/private/hybrid SVG diyagramı, CapEx-OpEx maliyet analizi, hybrid kurulum terminal mockup'ı ve bir hastane veri platformu üzerinden iş yükü yerleştirme alıştırması.",
    },
    Component: dynamic(() => import("./buyuk-veri-icin-bulut-bilisim-h04/Presentation"), {
      ssr: false,
    }),
  },
  "buyuk-veri-icin-bulut-bilisim-h05": {
    meta: {
      slug: "buyuk-veri-icin-bulut-bilisim-h05",
      title: "Başlıca Bulut Platformları: AWS · Azure · GCP (BVA 2103 · 5. Hafta)",
      description: "16 slaytlık React sunum: büyük üçlü bulut sağlayıcısının (AWS, Azure, GCP) pazar payı, Region/AZ kavramı, Compute/Storage/Database servis adlarının eşleştirilmesi, üç farklı CLI ile aynı görevin karşılaştırılması ve büyük veri / analitik (DWH, yönetilen Spark, akış, ML) servislerinin kıyaslanması; uygulamalı görev ve Hafta 6 (Sanallaştırma) önizlemesiyle kapanır.",
    },
    Component: dynamic(() => import("./buyuk-veri-icin-bulut-bilisim-h05/Presentation"), {
      ssr: false,
    }),
  },
  "buyuk-veri-icin-bulut-bilisim-h06": {
    meta: {
      slug: "buyuk-veri-icin-bulut-bilisim-h06",
      title: "Bulut Depolama Çözümleri (BVA 2103 · 6. Hafta)",
      description: "Nesne/blok/dosya depolama, depolama sınıfları ve yaşam döngüsü, dayanıklılık vs kullanılabilirlik ve veri gölü/ambar/lakehouse mimarisini S3 CLI ile lifecycle JSON mockuplarıyla işleyen 17 slaytlık sunum. Uygulamalı lab ve sonraki hafta (HDFS) önizlemesiyle kapanır.",
    },
    Component: dynamic(() => import("./buyuk-veri-icin-bulut-bilisim-h06/Presentation"), {
      ssr: false,
    }),
  },
  "buyuk-veri-icin-bulut-bilisim-h07": {
    meta: {
      slug: "buyuk-veri-icin-bulut-bilisim-h07",
      title: "Dağıtılmış Hesaplama Çerçevelerine Giriş (BVA 2103 · 7. Hafta)",
      description: "Tek makineye sığmayan veriyi küme üzerinde paralel işleme: MapReduce paradigması (Map→Shuffle→Reduce), Hadoop ekosistemi (HDFS, YARN, MapReduce) ve Apache Spark (RDD, bellek-içi işleme, DAG). 19 slayt; scale-up/scale-out diyagramı, HDFS ve spark-submit terminal mockupları, PySpark WordCount kod örneği, Hadoop vs Spark tablosu ve uygulamalı PySpark lab.",
    },
    Component: dynamic(() => import("./buyuk-veri-icin-bulut-bilisim-h07/Presentation"), {
      ssr: false,
    }),
  },
  "buyuk-veri-icin-bulut-bilisim-h09": {
    meta: {
      slug: "buyuk-veri-icin-bulut-bilisim-h09",
      title: "Hadoop: Mimarisi ve Bileşenleri (BVA 2103 · 9. Hafta)",
      description: "Hadoop'un mimarisini ve üç çekirdek bileşenini (HDFS, YARN, MapReduce) anlatan 20 slaytlık React sunum: master/worker diyagramı, NameNode-DataNode blok ve replikasyon görseli, hdfs dfs terminal mockup'ı, YARN iş akışı, MapReduce WordCount akışı, Hadoop ekosistemi ve bulutta tek düğümlü WordCount uygulamalı labı.",
    },
    Component: dynamic(() => import("./buyuk-veri-icin-bulut-bilisim-h09/Presentation"), {
      ssr: false,
    }),
  },
  "buyuk-veri-icin-bulut-bilisim-h10": {
    meta: {
      slug: "buyuk-veri-icin-bulut-bilisim-h10",
      title: "Hadoop MapReduce Programlama (BVA 2103 · 10. Hafta)",
      description: "Map/Shuffle/Reduce modeli, WordCount veri akışı diyagramı, Mapper/Reducer/Driver Java kodu, YARN yürütme topolojisi, Combiner ve Partitioner ile sık hatalar tablosu ve uygulamalı lab içeren 18 slaytlık ders sunumu.",
    },
    Component: dynamic(() => import("./buyuk-veri-icin-bulut-bilisim-h10/Presentation"), {
      ssr: false,
    }),
  },
  "buyuk-veri-icin-bulut-bilisim-h11": {
    meta: {
      slug: "buyuk-veri-icin-bulut-bilisim-h11",
      title: "Apache Spark: Tanıtım ve Temel Kavramlar (BVA 2103 · 11. Hafta)",
      description: "18 slaytlık Apache Spark giriş sunumu: MapReduce'tan bellek-içi işlemeye köprü, disk-vs-RAM görseli, cluster mimarisi (Driver/Manager/Executor) SVG diyagramı, RDD ve DAG ile tembel değerlendirme, Transformation-vs-Action, birleşik ekosistem (Spark SQL/MLlib/Streaming/GraphX), canlı PySpark shell mockup'ı ve AWS EMR üzerinde uygulamalı lab.",
    },
    Component: dynamic(() => import("./buyuk-veri-icin-bulut-bilisim-h11/Presentation"), {
      ssr: false,
    }),
  },
  "buyuk-veri-icin-bulut-bilisim-h12": {
    meta: {
      slug: "buyuk-veri-icin-bulut-bilisim-h12",
      title: "Spark RDD'leri — Dayanıklı Dağıtık Veri Kümeleri (BVA 2103 · 12. Hafta)",
      description: "Apache Spark'ın çekirdek soyutlaması RDD'yi anlatan 20 slaytlık sunum: ismin açılımı (Resilient/Distributed/Dataset), değişmezlik ve parçalanma, transformasyon-eylem ayrımı ile tembel değerlendirme, WordCount örneği, lineage tabanlı hata toleransı, persist/cache depolama seviyeleri, RDD vs DataFrame karşılaştırması ve uygulamalı bir pyspark log-analizi labı. pyspark/spark-shell terminal mockup'ları, lineage ve partition diyagramları içerir.",
    },
    Component: dynamic(() => import("./buyuk-veri-icin-bulut-bilisim-h12/Presentation"), {
      ssr: false,
    }),
  },
  "buyuk-veri-icin-bulut-bilisim-h13": {
    meta: {
      slug: "buyuk-veri-icin-bulut-bilisim-h13",
      title: "Bulutta veri analitiği (BVA 2103 · 13. Hafta)",
      description: "BVA 2103 13. hafta ders sunumu — Bulutta veri analitiği",
    },
    Component: dynamic(() => import("./buyuk-veri-icin-bulut-bilisim-h13/Presentation"), {
      ssr: false,
    }),
  },
  "buyuk-veri-icin-bulut-bilisim-h14": {
    meta: {
      slug: "buyuk-veri-icin-bulut-bilisim-h14",
      title: "Bulutta Makine Öğrenimi (BVA 2103 · 14. Hafta)",
      description: "Bulutta makine öğrenimi için 18 slaytlık React sunum: yerel makine vs bulut karşılaştırması, yönetilen ML servisleri, hazır AI API / AutoML / özel eğitim soyutlama seviyeleri, altı adımlık ML hattı diyagramı, SageMaker Studio not defteri mockup'ı, karmaşıklık matrisi ve metrikler, MLOps & drift izleme, maliyet kuralları ve Free Tier uçtan uca uygulamalı lab.",
    },
    Component: dynamic(() => import("./buyuk-veri-icin-bulut-bilisim-h14/Presentation"), {
      ssr: false,
    }),
  },
  "buyuk-veri-icin-bulut-bilisim-h15": {
    meta: {
      slug: "buyuk-veri-icin-bulut-bilisim-h15",
      title: "Bulut Bilişimde Güvenlik ve Gizlilik (BVA 2103 · 15. Hafta)",
      description: "BVA 2103 15. hafta — Bulut güvenliği ve gizlilik için 18 slaytlık React sunum: paylaşılan sorumluluk modeli, CIA üçlüsü ve tehdit yüzeyi, IAM/MFA/least-privilege (örnek IAM policy JSON), at-rest/in-transit şifreleme (KMS + TLS terminal mockup), KVKK-GDPR karşılaştırması ve uygulamalı bucket sertleştirme görevi.",
    },
    Component: dynamic(() => import("./buyuk-veri-icin-bulut-bilisim-h15/Presentation"), {
      ssr: false,
    }),
  },
  "sosyal-ag-analizi-h02": {
    meta: {
      slug: "sosyal-ag-analizi-h02",
      title: "Ağ görselleştirme teknikleri (BVA 2105 · 2. Hafta)",
      description: "BVA 2105 2. hafta ders sunumu — Ağ görselleştirme teknikleri",
    },
    Component: dynamic(() => import("./sosyal-ag-analizi-h02/Presentation"), {
      ssr: false,
    }),
  },
  "sosyal-ag-analizi-h03": {
    meta: {
      slug: "sosyal-ag-analizi-h03",
      title: "Sosyal Ağ Veri Toplama Yöntemleri (BVA 2105 · 3. Hafta)",
      description: "Sosyal ağ verisinin nereden ve nasıl toplandığını işleyen 15 slaytlık sunum: veri kaynaklarının (API, web scraping, anket/kartopu örnekleme, hazır veri setleri) karşılaştırılması, API kavramları (endpoint, token, rate limit, sayfalama) ile curl terminal ve JSON→kenar listesi mockup'ları, scraping/anket yöntemleri ve etik (robots.txt, KVKK), veri formatları tablosu ve kendi mini ağını toplama laboratuvarı.",
    },
    Component: dynamic(() => import("./sosyal-ag-analizi-h03/Presentation"), {
      ssr: false,
    }),
  },
  "sosyal-ag-analizi-h04": {
    meta: {
      slug: "sosyal-ag-analizi-h04",
      title: "Üstel Rastgele Graf Modelleri — ERGM (BVA 2105 · 4. Hafta)",
      description: "17 slaytlık React sunum: Erdős–Rényi rastgele graflardan ERGM'e geçiş, gözlenen vs. rastgele ağ karşılaştırması, üstel aile denklemi ve ağ istatistikleri (kenar, 2-yıldız, üçgen, homofili), R/statnet ile ergm() kestirimi, katsayı yorumu, dejenerasyon ve uyum iyiliği (GOF) ile uygulamalı Florentine lab görevi.",
    },
    Component: dynamic(() => import("./sosyal-ag-analizi-h04/Presentation"), {
      ssr: false,
    }),
  },
  "sosyal-ag-analizi-h05": {
    meta: {
      slug: "sosyal-ag-analizi-h05",
      title: "Topluluk tespit algoritmaları (BVA 2105 · 5. Hafta)",
      description: "BVA 2105 5. hafta ders sunumu — Topluluk tespit algoritmaları (Louvain, Girvan-Newman)",
    },
    Component: dynamic(() => import("./sosyal-ag-analizi-h05/Presentation"), {
      ssr: false,
    }),
  },
  "sosyal-ag-analizi-h06": {
    meta: {
      slug: "sosyal-ag-analizi-h06",
      title: "Aktör odaklı modeller (BVA 2105 · 6. Hafta)",
      description: "BVA 2105 6. hafta ders sunumu — Aktör odaklı modeller",
    },
    Component: dynamic(() => import("./sosyal-ag-analizi-h06/Presentation"), {
      ssr: false,
    }),
  },
  "sosyal-ag-analizi-h07": {
    meta: {
      slug: "sosyal-ag-analizi-h07",
      title: "Boylamsal ağ analizi (BVA 2105 · 7. Hafta)",
      description: "BVA 2105 7. hafta ders sunumu — Boylamsal ağ analizi",
    },
    Component: dynamic(() => import("./sosyal-ag-analizi-h07/Presentation"), {
      ssr: false,
    }),
  },
  "sosyal-ag-analizi-h10": {
    meta: {
      slug: "sosyal-ag-analizi-h10",
      title: "Ağ dinamikleri ve evrim (BVA 2105 · 10. Hafta)",
      description: "BVA 2105 10. hafta ders sunumu — Ağ dinamikleri ve evrim",
    },
    Component: dynamic(() => import("./sosyal-ag-analizi-h10/Presentation"), {
      ssr: false,
    }),
  },
  "sosyal-ag-analizi-h14": {
    meta: {
      slug: "sosyal-ag-analizi-h14",
      title: "Ağ temelli makine öğrenimi (BVA 2105 · 14. Hafta)",
      description: "BVA 2105 14. hafta ders sunumu — Ağ temelli makine öğrenimi (graph embeddings, GNN)",
    },
    Component: dynamic(() => import("./sosyal-ag-analizi-h14/Presentation"), {
      ssr: false,
    }),
  },
  "sosyal-ag-analizi-h15": {
    meta: {
      slug: "sosyal-ag-analizi-h15",
      title: "Ağ etik ve gizlilik sorunları (BVA 2105 · 15. Hafta)",
      description: "BVA 2105 15. hafta ders sunumu — Ağ etik ve gizlilik sorunları",
    },
    Component: dynamic(() => import("./sosyal-ag-analizi-h15/Presentation"), {
      ssr: false,
    }),
  },
  "veri-gorsellestirme-h02": {
    meta: {
      slug: "veri-gorsellestirme-h02",
      title: "Popüler veri görselleştirme araçlarına giriş (BVA 2107 · 2. Hafta)",
      description: "BVA 2107 2. hafta ders sunumu — Popüler veri görselleştirme araçlarına giriş",
    },
    Component: dynamic(() => import("./veri-gorsellestirme-h02/Presentation"), {
      ssr: false,
    }),
  },
  "veri-gorsellestirme-h03": {
    meta: {
      slug: "veri-gorsellestirme-h03",
      title: "Görselleştirme yazılımlarına genel bakış (BVA 2107 · 3. Hafta)",
      description: "BVA 2107 3. hafta ders sunumu — Görselleştirme yazılımlarına genel bakış (Tableau, Power BI, Plotly, Seaborn)",
    },
    Component: dynamic(() => import("./veri-gorsellestirme-h03/Presentation"), {
      ssr: false,
    }),
  },
  "veri-gorsellestirme-h04": {
    meta: {
      slug: "veri-gorsellestirme-h04",
      title: "Veri türleri (BVA 2107 · 4. Hafta)",
      description: "BVA 2107 4. hafta ders sunumu — Veri türleri (kategorik, sayısal, zaman serisi, coğrafi)",
    },
    Component: dynamic(() => import("./veri-gorsellestirme-h04/Presentation"), {
      ssr: false,
    }),
  },
  "veri-gorsellestirme-h05": {
    meta: {
      slug: "veri-gorsellestirme-h05",
      title: "Görselleştirme projeleri için veri kaynaklarını bulma, erişme, temizleme, hazırlama (BVA 2107 · 5. Hafta)",
      description: "BVA 2107 5. hafta ders sunumu — Görselleştirme projeleri için veri kaynaklarını bulma, erişme, temizleme, hazırlama",
    },
    Component: dynamic(() => import("./veri-gorsellestirme-h05/Presentation"), {
      ssr: false,
    }),
  },
  "veri-gorsellestirme-h06": {
    meta: {
      slug: "veri-gorsellestirme-h06",
      title: "Görsel algı ve biliş (BVA 2107 · 6. Hafta)",
      description: "BVA 2107 6. hafta ders sunumu — Görsel algı ve biliş",
    },
    Component: dynamic(() => import("./veri-gorsellestirme-h06/Presentation"), {
      ssr: false,
    }),
  },
  "veri-gorsellestirme-h07": {
    meta: {
      slug: "veri-gorsellestirme-h07",
      title: "Renk teorisi ve renk seçimi; veri türüne uygun grafik seçimi (BVA 2107 · 7. Hafta)",
      description: "BVA 2107 7. hafta ders sunumu — Renk teorisi ve renk seçimi; veri türüne uygun grafik seçimi",
    },
    Component: dynamic(() => import("./veri-gorsellestirme-h07/Presentation"), {
      ssr: false,
    }),
  },
  "veri-gorsellestirme-h09": {
    meta: {
      slug: "veri-gorsellestirme-h09",
      title: "Çok değişkenli görselleştirme teknikleri (BVA 2107 · 9. Hafta)",
      description: "BVA 2107 9. hafta ders sunumu — Çok değişkenli görselleştirme teknikleri",
    },
    Component: dynamic(() => import("./veri-gorsellestirme-h09/Presentation"), {
      ssr: false,
    }),
  },
  "veri-gorsellestirme-h10": {
    meta: {
      slug: "veri-gorsellestirme-h10",
      title: "Çubuk grafikler, çizgi grafikler, dağılım grafikleri oluşturma (BVA 2107 · 10. Hafta)",
      description: "BVA 2107 10. hafta ders sunumu — Çubuk grafikler, çizgi grafikler, dağılım grafikleri oluşturma",
    },
    Component: dynamic(() => import("./veri-gorsellestirme-h10/Presentation"), {
      ssr: false,
    }),
  },
  "veri-gorsellestirme-h11": {
    meta: {
      slug: "veri-gorsellestirme-h11",
      title: "Pasta ve halka grafikleri tasarlama; ne zaman kullanılmamalı? (BVA 2107 · 11. Hafta)",
      description: "BVA 2107 11. hafta ders sunumu — Pasta ve halka grafikleri tasarlama; ne zaman kullanılmamalı?",
    },
    Component: dynamic(() => import("./veri-gorsellestirme-h11/Presentation"), {
      ssr: false,
    }),
  },
  "veri-gorsellestirme-h12": {
    meta: {
      slug: "veri-gorsellestirme-h12",
      title: "Görselleştirmeleri netlik ve etkililik için özelleştirme (BVA 2107 · 12. Hafta)",
      description: "BVA 2107 12. hafta ders sunumu — Görselleştirmeleri netlik ve etkililik için özelleştirme",
    },
    Component: dynamic(() => import("./veri-gorsellestirme-h12/Presentation"), {
      ssr: false,
    }),
  },
  "kullanici-arayuzu-tasarimi-h02": {
    meta: {
      slug: "kullanici-arayuzu-tasarimi-h02",
      title: "Kullanıcı araştırması (BVA 2245 · 2. Hafta)",
      description: "BVA 2245 2. hafta ders sunumu — Kullanıcı araştırması: anket, görüşme, gözlem",
    },
    Component: dynamic(() => import("./kullanici-arayuzu-tasarimi-h02/Presentation"), {
      ssr: false,
    }),
  },
  "kullanici-arayuzu-tasarimi-h03": {
    meta: {
      slug: "kullanici-arayuzu-tasarimi-h03",
      title: "Persona, user journey ve empathy map oluşturma (BVA 2245 · 3. Hafta)",
      description: "BVA 2245 3. hafta ders sunumu — Persona, user journey ve empathy map oluşturma",
    },
    Component: dynamic(() => import("./kullanici-arayuzu-tasarimi-h03/Presentation"), {
      ssr: false,
    }),
  },
  "kullanici-arayuzu-tasarimi-h04": {
    meta: {
      slug: "kullanici-arayuzu-tasarimi-h04",
      title: "Bilgi mimarisi ve sitemap; kullanıcı akışları (BVA 2245 · 4. Hafta)",
      description: "BVA 2245 4. hafta ders sunumu — Bilgi mimarisi ve sitemap; kullanıcı akışları (user flow)",
    },
    Component: dynamic(() => import("./kullanici-arayuzu-tasarimi-h04/Presentation"), {
      ssr: false,
    }),
  },
  "kullanici-arayuzu-tasarimi-h05": {
    meta: {
      slug: "kullanici-arayuzu-tasarimi-h05",
      title: "Görsel algı ilkeleri (BVA 2245 · 5. Hafta)",
      description: "BVA 2245 5. hafta ders sunumu — Görsel algı ilkeleri (Gestalt) ve bilişsel yük",
    },
    Component: dynamic(() => import("./kullanici-arayuzu-tasarimi-h05/Presentation"), {
      ssr: false,
    }),
  },
  "kullanici-arayuzu-tasarimi-h06": {
    meta: {
      slug: "kullanici-arayuzu-tasarimi-h06",
      title: "Tipografi, hiyerarşi, ızgara sistemleri (BVA 2245 · 6. Hafta)",
      description: "BVA 2245 6. hafta ders sunumu — Tipografi, hiyerarşi, ızgara sistemleri",
    },
    Component: dynamic(() => import("./kullanici-arayuzu-tasarimi-h06/Presentation"), {
      ssr: false,
    }),
  },
  "kullanici-arayuzu-tasarimi-h07": {
    meta: {
      slug: "kullanici-arayuzu-tasarimi-h07",
      title: "Renk teorisi, palet seçimi, kontrast (BVA 2245 · 7. Hafta)",
      description: "BVA 2245 7. hafta ders sunumu — Renk teorisi, palet seçimi, kontrast (WCAG)",
    },
    Component: dynamic(() => import("./kullanici-arayuzu-tasarimi-h07/Presentation"), {
      ssr: false,
    }),
  },
  "kullanici-arayuzu-tasarimi-h09": {
    meta: {
      slug: "kullanici-arayuzu-tasarimi-h09",
      title: "Wireframe ve mockup ile prototipleme — düşük çözünürlük (BVA 2245 · 9. Hafta)",
      description: "BVA 2245 9. hafta ders sunumu — Wireframe ve mockup ile prototipleme — düşük çözünürlük",
    },
    Component: dynamic(() => import("./kullanici-arayuzu-tasarimi-h09/Presentation"), {
      ssr: false,
    }),
  },
  "kullanici-arayuzu-tasarimi-h10": {
    meta: {
      slug: "kullanici-arayuzu-tasarimi-h10",
      title: "Figma ile UI tasarımı — bileşenler, auto-layout, variants (BVA 2245 · 10. Hafta)",
      description: "BVA 2245 10. hafta ders sunumu — Figma ile UI tasarımı — bileşenler, auto-layout, variants",
    },
    Component: dynamic(() => import("./kullanici-arayuzu-tasarimi-h10/Presentation"), {
      ssr: false,
    }),
  },
  "kullanici-arayuzu-tasarimi-h11": {
    meta: {
      slug: "kullanici-arayuzu-tasarimi-h11",
      title: "Figma — interaktif prototip, smart animate, geçişler (BVA 2245 · 11. Hafta)",
      description: "BVA 2245 11. hafta ders sunumu — Figma — interaktif prototip, smart animate, geçişler",
    },
    Component: dynamic(() => import("./kullanici-arayuzu-tasarimi-h11/Presentation"), {
      ssr: false,
    }),
  },
  "kullanici-arayuzu-tasarimi-h12": {
    meta: {
      slug: "kullanici-arayuzu-tasarimi-h12",
      title: "Tasarım sistemleri (BVA 2245 · 12. Hafta)",
      description: "BVA 2245 12. hafta ders sunumu — Tasarım sistemleri (Material, HIG, Tailwind UI); component library",
    },
    Component: dynamic(() => import("./kullanici-arayuzu-tasarimi-h12/Presentation"), {
      ssr: false,
    }),
  },
  "siber-guvenlik-ve-bilisim-hukuku-h03": {
    meta: {
      slug: "siber-guvenlik-ve-bilisim-hukuku-h03",
      title: "Kriptografi 101 (BVA 2205 · 3. Hafta)",
      description: "BVA 2205 3. hafta ders sunumu — Kriptografi 101: simetrik/asimetrik şifreleme, hash, dijital imza, OpenSSL pratik",
    },
    Component: dynamic(() => import("./siber-guvenlik-ve-bilisim-hukuku-h03/Presentation"), {
      ssr: false,
    }),
  },
  "siber-guvenlik-ve-bilisim-hukuku-h04": {
    meta: {
      slug: "siber-guvenlik-ve-bilisim-hukuku-h04",
      title: "OWASP Top 10 — Bölüm 1 (BVA 2205 · 4. Hafta)",
      description: "BVA 2205 4. hafta ders sunumu — OWASP Top 10 — Bölüm 1: SQL Injection, Cross-Site Scripting (XSS), CSRF (DVWA labı)",
    },
    Component: dynamic(() => import("./siber-guvenlik-ve-bilisim-hukuku-h04/Presentation"), {
      ssr: false,
    }),
  },
  "siber-guvenlik-ve-bilisim-hukuku-h05": {
    meta: {
      slug: "siber-guvenlik-ve-bilisim-hukuku-h05",
      title: "OWASP Top 10 — Bölüm 2 (BVA 2205 · 5. Hafta)",
      description: "BVA 2205 5. hafta ders sunumu — OWASP Top 10 — Bölüm 2: Broken Access Control, IDOR, SSRF (Burp Suite ile pratik)",
    },
    Component: dynamic(() => import("./siber-guvenlik-ve-bilisim-hukuku-h05/Presentation"), {
      ssr: false,
    }),
  },
  "siber-guvenlik-ve-bilisim-hukuku-h06": {
    meta: {
      slug: "siber-guvenlik-ve-bilisim-hukuku-h06",
      title: "Kimlik & erişim yönetimi (BVA 2205 · 6. Hafta)",
      description: "BVA 2205 6. hafta ders sunumu — Kimlik & erişim yönetimi: OAuth 2.0, JWT, MFA, parola hashing (bcrypt/argon2)",
    },
    Component: dynamic(() => import("./siber-guvenlik-ve-bilisim-hukuku-h06/Presentation"), {
      ssr: false,
    }),
  },
  "siber-guvenlik-ve-bilisim-hukuku-h07": {
    meta: {
      slug: "siber-guvenlik-ve-bilisim-hukuku-h07",
      title: "Endpoint güvenliği ve malware analizi temelleri (BVA 2205 · 7. Hafta)",
      description: "BVA 2205 7. hafta ders sunumu — Endpoint güvenliği ve malware analizi temelleri (Sysmon, EDR mantığı, basic static analysis)",
    },
    Component: dynamic(() => import("./siber-guvenlik-ve-bilisim-hukuku-h07/Presentation"), {
      ssr: false,
    }),
  },
  "siber-guvenlik-ve-bilisim-hukuku-h09": {
    meta: {
      slug: "siber-guvenlik-ve-bilisim-hukuku-h09",
      title: "Penetrasyon testi metodolojisi (BVA 2205 · 9. Hafta)",
      description: "BVA 2205 9. hafta ders sunumu — Penetrasyon testi metodolojisi (PTES); Kali Linux + Metasploit ile sızma testi labı",
    },
    Component: dynamic(() => import("./siber-guvenlik-ve-bilisim-hukuku-h09/Presentation"), {
      ssr: false,
    }),
  },
  "siber-guvenlik-ve-bilisim-hukuku-h10": {
    meta: {
      slug: "siber-guvenlik-ve-bilisim-hukuku-h10",
      title: "Bulut güvenliği (BVA 2205 · 10. Hafta)",
      description: "BVA 2205 10. hafta ders sunumu — Bulut güvenliği: AWS IAM, S3 yanlış yapılandırma, security groups, GuardDuty",
    },
    Component: dynamic(() => import("./siber-guvenlik-ve-bilisim-hukuku-h10/Presentation"), {
      ssr: false,
    }),
  },
  "siber-guvenlik-ve-bilisim-hukuku-h11": {
    meta: {
      slug: "siber-guvenlik-ve-bilisim-hukuku-h11",
      title: "SOC & SIEM (BVA 2205 · 11. Hafta)",
      description: "BVA 2205 11. hafta ders sunumu — SOC & SIEM: Wazuh kurulumu, log toplama, alarm kuralları, dashboard",
    },
    Component: dynamic(() => import("./siber-guvenlik-ve-bilisim-hukuku-h11/Presentation"), {
      ssr: false,
    }),
  },
  "siber-guvenlik-ve-bilisim-hukuku-h12": {
    meta: {
      slug: "siber-guvenlik-ve-bilisim-hukuku-h12",
      title: "Olay müdahalesi & DFIR (BVA 2205 · 12. Hafta)",
      description: "BVA 2205 12. hafta ders sunumu — Olay müdahalesi & DFIR (Digital Forensics & Incident Response); chain of custody; log analiz",
    },
    Component: dynamic(() => import("./siber-guvenlik-ve-bilisim-hukuku-h12/Presentation"), {
      ssr: false,
    }),
  },
  "siber-guvenlik-ve-bilisim-hukuku-h13": {
    meta: {
      slug: "siber-guvenlik-ve-bilisim-hukuku-h13",
      title: "Tehdit istihbaratı (BVA 2205 · 13. Hafta)",
      description: "BVA 2205 13. hafta ders sunumu — Tehdit istihbaratı: MITRE ATT&CK çerçevesi; IOC'lar; bug bounty ekosistemi (HackerOne, BugCrowd)",
    },
    Component: dynamic(() => import("./siber-guvenlik-ve-bilisim-hukuku-h13/Presentation"), {
      ssr: false,
    }),
  },
  "siber-guvenlik-ve-bilisim-hukuku-h14": {
    meta: {
      slug: "siber-guvenlik-ve-bilisim-hukuku-h14",
      title: "Türk bilişim hukuku özeti (BVA 2205 · 14. Hafta)",
      description: "BVA 2205 14. hafta ders sunumu — Türk bilişim hukuku özeti: 6698 KVKK · 5651 sayılı Kanun · TCK 243-245; sorumlu açıklama",
    },
    Component: dynamic(() => import("./siber-guvenlik-ve-bilisim-hukuku-h14/Presentation"), {
      ssr: false,
    }),
  },
  "siber-guvenlik-ve-bilisim-hukuku-h15": {
    meta: {
      slug: "siber-guvenlik-ve-bilisim-hukuku-h15",
      title: "Final pen-test raporu sunumu (BVA 2205 · 15. Hafta)",
      description: "BVA 2205 15. hafta ders sunumu — Final pen-test raporu sunumu (öğrenci sunumları) + dönem değerlendirmesi",
    },
    Component: dynamic(() => import("./siber-guvenlik-ve-bilisim-hukuku-h15/Presentation"), {
      ssr: false,
    }),
  },
  "sosyal-ag-analizi-h09": {
    meta: {
      slug: "sosyal-ag-analizi-h09",
      title: "Çok seviyeli ağ analizi (BVA 2105 · 9. Hafta)",
      description: "BVA 2105 9. hafta ders sunumu — Çok seviyeli ağ analizi",
    },
    Component: dynamic(() => import("./sosyal-ag-analizi-h09/Presentation"), {
      ssr: false,
    }),
  },
  "sosyal-ag-analizi-h11": {
    meta: {
      slug: "sosyal-ag-analizi-h11",
      title: "Ağlarda etki ve yayılım (BVA 2105 · 11. Hafta)",
      description: "BVA 2105 11. hafta ders sunumu — Ağlarda etki ve yayılım (information cascades, SIR/SIS)",
    },
    Component: dynamic(() => import("./sosyal-ag-analizi-h11/Presentation"), {
      ssr: false,
    }),
  },
  "sosyal-ag-analizi-h12": {
    meta: {
      slug: "sosyal-ag-analizi-h12",
      title: "Ağın dayanıklılığı ve esnekliği (BVA 2105 · 12. Hafta)",
      description: "BVA 2105 12. hafta ders sunumu — Ağın dayanıklılığı ve esnekliği (network resilience)",
    },
    Component: dynamic(() => import("./sosyal-ag-analizi-h12/Presentation"), {
      ssr: false,
    }),
  },
  "sosyal-ag-analizi-h13": {
    meta: {
      slug: "sosyal-ag-analizi-h13",
      title: "Ağ örnekleme teknikleri (BVA 2105 · 13. Hafta)",
      description: "BVA 2105 13. hafta ders sunumu — Ağ örnekleme teknikleri",
    },
    Component: dynamic(() => import("./sosyal-ag-analizi-h13/Presentation"), {
      ssr: false,
    }),
  },
  "veri-gorsellestirme-h13": {
    meta: {
      slug: "veri-gorsellestirme-h13",
      title: "Isı haritaları ve ağaç haritaları (BVA 2107 · 13. Hafta)",
      description: "BVA 2107 13. hafta ders sunumu — Isı haritaları ve ağaç haritaları (heatmap, treemap) oluşturma",
    },
    Component: dynamic(() => import("./veri-gorsellestirme-h13/Presentation"), {
      ssr: false,
    }),
  },
  "veri-gorsellestirme-h14": {
    meta: {
      slug: "veri-gorsellestirme-h14",
      title: "Etkileşimli görselleştirmelere ve araçlara giriş (BVA 2107 · 14. Hafta)",
      description: "BVA 2107 14. hafta ders sunumu — Etkileşimli görselleştirmelere ve araçlara giriş (Plotly, D3)",
    },
    Component: dynamic(() => import("./veri-gorsellestirme-h14/Presentation"), {
      ssr: false,
    }),
  },
  "veri-gorsellestirme-h15": {
    meta: {
      slug: "veri-gorsellestirme-h15",
      title: "Gösterge paneli (BVA 2107 · 15. Hafta)",
      description: "BVA 2107 15. hafta ders sunumu — Gösterge paneli (dashboard) tasarım ilkeleri",
    },
    Component: dynamic(() => import("./veri-gorsellestirme-h15/Presentation"), {
      ssr: false,
    }),
  },
  "is-sagligi-ve-guvenligi-h02": {
    meta: {
      slug: "is-sagligi-ve-guvenligi-h02",
      title: "İlk yardım eğitimi — II (BVA 1109 · 2. Hafta)",
      description: "BVA 1109 2. hafta ders sunumu — İlk yardım eğitimi — II",
    },
    Component: dynamic(() => import("./is-sagligi-ve-guvenligi-h02/Presentation"), {
      ssr: false,
    }),
  },
  "is-sagligi-ve-guvenligi-h03": {
    meta: {
      slug: "is-sagligi-ve-guvenligi-h03",
      title: "İlk yardım malzemeleri — I (BVA 1109 · 3. Hafta)",
      description: "BVA 1109 3. hafta ders sunumu — İlk yardım malzemeleri — I",
    },
    Component: dynamic(() => import("./is-sagligi-ve-guvenligi-h03/Presentation"), {
      ssr: false,
    }),
  },
  "is-sagligi-ve-guvenligi-h04": {
    meta: {
      slug: "is-sagligi-ve-guvenligi-h04",
      title: "İlk yardım malzemeleri — II (BVA 1109 · 4. Hafta)",
      description: "BVA 1109 4. hafta ders sunumu — İlk yardım malzemeleri — II",
    },
    Component: dynamic(() => import("./is-sagligi-ve-guvenligi-h04/Presentation"), {
      ssr: false,
    }),
  },
  "is-sagligi-ve-guvenligi-h05": {
    meta: {
      slug: "is-sagligi-ve-guvenligi-h05",
      title: "Kişisel emniyet sağlama — I (BVA 1109 · 5. Hafta)",
      description: "BVA 1109 5. hafta ders sunumu — Kişisel emniyet sağlama — I",
    },
    Component: dynamic(() => import("./is-sagligi-ve-guvenligi-h05/Presentation"), {
      ssr: false,
    }),
  },
  "is-sagligi-ve-guvenligi-h06": {
    meta: {
      slug: "is-sagligi-ve-guvenligi-h06",
      title: "Kişisel emniyet sağlama — II (BVA 1109 · 6. Hafta)",
      description: "BVA 1109 6. hafta ders sunumu — Kişisel emniyet sağlama — II",
    },
    Component: dynamic(() => import("./is-sagligi-ve-guvenligi-h06/Presentation"), {
      ssr: false,
    }),
  },
  "is-sagligi-ve-guvenligi-h07": {
    meta: {
      slug: "is-sagligi-ve-guvenligi-h07",
      title: "Kişisel emniyet sağlama — III (BVA 1109 · 7. Hafta)",
      description: "BVA 1109 7. hafta ders sunumu — Kişisel emniyet sağlama — III",
    },
    Component: dynamic(() => import("./is-sagligi-ve-guvenligi-h07/Presentation"), {
      ssr: false,
    }),
  },
  "kullanici-arayuzu-tasarimi-h13": {
    meta: {
      slug: "kullanici-arayuzu-tasarimi-h13",
      title: "Erişilebilirlik (BVA 2245 · 13. Hafta)",
      description: "BVA 2245 13. hafta ders sunumu — Erişilebilirlik (WCAG 2.2): alt text, kontrast, klavye navigasyonu",
    },
    Component: dynamic(() => import("./kullanici-arayuzu-tasarimi-h13/Presentation"), {
      ssr: false,
    }),
  },
  "kullanici-arayuzu-tasarimi-h14": {
    meta: {
      slug: "kullanici-arayuzu-tasarimi-h14",
      title: "Kullanılabilirlik testi (BVA 2245 · 14. Hafta)",
      description: "BVA 2245 14. hafta ders sunumu — Kullanılabilirlik testi (usability testing) ve heuristic değerlendirme",
    },
    Component: dynamic(() => import("./kullanici-arayuzu-tasarimi-h14/Presentation"), {
      ssr: false,
    }),
  },
  "kullanici-arayuzu-tasarimi-h15": {
    meta: {
      slug: "kullanici-arayuzu-tasarimi-h15",
      title: "Final proje sunumu ve kritik (BVA 2245 · 15. Hafta)",
      description: "BVA 2245 15. hafta ders sunumu — Final proje sunumu ve kritik",
    },
    Component: dynamic(() => import("./kullanici-arayuzu-tasarimi-h15/Presentation"), {
      ssr: false,
    }),
  },
  "programlama-temelleri-h02": {
    meta: {
      slug: "programlama-temelleri-h02",
      title: "Algoritmalar, algoritma türleri, algoritma oluşturma (BVA 1101 · 2. Hafta)",
      description: "BVA 1101 2. hafta ders sunumu — Algoritmalar, algoritma türleri, algoritma oluşturma",
    },
    Component: dynamic(() => import("./programlama-temelleri-h02/Presentation"), {
      ssr: false,
    }),
  },
  "programlama-temelleri-h03": {
    meta: {
      slug: "programlama-temelleri-h03",
      title: "Akış diyagramları, kullanılan semboller, akış diyagramı oluşturma (BVA 1101 · 3. Hafta)",
      description: "BVA 1101 3. hafta ders sunumu — Akış diyagramları, kullanılan semboller, akış diyagramı oluşturma",
    },
    Component: dynamic(() => import("./programlama-temelleri-h03/Presentation"), {
      ssr: false,
    }),
  },
  "programlama-temelleri-h04": {
    meta: {
      slug: "programlama-temelleri-h04",
      title: "Veri türleri, operatör çeşitleri, giriş-çıkış işlemleri (BVA 1101 · 4. Hafta)",
      description: "BVA 1101 4. hafta ders sunumu — Veri türleri, operatör çeşitleri, giriş-çıkış işlemleri",
    },
    Component: dynamic(() => import("./programlama-temelleri-h04/Presentation"), {
      ssr: false,
    }),
  },
  "programlama-temelleri-h05": {
    meta: {
      slug: "programlama-temelleri-h05",
      title: "Karar ve kontrol yapıları (BVA 1101 · 5. Hafta)",
      description: "BVA 1101 5. hafta ders sunumu — Karar ve kontrol yapıları",
    },
    Component: dynamic(() => import("./programlama-temelleri-h05/Presentation"), {
      ssr: false,
    }),
  },
  "programlama-temelleri-h06": {
    meta: {
      slug: "programlama-temelleri-h06",
      title: "Döngü yapıları (BVA 1101 · 6. Hafta)",
      description: "BVA 1101 6. hafta ders sunumu — Döngü yapıları",
    },
    Component: dynamic(() => import("./programlama-temelleri-h06/Presentation"), {
      ssr: false,
    }),
  },
  "programlama-temelleri-h07": {
    meta: {
      slug: "programlama-temelleri-h07",
      title: "Karar ve döngü yapıları kullanarak problem çözme (BVA 1101 · 7. Hafta)",
      description: "BVA 1101 7. hafta ders sunumu — Karar ve döngü yapıları kullanarak problem çözme",
    },
    Component: dynamic(() => import("./programlama-temelleri-h07/Presentation"), {
      ssr: false,
    }),
  },
  "programlama-temelleri-h09": {
    meta: {
      slug: "programlama-temelleri-h09",
      title: "Dizi tanımı ve tek boyutlu dizi tanımlamaları (BVA 1101 · 9. Hafta)",
      description: "BVA 1101 9. hafta ders sunumu — Dizi tanımı ve tek boyutlu dizi tanımlamaları",
    },
    Component: dynamic(() => import("./programlama-temelleri-h09/Presentation"), {
      ssr: false,
    }),
  },
  "programlama-temelleri-h10": {
    meta: {
      slug: "programlama-temelleri-h10",
      title: "Çok boyutlu diziler ve matris kullanımı (BVA 1101 · 10. Hafta)",
      description: "BVA 1101 10. hafta ders sunumu — Çok boyutlu diziler ve matris kullanımı",
    },
    Component: dynamic(() => import("./programlama-temelleri-h10/Presentation"), {
      ssr: false,
    }),
  },
  "programlama-temelleri-h11": {
    meta: {
      slug: "programlama-temelleri-h11",
      title: "Dizi kullanarak problem çözme (BVA 1101 · 11. Hafta)",
      description: "BVA 1101 11. hafta ders sunumu — Dizi kullanarak problem çözme",
    },
    Component: dynamic(() => import("./programlama-temelleri-h11/Presentation"), {
      ssr: false,
    }),
  },
  "programlama-temelleri-h12": {
    meta: {
      slug: "programlama-temelleri-h12",
      title: "Metin (BVA 1101 · 12. Hafta)",
      description: "BVA 1101 12. hafta ders sunumu — Metin (string), karakter katarı işlemleri",
    },
    Component: dynamic(() => import("./programlama-temelleri-h12/Presentation"), {
      ssr: false,
    }),
  },
  "programlama-temelleri-h13": {
    meta: {
      slug: "programlama-temelleri-h13",
      title: "Fonksiyon tanımı, çağrımı ve alt program kullanımı (BVA 1101 · 13. Hafta)",
      description: "BVA 1101 13. hafta ders sunumu — Fonksiyon tanımı, çağrımı ve alt program kullanımı",
    },
    Component: dynamic(() => import("./programlama-temelleri-h13/Presentation"), {
      ssr: false,
    }),
  },
  "programlama-temelleri-h14": {
    meta: {
      slug: "programlama-temelleri-h14",
      title: "Sıralama ve arama algoritmaları, rekürsif fonksiyon kullanımı (BVA 1101 · 14. Hafta)",
      description: "BVA 1101 14. hafta ders sunumu — Sıralama ve arama algoritmaları, rekürsif fonksiyon kullanımı",
    },
    Component: dynamic(() => import("./programlama-temelleri-h14/Presentation"), {
      ssr: false,
    }),
  },
  "programlama-temelleri-h15": {
    meta: {
      slug: "programlama-temelleri-h15",
      title: "Dosyalama işlemleri (BVA 1101 · 15. Hafta)",
      description: "BVA 1101 15. hafta ders sunumu — Dosyalama işlemleri",
    },
    Component: dynamic(() => import("./programlama-temelleri-h15/Presentation"), {
      ssr: false,
    }),
  },
  "is-sagligi-ve-guvenligi-h09": {
    meta: {
      slug: "is-sagligi-ve-guvenligi-h09",
      title: "Çalışanların emniyetini sağlama (BVA 1109 · 9. Hafta)",
      description: "BVA 1109 9. hafta — Çalışanların emniyetini sağlama",
    },
    Component: dynamic(() => import("./is-sagligi-ve-guvenligi-h09/Presentation"), {
      ssr: false,
    }),
  },
  "is-sagligi-ve-guvenligi-h10": {
    meta: {
      slug: "is-sagligi-ve-guvenligi-h10",
      title: "İş ortamı güvenliğini sağlama — I (BVA 1109 · 10. Hafta)",
      description: "BVA 1109 10. hafta — İş ortamı güvenliğini sağlama — I",
    },
    Component: dynamic(() => import("./is-sagligi-ve-guvenligi-h10/Presentation"), {
      ssr: false,
    }),
  },
  "is-sagligi-ve-guvenligi-h11": {
    meta: {
      slug: "is-sagligi-ve-guvenligi-h11",
      title: "İş ortamı güvenliğini sağlama — II (BVA 1109 · 11. Hafta)",
      description: "BVA 1109 11. hafta — İş ortamı güvenliğini sağlama — II",
    },
    Component: dynamic(() => import("./is-sagligi-ve-guvenligi-h11/Presentation"), {
      ssr: false,
    }),
  },
  "is-sagligi-ve-guvenligi-h12": {
    meta: {
      slug: "is-sagligi-ve-guvenligi-h12",
      title: "İş güvenliği mevzuatı — I (BVA 1109 · 12. Hafta)",
      description: "BVA 1109 12. hafta — İş güvenliği mevzuatı — I",
    },
    Component: dynamic(() => import("./is-sagligi-ve-guvenligi-h12/Presentation"), {
      ssr: false,
    }),
  },
  "is-sagligi-ve-guvenligi-h13": {
    meta: {
      slug: "is-sagligi-ve-guvenligi-h13",
      title: "İş güvenliği mevzuatı — II (BVA 1109 · 13. Hafta)",
      description: "BVA 1109 13. hafta — İş güvenliği mevzuatı — II",
    },
    Component: dynamic(() => import("./is-sagligi-ve-guvenligi-h13/Presentation"), {
      ssr: false,
    }),
  },
  "is-sagligi-ve-guvenligi-h14": {
    meta: {
      slug: "is-sagligi-ve-guvenligi-h14",
      title: "İş güvenliği mevzuatı — III (BVA 1109 · 14. Hafta)",
      description: "BVA 1109 14. hafta — İş güvenliği mevzuatı — III",
    },
    Component: dynamic(() => import("./is-sagligi-ve-guvenligi-h14/Presentation"), {
      ssr: false,
    }),
  },
  "is-sagligi-ve-guvenligi-h15": {
    meta: {
      slug: "is-sagligi-ve-guvenligi-h15",
      title: "Genel tekrar (BVA 1109 · 15. Hafta)",
      description: "BVA 1109 15. hafta — Genel tekrar",
    },
    Component: dynamic(() => import("./is-sagligi-ve-guvenligi-h15/Presentation"), {
      ssr: false,
    }),
  },
  "uretken-yapay-zekalar-h02": {
    meta: {
      slug: "uretken-yapay-zekalar-h02",
      title: "Olasılıksal modeller ve temeller (BVA 1203 · 2. Hafta)",
      description: "BVA 1203 2. hafta — Olasılıksal modeller ve temeller (Bayes teoremi, Markov zincirleri)",
    },
    Component: dynamic(() => import("./uretken-yapay-zekalar-h02/Presentation"), {
      ssr: false,
    }),
  },
  "uretken-yapay-zekalar-h03": {
    meta: {
      slug: "uretken-yapay-zekalar-h03",
      title: "Otomatik kodlayıcılar (BVA 1203 · 3. Hafta)",
      description: "BVA 1203 3. hafta — Otomatik kodlayıcılar (Autoencoders) ve varyasyonel otomatik kodlayıcılar (VAE)",
    },
    Component: dynamic(() => import("./uretken-yapay-zekalar-h03/Presentation"), {
      ssr: false,
    }),
  },
  "uretken-yapay-zekalar-h04": {
    meta: {
      slug: "uretken-yapay-zekalar-h04",
      title: "Üretken çekişmeli ağlar (BVA 1203 · 4. Hafta)",
      description: "BVA 1203 4. hafta — Üretken çekişmeli ağlar (GANs): temel yapı ve eğitim süreci",
    },
    Component: dynamic(() => import("./uretken-yapay-zekalar-h04/Presentation"), {
      ssr: false,
    }),
  },
  "uretken-yapay-zekalar-h05": {
    meta: {
      slug: "uretken-yapay-zekalar-h05",
      title: "GAN türleri (BVA 1203 · 5. Hafta)",
      description: "BVA 1203 5. hafta — GAN türleri",
    },
    Component: dynamic(() => import("./uretken-yapay-zekalar-h05/Presentation"), {
      ssr: false,
    }),
  },
  "uretken-yapay-zekalar-h06": {
    meta: {
      slug: "uretken-yapay-zekalar-h06",
      title: "Uygulamalı GAN eğitimi (BVA 1203 · 6. Hafta)",
      description: "BVA 1203 6. hafta — Uygulamalı GAN eğitimi: görüntü üretimi",
    },
    Component: dynamic(() => import("./uretken-yapay-zekalar-h06/Presentation"), {
      ssr: false,
    }),
  },
  "uretken-yapay-zekalar-h07": {
    meta: {
      slug: "uretken-yapay-zekalar-h07",
      title: "Dönüştürücüler (BVA 1203 · 7. Hafta)",
      description: "BVA 1203 7. hafta — Dönüştürücüler (Transformers) ve kendine dikkat (Self-Attention) mekanizması",
    },
    Component: dynamic(() => import("./uretken-yapay-zekalar-h07/Presentation"), {
      ssr: false,
    }),
  },
  "uretken-yapay-zekalar-h09": {
    meta: {
      slug: "uretken-yapay-zekalar-h09",
      title: "Büyük dil modelleri (BVA 1203 · 9. Hafta)",
      description: "BVA 1203 9. hafta — Büyük dil modelleri (LLM): GPT, BERT, T5",
    },
    Component: dynamic(() => import("./uretken-yapay-zekalar-h09/Presentation"), {
      ssr: false,
    }),
  },
  "uretken-yapay-zekalar-h10": {
    meta: {
      slug: "uretken-yapay-zekalar-h10",
      title: "Metin üretimi ve doğal dil işleme uygulamaları (BVA 1203 · 10. Hafta)",
      description: "BVA 1203 10. hafta — Metin üretimi ve doğal dil işleme uygulamaları",
    },
    Component: dynamic(() => import("./uretken-yapay-zekalar-h10/Presentation"), {
      ssr: false,
    }),
  },
  "uretken-yapay-zekalar-h11": {
    meta: {
      slug: "uretken-yapay-zekalar-h11",
      title: "Görüntüden metne ve metinden görüntüye (BVA 1203 · 11. Hafta)",
      description: "BVA 1203 11. hafta — Görüntüden metne ve metinden görüntüye: multimodal modeller (DALL·E, CLIP)",
    },
    Component: dynamic(() => import("./uretken-yapay-zekalar-h11/Presentation"), {
      ssr: false,
    }),
  },
  "uretken-yapay-zekalar-h12": {
    meta: {
      slug: "uretken-yapay-zekalar-h12",
      title: "Etik, güvenlik ve yanıltıcı içerikler (BVA 1203 · 12. Hafta)",
      description: "BVA 1203 12. hafta — Etik, güvenlik ve yanıltıcı içerikler",
    },
    Component: dynamic(() => import("./uretken-yapay-zekalar-h12/Presentation"), {
      ssr: false,
    }),
  },
  "uretken-yapay-zekalar-h13": {
    meta: {
      slug: "uretken-yapay-zekalar-h13",
      title: "Yapay zekâda bilgi gösterimi (BVA 1203 · 13. Hafta)",
      description: "BVA 1203 13. hafta — Yapay zekâda bilgi gösterimi",
    },
    Component: dynamic(() => import("./uretken-yapay-zekalar-h13/Presentation"), {
      ssr: false,
    }),
  },
  "uretken-yapay-zekalar-h14": {
    meta: {
      slug: "uretken-yapay-zekalar-h14",
      title: "Yapay zekâ dilleri ve bilgi tabanı oluşturma (BVA 1203 · 14. Hafta)",
      description: "BVA 1203 14. hafta — Yapay zekâ dilleri ve bilgi tabanı oluşturma",
    },
    Component: dynamic(() => import("./uretken-yapay-zekalar-h14/Presentation"), {
      ssr: false,
    }),
  },
  "uretken-yapay-zekalar-h15": {
    meta: {
      slug: "uretken-yapay-zekalar-h15",
      title: "Üretken yapay zekâların Ar-Ge ve endüstriyel uygulamaları (BVA 1203 · 15. Hafta)",
      description: "BVA 1203 15. hafta — Üretken yapay zekâların Ar-Ge ve endüstriyel uygulamaları",
    },
    Component: dynamic(() => import("./uretken-yapay-zekalar-h15/Presentation"), {
      ssr: false,
    }),
  },
};

export const presentationList: PresentationMeta[] = Object.values(
  presentations
).map((p) => p.meta);

export function getPresentation(slug: string | null | undefined): Entry | null {
  if (!slug) return null;
  return presentations[slug] ?? null;
}
