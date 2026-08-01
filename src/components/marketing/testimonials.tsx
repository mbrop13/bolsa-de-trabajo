import { SectionHeading } from "./section-heading";
import { Quote } from "lucide-react";

const items = [
  {
    quote:
      "En una semana armé mi perfil, postule a tres roles y tuve chat con dos empresas. Se siente profesional, no como un portal genérico.",
    name: "Laura G.",
    role: "Frontend Developer · Alumni ProgramBI",
    initials: "LG",
    tone: "from-sky-500 to-primary",
  },
  {
    quote:
      "El pipeline de postulaciones y los perfiles con contexto real nos facilitaron filtrar y conversar con mejores candidatos.",
    name: "Diego R.",
    role: "Head of Talent · Nubix Labs",
    initials: "DR",
    tone: "from-violet-500 to-indigo-500",
  },
  {
    quote:
      "Buscaba mi primer rol en data. El badge ProgramBI y el perfil detallado me ayudaron a destacar frente a reclutadores.",
    name: "Carlos R.",
    role: "Data Analyst junior",
    initials: "CR",
    tone: "from-emerald-500 to-teal-500",
  },
];

export function Testimonials() {
  return (
    <section className="section-y bg-white">
      <div className="container-page">
        <SectionHeading
          eyebrow="Historias del ecosistema"
          title="Lo que buscan candidatos y empresas"
          description="Claridad, confianza y un proceso de contratación más humano."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <figure
              key={t.name}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/80 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-5 flex items-center justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br text-sm font-bold text-white shadow-md ${t.tone}`}
                >
                  {t.initials}
                </div>
                <Quote className="h-8 w-8 text-primary/15 transition group-hover:text-primary/25" />
              </div>
              <blockquote className="flex-1 text-[15px] leading-relaxed text-slate-600">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-border/80 pt-4">
                <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
