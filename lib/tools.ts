export type ToolKind =
  | "text"
  | "number"
  | "list"
  | "color"
  | "encoding"
  | "generator"
  | "time"
  | "seo"
  | "finance"
  | "utility"
  | "special";

export type Tool = {
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  kind: ToolKind;
  icon: string;
  accent: string;
  steps: string[];
  features: string[];
  example: string;
  custom?: boolean;
};

export const tools: Tool[] = [
  {
    slug: "image-compressor",
    name: "Image Compressor",
    category: "Media",
    shortDescription: "Compress JPG, PNG, and WebP images for faster pages.",
    description:
      "Reduce image file size while keeping visual quality suitable for websites, blogs, and social sharing.",
    kind: "special",
    icon: "IMG",
    accent: "from-pink-500 to-rose-500",
    custom: true,
    example: "Upload product-photo.png and compress it before publishing.",
    steps: ["Upload one or more images.", "Choose the target quality or size.", "Preview the result.", "Download the optimized files."],
    features: ["Browser-friendly workflow", "Great for SEO page speed", "Supports common image formats"],
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    category: "Developer",
    shortDescription: "Format, validate, search, and minify JSON.",
    description:
      "Clean messy JSON, validate API responses, and prepare structured data for development work.",
    kind: "special",
    icon: "{ }",
    accent: "from-emerald-500 to-cyan-500",
    custom: true,
    example: '{"name":"ToolHub","tools":40}',
    steps: ["Paste JSON into the editor.", "Choose format, minify, or validate.", "Review any errors.", "Copy or download the result."],
    features: ["Validation feedback", "Minify and pretty-print modes", "Useful for API debugging"],
  },
  {
    slug: "pdf-to-word",
    name: "PDF to Word",
    category: "PDF",
    shortDescription: "Convert readable PDF text into an editable DOCX file.",
    description:
      "Extract text from PDF files and package it into a Word document for editing and reuse.",
    kind: "special",
    icon: "PDF",
    accent: "from-red-500 to-orange-500",
    custom: true,
    example: "Upload a PDF report and download converted.docx.",
    steps: ["Upload a PDF file.", "Start conversion.", "Wait for extraction.", "Download the DOCX file."],
    features: ["DOCX output", "Useful for text-heavy PDFs", "Simple upload workflow"],
  },
  {
    slug: "privacy-policy-generator",
    name: "Privacy Policy Generator",
    category: "Legal",
    shortDescription: "Create a starter privacy policy for a website.",
    description:
      "Generate a structured privacy policy draft using your website name, URL, contact email, and country.",
    kind: "special",
    icon: "LAW",
    accent: "from-blue-500 to-indigo-500",
    custom: true,
    example: "Generate a starter policy for example.com.",
    steps: ["Enter website details.", "Add contact information.", "Generate the policy.", "Review before publishing."],
    features: ["Structured legal sections", "Fast draft generation", "Helpful for AdSense readiness"],
  },
  { slug: "word-counter", name: "Word Counter", category: "Text", shortDescription: "Count words, characters, sentences, and paragraphs.", description: "Analyze text length for articles, ads, meta descriptions, and assignments.", kind: "text", icon: "ABC", accent: "from-sky-500 to-blue-500", example: "Paste an article draft to count words.", steps: ["Paste your text.", "Review live counts.", "Adjust your content.", "Copy the final text."], features: ["Word count", "Character count", "Reading estimate"] },
  { slug: "case-converter", name: "Case Converter", category: "Text", shortDescription: "Convert text to uppercase, lowercase, title case, and slug case.", description: "Quickly rewrite text casing for headings, filenames, URLs, and code labels.", kind: "text", icon: "Aa", accent: "from-violet-500 to-fuchsia-500", example: "Convert 'free online tools' to title case.", steps: ["Paste text.", "Pick a case action.", "Check the output.", "Copy the converted text."], features: ["Uppercase", "Lowercase", "Title case"] },
  { slug: "text-reverser", name: "Text Reverser", category: "Text", shortDescription: "Reverse letters or line order instantly.", description: "Flip text for testing, formatting, puzzle creation, or simple text experiments.", kind: "text", icon: "REV", accent: "from-cyan-500 to-teal-500", example: "Reverse ToolHub into buHlooT.", steps: ["Enter text.", "Choose reverse action.", "Preview the result.", "Copy the output."], features: ["Reverse characters", "Reverse lines", "Instant preview"] },
  { slug: "slug-generator", name: "Slug Generator", category: "SEO", shortDescription: "Create clean URL slugs from titles.", description: "Turn blog titles and page names into lowercase, hyphenated, SEO-friendly slugs.", kind: "seo", icon: "URL", accent: "from-lime-500 to-green-500", example: "Best Free PDF Tools becomes best-free-pdf-tools.", steps: ["Paste a title.", "Generate slug.", "Review punctuation cleanup.", "Use it in your URL."], features: ["SEO-friendly output", "Removes symbols", "Lowercase hyphen format"] },
  { slug: "meta-title-checker", name: "Meta Title Checker", category: "SEO", shortDescription: "Check title length for search results.", description: "Estimate whether your SEO title is short, clear, and search-result friendly.", kind: "seo", icon: "SEO", accent: "from-green-500 to-emerald-500", example: "ToolHub - Free Online Tools", steps: ["Enter a title.", "Check length.", "Adjust wording.", "Copy your final title."], features: ["Length guidance", "Character count", "SEO writing helper"] },
  { slug: "meta-description-checker", name: "Meta Description Checker", category: "SEO", shortDescription: "Measure meta description length.", description: "Draft concise descriptions that fit common search preview lengths.", kind: "seo", icon: "META", accent: "from-teal-500 to-cyan-500", example: "Free tools for images, PDFs, JSON, SEO, and daily tasks.", steps: ["Paste description.", "Check character count.", "Trim or expand.", "Copy final copy."], features: ["Character count", "Snippet helper", "Content quality reminder"] },
  { slug: "keyword-density-checker", name: "Keyword Density Checker", category: "SEO", shortDescription: "Find repeated words and keyword frequency.", description: "Analyze how often words appear in page copy for simple SEO review.", kind: "text", icon: "KEY", accent: "from-amber-500 to-yellow-500", example: "Paste a blog post and inspect top terms.", steps: ["Paste page text.", "Run analysis.", "Review frequent terms.", "Refine your content."], features: ["Top words", "Density estimate", "Content review"] },
  { slug: "password-generator", name: "Password Generator", category: "Security", shortDescription: "Generate strong random passwords.", description: "Create secure passwords for accounts, apps, hosting panels, and admin tools.", kind: "generator", icon: "PWD", accent: "from-red-500 to-pink-500", example: "Generate a 16 character password.", steps: ["Choose password length.", "Generate password.", "Copy it securely.", "Store it in a password manager."], features: ["Random output", "Configurable length", "Security-focused"] },
  { slug: "uuid-generator", name: "UUID Generator", category: "Developer", shortDescription: "Generate random UUID values.", description: "Create unique identifiers for database records, test data, and development workflows.", kind: "generator", icon: "ID", accent: "from-indigo-500 to-blue-500", example: "Generate a new v4-style UUID.", steps: ["Open the tool.", "Click generate.", "Copy the UUID.", "Use it in your project."], features: ["Unique IDs", "Developer friendly", "Fast copy workflow"] },
  { slug: "qr-code-generator", name: "QR Code Generator", category: "Media", shortDescription: "Prepare text or links for QR code creation.", description: "Enter a URL or text payload and prepare QR-ready content for campaigns and labels.", kind: "encoding", icon: "QR", accent: "from-slate-400 to-slate-200", example: "https://example.com", steps: ["Paste a link.", "Review the encoded payload.", "Use the text in a QR workflow.", "Test before publishing."], features: ["URL cleanup", "Campaign friendly", "Simple payload preview"] },
  { slug: "base64-encoder", name: "Base64 Encoder", category: "Developer", shortDescription: "Encode text into Base64.", description: "Convert plain text into Base64 for development, testing, and data URI workflows.", kind: "encoding", icon: "64E", accent: "from-purple-500 to-indigo-500", example: "Encode ToolHub.", steps: ["Enter text.", "Run encode.", "Review output.", "Copy Base64 text."], features: ["Text encoding", "Instant output", "Developer utility"] },
  { slug: "base64-decoder", name: "Base64 Decoder", category: "Developer", shortDescription: "Decode Base64 back to readable text.", description: "Inspect Base64 strings safely in your browser and convert them back to text.", kind: "encoding", icon: "64D", accent: "from-indigo-500 to-purple-500", example: "VG9vbEh1Yg==", steps: ["Paste Base64.", "Run decode.", "Review readable output.", "Copy the text."], features: ["Text decoding", "Validation feedback", "Fast inspection"] },
  { slug: "url-encoder", name: "URL Encoder", category: "Web", shortDescription: "Encode text for safe URL usage.", description: "Convert spaces and special characters into URL-safe encoded text.", kind: "encoding", icon: "%20", accent: "from-blue-500 to-cyan-500", example: "free online tools", steps: ["Enter text.", "Encode it.", "Review URL-safe output.", "Copy into your link."], features: ["URL-safe output", "Handles symbols", "Web developer helper"] },
  { slug: "url-decoder", name: "URL Decoder", category: "Web", shortDescription: "Decode URL-encoded strings.", description: "Turn encoded query strings and URL fragments back into readable text.", kind: "encoding", icon: "URL", accent: "from-cyan-500 to-blue-500", example: "free%20online%20tools", steps: ["Paste encoded text.", "Decode it.", "Review readable output.", "Copy the result."], features: ["Query debugging", "Readable output", "Fast conversion"] },
  { slug: "html-escape", name: "HTML Escape", category: "Developer", shortDescription: "Escape HTML-sensitive characters.", description: "Convert angle brackets, ampersands, and quotes into HTML entities.", kind: "encoding", icon: "ESC", accent: "from-orange-500 to-red-500", example: "<div>ToolHub</div>", steps: ["Paste HTML text.", "Escape entities.", "Review safe output.", "Copy the result."], features: ["Entity conversion", "Safer snippets", "Frontend helper"] },
  { slug: "html-unescape", name: "HTML Unescape", category: "Developer", shortDescription: "Convert HTML entities back to text.", description: "Decode common HTML entities into readable characters.", kind: "encoding", icon: "HTML", accent: "from-red-500 to-orange-500", example: "&lt;div&gt;ToolHub&lt;/div&gt;", steps: ["Paste escaped HTML.", "Decode entities.", "Review output.", "Copy text."], features: ["Entity decoding", "Readable snippets", "Content cleanup"] },
  { slug: "color-converter", name: "Color Converter", category: "Design", shortDescription: "Convert HEX colors to RGB.", description: "Translate common HEX color values into RGB for CSS, design tools, and documentation.", kind: "color", icon: "HEX", accent: "from-fuchsia-500 to-pink-500", example: "#6366f1", steps: ["Enter a HEX color.", "Convert it.", "Review RGB output.", "Copy CSS value."], features: ["HEX to RGB", "CSS friendly", "Design utility"] },
  { slug: "color-palette-generator", name: "Color Palette Generator", category: "Design", shortDescription: "Generate a simple color palette from one color.", description: "Create lighter and darker companion shades for interface experiments.", kind: "color", icon: "PAL", accent: "from-pink-500 to-amber-500", example: "#10b981", steps: ["Enter a base color.", "Generate palette.", "Review shades.", "Copy colors into your design."], features: ["Base color workflow", "Shade suggestions", "Visual planning"] },
  { slug: "unit-converter", name: "Unit Converter", category: "Utility", shortDescription: "Convert common length units.", description: "Convert meters, kilometers, miles, feet, and inches for everyday calculations.", kind: "number", icon: "UNIT", accent: "from-yellow-500 to-orange-500", example: "10 meters", steps: ["Enter a number.", "Choose the unit context.", "Review converted values.", "Use the result."], features: ["Length conversions", "Instant math", "Everyday utility"] },
  { slug: "percentage-calculator", name: "Percentage Calculator", category: "Math", shortDescription: "Calculate percentages quickly.", description: "Find percentages, discounts, markups, and proportional values for daily work.", kind: "number", icon: "%", accent: "from-green-500 to-lime-500", example: "18% of 250", steps: ["Enter the base number.", "Enter the percentage.", "Calculate result.", "Copy the value."], features: ["Percent of number", "Discount helper", "Quick math"] },
  { slug: "bmi-calculator", name: "BMI Calculator", category: "Health", shortDescription: "Estimate body mass index.", description: "Calculate BMI from height and weight for a simple health reference.", kind: "number", icon: "BMI", accent: "from-rose-500 to-pink-500", example: "70 kg and 175 cm", steps: ["Enter your weight.", "Enter your height.", "Calculate BMI.", "Read the basic category."], features: ["BMI formula", "Simple category", "Health reference"] },
  { slug: "loan-calculator", name: "Loan Calculator", category: "Finance", shortDescription: "Estimate monthly loan payments.", description: "Calculate a simple monthly payment estimate from amount, interest, and term.", kind: "finance", icon: "LOAN", accent: "from-emerald-500 to-green-500", example: "100000 at 9% for 5 years", steps: ["Enter loan amount.", "Add interest rate.", "Add years.", "Calculate monthly payment."], features: ["Payment estimate", "Finance planning", "Simple formula"] },
  { slug: "tip-calculator", name: "Tip Calculator", category: "Finance", shortDescription: "Calculate tips and split bills.", description: "Work out tip amount, total bill, and per-person split.", kind: "finance", icon: "TIP", accent: "from-amber-500 to-orange-500", example: "1000 bill with 10% tip split by 2.", steps: ["Enter bill amount.", "Choose tip percent.", "Add people count.", "Review split total."], features: ["Tip total", "Split amount", "Restaurant helper"] },
  { slug: "currency-format-helper", name: "Currency Format Helper", category: "Finance", shortDescription: "Format numbers as readable currency.", description: "Turn raw numbers into clean currency-style values for copy and reports.", kind: "finance", icon: "USD", accent: "from-cyan-500 to-emerald-500", example: "123456.7", steps: ["Enter a number.", "Format the amount.", "Review separators.", "Copy the result."], features: ["Readable numbers", "Report helper", "Fast formatting"] },
  { slug: "timestamp-converter", name: "Timestamp Converter", category: "Time", shortDescription: "Convert Unix timestamps to local time.", description: "Inspect timestamps from APIs, logs, databases, and analytics events.", kind: "time", icon: "TIME", accent: "from-blue-500 to-violet-500", example: "1719792000", steps: ["Paste a timestamp.", "Convert it.", "Review local date.", "Use it in debugging."], features: ["Unix timestamp support", "Local date output", "Developer debugging"] },
  { slug: "age-calculator", name: "Age Calculator", category: "Time", shortDescription: "Calculate age from a birth date.", description: "Find years elapsed between a date and today for forms or quick checks.", kind: "time", icon: "AGE", accent: "from-violet-500 to-purple-500", example: "1995-01-01", steps: ["Enter a date.", "Calculate age.", "Review years elapsed.", "Use the result."], features: ["Date difference", "Year estimate", "Simple input"] },
  { slug: "date-difference-calculator", name: "Date Difference Calculator", category: "Time", shortDescription: "Find days between two dates.", description: "Calculate elapsed days for schedules, events, deadlines, and planning.", kind: "time", icon: "DATE", accent: "from-indigo-500 to-sky-500", example: "2026-01-01 to 2026-06-30", steps: ["Enter start date.", "Enter end date.", "Calculate difference.", "Review day count."], features: ["Day difference", "Schedule planning", "Deadline helper"] },
  { slug: "random-number-generator", name: "Random Number Generator", category: "Utility", shortDescription: "Generate random numbers in a range.", description: "Pick random values for tests, games, samples, and decisions.", kind: "generator", icon: "RNG", accent: "from-lime-500 to-emerald-500", example: "Random number from 1 to 100.", steps: ["Enter minimum.", "Enter maximum.", "Generate number.", "Use the result."], features: ["Range control", "Instant random output", "Testing helper"] },
  { slug: "list-sorter", name: "List Sorter", category: "Text", shortDescription: "Sort lines alphabetically.", description: "Organize names, keywords, URLs, and simple lists in ascending order.", kind: "list", icon: "A-Z", accent: "from-sky-500 to-indigo-500", example: "Paste one item per line.", steps: ["Paste list items.", "Sort the list.", "Remove blanks if needed.", "Copy output."], features: ["Alphabetical sort", "Line-based workflow", "Clean output"] },
  { slug: "duplicate-line-remover", name: "Duplicate Line Remover", category: "Text", shortDescription: "Remove repeated lines from a list.", description: "Clean keyword lists, URLs, IDs, and other line-based text collections.", kind: "list", icon: "UNIQ", accent: "from-teal-500 to-green-500", example: "Paste repeated URLs.", steps: ["Paste a list.", "Remove duplicates.", "Review unique lines.", "Copy cleaned list."], features: ["Duplicate removal", "Preserves first match", "List cleanup"] },
  { slug: "csv-to-json", name: "CSV to JSON", category: "Data", shortDescription: "Convert simple CSV text into JSON.", description: "Turn comma-separated rows into JSON objects for tests and quick imports.", kind: "list", icon: "CSV", accent: "from-orange-500 to-amber-500", example: "name,age\nAsha,29", steps: ["Paste CSV with headers.", "Convert to JSON.", "Review objects.", "Copy output."], features: ["Header-based conversion", "JSON output", "Data helper"] },
  { slug: "json-to-csv", name: "JSON to CSV", category: "Data", shortDescription: "Convert JSON arrays into CSV.", description: "Transform simple arrays of objects into comma-separated text for spreadsheets.", kind: "list", icon: "J2C", accent: "from-amber-500 to-orange-500", example: "[{\"name\":\"Asha\",\"age\":29}]", steps: ["Paste JSON array.", "Convert to CSV.", "Review rows.", "Copy result."], features: ["Object array support", "CSV output", "Spreadsheet helper"] },
  { slug: "markdown-preview", name: "Markdown Preview", category: "Writing", shortDescription: "Preview basic Markdown as plain structure.", description: "Inspect headings, lists, and emphasis markers while drafting documentation.", kind: "text", icon: "MD", accent: "from-slate-500 to-gray-400", example: "# ToolHub\n- Fast tools", steps: ["Paste Markdown.", "Preview cleaned text.", "Check structure.", "Copy final draft."], features: ["Writing helper", "Documentation workflow", "Simple preview"] },
  { slug: "read-time-calculator", name: "Read Time Calculator", category: "Writing", shortDescription: "Estimate reading time from word count.", description: "Calculate approximate reading time for articles, blogs, and landing pages.", kind: "text", icon: "READ", accent: "from-blue-500 to-teal-500", example: "Paste your blog post.", steps: ["Paste content.", "Calculate word count.", "Review read time.", "Adjust length if needed."], features: ["Reading estimate", "Word count", "Content planning"] },
  { slug: "invoice-number-generator", name: "Invoice Number Generator", category: "Business", shortDescription: "Create simple invoice IDs.", description: "Generate readable invoice numbers with date and random suffixes.", kind: "generator", icon: "INV", accent: "from-emerald-500 to-teal-500", example: "INV-20260630-4821", steps: ["Open the tool.", "Generate an invoice number.", "Copy the ID.", "Use it in your invoice."], features: ["Business IDs", "Date-based format", "Quick generation"] },
  { slug: "utm-builder", name: "UTM Builder", category: "Marketing", shortDescription: "Build campaign tracking URLs.", description: "Create marketing URLs with source, medium, campaign, and content parameters.", kind: "seo", icon: "UTM", accent: "from-pink-500 to-purple-500", example: "example.com with source newsletter.", steps: ["Enter destination URL.", "Add campaign fields.", "Generate URL.", "Test the final link."], features: ["Campaign tracking", "URL parameter builder", "Marketing helper"] },
  { slug: "robots-txt-generator", name: "Robots.txt Generator", category: "SEO", shortDescription: "Create a starter robots.txt file.", description: "Generate simple crawl rules for search engine bots and sitemap discovery.", kind: "seo", icon: "BOT", accent: "from-gray-400 to-slate-300", example: "Allow all with sitemap URL.", steps: ["Enter domain.", "Choose crawl rule.", "Generate robots.txt.", "Upload to your site root."], features: ["SEO crawl helper", "Sitemap line", "Simple rules"] },
  { slug: "sitemap-url-helper", name: "Sitemap URL Helper", category: "SEO", shortDescription: "Prepare sitemap URL entries.", description: "Format page URLs for sitemap planning and search engine submission workflows.", kind: "seo", icon: "MAP", accent: "from-lime-500 to-cyan-500", example: "https://example.com/tools/json-formatter", steps: ["Paste URLs.", "Clean list.", "Review sitemap-ready lines.", "Add to your sitemap."], features: ["URL cleanup", "SEO planning", "Line-based output"] },
  { slug: "dns-record-notes", name: "DNS Record Notes", category: "Web", shortDescription: "Format DNS records for handoff notes.", description: "Prepare readable DNS setup notes for domains, hosting, and verification tasks.", kind: "utility", icon: "DNS", accent: "from-blue-500 to-slate-400", example: "TXT google-site-verification=...", steps: ["Enter record details.", "Generate notes.", "Review values.", "Share with your domain manager."], features: ["DNS handoff", "Verification notes", "Clean formatting"] },
  { slug: "email-template-generator", name: "Email Template Generator", category: "Business", shortDescription: "Draft simple outreach emails.", description: "Generate a clean email starter for support, sales, or contact replies.", kind: "text", icon: "MAIL", accent: "from-cyan-500 to-sky-500", example: "Draft a support reply.", steps: ["Enter context.", "Generate draft.", "Edit the tone.", "Send from your email app."], features: ["Business writing", "Fast draft", "Editable output"] },
  { slug: "text-to-speech-script", name: "Text to Speech Script", category: "Audio", shortDescription: "Prepare clean scripts for voice tools.", description: "Clean text into readable narration blocks before using a text-to-speech service.", kind: "text", icon: "TTS", accent: "from-purple-500 to-pink-500", example: "Paste a video intro script.", steps: ["Paste script.", "Clean spacing.", "Review narration blocks.", "Use in your voice tool."], features: ["Script cleanup", "Narration prep", "Content workflow"] },
  { slug: "file-size-converter", name: "File Size Converter", category: "Utility", shortDescription: "Convert bytes, KB, MB, and GB.", description: "Translate file sizes for upload limits, hosting plans, and compression checks.", kind: "number", icon: "SIZE", accent: "from-yellow-500 to-lime-500", example: "1048576 bytes", steps: ["Enter file size.", "Choose base unit.", "Convert values.", "Use the readable result."], features: ["Bytes to MB", "Upload planning", "Storage helper"] },
  { slug: "aspect-ratio-calculator", name: "Aspect Ratio Calculator", category: "Design", shortDescription: "Calculate proportional dimensions.", description: "Resize images, videos, and design frames while keeping the same ratio.", kind: "number", icon: "16:9", accent: "from-fuchsia-500 to-violet-500", example: "1920 width at 16:9.", steps: ["Enter width.", "Enter height or ratio.", "Calculate dimensions.", "Use in your design."], features: ["Responsive media", "Design math", "Ratio helper"] },
];

export const customToolSlugs = new Set(tools.filter((tool) => tool.custom).map((tool) => tool.slug));

export function getTool(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

export function getGeneratedTools() {
  return tools.filter((tool) => !tool.custom);
}

export function getCategories() {
  return Array.from(new Set(tools.map((tool) => tool.category))).sort();
}
