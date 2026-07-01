import { InfoPage } from "@/components/InfoPage";

export const metadata = {
  title: "Contact ToolHub",
  description: "Contact ToolHub for feedback, bug reports, and tool requests.",
};

export default function Page() {
  return (
    <InfoPage
      title="Contact"
      description="Have feedback, a bug report, or an idea for a new tool? Use this page as the contact point for ToolHub."
      sections={[
        {
          heading: "Email",
          body: "For now, contact the site owner at your published support email address. Replace this text with your real support email before launching publicly.",
        },
        {
          heading: "What to include",
          body: "Please include the tool name, the page URL, what you expected to happen, and what actually happened.",
        },
      ]}
    />
  );
}
