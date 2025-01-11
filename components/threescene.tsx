"use client"

import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

interface Model3DProps {
  position: [number, number, number]
  rotation?: [number, number, number] // Added rotation parameter
  modelPath: string
  scale?: number
}

const Model3D = React.memo(({ position, rotation = [0, 0, 0], modelPath, scale = 1 }: Model3DProps) => {
  const { scene } = useGLTF(modelPath)
  const [isHovered, setIsHovered] = useState(false)
  const groupRef = useRef<THREE.Group>(null)
  
  const positionY = useRef(position[1])
  const velocityY = useRef(0)

  useFrame((_, delta) => {
    if (!groupRef.current) return

    const gravity = 15
    const springStrength = 40
    const damping = 0.7
    const restHeight = position[1]
    const maxHeight = position[1] + 2.0
    const groundLevel = position[1]
    
    const targetHeight = isHovered ? maxHeight : restHeight
    const displacement = positionY.current - targetHeight
    const springForce = -springStrength * displacement
    const gravityForce = isHovered ? 0 : -gravity
    const totalForce = springForce + gravityForce
    
    velocityY.current += totalForce * (delta * 0.7)
    velocityY.current *= (1 - damping * delta)
    positionY.current += velocityY.current * delta
    
    if (positionY.current < groundLevel) {
      positionY.current = groundLevel
      velocityY.current = Math.abs(velocityY.current) * 0.3
    }
    
    // Apply position while maintaining set rotation
    groupRef.current.position.set(position[0], positionY.current, position[2])
    groupRef.current.rotation.set(rotation[0], rotation[1], rotation[2])
  })

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={[rotation[0], rotation[1], rotation[2]]}
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
              fov: 50
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
              rotation={[0, Math.PI * 0.1, 0]} // Slight turn right
              modelPath="/models/controller.glb"
              scale={2.0}
            />
            <Model3D 
              position={[-1.5, 0.5, -0.5]}
              rotation={[0, -Math.PI * 0.2, 0]} // Turn left
              modelPath="/models/headphones.glb"
              scale={0.6}
            />
            <Model3D 
              position={[1.5, 0.5, -0.5]}
              rotation={[0, Math.PI * 0.8, 0]} // Face forward-right
              modelPath="/models/laptop.glb"
              scale={0.09}
            />
            <Model3D 
              position={[4, 0.5, -1]}
              rotation={[0, -Math.PI * 0.1, 0]} // Slight turn left
              modelPath="/models/basketball.glb"
              scale={0.6}
            />
          </Canvas>
        </Suspense>
      </div>
    </section>
  )
}