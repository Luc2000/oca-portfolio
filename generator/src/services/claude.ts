import { execFile } from "node:child_process";
import { buildSystemPrompt, buildUserPrompt } from "../prompts/blog-prompt.js";
import type { Audience, WriterConfig } from "../utils/schedule.js";

export interface GeneratedPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  image_search_query: string | null;
  meta_title: string;
  meta_description: string;
  target_city: string | null;
  target_state: string | null;
}

/**
 * Calls the `claude` CLI in print mode (-p) using the user's Max subscription.
 * No API key needed.
 */
function runClaude(systemPrompt: string, userPrompt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const fullPrompt = `${systemPrompt}\n\n---\n\n${userPrompt}`;

    // Remove CLAUDECODE env var to allow running from within a Claude Code session
    const env = { ...process.env };
    delete env.CLAUDECODE;

    const child = execFile(
      "claude",
      ["-p", "--output-format", "text"],
      { maxBuffer: 5 * 1024 * 1024, timeout: 300_000, env },
      (error, stdout, stderr) => {
        if (error) {
          reject(new Error(`Claude CLI failed: ${error.message}\n${stderr}`));
          return;
        }
        resolve(stdout);
      }
    );

    child.stdin?.write(fullPrompt);
    child.stdin?.end();
  });
}

interface QueuedTheme {
  theme: string;
  keyword: string;
  notes: string;
}

export async function generateBlogPost(
  writer: WriterConfig,
  categorySlug: string,
  categoryName: string,
  audience: Audience,
  existingTitles: string[],
  queued?: QueuedTheme
): Promise<GeneratedPost> {
  const systemPrompt = buildSystemPrompt(writer);
  const userPrompt = buildUserPrompt(
    categorySlug,
    categoryName,
    audience,
    existingTitles,
    queued
  );

  console.log(`  Writer: ${writer.name} (${writer.slug})`);
  console.log("  Calling Claude CLI (Max subscription)...");

  const raw = await runClaude(systemPrompt, userPrompt);

  // Extract JSON from response (strip markdown fences if present)
  let json = raw.trim();
  if (json.startsWith("```")) {
    json = json.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  // Find the JSON object in the response
  const startIdx = json.indexOf("{");
  const endIdx = json.lastIndexOf("}");
  if (startIdx === -1 || endIdx === -1) {
    throw new Error(`Claude returned no JSON object. Raw output:\n${raw.slice(0, 500)}`);
  }
  json = json.slice(startIdx, endIdx + 1);

  const parsed: GeneratedPost = JSON.parse(json);

  if (!parsed.title || !parsed.slug || !parsed.content || !parsed.excerpt) {
    throw new Error("Claude returned incomplete post data");
  }

  console.log(`  Generated: "${parsed.title}"`);
  return parsed;
}
