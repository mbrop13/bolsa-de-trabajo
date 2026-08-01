import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function MarketingCta({
  title = "Empieza hoy en la red tech de ProgramBI",
  description = "Crea tu perfil o registra tu empresa. Publicar y postular es gratis en el lanzamiento.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(24,144,255,0.25),_transparent_55%)]" />
      <div className="container-page relative text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-slate-300 sm:text-lg">
          {description}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/auth/registro/candidato">
            <Button
              size="lg"
              className="h-12 bg-white px-8 text-slate-900 hover:bg-slate-100"
            >
              Soy candidato
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/auth/registro/empresa">
            <Button
              size="lg"
              variant="outline"
              className="h-12 border-slate-600 bg-transparent px-8 text-white hover:bg-slate-800 hover:text-white"
            >
              Soy empresa
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
