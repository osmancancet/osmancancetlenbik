import { PageShell } from "@/components/layout/PageShell";
import { CardSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <PageShell
      eyebrow="Blog"
      title="Yazılarım"
      subtitle="Yapay zekâ, büyük veri, yazılım ve eğitim üzerine düşüncelerim."
    >
      <div className="grid md:grid-cols-2 gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </PageShell>
  );
}
