"use client";

import { motion } from "framer-motion";
import { BookOpen, FileText, Mic, Code2 } from "lucide-react";
import { Counter } from "@/components/ui/Counter";

type Stats = {
  courses: number;
  posts: number;
  conferences: number;
  publications: number;
};

const ITEMS: Array<{
  key: keyof Stats;
  label: string;
  icon: typeof BookOpen;
}> = [
  { key: "courses", label: "Aktif Ders", icon: BookOpen },
  { key: "posts", label: "Yazı", icon: FileText },
  { key: "conferences", label: "Konferans", icon: Mic },
  { key: "publications", label: "Akademik Yayın", icon: Code2 },
];

export function HomeStats({ stats }: { stats: Stats }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
      className="grid grid-cols-2 md:grid-cols-4 gap-3"
    >
      {ITEMS.map((item) => {
        const Icon = item.icon;
        const value = stats[item.key];
        return (
          <motion.div
            key={item.key}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -3 }}
            className="card rounded-lg p-6 hover:border-[var(--accent)]/40 transition-colors"
          >
            <Icon className="w-5 h-5 text-[var(--accent)] mb-4" />
            <div className="text-4xl md:text-5xl font-semibold text-[var(--fg)]">
              <Counter value={value} />
            </div>
            <div className="mt-2 text-xs uppercase tracking-wider text-[var(--fg-subtle)]">
              {item.label}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
