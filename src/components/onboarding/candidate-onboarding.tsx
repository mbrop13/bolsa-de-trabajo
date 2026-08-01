"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { DEMO_SESSION, useRecluStore } from "@/lib/store/reclu-store";
import { Briefcase, Sparkles, User } from "lucide-react";

const KEY = "candidate-v1";

export function CandidateOnboarding() {
  const store = useRecluStore();
  const done = store.isOnboardingDone(KEY);
  const [step, setStep] = useState(0);

  if (!store.ready || done) return null;

  const steps = [
    {
      icon: Sparkles,
      title: "Bienvenido a Reclu",
      body: "Tu perfil profesional es tu carta de presentación ante empresas en Reclu.",
    },
    {
      icon: User,
      title: "Completa tu perfil",
      body: "Headline, experiencia, skills y educación. Los perfiles completos reciben más respuestas.",
    },
    {
      icon: Briefcase,
      title: "Postula y recibe contactos",
      body: "Aplica a vacantes en un clic y responde mensajes de empresas aprobadas en tu bandeja.",
    },
  ];

  const current = steps[step];
  const Icon = current.icon;

  return (
    <Dialog
      open
      onClose={() => store.completeOnboarding(KEY)}
      title={current.title}
      description={`Paso ${step + 1} de ${steps.length}`}
    >
      <div className="space-y-5 py-2 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary">
          <Icon className="h-7 w-7" />
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {current.body}
        </p>
        <div className="flex justify-center gap-1.5">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-6 rounded-full ${
                i === step ? "bg-primary" : "bg-slate-200"
              }`}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          {step < steps.length - 1 ? (
            <Button onClick={() => setStep((s) => s + 1)}>Continuar</Button>
          ) : (
            <>
              <Link href="/app/perfil">
                <Button onClick={() => store.completeOnboarding(KEY)}>
                  Completar perfil
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => store.completeOnboarding(KEY)}
              >
                Explorar después
              </Button>
            </>
          )}
        </div>
        <button
          type="button"
          className="text-xs text-muted-foreground hover:text-primary"
          onClick={() => store.completeOnboarding(KEY)}
        >
          Saltar por ahora
        </button>
      </div>
    </Dialog>
  );
}
