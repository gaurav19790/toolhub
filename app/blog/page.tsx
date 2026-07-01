import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { blogPosts } from "@/lib/blogPosts";
import { getCategories, tools } from "@/lib/tools";

export const metadata = {
  title: "ToolHub Blog - How to Use Every Online Tool",
  description:
    "Read detailed descriptions, use cases, and step-by-step instructions for every ToolHub online tool.",
};

export default function BlogPage() {
  const categories = getCategories();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main className="relative pt-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_10%,rgba(14,165,233,0.18),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(236,72,153,0.18),transparent_26%),linear-gradient(180deg,#020617,#0f172a_42%,#020617)]" />

        <section className="mx-auto max-w-7xl px-6 pb-12">
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              ToolHub guide
            </p>
            <h1 className="text-4xl font-black leading-tight tracking-normal md:text-6xl">
              How to use every ToolHub tool
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              This page explains what each tool does, when you should use it,
              and the exact steps to get a useful result. It is designed as a
              helpful content hub for visitors and search engines.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-10">
          <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="rounded-3xl border border-white/10 bg-white/[0.055] p-5 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-cyan-300/60"
              >
                <h2 className="text-xl font-black">{post.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {post.description}
                </p>
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <a
                key={category}
                href={`#${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm text-slate-200 transition hover:border-pink-300/70"
              >
                {category}
              </a>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl space-y-14 px-6 pb-20">
          {categories.map((category) => (
            <div
              key={category}
              id={category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
            >
              <h2 className="mb-6 text-3xl font-black">{category} Tools</h2>
              <div className="grid gap-6 lg:grid-cols-2">
                {tools
                  .filter((tool) => tool.category === category)
                  .map((tool) => (
                    <article
                      key={tool.slug}
                      className="rounded-3xl border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/20 backdrop-blur"
                    >
                      <div className="mb-5 flex items-start gap-4">
                        <div
                          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.accent} text-sm font-black shadow-lg shadow-black/30`}
                        >
                          {tool.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-black">{tool.name}</h3>
                          <p className="mt-2 text-sm leading-6 text-slate-400">
                            {tool.description}
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-5 md:grid-cols-2">
                        <div>
                          <h4 className="font-bold text-slate-100">
                            How to use
                          </h4>
                          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-300">
                            {tool.steps.map((step) => (
                              <li key={step}>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-100">
                            What you need
                          </h4>
                          <p className="mt-3 text-sm leading-6 text-slate-300">
                            Start with this input:{" "}
                            <span className="text-cyan-300">{tool.example}</span>
                          </p>
                          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-400">
                            {tool.features.map((feature) => (
                              <li key={feature}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <Link
                        href={`/tools/${tool.slug}`}
                        className={`mt-6 inline-flex rounded-xl bg-gradient-to-r ${tool.accent} px-5 py-3 text-sm font-black text-white shadow-lg`}
                      >
                        Open {tool.name}
                      </Link>
                    </article>
                  ))}
              </div>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
