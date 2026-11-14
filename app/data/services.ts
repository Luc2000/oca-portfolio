export interface ServiceStep {
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceGuide {
  slug: string;
  title: string;
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
  /* Rendered as visible FAQ + FAQPage JSON-LD */
  faq: ServiceFaq[];
  /* Cornerstone blog posts for this service (internal links) */
  guides: ServiceGuide[];
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
    faq: [
      {
        question: "Quanto custa criar um aplicativo?",
        answer:
          "Depende do que o app precisa fazer: número de telas, login, pagamentos, integrações e painel administrativo são o que mais move o preço. Um app simples custa bem menos que um marketplace com pagamento e chat. Publicamos as faixas reais por tipo de app no guia “Quanto custa criar um aplicativo”, e a OCA envia a faixa do seu projeto depois de entender o escopo.",
      },
      {
        question: "Quanto tempo leva para desenvolver um app?",
        answer:
          "Um MVP de app costuma levar de 2 a 4 meses, do design à publicação. Apps com pagamento, chat ou integrações pesadas levam mais. O prazo do seu projeto vem junto com a faixa de investimento.",
      },
      {
        question: "O app funciona no iPhone e no Android?",
        answer:
          "Sim. Usamos React Native com Expo: uma única base de código gera o app para iOS e Android, o que reduz custo e prazo sem perder qualidade.",
      },
      {
        question: "Vocês publicam o app na App Store e na Google Play?",
        answer:
          "Sim. Cuidamos de todo o processo de aprovação nas duas lojas. As contas de desenvolvedor ficam no nome da sua empresa.",
      },
      {
        question: "Vocês assumem um app que já foi começado, inclusive feito com IA?",
        answer:
          "Sim. Auditamos o código, dizemos o que dá para aproveitar e finalizamos e publicamos o app. Isso vale também para apps gerados com ferramentas de IA que travaram antes de chegar às lojas.",
      },
      {
        question: "Como funciona o orçamento?",
        answer:
          "Você conta o projeto por WhatsApp ou pelo formulário, em texto ou áudio. A OCA devolve o entendimento do escopo com uma faixa de investimento e um prazo estimado. Se a faixa fizer sentido, marcamos uma conversa para fechar a proposta. Não cobramos pela análise inicial.",
      },
      {
        question: "Como é o pagamento?",
        answer:
          "O projeto é dividido em etapas com entregáveis claros, e o pagamento acompanha as etapas entregues. Você não paga tudo adiantado.",
      },
    ],
    guides: [
      { slug: "quanto-custa-criar-um-aplicativo-em-2026", title: "Quanto custa criar um aplicativo em 2026" },
      { slug: "quanto-tempo-leva-para-criar-um-aplicativo-cronograma-2026", title: "Quanto tempo leva para criar um aplicativo" },
      { slug: "app-nativo-hibrido-ou-pwa-como-escolher-primeiro-aplicativo", title: "App nativo, híbrido ou PWA: como escolher" },
      { slug: "quanto-custa-manter-um-aplicativo-2026-custo-mensal", title: "Quanto custa manter um aplicativo depois do lançamento" },
    ],
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
    faq: [
      {
        question: "Quanto custa um MVP?",
        answer:
          "O custo depende do que entra na primeira versão. O maior corte de preço vem de definir bem o escopo: o MVP precisa provar a ideia, não ter todas as funcionalidades. As faixas reais estão no guia “Quanto custa um MVP”, e a OCA envia a faixa do seu projeto depois de entender o escopo.",
      },
      {
        question: "Quanto tempo leva para lançar um MVP?",
        answer:
          "A maioria dos MVPs fica pronta entre 6 e 12 semanas. O prazo do seu projeto vem junto com a faixa de investimento.",
      },
      {
        question: "Vocês ajudam a definir o que entra no MVP?",
        answer:
          "Sim. Antes de desenvolver, ajudamos a separar o que precisa estar na primeira versão do que pode esperar, para você lançar mais rápido e gastar menos.",
      },
      {
        question: "No-code ou desenvolvimento sob medida?",
        answer:
          "No-code serve para validar algumas ideias, mas trava quando o produto precisa de pagamentos, regras próprias ou escala. Indicamos o caminho certo para o seu caso, mesmo quando a resposta é não contratar a gente agora.",
      },
      {
        question: "O MVP aguenta crescer depois?",
        answer:
          "Sim. Construímos com a mesma stack de produtos em produção, como o app REVO, com mais de 40 mil usuários. A primeira versão já nasce pronta para evoluir.",
      },
      {
        question: "Como funciona o orçamento?",
        answer:
          "Você conta o projeto por WhatsApp ou pelo formulário, em texto ou áudio. A OCA devolve o entendimento do escopo com uma faixa de investimento e um prazo estimado. Se a faixa fizer sentido, marcamos uma conversa para fechar a proposta. Não cobramos pela análise inicial.",
      },
      {
        question: "Como é o pagamento?",
        answer:
          "O projeto é dividido em etapas com entregáveis claros, e o pagamento acompanha as etapas entregues. Você não paga tudo adiantado.",
      },
    ],
    guides: [
      { slug: "quanto-custa-um-mvp-2026-faixas-de-preco-e-o-que-cortar-do-escopo", title: "Quanto custa um MVP em 2026" },
      { slug: "como-definir-escopo-do-mvp-o-que-cortar-da-primeira-versao", title: "Como definir o escopo do MVP" },
      { slug: "mvp-no-code-ou-sob-medida-como-escolher", title: "MVP no-code ou sob medida" },
      { slug: "como-validar-ideia-de-startup-antes-de-gastar-com-desenvolvimento", title: "Como validar a ideia antes de desenvolver" },
    ],
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
    faq: [
      {
        question: "Quanto custa implementar IA na empresa?",
        answer:
          "Há dois custos: o projeto, que é construir a solução, e o custo mensal de uso dos modelos de IA, que cresce com o volume. Mostramos os dois antes de você decidir. As faixas reais estão no guia “Quanto custa implementar IA na empresa”.",
      },
      {
        question: "Que tipo de solução de IA vocês fazem?",
        answer:
          "Atendimento com IA no WhatsApp, agentes que executam tarefas em sistemas da empresa, busca e respostas sobre documentos internos (RAG), automação de processos e funcionalidades de IA dentro de apps e sistemas.",
      },
      {
        question: "Dá para testar antes de investir no projeto inteiro?",
        answer:
          "Sim, e recomendamos. Um piloto curto com uma métrica clara mostra se a IA resolve o problema antes de você investir no projeto completo.",
      },
      {
        question: "Meus dados ficam seguros?",
        answer:
          "Sim. Os projetos seguem a LGPD, com controle de acesso e escolha de provedores que não usam seus dados para treinar modelos.",
      },
      {
        question: "Em que casos a IA não vale a pena?",
        answer:
          "Quando o processo é raro, muda toda hora ou um erro custa caro demais. Nesses casos falamos isso antes de orçar. Detalhamos no guia “Onde a IA não vale a pena na sua empresa”.",
      },
      {
        question: "Como funciona o orçamento?",
        answer:
          "Você conta o projeto por WhatsApp ou pelo formulário, em texto ou áudio. A OCA devolve o entendimento do escopo com uma faixa de investimento e um prazo estimado. Se a faixa fizer sentido, marcamos uma conversa para fechar a proposta. Não cobramos pela análise inicial.",
      },
      {
        question: "Como é o pagamento?",
        answer:
          "O projeto é dividido em etapas com entregáveis claros, e o pagamento acompanha as etapas entregues. Você não paga tudo adiantado.",
      },
    ],
    guides: [
      { slug: "quanto-custa-implementar-ia-na-empresa-2026", title: "Quanto custa implementar IA na empresa em 2026" },
      { slug: "piloto-de-ia-na-empresa-como-testar-antes-de-assinar-projeto-grande", title: "Piloto de IA: como testar em 30 dias" },
      { slug: "chatbot-ia-whatsapp-atendimento-o-que-automatizar", title: "Chatbot de IA no WhatsApp: o que automatizar" },
      { slug: "onde-ia-nao-vale-a-pena-na-empresa", title: "Onde a IA não vale a pena na sua empresa" },
    ],
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
    faq: [
      {
        question: "Quanto custa um sistema sob medida?",
        answer:
          "Depende do número de módulos, perfis de usuário e integrações com outros sistemas, como ERP, bancos e emissão de nota. As faixas reais por tipo de sistema estão no guia “Quanto custa um sistema web sob medida”, e a OCA envia a faixa do seu projeto depois de entender o escopo.",
      },
      {
        question: "Quando vale sair da planilha ou do sistema pronto?",
        answer:
          "Quando a operação depende de retrabalho manual, de planilhas que ninguém mais entende ou de um sistema pronto que obriga a empresa a se adaptar a ele. O guia “Software pronto ou sob medida” mostra a conta para decidir.",
      },
      {
        question: "Vocês integram com o ERP e os sistemas que já usamos?",
        answer:
          "Sim. Integramos com ERPs, CRMs, meios de pagamento, bancos e APIs públicas, para os dados pararem de ser digitados duas vezes.",
      },
      {
        question: "Vocês assumem um sistema abandonado por outro fornecedor?",
        answer:
          "Sim. Fazemos uma avaliação técnica do que existe e dizemos o que vale manter, corrigir ou reescrever, antes de qualquer proposta grande.",
      },
      {
        question: "O sistema fica preso à OCA?",
        answer:
          "Não. O código e os acessos ficam com a sua empresa, documentados, para você não ficar refém de fornecedor.",
      },
      {
        question: "Como funciona o orçamento?",
        answer:
          "Você conta o projeto por WhatsApp ou pelo formulário, em texto ou áudio. A OCA devolve o entendimento do escopo com uma faixa de investimento e um prazo estimado. Se a faixa fizer sentido, marcamos uma conversa para fechar a proposta. Não cobramos pela análise inicial.",
      },
      {
        question: "Como é o pagamento?",
        answer:
          "O projeto é dividido em etapas com entregáveis claros, e o pagamento acompanha as etapas entregues. Você não paga tudo adiantado.",
      },
    ],
    guides: [
      { slug: "quanto-custa-sistema-web-sob-medida-2026-2", title: "Quanto custa um sistema web sob medida em 2026" },
      { slug: "software-pronto-ou-sob-medida-conta-de-3-anos", title: "Software pronto ou sob medida: a conta de 3 anos" },
      { slug: "orcamento-de-software-sob-medida-como-comparar-propostas", title: "Como comparar orçamentos de software" },
      { slug: "projeto-de-software-travado-como-resgatar-sistema-abandonado-2", title: "Como resgatar um sistema abandonado" },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
