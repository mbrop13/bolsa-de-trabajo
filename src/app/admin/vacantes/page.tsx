"use client";

import { useState } from "react";
import Link from "next/link";
import { demoJobs, demoCompanies } from "@/lib/demo-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminVacantesPage() {
  const [jobs, setJobs] = useState(demoJobs);

  return (
    <div className="space-y-3 pb-20 lg:pb-0">
      {jobs.map((job) => {
        const company = demoCompanies.find((c) => c.id === job.company_id);
        return (
          <div
            key={job.id}
            className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-semibold">{job.title}</p>
              <p className="text-sm text-muted-foreground">{company?.name}</p>
              <div className="mt-1.5 flex gap-1.5">
                <Badge
                  variant={
                    job.status === "published" ? "success" : "secondary"
                  }
                >
                  {job.status}
                </Badge>
                {job.is_featured && <Badge>Featured</Badge>}
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={`/empleos/${job.slug}`}>
                <Button size="sm" variant="outline">
                  Ver
                </Button>
              </Link>
              {job.status === "published" && (
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => {
                    setJobs((prev) =>
                      prev.map((j) =>
                        j.id === job.id ? { ...j, status: "archived" } : j
                      )
                    );
                    toast.message("Vacante archivada");
                  }}
                >
                  Archivar
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
