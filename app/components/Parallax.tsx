"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useCameraFocusStore } from "../store/useCameraFocusStore";

// This component adds cursor-based movement to the scene
export default function Parallax({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const { size } = useThree();
  const isMobile = size.width < 768;
  const focusProgress = useCameraFocusStore((state) => state.focusProgress);

  useEffect(() => {
    if (isMobile || focusProgress > 0) return;

    const handleMove = (clientX: number) => {
      if (!groupRef.current) return;

      const x = (clientX / window.innerWidth) * 2 - 1;

      // Only update horizontal rotation (y-axis)
      targetRotation.current.y = x * 0.1;
    };

    const onMouseMove = (event: MouseEvent) => {
      handleMove(event.clientX);
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [focusProgress, isMobile]);

  useFrame(() => {
    if (!groupRef.current || focusProgress > 0) return;

    // Only apply horizontal rotation
    groupRef.current.rotation.y +=
      (targetRotation.current.y - groupRef.current.rotation.y) * 0.05;
  });

  return <group ref={groupRef}>{children}</group>;
}
