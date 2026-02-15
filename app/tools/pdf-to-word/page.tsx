import PdfToWord from "./PdfToWord";

export const metadata = {
  title: "PDF to Word — ToolHub",
  description:
    "Convert PDF files to editable Word (.docx) documents quickly and accurately. Upload a PDF, preserve formatting where possible, and download a ready-to-edit DOCX file.",
};

export default function Page() {
  return <PdfToWord />;
}
