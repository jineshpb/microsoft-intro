import { NextResponse } from "next/server";

export async function GET() {
  const streamKey = process.env.NEXT_PUBLIC_YOUTUBE_STREAM_KEY;

  if (!streamKey) {
    return NextResponse.json({ error: "No stream key found" }, { status: 404 });
  }

  const embedUrl = `https://www.youtube.com/embed/${streamKey}?autoplay=1&mute=1&controls=0&enablejsapi=0&playsinline=1&loop=1&modestbranding=1&origin=${
    process.env.NEXT_PUBLIC_SITE_URL || ""
  }&rel=0&showinfo=0`;

  return NextResponse.json({ embedUrl });
}
