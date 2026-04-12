"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";

export function Projects() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {projects.map((p, i) => (
        <Reveal key={p.name} delay={i * 0.05}>
          <motion.a
            href={p.url}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="group card rounded-lg p-6 h-full block hover:border-[var(--accent)]/40"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <GithubIcon className="w-4 h-4 text-[var(--fg-subtle)]" />
                <h3 className="text-base font-medium font-mono text-[var(--fg)]">
                  {p.name}
                </h3>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[var(--fg-subtle)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <p className="text-sm text-[var(--fg-muted)] leading-relaxed mb-5">
              {p.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--border)] text-[var(--fg-subtle)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.a>
        </Reveal>
      ))}
    </div>
  );
}
