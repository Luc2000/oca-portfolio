import "dotenv/config";
import { config } from "./config.js";
import { blogConfig } from "./config/blog-config.js";
import {
  getRecentPosts,
  getExistingSlugs,
  getCategoryBySlug,
  insertPost,
} from "./services/supabase.js";
import { generateBlogPost } from "./services/claude.js";
import { searchImage } from "./services/unsplash.js";
import {
  selectCategory,
  selectWriter,
  getAudienceByTime,
} from "./utils/schedule.js";
import { toSlug, ensureUniqueSlug } from "./utils/slug.js";
import { takeNext } from "./services/queue.js";

async function main() {
  console.log("=== AI Blog Generator ===");
  console.log(
    `Time: ${new Date().toLocaleString("en-US", {
      timeZone: blogConfig.schedule.timezone,
    })}`
  );

  if (config.dryRun) {
    console.log("[DRY RUN MODE]");
  }

  const audience = getAudienceByTime();
  console.log(`Audience: ${audience.toUpperCase()}`);

  // Fetch context
  const recentPosts = await getRecentPosts(60);
  const recentCategorySlugs = recentPosts.map((p) => p.category_slug);
  const recentAuthorNames = recentPosts.map((p) => p.author_name);
  const existingTitles = recentPosts.map((p) => p.title);
  const existingSlugs = await getExistingSlugs();
  console.log(`${recentPosts.length} existing posts in database.`);

  // 1. Check queue for a planned post
  const queued = takeNext(audience);

  // 2. Determine category
  const categorySlug = queued?.category ?? selectCategory(audience, recentCategorySlugs).slug;
  const category = await getCategoryBySlug(categorySlug);
  const source = queued ? `queue: "${queued.theme}"` : "round-robin";
  console.log(`Category: ${category.name} (${source})`);

  // 3. Pick writer (round-robin among writers eligible for this audience+category)
  const writer = selectWriter(audience, categorySlug, recentAuthorNames);

  // 4. Generate via Claude
  console.log("Generating...");
  const generated = await generateBlogPost(
    writer,
    categorySlug,
    category.name,
    audience,
    existingTitles,
    queued ? { theme: queued.theme, keyword: queued.keyword, notes: queued.notes } : undefined
  );

  // 5. Unique slug
  const safeSlug = ensureUniqueSlug(toSlug(generated.slug), existingSlugs);

  // 6. Cover image
  const keywords = generated.tags.slice(0, 3).join(" ");
  const image = await searchImage(keywords, generated.image_search_query);
  if (image) {
    console.log(`Image: ${image.alt}`);
  } else {
    console.warn("  No cover image found.");
  }

  // 7. Build and insert
  const post = {
    title: generated.title,
    slug: safeSlug,
    excerpt: generated.excerpt,
    content: generated.content,
    category_id: category.id,
    tags: generated.tags,
    featured_image: image?.url ?? null,
    featured_image_alt: image?.alt ?? null,
    author_name: writer.name,
    meta_title: generated.meta_title,
    meta_description: generated.meta_description,
    target_city: generated.target_city,
    target_state: generated.target_state,
    status: "published" as const,
    is_featured: false,
    published_at: new Date().toISOString(),
  };

  if (config.dryRun) {
    console.log("[DRY RUN] Would insert:");
    console.log(`  Title:  ${post.title}`);
    console.log(`  Slug:   ${post.slug}`);
    console.log(`  Author: ${post.author_name}`);
  } else {
    console.log("Inserting...");
    const slug = await insertPost(post);
    console.log(`Published: ${blogConfig.branding.blogBaseUrl}/${slug}`);
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error("\nFATAL ERROR:", err.message || err);
  process.exit(1);
});
