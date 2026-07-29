/**
 * BLOG CONFIG — single source of truth for everything that is NOT markdown content.
 *
 *   - This file owns:        categories, schedule, branding, CTAs, SEO rules, writers list.
 *   - `ecosystem.md` owns:   business context, services, audiences, brand pillars.
 *   - `writers/*.md` own:    each writer persona (voice, beat, structure).
 *
 * Category slugs must match the rows in supabase/schema.sql.
 */

export type Audience = "clientes" | "devs";

export interface CategoryConfig {
  slug: string;
  name: string;
  audience: Audience;
}

export interface CTAMapping {
  /** Comma-separated topic keywords this CTA covers */
  topics: string;
  /** Full HTML anchor tag inserted at end of post */
  html: string;
}

export interface WriterConfig {
  slug: string;
  name: string;
  audience: Audience;
  categories: string[];
  personaFile: string;
}

export interface BlogConfig {
  branding: {
    languageName: string;
    blogBaseUrl: string;
  };
  categories: CategoryConfig[];
  schedule: {
    timezone: string;
    devsHours: number[];
  };
  cta: {
    mappings: CTAMapping[];
    fallback: string;
  };
  styleRules: string[];
  seoRules: string[];
  ecosystemFile: string;
  writers: WriterConfig[];
  themeBank: Record<string, string[]>;
}

const WHATSAPP = "5511949629527";

function whatsappCta(label: string, message: string): string {
  return `<a href="https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}" class="blog-cta-link">${label}</a>`;
}

export const blogConfig: BlogConfig = {
  branding: {
    languageName: "Brazilian Portuguese",
    blogBaseUrl: process.env.BLOG_BASE_URL ?? "https://oca.dev.br/blog",
  },

  // clientes = quem quer contratar/tirar ideia do papel; devs = rede de parceiros
  categories: [
    { slug: "criar-aplicativo", name: "Criar um Aplicativo", audience: "clientes" },
    { slug: "mvp-e-startups", name: "MVP e Startups", audience: "clientes" },
    { slug: "ia-para-empresas", name: "IA para Empresas", audience: "clientes" },
    { slug: "software-sob-medida", name: "Software Sob Medida", audience: "clientes" },
    { slug: "tecnologia-e-negocios", name: "Tecnologia e Negócios", audience: "clientes" },
    { slug: "freelance-dev", name: "Freelance para Devs", audience: "devs" },
    { slug: "carreira-dev", name: "Carreira Dev", audience: "devs" },
  ],

  // 4 runs/day (see launchd plist): 9h e 15h = clientes, 11h e 17h = devs
  schedule: {
    timezone: "America/Sao_Paulo",
    devsHours: [11, 17],
  },

  cta: {
    mappings: [
      {
        topics:
          "criar aplicativo, app mobile, ideia de app, quanto custa um app, react native",
        html: whatsappCta(
          "Fale com a OCA sobre o seu aplicativo",
          "Olá Lucas, li um artigo no blog da OCA e quero conversar sobre criar um aplicativo."
        ),
      },
      {
        topics: "mvp, startup, validação de ideia, produto mínimo viável, investimento",
        html: whatsappCta(
          "Tire seu MVP do papel com a OCA",
          "Olá Lucas, li um artigo no blog da OCA e quero conversar sobre tirar meu MVP do papel."
        ),
      },
      {
        topics: "ia, inteligência artificial, chatbot, agentes, automação",
        html: whatsappCta(
          "Converse com a OCA sobre IA no seu negócio",
          "Olá Lucas, li um artigo no blog da OCA e quero conversar sobre aplicar IA na minha empresa."
        ),
      },
      {
        topics:
          "software sob medida, sistema web, contratar desenvolvimento, software house, integrações",
        html: whatsappCta(
          "Converse com a OCA sobre o seu sistema",
          "Olá Lucas, li um artigo no blog da OCA e quero conversar sobre um software sob medida."
        ),
      },
      {
        topics:
          "freelance, carreira dev, parceria, projetos repassados, precificação de projetos, portfolio de dev",
        html: whatsappCta(
          "Entre para a rede de parceiros da OCA",
          "Olá Lucas, sou dev, li o blog da OCA e quero entrar para a rede de parceiros."
        ),
      },
    ],
    fallback: `<a href="https://oca.dev.br/contato" class="blog-cta-link">Conte para a OCA o que você quer construir</a>`,
  },

  styleRules: [
    "NEVER use em dash (—) or double hyphen (--). Use commas, periods, or rephrase.",
    "NEVER use emojis in body content.",
    'Avoid generic AI phrasing in Portuguese: "no mundo de hoje", "nesse sentido", "em um cenário onde", "cada vez mais", "não é mais um diferencial, é uma necessidade".',
    'Avoid hype words: "incrível", "revolucionário", "extraordinário", "o melhor", "único no mercado", "disruptivo".',
    "Short, objective sentences. Active voice. No essay-style padding.",
    'Headlines must be problem-focused, optimized for SEO and clicks. "Quanto custa criar um aplicativo em 2026" beats "Considerações sobre o desenvolvimento de aplicativos".',
    "Do NOT write generic content any blog could publish. Use the perspective of someone who ships software for a living and has real production numbers.",
    "When the topic involves cost or timeline, give realistic ranges in BRL and weeks. Vague answers destroy trust; caveat with what makes the number move.",
    "Never promise results OCA cannot guarantee (guaranteed revenue, guaranteed app store approval, guaranteed investor funding).",
  ],

  seoRules: [
    "Title: 50-200 chars, primary keyword at the start",
    "Slug: URL-safe, lowercase, no accents, hyphens only",
    "Excerpt: ~160 chars, attractive summary with the keyword",
    "Meta title: max 70 chars, search-optimized",
    "Meta description: max 160 chars, with implicit call-to-action",
    "Tags: 3-6 relevant lowercase tags",
    "Clean HTML content, no CSS classes (except blog-cta-link on CTAs)",
    'When it strengthens the answer, link naturally to https://oca.dev.br/projetos (portfolio) or https://oca.dev.br/contato using descriptive anchor text in Portuguese.',
  ],

  ecosystemFile: "ecosystem.md",

  writers: [
    {
      slug: "lucas-o-fundador",
      name: "Lucas Annunziato",
      audience: "devs",
      categories: ["freelance-dev", "carreira-dev"],
      personaFile: "writers/lucas-o-fundador.md",
    },
    {
      slug: "rafael-o-arquiteto",
      name: "Rafael Oliveira",
      audience: "clientes",
      categories: [
        "software-sob-medida",
        "tecnologia-e-negocios",
        "ia-para-empresas",
      ],
      personaFile: "writers/rafael-o-arquiteto.md",
    },
    {
      slug: "gabriela-a-estrategista",
      name: "Gabriela Dionelli",
      audience: "clientes",
      categories: ["criar-aplicativo", "mvp-e-startups"],
      personaFile: "writers/gabriela-a-estrategista.md",
    },
  ],

  themeBank: {
    "criar-aplicativo": [
      "Quanto custa criar um aplicativo em 2026: faixas reais de preço sem enrolação",
      "Tenho uma ideia de aplicativo: por onde começar (guia para quem não é técnico)",
      "App nativo, híbrido ou PWA: qual faz sentido para o seu bolso e o seu prazo",
      "Quanto tempo leva para desenvolver um aplicativo do zero",
      "Como proteger sua ideia de app antes de contratar um desenvolvedor",
      "Os erros mais caros de quem contrata o primeiro aplicativo",
    ],
    "mvp-e-startups": [
      "MVP: por que seu produto deve começar menor do que você imagina",
      "Como validar sua ideia de startup antes de gastar um real com desenvolvimento",
      "Quanto custa um MVP e o que cortar do escopo sem matar o produto",
      "No-code, low-code ou sob medida: o caminho certo para cada tipo de MVP",
      "Do MVP à escala: quando (e se) reescrever seu produto",
      "O que investidores realmente olham em um MVP",
    ],
    "ia-para-empresas": [
      "Chatbot com IA para atendimento: o que funciona de verdade e o que é hype",
      "Como automatizar processos repetitivos com agentes de IA",
      "Quanto custa implementar IA na sua empresa (spoiler: menos do que você pensa)",
      "RAG, agentes, fine-tuning: traduzindo o jargão de IA para dono de negócio",
      "Onde IA ainda NÃO vale a pena na sua operação",
      "IA no WhatsApp: automatizando atendimento sem perder o tom humano",
    ],
    "software-sob-medida": [
      "Software pronto vs sob medida: a conta que ninguém faz na hora de decidir",
      "Como contratar uma software house sem cair em cilada",
      "Quanto custa um sistema web sob medida em 2026",
      "Sinais de que sua operação cresceu além da planilha",
      "Manutenção de software: o custo invisível que ninguém coloca no orçamento",
      "Como escrever um briefing de software que evita retrabalho e surpresa no preço",
    ],
    "tecnologia-e-negocios": [
      "Como escolher tecnologia sem virar refém do fornecedor",
      "Integrações entre sistemas: fazendo seu ERP, CRM e site conversarem",
      "O que é dívida técnica e quanto ela custa para o seu negócio",
      "LGPD em produtos digitais: o mínimo obrigatório para não ter dor de cabeça",
      "Time interno, freelancer ou software house: qual modelo para cada momento",
      "Como medir o retorno de um produto digital além do faturamento",
    ],
    "freelance-dev": [
      "Como conseguir os primeiros clientes como dev freelancer sem depender de plataforma gringa",
      "Quanto cobrar por hora como dev freelancer no Brasil: a conta honesta",
      "Contrato de freelance: as cláusulas que salvam sua pele",
      "Como escrever uma proposta de projeto que fecha (com estrutura pronta)",
      "Escopo aberto é prejuízo: como cercar o escopo antes de aceitar o projeto",
      "Parceria com software house: como funciona receber projetos repassados",
    ],
    "carreira-dev": [
      "As stacks que mais geram projeto freelance no Brasil em 2026",
      "CLT, PJ ou freelance: a matemática real para devs",
      "Portfolio de dev que gera lead: o que colocar e o que cortar",
      "Como aparecer no Google e nas IAs como dev: a receita que usamos na OCA",
      "Sinais de que você está pronto para atender clientes por conta própria",
      "O que realmente aumenta o valor da sua hora como dev",
    ],
  },
};
