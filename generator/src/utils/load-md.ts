import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Load a markdown file relative to src/config/.
 * Used to inject ecosystem context and writer personas into prompts.
 */
export function loadMd(relativePath: string): string {
  const fullPath = resolve(__dirname, "../config", relativePath);
  return readFileSync(fullPath, "utf-8");
}
