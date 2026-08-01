import { JobCardSkeleton } from "@/components/ui/skeleton";

export default function EmpleosLoading() {
  return (
    <div className="container-page py-10">
      <div className="mb-8 space-y-2">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200" />
        <div className="h-4 w-72 animate-pulse rounded-lg bg-slate-100" />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
