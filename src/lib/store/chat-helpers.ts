import type {
  CandidateProfile,
  ChatMessage,
  ChatThread,
  Company,
  Job,
} from "@/types/database";

export function attachThreads(
  threads: ChatThread[],
  companies: Company[],
  candidates: CandidateProfile[],
  jobs: Job[]
): ChatThread[] {
  return threads.map((t) => ({
    ...t,
    companies: companies.find((c) => c.id === t.company_id),
    candidate_profiles: candidates.find((c) => c.id === t.candidate_id),
    jobs: t.job_id ? jobs.find((j) => j.id === t.job_id) || null : null,
  }));
}

export function sortThreads(threads: ChatThread[]) {
  return [...threads].sort(
    (a, b) =>
      new Date(b.last_message_at).getTime() -
      new Date(a.last_message_at).getTime()
  );
}

export function sortMessages(messages: ChatMessage[]) {
  return [...messages].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
}
