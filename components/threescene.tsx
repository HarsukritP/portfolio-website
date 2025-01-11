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
  const velocity = useRef(0)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const gravity = 9.8
    const springStrength = 15
    const damping = 0.8
    const targetHeight = isHovered ? 1.5 : 0.5
    const currentY = groupRef.current.position.y
    
    const springForce = (targetHeight - currentY) * springStrength
    const gravityForce = !isHovered ? -gravity : 0
    
    velocity.current += (springForce + gravityForce) * delta
    velocity.current *= damping
    
    groupRef.current.position.y += velocity.current * delta
    groupRef.current.rotation.y += delta * 0.5
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
              rotation: [-0.3, 0, 0]
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
              scale={1.5}
            />
            <Model3D 
              position={[-1.5, 0.5, -0.5]}
              modelPath="/models/headphones.glb"
              scale={1.5}
            />
            <Model3D 
              position={[1.5, 0.5, -0.5]}
              modelPath="/models/laptop.glb"
              scale={0.5}
            />
            <Model3D 
              position={[4, 0.5, -1]}
              modelPath="/models/basketball.glb"
              scale={1.3}
            />
          </Canvas>
        </Suspense>
      </div>
    </section>
  )
}