import type { Metadata } from "next";
import { FiLinkedin, FiPhone } from "react-icons/fi";
import Reveal from "../components/Reveal";
import ContactForm from "../components/ContactForm";
import { site, whatsappUrl, defaultWhatsappMessage } from "../data/site";

export const metadata: Metadata = {
  title: "Contato | Fale com a OCA Software House",
  description:
    "Entre em contato com a OCA Software House para discutir seu projeto. Estamos prontos para transformar sua ideia em um produto digital de sucesso.",
  alternates: {
    canonical: "/contato",
  },
  openGraph: {
    title: "Contato | OCA Software House",
    description:
      "Entre em contato conosco para discutir seu projeto ou tirar dúvidas.",
    url: "/contato",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-36 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="annotation mb-6">Contato / primeira conversa</p>
            <h1 className="font-display max-w-3xl text-4xl font-semibold tracking-tight text-areia sm:text-6xl">
              Conte o que você quer construir
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-palha sm:text-xl">
              A primeira conversa é direta e sem compromisso: você sai dela com
              um caminho claro para o seu produto.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="space-y-10">
                <div className="space-y-6">
                  <a
                    href={whatsappUrl(defaultWhatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 rounded-lg border border-fresta p-5 transition-colors hover:border-palha"
                  >
                    <FiPhone className="mt-1 shrink-0 text-urucum" size={20} />
                    <span>
                      <span className="annotation block">WhatsApp</span>
                      <span className="mt-1 block text-areia">
                        {site.phone}
                      </span>
                    </span>
                  </a>
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 rounded-lg border border-fresta p-5 transition-colors hover:border-palha"
                  >
                    <FiLinkedin
                      className="mt-1 shrink-0 text-urucum"
                      size={20}
                    />
                    <span>
                      <span className="annotation block">LinkedIn</span>
                      <span className="mt-1 block text-areia">
                        linkedin.com/in/lucasannunziato
                      </span>
                    </span>
                  </a>
                </div>

                <div>
                  <h2 className="annotation mb-4">Sobre parcerias</h2>
                  <p className="leading-relaxed text-palha">
                    Para projetos com potencial de mercado, estamos abertos a
                    discutir parcerias além do desenvolvimento. Mencione seu
                    interesse na mensagem.
                  </p>
                </div>

                <div>
                  <h2 className="annotation mb-4">Junte-se à nossa rede</h2>
                  <p className="leading-relaxed text-palha">
                    Se você é desenvolvedor freelancer interessado em trabalhar
                    conosco em projetos futuros, envie seu currículo e
                    portfólio.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
