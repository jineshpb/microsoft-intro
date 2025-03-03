import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { folder, useControls } from "leva";
import { useRef } from "react";
import * as THREE from "three";
import { useCycleStore } from '../store/useCycleStore'


export default function MonitorScreen({ geometry }: { geometry: THREE.BufferGeometry }) {

    const cycleValue = useCycleStore(state => state.cycleValue)

    const controls = useControls({
      'Position': folder({
        positionX: { value: -3.83, min: -5, max: 5, step: 0.001 },
        positionY: { value: -2.32, min: -5, max: 5, step: 0.001 },
        positionZ: { value: -0.57, min: -5, max: 5, step: 0.001 }
      }),
      'Rotation': folder({
        rotationX: { value: 1.58, min: -Math.PI, max: Math.PI, step: 0.01 },
        rotationY: { value: -3.14, min: -Math.PI, max: Math.PI, step: 0.01 },
        rotationZ: { value: -1.57, min: -Math.PI, max: Math.PI, step: 0.01 }
      }),
      'Size': folder({
        width: { value: 1024, min: 100, max: 2048, step: 10 },
        height: { value: 655, min: 100, max: 1536, step: 10 }
      }),
      distanceFactor: { value: 0.93, min: 0.1, max: 5, step: 0.01 }
    })
  
    // Reference to the point light for the monitor glow
    const monitorLightRef = useRef<THREE.PointLight>(null);
    
    // Update the monitor light intensity based on the day/night cycle
    useFrame(() => {
        if (monitorLightRef.current) {
          // Increase light intensity during night (when cycle value is high)
          // The light is barely visible during day and brighter at night
          monitorLightRef.current.intensity = 5 * cycleValue;
        }
      });
  
    return (
      <mesh
        name="monitor_screen"
        castShadow
        receiveShadow
        geometry={geometry}
        rotation={[0, -Math.PI / 4, -Math.PI / 2]}
      >
        <meshPhysicalMaterial 
          color="#000000" 
          depthWrite={true}  
          transparent
          opacity={0.4}
        />
        {process.env.NEXT_PUBLIC_YOUTUBE_STREAM_KEY ? (
          <Html
          transform
          distanceFactor={controls.distanceFactor}
          position={[controls.positionX, controls.positionY, controls.positionZ]}
          rotation={[controls.rotationX, controls.rotationY, controls.rotationZ]}
          style={{
            width: `${controls.width}px`,
            height: `${controls.height}px`,
            transformOrigin: '0 0',
            overflow: 'hidden',
            borderRadius: '20px',
            backgroundColor: '#000',
            pointerEvents: 'none'
          }}
          occlude
          zIndexRange={[1, 10]}
          calculatePosition={() => {
            return [controls.positionX, controls.positionY, controls.positionZ]
          }}
        >
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${process.env.NEXT_PUBLIC_YOUTUBE_STREAM_KEY}?autoplay=1&mute=1&controls=0&enablejsapi=1&playsinline=1&loop=1&modestbranding=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            style={{ 
              border: 'none',
              borderRadius: '20px',
              backgroundColor: '#000',
              transformOrigin: '0 0'
            }}
          />
        </Html>
        ):(
          <Html
      transform
      distanceFactor={controls.distanceFactor}
      position={[controls.positionX, controls.positionY, controls.positionZ]}
      rotation={[controls.rotationX, controls.rotationY, controls.rotationZ]}
      style={{
        width: `${controls.width}px`,
        height: `${controls.height}px`,
        transformOrigin: '0 0',
        overflow: 'hidden',
        borderRadius: '20px',
        backgroundColor: '#000',
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      occlude
      zIndexRange={[1, 10]}
      calculatePosition={() => {
        return [controls.positionX, controls.positionY, controls.positionZ]
      }}
    >
      <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px'
      }}>
        <div style={{
          color: '#FF0000',
          fontSize: '32px',
          fontWeight: 'bold',
          textShadow: '0 0 10px rgba(255,0,0,0.5)'
        }}>
          OFFLINE
        </div>
        <div style={{
          width: '60px',
          height: '60px',
          backgroundColor: '#FF0000',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 0 15px rgba(255,0,0,0.7)'
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            backgroundColor: '#000',
            borderRadius: '50%'
          }} />
        </div>
      </div>
    </Html>
        )}
        
        {/* Add point light for monitor glow effect */}
        <pointLight
          ref={monitorLightRef}
          position={[controls.positionX - 0.2, controls.positionY - 0.2, controls.positionZ + 0.5]}
          color="#80ccff"
          intensity={0}
          distance={5}
          decay={2}
        />
      </mesh>
    )
  }