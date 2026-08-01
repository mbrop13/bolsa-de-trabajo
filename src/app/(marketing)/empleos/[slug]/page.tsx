import { JobDetailClient } from "./job-detail-client";
import { demoJobs } from "@/lib/demo-data";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const job = demoJobs.find((j) => j.slug === slug);
  if (!job) return { title: "Empleo" };
  return {
    title: job.title,
    description: job.description.slice(0, 160),
  };
}

export default async function JobDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  return <JobDetailClient slug={slug} />;
}
