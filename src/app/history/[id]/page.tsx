"use client";

import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import ModelResponseCard from "@/components/ModelResponseCard";
import { useFetchComparisonById } from "@/hooks/useFetchComparisonById";

// const MOCK_HISTORY_RESPONSE: ModelResponse[] = [
//   {
//     provider: "OpenAI",
//     model: "gpt-4o",
//     content: "Mocked OpenAI response for viewing history...",
//     promptTokens: 15,
//     completionTokens: 120,
//     totalTokens: 135,
//     latency: 1325,
//     cost: 0.00135,
//     _id: "mock1",
//   },
//   {
//     provider: "Claude",
//     model: "claude-3-sonnet",
//     content: "Mocked Claude response for viewing history...",
//     promptTokens: 17,
//     completionTokens: 100,
//     totalTokens: 117,
//     latency: 1020,
//     cost: 0.00035,
//     _id: "mock2",
//   },
//   {
//     provider: "xAI",
//     model: "grok-1",
//     content: "Mocked Grok (xAI) response for viewing history...",
//     promptTokens: 14,
//     completionTokens: 95,
//     totalTokens: 109,
//     latency: 850,
//     cost: 0.00027,
//     _id: "mock3",
//   },
// ];

// export default function HistoryDetailPage() {
//   const [responses, setResponses] = useState<ModelResponse[]>([]);

//   useEffect(() => {
//     setResponses(MOCK_HISTORY_RESPONSE);
//   }, []);

//   return (
//     <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors">
//       <Navbar />
//       <main className="max-w-7xl mx-auto px-4 py-6">
//         <h1 className="text-2xl font-bold mb-4">Comparison History (Mocked)</h1>
//         <div className="grid md:grid-cols-3 gap-4">
//           {responses.map((res) => (
//             <ModelResponseCard key={res._id} response={res} />
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// }

export default function HistoryDetailPage() {
  const params = useParams();
  const { data, loading, error } = useFetchComparisonById(params?.id as string);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : data ? (
          <>
            <h2 className="text-xl font-semibold mb-4">Prompt:</h2>
            <p className="italic text-[var(--subtext)] mb-6">{data.prompt}</p>
            <div className="grid md:grid-cols-3 gap-4">
              {data.responses.map((res, i) => (
                <ModelResponseCard key={i} response={res} />
              ))}
            </div>
          </>
        ) : (
          <p>Comparison not found.</p>
        )}
      </main>
    </div>
  );
}
