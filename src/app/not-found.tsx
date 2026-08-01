import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";

export default function NotFound() {
  return (
    <div className="bg-hero flex min-h-screen flex-col items-center justify-center px-4">
      <Logo showTagline />
      <p className="mt-10 text-6xl font-bold text-primary">404</p>
      <h1 className="mt-3 text-2xl font-bold text-slate-900">
        Página no encontrada
      </h1>
      <p className="mt-2 max-w-md text-center text-muted-foreground">
        El enlace puede estar roto o la vacante ya no está disponible.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/">
          <Button>Ir al inicio</Button>
        </Link>
        <Link href="/empleos">
          <Button variant="outline">Ver empleos</Button>
        </Link>
      </div>
    </div>
  );
}
