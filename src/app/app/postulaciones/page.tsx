"use client";

import { DEMO_SESSION, useRecluStore } from "@/lib/store/reclu-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { labelOf, APPLICATION_STATUS } from "@/lib/constants";
import { relativeDate } from "@/lib/utils";
import { Briefcase } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function PostulacionesPage() {
  const store = useRecluStore();
  const apps = store.getApplicationsForCandidate(DEMO_SESSION.candidateId);

  if (!store.ready) {
    return <p className="text-muted-foreground">Cargando…</p>;
  }

  if (!apps.length) {
    return (
      <EmptyState
        icon={Briefcase}
        title="Aún no has postulado"
        description="Explora vacantes y postula con tu perfil profesional. El estado se actualiza cuando la empresa revisa tu postulación."
        action={
          <Link href="/empleos">
            <Button>Ver empleos</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-4 pb-20 lg:pb-0">
      <p className="text-sm text-muted-foreground">
        {apps.length} postulación(es). Los estados los actualiza la empresa
        (revisión, entrevista, etc.).
      </p>
      <div className="space-y-3">
        {apps.map((app) => {
          const statusMeta = APPLICATION_STATUS.find(
            (s) => s.value === app.status
          );
          const variant =
            statusMeta?.color === "green"
              ? "success"
              : statusMeta?.color === "red"
                ? "danger"
                : statusMeta?.color === "amber"
                  ? "warning"
                  : statusMeta?.color === "violet"
                    ? "violet"
                    : "default";
          return (
            <div
              key={app.id}
              className="rounded-2xl border border-border bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <Link
                    href={`/empleos/${app.jobs?.slug}`}
                    className="font-semibold text-slate-900 hover:text-primary"
                  >
                    {app.jobs?.title}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {app.jobs?.companies?.name}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Enviada {relativeDate(app.created_at)}
                    {app.updated_at !== app.created_at &&
                      ` · Actualizada ${relativeDate(app.updated_at)}`}
                  </p>
                  {app.cover_message && (
                    <p className="mt-3 text-sm text-slate-600 line-clamp-2">
                      “{app.cover_message}”
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-stretch gap-2 sm:items-end">
                  <Badge variant={variant as "default"}>
                    {labelOf(APPLICATION_STATUS, app.status)}
                  </Badge>
                  {app.jobs?.slug && (
                    <Link href={`/empleos/${app.jobs.slug}`}>
                      <Button size="sm" variant="outline">
                        Ver vacante
                      </Button>
                    </Link>
                  )}
                  {!["hired", "withdrawn", "rejected"].includes(app.status) && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        const res = store.withdrawApplication(
                          app.id,
                          DEMO_SESSION.candidateId
                        );
                        if (!res.ok) toast.error(res.error);
                        else toast.message("Postulación retirada");
                      }}
                    >
                      Retirar
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
