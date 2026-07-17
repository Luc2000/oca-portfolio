export type ProjectCategory = "mobile" | "web" | "data";

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
      "Aplicativo mobile para descoberta e compra de ingressos, com checkout transparente, lotes dinâmicos e códigos secretos para acesso exclusivo. Do zero ao produto rodando em produção com pagamentos reais.",
    fullDescription: [
      "O Revo App nasceu como produto próprio da OCA e virou a prova do que entregamos: uma plataforma completa de descoberta de eventos e venda de ingressos, construída de ponta a ponta, do design ao gateway de pagamento.",
      "Desenvolvido com React Native e Expo sobre backend Supabase, o app tem navegação fluida, animações de alta performance e atualização de dados em tempo real, com analytics de produto via Amplitude guiando cada decisão de UX.",
      "O checkout, integrado ao Pagar.me, foi desenhado para converter: lotes dinâmicos, códigos secretos para acesso VIP e um fluxo de compra transparente que atinge 90% de conversão.",
    ],
    highlight: "Checkout com 90% de taxa de conversão",
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
    slug: "vipou",
    title: "Vipou",
    subtitle: "Gestão de eventos em tempo real",
    description:
      "Dashboard administrativo do ecossistema Revo: gestão de eventos, ingressos, pagamentos e relatórios em tempo real para promoters e casas noturnas.",
    fullDescription: [
      "O Vipou é o painel de controle do ecossistema Revo: é onde organizadores criam eventos, configuram lotes de ingressos, acompanham vendas e fecham o caixa.",
      "Construído com Next.js, TypeScript e Tailwind CSS sobre o mesmo backend Supabase do app, o dashboard exibe métricas de venda em tempo real, sem atraso entre a compra no app e o número na tela.",
      "Controle de acesso por perfil, relatórios financeiros detalhados e exportação de dados dão ao organizador autonomia total sobre a operação do evento.",
    ],
    image: "/images/projetos/vipou/vipou.png",
    images: ["/images/projetos/vipou/vipou.png"],
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
    features: [
      "Dashboard de vendas em tempo real",
      "Gestão de eventos, lotes e ingressos",
      "Relatórios financeiros detalhados",
      "Controle de acesso por perfil de usuário",
      "Sistema de notificações",
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
    featured: true,
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
    featured: true,
  },
  {
    slug: "delta-stats",
    title: "Delta Stats",
    subtitle: "Análise estatística para traders",
    description:
      "Plataforma de análise estatística de ações sincronizada com dados históricos de preços, transformando volume de dados em decisões para traders.",
    fullDescription: [
      "O Delta Stats processa anos de dados históricos de preços de ações e devolve estatísticas acionáveis para traders: padrões, comparativos de performance e alertas configuráveis.",
      "O pipeline de dados em Python alimenta uma API Node.js com MongoDB, dimensionada para grandes volumes de séries históricas.",
      "No frontend em React, visualizações interativas com Chart.js apresentam os dados de forma clara, permitindo que o trader monte a própria análise em segundos.",
    ],
    image: "/images/projetos/delta/delta.png",
    images: ["/images/projetos/delta/delta.png"],
    tags: ["React", "Node.js", "Python", "MongoDB", "Chart.js"],
    features: [
      "Estatísticas sobre dados históricos de preços",
      "Visualizações interativas de dados financeiros",
      "Alertas personalizados por ativo",
      "Comparativo histórico de performance",
      "Sincronização com dados de mercado",
      "Dashboard personalizado por usuário",
    ],
    challenges: [
      "Processar grandes volumes de séries históricas com custo controlado",
      "Criar visualizações performáticas mesmo com milhares de pontos de dados",
      "Manter os dados de mercado sincronizados e consistentes",
    ],
    category: "data",
    link: "https://deltastats.com.br",
    linkLabel: "Acessar o site",
    featured: true,
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
};

export const categories: { id: ProjectCategory | "all"; name: string }[] = [
  { id: "all", name: "Todos" },
  { id: "web", name: "Web" },
  { id: "mobile", name: "Mobile" },
  { id: "data", name: "Análise de Dados" },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
