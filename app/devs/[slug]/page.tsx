import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { IconType } from "react-icons";
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiExternalLink,
  FiGithub,
  FiGlobe,
  FiLinkedin,
  FiMail,
  FiMapPin,
} from "react-icons/fi";
import ContactCTA from "../../components/ContactCTA";
import DevDisclaimer from "../../components/DevDisclaimer";
import Reveal from "../../components/Reveal";
import TrackedLink from "../../components/TrackedLink";
import {
  devLocation,
  devWhatsappUrl,
  getActiveDevs,
  getDev,
  type PartnerDev,
} from "../../lib/devs";

export const revalidate = 3600;

interface DevPageProps {
  params: Promise<{ slug: string }>;
}

interface DevLink {
  channel: string;
  label: string;
  href: string;
  Icon: IconType;
}

function externalLinks(dev: PartnerDev): DevLink[] {
  const links: DevLink[] = [];
  if (dev.github_url) {
    links.push({ channel: "github", label: "GitHub", href: dev.github_url, Icon: FiGithub });
  }
  if (dev.linkedin_url) {
    links.push({ channel: "linkedin", label: "LinkedIn", href: dev.linkedin_url, Icon: FiLinkedin });
  }
  if (dev.website_url) {
    links.push({ channel: "website", label: "Site", href: dev.website_url, Icon: FiGlobe });
  }
  return links;
}

export async function generateStaticParams() {
  const devs = await getActiveDevs();
  return devs.map((dev) => ({ slug: dev.slug }));
}

export async function generateMetadata({
  params,
}: DevPageProps): Promise<Metadata> {
  const { slug } = await params;
  const dev = await getDev(slug);
  if (!dev) return {};

  const description = `${dev.headline}. Dev independente indicado pela OCA: contato e negociação direto com o profissional.`;

  return {
    title: `${dev.name} | Dev Indicado`,
    description,
    alternates: {
      canonical: `/devs/${dev.slug}`,
    },
    openGraph: {
      title: `${dev.name}, ${dev.headline}`,
      description,
      url: `/devs/${dev.slug}`,
      type: "profile",
      images: [{ url: dev.photo_url, alt: `Foto de ${dev.name}` }],
    },
  };
}

export default async function DevPage({ params }: DevPageProps) {
  const { slug } = await params;
  const dev = await getDev(slug);
  if (!dev) notFound();

  const location = devLocation(dev);
  const links = externalLinks(dev);
  const contactProps = (channel: string) => ({ dev_slug: dev.slug, channel });

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Link
            href="/devs"
            className="annotation inline-flex items-center gap-2 transition-colors hover:text-areia"
          >
            <FiArrowLeft />
            Voltar para devs indicados
          </Link>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">
          <div>
            <Reveal>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-lg border border-fresta">
                  <Image
                    src={dev.photo_url}
                    alt={`Foto de ${dev.name}`}
                    fill
                    sizes="128px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div>
                  <p className="annotation text-urucum">Indicado pela OCA</p>
                  <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-areia sm:text-5xl">
                    {dev.name}
                  </h1>
                  <p className="mt-3 text-lg text-palha">{dev.headline}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-palha">
                    <span className="inline-flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className={`h-2 w-2 rounded-full ${dev.available ? "bg-emerald-400" : "bg-palha"}`}
                      />
                      {dev.available ? "Disponível para projetos" : "Ocupado no momento"}
                    </span>
                    {location ? (
                      <span className="inline-flex items-center gap-2">
                        <FiMapPin />
                        {location}
                      </span>
                    ) : null}
                    {dev.price_label ? (
                      <span className="text-areia">{dev.price_label}</span>
                    ) : null}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal className="mt-12">
              <h2 className="annotation mb-4">Sobre</h2>
              <p className="whitespace-pre-line text-lg leading-relaxed text-palha">
                {dev.bio}
              </p>
            </Reveal>

            {dev.stack.length > 0 ? (
              <Reveal className="mt-12">
                <h2 className="annotation mb-4">Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {dev.stack.map((tag) => (
                    <span
                      key={tag}
                      className="annotation rounded border border-fresta px-2.5 py-1 text-[0.65rem]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Reveal>
            ) : null}

            {dev.projects.length > 0 ? (
              <Reveal className="mt-12">
                <h2 className="annotation mb-4">Projetos</h2>
                <ul className="divide-y divide-fresta border-y border-fresta">
                  {dev.projects.map((project) => (
                    <li
                      key={project.name}
                      className="flex items-start justify-between gap-6 py-5"
                    >
                      <div>
                        <h3 className="font-display text-lg font-semibold text-areia">
                          {project.name}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-palha">
                          {project.description}
                        </p>
                      </div>
                      {project.url ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Abrir ${project.name}`}
                          className="mt-1 shrink-0 text-palha transition-colors hover:text-urucum"
                        >
                          <FiExternalLink />
                        </a>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}
          </div>

          <aside className="space-y-6 self-start lg:sticky lg:top-28">
            <Reveal delay={0.1}>
              <div className="rounded-lg border border-fresta bg-carvao p-6">
                <p className="annotation mb-5">Contato direto</p>
                <TrackedLink
                  event="dev_contact_clicked"
                  eventProps={contactProps("whatsapp")}
                  href={devWhatsappUrl(dev)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full"
                >
                  Chamar no WhatsApp
                  <FiArrowUpRight />
                </TrackedLink>
                {dev.email ? (
                  <TrackedLink
                    event="dev_contact_clicked"
                    eventProps={contactProps("email")}
                    href={`mailto:${dev.email}`}
                    className="btn-secondary mt-3 w-full"
                  >
                    <FiMail />
                    Enviar e-mail
                  </TrackedLink>
                ) : null}
                {links.length > 0 ? (
                  <div className="mt-5 flex gap-3">
                    {links.map((link) => (
                      <TrackedLink
                        key={link.channel}
                        event="dev_contact_clicked"
                        eventProps={contactProps(link.channel)}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        className="flex h-10 w-10 items-center justify-center rounded-md border border-fresta text-palha transition-colors hover:border-palha hover:text-areia"
                      >
                        <link.Icon />
                      </TrackedLink>
                    ))}
                  </div>
                ) : null}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <DevDisclaimer variant="full" />
            </Reveal>
          </aside>
        </div>
      </div>

      <div className="mt-20">
        <ContactCTA />
      </div>
    </div>
  );
}
