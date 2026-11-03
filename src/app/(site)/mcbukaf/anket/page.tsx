import type { Metadata } from "next";
import { AnketClient } from "./AnketClient";

export const metadata: Metadata = {
  title: "Değerlendirme Anketi · MCBÜKAF '26",
  description: "Sunum değerlendirme + çekiliş anketi.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AnketClient />;
}
