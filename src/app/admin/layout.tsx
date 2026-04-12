"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Mic,
  BookOpen,
  Megaphone,
  Newspaper,
  LogOut,
  ExternalLink,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Panel", icon: LayoutDashboard },
  { href: "/admin/dersler", label: "Derslerim", icon: BookOpen },
  { href: "/admin/yazilar", label: "Yazılarım", icon: FileText },
  { href: "/admin/konferanslar", label: "Konferanslarım", icon: Mic },
  { href: "/admin/basin", label: "Basın", icon: Newspaper },
  { href: "/admin/duyurular", label: "Duyurular", icon: Megaphone },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) {
    return <div className="min-h-screen bg-[var(--bg)]">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <div className="grid md:grid-cols-[240px_1fr] min-h-screen">
        <aside className="border-r border-[var(--border)] p-6 hidden md:flex md:flex-col">
          <Link
            href="/admin"
            className="font-mono text-sm tracking-tight mb-8 text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
          >
            admin<span className="text-[var(--accent)]">.</span>
          </Link>

          <nav className="flex flex-col gap-1 flex-1">
            {links.map((l) => {
              const Icon = l.icon;
              const active =
                pathname === l.href ||
                (l.href !== "/admin" && pathname.startsWith(l.href));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                    active
                      ? "bg-[var(--bg-card)] text-[var(--accent)]"
                      : "text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-card)]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-1">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-card)] transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Siteyi Görüntüle
            </Link>
            <form
              action="/api/admin/logout"
              method="POST"
              onSubmit={(e) => {
                e.preventDefault();
                fetch("/api/admin/logout", { method: "POST" }).then(() => {
                  window.location.href = "/admin/login";
                });
              }}
            >
              <button
                type="submit"
                className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] hover:bg-[var(--bg-card)] transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Çıkış Yap
              </button>
            </form>
          </div>
        </aside>

        <main className="p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
