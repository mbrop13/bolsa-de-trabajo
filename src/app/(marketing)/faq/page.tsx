import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Preguntas frecuentes" };

const faqs = [
  {
    q: "¿Reclu es gratis?",
    a: "Sí. En el lanzamiento candidatos y empresas usan la plataforma sin costo. Más adelante podrá haber planes premium opcionales.",
  },
  {
    q: "¿Cómo contactan las empresas a los candidatos?",
    a: "Las empresas aprobadas pueden iniciar un chat profesional desde el perfil del talento o desde las postulaciones. El candidato responde en su panel de Chat.",
  },
  {
    q: "¿Hay chat en tiempo real?",
    a: "Hay conversaciones multi-mensaje (chat de reclutamiento). En demo se guardan en el navegador; en producción se conectan a Supabase (y opcionalmente Realtime).",
  },
  {
    q: "¿Por qué mi empresa no puede publicar?",
    a: "Las empresas nuevas quedan en estado pendiente hasta que el equipo de Reclu/ProgramBI las apruebe. Así mantenemos calidad y confianza.",
  },
  {
    q: "¿Qué es el badge ProgramBI?",
    a: "Identifica alumnos o egresados de ProgramBI. Las empresas pueden filtrar talento con esa formación.",
  },
  {
    q: "¿Puedo postular a varias vacantes?",
    a: "Sí. Una postulación activa por vacante. Puedes retirar una postulación desde tu panel si ya no te interesa.",
  },
];

export default function FaqPage() {
  return (
    <div className="container-page max-w-3xl py-16">
      <Badge className="mb-4">Ayuda</Badge>
      <h1 className="text-3xl font-bold tracking-tight">
        Preguntas frecuentes
      </h1>
      <p className="mt-2 text-muted-foreground">
        Todo lo esencial sobre Reclu by ProgramBI
      </p>
      <div className="mt-10 space-y-4">
        {faqs.map((f) => (
          <details
            key={f.q}
            className="group rounded-2xl border border-border bg-white p-5 shadow-sm open:border-primary/30"
          >
            <summary className="cursor-pointer list-none font-semibold text-slate-900 marker:content-none">
              {f.q}
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.a}</p>
          </details>
        ))}
      </div>
      <p className="mt-10 text-sm text-muted-foreground">
        ¿Más dudas?{" "}
        <Link href="/sobre-nosotros" className="text-primary hover:underline">
          Conoce ProgramBI
        </Link>{" "}
        o crea tu cuenta en{" "}
        <Link href="/auth/registro" className="text-primary hover:underline">
          Reclu
        </Link>
        .
      </p>
    </div>
  );
}
