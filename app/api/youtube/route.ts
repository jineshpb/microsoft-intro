import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get current stream key from update-stream endpoint
    const res = await fetch(
      `${process.env.VERCEL_URL || "http://localhost:3001"}/api/update-stream`,
    );
    const data = await res.json();

    if (!data.streamKey) {
      return NextResponse.json(
        { error: "No stream key found" },
        { status: 404 },
      );
    }

    const embedUrl = `https://www.youtube.com/embed/${data.streamKey}?autoplay=1&mute=1&controls=0&enablejsapi=1&playsinline=1&loop=1&modestbranding=1`;

    return NextResponse.json({ embedUrl });
  } catch (error) {
    console.error("Error fetching stream key:", error);
    return NextResponse.json(
      { error: "Failed to get stream URL" },
      { status: 500 },
    );
  }
}
