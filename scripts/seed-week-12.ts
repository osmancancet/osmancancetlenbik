/**
 * Bind the `tablolarla-calisma` React presentation to BVA 1108 week 12.
 * Run with: npx tsx scripts/seed-week-12.ts
 */
import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const course = await prisma.course.findUnique({
    where: { slug: "bilgi-teknolojileri" },
  });
  if (!course) {
    throw new Error(
      'Course "bilgi-teknolojileri" not found. Run `npx tsx scripts/seed-bva-1108.ts` first.',
    );
  }

  const week = await prisma.courseWeek.update({
    where: {
      courseId_weekNumber: { courseId: course.id, weekNumber: 12 },
    },
    data: {
      presentationSlug: "tablolarla-calisma",
    },
  });

  console.log(
    `✓ Week ${week.weekNumber} "${week.topic}" bound to presentation: ${week.presentationSlug}`,
  );
  console.log(`  View at /dersler/${course.slug}/hafta/12/sunum`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
