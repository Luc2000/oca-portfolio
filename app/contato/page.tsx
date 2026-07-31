import type { Metadata } from "next";
import { FiLinkedin, FiPhone } from "react-icons/fi";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import TrackedLink from "../components/TrackedLink";
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

const faqs = [
  {
    question: "Quanto custa desenvolver um aplicativo ou sistema?",
    answer:
      "Depende do escopo. Depois da primeira conversa você recebe uma proposta com valor e prazo fechados, antes de qualquer compromisso. MVPs enxutos custam uma fração de um produto completo, e é por aí que a maioria dos projetos deve começar.",
  },
  {
    question: "Quanto tempo leva para colocar um MVP no ar?",
    answer:
      "Depende do escopo, mas MVPs bem recortados costumam ir ao ar em semanas, não meses. Na primeira conversa ajudamos a cortar o escopo para o essencial que valida o negócio.",
  },
  {
    question: "Vocês atendem clientes fora de São Paulo?",
    answer:
      "Sim. Estamos em São Paulo, mas trabalhamos de forma remota com clientes de todo o Brasil, com reuniões por vídeo e acompanhamento contínuo do projeto.",
  },
  {
    question: "Que tecnologias vocês usam?",
    answer:
      "React Native e Expo para aplicativos, Next.js e React para web, Node.js e Supabase no backend, além de integrações com IA. Escolhemos a stack pelo problema, não pela moda.",
  },
  {
    question: "Vocês desenvolvem produtos com inteligência artificial?",
    answer:
      "Sim. Construímos chatbots, agentes de IA e automações integradas a sistemas existentes, sempre com foco em resultado de negócio, não em IA pela IA.",
  },
  {
    question: "Vocês só desenvolvem, ou também ajudam na estratégia?",
    answer:
      "Vamos além do código: ajudamos a definir escopo, priorizar funcionalidades e desenhar a estratégia de lançamento. Para projetos com potencial de mercado, estamos abertos a parcerias além do desenvolvimento.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
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
            {faqs.map((faq, index) => (
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
