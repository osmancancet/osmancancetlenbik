export type Course = {
  title: string;
  program: string;
  type: "Zorunlu" | "Seçmeli";
  icon: string;
};

// MCBÜ Teknik Bilimler MYO · İstatistik Bölümü · Büyük Veri Analistliği
// Güncel ders listesi kullanıcı tarafından sağlanacak.
export const courses: Course[] = [];
