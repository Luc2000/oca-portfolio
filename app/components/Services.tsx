import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const services = [
  {
    title: "Aplicativos",
    description:
      "Seu produto na App Store e na Google Play, com a cara e a fluidez de app grande.",
  },
  {
    title: "Sites e sistemas",
    description:
      "Do site que vende ao sistema que roda a operação: rápidos, bonitos e prontos para ranquear no Google.",
  },
  {
    title: "Produtos com IA",
    description:
      "Chatbots, agentes e automações que atendem, vendem e operam o negócio enquanto você dorme.",
  },
  {
    title: "MVP para validar sua ideia",
    description:
      "O caminho mais curto entre a ideia e os primeiros clientes pagando: escopo enxuto, lançamento em semanas.",
  },
  {
    title: "Pagamentos e integrações",
    description:
      "Pix, cartão, WhatsApp, nota fiscal: seu produto conversando com tudo o que o seu negócio já usa.",
  },
  {
    title: "Escala e evolução",
    description:
      "Lançar é só o começo: monitoramos, corrigimos e evoluímos o produto do protótipo aos milhares de usuários.",
  },
];

const Services = () => {
  return (
    <section className="py-24" id="servicos">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="O que construímos"
          title="Tudo o que um produto digital precisa para sair do papel"
          lede="Um time só cuida do produto inteiro: design, aplicativo, site, a parte técnica toda e o que vier depois do lançamento."
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
