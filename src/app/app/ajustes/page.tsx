"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function AjustesCandidatoPage() {
  return (
    <div className="mx-auto max-w-xl space-y-6 pb-20 lg:pb-0">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Cuenta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input defaultValue="ana.dev@example.com" disabled />
          </div>
          <div className="space-y-2">
            <Label>Nueva contraseña</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <Button
            type="button"
            onClick={() => toast.success("Ajustes guardados")}
          >
            Guardar
          </Button>
        </CardContent>
      </Card>
      <Card className="border-red-100">
        <CardHeader>
          <CardTitle className="text-base text-red-700">Zona de peligro</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Desactivar tu cuenta oculta tu perfil y cancela postulaciones activas.
          </p>
          <Button variant="danger" className="mt-4" type="button">
            Desactivar cuenta
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
