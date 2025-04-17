"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ContactCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
      {/* Elementos de Decoração */}
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
            Vamos transformar sua ideia em realidade
          </motion.h2>

          <motion.p
            className="text-xl text-white/90 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Entre em contato hoje mesmo para discutir seu projeto e descobrir
            como podemos ajudar sua empresa a crescer com soluções tecnológicas
            sob medida.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              onClick={() =>
                window.open(
                  "https://wa.me/5511949629527?text=Olá%20Lucas,%20vim%20pelo%20site%20da%20OCA%20e%20gostaria%20de%20discutir%20um%20projeto.",
                  "_blank"
                )
              }
              className="px-8 py-3 bg-white text-gray-800 rounded-md shadow-lg hover:shadow-xl transition-all text-lg font-medium cursor-pointer"
            >
              Fale Conosco
            </button>
            <Link href="/projetos">
              <button className="px-8 py-3 bg-transparent text-white border border-white/50 rounded-md hover:bg-white/10 transition-all text-lg font-medium">
                Ver Projetos
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
