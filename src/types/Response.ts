export type ModelResponse = {
  provider: string;
  model: string;
  content: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  latency: number;
  cost: number;
  _id?: string;
};
