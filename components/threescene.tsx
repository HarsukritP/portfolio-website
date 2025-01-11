"use client"

import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

interface Model3DProps {
  position: [number, number, number]
  modelPath: string
  scale?: number
}

const Model3D = React.memo(({ position, modelPath, scale = 1 }: Model3DProps) => {
  const { scene } = useGLTF(modelPath)
  const [isHovered, setIsHovered] = useState(false)
  const groupRef = useRef<THREE.Group>(null)
  
  // Physics state
  const positionY = useRef(position[1])
  const velocityY = useRef(0)
  const rotationY = useRef(0)

  useFrame((_, delta) => {
    if (!groupRef.current) return

    // Constants
    const gravity = 9.81
    const springStrength = 80
    const damping = 4
    const restHeight = position[1]
    const maxHeight = position[1] + 1.0
    
    // Target height based on hover state
    const targetHeight = isHovered ? maxHeight : restHeight
    
    // Calculate spring force (F = -kx)
    const displacement = positionY.current - targetHeight
    const springForce = -springStrength * displacement
    
    // Calculate total force including gravity when falling
    const gravityForce = isHovered ? 0 : -gravity
    const totalForce = springForce + gravityForce
    
    // Euler integration
    // Update velocity (F = ma, assume mass = 1)
    velocityY.current += totalForce * delta
    // Apply damping
    velocityY.current *= (1 - damping * delta)
    // Update position
    positionY.current += velocityY.current * delta
    
    // Apply position
    groupRef.current.position.set(position[0], positionY.current, position[2])

    // Gentle self-rotation that stays in place
    rotationY.current += delta * 0.5
    groupRef.current.rotation.y = rotationY.current
  })

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <primitive object={scene.clone()} scale={scale} />
    </group>
  )
})

Model3D.displayName = 'Model3D'

const Platform = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
      <planeGeometry args={[16, 8]} />
      <meshStandardMaterial 
        color="#020817"
        transparent
        opacity={0.05}
      />
    </mesh>
  )
}

export function ThreeScene() {
  return (
    <section className="w-full h-[600px]">
      <div className="w-full h-full bg-background">
        <Suspense fallback={
          <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">
            Loading models...
          </div>
        }>
          <Canvas 
            shadows 
            camera={{ 
              position: [0, 4, 8],
              fov: 50,
              // Lock camera rotation by removing this
              // rotation: [-0.3, 0, 0]
            }}
            dpr={[1, 2]}
          >
            <color attach="background" args={['#020817']} />
            
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[5, 5, 5]}
              intensity={0.8}
              castShadow
            />

            <Platform />
            
            <Model3D 
              position={[-4, 0.5, -1]}
              modelPath="/models/controller.glb"
              scale={2.0}
            />
            <Model3D 
              position={[-1.5, 0.5, -0.5]}
              modelPath="/models/headphones.glb"
              scale={0.6}
            />
            <Model3D 
              position={[1.5, 0.5, -0.5]}
              modelPath="/models/laptop.glb"
              scale={0.09}
            />
            <Model3D 
              position={[4, 0.5, -1]}
              modelPath="/models/basketball.glb"
              scale={0.6}
            />
          </Canvas>
        </Suspense>
      </div>
    </section>
  )
}