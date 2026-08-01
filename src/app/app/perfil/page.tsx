"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { DEMO_SESSION, useRecluStore } from "@/lib/store/reclu-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AVAILABILITY,
  EMPLOYMENT_STATUS,
  MODALITIES,
  START_AVAILABILITY,
  JOB_TYPES,
  SKILL_LEVELS,
  LANGUAGE_LEVELS,
} from "@/lib/constants";
import { profileCompleteness } from "@/lib/utils";
import { toast } from "sonner";
import { ExternalLink, Plus, Trash2 } from "lucide-react";

const tabs = [
  { id: "basico", label: "Básico" },
  { id: "experiencia", label: "Experiencia" },
  { id: "educacion", label: "Educación" },
  { id: "skills", label: "Skills" },
  { id: "proyectos", label: "Proyectos" },
  { id: "extras", label: "Extras" },
] as const;

export default function PerfilEditorPage() {
  const store = useRecluStore();
  const candidateId = DEMO_SESSION.candidateId;
  const candidate = store.getCandidate(candidateId);
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("basico");

  const completeness = useMemo(() => {
    if (!candidate) return 0;
    return profileCompleteness({
      photo: Boolean(candidate.profiles?.avatar_url),
      headline: Boolean(candidate.headline),
      about: Boolean(candidate.about),
      experience: Boolean(candidate.experiences?.length),
      education: Boolean(candidate.education?.length),
      skills: Boolean(candidate.skills?.length),
      resume: Boolean(candidate.resume_url),
      location: Boolean(candidate.city || candidate.country),
    });
  }, [candidate]);

  const [form, setForm] = useState({
    full_name: candidate?.profiles?.full_name || "",
    headline: candidate?.headline || "",
    username: candidate?.username || "",
    about: candidate?.about || "",
    looking_for: candidate?.looking_for || "",
    city: candidate?.city || "",
    country: candidate?.country || "",
    preferred_modality: candidate?.preferred_modality || "remote",
    availability: candidate?.availability || "actively_looking",
    employment_status: candidate?.employment_status || "employed",
    start_availability: candidate?.start_availability || "one_month",
    salary_min: candidate?.salary_min?.toString() || "",
    salary_max: candidate?.salary_max?.toString() || "",
    linkedin_url: candidate?.linkedin_url || "",
    github_url: candidate?.github_url || "",
    portfolio_url: candidate?.portfolio_url || "",
    is_public: candidate?.is_public ?? true,
    is_programbi_alumni: candidate?.is_programbi_alumni ?? false,
  });

  useEffect(() => {
    if (!store.ready || !candidate) return;
    setForm({
      full_name: candidate.profiles?.full_name || "",
      headline: candidate.headline || "",
      username: candidate.username || "",
      about: candidate.about || "",
      looking_for: candidate.looking_for || "",
      city: candidate.city || "",
      country: candidate.country || "",
      preferred_modality: candidate.preferred_modality || "remote",
      availability: candidate.availability || "actively_looking",
      employment_status: candidate.employment_status || "employed",
      start_availability: candidate.start_availability || "one_month",
      salary_min: candidate.salary_min?.toString() || "",
      salary_max: candidate.salary_max?.toString() || "",
      linkedin_url: candidate.linkedin_url || "",
      github_url: candidate.github_url || "",
      portfolio_url: candidate.portfolio_url || "",
      is_public: candidate.is_public,
      is_programbi_alumni: candidate.is_programbi_alumni,
    });
    // only hydrate once when ready
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.ready, candidate?.id]);

  const [expForm, setExpForm] = useState({
    title: "",
    company_name: "",
    location: "",
    description: "",
    is_current: true,
  });
  const [eduForm, setEduForm] = useState({
    institution: "",
    degree: "",
    field: "",
    is_programbi: false,
  });
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState("intermediate");
  const [projForm, setProjForm] = useState({
    name: "",
    description: "",
    tech: "",
  });
  const [langName, setLangName] = useState("");
  const [langLevel, setLangLevel] = useState("professional");

  if (!store.ready || !candidate) {
    return <p className="text-muted-foreground">Cargando perfil…</p>;
  }

  function saveBasics() {
    const res = store.updateCandidateBasics(candidateId, {
      full_name: form.full_name,
      headline: form.headline,
      username: form.username,
      about: form.about,
      looking_for: form.looking_for,
      city: form.city,
      country: form.country,
      preferred_modality: form.preferred_modality,
      availability: form.availability,
      employment_status: form.employment_status,
      start_availability: form.start_availability,
      salary_min: form.salary_min ? Number(form.salary_min) : null,
      salary_max: form.salary_max ? Number(form.salary_max) : null,
      linkedin_url: form.linkedin_url || null,
      github_url: form.github_url || null,
      portfolio_url: form.portfolio_url || null,
      is_public: form.is_public,
      is_programbi_alumni: form.is_programbi_alumni,
    });
    if (!res.ok) toast.error(res.error);
    else toast.success("Perfil guardado");
  }

  const tips: string[] = [];
  if (!candidate.headline) tips.push("Añade un headline profesional");
  if (!candidate.about) tips.push("Escribe un resumen Sobre mí");
  if (!candidate.experiences?.length) tips.push("Añade al menos una experiencia");
  if (!candidate.skills?.length) tips.push("Agrega tus skills técnicas");
  if (!candidate.education?.length) tips.push("Completa tu educación");

  return (
    <div className="space-y-6 pb-24 lg:pb-0">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Mi perfil profesional
          </h2>
          <p className="text-sm text-muted-foreground">
            Completitud {completeness}% · Así te ven las empresas
          </p>
          <div className="mt-2 h-2 max-w-xs overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${completeness}%` }}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/talento/${form.username || candidate.username}`}>
            <Button variant="outline" size="sm">
              Vista pública
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </Link>
          <Button size="sm" onClick={saveBasics}>
            Guardar cambios
          </Button>
        </div>
      </div>

      {tips.length > 0 && (
        <Card className="border-primary/20 bg-primary-soft/30">
          <CardContent className="p-4">
            <p className="text-sm font-semibold text-slate-900">
              Para un perfil de alto impacto
            </p>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              {tips.map((t) => (
                <li key={t}>· {t}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-wrap gap-1 rounded-xl border border-border bg-white p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              tab === t.id
                ? "bg-primary text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "basico" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Información principal</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label>Nombre completo</Label>
              <Input
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Headline</Label>
              <Input
                value={form.headline}
                onChange={(e) => setForm({ ...form, headline: e.target.value })}
                placeholder="Full Stack Developer | React & Node"
              />
            </div>
            <div className="space-y-2">
              <Label>Username público</Label>
              <Input
                value={form.username}
                onChange={(e) =>
                  setForm({
                    ...form,
                    username: e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9-]/g, ""),
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Disponibilidad</Label>
              <Select
                value={form.availability}
                onChange={(e) =>
                  setForm({ ...form, availability: e.target.value })
                }
              >
                {AVAILABILITY.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
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
              <Label>Modalidad preferida</Label>
              <Select
                value={form.preferred_modality}
                onChange={(e) =>
                  setForm({ ...form, preferred_modality: e.target.value })
                }
              >
                {MODALITIES.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Estado laboral</Label>
              <Select
                value={form.employment_status}
                onChange={(e) =>
                  setForm({ ...form, employment_status: e.target.value })
                }
              >
                {EMPLOYMENT_STATUS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Puedo empezar</Label>
              <Select
                value={form.start_availability}
                onChange={(e) =>
                  setForm({ ...form, start_availability: e.target.value })
                }
              >
                {START_AVAILABILITY.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tipo de rol</Label>
              <Select defaultValue="full_time">
                {JOB_TYPES.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Salario mín. USD/mes</Label>
              <Input
                type="number"
                value={form.salary_min}
                onChange={(e) =>
                  setForm({ ...form, salary_min: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Salario máx. USD/mes</Label>
              <Input
                type="number"
                value={form.salary_max}
                onChange={(e) =>
                  setForm({ ...form, salary_max: e.target.value })
                }
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Sobre mí</Label>
              <Textarea
                rows={5}
                value={form.about}
                onChange={(e) => setForm({ ...form, about: e.target.value })}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Qué busco</Label>
              <Textarea
                rows={3}
                value={form.looking_for}
                onChange={(e) =>
                  setForm({ ...form, looking_for: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>LinkedIn</Label>
              <Input
                value={form.linkedin_url}
                onChange={(e) =>
                  setForm({ ...form, linkedin_url: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>GitHub</Label>
              <Input
                value={form.github_url}
                onChange={(e) =>
                  setForm({ ...form, github_url: e.target.value })
                }
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Portfolio</Label>
              <Input
                value={form.portfolio_url}
                onChange={(e) =>
                  setForm({ ...form, portfolio_url: e.target.value })
                }
              />
            </div>
            <label className="flex items-center gap-2 text-sm sm:col-span-2">
              <input
                type="checkbox"
                checked={form.is_programbi_alumni}
                onChange={(e) =>
                  setForm({ ...form, is_programbi_alumni: e.target.checked })
                }
                className="rounded"
              />
              Soy alumno / egresado de ProgramBI
            </label>
            <label className="flex items-center gap-2 text-sm sm:col-span-2">
              <input
                type="checkbox"
                checked={form.is_public}
                onChange={(e) =>
                  setForm({ ...form, is_public: e.target.checked })
                }
                className="rounded"
              />
              Perfil público en directorio de talento
            </label>
            <div className="sm:col-span-2">
              <Button type="button" onClick={saveBasics}>
                Guardar sección básica
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {tab === "experiencia" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Añadir experiencia</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              <Input
                placeholder="Cargo *"
                value={expForm.title}
                onChange={(e) =>
                  setExpForm({ ...expForm, title: e.target.value })
                }
              />
              <Input
                placeholder="Empresa *"
                value={expForm.company_name}
                onChange={(e) =>
                  setExpForm({ ...expForm, company_name: e.target.value })
                }
              />
              <Input
                placeholder="Ubicación"
                value={expForm.location}
                onChange={(e) =>
                  setExpForm({ ...expForm, location: e.target.value })
                }
              />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={expForm.is_current}
                  onChange={(e) =>
                    setExpForm({ ...expForm, is_current: e.target.checked })
                  }
                />
                Trabajo actual
              </label>
              <Textarea
                className="sm:col-span-2"
                placeholder="Logros e impacto..."
                value={expForm.description}
                onChange={(e) =>
                  setExpForm({ ...expForm, description: e.target.value })
                }
              />
              <Button
                type="button"
                onClick={() => {
                  const res = store.addExperience(candidateId, {
                    title: expForm.title,
                    company_name: expForm.company_name,
                    location: expForm.location || null,
                    is_current: expForm.is_current,
                    start_date: null,
                    end_date: null,
                    description: expForm.description || null,
                  });
                  if (!res.ok) toast.error(res.error);
                  else {
                    toast.success("Experiencia añadida");
                    setExpForm({
                      title: "",
                      company_name: "",
                      location: "",
                      description: "",
                      is_current: true,
                    });
                  }
                }}
              >
                <Plus className="h-4 w-4" /> Añadir
              </Button>
            </CardContent>
          </Card>
          {(candidate.experiences || []).map((exp) => (
            <div
              key={exp.id}
              className="flex justify-between gap-3 rounded-2xl border border-border bg-white p-4"
            >
              <div>
                <p className="font-medium">{exp.title}</p>
                <p className="text-sm text-primary">{exp.company_name}</p>
                <p className="mt-1 text-sm text-slate-600">{exp.description}</p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  store.removeExperience(candidateId, exp.id);
                  toast.message("Eliminada");
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {tab === "educacion" && (
        <div className="space-y-4">
          <Card>
            <CardContent className="grid gap-3 p-6 sm:grid-cols-2">
              <Input
                placeholder="Institución *"
                value={eduForm.institution}
                onChange={(e) =>
                  setEduForm({ ...eduForm, institution: e.target.value })
                }
              />
              <Input
                placeholder="Título"
                value={eduForm.degree}
                onChange={(e) =>
                  setEduForm({ ...eduForm, degree: e.target.value })
                }
              />
              <Input
                placeholder="Campo"
                value={eduForm.field}
                onChange={(e) =>
                  setEduForm({ ...eduForm, field: e.target.value })
                }
              />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={eduForm.is_programbi}
                  onChange={(e) =>
                    setEduForm({ ...eduForm, is_programbi: e.target.checked })
                  }
                />
                ProgramBI
              </label>
              <Button
                type="button"
                onClick={() => {
                  const res = store.addEducation(candidateId, {
                    institution: eduForm.institution,
                    degree: eduForm.degree || null,
                    field: eduForm.field || null,
                    start_date: null,
                    end_date: null,
                    is_programbi: eduForm.is_programbi,
                    description: null,
                  });
                  if (!res.ok) toast.error(res.error);
                  else {
                    toast.success("Educación añadida");
                    setEduForm({
                      institution: "",
                      degree: "",
                      field: "",
                      is_programbi: false,
                    });
                  }
                }}
              >
                <Plus className="h-4 w-4" /> Añadir
              </Button>
            </CardContent>
          </Card>
          {(candidate.education || []).map((edu) => (
            <div
              key={edu.id}
              className="flex justify-between rounded-2xl border border-border bg-white p-4"
            >
              <div>
                <p className="font-medium">{edu.institution}</p>
                <p className="text-sm text-muted-foreground">
                  {[edu.degree, edu.field].filter(Boolean).join(" · ")}
                </p>
                {edu.is_programbi && <Badge className="mt-1">ProgramBI</Badge>}
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => store.removeEducation(candidateId, edu.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {tab === "skills" && (
        <Card>
          <CardContent className="space-y-4 p-6">
            <div className="flex flex-wrap gap-2">
              {(candidate.skills || []).map((s) => (
                <Badge key={s.id} variant="secondary" className="gap-1 px-3 py-1.5">
                  {s.skills?.name}
                  <button
                    type="button"
                    className="ml-1 text-muted-foreground hover:text-danger"
                    onClick={() => store.removeSkill(candidateId, s.id)}
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <Input
                placeholder="Skill (ej. React)"
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
              />
              <Select
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value)}
              >
                {SKILL_LEVELS.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </Select>
              <Button
                type="button"
                onClick={() => {
                  const res = store.addSkill(
                    candidateId,
                    skillName,
                    skillLevel
                  );
                  if (!res.ok) toast.error(res.error);
                  else {
                    toast.success("Skill añadida");
                    setSkillName("");
                  }
                }}
              >
                Añadir skill
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {tab === "proyectos" && (
        <div className="space-y-4">
          <Card>
            <CardContent className="grid gap-3 p-6">
              <Input
                placeholder="Nombre del proyecto *"
                value={projForm.name}
                onChange={(e) =>
                  setProjForm({ ...projForm, name: e.target.value })
                }
              />
              <Textarea
                placeholder="Descripción"
                value={projForm.description}
                onChange={(e) =>
                  setProjForm({ ...projForm, description: e.target.value })
                }
              />
              <Input
                placeholder="Tech stack (separado por comas)"
                value={projForm.tech}
                onChange={(e) =>
                  setProjForm({ ...projForm, tech: e.target.value })
                }
              />
              <Button
                type="button"
                onClick={() => {
                  const res = store.addProject(candidateId, {
                    name: projForm.name,
                    description: projForm.description || null,
                    url: null,
                    repo_url: null,
                    tech_stack: projForm.tech
                      ? projForm.tech.split(",").map((t) => t.trim())
                      : [],
                  });
                  if (!res.ok) toast.error(res.error);
                  else {
                    toast.success("Proyecto añadido");
                    setProjForm({ name: "", description: "", tech: "" });
                  }
                }}
              >
                <Plus className="h-4 w-4" /> Añadir proyecto
              </Button>
            </CardContent>
          </Card>
          {(candidate.projects || []).map((p) => (
            <div
              key={p.id}
              className="flex justify-between rounded-2xl border border-border bg-white p-4"
            >
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-slate-600">{p.description}</p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => store.removeProject(candidateId, p.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {tab === "extras" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Idiomas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(candidate.languages || []).map((l) => (
              <div
                key={l.id}
                className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm"
              >
                <span>
                  {l.language} · {l.level}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => store.removeLanguage(candidateId, l.id)}
                >
                  Quitar
                </Button>
              </div>
            ))}
            <div className="grid gap-2 sm:grid-cols-3">
              <Input
                placeholder="Idioma"
                value={langName}
                onChange={(e) => setLangName(e.target.value)}
              />
              <Select
                value={langLevel}
                onChange={(e) => setLangLevel(e.target.value)}
              >
                {LANGUAGE_LEVELS.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </Select>
              <Button
                type="button"
                onClick={() => {
                  if (!langName.trim()) return;
                  store.addLanguage(candidateId, langName, langLevel);
                  setLangName("");
                  toast.success("Idioma añadido");
                }}
              >
                Añadir
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
