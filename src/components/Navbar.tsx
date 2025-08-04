"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav
      className="shadow-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700"
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600 dark:text-blue-400"
        >
          Model Playground
        </Link>
        <div
          className="flex gap-6 items-center"
          style={{ color: "var(--foreground)" }}
        >
          <Link href="/" className="hover:underline">
            Compare
          </Link>
          <Link href="/history" className="hover:underline">
            History
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
