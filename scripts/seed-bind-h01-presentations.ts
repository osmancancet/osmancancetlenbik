/**
 * Bind Week 1 React presentations to each BVA course's CourseWeek (2026-2027 Güz).
 * Run: DATABASE_URL=... npx tsx scripts/seed-bind-h01-presentations.ts
 *
 * Idempotent — uses update().
 */
import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

const BINDINGS: { courseSlug: string; presentationSlug: string }[] = [
  { courseSlug: "programlama-temelleri", presentationSlug: "programlama-temelleri-h01" },
  { courseSlug: "is-sagligi-ve-guvenligi", presentationSlug: "is-sagligi-ve-guvenligi-h01" },
  { courseSlug: "uretken-yapay-zekalar", presentationSlug: "uretken-yapay-zekalar-h01" },
  { courseSlug: "buyuk-veri-icin-bulut-bilisim", presentationSlug: "buyuk-veri-icin-bulut-bilisim-h01" },
  { courseSlug: "sosyal-ag-analizi", presentationSlug: "sosyal-ag-analizi-h01" },
  { courseSlug: "veri-gorsellestirme", presentationSlug: "veri-gorsellestirme-h01" },
  { courseSlug: "siber-guvenlik-ve-bilisim-hukuku", presentationSlug: "siber-guvenlik-ve-bilisim-hukuku-h01" },
  { courseSlug: "kullanici-arayuzu-tasarimi", presentationSlug: "kullanici-arayuzu-tasarimi-h01" },
];

async function main() {
  console.log(`Binding ${BINDINGS.length} Week 1 presentations...\n`);

  for (const b of BINDINGS) {
    const course = await prisma.course.findUnique({ where: { slug: b.courseSlug } });
    if (!course) {
      console.log(`✗ Course not found: ${b.courseSlug} — skipping`);
      continue;
    }

    const week = await prisma.courseWeek.update({
      where: { courseId_weekNumber: { courseId: course.id, weekNumber: 1 } },
      data: { presentationSlug: b.presentationSlug },
    });

    console.log(`✓ ${b.courseSlug} · Hafta 1 → ${week.presentationSlug}`);
  }

  console.log(`\nDone. ${BINDINGS.length} bindings applied.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
