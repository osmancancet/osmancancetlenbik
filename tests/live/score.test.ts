import { describe, expect, it } from "vitest";
import { scoreFor } from "@/lib/live";

describe("scoreFor (Kahoot puanlaması)", () => {
  it("yanlış cevap 0 puan", () => {
    expect(scoreFor({ correct: false, elapsedMs: 100, seconds: 10 })).toBe(0);
  });
  it("anında doğru cevap 1000'e yakın, son saniyede 500", () => {
    expect(scoreFor({ correct: true, elapsedMs: 0, seconds: 10 })).toBe(1000);
    expect(scoreFor({ correct: true, elapsedMs: 740, seconds: 10 })).toBe(963);
    expect(scoreFor({ correct: true, elapsedMs: 10_000, seconds: 10 })).toBe(500);
  });
  it("süre aşımı ve süresiz soru", () => {
    expect(scoreFor({ correct: true, elapsedMs: 12_000, seconds: 10 })).toBe(500);
    expect(scoreFor({ correct: true, elapsedMs: 5_000, seconds: 0 })).toBe(1000);
  });
});
