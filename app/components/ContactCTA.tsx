import { FiArrowUpRight } from "react-icons/fi";
import Reveal from "./Reveal";
import OcaMark from "./OcaMark";
import { whatsappUrl, defaultWhatsappMessage } from "../data/site";

const ContactCTA = () => {
  return (
    <section className="relative overflow-hidden py-28">
      <OcaMark className="pointer-events-none absolute -right-16 top-1/2 h-[420px] w-[420px] -translate-y-1/2 text-carvao" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="annotation mb-6">Próximo projeto / o seu</p>
          <h2 className="font-display max-w-2xl text-4xl font-semibold tracking-tight text-areia sm:text-5xl">
            Sua ideia está pronta para sair do papel?
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-palha">
            Conte o que você quer construir. A primeira conversa é direta, sem
            compromisso e já sai com um caminho de MVP.
          </p>
          <a
            href={whatsappUrl(defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-10"
          >
            Chamar no WhatsApp
            <FiArrowUpRight />
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactCTA;
