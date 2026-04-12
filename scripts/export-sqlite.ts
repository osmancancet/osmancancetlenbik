/**
 * Export all SQLite data to JSON for migration to Postgres.
 * Run with: npx tsx scripts/export-sqlite.ts
 *
 * Output: scripts/data-export.json (gitignored)
 */
import { writeFileSync } from "fs";
import { join } from "path";
import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const [
    posts,
    courses,
    courseWeeks,
    conferences,
    announcements,
    pressItems,
  ] = await Promise.all([
    prisma.post.findMany(),
    prisma.course.findMany(),
    prisma.courseWeek.findMany(),
    prisma.conference.findMany(),
    prisma.announcement.findMany(),
    prisma.pressItem.findMany(),
  ]);

  const data = {
    exportedAt: new Date().toISOString(),
    counts: {
      posts: posts.length,
      courses: courses.length,
      courseWeeks: courseWeeks.length,
      conferences: conferences.length,
      announcements: announcements.length,
      pressItems: pressItems.length,
    },
    posts,
    courses,
    courseWeeks,
    conferences,
    announcements,
    pressItems,
  };

  const out = join(__dirname, "data-export.json");
  writeFileSync(out, JSON.stringify(data, null, 2), "utf-8");

  console.log("✓ Exported to", out);
  console.log("  counts:", data.counts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
