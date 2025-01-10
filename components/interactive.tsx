"use client"

import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Group, Vector3 } from 'three'
import { cn } from '@/lib/utils'

interface DailyItem {
  name: string
  position: [number, number, number]
  rotation: [number, number, number]
  modelPath: string
  scale: number
  hoverHeight: number
}

const dailyItems: DailyItem[] = [
  {
    name: "Gaming Controller",
    position: [-2, 0.5, 0], // Raised slightly above platform
    rotation: [0, 0, 0],
    modelPath: "/models/controller.glb",
    scale: 1,
    hoverHeight: 1.5
  },
  {
    name: "Laptop",
    position: [0, 0.5, 0],
    rotation: [0, 0, 0],
    modelPath: "/models/laptop.glb",
    scale: 1,
    hoverHeight: 1.5
  }
]

// Platform component that items rest on
const Platform = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[10, 5]} />
      <meshStandardMaterial color="#020817" />
    </mesh>
  )
}

const Model: React.FC<{ item: DailyItem }> = ({ item }) => {
  const { scene } = useGLTF(item.modelPath)
  const groupRef = useRef<Group>(null)
  const [isHovered, setIsHovered] = useState(false)
  const velocity = useRef(0)
  const targetY = useRef(item.position[1])

  useFrame((_, delta) => {
    if (!groupRef.current) return

    // Physics-based hover animation
    const gravity = 9.8
    const springStrength = 15
    const damping = 0.8

    // Calculate target Y position based on hover state
    const targetHeight = isHovered ? item.hoverHeight : item.position[1]
    const currentY = groupRef.current.position.y
    
    // Spring force
    const springForce = (targetHeight - currentY) * springStrength
    
    // Apply gravity when not hovering
    const gravityForce = !isHovered ? -gravity : 0
    
    // Update velocity with forces and damping
    velocity.current += (springForce + gravityForce) * delta
    velocity.current *= damping

    // Update position
    groupRef.current.position.y += velocity.current * delta
    
    // Gentle rotation
    groupRef.current.rotation.y += delta * 0.5
  })

  return (
    <group
      ref={groupRef}
      position={item.position}
      rotation={item.rotation}
      scale={item.scale}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <primitive object={scene.clone()} castShadow />
    </group>
  )
}

export function Interactive() {
  return (
    <section className="py-24">
      <div className="container">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Things I Use Daily
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={cn(
            "w-full h-[500px]",
            "bg-gradient-to-br from-primary/5 to-primary/10",
            "rounded-xl overflow-hidden"
          )}
        >
          <Canvas shadows>
            <color attach="background" args={['transparent']} />
            <PerspectiveCamera makeDefault position={[0, 2, 6]} />
            <OrbitControls
              enableZoom={false}
              minPolarAngle={Math.PI / 2.5}
              maxPolarAngle={Math.PI / 2}
            />
            
            {/* Lighting for better shadows and depth */}
            <ambientLight intensity={0.5} />
            <directionalLight
              position={[5, 5, 5]}
              intensity={1}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            >
              <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10, 0.1, 50]} />
            </directionalLight>

            {/* Platform */}
            <Platform />

            {/* Items */}
            {dailyItems.map((item, index) => (
              <Model key={index} item={item} />
            ))}
          </Canvas>
        </motion.div>
      </div>
    </section>
  )
}

// Preload all models
dailyItems.forEach(item => {
  useGLTF.preload(item.modelPath)
})