"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Megaphone, X, ArrowRight } from "lucide-react";

type AnnouncementSummary = {
  id: string;
  title: string;
  body: string;
  type: string;
};

export function AnnouncementBar({
  announcement,
}: {
  announcement: AnnouncementSummary | null;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!announcement) return;
    const dismissed = localStorage.getItem(`announcement-dismissed-${announcement.id}`);
    if (!dismissed) setVisible(true);
  }, [announcement]);

  function dismiss() {
    if (!announcement) return;
    localStorage.setItem(`announcement-dismissed-${announcement.id}`, "1");
    setVisible(false);
  }

  if (!announcement) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-16 left-0 right-0 z-40 bg-[var(--accent-soft)] border-b border-[var(--accent)]/20 backdrop-blur-md"
        >
          <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center gap-3">
            <Megaphone className="w-4 h-4 text-[var(--accent)] shrink-0" />
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--accent)]/40 text-[var(--accent)] font-mono shrink-0">
              {announcement.type}
            </span>
            <Link
              href="/duyurular"
              className="flex-1 min-w-0 text-sm text-[var(--fg)] hover:text-[var(--accent)] transition-colors truncate"
            >
              <span className="font-medium">{announcement.title}</span>
              <span className="ml-2 text-[var(--fg-muted)] hidden sm:inline">
                — {announcement.body}
              </span>
            </Link>
            <Link
              href="/duyurular"
              aria-label="Tüm duyurular"
              className="hidden md:inline-flex items-center gap-1 text-xs text-[var(--accent)] hover:underline shrink-0"
            >
              Tümü <ArrowRight className="w-3 h-3" />
            </Link>
            <button
              onClick={dismiss}
              aria-label="Kapat"
              className="p-1 text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
