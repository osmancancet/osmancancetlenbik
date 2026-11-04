"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ShieldCheck, MapPin, Share2 } from "lucide-react";
import TR from "@/data/turkiye-iller.json";
import { SCAM_KINDS, type ScamKindId } from "@/data/dolandiricilik";
import type { HaritaSummary } from "@/lib/harita";

type Province = { name: string; plate: number; d: string; cx: number; cy: number };
const PROVINCES = (TR as { provinces: Province[] }).provinces;
const BY_PLATE = new Map(PROVINCES.map((p) => [p.plate, p]));
const SORTED = [...PROVINCES].sort((a, b) => a.name.localeCompare(b.name, "tr"));
const KIND_LABEL = new Map<string, string>(SCAM_KINDS.map((k) => [k.id, k.label]));
const SCALE = ["#fde2e4", "#fbb4bd", "#f6808f", "#e94b62", "#c51f3d", "#8a0f28"];
const PAGE_URL = "https://osmancancetlenbik.com/#harita";

function fill(n: number, max: number) {
  if (!n) return "var(--surface-2, rgba(127,127,127,0.12))";
  const k = Math.min(SCALE.length - 1, Math.floor((Math.log(n + 1) / Math.log(max + 1)) * SCALE.length));
  return SCALE[Math.max(0, k)];
}

function pct(n: number, total: number) {
  return total ? Math.round((n / total) * 100) : 0;
}

export function HaritaClient({ initial }: { initial: HaritaSummary }) {
  const [summary, setSummary] = useState(initial);
  const [plate, setPlate] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [kind, setKind] = useState<ScamKindId | "">("");
  const [lost, setLost] = useState(false);
  const [hp, setHp] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Ana sayfa saatlik önbellekte; sayılar açılışta tazelenir.
  useEffect(() => {
    fetch("/api/harita")
      .then((r) => (r.ok ? r.json() : null))
      .then((j: HaritaSummary | null) => j && setSummary(j))
      .catch(() => {});
  }, []);

  function pick(n: number) {
    setPlate(n);
    if (window.innerWidth < 1024) formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const max = useMemo(() => Math.max(1, ...Object.values(summary.byPlate)), [summary]);
  const topPlates = useMemo(
    () => Object.entries(summary.byPlate).map(([p, n]) => [Number(p), n] as const).sort((a, b) => b[1] - a[1]).slice(0, 5),
    [summary],
  );
  const kinds = useMemo(
    () => SCAM_KINDS.map((k) => [k.id, summary.byKind[k.id] ?? 0] as const).sort((a, b) => b[1] - a[1]),
    [summary],
  );
  const kindMax = Math.max(1, ...kinds.map(([, n]) => n));
  const focus = hover ?? plate;
  const focusProv = focus ? BY_PLATE.get(focus) : null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!plate || !kind || state === "sending") return;
    setState("sending");
    setError(null);
    try {
      const r = await fetch("/api/harita", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plate, kind, lost, website: hp }),
      });
      const j = await r.json().catch(() => ({}));
      if (j.summary) setSummary(j.summary);
      if (!r.ok) {
        setError(j.error ?? "Bir hata oluştu.");
        setState(r.status === 409 ? "done" : "idle");
        return;
      }
      setState("done");
    } catch {
      setError("Bağlantı hatası.");
      setState("idle");
    }
  }

  const shareText = plate && kind
    ? `${BY_PLATE.get(plate)?.name}'dan Türkiye'nin Dolandırıcılık Haritası'na işaret koydum: "${KIND_LABEL.get(kind)}". Sana hangi tuzak kuruldu? Anonim, 10 saniye:`
    : "Türkiye'nin Dolandırıcılık Haritası: Sana hangi tuzak kuruldu? Anonim, 10 saniye:";
  const share = [
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(PAGE_URL)}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${PAGE_URL}`)}` },
    { label: "X", href: `https://x.com/intent/post?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(PAGE_URL)}` },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="card rounded-lg p-4 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
          <div>
            <div className="text-3xl font-semibold text-[var(--fg)] tabular-nums">{summary.total.toLocaleString("tr-TR")}</div>
            <div className="text-xs text-[var(--fg-muted)]">bildirim · {Object.keys(summary.byPlate).length} il</div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-semibold text-rose-500 tabular-nums">%{pct(summary.lost, summary.total)}</div>
            <div className="text-xs text-[var(--fg-muted)]">para ya da hesap kaybetti</div>
          </div>
        </div>
        {summary.demo && (
          <p className="mb-3 rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs text-amber-600 dark:text-amber-300">
            Önizleme: bu harita örnek veriyle gösteriliyor.
          </p>
        )}

        <div className="relative">
          <svg viewBox={`0 0 ${TR.width} ${TR.height}`} className="w-full h-auto select-none" role="img" aria-label="Türkiye il haritası">
            {PROVINCES.map((p) => {
              const n = summary.byPlate[p.plate] ?? 0;
              const active = p.plate === plate;
              return (
                <path
                  key={p.plate}
                  d={p.d}
                  fill={fill(n, max)}
                  stroke={active ? "var(--accent)" : "var(--bg, #fff)"}
                  strokeWidth={active ? 3 : 1}
                  className="cursor-pointer transition-[fill] duration-300 hover:brightness-90"
                  onMouseEnter={() => setHover(p.plate)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => pick(p.plate)}
                >
                  <title>{`${p.name}: ${n} bildirim`}</title>
                </path>
              );
            })}
          </svg>
          {focusProv && (
            <div className="pointer-events-none absolute left-2 top-2 rounded-md border border-[var(--border)] bg-[var(--bg)]/90 px-3 py-1.5 text-sm shadow-sm backdrop-blur">
              <span className="font-semibold text-[var(--fg)]">{focusProv.name}</span>
              <span className="text-[var(--fg-muted)]"> · {summary.byPlate[focusProv.plate] ?? 0} bildirim</span>
            </div>
          )}
        </div>
        <div className="mt-3 flex items-center gap-2 text-[11px] text-[var(--fg-subtle)]">
          <span>az</span>
          {SCALE.map((c) => <span key={c} className="h-2.5 w-6 rounded-sm" style={{ background: c }} />)}
          <span>çok</span>
          <span className="ml-auto">Haritada iline dokun → formda seçilir</span>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold text-[var(--fg)] mb-2">En çok bildirim gelen iller</h2>
            <ol className="space-y-1.5 text-sm">
              {topPlates.map(([p, n], i) => (
                <li key={p} className="flex justify-between gap-2">
                  <span className="text-[var(--fg-muted)]">{i + 1}. {BY_PLATE.get(p)?.name}</span>
                  <span className="tabular-nums text-[var(--fg)]">{n}</span>
                </li>
              ))}
              {!topPlates.length && <li className="text-[var(--fg-subtle)]">İlk işareti sen koy.</li>}
            </ol>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[var(--fg)] mb-2">Yöntemler</h2>
            <ul className="space-y-1.5">
              {kinds.filter(([, n]) => n > 0).slice(0, 6).map(([id, n]) => (
                <li key={id} className="text-xs">
                  <div className="flex justify-between gap-2 text-[var(--fg-muted)]">
                    <span>{KIND_LABEL.get(id)}</span>
                    <span className="tabular-nums">%{pct(n, summary.total)}</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-[var(--border)]">
                    <div className="h-1.5 rounded-full bg-rose-500" style={{ width: `${(n / kindMax) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <form ref={formRef} onSubmit={submit} className="scroll-mt-24 card rounded-lg p-5 h-fit lg:sticky lg:top-24 space-y-4">
        <h2 className="text-lg font-semibold text-[var(--fg)] flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[var(--accent)]" /> İşaretini koy
        </h2>
        <label className="block text-sm">
          <span className="text-[var(--fg-muted)]">İl</span>
          <select
            className="mt-1 w-full rounded-md border border-[var(--border-strong)] bg-transparent px-3 py-2 text-[var(--fg)]"
            value={plate ?? ""}
            onChange={(e) => setPlate(e.target.value ? Number(e.target.value) : null)}
            disabled={state === "done"}
            required
          >
            <option value="">Seç…</option>
            {SORTED.map((p) => <option key={p.plate} value={p.plate}>{p.name}</option>)}
          </select>
        </label>
        <fieldset className="text-sm">
          <legend className="text-[var(--fg-muted)] mb-1">Sana / yakınına denenen yöntem</legend>
          <div className="grid gap-1.5">
            {SCAM_KINDS.map((k) => (
              <label key={k.id} className={`flex items-center gap-2 rounded-md border px-3 py-2 cursor-pointer transition-colors ${kind === k.id ? "border-[var(--accent)] bg-[var(--accent-soft)]" : "border-[var(--border)] hover:border-[var(--border-strong)]"}`}>
                <input type="radio" name="kind" value={k.id} checked={kind === k.id} onChange={() => setKind(k.id)} disabled={state === "done"} className="accent-[var(--accent)]" />
                <span className="text-[var(--fg)]">{k.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className="flex items-center gap-2 text-sm text-[var(--fg)]">
          <input type="checkbox" checked={lost} onChange={(e) => setLost(e.target.checked)} disabled={state === "done"} className="accent-rose-500" />
          Para ya da hesap kaybı oldu
        </label>
        <input type="text" name="website" value={hp} onChange={(e) => setHp(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

        {state !== "done" ? (
          <button type="submit" disabled={!plate || !kind || state === "sending"} className="w-full rounded-md bg-[var(--accent)] px-4 py-2.5 font-semibold text-[var(--bg)] disabled:opacity-40">
            {state === "sending" ? "Gönderiliyor…" : "Haritaya ekle"}
          </button>
        ) : (
          <div className="rounded-md border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-[var(--fg)]">
            {error ?? "Teşekkürler, işaretin haritada."} Şimdi bir kişiyi daha uyar:
          </div>
        )}
        {error && state !== "done" && <p className="text-sm text-rose-500">{error}</p>}

        <div className="grid grid-cols-3 gap-2">
          {share.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1 rounded-md border border-[var(--border)] px-2 py-2 text-xs text-[var(--fg-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]">
              <Share2 className="w-3 h-3" /> {s.label}
            </a>
          ))}
        </div>

        <p className="flex gap-2 text-[11px] leading-relaxed text-[var(--fg-subtle)]">
          <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-[var(--accent)]" />
          Yalnızca il, yöntem ve kayıp olup olmadığı saklanır. IP adresin kaydedilmez; günde bir bildirim sınırı için gün değiştikçe yenilenen tek yönlü bir özet kullanılır. Kimliğini belirleyen hiçbir veri istenmez (KVKK).
        </p>
      </form>
    </div>
  );
}
