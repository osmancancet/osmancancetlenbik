import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";
import { ApplicationsClient, type ApplicationRow } from "./ApplicationsClient";

export const dynamic = "force-dynamic";

export default async function AdminApplicationsPage() {
  const [rows, isAdmin] = await Promise.all([
    prisma.competitionApplication.findMany({ orderBy: { createdAt: "desc" } }),
    isAuthenticated(),
  ]);

  const applications: ApplicationRow[] = rows.map((r) => ({
    id: r.id,
    fullName: r.fullName,
    studentNo: r.studentNo,
    email: r.email,
    phone: r.phone,
    university: r.university,
    department: r.department,
    classYear: r.classYear,
    competitions: r.competitions,
    skills: r.skills,
    otherSkills: r.otherSkills,
    experience: r.experience,
    portfolioUrl: r.portfolioUrl,
    teamStatus: r.teamStatus,
    motivation: r.motivation,
    status: r.status,
    adminNote: r.adminNote,
    createdAt: r.createdAt.toISOString(),
  }));

  return <ApplicationsClient initial={applications} isAdmin={isAdmin} />;
}
