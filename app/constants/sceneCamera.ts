import type { CameraPose } from "../store/useCameraFocusStore";

export const DEFAULT_ROOM_CAMERA: CameraPose = {
  position: [10, 5, -1.5],
  target: [1, 3.5, -1],
  fov: 25,
};

export const MONITOR_FOCUS_CAMERA: CameraPose = {
  position: [2.3, 4.0, 2.3],
  target: [-0.7, 3.8, -1.3],
  fov: 20,
};

export const CAMERA_FOCUS_SCROLL_STEP = 0.38;

export const MONITOR_FOCUS_LOCKED_THRESHOLD = 0.98;
