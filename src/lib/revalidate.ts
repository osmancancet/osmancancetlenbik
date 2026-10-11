import { revalidatePath } from "next/cache";

/**
 * Admin panelinden içerik değiştiğinde herkese açık sayfaların önbelleğini
 * tazeler.
 *
 * Ziyaretçi sayfaları (dersler, yazılar, duyurular...) uzun süre önbellekte
 * tutuluyor; böylece her ziyarette veritabanına gidip sayfayı yeniden
 * üretmiyoruz ve Vercel "Fluid Active CPU" kotası boşa harcanmıyor. Bunun
 * bedeli, admin panelden yapılan bir değişikliğin hemen görünmemesi olurdu —
 * bu fonksiyon tam o anda önbelleği temizleyerek değişikliği anında yayına
 * alıyor. İçerik nadiren değiştiği için tüm siteyi tazelemek basit ve ucuz.
 */
export function refreshPublicPages() {
  revalidatePath("/", "layout");
}
