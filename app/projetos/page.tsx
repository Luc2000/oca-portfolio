"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FiLock, FiArrowRight } from "react-icons/fi";

// Dados para projetos
const allProjects = [
  {
    id: "revo-app",
    title: "Revo App",
    description:
      "Aplicativo mobile para descoberta e compra de ingressos de eventos, com sistema completo de checkout, lotes dinâmicos, códigos secretos exclusivos e interface moderna com animações. Desenvolvido com React Native, Expo e backend Supabase.",
    image: "/images/projetos/revo/revo-app.png",
    tags: ["React Native", "Expo", "Supabase", "Zustand", "Pagarme"],
    category: "mobile",
  },
  {
    id: "vipou",
    title: "Vipou Dashboard",
    description:
      "Sistema de gerenciamento para o ecossistema Revo, permitindo a administração completa de eventos, ingressos, pagamentos e relatórios em tempo real.",
    image: "/images/projetos/vipou/vipou.png",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    category: "web",
  },
  {
    id: "meyu",
    title: "Meyu Menu Digital",
    description:
      "Sistema de menu digital integrado ao ecossistema Revo, que permite restaurantes e bares gerenciarem seus cardápios digitalmente com integração ao sistema de pedidos.",
    image: "/images/projetos/meyu/meyu.png",
    tags: ["React", "Firebase", "Styled Components", "PWA", "Supabase"],
    category: "web",
  },
  {
    id: "delta-stats",
    title: "Delta Stats",
    description:
      "Plataforma de análise estatística de ações e investimentos, fornecendo insights avançados para investidores tomarem decisões baseadas em dados e métricas de mercado.",
    image: "/images/projetos/delta/delta.png",
    tags: ["React", "Python", "TensorFlow", "D3.js"],
    category: "data",
  },
];

// Categorias para filtro
const categories = [
  { id: "all", name: "Todos" },
  { id: "web", name: "Web" },
  { id: "mobile", name: "Mobile" },
  { id: "data", name: "Análise de Dados" },
];

// Projetos com NDA
const ndaProjects = [
  {
    title: "Sistema Bancário",
    description:
      "Plataforma completa para instituição financeira com processamento de transações em tempo real",
    tags: ["Node.js", "React", "PostgreSQL", "Redis", "AWS"],
    image: "/images/projetos/confidential/banking.jpg",
  },
  {
    title: "Aplicativo de Saúde",
    description:
      "Solução móvel para monitoramento de saúde e bem-estar integrado com dispositivos IoT",
    tags: ["React Native", "Firebase", "HealthKit", "Bluetooth LE"],
    image: "/images/projetos/confidential/health.jpg",
  },
  {
    title: "Marketplace B2B",
    description:
      "Plataforma de comércio entre empresas com sistema de leilão reverso e logística integrada",
    tags: ["Next.js", "MongoDB", "Redux", "ElasticSearch"],
    image: "/images/projetos/confidential/marketplace.jpg",
  },
  {
    title: "Sistema ERP Industrial",
    description:
      "Software completo para gestão de processos industriais e cadeia de suprimentos",
    tags: ["Angular", "Java", "Oracle", "Docker", "Kubernetes"],
    image: "/images/projetos/confidential/erp.jpg",
  },
  {
    title: "Plataforma de Educação",
    description:
      "LMS avançado com recursos de gamificação e IA para personalização do aprendizado",
    tags: ["Vue.js", "Python", "Django", "TensorFlow", "AWS"],
    image: "/images/projetos/confidential/education.jpg",
  },
  {
    title: "App de Logística",
    description:
      "Aplicativo para rastreamento e gestão de entregas em tempo real com otimização de rotas",
    tags: ["Flutter", "Node.js", "MongoDB", "Google Maps API"],
    image: "/images/projetos/confidential/logistics.jpg",
  },
];

// Definir tipos para projetos
type NormalProject = (typeof allProjects)[0];
type NDAProjeto = (typeof ndaProjects)[0];
type ProjectWithConfidentiality =
  | NormalProject
  | (NDAProjeto & { isConfidential: boolean; category: string; id?: string });

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Adicionar categorias aos projetos confidenciais
  const ndaProjectsWithCategories: (NDAProjeto & {
    isConfidential: boolean;
    category: string;
    id: string;
  })[] = ndaProjects.map((project, index) => ({
    ...project,
    isConfidential: true,
    id: `confidential-${index}`,
    category:
      project.tags.includes("React Native") || project.tags.includes("Flutter")
        ? "mobile"
        : project.tags.includes("Python") || project.tags.includes("TensorFlow")
        ? "data"
        : "web",
  }));

  // Combinar projetos normais e confidenciais
  const allProjectsCombined: ProjectWithConfidentiality[] = [
    ...allProjects,
    ...ndaProjectsWithCategories,
  ];

  // Filtrar projetos por categoria
  const filteredProjects =
    selectedCategory === "all"
      ? allProjectsCombined
      : allProjectsCombined.filter(
          (project) => project.category === selectedCategory
        );

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-900 via-gray-900 to-black overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-96 h-96 -top-20 -right-20 rounded-full bg-blue-600/30 blur-3xl"></div>
          <div className="absolute w-96 h-96 -bottom-20 -left-20 rounded-full bg-purple-600/30 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Nossos{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Projetos
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Conheça as soluções que desenvolvemos e como ajudamos a
              transformar ideias em produtos de sucesso.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filtro de Categorias */}
          <motion.div
            className="flex flex-wrap gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>

          {/* Grid de Projetos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700 flex flex-col h-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Imagem do Projeto - Normal ou Confidencial */}
                <div className="relative h-56 overflow-hidden">
                  {"isConfidential" in project && project.isConfidential ? (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-40 z-10" />
                      <div className="filter blur-sm">
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500" />
                      </div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-white">
                        <FiLock className="mx-auto text-4xl mb-2" />
                        <p className="text-center font-medium">
                          Projeto Confidencial
                        </p>
                      </div>
                      <div className="absolute top-4 right-4 bg-gray-100 dark:bg-gray-700 p-2 rounded-full z-20">
                        <FiLock className="text-gray-500 dark:text-gray-400" />
                      </div>
                    </>
                  ) : (
                    <Image
                      src={project.image}
                      alt={`${project.title} thumbnail`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 text-sm rounded-full ${
                          "isConfidential" in project && project.isConfidential
                            ? "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                            : "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm rounded-full">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Botão fixo na parte inferior */}
                <div className="px-6 pb-6">
                  {"isConfidential" in project && project.isConfidential ? (
                    <div className="w-full px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md cursor-not-allowed flex items-center justify-center opacity-80">
                      <span>Projeto Confidencial</span>
                      <FiLock className="ml-2" />
                    </div>
                  ) : (
                    <Link href={`/projetos/${project.id}`}>
                      <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md hover:shadow-lg transition-shadow flex items-center justify-center">
                        <span>Ver Detalhes</span>
                        <FiArrowRight className="ml-2" />
                      </button>
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="max-w-3xl mx-auto text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg text-gray-600 dark:text-gray-400 italic">
              Respeitamos a confidencialidade de nossos clientes. Temos diversos
              projetos sob NDA que não podemos exibir publicamente, mas estamos
              disponíveis para discutir nossas capacidades e experiência em
              reuniões privadas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              className="text-3xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Vamos transformar sua ideia em realidade?
            </motion.h2>
            <motion.p
              className="text-xl text-white/90 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Entre em contato para discutirmos como podemos criar um MVP para
              validar seu conceito no mercado.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/contato">
                <button className="px-8 py-3 bg-white text-blue-600 rounded-md shadow-lg hover:shadow-xl transition-all text-lg font-medium">
                  Iniciar Conversa
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
