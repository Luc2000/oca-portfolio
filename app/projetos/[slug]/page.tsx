"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowLeft, FiCode, FiLayers, FiCheck } from "react-icons/fi";

// Definição de tipo para o projeto
interface Technology {
  name: string;
  icon: React.ReactNode;
}

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string[];
  gradient: string;
  lightColor: string;
  darkColor: string;
  bgLight: string;
  bgDark: string;
  image: string;
  images: string[];
  tags: string[];
  features: string[];
  technologies: Technology[];
  challenges: string[];
  link?: string;
}

// Dados dos projetos (expandidos com mais detalhes)
const projectsData: Project[] = [
  {
    id: "revo-app",
    title: "Revo App",
    subtitle: "Plataforma completa de eventos e ingressos",
    description:
      "Aplicativo mobile para descoberta e compra de ingressos de eventos, com sistema completo de checkout, lotes dinâmicos, códigos secretos exclusivos e interface moderna com animações. Desenvolvido com React Native, Expo e backend Supabase.",
    fullDescription: [
      "O Revo App revoluciona a forma como as pessoas descobrem e compram ingressos para eventos. Com uma interface moderna e intuitiva, o aplicativo oferece uma experiência de usuário fluida e agradável.",
      "Desenvolvido com React Native e Expo, o app apresenta transições suaves e animações que tornam a navegação natural e satisfatória. A integração com Supabase no backend permite um gerenciamento eficiente de dados em tempo real.",
      "O sistema de checkout foi implementado com Pagarme, garantindo transações seguras e uma experiência de compra simplificada. Com uma taxa de conversão de 90%, nosso checkout transparente é um dos mais eficientes do Brasil. Recursos exclusivos como lotes dinâmicos de ingressos, códigos secretos para acesso VIP e um design adaptativo fazem do Revo App a escolha perfeita para organizadores de eventos e usuários.",
    ],
    gradient: "from-blue-400 to-indigo-500",
    lightColor: "text-blue-400",
    darkColor: "dark:text-blue-300",
    bgLight: "bg-blue-50",
    bgDark: "dark:bg-blue-900/10",
    image: "/images/projetos/revo/logo.jpg",
    images: [
      "/images/projetos/revo/revo-app.png",
      "/images/projetos/revo/revo-checkout.png",
      "/images/projetos/revo/detail.jpg",
    ],
    tags: ["React Native", "Expo", "Supabase", "Zustand", "Pagarme"],
    features: [
      "Sistema de checkout completo com 90% de conversão",
      "Lotes dinâmicos de ingressos",
      "Códigos secretos para acesso exclusivo",
      "Integração com gateway de pagamento",
      "Interface com animações fluidas",
      "Multilíngue (português e inglês)",
      "Analytics integrado com Amplitude",
    ],
    technologies: [
      { name: "React Native", icon: <FiCode /> },
      { name: "Expo", icon: <FiCode /> },
      { name: "Supabase", icon: <FiLayers /> },
      { name: "Zustand", icon: <FiCode /> },
      { name: "Pagarme", icon: <FiCode /> },
    ],
    challenges: [
      "Desenvolver um sistema de checkout seguro e à prova de concorrência",
      "Implementar animações de alta performance em dispositivos de diferentes capacidades",
      "Criar uma experiência de usuário intuitiva para navegação entre eventos",
    ],
    link: "https://revoapp.app.link/al",
  },
  {
    id: "vipou",
    title: "Vipou",
    subtitle: "Sistema de gerenciamento de eventos",
    description:
      "Sistema de gerenciamento para o ecossistema Revo, permitindo a administração completa de eventos, ingressos, pagamentos e relatórios em tempo real.",
    fullDescription: [
      "O Vipou é um sistema de gerenciamento robusto, desenvolvido para dar total controle aos organizadores de eventos que utilizam o ecossistema Revo.",
      "Com uma interface administrativa intuitiva, o Vipou permite o gerenciamento completo de eventos, criação de ingressos, acompanhamento de vendas e acesso a relatórios detalhados em tempo real.",
      "Desenvolvido com React e Node.js, o sistema utiliza MongoDB para garantir flexibilidade no armazenamento de dados e Redux para um gerenciamento de estado previsível e eficiente.",
    ],
    gradient: "from-purple-400 to-pink-400",
    lightColor: "text-purple-400",
    darkColor: "dark:text-purple-300",
    bgLight: "bg-purple-50",
    bgDark: "dark:bg-purple-900/10",
    image: "/images/projetos/vipou/logo.jpg",
    images: [
      "/images/projetos/vipou/vipou.png",
      "/images/projetos/vipou/detail.jpg",
    ],
    tags: ["React", "Node.js", "MongoDB", "Redux"],
    features: [
      "Dashboard de análise em tempo real",
      "Gerenciamento de eventos e ingressos",
      "Relatórios financeiros detalhados",
      "Controle de acesso por perfil de usuário",
      "Sistema de notificações",
      "Exportação de dados para Excel e PDF",
    ],
    technologies: [
      { name: "React", icon: <FiCode /> },
      { name: "Node.js", icon: <FiCode /> },
      { name: "MongoDB", icon: <FiLayers /> },
      { name: "Redux", icon: <FiCode /> },
    ],
    challenges: [
      "Criar um sistema de relatórios em tempo real com processamento otimizado",
      "Desenvolver uma interface administrativa completa mas intuitiva",
      "Implementar controle de acesso granular por perfil de usuário",
    ],
    link: "https://vipou.app.br",
  },
  {
    id: "meyu",
    title: "Meyu",
    subtitle: "Menu digital interativo",
    description:
      "Sistema de menu digital integrado ao ecossistema Revo, que permite restaurantes e bares gerenciarem seus cardápios digitalmente com integração ao sistema de pedidos.",
    fullDescription: [
      "O Meyu é uma solução de menu digital que transforma a experiência de pedidos em estabelecimentos que fazem parte do ecossistema Revo.",
      "Com uma interface elegante e responsiva, o Meyu permite que restaurantes e bares gerenciem seus cardápios digitalmente, atualizando preços e disponibilidade em tempo real.",
      "Desenvolvido com React e Next.js no frontend e Express no backend, o sistema oferece integração perfeita com sistemas de pedidos, permitindo que clientes façam seus pedidos diretamente pelo smartphone.",
    ],
    gradient: "from-teal-400 to-green-400",
    lightColor: "text-teal-500",
    darkColor: "dark:text-teal-300",
    bgLight: "bg-teal-50",
    bgDark: "dark:bg-teal-900/10",
    image: "/images/projetos/meyu/logo.jpg",
    images: [
      "/images/projetos/meyu/meyu.png",
      "/images/projetos/meyu/detail.jpg",
    ],
    tags: ["React", "Next.js", "Express", "PostgreSQL"],
    features: [
      "Editor de cardápio com categorias e itens",
      "Gerenciamento de disponibilidade em tempo real",
      "Integração com sistema de pedidos",
      "QR Codes personalizados por mesa",
      "Análise de itens mais vendidos",
      "Modo escuro/claro automático",
    ],
    technologies: [
      { name: "React", icon: <FiCode /> },
      { name: "Next.js", icon: <FiCode /> },
      { name: "Express", icon: <FiCode /> },
      { name: "PostgreSQL", icon: <FiLayers /> },
    ],
    challenges: [
      "Desenvolver uma interface intuitiva tanto para administradores quanto para clientes",
      "Criar um sistema de atualização em tempo real com mínima latência",
      "Implementar QR Codes dinâmicos por mesa com sessões de pedidos",
    ],
    link: "https://meyu.shop",
  },
  {
    id: "delta-stats",
    title: "Delta Stats",
    subtitle: "Análise avançada de investimentos",
    description:
      "Plataforma de análise estatística de ações e investimentos, fornecendo insights avançados para investidores tomarem decisões baseadas em dados.",
    fullDescription: [
      "Delta Stats é uma plataforma avançada de análise estatística para o mercado financeiro, fornecendo insights precisos para investidores.",
      "Utilizando algoritmos baseados em Python e TensorFlow, a plataforma processa grandes volumes de dados históricos e em tempo real, identificando padrões e tendências.",
      "A interface desenvolvida em React com visualizações D3.js apresenta os dados de forma clara e interativa, permitindo que investidores tomem decisões mais fundamentadas.",
    ],
    gradient: "from-amber-400 to-orange-400",
    lightColor: "text-amber-500",
    darkColor: "dark:text-amber-300",
    bgLight: "bg-amber-50",
    bgDark: "dark:bg-amber-900/10",
    image: "/images/projetos/delta/logo.jpg",
    images: [
      "/images/projetos/delta/delta.png",
      "/images/projetos/delta/detail.jpg",
    ],
    tags: ["React", "Python", "TensorFlow", "D3.js"],
    features: [
      "Análise preditiva de tendências de mercado",
      "Visualizações interativas de dados financeiros",
      "Alertas personalizados baseados em algoritmos",
      "Comparativo histórico de performance",
      "Integração com APIs de mercado em tempo real",
      "Dashboard personalizado por usuário",
    ],
    technologies: [
      { name: "React", icon: <FiCode /> },
      { name: "Python", icon: <FiCode /> },
      { name: "TensorFlow", icon: <FiCode /> },
      { name: "D3.js", icon: <FiLayers /> },
    ],
    challenges: [
      "Implementar algoritmos de machine learning precisos para análise de mercado",
      "Criar visualizações de dados performáticas com grandes volumes de informação",
      "Manter a plataforma atualizada com dados de mercado em tempo real",
    ],
    link: "https://deltastats.com.br",
  },
];

const ProjectPage = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Encontrar o projeto baseado no slug
    const foundProject = projectsData.find((p) => p.id === slug);
    setProject(foundProject || null);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Projeto não encontrado
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          O projeto que você está procurando não existe ou foi removido.
        </p>
        <Link href="/projetos">
          <button className="px-6 py-3 bg-blue-400 hover:bg-blue-500 text-white rounded-md transition-colors">
            Voltar para Projetos
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 bg-gray-50 dark:bg-gray-900">
      {/* Container principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Botão de voltar e cabeçalho */}
        <div className="mb-12">
          <Link href="/projetos">
            <button className="flex items-center px-4 py-2 mb-8 rounded-md bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all shadow-sm">
              <FiArrowLeft className="mr-2" />
              <span>Voltar para projetos</span>
            </button>
          </Link>

          <div className="grid gap-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`text-4xl md:text-5xl font-bold ${
                project?.lightColor || "text-gray-800"
              } ${project?.darkColor || "dark:text-white"}`}
            >
              {project?.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4"
            >
              {project?.subtitle}
            </motion.p>
          </div>
        </div>

        {/* Conteúdo principal - layout em grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Coluna da esquerda - Informações do projeto */}
          <div className="lg:col-span-2 space-y-10">
            {/* Imagem principal do projeto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-xl overflow-hidden shadow-md bg-white dark:bg-gray-800"
            >
              <img
                src={project?.images[0] || ""}
                alt={project?.title || ""}
                className="w-full h-auto object-cover"
              />
              {project?.id === "revo-app" && (
                <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center">
                  <p className="font-semibold">
                    Checkout com 90% de taxa de conversão - Um dos maiores do
                    Brasil
                  </p>
                </div>
              )}
            </motion.div>

            {/* Remover a galeria de imagens e substituir pelo link externo */}
            {project?.link && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md"
              >
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                  Acesse o Projeto
                </h2>
                <div className="flex justify-center">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-8 py-4 bg-gradient-to-r ${
                      project?.gradient || "from-blue-400 to-indigo-400"
                    } text-white rounded-lg shadow-md hover:shadow-lg transition-all font-medium text-lg flex items-center justify-center`}
                  >
                    {project.id === "revo-app"
                      ? "Baixar o app"
                      : "Acessar o site"}
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      ></path>
                    </svg>
                  </a>
                </div>
              </motion.div>
            )}

            {/* Descrição do projeto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md"
            >
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                Sobre o Projeto
              </h2>
              <div className="space-y-6">
                {project?.fullDescription?.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Desafios */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md"
            >
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                Desafios Superados
              </h2>
              <ul className="space-y-6">
                {project?.challenges?.map((challenge, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-4 text-gray-600 dark:text-gray-300"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center justify-center text-white text-xs mt-1">
                      <FiCheck />
                    </span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Coluna da direita - Detalhes técnicos */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-8">
              {/* Tags do projeto */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
              >
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Tecnologias
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project?.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 mb-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
              >
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Funcionalidades
                </h3>
                <ul className="space-y-3">
                  {project?.features?.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-gray-600 dark:text-gray-300"
                    >
                      <span className="text-blue-400 dark:text-blue-300 text-lg">
                        •
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Tecnologias detalhadas */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
              >
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Stack Tecnológico
                </h3>
                <ul className="space-y-4">
                  {project?.technologies?.map((tech, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-gray-600 dark:text-gray-300"
                    >
                      <span className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        {tech.icon}
                      </span>
                      <span>{tech.name}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-4"
              >
                <button
                  onClick={() => {
                    window.open(
                      `https://wa.me/5511949629527?text=Olá%20Lucas,%20vim%20pelo%20site%20da%20OCA%20e%20gostaria%20de%20discutir%20um%20projeto%20${encodeURIComponent(
                        `semelhante ao ${project?.title || "visto no site"}`
                      )}`,
                      "_blank"
                    );
                  }}
                  className={`w-full px-5 py-3 bg-gradient-to-r ${
                    project?.gradient || "from-blue-400 to-indigo-400"
                  } text-white rounded-md shadow-md hover:shadow-lg transition-all font-medium cursor-pointer`}
                >
                  Iniciar um Projeto
                </button>
                <Link href="/projetos" className="block w-full">
                  <button className="w-full px-5 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-white rounded-md shadow-sm hover:shadow-md transition-all font-medium border border-gray-100 dark:border-gray-700">
                    Ver Outros Projetos
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
