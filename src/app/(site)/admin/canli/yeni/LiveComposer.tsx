"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, GripVertical, Check, LoaderCircle } from "lucide-react";
import {
  ACTIVITY_TYPES,
  ACTIVITY_LABELS,
  ACTIVITY_HINTS,
  type ActivityType,
} from "@/lib/live";

type Draft = {
  key: string;
  type: ActivityType;
  prompt: string;
  seconds: number;
  options: Array<{ id: string; label: string; correct?: boolean }>;
};

const uid = () => Math.random().toString(36).slice(2, 9);

const blank = (type: ActivityType): Draft => ({
  key: uid(),
  type,
  prompt: "",
  seconds: type === "QUIZ" ? 30 : 0,
  options:
    type === "WORDCLOUD" || type === "QA" || type === "SCALE"
      ? []
      : [
          { id: "a", label: "" },
          { id: "b", label: "" },
        ],
});

export function LiveComposer({
  courses,
}: {
  courses: Array<{ id: string; title: string; weeks: number[] }>;
}) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [weekNumber, setWeekNumber] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [items, setItems] = useState<Draft[]>([blank("POLL")]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const course = courses.find((c) => c.id === courseId);

  function patch(key: string, next: Partial<Draft>) {
    setItems((prev) =>
      prev.map((d) => (d.key === key ? { ...d, ...next } : d))
    );
  }

  function changeType(key: string, type: ActivityType) {
    setItems((prev) =>
      prev.map((d) =>
        d.key === key ? { ...blank(type), key: d.key, prompt: d.prompt } : d
      )
    );
  }

  function move(key: string, dir: -1 | 1) {
    setItems((prev) => {
      const i = prev.findIndex((d) => d.key === key);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= prev.length) return prev;
      const copy = [...prev];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });
  }

  async function save() {
    setError(null);
    if (!title.trim()) return setError("Oturuma bir başlık verin.");

    for (const d of items) {
      if (!d.prompt.trim()) return setError("Boş soru metni var.");
      const needsOptions = d.type === "POLL" || d.type === "QUIZ";
      if (needsOptions) {
        const filled = d.options.filter((o) => o.label.trim());
        if (filled.length < 2)
          return setError(`“${d.prompt.slice(0, 30)}…” için en az iki şık gerekli.`);
        if (d.type === "QUIZ" && !filled.some((o) => o.correct))
          return setError(
            `“${d.prompt.slice(0, 30)}…” yarışma sorusunda doğru şık işaretlenmemiş.`
          );
      }
    }

    setBusy(true);
    const res = await fetch("/api/admin/live", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.trim(),
        courseId: courseId || null,
        weekNumber: weekNumber ? Number(weekNumber) : null,
        anonymous,
        activities: items.map((d) => ({
          type: d.type,
          prompt: d.prompt.trim(),
          seconds: d.seconds,
          options: d.options
            .filter((o) => o.label.trim())
            .map((o) => ({ id: o.id, label: o.label.trim(), correct: o.correct })),
        })),
      }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) return setError(data.error ?? "Kaydedilemedi.");
    router.push(`/admin/canli/${data.id}`);
  }

  const input =
    "w-full px-3 py-2.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]";
  const labelCls =
    "block text-xs uppercase tracking-wider text-[var(--fg-subtle)] mb-2";

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className={labelCls} htmlFor="ls-title">
            Oturum başlığı
          </label>
          <input
            id="ls-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Örn. 3. Hafta — Değişkenler ve Veri Tipleri"
            className={input}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="ls-course">
            Ders (isteğe bağlı)
          </label>
          <select
            id="ls-course"
            value={courseId}
            onChange={(e) => {
              setCourseId(e.target.value);
              setWeekNumber("");
            }}
            className={input}
          >
            <option value="">— Seçilmedi —</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="ls-week">
            Hafta
          </label>
          <select
            id="ls-week"
            value={weekNumber}
            onChange={(e) => setWeekNumber(e.target.value)}
            disabled={!course}
            className={`${input} disabled:opacity-40`}
          >
            <option value="">— Seçilmedi —</option>
            {course?.weeks.map((w) => (
              <option key={w} value={w}>
                {w}. Hafta
              </option>
            ))}
          </select>
        </div>
        <label className="md:col-span-2 flex items-center gap-3 text-sm text-[var(--fg-muted)]">
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
            className="w-4 h-4 accent-[var(--accent)]"
          />
          Anonim katılım — öğrenciler ad yazmadan girsin (sıralama tablosu
          takma adlarla dolar)
        </label>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm uppercase tracking-[0.18em] text-[var(--accent)] font-mono">
            Etkinlikler ({items.length})
          </h2>
        </div>

        <div className="space-y-4">
          {items.map((d, i) => (
            <div key={d.key} className="card rounded-lg p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex flex-col items-center gap-1 pt-1">
                  <button
                    onClick={() => move(d.key, -1)}
                    disabled={i === 0}
                    aria-label="Yukarı taşı"
                    className="text-[var(--fg-subtle)] hover:text-[var(--accent)] disabled:opacity-20 text-xs"
                  >
                    ▲
                  </button>
                  <GripVertical className="w-3 h-3 text-[var(--fg-subtle)]" />
                  <button
                    onClick={() => move(d.key, 1)}
                    disabled={i === items.length - 1}
                    aria-label="Aşağı taşı"
                    className="text-[var(--fg-subtle)] hover:text-[var(--accent)] disabled:opacity-20 text-xs"
                  >
                    ▼
                  </button>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {ACTIVITY_TYPES.map((t) => (
                      <button
                        key={t}
                        onClick={() => changeType(d.key, t)}
                        className={`px-2.5 py-1 rounded text-xs border transition-colors ${
                          d.type === t
                            ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-soft)]"
                            : "border-[var(--border-strong)] text-[var(--fg-subtle)] hover:text-[var(--fg)]"
                        }`}
                      >
                        {ACTIVITY_LABELS[t]}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-[var(--fg-subtle)] leading-relaxed">
                    {ACTIVITY_HINTS[d.type]}
                  </p>

                  <textarea
                    value={d.prompt}
                    onChange={(e) => patch(d.key, { prompt: e.target.value })}
                    rows={2}
                    placeholder="Soruyu yazın"
                    className={input}
                  />

                  {d.type === "QUIZ" && (
                    <div className="flex items-center gap-3">
                      <label
                        className="text-xs text-[var(--fg-subtle)]"
                        htmlFor={`sec-${d.key}`}
                      >
                        Süre (sn, 0 = süresiz)
                      </label>
                      <input
                        id={`sec-${d.key}`}
                        type="number"
                        min={0}
                        max={600}
                        value={d.seconds}
                        onChange={(e) =>
                          patch(d.key, { seconds: Number(e.target.value) })
                        }
                        className="w-24 px-2 py-1.5 rounded bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] text-sm"
                      />
                    </div>
                  )}

                  {(d.type === "POLL" || d.type === "QUIZ") && (
                    <div className="space-y-2">
                      {d.options.map((o, oi) => (
                        <div key={o.id} className="flex items-center gap-2">
                          {d.type === "QUIZ" && (
                            <button
                              onClick={() =>
                                patch(d.key, {
                                  options: d.options.map((x) => ({
                                    ...x,
                                    correct: x.id === o.id ? !x.correct : x.correct,
                                  })),
                                })
                              }
                              aria-label="Doğru cevap olarak işaretle"
                              aria-pressed={!!o.correct}
                              className={`w-7 h-7 shrink-0 grid place-items-center rounded border transition-colors ${
                                o.correct
                                  ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-soft)]"
                                  : "border-[var(--border-strong)] text-[var(--fg-subtle)]"
                              }`}
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <input
                            value={o.label}
                            onChange={(e) =>
                              patch(d.key, {
                                options: d.options.map((x) =>
                                  x.id === o.id ? { ...x, label: e.target.value } : x
                                ),
                              })
                            }
                            placeholder={`${oi + 1}. şık`}
                            className={input}
                          />
                          <button
                            onClick={() =>
                              patch(d.key, {
                                options: d.options.filter((x) => x.id !== o.id),
                              })
                            }
                            disabled={d.options.length <= 2}
                            aria-label="Şıkkı sil"
                            className="p-2 text-[var(--fg-subtle)] hover:text-red-400 disabled:opacity-20"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                      {d.options.length < 8 && (
                        <button
                          onClick={() =>
                            patch(d.key, {
                              options: [...d.options, { id: uid(), label: "" }],
                            })
                          }
                          className="text-xs text-[var(--accent)] hover:underline inline-flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Şık ekle
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <button
                  onClick={() =>
                    setItems((prev) => prev.filter((x) => x.key !== d.key))
                  }
                  disabled={items.length <= 1}
                  aria-label="Etkinliği sil"
                  className="p-2 text-[var(--fg-subtle)] hover:text-red-400 disabled:opacity-20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setItems((prev) => [...prev, blank("POLL")])}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 border border-[var(--border-strong)] rounded-md text-sm text-[var(--fg-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          <Plus className="w-4 h-4" />
          Etkinlik ekle
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      <button
        onClick={save}
        disabled={busy}
        className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--bg)] font-semibold rounded-md hover:opacity-90 disabled:opacity-50"
      >
        {busy && <LoaderCircle className="w-4 h-4 animate-spin" />}
        Oturumu oluştur
      </button>
    </div>
  );
}
