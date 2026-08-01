import Link from "next/link";
import { notFound } from "next/navigation";
import { demoCompanies, demoJobs } from "@/lib/demo-data";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/jobs/job-card";
import { labelOf, COMPANY_SIZES } from "@/lib/constants";
import { ExternalLink, MapPin, ArrowLeft, Globe } from "lucide-react";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const company = demoCompanies.find((c) => c.slug === slug);
  if (!company) return { title: "Empresa no encontrada" };
  return {
    title: company.name,
    description: company.tagline || company.description?.slice(0, 160),
  };
}

export default async function CompanyPublicPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const company = demoCompanies.find(
    (c) => c.slug === slug && c.status === "approved"
  );
  if (!company) notFound();

  const jobs = demoJobs
    .filter((j) => j.company_id === company.id && j.status === "published")
    .map((j) => ({ ...j, companies: company }));

  return (
    <div className="bg-surface min-h-[70vh]">
      <div className="border-b border-border bg-white">
        <div className="container-page py-10">
          <Link
            href="/empresas"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Directorio
          </Link>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <Avatar name={company.name} size="xl" />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900">
                {company.name}
              </h1>
              {company.tagline && (
                <p className="mt-1 text-lg text-muted-foreground">
                  {company.tagline}
                </p>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                {company.industry && (
                  <Badge variant="secondary">{company.industry}</Badge>
                )}
                {company.company_size && (
                  <Badge variant="outline">
                    {labelOf(COMPANY_SIZES, company.company_size)}
                  </Badge>
                )}
                {company.founded_year && (
                  <Badge variant="outline">Desde {company.founded_year}</Badge>
                )}
              </div>
              <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {company.headquarters}
              </p>
            </div>
            {company.website && (
              <a href={company.website} target="_blank" rel="noreferrer">
                <Button variant="outline">
                  <Globe className="h-4 w-4" />
                  Sitio web
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="container-page py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <section className="rounded-2xl border border-border bg-white p-6 sm:p-8">
              <h2 className="text-lg font-semibold">Sobre la empresa</h2>
              <p className="mt-3 whitespace-pre-line text-slate-600 leading-relaxed">
                {company.description}
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold">
                Vacantes abiertas ({jobs.length})
              </h2>
              {jobs.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No hay vacantes publicadas en este momento.
                </p>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              )}
            </section>
          </div>

          <div className="space-y-4">
            {company.tech_stack && company.tech_stack.length > 0 && (
              <div className="rounded-2xl border border-border bg-white p-6">
                <h3 className="font-semibold">Stack tecnológico</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {company.tech_stack.map((t) => (
                    <Badge key={t} variant="secondary">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {company.benefits && company.benefits.length > 0 && (
              <div className="rounded-2xl border border-border bg-white p-6">
                <h3 className="font-semibold">Beneficios</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {company.benefits.map((b) => (
                    <Badge key={b} variant="outline">
                      {b}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {company.countries && (
              <div className="rounded-2xl border border-border bg-white p-6">
                <h3 className="font-semibold">Países</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {company.countries.join(" · ")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
