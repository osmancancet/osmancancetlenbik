"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Plus, Radio, Trash2, Users, ListChecks } from "lucide-react";

type Row = {
  id: string;
  code: string;
  title: string;
  status: "LOBBY" | "LIVE" | "ENDED";
  weekNumber: number | null;
  createdAt: string;
  course: { title: string; slug: string } | null;
  _count: { participants: number; activities: number };
};

const STATUS_LABEL: Record<Row["status"], string> = {
  LOBBY: "Bekliyor",
  LIVE: "Yayında",
  ENDED: "Bitti",
};

export function LiveListClient() {
  const [rows, setRows] = useState<Row[] | null>(null);

  async function load() {
    const res = await fetch("/api/admin/live", { cache: "no-store" });
    if (res.ok) setRows((await res.json()).sessions);
  }
  useEffect(() => {
    load();
  }, []);

  async function remove(id: string) {
    if (!confirm("Bu oturum ve tüm yanıtları silinecek. Emin misiniz?")) return;
    await fetch(`/api/admin/live/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <p className="text-sm text-[var(--fg-muted)] max-w-xl">
          Derste tahtaya bir kod yansıtın, öğrenciler telefonundan katılsın.
          Oylama, yarışma, kelime bulutu ve soru–cevap etkinliklerini sırayla
          sahneye alırsınız.
        </p>
        <Link
          href="/admin/canli/yeni"
          className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--accent)] text-[var(--bg)] text-sm font-semibold rounded-md hover:opacity-90"
        >
          <Plus className="w-4 h-4" />
          Yeni oturum
        </Link>
      </div>

      {rows === null ? (
        <p className="text-sm text-[var(--fg-subtle)]">Yükleniyor…</p>
      ) : rows.length === 0 ? (
        <div className="border border-dashed border-[var(--border-strong)] rounded-lg p-10 text-center">
          <Radio className="w-8 h-8 text-[var(--fg-subtle)] mx-auto mb-3" />
          <p className="text-[var(--fg-muted)]">Henüz canlı ders oturumu yok.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {rows.map((r) => (
            <div
              key={r.id}
              className="card rounded-lg p-4 flex items-center gap-4"
            >
              <Link href={`/admin/canli/${r.id}`} className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-lg text-[var(--accent)] tracking-widest">
                    {r.code}
                  </span>
                  <span
                    className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border ${
                      r.status === "LIVE"
                        ? "border-[var(--accent)] text-[var(--accent)]"
                        : "border-[var(--border-strong)] text-[var(--fg-subtle)]"
                    }`}
                  >
                    {STATUS_LABEL[r.status]}
                  </span>
                </div>
                <div className="text-[var(--fg)] truncate">{r.title}</div>
                <div className="text-xs text-[var(--fg-subtle)] mt-1 flex items-center gap-4">
                  {r.course && (
                    <span>
                      {r.course.title}
                      {r.weekNumber ? ` · ${r.weekNumber}. hafta` : ""}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {r._count.participants}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <ListChecks className="w-3 h-3" />
                    {r._count.activities}
                  </span>
                </div>
              </Link>
              <button
                onClick={() => remove(r.id)}
                aria-label="Sil"
                className="p-2 text-[var(--fg-subtle)] hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
