create table if not exists download_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade not null,
  game_id text not null,
  file_name text not null,
  downloaded_at timestamptz default now()
);

alter table download_logs enable row level security;

create policy "Users can view own download logs"
  on download_logs for select
  using (auth.uid() = user_id);

create policy "Users can insert own download logs"
  on download_logs for insert
  with check (auth.uid() = user_id);

create index idx_download_logs_user_month
  on download_logs (user_id, downloaded_at);
