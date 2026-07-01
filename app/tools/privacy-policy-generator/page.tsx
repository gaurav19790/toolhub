import PrivacyPolicyGenerator from "./PrivacyPolicyGenerator";

export const metadata = {
  title: "Starter Privacy Policy Generator - ToolHub",
  description:
    "Create a starter privacy policy template for your website. Enter basic site details, generate a customizable draft, and review it for your actual data practices.",
};

export default function Page() {
  return <PrivacyPolicyGenerator />;
}
