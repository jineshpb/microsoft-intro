'use client'
import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF, Html, useAnimations, useTexture, Float } from '@react-three/drei'
import { useControls, folder } from 'leva'

function MonitorScreen({ geometry }: { geometry: THREE.BufferGeometry }) {
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

  return (
    <mesh
      name="monitor_screen"
      castShadow
      receiveShadow
      geometry={geometry}
      rotation={[0, -Math.PI / 4, -Math.PI / 2]}
    >
      <Html
        transform
        wrapperClass="htmlScreen"
        distanceFactor={controls.distanceFactor}
        position={[controls.positionX, controls.positionY, controls.positionZ]}
        rotation={[controls.rotationX, controls.rotationY, controls.rotationZ]}
        style={{
          width: `${controls.width}px`,
          height: `${controls.height}px`,
          transformOrigin: '0 0',
          overflow: 'hidden',
          borderRadius: '20px',
          backgroundColor: '#000'
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
            transformOrigin: '0 0',
            
          }}
        />
      </Html>
    </mesh>
  )
}

export function RoomComponent(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF('models/room_contents.glb') as GLTFResult
  const { actions } = useAnimations<GLTFActions>(animations, group)
  
  const dayTexture = useTexture('textures/day_room_bake.jpg')
  dayTexture.flipY = false
  
  const floorTexture = useTexture('textures/n_day_floor_bake.jpg')
  floorTexture.flipY = false

  const dayMaterial = new THREE.MeshStandardMaterial({
    map: dayTexture,
    roughness: 1,
    metalness: 0
  })

  const floorMaterial = new THREE.MeshStandardMaterial({
    map: floorTexture,
    roughness: 1,
    metalness: 0
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
       
        <mesh
          name="intro_cube"
          castShadow
          receiveShadow
          geometry={nodes.intro_cube.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
          scale={0.446}
        />
        <mesh
          name="cube_frame"
          castShadow
          receiveShadow
          geometry={nodes.cube_frame.geometry}
          material={dayMaterial}
          position={[-2.944, 4.411, 1.205]}
          rotation={[0, 0.191, -0.788]}
        />
        <mesh
          name="photo_frame"
          castShadow
          receiveShadow
          geometry={nodes.photo_frame.geometry}
          material={dayMaterial}
          rotation={[0.01, -0.5, 0.005]}
        />
        <mesh
          name="chair_leg"
          castShadow
          receiveShadow
          geometry={nodes.chair_leg.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="table"
          castShadow
          receiveShadow
          geometry={nodes.table.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
         <MonitorScreen 
          geometry={nodes.monitor_screen.geometry} 
        />
         {/* <mesh
          name="monitor_screen"
          castShadow
          receiveShadow
          geometry={nodes.monitor_screen.geometry}
          // material={nodes.monitor_screen.material}
          rotation={[0, -Math.PI / 4, -Math.PI / 2]}
        >
          <Html
          
          castShadow 
          receiveShadow 
          occlude="blending"
        >
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/S6jj6adI4Xo?autoplay=1&mute=1&controls=0&enablejsapi=1&playsinline=1&loop=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            style={{ border: 'none' }}
          />
        </Html>
        </mesh> */}
        <mesh
          name="bubble_clock_extra_bubbles"
          castShadow
          receiveShadow
          geometry={nodes.bubble_clock_extra_bubbles.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="walls_and_floors"
          castShadow
          receiveShadow
          geometry={nodes.walls_and_floors.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="sofa"
          castShadow
          receiveShadow
          geometry={nodes.sofa.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="telescope_scope"
          castShadow
          receiveShadow
          geometry={nodes.telescope_scope.geometry}
          material={dayMaterial}
          position={[4.235, 2.49, 0.303]}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="chair_top"
          castShadow
          receiveShadow
          geometry={nodes.chair_top.geometry}
          material={dayMaterial}
          position={[1.347, 1.19, -0.193]}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="caroke_machine"
          castShadow
          receiveShadow
          geometry={nodes.caroke_machine.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="boxes_on_floor"
          castShadow
          receiveShadow
          geometry={nodes.boxes_on_floor.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="floor_lamp"
          castShadow
          receiveShadow
          geometry={nodes.floor_lamp.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="plant_pot"
          castShadow
          receiveShadow
          geometry={nodes.plant_pot.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="telescope_stand"
          castShadow
          receiveShadow
          geometry={nodes.telescope_stand.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="car"
          castShadow
          receiveShadow
          geometry={nodes.car.geometry}
          material={dayMaterial}
          rotation={[0.01, -0.5, 0.005]}
        />
        <mesh
          name="books_top_shelf"
          castShadow
          receiveShadow
          geometry={nodes.books_top_shelf.geometry}
          material={dayMaterial}
          rotation={[0.01, -0.5, 0.005]}
        />
        <mesh
          name="books_bottom_shelf"
          castShadow
          receiveShadow
          geometry={nodes.books_bottom_shelf.geometry}
          material={dayMaterial}
          rotation={[0.01, -0.5, 0.005]}
        />
        <mesh
          name="small_plant"
          castShadow
          receiveShadow
          geometry={nodes.small_plant.geometry}
          material={dayMaterial}
          rotation={[0.01, -0.5, 0.005]}
        />
        <mesh
          name="speaker_2"
          castShadow
          receiveShadow
          geometry={nodes.speaker_2.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="speaker_1"
          castShadow
          receiveShadow
          geometry={nodes.speaker_1.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="monitor_stand"
          castShadow
          receiveShadow
          geometry={nodes.monitor_stand.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="monitor"
          castShadow
          receiveShadow
          geometry={nodes.monitor.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="allen_drawer"
          castShadow
          receiveShadow
          geometry={nodes.allen_drawer.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="pc"
          castShadow
          receiveShadow
          geometry={nodes.pc.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="waste_bin"
          castShadow
          receiveShadow
          geometry={nodes.waste_bin.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="coffee_steam"
          castShadow
          receiveShadow
          geometry={nodes.coffee_steam.geometry}
          material={dayMaterial}
          rotation={[0, 0, -Math.PI / 2]}
        />
        <mesh
          name="floor"
          castShadow
          receiveShadow
          geometry={nodes.floor.geometry}
          material={floorMaterial}
          rotation={[0, 0, 0]}
        />
        <mesh
          name="hrtens_segment0_s0_s2_s3_s4_s5_s6_s7_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.hrtens_segment0_s0_s2_s3_s4_s5_s6_s7_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="hrtens_segment1_s0_s1_s2_s3_s5_s6_s7_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.hrtens_segment1_s0_s1_s2_s3_s5_s6_s7_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="hrtens_segment2_s0_s1_s2_s3_s4_s7_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.hrtens_segment2_s0_s1_s2_s3_s4_s7_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="hrtens_segment9_s1_s2_s3_s4_s5_s6_s7_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.hrtens_segment9_s1_s2_s3_s4_s5_s6_s7_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="hrtens_segment3_s0_s1_s3_s4_s5_s6_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.hrtens_segment3_s0_s1_s3_s4_s5_s6_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="hrtens_segment4_s0_s1_s2_s3_s4_s5_s6_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.hrtens_segment4_s0_s1_s2_s3_s4_s5_s6_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="hrtens_segment5_s0_s2_s3_s5_s6_s7_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.hrtens_segment5_s0_s2_s3_s5_s6_s7_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="hrtens_segment6_s0_s2_s6_s8"
          castShadow
          receiveShadow
          geometry={nodes.hrtens_segment6_s0_s2_s6_s8.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="hrtens_segment8_s2_s3_s4_s5_s6_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.hrtens_segment8_s2_s3_s4_s5_s6_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="hrtens_segment7_s0_s4_s5_s6_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.hrtens_segment7_s0_s4_s5_s6_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="hrtens_segment11"
          castShadow
          receiveShadow
          geometry={nodes.hrtens_segment11.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="hrtens_segment10_s7"
          castShadow
          receiveShadow
          geometry={nodes.hrtens_segment10_s7.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="segmentsec"
          castShadow
          receiveShadow
          geometry={nodes.segmentsec.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="hrunits_segment0_s0_s2_s3_s4_s5_s6_s7_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.hrunits_segment0_s0_s2_s3_s4_s5_s6_s7_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="hrunits_segment1_s0_s1_s2_s3_s5_s6_s7_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.hrunits_segment1_s0_s1_s2_s3_s5_s6_s7_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="hrunits_segment2_s0_s1_s2_s3_s4_s7_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.hrunits_segment2_s0_s1_s2_s3_s4_s7_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="hrunits_segment9_s1_s2_s3_s4_s5_s6_s7_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.hrunits_segment9_s1_s2_s3_s4_s5_s6_s7_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="hrunits_segment3_s0_s1_s3_s4_s5_s6_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.hrunits_segment3_s0_s1_s3_s4_s5_s6_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="hrunits_segment4_s0_s1_s2_s3_s4_s5_s6_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.hrunits_segment4_s0_s1_s2_s3_s4_s5_s6_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="hrunits_segment5_s0_s2_s3_s5_s6_s7_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.hrunits_segment5_s0_s2_s3_s5_s6_s7_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="hrunits_segment6_s0_s2_s6_s8"
          castShadow
          receiveShadow
          geometry={nodes.hrunits_segment6_s0_s2_s6_s8.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="hrunits_segment8_s2_s3_s4_s5_s6_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.hrunits_segment8_s2_s3_s4_s5_s6_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="hrunits_segment7_s0_s4_s5_s6_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.hrunits_segment7_s0_s4_s5_s6_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="hrunits_segment11"
          castShadow
          receiveShadow
          geometry={nodes.hrunits_segment11.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="hrunits_segment10_s7"
          castShadow
          receiveShadow
          geometry={nodes.hrunits_segment10_s7.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="mintens_segment0_s0_s2_s3_s4_s5_s6_s7_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.mintens_segment0_s0_s2_s3_s4_s5_s6_s7_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="mintens_segment1_s0_s1_s2_s3_s5_s6_s7_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.mintens_segment1_s0_s1_s2_s3_s5_s6_s7_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="mintens_segment2_s0_s1_s2_s3_s4_s7_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.mintens_segment2_s0_s1_s2_s3_s4_s7_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="mintens_segment9_s1_s2_s3_s4_s5_s6_s7_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.mintens_segment9_s1_s2_s3_s4_s5_s6_s7_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="mintens_segment3_s0_s1_s3_s4_s5_s6_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.mintens_segment3_s0_s1_s3_s4_s5_s6_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="mintens_segment4_s0_s1_s2_s3_s4_s5_s6_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.mintens_segment4_s0_s1_s2_s3_s4_s5_s6_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="mintens_segment5_s0_s2_s3_s5_s6_s7_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.mintens_segment5_s0_s2_s3_s5_s6_s7_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="mintens_segment6_s0_s2_s6_s8"
          castShadow
          receiveShadow
          geometry={nodes.mintens_segment6_s0_s2_s6_s8.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="mintens_segment8_s2_s3_s4_s5_s6_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.mintens_segment8_s2_s3_s4_s5_s6_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="mintens_segment7_s0_s4_s5_s6_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.mintens_segment7_s0_s4_s5_s6_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="mintens_segment11"
          castShadow
          receiveShadow
          geometry={nodes.mintens_segment11.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="mintens_segment10_s7"
          castShadow
          receiveShadow
          geometry={nodes.mintens_segment10_s7.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="minunits_segment0_s0_s2_s3_s4_s5_s6_s7_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.minunits_segment0_s0_s2_s3_s4_s5_s6_s7_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="minunits_segment1_s0_s1_s2_s3_s5_s6_s7_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.minunits_segment1_s0_s1_s2_s3_s5_s6_s7_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="minunits_segment2_s0_s1_s2_s3_s4_s7_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.minunits_segment2_s0_s1_s2_s3_s4_s7_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="minunits_segment9_s1_s2_s3_s4_s5_s6_s7_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.minunits_segment9_s1_s2_s3_s4_s5_s6_s7_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="minunits_segment3_s0_s1_s3_s4_s5_s6_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.minunits_segment3_s0_s1_s3_s4_s5_s6_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="minunits_segment4_s0_s1_s2_s3_s4_s5_s6_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.minunits_segment4_s0_s1_s2_s3_s4_s5_s6_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="minunits_segment5_s0_s2_s3_s5_s6_s7_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.minunits_segment5_s0_s2_s3_s5_s6_s7_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="minunits_segment6_s0_s2_s6_s8"
          castShadow
          receiveShadow
          geometry={nodes.minunits_segment6_s0_s2_s6_s8.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="minunits_segment8_s2_s3_s4_s5_s6_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.minunits_segment8_s2_s3_s4_s5_s6_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="minunits_segment7_s0_s4_s5_s6_s8_s9"
          castShadow
          receiveShadow
          geometry={nodes.minunits_segment7_s0_s4_s5_s6_s8_s9.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="minunits_segment11"
          castShadow
          receiveShadow
          geometry={nodes.minunits_segment11.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="minunits_segment10_s7"
          castShadow
          receiveShadow
          geometry={nodes.minunits_segment10_s7.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="bubble_clock"
          castShadow
          receiveShadow
          geometry={nodes.bubble_clock.geometry}
          material={dayMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="Eva_body"
          castShadow
          receiveShadow
          geometry={nodes.Eva_body.geometry}
          material={dayMaterial}
          position={[-3.049, 5.935, 1.108]}
          rotation={[0, 0.006, 0]}
          scale={0.978}>
          <mesh
            name="Eva_head"
            castShadow
            receiveShadow
            geometry={nodes.Eva_head.geometry}
            material={dayMaterial}
            position={[-0.003, 0.627, 0]}
            rotation={[0, 0, -Math.PI]}>
            <mesh
              name="Eva_eyes"
              castShadow
              receiveShadow
              geometry={nodes.Eva_eyes.geometry}
              material={dayMaterial}
              position={[-0.002, -0.451, 0]}
            />
          </mesh>
          <mesh
            name="Eva_left_hand"
            castShadow
            receiveShadow
            geometry={nodes.Eva_left_hand.geometry}
            material={dayMaterial}
            position={[0.321, 0.511, 0]}
            rotation={[0, 0, 0.273]}
          />
          <mesh
            name="Eva_right_hand"
            castShadow
            receiveShadow
            geometry={nodes.Eva_right_hand.geometry}
            material={dayMaterial}
            position={[-0.327, 0.512, 0]}
            rotation={[0, 0, -0.229]}
          />
        </mesh>
        <mesh
          name="Eva_platform"
          castShadow
          receiveShadow
          geometry={nodes.Eva_platform.geometry}
          material={dayMaterial}
          position={[-3.049, 5.935, 1.108]}
        />
        <mesh
          name="lightbar_desk"
          castShadow
          receiveShadow
          geometry={nodes.lightbar_desk.geometry}
          material={dayMaterial}
          position={[-1.472, 2.391, -3.288]}
          rotation={[0, -Math.PI / 4, -Math.PI / 2]}
        />
        <mesh
          name="Shelf_top"
          castShadow
          receiveShadow
          geometry={nodes.Shelf_top.geometry}
          material={dayMaterial}
          position={[-2.221, 7.387, 2.861]}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="Shelf_bottom"
          castShadow
          receiveShadow
          geometry={nodes.Shelf_bottom.geometry}
          material={dayMaterial}
          position={[-2.221, 5.241, 2.861]}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="monitor_backlight"
          castShadow
          receiveShadow
          geometry={nodes.monitor_backlight.geometry}
          material={dayMaterial}
          position={[-1.296, 3.815, -2.104]}
          rotation={[0, -Math.PI / 4, -Math.PI / 2]}
        />
        <mesh
          name="DJ_terminal_case001"
          castShadow
          receiveShadow
          geometry={nodes.DJ_terminal_case001.geometry}
          material={dayMaterial}
          position={[-0.462, 4.032, 3.962]}
          rotation={[0, -Math.PI / 4, 0]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('models/room_contents.glb')
