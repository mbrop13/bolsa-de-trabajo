-- Reclu by ProgramBI — schema inicial de producción
-- Ejecutar en Supabase SQL Editor o vía CLI: supabase db push

-- Extensions
create extension if not exists "pgcrypto";

-- Enums
do $$ begin
  create type user_role as enum ('candidate', 'company', 'admin');
exception when duplicate_object then null; end $$;

do $$ begin
  create type company_status as enum ('pending', 'approved', 'rejected', 'suspended');
exception when duplicate_object then null; end $$;

do $$ begin
  create type job_status as enum ('draft', 'published', 'closed', 'archived');
exception when duplicate_object then null; end $$;

do $$ begin
  create type application_status as enum (
    'submitted', 'in_review', 'interview', 'rejected', 'hired', 'withdrawn'
  );
exception when duplicate_object then null; end $$;

-- Profiles (1:1 auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text not null default '',
  avatar_url text,
  role user_role not null default 'candidate',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  legal_name text,
  slug text not null unique,
  tagline text,
  description text,
  logo_url text,
  cover_url text,
  industry text,
  company_size text,
  founded_year int,
  headquarters text,
  countries text[] default '{}',
  website text,
  linkedin_url text,
  tech_stack text[] default '{}',
  benefits text[] default '{}',
  contact_email text,
  status company_status not null default 'pending',
  rejection_reason text,
  admin_notes text,
  is_featured boolean not null default false,
  reviewed_at timestamptz,
  reviewed_by uuid references public.profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.company_members (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  member_role text not null default 'owner',
  created_at timestamptz not null default now(),
  unique (company_id, user_id)
);

create table if not exists public.candidate_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles (id) on delete cascade,
  username text unique,
  headline text,
  about text,
  looking_for text,
  city text,
  country text,
  open_to_relocate boolean not null default false,
  preferred_modality text,
  availability text,
  employment_status text,
  start_availability text,
  job_types text[] default '{}',
  salary_min numeric,
  salary_max numeric,
  salary_currency text not null default 'USD',
  salary_public boolean not null default false,
  linkedin_url text,
  github_url text,
  portfolio_url text,
  website_url text,
  resume_url text,
  banner_url text,
  is_public boolean not null default true,
  is_programbi_alumni boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.candidate_experiences (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references public.candidate_profiles (id) on delete cascade,
  title text not null,
  company_name text not null,
  location text,
  is_current boolean not null default false,
  start_date date,
  end_date date,
  description text,
  sort_order int not null default 0
);

create table if not exists public.candidate_education (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references public.candidate_profiles (id) on delete cascade,
  institution text not null,
  degree text,
  field text,
  start_date date,
  end_date date,
  is_programbi boolean not null default false,
  description text,
  sort_order int not null default 0
);

create table if not exists public.candidate_skills (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references public.candidate_profiles (id) on delete cascade,
  skill_id uuid not null references public.skills (id) on delete cascade,
  level text not null default 'intermediate',
  is_featured boolean not null default false,
  unique (candidate_id, skill_id)
);

create table if not exists public.candidate_projects (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references public.candidate_profiles (id) on delete cascade,
  name text not null,
  description text,
  url text,
  repo_url text,
  tech_stack text[] default '{}',
  sort_order int not null default 0
);

create table if not exists public.candidate_certifications (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references public.candidate_profiles (id) on delete cascade,
  name text not null,
  issuer text,
  issue_date date,
  credential_url text
);

create table if not exists public.candidate_languages (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references public.candidate_profiles (id) on delete cascade,
  language text not null,
  level text not null default 'conversational'
);

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  category_id uuid references public.categories (id),
  title text not null,
  slug text not null unique,
  description text not null,
  responsibilities text,
  requirements text,
  nice_to_have text,
  seniority text not null,
  job_type text not null,
  modality text not null,
  city text,
  country text,
  salary_min numeric,
  salary_max numeric,
  salary_currency text not null default 'USD',
  salary_period text not null default 'month',
  experience_years int,
  status job_status not null default 'draft',
  is_featured boolean not null default false,
  published_at timestamptz,
  closes_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.job_skills (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs (id) on delete cascade,
  skill_id uuid not null references public.skills (id) on delete cascade,
  unique (job_id, skill_id)
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs (id) on delete cascade,
  candidate_id uuid not null references public.candidate_profiles (id) on delete cascade,
  cover_message text,
  resume_url text,
  status application_status not null default 'submitted',
  company_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (job_id, candidate_id)
);

create table if not exists public.saved_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  job_id uuid not null references public.jobs (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, job_id)
);

create table if not exists public.admin_audit_logs (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references public.profiles (id),
  action text not null,
  entity_type text,
  entity_id text,
  meta jsonb default '{}',
  created_at timestamptz not null default now()
);

-- Indexes
create index if not exists idx_jobs_status on public.jobs (status);
create index if not exists idx_jobs_company on public.jobs (company_id);
create index if not exists idx_companies_status on public.companies (status);
create index if not exists idx_applications_job on public.applications (job_id);
create index if not exists idx_applications_candidate on public.applications (candidate_id);
create index if not exists idx_candidate_username on public.candidate_profiles (username);

-- Updated_at trigger
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_profiles_updated on public.profiles;
create trigger trg_profiles_updated before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists trg_companies_updated on public.companies;
create trigger trg_companies_updated before update on public.companies
  for each row execute function public.set_updated_at();

drop trigger if exists trg_jobs_updated on public.jobs;
create trigger trg_jobs_updated before update on public.jobs
  for each row execute function public.set_updated_at();

drop trigger if exists trg_candidate_profiles_updated on public.candidate_profiles;
create trigger trg_candidate_profiles_updated before update on public.candidate_profiles
  for each row execute function public.set_updated_at();

-- Auth: create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  r user_role;
  cname text;
  cslug text;
  company_id uuid;
begin
  r := coalesce((new.raw_user_meta_data->>'role')::user_role, 'candidate');
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    r
  );

  if r = 'candidate' then
    insert into public.candidate_profiles (user_id, username)
    values (
      new.id,
      lower(regexp_replace(coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)), '[^a-zA-Z0-9]+', '-', 'g'))
        || '-' || substr(new.id::text, 1, 6)
    );
  elsif r = 'company' then
    cname := coalesce(new.raw_user_meta_data->>'company_name', 'Mi empresa');
    cslug := lower(regexp_replace(cname, '[^a-zA-Z0-9]+', '-', 'g'))
      || '-' || substr(new.id::text, 1, 6);
    insert into public.companies (owner_id, name, slug, contact_email, status)
    values (new.id, cname, cslug, new.email, 'pending')
    returning id into company_id;
    insert into public.company_members (company_id, user_id, member_role)
    values (company_id, new.id, 'owner');
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Helpers
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin' and p.is_active
  );
$$;

create or replace function public.owns_company(cid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.companies c
    where c.id = cid and c.owner_id = auth.uid()
  ) or exists (
    select 1 from public.company_members m
    where m.company_id = cid and m.user_id = auth.uid()
  );
$$;

create or replace function public.company_is_approved(cid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.companies c
    where c.id = cid and c.status = 'approved'
  );
$$;

-- RLS
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.skills enable row level security;
alter table public.companies enable row level security;
alter table public.company_members enable row level security;
alter table public.candidate_profiles enable row level security;
alter table public.candidate_experiences enable row level security;
alter table public.candidate_education enable row level security;
alter table public.candidate_skills enable row level security;
alter table public.candidate_projects enable row level security;
alter table public.candidate_certifications enable row level security;
alter table public.candidate_languages enable row level security;
alter table public.jobs enable row level security;
alter table public.job_skills enable row level security;
alter table public.applications enable row level security;
alter table public.saved_jobs enable row level security;
alter table public.admin_audit_logs enable row level security;

-- Profiles policies
create policy "Public profiles readable" on public.profiles
  for select using (true);

create policy "Users update own profile" on public.profiles
  for update using (auth.uid() = id or public.is_admin());

-- Catalogs
create policy "Categories public read" on public.categories for select using (true);
create policy "Skills public read" on public.skills for select using (true);
create policy "Admin manage categories" on public.categories for all using (public.is_admin());
create policy "Admin manage skills" on public.skills for all using (public.is_admin());

-- Companies
create policy "Approved companies public" on public.companies
  for select using (status = 'approved' or owner_id = auth.uid() or public.is_admin() or public.owns_company(id));

create policy "Owner insert company" on public.companies
  for insert with check (auth.uid() = owner_id);

create policy "Owner update company" on public.companies
  for update using (public.owns_company(id) or public.is_admin());

-- Company members
create policy "Members read own company members" on public.company_members
  for select using (public.owns_company(company_id) or public.is_admin());

create policy "Owner manage members" on public.company_members
  for all using (public.owns_company(company_id) or public.is_admin());

-- Candidate profiles
create policy "Public or own candidate profile" on public.candidate_profiles
  for select using (
    is_public = true or user_id = auth.uid() or public.is_admin()
  );

create policy "Candidate insert own" on public.candidate_profiles
  for insert with check (user_id = auth.uid());

create policy "Candidate update own" on public.candidate_profiles
  for update using (user_id = auth.uid() or public.is_admin());

-- Candidate sub-resources (owner via candidate_profiles.user_id)
create policy "Read experiences" on public.candidate_experiences for select using (
  exists (
    select 1 from public.candidate_profiles cp
    where cp.id = candidate_id and (cp.is_public or cp.user_id = auth.uid() or public.is_admin())
  )
);
create policy "Write experiences" on public.candidate_experiences for all using (
  exists (select 1 from public.candidate_profiles cp where cp.id = candidate_id and cp.user_id = auth.uid())
  or public.is_admin()
);

create policy "Read education" on public.candidate_education for select using (
  exists (
    select 1 from public.candidate_profiles cp
    where cp.id = candidate_id and (cp.is_public or cp.user_id = auth.uid() or public.is_admin())
  )
);
create policy "Write education" on public.candidate_education for all using (
  exists (select 1 from public.candidate_profiles cp where cp.id = candidate_id and cp.user_id = auth.uid())
  or public.is_admin()
);

create policy "Read cand skills" on public.candidate_skills for select using (
  exists (
    select 1 from public.candidate_profiles cp
    where cp.id = candidate_id and (cp.is_public or cp.user_id = auth.uid() or public.is_admin())
  )
);
create policy "Write cand skills" on public.candidate_skills for all using (
  exists (select 1 from public.candidate_profiles cp where cp.id = candidate_id and cp.user_id = auth.uid())
  or public.is_admin()
);

create policy "Read projects" on public.candidate_projects for select using (
  exists (
    select 1 from public.candidate_profiles cp
    where cp.id = candidate_id and (cp.is_public or cp.user_id = auth.uid() or public.is_admin())
  )
);
create policy "Write projects" on public.candidate_projects for all using (
  exists (select 1 from public.candidate_profiles cp where cp.id = candidate_id and cp.user_id = auth.uid())
  or public.is_admin()
);

create policy "Read certs" on public.candidate_certifications for select using (
  exists (
    select 1 from public.candidate_profiles cp
    where cp.id = candidate_id and (cp.is_public or cp.user_id = auth.uid() or public.is_admin())
  )
);
create policy "Write certs" on public.candidate_certifications for all using (
  exists (select 1 from public.candidate_profiles cp where cp.id = candidate_id and cp.user_id = auth.uid())
  or public.is_admin()
);

create policy "Read langs" on public.candidate_languages for select using (
  exists (
    select 1 from public.candidate_profiles cp
    where cp.id = candidate_id and (cp.is_public or cp.user_id = auth.uid() or public.is_admin())
  )
);
create policy "Write langs" on public.candidate_languages for all using (
  exists (select 1 from public.candidate_profiles cp where cp.id = candidate_id and cp.user_id = auth.uid())
  or public.is_admin()
);

-- Jobs
create policy "Published jobs public" on public.jobs
  for select using (
    status = 'published'
    or public.owns_company(company_id)
    or public.is_admin()
  );

create policy "Company insert jobs" on public.jobs
  for insert with check (
    public.owns_company(company_id)
    and (
      status = 'draft'
      or public.company_is_approved(company_id)
      or public.is_admin()
    )
  );

create policy "Company update jobs" on public.jobs
  for update using (public.owns_company(company_id) or public.is_admin());

create policy "Company delete jobs" on public.jobs
  for delete using (public.owns_company(company_id) or public.is_admin());

create policy "Job skills read" on public.job_skills for select using (true);
create policy "Job skills write" on public.job_skills for all using (
  exists (select 1 from public.jobs j where j.id = job_id and (public.owns_company(j.company_id) or public.is_admin()))
);

-- Applications
create policy "Applications visibility" on public.applications
  for select using (
    public.is_admin()
    or exists (
      select 1 from public.candidate_profiles cp
      where cp.id = candidate_id and cp.user_id = auth.uid()
    )
    or exists (
      select 1 from public.jobs j
      where j.id = job_id and public.owns_company(j.company_id)
    )
  );

create policy "Candidate apply" on public.applications
  for insert with check (
    exists (
      select 1 from public.candidate_profiles cp
      where cp.id = candidate_id and cp.user_id = auth.uid()
    )
  );

create policy "Update applications" on public.applications
  for update using (
    public.is_admin()
    or exists (
      select 1 from public.candidate_profiles cp
      where cp.id = candidate_id and cp.user_id = auth.uid()
    )
    or exists (
      select 1 from public.jobs j
      where j.id = job_id and public.owns_company(j.company_id)
    )
  );

-- Saved jobs
create policy "Own saved jobs" on public.saved_jobs
  for all using (user_id = auth.uid());

-- Audit
create policy "Admin audit" on public.admin_audit_logs
  for all using (public.is_admin());

-- Seed catalogs
insert into public.categories (name, slug) values
  ('Programación', 'programacion'),
  ('Data & Analytics', 'data-analytics'),
  ('Diseño / UX', 'diseno-ux'),
  ('DevOps / Cloud', 'devops-cloud'),
  ('QA / Testing', 'qa-testing'),
  ('Producto & Agile', 'producto'),
  ('Mobile', 'mobile'),
  ('IA & Machine Learning', 'ia-ml'),
  ('Marketing Tech', 'marketing-tech'),
  ('Soporte & Customer Success', 'soporte')
on conflict (slug) do nothing;

insert into public.skills (name, slug) values
  ('JavaScript', 'javascript'),
  ('TypeScript', 'typescript'),
  ('React', 'react'),
  ('Next.js', 'nextjs'),
  ('Node.js', 'nodejs'),
  ('Python', 'python'),
  ('SQL', 'sql'),
  ('PostgreSQL', 'postgresql'),
  ('AWS', 'aws'),
  ('Docker', 'docker'),
  ('Git', 'git'),
  ('Tailwind CSS', 'tailwind'),
  ('Power BI', 'power-bi'),
  ('Figma', 'figma'),
  ('Kubernetes', 'kubernetes'),
  ('Java', 'java'),
  ('Go', 'go'),
  ('React Native', 'react-native')
on conflict (slug) do nothing;

-- Storage buckets (run in dashboard if needed)
-- avatars (public), company-logos (public), resumes (private)
