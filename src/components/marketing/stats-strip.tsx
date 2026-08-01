import { ShieldCheck, Globe2, Gift, Briefcase } from "lucide-react";

const stats = [
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Empresas verificadas",
    detail: "Antes de publicar y contactar",
  },
  {
    icon: Briefcase,
    value: "Tech first",
    label: "Roles de programación y datos",
    detail: "Sin ruido de portales genéricos",
  },
  {
    icon: Globe2,
    value: "LATAM",
    label: "Hecho para la región",
    detail: "Remoto, híbrido y presencial",
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
    <section className="relative border-y border-border/80 bg-white">
      <div className="container-page py-8 sm:py-10">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-0">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col gap-1 sm:px-4 lg:px-6 ${
                i > 0 ? "lg:border-l lg:border-border/80" : ""
              }`}
            >
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
