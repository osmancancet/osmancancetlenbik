/**
 * Add "Simav MYO'da Siber Güvenlik Ele Alındı" press item.
 * Run with: npx tsx scripts/seed-press-siber-simav.ts
 */
import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

const ITEM = {
  title: "Simav MYO'da 'Siber Güvenlik' Ele Alındı",
  source: "Kütahya'nın Sesi",
  url: "https://www.kutahyaninsesi.com/haber/27851408/simav-myoda-siber-guvenlik-ele-alindi",
  date: new Date("2026-04-21"),
  excerpt:
    "Simav Meslek Yüksekokulu'nda düzenlenen siber güvenlik farkındalık etkinliğinde Öğr. Gör. Osman Can Çetlenbik, oltalama, sosyal mühendislik, deepfake ve yasadışı bahis tehditlerini interaktif simülasyonlarla ele aldı. Etkinliğe yaklaşık 350 öğrenci katıldı.",
  type: "HABER",
  coverImage:
    "https://static.daktilo.com/sites/1410/uploads/2026/04/21/large/simav-myo-3.webp",
};

async function main() {
  const existing = await prisma.pressItem.findFirst({
    where: { url: ITEM.url },
  });

  if (existing) {
    const updated = await prisma.pressItem.update({
      where: { id: existing.id },
      data: ITEM,
    });
    console.log(`↺ Updated press item: ${updated.title}`);
    return;
  }

  const created = await prisma.pressItem.create({ data: ITEM });
  console.log(`✓ Created press item: ${created.title}`);
  console.log(`  id: ${created.id}`);
  console.log(`  url: ${created.url}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
