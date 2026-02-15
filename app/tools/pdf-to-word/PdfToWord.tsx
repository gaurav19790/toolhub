"use client";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import React, { useState } from "react";
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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white pt-0">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 pt-16">
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            PDF to Word Converter
          </h1>
          <p className="text-sm md:text-base text-slate-400">
            Convert PDF documents to editable Word files instantly. No
            installation required.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-slate-700 rounded-xl p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-6">
              Convert Your PDF
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-slate-500 transition-colors">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="file-input"
                  required
                />
                <label htmlFor="file-input" className="cursor-pointer block">
                  <div className="text-4xl mb-3">📄</div>
                  <p className="font-semibold mb-1">
                    {file ? file.name : "Click to upload PDF"}
                  </p>
                  <p className="text-xs text-slate-400">or drag and drop</p>
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-all"
              >
                Convert to Word
              </button>
            </form>
            {docxUrl && (
              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-green-400 font-semibold mb-3">
                  ✓ Conversion Complete!
                </p>
                <a
                  href={docxUrl}
                  download="converted.docx"
                  className="w-full block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center font-bold transition-colors"
                >
                  ⬇️ Download DOCX
                </a>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-bold mb-2 text-blue-400">Lightning Fast</h3>
              <p className="text-sm text-slate-400">
                Convert PDFs to Word documents in seconds. No waiting, no
                lengthy processing.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <div className="text-2xl mb-2">🔒</div>
              <h3 className="font-bold mb-2 text-purple-400">
                Secure & Private
              </h3>
              <p className="text-sm text-slate-400">
                Your documents are processed locally. We do not store or access
                your files.
              </p>
            </div>
            <div className="bg-gradient-to-br from-pink-500/20 to-pink-500/10 border border-pink-500/30 rounded-lg p-4">
              <div className="text-2xl mb-2">✏️</div>
              <h3 className="font-bold mb-2 text-pink-400">Fully Editable</h3>
              <p className="text-sm text-slate-400">
                Edit text, formatting, and structure freely in Microsoft Word.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Description Section */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-slate-700 rounded-xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            What is the PDF to Word Converter?
          </h2>

          <div className="space-y-6 text-slate-300 text-sm md:text-base leading-relaxed">
            <p>
              The{" "}
              <span className="font-semibold text-blue-400">
                ToolHub PDF to Word Converter
              </span>{" "}
              is a sophisticated document transformation tool designed to
              convert static PDF files into fully editable Microsoft Word
              documents. Unlike traditional conversion methods that require
              expensive software or complex processes, our converter provides a
              seamless, instant solution accessible directly from your web
              browser. Whether you need to edit a PDF contract, update a
              research document, or modify a form that was originally in PDF
              format, this tool eliminates the frustration of being locked into
              an uneditable file format.
            </p>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-blue-400 mb-3">
                How the Conversion Process Works
              </h3>
              <p>
                Our PDF to Word converter uses advanced document parsing
                technology to analyze the structure of your PDF file. It
                identifies text content, maintains formatting information, and
                reconstructs the document in the editable Word format. The
                conversion process extracts each element—paragraphs, headings,
                lists, tables, and basic formatting—and renders them faithfully
                in the output DOCX file. This intelligent approach ensures that
                your converted document retains as much of the original
                formatting as possible while providing complete editability.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-blue-400 mb-3">
                Why Convert PDF to Word?
              </h3>
              <p className="mb-3">
                PDFs are excellent for distribution and viewing, but they are
                notoriously difficult to edit. Converting your PDFs to Word
                format unlocks numerous advantages for professional and personal
                workflows. Business professionals need to update contracts,
                modify reports, or extract information from client documents.
                Students must work with research papers and syllabi. Content
                creators require editable versions of previously published
                materials. This tool serves all these scenarios by providing a
                bridge between the static PDF format and the dynamic, editable
                Word environment.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-blue-400 mb-3">
                Key Benefits and Features
              </h3>
              <ul className="space-y-3 ml-4">
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>
                    <span className="font-semibold text-blue-400">
                      No Software Installation:
                    </span>{" "}
                    Unlike desktop applications requiring downloads, updates,
                    and system resources, our web-based converter works on any
                    device with a browser. Simply visit the page, upload your
                    file, and convert instantly.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>
                    <span className="font-semibold text-blue-400">
                      Preserves Document Structure:
                    </span>{" "}
                    The converter maintains the original document hierarchy,
                    including headings, paragraphs, spacing, and line breaks.
                    Your converted Word document will closely resemble the
                    original PDF layout.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>
                    <span className="font-semibold text-blue-400">
                      Text Extraction and Reconstruction:
                    </span>{" "}
                    Advanced algorithms extract all text content from your PDF
                    with high accuracy, ensuring nothing is lost in translation.
                    Complex documents with multiple columns or unusual layouts
                    are handled intelligently.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>
                    <span className="font-semibold text-blue-400">
                      Table Support:
                    </span>{" "}
                    Tables within PDFs are recognized and reconstructed as
                    proper Word table structures, making it simple to further
                    edit, sort, or format your data.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>
                    <span className="font-semibold text-blue-400">
                      Instant Conversion:
                    </span>{" "}
                    No waiting in queues or processing delays. Your PDF converts
                    to Word in seconds, allowing you to immediately start
                    editing and making changes.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>
                    <span className="font-semibold text-blue-400">
                      Complete Privacy:
                    </span>{" "}
                    All conversion happens locally in your browser. We do not
                    upload, store, or have access to your PDF files. Your
                    documents remain completely confidential.
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-blue-400 mb-3">
                Perfect Use Cases
              </h3>
              <p className="mb-3">
                The PDF to Word converter excels across numerous professional
                and personal scenarios.{" "}
                <span className="font-semibold">Legal professionals</span> can
                convert contract PDFs for modification and negotiation.{" "}
                <span className="font-semibold">HR departments</span> can update
                policy documents and forms.{" "}
                <span className="font-semibold">Students</span> can work with
                research papers and lecture notes.{" "}
                <span className="font-semibold">Business analysts</span> can
                extract data and insights from PDF reports.{" "}
                <span className="font-semibold">Content creators</span> can
                revise previously published materials.{" "}
                <span className="font-semibold">Administrative staff</span> can
                process forms and documents.{" "}
                <span className="font-semibold">Translators</span> can work more
                efficiently with document source material.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-blue-400 mb-3">
                Technical Excellence
              </h3>
              <p>
                Our conversion engine employs sophisticated document analysis
                technology to handle a wide variety of PDF structures. Whether
                your PDF is a simple text document, a multi-page report with
                images, or a complex form with fields, our converter adapts
                intelligently. The system recognizes different document
                elements, maintains logical flow, and reconstructs the content
                in the most sensible Word format. This attention to detail
                ensures your converted documents are not just editable but
                actually usable and well-organized.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-blue-400 mb-3">
                Getting Started
              </h3>
              <p>
                Using this converter requires no technical expertise or account
                setup. Upload your PDF file using the intuitive drag-and-drop
                interface or file browser. Wait a few seconds for the conversion
                to complete. Download your new Word document and open it in
                Microsoft Word, Google Docs, or any compatible word processor.
                Begin editing immediately with full formatting control. The
                entire process typically takes less than a minute from start to
                finish.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-4 md:p-5 mt-6">
              <p className="text-xs md:text-sm">
                <span className="font-bold text-blue-400">💡 Pro Tip:</span>{" "}
                After conversion, review your Word document in Microsoft Word
                for any formatting adjustments. While our converter preserves
                structure excellently, some complex PDF formatting may need
                minor tweaks for perfect presentation.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
