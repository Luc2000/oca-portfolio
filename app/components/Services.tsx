"use client";

import { motion } from "framer-motion";
import {
  FiCode,
  FiSmartphone,
  FiGlobe,
  FiServer,
  FiShield,
  FiLayers,
  FiDatabase,
  FiZap,
} from "react-icons/fi";

const services = [
  {
    icon: <FiLayers size={24} />,
    title: "Tirar Ideias do Papel",
    description:
      "Transformamos seu conceito em um produto viável, definindo requisitos, arquitetura e roadmap para o sucesso.",
  },
  {
    icon: <FiServer size={24} />,
    title: "MVPs para Startups",
    description:
      "Criamos produtos mínimos viáveis que permitem validar sua ideia no mercado com rapidez e menor custo.",
  },
  {
    icon: <FiCode size={24} />,
    title: "Desenvolvimento Web",
    description:
      "Criamos websites e sistemas web modernos, responsivos e otimizados para SEO, utilizando as melhores tecnologias do mercado.",
  },
  {
    icon: <FiSmartphone size={24} />,
    title: "Aplicativos Mobile",
    description:
      "Desenvolvimento de aplicativos nativos e multiplataforma para iOS e Android com React Native e Expo, garantindo alta performance.",
  },
  {
    icon: <FiGlobe size={24} />,
    title: "Soluções E-commerce",
    description:
      "Desenvolvemos plataformas completas para venda online com integração de pagamentos e gestão de produtos.",
  },
  {
    icon: <FiShield size={24} />,
    title: "Mentoria Técnica",
    description:
      "Oferecemos orientação estratégica para startups em seus desafios técnicos e decisões de arquitetura.",
  },
  {
    icon: <FiDatabase size={24} />,
    title: "Integração de APIs",
    description:
      "Conectamos seu sistema a serviços externos como pagamentos, logística, redes sociais e outras soluções de terceiros.",
  },
  {
    icon: <FiZap size={24} />,
    title: "Consultoria Técnica",
    description:
      "Oferecemos consultoria especializada em arquitetura de software, escolha de tecnologias e otimização de performance.",
  },
];

const Services = () => {
  return (
    <section className="py-20 bg-gray-900" id="services">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Nossos{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Serviços
            </span>
          </h2>
          <p className="text-lg text-gray-300">
            Oferecemos soluções completas para transformar suas ideias em
            produtos digitais de alta qualidade.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 flex flex-col h-full hover:shadow-xl hover:bg-gray-750 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-6 flex-grow">
                <div className="w-14 h-14 rounded-full mb-6 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
              <div className="p-6 mt-auto">
                <button
                  className="w-full px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:opacity-90 transition-opacity cursor-pointer"
                  onClick={() =>
                    window.open(
                      `https://wa.me/5511949629527?text=Olá%20Lucas,%20vim%20pelo%20site%20da%20OCA%20e%20gostaria%20de%20discutir%20um%20projeto%20de%20${encodeURIComponent(
                        service.title.toLowerCase()
                      )}`,
                      "_blank"
                    )
                  }
                >
                  Consultar serviço
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
