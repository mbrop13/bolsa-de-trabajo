import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSalary(
  min?: number | null,
  max?: number | null,
  currency = "USD",
  period: "month" | "year" = "month"
) {
  if (!min && !max) return "Salario a convenir";
  const fmt = (n: number) =>
    new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(n);
  const suffix = period === "month" ? "/mes" : "/año";
  if (min && max) return `${fmt(min)} – ${fmt(max)}${suffix}`;
  if (min) return `Desde ${fmt(min)}${suffix}`;
  return `Hasta ${fmt(max!)}${suffix}`;
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function relativeDate(date: string | Date) {
  const d = typeof date === "string" ? new Date(date) : date;
  const diff = Date.now() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Hoy";
  if (days === 1) return "Ayer";
  if (days < 7) return `Hace ${days} días`;
  if (days < 30) return `Hace ${Math.floor(days / 7)} sem.`;
  return d.toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" });
}

export function profileCompleteness(fields: Record<string, boolean>) {
  const values = Object.values(fields);
  if (!values.length) return 0;
  const done = values.filter(Boolean).length;
  return Math.round((done / values.length) * 100);
}
