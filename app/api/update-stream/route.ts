import { NextResponse } from "next/server";
import {
  buildStreamResponse,
  normalizeStreamInput,
  setCurrentStreamKey,
} from "@/lib/youtube-stream";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const streamKey = normalizeStreamInput({
      youtubeUrl: body.youtubeUrl,
      streamKey: body.streamKey,
    });

    if (!streamKey) {
      return NextResponse.json(
        {
          error:
            "Provide a valid YouTube URL or 11-character video ID in youtubeUrl or streamKey.",
        },
        { status: 400 },
      );
    }

    setCurrentStreamKey(streamKey);

    const streamResponse = buildStreamResponse(req);

    return NextResponse.json({
      success: true,
      message: `Stream key updated by ${body.updatedBy ?? "unknown"}`,
      timestamp: new Date().toISOString(),
      currentKey: streamKey,
      streamKey,
      embedUrl: streamResponse?.embedUrl ?? null,
      source: body.youtubeUrl ? "youtube_url" : "stream_key",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  const streamResponse = buildStreamResponse(req);

  if (!streamResponse) {
    return NextResponse.json(
      { error: "No stream key found", embedUrl: null, streamKey: null },
      { status: 404 },
    );
  }

  return NextResponse.json(streamResponse);
}
