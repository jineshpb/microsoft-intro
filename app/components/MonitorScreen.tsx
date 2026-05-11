import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { MONITOR_FOCUS_LOCKED_THRESHOLD } from "../constants/sceneCamera";
import { useCameraFocusStore } from "../store/useCameraFocusStore";
import { useCycleStore } from "../store/useCycleStore";
import { YouTubeStream } from "./YouTubeStream";

const MONITOR_FACE_ROTATION: [number, number, number] = [1.58, -3.14, -1.57];
export default function MonitorScreen() {
  const cycleValue = useCycleStore((state) => state.cycleValue);
  const focusProgress = useCameraFocusStore((state) => state.focusProgress);
  const monitorLightRef = useRef<THREE.PointLight>(null);
  // const [timestamp, setTimestamp] = useState(new Date().toLocaleString());

  const { size } = useThree();
  const isMobile = size.width < 768;

  const position: [number, number, number] = isMobile
    ? [-3.98, -2.08, -0.57]
    : [-3.82, -2.31, -0.575];

  useEffect(() => {
    const timer = setInterval(() => {
      // setTimestamp(new Date().toLocaleString());
      console.log("we skipping timestamp");
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useFrame(() => {
    if (monitorLightRef.current) {
      monitorLightRef.current.intensity = 5 * cycleValue;
    }
  });

  const isMonitorInteractive = focusProgress >= MONITOR_FOCUS_LOCKED_THRESHOLD;

  return (
    <group
      name="monitor_screen"
      castShadow
      receiveShadow
      rotation={[0, -Math.PI / 4, -Math.PI / 2]}
    >
      <Html
        transform
        distanceFactor={0.93}
        position={position}
        rotation={MONITOR_FACE_ROTATION}
        style={{
          width: `${1024}px`,
          height: `${655}px`,
          transformOrigin: "0 0",
          overflow: "hidden",
          borderRadius: "20px",
          backgroundColor: "#000",
          pointerEvents: isMonitorInteractive ? "auto" : "none",
          touchAction: isMonitorInteractive ? "auto" : "none",
          transform: "translate3d(0, 0, 0)",
          WebkitTransform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
        occlude
        zIndexRange={[1, 10]}
      >
        <YouTubeStream
          className="h-full w-full"
          style={{
            borderRadius: "20px",
            backgroundColor: "#000",
            transformOrigin: "0 0",
            pointerEvents: isMonitorInteractive ? "auto" : "none",
            touchAction: isMonitorInteractive ? "auto" : "none",
          }}
        />

        {/* <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(to bottom, transparent, transparent 50%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.4))",
            backgroundSize: "100% 4px",
            pointerEvents: "none",
            opacity: 0.4,
            mixBlendMode: "multiply",
          }}
        /> */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "10px",
            background: "rgba(255, 255, 255, 0.1)",
            animation: "scanline 4s linear infinite",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            animation: "flicker 0.15s infinite",
            background: "rgba(32, 128, 32, 0.05)",
            mixBlendMode: "screen",
            pointerEvents: "none",
          }}
        />
        {/* <div
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            color: "rgba(255, 255, 255, 0.8)",
            fontFamily: "monospace",
            fontSize: "14px",
            textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
            pointerEvents: "none",
          }}
        >
          {timestamp}
        </div> */}
      </Html>
    </group>
  );
}
