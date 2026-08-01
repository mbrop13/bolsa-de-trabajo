"use client";

import { AuthButton } from "@/components/auth/auth-button";
import {
  ArrowRight,
  Building2,
  Clock,
  Sparkles,
  UserRound,
} from "lucide-react";

export function EarlyAccessPanel({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <div
      className={
        compact
          ? "rounded-3xl border border-primary/15 bg-gradient-to-br from-primary-soft/80 via-white to-sky-50/60 p-6 sm:p-8"
          : "rounded-3xl border border-primary/15 bg-gradient-to-br from-primary-soft/80 via-white to-sky-50/60 p-8 sm:p-12"
      }
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/90 px-3 py-1 text-xs font-semibold text-primary shadow-sm">
        <Sparkles className="h-3.5 w-3.5" />
        Early access
      </div>

      <h2
        className={
          compact
            ? "mt-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl"
            : "mt-5 max-w-2xl text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
        }
      >
        Estamos abriendo la red: primero se registran personas y empresas
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
        Durante este periodo priorizamos construir perfiles y onboarding de
        empresas. Las vacantes públicas y las postulaciones se habilitarán en el
        lanzamiento completo.{" "}
        <strong className="font-semibold text-slate-800">
          Las empresas ya pueden explorar talento
        </strong>{" "}
        desde su panel (con la cuenta aprobada).
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          {
            icon: UserRound,
            t: "Candidatos",
            d: "Crea tu perfil profesional y prepárate para postular.",
          },
          {
            icon: Building2,
            t: "Empresas",
            d: "Regístrate, completa datos y busca talento en la red.",
          },
          {
            icon: Clock,
            t: "Próximo paso",
            d: "Apertura de vacantes y postulaciones en el lanzamiento.",
          },
        ].map((item) => (
          <li
            key={item.t}
            className="rounded-2xl border border-white/80 bg-white/90 p-4 shadow-sm"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <item.icon className="h-4 w-4" />
            </div>
            <p className="mt-3 text-sm font-semibold text-slate-900">{item.t}</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              {item.d}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <AuthButton
          mode="register"
          role="candidate"
          size="lg"
          className="shadow-md shadow-primary/20"
        >
          Crear mi perfil
          <ArrowRight className="h-4 w-4" />
        </AuthButton>
        <AuthButton
          mode="company"
          role="company"
          size="lg"
          variant="outline"
        >
          <Building2 className="h-4 w-4" />
          Registrar empresa
        </AuthButton>
      </div>
    </div>
  );
}
