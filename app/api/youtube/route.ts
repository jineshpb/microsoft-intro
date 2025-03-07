import { NextResponse } from "next/server";

export async function GET() {
  // Fetch current stream key from update-stream endpoint
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/update-stream`
  );
  const data = await res.json();

  if (!data.streamKey) {
    return NextResponse.json({ error: "No stream key found" }, { status: 404 });
  }

  const embedUrl = `https://www.youtube.com/embed/${data.streamKey}?autoplay=1&mute=1&controls=0&enablejsapi=1&playsinline=1&loop=1&modestbranding=1`;

  return NextResponse.json({ embedUrl });
}
