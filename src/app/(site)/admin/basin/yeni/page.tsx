import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PressForm } from "@/components/admin/PressForm";

export default function NewPressPage() {
  return (
    <div>
      <Link
        href="/admin/basin"
        className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Basına dön
      </Link>
      <h1 className="text-3xl font-semibold text-[var(--fg)] mb-10">
        Yeni Basın Kaydı
      </h1>
      <PressForm />
    </div>
  );
}
