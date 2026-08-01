import { Suspense } from "react";
import { EmpleosClient } from "./empleos-client";

export const metadata = {
  title: "Empleos",
  description: "Explora vacantes de empresas verificadas en Latinoamérica.",
};

export default function EmpleosPage() {
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
