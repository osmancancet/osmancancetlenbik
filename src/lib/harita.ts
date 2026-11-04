import { createHash } from "node:crypto";
import { databaseConfigured, prisma } from "@/lib/prisma";

export type HaritaSummary = {
  total: number;
  lost: number;
  byPlate: Record<number, number>;
  byKind: Record<string, number>;
  /** Veritabanı yoksa (önizleme) örnek veri gösterilir. */
  demo: boolean;
};

/** Türkiye saatine göre gün (YYYY-MM-DD). */
export function istanbulDay(d = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Istanbul" }).format(d);
}

/** IP'yi saklamadan "günde bir bildirim" kontrolü için gün tuzlu özet. */
export function reporterKey(ip: string, day: string): string {
  const salt = process.env.JWT_SECRET ?? "harita";
  return createHash("sha256").update(`harita:${salt}:${day}:${ip}`).digest("hex").slice(0, 32);
}

export async function getHaritaSummary(): Promise<HaritaSummary> {
  if (!databaseConfigured()) return demoSummary();
  const [byPlate, byKind, lost] = await Promise.all([
    prisma.scamReport.groupBy({ by: ["plate"], _count: { _all: true } }),
    prisma.scamReport.groupBy({ by: ["kind"], _count: { _all: true } }),
    prisma.scamReport.count({ where: { lost: true } }),
  ]);
  const plates: Record<number, number> = {};
  for (const r of byPlate) plates[r.plate] = r._count._all;
  const kinds: Record<string, number> = {};
  for (const r of byKind) kinds[r.kind] = r._count._all;
  const total = Object.values(plates).reduce((a, b) => a + b, 0);
  return { total, lost, byPlate: plates, byKind: kinds, demo: false };
}

function demoSummary(): HaritaSummary {
  const byPlate: Record<number, number> = {
    34: 41, 6: 22, 35: 17, 16: 11, 7: 9, 1: 8, 42: 7, 27: 6, 21: 4, 55: 5, 61: 3, 45: 4, 20: 3, 26: 2, 38: 3,
  };
  const byKind = { "savci-polis": 21, banka: 26, kargo: 19, "ilan-kapora": 14, yatirim: 12, "numara-degisti": 18, "hesap-ele-gecirme": 15, "sahte-site": 9, "borc-ceza": 7, diger: 4 };
  const total = Object.values(byPlate).reduce((a, b) => a + b, 0);
  return { total, lost: Math.round(total * 0.18), byPlate, byKind, demo: true };
}
