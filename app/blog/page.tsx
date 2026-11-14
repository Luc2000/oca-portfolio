import Link from "next/link";
import Reveal from "../components/Reveal";
import BlogPostGrid from "../components/BlogPostGrid";
import ContactCTA from "../components/ContactCTA";
import { getCategories, getPublishedPosts } from "../lib/blog";
import { pageMetadata } from "../lib/seo";

export const revalidate = 3600;

export const metadata = pageMetadata({
  title: "Blog | Aplicativos, MVPs, IA e Software Sob Medida",
  description:
    "Guias práticos sobre como criar aplicativos, tirar MVPs do papel, aplicar IA em negócios e contratar software sob medida, escritos por quem constrói produto todos os dias.",
  path: "/blog",
});

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getPublishedPosts(),
    getCategories(),
  ]);

  return (
    <>
      <section className="pt-36 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="annotation mb-6">Blog / notas de quem constrói</p>
            <h1 className="font-display max-w-3xl text-4xl font-semibold tracking-tight text-areia sm:text-6xl">
              O que aprendemos construindo
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-palha sm:text-xl">
              Guias práticos sobre aplicativos, MVPs, IA e software sob medida,
              direto da prancheta para o seu projeto.
            </p>
          </Reveal>

          {categories.length > 0 ? (
            <Reveal className="mt-10" delay={0.1}>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/blog/categoria/${category.slug}`}
                    className="annotation rounded border border-fresta px-3 py-1.5 transition-colors hover:border-palha hover:text-areia"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </Reveal>
          ) : null}
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <BlogPostGrid
            posts={posts}
            emptyMessage="Os primeiros artigos ainda estão na prancheta. Volte em breve."
          />
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
