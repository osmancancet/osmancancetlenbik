/**
 * Publish blog post: "Yapay Zekâ Dolandırıcılıkları 2026"
 *
 * Run from the project root with:
 *   npx tsx scripts/seed-post-yapay-zeka-dolandiricilik.ts
 *
 * Requires DATABASE_URL (from .env or the deployment env).
 * Idempotent: uses upsert on the unique slug, so re-running just updates the post.
 */
import { readFileSync } from "node:fs";
import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

const slug = "yapay-zeka-dolandiriciliklari-2026";
const title =
  "Seni arayan o ses yakının değil: 2026'nın yapay zekâ dolandırıcılıkları ve 7 korunma refleksi";
const excerpt =
  "Klonlanmış sesler, deepfake görüntülü aramalar, kusursuz Türkçe sahte mesajlar… Dolandırıcılık artık ucuzladı ve ölçeklendi. İşte 2026'da en sık karşına çıkacak 6 tuzak ve onları saniyeler içinde fark ettiren 7 refleks — örneklerle.";

async function main() {
  const content = readFileSync(
    "scripts/content/yapay-zeka-dolandiriciliklari-2026.md",
    "utf8",
  ).trim();

  const post = await prisma.post.upsert({
    where: { slug },
    update: { title, excerpt, content, published: true },
    create: { slug, title, excerpt, content, published: true },
  });

  console.log(`✓ Yazı yayınlandı: "${post.title}"`);
  console.log(`  View at /yazilarim/${post.slug}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
