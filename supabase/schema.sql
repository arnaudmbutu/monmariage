create extension if not exists "pgcrypto";

create table if not exists public.drink_choices (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  state text not null check (state in ('chaud', 'froid')),
  created_at timestamptz not null default now()
);

create table if not exists public.guests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  nom_table text,
  drink_choice_id uuid references public.drink_choices(id) on delete set null,
  comments text,
  attendance_confirmed boolean not null default false,
  qr_code text,
  invite_token text not null unique default gen_random_uuid()::text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists guests_invite_token_idx on public.guests(invite_token);
create index if not exists guests_drink_choice_id_idx on public.guests(drink_choice_id);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists guests_set_updated_at on public.guests;
create trigger guests_set_updated_at
before update on public.guests
for each row execute function public.set_updated_at();

alter table public.drink_choices enable row level security;
alter table public.guests enable row level security;

drop policy if exists "Prototype read drinks" on public.drink_choices;
create policy "Prototype read drinks"
on public.drink_choices for select
to anon
using (true);

drop policy if exists "Prototype manage drinks" on public.drink_choices;
create policy "Prototype manage drinks"
on public.drink_choices for all
to anon
using (true)
with check (true);

drop policy if exists "Prototype read guests" on public.guests;
create policy "Prototype read guests"
on public.guests for select
to anon
using (true);

drop policy if exists "Prototype manage guests" on public.guests;
create policy "Prototype manage guests"
on public.guests for all
to anon
using (true)
with check (true);
