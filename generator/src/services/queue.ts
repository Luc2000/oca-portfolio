import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export interface QueuedPost {
  theme: string;
  keyword: string;
  category: string;
  audience: "clientes" | "devs";
  notes: string;
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const QUEUE_PATH = resolve(__dirname, "../../post-queue.json");

export function loadQueue(): QueuedPost[] {
  try {
    const raw = readFileSync(QUEUE_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveQueue(queue: QueuedPost[]): void {
  writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2) + "\n");
}

/**
 * Takes the next post for a given audience and removes it from the queue.
 * Returns null if no posts left for that audience.
 */
export function takeNext(audience: "clientes" | "devs"): QueuedPost | null {
  const queue = loadQueue();
  const idx = queue.findIndex((p) => p.audience === audience);
  if (idx === -1) return null;

  const [item] = queue.splice(idx, 1);
  saveQueue(queue);
  return item;
}
