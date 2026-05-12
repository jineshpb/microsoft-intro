"use client";

import { useEffect, useState } from "react";
import { XpWindowChrome } from "../XpExplorerChrome";

type YoutubeResponse = {
  embedUrl?: string;
  error?: string;
};

export const InternetExplorerWindowContent = () => {
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadStream = async () => {
      try {
        const response = await fetch("/api/youtube");
        const data = (await response.json()) as YoutubeResponse;

        if (!response.ok || !data.embedUrl) {
          setErrorMessage(
            data.error ?? "No live stream is available right now.",
          );
          return;
        }

        setEmbedUrl(data.embedUrl);
      } catch {
        setErrorMessage("Failed to load the live stream.");
      }
    };

    loadStream();
  }, []);

  return (
    <XpWindowChrome
      className="bg-[#ece9d8]"
      showNavBar={false}
      addressPath="https://www.youtube.com/watch?v=WxfZkMm3wcg"
      bodyClassName="flex min-h-0 flex-1 items-center justify-center bg-black"
    >
      {embedUrl ? (
        <div className="relative aspect-video max-h-full w-full">
          <iframe
            title="Live stream"
            src={embedUrl}
            className="pointer-events-none h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-transparent"
          />
        </div>
      ) : (
        <div className="flex h-full items-center justify-center bg-white p-4 text-center text-[12px] text-slate-700">
          {errorMessage ?? "Loading live stream..."}
        </div>
      )}
    </XpWindowChrome>
  );
};
