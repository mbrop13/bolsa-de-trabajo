"use client";

import Link from "next/link";
import { DEMO_SESSION, useRecluStore } from "@/lib/store/reclu-store";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/jobs/job-card";
import { Bookmark } from "lucide-react";

export default function GuardadosPage() {
  const store = useRecluStore();
  const jobs = store.getSavedJobs(DEMO_SESSION.candidateUserId);

  if (!store.ready) {
    return <p className="text-muted-foreground">Cargando…</p>;
  }

  if (!jobs.length) {
    return (
      <EmptyState
        icon={Bookmark}
        title="No tienes vacantes guardadas"
        description="Guarda empleos desde el detalle para revisarlos más tarde."
        action={
          <Link href="/empleos">
            <Button>Explorar empleos</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-4 pb-20 lg:pb-0">
      <p className="text-sm text-muted-foreground">
        {jobs.length} vacante(s) guardada(s)
      </p>
      <div className="grid gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="relative">
            <JobCard job={job} />
            <div className="mt-2 flex justify-end">
              <Button
                size="sm"
                variant="ghost"
                onClick={() =>
                  store.toggleSaveJob(DEMO_SESSION.candidateUserId, job.id)
                }
              >
                Quitar de guardados
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
