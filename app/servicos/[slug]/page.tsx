import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiArrowRight, FiCheck } from "react-icons/fi";
import Reveal from "../../components/Reveal";
import TrackedLink from "../../components/TrackedLink";
import ProjectCard from "../../components/ProjectCard";
import { getService, services } from "../../data/services";
import { getProject } from "../../data/projects";
import { site, whatsappUrl } from "../../data/site";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: service.headline,
    description: service.summary,
    alternates: {
      canonical: `/servicos/${service.slug}`,
    },
    openGraph: {
      title: `${service.name} | OCA Software House`,
      description: service.summary,
      url: `/servicos/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const proofProjects = service.proofSlugs
    .map((projectSlug) => getProject(projectSlug))
    .filter((project) => project !== undefined);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${site.url}/servicos/${service.slug}#service`,
        name: service.headline,
        serviceType: service.name,
        description: service.summary,
        url: `${site.url}/servicos/${service.slug}`,
        provider: { "@id": `${site.url}/#organization` },
        areaServed: { "@type": "Country", name: "Brasil" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Serviços",
            item: `${site.url}/servicos`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.name,
            item: `${site.url}/servicos/${service.slug}`,
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

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Link
            href="/servicos"
            className="annotation inline-flex items-center gap-2 transition-colors hover:text-areia"
          >
            <FiArrowLeft />
            Todos os serviços
          </Link>

          <p className="annotation mt-10 mb-4 text-urucum">{service.name}</p>
          <h1 className="font-display max-w-3xl text-4xl font-semibold tracking-tight text-areia sm:text-6xl">
            {service.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-palha sm:text-xl">
            {service.lede}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <TrackedLink
              event="whatsapp_cta_clicked"
              eventProps={{
                placement: "service_page",
                service_slug: service.slug,
              }}
              href={whatsappUrl(service.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Iniciar conversa
            </TrackedLink>
            <Link href="/contato" className="btn-secondary">
              Enviar briefing
            </Link>
          </div>
        </Reveal>

        <Reveal className="mt-20">
          <section>
            <div className="mb-8 flex items-center gap-4">
              <h2 className="annotation shrink-0">O que entregamos</h2>
              <span aria-hidden="true" className="block h-px flex-1 bg-fresta" />
            </div>
            <ul className="grid grid-cols-1 gap-x-12 gap-y-5 md:grid-cols-2">
              {service.deliverables.map((deliverable) => (
                <li key={deliverable} className="flex items-start gap-4">
                  <FiCheck className="mt-1 shrink-0 text-urucum" />
                  <span className="leading-relaxed text-palha">
                    {deliverable}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal className="mt-20">
          <section>
            <div className="mb-8 flex items-center gap-4">
              <h2 className="annotation shrink-0">Como funciona</h2>
              <span aria-hidden="true" className="block h-px flex-1 bg-fresta" />
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {service.process.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-lg border border-fresta bg-carvao p-6"
                >
                  <p className="annotation text-urucum">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display mt-3 text-lg font-semibold text-areia">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-palha">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {proofProjects.length > 0 ? (
          <Reveal className="mt-20">
            <section>
              <div className="mb-8 flex items-center gap-4">
                <h2 className="annotation shrink-0">Prova em produção</h2>
                <span
                  aria-hidden="true"
                  className="block h-px flex-1 bg-fresta"
                />
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {proofProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </section>
          </Reveal>
        ) : null}

        <Reveal className="mt-20">
          <div className="flex flex-col items-start justify-between gap-6 rounded-lg border border-fresta bg-carvao p-8 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-2xl font-semibold text-areia">
                Quer se aprofundar antes de conversar?
              </h2>
              <p className="mt-2 leading-relaxed text-palha">
                Publicamos guias práticos sobre {service.blogCategoryName.toLowerCase()}{" "}
                no nosso blog.
              </p>
            </div>
            <Link
              href={`/blog/categoria/${service.blogCategorySlug}`}
              className="btn-secondary shrink-0"
            >
              Ler os artigos
              <FiArrowRight />
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
