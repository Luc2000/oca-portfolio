"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gray-900 overflow-hidden">
      {/* Background Elements - Simplificados para melhor performance */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-600/20 blur-2xl"></div>
        <div className="absolute top-20 -left-40 w-80 h-80 rounded-full bg-purple-600/20 blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-cyan-600/20 blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Transformamos{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                ideias
              </span>{" "}
              em produtos digitais
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              Desenvolvimento de aplicações web e mobile com foco em
              performance, usabilidade e resultados.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Link
                href="/projetos"
                className="px-8 py-3 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg hover:opacity-90 transition-all inline-flex items-center justify-center"
              >
                Ver Projetos
                <FiArrowRight className="ml-2" />
              </Link>

              <Link
                href="/contato"
                className="px-8 py-3 rounded-md bg-gray-800 text-white border border-gray-700 hover:bg-gray-750 transition-all inline-flex items-center justify-center"
              >
                Contato
              </Link>
            </motion.div>
          </motion.div>

          {/* Visual element - Exibido apenas no desktop */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-full h-96 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl border border-gray-700/50 backdrop-blur-sm p-4 shadow-xl">
              <div className="w-full h-full rounded-xl bg-gray-800/70 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-8 bg-gray-900/50 flex items-center px-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>

                <div className="text-center px-6">
                  <div className="text-sm font-mono text-blue-400 mb-3">
                    const OCA = () =&gt; {"{"}
                  </div>
                  <div className="text-sm font-mono text-gray-300 ml-4 mb-2">
                    return (
                  </div>
                  <div className="text-sm font-mono text-purple-400 ml-8 mb-2">
                    &lt;TransformandoIdeias /&gt;
                  </div>
                  <div className="text-sm font-mono text-gray-300 ml-4 mb-3">
                    );
                  </div>
                  <div className="text-sm font-mono text-blue-400">{"}"}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
