import { tools } from "@/lib/tools";

export default function sitemap() {
  const baseUrl = "https://yourdomain.com";

  const pages = [
    { path: "/", priority: 1 },
    { path: "/blog", priority: 0.9 },
    ...tools.map((tool) => ({
      path: `/tools/${tool.slug}`,
      priority: tool.custom ? 0.9 : 0.75,
    })),
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    priority: page.priority,
  }));
}
