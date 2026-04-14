"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Trash2 } from "lucide-react";

export type CourseFormData = {
  id?: string;
  title: string;
  slug: string;
  program: string;
  type: string;
  description: string;
  semester: string;
  credits: string;
  schedule: string;
  syllabus: string;
};

const TYPES = ["Zorunlu", "Seçmeli"];

export function CourseForm({ initial }: { initial?: CourseFormData }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);

  const [data, setData] = useState<CourseFormData>(
    initial ?? {
      title: "",
      slug: "",
      program: "Büyük Veri Analistliği",
      type: "Zorunlu",
      description: "",
      semester: "2025-2026 Bahar",
      credits: "",
      schedule: "",
      syllabus: "",
    }
  );
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof CourseFormData>(
    key: K,
    val: CourseFormData[K]
  ) {
    setData((d) => ({ ...d, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const url = isEdit ? `/api/admin/courses/${initial!.id}` : "/api/admin/courses";
    const method = isEdit ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: data.title,
        slug: data.slug || undefined,
        program: data.program,
        type: data.type,
        description: data.description || null,
        semester: data.semester || null,
        credits: data.credits ? Number(data.credits) : null,
        schedule: data.schedule || null,
        syllabus: data.syllabus || null,
      }),
    });
    setSaving(false);
    if (!res.ok) {
      const e = await res.json().catch(() => ({}));
      setError(e.error || "Kaydedilemedi.");
      return;
    }
    const json = await res.json();
    if (!isEdit && json.course?.id) {
      router.push(`/admin/dersler/${json.course.id}`);
    } else {
      router.push("/admin/dersler");
    }
    router.refresh();
  }

  async function handleDelete() {
    if (!initial?.id) return;
    if (
      !confirm(
        "Bu dersi ve TÜM haftalarını silmek istediğinize emin misiniz?"
      )
    )
      return;
    setDeleting(true);
    const res = await fetch(`/api/admin/courses/${initial.id}`, {
      method: "DELETE",
    });
    setDeleting(false);
    if (res.ok) {
      router.push("/admin/dersler");
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl">
      <Field label="Ders Adı">
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
          placeholder="yapay-zeka"
          className={`${inputCls} font-mono`}
        />
      </Field>

      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Program">
          <input
            type="text"
            required
            value={data.program}
            onChange={(e) => update("program", e.target.value)}
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
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Dönem">
          <input
            type="text"
            value={data.semester}
            onChange={(e) => update("semester", e.target.value)}
            placeholder="2025-2026 Bahar"
            className={inputCls}
          />
        </Field>
        <Field label="Kredi">
          <input
            type="number"
            min="0"
            value={data.credits}
            onChange={(e) => update("credits", e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>

      <Field label="Ders Saati (gün · saat)">
        <input
          type="text"
          value={data.schedule}
          onChange={(e) => update("schedule", e.target.value)}
          placeholder="Çarşamba · 09:55–12:30"
          className={inputCls}
        />
      </Field>

      <Field label="Kısa Açıklama (opsiyonel)">
        <textarea
          rows={3}
          value={data.description}
          onChange={(e) => update("description", e.target.value)}
          className={inputCls}
          placeholder="Dersin kısa özeti, 1-2 cümle"
        />
      </Field>

      <Field label="Detaylı İçerik / Syllabus (Markdown — öğrencilere gösterilir)">
        <textarea
          rows={14}
          value={data.syllabus}
          onChange={(e) => update("syllabus", e.target.value)}
          className={`${inputCls} font-mono text-xs`}
          placeholder={`## Dersin Amacı\n...\n\n## Öğrenme Çıktıları\n- ...\n\n## Değerlendirme\nVize (%40), Final (%60)\n\n## Kaynaklar\n- ...`}
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
          {saving ? "Kaydediliyor..." : isEdit ? "Güncelle" : "Oluştur"}
        </button>

        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
            Dersi Sil
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
