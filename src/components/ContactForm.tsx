"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export function ContactForm() {
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
      setError(j.error || "Mesaj gönderilemedi.");
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
        <Field label="Adınız" htmlFor="contact-name">
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
        <Field label="E-posta" htmlFor="contact-email">
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

      <Field label="Konu" htmlFor="contact-subject">
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

      <Field label="Mesaj" htmlFor="contact-message">
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
          Mesajınız başarıyla iletildi. Kısa sürede dönüş yapacağım.
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
        {status === "sending" ? "Gönderiliyor..." : "Mesaj Gönder"}
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
