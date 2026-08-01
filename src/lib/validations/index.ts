import { z } from "zod";

export const applySchema = z.object({
  job_id: z.string().min(1),
  candidate_id: z.string().min(1),
  cover_message: z
    .string()
    .trim()
    .min(20, "Escribe al menos 20 caracteres")
    .max(2000, "Máximo 2000 caracteres"),
  resume_url: z.string().nullable().optional(),
});

export const createJobSchema = z
  .object({
    company_id: z.string().min(1),
    category_id: z.string().optional().nullable(),
    title: z.string().trim().min(3, "Título muy corto").max(120),
    description: z.string().trim().min(40, "Describe el rol con más detalle"),
    responsibilities: z.string().optional(),
    requirements: z.string().optional(),
    nice_to_have: z.string().optional(),
    seniority: z.string().min(1),
    job_type: z.string().min(1),
    modality: z.string().min(1),
    city: z.string().optional(),
    country: z.string().optional(),
    salary_min: z.number().nonnegative().nullable().optional(),
    salary_max: z.number().nonnegative().nullable().optional(),
    salary_currency: z.string().optional(),
    salary_period: z.enum(["month", "year"]).optional(),
    experience_years: z.number().int().nonnegative().nullable().optional(),
    status: z.enum(["draft", "published", "closed", "archived"]).optional(),
  })
  .refine(
    (d) =>
      d.salary_min == null ||
      d.salary_max == null ||
      d.salary_min <= d.salary_max,
    { message: "El salario mínimo no puede ser mayor que el máximo", path: ["salary_max"] }
  );

export const contactSchema = z.object({
  company_id: z.string().min(1),
  candidate_id: z.string().min(1),
  job_id: z.string().nullable().optional(),
  subject: z.string().trim().min(5, "Asunto muy corto").max(120),
  body: z.string().trim().min(30, "Mensaje muy corto").max(3000),
});

export const replyContactSchema = z.object({
  id: z.string().min(1),
  candidate_id: z.string().min(1),
  reply_body: z.string().trim().min(10, "Respuesta muy corta").max(3000),
});

export const profileBasicsSchema = z.object({
  full_name: z.string().trim().min(2).max(100),
  headline: z.string().trim().max(160).optional().or(z.literal("")),
  username: z
    .string()
    .trim()
    .min(3)
    .max(40)
    .regex(/^[a-z0-9-]+$/i, "Solo letras, números y guiones")
    .optional()
    .or(z.literal("")),
  about: z.string().max(3000).optional().or(z.literal("")),
  looking_for: z.string().max(1000).optional().or(z.literal("")),
  city: z.string().max(80).optional().or(z.literal("")),
  country: z.string().max(80).optional().or(z.literal("")),
  preferred_modality: z.string().optional(),
  availability: z.string().optional(),
  employment_status: z.string().optional(),
  start_availability: z.string().optional(),
  salary_min: z.number().nonnegative().nullable().optional(),
  salary_max: z.number().nonnegative().nullable().optional(),
  linkedin_url: z.string().url().optional().or(z.literal("")),
  github_url: z.string().url().optional().or(z.literal("")),
  portfolio_url: z.string().url().optional().or(z.literal("")),
  is_public: z.boolean().optional(),
  is_programbi_alumni: z.boolean().optional(),
});

export const experienceSchema = z.object({
  title: z.string().trim().min(2).max(120),
  company_name: z.string().trim().min(2).max(120),
  location: z.string().max(120).optional().or(z.literal("")),
  is_current: z.boolean().optional(),
  start_date: z.string().optional().or(z.literal("")),
  end_date: z.string().optional().or(z.literal("")),
  description: z.string().max(2000).optional().or(z.literal("")),
});

export type ApplyInput = z.infer<typeof applySchema>;
export type CreateJobInputZ = z.infer<typeof createJobSchema>;
export type ContactInputZ = z.infer<typeof contactSchema>;
