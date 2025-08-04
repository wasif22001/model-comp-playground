import axios from "axios";
// import Anthropic from "@anthropic-ai/sdk";

export async function callOpenAI(
  prompt: string,
  model: string = "gpt-3.5-turbo"
) {
  const start = Date.now();
  try {
    const res = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: model,
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const latency = Date.now() - start;
    const usage = res.data.usage || {};

    return {
      provider: "OpenAI",
      model: model,
      content: res.data.choices[0].message.content,
      promptTokens: usage.prompt_tokens || 0,
      completionTokens: usage.completion_tokens || 0,
      totalTokens: usage.total_tokens || 0,
      latency,
      cost: ((usage.total_tokens || 0) / 1000) * 0.01,
    };
  } catch (error: any) {
    let errorMessage = "Unknown error";
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        errorMessage = "Rate limit hit. Please try again later.";
      } else {
        errorMessage = `OpenAI API error: ${error.response?.status} ${error.response?.statusText}`;
      }
    } else {
      errorMessage = "Unexpected error occurred while calling OpenAI API.";
    }

    const latency = Date.now() - start;

    return {
      provider: "OpenAI",
      model: model,
      content: errorMessage,
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
      latency,
      cost: 0,
    };
  }
}

export async function callClaude(
  prompt: string,
  model: string = "claude-3-opus-20240229"
) {
  const start = Date.now();

  //   const anthropic = new Anthropic({
  //     apiKey: process.env.ANTHROPIC_API_KEY,
  //   });

  try {
    const res = await axios.post(
      "https://api.anthropic.com/v1/messages",
      {
        model: model,
        max_tokens: 1024,
        temperature: 0.7,
        system: "You are a helpful assistant.",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "x-api-key": process.env.ANTHROPIC_API_KEY!,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
      }
    );

    // const res = await anthropic.messages.create({
    //   model: "claude-3-opus-20240229",
    //   max_tokens: 1000,
    //   messages: [{ role: "user", content: prompt }],
    // });

    const data = res.data;
    const content = data.content?.[0]?.text || "No response from Claude";
    const usage = res.data.usage || {};
    const latency = Date.now() - start;
    const promptTokens = usage.input_tokens || 0;
    const completionTokens = usage.output_tokens || 0;
    const totalTokens = promptTokens + completionTokens;

    const cost = (totalTokens / 1000) * 0.003;

    return {
      provider: "Claude",
      model: model,
      content,
      promptTokens,
      completionTokens,
      totalTokens,
      latency,
      cost,
    };
  } catch (error: any) {
    console.error("Claude API error:", error);

    let errorMessage = "Unknown error";
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        errorMessage = "Rate limit hit. Please try again later.";
      } else {
        errorMessage = `Claude API error: ${error.response?.status} ${error.response?.statusText}`;
      }
    } else {
      errorMessage = "Unexpected error occurred while calling Claude API.";
    }

    const latency = Date.now() - start;

    return {
      provider: "Claude",
      model: model,
      content: errorMessage,
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
      latency,
      cost: 0,
    };
  }
}
