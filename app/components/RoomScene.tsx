'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import { RoomComponent } from './RoomComponent'
import Parallax from './Parallax'
import { useCycleStore } from '../store/useCycleStore'
import * as THREE from 'three'  
import { useEffect } from 'react';



// This component handles the background and fog color changes based on day/night cycle
function SceneBackground() {
  const { scene } = useThree()
  const cycleValue = useCycleStore(state => state.cycleValue)
  
  // Initialize the background and fog on first render
  useEffect(() => {
    // Set initial background and fog
    scene.background = new THREE.Color('#b1b1b1')
    scene.fog = new THREE.Fog('#b1b1b1', 5, 50)
  }, [scene])
  
  useFrame(() => {
    // Day color (light blue) to night color (dark blue/black)
    const dayColor = new THREE.Color('#b1b1b1') // Light sky blue for day
    const nightColor = new THREE.Color('#000000') // Black for night
    
    // Interpolate between day and night colors based on cycle value
    const currentColor = new THREE.Color().lerpColors(dayColor, nightColor, cycleValue)
    
    // Update scene background and fog color
    if (scene.background) {
      (scene.background as THREE.Color).copy(currentColor)
    }
    
    if (scene.fog) {
      (scene.fog as THREE.Fog).color.copy(currentColor)
    }
  })
  
  return null
}



export default function RoomScene() {



  return (
    <div className="w-full h-screen">
      {/* <YouTubeStream 
        streamKey="S6jj6adI4Xo"
      /> */}

      <Canvas 
        shadows
        camera={{ 
          position: [10, 5, -1.5],
          near: 0.1, 
          far: 1000, 
          fov: 25
        }}
        gl={{ preserveDrawingBuffer: true }}
      >
               
        <Parallax />
        <SceneBackground /> {/* Add the background color controller */}

        
        <ambientLight intensity={0.5} />

        <Suspense fallback={null}>
          <RoomComponent />
          <Environment preset="city" environmentIntensity={3} />
        </Suspense>

        <OrbitControls
          makeDefault
          target={[1,3.5,-1]}
          enableZoom={false}
          enablePan={false}
          enableRotate={false}

        />
      </Canvas>
    </div>
  )
}