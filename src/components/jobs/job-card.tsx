import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { formatSalary, relativeDate, cn } from "@/lib/utils";
import { labelOf, MODALITIES, SENIORITY, JOB_TYPES } from "@/lib/constants";
import type { Job } from "@/types/database";
import { MapPin, Clock, Sparkles } from "lucide-react";

function isNew(job: Job) {
  const d = new Date(job.published_at || job.created_at).getTime();
  return Date.now() - d < 1000 * 60 * 60 * 72; // 3 days
}

export function JobCard({ job, className }: { job: Job; className?: string }) {
  const company = job.companies;
  const fresh = isNew(job);

  return (
    <Link
      href={`/empleos/${job.slug}`}
      className={cn(
        "group relative block rounded-2xl border border-border bg-white p-5 shadow-sm transition-all duration-200",
        "hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-lg hover:shadow-primary/10",
        className
      )}
    >
      <div className="flex gap-4">
        <Avatar name={company?.name || "E"} size="lg" className="shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold text-slate-900 transition-colors group-hover:text-primary">
                {job.title}
              </h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {company?.name}
                {company?.is_featured && (
                  <span className="ml-2 inline-flex items-center gap-0.5 text-xs text-primary">
                    <Sparkles className="h-3 w-3" /> Destacada
                  </span>
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {fresh && <Badge variant="success">Nueva</Badge>}
              {job.is_featured && <Badge variant="default">Destacado</Badge>}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            <Badge variant="secondary">{labelOf(SENIORITY, job.seniority)}</Badge>
            <Badge variant="outline">{labelOf(MODALITIES, job.modality)}</Badge>
            <Badge variant="outline">{labelOf(JOB_TYPES, job.job_type)}</Badge>
            {job.categories && (
              <Badge variant="outline">{job.categories.name}</Badge>
            )}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {job.modality === "remote"
                ? job.country || "Remoto"
                : [job.city, job.country].filter(Boolean).join(", ") || "—"}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {relativeDate(job.published_at || job.created_at)}
            </span>
            <span className="font-semibold text-primary">
              {formatSalary(
                job.salary_min,
                job.salary_max,
                job.salary_currency,
                job.salary_period
              )}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
