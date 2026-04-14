"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";

export function About() {
  return (
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
              src="/profile.png"
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
            <div>{profile.location}</div>
          </div>
        </motion.div>
      </Reveal>

      <div>
        <Reveal>
          <div className="space-y-4 text-base md:text-lg leading-relaxed text-[var(--fg-muted)]">
            <p>{profile.bio}</p>
            <p>
              <span className="text-[var(--fg)] font-medium">
                {profile.institution}
              </span>
              <br />
              <span className="text-[var(--fg-subtle)]">
                {profile.department}
              </span>
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8">
            <div className="text-xs uppercase tracking-[0.18em] text-[var(--fg-subtle)] font-mono mb-3">
              Uzmanlık
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.expertise.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-sm border border-[var(--border-strong)] rounded-md text-[var(--fg-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
          }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {profile.stats.map((stat) => (
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
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
