"use client";

import { useState } from "react";
import { demoCompanies } from "@/lib/demo-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { COMPANY_SIZES } from "@/lib/constants";
import { toast } from "sonner";

export default function EmpresaPerfilPage() {
  const base = demoCompanies[0];
  const [form, setForm] = useState({
    name: base.name,
    tagline: base.tagline || "",
    description: base.description || "",
    industry: base.industry || "",
    company_size: base.company_size || "11-50",
    headquarters: base.headquarters || "",
    website: base.website || "",
    linkedin_url: base.linkedin_url || "",
    contact_email: base.contact_email || "",
    founded_year: base.founded_year?.toString() || "",
  });

  return (
    <div className="mx-auto max-w-2xl space-y-6 pb-20 lg:pb-0">
      <div className="flex items-center gap-2">
        <Badge variant="success">Aprobada</Badge>
        <span className="text-sm text-muted-foreground">
          Visible en el directorio público
        </span>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Perfil de empresa</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label>Nombre comercial</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Tagline</Label>
            <Input
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Descripción / cultura</Label>
            <Textarea
              rows={5}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Industria</Label>
            <Input
              value={form.industry}
              onChange={(e) => setForm({ ...form, industry: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Tamaño</Label>
            <Select
              value={form.company_size}
              onChange={(e) =>
                setForm({ ...form, company_size: e.target.value })
              }
            >
              {COMPANY_SIZES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Sede</Label>
            <Input
              value={form.headquarters}
              onChange={(e) =>
                setForm({ ...form, headquarters: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Año de fundación</Label>
            <Input
              value={form.founded_year}
              onChange={(e) =>
                setForm({ ...form, founded_year: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Website</Label>
            <Input
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Email de reclutamiento</Label>
            <Input
              value={form.contact_email}
              onChange={(e) =>
                setForm({ ...form, contact_email: e.target.value })
              }
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Logo</Label>
            <div className="rounded-xl border border-dashed border-border bg-slate-50 p-6 text-center text-sm text-muted-foreground">
              Subir logo (PNG o JPG)
              <div className="mt-3">
                <Button type="button" variant="outline" size="sm">
                  Subir imagen
                </Button>
              </div>
            </div>
          </div>
          <div className="sm:col-span-2">
            <Button
              type="button"
              onClick={() => toast.success("Perfil de empresa actualizado")}
            >
              Guardar perfil
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
