-- ===========================================================================
-- Partner devs showcase for oca.dev.br (/devs). Run in the Supabase SQL editor.
-- Rows are managed by hand: insert when a dev pays for the slot, bump
-- active_until on renewal. The site only ever sees rows still active.
-- ===========================================================================

create extension if not exists "uuid-ossp";

create table if not exists partner_devs (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  name text not null,
  photo_url text not null,
  headline text not null,
  bio text not null,
  stack text[] not null default '{}',
  city text,
  state text,
  price_label text,
  available boolean not null default true,
  -- Up to 3 portfolio items: [{ "name": "", "description": "", "url": "" }]
  projects jsonb not null default '[]',
  -- Digits only with country code, same shape as site.whatsapp (5511999999999)
  whatsapp text not null,
  email text,
  github_url text,
  linkedin_url text,
  website_url text,
  active_until timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists partner_devs_active_until_idx
  on partner_devs (active_until);

-- The site reads with the anon key: active rows only.
alter table partner_devs enable row level security;

create policy "public read active devs"
  on partner_devs for select
  using (active_until > now());

-- Example insert (uncomment and edit):
-- insert into partner_devs
--   (slug, name, photo_url, headline, bio, stack, city, state, price_label,
--    available, projects, whatsapp, email, github_url, linkedin_url, website_url,
--    active_until)
-- values
--   ('joao-silva', 'João Silva', 'https://avatars.githubusercontent.com/u/1?v=4',
--    'Fullstack React e Node', 'Construo produtos web do zero ao deploy.',
--    array['React', 'Node.js', 'TypeScript', 'PostgreSQL'], 'São Paulo', 'SP',
--    'a partir de R$ 120/h', true,
--    '[{"name": "App X", "description": "Marketplace de serviços", "url": "https://appx.com"}]',
--    '5511999999999', 'joao@exemplo.com', 'https://github.com/joao',
--    'https://linkedin.com/in/joao', null, now() + interval '30 days');
