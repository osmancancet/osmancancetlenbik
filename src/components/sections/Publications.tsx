"use client";

import { motion } from "framer-motion";
import { publications } from "@/data/publications";
import { Reveal } from "@/components/ui/Reveal";
import { FileText, ExternalLink } from "lucide-react";

export function Publications() {
  return (
    <div className="space-y-4">
      {publications.map((pub, i) => (
        <Reveal key={pub.title} delay={i * 0.05}>
          <motion.a
            href={pub.url}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="group card rounded-lg p-6 md:p-7 grid md:grid-cols-[auto_1fr_auto] gap-5 items-start hover:border-[var(--accent)]/40 block"
          >
            <div className="flex md:flex-col items-center gap-3 md:gap-2 md:w-20 md:border-r md:border-[var(--border)] md:pr-4">
              <FileText className="w-5 h-5 text-[var(--accent)]" />
              <span className="font-mono text-sm text-[var(--fg-muted)]">
                {pub.year}
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--border-strong)] text-[var(--accent)] font-mono">
                  {pub.type}
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-medium text-[var(--fg)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                {pub.title}
              </h3>
              <p className="text-sm text-[var(--fg-muted)] mb-1">
                {pub.authors}
              </p>
              <p className="text-xs text-[var(--fg-subtle)] italic mb-4">
                {pub.venue}
              </p>
              <div className="flex flex-wrap gap-2">
                {pub.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--border-strong)] text-[var(--fg-subtle)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <ExternalLink className="hidden md:block w-4 h-4 text-[var(--fg-subtle)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </motion.a>
        </Reveal>
      ))}
    </div>
  );
}
