/**
 * Python hatalarını öğrencinin anlayacağı Türkçeye çevirir.
 *
 * TASARIM: ham traceback HER ZAMAN gösterilir — hata okumayı öğrenmek dersin
 * bir parçası. Bu tablo onun ÜSTÜNE bir açıklama satırı ekler, yerine geçmez.
 */

type Rule = {
  /** Hata sınıfı (PythonError.type). */
  type: string;
  /** Mesajda ayrıca aranacak desen (aynı sınıfın farklı halleri için). */
  match?: RegExp;
  /** `$1` gibi yakalama gruplarını kullanabilir. */
  tr: string;
};

/** Sıra önemli: ilk eşleşen kural kazanır, özel olanlar genelden önce gelmeli. */
const RULES: Rule[] = [
  {
    type: "IndentationError",
    match: /expected an indented block/,
    tr: "Girinti hatası — `:` ile biten satırdan sonraki blok girintili olmalı. 4 boşluk kullan.",
  },
  {
    type: "IndentationError",
    tr: "Girinti hatası — Python'da girinti anlam taşır. Aynı bloktaki satırlar aynı hizada olmalı; tab yerine 4 boşluk kullan.",
  },
  {
    type: "TabError",
    tr: "Girintide tab ve boşluk karışmış. Tamamını 4 boşluk yap (editörde Tab tuşu zaten 4 boşluk ekler).",
  },
  {
    type: "SyntaxError",
    match: /unterminated string literal|EOL while scanning string literal/,
    tr: "Tırnak kapatılmamış — açtığın `\"` veya `'` işaretini satır sonunda kapatmayı unutmuşsun.",
  },
  {
    type: "SyntaxError",
    match: /expected ':'/,
    tr: "İki nokta eksik — `if`, `for`, `while`, `def` satırları `:` ile biter.",
  },
  {
    type: "SyntaxError",
    match: /'\(' was never closed|closing parenthesis|unmatched/,
    tr: "Parantez eşleşmiyor — açtığın her `(` `[` `{` için bir kapanış olmalı.",
  },
  {
    type: "SyntaxError",
    match: /invalid syntax/,
    tr: "Sözdizimi hatası — bu satırda Python'un anlamadığı bir şey var. Parantez, iki nokta ve tırnakları kontrol et.",
  },
  { type: "SyntaxError", tr: "Sözdizimi hatası — yazımı kontrol et." },
  {
    type: "NameError",
    match: /name '([^']+)' is not defined/,
    tr: "`$1` tanımlı değil — ya yazım hatası var ya da bu değişkeni kullanmadan önce oluşturman gerekiyor.",
  },
  { type: "NameError", tr: "Tanımlanmamış bir isim kullandın." },
  {
    type: "TypeError",
    match: /can only concatenate str \(not "([^"]+)"\) to str/,
    tr: "Metin ile $1 doğrudan toplanamaz — sayıyı `str()` ile metne çevir ya da f-string kullan: `f\"...{sayi}\"`.",
  },
  {
    type: "TypeError",
    match: /unsupported operand type\(s\) for ([^:]+): '([^']+)' and '([^']+)'/,
    tr: "`$1` işlemi `$2` ile `$3` arasında yapılamaz — tiplerden birini dönüştürmen gerekiyor (`int()`, `float()`, `str()`).",
  },
  {
    type: "TypeError",
    match: /'([a-z]+)' object is not subscriptable/,
    tr: "`$1` tipindeki bir değere köşeli parantezle (`[0]`) erişilemez.",
  },
  {
    type: "TypeError",
    match: /object of type '([^']+)' has no len/,
    tr: "`len()` bu tipte çalışmaz — `len()` metin, liste, demet gibi diziler için kullanılır.",
  },
  { type: "TypeError", tr: "Tip uyuşmazlığı — kullandığın değerin tipi bu işlem için uygun değil." },
  {
    type: "ValueError",
    match: /invalid literal for int\(\) with base 10: '([^']*)'/,
    tr: "`\"$1\"` metni `int()` ile tam sayıya çevrilemiyor. Ondalıklıysa `float()` kullan; boşluk varsa `.strip()` ekle.",
  },
  {
    type: "ValueError",
    match: /could not convert string to float/,
    tr: "Bu metin `float()` ile sayıya çevrilemiyor — içinde sayı olmayan karakterler var.",
  },
  { type: "ValueError", tr: "Değer uygun değil — fonksiyona verdiğin değeri kontrol et." },
  { type: "ZeroDivisionError", tr: "Sıfıra bölme — bölen değişkenin 0 olup olmadığını önce kontrol et." },
  {
    type: "IndexError",
    tr: "Liste sınırının dışına çıktın — ilk elemanın indisi `0`, sonuncunun `len(liste) - 1`'dir.",
  },
  { type: "KeyError", tr: "Sözlükte böyle bir anahtar yok — anahtarın yazımını kontrol et." },
  {
    type: "AttributeError",
    match: /'([^']+)' object has no attribute '([^']+)'/,
    tr: "`$1` tipinde `$2` diye bir metot/özellik yok — yazımı kontrol et.",
  },
  { type: "AttributeError", tr: "Bu nesnede böyle bir metot ya da özellik yok." },
  {
    type: "ModuleNotFoundError",
    tr: "Bu modül tarayıcıdaki Python'da yok. Ders kapsamında yalnızca standart kütüphane (math, random, json…) kullanılabilir.",
  },
  {
    type: "FileNotFoundError",
    tr: "Dosya bulunamadı — bu slaytta dosya önceden oluşturulmadıysa `open(...,\"w\")` ile önce yazman gerekir.",
  },
  {
    type: "RecursionError",
    tr: "Fonksiyon kendini durmadan çağırdı — özyinelemede taban durumunu (`if n == 0: return ...`) kontrol et.",
  },
  {
    type: "UnboundLocalError",
    match: /local variable '([^']+)'/,
    tr: "`$1` fonksiyon içinde değer almadan kullanıldı — önce ona bir değer ata.",
  },
];

/** Öğrenciye gösterilecek Türkçe açıklama; eşleşme yoksa null. */
export function explainPythonError(etype: string, message: string): string | null {
  for (const r of RULES) {
    if (r.type !== etype) continue;
    if (!r.match) return r.tr;
    const m = r.match.exec(message);
    if (m) return r.tr.replace(/\$(\d)/g, (_, d: string) => m[Number(d)] ?? "");
  }
  return null;
}

/** EOF, zaman aşımı ve çıktı taşması gibi bizim ürettiğimiz durumlar. */
export const RUNTIME_MESSAGES = {
  eof: "Program daha fazla girdi bekledi ama **Girdi (stdin)** kutusunda satır kalmadı. Kutuya bir satır daha ekleyip tekrar çalıştır.",
  timeout:
    "Program 10 saniyede bitmedi — büyük ihtimalle sonsuz döngü var. Döngü koşulunu ve sayacı artıran satırı (`i += 1`) kontrol et.",
  stopped: "Çalıştırma durduruldu.",
  outputTooLong:
    "Çıktı çok uzun — döngü sınırını küçült (örneğin `range(100000)` yerine `range(20)`).",
  loadError:
    "Python çalıştırıcı yüklenemedi (ağ engeli olabilir). Kodu düzenleyebilirsin ama şu an çalıştıramazsın.",
} as const;
