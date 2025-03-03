'use client'

import * as THREE from 'three'
import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useControls, folder } from 'leva'

const clockDigitVertexShader = `
   varying vec3 vNormal;
varying vec3 vPositionNormal;



varying vec4 vFragColor;


varying vec2 vUv;
void main()
{

    vNormal = normalize( normalMatrix * normal ); // 转换到视图空间
    vPositionNormal = normalize(( modelViewMatrix * vec4(position, 1.0) ).xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );


    // vec4 modelPosotion = modelMatrix * vec4(position, 1.0);
    // vec4 viewPosition = viewMatrix * modelPosotion;
    // vec4 projectionPosition =  projectionMatrix * viewPosition;
    // gl_Position = projectionPosition;

    vUv = uv;
}
`

const clockDigitFragmentShader = `
  // #pragma glslify: blend = require(glsl-blend/add)

uniform vec3 glowColor;
uniform float b;
uniform float p;
uniform float s;
varying vec3 vNormal;
varying vec3 vPositionNormal;




// uniform sampler2D uTexture;

varying vec2 vUv;


// #pragma glslify: blend = require(glsl-blend/lighten)
// #pragma glslify: blend = require(glsl-blend/normal)
// #pragma glslify: blend = require(glsl-blend/screen)


void main()
{
    // vec3 worldCameraToVertex= vVertexWorldPosition - cameraPosition;
    // vec3 viewCameraToVertex	= (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;
    // viewCameraToVertex	= normalize(viewCameraToVertex);
    // float intensity		= pow(coeficient + dot(vVertexNormal, viewCameraToVertex), power);
    // gl_FragColor		= vec4(glowColor, 1.0);
    // vec3 bubbleMask = texture2D(uTexture, vUv).rgb;
    // float a = pow( b + s * abs(dot(vNormal, vPositionNormal)), p );
    // vec3 finalColor = mix(glowColor, bubbleMask, 0.5);

    // Chat GPT code
    vec2 st = gl_FragCoord.xy / vUv;
    vec3 color = vec3(1.0, 0.9, 0.9);
    float radius = 0.3;
    float intensity = 0.7;
    float distance = distance(st, vec2(0.5, 0.5));
    float glow = intensity / pow(distance, radius);
    gl_FragColor = vec4(color , 1.0);

    // gl_FragColor = vec4( glowColor, 1.0 );
}
`

const clockBackgroundVertexShader = `
  varying vec3 vNormal;
varying vec3 vPositionNormal;


varying vec2 vUv;
void main()
{


    vNormal = normalize( normalMatrix * normal ); // 转换到视图空间
    vPositionNormal = normalize(( modelViewMatrix * vec4(position, 1.0) ).xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

   

    // vec4 modelPosotion = modelMatrix * vec4(position, 1.0);
    // vec4 viewPosition = viewMatrix * modelPosotion;
    // vec4 projectionPosition =  projectionMatrix * viewPosition;
    // gl_Position = projectionPosition;

    vUv = uv;
}
`

const clockBackgroundFragmentShader = `
  #define SMOOTH 1
#define PI 3.14


uniform float b;
uniform float p;
uniform float s;
uniform float uTime;
varying vec3 vNormal;
varying vec3 vPositionNormal;




varying vec2 vUv;

// #pragma glslify: blend = require(glsl-blend/add)
// #pragma glslify: blend = require(glsl-blend/lighten)
// #pragma glslify: blend = require(glsl-blend/normal)
// #pragma glslify: blend = require(glsl-blend/screen)

vec2 rotateUV(vec2 uv, float rotation)
{
    float mid = 0.5;
    float cosAngle = cos(rotation);
    float sinAngle = sin(rotation);
    return vec2(
        cosAngle * (uv.x - mid) + sinAngle * (uv.y - mid) + mid,
        cosAngle * (uv.y - mid) - sinAngle * (uv.x - mid) + mid
    );
}

vec3 rainbow(float level)
{
	/*
		Target colors
		=============
		
		L  x   color
		0  0.0 vec4(1.0, 0.0, 0.0, 1.0);
		1  0.2 vec4(1.0, 0.5, 0.0, 1.0);
		2  0.4 vec4(1.0, 1.0, 0.0, 1.0);
		3  0.6 vec4(0.0, 0.5, 0.0, 1.0);
		4  0.8 vec4(0.0, 0.0, 1.0, 1.0);
		5  1.0 vec4(0.5, 0.0, 0.5, 1.0);
	*/
  
	
	float r = float(level <= 2.0) + float(level > 4.0) * 0.5;
	float g = max(1.0 - abs(level - 2.0) * 0.5, 0.0);
	float b = (1.0 - (level - 4.0) * 0.5) * float(level >= 4.0);
	return vec3(r, g, b);
}


vec3 smoothRainbow (float x)
{
    float level1 = floor(x*6.0);
    
    float level2 = min(6.0, floor(x*6.0) + 1.0);
    
    vec3 a = rainbow(level1);
    vec3 b = rainbow(level2);
    
    return mix(a, b, fract(x*6.0));
}


void main()
{

    
    float a = pow( b + s * abs(dot(vNormal, vPositionNormal)), p );

    

    // vec2 uv = fragCoord.xy / iResolution.xy;
   
    // vUv.x += sin
    
    float interval = 20.0;
    // float p = clamp(vUv.x + sin(2.0*3.1415 * uTime / interval), 0.0, 1.0);
    // float p = clamp((vUv.x - 0.5) + sin( 2.0 * 3.1415 * uTime / interval), 0.0, 1.0);

    rotateUV(vUv, 1.0);
    float p = (vUv.x / 1.5 ) + ((sin(uTime / interval) - 1.0) * 0.5);

    // float sinF = sin(u_time) * 0.5 + 0.5;

    vec3 pct = vec3(p);
    // smoothstep

    #if SMOOTH
    vec3 color = smoothRainbow(pct.x);
    #else
    vec3 color = rainbow(floor(pct.x*6.0));
    #endif


    
    // if(vUv.y > .1)
    //     gl_FragColor = vec4(.5*cos(6.283*(vUv.x+vec3(0.,-.33333,.33333)))+.5,1.0);
    // else
    // 	gl_FragColor = vec4(smoothRainbow(vUv.x),1.);
    
	// fragColor = vec4(color,1.0);
    // vec4 finalColor = vec4(mix(color3,color2 , vUv.x), pct);
    
    

    gl_FragColor = vec4( color, 0.5 );
}
`

interface BubbleClockProps {
    nodes: {
        bubble_clock_extra_bubbles: THREE.Mesh
        [key: string]: THREE.Mesh | any  // For dynamic node names
    }
}

export default function BubbleClock({ nodes }: BubbleClockProps) {
    const [counter, setCounter] = useState(0)
    const clockSegmentMaterial = useRef<THREE.ShaderMaterial>(null)
    const clockBackgroundMaterial = useRef<THREE.ShaderMaterial>(null)
    const clockSecondsMaterial = useRef<THREE.ShaderMaterial>(null)

    // Add controls for shader parameters
    const shaderControls = useControls('Clock Shader', {
        parameters: folder({
            glowIntensity: { value: 1.0, min: 0, max: 2, step: 0.1 },
            glowPower: { value: 2.0, min: 0, max: 5, step: 0.1 },
            glowColor: { value: '#ffffff' },
            secondsColor: { value: '#ff5500' },
            timeFrequency: { value: 0.5, min: 0, max: 2, step: 0.1 }
        })
    })

    // Organize nodes into categories
    const clockNodes = {
        hrTens: Object.fromEntries(Object.entries(nodes).filter(([key]) => key.startsWith('hrtens_segment'))),
        hrUnits: Object.fromEntries(Object.entries(nodes).filter(([key]) => key.startsWith('hrunits_segment'))),
        minTens: Object.fromEntries(Object.entries(nodes).filter(([key]) => key.startsWith('mintens_segment'))),
        minUnits: Object.fromEntries(Object.entries(nodes).filter(([key]) => key.startsWith('minunits_segment'))),
        dots: Object.fromEntries(Object.entries(nodes).filter(([key]) => key.startsWith('segmentsec')))
    }

    // Create materials with controls
    useEffect(() => {
        // Active digit segments material
        clockSegmentMaterial.current = new THREE.ShaderMaterial({
            uniforms: {
                s: { value: -1.0 },
                b: { value: shaderControls.glowIntensity },
                p: { value: shaderControls.glowPower },
                glowColor: { value: new THREE.Color(shaderControls.glowColor) }
            },
            vertexShader: clockDigitVertexShader,
            fragmentShader: clockDigitFragmentShader,
            transparent: true
        })

        // Seconds indicator material
        clockSecondsMaterial.current = new THREE.ShaderMaterial({
            uniforms: {
                s: { value: -1.0 },
                b: { value: shaderControls.glowIntensity * 1.2 },
                p: { value: shaderControls.glowPower },
                glowColor: { value: new THREE.Color(shaderControls.secondsColor) }
            },
            vertexShader: clockDigitVertexShader,
            fragmentShader: clockDigitFragmentShader,
            transparent: true
        })

        // Background rainbow material
        clockBackgroundMaterial.current = new THREE.ShaderMaterial({
            uniforms: {
                s: { value: -1.0 },
                b: { value: shaderControls.glowIntensity },
                p: { value: shaderControls.glowPower },
                glowColor: { value: new THREE.Color(shaderControls.glowColor) },
                uTime: { value: 0 }
            },
            vertexShader: clockBackgroundVertexShader,
            fragmentShader: clockBackgroundFragmentShader,
            transparent: true
        })
    }, [shaderControls])

    // Get current time
    const getDateTime = () => {
        const now = new Date()
        const hour = now.getHours().toString().padStart(2, '0')
        const minute = now.getMinutes().toString().padStart(2, '0')
        const second = now.getSeconds().toString().padStart(2, '0')
        return hour + minute + second
    }

    // Update clock segments
    const updateClock = (currentTime: string) => {
        if (!clockSegmentMaterial.current || !clockBackgroundMaterial.current || !clockSecondsMaterial.current) return

        // console.log("Current time:", currentTime);
        
        // First reset all segments to background material
        Object.values(clockNodes).forEach(group => {
            Object.values(group).forEach(node => {
                if (node && node.material) {
                    node.material = clockBackgroundMaterial.current
                }
            })
        })

        // Set extra bubbles to background material
        if (nodes.bubble_clock_extra_bubbles) {
            nodes.bubble_clock_extra_bubbles.material = clockBackgroundMaterial.current
        }

        // Set seconds indicator to seconds material
        Object.values(clockNodes.dots).forEach(node => {
            node.material = clockSecondsMaterial.current
        })

        // Apply the original logic from the blueprint
        // Hour tens
        Object.entries(clockNodes.hrTens).forEach(([key, node]) => {
            if (key.includes("s" + currentTime.charAt(0))) {
                node.material = clockSegmentMaterial.current
            }
        })

        // Hour units
        Object.entries(clockNodes.hrUnits).forEach(([key, node]) => {
            if (key.includes("s" + currentTime.charAt(1))) {
                node.material = clockSegmentMaterial.current
            }
        })

        // Minute tens
        Object.entries(clockNodes.minTens).forEach(([key, node]) => {
            if (key.includes("s" + currentTime.charAt(2))) {
                node.material = clockSegmentMaterial.current
            }
        })

        // Minute units
        Object.entries(clockNodes.minUnits).forEach(([key, node]) => {
            if (key.includes("s" + currentTime.charAt(3))) {
                node.material = clockSegmentMaterial.current
            }
        })
    }

    // Animation loop
    useFrame((state) => {
        if (!clockBackgroundMaterial.current) return

        // Update rainbow animation time
        clockBackgroundMaterial.current.uniforms.uTime.value += 0.01 * shaderControls.timeFrequency
        
        // Update clock every second
        setCounter(prev => {
            if (prev >= 60) {
                updateClock(getDateTime())
                return 0
            }
            return prev + 1
        })
    })

    // Initial setup
    useEffect(() => {
        if (clockSegmentMaterial.current && clockBackgroundMaterial.current && clockSecondsMaterial.current) {
            updateClock(getDateTime())
        }
    }, [clockSegmentMaterial.current, clockBackgroundMaterial.current, clockSecondsMaterial.current])

    return (
        <group>
            {/* Render all segments with appropriate materials */}
            {Object.entries(clockNodes).flatMap(([groupKey, group]) => 
                Object.entries(group).map(([key, node]) => (
                    <mesh
                        key={key}
                        name={key}
                        castShadow
                        receiveShadow
                        geometry={node.geometry}
                        material={clockBackgroundMaterial.current}
                        rotation={[0, -Math.PI / 4, 0]}
                    />
                ))
            )}
            
            {/* Render extra bubbles background */}
            {nodes.bubble_clock_extra_bubbles && (
                <mesh
                    name="bubble_clock_extra_bubbles"
                    castShadow
                    receiveShadow
                    geometry={nodes.bubble_clock_extra_bubbles.geometry}
                    material={clockBackgroundMaterial.current}
                    rotation={[0, -Math.PI / 4, 0]}
                />
            )}
        </group>
    )
}
