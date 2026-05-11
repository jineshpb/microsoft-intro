"use client";

import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { MONITOR_FOCUS_LOCKED_THRESHOLD } from "../constants/sceneCamera";
import { useSceneCameraControls } from "../hooks/useSceneCameraControls";
import type { CameraPose } from "../store/useCameraFocusStore";
import { useCameraFocusStore } from "../store/useCameraFocusStore";

const createPoseVector = (pose: CameraPose) => ({
  position: new THREE.Vector3(...pose.position),
  target: new THREE.Vector3(...pose.target),
  fov: pose.fov,
});

export default function SceneCameraControls() {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const focusProgress = useCameraFocusStore((state) => state.focusProgress);
  const adjustFocusProgressByDelta = useCameraFocusStore(
    (state) => state.adjustFocusProgressByDelta,
  );
  const setFocusProgress = useCameraFocusStore((state) => state.setFocusProgress);
  const { camera } = useThree();
  const { roomCamera, monitorFocusCamera, scrollStep } = useSceneCameraControls();
  const blendedPose = useRef(createPoseVector(roomCamera));

  useEffect(() => {
    if (focusProgress >= MONITOR_FOCUS_LOCKED_THRESHOLD) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      adjustFocusProgressByDelta(event.deltaY, scrollStep);
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [adjustFocusProgressByDelta, focusProgress, scrollStep]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      setFocusProgress(0);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setFocusProgress]);

  useFrame((_, delta) => {
    const controls = controlsRef.current;

    if (!controls) {
      return;
    }

    const roomPose = createPoseVector(roomCamera);
    const monitorPose = createPoseVector(monitorFocusCamera);

    blendedPose.current.position
      .copy(roomPose.position)
      .lerp(monitorPose.position, focusProgress);
    blendedPose.current.target
      .copy(roomPose.target)
      .lerp(monitorPose.target, focusProgress);
    blendedPose.current.fov = THREE.MathUtils.lerp(
      roomPose.fov,
      monitorPose.fov,
      focusProgress,
    );

    const lerpFactor = 1 - Math.pow(0.001, delta);

    camera.position.lerp(blendedPose.current.position, lerpFactor);
    controls.target.lerp(blendedPose.current.target, lerpFactor);

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(
        camera.fov,
        blendedPose.current.fov,
        lerpFactor,
      );
      camera.updateProjectionMatrix();
    }

    controls.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      target={roomCamera.target}
      enableZoom={false}
      enablePan={false}
      enableRotate={false}
    />
  );
}
