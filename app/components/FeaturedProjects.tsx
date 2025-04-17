"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const projects = [
  {
    id: "revo",
    title: "Aplicativo REVO",
    description:
      "Aplicativo inovador que mira o nicho de baladas tendo vendas de ingressos com sistema completo de seleção e checkout, preços dinâmicos, códigos secretos para acesso exclusivo, integração com gateway de pagamento (Pagarme), backend robusto com Supabase, analytics com Amplitude, suporte a múltiplos idiomas, gerenciamento de estado com Zustand e interface moderna com gradientes e animações.",
    image: "/images/projetos/revo/revo-app.png",
    tags: [
      "React Native",
      "Styled Components",
      "Zustand",
      "Typescript",
      "Expo",
      "Supabase",
      "Pagar.me",
      "Amplitude",
    ],
    link: "/projetos/revo",
  },
  {
    id: "vipou",
    title: "Vipou Dashboard",
    description:
      "Plataforma administrativa para gestão de eventos, controle de acesso e análise de dados em tempo real para promoters e casas noturnas, com autenticação segura e visualização de métricas.",
    image: "/images/projetos/vipou/vipou.png",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    link: "/projetos/vipou",
  },
  {
    id: "meyu",
    title: "Meyu Menu Digital",
    description:
      "Sistema de cardápio digital para restaurantes com QR Code, gestão de pedidos, e integração com sistemas de PDV.",
    image: "/images/projetos/meyu/meyu.png",
    tags: [
      "React",
      "Firebase",
      "Styled Components",
      "PWA",
      "Typescript",
      "Pagar.me",
      "Supabase",
      "Zustand",
      "Realtime Database",
    ],
    link: "/projetos/meyu",
  },
  {
    id: "delta",
    title: "Delta Stats",
    description:
      "Ferramenta de análise de dados e estatísticas para traders sincronizado com dados históricos de preços de ações.",
    image: "/images/projetos/delta/delta.png",
    tags: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "ChartJS",
      "Typescript",
      "Python",
    ],
    link: "/projetos/delta",
  },
];

const FeaturedProjects = () => {
  return (
    <section className="py-20 bg-gray-900" id="projects">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Projetos{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Recentes
            </span>
          </h2>
          <p className="text-lg text-gray-300">
            Alguns dos projetos que desenvolvemos recentemente para nossos
            clientes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative h-64">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.title} thumbnail`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-500">
                    Imagem em breve
                  </div>
                )}
              </div>
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs py-1 px-2 bg-blue-900/40 text-blue-300 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link
                  href={project.link}
                  className="group inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span className="mr-2">Ver projeto</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="/projetos"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:opacity-90 transition-opacity"
          >
            Ver todos os projetos
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
