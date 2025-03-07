import { NextResponse } from "next/server";

let currentStreamKey = ""; // Simple in-memory storage

export async function POST(req: Request) {
  try {
    const { streamKey, updatedBy } = await req.json();

    if (!streamKey) {
      return NextResponse.json(
        { error: "Stream key is required" },
        { status: 400 }
      );
    }

    // Just update the variable
    currentStreamKey = streamKey;

    return NextResponse.json({
      success: true,
      message: `Stream key updated by ${updatedBy}`,
      timestamp: new Date().toISOString(),
      currentKey: currentStreamKey,
    });
  } catch (error) {
    console.error("Error in update-stream:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Add a GET method to fetch current key
export async function GET() {
  return NextResponse.json({ streamKey: currentStreamKey });
}
