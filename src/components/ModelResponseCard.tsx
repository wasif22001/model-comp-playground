import { ModelResponse } from "@/types/Response";

export default function ModelResponseCard({
  response,
}: {
  response: ModelResponse;
}) {
  return (
    <div
      className="rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
      style={{
        background: "var(--card-bg)",
        color: "var(--card-foreground)",
      }}
    >
      <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
        {response.provider}
      </h2>
      <p style={{ color: "var(--subtext)" }} className="text-sm mb-2">
        Model: {response.model}
      </p>

      <pre
        className="whitespace-pre-wrap text-sm"
        style={{ color: "var(--card-foreground)" }}
      >
        {response.content}
      </pre>

      <div
        className="mt-3 text-xs space-y-1"
        style={{ color: "var(--subtext)" }}
      >
        <p>Prompt Tokens: {response.promptTokens}</p>
        <p>Completion Tokens: {response.completionTokens}</p>
        <p>Total Tokens: {response.totalTokens}</p>
        <p>Latency: {response.latency} ms</p>
        <p>Cost: ${response.cost.toFixed(6)}</p>
      </div>
    </div>
  );
}
