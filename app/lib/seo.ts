import type { Metadata } from "next";
import type { FaqItem } from "../data/faq";
import { site } from "../data/site";

interface SocialImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

interface PageMetadataInput {
  /* Without the brand suffix, the root layout template adds it */
  title: string;
  description: string;
  /* Canonical path, starting with "/" */
  path: string;
  image?: SocialImage;
  /* Path of the page's Markdown version, advertised as an alternate */
  markdownPath?: string;
  /* Present on blog posts: switches the card to og:type article */
  article?: {
    publishedTime: string;
    modifiedTime: string;
    authors: string[];
  };
}

export const defaultSocialImage: SocialImage = {
  url: "/images/og-image.png",
  alt: site.name,
  width: 1200,
  height: 630,
};

// Next replaces (does not merge) openGraph and twitter per segment, so every
// page has to restate the shared fields or it loses the image and site name.
export function pageMetadata({
  title,
  description,
  path,
  image = defaultSocialImage,
  markdownPath,
  article,
}: PageMetadataInput): Metadata {
  const shared = {
    title,
    description,
    url: path,
    siteName: site.name,
    locale: "pt_BR",
    images: [image],
  };

  return {
    title,
    description,
    alternates: {
      canonical: path,
      types: markdownPath ? { "text/markdown": markdownPath } : undefined,
    },
    openGraph: article
      ? { ...shared, type: "article", ...article }
      : { ...shared, type: "website" },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}

/* FAQPage node without @context, so it fits both a standalone script and a @graph */
export function faqPageSchema(items: FaqItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
