import { redirect } from "next/navigation";
import { JobDetailClient } from "./job-detail-client";
import { demoJobs } from "@/lib/demo-data";
import { isEarlyAccess } from "@/lib/config";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  if (isEarlyAccess()) {
    return {
      title: "Empleos · Próximamente",
      description:
        "Las vacantes se habilitarán en el lanzamiento completo de Reclu.",
    };
  }
  const { slug } = await params;
  const job = demoJobs.find((j) => j.slug === slug);
  if (!job) return { title: "Empleo" };
  return {
    title: job.title,
    description: job.description.slice(0, 160),
  };
}

export default async function JobDetailPage({ params }: { params: Params }) {
  if (isEarlyAccess()) {
    redirect("/empleos");
  }
  const { slug } = await params;
  return <JobDetailClient slug={slug} />;
}
