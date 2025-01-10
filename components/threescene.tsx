"use client"

import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

interface ItemProps {
  position: [number, number, number]
  modelPath?: string
  color?: string
}

// Controller with actual GLB model
function Controller({ position }: ItemProps) {
  const { scene } = useGLTF('/models/controller.glb')
  const [isHovered, setIsHovered] = useState(false)
  const groupRef = useRef<THREE.Group>(null)
  const velocity = useRef(0)

  useFrame((_, delta) => {
    if (!groupRef.current) return

    // Physics-based hover animation
    const gravity = 9.8
    const springStrength = 15
    const damping = 0.8
    const targetHeight = isHovered ? 1.5 : 0.5
    const currentY = groupRef.current.position.y

    // Spring force calculation
    const springForce = (targetHeight - currentY) * springStrength
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
      position={position}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <primitive object={scene.clone()} scale={1.5} />
    </group>
  )
}

// Placeholder components until models are added
function Headphones({ position, color = "#3b82f6" }: ItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const groupRef = useRef<THREE.Group>(null)
  const velocity = useRef(0)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    // Same physics as controller
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
      {/* Temporary headphones shape */}
      <mesh castShadow>
        <torusGeometry args={[0.5, 0.1, 16, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  )
}

function Books({ position, color = "#22c55e" }: ItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const groupRef = useRef<THREE.Group>(null)
  const velocity = useRef(0)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    // Same physics as others
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
      {/* Stack of books representation */}
      <group>
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[0.8, 0.2, 0.6]} />
          <meshStandardMaterial color={color} />
        </mesh>
        <mesh castShadow position={[0, 0.2, 0]}>
          <boxGeometry args={[0.7, 0.2, 0.6]} />
          <meshStandardMaterial color={color} />
        </mesh>
        <mesh castShadow position={[0, 0.4, 0]}>
          <boxGeometry args={[0.9, 0.2, 0.6]} />
          <meshStandardMaterial color={color} />
        </mesh>
      </group>
    </group>
  )
}

const Platform = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
      <planeGeometry args={[10, 5]} />
      <meshStandardMaterial color="#020817" />
    </mesh>
  )
}

const ThreeScene = () => {
  return (
    <Canvas shadows camera={{ position: [0, 2, 5], fov: 75 }}>
      <color attach="background" args={['transparent']} />
      
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
      <Controller position={[-2, 0.5, 0]} />
      <Headphones position={[0, 0.5, 0]} />
      <Books position={[2, 0.5, 0]} />

      <OrbitControls
        enableZoom={false}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  )
}

export default ThreeScene

// Preload the controller model
useGLTF.preload('/models/controller.glb')