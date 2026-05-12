"use client";

import { Volume2, VolumeX, X } from "lucide-react";
import { MONITOR_FOCUS_LOCKED_THRESHOLD } from "../constants/sceneCamera";
import { useXpAudioMute } from "../monitor/windows-xp/hooks/useXpAudioMute";
import { useCameraFocusStore } from "../store/useCameraFocusStore";

const monitorControlButtonClassName =
  "flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white shadow-lg backdrop-blur transition hover:bg-black/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function MonitorFocusControls() {
  const focusProgress = useCameraFocusStore((state) => state.focusProgress);
  const setFocusProgress = useCameraFocusStore((state) => state.setFocusProgress);
  const { isMuted, toggleMute } = useXpAudioMute();
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

  const handleToggleMute = () => {
    toggleMute();
  };

  const handleToggleMuteKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    handleToggleMute();
  };

  if (!isMonitorFocused) {
    return null;
  }

  return (
    <div className="fixed right-6 top-6 z-50 flex items-center gap-3">
      <button
        type="button"
        aria-label={isMuted ? "Unmute Windows XP sounds" : "Mute Windows XP sounds"}
        aria-pressed={isMuted}
        onClick={handleToggleMute}
        onKeyDown={handleToggleMuteKeyDown}
        className={monitorControlButtonClassName}
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Volume2 className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
      <button
        type="button"
        aria-label="Close monitor and return to the room"
        onClick={handleCloseMonitor}
        onKeyDown={handleCloseMonitorKeyDown}
        className={monitorControlButtonClassName}
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
