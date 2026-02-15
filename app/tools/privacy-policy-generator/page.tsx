import PrivacyPolicyGenerator from "./PrivacyPolicyGenerator";

export const metadata = {
  title: "Privacy Policy Generator — ToolHub",
  description:
    "Generate a professional privacy policy tailored to your website. Provide basic site details and receive a clear, compliant privacy policy covering data collection, usage, and user rights.",
};

export default function Page() {
  return <PrivacyPolicyGenerator />;
}
