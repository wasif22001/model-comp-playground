import mongoose, { Schema, models, model } from "mongoose";

const ResponseSchema = new Schema({
  provider: { type: String, required: true },
  model: { type: String, default: true },
  content: { type: String, required: true },
  promptTokens: { type: Number, default: 0 },
  completionTokens: { type: Number, default: 0 },
  totalTokens: { type: Number, default: 0 },
  latency: { type: Number, default: 0 },
  cost: { type: Number, default: 0 },
});

const ComparisonSchema = new Schema(
  {
    prompt: { type: String, required: true },
    responses: [ResponseSchema],
  },
  {
    timestamps: true,
  }
);

export const Comparison =
  models.Comparison || model("Comparison", ComparisonSchema);
