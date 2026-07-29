import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import Reveal from "../../../components/Reveal";
import BlogPostCard from "../../../components/BlogPostCard";
import ContactCTA from "../../../components/ContactCTA";
import {
  getCategories,
  getCategory,
  getPostsByCategory,
} from "../../../lib/blog";
import { site } from "../../../data/site";

export const revalidate = 3600;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return {};

  return {
    title: `${category.name} | Blog`,
    description: `Artigos sobre ${category.name.toLowerCase()}: guias práticos escritos pela equipe da OCA Software House.`,
    alternates: {
      canonical: `/blog/categoria/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} | Blog OCA Software House`,
      description: `Artigos sobre ${category.name.toLowerCase()}: guias práticos escritos pela equipe da OCA Software House.`,
      url: `/blog/categoria/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();

  const posts = await getPostsByCategory(category.id);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `${site.url}/blog/categoria/${category.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="pt-36 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Link
              href="/blog"
              className="annotation inline-flex items-center gap-2 transition-colors hover:text-areia"
            >
              <FiArrowLeft />
              Todos os artigos
            </Link>
            <p className="annotation mt-10 mb-6">Blog / categoria</p>
            <h1 className="font-display max-w-3xl text-4xl font-semibold tracking-tight text-areia sm:text-6xl">
              {category.name}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <Reveal key={post.id} delay={0.05 * (index % 3)}>
                  <BlogPostCard post={post} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <p className="annotation">
                Ainda não há artigos nesta categoria. Volte em breve.
              </p>
            </Reveal>
          )}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
