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
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
  GraduationCap,
  Search,
} from "lucide-react";

export default function HomePage() {
  const companies = demoCompanies
    .filter((c) => c.status === "approved")
    .slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-hero">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="container-page relative py-20 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6 px-3.5 py-1.5 text-xs font-medium">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Bolsa de trabajo tech · by ProgramBI
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
              Encuentra trabajo tech
              <br />
              <span className="bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent">
                con empresas de verdad
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 leading-relaxed sm:text-xl">
              Reclu conecta talento de programación y datos con empresas
              verificadas en Latinoamérica. Perfiles profesionales, vacantes
              claras y chat directo con reclutadores.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/auth/registro/candidato">
                <Button size="lg" className="h-12 w-full px-8 text-base sm:w-auto">
                  Crear mi perfil
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/empleos">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 w-full px-8 text-base sm:w-auto"
                >
                  <Search className="h-4 w-4" />
                  Explorar empleos
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Empresas verificadas
              </span>
              <span className="inline-flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-primary" />
                Chat con reclutadores
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Gratis para candidatos
              </span>
            </div>
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {[
              { icon: Briefcase, label: "Vacantes tech", value: "Activas" },
              { icon: Building2, label: "Empresas", value: "Verificadas" },
              { icon: Users, label: "Talento LATAM", value: "Especializado" },
              {
                icon: GraduationCap,
                label: "ProgramBI",
                value: "Alumni prioritario",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/60 bg-white/90 p-5 text-center shadow-sm backdrop-blur"
              >
                <stat.icon className="mx-auto h-5 w-5 text-primary" />
                <p className="mt-2.5 text-sm font-bold text-slate-900 sm:text-base">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-page py-20">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Simple y profesional
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Cómo funciona Reclu
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Diseñado para que postules o contrates sin fricción.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              n: "1",
              t: "Crea tu perfil",
              d: "Experiencia, skills, proyectos y disponibilidad. Un perfil pensado para reclutadores tech.",
            },
            {
              n: "2",
              t: "Postula o publica",
              d: "Los candidatos aplican en segundos. Las empresas publican vacantes tras verificación.",
            },
            {
              n: "3",
              t: "Conversa y avanza",
              d: "Pipeline de postulaciones y chat seguro entre empresas aprobadas y talento.",
            },
          ].map((step) => (
            <div
              key={step.n}
              className="relative rounded-3xl border border-border bg-white p-8 shadow-sm transition hover:border-primary/25 hover:shadow-md"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white shadow-sm shadow-primary/30">
                {step.n}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                {step.t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="border-y border-border bg-slate-50/80 py-16">
        <div className="container-page">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Explora por área
              </h2>
              <p className="mt-1 text-muted-foreground">
                Roles tech para el mercado LATAM
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
                className="rounded-2xl border border-border bg-white px-4 py-4 text-center text-sm font-medium text-slate-700 shadow-sm transition hover:border-primary/40 hover:text-primary hover:shadow-md"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured jobs */}
      <section className="py-20">
        <div className="container-page">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Empleos abiertos
              </h2>
              <p className="mt-2 text-muted-foreground">
                Salario, modalidad y seniority visibles desde el listado
              </p>
            </div>
            <Link href="/empleos">
              <Button variant="secondary">
                Ver todos los empleos
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <FeaturedJobs limit={4} />
        </div>
      </section>

      {/* Companies */}
      <section className="border-t border-border bg-slate-50/60 py-16">
        <div className="container-page text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Empresas en Reclu
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
            Cada organización es revisada por el equipo de ProgramBI antes de
            publicar y contactar talento.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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
          <div className="mt-8">
            <Link href="/empresas">
              <Button variant="outline">Ver directorio de empresas</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Dual CTA */}
      <section className="container-page py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-white p-8 shadow-sm sm:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-slate-900">
              Para candidatos
            </h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Construye un perfil profesional, postula a vacantes y chatea con
              empresas verificadas. Si eres de ProgramBI, destácate.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              {[
                "Perfil detallado: experiencia, skills y proyectos",
                "Postulaciones con seguimiento de estado",
                "Chat seguro con reclutadores",
              ].map((t) => (
                <li key={t} className="flex gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/auth/registro/candidato" className="mt-8 inline-block">
              <Button size="lg">Empezar como candidato</Button>
            </Link>
          </div>

          <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary-soft via-white to-sky-50 p-8 shadow-sm sm:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-md shadow-primary/25">
              <Building2 className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-slate-900">
              Para empresas
            </h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Publica vacantes, gestiona postulaciones con pipeline y contacta
              talento calificado. Verificación humana incluida.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              {[
                "Marca empleadora profesional",
                "Inbox y pipeline de candidatos",
                "Chat y contacto solo tras aprobación",
              ].map((t) => (
                <li key={t} className="flex gap-2.5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/auth/registro/empresa" className="mt-8 inline-block">
              <Button size="lg">Registrar mi empresa</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom strip */}
      <section className="border-t border-border bg-slate-900 py-14 text-center text-white">
        <div className="container-page">
          <h2 className="text-2xl font-bold sm:text-3xl">
            ¿Listo para tu próximo paso profesional?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-slate-300">
            Únete a Reclu y conecta con oportunidades tech en Latinoamérica.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/auth/registro/candidato">
              <Button
                size="lg"
                className="bg-white text-slate-900 hover:bg-slate-100"
              >
                Crear perfil gratis
              </Button>
            </Link>
            <Link href="/empleos">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 bg-transparent text-white hover:bg-slate-800 hover:text-white"
              >
                Ver empleos
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
