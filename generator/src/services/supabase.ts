import { createClient } from "@supabase/supabase-js";
import { config } from "../config.js";

export const supabase = createClient(
  config.supabase.url,
  config.supabase.serviceRoleKey
);

export interface RecentPost {
  title: string;
  slug: string;
  category_slug: string;
  author_name: string;
}

export interface BlogCategory {
  id: string;
  slug: string;
  name: string;
  audience: string;
}

export interface BlogPostInsert {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category_id: string;
  tags: string[];
  featured_image: string | null;
  featured_image_alt: string | null;
  author_name: string;
  meta_title: string;
  meta_description: string;
  target_city: string | null;
  target_state: string | null;
  status: "draft" | "published";
  is_featured: boolean;
  published_at: string;
}

/**
 * Fetch recent posts to avoid topic repetition.
 */
export async function getRecentPosts(limit = 60): Promise<RecentPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("title, slug, author_name, blog_categories(slug)")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(`Failed to fetch recent posts: ${error.message}`);

  return (data ?? []).map((post: any) => ({
    title: post.title,
    slug: post.slug,
    author_name: post.author_name ?? "",
    category_slug: post.blog_categories?.slug ?? "",
  }));
}

/**
 * Get all existing slugs for uniqueness check.
 */
export async function getExistingSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug");

  if (error) throw new Error(`Failed to fetch slugs: ${error.message}`);
  return (data ?? []).map((p: any) => p.slug);
}

/**
 * Get category by slug.
 */
export async function getCategoryBySlug(slug: string): Promise<BlogCategory> {
  const { data, error } = await supabase
    .from("blog_categories")
    .select("id, slug, name, audience")
    .eq("slug", slug)
    .single();

  if (error) throw new Error(`Category "${slug}" not found: ${error.message}`);
  return data as BlogCategory;
}

/**
 * Unmark any currently featured post before setting a new one.
 */
export async function clearFeatured(): Promise<void> {
  const { error } = await supabase
    .from("blog_posts")
    .update({ is_featured: false })
    .eq("is_featured", true);

  if (error) throw new Error(`Failed to clear featured: ${error.message}`);
}

/**
 * Insert a new blog post.
 */
export async function insertPost(post: BlogPostInsert): Promise<string> {
  if (post.is_featured) {
    await clearFeatured();
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .insert(post)
    .select("id, slug")
    .single();

  if (error) throw new Error(`Failed to insert post: ${error.message}`);
  return data.slug;
}
