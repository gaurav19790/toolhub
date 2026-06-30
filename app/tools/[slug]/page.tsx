import { notFound } from "next/navigation";
import { getGeneratedTools, getTool } from "@/lib/tools";
import GenericToolClient from "./GenericToolClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getGeneratedTools().map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const tool = getTool(slug);

  if (!tool || tool.custom) {
    return {};
  }

  return {
    title: `${tool.name} - ToolHub`,
    description: tool.description,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const tool = getTool(slug);

  if (!tool || tool.custom) {
    notFound();
  }

  return <GenericToolClient tool={tool} />;
}
