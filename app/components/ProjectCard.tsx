import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { categoryLabels, type Project } from "../data/projects";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
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
        <p className="annotation mb-3">{categoryLabels[project.category]}</p>
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
  );
};

export default ProjectCard;
