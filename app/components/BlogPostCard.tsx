"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import posthog from "posthog-js";
import { formatPostDate, type BlogPostSummary } from "../lib/blog";

const BlogPostCard = ({ post }: { post: BlogPostSummary }) => {
  return (
    <Link
      href={`/blog/${post.slug}`}
      onClick={() =>
        posthog.capture("blog_article_opened", {
          article_slug: post.slug,
          article_category: post.category?.slug ?? null,
        })
      }
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-fresta bg-carvao transition-colors hover:border-palha"
    >
      {post.featured_image ? (
        <div className="relative h-48 overflow-hidden border-b border-fresta">
          <Image
            src={post.featured_image}
            alt={post.featured_image_alt ?? post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-7">
        <div className="mb-3 flex items-center justify-between gap-4">
          {post.category ? (
            <p className="annotation">{post.category.name}</p>
          ) : null}
          <time
            dateTime={post.published_at}
            className="annotation shrink-0 text-[0.65rem] normal-case tracking-normal"
          >
            {formatPostDate(post.published_at)}
          </time>
        </div>
        <h3 className="font-display text-xl font-semibold leading-snug text-areia">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-3 leading-relaxed text-palha">
          {post.excerpt}
        </p>
        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-urucum">
          Ler artigo
          <FiArrowRight className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
};

export default BlogPostCard;
