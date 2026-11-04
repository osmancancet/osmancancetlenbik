"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { AboutExtra } from "@/data/aboutPage";
import { profile, profileI18n } from "@/data/profile";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import type { Locale } from "@/lib/i18n";

const EXPERTISE_LABEL: Record<Locale, string> = {
  tr: "Uzmanlık",
  en: "Expertise",
  de: "Fachgebiete",
  ar: "مجالات الخبرة",
};

/** Hakkımda bölümünün alt başlıkları (H2). */
const SECTION_HEADINGS: Record<Locale, { bio: string; stats: string }> = {
  tr: { bio: "Biyografi", stats: "Rakamlarla" },
  en: { bio: "Biography", stats: "At a glance" },
  de: { bio: "Biografie", stats: "Auf einen Blick" },
  ar: { bio: "نبذة", stats: "بالأرقام" },
};

const HEADING_CLASS =
  "text-xs font-normal uppercase tracking-[0.18em] text-[var(--fg-subtle)] font-mono mb-3";

export function About({
  locale = "tr",
  extra = null,
}: {
  locale?: Locale;
  extra?: AboutExtra | null;
}) {
  const copy = profileI18n[locale];
  const headings = SECTION_HEADINGS[locale];

  return (
    <div>
    <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 items-start">
      <Reveal>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-sm group"
        >
          <div
            aria-hidden
            className="absolute -inset-6 rounded-full opacity-60 blur-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(0,255,65,0.20) 0%, transparent 70%)",
            }}
          />
          <div className="relative aspect-square overflow-hidden rounded-full bg-black border-2 border-[var(--accent)]/60 shadow-[0_0_60px_-15px_rgba(0,255,65,0.5)]">
            <Image
              src="/profile.webp"
              alt={profile.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              style={{
                filter: "grayscale(0.35) brightness(0.92) contrast(1.08)",
              }}
              sizes="(max-width: 768px) 100vw, 384px"
            />
            {/* Vignette */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at center, transparent 35%, rgba(0,0,0,0.55) 78%, #000 100%)",
              }}
            />
          </div>
          <div className="mt-4 space-y-1 font-mono text-xs text-[var(--fg-subtle)]">
            <div>{copy.location}</div>
          </div>
        </motion.div>
      </Reveal>

      <div>
        <Reveal>
          <h2 className={HEADING_CLASS}>{headings.bio}</h2>
          <div className="space-y-4 text-base md:text-lg leading-relaxed text-[var(--fg-muted)]">
            <p>{copy.bio}</p>
            {extra?.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
            <p>
              <span className="text-[var(--fg)] font-medium">
                {copy.institution}
              </span>
              <br />
              <span className="text-[var(--fg-subtle)]">
                {copy.department}
              </span>
            </p>
            {extra && (
              <>
                <div>
                  <h3 className="text-sm font-medium text-[var(--fg)] mb-2">
                    {extra.researchTitle}
                  </h3>
                  <ul className="list-disc ps-5 space-y-1">
                    {extra.research.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[var(--fg)] mb-2">
                    {extra.publicationsTitle}
                  </h3>
                  <ul className="space-y-3">
                    {extra.publications.map((item) => (
                      <li key={item.title}>
                        <span className="text-[var(--fg)]">{item.title}</span>
                        <span className="block text-sm text-[var(--fg-subtle)]">
                          {item.detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                {extra.book && <p>{extra.book}</p>}
                <p>{extra.languages}</p>
              </>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8">
            <h2 className={HEADING_CLASS}>
              {EXPERTISE_LABEL[locale]}
            </h2>
            {extra && (
              <p className="text-base leading-relaxed text-[var(--fg-muted)] mb-4">
                {extra.expertise}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {copy.expertise.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-sm border border-[var(--border-strong)] rounded-md text-[var(--fg-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            {extra && (
              <dl className="mt-6 space-y-3">
                {extra.skillGroups.map((group) => (
                  <div key={group.category}>
                    <dt className="text-xs font-mono uppercase tracking-wider text-[var(--fg-subtle)]">
                      {group.category}
                    </dt>
                    <dd className="text-sm text-[var(--fg-muted)] mt-1">
                      {group.items}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </Reveal>

        <h2 className={`${HEADING_CLASS} mt-12`}>{headings.stats}</h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {profile.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="rounded-lg bg-[var(--bg-card)] border border-[var(--border)] p-5 text-center transition-colors hover:border-[var(--accent)]/40"
            >
              <div className="text-3xl md:text-4xl font-semibold text-[var(--fg)]">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-[var(--fg-subtle)]">
                {copy.statLabels[i]}
              </div>
            </motion.div>
          ))}
        </motion.div>
        {extra && (
          <p className="mt-4 text-sm leading-relaxed text-[var(--fg-muted)]">
            {extra.stats}
          </p>
        )}
      </div>
    </div>

    {extra && extra.faq.length > 0 && (
      <section className="mt-16" aria-labelledby="hakkimda-sss">
        <h2 id="hakkimda-sss" className={HEADING_CLASS}>
          {extra.faqTitle}
        </h2>
        <div className="grid gap-3">
          {extra.faq.map((item) => (
            <article key={item.q} className="card rounded-lg p-5">
              <h3 className="text-base font-medium text-[var(--fg)]">{item.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">
                {item.a}
              </p>
            </article>
          ))}
        </div>
      </section>
    )}
    </div>
  );
}
