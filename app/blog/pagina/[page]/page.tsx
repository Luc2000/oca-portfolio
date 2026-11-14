import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import Reveal from "../../../components/Reveal";
import BlogPostGrid from "../../../components/BlogPostGrid";
import Pagination from "../../../components/Pagination";
import ContactCTA from "../../../components/ContactCTA";
import { getPostsPage, parsePageParam } from "../../../lib/blog";
import { pageMetadata } from "../../../lib/seo";

export const revalidate = 3600;

interface BlogPaginatedPageProps {
  params: Promise<{ page: string }>;
}

export async function generateStaticParams() {
  const { totalPages } = await getPostsPage(1);
  // Page 1 is /blog itself
  return Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export async function generateMetadata({
  params,
}: BlogPaginatedPageProps): Promise<Metadata> {
  const page = parsePageParam((await params).page);
  if (!page) return {};

  return pageMetadata({
    title: `Blog | Página ${page}`,
    description: `Página ${page} do blog da OCA Software House: guias práticos sobre aplicativos, MVPs, IA e software sob medida.`,
    path: `/blog/pagina/${page}`,
  });
}

export default async function BlogPaginatedPage({
  params,
}: BlogPaginatedPageProps) {
  const page = parsePageParam((await params).page);
  if (!page) notFound();
  if (page === 1) permanentRedirect("/blog");

  const { posts, totalPages } = await getPostsPage(page);
  if (posts.length === 0) notFound();

  return (
    <>
      <section className="pt-36 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Link
              href="/blog"
              className="annotation inline-flex items-center gap-2 transition-colors hover:text-areia"
            >
              <FiArrowLeft />
              Início do blog
            </Link>
            <p className="annotation mt-10 mb-6">
              Blog / página {page} de {totalPages}
            </p>
            <h1 className="font-display max-w-3xl text-4xl font-semibold tracking-tight text-areia sm:text-6xl">
              Todos os artigos
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <BlogPostGrid posts={posts} />
          <Pagination basePath="/blog" page={page} totalPages={totalPages} />
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
