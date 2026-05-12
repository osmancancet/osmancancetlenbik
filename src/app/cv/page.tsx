import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/ui/Reveal";
import { cv } from "@/data/cv";
import { profile } from "@/data/profile";
import {
  Download,
  GraduationCap,
  Briefcase,
  Award,
  Languages,
  FlaskConical,
  FileText,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Özgeçmiş",
  description: "Akademik özgeçmiş — eğitim, deneyim, ödüller, yetenekler.",
};

export default function CVPage() {
  return (
    <PageShell
      eyebrow="Özgeçmiş"
      title="CV"
      subtitle={profile.title}
    >
      <div className="max-w-3xl">
        <Reveal>
          <div className="flex items-center gap-3 mb-12">
            <a
              href="/api/cv/pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-[var(--bg)] font-medium rounded-md hover:opacity-90 transition-opacity"
            >
              <Download className="w-4 h-4" />
              PDF İndir
            </a>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--border-strong)] text-[var(--fg)] rounded-md hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              İletişim
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-base text-[var(--fg-muted)] leading-relaxed mb-12">
            {cv.summary}
          </p>
        </Reveal>

        <Reveal>
          <div className="mb-12">
            <SectionTitle icon={FlaskConical} title="Araştırma Alanları" />
            <ul className="space-y-2">
              {cv.research.map((r, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-[var(--fg-muted)]"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Section icon={Briefcase} title="Deneyim">
          {cv.experience.map((e, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <Entry e={e} />
            </Reveal>
          ))}
        </Section>

        <Section icon={GraduationCap} title="Eğitim">
          {cv.education.map((e, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <Entry e={e} />
            </Reveal>
          ))}
        </Section>

        <Section icon={FileText} title="Yayınlar">
          {cv.publications.map((p, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div className="card rounded-lg p-5 mb-3">
                <div className="flex items-start justify-between gap-4 mb-1">
                  <div className="text-sm font-medium text-[var(--fg)] leading-snug">
                    {p.title}
                  </div>
                  <div className="text-xs font-mono text-[var(--accent)] shrink-0">
                    {p.year}
                  </div>
                </div>
                <div className="text-xs text-[var(--fg-muted)] italic">
                  {p.venue}
                </div>
              </div>
            </Reveal>
          ))}
        </Section>

        <Section icon={Award} title="Ödüller">
          {cv.awards.map((a, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div className="card rounded-lg p-5 mb-3">
                <div className="text-sm font-medium text-[var(--fg)]">
                  {a.title}
                </div>
                <div className="text-xs text-[var(--fg-muted)] mt-1">
                  {a.org} · {a.year}
                </div>
              </div>
            </Reveal>
          ))}
        </Section>

        <Reveal>
          <div className="mb-12">
            <SectionTitle icon={Award} title="Yetenekler" />
            <div className="grid md:grid-cols-2 gap-3">
              {cv.skills.map((s) => (
                <div key={s.category} className="card rounded-lg p-5">
                  <div className="text-xs uppercase tracking-wider text-[var(--fg-subtle)] font-mono mb-3">
                    {s.category}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {s.items.map((it) => (
                      <span
                        key={it}
                        className="text-xs px-2 py-1 rounded border border-[var(--border-strong)] text-[var(--fg-muted)]"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Section icon={Languages} title="Diller">
          <div className="grid md:grid-cols-2 gap-3">
            {cv.languages.map((l) => (
              <div key={l.name} className="card rounded-lg p-4 flex items-center justify-between">
                <span className="text-sm text-[var(--fg)]">{l.name}</span>
                <span className="text-xs font-mono text-[var(--accent)]">
                  {l.level}
                </span>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </PageShell>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Award;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-12">
      <SectionTitle icon={Icon} title={title} />
      <div>{children}</div>
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  title,
}: {
  icon: typeof Award;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-5">
      <Icon className="w-3 h-3" />
      {title}
    </div>
  );
}

function Entry({ e }: { e: (typeof cv.experience)[number] }) {
  return (
    <div className="card rounded-lg p-5 mb-3">
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="min-w-0">
          <div className="text-base font-medium text-[var(--fg)]">
            {e.title}
          </div>
          <div className="text-sm text-[var(--fg-muted)] mt-0.5">
            {e.org}
            {e.location && ` · ${e.location}`}
          </div>
        </div>
        <div className="text-xs font-mono text-[var(--fg-subtle)] shrink-0">
          {e.start} – {e.end}
        </div>
      </div>
      {e.description && (
        <p className="text-sm text-[var(--fg-muted)] leading-relaxed mt-3">
          {e.description}
        </p>
      )}
    </div>
  );
}
