"use client";

import Link from "next/link";
import { useRecluStore } from "@/lib/store/reclu-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Clock,
  Plus,
  Users,
  AlertCircle,
  Mail,
} from "lucide-react";

export default function EmpresaDashboardPage() {
  const store = useRecluStore();
  const companyId = store.getActiveCompanyId();
  const company = store.getCompany(companyId);
  const jobs = store.getCompanyJobs(companyId);
  const published = jobs.filter((j) => j.status === "published");
  const apps = store.getApplicationsForCompany(companyId);
  const newApps = apps.filter((a) => a.status === "submitted");
  const unreadChat = store.getUnreadCount({
    companyId,
  });
  const threads = store.getThreadsForCompany(companyId);

  if (!store.ready || !company) {
    return <p className="text-muted-foreground">Cargando…</p>;
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {company.status === "pending" && (
        <div className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <div>
            <p className="font-semibold">Cuenta en revisión</p>
            <p className="text-sm opacity-90">
              El equipo de Reclu está validando tu empresa. Podrás publicar
              vacantes y contactar talento cuando seas aprobada.
            </p>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Panel de empresa</p>
            <h2 className="text-2xl font-bold text-slate-900">{company.name}</h2>
            <Badge
              className="mt-2"
              variant={
                company.status === "approved" ? "success" : "warning"
              }
            >
              {company.status === "approved"
                ? "Aprobada"
                : company.status === "pending"
                  ? "Pendiente de aprobación"
                  : company.status}
            </Badge>
          </div>
          <Link href="/empresa/vacantes/nueva">
            <Button disabled={company.status !== "approved"}>
              <Plus className="h-4 w-4" />
              Nueva vacante
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{published.length}</p>
              <p className="text-xs text-muted-foreground">Vacantes activas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{apps.length}</p>
              <p className="text-xs text-muted-foreground">Postulaciones</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{newApps.length}</p>
              <p className="text-xs text-muted-foreground">Nuevas por revisar</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{unreadChat}</p>
              <p className="text-xs text-muted-foreground">
                Chats sin leer · {threads.length} total
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-base">Vacantes recientes</CardTitle>
            <Link href="/empresa/vacantes">
              <Button variant="ghost" size="sm">
                Ver todas
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {jobs.slice(0, 5).map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between rounded-xl border border-border px-4 py-3"
              >
                <div>
                  <Link
                    href={`/empresa/vacantes/${job.id}`}
                    className="font-medium text-sm hover:text-primary"
                  >
                    {job.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">{job.status}</p>
                </div>
                <Link href={`/empresa/vacantes/${job.id}/postulaciones`}>
                  <Button size="sm" variant="outline">
                    Inbox
                  </Button>
                </Link>
              </div>
            ))}
            {!jobs.length && (
              <p className="text-sm text-muted-foreground">
                Publica tu primera vacante para empezar a recibir talento.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-base">Postulaciones nuevas</CardTitle>
            <Link href="/empresa/mensajes">
              <Button variant="ghost" size="sm">
                Mensajes
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {newApps.slice(0, 5).map((app) => (
              <div
                key={app.id}
                className="rounded-xl border border-border px-4 py-3"
              >
                <p className="text-sm font-medium">
                  {app.candidate_profiles?.profiles?.full_name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {app.jobs?.title}
                </p>
                <Link
                  href={`/empresa/vacantes/${app.job_id}/postulaciones`}
                  className="mt-1 inline-block text-xs text-primary hover:underline"
                >
                  Revisar →
                </Link>
              </div>
            ))}
            {!newApps.length && (
              <p className="text-sm text-muted-foreground">
                No hay postulaciones nuevas por revisar.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
