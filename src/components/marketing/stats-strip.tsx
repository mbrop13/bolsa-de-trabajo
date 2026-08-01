import { Globe2, Gift, Briefcase, UserRound } from "lucide-react";

const stats = [
  {
    icon: Briefcase,
    value: "Empleos",
    label: "Vacantes con información clara",
    detail: "Seniority, modalidad y salario",
  },
  {
    icon: UserRound,
    value: "Perfiles",
    label: "Profesionales y completos",
    detail: "Skills, experiencia y proyectos",
  },
  {
    icon: Globe2,
    value: "Flexible",
    label: "Remoto, híbrido o presencial",
    detail: "Según cada vacante",
  },
  {
    icon: Gift,
    value: "Gratis",
    label: "En el lanzamiento",
    detail: "Para candidatos y empresas",
  },
];

export function StatsStrip() {
  return (
    <section className="bg-white">
      <div className="container-page py-10 sm:py-12">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-6">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <s.icon className="h-4 w-4" />
              </div>
              <p className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                {s.value}
              </p>
              <p className="text-sm font-semibold text-slate-700">{s.label}</p>
              <p className="text-xs text-muted-foreground">{s.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
