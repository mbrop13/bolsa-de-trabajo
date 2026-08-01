"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ApplyDialog } from "./apply-dialog";
import { DEMO_SESSION, useRecluStore } from "@/lib/store/reclu-store";
import type { Job } from "@/types/database";
import { Bookmark, BookmarkCheck, Send } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function JobApplyButton({
  job,
  size = "lg",
  className,
}: {
  job: Job;
  size?: "default" | "sm" | "lg";
  className?: string;
}) {
  const store = useRecluStore();
  const [open, setOpen] = useState(false);
  const applied = store.hasApplied(job.id, DEMO_SESSION.candidateId);
  const closed = job.status !== "published";

  return (
    <>
      <Button
        size={size}
        className={cn("w-full", className)}
        disabled={closed}
        onClick={() => setOpen(true)}
        variant={applied ? "secondary" : "default"}
      >
        <Send className="h-4 w-4" />
        {closed
          ? "Vacante cerrada"
          : applied
            ? "Ya postulaste"
            : "Postularme"}
      </Button>
      <ApplyDialog job={job} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export function JobSaveButton({
  jobId,
  className,
}: {
  jobId: string;
  className?: string;
}) {
  const store = useRecluStore();
  const userId = DEMO_SESSION.candidateUserId;
  const saved = store.isJobSaved(userId, jobId);

  return (
    <Button
      type="button"
      variant="outline"
      className={cn("flex-1", className)}
      onClick={() => {
        const res = store.toggleSaveJob(userId, jobId);
        toast.success(
          res.saved ? "Vacante guardada" : "Eliminada de guardados"
        );
      }}
    >
      {saved ? (
        <BookmarkCheck className="h-4 w-4 text-primary" />
      ) : (
        <Bookmark className="h-4 w-4" />
      )}
      {saved ? "Guardada" : "Guardar"}
    </Button>
  );
}
