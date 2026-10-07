import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { absoluteUrl } from "@/lib/site";
import {
  CLASS_YEARS,
  COMPETITIONS,
  COMPETITION_IDS,
  CONSENT_VERSION,
  SKILL_IDS,
  TEAM_STATUS_IDS,
  applicationsOpen,
  labelOf,
} from "@/lib/competitions";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

const ApplicationSchema = z.object({
  fullName: z.string().trim().min(3, "Ad soyad en az 3 karakter olmalı").max(100),
  studentNo: z
    .string()
    .trim()
    .min(4, "Öğrenci numaranızı girin")
    .max(20, "Öğrenci numarası çok uzun")
    .regex(/^[A-Za-z0-9-]+$/, "Öğrenci numarası yalnız harf ve rakam içerebilir"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Geçerli bir e-posta adresi girin")
    .max(150),
  phone: z
    .string()
    .trim()
    .max(20)
    .optional()
    .transform((v) => (v ? v : undefined))
    .refine((v) => !v || /^[0-9+()\s-]{7,20}$/.test(v), "Telefon numarası geçersiz"),
  university: z.string().trim().min(2, "Üniversitenizi girin").max(150),
  department: z.string().trim().min(2, "Bölümünüzü girin").max(150),
  classYear: z.enum(CLASS_YEARS, { message: "Sınıfınızı seçin" }),
  competitions: z
    .array(z.enum(COMPETITION_IDS, { message: "Geçersiz yarışma seçimi" }))
    .min(1, "En az bir yarışma seçin")
    .transform((a) => [...new Set(a)]),
  skills: z
    .array(z.enum(SKILL_IDS, { message: "Geçersiz yetkinlik seçimi" }))
    .min(1, "En az bir yetkinlik seçin")
    .transform((a) => [...new Set(a)]),
  otherSkills: optionalText(300),
  experience: optionalText(1500),
  // Admin panelinde link olarak açılıyor — yalnız http(s) kabul edilir.
  portfolioUrl: z
    .string()
    .trim()
    .max(300)
    .optional()
    .transform((v) => (v ? v : undefined))
    .refine(
      (v) => !v || /^https?:\/\/[^\s]+\.[^\s]+$/i.test(v),
      "Bağlantı https:// ile başlayan geçerli bir adres olmalı"
    ),
  teamStatus: z.enum(TEAM_STATUS_IDS, { message: "Takım durumunuzu seçin" }),
  motivation: z
    .string()
    .trim()
    .min(30, "Motivasyon yazınız en az 30 karakter olmalı")
    .max(2000),
  consent: z.literal(true, {
    message: "Başvuru için aydınlatma metnini onaylamanız gerekiyor",
  }),
  // Honeypot — botlar doldurur, insanlar görmez.
  website: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(req: Request) {
  if (!applicationsOpen()) {
    return NextResponse.json(
      { error: "Başvuru dönemi sona erdi." },
      { status: 403 }
    );
  }

  const ip = getClientIp(req);
  const rl = checkRateLimit(`basvuru:${ip}`, { max: 5, windowMs: 10 * 60_000 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Çok fazla istek. Lütfen biraz sonra tekrar deneyin." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = ApplicationSchema.safeParse(body);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return NextResponse.json(
      {
        error: issue?.message ?? "Geçersiz veri",
        field: issue?.path[0] ?? null,
      },
      { status: 400 }
    );
  }

  const d = parsed.data;
  if (d.website) return NextResponse.json({ ok: true });

  try {
    await prisma.competitionApplication.create({
      data: {
        fullName: d.fullName,
        studentNo: d.studentNo,
        email: d.email,
        phone: d.phone ?? null,
        university: d.university,
        department: d.department,
        classYear: d.classYear,
        competitions: d.competitions,
        skills: d.skills,
        otherSkills: d.otherSkills ?? null,
        experience: d.experience ?? null,
        portfolioUrl: d.portfolioUrl ?? null,
        teamStatus: d.teamStatus,
        motivation: d.motivation,
        consentAt: new Date(),
        consentVersion: CONSENT_VERSION,
      },
    });
  } catch (e) {
    if ((e as { code?: string })?.code === "P2002") {
      return NextResponse.json(
        {
          error:
            "Bu e-posta adresiyle daha önce başvuru yapılmış. Bilgilerinizi güncellemek isterseniz bize e-postayla yazın.",
          field: "email",
        },
        { status: 409 }
      );
    }
    console.error("[basvuru] db error", e);
    return NextResponse.json(
      { error: "Başvuru kaydedilemedi. Lütfen daha sonra tekrar deneyin." },
      { status: 500 }
    );
  }

  await notify(d.fullName, d.competitions).catch((e) =>
    console.error("[basvuru] notify error", e)
  );

  return NextResponse.json({ ok: true });
}

/** Yeni başvuruyu e-postayla haber verir. Kişisel verinin yalnız asgarisini içerir. */
async function notify(fullName: string, competitions: string[]) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return;
  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  const list = competitions.map((c) => labelOf(COMPETITIONS, c)).join(", ");
  await resend.emails.send({
    from: "Portföy <onboarding@resend.dev>",
    to,
    subject: `[Başvuru] ${fullName}`,
    text: `Yeni yarışma takımı başvurusu: ${fullName}\nİlgi alanı: ${list}\n\nBaşvuruyu panelde görün: ${absoluteUrl("/admin/basvurular")}`,
  });
}
