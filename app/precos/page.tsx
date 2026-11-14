import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Reveal from "../components/Reveal";
import ContactCTA from "../components/ContactCTA";
import { services } from "../data/services";
import { site } from "../data/site";
import { pageMetadata } from "../lib/seo";

export const metadata = pageMetadata({
  title: "Quanto custa desenvolver software",
  description:
    "Quanto custa criar um aplicativo, um MVP, um sistema sob medida ou implementar IA: o que move o preço em cada tipo de projeto e os guias com as faixas.",
  path: "/precos",
});

const isPriceTopic = (text: string) =>
  text.toLowerCase().startsWith("quanto custa");

// Built from the services data: the price answers and price guides already published
const priceSections = services.map((service) => ({
  service,
  answers: service.faq.filter((item) => isPriceTopic(item.question)),
  guides: service.guides.filter((guide) => isPriceTopic(guide.title)),
}));

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "Preços",
      item: `${site.url}/precos`,
    },
  ],
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="pt-36 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="annotation mb-6">Preços / o que move o custo</p>
            <h1 className="font-display max-w-3xl text-4xl font-semibold tracking-tight text-areia sm:text-6xl">
              Quanto custa desenvolver software
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-palha sm:text-xl">
              O preço depende do escopo, e o escopo se define antes de
              qualquer linha de código. Aqui está o que move o custo em cada
              tipo de projeto e os guias com as faixas. A OCA envia a faixa do
              seu projeto depois de entender o que você quer construir, sem
              cobrar pela análise inicial.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-6xl space-y-16 px-4 sm:px-6 lg:px-8">
          {priceSections.map(({ service, answers, guides }) => (
            <Reveal key={service.slug}>
              <div className="mb-8 flex items-center gap-4">
                <h2 className="annotation shrink-0">{service.name}</h2>
                <span aria-hidden="true" className="block h-px flex-1 bg-fresta" />
              </div>

              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
                <div className="space-y-8">
                  {answers.map((item) => (
                    <div key={item.question}>
                      <h3 className="font-display text-2xl font-semibold text-areia">
                        {item.question}
                      </h3>
                      <p className="mt-3 leading-relaxed text-palha">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>

                <ul className="space-y-4">
                  {guides.map((guide) => (
                    <li key={guide.slug}>
                      <Link
                        href={`/blog/${guide.slug}`}
                        className="flex items-center justify-between gap-4 rounded-lg border border-fresta bg-carvao p-5 text-areia transition-colors hover:border-urucum"
                      >
                        <span className="leading-snug">{guide.title}</span>
                        <FiArrowRight className="shrink-0 text-urucum" />
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href={`/servicos/${service.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-urucum transition-colors hover:text-urucum-claro"
                    >
                      Ver o serviço: {service.name}
                      <FiArrowRight />
                    </Link>
                  </li>
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
