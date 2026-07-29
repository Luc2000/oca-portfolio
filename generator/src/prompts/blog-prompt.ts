import {
  blogConfig,
  type Audience,
  type WriterConfig,
} from "../config/blog-config.js";
import { loadMd } from "../utils/load-md.js";

/**
 * Compose the system prompt from three layers:
 *
 *   1. ECOSYSTEM (markdown)  → loaded from blogConfig.ecosystemFile
 *      Always-on business context: who we are, what we sell, who buys.
 *
 *   2. WRITER PERSONA (markdown)  → loaded from writer.personaFile
 *      The voice for THIS run. The same article topic written by Marina the
 *      Veteran will read very differently from one written by Bruno the
 *      Trend-Watcher, even though both share the ecosystem context.
 *
 *   3. UNIVERSAL RULES (typed config)  → from blogConfig.styleRules / seoRules / cta
 *      Rules that apply to every post regardless of writer: anti-AI-smell,
 *      banned phrases, SEO output rules, CTA mapping, JSON output schema.
 *
 * To customize the system: edit ecosystem.md, edit writers/*.md, and tweak the
 * lists in blog-config.ts. You should not need to touch this file.
 */
export function buildSystemPrompt(writer: WriterConfig): string {
  const cfg = blogConfig;

  const ecosystem = loadMd(cfg.ecosystemFile).trim();
  const persona = loadMd(writer.personaFile).trim();

  const ctaBlock = cfg.cta.mappings
    .map((m) => `For posts about ${m.topics}:\n  ${m.html}`)
    .join("\n\n");

  const styleRulesBlock = cfg.styleRules.map((r) => `- ${r}`).join("\n");
  const seoRulesBlock = cfg.seoRules.map((r, i) => `${i + 1}. ${r}`).join("\n");

  return `You are about to write a blog post in ${cfg.branding.languageName}, optimized for SEO.

The prompt has three sections:

# 1. The business you write for

${ecosystem}

---

# 2. The writer you are right now

${persona}

---

# 3. Universal rules for every post

## Output language and formatting
- Language: ${cfg.branding.languageName} with proper punctuation and accents (this prompt may have been written without diacritics for technical reasons; the OUTPUT must include all proper diacritics for the target language).
- Length: 800-2000 words.
- Content format: valid HTML.
- Use <h2> for main subheadings (NEVER h1). Use <h3> for sub-subheadings.
- Use <p>, <ul>, <ol>, <li>, <blockquote>, <strong>, <em>, <hr>, <table> when appropriate.
- Include 3-6 <h2> subheadings with varied keywords.
- NEVER use offensive language, drug references, or encourage excessive alcohol consumption.

## House style (applies regardless of writer persona)
${styleRulesBlock}

## How to introduce products
- The article must solve a real reader problem. The product appears as the SOLUTION, not as an ad.
- NEVER mention the product in the first paragraph. Build context first.
- The mention must feel natural, like a recommendation between friends or colleagues.
- Do NOT mix two products in the same article unless the comparison makes editorial sense.

## CTA (at least 1 per article)
Pick the CTA based on the article TOPIC:

${ctaBlock}

For general overview pieces (when more than one segment is covered):
  ${cfg.cta.fallback}

## SEO rules
${seoRulesBlock}

## Response format
Respond EXCLUSIVELY with valid JSON (no markdown code fences) in this structure:
{
  "title": "string (50-200 chars)",
  "slug": "string (url-safe, no accents)",
  "excerpt": "string (~160 chars)",
  "content": "string (valid HTML, 800-2000 words)",
  "tags": ["string", "string", "string"],
  "image_search_query": "string (2-4 keywords IN ENGLISH for Unsplash image search, e.g. 'nightclub party crowd' or 'event management dashboard')",
  "meta_title": "string (max 70 chars)",
  "meta_description": "string (max 160 chars)",
  "target_city": null,
  "target_state": null
}`;
}

interface QueuedTheme {
  theme: string;
  keyword: string;
  notes: string;
}

export function buildUserPrompt(
  categorySlug: string,
  categoryName: string,
  audience: Audience,
  existingTitles: string[],
  queued?: QueuedTheme
): string {
  const themes = blogConfig.themeBank[categorySlug] ?? [];
  const titlesList =
    existingTitles.length > 0
      ? existingTitles.map((t) => `- ${t}`).join("\n")
      : "(no previous posts)";

  const queueBlock = queued
    ? `## REQUIRED TOPIC (write about THIS specific theme):
Theme: ${queued.theme}
Primary SEO keyword: ${queued.keyword}
Context: ${queued.notes}
Use the keyword in the title, in the first paragraph, and in at least 2 <h2> subheadings.`
    : `## Suggested themes for inspiration (do NOT copy, use as a base):
${themes.map((t) => `- ${t}`).join("\n")}`;

  return `Write a blog article for the category "${categoryName}" (audience: ${audience.toUpperCase()}).

${queueBlock}

## Already-published posts (do NOT repeat these themes, create something NEW and DIFFERENT):
${titlesList}

Generate the article JSON now.`;
}
