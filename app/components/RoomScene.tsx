'use client'

import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { Suspense } from 'react'
import { RoomComponent } from './RoomComponent'

import { YouTubeStream } from './YouTubeStream'
import Parallax from './Parallax'


// This component logs camera position when it changes
// function CameraLogger() {
//   const { camera } = useThree();
//   const prevPositionRef = useRef({ x: 0, y: 0, z: 0 });
  
//   useFrame(() => {
//     // Check if camera position has changed
//     if (
//       prevPositionRef.current.x !== camera.position.x ||
//       prevPositionRef.current.y !== camera.position.y ||
//       prevPositionRef.current.z !== camera.position.z
//     ) {
//       console.log('Camera position:', {
//         x: camera.position.x,
//         y: camera.position.y,
//         z: camera.position.z
//       });
      
//       // Update previous position
//       prevPositionRef.current = {
//         x: camera.position.x,
//         y: camera.position.y,
//         z: camera.position.z
//       };
//     }
//   });
  
//   return null;
// }



export default function RoomScene() {



  return (
    <div className="w-full h-screen">
      <YouTubeStream 
        streamKey="S6jj6adI4Xo"
      />

      <Canvas 
        shadows
        camera={{ 
          position: [10, 6, -1.5],
          near: 0.1, 
          far: 1000, 
          fov: 25
        }}
        gl={{ preserveDrawingBuffer: true }}
      >
               
                {/* Add the camera logger component */}
          {/* <CameraLogger /> */}
          <Parallax />
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 10, 100]} />
        
        <ambientLight intensity={0.5} />

        <Suspense fallback={null}>
          <RoomComponent />
          <Environment preset="city" environmentIntensity={3} />
        </Suspense>

        {/* <OrbitControls
          makeDefault
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={Math.PI / 2}
          maxAzimuthAngle={Math.PI / 2}
          target={[1,3.5,-1]}
          enableZoom={false}

        /> */}
      </Canvas>
    </div>
  )
}