"use client";

import { motion } from "framer-motion";
import { FiUsers, FiTarget, FiHeart, FiZap } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

// Dados fictícios para equipe
const teamMembers = [
  {
    id: 1,
    name: "Lucas Annunziato",
    role: "Fundador & Desenvolvedor Full Stack",
    bio: "Desenvolvedor com mais de 7 anos de experiência, especializado em JavaScript e ecossistemas React. Fundador do Revo, uma plataforma completa de busca de eventos e venda de ingressos, e todo seu ecossistema de produtos.",
    image: "/images/team/lucas.jpg",
  },
  {
    id: 2,
    name: "Gabriela Dionelli",
    role: "Designer UI/UX & Marketing",
    bio: "Especialista em design de interfaces com foco em experiência do usuário e estratégias de marketing digital. Com background em psicologia e design thinking, traz uma abordagem centrada no usuário para criar produtos intuitivos e visualmente impactantes.",
    image: "/images/team/gabriela.png",
  },
  {
    id: 3,
    name: "Rafael Oliveira",
    role: "Desenvolvedor Full Stack",
    bio: "Desenvolvedor com 5 anos de experiência em tecnologias front-end e back-end. Especialista em React, Node.js e arquiteturas em nuvem. Possui grande habilidade em resolver problemas complexos e otimizar aplicações para alta performance.",
    image: "/images/team/rafael.png",
  },
];

// Valores da empresa
const values = [
  {
    icon: <FiUsers size={28} />,
    title: "Incentivo ao Empreendedorismo",
    description:
      "Acreditamos no potencial empreendedor brasileiro e trabalhamos para aumentar o número de startups e empresas de tecnologia no país.",
  },
  {
    icon: <FiTarget size={28} />,
    title: "Desenvolvimento Estratégico",
    description:
      "Não apenas codificamos, mas ajudamos a definir a estratégia de desenvolvimento e crescimento do seu produto digital.",
  },
  {
    icon: <FiHeart size={28} />,
    title: "Paixão por Inovação",
    description:
      "Somos movidos pela paixão de criar produtos inovadores que solucionam problemas reais e transformam mercados.",
  },
  {
    icon: <FiZap size={28} />,
    title: "Parceria de Valor",
    description:
      "Valorizamos relações de longo prazo e, para projetos promissores, oferecemos possibilidade de parceria além do desenvolvimento.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 pb-10 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Sobre{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Nós
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Conheça nossa história, nossa equipe e nossa missão de transformar
              ideias em negócios digitais de sucesso.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Placeholder */}
            <motion.div
              className="rounded-2xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative h-96 w-full">
                <Image
                  src="/images/office-image.png"
                  alt="Escritório da OCA Software House"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-blue-600/80 backdrop-blur-sm p-3 text-white text-sm text-center z-10">
                  *Imagem do nosso futuro escritório - por enquanto somos
                  desenvolvedores nômades assistidos por IA 😄
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Nossa História
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                A OCA Software House nasceu da experiência de Lucas Annunziato,
                desenvolvedor com mais de 7 anos de atuação no mercado. Após
                fundar e desenvolver o Revo e todo seu ecossistema - uma
                plataforma completa para busca de eventos, venda de ingressos e
                menu digital - Lucas decidiu compartilhar seu conhecimento e
                visão empreendedora.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Além do ecossistema Revo, que inclui o aplicativo Revo, o
                gerenciador Vipou e o menu digital Meyu, Lucas trabalhou em
                diversos projetos de investimento, adquirindo uma ampla
                experiência em transformar ideias em negócios digitais viáveis.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                A OCA foi criada com o propósito de ir além do modelo
                tradicional de software house. Não queremos apenas entregar
                código, mas ajudar empreendedores a transformarem suas ideias em
                startups de sucesso, oferecendo tanto o desenvolvimento técnico
                quanto insights estratégicos de empreendedorismo.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Nossos{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Valores
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Os princípios que nos guiam e definem como trabalhamos.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="inline-block p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400 mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Nossa{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Equipe
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Conheça os profissionais por trás dos projetos que desenvolvemos.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                {/* Imagem em formato mais quadrado com posicionamento customizado */}
                <div className="relative pt-[100%] w-full bg-gray-100 dark:bg-gray-700">
                  <Image
                    src={member.image}
                    alt={`Foto de ${member.name}`}
                    fill
                    className={`object-cover ${
                      member.id === 2 ? "object-top" : "object-center"
                    }`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
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
              className="text-3xl sm:text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Quer fazer parte do nosso time?
            </motion.h2>

            <motion.p
              className="text-xl text-white/90 mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Estamos sempre em busca de talentos para trabalhar em projetos
              inovadores. Junte-se à nossa rede de freelancers e parceiros.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/contato">
                <button className="px-8 py-3 bg-white text-blue-600 rounded-md shadow-lg hover:shadow-xl transition-all text-lg font-medium">
                  Entre em Contato
                </button>
              </Link>
              <Link href="/contato">
                <button className="px-8 py-3 bg-transparent text-white rounded-md shadow-sm hover:shadow-md transition-all text-lg font-medium border border-white/30 hover:bg-white/10">
                  Enviar Currículo
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
