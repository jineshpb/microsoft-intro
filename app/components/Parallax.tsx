'use client'

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

// This component adds cursor-based movement to the scene
export default function Parallax({ intensity = 0.09 }) {
    const { camera } = useThree();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const initialPositionRef = useRef<{ x: number; y: number; z: number; } | null>(null);
    
    // Store initial camera position
    useEffect(() => {
      if (!initialPositionRef.current && camera) {
        initialPositionRef.current = {
          x: camera.position.x,
          y: camera.position.y,
          z: camera.position.z
        };
      }
    }, [camera]);
    
    // Track mouse movement
    useEffect(() => {
      const handleMouseMove = (event: MouseEvent) => {
        // Convert mouse position to normalized coordinates (-1 to 1)
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        setMousePosition({ x, y });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, []);
    
    // Apply subtle movement based on mouse position
    useFrame(() => {
      if (initialPositionRef.current && camera) {
        // Apply subtle movement based on mouse position
        camera.position.x = initialPositionRef.current.x + mousePosition.x * intensity;
        camera.position.y = initialPositionRef.current.y + mousePosition.y * intensity;
        
        // Update camera
        camera.updateProjectionMatrix();
      }
    });
    
    return null;
  }