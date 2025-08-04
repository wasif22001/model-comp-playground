"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-3 py-1 text-sm font-medium border rounded-md transition hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
    >
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
