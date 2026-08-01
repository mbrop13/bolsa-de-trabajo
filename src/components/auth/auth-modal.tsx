"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  Building2,
  Eye,
  EyeOff,
  Loader2,
  Shield,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Logo } from "@/components/layout/logo";
import { COMPANY_SIZES } from "@/lib/constants";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { useRecluStoreOptional } from "@/lib/store/reclu-store";
import { cn } from "@/lib/utils";
import { useAuthModal } from "./auth-modal-context";
import { GoogleIcon } from "./google-icon";

export function AuthModal() {
  const { open, mode, closeAuth, setMode } = useAuthModal();
  const router = useRouter();
  const store = useRecluStoreOptional();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Candidate / login
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Company extras
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("11-50");
  const [website, setWebsite] = useState("");
  const [headquarters, setHeadquarters] = useState("");
  const [description, setDescription] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  useEffect(() => {
    if (!open) return;
    setShowPassword(false);
    setLoading(false);
    setGoogleLoading(false);
  }, [open, mode]);

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
        "input, select, textarea, button:not([aria-label='Cerrar'])"
      );
      el?.focus();
    }, 40);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open, closeAuth, mode]);

  if (!open) return null;

  const isCompany = mode === "company";
  const isLogin = mode === "login";
  const isRegister = mode === "register";

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
      if (isLogin) {
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

      if (isRegister) {
        if (!isSupabaseConfigured()) {
          toast.success("Cuenta creada. Completa tu perfil profesional.");
          closeAuth();
          router.push("/app");
          return;
        }
        const supabase = createClient();
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName, role: "candidate" },
          },
        });
        if (error) throw error;
        if (data.user) {
          toast.success("Cuenta creada. Revisa tu email si pide confirmación.");
          closeAuth();
          router.push("/app");
        }
        return;
      }

      // company register (local store → pending + sesión limitada)
      if (store?.ready) {
        const result = store.registerCompany({
          name: companyName,
          contact_name: fullName,
          email,
          industry: industry || null,
          company_size: companySize || null,
          website: website || null,
          headquarters: headquarters || null,
          description: description || null,
          contact_email: contactEmail || email,
        });
        if (!result.ok) {
          toast.error(result.error);
          return;
        }
      }

      if (isSupabaseConfigured()) {
        const supabase = createClient();
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role: "company",
              company_name: companyName,
              industry,
              company_size: companySize,
              website,
              headquarters,
              description,
              contact_email: contactEmail || email,
            },
          },
        });
        if (error) throw error;
      }

      toast.success("Empresa registrada", {
        description:
          "Tu cuenta está pendiente de aprobación. Puedes explorar el panel con acceso limitado.",
      });
      closeAuth();
      router.push("/empresa");
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : isLogin
            ? "Error al iniciar sesión"
            : "Error al registrarse"
      );
    } finally {
      setLoading(false);
    }
  }

  const title = isLogin
    ? "Iniciar sesión"
    : isCompany
      ? "Registrar empresa"
      : "Crear cuenta";

  const subtitle = isLogin
    ? "Accede a tu cuenta de Reclu"
    : isCompany
      ? "Completa los datos de tu empresa. Un admin revisará y aprobará tu cuenta."
      : "Crea tu perfil y empieza a postular";

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-5">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[3px]"
        aria-label="Cerrar"
        onClick={closeAuth}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "relative z-10 flex w-full max-h-[min(92vh,820px)] flex-col overflow-hidden",
          "rounded-t-2xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-900/15",
          "sm:rounded-2xl",
          isCompany ? "sm:max-w-[720px]" : "sm:max-w-[560px]",
          "animate-fade-up"
        )}
      >
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-100 px-6 py-5 sm:px-8">
          <div className="min-w-0">
            <Logo showTagline className="mb-4" />
            <div className="flex items-center gap-2">
              {isCompany && (
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Volver"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
              )}
              <div>
                <h2
                  id={titleId}
                  className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl"
                >
                  {title}
                </h2>
                <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={closeAuth}
            className="shrink-0 rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6 sm:px-8">
          {/* Tabs — solo login / register candidato */}
          {!isCompany && (
            <div
              className="mb-6 grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1"
              role="tablist"
            >
              <button
                type="button"
                role="tab"
                aria-selected={isLogin}
                onClick={() => setMode("login")}
                className={cn(
                  "rounded-lg py-2.5 text-sm font-semibold transition",
                  isLogin
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                Iniciar sesión
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={isRegister}
                onClick={() => setMode("register")}
                className={cn(
                  "rounded-lg py-2.5 text-sm font-semibold transition",
                  isRegister
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                Crear cuenta
              </button>
            </div>
          )}

          {isCompany && (
            <div className="mb-6 flex gap-3 rounded-xl border border-amber-200/80 bg-amber-50/80 px-4 py-3 text-sm text-amber-950">
              <Shield className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
              <p className="leading-relaxed">
                Tras registrarte tendrás acceso limitado al panel.{" "}
                <strong className="font-semibold">
                  Publicar vacantes y contactar talento
                </strong>{" "}
                se habilita cuando un admin apruebe tu empresa.
              </p>
            </div>
          )}

          {/* Form first */}
          <form onSubmit={onSubmit} className="space-y-4">
            {isCompany ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5 sm:col-span-1">
                  <Label htmlFor="co-contact">Tu nombre</Label>
                  <Input
                    id="co-contact"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nombre del responsable"
                    className="h-11"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="co-name">Nombre de la empresa</Label>
                  <Input
                    id="co-name"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Ej. Andes Digital"
                    className="h-11"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="co-email">Email de acceso</Label>
                  <Input
                    id="co-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rrhh@empresa.com"
                    className="h-11"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="co-pass">Contraseña</Label>
                  <div className="relative">
                    <Input
                      id="co-pass"
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={8}
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mínimo 8 caracteres"
                      className="h-11 pr-11"
                    />
                    <PasswordToggle
                      show={showPassword}
                      onToggle={() => setShowPassword((v) => !v)}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="co-industry">Industria / sector</Label>
                  <Input
                    id="co-industry"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="Ej. Tecnología, Retail, Educación…"
                    className="h-11"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="co-size">Tamaño de la empresa</Label>
                  <Select
                    id="co-size"
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value)}
                    className="h-11"
                  >
                    {COMPANY_SIZES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="co-web">Sitio web</Label>
                  <Input
                    id="co-web"
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://"
                    className="h-11"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="co-hq">Sede / ciudad</Label>
                  <Input
                    id="co-hq"
                    value={headquarters}
                    onChange={(e) => setHeadquarters(e.target.value)}
                    placeholder="Ciudad, país"
                    className="h-11"
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="co-contact-email">
                    Email de contacto (opcional)
                  </Label>
                  <Input
                    id="co-contact-email"
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="Si es distinto al de acceso"
                    className="h-11"
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="co-desc">Sobre la empresa</Label>
                  <Textarea
                    id="co-desc"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Cuéntanos a qué se dedica, cultura y qué perfiles suelen buscar…"
                    className="min-h-[100px] resize-y"
                    rows={4}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {isRegister && (
                  <div className="space-y-1.5">
                    <Label htmlFor="auth-name">Nombre completo</Label>
                    <Input
                      id="auth-name"
                      required
                      autoComplete="name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="María García"
                      className="h-11"
                    />
                  </div>
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
                    className="h-11"
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <Label htmlFor="auth-password">Contraseña</Label>
                    {isLogin && (
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
                        isLogin ? "current-password" : "new-password"
                      }
                      required
                      minLength={isLogin ? 6 : 8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={
                        isLogin ? "••••••••" : "Mínimo 8 caracteres"
                      }
                      className="h-11 pr-11"
                    />
                    <PasswordToggle
                      show={showPassword}
                      onToggle={() => setShowPassword((v) => !v)}
                    />
                  </div>
                </div>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="h-11 w-full text-[15px]"
              disabled={loading || googleLoading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {isLogin
                    ? "Entrando..."
                    : isCompany
                      ? "Enviando solicitud..."
                      : "Creando cuenta..."}
                </>
              ) : isLogin ? (
                "Entrar"
              ) : isCompany ? (
                <>
                  <Building2 className="h-4 w-4" />
                  Solicitar acceso empresa
                </>
              ) : (
                "Crear cuenta gratis"
              )}
            </Button>

            {(isRegister || isCompany) && (
              <p className="text-center text-[11px] leading-relaxed text-slate-400">
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
                  privacidad
                </Link>
                .
              </p>
            )}
          </form>

          {/* Google below form — not for company form (optional keep for login/register only) */}
          {!isCompany && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-slate-400">
                    o continúa con
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-11 w-full border-slate-200 font-medium"
                disabled={googleLoading || loading}
                onClick={signInWithGoogle}
              >
                {googleLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <GoogleIcon className="h-5 w-5" />
                )}
                Google
              </Button>
            </>
          )}

          {/* Footer links */}
          <div className="mt-6 space-y-3 text-center text-sm text-slate-500">
            {isLogin && (
              <p>
                ¿No tienes cuenta?{" "}
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className="font-semibold text-primary hover:underline"
                >
                  Crear cuenta gratis
                </button>
              </p>
            )}
            {isRegister && (
              <p>
                ¿Ya tienes cuenta?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="font-semibold text-primary hover:underline"
                >
                  Inicia sesión
                </button>
              </p>
            )}
            {isCompany && (
              <p>
                ¿Ya tienes cuenta?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="font-semibold text-primary hover:underline"
                >
                  Inicia sesión
                </button>
              </p>
            )}

            {/* Subtle company CTA */}
            {!isCompany && (
              <p className="pt-1 text-xs text-slate-400">
                ¿Quieres contratar?{" "}
                <button
                  type="button"
                  onClick={() => setMode("company")}
                  className="font-medium text-slate-600 underline decoration-slate-300 underline-offset-2 transition hover:text-primary hover:decoration-primary"
                >
                  Registrarme como empresa
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PasswordToggle({
  show,
  onToggle,
}: {
  show: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
      aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
    >
      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  );
}
