-- Chat multi-mensaje empresa ↔ candidato
-- Ejecutar después de 001 y 002

create table if not exists public.chat_threads (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  candidate_id uuid not null references public.candidate_profiles (id) on delete cascade,
  job_id uuid references public.jobs (id) on delete set null,
  subject text not null default 'Conversación',
  last_message_at timestamptz not null default now(),
  last_message_preview text,
  company_unread int not null default 0,
  candidate_unread int not null default 0,
  archived_by_company boolean not null default false,
  archived_by_candidate boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists idx_chat_threads_pair_job
  on public.chat_threads (company_id, candidate_id, coalesce(job_id, '00000000-0000-0000-0000-000000000000'::uuid));

create index if not exists idx_chat_threads_company on public.chat_threads (company_id);
create index if not exists idx_chat_threads_candidate on public.chat_threads (candidate_id);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.chat_threads (id) on delete cascade,
  sender_role text not null check (sender_role in ('company', 'candidate', 'system')),
  sender_id uuid,
  body text not null,
  created_at timestamptz not null default now(),
  read_at timestamptz
);

create index if not exists idx_chat_messages_thread on public.chat_messages (thread_id, created_at);

drop trigger if exists trg_chat_threads_updated on public.chat_threads;
create trigger trg_chat_threads_updated before update on public.chat_threads
  for each row execute function public.set_updated_at();

alter table public.chat_threads enable row level security;
alter table public.chat_messages enable row level security;

create policy "Chat threads parties" on public.chat_threads
  for select using (
    public.is_admin()
    or public.owns_company(company_id)
    or exists (
      select 1 from public.candidate_profiles cp
      where cp.id = candidate_id and cp.user_id = auth.uid()
    )
  );

create policy "Chat threads insert company" on public.chat_threads
  for insert with check (
    public.owns_company(company_id) and public.company_is_approved(company_id)
  );

create policy "Chat threads update parties" on public.chat_threads
  for update using (
    public.is_admin()
    or public.owns_company(company_id)
    or exists (
      select 1 from public.candidate_profiles cp
      where cp.id = candidate_id and cp.user_id = auth.uid()
    )
  );

create policy "Chat messages read parties" on public.chat_messages
  for select using (
    exists (
      select 1 from public.chat_threads t
      where t.id = thread_id
        and (
          public.is_admin()
          or public.owns_company(t.company_id)
          or exists (
            select 1 from public.candidate_profiles cp
            where cp.id = t.candidate_id and cp.user_id = auth.uid()
          )
        )
    )
  );

create policy "Chat messages insert parties" on public.chat_messages
  for insert with check (
    exists (
      select 1 from public.chat_threads t
      where t.id = thread_id
        and (
          public.owns_company(t.company_id)
          or exists (
            select 1 from public.candidate_profiles cp
            where cp.id = t.candidate_id and cp.user_id = auth.uid()
          )
        )
    )
  );
