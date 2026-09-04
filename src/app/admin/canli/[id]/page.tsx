import { LiveConsoleClient } from "./LiveConsoleClient";

export default async function LiveConsolePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <LiveConsoleClient id={id} />;
}
