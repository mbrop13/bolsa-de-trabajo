import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { MarketingCta } from "@/components/marketing/marketing-cta";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Centro de ayuda",
  description: "Preguntas frecuentes sobre Reclu, la bolsa de trabajo de ProgramBI.",
};

const groups = [
  {
    title: "Sobre la plataforma",
    items: [
      {
        q: "¿Qué es Reclu?",
        a: "Reclu es la bolsa de trabajo tech de ProgramBI. Conecta talento de programación y datos con empresas verificadas en Latinoamérica: perfiles profesionales, vacantes claras, postulaciones y chat con reclutadores.",
      },
      {
        q: "¿En qué se diferencia de otros portales?",
        a: "Enfoque 100% tech, verificación de empresas, perfiles detallados (no solo un CV), transparencia de modalidad/salario y chat integrado. Además, integra la comunidad ProgramBI.",
      },
      {
        q: "¿Es gratis?",
        a: "Sí. En el lanzamiento, candidatos y empresas pueden usar la plataforma sin costo para postular y publicar.",
      },
    ],
  },
  {
    title: "Candidatos",
    items: [
      {
        q: "¿Cómo creo un buen perfil?",
        a: "Completa headline, resumen, experiencia o proyectos, skills y educación. Si eres de ProgramBI, activa el badge. Un perfil más completo recibe más atención de reclutadores.",
      },
      {
        q: "¿Puedo postular a varias vacantes?",
        a: "Sí. Una postulación activa por vacante. Puedes ver el estado y retirar una postulación desde tu panel.",
      },
      {
        q: "¿Cómo funciona el chat?",
        a: "Las empresas verificadas pueden iniciar una conversación contigo. Respondes desde Chat en tu panel, con mensajes múltiples (no solo un correo suelto).",
      },
    ],
  },
  {
    title: "Empresas",
    items: [
      {
        q: "¿Por qué mi empresa está pendiente?",
        a: "Revisamos cada registro para mantener la calidad de la red. Cuando seas aprobada, podrás publicar vacantes y contactar talento.",
      },
      {
        q: "¿Qué veo en el panel de empresa?",
        a: "Vacantes, inbox de postulaciones con pipeline de estados, directorio de talento público y chat con candidatos.",
      },
      {
        q: "¿Puedo destacar vacantes?",
        a: "Hoy el lanzamiento es gratuito. Más adelante podremos ofrecer opciones premium; te avisaremos en la plataforma.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Centro de ayuda"
        title="Preguntas frecuentes"
        description="Todo lo esencial para entender Reclu y sacar el máximo provecho como candidato o empresa."
      >
        <Link href="/auth/registro">
          <Button size="lg">Crear cuenta</Button>
        </Link>
      </PageHero>

      <section className="container-page py-16 sm:py-20">
        <div className="mx-auto max-w-3xl space-y-12">
          {groups.map((g) => (
            <div key={g.title}>
              <h2 className="text-lg font-bold text-slate-900">{g.title}</h2>
              <div className="mt-4 space-y-3">
                {g.items.map((f) => (
                  <details
                    key={f.q}
                    className="group rounded-2xl border border-border bg-white px-5 py-4 shadow-sm open:border-primary/25 open:shadow-md"
                  >
                    <summary className="cursor-pointer list-none font-semibold text-slate-900">
                      <span className="flex items-center justify-between gap-3">
                        {f.q}
                        <span className="text-lg text-primary transition group-open:rotate-45">
                          +
                        </span>
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <MarketingCta />
    </>
  );
}
