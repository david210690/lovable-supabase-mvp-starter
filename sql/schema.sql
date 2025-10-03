-- Enable UUID generator (required for gen_random_uuid)
create extension if not exists "pgcrypto";

-- ========== PROFILES (linked to Supabase Auth) ==========
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text check (role in ('admin','manager','user')) default 'user',
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "read own profile" on public.profiles
for select using (auth.uid() = id);

create policy "update own profile" on public.profiles
for update using (auth.uid() = id);

-- ========== ORGS & MEMBERS (simple multi-tenancy) ==========
create table if not exists public.orgs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner uuid references auth.users(id),
  created_at timestamptz default now()
);

create table if not exists public.members (
  org_id uuid references public.orgs(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  role text check (role in ('owner','admin','member')) default 'member',
  primary key (org_id, user_id),
  created_at timestamptz default now()
);

alter table public.orgs enable row level security;
alter table public.members enable row level security;

-- Only members can see orgs they belong to
create policy "org visibility to members" on public.orgs
for select using (
  exists (
    select 1 from public.members m
    where m.org_id = orgs.id and m.user_id = auth.uid()
  )
);

-- Members can read their own membership rows
create policy "member reads own rows" on public.members
for select using (user_id = auth.uid());

-- Owners/Admins can add members to their org
create policy "org admins can add members" on public.members
for insert with check (
  exists (
    select 1 from public.members m
    where m.org_id = members.org_id
      and m.user_id = auth.uid()
      and m.role in ('owner','admin')
  )
);
