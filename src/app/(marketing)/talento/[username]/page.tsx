import { notFound } from "next/navigation";
import { demoCandidates } from "@/lib/demo-data";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  labelOf,
  AVAILABILITY,
  MODALITIES,
  EMPLOYMENT_STATUS,
  SKILL_LEVELS,
  LANGUAGE_LEVELS,
} from "@/lib/constants";
import {
  Code2,
  GraduationCap,
  Link2,
  MapPin,
  Globe,
} from "lucide-react";
import { TalentContactBar } from "@/components/talent/talent-contact-bar";

type Params = Promise<{ username: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { username } = await params;
  const c = demoCandidates.find((x) => x.username === username);
  if (!c) return { title: "Perfil" };
  return {
    title: c.profiles?.full_name || c.username || "Talento",
    description: c.headline || undefined,
  };
}

export default async function TalentPublicPage({
  params,
}: {
  params: Params;
}) {
  const { username } = await params;
  const candidate = demoCandidates.find(
    (c) => c.username === username && c.is_public
  );
  if (!candidate) notFound();

  const name = candidate.profiles?.full_name || candidate.username || "Talento";

  return (
    <div className="bg-surface min-h-[70vh]">
      <div className="h-32 bg-gradient-to-r from-primary-soft via-primary-soft-2 to-sky-100 sm:h-40" />
      <div className="container-page -mt-12 pb-16">
        <div className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <Avatar
              name={name}
              src={candidate.profiles?.avatar_url}
              size="xl"
              className="ring-4 ring-white"
            />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900">{name}</h1>
                {candidate.is_programbi_alumni && (
                  <Badge>
                    <GraduationCap className="mr-1 h-3 w-3" />
                    ProgramBI
                  </Badge>
                )}
              </div>
              <p className="mt-1 text-muted-foreground">{candidate.headline}</p>
              <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                {(candidate.city || candidate.country) && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {[candidate.city, candidate.country]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                )}
                {candidate.availability && (
                  <Badge variant="success">
                    {labelOf(AVAILABILITY, candidate.availability)}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              {candidate.linkedin_url && (
                <a
                  href={candidate.linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-border p-2 text-slate-600 hover:text-primary"
                >
                  <Link2 className="h-5 w-5" />
                </a>
              )}
              {candidate.github_url && (
                <a
                  href={candidate.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-border p-2 text-slate-600 hover:text-primary"
                >
                  <Code2 className="h-5 w-5" />
                </a>
              )}
              {candidate.portfolio_url && (
                <a
                  href={candidate.portfolio_url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-border p-2 text-slate-600 hover:text-primary"
                >
                  <Globe className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {candidate.preferred_modality && (
              <Badge variant="outline">
                {labelOf(MODALITIES, candidate.preferred_modality)}
              </Badge>
            )}
            {candidate.employment_status && (
              <Badge variant="outline">
                {labelOf(EMPLOYMENT_STATUS, candidate.employment_status)}
              </Badge>
            )}
          </div>
          <TalentContactBar candidate={candidate} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {candidate.about && (
              <section className="rounded-2xl border border-border bg-white p-6">
                <h2 className="font-semibold">Acerca de</h2>
                <p className="mt-3 whitespace-pre-line text-slate-600 leading-relaxed">
                  {candidate.about}
                </p>
              </section>
            )}
            {candidate.looking_for && (
              <section className="rounded-2xl border border-border bg-white p-6">
                <h2 className="font-semibold">Qué busco</h2>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  {candidate.looking_for}
                </p>
              </section>
            )}
            {candidate.experiences && candidate.experiences.length > 0 && (
              <section className="rounded-2xl border border-border bg-white p-6">
                <h2 className="font-semibold">Experiencia</h2>
                <ul className="mt-4 space-y-5">
                  {candidate.experiences.map((exp) => (
                    <li key={exp.id} className="border-l-2 border-primary/30 pl-4">
                      <p className="font-medium text-slate-900">{exp.title}</p>
                      <p className="text-sm text-primary">{exp.company_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {exp.start_date}
                        {exp.is_current
                          ? " — Actualidad"
                          : exp.end_date
                            ? ` — ${exp.end_date}`
                            : ""}
                        {exp.location ? ` · ${exp.location}` : ""}
                      </p>
                      {exp.description && (
                        <p className="mt-2 text-sm text-slate-600 whitespace-pre-line">
                          {exp.description}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {candidate.projects && candidate.projects.length > 0 && (
              <section className="rounded-2xl border border-border bg-white p-6">
                <h2 className="font-semibold">Proyectos</h2>
                <ul className="mt-4 space-y-4">
                  {candidate.projects.map((p) => (
                    <li key={p.id}>
                      <p className="font-medium">{p.name}</p>
                      {p.description && (
                        <p className="mt-1 text-sm text-slate-600">
                          {p.description}
                        </p>
                      )}
                      {p.tech_stack && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {p.tech_stack.map((t) => (
                            <Badge key={t} variant="secondary">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <div className="space-y-6">
            {candidate.skills && candidate.skills.length > 0 && (
              <section className="rounded-2xl border border-border bg-white p-6">
                <h2 className="font-semibold">Skills</h2>
                <ul className="mt-3 space-y-2">
                  {candidate.skills.map((s) => (
                    <li
                      key={s.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span>{s.skills?.name}</span>
                      <Badge variant="outline">
                        {labelOf(SKILL_LEVELS, s.level)}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {candidate.education && candidate.education.length > 0 && (
              <section className="rounded-2xl border border-border bg-white p-6">
                <h2 className="font-semibold">Educación</h2>
                <ul className="mt-3 space-y-3">
                  {candidate.education.map((e) => (
                    <li key={e.id}>
                      <p className="font-medium text-sm">{e.institution}</p>
                      <p className="text-sm text-muted-foreground">
                        {[e.degree, e.field].filter(Boolean).join(" · ")}
                      </p>
                      {e.is_programbi && (
                        <Badge className="mt-1" variant="default">
                          ProgramBI
                        </Badge>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {candidate.languages && candidate.languages.length > 0 && (
              <section className="rounded-2xl border border-border bg-white p-6">
                <h2 className="font-semibold">Idiomas</h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {candidate.languages.map((l) => (
                    <li key={l.id} className="flex justify-between">
                      <span>{l.language}</span>
                      <span className="text-muted-foreground">
                        {labelOf(LANGUAGE_LEVELS, l.level)}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {candidate.certifications &&
              candidate.certifications.length > 0 && (
                <section className="rounded-2xl border border-border bg-white p-6">
                  <h2 className="font-semibold">Certificaciones</h2>
                  <ul className="mt-3 space-y-2 text-sm">
                    {candidate.certifications.map((c) => (
                      <li key={c.id}>
                        <p className="font-medium">{c.name}</p>
                        <p className="text-muted-foreground">{c.issuer}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
