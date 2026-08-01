import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, UserRound } from "lucide-react";

export function MarketingCta({
  title = "Tu próximo paso en tech empieza aquí",
  description = "Crea tu perfil o registra tu empresa. Publicar y postular es gratis en el lanzamiento.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 sm:py-24">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(24,144,255,0.28),_transparent_55%)]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-1/3 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
        }}
      />

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-200">
            ProgramBI × Reclu
          </p>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-300 sm:text-lg">
            {description}
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-2">
          <Link
            href="/auth/registro/candidato"
            className="group rounded-2xl border border-white/10 bg-white/[0.06] p-6 text-left backdrop-blur transition hover:border-primary/40 hover:bg-white/[0.1]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-900 shadow-lg">
              <UserRound className="h-5 w-5" />
            </div>
            <p className="mt-4 text-lg font-semibold text-white">Soy candidato</p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
              Crea tu perfil profesional y postula a vacantes tech verificadas.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 transition group-hover:gap-2.5">
              Empezar gratis
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>

          <Link
            href="/auth/registro/empresa"
            className="group rounded-2xl border border-white/10 bg-white/[0.06] p-6 text-left backdrop-blur transition hover:border-primary/40 hover:bg-white/[0.1]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/30">
              <Building2 className="h-5 w-5" />
            </div>
            <p className="mt-4 text-lg font-semibold text-white">Soy empresa</p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
              Publica vacantes claras y conecta con talento de programación y datos.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 transition group-hover:gap-2.5">
              Registrar empresa
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/empleos">
            <Button
              size="lg"
              variant="outline"
              className="h-11 border-slate-600 bg-transparent px-6 text-white hover:bg-slate-800 hover:text-white"
            >
              Explorar empleos sin cuenta
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
