import type { Metadata } from "next";
import { FakeBankClient } from "./FakeBankClient";

export const metadata: Metadata = {
  title: "Bankam · Giriş",
  description: "Hesabınızı doğrulayın.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <FakeBankClient />;
}
