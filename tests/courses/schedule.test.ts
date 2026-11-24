import { describe, expect, it } from "vitest";
import { parseSchedule, semesterRank, todayIstanbul } from "@/lib/courseSchedule";

describe("ders programı ayrıştırma", () => {
  it("gün, saat ve dersliği ayırır", () => {
    expect(parseSchedule("Çarşamba · 09:55–12:30 · Derslik 7")).toEqual({
      day: 3,
      dayName: "Çarşamba",
      start: "09:55",
      end: "12:30",
      startMin: 595,
      endMin: 750,
      room: "Derslik 7",
    });
  });

  it("dersliksiz, kısa çizgili ve küçük harfli yazımı kabul eder", () => {
    const p = parseSchedule("perşembe · 9:55-12:30");
    expect(p).toMatchObject({ day: 4, start: "09:55", end: "12:30", room: null });
  });

  it("anlaşılmayan metinde null döner", () => {
    expect(parseSchedule(null)).toBeNull();
    expect(parseSchedule("Haftaya bakın")).toBeNull();
    expect(parseSchedule("Funday · 09:00–10:00")).toBeNull();
    expect(parseSchedule("Cuma · 12:00–11:00")).toBeNull();
  });
});

describe("dönem sırası", () => {
  it("güz < bahar < sonraki güz", () => {
    const a = semesterRank("2025-2026 Bahar");
    const b = semesterRank("2026-2027 Güz");
    const c = semesterRank("2026-2027 Bahar");
    expect(a).toBeLessThan(b);
    expect(b).toBeLessThan(c);
    expect(semesterRank(null)).toBe(-1);
  });
});

describe("bugün (İstanbul)", () => {
  it("UTC gece yarısından önce İstanbul'da ertesi gündür", () => {
    // 2026-11-24 Salı 22:30 UTC = 25 Kasım Çarşamba 01:30 İstanbul
    expect(todayIstanbul(new Date(Date.UTC(2026, 10, 24, 22, 30)))).toBe(3);
  });
});
