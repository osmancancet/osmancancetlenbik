// Tüm desenler küçük harfle yazılır ve `u` bayrağı taşır; eşleştirme toLocaleLowerCase("tr-TR") ile yapılan metinde olur. README §7.

export const GENERIC: readonly (readonly [RegExp, string])[] = [
  [/standart (yöntem|teknik|prosedür|analiz)\p{L}* (kullanıl|uygulan|yapıl)\p{L}*/u, "Hangi yöntemin, hangi parametrelerle ve neden seçildiğini yaz."],
  [/uygun (bir )?(istatistik(sel)? )?(yöntem|analiz|teknik|test)\p{L}* (ile|kullanılarak|yapılacak|uygulanacak)/u, "“Uygun” yerine yöntemin adını ve seçim gerekçesini yaz."],
  [/gerekli (analiz|çalışma|işlem|test)\p{L}* (yapılacak|gerçekleştirilecek)\p{L}*/u, "Hangi analizlerin yapılacağını tek tek yaz."],
  [/literatürde(ki)? (yer alan|bulunan|mevcut) yöntem\p{L}*/u, "Yöntemin adını, kaynağını ve projeye nasıl uyarlanacağını yaz."],
  [/en (son|güncel|yeni) teknoloji\p{L}* (kullanıl|ile)\p{L}*/u, "Kullanılacak teknolojiyi adıyla belirt."],
  [/(çeşitli|bazı) (yöntem|analiz|teknik|test)ler\p{L}*/u, "Yöntemleri tek tek adıyla yaz."],
];

export const FORBIDDEN: readonly (readonly [RegExp, string])[] = [
  [/literatür (taraması|araştırması|incelemesi|çalışması|derlemesi)/u, "literatür taraması"],
  [/(sonuç |proje |final |ara )?rapor\p{L}* (yazım|hazırlan)\p{L}*|raporlama/u, "sonuç raporu hazırlama"],
  [/sonuçların (paylaşıl|paylaşım|yaygınlaştırıl|sunul)\p{L}*|yaygınlaştırma/u, "sonuçların paylaşımı"],
  [/(malzeme|ekipman|cihaz|sarf) (alım|temin|satın)\p{L}*|satın alma/u, "malzeme alımı"],
];

export const VAGUE: readonly RegExp[] = [
  /başarı(yla|lı( bir şekilde)?) (tamamlan|gerçekleştiril|sonuçlan)\p{L}*/u,
  /^(iş adımının |iş paketinin |çalışmanın )?(tamamlanması|bitmesi|bitirilmesi|tamamlandı)\.?$/u,
  /olumlu sonuç/u,
  /hedef(ler)?e ulaşıl\p{L}*/u,
  /istenilen (düzey|seviye|sonuç)/u,
  /^%?\s*100\s*%?$/u,
];

export const METHOD_WORDS = /tasarım|değişken|örneklem|istatisti|analiz|model|deney|ölçek|anket|veri seti|katılımcı/u;

export const B_PLAN = /b plan/u;
