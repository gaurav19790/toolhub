import React from "react";

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-3">
              ToolHub
            </div>
            <p className="text-slate-400 text-sm">
              Your collection of free, powerful online tools for everyday tasks.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-3">Quick Links</h4>
            <ul className="text-slate-400 text-sm space-y-2">
              <li>
                <a href="#tools" className="hover:text-white transition">
                  Tools
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a
                  href="/tools/privacy-policy-generator"
                  className="hover:text-white transition"
                >
                  Privacy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Popular Tools</h4>
            <ul className="text-slate-400 text-sm space-y-2">
              <li>
                <a
                  href="/tools/image-compressor"
                  className="hover:text-white transition"
                >
                  Image Compressor
                </a>
              </li>
              <li>
                <a
                  href="/tools/pdf-to-word"
                  className="hover:text-white transition"
                >
                  PDF to Word
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
          <p>
            &copy; 2025 ToolHub. All rights reserved. Free tools for everyone.
          </p>
        </div>
      </div>
    </footer>
  );
};
