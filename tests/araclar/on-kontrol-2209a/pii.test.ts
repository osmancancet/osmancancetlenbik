import { describe, expect, it } from "vitest";
import { findPii, mask, tcknValid } from "@/lib/araclar/on-kontrol-2209a/engine/pii";

describe("TC kimlik no", () => {
  it("geçerli numarayı tanır", () => {
    expect(tcknValid("10000000146")).toBe(true);
  });
  it.each(["10000000147", "01234567890", "1234567890", "123456789012"])("geçersiz: %s", (v) => expect(tcknValid(v)).toBe(false));
  it("metinde yalnızca geçerli olanı bildirir", () => {
    expect(findPii("No: 10000000146 ve 12345678901")).toEqual([{ kind: "tckn", masked: "10*******46" }]);
  });
});

describe("telefon", () => {
  it.each(["0532 123 45 67", "+90 532 123 45 67", "5321234567", "0532-123-45-67"])("yakalar: %s", (t) => {
    expect(findPii(`Tel: ${t}`).map((h) => h.kind)).toEqual(["telefon"]);
  });
  it.each(["2026 yılında 120 öğrenci", "ISBN 978-605-123-45-6"])("yakalamaz: %s", (t) => {
    expect(findPii(t).filter((h) => h.kind === "telefon")).toEqual([]);
  });
});

describe("e-posta ve maskeleme", () => {
  it("e-postayı maskeli döndürür", () => {
    expect(findPii("yaz: ad.soyad@uni.edu.tr")).toEqual([{ kind: "eposta", masked: "ad" + "*".repeat(15) + "tr" }]);
  });
  it("kısa değeri tamamen gizler", () => {
    expect(mask("abcd")).toBe("****");
    expect(mask("abcdef")).toBe("ab**ef");
  });
});
