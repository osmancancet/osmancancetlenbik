"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Trash2 } from "lucide-react";

export type AnnouncementFormData = {
  id?: string;
  title: string;
  body: string;
  type: string;
  pinned: boolean;
  expiresAt: string;
};

const TYPES = [
  { value: "GENEL", label: "Genel" },
  { value: "DERS", label: "Ders" },
  { value: "ETKINLIK", label: "Etkinlik" },
];

export function AnnouncementForm({
  initial,
}: {
  initial?: AnnouncementFormData;
}) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [data, setData] = useState<AnnouncementFormData>(
    initial ?? {
      title: "",
      body: "",
      type: "GENEL",
      pinned: false,
      expiresAt: "",
    }
  );
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof AnnouncementFormData>(
    key: K,
    val: AnnouncementFormData[K]
  ) {
    setData((d) => ({ ...d, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const url = isEdit
      ? `/api/admin/announcements/${initial!.id}`
      : "/api/admin/announcements";
    const res = await fetch(url, {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: data.title,
        body: data.body,
        type: data.type,
        pinned: data.pinned,
        expiresAt: data.expiresAt || null,
      }),
    });
    setSaving(false);
    if (!res.ok) {
      const e = await res.json().catch(() => ({}));
      setError(e.error || "Kaydedilemedi.");
      return;
    }
    router.push("/admin/duyurular");
    router.refresh();
  }

  async function handleDelete() {
    if (!initial?.id) return;
    if (!confirm("Bu duyuruyu silmek istediğinize emin misiniz?")) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/announcements/${initial.id}`, {
      method: "DELETE",
    });
    setDeleting(false);
    if (res.ok) {
      router.push("/admin/duyurular");
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl">
      <Field label="Başlık">
        <input
          type="text"
          required
          value={data.title}
          onChange={(e) => update("title", e.target.value)}
          className={inputCls}
        />
      </Field>

      <Field label="İçerik">
        <textarea
          required
          rows={5}
          value={data.body}
          onChange={(e) => update("body", e.target.value)}
          className={inputCls}
        />
      </Field>

      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Tip">
          <select
            value={data.type}
            onChange={(e) => update("type", e.target.value)}
            className={inputCls}
          >
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Sona Erme Tarihi (opsiyonel)">
          <input
            type="date"
            value={data.expiresAt}
            onChange={(e) => update("expiresAt", e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>

      <label className="flex items-center gap-2 text-sm text-[var(--fg-muted)]">
        <input
          type="checkbox"
          checked={data.pinned}
          onChange={(e) => update("pinned", e.target.checked)}
          className="accent-[var(--accent)]"
        />
        Ana sayfa banner'ında öne çıkar
      </label>

      {error && (
        <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-[var(--bg)] font-medium rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Kaydediliyor..." : isEdit ? "Güncelle" : "Yayınla"}
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
            Sil
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
  label: string;
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
