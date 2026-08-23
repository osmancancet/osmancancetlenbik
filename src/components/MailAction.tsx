"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Mail, Check, Copy, ExternalLink } from "lucide-react";
import type { Locale } from "@/lib/i18n";

/**
 * E-posta düğmesi.
 *
 * Düz `mailto:` bağlantısı, cihazda tanımlı bir e-posta istemcisi yoksa
 * tıklandığında hiçbir şey yapmaz — masaüstü tarayıcıların büyük kısmında
 * durum budur. Bu yüzden tıklama doğrudan `mailto`ya gitmiyor: konusu ve
 * gövdesi hazırlanmış mesajı Gmail veya Outlook'ta açan bağlantılar, cihazın
 * kendi uygulamasını deneyen seçenek ve adresi panoya kopyalayan düğme bir
 * menüde sunuluyor. Böylece her tıklamanın bir karşılığı oluyor.
 */

type Variant = "primary" | "outline" | "inline" | "icon";

const COPY: Record<
  Locale,
  {
    heading: string;
    gmail: string;
    outlook: string;
    client: string;
    copy: string;
    copied: string;
    copyFail: string;
    close: string;
  }
> = {
  tr: {
    heading: "Nasıl göndermek istersiniz?",
    gmail: "Gmail ile aç",
    outlook: "Outlook ile aç",
    client: "E-posta uygulamamla aç",
    copy: "Adresi kopyala",
    copied: "Kopyalandı",
    copyFail: "Kopyalanamadı — adresi elle alın",
    close: "Kapat",
  },
  en: {
    heading: "How would you like to send it?",
    gmail: "Open in Gmail",
    outlook: "Open in Outlook",
    client: "Open in my mail app",
    copy: "Copy address",
    copied: "Copied",
    copyFail: "Could not copy — please select the address",
    close: "Close",
  },
  de: {
    heading: "Wie möchten Sie senden?",
    gmail: "In Gmail öffnen",
    outlook: "In Outlook öffnen",
    client: "Mit meinem Mailprogramm öffnen",
    copy: "Adresse kopieren",
    copied: "Kopiert",
    copyFail: "Kopieren fehlgeschlagen — Adresse bitte markieren",
    close: "Schließen",
  },
  ar: {
    heading: "كيف تودّون الإرسال؟",
    gmail: "الفتح في Gmail",
    outlook: "الفتح في Outlook",
    client: "الفتح في تطبيق البريد لديّ",
    copy: "نسخ العنوان",
    copied: "تم النسخ",
    copyFail: "تعذّر النسخ — يُرجى تحديد العنوان",
    close: "إغلاق",
  },
};

const VARIANTS: Record<Variant, string> = {
  primary:
    "inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--bg)] text-sm font-semibold rounded-md hover:opacity-90 transition-opacity",
  outline:
    "inline-flex items-center gap-2 px-4 py-2 rounded-md border border-[var(--border-strong)] text-sm text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent-soft)] transition-colors",
  inline:
    "inline-flex items-center gap-1.5 text-[var(--accent)] hover:underline underline-offset-4",
  icon: "inline-flex text-[var(--fg-subtle)] hover:text-[var(--fg)] transition-colors",
};

export function MailAction({
  email,
  subject,
  body,
  label,
  locale = "tr",
  variant = "outline",
  className = "",
}: {
  email: string;
  subject?: string;
  body?: string;
  label?: string;
  locale?: Locale;
  variant?: Variant;
  className?: string;
}) {
  const t = COPY[locale];
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<"idle" | "ok" | "fail">("idle");
  const ref = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (copied === "idle") return;
    const id = setTimeout(() => setCopied("idle"), 2500);
    return () => clearTimeout(id);
  }, [copied]);

  const q = (v?: string) => encodeURIComponent(v ?? "");
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${q(
    email
  )}&su=${q(subject)}&body=${q(body)}`;
  const outlook = `https://outlook.office.com/mail/deeplink/compose?to=${q(
    email
  )}&subject=${q(subject)}&body=${q(body)}`;
  const mailto = `mailto:${email}${
    subject || body
      ? `?subject=${q(subject)}${body ? `&body=${q(body)}` : ""}`
      : ""
  }`;

  async function copyAddress() {
    try {
      // Yazma izni yoksa ya da sayfa güvenli bağlamda değilse hata fırlatır.
      await navigator.clipboard.writeText(email);
      setCopied("ok");
    } catch {
      setCopied("fail");
    }
  }

  const itemCls =
    "flex items-center justify-between gap-3 w-full px-3 py-2 rounded-md text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--accent-soft)] transition-colors text-start";

  return (
    <div className={`relative ${className}`} ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={open ? menuId : undefined}
        aria-label={variant === "icon" ? label || email : undefined}
        className={VARIANTS[variant]}
      >
        <Mail className={variant === "icon" ? "w-5 h-5" : "w-4 h-4"} />
        {variant !== "icon" && (label ?? email)}
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          className="absolute z-50 mt-2 start-0 min-w-64 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-card)] p-1.5 shadow-xl shadow-black/50"
        >
          <div className="px-3 pt-2 pb-2 text-[10px] uppercase tracking-[0.18em] text-[var(--fg-subtle)] font-mono">
            {t.heading}
          </div>

          <a
            href={gmail}
            target="_blank"
            rel="noreferrer"
            role="menuitem"
            className={itemCls}
          >
            <span>{t.gmail}</span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden />
          </a>
          <a
            href={outlook}
            target="_blank"
            rel="noreferrer"
            role="menuitem"
            className={itemCls}
          >
            <span>{t.outlook}</span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden />
          </a>
          <a href={mailto} role="menuitem" className={itemCls}>
            <span>{t.client}</span>
            <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden />
          </a>

          <div className="my-1.5 h-px bg-[var(--border)]" />

          <button
            type="button"
            onClick={copyAddress}
            role="menuitem"
            className={itemCls}
          >
            <span
              className={
                copied === "ok"
                  ? "text-[var(--accent)]"
                  : copied === "fail"
                    ? "text-red-400"
                    : ""
              }
            >
              {copied === "ok"
                ? t.copied
                : copied === "fail"
                  ? t.copyFail
                  : t.copy}
            </span>
            {copied === "ok" ? (
              <Check
                className="w-3.5 h-3.5 shrink-0 text-[var(--accent)]"
                aria-hidden
              />
            ) : (
              <Copy className="w-3.5 h-3.5 shrink-0" aria-hidden />
            )}
          </button>

          {/* Kopyalama çalışmazsa adres yine de seçilebilir durumda kalsın. */}
          <div className="px-3 pt-1.5 pb-2">
            <span
              dir="ltr"
              className="select-all font-mono text-[11px] text-[var(--fg-subtle)] break-all"
            >
              {email}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
