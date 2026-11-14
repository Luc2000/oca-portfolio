export interface FaqItem {
  question: string;
  answer: string;
}

/* Rendered on /contato as visible FAQ + FAQPage JSON-LD */
export const contactFaq: FaqItem[] = [
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
