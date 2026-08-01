import { Suspense } from "react";
import { EmpleosClient } from "./empleos-client";

export const metadata = {
  title: "Empleos tech",
  description: "Explora vacantes de programación, data, diseño y más en LATAM.",
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
