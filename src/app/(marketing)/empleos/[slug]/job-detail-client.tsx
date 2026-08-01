"use client";

import Link from "next/link";
import { useRecluStore } from "@/lib/store/reclu-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { JobApplyButton, JobSaveButton } from "@/components/jobs/job-actions";
import { formatSalary, relativeDate } from "@/lib/utils";
import {
  labelOf,
  SENIORITY,
  MODALITIES,
  JOB_TYPES,
} from "@/lib/constants";
import {
  ArrowLeft,
  Building2,
  Clock,
  MapPin,
  Share2,
} from "lucide-react";
import { toast } from "sonner";

export function JobDetailClient({ slug }: { slug: string }) {
  const store = useRecluStore();
  const job = store.getJobBySlug(slug);

  if (!store.ready) {
    return (
      <div className="container-page py-20 text-center text-muted-foreground">
        Cargando vacante...
      </div>
    );
  }

  if (!job || (job.status !== "published" && job.status !== "closed")) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="text-xl font-semibold">Vacante no encontrada</h1>
        <p className="mt-2 text-muted-foreground">
          Puede haber sido cerrada o el enlace es incorrecto.
        </p>
        <Link href="/empleos" className="mt-4 inline-block text-primary hover:underline">
          Volver a empleos
        </Link>
      </div>
    );
  }

  const company = job.companies || store.getCompany(job.company_id);
  const otherJobs = store
    .getCompanyJobs(job.company_id)
    .filter((j) => j.status === "published" && j.id !== job.id)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.published_at || job.created_at,
    employmentType: job.job_type?.toUpperCase(),
    hiringOrganization: {
      "@type": "Organization",
      name: company?.name,
      sameAs: company?.website || undefined,
    },
    jobLocation:
      job.modality === "remote"
        ? {
            "@type": "Place",
            address: { "@type": "PostalAddress", addressCountry: job.country || "LATAM" },
          }
        : {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: job.city || undefined,
              addressCountry: job.country || undefined,
            },
          },
    baseSalary:
      job.salary_min || job.salary_max
        ? {
            "@type": "MonetaryAmount",
            currency: job.salary_currency || "USD",
            value: {
              "@type": "QuantitativeValue",
              minValue: job.salary_min || undefined,
              maxValue: job.salary_max || undefined,
              unitText: job.salary_period === "year" ? "YEAR" : "MONTH",
            },
          }
        : undefined,
  };

  return (
    <div className="bg-surface min-h-[70vh]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="border-b border-border bg-white">
        <div className="container-page py-8">
          <Link
            href="/empleos"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a empleos
          </Link>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex gap-4">
              <Avatar name={company?.name || "E"} size="xl" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  {job.title}
                </h1>
                <Link
                  href={`/empresas/${company?.slug}`}
                  className="mt-1 inline-flex items-center gap-1.5 text-primary hover:underline"
                >
                  <Building2 className="h-4 w-4" />
                  {company?.name}
                </Link>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <Badge>{labelOf(SENIORITY, job.seniority)}</Badge>
                  <Badge variant="secondary">
                    {labelOf(MODALITIES, job.modality)}
                  </Badge>
                  <Badge variant="outline">
                    {labelOf(JOB_TYPES, job.job_type)}
                  </Badge>
                  {job.categories && (
                    <Badge variant="outline">{job.categories.name}</Badge>
                  )}
                  {job.status === "closed" && (
                    <Badge variant="danger">Cerrada</Badge>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {job.modality === "remote"
                      ? job.country || "Remoto"
                      : [job.city, job.country].filter(Boolean).join(", ")}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Publicado {relativeDate(job.published_at || job.created_at)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row lg:flex-col lg:items-stretch lg:min-w-[240px]">
              <div className="rounded-2xl border border-primary/20 bg-primary-soft px-5 py-3 text-center">
                <p className="text-xs font-medium uppercase tracking-wide text-primary">
                  Compensación
                </p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  {formatSalary(
                    job.salary_min,
                    job.salary_max,
                    job.salary_currency,
                    job.salary_period
                  )}
                </p>
              </div>
              <JobApplyButton job={job} />
              <div className="flex gap-2">
                <JobSaveButton jobId={job.id} />
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(window.location.href);
                      toast.success("Enlace copiado");
                    } catch {
                      toast.message(window.location.href);
                    }
                  }}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardContent className="space-y-6 p-6 sm:p-8">
                <section>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Descripción
                  </h2>
                  <p className="mt-3 whitespace-pre-line text-slate-600 leading-relaxed">
                    {job.description}
                  </p>
                </section>
                {job.responsibilities && (
                  <section>
                    <h2 className="text-lg font-semibold">Responsabilidades</h2>
                    <p className="mt-3 whitespace-pre-line text-slate-600 leading-relaxed">
                      {job.responsibilities}
                    </p>
                  </section>
                )}
                {job.requirements && (
                  <section>
                    <h2 className="text-lg font-semibold">Requisitos</h2>
                    <p className="mt-3 whitespace-pre-line text-slate-600 leading-relaxed">
                      {job.requirements}
                    </p>
                  </section>
                )}
                {job.nice_to_have && (
                  <section>
                    <h2 className="text-lg font-semibold">Deseable</h2>
                    <p className="mt-3 whitespace-pre-line text-slate-600 leading-relaxed">
                      {job.nice_to_have}
                    </p>
                  </section>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-900">Sobre la empresa</h3>
                <div className="mt-4 flex items-center gap-3">
                  <Avatar name={company?.name || "E"} size="lg" />
                  <div>
                    <p className="font-medium">{company?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {company?.industry}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed line-clamp-5">
                  {company?.description}
                </p>
                {company?.tech_stack && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {company.tech_stack.map((t) => (
                      <Badge key={t} variant="secondary">
                        {t}
                      </Badge>
                    ))}
                  </div>
                )}
                <Link
                  href={`/empresas/${company?.slug}`}
                  className="mt-5 block"
                >
                  <Button variant="outline" className="w-full">
                    Ver perfil de empresa
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {otherJobs.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold">Más en {company?.name}</h3>
                  <ul className="mt-3 space-y-3">
                    {otherJobs.map((j) => (
                      <li key={j.id}>
                        <Link
                          href={`/empleos/${j.slug}`}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          {j.title}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          {labelOf(MODALITIES, j.modality)}
                        </p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
