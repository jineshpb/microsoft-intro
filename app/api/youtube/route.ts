import { NextResponse } from "next/server";
import { buildStreamResponse } from "@/lib/youtube-stream";

export async function GET(request: Request) {
  try {
    const streamResponse = buildStreamResponse(request);

    if (!streamResponse) {
      return NextResponse.json(
        { error: "No stream key found" },
        { status: 404 },
      );
    }

    return NextResponse.json(streamResponse);
  } catch (error) {
    console.error("Error fetching stream key:", error);
    return NextResponse.json(
      { error: "Failed to get stream URL" },
      { status: 500 },
    );
  }
}
