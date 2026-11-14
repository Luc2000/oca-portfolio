import { companyFaq, contactFaq } from "../data/faq";
import { projects } from "../data/projects";
import { services } from "../data/services";
import { site } from "../data/site";
import {
  companyFacts,
  faqMarkdown,
  projectMarkdown,
  serviceMarkdown,
} from "../lib/markdown";

// Companion to /llms.txt: the full text of services, projects and FAQ in one file
export const dynamic = "force-static";

export function GET() {
  const body = [
    `# ${site.name}: conteúdo completo`,
    "",
    `> ${site.description}`,
    "",
    "## Fatos",
    "",
    ...companyFacts.map((fact) => `- ${fact}`),
    "",
    "---",
    "",
    services.map(serviceMarkdown).join("\n---\n\n"),
    "---",
    "",
    "# Projetos em produção",
    "",
    ...projects.map(projectMarkdown),
    "---",
    "",
    "# Perguntas frequentes",
    "",
    ...faqMarkdown([...companyFaq, ...contactFaq]),
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
