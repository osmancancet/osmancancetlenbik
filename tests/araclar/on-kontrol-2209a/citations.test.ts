import { describe, expect, it } from "vitest";
import { citations, hasDoi, refLines, refMatches } from "@/lib/araclar/on-kontrol-2209a/engine/citations";

describe("atıf ayrıştırma", () => {
  it("parantez içi soyadı–yıl, noktalı virgülle", () => {
    expect(citations("(Yılmaz, 2022; Demir vd., 2023)").ay).toEqual([{ s: "Yılmaz", y: "2022" }, { s: "Demir", y: "2023" }]);
  });
  it("iki yazarlı ve et al.", () => {
    expect(citations("(Kaya ve Arslan, 2024; Smith et al., 2019)").ay).toEqual([{ s: "Kaya", y: "2024" }, { s: "Smith", y: "2019" }]);
  });
  it("anlatı biçimi", () => {
    expect(citations("Öztürk (2021) gösterdi. Çelik vd. (2020b) de.").ay).toEqual([{ s: "Öztürk", y: "2021" }, { s: "Çelik", y: "2020" }]);
  });
  it("sayısal, liste ve aralık", () => {
    expect(citations("[1] ve [2, 4] ile [6–8] ve [9-10]").numeric).toEqual([1, 2, 4, 6, 7, 8, 9, 10]);
  });
  it("karışık biçimler", () => {
    const c = citations("Kaya (2024) ve [3] birlikte.");
    expect(c.numeric).toEqual([3]);
    expect(c.ay).toEqual([{ s: "Kaya", y: "2024" }]);
  });
  it("yıl olmayan parantezi atıf saymaz", () => {
    expect(citations("(bkz. Tablo 2) ve (n = 120)")).toEqual({ numeric: [], ay: [] });
  });
});

describe("kaynakça satırları", () => {
  it("baştaki numaraları siler, boş satırları atar", () => {
    expect(refLines("1. Ali (2020)\n\n[2] Veli (2021)\n3) Can (2022)")).toEqual(["Ali (2020)", "Veli (2021)", "Can (2022)"]);
  });
  it("Türkçe küçük harfle soyadı ve yılı eşleştirir", () => {
    expect(refMatches("IŞIK, A. (2020). Başlık.", { s: "Işık", y: "2020" })).toBe(true);
    expect(refMatches("Işık, A. (2019). Başlık.", { s: "Işık", y: "2020" })).toBe(false);
  });
  it("DOI deseni", () => {
    expect(hasDoi("https://doi.org/10.1016/j.compedu.2023.104610")).toBe(true);
    expect(hasDoi("Ankara: Örnek Yayınevi.")).toBe(false);
  });
});
