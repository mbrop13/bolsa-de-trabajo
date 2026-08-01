import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Sobre nosotros" };

export default function SobreNosotrosPage() {
  return (
    <div className="container-page py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <Badge className="mb-4">ProgramBI × Reclu</Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Conectamos formación y empleo tech
        </h1>
        <div className="mt-8 space-y-5 text-lg text-slate-600 leading-relaxed">
          <p>
            <strong className="text-slate-900">ProgramBI</strong> forma
            profesionales en programación, datos y tecnología.{" "}
            <strong className="text-slate-900">Reclu</strong> es nuestra bolsa
            de trabajo: el puente entre ese talento y las empresas que lo
            necesitan.
          </p>
          <p>
            Creemos en perfiles honestos, vacantes con información clara
            (salario, modalidad, seniority) y empresas verificadas. Cada
            compañía pasa por una revisión manual antes de publicar y contactar
            candidatos.
          </p>
          <p>
            Nuestro foco es Latinoamérica y el ecosistema tech: desde juniors y
            alumni de bootcamps hasta perfiles semi-senior y senior.
          </p>
        </div>
      </div>
    </div>
  );
}
