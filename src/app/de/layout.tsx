import type { ReactNode } from "react";

/** Deutschsprachiger Bereich. Das Wurzel-`<html>` trägt `lang="tr"`, daher
 *  wird der Inhaltsbaum hier ausgezeichnet — im ersten HTML, ohne JavaScript. */
export default function DeLayout({ children }: { children: ReactNode }) {
  return <div lang="de">{children}</div>;
}
