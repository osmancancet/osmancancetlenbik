import type { ProgramRules } from "../engine/types";

// Kaynak: 2209-A Başvuru İçeriği Bilgi Notu (2026) ve 2026 Çağrı Duyurusu. README §5.
export const rules2209a2026: ProgramRules = {
  program: "2209a",
  version: "2026",
  verifiedOn: "2026-10-12",
  deadline: "2026-11-11T17:30:00+03:00",
  callOpened: "2026-10-07T00:00:00+03:00",
  sources: [
    { name: "2209-A Başvuru İçeriği Bilgi Notu", url: "https://tubitak.gov.tr/sites/default/files/2026-10/2209-A_Basvuru_Icerigi_Bilgi_Notu.pdf" },
    { name: "2026 çağrı duyurusu", url: "https://tubitak.gov.tr/sites/default/files/2026-10/2209-A_2026_Yili_Cagri_Duyurusu.pdf" },
    { name: "TÜBİTAK ÜYZ rehberi", url: "https://tubitak.gov.tr/sites/default/files/2025-09/UYZ_Rehberi-v02.pdf" },
  ],
  sections: {
    ozet: "Özet",
    bilimsel: "1.1 Bilimsel nitelik",
    amac: "1.2 Amaç ve hedefler",
    yontem: "2. Yöntem",
    takvim: "3.1 Çalışma takvimi",
    risk: "3.2 Risk yönetimi",
    olanak: "3.3 Araştırma olanakları",
    etki: "4. Yaygın etki",
    kaynak: "Kaynakça",
  },
  limits: {
    ozet: { unit: "kelime", min: 25, max: 450 },
    bilimsel: { unit: "karakter", min: 350 },
    amac: { unit: "karakter", min: 350 },
    yontem: { unit: "karakter", min: 350 },
  },
  maxMonths: 12,
  contributionTotal: 100,
  nearLimitMargin: 35,
};
