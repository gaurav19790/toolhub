import { InfoPage } from "@/components/InfoPage";

export const metadata = {
  title: "About ToolHub",
  description: "Learn about ToolHub and its free online tools.",
};

export default function Page() {
  return (
    <InfoPage
      title="About ToolHub"
      description="ToolHub is a growing collection of free browser-based tools for images, PDFs, JSON, SEO, writing, design, finance, and everyday web tasks."
      sections={[
        {
          heading: "Our goal",
          body: "We build simple tools that help people finish common tasks quickly without creating an account or installing software.",
        },
        {
          heading: "How tools are built",
          body: "Some tools run fully in the browser, while tools that need file conversion may use server-side processing. Each tool page explains its workflow and intended use.",
        },
      ]}
    />
  );
}
