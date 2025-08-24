"use client";
import * as THREE from "three";
import React, { useRef, useMemo } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
// import { useControls, folder } from 'leva'
import { useFrame } from "@react-three/fiber";
import CoffeeSteam from "./CoffeeSteam";

import { GLTFResult } from "../types/room";
import { useCycleStore } from "../store/useCycleStore";
import MonitorScreen from "./MonitorScreen";

function CubeFrameAnimation() {
  const cubeFrameRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (cubeFrameRef.current && cubeFrameRef.current.parent) {
      // Get the parent mesh (cube_frame)
      const cubeFrameMesh = cubeFrameRef.current.parent as THREE.Mesh;

      cubeFrameMesh.rotation.y = state.clock.getElapsedTime() * 0.5;
      cubeFrameMesh.rotation.x = state.clock.getElapsedTime() * 0.5;
    }
  });
  return <mesh ref={cubeFrameRef} />;
}

function ChairAnimation() {
  const chairRef = useRef<THREE.Mesh>(null);

  const initialRotation = -Math.PI / 4;

  // Use useFrame to animate the chair rotation
  useFrame((state) => {
    if (chairRef.current && chairRef.current.parent) {
      // Get the parent mesh (chair_top)
      const chairMesh = chairRef.current.parent as THREE.Mesh;

      // Create a gentle oscillation effect using sine
      // The sine function will oscillate between -1 and 1
      // We multiply by a small value (0.05) to keep the rotation subtle
      const oscillation = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;

      // Apply the oscillation to the y-rotation, maintaining the initial rotation
      chairMesh.rotation.y = initialRotation + oscillation;
    }
  });

  return <mesh ref={chairRef} />;
}

export function RoomComponent(props: Record<string, never>) {
  const group = useRef(null);
  const { nodes } = useGLTF(
    "models/room_contents.glb"
  ) as unknown as GLTFResult;
  // const { actions } = useAnimations(animations, group)

  const {
    setCycleValue,
    cycleSpeed,

    manualControl,
    cyclePosition,
  } = useCycleStore();

  const dayTexture = useTexture("textures/day_room_bake.jpg");
  dayTexture.flipY = false;

  const nightTexture = useTexture("textures/night_room_bake.jpg");
  nightTexture.flipY = false;

  const floorTexture = useTexture("textures/n_day_floor_bake.jpg");
  floorTexture.flipY = false;

  const floorNightTexture = useTexture("textures/n_night_floor_bake.jpg");
  floorNightTexture.flipY = false;

  const lightMapTexture = useTexture("textures/light_map_bake.jpg");
  lightMapTexture.flipY = false;

  const lightMapFloorTexture = useTexture(
    "textures/n_light_map_floor_bake.jpg"
  );
  lightMapTexture.flipY = false;

  // Room shader vertex code (same as floor shader)
  const vertexShader = `
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  // Room shader fragment code (same as floor shader)
  const fragmentShader = `
    uniform sampler2D uDayTexture;
    uniform sampler2D uNightTexture;
    uniform sampler2D uLightMapTexture;
    uniform float uCycleProgress;
    
    varying vec2 vUv;
    
    void main() {
      vec4 dayColor = texture2D(uDayTexture, vUv);
      vec4 nightColor = texture2D(uNightTexture, vUv);
      vec4 lightMap = texture2D(uLightMapTexture, vUv);
      
      // Mix day and night textures
      vec4 baseColor = mix(dayColor, nightColor, uCycleProgress);
      
      // Add light map contribution during night
      // Multiply light map by cycle progress to make it visible only at night
      vec4 finalColor = baseColor + (lightMap * uCycleProgress * 0.5);
      
      gl_FragColor = finalColor;
    }
  `;

  // Create shader material for room with day/night cycle
  const roomMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uDayTexture: { value: dayTexture },
        uNightTexture: { value: nightTexture },
        uLightMapTexture: { value: lightMapTexture },
        uCycleProgress: { value: 0.0 },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: THREE.DoubleSide,
    });
  }, [dayTexture, nightTexture, lightMapTexture]);

  // Create shader material for floor with day/night cycle
  const floorMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uDayTexture: { value: floorTexture },
        uNightTexture: { value: floorNightTexture },
        uLightMapTexture: { value: lightMapFloorTexture },
        uCycleProgress: { value: 0.0 },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });
  }, [floorTexture, floorNightTexture, lightMapFloorTexture]);

  // Add controls for day/night cycle
  // const cycleControls = useControls('Day/Night Cycle', {
  //   parameters: folder({
  //     cycleSpeed: {
  //       value: cycleSpeed,
  //       min: 0.01,
  //       max: 1.0,
  //       step: 0.01,
  //       onChange: (value) => setCycleSpeed(value)
  //     },
  //     manualControl: {
  //       value: manualControl,
  //       onChange: (value) => setManualControl(value)
  //     },
  //     cyclePosition: {
  //       value: cyclePosition,
  //       min: 0.0,
  //       max: 1.0,
  //       step: 0.01,
  //       onChange: (value) => setCyclePosition(value)
  //     }
  //   })
  // })
  // Update cycle progress in animation loop
  useFrame((state) => {
    if (floorMaterial && roomMaterial) {
      let cycle;
      if (manualControl) {
        // Manual control mode
        cycle = cyclePosition;
        floorMaterial.uniforms.uCycleProgress.value = cycle;
        roomMaterial.uniforms.uCycleProgress.value = cycle;
      } else {
        // Automatic cycling
        // Calculate cycle based on time: 0.0 to 1.0 and back
        const time = state.clock.getElapsedTime() * cycleSpeed;
        cycle = (Math.sin(time * 0.5) + 1.0) * 0.5; // Oscillate between 0 and 1
        floorMaterial.uniforms.uCycleProgress.value = cycle;
        roomMaterial.uniforms.uCycleProgress.value = cycle;
      }

      // Update the store instead of the window object
      setCycleValue(cycle);
    }
  });
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="cube_frame"
          castShadow
          receiveShadow
          geometry={nodes.cube_frame.geometry}
          material={roomMaterial}
          position={[-2.944, 4.411, 1.205]}
          rotation={[0, 0.191, -0.788]}
        >
          <CubeFrameAnimation />
        </mesh>

        <CoffeeSteam nodes={nodes} />

        <mesh
          name="photo_frame"
          castShadow
          receiveShadow
          geometry={nodes.photo_frame.geometry}
          material={roomMaterial}
          rotation={[0.01, -0.5, 0.005]}
        />
        <mesh
          name="chair_leg"
          castShadow
          receiveShadow
          geometry={nodes.chair_leg.geometry}
          material={roomMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="table"
          castShadow
          receiveShadow
          geometry={nodes.table.geometry}
          material={roomMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />

        <MonitorScreen />
        {/* <mesh
          name="monitor_screen"
          castShadow
          receiveShadow
          geometry={nodes.monitor_screen.geometry}
          material={nodes.monitor_screen.material}
          rotation={[0, -Math.PI / 4, -Math.PI / 2]}
          position={[-0.1, 0, 0]}
        /> */}

        <mesh
          name="walls_and_floors"
          castShadow
          receiveShadow
          geometry={nodes.walls_and_floors.geometry}
          material={roomMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="sofa"
          castShadow
          receiveShadow
          geometry={nodes.sofa.geometry}
          material={roomMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="telescope_scope"
          castShadow
          receiveShadow
          geometry={nodes.telescope_scope.geometry}
          material={roomMaterial}
          position={[4.235, 2.49, 0.303]}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="chair_top"
          castShadow
          receiveShadow
          geometry={nodes.chair_top.geometry}
          material={roomMaterial}
          position={[1.347, 1.19, -0.193]}
          rotation={[0, -Math.PI / 4, 0]}
        >
          <ChairAnimation />
        </mesh>
        <mesh
          name="caroke_machine"
          castShadow
          receiveShadow
          geometry={nodes.caroke_machine.geometry}
          material={roomMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="boxes_on_floor"
          castShadow
          receiveShadow
          geometry={nodes.boxes_on_floor.geometry}
          material={roomMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="floor_lamp"
          castShadow
          receiveShadow
          geometry={nodes.floor_lamp.geometry}
          material={roomMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="plant_pot"
          castShadow
          receiveShadow
          geometry={nodes.plant_pot.geometry}
          material={roomMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="telescope_stand"
          castShadow
          receiveShadow
          geometry={nodes.telescope_stand.geometry}
          material={roomMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="car"
          castShadow
          receiveShadow
          geometry={nodes.car.geometry}
          material={roomMaterial}
          rotation={[0.01, -0.5, 0.005]}
        />
        <mesh
          name="books_top_shelf"
          castShadow
          receiveShadow
          geometry={nodes.books_top_shelf.geometry}
          material={roomMaterial}
          rotation={[0.01, -0.5, 0.005]}
        />
        <mesh
          name="books_bottom_shelf"
          castShadow
          receiveShadow
          geometry={nodes.books_bottom_shelf.geometry}
          material={roomMaterial}
          rotation={[0.01, -0.5, 0.005]}
        />
        <mesh
          name="small_plant"
          castShadow
          receiveShadow
          geometry={nodes.small_plant.geometry}
          material={roomMaterial}
          rotation={[0.01, -0.5, 0.005]}
        />
        <mesh
          name="speaker_2"
          castShadow
          receiveShadow
          geometry={nodes.speaker_2.geometry}
          material={roomMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="speaker_1"
          castShadow
          receiveShadow
          geometry={nodes.speaker_1.geometry}
          material={roomMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="monitor_stand"
          castShadow
          receiveShadow
          geometry={nodes.monitor_stand.geometry}
          material={roomMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="monitor"
          castShadow
          receiveShadow
          geometry={nodes.monitor.geometry}
          material={roomMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="allen_drawer"
          castShadow
          receiveShadow
          geometry={nodes.allen_drawer.geometry}
          material={roomMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="pc"
          castShadow
          receiveShadow
          geometry={nodes.pc.geometry}
          material={roomMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="waste_bin"
          castShadow
          receiveShadow
          geometry={nodes.waste_bin.geometry}
          material={roomMaterial}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <CoffeeSteam nodes={nodes} />
        <mesh
          name="floor"
          castShadow
          receiveShadow
          geometry={nodes.floor.geometry}
          material={floorMaterial}
          rotation={[0, 0, 0]}
        />

        <mesh
          name="lightbar_desk"
          castShadow
          receiveShadow
          geometry={nodes.lightbar_desk.geometry}
          material={roomMaterial}
          position={[-1.472, 2.391, -3.288]}
          rotation={[0, -Math.PI / 4, -Math.PI / 2]}
        />
        <mesh
          name="Shelf_top"
          castShadow
          receiveShadow
          geometry={nodes.Shelf_top.geometry}
          material={roomMaterial}
          position={[-2.221, 7.387, 2.861]}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <mesh
          name="Shelf_bottom"
          castShadow
          receiveShadow
          geometry={nodes.Shelf_bottom.geometry}
          material={roomMaterial}
          position={[-2.221, 5.241, 2.861]}
          rotation={[0, -Math.PI / 4, 0]}
        />

        <mesh
          name="DJ_terminal_case001"
          castShadow
          receiveShadow
          geometry={nodes.DJ_terminal_case001.geometry}
          material={roomMaterial}
          position={[-0.462, 4.032, 3.962]}
          rotation={[0, -Math.PI / 4, 0]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("models/room_contents.glb");
