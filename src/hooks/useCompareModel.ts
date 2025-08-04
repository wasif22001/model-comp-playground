"use client";
import { useState } from "react";
import { ModelResponse } from "@/types/Response";

type ComparisonResult = {
  prompt: string;
  responses: ModelResponse[];
};

export function useCompareModels() {
  const [responses, setResponses] = useState<ModelResponse[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const compare = async (prompt: string) => {
    setLoading(true);
    setError("");
    setResponses(null);

    try {
      const res = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Failed to fetch model responses.");
      }

      const data: ComparisonResult = await res.json();
      setResponses(data.responses);
    } catch (err: any) {
      console.error("API error:", err);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return { responses, loading, error, compare };
}
