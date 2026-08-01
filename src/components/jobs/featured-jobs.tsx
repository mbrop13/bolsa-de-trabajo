"use client";

import { JobCard } from "@/components/jobs/job-card";
import { JobCardSkeleton } from "@/components/ui/skeleton";
import { useRecluStore } from "@/lib/store/reclu-store";

export function FeaturedJobs({ limit = 4 }: { limit?: number }) {
  const store = useRecluStore();
  const featured = store.ready
    ? store.getPublishedJobs({ featured: true }).slice(0, limit)
    : [];
  const fallback = store.ready
    ? store.getPublishedJobs().slice(0, limit)
    : [];
  const jobs = featured.length ? featured : fallback;

  if (!store.ready) {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: limit }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!jobs.length) {
    return (
      <p className="rounded-2xl border border-dashed border-border bg-slate-50 py-12 text-center text-sm text-muted-foreground">
        Pronto habrá vacantes publicadas. Mientras tanto, crea tu perfil.
      </p>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
