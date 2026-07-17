import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const services = [
  {
    title: "Aplicativos mobile",
    description:
      "Apps para iOS e Android em React Native, da loja de aplicativos ao push notification, com a fluidez de app nativo.",
  },
  {
    title: "Aplicações web",
    description:
      "Sites, dashboards e sistemas em Next.js: rápidos, responsivos e prontos para ranquear no Google.",
  },
  {
    title: "Backend e APIs",
    description:
      "APIs escaláveis, integrações com gateways de pagamento e infraestrutura que aguenta o dia de pico.",
  },
  {
    title: "MVP para startups",
    description:
      "O caminho mais curto entre a ideia e usuários reais: escopo enxuto, lançamento rápido, base pronta para crescer.",
  },
  {
    title: "Escala e performance",
    description:
      "Produtos que crescem com o negócio, do protótipo validado aos milhares de usuários simultâneos.",
  },
  {
    title: "Manutenção contínua",
    description:
      "Suporte, monitoramento e evolução constante de sistemas que já estão em produção.",
  },
];

const Services = () => {
  return (
    <section className="py-24" id="servicos">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="O que construímos"
          title="Tudo o que um produto digital precisa para sair do papel"
          lede="Uma equipe única cuida do produto inteiro: design, mobile, web, backend e o que vier depois do lançamento."
        />

        <div className="grid grid-cols-1 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.06}>
              <div className="h-full border-t border-fresta py-8">
                <h3 className="font-display text-xl font-semibold text-areia">
                  {service.title}
                </h3>
                <p className="mt-3 leading-relaxed text-palha">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
