const STOPWORDS = new Set(
  "a o as os de da do das dos e em um uma para pra por com sem que como qual quais sua seu suas seus no na nos nas ao aos 2025 2026 2027 guia completo voce".split(
    " "
  )
);

function tokens(text: string): Set<string> {
  const normalized = text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "");
  return new Set(
    (normalized.match(/[a-z0-9]+/g) ?? []).filter(
      (word) => word.length > 2 && !STOPWORDS.has(word)
    )
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let shared = 0;
  for (const word of a) if (b.has(word)) shared++;
  return shared / (a.size + b.size - shared);
}

/**
 * Returns the existing title that covers the same topic, or null.
 * Same thresholds used to consolidate the duplicates on 14/11/2026:
 * whole title >= 0.6, or the part before ":" >= 0.75.
 */
export function findSimilarTitle(title: string, existing: string[]): string | null {
  const full = tokens(title);
  const head = tokens(title.split(":")[0]);
  for (const other of existing) {
    if (jaccard(full, tokens(other)) >= 0.6) return other;
    if (jaccard(head, tokens(other.split(":")[0])) >= 0.75) return other;
  }
  return null;
}
