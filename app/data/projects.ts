export type ProjectCategory = "mobile" | "web" | "data" | "ai";

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string[];
  highlight?: string;
  image: string;
  /* Tailwind object-position class for the card thumbnail crop */
  thumbPosition?: string;
  images: string[];
  /* "contain" for tall/framed shots that must not be cropped */
  heroFit?: "cover" | "contain";
  tags: string[];
  features: string[];
  challenges: string[];
  category: ProjectCategory;
  link?: string;
  linkLabel?: string;
  featured: boolean;
}

export interface NdaProject {
  title: string;
  description: string;
  tags: string[];
  category: ProjectCategory;
}

export const projects: Project[] = [
  {
    slug: "revo-app",
    title: "Revo App",
    subtitle: "Plataforma completa de eventos e ingressos",
    description:
      "Aplicativo de descoberta de eventos e venda de ingressos com mais de 40 mil usuários e 300 eventos por mês. Checkout próprio com 90% de conversão, lotes dinâmicos e códigos secretos.",
    fullDescription: [
      "O Revo App nasceu como produto próprio da OCA e virou a prova do que entregamos: uma plataforma completa de descoberta de eventos e venda de ingressos com mais de 40 mil usuários cadastrados e mais de 300 eventos por mês, construída de ponta a ponta, do design ao gateway de pagamento.",
      "Desenvolvido com React Native e Expo sobre backend Supabase, o app tem navegação fluida, animações de alta performance e atualização de dados em tempo real, com analytics de produto via Amplitude guiando cada decisão de UX.",
      "O checkout, integrado ao Pagar.me, foi desenhado para converter: lotes dinâmicos, códigos secretos para acesso VIP e um fluxo de compra transparente que atinge 90% de conversão.",
    ],
    highlight: "+40 mil usuários · Checkout com 90% de conversão",
    image: "/images/projetos/revo/revo-app.png",
    thumbPosition: "object-center",
    images: [
      "/images/projetos/revo/revo-checkout.png",
      "/images/projetos/revo/revo-app.png",
    ],
    heroFit: "contain",
    tags: [
      "React Native",
      "Expo",
      "TypeScript",
      "Supabase",
      "Zustand",
      "Pagar.me",
      "Amplitude",
    ],
    features: [
      "Checkout transparente com 90% de conversão",
      "Lotes dinâmicos de ingressos",
      "Códigos secretos para acesso exclusivo",
      "Pagamentos integrados com Pagar.me",
      "Interface com animações fluidas",
      "Multilíngue (português e inglês)",
      "Analytics de produto com Amplitude",
    ],
    challenges: [
      "Construir um checkout seguro e à prova de concorrência em compras simultâneas",
      "Manter animações de alta performance em dispositivos de diferentes capacidades",
      "Desenhar uma descoberta de eventos intuitiva que aumenta a recorrência",
    ],
    category: "mobile",
    link: "https://revoapp.app.link/al",
    linkLabel: "Baixar o app",
    featured: true,
  },
  {
    slug: "voxfield",
    title: "VoxField",
    subtitle: "Agente de voz com IA para pesquisas telefônicas",
    description:
      "Agente de voz com IA que liga, entrevista e classifica respostas sozinho: pesquisas telefônicas que levariam semanas de call center acontecem em horas.",
    fullDescription: [
      "O VoxField automatiza pesquisa telefônica de ponta a ponta: o agente de voz disca, conduz o questionário em português natural, entende as respostas e registra tudo classificado, sem operador humano.",
      "Por trás, uma máquina de estados controla o fluxo da entrevista para garantir fidelidade ao questionário, enquanto modelos de IA da OpenAI e da Anthropic, intercambiáveis, classificam respostas e aprofundam perguntas abertas. Voz natural com ElevenLabs, transcrição com Deepgram e telefonia via Twilio.",
      "O produto roda em piloto com um cliente real de pesquisa de mercado, com discador automático, relatórios por pesquisa e controle de custo por ligação.",
    ],
    highlight: "Em piloto com cliente real",
    image: "/images/projetos/voxfield/voxfield.png",
    thumbPosition: "object-center",
    images: ["/images/projetos/voxfield/voxfield.png"],
    tags: ["IA", "OpenAI", "Claude", "TypeScript", "Node.js", "Twilio"],
    features: [
      "Conversa por voz em português natural",
      "Discador automático de contatos",
      "Classificação de respostas com IA",
      "Aprofundamento automático de perguntas abertas",
      "Relatórios por pesquisa",
      "Custo por ligação monitorado",
    ],
    challenges: [
      "Manter a latência da conversa baixa o suficiente para soar natural ao telefone",
      "Garantir fidelidade ao questionário com máquina de estados, sem improviso da IA",
      "Classificar respostas ambíguas com validação entre dois modelos",
    ],
    category: "ai",
    featured: true,
  },
  {
    slug: "rex",
    title: "REX",
    subtitle: "Agente comercial com IA",
    description:
      "Agente de IA que encontra empresas com perfil de cliente ideal, escreve mensagens personalizadas e dispara por WhatsApp e email. Você só aprova.",
    fullDescription: [
      "O REX é um agente comercial com IA: encontra empresas locais com perfil de cliente ideal, enriquece os dados de cada lead e escreve uma abordagem personalizada, uma a uma, sem template com nome trocado.",
      "O disparo acontece por WhatsApp e email com aprovação humana no meio: nada sai sem o seu ok. A arquitetura é multi-tenant e white-label, pronta para agências e times comerciais.",
      "A IA da Anthropic orquestra o pipeline inteiro, da busca de leads à redação da mensagem, com landing page bilíngue e lista de espera aberta.",
    ],
    highlight: "IA da busca do lead à mensagem enviada",
    image: "/images/projetos/rex/rex.png",
    thumbPosition: "object-center",
    images: ["/images/projetos/rex/rex.png"],
    tags: ["IA", "Claude", "Next.js", "Python", "Supabase", "WhatsApp"],
    features: [
      "Prospecção automática de empresas locais",
      "Enriquecimento de dados de cada lead",
      "Mensagens personalizadas geradas por IA",
      "Disparo por WhatsApp e email",
      "Aprovação humana antes de cada envio",
      "Multi-tenant e white-label",
    ],
    challenges: [
      "Gerar personalização real em escala, não template com nome trocado",
      "Operar WhatsApp de forma estável e segura para mensagens comerciais",
      "Orquestrar um pipeline multi-tenant com aprovação humana no meio",
    ],
    category: "ai",
    featured: true,
  },
  {
    slug: "vipou",
    title: "Vipou",
    subtitle: "Gestão de eventos em tempo real",
    description:
      "Painel de gestão do ecossistema Revo, usado por mais de 7 casas noturnas: eventos, listas, promoters, portaria com QR Code e financeiro em tempo real.",
    fullDescription: [
      "O Vipou é o painel de controle do ecossistema Revo, usado por mais de 7 casas noturnas: é onde organizadores criam eventos, gerenciam listas e promoters, acompanham vendas e fecham o caixa.",
      "Construído com Next.js e TypeScript sobre o mesmo backend Supabase do app, o dashboard exibe métricas de venda em tempo real, sem atraso entre a compra no app e o número na tela.",
      "Controle de acesso por perfil, relatórios financeiros detalhados e exportação de dados dão ao organizador autonomia total sobre a operação do evento.",
    ],
    image: "/images/projetos/vipou/vipou.png",
    images: ["/images/projetos/vipou/vipou.png"],
    tags: ["Next.js", "React", "TypeScript", "MUI", "Supabase"],
    features: [
      "Dashboard de vendas em tempo real",
      "Gestão de eventos, listas e promoters",
      "Portaria com scanner de QR Code",
      "Relatórios financeiros detalhados",
      "Controle de acesso por perfil de usuário",
      "Exportação de dados para Excel e PDF",
    ],
    challenges: [
      "Exibir métricas em tempo real sem sacrificar performance",
      "Manter uma interface administrativa completa, mas simples de operar no dia do evento",
      "Implementar controle de acesso granular por perfil",
    ],
    category: "web",
    link: "https://vipou.app.br",
    linkLabel: "Acessar o site",
    featured: false,
  },
  {
    slug: "meyu",
    title: "Meyu",
    subtitle: "Menu digital interativo",
    description:
      "Cardápio digital com QR Code por mesa, pedidos em tempo real e pagamento integrado, para bares e restaurantes do ecossistema Revo.",
    fullDescription: [
      "O Meyu transforma a experiência de pedir em bares e restaurantes: o cliente escaneia o QR Code da mesa, navega pelo cardápio e faz o pedido direto do celular.",
      "Construído como PWA em React com TypeScript, roda em qualquer aparelho sem instalação. O backend Supabase sincroniza cardápio, disponibilidade e pedidos em tempo real entre salão e cozinha.",
      "Com pagamento integrado via Pagar.me e análise dos itens mais vendidos, o estabelecimento ganha giro de mesa e visibilidade da operação.",
    ],
    image: "/images/projetos/meyu/meyu.png",
    images: ["/images/projetos/meyu/meyu.png"],
    tags: [
      "React",
      "TypeScript",
      "PWA",
      "Styled Components",
      "Supabase",
      "Pagar.me",
    ],
    features: [
      "QR Codes personalizados por mesa",
      "Editor de cardápio com categorias e itens",
      "Disponibilidade e pedidos em tempo real",
      "Pagamento integrado no próprio fluxo",
      "Análise de itens mais vendidos",
      "PWA: roda em qualquer aparelho, sem instalação",
    ],
    challenges: [
      "Sincronizar pedidos entre mesa, salão e cozinha com latência mínima",
      "Criar uma interface intuitiva tanto para o cliente quanto para o administrador",
      "Gerenciar sessões de pedido por mesa com QR Codes dinâmicos",
    ],
    category: "web",
    link: "https://meyu.shop",
    linkLabel: "Acessar o site",
    featured: false,
  },
  {
    slug: "delta-stats",
    title: "Delta Stats",
    subtitle: "Análise estatística para traders",
    description:
      "Plataforma de backtesting estatístico para traders da B3, com assinaturas pagas: você define o setup e o Delta Stats calcula o histórico de acertos, ativo por ativo.",
    fullDescription: [
      "O Delta Stats responde à pergunta que todo trader faz: esse setup funciona? A plataforma testa a estratégia contra anos de histórico da B3 e devolve as estatísticas de acerto por ativo, período e variação.",
      "Um pipeline de dados em Python coleta as cotações diárias automaticamente e alimenta o banco Postgres na Supabase, onde os backtests rodam direto no banco para performance máxima.",
      "O produto é vendido por assinatura, com área logada, gráficos interativos, exportação em PDF e Excel e um robô de MetaTrader 5 distribuído aos assinantes.",
    ],
    highlight: "Produto vivo, vendido por assinatura",
    image: "/images/projetos/delta/delta.png",
    images: ["/images/projetos/delta/delta.png"],
    tags: ["Next.js", "TypeScript", "Supabase", "Python", "ApexCharts"],
    features: [
      "Backtesting por período, variação e direção",
      "Estatísticas de acerto por ativo da B3",
      "Assinaturas com área logada",
      "Robô de MetaTrader 5 para assinantes",
      "Exportação de relatórios em PDF e Excel",
      "Cotações atualizadas automaticamente todo dia",
    ],
    challenges: [
      "Coletar cotações diárias de centenas de ativos com pipeline resiliente",
      "Rodar backtests pesados direto no banco sem travar a experiência",
      "Empacotar estatística complexa numa interface que trader entende em segundos",
    ],
    category: "data",
    link: "https://deltastats.com.br",
    linkLabel: "Acessar o site",
    featured: true,
  },
  {
    slug: "gestao-imobiliarias",
    title: "Gestão para Imobiliárias",
    subtitle: "Locação de ponta a ponta, do contrato ao repasse",
    description:
      "Plataforma em produção que roda a operação de locação inteira: contratos, boletos e Pix com repasse automático, assinatura eletrônica e análise de crédito do inquilino.",
    fullDescription: [
      "Uma plataforma que roda a operação de locação inteira: cadastro de imóveis e inquilinos, geração de contrato, cobrança e repasse para o proprietário, tudo num lugar só.",
      "Os pagamentos rodam com boleto e Pix com split automático: o aluguel cai, a taxa da imobiliária se separa sozinha e o proprietário recebe a parte dele. Os contratos são assinados eletronicamente, sem papel.",
      "A análise de crédito do inquilino é integrada ao fluxo: a imobiliária consulta e decide na hora, antes de fechar contrato. Em produção, construída com Next.js e Supabase.",
    ],
    highlight: "Em produção, com operação real de locação",
    image: "/images/projetos/gestao-imobiliarias/gestao-imobiliarias.png",
    thumbPosition: "object-center",
    images: ["/images/projetos/gestao-imobiliarias/gestao-imobiliarias.png"],
    tags: ["Next.js", "TypeScript", "Supabase", "Pagar.me", "Assinatura eletrônica"],
    features: [
      "Gestão de imóveis, contratos e inquilinos",
      "Boleto e Pix com split automático de repasse",
      "Assinatura eletrônica de contratos",
      "Análise de crédito integrada ao fluxo",
      "Geração automática de contratos",
      "Relatórios da operação de locação",
    ],
    challenges: [
      "Dividir cada pagamento corretamente entre imobiliária e proprietário",
      "Montar um fluxo de assinatura eletrônica juridicamente válido",
      "Modelar contratos flexíveis sem transformar o banco de dados em caos",
    ],
    category: "web",
    featured: false,
  },
];

export const ndaProjects: NdaProject[] = [
  {
    title: "Sistema Bancário",
    description:
      "Plataforma completa para instituição financeira com processamento de transações em tempo real",
    tags: ["Node.js", "React", "PostgreSQL", "Redis", "AWS"],
    category: "web",
  },
  {
    title: "Aplicativo de Saúde",
    description:
      "Solução móvel para monitoramento de saúde e bem-estar integrado com dispositivos IoT",
    tags: ["React Native", "Firebase", "HealthKit", "Bluetooth LE"],
    category: "mobile",
  },
  {
    title: "Marketplace B2B",
    description:
      "Plataforma de comércio entre empresas com sistema de leilão reverso e logística integrada",
    tags: ["Next.js", "MongoDB", "Redux", "ElasticSearch"],
    category: "web",
  },
  {
    title: "Sistema ERP Industrial",
    description:
      "Software completo para gestão de processos industriais e cadeia de suprimentos",
    tags: ["Angular", "Java", "Oracle", "Docker", "Kubernetes"],
    category: "web",
  },
  {
    title: "Plataforma de Educação",
    description:
      "LMS avançado com recursos de gamificação e IA para personalização do aprendizado",
    tags: ["Vue.js", "Python", "Django", "TensorFlow", "AWS"],
    category: "data",
  },
  {
    title: "App de Logística",
    description:
      "Aplicativo para rastreamento e gestão de entregas em tempo real com otimização de rotas",
    tags: ["Flutter", "Node.js", "MongoDB", "Google Maps API"],
    category: "mobile",
  },
];

export const categoryLabels: Record<ProjectCategory, string> = {
  mobile: "App mobile",
  web: "Aplicação web",
  data: "Análise de dados",
  ai: "Produto com IA",
};

export const categories: { id: ProjectCategory | "all"; name: string }[] = [
  { id: "all", name: "Todos" },
  { id: "ai", name: "IA" },
  { id: "web", name: "Web" },
  { id: "mobile", name: "Mobile" },
  { id: "data", name: "Análise de Dados" },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
