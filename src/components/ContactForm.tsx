"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import type { Locale } from "@/lib/i18n";

const COPY = {
  tr: {
    name: "Adınız",
    email: "E-posta",
    subject: "Konu",
    message: "Mesaj",
    ok: "Mesajınız başarıyla iletildi. Kısa sürede dönüş yapacağım.",
    fail: "Mesaj gönderilemedi.",
    sending: "Gönderiliyor...",
    send: "Mesaj Gönder",
  },
  en: {
    name: "Your name",
    email: "Email",
    subject: "Subject",
    message: "Message",
    ok: "Your message has been sent. I will get back to you shortly.",
    fail: "The message could not be sent.",
    sending: "Sending...",
    send: "Send message",
  },
  de: {
    name: "Ihr Name",
    email: "E-Mail",
    subject: "Betreff",
    message: "Nachricht",
    ok: "Ihre Nachricht wurde gesendet. Ich melde mich in Kürze.",
    fail: "Die Nachricht konnte nicht gesendet werden.",
    sending: "Wird gesendet ...",
    send: "Nachricht senden",
  },
  ar: {
    name: "الاسم",
    email: "البريد الإلكتروني",
    subject: "الموضوع",
    message: "الرسالة",
    ok: "تم إرسال رسالتكم. سأرد عليكم قريبًا.",
    fail: "تعذّر إرسال الرسالة.",
    sending: "جارٍ الإرسال...",
    send: "إرسال الرسالة",
  },
} as const;

export function ContactForm({ locale = "tr" }: { locale?: Locale }) {
  const t = COPY[locale];
  const [data, setData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // honeypot
  });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof typeof data>(key: K, val: (typeof data)[K]) {
    setData((d) => ({ ...d, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j.error || t.fail);
      setStatus("error");
      return;
    }
    setStatus("ok");
    setData({ name: "", email: "", subject: "", message: "", website: "" });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="website"
        value={data.website}
        onChange={(e) => update("website", e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className="grid md:grid-cols-2 gap-4">
        <Field label={t.name} htmlFor="contact-name">
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label={t.email} htmlFor="contact-email">
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>

      <Field label={t.subject} htmlFor="contact-subject">
        <input
          id="contact-subject"
          name="subject"
          type="text"
          required
          autoComplete="on"
          value={data.subject}
          onChange={(e) => update("subject", e.target.value)}
          className={inputCls}
        />
      </Field>

      <Field label={t.message} htmlFor="contact-message">
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          autoComplete="on"
          value={data.message}
          onChange={(e) => update("message", e.target.value)}
          className={inputCls}
        />
      </Field>

      {status === "ok" && (
        <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-md px-3 py-2">
          <CheckCircle2 className="w-4 h-4" />
          {t.ok}
        </div>
      )}
      {status === "error" && error && (
        <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-[var(--bg)] font-medium rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
        {status === "sending" ? t.sending : t.send}
      </button>
    </form>
  );
}

const inputCls =
  "w-full px-4 py-2.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-xs uppercase tracking-wider text-[var(--fg-subtle)] mb-2"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
