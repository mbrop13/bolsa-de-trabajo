"use client";

import { DEMO_MODE } from "@/lib/demo-data";
import { useRecluStoreOptional } from "@/lib/store/reclu-store";

export function DemoBanner() {
  const store = useRecluStoreOptional();
  if (!DEMO_MODE) return null;
  return (
    <div className="bg-primary px-4 py-2 text-center text-xs font-medium text-white sm:text-sm">
      <span className="hidden sm:inline">
        Flujos activos: postular · publicar vacantes · contactar talento. Datos en
        este navegador.{" "}
      </span>
      <a href="/app" className="underline underline-offset-2 hover:text-white/90">
        Candidato
      </a>
      {" · "}
      <a href="/empresa" className="underline underline-offset-2 hover:text-white/90">
        Empresa
      </a>
      {" · "}
      <a href="/admin" className="underline underline-offset-2 hover:text-white/90">
        Admin
      </a>
      {store && (
        <>
          {" · "}
          <button
            type="button"
            className="underline underline-offset-2 hover:text-white/90"
            onClick={() => {
              if (confirm("¿Restablecer datos demo de este navegador?")) {
                store.resetStore();
                window.location.reload();
              }
            }}
          >
            Reset datos
          </button>
        </>
      )}
    </div>
  );
}
