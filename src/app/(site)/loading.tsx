export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex items-center gap-3 text-[var(--fg-muted)]">
        <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
        <span className="text-sm font-mono uppercase tracking-wider">
          Yükleniyor
        </span>
      </div>
    </div>
  );
}
