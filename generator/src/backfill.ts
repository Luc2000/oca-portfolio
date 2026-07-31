/**
 * One-off backfill: generates retroactive posts, one per month, so the blog
 * doesn't launch empty. Dates are spread across days/hours to read organic,
 * and each post is written as if published in its target month.
 *
 * Run manually from generator/: npx tsx src/backfill.ts
 * Does NOT touch post-queue.json or the launchd schedule.
 */
import "dotenv/config";
import { blogConfig } from "./config/blog-config.js";
import {
  getRecentPosts,
  getExistingSlugs,
  getCategoryBySlug,
  insertPost,
} from "./services/supabase.js";
import { generateBlogPost } from "./services/claude.js";
import { searchImage } from "./services/unsplash.js";
import { selectWriter } from "./utils/schedule.js";
import { toSlug, ensureUniqueSlug } from "./utils/slug.js";

interface BackfillEntry {
  /** ISO timestamp with BRT offset */
  publishedAt: string;
  /** Month label injected into the prompt for date consistency */
  monthLabel: string;
  year: number;
  category: string;
  theme: string;
  keyword: string;
}

const PLAN: BackfillEntry[] = [
  {
    publishedAt: "2025-09-09T10:23:00-03:00",
    monthLabel: "setembro de 2025",
    year: 2025,
    category: "criar-aplicativo",
    theme: "Tenho uma ideia de aplicativo: por onde começar (guia para quem não é técnico)",
    keyword: "ideia de aplicativo por onde começar",
  },
  {
    publishedAt: "2025-10-16T15:41:00-03:00",
    monthLabel: "outubro de 2025",
    year: 2025,
    category: "tecnologia-e-negocios",
    theme: "O que é dívida técnica e quanto ela custa para o seu negócio",
    keyword: "o que é dívida técnica",
  },
  {
    publishedAt: "2025-11-06T09:17:00-03:00",
    monthLabel: "novembro de 2025",
    year: 2025,
    category: "mvp-e-startups",
    theme: "Como validar sua ideia de startup antes de gastar um real com desenvolvimento",
    keyword: "como validar ideia de startup",
  },
  {
    publishedAt: "2025-12-11T17:05:00-03:00",
    monthLabel: "dezembro de 2025",
    year: 2025,
    category: "carreira-dev",
    theme: "CLT, PJ ou freelance: a matemática real para devs",
    keyword: "clt pj ou freelance dev",
  },
  {
    publishedAt: "2026-01-13T11:32:00-03:00",
    monthLabel: "janeiro de 2026",
    year: 2026,
    category: "ia-para-empresas",
    theme: "Como automatizar processos repetitivos com agentes de IA",
    keyword: "automatizar processos com ia",
  },
  {
    publishedAt: "2026-02-19T14:48:00-03:00",
    monthLabel: "fevereiro de 2026",
    year: 2026,
    category: "software-sob-medida",
    theme: "Sinais de que sua operação cresceu além da planilha",
    keyword: "sistema para substituir planilha",
  },
  {
    publishedAt: "2026-03-05T10:11:00-03:00",
    monthLabel: "março de 2026",
    year: 2026,
    category: "freelance-dev",
    theme: "Contrato de freelance: as cláusulas que salvam sua pele",
    keyword: "contrato de freelance dev",
  },
  {
    publishedAt: "2026-04-22T16:27:00-03:00",
    monthLabel: "abril de 2026",
    year: 2026,
    category: "criar-aplicativo",
    theme: "App nativo, híbrido ou PWA: qual faz sentido para o seu bolso e o seu prazo",
    keyword: "app nativo ou híbrido",
  },
  {
    publishedAt: "2026-05-12T09:53:00-03:00",
    monthLabel: "maio de 2026",
    year: 2026,
    category: "tecnologia-e-negocios",
    theme: "Integrações entre sistemas: fazendo seu ERP, CRM e site conversarem",
    keyword: "integração entre sistemas",
  },
  {
    publishedAt: "2026-06-10T15:19:00-03:00",
    monthLabel: "junho de 2026",
    year: 2026,
    category: "mvp-e-startups",
    theme: "No-code, low-code ou sob medida: o caminho certo para cada tipo de MVP",
    keyword: "no-code ou desenvolvimento sob medida",
  },
  {
    publishedAt: "2026-07-07T11:44:00-03:00",
    monthLabel: "julho de 2026",
    year: 2026,
    category: "carreira-dev",
    theme: "Portfolio de dev que gera lead: o que colocar e o que cortar",
    keyword: "portfolio de desenvolvedor",
  },
];

function dateNotes(entry: BackfillEntry): string {
  return (
    `IMPORTANT: this article is being backfilled with a publication date of ${entry.monthLabel}. ` +
    `Write it as if today were ${entry.monthLabel}: use ${entry.year} as the current year, ` +
    `never reference anything after ${entry.monthLabel}, and avoid mentioning specific recent events or news.`
  );
}

async function main() {
  console.log(`=== Backfill: ${PLAN.length} posts ===`);

  const recentPosts = await getRecentPosts(60);
  const existingTitles = recentPosts.map((p) => p.title);
  const existingSlugs = await getExistingSlugs();
  const recentAuthorNames = recentPosts.map((p) => p.author_name);

  let published = 0;
  for (const entry of PLAN) {
    const categoryConfig = blogConfig.categories.find(
      (c) => c.slug === entry.category
    );
    if (!categoryConfig) throw new Error(`Unknown category ${entry.category}`);

    const category = await getCategoryBySlug(entry.category);
    const writer = selectWriter(
      categoryConfig.audience,
      entry.category,
      recentAuthorNames
    );

    console.log(`\n[${entry.monthLabel}] ${entry.theme}`);
    const generated = await generateBlogPost(
      writer,
      entry.category,
      category.name,
      categoryConfig.audience,
      existingTitles,
      { theme: entry.theme, keyword: entry.keyword, notes: dateNotes(entry) }
    );

    const safeSlug = ensureUniqueSlug(toSlug(generated.slug), existingSlugs);
    const image = await searchImage(
      generated.tags.slice(0, 3).join(" "),
      generated.image_search_query
    );

    const timestamp = new Date(entry.publishedAt).toISOString();
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
      published_at: timestamp,
      // Keep the whole row consistent with the backdate
      created_at: timestamp,
      updated_at: timestamp,
    };

    const slug = await insertPost(post);
    published++;
    console.log(`  Published (${entry.publishedAt}): ${blogConfig.branding.blogBaseUrl}/${slug}`);

    existingTitles.push(generated.title);
    existingSlugs.push(safeSlug);
    recentAuthorNames.push(writer.name);
  }

  console.log(`\nBackfill done: ${published}/${PLAN.length} posts.`);
}

main().catch((err) => {
  console.error("\nBACKFILL ERROR:", err.message || err);
  process.exit(1);
});
