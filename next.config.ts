import type { NextConfig } from "next";
import blogRedirects from "./app/data/blog-redirects.json";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Partner dev photos: Supabase Storage or GitHub avatars
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  // Duplicate blog posts consolidated into one canonical post per topic (SEO, 14/11/2026)
  async redirects() {
    return blogRedirects.map(({ from, to }) => ({
      source: `/blog/${from}`,
      destination: `/blog/${to}`,
      permanent: true,
    }));
  },
  // First-party proxy for PostHog so ad blockers don't drop events
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  // Required by PostHog: its API calls use trailing slashes
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
