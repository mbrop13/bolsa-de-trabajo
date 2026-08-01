import {
  demoCompanies,
  demoJobs,
  demoApplications,
  demoProfiles,
} from "@/lib/demo-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminOverviewPage() {
  const pending = demoCompanies.filter((c) => c.status === "pending");
  const approved = demoCompanies.filter((c) => c.status === "approved");
  const published = demoJobs.filter((j) => j.status === "published");

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Panel admin Reclu</h2>
        <p className="mt-1 text-muted-foreground">
          Moderación y métricas · ProgramBI
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Empresas pendientes", value: pending.length, highlight: true },
          { label: "Empresas aprobadas", value: approved.length },
          { label: "Vacantes publicadas", value: published.length },
          { label: "Postulaciones", value: demoApplications.length },
        ].map((stat) => (
          <Card
            key={stat.label}
            className={stat.highlight ? "border-amber-200 bg-amber-50/50" : ""}
          >
            <CardContent className="p-5">
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">Cola de aprobación</CardTitle>
          <Link href="/admin/empresas">
            <Button variant="ghost" size="sm">
              Ver todas
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="space-y-3">
          {pending.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No hay empresas pendientes.
            </p>
          ) : (
            pending.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between rounded-xl border border-border px-4 py-3"
              >
                <div>
                  <p className="font-medium text-sm">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.website}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="warning">Pendiente</Badge>
                  <Link href={`/admin/empresas/${c.id}`}>
                    <Button size="sm">Revisar</Button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Usuarios demo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {demoProfiles.map((p) => (
              <div
                key={p.id}
                className="flex justify-between rounded-lg border border-border px-3 py-2"
              >
                <span>{p.full_name}</span>
                <Badge variant="secondary">{p.role}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Acciones rápidas</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Link href="/admin/empresas">
              <Button variant="outline" size="sm">
                Aprobar empresas
              </Button>
            </Link>
            <Link href="/admin/vacantes">
              <Button variant="outline" size="sm">
                Moderación vacantes
              </Button>
            </Link>
            <Link href="/admin/usuarios">
              <Button variant="outline" size="sm">
                Usuarios
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
