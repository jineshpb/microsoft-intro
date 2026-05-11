"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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
    <div className="flex h-full flex-col bg-[#ece9d8]">
      <div className="flex items-center gap-2 border-b border-[#aca899] bg-[#ece9d8] px-2 py-1 text-[11px] text-slate-800">
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Favorites</span>
        <span>Tools</span>
        <span>Help</span>
      </div>
      <div className="flex items-center gap-2 border-b border-[#aca899] bg-[#ece9d8] px-2 py-1">
        <Image
          src="/monitor/internet-explorer.png"
          alt=""
          width={16}
          height={16}
          aria-hidden="true"
        />
        <span className="text-[11px] text-slate-700">Address</span>
        <div className="min-w-0 flex-1 rounded-sm border border-[#7f9db9] bg-white px-2 py-0.5 text-[11px] text-slate-800">
          http://jineshb.me/live
        </div>
      </div>
      <div className="min-h-0 flex-1 bg-black">
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
      </div>
    </div>
  );
};
