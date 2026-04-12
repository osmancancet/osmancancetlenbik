import { PageShell } from "@/components/layout/PageShell";
import { CardSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <PageShell
      eyebrow="Akademik"
      title="Verdiğim Dersler"
      subtitle="MCBÜ Teknik Bilimler MYO · Büyük Veri Analistliği Programı"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </PageShell>
  );
}
