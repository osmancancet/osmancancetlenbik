import type { ReactNode } from "react";
import { RootShell } from "@/components/layout/RootShell";
import { ChatWidget } from "@/components/ChatWidget";
import { rootMetadata, rootViewport } from "@/lib/seo/rootMetadata";

export const metadata = rootMetadata;
export const viewport = rootViewport;

// Sohbet penceresi yalnız Telegram botu tanımlıysa görünür.
const chatEnabled = Boolean(process.env.TELEGRAM_BOT_TOKEN?.trim());
const chatEmail = process.env.CONTACT_TO_EMAIL || "osman.cetlenbik@cbu.edu.tr";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <RootShell locale="tr">
      {children}
      {chatEnabled && <ChatWidget email={chatEmail} />}
    </RootShell>
  );
}
