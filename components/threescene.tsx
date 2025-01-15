"use client"

import React, { useRef, useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { TypewriterEffect } from "./ui/typewriter-effect"

const MODELS = [
  '/models/optimized/controller.glb',
  '/models/optimized/headphones.glb',
  '/models/optimized/laptop.glb',
  '/models/optimized/basketball.glb',
  '/models/optimized/dumbell.glb'
]

const MODEL_DESCRIPTIONS = {
  'controller': [
    { text: "Gaming", className: "text-primary-foreground" },
    { text: "Controller:", className: "text-primary-foreground" },
    { text: "Perfect", className: "text-primary" },
    { text: "for", className: "text-primary-foreground" },
    { text: "immersive", className: "text-primary" },
    { text: "gameplay", className: "text-primary" }
  ],
  'headphones': [
    { text: "Premium", className: "text-primary" },
    { text: "Headphones:", className: "text-primary-foreground" },
    { text: "Crystal", className: "text-primary" },
    { text: "clear", className: "text-primary" },
    { text: "audio", className: "text-primary-foreground" }
  ],
  'laptop': [
    { text: "Powerful", className: "text-primary" },
    { text: "Laptop:", className: "text-primary-foreground" },
    { text: "Your", className: "text-primary-foreground" },
    { text: "portable", className: "text-primary" },
    { text: "workstation", className: "text-primary" }
  ],
  'basketball': [
    { text: "Basketball:", className: "text-primary-foreground" },
    { text: "Ready", className: "text-primary" },
    { text: "for", className: "text-primary-foreground" },
    { text: "the", className: "text-primary-foreground" },
    { text: "court", className: "text-primary" }
  ],
  'dumbell': [
    { text: "Dumbbell:", className: "text-primary-foreground" },
    { text: "Stay", className: "text-primary" },
    { text: "fit", className: "text-primary" },
    { text: "and", className: "text-primary-foreground" },
    { text: "strong", className: "text-primary" }
  ]
}

MODELS.forEach(path => useGLTF.preload(path))

interface Model3DProps {
  position: [number, number, number]
  rotation?: [number, number, number]
  modelPath: string
  scale?: number
  hitboxScale?: number
  onHover: (isHovered: boolean, modelName: string) => void
}

const Model3D = React.memo(({ 
  position, 
  rotation = [0, 0, 0], 
  modelPath, 
  scale = 1,
  hitboxScale = 2,
  onHover
}: Model3DProps) => {
  const { scene } = useGLTF(modelPath)
  const [isHovered, setIsHovered] = useState(false)
  const groupRef = useRef<THREE.Group>(null)
  const frameRef = useRef<number>(0)
  
  const positionY = useRef(position[1])
  const velocityY = useRef(0)
  const lastUpdateTime = useRef(performance.now())

  const modelName = modelPath.split('/').pop()?.split('.')[0] || ''

  // ... rest of the Model3D implementation remains the same ...
  
  return (
    <group
      ref={groupRef}
      position={position}
      rotation={[rotation[0], rotation[1], rotation[2]]}
    >
      <mesh
        onPointerOver={() => {
          setIsHovered(true)
          onHover(true, modelName)
        }}
        onPointerOut={() => {
          setIsHovered(false)
          onHover(false, modelName)
        }}
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
  const [hoveredModel, setHoveredModel] = useState<string | null>(null)
  const [showDescription, setShowDescription] = useState(false)

  const handleModelHover = (isHovered: boolean, modelName: string) => {
    if (isHovered) {
      setHoveredModel(modelName)
      setShowDescription(true)
    } else {
      setShowDescription(false)
      // Don't immediately clear hoveredModel to allow for fade-out animation
      setTimeout(() => {
        setHoveredModel(null)
      }, 500)
    }
  }

  return (
    <section className="w-full h-[650px] relative">
      <div className="absolute top-8 left-0 right-0 z-10">
        <AnimatePresence mode="wait">
          {hoveredModel && (
            <motion.div
              key={hoveredModel}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center gap-4"
            >
              <TypewriterEffect 
                words={MODEL_DESCRIPTIONS[hoveredModel as keyof typeof MODEL_DESCRIPTIONS]}
                className="text-2xl"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
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
            
            {/* Model3D components remain the same */}
            <Model3D 
              position={[-2.0, 0, -0.75]}
              rotation={[-Math.PI * 0.5, Math.PI * 1, -Math.PI * 0.09]} 
              modelPath="/models/optimized/controller.glb"
              scale={3}
              hitboxScale={2}
              onHover={handleModelHover}
            />
            <Model3D 
              position={[1.5, 0, -4.0]}
              rotation={[-Math.PI * 0.5, Math.PI * 0.5, 0]} 
              modelPath="/models/optimized/headphones.glb"
              scale={1}
              hitboxScale={3}
              onHover={handleModelHover}
            />
            <Model3D 
              position={[4.5, 0, 1.5]}
              rotation={[0, -Math.PI * 0.2, 0]}
              modelPath="/models/optimized/laptop.glb"
              scale={0.09}
              hitboxScale={2.0}
              onHover={handleModelHover}
            />
            <Model3D 
              position={[-5.5, 0, 0.5]}
              rotation={[Math.PI * 0.5, -Math.PI * 0.2, 0]}
              modelPath="/models/optimized/basketball.glb"
              scale={0.7}
              hitboxScale={1.5}
              onHover={handleModelHover}
            />
            <Model3D 
              position={[-0.5, 0, 4]}
              rotation={[0, Math.PI * 0.2, Math.PI * 0.5]}
              modelPath="/models/optimized/dumbell.glb"
              scale={0.4}
              hitboxScale={1.5}
              onHover={handleModelHover}
            />
          </Canvas>
        </Suspense>
      </div>
    </section>
  )
}