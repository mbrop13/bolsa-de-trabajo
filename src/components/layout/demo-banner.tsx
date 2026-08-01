"use client";

import { showDevChrome } from "@/lib/config";
import { useRecluStoreOptional } from "@/lib/store/reclu-store";

/**
 * Solo visible en desarrollo local.
 * Nunca se muestra en producción (Vercel).
 */
export function DemoBanner() {
  const store = useRecluStoreOptional();
  if (!showDevChrome()) return null;

  return (
    <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs font-medium text-amber-900 sm:text-sm">
      <span className="hidden sm:inline">Modo desarrollo · </span>
      <a href="/app" className="underline underline-offset-2">
        Candidato
      </a>
      {" · "}
      <a href="/empresa" className="underline underline-offset-2">
        Empresa
      </a>
      {" · "}
      <a href="/admin" className="underline underline-offset-2">
        Admin
      </a>
      {store && (
        <>
          {" · "}
          <button
            type="button"
            className="underline underline-offset-2"
            onClick={() => {
              if (confirm("¿Restablecer datos locales de este navegador?")) {
                store.resetStore();
                window.location.reload();
              }
            }}
          >
            Reset
          </button>
        </>
      )}
    </div>
  );
}
