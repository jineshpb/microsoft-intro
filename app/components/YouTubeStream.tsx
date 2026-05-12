"use client";

import { useCallback, useEffect, useRef } from "react";

const MONITOR_PAGE_SRC = "/monitor";
const MONITOR_FOCUS_LOCKED_MESSAGE = "monitor-focus-locked";

type YouTubeStreamProps = {
  className?: string;
  style?: React.CSSProperties;
  isInteractive?: boolean;
};

export const YouTubeStream = ({
  className,
  style,
  isInteractive = false,
}: YouTubeStreamProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const hasPostedFocusMessageRef = useRef(false);

  const postFocusLockedMessage = useCallback(() => {
    if (!isInteractive || hasPostedFocusMessageRef.current) {
      return;
    }

    const iframeWindow = iframeRef.current?.contentWindow;

    if (!iframeWindow) {
      return;
    }

    iframeWindow.postMessage({ type: MONITOR_FOCUS_LOCKED_MESSAGE }, "*");
    hasPostedFocusMessageRef.current = true;
  }, [isInteractive]);

  useEffect(() => {
    postFocusLockedMessage();
  }, [postFocusLockedMessage]);

  const handleIframeLoad = () => {
    postFocusLockedMessage();
  };

  return (
    <iframe
      ref={iframeRef}
      width="100%"
      height="100%"
      src={MONITOR_PAGE_SRC}
      title="Monitor page"
      className={className}
      style={{ border: "none", display: "block", ...style }}
      onLoad={handleIframeLoad}
    />
  );
};
