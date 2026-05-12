const YOUTUBE_VIDEO_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;

const YOUTUBE_URL_PATTERNS = [
  /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})(?:&.*)?$/,
  /^(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})(?:\?.*)?$/,
  /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})(?:\?.*)?$/,
  /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})(?:\?.*)?$/,
  /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/live\/([a-zA-Z0-9_-]{11})(?:\?.*)?$/,
  /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})(?:\?.*)?$/,
];

let currentStreamKey = "";

const getDefaultStreamKey = () =>
  process.env.NEXT_PUBLIC_YOUTUBE_STREAM_KEY?.trim() ?? "";

export const getCurrentStreamKey = () =>
  currentStreamKey || getDefaultStreamKey();

export const setCurrentStreamKey = (streamKey: string) => {
  currentStreamKey = streamKey;
};

export const extractVideoIdFromYouTubeUrl = (url: string): string | null => {
  for (const pattern of YOUTUBE_URL_PATTERNS) {
    const match = url.match(pattern);

    if (match?.[1]) {
      return match[1];
    }
  }

  return null;
};

export const normalizeStreamInput = (input: {
  youtubeUrl?: string;
  streamKey?: string;
}): string | null => {
  const rawStreamKey = input.streamKey?.trim();

  if (rawStreamKey) {
    if (YOUTUBE_VIDEO_ID_PATTERN.test(rawStreamKey)) {
      return rawStreamKey;
    }

    return extractVideoIdFromYouTubeUrl(rawStreamKey);
  }

  const youtubeUrl = input.youtubeUrl?.trim();

  if (!youtubeUrl) {
    return null;
  }

  return extractVideoIdFromYouTubeUrl(youtubeUrl);
};

export const buildYoutubeEmbedUrl = (videoId: string, origin?: string) => {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    controls: "0",
    disablekb: "1",
    fs: "0",
    loop: "1",
    playlist: videoId,
    playsinline: "1",
    modestbranding: "1",
    rel: "0",
    iv_load_policy: "3",
    enablejsapi: "1",
  });

  if (origin) {
    params.set("origin", origin);
  }

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
};

export const resolveStreamOrigin = (request?: Request) => {
  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configuredOrigin) {
    return configuredOrigin;
  }

  if (!request) {
    return undefined;
  }

  return new URL(request.url).origin;
};

export const buildStreamResponse = (request?: Request) => {
  const streamKey = getCurrentStreamKey();

  if (!streamKey) {
    return null;
  }

  const embedUrl = buildYoutubeEmbedUrl(
    streamKey,
    resolveStreamOrigin(request),
  );

  return {
    streamKey,
    currentKey: streamKey,
    embedUrl,
  };
};
