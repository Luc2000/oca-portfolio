"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects, categories, type ProjectCategory } from "../data/projects";

const ProjectsGrid = () => {
  const [selected, setSelected] = useState<ProjectCategory | "all">("all");

  const filtered =
    selected === "all"
      ? projects
      : projects.filter((project) => project.category === selected);

  return (
    <div>
      <div
        role="group"
        aria-label="Filtrar projetos por categoria"
        className="mb-12 flex flex-wrap gap-3"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelected(category.id)}
            aria-pressed={selected === category.id}
            className={`annotation rounded border px-4 py-2.5 transition-colors ${
              selected === category.id
                ? "border-urucum text-urucum"
                : "border-fresta hover:border-palha hover:text-areia"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProjectsGrid;
