import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import {
  Briefcase,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

/** Mock visual del producto — pure CSS, sin assets externos */
export function HeroShowcase() {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      {/* glow */}
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-primary/20 via-sky-100/50 to-transparent blur-2xl" />

      <div className="relative space-y-4">
        {/* Job card mock */}
        <div className="rounded-2xl border border-border/80 bg-white p-5 shadow-xl shadow-slate-200/60 ring-1 ring-slate-900/5">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-sky-500 text-sm font-bold text-white shadow-md shadow-primary/30">
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
              <p className="text-sm text-muted-foreground">Nubix Labs · Remoto LATAM</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                <Badge variant="secondary">Semi Senior</Badge>
                <Badge variant="outline">Remoto</Badge>
                <Badge variant="outline">React</Badge>
              </div>
              <p className="mt-3 text-sm font-semibold text-primary">
                USD 2.200 – 3.200 / mes
              </p>
            </div>
          </div>
        </div>

        {/* Profile + chat row */}
        <div className="grid gap-4 sm:grid-cols-5">
          <div className="rounded-2xl border border-border/80 bg-white p-4 shadow-lg shadow-slate-200/50 sm:col-span-2">
            <div className="flex items-center gap-3">
              <Avatar name="Ana Martínez" size="lg" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Ana M.</p>
                <p className="text-xs text-muted-foreground">Full Stack · ProgramBI</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              <Badge variant="default" className="text-[10px]">
                <ShieldCheck className="mr-0.5 h-3 w-3" />
                ProgramBI
              </Badge>
              <Badge variant="secondary" className="text-[10px]">
                React
              </Badge>
              <Badge variant="secondary" className="text-[10px]">
                Node
              </Badge>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[82%] rounded-full bg-primary" />
            </div>
            <p className="mt-1.5 text-[10px] text-muted-foreground">
              Perfil 82% completo
            </p>
          </div>

          <div className="rounded-2xl border border-border/80 bg-white p-4 shadow-lg shadow-slate-200/50 sm:col-span-3">
            <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <MessageCircle className="h-3.5 w-3.5 text-primary" />
              Chat con reclutador
            </div>
            <div className="space-y-2">
              <div className="max-w-[90%] rounded-2xl rounded-bl-md bg-slate-100 px-3 py-2 text-xs text-slate-700">
                Hola Ana, nos gustó tu perfil. ¿Tienes 20 min esta semana?
              </div>
              <div className="ml-auto max-w-[90%] rounded-2xl rounded-br-md bg-primary px-3 py-2 text-xs text-white shadow-sm shadow-primary/25">
                ¡Claro! Estoy libre el jueves por la tarde.
              </div>
            </div>
          </div>
        </div>

        {/* Floating badge */}
        <div className="absolute -right-2 top-1/3 hidden rotate-3 rounded-xl border border-border bg-white px-3 py-2 shadow-lg sm:flex sm:items-center sm:gap-2">
          <Briefcase className="h-4 w-4 text-primary" />
          <div>
            <p className="text-[10px] font-medium text-muted-foreground">
              Postulación
            </p>
            <p className="text-xs font-semibold text-emerald-600">Enviada ✓</p>
          </div>
        </div>
        <div className="absolute -left-1 bottom-8 hidden -rotate-2 rounded-xl border border-border bg-white px-3 py-2 shadow-lg md:flex md:items-center md:gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <p className="text-xs font-semibold text-slate-700">Remoto LATAM</p>
        </div>
      </div>
    </div>
  );
}
