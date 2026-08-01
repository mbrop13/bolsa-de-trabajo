import { SectionHeading } from "./section-heading";

const items = [
  {
    quote:
      "En una semana armé mi perfil, postule a tres roles y tuve chat con dos empresas. Se siente profesional, no como un portal genérico.",
    name: "Laura G.",
    role: "Frontend Developer · Alumni ProgramBI",
  },
  {
    quote:
      "La verificación de empresas y el pipeline de postulaciones nos ahorró ruido. Llegamos a candidatos con contexto real de su experiencia.",
    name: "Diego R.",
    role: "Head of Talent · Nubix Labs",
  },
  {
    quote:
      "Buscaba mi primer rol en data. El badge ProgramBI y el perfil detallado me ayudaron a destacar frente a reclutadores.",
    name: "Carlos R.",
    role: "Data Analyst junior",
  },
];

export function Testimonials() {
  return (
    <section className="border-y border-border bg-slate-50/80 py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Historias reales del ecosistema"
          title="Lo que buscan candidatos y empresas"
          description="Claridad, confianza y un proceso de contratación más humano."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-3xl border border-border bg-white p-7 shadow-sm"
            >
              <blockquote className="flex-1 text-sm leading-relaxed text-slate-600">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
