"use client";

import Link from "next/link";
import { useRecluStore } from "@/lib/store/reclu-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { labelOf, SENIORITY, MODALITIES } from "@/lib/constants";
import { EmptyState } from "@/components/ui/empty-state";
import { Briefcase, Plus } from "lucide-react";
import { toast } from "sonner";

export default function VacantesListPage() {
  const store = useRecluStore();
  const companyId = store.getActiveCompanyId();
  const company = store.getCompany(companyId);
  const jobs = store.getCompanyJobs(companyId);
  const canPublish = company?.status === "approved";

  if (!store.ready) {
    return <p className="text-muted-foreground">Cargando…</p>;
  }

  return (
    <div className="space-y-4 pb-20 lg:pb-0">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {jobs.length} vacante(s) · Publicadas aparecen en /empleos
        </p>
        <Link href={canPublish ? "/empresa/vacantes/nueva" : "#"}>
          <Button
            size="sm"
            disabled={!canPublish}
            onClick={(e) => {
              if (!canPublish) {
                e.preventDefault();
                toast.message("Cuenta pendiente de aprobación", {
                  description:
                    "Cuando un admin apruebe tu empresa podrás publicar vacantes.",
                });
              }
            }}
          >
            <Plus className="h-4 w-4" />
            Nueva
          </Button>
        </Link>
      </div>

      {jobs.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="Aún no tienes vacantes"
          description="Publica tu primera oferta para recibir postulaciones."
          action={
            <Link href="/empresa/vacantes/nueva">
              <Button>
                <Plus className="h-4 w-4" />
                Crear vacante
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => {
            const count = store.getApplicationsForJob(job.id).filter(
              (a) => a.status !== "withdrawn"
            ).length;
            return (
              <div
                key={job.id}
                className="rounded-2xl border border-border bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">{job.title}</h3>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      <Badge
                        variant={
                          job.status === "published"
                            ? "success"
                            : job.status === "closed"
                              ? "secondary"
                              : "warning"
                        }
                      >
                        {job.status}
                      </Badge>
                      <Badge variant="outline">
                        {labelOf(SENIORITY, job.seniority)}
                      </Badge>
                      <Badge variant="outline">
                        {labelOf(MODALITIES, job.modality)}
                      </Badge>
                      <Badge variant="secondary">{count} postulaciones</Badge>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.status === "draft" && (
                      <Button
                        size="sm"
                        onClick={() => {
                          const res = store.setJobStatus(job.id, "published");
                          if (!res.ok) toast.error(res.error);
                          else toast.success("Vacante publicada");
                        }}
                      >
                        Publicar
                      </Button>
                    )}
                    {job.status === "published" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          store.setJobStatus(job.id, "closed");
                          toast.message("Vacante cerrada");
                        }}
                      >
                        Cerrar
                      </Button>
                    )}
                    {job.status === "closed" && (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          const res = store.setJobStatus(job.id, "published");
                          if (!res.ok) toast.error(res.error);
                          else toast.success("Vacante reabierta");
                        }}
                      >
                        Reabrir
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        const res = store.duplicateJob(job.id);
                        if (!res.ok) toast.error(res.error);
                        else toast.success("Copia creada como borrador");
                      }}
                    >
                      Duplicar
                    </Button>
                    <Link href={`/empresa/vacantes/${job.id}`}>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </Link>
                    <Link href={`/empresa/vacantes/${job.id}/postulaciones`}>
                      <Button size="sm">Inbox ({count})</Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
