-- Create auth schema
create schema if not exists auth;

-- Enable RLS
alter table auth.users enable row level security;

-- Create application tables
create table public.users (
  id uuid references auth.users not null primary key,
  email text unique not null,
  name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  settings jsonb default '{}'::jsonb,
  constraint users_pkey primary key (id)
);

create table public.trades (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users not null,
  symbol text not null,
  type text check (type in ('buy', 'sell')) not null,
  entry_price numeric not null,
  exit_price numeric,
  quantity numeric not null,
  status text check (status in ('open', 'closed')) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  closed_at timestamp with time zone,
  constraint trades_pkey primary key (id)
);

create table public.journal_entries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users not null,
  trade_id uuid references public.trades,
  notes text,
  sentiment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint journal_entries_pkey primary key (id)
);

create table public.signals (
  id uuid default uuid_generate_v4() primary key,
  symbol text not null,
  type text check (type in ('buy', 'sell')) not null,
  price numeric not null,
  confidence integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint signals_pkey primary key (id)
);

create table public.token_transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users not null,
  type text check (type in ('earn', 'spend', 'stake', 'unstake')) not null,
  amount numeric not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint token_transactions_pkey primary key (id)
);

-- Enable RLS on all tables
alter table public.users enable row level security;
alter table public.trades enable row level security;
alter table public.journal_entries enable row level security;
alter table public.signals enable row level security;
alter table public.token_transactions enable row level security;

-- Create RLS policies
create policy "Users can view own data" on public.users
  for select using (auth.uid() = id);

create policy "Users can update own data" on public.users
  for update using (auth.uid() = id);

create policy "Users can view own trades" on public.trades
  for select using (auth.uid() = user_id);

create policy "Users can insert own trades" on public.trades
  for insert with check (auth.uid() = user_id);

create policy "Users can update own trades" on public.trades
  for update using (auth.uid() = user_id);

create policy "Users can view own journal entries" on public.journal_entries
  for select using (auth.uid() = user_id);

create policy "Users can insert own journal entries" on public.journal_entries
  for insert with check (auth.uid() = user_id);

create policy "Users can view signals" on public.signals
  for select using (true);

create policy "Users can view own token transactions" on public.token_transactions
  for select using (auth.uid() = user_id);

create policy "Users can insert own token transactions" on public.token_transactions
  for insert with check (auth.uid() = user_id);