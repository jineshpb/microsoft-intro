"use client";

import { WifiIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { GiSpeaker } from "react-icons/gi";

const formatTrayDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
};

const formatTrayTime = (date: Date) => {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};

export const XpSystemTray = () => {
  const [timeLabel, setTimeLabel] = useState("");
  const [dateLabel, setDateLabel] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTimeLabel(formatTrayTime(new Date()));
      setDateLabel(formatTrayDate(new Date()));
    };

    updateTime();
    const timer = window.setInterval(updateTime, 30_000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex h-full items-center gap-2 pl-6 border-l border-[#4f86df] bg-[#1a4fb8] px-3 text-[11px] text-white">
      <WifiIcon className="h-4 w-4 -rotate-50" />
      <GiSpeaker className="h-6 w-6" />
      <span>ENG</span>
      <div className="flex flex-col items-center">
        <time className=" text-right font-medium text-[10px]">{timeLabel}</time>
        <span className="text-right font-medium text-[10px]">{dateLabel}</span>
      </div>
    </div>
  );
};
