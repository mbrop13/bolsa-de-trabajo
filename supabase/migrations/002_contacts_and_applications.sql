-- Contactos empresa → candidato + índices de postulaciones
-- Ejecutar después de 001_initial_schema.sql

do $$ begin
  create type contact_status as enum (
    'sent', 'read', 'replied', 'archived', 'declined'
  );
exception when duplicate_object then null; end $$;

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  candidate_id uuid not null references public.candidate_profiles (id) on delete cascade,
  job_id uuid references public.jobs (id) on delete set null,
  subject text not null,
  body text not null,
  status contact_status not null default 'sent',
  reply_body text,
  replied_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_contacts_company on public.contact_messages (company_id);
create index if not exists idx_contacts_candidate on public.contact_messages (candidate_id);

drop trigger if exists trg_contacts_updated on public.contact_messages;
create trigger trg_contacts_updated before update on public.contact_messages
  for each row execute function public.set_updated_at();

alter table public.contact_messages enable row level security;

-- Solo empresa dueña, candidato destino o admin
create policy "Contact read parties" on public.contact_messages
  for select using (
    public.is_admin()
    or public.owns_company(company_id)
    or exists (
      select 1 from public.candidate_profiles cp
      where cp.id = candidate_id and cp.user_id = auth.uid()
    )
  );

-- Solo empresas aprobadas pueden contactar
create policy "Contact insert approved company" on public.contact_messages
  for insert with check (
    public.owns_company(company_id)
    and public.company_is_approved(company_id)
  );

-- Empresa actualiza estado; candidato responde
create policy "Contact update parties" on public.contact_messages
  for update using (
    public.is_admin()
    or public.owns_company(company_id)
    or exists (
      select 1 from public.candidate_profiles cp
      where cp.id = candidate_id and cp.user_id = auth.uid()
    )
  );

-- Solo empresas aprobadas pueden publicar (refuerzo)
create or replace function public.enforce_job_publish()
returns trigger
language plpgsql
as $$
begin
  if new.status = 'published' and not public.company_is_approved(new.company_id) then
    if not public.is_admin() then
      raise exception 'La empresa debe estar aprobada para publicar vacantes';
    end if;
  end if;
  if new.status = 'published' and (old.status is distinct from 'published') then
    new.published_at := coalesce(new.published_at, now());
  end if;
  return new;
end;
$$;

drop trigger if exists trg_job_publish on public.jobs;
create trigger trg_job_publish
  before insert or update on public.jobs
  for each row execute function public.enforce_job_publish();
