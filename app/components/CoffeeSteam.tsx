'use client'

import * as THREE from 'three'
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

const vertexShader = `
varying vec2 vUv;
void main()
{
    vec4 modelPosotion = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosotion;
    vec4 projectionPosition =  projectionMatrix * viewPosition;
    gl_Position = projectionPosition;

    vUv = uv;
}`

const fragmentShader = `
varying vec2 vUv;
uniform vec2 vUvFrequency;
uniform float uTime;
uniform float uTimeFrequency;

//	Classic Perlin 2D Noise 
//	by Stefan Gustavson
//
vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}

float perlin2d(vec2 P){
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 * 
    vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

void main()
{
    vec2 uv = vUv * vUvFrequency;
    
    // Increased animation speed (from 0.0009 to 0.05)
    uv.y += uTime * 0.05;
    
    // Add some horizontal movement
    uv.x += sin(uTime * 0.3) * 0.1;

    float borderAlpha = min(vUv.y * 3.0, (1.0 - vUv.y) * 3.0);
    borderAlpha = borderAlpha * (vUv.x);

    float perlin = perlin2d(uv);
    perlin *= borderAlpha;
    
    // Make the steam more visible
    gl_FragColor = vec4(1.0, 1.0, 1.0, perlin * 0.9);
}
`

interface CoffeeSteamProps {
    nodes: {
        coffee_steam: THREE.Mesh
    }
}

export default function CoffeeSteam({ nodes }: CoffeeSteamProps) {
    const materialRef = useRef<THREE.ShaderMaterial>(null)
    const meshRef = useRef<THREE.Mesh>(null)
    
    // Define uniforms with appropriate values for animation
    const uniforms = {
        uTime: { value: 0 },
        uTimeFrequency: { value: 1.0 }, // Not used directly in the shader now
        vUvFrequency: { value: new THREE.Vector2(4.0, 5.0) } // Controls the density of the noise
    }

    // Make sure the mesh has the right material properties
    useEffect(() => {
        if (meshRef.current && materialRef.current) {
            // Ensure the mesh is visible
            meshRef.current.visible = true;
            
            // Make sure material settings are applied
            materialRef.current.transparent = true;
            materialRef.current.depthWrite = false;
            materialRef.current.blending = THREE.AdditiveBlending;
            
            // Force a material update
            materialRef.current.needsUpdate = true;
        }
    }, []);

    // Update the time uniform on each frame
    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
            materialRef.current.needsUpdate = true;
        }
    })

    // Check if the node exists before rendering
    if (!nodes.coffee_steam) {
        console.error("Coffee steam node not found in the model");
        return null;
    }

    return (
        <mesh
            ref={meshRef}
            name="coffee_steam"
            geometry={nodes.coffee_steam.geometry}
            position={nodes.coffee_steam.position}
            rotation={nodes.coffee_steam.rotation}
            scale={nodes.coffee_steam.scale}
        >
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    )
}
