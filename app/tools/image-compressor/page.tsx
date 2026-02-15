import ImageCompressorClient from "./ImageCompressorClient";

export const metadata = {
  title: "Image Compressor — ToolHub",
  description:
    "Compress single or multiple images (PNG, JPG, WebP) with adjustable target size. Preserve image quality while reducing file size, preview originals, download each compressed image individually, or download all as a ZIP.",
};

export default function Page() {
  return <ImageCompressorClient />;
}
