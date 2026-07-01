import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { blogPosts, getBlogPost } from "@/lib/blogPosts";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) return {};

  return {
    title: `${post.title} - ToolHub`,
    description: post.description,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-32">
        <Link href="/blog" className="text-sm text-slate-400 hover:text-white">
          Back to blog
        </Link>
        <h1 className="mt-8 text-4xl font-black tracking-normal md:text-6xl">
          {post.title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          {post.description}
        </p>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.055] p-6 shadow-xl shadow-black/20">
          <h2 className="text-2xl font-bold">How to do it</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-slate-300">
            {post.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.055] p-6 shadow-xl shadow-black/20">
          <h2 className="text-2xl font-bold">Recommended tool</h2>
          <p className="mt-3 leading-7 text-slate-400">
            Use ToolHub&apos;s {post.tool} to complete this workflow quickly.
          </p>
          <Link
            href={post.toolPath}
            className="mt-5 inline-flex rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 px-5 py-3 text-sm font-black text-white"
          >
            Open {post.tool}
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
