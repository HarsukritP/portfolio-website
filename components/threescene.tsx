"use client"

import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface Model3DProps {
  position: [number, number, number]
  modelPath: string
  scale?: number
}

const Model3D = ({ position, modelPath, scale = 1 }: Model3DProps) => {
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
}

const calculateCircularPosition = (index: number, total: number, radius: number): [number, number, number] => {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
  const x = Math.cos(angle) * radius * 1.5
  const z = Math.sin(angle) * radius
  return [x, 0.5, z]
}

const Platform = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
      <planeGeometry args={[15, 8]} />
      <meshStandardMaterial 
        color="#020817"
        transparent
        opacity={0.7}
      />
    </mesh>
  )
}

const ThreeScene = () => {
  const totalItems = 4
  const radius = 3.5

  return (
    <section className="min-h-[90vh] py-12">
      <div className="container h-full">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-8"
        >
          Things I Use Daily
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={cn(
            "w-full h-[80vh]",
            "bg-gradient-to-br from-primary/5 to-primary/10",
            "rounded-xl overflow-hidden"
          )}
        >
          <Canvas 
            shadows 
            camera={{ position: [0, 3, 6], fov: 75 }}
            style={{ background: 'transparent' }}
          >
            <color attach="background" args={['#020817']} />
            
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
        </motion.div>
      </div>
    </section>
  )
}

export default ThreeScene

// Preload all models
const models = [
  '/models/controller.glb',
  '/models/headphones.glb',
  '/models/laptop.glb',
  '/models/basketball.glb'
]
models.forEach(path => useGLTF.preload(path))