import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

const STREAM_KEY_KV = "youtube_stream_key";

export async function POST(req: Request) {
  try {
    const { streamKey, updatedBy } = await req.json();

    if (!streamKey) {
      return NextResponse.json(
        { error: "Stream key is required" },
        { status: 400 }
      );
    }

    // Store the new stream key
    await kv.set(STREAM_KEY_KV, streamKey);

    return NextResponse.json({
      success: true,
      message: `Stream key updated by ${updatedBy}`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error updating stream key:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
