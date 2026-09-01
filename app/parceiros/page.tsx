import type { Metadata } from "next";
import { FiCheck } from "react-icons/fi";
import DevsSection from "../components/DevsSection";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import TrackedLink from "../components/TrackedLink";
import { site, whatsappUrl } from "../data/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Parceiros | Trabalhe Conosco ou Faça Parceria com a OCA",
  description:
    "A demanda que chega pela OCA é maior do que conseguimos atender. Devs entram para a rede de parceiros e recebem projetos; empresas fazem parcerias e patrocínios.",
  alternates: {
    canonical: "/parceiros",
  },
  openGraph: {
    title: "Parceiros | OCA Software House",
    description:
      "Devs recebem projetos repassados com escopo fechado; empresas fazem parcerias e patrocínios com quem é referência no Google e nas IAs.",
    url: "/parceiros",
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
      name: "Parceiros",
      item: `${site.url}/parceiros`,
    },
  ],
};

const proofPoints = [
  "Novos projetos chegam todos os dias, principalmente por recomendação de IAs como ChatGPT, Claude e Gemini",
  "Primeiro resultado orgânico do Google para as buscas do nosso mercado",
  "Quem nos procura chega qualificado: já viu portfólio, processo e conteúdo antes da primeira conversa",
];

const devBenefits = [
  "Projetos repassados com escopo e valor fechados: você entra para construir, não para negociar",
  "Sem plataforma, sem leilão de hora: relação direta com quem já qualificou o cliente",
  "Trabalho remoto, no seu ritmo, projeto a projeto",
  "Você cresce junto: bons parceiros recebem projetos maiores e recorrentes",
  "Vitrine de devs indicados: apareça no site da OCA e receba contato direto de quem procura um dev",
];

const devSteps = [
  {
    title: "Apresente-se",
    description:
      "Chama no WhatsApp com portfólio ou GitHub e conta sua stack e disponibilidade.",
  },
  {
    title: "Conversa técnica",
    description:
      "Um papo direto, de dev para dev, para entender o que você entrega bem.",
  },
  {
    title: "Entre na fila certa",
    description:
      "Quando chega projeto com a sua cara, você recebe o escopo e decide se topa.",
  },
];

const partnerBenefits = [
  "Parceria em produtos com potencial: para projetos promissores, vamos além do desenvolvimento",
  "Rede de indicação: quem indica projeto fechado participa do resultado",
  "Patrocínio e mídia: audiência crescente no blog e nos nossos produtos",
  "Co-desenvolvimento com quem mantém produtos reais em produção",
];

export default function PartnersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="pt-36 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="annotation mb-6">Parceiros / cresça com a gente</p>
            <h1 className="font-display max-w-3xl text-4xl font-semibold tracking-tight text-areia sm:text-6xl">
              Chega mais demanda do que conseguimos atender
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-palha sm:text-xl">
              Todos os dias, clientes encontram a OCA pelo Google e pelas IAs.
              É mais projeto do que o nosso time fixo dá conta, e é aí que você
              entra: como dev parceiro ou como empresa parceira.
            </p>
          </Reveal>

          <Reveal className="mt-12" delay={0.1}>
            <div className="rounded-lg border border-fresta bg-carvao p-6">
              <p className="annotation mb-4 text-urucum">
                Por que a demanda existe
              </p>
              <ul className="space-y-3">
                {proofPoints.map((point) => (
                  <li key={point} className="flex items-start gap-4">
                    <FiCheck className="mt-1 shrink-0 text-urucum" />
                    <span className="leading-relaxed text-palha">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-fresta bg-carvao py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Para devs / trabalhe conosco"
            title="Entre para a rede de parceiros"
            lede="Você entrega bem, mas o pipeline de clientes é zero? A gente tem o problema oposto. Projetos qualificados, com escopo e valor fechados, repassados direto para devs de confiança."
          />

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <Reveal>
              <ul className="space-y-5">
                {devBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-4">
                    <FiCheck className="mt-1 shrink-0 text-urucum" />
                    <span className="leading-relaxed text-palha">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-4">
                {devSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className="rounded-lg border border-fresta bg-terra p-5"
                  >
                    <p className="annotation text-urucum">
                      {String(index + 1).padStart(2, "0")} / {step.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-palha">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-12">
            <TrackedLink
              event="whatsapp_cta_clicked"
              eventProps={{ placement: "parceiros_devs" }}
              href={whatsappUrl(
                "Olá Lucas, sou dev e quero entrar para a rede de parceiros da OCA."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Quero entrar para a rede
            </TrackedLink>
          </Reveal>
        </div>
      </section>

      <DevsSection source="parceiros" className="border-b border-fresta py-24" />

      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Para empresas / patrocínio e parceria"
            title="Construa com quem já tem a audiência"
            lede="Se você quer investir em produto, indicar projetos ou colocar sua marca na frente de quem está construindo software, a conversa começa aqui."
          />

          <div className="grid grid-cols-1 gap-x-12 gap-y-5 md:grid-cols-2">
            {partnerBenefits.map((benefit) => (
              <Reveal key={benefit}>
                <div className="flex items-start gap-4">
                  <FiCheck className="mt-1 shrink-0 text-urucum" />
                  <span className="leading-relaxed text-palha">{benefit}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12">
            <TrackedLink
              event="whatsapp_cta_clicked"
              eventProps={{ placement: "parceiros_empresas" }}
              href={whatsappUrl(
                "Olá Lucas, quero conversar sobre uma parceria ou patrocínio com a OCA."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Propor parceria
            </TrackedLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
