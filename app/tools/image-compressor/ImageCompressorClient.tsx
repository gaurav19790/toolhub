"use client";

/* eslint-disable @next/next/no-img-element */
import { Navbar } from "@/components/Navbar";
import { useState } from "react";
import JSZip from "jszip";
import { Footer } from "@/components/Footer";

export default function ImageCompressor() {
  const [files, setFiles] = useState<File[]>([]);
  const [compressedFiles, setCompressedFiles] = useState<
    { name: string; url: string; size: number; blob: Blob }[]
  >([]);
  const [targetSize, setTargetSize] = useState<number>(100);
  const [originalSizes, setOriginalSizes] = useState<number[]>([]);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [originalPreviews, setOriginalPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [compression, setCompression] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files || files.length === 0) return;

    setLoading(true);
    const formData = new FormData();
    for (const f of files) {
      formData.append("image", f);
    }
    formData.append("targetSize", targetSize.toString());

    try {
      const res = await fetch("/api/tools/compress-image", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const json = await res.json();
        const out: { name: string; data: string; size: number }[] =
          json.files || [];

        const created: {
          name: string;
          url: string;
          size: number;
          blob: Blob;
        }[] = [];
        let totalCompressed = 0;
        for (const f of out) {
          // convert data URL to blob
          const parts = f.data.split(",");
          const mimeMatch = parts[0].match(/:(.*?);/);
          const mime = mimeMatch ? mimeMatch[1] : "image/jpeg";
          const bstr = atob(parts[1]);
          let n = bstr.length;
          const u8 = new Uint8Array(n);
          while (n--) u8[n] = bstr.charCodeAt(n);
          const blob = new Blob([u8], { type: mime });
          const url = URL.createObjectURL(blob);
          created.push({ name: f.name, url, size: f.size, blob });
          totalCompressed += f.size;
        }
        setCompressedFiles(created);
        setCompressedSize(totalCompressed);

        const totalOriginal = originalSizes.reduce((s, v) => s + v, 0);
        if (totalOriginal) {
          const compressionRate = (
            (1 - totalCompressed / totalOriginal) *
            100
          ).toFixed(1);
          setCompression(parseFloat(compressionRate));
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    setFiles(selectedFiles);
    setOriginalSizes(selectedFiles.map((f) => f.size));
    setOriginalPreviews(selectedFiles.map((f) => URL.createObjectURL(f)));
    setCompressedFiles([]);
    setCompression(null);
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white pt-0">
      <Navbar />
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md z-40 pt-14">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="text-2xl md:text-3xl">🖼️</div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Image Compressor
              </h1>
            </div>
            <p className="text-xs md:text-sm text-slate-400">
              Compress images without losing quality. Reduce file sizes up to
              80%.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Upload Section */}
          <div className="space-y-4 md:space-y-6">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-slate-700 rounded-xl md:rounded-2xl p-5 md:p-6">
              <h2 className="text-lg md:text-xl font-bold mb-4">
                Upload Image(s)
              </h2>

              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-5 md:p-6 text-center transition-all ${
                  files && files.length > 0
                    ? "border-pink-500 bg-pink-500/10"
                    : "border-slate-600 hover:border-slate-500"
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-input"
                  multiple
                />
                <label htmlFor="file-input" className="cursor-pointer block">
                  <div className="text-3xl md:text-4xl mb-2">📤</div>
                  {files && files.length > 0 ? (
                    <>
                      <p className="text-sm md:text-base font-semibold text-pink-400 truncate">
                        {files.length} file{files.length > 1 ? "s" : ""}{" "}
                        selected
                      </p>
                      <p className="text-xs md:text-sm text-slate-400 mt-1">
                        {files.map((f, i) => (
                          <span key={i} className="inline-block mr-2">
                            {f.name} ({formatBytes(f.size)})
                          </span>
                        ))}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm md:text-base font-semibold mb-1">
                        Click to upload or drag & drop
                      </p>
                      <p className="text-xs md:text-sm text-slate-400">
                        PNG, JPG, WebP up to 50MB each
                      </p>
                    </>
                  )}
                </label>
              </div>

              {files && files.length > 0 && (
                <button
                  onClick={() => {
                    setFiles([]);
                    setOriginalPreviews([]);
                    setCompressedFiles([]);
                    setCompression(null);
                    setOriginalSizes([]);
                  }}
                  className="w-full mt-4 px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors text-sm font-medium"
                >
                  Clear Selection
                </button>
              )}
            </div>

            {/* Compression Settings */}
            {files && files.length > 0 && (
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-slate-700 rounded-xl md:rounded-2xl p-5 md:p-6">
                <h3 className="text-base md:text-lg font-bold mb-4">
                  Compression Settings
                </h3>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs md:text-sm font-medium">
                        Target Size
                      </label>
                      <span className="text-pink-400 font-semibold text-sm">
                        {targetSize} KB
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="1000"
                      step="10"
                      value={targetSize}
                      onChange={(e) => setTargetSize(Number(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>10KB</span>
                      <span>1000KB</span>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`w-full px-4 md:px-6 py-2 md:py-3 rounded-lg font-bold text-sm md:text-base transition-all duration-300 ${
                      loading
                        ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-pink-500/50 hover:shadow-2xl transform hover:-translate-y-1"
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin">⚙️</span>{" "}
                        <span className="hidden sm:inline">Compressing...</span>
                        <span className="sm:hidden">Compressing</span>
                      </span>
                    ) : files.length > 1 ? (
                      "Compress Images"
                    ) : (
                      "Compress Image"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Preview Section */}
          <div className="space-y-4 md:space-y-6">
            {compressedFiles.length === 0 &&
            files &&
            files.length > 0 &&
            originalPreviews.length > 0 ? (
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-slate-700 rounded-xl md:rounded-2xl p-5 md:p-6">
                <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4">
                  Original Image(s)
                </h3>
                <div className="bg-slate-950/50 rounded-lg border border-slate-700 p-4 flex items-center justify-center">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {originalPreviews.map((p, i) => (
                      <img
                        key={i}
                        src={p}
                        alt={`Original ${i + 1}`}
                        className="max-w-full max-h-48 rounded object-contain"
                      />
                    ))}
                  </div>
                </div>
                {originalSizes.length > 0 && (
                  <div className="mt-4 md:mt-6 space-y-1">
                    <div className="flex flex-col gap-2">
                      {originalSizes.map((s, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg"
                        >
                          <span className="text-xs md:text-sm text-slate-400">
                            {files[i].name}
                          </span>
                          <span className="font-bold text-slate-200 text-xs md:text-sm">
                            {formatBytes(s)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : compressedFiles.length > 0 ? (
              <div className="space-y-4 md:space-y-6">
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-slate-700 rounded-xl md:rounded-2xl p-5 md:p-6">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-base md:text-lg font-bold">
                      Compressed Images
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {compressedFiles.map((cf, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-3 bg-slate-900/40 rounded"
                        >
                          <img
                            src={cf.url}
                            alt={cf.name}
                            className="w-20 h-20 object-contain rounded"
                          />
                          <div className="flex-1">
                            {/* <div className="font-semibold text-sm truncate">{cf.name}</div> */}
                            <div className="text-xs text-slate-400">
                              {formatBytes(cf.size)}
                            </div>
                          </div>
                          <a
                            href={cf.url}
                            download={cf.name}
                            className="px-3 py-2 bg-green-600 rounded text-xs font-bold"
                          >
                            Download
                          </a>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={async () => {
                          const zip = new JSZip();
                          for (const cf of compressedFiles) {
                            const arr = await cf.blob.arrayBuffer();
                            zip.file(cf.name, arr);
                          }
                          const content = await zip.generateAsync({
                            type: "blob",
                          });
                          const url = URL.createObjectURL(content);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = "compressed-images.zip";
                          document.body.appendChild(a);
                          a.click();
                          a.remove();
                          URL.revokeObjectURL(url);
                        }}
                        className="px-4 py-2 bg-green-500 text-white rounded font-bold"
                      >
                        ⬇️ Download All
                      </button>

                      <button
                        onClick={() => {
                          setFiles([]);
                          setOriginalPreviews([]);
                          setCompressedFiles([]);
                          setCompression(null);
                          setOriginalSizes([]);
                        }}
                        className="px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors font-medium text-xs md:text-sm"
                      >
                        Compress Another
                      </button>
                    </div>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-2 md:gap-4">
                  <div className="bg-gradient-to-br from-pink-500/20 to-pink-500/10 border border-pink-500/30 rounded-lg p-3">
                    <p className="text-xs md:text-sm text-slate-400 mb-1">
                      Original Size
                    </p>
                    <p className="text-lg md:text-2xl font-bold text-pink-400">
                      {originalSizes.length
                        ? formatBytes(originalSizes.reduce((s, v) => s + v, 0))
                        : "—"}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/20 to-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <p className="text-xs md:text-sm text-slate-400 mb-1">
                      Compressed Size
                    </p>
                    <p className="text-lg md:text-2xl font-bold text-green-400">
                      {compressedSize ? formatBytes(compressedSize) : "—"}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                    <p className="text-xs md:text-sm text-slate-400 mb-1">
                      Saved
                    </p>
                    <p className="text-lg md:text-2xl font-bold text-purple-400">
                      {originalSizes.length && compressedSize
                        ? formatBytes(
                            originalSizes.reduce((s, v) => s + v, 0) -
                              compressedSize,
                          )
                        : "—"}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-500/20 to-indigo-500/10 border border-indigo-500/30 rounded-lg p-3">
                    <p className="text-xs md:text-sm text-slate-400 mb-1">
                      Reduction
                    </p>
                    <p className="text-lg md:text-2xl font-bold text-indigo-400">
                      {compression ? `${compression}%` : "—"}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-slate-700 rounded-xl md:rounded-2xl p-6 md:p-12 text-center">
                <div className="text-4xl md:text-5xl mb-2 md:mb-4">✨</div>
                <h3 className="text-base md:text-lg font-bold mb-1 md:mb-2">
                  Ready to Compress?
                </h3>
                <p className="text-xs md:text-sm text-slate-400">
                  Upload an image to get started and see the magic!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 md:mt-16 grid md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-slate-700 rounded-lg md:rounded-xl p-4 md:p-6">
            <div className="text-2xl md:text-3xl mb-2 md:mb-3">⚡</div>
            <h4 className="font-bold mb-1 md:mb-2 text-sm md:text-base">
              Lightning Fast
            </h4>
            <p className="text-xs md:text-sm text-slate-400">
              Instant compression in your browser. No server uploads.
            </p>
          </div>
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-slate-700 rounded-lg md:rounded-xl p-4 md:p-6">
            <div className="text-2xl md:text-3xl mb-2 md:mb-3">🔒</div>
            <h4 className="font-bold mb-1 md:mb-2 text-sm md:text-base">
              100% Private
            </h4>
            <p className="text-xs md:text-sm text-slate-400">
              Your images stay on your device. We do not store anything.
            </p>
          </div>
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-slate-700 rounded-lg md:rounded-xl p-4 md:p-6">
            <div className="text-2xl md:text-3xl mb-2 md:mb-3">🎨</div>
            <h4 className="font-bold mb-1 md:mb-2 text-sm md:text-base">
              Quality Preserved
            </h4>
            <p className="text-xs md:text-sm text-slate-400">
              Intelligent compression maintains image quality.
            </p>
          </div>
        </div>

        {/* Detailed Description Section */}
        <div className="mt-16 md:mt-20">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-slate-700 rounded-xl md:rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              What is ToolHub Image Compressor?
            </h2>

            <div className="space-y-6 text-slate-300 text-sm md:text-base leading-relaxed">
              <p>
                The{" "}
                <span className="font-semibold text-pink-400">
                  ToolHub Image Compressor
                </span>{" "}
                is a powerful web-based tool designed to reduce image file sizes
                while maintaining visual quality. Whether you are a web
                developer, content creator, or digital marketer, this tool
                streamlines your workflow by eliminating the need for expensive
                desktop software. Unlike traditional compression tools that
                require installation and often compromise image quality, our
                compressor uses advanced algorithms to intelligently balance
                file size reduction with visual fidelity.
              </p>

              <div>
                <h3 className="text-lg md:text-xl font-bold text-purple-400 mb-3">
                  How the Image Compressor Works
                </h3>
                <p>
                  The compression process is elegantly simple yet
                  technologically sophisticated. When you upload images to our
                  platform, they are processed using industry-standard JPEG
                  compression algorithms. The tool analyzes each image and
                  automatically determines the optimal quality level required to
                  maintain visual integrity while achieving your target file
                  size. This intelligent approach means you do not sacrifice
                  quality for compression—instead, you get the best of both
                  worlds.
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold text-purple-400 mb-3">
                  Key Features and Benefits
                </h3>
                <ul className="space-y-2 ml-4">
                  <li className="flex gap-3">
                    <span className="text-pink-400 font-bold">•</span>
                    <span>
                      <span className="font-semibold text-pink-400">
                        Batch Processing:
                      </span>{" "}
                      Upload multiple images at once and compress them all
                      simultaneously. Perfect for web developers managing entire
                      image libraries or content creators processing photo sets.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-pink-400 font-bold">•</span>
                    <span>
                      <span className="font-semibold text-pink-400">
                        Customizable Target Size:
                      </span>{" "}
                      Use the intuitive slider to set your desired file size
                      between 10KB and 1000KB. The tool automatically adjusts
                      compression quality to meet your exact requirements.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-pink-400 font-bold">•</span>
                    <span>
                      <span className="font-semibold text-pink-400">
                        Real-time Preview:
                      </span>{" "}
                      See both original and compressed images side by side,
                      allowing you to visually compare the results before
                      downloading. This transparency ensures you are satisfied
                      with the compression quality.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-pink-400 font-bold">•</span>
                    <span>
                      <span className="font-semibold text-pink-400">
                        Individual and Bulk Downloads:
                      </span>{" "}
                      Download compressed images one by one or create a ZIP
                      archive containing all compressed images at once. This
                      flexibility streamlines your workflow whether you need one
                      image or fifty.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-pink-400 font-bold">•</span>
                    <span>
                      <span className="font-semibold text-pink-400">
                        Detailed Compression Statistics:
                      </span>{" "}
                      Track exactly how much space you are saving. View original
                      file size, compressed file size, total savings in bytes,
                      and percentage reduction for each batch.
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold text-purple-400 mb-3">
                  The Technical Approach
                </h3>
                <p>
                  Our compression engine uses an intelligent iterative algorithm
                  that balances visual quality with file size reduction. Rather
                  than applying a fixed compression ratio to all images, the
                  tool recognizes that different images require different
                  approaches. A photograph with complex details needs higher
                  quality preservation than a simple graphic. The algorithm
                  processes your image, measures its current size against your
                  target, and if necessary, incrementally reduces quality until
                  reaching your desired file size. This ensures optimal results
                  for every image, regardless of content complexity.
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold text-purple-400 mb-3">
                  Why Choose Browser-Based Compression?
                </h3>
                <p>
                  Traditional desktop software requires installation, updates,
                  and system resources. Our browser-based solution offers
                  unmatched convenience. Run it on any device with a web
                  browser—Windows, Mac, Linux, tablet, or smartphone. The entire
                  compression process happens instantly in your browser, meaning
                  no waiting for uploads, no server processing delays, and no
                  download times. Your workflow becomes significantly faster and
                  more efficient.
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold text-purple-400 mb-3">
                  Privacy and Security
                </h3>
                <p>
                  Your privacy is paramount. All image processing occurs
                  directly in your browser—your images never leave your device.
                  We do not store, cache, or transmit your images to any server.
                  This means complete confidentiality for sensitive business
                  documents, personal photographs, or proprietary graphics.
                  Unlike cloud-based services that may analyze or log your data,
                  our local processing approach provides maximum security and
                  peace of mind.
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold text-purple-400 mb-3">
                  Perfect Use Cases
                </h3>
                <p className="mb-3">
                  This tool excels in numerous scenarios.{" "}
                  <span className="font-semibold">Web developers</span> can
                  optimize images for faster website loading—crucial for SEO and
                  user experience.{" "}
                  <span className="font-semibold">Content creators</span> can
                  prepare images for social media, where file size limits and
                  quality requirements vary by platform.{" "}
                  <span className="font-semibold">E-commerce businesses</span>{" "}
                  can maintain large product image catalogs without sacrificing
                  storage space or page load times.{" "}
                  <span className="font-semibold">Photographers</span> can
                  efficiently prepare portfolios while preserving quality.{" "}
                  <span className="font-semibold">Email marketers</span> can
                  create compelling visual campaigns without exceeding file size
                  limitations.
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold text-purple-400 mb-3">
                  Getting Started
                </h3>
                <p>
                  Using the Image Compressor requires no technical knowledge.
                  Simply upload your images using the intuitive upload area—drag
                  and drop or click to browse. Adjust the target size slider
                  based on your requirements. Review the original and compressed
                  previews to ensure quality meets your standards. Download your
                  compressed images individually or as a ZIP file for batch
                  processing. The entire process typically takes just seconds,
                  dramatically improving your productivity.
                </p>
              </div>

              <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/30 rounded-lg p-4 md:p-5 mt-6">
                <p className="text-xs md:text-sm">
                  <span className="font-bold text-pink-400">💡 Pro Tip:</span>{" "}
                  Start with a moderate target size like 150-200KB. This usually
                  provides excellent visual quality while achieving significant
                  file size reduction. Adjust downward only if you need smaller
                  files and can visually accept the quality differences shown in
                  the preview.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
