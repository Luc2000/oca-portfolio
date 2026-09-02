import Link from "next/link";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import DevDisclaimer from "./DevDisclaimer";
import DevsShowcase from "./DevsShowcase";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import TrackedLink from "./TrackedLink";
import { getActiveDevs } from "../lib/devs";
import { whatsappUrl } from "../data/site";

interface DevsSectionProps {
  source: "home" | "parceiros";
  className?: string;
}

export const devListingWhatsappMessage =
  "Olá Lucas, sou dev e quero aparecer na vitrine de devs indicados da OCA.";

// Renders nothing while there is no active dev, so pages stay unchanged
const DevsSection = async ({ source, className = "py-24" }: DevsSectionProps) => {
  const devs = await getActiveDevs();
  if (devs.length === 0) return null;

  return (
    <section className={className} id="devs">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel className="mb-4">
            Devs indicados / rede independente
          </SectionLabel>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-areia sm:text-4xl lg:col-span-6">
              Devs que a gente indica
            </h2>
            <div className="lg:col-span-6">
              <p className="text-lg leading-relaxed text-palha">
                Profissionais independentes para quem prefere contratar direto.
                Você fala, negocia e fecha com o dev.
              </p>
              <DevDisclaimer className="mt-3" />
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-10" delay={0.1}>
          <DevsShowcase devs={devs} source={source} />
        </Reveal>

        <Reveal className="mt-8">
          <div className="flex flex-col gap-4 border-t border-fresta pt-6 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/devs"
              className="inline-flex items-center gap-2 font-medium text-areia transition-colors hover:text-urucum"
            >
              Ver todos os devs
              <FiArrowRight />
            </Link>
            <TrackedLink
              event="whatsapp_cta_clicked"
              eventProps={{ placement: `devs_listing_${source}` }}
              href={whatsappUrl(devListingWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-palha transition-colors hover:text-areia"
            >
              É dev? Apareça aqui
              <FiArrowUpRight className="text-urucum" />
            </TrackedLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default DevsSection;
