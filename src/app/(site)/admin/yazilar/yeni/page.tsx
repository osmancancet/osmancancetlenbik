import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PostForm } from "@/components/admin/PostForm";

export default function NewPostPage() {
  return (
    <div>
      <Link
        href="/admin/yazilar"
        className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Yazılarıma dön
      </Link>
      <h1 className="text-3xl font-semibold text-[var(--fg)] mb-10">
        Yeni Yazı
      </h1>
      <PostForm />
    </div>
  );
}
