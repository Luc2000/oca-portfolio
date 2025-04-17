"use client";

import { motion } from "framer-motion";
import {
  FiClock,
  FiThumbsUp,
  FiUsers,
  FiTarget,
  FiHeadphones,
  FiLayers,
} from "react-icons/fi";

const reasons = [
  {
    icon: <FiLayers size={24} />,
    title: "Visão Empreendedora",
    description:
      "Nossa experiência na criação de startups nos permite oferecer insights valiosos sobre desenvolvimento de produtos e estratégias de crescimento.",
  },
  {
    icon: <FiUsers size={24} />,
    title: "Parceria Real",
    description:
      "Não somos apenas desenvolvedores. Somos parceiros que podem investir e participar ativamente do seu projeto se houver potencial.",
  },
  {
    icon: <FiTarget size={24} />,
    title: "Foco em MVP",
    description:
      "Especialistas em criar produtos mínimos viáveis que permitem validar seu conceito rapidamente com investimento reduzido.",
  },
  {
    icon: <FiThumbsUp size={24} />,
    title: "Qualidade Superior",
    description:
      "Código limpo, documentado e testado, seguindo as melhores práticas de desenvolvimento para garantir escalabilidade.",
  },
  {
    icon: <FiClock size={24} />,
    title: "Metodologia Ágil",
    description:
      "Utilizamos métodos ágeis para entregar resultados rapidamente e adaptar o projeto às necessidades do mercado em tempo real.",
  },
  {
    icon: <FiHeadphones size={24} />,
    title: "Suporte Contínuo",
    description:
      "Acompanhamento após o lançamento para garantir o crescimento sustentável do seu produto digital.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Por que{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              escolher
            </span>{" "}
            a OCA?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Mais que uma software house, somos um parceiro que entende o desafio
            de criar uma startup do zero.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="inline-block p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400 mb-4">
                {reason.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {reason.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a href="/contato">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md shadow-lg hover:shadow-xl transition-all text-lg font-medium">
              Inicie seu projeto agora
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
