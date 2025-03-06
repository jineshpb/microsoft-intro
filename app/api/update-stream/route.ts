import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { streamKey, updatedBy } = await req.json();

    if (!streamKey) {
      return NextResponse.json(
        { error: "Stream key is required" },
        { status: 400 }
      );
    }

    // Update environment variable (this will be temporary until server restart)
    process.env.NEXT_PUBLIC_YOUTUBE_STREAM_KEY = streamKey;

    return NextResponse.json({
      success: true,
      message: `Stream key updated by ${updatedBy}`,
      timestamp: new Date().toISOString(),
      currentKey: process.env.NEXT_PUBLIC_YOUTUBE_STREAM_KEY,
    });
  } catch (error) {
    console.error("Error in update-stream:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
