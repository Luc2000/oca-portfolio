import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import Reveal from "../../../components/Reveal";
import BlogPostGrid from "../../../components/BlogPostGrid";
import ContactCTA from "../../../components/ContactCTA";
import Pagination from "../../../components/Pagination";
import { getCategories, getCategory, getPostsPage } from "../../../lib/blog";
import { site } from "../../../data/site";
import { pageMetadata } from "../../../lib/seo";

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

  return pageMetadata({
    title: `${category.name} | Blog`,
    description: `Artigos sobre ${category.name.toLowerCase()}: guias práticos escritos pela equipe da OCA Software House.`,
    path: `/blog/categoria/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();

  const { posts, totalPages } = await getPostsPage(1, category.id);

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
          <BlogPostGrid
            posts={posts}
            emptyMessage="Ainda não há artigos nesta categoria. Volte em breve."
          />
          <Pagination
            basePath={`/blog/categoria/${category.slug}`}
            page={1}
            totalPages={totalPages}
          />
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
