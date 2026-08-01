"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="text-xl font-bold text-slate-900">Algo salió mal</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {error.message || "Error inesperado. Intenta de nuevo."}
      </p>
      <Button className="mt-6" onClick={reset}>
        Reintentar
      </Button>
    </div>
  );
}
