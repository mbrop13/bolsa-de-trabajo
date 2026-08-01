export const BRAND = {
  name: "Reclu",
  company: "ProgramBI",
  tagline: "La bolsa de trabajo de ProgramBI",
  primary: "#1890ff",
} as const;

export const ROLES = {
  candidate: "candidate",
  company: "company",
  admin: "admin",
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];

export const SENIORITY = [
  { value: "trainee", label: "Trainee / Prácticas" },
  { value: "junior", label: "Junior" },
  { value: "semi_senior", label: "Semi Senior" },
  { value: "senior", label: "Senior" },
  { value: "lead", label: "Lead / Staff" },
  { value: "manager", label: "Manager" },
] as const;

export const JOB_TYPES = [
  { value: "full_time", label: "Tiempo completo" },
  { value: "part_time", label: "Medio tiempo" },
  { value: "contract", label: "Contrato / Freelance" },
  { value: "internship", label: "Pasantía" },
] as const;

export const MODALITIES = [
  { value: "remote", label: "Remoto" },
  { value: "hybrid", label: "Híbrido" },
  { value: "onsite", label: "Presencial" },
] as const;

export const AVAILABILITY = [
  { value: "actively_looking", label: "Buscando activamente" },
  { value: "open", label: "Abierto a ofertas" },
  { value: "not_looking", label: "No disponible" },
  { value: "freelance_only", label: "Solo freelance" },
] as const;

export const EMPLOYMENT_STATUS = [
  { value: "employed", label: "Empleado/a" },
  { value: "student", label: "Estudiante" },
  { value: "freelance", label: "Freelance" },
  { value: "unemployed", label: "En búsqueda" },
  { value: "bootcamp", label: "En bootcamp / formación" },
] as const;

export const START_AVAILABILITY = [
  { value: "immediate", label: "Inmediata" },
  { value: "two_weeks", label: "En 2 semanas" },
  { value: "one_month", label: "En 1 mes" },
  { value: "more", label: "Más de 1 mes" },
] as const;

export const COMPANY_SIZES = [
  { value: "1-10", label: "1–10 personas" },
  { value: "11-50", label: "11–50 personas" },
  { value: "51-200", label: "51–200 personas" },
  { value: "201-1000", label: "201–1000 personas" },
  { value: "1000+", label: "Más de 1000" },
] as const;

export const COMPANY_STATUS = [
  { value: "pending", label: "Pendiente" },
  { value: "approved", label: "Aprobada" },
  { value: "rejected", label: "Rechazada" },
  { value: "suspended", label: "Suspendida" },
] as const;

export const APPLICATION_STATUS = [
  { value: "submitted", label: "Enviada", color: "blue" },
  { value: "in_review", label: "En revisión", color: "amber" },
  { value: "interview", label: "Entrevista", color: "violet" },
  { value: "rejected", label: "Rechazada", color: "red" },
  { value: "hired", label: "Contratado/a", color: "green" },
  { value: "withdrawn", label: "Retirada", color: "slate" },
] as const;

export const SKILL_LEVELS = [
  { value: "basic", label: "Básico" },
  { value: "intermediate", label: "Intermedio" },
  { value: "advanced", label: "Avanzado" },
  { value: "expert", label: "Experto" },
] as const;

export const LANGUAGE_LEVELS = [
  { value: "basic", label: "Básico" },
  { value: "conversational", label: "Conversacional" },
  { value: "professional", label: "Profesional" },
  { value: "native", label: "Nativo" },
] as const;

export const CATEGORIES = [
  { slug: "programacion", name: "Programación", icon: "Code2" },
  { slug: "data-analytics", name: "Data & Analytics", icon: "BarChart3" },
  { slug: "diseno-ux", name: "Diseño / UX", icon: "Palette" },
  { slug: "devops-cloud", name: "DevOps / Cloud", icon: "Cloud" },
  { slug: "qa-testing", name: "QA / Testing", icon: "Bug" },
  { slug: "producto", name: "Producto & Agile", icon: "Layers" },
  { slug: "mobile", name: "Mobile", icon: "Smartphone" },
  { slug: "ia-ml", name: "IA & Machine Learning", icon: "Sparkles" },
  { slug: "marketing-tech", name: "Marketing Tech", icon: "Megaphone" },
  { slug: "soporte", name: "Soporte & Customer Success", icon: "Headphones" },
] as const;

export const DEFAULT_SKILLS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "SQL",
  "PostgreSQL",
  "MongoDB",
  "AWS",
  "Docker",
  "Git",
  "Tailwind CSS",
  "Vue.js",
  "Angular",
  "Java",
  "C#",
  ".NET",
  "PHP",
  "Laravel",
  "Go",
  "Rust",
  "Kubernetes",
  "Figma",
  "Power BI",
  "Excel",
  "Machine Learning",
  "TensorFlow",
  "GraphQL",
  "Redis",
  "Linux",
  "CI/CD",
  "Scrum",
  "React Native",
  "Flutter",
  "Swift",
  "Kotlin",
  "Azure",
  "GCP",
  "Supabase",
];

export function labelOf(
  list: readonly { value: string; label: string }[],
  value?: string | null
) {
  return list.find((i) => i.value === value)?.label ?? value ?? "—";
}
