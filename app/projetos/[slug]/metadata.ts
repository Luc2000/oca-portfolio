import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // Carregar dados do projeto (numa implementação real, isso viria de uma API ou banco de dados)
  const projectsData = [
    {
      id: "revo-app",
      title: "Revo App",
      subtitle: "Plataforma completa de eventos e ingressos",
      description:
        "Aplicativo mobile para descoberta e compra de ingressos de eventos, com sistema completo de checkout, lotes dinâmicos, códigos secretos exclusivos e interface moderna com animações. Desenvolvido com React Native, Expo e backend Supabase.",
      image: "/images/projetos/revo/revo-app.jpg",
    },
    {
      id: "vipou",
      title: "Vipou",
      subtitle: "Sistema de gerenciamento de eventos",
      description:
        "Sistema de gerenciamento para o ecossistema Revo, permitindo a administração completa de eventos, ingressos, pagamentos e relatórios em tempo real.",
      image: "/images/projetos/vipou/vipou-dash.jpg",
    },
    {
      id: "meyu",
      title: "Meyu",
      subtitle: "Menu digital interativo",
      description:
        "Sistema de menu digital integrado ao ecossistema Revo, que permite restaurantes e bares gerenciarem seus cardápios digitalmente com integração ao sistema de pedidos.",
      image: "/images/projetos/meyu/meyu-menu.jpg",
    },
    {
      id: "delta-stats",
      title: "Delta Stats",
      subtitle: "Análise avançada de investimentos",
      description:
        "Plataforma de análise estatística de ações e investimentos, fornecendo insights avançados para investidores tomarem decisões baseadas em dados.",
      image: "/images/projetos/delta/delta-stats.jpg",
    },
  ];

  // Encontrar o projeto baseado no slug
  const project = projectsData.find((p) => p.id === params.slug);

  if (!project) {
    return {
      title: "Projeto Não Encontrado",
    };
  }

  return {
    title: `${project.title} - ${project.subtitle}`,
    description: project.description,
    openGraph: {
      title: `${project.title} - OCA Software House`,
      description: project.description,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}
