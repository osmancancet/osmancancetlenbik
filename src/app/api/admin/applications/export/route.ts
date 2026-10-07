import { prisma } from "@/lib/prisma";
import { canManageApplications } from "@/lib/auth";
import {
  APPLICATION_STATUSES,
  COMPETITIONS,
  SKILLS,
  TEAM_STATUSES,
  labelOf,
} from "@/lib/competitions";

export const dynamic = "force-dynamic";

/**
 * Hücre başı =, +, -, @ ile başlıyorsa Excel onu formül sanıyor (CSV
 * injection). Başına ' eklenerek düz metin olarak açılması sağlanır.
 */
function cell(value: unknown): string {
  let s = value == null ? "" : String(value);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET() {
  if (!(await canManageApplications())) {
    return new Response("unauthorized", { status: 401 });
  }

  const rows = await prisma.competitionApplication.findMany({
    orderBy: { createdAt: "asc" },
  });

  const header = [
    "Başvuru tarihi",
    "Durum",
    "Ad soyad",
    "Öğrenci no",
    "E-posta",
    "Telefon",
    "Üniversite",
    "Bölüm",
    "Sınıf",
    "Yarışmalar",
    "Yetkinlikler",
    "Araç ve diller",
    "Takım durumu",
    "Portfolyo",
    "Deneyim",
    "Motivasyon",
    "Not",
  ];

  const lines = rows.map((r) =>
    [
      r.createdAt.toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" }),
      labelOf(APPLICATION_STATUSES, r.status),
      r.fullName,
      r.studentNo,
      r.email,
      r.phone,
      r.university,
      r.department,
      r.classYear,
      r.competitions.map((c) => labelOf(COMPETITIONS, c)).join(", "),
      r.skills.map((s) => labelOf(SKILLS, s)).join(", "),
      r.otherSkills,
      labelOf(TEAM_STATUSES, r.teamStatus),
      r.portfolioUrl,
      r.experience,
      r.motivation,
      r.adminNote,
    ]
      .map(cell)
      .join(";")
  );

  // Türkçe Excel ; ayırıcı bekliyor; BOM ile ı/ş/ğ doğru açılır.
  const csv = "﻿" + [header.map(cell).join(";"), ...lines].join("\r\n");
  const date = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="basvurular-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
