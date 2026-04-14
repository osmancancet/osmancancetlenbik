// Mevcut ders syllabus'larındaki eski ders sorumlusu adını güncelle.
// Neon HTTP üzerinden Prisma bypass — ws bağımlılığı olmadan çalışır.
// Çalıştır: `npx tsx --env-file=.env scripts/fix-syllabus-instructor.ts`

import { neon } from "@neondatabase/serverless";

const OLD = "Öğr. Gör. Nur Erdem";
const NEW = "Öğr. Gör. Osman Can Çetlenbik";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL yok");
  const sql = neon(url);

  const rows = (await sql`
    UPDATE "Course"
    SET "syllabus" = REPLACE("syllabus", ${OLD}, ${NEW})
    WHERE "syllabus" LIKE ${"%" + OLD + "%"}
    RETURNING "slug"
  `) as Array<{ slug: string }>;

  if (rows.length === 0) {
    console.log("Güncellenecek ders bulunamadı.");
    return;
  }
  for (const r of rows) console.log(`✓ ${r.slug} güncellendi`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
