import { NextResponse } from "next/server";

let currentStreamKey = ""; // Simple in-memory storage

// YouTube URL validation patterns
const YOUTUBE_URL_PATTERNS = [
  /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
  /^(https?:\/\/)?(www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
  /^(https?:\/\/)?(www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  /^(https?:\/\/)?(www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
];

// Function to validate YouTube URL
const isValidYouTubeUrl = (url: string): boolean => {
  return YOUTUBE_URL_PATTERNS.some((pattern) => pattern.test(url));
};

// Function to extract video ID from YouTube URL
const extractVideoId = (url: string): string | null => {
  for (const pattern of YOUTUBE_URL_PATTERNS) {
    const match = url.match(pattern);
    if (match) {
      return match[3]; // The video ID is in the 3rd capture group
    }
  }
  return null;
};

// Function to get stream key from YouTube URL
const getStreamKeyFromYouTubeUrl = (youtubeUrl: string): string | null => {
  if (!isValidYouTubeUrl(youtubeUrl)) {
    return null;
  }

  const videoId = extractVideoId(youtubeUrl);
  return videoId;
};

export async function POST(req: Request) {
  try {
    const { youtubeUrl, updatedBy } = await req.json();

    if (!youtubeUrl) {
      return NextResponse.json(
        { error: "YouTube URL is required" },
        { status: 400 }
      );
    }

    if (!isValidYouTubeUrl(youtubeUrl)) {
      return NextResponse.json(
        { error: "Invalid YouTube URL provided" },
        { status: 400 }
      );
    }

    const extractedKey = getStreamKeyFromYouTubeUrl(youtubeUrl);
    if (!extractedKey) {
      return NextResponse.json(
        { error: "Could not extract video ID from YouTube URL" },
        { status: 400 }
      );
    }

    currentStreamKey = extractedKey;

    return NextResponse.json({
      success: true,
      message: `Stream key updated by ${updatedBy}`,
      timestamp: new Date().toISOString(),
      currentKey: currentStreamKey,
      source: "youtube_url",
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
