// File: app/history/page.tsx
"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useHistory } from "@/hooks/useHistory";
import { useAuthGuard } from "@/hooks/useAuthGuard";

// const mockComparisons = [
//   { id: "mock1", prompt: "Explain black holes." },
//   { id: "mock2", prompt: "Summarize the French Revolution." },
//   { id: "mock3", prompt: "What is quantum entanglement?" },
// ];

export default function HistoryPage() {
  useAuthGuard();

  const { history, loading, error } = useHistory();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">History</h1>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <ul className="space-y-4">
            {history.map(({ _id, prompt }) => (
              <li
                key={_id}
                className="p-4 rounded-md bg-[var(--card-bg)] text-[var(--card-foreground)] shadow"
              >
                <p className="mb-2 font-medium">{prompt}</p>
                <Link
                  href={`/history/${_id}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View Comparison
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
