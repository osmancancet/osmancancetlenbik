// Depoda hazırlanan yazıları (scripts/content/posts.json) production
// build'i sırasında veritabanına ekler; böylece bir yazıyı yayınlamak için
// PR'ı merge etmek yeterli olur, elle seed betiği çalıştırmak gerekmez.
//
// Yalnızca veritabanında olmayan slug'lar eklenir. Var olan yazıya
// dokunulmaz; yayından sonraki düzenlemeler admin panelinden yapılır.
// Hata olursa build durmaz, sadece uyarı basılır.
import { readFileSync } from "node:fs";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/index.js";

const CONTENT_DIR = new URL("./content/", import.meta.url);

async function main() {
  if (process.env.VERCEL_ENV !== "production" && process.env.SYNC_POSTS !== "1") {
    console.log("sync-posts: production değil, atlandı.");
    return;
  }
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.warn("sync-posts: DATABASE_URL yok, atlandı.");
    return;
  }

  const posts = JSON.parse(readFileSync(new URL("posts.json", CONTENT_DIR), "utf8"));
  const prisma = new PrismaClient({ adapter: new PrismaNeon({ connectionString }) });
  try {
    for (const { slug, title, excerpt, file } of posts) {
      const existing = await prisma.post.findUnique({ where: { slug }, select: { id: true } });
      if (existing) continue;
      const content = readFileSync(new URL(file, CONTENT_DIR), "utf8").trim();
      await prisma.post.create({ data: { slug, title, excerpt, content, published: true } });
      console.log(`sync-posts: ✓ /yazilarim/${slug} eklendi.`);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.warn("sync-posts: yazılar eklenemedi, build devam ediyor.", e);
});
