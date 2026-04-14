import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

// Statik/ISR sayfalarda giriş animasyonu hydration sonrası "göz kırpması" etkisi
// yaratıyordu (content önce görünmez → sonra fade-in). Reveal artık saf bir
// wrapper: içeriği olduğu gibi, anında render eder. Scroll-triggered revealler
// gerekirse geleceğe bırakıldı.
export function Reveal({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>;
}
