"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { logout } = useAuth();
  const isLoggedIn =
    typeof window !== "undefined" && localStorage.getItem("userEmail");

  return (
    <nav
      className="shadow-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
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
          {isLoggedIn && (
            <>
              <Link href="/" className="hover:underline">
                Compare
              </Link>
              <Link href="/history" className="hover:underline">
                History
              </Link>
              <button onClick={logout} className="hover:underline text-red-500">
                Logout
              </button>
            </>
          )}
          {!isLoggedIn && (
            <>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
              <Link href="/signup" className="hover:underline">
                Signup
              </Link>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
