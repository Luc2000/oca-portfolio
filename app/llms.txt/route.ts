import { projects } from "../data/projects";
import { services } from "../data/services";
import { site } from "../data/site";
import { companyFacts } from "../lib/markdown";

// llms.txt (llmstxt.org): resumo do site em Markdown para assistentes de IA
export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> ${site.description} Atende empresas de todo o Brasil, com proposta por escopo e pagamento por etapa entregue.`,
    "",
    "A OCA desenvolve aplicativos iOS e Android, sistemas web, MVPs para startups e soluções com inteligência artificial. Também assume projetos já começados, inclusive apps feitos com IA, para auditar, finalizar e publicar nas lojas. O cliente conta o projeto, recebe uma faixa de investimento e um prazo, e só depois marca a conversa para fechar.",
    "",
    "## Fatos",
    "",
    ...companyFacts.map((fact) => `- ${fact}`),
    "",
    "## Serviços",
    "",
    ...services.map(
      (service) =>
        `- [${service.headline}](${site.url}/servicos/${service.slug}.md): ${service.summary}`,
    ),
    "",
    "## Guias de preço e decisão",
    "",
    ...services.flatMap((service) =>
      service.guides.map(
        (guide) => `- [${guide.title}](${site.url}/blog/${guide.slug})`,
      ),
    ),
    "",
    "## Projetos em produção",
    "",
    ...projects.map(
      (project) =>
        `- [${project.title}](${site.url}/projetos/${project.slug}): ${project.description}`,
    ),
    "",
    "## Para desenvolvedores",
    "",
    `- [Vitrine de devs indicados](${site.url}/devs): perfis de desenvolvedores parceiros, com contato direto.`,
    `- [Parcerias](${site.url}/parceiros): como entrar na vitrine ou no time de execução da OCA.`,
    "",
    "## Mais",
    "",
    `- [Sobre a OCA](${site.url}/sobre)`,
    `- [Blog](${site.url}/blog)`,
    `- [Todos os serviços](${site.url}/servicos)`,
    `- [Conteúdo completo em um arquivo](${site.url}/llms-full.txt)`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
