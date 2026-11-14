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
import { findSimilarTitle } from "./utils/similarity.js";

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
  const allPosts = await getRecentPosts(2000);
  const recentPosts = allPosts.slice(0, 60);

  // Cadence guard: at most one post every minDaysBetweenPosts (SEO: no scaled content)
  const lastPublishedAt = allPosts.find((p) => p.published_at)?.published_at;
  if (lastPublishedAt && !config.dryRun) {
    const daysSince = (Date.now() - new Date(lastPublishedAt).getTime()) / 86_400_000;
    if (daysSince < blogConfig.schedule.minDaysBetweenPosts) {
      console.log(
        `Skipped: last post ${daysSince.toFixed(1)} days ago (min ${blogConfig.schedule.minDaysBetweenPosts}).`
      );
      return;
    }
  }

  const recentCategorySlugs = recentPosts.map((p) => p.category_slug);
  const recentAuthorNames = recentPosts.map((p) => p.author_name);
  // Every title (published or consolidated) so the model never rewrites an existing topic
  const existingTitles = allPosts.map((p) => p.title);
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

  // Duplicate guard: same topic as an existing post -> do not publish
  const similar = findSimilarTitle(generated.title, existingTitles);
  if (similar) {
    console.log(`Skipped: "${generated.title}" repeats "${similar}".`);
    return;
  }

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
