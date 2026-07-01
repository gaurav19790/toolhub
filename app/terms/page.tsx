import { InfoPage } from "@/components/InfoPage";

export const metadata = {
  title: "Terms of Use - ToolHub",
  description: "Terms of use for ToolHub.",
};

export default function Page() {
  return (
    <InfoPage
      title="Terms of Use"
      description="These starter terms explain acceptable use of ToolHub. Review and customize them before publishing the site."
      sections={[
        {
          heading: "Use of tools",
          body: "ToolHub is provided for general productivity and informational purposes. Users are responsible for reviewing outputs before relying on them.",
        },
        {
          heading: "No misuse",
          body: "Do not use ToolHub to upload illegal content, attack the service, bypass limits, or interfere with other users.",
        },
        {
          heading: "Changes",
          body: "ToolHub may update tools, pages, features, and these terms as the site develops.",
        },
      ]}
    />
  );
}
