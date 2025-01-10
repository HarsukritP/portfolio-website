"use client"

import React, { useRef, useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { cn } from '@/lib/utils'

// Preload models immediately
const models = [
  '/models/controller.glb',
  '/models/headphones.glb',
  '/models/laptop.glb',
  '/models/basketball.glb'
].map(path => useGLTF.preload(path))

interface Model3DProps {
  position: [number, number, number]
  modelPath: string
  scale?: number
}

const calculateCircularPosition = (index: number, total: number, radius: number): [number, number, number] => {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
  const x = Math.cos(angle) * radius * 1.5
  const z = Math.sin(angle) * radius
  return [x, 0.5, z]
}

// Optimized Model3D component with instance reuse
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

  // Reuse the same scene instance
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.add(scene.clone())
    }
  }, [scene])

  return (
    <group
      ref={groupRef}
      position={position}
      scale={scale}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    />
  )
})

Model3D.displayName = 'Model3D'

const LoadingScreen = () => (
  <div className="absolute bottom-4 right-4 text-sm text-muted-foreground">
    Loading 3D models...
  </div>
)

const Platform = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
      <planeGeometry args={[50, 25]} />
      <meshStandardMaterial 
        color="#020817"
        transparent
        opacity={0.1}
      />
    </mesh>
  )
}

const ThreeScene = () => {
  const totalItems = 4
  const radius = 5

  return (
    <section className="w-full min-h-screen bg-background">
      <div className="w-screen h-[800px] bg-background border border-dashed border-primary/20"> {/* Debug outline */}
        <Suspense fallback={<LoadingScreen />}>
          <Canvas 
            shadows 
            camera={{ position: [0, 4, 8], fov: 75 }}
            // Performance optimizations
            dpr={[1, 2]} // Limit pixel ratio
            performance={{ min: 0.5 }} // Allow frame drops for better performance
          >
            <color attach="background" args={['#020817']} />
            
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[5, 5, 5]}
              intensity={0.8}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            >
              <orthographicCamera attach="shadow-camera" args={[-25, 25, -25, 25, 0.1, 50]} />
            </directionalLight>

            <Platform />
            
            <Model3D 
              position={calculateCircularPosition(0, totalItems, radius)}
              modelPath="/models/controller.glb"
              scale={1.5}
            />
            <Model3D 
              position={calculateCircularPosition(1, totalItems, radius)}
              modelPath="/models/headphones.glb"
              scale={1.5}
            />
            <Model3D 
              position={calculateCircularPosition(2, totalItems, radius)}
              modelPath="/models/laptop.glb"
              scale={0.5}
            />
            <Model3D 
              position={calculateCircularPosition(3, totalItems, radius)}
              modelPath="/models/basketball.glb"
              scale={1.3}
            />

            <OrbitControls
              enableZoom={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 2.5}
              minAzimuthAngle={-Math.PI / 4}
              maxAzimuthAngle={Math.PI / 4}
            />
          </Canvas>
        </Suspense>
      </div>
    </section>
  )
}

export default ThreeScene