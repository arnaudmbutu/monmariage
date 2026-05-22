alter table public.guests
add column if not exists nom_table text;

comment on column public.guests.nom_table is 'Nom ou numero de table attribue a l invite.';

create index if not exists guests_nom_table_idx on public.guests(nom_table);
