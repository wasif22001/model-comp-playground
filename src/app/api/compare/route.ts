import { NextRequest, NextResponse } from "next/server";
import { Comparison } from "../../../lib/models/Comparison";
import { connectToDatabase } from "../../../lib/mongoose";
import { callOpenAI, callClaude } from "@/lib/models";
import { model } from "mongoose";

// async function callOpenAI(prompt: string) {
//   const start = Date.now();
//   await new Promise((res) => setTimeout(res, 500));
//   return {
//     provider: "OpenAI",
//     content: `OpenAI response to: ${prompt}`,
//     tokensUsed: 100,
//     latency: Date.now() - start,
//     cost: 0.01,
//   };
// }

// async function callClaude(prompt: string) {
//   const start = Date.now();
//   await new Promise((res) => setTimeout(res, 600));
//   return {
//     provider: "Claude",
//     content: `Claude response to: ${prompt}`,
//     tokensUsed: 110,
//     latency: Date.now() - start,
//     cost: 0.012,
//   };
// }

// async function callXAI(prompt: string) {
//   const start = Date.now();
//   await new Promise((res) => setTimeout(res, 400));

//   const promptTokens = 50;
//   const completionTokens = 100;
//   const totalTokens = promptTokens + completionTokens;

//   return {
//     provider: "xAI",
//     content: `Mocked xAI response to: "${prompt}"`,
//     promptTokens,
//     completionTokens,
//     totalTokens,
//     latency: Date.now() - start,
//     cost: (totalTokens / 1000) * 0.002,
//   };
// }

const defaultResponse = (provider: string, model: String, error: string) => ({
  provider,
  model: model,
  content: `Error from ${provider}: ${error}`,
  promptTokens: 0,
  completionTokens: 0,
  totalTokens: 0,
  latency: 0,
  cost: 0,
});

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { prompt } = await req.json();

    const [openaiRes, claudeRes, xaiRes] = await Promise.all([
      callOpenAI(prompt, "gpt-4-turbo").catch((err) =>
        defaultResponse(
          "OpenAI",
          "gpt-4-turbo",
          err?.response?.data?.error?.message || err.message
        )
      ),
      callClaude(prompt, "claude-sonnet-4-20250514").catch((err) =>
        defaultResponse(
          "Claude",
          "claude-sonnet-4-20250514",
          err?.response?.data?.error?.message || err.message
        )
      ),
      callOpenAI(prompt, "gpt-3.5-turbo").catch((err) =>
        defaultResponse(
          "OpenAI",
          "gpt-3.5-turbo",
          err?.response?.data?.error?.message || err.message
        )
      ),
    ]);

    const responses = [openaiRes, claudeRes, xaiRes].filter(
      (res) => res && res.provider && res.content
    );

    const saved = await Comparison.create({
      prompt,
      responses: responses,
    });

    return NextResponse.json(saved, { status: 200 });
  } catch (error) {
    console.error("Error in /api/compare:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
