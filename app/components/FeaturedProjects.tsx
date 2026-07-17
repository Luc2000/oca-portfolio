import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";

const FeaturedProjects = () => {
  const featured = projects.filter((project) => project.featured);

  return (
    <section className="py-24" id="projetos">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Projetos em produção"
          title="Produtos reais, com usuários e pagamentos reais"
          lede="Uma amostra do que já saiu da prancheta: o ecossistema Revo, construído do zero pela OCA, e projetos para clientes."
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {featured.map((project, index) => (
            <Reveal key={project.slug} delay={(index % 2) * 0.1}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center" delay={0.1}>
          <Link href="/projetos" className="btn-secondary">
            Ver todos os projetos
            <FiArrowRight />
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default FeaturedProjects;
