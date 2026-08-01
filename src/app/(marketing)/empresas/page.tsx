import Link from "next/link";
import { demoCompanies, demoJobs } from "@/lib/demo-data";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AuthButton } from "@/components/auth/auth-button";
import { PageHero } from "@/components/marketing/page-hero";
import { MapPin, Sparkles, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Empresas",
  description:
    "Directorio de empresas verificadas que contratan en Reclu by ProgramBI.",
};

export default function EmpresasPage() {
  const companies = demoCompanies
    .filter((c) => c.status === "approved")
    .map((c) => ({
      ...c,
      jobs_count: demoJobs.filter(
        (j) => j.company_id === c.id && j.status === "published"
      ).length,
    }));

  return (
    <div className="min-h-[70vh] bg-surface">
      <PageHero
        eyebrow="Directorio"
        title="Empresas en Reclu"
        description="Explora organizaciones que publican vacantes y su cultura de trabajo."
      >
        <AuthButton mode="register" role="company" size="lg">
          Registrar mi empresa
          <ArrowRight className="h-4 w-4" />
        </AuthButton>
      </PageHero>

      <div className="container-page py-12">
        <p className="mb-6 text-sm text-muted-foreground">
          {companies.length} empresas en la red
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <Link key={company.id} href={`/empresas/${company.slug}`}>
              <Card className="h-full transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Avatar name={company.name} size="lg" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="truncate font-semibold text-slate-900">
                          {company.name}
                        </h2>
                        {company.is_featured && (
                          <Sparkles className="h-4 w-4 shrink-0 text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {company.tagline}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600 line-clamp-2">
                    {company.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {company.industry && (
                      <Badge variant="secondary">{company.industry}</Badge>
                    )}
                    <Badge variant="outline">
                      {company.jobs_count} vacantes
                    </Badge>
                  </div>
                  <p className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {company.headquarters}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
