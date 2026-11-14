import type { FaqItem } from "../data/faq";
import { getProject, type Project } from "../data/projects";
import type { Service } from "../data/services";
import { site } from "../data/site";

/* Plain-text renderings of the site's own data, served to AI assistants */

export const contactLine = `Contato: WhatsApp ${site.phone} (https://wa.me/${site.whatsapp}) ou ${site.url}/contato.`;

// Every line restates something already published on the site
export const companyFacts = [
  `Nome: ${site.name}.`,
  "O que faz: desenvolve aplicativos iOS e Android, sistemas web, MVPs para startups e soluções com inteligência artificial.",
  "Sede: São Paulo, SP. Atende empresas de todo o Brasil de forma remota.",
  `Fundador: ${site.founder} (${site.linkedin}).`,
  "Produto próprio: Revo App, plataforma de eventos e venda de ingressos com mais de 40 mil usuários.",
  "Como contratar: o cliente conta o projeto por WhatsApp ou formulário e recebe o entendimento do escopo com uma faixa de investimento e um prazo estimado. A análise inicial não é cobrada.",
  "Pagamento: dividido em etapas com entregáveis claros, pago conforme as etapas são entregues.",
  "Propriedade: o código e os acessos ficam com a empresa cliente, documentados.",
  "Prazos típicos: a maioria dos MVPs fica pronta entre 6 e 12 semanas; um MVP de aplicativo leva de 2 a 4 meses, do design à publicação.",
  "Tecnologias: React Native e Expo para aplicativos, Next.js e React para web, Node.js e Supabase no backend, além de integrações com IA.",
  contactLine,
];

export function faqMarkdown(items: FaqItem[]): string[] {
  return items.flatMap((item) => [`### ${item.question}`, "", item.answer, ""]);
}

export function serviceMarkdown(service: Service): string {
  const proof = service.proofSlugs
    .map((slug) => getProject(slug))
    .filter((project) => project !== undefined);

  return [
    `# ${service.headline}`,
    "",
    `> ${service.summary}`,
    "",
    service.lede,
    "",
    `Página: ${site.url}/servicos/${service.slug}`,
    "",
    "## O que entregamos",
    "",
    ...service.deliverables.map((deliverable) => `- ${deliverable}`),
    "",
    "## Como funciona",
    "",
    ...service.process.map(
      (step, index) => `${index + 1}. **${step.title}**: ${step.description}`
    ),
    "",
    "## Prova em produção",
    "",
    ...proof.map(
      (project) =>
        `- [${project.title}](${site.url}/projetos/${project.slug}): ${project.description}`
    ),
    "",
    "## Perguntas frequentes",
    "",
    ...faqMarkdown(service.faq),
    "## Guias para decidir",
    "",
    ...service.guides.map(
      (guide) => `- [${guide.title}](${site.url}/blog/${guide.slug})`
    ),
    "",
    contactLine,
    "",
  ].join("\n");
}

export function projectMarkdown(project: Project): string {
  return [
    `## ${project.title}: ${project.subtitle}`,
    "",
    ...project.fullDescription.flatMap((paragraph) => [paragraph, ""]),
    `Página: ${site.url}/projetos/${project.slug}`,
    "",
    `Tecnologias: ${project.tags.join(", ")}.`,
    "",
    "Funcionalidades:",
    "",
    ...project.features.map((feature) => `- ${feature}`),
    "",
  ].join("\n");
}
