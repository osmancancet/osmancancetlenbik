"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, LoaderCircle, Users } from "lucide-react";
import { normalizeCode } from "@/lib/live";
import { readKey, writeKey, writeNickname, readNickname } from "./storage";

export function JoinClient() {
  const router = useRouter();
  const search = useSearchParams();
  const [code, setCode] = useState("");
  const [nickname, setNickname] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // QR ile gelen öğrenci kodu elle yazmasın.
  useEffect(() => {
    const fromUrl = search.get("kod");
    if (fromUrl) setCode(normalizeCode(fromUrl));
    setNickname(readNickname() ?? "");
  }, [search]);

  async function join(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const clean = normalizeCode(code);
    const res = await fetch("/api/live/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: clean,
        nickname: nickname.trim() || undefined,
        key: readKey(clean) ?? undefined,
      }),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setError(data.error ?? "Katılamadık, tekrar deneyin.");
      setBusy(false);
      return;
    }

    writeKey(clean, data.key);
    writeNickname(data.nickname);
    router.push(`/canli/${clean}`);
  }

  return (
    <form onSubmit={join} className="space-y-5">
      <div>
        <label
          htmlFor="live-code"
          className="block text-xs uppercase tracking-[0.18em] text-[var(--fg-subtle)] mb-2"
        >
          Tahtadaki kod
        </label>
        <input
          id="live-code"
          value={code}
          onChange={(e) => setCode(normalizeCode(e.target.value))}
          inputMode="text"
          autoCapitalize="characters"
          autoComplete="off"
          maxLength={8}
          required
          placeholder="ABC123"
          className="w-full px-4 py-4 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] text-center text-3xl font-mono tracking-[0.35em] focus:outline-none focus:border-[var(--accent)]"
        />
      </div>

      <div>
        <label
          htmlFor="live-nick"
          className="block text-xs uppercase tracking-[0.18em] text-[var(--fg-subtle)] mb-2"
        >
          Adınız
        </label>
        <input
          id="live-nick"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          maxLength={24}
          autoComplete="nickname"
          placeholder="Sıralamada görünecek isim"
          className="w-full px-4 py-3 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]"
        />
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy || code.length < 4}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[var(--accent)] text-[var(--bg)] font-semibold rounded-md hover:opacity-90 transition-opacity disabled:opacity-40"
      >
        {busy ? (
          <LoaderCircle className="w-4 h-4 animate-spin" />
        ) : (
          <Users className="w-4 h-4" />
        )}
        Derse katıl
        {!busy && <ArrowRight className="w-4 h-4" />}
      </button>
    </form>
  );
}
