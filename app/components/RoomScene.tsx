'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import { RoomComponent } from './RoomComponent'
import { LiveStream } from './LiveStream'
import { YouTubeStream } from './YouTubeStream'

export default function RoomScene() {

  return (
    <div className="w-full h-screen">
      <YouTubeStream 
        streamKey="S6jj6adI4Xo"
      />

      <Canvas
        shadows
        camera={{ position: [10, 10, 10], fov: 50 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <color attach="background" args={['#f0f0f0']} />
        
        <Suspense fallback={null}>
          <RoomComponent />
          <Environment preset="city" environmentIntensity={3} />
        </Suspense>

        <OrbitControls
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}