import { create } from "zustand";
import { CAMERA_FOCUS_SCROLL_STEP } from "../constants/sceneCamera";

export type CameraPose = {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
};

interface CameraFocusState {
  focusProgress: number;
  setFocusProgress: (value: number) => void;
  adjustFocusProgressByDelta: (deltaY: number, scrollStep?: number) => void;
}

export const useCameraFocusStore = create<CameraFocusState>((set) => ({
  focusProgress: 0,
  setFocusProgress: (value) =>
    set({ focusProgress: Math.min(1, Math.max(0, value)) }),
  adjustFocusProgressByDelta: (deltaY, scrollStep = CAMERA_FOCUS_SCROLL_STEP) =>
    set((state) => {
      const direction = deltaY > 0 ? 1 : -1;
      const step = Math.min(Math.abs(deltaY), 120) / 120;
      const nextProgress =
        state.focusProgress + direction * step * scrollStep;

      return {
        focusProgress: Math.min(1, Math.max(0, nextProgress)),
      };
    }),
}));
