import { DemoBanner } from "@/components/layout/demo-banner";
import { Logo } from "@/components/layout/logo";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, MessageCircle } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <DemoBanner />
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Brand panel */}
        <aside className="relative hidden overflow-hidden bg-slate-900 px-10 py-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="pointer-events-none absolute -left-10 bottom-10 h-56 w-56 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="relative">
            <Logo href="/" showTagline variant="light" />
            <h1 className="mt-16 max-w-md text-3xl font-bold tracking-tight xl:text-4xl">
              La bolsa de trabajo tech de ProgramBI
            </h1>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-slate-300">
              Perfiles profesionales, empresas verificadas y chat con
              reclutadores. Hecha para el ecosistema tech de Latinoamérica.
            </p>
            <ul className="mt-10 space-y-4 text-sm text-slate-200">
              {[
                {
                  icon: ShieldCheck,
                  t: "Empresas aprobadas manualmente",
                },
                {
                  icon: CheckCircle2,
                  t: "Vacantes con modalidad y salario claros",
                },
                {
                  icon: MessageCircle,
                  t: "Postulaciones y chat en un solo lugar",
                },
              ].map((i) => (
                <li key={i.t} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-sky-300">
                    <i.icon className="h-4 w-4" />
                  </span>
                  {i.t}
                </li>
              ))}
            </ul>
          </div>
          <p className="relative text-xs text-slate-500">
            © {new Date().getFullYear()} Reclu by ProgramBI
          </p>
        </aside>

        {/* Form panel */}
        <div className="flex flex-col justify-center px-4 py-10 sm:px-8">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8 flex justify-center lg:hidden">
              <Logo showTagline />
            </div>
            {children}
            <p className="mt-8 text-center text-sm text-muted-foreground">
              <Link href="/" className="font-medium hover:text-primary">
                ← Volver al inicio
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
