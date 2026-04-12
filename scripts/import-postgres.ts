/**
 * Import previously exported JSON into Postgres.
 * Run with: npx tsx scripts/import-postgres.ts
 *
 * Reads: scripts/data-export.json
 * Writes to: whatever DATABASE_URL points to (must be postgresql)
 */
import { readFileSync } from "fs";
import { join } from "path";
import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

type ExportShape = {
  exportedAt: string;
  counts: Record<string, number>;
  posts: Array<Record<string, unknown>>;
  courses: Array<Record<string, unknown>>;
  courseWeeks: Array<Record<string, unknown>>;
  conferences: Array<Record<string, unknown>>;
  announcements: Array<Record<string, unknown>>;
  pressItems: Array<Record<string, unknown>>;
};

function parseDates<T extends Record<string, unknown>>(
  row: T,
  dateFields: (keyof T)[]
): T {
  const out = { ...row };
  for (const f of dateFields) {
    if (out[f]) {
      out[f] = new Date(out[f] as string) as T[keyof T];
    }
  }
  return out;
}

async function main() {
  const file = join(__dirname, "data-export.json");
  const raw = readFileSync(file, "utf-8");
  const data: ExportShape = JSON.parse(raw);

  console.log("Source export:", data.exportedAt);
  console.log("Counts:", data.counts);

  // Order matters for FK constraints: Course → CourseWeek
  await prisma.$transaction(async (tx) => {
    // Posts
    for (const p of data.posts) {
      await tx.post.create({
        data: parseDates(p, ["createdAt", "updatedAt"]) as never,
      });
    }
    // Courses (must come before CourseWeek)
    for (const c of data.courses) {
      await tx.course.create({
        data: parseDates(c, ["createdAt", "updatedAt"]) as never,
      });
    }
    // CourseWeeks
    for (const w of data.courseWeeks) {
      await tx.courseWeek.create({
        data: parseDates(w, ["createdAt", "updatedAt"]) as never,
      });
    }
    // Conferences
    for (const c of data.conferences) {
      await tx.conference.create({
        data: parseDates(c, ["createdAt", "date"]) as never,
      });
    }
    // Announcements
    for (const a of data.announcements) {
      await tx.announcement.create({
        data: parseDates(a, [
          "createdAt",
          "updatedAt",
          "expiresAt",
        ]) as never,
      });
    }
    // PressItems
    for (const p of data.pressItems) {
      await tx.pressItem.create({
        data: parseDates(p, ["createdAt", "updatedAt", "date"]) as never,
      });
    }
  });

  // Verify counts after import
  const [posts, courses, weeks, confs, anns, press] = await Promise.all([
    prisma.post.count(),
    prisma.course.count(),
    prisma.courseWeek.count(),
    prisma.conference.count(),
    prisma.announcement.count(),
    prisma.pressItem.count(),
  ]);

  console.log("\n✓ Import complete. Postgres counts:");
  console.log({
    posts,
    courses,
    courseWeeks: weeks,
    conferences: confs,
    announcements: anns,
    pressItems: press,
  });
}

main()
  .catch((e) => {
    console.error("Import failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
