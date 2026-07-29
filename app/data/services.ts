export interface ServiceStep {
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  name: string;
  headline: string;
  lede: string;
  /* Hub card text, doubles as meta description */
  summary: string;
  deliverables: string[];
  process: ServiceStep[];
  /* Slugs from projects.ts rendered as proof */
  proofSlugs: string[];
  blogCategorySlug: string;
  blogCategoryName: string;
  whatsappMessage: string;
}

export const services: Service[] = [
  {
    slug: "aplicativos",
    name: "Aplicativos Mobile",
    headline: "Desenvolvimento de aplicativos mobile",
    lede: "Apps iOS e Android com uma única base de código, do design à publicação nas lojas, feitos por quem opera um app com mais de 40 mil usuários.",
    summary:
      "Apps iOS e Android em React Native, do design à publicação nas lojas. Feitos por quem opera um app com mais de 40 mil usuários.",
    deliverables: [
      "App iOS e Android com uma única base de código (React Native + Expo)",
      "Design de interface e experiência do usuário",
      "Backend, autenticação e notificações push",
      "Pagamentos integrados: Pix, cartão e assinaturas",
      "Publicação e aprovação na App Store e Google Play",
      "Analytics de produto para guiar a evolução",
    ],
    process: [
      {
        title: "Escopo e proposta fechada",
        description:
          "Uma conversa direta para entender o produto e devolver proposta com valor e prazo definidos, sem surpresa depois.",
      },
      {
        title: "Design e protótipo navegável",
        description:
          "Você navega no app antes de qualquer linha de código, e ajustamos o fluxo com seu feedback.",
      },
      {
        title: "Desenvolvimento em ciclos semanais",
        description:
          "Entregas visíveis toda semana, com builds de teste no seu celular desde o início.",
      },
      {
        title: "Publicação e acompanhamento",
        description:
          "Cuidamos da aprovação nas lojas e seguimos com manutenção e evolução depois do lançamento.",
      },
    ],
    proofSlugs: ["revo-app", "meyu", "vipou"],
    blogCategorySlug: "criar-aplicativo",
    blogCategoryName: "Criar um Aplicativo",
    whatsappMessage:
      "Olá Lucas, vim pelo site da OCA e quero desenvolver um aplicativo.",
  },
  {
    slug: "mvp-para-startups",
    name: "MVP para Startups",
    headline: "Desenvolvimento de MVP para startups",
    lede: "Seu produto no ar em semanas, com o escopo certo para validar o negócio antes de investir pesado, definido com quem já tirou produtos próprios do papel.",
    summary:
      "MVP no ar em semanas com o escopo certo para validar seu negócio, definido com quem já tirou produtos próprios do papel.",
    deliverables: [
      "Definição de escopo focada no essencial que valida a ideia",
      "Produto funcional no ar em semanas, não meses",
      "Stack pronta para escalar sem reescrever do zero",
      "Checkout, assinatura ou o modelo de receita do seu negócio",
      "Métricas de validação desde o primeiro dia",
      "Roadmap claro do que vem depois do MVP",
    ],
    process: [
      {
        title: "Corte de escopo",
        description:
          "Ajudamos a separar o essencial do desejável. O MVP certo valida a tese com o menor investimento possível.",
      },
      {
        title: "Construção em ciclos semanais",
        description:
          "Produto evoluindo toda semana, com você acompanhando de perto e decidindo prioridades.",
      },
      {
        title: "Lançamento",
        description:
          "No ar, com usuários reais e métricas de comportamento desde o primeiro acesso.",
      },
      {
        title: "Iteração com dados",
        description:
          "Os números dizem o que construir depois. Para projetos promissores, estamos abertos a parceria além do desenvolvimento.",
      },
    ],
    proofSlugs: ["revo-app", "delta-stats"],
    blogCategorySlug: "mvp-e-startups",
    blogCategoryName: "MVP e Startups",
    whatsappMessage:
      "Olá Lucas, vim pelo site da OCA e quero tirar meu MVP do papel.",
  },
  {
    slug: "ia-para-empresas",
    name: "IA para Empresas",
    headline: "IA aplicada para empresas",
    lede: "Chatbots, agentes de IA e automações que resolvem processos reais, construídos por quem já colocou agentes de voz e de vendas em produção.",
    summary:
      "Chatbots, agentes de IA e automações em produção de verdade: atendimento, vendas e processos internos.",
    deliverables: [
      "Chatbots de atendimento no site e no WhatsApp",
      "Agentes de IA para vendas e prospecção",
      "Agentes de voz para pesquisas e atendimento telefônico",
      "Automação de processos internos repetitivos",
      "Integração da IA com seus sistemas atuais: CRM, ERP, planilhas",
      "Diagnóstico honesto de onde IA paga a conta e onde não",
    ],
    process: [
      {
        title: "Diagnóstico",
        description:
          "Mapeamos seus processos e apontamos onde IA gera retorno real. Se não gerar, falamos isso também.",
      },
      {
        title: "Piloto",
        description:
          "Um caso de uso concreto rodando em semanas, com custo controlado, para provar o valor antes de expandir.",
      },
      {
        title: "Produção",
        description:
          "Integração com seus sistemas, tratamento de erros e o tom de voz da sua marca.",
      },
      {
        title: "Medição e evolução",
        description:
          "Acompanhamos resultado em métricas de negócio: tempo economizado, atendimentos resolvidos, leads gerados.",
      },
    ],
    proofSlugs: ["voxfield", "rex"],
    blogCategorySlug: "ia-para-empresas",
    blogCategoryName: "IA para Empresas",
    whatsappMessage:
      "Olá Lucas, vim pelo site da OCA e quero aplicar IA na minha empresa.",
  },
  {
    slug: "software-sob-medida",
    name: "Software Sob Medida",
    headline: "Software sob medida para sua operação",
    lede: "Sistemas web que substituem a planilha, integram seus dados e crescem com o negócio, com manutenção de quem constrói para durar.",
    summary:
      "Sistemas web sob medida que substituem planilhas, integram dados e crescem junto com a sua operação.",
    deliverables: [
      "Sistemas web sob medida para a sua operação",
      "Integrações entre sistemas que não conversam: ERP, CRM, site",
      "Painéis e relatórios para decisão em tempo real",
      "Migração de planilhas para processos estruturados",
      "Resgate e evolução de sistemas legados",
      "Manutenção e evolução contínua depois da entrega",
    ],
    process: [
      {
        title: "Imersão na operação",
        description:
          "Entendemos como o trabalho acontece hoje antes de propor qualquer tela.",
      },
      {
        title: "Escopo e proposta fechada",
        description:
          "Valor e prazo definidos, com propriedade do código sempre sua.",
      },
      {
        title: "Desenvolvimento em ciclos",
        description:
          "O sistema entra em uso por partes, sem parar a operação e sem big bang arriscado.",
      },
      {
        title: "Entrega e manutenção",
        description:
          "Suporte e evolução contínua. Software de operação é organismo vivo, não projeto com fim.",
      },
    ],
    proofSlugs: ["gestao-imobiliarias", "delta-stats", "meyu"],
    blogCategorySlug: "software-sob-medida",
    blogCategoryName: "Software Sob Medida",
    whatsappMessage:
      "Olá Lucas, vim pelo site da OCA e preciso de um software sob medida.",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
