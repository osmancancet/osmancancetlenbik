// Sayfadaki statik içerik: kontrol kataloğu (README §5–6) ve SSS.
export type Level = "bad" | "warn" | "tip";

export const CATALOG: { tag: string; title: string; items: { text: string; src: string; lvl: Level }[] }[] = [
  {
    tag: "Özet · 1.1 · 1.2 · 2", title: "Uzunluk ve içerik", items: [
      { text: "Özet 25–450 kelime", src: "Bilgi notu", lvl: "bad" },
      { text: "1.1, 1.2 ve 2. bölüm en az 350 karakter", src: "Bilgi notu · 3 kural", lvl: "bad" },
      { text: "1.1'de literatüre atıf var", src: "Bilgi notu · sezgisel tespit", lvl: "warn" },
      { text: "Hedeflerde sayı, oran ya da süre", src: "Bilgi notu: ölçülebilir hedef", lvl: "tip" },
      { text: "Yöntemde tasarım, değişken, analiz", src: "Bilgi notu", lvl: "tip" },
      { text: "Karakter sınırına çok yakın (350–384)", src: "İyi uygulama: TYBS sayımı farklı olabilir", lvl: "tip" },
    ],
  },
  {
    tag: "3.1", title: "Çalışma takvimi", items: [
      { text: "En az bir iş adımı", src: "Bilgi notu", lvl: "bad" },
      { text: "İş adımları 1–12. aylar arasında", src: "Bilgi notu", lvl: "bad" },
      { text: "Katkı değerlerinin toplamı 100", src: "Bilgi notu", lvl: "bad" },
      { text: "Literatür taraması, rapor yazımı, sonuç paylaşımı, malzeme alımı ayrı iş adımı değil", src: "Bilgi notu · sezgisel tespit", lvl: "bad" },
      { text: "Her iş adımının başarı ölçütü var", src: "Bilgi notu", lvl: "bad" },
      { text: "Başarı ölçütü ölçülebilir (“başarıyla tamamlanması” değil)", src: "Bilgi notu · sezgisel tespit", lvl: "warn" },
      { text: "Başarı ölçütünde sayısal eşik", src: "İyi uygulama", lvl: "tip" },
    ],
  },
  {
    tag: "3.2 · 3.3 · 4 · Kaynakça", title: "Bölümler ve kaynaklar", items: [
      { text: "Risk yönetimi, araştırma olanakları ve yaygın etki dolu", src: "Bilgi notu · 3 kural", lvl: "warn" },
      { text: "Risklerde B planı", src: "Bilgi notu", lvl: "tip" },
      { text: "Kaynakçadaki her kaynağa metinde atıf; atıfların kaynakçada karşılığı", src: "Bilgi notu · sezgisel tespit", lvl: "warn" },
      { text: "DOI'si olan kaynaklarda DOI", src: "Bilgi notu · sezgisel tespit", lvl: "warn" },
    ],
  },
  {
    tag: "Tüm metin", title: "Dil ve kişisel veri", items: [
      { text: "“Uygun istatistik yöntemleri ile” gibi içi boş ifadeler", src: "İyi uygulama: hakem raporlarında sık eleştiri", lvl: "warn" },
      { text: "Geçerli TC kimlik no, cep telefonu, e-posta", src: "İyi uygulama: KVKK", lvl: "bad" },
    ],
  },
];

export const FAQ: { q: string; a: string }[] = [
  { q: "Bu TÜBİTAK'ın resmî aracı mı?", a: "Hayır. Bağımsız ve ücretsiz bir araçtır; TÜBİTAK ile bağlantısı yoktur. Kurallar herkese açık bilgi notundan alınmıştır. Son kontrolü TYBS önizlemesinde yap." },
  { q: "Tüm kurallar tamamsa başvurum kabul edilir mi?", a: "Hayır. Araç yalnızca biçimi ve bilgi notundaki mekanik kuralları kontrol eder. Projenin bilimsel değerini hakemler değerlendirir." },
  { q: "Metnim bir yere gönderiliyor mu?", a: "Hayır. Kontrollerin hepsi tarayıcında çalışır. Taslağın yalnızca bu tarayıcıda saklanır ve “Formu temizle” ile silinir." },
  { q: "Karakter sayısı TYBS ile neden farklı olabilir?", a: "Araç boşlukları sayar. TYBS'nin sayımı farklı olabilir. Bu yüzden 350–384 karakter arasında ipucu verilir; sınıra yakınsan biraz pay bırak." },
  { q: "Metnimi yapay zekâyla yazdırabilir miyim?", a: "Araç metin üretmez ve yeniden yazmaz. Yapay zekâ kullandıysan TÜBİTAK Üretken Yapay Zekâ Rehberi'ne göre beyan et." },
  { q: "Bir kural yanlış alarm veriyor, ne yapmalıyım?", a: "Hangi kuralın hangi cümlede yanıldığını geri bildirim olarak gönder. Metnin tamamını paylaşman gerekmez; ilgili cümle yeter." },
];
