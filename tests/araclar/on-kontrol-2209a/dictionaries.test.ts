import { describe, expect, it } from "vitest";
import { FORBIDDEN, GENERIC, METHOD_WORDS, VAGUE } from "@/lib/araclar/on-kontrol-2209a/rules/dictionaries";

const lower = (s: string) => s.toLocaleLowerCase("tr-TR");
const forbidden = (s: string) => FORBIDDEN.find(([rx]) => rx.test(lower(s)))?.[1];
const vague = (s: string) => VAGUE.some((rx) => rx.test(lower(s.trim())));
const generic = (s: string) => GENERIC.some(([rx]) => rx.test(lower(s)));

describe("yasak iş adımları", () => {
  it.each([
    ["Literatür taraması", "literatür taraması"],
    ["LİTERATÜR TARAMASI VE ANALİZ", "literatür taraması"],
    ["Literatür incelemesi", "literatür taraması"],
    ["Sonuç raporunun hazırlanması", "sonuç raporu hazırlama"],
    ["Raporlama", "sonuç raporu hazırlama"],
    ["Proje raporlarının yazımı", "sonuç raporu hazırlama"],
    ["Sonuçların paylaşılması", "sonuçların paylaşımı"],
    ["Yaygınlaştırma faaliyetleri", "sonuçların paylaşımı"],
    ["Malzeme alımı", "malzeme alımı"],
    ["SARF TEMİNİ", "malzeme alımı"],
  ])("yakalar: %s", (name, label) => expect(forbidden(name)).toBe(label));

  it.each(["Veri toplama", "Raporlanan verilerin analizi", "Anket geliştirme", "Model eğitimi ve doğrulama", "Saha çalışması", "Literatürdeki ölçeğin uyarlanması"])(
    "yakalamaz: %s", (name) => expect(forbidden(name)).toBeUndefined());
});

describe("belirsiz başarı ölçütleri", () => {
  it.each(["Başarıyla tamamlanması", "BAŞARILI BİR ŞEKİLDE TAMAMLANMASI", "Tamamlanması.", "İş adımının bitmesi", "Olumlu sonuç alınması", "Hedeflere ulaşılması", "İstenilen düzeye gelinmesi", "%100", "100"])(
    "yakalar: %s", (c) => expect(vague(c)).toBe(true));
  it.each(["En az 120 katılımcıdan eksiksiz veri", "F1 ≥ 0,80", "Etik kurul onayının alınması", "2 ölçüm formunun pilot uygulaması"])(
    "yakalamaz: %s", (c) => expect(vague(c)).toBe(false));
});

describe("genel ifadeler", () => {
  it.each([
    "Standart yöntemler kullanılacaktır.",
    "Veriler uygun istatistik yöntemleri ile analiz edilecek.",
    "UYGUN BİR ANALİZ YAPILACAK",
    "Gerekli analizler yapılacaktır.",
    "Literatürde yer alan yöntemler uygulanacak.",
    "En son teknoloji kullanılarak",
    "Çeşitli yöntemlerle",
    "Bazı testler",
  ])("yakalar: %s", (t) => expect(generic(t)).toBe(true));
  it.each([
    "Veriler doğrusal karma etkiler modeliyle analiz edilecek.",
    "Yöntem olarak Mann-Whitney U testi uygulanacak.",
    "Uygunluk analizi için ölçek kullanılacak.",
    "Literatürde tanımlanan ölçek uyarlanacak.",
  ])("yakalamaz: %s", (t) => expect(generic(t)).toBe(false));
});

describe("yöntem sözlüğü", () => {
  it("yakalar", () => {
    expect(METHOD_WORDS.test(lower("Deneysel TASARIM"))).toBe(true);
    expect(METHOD_WORDS.test(lower("Bağımlı değişken"))).toBe(true);
  });
  it("yakalamaz", () => {
    expect(METHOD_WORDS.test(lower("Çalışma yürütülecek."))).toBe(false);
    expect(METHOD_WORDS.test(lower("Sonuçlar paylaşılacak."))).toBe(false);
  });
});
