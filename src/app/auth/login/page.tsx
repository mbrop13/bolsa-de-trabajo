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
import { showDevChrome } from "@/lib/config";
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
      if (!isSupabaseConfigured()) {
        // Sesión local: redirige según el email sin UI de "demo"
        const e = email.toLowerCase();
        if (e.includes("admin")) router.push("/admin");
        else if (e.includes("empresa") || e.includes("company") || e.includes("hr"))
          router.push("/empresa");
        else router.push("/app");
        toast.success("Sesión iniciada");
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
      toast.error(
        err instanceof Error ? err.message : "Error al iniciar sesión"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-border/80 shadow-lg shadow-slate-200/50">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-2xl tracking-tight">Iniciar sesión</CardTitle>
        <CardDescription>
          Accede a tu cuenta de candidato o empresa en Reclu
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
                className="text-xs font-medium text-primary hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? "Entrando..." : "Entrar a Reclu"}
          </Button>
        </form>

        {showDevChrome() && (
          <div className="mt-6 rounded-xl border border-dashed border-amber-300 bg-amber-50/80 p-4">
            <p className="text-xs font-semibold text-amber-900">
              Solo desarrollo
            </p>
            <div className="mt-3 grid gap-2">
              <Link href="/app">
                <Button variant="outline" size="sm" className="w-full">
                  Candidato
                </Button>
              </Link>
              <Link href="/empresa">
                <Button variant="outline" size="sm" className="w-full">
                  Empresa
                </Button>
              </Link>
              <Link href="/admin">
                <Button variant="outline" size="sm" className="w-full">
                  Admin
                </Button>
              </Link>
            </div>
          </div>
        )}

        <p className="mt-6 text-center text-sm text-muted-foreground">
          ¿No tienes cuenta?{" "}
          <Link
            href="/auth/registro"
            className="font-medium text-primary hover:underline"
          >
            Crear cuenta gratis
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
