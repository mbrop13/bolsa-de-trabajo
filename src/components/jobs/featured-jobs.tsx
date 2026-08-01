"use client";

import { JobCard } from "@/components/jobs/job-card";
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
      <p className="text-center text-sm text-muted-foreground py-8">
        Cargando vacantes...
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
