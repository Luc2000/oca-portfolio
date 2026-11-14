import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import Reveal from "../../../../../components/Reveal";
import BlogPostGrid from "../../../../../components/BlogPostGrid";
import Pagination from "../../../../../components/Pagination";
import ContactCTA from "../../../../../components/ContactCTA";
import {
  getCategory,
  getPostsPage,
  parsePageParam,
} from "../../../../../lib/blog";
import { pageMetadata } from "../../../../../lib/seo";

export const revalidate = 3600;

interface CategoryPaginatedPageProps {
  params: Promise<{ slug: string; page: string }>;
}

// Empty on purpose: pages render on first request and are then cached (ISR)
export function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: CategoryPaginatedPageProps): Promise<Metadata> {
  const { slug, page: pageParam } = await params;
  const page = parsePageParam(pageParam);
  const category = await getCategory(slug);
  if (!page || !category) return {};

  return pageMetadata({
    title: `${category.name} | Blog | Página ${page}`,
    description: `Página ${page} dos artigos sobre ${category.name.toLowerCase()}: guias práticos escritos pela equipe da OCA Software House.`,
    path: `/blog/categoria/${category.slug}/pagina/${page}`,
  });
}

export default async function CategoryPaginatedPage({
  params,
}: CategoryPaginatedPageProps) {
  const { slug, page: pageParam } = await params;
  const page = parsePageParam(pageParam);
  const category = await getCategory(slug);
  if (!page || !category) notFound();

  const basePath = `/blog/categoria/${category.slug}`;
  if (page === 1) permanentRedirect(basePath);

  const { posts, totalPages } = await getPostsPage(page, category.id);
  if (posts.length === 0) notFound();

  return (
    <>
      <section className="pt-36 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Link
              href={basePath}
              className="annotation inline-flex items-center gap-2 transition-colors hover:text-areia"
            >
              <FiArrowLeft />
              Início da categoria
            </Link>
            <p className="annotation mt-10 mb-6">
              Blog / categoria / página {page} de {totalPages}
            </p>
            <h1 className="font-display max-w-3xl text-4xl font-semibold tracking-tight text-areia sm:text-6xl">
              {category.name}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <BlogPostGrid posts={posts} />
          <Pagination basePath={basePath} page={page} totalPages={totalPages} />
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
