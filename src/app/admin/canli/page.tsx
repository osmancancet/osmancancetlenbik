import { LiveListClient } from "./LiveListClient";

export default function AdminLivePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-[var(--fg)] mb-1">
        Canlı Ders
      </h1>
      <p className="text-sm text-[var(--fg-subtle)] mb-8">
        Öğrencilerin telefonundan katıldığı etkileşimli ders oturumları.
      </p>
      <LiveListClient />
    </div>
  );
}
