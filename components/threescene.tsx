"use client"

import React, { useRef, useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from "next-themes"

const MODELS = [
  '/models/optimized/controller.glb',
  '/models/optimized/headphones.glb',
  '/models/optimized/laptop.glb',
  '/models/optimized/basketball.glb',
  '/models/optimized/dumbell.glb'
]

MODELS.forEach(path => useGLTF.preload(path))

interface Model3DProps {
  position: [number, number, number]
  rotation?: [number, number, number]
  modelPath: string
  scale?: number
  hitboxScale?: number
}

const Model3D = React.memo(({ 
  position, 
  rotation = [0, 0, 0], 
  modelPath, 
  scale = 1,
  hitboxScale = 2
}: Model3DProps) => {
  const { scene } = useGLTF(modelPath)
  const [isHovered, setIsHovered] = useState(false)
  const groupRef = useRef<THREE.Group>(null)
  const frameRef = useRef<number>(0)
  
  const positionY = useRef(position[1])
  const velocityY = useRef(0)
  const lastUpdateTime = useRef(performance.now())

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        positionY.current = position[1]
        velocityY.current = 0
        lastUpdateTime.current = performance.now()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [position])

  useFrame((_, delta) => {
    if (!groupRef.current) return

    const maxDelta = Math.min(delta, 1 / 30)
    
    const gravity = 15
    const springStrength = 40
    const damping = 0.7
    const restHeight = position[1]
    const maxHeight = position[1] + 1.3
    const groundLevel = position[1]
    
    const targetHeight = isHovered ? maxHeight : restHeight
    const displacement = positionY.current - targetHeight
    const springForce = -springStrength * displacement
    const gravityForce = isHovered ? 0 : -gravity
    const totalForce = springForce + gravityForce
    
    velocityY.current += totalForce * (maxDelta * 0.7)
    velocityY.current *= (1 - damping * maxDelta)
    positionY.current += velocityY.current * maxDelta
    
    if (positionY.current < groundLevel) {
      positionY.current = groundLevel
      velocityY.current = Math.abs(velocityY.current) * 0.3
      
    }
    
    groupRef.current.position.set(position[0], positionY.current, position[2])
    groupRef.current.rotation.set(rotation[0], rotation[1], rotation[2])

    frameRef.current = requestAnimationFrame(() => {
      lastUpdateTime.current = performance.now()
    })
  })

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={[rotation[0], rotation[1], rotation[2]]}
    >
      <mesh
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
        visible={false}
      >
        <boxGeometry args={[1.5 * hitboxScale, 1.5 * hitboxScale, 1.5 * hitboxScale]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <primitive object={scene.clone()} scale={scale} />
    </group>
  )
})

Model3D.displayName = 'Model3D'

export function ThreeScene() {
  const { theme } = useTheme()
  const backgroundColor = theme === "light" ? "#FFF6EB" : "#1C1E21"

  return (
    <section className="w-full h-[650px]">
      <div className="w-full h-full bg-background">
        <Suspense fallback={null}>
          <Canvas 
            color="background"
            shadows={false}
            camera={{ 
              position: [0, 4, 10],
              fov: 50
            }}
            dpr={[1, 2]}
            performance={{ min: 0.5 }}
          >
            <color attach="background" args={[backgroundColor]} />
            
            <ambientLight intensity={0.9} />
            <directionalLight
              position={[5, 5, 5]}
              intensity={5}
            />
            
            <Model3D 
              position={[-2.0, 0, -0.75]}
              rotation={[-Math.PI * 0.5, Math.PI * 1, -Math.PI * 0.09]} 
              modelPath="/models/optimized/controller.glb"
              scale={3}
              hitboxScale={2}
            />
            <Model3D 
              position={[1.5, 0, -4.0]}
              rotation={[-Math.PI * 0.5, Math.PI * 0.5, 0]} 
              modelPath="/models/optimized/headphones.glb"
              scale={1}
              hitboxScale={3}
            />
            <Model3D 
              position={[4.5, 0, 1.5]}
              rotation={[0, -Math.PI * 0.2, 0]}
              modelPath="/models/optimized/laptop.glb"
              scale={0.09}
              hitboxScale={2.0}
            />
            <Model3D 
              position={[-5.5, 0, 0.5]}
              rotation={[Math.PI * 0.5, -Math.PI * 0.2, 0]}
              modelPath="/models/optimized/basketball.glb"
              scale={0.7}
              hitboxScale={1.5}
            />
            <Model3D 
              position={[-0.5, 0, 4]}
              rotation={[0, Math.PI * 0.2, Math.PI * 0.5]}
              modelPath="/models/optimized/dumbell.glb"
              scale={0.4}
              hitboxScale={1.5}
            />
          </Canvas>
        </Suspense>
      </div>
    </section>
  )
}