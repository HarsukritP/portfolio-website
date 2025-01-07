"use client"

import React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface Experience {
  title: string
  description: string
  icon: React.ReactNode
}

const experiences: Experience[] = [
  { 
    title: "Programming Instructor @ Code Ninjas",
    description: "Worked with a team to teach game development, robotics and programming fundamentals with propietary platforms such as Unity, MakeCode, and VSCode to 200+ students of various ages.",
    icon: "💻"
  },
  { 
    title: "Financial Officer @ WilderCare",
    description: "Worked with 9 partners to help found a non-profit to support the Oakville Milton Humane Society through bracelet sales, social media and our React-based website.",
    icon: "💰"
  },
  { 
    title: "Firmware Developer @ Orbit Robotics",
    description: "Developed firmware for our team robot, by using WPILib, Java and GitHub to compete in the FIRST Robotics Competition at a Regional Level.",
    icon: "🤖"
  },
  { 
    title: "Sponsorships Chair @ TEDxIroquoisRidgeHS",
    description: "Spearheaded communications with sponsors, venue staff and more to organize a TED talk for 200+ guests and secured over $500 in funding.",
    icon: "🗣️"
  }
]

const TiltCard: React.FC<{ experience: Experience }> = ({ experience }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    
    const width = rect.width
    const height = rect.height
    
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl p-6 shadow-lg"
    >
      <div style={{ transform: "translateZ(75px)" }}>
        <div className="text-4xl mb-4">{experience.icon}</div>
        <h3 className="text-xl font-bold mb-2">{experience.title}</h3>
        <p className="text-sm text-muted-foreground">{experience.description}</p>
      </div>
    </motion.div>
  )
}

export function Experiences() {
  return (
    <section id="experiences" className="py-24">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Experiences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {experiences.map((exp, index) => (
            <div key={index} className="h-64">
              <TiltCard experience={exp} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

