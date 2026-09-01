import Link from "next/link";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import DevDisclaimer from "./DevDisclaimer";
import DevsShowcase from "./DevsShowcase";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
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
const DevsSection = async ({
  source,
  className = "border-y border-fresta bg-carvao py-24",
}: DevsSectionProps) => {
  const devs = await getActiveDevs();
  if (devs.length === 0) return null;

  return (
    <section className={className} id="devs">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Devs indicados"
          title="Precisa de um dev direto, sem a OCA no meio?"
          lede="Profissionais independentes que conhecemos e indicamos. Você fala e negocia direto com eles, com custo menor do que contratar a software house."
        />

        <Reveal>
          <DevDisclaimer className="mb-10" />
        </Reveal>

        <Reveal delay={0.1}>
          <DevsShowcase devs={devs} source={source} />
        </Reveal>

        <Reveal className="mt-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/devs" className="btn-secondary">
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
              É dev e quer aparecer aqui? Fale com a OCA
              <FiArrowUpRight className="text-urucum" />
            </TrackedLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default DevsSection;
