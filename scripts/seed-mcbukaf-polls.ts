/**
 * Seed live polls for MCBÜKAF'26 — "İnteraktif Siber Güvenlik".
 * Run with: npx tsx scripts/seed-mcbukaf-polls.ts
 *
 * Re-running is safe — uses upsert by slug.
 */
import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

type Option = { id: string; label: string };
type PollSeed = {
  slug: string;
  question: string;
  options: Option[];
};

const POLLS: PollSeed[] = [
  {
    slug: "mcb-1-attack-surface",
    question: "Telefonunda kaç uygulama yüklü?",
    options: [
      { id: "a", label: "0 – 30" },
      { id: "b", label: "31 – 60" },
      { id: "c", label: "61 – 100" },
      { id: "d", label: "100+" },
    ],
  },
  {
    slug: "mcb-2-sms-trap",
    question: "Bu SMS'i alsan ne yapardın? \"Kargonuz teslim edilemedi: ptt-tr.co/xyz\"",
    options: [
      { id: "a", label: "Linke tıklarım, kayıp olmasın" },
      { id: "b", label: "Önce takip numarası bekliyor muyum diye düşünürüm" },
      { id: "c", label: "PTT'yi tarayıcıdan elle açarım" },
      { id: "d", label: "Sileceğim, ilgilenmem" },
    ],
  },
  {
    slug: "mcb-3-2fa",
    question: "Hangi 2FA yöntemini kullanıyorsun?",
    options: [
      { id: "a", label: "SMS kodu" },
      { id: "b", label: "Authenticator uygulaması" },
      { id: "c", label: "Donanım anahtarı (Yubikey)" },
      { id: "d", label: "Hiçbiri kullanmıyorum" },
    ],
  },
  {
    slug: "mcb-4-quiz",
    question: "Aşağıdakilerden hangisi en yüksek olasılıkla oltalama (phishing)?",
    options: [
      { id: "a", label: "no-reply@accounts.google.com" },
      { id: "b", label: "destek@goog1e-security.com" },
      { id: "c", label: "kampanya@trendyol.com" },
      { id: "d", label: "noreply@github.com" },
    ],
  },
];

async function main() {
  for (const p of POLLS) {
    const saved = await prisma.poll.upsert({
      where: { slug: p.slug },
      create: {
        slug: p.slug,
        question: p.question,
        options: p.options as never,
      },
      update: {
        question: p.question,
        options: p.options as never,
      },
    });
    console.log(`✓ ${saved.slug} — ${p.options.length} seçenek`);
  }
  console.log(`\n${POLLS.length} poll hazır.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
