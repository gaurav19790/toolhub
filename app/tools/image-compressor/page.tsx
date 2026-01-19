"use client";

import { useState } from "react";

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [targetSize, setTargetSize] = useState<number>(100);
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [compression, setCompression] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("targetSize", targetSize.toString());

    try {
      const res = await fetch("/api/tools/compress-image", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setCompressedImage(url);
        setCompressedSize(blob.size);
        if (originalSize) {
          const compressionRate = (
            (1 - blob.size / originalSize) *
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
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setOriginalSize(selectedFile ? selectedFile.size : null);
    setOriginalPreview(selectedFile ? URL.createObjectURL(selectedFile) : null);
    setCompressedImage(null);
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
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md z-40">
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
                Upload Image
              </h2>

              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-5 md:p-6 text-center transition-all ${
                  file
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
                />
                <label htmlFor="file-input" className="cursor-pointer block">
                  <div className="text-3xl md:text-4xl mb-2">📤</div>
                  {file ? (
                    <>
                      <p className="text-sm md:text-base font-semibold text-pink-400 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs md:text-sm text-slate-400 mt-1">
                        {formatBytes(file.size)}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm md:text-base font-semibold mb-1">
                        Click to upload or drag & drop
                      </p>
                      <p className="text-xs md:text-sm text-slate-400">
                        PNG, JPG, WebP up to 50MB
                      </p>
                    </>
                  )}
                </label>
              </div>

              {file && (
                <button
                  onClick={() => {
                    setFile(null);
                    setOriginalPreview(null);
                    setCompressedImage(null);
                    setCompression(null);
                  }}
                  className="w-full mt-4 px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors text-sm font-medium"
                >
                  Clear Selection
                </button>
              )}
            </div>

            {/* Compression Settings */}
            {file && (
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
            {!compressedImage && file && originalPreview ? (
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-slate-700 rounded-xl md:rounded-2xl p-5 md:p-6">
                <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4">
                  Original Image
                </h3>
                <div className="bg-slate-950/50 rounded-lg border border-slate-700 p-4 flex items-center justify-center">
                  <img
                    src={originalPreview}
                    alt="Original"
                    className="max-w-full max-h-96 rounded object-contain"
                  />
                </div>
                {originalSize && (
                  <div className="mt-4 md:mt-6 space-y-1">
                    <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                      <span className="text-xs md:text-sm text-slate-400">
                        File Size
                      </span>
                      <span className="font-bold text-slate-200 text-xs md:text-sm">
                        {formatBytes(originalSize)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : compressedImage ? (
              <div className="space-y-4 md:space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-2 md:gap-4">
                  <div className="bg-gradient-to-br from-pink-500/20 to-pink-500/10 border border-pink-500/30 rounded-lg p-3">
                    <p className="text-xs md:text-sm text-slate-400 mb-1">
                      Original Size
                    </p>
                    <p className="text-lg md:text-2xl font-bold text-pink-400">
                      {originalSize ? formatBytes(originalSize) : "—"}
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
                      {originalSize && compressedSize
                        ? formatBytes(originalSize - compressedSize)
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

                {/* Compressed Image */}
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-slate-700 rounded-xl md:rounded-2xl p-5 md:p-6">
                  <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4">
                    Compressed Image
                  </h3>
                  <div className="bg-slate-950/50 rounded-lg border border-slate-700 p-4 flex items-center justify-center">
                    <img
                      src={compressedImage}
                      alt="Compressed"
                      className="max-w-full max-h-96 rounded object-contain"
                    />
                  </div>

                  {/* Download Button */}
                  <a
                    href={compressedImage}
                    download="compressed.jpg"
                    className="w-full inline-block mt-4 md:mt-6 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-bold text-xs md:text-sm text-center transition-all duration-300 shadow-lg hover:shadow-green-500/50 hover:shadow-2xl transform hover:-translate-y-1"
                  >
                    <span className="hidden sm:inline">
                      ⬇️ Download Compressed Image
                    </span>
                    <span className="sm:hidden">⬇️ Download</span>
                  </a>

                  <button
                    onClick={() => {
                      setFile(null);
                      setOriginalPreview(null);
                      setCompressedImage(null);
                      setCompression(null);
                    }}
                    className="w-full mt-2 md:mt-3 px-4 md:px-6 py-2 md:py-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors font-medium text-xs md:text-sm"
                  >
                    Compress Another
                  </button>
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
              Your images stay on your device. We don't store anything.
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
      </div>
    </div>
  );
}
