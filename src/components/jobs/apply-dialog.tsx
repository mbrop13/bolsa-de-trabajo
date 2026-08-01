"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog } from "@/components/ui/dialog";
import { DEMO_SESSION, useRecluStore } from "@/lib/store/reclu-store";
import { isEarlyAccess } from "@/lib/config";
import { toast } from "sonner";
import { CheckCircle2, Send } from "lucide-react";
import type { Job } from "@/types/database";
import Link from "next/link";
import { profileCompleteness } from "@/lib/utils";

export function ApplyDialog({
  job,
  open,
  onClose,
}: {
  job: Job;
  open: boolean;
  onClose: () => void;
}) {
  const store = useRecluStore();
  const candidateId = DEMO_SESSION.candidateId;
  const candidate = store.getCandidate(candidateId);
  const already = store.hasApplied(job.id, candidateId);
  const early = isEarlyAccess();
  const completeness = profileCompleteness({
    photo: Boolean(candidate?.profiles?.avatar_url),
    headline: Boolean(candidate?.headline),
    about: Boolean(candidate?.about),
    experience: Boolean(candidate?.experiences?.length),
    education: Boolean(candidate?.education?.length),
    skills: Boolean(candidate?.skills?.length),
    resume: Boolean(candidate?.resume_url),
    location: Boolean(candidate?.city || candidate?.country),
  });

  const [message, setMessage] = useState(
    `Hola equipo de ${job.companies?.name || "la empresa"},\n\nMe interesa mucho el rol de ${job.title}. Creo que mi experiencia encaja con lo que buscan y me gustaría ser considerado/a.\n\nSaludos,\n${candidate?.profiles?.full_name || ""}`
  );
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function submit() {
    if (early) {
      toast.message("Postulaciones próximamente", {
        description:
          "Estamos en early access. Completa tu perfil; podrás postular en el lanzamiento.",
      });
      return;
    }
    setLoading(true);
    // slight delay for premium feel
    await new Promise((r) => setTimeout(r, 280));
    const res = store.applyToJob({
      job_id: job.id,
      candidate_id: candidateId,
      cover_message: message,
      resume_url: candidate?.resume_url,
    });
    setLoading(false);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    setDone(true);
    toast.success("¡Postulación enviada con éxito!");
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={done || already ? "Postulación" : "Postularme"}
      description={`${job.title} · ${job.companies?.name}`}
    >
      {done || already ? (
        <div className="space-y-4 py-2 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div>
            <p className="font-semibold text-slate-900">
              Postulación registrada
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              La empresa puede ver tu perfil y mensaje. Sigue el estado en tu
              panel de postulaciones.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Link href="/app/postulaciones">
              <Button className="w-full sm:w-auto">Ver mis postulaciones</Button>
            </Link>
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {completeness < 40 && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs text-amber-900">
              Tu perfil está al {completeness}%. Puedes postular, pero completar
              experiencia y skills aumenta mucho tus chances.{" "}
              <Link href="/app/perfil" className="font-semibold underline">
                Completar perfil
              </Link>
            </div>
          )}
          <div className="rounded-xl border border-border bg-slate-50 p-3 text-sm">
            <p className="font-medium text-slate-900">
              Postulas como {candidate?.profiles?.full_name}
            </p>
            <p className="text-xs text-muted-foreground">{candidate?.headline}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="cover">Mensaje de presentación</Label>
              <span
                className={`text-xs ${
                  message.trim().length < 20
                    ? "text-amber-600"
                    : "text-muted-foreground"
                }`}
              >
                {message.trim().length}/2000
              </span>
            </div>
            <Textarea
              id="cover"
              rows={7}
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 2000))}
              placeholder="Cuéntales por qué eres un buen fit..."
            />
            <p className="text-xs text-muted-foreground">
              Mínimo 20 caracteres. Sé concreto: stack, impacto y disponibilidad.
            </p>
          </div>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={submit}
              disabled={loading || message.trim().length < 20}
            >
              <Send className="h-4 w-4" />
              {loading ? "Enviando..." : "Enviar postulación"}
            </Button>
          </div>
        </div>
      )}
    </Dialog>
  );
}
