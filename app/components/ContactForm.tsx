"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { whatsappUrl } from "../data/site";

const projectTypes = [
  { value: "website", label: "Website" },
  { value: "app", label: "Aplicativo" },
  { value: "mvp", label: "MVP" },
  { value: "ai", label: "Produto com IA / Automação" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "system", label: "Sistema" },
  { value: "partnership", label: "Proposta de Parceria" },
  { value: "other", label: "Outro" },
];

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
  projectType: "website",
};

const inputClasses =
  "w-full rounded-md border border-fresta bg-terra px-4 py-2.5 text-areia placeholder:text-palha/50 transition-colors focus:border-palha focus:outline-none focus:ring-1 focus:ring-urucum";

const ContactForm = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);

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

    const message = `*Contato via Site OCA*
Nome: ${formData.name}
Email: ${formData.email}
${formData.phone ? `Telefone: ${formData.phone}` : ""}
${formData.company ? `Empresa: ${formData.company}` : ""}
Tipo de Projeto: ${formData.projectType}

Mensagem:
${formData.message}`;

    window.open(whatsappUrl(message), "_blank");

    setFormData(emptyForm);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="rounded-lg border border-fresta bg-carvao p-8">
      <h2 className="font-display text-2xl font-semibold text-areia">
        Envie uma mensagem
      </h2>
      <p className="annotation mt-2 mb-8">
        A mensagem abre direto no WhatsApp
      </p>

      {submitted ? (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-md border border-urucum/40 bg-urucum/10 p-4 text-sm text-areia"
        >
          Mensagem preparada no WhatsApp. Continue a conversa por lá!
        </motion.p>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="annotation mb-2 block">
              Nome completo *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="email" className="annotation mb-2 block">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="phone" className="annotation mb-2 block">
              Telefone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="company" className="annotation mb-2 block">
              Empresa
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label htmlFor="projectType" className="annotation mb-2 block">
            Tipo de projeto *
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            required
            className={inputClasses}
          >
            {projectTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className="annotation mb-2 block">
            Sua mensagem *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className={`${inputClasses} resize-none`}
          />
        </div>

        <button type="submit" className="btn-primary w-full">
          <FiSend />
          Enviar via WhatsApp
        </button>

        <p className="annotation normal-case tracking-normal">
          * Campos obrigatórios
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
