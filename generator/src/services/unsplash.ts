import { config } from "../config.js";

interface UnsplashImage {
  url: string;
  alt: string;
}

/**
 * Unsplash's catalog is indexed in English, so results are dramatically better
 * with English keywords. The model already provides an English `image_search_query`
 * (primary signal); this dictionary translates article tags as a fallback.
 */
const SOURCE_TO_EN: Record<string, string> = {
  "inteligência artificial": "artificial intelligence",
  "desenvolvimento de aplicativos": "mobile app development",
  "desenvolvimento de software": "software development",
  "software sob medida": "custom software",
  "aplicativo": "mobile app",
  "automação": "automation",
  "chatbot": "chatbot",
  "startup": "startup",
  "empreendedorismo": "entrepreneurship",
  "negócios": "business",
  "tecnologia": "technology",
  "sistema web": "web dashboard",
  "programação": "programming",
  "equipe": "team",
  "mvp": "startup product launch",
  "ia": "artificial intelligence",
};

/**
 * Translate source-language keywords to English for Unsplash search.
 * Matches known terms and passes through unrecognized words.
 */
function translateToEnglish(query: string): string {
  let translated = query.toLowerCase();
  // Replace known phrases (longest first to match multi-word terms)
  const sorted = Object.entries(SOURCE_TO_EN).sort(
    ([a], [b]) => b.length - a.length
  );
  for (const [source, en] of sorted) {
    translated = translated.replaceAll(source, en);
  }
  return translated.trim();
}

/**
 * Search Unsplash for a relevant blog cover image.
 * Returns null if no access key is configured or no results found.
 */
async function fetchUnsplash(query: string): Promise<UnsplashImage | null> {
  const params = new URLSearchParams({
    query,
    orientation: "landscape",
    per_page: "1",
  });

  const res = await fetch(`https://api.unsplash.com/search/photos?${params}`, {
    headers: {
      Authorization: `Client-ID ${config.unsplash.accessKey}`,
    },
  });

  if (!res.ok) {
    console.warn(`  Unsplash API error: ${res.status}`);
    return null;
  }

  const data = await res.json();
  const photo = data.results?.[0];

  if (!photo) return null;

  return {
    url: photo.urls.regular,
    alt: photo.alt_description || photo.description || query,
  };
}

/**
 * Search Unsplash for a relevant blog cover image.
 * Uses the English query from Claude if available, otherwise translates PT tags.
 */
export async function searchImage(
  tagsQuery: string,
  englishQuery?: string | null
): Promise<UnsplashImage | null> {
  if (!config.unsplash.accessKey) {
    return null;
  }

  try {
    // 1. Try Claude's English query first (best option)
    if (englishQuery) {
      console.log(`  Unsplash search (Claude EN): "${englishQuery}"`);
      const result = await fetchUnsplash(englishQuery);
      if (result) return result;
      console.warn(`  No results for Claude query, trying translation...`);
    }

    // 2. Translate source-language tags to English
    const translated = translateToEnglish(tagsQuery);
    console.log(`  Unsplash search (translated): "${translated}"`);
    const result = await fetchUnsplash(translated);
    if (result) return result;

    // 3. Last-resort generic fallback
    console.warn(`  No results for translated query, using fallback...`);
    return await fetchUnsplash("software development team");
  } catch (err) {
    console.warn(`  Unsplash fetch failed:`, err);
    return null;
  }
}
