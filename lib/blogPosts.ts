export const blogPosts = [
  {
    slug: "how-to-compress-images-online",
    title: "How to Compress Images Online",
    description:
      "Learn how to reduce image file size for faster websites, better SEO, and easier sharing.",
    tool: "Image Compressor",
    toolPath: "/tools/image-compressor",
    steps: [
      "Upload your JPG, PNG, or WebP image.",
      "Choose the compression quality or target size.",
      "Preview the compressed result.",
      "Download the optimized image and test it on your page.",
    ],
  },
  {
    slug: "how-to-format-json-online",
    title: "How to Format JSON Online",
    description:
      "Use a JSON formatter to validate, pretty-print, minify, and inspect API data.",
    tool: "JSON Formatter",
    toolPath: "/tools/json-formatter",
    steps: [
      "Paste raw JSON into the editor.",
      "Click format to make the structure readable.",
      "Use validate to find syntax errors.",
      "Copy or download the cleaned JSON.",
    ],
  },
  {
    slug: "best-free-seo-title-length-checker",
    title: "Best Free SEO Title Length Checker",
    description:
      "Check whether a meta title is clear, concise, and within a practical search-result length.",
    tool: "Meta Title Checker",
    toolPath: "/tools/meta-title-checker",
    steps: [
      "Paste your draft title.",
      "Check the character count.",
      "Rewrite titles that are too short, too long, or unclear.",
      "Use one focused keyword naturally.",
    ],
  },
  {
    slug: "pdf-to-word-without-uploading",
    title: "PDF to Word: What to Know Before Converting",
    description:
      "Understand when PDF to Word conversion works well and how to prepare readable PDFs.",
    tool: "PDF to Word",
    toolPath: "/tools/pdf-to-word",
    steps: [
      "Use a readable text-based PDF when possible.",
      "Upload the PDF to the converter.",
      "Download the generated DOCX file.",
      "Review the Word file for formatting cleanup.",
    ],
  },
  {
    slug: "free-password-generator-best-practices",
    title: "Free Password Generator Best Practices",
    description:
      "Create stronger passwords with enough length, mixed characters, and safe storage habits.",
    tool: "Password Generator",
    toolPath: "/tools/password-generator",
    steps: [
      "Choose at least 14 to 16 characters.",
      "Include numbers, mixed case letters, and symbols.",
      "Generate a unique password for each account.",
      "Store it in a trusted password manager.",
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
