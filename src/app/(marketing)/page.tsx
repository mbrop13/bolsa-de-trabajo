import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FeaturedJobs } from "@/components/jobs/featured-jobs";
import { demoCompanies } from "@/lib/demo-data";
import { CATEGORIES } from "@/lib/constants";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Users,
  GraduationCap,
} from "lucide-react";

export default function HomePage() {
  const companies = demoCompanies.filter((c) => c.status === "approved").slice(0, 5);

  return (
    <>
      {/* Hero */}
      <section className="bg-hero border-b border-border">
        <div className="container-page py-16 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-5 px-3 py-1">
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              by ProgramBI · Gratis en el lanzamiento
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              Tu próxima oportunidad tech{" "}
              <span className="text-primary">empieza en Reclu</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Bolsa de trabajo profesional para desarrolladores, analistas y
              talento digital en Latinoamérica. Perfiles detallados, empresas
              verificadas y vacantes con salario transparente.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/auth/registro/candidato">
                <Button size="lg" className="w-full sm:w-auto">
                  Crear perfil profesional
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/empleos">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Ver empleos abiertos
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Empresas aprobadas
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Perfiles tipo LinkedIn
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                100% gratis al lanzar
              </span>
            </div>
          </div>

          {/* Trust bar */}
          <div className="mx-auto mt-14 max-w-4xl rounded-2xl border border-border/80 bg-white/70 px-6 py-4 text-center shadow-sm backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Pensado como producto de clase mundial
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Postulaciones · Pipeline reclutador · Contacto verificado · Perfiles
              detallados · Moderación admin
            </p>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { icon: Briefcase, label: "Vacantes activas", value: "10+" },
              { icon: Building2, label: "Empresas", value: "5+" },
              { icon: Users, label: "Talento tech", value: "Creciendo" },
              { icon: GraduationCap, label: "ProgramBI alumni", value: "Prioridad" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-white/80 p-4 text-center shadow-sm backdrop-blur"
              >
                <stat.icon className="mx-auto h-5 w-5 text-primary" />
                <p className="mt-2 text-xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-page py-16">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-slate-900">Cómo funciona</h2>
          <p className="mt-1 text-muted-foreground">
            Tres pasos. Experiencia de producto premium.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Crea tu perfil",
              d: "Headline, experiencia, skills y badge ProgramBI. Como LinkedIn, enfocado en tech.",
            },
            {
              n: "02",
              t: "Postula o publica",
              d: "Candidatos aplican en un clic. Empresas publican vacantes tras aprobación de Reclu.",
            },
            {
              n: "03",
              t: "Conecta con calidad",
              d: "Pipeline de reclutamiento, mensajes y perfiles verificados. Sin ruido.",
            },
          ].map((step) => (
            <div
              key={step.n}
              className="rounded-3xl border border-border bg-white p-6 shadow-sm"
            >
              <span className="text-sm font-bold text-primary">{step.n}</span>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">
                {step.t}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {step.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container-page pb-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Explora por área</h2>
            <p className="mt-1 text-muted-foreground">
              Roles tech curados para el mercado LATAM
            </p>
          </div>
          <Link
            href="/empleos"
            className="hidden text-sm font-medium text-primary hover:underline sm:block"
          >
            Ver todos →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/empleos?categoria=${cat.slug}`}
              className="rounded-2xl border border-border bg-white p-4 text-center text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-primary/40 hover:text-primary hover:shadow-md"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured jobs */}
      <section className="bg-surface border-y border-border py-16">
        <div className="container-page">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Empleos destacados
              </h2>
              <p className="mt-1 text-muted-foreground">
                Oportunidades seleccionadas con salario y modalidad claros
              </p>
            </div>
            <Link href="/empleos">
              <Button variant="secondary" size="sm">
                Ver todos
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <FeaturedJobs limit={4} />
        </div>
      </section>

      {/* Companies */}
      <section className="container-page py-16">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Empresas que confían en Reclu
          </h2>
          <p className="mt-1 text-muted-foreground">
            Cada empresa pasa por aprobación manual del equipo ProgramBI
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {companies.map((c) => (
            <Link
              key={c.id}
              href={`/empresas/${c.slug}`}
              className="rounded-full border border-border bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-primary/40 hover:text-primary"
            >
              {c.name}
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/empresas">
            <Button variant="outline">Directorio de empresas</Button>
          </Link>
        </div>
      </section>

      {/* Dual CTA */}
      <section className="container-page pb-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-white p-8 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-bold text-slate-900">
              Para candidatos
            </h3>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              Crea un perfil profesional completo: experiencia, skills,
              proyectos, CV y disponibilidad. Destaca si eres alumno de
              ProgramBI.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                Perfil tipo LinkedIn, pensado para reclutadores tech
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                Postula en un clic y sigue el estado
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                Guarda vacantes y controla tu privacidad
              </li>
            </ul>
            <Link href="/auth/registro/candidato" className="mt-6 inline-block">
              <Button>Empezar como candidato</Button>
            </Link>
          </div>

          <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary-soft to-white p-8 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
              <Building2 className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-bold text-slate-900">
              Para empresas
            </h3>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              Publica vacantes, recibe postulaciones y gestiona tu pipeline.
              Tu empresa es revisada por nuestro equipo antes de activarse.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li className="flex gap-2">
                <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
                Verificación manual = confianza y calidad
              </li>
              <li className="flex gap-2">
                <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
                Inbox de candidatos con estados
              </li>
              <li className="flex gap-2">
                <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
                Perfil de marca empleadora profesional
              </li>
            </ul>
            <Link href="/auth/registro/empresa" className="mt-6 inline-block">
              <Button>Registrar mi empresa</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
