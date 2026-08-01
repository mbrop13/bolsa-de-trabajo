"use client";

import Link from "next/link";
import { demoCandidates } from "@/lib/demo-data";
import { DEMO_SESSION, useRecluStore } from "@/lib/store/reclu-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JobCard } from "@/components/jobs/job-card";
import { profileCompleteness } from "@/lib/utils";
import { labelOf, APPLICATION_STATUS } from "@/lib/constants";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Mail,
  User,
} from "lucide-react";
import { CandidateOnboarding } from "@/components/onboarding/candidate-onboarding";

export default function CandidateDashboardPage() {
  const store = useRecluStore();
  const candidate =
    store.getCandidate(DEMO_SESSION.candidateId) ||
    demoCandidates[0];
  const completeness = profileCompleteness({
    photo: Boolean(candidate.profiles?.avatar_url),
    headline: Boolean(candidate.headline),
    about: Boolean(candidate.about),
    experience: Boolean(candidate.experiences?.length),
    education: Boolean(candidate.education?.length),
    skills: Boolean(candidate.skills?.length),
    resume: Boolean(candidate.resume_url),
    location: Boolean(candidate.city || candidate.country),
  });
  const apps = store.getApplicationsForCandidate(DEMO_SESSION.candidateId);
  const unread = store.getUnreadCount({
    candidateId: DEMO_SESSION.candidateId,
  });
  const jobs = store.getPublishedJobs().slice(0, 3);

  if (!store.ready) {
    return <p className="text-muted-foreground">Cargando…</p>;
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <CandidateOnboarding />
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">Hola de nuevo,</p>
        <h2 className="text-2xl font-bold text-slate-900">
          {candidate.profiles?.full_name}
        </h2>
        <p className="mt-1 text-muted-foreground">{candidate.headline}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <User className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{completeness}%</p>
              <p className="text-xs text-muted-foreground">Perfil completo</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <Briefcase className="h-5 w-5" />
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
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{unread}</p>
              <p className="text-xs text-muted-foreground">Chats sin leer</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">Activa</p>
              <p className="text-xs text-muted-foreground">Búsqueda laboral</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {unread > 0 && (
        <Card className="border-primary/20 bg-primary-soft/40">
          <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">
                Tienes {unread} mensaje(s) sin leer en el chat
              </p>
              <p className="text-sm text-muted-foreground">
                Empresas verificadas quieren hablar contigo.
              </p>
            </div>
            <Link href="/app/mensajes">
              <Button>
                Abrir chat
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {completeness < 100 && (
        <Card className="border-border">
          <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-slate-900">
                Completa tu perfil al {completeness}%
              </p>
              <p className="text-sm text-muted-foreground">
                Los perfiles detallados reciben más respuestas.
              </p>
              <div className="mt-3 h-2 max-w-xs overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${completeness}%` }}
                />
              </div>
            </div>
            <Link href="/app/perfil">
              <Button variant="outline">
                Editar perfil
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">Empleos abiertos</h3>
          <Link href="/empleos" className="text-sm text-primary hover:underline">
            Ver todos
          </Link>
        </div>
        <div className="grid gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">Postulaciones recientes</CardTitle>
          <Link href="/app/postulaciones">
            <Button variant="ghost" size="sm">
              Ver todas
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="space-y-3">
          {apps.slice(0, 5).map((app) => (
            <div
              key={app.id}
              className="flex items-center justify-between rounded-xl border border-border px-4 py-3"
            >
              <div>
                <p className="font-medium text-sm">{app.jobs?.title}</p>
                <p className="text-xs text-muted-foreground">
                  {app.jobs?.companies?.name}
                </p>
              </div>
              <Badge variant="secondary">
                {labelOf(APPLICATION_STATUS, app.status)}
              </Badge>
            </div>
          ))}
          {!apps.length && (
            <p className="text-sm text-muted-foreground">
              Aún no has postulado.{" "}
              <Link href="/empleos" className="text-primary hover:underline">
                Explora vacantes
              </Link>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
