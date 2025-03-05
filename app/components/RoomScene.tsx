"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, useProgress } from "@react-three/drei";
import { Suspense } from "react";
import { RoomComponent } from "./RoomComponent";
import Parallax from "./Parallax";
import { useCycleStore } from "../store/useCycleStore";
import * as THREE from "three";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

// This component handles the background and fog color changes based on day/night cycle
function SceneBackground() {
  const { scene } = useThree();
  const cycleValue = useCycleStore((state) => state.cycleValue);

  // Initialize the background and fog on first render
  useEffect(() => {
    // Set initial background and fog
    scene.background = new THREE.Color("#b1b1b1");
    scene.fog = new THREE.Fog("#b1b1b1", 5, 50);
  }, [scene]);

  useFrame(() => {
    // Day color (light blue) to night color (dark blue/black)
    const dayColor = new THREE.Color("#b1b1b1"); // Light sky blue for day
    const nightColor = new THREE.Color("#000000"); // Black for night

    // Interpolate between day and night colors based on cycle value
    const currentColor = new THREE.Color().lerpColors(
      dayColor,
      nightColor,
      cycleValue
    );

    // Update scene background and fog color
    if (scene.background) {
      (scene.background as THREE.Color).copy(currentColor);
    }

    if (scene.fog) {
      (scene.fog as THREE.Fog).color.copy(currentColor);
    }
  });

  return null;
}

export default function RoomScene() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const progress = useProgress();

  useEffect(() => {
    if (progress.active) {
      setIsLoading(true);
      setLoadingProgress(progress.progress);
    } else {
      setIsLoading(false);
    }
  }, [progress.active, progress.progress]);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* <YouTubeStream 
        streamKey="S6jj6adI4Xo"
      /> */}

      <Canvas
        shadows
        camera={{
          position: [10, 5, -1.5],
          near: 0.1,
          far: 1000,
          fov: 25,
        }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={null}>
          <Parallax />
          <SceneBackground />
          <ambientLight intensity={0.5} />
          <RoomComponent />
          <Environment preset="city" environmentIntensity={3} />
          <OrbitControls
            makeDefault
            target={[1, 3.5, -1]}
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
        </Suspense>
      </Canvas>

      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <LoaderCircle className="animate-spin" />
          <div style={{ color: "white" }}>{loadingProgress.toFixed(0)}%</div>
        </div>
      )}
    </div>
  );
}

// Create a separate Loader component that works within Canvas
