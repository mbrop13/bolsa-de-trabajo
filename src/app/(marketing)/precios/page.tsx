import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AuthButton } from "@/components/auth/auth-button";
import { PageHero } from "@/components/marketing/page-hero";
import { MarketingCta } from "@/components/marketing/marketing-cta";
import { CheckCircle2, Sparkles, Building2, UserRound } from "lucide-react";

export const metadata = {
  title: "Precios",
  description:
    "Reclu es gratis en el lanzamiento para candidatos y empresas. Planes claros, sin sorpresas.",
};

export default function PreciosPage() {
  return (
    <>
      <PageHero
        eyebrow="Precios transparentes"
        title="Gratis en el lanzamiento. Valor desde el día uno."
        description="Publicar vacantes, postular y chatear no tiene costo mientras abrimos la red de ProgramBI."
      />

      <section className="container-page py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          {/* Candidatos */}
          <div className="relative overflow-hidden rounded-3xl border border-border bg-white p-8 shadow-sm sm:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <UserRound className="h-6 w-6" />
            </div>
            <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-primary">
              Candidatos
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-5xl font-bold tracking-tight text-slate-900">
                $0
              </span>
              <span className="text-muted-foreground">/ siempre</span>
            </div>
            <p className="mt-3 text-slate-600">
              Para quien busca empleo: perfil, postulaciones y chat sin pagar.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Perfil profesional completo",
                "Postulaciones ilimitadas",
                "Guardar vacantes",
                "Chat con empresas verificadas",
                "Badge ProgramBI alumni",
                "Control de privacidad del perfil",
              ].map((f) => (
                <li key={f} className="flex gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
            <AuthButton
              mode="register"
              role="candidate"
              size="lg"
              className="mt-10 w-full"
            >
              Crear perfil gratis
            </AuthButton>
          </div>

          {/* Empresas */}
          <div className="relative overflow-hidden rounded-3xl border-2 border-primary bg-white p-8 shadow-lg shadow-primary/10 sm:p-10">
            <Badge className="absolute right-6 top-6">
              <Sparkles className="mr-1 h-3 w-3" />
              Lanzamiento
            </Badge>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-md shadow-primary/30">
              <Building2 className="h-6 w-6" />
            </div>
            <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-primary">
              Empresas
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-5xl font-bold tracking-tight text-slate-900">
                $0
              </span>
              <span className="text-muted-foreground">/ lanzamiento</span>
            </div>
            <p className="mt-3 text-slate-600">
              Publica vacantes y gestiona talento. La verificación protege la
              calidad de la red.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Perfil de marca empleadora",
                "Vacantes ilimitadas (lanzamiento)",
                "Inbox y pipeline de postulaciones",
                "Chat con candidatos",
                "Aprobación humana de la cuenta",
                "Visibilidad en directorio Reclu",
              ].map((f) => (
                <li key={f} className="flex gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
            <AuthButton
              mode="register"
              role="company"
              size="lg"
              className="mt-10 w-full"
            >
              Registrar empresa
            </AuthButton>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-3xl border border-border bg-slate-50 p-8 text-center">
          <h2 className="text-xl font-bold text-slate-900">
            ¿Habrá planes de pago?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Más adelante podremos ofrecer destacados de vacantes o herramientas
            premium para empresas. El acceso básico a postular y construir tu
            perfil de candidato seguirá siendo accesible. Avisaremos con
            antelación en la plataforma.
          </p>
        </div>
      </section>

      <MarketingCta
        title="Empieza sin costo hoy"
        description="Únete como candidato o registra tu empresa en minutos."
      />
    </>
  );
}
