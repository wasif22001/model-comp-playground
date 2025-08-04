import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { Comparison } from "@/lib/models/Comparison";

export async function GET() {
  try {
    await connectToDatabase();
    const comparisons = await Comparison.find({}, { prompt: 1 }).sort({
      createdAt: -1,
    });
    return NextResponse.json(comparisons);
  } catch (error) {
    console.error("Error fetching history:", error);
    return NextResponse.json(
      { error: "Failed to fetch history" },
      { status: 500 }
    );
  }
}
