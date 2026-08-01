"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DEMO_MODE } from "@/lib/demo-data";
import { isSupabaseConfigured, createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (!isSupabaseConfigured() || DEMO_MODE) {
        toast.message("Modo demo", {
          description: "Usa los accesos rápidos debajo o conecta Supabase.",
        });
        setLoading(false);
        return;
      }
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      toast.success("Bienvenido/a");
      router.push("/app");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Iniciar sesión</CardTitle>
        <CardDescription>
          Accede a tu cuenta de candidato, empresa o admin
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Contraseña</Label>
              <Link
                href="/auth/recuperar"
                className="text-xs text-primary hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        {(DEMO_MODE || !isSupabaseConfigured()) && (
          <div className="mt-6 rounded-xl border border-dashed border-primary/30 bg-primary-soft/50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Demo rápida
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Sin Supabase aún — explora los paneles con datos de ejemplo.
            </p>
            <div className="mt-3 grid gap-2">
              <Link href="/app">
                <Button variant="outline" size="sm" className="w-full">
                  Entrar como candidato
                </Button>
              </Link>
              <Link href="/empresa">
                <Button variant="outline" size="sm" className="w-full">
                  Entrar como empresa
                </Button>
              </Link>
              <Link href="/admin">
                <Button variant="outline" size="sm" className="w-full">
                  Entrar como admin
                </Button>
              </Link>
            </div>
          </div>
        )}

        <p className="mt-6 text-center text-sm text-muted-foreground">
          ¿No tienes cuenta?{" "}
          <Link href="/auth/registro" className="font-medium text-primary hover:underline">
            Regístrate
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
