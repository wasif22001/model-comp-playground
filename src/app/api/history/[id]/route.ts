import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { Comparison } from "@/lib/models/Comparison";
import mongoose from "mongoose";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const comparison = await Comparison.findById(params.id);

    if (!comparison) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(comparison);
  } catch (err) {
    console.error("Error fetching comparison:", err);
    return NextResponse.json(
      { error: "Failed to fetch comparison" },
      { status: 500 }
    );
  }
}
