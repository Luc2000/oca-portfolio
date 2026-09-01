import { supabase } from "./supabase";

export interface BlogCategory {
  id: string;
  slug: string;
  name: string;
}

export interface BlogPostSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  featured_image: string | null;
  featured_image_alt: string | null;
  author_name: string;
  published_at: string;
  updated_at: string;
  category: BlogCategory | null;
}

export interface BlogPost extends BlogPostSummary {
  content: string;
  meta_title: string | null;
  meta_description: string | null;
}

const SUMMARY_COLUMNS =
  "id, title, slug, excerpt, tags, featured_image, featured_image_alt, author_name, published_at, updated_at, category:blog_categories(id, slug, name)";
const POST_COLUMNS = `${SUMMARY_COLUMNS}, content, meta_title, meta_description`;

export async function getPublishedPosts(
  limit = 60
): Promise<BlogPostSummary[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("blog_posts")
    .select(SUMMARY_COLUMNS)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as BlogPostSummary[];
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("blog_posts")
    .select(POST_COLUMNS)
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data as unknown as BlogPost | null;
}

export async function getCategories(): Promise<BlogCategory[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("blog_categories")
    .select("id, slug, name")
    .order("name");
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getCategory(slug: string): Promise<BlogCategory | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("blog_categories")
    .select("id, slug, name")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function getPostsByCategory(
  categoryId: string,
  limit = 60
): Promise<BlogPostSummary[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("blog_posts")
    .select(SUMMARY_COLUMNS)
    .eq("status", "published")
    .eq("category_id", categoryId)
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as BlogPostSummary[];
}

export async function getRelatedPosts(
  post: BlogPost,
  limit = 3
): Promise<BlogPostSummary[]> {
  if (!supabase || !post.category) return [];
  const { data, error } = await supabase
    .from("blog_posts")
    .select(SUMMARY_COLUMNS)
    .eq("status", "published")
    .eq("category_id", post.category.id)
    .neq("id", post.id)
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as BlogPostSummary[];
}

export function formatPostDate(iso: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(iso));
}

export function readingTimeMinutes(htmlContent: string): number {
  const words = htmlContent
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
