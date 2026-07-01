import { InfoPage } from "@/components/InfoPage";

export const metadata = {
  title: "Disclaimer - ToolHub",
  description: "Important disclaimers for ToolHub tools.",
};

export default function Page() {
  return (
    <InfoPage
      title="Disclaimer"
      description="ToolHub tools are designed to help with common tasks, but results should be reviewed before use."
      sections={[
        {
          heading: "No professional advice",
          body: "Legal, financial, health, and compliance-related tools provide general information or drafts only. They are not a substitute for qualified professional advice.",
        },
        {
          heading: "Accuracy",
          body: "We aim to keep tools useful and accurate, but users should verify outputs before publishing, submitting, or relying on them.",
        },
      ]}
    />
  );
}
