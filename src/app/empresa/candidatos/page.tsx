"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ContactCandidateButton } from "@/components/contact/contact-candidate-dialog";
import { DEMO_SESSION, useRecluStore } from "@/lib/store/reclu-store";
import { AlertCircle, Search } from "lucide-react";

export default function EmpresaCandidatosPage() {
  const store = useRecluStore();
  const company = store.getCompany(store.getActiveCompanyId());
  const [q, setQ] = useState("");
  const [programbiOnly, setProgrambiOnly] = useState(false);

  const candidates = useMemo(
    () =>
      store.getPublicCandidates({
        q: q || undefined,
        programbiOnly,
      }),
    [store, q, programbiOnly]
  );

  if (!store.ready) {
    return <p className="text-muted-foreground">Cargando…</p>;
  }

  return (
    <div className="space-y-4 pb-20 lg:pb-0">
      {company?.status !== "approved" && (
        <div className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>
            Solo empresas <strong>aprobadas</strong> pueden contactar
            candidatos.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nombre, headline o skill..."
            className="pl-9"
          />
        </div>
        <label className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-2 text-sm">
          <input
            type="checkbox"
            checked={programbiOnly}
            onChange={(e) => setProgrambiOnly(e.target.checked)}
            className="rounded"
          />
          Solo ProgramBI
        </label>
      </div>

      <p className="text-sm text-muted-foreground">
        {candidates.length} perfil(es) público(s)
      </p>

      <div className="grid gap-3">
        {candidates.map((c) => {
          const name = c.profiles?.full_name || c.username || "Talento";
          return (
            <div
              key={c.id}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-5 shadow-sm transition hover:border-primary/25 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex gap-3">
                <Avatar name={name} size="lg" />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{name}</p>
                    {c.is_programbi_alumni && <Badge>ProgramBI</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">{c.headline}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {c.skills?.slice(0, 5).map((s) => (
                      <Badge key={s.id} variant="secondary">
                        {s.skills?.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {c.username && (
                  <Link href={`/talento/${c.username}`}>
                    <Button variant="outline" size="sm">
                      Ver perfil
                    </Button>
                  </Link>
                )}
                <ContactCandidateButton candidate={c} />
              </div>
            </div>
          );
        })}
        {!candidates.length && (
          <p className="py-12 text-center text-sm text-muted-foreground">
            No hay talento con esos filtros.
          </p>
        )}
      </div>
    </div>
  );
}
