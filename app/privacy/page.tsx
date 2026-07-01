import { InfoPage } from "@/components/InfoPage";

export const metadata = {
  title: "Privacy Policy - ToolHub",
  description: "Privacy information for ToolHub users.",
};

export default function Page() {
  return (
    <InfoPage
      title="Privacy Policy"
      description="This privacy page explains the basic privacy approach for ToolHub. Customize it with your final domain, analytics, advertising, and contact details before launch."
      sections={[
        {
          heading: "Data processing",
          body: "Many ToolHub tools process input directly in your browser. Tools that upload or convert files may send data to the server only to complete the requested action.",
        },
        {
          heading: "Advertising and analytics",
          body: "If advertising or analytics are enabled, third-party providers may use cookies or similar technologies according to their own policies.",
        },
        {
          heading: "Contact",
          body: "Users can contact the site owner to ask privacy questions or request clarification about how a specific tool works.",
        },
      ]}
    />
  );
}
