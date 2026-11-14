import { getService, services } from "../../../data/services";
import { site } from "../../../data/site";
import { serviceMarkdown } from "../../../lib/markdown";

// Served at /servicos/<slug>.md through a rewrite in next.config.ts
export const dynamic = "force-static";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return new Response("Not found", { status: 404 });

  return new Response(serviceMarkdown(service), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      // Keeps the HTML page as the one search engines index
      Link: `<${site.url}/servicos/${service.slug}>; rel="canonical"`,
    },
  });
}
