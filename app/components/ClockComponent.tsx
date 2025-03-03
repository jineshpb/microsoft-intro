import React from 'react'
import * as THREE from 'three'
import BubbleClock from './BubbleClock'
import {GLTFResult} from '../types/room'

const ClockComponent = ({dayMaterial, nodes}: {dayMaterial: THREE.Material, nodes: GLTFResult['nodes']}) => {
  return (
    <group>
      {/* Clock frame/housing with day texture */}
      <mesh
        name="bubble_clock"
        castShadow
        receiveShadow
        geometry={nodes.bubble_clock.geometry}
        material={dayMaterial}
        rotation={[0, -Math.PI / 4, 0]}
      />
      
      {/* Clock time display with shader materials */}
      <BubbleClock 
        nodes={{
          // Extra bubbles background
          bubble_clock_extra_bubbles: nodes.bubble_clock_extra_bubbles,
          
          // Hour tens segments
          ...Object.fromEntries(
            Object.entries(nodes).filter(([key]) => 
              key.startsWith('hrtens_segment')
            )
          ),
          
          // Hour units segments
          ...Object.fromEntries(
            Object.entries(nodes).filter(([key]) => 
              key.startsWith('hrunits_segment')
            )
          ),
          
          // Minute tens segments
          ...Object.fromEntries(
            Object.entries(nodes).filter(([key]) => 
              key.startsWith('mintens_segment')
            )
          ),
          
          // Minute units segments
          ...Object.fromEntries(
            Object.entries(nodes).filter(([key]) => 
              key.startsWith('minunits_segment')
            )
          ),
          
          // Seconds indicator
          ...Object.fromEntries(
            Object.entries(nodes).filter(([key]) => 
              key.startsWith('segmentsec')
            )
          )
        }} 
      />
    </group>
  )
}

export default ClockComponent
