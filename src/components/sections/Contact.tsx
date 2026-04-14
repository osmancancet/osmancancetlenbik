"use client";

import { profile } from "@/data/profile";
import { Reveal } from "@/components/ui/Reveal";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { ContactForm } from "@/components/ContactForm";
import { OfficeHours } from "@/components/OfficeHours";

const channels = [
  {
    icon: Mail,
    label: "E-posta",
    href: profile.socials.email,
  },
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

export function Contact() {
  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <Reveal>
        <div>
          <ContactForm />
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="space-y-8">
          <div className="p-5 border border-[var(--border-strong)] rounded-lg bg-[var(--bg-card)]">
            <div className="text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-2">
              Kurum
            </div>
            <div className="text-[var(--fg)] font-medium">
              {profile.institution}
            </div>
            <div className="text-sm text-[var(--fg-muted)] mt-1">
              {profile.department}
            </div>
          </div>

          <OfficeHours />

          <div className="space-y-2">
            <div className="text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-2">
              Diğer Kanallar
            </div>
            {channels.map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <div className="card rounded-lg p-4 flex items-center gap-4 group">
                  <div className="w-9 h-9 rounded-md border border-[var(--border-strong)] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[var(--accent)]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-[var(--fg)] truncate">
                      {value ?? label}
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
