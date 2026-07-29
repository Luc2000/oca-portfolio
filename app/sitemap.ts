import { MetadataRoute } from "next";
import { projects } from "./data/projects";
import { services } from "./data/services";
import { site } from "./data/site";
import { getCategories, getPublishedPosts } from "./lib/blog";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories] = await Promise.all([
    getPublishedPosts(1000),
    getCategories(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    {
      url: `${site.url}/projetos`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${site.url}/sobre`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${site.url}/contato`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${site.url}/blog`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${site.url}/servicos`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${site.url}/servicos/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${site.url}/projetos/${project.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${site.url}/blog/categoria/${category.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...projectRoutes,
    ...categoryRoutes,
    ...postRoutes,
  ];
}
