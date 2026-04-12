import type { ReactNode } from "react";

export function GradientText({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`text-[var(--fg)] ${className}`}>{children}</span>;
}

export function AccentText({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`text-[var(--accent)] ${className}`}>{children}</span>;
}
