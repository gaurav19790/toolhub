import { InfoPage } from "@/components/InfoPage";

export const metadata = {
  title: "Report a Bug - ToolHub",
  description: "Report an issue with a ToolHub tool.",
};

export default function Page() {
  return (
    <InfoPage
      title="Report a Bug"
      description="Help improve ToolHub by reporting broken tools, confusing results, or layout issues."
      sections={[
        {
          heading: "Bug report details",
          body: "Include the tool URL, your input type, expected result, actual result, browser, and device.",
        },
        {
          heading: "Priority issues",
          body: "File upload failures, incorrect calculations, privacy concerns, and mobile layout problems should be treated as high priority.",
        },
      ]}
    />
  );
}
