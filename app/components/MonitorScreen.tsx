import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
// import { folder, useControls } from "leva";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useCycleStore } from "../store/useCycleStore";

interface YouTubeResponse {
  embedUrl: string;
  error?: string;
}

export default function MonitorScreen() {
  const cycleValue = useCycleStore((state) => state.cycleValue);
  const monitorLightRef = useRef<THREE.PointLight>(null);
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [timestamp, setTimestamp] = useState(new Date().toLocaleString());

  const { size } = useThree();
  const isMobile = size.width < 768;

  const position: [number, number, number] = isMobile
    ? [-3.98, -2.08, -0.57] // Mobile position
    : [-3.83, -2.32, -0.57]; // Desktop position

  useEffect(() => {
    const fetchEmbedUrl = async () => {
      try {
        const response = await fetch("/api/youtube");
        const data: YouTubeResponse = await response.json();
        // console.log("@@embedd url", data);
        if (data.embedUrl) {
          setEmbedUrl(data.embedUrl);
        }
      } catch (error) {
        console.error("Failed to fetch YouTube embed URL:", error);
      }
    };

    fetchEmbedUrl();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimestamp(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // const controls = useControls({
  //   'Position': folder({
  //     positionX: { value: -3.83, min: -5, max: 5, step: 0.001 },
  //     positionY: { value: -2.32, min: -5, max: 5, step: 0.001 },
  //     positionZ: { value: -0.57, min: -5, max: 5, step: 0.001 }
  //   }),
  //   'Rotation': folder({
  //     rotationX: { value: 1.58, min: -Math.PI, max: Math.PI, step: 0.01 },
  //     rotationY: { value: -3.14, min: -Math.PI, max: Math.PI, step: 0.01 },
  //     rotationZ: { value: -1.57, min: -Math.PI, max: Math.PI, step: 0.01 }
  //   }),
  //   'Size': folder({
  //     width: { value: 1024, min: 100, max: 2048, step: 10 },
  //     height: { value: 655, min: 100, max: 1536, step: 10 }
  //   }),
  //   distanceFactor: { value: 0.93, min: 0.1, max: 5, step: 0.01 }
  // })

  // Update the monitor light intensity based on the day/night cycle
  useFrame(() => {
    if (monitorLightRef.current) {
      // Increase light intensity during night (when cycle value is high)
      // The light is barely visible during day and brighter at night
      monitorLightRef.current.intensity = 5 * cycleValue;
    }
  });

  return (
    <group
      name="monitor_screen"
      castShadow
      receiveShadow
      rotation={[0, -Math.PI / 4, -Math.PI / 2]}
    >
      {embedUrl ? (
        <Html
          transform
          distanceFactor={0.93}
          position={position}
          rotation={[1.58, -3.14, -1.57]}
          style={{
            width: `${1024}px`,
            height: `${655}px`,
            transformOrigin: "0 0",
            overflow: "hidden",
            borderRadius: "20px",
            backgroundColor: "#000",
            pointerEvents: "none",
            transform: "translate3d(0, 0, 0)",
            WebkitTransform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
          occlude
          zIndexRange={[1, 10]}
          calculatePosition={() => {
            return position;
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src={embedUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              style={{
                border: "none",
                borderRadius: "20px",
                backgroundColor: "#000",
                transformOrigin: "0 0",
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                margin: 0,
                padding: 0,
              }}
            />
            {/* Horizontal scanlines */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `
                  linear-gradient(
                    to bottom,
                    transparent,
                    transparent 50%,
                    rgba(0, 0, 0, 0.4) 50%,
                    rgba(0, 0, 0, 0.4)
                  )
                `,
                backgroundSize: "100% 4px",
                pointerEvents: "none",
                opacity: 0.4,
                mixBlendMode: "multiply",
              }}
            />
            {/* Moving scanline */}
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
            {/* CRT flicker */}
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
            {/* Vignette effect */}

            {/* Timestamp */}
            <div
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
            </div>
          </div>
        </Html>
      ) : (
        <Html
          transform
          distanceFactor={0.93}
          position={position}
          rotation={[1.58, -3.14, -1.57]}
          style={{
            width: `${1024}px`,
            height: `${655}px`,
            transformOrigin: "0 0",
            overflow: "hidden",
            borderRadius: "20px",
            backgroundColor: "#000",
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          occlude
          zIndexRange={[1, 10]}
          calculatePosition={() => {
            return position;
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#000",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div
              style={{
                color: "#FF0000",
                fontSize: "32px",
                fontWeight: "bold",
                textShadow: "0 0 10px rgba(255,0,0,0.5)",
              }}
            >
              OFFLINE
            </div>
            <div
              style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#FF0000",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 0 15px rgba(255,0,0,0.7)",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#000",
                  borderRadius: "50%",
                }}
              />
            </div>
          </div>
        </Html>
      )}

      {/* Add point light for monitor glow effect */}
      {/* <pointLight
        ref={monitorLightRef}
        position={[-0.2, -0.2, 0.5]}
        color="#80ccff"
        intensity={0}
        distance={5}
        decay={2}
      /> */}
    </group>
  );
}
