import { Clock, MapPin } from "lucide-react";
import { officeHours } from "@/data/officeHours";

export function OfficeHours() {
  return (
    <div>
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-mono mb-4">
        <Clock className="w-3 h-3" />
        Ofis Saatleri
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
