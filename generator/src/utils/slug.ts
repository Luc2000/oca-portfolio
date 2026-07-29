/**
 * Converts a title to a URL-safe slug.
 * "Como Aumentar a Lista VIP" → "como-aumentar-a-lista-vip"
 */
export function toSlug(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // remove non-alphanumeric
    .trim()
    .replace(/\s+/g, "-") // spaces → hyphens
    .replace(/-+/g, "-"); // collapse multiple hyphens
}

/**
 * Ensures slug uniqueness by appending -2, -3, etc.
 */
export function ensureUniqueSlug(slug: string, existingSlugs: string[]): string {
  if (!existingSlugs.includes(slug)) return slug;

  let i = 2;
  while (existingSlugs.includes(`${slug}-${i}`)) {
    i++;
  }
  return `${slug}-${i}`;
}
