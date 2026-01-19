import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ToolHub - 20+ Free Online Tools for Everyone",
  description:
    "Discover 20+ free online tools including Image Compressor, PDF to Word, URL Shortener, QR Code Generator, and more. Fast, private, and completely free. No registration needed.",
  keywords:
    "free online tools, image compressor, pdf converter, url shortener, qr code generator",
  authors: [{ name: "ToolHub" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://toolhub.com",
    title: "ToolHub - 20+ Free Online Tools",
    description:
      "Free online tools for productivity, conversion, and utility tasks",
    siteName: "ToolHub",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
