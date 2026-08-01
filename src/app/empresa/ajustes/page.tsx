"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function EmpresaAjustesPage() {
  return (
    <div className="mx-auto max-w-xl space-y-6 pb-20 lg:pb-0">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Notificaciones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Email de alertas</Label>
            <Input defaultValue="talent@nubix.example" />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" defaultChecked className="rounded" />
            Avisarme de nuevas postulaciones
          </label>
          <Button
            type="button"
            onClick={() => toast.success("Ajustes guardados (demo)")}
          >
            Guardar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
