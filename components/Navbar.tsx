import Link from "next/link";
import React from "react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/50 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          <Link href="/#">ToolHub</Link>
        </div>
        <div className="flex gap-4">
          <Link
            href="/#tools"
            className="text-slate-300 hover:text-white transition"
          >
            Tools
          </Link>
          <Link
            href={{
              pathname: "/about",
            }}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};
