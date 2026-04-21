"use client";

import {
  Share2,
  MessageCircle,
  Link as LinkIcon,
  Check,
} from "lucide-react";
import { useState, useRef, useEffect, type ReactNode } from "react";

type ShareItem = { label: string; icon: ReactNode; href: string };

function BrandTile({
  letter,
  bg,
  color = "#ffffff",
}: {
  letter: string;
  bg: string;
  color?: string;
}) {
  return (
    <span
      className="inline-flex items-center justify-center w-4 h-4 rounded-[3px] text-[9px] font-bold"
      style={{ background: bg, color }}
      aria-hidden
    >
      {letter}
    </span>
  );
}

export function ShareButton({
  url,
  title,
  className = "",
}: {
  url: string;
  title: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (
      typeof navigator !== "undefined" &&
      typeof navigator.share === "function"
    ) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // User canceled — fall through to menu
      }
    }

    setOpen((o) => !o);
  }

  async function copyLink(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // noop
    }
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(title);

  const items: ShareItem[] = [
    {
      label: "X (Twitter)",
      icon: <BrandTile letter="𝕏" bg="#000000" />,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    },
    {
      label: "LinkedIn",
      icon: <BrandTile letter="in" bg="#0a66c2" />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "Facebook",
      icon: <BrandTile letter="f" bg="#1877f2" />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "WhatsApp",
      icon: (
        <span
          className="inline-flex items-center justify-center w-4 h-4 rounded-[3px]"
          style={{ background: "#25d366" }}
          aria-hidden
        >
          <MessageCircle className="w-2.5 h-2.5 text-white" />
        </span>
      ),
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    },
  ];

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={handleClick}
        aria-label="Haberi paylaş"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 px-2 py-1 text-xs text-[var(--fg-subtle)] hover:text-[var(--accent)] transition-colors"
      >
        <Share2 className="w-3.5 h-3.5" />
        Paylaş
      </button>
      {open && (
        <div
          role="menu"
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-full right-0 mb-2 card rounded-lg p-1 shadow-xl min-w-[180px] z-50 bg-[var(--bg)]"
        >
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs text-[var(--fg)] hover:bg-[var(--bg-soft)] rounded-md transition-colors"
              role="menuitem"
            >
              {item.icon}
              {item.label}
            </a>
          ))}
          <div className="my-1 border-t border-[var(--border)]" />
          <button
            type="button"
            onClick={copyLink}
            className="flex items-center gap-2.5 px-3 py-2 text-xs text-[var(--fg)] hover:bg-[var(--bg-soft)] rounded-md transition-colors w-full text-left"
            role="menuitem"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
            ) : (
              <LinkIcon className="w-3.5 h-3.5 text-[var(--fg-muted)]" />
            )}
            {copied ? "Kopyalandı!" : "Linki kopyala"}
          </button>
        </div>
      )}
    </div>
  );
}
