import { useSyncExternalStore } from "react";
import {
  getXpAudioMuted,
  subscribeXpAudioMute,
  toggleXpAudioMuted,
} from "../utils/xpAudio";

export const useXpAudioMute = () => {
  const isMuted = useSyncExternalStore(
    subscribeXpAudioMute,
    getXpAudioMuted,
    () => false,
  );

  return {
    isMuted,
    toggleMute: toggleXpAudioMuted,
  };
};
