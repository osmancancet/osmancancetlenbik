import { readFileSync } from "node:fs";
import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

const posts = [
  {
    slug: "bagli-araclar-savunma-tesisleri-11-zafiyet",
    title:
      "Otoparktaki Casus: Bağlı Araçların Savunma Tesisleri İçin 11 Kritik Zafiyeti",
    excerpt:
      "Norveç tatbikatında kiralık araçlar askerleri kaydetti, TEI yabancı EV'leri kampüse almıyor. Bağlı araçların 11 zafiyeti ve korunma rehberi.",
    file: "scripts/content/bagli-araclar-savunma-tesisleri-11-zafiyet.md",
  },
  {
    slug: "connected-cars-defense-sites-11-vulnerabilities",
    title:
      "The Spy in the Parking Lot: 11 Critical Connected-Car Vulnerabilities for Defense Sites",
    excerpt:
      "Rental cars recorded soldiers in a Norwegian exercise; TEI keeps foreign EVs off campus. The 11 connected-car vulnerabilities and how to protect sensitive sites.",
    file: "scripts/content/connected-cars-defense-sites-11-vulnerabilities.md",
  },
];

async function main() {
  for (const { slug, title, excerpt, file } of posts) {
    const content = readFileSync(file, "utf8").trim();
    const post = await prisma.post.upsert({
      where: { slug },
      update: { title, excerpt, content, published: true },
      create: { slug, title, excerpt, content, published: true },
    });
    console.log(`✓ Yazı yayınlandı: "${post.title}"`);
    console.log(`  View at /yazilarim/${post.slug}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
