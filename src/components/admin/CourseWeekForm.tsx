"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";

export type WeekFormData = {
  id?: string;
  weekNumber: number;
  topic: string;
  notes: string;
  slides: string;
  resources: string;
};

export function CourseWeekForm({
  courseId,
  courseSlug,
  initial,
}: {
  courseId: string;
  courseSlug: string;
  initial?: WeekFormData;
}) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);

  const [data, setData] = useState<WeekFormData>(
    initial ?? {
      weekNumber: 1,
      topic: "",
      notes: "",
      slides: "",
      resources: "",
    }
  );
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof WeekFormData>(key: K, val: WeekFormData[K]) {
    setData((d) => ({ ...d, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const url = isEdit
      ? `/api/admin/courses/${courseId}/weeks/${initial!.id}`
      : `/api/admin/courses/${courseId}/weeks`;
    const method = isEdit ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        weekNumber: data.weekNumber,
        topic: data.topic,
        notes: data.notes || null,
        slides: data.slides || null,
        resources: data.resources || null,
      }),
    });
    setSaving(false);
    if (!res.ok) {
      const e = await res.json().catch(() => ({}));
      setError(e.error || "Kaydedilemedi.");
      return;
    }
    router.push(`/admin/dersler/${courseId}`);
    router.refresh();
  }

  async function handleDelete() {
    if (!initial?.id) return;
    if (!confirm("Bu haftayı silmek istediğinize emin misiniz?")) return;
    setDeleting(true);
    const res = await fetch(
      `/api/admin/courses/${courseId}/weeks/${initial.id}`,
      { method: "DELETE" }
    );
    setDeleting(false);
    if (res.ok) {
      router.push(`/admin/dersler/${courseId}`);
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid md:grid-cols-[120px_1fr] gap-4">
        <Field label="Hafta">
          <input
            type="number"
            min="1"
            max="20"
            required
            value={data.weekNumber}
            onChange={(e) => update("weekNumber", Number(e.target.value))}
            className={`${inputCls} text-center font-mono`}
          />
        </Field>
        <Field label="Konu">
          <input
            type="text"
            required
            value={data.topic}
            onChange={(e) => update("topic", e.target.value)}
            placeholder="Giriş ve Temel Kavramlar"
            className={inputCls}
          />
        </Field>
      </div>

      <Field label="Ders Notları (Markdown)">
        <textarea
          rows={8}
          value={data.notes}
          onChange={(e) => update("notes", e.target.value)}
          placeholder="## Konu Başlığı&#10;&#10;Markdown ile yazılmış ders notları..."
          className={`${inputCls} font-mono text-sm`}
        />
      </Field>

      <Field
        label={
          <span className="flex items-center justify-between">
            <span>Sunum Slaytları (Markdown — slaytları --- ile ayır)</span>
            {isEdit && data.slides && (
              <Link
                href={`/dersler/${courseSlug}/hafta/${data.weekNumber}/sunum`}
                target="_blank"
                className="inline-flex items-center gap-1 text-[var(--accent)] hover:underline normal-case tracking-normal text-xs"
              >
                Sunumu Aç <ExternalLink className="w-3 h-3" />
              </Link>
            )}
          </span>
        }
      >
        <textarea
          rows={16}
          value={data.slides}
          onChange={(e) => update("slides", e.target.value)}
          placeholder={`# Slayt 1\n\nİçerik\n\n---\n\n# Slayt 2\n\n- Madde\n- Madde`}
          className={`${inputCls} font-mono text-sm`}
        />
      </Field>

      <Field label="Kaynaklar (Markdown — opsiyonel)">
        <textarea
          rows={5}
          value={data.resources}
          onChange={(e) => update("resources", e.target.value)}
          placeholder="- [Kitap adı](https://...)&#10;- [Makale](https://...)"
          className={`${inputCls} font-mono text-sm`}
        />
      </Field>

      {error && (
        <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-[var(--bg)] font-medium rounded-md hover:bg-white transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Kaydediliyor..." : isEdit ? "Güncelle" : "Haftayı Ekle"}
        </button>

        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
            Haftayı Sil
          </button>
        )}
      </div>
    </form>
  );
}

const inputCls =
  "w-full px-4 py-2.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]";

function Field({
  label,
  children,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-[var(--fg-subtle)] mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}
