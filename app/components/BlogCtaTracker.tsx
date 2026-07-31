"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

interface BlogCtaTrackerProps {
  articleSlug: string;
  articleCategory: string | null;
}

// The post body is AI-generated HTML rendered server-side, so the CTA anchor
// inside it (.blog-cta-link) can't carry its own onClick. Delegate from document.
const BlogCtaTracker = ({ articleSlug, articleCategory }: BlogCtaTrackerProps) => {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest("a.blog-cta-link");
      if (!anchor) return;
      posthog.capture("blog_content_cta_clicked", {
        article_slug: articleSlug,
        article_category: articleCategory,
      });
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [articleSlug, articleCategory]);

  return null;
};

export default BlogCtaTracker;
