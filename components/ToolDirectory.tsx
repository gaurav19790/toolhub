"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getCategories, tools } from "@/lib/tools";

const filters = [
  "Popular",
  "Image",
  "PDF",
  "Developer",
  "SEO",
  "Text",
  "Calculator",
];

const popularSlugs = new Set([
  "image-compressor",
  "json-formatter",
  "pdf-to-word",
  "word-counter",
  "password-generator",
  "color-converter",
  "qr-code-generator",
  "meta-title-checker",
]);

function matchesFilter(tool: (typeof tools)[number], filter: string) {
  if (filter === "Popular") return popularSlugs.has(tool.slug);
  if (filter === "Image") return tool.category === "Media" || tool.slug.includes("image");
  if (filter === "PDF") return tool.category === "PDF" || tool.slug.includes("pdf");
  if (filter === "Calculator") {
    return ["Math", "Finance", "Health", "Time", "Utility", "Design"].includes(tool.category);
  }
  return tool.category === filter;
}

export function ToolDirectory() {
  const categories = getCategories();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Popular");

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return tools.filter((tool) => {
      const filterMatch = activeFilter === "All" || matchesFilter(tool, activeFilter);
      const searchMatch =
        !normalizedQuery ||
        [tool.name, tool.category, tool.shortDescription, tool.description]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return filterMatch && searchMatch;
    });
  }, [activeFilter, query]);

  const visibleCategories = categories.filter((category) =>
    filteredTools.some((tool) => tool.category === category)
  );

  return (
    <>
      <section id="categories" className="mx-auto max-w-7xl px-6 pb-8">
        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20 backdrop-blur">
          <label className="block text-sm font-bold text-slate-200">
            Search tools
          </label>
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              if (activeFilter === "Popular") setActiveFilter("All");
            }}
            placeholder="Search tools: image compressor, JSON formatter, word counter..."
            className="mt-3 w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-300"
          />

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveFilter("All")}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                activeFilter === "All"
                  ? "border-cyan-300 bg-cyan-300 text-slate-950"
                  : "border-white/10 bg-white/[0.07] text-slate-200 hover:border-cyan-300/60"
              }`}
            >
              All
            </button>
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                  activeFilter === filter
                    ? "border-pink-300 bg-pink-300 text-slate-950"
                    : "border-white/10 bg-white/[0.07] text-slate-200 hover:border-pink-300/60"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="tools" className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Tool Library
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-normal md:text-5xl">
              {activeFilter === "All" ? "All tools" : `${activeFilter} tools`}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-400">
            {filteredTools.length} matching tools. Search by task, category, or
            tool name and jump directly into the workflow you need.
          </p>
        </div>

        {filteredTools.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 text-slate-300">
            No tools matched your search. Try “image”, “JSON”, “PDF”, “SEO”, or
            “calculator”.
          </div>
        ) : (
          <div className="space-y-14">
            {visibleCategories.map((category) => (
              <div
                key={category}
                id={category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
              >
                <h3 className="mb-5 text-2xl font-black">{category}</h3>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredTools
                    .filter((tool) => tool.category === category)
                    .map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/tools/${tool.slug}`}
                        className="group [perspective:900px]"
                      >
                        <div className="h-full rounded-2xl border border-white/10 bg-white/[0.055] p-5 shadow-xl shadow-black/20 backdrop-blur transition duration-300 group-hover:-translate-y-2 group-hover:border-pink-400/50 group-hover:bg-white/[0.08] group-hover:[transform:rotateX(4deg)_rotateY(-4deg)]">
                          <div className="mb-5 flex items-start justify-between gap-3">
                            <span
                              className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${tool.accent} text-sm font-black text-white shadow-lg shadow-black/30`}
                            >
                              {tool.icon}
                            </span>
                            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                              {tool.custom ? "Advanced" : "Tool"}
                            </span>
                          </div>
                          <h4 className="text-lg font-bold">{tool.name}</h4>
                          <p className="mt-3 min-h-16 text-sm leading-6 text-slate-400">
                            {tool.shortDescription}
                          </p>
                          <div className="mt-5 text-sm font-bold text-pink-300">
                            Open tool
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
