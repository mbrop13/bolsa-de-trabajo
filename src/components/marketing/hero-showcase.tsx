import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  CheckCircle2,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

/** Mock visual del producto — pure CSS, sin assets externos */
export function HeroShowcase() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -inset-8 rounded-[2.5rem] bg-gradient-to-br from-primary/25 via-sky-100/40 to-transparent blur-3xl animate-pulse-soft" />
      <div className="pointer-events-none absolute -right-6 top-1/4 h-40 w-40 rounded-full bg-sky-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-4 bottom-1/4 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />

      <div className="relative space-y-3.5">
        {/* App chrome frame */}
        <div className="overflow-hidden rounded-[1.35rem] border border-slate-200/90 bg-white shadow-2xl shadow-slate-300/40 ring-1 ring-slate-900/[0.04]">
          {/* Window bar */}
          <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/90 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="ml-2 flex-1 truncate rounded-md bg-white px-3 py-1 text-center text-[10px] font-medium text-slate-400 ring-1 ring-slate-100">
              reclu.app/empleos
            </span>
          </div>

          <div className="space-y-3 p-4 sm:p-5">
            {/* Job card mock */}
            <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-white to-slate-50/80 p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-sky-500 text-sm font-bold text-white shadow-lg shadow-primary/30">
                  N
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-slate-900">
                      Full Stack Developer
                    </p>
                    <Badge variant="success" className="text-[10px]">
                      Nueva
                    </Badge>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Nubix Labs · Remoto
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    <Badge variant="secondary">Semi Senior</Badge>
                    <Badge variant="outline">Remoto</Badge>
                    <Badge variant="outline">React</Badge>
                    <Badge variant="outline">Node</Badge>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-primary">
                      USD 2.200 – 3.200 / mes
                    </p>
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm shadow-primary/25">
                      <Sparkles className="h-3 w-3" />
                      Postular
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile + chat row */}
            <div className="grid gap-3 sm:grid-cols-5">
              <div className="rounded-2xl border border-slate-100 bg-white p-3.5 shadow-sm sm:col-span-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-primary text-xs font-bold text-white shadow-md">
                    AM
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      Ana M.
                    </p>
                    <p className="truncate text-[11px] text-muted-foreground">
                      Full Stack · ProgramBI
                    </p>
                  </div>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-1">
                  <Badge variant="default" className="text-[10px]">
                    <ShieldCheck className="mr-0.5 h-3 w-3" />
                    ProgramBI
                  </Badge>
                  <Badge variant="secondary" className="text-[10px]">
                    React
                  </Badge>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-primary to-sky-400" />
                </div>
                <p className="mt-1.5 text-[10px] text-muted-foreground">
                  Perfil 82% completo
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-3.5 shadow-sm sm:col-span-3">
                <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <MessageCircle className="h-3.5 w-3.5 text-primary" />
                  Chat con reclutador
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </div>
                <div className="space-y-2">
                  <div className="max-w-[92%] rounded-2xl rounded-bl-md bg-slate-100 px-3 py-2 text-xs leading-relaxed text-slate-700">
                    Hola Ana, nos gustó tu perfil. ¿Tienes 20 min esta semana?
                  </div>
                  <div className="ml-auto max-w-[92%] rounded-2xl rounded-br-md bg-primary px-3 py-2 text-xs leading-relaxed text-white shadow-sm shadow-primary/25">
                    ¡Claro! Estoy libre el jueves por la tarde.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating badges */}
        <div className="absolute -right-1 top-[18%] z-10 hidden animate-float sm:flex sm:items-center sm:gap-2 sm:rounded-xl sm:border sm:border-slate-200/90 sm:bg-white sm:px-3 sm:py-2.5 sm:shadow-lg sm:shadow-slate-200/60 sm:ring-1 sm:ring-slate-900/[0.03]">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[10px] font-medium text-muted-foreground">
              Postulación
            </p>
            <p className="text-xs font-semibold text-emerald-600">Enviada ✓</p>
          </div>
        </div>

        <div className="absolute -left-2 bottom-16 z-10 hidden animate-float-delayed md:flex md:items-center md:gap-2 md:rounded-xl md:border md:border-slate-200/90 md:bg-white md:px-3 md:py-2.5 md:shadow-lg md:shadow-slate-200/60 md:ring-1 md:ring-slate-900/[0.03]">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-primary">
            <MapPin className="h-4 w-4" />
          </div>
          <p className="text-xs font-semibold text-slate-700">Remoto</p>
        </div>

        <div className="absolute -right-3 bottom-4 z-10 hidden animate-float lg:flex lg:items-center lg:gap-2 lg:rounded-xl lg:border lg:border-slate-200/90 lg:bg-white lg:px-3 lg:py-2.5 lg:shadow-lg lg:shadow-slate-200/60 lg:ring-1 lg:ring-slate-900/[0.03]">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
            <Briefcase className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[10px] font-medium text-muted-foreground">
              Match
            </p>
            <p className="text-xs font-semibold text-slate-800">Alta afinidad</p>
          </div>
        </div>
      </div>
    </div>
  );
}
