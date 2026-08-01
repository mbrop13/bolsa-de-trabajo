import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, User } from "lucide-react";

export const metadata = { title: "Crear cuenta" };

export default function RegistroPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Únete a Reclu</CardTitle>
        <CardDescription>Elige cómo quieres usar la plataforma</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Link
          href="/auth/registro/candidato"
          className="flex items-start gap-4 rounded-2xl border border-border p-4 transition hover:border-primary/40 hover:bg-primary-soft/40"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
            <User className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-slate-900">Soy candidato/a</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Crea tu perfil profesional y postula a vacantes
            </p>
          </div>
        </Link>
        <Link
          href="/auth/registro/empresa"
          className="flex items-start gap-4 rounded-2xl border border-border p-4 transition hover:border-primary/40 hover:bg-primary-soft/40"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-slate-900">Soy empresa</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Publica vacantes tras la aprobación del equipo Reclu
            </p>
          </div>
        </Link>
        <p className="pt-2 text-center text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{" "}
          <Link href="/auth/login" className="font-medium text-primary hover:underline">
            Inicia sesión
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
