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

/* Rendered on the home as direct answers + FAQPage JSON-LD. Every answer
   restates something already published on a service, project or contact page. */
export const companyFaq: FaqItem[] = [
  {
    question: "O que é a OCA Software House?",
    answer:
      "A OCA é uma software house de São Paulo que desenvolve aplicativos iOS e Android, sistemas web, MVPs para startups e soluções com inteligência artificial. Foi fundada por Lucas Annunziato, criador do Revo App, plataforma de eventos e venda de ingressos com mais de 40 mil usuários, e atende empresas de todo o Brasil.",
  },
  {
    question: "O que uma software house faz?",
    answer:
      "Uma software house projeta, desenvolve e mantém software sob encomenda para outras empresas. Na OCA, um time só cuida do produto inteiro: design, aplicativo, site, a parte técnica e a evolução depois do lançamento.",
  },
  {
    question: "Quanto custa contratar uma software house?",
    answer:
      "Depende do escopo: número de telas, login, pagamentos, integrações e painel administrativo são o que mais move o preço. A OCA envia uma faixa de investimento e um prazo estimado depois de entender o projeto, sem cobrar pela análise inicial, e publica guias com as faixas por tipo de projeto.",
  },
  {
    question: "Quanto tempo leva para desenvolver um software?",
    answer:
      "A maioria dos MVPs fica pronta entre 6 e 12 semanas. Um MVP de aplicativo costuma levar de 2 a 4 meses, do design à publicação nas lojas. Projetos com pagamento, chat ou integrações pesadas levam mais.",
  },
  {
    question: "Como funciona o pagamento?",
    answer:
      "O projeto é dividido em etapas com entregáveis claros, e o pagamento acompanha as etapas entregues. Você não paga tudo adiantado.",
  },
  {
    question: "O código fica com a minha empresa?",
    answer:
      "Sim. O código e os acessos ficam com a sua empresa, documentados, para você não ficar refém de fornecedor.",
  },
  {
    question: "A OCA assume projetos que já foram começados?",
    answer:
      "Sim. Auditamos o código, dizemos o que dá para aproveitar e finalizamos o produto. Isso vale para sistemas abandonados por outro fornecedor e para apps gerados com ferramentas de IA que travaram antes de chegar às lojas.",
  },
  {
    question: "A OCA atende empresas fora de São Paulo?",
    answer:
      "Sim. Estamos em São Paulo, mas trabalhamos de forma remota com clientes de todo o Brasil, com reuniões por vídeo e acompanhamento contínuo do projeto.",
  },
];
