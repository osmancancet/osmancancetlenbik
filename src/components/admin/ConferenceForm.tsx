"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Save, Trash2, ExternalLink } from "lucide-react";
import { presentationList } from "@/presentations/registry";

export type ConferenceFormData = {
  id?: string;
  title: string;
  location: string;
  date: string; // YYYY-MM-DD
  role: string;
  description: string;
  link: string;
  slides: string;
  presentationSlug: string;
};

const ROLES = ["Konuşmacı", "Davetli Konuşmacı", "Düzenleyici", "Katılımcı", "Panelist"];

export function ConferenceForm({ initial }: { initial?: ConferenceFormData }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);

  const [data, setData] = useState<ConferenceFormData>(
    initial ?? {
      title: "",
      location: "",
      date: new Date().toISOString().slice(0, 10),
      role: "Konuşmacı",
      description: "",
      link: "",
      slides: "",
      presentationSlug: "",
    }
  );
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof ConferenceFormData>(
    key: K,
    val: ConferenceFormData[K]
  ) {
    setData((d) => ({ ...d, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const url = isEdit
      ? `/api/admin/conferences/${initial!.id}`
      : "/api/admin/conferences";
    const method = isEdit ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: data.title,
        location: data.location,
        date: data.date,
        role: data.role,
        description: data.description || null,
        link: data.link || null,
        slides: data.slides || null,
        presentationSlug: data.presentationSlug || null,
      }),
    });
    setSaving(false);
    if (!res.ok) {
      const e = await res.json().catch(() => ({}));
      setError(e.error || "Kaydedilemedi.");
      return;
    }
    router.push("/admin/konferanslar");
    router.refresh();
  }

  async function handleDelete() {
    if (!initial?.id) return;
    if (!confirm("Bu konferansı silmek istediğinize emin misiniz?")) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/conferences/${initial.id}`, {
      method: "DELETE",
    });
    setDeleting(false);
    if (res.ok) {
      router.push("/admin/konferanslar");
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl">
      <Field label="Konferans / Etkinlik Adı">
        <input
          type="text"
          required
          value={data.title}
          onChange={(e) => update("title", e.target.value)}
          className={inputCls}
        />
      </Field>

      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Konum">
          <input
            type="text"
            required
            value={data.location}
            onChange={(e) => update("location", e.target.value)}
            placeholder="İstanbul · Türkiye"
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

      <Field label="Rol">
        <select
          value={data.role}
          onChange={(e) => update("role", e.target.value)}
          className={inputCls}
        >
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Açıklama (opsiyonel)">
        <textarea
          rows={4}
          value={data.description}
          onChange={(e) => update("description", e.target.value)}
          className={inputCls}
          placeholder="Sunum konusu, temalar, izlenimler..."
        />
      </Field>

      <Field label="Bağlantı (opsiyonel)">
        <input
          type="url"
          value={data.link}
          onChange={(e) => update("link", e.target.value)}
          placeholder="https://..."
          className={inputCls}
        />
      </Field>

      <Field
        label={
          <span className="flex items-center justify-between">
            <span>Etkileşimli Sunum (kod ile yazılmış)</span>
            {isEdit && data.presentationSlug && (
              <Link
                href={`/konferanslarim/${initial!.id}/sunum`}
                target="_blank"
                className="inline-flex items-center gap-1 text-[var(--accent)] hover:underline normal-case tracking-normal text-xs"
              >
                Sunumu Aç <ExternalLink className="w-3 h-3" />
              </Link>
            )}
          </span>
        }
      >
        <select
          value={data.presentationSlug}
          onChange={(e) => update("presentationSlug", e.target.value)}
          className={inputCls}
        >
          <option value="">— Yok (markdown slaytlarını kullan) —</option>
          {presentationList.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.title} ({p.slug})
            </option>
          ))}
        </select>
        <p className="mt-1.5 text-[10px] text-[var(--fg-subtle)]">
          src/presentations/ altına kod ile yeni bir sunum ekleyip registry'ye kaydet, sonra burada seç.
        </p>
      </Field>

      <Field
        label={
          <span className="flex items-center justify-between">
            <span>Markdown Slaytları (yedek — sunum seçilmezse kullanılır)</span>
            {isEdit && data.slides && !data.presentationSlug && (
              <Link
                href={`/konferanslarim/${initial!.id}/sunum`}
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
          placeholder={`# Sunum Başlığı\n\nAlt başlık\n\n---\n\n# Bölüm 1\n\n- Madde\n- Madde`}
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
