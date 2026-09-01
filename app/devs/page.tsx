import type { Metadata } from "next";
import { FiArrowUpRight } from "react-icons/fi";
import ContactCTA from "../components/ContactCTA";
import DevDisclaimer from "../components/DevDisclaimer";
import DevsGrid from "../components/DevsGrid";
import { devListingWhatsappMessage } from "../components/DevsSection";
import Reveal from "../components/Reveal";
import TrackedLink from "../components/TrackedLink";
import { getActiveDevs } from "../lib/devs";
import { whatsappUrl } from "../data/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Devs Indicados | Profissionais Independentes Recomendados pela OCA",
  description:
    "Devs independentes que a OCA conhece e indica. Fale direto com o profissional, negocie direto e pague menos do que contratando uma software house.",
  alternates: {
    canonical: "/devs",
  },
  openGraph: {
    title: "Devs Indicados | OCA Software House",
    description:
      "Devs independentes que a OCA conhece e indica. Contato e negociação direto com o profissional.",
    url: "/devs",
  },
};

export default async function DevsPage() {
  const devs = await getActiveDevs();

  return (
    <>
      <section className="pt-36 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="annotation mb-6">Devs indicados / contato direto</p>
            <h1 className="font-display max-w-3xl text-4xl font-semibold tracking-tight text-areia sm:text-6xl">
              Devs independentes que a OCA indica
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-palha sm:text-xl">
              Quando o projeto pede um profissional direto, sem software house
              no meio, estes são os devs que conhecemos e recomendamos. Você
              fala e negocia direto com eles.
            </p>
          </Reveal>

          <Reveal className="mt-12" delay={0.1}>
            <DevDisclaimer variant="full" />
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {devs.length > 0 ? (
            <DevsGrid devs={devs} />
          ) : (
            <Reveal>
              <p className="annotation">
                A vitrine ainda está na prancheta. Volte em breve.
              </p>
            </Reveal>
          )}
        </div>
      </section>

      <section className="border-y border-fresta bg-carvao py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="annotation mb-3">Para devs / apareça aqui</p>
                <h2 className="font-display text-2xl font-semibold text-areia sm:text-3xl">
                  É dev e quer estar nesta vitrine?
                </h2>
                <p className="mt-3 max-w-xl leading-relaxed text-palha">
                  Quem procura a OCA no Google e nas IAs passa por aqui todos os
                  dias. Fale com a gente e entenda como entrar.
                </p>
              </div>
              <TrackedLink
                event="whatsapp_cta_clicked"
                eventProps={{ placement: "devs_listing_index" }}
                href={whatsappUrl(devListingWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary shrink-0"
              >
                Falar com a OCA
                <FiArrowUpRight />
              </TrackedLink>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
