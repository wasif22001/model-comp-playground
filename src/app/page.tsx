"use client";

import { useState } from "react";
import PromptInput from "@/components/PromptInput";
import ModelResponseCard from "@/components/ModelResponseCard";
import Navbar from "@/components/Navbar";
import { ModelResponse } from "@/types/Response";
import { useCompareModels } from "../hooks/useCompareModel";

const MOCK_RESPONSES: ModelResponse[] = [
  {
    provider: "OpenAI",
    model: "gpt-4o",
    content: "OpenAI's response to your prompt goes here...",
    promptTokens: 17,
    completionTokens: 155,
    totalTokens: 172,
    latency: 1250,
    cost: 0.00172,
  },
  {
    provider: "Claude",
    model: "claude-sonnet-4-20250514",
    content: "Claude's response to your prompt goes here...",
    promptTokens: 17,
    completionTokens: 155,
    totalTokens: 172,
    latency: 1100,
    cost: 0.000516,
  },
  {
    provider: "xAI",
    model: "Grok-v1-mock",
    content: "Grok (xAI) mocked response goes here...",
    promptTokens: 20,
    completionTokens: 120,
    totalTokens: 140,
    latency: 980,
    cost: 0.0003,
  },
];
export default function HomePage() {
  const [prompt, setPrompt] = useState("");

  const { responses, loading, error, compare } = useCompareModels();

  const handleSubmit = () => {
    if (prompt.trim()) compare(prompt);
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-10">
        <PromptInput
          prompt={prompt}
          setPrompt={setPrompt}
          onSubmit={handleSubmit}
        />

        {responses && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {responses.map((res, i) => (
              <ModelResponseCard key={i} response={res} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
