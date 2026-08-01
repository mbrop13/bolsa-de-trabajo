import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AuthButton } from "@/components/auth/auth-button";
import { FeaturedJobs } from "@/components/jobs/featured-jobs";
import { HeroShowcase } from "@/components/marketing/hero-showcase";
import { HeroSearch } from "@/components/marketing/hero-search";
import { SectionHeading } from "@/components/marketing/section-heading";
import { StatsStrip } from "@/components/marketing/stats-strip";
import { Testimonials } from "@/components/marketing/testimonials";
import { MarketingCta } from "@/components/marketing/marketing-cta";
import { HomeCategories } from "@/components/marketing/home-categories";
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  LayoutGrid,
  MessageCircle,
  Sparkles,
  UserPlus,
  UserRound,
  Users,
  Building2,
  FileText,
  MessagesSquare,
  Target,
} from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* ——— HERO ——— */}
      <section className="relative overflow-hidden">
        <div className="bg-hero absolute inset-0" />
        <div className="bg-hero-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />

        <div className="container-page relative grid items-center gap-12 py-14 lg:grid-cols-2 lg:gap-14 lg:py-20 xl:gap-16">
          <div className="animate-fade-up">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-primary shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Bolsa de trabajo · by ProgramBI
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]">
              Encuentra mejores{" "}
              <span className="text-gradient">oportunidades de empleo</span>
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              <strong className="font-semibold text-slate-800">Reclu</strong>{" "}
              conecta talento con empresas. Perfil profesional, vacantes claras
              y chat real en un solo lugar.
            </p>

            <div className="mt-8">
              <HeroSearch />
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <AuthButton
                mode="register"
                role="candidate"
                size="lg"
                className="h-11 w-full px-6 shadow-md shadow-primary/20 sm:w-auto"
              >
                Crear perfil gratis
                <ArrowRight className="h-4 w-4" />
              </AuthButton>
              <AuthButton
                mode="register"
                role="company"
                size="lg"
                variant="outline"
                className="h-11 w-full border-slate-200 bg-white/80 px-6 sm:w-auto"
              >
                <Building2 className="h-4 w-4" />
                Soy empresa
              </AuthButton>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2.5 text-sm text-slate-600">
              {[
                "Perfiles profesionales",
                "Gratis en el lanzamiento",
                "Postulaciones + chat",
              ].map((item) => (
                <li key={item} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-up animation-delay-200">
            <HeroShowcase />
          </div>
        </div>
      </section>

      {/* ——— Contenido unificado (mismo fondo, sin separadores) ——— */}
      <div className="bg-white">
        <StatsStrip />

        {/* EMPLEOS DESTACADOS */}
        <section className="section-y">
          <div className="container-page">
            <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                align="left"
                eyebrow="Oportunidades abiertas"
                title="Empleos con información clara"
                description="Seniority, modalidad y rangos salariales visibles. Menos sorpresas, mejores postulaciones."
                className="max-w-xl"
              />
              <Link href="/empleos" className="shrink-0">
                <Button variant="secondary" size="lg" className="shadow-sm">
                  Ver todos los empleos
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <FeaturedJobs limit={4} />
          </div>
        </section>

        {/* CÓMO FUNCIONA */}
        <section className="section-y">
          <div className="container-page">
            <SectionHeading
              eyebrow="Proceso"
              title="Cómo funciona, en cuatro pasos"
              description="Simple para candidatos. Claro para empresas."
            />
            <div className="relative mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="pointer-events-none absolute left-[12%] right-[12%] top-10 hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent lg:block" />
              {[
                {
                  n: "01",
                  icon: UserPlus,
                  t: "Crea tu cuenta",
                  d: "Elige candidato o empresa y completa lo esencial en minutos.",
                },
                {
                  n: "02",
                  icon: FileText,
                  t: "Construye presencia",
                  d: "Perfil profesional o ficha de empresa lista para reclutar.",
                },
                {
                  n: "03",
                  icon: LayoutGrid,
                  t: "Publica o postula",
                  d: "Vacantes con datos claros. Aplicaciones con mensaje y contexto.",
                },
                {
                  n: "04",
                  icon: MessagesSquare,
                  t: "Conversa y avanza",
                  d: "Pipeline de estados y chat cuando hay interés real.",
                },
              ].map((s) => (
                <div
                  key={s.n}
                  className="relative rounded-3xl border border-border/80 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex items-center justify-between">
                    <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-sm font-bold text-white shadow-md shadow-primary/30">
                      {s.n}
                    </span>
                    <s.icon className="h-5 w-5 text-primary/40" />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-slate-900">
                    {s.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CANDIDATOS */}
        <section className="section-y">
          <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Badge variant="secondary" className="mb-4 px-3 py-1">
                Para candidatos
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Tu carrera, con un perfil que se entiende
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                Si buscas tu primer empleo, un salto de seniority o un rol
                remoto, Reclu te da un espacio profesional para mostrarte y
                postular con claridad.
              </p>
              <ul className="mt-8 space-y-3.5">
                {[
                  "Perfil completo: headline, experiencia, skills, proyectos",
                  "Filtros de empleos por modalidad, seniority y categoría",
                  "Seguimiento de postulaciones y chat con empresas",
                  "Destaca si eres alumno o egresado de ProgramBI",
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-sm text-slate-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm shadow-primary/30">
                      ✓
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-3">
                <AuthButton
                  mode="register"
                  role="candidate"
                  size="lg"
                  className="shadow-md shadow-primary/20"
                >
                  Crear mi perfil gratis
                </AuthButton>
                <Link href="/empleos">
                  <Button size="lg" variant="outline">
                    Explorar vacantes
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/10 via-sky-100/40 to-transparent blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-white shadow-2xl shadow-slate-200/70 ring-1 ring-slate-900/[0.03]">
                <div className="h-20 bg-gradient-to-r from-primary via-sky-500 to-cyan-400" />
                <div className="relative px-6 pb-6 pt-0">
                  <div className="-mt-10 flex items-end justify-between gap-3">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-violet-500 to-primary text-xl font-bold text-white shadow-lg">
                      AM
                    </div>
                    <Badge className="mb-1">ProgramBI</Badge>
                  </div>
                  <div className="mt-4">
                    <p className="text-xl font-bold text-slate-900">
                      Ana Martínez
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      Full Stack Developer · React & Node
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <Badge variant="outline">Buscando activamente</Badge>
                      <Badge variant="secondary">Remoto</Badge>
                      <Badge variant="secondary">Híbrido</Badge>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3 border-t border-border/80 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Skills destacadas
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "TypeScript",
                        "React",
                        "Next.js",
                        "Node.js",
                        "PostgreSQL",
                      ].map((s) => (
                        <Badge key={s} variant="secondary">
                          {s}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600">
                      “3 años construyendo productos web. Me importa el código
                      limpio, la UX y entregar con impacto.”
                    </p>
                    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                        <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-primary to-sky-400" />
                      </div>
                      <span className="text-xs font-semibold text-slate-600">
                        82%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EMPRESAS */}
        <section className="section-y">
          <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 relative lg:order-1">
              <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/15 via-sky-100/50 to-transparent blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-br from-primary-soft via-white to-sky-50/80 p-6 shadow-xl shadow-primary/10 sm:p-8">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Panel de empresa
                  </p>
                  <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                    Activo
                  </span>
                </div>
                <div className="mt-5 space-y-3">
                  {[
                    { label: "Vacantes activas", value: "3", icon: LayoutGrid },
                    {
                      label: "Postulaciones nuevas",
                      value: "12",
                      icon: Users,
                    },
                    {
                      label: "Chats abiertos",
                      value: "5",
                      icon: MessageCircle,
                    },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between rounded-2xl border border-white/90 bg-white/95 px-4 py-3.5 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                          <row.icon className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">
                          {row.label}
                        </span>
                      </div>
                      <span className="text-xl font-bold tabular-nums text-slate-900">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-white/90 bg-white/95 p-4 shadow-sm">
                  <p className="text-xs font-semibold text-slate-500">
                    Pipeline de postulaciones
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {[
                      {
                        label: "Nuevas",
                        n: 4,
                        color: "bg-sky-100 text-sky-700",
                      },
                      {
                        label: "Revisión",
                        n: 5,
                        color: "bg-amber-50 text-amber-700",
                      },
                      {
                        label: "Entrevista",
                        n: 3,
                        color: "bg-violet-50 text-violet-700",
                      },
                    ].map((col) => (
                      <div
                        key={col.label}
                        className={`rounded-xl px-2 py-3 text-center ${col.color}`}
                      >
                        <p className="text-lg font-bold">{col.n}</p>
                        <p className="text-[10px] font-medium opacity-80">
                          {col.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Publica · revisa pipeline · contacta por chat
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <Badge variant="secondary" className="mb-4 px-3 py-1">
                Para empresas
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Contrata talento con menos ruido
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                Publica vacantes con salario y modalidad claros, recibe
                postulaciones estructuradas y conversa con candidatos desde un
                solo panel.
              </p>
              <ul className="mt-8 space-y-3.5">
                {[
                  "Perfil de marca empleadora profesional",
                  "Pipeline tipo kanban de candidatos",
                  "Chat multi-mensaje con talento",
                  "Publica vacantes y gestiona postulaciones",
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-3">
                <AuthButton
                  mode="register"
                  role="company"
                  size="lg"
                  className="shadow-md shadow-primary/20"
                >
                  Registrar mi empresa
                </AuthButton>
                <Link href="/precios">
                  <Button size="lg" variant="outline">
                    Ver precios
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORÍAS */}
        <section className="section-y">
          <div className="container-page">
            <SectionHeading
              eyebrow="Áreas"
              title="Encuentra roles por especialidad"
              description="Explora vacantes por área y encuentra el rol que mejor se adapta a tu perfil."
            />
            <div className="mt-12">
              <HomeCategories />
            </div>
          </div>
        </section>

        {/* PILARES */}
        <section className="section-y">
          <div className="container-page">
            <SectionHeading
              eyebrow="Qué es Reclu"
              title="Una plataforma de empleo profesional, no un tablón genérico"
              description="Reclu une tres piezas que suelen estar separadas: perfil profesional, vacantes transparentes y conversación real con reclutadores — con el respaldo de ProgramBI."
            />
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: UserRound,
                  title: "Perfiles que venden tu talento",
                  body: "Experiencia, skills, proyectos, idiomas, CV y badge ProgramBI. Los reclutadores ven contexto, no solo un PDF suelto.",
                },
                {
                  icon: Target,
                  title: "Vacantes con información clara",
                  body: "Modalidad, seniority y rangos salariales visibles cuando la empresa los publica. Menos sorpresas al postular.",
                },
                {
                  icon: MessageCircle,
                  title: "Postular y conversar",
                  body: "Aplica en un flujo simple, sigue el estado de tu postulación y chatea con empresas cuando te contacten.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="group relative overflow-hidden rounded-3xl border border-border/80 bg-white p-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/[0.04] transition group-hover:bg-primary/[0.08]" />
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/25">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">
                    {f.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                    {f.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROGRAMBI — mismo fondo blanco */}
        <section className="section-y">
          <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary-soft/80 px-3.5 py-1.5 text-xs font-semibold text-primary">
                <GraduationCap className="h-3.5 w-3.5" />
                ProgramBI × Reclu
              </div>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Del aprendizaje al empleo, en la misma red
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                ProgramBI forma profesionales listos para el mercado. Reclu es
                el puente hacia el empleo: perfiles serios, procesos claros y
                una red pensada para conectar talento con empresas.
              </p>
              <Link href="/sobre-nosotros" className="mt-8 inline-block">
                <Button size="lg" className="shadow-md shadow-primary/20">
                  Conoce la misión
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  t: "Alumni visible",
                  d: "Badge ProgramBI en perfiles para que el talento formado se distinga.",
                },
                {
                  t: "Proceso claro",
                  d: "Vacantes con modalidad y datos a la vista. Menos fricción al postular.",
                },
                {
                  t: "Modalidades flexibles",
                  d: "Roles remotos, híbridos y presenciales según cada vacante.",
                },
                {
                  t: "Una sola red",
                  d: "Formación y empleo conectados: ProgramBI y Reclu en el mismo ecosistema.",
                },
              ].map((c) => (
                <div
                  key={c.t}
                  className="rounded-2xl border border-border/80 bg-white p-5 shadow-sm transition hover:border-primary/25 hover:shadow-md"
                >
                  <p className="font-semibold text-slate-900">{c.t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {c.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Testimonials />

        {/* FAQ */}
        <section className="section-y">
          <div className="container-page">
            <SectionHeading
              eyebrow="Preguntas frecuentes"
              title="Respuestas rápidas"
              description="Lo esencial antes de crear tu cuenta."
            />
            <div className="mx-auto mt-12 max-w-3xl space-y-3">
              {[
                {
                  q: "¿Qué es exactamente Reclu?",
                  a: "Es la bolsa de trabajo de ProgramBI: perfiles profesionales, vacantes, postulaciones y chat con reclutadores.",
                },
                {
                  q: "¿Es gratis?",
                  a: "Sí. En el lanzamiento, candidatos y empresas pueden usar la plataforma sin costo. Publicar y postular no requiere pago.",
                },
                {
                  q: "¿Cómo publican las empresas?",
                  a: "Registran su empresa, completan el perfil y publican vacantes desde su panel. Así gestionan postulaciones y conversaciones en un solo lugar.",
                },
                {
                  q: "¿Sirve si soy junior o alumni de bootcamp?",
                  a: "Sí. El perfil está pensado para mostrar proyectos, skills y formación — incluyendo badge ProgramBI — no solo trayectoria corporativa larga.",
                },
              ].map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-border/80 bg-slate-50/40 px-5 py-4 shadow-sm transition open:border-primary/25 open:bg-white open:shadow-md"
                >
                  <summary className="cursor-pointer list-none font-semibold text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center justify-between gap-3">
                      {f.q}
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-white text-lg leading-none text-primary transition group-open:rotate-45 group-open:border-primary/30 group-open:bg-primary-soft">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-3 pr-10 text-sm leading-relaxed text-slate-600">
                    {f.a}
                  </p>
                </details>
              ))}
              <p className="pt-5 text-center text-sm text-muted-foreground">
                ¿Más dudas?{" "}
                <Link
                  href="/faq"
                  className="font-medium text-primary hover:underline"
                >
                  Ver centro de ayuda
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>

      <MarketingCta />
    </>
  );
}
