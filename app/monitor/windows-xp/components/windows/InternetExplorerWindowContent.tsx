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
          setErrorMessage(data.error ?? "No live stream is available right now.");
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
      addressPath="http://jineshb.me/live"
      bodyClassName="min-h-0 flex-1 bg-black"
    >
      {embedUrl ? (
        <iframe
          title="Live stream"
          src={embedUrl}
          className="h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      ) : (
        <div className="flex h-full items-center justify-center bg-white p-4 text-center text-[12px] text-slate-700">
          {errorMessage ?? "Loading live stream..."}
        </div>
      )}
    </XpWindowChrome>
  );
};
