export default function Loading() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-2xl border border-line bg-white">
          <div className="aspect-[4/5] animate-pulse bg-line/70" />
          <div className="space-y-3 p-4">
            <div className="h-3 w-16 animate-pulse rounded bg-line" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-line" />
            <div className="h-9 animate-pulse rounded-full bg-line" />
          </div>
        </div>
      ))}
    </div>
  );
}
