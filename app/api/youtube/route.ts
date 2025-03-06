import { NextResponse } from "next/server";

export async function GET() {
  const streamKey = process.env.NEXT_PUBLIC_YOUTUBE_STREAM_KEY;

  if (!streamKey) {
    return NextResponse.json({ error: "No stream key found" }, { status: 404 });
  }

  const embedUrl = `https://www.youtube.com/embed/${streamKey}?autoplay=1&mute=1&controls=0&enablejsapi=1&playsinline=1&loop=1&modestbranding=1`;

  return NextResponse.json({ embedUrl });
}
