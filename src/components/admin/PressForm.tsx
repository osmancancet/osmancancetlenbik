"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Trash2 } from "lucide-react";

export type PressFormData = {
  id?: string;
  title: string;
  source: string;
  url: string;
  date: string;
  excerpt: string;
  type: string;
  coverImage: string;
};

const TYPES = [
  { value: "HABER", label: "Haber" },
  { value: "ROPORTAJ", label: "Röportaj" },
  { value: "YAZI", label: "Köşe Yazısı" },
  { value: "TV", label: "TV / Video" },
  { value: "PODCAST", label: "Podcast" },
];

export function PressForm({ initial }: { initial?: PressFormData }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [data, setData] = useState<PressFormData>(
    initial ?? {
      title: "",
      source: "",
      url: "",
      date: new Date().toISOString().slice(0, 10),
      excerpt: "",
      type: "HABER",
      coverImage: "",
    }
  );
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof PressFormData>(
    key: K,
    val: PressFormData[K]
  ) {
    setData((d) => ({ ...d, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const url = isEdit
      ? `/api/admin/press/${initial!.id}`
      : "/api/admin/press";
    const res = await fetch(url, {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: data.title,
        source: data.source,
        url: data.url,
        date: data.date,
        excerpt: data.excerpt || null,
        type: data.type,
        coverImage: data.coverImage || null,
      }),
    });
    setSaving(false);
    if (!res.ok) {
      const e = await res.json().catch(() => ({}));
      setError(e.error || "Kaydedilemedi.");
      return;
    }
    router.push("/admin/basin");
    router.refresh();
  }

  async function handleDelete() {
    if (!initial?.id) return;
    if (!confirm("Bu basın kaydını silmek istediğinize emin misiniz?")) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/press/${initial.id}`, {
      method: "DELETE",
    });
    setDeleting(false);
    if (res.ok) {
      router.push("/admin/basin");
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

      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Kaynak (yayın organı)">
          <input
            type="text"
            required
            value={data.source}
            onChange={(e) => update("source", e.target.value)}
            placeholder="Hürriyet, AA, NTV..."
            className={inputCls}
          />
        </Field>
        <Field label="Tarih">
          <input
            type="date"
            required
            value={data.date}
            onChange={(e) => update("date", e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>

      <Field label="Bağlantı (URL)">
        <input
          type="url"
          required
          value={data.url}
          onChange={(e) => update("url", e.target.value)}
          placeholder="https://..."
          className={inputCls}
        />
      </Field>

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

      <Field label="Özet (opsiyonel)">
        <textarea
          rows={3}
          value={data.excerpt}
          onChange={(e) => update("excerpt", e.target.value)}
          className={inputCls}
          placeholder="Haberin kısa özeti..."
        />
      </Field>

      <Field label="Kapak Görseli URL (opsiyonel)">
        <input
          type="url"
          value={data.coverImage}
          onChange={(e) => update("coverImage", e.target.value)}
          placeholder="https://..."
          className={inputCls}
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
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-[var(--bg)] font-medium rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Kaydediliyor..." : isEdit ? "Güncelle" : "Kaydet"}
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
