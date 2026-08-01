"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { DEMO_SESSION, useRecluStore } from "@/lib/store/reclu-store";
import type { CandidateProfile } from "@/types/database";
import { toast } from "sonner";
import { Mail, X } from "lucide-react";
import Link from "next/link";

export function ContactCandidateDialog({
  candidate,
  open,
  onClose,
  defaultJobId,
}: {
  candidate: CandidateProfile;
  open: boolean;
  onClose: () => void;
  defaultJobId?: string | null;
}) {
  const store = useRecluStore();
  const companyId = store.getActiveCompanyId();
  const company = store.getCompany(companyId);
  const jobs = store
    .getCompanyJobs(companyId)
    .filter((j) => j.status === "published");
  const name = candidate.profiles?.full_name || candidate.username || "candidato";

  const templates = [
    {
      label: "Intro general",
      subject: `Oportunidad en ${company?.name || "nuestra empresa"}`,
      body: `Hola ${name.split(" ")[0]},\n\nVimos tu perfil en Reclu y nos interesó tu experiencia. ¿Tendrías disponibilidad para una breve conversación?\n\nSaludos,\nEquipo de talento — ${company?.name || ""}`,
    },
    {
      label: "Vacante concreta",
      subject: `Te invitamos a postular en ${company?.name || "nuestra empresa"}`,
      body: `Hola ${name.split(" ")[0]},\n\nCreemos que podrías ser un gran fit para una vacante abierta. ¿Te animas a conversar 20 minutos esta semana?\n\nSaludos,\n${company?.name || ""}`,
    },
    {
      label: "ProgramBI alumni",
      subject: `Hola desde ${company?.name || "Reclu"} — alumni ProgramBI`,
      body: `Hola ${name.split(" ")[0]},\n\nVimos que eres de la comunidad ProgramBI. Estamos buscando talento con tu perfil y nos encantaría conocerte.\n\nSaludos,\n${company?.name || ""}`,
    },
  ];

  const [subject, setSubject] = useState(templates[0].subject);
  const [body, setBody] = useState(templates[0].body);
  const [jobId, setJobId] = useState(defaultJobId || "");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);

  if (!open) return null;

  const canContact = company?.status === "approved";

  function submit() {
    setLoading(true);
    const res = store.contactCandidate({
      company_id: companyId,
      candidate_id: candidate.id,
      job_id: jobId || null,
      subject,
      body,
    });
    setLoading(false);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    setThreadId(res.thread?.id || null);
    setSent(true);
    toast.success("Chat iniciado con el candidato");
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
        aria-label="Cerrar"
        onClick={onClose}
      />
      <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-border bg-white p-6 shadow-2xl sm:rounded-3xl">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold">Contactar candidato</h2>
            <p className="text-sm text-muted-foreground">{name}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {!canContact ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            Tu empresa aún no está aprobada. El equipo de Reclu debe validarla
            antes de contactar talento.
          </div>
        ) : sent ? (
          <div className="space-y-4 py-2 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <Mail className="h-6 w-6" />
            </div>
            <p className="font-semibold">Chat iniciado</p>
            <p className="text-sm text-muted-foreground">
              Ya puedes seguir conversando con el candidato en el chat (varios
              mensajes, no solo uno).
            </p>
            <div className="flex justify-center gap-2">
              <Link
                href={
                  threadId
                    ? `/empresa/mensajes?thread=${threadId}`
                    : "/empresa/mensajes"
                }
              >
                <Button size="sm">Abrir chat</Button>
              </Link>
              <Button size="sm" variant="outline" onClick={onClose}>
                Cerrar
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-1.5">
              {templates.map((t) => (
                <button
                  key={t.label}
                  type="button"
                  className="rounded-full border border-border bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600 hover:border-primary/30 hover:bg-primary-soft hover:text-primary"
                  onClick={() => {
                    setSubject(t.subject);
                    setBody(t.body);
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              <Label>Vacante relacionada (opcional)</Label>
              <Select
                value={jobId}
                onChange={(e) => setJobId(e.target.value)}
              >
                <option value="">Sin vacante específica</option>
                {jobs.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.title}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Asunto</Label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                maxLength={120}
              />
            </div>
            <div className="space-y-2">
              <Label>Mensaje</Label>
              <Textarea
                rows={7}
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Sé profesional y concreto. No pidas datos sensibles innecesarios.
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="button" onClick={submit} disabled={loading}>
                <Mail className="h-4 w-4" />
                {loading ? "Enviando..." : "Enviar mensaje"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ContactCandidateButton({
  candidate,
  defaultJobId,
  variant = "default",
  size = "sm",
  className,
}: {
  candidate: CandidateProfile;
  defaultJobId?: string | null;
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        type="button"
        variant={variant}
        size={size}
        className={className}
        onClick={() => setOpen(true)}
      >
        <Mail className="h-4 w-4" />
        Contactar
      </Button>
      <ContactCandidateDialog
        candidate={candidate}
        open={open}
        onClose={() => setOpen(false)}
        defaultJobId={defaultJobId}
      />
    </>
  );
}
