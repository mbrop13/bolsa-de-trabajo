import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/marketing/page-hero";
import { MarketingCta } from "@/components/marketing/marketing-cta";
import {
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";

export const metadata = {
  title: "Sobre nosotros",
  description:
    "Reclu es la bolsa de trabajo de ProgramBI. Conectamos formación y empleo en Latinoamérica.",
};

const values = [
  {
    icon: ShieldCheck,
    title: "Confianza",
    body: "Empresas verificadas. Menos ruido, más seriedad para quienes buscan y contratan.",
  },
  {
    icon: Target,
    title: "Transparencia",
    body: "Vacantes con modalidad, seniority y, cuando es posible, rangos salariales claros.",
  },
  {
    icon: Users,
    title: "Talento real",
    body: "Perfiles completos: no solo un CV, sino trayectoria, proyectos y skills.",
  },
  {
    icon: HeartHandshake,
    title: "Comunidad ProgramBI",
    body: "Un puente natural entre quienes se forman con nosotros y el mercado laboral.",
  },
];

export default function SobreNosotrosPage() {
  return (
    <>
      <PageHero
        eyebrow="ProgramBI × Reclu"
        title="Conectamos formación y empleo en LATAM"
        description="ProgramBI forma profesionales listos para el mercado. Reclu es la plataforma donde ese talento y las empresas se encuentran con seriedad."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/auth/registro">
            <Button size="lg">Unirme a Reclu</Button>
          </Link>
          <Link href="/empleos">
            <Button size="lg" variant="outline">
              Ver empleos
            </Button>
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
              <GraduationCap className="h-3.5 w-3.5" />
              Nuestra historia
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Del aula al empleo, sin perder calidad
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600">
              <p>
                <strong className="text-slate-900">ProgramBI</strong> nació para
                formar personas con un enfoque práctico. Vimos de cerca un
                problema: el salto al mercado laboral es confuso, lleno de
                portales genéricos y procesos opacos.
              </p>
              <p>
                <strong className="text-slate-900">Reclu</strong> es nuestra
                respuesta: una bolsa de trabajo pensada para Latinoamérica, con
                perfiles profesionales, empresas verificadas y herramientas
                reales de postulación y contacto.
              </p>
              <p>
                No queremos ser “otro tablero de avisos”. Queremos ser el lugar
                donde se construye confianza entre quienes aprenden, quienes ya
                trabajan y quienes contratan.
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { k: "Foco", v: "Empleo en LATAM" },
              { k: "Candidatos", v: "Perfiles detallados" },
              { k: "Empresas", v: "Aprobación manual" },
              { k: "Proceso", v: "Postular + chat" },
            ].map((s) => (
              <div
                key={s.k}
                className="rounded-3xl border border-border bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {s.k}
                </p>
                <p className="mt-2 text-lg font-bold text-slate-900">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-slate-50/80 py-16 sm:py-20">
        <div className="container-page">
          <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            Nuestros valores
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
            Lo que guía cada decisión de producto en Reclu.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-3xl border border-border bg-white p-6 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MarketingCta
        title="Sé parte de la red"
        description="Candidatos, alumni ProgramBI y empresas: hay un lugar para ti en Reclu."
      />
    </>
  );
}
