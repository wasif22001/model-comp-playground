import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    return NextResponse.json({
      status: "success",
      message: "Database connection is successful",
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Error while connecting to the database",
      error,
    });
  }
}
