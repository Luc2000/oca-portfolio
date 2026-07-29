import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Reveal from "../components/Reveal";
import ContactCTA from "../components/ContactCTA";
import { services } from "../data/services";
import { site } from "../data/site";

export const metadata: Metadata = {
  title: "Serviços | Aplicativos, MVPs, IA e Software Sob Medida",
  description:
    "O que a OCA constrói: aplicativos mobile, MVPs para startups, IA aplicada a empresas e software sob medida. Proposta fechada, time senior, produtos em produção.",
  alternates: {
    canonical: "/servicos",
  },
  openGraph: {
    title: "Serviços | OCA Software House",
    description:
      "Aplicativos mobile, MVPs para startups, IA aplicada a empresas e software sob medida.",
    url: "/servicos",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "Serviços",
      item: `${site.url}/servicos`,
    },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="pt-36 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="annotation mb-6">Serviços / o que construímos</p>
            <h1 className="font-display max-w-3xl text-4xl font-semibold tracking-tight text-areia sm:text-6xl">
              Da ideia ao produto em produção
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-palha sm:text-xl">
              Quatro frentes, um mesmo padrão: proposta fechada, time senior e
              produto rodando com usuários reais.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={0.05 * (index % 2)}>
                <Link
                  href={`/servicos/${service.slug}`}
                  className="group flex h-full flex-col rounded-lg border border-fresta bg-carvao p-8 transition-colors hover:border-palha"
                >
                  <h2 className="font-display text-2xl font-semibold text-areia">
                    {service.name}
                  </h2>
                  <p className="mt-3 leading-relaxed text-palha">
                    {service.summary}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-urucum">
                    Ver serviço
                    <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
