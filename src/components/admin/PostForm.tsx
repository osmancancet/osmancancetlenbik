"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Trash2 } from "lucide-react";

export type PostFormData = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  published: boolean;
};

export function PostForm({ initial }: { initial?: PostFormData }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);

  const [data, setData] = useState<PostFormData>(
    initial ?? {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImage: "",
      published: true,
    }
  );
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof PostFormData>(key: K, val: PostFormData[K]) {
    setData((d) => ({ ...d, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const url = isEdit
      ? `/api/admin/posts/${initial!.id}`
      : "/api/admin/posts";
    const method = isEdit ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: data.title,
        slug: data.slug || undefined,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage || null,
        published: data.published,
      }),
    });
    setSaving(false);
    if (!res.ok) {
      const e = await res.json().catch(() => ({}));
      setError(e.error || "Kaydedilemedi.");
      return;
    }
    router.push("/admin/yazilar");
    router.refresh();
  }

  async function handleDelete() {
    if (!initial?.id) return;
    if (!confirm("Bu yazıyı silmek istediğinize emin misiniz?")) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/posts/${initial.id}`, {
      method: "DELETE",
    });
    setDeleting(false);
    if (res.ok) {
      router.push("/admin/yazilar");
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

      <Field label="Slug (boş bırakılırsa başlıktan üretilir)">
        <input
          type="text"
          value={data.slug}
          onChange={(e) => update("slug", e.target.value)}
          placeholder="orneğin: yapay-zeka-ve-egitim"
          className={`${inputCls} font-mono`}
        />
      </Field>

      <Field label="Özet">
        <textarea
          required
          rows={2}
          value={data.excerpt}
          onChange={(e) => update("excerpt", e.target.value)}
          className={inputCls}
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

      <Field label="İçerik (Markdown)">
        <textarea
          required
          rows={18}
          value={data.content}
          onChange={(e) => update("content", e.target.value)}
          className={`${inputCls} font-mono text-sm`}
          placeholder="# Başlık&#10;&#10;Yazınızı **markdown** olarak yazın..."
        />
      </Field>

      <label className="flex items-center gap-2 text-sm text-[var(--fg-muted)]">
        <input
          type="checkbox"
          checked={data.published}
          onChange={(e) => update("published", e.target.checked)}
          className="accent-[var(--accent)]"
        />
        Yayında
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
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-[var(--bg)] font-medium rounded-md hover:bg-white transition-colors disabled:opacity-50"
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
