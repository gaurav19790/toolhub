import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
export const metadata = {
  title: "ToolHub — Free Online Tools",
  description:
    "ToolHub provides 20+ free online utilities including image compression, PDF to Word conversion, and privacy policy generation. Fast, private, and easy-to-use tools with no registration required.",
};

export default function Home() {
  const tools = [
    {
      id: "image-compressor",
      name: "Image Compressor",
      description:
        "Compress images without losing quality. Reduce file size up to 80%.",
      icon: "🖼️",
      category: "Media",
      link: "/tools/image-compressor",
    },
    {
      id: "url-shortener",
      name: "URL Shortener",
      description:
        "Create short, memorable links. Track clicks and manage URLs easily.",
      icon: "🔗",
      category: "Web",
      link: "/tools/url-shortener",
      coming: true,
    },
    {
      id: "qr-code-generator",
      name: "QR Code Generator",
      description:
        "Generate QR codes instantly. Download in PNG or SVG format.",
      icon: "📱",
      category: "Media",
      link: "/tools/qr-code-generator",
      coming: true,
    },
    {
      id: "pdf-to-word",
      name: "PDF to Word",
      description: "Convert PDF files to editable Word documents in seconds.",
      icon: "📄",
      category: "Conversion",
      link: "#",
      coming: true,
    },
    {
      id: "privacy-policy-generator",
      name: "Privacy Policy Generator",
      description: "Generate professional privacy policies for your website.",
      icon: "⚖️",
      category: "Legal",
      link: "/tools/privacy-policy-generator",
    },
    {
      id: "text-to-speech",
      name: "Text to Speech",
      description:
        "Convert text to natural-sounding audio in multiple languages.",
      icon: "🔊",
      category: "Audio",
      link: "#",
      coming: true,
    },
    {
      id: "json-formatter",
      name: "JSON Formatter",
      description: "Format, validate, and minify JSON code instantly.",
      icon: "{ }",
      category: "Developer",
      link: "#",
      coming: true,
    },
    {
      id: "password-generator",
      name: "Password Generator",
      description: "Generate strong, secure passwords with custom settings.",
      icon: "🔐",
      category: "Security",
      link: "#",
      coming: true,
    },
    {
      id: "color-picker",
      name: "Color Picker",
      description: "Pick colors from anywhere. Get HEX, RGB, HSL codes.",
      icon: "🎨",
      category: "Design",
      link: "#",
      coming: true,
    },
    {
      id: "unit-converter",
      name: "Unit Converter",
      description: "Convert between different units of measurement instantly.",
      icon: "📐",
      category: "Utility",
      link: "#",
      coming: true,
    },
  ];

  const categories = [...new Set(tools.map((t) => t.category))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      {/* Navigation */}
      <Navbar />
      {/* Hero Section */}
      <div className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent leading-tight">
              Free Online Tools
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
              Discover 20+ powerful, free tools to simplify your daily tasks. No
              registration, no ads, completely private.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
            <div className="p-4 md:p-6 rounded-xl bg-slate-800/50 border border-slate-700">
              <div className="text-2xl md:text-3xl font-bold text-pink-400">
                20+
              </div>
              <p className="text-slate-400 text-sm md:text-base">Tools</p>
            </div>
            <div className="p-4 md:p-6 rounded-xl bg-slate-800/50 border border-slate-700">
              <div className="text-2xl md:text-3xl font-bold text-purple-400">
                100%
              </div>
              <p className="text-slate-400 text-sm md:text-base">Free</p>
            </div>
            <div className="p-4 md:p-6 rounded-xl bg-slate-800/50 border border-slate-700">
              <div className="text-2xl md:text-3xl font-bold text-indigo-400">
                ∞
              </div>
              <p className="text-slate-400 text-sm md:text-base">Private</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div
        id="tools"
        className="py-20 px-6 bg-slate-900/50 border-t border-slate-800"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Explore Our Tools
          </h2>
          <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
            Browse through our collection of tools organized by category. More
            tools coming soon!
          </p>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.map((tool) => (
              <a
                key={tool.id}
                href={tool.link}
                className={`group p-6 rounded-lg border transition-all duration-300 ${
                  tool.coming
                    ? "bg-slate-800/30 border-slate-700 cursor-not-allowed"
                    : "bg-gradient-to-br from-slate-800/50 to-slate-800/20 border-slate-700 hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/10 hover:-translate-y-1"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="text-3xl">{tool.icon}</div>
                  {tool.coming && (
                    <span className="px-2 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded text-xs text-yellow-300 font-semibold">
                      Coming
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-pink-400 transition">
                  {tool.name}
                </h3>
                <p className="text-slate-400 text-sm mb-3">
                  {tool.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-slate-700/50 px-2 py-1 rounded">
                    {tool.category}
                  </span>
                  {!tool.coming && (
                    <span className="text-pink-400 group-hover:translate-x-1 transition">
                      →
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Why Choose ToolHub?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-slate-700 hover:border-pink-500/50 transition-all">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-slate-400">
                All tools run locally in your browser for instant results
                without server delays.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-slate-700 hover:border-purple-500/50 transition-all">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-3">100% Private</h3>
              <p className="text-slate-400">
                Your data never leaves your device. We don't store or share any
                information.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-slate-700 hover:border-indigo-500/50 transition-all">
              <div className="text-4xl mb-4">💯</div>
              <h3 className="text-xl font-bold mb-3">Completely Free</h3>
              <p className="text-slate-400">
                No ads, no registration, no hidden fees. All tools are 100% free
                forever.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-slate-700 hover:border-pink-500/50 transition-all">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-3">Works Everywhere</h3>
              <p className="text-slate-400">
                Desktop, tablet, or mobile. Access all tools from any device
                with a browser.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-slate-700 hover:border-purple-500/50 transition-all">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-3">Always Updated</h3>
              <p className="text-slate-400">
                New tools added regularly. Stay tuned for more powerful
                utilities.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-slate-700 hover:border-indigo-500/50 transition-all">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-3">Community Loved</h3>
              <p className="text-slate-400">
                Join thousands of users who trust ToolHub for their daily tasks.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div
        id="about"
        className="py-20 px-6 bg-slate-900/50 border-t border-slate-800"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Get Started Today
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            Start using our tools right now. No download, no installation, no
            account needed. Just click and go!
          </p>
          <a
            href="#tools"
            className="inline-block px-10 py-4 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-pink-500/50 hover:shadow-2xl transform hover:-translate-y-1"
          >
            Explore Tools →
          </a>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
