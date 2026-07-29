import {
  blogConfig,
  type Audience,
  type CategoryConfig,
  type WriterConfig,
} from "../config/blog-config.js";

export type { Audience, CategoryConfig, WriterConfig };

/**
 * Determine the audience for the current run based on the wall-clock hour.
 *
 * Hours listed in `blogConfig.schedule.devsHours` publish for the dev/partner
 * audience; everything else publishes for clients. The hour is read in the
 * timezone declared in the config.
 */
export function getAudienceByTime(): Audience {
  const cfg = blogConfig.schedule;
  const hour = parseInt(
    new Date().toLocaleString("en-US", {
      timeZone: cfg.timezone,
      hour: "numeric",
      hour12: false,
    })
  );
  return cfg.devsHours.includes(hour) ? "devs" : "clientes";
}

/**
 * Pick the category with the fewest recent posts (round-robin effect)
 * from the pool matching the current audience.
 */
export function selectCategory(
  audience: Audience,
  recentCategorySlugs: string[]
): CategoryConfig {
  const pool = blogConfig.categories.filter((c) => c.audience === audience);

  if (pool.length === 0) {
    throw new Error(
      `No categories defined for audience "${audience}" in blog-config.ts`
    );
  }

  const counts = new Map<string, number>();
  for (const cat of pool) counts.set(cat.slug, 0);
  for (const slug of recentCategorySlugs) {
    if (counts.has(slug)) counts.set(slug, (counts.get(slug) ?? 0) + 1);
  }

  pool.sort((a, b) => (counts.get(a.slug) ?? 0) - (counts.get(b.slug) ?? 0));
  return pool[0];
}

/**
 * Pick the writer with the fewest recent posts among those eligible for the
 * given audience and category.
 *
 * Eligibility: writer.audience === audience AND writer.categories.includes(categorySlug).
 *
 * @param audience           "b2b" or "b2c"
 * @param categorySlug       slug of the category that was selected
 * @param recentAuthorNames  author_name values from the last N posts
 */
export function selectWriter(
  audience: Audience,
  categorySlug: string,
  recentAuthorNames: string[]
): WriterConfig {
  const candidates = blogConfig.writers.filter(
    (w) => w.audience === audience && w.categories.includes(categorySlug)
  );

  if (candidates.length === 0) {
    throw new Error(
      `No writers configured for audience "${audience}" and category "${categorySlug}". Check blog-config.ts.`
    );
  }

  if (candidates.length === 1) return candidates[0];

  const counts = new Map<string, number>();
  for (const w of candidates) counts.set(w.slug, 0);
  for (const name of recentAuthorNames) {
    const writer = candidates.find((w) => w.name === name);
    if (writer) counts.set(writer.slug, (counts.get(writer.slug) ?? 0) + 1);
  }

  candidates.sort((a, b) => (counts.get(a.slug) ?? 0) - (counts.get(b.slug) ?? 0));
  return candidates[0];
}

export function getCategoriesForAudience(audience: Audience): CategoryConfig[] {
  return blogConfig.categories.filter((c) => c.audience === audience);
}
