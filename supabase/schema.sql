-- ===========================================================================
-- Blog schema for oca.dev.br — run in the Supabase SQL editor before first use.
-- Shape mirrors github.com/Luc2000/ai-blog-generator-template so the generator
-- writes directly into these tables.
-- ===========================================================================

create extension if not exists "uuid-ossp";

create table if not exists blog_categories (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  name text not null,
  audience text not null check (audience in ('clientes', 'devs')),
  created_at timestamptz not null default now()
);

create table if not exists blog_posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  category_id uuid references blog_categories(id) on delete restrict,
  tags text[] not null default '{}',
  featured_image text,
  featured_image_alt text,
  author_name text not null,
  meta_title text,
  meta_description text,
  target_city text,
  target_state text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  is_featured boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_published_at_idx
  on blog_posts (published_at desc);
create index if not exists blog_posts_category_id_idx
  on blog_posts (category_id);
create index if not exists blog_posts_status_idx
  on blog_posts (status);

-- The site reads with the anon key: published posts only. The generator writes
-- with the service role key, which bypasses RLS.
alter table blog_categories enable row level security;
alter table blog_posts enable row level security;

create policy "public read categories"
  on blog_categories for select
  using (true);

create policy "public read published posts"
  on blog_posts for select
  using (status = 'published');

-- Categories. clientes = quem quer contratar/tirar a ideia do papel,
-- devs = rede de parceiros. Must match generator/blog-config.ts.
insert into blog_categories (slug, name, audience) values
  ('criar-aplicativo', 'Criar um Aplicativo', 'clientes'),
  ('mvp-e-startups', 'MVP e Startups', 'clientes'),
  ('ia-para-empresas', 'IA para Empresas', 'clientes'),
  ('software-sob-medida', 'Software Sob Medida', 'clientes'),
  ('tecnologia-e-negocios', 'Tecnologia e Negócios', 'clientes'),
  ('freelance-dev', 'Freelance para Devs', 'devs'),
  ('carreira-dev', 'Carreira Dev', 'devs')
on conflict (slug) do nothing;
