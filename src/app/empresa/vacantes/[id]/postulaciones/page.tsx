"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import { useRecluStore } from "@/lib/store/reclu-store";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { EmptyState } from "@/components/ui/empty-state";
import { ContactCandidateButton } from "@/components/contact/contact-candidate-dialog";
import { labelOf, APPLICATION_STATUS } from "@/lib/constants";
import { LayoutGrid, List, Users } from "lucide-react";
import { toast } from "sonner";
import type { Application, ApplicationStatus } from "@/types/database";
import { cn } from "@/lib/utils";

const PIPELINE: ApplicationStatus[] = [
  "submitted",
  "in_review",
  "interview",
  "hired",
  "rejected",
];

function AppCard({
  app,
  jobId,
  compact,
}: {
  app: Application;
  jobId: string;
  compact?: boolean;
}) {
  const store = useRecluStore();
  const cand = app.candidate_profiles;
  const name = cand?.profiles?.full_name || cand?.username || "Candidato";
  const [notes, setNotes] = useState(app.company_notes || "");

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-white shadow-sm",
        compact ? "p-3" : "p-5"
      )}
    >
      <div className="flex gap-3">
        <Avatar name={name} size={compact ? "md" : "lg"} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <p className="font-semibold text-sm text-slate-900">{name}</p>
            {cand?.is_programbi_alumni && (
              <Badge className="text-[10px]">ProgramBI</Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {cand?.headline}
          </p>
          {!compact && app.cover_message && (
            <p className="mt-2 rounded-lg bg-slate-50 p-2 text-xs text-slate-600 line-clamp-3 whitespace-pre-line">
              {app.cover_message}
            </p>
          )}
          {!compact && (
            <Textarea
              className="mt-2 text-xs"
              rows={2}
              placeholder="Notas internas..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={() => {
                store.updateApplicationStatus(app.id, app.status, notes);
                toast.success("Notas guardadas");
              }}
            />
          )}
        </div>
      </div>
      <div className={cn("mt-3 flex flex-col gap-2", compact && "mt-2")}>
        <Select
          value={app.status}
          className="h-8 text-xs"
          onChange={(e) => {
            const status = e.target.value as ApplicationStatus;
            store.updateApplicationStatus(app.id, status, notes);
            toast.success(`→ ${labelOf(APPLICATION_STATUS, status)}`);
          }}
        >
          {APPLICATION_STATUS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </Select>
        <div className="flex gap-1.5">
          {cand?.username && (
            <Link href={`/talento/${cand.username}`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full text-xs">
                Perfil
              </Button>
            </Link>
          )}
          {cand && (
            <ContactCandidateButton
              candidate={cand}
              defaultJobId={jobId}
              variant="secondary"
              size="sm"
              className="flex-1 text-xs"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function PostulacionesVacantePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const store = useRecluStore();
  const job = store.getJobById(id);
  const apps = store.getApplicationsForJob(id);
  const [view, setView] = useState<"list" | "kanban">("kanban");

  const byStatus = useMemo(() => {
    const map: Record<string, Application[]> = {};
    for (const s of PIPELINE) map[s] = [];
    for (const a of apps) {
      if (a.status === "withdrawn") continue;
      if (!map[a.status]) map[a.status] = [];
      map[a.status].push(a);
    }
    return map;
  }, [apps]);

  if (!store.ready) return <p className="text-muted-foreground">Cargando…</p>;
  if (!job) return <p>Vacante no encontrada</p>;

  const active = apps.filter((a) => a.status !== "withdrawn");

  if (!active.length) {
    return (
      <EmptyState
        icon={Users}
        title="Sin postulaciones aún"
        description="Cuando alguien postule desde la vacante pública, aparecerá aquí con pipeline y contacto."
        action={
          job.status === "published" ? (
            <Link href={`/empleos/${job.slug}`}>
              <Button variant="outline">Ver vacante pública</Button>
            </Link>
          ) : undefined
        }
      />
    );
  }

  return (
    <div className="space-y-4 pb-20 lg:pb-0">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold">{job.title}</h2>
          <p className="text-sm text-muted-foreground">
            Pipeline · {active.length} candidato(s) activo(s)
          </p>
        </div>
        <div className="inline-flex rounded-xl border border-border bg-white p-1">
          <button
            type="button"
            onClick={() => setView("kanban")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium",
              view === "kanban" ? "bg-primary text-white" : "text-slate-600"
            )}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            Kanban
          </button>
          <button
            type="button"
            onClick={() => setView("list")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium",
              view === "list" ? "bg-primary text-white" : "text-slate-600"
            )}
          >
            <List className="h-3.5 w-3.5" />
            Lista
          </button>
        </div>
      </div>

      {view === "list" ? (
        <div className="space-y-3">
          {active.map((app) => (
            <AppCard key={app.id} app={app} jobId={job.id} />
          ))}
        </div>
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {PIPELINE.map((status) => (
            <div
              key={status}
              className="w-72 shrink-0 rounded-2xl border border-border bg-slate-50/80 p-3"
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                  {labelOf(APPLICATION_STATUS, status)}
                </p>
                <Badge variant="secondary" className="text-[10px]">
                  {byStatus[status]?.length || 0}
                </Badge>
              </div>
              <div className="space-y-2 min-h-[120px]">
                {(byStatus[status] || []).map((app) => (
                  <AppCard key={app.id} app={app} jobId={job.id} compact />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
