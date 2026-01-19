export default function sitemap() {
  const baseUrl = "https://yourdomain.com";
  
  const tools = [
    { path: "/", priority: 1 },
    { path: "/tools/image-compressor", priority: 0.9 },
    { path: "/tools/pdf-to-word", priority: 0.9 },
    { path: "/tools/privacy-policy-generator", priority: 0.8 },
    { path: "/tools/url-shortener", priority: 0.8 },
    { path: "/tools/qr-code-generator", priority: 0.8 },
    { path: "/tools/text-to-speech", priority: 0.7 },
    { path: "/tools/json-formatter", priority: 0.7 },
    { path: "/tools/password-generator", priority: 0.7 },
    { path: "/tools/color-picker", priority: 0.7 },
    { path: "/tools/unit-converter", priority: 0.7 },
  ];

  return tools.map((tool) => ({
    url: `${baseUrl}${tool.path}`,
    lastModified: new Date(),
    priority: tool.priority,
  }));
}