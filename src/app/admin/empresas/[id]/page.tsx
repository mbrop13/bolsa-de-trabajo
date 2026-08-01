"use client";

import { use, useState } from "react";
import Link from "next/link";
import { demoCompanies } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export default function AdminEmpresaDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const base = demoCompanies.find((c) => c.id === id);
  const [notes, setNotes] = useState(base?.admin_notes || "");
  const [status, setStatus] = useState(base?.status);

  if (!base) {
    return <p>Empresa no encontrada</p>;
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 pb-20 lg:pb-0">
      <Link
        href="/admin/empresas"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver
      </Link>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-2xl font-bold">{base.name}</h2>
          <Badge>{status}</Badge>
        </div>
        <p className="text-muted-foreground">{base.tagline}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Datos de verificación</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Website:</span> {base.website}
          </p>
          <p>
            <span className="font-medium">Email contacto:</span>{" "}
            {base.contact_email}
          </p>
          <p>
            <span className="font-medium">Sede:</span> {base.headquarters}
          </p>
          <p>
            <span className="font-medium">Industria:</span> {base.industry}
          </p>
          <p>
            <span className="font-medium">Tamaño:</span> {base.company_size}
          </p>
          <p className="pt-2 text-slate-600 leading-relaxed">
            {base.description}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Notas internas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Label>Notas del admin (no visibles a la empresa)</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Revisé el sitio web, LinkedIn parece legítimo..."
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              onClick={() => {
                setStatus("approved");
                toast.success("Empresa aprobada. En producción se envía email.");
              }}
            >
              Aprobar
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={() => {
                setStatus("rejected");
                toast.message("Empresa rechazada");
              }}
            >
              Rechazar
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => toast.success("Notas guardadas")}
            >
              Guardar notas
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
