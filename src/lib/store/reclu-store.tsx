"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  Application,
  ApplicationStatus,
  CandidateEducation,
  CandidateExperience,
  CandidateLanguage,
  CandidateProfile,
  CandidateProject,
  CandidateSkill,
  Company,
  CompanyStatus,
  ChatMessage,
  ChatSenderRole,
  ChatThread,
  ContactMessage,
  ContactStatus,
  CreateJobInput,
  Job,
  JobStatus,
  SavedJob,
} from "@/types/database";
import {
  demoApplications,
  demoCandidates,
  demoCategories,
  demoCompanies,
  demoJobs,
} from "@/lib/demo-data";
import { slugify } from "@/lib/utils";
import { applySchema, contactSchema, createJobSchema } from "@/lib/validations";
import {
  attachThreads,
  sortMessages,
  sortThreads,
} from "@/lib/store/chat-helpers";

const STORAGE_KEY = "reclu-production-store-v3";

export const DEMO_SESSION = {
  candidateId: "cand-1",
  candidateUserId: "u-candidate-1",
  companyId: "co-1",
  companyOwnerId: "u-company-1",
  adminId: "u-admin",
} as const;

export interface RecluState {
  companies: Company[];
  candidates: CandidateProfile[];
  jobs: Job[];
  applications: Application[];
  savedJobs: SavedJob[];
  contacts: ContactMessage[];
  threads: ChatThread[];
  messages: ChatMessage[];
  onboardingDone: Record<string, boolean>;
  /** Empresa de la sesión actual (tras registro local) */
  activeCompanyId: string | null;
  version: number;
}

function attachJobRelations(jobs: Job[], companies: Company[]): Job[] {
  return jobs.map((j) => ({
    ...j,
    companies: companies.find((c) => c.id === j.company_id),
    categories: demoCategories.find((c) => c.id === j.category_id),
  }));
}

function attachApplicationRelations(
  apps: Application[],
  jobs: Job[],
  companies: Company[],
  candidates: CandidateProfile[]
): Application[] {
  const jobsWithCo = attachJobRelations(jobs, companies);
  return apps.map((a) => ({
    ...a,
    jobs: jobsWithCo.find((j) => j.id === a.job_id),
    candidate_profiles: candidates.find((c) => c.id === a.candidate_id),
  }));
}

function attachContactRelations(
  contacts: ContactMessage[],
  companies: Company[],
  jobs: Job[],
  candidates: CandidateProfile[]
): ContactMessage[] {
  return contacts.map((m) => ({
    ...m,
    companies: companies.find((c) => c.id === m.company_id),
    candidate_profiles: candidates.find((c) => c.id === m.candidate_id),
    jobs: m.job_id ? jobs.find((j) => j.id === m.job_id) || null : null,
  }));
}

function createSeedState(): RecluState {
  const companies = structuredClone(demoCompanies);
  const candidates = structuredClone(demoCandidates);
  const jobs = attachJobRelations(structuredClone(demoJobs), companies);
  const applications = attachApplicationRelations(
    structuredClone(demoApplications),
    jobs,
    companies,
    candidates
  );
  const seedThreadAt = new Date(Date.now() - 86400000).toISOString();
  const seedReplyAt = new Date(Date.now() - 3600000 * 20).toISOString();
  const seedThreadId = "thread-seed-1";
  const seedMsg1 =
    "Hola Carlos, vimos tu perfil y el badge ProgramBI. ¿Te interesaría una conversación sobre nuestra vacante de Data Analyst Junior?";
  const seedMsg2 =
    "¡Hola! Sí, me interesa mucho. Estoy disponible esta semana para una llamada. Gracias.";

  return {
    companies,
    candidates,
    jobs,
    applications,
    savedJobs: [],
    onboardingDone: {},
    activeCompanyId: null,
    contacts: [
      {
        id: "msg-seed-1",
        company_id: "co-1",
        candidate_id: "cand-2",
        job_id: "job-2",
        subject: "Interés en tu perfil de Data Analyst",
        body: seedMsg1,
        status: "replied",
        reply_body: seedMsg2,
        replied_at: seedReplyAt,
        created_at: seedThreadAt,
        updated_at: seedReplyAt,
      },
    ],
    threads: [
      {
        id: seedThreadId,
        company_id: "co-1",
        candidate_id: "cand-1",
        job_id: "job-1",
        subject: "Conversación sobre Full Stack Developer",
        last_message_at: seedReplyAt,
        last_message_preview: "Perfecto, ¿te parece el jueves a las 15:00?",
        company_unread: 0,
        candidate_unread: 1,
        archived_by_company: false,
        archived_by_candidate: false,
        created_at: seedThreadAt,
        updated_at: seedReplyAt,
      },
      {
        id: "thread-seed-2",
        company_id: "co-1",
        candidate_id: "cand-2",
        job_id: "job-2",
        subject: "Interés en tu perfil de Data Analyst",
        last_message_at: seedReplyAt,
        last_message_preview: seedMsg2.slice(0, 80),
        company_unread: 1,
        candidate_unread: 0,
        archived_by_company: false,
        archived_by_candidate: false,
        created_at: seedThreadAt,
        updated_at: seedReplyAt,
      },
    ],
    messages: [
      {
        id: "cmsg-1",
        thread_id: seedThreadId,
        sender_role: "company",
        sender_id: "u-company-1",
        body: "Hola Ana, nos gustó mucho tu perfil Full Stack. ¿Tienes 20 min esta semana?",
        created_at: seedThreadAt,
        read_at: seedThreadAt,
      },
      {
        id: "cmsg-2",
        thread_id: seedThreadId,
        sender_role: "candidate",
        sender_id: "u-candidate-1",
        body: "¡Hola! Claro, con gusto. Estoy libre jueves y viernes por la tarde.",
        created_at: new Date(Date.now() - 3600000 * 22).toISOString(),
        read_at: new Date(Date.now() - 3600000 * 21).toISOString(),
      },
      {
        id: "cmsg-3",
        thread_id: seedThreadId,
        sender_role: "company",
        sender_id: "u-company-1",
        body: "Perfecto, ¿te parece el jueves a las 15:00?",
        created_at: seedReplyAt,
        read_at: null,
      },
      {
        id: "cmsg-4",
        thread_id: "thread-seed-2",
        sender_role: "company",
        sender_id: "u-company-1",
        body: seedMsg1,
        created_at: seedThreadAt,
        read_at: seedThreadAt,
      },
      {
        id: "cmsg-5",
        thread_id: "thread-seed-2",
        sender_role: "candidate",
        sender_id: "u-candidate-2",
        body: seedMsg2,
        created_at: seedReplyAt,
        read_at: null,
      },
    ],
    version: 3,
  };
}

function loadState(): RecluState {
  if (typeof window === "undefined") return createSeedState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createSeedState();
    const parsed = JSON.parse(raw) as RecluState;
    // Merge seed jobs that might be missing (upgrade path)
    const seed = createSeedState();
    const jobIds = new Set(parsed.jobs.map((j) => j.id));
    const missingJobs = seed.jobs.filter((j) => !jobIds.has(j.id));
    const companies = parsed.companies?.length
      ? parsed.companies
      : seed.companies;
    const jobs = attachJobRelations(
      [...parsed.jobs, ...missingJobs],
      companies
    );
    const candidates =
      parsed.candidates?.length
        ? parsed.candidates
        : seed.candidates;
    return {
      ...seed,
      ...parsed,
      companies,
      candidates,
      jobs,
      applications: attachApplicationRelations(
        parsed.applications || [],
        jobs,
        companies,
        candidates
      ),
      savedJobs: parsed.savedJobs || [],
      onboardingDone: parsed.onboardingDone || {},
      contacts: attachContactRelations(
        parsed.contacts || seed.contacts,
        companies,
        jobs,
        candidates
      ),
      threads: attachThreads(
        parsed.threads?.length ? parsed.threads : seed.threads,
        companies,
        candidates,
        jobs
      ),
      messages: parsed.messages?.length ? parsed.messages : seed.messages,
      activeCompanyId:
        parsed.activeCompanyId ?? seed.activeCompanyId ?? null,
    };
  } catch {
    return createSeedState();
  }
}

function persist(state: RecluState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function uid(prefix: string) {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

interface RecluStoreApi {
  ready: boolean;
  state: RecluState;
  /** Jobs helpers */
  getPublishedJobs: (filters?: {
    q?: string;
    category?: string;
    seniority?: string;
    modality?: string;
    featured?: boolean;
  }) => Job[];
  getJobBySlug: (slug: string) => Job | undefined;
  getJobById: (id: string) => Job | undefined;
  getCompanyJobs: (companyId: string) => Job[];
  createJob: (input: CreateJobInput) => { ok: true; job: Job } | { ok: false; error: string };
  updateJob: (
    id: string,
    patch: Partial<Job>
  ) => { ok: true; job: Job } | { ok: false; error: string };
  setJobStatus: (
    id: string,
    status: JobStatus
  ) => { ok: true } | { ok: false; error: string };
  /** Applications */
  applyToJob: (input: {
    job_id: string;
    candidate_id: string;
    cover_message?: string;
    resume_url?: string | null;
  }) => { ok: true; application: Application } | { ok: false; error: string };
  getApplicationsForCandidate: (candidateId: string) => Application[];
  getApplicationsForJob: (jobId: string) => Application[];
  getApplicationsForCompany: (companyId: string) => Application[];
  updateApplicationStatus: (
    id: string,
    status: ApplicationStatus,
    company_notes?: string
  ) => { ok: true } | { ok: false; error: string };
  withdrawApplication: (
    id: string,
    candidateId: string
  ) => { ok: true } | { ok: false; error: string };
  hasApplied: (jobId: string, candidateId: string) => boolean;
  /** Saved */
  toggleSaveJob: (
    userId: string,
    jobId: string
  ) => { saved: boolean };
  isJobSaved: (userId: string, jobId: string) => boolean;
  getSavedJobs: (userId: string) => Job[];
  /** Companies / admin */
  setCompanyStatus: (
    id: string,
    status: CompanyStatus,
    notes?: string
  ) => void;
  getCompany: (id: string) => Company | undefined;
  getActiveCompanyId: () => string;
  registerCompany: (input: {
    name: string;
    contact_name: string;
    email: string;
    industry?: string | null;
    company_size?: string | null;
    website?: string | null;
    headquarters?: string | null;
    description?: string | null;
    contact_email?: string | null;
  }) => { ok: true; company: Company } | { ok: false; error: string };
  /** Contacts */
  contactCandidate: (input: {
    company_id: string;
    candidate_id: string;
    job_id?: string | null;
    subject: string;
    body: string;
  }) =>
    | { ok: true; message: ContactMessage; thread: ChatThread }
    | { ok: false; error: string };
  getContactsForCompany: (companyId: string) => ContactMessage[];
  getContactsForCandidate: (candidateId: string) => ContactMessage[];
  replyToContact: (
    id: string,
    candidateId: string,
    reply_body: string
  ) => { ok: true } | { ok: false; error: string };
  markContactRead: (id: string, candidateId: string) => void;
  setContactStatus: (
    id: string,
    status: ContactStatus
  ) => void;
  /** Chat multi-mensaje */
  getThreadsForCompany: (companyId: string) => ChatThread[];
  getThreadsForCandidate: (candidateId: string) => ChatThread[];
  getThread: (id: string) => ChatThread | undefined;
  getMessages: (threadId: string) => ChatMessage[];
  startOrGetThread: (input: {
    company_id: string;
    candidate_id: string;
    job_id?: string | null;
    subject: string;
    body: string;
    sender_role: ChatSenderRole;
    sender_id?: string | null;
  }) => { ok: true; thread: ChatThread } | { ok: false; error: string };
  sendChatMessage: (input: {
    thread_id: string;
    sender_role: ChatSenderRole;
    sender_id?: string | null;
    body: string;
  }) => { ok: true; message: ChatMessage } | { ok: false; error: string };
  markThreadRead: (
    threadId: string,
    reader: "company" | "candidate"
  ) => void;
  getUnreadCount: (opts: {
    companyId?: string;
    candidateId?: string;
  }) => number;
  archiveThread: (
    threadId: string,
    who: "company" | "candidate"
  ) => void;
  /** Candidates / profile */
  getCandidate: (id: string) => CandidateProfile | undefined;
  getPublicCandidates: (filters?: {
    q?: string;
    programbiOnly?: boolean;
  }) => CandidateProfile[];
  updateCandidateBasics: (
    id: string,
    patch: Partial<CandidateProfile> & { full_name?: string }
  ) => { ok: true } | { ok: false; error: string };
  addExperience: (
    candidateId: string,
    exp: Omit<CandidateExperience, "id" | "candidate_id" | "sort_order">
  ) => { ok: true } | { ok: false; error: string };
  removeExperience: (candidateId: string, expId: string) => void;
  addEducation: (
    candidateId: string,
    edu: Omit<CandidateEducation, "id" | "candidate_id" | "sort_order">
  ) => { ok: true } | { ok: false; error: string };
  removeEducation: (candidateId: string, eduId: string) => void;
  addSkill: (
    candidateId: string,
    name: string,
    level: string
  ) => { ok: true } | { ok: false; error: string };
  removeSkill: (candidateId: string, skillRowId: string) => void;
  addProject: (
    candidateId: string,
    project: Omit<CandidateProject, "id" | "candidate_id" | "sort_order">
  ) => { ok: true } | { ok: false; error: string };
  removeProject: (candidateId: string, projectId: string) => void;
  addLanguage: (
    candidateId: string,
    language: string,
    level: string
  ) => void;
  removeLanguage: (candidateId: string, langId: string) => void;
  duplicateJob: (
    id: string
  ) => { ok: true; job: Job } | { ok: false; error: string };
  completeOnboarding: (key: string) => void;
  isOnboardingDone: (key: string) => boolean;
  resetStore: () => void;
}

const RecluStoreContext = createContext<RecluStoreApi | null>(null);

export function RecluStoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<RecluState>(() => createSeedState());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(loadState());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    persist(state);
  }, [state, ready]);

  const commit = useCallback((updater: (prev: RecluState) => RecluState) => {
    setState((prev) => {
      const next = updater(prev);
      const candidates = next.candidates || prev.candidates;
      return {
        ...next,
        candidates,
        jobs: attachJobRelations(next.jobs, next.companies),
        applications: attachApplicationRelations(
          next.applications,
          next.jobs,
          next.companies,
          candidates
        ),
        contacts: attachContactRelations(
          next.contacts,
          next.companies,
          next.jobs,
          candidates
        ),
        threads: attachThreads(
          next.threads || [],
          next.companies,
          candidates,
          next.jobs
        ),
        messages: next.messages || [],
      };
    });
  }, []);

  const api = useMemo<RecluStoreApi>(() => {
    const getPublishedJobs = (filters?: {
      q?: string;
      category?: string;
      seniority?: string;
      modality?: string;
      featured?: boolean;
    }) => {
      let jobs = state.jobs.filter((j) => j.status === "published");
      if (filters?.q) {
        const q = filters.q.toLowerCase();
        jobs = jobs.filter(
          (j) =>
            j.title.toLowerCase().includes(q) ||
            j.description.toLowerCase().includes(q) ||
            j.companies?.name.toLowerCase().includes(q)
        );
      }
      if (filters?.category) {
        jobs = jobs.filter((j) => j.categories?.slug === filters.category);
      }
      if (filters?.seniority) {
        jobs = jobs.filter((j) => j.seniority === filters.seniority);
      }
      if (filters?.modality) {
        jobs = jobs.filter((j) => j.modality === filters.modality);
      }
      if (filters?.featured) {
        jobs = jobs.filter((j) => j.is_featured);
      }
      return jobs.sort(
        (a, b) =>
          new Date(b.published_at || b.created_at).getTime() -
          new Date(a.published_at || a.created_at).getTime()
      );
    };

    const createJob = (
      input: CreateJobInput
    ): { ok: true; job: Job } | { ok: false; error: string } => {
      const parsed = createJobSchema.safeParse({
        ...input,
        salary_min: input.salary_min ?? null,
        salary_max: input.salary_max ?? null,
      });
      if (!parsed.success) {
        return {
          ok: false,
          error: parsed.error.issues[0]?.message || "Datos inválidos",
        };
      }
      const company = state.companies.find((c) => c.id === input.company_id);
      if (!company) return { ok: false, error: "Empresa no encontrada" };
      if (company.status !== "approved" && input.status === "published") {
        return {
          ok: false,
          error:
            "Tu empresa debe estar aprobada por Reclu para publicar vacantes.",
        };
      }

      const baseSlug = slugify(input.title);
      let slug = baseSlug;
      let i = 1;
      while (state.jobs.some((j) => j.slug === slug)) {
        slug = `${baseSlug}-${i++}`;
      }

      const now = new Date().toISOString();
      const status = input.status || "draft";
      const job: Job = {
        id: uid("job"),
        company_id: input.company_id,
        category_id: input.category_id || "cat-1",
        title: input.title.trim(),
        slug,
        description: input.description.trim(),
        responsibilities: input.responsibilities || null,
        requirements: input.requirements || null,
        nice_to_have: input.nice_to_have || null,
        seniority: input.seniority,
        job_type: input.job_type,
        modality: input.modality,
        city: input.city || null,
        country: input.country || null,
        salary_min: input.salary_min ?? null,
        salary_max: input.salary_max ?? null,
        salary_currency: input.salary_currency || "USD",
        salary_period: input.salary_period || "month",
        experience_years: input.experience_years ?? null,
        status,
        is_featured: input.is_featured || false,
        published_at: status === "published" ? now : null,
        closes_at: null,
        created_at: now,
        updated_at: now,
      };

      commit((prev) => ({
        ...prev,
        jobs: [job, ...prev.jobs],
      }));
      return { ok: true, job };
    };

    return {
      ready,
      state,
      getPublishedJobs,
      getJobBySlug: (slug) => state.jobs.find((j) => j.slug === slug),
      getJobById: (id) => state.jobs.find((j) => j.id === id),
      getCompanyJobs: (companyId) =>
        state.jobs
          .filter((j) => j.company_id === companyId)
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          ),

      createJob,

      updateJob: (id, patch) => {
        const existing = state.jobs.find((j) => j.id === id);
        if (!existing) return { ok: false, error: "Vacante no encontrada" };
        const company = state.companies.find(
          (c) => c.id === existing.company_id
        );
        if (
          patch.status === "published" &&
          company &&
          company.status !== "approved"
        ) {
          return {
            ok: false,
            error: "Empresa no aprobada: no se puede publicar.",
          };
        }
        const now = new Date().toISOString();
        let published_at = existing.published_at;
        if (patch.status === "published" && existing.status !== "published") {
          published_at = now;
        }
        const job: Job = {
          ...existing,
          ...patch,
          published_at,
          updated_at: now,
        };
        commit((prev) => ({
          ...prev,
          jobs: prev.jobs.map((j) => (j.id === id ? job : j)),
        }));
        return { ok: true, job };
      },

      setJobStatus: (id, status) => {
        const existing = state.jobs.find((j) => j.id === id);
        if (!existing) return { ok: false, error: "Vacante no encontrada" };
        const company = state.companies.find(
          (c) => c.id === existing.company_id
        );
        if (status === "published" && company && company.status !== "approved") {
          return {
            ok: false,
            error: "Empresa no aprobada: no se puede publicar.",
          };
        }
        const now = new Date().toISOString();
        commit((prev) => ({
          ...prev,
          jobs: prev.jobs.map((j) =>
            j.id === id
              ? {
                  ...j,
                  status,
                  published_at:
                    status === "published" && j.status !== "published"
                      ? now
                      : j.published_at,
                  updated_at: now,
                }
              : j
          ),
        }));
        return { ok: true };
      },

      applyToJob: (input) => {
        const parsed = applySchema.safeParse({
          ...input,
          cover_message: input.cover_message || "",
        });
        if (!parsed.success) {
          return {
            ok: false,
            error: parsed.error.issues[0]?.message || "Mensaje inválido",
          };
        }
        const job = state.jobs.find((j) => j.id === input.job_id);
        if (!job) return { ok: false, error: "La vacante no existe" };
        if (job.status !== "published") {
          return { ok: false, error: "Esta vacante no acepta postulaciones" };
        }
        const candidate = state.candidates.find(
          (c) => c.id === input.candidate_id
        );
        if (!candidate) {
          return { ok: false, error: "Perfil de candidato no encontrado" };
        }
        const already = state.applications.some(
          (a) =>
            a.job_id === input.job_id &&
            a.candidate_id === input.candidate_id &&
            a.status !== "withdrawn"
        );
        if (already) {
          return {
            ok: false,
            error: "Ya te postulaste a esta vacante",
          };
        }
        const now = new Date().toISOString();
        const application: Application = {
          id: uid("app"),
          job_id: input.job_id,
          candidate_id: input.candidate_id,
          cover_message: input.cover_message?.trim() || null,
          resume_url: input.resume_url || candidate.resume_url,
          status: "submitted",
          company_notes: null,
          created_at: now,
          updated_at: now,
        };
        commit((prev) => ({
          ...prev,
          applications: [application, ...prev.applications],
        }));
        return { ok: true, application };
      },

      getApplicationsForCandidate: (candidateId) =>
        attachApplicationRelations(
          state.applications.filter((a) => a.candidate_id === candidateId),
          state.jobs,
          state.companies,
          state.candidates
        ).sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ),

      getApplicationsForJob: (jobId) =>
        attachApplicationRelations(
          state.applications.filter((a) => a.job_id === jobId),
          state.jobs,
          state.companies,
          state.candidates
        ).sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ),

      getApplicationsForCompany: (companyId) => {
        const jobIds = new Set(
          state.jobs.filter((j) => j.company_id === companyId).map((j) => j.id)
        );
        return attachApplicationRelations(
          state.applications.filter((a) => jobIds.has(a.job_id)),
          state.jobs,
          state.companies,
          state.candidates
        ).sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      },

      updateApplicationStatus: (id, status, company_notes) => {
        const app = state.applications.find((a) => a.id === id);
        if (!app) return { ok: false, error: "Postulación no encontrada" };
        commit((prev) => ({
          ...prev,
          applications: prev.applications.map((a) =>
            a.id === id
              ? {
                  ...a,
                  status,
                  company_notes:
                    company_notes !== undefined
                      ? company_notes
                      : a.company_notes,
                  updated_at: new Date().toISOString(),
                }
              : a
          ),
        }));
        return { ok: true };
      },

      withdrawApplication: (id, candidateId) => {
        const app = state.applications.find(
          (a) => a.id === id && a.candidate_id === candidateId
        );
        if (!app) return { ok: false, error: "Postulación no encontrada" };
        if (["hired", "withdrawn"].includes(app.status)) {
          return { ok: false, error: "No se puede retirar esta postulación" };
        }
        commit((prev) => ({
          ...prev,
          applications: prev.applications.map((a) =>
            a.id === id
              ? {
                  ...a,
                  status: "withdrawn" as ApplicationStatus,
                  updated_at: new Date().toISOString(),
                }
              : a
          ),
        }));
        return { ok: true };
      },

      hasApplied: (jobId, candidateId) =>
        state.applications.some(
          (a) =>
            a.job_id === jobId &&
            a.candidate_id === candidateId &&
            a.status !== "withdrawn"
        ),

      toggleSaveJob: (userId, jobId) => {
        const existing = state.savedJobs.find(
          (s) => s.user_id === userId && s.job_id === jobId
        );
        if (existing) {
          commit((prev) => ({
            ...prev,
            savedJobs: prev.savedJobs.filter((s) => s.id !== existing.id),
          }));
          return { saved: false };
        }
        const row: SavedJob = {
          id: uid("save"),
          user_id: userId,
          job_id: jobId,
          created_at: new Date().toISOString(),
        };
        commit((prev) => ({
          ...prev,
          savedJobs: [row, ...prev.savedJobs],
        }));
        return { saved: true };
      },

      isJobSaved: (userId, jobId) =>
        state.savedJobs.some(
          (s) => s.user_id === userId && s.job_id === jobId
        ),

      getSavedJobs: (userId) => {
        const ids = state.savedJobs
          .filter((s) => s.user_id === userId)
          .map((s) => s.job_id);
        return attachJobRelations(
          state.jobs.filter((j) => ids.includes(j.id)),
          state.companies
        );
      },

      setCompanyStatus: (id, status, notes) => {
        commit((prev) => ({
          ...prev,
          companies: prev.companies.map((c) =>
            c.id === id
              ? {
                  ...c,
                  status,
                  admin_notes: notes ?? c.admin_notes,
                  reviewed_at: new Date().toISOString(),
                  reviewed_by: DEMO_SESSION.adminId,
                  updated_at: new Date().toISOString(),
                }
              : c
          ),
        }));
      },

      getCompany: (id) => state.companies.find((c) => c.id === id),

      getActiveCompanyId: () =>
        state.activeCompanyId || DEMO_SESSION.companyId,

      registerCompany: (input) => {
        const name = input.name?.trim();
        if (!name) {
          return { ok: false as const, error: "El nombre de la empresa es obligatorio" };
        }
        const now = new Date().toISOString();
        const ownerId = uid("u-co");
        const id = uid("co");
        let baseSlug = slugify(name) || "empresa";
        const existingSlugs = new Set(state.companies.map((c) => c.slug));
        let slug = baseSlug;
        let n = 2;
        while (existingSlugs.has(slug)) {
          slug = `${baseSlug}-${n++}`;
        }
        const company: Company = {
          id,
          owner_id: ownerId,
          name,
          legal_name: name,
          slug,
          tagline: null,
          description: input.description?.trim() || null,
          logo_url: null,
          cover_url: null,
          industry: input.industry?.trim() || null,
          company_size: input.company_size || null,
          founded_year: null,
          headquarters: input.headquarters?.trim() || null,
          countries: null,
          website: input.website?.trim() || null,
          linkedin_url: null,
          tech_stack: null,
          benefits: null,
          contact_email:
            input.contact_email?.trim() || input.email?.trim() || null,
          status: "pending",
          rejection_reason: null,
          admin_notes: input.contact_name
            ? `Contacto: ${input.contact_name}`
            : null,
          is_featured: false,
          reviewed_at: null,
          reviewed_by: null,
          created_at: now,
          updated_at: now,
        };
        commit((prev) => ({
          ...prev,
          companies: [company, ...prev.companies],
          activeCompanyId: id,
        }));
        return { ok: true as const, company };
      },

      contactCandidate: (input) => {
        const parsed = contactSchema.safeParse(input);
        if (!parsed.success) {
          return {
            ok: false,
            error: parsed.error.issues[0]?.message || "Datos inválidos",
          };
        }
        const company = state.companies.find((c) => c.id === input.company_id);
        if (!company) return { ok: false, error: "Empresa no encontrada" };
        if (company.status !== "approved") {
          return {
            ok: false,
            error:
              "Solo empresas aprobadas pueden contactar candidatos. Espera la revisión de Reclu.",
          };
        }
        const candidate = state.candidates.find(
          (c) => c.id === input.candidate_id
        );
        if (!candidate) {
          return { ok: false, error: "Candidato no encontrado" };
        }

        const now = new Date().toISOString();
        const body = input.body.trim();
        const subject = input.subject.trim();
        let thread = state.threads.find(
          (t) =>
            t.company_id === input.company_id &&
            t.candidate_id === input.candidate_id &&
            !t.archived_by_company
        );

        const chatMsg: ChatMessage = {
          id: uid("cmsg"),
          thread_id: thread?.id || uid("thread"),
          sender_role: "company",
          sender_id: DEMO_SESSION.companyOwnerId,
          body,
          created_at: now,
          read_at: null,
        };

        if (!thread) {
          thread = {
            id: chatMsg.thread_id,
            company_id: input.company_id,
            candidate_id: input.candidate_id,
            job_id: input.job_id || null,
            subject,
            last_message_at: now,
            last_message_preview: body.slice(0, 100),
            company_unread: 0,
            candidate_unread: 1,
            archived_by_company: false,
            archived_by_candidate: false,
            created_at: now,
            updated_at: now,
          };
        } else {
          thread = {
            ...thread,
            subject: subject || thread.subject,
            job_id: input.job_id || thread.job_id,
            last_message_at: now,
            last_message_preview: body.slice(0, 100),
            candidate_unread: thread.candidate_unread + 1,
            updated_at: now,
          };
          chatMsg.thread_id = thread.id;
        }

        const legacy: ContactMessage = {
          id: uid("msg"),
          company_id: input.company_id,
          candidate_id: input.candidate_id,
          job_id: input.job_id || null,
          subject,
          body,
          status: "sent",
          reply_body: null,
          replied_at: null,
          created_at: now,
          updated_at: now,
        };

        const threadFinal = thread;
        commit((prev) => {
          const exists = prev.threads.some((t) => t.id === threadFinal.id);
          return {
            ...prev,
            contacts: [legacy, ...prev.contacts],
            threads: exists
              ? prev.threads.map((t) =>
                  t.id === threadFinal.id ? threadFinal : t
                )
              : [threadFinal, ...prev.threads],
            messages: [...prev.messages, chatMsg],
          };
        });
        return { ok: true, message: legacy, thread: threadFinal };
      },

      getContactsForCompany: (companyId) =>
        attachContactRelations(
          state.contacts.filter((m) => m.company_id === companyId),
          state.companies,
          state.jobs,
          state.candidates
        ).sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ),

      getContactsForCandidate: (candidateId) =>
        attachContactRelations(
          state.contacts.filter((m) => m.candidate_id === candidateId),
          state.companies,
          state.jobs,
          state.candidates
        ).sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ),

      replyToContact: (id, candidateId, reply_body) => {
        const msg = state.contacts.find(
          (m) => m.id === id && m.candidate_id === candidateId
        );
        if (!msg) return { ok: false, error: "Mensaje no encontrado" };
        if (!reply_body.trim()) {
          return { ok: false, error: "Escribe una respuesta" };
        }
        const now = new Date().toISOString();
        commit((prev) => ({
          ...prev,
          contacts: prev.contacts.map((m) =>
            m.id === id
              ? {
                  ...m,
                  reply_body: reply_body.trim(),
                  replied_at: now,
                  status: "replied" as ContactStatus,
                  updated_at: now,
                }
              : m
          ),
        }));
        return { ok: true };
      },

      markContactRead: (id, candidateId) => {
        commit((prev) => ({
          ...prev,
          contacts: prev.contacts.map((m) =>
            m.id === id &&
            m.candidate_id === candidateId &&
            m.status === "sent"
              ? { ...m, status: "read" as ContactStatus, updated_at: new Date().toISOString() }
              : m
          ),
        }));
      },

      setContactStatus: (id, status) => {
        commit((prev) => ({
          ...prev,
          contacts: prev.contacts.map((m) =>
            m.id === id
              ? { ...m, status, updated_at: new Date().toISOString() }
              : m
          ),
        }));
      },

      getThreadsForCompany: (companyId) =>
        sortThreads(
          attachThreads(
            (state.threads || []).filter(
              (t) => t.company_id === companyId && !t.archived_by_company
            ),
            state.companies,
            state.candidates,
            state.jobs
          )
        ),

      getThreadsForCandidate: (candidateId) =>
        sortThreads(
          attachThreads(
            (state.threads || []).filter(
              (t) => t.candidate_id === candidateId && !t.archived_by_candidate
            ),
            state.companies,
            state.candidates,
            state.jobs
          )
        ),

      getThread: (id) =>
        attachThreads(
          (state.threads || []).filter((t) => t.id === id),
          state.companies,
          state.candidates,
          state.jobs
        )[0],

      getMessages: (threadId) =>
        sortMessages(
          (state.messages || []).filter((m) => m.thread_id === threadId)
        ),

      startOrGetThread: (input) => {
        let existing = state.threads.find(
          (t) =>
            t.company_id === input.company_id &&
            t.candidate_id === input.candidate_id &&
            (input.job_id ? t.job_id === input.job_id : true)
        );
        const now = new Date().toISOString();

        if (existing) {
          if (input.body.trim()) {
            const msg: ChatMessage = {
              id: uid("cmsg"),
              thread_id: existing.id,
              sender_role: input.sender_role,
              sender_id: input.sender_id || null,
              body: input.body.trim(),
              created_at: now,
              read_at: null,
            };
            commit((prev) => ({
              ...prev,
              messages: [...prev.messages, msg],
              threads: prev.threads.map((t) =>
                t.id === existing!.id
                  ? {
                      ...t,
                      last_message_at: now,
                      last_message_preview: input.body.trim().slice(0, 80),
                      company_unread:
                        input.sender_role === "candidate"
                          ? t.company_unread + 1
                          : t.company_unread,
                      candidate_unread:
                        input.sender_role === "company"
                          ? t.candidate_unread + 1
                          : t.candidate_unread,
                      updated_at: now,
                    }
                  : t
              ),
            }));
          }
          return { ok: true, thread: existing };
        }

        const threadId = uid("thread");
        const newThread: ChatThread = {
          id: threadId,
          company_id: input.company_id,
          candidate_id: input.candidate_id,
          job_id: input.job_id || null,
          subject: input.subject.trim() || "Contacto",
          last_message_at: now,
          last_message_preview: input.body.trim().slice(0, 80),
          company_unread: input.sender_role === "candidate" ? 1 : 0,
          candidate_unread: input.sender_role === "company" ? 1 : 0,
          archived_by_company: false,
          archived_by_candidate: false,
          created_at: now,
          updated_at: now,
        };

        const msg: ChatMessage = {
          id: uid("cmsg"),
          thread_id: threadId,
          sender_role: input.sender_role,
          sender_id: input.sender_id || null,
          body: input.body.trim(),
          created_at: now,
          read_at: null,
        };

        commit((prev) => ({
          ...prev,
          threads: [newThread, ...prev.threads],
          messages: [...prev.messages, msg],
        }));

        return { ok: true, thread: newThread };
      },

      sendChatMessage: (input) => {
        const thread = state.threads.find((t) => t.id === input.thread_id);
        if (!thread) return { ok: false, error: "Conversación no encontrada" };
        if (!input.body.trim()) return { ok: false, error: "El mensaje no puede estar vacío" };

        const now = new Date().toISOString();
        const msg: ChatMessage = {
          id: uid("cmsg"),
          thread_id: input.thread_id,
          sender_role: input.sender_role,
          sender_id: input.sender_id || null,
          body: input.body.trim(),
          created_at: now,
          read_at: null,
        };

        commit((prev) => ({
          ...prev,
          messages: [...prev.messages, msg],
          threads: prev.threads.map((t) =>
            t.id === input.thread_id
              ? {
                  ...t,
                  last_message_at: now,
                  last_message_preview: input.body.trim().slice(0, 80),
                  company_unread:
                    input.sender_role === "candidate"
                      ? t.company_unread + 1
                      : t.company_unread,
                  candidate_unread:
                    input.sender_role === "company"
                      ? t.candidate_unread + 1
                      : t.candidate_unread,
                  updated_at: now,
                }
              : t
          ),
        }));

        return { ok: true, message: msg };
      },

      markThreadRead: (threadId, reader) => {
        const now = new Date().toISOString();
        commit((prev) => ({
          ...prev,
          threads: prev.threads.map((t) =>
            t.id === threadId
              ? {
                  ...t,
                  company_unread: reader === "company" ? 0 : t.company_unread,
                  candidate_unread:
                    reader === "candidate" ? 0 : t.candidate_unread,
                }
              : t
          ),
          messages: (prev.messages || []).map((m) => {
            if (m.thread_id !== threadId || m.read_at) return m;
            if (reader === "company" && m.sender_role === "candidate") {
              return { ...m, read_at: now };
            }
            if (reader === "candidate" && m.sender_role === "company") {
              return { ...m, read_at: now };
            }
            return m;
          }),
        }));
      },

      getUnreadCount: (opts) => {
        if (opts.companyId) {
          return state.threads
            .filter((t) => t.company_id === opts.companyId && !t.archived_by_company)
            .reduce((sum, t) => sum + (t.company_unread || 0), 0);
        }
        if (opts.candidateId) {
          return state.threads
            .filter((t) => t.candidate_id === opts.candidateId && !t.archived_by_candidate)
            .reduce((sum, t) => sum + (t.candidate_unread || 0), 0);
        }
        return 0;
      },

      archiveThread: (threadId, who) => {
        commit((prev) => ({
          ...prev,
          threads: prev.threads.map((t) =>
            t.id === threadId
              ? {
                  ...t,
                  archived_by_company:
                    who === "company" ? true : t.archived_by_company,
                  archived_by_candidate:
                    who === "candidate" ? true : t.archived_by_candidate,
                }
              : t
          ),
        }));
      },

      getCandidate: (id) => state.candidates.find((c) => c.id === id),

      getPublicCandidates: (filters) => {
        let list = state.candidates.filter((c) => c.is_public);
        if (filters?.programbiOnly) {
          list = list.filter((c) => c.is_programbi_alumni);
        }
        if (filters?.q) {
          const q = filters.q.toLowerCase();
          list = list.filter(
            (c) =>
              c.profiles?.full_name?.toLowerCase().includes(q) ||
              c.headline?.toLowerCase().includes(q) ||
              c.skills?.some((s) =>
                s.skills?.name.toLowerCase().includes(q)
              )
          );
        }
        return list;
      },

      updateCandidateBasics: (id, patch) => {
        const existing = state.candidates.find((c) => c.id === id);
        if (!existing) return { ok: false, error: "Candidato no encontrado" };
        const { full_name, ...rest } = patch;
        commit((prev) => ({
          ...prev,
          candidates: prev.candidates.map((c) =>
            c.id === id
              ? {
                  ...c,
                  ...rest,
                  updated_at: new Date().toISOString(),
                  profiles: c.profiles
                    ? {
                        ...c.profiles,
                        full_name: full_name ?? c.profiles.full_name,
                      }
                    : c.profiles,
                }
              : c
          ),
        }));
        return { ok: true };
      },

      addExperience: (candidateId, exp) => {
        if (!exp.title?.trim() || !exp.company_name?.trim()) {
          return { ok: false, error: "Cargo y empresa son obligatorios" };
        }
        const row: CandidateExperience = {
          id: uid("exp"),
          candidate_id: candidateId,
          title: exp.title.trim(),
          company_name: exp.company_name.trim(),
          location: exp.location || null,
          is_current: exp.is_current || false,
          start_date: exp.start_date || null,
          end_date: exp.end_date || null,
          description: exp.description || null,
          sort_order: 0,
        };
        commit((prev) => ({
          ...prev,
          candidates: prev.candidates.map((c) =>
            c.id === candidateId
              ? {
                  ...c,
                  experiences: [row, ...(c.experiences || [])],
                  updated_at: new Date().toISOString(),
                }
              : c
          ),
        }));
        return { ok: true };
      },

      removeExperience: (candidateId, expId) => {
        commit((prev) => ({
          ...prev,
          candidates: prev.candidates.map((c) =>
            c.id === candidateId
              ? {
                  ...c,
                  experiences: (c.experiences || []).filter(
                    (e) => e.id !== expId
                  ),
                }
              : c
          ),
        }));
      },

      addEducation: (candidateId, edu) => {
        if (!edu.institution?.trim()) {
          return { ok: false, error: "Institución obligatoria" };
        }
        const row: CandidateEducation = {
          id: uid("edu"),
          candidate_id: candidateId,
          institution: edu.institution.trim(),
          degree: edu.degree || null,
          field: edu.field || null,
          start_date: edu.start_date || null,
          end_date: edu.end_date || null,
          is_programbi: edu.is_programbi || false,
          description: edu.description || null,
          sort_order: 0,
        };
        commit((prev) => ({
          ...prev,
          candidates: prev.candidates.map((c) =>
            c.id === candidateId
              ? {
                  ...c,
                  education: [row, ...(c.education || [])],
                  is_programbi_alumni:
                    c.is_programbi_alumni || row.is_programbi,
                }
              : c
          ),
        }));
        return { ok: true };
      },

      removeEducation: (candidateId, eduId) => {
        commit((prev) => ({
          ...prev,
          candidates: prev.candidates.map((c) =>
            c.id === candidateId
              ? {
                  ...c,
                  education: (c.education || []).filter((e) => e.id !== eduId),
                }
              : c
          ),
        }));
      },

      addSkill: (candidateId, name, level) => {
        if (!name.trim()) return { ok: false, error: "Nombre de skill vacío" };
        const skillId = uid("sk");
        const row: CandidateSkill = {
          id: uid("cs"),
          candidate_id: candidateId,
          skill_id: skillId,
          level: level || "intermediate",
          is_featured: true,
          skills: {
            id: skillId,
            name: name.trim(),
            slug: slugify(name),
          },
        };
        commit((prev) => ({
          ...prev,
          candidates: prev.candidates.map((c) =>
            c.id === candidateId
              ? { ...c, skills: [...(c.skills || []), row] }
              : c
          ),
        }));
        return { ok: true };
      },

      removeSkill: (candidateId, skillRowId) => {
        commit((prev) => ({
          ...prev,
          candidates: prev.candidates.map((c) =>
            c.id === candidateId
              ? {
                  ...c,
                  skills: (c.skills || []).filter((s) => s.id !== skillRowId),
                }
              : c
          ),
        }));
      },

      addProject: (candidateId, project) => {
        if (!project.name?.trim()) {
          return { ok: false, error: "Nombre del proyecto obligatorio" };
        }
        const row: CandidateProject = {
          id: uid("proj"),
          candidate_id: candidateId,
          name: project.name.trim(),
          description: project.description || null,
          url: project.url || null,
          repo_url: project.repo_url || null,
          tech_stack: project.tech_stack || [],
          sort_order: 0,
        };
        commit((prev) => ({
          ...prev,
          candidates: prev.candidates.map((c) =>
            c.id === candidateId
              ? { ...c, projects: [row, ...(c.projects || [])] }
              : c
          ),
        }));
        return { ok: true };
      },

      removeProject: (candidateId, projectId) => {
        commit((prev) => ({
          ...prev,
          candidates: prev.candidates.map((c) =>
            c.id === candidateId
              ? {
                  ...c,
                  projects: (c.projects || []).filter((p) => p.id !== projectId),
                }
              : c
          ),
        }));
      },

      addLanguage: (candidateId, language, level) => {
        const row: CandidateLanguage = {
          id: uid("lang"),
          candidate_id: candidateId,
          language: language.trim(),
          level,
        };
        commit((prev) => ({
          ...prev,
          candidates: prev.candidates.map((c) =>
            c.id === candidateId
              ? { ...c, languages: [...(c.languages || []), row] }
              : c
          ),
        }));
      },

      removeLanguage: (candidateId, langId) => {
        commit((prev) => ({
          ...prev,
          candidates: prev.candidates.map((c) =>
            c.id === candidateId
              ? {
                  ...c,
                  languages: (c.languages || []).filter((l) => l.id !== langId),
                }
              : c
          ),
        }));
      },

      duplicateJob: (id) => {
        const job = state.jobs.find((j) => j.id === id);
        if (!job) return { ok: false, error: "Vacante no encontrada" };
        const now = new Date().toISOString();
        const baseSlug = slugify(`${job.title}-copia`);
        let slug = baseSlug;
        let n = 1;
        while (state.jobs.some((j) => j.slug === slug)) {
          slug = `${baseSlug}-${n++}`;
        }
        const copy: Job = {
          ...job,
          id: uid("job"),
          title: `${job.title} (copia)`,
          slug,
          status: "draft",
          is_featured: false,
          published_at: null,
          created_at: now,
          updated_at: now,
        };
        commit((prev) => ({ ...prev, jobs: [copy, ...prev.jobs] }));
        return { ok: true, job: copy };
      },

      completeOnboarding: (key) => {
        commit((prev) => ({
          ...prev,
          onboardingDone: { ...prev.onboardingDone, [key]: true },
        }));
      },

      isOnboardingDone: (key) => Boolean(state.onboardingDone?.[key]),

      resetStore: () => {
        const seed = createSeedState();
        setState(seed);
        persist(seed);
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- api methods close over latest state
  }, [state, ready, commit]);

  return (
    <RecluStoreContext.Provider value={api}>
      {children}
    </RecluStoreContext.Provider>
  );
}

export function useRecluStore() {
  const ctx = useContext(RecluStoreContext);
  if (!ctx) {
    throw new Error("useRecluStore debe usarse dentro de RecluStoreProvider");
  }
  return ctx;
}

/** Safe hook for optional use outside provider (returns null) */
export function useRecluStoreOptional() {
  return useContext(RecluStoreContext);
}
