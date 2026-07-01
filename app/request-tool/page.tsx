import { InfoPage } from "@/components/InfoPage";

export const metadata = {
  title: "Request a Tool - ToolHub",
  description: "Suggest a new online tool for ToolHub.",
};

export default function Page() {
  return (
    <InfoPage
      title="Request a Tool"
      description="Suggest new utility tools that would make ToolHub more useful."
      sections={[
        {
          heading: "What to suggest",
          body: "Useful requests include the tool name, who needs it, example input, expected output, and any privacy concerns.",
        },
        {
          heading: "Good candidates",
          body: "Small browser-based converters, calculators, formatters, validators, and content helpers are strong fits for ToolHub.",
        },
      ]}
    />
  );
}
