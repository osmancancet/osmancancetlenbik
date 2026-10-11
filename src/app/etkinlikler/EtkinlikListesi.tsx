"use client";

import { useMemo, useState } from "react";
import {
  AUDIENCES,
  EVENT_TYPES,
  formatDate,
  type ListedEvent,
} from "@/lib/etkinlikler";
import {
  CalendarDays,
  ExternalLink,
  Globe,
  MapPin,
  Radar,
  Search,
  Trophy,
} from "lucide-react";

function toggle(set: Set<string>, value: string): Set<string> {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

function Countdown({ days }: { days: number | null }) {
  if (days === null) {
    return (
      <div className="flex md:flex-col items-baseline md:items-center gap-2 md:gap-1 text-[var(--fg-subtle)]">
        <span className="font-mono text-xl md:text-2xl">—</span>
        <span className="text-[10px] uppercase tracking-wider font-mono">
          tarih yok
        </span>
      </div>
    );
  }
  const tone =
    days <= 3
      ? "text-red-400"
      : days <= 10
        ? "text-amber-300"
        : "text-[var(--accent)]";
  return (
    <div
      className={`flex md:flex-col items-baseline md:items-center gap-2 md:gap-1 ${tone}`}
    >
      <span className="font-mono text-xl md:text-3xl tabular-nums leading-none">
        {days === 0 ? "bugün" : days}
      </span>
      <span className="text-[10px] uppercase tracking-wider font-mono">
        {days === 0 ? "son gün" : "gün kaldı"}
      </span>
    </div>
  );
}

const chipBase =
  "text-xs px-3 py-1.5 rounded-full border font-mono transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]";
const chipOff =
  "border-[var(--border-strong)] text-[var(--fg-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)]";
const chipOn = "border-[var(--accent)] bg-[var(--accent)] text-[var(--bg)]";

export function EtkinlikListesi({ events }: { events: ListedEvent[] }) {
  const [types, setTypes] = useState<Set<string>>(new Set());
  const [audiences, setAudiences] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");

  // Yalnızca listede gerçekten bulunan türleri göster.
  const presentTypes = useMemo(
    () => EVENT_TYPES.filter((t) => events.some((e) => e.type === t)),
    [events]
  );

  const visible = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("tr");
    return events.filter((e) => {
      if (types.size && !types.has(e.type)) return false;
      if (audiences.size && !e.audience.some((a) => audiences.has(a)))
        return false;
      if (q) {
        const hay = [e.name, e.organizer, e.location, e.summary, e.type]
          .filter(Boolean)
          .join(" ")
          .toLocaleLowerCase("tr");
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [events, types, audiences, query]);

  if (events.length === 0) {
    return (
      <div className="card rounded-lg p-12 text-center">
        <Radar className="w-10 h-10 text-[var(--fg-subtle)] mx-auto mb-4" />
        <p className="text-[var(--fg)]">Liste ilk taramayla dolacak.</p>
        <p className="text-sm text-[var(--fg-muted)] mt-2">
          Her sabah yeni hackathon, datathon, game jam ve CTF’ler aranıp buraya
          ekleniyor.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-3 mb-6">
        {presentTypes.length > 1 && (
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Etkinlik türü"
          >
            {presentTypes.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={types.has(t)}
                onClick={() => setTypes((s) => toggle(s, t))}
                className={`${chipBase} ${types.has(t) ? chipOn : chipOff}`}
              >
                {t}
              </button>
            ))}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Kimler için">
            {AUDIENCES.map((a) => (
              <button
                key={a}
                type="button"
                aria-pressed={audiences.has(a)}
                onClick={() => setAudiences((s) => toggle(s, a))}
                className={`${chipBase} ${audiences.has(a) ? chipOn : chipOff}`}
              >
                {a}
              </button>
            ))}
          </div>
          <label className="relative flex-1 min-w-[200px]">
            <span className="sr-only">Etkinliklerde ara</span>
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--fg-subtle)]" />
            <input
              id="etkinlik-ara"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Kurum, şehir veya konu ara"
              className="w-full bg-[var(--bg-card)] border border-[var(--border-strong)] rounded-md pl-9 pr-3 py-2 text-sm text-[var(--fg)] placeholder:text-[var(--fg-subtle)] focus:outline-none focus:border-[var(--accent)]"
            />
          </label>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="card rounded-lg p-8 text-center text-sm text-[var(--fg-muted)]">
          Bu filtrelere uyan etkinlik yok.
        </div>
      ) : (
        <ol className="space-y-4">
          {visible.map((e) => (
            <li
              key={e.id}
              className="card rounded-lg p-5 md:p-6 grid md:grid-cols-[96px_1fr] gap-4 md:gap-6 items-start"
            >
              <div className="md:border-r md:border-[var(--border)] md:pr-4 md:self-stretch md:flex md:items-center md:justify-center">
                <Countdown days={e.daysLeft} />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--border-strong)] text-[var(--accent)] font-mono">
                    {e.type}
                  </span>
                  {e.audience.map((a) => (
                    <span
                      key={a}
                      className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--border)] text-[var(--fg-muted)] font-mono"
                    >
                      {a}
                    </span>
                  ))}
                  {e.isNew && (
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--accent-soft)] text-[var(--accent)] font-mono">
                      yeni
                    </span>
                  )}
                </div>

                <h2 className="text-lg md:text-xl font-medium text-[var(--fg)] mb-2 break-words">
                  {e.url ? (
                    <a
                      href={e.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--accent)] transition-colors"
                    >
                      {e.name}
                    </a>
                  ) : (
                    e.name
                  )}
                </h2>

                {e.summary && (
                  <p className="text-sm text-[var(--fg-muted)] leading-relaxed mb-3">
                    {e.summary}
                  </p>
                )}

                <dl className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-[var(--fg-subtle)] font-mono">
                  {e.deadline && (
                    <div className="flex items-center gap-1.5">
                      <dt className="sr-only">Son başvuru</dt>
                      <CalendarDays className="w-3 h-3" aria-hidden />
                      <dd>
                        Son başvuru{" "}
                        <span className="text-[var(--fg)]">
                          {formatDate(e.deadline)}
                        </span>
                      </dd>
                    </div>
                  )}
                  {e.eventDate && (
                    <div className="flex items-center gap-1.5">
                      <dt className="sr-only">Etkinlik tarihi</dt>
                      <dd>Etkinlik {e.eventDate}</dd>
                    </div>
                  )}
                  {e.location && (
                    <div className="flex items-center gap-1.5">
                      <dt className="sr-only">Yer</dt>
                      {e.online ? (
                        <Globe className="w-3 h-3" aria-hidden />
                      ) : (
                        <MapPin className="w-3 h-3" aria-hidden />
                      )}
                      <dd>{e.location}</dd>
                    </div>
                  )}
                  {e.organizer && (
                    <div>
                      <dt className="sr-only">Düzenleyen</dt>
                      <dd>{e.organizer}</dd>
                    </div>
                  )}
                  {e.prize && (
                    <div className="flex items-center gap-1.5">
                      <dt className="sr-only">Ödül</dt>
                      <Trophy className="w-3 h-3" aria-hidden />
                      <dd>{e.prize}</dd>
                    </div>
                  )}
                </dl>

                {e.url && (
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border border-[var(--border-strong)] text-[var(--fg-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Etkinlik sayfası
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
