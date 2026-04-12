import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function PageShell({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="relative pt-32 pb-24 px-6">
      <div className="relative max-w-6xl mx-auto">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        {children}
      </div>
    </section>
  );
}
