import { describe, expect, it } from "vitest";
import { formatReport, reportFileName, scoreBand } from "@/lib/araclar/on-kontrol-2209a/engine/report";
import { R, run, sample } from "./helpers";

describe("rapor", () => {
  it("örnek başvurunun düz metin raporu", () => {
    expect(formatReport(run(sample()), R)).toMatchInlineSnapshot(`
      "2209-A Ön Kontrol: 12/18 kural tamam

      Düzelt:
      - 3.1 Çalışma takvimi: Katkı değerlerinin toplamı 90; 100 olmalı.
      - 3.1 Çalışma takvimi: İA1 “Literatür taraması ve etik kurul başvurusu”: literatür taraması ayrı iş adımı olarak gösterilmez.

      Gözden geçir:
      - 3.1 Çalışma takvimi: İA3 başarı ölçütü ölçülebilir değil: “Başarıyla tamamlanması”.
      - Kaynakça: Metinde atıf yapılmamış görünen kaynaklar: 3. satır.
      - Kaynakça: 4 kaynaktan 1 tanesinde DOI yok: 3. satır.
      - 2. Yöntem: 2. Yöntem: “uygun istatistik yöntemleri ile”.

      İpucu:
      - 3.1 Çalışma takvimi: İA1 başarı ölçütünde sayısal bir eşik yok: “Etik kurul onayının alınması”."
    `);
  });
  it("puan aralıkları", () => {
    expect([0, 6, 7, 12, 13, 17, 18].map(scoreBand)).toEqual(["0-6", "0-6", "7-12", "7-12", "13-17", "13-17", "18"]);
  });
  it("Türkçe karakterli dosya adı", () => {
    expect(reportFileName(new Date(2026, 9, 14))).toBe("2209-A Ön Kontrol Raporu 2026-10-14.txt");
  });
});
