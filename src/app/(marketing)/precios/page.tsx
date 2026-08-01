import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

export const metadata = { title: "Precios" };

export default function PreciosPage() {
  return (
    <div className="bg-hero min-h-[70vh]">
      <div className="container-page py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="mb-4">Lanzamiento</Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Gratis para candidatos y empresas
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Durante el lanzamiento de Reclu, publicar vacantes y postular es
            100% gratuito. Planes premium llegarán más adelante.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Candidatos
            </p>
            <p className="mt-2 text-4xl font-bold">$0</p>
            <p className="text-muted-foreground">Siempre gratis</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              {[
                "Perfil profesional completo",
                "Postulaciones ilimitadas",
                "Guardar vacantes",
                "Badge ProgramBI alumni",
              ].map((f) => (
                <li key={f} className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/auth/registro/candidato" className="mt-8 block">
              <Button className="w-full">Crear perfil</Button>
            </Link>
          </div>

          <div className="rounded-3xl border-2 border-primary bg-white p-8 shadow-md shadow-primary/10">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Empresas
            </p>
            <p className="mt-2 text-4xl font-bold">$0</p>
            <p className="text-muted-foreground">Gratis en el lanzamiento</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              {[
                "Perfil de marca empleadora",
                "Publicar vacantes ilimitadas",
                "Inbox y pipeline de candidatos",
                "Verificación por el equipo Reclu",
              ].map((f) => (
                <li key={f} className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/auth/registro/empresa" className="mt-8 block">
              <Button className="w-full">Registrar empresa</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
