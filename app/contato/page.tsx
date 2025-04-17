"use client";

import { useState } from "react";
import { FiSend, FiPhone, FiLinkedin } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    projectType: "website",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Preparar mensagem para WhatsApp
    const message = `*Contato via Site OCA*
Nome: ${formData.name}
Email: ${formData.email}
${formData.phone ? `Telefone: ${formData.phone}` : ""}
${formData.company ? `Empresa: ${formData.company}` : ""}
Tipo de Projeto: ${formData.projectType}

Mensagem:
${formData.message}`;

    // Codificar a mensagem para URL
    const encodedMessage = encodeURIComponent(message);

    // Abrir WhatsApp em nova aba
    window.open(`https://wa.me/5511949629527?text=${encodedMessage}`, "_blank");

    // Resetar formulário e mostrar mensagem de sucesso
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Resetar o formulário após envio bem-sucedido
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        projectType: "website",
      });

      // Limpar a mensagem de sucesso após 5 segundos
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 500);
  };

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
              Entre em{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Contato
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Estamos aqui para responder suas dúvidas e ajudar a transformar
              sua ideia em um produto digital de sucesso.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Vamos Conversar
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Tem uma ideia de projeto ou negócio digital? Quer discutir
                  como podemos ajudar a transformá-la em um MVP? Entre em
                  contato pelo formulário ou diretamente pelos canais abaixo.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400">
                    <FiPhone size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      WhatsApp
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      <a
                        href="https://wa.me/5511949629527"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
                      >
                        +55 (11) 94962-9527
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                    <FiLinkedin size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      LinkedIn
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      <a
                        href="https://www.linkedin.com/in/lucasannunziato/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        linkedin.com/in/lucasannunziato
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Sobre Parcerias
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Para projetos com potencial de mercado, estamos abertos a
                  discutir possíveis parcerias além do desenvolvimento. Mencione
                  seu interesse no formulário de contato.
                </p>
              </div>

              <div className="pt-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Junte-se à Nossa Rede
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Se você é um desenvolvedor freelancer interessado em trabalhar
                  conosco em projetos futuros, sinta-se à vontade para enviar
                  seu currículo e portfolio.
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-md border border-gray-100 dark:border-gray-700">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Envie uma mensagem
                </h3>

                {submitSuccess ? (
                  <motion.div
                    className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-green-600 dark:text-green-400 font-medium">
                      Mensagem enviada com sucesso! Entraremos em contato em
                      breve.
                    </p>
                  </motion.div>
                ) : null}

                {submitError ? (
                  <motion.div
                    className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-red-600 dark:text-red-400 font-medium">
                      Ocorreu um erro ao enviar sua mensagem. Por favor, tente
                      novamente.
                    </p>
                  </motion.div>
                ) : null}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Telefone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Empresa
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="projectType"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Tipo de Projeto *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="website">Website</option>
                      <option value="app">Aplicativo Móvel</option>
                      <option value="mvp">MVP</option>
                      <option value="ecommerce">E-commerce</option>
                      <option value="system">Sistema Web</option>
                      <option value="partnership">Proposta de Parceria</option>
                      <option value="other">Outro</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Sua Mensagem *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                    ></textarea>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full px-6 py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md shadow-lg hover:shadow-xl transition-all text-lg font-medium ${
                        isSubmitting
                          ? "opacity-70 cursor-not-allowed"
                          : "hover:opacity-90"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Enviando...</span>
                        </>
                      ) : (
                        <>
                          <FiSend />
                          <span>Enviar via WhatsApp</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    * Campos obrigatórios
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
