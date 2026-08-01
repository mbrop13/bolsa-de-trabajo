"use client";

import { useState } from "react";
import Link from "next/link";
import { useRecluStore } from "@/lib/store/reclu-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import type { Company, CompanyStatus } from "@/types/database";
import { toast } from "sonner";

function statusVariant(status: Company["status"]) {
  if (status === "approved") return "success" as const;
  if (status === "pending") return "warning" as const;
  if (status === "rejected") return "danger" as const;
  return "secondary" as const;
}

export default function AdminEmpresasPage() {
  const store = useRecluStore();
  const [filter, setFilter] = useState("all");
  const companies = store.state.companies;
  const list =
    filter === "all"
      ? companies
      : companies.filter((c) => c.status === filter);

  function setStatus(id: string, status: CompanyStatus) {
    store.setCompanyStatus(id, status);
    toast.success(
      status === "approved"
        ? "Empresa aprobada — ya puede publicar y contactar"
        : status === "rejected"
          ? "Empresa rechazada"
          : "Estado actualizado"
    );
  }

  if (!store.ready) {
    return <p className="text-muted-foreground">Cargando…</p>;
  }

  return (
    <div className="space-y-4 pb-20 lg:pb-0">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {list.length} empresa(s) · Aprobar habilita publicar vacantes y
          contactar talento
        </p>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-48"
        >
          <option value="all">Todas</option>
          <option value="pending">Pendientes</option>
          <option value="approved">Aprobadas</option>
          <option value="rejected">Rechazadas</option>
          <option value="suspended">Suspendidas</option>
        </Select>
      </div>

      <div className="space-y-3">
        {list.map((c) => (
          <div
            key={c.id}
            className="rounded-2xl border border-border bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-slate-900">{c.name}</h3>
                  <Badge variant={statusVariant(c.status)}>{c.status}</Badge>
                  {c.is_featured && <Badge>Featured</Badge>}
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {c.industry} · {c.headquarters}
                </p>
                <p className="text-xs text-muted-foreground">{c.website}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href={`/admin/empresas/${c.id}`}>
                  <Button size="sm" variant="outline">
                    Detalle
                  </Button>
                </Link>
                {c.status === "pending" && (
                  <>
                    <Button size="sm" onClick={() => setStatus(c.id, "approved")}>
                      Aprobar
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => setStatus(c.id, "rejected")}
                    >
                      Rechazar
                    </Button>
                  </>
                )}
                {c.status === "approved" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setStatus(c.id, "suspended")}
                  >
                    Suspender
                  </Button>
                )}
                {c.status === "suspended" && (
                  <Button
                    size="sm"
                    onClick={() => setStatus(c.id, "approved")}
                  >
                    Reactivar
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
