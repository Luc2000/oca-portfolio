import { FiLinkedin, FiPhone } from "react-icons/fi";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import TrackedLink from "../components/TrackedLink";
import ContactForm from "../components/ContactForm";
import { contactFaq } from "../data/faq";
import { site, whatsappUrl, defaultWhatsappMessage } from "../data/site";
import { pageMetadata } from "../lib/seo";

export const metadata = pageMetadata({
  title: "Contato",
  description:
    "Entre em contato com a OCA Software House para discutir seu projeto. Estamos prontos para transformar sua ideia em um produto digital de sucesso.",
  path: "/contato",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: contactFaq.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

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
                  <TrackedLink
                    event="whatsapp_cta_clicked"
                    eventProps={{ placement: "contato_page" }}
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
                  </TrackedLink>
                  <TrackedLink
                    event="social_link_clicked"
                    eventProps={{ network: "linkedin", placement: "contato_page" }}
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
                  </TrackedLink>
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

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="FAQ / perguntas frequentes"
            title="O que costumam perguntar"
          />
          <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2">
            {contactFaq.map((faq, index) => (
              <Reveal key={faq.question} delay={0.05 * (index % 2)}>
                <h3 className="font-display text-xl font-semibold text-areia">
                  {faq.question}
                </h3>
                <p className="mt-3 leading-relaxed text-palha">{faq.answer}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
