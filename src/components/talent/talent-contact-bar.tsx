"use client";

import { ContactCandidateButton } from "@/components/contact/contact-candidate-dialog";
import type { CandidateProfile } from "@/types/database";

export function TalentContactBar({ candidate }: { candidate: CandidateProfile }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
      <p className="w-full text-sm text-muted-foreground">
        ¿Eres una empresa? Contacta a este talento desde Reclu (requiere empresa
        aprobada).
      </p>
      <ContactCandidateButton candidate={candidate} size="default" />
    </div>
  );
}
