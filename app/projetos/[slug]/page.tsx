import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiArrowUpRight, FiCheck } from "react-icons/fi";
import Reveal from "../../components/Reveal";
import { projects, getProject, categoryLabels } from "../../data/projects";
import { site, whatsappUrl } from "../../data/site";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.title} - ${project.subtitle}`,
    description: project.description,
    alternates: {
      canonical: `/projetos/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | OCA Software House`,
      description: project.description,
      url: `/projetos/${project.slug}`,
      images: [{ url: project.image, alt: `Tela do projeto ${project.title}` }],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projetos",
        item: `${site.url}/projetos`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${site.url}/projetos/${project.slug}`,
      },
    ],
  };

  return (
    <div className="pt-28 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Link
            href="/projetos"
            className="annotation inline-flex items-center gap-2 transition-colors hover:text-areia"
          >
            <FiArrowLeft />
            Voltar para projetos
          </Link>

          <p className="annotation mt-10 mb-4 text-urucum">
            {categoryLabels[project.category]}
          </p>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-areia sm:text-6xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-xl leading-relaxed text-palha sm:text-2xl">
            {project.subtitle}
          </p>
        </Reveal>

        <Reveal className="mt-12" delay={0.1}>
          <div className="overflow-hidden rounded-lg border border-fresta bg-carvao">
            <div className="relative h-[300px] w-full sm:h-[440px]">
              <Image
                src={project.images[0]}
                alt={`Tela do projeto ${project.title}`}
                fill
                sizes="(max-width: 1152px) 100vw, 1152px"
                className="object-cover object-top"
                priority
              />
            </div>
            {project.highlight ? (
              <p className="annotation border-t border-fresta px-6 py-4 text-urucum">
                {project.highlight}
              </p>
            ) : null}
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main column */}
          <div className="space-y-16 lg:col-span-2">
            <Reveal>
              <section>
                <div className="mb-8 flex items-center gap-4">
                  <h2 className="annotation shrink-0">Sobre o projeto</h2>
                  <span
                    aria-hidden="true"
                    className="block h-px flex-1 bg-fresta"
                  />
                </div>
                <div className="space-y-6">
                  {project.fullDescription.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 32)}
                      className="text-lg leading-relaxed text-palha"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <div className="mb-8 flex items-center gap-4">
                  <h2 className="annotation shrink-0">Desafios superados</h2>
                  <span
                    aria-hidden="true"
                    className="block h-px flex-1 bg-fresta"
                  />
                </div>
                <ul className="space-y-5">
                  {project.challenges.map((challenge) => (
                    <li key={challenge} className="flex items-start gap-4">
                      <FiCheck className="mt-1 shrink-0 text-urucum" />
                      <span className="leading-relaxed text-palha">
                        {challenge}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-8 lg:sticky lg:top-24">
              <Reveal delay={0.1}>
                <div className="rounded-lg border border-fresta bg-carvao p-6">
                  <h2 className="annotation mb-5">Stack</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="annotation rounded border border-fresta px-2.5 py-1 text-[0.65rem]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="rounded-lg border border-fresta bg-carvao p-6">
                  <h2 className="annotation mb-5">Funcionalidades</h2>
                  <ul className="space-y-3">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm leading-relaxed text-palha"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1 w-1 shrink-0 bg-urucum"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="space-y-3">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full"
                    >
                      {project.linkLabel ?? "Acessar o projeto"}
                      <FiArrowUpRight />
                    </a>
                  ) : null}
                  <a
                    href={whatsappUrl(
                      `Olá Lucas, vim pelo site da OCA e gostaria de discutir um projeto semelhante ao ${project.title}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full"
                  >
                    Quero algo assim
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
