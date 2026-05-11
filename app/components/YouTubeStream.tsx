"use client";

import React from "react";

const MONITOR_PAGE_SRC = "/monitor";

interface YouTubeStreamProps {
  className?: string;
  style?: React.CSSProperties;
}

export const YouTubeStream = ({ className, style }: YouTubeStreamProps) => {
  return (
    <iframe
      width="100%"
      height="100%"
      src={MONITOR_PAGE_SRC}
      title="Monitor page"
      className={className}
      style={{ border: "none", display: "block", ...style }}
    />
  );
};
