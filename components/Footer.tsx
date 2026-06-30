import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-2xl font-bold text-transparent">
              ToolHub
            </div>
            <p className="text-sm leading-6 text-slate-400">
              A growing library of free online tools for content, SEO, design,
              development, finance, and everyday productivity.
            </p>
          </div>
          <div>
            <h4 className="mb-3 font-bold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/#tools" className="transition hover:text-white">
                  Tools
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="transition hover:text-white">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/privacy-policy-generator"
                  className="transition hover:text-white"
                >
                  Privacy Policy Generator
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-bold">Popular Tools</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link
                  href="/tools/image-compressor"
                  className="transition hover:text-white"
                >
                  Image Compressor
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/json-formatter"
                  className="transition hover:text-white"
                >
                  JSON Formatter
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/password-generator"
                  className="transition hover:text-white"
                >
                  Password Generator
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p>&copy; 2026 ToolHub. Free tools for everyone.</p>
        </div>
      </div>
    </footer>
  );
};
