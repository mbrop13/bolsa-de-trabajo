"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  SENIORITY,
  MODALITIES,
  JOB_TYPES,
} from "@/lib/constants";
import { demoCategories } from "@/lib/demo-data";
import { DEMO_SESSION, useRecluStore } from "@/lib/store/reclu-store";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

export default function NuevaVacantePage() {
  const router = useRouter();
  const store = useRecluStore();
  const companyId = store.getActiveCompanyId();
  const company = store.getCompany(companyId);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category_id: "cat-1",
    seniority: "semi_senior",
    job_type: "full_time",
    modality: "remote",
    city: "",
    country: "LATAM",
    salary_min: "",
    salary_max: "",
    description: "",
    responsibilities: "",
    requirements: "",
    nice_to_have: "",
    experience_years: "",
  });

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function buildInput(status: "draft" | "published") {
    return {
      company_id: companyId,
      category_id: form.category_id,
      title: form.title,
      description: form.description,
      responsibilities: form.responsibilities,
      requirements: form.requirements,
      nice_to_have: form.nice_to_have,
      seniority: form.seniority,
      job_type: form.job_type,
      modality: form.modality,
      city: form.city,
      country: form.country,
      salary_min: form.salary_min ? Number(form.salary_min) : null,
      salary_max: form.salary_max ? Number(form.salary_max) : null,
      salary_currency: "USD",
      salary_period: "month" as const,
      experience_years: form.experience_years
        ? Number(form.experience_years)
        : null,
      status,
    };
  }

  function save(status: "draft" | "published") {
    setLoading(true);
    const res = store.createJob(buildInput(status));
    setLoading(false);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    toast.success(
      status === "published"
        ? "Vacante publicada. Ya es visible en /empleos"
        : "Borrador guardado"
    );
    router.push(`/empresa/vacantes/${res.job.id}`);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 pb-20 lg:pb-0">
      {company?.status !== "approved" && (
        <div className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <div className="text-sm">
            <p className="font-semibold">Empresa no aprobada</p>
            <p>
              Puedes guardar borradores, pero no publicar hasta que Reclu
              apruebe tu empresa.
            </p>
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Nueva vacante</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label>Título del puesto *</Label>
            <Input
              required
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Full Stack Developer"
            />
          </div>
          <div className="space-y-2">
            <Label>Categoría</Label>
            <Select
              value={form.category_id}
              onChange={(e) => set("category_id", e.target.value)}
            >
              {demoCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Seniority</Label>
            <Select
              value={form.seniority}
              onChange={(e) => set("seniority", e.target.value)}
            >
              {SENIORITY.map((s) => (
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
              onChange={(e) => set("job_type", e.target.value)}
            >
              {JOB_TYPES.map((s) => (
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
              onChange={(e) => set("modality", e.target.value)}
            >
              {MODALITIES.map((s) => (
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
              onChange={(e) => set("city", e.target.value)}
              placeholder="Opcional si es remoto"
            />
          </div>
          <div className="space-y-2">
            <Label>País / región</Label>
            <Input
              value={form.country}
              onChange={(e) => set("country", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Salario mín. USD/mes</Label>
            <Input
              type="number"
              value={form.salary_min}
              onChange={(e) => set("salary_min", e.target.value)}
              placeholder="1500"
            />
          </div>
          <div className="space-y-2">
            <Label>Salario máx. USD/mes</Label>
            <Input
              type="number"
              value={form.salary_max}
              onChange={(e) => set("salary_max", e.target.value)}
              placeholder="2500"
            />
          </div>
          <div className="space-y-2">
            <Label>Años de experiencia</Label>
            <Input
              type="number"
              value={form.experience_years}
              onChange={(e) => set("experience_years", e.target.value)}
              placeholder="2"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Descripción *</Label>
            <Textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Qué hace el rol y el equipo..."
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Responsabilidades</Label>
            <Textarea
              rows={3}
              value={form.responsibilities}
              onChange={(e) => set("responsibilities", e.target.value)}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Requisitos</Label>
            <Textarea
              rows={3}
              value={form.requirements}
              onChange={(e) => set("requirements", e.target.value)}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Deseable</Label>
            <Textarea
              rows={2}
              value={form.nice_to_have}
              onChange={(e) => set("nice_to_have", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          disabled={loading}
          variant="outline"
          onClick={() => save("draft")}
        >
          Guardar borrador
        </Button>
        <Button
          type="button"
          disabled={loading || company?.status !== "approved"}
          onClick={() => save("published")}
        >
          Publicar ahora
        </Button>
      </div>
    </div>
  );
}
