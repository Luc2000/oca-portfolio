"use client";

import { motion } from "framer-motion";
import {
  FiCode,
  FiDatabase,
  FiSmartphone,
  FiLayers,
  FiTrendingUp,
  FiShield,
} from "react-icons/fi";

const services = [
  {
    icon: <FiSmartphone className="text-blue-500 text-2xl" />,
    title: "Desenvolvimento Mobile",
    description:
      "Aplicativos nativos e híbridos para iOS e Android com foco em experiência do usuário.",
  },
  {
    icon: <FiCode className="text-purple-500 text-2xl" />,
    title: "Desenvolvimento Web",
    description:
      "Sites e aplicações web modernas, rápidas e responsivas utilizando as mais recentes tecnologias.",
  },
  {
    icon: <FiDatabase className="text-green-500 text-2xl" />,
    title: "Arquitetura Backend",
    description:
      "APIs escaláveis, microserviços e integrações com alta performance e segurança.",
  },
  {
    icon: <FiLayers className="text-orange-500 text-2xl" />,
    title: "MVP para Startups",
    description:
      "Desenvolvimento rápido de produtos mínimos viáveis para validação de negócios.",
  },
  {
    icon: <FiTrendingUp className="text-red-500 text-2xl" />,
    title: "Escalabilidade",
    description:
      "Soluções que crescem com seu negócio, desde o protótipo até milhões de usuários.",
  },
  {
    icon: <FiShield className="text-teal-500 text-2xl" />,
    title: "Manutenção & Suporte",
    description:
      "Suporte contínuo, monitoramento e evolução de sistemas existentes.",
  },
];

const Services = () => {
  return (
    <section className="py-16 bg-gray-900" id="servicos">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Nossos Serviços
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            Soluções completas para transformar sua ideia em realidade
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 rounded-lg p-6 h-full border border-gray-700 shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="mb-4 p-3 inline-block bg-gray-700 rounded-lg">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
