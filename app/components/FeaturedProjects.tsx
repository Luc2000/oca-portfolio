import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { projects } from "../data/projects";

const categoryLabels: Record<string, string> = {
  mobile: "App mobile",
  web: "Aplicação web",
  data: "Análise de dados",
};

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
              <Link
                href={`/projetos/${project.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-fresta bg-carvao transition-colors hover:border-palha"
              >
                <div className="relative h-64 overflow-hidden border-b border-fresta">
                  <Image
                    src={project.image}
                    alt={`Tela do projeto ${project.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="annotation mb-3">
                    {categoryLabels[project.category]}
                  </p>
                  <h3 className="font-display text-2xl font-semibold text-areia">
                    {project.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 leading-relaxed text-palha">
                    {project.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.slice(0, 5).map((tag) => (
                      <span
                        key={tag}
                        className="annotation rounded border border-fresta px-2.5 py-1 text-[0.65rem]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-urucum">
                    Ver projeto
                    <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
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
