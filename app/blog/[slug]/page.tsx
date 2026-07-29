import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import Reveal from "../../components/Reveal";
import BlogPostCard from "../../components/BlogPostCard";
import ContactCTA from "../../components/ContactCTA";
import {
  formatPostDate,
  getPost,
  getPublishedPosts,
  getRelatedPosts,
  readingTimeMinutes,
} from "../../lib/blog";
import { site } from "../../data/site";

export const revalidate = 3600;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPublishedPosts(100);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const description = post.meta_description ?? post.excerpt;

  return {
    title: post.meta_title ?? post.title,
    description,
    authors: [{ name: post.author_name }],
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.meta_title ?? post.title,
      description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      authors: [post.author_name],
      images: post.featured_image
        ? [{ url: post.featured_image, alt: post.featured_image_alt ?? post.title }]
        : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post);
  const readingTime = readingTimeMinutes(post.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${site.url}/blog/${post.slug}#article`,
        headline: post.title,
        description: post.meta_description ?? post.excerpt,
        image: post.featured_image ?? undefined,
        datePublished: post.published_at,
        dateModified: post.updated_at,
        inLanguage: "pt-BR",
        author: {
          "@type": "Person",
          name: post.author_name,
        },
        publisher: { "@id": `${site.url}/#organization` },
        mainEntityOfPage: `${site.url}/blog/${post.slug}`,
        keywords: post.tags.join(", "),
        articleSection: post.category?.name,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${site.url}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: `${site.url}/blog/${post.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="pt-28 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Link
            href="/blog"
            className="annotation inline-flex items-center gap-2 transition-colors hover:text-areia"
          >
            <FiArrowLeft />
            Voltar para o blog
          </Link>

          {post.category ? (
            <p className="annotation mt-10 mb-4 text-urucum">
              <Link
                href={`/blog/categoria/${post.category.slug}`}
                className="transition-colors hover:text-urucum-claro"
              >
                {post.category.name}
              </Link>
            </p>
          ) : null}
          <h1 className="font-display text-3xl font-semibold tracking-tight text-areia sm:text-5xl sm:leading-tight">
            {post.title}
          </h1>
          <p className="annotation mt-6 normal-case tracking-normal">
            {post.author_name} ·{" "}
            <time dateTime={post.published_at}>
              {formatPostDate(post.published_at)}
            </time>{" "}
            · {readingTime} min de leitura
          </p>
        </Reveal>

        {post.featured_image ? (
          <Reveal className="mt-10" delay={0.1}>
            <div className="relative h-[240px] overflow-hidden rounded-lg border border-fresta sm:h-[400px]">
              <Image
                src={post.featured_image}
                alt={post.featured_image_alt ?? post.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        ) : null}

        <Reveal className="mt-12" delay={0.15}>
          <div
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </Reveal>

        {post.tags.length > 0 ? (
          <Reveal className="mt-12">
            <div className="flex flex-wrap gap-2 border-t border-fresta pt-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="annotation rounded border border-fresta px-2.5 py-1 text-[0.65rem]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        ) : null}
      </article>

      {relatedPosts.length > 0 ? (
        <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-10 flex items-center gap-4">
              <h2 className="annotation shrink-0">Leia também</h2>
              <span aria-hidden="true" className="block h-px flex-1 bg-fresta" />
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relatedPost, index) => (
              <Reveal key={relatedPost.id} delay={0.05 * index}>
                <BlogPostCard post={relatedPost} />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-20">
        <ContactCTA />
      </div>
    </div>
  );
}
