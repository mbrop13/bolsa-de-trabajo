import { Suspense } from "react";
import { EmpleosClient } from "./empleos-client";
import { EarlyAccessPanel } from "@/components/marketing/early-access-panel";
import { isEarlyAccess } from "@/lib/config";

export const metadata = {
  title: isEarlyAccess() ? "Empleos · Próximamente" : "Empleos",
  description: isEarlyAccess()
    ? "Reclu está en early access. Regístrate ahora; las vacantes se abren en el lanzamiento."
    : "Explora vacantes y oportunidades de empleo en Reclu by ProgramBI.",
};

export default function EmpleosPage() {
  if (isEarlyAccess()) {
    return (
      <div className="bg-white">
        <div className="container-page py-16 sm:py-20">
          <EarlyAccessPanel />
        </div>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="container-page py-20 text-center text-muted-foreground">
          Cargando empleos...
        </div>
      }
    >
      <EmpleosClient />
    </Suspense>
  );
}
