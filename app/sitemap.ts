import { tools } from "@/lib/tools";
import { blogPosts } from "@/lib/blogPosts";

export default function sitemap() {
  const baseUrl = "https://yourdomain.com";

  const pages = [
    { path: "/", priority: 1 },
    { path: "/blog", priority: 0.9 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.5 },
    { path: "/privacy", priority: 0.6 },
    { path: "/terms", priority: 0.5 },
    { path: "/disclaimer", priority: 0.5 },
    { path: "/report-bug", priority: 0.4 },
    { path: "/request-tool", priority: 0.4 },
    ...blogPosts.map((post) => ({
      path: `/blog/${post.slug}`,
      priority: 0.7,
    })),
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
