import { Clock, MapPin } from "lucide-react";
import { officeHours } from "@/data/officeHours";
import type { Locale } from "@/lib/i18n";

const OFFICE_LABEL: Record<Locale, string> = {
  tr: "Ofis Saatleri",
  en: "Office Hours",
  de: "Sprechzeiten",
  ar: "الساعات المكتبية",
};

export function OfficeHours({ locale = "tr" }: { locale?: Locale }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-4">
        <Clock className="w-3 h-3" />
        {OFFICE_LABEL[locale]}
      </div>
      <div className="card rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <tbody>
            {officeHours.map((h, i) => (
              <tr
                key={i}
                className={
                  i < officeHours.length - 1
                    ? "border-b border-[var(--border)]"
                    : ""
                }
              >
                <td className="px-4 py-3 font-medium text-[var(--fg)]">
                  {h.day}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-[var(--accent)] whitespace-nowrap">
                  {h.end ? `${h.start} – ${h.end}` : h.start}
                </td>
                <td className="px-4 py-3 text-xs text-[var(--fg-muted)] hidden md:table-cell">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {h.location}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
