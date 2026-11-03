import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ConferenceForm } from "@/components/admin/ConferenceForm";

export default function NewConferencePage() {
  return (
    <div>
      <Link
        href="/admin/konferanslar"
        className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Konferanslarıma dön
      </Link>
      <h1 className="text-3xl font-semibold text-[var(--fg)] mb-10">
        Yeni Konferans
      </h1>
      <ConferenceForm />
    </div>
  );
}
