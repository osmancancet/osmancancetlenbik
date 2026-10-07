import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { canManageApplications, isAuthenticated } from "@/lib/auth";
import { APPLICATION_STATUS_IDS } from "@/lib/competitions";

type Ctx = { params: Promise<{ id: string }> };

const PatchSchema = z.object({
  status: z.enum(APPLICATION_STATUS_IDS).optional(),
  adminNote: z.string().max(2000).nullable().optional(),
});

export async function PATCH(req: Request, { params }: Ctx) {
  if (!(await canManageApplications())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const parsed = PatchSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Geçersiz veri" }, { status: 400 });
  }
  const { status, adminNote } = parsed.data;
  try {
    const application = await prisma.competitionApplication.update({
      where: { id },
      data: {
        ...(status !== undefined && { status }),
        ...(adminNote !== undefined && {
          adminNote: adminNote?.trim() ? adminNote.trim() : null,
        }),
      },
    });
    return NextResponse.json({ application });
  } catch {
    return NextResponse.json({ error: "Başvuru bulunamadı" }, { status: 404 });
  }
}

/** Silme yalnız tam yetkili yöneticide — KVKK silme talepleri için. */
export async function DELETE(_: Request, { params }: Ctx) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await prisma.competitionApplication.deleteMany({ where: { id } });
  return NextResponse.json({ ok: true });
}
