import { useEffect, useState } from "react";
import { ModelResponse } from "@/types/Response";

interface ComparisonData {
  prompt: string;
  responses: ModelResponse[];
}

export function useFetchComparisonById(id: string | undefined) {
  const [data, setData] = useState<ComparisonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No ID provided");
      setLoading(false);
      return;
    }

    const fetchComparison = async () => {
      try {
        const res = await fetch(`/api/history/${id}`);
        if (!res.ok) throw new Error("Failed to fetch data");
        const json = await res.json();
        setData({ prompt: json.prompt, responses: json.responses });
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchComparison();
  }, [id]);

  return { data, loading, error };
}
