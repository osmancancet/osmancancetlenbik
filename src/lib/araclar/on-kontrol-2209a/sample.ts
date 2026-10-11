import type { DraftState } from "./engine/types";

// İlk açılışta gösterilen örnek başvuru. İçinde bilerek bırakılmış hatalar var: 12/18; 2 düzelt, 4 gözden geçir, 1 ipucu.
export const SAMPLE_DRAFT: DraftState = {
  "text": {
    "ozet": "Bu proje, üniversite öğrencilerinin ders çalışma alışkanlıklarını akıllı telefon kullanım verileriyle ilişkilendirmeyi amaçlamaktadır. Gönüllü 120 öğrenciden dört hafta boyunca anonim ekran süresi verisi ve haftalık öz bildirim anketleri toplanacaktır. Veriler karma etkiler modeliyle analiz edilecek ve sonuçlar açık erişimli bir veri setiyle paylaşılacaktır. Projenin çıktısı, öğrencilerin dikkat dağınıklığını azaltmaya yönelik kanıta dayalı öneriler olacaktır.",
    "bilimsel": "Akıllı telefon kullanımı ile akademik başarı arasındaki ilişki birçok çalışmada incelenmiştir (Yılmaz, 2022; Demir vd., 2023). Ancak bu çalışmaların büyük kısmı tek seferlik öz bildirim anketlerine dayanmakta ve gerçek kullanım verisini ölçmemektedir. Kaya ve Arslan (2024) nesnel ekran süresi verisinin öz bildirimden anlamlı biçimde farklılaştığını göstermiştir. Bu proje, nesnel kullanım verisini haftalık tekrarlı ölçümle birleştirerek literatürdeki bu boşluğu doldurmayı hedeflemektedir. Araştırma sorusu şudur: Haftalık ekran süresindeki artış, aynı haftadaki ders çalışma süresini azaltmakta mıdır?",
    "amac": "Projenin amacı, ekran süresi ile haftalık ders çalışma süresi arasındaki ilişkiyi nesnel veriyle ortaya koymaktır. Hedef 1: Dört hafta boyunca en az 120 öğrenciden eksiksiz veri toplamak. Hedef 2: Ekran süresindeki her bir saatlik artışın haftalık çalışma süresine etkisini %95 güven aralığıyla tahmin etmek. Hedef 3: Anonim veri setini proje bitiminden önce açık erişimli bir depoda yayımlamak. Hedef 4: Sonuçları en az bir ulusal kongrede bildiri olarak sunmak.",
    "yontem": "Araştırma, tekrarlı ölçümlü gözlemsel bir tasarımla yürütülecektir. Katılımcılar, etik kurul onayı alındıktan sonra bilgilendirilmiş onamla gönüllülük esasına göre seçilecektir. Bağımsız değişken haftalık ekran süresi, bağımlı değişken haftalık ders çalışma süresidir. Ekran süresi verisi telefonların yerleşik dijital denge raporlarından haftalık olarak toplanacaktır. Haftalık çalışma süresi, geçerlik ve güvenirlik çalışması yapılmış bir öz bildirim formuyla ölçülecektir. Elde edilen veriler uygun istatistik yöntemleri ile analiz edilecektir.",
    "risk": "Katılımcı kaybı riski için başlangıçta hedeflenenden yüzde yirmi fazla katılımcı alınacaktır (B planı). Veri gönderiminin aksaması durumunda haftalık hatırlatma mesajları kullanılacak, gerekirse veri toplama bir hafta uzatılacaktır.",
    "olanak": "Analizler için bölümün bilgisayar laboratuvarı ve açık kaynak R yazılımı kullanılacaktır. Ek bir ekipman gerekmemektedir.",
    "etki": "Sonuçlar en az bir ulusal kongrede sunulacak, anonim veri seti açık erişimli bir depoda paylaşılacak ve üniversitenin rehberlik birimiyle öğrencilere yönelik bir bilgilendirme semineri düzenlenecektir.",
    "kaynak": "Demir, A., Çelik, B. ve Şahin, C. (2023). Smartphone use and academic performance. Computers & Education, 190, 104610. https://doi.org/10.1016/j.compedu.2023.104610\nKaya, D. ve Arslan, E. (2024). Objective versus self-reported screen time. Journal of Behavioral Research, 12(3), 45-60. https://doi.org/10.1234/jbr.2024.045\nÖztürk, H. (2021). Dijital çağda öğrenme. Ankara: Örnek Yayınevi.\nYılmaz, F. (2022). Üniversite öğrencilerinde dijital dikkat dağınıklığı. Eğitim ve Bilim, 47(210), 1-20. https://doi.org/10.15390/EB.2022.11111"
  },
  "wp": [
    {
      "name": "Literatür taraması ve etik kurul başvurusu",
      "start": 1,
      "end": 2,
      "crit": "Etik kurul onayının alınması",
      "pct": 20
    },
    {
      "name": "Veri toplama",
      "start": 3,
      "end": 5,
      "crit": "En az 120 katılımcıdan dört haftalık eksiksiz veri",
      "pct": 40
    },
    {
      "name": "Veri analizi ve modelleme",
      "start": 6,
      "end": 9,
      "crit": "Başarıyla tamamlanması",
      "pct": 30
    }
  ]
};
