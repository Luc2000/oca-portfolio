import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const reasons = [
  {
    title: "Quem constrói produto próprio, constrói melhor o seu",
    description:
      "A OCA criou e opera o ecossistema Revo: app, dashboard e menu digital com pagamentos reais em produção. Sabemos o que é lançar, errar, corrigir e escalar com o próprio dinheiro em jogo.",
  },
  {
    title: "Foco em validar, não em faturar horas",
    description:
      "O escopo do MVP é desenhado para responder à pergunta que importa: alguém paga por isso? Você lança em semanas e decide o próximo passo com dados, não com achismo.",
  },
  {
    title: "Parceria além do código",
    description:
      "Para projetos promissores, a conversa pode ir além do desenvolvimento: participação, estratégia de produto e a experiência de quem já empreendeu do outro lado da mesa.",
  },
  {
    title: "Qualidade que não trava o crescimento",
    description:
      "Código limpo, arquitetura pensada para escalar e stack moderna. O MVP de hoje não vira a dívida técnica de amanhã.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="border-y border-fresta bg-carvao py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Por que a OCA"
          title="Uma software house com cabeça de founder"
          lede="Mais do que entregar código, ajudamos a transformar ideias em negócios que param em pé."
        />

        <div className="grid grid-cols-1 gap-x-12 gap-y-2 md:grid-cols-2">
          {reasons.map((reason, index) => (
            <Reveal key={reason.title} delay={(index % 2) * 0.1}>
              <div className="h-full border-t border-fresta py-8">
                <h3 className="font-display text-xl font-semibold leading-snug text-areia">
                  {reason.title}
                </h3>
                <p className="mt-3 leading-relaxed text-palha">
                  {reason.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
