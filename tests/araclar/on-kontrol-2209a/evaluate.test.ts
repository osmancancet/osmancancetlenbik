import { describe, expect, it } from "vitest";
import type { DraftState } from "@/lib/araclar/on-kontrol-2209a/engine/types";
import hatali from "./fixtures/ornek-hatali.json";
import temiz from "./fixtures/ornek-temiz.json";
import bos from "./fixtures/bos.json";
import { clone, result, run, sample, sum } from "./helpers";
import { SAMPLE_DRAFT } from "@/lib/araclar/on-kontrol-2209a/sample";

const RULE_ORDER = [
  "len-ozet", "len-bilimsel", "len-amac", "len-yontem",
  "wp-any", "wp-time", "wp-sum", "wp-forbidden", "wp-crit", "wp-vague",
  "fill-risk", "fill-olanak", "fill-etki",
  "cite-11", "refs-match", "refs-doi", "generic", "pii",
];

describe("değerlendirme", () => {
  it("18 kural v1 sırasıyla tanımlı", () => {
    expect(run(sample()).results.map((r) => r.rule.id)).toEqual(RULE_ORDER);
  });

  it("örnek başvuru fixture ile aynı", () => {
    expect(SAMPLE_DRAFT).toEqual(hatali);
  });

  it("ornek-hatali → 12/18; 2 düzelt, 4 gözden geçir, 1 ipucu (v1 ile birebir)", () => {
    const s = sum(clone(hatali) as DraftState);
    expect([s.passed, s.applicable, s.bad, s.warn, s.tip]).toEqual([12, 18, 2, 4, 1]);
    expect(s.findings.map((f) => f.ruleId)).toEqual(["wp-sum", "wp-forbidden", "wp-vague", "refs-match", "refs-doi", "generic", "tip"]);
  });

  it("ornek-temiz → 18/18", () => {
    const s = sum(clone(temiz) as DraftState);
    expect([s.passed, s.applicable, s.bad, s.warn]).toEqual([18, 18, 0, 0]);
  });

  it("bos → yalnızca uygulanabilir kurallar sayılır", () => {
    const ev = run(clone(bos) as DraftState);
    const na = ev.results.filter((r) => !r.applies).map((r) => r.rule.id);
    expect(na).toEqual(["wp-vague", "cite-11", "refs-match", "refs-doi"]);
    expect(ev.score).toEqual({ passed: 5, applicable: 14 });
  });

  it("iş adımı yokken wp-time, wp-sum, wp-forbidden, wp-crit uygulanmaz", () => {
    const s = sample(); s.wp = [];
    for (const id of ["wp-time", "wp-sum", "wp-forbidden", "wp-crit", "wp-vague"]) expect(result(s, id).applies).toBe(false);
    expect(result(s, "wp-any").pass).toBe(false);
  });

  it("deterministik", () => {
    expect(JSON.stringify(sum(sample()))).toBe(JSON.stringify(sum(sample())));
  });
});

describe("uzunluk kuralları", () => {
  it("özet 25 kelimeden azsa yakalar", () => {
    const s = sample(); s.text.ozet = "kısa özet";
    expect(result(s, "len-ozet").issues[0].msg).toBe("Özet 2 kelime; en az 25 olmalı.");
  });
  it("özet 450 kelimeden fazlaysa yakalar", () => {
    const s = sample(); s.text.ozet = "kelime ".repeat(512);
    expect(result(s, "len-ozet").issues[0].msg).toBe("Özet 512 kelime; en fazla 450 olmalı.");
  });
  it("uygun uzunlukta yakalamaz", () => {
    expect(result(sample(), "len-ozet").pass).toBe(true);
    expect(result(sample(), "len-bilimsel").pass).toBe(true);
  });
  it("1.1 için eksik karakteri söyler", () => {
    const s = sample(); s.text.bilimsel = "a".repeat(312);
    const is = result(s, "len-bilimsel").issues[0];
    expect(is.msg).toBe("1.1 Bilimsel nitelik 312 karakter; en az 350 olmalı.");
    expect(is.hint).toContain("38 karakter eksik");
  });
  it("boş bölümde 'boş' der", () => {
    const s = sample(); s.text.yontem = "   ";
    expect(result(s, "len-yontem").issues[0].msg).toBe("2. Yöntem boş.");
  });
});

describe("çalışma takvimi", () => {
  it("12 ayı aşan iş adımını yakalar", () => {
    const s = sample(); s.wp[1].start = 10; s.wp[1].end = 14;
    expect(result(s, "wp-time").issues[0].msg).toBe("İA2: 10–14. aylar; proje süresi en fazla 12 ay.");
  });
  it("bitiş başlangıçtan önceyse yakalar", () => {
    const s = sample(); s.wp[0].start = 5; s.wp[0].end = 2;
    expect(result(s, "wp-time").issues[0].msg).toContain("bitiş ayı (2) başlangıçtan (5) önce");
  });
  it("geçerli aralıkları yakalamaz", () => {
    expect(result(sample(), "wp-time").pass).toBe(true);
  });
  it("katkı toplamı 100 değilse yakalar, 100 ise yakalamaz", () => {
    expect(result(sample(), "wp-sum").issues[0].msg).toBe("Katkı değerlerinin toplamı 90; 100 olmalı.");
    const s = sample(); s.wp[2].pct = 40;
    expect(result(s, "wp-sum").pass).toBe(true);
  });
  it("ondalıklı toplamı Türkçe biçimde yazar", () => {
    const s = sample(); s.wp[2].pct = 30.5;
    expect(result(s, "wp-sum").issues[0].msg).toBe("Katkı değerlerinin toplamı 90,5; 100 olmalı.");
  });
  it("boş başarı ölçütünü yakalar, dolu olanı yakalamaz", () => {
    const s = sample(); s.wp[1].crit = " ";
    expect(result(s, "wp-crit").issues.map((i) => i.msg)).toEqual(["İA2 için başarı ölçütü yazılmamış."]);
    expect(result(sample(), "wp-crit").pass).toBe(true);
  });
  it("belirsiz başarı ölçütünü yakalar, sayısal olanı yakalamaz", () => {
    expect(result(sample(), "wp-vague").issues[0].msg).toBe("İA3 başarı ölçütü ölçülebilir değil: “Başarıyla tamamlanması”.");
    const s = sample(); s.wp[2].crit = "Modelin test setinde F1 ≥ 0,80";
    expect(result(s, "wp-vague").pass).toBe(true);
  });
});

describe("bölümler", () => {
  it("boş 3.2'yi yakalar, dolu olanı yakalamaz", () => {
    const s = sample(); s.text.risk = "";
    expect(result(s, "fill-risk").issues[0].msg).toBe("3.2 Risk yönetimi boş.");
    expect(result(sample(), "fill-risk").pass).toBe(true);
  });
  it("3.3 ve 4 için de çalışır", () => {
    const s = sample(); s.text.olanak = ""; s.text.etki = "";
    expect(result(s, "fill-olanak").pass).toBe(false);
    expect(result(s, "fill-etki").pass).toBe(false);
  });
});

describe("kaynaklar", () => {
  it("1.1'de atıf yoksa yakalar, varsa yakalamaz", () => {
    const s = sample(); s.text.bilimsel = "Atıfsız bir metin. ".repeat(30);
    expect(result(s, "cite-11").pass).toBe(false);
    expect(result(sample(), "cite-11").pass).toBe(true);
  });
  it("atıf yapılmamış kaynağı satır numarasıyla bildirir", () => {
    expect(result(sample(), "refs-match").issues[0].msg).toBe("Metinde atıf yapılmamış görünen kaynaklar: 3. satır.");
  });
  it("kaynakçada olmayan atıfı bildirir", () => {
    const s = sample(); s.text.yontem += " Bu yaklaşım Ateş (2020) tarafından önerilmiştir.";
    expect(result(s, "refs-match").issues.map((i) => i.msg)).toContain("Kaynakçada bulunamayan atıflar: Ateş, 2020.");
  });
  it("sayısal atıflarda numara eşleştirir", () => {
    const s = sample();
    s.text.bilimsel = s.text.bilimsel.replace("(Yılmaz, 2022; Demir vd., 2023)", "[1, 2]").replace("Kaya ve Arslan (2024)", "Bir çalışma [3–5]");
    expect(result(s, "refs-match").issues.map((i) => i.msg)).toEqual(["Kaynakçada karşılığı olmayan atıflar: [5]."]);
  });
  it("DOI eksik satırı bildirir, tamamı DOI'liyse yakalamaz", () => {
    expect(result(sample(), "refs-doi").issues[0].msg).toBe("4 kaynaktan 1 tanesinde DOI yok: 3. satır.");
    const s = sample(); s.text.kaynak = s.text.kaynak.split("\n").filter((l) => !l.startsWith("Öztürk")).join("\n");
    expect(result(s, "refs-doi").pass).toBe(true);
  });
  it("kaynakça boşsa refs kuralları uygulanmaz", () => {
    const s = sample(); s.text.kaynak = "";
    expect(result(s, "refs-match").applies).toBe(false);
    expect(result(s, "refs-doi").applies).toBe(false);
  });
});

describe("dil ve kişisel veri", () => {
  it("genel ifadeyi özgün yazımıyla gösterir", () => {
    expect(result(sample(), "generic").issues[0].msg).toBe("2. Yöntem: “uygun istatistik yöntemleri ile”.");
  });
  it("kaynakçadaki genel ifadeye bakmaz", () => {
    const s = sample(); s.text.yontem = s.text.yontem.replace("uygun istatistik yöntemleri ile", "karma etkiler modeliyle");
    s.text.kaynak += "\nBazı yöntemler üzerine. (2020)";
    expect(result(s, "generic").pass).toBe(true);
  });
  it("metindeki e-postayı maskeli bildirir", () => {
    const s = sample(); s.text.olanak += " İletişim: ogrenci@ornek.edu.tr";
    const is = result(s, "pii").issues[0];
    expect(is.msg).toMatch(/^3\.3 Araştırma olanakları: e-posta adresi \(og\*+tr\)\.$/);
    expect(is.msg).not.toContain("ogrenci@");
  });
  it("örnekte kişisel veri yok", () => {
    expect(result(sample(), "pii").pass).toBe(true);
  });
});

describe("ipuçları", () => {
  const msgs = (s: DraftState) => run(s).tips.map((t) => t.msg);
  it("örnekte yalnızca sayısız başarı ölçütü ipucu var", () => {
    expect(msgs(sample())).toEqual(["İA1 başarı ölçütünde sayısal bir eşik yok: “Etik kurul onayının alınması”."]);
  });
  it("sınıra yakın karakter sayısında ipucu verir", () => {
    const s = sample(); s.text.amac = "Hedef 1 ".repeat(45).trim() + "xxxxxx";
    expect(msgs(s).some((m) => m.startsWith("1.2 Amaç ve hedefler") && m.includes("alt sınıra çok yakın"))).toBe(true);
  });
  it("hedeflerde rakam yoksa ipucu verir", () => {
    const s = sample(); s.text.amac = "Projenin amacı ilişkiyi ortaya koymaktır. ".repeat(10);
    expect(msgs(s)).toContain("Hedeflerde sayı, oran ya da süre yok.");
  });
  it("yöntem sözlüğü ve B planı ipuçları", () => {
    const s = sample(); s.text.yontem = "Çalışma yürütülecek. ".repeat(20); s.text.risk = "Gecikme olursa ek süre istenecek.";
    expect(msgs(s)).toEqual(expect.arrayContaining([
      "Yöntemde tasarım, değişken ya da analiz ifadesi bulunamadı.",
      "Risk yönetiminde B planı ifadesi geçmiyor.",
    ]));
  });
});
