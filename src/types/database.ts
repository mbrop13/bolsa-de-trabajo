import type { UserRole } from "@/lib/constants";

export type CompanyStatus = "pending" | "approved" | "rejected" | "suspended";
export type JobStatus = "draft" | "published" | "closed" | "archived";
export type ApplicationStatus =
  | "submitted"
  | "in_review"
  | "interview"
  | "rejected"
  | "hired"
  | "withdrawn";
export type ContactStatus =
  | "sent"
  | "read"
  | "replied"
  | "archived"
  | "declined";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CandidateProfile {
  id: string;
  user_id: string;
  username: string | null;
  headline: string | null;
  about: string | null;
  looking_for: string | null;
  city: string | null;
  country: string | null;
  open_to_relocate: boolean;
  preferred_modality: string | null;
  availability: string | null;
  employment_status: string | null;
  start_availability: string | null;
  job_types: string[] | null;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string;
  salary_public: boolean;
  linkedin_url: string | null;
  github_url: string | null;
  portfolio_url: string | null;
  website_url: string | null;
  resume_url: string | null;
  banner_url: string | null;
  is_public: boolean;
  is_programbi_alumni: boolean;
  created_at: string;
  updated_at: string;
  profiles?: Profile;
  experiences?: CandidateExperience[];
  education?: CandidateEducation[];
  skills?: CandidateSkill[];
  projects?: CandidateProject[];
  certifications?: CandidateCertification[];
  languages?: CandidateLanguage[];
}

export interface CandidateExperience {
  id: string;
  candidate_id: string;
  title: string;
  company_name: string;
  location: string | null;
  is_current: boolean;
  start_date: string | null;
  end_date: string | null;
  description: string | null;
  sort_order: number;
}

export interface CandidateEducation {
  id: string;
  candidate_id: string;
  institution: string;
  degree: string | null;
  field: string | null;
  start_date: string | null;
  end_date: string | null;
  is_programbi: boolean;
  description: string | null;
  sort_order: number;
}

export interface Skill {
  id: string;
  name: string;
  slug: string;
}

export interface CandidateSkill {
  id: string;
  candidate_id: string;
  skill_id: string;
  level: string;
  is_featured: boolean;
  skills?: Skill;
}

export interface CandidateProject {
  id: string;
  candidate_id: string;
  name: string;
  description: string | null;
  url: string | null;
  repo_url: string | null;
  tech_stack: string[] | null;
  sort_order: number;
}

export interface CandidateCertification {
  id: string;
  candidate_id: string;
  name: string;
  issuer: string | null;
  issue_date: string | null;
  credential_url: string | null;
}

export interface CandidateLanguage {
  id: string;
  candidate_id: string;
  language: string;
  level: string;
}

export interface Company {
  id: string;
  owner_id: string;
  name: string;
  legal_name: string | null;
  slug: string;
  tagline: string | null;
  description: string | null;
  logo_url: string | null;
  cover_url: string | null;
  industry: string | null;
  company_size: string | null;
  founded_year: number | null;
  headquarters: string | null;
  countries: string[] | null;
  website: string | null;
  linkedin_url: string | null;
  tech_stack: string[] | null;
  benefits: string[] | null;
  contact_email: string | null;
  status: CompanyStatus;
  rejection_reason: string | null;
  admin_notes: string | null;
  is_featured: boolean;
  reviewed_at: string | null;
  reviewed_by: string | null;
  created_at: string;
  updated_at: string;
  jobs?: Job[];
  jobs_count?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Job {
  id: string;
  company_id: string;
  category_id: string | null;
  title: string;
  slug: string;
  description: string;
  responsibilities: string | null;
  requirements: string | null;
  nice_to_have: string | null;
  seniority: string;
  job_type: string;
  modality: string;
  city: string | null;
  country: string | null;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string;
  salary_period: "month" | "year";
  experience_years: number | null;
  status: JobStatus;
  is_featured: boolean;
  published_at: string | null;
  closes_at: string | null;
  created_at: string;
  updated_at: string;
  companies?: Company;
  categories?: Category;
  job_skills?: { skill_id: string; skills?: Skill }[];
  applications_count?: number;
}

export interface Application {
  id: string;
  job_id: string;
  candidate_id: string;
  cover_message: string | null;
  resume_url: string | null;
  status: ApplicationStatus;
  company_notes: string | null;
  created_at: string;
  updated_at: string;
  jobs?: Job;
  candidate_profiles?: CandidateProfile;
}

export interface SavedJob {
  id: string;
  user_id: string;
  job_id: string;
  created_at: string;
  jobs?: Job;
}

/** Contacto / mensaje empresa → candidato (legacy 1 respuesta; preferir ChatThread) */
export interface ContactMessage {
  id: string;
  company_id: string;
  candidate_id: string;
  job_id: string | null;
  subject: string;
  body: string;
  status: ContactStatus;
  reply_body: string | null;
  replied_at: string | null;
  created_at: string;
  updated_at: string;
  companies?: Company;
  candidate_profiles?: CandidateProfile;
  jobs?: Job | null;
}

export type ChatSenderRole = "company" | "candidate" | "system";

/** Conversación continua empresa ↔ candidato */
export interface ChatThread {
  id: string;
  company_id: string;
  candidate_id: string;
  job_id: string | null;
  subject: string;
  last_message_at: string;
  last_message_preview: string | null;
  company_unread: number;
  candidate_unread: number;
  archived_by_company: boolean;
  archived_by_candidate: boolean;
  created_at: string;
  updated_at: string;
  companies?: Company;
  candidate_profiles?: CandidateProfile;
  jobs?: Job | null;
}

export interface ChatMessage {
  id: string;
  thread_id: string;
  sender_role: ChatSenderRole;
  /** user id o company owner id opcional */
  sender_id: string | null;
  body: string;
  created_at: string;
  read_at: string | null;
}

export interface CreateJobInput {
  company_id: string;
  category_id?: string | null;
  title: string;
  description: string;
  responsibilities?: string;
  requirements?: string;
  nice_to_have?: string;
  seniority: string;
  job_type: string;
  modality: string;
  city?: string;
  country?: string;
  salary_min?: number | null;
  salary_max?: number | null;
  salary_currency?: string;
  salary_period?: "month" | "year";
  experience_years?: number | null;
  status?: JobStatus;
  is_featured?: boolean;
}

export interface ApplyToJobInput {
  job_id: string;
  candidate_id: string;
  cover_message?: string;
  resume_url?: string | null;
}

export interface ContactCandidateInput {
  company_id: string;
  candidate_id: string;
  job_id?: string | null;
  subject: string;
  body: string;
}
