import Link from "next/link";
import { demoCompanies, demoJobs } from "@/lib/demo-data";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Sparkles } from "lucide-react";

export const metadata = {
  title: "Empresas",
  description: "Empresas tech verificadas que contratan en Reclu.",
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
    <div className="bg-surface min-h-[70vh]">
      <div className="border-b border-border bg-white">
        <div className="container-page py-10">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Empresas
          </h1>
          <p className="mt-2 text-muted-foreground">
            Organizaciones verificadas por el equipo de Reclu / ProgramBI
          </p>
        </div>
      </div>

      <div className="container-page py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <Link key={company.id} href={`/empresas/${company.slug}`}>
              <Card className="h-full transition-all hover:border-primary/30 hover:shadow-md">
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
                  <p className="mt-4 text-sm text-slate-600 line-clamp-2">
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
