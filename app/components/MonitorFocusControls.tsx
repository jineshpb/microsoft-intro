"use client";

import { X } from "lucide-react";
import { MONITOR_FOCUS_LOCKED_THRESHOLD } from "../constants/sceneCamera";
import { useCameraFocusStore } from "../store/useCameraFocusStore";

export default function MonitorFocusControls() {
  const focusProgress = useCameraFocusStore((state) => state.focusProgress);
  const setFocusProgress = useCameraFocusStore((state) => state.setFocusProgress);
  const isMonitorFocused = focusProgress >= MONITOR_FOCUS_LOCKED_THRESHOLD;

  const handleCloseMonitor = () => {
    setFocusProgress(0);
  };

  const handleCloseMonitorKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    handleCloseMonitor();
  };

  if (!isMonitorFocused) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label="Close monitor and return to the room"
      onClick={handleCloseMonitor}
      onKeyDown={handleCloseMonitorKeyDown}
      className="fixed right-6 top-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white shadow-lg backdrop-blur transition hover:bg-black/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <X className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
