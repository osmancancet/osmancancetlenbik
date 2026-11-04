import { describe, expect, it } from "vitest";
import { aboutExtra } from "@/data/aboutPage";

describe("about bio prose", () => {
  const tr = aboutExtra("tr");
  const en = aboutExtra("en");
  if (!tr || !en) throw new Error("missing about copy");

  const blob = [
    ...tr.paragraphs,
    ...en.paragraphs,
    ...tr.faq.map((item) => item.a),
    ...en.faq.map((item) => item.a),
  ].join("\n");

  it("does not paste CV punctuation into parentheticals", () => {
    expect(blob).not.toMatch(/\.\s*·/);
    expect(blob).not.toMatch(/·/);
    expect(blob).not.toMatch(/tarihinden beri/);
    expect(blob).not.toContain("(Tam zamanlı.");
    expect(blob).not.toContain("Programı.");
  });

  it("uses the CV month when it exists, and the year alone when it does not", () => {
    expect(tr.paragraphs[1]).toContain("Nisan 2026'dan beri");
    expect(tr.paragraphs[1]).toContain("2026'dan beri");
    expect(tr.paragraphs[1]).toContain("(tam zamanlı, İstanbul)");
    expect(tr.paragraphs[1]).toContain(
      "(İstatistik Bölümü, Büyük Veri Analistliği Programı, Manisa)"
    );
    expect(en.paragraphs[1]).toContain("since Apr 2026");
    expect(en.paragraphs[1]).toContain("since 2026");
    expect(en.paragraphs[1]).toContain("(full-time, İstanbul)");
  });
});
