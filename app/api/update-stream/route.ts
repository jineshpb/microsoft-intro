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

    currentStreamKey = streamKey;

    return NextResponse.json({
      success: true,
      message: `Stream key updated by ${updatedBy}`,
      timestamp: new Date().toISOString(),
      currentKey: currentStreamKey,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const embedUrl = currentStreamKey
    ? `https://www.youtube.com/embed/${currentStreamKey}?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&modestbranding=1&rel=0&enablejsapi=0&origin=${
        process.env.NEXT_PUBLIC_APP_URL || ""
      }`
    : null;

  return NextResponse.json({ embedUrl });
}
