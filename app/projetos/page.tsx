import type { Metadata } from "next";
import { FiLock } from "react-icons/fi";
import Reveal from "../components/Reveal";
import ProjectsGrid from "../components/ProjectsGrid";
import ContactCTA from "../components/ContactCTA";
import { ndaProjects } from "../data/projects";

export const metadata: Metadata = {
  title: "Projetos | Portfólio de Desenvolvimento de Software",
  description:
    "Conheça os produtos que a OCA construiu e mantém em produção: aplicativos mobile, sistemas web e plataformas de dados com React Native, Next.js e mais.",
  alternates: {
    canonical: "/projetos",
  },
  openGraph: {
    title: "Projetos | OCA Software House",
    description:
      "Conheça os produtos que a OCA construiu e mantém em produção: aplicativos mobile, sistemas web e plataformas de dados.",
    url: "/projetos",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <section className="pt-36 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="annotation mb-6">Portfólio / em produção</p>
            <h1 className="font-display max-w-3xl text-4xl font-semibold tracking-tight text-areia sm:text-6xl">
              O que já saiu da prancheta
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-palha sm:text-xl">
              Produtos construídos de ponta a ponta pela OCA, rodando hoje com
              usuários e pagamentos reais.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ProjectsGrid />
        </div>
      </section>

      {/* NDA projects */}
      <section className="border-t border-fresta py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-14 flex items-center gap-4">
              <span className="annotation shrink-0">Sob NDA</span>
              <span aria-hidden="true" className="block h-px flex-1 bg-fresta" />
            </div>
            <p className="mb-12 max-w-2xl text-lg leading-relaxed text-palha">
              Parte do nosso trabalho é protegida por acordos de
              confidencialidade. Estes são os contornos do que podemos mostrar;
              os detalhes ficam para uma conversa privada.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ndaProjects.map((project, index) => (
              <Reveal key={project.title} delay={(index % 3) * 0.08}>
                <div className="flex h-full flex-col rounded-lg border border-dashed border-fresta p-6">
                  <div className="mb-4 flex items-center gap-2 text-palha">
                    <FiLock className="text-urucum" />
                    <span className="annotation">Projeto confidencial</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-areia">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-palha">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="annotation rounded border border-dashed border-fresta px-2 py-0.5 text-[0.6rem]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
