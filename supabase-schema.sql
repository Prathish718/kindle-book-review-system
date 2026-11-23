create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '' check (
    char_length(display_name) between 1 and 60
  ),
  favorite_genre text not null default 'Fiction',
  updated_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  book_id text not null,
  rating smallint not null check (rating between 1 and 5),
  experience text not null check (
    char_length(trim(experience)) between 1 and 2000
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, book_id)
);

create table if not exists public.wishlists (
  user_id uuid not null references auth.users(id) on delete cascade,
  book_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, book_id)
);

create table if not exists public.reading_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  book_id text not null,
  position double precision not null default 0 check (position between 0 and 1),
  updated_at timestamptz not null default now(),
  primary key (user_id, book_id)
);

create index if not exists reviews_book_id_idx on public.reviews(book_id);
alter table public.profiles enable row level security;
alter table public.reviews enable row level security;
alter table public.wishlists enable row level security;
alter table public.reading_progress enable row level security;

drop policy if exists "Readers can view own profile" on public.profiles;
create policy "Readers can view own profile"
on public.profiles for select to authenticated
using ((select auth.uid()) = id);
drop policy if exists "Readers can update own profile" on public.profiles;
create policy "Readers can update own profile"
on public.profiles for update to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);
drop policy if exists "Readers can view community ratings" on public.reviews;
create policy "Readers can view community ratings"
on public.reviews for select to authenticated
using (true);
drop policy if exists "Readers can add own review" on public.reviews;
create policy "Readers can add own review"
on public.reviews for insert to authenticated
with check ((select auth.uid()) = user_id);
drop policy if exists "Readers can update own review" on public.reviews;
create policy "Readers can update own review"
on public.reviews for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);
drop policy if exists "Readers can remove own review" on public.reviews;
create policy "Readers can remove own review"
on public.reviews for delete to authenticated
using ((select auth.uid()) = user_id);
drop policy if exists "Readers manage own wishlist" on public.wishlists;
create policy "Readers manage own wishlist"
on public.wishlists for all to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);
drop policy if exists "Readers manage own reading progress" on public.reading_progress;
create policy "Readers manage own reading progress"
on public.reading_progress for all to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create or replace function public.create_reader_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, favorite_genre)
  values (
    new.id,
    coalesce(
      nullif(trim(new.raw_user_meta_data ->> 'display_name'), ''),
      split_part(new.email, '@', 1)
    ),
    coalesce(
      nullif(new.raw_user_meta_data ->> 'favorite_genre', ''),
      'Fiction'
    )
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists create_reader_profile_after_signup on auth.users;
create trigger create_reader_profile_after_signup
after insert on auth.users
for each row execute function public.create_reader_profile();

alter table public.reviews replica identity full;
do $$
begin
  alter publication supabase_realtime add table public.reviews;
exception when duplicate_object then null;
end;
$$;
