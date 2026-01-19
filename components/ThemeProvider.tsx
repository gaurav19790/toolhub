"use client";

import { useEffect, useState } from "react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for saved theme preference or system preference
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const shouldBeDark = saved ? saved === "dark" : prefersDark;
    setIsDark(shouldBeDark);
    updateTheme(shouldBeDark);
  }, []);

  const updateTheme = (dark: boolean) => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    updateTheme(newTheme);
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Toggle dark mode"
        >
          {isDark ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM4.22 4.22a1 1 0 011.415 0l.707.707a1 1 0 01-1.415 1.415l-.707-.707a1 1 0 010-1.415zm11.313 0a1 1 0 010 1.415l-.707.707a1 1 0 01-1.415-1.415l.707-.707a1 1 0 011.415 0zM10 7a3 3 0 100 6 3 3 0 000-6zm-7 3a1 1 0 11-2 0 1 1 0 012 0zm16 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
