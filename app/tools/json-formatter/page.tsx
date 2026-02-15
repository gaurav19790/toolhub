import JSONFormatterClient from "./JSONFormatterClient";

export const metadata = {
  title: "JSON Formatter — ToolHub",
  description:
    "Validate, format, and minify JSON quickly and securely in your browser. Copy or download formatted JSON with ease.",
};

export default function Page() {
  return <JSONFormatterClient />;
}
