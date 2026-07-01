import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ToolDirectory } from "@/components/ToolDirectory";
import { tools } from "@/lib/tools";

export const metadata = {
  title: "ToolHub - 40+ Free Online Tools",
  description:
    "ToolHub provides 40+ free online utilities for images, PDFs, JSON, SEO, text, finance, design, and daily productivity tasks.",
};

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <Navbar />
      <main className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_8%,rgba(236,72,153,0.24),transparent_28%),radial-gradient(circle_at_80%_16%,rgba(99,102,241,0.24),transparent_28%),linear-gradient(180deg,#020617,#0f172a_42%,#020617)]" />

        <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-14 pt-32 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-pink-300">
              Free online utility hub
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-normal md:text-7xl">
              Free Online Tools for Images, PDFs, JSON, SEO, Text, Finance, and Everyday Tasks
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Use fast browser-based tools to compress images, format JSON,
              convert readable PDFs, generate SEO assets, clean text, calculate
              finance values, and complete daily web tasks with no signup.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#tools"
                className="rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 px-6 py-3 font-bold text-white shadow-xl shadow-pink-950/40"
              >
                Explore Tools
              </a>
              <a
                href="#categories"
                className="rounded-xl border border-white/10 bg-white/10 px-6 py-3 font-bold text-slate-100 backdrop-blur"
              >
                View Categories
              </a>
            </div>
          </div>

          <div className="[perspective:1200px]">
            <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/40 backdrop-blur-xl [transform:rotateX(6deg)_rotateY(-8deg)]">
              {tools.slice(0, 9).map((tool, index) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group grid grid-cols-[64px_1fr_auto] items-center gap-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4 transition hover:-translate-y-1 hover:border-pink-400/60 hover:bg-slate-900"
                  style={{ transform: `translateZ(${index * 2}px)` }}
                >
                  <span className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${tool.accent} text-sm font-black shadow-lg shadow-black/30`}>
                    {tool.icon}
                  </span>
                  <span>
                    <span className="block font-bold">{tool.name}</span>
                    <span className="block text-sm text-slate-400">
                      {tool.shortDescription}
                    </span>
                  </span>
                  <span className="text-sm font-bold text-pink-300">Open</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ToolDirectory />
      </main>
      <Footer />
    </div>
  );
}
