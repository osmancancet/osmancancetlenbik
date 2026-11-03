"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Users,
  Download,
  ExternalLink,
  Search,
  ChevronDown,
  Mail,
  Phone,
  Trash2,
  Save,
} from "lucide-react";
import {
  APPLICATION_STATUSES,
  COMPETITIONS,
  SKILLS,
  TEAM_STATUSES,
  labelOf,
} from "@/lib/competitions";

export type ApplicationRow = {
  id: string;
  fullName: string;
  studentNo: string;
  email: string;
  phone: string | null;
  university: string;
  department: string;
  classYear: string;
  competitions: string[];
  skills: string[];
  otherSkills: string | null;
  experience: string | null;
  portfolioUrl: string | null;
  teamStatus: string;
  motivation: string;
  status: string;
  adminNote: string | null;
  createdAt: string;
};

const TONE: Record<string, string> = {
  accent: "text-[var(--accent)] border-[var(--border-strong)]",
  info: "text-sky-400 border-sky-500/40",
  ok: "text-emerald-400 border-emerald-500/40",
  muted: "text-[var(--fg-muted)] border-[var(--border)]",
  bad: "text-red-400 border-red-500/40",
};

function StatusBadge({ status }: { status: string }) {
  const s = APPLICATION_STATUSES.find((x) => x.id === status);
  return (
    <span
      className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border font-mono shrink-0 ${
        TONE[s?.tone ?? "muted"]
      }`}
    >
      {s?.label ?? status}
    </span>
  );
}

const selectCls =
  "px-3 py-2 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-sm text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]";

export function ApplicationsClient({
  initial,
  isAdmin,
}: {
  initial: ApplicationRow[];
  isAdmin: boolean;
}) {
  const [rows, setRows] = useState(initial);
  const [q, setQ] = useState("");
  const [competition, setCompetition] = useState("");
  const [skill, setSkill] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const needle = q.trim().toLocaleLowerCase("tr-TR");
    return rows.filter((r) => {
      if (competition && !r.competitions.includes(competition)) return false;
      if (skill && !r.skills.includes(skill)) return false;
      if (status && r.status !== status) return false;
      if (!needle) return true;
      return [r.fullName, r.email, r.studentNo, r.department, r.otherSkills]
        .filter(Boolean)
        .some((v) => v!.toLocaleLowerCase("tr-TR").includes(needle));
    });
  }, [rows, q, competition, skill, status]);

  const counts = useMemo(
    () =>
      Object.fromEntries(
        COMPETITIONS.map((c) => [
          c.id,
          rows.filter((r) => r.competitions.includes(c.id)).length,
        ])
      ),
    [rows]
  );
  const newCount = rows.filter((r) => r.status === "NEW").length;

  function patchLocal(id: string, patch: Partial<ApplicationRow>) {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-2">
            Yarışma takımları
          </div>
          <h1 className="text-3xl font-semibold text-[var(--fg)]">
            Başvurular
          </h1>
        </div>
        <div className="flex gap-2">
          <Link
            href="/basvuru"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-[var(--border-strong)] text-[var(--fg)] rounded-md hover:border-[var(--accent)] transition-colors text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            Formu aç
          </Link>
          <a
            href="/api/admin/applications/export"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--accent)] text-[var(--bg)] font-medium rounded-md hover:opacity-90 transition-opacity text-sm"
          >
            <Download className="w-4 h-4" />
            CSV indir
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
        <Stat label="Toplam" value={rows.length} />
        <Stat label="Yeni" value={newCount} highlight />
        {COMPETITIONS.map((c) => (
          <Stat key={c.id} label={c.label} value={counts[c.id] ?? 0} />
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--fg-subtle)]" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ad, e-posta, numara, bölüm…"
            className={`${selectCls} w-full pl-9`}
          />
        </div>
        <select
          value={competition}
          onChange={(e) => setCompetition(e.target.value)}
          className={selectCls}
          aria-label="Yarışma"
        >
          <option value="">Tüm yarışmalar</option>
          {COMPETITIONS.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
        <select
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          className={selectCls}
          aria-label="Yetkinlik"
        >
          <option value="">Tüm yetkinlikler</option>
          {SKILLS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={selectCls}
          aria-label="Durum"
        >
          <option value="">Tüm durumlar</option>
          {APPLICATION_STATUSES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="text-xs text-[var(--fg-subtle)] font-mono mb-3">
        {filtered.length} başvuru gösteriliyor
      </div>

      <div className="space-y-2">
        {rows.length === 0 && (
          <div className="card rounded-lg p-12 text-center">
            <Users className="w-10 h-10 text-[var(--fg-subtle)] mx-auto mb-4" />
            <div className="text-sm text-[var(--fg-muted)]">
              Henüz başvuru yok. Form adresi: /basvuru
            </div>
          </div>
        )}
        {filtered.map((r) => (
          <ApplicationCard
            key={r.id}
            row={r}
            open={open === r.id}
            onToggle={() => setOpen(open === r.id ? null : r.id)}
            isAdmin={isAdmin}
            onChange={(patch) => patchLocal(r.id, patch)}
            onDelete={() => setRows((rs) => rs.filter((x) => x.id !== r.id))}
          />
        ))}
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div className="card rounded-lg p-4">
      <div
        className={`text-2xl font-semibold ${
          highlight && value > 0 ? "text-[var(--accent)]" : "text-[var(--fg)]"
        }`}
      >
        {value}
      </div>
      <div className="text-xs text-[var(--fg-muted)] mt-1">{label}</div>
    </div>
  );
}

function ApplicationCard({
  row: r,
  open,
  onToggle,
  isAdmin,
  onChange,
  onDelete,
}: {
  row: ApplicationRow;
  open: boolean;
  onToggle: () => void;
  isAdmin: boolean;
  onChange: (patch: Partial<ApplicationRow>) => void;
  onDelete: () => void;
}) {
  const [note, setNote] = useState(r.adminNote ?? "");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function patch(body: { status?: string; adminNote?: string | null }) {
    setBusy(true);
    setMsg(null);
    const res = await fetch(`/api/admin/applications/${r.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setBusy(false);
    if (!res.ok) {
      setMsg("Kaydedilemedi.");
      return false;
    }
    onChange(body as Partial<ApplicationRow>);
    setMsg("Kaydedildi.");
    return true;
  }

  async function remove() {
    if (
      !confirm(
        `${r.fullName} başvurusu kalıcı olarak silinecek. Bu işlem geri alınamaz. Devam edilsin mi?`
      )
    )
      return;
    setBusy(true);
    const res = await fetch(`/api/admin/applications/${r.id}`, {
      method: "DELETE",
    });
    setBusy(false);
    if (res.ok) onDelete();
    else setMsg("Silinemedi.");
  }

  return (
    <div className="card rounded-md">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full text-start p-4 flex items-center gap-4"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <StatusBadge status={r.status} />
            <span className="text-sm font-medium text-[var(--fg)]">
              {r.fullName}
            </span>
            <span className="text-xs text-[var(--fg-subtle)] truncate">
              {r.department} · {r.classYear}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {r.competitions.map((c) => (
              <span
                key={c}
                className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--accent-soft)] text-[var(--accent)] font-mono"
              >
                {labelOf(COMPETITIONS, c)}
              </span>
            ))}
            <span className="text-[10px] px-1.5 py-0.5 text-[var(--fg-subtle)]">
              {labelOf(TEAM_STATUSES, r.teamStatus)}
            </span>
          </div>
        </div>
        <div className="text-xs text-[var(--fg-subtle)] font-mono shrink-0 hidden sm:block">
          {new Date(r.createdAt).toLocaleDateString("tr-TR")}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-[var(--fg-subtle)] shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="border-t border-[var(--border)] p-4 md:p-6 grid md:grid-cols-[1fr_280px] gap-6">
          <div className="space-y-4 text-sm min-w-0">
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[var(--fg-muted)]">
              <a
                href={`mailto:${r.email}`}
                className="inline-flex items-center gap-1.5 hover:text-[var(--accent)]"
              >
                <Mail className="w-3.5 h-3.5" />
                {r.email}
              </a>
              {r.phone && (
                <a
                  href={`tel:${r.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-1.5 hover:text-[var(--accent)]"
                >
                  <Phone className="w-3.5 h-3.5" />
                  {r.phone}
                </a>
              )}
              <span>No: {r.studentNo}</span>
              <span>{r.university}</span>
            </div>

            <Detail label="Yetkinlikler">
              <div className="flex flex-wrap gap-1.5">
                {r.skills.map((s) => (
                  <span
                    key={s}
                    className="text-xs px-2 py-0.5 rounded border border-[var(--border-strong)] text-[var(--fg)]"
                  >
                    {labelOf(SKILLS, s)}
                  </span>
                ))}
              </div>
              {r.otherSkills && (
                <p className="text-[var(--fg-muted)] mt-2">{r.otherSkills}</p>
              )}
            </Detail>

            {r.portfolioUrl && (
              <Detail label="Portfolyo">
                <a
                  href={r.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-[var(--accent)] hover:underline break-all"
                >
                  {r.portfolioUrl}
                </a>
              </Detail>
            )}

            {r.experience && (
              <Detail label="Deneyim">
                <p className="text-[var(--fg-muted)] whitespace-pre-wrap">
                  {r.experience}
                </p>
              </Detail>
            )}

            <Detail label="Motivasyon">
              <p className="text-[var(--fg-muted)] whitespace-pre-wrap">
                {r.motivation}
              </p>
            </Detail>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[var(--fg-subtle)] mb-2">
                Durum
              </label>
              <select
                value={r.status}
                disabled={busy}
                onChange={(e) => patch({ status: e.target.value })}
                className={`${selectCls} w-full`}
              >
                {APPLICATION_STATUSES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[var(--fg-subtle)] mb-2">
                Not
              </label>
              <textarea
                rows={4}
                maxLength={2000}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Görüşme notu, hangi takıma uygun…"
                className={`${selectCls} w-full`}
              />
              <button
                type="button"
                disabled={busy || note === (r.adminNote ?? "")}
                onClick={() => patch({ adminNote: note })}
                className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[var(--accent)] text-[var(--bg)] font-medium rounded-md disabled:opacity-40"
              >
                <Save className="w-3.5 h-3.5" />
                Notu kaydet
              </button>
            </div>

            {msg && (
              <div className="text-xs text-[var(--fg-muted)]">{msg}</div>
            )}

            {isAdmin && (
              <button
                type="button"
                disabled={busy}
                onClick={remove}
                className="inline-flex items-center gap-1.5 text-xs text-[var(--fg-subtle)] hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Başvuruyu sil
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Detail({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-[var(--fg-subtle)] mb-1.5">
        {label}
      </div>
      {children}
    </div>
  );
}
