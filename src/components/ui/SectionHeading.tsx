import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`mb-16 max-w-3xl ${alignCls}`}>
      <Reveal>
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-4">
          <span className="w-6 h-px bg-[var(--accent)]" />
          {eyebrow}
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--fg)]">
          {title}
        </h1>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-[var(--fg-muted)] text-lg leading-relaxed">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
