import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

type InfoPageProps = {
  title: string;
  description: string;
  sections: Array<{
    heading: string;
    body: string;
  }>;
};

export function InfoPage({ title, description, sections }: InfoPageProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-32">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
          ToolHub
        </p>
        <h1 className="text-4xl font-black tracking-normal md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">{description}</p>

        <div className="mt-10 space-y-6">
          {sections.map((section) => (
            <section
              key={section.heading}
              className="rounded-3xl border border-white/10 bg-white/[0.055] p-6 shadow-xl shadow-black/20"
            >
              <h2 className="text-2xl font-bold">{section.heading}</h2>
              <p className="mt-3 leading-7 text-slate-400">{section.body}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
