import type { MetadataRoute } from "next";
import { demoJobs, demoCompanies, demoCandidates } from "@/lib/demo-data";

const base = process.env.NEXT_PUBLIC_APP_URL || "https://reclu.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/empleos",
    "/empresas",
    "/precios",
    "/faq",
    "/sobre-nosotros",
    "/privacidad",
    "/terminos",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const jobs = demoJobs
    .filter((j) => j.status === "published")
    .map((j) => ({
      url: `${base}/empleos/${j.slug}`,
      lastModified: new Date(j.updated_at),
      changeFrequency: "daily" as const,
      priority: 0.9,
    }));

  const companies = demoCompanies
    .filter((c) => c.status === "approved")
    .map((c) => ({
      url: `${base}/empresas/${c.slug}`,
      lastModified: new Date(c.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  const talent = demoCandidates
    .filter((c) => c.is_public && c.username)
    .map((c) => ({
      url: `${base}/talento/${c.username}`,
      lastModified: new Date(c.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

  return [...staticRoutes, ...jobs, ...companies, ...talent];
}
