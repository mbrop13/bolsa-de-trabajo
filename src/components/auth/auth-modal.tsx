"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Building2,
  Eye,
  EyeOff,
  Loader2,
  UserRound,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/layout/logo";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { useAuthModal } from "./auth-modal-context";
import { GoogleIcon } from "./google-icon";

export function AuthModal() {
  const {
    open,
    mode,
    role,
    closeAuth,
    setMode,
    setRole,
  } = useAuthModal();
  const router = useRouter();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Reset form when mode/role changes or modal opens
  useEffect(() => {
    if (!open) return;
    setShowPassword(false);
    setLoading(false);
    setGoogleLoading(false);
  }, [open, mode, role]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAuth();
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => {
      const el = panelRef.current?.querySelector<HTMLElement>(
        "input, button:not([aria-label='Cerrar'])"
      );
      el?.focus();
    }, 50);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open, closeAuth]);

  if (!open) return null;

  async function signInWithGoogle() {
    setGoogleLoading(true);
    try {
      if (!isSupabaseConfigured()) {
        toast.message("Google estará disponible pronto", {
          description:
            "La conexión con Google se configurará en el siguiente paso.",
        });
        return;
      }
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      if (error) throw error;
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "No se pudo conectar con Google"
      );
    } finally {
      setGoogleLoading(false);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "login") {
        if (!isSupabaseConfigured()) {
          const eLow = email.toLowerCase();
          if (eLow.includes("admin")) router.push("/admin");
          else if (
            eLow.includes("empresa") ||
            eLow.includes("company") ||
            eLow.includes("hr")
          )
            router.push("/empresa");
          else router.push("/app");
          toast.success("Sesión iniciada");
          closeAuth();
          return;
        }
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Bienvenido/a");
        closeAuth();
        router.push("/app");
        router.refresh();
        return;
      }

      // register
      if (!isSupabaseConfigured()) {
        toast.success(
          role === "company"
            ? "Empresa registrada. Completa tu perfil."
            : "Cuenta creada. Completa tu perfil profesional."
        );
        closeAuth();
        router.push(role === "company" ? "/empresa" : "/app");
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
        closeAuth();
        router.push(role === "company" ? "/empresa" : "/app");
      }
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : mode === "login"
            ? "Error al iniciar sesión"
            : "Error al registrarse"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4">
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm transition-opacity"
        aria-label="Cerrar"
        onClick={closeAuth}
      />

      {/* Card */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "relative z-10 flex w-full max-h-[min(92vh,760px)] flex-col overflow-hidden",
          "rounded-t-3xl border border-white/20 bg-white shadow-2xl shadow-slate-900/20",
          "sm:max-w-[440px] sm:rounded-3xl",
          "animate-fade-up"
        )}
      >
        {/* Top accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-primary via-sky-400 to-cyan-300" />

        <div className="relative overflow-y-auto overscroll-contain px-6 pb-7 pt-5 sm:px-8 sm:pb-8 sm:pt-6">
          {/* Close */}
          <button
            type="button"
            onClick={closeAuth}
            className="absolute right-4 top-4 z-10 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Brand */}
          <div className="mb-6 pr-8">
            <Logo showTagline />
            <h2
              id={titleId}
              className="mt-5 text-2xl font-bold tracking-tight text-slate-900"
            >
              {mode === "login" ? "Bienvenido de nuevo" : "Crea tu cuenta"}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
              {mode === "login"
                ? "Inicia sesión para postular, gestionar vacantes o chatear."
                : "Únete a Reclu en minutos. Gratis en el lanzamiento."}
            </p>
          </div>

          {/* Mode tabs */}
          <div
            className="mb-5 grid grid-cols-2 rounded-2xl bg-slate-100 p-1"
            role="tablist"
            aria-label="Modo de acceso"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === "login"}
              onClick={() => setMode("login")}
              className={cn(
                "rounded-xl px-3 py-2.5 text-sm font-semibold transition-all",
                mode === "login"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              Iniciar sesión
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "register"}
              onClick={() => setMode("register")}
              className={cn(
                "rounded-xl px-3 py-2.5 text-sm font-semibold transition-all",
                mode === "register"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              Crear cuenta
            </button>
          </div>

          {/* Role picker (register only) */}
          {mode === "register" && (
            <div className="mb-5 grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setRole("candidate")}
                className={cn(
                  "flex flex-col items-start gap-2 rounded-2xl border p-3.5 text-left transition-all",
                  role === "candidate"
                    ? "border-primary/40 bg-primary-soft/60 shadow-sm shadow-primary/10 ring-1 ring-primary/20"
                    : "border-border bg-white hover:border-slate-300 hover:bg-slate-50"
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-xl",
                    role === "candidate"
                      ? "bg-primary text-white shadow-md shadow-primary/25"
                      : "bg-slate-100 text-slate-500"
                  )}
                >
                  <UserRound className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-slate-900">
                    Candidato
                  </span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-slate-500">
                    Busco empleo
                  </span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => setRole("company")}
                className={cn(
                  "flex flex-col items-start gap-2 rounded-2xl border p-3.5 text-left transition-all",
                  role === "company"
                    ? "border-primary/40 bg-primary-soft/60 shadow-sm shadow-primary/10 ring-1 ring-primary/20"
                    : "border-border bg-white hover:border-slate-300 hover:bg-slate-50"
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-xl",
                    role === "company"
                      ? "bg-primary text-white shadow-md shadow-primary/25"
                      : "bg-slate-100 text-slate-500"
                  )}
                >
                  <Building2 className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-slate-900">
                    Empresa
                  </span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-slate-500">
                    Quiero contratar
                  </span>
                </span>
              </button>
            </div>
          )}

          {/* Google */}
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="h-11 w-full rounded-xl border-slate-200 bg-white font-medium shadow-sm hover:bg-slate-50"
            disabled={googleLoading || loading}
            onClick={signInWithGoogle}
          >
            {googleLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <GoogleIcon className="h-5 w-5" />
            )}
            Continuar con Google
          </Button>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 font-medium uppercase tracking-wider text-slate-400">
                o con email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-3.5">
            {mode === "register" && (
              <>
                <div className="space-y-1.5">
                  <Label htmlFor="auth-name">
                    {role === "company" ? "Tu nombre" : "Nombre completo"}
                  </Label>
                  <Input
                    id="auth-name"
                    required
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="María García"
                    className="h-11 rounded-xl"
                  />
                </div>
                {role === "company" && (
                  <div className="space-y-1.5">
                    <Label htmlFor="auth-company">Nombre de la empresa</Label>
                    <Input
                      id="auth-company"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Nombre de tu empresa"
                      className="h-11 rounded-xl"
                    />
                  </div>
                )}
              </>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="auth-email">Email</Label>
              <Input
                id="auth-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="h-11 rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <Label htmlFor="auth-password">Contraseña</Label>
                {mode === "login" && (
                  <Link
                    href="/auth/recuperar"
                    onClick={closeAuth}
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Input
                  id="auth-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={
                    mode === "login" ? "current-password" : "new-password"
                  }
                  required
                  minLength={mode === "login" ? 6 : 8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={
                    mode === "login" ? "••••••••" : "Mínimo 8 caracteres"
                  }
                  className="h-11 rounded-xl pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="mt-1 h-11 w-full rounded-xl text-[15px] shadow-md shadow-primary/20"
              disabled={loading || googleLoading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {mode === "login" ? "Entrando..." : "Creando cuenta..."}
                </>
              ) : mode === "login" ? (
                "Entrar a Reclu"
              ) : (
                "Crear cuenta gratis"
              )}
            </Button>

            {mode === "register" && (
              <p className="pt-0.5 text-center text-[11px] leading-relaxed text-muted-foreground">
                Al continuar aceptas los{" "}
                <Link
                  href="/terminos"
                  onClick={closeAuth}
                  className="underline hover:text-primary"
                >
                  términos
                </Link>{" "}
                y la{" "}
                <Link
                  href="/privacidad"
                  onClick={closeAuth}
                  className="underline hover:text-primary"
                >
                  política de privacidad
                </Link>
                .
              </p>
            )}
          </form>

          <p className="mt-5 text-center text-sm text-slate-500">
            {mode === "login" ? (
              <>
                ¿No tienes cuenta?{" "}
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className="font-semibold text-primary hover:underline"
                >
                  Crear cuenta gratis
                </button>
              </>
            ) : (
              <>
                ¿Ya tienes cuenta?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="font-semibold text-primary hover:underline"
                >
                  Inicia sesión
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
