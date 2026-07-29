-- Migration for projects created with the original schema (b2b/b2c audiences).
-- Renames audiences to clientes/devs and adds the two dev categories.
-- Run once in the Supabase SQL editor.

alter table blog_categories drop constraint blog_categories_audience_check;
alter table blog_categories add constraint blog_categories_audience_check
  check (audience in ('clientes', 'devs'));

update blog_categories set audience = 'clientes' where audience in ('b2b', 'b2c');

insert into blog_categories (slug, name, audience) values
  ('freelance-dev', 'Freelance para Devs', 'devs'),
  ('carreira-dev', 'Carreira Dev', 'devs')
on conflict (slug) do nothing;
