"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRecluStore } from "@/lib/store/reclu-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { SENIORITY, MODALITIES, JOB_TYPES } from "@/lib/constants";
import { toast } from "sonner";
import { ExternalLink } from "lucide-react";

export default function EditarVacantePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const store = useRecluStore();
  const job = store.getJobById(id);
  const [form, setForm] = useState({
    title: "",
    description: "",
    responsibilities: "",
    requirements: "",
    nice_to_have: "",
    seniority: "semi_senior",
    job_type: "full_time",
    modality: "remote",
    city: "",
    country: "",
    salary_min: "",
    salary_max: "",
  });

  useEffect(() => {
    if (!job) return;
    setForm({
      title: job.title,
      description: job.description,
      responsibilities: job.responsibilities || "",
      requirements: job.requirements || "",
      nice_to_have: job.nice_to_have || "",
      seniority: job.seniority,
      job_type: job.job_type,
      modality: job.modality,
      city: job.city || "",
      country: job.country || "",
      salary_min: job.salary_min?.toString() || "",
      salary_max: job.salary_max?.toString() || "",
    });
  }, [job]);

  if (!store.ready) return <p className="text-muted-foreground">Cargando…</p>;
  if (!job) {
    return (
      <p className="text-muted-foreground">
        Vacante no encontrada.{" "}
        <Link href="/empresa/vacantes" className="text-primary">
          Volver
        </Link>
      </p>
    );
  }

  function save() {
    const res = store.updateJob(id, {
      title: form.title,
      description: form.description,
      responsibilities: form.responsibilities || null,
      requirements: form.requirements || null,
      nice_to_have: form.nice_to_have || null,
      seniority: form.seniority,
      job_type: form.job_type,
      modality: form.modality,
      city: form.city || null,
      country: form.country || null,
      salary_min: form.salary_min ? Number(form.salary_min) : null,
      salary_max: form.salary_max ? Number(form.salary_max) : null,
    });
    if (!res.ok) toast.error(res.error);
    else toast.success("Vacante actualizada");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4 pb-20 lg:pb-0">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold">{job.title}</h2>
          <Badge className="mt-1">{job.status}</Badge>
        </div>
        <div className="flex gap-2">
          {job.status === "published" && (
            <Link href={`/empleos/${job.slug}`} target="_blank">
              <Button variant="outline" size="sm">
                Ver pública
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </Link>
          )}
          <Link href={`/empresa/vacantes/${job.id}/postulaciones`}>
            <Button variant="secondary" size="sm">
              Postulaciones (
              {
                store.getApplicationsForJob(job.id).filter(
                  (a) => a.status !== "withdrawn"
                ).length
              }
              )
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Editar vacante</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label>Título</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Seniority</Label>
            <Select
              value={form.seniority}
              onChange={(e) => setForm({ ...form, seniority: e.target.value })}
            >
              {SENIORITY.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Modalidad</Label>
            <Select
              value={form.modality}
              onChange={(e) => setForm({ ...form, modality: e.target.value })}
            >
              {MODALITIES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Tipo</Label>
            <Select
              value={form.job_type}
              onChange={(e) => setForm({ ...form, job_type: e.target.value })}
            >
              {JOB_TYPES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Ciudad</Label>
            <Input
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>País</Label>
            <Input
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Salario mín.</Label>
            <Input
              type="number"
              value={form.salary_min}
              onChange={(e) =>
                setForm({ ...form, salary_min: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Salario máx.</Label>
            <Input
              type="number"
              value={form.salary_max}
              onChange={(e) =>
                setForm({ ...form, salary_max: e.target.value })
              }
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Descripción</Label>
            <Textarea
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Responsabilidades</Label>
            <Textarea
              rows={3}
              value={form.responsibilities}
              onChange={(e) =>
                setForm({ ...form, responsibilities: e.target.value })
              }
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Requisitos</Label>
            <Textarea
              rows={3}
              value={form.requirements}
              onChange={(e) =>
                setForm({ ...form, requirements: e.target.value })
              }
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Deseable</Label>
            <Textarea
              rows={2}
              value={form.nice_to_have}
              onChange={(e) =>
                setForm({ ...form, nice_to_have: e.target.value })
              }
            />
          </div>
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            <Button type="button" onClick={save}>
              Guardar cambios
            </Button>
            {job.status === "draft" && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  const res = store.setJobStatus(id, "published");
                  if (!res.ok) toast.error(res.error);
                  else toast.success("Publicada");
                }}
              >
                Publicar
              </Button>
            )}
            {job.status === "published" && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  store.setJobStatus(id, "closed");
                  toast.message("Cerrada");
                }}
              >
                Cerrar vacante
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
