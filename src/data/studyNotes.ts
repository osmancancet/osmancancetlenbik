/**
 * Çalışma Notları — ders başına indirilebilir PDF çalışma kağıtları.
 * Dosyalar public/dosyalar/calisma-notlari/<slug>.pdf altında durur.
 */
export type StudyNote = {
  slug: string;
  code: string;
  course: string;
  scope: string;
  summary: string;
  questions: number;
};

export const STUDY_NOTES_DIR = "/dosyalar/calisma-notlari";

export const studyNotes: StudyNote[] = [
  {
    slug: "programlama-temelleri",
    code: "BVA 1101",
    course: "Programlama Temelleri",
    scope: "1–7. hafta",
    summary:
      "Algoritmalar, akış diyagramları, Python veri türleri ve operatörler, karar ve döngü yapılarıyla problem çözme.",
    questions: 200,
  },
  {
    slug: "uretken-yapay-zekalar",
    code: "BVA 1203",
    course: "Üretken Yapay Zekâlar",
    scope: "8 tematik bölüm",
    summary:
      "Halüsinasyon, etkili kullanım, deepfake ve doğrulama, telif, KVKK, AB Yapay Zekâ Yasası, akademik dürüstlük, önyargı ve çevresel etki.",
    questions: 200,
  },
  {
    slug: "buyuk-veri-icin-bulut-bilisim",
    code: "BVA 2103",
    course: "Büyük Veri için Bulut Bilişim",
    scope: "1–7. hafta",
    summary:
      "Bulut ve büyük veri kavramları, IaaS · PaaS · SaaS, dağıtım modelleri, AWS · Azure · GCP, bulut depolama ve dağıtılmış hesaplama.",
    questions: 200,
  },
  {
    slug: "sosyal-ag-analizi",
    code: "BVA 2105",
    course: "Sosyal Ağ Analizi",
    scope: "1–7. hafta",
    summary:
      "Merkezilik ölçüleri, ağ görselleştirme, veri toplama, ERGM, topluluk tespiti, aktör odaklı modeller ve boylamsal ağ analizi.",
    questions: 200,
  },
  {
    slug: "veri-gorsellestirme",
    code: "BVA 2107",
    course: "Veri Görselleştirme",
    scope: "1–7. hafta",
    summary:
      "Araçlar ve yazılımlar, veri türleri, veri bulma ve temizleme, görsel algı ve biliş, renk teorisi ve doğru grafik seçimi.",
    questions: 200,
  },
  {
    slug: "siber-guvenlik-ve-bilisim-hukuku",
    code: "BVA 2205",
    course: "Siber Güvenlik ve Bilişim Hukuku",
    scope: "1–7. hafta",
    summary:
      "CIA üçlüsü, Wireshark ve Nmap ile ağ analizi, kriptografi, OWASP Top 10, kimlik ve erişim yönetimi, uç nokta güvenliği ve zararlı yazılım.",
    questions: 200,
  },
];
