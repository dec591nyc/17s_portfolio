-- Initial schema for yichi-portfolio-prod. No plaintext passwords are stored here.
begin;

create table public.site_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.site_admins enable row level security;
revoke all on public.site_admins from anon, authenticated;
grant select on public.site_admins to authenticated;
create policy admin_can_read_own_membership on public.site_admins
  for select to authenticated using (user_id = (select auth.uid()));
-- No client INSERT/UPDATE/DELETE policy: nobody can promote themselves.

create table public.notes (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null default auth.uid() references auth.users(id),
  title text not null check (length(btrim(title)) between 1 and 160),
  body text not null check (length(btrim(body)) between 1 and 100000),
  category text not null check (length(btrim(category)) between 1 and 60),
  tags text[] not null default '{}' check (cardinality(tags) <= 12),
  status text not null default 'draft' check (status in ('draft','published')),
  published_at timestamptz,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (status <> 'published' or (published_at is not null and deleted_at is null))
);
create index notes_author_id_idx on public.notes(author_id);
create index notes_public_created_idx on public.notes(created_at desc) where status = 'published' and deleted_at is null;
alter table public.notes enable row level security;
revoke all on public.notes from anon, authenticated;
grant select on public.notes to anon, authenticated;
grant insert (title, body, category, tags, status, published_at, author_id) on public.notes to authenticated;
grant update (title, body, category, tags, status, published_at, deleted_at) on public.notes to authenticated;

create policy public_read_published_notes on public.notes
  for select to anon using (status = 'published' and deleted_at is null);
create policy authenticated_read_notes on public.notes
  for select to authenticated using (
    (status = 'published' and deleted_at is null)
    or exists (select 1 from public.site_admins a where a.user_id = (select auth.uid()))
  );
create policy admin_insert_notes on public.notes
  for insert to authenticated with check (
    author_id = (select auth.uid())
    and exists (select 1 from public.site_admins a where a.user_id = (select auth.uid()))
  );
create policy admin_update_notes on public.notes
  for update to authenticated using (
    author_id = (select auth.uid())
    and exists (select 1 from public.site_admins a where a.user_id = (select auth.uid()))
  ) with check (
    author_id = (select auth.uid())
    and exists (select 1 from public.site_admins a where a.user_id = (select auth.uid()))
  );
-- No DELETE grant: deletion is recoverable through deleted_at.

create function public.stamp_note_update() returns trigger
  language plpgsql security invoker set search_path = '' as $$
begin
  if exists (select 1 from unnest(new.tags) tag where tag is null or length(tag) not between 1 and 40) then
    raise check_violation using message = 'Each tag must contain 1 to 40 characters';
  end if;
  if tg_op = 'UPDATE' then
    new.updated_at = clock_timestamp();
  end if;
  return new;
end;
$$;
revoke all on function public.stamp_note_update() from public, anon, authenticated;
create trigger stamp_note_update before insert or update on public.notes
  for each row execute function public.stamp_note_update();

commit;
