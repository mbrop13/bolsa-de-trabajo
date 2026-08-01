"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { toast } from "sonner";

export function RegisterForm({
  role,
  title,
  description,
  demoHref,
}: {
  role: "candidate" | "company";
  title: string;
  description: string;
  demoHref: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (!isSupabaseConfigured()) {
        toast.success(
          role === "company"
            ? "Empresa registrada. Completa tu perfil."
            : "Cuenta creada. Completa tu perfil profesional."
        );
        router.push(demoHref);
        return;
      }
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role,
            company_name: role === "company" ? companyName : undefined,
          },
        },
      });
      if (error) throw error;
      if (data.user) {
        toast.success("Cuenta creada. Revisa tu email si pide confirmación.");
        router.push(role === "company" ? "/empresa" : "/app");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al registrarse");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-border/80 shadow-lg shadow-slate-200/50">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl tracking-tight">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">
              {role === "company" ? "Tu nombre" : "Nombre completo"}
            </Label>
            <Input
              id="fullName"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="María García"
            />
          </div>
          {role === "company" && (
            <div className="space-y-2">
              <Label htmlFor="companyName">Nombre de la empresa</Label>
              <Input
                id="companyName"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Acme Tech"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email de trabajo</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
            />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? "Creando cuenta..." : "Crear cuenta gratis"}
          </Button>
          <p className="text-center text-[11px] text-muted-foreground leading-relaxed">
            Al continuar aceptas los{" "}
            <Link href="/terminos" className="underline hover:text-primary">
              términos
            </Link>{" "}
            y la{" "}
            <Link href="/privacidad" className="underline hover:text-primary">
              política de privacidad
            </Link>
            .
          </p>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-primary hover:underline"
          >
            Inicia sesión
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
