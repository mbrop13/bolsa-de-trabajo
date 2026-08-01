import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FeaturedJobs } from "@/components/jobs/featured-jobs";
import { HeroShowcase } from "@/components/marketing/hero-showcase";
import { LogoCloud } from "@/components/marketing/logo-cloud";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Testimonials } from "@/components/marketing/testimonials";
import { MarketingCta } from "@/components/marketing/marketing-cta";
import { CATEGORIES } from "@/lib/constants";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  GraduationCap,
  LayoutGrid,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
} from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* ——— HERO ——— */}
      <section className="relative overflow-hidden border-b border-border bg-hero">
        <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-sky-200/50 blur-3xl" />

        <div className="container-page relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div>
            <Badge className="mb-5 px-3.5 py-1.5">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              by ProgramBI · LATAM tech
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              La bolsa de trabajo tech
              <span className="mt-1 block bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent">
                de ProgramBI
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              <strong className="font-semibold text-slate-800">Reclu</strong> es
              la plataforma donde talento de programación y datos construye un
              perfil profesional, postula a vacantes claras y chatea con
              empresas{" "}
              <strong className="font-semibold text-slate-800">
                verificadas
              </strong>
              . Hecha para Latinoamérica.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/auth/registro/candidato">
                <Button size="lg" className="h-12 w-full px-7 text-base sm:w-auto">
                  Crear perfil de candidato
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/auth/registro/empresa">
                <Button
                  size="lg"
                  variant="secondary"
                  className="h-12 w-full px-7 text-base sm:w-auto"
                >
                  Soy empresa
                </Button>
              </Link>
              <Link href="/empleos">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 w-full px-7 text-base sm:w-auto"
                >
                  <Search className="h-4 w-4" />
                  Ver empleos
                </Button>
              </Link>
            </div>

            <ul className="mt-10 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
              {[
                "Empresas aprobadas por el equipo Reclu",
                "Perfiles detallados (tipo LinkedIn tech)",
                "Postulaciones + pipeline + chat",
                "Gratis para candidatos en el lanzamiento",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <HeroShowcase />
        </div>
      </section>

      <LogoCloud />

      {/* ——— QUÉ ES ——— */}
      <section className="container-page py-20 sm:py-24">
        <SectionHeading
          eyebrow="Qué es Reclu"
          title="Una plataforma de empleo tech, no un tablón genérico"
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
              icon: ShieldCheck,
              title: "Empresas verificadas",
              body: "Nadie publica ni contacta sin aprobación. Menos spam, más confianza para candidatos y para la marca empleadora.",
            },
            {
              icon: MessageCircle,
              title: "Postular y conversar",
              body: "Aplica en un flujo simple, sigue el estado de tu postulación y chatea con empresas cuando te contacten.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="group rounded-3xl border border-border bg-white p-8 shadow-sm transition hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary transition group-hover:bg-primary group-hover:text-white">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ——— CANDIDATOS ——— */}
      <section className="border-y border-border bg-slate-50/70 py-20 sm:py-24">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Badge variant="secondary" className="mb-4">
              Para candidatos
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Tu carrera tech, con un perfil que se entiende
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Si buscas tu primer empleo, un salto de seniority o un rol remoto
              en LATAM, Reclu te da un espacio profesional para mostrarte y
              postular con claridad.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Perfil completo: headline, experiencia, skills, proyectos",
                "Filtros de empleos por modalidad, seniority y categoría",
                "Seguimiento de postulaciones y chat con empresas",
                "Destaca si eres alumno o egresado de ProgramBI",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-sm text-slate-700">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                    ✓
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/auth/registro/candidato">
                <Button size="lg">Crear mi perfil gratis</Button>
              </Link>
              <Link href="/empleos">
                <Button size="lg" variant="outline">
                  Explorar vacantes
                </Button>
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Así te ven las empresas
            </p>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-soft text-xl font-bold text-primary">
                AM
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">Ana Martínez</p>
                <p className="text-sm text-muted-foreground">
                  Full Stack Developer · React & Node
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <Badge>ProgramBI</Badge>
                  <Badge variant="outline">Buscando activamente</Badge>
                  <Badge variant="secondary">Remoto</Badge>
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-3 border-t border-border pt-6">
              <p className="text-sm font-medium text-slate-800">Skills destacadas</p>
              <div className="flex flex-wrap gap-2">
                {["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL"].map(
                  (s) => (
                    <Badge key={s} variant="secondary">
                      {s}
                    </Badge>
                  )
                )}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                “3 años construyendo productos web. Me importa el código limpio,
                la UX y entregar con impacto.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ——— EMPRESAS ——— */}
      <section className="container-page py-20 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 rounded-3xl border border-primary/15 bg-gradient-to-br from-primary-soft via-white to-sky-50 p-6 shadow-lg sm:p-8 lg:order-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Panel de empresa
            </p>
            <div className="mt-4 space-y-3">
              {[
                { label: "Vacantes activas", value: "3", icon: LayoutGrid },
                { label: "Postulaciones nuevas", value: "12", icon: Users },
                { label: "Chats abiertos", value: "5", icon: MessageCircle },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
                      <row.icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">
                      {row.label}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-slate-900">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Publica · revisa pipeline · contacta por chat
            </p>
          </div>

          <div className="order-1 lg:order-2">
            <Badge variant="secondary" className="mb-4">
              Para empresas
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Contrata talento tech con menos ruido
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Publica vacantes con salario y modalidad claros, recibe
              postulaciones estructuradas y conversa solo cuando tu empresa está
              verificada.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Perfil de marca empleadora profesional",
                "Pipeline tipo kanban de candidatos",
                "Chat multi-mensaje con talento",
                "Moderación: solo empresas aprobadas publican",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-sm text-slate-700">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/auth/registro/empresa">
                <Button size="lg">Registrar mi empresa</Button>
              </Link>
              <Link href="/precios">
                <Button size="lg" variant="outline">
                  Ver precios
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ——— EMPLEOS ——— */}
      <section className="border-y border-border bg-slate-50/80 py-20">
        <div className="container-page">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              align="left"
              eyebrow="Oportunidades abiertas"
              title="Empleos tech con información clara"
              description="Seniority, modalidad y rangos salariales visibles. Menos sorpresas, mejores postulaciones."
              className="max-w-xl"
            />
            <Link href="/empleos">
              <Button variant="secondary" size="lg">
                Ver todos
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <FeaturedJobs limit={4} />
        </div>
      </section>

      {/* ——— CATEGORÍAS ——— */}
      <section className="container-page py-20">
        <SectionHeading
          eyebrow="Áreas"
          title="Encuentra roles por especialidad"
          description="Desde programación y data hasta producto, cloud e IA."
        />
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/empleos?categoria=${cat.slug}`}
              className="group flex flex-col items-start rounded-2xl border border-border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary group-hover:bg-primary group-hover:text-white">
                <Building2 className="h-4 w-4" />
              </span>
              <span className="mt-3 text-sm font-semibold text-slate-800 group-hover:text-primary">
                {cat.name}
              </span>
              <span className="mt-1 text-xs text-muted-foreground">
                Ver vacantes →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ——— PROGRAMBI ——— */}
      <section className="relative overflow-hidden border-y border-border bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 py-20 text-white">
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="container-page relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-sky-200">
              <GraduationCap className="h-3.5 w-3.5" />
              ProgramBI × Reclu
            </div>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Del aprendizaje al empleo, en la misma red
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              ProgramBI forma profesionales en programación y datos. Reclu es el
              puente hacia el mercado laboral: perfiles serios, empresas
              cuidadas y procesos transparentes.
            </p>
            <Link href="/sobre-nosotros" className="mt-8 inline-block">
              <Button
                size="lg"
                className="bg-white text-slate-900 hover:bg-slate-100"
              >
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
                t: "Empresas serias",
                d: "Revisión manual antes de publicar y contactar candidatos.",
              },
              {
                t: "LATAM first",
                d: "Roles remotos, híbridos y presenciales pensados para la región.",
              },
              {
                t: "Proceso claro",
                d: "Salarios y modalidad a la vista. Menos fricción, más match.",
              },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
              >
                <p className="font-semibold text-white">{c.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {c.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— CÓMO FUNCIONA ——— */}
      <section className="container-page py-20 sm:py-24">
        <SectionHeading
          eyebrow="Proceso"
          title="Cómo funciona, en cuatro pasos"
          description="Simple para candidatos. Controlado para empresas."
        />
        <div className="relative mt-14 grid gap-6 md:grid-cols-4">
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-8 hidden h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 md:block" />
          {[
            {
              n: "01",
              t: "Crea tu cuenta",
              d: "Elige candidato o empresa y completa lo esencial en minutos.",
            },
            {
              n: "02",
              t: "Construye presencia",
              d: "Perfil profesional o ficha de empresa lista para reclutar.",
            },
            {
              n: "03",
              t: "Publica o postula",
              d: "Vacantes con datos claros. Aplicaciones con mensaje y contexto.",
            },
            {
              n: "04",
              t: "Conversa y avanza",
              d: "Pipeline de estados y chat cuando hay interés real.",
            },
          ].map((s) => (
            <div key={s.n} className="relative rounded-3xl border border-border bg-white p-6 text-center shadow-sm">
              <span className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-md shadow-primary/30">
                {s.n}
              </span>
              <h3 className="mt-4 font-semibold text-slate-900">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Testimonials />

      {/* ——— FAQ corta ——— */}
      <section className="container-page py-20">
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title="Respuestas rápidas"
        />
        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {[
            {
              q: "¿Qué es exactamente Reclu?",
              a: "Es la bolsa de trabajo tech de ProgramBI: perfiles profesionales, vacantes de empresas verificadas, postulaciones y chat con reclutadores en Latinoamérica.",
            },
            {
              q: "¿Es gratis?",
              a: "Sí. En el lanzamiento, candidatos y empresas pueden usar la plataforma sin costo. Publicar y postular no requiere pago.",
            },
            {
              q: "¿Cualquier empresa puede publicar?",
              a: "Solo después de la aprobación del equipo Reclu/ProgramBI. Así protegemos la calidad de la red y la experiencia de los candidatos.",
            },
            {
              q: "¿Sirve si soy junior o alumni de bootcamp?",
              a: "Sí. El perfil está pensado para mostrar proyectos, skills y formación — incluyendo badge ProgramBI — no solo trayectoria corporativa larga.",
            },
          ].map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-border bg-white px-5 py-4 shadow-sm open:border-primary/25 open:shadow-md"
            >
              <summary className="cursor-pointer list-none font-semibold text-slate-900 marker:content-none">
                <span className="flex items-center justify-between gap-3">
                  {f.q}
                  <span className="text-primary transition group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {f.a}
              </p>
            </details>
          ))}
          <p className="pt-4 text-center text-sm text-muted-foreground">
            ¿Más dudas?{" "}
            <Link href="/faq" className="font-medium text-primary hover:underline">
              Ver centro de ayuda
            </Link>
          </p>
        </div>
      </section>

      <MarketingCta />
    </>
  );
}
