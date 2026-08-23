"use client";

import { profile, profileI18n } from "@/data/profile";
import { Reveal } from "@/components/ui/Reveal";
import { MapPin, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { ContactForm } from "@/components/ContactForm";
import { OfficeHours } from "@/components/OfficeHours";
import type { Locale } from "@/lib/i18n";
import { MailAction } from "@/components/MailAction";

const COPY = {
  tr: {
    institutionLabel: "Kurum",
    otherChannels: "Diğer Kanallar",
    emailLabel: "E-posta",
    locationLabel: "Konum",
  },
  en: {
    institutionLabel: "Institution",
    otherChannels: "Other channels",
    emailLabel: "Email",
    locationLabel: "Location",
  },
  de: {
    institutionLabel: "Institution",
    otherChannels: "Weitere Kanäle",
    emailLabel: "E-Mail",
    locationLabel: "Standort",
  },
  ar: {
    institutionLabel: "المؤسسة",
    otherChannels: "قنوات أخرى",
    emailLabel: "البريد الإلكتروني",
    locationLabel: "الموقع",
  },
} as const;

const channels = [
  {
    icon: GithubIcon,
    label: "GitHub",
    href: profile.socials.github,
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    href: profile.socials.linkedin,
  },
  {
    icon: MapPin,
    label: "Konum",
    value: profile.location,
    href: null,
  },
] as Array<{
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string | null;
  value?: string;
}>;

export function Contact({ locale = "tr" }: { locale?: Locale }) {
  const t = COPY[locale];
  const p = profileI18n[locale];
  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <Reveal>
        <div>
          <ContactForm locale={locale} />
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="space-y-8">
          <div className="p-5 border border-[var(--border-strong)] rounded-lg bg-[var(--bg-card)]">
            <div className="text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-2">
              {t.institutionLabel}
            </div>
            <div className="text-[var(--fg)] font-medium">
              {p.institution}
            </div>
            <div className="text-sm text-[var(--fg-muted)] mt-1">
              {p.department}
            </div>
          </div>

          <OfficeHours locale={locale} />

          <div className="space-y-2">
            <div className="text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-2">
              {t.otherChannels}
            </div>

            {/* E-posta ayrı duruyor: düz mailto bağlantısı e-posta istemcisi
                tanımlı olmayan cihazlarda sessizce hiçbir şey yapmıyordu. */}
            <MailAction
              email={profile.email}
              label={profile.email}
              locale={locale}
              variant="outline"
              className="block"
            />

            {channels.map(({ icon: Icon, label, value, href }) => {
              const shownLabel =
                label === "E-posta" ? t.emailLabel : label === "Konum" ? t.locationLabel : label;
              const shownValue = label === "Konum" ? p.location : value;
              const inner = (
                <div className="card rounded-lg p-4 flex items-center gap-4 group">
                  <div className="w-9 h-9 rounded-md border border-[var(--border-strong)] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[var(--accent)]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-[var(--fg)] truncate">
                      {shownValue ?? shownLabel}
                    </div>
                  </div>
                  {href && (
                    <ArrowUpRight className="w-4 h-4 text-[var(--fg-subtle)] group-hover:text-[var(--accent)] transition-colors shrink-0" />
                  )}
                </div>
              );
              return href ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="block"
                >
                  {inner}
                </a>
              ) : (
                <div key={label}>{inner}</div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
