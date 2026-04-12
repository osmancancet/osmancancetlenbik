import { ProseSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="relative pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <ProseSkeleton />
      </div>
    </div>
  );
}
