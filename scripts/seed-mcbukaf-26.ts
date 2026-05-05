/**
 * Add MCBÜKAF'26 conference: "İnteraktif Siber Güvenlik".
 * Run with: npx tsx scripts/seed-mcbukaf-26.ts
 */
import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

const DATA = {
  title:
    "İnteraktif Siber Güvenlik: Son Kullanıcı Zafiyetleri ve Sosyal Mühendislik",
  location: "Ümit Doğay Arınç KM Amfi 1 · Manisa CBÜ",
  date: new Date("2026-05-13T12:00:00.000Z"),
  role: "Konuşmacı",
  description:
    "MCBÜKAF'26 — Manisa CBÜ Kariyer Fuarı kapsamında 15:00–16:15 arası verilen interaktif siber güvenlik sunumu. Son kullanıcı zafiyetleri, sosyal mühendislik senaryoları ve canlı simülasyonlar.",
  presentationSlug: "mcbukaf-2026-siber",
};

async function main() {
  const existing = await prisma.conference.findFirst({
    where: { title: DATA.title },
  });

  if (existing) {
    const updated = await prisma.conference.update({
      where: { id: existing.id },
      data: DATA,
    });
    console.log(`↺ Updated conference: ${updated.title}`);
    console.log(`  /konferanslarim/${updated.id}/sunum`);
    return;
  }

  const created = await prisma.conference.create({ data: DATA });
  console.log(`✓ Created conference: ${created.title}`);
  console.log(`  id: ${created.id}`);
  console.log(`  /konferanslarim/${created.id}/sunum`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
