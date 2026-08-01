import Link from "next/link";
import { Logo } from "./logo";
import { AuthTextLink } from "@/components/auth/auth-text-link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-slate-50">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo showTagline />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              La bolsa de trabajo de ProgramBI. Conectamos talento con empresas
              que crecen en Latinoamérica.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">Producto</h4>
            <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/empleos" className="hover:text-primary">
                  Empleos
                </Link>
              </li>
              <li>
                <Link href="/empresas" className="hover:text-primary">
                  Empresas
                </Link>
              </li>
              <li>
                <Link href="/precios" className="hover:text-primary">
                  Precios
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary">
                  Centro de ayuda
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">Cuentas</h4>
            <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <AuthTextLink mode="register" role="candidate">
                  Soy candidato
                </AuthTextLink>
              </li>
              <li>
                <AuthTextLink mode="register" role="company">
                  Soy empresa
                </AuthTextLink>
              </li>
              <li>
                <AuthTextLink mode="login">Iniciar sesión</AuthTextLink>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">Legal</h4>
            <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/privacidad" className="hover:text-primary">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="hover:text-primary">
                  Términos
                </Link>
              </li>
              <li>
                <Link href="/sobre-nosotros" className="hover:text-primary">
                  Sobre nosotros
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Reclu by ProgramBI. Todos los derechos
            reservados.
          </p>
          <p>Hecho para el talento y las empresas de Latinoamérica.</p>
        </div>
      </div>
    </footer>
  );
}
