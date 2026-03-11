-- ============================================
-- Sunday Play: 초기 테이블 생성 + RLS + 인덱스
-- Supabase SQL Editor에서 실행
-- ============================================

-- 1. profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "본인 프로필 조회" on public.profiles
  for select using (auth.uid() = id);

create policy "본인 프로필 수정" on public.profiles
  for update using (auth.uid() = id);

-- 2. subscriptions
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  status text not null default 'inactive',
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.subscriptions enable row level security;

create policy "본인 구독 조회" on public.subscriptions
  for select using (auth.uid() = user_id);

-- 3. bookmarks
create table public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  game_id text not null,
  created_at timestamptz default now(),
  unique(user_id, game_id)
);

alter table public.bookmarks enable row level security;

create policy "본인 북마크 조회" on public.bookmarks
  for select using (auth.uid() = user_id);

create policy "본인 북마크 추가" on public.bookmarks
  for insert with check (auth.uid() = user_id);

create policy "본인 북마크 삭제" on public.bookmarks
  for delete using (auth.uid() = user_id);

create index idx_bookmarks_user_id on public.bookmarks(user_id);

-- 4. reviews
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  game_id text not null,
  rating smallint not null check (rating >= 1 and rating <= 5),
  content text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, game_id)
);

alter table public.reviews enable row level security;

create policy "리뷰 전체 조회" on public.reviews
  for select using (true);

create policy "본인 리뷰 작성" on public.reviews
  for insert with check (auth.uid() = user_id);

create policy "본인 리뷰 수정" on public.reviews
  for update using (auth.uid() = user_id);

create policy "본인 리뷰 삭제" on public.reviews
  for delete using (auth.uid() = user_id);

create index idx_reviews_game_id on public.reviews(game_id);

-- 5. free_view_logs
create table public.free_view_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  game_id text not null,
  viewed_at timestamptz default now(),
  unique(user_id, game_id)
);

alter table public.free_view_logs enable row level security;

create policy "본인 열람 기록 조회" on public.free_view_logs
  for select using (auth.uid() = user_id);

create policy "본인 열람 기록 추가" on public.free_view_logs
  for insert with check (auth.uid() = user_id);

create index idx_free_view_logs_user_viewed on public.free_view_logs(user_id, viewed_at);

-- 6. 자동 프로필 생성 트리거
-- 새 사용자가 가입하면 profiles 테이블에 자동 삽입
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, display_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
