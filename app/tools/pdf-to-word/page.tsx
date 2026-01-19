"use client";

import { useState } from "react";

export default function PdfToWord() {
  const [file, setFile] = useState<File | null>(null);
  const [docxUrl, setDocxUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("pdf", file);

    const res = await fetch("/api/tools/pdf-to-word", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setDocxUrl(url);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">PDF to Word Converter</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Convert to Word
        </button>
      </form>
      {docxUrl && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Converted Document</h2>
          <a
            href={docxUrl}
            download="converted.docx"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Download DOCX
          </a>
        </div>
      )}
    </div>
  );
}
