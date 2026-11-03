"use client";

import { useRef, useState } from "react";
import { Send, CheckCircle2, AlertCircle, Check } from "lucide-react";
import {
  CLASS_YEARS,
  COMPETITIONS,
  SKILLS,
  TEAM_STATUSES,
} from "@/lib/competitions";

type FormState = {
  fullName: string;
  studentNo: string;
  email: string;
  phone: string;
  university: string;
  department: string;
  classYear: string;
  competitions: string[];
  skills: string[];
  otherSkills: string;
  experience: string;
  portfolioUrl: string;
  teamStatus: string;
  motivation: string;
  consent: boolean;
  website: string; // honeypot
};

const EMPTY: FormState = {
  fullName: "",
  studentNo: "",
  email: "",
  phone: "",
  university: "Manisa Celal Bayar Üniversitesi",
  department: "",
  classYear: "",
  competitions: [],
  skills: [],
  otherSkills: "",
  experience: "",
  portfolioUrl: "",
  teamStatus: "",
  motivation: "",
  consent: false,
  website: "",
};

export function BasvuruForm() {
  const [data, setData] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );
  const [error, setError] = useState<{ msg: string; field?: string } | null>(
    null
  );
  const formRef = useRef<HTMLFormElement>(null);

  function update<K extends keyof FormState>(key: K, val: FormState[K]) {
    setData((d) => ({ ...d, [key]: val }));
    if (error?.field === key) setError(null);
  }

  function toggle(key: "competitions" | "skills", id: string) {
    const cur = data[key];
    update(key, cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]);
  }

  function fail(msg: string, field?: string) {
    setError({ msg, field });
    setStatus("error");
    if (field) {
      const el = formRef.current?.querySelector<HTMLElement>(
        `[data-field="${field}"]`
      );
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.querySelector<HTMLElement>("input, select, textarea")?.focus({
        preventScroll: true,
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Tarayıcının yakalayamadığı çoklu seçim kontrolleri.
    if (data.competitions.length === 0)
      return fail("En az bir yarışma seçin", "competitions");
    if (data.skills.length === 0)
      return fail("En az bir yetkinlik seçin", "skills");
    if (!data.teamStatus)
      return fail("Takım durumunuzu seçin", "teamStatus");

    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/basvuru", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        return fail(j.error || "Başvuru gönderilemedi.", j.field ?? undefined);
      }
      setStatus("ok");
      setData(EMPTY);
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      fail("Bağlantı hatası. Lütfen tekrar deneyin.");
    }
  }

  if (status === "ok") {
    return (
      <div className="text-center py-12" role="status">
        <CheckCircle2 className="w-12 h-12 text-[var(--accent)] mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-[var(--fg)]">
          Başvurunuz alındı!
        </h2>
        <p className="text-[var(--fg-muted)] mt-2 max-w-md mx-auto">
          Teşekkürler. Başvuruları inceleyip takımlar oluştukça e-postayla
          sizinle iletişime geçeceğiz.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-10">
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

      <Section title="Kişisel bilgiler">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Ad soyad" htmlFor="b-name" field="fullName" error={error}>
            <input
              id="b-name"
              type="text"
              required
              minLength={3}
              maxLength={100}
              autoComplete="name"
              value={data.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Öğrenci numarası" htmlFor="b-no" field="studentNo" error={error}>
            <input
              id="b-no"
              type="text"
              required
              minLength={4}
              maxLength={20}
              inputMode="numeric"
              value={data.studentNo}
              onChange={(e) => update("studentNo", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="E-posta" htmlFor="b-email" field="email" error={error}>
            <input
              id="b-email"
              type="email"
              required
              maxLength={150}
              autoComplete="email"
              value={data.email}
              onChange={(e) => update("email", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field
            label="Telefon"
            hint="İsteğe bağlı"
            htmlFor="b-phone"
            field="phone"
            error={error}
          >
            <input
              id="b-phone"
              type="tel"
              maxLength={20}
              autoComplete="tel"
              value={data.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={inputCls}
            />
          </Field>
        </div>
      </Section>

      <Section title="Eğitim">
        <div className="grid md:grid-cols-2 gap-4">
          <Field
            label="Üniversite"
            htmlFor="b-uni"
            field="university"
            error={error}
            className="md:col-span-2"
          >
            <input
              id="b-uni"
              type="text"
              required
              maxLength={150}
              value={data.university}
              onChange={(e) => update("university", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Bölüm / Program" htmlFor="b-dept" field="department" error={error}>
            <input
              id="b-dept"
              type="text"
              required
              maxLength={150}
              placeholder="Örn. Büyük Veri Analistliği"
              value={data.department}
              onChange={(e) => update("department", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Sınıf" htmlFor="b-class" field="classYear" error={error}>
            <select
              id="b-class"
              required
              value={data.classYear}
              onChange={(e) => update("classYear", e.target.value)}
              className={inputCls}
            >
              <option value="" disabled>
                Seçin
              </option>
              {CLASS_YEARS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </Section>

      <Section title="İlgi alanı">
        <Field
          label="Hangi yarışmalarda yer almak istersiniz?"
          hint="Birden fazla seçebilirsiniz"
          field="competitions"
          error={error}
        >
          <div className="grid sm:grid-cols-2 gap-2">
            {COMPETITIONS.map((c) => (
              <Chip
                key={c.id}
                checked={data.competitions.includes(c.id)}
                onChange={() => toggle("competitions", c.id)}
                label={c.label}
                sub={c.desc}
              />
            ))}
          </div>
        </Field>

        <Field
          label="Yetkinlikleriniz"
          hint="Kendinizi rahat hissettiğiniz ya da öğrenmek istediğiniz alanlar"
          field="skills"
          error={error}
        >
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((s) => (
              <Chip
                key={s.id}
                compact
                checked={data.skills.includes(s.id)}
                onChange={() => toggle("skills", s.id)}
                label={s.label}
              />
            ))}
          </div>
        </Field>

        <Field
          label="Kullandığınız araç ve diller"
          hint="İsteğe bağlı · Örn. Python, React, Unity, Figma"
          htmlFor="b-other"
          field="otherSkills"
          error={error}
        >
          <input
            id="b-other"
            type="text"
            maxLength={300}
            value={data.otherSkills}
            onChange={(e) => update("otherSkills", e.target.value)}
            className={inputCls}
          />
        </Field>
      </Section>

      <Section title="Deneyim ve takım">
        <Field
          label="Daha önce katıldığınız yarışma ya da yaptığınız projeler"
          hint="İsteğe bağlı · Hiç yoksa sorun değil"
          htmlFor="b-exp"
          field="experience"
          error={error}
        >
          <textarea
            id="b-exp"
            rows={3}
            maxLength={1500}
            value={data.experience}
            onChange={(e) => update("experience", e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field
          label="GitHub, portfolyo ya da LinkedIn bağlantısı"
          hint="İsteğe bağlı"
          htmlFor="b-url"
          field="portfolioUrl"
          error={error}
        >
          <input
            id="b-url"
            type="url"
            maxLength={300}
            placeholder="https://github.com/kullanici-adi"
            value={data.portfolioUrl}
            onChange={(e) => update("portfolioUrl", e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label="Takım durumunuz" field="teamStatus" error={error}>
          <div className="flex flex-wrap gap-2" role="radiogroup">
            {TEAM_STATUSES.map((t) => (
              <Chip
                key={t.id}
                compact
                type="radio"
                name="teamStatus"
                checked={data.teamStatus === t.id}
                onChange={() => update("teamStatus", t.id)}
                label={t.label}
              />
            ))}
          </div>
        </Field>

        <Field
          label="Neden katılmak istiyorsunuz?"
          hint="Birkaç cümle yeterli"
          htmlFor="b-motivation"
          field="motivation"
          error={error}
        >
          <textarea
            id="b-motivation"
            required
            rows={4}
            minLength={30}
            maxLength={2000}
            value={data.motivation}
            onChange={(e) => update("motivation", e.target.value)}
            className={inputCls}
          />
          <div className="text-[11px] text-[var(--fg-subtle)] mt-1 text-end font-mono">
            {data.motivation.trim().length} / 2000
          </div>
        </Field>
      </Section>

      <div data-field="consent">
        <label className="flex gap-3 items-start cursor-pointer text-sm text-[var(--fg-muted)] leading-relaxed">
          <input
            type="checkbox"
            required
            checked={data.consent}
            onChange={(e) => update("consent", e.target.checked)}
            className="mt-1 w-4 h-4 accent-[var(--accent)] shrink-0"
          />
          <span>
            <a
              href="#aydinlatma-metni"
              className="text-[var(--accent)] hover:underline"
            >
              Aydınlatma metnini
            </a>{" "}
            okudum. Kişisel verilerimin yarışma takımlarının oluşturulması
            amacıyla işlenmesine ve yurt dışında bulunabilen sunucularda
            saklanmasına açık rıza veriyorum.
          </span>
        </label>
      </div>

      {status === "error" && error && (
        <div
          role="alert"
          className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error.msg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--bg)] font-medium rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
        {status === "sending" ? "Gönderiliyor..." : "Başvuruyu Gönder"}
      </button>
    </form>
  );
}

const inputCls =
  "w-full px-4 py-2.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--fg)] placeholder:text-[var(--fg-subtle)] focus:outline-none focus:border-[var(--accent)]";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-5">
      <legend className="text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-5">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

function Field({
  label,
  hint,
  htmlFor,
  field,
  error,
  className,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor?: string;
  field: string;
  error: { msg: string; field?: string } | null;
  className?: string;
  children: React.ReactNode;
}) {
  const invalid = error?.field === field;
  return (
    <div data-field={field} className={className}>
      <label
        htmlFor={htmlFor}
        className="block text-xs uppercase tracking-wider text-[var(--fg-subtle)] mb-2"
      >
        {label}
        {hint && (
          <span className="normal-case tracking-normal text-[var(--fg-subtle)]/80">
            {" "}
            · {hint}
          </span>
        )}
      </label>
      {children}
      {invalid && (
        <div className="text-xs text-red-400 mt-1.5">{error.msg}</div>
      )}
    </div>
  );
}

function Chip({
  checked,
  onChange,
  label,
  sub,
  compact,
  type = "checkbox",
  name,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  sub?: string;
  compact?: boolean;
  type?: "checkbox" | "radio";
  name?: string;
}) {
  return (
    <label
      className={`cursor-pointer rounded-md border transition-colors select-none ${
        compact ? "px-3 py-2 text-sm" : "p-3"
      } ${
        checked
          ? "border-[var(--accent)] ring-1 ring-[var(--accent)] bg-[var(--accent-soft)] text-[var(--fg)]"
          : "border-[var(--border-strong)] text-[var(--fg-muted)] hover:border-[var(--accent)]/60"
      } has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[var(--accent)]`}
    >
      <input
        type={type}
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        className={`inline-flex items-center gap-1.5 ${
          compact ? "" : "font-medium text-[var(--fg)]"
        }`}
      >
        {checked && <Check className="w-3.5 h-3.5 text-[var(--accent)]" />}
        {label}
      </span>
      {sub && (
        <span className="block text-xs text-[var(--fg-muted)] mt-0.5">
          {sub}
        </span>
      )}
    </label>
  );
}
