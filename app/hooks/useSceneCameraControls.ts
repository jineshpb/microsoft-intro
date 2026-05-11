"use client";

import { useControls } from "leva";
import {
  CAMERA_FOCUS_SCROLL_STEP,
  DEFAULT_ROOM_CAMERA,
  MONITOR_FOCUS_CAMERA,
} from "../constants/sceneCamera";
import type { CameraPose } from "../store/useCameraFocusStore";

const isLevaPanelEnabled = process.env.NODE_ENV === "development";

const toCameraPose = (
  position: { x: number; y: number; z: number },
  target: { x: number; y: number; z: number },
  fov: number,
): CameraPose => ({
  position: [position.x, position.y, position.z],
  target: [target.x, target.y, target.z],
  fov,
});

export const useSceneCameraControls = () => {
  const roomPosition = useControls(
    "Room Camera.Position",
    {
      x: {
        value: DEFAULT_ROOM_CAMERA.position[0],
        min: -20,
        max: 20,
        step: 0.1,
      },
      y: {
        value: DEFAULT_ROOM_CAMERA.position[1],
        min: -20,
        max: 20,
        step: 0.1,
      },
      z: {
        value: DEFAULT_ROOM_CAMERA.position[2],
        min: -20,
        max: 20,
        step: 0.1,
      },
    },
    { render: () => isLevaPanelEnabled },
  );

  const roomTarget = useControls(
    "Room Camera.Target",
    {
      x: {
        value: DEFAULT_ROOM_CAMERA.target[0],
        min: -20,
        max: 20,
        step: 0.1,
      },
      y: {
        value: DEFAULT_ROOM_CAMERA.target[1],
        min: -20,
        max: 20,
        step: 0.1,
      },
      z: {
        value: DEFAULT_ROOM_CAMERA.target[2],
        min: -20,
        max: 20,
        step: 0.1,
      },
    },
    { render: () => isLevaPanelEnabled },
  );

  const roomFov = useControls(
    "Room Camera",
    {
      fov: {
        value: DEFAULT_ROOM_CAMERA.fov,
        min: 10,
        max: 100,
        step: 1,
      },
    },
    { render: () => isLevaPanelEnabled },
  );

  const monitorPosition = useControls(
    "Monitor Focus.Position",
    {
      x: {
        value: MONITOR_FOCUS_CAMERA.position[0],
        min: -20,
        max: 20,
        step: 0.1,
      },
      y: {
        value: MONITOR_FOCUS_CAMERA.position[1],
        min: -20,
        max: 20,
        step: 0.1,
      },
      z: {
        value: MONITOR_FOCUS_CAMERA.position[2],
        min: -20,
        max: 20,
        step: 0.1,
      },
    },
    { render: () => isLevaPanelEnabled },
  );

  const monitorTarget = useControls(
    "Monitor Focus.Target",
    {
      x: {
        value: MONITOR_FOCUS_CAMERA.target[0],
        min: -20,
        max: 20,
        step: 0.1,
      },
      y: {
        value: MONITOR_FOCUS_CAMERA.target[1],
        min: -20,
        max: 20,
        step: 0.1,
      },
      z: {
        value: MONITOR_FOCUS_CAMERA.target[2],
        min: -20,
        max: 20,
        step: 0.1,
      },
    },
    { render: () => isLevaPanelEnabled },
  );

  const monitorFov = useControls(
    "Monitor Focus",
    {
      fov: {
        value: MONITOR_FOCUS_CAMERA.fov,
        min: 10,
        max: 100,
        step: 1,
      },
    },
    { render: () => isLevaPanelEnabled },
  );

  const scroll = useControls(
    "Camera Focus",
    {
      scrollStep: {
        value: CAMERA_FOCUS_SCROLL_STEP,
        min: 0.01,
        max: 0.5,
        step: 0.01,
      },
    },
    { render: () => isLevaPanelEnabled },
  );

  return {
    roomCamera: toCameraPose(roomPosition, roomTarget, roomFov.fov),
    monitorFocusCamera: toCameraPose(
      monitorPosition,
      monitorTarget,
      monitorFov.fov,
    ),
    scrollStep: scroll.scrollStep,
  };
};
